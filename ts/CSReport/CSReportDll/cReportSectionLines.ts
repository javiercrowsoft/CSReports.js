

namespace CSReportDll
{

    export class cReportSectionLines {


    {

        // it is a reference to the controls collection of cReport
        //
        private copyColl: cReportControls2 = null;
        private typeSection: csRptSectionType = null;
        private coll: Hashtable = new Hashtable();
        private keys: List = new List();

        // Creates an empty collection.
        public constructor() {
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

            for(var _i = 0; _i < this.count(); _i++) {
                sectionLn = item(_i);
                sectionLn.setCopyColl(rhs);
            }
        }

        public getCopyColl() {
            return this.copyColl;
        }

		public add() {
			return add (null, "", -1);
		}
        public add(c: cReportSectionLine, key: string, index: number) {
            try {
                if (c === null)  {
                    c = new cReportSectionLine();
                }
                if (key === "") {
                    key = ReportGlobals.getNextKey().toString();
                }
                else {
                    ReportGlobals.refreshNextKey(key);
                }

                key = ReportGlobals.getKey(key);

                if ( && this.count() > 0) {
                    this.keys.Insert(index, key);
                }
                else {
                    this.keys.Add(key);
                }

                this.coll.Add(key, c);

                c.setCopyColl(this.copyColl);
                c.setTypeSection(this.typeSection);

                pRefreshIndex();
                c.setIndex(this.count()-1);
                c.setKey(key);

                return c;
            }
            catch (ex) {
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
                let w_item: cReportSectionLine = item(key);
                if (w_item !== null) {
                    if (w_item.getControls() !== null) {
                        w_item.getControls().clear();
                        w_item.getControls().setSectionLine(null);
                        w_item.getControls().setCopyColl(null);
                    }
                    this.coll.Remove(key);
                    this.keys.Remove(key);
                }

                return;
            }
            catch(ex) {
            }
        }

        public remove(index: number) {
            try {
                let w_item: cReportSectionLine = item(index);
                if (w_item !== null) {
                    if (w_item.getControls() !== null) {
                        w_item.getControls().clear();
                        w_item.getControls().setSectionLine(null);
                        w_item.getControls().setCopyColl(null);
                    }
                    this.coll.Remove(this.keys[index]);
                    this.keys.RemoveAt(index);
                }

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
                return this.coll[key];
            }
            catch (ex) {
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



    } 



}
