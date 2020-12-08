(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {}; //@@@: namespace CSReportWebServer
 //@@@: {
UNKNOWN >>     class Report //@@@: class Report
    { //@@@: {
        const C_MODULE = "Report"; //@@@: private const String C_MODULE = "Report";

        let m_reportId = null; //@@@: private string m_reportId;
        let m_webReportId = null; //@@@: private string m_webReportId;
        let m_database = null; //@@@: private string m_database;
        let m_report = null; //@@@: private cReport m_report;

        let m_fProgress = null; //@@@: private fProgress m_fProgress;
        let m_cancelPrinting = false; //@@@: private bool m_cancelPrinting = false;

        let m_fPrint = null; //@@@: private cReportPrint m_fPrint = null;

		let ILog m_log = LogManager.GetLogger(typeof(Report)); //@@@: private static ILog m_log = LogManager.GetLogger(typeof(Report));

UNKNOWN >> 		public string reportId //@@@: public string reportId
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return m_reportId; //@@@: return m_reportId;
            } //@@@: }
        }; //@@@: }


        // we modify the report data source so it uses the CSReportWebServer instead of a real sql engine (SqlServer, PostgreSQL or Oracle)
        //
        self.init = function(request, printDialog) { //@@@: public void init(JObject request, PrintDialog printDialog)
			m_log.Info("in Report.init 01"); //@@@: m_log.Info("in Report.init 01");

            m_webReportId = request["message"]["webReportId"].ToString(); //@@@: m_webReportId = request["message"]["webReportId"].ToString();
            m_reportId = Guid.NewGuid().ToString(); //@@@: m_reportId = Guid.NewGuid().ToString();
            m_database = Guid.NewGuid().ToString(); //@@@: m_database = Guid.NewGuid().ToString();
            m_report = new cReport(); //@@@: m_report = new cReport();

			m_log.Info("in Report.init 02"); //@@@: m_log.Info("in Report.init 02");

            m_report.setDatabaseEngine(csDatabaseEngine.CSREPORT_WEB); //@@@: m_report.setDatabaseEngine(csDatabaseEngine.CSREPORT_WEB);

            m_report.Progress += reportProgress; //@@@: m_report.Progress += reportProgress;
            m_report.ReportDone += reportDone; //@@@: m_report.ReportDone += reportDone;

			m_log.Info("in Report.init 03"); //@@@: m_log.Info("in Report.init 03");

            let oLaunchInfo = new cReportLaunchInfo(); //@@@: cReportLaunchInfo oLaunchInfo = new cReportLaunchInfo();

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(printDialog)); //@@@: oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(printDialog));

			m_log.Info("in Report.init 04"); //@@@: m_log.Info("in Report.init 04");

            registerDataSource(request); //@@@: registerDataSource(request);

			m_log.Info("in Report.init 05"); //@@@: m_log.Info("in Report.init 05");

            const  = function() { //@@@: if (!m_report.init(oLaunchInfo)) { return; }

			m_log.Info("in Report.init 06"); //@@@: m_log.Info("in Report.init 06");

            m_report.setPathDefault(Application.StartupPath); //@@@: m_report.setPathDefault(Application.StartupPath);
        }; //@@@: }

        self.openDocument = function(fileName) { //@@@: public bool openDocument(String fileName)
			m_log.Info("in Report.openDocument 01"); //@@@: m_log.Info("in Report.openDocument 01");

            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();
            try { //@@@: try
				m_log.Info("in Report.openDocument 02 " + fileName); //@@@: m_log.Info("in Report.openDocument 02 " + fileName);

                const  = function() { //@@@: if (!m_report.loadSilent(fileName))
					m_log.Info("in Report.openDocument 03"); //@@@: m_log.Info("in Report.openDocument 03");

                    return false; //@@@: return false;
                } //@@@: }

				m_log.Info("in Report.openDocument 03"); //@@@: m_log.Info("in Report.openDocument 03");

                m_report.getLaunchInfo().setStrConnect(m_database); //@@@: m_report.getLaunchInfo().setStrConnect(m_database);

				m_log.Info("in Report.openDocument 04"); //@@@: m_log.Info("in Report.openDocument 04");

                return true; //@@@: return true;
            } //@@@: }
            const  = function(ex) { //@@@: catch (Exception ex)
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                mouse.Dispose(); //@@@: mouse.Dispose();
            } //@@@: }
        }; //@@@: }

        self.preview = function() { //@@@: public void preview()
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW); //@@@: m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW);
            launchReport(); //@@@: launchReport();
UNKNOWN >> 			int pageIndex; //@@@: int pageIndex;
			let message = JObject.Parse(; //@@@: JObject message = JObject.Parse(
				"{ messageType: 'REPORT_PREVIEW_DONE', reportId: '" + m_reportId  //@@@: "{ messageType: 'REPORT_PREVIEW_DONE', reportId: '" + m_reportId
				+ "', webReportId: '" + m_webReportId  //@@@: + "', webReportId: '" + m_webReportId
				+ "', totalPages: " + m_report.getPages().count().ToString()  //@@@: + "', totalPages: " + m_report.getPages().count().ToString()
				+ " }"); //@@@: + " }");
            message["page"] = getPage(1, pageIndex); //@@@: message["page"] = getPage(1, out pageIndex);
			message["pageIndex"] = pageIndex; //@@@: message["pageIndex"] = pageIndex;
            Main.sendMessage(message); //@@@: Main.sendMessage(message);
		}; //@@@: }

        self.printReport = function() { //@@@: public void printReport()
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER); //@@@: m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER);
            launchReport(); //@@@: launchReport();

            let message = JObject.Parse("{ messageType: 'REPORT_PRINT_DONE', reportId: '" + m_reportId + "', webReportId: '" + m_webReportId + "' }"); //@@@: JObject message = JObject.Parse("{ messageType: 'REPORT_PRINT_DONE', reportId: '" + m_reportId + "', webReportId: '" + m_webReportId + "' }");
            Main.sendMessage(message); //@@@: Main.sendMessage(message);
        }; //@@@: }

        self.moveToPage = function(page) { //@@@: public void moveToPage(int page)
UNKNOWN >> 			int pageIndex; //@@@: int pageIndex;
            let message = JObject.Parse(; //@@@: JObject message = JObject.Parse(
				"{ messageType: 'REPORT_PREVIEW_PAGE', reportId: '" + m_reportId  //@@@: "{ messageType: 'REPORT_PREVIEW_PAGE', reportId: '" + m_reportId
				+ "', webReportId: '" + m_webReportId  //@@@: + "', webReportId: '" + m_webReportId
				+ "' }"); //@@@: + "' }");
            message["page"] = getPage(page, pageIndex); //@@@: message["page"] = getPage(page, out pageIndex);
			message["pageIndex"] = pageIndex; //@@@: message["pageIndex"] = pageIndex;
            Main.sendMessage(message); //@@@: Main.sendMessage(message);
        }; //@@@: }

        const registerDataSource = function(request) { //@@@: private void registerDataSource(JObject request)
            let dataSources = request["message"]["data"]["data"]; //@@@: var dataSources = request["message"]["data"]["data"];
            const  = function(in) { //@@@: foreach (var dataSource in dataSources)
                let ds = new cJSONDataSource(dataSource["name"].ToString(), dataSource["data"] as JObject); //@@@: cJSONDataSource ds = new cJSONDataSource(dataSource["name"].ToString(), dataSource["data"] as JObject);
                cJSONServer.registerDataSource(ds, m_database + "." + ds.getName()); //@@@: cJSONServer.registerDataSource(ds, m_database + "." + ds.getName());
            } //@@@: }
        }; //@@@: }

        const reportDone = function(sender, e) { //@@@: private void reportDone(object sender, EventArgs e)
            closeProgressDlg(); //@@@: closeProgressDlg();
            let message = JObject.Parse(; //@@@: JObject message = JObject.Parse(
				"{ messageType: 'REPORT_DONE', reportId: '" + m_reportId  //@@@: "{ messageType: 'REPORT_DONE', reportId: '" + m_reportId
				+ "', webReportId: '" + m_webReportId  //@@@: + "', webReportId: '" + m_webReportId
				+ "' }"); //@@@: + "' }");
            Main.sendMessage(message); //@@@: Main.sendMessage(message);
        }; //@@@: }

        const getPage = function(page, pageIndex) { //@@@: private string getPage(int page, out int pageIndex)
            return m_fPrint.getPageImageAsBase64(page, pageIndex); //@@@: return m_fPrint.getPageImageAsBase64(page, out pageIndex);
        }; //@@@: }

        const reportProgress = function(sender, e) { //@@@: private void reportProgress(object sender, ProgressEventArgs e)

            let task = e.task; //@@@: String task = e.task;
            let page = e.page; //@@@: int page = e.page;
            let currRecord = e.currRecord; //@@@: int currRecord = e.currRecord;
            let recordCount = e.recordCount; //@@@: int recordCount = e.recordCount;

            const  = function() { //@@@: if (m_cancelPrinting)
                const  = function(want, ) { //@@@: if (cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2))
                    e.cancel = true; //@@@: e.cancel = true;
                    closeProgressDlg(); //@@@: closeProgressDlg();
                    return; //@@@: return;
                } //@@@: }
                else { //@@@: else {
                    m_cancelPrinting = false; //@@@: m_cancelPrinting = false;
                } //@@@: }
            } //@@@: }

			m_log.Info("page: " + page.ToString() + " - " + recordCount.ToString()); //@@@: m_log.Info("page: " + page.ToString() + " - " + recordCount.ToString());

			/* //@@@: /*
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
        }; //@@@: }

        const launchReport = function() { //@@@: private void launchReport()
			m_log.Info("in Report.launchReport 01"); //@@@: m_log.Info("in Report.launchReport 01");

            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();
            try { //@@@: try
				m_log.Info("in Report.launchReport 02"); //@@@: m_log.Info("in Report.launchReport 02");

                showProgressDlg(); //@@@: showProgressDlg();

				m_log.Info("in Report.launchReport 03"); //@@@: m_log.Info("in Report.launchReport 03");

                let li = m_report.getLaunchInfo(); //@@@: var li = m_report.getLaunchInfo();

				m_log.Info("in Report.launchReport 04"); //@@@: m_log.Info("in Report.launchReport 04");

                li.getPrinter().setPaperInfo(m_report.getPaperInfo()); //@@@: li.getPrinter().setPaperInfo(m_report.getPaperInfo());

				m_log.Info("in Report.launchReport 05"); //@@@: m_log.Info("in Report.launchReport 05");

                m_fPrint = new cReportPrint(); //@@@: m_fPrint = new cReportPrint();
                m_fPrint.setHidePreviewWindow(true); //@@@: m_fPrint.setHidePreviewWindow(true);
                li.setObjPaint(m_fPrint); //@@@: li.setObjPaint(m_fPrint);

				m_log.Info("in Report.launchReport 06"); //@@@: m_log.Info("in Report.launchReport 06");

                // TODO: remove this
                li.setHwnd(0); //@@@: li.setHwnd(0);
                li.setShowPrintersDialog(true); //@@@: li.setShowPrintersDialog(true);

				m_log.Info("in Report.launchReport 07"); //@@@: m_log.Info("in Report.launchReport 07");

                m_report.launch(); //@@@: m_report.launch();

            } //@@@: }
            const  = function(ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "launchReport", C_MODULE, ""); //@@@: cError.mngError(ex, "launchReport", C_MODULE, "");
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                mouse.Dispose(); //@@@: mouse.Dispose();
                closeProgressDlg(); //@@@: closeProgressDlg();
            } //@@@: }
        }; //@@@: }

        const showProgressDlg = function() { //@@@: private void showProgressDlg()
            m_cancelPrinting = false; //@@@: m_cancelPrinting = false;
			/* //@@@: /*
            if (m_fProgress === null)
            {
                m_fProgress = new fProgress();
            }
            m_fProgress.Show();
            m_fProgress.BringToFront();
            */
        }; //@@@: }

        const closeProgressDlg = function() { //@@@: private void closeProgressDlg()
            const  = function(null) { //@@@: if (m_fProgress != null && !m_fProgress.IsDisposed)
                m_fProgress.Close(); //@@@: m_fProgress.Close();
            } //@@@: }
            m_fProgress = null; //@@@: m_fProgress = null;
        }; //@@@: }
    } //@@@: }
} //@@@: }
