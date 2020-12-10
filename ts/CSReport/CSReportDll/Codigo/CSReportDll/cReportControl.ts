(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportControl = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportControl = {};

        let m_label: cReportLabel = new cReportLabel();
        let m_image: cReportImage = new cReportImage();
        let m_line: cReportLine = new cReportLine();
        let m_field: cReportField = new cReportField();
        let m_typeSection: csRptSectionType = null;
        let m_key: string = "";
        let m_keyPaint: string = "";
        let m_name: string = "";
        let m_hasFormulaHide: boolean = null;
        let m_hasFormulaValue: boolean = null;
        let m_controlType: csRptControlType = null;
        let m_formulaHide: cReportFormula = new cReportFormula();
        let m_formulaValue: cReportFormula = new cReportFormula();
        let m_chart: cReportChart = new cReportChart();
        let m_tag: string = "";
        let m_exportColIdx: number = 0;
        let m_isFreeCtrl: boolean = null;

        // this reference tell in which section line is this control
        //
        let m_sectionLine: cReportSectionLine = null;

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
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

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

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportControl {

    getLabel: () => cReportLabel;
    setLabel: (cReportLabel) => void;
    getImage: () => cReportImage;
    setImage: (cReportImage) => void;
    getFormulaHide: () => cReportFormula;
    getFormulaValue: () => cReportFormula;
    getHasFormulaValue: () => bool;
    setHasFormulaValue: (bool) => void;
    getLine: () => cReportLine;
    setLine: (cReportLine) => void;
    getField: () => cReportField;
    setField: (cReportField) => void;
    getKey: () => String;
    setKey: (String) => void;
    getKeyPaint: () => String;
    setKeyPaint: (String) => void;
    getChart: () => cReportChart;
    getTag: () => String;
    setTag: (String) => void;
    getTypeSection: () => csRptSectionType;
    setTypeSection: (csRptSectionType) => void;
    getSectionLine: () => cReportSectionLine;
    setSectionLine: (cReportSectionLine) => void;
    getName: () => String;
    setName: (String) => void;
    getHasFormulaHide: () => bool;
    setHasFormulaHide: (bool) => void;
    getControlType: () => csRptControlType;
    setControlType: (csRptControlType) => void;
    setExportColIdx: (int) => void;
    getExportColIdx: () => int;
    setIsFreeCtrl: (bool) => void;
    getIsFreeCtrl: () => bool;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
  }
}
