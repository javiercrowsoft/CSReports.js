namespace CSReportEngine {

    export class cReportVariable {

        private value: any = null;

        public getValue() {
            return this.value;
        }

        public setValue(rhs: any) {
            this.value = rhs;
        }
    }
}
