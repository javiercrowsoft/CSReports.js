(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportLabel = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportLabel = {};

        let m_aspect: cReportAspect = null;
        let m_text: string = "";
        let m_canGrow: boolean = null;

        const cReportLabel = function() {
            m_aspect = globalObject.CSReportDll.createCReportAspect();
        };

        self.getAspect = function() {
            return m_aspect;
        };

        self.setAspect = function(rhs) {
            m_aspect = rhs;
        };

        self.getText = function() {
            return m_text;
        };

        self.setText = function(rhs) {
            m_text = rhs;
        };

        self.getCanGrow = function() {
            return m_canGrow;
        };

        self.setCanGrow = function(rhs) {
            m_canGrow = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Label");
            m_text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText);
            return m_aspect.load(xDoc, nodeObj);
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

            xProperty.setName("Label");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Text");
            xProperty.setValue(eTypes.eText, m_text);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CanGrow");
            xProperty.setValue(eTypes.eBoolean, m_canGrow);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return m_aspect.save(xDoc, nodeObj);
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportLabel {

    getAspect: () => cReportAspect;
    setAspect: (cReportAspect) => void;
    getText: () => String;
    setText: (String) => void;
    getCanGrow: () => bool;
    setCanGrow: (bool) => void;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
  }
}
