(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportGroup = function() {

        const self = {}; //@@@: public class cReportGroup
        const C_HEADER = "H"; //@@@: private const String C_HEADER = "H";
        const C_FOOTER = "F"; //@@@: private const String C_FOOTER = "F";

        let m_header = null; //@@@: private cReportSection m_header;
        let m_footer = null; //@@@: private cReportSection m_footer;
        let m_index = 0; //@@@: private int m_index = 0;

        let m_name = ""; //@@@: private String m_name = "";

        let m_oderType = null; //@@@: private csRptGrpOrderType m_oderType;
        let m_comparisonType = null; //@@@: private csRptGrpComparisonType m_comparisonType;

        // to print in a new page when the group change
        //
        let m_printInNewPage = null; //@@@: private bool m_printInNewPage;

        // to reprint group headers in every new page
        //
        let m_rePrintInNewPage = null; //@@@: private bool m_rePrintInNewPage;
        let m_grandTotalGroup = null; //@@@: private bool m_grandTotalGroup;
        let m_fieldName = ""; //@@@: private String m_fieldName = "";
        let m_key = ""; //@@@: private String m_key = "";

        self.getHeader = function() { //@@@: public cReportSection getHeader()
            return m_header; //@@@: return m_header;
        }; //@@@: }

        self.setHeader = function(rhs) { //@@@: public void setHeader(cReportSection rhs)
            m_header = rhs; //@@@: m_header = rhs;
        }; //@@@: }

        self.getFooter = function() { //@@@: public cReportSection getFooter()
            return m_footer; //@@@: return m_footer;
        }; //@@@: }

        self.setFooter = function(rhs) { //@@@: public void setFooter(cReportSection rhs)
            m_footer = rhs; //@@@: m_footer = rhs;
        }; //@@@: }

        self.getIndex = function() { //@@@: public int getIndex()
            return m_index; //@@@: return m_index;
        }; //@@@: }

        self.setIndex = function(rhs) { //@@@: public void setIndex(int rhs)
            m_index = rhs; //@@@: m_index = rhs;
        }; //@@@: }

        self.getOderType = function() { //@@@: public csRptGrpOrderType getOderType()
            return m_oderType; //@@@: return m_oderType;
        }; //@@@: }

        self.setOderType = function(rhs) { //@@@: public void setOderType(csRptGrpOrderType rhs)
            m_oderType = rhs; //@@@: m_oderType = rhs;
        }; //@@@: }

        self.getComparisonType = function() { //@@@: public csRptGrpComparisonType getComparisonType()
            return m_comparisonType; //@@@: return m_comparisonType;
        }; //@@@: }

        self.setComparisonType = function(rhs) { //@@@: public void setComparisonType(csRptGrpComparisonType rhs)
            m_comparisonType = rhs; //@@@: m_comparisonType = rhs;
        }; //@@@: }

        self.getPrintInNewPage = function() { //@@@: public bool getPrintInNewPage()
            return m_printInNewPage; //@@@: return m_printInNewPage;
        }; //@@@: }

        self.setPrintInNewPage = function(rhs) { //@@@: public void setPrintInNewPage(bool rhs)
            m_printInNewPage = rhs; //@@@: m_printInNewPage = rhs;
        }; //@@@: }

        self.getRePrintInNewPage = function() { //@@@: public bool getRePrintInNewPage()
            return m_rePrintInNewPage; //@@@: return m_rePrintInNewPage;
        }; //@@@: }

        self.setRePrintInNewPage = function(rhs) { //@@@: public void setRePrintInNewPage(bool rhs)
            m_rePrintInNewPage = rhs; //@@@: m_rePrintInNewPage = rhs;
        }; //@@@: }

        self.getGrandTotalGroup = function() { //@@@: public bool getGrandTotalGroup()
            return m_grandTotalGroup; //@@@: return m_grandTotalGroup;
        }; //@@@: }

        self.setGrandTotalGroup = function(rhs) { //@@@: public void setGrandTotalGroup(bool rhs)
            m_grandTotalGroup = rhs; //@@@: m_grandTotalGroup = rhs;
        }; //@@@: }

        self.getFieldName = function() { //@@@: public String getFieldName()
            return m_fieldName; //@@@: return m_fieldName;
        }; //@@@: }

        self.setFieldName = function(rhs) { //@@@: public void setFieldName(String rhs)
            m_fieldName = rhs; //@@@: m_fieldName = rhs;
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getKey = function() { //@@@: public String getKey()
            return m_key; //@@@: return m_key;
        }; //@@@: }

        self.setKey = function(rhs) { //@@@: public void setKey(String rhs)
            m_key = rhs; //@@@: m_key = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger); //@@@: m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);

            m_comparisonType = xDoc.getNodeProperty(nodeObj, "ComparisonType").getValueInt(eTypes.eInteger); //@@@: m_comparisonType = (csRptGrpComparisonType)xDoc.getNodeProperty(nodeObj, "ComparisonType").getValueInt(eTypes.eInteger);
            m_fieldName = xDoc.getNodeProperty(nodeObj, "FieldName").getValueString(eTypes.eText); //@@@: m_fieldName = xDoc.getNodeProperty(nodeObj, "FieldName").getValueString(eTypes.eText);
            m_oderType = xDoc.getNodeProperty(nodeObj, "OderType").getValueInt(eTypes.eInteger); //@@@: m_oderType = (csRptGrpOrderType)xDoc.getNodeProperty(nodeObj, "OderType").getValueInt(eTypes.eInteger);
            m_printInNewPage = xDoc.getNodeProperty(nodeObj, "PrintInNewPage").getValueBool(eTypes.eBoolean); //@@@: m_printInNewPage = xDoc.getNodeProperty(nodeObj, "PrintInNewPage").getValueBool(eTypes.eBoolean);
            m_rePrintInNewPage = xDoc.getNodeProperty(nodeObj, "RePrintInNewPage").getValueBool(eTypes.eBoolean); //@@@: m_rePrintInNewPage = xDoc.getNodeProperty(nodeObj, "RePrintInNewPage").getValueBool(eTypes.eBoolean);
            m_grandTotalGroup = xDoc.getNodeProperty(nodeObj, "GrandTotalGroup").getValueBool(eTypes.eBoolean); //@@@: m_grandTotalGroup = xDoc.getNodeProperty(nodeObj, "GrandTotalGroup").getValueBool(eTypes.eBoolean);

            fixName(); //@@@: fixName();

            let nodeObjAux = null; //@@@: XmlNode nodeObjAux = null;

            nodeObjAux = nodeObj; //@@@: nodeObjAux = nodeObj;
            nodeObjAux = xDoc.getNodeFromNode(nodeObj, C_HEADER); //@@@: nodeObjAux = xDoc.getNodeFromNode(nodeObj, C_HEADER);
            nodeObjAux = xDoc.getNodeChild(nodeObjAux); //@@@: nodeObjAux = xDoc.getNodeChild(nodeObjAux);
            if (!m_header.load(xDoc, nodeObjAux))  { //@@@: if (!m_header.load(xDoc, nodeObjAux))
                return false;  //@@@: return false;
            } //@@@: }

            m_header.setName(m_name); //@@@: m_header.setName(m_name);

            nodeObjAux = nodeObj; //@@@: nodeObjAux = nodeObj;
            nodeObjAux = xDoc.getNodeFromNode(nodeObj, C_FOOTER); //@@@: nodeObjAux = xDoc.getNodeFromNode(nodeObj, C_FOOTER);
            nodeObjAux = xDoc.getNodeChild(nodeObjAux); //@@@: nodeObjAux = xDoc.getNodeChild(nodeObjAux);
            if (!m_footer.load(xDoc, nodeObjAux))  { //@@@: if (!m_footer.load(xDoc, nodeObjAux))
                return false;  //@@@: return false;
            } //@@@: }

            m_footer.setName(m_name); //@@@: m_footer.setName(m_name);

            return true; //@@@: return true;
        }; //@@@: }

        self.fixName = function() { //@@@: public void fixName()
            if (m_name.Length === 0 //@@@: if (m_name.Length == 0
                ||cUtil.subString(m_name.ToLower(), 0, 5) === "group"  //@@@: ||cUtil.subString(m_name.ToLower(), 0, 5) == "group"
                || cUtil.subString(m_name.ToLower(), 0, 5) === "grupo"  //@@@: || cUtil.subString(m_name.ToLower(), 0, 5) == "grupo"
                || cUtil.subString(m_name.ToLower(), 0, 3) === "gh_"  //@@@: || cUtil.subString(m_name.ToLower(), 0, 3) == "gh_"
                || cUtil.subString(m_name.ToLower(), 0, 3) === "gf_"  //@@@: || cUtil.subString(m_name.ToLower(), 0, 3) == "gf_"
                || cUtil.subString(m_name.ToLower(), 0, 2) === "g_"  //@@@: || cUtil.subString(m_name.ToLower(), 0, 2) == "g_"
                ) { //@@@: )
                m_name = "G_" + m_index; //@@@: m_name = "G_" + m_index;
            } //@@@: }

        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_name); //@@@: xProperty.setName(m_name);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key"); //@@@: xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key); //@@@: xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice"); //@@@: xProperty.setName("Indice");

            xProperty.setValue(eTypes.eInteger, m_index); //@@@: xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ComparisonType"); //@@@: xProperty.setName("ComparisonType");
            xProperty.setValue(eTypes.eInteger, m_comparisonType); //@@@: xProperty.setValue(eTypes.eInteger, m_comparisonType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldName"); //@@@: xProperty.setName("FieldName");
            xProperty.setValue(eTypes.eText, m_fieldName); //@@@: xProperty.setValue(eTypes.eText, m_fieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("OderType"); //@@@: xProperty.setName("OderType");
            xProperty.setValue(eTypes.eInteger, m_oderType); //@@@: xProperty.setValue(eTypes.eInteger, m_oderType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PrintInNewPage"); //@@@: xProperty.setName("PrintInNewPage");
            xProperty.setValue(eTypes.eBoolean, m_printInNewPage); //@@@: xProperty.setValue(eTypes.eBoolean, m_printInNewPage);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("RePrintInNewPage"); //@@@: xProperty.setName("RePrintInNewPage");
            xProperty.setValue(eTypes.eBoolean, m_rePrintInNewPage); //@@@: xProperty.setValue(eTypes.eBoolean, m_rePrintInNewPage);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GrandTotalGroup"); //@@@: xProperty.setName("GrandTotalGroup");
            xProperty.setValue(eTypes.eBoolean, m_grandTotalGroup); //@@@: xProperty.setValue(eTypes.eBoolean, m_grandTotalGroup);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            let nodeObjAux = null; //@@@: XmlNode nodeObjAux = null;
            nodeObjAux = nodeObj; //@@@: nodeObjAux = nodeObj;
            xProperty.setName(C_HEADER); //@@@: xProperty.setName(C_HEADER);
            nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty); //@@@: nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty);
            m_header.save(xDoc, nodeObjAux); //@@@: m_header.save(xDoc, nodeObjAux);

            nodeObjAux = nodeObj; //@@@: nodeObjAux = nodeObj;
            xProperty.setName(C_FOOTER); //@@@: xProperty.setName(C_FOOTER);
            nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty); //@@@: nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty);
            m_footer.save(xDoc, nodeObjAux); //@@@: m_footer.save(xDoc, nodeObjAux);

            return true; //@@@: return true;

        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
