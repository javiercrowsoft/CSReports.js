(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportSection = function() {

        const self = {}; //@@@: public class cReportSection : IDisposable, cIReportSection

        const C_NODERPTSECTIONLINES = "RptSectionLines"; //@@@: private const String C_NODERPTSECTIONLINES = "RptSectionLines";

        let m_sectionLines = new cReportSectionLines(); //@@@: private cReportSectionLines m_sectionLines = new cReportSectionLines();
        let m_aspect = new cReportAspect(); //@@@: private cReportAspect m_aspect = new cReportAspect();
        let m_index = 0; //@@@: private int m_index = 0;
        let m_realIndex = 0; //@@@: private int m_realIndex = 0;
        let m_key = ""; //@@@: private String m_key = "";
        let m_name = ""; //@@@: private String m_name = "";
        let m_keyPaint = ""; //@@@: private String m_keyPaint = "";
        let m_formulaHide = new cReportFormula(); //@@@: private cReportFormula m_formulaHide = new cReportFormula();
        let m_hasFormulaHide = null; //@@@: private bool m_hasFormulaHide;

        const cReportSection = function() { //@@@: public cReportSection()
            m_formulaHide.setName("H"); //@@@: m_formulaHide.setName("H");

            // when a new section is create a new line section 
            // is automatically added
            // 
            m_sectionLines.add(null, "", -1); //@@@: m_sectionLines.add(null, "", -1);
        }; //@@@: }

        self.getSectionLines = function() { //@@@: public cReportSectionLines getSectionLines()
            return m_sectionLines; //@@@: return m_sectionLines;
        }; //@@@: }

        self.setSectionLines = function(rhs) { //@@@: public void setSectionLines(cReportSectionLines rhs)
            m_sectionLines = rhs; //@@@: m_sectionLines = rhs;
        }; //@@@: }

        self.getAspect = function() { //@@@: public cReportAspect getAspect()
            return m_aspect; //@@@: return m_aspect;
        }; //@@@: }

        self.setAspect = function(rhs) { //@@@: public void setAspect(cReportAspect rhs)
            m_aspect = rhs; //@@@: m_aspect = rhs;
        }; //@@@: }

        self.getIndex = function() { //@@@: public int getIndex()
            return m_index; //@@@: return m_index;
        }; //@@@: }

        self.setIndex = function(rhs) { //@@@: public void setIndex(int rhs)
            m_index = rhs; //@@@: m_index = rhs;
        }; //@@@: }

        self.getRealIndex = function() { //@@@: public int getRealIndex()
            return m_realIndex; //@@@: return m_realIndex;
        }; //@@@: }

        self.setRealIndex = function(rhs) { //@@@: public void setRealIndex(int rhs)
            m_realIndex = rhs; //@@@: m_realIndex = rhs;
        }; //@@@: }

        self.getKey = function() { //@@@: public String getKey()
            return m_key; //@@@: return m_key;
        }; //@@@: }

        self.setKey = function(rhs) { //@@@: public void setKey(String rhs)
            m_key = rhs; //@@@: m_key = rhs;
        }; //@@@: }

        self.getTypeSection = function() { //@@@: public csRptSectionType getTypeSection()
            return m_sectionLines.getTypeSection(); //@@@: return m_sectionLines.getTypeSection();
        }; //@@@: }

        self.setTypeSection = function(rhs) { //@@@: public void setTypeSection(csRptSectionType rhs)
            m_sectionLines.setTypeSection(rhs); //@@@: m_sectionLines.setTypeSection(rhs);
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.setCopyColl = function(rhs) { //@@@: internal void setCopyColl(cReportControls2 rhs)
            if (m_sectionLines !== null) { //@@@: if (m_sectionLines != null)
                m_sectionLines.setCopyColl(rhs); //@@@: m_sectionLines.setCopyColl(rhs);
            } //@@@: }
        }; //@@@: }

        self.getKeyPaint = function() { //@@@: public String getKeyPaint()
            return m_keyPaint; //@@@: return m_keyPaint;
        }; //@@@: }

        self.setKeyPaint = function(rhs) { //@@@: public void setKeyPaint(String rhs)
            m_keyPaint = rhs; //@@@: m_keyPaint = rhs;
        }; //@@@: }

        self.getHasFormulaHide = function() { //@@@: public bool getHasFormulaHide()
            return m_hasFormulaHide; //@@@: return m_hasFormulaHide;
        }; //@@@: }

        self.setHasFormulaHide = function(rhs) { //@@@: public void setHasFormulaHide(bool rhs)
            m_hasFormulaHide = rhs; //@@@: m_hasFormulaHide = rhs;
        }; //@@@: }

        self.getFormulaHide = function() { //@@@: public cReportFormula getFormulaHide()
            return m_formulaHide; //@@@: return m_formulaHide;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            let nodeObjSecLn = null; //@@@: XmlNode nodeObjSecLn = null;
            let nodeObjAspect = null; //@@@: XmlNode nodeObjAspect = null;
            let secLn = null; //@@@: cReportSectionLine secLn = null;

            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger); //@@@: m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);

            setTypeSection(xDoc.getNodeProperty(nodeObj, "TypeSection").getValueInt(eTypes.eInteger)); //@@@: setTypeSection((csRptSectionType)xDoc.getNodeProperty(nodeObj, "TypeSection").getValueInt(eTypes.eInteger));
            m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean); //@@@: m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean);

            nodeObjAspect = nodeObj; //@@@: nodeObjAspect = nodeObj;
            if (!m_aspect.load(xDoc, nodeObjAspect)) { //@@@: if (!m_aspect.load(xDoc, nodeObjAspect))
                return false; //@@@: return false;
            } //@@@: }

            let nodeObjAux = nodeObj; //@@@: XmlNode nodeObjAux = nodeObj;
            if (!m_formulaHide.load(xDoc, nodeObjAux)) { //@@@: if (!m_formulaHide.load(xDoc, nodeObjAux))
                return false; //@@@: return false;
            } //@@@: }

            m_sectionLines.clear(); //@@@: m_sectionLines.clear();

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTSECTIONLINES); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTSECTIONLINES);
            if (xDoc.nodeHasChild(nodeObj)) { //@@@: if (xDoc.nodeHasChild(nodeObj))
                nodeObjSecLn = xDoc.getNodeChild(nodeObj); //@@@: nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) { //@@@: while (nodeObjSecLn != null)
                    let key = xDoc.getNodeProperty(nodeObjSecLn, "Key").getValueString(eTypes.eText); //@@@: String key = xDoc.getNodeProperty(nodeObjSecLn, "Key").getValueString(eTypes.eText);
                    secLn = m_sectionLines.add(null, key, -1); //@@@: secLn = m_sectionLines.add(null, key, -1);
                    if (!secLn.load(xDoc, nodeObjSecLn)) { //@@@: if (!secLn.load(xDoc, nodeObjSecLn))
                        return false; //@@@: return false;
                    } //@@@: }
                    secLn.setSectionName(m_name); //@@@: secLn.setSectionName(m_name);
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn); //@@@: nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_key); //@@@: xProperty.setName(m_key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Key"); //@@@: xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key); //@@@: xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice"); //@@@: xProperty.setName("Indice");
            xProperty.setValue(eTypes.eInteger, m_index); //@@@: xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeSection"); //@@@: xProperty.setName("TypeSection");
            xProperty.setValue(eTypes.eInteger, getTypeSection()); //@@@: xProperty.setValue(eTypes.eInteger, getTypeSection());
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaHide"); //@@@: xProperty.setName("HasFormulaHide");
            xProperty.setValue(eTypes.eBoolean, m_hasFormulaHide); //@@@: xProperty.setValue(eTypes.eBoolean, m_hasFormulaHide);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            if (!m_aspect.save(xDoc, nodeObj))  { //@@@: if (!m_aspect.save(xDoc, nodeObj))
                return false;  //@@@: return false;
            } //@@@: }
            if (!m_formulaHide.save(xDoc, nodeObj))  { //@@@: if (!m_formulaHide.save(xDoc, nodeObj))
                return false;  //@@@: return false;
            } //@@@: }

            xProperty.setName(C_NODERPTSECTIONLINES); //@@@: xProperty.setName(C_NODERPTSECTIONLINES);
            xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let seccLn = null; //@@@: cReportSectionLine seccLn = null;
            for(var _i = 0; _i < m_sectionLines.count(); _i++) { //@@@: for (int _i = 0; _i < m_sectionLines.count(); _i++)
                seccLn = m_sectionLines.item(_i); //@@@: seccLn = m_sectionLines.item(_i);
                seccLn.save(xDoc, nodeObj); //@@@: seccLn.save(xDoc, nodeObj);
            } //@@@: }

            return true; //@@@: return true;
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
        ~cReportSection() //@@@: ~cReportSection()
        { //@@@: {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(false) is optimal in terms of
            // readability and maintainability.
            Dispose(false); //@@@: Dispose(false);
        } //@@@: }

        const releaseReferences = function() { //@@@: private void releaseReferences()
            if (m_sectionLines !== null) { //@@@: if (m_sectionLines != null)
                if (m_sectionLines.getCopyColl() !== null) { //@@@: if (m_sectionLines.getCopyColl() != null)
                    m_sectionLines.getCopyColl().clear(); //@@@: m_sectionLines.getCopyColl().clear();
                    m_sectionLines.setCopyColl(null); //@@@: m_sectionLines.setCopyColl(null);
                } //@@@: }
                m_sectionLines = null; //@@@: m_sectionLines = null;
            } //@@@: }
            m_aspect = null; //@@@: m_aspect = null;
            m_formulaHide = null; //@@@: m_formulaHide = null;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
