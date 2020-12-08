(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportControls = function() {

        const self = {};

        // Creates an empty collection.
        const cReportControls = function() {
        };

        // Adds elements from an IDictionary into the new collection.
        const cReportControls = function(d, bReadOnly) {
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
        const Remove = function(key) {
            this.BaseRemove(key);
        };

        // Removes an entry in the specified index from the collection.
        const Remove = function(index) {
            this.BaseRemoveAt(index);
        };

        // Clears all the elements in the collection.
        const Clear = function() {
            this.BaseClear();
        };

        const C_MODULE: string= "cReportControls";

        // it is a reference to the controls collection of cReport
        //
        let m_copyColl: cReportControls2 = null;
        let m_typeSection: csRptSectionType = null;
        let m_collByLeft: int[] = null;

        // this reference tell in which section line is this controls collection
        //
        let m_sectionLine: cReportSectionLine = null;

        self.getTypeSection = function() {
            return m_typeSection;
        };

        self.setTypeSection = function(rhs) {
            m_typeSection = rhs;
        };

        self.getCopyColl = function() {
            return m_copyColl;
        };

        self.setCopyColl = function(rhs) {
            m_copyColl = rhs;
        };

        self.getSectionLine = function() {
            return m_sectionLine;
        };

        self.setSectionLine = function(rhs) {
            m_sectionLine = rhs;

            let ctrl: cReportControl= null;
            for(var _i = 0; _i < this.Count; _i++) {
                ctrl = item(_i);
                ctrl.setSectionLine(rhs);
            }
        };

        self.getCollByLeft = function() {
            return m_collByLeft;
        };

		self.add = function() {
			return add(null, "");
		};

        self.add = function(c, key) {
            try {

                if (c === null)  {
                    c =  globalObject.CSReportDll.createCReportControl();
                }
                if (key === "") {
                    key = cReportGlobals.getNextKey().ToString();
                }
                else {
                    cReportGlobals.refreshNextKey(key);
                }

                key = cReportGlobals.getKey(key);
                Add(key, c);

                c.setKey(key);
                c.setTypeSection(m_typeSection);
                c.setSectionLine(m_sectionLine);

                if (m_copyColl !== null)  {
                    m_copyColl.add2(c, key); 
                }

                return c;
            }
            catch(ex) {
                return null;
            }
        };

        self.clear = function() {
            try {
                let n: number= this.count();
                for(var i = 0; i < n; i++) {
                    remove(0);
                }
            }
            catch(ex) {
            }
        };

        self.remove = function(key) {
            try {
                item(key).setSectionLine(null);
                if (m_copyColl !== null) {
                    m_copyColl.remove(item(key).getKey());
                }
                Remove(key);
            }
            catch(ex) {
            }
        };

        self.remove = function(index) {
            try {
                item(index).setSectionLine(null);
                if (m_copyColl !== null) {
                    m_copyColl.remove(item(index).getKey());
                }
                Remove(index);
            }
            catch(ex) {
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

        self.orderCollByLeft = function() {
            let j: number= 0;
            let i: number= 0;
            let tmp: number= 0;
            let ctl1: cReportControl= null;
            let ctl2: cReportControl= null;

            G.redim(m_collByLeft, this.Count);

            for (i = 0; i < m_collByLeft.Length; i++) {
                m_collByLeft[i] = i;
            }

            for (i = 0; i < this.Count-1; i++) {
                for (j = i; j < this.Count-1; j++) {
                    ctl1 = item(m_collByLeft[j]);
                    ctl2 = item(m_collByLeft[j + 1]);

                    if (ctl2.getLabel().getAspect().getLeft() < ctl1.getLabel().getAspect().getLeft()) {
                        tmp = m_collByLeft[j];
                        m_collByLeft[j] = m_collByLeft[j + 1];
                        m_collByLeft[j + 1] = tmp;
                    }
                }
            }
        };

        // Implement IDisposable.
        // Do not make this method virtual.
        // A derived class should not be able to override this method.
        self.Dispose = function() {
            Dispose(true);
            // This object will be cleaned up by the Dispose method.
            // Therefore, you should call GC.SupressFinalize to
            // take this object off the finalization queue
            // and prevent finalization code for this object
            // from executing a second time.
            GC.SuppressFinalize(this);
        };

        // Track whether Dispose has been called.
        let disposed: boolean= false;

        // Dispose(bool disposing) executes in two distinct scenarios.
        // If disposing equals true, the method has been called directly
        // or indirectly by a user's code. Managed and unmanaged resources
        // can be disposed.
        // If disposing equals false, the method has been called by the
        // runtime from inside the finalizer and you should not reference
        // other objects. Only unmanaged resources can be disposed.
        self.Dispose = function(disposing) {
            // Check to see if Dispose has already been called.
            if (!this.disposed) {
                // If disposing equals true, dispose all managed
                // and unmanaged resources.
                if (disposing) {
                    // Dispose managed resources.
                    releaseReferences();
                }

                // Note disposing has been done.
                disposed = true;

            }
        };

        // Use C# destructor syntax for finalization code.
        // This destructor will run only if the Dispose method
        // does not get called.
        // It gives your base class the opportunity to finalize.
        // Do not provide destructors in types derived from this class.
        ~cReportControls()
        {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(false) is optimal in terms of
            // readability and maintainability.
            Dispose(false);
        }

        const releaseReferences = function() {
UNKNOWN >>             cReportControl ctrl;
            for(var _i = 0; _i < this.Count; _i++) {
                ctrl = item(_i);
                ctrl.setSectionLine(null);
            }
        };

        return self;

    }

}(globalObject));
