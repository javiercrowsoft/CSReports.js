(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportFont = function() {

        const self = {};

        let m_foreColor: number= csColors.C_COLOR_BLACK;
        let m_size: number= 8;
        let m_name: string= "Tahoma";
        let m_underline: boolean = null;
        let m_bold: boolean = null;
        let m_italic: boolean = null;
        let m_strike: boolean = null;

        self.getForeColor = function() {
            return m_foreColor;
        };

        self.setForeColor = function(rhs) {
            m_foreColor = rhs;
        };

        self.getSize = function() {
            return m_size;
        };

        self.setSize = function(rhs) {
            m_size = rhs;
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getUnderline = function() {
            return m_underline;
        };

		self.setUnderline = function(rhs) {
            m_underline = rhs;
        };

        self.getBold = function() {
            return m_bold;
        };

        self.setBold = function(rhs) {
            m_bold = rhs;
        };

        self.getItalic = function() {
            return m_italic;
        };

        self.setItalic = function(rhs) {
            m_italic = rhs;
        };

        self.getStrike = function() {
            return m_strike;
        };

        self.setStrike = function(rhs) {
            m_strike = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Font");
            m_bold = xDoc.getNodeProperty(nodeObj, "Bold").getValueBool(eTypes.eBoolean);
            m_foreColor = xDoc.getNodeProperty(nodeObj, "ForeColor").getValueInt(eTypes.eLong);
            m_italic = xDoc.getNodeProperty(nodeObj, "Italic").getValueBool(eTypes.eBoolean);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_size = xDoc.getNodeProperty(nodeObj, "Size").getValueInt(eTypes.eInteger);
            m_underline = xDoc.getNodeProperty(nodeObj, "UnderLine").getValueBool(eTypes.eBoolean);
            m_strike = xDoc.getNodeProperty(nodeObj, "Strike").getValueBool(eTypes.eBoolean);

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty= null;
            let nodeObj: XmlNode= null;
            xProperty =  globalObject.CSReportDll.createCSXml.cXmlProperty();

            xProperty.setName("Font");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("ForeColor");
            xProperty.setValue(eTypes.eLong, m_foreColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Bold");
            xProperty.setValue(eTypes.eBoolean, m_bold);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Italic");
            xProperty.setValue(eTypes.eBoolean, m_italic);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Size");
            xProperty.setValue(eTypes.eInteger, m_size);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("UnderLine");
            xProperty.setValue(eTypes.eBoolean, m_underline);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Strike");
            xProperty.setValue(eTypes.eBoolean, m_strike);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }

}(globalObject));
