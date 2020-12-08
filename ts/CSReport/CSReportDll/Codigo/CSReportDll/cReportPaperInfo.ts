(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportPaperInfo = function() {

        const self = {};

        const C_MODULE: string= "cReportPaperInfo";

        let m_width: number= 0;
        let m_height: number= 0;
        let m_paperSize: csReportPaperType = null;
        let m_orientation: number= 0;
        let m_customHeight: number= 0;
        let m_customWidth: number= 0;
        let m_pagesToPrint: string= "";
        let m_paperBin: number= 0;

        self.getWidth = function() {
            return m_width;
        };

        self.setWidth = function(rhs) {
            m_width = rhs;
        };

        self.getHeight = function() {
            return m_height;
        };

        self.setHeight = function(rhs) {
            m_height = rhs;
        };

        self.getPaperSize = function() {
            return m_paperSize;
        };

        self.setPaperSize = function(rhs) {
            m_paperSize = rhs;
        };

        self.getOrientation = function() {
            return m_orientation;
        };

        self.setOrientation = function(rhs) {
            m_orientation = rhs;
        };

        self.getCustomHeight = function() {
            return m_customHeight;
        };

        self.setCustomHeight = function(rhs) {
            m_customHeight = rhs;
        };

        self.getCustomWidth = function() {
            return m_customWidth;
        };

        self.setCustomWidth = function(rhs) {
            m_customWidth = rhs;
        };

        self.getPaperBin = function() {
            return m_paperBin;
        };

        self.setPaperBin = function(rhs) {
            m_paperBin = rhs;
        };

        self.getPagesToPrint = function() {
            return m_pagesToPrint;
        };

        self.setPagesToPrint = function(rhs) {
            m_pagesToPrint = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            if (nodeObj !== null) {
                m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong);
                m_paperSize = xDoc.getNodeProperty(nodeObj, "PaperSize").getValueInt(eTypes.eInteger);
                m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong);
                m_orientation = xDoc.getNodeProperty(nodeObj, "Orientation").getValueInt(eTypes.eInteger);
                m_customWidth = xDoc.getNodeProperty(nodeObj, "CustomWidth").getValueInt(eTypes.eLong);
                m_customHeight = xDoc.getNodeProperty(nodeObj, "CustomHeight").getValueInt(eTypes.eLong);
            }

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty= null;
            let nodeObj: XmlNode= null;

            xProperty =  globalObject.CSReportDll.createCSXml.cXmlProperty();

            nodeObj = nodeFather;

            xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, m_height);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PaperSize");
            xProperty.setValue(eTypes.eInteger, m_paperSize);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, m_width);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Orientation");
            xProperty.setValue(eTypes.eInteger, m_orientation);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CustomWidth");
            xProperty.setValue(eTypes.eLong, m_customWidth);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CustomHeight");
            xProperty.setValue(eTypes.eLong, m_customHeight);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }

}(globalObject));
