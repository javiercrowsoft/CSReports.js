namespace CSReportDll {

    import csColors = CSReportGlobals.csColors;

    export class cReportFont {

        private foreColor: number = csColors.C_COLOR_BLACK;
        private size: number = 8;
        private name: string = "Tahoma";
        private underline: boolean = null;
        private bold: boolean = null;
        private italic: boolean = null;
        private strike: boolean = null;

        public getForeColor() {
            return this.foreColor;
        }

        public setForeColor(rhs: number) {
            this.foreColor = rhs;
        }

        public getSize() {
            return this.size;
        }

        public setSize(rhs: number) {
            this.size = rhs;
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getUnderline() {
            return this.underline;
        }

		public setUnderline(rhs: boolean) {
            this.underline = rhs;
        }

        public getBold() {
            return this.bold;
        }

        public setBold(rhs: boolean) {
            this.bold = rhs;
        }

        public getItalic() {
            return this.italic;
        }

        public setItalic(rhs: boolean) {
            this.italic = rhs;
        }

        public getStrike() {
            return this.strike;
        }

        public setStrike(rhs: boolean) {
            this.strike = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Font");
            this.bold = xDoc.getNodeProperty(nodeObj, "Bold").getValueBool(eTypes.eBoolean);
            this.foreColor = xDoc.getNodeProperty(nodeObj, "ForeColor").getValueInt(eTypes.eLong);
            this.italic = xDoc.getNodeProperty(nodeObj, "Italic").getValueBool(eTypes.eBoolean);
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            this.size = xDoc.getNodeProperty(nodeObj, "Size").getValueInt(eTypes.eInteger);
            this.underline = xDoc.getNodeProperty(nodeObj, "UnderLine").getValueBool(eTypes.eBoolean);
            this.strike = xDoc.getNodeProperty(nodeObj, "Strike").getValueBool(eTypes.eBoolean);

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Font");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("ForeColor");
            xProperty.setValue(eTypes.eLong, this.foreColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Bold");
            xProperty.setValue(eTypes.eBoolean, this.bold);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Italic");
            xProperty.setValue(eTypes.eBoolean, this.italic);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Size");
            xProperty.setValue(eTypes.eInteger, this.size);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("UnderLine");
            xProperty.setValue(eTypes.eBoolean, this.underline);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Strike");
            xProperty.setValue(eTypes.eBoolean, this.strike);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }
    }
}
