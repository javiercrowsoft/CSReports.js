namespace CSReportEngine {

    import Map = CSOAPI.Map;
    import ReportGlobals = CSReportGlobals.ReportGlobals;

    export class cReportPageSettings extends Map<cReportPageInfo> {

        private height: number = 0;

        public getHeight() {
            return this.height;
        }

        public setHeight(rhs: number) {
            this.height = rhs;
        }

        public add2(sectionLine: cReportSectionLine,
                    c: cReportPageInfo,
                    key: string) {
            try {
                if(c === null) {
                    c = new cReportPageInfo();
                }
                if(key === "") {
                    key = ReportGlobals.getNextKey().toString();
                }

                key = ReportGlobals.getKey(key);
                this.baseAdd(c, key);
                c.setSectionLine(sectionLine);
                return c;
            }
            catch(ignore) {
                return null;
            }
        }
    }
}
