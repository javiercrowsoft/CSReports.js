(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportConnectsAux = function() {

        const self = {};

        const C_MODULE = "cReportConnectsAux";
        const C_RPTCONNECTSAUX = "RptConnectsAux";

        // Creates an empty collection.
        const cReportConnectsAux = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cReportConnectsAux = function(d, bReadOnly) {
            for(var i_ = 0; i_ < d.length; i_++) {
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
        self.Remove = function(key) {
            this.BaseRemove(key);
        };

        // Removes an entry in the specified index from the collection.
        self.Remove = function(index) {
            this.BaseRemoveAt(index);
        };

        // Clears all the elements in the collection.
        self.Clear = function() {
            this.BaseClear();
        };

        // Removes an entry with the specified key from the collection.
        self.remove = function(key) {
            this.BaseRemove(key);
        };

        // Removes an entry in the specified index from the collection.
        self.remove = function(index) {
            this.BaseRemoveAt(index);
        };

        // Clears all the elements in the collection.
        self.clear = function() {
            this.BaseClear();
        };

        self.save = function(xDoc, nodeFather) {
            let connect = null;

            if (nodeFather === null) {
                let xProperty = null;
                xProperty = new CSXml.cXmlProperty();
                xProperty.setName(C_RPTCONNECTSAUX);
                nodeFather = xDoc.addNode(xProperty);
            }

            for(var _i = 0; _i < this.Count; _i++) {
                connect = item(_i);
                if (!connect.save(xDoc, nodeFather))  {
                    return false; 
                }
            }

            return true;
        };

        self.load = function(xDoc, nodeFather) {
            let nodeObj = null;
            clear();
            if (nodeFather !== null) {
                if (xDoc.nodeHasChild(nodeFather)) {
                    nodeObj = xDoc.getNodeChild(nodeFather);
                    while (nodeObj !== null) {
                        if (!add(null, "").load(xDoc, nodeObj))  {
                            return false; 
                        }
                        nodeObj = xDoc.getNextNode(nodeObj);
                    }
                }
            }

            return true;
        };

		self.add = function(c) {
			return add (c, null);
		};

        self.add = function(c, key) {
            try {
                if (c === null)  {
                    c = new cReportConnect();
                }

                if (key === null) {
                    this.BaseAdd(getDummyKey(), c);
                }
                else {
                    Add(cReportGlobals.getKey(key), c);
                }

                return c;
            }
            catch(ex) {
                return null;
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

        const getDummyKey = function() {
            return "dummy_key_" + this.Count.ToString();
        };

        return self;

    }

}(globalObject));
