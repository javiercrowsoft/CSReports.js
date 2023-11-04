namespace CSReportEngine {

    import Map = CSOAPI.Map;

    export class cReportPages extends Map<cReportPage> {
        constructor() {
            super(null, false, cReportPage);
        }

        public copy(from: any) {
            super.baseClear();
            for(let i = 0; i < from.values.length; i++) {
                const pageTo = super.baseAdd(null, from.keys[i]);
                const pageFrom = from.values[i];
                if(!pageTo.copy(pageFrom)) return false;
            }
        }
    }

}
