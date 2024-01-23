namespace CSReportEngine {

    import Map = CSOAPI.Map;
    import ReportGlobals = CSReportGlobals.ReportGlobals;

    export class cColumnsInfo extends Map<cColumnInfo> {

        constructor() {
            super(null, false, cColumnInfo);
        }

        public add(c: cColumnInfo, key: string) {
            try  {
                if(c === null) {
                    c = new cColumnInfo();
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