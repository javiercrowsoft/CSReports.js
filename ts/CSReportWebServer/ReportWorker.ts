onmessage = function (e) {
    console.log('Worker: Message received from main script');

    switch(e.data.action) {
        case 'launch':
            const report = new CSReportEngine.cReport();
            report.copy(JSON.parse(e.data.reportAsJson));
            report.launch().then(()=> {
                console.log('Worker: Posting message back to main script');
                postMessage({message: 'report done'});
            })
            .catch(()=> {
                console.log('Worker: Posting error back to main script');
                postMessage({message: 'report failed'});
            });
            break;
        default:
            postMessage({ message: 'unknown action: ' + e.data.action });
    }
}