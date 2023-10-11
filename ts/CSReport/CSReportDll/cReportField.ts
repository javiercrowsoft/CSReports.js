namespace CSReportDll {

    import eTypes = CSKernelClient.eTypes;
    import XmlNode = CSXml.XmlNode;

    export class cReportField {

        private name: string = "";
        private index: number = 0;
        private fieldType: number = 0;

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getIndex() {
            return this.index;
        }

        public setIndex(rhs: number) {
            this.index = rhs;
        }

        public getFieldType() {
            return this.fieldType;
        }

        public setFieldType(rhs: number) {
            this.fieldType = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Field");
            this.index = xDoc.getNodeProperty(nodeObj, "Index").getValueInt(eTypes.eInteger);
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            this.fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger);
            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Index");
            xProperty.setValue(eTypes.eInteger, this.index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldType");
            xProperty.setValue(eTypes.eInteger, this.fieldType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }

        toString() {
            return "name: " + this.name + ", index: " + this.index;
        }

    }
}
