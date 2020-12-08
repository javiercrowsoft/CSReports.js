(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportChartSerie = function() {

        const self = {};

        const C_MODULE = "cReportChartSerie";

        let m_valueFieldName = "";
        let m_labelFieldName = "";
        let m_color = csColors.ALICEBLUE;
        let m_valueIndex = 0;
        let m_labelIndex = 0;

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
            let xProperty = null;
            let nodeObj = null;
            xProperty = new CSXml.cXmlProperty();

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

    }

}(globalObject));
