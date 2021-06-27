namespace CSReportDll {

    import csRptSectionType = CSReportGlobals.csRptSectionType;

    export class cReportSection {

        private sectionLines: cReportSectionLines = new cReportSectionLines();
        private aspect: cReportAspect = new cReportAspect();
        private index: number = 0;
        private realIndex: number = 0;
        private key: string = "";
        private name: string = "";
        private keyPaint: string = "";
        private formulaHide: cReportFormula = new cReportFormula();
        private hasFormulaHide: boolean = null;

        public constructor() {
            this.formulaHide.setName("H");

            // when a new section is create a new line section 
            // is automatically added
            // 
            this.sectionLines.add(null, "", -1);
        }

        public getSectionLines() {
            return this.sectionLines;
        }

        public setSectionLines(rhs: cReportSectionLines) {
            this.sectionLines = rhs;
        }

        public getAspect() {
            return this.aspect;
        }

        public setAspect(rhs: cReportAspect) {
            this.aspect = rhs;
        }

        public getIndex() {
            return this.index;
        }

        public setIndex(rhs: number) {
            this.index = rhs;
        }

        public getRealIndex() {
            return this.realIndex;
        }

        public setRealIndex(rhs: number) {
            this.realIndex = rhs;
        }

        public getKey() {
            return this.key;
        }

        public setKey(rhs: string) {
            this.key = rhs;
        }

        public getTypeSection() {
            return this.sectionLines.getTypeSection();
        }

        public setTypeSection(rhs: csRptSectionType) {
            this.sectionLines.setTypeSection(rhs);
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public setCopyColl(rhs: cReportControls2) {
            if (this.sectionLines !== null) {
                this.sectionLines.setCopyColl(rhs);
            }
        }

        public getKeyPaint() {
            return this.keyPaint;
        }

        public setKeyPaint(rhs: string) {
            this.keyPaint = rhs;
        }

        public getHasFormulaHide() {
            return this.hasFormulaHide;
        }

        public setHasFormulaHide(rhs: boolean) {
            this.hasFormulaHide = rhs;
        }

        public getFormulaHide() {
            return this.formulaHide;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            let nodeObjSecLn: XmlNode = null;
            let nodeObjAspect: XmlNode = null;
            let secLn: cReportSectionLine = null;

            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            this.index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);

            setTypeSection(xDoc.getNodeProperty(nodeObj, "TypeSection").getValueInt(eTypes.eInteger));
            this.hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean);

            nodeObjAspect = nodeObj;
            if (!this.aspect.load(xDoc, nodeObjAspect)) {
                return false;
            }

            let nodeObjAux: XmlNode = nodeObj;
            if (!this.formulaHide.load(xDoc, nodeObjAux)) {
                return false;
            }

            this.sectionLines.clear();

            nodeObj = xDoc.getNodeFromNode(nodeObj, C_NODERPTSECTIONLINES);
            if (xDoc.nodeHasChild(nodeObj)) {
                nodeObjSecLn = xDoc.getNodeChild(nodeObj);
                while (nodeObjSecLn !== null) {
                    let key: string = xDoc.getNodeProperty(nodeObjSecLn, "Key").getValueString(eTypes.eText);
                    secLn = this.sectionLines.add(null, key, -1);
                    if (!secLn.load(xDoc, nodeObjSecLn)) {
                        return false;
                    }
                    secLn.setSectionName(this.name);
                    nodeObjSecLn = xDoc.getNextNode(nodeObjSecLn);
                }
            }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(this.key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, this.key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice");
            xProperty.setValue(eTypes.eInteger, this.index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeSection");
            xProperty.setValue(eTypes.eInteger, getTypeSection());
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaHide");
            xProperty.setValue(eTypes.eBoolean, this.hasFormulaHide);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            if (!this.aspect.save(xDoc, nodeObj))  {
                return false; 
            }
            if (!this.formulaHide.save(xDoc, nodeObj))  {
                return false; 
            }

            xProperty.setName(C_NODERPTSECTIONLINES);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let seccLn: cReportSectionLine = null;
            for(let _i = 0; _i < this.sectionLines.count(); _i++) {
                seccLn = this.sectionLines.item(_i);
                seccLn.save(xDoc, nodeObj);
            }

            return true;
        }
    }
}
