(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportSections = function() {

        const self = {};

        const C_MODULE: string= "cReportSections";

        let m_coll: Dictionary= new Dictionary();
        let m_keys: List= new List();

        // it is a reference to the controls collection of cReport
        //
        let m_copyColl: cReportControls2 = null;
        let m_typeSection: csRptSectionType = null;
        let m_mainTypeSection: csRptSectionType = null;

        // Creates an empty collection.
        const cReportSections = function() {
        };

        self.getTypeSection = function() {
            return m_typeSection;
        };

        self.setTypeSection = function(rhs) {
            m_typeSection = rhs;
        };

        self.setMainTypeSection = function(rhs) {
            m_mainTypeSection = rhs;
        };

        self.setCopyColl = function(rhs) {
            m_copyColl = rhs;

            if (m_coll !== null)  {
                let section: cReportSection= null;

                for(var _i = 0; _i < this.count(); _i++) {
                    section = item(_i);
                    section.setCopyColl(rhs);
                }
            }
        };

		self.add = function() {
			return add(null, "");
		};
        self.add = function(c, key) {
            return add(c, key, -1);
        };

        self.add = function(c, key, index) {
            try {
                if (c === null) {
                    c =  globalObject.CSReportDll.createCReportSection();
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

                if (this.count() === 1) {
                    c.setTypeSection(m_mainTypeSection);
                }
                else {
                    c.setTypeSection(m_typeSection);
                }

                pRefreshIndex();

                c.setIndex(this.count()-1);
                c.setKey(key);

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
                return;
            }
            catch(ex) {
            }
        };

        self.remove = function(key) {
            try {
                item(key).getSectionLines().clear();
                m_coll.Remove(key);
                m_keys.Remove(key);

                for(var i = 0; i < this.count(); i++) {
                    m_coll[m_keys[i]].setIndex(i);
                    m_coll[m_keys[i]].setName(m_coll[m_keys[i]].getName().Substring(0, 2).Replace("_", "") 
                                                + "_" + i.ToString());
                }
                pRefreshIndex();
                return;
            }
            catch(ex) {
            }
        };

        self.remove = function(index) {
            try {
                item(index).getSectionLines().clear();
                m_coll.Remove(m_keys[index]);
                m_keys.RemoveAt(index);

                for(var i = 0; i < this.count(); i++) {
                    let sec: cReportSection= m_coll[m_keys[i]];
                    sec.setIndex(i);
                    sec.setName(sec.getName().Substring(0, 2).Replace("_", "")
                                + "_" + i.ToString());
                }
                pRefreshIndex();
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
                if (m_coll.ContainsKey(key)) {
                    return m_coll[key];
                }
                else {
                    return null;
                }                
            }
            catch(ex) {
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
