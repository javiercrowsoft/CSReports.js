(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportPageInfo = function() {

        const self = {};

        const C_MODULE: string= "cReportPageInfo";

        let m_aspect: cReportAspect = null;
        let m_sectionLine: cReportSectionLine = null;
        let m_name: string= "";
        let m_tag: string= "";
        let m_fieldType: number= 0;

        const cReportPageInfo = function() {
            m_aspect =  globalObject.CSReportDll.createCReportAspect();
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getTag = function() {
            return m_tag;
        };

        self.setTag = function(rhs) {
            m_tag = rhs;
        };

        self.getAspect = function() {
            return m_aspect;
        };

        self.setAspect = function(rhs) {
            m_aspect = rhs;
        };

        self.getSectionLine = function() {
            return m_sectionLine;
        };

        self.setSectionLine = function(rhs) {
            m_sectionLine = rhs;
        };

        self.getFieldType = function() {
            return m_fieldType;
        };

        self.setFieldType = function(rhs) {
            m_fieldType = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            let nodeObjAspect: XmlNode= null;
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger);

            nodeObjAspect = nodeObj;
            if (!m_aspect.load(xDoc, nodeObjAspect)) {
                return false;
            }
            else  {
                return true;
            }
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty= null;
            let nodeObj: XmlNode= null;

            xProperty =  globalObject.CSReportDll.createCSXml.cXmlProperty();

            xProperty.setName("PageInfo");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldType");
            xProperty.setValue(eTypes.eInteger, m_fieldType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return m_aspect.save(xDoc, nodeObj);
        };

        return self;

    }

}(globalObject));
