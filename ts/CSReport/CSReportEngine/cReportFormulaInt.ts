namespace CSReportEngine {

    import csRptFormulaType = CSReportGlobals.csRptFormulaType;

    export class cReportFormulaInt {

        private variables: cReportVariables = new cReportVariables();
        private parameters: cReportFormulaParameters = new cReportFormulaParameters();
        private formulaType: csRptFormulaType = 0;

        public getVariables() {
            return this.variables;
        }

        public getParameters() {
            return this.parameters;
        }

        public getFormulaType() {
            return this.formulaType;
        }

        public setFormulaType(rhs: csRptFormulaType) {
            this.formulaType = rhs;
        }
    }
}
