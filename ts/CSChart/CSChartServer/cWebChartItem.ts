///<reference path="../../CSOAPI/NotImplementedException.ts"/>

namespace CSChartServer {

    import NotImplementedException = CSOAPI.NotImplementedException;

    export class cWebChartItem {

        private primaryValue: number = 0;
        private primaryLabel: string = "";
        private pieLabel: string = "";
        private alternateValue: number = 0;
        private alternateLabel: string = "";
        private explode: boolean = false;

        public setPrimaryValue(value: number) {
            this.primaryValue = value;
        }

        public setPrimaryLabel(label: string) {
            this.primaryLabel = label;
        }

        public setPieLabel(value: string) {
            this.pieLabel = value;
        }

        public setAlternateValue(value: number) {
            this.alternateValue = value;
        }

        public setAlternateLabel(value: string) {
            this.alternateLabel = value;
        }

        public setExplode(value: boolean) {
            this.explode = value;
        }

        public getPrimaryValue() {
            return this.primaryValue;
        }

        public getPrimaryLabel() {
            return this.primaryLabel;
        }
    }
}
