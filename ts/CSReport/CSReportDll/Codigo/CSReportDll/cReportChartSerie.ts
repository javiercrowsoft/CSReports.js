(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportChartSerie = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportChartSerie = {};

        const C_MODULE: string = "cReportChartSerie";

        let m_valueFieldName: string = "";
        let m_labelFieldName: string = "";
        let m_color: csColors = csColors.ALICEBLUE;
        let m_valueIndex: number = 0;
        let m_labelIndex: number = 0;

        self.getValueFieldName = function() {
            return m_valueFieldName;
        };

        self.setValueFieldName = function(rhs) {
            m_valueFieldName = rhs;
        };

        self.getLabelFieldName = function() {
            return m_labelFieldName;
        };

        self.setLabelFieldName = function(rhs) {
            m_labelFieldName = rhs;
        };

        self.getColor = function() {
            return m_color;
        };

        self.setColor = function(value) {
            m_color = value;
        };

        self.getValueIndex = function() {
            return m_valueIndex;
        };

        self.setValueIndex = function(rhs) {
            m_valueIndex = rhs;
        };

        self.getLabelIndex = function() {
            return m_labelIndex;
        };

        self.setLabelIndex = function(rhs) {
            m_labelIndex = rhs;
        };

        self.load = function(xDoc, nodeObj, index) {
            try { m_valueFieldName = xDoc.getNodeProperty(nodeObj, "ValueFieldName").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { m_labelFieldName = xDoc.getNodeProperty(nodeObj, "LabelFieldName").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { m_color = xDoc.getNodeProperty(nodeObj, "Color").getValueInt(eTypes.eLong); }
            catch  (ex) { }

            return true;
        };

        self.save = function(xDoc, nodeFather, index) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

            xProperty.setName("Serie_" + index.ToString());
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("ValueFieldName");
            xProperty.setValue(eTypes.eText, m_valueFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("LabelFieldName");
            xProperty.setValue(eTypes.eText, m_labelFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Color");
            xProperty.setValue(eTypes.eLong, m_color);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportChartSerie {

    getValueFieldName: () => String;
    setValueFieldName: (String) => void;
    getLabelFieldName: () => String;
    setLabelFieldName: (String) => void;
    getColor: () => csColors;
    setColor: (csColors) => void;
    getValueIndex: () => int;
    setValueIndex: (int) => void;
    getLabelIndex: () => int;
    setLabelIndex: (int) => void;
    load: (CSXml.cXml, XmlNode, int) => bool;
    save: (CSXml.cXml, XmlNode, int) => bool;
  }
}
