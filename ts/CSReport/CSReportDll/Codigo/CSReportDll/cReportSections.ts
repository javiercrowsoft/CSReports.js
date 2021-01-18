

namespace CSReportDll
{
    export class cReportSections {


    {

        private C_MODULE: string = "cReportSections";

        private coll: Dictionary = new Dictionary();
        private keys: List = new List();

        // it is a reference to the controls collection of cReport
        //
        private copyColl: cReportControls2 = null;
        private typeSection: csRptSectionType = null;
        private mainTypeSection: csRptSectionType = null;

        // Creates an empty collection.
        public constructor() {
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

            if (this.coll !== null)  {
                let section: cReportSection = null;

                for(var _i = 0; _i < this.count(); _i++) {
                    section = item(_i);
                    section.setCopyColl(rhs);
                }
            }
        }

		public add() {
			return add(null, "");
		}
        public add(c: cReportSection, key: string) {
            return add(c, key, -1);
        }

        public add(c: cReportSection, key: string, index: number) {
            try {
                if (c === null) {
                    c = new cReportSection();
                }
                if (key === "") {
                    key = cReportGlobals.getNextKey().ToString();
                }
                else {
                    cReportGlobals.refreshNextKey(key);
                }

                key = cReportGlobals.getKey(key);

                if ( && this.count() > 0) {
                    this.keys.Insert(index, key);
                }
                else {
                    this.keys.Add(key);
                }

                this.coll.Add(key, c);
                c.setCopyColl(this.copyColl);

                if (this.count() === 1) {
                    c.setTypeSection(this.mainTypeSection);
                }
                else {
                    c.setTypeSection(this.typeSection);
                }

                pRefreshIndex();

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
                for(var i = 0; i < n; i++) {
                    remove(0);
                }
                return;
            }
            catch(ex) {
            }
        }

        public remove(key: string) {
            try {
                item(key).getSectionLines().clear();
                this.coll.Remove(key);
                this.keys.Remove(key);

                for(var i = 0; i < this.count(); i++) {
                    this.coll[this.keys[i]].setIndex(i);
                    this.coll[this.keys[i]].setName(this.coll[this.keys[i]].getName().Substring(0, 2).Replace("_", "") 
                                                + "_" + i.ToString());
                }
                pRefreshIndex();
                return;
            }
            catch(ex) {
            }
        }

        public remove(index: number) {
            try {
                item(index).getSectionLines().clear();
                this.coll.Remove(this.keys[index]);
                this.keys.RemoveAt(index);

                for(var i = 0; i < this.count(); i++) {
                    let sec: cReportSection = this.coll[this.keys[i]];
                    sec.setIndex(i);
                    sec.setName(sec.getName().Substring(0, 2).Replace("_", "")
                                + "_" + i.ToString());
                }
                pRefreshIndex();
                return;
            }
            catch(ex) {
            }
        }

        public count() {
            return this.coll.Count;
        }

        public item(key: string) {
            try {
                if (this.coll.ContainsKey(key)) {
                    return this.coll[key];
                }
                else {
                    return null;
                }                
            }
            catch(ex) {
                return null;
            }
        }

        public item(index: number) {
            try {
                return this.coll[this.keys[index]];
            }
            catch(ex) {
                return null;
            }
        }

        private pRefreshIndex() {
            for(var i = 0; i < this.count(); i++) {
                item(i).setRealIndex(i);
            }
        }



    }    }



}
