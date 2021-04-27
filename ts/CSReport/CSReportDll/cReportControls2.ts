namespace CSReportDll {

    import Map = CSOAPI.Map;
    import ReportGlobals = CSReportGlobals.ReportGlobals;

    export class cReportControls2 extends Map<cReportControl> {

        public add2(c: cReportControl, key: string) {
            try {
                if (c === null)  {
                    c = new cReportControl();
                }

                if (key === "") {
                    this.baseAdd(c, this.getDummyKey());
                }
                else {
                    this.add(c, ReportGlobals.getKey(key));
                }

                return c;
            }
            catch (ex) {
                return null;
            }
        }

        private getDummyKey() {
            return "dummy_key_" + this.count().toString();
        }
    }
}
