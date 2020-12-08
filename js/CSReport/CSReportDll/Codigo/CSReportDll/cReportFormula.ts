(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportFormula = function() {

        const self = {};

        let m_name = "";
        let m_text = "";
        let m_formulasInt = new cReportFormulasInt();
        let m_notSave = null;

        // when we compile a function we parse the text and extract
        // from the script all internal functions
        // every internal function is added to the collection m_FormulasInt
        // and replaced in the script by an String $$$n  
        // n is the index of the function in m_FormulasInt
        // when we run the script every occurrence of $$$n is replaced for
        // the value of their corresponding function
        // finaly if the text contains an script we evalute this with the
        // ScriptControl
        // 
        // compiled text of the function
        //
        let m_textC = "";
        let m_idxGroup = 0;
        let m_idxGroup2 = -9999;
        let m_whenEval = null;
        let m_haveToEval = null;
        let m_lastResult = null;

        // for debugging
        //
        let m_controlName = "";
        let m_sectionLineIndex = 0;
        let m_sectionName = "";

        let m_compiledScript = null;

        self.getCompiledScript = function() {
            return m_compiledScript;
        };

        self.setCompiledScript = function(value) {
            m_compiledScript = value;
        };

        self.getIdxGroup = function() {
            return m_idxGroup;
        };

        self.setIdxGroup = function(rhs) {
            m_idxGroup = rhs;
        };

        self.getIdxGroup2 = function() {
            return m_idxGroup2;
        };

        self.setIdxGroup2 = function(rhs) {
            m_idxGroup2 = rhs;
        };

        self.getWhenEval = function() {
            return m_whenEval;
        };

        self.setWhenEval = function(rhs) {
            m_whenEval = rhs;
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getText = function() {
            return m_text;
        };

        self.setText = function(rhs) {
            m_text = rhs;
        };

        self.getControlName = function() {
            return m_controlName;
        };

        self.setControlName = function(rhs) {
            m_controlName = rhs;
        };

        self.getSectionName = function() {
            return m_sectionName;
        };

        self.setSectionName = function(rhs) {
            m_sectionName = rhs;
        };

        self.getSectionLineIndex = function() {
            return m_sectionLineIndex;
        };

        self.setSectionLineIndex = function(rhs) {
            m_sectionLineIndex = rhs;
        };

        self.getFormulasInt = function() {
            return m_formulasInt;
        };

        self.getTextC = function() {
            return m_textC;
        };

        self.setTextC = function(rhs) {
            m_textC = rhs;
        };

        self.getNotSave = function() {
            return m_notSave;
        };

        self.setNotSave = function(rhs) {
            m_notSave = rhs;
        };

        self.getHaveToEval = function() {
            return m_haveToEval;
        };

        self.setHaveToEval = function(rhs) {
            m_haveToEval = rhs;
        };

        self.getLastResult = function() {
            return m_lastResult;
        };

        self.setLastResult = function(rhs) {
            m_lastResult = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, m_name);

            if (nodeObj !== null) {
                m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
                m_text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText);
                m_idxGroup = xDoc.getNodeProperty(nodeObj, "idxGroup").getValueInt(eTypes.eLong);
                m_whenEval = xDoc.getNodeProperty(nodeObj, "WhenEval").getValueInt(eTypes.eInteger);
            }

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_name);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Text");
            xProperty.setValue(eTypes.eText, m_text);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("idxGroup");
            xProperty.setValue(eTypes.eLong, m_idxGroup);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("WhenEval");
            xProperty.setValue(eTypes.eInteger, m_whenEval);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }

}(globalObject));
