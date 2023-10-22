namespace CSReportEngine {

    import eTypes = CSKernelClient.eTypes;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import csRptControlType = CSReportGlobals.csRptControlType;
    import XmlNode = CSXml.XmlNode;

    export class cReportControl {

        private label: cReportLabel = new cReportLabel();
        private image: cReportImage = new cReportImage();
        private line: cReportLine = new cReportLine();
        private field: cReportField = new cReportField();
        private typeSection: csRptSectionType = null;
        private key: string = "";
        private keyPaint: string = "";
        private name: string = "";
        private hasFormulaHide: boolean = null;
        private hasFormulaValue: boolean = null;
        private controlType: csRptControlType = null;
        private formulaHide: cReportFormula = new cReportFormula();
        private formulaValue: cReportFormula = new cReportFormula();
        private chart: cReportChart = new cReportChart();
        private tag: string = "";
        private exportColIdx: number = 0;
        private isFreeCtrl: boolean = null;

        // this reference tell in which section line is this control
        //
        private sectionLine: cReportSectionLine = null;

        public constructor() {
            this.formulaHide.setName("H");
            this.formulaValue.setName("V");
        }

        public getLabel() {
            return this.label;
        }

        public setLabel(rhs: cReportLabel) {
            this.label = rhs;
        }

        public getImage() {
            return this.image;
        }

        public setImage(rhs: cReportImage) {
            this.image = rhs;
        }

        public getFormulaHide() {
            return this.formulaHide;
        }

        public getFormulaValue() {
            return this.formulaValue;
        }

        public getHasFormulaValue() {
            return this.hasFormulaValue;
        }

        public setHasFormulaValue(rhs: boolean) {
            this.hasFormulaValue = rhs;
        }

        public getLine() {
            return this.line;
        }

        public setLine(rhs: cReportLine) {
            this.line = rhs;
        }

        public getField() {
            return this.field;
        }

        public setField(rhs: cReportField) {
            this.field = rhs;
        }

        public getKey() {
            return this.key;
        }

        public setKey(rhs: string) {
            this.key = rhs;
        }

        public getKeyPaint() {
            return this.keyPaint;
        }

        public setKeyPaint(rhs: string) {
            this.keyPaint = rhs;
        }

        public getChart() {
            return this.chart;
        }

        public getTag() {
            return this.tag;
        }

        public setTag(rhs: string) {
            this.tag = rhs;
        }

        public getTypeSection() {
            return this.typeSection;
        }

        public setTypeSection(rhs: csRptSectionType) {
            this.typeSection = rhs;
        }

        public getSectionLine() {
            return this.sectionLine;
        }

        public setSectionLine(rhs: cReportSectionLine) {
            this.sectionLine = rhs;
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getHasFormulaHide() {
            return this.hasFormulaHide;
        }

        public setHasFormulaHide(rhs: boolean) {
            this.hasFormulaHide = rhs;
        }

        public getControlType() {
            return this.controlType;
        }

        public setControlType(rhs: csRptControlType) {
            this.controlType = rhs;
        }

        public setExportColIdx(rhs: number) {
            this.exportColIdx = rhs;
        }

        public getExportColIdx() {
            return this.exportColIdx;
        }

        public setIsFreeCtrl(rhs: boolean) {
            this.isFreeCtrl = rhs;
        }

        public getIsFreeCtrl() {
            return this.isFreeCtrl;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.keyPaint = xDoc.getNodeProperty(nodeObj, "KeyPaint").getValueString(eTypes.eText);
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            try { this.hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { this.hasFormulaValue = xDoc.getNodeProperty(nodeObj, "HasFormulaValue").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }
            try { this.controlType = xDoc.getNodeProperty(nodeObj, "ControlType").getValueInt(eTypes.eInteger); }
            catch  (ex) { }
            try { this.tag = xDoc.getNodeProperty(nodeObj, "Tag").getValueString(eTypes.eText); }
            catch  (ex) { }
            try { this.exportColIdx = xDoc.getNodeProperty(nodeObj, "ExportColIdx").getValueInt(eTypes.eLong); }
            catch  (ex) { }
            try { this.isFreeCtrl = xDoc.getNodeProperty(nodeObj, "IsFreeCtrl").getValueBool(eTypes.eBoolean); }
            catch  (ex) { }

            try {
                if(!this.field.load(xDoc, nodeObj)) { return false; }
                if(!this.image.load(xDoc, nodeObj)) { return false; }
                if(!this.label.load(xDoc, nodeObj)) { return false; }
                if(!this.line.load(xDoc, nodeObj)) { return false; }
                if(!this.formulaHide.load(xDoc, nodeObj)) { return false; }
                if(!this.formulaValue.load(xDoc, nodeObj)) { return false; }
                if(!this.chart.load(xDoc, nodeObj)) { return false; }

                // TODO: remove me after all reports were migrated
                //
                if(this.label.getAspect().getFormat() === "" && this.field.getFieldType() === CSDatabase.csAdoDataType.adDBTimeStamp) {
                    this.label.getAspect().setFormat("dd/MM/yyyy");
                }

                return true;
            }
            catch(ignore)  {
                return false;
            }
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(this.key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, this.key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("KeyPaint");
            xProperty.setValue(eTypes.eText, this.keyPaint);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaHide");
            xProperty.setValue(eTypes.eBoolean, this.hasFormulaHide);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaValue");
            xProperty.setValue(eTypes.eBoolean, this.hasFormulaValue);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ControlType");
            xProperty.setValue(eTypes.eInteger, this.controlType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Tag");
            xProperty.setValue(eTypes.eText, this.tag);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ExportColIdx");
            xProperty.setValue(eTypes.eLong, this.exportColIdx);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsFreeCtrl");
            xProperty.setValue(eTypes.eBoolean, this.isFreeCtrl);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            if(!this.field.save(xDoc, nodeObj)) { return false; }
            if(!this.image.save(xDoc, nodeObj)) { return false; }
            if(!this.label.save(xDoc, nodeObj)) { return false; }
            if(!this.line.save(xDoc, nodeObj)) { return false; }
            if(!this.formulaHide.save(xDoc, nodeObj)) { return false; }
            if(!this.formulaValue.save(xDoc, nodeObj)) { return false; }
            if(!this.chart.save(xDoc, nodeObj)) { return false; }
            return true;
        }
    }
}
