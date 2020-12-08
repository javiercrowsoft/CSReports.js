(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportControls = function() {

        const self = {}; //@@@: public class cReportControls : NameObjectCollectionBase , IDisposable

        // Creates an empty collection.
        const cReportControls = function() { //@@@: public cReportControls()
        }; //@@@: }

        // Adds elements from an IDictionary into the new collection.
        const cReportControls = function(d, bReadOnly) { //@@@: public cReportControls(IDictionary d, Boolean bReadOnly)
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
        const Remove = function(key) { //@@@: private void Remove(String key)
            this.BaseRemove(key); //@@@: this.BaseRemove(key);
        }; //@@@: }

        // Removes an entry in the specified index from the collection.
        const Remove = function(index) { //@@@: private void Remove(int index)
            this.BaseRemoveAt(index); //@@@: this.BaseRemoveAt(index);
        }; //@@@: }

        // Clears all the elements in the collection.
        const Clear = function() { //@@@: private void Clear()
            this.BaseClear(); //@@@: this.BaseClear();
        }; //@@@: }

        const C_MODULE = "cReportControls"; //@@@: private const String C_MODULE = "cReportControls";

        // it is a reference to the controls collection of cReport
        //
        let m_copyColl = null; //@@@: private cReportControls2 m_copyColl;
        let m_typeSection = null; //@@@: private csRptSectionType m_typeSection;
        let m_collByLeft = null; //@@@: private int[] m_collByLeft;

        // this reference tell in which section line is this controls collection
        //
        let m_sectionLine = null; //@@@: private cReportSectionLine m_sectionLine;

        self.getTypeSection = function() { //@@@: public csRptSectionType getTypeSection()
            return m_typeSection; //@@@: return m_typeSection;
        }; //@@@: }

        self.setTypeSection = function(rhs) { //@@@: public void setTypeSection(csRptSectionType rhs)
            m_typeSection = rhs; //@@@: m_typeSection = rhs;
        }; //@@@: }

        self.getCopyColl = function() { //@@@: public cReportControls2 getCopyColl()
            return m_copyColl; //@@@: return m_copyColl;
        }; //@@@: }

        self.setCopyColl = function(rhs) { //@@@: public void setCopyColl(cReportControls2 rhs)
            m_copyColl = rhs; //@@@: m_copyColl = rhs;
        }; //@@@: }

        self.getSectionLine = function() { //@@@: public cReportSectionLine getSectionLine()
            return m_sectionLine; //@@@: return m_sectionLine;
        }; //@@@: }

        self.setSectionLine = function(rhs) { //@@@: public void setSectionLine(cReportSectionLine rhs)
            m_sectionLine = rhs; //@@@: m_sectionLine = rhs;

            let ctrl = null; //@@@: cReportControl ctrl = null;
            for(var _i = 0; _i < this.Count; _i++) { //@@@: for (int _i = 0; _i < this.Count; _i++)
                ctrl = item(_i); //@@@: ctrl = item(_i);
                ctrl.setSectionLine(rhs); //@@@: ctrl.setSectionLine(rhs);
            } //@@@: }
        }; //@@@: }

        self.getCollByLeft = function() { //@@@: public int[] getCollByLeft()
            return m_collByLeft; //@@@: return m_collByLeft;
        }; //@@@: }

		self.add = function() { //@@@: public cReportControl add()
			return add(null, ""); //@@@: return add(null, "");
		}; //@@@: }

        self.add = function(c, key) { //@@@: public cReportControl add(cReportControl c, String key)
            try { //@@@: try

                if (c === null)  { //@@@: if (c == null)
                    c = new cReportControl(); //@@@: c = new cReportControl();
                } //@@@: }
                if (key === "") { //@@@: if (key == "")
                    key = cReportGlobals.getNextKey().ToString(); //@@@: key = cReportGlobals.getNextKey().ToString();
                } //@@@: }
                else { //@@@: else
                    cReportGlobals.refreshNextKey(key); //@@@: cReportGlobals.refreshNextKey(key);
                } //@@@: }

                key = cReportGlobals.getKey(key); //@@@: key = cReportGlobals.getKey(key);
                Add(key, c); //@@@: Add(key, c);

                c.setKey(key); //@@@: c.setKey(key);
                c.setTypeSection(m_typeSection); //@@@: c.setTypeSection(m_typeSection);
                c.setSectionLine(m_sectionLine); //@@@: c.setSectionLine(m_sectionLine);

                if (m_copyColl !== null)  { //@@@: if (m_copyColl != null)
                    m_copyColl.add2(c, key);  //@@@: m_copyColl.add2(c, key);
                } //@@@: }

                return c; //@@@: return c;
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.clear = function() { //@@@: public void clear()
            try { //@@@: try
                let n = this.count(); //@@@: int n = this.count();
                for(var i = 0; i < n; i++) { //@@@: for (int i = 0; i < n; i++)
                    remove(0); //@@@: remove(0);
                } //@@@: }
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.remove = function(key) { //@@@: public void remove(String key)
            try { //@@@: try
                item(key).setSectionLine(null); //@@@: item(key).setSectionLine(null);
                if (m_copyColl !== null) { //@@@: if (m_copyColl != null)
                    m_copyColl.remove(item(key).getKey()); //@@@: m_copyColl.remove(item(key).getKey());
                } //@@@: }
                Remove(key); //@@@: Remove(key);
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.remove = function(index) { //@@@: public void remove(int index)
            try { //@@@: try
                item(index).setSectionLine(null); //@@@: item(index).setSectionLine(null);
                if (m_copyColl !== null) { //@@@: if (m_copyColl != null)
                    m_copyColl.remove(item(index).getKey()); //@@@: m_copyColl.remove(item(index).getKey());
                } //@@@: }
                Remove(index); //@@@: Remove(index);
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return this.Count; //@@@: return this.Count;
        }; //@@@: }

        self.item = function(key) { //@@@: public cReportControl item(String key)
            try { //@@@: try
                return this.BaseGet(key); //@@@: return (cReportControl)this.BaseGet(key);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.item = function(index) { //@@@: public cReportControl item(int index)
            try { //@@@: try
                return this.BaseGet(index); //@@@: return (cReportControl)this.BaseGet(index);
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.orderCollByLeft = function() { //@@@: public void orderCollByLeft()
            let j = 0; //@@@: int j = 0;
            let i = 0; //@@@: int i = 0;
            let tmp = 0; //@@@: int tmp = 0;
            let ctl1 = null; //@@@: cReportControl ctl1 = null;
            let ctl2 = null; //@@@: cReportControl ctl2 = null;

            G.redim(m_collByLeft, this.Count); //@@@: G.redim(ref m_collByLeft, this.Count);

            for (i = 0; i < m_collByLeft.Length; i++) { //@@@: for (i = 0; i < m_collByLeft.Length; i++)
                m_collByLeft[i] = i; //@@@: m_collByLeft[i] = i;
            } //@@@: }

            for (i = 0; i < this.Count-1; i++) { //@@@: for (i = 0; i < this.Count-1; i++)
                for (j = i; j < this.Count-1; j++) { //@@@: for (j = i; j < this.Count-1; j++)
                    ctl1 = item(m_collByLeft[j]); //@@@: ctl1 = item(m_collByLeft[j]);
                    ctl2 = item(m_collByLeft[j + 1]); //@@@: ctl2 = item(m_collByLeft[j + 1]);

                    if (ctl2.getLabel().getAspect().getLeft() < ctl1.getLabel().getAspect().getLeft()) { //@@@: if (ctl2.getLabel().getAspect().getLeft() < ctl1.getLabel().getAspect().getLeft())
                        tmp = m_collByLeft[j]; //@@@: tmp = m_collByLeft[j];
                        m_collByLeft[j] = m_collByLeft[j + 1]; //@@@: m_collByLeft[j] = m_collByLeft[j + 1];
                        m_collByLeft[j + 1] = tmp; //@@@: m_collByLeft[j + 1] = tmp;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        // Implement IDisposable.
        // Do not make this method virtual.
        // A derived class should not be able to override this method.
        self.Dispose = function() { //@@@: public void Dispose()
            Dispose(true); //@@@: Dispose(true);
            // This object will be cleaned up by the Dispose method.
            // Therefore, you should call GC.SupressFinalize to
            // take this object off the finalization queue
            // and prevent finalization code for this object
            // from executing a second time.
            GC.SuppressFinalize(this); //@@@: GC.SuppressFinalize(this);
        }; //@@@: }

        // Track whether Dispose has been called.
        let disposed = false; //@@@: private bool disposed = false;

        // Dispose(bool disposing) executes in two distinct scenarios.
        // If disposing equals true, the method has been called directly
        // or indirectly by a user's code. Managed and unmanaged resources
        // can be disposed.
        // If disposing equals false, the method has been called by the
        // runtime from inside the finalizer and you should not reference
        // other objects. Only unmanaged resources can be disposed.
        self.Dispose = function(disposing) { //@@@: protected virtual void Dispose(bool disposing)
            // Check to see if Dispose has already been called.
            if (!this.disposed) { //@@@: if (!this.disposed)
                // If disposing equals true, dispose all managed
                // and unmanaged resources.
                if (disposing) { //@@@: if (disposing)
                    // Dispose managed resources.
                    releaseReferences(); //@@@: releaseReferences();
                } //@@@: }

                // Note disposing has been done.
                disposed = true; //@@@: disposed = true;

            } //@@@: }
        }; //@@@: }

        // Use C# destructor syntax for finalization code.
        // This destructor will run only if the Dispose method
        // does not get called.
        // It gives your base class the opportunity to finalize.
        // Do not provide destructors in types derived from this class.
        ~cReportControls() //@@@: ~cReportControls()
        { //@@@: {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(false) is optimal in terms of
            // readability and maintainability.
            Dispose(false); //@@@: Dispose(false);
        } //@@@: }

        const releaseReferences = function() { //@@@: private void releaseReferences()
UNKNOWN >>             cReportControl ctrl; //@@@: cReportControl ctrl;
            for(var _i = 0; _i < this.Count; _i++) { //@@@: for (int _i = 0; _i < this.Count; _i++)
                ctrl = item(_i); //@@@: ctrl = item(_i);
                ctrl.setSectionLine(null); //@@@: ctrl.setSectionLine(null);
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
