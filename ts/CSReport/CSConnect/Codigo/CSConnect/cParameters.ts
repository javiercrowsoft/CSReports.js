(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {};

    globalObject.CSConnect.createCParameters = function() {

        // @ts-ignore
        let self: CSConnect.IcParameters = {};

        // Creates an empty collection.
        const cParameters = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cParameters = function(d, bReadOnly) {
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

        self.add = function(c, key) {
            try {
                if (c === null) {
                    c = globalObject.CSConnect.createCParameter();
                }

                if (key === "") {
                    key = cReportGlobals.getKey(cReportGlobals.getNextKey().ToString());
                }
                else {
                    cReportGlobals.refreshNextKey(key);
                    key = cReportGlobals.getKey(key);
                }

                c.setPosition(this.Count + 1);
                c.setKey(key);
                Add(key, c);
                return c;
            }
            catch (ex) {
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

        self.getByPosition = function(position) {
            for (var i = 0; i < count(); i++) {
                let p: cParameter = item(i);
                if (p.getPosition() === position)  {
                    return p;
                }
            }
            throw new Exception("This parameters collection doesn't contain a parameter with a position = " + position.ToString());
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
}(globalObject));


namespace CSConnect {

  export interface IcParameters {

    Add: (String, Object) => void;
    Remove: (String) => void;
    Remove: (int) => void;
    Clear: () => void;
    remove: (String) => void;
    remove: (int) => void;
    clear: () => void;
    add: (cParameter, String) => cParameter;
    count: () => int;
    item: (String) => cParameter;
    getByPosition: (int) => cParameter;
    item: (int) => cParameter;
  }
}
