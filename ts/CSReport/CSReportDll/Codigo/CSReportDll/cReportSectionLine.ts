

namespace CSReportDll
{

    export class cReportSectionLine {


    {

        private C_NODERPTCONTROLS: string = "RptControls";

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
            return "SL: " + this.index.ToString();
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

        // Implement IDisposable.
        // Do not make this method virtual.
        // A derived class should not be able to override this method.
        public Dispose() {
            Dispose(true);
            // This object will be cleaned up by the Dispose method.
            // Therefore, you should call GC.SupressFinalize to
            // take this object off the finalization queue
            // and prevent finalization code for this object
            // from executing a second time.
            GC.SuppressFinalize(this);
        }

        // Track whether Dispose has been called.
        private disposed: boolean = false;

        // Dispose(bool disposing) executes in two distinct scenarios.
        // If disposing equals true, the method has been called directly
        // or indirectly by a user's code. Managed and unmanaged resources
        // can be disposed.
        // If disposing equals false, the method has been called by the
        // runtime from inside the finalizer and you should not reference
        // other objects. Only unmanaged resources can be disposed.
        public Dispose(disposing: boolean) {
            // Check to see if Dispose has already been called.
            if (!this.disposed) {
                // If disposing equals true, dispose all managed
                // and unmanaged resources.
                if (disposing) {
                    // Dispose managed resources.
                    releaseReferences();
                }

                // Note disposing has been done.
                disposed = true;

            }
        }

        // Use C# destructor syntax for finalization code.
        // This destructor will run only if the Dispose method
        // does not get called.
        // It gives your base class the opportunity to finalize.
        // Do not provide destructors in types derived from this class.
        ~cReportSectionLine()
        {
            // Do not re-create Dispose clean-up code here.
            // Calling Dispose(false) is optimal in terms of
            // readability and maintainability.
            Dispose(false);
        }

        private releaseReferences() {
            setCopyColl(null);

            if (this.controls !== null) {
                if (this.controls.getCopyColl() !== null) {
                    this.controls.getCopyColl().clear();
                    this.controls.setCopyColl(null);
                }
                this.controls.clear();
                this.controls = null;
            }

            this.aspect = null;
            this.formulaHide = null;
        }


    }    }



}
