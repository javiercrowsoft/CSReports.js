namespace CSReportEditor {

    export class FSecProperties {

        private editor: cEditor = null;

        private ok: boolean = false;

        private formulaHideChanged: boolean = null;
        private setFormulaHideChanged: boolean = null;
        private formulaHide: string = "";

        private formulaName: string = "";

        public constructor() {
            InitializeComponent();
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

        public getSetFormulaHideChanged() {
            return this.setFormulaHideChanged;
        }

        public setSetFormulaHideChanged(rhs: boolean) {
            this.setFormulaHideChanged = rhs;
        }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

        public getOk() {
            return this.ok;
        }

        private fSecProperties_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
            lb_formulaHide.Text = this.formulaHide;
        }

        private cmd_apply_Click(sender: object, e: EventArgs) {
            this.ok = true;
            this.Hide();
        }

        private cmd_cancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Hide();
        }

        private cmd_formulaHide_Click(sender: object, e: EventArgs) {
            this.formulaName = "Ocultar";
            if (this.editor.showEditFormula(this.formulaHide)) {
                this.formulaHideChanged = true;
                lb_formulaHide.Text = this.formulaHide;
            }
        }
    }
}
