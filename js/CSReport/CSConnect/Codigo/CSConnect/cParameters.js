(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {}; //@@@: namespace CSConnect
 //@@@: {
    globalObject.CSConnect.createCParameters = function() {

        const self = {}; //@@@: public class cParameters : NameObjectCollectionBase

        // Creates an empty collection.
        const cParameters = function() { //@@@: public cParameters()
        }; //@@@: }

        // Adds elements from an IDictionary into the new collection.
        const cParameters = function(d, bReadOnly) { //@@@: public cParameters(IDictionary d, Boolean bReadOnly)
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

        self.add = function(c, key) { //@@@: public cParameter add(cParameter c, String key)
            try { //@@@: try
                if (c === null) { //@@@: if (c == null)
                    c = new cParameter(); //@@@: c = new cParameter();
                } //@@@: }

                if (key === "") { //@@@: if (key == "")
                    key = cReportGlobals.getKey(cReportGlobals.getNextKey().ToString()); //@@@: key = cReportGlobals.getKey(cReportGlobals.getNextKey().ToString());
                } //@@@: }
                else { //@@@: else
                    cReportGlobals.refreshNextKey(key); //@@@: cReportGlobals.refreshNextKey(key);
                    key = cReportGlobals.getKey(key); //@@@: key = cReportGlobals.getKey(key);
                } //@@@: }

                c.setPosition(this.Count + 1); //@@@: c.setPosition(this.Count + 1);
                c.setKey(key); //@@@: c.setKey(key);
                Add(key, c); //@@@: Add(key, c);
                return c; //@@@: return c;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return this.Count; //@@@: return this.Count;
        }; //@@@: }

        self.item = function(key) { //@@@: public cParameter item(String key)
            try { //@@@: try
                return this.BaseGet(key); //@@@: return (cParameter)this.BaseGet(key);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.getByPosition = function(position) { //@@@: public cParameter getByPosition(int position)
            for (var i = 0; i < count(); i++) { //@@@: for (var i = 0; i < count(); i++)
                let p = item(i); //@@@: cParameter p = item(i);
                if (p.getPosition() === position)  { //@@@: if (p.getPosition() == position)
                    return p; //@@@: return p;
                } //@@@: }
            } //@@@: }
            throw new Exception("This parameters collection doesn't contain a parameter with a position = " + position.ToString()); //@@@: throw new Exception("This parameters collection doesn't contain a parameter with a position = " + position.ToString());
        }; //@@@: }

        self.item = function(index) { //@@@: public cParameter item(int index)
            try { //@@@: try
                return this.BaseGet(index); //@@@: return (cParameter)this.BaseGet(index);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
