

namespace CSReportPaint
{

    export class cReportPaintObjects {


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
            removeZOrder(key);
        }

        // Removes an entry in the specified index from the collection.
        public remove(index: number) {
            let key: string = item(index).getKey();
            this.BaseRemoveAt(index);
            removeZOrder(key);
        }

        // Clears all the elements in the collection.
        public clear() {
            this.BaseClear();
            this.zorder = null;
        }

        private zorder: string[] = null;

        public add(c: cReportPaintObject, key: string) {
            try {
                if (c === null)  {
                    c = new cReportPaintObject();
                }
                if (key === "") {
                    key = cGlobals.getNextKey().toString();
                }

                key = cGlobals.getKey(key);
                Add(key, c);

                c.setKey(key);
                G.redimPreserve(this.zorder, this.count());
                this.zorder[this.count()-1] = key;

                return c;
            }
            catch(ex) {
                return null;
            }
        }

        public count() {
            return this.Count;
        }

        public bringToFront(key: string) {
            zorder(key, true);
        }

        public sendToBack(key: string) {
            zorder(key, false);
        }

        // moves the element refered by key to the last position if top is true or
        // to the first position if top is false in this.zorder
        //
        // nZorder === 0 is the heap's bottom and the max nZorder is at 
        // the heap's top 
        //
        public zorder(key: string, top: boolean) {
UNKNOWN >>             int i;

            // first we search the element using key
            //
            for (i = 0; i < this.zorder.length; i++) {
                if (this.zorder[i] === key) {
                    break;
                }
            }

            if (i >= this.zorder.length-1 && top)  {
                return; 
            }
            if (i === 0 && !top)  {
                return; 
            }

            if (top) {
                for (; i < this.zorder.length - 1; i++) {
                    this.zorder[i] = this.zorder[i + 1];
                    item(this.zorder[i]).getAspect().setNZOrder(i);
                }
                this.zorder[this.zorder.length-1] = key;
                item(key).getAspect().setNZOrder(this.zorder.length-1);
            }
            else {
                for (; i > 0; i--) {
                    this.zorder[i] = this.zorder[i - 1];
                    item(this.zorder[i]).getAspect().setNZOrder(i);
                }
                this.zorder[0] = key;
                item(key).getAspect().setNZOrder(0);
            }
        }

        public getZOrderForKey(key: string) {
            for(var i = 0; i < this.zorder.length; i++) {
                if (this.zorder[i] === key) {
                    return i;
                }
            }

            return -1;
        }

        public getNextKeyForZOrder(index: number) {
            return this.zorder[index];
        }

        public getNextPaintObjForZOrder(index: number) {
            return item(getNextKeyForZOrder(index));
        }

        public item(key: string) {
            try {
                return this.BaseGet(key);
            }
            catch(ex) {
                return null;
            }
        }

        public item(index: number) {
            try {
                return this.BaseGet(index);
            }
            catch(ex) {
                return null;
            }
        }

        private removeZOrder(sKey: string) {
            for(var i = 0; i < this.zorder.length; i++) {
                if (this.zorder[i] === sKey) {
                    for(var j = i; j < this.zorder.length - 1; j++) {
                        this.zorder[j] = this.zorder[j + 1];
                    }
                    G.redimPreserve(this.zorder, this.zorder.length - 1);
                    return;
                }
            }
        }



    }



}
