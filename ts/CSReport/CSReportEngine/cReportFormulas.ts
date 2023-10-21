namespace CSReportEngine {

    import Map = CSOAPI.Map;

    export class cReportFormulas extends Map<cReportFormula> {

        // @ts-ignore
        public add(name: string) {
            try {
                let c: cReportFormula = new cReportFormula();
                c.setName(name);
                this.baseAdd(c, name);
                return c;
            } catch {
                return null;
            }
        }

        public add2(formula: cReportFormula, name: string) {
            try {
                this.baseAdd(formula, name);
                formula.setNotSave(true);
            } catch {
            }
        }
    }
}
