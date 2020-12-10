(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportAspect = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportAspect = {};

        let m_left: number = 0;
        let m_top: number = 0;
        let m_height: number = 0;
        let m_width: number = 0;
        let m_backColor: number = csColors.C_COLOR_WHITE;
        let m_borderWidth: number = 0;
        let m_borderType: csReportBorderType = null;
        let m_borderColor: number = csColors.C_COLOR_BLACK;
        let m_borderColor3d: number = 0;
        let m_borderColor3dShadow: number = 0;
        let m_selectColor: number = 0;
        let m_font: cReportFont = new cReportFont();
        let m_canGrow: boolean = null;
        let m_nZOrder: number = 0;
        let m_align: HorizontalAlignment = HorizontalAlignment.Left;
        let m_transparent: boolean = null;
        let m_format: string = "";
        let m_symbol: string = "";
        let m_isAccounting: boolean = null;
        let m_wordWrap: boolean = null;
        let m_borderRounded: boolean = null;
        let m_offset: number = 0;

        self.setOffset = function(rhs) {
            m_offset = rhs;
        };

        self.getOffset = function() {
            return m_offset;
        };

        self.getLeft = function() {
            return m_left;
        };

        self.setLeft = function(rhs) {
            m_left = rhs;
        };

        self.getTop = function() {
            return m_top;
        };

        self.setTop = function(rhs) {
            m_top = rhs;
        };

        self.getWidth = function() {
            return m_width;
        };

        self.setWidth = function(rhs) {
            m_width = rhs;
        };

        self.getHeight = function() {
            return m_height;
        };

        self.setHeight = function(rhs) {
            if (rhs < 1) { rhs = 1; }
            m_height = rhs;
        };

        self.getBackColor = function() {
            return m_backColor;
        };

        self.setBackColor = function(rhs) {
            m_backColor = rhs;
        };

        self.getBorderWidth = function() {
            return m_borderWidth;
        };

        self.setBorderWidth = function(rhs) {
            m_borderWidth = rhs;
        };

        self.getBorderType = function() {
            return m_borderType;
        };

        self.setBorderType = function(rhs) {
            m_borderType = rhs;
        };

        self.getBorderColor = function() {
            return m_borderColor;
        };

        self.setBorderColor = function(rhs) {
            m_borderColor = rhs;
        };

        self.getBorderColor3d = function() {
            return m_borderColor3d;
        };

        self.setBorderColor3d = function(rhs) {
            m_borderColor3d = rhs;
        };

        self.getBorderColor3dShadow = function() {
            return m_borderColor3dShadow;
        };

        self.setBorderColor3dShadow = function(rhs) {
            m_borderColor3dShadow = rhs;
        };

        self.getSelectColor = function() {
            return m_selectColor;
        };

        self.setSelectColor = function(rhs) {
            m_selectColor = rhs;
        };

        self.getFont = function() {
            return m_font;
        };

        self.setFont = function(rhs) {
            m_font = rhs;
        };

        self.getCanGrow = function() {
            return m_canGrow;
        };

        self.setCanGrow = function(rhs) {
            m_canGrow = rhs;
        };

        self.getNZOrder = function() {
            return m_nZOrder;
        };

        self.setNZOrder = function(rhs) {
            m_nZOrder = rhs;
        };

        self.getAlign = function() {
            return m_align;
        };

        self.setAlign = function(rhs) {
            m_align = rhs;
        };

        self.getTransparent = function() {
            return m_transparent;
        };

        self.setTransparent = function(rhs) {
            m_transparent = rhs;
        };

        self.getFormat = function() {
            return m_format;
        };

        self.setFormat = function(rhs) {
            m_format = rhs;
        };

        self.getSymbol = function() {
            return m_symbol;
        };

        self.setSymbol = function(rhs) {
            m_symbol = rhs;
        };

        self.getIsAccounting = function() {
            return m_isAccounting;
        };

        self.setIsAccounting = function(rhs) {
            m_isAccounting = rhs;
        };

        self.getWordWrap = function() {
            return m_wordWrap;
        };

        self.setWordWrap = function(rhs) {
            m_wordWrap = rhs;
        };

        self.getBorderRounded = function() {
            return m_borderRounded;
        };

        self.setBorderRounded = function(rhs) {
            m_borderRounded = rhs;
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Aspect");

            // we don't care if some property is missing

            try { m_align = xDoc.getNodeProperty(nodeObj, "Align").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { m_backColor = xDoc.getNodeProperty(nodeObj, "BackColor").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_borderColor = xDoc.getNodeProperty(nodeObj, "BorderColor").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_borderColor3d = xDoc.getNodeProperty(nodeObj, "BorderColor3D").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_borderColor3dShadow = xDoc.getNodeProperty(nodeObj, "BorderColor3DShadow").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_borderType = xDoc.getNodeProperty(nodeObj, "BorderType").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { m_borderWidth = xDoc.getNodeProperty(nodeObj, "BorderWidth").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_canGrow = xDoc.getNodeProperty(nodeObj, "CanGrow").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { m_left = xDoc.getNodeProperty(nodeObj, "Left").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_nZOrder = xDoc.getNodeProperty(nodeObj, "nZOrder").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { m_selectColor = xDoc.getNodeProperty(nodeObj, "SelectColor").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { m_transparent = xDoc.getNodeProperty(nodeObj, "Transparent").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { m_format = xDoc.getNodeProperty(nodeObj, "Format").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { m_symbol = xDoc.getNodeProperty(nodeObj, "Symbol").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { m_isAccounting = xDoc.getNodeProperty(nodeObj, "IsAccounting").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { m_wordWrap = xDoc.getNodeProperty(nodeObj, "WordWrap").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { m_borderRounded = xDoc.getNodeProperty(nodeObj, "BorderRounded").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }

            twipsToPixels();

            return m_font.load(xDoc, nodeObj);
        };

        self.save = function(xDoc, nodeFather) {
            pixelsToTwips();

            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = UNKNOWN >>  can't find constructor for class CSXml.cXmlProperty();

            xProperty.setName("Aspect");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Align");
            xProperty.setValue(eTypes.eInteger, m_align);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BackColor");
            xProperty.setValue(eTypes.eLong, m_backColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor");
            xProperty.setValue(eTypes.eLong, m_borderColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor3D");
            xProperty.setValue(eTypes.eLong, m_borderColor3d);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor3DShadow");
            xProperty.setValue(eTypes.eLong, m_borderColor3dShadow);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderType");
            xProperty.setValue(eTypes.eInteger, m_borderType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderWidth");
            xProperty.setValue(eTypes.eLong, m_borderWidth);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CanGrow");
            xProperty.setValue(eTypes.eBoolean, m_canGrow);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, m_height);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Format");
            xProperty.setValue(eTypes.eText, m_format);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Left");
            xProperty.setValue(eTypes.eLong, m_left);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("nZOrder");
            xProperty.setValue(eTypes.eInteger, m_nZOrder);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("SelectColor");
            xProperty.setValue(eTypes.eLong, m_selectColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top");
            xProperty.setValue(eTypes.eLong, m_top);

            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, m_width);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Transparent");
            xProperty.setValue(eTypes.eBoolean, m_transparent);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Symbol");
            xProperty.setValue(eTypes.eText, m_symbol);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsAccounting");
            xProperty.setValue(eTypes.eBoolean, m_isAccounting);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("WordWrap");
            xProperty.setValue(eTypes.eBoolean, m_wordWrap);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderRounded");
            xProperty.setValue(eTypes.eBoolean, m_borderRounded);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            twipsToPixels();

            return m_font.save(xDoc, nodeObj);
        };

        const twipsToPixels = function() {
            m_height = cUtil.tp(Convert.ToInt32(m_height));
            m_left = cUtil.tp(Convert.ToInt32(m_left));
            m_top = cUtil.tp(Convert.ToInt32(m_top));
            m_width = cUtil.tp(Convert.ToInt32(m_width));
        };

        const pixelsToTwips = function() {
            m_height = cUtil.pt(Convert.ToInt32(m_height));
            m_left = cUtil.pt(Convert.ToInt32(m_left));
            m_top = cUtil.pt(Convert.ToInt32(m_top));
            m_width = cUtil.pt(Convert.ToInt32(m_width));
        };
        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportAspect {

    setOffset: (float) => void;
    getOffset: () => float;
    getLeft: () => float;
    setLeft: (float) => void;
    getTop: () => float;
    setTop: (float) => void;
    getWidth: () => float;
    setWidth: (float) => void;
    getHeight: () => float;
    setHeight: (float) => void;
    getBackColor: () => int;
    setBackColor: (int) => void;
    getBorderWidth: () => float;
    setBorderWidth: (float) => void;
    getBorderType: () => csReportBorderType;
    setBorderType: (csReportBorderType) => void;
    getBorderColor: () => int;
    setBorderColor: (int) => void;
    getBorderColor3d: () => int;
    setBorderColor3d: (int) => void;
    getBorderColor3dShadow: () => int;
    setBorderColor3dShadow: (int) => void;
    getSelectColor: () => int;
    setSelectColor: (int) => void;
    getFont: () => cReportFont;
    setFont: (cReportFont) => void;
    getCanGrow: () => bool;
    setCanGrow: (bool) => void;
    getNZOrder: () => int;
    setNZOrder: (int) => void;
    getAlign: () => HorizontalAlignment;
    setAlign: (HorizontalAlignment) => void;
    getTransparent: () => bool;
    setTransparent: (bool) => void;
    getFormat: () => String;
    setFormat: (String) => void;
    getSymbol: () => String;
    setSymbol: (String) => void;
    getIsAccounting: () => bool;
    setIsAccounting: (bool) => void;
    getWordWrap: () => bool;
    setWordWrap: (bool) => void;
    getBorderRounded: () => bool;
    setBorderRounded: (bool) => void;
    load: (CSXml.cXml, XmlNode) => bool;
    save: (CSXml.cXml, XmlNode) => bool;
  }
}
