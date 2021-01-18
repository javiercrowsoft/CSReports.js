

namespace CSReportDll
{
    export class cReportControls {


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
        private Remove(key: string) {
            this.BaseRemove(key);
        }

        // Removes an entry in the specified index from the collection.
        private Remove(index: number) {
            this.BaseRemoveAt(index);
        }

        // Clears all the elements in the collection.
        private Clear() {
            this.BaseClear();
        }

        private C_MODULE: string = "cReportControls";

        // it is a reference to the controls collection of cReport
        //
        private copyColl: cReportControls2 = null;
        private typeSection: csRptSectionType = null;
        private collByLeft: number[] = null;

        // this reference tell in which section line is this controls collection
        //
        private sectionLine: cReportSectionLine = null;

        public getTypeSection() {
            return this.typeSection;
        }

        public setTypeSection(rhs: csRptSectionType) {
            this.typeSection = rhs;
        }

        public getCopyColl() {
            return this.copyColl;
        }

        public setCopyColl(rhs: cReportControls2) {
            this.copyColl = rhs;
        }

        public getSectionLine() {
            return this.sectionLine;
        }

        public setSectionLine(rhs: cReportSectionLine) {
            this.sectionLine = rhs;

            let ctrl: cReportControl = null;
            for(var _i = 0; _i < this.Count; _i++) {
                ctrl = item(_i);
                ctrl.setSectionLine(rhs);
            }
        }

        public getCollByLeft() {
            return this.collByLeft;
        }

		public add() {
			return add(null, "");
		}

        public add(c: cReportControl, key: string) {
            try {

                if (c === null)  {
                    c = new cReportControl();
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
                c.setTypeSection(this.typeSection);
                c.setSectionLine(this.sectionLine);

                if (this.copyColl !== null)  {
                    this.copyColl.add2(c, key); 
                }

                return c;
            }
            catch(ex) {
                return null;
            }
        }

        public clear() {
            try {
                let n: number = this.count();
                for(var i = 0; i < n; i++) {
                    remove(0);
                }
            }
            catch(ex) {
            }
        }

        public remove(key: string) {
            try {
                item(key).setSectionLine(null);
                if (this.copyColl !== null) {
                    this.copyColl.remove(item(key).getKey());
                }
                Remove(key);
            }
            catch(ex) {
            }
        }

        public remove(index: number) {
            try {
                item(index).setSectionLine(null);
                if (this.copyColl !== null) {
                    this.copyColl.remove(item(index).getKey());
                }
                Remove(index);
            }
            catch(ex) {
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

        public orderCollByLeft() {
            let j: number = 0;
            let i: number = 0;
            let tmp: number = 0;
            let ctl1: cReportControl = null;
            let ctl2: cReportControl = null;

            G.redim(this.collByLeft, this.Count);

            for (i = 0; i < this.collByLeft.Length; i++) {
                this.collByLeft[i] = i;
            }

            for (i = 0; i < this.Count-1; i++) {
                for (j = i; j < this.Count-1; j++) {
                    ctl1 = item(this.collByLeft[j]);
                    ctl2 = item(this.collByLeft[j + 1]);

                    if (ctl2.getLabel().getAspect().getLeft() < ctl1.getLabel().getAspect().getLeft()) {
                        tmp = this.collByLeft[j];
                        this.collByLeft[j] = this.collByLeft[j + 1];
                        this.collByLeft[j + 1] = tmp;
                    }
                }
            }
        }

        // Implement IDisposable.
        // Do not make this method virtual.
        // A derived class should not be able to override this method.
        public Dispose() {
            Dispose(true);
            // This object will be cleaned up by the Dispose method.
            // Therefore, you should call GC.SupressFinalize to
            // take this object off the finalization queue
            // and prevent finalization code for this object
            // from executing a second time.
            GC.SuppressFinalize(this);
        }

        // Track whether Dispose has been called.
        private disposed: boolean = false;

        // Dispose(bool disposing) executes in two distinct scenarios.
        // If disposing equals true, the method has been called directly
        // or indirectly by a user's code. Managed and unmanaged resources
        // can be disposed.
        // If disposing equals false, the method has been called by the
        // runtime from inside the finalizer and you should not reference
        // other objects. Only unmanaged resources can be disposed.
        public Dispose(disposing: boolean) {
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
        }

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

        private releaseReferences() {
UNKNOWN >>             cReportControl ctrl;
            for(var _i = 0; _i < this.Count; _i++) {
                ctrl = item(_i);
                ctrl.setSectionLine(null);
            }
        }



    }    }



}
