(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportFormulas = function() {

        const self = {}; //@@@: public class cReportFormulas : NameObjectCollectionBase

        // Creates an empty collection.
        const cReportFormulas = function() { //@@@: public cReportFormulas()
        }; //@@@: }

        // Adds elements from an IDictionary into the new collection.
        const cReportFormulas = function(d, bReadOnly) { //@@@: public cReportFormulas(IDictionary d, Boolean bReadOnly)
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

        self.add = function(name) { //@@@: public cReportFormula add(String name)
            try { //@@@: try
                let c = new cReportFormula(); //@@@: cReportFormula c = new cReportFormula();
                c.setName(name); //@@@: c.setName(name);
                Add(name, c); //@@@: Add(name, c);
                return c; //@@@: return c;
            } //@@@: }
            catch (ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }


        self.count = function() { //@@@: public int count()
            return this.Count; //@@@: return this.Count;
        }; //@@@: }

        self.item = function(key) { //@@@: public cReportFormula item(String key)
            try { //@@@: try
                return this.BaseGet(key); //@@@: return (cReportFormula)this.BaseGet(key);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.item = function(index) { //@@@: public cReportFormula item(int index)
            try { //@@@: try
                return this.BaseGet(index); //@@@: return (cReportFormula)this.BaseGet(index);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.add2 = function(formula, name) { //@@@: public void add2(cReportFormula formula, String name)
            try { //@@@: try
                Add(name, formula); //@@@: Add(name, formula);
                formula.setNotSave(true); //@@@: formula.setNotSave(true);
            } //@@@: }
            catch (ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
