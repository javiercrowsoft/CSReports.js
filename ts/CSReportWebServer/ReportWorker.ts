const worker = (()=> {

    const init = () => {
        String.prototype.contains = function(value: string): boolean {
            let d = String(this);
            return(d.indexOf(value) > -1);
        }

        String.prototype.format = function(format: string): string {
            return String(this);
        }
    };

    return {
        init
    }
})();


onmessage = function (e) {
    console.log('Worker: Message received from main script');

    switch(e.data.action) {

        case 'init':
            worker.init()
            break;

        case 'launch':
            const report = new CSReportEngine.cReport();
            const reportFrom: CSReportEngine.ReportDTO = JSON.parse(e.data.report);
            report.copy(reportFrom);

            const launchInfo = new CSReportEngine.cReportLaunchInfo();
            const launchInfoFrom: CSReportEngine.ReportLaunchInfoDTO = JSON.parse(e.data.launchInfo);
            launchInfo.copy(launchInfoFrom);

            report.onReportDone((report: CSReportEngine.cReport) => {});
            report.onProgress((report: CSReportEngine.cReport, eventArgs: CSReportEngine.ProgressEventArgs) => {});

            report.launch(launchInfo).then(()=> {
                console.log('Worker: Posting message back to main script');
                postMessage({message: 'report done'});
            })
            .catch((reason)=> {
                console.log('Worker: Posting error back to main script');
                postMessage({message: 'report failed', reason: reason});
            });
            break;
        default:
            postMessage({ message: 'unknown action: ' + e.data.action });
    }
}