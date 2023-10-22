namespace CSReportEngine {

    import Map = CSOAPI.Map;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import ReportGlobals = CSReportGlobals.ReportGlobals;

    export class cReportSectionLines extends Map<cReportSectionLine> {

        // it is a reference to the controls collection of cReport
        //
        private copyColl: cReportControls2 = null;
        private typeSection: csRptSectionType = null;
        private _keys = [];

        constructor() {
            super(null, false, cReportSectionLine);
        }

        public getTypeSection() {
            return this.typeSection;
        }

        public setTypeSection(rhs: csRptSectionType) {
            this.typeSection = rhs;
        }

        public setCopyColl(rhs: cReportControls2) {
            let sectionLn: cReportSectionLine = null;
            this.copyColl = rhs;

            for(let _i = 0; _i < this.count(); _i++) {
                sectionLn = this.item(_i);
                sectionLn.setCopyColl(rhs);
            }
        }

        public getCopyColl() {
            return this.copyColl;
        }

		public add(c: cReportSectionLine = null, key: string = "", index: number = -1) {
            try {
                if(c === null || c === undefined)  {
                    c = new cReportSectionLine();
                }
                if(key === "" || key === undefined) {
                    key = ReportGlobals.getNextKey().toString();
                }
                else {
                    ReportGlobals.refreshNextKey(key);
                }

                key = ReportGlobals.getKey(key);

                if(index != -1 && this.count() > 0) {
                    this._keys.splice(index, 0, key);
                }
                else {
                    this._keys.push(key);
                }

                this.baseAdd(c, key);

                c.setCopyColl(this.copyColl);
                c.setTypeSection(this.typeSection);

                this.refreshIndex();
                c.setIndex(this.count()-1);
                c.setKey(key);

                return c;
            }
            catch(ex) {
                return null;
            }
        }

        public clear() {
            try {
                let n: number = this.count();
                for(let i = 0; i < n; i++) {
                    this.remove(0);
                }
                return;
            }
            catch(ex) {
            }
        }

        public remove(indexOrKey: string | number) {
            try {
                let w_item: cReportSectionLine = this.item(indexOrKey);
                if(w_item !== null) {
                    if(w_item.getControls() !== null) {
                        w_item.getControls().clear();
                        w_item.getControls().setSectionLine(null);
                        w_item.getControls().setCopyColl(null);
                    }
                    if(typeof indexOrKey !== "string") {
                        this.baseRemove(this._keys[indexOrKey]);
                    } else {
                        this.baseRemove(indexOrKey);
                    }
                    this.keyRemove(indexOrKey);
                }
            }
            catch(ex) {
            }
        }

        private keyRemove(indexOrKey: string|number): void {
            if(typeof indexOrKey === "string")
                this.keyRemoveByKey(indexOrKey);
            else
                this.keyRemoveByIndex(indexOrKey);
        }

        private keyRemoveByKey(key: string): void {
            this.keyRemoveByIndex(this._keys.indexOf(key));
        }

        private keyRemoveByIndex(index: number): void {
            if(index > -1) {
                this._keys.splice(index,1);
            }
        }

        private refreshIndex() {
            for(let i = 0; i < this.count(); i++) {
                this.item(i).setRealIndex(i);
            }
        }

        public item(indexOrKey: string|number) {
            try {
                if(typeof indexOrKey !== "string") {
                    // it is an index so we need to search for the
                    // key associated with that position
                    //
                    return this.baseItem(this._keys[indexOrKey]);
                }
                else {
                    // it was a key
                    return this.baseItem(indexOrKey);
                }
            }
            catch {
                return null;
            }
        }

        toString() {
            return "lines count: " + this.count();
        }
    }
}
