(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCParameter = function() {

        const self = {}; //@@@: public class cParameter
        const C_MODULE = "cParameter"; //@@@: private const String C_MODULE = "cParameter";

        let m_name = ""; //@@@: private String m_name = "";
        let m_columnType = null; //@@@: private csDataType m_columnType;
        let m_value = ""; //@@@: private String m_value = "";
        let m_position = 0; //@@@: private int m_position = 0;
        let m_key = ""; //@@@: private String m_key = "";
        let m_hasDefault = null; //@@@: private bool m_hasDefault;
        let m_default = ""; //@@@: private String m_default = "";
        let m_isNullable = null; //@@@: private bool m_isNullable;
        let m_maxLength = 0; //@@@: private int m_maxLength = 0;

        self.getKey = function() { //@@@: public String getKey()
            return m_key; //@@@: return m_key;
        }; //@@@: }

        self.setKey = function(rhs) { //@@@: public void setKey(String rhs)
            m_key = rhs; //@@@: m_key = rhs;
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getColumnType = function() { //@@@: public csDataType getColumnType()
            return m_columnType; //@@@: return m_columnType;
        }; //@@@: }

        self.setColumnType = function(rhs) { //@@@: public void setColumnType(csDataType rhs)
            m_columnType = rhs; //@@@: m_columnType = rhs;
        }; //@@@: }

        self.getValue = function() { //@@@: public String getValue()
            return m_value; //@@@: return m_value;
        }; //@@@: }

        self.setValue = function(rhs) { //@@@: public void setValue(String rhs)
            m_value = rhs; //@@@: m_value = rhs;
        }; //@@@: }

        self.getPosition = function() { //@@@: public int getPosition()
            return m_position; //@@@: return m_position;
        }; //@@@: }

        self.setPosition = function(rhs) { //@@@: public void setPosition(int rhs)
            m_position = rhs; //@@@: m_position = rhs;
        }; //@@@: }

        self.getHasDefault = function() { //@@@: public bool getHasDefault()
            return m_hasDefault; //@@@: return m_hasDefault;
        }; //@@@: }

        self.setHasDefault = function(rhs) { //@@@: public void setHasDefault(bool rhs)
            m_hasDefault = rhs; //@@@: m_hasDefault = rhs;
        }; //@@@: }

        self.getDefaultValue = function() { //@@@: public String getDefaultValue()
            return m_default; //@@@: return m_default;
        }; //@@@: }

        self.setDefaultValue = function(rhs) { //@@@: public void setDefaultValue(String rhs)
            m_default = rhs; //@@@: m_default = rhs;
        }; //@@@: }

        self.getIsNullable = function() { //@@@: public bool getIsNullable()
            return m_isNullable; //@@@: return m_isNullable;
        }; //@@@: }

        self.setIsNullable = function(rhs) { //@@@: public void setIsNullable(bool rhs)
            m_isNullable = rhs; //@@@: m_isNullable = rhs;
        }; //@@@: }

        self.getMaxLength = function() { //@@@: public int getMaxLength()
            return m_maxLength; //@@@: return m_maxLength;
        }; //@@@: }

        self.setMaxLength = function(rhs) { //@@@: public void setMaxLength(int rhs)
            m_maxLength = rhs; //@@@: m_maxLength = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            m_columnType = cDatabaseGlobals.getDataTypeFromAdo(xDoc.getNodeProperty(nodeObj, "TypeColumn").getValueInt(eTypes.eInteger)); //@@@: m_columnType = cDatabaseGlobals.getDataTypeFromAdo(xDoc.getNodeProperty(nodeObj, "TypeColumn").getValueInt(eTypes.eInteger));
            m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText); //@@@: m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            m_position = xDoc.getNodeProperty(nodeObj, "Position").getValueInt(eTypes.eInteger); //@@@: m_position = xDoc.getNodeProperty(nodeObj, "Position").getValueInt(eTypes.eInteger);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_maxLength = xDoc.getNodeProperty(nodeObj, "MaxLength").getValueInt(eTypes.eInteger); //@@@: m_maxLength = xDoc.getNodeProperty(nodeObj, "MaxLength").getValueInt(eTypes.eInteger);
            m_key = xDoc.getNodeProperty(nodeObj, "Key").getValueString(eTypes.eText); //@@@: m_key = xDoc.getNodeProperty(nodeObj, "Key").getValueString(eTypes.eText);
            m_isNullable = xDoc.getNodeProperty(nodeObj, "IsNullable").getValueBool(eTypes.eBoolean); //@@@: m_isNullable = xDoc.getNodeProperty(nodeObj, "IsNullable").getValueBool(eTypes.eBoolean);
            m_hasDefault = xDoc.getNodeProperty(nodeObj, "HasDefault").getValueBool(eTypes.eBoolean); //@@@: m_hasDefault = xDoc.getNodeProperty(nodeObj, "HasDefault").getValueBool(eTypes.eBoolean);
            m_default = xDoc.getNodeProperty(nodeObj, "Default").getValueString(eTypes.eText); //@@@: m_default = xDoc.getNodeProperty(nodeObj, "Default").getValueString(eTypes.eText);

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_key); //@@@: xProperty.setName(m_key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key"); //@@@: xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key); //@@@: xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Position"); //@@@: xProperty.setName("Position");
            xProperty.setValue(eTypes.eInteger, m_position); //@@@: xProperty.setValue(eTypes.eInteger, m_position);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeColumn"); //@@@: xProperty.setName("TypeColumn");
            xProperty.setValue(eTypes.eInteger, cDatabaseGlobals.getAdoTypeFromDataType(m_columnType)); //@@@: xProperty.setValue(eTypes.eInteger, cDatabaseGlobals.getAdoTypeFromDataType(m_columnType));
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Value"); //@@@: xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value); //@@@: xProperty.setValue(eTypes.eText, m_value);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("MaxLength"); //@@@: xProperty.setName("MaxLength");
            xProperty.setValue(eTypes.eInteger, m_maxLength); //@@@: xProperty.setValue(eTypes.eInteger, m_maxLength);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsNullable"); //@@@: xProperty.setName("IsNullable");
            xProperty.setValue(eTypes.eBoolean, m_isNullable); //@@@: xProperty.setValue(eTypes.eBoolean, m_isNullable);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasDefault"); //@@@: xProperty.setName("HasDefault");
            xProperty.setValue(eTypes.eBoolean, m_hasDefault); //@@@: xProperty.setValue(eTypes.eBoolean, m_hasDefault);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Default"); //@@@: xProperty.setName("Default");
            xProperty.setValue(eTypes.eText, m_default); //@@@: xProperty.setValue(eTypes.eText, m_default);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
