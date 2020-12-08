(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportGroup = function() {

        const self = {};
        const C_HEADER: string= "H";
        const C_FOOTER: string= "F";

        let m_header: cReportSection = null;
        let m_footer: cReportSection = null;
        let m_index: number= 0;

        let m_name: string= "";

        let m_oderType: csRptGrpOrderType = null;
        let m_comparisonType: csRptGrpComparisonType = null;

        // to print in a new page when the group change
        //
        let m_printInNewPage: boolean = null;

        // to reprint group headers in every new page
        //
        let m_rePrintInNewPage: boolean = null;
        let m_grandTotalGroup: boolean = null;
        let m_fieldName: string= "";
        let m_key: string= "";

        self.getHeader = function() {
            return m_header;
        };

        self.setHeader = function(rhs) {
            m_header = rhs;
        };

        self.getFooter = function() {
            return m_footer;
        };

        self.setFooter = function(rhs) {
            m_footer = rhs;
        };

        self.getIndex = function() {
            return m_index;
        };

        self.setIndex = function(rhs) {
            m_index = rhs;
        };

        self.getOderType = function() {
            return m_oderType;
        };

        self.setOderType = function(rhs) {
            m_oderType = rhs;
        };

        self.getComparisonType = function() {
            return m_comparisonType;
        };

        self.setComparisonType = function(rhs) {
            m_comparisonType = rhs;
        };

        self.getPrintInNewPage = function() {
            return m_printInNewPage;
        };

        self.setPrintInNewPage = function(rhs) {
            m_printInNewPage = rhs;
        };

        self.getRePrintInNewPage = function() {
            return m_rePrintInNewPage;
        };

        self.setRePrintInNewPage = function(rhs) {
            m_rePrintInNewPage = rhs;
        };

        self.getGrandTotalGroup = function() {
            return m_grandTotalGroup;
        };

        self.setGrandTotalGroup = function(rhs) {
            m_grandTotalGroup = rhs;
        };

        self.getFieldName = function() {
            return m_fieldName;
        };

        self.setFieldName = function(rhs) {
            m_fieldName = rhs;
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getKey = function() {
            return m_key;
        };

        self.setKey = function(rhs) {
            m_key = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            m_index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);

            m_comparisonType = xDoc.getNodeProperty(nodeObj, "ComparisonType").getValueInt(eTypes.eInteger);
            m_fieldName = xDoc.getNodeProperty(nodeObj, "FieldName").getValueString(eTypes.eText);
            m_oderType = xDoc.getNodeProperty(nodeObj, "OderType").getValueInt(eTypes.eInteger);
            m_printInNewPage = xDoc.getNodeProperty(nodeObj, "PrintInNewPage").getValueBool(eTypes.eBoolean);
            m_rePrintInNewPage = xDoc.getNodeProperty(nodeObj, "RePrintInNewPage").getValueBool(eTypes.eBoolean);
            m_grandTotalGroup = xDoc.getNodeProperty(nodeObj, "GrandTotalGroup").getValueBool(eTypes.eBoolean);

            fixName();

            let nodeObjAux: XmlNode= null;

            nodeObjAux = nodeObj;
            nodeObjAux = xDoc.getNodeFromNode(nodeObj, C_HEADER);
            nodeObjAux = xDoc.getNodeChild(nodeObjAux);
            if (!m_header.load(xDoc, nodeObjAux))  {
                return false; 
            }

            m_header.setName(m_name);

            nodeObjAux = nodeObj;
            nodeObjAux = xDoc.getNodeFromNode(nodeObj, C_FOOTER);
            nodeObjAux = xDoc.getNodeChild(nodeObjAux);
            if (!m_footer.load(xDoc, nodeObjAux))  {
                return false; 
            }

            m_footer.setName(m_name);

            return true;
        };

        self.fixName = function() {
            if (m_name.Length === 0
                ||cUtil.subString(m_name.ToLower(), 0, 5) === "group" 
                || cUtil.subString(m_name.ToLower(), 0, 5) === "grupo" 
                || cUtil.subString(m_name.ToLower(), 0, 3) === "gh_" 
                || cUtil.subString(m_name.ToLower(), 0, 3) === "gf_" 
                || cUtil.subString(m_name.ToLower(), 0, 2) === "g_" 
                ) {
                m_name = "G_" + m_index;
            }

        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty= null;
            let nodeObj: XmlNode= null;

            xProperty =  globalObject.CSReportDll.createCSXml.cXmlProperty();

            xProperty.setName(m_name);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice");

            xProperty.setValue(eTypes.eInteger, m_index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ComparisonType");
            xProperty.setValue(eTypes.eInteger, m_comparisonType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldName");
            xProperty.setValue(eTypes.eText, m_fieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("OderType");
            xProperty.setValue(eTypes.eInteger, m_oderType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PrintInNewPage");
            xProperty.setValue(eTypes.eBoolean, m_printInNewPage);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("RePrintInNewPage");
            xProperty.setValue(eTypes.eBoolean, m_rePrintInNewPage);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GrandTotalGroup");
            xProperty.setValue(eTypes.eBoolean, m_grandTotalGroup);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            let nodeObjAux: XmlNode= null;
            nodeObjAux = nodeObj;
            xProperty.setName(C_HEADER);
            nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty);
            m_header.save(xDoc, nodeObjAux);

            nodeObjAux = nodeObj;
            xProperty.setName(C_FOOTER);
            nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty);
            m_footer.save(xDoc, nodeObjAux);

            return true;

        };

        return self;

    }

}(globalObject));
