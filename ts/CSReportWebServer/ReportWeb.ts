namespace CSReportWebServer {

    import U = CSOAPI.Utils;
    import cReport = CSReportEngine.cReport;
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

    export class ReportWeb {

        private reportId: string;
        private webReportId: string;
        private database: string;
        private report: cReport;
        private cancelPrinting = false;

        private reportWorker: Worker;
        private fProgress: FProgress = null;
        private fPrint: cReportPrint = null;

        // calllback to complete Launch Promise
        //
        private successLaunch: (value: boolean | PromiseLike<boolean>) => void;
        private launchFailed: (reason?: any) => void;

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

                const oLaunchInfo = new cReportLaunchInfo();

                oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(null));

                this.registerDataSource(request);

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

            } catch (ex) {
                cError.mngError(ex);
            }
        }

        private onmessage() {
            return P.call(this, (e: any) => {
                console.log('Message received from worker');
                switch(e.data.action) {
                    case 'report-progress':
                        this.reportProgress(e.data.eventArgs);
                        break;

                    case 'report-done':
                        this.reportDone();
                        break;

                    case 'worker-launch-complete-successfully':
                        CMouseWait.default();
                        console.log(e.data.message);
                        this.successLaunch(true);
                        break;

                    case 'worker-launch-failed':
                        CMouseWait.default();
                        cError.mngError(e.data.reazon, e.data.message);
                        this.launchFailed(e.data.reazon);
                        break;
                }
            });
        }

        public preview() {
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

        private registerDataSource(request: any): void {
            const dataSources = request["content"]["data"]["data"];
            for (let i = 0; i < dataSources.length; i++) {
                const dataSource = dataSources[i];
                const ds = new JSONDataSource(dataSource["name"].toString(), dataSource["data"]);
                JSONServer.registerDataSource(ds, this.database + "." + ds.getName());
            }
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
    }
}