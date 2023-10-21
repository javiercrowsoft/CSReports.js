namespace CSReportDll {

    import XmlNode = CSXml.XmlNode;
    import csRptLaunchAction = CSReportGlobals.csRptLaunchAction;
    import csRptFileFormat = CSReportGlobals.csRptFileFormat;
    import eTypes = CSKernelClient.eTypes;

    export class cReportLaunchInfo {

        public static C_LAUNCH_INFO: string = "RptLaunchInfo";

        private file: string = "";
        private dataSource: object = null;
        private sqlstmt: string = "";
        private strConnect: string = "";
        private printer: cPrinter = null;
        private showPrintersDialog: boolean = null;
        private internalPreview: boolean = null;
        private action: csRptLaunchAction = null;
        private copies: number = 0;
        private silent: boolean = null;
        private fileFormat: csRptFileFormat = null;

        private objPaint: CSIReportPrint.cIReportPrint = null;

        public constructor() {}

        public getFile() {
            return this.file;
        }

        public setFile(rhs: string) {
            this.file = rhs;
        }

        public getDataSource() {
            return this.dataSource;
        }

        public setDataSource(rhs: object) {
            this.dataSource = rhs;
        }

        public getSqlstmt() {
            return this.sqlstmt;
        }

        public setSqlstmt(rhs: string) {
            this.sqlstmt = rhs;
        }

        public getStrConnect() {
            return this.strConnect;
        }

        public setStrConnect(rhs: string) {
            this.strConnect = rhs;
        }

        // System.Drawing.Printing.PrinterSettings
        //
        public getPrinter() {
            return this.printer;
        }

        // System.Drawing.Printing.PrinterSettings
        //
        public setPrinter(rhs: cPrinter) {
            this.printer = rhs;
        }

        public getFileFormat() {
            return this.fileFormat;
        }

        public setFileFormat(rhs: csRptFileFormat) {
            this.fileFormat = rhs;
        }

        public getObjPaint() {
            return this.objPaint;
        }

        public setObjPaint(rhs: CSIReportPrint.cIReportPrint) {
            this.objPaint = rhs;
        }

        public getAction() {
            return this.action;
        }

        public setAction(rhs: csRptLaunchAction) {
            this.action = rhs;
        }

        public getShowPrintersDialog() {
            return this.showPrintersDialog;
        }

        public setShowPrintersDialog(rhs: boolean) {
            this.showPrintersDialog = rhs;
        }

        public getInternalPreview() {
            return this.internalPreview;
        }

        public setInternalPreview(rhs: boolean) {
            this.internalPreview = rhs;
        }

        public getCopies() {
            return this.copies;
        }

        public setCopies(rhs: number) {
            this.copies = rhs;
        }

        public getSilent() {
            return this.silent;
        }

        public setSilent(rhs: boolean) {
            this.silent = rhs;
        }

        public initPrinter(printDialog: PrintDialog, deviceName: string, driverName: string, port: string) {
            this.printer = cPrintAPI.getcPrint(printDialog, deviceName, driverName, port);
        }

        public setPaperBin(paperBin: string) {
            if(this.printer === null) { return; }

            if(paperBin.length === 0) {
                let idPaperBin: number = cPrintAPI.printerPaperBinNameToId(
                                                        this.printer.getDeviceName(),
                                                        this.printer.getPort(),
                                                        paperBin);
                this.printer.getPaperInfo().setPaperBin(idPaperBin);
            }
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText);
            this.action = xDoc.getNodeProperty(nodeObj, "Action").getValueInt(eTypes.eInteger);
            this.copies = xDoc.getNodeProperty(nodeObj, "Copies").getValueInt(eTypes.eInteger);
            this.file = xDoc.getNodeProperty(nodeObj, "File").getValueString(eTypes.eText);
            this.fileFormat = xDoc.getNodeProperty(nodeObj, "FileFormat").getValueInt(eTypes.eInteger);
            this.internalPreview = xDoc.getNodeProperty(nodeObj, "InternalPreview").getValueBool(eTypes.eBoolean);
            this.showPrintersDialog = xDoc.getNodeProperty(nodeObj, "ShowPrintersDialog").getValueBool(eTypes.eBoolean);
            this.silent = xDoc.getNodeProperty(nodeObj, "Silent").getValueBool(eTypes.eBoolean);
            this.sqlstmt = xDoc.getNodeProperty(nodeObj, "Sqlstmt").getValueString(eTypes.eText);

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = new CSXml.cXmlProperty();
            let nodeObj: XmlNode;

            xProperty.setName(cReportLaunchInfo.C_LAUNCH_INFO);

            if(nodeFather !== null) {
                nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);
            }
            else {
                nodeObj = xDoc.addNode(xProperty);
            }

            xProperty.setName("Action");
            xProperty.setValue(eTypes.eInteger, this.action);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Copies");
            xProperty.setValue(eTypes.eInteger, this.copies);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("File");
            xProperty.setValue(eTypes.eText, this.file);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FileFormat");
            xProperty.setValue(eTypes.eInteger, this.fileFormat);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("InternalPreview");
            xProperty.setValue(eTypes.eBoolean, this.internalPreview);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ShowPrintersDialog");
            xProperty.setValue(eTypes.eBoolean, this.showPrintersDialog);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Silent");
            xProperty.setValue(eTypes.eBoolean, this.silent);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Sqlstmt");
            xProperty.setValue(eTypes.eText, this.sqlstmt);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("StrConnect");
            xProperty.setValue(eTypes.eText, this.strConnect);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }
    }
}
