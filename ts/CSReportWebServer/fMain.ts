(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

    globalObject.CSReportWebServer.createFMain = function() {

        // @ts-ignore
        let self: CSReportWebServer.IfMain = {};
        let m_args: string[] = null;

        let m_reports: Dictionary = new Dictionary();

		let ILog: static m_log = LogManager.GetLogger(typeof(fMain));

        const fMain = function(args) {
            InitializeComponent();
            m_args = args;
        };

        const cmdRegister_Click = function(sender, e) {
            Main.RegisterNativeMessagingHost(new string[] { "register" });
        };

//         delegate void LogCallback(string message);

        const safeLog = function(message) {
            let i: var = lvLog.Items.Add(DateTime.Now.ToString("h:mm:ss tt"));
            i.SubItems.Add(message);
        };

        self.log = function(message) {
            let d: LogCallback = new LogCallback(safeLog);
            this.Invoke(d, new object[] { message });
        };

//         delegate void CloseCallback();

        self.close = function() {
            let d: CloseCallback = new CloseCallback(this.Close);
            this.Invoke(d);
        };

//         delegate void ReportActionCallback(JObject request);

        const safePreview = function(request) {
            let fileName: var = request["message"]["data"]["file"];
            let reportType: var = request["message"]["data"]["type"].ToString();
            let url: var = request["message"]["data"]["url"].ToString();
            let pathAndFile: var = Path.GetTempPath() + fileName;

            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report: var = new Report();
            report.init(request, this.printDlg);

            if (report.openDocument(pathAndFile)) {
                report.preview();
            }
            if (m_reports.ContainsKey(report.reportId)) {
                m_reports[report.reportId] = report;
            }
            else {
                m_reports.Add(report.reportId, report);
            }
        };

        const safePrint = function(request) {
            let fileName: var = request["message"]["data"]["file"];
            let reportType: var = request["message"]["data"]["type"].ToString();
            let url: var = request["message"]["data"]["url"].ToString();
            let pathAndFile: var = Path.GetTempPath() + fileName;
            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report: var = new Report();
            report.init(request, this.printDlg);
            if (report.openDocument(pathAndFile)) {
                report.printReport();
            }
        };

        const safeMoveToPage = function(request) {
            let data: var = request["message"]["data"];
            let reportId: var = data["reportId"].ToString();
			let page: var =  int.Parse(data["report_page"].ToString());
			m_log.Info("Getting page " + page);

            let report: var = m_reports[reportId];
            report.moveToPage(page);
        };

        self.preview = function(request) {
            let d: ReportActionCallback = new ReportActionCallback(safePreview);
            this.Invoke(d, new object[] { request });
        };

        self.printReport = function(request) {
            let d: ReportActionCallback = new ReportActionCallback(safePrint);
            this.Invoke(d, new object[] { request });
        };

        self.moveToPage = function(request) {
            let d: ReportActionCallback = new ReportActionCallback(safeMoveToPage);
            this.Invoke(d, new object[] { request });
        };

        const fMain_Load = function(sender, e) {
            Main.Init(m_args, this);
			this.Height = 120;
        };

        const DownloadString = function(address) {
UNKNOWN >>             string text;
            {
                text = client.DownloadString(address);
            }
            return text;
        };

        const getReportFromWebServer = function(url, fileName) {
            let xml: var = DownloadString(url);
            File.WriteAllText(fileName, xml);
        };
        return self;

    }    }
}(globalObject));


namespace CSReportWebServer {

  export interface IfMain {

    log: (string) => void;
    close: () => void;
    preview: (JObject) => void;
    printReport: (JObject) => void;
    moveToPage: (JObject) => void;
  }
}
