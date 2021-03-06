namespace CSReportEditor {

    export class FGroup {

        private editor: cEditor = null;
        private ok: boolean = false;
        private dbFieldChanged: boolean = false;
        private index: number = 0;
        private fieldType: number = 0;

        public constructor() {
            InitializeComponent();
        }

        public getAsc() {
            return op_asc.Checked;
        }

        public setAsc(value: boolean) {
            op_asc.Checked = value;
        }

        public setDesc(value: boolean) {
            op_desc.Checked = value;
        }

        public getPrintInNewPage() {
            return chk_printInNewPage.Checked;
        }

        public setPrintInNewPage(value: boolean) {
            chk_printInNewPage.Checked = value;
        }

        public getReprintGroup() {
            return chk_reprintGroup.Checked;
        }

        public setReprintGroup(value: boolean) {
            chk_reprintGroup.Checked = value;
        }

        public getGrandTotal() {
            return chk_grandTotal.Checked;
        }

        public setGrandTotal(value: boolean) {
            chk_grandTotal.Checked = value;
        }

        public getSortByDate() {
            return op_date.Checked;
        }

        public setSortByDate(value: boolean) {
            op_date.Checked = value;
        }

        public getSortByNumber() {
            return op_number.Checked;
        }

        public setSortByNumber(value: boolean) {
            op_number.Checked = value;
        }

        public getSortByText() {
            return op_text.Checked;
        }

        public setSortByText(value: boolean) {
            op_text.Checked = value;
        }

        public getOk() {
            return this.ok;
        }

		public getDbField() {
			throw new NotImplementedException ();
		}

        public getFieldType() {
            return this.fieldType;
        }

        public setFieldType(rhs: number) {
            this.fieldType = rhs;
        }

        public getIndex() {
            return this.index;
        }

        public setIndex(rhs: number) {
            this.index = rhs;
        }

        private cmdOk_Click(sender: object, e: EventArgs) {
            this.ok = true;
            this.Hide();
        }

        private cmdCancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Hide();
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private cmd_dbField_Click(sender: object, e: EventArgs) {
            if (this.editor.showHelpDbFieldForGroup()) {
                this.dbFieldChanged = true;
            }
        }

        private fGroup_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
        }
    }
}
