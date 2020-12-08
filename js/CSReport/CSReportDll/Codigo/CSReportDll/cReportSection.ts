(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportSection = function() {

        const self = {};

        const C_NODERPTSECTIONLINES = "RptSectionLines";

        let m_sectionLines = new cReportSectionLines();
        let m_aspect = new cReportAspect();
        let m_index = 0;
        let m_realIndex = 0;
        let m_key = "";
        let m_name = "";
        let m_keyPaint = "";
        let m_formulaHide = new cReportFormula();
        let m_hasFormulaHide = null;

        const cReportSection = function() {
            m_formulaHide.setName("H");

            // when a new section is create a new line section 
            // is automatically added
            // 
            m_sectionLines.add(null, "", -1);
        };

        self.getSectionLines = function() {
            return m_sectionLines;
        };

        self.setSectionLines = function(rhs) {
            m_sectionLines = rhs;
        };

        self.getAspect = function() {
            return m_aspect;
        };

        self.setAspect = function(rhs) {
            m_aspect = rhs;
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

        self.getKey = function() {
            return m_key;
        };

        self.setKey = function(rhs) {
            m_key = rhs;
        };

        self.getTypeSection = function() {
            return m_sectionLines.getTypeSection();
        };

        self.setTypeSection = function(rhs) {
            m_sectionLines.setTypeSection(rhs);
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.setCopyColl = function(rhs) {
            if (m_sectionLines !== null) {
                m_sectionLines.setCopyColl(rhs);
            }
        };

        self.getKeyPaint = function() {
            return m_keyPaint;
        };

        self.setKeyPaint = function(rhs) {
            m_keyPaint = rhs;
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

        self.load = function(xDoc, nodeObj) {
            let nodeObjSecLn = null;
            let nodeObjAspect = null;
            let secLn = null;

            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);

            setTypeSection(xDoc.getNodeProperty(nodeObj, "TypeSection").getValueInt(eTypes.eInteger));
            m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean);

            nodeObjAspect = nodeObj;
            if (!m_aspect.load(xDoc, nodeObjAspect)) {
                return false;
            }

            let nodeObjAux = nodeObj;
            if (!m_formulaHide.load(xDoc, nodeObjAux)) {
                return false;
            }

            m_sectionLines.clear();

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTSECTIONLINES);
            if (xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    let key = xDoc.getNodeProperty(nodeObjSecLn, "Key").getValueString(eTypes.eText);
                    secLn = m_sectionLines.add(null, key, -1);
                    if (!secLn.load(xDoc, nodeObjSecLn)) {
                        return false;
                    }
                    secLn.setSectionName(m_name);
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
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

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice");
            xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeSection");
            xProperty.setValue(eTypes.eInteger, getTypeSection());
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

            xProperty.setName(C_NODERPTSECTIONLINES);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let seccLn = null;
            for(var _i = 0; _i < m_sectionLines.count(); _i++) {
                seccLn = m_sectionLines.item(_i);
                seccLn.save(xDoc, nodeObj);
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
        ~cReportSection()
        {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(false) is optimal in terms of
            // readability and maintainability.
            Dispose(false);
        }

        const releaseReferences = function() {
            if (m_sectionLines !== null) {
                if (m_sectionLines.getCopyColl() !== null) {
                    m_sectionLines.getCopyColl().clear();
                    m_sectionLines.setCopyColl(null);
                }
                m_sectionLines = null;
            }
            m_aspect = null;
            m_formulaHide = null;
        };

        return self;

    }

}(globalObject));
