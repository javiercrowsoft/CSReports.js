namespace CSReportWebServer {

    import U = CSOAPI.Utils;
    import cReport = CSReportDll.cReport;
    import cReportLaunchInfo = CSReportDll.cReportLaunchInfo;
    import ProgressEventArgs = CSReportDll.ProgressEventArgs;
    import DatabaseEngine = CSDatabase.DatabaseEngine;
    import JSONDataSource = CSDatabase.JSONDataSource;
    import JSONServer = CSDatabase.JSONServer;
    import cPrintAPI = CSReportDll.cPrintAPI;
    import csRptLaunchAction = CSReportGlobals.csRptLaunchAction;
    import CMouseWait = CSKernelClient.CMouseWait;
    import cWindow = CSKernelClient.cWindow;
    import MessageBoxDefaultButton = CSKernelClient.MessageBoxDefaultButton;
    import cReportPrint = CSReportPaint.cReportPrint;
    import cError = CSKernelClient.cError;

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
            this.webReportId = request["message"]["webReportId"].ToString();
            this.reportId = this.uid();
            this.database = this.uid();
            this.report = report;

            this.report.setDatabaseEngine(DatabaseEngine.CS_REPORT_WEB);

            this.report.onProgress(this.reportProgress);
            this.report.onReportDone(this.reportDone);

            const oLaunchInfo = new cReportLaunchInfo();

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(null));

            this.registerDataSource(request);

            if(!this.report.init(oLaunchInfo)) { return; }

            this.report.setPathDefault("~");
        }

        private registerDataSource(request: any): void {
            const dataSources = request["message"]["data"]["data"];
            for(let i = 0; i < dataSources.length; i++) {
                const dataSource = dataSources[i];
                const ds = new JSONDataSource(dataSource["name"].ToString(), dataSource["data"]);
                JSONServer.registerDataSource(ds, this.database + "." + ds.getName());
            }
        }

        private reportDone(report: cReport): void {
            this.closeProgressDlg();
        }

        private closeProgressDlg(): void {
            if(this.fProgress !== null && !this.fProgress.isDisposed()) {
                this.fProgress.close();
            }
            this.fProgress = null;
        }

        private reportProgress(report: cReport, eventArgs: ProgressEventArgs) {
            let task: string = eventArgs.getTask();
            let page: number = eventArgs.getPage();
            let currRecord: number = eventArgs.getCurrRecord();
            let recordCount: number = eventArgs.getRecordCount();

            if(this.cancelPrinting) {
                cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)
                .then(answer => {
                    if(answer) {
                        eventArgs.setCancel(true);
                        this.closeProgressDlg();
                        return;
                    }
                    else {
                        this.cancelPrinting = false;
                    }
                });

            }

            if(this.fProgress === null) return;

            if(page > 0) { this.fProgress.getLbCurrPage().setText(page.toString()); }
            if(task !== "") { this.fProgress.getLbTask().setText(task); }
            if(currRecord > 0) { this.fProgress.getLbCurrRecord().setText(currRecord.toString()); }
            if(recordCount > 0 && U.val(this.fProgress.getLbRecordCount().getText()) !== recordCount) {
                this.fProgress.getLbRecordCount().setText(recordCount.toString());
            }

            let percent: number = 0;
            if(recordCount > 0 && currRecord > 0) {
                percent = currRecord / recordCount;
                let value = Math.trunc(percent * 100);
                if(value > 100) value = 100;
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
            try {
                this.showProgressDlg();

                this.fPrint = new cReportPrint();
                this.fPrint.setHidePreviewWindow(true);

                const launchInfo = this.report.getLaunchInfo();
                launchInfo.getPrinter().setPaperInfo(this.report.getPaperInfo());
                launchInfo.setObjPaint(this.fPrint);
                launchInfo.setShowPrintersDialog(true);

                this.report.launch();

            } catch (ex) {
                cError.mngError(ex);
            }
            finally {
                mouse.dispose();
                this.closeProgressDlg();
            }
        }

        private showProgressDlg(): void {
            this.cancelPrinting = false;
            if(this.fProgress == null) {
                this.fProgress = new FProgress();
            }
            this.fProgress.show();
            this.fProgress.bringToFront();
        }
    }
}