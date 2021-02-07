

namespace CSReportDll
{

    export class cReportPages {


    {

        // Creates an empty collection.
        public constructor() {
        }

        // Adds elements from an IDictionary into the new collection.
        public constructor(d: IDictionary, bReadOnly: boolean) {
            for(var i_ = 0; i_ < d.length; i_++) {
                this.BaseAdd(de.Key, de.Value);
            }
            this.IsReadOnly = bReadOnly;
        }

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
        public Add(key: string, value: object) {
            this.BaseAdd(key, value);
        }

        // Removes an entry with the specified key from the collection.
        public Remove(key: string) {
            this.BaseRemove(key);
        }

        // Removes an entry in the specified index from the collection.
        public Remove(index: number) {
            this.BaseRemoveAt(index);
        }

        // Clears all the elements in the collection.
        public Clear() {
            this.BaseClear();
        }

        // Removes an entry with the specified key from the collection.
        public remove(key: string) {
            this.BaseRemove(key);
        }

        // Removes an entry in the specified index from the collection.
        public remove(index: number) {
            this.BaseRemoveAt(index);
        }

        // Clears all the elements in the collection.
        public clear() {
            this.BaseClear();
        }

        public add(c: cReportPage) {
            return add(c, "");
        }

        public add(c: cReportPage, key: string) {
            try {
                if (c === null) {
                    c = new cReportPage();
                }

                if (key === "") {
                    key = ReportGlobals.getKey(ReportGlobals.getNextKey().toString());
                }

                Add(key, c);

                return c;
            }
            catch(ex) {
                return null;
            }
        }

        public count() {
            return this.Count;
        }

        public item(key: string) {
            try {
                let (cReportPage)this.BaseGet(key): return = null;;
            }
            catch(ex) {
                return null;
            }
        }

        public item(index: number) {
            try {
                let (cReportPage)this.BaseGet(index): return = null;;
            }
            catch(ex) {
                return null;
            }
        }



    } 



}
