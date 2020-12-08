(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportChartSerie = function() {

        const self = {}; //@@@: public class cReportChartSerie

        const C_MODULE = "cReportChartSerie"; //@@@: private const String C_MODULE = "cReportChartSerie";

        let m_valueFieldName = ""; //@@@: private String m_valueFieldName = "";
        let m_labelFieldName = ""; //@@@: private String m_labelFieldName = "";
        let m_color = csColors.ALICEBLUE; //@@@: private csColors m_color = csColors.ALICEBLUE;
        let m_valueIndex = 0; //@@@: private int m_valueIndex = 0;
        let m_labelIndex = 0; //@@@: private int m_labelIndex = 0;

        self.getValueFieldName = function() { //@@@: public String getValueFieldName()
            return m_valueFieldName; //@@@: return m_valueFieldName;
        }; //@@@: }

        self.setValueFieldName = function(rhs) { //@@@: public void setValueFieldName(String rhs)
            m_valueFieldName = rhs; //@@@: m_valueFieldName = rhs;
        }; //@@@: }

        self.getLabelFieldName = function() { //@@@: public String getLabelFieldName()
            return m_labelFieldName; //@@@: return m_labelFieldName;
        }; //@@@: }

        self.setLabelFieldName = function(rhs) { //@@@: public void setLabelFieldName(String rhs)
            m_labelFieldName = rhs; //@@@: m_labelFieldName = rhs;
        }; //@@@: }

        self.getColor = function() { //@@@: public csColors getColor()
            return m_color; //@@@: return m_color;
        }; //@@@: }

        self.setColor = function(value) { //@@@: public void setColor(csColors value)
            m_color = value; //@@@: m_color = value;
        }; //@@@: }

        self.getValueIndex = function() { //@@@: public int getValueIndex()
            return m_valueIndex; //@@@: return m_valueIndex;
        }; //@@@: }

        self.setValueIndex = function(rhs) { //@@@: public void setValueIndex(int rhs)
            m_valueIndex = rhs; //@@@: m_valueIndex = rhs;
        }; //@@@: }

        self.getLabelIndex = function() { //@@@: public int getLabelIndex()
            return m_labelIndex; //@@@: return m_labelIndex;
        }; //@@@: }

        self.setLabelIndex = function(rhs) { //@@@: public void setLabelIndex(int rhs)
            m_labelIndex = rhs; //@@@: m_labelIndex = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj, index) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj, int index)
            try { m_valueFieldName = xDoc.getNodeProperty(nodeObj, "ValueFieldName").getValueString(eTypes.eText); } //@@@: try { m_valueFieldName = xDoc.getNodeProperty(nodeObj, "ValueFieldName").getValueString(eTypes.eText); }
            catch  (ex) { } //@@@: catch { }
            try { m_labelFieldName = xDoc.getNodeProperty(nodeObj, "LabelFieldName").getValueString(eTypes.eText); } //@@@: try { m_labelFieldName = xDoc.getNodeProperty(nodeObj, "LabelFieldName").getValueString(eTypes.eText); }
            catch  (ex) { } //@@@: catch { }
            try { m_color = xDoc.getNodeProperty(nodeObj, "Color").getValueInt(eTypes.eLong); } //@@@: try { m_color = (csColors)xDoc.getNodeProperty(nodeObj, "Color").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather, index) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather, int index)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Serie_" + index.ToString()); //@@@: xProperty.setName("Serie_" + index.ToString());
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("ValueFieldName"); //@@@: xProperty.setName("ValueFieldName");
            xProperty.setValue(eTypes.eText, m_valueFieldName); //@@@: xProperty.setValue(eTypes.eText, m_valueFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("LabelFieldName"); //@@@: xProperty.setName("LabelFieldName");
            xProperty.setValue(eTypes.eText, m_labelFieldName); //@@@: xProperty.setValue(eTypes.eText, m_labelFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Color"); //@@@: xProperty.setName("Color");
            xProperty.setValue(eTypes.eLong, m_color); //@@@: xProperty.setValue(eTypes.eLong, m_color);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
