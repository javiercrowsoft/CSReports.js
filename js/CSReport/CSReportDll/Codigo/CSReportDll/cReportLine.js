(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportLine = function() {

        const self = {}; //@@@: public class cReportLine

        let m_aspect = new cReportAspect(); //@@@: private cReportAspect m_aspect = new cReportAspect();

        self.getAspect = function() { //@@@: public cReportAspect getAspect()
            return m_aspect; //@@@: return m_aspect;
        }; //@@@: }

        self.setAspect = function(rhs) { //@@@: public void setAspect(cReportAspect rhs)
            m_aspect = rhs; //@@@: m_aspect = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Line"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Line");
            return m_aspect.load(xDoc, nodeObj); //@@@: return m_aspect.load(xDoc, nodeObj);
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Line"); //@@@: xProperty.setName("Line");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            return m_aspect.save(xDoc, nodeObj); //@@@: return m_aspect.save(xDoc, nodeObj);
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
