const reportWorker = (()=> {

    let pages: CSReportEngine.cReportPages = null;

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
    };

    const reportDone = (report: CSReportEngine.cReport) => {
        postMessage({ action: 'report-done' });
    };

    const registerDataSource = (database: string, request: any) => {
        const dataSources = request["content"]["data"]["data"];
        for (let i = 0; i < dataSources.length; i++) {
            const dataSource = dataSources[i];
            const ds = new CSDatabase.JSONDataSource(dataSource["name"].toString(), dataSource["data"]);
            CSDatabase.JSONServer.registerDataSource(ds, database + "." + ds.getName());
        }
    };

    const launch = (data: any) => {
        const report = new CSReportEngine.cReport();
        const reportFrom: CSReportEngine.ReportDTO = JSON.parse(data.report);
        report.copy(reportFrom);

        const launchInfo = new CSReportEngine.cReportLaunchInfo();
        const launchInfoFrom: CSReportEngine.ReportLaunchInfoDTO = JSON.parse(data.launchInfo);
        launchInfo.copy(launchInfoFrom);

        const reportPrint = new CSReportPaint.cReportPrint();
        reportPrint.setHidePreviewWindow(true);
        launchInfo.setReportPrint(reportPrint);

        report.onProgress(reportWorker.reportProgress);
        report.onReportDone(reportWorker.reportDone);

        report.setRunningInWebWorker(true);

        report.launch(launchInfo).then(()=> {
            pages = report.getPages();
            postMessage({action: 'worker-launch-complete-successfully', message: 'report launch completes successfully'});
        })
        .catch((reason)=> {
            postMessage({action: 'worker-launch-failed', message: 'report launch failed', reason: reason});
        });
    };

    const sendReportPagesToMainTread = () => {

        pages.getValues().forEach((page) => {
            const fields = [...page.getHeader().getValues(), ...page.getDetail().getValues(), ...page.getFooter().getValues()];
            fields.forEach((field) => {
                field.getInfo().getSectionLine().getControls().forEach((k, c) => c.setSectionLine(null));
                field.getInfo().getSectionLine().getControls().setSectionLine(null);
                field.getInfo().getSectionLine().getControls().setCopyColl(null);
                field.getInfo().getSectionLine().setCopyColl(null);
            });
        });

        postMessage({action: 'get-report-start' });

        let start = 0;
        const CHUNK_SIZE = 10;
        while(true) {
            const chunk = pages.getChunk(start, CHUNK_SIZE);
            if(chunk.count() === 0) break;
            start += CHUNK_SIZE;
            postMessage({action: 'get-report-pages', pages: JSON.stringify(chunk) });
        }

        postMessage({action: 'get-report-done' });
    };

    return {
        init,
        reportProgress,
        reportDone,
        registerDataSource,
        launch,
        sendReportPagesToMainTread
    }
})();

onmessage = function (e) {
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

        case 'get-report':
            reportWorker.sendReportPagesToMainTread();
            break;

        default:
            postMessage({ message: 'unknown action: ' + e.data.action });
    }
}