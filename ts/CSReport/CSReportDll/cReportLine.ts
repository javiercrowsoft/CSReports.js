namespace CSReportDll {

    export class cReportLine {

        private aspect: cReportAspect = new cReportAspect();

        public getAspect() {
            return this.aspect;
        }

        public setAspect(rhs: cReportAspect) {
            this.aspect = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Line");
            return this.aspect.load(xDoc, nodeObj);
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Line");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            return this.aspect.save(xDoc, nodeObj);
        }
    }
}
