namespace CSReportEngine {

    import Map = CSOAPI.Map;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import ReportGlobals = CSReportGlobals.ReportGlobals;

    export class cReportSections extends Map<cReportSection> {

        // it is a reference to the controls collection of cReport
        //
        private copyColl: cReportControls2 = null;
        private typeSection: csRptSectionType = null;
        private mainTypeSection: csRptSectionType = null;
        private _keys = [];

        constructor() {
            super(null, false, cReportSection);
        }

        public getTypeSection() {
            return this.typeSection;
        }

        public setTypeSection(rhs: csRptSectionType) {
            this.typeSection = rhs;
        }

        public setMainTypeSection(rhs: csRptSectionType) {
            this.mainTypeSection = rhs;
        }

        public setCopyColl(rhs: cReportControls2) {
            this.copyColl = rhs;

            if(this.count() > 0) {
                for(let _i = 0; _i < this.count(); _i++) {
                    this.item(_i).setCopyColl(rhs);
                }
            }
        }

        public add(c: cReportSection = null, key: string = "", index: number = -1) {
            try {
                if(c === null || undefined) {
                    c = new cReportSection();
                }
                if(key === "" || key === null || key === undefined) {
                    key = ReportGlobals.getNextKey().toString();
                }
                else {
                    ReportGlobals.refreshNextKey(key);
                }

                key = ReportGlobals.getKey(key);

                if(index !== -1 && this.count() > 0) {
                    this._keys.splice(index, 0, key);
                }
                else {
                    this._keys.push(key);
                }

                this.baseAdd(c, key);
                c.setCopyColl(this.copyColl);

                if(this.count() === 1) {
                    c.setTypeSection(this.mainTypeSection);
                }
                else {
                    c.setTypeSection(this.typeSection);
                }

                this.refreshIndex();

                c.setIndex(this.count()-1);
                c.setKey(key);

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
                return;
            }
            catch(ignore) {
            }
        }

        public remove(indexOrKey: string|number) {
            try {
                this.item(indexOrKey).getSectionLines().clear();
                if(typeof indexOrKey !== "string") {
                    this.baseRemove(this._keys[indexOrKey]);
                } else {
                    this.baseRemove(indexOrKey);
                }

                this.keyRemove(indexOrKey);

                for(let i = 0; i < this.count(); i++) {
                    let sec: cReportSection = this.item[this._keys[i]];
                    sec.setIndex(i);
                    sec.setName(sec.getName().substring(0, 2).replaceAll("_", "")
                                + "_" + i.toString());
                }
                this.refreshIndex();
            }
            catch(ignore) {
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
    }
}
