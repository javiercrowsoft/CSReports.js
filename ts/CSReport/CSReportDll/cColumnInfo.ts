namespace CSReportDll {

    import csDataType = CSDatabase.csDataType;
    import eTypes = CSKernelClient.eTypes;
    import XmlNode = CSXml.XmlNode;
    import cXmlProperty = CSXml.cXmlProperty;

    export class cColumnInfo {

        private name = "";
        private columnType: csDataType;

        private position = 0;
        private key = "";

        public getKey() {
            return this.key;
        }

        public setKey(key: string) {
            this.key = key;
        }

        public getName() {
            return this.name;
        }

        public setName(name: string) {
            this.name = name;
        }

        public getColumnType() {
            return this.columnType;
        }

        public setColumnType(type: csDataType) {
            this.columnType = type;
        }

        public getPosition() {
            return this.position;
        }

        public setPosition(position: number) {
            this.position = position;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.columnType = xDoc.getNodeProperty(nodeObj, "TypeColumn").getValueInt(eTypes.eInteger);
            this.position = xDoc.getNodeProperty(nodeObj, "Position").getValueInt(eTypes.eInteger);
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            this.key = xDoc.getNodeProperty(nodeObj, "Key").getValueString(eTypes.eText);

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty = new cXmlProperty();
            xProperty.setName(this.key);
            let nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty = new cXmlProperty();
            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, this.key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty = new cXmlProperty();
            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty = new cXmlProperty();
            xProperty.setName("Position");
            xProperty.setValue(eTypes.eInteger, this.position);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty = new cXmlProperty();
            xProperty.setName("TypeColumn");
            xProperty.setValue(eTypes.eInteger, this.columnType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }

    }

}
