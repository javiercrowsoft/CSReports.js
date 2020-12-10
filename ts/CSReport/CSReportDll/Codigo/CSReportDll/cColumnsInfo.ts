(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCColumnsInfo = function() {

        // @ts-ignore
        let self: CSReportDll.IcColumnsInfo = {};

        // Creates an empty collection.
        const cColumnsInfo = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cColumnsInfo = function(d, bReadOnly) {
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

                if (c === null)  {
                    c = globalObject.CSConnect.createCColumnInfo();
                }

                if (key === "") {
                    key = cReportGlobals.getKey(cReportGlobals.getNextKey().ToString());
                }
                else {
                    cReportGlobals.refreshNextKey(key);
                    key = cReportGlobals.getKey(key);
                }

                c.setPosition(count());
                c.setKey(key);
                Add(key, c);

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

        const createColumnsInfoEnumerator = function() {

            // @ts-ignore
            let self: CSReportDll.IColumnsInfoEnumerator = {};
            self.columnsInfo: cColumnsInfo = null;
            let position: number = -1;

            //constructor
            const ColumnsInfoEnumerator = function(list) {
                columnsInfo = list;
            }
            const getEnumerator = function() {
                return this;
            }


            //IEnumerator
            self.MoveNext = function() {
                position++;
                return (position < columnsInfo.Count);
            }

            //IEnumerator
            self.Reset = function() {

            //IEnumerator
UNKNOWN >>             public object Current
            {
UNKNOWN >>                 get
                {
                    try {
                        return columnsInfo.item(position);
                    }

                    catch (
                    {
                        throw new InvalidOperationException();
                    }
                }
            }
        }

        public override IEnumerator GetEnumerator()
        {
            return new ColumnsInfoEnumerator(this);
        }
        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IColumnsInfoEnumerator {

    columnsInfo;: cColumnsInfo;
    MoveNext: () => bool;
    Reset: () => void;
  }
}
