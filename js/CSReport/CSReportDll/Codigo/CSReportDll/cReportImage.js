(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportImage = function() {

        const self = {}; //@@@: public class cReportImage
        let m_aspect = null; //@@@: private cReportAspect m_aspect;
        let m_image = null; //@@@: private Image m_image = null;

        const cReportImage = function() { //@@@: public cReportImage()
            m_aspect = new cReportAspect(); //@@@: m_aspect = new cReportAspect();
        }; //@@@: }

        // TODO: check if we need to free image resources
        /* //@@@: /*
        private void class_Terminate()
        {
            m_aspect = null;
            if (m_hImage !== 0) { DeleteObject(m_hImage); }
        }
         * 
         */

        self.getAspect = function() { //@@@: public cReportAspect getAspect()
            return m_aspect; //@@@: return m_aspect;
        }; //@@@: }

        self.setAspect = function(rhs) { //@@@: public void setAspect(cReportAspect rhs)
            m_aspect = rhs; //@@@: m_aspect = rhs;
        }; //@@@: }

        self.getImage = function() { //@@@: public Image getImage()
            return m_image; //@@@: return m_image;
        }; //@@@: }

        self.setImage = function(rhs) { //@@@: public void setImage(Image rhs)
            m_image = rhs; //@@@: m_image = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Image"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Image");
            let vBytes = null; //@@@: byte[] vBytes = null;
            vBytes = xDoc.getBinaryNodeProperty(nodeObj, "Data").getBinaryValue(); //@@@: vBytes = xDoc.getBinaryNodeProperty(nodeObj, "Data").getBinaryValue();
            //
            // an empty image is serialized as AA== which is vBytes === [0] ( yes the number zero ) and vBytes.Length === 1
            //
            if (vBytes.Length > 1) { //@@@: if (vBytes.Length > 1)
                m_image = cImage.deSerialiseBitmap(vBytes); //@@@: m_image = cImage.deSerialiseBitmap(vBytes);
            } //@@@: }
            G.redim(vBytes, 0); //@@@: G.redim(ref vBytes, 0);
            return m_aspect.load(xDoc, nodeObj); //@@@: return m_aspect.load(xDoc, nodeObj);
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            let nodImage = null; //@@@: object nodImage = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();
            xProperty.setName("Image"); //@@@: xProperty.setName("Image");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            let vBytes = null; //@@@: byte[] vBytes = null;
            if (getImage() !== null) { //@@@: if (getImage() != null)
                cImage.serialiseBitmap(getImage(), vBytes); //@@@: cImage.serialiseBitmap(getImage(), vBytes);
            } //@@@: }
            else { //@@@: else
                G.redim(vBytes, 0); //@@@: G.redim(ref vBytes, 0);
            } //@@@: }
            xProperty.setName("Data"); //@@@: xProperty.setName("Data");
            xProperty.setBinaryValue(vBytes); //@@@: xProperty.setBinaryValue(vBytes);

            xDoc.addBinaryPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addBinaryPropertyToNode(nodeObj, xProperty);
            G.redim(vBytes, 0); //@@@: G.redim(ref vBytes, 0);

            return m_aspect.save(xDoc, nodeObj); //@@@: return m_aspect.save(xDoc, nodeObj);
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
