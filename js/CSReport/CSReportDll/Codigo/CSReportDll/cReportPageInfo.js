(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportPageInfo = function() {

        const self = {}; //@@@: public class cReportPageInfo

        const C_MODULE = "cReportPageInfo"; //@@@: private const String C_MODULE = "cReportPageInfo";

        let m_aspect = null; //@@@: private cReportAspect m_aspect;
        let m_sectionLine = null; //@@@: private cReportSectionLine m_sectionLine;
        let m_name = ""; //@@@: private String m_name = "";
        let m_tag = ""; //@@@: private String m_tag = "";
        let m_fieldType = 0; //@@@: private int m_fieldType = 0;

        const cReportPageInfo = function() { //@@@: public cReportPageInfo()
            m_aspect = new cReportAspect(); //@@@: m_aspect = new cReportAspect();
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getTag = function() { //@@@: public String getTag()
            return m_tag; //@@@: return m_tag;
        }; //@@@: }

        self.setTag = function(rhs) { //@@@: public void setTag(String rhs)
            m_tag = rhs; //@@@: m_tag = rhs;
        }; //@@@: }

        self.getAspect = function() { //@@@: public cReportAspect getAspect()
            return m_aspect; //@@@: return m_aspect;
        }; //@@@: }

        self.setAspect = function(rhs) { //@@@: public void setAspect(cReportAspect rhs)
            m_aspect = rhs; //@@@: m_aspect = rhs;
        }; //@@@: }

        self.getSectionLine = function() { //@@@: public cReportSectionLine getSectionLine()
            return m_sectionLine; //@@@: return m_sectionLine;
        }; //@@@: }

        self.setSectionLine = function(rhs) { //@@@: public void setSectionLine(cReportSectionLine rhs)
            m_sectionLine = rhs; //@@@: m_sectionLine = rhs;
        }; //@@@: }

        self.getFieldType = function() { //@@@: public int getFieldType()
            return m_fieldType; //@@@: return m_fieldType;
        }; //@@@: }

        self.setFieldType = function(rhs) { //@@@: public void setFieldType(int rhs)
            m_fieldType = rhs; //@@@: m_fieldType = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            let nodeObjAspect = null; //@@@: XmlNode nodeObjAspect = null;
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger); //@@@: m_fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger);

            nodeObjAspect = nodeObj; //@@@: nodeObjAspect = nodeObj;
            if (!m_aspect.load(xDoc, nodeObjAspect)) { //@@@: if (!m_aspect.load(xDoc, nodeObjAspect))
                return false; //@@@: return false;
            } //@@@: }
            else  { //@@@: else
                return true; //@@@: return true;
            } //@@@: }
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("PageInfo"); //@@@: xProperty.setName("PageInfo");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldType"); //@@@: xProperty.setName("FieldType");
            xProperty.setValue(eTypes.eInteger, m_fieldType); //@@@: xProperty.setValue(eTypes.eInteger, m_fieldType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return m_aspect.save(xDoc, nodeObj); //@@@: return m_aspect.save(xDoc, nodeObj);
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
