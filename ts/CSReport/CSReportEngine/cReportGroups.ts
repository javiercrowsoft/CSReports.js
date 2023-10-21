namespace CSReportEngine {

    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import ReportGlobals = CSReportGlobals.ReportGlobals;
    import Map = CSOAPI.Map;

    export class cReportGroups extends Map<cReportGroup>{

        private groupsHeaders: cReportSections = new cReportSections();
        private groupsFooters: cReportSections = new cReportSections();

        constructor() {
            super(null, false, cReportGroup);
        }

        public getGroupsHeaders() {
            return this.groupsHeaders;
        }

        public setGroupsHeaders(rhs: cReportSections) {
            this.groupsHeaders = rhs;
        }

        public getGroupsFooters() {
            return this.groupsFooters;
        }

        public setGroupsFooters(rhs: cReportSections) {
            this.groupsFooters = rhs;
        }

        public add(c: cReportGroup, key: string) {
            try  {
                if(c === null)  {
                    c = new cReportGroup();
                }
                if(key === "")  {
                    key = ReportGlobals.getNextKey().toString();
                }
                else  {
                    ReportGlobals.refreshNextKey(key);
                }

                key = ReportGlobals.getKey(key);
                this.baseAdd(c, key);

                c.setKey(key);
                c.setIndex(this.count()-1);

                c.setHeader(this.groupsHeaders.add(null, "", -1));
                c.setFooter(this.groupsFooters.add(null, "", 0));

                this.setName(c, "G_" + c.getIndex().toString());
                this.setName(c.getHeader(), c.getName());
                this.setName(c.getFooter(), c.getName());

                c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER);
                c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER);

                return c;
            }
            catch (ex) {
                return null;
            }
        }

        public add2(c: cReportGroup, key: string) {
            try  {
                if(c === null)  {
                    c = new cReportGroup();
                }
                if(key === "")  {
                    key = ReportGlobals.getNextKey().toString();
                }
                else  {
                    ReportGlobals.refreshNextKey(key);
                }

                key = ReportGlobals.getKey(key);
                this.baseAdd(c, key);

                c.setKey(key);
                c.setIndex(this.count());

                this.groupsHeaders.add(c.getHeader(), "", -1);
                this.groupsFooters.add(c.getFooter(), "", 0);

                this.setName(c, "G_" + c.getIndex().toString());
                this.setName(c.getHeader(), c.getName());
                this.setName(c.getFooter(), c.getName());

                c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER);
                c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER);

                return c;
            }
            catch(ex) {
                return null;
            }
        }

        private setName(c: cReportGroup | cReportSection, name: string) {
            c.setName(this.setName2(c.getName(), name));
        }

        private setName2(section: string, name: string) {
            let sectionName: string = section.toLowerCase();
            if(sectionName.length === 0
                || sectionName.substring(0, 5) === "group"
                || sectionName.substring(0, 5) === "grupo"
                || sectionName.substring(0, 3) === "gh_"
                || sectionName.substring(0, 3) === "gf_"
                || sectionName.substring(0, 2) === "g_"
                ) {
                return name;
            }
            else {
                return section;
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

        public remove(key: string | number) {
            try {
                let keyH: string = "";
                let keyF: string = "";

                keyH = this.groupsHeaders.item(this.item(key).getHeader().getKey()).getKey();
                keyF = this.groupsFooters.item(this.item(key).getFooter().getKey()).getKey();

                this.groupsHeaders.remove(keyH);
                this.groupsFooters.remove(keyF);

                this.baseRemove(key);

                // Update the index
                //
                for(let i = 0; i < this.count(); i++) {
                    this.item(i).setIndex(i);
                    this.item(i).fixName();
                }
            }
            catch (ex) {
            }
        }
    }
}
