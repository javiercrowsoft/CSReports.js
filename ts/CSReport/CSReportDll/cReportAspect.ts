namespace CSReportDll {

    import csColors = CSReportGlobals.csColors;
    import HorizontalAlignment = CSReportGlobals.HorizontalAlignment;
    import csReportBorderType = CSReportGlobals.csReportBorderType;
    import XmlNode = CSXml.XmlNode;
    import eTypes = CSKernelClient.eTypes;
    import Utils = CSOAPI.Utils;

    export class cReportAspect {

        private left: number = 0;
        private top: number = 0;
        private height: number = 0;
        private width: number = 0;
        private backColor: string = csColors.WHITE;
        private borderWidth: number = 0;
        private borderType: csReportBorderType = null;
        private borderColor: string = csColors.BLACK;
        private borderColor3d: string = csColors.BLACK;
        private borderColor3dShadow: string = csColors.BLACK;
        private selectColor: string = csColors.BLACK;
        private font: cReportFont = new cReportFont();
        private canGrow: boolean = null;
        private nZOrder: number = 0;
        private align: HorizontalAlignment = HorizontalAlignment.Left;
        private transparent: boolean = null;
        private format: string = "";
        private symbol: string = "";
        private isAccounting: boolean = null;
        private wordWrap: boolean = null;
        private borderRounded: boolean = null;
        private offset: number = 0;

        public setOffset(rhs: number) {
            this.offset = rhs;
        }

        public getOffset() {
            return this.offset;
        }

        public getLeft() {
            return this.left;
        }

        public setLeft(rhs: number) {
            this.left = rhs;
        }

        public getTop() {
            return this.top;
        }

        public setTop(rhs: number) {
            this.top = rhs;
        }

        public getWidth() {
            return this.width;
        }

        public setWidth(rhs: number) {
            this.width = rhs;
        }

        public getHeight() {
            return this.height;
        }

        public setHeight(rhs: number) {
            if(rhs < 1) { rhs = 1; }
            this.height = rhs;
        }

        public getBackColor() {
            return this.backColor;
        }

        public setBackColor(rhs: string) {
            this.backColor = rhs;
        }

        public getBorderWidth() {
            return this.borderWidth;
        }

        public setBorderWidth(rhs: number) {
            this.borderWidth = rhs;
        }

        public getBorderType() {
            return this.borderType;
        }

        public setBorderType(rhs: csReportBorderType) {
            this.borderType = rhs;
        }

        public getBorderColor() {
            return this.borderColor;
        }

        public setBorderColor(rhs: string) {
            this.borderColor = rhs;
        }

        public getBorderColor3d() {
            return this.borderColor3d;
        }

        public setBorderColor3d(rhs: string) {
            this.borderColor3d = rhs;
        }

        public getBorderColor3dShadow() {
            return this.borderColor3dShadow;
        }

        public setBorderColor3dShadow(rhs: string) {
            this.borderColor3dShadow = rhs;
        }

        public getSelectColor() {
            return this.selectColor;
        }

        public setSelectColor(rhs: string) {
            this.selectColor = rhs;
        }

        public getFont() {
            return this.font;
        }

        public setFont(rhs: cReportFont) {
            this.font = rhs;
        }

        public getCanGrow() {
            return this.canGrow;
        }

        public setCanGrow(rhs: boolean) {
            this.canGrow = rhs;
        }

        public getNZOrder() {
            return this.nZOrder;
        }

        public setNZOrder(rhs: number) {
            this.nZOrder = rhs;
        }

        public getAlign() {
            return this.align;
        }

        public setAlign(rhs: HorizontalAlignment) {
            this.align = rhs;
        }

        public getTransparent() {
            return this.transparent;
        }

        public setTransparent(rhs: boolean) {
            this.transparent = rhs;
        }

        public getFormat() {
            return this.format;
        }

        public setFormat(rhs: string) {
            this.format = rhs;
        }

        public getSymbol() {
            return this.symbol;
        }

        public setSymbol(rhs: string) {
            this.symbol = rhs;
        }

        public getIsAccounting() {
            return this.isAccounting;
        }

        public setIsAccounting(rhs: boolean) {
            this.isAccounting = rhs;
        }

        public getWordWrap() {
            return this.wordWrap;
        }

        public setWordWrap(rhs: boolean) {
            this.wordWrap = rhs;
        }

        public getBorderRounded() {
            return this.borderRounded;
        }

        public setBorderRounded(rhs: boolean) {
            this.borderRounded = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Aspect");

            // we don't care if some property is missing

            try { this.align = xDoc.getNodeProperty(nodeObj, "Align").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { this.backColor = xDoc.getNodeProperty(nodeObj, "BackColor").getValueString(eTypes.eLong); }
            catch  (ex) { }
            try { this.borderColor = xDoc.getNodeProperty(nodeObj, "BorderColor").getValueString(eTypes.eLong); }
            catch  (ex) { }
            try { this.borderColor3d = xDoc.getNodeProperty(nodeObj, "BorderColor3D").getValueString(eTypes.eLong); }
            catch  (ex) { }
            try { this.borderColor3dShadow = xDoc.getNodeProperty(nodeObj, "BorderColor3DShadow").getValueString(eTypes.eLong); }
            catch  (ex) { }
            try { this.borderType = xDoc.getNodeProperty(nodeObj, "BorderType").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { this.borderWidth = xDoc.getNodeProperty(nodeObj, "BorderWidth").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { this.height = xDoc.getNodeProperty(nodeObj, "Height").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { this.canGrow = xDoc.getNodeProperty(nodeObj, "CanGrow").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { this.left = xDoc.getNodeProperty(nodeObj, "Left").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { this.nZOrder = xDoc.getNodeProperty(nodeObj, "nZOrder").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { this.selectColor = xDoc.getNodeProperty(nodeObj, "SelectColor").getValueString(eTypes.eLong); }
            catch  (ex) { }
            try { this.top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { this.width = xDoc.getNodeProperty(nodeObj, "Width").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { this.transparent = xDoc.getNodeProperty(nodeObj, "Transparent").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { this.format = xDoc.getNodeProperty(nodeObj, "Format").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { this.symbol = xDoc.getNodeProperty(nodeObj, "Symbol").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { this.isAccounting = xDoc.getNodeProperty(nodeObj, "IsAccounting").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { this.wordWrap = xDoc.getNodeProperty(nodeObj, "WordWrap").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { this.borderRounded = xDoc.getNodeProperty(nodeObj, "BorderRounded").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }

            this.twipsToPixels();

            return this.font.load(xDoc, nodeObj);
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            this.pixelsToTwips();

            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Aspect");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Align");
            xProperty.setValue(eTypes.eInteger, this.align);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BackColor");
            xProperty.setValue(eTypes.eLong, this.backColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor");
            xProperty.setValue(eTypes.eLong, this.borderColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor3D");
            xProperty.setValue(eTypes.eLong, this.borderColor3d);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderColor3DShadow");
            xProperty.setValue(eTypes.eLong, this.borderColor3dShadow);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderType");
            xProperty.setValue(eTypes.eInteger, this.borderType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderWidth");
            xProperty.setValue(eTypes.eLong, this.borderWidth);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("CanGrow");
            xProperty.setValue(eTypes.eBoolean, this.canGrow);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Height");
            xProperty.setValue(eTypes.eLong, this.height);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Format");
            xProperty.setValue(eTypes.eText, this.format);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Left");
            xProperty.setValue(eTypes.eLong, this.left);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("nZOrder");
            xProperty.setValue(eTypes.eInteger, this.nZOrder);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("SelectColor");
            xProperty.setValue(eTypes.eLong, this.selectColor);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top");
            xProperty.setValue(eTypes.eLong, this.top);

            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Width");
            xProperty.setValue(eTypes.eLong, this.width);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Transparent");
            xProperty.setValue(eTypes.eBoolean, this.transparent);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Symbol");
            xProperty.setValue(eTypes.eText, this.symbol);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsAccounting");
            xProperty.setValue(eTypes.eBoolean, this.isAccounting);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("WordWrap");
            xProperty.setValue(eTypes.eBoolean, this.wordWrap);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BorderRounded");
            xProperty.setValue(eTypes.eBoolean, this.borderRounded);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            this.twipsToPixels();

            return this.font.save(xDoc, nodeObj);
        }

        private twipsToPixels() {
            this.height = Utils.tp(Math.trunc(this.height));
            this.left = Utils.tp(Math.trunc(this.left));
            this.top = Utils.tp(Math.trunc(this.top));
            this.width = Utils.tp(Math.trunc(this.width));
        }

        private pixelsToTwips() {
            this.height = Utils.pt(Math.trunc(this.height));
            this.left = Utils.pt(Math.trunc(this.left));
            this.top = Utils.pt(Math.trunc(this.top));
            this.width = Utils.pt(Math.trunc(this.width));
        }

        toString() {
            return "height: " + this.height + ", width: " + this.width + ", foreColor: " + this.getFont().getForeColor();
        }
    }
}
