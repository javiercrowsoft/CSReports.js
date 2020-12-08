(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportPageID = function() {

        const self = {}; //@@@: public class cReportPageID

        const C_MODULE = "cReportPageID"; //@@@: private const String C_MODULE = "cReportPageID";

        let m_value = ""; //@@@: private String m_value = "";

        self.getValue = function() { //@@@: public String getValue()
            return m_value; //@@@: return m_value;
        }; //@@@: }

        self.setValue = function(rhs) { //@@@: public void setValue(String rhs)
            m_value = rhs; //@@@: m_value = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText); //@@@: m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("PageID"); //@@@: xProperty.setName("PageID");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value"); //@@@: xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value); //@@@: xProperty.setValue(eTypes.eText, m_value);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
