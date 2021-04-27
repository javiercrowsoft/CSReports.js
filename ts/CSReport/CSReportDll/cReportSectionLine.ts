namespace CSReportDll {

    export class cReportSectionLine {

        private controls: cReportControls = new cReportControls();
        private aspect: cReportAspect = new cReportAspect();
        private index: number = 0;
        private realIndex: number = 0;
        private key: string = "";
        private keyPaint: string = "";
        private formulaHide: cReportFormula = new cReportFormula();
        private hasFormulaHide: boolean = null;

        // it is the name of the control which have the id of the line
        // it is used by cReportLinkServer
        // when a user makes double clic over a line in a preview report
        // window the showDetails() event of cReportLinkServer will be raised
        // a listener for this event could use this property to know which
        // control contains the id of the record expressed in the line selected
        // by the user.
        //
        private idField: string = "";

        // for debugging
        //
        private sectionName: string = "";

        public constructor() {
            this.controls.setSectionLine(this);
            this.formulaHide.setName("H");
        }

        public getKeyPaint() {
            return this.keyPaint;
        }

        public setKeyPaint(rhs: string) {
            this.keyPaint = rhs;
        }

        public getControls() {
            return this.controls;
        }

        public setControls(rhs: cReportControls) {
            this.controls = rhs;
        }

        public getIdField() {
            return this.idField;
        }

        public setIdField(rhs: string) {
            this.idField = rhs;
        }

        public getKey() {
            return this.key;
        }

        public setKey(rhs: string) {
            this.key = rhs;
        }

        public getAspect() {
            return this.aspect;
        }

        public setAspect(rhs: cReportAspect) {
            this.aspect = rhs;
        }

        public getName() {
            return "SL: " + this.index.toString();
        }

        public setName(name: string) {
            // shouldn't be called :P
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

        public getHasFormulaHide() {
            return this.hasFormulaHide;
        }

        public setHasFormulaHide(rhs: boolean) {
            this.hasFormulaHide = rhs;
        }

        public getFormulaHide() {
            return this.formulaHide;
        }

        public getTypeSection() {
            return this.controls.getTypeSection();
        }

        public setTypeSection(rhs: csRptSectionType) {
            this.controls.setTypeSection(rhs);
        }

        public getSectionName() {
            return this.sectionName;
        }

        public setSectionName(rhs: string) {
            this.sectionName = rhs;
        }

        public setCopyColl(rhs: cReportControls2) {
            if (this.controls !== null) {
                this.controls.setCopyColl(rhs);
            }
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            let nodeObjCtrls: XmlNode = null;
            let nodeObjCtrl: XmlNode = null;
            let nodeObjAspect: XmlNode = null;

            let ctrl: cReportControl = null;

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            this.index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);
            this.idField = xDoc.getNodeProperty(nodeObj, "IdField").getValueString(eTypes.eText);
            this.hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean);

            nodeObjAspect = nodeObj;

            let nodeObjAux: XmlNode = nodeObj;
            if (!this.formulaHide.load(xDoc, nodeObjAux))  {
                return false; 
            }

            if (!this.aspect.load(xDoc, nodeObjAspect))  {
                return false; 
            }

            nodeObjCtrls = xDoc.getNodeFromNode(nodeObj, C_NODERPTCONTROLS);

            if (xDoc.nodeHasChild(nodeObjCtrls))  {
                nodeObjCtrl = xDoc.getNodeChild(nodeObjCtrls);

                while (nodeObjCtrl !== null) {
                    let key: string = xDoc.getNodeProperty(nodeObjCtrl, "Key").getValueString(eTypes.eText);
                    ctrl = this.controls.add(null, key);
                    if (!ctrl.load(xDoc, nodeObjCtrl))  {
                        return false; 
                    }
                    nodeObjCtrl = xDoc.getNextNode(nodeObjCtrl);
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

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, this.key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice");
            xProperty.setValue(eTypes.eInteger, this.index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IdField");
            xProperty.setValue(eTypes.eText, this.idField);
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

            xProperty.setName(C_NODERPTCONTROLS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let ctrl: cReportControl = null;
            for(var _i = 0; _i < this.controls.count(); _i++) {
                ctrl = this.controls.item(_i);
                ctrl.save(xDoc, nodeObj);
            }

            return true;
        }
    }
}
