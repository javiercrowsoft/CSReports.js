namespace CSReportDll {

    export class cReportFormulaParameter {

        private value: string = "";

        public getValue() {
            return this.value;
        }

        public setValue(rhs: string) {
            this.value = rhs;
        }
    }
}
