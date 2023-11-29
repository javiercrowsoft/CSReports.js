///<reference path="../CSReport/CSReportEngine/cReportPages.ts"/>

namespace CSReportWebServer {

    import U = CSOAPI.Utils;
    import cReport = CSReportEngine.cReport;
    import cReportPages = CSReportEngine.cReportPages;
    import cReportPage = CSReportEngine.cReportPage;
    import cReportPageField = CSReportEngine.cReportPageField;
    import cReportLaunchInfo = CSReportEngine.cReportLaunchInfo;
    import ReportLaunchInfoDTO = CSReportEngine.ReportLaunchInfoDTO;
    import ProgressEventArgs = CSReportEngine.ProgressEventArgs;
    import DatabaseEngine = CSDatabase.DatabaseEngine;
    import JSONDataSource = CSDatabase.JSONDataSource;
    import JSONServer = CSDatabase.JSONServer;
    import cPrintAPI = CSReportEngine.cPrintAPI;
    import csRptLaunchAction = CSReportGlobals.csRptLaunchAction;
    import CMouseWait = CSKernelClient.CMouseWait;
    import cWindow = CSKernelClient.cWindow;
    import MessageBoxDefaultButton = CSKernelClient.MessageBoxDefaultButton;
    import cReportPrint = CSReportPaint.cReportPrint;
    import cError = CSKernelClient.cError;
    import P = CSKernelClient.Callable;
    import ReportPreview = CSForms.ReportPreview;
    import Map = CSOAPI.Map;
    import Image = CSDrawing.ImageX;
    import Bitmap = CSDrawing.Bitmap;
    import DataType = CSDatabase.DataType;

    export class ReportWeb {
        private reportId: string;
        private webReportId: string;
        private database: string;
        private report: cReport = null;
        // pages are created in a web worker implemented in ReportWorker.ts
        // when report is done a post message is sent from ReportWorker.ts to
        // ReportWeb.ts and the pages are sent. ReportWeb ( main thread ) saves
        // pages into this field
        //
        private pages: cReportPages = null;
        // images are read from datasource and associated to PageField objects
        // only by key inside the web worker.
        // when report is done a post message is sent from ReportWorker.ts to
        // ReportWeb.ts and the images are sent. ReportWeb ( main thread ) saves
        // images into this field. We only have one instance of each image. every
        // PageField object that has an image will reference the same image that
        // match the image.key.
        // this key is created in cReport and comes from the datasource index,
        // row index and col index
        // let key = "k" + indexRows.toString() + indexField.toString() + indexRow.toString();
        // once images are in the main thread they are converted into ImageBitmap
        //
        private images: Map<Image> = null;
        private cancelPrinting = false;

        private reportWorker: Worker;
        private fProgress: FProgress = null;

        // calllback to complete Launch Promise
        //
        private successLaunch: (value: boolean | PromiseLike<boolean>) => void;
        private launchFailed: (reason?: any) => void;

        private successGetReport: (value: boolean | PromiseLike<boolean>) => void;
        private getReportFailed: (reason?: any) => void;

        public init2(request: any): void {
            this.init(request, new cReport());
        }

        public init(request: any, report: cReport): Promise<boolean> {
            try {

                this.webReportId = request["content"]["webReportId"].toString();
                this.reportId = this.uid();
                this.database = this.uid();
                this.report = report;

                this.report.setDatabaseEngine(DatabaseEngine.CS_REPORT_WEB);

                const oLaunchInfo = new cReportLaunchInfo();

                oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(null));

                return this.registerDataSource(request)
                .then(P.call(this, () => {

                    if (!this.report.init(oLaunchInfo)) { return; }

                    this.report.getLaunchInfo().setStrConnect(this.database);

                    this.report.setPathDefault("~");

                    this.reportWorker = new Worker("./csreports.js");

                    this.reportWorker.onmessage = this.onmessage();

                    this.reportWorker.postMessage({
                        action: 'init'
                    });

                    this.reportWorker.postMessage({
                        action: 'register-datasource',
                        request: request,
                        database: this.database
                    });

                    return true;

                }));

            } catch (ex) {
                return cError.mngError(ex);
            }
        }

        private onmessage() {
            return P.call(this, (e: any) => {

                switch(e.data.action) {
                    case 'report-progress':
                        this.reportProgress(e.data.eventArgs);
                        break;

                    case 'report-generation-done':
                        // nothing to do
                        break;

                    case 'worker-launch-complete-successfully':
                        CMouseWait.default();
                        // console.log(e.data.message);
                        this.successLaunch(true);
                        break;

                    case 'worker-launch-failed':
                        CMouseWait.default();
                        this.closeProgressDlg();
                        cError.mngError(e.data.reason, e.data.message);
                        this.launchFailed(e.data.reason);
                        break;

                    case 'get-report-start':
                        this.reportProgress(e.data.eventArgs);
                        this.pages = new cReportPages();
                        this.reportProgress(e.data.eventArgs);
                        break;

                    case 'get-report-images':
                        this.images = new Map();
                        this.images.copy(JSON.parse(e.data.images));

                        for (let i = 0; i < this.images.size(); i++) {
                            const item = this.images.item(i);
                            this.images.update(i, new Image(
                                // @ts-ignore
                                Bitmap.loadImageFromArray(item._bitmap.imageData),
                                item.key));
                        }
                        break;

                    case 'get-report-pages':
                        this.reportProgress(e.data.eventArgs);
                        const pages = new cReportPages()
                        pages.copy(JSON.parse(e.data.pages));
                        this.pages.concat(pages);
                        break;

                    case 'get-report-done':
                        this.pages.getValues().forEach((page) => {
                            const fields = [...page.getHeader().getValues(), ...page.getDetail().getValues(), ...page.getFooter().getValues()];
                            fields.forEach(P.call(this, (field) => {
                                //
                                // assign image using the key
                                //
                                if(    field.getImage() !== null
                                    && field.getImage() !== undefined
                                    && field.getImage().key !== null) {

                                    const key = field.getImage().key;
                                    field.setImage(this.images.item(key));
                                }
                            }));
                        });

                        this.report.setPages(this.pages);
                        const reportPrint = new CSReportPaint.cReportPrint();
                        reportPrint.setHidePreviewWindow(true);
                        this.report.getLaunchInfo().setReportPrint(reportPrint);
                        reportPrint.setReport(this.report);
                        this.loadImages().then(P.call(this, ()=> {
                            this.successGetReport(true);
                            this.reportDone();
                        }));
                        break;
                }
            });
        }

        private loadImages() {
            const toLoad = [];
            this.images.forEach((_, image) => toLoad.push(image.loadImage()));
            return Promise.all(toLoad);
        }

        public makeReport() {
            if(this.report === null) return P._(false);
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CS_RPT_LAUNCH_PREVIEW);
            return this.launchReport();
        }

        private launchReport() {
            let mouse: CMouseWait = new CMouseWait();

            return new Promise((resolve, reject) => {

                this.showProgressDlg().then(P.call(this, () => {

                    try {
                        const report = this.report.clone();

                        // clone doesn't copy launch info content
                        //
                        report.getLaunchInfo().copy(JSON.parse(JSON.stringify(this.report.getLaunchInfo())));
                        report.getLaunchInfo().getPrinter().setPaperInfo(report.getPaperInfo());
                        report.getLaunchInfo().setShowPrintersDialog(true);

                        this.removeCircularReferences(report);

                        this.successLaunch = resolve;
                        this.launchFailed = reject;

                        this.reportWorker.postMessage({
                            action: 'launch',
                            launchInfo: JSON.stringify(report.getLaunchInfo()),
                            report : JSON.stringify(report)
                        });

                    } catch (ex) {
                        cError.mngError(ex);
                        mouse.dispose();
                        this.closeProgressDlg();
                        reject(ex);
                    }
                }));
            });
        }

        private removeCircularReferences(report: cReport) {
            report.getControls().forEach((k, c) => c.setSectionLine(null));
            const sections = [
                report.getHeaders(),
                report.getGroupsHeaders(),
                report.getDetails(),
                report.getGroupsFooters(),
                report.getFooters()
            ];
            sections.forEach((coll) => coll.forEach((k, s: CSReportEngine.cReportSection) =>
                    s.getSectionLines().forEach((k, sl: CSReportEngine.cReportSectionLine) =>
                        sl.getControls().forEach((k, c) => c.setSectionLine(null)))
            ));
            sections.forEach((coll) => coll.forEach((k, s: CSReportEngine.cReportSection) =>
                    s.getSectionLines().forEach((k, sl: CSReportEngine.cReportSectionLine) =>
                        sl.getControls().setSectionLine(null)))
            );
            report.zip();
        }

        private showProgressDlg() {
            this.cancelPrinting = false;
            if (this.fProgress === null) {
                this.fProgress = new FProgress();
            }
            this.fProgress.show();
            this.fProgress.bringToFront();
            return new Promise((resolve) => {
                setTimeout(resolve, 1000);
            });
        }

        private registerDataSource(request: any) {
            const dataSources = request["content"]["data"]["data"];
            for (let i = 0; i < dataSources.length; i++) {
                const dataSource = dataSources[i];
                const ds = new JSONDataSource(dataSource["name"].toString(), dataSource["data"]);
                JSONServer.registerDataSource(ds, this.database + "." + ds.getName());
            }
            return this.setImagesInDataSources(dataSources);
        }

        private getImage(images: Map<Image>, dataSources: any[], indexRows: number, indexField: number, indexRow: number) {
            let key = "k" + indexRows.toString() + indexField.toString() + indexRow.toString();
            if(images.containsKey(key)) {
                return images.item(key);
            }
            else {
                const image = new Image(
                    Bitmap.loadImageFromArray(dataSources[indexRows].data.rows[indexRow].values[indexField]),
                    key);
                images.add(image, key);
                return image;
            }
        }

        private setImagesInDataSources(dataSources: any[]) {
            const images: Map<Image> = new Map();
            let p = P._(false);
            for(let indexRows = 0; indexRows < dataSources.length; indexRows++) {
                const imageColIndex = [];
                for(let indexField = 0; indexField < dataSources[indexRows].data.columns.length; indexField++) {
                    let typeCode = dataSources[indexRows].data.columns[indexField].columnType;
                    if(typeCode === 'bytea') {
                        imageColIndex.push(indexField);
                    }
                }

                for(let indexRow = 0; indexRow < dataSources[indexRows].data.rows.length; indexRow++) {
                    for(let indexField = 0; indexField < imageColIndex.length; indexField++) {
                        const image = this.getImage(images, dataSources, indexRows, indexField, indexRow);
                        if(typeof dataSources[indexRows].data.rows[indexRow].values[indexField] === 'string') {
                            p = p
                            .then(() => image.loadImage())
                            .then(() => {
                                dataSources[indexRows].data.rows[indexRow].values[indexField] = {
                                    width: image.getSize().width,
                                    height: image.getSize().height,
                                    image: dataSources[indexRows].data.rows[indexRow].values[indexField]
                                }
                                return true;
                            });
                        }
                    }
                }
            }
            return p.then( () => true);
        }

        private reportDone(): void {
            CMouseWait.default();
            this.closeProgressDlg();
        }

        private closeProgressDlg(): void {
            if (this.fProgress !== null && !this.fProgress.isDisposed()) {
                this.fProgress.close();
            }
            this.fProgress = null;
        }

        private reportProgress(eventArgs: ProgressEventArgs) {
            let task: string = eventArgs.task;
            let page: number = eventArgs.page;
            let currRecord: number = eventArgs.currRecord;
            let recordCount: number = eventArgs.recordCount;

            if (this.cancelPrinting) {
                cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)
                    .then(answer => {
                        if (answer) {
                            eventArgs.cancel = true;
                            this.closeProgressDlg();
                            return;
                        }
                        else {
                            this.cancelPrinting = false;
                        }
                    });
            }

            if (this.fProgress === null) return;

            if (page > 0) { this.fProgress.getLbCurrPage().setText(page.toString()); }
            if (task !== "") { this.fProgress.getLbTask().setText(task); }
            if (currRecord > 0) { this.fProgress.getLbCurrRecord().setText(currRecord.toString()); }
            if (recordCount > 0 && U.val(this.fProgress.getLbRecordCount().getText()) !== recordCount) {
                this.fProgress.getLbRecordCount().setText(recordCount.toString());
            }

            let percent: number = 0;
            if (recordCount > 0 && currRecord > 0) {
                percent = currRecord / recordCount;
                let value = Math.trunc(percent * 100);
                if (value > 100) value = 100;
                this.fProgress.getPrgBar().setValue(value);
            }
        }

        private uid() {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        }

        public getPages() {
            return new Promise((resolve, reject) => {

                this.successGetReport = resolve;
                this.getReportFailed = reject;

                this.reportWorker.postMessage({
                    action: 'get-report'
                });
            });
        }

        public previewFirstPage(previewControl: ReportPreview) {
            const reportPrint = this.report.getLaunchInfo().getReportPrint();
            (reportPrint as cReportPrint).setPreviewControl(previewControl);
            reportPrint.previewReport();
        }

    }
}