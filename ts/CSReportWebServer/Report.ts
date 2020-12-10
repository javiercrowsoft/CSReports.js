(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

    globalObject.CSReportWebServer.createReport = function() {

        // @ts-ignore
        let self: CSReportWebServer.IReport = {};
        const C_MODULE: string = "Report";

        let m_reportId: string = null;
        let m_webReportId: string = null;
        let m_database: string = null;
        let m_report: cReport = null;

        let m_fProgress: fProgress = null;
        let m_cancelPrinting: boolean = false;

        let m_fPrint: cReportPrint = null;

		let ILog: static m_log = LogManager.GetLogger(typeof(Report));

UNKNOWN >> 		public string reportId
        {
UNKNOWN >>             get
            {
                return m_reportId;
            }
        };


        // we modify the report data source so it uses the CSReportWebServer instead of a real sql engine (SqlServer, PostgreSQL or Oracle)
        //
        self.init = function(request, printDialog) {
			m_log.Info("in Report.init 01");

            m_webReportId = request["message"]["webReportId"].ToString();
            m_reportId = Guid.NewGuid().ToString();
            m_database = Guid.NewGuid().ToString();
            m_report = globalObject.CSReportDll.createCReport();

			m_log.Info("in Report.init 02");

            m_report.setDatabaseEngine(csDatabaseEngine.CSREPORT_WEB);

            m_report.Progress += reportProgress;
            m_report.ReportDone += reportDone;

			m_log.Info("in Report.init 03");

            let oLaunchInfo: cReportLaunchInfo = new cReportLaunchInfo();

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(printDialog));

			m_log.Info("in Report.init 04");

            registerDataSource(request);

			m_log.Info("in Report.init 05");

            if (!m_report.init(oLaunchInfo)) { return; }

			m_log.Info("in Report.init 06");

            m_report.setPathDefault(Application.StartupPath);
        };

        self.openDocument = function(fileName) {
			m_log.Info("in Report.openDocument 01");

            let mouse: cMouseWait = new cMouseWait();
            try {
				m_log.Info("in Report.openDocument 02 " + fileName);

                if (!m_report.loadSilent(fileName)) {
					m_log.Info("in Report.openDocument 03");

                    return false;
                }

				m_log.Info("in Report.openDocument 03");

                m_report.getLaunchInfo().setStrConnect(m_database);

				m_log.Info("in Report.openDocument 04");

                return true;
            }
            catch (ex) {
                return false;
            }
UNKNOWN >>             finally
            {
                mouse.Dispose();
            }
        };

        self.preview = function() {
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW);
            launchReport();
UNKNOWN >> 			int pageIndex;
			let message: JObject = JObject.Parse(;
				"{ messageType: 'REPORT_PREVIEW_DONE', reportId: '" + m_reportId 
				+ "', webReportId: '" + m_webReportId 
				+ "', totalPages: " + m_report.getPages().count().ToString() 
				+ " }");
            message["page"] = getPage(1, pageIndex);
			message["pageIndex"] = pageIndex;
            Main.sendMessage(message);
		};

        self.printReport = function() {
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER);
            launchReport();

            let message: JObject = JObject.Parse("{ messageType: 'REPORT_PRINT_DONE', reportId: '" + m_reportId + "', webReportId: '" + m_webReportId + "' }");
            Main.sendMessage(message);
        };

        self.moveToPage = function(page) {
UNKNOWN >> 			int pageIndex;
            let message: JObject = JObject.Parse(;
				"{ messageType: 'REPORT_PREVIEW_PAGE', reportId: '" + m_reportId 
				+ "', webReportId: '" + m_webReportId 
				+ "' }");
            message["page"] = getPage(page, pageIndex);
			message["pageIndex"] = pageIndex;
            Main.sendMessage(message);
        };

        const registerDataSource = function(request) {
            let dataSources: var = request["message"]["data"]["data"];
            for(var i_ = 0; i_ < dataSources.length; i_++) {
                let ds: cJSONDataSource = new cJSONDataSource(dataSource["name"].ToString(), dataSource["data"] as JObject);
                cJSONServer.registerDataSource(ds, m_database + "." + ds.getName());
            }
        };

        const reportDone = function(sender, e) {
            closeProgressDlg();
            let message: JObject = JObject.Parse(;
				"{ messageType: 'REPORT_DONE', reportId: '" + m_reportId 
				+ "', webReportId: '" + m_webReportId 
				+ "' }");
            Main.sendMessage(message);
        };

        const getPage = function(page, pageIndex) {
            return m_fPrint.getPageImageAsBase64(page, pageIndex);
        };

        const reportProgress = function(sender, e) {

            let task: string = e.task;
            let page: number = e.page;
            let currRecord: number = e.currRecord;
            let recordCount: number = e.recordCount;

            if (m_cancelPrinting) {
                if (cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)) {
                    e.cancel = true;
                    closeProgressDlg();
                    return;
                }
                else {
                    m_cancelPrinting = false;
                }
            }

			m_log.Info("page: " + page.ToString() + " - " + recordCount.ToString());

			/*
            if (m_fProgress === null) { return; }

            if (page > 0) { m_fProgress.lbCurrPage.Text = page.ToString(); }
            if (task !== "") { m_fProgress.lbTask.Text = task; }
            if (currRecord > 0) { m_fProgress.lbCurrRecord.Text = currRecord.ToString(); }
            if (recordCount > 0 && cUtil.val(m_fProgress.lbRecordCount.Text) !== recordCount)
            {
                m_fProgress.lbRecordCount.Text = recordCount.ToString();
            }

            double percent = 0;
            if (recordCount > 0 && currRecord > 0)
            {
                percent = Convert.ToDouble(currRecord) / recordCount;
                var value = Convert.ToInt32(percent * 100);
                if (value > 100) value = 100;
                m_fProgress.prgBar.Value = value;
            }
            */
        };

        const launchReport = function() {
			m_log.Info("in Report.launchReport 01");

            let mouse: cMouseWait = new cMouseWait();
            try {
				m_log.Info("in Report.launchReport 02");

                showProgressDlg();

				m_log.Info("in Report.launchReport 03");

                let li: var = m_report.getLaunchInfo();

				m_log.Info("in Report.launchReport 04");

                li.getPrinter().setPaperInfo(m_report.getPaperInfo());

				m_log.Info("in Report.launchReport 05");

                m_fPrint = globalObject.CSReportPaint.createCReportPrint();
                m_fPrint.setHidePreviewWindow(true);
                li.setObjPaint(m_fPrint);

				m_log.Info("in Report.launchReport 06");

                // TODO: remove this
                li.setHwnd(0);
                li.setShowPrintersDialog(true);

				m_log.Info("in Report.launchReport 07");

                m_report.launch();

            }
            catch (ex) {
                cError.mngError(ex, "launchReport", C_MODULE, "");
            }
UNKNOWN >>             finally
            {
                mouse.Dispose();
                closeProgressDlg();
            }
        };

        const showProgressDlg = function() {
            m_cancelPrinting = false;
			/*
            if (m_fProgress === null)
            {
                m_fProgress = new fProgress();
            }
            m_fProgress.Show();
            m_fProgress.BringToFront();
            */
        };

        const closeProgressDlg = function() {
            if (m_fProgress !== null && !m_fProgress.IsDisposed) {
                m_fProgress.Close();
            }
            m_fProgress = null;
        };
        return self;

    }    }
}(globalObject));


namespace CSReportWebServer {

  export interface IReport {

    init: (JObject, PrintDialog) => void;
    openDocument: (String) => bool;
    preview: () => void;
    printReport: () => void;
    moveToPage: (int) => void;
  }
}
