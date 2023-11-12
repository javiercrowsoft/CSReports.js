const reportWorker = (()=> {

    let pages: CSReportEngine.cReportPages = null;
    let images: CSOAPI.Map<CSDrawing.ImageX> = null;

    const init = () => {
        String.prototype.contains = function(value: string): boolean {
            let d = String(this);
            return(d.indexOf(value) > -1);
        }

        String.prototype.format = function(format: string): string {
            console.log('in String Prototype 2 : ' + format);
            return String(this);
        }
    };

    const reportProgress = (report: CSReportEngine.cReport, eventArgs: CSReportEngine.ProgressEventArgs) => {
        postMessage({ action: 'report-progress', eventArgs: eventArgs });
    };

    const reportDone = (report: CSReportEngine.cReport) => {
        postMessage({ action: 'report-generation-done' });
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
            images = report.getImages();
            postMessage({action: 'worker-launch-complete-successfully', message: 'report launch completes successfully'});
        })
        .catch((reason)=> {
            postMessage({action: 'worker-launch-failed', message: 'report launch failed', reason: reason});
        });
    };

    const sendReportPagesToMainTread = () => {

        const eventArgs = new CSReportEngine.ProgressEventArgs("Formating pages", 0, 0, 0);
        postMessage({action: 'get-report-start', eventArgs: eventArgs });

        postMessage({action: 'get-report-images', images: JSON.stringify(images), eventArgs: eventArgs });

        pages.getValues().forEach((page) => {
            const fields = [...page.getHeader().getValues(), ...page.getDetail().getValues(), ...page.getFooter().getValues()];
            fields.forEach((field) => {
                //
                // remove references to copyCol and sectionLine
                //
                field.getInfo().getSectionLine().getControls().forEach((k, c) => c.setSectionLine(null));
                field.getInfo().getSectionLine().getControls().setSectionLine(null);
                field.getInfo().getSectionLine().getControls().setCopyColl(null);
                field.getInfo().getSectionLine().setCopyColl(null);
                //
                // remove images from cReportPageField and only put the key
                //
                if(field.getImage() !== null && field.getImage() !== undefined) {
                    field.getImage().removeImageBitmap();
                }
            });
        });

        let start = 0;
        const CHUNK_SIZE = 10;
        while(true) {
            const chunk = pages.getChunk(start, CHUNK_SIZE);
            if(chunk.count() === 0) break;
            start += CHUNK_SIZE;
            const eventArgs = new CSReportEngine.ProgressEventArgs("Formating pages", start, start, pages.size());
            postMessage({action: 'get-report-pages', pages: JSON.stringify(chunk), eventArgs: eventArgs });
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