(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportSectionLine = function() {

        const self = {}; //@@@: public class cReportSectionLine : IDisposable, cIReportSection

        const C_NODERPTCONTROLS = "RptControls"; //@@@: private const String C_NODERPTCONTROLS = "RptControls";

        let m_controls = new cReportControls(); //@@@: private cReportControls m_controls = new cReportControls();
        let m_aspect = new cReportAspect(); //@@@: private cReportAspect m_aspect = new cReportAspect();
        let m_index = 0; //@@@: private int m_index = 0;
        let m_realIndex = 0; //@@@: private int m_realIndex = 0;
        let m_key = ""; //@@@: private String m_key = "";
        let m_keyPaint = ""; //@@@: private String m_keyPaint = "";
        let m_formulaHide = new cReportFormula(); //@@@: private cReportFormula m_formulaHide = new cReportFormula();
        let m_hasFormulaHide = null; //@@@: private bool m_hasFormulaHide;

        // it is the name of the control which have the id of the line
        // it is used by cReportLinkServer
        // when a user makes double clic over a line in a preview report
        // window the showDetails() event of cReportLinkServer will be raised
        // a listener for this event could use this property to know which
        // control contains the id of the record expressed in the line selected
        // by the user.
        //
        let m_idField = ""; //@@@: private String m_idField = "";

        // for debugging
        //
        let m_sectionName = ""; //@@@: private String m_sectionName = "";

        const cReportSectionLine = function() { //@@@: public cReportSectionLine()
            m_controls.setSectionLine(this); //@@@: m_controls.setSectionLine(this);
            m_formulaHide.setName("H"); //@@@: m_formulaHide.setName("H");
        }; //@@@: }

        self.getKeyPaint = function() { //@@@: public String getKeyPaint()
            return m_keyPaint; //@@@: return m_keyPaint;
        }; //@@@: }

        self.setKeyPaint = function(rhs) { //@@@: public void setKeyPaint(String rhs)
            m_keyPaint = rhs; //@@@: m_keyPaint = rhs;
        }; //@@@: }

        self.getControls = function() { //@@@: public cReportControls getControls()
            return m_controls; //@@@: return m_controls;
        }; //@@@: }

        self.setControls = function(rhs) { //@@@: public void setControls(cReportControls rhs)
            m_controls = rhs; //@@@: m_controls = rhs;
        }; //@@@: }

        self.getIdField = function() { //@@@: public String getIdField()
            return m_idField; //@@@: return m_idField;
        }; //@@@: }

        self.setIdField = function(rhs) { //@@@: public void setIdField(String rhs)
            m_idField = rhs; //@@@: m_idField = rhs;
        }; //@@@: }

        self.getKey = function() { //@@@: public String getKey()
            return m_key; //@@@: return m_key;
        }; //@@@: }

        self.setKey = function(rhs) { //@@@: public void setKey(String rhs)
            m_key = rhs; //@@@: m_key = rhs;
        }; //@@@: }

        self.getAspect = function() { //@@@: public cReportAspect getAspect()
            return m_aspect; //@@@: return m_aspect;
        }; //@@@: }

        self.setAspect = function(rhs) { //@@@: public void setAspect(cReportAspect rhs)
            m_aspect = rhs; //@@@: m_aspect = rhs;
        }; //@@@: }

        self.getName = function() { //@@@: public string getName()
            return "SL: " + m_index.ToString(); //@@@: return "SL: " + m_index.ToString();
        }; //@@@: }

        self.setName = function(name) { //@@@: public void setName(string name) {
            // shouldn't be called :P
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

        self.getHasFormulaHide = function() { //@@@: public bool getHasFormulaHide()
            return m_hasFormulaHide; //@@@: return m_hasFormulaHide;
        }; //@@@: }

        self.setHasFormulaHide = function(rhs) { //@@@: public void setHasFormulaHide(bool rhs)
            m_hasFormulaHide = rhs; //@@@: m_hasFormulaHide = rhs;
        }; //@@@: }

        self.getFormulaHide = function() { //@@@: public cReportFormula getFormulaHide()
            return m_formulaHide; //@@@: return m_formulaHide;
        }; //@@@: }

        self.getTypeSection = function() { //@@@: public csRptSectionType getTypeSection()
            return m_controls.getTypeSection(); //@@@: return m_controls.getTypeSection();
        }; //@@@: }

        self.setTypeSection = function(rhs) { //@@@: public void setTypeSection(csRptSectionType rhs)
            m_controls.setTypeSection(rhs); //@@@: m_controls.setTypeSection(rhs);
        }; //@@@: }

        self.getSectionName = function() { //@@@: public String getSectionName()
            return m_sectionName; //@@@: return m_sectionName;
        }; //@@@: }

        self.setSectionName = function(rhs) { //@@@: public void setSectionName(String rhs)
            m_sectionName = rhs; //@@@: m_sectionName = rhs;
        }; //@@@: }

        self.setCopyColl = function(rhs) { //@@@: public void setCopyColl(cReportControls2 rhs)
            if (m_controls !== null) { //@@@: if (m_controls != null)
                m_controls.setCopyColl(rhs); //@@@: m_controls.setCopyColl(rhs);
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            let nodeObjCtrls = null; //@@@: XmlNode nodeObjCtrls = null;
            let nodeObjCtrl = null; //@@@: XmlNode nodeObjCtrl = null;
            let nodeObjAspect = null; //@@@: XmlNode nodeObjAspect = null;

            let ctrl = null; //@@@: cReportControl ctrl = null;

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger); //@@@: m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);
            m_idField = xDoc.getNodeProperty(nodeObj, "IdField").getValueString(eTypes.eText); //@@@: m_idField = xDoc.getNodeProperty(nodeObj, "IdField").getValueString(eTypes.eText);
            m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean); //@@@: m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean);

            nodeObjAspect = nodeObj; //@@@: nodeObjAspect = nodeObj;

            let nodeObjAux = nodeObj; //@@@: XmlNode nodeObjAux = nodeObj;
            if (!m_formulaHide.load(xDoc, nodeObjAux))  { //@@@: if (!m_formulaHide.load(xDoc, nodeObjAux))
                return false;  //@@@: return false;
            } //@@@: }

            if (!m_aspect.load(xDoc, nodeObjAspect))  { //@@@: if (!m_aspect.load(xDoc, nodeObjAspect))
                return false;  //@@@: return false;
            } //@@@: }

            nodeObjCtrls = xDoc.getNodeFromNode(nodeObj, C_NODERPTCONTROLS); //@@@: nodeObjCtrls = xDoc.getNodeFromNode(nodeObj, C_NODERPTCONTROLS);

            if (xDoc.nodeHasChild(nodeObjCtrls))  { //@@@: if (xDoc.nodeHasChild(nodeObjCtrls))
                nodeObjCtrl = xDoc.getNodeChild(nodeObjCtrls); //@@@: nodeObjCtrl = xDoc.getNodeChild(nodeObjCtrls);

                while (nodeObjCtrl !== null) { //@@@: while (nodeObjCtrl != null) {
                    let key = xDoc.getNodeProperty(nodeObjCtrl, "Key").getValueString(eTypes.eText); //@@@: String key = xDoc.getNodeProperty(nodeObjCtrl, "Key").getValueString(eTypes.eText);
                    ctrl = m_controls.add(null, key); //@@@: ctrl = m_controls.add(null, key);
                    if (!ctrl.load(xDoc, nodeObjCtrl))  { //@@@: if (!ctrl.load(xDoc, nodeObjCtrl))
                        return false;  //@@@: return false;
                    } //@@@: }
                    nodeObjCtrl = xDoc.getNextNode(nodeObjCtrl); //@@@: nodeObjCtrl = xDoc.getNextNode(nodeObjCtrl);
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

            xProperty.setName("Key"); //@@@: xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key); //@@@: xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice"); //@@@: xProperty.setName("Indice");
            xProperty.setValue(eTypes.eInteger, m_index); //@@@: xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IdField"); //@@@: xProperty.setName("IdField");
            xProperty.setValue(eTypes.eText, m_idField); //@@@: xProperty.setValue(eTypes.eText, m_idField);
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

            xProperty.setName(C_NODERPTCONTROLS); //@@@: xProperty.setName(C_NODERPTCONTROLS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let ctrl = null; //@@@: cReportControl ctrl = null;
            for(var _i = 0; _i < m_controls.count(); _i++) { //@@@: for (int _i = 0; _i < m_controls.count(); _i++)
                ctrl = m_controls.item(_i); //@@@: ctrl = m_controls.item(_i);
                ctrl.save(xDoc, nodeObj); //@@@: ctrl.save(xDoc, nodeObj);
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
        ~cReportSectionLine() //@@@: ~cReportSectionLine()
        { //@@@: {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(false) is optimal in terms of
            // readability and maintainability.
            Dispose(false); //@@@: Dispose(false);
        } //@@@: }

        const releaseReferences = function() { //@@@: private void releaseReferences()
            setCopyColl(null); //@@@: setCopyColl(null);

            if (m_controls !== null) { //@@@: if (m_controls != null)
                if (m_controls.getCopyColl() !== null) { //@@@: if (m_controls.getCopyColl() != null)
                    m_controls.getCopyColl().clear(); //@@@: m_controls.getCopyColl().clear();
                    m_controls.setCopyColl(null); //@@@: m_controls.setCopyColl(null);
                } //@@@: }
                m_controls.clear(); //@@@: m_controls.clear();
                m_controls = null; //@@@: m_controls = null;
            } //@@@: }

            m_aspect = null; //@@@: m_aspect = null;
            m_formulaHide = null; //@@@: m_formulaHide = null;
        }; //@@@: }
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
