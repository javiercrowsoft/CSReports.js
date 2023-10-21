namespace CSReportEngine {

    import Map = CSOAPI.Map;

    export class cReportFormulasInt extends Map<cReportFormulaInt> {

        public add(value?: cReportFormulaInt, key?: string): cReportFormulaInt {
            if(value === null || value === undefined) {
                value = new cReportFormulaInt();
            }
            return this.baseAdd(value, key);
        }
    }

}
