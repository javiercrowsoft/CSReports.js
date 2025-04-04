namespace CSReports.CSReportEditor {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;

    import TextBox = CSForms.TextBox;
    import OptionButton = CSForms.OptionButton;
    import CheckBox = CSForms.CheckBox;
    import Label = CSForms.Label;
    import Button = CSForms.Button;

    export class FGroup extends Form {

        private el: HTMLElement;
        private dialog: Dialog;

        private editor: cEditor = null;
        private ok: boolean = false;
        private dbFieldChanged: boolean = false;
        private index: number = 0;
        private fieldType: number = 0;

        private txName: TextBox;
        private txDbField: TextBox;
        private opAsc: OptionButton;
        private opDesc: OptionButton;
        private chkPrintInNewPage: CheckBox;
        private chkReprintGroup: CheckBox;
        private chkGrandTotal: CheckBox;
        private opDate: OptionButton;
        private opNumber: OptionButton;
        private opText: OptionButton;
        private lbGroup: Label;

        public constructor() {
            super();
            this.el = U.el('group-dlg');

            this.txName = new TextBox(U.inputEl('ctrl-group-name'));
            this.txDbField = new TextBox(U.inputEl('ctrl-group-dbfield-name'));
            this.opAsc = new OptionButton(U.inputEl('ctrl-group-op-asc'));
            this.opDesc = new OptionButton(U.inputEl('ctrl-group-op-desc'));
            this.chkPrintInNewPage = new CheckBox(U.inputEl('ctrl-group-print-in-new-page'));
            this.chkReprintGroup = new CheckBox(U.inputEl('ctrl-group-reprint-group'));
            this.chkGrandTotal = new CheckBox(U.inputEl('ctrl-group-grant-total'));
            this.opDate = new OptionButton(U.inputEl('ctrl-group-op-date'));
            this.opNumber = new OptionButton(U.inputEl('ctrl-group-op-number'));
            this.opText = new OptionButton(U.inputEl('ctrl-group-op-text'));
            this.lbGroup = new Label(U.labelEl('ctrl-group-label'));

            this.dialog = new Dialog(this.el, 'group-dlg-apply', 'group-dlg-cancel');
            this.dialog.onApply = P.call(this, this.cmdApplyClick);
            new Button(U.el('ctrl-group-dbfield-name-button')).setOnClick(P.call(this, this.dbFieldClick));
            super.setDialog(this.dialog);
        }

        private cmdApplyClick() {
            return true;
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private dbFieldClick() {
            this.editor.showHelpDbFieldForGroup().then(P.call(this, (result) => {
                if(result)  {
                    this.dbFieldChanged = true;
                }
            }));
        }

        public getAsc() {
            return this.opAsc.getChecked();
        }

        public setAsc(value: boolean) {
            this.opAsc.setChecked(value);
        }

        public getDesc() {
            return this.opDesc.getChecked();
        }

        public setDesc(value: boolean) {
            this.opDesc.setChecked(value);
        }

        public getPrintInNewPage() {
            return this.chkPrintInNewPage.getChecked();
        }

        public setPrintInNewPage(value: boolean) {
            this.chkPrintInNewPage.setChecked(value);
        }

        public getReprintGroup() {
            return this.chkReprintGroup.getChecked();
        }

        public setReprintGroup(value: boolean) {
            this.chkReprintGroup.setChecked(value);
        }

        public getGrandTotal() {
            return this.chkGrandTotal.getChecked();
        }

        public setGrandTotal(value: boolean) {
            this.chkGrandTotal.setChecked(value);
        }

        public getSortByDate() {
            return this.opDate.getChecked();
        }

        public setSortByDate(value: boolean) {
            this.opDate.setChecked(value);
        }

        public getSortByNumber() {
            return this.opNumber.getChecked();
        }

        public setSortByNumber(value: boolean) {
            this.opNumber.setChecked(value);
        }

        public getSortByText() {
            return this.opText.getChecked();
        }

        public setSortByText(value: boolean) {
            this.opText.setChecked(value);
        }

        public getOk() {
            return this.ok;
        }

		public getDbField() {

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

        getTxName(): TextBox {
            return this.txName;
        }

        getTxDbField(): TextBox {
            return this.txDbField;
        }

        getOpAsc(): OptionButton {
            return this.opAsc;
        }

        getOpDesc(): OptionButton {
            return this.opDesc;
        }

        getChkPrintInNewPage(): CheckBox {
            return this.chkPrintInNewPage;
        }

        getChkReprintGroup(): CheckBox {
            return this.chkReprintGroup;
        }

        getChkGrandTotal(): CheckBox {
            return this.chkGrandTotal;
        }

        getOpDate(): OptionButton {
            return this.opDate;
        }

        getOpNumber(): OptionButton {
            return this.opNumber;
        }

        getOpText(): OptionButton {
            return this.opText;
        }

        getLbGroup(): Label {
            return this.lbGroup;
        }

        showModal() {
            return this.dialog.show({title: 'Group', height: 600, width: 800, overlay: true})
                        .then(P.call(this, (result)=> {
                            if(result) return {
                                                success: true
                                              };
                            else       return {
                                                success: false
                                              };
                        }));
        }
    }
}
