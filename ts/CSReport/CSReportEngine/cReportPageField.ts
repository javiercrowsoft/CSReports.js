namespace CSReportEngine {

    import eTypes = CSKernelClient.eTypes;
    import XmlNode = CSXml.XmlNode;

    export class cReportPageField {

        private value: string = "";
        private info: cReportPageInfo = null;
        private visible: boolean = null;
        private objectID: cReportPageID = null;
        private indexLine: number = 0;
        private top: number = 0;
        private height: number = 0;
        private width: number = 0;
        private image: object = null;

        public getValue() {
            return this.value;
        }

        public setValue(rhs: string) {
            this.value = rhs;
        }

        public getInfo() {
            return this.info;
        }

        public setInfo(rhs: cReportPageInfo) {
            this.info = rhs;
        }

        public getVisible() {
            return this.visible;
        }

        public setVisible(rhs: boolean) {
            this.visible = rhs;
        }

        public getObjectID() {
            return this.objectID;
        }

        public setObjectID(rhs: cReportPageID) {
            this.objectID = rhs;
        }

        public getTop() {
            return this.top;
        }

        public setTop(rhs: number) {
            this.top = rhs;
        }

        public getHeight() {
            return this.height;
        }

        public setHeight(rhs: number) {
            this.height = rhs;
        }

        public getWidth() {
            return this.width;
        }

        public setWidth(rhs: number) {
            this.width = rhs;
        }

        public getImage() {
            return this.image;
        }

        public setImage(rhs: object) {
            this.image = rhs;
        }

        public getIndexLine() {
            return this.indexLine;
        }

        public setIndexLine(rhs: number) {
            this.indexLine = rhs;
        }

        public copy(from: any) {
            this.objectID = new cReportPageID();
            this.info = new cReportPageInfo();

            this.value = from.value;
            this.visible = from.visible;
            this.top = from.top;
            this.height = from.height;
            this.width = from.width;

            if(!this.objectID.copy(from.objectID)) {
                return false;
            }
            if(!this.info.copy(from.info)) {
                return false;
            }
            return true;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.objectID = new cReportPageID();
            this.info = new cReportPageInfo();

            this.value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            this.visible = xDoc.getNodeProperty(nodeObj, "Visible").getValueBool(eTypes.eBoolean);
            this.top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong);
            this.height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong);
            this.width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong);

            let nodeObjAux: XmlNode = null;
            nodeObjAux = nodeObj;
            if(!this.objectID.load(xDoc, nodeObjAux)) {
                return false;
            }
            nodeObjAux = nodeObj;
            if(!this.info.load(xDoc, nodeObjAux)) {
                return false;
            }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, this.value);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Visible");
            xProperty.setValue(eTypes.eBoolean, this.visible);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top");
            xProperty.setValue(eTypes.eLong, this.top);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, this.height);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, this.width);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            if(this.objectID !== null) {
                if(!this.objectID.save(xDoc, nodeObj)) {
                    return false;
                }
            }
            if(!this.info.save(xDoc, nodeObj)) {
                return false;
            }

            return true;
        }

        public saveForWeb(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Field");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, this.value);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);
            xDoc.setNodeText(nodeObj, this.value);

            return true;
        }
    }
}
