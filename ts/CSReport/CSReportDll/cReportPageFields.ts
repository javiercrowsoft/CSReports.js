namespace CSReportDll {

    import Map = CSOAPI.Map;

    export class cReportPageFields extends Map<cReportPageField> {

        constructor() {
            super(null, false, cReportPageField);
        }
    }

}
