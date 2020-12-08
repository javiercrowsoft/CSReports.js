(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {

    globalObject.CSReportPaint.createCReportPaintObjects = function() {

        const self = {}; //@@@: public class cReportPaintObjects : NameObjectCollectionBase

        // Creates an empty collection.
        const cReportPaintObjects = function() { //@@@: public cReportPaintObjects()
        }; //@@@: }

        // Adds elements from an IDictionary into the new collection.
        const cReportPaintObjects = function(d, bReadOnly) { //@@@: public cReportPaintObjects(IDictionary d, Boolean bReadOnly)
            for(var i_ = 0; i_ < d.length; i_++) { //@@@: foreach (DictionaryEntry de in d)
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
        self.Remove = function(key) { //@@@: public void Remove(String key)
            this.BaseRemove(key); //@@@: this.BaseRemove(key);
        }; //@@@: }

        // Removes an entry in the specified index from the collection.
        self.Remove = function(index) { //@@@: public void Remove(int index)
            this.BaseRemoveAt(index); //@@@: this.BaseRemoveAt(index);
        }; //@@@: }

        // Clears all the elements in the collection.
        self.Clear = function() { //@@@: public void Clear()
            this.BaseClear(); //@@@: this.BaseClear();
        }; //@@@: }

        // Removes an entry with the specified key from the collection.
        self.remove = function(key) { //@@@: public void remove(String key)
            this.BaseRemove(key); //@@@: this.BaseRemove(key);
            removeZOrder(key); //@@@: removeZOrder(key);
        }; //@@@: }

        // Removes an entry in the specified index from the collection.
        self.remove = function(index) { //@@@: public void remove(int index)
            let key = item(index).getKey(); //@@@: string key = item(index).getKey();
            this.BaseRemoveAt(index); //@@@: this.BaseRemoveAt(index);
            removeZOrder(key); //@@@: removeZOrder(key);
        }; //@@@: }

        // Clears all the elements in the collection.
        self.clear = function() { //@@@: public void clear()
            this.BaseClear(); //@@@: this.BaseClear();
            m_zorder = null; //@@@: m_zorder = null;
        }; //@@@: }

        let m_zorder = null; //@@@: private String[] m_zorder = null;

        self.add = function(c, key) { //@@@: internal cReportPaintObject add(cReportPaintObject c, String key)
            try { //@@@: try
                if (c === null)  { //@@@: if (c == null)
                    c = new cReportPaintObject(); //@@@: c = new cReportPaintObject();
                } //@@@: }
                if (key === "") { //@@@: if (key == "")
                    key = cGlobals.getNextKey().ToString(); //@@@: key = cGlobals.getNextKey().ToString();
                } //@@@: }

                key = cGlobals.getKey(key); //@@@: key = cGlobals.getKey(key);
                Add(key, c); //@@@: Add(key, c);

                c.setKey(key); //@@@: c.setKey(key);
                G.redimPreserve(m_zorder, this.count()); //@@@: G.redimPreserve(ref m_zorder, this.count());
                m_zorder[this.count()-1] = key; //@@@: m_zorder[this.count()-1] = key;

                return c; //@@@: return c;
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return this.Count; //@@@: return this.Count;
        }; //@@@: }

        self.bringToFront = function(key) { //@@@: public void bringToFront(String key)
            zorder(key, true); //@@@: zorder(key, true);
        }; //@@@: }

        self.sendToBack = function(key) { //@@@: public void sendToBack(String key)
            zorder(key, false); //@@@: zorder(key, false);
        }; //@@@: }

        // moves the element refered by key to the last position if top is true or
        // to the first position if top is false in m_zorder
        //
        // nZorder === 0 is the heap's bottom and the max nZorder is at 
        // the heap's top 
        //
        self.zorder = function(key, top) { //@@@: public void zorder(String key, bool top)
UNKNOWN >>             int i; //@@@: int i;

            // first we search the element using key
            //
            for (i = 0; i < m_zorder.Length; i++) { //@@@: for (i = 0; i < m_zorder.Length; i++)
                if (m_zorder[i] === key) { //@@@: if (m_zorder[i] == key)
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (i >= m_zorder.Length-1 && top)  { //@@@: if (i >= m_zorder.Length-1 && top)
                return;  //@@@: return;
            } //@@@: }
            if (i === 0 && !top)  { //@@@: if (i == 0 && !top)
                return;  //@@@: return;
            } //@@@: }

            if (top) { //@@@: if (top)
                for (; i < m_zorder.Length - 1; i++) { //@@@: for (; i < m_zorder.Length - 1; i++)
                    m_zorder[i] = m_zorder[i + 1]; //@@@: m_zorder[i] = m_zorder[i + 1];
                    item(m_zorder[i]).getAspect().setNZOrder(i); //@@@: item(m_zorder[i]).getAspect().setNZOrder(i);
                } //@@@: }
                m_zorder[m_zorder.Length-1] = key; //@@@: m_zorder[m_zorder.Length-1] = key;
                item(key).getAspect().setNZOrder(m_zorder.Length-1); //@@@: item(key).getAspect().setNZOrder(m_zorder.Length-1);
            } //@@@: }
            else { //@@@: else
                for (; i > 0; i--) { //@@@: for (; i > 0; i--)
                    m_zorder[i] = m_zorder[i - 1]; //@@@: m_zorder[i] = m_zorder[i - 1];
                    item(m_zorder[i]).getAspect().setNZOrder(i); //@@@: item(m_zorder[i]).getAspect().setNZOrder(i);
                } //@@@: }
                m_zorder[0] = key; //@@@: m_zorder[0] = key;
                item(key).getAspect().setNZOrder(0); //@@@: item(key).getAspect().setNZOrder(0);
            } //@@@: }
        }; //@@@: }

        self.getZOrderForKey = function(key) { //@@@: public int getZOrderForKey(String key)
            for(var i = 0; i < m_zorder.Length; i++) { //@@@: for (int i = 0; i < m_zorder.Length; i++)
                if (m_zorder[i] === key) { //@@@: if (m_zorder[i] == key)
                    return i; //@@@: return i;
                } //@@@: }
            } //@@@: }

            return -1; //@@@: return -1;
        }; //@@@: }

        self.getNextKeyForZOrder = function(index) { //@@@: public String getNextKeyForZOrder(int index)
            return m_zorder[index]; //@@@: return m_zorder[index];
        }; //@@@: }

        self.getNextPaintObjForZOrder = function(index) { //@@@: public cReportPaintObject getNextPaintObjForZOrder(int index)
            return item(getNextKeyForZOrder(index)); //@@@: return item(getNextKeyForZOrder(index));
        }; //@@@: }

        self.item = function(key) { //@@@: public cReportPaintObject item(String key)
            try { //@@@: try
                return this.BaseGet(key); //@@@: return (cReportPaintObject)this.BaseGet(key);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.item = function(index) { //@@@: public cReportPaintObject item(int index)
            try { //@@@: try
                return this.BaseGet(index); //@@@: return (cReportPaintObject)this.BaseGet(index);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        const removeZOrder = function(sKey) { //@@@: private void removeZOrder(String sKey)
            for(var i = 0; i < m_zorder.Length; i++) { //@@@: for (int i = 0; i < m_zorder.Length; i++)
                if (m_zorder[i] === sKey) { //@@@: if (m_zorder[i] == sKey)
                    for(var j = i; j < m_zorder.Length - 1; j++) { //@@@: for (int j = i; j < m_zorder.Length - 1; j++)
                        m_zorder[j] = m_zorder[j + 1]; //@@@: m_zorder[j] = m_zorder[j + 1];
                    } //@@@: }
                    G.redimPreserve(m_zorder, m_zorder.Length - 1); //@@@: G.redimPreserve(ref m_zorder, m_zorder.Length - 1);
                    return; //@@@: return;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
