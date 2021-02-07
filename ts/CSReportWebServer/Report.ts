

namespace CSReportWebServer
{
    export class Report {


    {
        private C_MODULE: string = "Report";

        private reportId: string = null;
        private webReportId: string = null;
        private database: string = null;
        private report: cReport = null;

        private fProgress: fProgress = null;
        private cancelPrinting: boolean = false;

        private fPrint: cReportPrint = null;

		private ILog: static this.log = LogManager.GetLogger(typeof(Report));

UNKNOWN >> 		public string reportId
        {
UNKNOWN >>             get
            {
                return this.reportId;
            }
        }


        // we modify the report data source so it uses the CSReportWebServer instead of a real sql engine (SqlServer, PostgreSQL or Oracle)
        //
        public init(request: JObject, printDialog: PrintDialog) {
			this.log.Info("in Report.init 01");

            this.webReportId = request["message"]["webReportId"].toString();
            this.reportId = Guid.NewGuid().toString();
            this.database = Guid.NewGuid().toString();
            this.report = new cReport();

			this.log.Info("in Report.init 02");

            this.report.setDatabaseEngine(csDatabaseEngine.CSREPORT_WEB);

            this.report.Progress += reportProgress;
            this.report.ReportDone += reportDone;

			this.log.Info("in Report.init 03");

            let oLaunchInfo: cReportLaunchInfo = new cReportLaunchInfo();

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(printDialog));

			this.log.Info("in Report.init 04");

            registerDataSource(request);

			this.log.Info("in Report.init 05");

            if (!this.report.init(oLaunchInfo)) { return; }

			this.log.Info("in Report.init 06");

            this.report.setPathDefault(Application.StartupPath);
        }

        public openDocument(fileName: string) {
			this.log.Info("in Report.openDocument 01");

            let mouse: cMouseWait = new cMouseWait();
            try {
				this.log.Info("in Report.openDocument 02 " + fileName);

                if (!this.report.loadSilent(fileName)) {
					this.log.Info("in Report.openDocument 03");

                    return false;
                }

				this.log.Info("in Report.openDocument 03");

                this.report.getLaunchInfo().setStrConnect(this.database);

				this.log.Info("in Report.openDocument 04");

                return true;
            }
            catch (ex) {
                return false;
            }
UNKNOWN >>             finally
            {
                mouse.Dispose();
            }
        }

        public preview() {
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW);
            launchReport();
UNKNOWN >> 			int pageIndex;
			let message: JObject = JObject.Parse(;
				"{ messageType: 'REPORT_PREVIEW_DONE', reportId: '" + this.reportId 
				+ "', webReportId: '" + this.webReportId 
				+ "', totalPages: " + this.report.getPages().count().toString()
				+ " }");
            message["page"] = getPage(1, pageIndex);
			message["pageIndex"] = pageIndex;
            Main.sendMessage(message);
		}

        public printReport() {
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER);
            launchReport();

            let message: JObject = JObject.Parse("{ messageType: 'REPORT_PRINT_DONE', reportId: '" + this.reportId + "', webReportId: '" + this.webReportId + "' }");
            Main.sendMessage(message);
        }

        public moveToPage(page: number) {
UNKNOWN >> 			int pageIndex;
            let message: JObject = JObject.Parse(;
				"{ messageType: 'REPORT_PREVIEW_PAGE', reportId: '" + this.reportId 
				+ "', webReportId: '" + this.webReportId 
				+ "' }");
            message["page"] = getPage(page, pageIndex);
			message["pageIndex"] = pageIndex;
            Main.sendMessage(message);
        }

        private registerDataSource(request: JObject) {
            let dataSources: var = request["message"]["data"]["data"];
            for(var i_ = 0; i_ < dataSources.length; i_++) {
                let ds: cJSONDataSource = new cJSONDataSource(dataSource["name"].toString(), dataSource["data"] as JObject);
                cJSONServer.registerDataSource(ds, this.database + "." + ds.getName());
            }
        }

        private reportDone(sender: object, e: EventArgs) {
            closeProgressDlg();
            let message: JObject = JObject.Parse(;
				"{ messageType: 'REPORT_DONE', reportId: '" + this.reportId 
				+ "', webReportId: '" + this.webReportId 
				+ "' }");
            Main.sendMessage(message);
        }

        private getPage(page: number, pageIndex: number) {
            return this.fPrint.getPageImageAsBase64(page, pageIndex);
        }

        private reportProgress(sender: object, e: ProgressEventArgs) {

            let task: string = e.task;
            let page: number = e.page;
            let currRecord: number = e.currRecord;
            let recordCount: number = e.recordCount;

            if (this.cancelPrinting) {
                if (cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)) {
                    e.cancel = true;
                    closeProgressDlg();
                    return;
                }
                else {
                    this.cancelPrinting = false;
                }
            }

			this.log.Info("page: " + page.toString() + " - " + recordCount.toString());

			/*
            if (this.fProgress === null) { return; }

            if (page > 0) { this.fProgress.lbCurrPage.Text = page.toString(); }
            if (task !== "") { this.fProgress.lbTask.Text = task; }
            if (currRecord > 0) { this.fProgress.lbCurrRecord.Text = currRecord.toString(); }
            if (recordCount > 0 && Utils.val(this.fProgress.lbRecordCount.Text) !== recordCount)
            {
                this.fProgress.lbRecordCount.Text = recordCount.toString();
            }

            double percent = 0;
            if (recordCount > 0 && currRecord > 0)
            {
                percent = Convert.ToDouble(currRecord) / recordCount;
                var value = Convert.ToInt32(percent * 100);
                if (value > 100) value = 100;
                this.fProgress.prgBar.Value = value;
            }
            */
        }

        private launchReport() {
			this.log.Info("in Report.launchReport 01");

            let mouse: cMouseWait = new cMouseWait();
            try {
				this.log.Info("in Report.launchReport 02");

                showProgressDlg();

				this.log.Info("in Report.launchReport 03");

                let li: var = this.report.getLaunchInfo();

				this.log.Info("in Report.launchReport 04");

                li.getPrinter().setPaperInfo(this.report.getPaperInfo());

				this.log.Info("in Report.launchReport 05");

                this.fPrint = new cReportPrint();
                this.fPrint.setHidePreviewWindow(true);
                li.setObjPaint(this.fPrint);

				this.log.Info("in Report.launchReport 06");

                // TODO: remove this
                li.setHwnd(0);
                li.setShowPrintersDialog(true);

				this.log.Info("in Report.launchReport 07");

                this.report.launch();

            }
            catch (ex) {
                cError.mngError(ex, "launchReport", C_MODULE, "");
            }
UNKNOWN >>             finally
            {
                mouse.Dispose();
                closeProgressDlg();
            }
        }

        private showProgressDlg() {
            this.cancelPrinting = false;
			/*
            if (this.fProgress === null)
            {
                this.fProgress = new fProgress();
            }
            this.fProgress.Show();
            this.fProgress.BringToFront();
            */
        }

        private closeProgressDlg() {
            if (this.fProgress !== null && !this.fProgress.IsDisposed) {
                this.fProgress.Close();
            }
            this.fProgress = null;
        }


    } 
}
