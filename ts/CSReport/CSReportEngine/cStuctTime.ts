namespace CSReportEngine {

    export class cStructTime {

        private hour: number = 0;
        private minute: number = 0;
        private second: number = 0;

        public getHour() {
            return this.hour;
        }

        public setHour(rhs: number) {
            this.hour = rhs;
        }

        public getMinute() {
            return this.minute;
        }

        public setMinute(rhs: number) {
            this.minute = rhs;
        }

        public getSecond() {
            return this.second;
        }

        public setSecond(rhs: number) {
            this.second = rhs;
        }
    }
}
