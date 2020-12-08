(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportSectionLines = function() {

        const self = {};

        // it is a reference to the controls collection of cReport
        //
        let m_copyColl = null;
        let m_typeSection = null;
        let m_coll = new Hashtable();
        let m_keys = new List();

        // Creates an empty collection.
        const cReportSectionLines = function() {
        };

        self.getTypeSection = function() {
            return m_typeSection;
        };

        self.setTypeSection = function(rhs) {
            m_typeSection = rhs;
        };

        self.setCopyColl = function(rhs) {
            let sectionLn = null;
            m_copyColl = rhs;

            for(var _i = 0; _i < this.count(); _i++) {
                sectionLn = item(_i);
                sectionLn.setCopyColl(rhs);
            }
        };

        self.getCopyColl = function() {
            return m_copyColl;
        };

		self.add = function() {
			return add (null, "", -1);
		};
        self.add = function(c, key, index) {
            try {
                if (c === null)  {
                    c = new cReportSectionLine();
                }
                if (key === "") {
                    key = cReportGlobals.getNextKey().ToString();
                }
                else {
                    cReportGlobals.refreshNextKey(key);
                }

                key = cReportGlobals.getKey(key);

                if ( && this.count() > 0) {
                    m_keys.Insert(index, key);
                }
                else {
                    m_keys.Add(key);
                }

                m_coll.Add(key, c);

                c.setCopyColl(m_copyColl);
                c.setTypeSection(m_typeSection);

                pRefreshIndex();
                c.setIndex(this.count()-1);
                c.setKey(key);

                return c;
            }
            catch (ex) {
                return null;
            }
        };

        self.clear = function() {
            try {
                let n = this.count();
                for(var i = 0; i < n; i++) {
                    remove(0);
                }
                return;
            }
            catch(ex) {
            }
        };

        self.remove = function(key) {
            try {
                let w_item = item(key);
                if (w_item !== null) {
                    if (w_item.getControls() !== null) {
                        w_item.getControls().clear();
                        w_item.getControls().setSectionLine(null);
                        w_item.getControls().setCopyColl(null);
                    }
                    m_coll.Remove(key);
                    m_keys.Remove(key);
                }

                return;
            }
            catch(ex) {
            }
        };

        self.remove = function(index) {
            try {
                let w_item = item(index);
                if (w_item !== null) {
                    if (w_item.getControls() !== null) {
                        w_item.getControls().clear();
                        w_item.getControls().setSectionLine(null);
                        w_item.getControls().setCopyColl(null);
                    }
                    m_coll.Remove(m_keys[index]);
                    m_keys.RemoveAt(index);
                }

                return;
            }
            catch(ex) {
            }
        };

        self.count = function() {
            return m_coll.Count;
        };

        self.item = function(key) {
            try {
                return m_coll[key];
            }
            catch (ex) {
                return null;
            }
        };

        self.item = function(index) {
            try {
                return m_coll[m_keys[index]];
            }
            catch(ex) {
                return null;
            }
        };

        const pRefreshIndex = function() {
            for(var i = 0; i < this.count(); i++) {
                item(i).setRealIndex(i);
            }
        };

        return self;

    }

}(globalObject));
