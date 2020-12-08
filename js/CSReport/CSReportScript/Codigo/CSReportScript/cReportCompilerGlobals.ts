(function(globalObject) {

    globalObject.CSReportScript = globalObject.CSReportScript || {};


    globalObject.CSReportScript.createCReportCompilerGlobals = function() {

        const self = {};

        // Creates an empty collection.
        const cReportCompilerGlobals = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cReportCompilerGlobals = function(d, bReadOnly) {
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

        let m_mode = 0;

        self.getMode = function() {
            return m_mode;
        };

        self.setMode = function(rhs) {
            m_mode = rhs;
        };

        self.addVar = function(varName) {
            try {
                Add(varName, new cReportCompilerVar());
                return getVar(varName);
            }
            catch(ex) {
                return null;
            }
        };

        self.count = function() {
            return this.Count;
        };

        self.getVar = function(varName) {
            try {
                return this.BaseGet(varName);
            }
            catch (ex) {
                return null;
            }
        };

        return self;

    }

UNKNOWN >>         return self;

    public enum eReportCompilerMode
    { 
        C_EVAL,
UNKNOWN >>         C_RESULT
        return self;

    }

}(globalObject));
