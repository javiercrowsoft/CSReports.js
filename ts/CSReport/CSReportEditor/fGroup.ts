namespace CSReportEditor {

    import NotImplementedException = CSOAPI.NotImplementedException;

    export class FGroup extends Form {

        private editor: cEditor = null;
        private ok: boolean = false;
        private dbFieldChanged: boolean = false;
        private index: number = 0;
        private fieldType: number = 0;

        public constructor() {
            super();
        }

        public getAsc() {
            //return op_asc.Checked;
        }

        public setAsc(value: boolean) {
            //op_asc.setChecked(value);
        }

        public setDesc(value: boolean) {
            //op_desc.setChecked(value);
        }

        public getPrintInNewPage() {
            //return chk_printInNewPage.Checked;
        }

        public setPrintInNewPage(value: boolean) {
            //chk_printInNewPage.setChecked(value);
        }

        public getReprintGroup() {
            //return chk_reprintGroup.Checked;
        }

        public setReprintGroup(value: boolean) {
            //chk_reprintGroup.setChecked(value);
        }

        public getGrandTotal() {
            //return chk_grandTotal.Checked;
        }

        public setGrandTotal(value: boolean) {
            //chk_grandTotal.setChecked(value);
        }

        public getSortByDate() {
            //return op_date.Checked;
        }

        public setSortByDate(value: boolean) {
            //op_date.setChecked(value);
        }

        public getSortByNumber() {
            //return op_number.Checked;
        }

        public setSortByNumber(value: boolean) {
            //op_number.setChecked(value);
        }

        public getSortByText() {
            //return op_text.Checked;
        }

        public setSortByText(value: boolean) {
            //op_text.setChecked(value);
        }

        public getOk() {
            return this.ok;
        }

		public getDbField() {
			throw new NotImplementedException();
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

        private cmdOk_Click(sender: object, e: object) {
            this.ok = true;
            this.hide();
        }

        private cmdCancel_Click(sender: object, e: object) {
            this.ok = false;
            this.hide();
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private cmd_dbField_Click(sender: object, e: object) {
            if (this.editor.showHelpDbFieldForGroup()) {
                this.dbFieldChanged = true;
            }
        }

        private fGroup_Load(sender: object, e: object) {
            //cWindow.centerForm(this);
        }

        getTxName(): any {

        }

        getTxDbField(): any {

        }

        getOpAsc(): any {

        }

        getOpDesc(): any {

        }

        getChkPrintInNewPage(): any {

        }

        getChkReprintGroup(): any {

        }

        getChkGrandTotal(): any {

        }

        getOpDate(): any {

        }

        getOpNumber(): any {

        }

        getOpText(): any {

        }

        getLbGroup(): any {

        }
    }
}
