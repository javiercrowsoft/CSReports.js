const reportWorker = (()=> {

    const init = () => {
        String.prototype.contains = function(value: string): boolean {
            let d = String(this);
            return(d.indexOf(value) > -1);
        }

        String.prototype.format = function(format: string): string {
            return String(this);
        }
    };

    const reportProgress = (report: CSReportEngine.cReport, eventArgs: CSReportEngine.ProgressEventArgs) => {
        postMessage({ action: 'report-progress', eventArgs: eventArgs });
    }

    const reportDone = (report: CSReportEngine.cReport) => {
        postMessage({ action: 'report-done' });
    }

    const registerDataSource = (database: string, request: any) => {
        const dataSources = request["content"]["data"]["data"];
        for (let i = 0; i < dataSources.length; i++) {
            const dataSource = dataSources[i];
            const ds = new CSDatabase.JSONDataSource(dataSource["name"].toString(), dataSource["data"]);
            CSDatabase.JSONServer.registerDataSource(ds, database + "." + ds.getName());
        }
    }

    const launch = (data: any) => {
        const report = new CSReportEngine.cReport();
        const reportFrom: CSReportEngine.ReportDTO = JSON.parse(data.report);
        report.copy(reportFrom);

        const launchInfo = new CSReportEngine.cReportLaunchInfo();
        const launchInfoFrom: CSReportEngine.ReportLaunchInfoDTO = JSON.parse(data.launchInfo);
        launchInfo.copy(launchInfoFrom);

        report.onProgress(reportWorker.reportProgress);
        report.onReportDone(reportWorker.reportDone);

        report.launch(launchInfo).then(()=> {
            console.log('Worker: Posting message back to main script');
            postMessage({action: 'report-done', message: 'report done'});
        })
        .catch((reason)=> {
            console.log('Worker: Posting error back to main script');
            postMessage({action: 'report-fail', message: 'report failed', reason: reason});
        });
    }

    return {
        init,
        reportProgress,
        reportDone,
        registerDataSource,
        launch
    }
})();

onmessage = function (e) {
    console.log('Worker: Message received from main script');

    switch(e.data.action) {

        case 'init':
            reportWorker.init()
            break;

        case 'register-datasource':
            reportWorker.registerDataSource(e.data.database, e.data.request);
            break;

        case 'launch':
            reportWorker.launch(e.data);
            break;

        default:
            postMessage({ message: 'unknown action: ' + e.data.action });
    }
}