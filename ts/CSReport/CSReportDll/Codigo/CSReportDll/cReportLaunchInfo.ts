(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportLaunchInfo = function() {

        const self = {};

        const C_LAUNCHINFO: string= "RptLaunchInfo";

        let m_file: string= "";
        let m_dataSource: object= null;
        let m_sqlstmt: string= "";
        let m_strConnect: string= "";
        let m_printer: cPrinter = null;
        let m_showPrintersDialog: boolean = null;
        let m_internalPreview: boolean = null;
        let m_action: csRptLaunchAction = null;
        let m_copies: number= 0;
        let m_silent: boolean = null;
        let m_fileFormat: csRptFileFormat = null;
        let m_hWnd: number= 0;

        let m_objPaint: CSIReportPrint.cIReportPrint = null;

        self.getHwnd = function() {
            return m_hWnd;
        };

        self.setHwnd = function(rhs) {
            m_hWnd = rhs;
        };

        self.getFile = function() {
            return m_file;
        };

        self.setFile = function(rhs) {
            m_file = rhs;
        };

        self.getDataSource = function() {
            return m_dataSource;
        };

        self.setDataSource = function(rhs) {
            m_dataSource = rhs;
        };

        self.getSqlstmt = function() {
            return m_sqlstmt;
        };

        self.setSqlstmt = function(rhs) {
            m_sqlstmt = rhs;
        };

        self.getStrConnect = function() {
            return m_strConnect;
        };

        self.setStrConnect = function(rhs) {
            m_strConnect = rhs;
        };

        // System.Drawing.Printing.PrinterSettings
        //
        self.getPrinter = function() {
            return m_printer;
        };

        // System.Drawing.Printing.PrinterSettings
        //
        self.setPrinter = function(rhs) {
            m_printer = rhs;
        };

        self.getFileFormat = function() {
            return m_fileFormat;
        };

        self.setFileFormat = function(rhs) {
            m_fileFormat = rhs;
        };

        self.getObjPaint = function() {
            return m_objPaint;
        };

        self.setObjPaint = function(rhs) {
            m_objPaint = rhs;
        };

        self.getAction = function() {
            return m_action;
        };

        self.setAction = function(rhs) {
            m_action = rhs;
        };

        self.getShowPrintersDialog = function() {
            return m_showPrintersDialog;
        };

        self.setShowPrintersDialog = function(rhs) {
            m_showPrintersDialog = rhs;
        };

        self.getInternalPreview = function() {
            return m_internalPreview;
        };

        self.setInternalPreview = function(rhs) {
            m_internalPreview = rhs;
        };

        self.getCopies = function() {
            return m_copies;
        };

        self.setCopies = function(rhs) {
            m_copies = rhs;
        };

        self.getSilent = function() {
            return m_silent;
        };

        self.setSilent = function(rhs) {
            m_silent = rhs;
        };

        self.initPrinter = function(printDialog, deviceName, driverName, port) {
            m_printer = cPrintAPI.getcPrint(printDialog, deviceName, driverName, port);
        };

        self.setPaperBin = function(paperBin) {
            if (m_printer === null) { return; }

            if (paperBin.Length === 0) {
                let idPaperBin: number= 0;
                idPaperBin = cPrintAPI.printerPaperBinNameToId(m_printer.getDeviceName(),
                                                                m_printer.getPort(), 
                                                                paperBin);
                m_printer.getPaperInfo().setPaperBin(idPaperBin);
            }
        };

        self.load = function(xDoc, nodeObj) {
            m_strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText);
            m_action = xDoc.getNodeProperty(nodeObj, "Action").getValueInt(eTypes.eInteger);
            m_copies = xDoc.getNodeProperty(nodeObj, "Copies").getValueInt(eTypes.eInteger);
            m_file = xDoc.getNodeProperty(nodeObj, "File").getValueString(eTypes.eText);
            m_fileFormat = xDoc.getNodeProperty(nodeObj, "FileFormat").getValueInt(eTypes.eInteger);
            m_internalPreview = xDoc.getNodeProperty(nodeObj, "InternalPreview").getValueBool(eTypes.eBoolean);
            m_showPrintersDialog = xDoc.getNodeProperty(nodeObj, "ShowPrintersDialog").getValueBool(eTypes.eBoolean);
            m_silent = xDoc.getNodeProperty(nodeObj, "Silent").getValueBool(eTypes.eBoolean);
            m_sqlstmt = xDoc.getNodeProperty(nodeObj, "Sqlstmt").getValueString(eTypes.eText);

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty= new CSXml.cXmlProperty();
            let nodeObj: XmlNode= null;

            xProperty.setName(C_LAUNCHINFO);

            if (nodeFather !== null) {
                nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);
            }
            else {
                nodeObj = xDoc.addNode(xProperty);
            }

            xProperty.setName("Action");
            xProperty.setValue(eTypes.eInteger, m_action);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Copies");
            xProperty.setValue(eTypes.eInteger, m_copies);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("File");
            xProperty.setValue(eTypes.eText, m_file);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FileFormat");
            xProperty.setValue(eTypes.eInteger, m_fileFormat);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("InternalPreview");
            self.<<<ERROR>>> {{undefined}} = function(, ) {
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ShowPrintersDialog");
            xProperty.setValue(eTypes.eBoolean, m_showPrintersDialog);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Silent");
            xProperty.setValue(eTypes.eBoolean, m_silent);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Sqlstmt");
            xProperty.setValue(eTypes.eText, m_sqlstmt);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("StrConnect");
            xProperty.setValue(eTypes.eText, m_strConnect);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        };

        return self;

    }

}(globalObject));
