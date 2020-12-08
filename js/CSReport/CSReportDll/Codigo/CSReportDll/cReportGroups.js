(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportGroups = function() {

        const self = {}; //@@@: public class cReportGroups : NameObjectCollectionBase

        // Creates an empty collection.
        const cReportGroups = function() { //@@@: public cReportGroups()
        }; //@@@: }

        // Adds elements from an IDictionary into the new collection.
        const cReportGroups = function(d, bReadOnly) { //@@@: public cReportGroups(IDictionary d, Boolean bReadOnly)
            for(var t_ = 0; t_ < d.length; t_++) { //@@@: foreach (DictionaryEntry de in d)
                this.BaseAdd(de.Key, de.Value); //@@@: this.BaseAdd((String)de.Key, de.Value);
            } //@@@: }
            this.IsReadOnly = bReadOnly; //@@@: this.IsReadOnly = bReadOnly;
        }; //@@@: }

        // Gets a key-and-value pair (DictionaryEntry) using an index.
        public DictionaryEntry this[int index] //@@@: public DictionaryEntry this[int index]
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return (new DictionaryEntry( //@@@: return (new DictionaryEntry(
                    this.BaseGetKey(index), this.BaseGet(index))); //@@@: this.BaseGetKey(index), this.BaseGet(index)));
            } //@@@: }
        } //@@@: }

        // Gets or sets the value associated with the specified key.
        public Object this[String key] //@@@: public Object this[String key]
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return (this.BaseGet(key)); //@@@: return (this.BaseGet(key));
            } //@@@: }
UNKNOWN >>             set //@@@: set
            { //@@@: {
                this.BaseSet(key, value); //@@@: this.BaseSet(key, value);
            } //@@@: }
        } //@@@: }

        // Gets a String array that contains all the keys in the collection.
        public String[] AllKeys //@@@: public String[] AllKeys
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return (this.BaseGetAllKeys()); //@@@: return (this.BaseGetAllKeys());
            } //@@@: }
        } //@@@: }

        // Gets an Object array that contains all the values in the collection.
UNKNOWN >>         public Array AllValues //@@@: public Array AllValues
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return (this.BaseGetAllValues()); //@@@: return (this.BaseGetAllValues());
            } //@@@: }
        } //@@@: }

        // Gets a String array that contains all the values in the collection.
        public String[] AllStringValues //@@@: public String[] AllStringValues
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return (this.BaseGetAllValues(typeof(String))); //@@@: return ((String[])this.BaseGetAllValues(typeof(String)));
            } //@@@: }
        } //@@@: }

        // Gets a value indicating if the collection contains keys that are not null.
UNKNOWN >>         public Boolean HasKeys //@@@: public Boolean HasKeys
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return (this.BaseHasKeys()); //@@@: return (this.BaseHasKeys());
            } //@@@: }
        } //@@@: }

        // Adds an entry to the collection.
        self.Add = function(key, value) { //@@@: public void Add(String key, Object value)
            this.BaseAdd(key, value); //@@@: this.BaseAdd(key, value);
        }; //@@@: }

        // Removes an entry with the specified key from the collection.
        const Remove = function(key) { //@@@: private void Remove(String key)
            this.BaseRemove(key); //@@@: this.BaseRemove(key);
        }; //@@@: }

        // Removes an entry in the specified index from the collection.
        const Remove = function(index) { //@@@: private void Remove(int index)
            this.BaseRemoveAt(index); //@@@: this.BaseRemoveAt(index);
        }; //@@@: }

        // Clears all the elements in the collection.
        const Clear = function() { //@@@: private void Clear()
            this.BaseClear(); //@@@: this.BaseClear();
        }; //@@@: }

        let m_groupsHeaders = new cReportSections(); //@@@: private cReportSections m_groupsHeaders = new cReportSections();
        let m_groupsFooters = new cReportSections(); //@@@: private cReportSections m_groupsFooters = new cReportSections();

        self.getGroupsHeaders = function() { //@@@: public cReportSections getGroupsHeaders()
            return m_groupsHeaders; //@@@: return m_groupsHeaders;
        }; //@@@: }

        self.setGroupsHeaders = function(rhs) { //@@@: internal void setGroupsHeaders(cReportSections rhs)
            m_groupsHeaders = rhs; //@@@: m_groupsHeaders = rhs;
        }; //@@@: }

        self.getGroupsFooters = function() { //@@@: public cReportSections getGroupsFooters()
            return m_groupsFooters; //@@@: return m_groupsFooters;
        }; //@@@: }

        self.setGroupsFooters = function(rhs) { //@@@: internal void setGroupsFooters(cReportSections rhs)
            m_groupsFooters = rhs; //@@@: m_groupsFooters = rhs;
        }; //@@@: }

        self.add = function(c, key) { //@@@: public cReportGroup add(cReportGroup c, String key)
            try  { //@@@: try
                if (c === null)  { //@@@: if (c == null)
                    c = new cReportGroup(); //@@@: c = new cReportGroup();
                } //@@@: }
                if (key === "")  { //@@@: if (key == "")
                    key = cReportGlobals.getNextKey().ToString(); //@@@: key = cReportGlobals.getNextKey().ToString();
                }  //@@@: }
                else  { //@@@: else
                    cReportGlobals.refreshNextKey(key); //@@@: cReportGlobals.refreshNextKey(key);
                } //@@@: }

                key = cReportGlobals.getKey(key); //@@@: key = cReportGlobals.getKey(key);
                Add(key, c); //@@@: Add(key, c);

                c.setKey(key); //@@@: c.setKey(key);
                c.setIndex(count()-1); //@@@: c.setIndex(count()-1);

                c.setHeader(m_groupsHeaders.add(null, "", -1)); //@@@: c.setHeader(m_groupsHeaders.add(null, "", -1));
                c.setFooter(m_groupsFooters.add(null, "", 0)); //@@@: c.setFooter(m_groupsFooters.add(null, "", 0));

                pSetName(c, "G_" + c.getIndex().ToString()); //@@@: pSetName(c, "G_" + c.getIndex().ToString());
                pSetName(c.getHeader(), c.getName()); //@@@: pSetName(c.getHeader(), c.getName());
                pSetName(c.getFooter(), c.getName()); //@@@: pSetName(c.getFooter(), c.getName());

                c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER); //@@@: c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER);
                c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER); //@@@: c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER);

                return c; //@@@: return c;
            }  //@@@: }
            catch (ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.add2 = function(c, key) { //@@@: public cReportGroup add2(cReportGroup c, String key)
            try  { //@@@: try
                if (c === null)  { //@@@: if (c == null)
                    c = new cReportGroup(); //@@@: c = new cReportGroup();
                } //@@@: }
                if (key === "")  { //@@@: if (key == "")
                    key = cReportGlobals.getNextKey().ToString(); //@@@: key = cReportGlobals.getNextKey().ToString();
                }  //@@@: }
                else  { //@@@: else
                    cReportGlobals.refreshNextKey(key); //@@@: cReportGlobals.refreshNextKey(key);
                } //@@@: }

                key = cReportGlobals.getKey(key); //@@@: key = cReportGlobals.getKey(key);
                Add(key, c); //@@@: Add(key, c);

                c.setKey(key); //@@@: c.setKey(key);
                c.setIndex(this.Count); //@@@: c.setIndex(this.Count);

                m_groupsHeaders.add(c.getHeader(), "", -1); //@@@: m_groupsHeaders.add(c.getHeader(), "", -1);
                m_groupsFooters.add(c.getFooter(), "", 0); //@@@: m_groupsFooters.add(c.getFooter(), "", 0);

                pSetName(c, "G_" + c.getIndex().ToString()); //@@@: pSetName(c, "G_" + c.getIndex().ToString());
                pSetName(c.getHeader(), c.getName()); //@@@: pSetName(c.getHeader(), c.getName());
                pSetName(c.getFooter(), c.getName()); //@@@: pSetName(c.getFooter(), c.getName());

                c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER); //@@@: c.getHeader().setTypeSection(csRptSectionType.GROUP_HEADER);
                c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER); //@@@: c.getFooter().setTypeSection(csRptSectionType.GROUP_FOOTER);

                return c; //@@@: return c;
            }  //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        const pSetName = function(c, name) { //@@@: private void pSetName(cReportGroup c, String name)
            c.setName(pSetName(c.getName(), name)); //@@@: c.setName(pSetName(c.getName(), name));
        }; //@@@: }
        const pSetName = function(c, name) { //@@@: private void pSetName(cReportSection c, String name)
            c.setName(pSetName(c.getName(), name)); //@@@: c.setName(pSetName(c.getName(), name));
        }; //@@@: }
        const pSetName = function(section, name) { //@@@: private String pSetName(String section, String name)
            let sectionName = section.ToLower(); //@@@: String sectionName = section.ToLower();
            if (sectionName.Length === 0 //@@@: if (sectionName.Length == 0
                || cUtil.subString(sectionName, 0, 5) === "group" //@@@: || cUtil.subString(sectionName, 0, 5) == "group"
                || cUtil.subString(sectionName, 0, 5) === "grupo" //@@@: || cUtil.subString(sectionName, 0, 5) == "grupo"
                || cUtil.subString(sectionName, 0, 3) === "gh_" //@@@: || cUtil.subString(sectionName, 0, 3) == "gh_"
                || cUtil.subString(sectionName, 0, 3) === "gf_" //@@@: || cUtil.subString(sectionName, 0, 3) == "gf_"
                || cUtil.subString(sectionName, 0, 2) === "g_" //@@@: || cUtil.subString(sectionName, 0, 2) == "g_"
                ) { //@@@: )
                return name; //@@@: return name;
            } //@@@: }
            else { //@@@: else
                return section; //@@@: return section;
            } //@@@: }
        }; //@@@: }

        self.clear = function() { //@@@: public void clear()
            try { //@@@: try
                let n = this.count(); //@@@: int n = this.count();
                for(var i = 0; i < n; i++) { //@@@: for (int i = 0; i < n; i++)
                    remove(0); //@@@: remove(0);
                } //@@@: }
                return; //@@@: return;
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.remove = function(key) { //@@@: public void remove(String key)
            try { //@@@: try
                let keyH = ""; //@@@: String keyH = "";
                let keyF = ""; //@@@: String keyF = "";

                keyH = m_groupsHeaders.item(item(key).getHeader().getKey()).getKey(); //@@@: keyH = m_groupsHeaders.item(item(key).getHeader().getKey()).getKey();
                keyF = m_groupsFooters.item(item(key).getFooter().getKey()).getKey(); //@@@: keyF = m_groupsFooters.item(item(key).getFooter().getKey()).getKey();

                m_groupsHeaders.remove(keyH); //@@@: m_groupsHeaders.remove(keyH);
                m_groupsFooters.remove(keyF); //@@@: m_groupsFooters.remove(keyF);

                Remove(key); //@@@: Remove(key);

                // Update the index
                //
                for(var i = 0; i < this.Count; i++) { //@@@: for (int i = 0; i < this.Count; i++)
                    item(i).setIndex(i); //@@@: item(i).setIndex(i);
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
            } //@@@: }
        }; //@@@: }

        self.remove = function(index) { //@@@: public void remove(int index)
            try { //@@@: try
                let keyH = ""; //@@@: String keyH = "";
                let keyF = ""; //@@@: String keyF = "";

                keyH = m_groupsHeaders.item(item(index).getHeader().getKey()).getKey(); //@@@: keyH = m_groupsHeaders.item(item(index).getHeader().getKey()).getKey();
                keyF = m_groupsFooters.item(item(index).getFooter().getKey()).getKey(); //@@@: keyF = m_groupsFooters.item(item(index).getFooter().getKey()).getKey();

                m_groupsHeaders.remove(keyH); //@@@: m_groupsHeaders.remove(keyH);
                m_groupsFooters.remove(keyF); //@@@: m_groupsFooters.remove(keyF);

                Remove(index); //@@@: Remove(index);

                // Update the index
                //
                for(var i = 0; i < this.Count; i++) { //@@@: for (int i = 0; i < this.Count; i++)
                    item(i).setIndex(i); //@@@: item(i).setIndex(i);
                    item(i).fixName(); //@@@: item(i).fixName();
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return this.Count; //@@@: return this.Count;
        }; //@@@: }

        self.item = function(key) { //@@@: public cReportGroup item(String key)
            try { //@@@: try
                return this.BaseGet(key); //@@@: return (cReportGroup)this.BaseGet(key);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.item = function(index) { //@@@: public cReportGroup item(int index)
            try { //@@@: try
                return this.BaseGet(index); //@@@: return (cReportGroup)this.BaseGet(index);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
