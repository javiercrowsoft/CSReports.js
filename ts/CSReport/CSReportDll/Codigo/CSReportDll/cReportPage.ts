(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportPage = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportPage = {};

        const C_MODULE: string = "cReportPage";

        const C_NODERPTHEADER: string = "Header";
        const C_NODERPTHEADERLINE: string = "HeaderLine";
        const C_NODERPTDETAIL: string = "Detail";
        const C_NODERPTDETAILLINE: string = "DetailLine";
        const C_NODERPTFOOTER: string = "Footer";
        const C_NODERPTFOOTERLINE: string = "FooterLine";

        let m_detail: cReportPageFields = new cReportPageFields();
        let m_header: cReportPageFields = new cReportPageFields();
        let m_footer: cReportPageFields = new cReportPageFields();
        let m_pageNumber: number = 0;

        let m_headerBottom: number = 0;
        let m_footerTop: number = 0;

        self.getHeader = function() {
            return m_header;
        };

        self.setHeader = function(rhs) {
            m_header = rhs;
        };

        self.getDetail = function() {
            return m_detail;
        };

        self.setDetail = function(rhs) {
            m_detail = rhs;
        };

        self.getFooter = function() {
            return m_footer;
        };

        self.setFooter = function(rhs) {
            m_footer = rhs;
        };

        self.getPageNumber = function() {
            return m_pageNumber;
        };

        self.setPageNumber = function(rhs) {
            m_pageNumber = rhs;
        };

        self.getHeaderBottom = function() {
            return m_headerBottom;
        };

        self.setHeaderBottom = function(rhs) {
            m_headerBottom = rhs;
        };

        self.getFooterTop = function() {
            return m_footerTop;
        };

        self.setFooterTop = function(rhs) {
            m_footerTop = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            let nodeObjSecLn: XmlNode = null;

            m_pageNumber = xDoc.getNodeProperty(nodeObj, "PageNumber").getValueInt(eTypes.eInteger);
            m_headerBottom = xDoc.getNodeProperty(nodeObj, "HeaderBottom").getValueInt(eTypes.eLong);
            m_footerTop = xDoc.getNodeProperty(nodeObj, "FooterTop").getValueInt(eTypes.eLong);

            m_header.clear();
            m_detail.clear();
            m_footer.clear();

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTHEADER);
            if (xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    if (!m_header.add(null).load(xDoc, nodeObjSecLn))  {
                        return false; 
                    }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                }
            }

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTDETAIL);
            if (xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    if (!m_detail.add(null).load(xDoc, nodeObjSecLn))  {
                        return false; 
                    }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                }
            }

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTFOOTER);
            if (xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    if (!m_footer.add(null).load(xDoc, nodeObjSecLn))  {
                        return false; 
                    }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                }
            }

            return true;

        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

            xProperty.setName("Page");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xDoc.setNodeText(nodeObj, "Página " + m_pageNumber);

            xProperty.setName("PageNumber");
            xProperty.setValue(eTypes.eInteger, m_pageNumber);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HeaderBottom");
            xProperty.setValue(eTypes.eLong, m_headerBottom);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FooterTop");
            xProperty.setValue(eTypes.eLong, m_footerTop);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            let pageFld: cReportPageField = null;
            let nodeAux: XmlNode = null;

            xProperty.setName(C_NODERPTHEADER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_header.count(); _i++) {
                pageFld = m_header.item(_i);
                pageFld.save(xDoc, nodeAux);
            }

            xProperty.setName(C_NODERPTDETAIL);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_detail.count(); _i++) {
                pageFld = m_detail.item(_i);
                pageFld.save(xDoc, nodeAux);
            }

            xProperty.setName(C_NODERPTFOOTER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_footer.count(); _i++) {
                pageFld = m_footer.item(_i);
                pageFld.save(xDoc, nodeAux);
            }

            return true;
        };

        self.saveForWeb = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

            xProperty.setName("Page");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xDoc.setNodeText(nodeObj, "Página " + m_pageNumber);

            let pageFld: cReportPageField = null;
            let nodeAux: XmlNode = null;
            let top: number = 0;
            let addLine: boolean = false;

            let nHeader: number = 0;

            xProperty.setName(C_NODERPTHEADER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_header.count(); _i++) {
                pageFld = m_header.item(_i);
                addLine = false;

                if (pageFld.getTop() === 0) {
                    if (top !== pageFld.getInfo().getAspect().getTop()) {
                        top = pageFld.getInfo().getAspect().getTop();
                        addLine = true;
                        nHeader = nHeader + 1;
                    }
                }
                else {
                    if (top !== pageFld.getTop()) {
                        top = pageFld.getTop();
                        addLine = true;
                        nHeader = nHeader + 1;
                    }
                }

                if (addLine) {
                    xProperty.setName(C_NODERPTHEADERLINE + nHeader.ToString());
                    xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                }

                pageFld.saveForWeb(xDoc, nodeAux);
            }

            xProperty.setName(C_NODERPTDETAIL);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_detail.count(); _i++) {
                pageFld = m_detail.item(_i);

                addLine = false;

                if (pageFld.getTop() === 0) {
                    if (top !== pageFld.getInfo().getAspect().getTop()) {
                        top = pageFld.getInfo().getAspect().getTop();
                        addLine = true;
                    }
                }
                else {
                    if (top !== pageFld.getTop()) {
                        top = pageFld.getTop();
                        addLine = true;
                    }
                }

                if (addLine) {
                    xProperty.setName(C_NODERPTDETAILLINE);
                    xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                }

                pageFld.saveForWeb(xDoc, nodeAux);
            }

            xProperty.setName(C_NODERPTFOOTER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_footer.count(); _i++) {
                pageFld = m_footer.item(_i);
                addLine = false;

                if (pageFld.getTop() === 0) {
                    if (top !== pageFld.getInfo().getAspect().getTop()) {
                        top = pageFld.getInfo().getAspect().getTop();
                        addLine = true;
                    }
                }
                else {
                    if (top !== pageFld.getTop()) {
                        top = pageFld.getTop();
                        addLine = true;
                    }
                }

                if (addLine) {
                    xProperty.setName(C_NODERPTFOOTERLINE);
                    xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                }

                pageFld.saveForWeb(xDoc, nodeAux);
            }

            return true;
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportPage {

    getHeader: () => cReportPageFields;
    setHeader: (cReportPageFields) => void;
    getDetail: () => cReportPageFields;
    setDetail: (cReportPageFields) => void;
    getFooter: () => cReportPageFields;
    setFooter: (cReportPageFields) => void;
    getPageNumber: () => int;
    setPageNumber: (int) => void;
    getHeaderBottom: () => float;
    setHeaderBottom: (float) => void;
    getFooterTop: () => float;
    setFooterTop: (float) => void;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
    saveForWeb: (CSXml.cXml, XmlNode) => bool;
  }
}
