(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportPaperInfo = function() {

        const self = {}; //@@@: public class cReportPaperInfo

        const C_MODULE = "cReportPaperInfo"; //@@@: private const String C_MODULE = "cReportPaperInfo";

        let m_width = 0; //@@@: private float m_width = 0;
        let m_height = 0; //@@@: private float m_height = 0;
        let m_paperSize = null; //@@@: private csReportPaperType m_paperSize;
        let m_orientation = 0; //@@@: private int m_orientation = 0;
        let m_customHeight = 0; //@@@: private int m_customHeight = 0;
        let m_customWidth = 0; //@@@: private int m_customWidth = 0;
        let m_pagesToPrint = ""; //@@@: private String m_pagesToPrint = "";
        let m_paperBin = 0; //@@@: private int m_paperBin = 0;

        self.getWidth = function() { //@@@: public float getWidth()
            return m_width; //@@@: return m_width;
        }; //@@@: }

        self.setWidth = function(rhs) { //@@@: public void setWidth(float rhs)
            m_width = rhs; //@@@: m_width = rhs;
        }; //@@@: }

        self.getHeight = function() { //@@@: public float getHeight()
            return m_height; //@@@: return m_height;
        }; //@@@: }

        self.setHeight = function(rhs) { //@@@: public void setHeight(float rhs)
            m_height = rhs; //@@@: m_height = rhs;
        }; //@@@: }

        self.getPaperSize = function() { //@@@: public csReportPaperType getPaperSize()
            return m_paperSize; //@@@: return m_paperSize;
        }; //@@@: }

        self.setPaperSize = function(rhs) { //@@@: public void setPaperSize(csReportPaperType rhs)
            m_paperSize = rhs; //@@@: m_paperSize = rhs;
        }; //@@@: }

        self.getOrientation = function() { //@@@: public int getOrientation()
            return m_orientation; //@@@: return m_orientation;
        }; //@@@: }

        self.setOrientation = function(rhs) { //@@@: public void setOrientation(int rhs)
            m_orientation = rhs; //@@@: m_orientation = rhs;
        }; //@@@: }

        self.getCustomHeight = function() { //@@@: public int getCustomHeight()
            return m_customHeight; //@@@: return m_customHeight;
        }; //@@@: }

        self.setCustomHeight = function(rhs) { //@@@: public void setCustomHeight(int rhs)
            m_customHeight = rhs; //@@@: m_customHeight = rhs;
        }; //@@@: }

        self.getCustomWidth = function() { //@@@: public int getCustomWidth()
            return m_customWidth; //@@@: return m_customWidth;
        }; //@@@: }

        self.setCustomWidth = function(rhs) { //@@@: public void setCustomWidth(int rhs)
            m_customWidth = rhs; //@@@: m_customWidth = rhs;
        }; //@@@: }

        self.getPaperBin = function() { //@@@: public int getPaperBin()
            return m_paperBin; //@@@: return m_paperBin;
        }; //@@@: }

        self.setPaperBin = function(rhs) { //@@@: public void setPaperBin(int rhs)
            m_paperBin = rhs; //@@@: m_paperBin = rhs;
        }; //@@@: }

        self.getPagesToPrint = function() { //@@@: public String getPagesToPrint()
            return m_pagesToPrint; //@@@: return m_pagesToPrint;
        }; //@@@: }

        self.setPagesToPrint = function(rhs) { //@@@: public void setPagesToPrint(String rhs)
            m_pagesToPrint = rhs; //@@@: m_pagesToPrint = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            if (nodeObj !== null) { //@@@: if (nodeObj != null)
                m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong); //@@@: m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong);
                m_paperSize = xDoc.getNodeProperty(nodeObj, "PaperSize").getValueInt(eTypes.eInteger); //@@@: m_paperSize = (csReportPaperType)xDoc.getNodeProperty(nodeObj, "PaperSize").getValueInt(eTypes.eInteger);
                m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong); //@@@: m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong);
                m_orientation = xDoc.getNodeProperty(nodeObj, "Orientation").getValueInt(eTypes.eInteger); //@@@: m_orientation = xDoc.getNodeProperty(nodeObj, "Orientation").getValueInt(eTypes.eInteger);
                m_customWidth = xDoc.getNodeProperty(nodeObj, "CustomWidth").getValueInt(eTypes.eLong); //@@@: m_customWidth = xDoc.getNodeProperty(nodeObj, "CustomWidth").getValueInt(eTypes.eLong);
                m_customHeight = xDoc.getNodeProperty(nodeObj, "CustomHeight").getValueInt(eTypes.eLong); //@@@: m_customHeight = xDoc.getNodeProperty(nodeObj, "CustomHeight").getValueInt(eTypes.eLong);
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            nodeObj = nodeFather; //@@@: nodeObj = nodeFather;

            xProperty.setName("Height"); //@@@: xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, m_height); //@@@: xProperty.setValue(eTypes.eLong, m_height);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PaperSize"); //@@@: xProperty.setName("PaperSize");
            xProperty.setValue(eTypes.eInteger, m_paperSize); //@@@: xProperty.setValue(eTypes.eInteger, m_paperSize);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width"); //@@@: xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, m_width); //@@@: xProperty.setValue(eTypes.eLong, m_width);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Orientation"); //@@@: xProperty.setName("Orientation");
            xProperty.setValue(eTypes.eInteger, m_orientation); //@@@: xProperty.setValue(eTypes.eInteger, m_orientation);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CustomWidth"); //@@@: xProperty.setName("CustomWidth");
            xProperty.setValue(eTypes.eLong, m_customWidth); //@@@: xProperty.setValue(eTypes.eLong, m_customWidth);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CustomHeight"); //@@@: xProperty.setName("CustomHeight");
            xProperty.setValue(eTypes.eLong, m_customHeight); //@@@: xProperty.setValue(eTypes.eLong, m_customHeight);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
