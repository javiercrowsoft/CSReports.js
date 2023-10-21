namespace CSReportEngine {

    import Map = CSOAPI.Map;

    export class cColumnsInfo extends Map<cColumnInfo> {

        constructor() {
            super(null, false, cColumnInfo);
        }
    }

}