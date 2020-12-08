(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportPageField = function() {

        const self = {};

        const C_MODULE = "cReportPageField";

        let m_value = "";
        let m_info = null;
        let m_visible = null;
        let m_objectID = null;
        let m_indexLine = 0;
        let m_top = 0;
        let m_height = 0;
        let m_width = 0;
        let m_image = null;

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        self.getInfo = function() {
            return m_info;
        };

        self.setInfo = function(rhs) {
            m_info = rhs;
        };

        self.getVisible = function() {
            return m_visible;
        };

        self.setVisible = function(rhs) {
            m_visible = rhs;
        };

        self.getObjectID = function() {
            return m_objectID;
        };

        self.setObjectID = function(rhs) {
            m_objectID = rhs;
        };

        self.getTop = function() {
            return m_top;
        };

        self.setTop = function(rhs) {
            m_top = rhs;
        };

        self.getHeight = function() {
            return m_height;
        };

        self.setHeight = function(rhs) {
            m_height = rhs;
        };

        self.getWidth = function() {
            return m_width;
        };

        self.setWidth = function(rhs) {
            m_width = rhs;
        };

        self.getImage = function() {
            return m_image;
        };

        self.setImage = function(rhs) {
            m_image = rhs;
        };

        self.getIndexLine = function() {
            return m_indexLine;
        };

        self.setIndexLine = function(rhs) {
            m_indexLine = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            m_objectID = new cReportPageID();
            m_info = new cReportPageInfo();

            m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            m_visible = xDoc.getNodeProperty(nodeObj, "Visible").getValueBool(eTypes.eBoolean);
            m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong);
            m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong);
            m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong);

            let nodeObjAux = null;
            nodeObjAux = nodeObj;
            if (!m_objectID.load(xDoc, nodeObjAux))  {
                return false; 
            }
            nodeObjAux = nodeObj;
            if (!m_info.load(xDoc, nodeObjAux))  {
                return false; 
            }

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Visible");
            xProperty.setValue(eTypes.eBoolean, m_visible);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top");
            xProperty.setValue(eTypes.eLong, m_top);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, m_height);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, m_width);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            if (m_objectID !== null) {
                if (!m_objectID.save(xDoc, nodeObj)) {
                    return false;
                }
            }
            if (!m_info.save(xDoc, nodeObj))  {
                return false; 
            }

            return true;  
        };

        self.saveForWeb = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);
            xDoc.setNodeText(nodeObj, m_value);

            return true;
        };

        return self;

    }

}(globalObject));