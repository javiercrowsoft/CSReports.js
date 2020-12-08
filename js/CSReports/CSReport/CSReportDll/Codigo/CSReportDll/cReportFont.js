(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportFont = function() {

        const self = {}; //@@@: public class cReportFont

        let m_foreColor = csColors.C_COLOR_BLACK; //@@@: private int m_foreColor = (int)csColors.C_COLOR_BLACK;
        let m_size = 8; //@@@: private float m_size = 8;
        let m_name = "Tahoma"; //@@@: private String m_name = "Tahoma";
        let m_underline = null; //@@@: private bool m_underline;
        let m_bold = null; //@@@: private bool m_bold;
        let m_italic = null; //@@@: private bool m_italic;
        let m_strike = null; //@@@: private bool m_strike;

        self.getForeColor = function() { //@@@: public int getForeColor()
            return m_foreColor; //@@@: return m_foreColor;
        }; //@@@: }

        self.setForeColor = function(rhs) { //@@@: public void setForeColor(int rhs)
            m_foreColor = rhs; //@@@: m_foreColor = rhs;
        }; //@@@: }

        self.getSize = function() { //@@@: public float getSize()
            return m_size; //@@@: return m_size;
        }; //@@@: }

        self.setSize = function(rhs) { //@@@: public void setSize(float rhs)
            m_size = rhs; //@@@: m_size = rhs;
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getUnderline = function() { //@@@: public bool getUnderline()
            return m_underline; //@@@: return m_underline;
        }; //@@@: }

		self.setUnderline = function(rhs) { //@@@: public void setUnderline(bool rhs)
            m_underline = rhs; //@@@: m_underline = rhs;
        }; //@@@: }

        self.getBold = function() { //@@@: public bool getBold()
            return m_bold; //@@@: return m_bold;
        }; //@@@: }

        self.setBold = function(rhs) { //@@@: public void setBold(bool rhs)
            m_bold = rhs; //@@@: m_bold = rhs;
        }; //@@@: }

        self.getItalic = function() { //@@@: public bool getItalic()
            return m_italic; //@@@: return m_italic;
        }; //@@@: }

        self.setItalic = function(rhs) { //@@@: public void setItalic(bool rhs)
            m_italic = rhs; //@@@: m_italic = rhs;
        }; //@@@: }

        self.getStrike = function() { //@@@: public bool getStrike()
            return m_strike; //@@@: return m_strike;
        }; //@@@: }

        self.setStrike = function(rhs) { //@@@: public void setStrike(bool rhs)
            m_strike = rhs; //@@@: m_strike = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Font"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Font");
            m_bold = xDoc.getNodeProperty(nodeObj, "Bold").getValueBool(eTypes.eBoolean); //@@@: m_bold = xDoc.getNodeProperty(nodeObj, "Bold").getValueBool(eTypes.eBoolean);
            m_foreColor = xDoc.getNodeProperty(nodeObj, "ForeColor").getValueInt(eTypes.eLong); //@@@: m_foreColor = xDoc.getNodeProperty(nodeObj, "ForeColor").getValueInt(eTypes.eLong);
            m_italic = xDoc.getNodeProperty(nodeObj, "Italic").getValueBool(eTypes.eBoolean); //@@@: m_italic = xDoc.getNodeProperty(nodeObj, "Italic").getValueBool(eTypes.eBoolean);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_size = xDoc.getNodeProperty(nodeObj, "Size").getValueInt(eTypes.eInteger); //@@@: m_size = xDoc.getNodeProperty(nodeObj, "Size").getValueInt(eTypes.eInteger);
            m_underline = xDoc.getNodeProperty(nodeObj, "UnderLine").getValueBool(eTypes.eBoolean); //@@@: m_underline = xDoc.getNodeProperty(nodeObj, "UnderLine").getValueBool(eTypes.eBoolean);
            m_strike = xDoc.getNodeProperty(nodeObj, "Strike").getValueBool(eTypes.eBoolean); //@@@: m_strike = xDoc.getNodeProperty(nodeObj, "Strike").getValueBool(eTypes.eBoolean);

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Font"); //@@@: xProperty.setName("Font");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("ForeColor"); //@@@: xProperty.setName("ForeColor");
            xProperty.setValue(eTypes.eLong, m_foreColor); //@@@: xProperty.setValue(eTypes.eLong, m_foreColor);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Bold"); //@@@: xProperty.setName("Bold");
            xProperty.setValue(eTypes.eBoolean, m_bold); //@@@: xProperty.setValue(eTypes.eBoolean, m_bold);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Italic"); //@@@: xProperty.setName("Italic");
            xProperty.setValue(eTypes.eBoolean, m_italic); //@@@: xProperty.setValue(eTypes.eBoolean, m_italic);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Size"); //@@@: xProperty.setName("Size");
            xProperty.setValue(eTypes.eInteger, m_size); //@@@: xProperty.setValue(eTypes.eInteger, m_size);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("UnderLine"); //@@@: xProperty.setName("UnderLine");
            xProperty.setValue(eTypes.eBoolean, m_underline); //@@@: xProperty.setValue(eTypes.eBoolean, m_underline);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Strike"); //@@@: xProperty.setName("Strike");
            xProperty.setValue(eTypes.eBoolean, m_strike); //@@@: xProperty.setValue(eTypes.eBoolean, m_strike);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
