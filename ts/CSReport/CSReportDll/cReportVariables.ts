namespace CSReportDll {

    import Map = CSOAPI.Map;

    export class cReportVariables extends Map<cReportVariable> {

        constructor() {
            super(null, false, cReportVariable);
        }
    }

}
