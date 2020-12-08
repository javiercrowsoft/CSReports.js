(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportSectionLine = function() {

        const self = {};

        const C_NODERPTCONTROLS = "RptControls";

        let m_controls = new cReportControls();
        let m_aspect = new cReportAspect();
        let m_index = 0;
        let m_realIndex = 0;
        let m_key = "";
        let m_keyPaint = "";
        let m_formulaHide = new cReportFormula();
        let m_hasFormulaHide = null;

        // it is the name of the control which have the id of the line
        // it is used by cReportLinkServer
        // when a user makes double clic over a line in a preview report
        // window the showDetails() event of cReportLinkServer will be raised
        // a listener for this event could use this property to know which
        // control contains the id of the record expressed in the line selected
        // by the user.
        //
        let m_idField = "";

        // for debugging
        //
        let m_sectionName = "";

        const cReportSectionLine = function() {
            m_controls.setSectionLine(this);
            m_formulaHide.setName("H");
        };

        self.getKeyPaint = function() {
            return m_keyPaint;
        };

        self.setKeyPaint = function(rhs) {
            m_keyPaint = rhs;
        };

        self.getControls = function() {
            return m_controls;
        };

        self.setControls = function(rhs) {
            m_controls = rhs;
        };

        self.getIdField = function() {
            return m_idField;
        };

        self.setIdField = function(rhs) {
            m_idField = rhs;
        };

        self.getKey = function() {
            return m_key;
        };

        self.setKey = function(rhs) {
            m_key = rhs;
        };

        self.getAspect = function() {
            return m_aspect;
        };

        self.setAspect = function(rhs) {
            m_aspect = rhs;
        };

        self.getName = function() {
            return "SL: " + m_index.ToString();
        };

        self.setName = function(name) {
            // shouldn't be called :P
        };

        self.getIndex = function() {
            return m_index;
        };

        self.setIndex = function(rhs) {
            m_index = rhs;
        };

        self.getRealIndex = function() {
            return m_realIndex;
        };

        self.setRealIndex = function(rhs) {
            m_realIndex = rhs;
        };

        self.getHasFormulaHide = function() {
            return m_hasFormulaHide;
        };

        self.setHasFormulaHide = function(rhs) {
            m_hasFormulaHide = rhs;
        };

        self.getFormulaHide = function() {
            return m_formulaHide;
        };

        self.getTypeSection = function() {
            return m_controls.getTypeSection();
        };

        self.setTypeSection = function(rhs) {
            m_controls.setTypeSection(rhs);
        };

        self.getSectionName = function() {
            return m_sectionName;
        };

        self.setSectionName = function(rhs) {
            m_sectionName = rhs;
        };

        self.setCopyColl = function(rhs) {
            if (m_controls !== null) {
                m_controls.setCopyColl(rhs);
        };

        self.load = function(xDoc, nodeObj) {
            let nodeObjCtrls = null;
            let nodeObjCtrl = null;
            let nodeObjAspect = null;

            let ctrl = null;

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);
            m_idField = xDoc.getNodeProperty(nodeObj, "IdField").getValueString(eTypes.eText);
            m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean);

            nodeObjAspect = nodeObj;

            let nodeObjAux = nodeObj;
            if (!m_formulaHide.load(xDoc, nodeObjAux))  {
                return false; 
            }

            if (!m_aspect.load(xDoc, nodeObjAspect))  {
                return false; 
            }

            nodeObjCtrls = xDoc.getNodeFromNode(nodeObj, C_NODERPTCONTROLS);

            if (xDoc.nodeHasChild(nodeObjCtrls))  {
                nodeObjCtrl = xDoc.getNodeChild(nodeObjCtrls);

                while (nodeObjCtrl !== null) {
                    let key = xDoc.getNodeProperty(nodeObjCtrl, "Key").getValueString(eTypes.eText);
                    ctrl = m_controls.add(null, key);
                    if (!ctrl.load(xDoc, nodeObjCtrl))  {
                        return false; 
                    }
                    nodeObjCtrl = xDoc.getNextNode(nodeObjCtrl);
                }
            }

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice");
            xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IdField");
            xProperty.setValue(eTypes.eText, m_idField);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaHide");
            xProperty.setValue(eTypes.eBoolean, m_hasFormulaHide);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            if (!m_aspect.save(xDoc, nodeObj))  {
                return false; 
            }
            if (!m_formulaHide.save(xDoc, nodeObj))  {
                return false; 
            }

            xProperty.setName(C_NODERPTCONTROLS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let ctrl = null;
            for(var _i = 0; _i < m_controls.count(); _i++) {
                ctrl = m_controls.item(_i);
                ctrl.save(xDoc, nodeObj);
            }

            return true;
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
        let disposed = false;

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
        ~cReportSectionLine()
        {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(false) is optimal in terms of
            // readability and maintainability.
            Dispose(false);
        }

        const releaseReferences = function() {
            setCopyColl(null);

            if (m_controls !== null) {
                if (m_controls.getCopyColl() !== null) {
                    m_controls.getCopyColl().clear();
                    m_controls.setCopyColl(null);
                }
                m_controls.clear();
                m_controls = null;
            }

            m_aspect = null;
            m_formulaHide = null;
        };
        return self;

    }

}(globalObject));
