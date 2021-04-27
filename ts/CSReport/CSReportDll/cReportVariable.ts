namespace CSReportDll {

    export class cReportVariable {

        private value: object = null;

        public getValue() {
            return this.value;
        }

        public setValue(rhs: object) {
            this.value = rhs;
        }
    }
}
