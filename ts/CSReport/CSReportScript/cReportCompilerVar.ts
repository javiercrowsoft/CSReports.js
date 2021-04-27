namespace CSReportScript {

    export class cReportCompilerVar {

        private value: object = null;

        public getValue() {
            return this.value;
        }

        public setValue(rhs: object) {
            this.value = rhs;
        }
    }
}
