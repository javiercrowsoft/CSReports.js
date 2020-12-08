(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportPage = function() {

        const self = {};

        const C_MODULE = "cReportPage";

        const C_NODERPTHEADER = "Header";
        const C_NODERPTHEADERLINE = "HeaderLine";
        const C_NODERPTDETAIL = "Detail";
        const C_NODERPTDETAILLINE = "DetailLine";
        const C_NODERPTFOOTER = "Footer";
        const C_NODERPTFOOTERLINE = "FooterLine";

        let m_detail = new cReportPageFields();
        let m_header = new cReportPageFields();
        let m_footer = new cReportPageFields();
        let m_pageNumber = 0;

        let m_headerBottom = 0;
        let m_footerTop = 0;

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
            let nodeObjSecLn = null;

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
            let xProperty = null;
            let nodeObj = null;

            xProperty = new CSXml.cXmlProperty();

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

            let pageFld = null;
            let nodeAux = null;

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
            let xProperty = null;
            let nodeObj = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Page");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xDoc.setNodeText(nodeObj, "Página " + m_pageNumber);

            let pageFld = null;
            let nodeAux = null;
            let top = 0;
            let addLine = false;

            let nHeader = 0;

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

    }

}(globalObject));
