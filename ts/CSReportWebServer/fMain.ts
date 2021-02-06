

namespace CSReportWebServer
{
    export class fMain {


    {
        private args: string[] = null;

        private reports: Dictionary = new Dictionary();

		private ILog: static this.log = LogManager.GetLogger(typeof(fMain));

        public constructor(args: string[]) {
            InitializeComponent();
            this.args = args;
        }

        private cmdRegister_Click(sender: object, e: EventArgs) {
            Main.RegisterNativeMessagingHost(new string[] { "register" });
        }

//         delegate void LogCallback(string message);

        private safeLog(message: string) {
            let i: var = lvLog.Items.Add(DateTime.Now.ToString("h:mm:ss tt"));
            i.SubItems.Add(message);
        }

        public log(message: string) {
            let d: LogCallback = new LogCallback(safeLog);
            this.Invoke(d, new object[] { message });
        }

//         delegate void CloseCallback();

        public close() {
            let d: CloseCallback = new CloseCallback(this.Close);
            this.Invoke(d);
        }

//         delegate void ReportActionCallback(JObject request);

        private safePreview(request: JObject) {
            let fileName: var = request["message"]["data"]["file"];
            let reportType: var = request["message"]["data"]["type"].toString();
            let url: var = request["message"]["data"]["url"].toString();
            let pathAndFile: var = Path.GetTempPath() + fileName;

            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report: var = new Report();
            report.init(request, this.printDlg);

            if (report.openDocument(pathAndFile)) {
                report.preview();
            }
            if (this.reports.ContainsKey(report.reportId)) {
                this.reports[report.reportId] = report;
            }
            else {
                this.reports.Add(report.reportId, report);
            }
        }

        private safePrint(request: JObject) {
            let fileName: var = request["message"]["data"]["file"];
            let reportType: var = request["message"]["data"]["type"].toString();
            let url: var = request["message"]["data"]["url"].toString();
            let pathAndFile: var = Path.GetTempPath() + fileName;
            getReportFromWebServer(url + reportType + "/" + fileName, pathAndFile);

            let report: var = new Report();
            report.init(request, this.printDlg);
            if (report.openDocument(pathAndFile)) {
                report.printReport();
            }
        }

        private safeMoveToPage(request: JObject) {
            let data: var = request["message"]["data"];
            let reportId: var = data["reportId"].toString();
			let page: var =  int.Parse(data["report_page"].toString());
			this.log.Info("Getting page " + page);

            let report: var = this.reports[reportId];
            report.moveToPage(page);
        }

        public preview(request: JObject) {
            let d: ReportActionCallback = new ReportActionCallback(safePreview);
            this.Invoke(d, new object[] { request });
        }

        public printReport(request: JObject) {
            let d: ReportActionCallback = new ReportActionCallback(safePrint);
            this.Invoke(d, new object[] { request });
        }

        public moveToPage(request: JObject) {
            let d: ReportActionCallback = new ReportActionCallback(safeMoveToPage);
            this.Invoke(d, new object[] { request });
        }

        private fMain_Load(sender: object, e: EventArgs) {
            Main.Init(this.args, this);
			this.Height = 120;
        }

        private DownloadString(address: string) {
UNKNOWN >>             string text;
            {
                text = client.DownloadString(address);
            }
            return text;
        }

        private getReportFromWebServer(url: string, fileName: string) {
            let xml: var = DownloadString(url);
            File.WriteAllText(fileName, xml);
        }


    }    }
}
