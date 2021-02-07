

namespace CSReportDll
{
    export class cReportConnectsAux {


    {

        private C_MODULE: string = "cReportConnectsAux";
        private C_RPTCONNECTSAUX: string = "RptConnectsAux";

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

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let connect: cReportConnect = null;

            if (nodeFather === null) {
                let xProperty: CSXml.cXmlProperty = null;
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
        }

        public load(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let nodeObj: XmlNode = null;
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
        }

		public add(c: cReportConnect) {
			return add (c, null);
		}

        public add(c: cReportConnect, key: string) {
            try {
                if (c === null)  {
                    c = new cReportConnect();
                }

                if (key === null) {
                    this.BaseAdd(getDummyKey(), c);
                }
                else {
                    Add(ReportGlobals.getKey(key), c);
                }

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

        private getDummyKey() {
            return "dummy_key_" + this.Count.toString();
        }



    } 



}
