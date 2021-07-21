namespace CSReportDll {

    import Map = CSOAPI.Map;

    export class cReportFormulaParameters extends Map<cReportFormulaParameter> {

        public add2(value: string, key?: string) {
            try {
                let c: cReportFormulaParameter = new cReportFormulaParameter();
                c.setValue(value);
                this.add(c, key);
                return c;
            }
            catch(ex) {
                return null;
            }
        }
    }

}
