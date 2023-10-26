namespace CSReportWebServer {

    import U = CSOAPI.Utils;
    import cReport = CSReportEngine.cReport;
    import cReportLaunchInfo = CSReportEngine.cReportLaunchInfo;
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

    export class ReportWeb {

        private reportId: string;
        private webReportId: string;
        private database: string;
        private report: cReport;
        private cancelPrinting = false;

        private fProgress: FProgress = null;
        private fPrint: cReportPrint = null;

        public init2(request: any): void {
            this.init(request, new cReport());
        }

        public init(request: any, report: cReport): void {
            try {

                this.webReportId = request["content"]["webReportId"].toString();
                this.reportId = this.uid();
                this.database = this.uid();
                this.report = report;

                this.report.setDatabaseEngine(DatabaseEngine.CS_REPORT_WEB);

                this.report.onProgress(P.call(this, this.reportProgress));
                this.report.onReportDone(P.call(this, this.reportDone));

                const oLaunchInfo = new cReportLaunchInfo();

                oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(null));

                this.registerDataSource(request);

                if (!this.report.init(oLaunchInfo)) { return; }

                this.report.getLaunchInfo().setStrConnect(this.database);

                this.report.setPathDefault("~");

            } catch (ex) {
                cError.mngError(ex);
            }
        }

        private registerDataSource(request: any): void {
            const dataSources = request["content"]["data"]["data"];
            for (let i = 0; i < dataSources.length; i++) {
                const dataSource = dataSources[i];
                const ds = new JSONDataSource(dataSource["name"].toString(), dataSource["data"]);
                JSONServer.registerDataSource(ds, this.database + "." + ds.getName());
            }
        }

        private reportDone(report: cReport): void {
            this.closeProgressDlg();
        }

        private closeProgressDlg(): void {
            if (this.fProgress !== null && !this.fProgress.isDisposed()) {
                this.fProgress.close();
            }
            this.fProgress = null;
        }

        private reportProgress(report: cReport, eventArgs: ProgressEventArgs) {
            let task: string = eventArgs.getTask();
            let page: number = eventArgs.getPage();
            let currRecord: number = eventArgs.getCurrRecord();
            let recordCount: number = eventArgs.getRecordCount();

            if (this.cancelPrinting) {
                cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)
                    .then(answer => {
                        if (answer) {
                            eventArgs.setCancel(true);
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

        public preview(): void {
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CS_RPT_LAUNCH_PREVIEW);
            this.launchReport();
        }

        private launchReport(): void {
            let mouse: CMouseWait = new CMouseWait();

            this.showProgressDlg().then(P.call(this, () => {

                try {
                    this.fPrint = new cReportPrint();
                    this.fPrint.setHidePreviewWindow(true);

                    const launchInfo = this.report.getLaunchInfo();
                    launchInfo.getPrinter().setPaperInfo(this.report.getPaperInfo());
                    launchInfo.setObjPaint(this.fPrint);
                    launchInfo.setShowPrintersDialog(true);

                    const reportWorker = new Worker("./csreports.js");

                    this.report.getControls().forEach((k, c) => c.setSectionLine(null));
                    const sections = [
                        this.report.getHeaders(),
                        this.report.getGroupsHeaders(),
                        this.report.getDetails(),
                        this.report.getGroupsFooters(),
                        this.report.getFooters()
                    ];
                    sections.forEach((coll) => coll.forEach((k, s: CSReportEngine.cReportSection) =>
                            s.getSectionLines().forEach((k, sl: CSReportEngine.cReportSectionLine) =>
                                sl.getControls().forEach((k, c) => c.setSectionLine(null)))
                    ));
                    sections.forEach((coll) => coll.forEach((k, s: CSReportEngine.cReportSection) =>
                            s.getSectionLines().forEach((k, sl: CSReportEngine.cReportSectionLine) =>
                                sl.getControls().setSectionLine(null)))
                    );

                    reportWorker.postMessage({
                        action: 'launch',
                        launchInfo: launchInfo,
                        reportAsXml : JSON.stringify(this.report)
                    });

                    console.log('Message posted to worker');

                    reportWorker.onmessage = (e) => {
                        console.log('Message received from worker');
                    }

                    //this.report.launch().then(P.call(this, () => {
                    //    mouse.dispose();
                    //    this.closeProgressDlg();
                    //}));

                } catch (ex) {
                    cError.mngError(ex);
                    mouse.dispose();
                    this.closeProgressDlg();
                }

            }));
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
    }
}