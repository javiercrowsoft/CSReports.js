namespace CSReportEngine {

    import eTypes = CSKernelClient.eTypes;
    import XmlNode = CSXml.XmlNode;

    export class cReportPage {

        private NODE_RPT_HEADER: string = "Header";
        private NODE_RPT_HEADER_LINE: string = "HeaderLine";
        private NODE_RPT_DETAIL: string = "Detail";
        private NODE_RPT_DETAIL_LINE: string = "DetailLine";
        private NODE_RPT_FOOTER: string = "Footer";
        private NODE_RPT_FOOTER_LINE: string = "FooterLine";

        private detail: cReportPageFields = new cReportPageFields();
        private header: cReportPageFields = new cReportPageFields();
        private footer: cReportPageFields = new cReportPageFields();
        private pageNumber: number = 0;

        private headerBottom: number = 0;
        private footerTop: number = 0;

        public getHeader() {
            return this.header;
        }

        public setHeader(rhs: cReportPageFields) {
            this.header = rhs;
        }

        public getDetail() {
            return this.detail;
        }

        public setDetail(rhs: cReportPageFields) {
            this.detail = rhs;
        }

        public getFooter() {
            return this.footer;
        }

        public setFooter(rhs: cReportPageFields) {
            this.footer = rhs;
        }

        public getPageNumber() {
            return this.pageNumber;
        }

        public setPageNumber(rhs: number) {
            this.pageNumber = rhs;
        }

        public getHeaderBottom() {
            return this.headerBottom;
        }

        public setHeaderBottom(rhs: number) {
            this.headerBottom = rhs;
        }

        public getFooterTop() {
            return this.footerTop;
        }

        public setFooterTop(rhs: number) {
            this.footerTop = rhs;
        }

        public copy(from: any) {
            this.pageNumber = from.pageNumber;
            this.headerBottom = from.headerBottom;
            this.footerTop = from.footerTop;

            this.header.clear();
            this.detail.clear();
            this.footer.clear();

            for(let i = 0; i < from.header.values.length; i++) {
                if(!this.header.add(null).copy(from.header.values[i])) {
                    return false;
                }
            }
            for(let i = 0; i < from.detail.values.length; i++) {
                if(!this.detail.add(null).copy(from.detail.values[i])) {
                    return false;
                }
            }
            for(let i = 0; i < from.footer.values.length; i++) {
                if(!this.footer.add(null).copy(from.footer.values[i])) {
                    return false;
                }
            }
            return true;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            let nodeObjSecLn: XmlNode = null;

            this.pageNumber = xDoc.getNodeProperty(nodeObj, "PageNumber").getValueInt(eTypes.eInteger);
            this.headerBottom = xDoc.getNodeProperty(nodeObj, "HeaderBottom").getValueInt(eTypes.eLong);
            this.footerTop = xDoc.getNodeProperty(nodeObj, "FooterTop").getValueInt(eTypes.eLong);

            this.header.clear();
            this.detail.clear();
            this.footer.clear();

            nodeObj = xDoc.getNodeFromNode(nodeObj, this.NODE_RPT_HEADER);
            if(xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    if(!this.header.add(null).load(xDoc, nodeObjSecLn)) {
                        return false;
                    }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                }
            }

            nodeObj = xDoc.getNodeFromNode(nodeObj, this.NODE_RPT_DETAIL);
            if(xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    if(!this.detail.add(null).load(xDoc, nodeObjSecLn)) {
                        return false;
                    }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                }
            }

            nodeObj = xDoc.getNodeFromNode(nodeObj, this.NODE_RPT_FOOTER);
            if(xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    if(!this.footer.add(null).load(xDoc, nodeObjSecLn)) {
                        return false;
                    }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                }
            }

            return true;

        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Page");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xDoc.setNodeText(nodeObj, "Página " + this.pageNumber);

            xProperty.setName("PageNumber");
            xProperty.setValue(eTypes.eInteger, this.pageNumber);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HeaderBottom");
            xProperty.setValue(eTypes.eLong, this.headerBottom);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FooterTop");
            xProperty.setValue(eTypes.eLong, this.footerTop);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            let pageFld: cReportPageField = null;
            let nodeAux: XmlNode = null;

            xProperty.setName(this.NODE_RPT_HEADER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(let _i = 0; _i < this.header.count(); _i++) {
                pageFld = this.header.item(_i);
                pageFld.save(xDoc, nodeAux);
            }

            xProperty.setName(this.NODE_RPT_DETAIL);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(let _i = 0; _i < this.detail.count(); _i++) {
                pageFld = this.detail.item(_i);
                pageFld.save(xDoc, nodeAux);
            }

            xProperty.setName(this.NODE_RPT_FOOTER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(let _i = 0; _i < this.footer.count(); _i++) {
                pageFld = this.footer.item(_i);
                pageFld.save(xDoc, nodeAux);
            }

            return true;
        }

        public saveForWeb(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Page");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xDoc.setNodeText(nodeObj, "Página " + this.pageNumber);

            let pageFld: cReportPageField = null;
            let nodeAux: XmlNode = null;
            let top: number = 0;
            let addLine: boolean = false;

            let nHeader: number = 0;

            xProperty.setName(this.NODE_RPT_HEADER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(let _i = 0; _i < this.header.count(); _i++) {
                pageFld = this.header.item(_i);
                addLine = false;

                if(pageFld.getTop() === 0) {
                    if(top !== pageFld.getInfo().getAspect().getTop()) {
                        top = pageFld.getInfo().getAspect().getTop();
                        addLine = true;
                        nHeader = nHeader + 1;
                    }
                }
                else {
                    if(top !== pageFld.getTop()) {
                        top = pageFld.getTop();
                        addLine = true;
                        nHeader = nHeader + 1;
                    }
                }

                if(addLine) {
                    xProperty.setName(this.NODE_RPT_HEADER_LINE + nHeader.toString());
                    xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                }

                pageFld.saveForWeb(xDoc, nodeAux);
            }

            xProperty.setName(this.NODE_RPT_DETAIL);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(let _i = 0; _i < this.detail.count(); _i++) {
                pageFld = this.detail.item(_i);

                addLine = false;

                if(pageFld.getTop() === 0) {
                    if(top !== pageFld.getInfo().getAspect().getTop()) {
                        top = pageFld.getInfo().getAspect().getTop();
                        addLine = true;
                    }
                }
                else {
                    if(top !== pageFld.getTop()) {
                        top = pageFld.getTop();
                        addLine = true;
                    }
                }

                if(addLine) {
                    xProperty.setName(this.NODE_RPT_DETAIL_LINE);
                    xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                }

                pageFld.saveForWeb(xDoc, nodeAux);
            }

            xProperty.setName(this.NODE_RPT_FOOTER);
            xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(let _i = 0; _i < this.footer.count(); _i++) {
                pageFld = this.footer.item(_i);
                addLine = false;

                if(pageFld.getTop() === 0) {
                    if(top !== pageFld.getInfo().getAspect().getTop()) {
                        top = pageFld.getInfo().getAspect().getTop();
                        addLine = true;
                    }
                }
                else {
                    if(top !== pageFld.getTop()) {
                        top = pageFld.getTop();
                        addLine = true;
                    }
                }

                if(addLine) {
                    xProperty.setName(this.NODE_RPT_FOOTER_LINE);
                    xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                }

                pageFld.saveForWeb(xDoc, nodeAux);
            }

            return true;
        }
    }
}
