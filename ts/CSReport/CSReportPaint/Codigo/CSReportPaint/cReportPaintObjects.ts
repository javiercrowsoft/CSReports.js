(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};


    globalObject.CSReportPaint.createCReportPaintObjects = function() {

        const self = {};

        // Creates an empty collection.
        const cReportPaintObjects = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cReportPaintObjects = function(d, bReadOnly) {
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
            removeZOrder(key);
        };

        // Removes an entry in the specified index from the collection.
        self.remove = function(index) {
            let key = item(index).getKey();
            this.BaseRemoveAt(index);
            removeZOrder(key);
        };

        // Clears all the elements in the collection.
        self.clear = function() {
            this.BaseClear();
            m_zorder = null;
        };

        let m_zorder = null;

        self.add = function(c, key) {
            try {
                if (c === null)  {
                    c = new cReportPaintObject();
                }
                if (key === "") {
                    key = cGlobals.getNextKey().ToString();
                }

                key = cGlobals.getKey(key);
                Add(key, c);

                c.setKey(key);
                G.redimPreserve(m_zorder, this.count());
                m_zorder[this.count()-1] = key;

                return c;
            }
            catch(ex) {
                return null;
            }
        };

        self.count = function() {
            return this.Count;
        };

        self.bringToFront = function(key) {
            zorder(key, true);
        };

        self.sendToBack = function(key) {
            zorder(key, false);
        };

        // moves the element refered by key to the last position if top is true or
        // to the first position if top is false in m_zorder
        //
        // nZorder === 0 is the heap's bottom and the max nZorder is at 
        // the heap's top 
        //
        self.zorder = function(key, top) {
UNKNOWN >>             int i;

            // first we search the element using key
            //
            for (i = 0; i < m_zorder.Length; i++) {
                if (m_zorder[i] === key) {
                    break;
                }
            }

            if (i >= m_zorder.Length-1 && top)  {
                return; 
            }
            if (i === 0 && !top)  {
                return; 
            }

            if (top) {
                for (; i < m_zorder.Length - 1; i++) {
                    m_zorder[i] = m_zorder[i + 1];
                    item(m_zorder[i]).getAspect().setNZOrder(i);
                }
                m_zorder[m_zorder.Length-1] = key;
                item(key).getAspect().setNZOrder(m_zorder.Length-1);
            }
            else {
                for (; i > 0; i--) {
                    m_zorder[i] = m_zorder[i - 1];
                    item(m_zorder[i]).getAspect().setNZOrder(i);
                }
                m_zorder[0] = key;
                item(key).getAspect().setNZOrder(0);
            }
        };

        self.getZOrderForKey = function(key) {
            for(var i = 0; i < m_zorder.Length; i++) {
                if (m_zorder[i] === key) {
                    return i;
                }
            }

            return -1;
        };

        self.getNextKeyForZOrder = function(index) {
            return m_zorder[index];
        };

        self.getNextPaintObjForZOrder = function(index) {
            return item(getNextKeyForZOrder(index));
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

        const removeZOrder = function(sKey) {
            for(var i = 0; i < m_zorder.Length; i++) {
                if (m_zorder[i] === sKey) {
                    for(var j = i; j < m_zorder.Length - 1; j++) {
                        m_zorder[j] = m_zorder[j + 1];
                    }
                    G.redimPreserve(m_zorder, m_zorder.Length - 1);
                    return;
                }
            }
        };

        return self;

    }

}(globalObject));
