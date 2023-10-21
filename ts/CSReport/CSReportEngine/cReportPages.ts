namespace CSReportEngine {

    import Map = CSOAPI.Map;

    export class cReportPages extends Map<cReportPage> {

        constructor() {
            super(null, false, cReportPage);
        }
    }

}
