namespace CSConnect {

    import Map = CSOAPI.Map;
    import ReportGlobals = CSReportGlobals.ReportGlobals;

    export class cParameters extends Map<cParameter> {

        constructor() {
            super(null, false, cParameter);
        }

        public add(c: cParameter, key: string) {
            try  {
                if(c === null) {
                    c = new cParameter();
                }
                if(key === "") {
                    key = ReportGlobals.getNextKey().toString();
                }
                else  {
                    ReportGlobals.refreshNextKey(key);
                }

                key = ReportGlobals.getKey(key);
                this.baseAdd(c, key);

                c.setKey(key);
                return c;
            }
            catch(ignore) {
                return null;
            }
        }

    }

}
