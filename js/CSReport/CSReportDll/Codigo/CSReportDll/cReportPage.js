(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportPage = function() {

        const self = {}; //@@@: public class cReportPage

        const C_MODULE = "cReportPage"; //@@@: private const String C_MODULE = "cReportPage";

        const C_NODERPTHEADER = "Header"; //@@@: private const String C_NODERPTHEADER = "Header";
        const C_NODERPTHEADERLINE = "HeaderLine"; //@@@: private const String C_NODERPTHEADERLINE = "HeaderLine";
        const C_NODERPTDETAIL = "Detail"; //@@@: private const String C_NODERPTDETAIL = "Detail";
        const C_NODERPTDETAILLINE = "DetailLine"; //@@@: private const String C_NODERPTDETAILLINE = "DetailLine";
        const C_NODERPTFOOTER = "Footer"; //@@@: private const String C_NODERPTFOOTER = "Footer";
        const C_NODERPTFOOTERLINE = "FooterLine"; //@@@: private const String C_NODERPTFOOTERLINE = "FooterLine";

        let m_detail = new cReportPageFields(); //@@@: private cReportPageFields m_detail = new cReportPageFields();
        let m_header = new cReportPageFields(); //@@@: private cReportPageFields m_header = new cReportPageFields();
        let m_footer = new cReportPageFields(); //@@@: private cReportPageFields m_footer = new cReportPageFields();
        let m_pageNumber = 0; //@@@: private int m_pageNumber = 0;

        let m_headerBottom = 0; //@@@: private float m_headerBottom = 0;
        let m_footerTop = 0; //@@@: private float m_footerTop = 0;

        self.getHeader = function() { //@@@: public cReportPageFields getHeader()
            return m_header; //@@@: return m_header;
        }; //@@@: }

        self.setHeader = function(rhs) { //@@@: public void setHeader(cReportPageFields rhs)
            m_header = rhs; //@@@: m_header = rhs;
        }; //@@@: }

        self.getDetail = function() { //@@@: public cReportPageFields getDetail()
            return m_detail; //@@@: return m_detail;
        }; //@@@: }

        self.setDetail = function(rhs) { //@@@: public void setDetail(cReportPageFields rhs)
            m_detail = rhs; //@@@: m_detail = rhs;
        }; //@@@: }

        self.getFooter = function() { //@@@: public cReportPageFields getFooter()
            return m_footer; //@@@: return m_footer;
        }; //@@@: }

        self.setFooter = function(rhs) { //@@@: public void setFooter(cReportPageFields rhs)
            m_footer = rhs; //@@@: m_footer = rhs;
        }; //@@@: }

        self.getPageNumber = function() { //@@@: public int getPageNumber()
            return m_pageNumber; //@@@: return m_pageNumber;
        }; //@@@: }

        self.setPageNumber = function(rhs) { //@@@: public void setPageNumber(int rhs)
            m_pageNumber = rhs; //@@@: m_pageNumber = rhs;
        }; //@@@: }

        self.getHeaderBottom = function() { //@@@: public float getHeaderBottom()
            return m_headerBottom; //@@@: return m_headerBottom;
        }; //@@@: }

        self.setHeaderBottom = function(rhs) { //@@@: public void setHeaderBottom(float rhs)
            m_headerBottom = rhs; //@@@: m_headerBottom = rhs;
        }; //@@@: }

        self.getFooterTop = function() { //@@@: public float getFooterTop()
            return m_footerTop; //@@@: return m_footerTop;
        }; //@@@: }

        self.setFooterTop = function(rhs) { //@@@: public void setFooterTop(float rhs)
            m_footerTop = rhs; //@@@: m_footerTop = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            let nodeObjSecLn = null; //@@@: XmlNode nodeObjSecLn = null;

            m_pageNumber = xDoc.getNodeProperty(nodeObj, "PageNumber").getValueInt(eTypes.eInteger); //@@@: m_pageNumber = xDoc.getNodeProperty(nodeObj, "PageNumber").getValueInt(eTypes.eInteger);
            m_headerBottom = xDoc.getNodeProperty(nodeObj, "HeaderBottom").getValueInt(eTypes.eLong); //@@@: m_headerBottom = xDoc.getNodeProperty(nodeObj, "HeaderBottom").getValueInt(eTypes.eLong);
            m_footerTop = xDoc.getNodeProperty(nodeObj, "FooterTop").getValueInt(eTypes.eLong); //@@@: m_footerTop = xDoc.getNodeProperty(nodeObj, "FooterTop").getValueInt(eTypes.eLong);

            m_header.clear(); //@@@: m_header.clear();
            m_detail.clear(); //@@@: m_detail.clear();
            m_footer.clear(); //@@@: m_footer.clear();

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTHEADER); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTHEADER);
            if (xDoc.nodeHasChild(nodeObj)) { //@@@: if (xDoc.nodeHasChild(nodeObj))
                nodeObjSecLn = xDoc.getNodeChild(nodeObj); //@@@: nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) { //@@@: while (nodeObjSecLn != null)
                    if (!m_header.add(null).load(xDoc, nodeObjSecLn))  { //@@@: if (!m_header.add(null).load(xDoc, nodeObjSecLn))
                        return false;  //@@@: return false;
                    } //@@@: }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn); //@@@: nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                } //@@@: }
            } //@@@: }

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTDETAIL); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTDETAIL);
            if (xDoc.nodeHasChild(nodeObj)) { //@@@: if (xDoc.nodeHasChild(nodeObj))
                nodeObjSecLn = xDoc.getNodeChild(nodeObj); //@@@: nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) { //@@@: while (nodeObjSecLn != null)
                    if (!m_detail.add(null).load(xDoc, nodeObjSecLn))  { //@@@: if (!m_detail.add(null).load(xDoc, nodeObjSecLn))
                        return false;  //@@@: return false;
                    } //@@@: }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn); //@@@: nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                } //@@@: }
            } //@@@: }

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTFOOTER); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTFOOTER);
            if (xDoc.nodeHasChild(nodeObj)) { //@@@: if (xDoc.nodeHasChild(nodeObj))
                nodeObjSecLn = xDoc.getNodeChild(nodeObj); //@@@: nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) { //@@@: while (nodeObjSecLn != null)
                    if (!m_footer.add(null).load(xDoc, nodeObjSecLn))  { //@@@: if (!m_footer.add(null).load(xDoc, nodeObjSecLn))
                        return false;  //@@@: return false;
                    } //@@@: }
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn); //@@@: nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;

        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Page"); //@@@: xProperty.setName("Page");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xDoc.setNodeText(nodeObj, "Página " + m_pageNumber); //@@@: xDoc.setNodeText(nodeObj, "Página " + m_pageNumber);

            xProperty.setName("PageNumber"); //@@@: xProperty.setName("PageNumber");
            xProperty.setValue(eTypes.eInteger, m_pageNumber); //@@@: xProperty.setValue(eTypes.eInteger, m_pageNumber);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HeaderBottom"); //@@@: xProperty.setName("HeaderBottom");
            xProperty.setValue(eTypes.eLong, m_headerBottom); //@@@: xProperty.setValue(eTypes.eLong, m_headerBottom);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FooterTop"); //@@@: xProperty.setName("FooterTop");
            xProperty.setValue(eTypes.eLong, m_footerTop); //@@@: xProperty.setValue(eTypes.eLong, m_footerTop);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            let pageFld = null; //@@@: cReportPageField pageFld = null;
            let nodeAux = null; //@@@: XmlNode nodeAux = null;

            xProperty.setName(C_NODERPTHEADER); //@@@: xProperty.setName(C_NODERPTHEADER);
            xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_header.count(); _i++) { //@@@: for (int _i = 0; _i < m_header.count(); _i++)
                pageFld = m_header.item(_i); //@@@: pageFld = m_header.item(_i);
                pageFld.save(xDoc, nodeAux); //@@@: pageFld.save(xDoc, nodeAux);
            } //@@@: }

            xProperty.setName(C_NODERPTDETAIL); //@@@: xProperty.setName(C_NODERPTDETAIL);
            xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_detail.count(); _i++) { //@@@: for (int _i = 0; _i < m_detail.count(); _i++)
                pageFld = m_detail.item(_i); //@@@: pageFld = m_detail.item(_i);
                pageFld.save(xDoc, nodeAux); //@@@: pageFld.save(xDoc, nodeAux);
            } //@@@: }

            xProperty.setName(C_NODERPTFOOTER); //@@@: xProperty.setName(C_NODERPTFOOTER);
            xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_footer.count(); _i++) { //@@@: for (int _i = 0; _i < m_footer.count(); _i++)
                pageFld = m_footer.item(_i); //@@@: pageFld = m_footer.item(_i);
                pageFld.save(xDoc, nodeAux); //@@@: pageFld.save(xDoc, nodeAux);
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.saveForWeb = function(xDoc, nodeFather) { //@@@: internal bool saveForWeb(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Page"); //@@@: xProperty.setName("Page");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xDoc.setNodeText(nodeObj, "Página " + m_pageNumber); //@@@: xDoc.setNodeText(nodeObj, "Página " + m_pageNumber);

            let pageFld = null; //@@@: cReportPageField pageFld = null;
            let nodeAux = null; //@@@: XmlNode nodeAux = null;
            let top = 0; //@@@: float top = 0;
            let addLine = false; //@@@: bool addLine = false;

            let nHeader = 0; //@@@: int nHeader = 0;

            xProperty.setName(C_NODERPTHEADER); //@@@: xProperty.setName(C_NODERPTHEADER);
            xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_header.count(); _i++) { //@@@: for (int _i = 0; _i < m_header.count(); _i++)
                pageFld = m_header.item(_i); //@@@: pageFld = m_header.item(_i);
                addLine = false; //@@@: addLine = false;

                if (pageFld.getTop() === 0) { //@@@: if (pageFld.getTop() == 0)
                    if (top !== pageFld.getInfo().getAspect().getTop()) { //@@@: if (top != pageFld.getInfo().getAspect().getTop())
                        top = pageFld.getInfo().getAspect().getTop(); //@@@: top = pageFld.getInfo().getAspect().getTop();
                        addLine = true; //@@@: addLine = true;
                        nHeader = nHeader + 1; //@@@: nHeader = nHeader + 1;
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    if (top !== pageFld.getTop()) { //@@@: if (top != pageFld.getTop())
                        top = pageFld.getTop(); //@@@: top = pageFld.getTop();
                        addLine = true; //@@@: addLine = true;
                        nHeader = nHeader + 1; //@@@: nHeader = nHeader + 1;
                    } //@@@: }
                } //@@@: }

                if (addLine) { //@@@: if (addLine)
                    xProperty.setName(C_NODERPTHEADERLINE + nHeader.ToString()); //@@@: xProperty.setName(C_NODERPTHEADERLINE + nHeader.ToString());
                    xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                } //@@@: }

                pageFld.saveForWeb(xDoc, nodeAux); //@@@: pageFld.saveForWeb(xDoc, nodeAux);
            } //@@@: }

            xProperty.setName(C_NODERPTDETAIL); //@@@: xProperty.setName(C_NODERPTDETAIL);
            xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_detail.count(); _i++) { //@@@: for (int _i = 0; _i < m_detail.count(); _i++)
                pageFld = m_detail.item(_i); //@@@: pageFld = m_detail.item(_i);

                addLine = false; //@@@: addLine = false;

                if (pageFld.getTop() === 0) { //@@@: if (pageFld.getTop() == 0)
                    if (top !== pageFld.getInfo().getAspect().getTop()) { //@@@: if (top != pageFld.getInfo().getAspect().getTop())
                        top = pageFld.getInfo().getAspect().getTop(); //@@@: top = pageFld.getInfo().getAspect().getTop();
                        addLine = true; //@@@: addLine = true;
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    if (top !== pageFld.getTop()) { //@@@: if (top != pageFld.getTop())
                        top = pageFld.getTop(); //@@@: top = pageFld.getTop();
                        addLine = true; //@@@: addLine = true;
                    } //@@@: }
                } //@@@: }

                if (addLine) { //@@@: if (addLine)
                    xProperty.setName(C_NODERPTDETAILLINE); //@@@: xProperty.setName(C_NODERPTDETAILLINE);
                    xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                } //@@@: }

                pageFld.saveForWeb(xDoc, nodeAux); //@@@: pageFld.saveForWeb(xDoc, nodeAux);
            } //@@@: }

            xProperty.setName(C_NODERPTFOOTER); //@@@: xProperty.setName(C_NODERPTFOOTER);
            xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
            nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);

            for(var _i = 0; _i < m_footer.count(); _i++) { //@@@: for (int _i = 0; _i < m_footer.count(); _i++)
                pageFld = m_footer.item(_i); //@@@: pageFld = m_footer.item(_i);
                addLine = false; //@@@: addLine = false;

                if (pageFld.getTop() === 0) { //@@@: if (pageFld.getTop() == 0)
                    if (top !== pageFld.getInfo().getAspect().getTop()) { //@@@: if (top != pageFld.getInfo().getAspect().getTop())
                        top = pageFld.getInfo().getAspect().getTop(); //@@@: top = pageFld.getInfo().getAspect().getTop();
                        addLine = true; //@@@: addLine = true;
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    if (top !== pageFld.getTop()) { //@@@: if (top != pageFld.getTop())
                        top = pageFld.getTop(); //@@@: top = pageFld.getTop();
                        addLine = true; //@@@: addLine = true;
                    } //@@@: }
                } //@@@: }

                if (addLine) { //@@@: if (addLine)
                    xProperty.setName(C_NODERPTFOOTERLINE); //@@@: xProperty.setName(C_NODERPTFOOTERLINE);
                    xProperty.setValue(eTypes.eText, ""); //@@@: xProperty.setValue(eTypes.eText, "");
                    nodeAux = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeAux = xDoc.addNodeToNode(nodeObj, xProperty);
                } //@@@: }

                pageFld.saveForWeb(xDoc, nodeAux); //@@@: pageFld.saveForWeb(xDoc, nodeAux);
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
