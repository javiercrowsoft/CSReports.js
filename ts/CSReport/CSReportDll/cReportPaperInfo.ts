namespace CSReportDll {

    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import XmlNode = CSXml.XmlNode;
    import eTypes = CSKernelClient.eTypes;

    export class cReportPaperInfo {

        private width: number = 0;
        private height: number = 0;
        private paperSize: csReportPaperType = null;
        private orientation: number = 0;
        private customHeight: number = 0;
        private customWidth: number = 0;
        private pagesToPrint: string = "";
        private paperBin: number = 0;

        public getWidth() {
            return this.width;
        }

        public setWidth(rhs: number) {
            this.width = rhs;
        }

        public getHeight() {
            return this.height;
        }

        public setHeight(rhs: number) {
            this.height = rhs;
        }

        public getPaperSize() {
            return this.paperSize;
        }

        public setPaperSize(rhs: csReportPaperType) {
            this.paperSize = rhs;
        }

        public getOrientation() {
            return this.orientation;
        }

        public setOrientation(rhs: number) {
            this.orientation = rhs;
        }

        public getCustomHeight() {
            return this.customHeight;
        }

        public setCustomHeight(rhs: number) {
            this.customHeight = rhs;
        }

        public getCustomWidth() {
            return this.customWidth;
        }

        public setCustomWidth(rhs: number) {
            this.customWidth = rhs;
        }

        public getPaperBin() {
            return this.paperBin;
        }

        public setPaperBin(rhs: number) {
            this.paperBin = rhs;
        }

        public getPagesToPrint() {
            return this.pagesToPrint;
        }

        public setPagesToPrint(rhs: string) {
            this.pagesToPrint = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            if (nodeObj !== null) {
                this.height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong);
                this.paperSize = xDoc.getNodeProperty(nodeObj, "PaperSize").getValueInt(eTypes.eInteger);
                this.width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong);
                this.orientation = xDoc.getNodeProperty(nodeObj, "Orientation").getValueInt(eTypes.eInteger);
                this.customWidth = xDoc.getNodeProperty(nodeObj, "CustomWidth").getValueInt(eTypes.eLong);
                this.customHeight = xDoc.getNodeProperty(nodeObj, "CustomHeight").getValueInt(eTypes.eLong);
            }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            nodeObj = nodeFather;

            xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, this.height);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PaperSize");
            xProperty.setValue(eTypes.eInteger, this.paperSize);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, this.width);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Orientation");
            xProperty.setValue(eTypes.eInteger, this.orientation);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CustomWidth");
            xProperty.setValue(eTypes.eLong, this.customWidth);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CustomHeight");
            xProperty.setValue(eTypes.eLong, this.customHeight);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }
    }
}
