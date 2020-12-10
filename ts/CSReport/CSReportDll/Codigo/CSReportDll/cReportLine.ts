(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportLine = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportLine = {};

        let m_aspect: cReportAspect = new cReportAspect();

        self.getAspect = function() {
            return m_aspect;
        };

        self.setAspect = function(rhs) {
            m_aspect = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Line");
            return m_aspect.load(xDoc, nodeObj);
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

            xProperty.setName("Line");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            return m_aspect.save(xDoc, nodeObj);
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportLine {

    getAspect: () => cReportAspect;
    setAspect: (cReportAspect) => void;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
  }
}
