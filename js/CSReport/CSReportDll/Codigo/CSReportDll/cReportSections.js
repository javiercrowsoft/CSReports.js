(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportSections = function() {

        const self = {}; //@@@: public class cReportSections : cIReportGroupSections

        const C_MODULE = "cReportSections"; //@@@: private const String C_MODULE = "cReportSections";

        let m_coll = new Dictionary(); //@@@: private Dictionary<String, cReportSection> m_coll = new Dictionary<String, cReportSection>();
        let m_keys = new List(); //@@@: private List<String> m_keys = new List<String>();

        // it is a reference to the controls collection of cReport
        //
        let m_copyColl = null; //@@@: private cReportControls2 m_copyColl;
        let m_typeSection = null; //@@@: private csRptSectionType m_typeSection;
        let m_mainTypeSection = null; //@@@: private csRptSectionType m_mainTypeSection;

        // Creates an empty collection.
        const cReportSections = function() { //@@@: public cReportSections()
        }; //@@@: }

        self.getTypeSection = function() { //@@@: public csRptSectionType getTypeSection()
            return m_typeSection; //@@@: return m_typeSection;
        }; //@@@: }

        self.setTypeSection = function(rhs) { //@@@: public void setTypeSection(csRptSectionType rhs)
            m_typeSection = rhs; //@@@: m_typeSection = rhs;
        }; //@@@: }

        self.setMainTypeSection = function(rhs) { //@@@: internal void setMainTypeSection(csRptSectionType rhs)
            m_mainTypeSection = rhs; //@@@: m_mainTypeSection = rhs;
        }; //@@@: }

        self.setCopyColl = function(rhs) { //@@@: internal void setCopyColl(cReportControls2 rhs)
            m_copyColl = rhs; //@@@: m_copyColl = rhs;

            if (m_coll !== null)  { //@@@: if (m_coll != null)
                let section = null; //@@@: cReportSection section = null;

                for(var _i = 0; _i < this.count(); _i++) { //@@@: for (int _i = 0; _i < this.count(); _i++)
                    section = item(_i); //@@@: section = item(_i);
                    section.setCopyColl(rhs); //@@@: section.setCopyColl(rhs);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

		self.add = function() { //@@@: public cReportSection add()
			return add(null, ""); //@@@: return add(null, "");
		}; //@@@: }
        self.add = function(c, key) { //@@@: public cReportSection add(cReportSection c, String key)
            return add(c, key, -1); //@@@: return add(c, key, -1);
        }; //@@@: }

        self.add = function(c, key, index) { //@@@: public cReportSection add(cReportSection c, String key, int index)
            try { //@@@: try
                if (c === null) { //@@@: if (c == null)
                    c = new cReportSection(); //@@@: c = new cReportSection();
                } //@@@: }
                if (key === "") { //@@@: if (key == "")
                    key = cReportGlobals.getNextKey().ToString(); //@@@: key = cReportGlobals.getNextKey().ToString();
                } //@@@: }
                else { //@@@: else
                    cReportGlobals.refreshNextKey(key); //@@@: cReportGlobals.refreshNextKey(key);
                } //@@@: }

                key = cReportGlobals.getKey(key); //@@@: key = cReportGlobals.getKey(key);

                if ( && this.count() > 0) { //@@@: if ((index != -1) && this.count() > 0)
                    m_keys.Insert(index, key); //@@@: m_keys.Insert(index, key);
                } //@@@: }
                else { //@@@: else
                    m_keys.Add(key); //@@@: m_keys.Add(key);
                } //@@@: }

                m_coll.Add(key, c); //@@@: m_coll.Add(key, c);
                c.setCopyColl(m_copyColl); //@@@: c.setCopyColl(m_copyColl);

                if (this.count() === 1) { //@@@: if (this.count() == 1)
                    c.setTypeSection(m_mainTypeSection); //@@@: c.setTypeSection(m_mainTypeSection);
                } //@@@: }
                else { //@@@: else
                    c.setTypeSection(m_typeSection); //@@@: c.setTypeSection(m_typeSection);
                } //@@@: }

                pRefreshIndex(); //@@@: pRefreshIndex();

                c.setIndex(this.count()-1); //@@@: c.setIndex(this.count()-1);
                c.setKey(key); //@@@: c.setKey(key);

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
                return; //@@@: return;
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.remove = function(key) { //@@@: public void remove(String key)
            try { //@@@: try
                item(key).getSectionLines().clear(); //@@@: item(key).getSectionLines().clear();
                m_coll.Remove(key); //@@@: m_coll.Remove(key);
                m_keys.Remove(key); //@@@: m_keys.Remove(key);

                for(var i = 0; i < this.count(); i++) { //@@@: for (int i = 0; i < this.count(); i++)
                    m_coll[m_keys[i]].setIndex(i); //@@@: m_coll[m_keys[i]].setIndex(i);
                    m_coll[m_keys[i]].setName(m_coll[m_keys[i]].getName().Substring(0, 2).Replace("_", "")  //@@@: m_coll[m_keys[i]].setName(m_coll[m_keys[i]].getName().Substring(0, 2).Replace("_", "")
                                                + "_" + i.ToString()); //@@@: + "_" + i.ToString());
                } //@@@: }
                pRefreshIndex(); //@@@: pRefreshIndex();
                return; //@@@: return;
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.remove = function(index) { //@@@: public void remove(int index)
            try { //@@@: try
                item(index).getSectionLines().clear(); //@@@: item(index).getSectionLines().clear();
                m_coll.Remove(m_keys[index]); //@@@: m_coll.Remove(m_keys[index]);
                m_keys.RemoveAt(index); //@@@: m_keys.RemoveAt(index);

                for(var i = 0; i < this.count(); i++) { //@@@: for (int i = 0; i < this.count(); i++)
                    let sec = m_coll[m_keys[i]]; //@@@: cReportSection sec = (cReportSection)m_coll[m_keys[i]];
                    sec.setIndex(i); //@@@: sec.setIndex(i);
                    sec.setName(sec.getName().Substring(0, 2).Replace("_", "") //@@@: sec.setName(sec.getName().Substring(0, 2).Replace("_", "")
                                + "_" + i.ToString()); //@@@: + "_" + i.ToString());
                } //@@@: }
                pRefreshIndex(); //@@@: pRefreshIndex();
                return; //@@@: return;
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return m_coll.Count; //@@@: return m_coll.Count;
        }; //@@@: }

        self.item = function(key) { //@@@: public cReportSection item(String key)
            try { //@@@: try
                if (m_coll.ContainsKey(key)) { //@@@: if (m_coll.ContainsKey(key))
                    return m_coll[key]; //@@@: return (cReportSection)m_coll[key];
                } //@@@: }
                else { //@@@: else
                    return null; //@@@: return null;
                }                 //@@@: }
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.item = function(index) { //@@@: public cReportSection item(int index)
            try { //@@@: try
                return m_coll[m_keys[index]]; //@@@: return (cReportSection)m_coll[m_keys[index]];
            } //@@@: }
            catch(ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        const pRefreshIndex = function() { //@@@: private void pRefreshIndex()
            for(var i = 0; i < this.count(); i++) { //@@@: for (int i = 0; i < this.count(); i++)
                item(i).setRealIndex(i); //@@@: item(i).setRealIndex(i);
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
