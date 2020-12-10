(function(globalObject) {

    // @ts-ignore
    globalObject.CSChartServer = globalObject.CSChartServer || {};

    globalObject.CSChartServer.createCWebChartItems = function() {

        let self: CSChartServer.IcWebChartItems = globalObject.CSOAPI.createList<CSChartServer.IcWebChartItem>(
            globalObject.CSChartServer.createCWebChartItem);

        return self;
    }

}(globalObject));

namespace CSChartServer {

  export interface IcWebChartItems extends CSOAPI.IList<CSChartServer.IcWebChartItem> { }

}
