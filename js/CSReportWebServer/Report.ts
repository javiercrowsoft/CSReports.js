(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

UNKNOWN >>     class Report
    {
        const C_MODULE = "Report";

        let m_reportId = null;
        let m_webReportId = null;
        let m_database = null;
        let m_report = null;

        let m_fProgress = null;
        let m_cancelPrinting = false;

        let m_fPrint = null;

		let ILog m_log = LogManager.GetLogger(typeof(Report));

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
            m_report = new cReport();

			m_log.Info("in Report.init 02");

            m_report.setDatabaseEngine(csDatabaseEngine.CSREPORT_WEB);

            m_report.Progress += reportProgress;
            m_report.ReportDone += reportDone;

			m_log.Info("in Report.init 03");

            let oLaunchInfo = new cReportLaunchInfo();

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(printDialog));

			m_log.Info("in Report.init 04");

            registerDataSource(request);

			m_log.Info("in Report.init 05");

            const  = function() {

			m_log.Info("in Report.init 06");

            m_report.setPathDefault(Application.StartupPath);
        };

        self.openDocument = function(fileName) {
			m_log.Info("in Report.openDocument 01");

            let mouse = new cMouseWait();
            try {
				m_log.Info("in Report.openDocument 02 " + fileName);

                const  = function() {
					m_log.Info("in Report.openDocument 03");

                    return false;
                }

				m_log.Info("in Report.openDocument 03");

                m_report.getLaunchInfo().setStrConnect(m_database);

				m_log.Info("in Report.openDocument 04");

                return true;
            }
            const  = function(ex) {
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
			let message = JObject.Parse(;
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

            let message = JObject.Parse("{ messageType: 'REPORT_PRINT_DONE', reportId: '" + m_reportId + "', webReportId: '" + m_webReportId + "' }");
            Main.sendMessage(message);
        };

        self.moveToPage = function(page) {
UNKNOWN >> 			int pageIndex;
            let message = JObject.Parse(;
				"{ messageType: 'REPORT_PREVIEW_PAGE', reportId: '" + m_reportId 
				+ "', webReportId: '" + m_webReportId 
				+ "' }");
            message["page"] = getPage(page, pageIndex);
			message["pageIndex"] = pageIndex;
            Main.sendMessage(message);
        };

        const registerDataSource = function(request) {
            let dataSources = request["message"]["data"]["data"];
            const  = function(in) {
                let ds = new cJSONDataSource(dataSource["name"].ToString(), dataSource["data"] as JObject);
                cJSONServer.registerDataSource(ds, m_database + "." + ds.getName());
            }
        };

        const reportDone = function(sender, e) {
            closeProgressDlg();
            let message = JObject.Parse(;
				"{ messageType: 'REPORT_DONE', reportId: '" + m_reportId 
				+ "', webReportId: '" + m_webReportId 
				+ "' }");
            Main.sendMessage(message);
        };

        const getPage = function(page, pageIndex) {
            return m_fPrint.getPageImageAsBase64(page, pageIndex);
        };

        const reportProgress = function(sender, e) {

            let task = e.task;
            let page = e.page;
            let currRecord = e.currRecord;
            let recordCount = e.recordCount;

            const  = function() {
                const  = function(want, ) {
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

            let mouse = new cMouseWait();
            try {
				m_log.Info("in Report.launchReport 02");

                showProgressDlg();

				m_log.Info("in Report.launchReport 03");

                let li = m_report.getLaunchInfo();

				m_log.Info("in Report.launchReport 04");

                li.getPrinter().setPaperInfo(m_report.getPaperInfo());

				m_log.Info("in Report.launchReport 05");

                m_fPrint = new cReportPrint();
                m_fPrint.setHidePreviewWindow(true);
                li.setObjPaint(m_fPrint);

				m_log.Info("in Report.launchReport 06");

                // TODO: remove this
                li.setHwnd(0);
                li.setShowPrintersDialog(true);

				m_log.Info("in Report.launchReport 07");

                m_report.launch();

            }
            const  = function(ex) {
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
            const  = function(null) {
                m_fProgress.Close();
            }
            m_fProgress = null;
        };
    }
}
