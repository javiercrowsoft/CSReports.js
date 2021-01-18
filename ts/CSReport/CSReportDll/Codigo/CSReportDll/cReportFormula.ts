

namespace CSReportDll
{

    export class cReportFormula {


    {

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
        // finaly if the text contains an script we evalute this with the
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

        private compiledScript: Assembly = null;

        public getCompiledScript() {
            return this.compiledScript;
        }

        public setCompiledScript(value: Assembly) {
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

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, this.name);

            if (nodeObj !== null) {
                this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
                this.text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText);
                this.idxGroup = xDoc.getNodeProperty(nodeObj, "idxGroup").getValueInt(eTypes.eLong);
                this.whenEval = xDoc.getNodeProperty(nodeObj, "WhenEval").getValueInt(eTypes.eInteger);
            }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(this.name);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

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



    }    }



}
