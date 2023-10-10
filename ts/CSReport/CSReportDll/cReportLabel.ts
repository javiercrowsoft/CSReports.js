namespace CSReportDll {

    import XmlNode = CSXml.XmlNode;
    import eTypes = CSKernelClient.eTypes;
        
    export class cReportLabel {

        private aspect: cReportAspect = null;
        private text: string = "";
        private canGrow: boolean = null;

        public constructor() {
            this.aspect = new cReportAspect();
        }

        public getAspect() {
            return this.aspect;
        }

        public setAspect(rhs: cReportAspect) {
            this.aspect = rhs;
        }

        public getText() {
            return this.text;
        }

        public setText(rhs: string) {
            this.text = rhs;
        }

        public getCanGrow() {
            return this.canGrow;
        }

        public setCanGrow(rhs: boolean) {
            this.canGrow = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Label");
            this.text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText);
            return this.aspect.load(xDoc, nodeObj);
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Label");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Text");
            xProperty.setValue(eTypes.eText, this.text);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CanGrow");
            xProperty.setValue(eTypes.eBoolean, this.canGrow);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return this.aspect.save(xDoc, nodeObj);
        }

        toString() {
            return "text: " + this.text + ", foreColor: " + this.aspect.getFont().getForeColor();
        }
    }
}
