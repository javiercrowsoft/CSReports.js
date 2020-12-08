(function(globalObject) {

    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

    globalObject.CSReportWebServer.createFMain = function() {

        const self = {};
        let m_args = null;

        let m_reports = new Dictionary();

		let ILog m_log = LogManager.GetLogger(typeof(fMain));

        const fMain = function(args) {
            InitializeComponent();
            m_args = args;
        };

        const cmdRegister_Click = function(sender, e) {
            Main.RegisterNativeMessagingHost(new string[] { "register" });
        };

//         delegate void LogCallback(string message);

        const safeLog = function(message) {
            let i = lvLog.Items.Add(DateTime.Now.ToString("h:mm:ss tt"));
            i.SubItems.Add(message);
        };

        self.log = function(message) {
            let d = new LogCallback(safeLog);
            this.Invoke(d, new object[] { message });
        };

//         delegate void CloseCallback();

        self.close = function() {
            let d = new CloseCallback(this.Close);
            this.Invoke(d);
        };

//         delegate void ReportActionCallback(JObject request);

        const safePreview = function(request) {
            let fileName = request["message"]["data"]["file"];
            let reportType = request["message"]["data"]["type"].ToString();
            let url = request["message"]["data"]["url"].ToString();
            let pathAndFile = Path.GetTempPath() + fileName;

            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report = new Report();
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
            let fileName = request["message"]["data"]["file"];
            let reportType = request["message"]["data"]["type"].ToString();
            let url = request["message"]["data"]["url"].ToString();
            let pathAndFile = Path.GetTempPath() + fileName;
            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report = new Report();
            report.init(request, this.printDlg);
            if (report.openDocument(pathAndFile)) {
                report.printReport();
            }
        };

        const safeMoveToPage = function(request) {
            let data = request["message"]["data"];
            let reportId = data["reportId"].ToString();
			let page =  int.Parse(data["report_page"].ToString());
			m_log.Info("Getting page " + page);

            let report = m_reports[reportId];
            report.moveToPage(page);
        };

        self.preview = function(request) {
            let d = new ReportActionCallback(safePreview);
            this.Invoke(d, new object[] { request });
        };

        self.printReport = function(request) {
            let d = new ReportActionCallback(safePrint);
            this.Invoke(d, new object[] { request });
        };

        self.moveToPage = function(request) {
            let d = new ReportActionCallback(safeMoveToPage);
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
            let xml = DownloadString(url);
            File.WriteAllText(fileName, xml);
        };
        return self;

    }
}(globalObject));
