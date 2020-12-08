(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportAspect = function() {

        const self = {}; //@@@: public class cReportAspect

        let m_left = 0; //@@@: private float m_left = 0;
        let m_top = 0; //@@@: private float m_top = 0;
        let m_height = 0; //@@@: private float m_height = 0;
        let m_width = 0; //@@@: private float m_width = 0;
        let m_backColor = csColors.C_COLOR_WHITE; //@@@: private int m_backColor = (int)csColors.C_COLOR_WHITE;
        let m_borderWidth = 0; //@@@: private float m_borderWidth = 0;
        let m_borderType = null; //@@@: private csReportBorderType m_borderType;
        let m_borderColor = csColors.C_COLOR_BLACK; //@@@: private int m_borderColor = (int)csColors.C_COLOR_BLACK;
        let m_borderColor3d = 0; //@@@: private int m_borderColor3d = 0;
        let m_borderColor3dShadow = 0; //@@@: private int m_borderColor3dShadow = 0;
        let m_selectColor = 0; //@@@: private int m_selectColor = 0;
        let m_font = new cReportFont(); //@@@: private cReportFont m_font = new cReportFont();
        let m_canGrow = null; //@@@: private bool m_canGrow;
        let m_nZOrder = 0; //@@@: private int m_nZOrder = 0;
        let m_align = HorizontalAlignment.Left; //@@@: private HorizontalAlignment m_align = HorizontalAlignment.Left;
        let m_transparent = null; //@@@: private bool m_transparent;
        let m_format = ""; //@@@: private String m_format = "";
        let m_symbol = ""; //@@@: private String m_symbol = "";
        let m_isAccounting = null; //@@@: private bool m_isAccounting;
        let m_wordWrap = null; //@@@: private bool m_wordWrap;
        let m_borderRounded = null; //@@@: private bool m_borderRounded;
        let m_offset = 0; //@@@: private float m_offset = 0;

        self.setOffset = function(rhs) { //@@@: public void setOffset(float rhs)
            m_offset = rhs; //@@@: m_offset = rhs;
        }; //@@@: }

        self.getOffset = function() { //@@@: public float getOffset()
            return m_offset; //@@@: return m_offset;
        }; //@@@: }

        self.getLeft = function() { //@@@: public float getLeft()
            return m_left; //@@@: return m_left;
        }; //@@@: }

        self.setLeft = function(rhs) { //@@@: public void setLeft(float rhs)
            m_left = rhs; //@@@: m_left = rhs;
        }; //@@@: }

        self.getTop = function() { //@@@: public float getTop()
            return m_top; //@@@: return m_top;
        }; //@@@: }

        self.setTop = function(rhs) { //@@@: public void setTop(float rhs)
            m_top = rhs; //@@@: m_top = rhs;
        }; //@@@: }

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
            if (rhs < 1) { rhs = 1; } //@@@: if (rhs < 1) { rhs = 1; }
            m_height = rhs; //@@@: m_height = rhs;
        }; //@@@: }

        self.getBackColor = function() { //@@@: public int getBackColor()
            return m_backColor; //@@@: return m_backColor;
        }; //@@@: }

        self.setBackColor = function(rhs) { //@@@: public void setBackColor(int rhs)
            m_backColor = rhs; //@@@: m_backColor = rhs;
        }; //@@@: }

        self.getBorderWidth = function() { //@@@: public float getBorderWidth()
            return m_borderWidth; //@@@: return m_borderWidth;
        }; //@@@: }

        self.setBorderWidth = function(rhs) { //@@@: public void setBorderWidth(float rhs)
            m_borderWidth = rhs; //@@@: m_borderWidth = rhs;
        }; //@@@: }

        self.getBorderType = function() { //@@@: public csReportBorderType getBorderType()
            return m_borderType; //@@@: return m_borderType;
        }; //@@@: }

        self.setBorderType = function(rhs) { //@@@: public void setBorderType(csReportBorderType rhs)
            m_borderType = rhs; //@@@: m_borderType = rhs;
        }; //@@@: }

        self.getBorderColor = function() { //@@@: public int getBorderColor()
            return m_borderColor; //@@@: return m_borderColor;
        }; //@@@: }

        self.setBorderColor = function(rhs) { //@@@: public void setBorderColor(int rhs)
            m_borderColor = rhs; //@@@: m_borderColor = rhs;
        }; //@@@: }

        self.getBorderColor3d = function() { //@@@: public int getBorderColor3d()
            return m_borderColor3d; //@@@: return m_borderColor3d;
        }; //@@@: }

        self.setBorderColor3d = function(rhs) { //@@@: public void setBorderColor3d(int rhs)
            m_borderColor3d = rhs; //@@@: m_borderColor3d = rhs;
        }; //@@@: }

        self.getBorderColor3dShadow = function() { //@@@: public int getBorderColor3dShadow()
            return m_borderColor3dShadow; //@@@: return m_borderColor3dShadow;
        }; //@@@: }

        self.setBorderColor3dShadow = function(rhs) { //@@@: public void setBorderColor3dShadow(int rhs)
            m_borderColor3dShadow = rhs; //@@@: m_borderColor3dShadow = rhs;
        }; //@@@: }

        self.getSelectColor = function() { //@@@: public int getSelectColor()
            return m_selectColor; //@@@: return m_selectColor;
        }; //@@@: }

        self.setSelectColor = function(rhs) { //@@@: public void setSelectColor(int rhs)
            m_selectColor = rhs; //@@@: m_selectColor = rhs;
        }; //@@@: }

        self.getFont = function() { //@@@: public cReportFont getFont()
            return m_font; //@@@: return m_font;
        }; //@@@: }

        self.setFont = function(rhs) { //@@@: public void setFont(cReportFont rhs)
            m_font = rhs; //@@@: m_font = rhs;
        }; //@@@: }

        self.getCanGrow = function() { //@@@: public bool getCanGrow()
            return m_canGrow; //@@@: return m_canGrow;
        }; //@@@: }

        self.setCanGrow = function(rhs) { //@@@: public void setCanGrow(bool rhs)
            m_canGrow = rhs; //@@@: m_canGrow = rhs;
        }; //@@@: }

        self.getNZOrder = function() { //@@@: public int getNZOrder()
            return m_nZOrder; //@@@: return m_nZOrder;
        }; //@@@: }

        self.setNZOrder = function(rhs) { //@@@: public void setNZOrder(int rhs)
            m_nZOrder = rhs; //@@@: m_nZOrder = rhs;
        }; //@@@: }

        self.getAlign = function() { //@@@: public HorizontalAlignment getAlign()
            return m_align; //@@@: return m_align;
        }; //@@@: }

        self.setAlign = function(rhs) { //@@@: public void setAlign(HorizontalAlignment rhs)
            m_align = rhs; //@@@: m_align = rhs;
        }; //@@@: }

        self.getTransparent = function() { //@@@: public bool getTransparent()
            return m_transparent; //@@@: return m_transparent;
        }; //@@@: }

        self.setTransparent = function(rhs) { //@@@: public void setTransparent(bool rhs)
            m_transparent = rhs; //@@@: m_transparent = rhs;
        }; //@@@: }

        self.getFormat = function() { //@@@: public String getFormat()
            return m_format; //@@@: return m_format;
        }; //@@@: }

        self.setFormat = function(rhs) { //@@@: public void setFormat(String rhs)
            m_format = rhs; //@@@: m_format = rhs;
        }; //@@@: }

        self.getSymbol = function() { //@@@: public String getSymbol()
            return m_symbol; //@@@: return m_symbol;
        }; //@@@: }

        self.setSymbol = function(rhs) { //@@@: public void setSymbol(String rhs)
            m_symbol = rhs; //@@@: m_symbol = rhs;
        }; //@@@: }

        self.getIsAccounting = function() { //@@@: public bool getIsAccounting()
            return m_isAccounting; //@@@: return m_isAccounting;
        }; //@@@: }

        self.setIsAccounting = function(rhs) { //@@@: public void setIsAccounting(bool rhs)
            m_isAccounting = rhs; //@@@: m_isAccounting = rhs;
        }; //@@@: }

        self.getWordWrap = function() { //@@@: public bool getWordWrap()
            return m_wordWrap; //@@@: return m_wordWrap;
        }; //@@@: }

        self.setWordWrap = function(rhs) { //@@@: public void setWordWrap(bool rhs)
            m_wordWrap = rhs; //@@@: m_wordWrap = rhs;
        }; //@@@: }

        self.getBorderRounded = function() { //@@@: public bool getBorderRounded()
            return m_borderRounded; //@@@: return m_borderRounded;
        }; //@@@: }

        self.setBorderRounded = function(rhs) { //@@@: public void setBorderRounded(bool rhs)
            m_borderRounded = rhs; //@@@: m_borderRounded = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Aspect"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Aspect");

            // we don't care if some property is missing

            try { m_align = xDoc.getNodeProperty(nodeObj, "Align").getValueInt(eTypes.eInteger); } //@@@: try { m_align = (HorizontalAlignment)xDoc.getNodeProperty(nodeObj, "Align").getValueInt(eTypes.eInteger); }
            catch  (ex) { } //@@@: catch { }
            try { m_backColor = xDoc.getNodeProperty(nodeObj, "BackColor").getValueInt(eTypes.eLong); } //@@@: try { m_backColor = xDoc.getNodeProperty(nodeObj, "BackColor").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_borderColor = xDoc.getNodeProperty(nodeObj, "BorderColor").getValueInt(eTypes.eLong); } //@@@: try { m_borderColor = xDoc.getNodeProperty(nodeObj, "BorderColor").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_borderColor3d = xDoc.getNodeProperty(nodeObj, "BorderColor3D").getValueInt(eTypes.eLong); } //@@@: try { m_borderColor3d = xDoc.getNodeProperty(nodeObj, "BorderColor3D").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_borderColor3dShadow = xDoc.getNodeProperty(nodeObj, "BorderColor3DShadow").getValueInt(eTypes.eLong); } //@@@: try { m_borderColor3dShadow = xDoc.getNodeProperty(nodeObj, "BorderColor3DShadow").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_borderType = xDoc.getNodeProperty(nodeObj, "BorderType").getValueInt(eTypes.eInteger); } //@@@: try { m_borderType = (csReportBorderType)xDoc.getNodeProperty(nodeObj, "BorderType").getValueInt(eTypes.eInteger); }
            catch  (ex) { } //@@@: catch { }
            try { m_borderWidth = xDoc.getNodeProperty(nodeObj, "BorderWidth").getValueInt(eTypes.eLong); } //@@@: try { m_borderWidth = xDoc.getNodeProperty(nodeObj, "BorderWidth").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong); } //@@@: try { m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_canGrow = xDoc.getNodeProperty(nodeObj, "CanGrow").getValueBool(eTypes.eBoolean); } //@@@: try { m_canGrow = xDoc.getNodeProperty(nodeObj, "CanGrow").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }
            try { m_left = xDoc.getNodeProperty(nodeObj, "Left").getValueInt(eTypes.eLong); } //@@@: try { m_left = xDoc.getNodeProperty(nodeObj, "Left").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_nZOrder = xDoc.getNodeProperty(nodeObj, "nZOrder").getValueInt(eTypes.eInteger); } //@@@: try { m_nZOrder = xDoc.getNodeProperty(nodeObj, "nZOrder").getValueInt(eTypes.eInteger); }
            catch  (ex) { } //@@@: catch { }
            try { m_selectColor = xDoc.getNodeProperty(nodeObj, "SelectColor").getValueInt(eTypes.eLong); } //@@@: try { m_selectColor = xDoc.getNodeProperty(nodeObj, "SelectColor").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong); } //@@@: try { m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong); } //@@@: try { m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_transparent = xDoc.getNodeProperty(nodeObj, "Transparent").getValueBool(eTypes.eBoolean); } //@@@: try { m_transparent = xDoc.getNodeProperty(nodeObj, "Transparent").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }
            try { m_format = xDoc.getNodeProperty(nodeObj, "Format").getValueString(eTypes.eText); } //@@@: try { m_format = xDoc.getNodeProperty(nodeObj, "Format").getValueString(eTypes.eText); }
            catch  (ex) { } //@@@: catch { }
            try { m_symbol = xDoc.getNodeProperty(nodeObj, "Symbol").getValueString(eTypes.eText); } //@@@: try { m_symbol = xDoc.getNodeProperty(nodeObj, "Symbol").getValueString(eTypes.eText); }
            catch  (ex) { } //@@@: catch { }
            try { m_isAccounting = xDoc.getNodeProperty(nodeObj, "IsAccounting").getValueBool(eTypes.eBoolean); } //@@@: try { m_isAccounting = xDoc.getNodeProperty(nodeObj, "IsAccounting").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }
            try { m_wordWrap = xDoc.getNodeProperty(nodeObj, "WordWrap").getValueBool(eTypes.eBoolean); } //@@@: try { m_wordWrap = xDoc.getNodeProperty(nodeObj, "WordWrap").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }
            try { m_borderRounded = xDoc.getNodeProperty(nodeObj, "BorderRounded").getValueBool(eTypes.eBoolean); } //@@@: try { m_borderRounded = xDoc.getNodeProperty(nodeObj, "BorderRounded").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }

            twipsToPixels(); //@@@: twipsToPixels();

            return m_font.load(xDoc, nodeObj); //@@@: return m_font.load(xDoc, nodeObj);
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            pixelsToTwips(); //@@@: pixelsToTwips();

            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Aspect"); //@@@: xProperty.setName("Aspect");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Align"); //@@@: xProperty.setName("Align");
            xProperty.setValue(eTypes.eInteger, m_align); //@@@: xProperty.setValue(eTypes.eInteger, m_align);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BackColor"); //@@@: xProperty.setName("BackColor");
            xProperty.setValue(eTypes.eLong, m_backColor); //@@@: xProperty.setValue(eTypes.eLong, m_backColor);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor"); //@@@: xProperty.setName("BorderColor");
            xProperty.setValue(eTypes.eLong, m_borderColor); //@@@: xProperty.setValue(eTypes.eLong, m_borderColor);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor3D"); //@@@: xProperty.setName("BorderColor3D");
            xProperty.setValue(eTypes.eLong, m_borderColor3d); //@@@: xProperty.setValue(eTypes.eLong, m_borderColor3d);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor3DShadow"); //@@@: xProperty.setName("BorderColor3DShadow");
            xProperty.setValue(eTypes.eLong, m_borderColor3dShadow); //@@@: xProperty.setValue(eTypes.eLong, m_borderColor3dShadow);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderType"); //@@@: xProperty.setName("BorderType");
            xProperty.setValue(eTypes.eInteger, m_borderType); //@@@: xProperty.setValue(eTypes.eInteger, m_borderType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderWidth"); //@@@: xProperty.setName("BorderWidth");
            xProperty.setValue(eTypes.eLong, m_borderWidth); //@@@: xProperty.setValue(eTypes.eLong, m_borderWidth);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CanGrow"); //@@@: xProperty.setName("CanGrow");
            xProperty.setValue(eTypes.eBoolean, m_canGrow); //@@@: xProperty.setValue(eTypes.eBoolean, m_canGrow);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Height"); //@@@: xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, m_height); //@@@: xProperty.setValue(eTypes.eLong, m_height);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Format"); //@@@: xProperty.setName("Format");
            xProperty.setValue(eTypes.eText, m_format); //@@@: xProperty.setValue(eTypes.eText, m_format);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Left"); //@@@: xProperty.setName("Left");
            xProperty.setValue(eTypes.eLong, m_left); //@@@: xProperty.setValue(eTypes.eLong, m_left);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("nZOrder"); //@@@: xProperty.setName("nZOrder");
            xProperty.setValue(eTypes.eInteger, m_nZOrder); //@@@: xProperty.setValue(eTypes.eInteger, m_nZOrder);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("SelectColor"); //@@@: xProperty.setName("SelectColor");
            xProperty.setValue(eTypes.eLong, m_selectColor); //@@@: xProperty.setValue(eTypes.eLong, m_selectColor);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top"); //@@@: xProperty.setName("Top");
            xProperty.setValue(eTypes.eLong, m_top); //@@@: xProperty.setValue(eTypes.eLong, m_top);

            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width"); //@@@: xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, m_width); //@@@: xProperty.setValue(eTypes.eLong, m_width);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Transparent"); //@@@: xProperty.setName("Transparent");
            xProperty.setValue(eTypes.eBoolean, m_transparent); //@@@: xProperty.setValue(eTypes.eBoolean, m_transparent);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Symbol"); //@@@: xProperty.setName("Symbol");
            xProperty.setValue(eTypes.eText, m_symbol); //@@@: xProperty.setValue(eTypes.eText, m_symbol);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsAccounting"); //@@@: xProperty.setName("IsAccounting");
            xProperty.setValue(eTypes.eBoolean, m_isAccounting); //@@@: xProperty.setValue(eTypes.eBoolean, m_isAccounting);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("WordWrap"); //@@@: xProperty.setName("WordWrap");
            xProperty.setValue(eTypes.eBoolean, m_wordWrap); //@@@: xProperty.setValue(eTypes.eBoolean, m_wordWrap);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderRounded"); //@@@: xProperty.setName("BorderRounded");
            xProperty.setValue(eTypes.eBoolean, m_borderRounded); //@@@: xProperty.setValue(eTypes.eBoolean, m_borderRounded);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            twipsToPixels(); //@@@: twipsToPixels();

            return m_font.save(xDoc, nodeObj); //@@@: return m_font.save(xDoc, nodeObj);
        }; //@@@: }

        const twipsToPixels = function() { //@@@: private void twipsToPixels()
            m_height = cUtil.tp(Convert.ToInt32(m_height)); //@@@: m_height = cUtil.tp(Convert.ToInt32(m_height));
            m_left = cUtil.tp(Convert.ToInt32(m_left)); //@@@: m_left = cUtil.tp(Convert.ToInt32(m_left));
            m_top = cUtil.tp(Convert.ToInt32(m_top)); //@@@: m_top = cUtil.tp(Convert.ToInt32(m_top));
            m_width = cUtil.tp(Convert.ToInt32(m_width)); //@@@: m_width = cUtil.tp(Convert.ToInt32(m_width));
        }; //@@@: }

        const pixelsToTwips = function() { //@@@: private void pixelsToTwips()
            m_height = cUtil.pt(Convert.ToInt32(m_height)); //@@@: m_height = cUtil.pt(Convert.ToInt32(m_height));
            m_left = cUtil.pt(Convert.ToInt32(m_left)); //@@@: m_left = cUtil.pt(Convert.ToInt32(m_left));
            m_top = cUtil.pt(Convert.ToInt32(m_top)); //@@@: m_top = cUtil.pt(Convert.ToInt32(m_top));
            m_width = cUtil.pt(Convert.ToInt32(m_width)); //@@@: m_width = cUtil.pt(Convert.ToInt32(m_width));
        }; //@@@: }
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
