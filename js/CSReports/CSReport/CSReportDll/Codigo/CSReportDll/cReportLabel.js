(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportLabel = function() {

        const self = {}; //@@@: public class cReportLabel

        let m_aspect = null; //@@@: private cReportAspect m_aspect;
        let m_text = ""; //@@@: private String m_text = "";
        let m_canGrow = null; //@@@: private bool m_canGrow;

        const cReportLabel = function() { //@@@: public cReportLabel()
            m_aspect = new cReportAspect(); //@@@: m_aspect = new cReportAspect();
        }; //@@@: }

        self.getAspect = function() { //@@@: public cReportAspect getAspect()
            return m_aspect; //@@@: return m_aspect;
        }; //@@@: }

        self.setAspect = function(rhs) { //@@@: public void setAspect(cReportAspect rhs)
            m_aspect = rhs; //@@@: m_aspect = rhs;
        }; //@@@: }

        self.getText = function() { //@@@: public String getText()
            return m_text; //@@@: return m_text;
        }; //@@@: }

        self.setText = function(rhs) { //@@@: public void setText(String rhs)
            m_text = rhs; //@@@: m_text = rhs;
        }; //@@@: }

        self.getCanGrow = function() { //@@@: public bool getCanGrow()
            return m_canGrow; //@@@: return m_canGrow;
        }; //@@@: }

        self.setCanGrow = function(rhs) { //@@@: public void setCanGrow(bool rhs)
            m_canGrow = rhs; //@@@: m_canGrow = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Label"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Label");
            m_text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText); //@@@: m_text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText);
            return m_aspect.load(xDoc, nodeObj); //@@@: return m_aspect.load(xDoc, nodeObj);
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Label"); //@@@: xProperty.setName("Label");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Text"); //@@@: xProperty.setName("Text");
            xProperty.setValue(eTypes.eText, m_text); //@@@: xProperty.setValue(eTypes.eText, m_text);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CanGrow"); //@@@: xProperty.setName("CanGrow");
            xProperty.setValue(eTypes.eBoolean, m_canGrow); //@@@: xProperty.setValue(eTypes.eBoolean, m_canGrow);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return m_aspect.save(xDoc, nodeObj); //@@@: return m_aspect.save(xDoc, nodeObj);
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
