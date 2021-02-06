

namespace CSReportDll
{
    export class cReportGroups {


    {

        // Creates an empty collection.
        public constructor() {
        }

        // Adds elements from an IDictionary into the new collection.
        public constructor(d: IDictionary, bReadOnly: boolean) {
            for(var t_ = 0; t_ < d.length; t_++) {
                this.BaseAdd(de.Key, de.Value);
            }
            this.IsReadOnly = bReadOnly;
        }

        // Gets a key-and-value pair (DictionaryEntry) using an index.
        public DictionaryEntry this[int index]
        {
UNKNOWN >>             get
            {
                return (new DictionaryEntry(
                    this.BaseGetKey(index), this.BaseGet(index)));
            }
        }

        // Gets or sets the value associated with the specified key.
        public Object this[String key]
        {
UNKNOWN >>             get
            {
                return (this.BaseGet(key));
            }
UNKNOWN >>             set
            {
                this.BaseSet(key, value);
            }
        }

        // Gets a String array that contains all the keys in the collection.
        public String[] AllKeys
        {
UNKNOWN >>             get
            {
                return (this.BaseGetAllKeys());
            }
        }

        // Gets an Object array that contains all the values in the collection.
UNKNOWN >>         public Array AllValues
        {
UNKNOWN >>             get
            {
                return (this.BaseGetAllValues());
            }
        }

        // Gets a String array that contains all the values in the collection.
        public String[] AllStringValues
        {
UNKNOWN >>             get
            {
                return (this.BaseGetAllValues(typeof(String)));
            }
        }

        // Gets a value indicating if the collection contains keys that are not null.
UNKNOWN >>         public Boolean HasKeys
        {
UNKNOWN >>             get
            {
                return (this.BaseHasKeys());
            }
        }

        // Adds an entry to the collection.
        public Add(key: string, value: object) {
            this.BaseAdd(key, value);
        }

        // Removes an entry with the specified key from the collection.
        private Remove(key: string) {
            this.BaseRemove(key);
        }

        // Removes an entry in the specified index from the collection.
        private Remove(index: number) {
            this.BaseRemoveAt(index);
        }

        // Clears all the elements in the collection.
        private Clear() {
            this.BaseClear();
        }

        private groupsHeaders: cReportSections = new cReportSections();
        private groupsFooters: cReportSections = new cReportSections();

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
                if (c === null)  {
                    c = new cReportGroup();
                }
                if (key === "")  {
                    key = cReportGlobals.getNextKey().toString();
                } 
                else  {
                    cReportGlobals.refreshNextKey(key);
                }

                key = cReportGlobals.getKey(key);
                Add(key, c);

                c.setKey(key);
                c.setIndex(count()-1);

                c.setHeader(this.groupsHeaders.add(null, "", -1));
                c.setFooter(this.groupsFooters.add(null, "", 0));

                pSetName(c, "G_" + c.getIndex().toString());
                pSetName(c.getHeader(), c.getName());
                pSetName(c.getFooter(), c.getName());

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
                if (c === null)  {
                    c = new cReportGroup();
                }
                if (key === "")  {
                    key = cReportGlobals.getNextKey().toString();
                } 
                else  {
                    cReportGlobals.refreshNextKey(key);
                }

                key = cReportGlobals.getKey(key);
                Add(key, c);

                c.setKey(key);
                c.setIndex(this.Count);

                this.groupsHeaders.add(c.getHeader(), "", -1);
                this.groupsFooters.add(c.getFooter(), "", 0);

                pSetName(c, "G_" + c.getIndex().toString());
                pSetName(c.getHeader(), c.getName());
                pSetName(c.getFooter(), c.getName());

                c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER);
                c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER);

                return c;
            } 
            catch(ex) {
                return null;
            }
        }

        private pSetName(c: cReportGroup, name: string) {
            c.setName(pSetName(c.getName(), name));
        }
        private pSetName(c: cReportSection, name: string) {
            c.setName(pSetName(c.getName(), name));
        }
        private pSetName(section: string, name: string) {
            let sectionName: string = section.toLowerCase();
            if (sectionName.Length === 0
                || cUtil.subString(sectionName, 0, 5) === "group"
                || cUtil.subString(sectionName, 0, 5) === "grupo"
                || cUtil.subString(sectionName, 0, 3) === "gh_"
                || cUtil.subString(sectionName, 0, 3) === "gf_"
                || cUtil.subString(sectionName, 0, 2) === "g_"
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
                let keyH: string = "";
                let keyF: string = "";

                keyH = this.groupsHeaders.item(item(key).getHeader().getKey()).getKey();
                keyF = this.groupsFooters.item(item(key).getFooter().getKey()).getKey();

                this.groupsHeaders.remove(keyH);
                this.groupsFooters.remove(keyF);

                Remove(key);

                // Update the index
                //
                for(var i = 0; i < this.Count; i++) {
                    item(i).setIndex(i);
                }
            }
            catch (ex) {
            }
        }

        public remove(index: number) {
            try {
                let keyH: string = "";
                let keyF: string = "";

                keyH = this.groupsHeaders.item(item(index).getHeader().getKey()).getKey();
                keyF = this.groupsFooters.item(item(index).getFooter().getKey()).getKey();

                this.groupsHeaders.remove(keyH);
                this.groupsFooters.remove(keyF);

                Remove(index);

                // Update the index
                //
                for(var i = 0; i < this.Count; i++) {
                    item(i).setIndex(i);
                    item(i).fixName();
                }
            }
            catch (ex) {
            }
        }

        public count() {
            return this.Count;
        }

        public item(key: string) {
            try {
                return this.BaseGet(key);
            }
            catch(ex) {
                return null;
            }
        }

        public item(index: number) {
            try {
                return this.BaseGet(index);
            }
            catch(ex) {
                return null;
            }
        }



    }    }



}
