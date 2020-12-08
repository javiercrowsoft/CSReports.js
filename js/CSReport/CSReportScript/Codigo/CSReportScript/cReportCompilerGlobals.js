(function(globalObject) {

    globalObject.CSReportScript = globalObject.CSReportScript || {}; //@@@: namespace CSReportScript
 //@@@: {

    globalObject.CSReportScript.createCReportCompilerGlobals = function() {

        const self = {}; //@@@: public class cReportCompilerGlobals : NameObjectCollectionBase

        // Creates an empty collection.
        const cReportCompilerGlobals = function() { //@@@: public cReportCompilerGlobals()
        }; //@@@: }

        // Adds elements from an IDictionary into the new collection.
        const cReportCompilerGlobals = function(d, bReadOnly) { //@@@: public cReportCompilerGlobals(IDictionary d, Boolean bReadOnly)
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

        let m_mode = 0; //@@@: private eReportCompilerMode m_mode = 0;

        self.getMode = function() { //@@@: public eReportCompilerMode getMode()
            return m_mode; //@@@: return m_mode;
        }; //@@@: }

        self.setMode = function(rhs) { //@@@: public void setMode(eReportCompilerMode rhs)
            m_mode = rhs; //@@@: m_mode = rhs;
        }; //@@@: }

        self.addVar = function(varName) { //@@@: public cReportCompilerVar addVar(String varName)
            try { //@@@: try
                Add(varName, new cReportCompilerVar()); //@@@: Add(varName, new cReportCompilerVar());
                return getVar(varName); //@@@: return getVar(varName);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return this.Count; //@@@: return this.Count;
        }; //@@@: }

        self.getVar = function(varName) { //@@@: public cReportCompilerVar getVar(String varName)
            try { //@@@: try
                return this.BaseGet(varName); //@@@: return (cReportCompilerVar)this.BaseGet(varName);
            } //@@@: }
            catch (ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum eReportCompilerMode //@@@: public enum eReportCompilerMode
    {  //@@@: {
        C_EVAL, //@@@: C_EVAL,
UNKNOWN >>         C_RESULT //@@@: C_RESULT
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
