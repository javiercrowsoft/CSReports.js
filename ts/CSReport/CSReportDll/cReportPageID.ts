namespace CSReportDll {

    import XmlNode = CSXml.XmlNode;
    import eTypes = CSKernelClient.eTypes;
    
    export class cReportPageID {

        private value: string = "";

        public getValue() {
            return this.value;
        }

        public setValue(rhs: string) {
            this.value = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("PageID");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, this.value);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }
    }
}
