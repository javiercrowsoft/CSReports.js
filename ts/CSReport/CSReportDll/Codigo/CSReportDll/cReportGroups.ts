(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportGroups = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportGroups = {};

        // Creates an empty collection.
        const cReportGroups = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cReportGroups = function(d, bReadOnly) {
            for(var t_ = 0; t_ < d.length; t_++) {
                this.BaseAdd(de.Key, de.Value);
            }
            this.IsReadOnly = bReadOnly;
        };

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
        self.Add = function(key, value) {
            this.BaseAdd(key, value);
        };

        // Removes an entry with the specified key from the collection.
        const Remove = function(key) {
            this.BaseRemove(key);
        };

        // Removes an entry in the specified index from the collection.
        const Remove = function(index) {
            this.BaseRemoveAt(index);
        };

        // Clears all the elements in the collection.
        const Clear = function() {
            this.BaseClear();
        };

        let m_groupsHeaders: cReportSections = new cReportSections();
        let m_groupsFooters: cReportSections = new cReportSections();

        self.getGroupsHeaders = function() {
            return m_groupsHeaders;
        };

        self.setGroupsHeaders = function(rhs) {
            m_groupsHeaders = rhs;
        };

        self.getGroupsFooters = function() {
            return m_groupsFooters;
        };

        self.setGroupsFooters = function(rhs) {
            m_groupsFooters = rhs;
        };

        self.add = function(c, key) {
            try  {
                if (c === null)  {
                    c = globalObject.CSReportDll.createCReportGroup();
                }
                if (key === "")  {
                    key = cReportGlobals.getNextKey().ToString();
                } 
                else  {
                    cReportGlobals.refreshNextKey(key);
                }

                key = cReportGlobals.getKey(key);
                Add(key, c);

                c.setKey(key);
                c.setIndex(count()-1);

                c.setHeader(m_groupsHeaders.add(null, "", -1));
                c.setFooter(m_groupsFooters.add(null, "", 0));

                pSetName(c, "G_" + c.getIndex().ToString());
                pSetName(c.getHeader(), c.getName());
                pSetName(c.getFooter(), c.getName());

                c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER);
                c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER);

                return c;
            } 
            catch (ex) {
                return null;
            }
        };

        self.add2 = function(c, key) {
            try  {
                if (c === null)  {
                    c = globalObject.CSReportDll.createCReportGroup();
                }
                if (key === "")  {
                    key = cReportGlobals.getNextKey().ToString();
                } 
                else  {
                    cReportGlobals.refreshNextKey(key);
                }

                key = cReportGlobals.getKey(key);
                Add(key, c);

                c.setKey(key);
                c.setIndex(this.Count);

                m_groupsHeaders.add(c.getHeader(), "", -1);
                m_groupsFooters.add(c.getFooter(), "", 0);

                pSetName(c, "G_" + c.getIndex().ToString());
                pSetName(c.getHeader(), c.getName());
                pSetName(c.getFooter(), c.getName());

                c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER);
                c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER);

                return c;
            } 
            catch(ex) {
                return null;
            }
        };

        const pSetName = function(c, name) {
            c.setName(pSetName(c.getName(), name));
        };
        const pSetName = function(c, name) {
            c.setName(pSetName(c.getName(), name));
        };
        const pSetName = function(section, name) {
            let sectionName: string = section.ToLower();
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
        };

        self.clear = function() {
            try {
                let n: number = this.count();
                for(var i = 0; i < n; i++) {
                    remove(0);
                }
                return;
            }
            catch(ex) {
            }
        };

        self.remove = function(key) {
            try {
                let keyH: string = "";
                let keyF: string = "";

                keyH = m_groupsHeaders.item(item(key).getHeader().getKey()).getKey();
                keyF = m_groupsFooters.item(item(key).getFooter().getKey()).getKey();

                m_groupsHeaders.remove(keyH);
                m_groupsFooters.remove(keyF);

                Remove(key);

                // Update the index
                //
                for(var i = 0; i < this.Count; i++) {
                    item(i).setIndex(i);
                }
            }
            catch (ex) {
            }
        };

        self.remove = function(index) {
            try {
                let keyH: string = "";
                let keyF: string = "";

                keyH = m_groupsHeaders.item(item(index).getHeader().getKey()).getKey();
                keyF = m_groupsFooters.item(item(index).getFooter().getKey()).getKey();

                m_groupsHeaders.remove(keyH);
                m_groupsFooters.remove(keyF);

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
        };

        self.count = function() {
            return this.Count;
        };

        self.item = function(key) {
            try {
                return this.BaseGet(key);
            }
            catch(ex) {
                return null;
            }
        };

        self.item = function(index) {
            try {
                return this.BaseGet(index);
            }
            catch(ex) {
                return null;
            }
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportGroups {

    Add: (String, Object) => void;
    getGroupsHeaders: () => cReportSections;
    setGroupsHeaders: (cReportSections) => void;
    getGroupsFooters: () => cReportSections;
    setGroupsFooters: (cReportSections) => void;
    add: (cReportGroup, String) => cReportGroup;
    add2: (cReportGroup, String) => cReportGroup;
    clear: () => void;
    remove: (String) => void;
    remove: (int) => void;
    count: () => int;
    item: (String) => cReportGroup;
    item: (int) => cReportGroup;
  }
}
