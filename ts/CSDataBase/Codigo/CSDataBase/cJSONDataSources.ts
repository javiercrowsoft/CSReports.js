(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {};

    globalObject.CSDataBase.createCJSONDataSources = function() {

        // @ts-ignore
        let self: CSDataBase.IcJSONDataSources = {};

        // Creates an empty collection.
        const cJSONDataSources = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cJSONDataSources = function(d, bReadOnly) {
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

        self.add = function(dataSource, name) {
            try {
                if (dataSource === null) {
                    throw new ArgumentNullException("dataSource");
                }
                if (name === "") {
                    throw new ArgumentNullException("name");
                }

                Add(name.ToLower(), dataSource);

                return dataSource;
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
                return this.BaseGet(key.ToLower());
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

    }    }
}(globalObject));


namespace CSDataBase {

  export interface IcJSONDataSources {

    Add: (String, Object) => void;
    Remove: (String) => void;
    Remove: (int) => void;
    Clear: () => void;
    remove: (String) => void;
    remove: (int) => void;
    clear: () => void;
    add: (cJSONDataSource, String) => cJSONDataSource;
    count: () => int;
    item: (String) => cJSONDataSource;
    item: (int) => cJSONDataSource;
  }
}
