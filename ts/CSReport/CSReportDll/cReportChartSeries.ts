namespace CSReportDll {

    import Map = CSOAPI.Map;

    export class cReportChartSeries extends Map<cReportChartSequence> {

        constructor() {
            super(null, false, cReportChartSequence);
        }

        public add(value?: cReportChartSequence, key?: string): cReportChartSequence {
            if(value === null || value === undefined) {
                value = new cReportChartSequence();
            }
            return this.baseAdd(value, key);
        }
    }

}
