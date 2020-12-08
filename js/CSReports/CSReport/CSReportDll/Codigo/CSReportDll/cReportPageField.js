(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportPageField = function() {

        const self = {}; //@@@: public class cReportPageField

        const C_MODULE = "cReportPageField"; //@@@: private const String C_MODULE = "cReportPageField";

        let m_value = ""; //@@@: private String m_value = "";
        let m_info = null; //@@@: private cReportPageInfo m_info;
        let m_visible = null; //@@@: private bool m_visible;
        let m_objectID = null; //@@@: private cReportPageID m_objectID;
        let m_indexLine = 0; //@@@: private int m_indexLine = 0;
        let m_top = 0; //@@@: private float m_top = 0;
        let m_height = 0; //@@@: private float m_height = 0;
        let m_width = 0; //@@@: private float m_width = 0;
        let m_image = null; //@@@: private Image m_image = null;

        self.getValue = function() { //@@@: public String getValue()
            return m_value; //@@@: return m_value;
        }; //@@@: }

        self.setValue = function(rhs) { //@@@: public void setValue(String rhs)
            m_value = rhs; //@@@: m_value = rhs;
        }; //@@@: }

        self.getInfo = function() { //@@@: public cReportPageInfo getInfo()
            return m_info; //@@@: return m_info;
        }; //@@@: }

        self.setInfo = function(rhs) { //@@@: public void setInfo(cReportPageInfo rhs)
            m_info = rhs; //@@@: m_info = rhs;
        }; //@@@: }

        self.getVisible = function() { //@@@: public bool getVisible()
            return m_visible; //@@@: return m_visible;
        }; //@@@: }

        self.setVisible = function(rhs) { //@@@: public void setVisible(bool rhs)
            m_visible = rhs; //@@@: m_visible = rhs;
        }; //@@@: }

        self.getObjectID = function() { //@@@: public cReportPageID getObjectID()
            return m_objectID; //@@@: return m_objectID;
        }; //@@@: }

        self.setObjectID = function(rhs) { //@@@: public void setObjectID(cReportPageID rhs)
            m_objectID = rhs; //@@@: m_objectID = rhs;
        }; //@@@: }

        self.getTop = function() { //@@@: public float getTop()
            return m_top; //@@@: return m_top;
        }; //@@@: }

        self.setTop = function(rhs) { //@@@: public void setTop(float rhs)
            m_top = rhs; //@@@: m_top = rhs;
        }; //@@@: }

        self.getHeight = function() { //@@@: public float getHeight()
            return m_height; //@@@: return m_height;
        }; //@@@: }

        self.setHeight = function(rhs) { //@@@: public void setHeight(float rhs)
            m_height = rhs; //@@@: m_height = rhs;
        }; //@@@: }

        self.getWidth = function() { //@@@: public float getWidth()
            return m_width; //@@@: return m_width;
        }; //@@@: }

        self.setWidth = function(rhs) { //@@@: public void setWidth(float rhs)
            m_width = rhs; //@@@: m_width = rhs;
        }; //@@@: }

        self.getImage = function() { //@@@: public Image getImage()
            return m_image; //@@@: return m_image;
        }; //@@@: }

        self.setImage = function(rhs) { //@@@: public void setImage(Image rhs)
            m_image = rhs; //@@@: m_image = rhs;
        }; //@@@: }

        self.getIndexLine = function() { //@@@: public int getIndexLine()
            return m_indexLine; //@@@: return m_indexLine;
        }; //@@@: }

        self.setIndexLine = function(rhs) { //@@@: public void setIndexLine(int rhs)
            m_indexLine = rhs; //@@@: m_indexLine = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            m_objectID = new cReportPageID(); //@@@: m_objectID = new cReportPageID();
            m_info = new cReportPageInfo(); //@@@: m_info = new cReportPageInfo();

            m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText); //@@@: m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            m_visible = xDoc.getNodeProperty(nodeObj, "Visible").getValueBool(eTypes.eBoolean); //@@@: m_visible = xDoc.getNodeProperty(nodeObj, "Visible").getValueBool(eTypes.eBoolean);
            m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong); //@@@: m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong);
            m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong); //@@@: m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong);
            m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong); //@@@: m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong);

            let nodeObjAux = null; //@@@: XmlNode nodeObjAux = null;
            nodeObjAux = nodeObj; //@@@: nodeObjAux = nodeObj;
            if (!m_objectID.load(xDoc, nodeObjAux))  { //@@@: if (!m_objectID.load(xDoc, nodeObjAux))
                return false;  //@@@: return false;
            } //@@@: }
            nodeObjAux = nodeObj; //@@@: nodeObjAux = nodeObj;
            if (!m_info.load(xDoc, nodeObjAux))  { //@@@: if (!m_info.load(xDoc, nodeObjAux))
                return false;  //@@@: return false;
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field"); //@@@: xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value"); //@@@: xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value); //@@@: xProperty.setValue(eTypes.eText, m_value);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Visible"); //@@@: xProperty.setName("Visible");
            xProperty.setValue(eTypes.eBoolean, m_visible); //@@@: xProperty.setValue(eTypes.eBoolean, m_visible);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top"); //@@@: xProperty.setName("Top");
            xProperty.setValue(eTypes.eLong, m_top); //@@@: xProperty.setValue(eTypes.eLong, m_top);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Height"); //@@@: xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, m_height); //@@@: xProperty.setValue(eTypes.eLong, m_height);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width"); //@@@: xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, m_width); //@@@: xProperty.setValue(eTypes.eLong, m_width);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            if (m_objectID !== null) { //@@@: if (m_objectID != null)
                if (!m_objectID.save(xDoc, nodeObj)) { //@@@: if (!m_objectID.save(xDoc, nodeObj))
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
            if (!m_info.save(xDoc, nodeObj))  { //@@@: if (!m_info.save(xDoc, nodeObj))
                return false;  //@@@: return false;
            } //@@@: }

            return true;   //@@@: return true;
        }; //@@@: }

        self.saveForWeb = function(xDoc, nodeFather) { //@@@: public bool saveForWeb(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field"); //@@@: xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value"); //@@@: xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value); //@@@: xProperty.setValue(eTypes.eText, m_value);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);
            xDoc.setNodeText(nodeObj, m_value); //@@@: xDoc.setNodeText(nodeObj, m_value);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
