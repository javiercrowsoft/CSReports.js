(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {}; //@@@: namespace CSReportWebServer
 //@@@: {
    globalObject.CSReportWebServer.createFMain = function() {

        const self = {}; //@@@: public partial class fMain : Form
        let m_args = null; //@@@: private string[] m_args;

        let m_reports = new Dictionary(); //@@@: private Dictionary<string, Report> m_reports = new Dictionary<string, Report>();

		let ILog m_log = LogManager.GetLogger(typeof(fMain)); //@@@: private static ILog m_log = LogManager.GetLogger(typeof(fMain));

        const fMain = function(args) { //@@@: public fMain(string[] args)
            InitializeComponent(); //@@@: InitializeComponent();
            m_args = args; //@@@: m_args = args;
        }; //@@@: }

        const cmdRegister_Click = function(sender, e) { //@@@: private void cmdRegister_Click(object sender, EventArgs e)
            Main.RegisterNativeMessagingHost(new string[] { "register" }); //@@@: Main.RegisterNativeMessagingHost(new string[] { "register" });
        }; //@@@: }

//         delegate void LogCallback(string message); //@@@: delegate void LogCallback(string message);

        const safeLog = function(message) { //@@@: private void safeLog(string message)
            let i = lvLog.Items.Add(DateTime.Now.ToString("h:mm:ss tt")); //@@@: var i = lvLog.Items.Add(DateTime.Now.ToString("h:mm:ss tt"));
            i.SubItems.Add(message); //@@@: i.SubItems.Add(message);
        }; //@@@: }

        self.log = function(message) { //@@@: public void log(string message)
            let d = new LogCallback(safeLog); //@@@: LogCallback d = new LogCallback(safeLog);
            this.Invoke(d, new object[] { message }); //@@@: this.Invoke(d, new object[] { message });
        }; //@@@: }

//         delegate void CloseCallback(); //@@@: delegate void CloseCallback();

        self.close = function() { //@@@: public void close() {
            let d = new CloseCallback(this.Close); //@@@: CloseCallback d = new CloseCallback(this.Close);
            this.Invoke(d); //@@@: this.Invoke(d);
        }; //@@@: }

//         delegate void ReportActionCallback(JObject request); //@@@: delegate void ReportActionCallback(JObject request);

        const safePreview = function(request) { //@@@: private void safePreview(JObject request)
            let fileName = request["message"]["data"]["file"]; //@@@: var fileName = request["message"]["data"]["file"];
            let reportType = request["message"]["data"]["type"].ToString(); //@@@: var reportType = request["message"]["data"]["type"].ToString();
            let url = request["message"]["data"]["url"].ToString(); //@@@: var url = request["message"]["data"]["url"].ToString();
            let pathAndFile = Path.GetTempPath() + fileName; //@@@: var pathAndFile = Path.GetTempPath() + fileName;

            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile); //@@@: getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report = new Report(); //@@@: var report = new Report();
            report.init(request, this.printDlg); //@@@: report.init(request, this.printDlg);

            if (report.openDocument(pathAndFile)) { //@@@: if (report.openDocument(pathAndFile))
                report.preview(); //@@@: report.preview();
            } //@@@: }
            if (m_reports.ContainsKey(report.reportId)) { //@@@: if (m_reports.ContainsKey(report.reportId))
                m_reports[report.reportId] = report; //@@@: m_reports[report.reportId] = report;
            } //@@@: }
            else { //@@@: else
                m_reports.Add(report.reportId, report); //@@@: m_reports.Add(report.reportId, report);
            } //@@@: }
        }; //@@@: }

        const safePrint = function(request) { //@@@: private void safePrint(JObject request)
            let fileName = request["message"]["data"]["file"]; //@@@: var fileName = request["message"]["data"]["file"];
            let reportType = request["message"]["data"]["type"].ToString(); //@@@: var reportType = request["message"]["data"]["type"].ToString();
            let url = request["message"]["data"]["url"].ToString(); //@@@: var url = request["message"]["data"]["url"].ToString();
            let pathAndFile = Path.GetTempPath() + fileName; //@@@: var pathAndFile = Path.GetTempPath() + fileName;
            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile); //@@@: getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report = new Report(); //@@@: var report = new Report();
            report.init(request, this.printDlg); //@@@: report.init(request, this.printDlg);
            if (report.openDocument(pathAndFile)) { //@@@: if (report.openDocument(pathAndFile))
                report.printReport(); //@@@: report.printReport();
            } //@@@: }
        }; //@@@: }

        const safeMoveToPage = function(request) { //@@@: private void safeMoveToPage(JObject request)
            let data = request["message"]["data"]; //@@@: var data = request["message"]["data"];
            let reportId = data["reportId"].ToString(); //@@@: var reportId = data["reportId"].ToString();
			let page =  int.Parse(data["report_page"].ToString()); //@@@: var page =  int.Parse(data["report_page"].ToString());
			m_log.Info("Getting page " + page); //@@@: m_log.Info("Getting page " + page);

            let report = m_reports[reportId]; //@@@: var report = m_reports[reportId];
            report.moveToPage(page); //@@@: report.moveToPage(page);
        }; //@@@: }

        self.preview = function(request) { //@@@: public void preview(JObject request)
            let d = new ReportActionCallback(safePreview); //@@@: ReportActionCallback d = new ReportActionCallback(safePreview);
            this.Invoke(d, new object[] { request }); //@@@: this.Invoke(d, new object[] { request });
        }; //@@@: }

        self.printReport = function(request) { //@@@: public void printReport(JObject request)
            let d = new ReportActionCallback(safePrint); //@@@: ReportActionCallback d = new ReportActionCallback(safePrint);
            this.Invoke(d, new object[] { request }); //@@@: this.Invoke(d, new object[] { request });
        }; //@@@: }

        self.moveToPage = function(request) { //@@@: public void moveToPage(JObject request)
            let d = new ReportActionCallback(safeMoveToPage); //@@@: ReportActionCallback d = new ReportActionCallback(safeMoveToPage);
            this.Invoke(d, new object[] { request }); //@@@: this.Invoke(d, new object[] { request });
        }; //@@@: }

        const fMain_Load = function(sender, e) { //@@@: private void fMain_Load(object sender, EventArgs e)
            Main.Init(m_args, this); //@@@: Main.Init(m_args, this);
			this.Height = 120; //@@@: this.Height = 120;
        }; //@@@: }

        const DownloadString = function(address) { //@@@: private string DownloadString(string address)
UNKNOWN >>             string text; //@@@: string text;
            { //@@@: {
                text = client.DownloadString(address); //@@@: text = client.DownloadString(address);
            } //@@@: }
            return text; //@@@: return text;
        }; //@@@: }

        const getReportFromWebServer = function(url, fileName) { //@@@: private void getReportFromWebServer(string url, string fileName)
            let xml = DownloadString(url); //@@@: var xml = DownloadString(url);
            File.WriteAllText(fileName, xml); //@@@: File.WriteAllText(fileName, xml);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
