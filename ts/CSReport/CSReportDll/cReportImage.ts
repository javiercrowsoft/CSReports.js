namespace CSReportDll {

    import Image = CSReportPaint.Image;
    import XmlNode = CSXml.XmlNode;

    export class cReportImage {

        private aspect: cReportAspect = null;
        private image: Image = null;

        public constructor() {
            this.aspect = new cReportAspect();
        }

        public getAspect() {
            return this.aspect;
        }

        public setAspect(rhs: cReportAspect) {
            this.aspect = rhs;
        }

        public getImage() {
            return this.image;
        }

        public setImage(rhs: Image) {
            this.image = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: CSXml.XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Image");
            let vBytes = null;
            vBytes = xDoc.getBinaryNodeProperty(nodeObj, "Data").getBinaryValue();
            //
            // an empty image is serialized as AA== which is vBytes === [0] ( yes the number zero ) and vBytes.length === 1
            //
            if(vBytes.length > 1) {
                this.image = cImage.deSerialiseBitmap(vBytes);
            }
            vBytes = [];
            return this.aspect.load(xDoc, nodeObj);
        }

        public save(xDoc: CSXml.cXml, nodeFather: CSXml.XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            let nodImage: object = null;

            xProperty = new CSXml.cXmlProperty();
            xProperty.setName("Image");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            let vBytes = null;
            if(this.getImage() !== null) {
                cImage.serialiseBitmap(this.getImage(), vBytes);
            }
            else {
                vBytes = [];
            }
            xProperty.setName("Data");
            xProperty.setBinaryValue(vBytes);

            xDoc.addBinaryPropertyToNode(nodeObj, xProperty);
            vBytes = [];

            return this.aspect.save(xDoc, nodeObj);
        }

        toString() {
            return "height: " + this.getAspect().getHeight() + ", width: " + this.getAspect().getWidth();
        }
    }
}
