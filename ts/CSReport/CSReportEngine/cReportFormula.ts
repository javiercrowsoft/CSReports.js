namespace CSReportEngine {

    import csRptWhenEval = CSReportGlobals.csRptWhenEval;
    import eTypes = CSKernelClient.eTypes;
    import XmlNode = CSXml.XmlNode;

    export class cReportFormula {

        private name: string = "";
        private text: string = "";
        private formulasInt: cReportFormulasInt = new cReportFormulasInt();
        private notSave: boolean = null;

        // when we compile a function we parse the text and extract
        // from the script all internal functions
        // every internal function is added to the collection this.FormulasInt
        // and replaced in the script by an String $$$n
        // n is the index of the function in this.FormulasInt
        // when we run the script every occurrence of $$$n is replaced for
        // the value of their corresponding function
        // finally if the text contains an script we evaluate this with the
        // ScriptControl
        //
        // compiled text of the function
        //
        private textC: string = "";
        private idxGroup: number = 0;
        private idxGroup2: number = -9999;
        private whenEval: csRptWhenEval = null;
        private haveToEval: boolean = null;
        private lastResult: object = null;

        // for debugging
        //
        private controlName: string = "";
        private sectionLineIndex: number = 0;
        private sectionName: string = "";

        private compiledScript: object = null;

        public constructor() {}

        public getCompiledScript() {
            return this.compiledScript;
        }

        public setCompiledScript(value: object) {
            this.compiledScript = value;
        }

        public getIdxGroup() {
            return this.idxGroup;
        }

        public setIdxGroup(rhs: number) {
            this.idxGroup = rhs;
        }

        public getIdxGroup2() {
            return this.idxGroup2;
        }

        public setIdxGroup2(rhs: number) {
            this.idxGroup2 = rhs;
        }

        public getWhenEval() {
            return this.whenEval;
        }

        public setWhenEval(rhs: csRptWhenEval) {
            this.whenEval = rhs;
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getText() {
            return this.text;
        }

        public setText(rhs: string) {
            this.text = rhs;
        }

        public getControlName() {
            return this.controlName;
        }

        public setControlName(rhs: string) {
            this.controlName = rhs;
        }

        public getSectionName() {
            return this.sectionName;
        }

        public setSectionName(rhs: string) {
            this.sectionName = rhs;
        }

        public getSectionLineIndex() {
            return this.sectionLineIndex;
        }

        public setSectionLineIndex(rhs: number) {
            this.sectionLineIndex = rhs;
        }

        public getFormulasInt() {
            return this.formulasInt;
        }

        public getTextC() {
            return this.textC;
        }

        public setTextC(rhs: string) {
            this.textC = rhs;
        }

        public getNotSave() {
            return this.notSave;
        }

        public setNotSave(rhs: boolean) {
            this.notSave = rhs;
        }

        public getHaveToEval() {
            return this.haveToEval;
        }

        public setHaveToEval(rhs: boolean) {
            this.haveToEval = rhs;
        }

        public getLastResult() {
            return this.lastResult;
        }

        public setLastResult(rhs: object) {
            this.lastResult = rhs;
        }

        public copy(from: cReportFormula) {
            if(from !== null) {
                this.name = from.getName();
                this.text = from.getText();
                this.idxGroup = from.getIdxGroup();
                this.whenEval = from.getWhenEval();
            }
            return true;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, this.name);

            if(nodeObj !== null) {
                this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
                this.text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText);
                this.idxGroup = xDoc.getNodeProperty(nodeObj, "idxGroup").getValueInt(eTypes.eLong);
                this.whenEval = xDoc.getNodeProperty(nodeObj, "WhenEval").getValueInt(eTypes.eInteger);
            }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            const xProperty = new CSXml.cXmlProperty();
            xProperty.setName(this.name);
            const nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Text");
            xProperty.setValue(eTypes.eText, this.text);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("idxGroup");
            xProperty.setValue(eTypes.eLong, this.idxGroup);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("WhenEval");
            xProperty.setValue(eTypes.eInteger, this.whenEval);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            return true;
        }

        toString() {
            return "name: " + this.name + ",whenEval: " + this.whenEval;
        }

    }
}
