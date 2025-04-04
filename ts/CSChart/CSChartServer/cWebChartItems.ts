///<reference path="../../CSOAPI/Map.ts"/>

namespace CSReports.CSChartServer {

    import Map = CSOAPI.Map;

    export class cWebChartItems extends Map<cWebChartItem> {

        constructor() {
            super(null, false, cWebChartItem);
        }
    }

}