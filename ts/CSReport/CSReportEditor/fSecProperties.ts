namespace CSReportEditor {

    import Form = CSForms.Form;
    import RefWrapper = CSKernelClient.RefWrapper;

    export class FSecProperties extends Form {

        private editor: cEditor = null;

        private ok: boolean = false;

        private hasFormulaHideChanged: boolean = false;
        private hasFormulaHide: boolean = false;

        private formulaHideChanged: boolean = false;
        private formulaHide: string = "";

        private formulaName: string = "";

        public constructor() {
            super();
            //InitializeComponent();
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

		public getFormulaName() {
			return this.formulaName;
		}

        public getFormulaHide() {
            return this.formulaHide;
        }

        public setFormulaHide(rhs: string) {
            this.formulaHide = rhs;
        }

        public getFormulaHideChanged() {
            return this.formulaHideChanged;
        }

        public setFormulaHideChanged(rhs: boolean) {
            this.formulaHideChanged = rhs;
        }

        public getHasFormulaHideChanged() {
            return this.hasFormulaHideChanged;
        }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

        public getOk() {
            return this.ok;
        }

        private fSecProperties_Load(sender: object, e: object) {
            //cWindow.centerForm(this);
            //lb_formulaHide.setText(this.formulaHide);
        }

        private cmd_apply_Click(sender: object, e: object) {
            this.ok = true;
            this.hide();
        }

        private cmd_cancel_Click(sender: object, e: object) {
            this.ok = false;
            this.hide();
        }

        private cmd_formulaHide_Click(sender: object, e: object) {
            this.formulaName = "Ocultar";
            let fh = new RefWrapper(this.formulaHide);
            /*if(this.editor.showEditFormula(fh)) {
                this.formulaHideChanged = true;
                this.formulaHide = fh.get()
                //lb_formulaHide.setText(this.formulaHide);
            }*/
        }

        showDialog() {

        }

        close() {

        }

        getChkFormulaHide(): any {

        }

        getTxName(): any {

        }

        getLbSectionName(): any {

        }
    }
}
