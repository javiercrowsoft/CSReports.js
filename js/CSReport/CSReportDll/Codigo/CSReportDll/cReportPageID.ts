(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportPageID = function() {

        const self = {};

        const C_MODULE = "cReportPageID";

        let m_value = "";

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("PageID");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }

}(globalObject));