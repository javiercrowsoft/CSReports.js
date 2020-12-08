(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportField = function() {

        const self = {}; //@@@: public class cReportField

        let m_name = ""; //@@@: private String m_name = "";
        let m_index = 0; //@@@: private int m_index = 0;
        let m_fieldType = 0; //@@@: private int m_fieldType = 0;

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getIndex = function() { //@@@: public int getIndex()
            return m_index; //@@@: return m_index;
        }; //@@@: }

        self.setIndex = function(rhs) { //@@@: public void setIndex(int rhs)
            m_index = rhs; //@@@: m_index = rhs;
        }; //@@@: }

        self.getFieldType = function() { //@@@: public int getFieldType()
            return m_fieldType; //@@@: return m_fieldType;
        }; //@@@: }

        self.setFieldType = function(rhs) { //@@@: public void setFieldType(int rhs)
            m_fieldType = rhs; //@@@: m_fieldType = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Field"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Field");
            m_index = xDoc.getNodeProperty(nodeObj, "Index").getValueInt(eTypes.eInteger); //@@@: m_index = xDoc.getNodeProperty(nodeObj, "Index").getValueInt(eTypes.eInteger);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger); //@@@: m_fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger);
            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field"); //@@@: xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Index"); //@@@: xProperty.setName("Index");
            xProperty.setValue(eTypes.eInteger, m_index); //@@@: xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldType"); //@@@: xProperty.setName("FieldType");
            xProperty.setValue(eTypes.eInteger, m_fieldType); //@@@: xProperty.setValue(eTypes.eInteger, m_fieldType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
