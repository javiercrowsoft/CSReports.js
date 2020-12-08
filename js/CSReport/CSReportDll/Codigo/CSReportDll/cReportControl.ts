(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportControl = function() {

        const self = {};

        let m_label = new cReportLabel();
        let m_image = new cReportImage();
        let m_line = new cReportLine();
        let m_field = new cReportField();
        let m_typeSection = null;
        let m_key = "";
        let m_keyPaint = "";
        let m_name = "";
        let m_hasFormulaHide = null;
        let m_hasFormulaValue = null;
        let m_controlType = null;
        let m_formulaHide = new cReportFormula();
        let m_formulaValue = new cReportFormula();
        let m_chart = new cReportChart();
        let m_tag = "";
        let m_exportColIdx = 0;
        let m_isFreeCtrl = null;

        // this reference tell in which section line is this control
        //
        let m_sectionLine = null;

        const cReportControl = function() {
            m_formulaHide.setName("H");
            m_formulaValue.setName("V");
        };

        self.getLabel = function() {
            return m_label;
        };

        self.setLabel = function(rhs) {
            m_label = rhs;
        };

        self.getImage = function() {
            return m_image;
        };

        self.setImage = function(rhs) {
            m_image = rhs;
        };

        self.getFormulaHide = function() {
            return m_formulaHide;
        };

        self.getFormulaValue = function() {
            return m_formulaValue;
        };

        self.getHasFormulaValue = function() {
            return m_hasFormulaValue;
        };

        self.setHasFormulaValue = function(rhs) {
            m_hasFormulaValue = rhs;
        };

        self.getLine = function() {
            return m_line;
        };

        self.setLine = function(rhs) {
            m_line = rhs;
        };

        self.getField = function() {
            return m_field;
        };

        self.setField = function(rhs) {
            m_field = rhs;
        };

        self.getKey = function() {
            return m_key;
        };

        self.setKey = function(rhs) {
            m_key = rhs;
        };

        self.getKeyPaint = function() {
            return m_keyPaint;
        };

        self.setKeyPaint = function(rhs) {
            m_keyPaint = rhs;
        };

        self.getChart = function() {
            return m_chart;
        };

        self.getTag = function() {
            return m_tag;
        };

        self.setTag = function(rhs) {
            m_tag = rhs;
        };

        self.getTypeSection = function() {
            return m_typeSection;
        };

        self.setTypeSection = function(rhs) {
            m_typeSection = rhs;
        };

        self.getSectionLine = function() {
            return m_sectionLine;
        };

        self.setSectionLine = function(rhs) {
            m_sectionLine = rhs;
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getHasFormulaHide = function() {
            return m_hasFormulaHide;
        };

        self.setHasFormulaHide = function(rhs) {
            m_hasFormulaHide = rhs;
        };

        self.getControlType = function() {
            return m_controlType;
        };

        self.setControlType = function(rhs) {
            m_controlType = rhs;
        };

        self.setExportColIdx = function(rhs) {
            m_exportColIdx = rhs;
        };

        self.getExportColIdx = function() {
            return m_exportColIdx;
        };

        self.setIsFreeCtrl = function(rhs) {
            m_isFreeCtrl = rhs;
        };

        self.getIsFreeCtrl = function() {
            return m_isFreeCtrl;
        };

        self.load = function(xDoc, nodeObj) {
            m_keyPaint = xDoc.getNodeProperty(nodeObj, "KeyPaint").getValueString(eTypes.eText);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            try { m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { m_hasFormulaValue = xDoc.getNodeProperty(nodeObj, "HasFormulaValue").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { m_controlType = xDoc.getNodeProperty(nodeObj, "ControlType").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { m_tag = xDoc.getNodeProperty(nodeObj, "Tag").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { m_exportColIdx = xDoc.getNodeProperty(nodeObj, "ExportColIdx").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_isFreeCtrl = xDoc.getNodeProperty(nodeObj, "IsFreeCtrl").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }

            try {
                if (!m_field.load(xDoc, nodeObj)) { return false; }
                if (!m_image.load(xDoc, nodeObj)) { return false; }
                if (!m_label.load(xDoc, nodeObj)) { return false; }
                if (!m_line.load(xDoc, nodeObj)) { return false; }
                if (!m_formulaHide.load(xDoc, nodeObj)) { return false; }
                if (!m_formulaValue.load(xDoc, nodeObj)) { return false; }
                if (!m_chart.load(xDoc, nodeObj)) { return false; }

                // TODO: remove me after all reports were migrated
                //
                if (m_label.getAspect().getFormat() === "" && m_field.getFieldType() === CSDataBase.csAdoDataType.adDBTimeStamp) {
                    m_label.getAspect().setFormat("dd/MM/yyyy");
                }

                return true;
            }
            catch(ex)  {
                return false; 
            }
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

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("KeyPaint");
            xProperty.setValue(eTypes.eText, m_keyPaint);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaHide");
            xProperty.setValue(eTypes.eBoolean, m_hasFormulaHide);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaValue");
            xProperty.setValue(eTypes.eBoolean, m_hasFormulaValue);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ControlType");
            xProperty.setValue(eTypes.eInteger, m_controlType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Tag");
            xProperty.setValue(eTypes.eText, m_tag);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ExportColIdx");
            xProperty.setValue(eTypes.eLong, m_exportColIdx);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsFreeCtrl");
            xProperty.setValue(eTypes.eBoolean, m_isFreeCtrl);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            if (!m_field.save(xDoc, nodeObj)) { return false; }
            if (!m_image.save(xDoc, nodeObj)) { return false; }
            if (!m_label.save(xDoc, nodeObj)) { return false; }
            if (!m_line.save(xDoc, nodeObj)) { return false; }
            if (!m_formulaHide.save(xDoc, nodeObj)) { return false; }
            if (!m_formulaValue.save(xDoc, nodeObj)) { return false; }
            if (!m_chart.save(xDoc, nodeObj)) { return false; }
            return true;
        };

        return self;

    }

}(globalObject));
