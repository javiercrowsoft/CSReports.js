namespace CSReportEngine {

    import Map = CSOAPI.Map;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import ReportGlobals = CSReportGlobals.ReportGlobals;

    export class cReportControls extends Map<cReportControl> {

        // it is a reference to the controls collection of cReport
        //
        private copyColl: cReportControls2 = null;
        private typeSection: csRptSectionType = null;
        private collByLeft: number[] = null;

        // this reference tell in which section line is this controls collection
        //
        private sectionLine: cReportSectionLine = null;

        constructor() {
            super(null, false, cReportControl);
        }

        public getTypeSection() {
            return this.typeSection;
        }

        public setTypeSection(rhs: csRptSectionType) {
            this.typeSection = rhs;
        }

        public getCopyColl() {
            return this.copyColl;
        }

        public setCopyColl(rhs: cReportControls2) {
            this.copyColl = rhs;
        }

        public getSectionLine() {
            return this.sectionLine;
        }

        public setSectionLine(rhs: cReportSectionLine) {
            this.sectionLine = rhs;

            let ctrl: cReportControl = null;
            for(let _i = 0; _i < this.count(); _i++) {
                ctrl = this.item(_i);
                ctrl.setSectionLine(rhs);
            }
        }

        public getCollByLeft() {
            return this.collByLeft;
        }

        public add(c?: cReportControl, key?: string) {
            try {

                if(c === null || c === undefined) {
                    c = new cReportControl();
                }
                if(key === "" || key === null || key === undefined) {
                    key = ReportGlobals.getNextKey().toString();
                }
                else {
                    ReportGlobals.refreshNextKey(key);
                }

                key = ReportGlobals.getKey(key);
                this.baseAdd(c, key);

                c.setKey(key);
                c.setTypeSection(this.typeSection);
                c.setSectionLine(this.sectionLine);

                if(this.copyColl !== null) {
                    this.copyColl.add2(c, key);
                }
                return c;
            }
            catch(ignore) {
                return null;
            }
        }

        public clear() {
            try {
                let n: number = this.count();
                for(let i = 0; i < n; i++) {
                    this.remove(0);
                }
            }
            catch(ignore) {
            }
        }

        public remove(index: number|string) {
            try {
                this.item(index).setSectionLine(null);
                if(this.copyColl !== null) {
                    this.copyColl.remove(this.item(index).getKey());
                }
                this.baseRemove(index);
            }
            catch(ignore) {
            }
        }

        public orderCollByLeft() {
            let j: number = 0;
            let i: number = 0;
            let tmp: number = 0;
            let ctl1: cReportControl = null;
            let ctl2: cReportControl = null;

            this.collByLeft = [];

            for(i = 0; i < this.count(); i++) {
                this.collByLeft[i] = i;
            }

            for(i = 0; i < this.count()-1; i++) {
                for(j = i; j < this.count()-1; j++) {
                    ctl1 = this.item(this.collByLeft[j]);
                    ctl2 = this.item(this.collByLeft[j + 1]);

                    if(ctl2.getLabel().getAspect().getLeft() < ctl1.getLabel().getAspect().getLeft()) {
                        tmp = this.collByLeft[j];
                        this.collByLeft[j] = this.collByLeft[j + 1];
                        this.collByLeft[j + 1] = tmp;
                    }
                }
            }
        }
    }
}
