namespace CSReportDll {

    import csColors = CSReportGlobals.csColors;
    import eTypes = CSKernelClient.eTypes;

    export class cReportChartSequence {

        private C_MODULE: string = "cReportChartSequence";

        private valueFieldName: string = "";
        private labelFieldName: string = "";
        private color: csColors = csColors.ALICEBLUE;
        private valueIndex: number = 0;
        private labelIndex: number = 0;

        public constructor() {}

        public getValueFieldName() {
            return this.valueFieldName;
        }

        public setValueFieldName(rhs: string) {
            this.valueFieldName = rhs;
        }

        public getLabelFieldName() {
            return this.labelFieldName;
        }

        public setLabelFieldName(rhs: string) {
            this.labelFieldName = rhs;
        }

        public getColor() {
            return this.color;
        }

        public setColor(value: csColors) {
            this.color = value;
        }

        public getValueIndex() {
            return this.valueIndex;
        }

        public setValueIndex(rhs: number) {
            this.valueIndex = rhs;
        }

        public getLabelIndex() {
            return this.labelIndex;
        }

        public setLabelIndex(rhs: number) {
            this.labelIndex = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode, index: number) {
            try { this.valueFieldName = xDoc.getNodeProperty(nodeObj, "ValueFieldName").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { this.labelFieldName = xDoc.getNodeProperty(nodeObj, "LabelFieldName").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { this.color = xDoc.getNodeProperty(nodeObj, "Color").getValueInt(eTypes.eLong); }
            catch  (ex) { }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode, index: number) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Serie_" + index.toString());
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("ValueFieldName");
            xProperty.setValue(eTypes.eText, this.valueFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("LabelFieldName");
            xProperty.setValue(eTypes.eText, this.labelFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Color");
            xProperty.setValue(eTypes.eLong, this.color);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }
    }
}
