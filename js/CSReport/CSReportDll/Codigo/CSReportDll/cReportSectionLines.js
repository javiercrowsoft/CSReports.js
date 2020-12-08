(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportSectionLines = function() {

        const self = {}; //@@@: public class cReportSectionLines

        // it is a reference to the controls collection of cReport
        //
        let m_copyColl = null; //@@@: private cReportControls2 m_copyColl;
        let m_typeSection = null; //@@@: private csRptSectionType m_typeSection;
        let m_coll = new Hashtable(); //@@@: private Hashtable m_coll = new Hashtable();
        let m_keys = new List(); //@@@: private List<String> m_keys = new List<String>();

        // Creates an empty collection.
        const cReportSectionLines = function() { //@@@: public cReportSectionLines()
        }; //@@@: }

        self.getTypeSection = function() { //@@@: public csRptSectionType getTypeSection()
            return m_typeSection; //@@@: return m_typeSection;
        }; //@@@: }

        self.setTypeSection = function(rhs) { //@@@: public void setTypeSection(csRptSectionType rhs)
            m_typeSection = rhs; //@@@: m_typeSection = rhs;
        }; //@@@: }

        self.setCopyColl = function(rhs) { //@@@: internal void setCopyColl(cReportControls2 rhs)
            let sectionLn = null; //@@@: cReportSectionLine sectionLn = null;
            m_copyColl = rhs; //@@@: m_copyColl = rhs;

            for(var _i = 0; _i < this.count(); _i++) { //@@@: for (int _i = 0; _i < this.count(); _i++)
                sectionLn = item(_i); //@@@: sectionLn = item(_i);
                sectionLn.setCopyColl(rhs); //@@@: sectionLn.setCopyColl(rhs);
            } //@@@: }
        }; //@@@: }

        self.getCopyColl = function() { //@@@: internal cReportControls2 getCopyColl()
            return m_copyColl; //@@@: return m_copyColl;
        }; //@@@: }

		self.add = function() { //@@@: public cReportSectionLine add()
			return add (null, "", -1); //@@@: return add (null, "", -1);
		}; //@@@: }
        self.add = function(c, key, index) { //@@@: public cReportSectionLine add(cReportSectionLine c, String key, int index)
            try { //@@@: try
                if (c === null)  { //@@@: if (c == null)
                    c = new cReportSectionLine(); //@@@: c = new cReportSectionLine();
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
                c.setTypeSection(m_typeSection); //@@@: c.setTypeSection(m_typeSection);

                pRefreshIndex(); //@@@: pRefreshIndex();
                c.setIndex(this.count()-1); //@@@: c.setIndex(this.count()-1);
                c.setKey(key); //@@@: c.setKey(key);

                return c; //@@@: return c;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
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
                let w_item = item(key); //@@@: cReportSectionLine w_item = item(key);
                if (w_item !== null) { //@@@: if (w_item != null)
                    if (w_item.getControls() !== null) { //@@@: if (w_item.getControls() != null)
                        w_item.getControls().clear(); //@@@: w_item.getControls().clear();
                        w_item.getControls().setSectionLine(null); //@@@: w_item.getControls().setSectionLine(null);
                        w_item.getControls().setCopyColl(null); //@@@: w_item.getControls().setCopyColl(null);
                    } //@@@: }
                    m_coll.Remove(key); //@@@: m_coll.Remove(key);
                    m_keys.Remove(key); //@@@: m_keys.Remove(key);
                } //@@@: }

                return; //@@@: return;
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.remove = function(index) { //@@@: public void remove(int index)
            try { //@@@: try
                let w_item = item(index); //@@@: cReportSectionLine w_item = item(index);
                if (w_item !== null) { //@@@: if (w_item != null)
                    if (w_item.getControls() !== null) { //@@@: if (w_item.getControls() != null)
                        w_item.getControls().clear(); //@@@: w_item.getControls().clear();
                        w_item.getControls().setSectionLine(null); //@@@: w_item.getControls().setSectionLine(null);
                        w_item.getControls().setCopyColl(null); //@@@: w_item.getControls().setCopyColl(null);
                    } //@@@: }
                    m_coll.Remove(m_keys[index]); //@@@: m_coll.Remove(m_keys[index]);
                    m_keys.RemoveAt(index); //@@@: m_keys.RemoveAt(index);
                } //@@@: }

                return; //@@@: return;
            } //@@@: }
            catch(ex) { //@@@: catch
            } //@@@: }
        }; //@@@: }

        self.count = function() { //@@@: public int count()
            return m_coll.Count; //@@@: return m_coll.Count;
        }; //@@@: }

        self.item = function(key) { //@@@: public cReportSectionLine item(String key)
            try { //@@@: try
                return m_coll[key]; //@@@: return (cReportSectionLine)m_coll[key];
            } //@@@: }
            catch (ex) { //@@@: catch
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.item = function(index) { //@@@: public cReportSectionLine item(int index)
            try { //@@@: try
                return m_coll[m_keys[index]]; //@@@: return (cReportSectionLine)m_coll[m_keys[index]];
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
