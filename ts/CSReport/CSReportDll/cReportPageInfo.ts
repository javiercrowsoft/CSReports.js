namespace CSReportDll {

    export class cReportPageInfo {

        private aspect: cReportAspect = null;
        private sectionLine: cReportSectionLine = null;
        private name: string = "";
        private tag: string = "";
        private fieldType: number = 0;

        public constructor() {
            this.aspect = new cReportAspect();
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getTag() {
            return this.tag;
        }

        public setTag(rhs: string) {
            this.tag = rhs;
        }

        public getAspect() {
            return this.aspect;
        }

        public setAspect(rhs: cReportAspect) {
            this.aspect = rhs;
        }

        public getSectionLine() {
            return this.sectionLine;
        }

        public setSectionLine(rhs: cReportSectionLine) {
            this.sectionLine = rhs;
        }

        public getFieldType() {
            return this.fieldType;
        }

        public setFieldType(rhs: number) {
            this.fieldType = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            let nodeObjAspect: XmlNode = null;
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            this.fieldType = xDoc.getNodeProperty(nodeObj, "FieldType").getValueInt(eTypes.eInteger);

            nodeObjAspect = nodeObj;
            if (!this.aspect.load(xDoc, nodeObjAspect)) {
                return false;
            }
            else  {
                return true;
            }
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("PageInfo");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldType");
            xProperty.setValue(eTypes.eInteger, this.fieldType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return this.aspect.save(xDoc, nodeObj);
        }
    }
}
