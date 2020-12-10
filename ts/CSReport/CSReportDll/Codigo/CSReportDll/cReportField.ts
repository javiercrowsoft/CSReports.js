(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportField = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportField = {};

        let m_name: string = "";
        let m_index: number = 0;
        let m_fieldType: number = 0;

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getIndex = function() {
            return m_index;
        };

        self.setIndex = function(rhs) {
            m_index = rhs;
        };

        self.getFieldType = function() {
            return m_fieldType;
        };

        self.setFieldType = function(rhs) {
            m_fieldType = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Field");
            m_index = xDoc.getNodeProperty(nodeObj, "Index").getValueInt(eTypes.eInteger);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger);
            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

            xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Index");
            xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldType");
            xProperty.setValue(eTypes.eInteger, m_fieldType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportField {

    getName: () => String;
    setName: (String) => void;
    getIndex: () => int;
    setIndex: (int) => void;
    getFieldType: () => int;
    setFieldType: (int) => void;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
  }
}
