(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportConnectsAux = function() {

        const self = {}; //@@@: public class cReportConnectsAux : NameObjectCollectionBase

        const C_MODULE = "cReportConnectsAux"; //@@@: private const String C_MODULE = "cReportConnectsAux";
        const C_RPTCONNECTSAUX = "RptConnectsAux"; //@@@: private const String C_RPTCONNECTSAUX = "RptConnectsAux";

        // Creates an empty collection.
        const cReportConnectsAux = function() { //@@@: public cReportConnectsAux()
        }; //@@@: }

        // Adds elements from an IDictionary into the new collection.
        const cReportConnectsAux = function(d, bReadOnly) { //@@@: public cReportConnectsAux(IDictionary d, Boolean bReadOnly)
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
        }; //@@@: }

        // Removes an entry in the specified index from the collection.
        self.remove = function(index) { //@@@: public void remove(int index)
            this.BaseRemoveAt(index); //@@@: this.BaseRemoveAt(index);
        }; //@@@: }

        // Clears all the elements in the collection.
        self.clear = function() { //@@@: public void clear()
            this.BaseClear(); //@@@: this.BaseClear();
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let connect = null; //@@@: cReportConnect connect = null;

            if (nodeFather === null) { //@@@: if (nodeFather == null)
                let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
                xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();
                xProperty.setName(C_RPTCONNECTSAUX); //@@@: xProperty.setName(C_RPTCONNECTSAUX);
                nodeFather = xDoc.addNode(xProperty); //@@@: nodeFather = xDoc.addNode(xProperty);
            } //@@@: }

            for(var _i = 0; _i < this.Count; _i++) { //@@@: for (int _i = 0; _i < this.Count; _i++)
                connect = item(_i); //@@@: connect = item(_i);
                if (!connect.save(xDoc, nodeFather))  { //@@@: if (!connect.save(xDoc, nodeFather))
                    return false;  //@@@: return false;
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.load = function(xDoc, nodeFather) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeFather)
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            clear(); //@@@: clear();
            if (nodeFather !== null) { //@@@: if (nodeFather != null)
                if (xDoc.nodeHasChild(nodeFather)) { //@@@: if (xDoc.nodeHasChild(nodeFather))
                    nodeObj = xDoc.getNodeChild(nodeFather); //@@@: nodeObj = xDoc.getNodeChild(nodeFather);
                    while (nodeObj !== null) { //@@@: while (nodeObj != null)
                        if (!add(null, "").load(xDoc, nodeObj))  { //@@@: if (!add(null, "").load(xDoc, nodeObj))
                            return false;  //@@@: return false;
                        } //@@@: }
                        nodeObj = xDoc.getNextNode(nodeObj); //@@@: nodeObj = xDoc.getNextNode(nodeObj);
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

		self.add = function(c) { //@@@: public cReportConnect add(cReportConnect c)
			return add (c, null); //@@@: return add (c, null);
		}; //@@@: }

        self.add = function(c, key) { //@@@: public cReportConnect add(cReportConnect c, String key)
            try { //@@@: try
                if (c === null)  { //@@@: if (c == null)
                    c = new cReportConnect(); //@@@: c = new cReportConnect();
                } //@@@: }

                if (key === null) { //@@@: if (key == null)
                    this.BaseAdd(getDummyKey(), c); //@@@: this.BaseAdd(getDummyKey(), c);
                } //@@@: }
                else { //@@@: else
                    Add(cReportGlobals.getKey(key), c); //@@@: Add(cReportGlobals.getKey(key), c);
                } //@@@: }

                return c; //@@@: return c;
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return this.Count; //@@@: return this.Count;
        }; //@@@: }

        self.item = function(key) { //@@@: public cReportConnect item(String key)
            try { //@@@: try
                return this.BaseGet(key); //@@@: return (cReportConnect)this.BaseGet(key);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.item = function(index) { //@@@: public cReportConnect item(int index)
            try { //@@@: try
                return this.BaseGet(index); //@@@: return (cReportConnect)this.BaseGet(index);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        const getDummyKey = function() { //@@@: private String getDummyKey()
            return "dummy_key_" + this.Count.ToString(); //@@@: return "dummy_key_" + this.Count.ToString();
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
