(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportImage = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportImage = {};
        let m_aspect: cReportAspect = null;
        let m_image: Image = null;

        const cReportImage = function() {
            m_aspect = globalObject.CSReportDll.createCReportAspect();
        };

        // TODO: check if we need to free image resources
        /*
        private void class_Terminate()
        {
            m_aspect = null;
            if (m_hImage !== 0) { DeleteObject(m_hImage); }
        }
         * 
         */

        self.getAspect = function() {
            return m_aspect;
        };

        self.setAspect = function(rhs) {
            m_aspect = rhs;
        };

        self.getImage = function() {
            return m_image;
        };

        self.setImage = function(rhs) {
            m_image = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Image");
            let vBytes: byte[] = null;
            vBytes = xDoc.getBinaryNodeProperty(nodeObj, "Data").getBinaryValue();
            //
            // an empty image is serialized as AA== which is vBytes === [0] ( yes the number zero ) and vBytes.Length === 1
            //
            if (vBytes.Length > 1) {
                m_image = cImage.deSerialiseBitmap(vBytes);
            }
            G.redim(vBytes, 0);
            return m_aspect.load(xDoc, nodeObj);
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            let nodImage: object = null;

            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();
            xProperty.setName("Image");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            let vBytes: byte[] = null;
            if (getImage() !== null) {
                cImage.serialiseBitmap(getImage(), vBytes);
            }
            else {
                G.redim(vBytes, 0);
            }
            xProperty.setName("Data");
            xProperty.setBinaryValue(vBytes);

            xDoc.addBinaryPropertyToNode(nodeObj, xProperty);
            G.redim(vBytes, 0);

            return m_aspect.save(xDoc, nodeObj);
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportImage {

    getAspect: () => cReportAspect;
    setAspect: (cReportAspect) => void;
    getImage: () => Image;
    setImage: (Image) => void;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
  }
}
