(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCParameter = function() {

        // @ts-ignore
        let self: CSReportDll.IcParameter = {};
        const C_MODULE: string = "cParameter";

        let m_name: string = "";
        let m_columnType: csDataType = null;
        let m_value: string = "";
        let m_position: number = 0;
        let m_key: string = "";
        let m_hasDefault: boolean = null;
        let m_default: string = "";
        let m_isNullable: boolean = null;
        let m_maxLength: number = 0;

        self.getKey = function() {
            return m_key;
        };

        self.setKey = function(rhs) {
            m_key = rhs;
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getColumnType = function() {
            return m_columnType;
        };

        self.setColumnType = function(rhs) {
            m_columnType = rhs;
        };

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        self.getPosition = function() {
            return m_position;
        };

        self.setPosition = function(rhs) {
            m_position = rhs;
        };

        self.getHasDefault = function() {
            return m_hasDefault;
        };

        self.setHasDefault = function(rhs) {
            m_hasDefault = rhs;
        };

        self.getDefaultValue = function() {
            return m_default;
        };

        self.setDefaultValue = function(rhs) {
            m_default = rhs;
        };

        self.getIsNullable = function() {
            return m_isNullable;
        };

        self.setIsNullable = function(rhs) {
            m_isNullable = rhs;
        };

        self.getMaxLength = function() {
            return m_maxLength;
        };

        self.setMaxLength = function(rhs) {
            m_maxLength = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            m_columnType = cDatabaseGlobals.getDataTypeFromAdo(xDoc.getNodeProperty(nodeObj, "TypeColumn").getValueInt(eTypes.eInteger));
            m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            m_position = xDoc.getNodeProperty(nodeObj, "Position").getValueInt(eTypes.eInteger);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_maxLength = xDoc.getNodeProperty(nodeObj, "MaxLength").getValueInt(eTypes.eInteger);
            m_key = xDoc.getNodeProperty(nodeObj, "Key").getValueString(eTypes.eText);
            m_isNullable = xDoc.getNodeProperty(nodeObj, "IsNullable").getValueBool(eTypes.eBoolean);
            m_hasDefault = xDoc.getNodeProperty(nodeObj, "HasDefault").getValueBool(eTypes.eBoolean);
            m_default = xDoc.getNodeProperty(nodeObj, "Default").getValueString(eTypes.eText);

            return true;
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

            xProperty.setName("Position");
            xProperty.setValue(eTypes.eInteger, m_position);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeColumn");
            xProperty.setValue(eTypes.eInteger, cDatabaseGlobals.getAdoTypeFromDataType(m_columnType));
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("MaxLength");
            xProperty.setValue(eTypes.eInteger, m_maxLength);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsNullable");
            xProperty.setValue(eTypes.eBoolean, m_isNullable);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasDefault");
            xProperty.setValue(eTypes.eBoolean, m_hasDefault);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Default");
            xProperty.setValue(eTypes.eText, m_default);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcParameter {

    getKey: () => String;
    setKey: (String) => void;
    getName: () => String;
    setName: (String) => void;
    getColumnType: () => csDataType;
    setColumnType: (csDataType) => void;
    getValue: () => String;
    setValue: (String) => void;
    getPosition: () => int;
    setPosition: (int) => void;
    getHasDefault: () => bool;
    setHasDefault: (bool) => void;
    getDefaultValue: () => String;
    setDefaultValue: (String) => void;
    getIsNullable: () => bool;
    setIsNullable: (bool) => void;
    getMaxLength: () => int;
    setMaxLength: (int) => void;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
  }
}
