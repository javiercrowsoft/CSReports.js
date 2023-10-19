namespace CSReportWebServer {

    import cReport = CSReportDll.cReport;
    import cReportLaunchInfo = CSReportDll.cReportLaunchInfo;
    import ProgressEventArgs = CSReportDll.ProgressEventArgs;
    import DatabaseEngine = CSDatabase.DatabaseEngine;
    import JSONDataSource = CSDatabase.JSONDataSource;
    import JSONServer = CSDatabase.JSONServer;
    import cPrintAPI = CSReportDll.cPrintAPI;

    export class Report {

        private reportId: string;
        private webReportId: string;
        private database: string;
        private report: cReport;

        public init(request: any): void {
            this.webReportId = request["message"]["webReportId"].ToString();
            this.reportId = this.uid();
            this.database = this.uid();
            this.report = new cReport();

            this.report.setDatabaseEngine(DatabaseEngine.CS_REPORT_WEB);

            this.report.onProgress(this.reportProgress);
            this.report.onReportDone(this.reportDone);

            const oLaunchInfo = new cReportLaunchInfo();

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(null));

            this.registerDataSource(request);

            if (!this.report.init(oLaunchInfo)) { return; }

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
        }

        private reportProgress(report: cReport, eventArgs: ProgressEventArgs) {
        }

        private uid() {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        }

    }
}