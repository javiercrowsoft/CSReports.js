namespace CSReportEditor {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import TextBox = CSForms.TextBox;
    import ComboBox = CSForms.ComboBox;
    import OptionButton = CSForms.OptionButton;
    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import csRptPageOrientation = CSReportGlobals.csRptPageOrientation;

    export class FPageSetup extends Form {

        private el: HTMLElement;
        private dialog: Dialog;
        private ok: boolean = false;
        private customHeight: number = null;
        private customWidth: number = null;
        private orientation: number = 1;
        private paperSize: csReportPaperType = csReportPaperType.CS_RPT_PAPER_TYPE_A4;

        private txHeight: TextBox;
        private txWidth: TextBox;
        private cbPaperSize: ComboBox;
        private opLandscape: OptionButton;
        private opPortrait: OptionButton;

        private pageSetupApplyClick: () => void;

        public constructor() {
            super();
            this.el = U.el('page-setup-dlg');
            this.dialog = new Dialog(this.el, 'page-setup-dlg-apply', 'page-setup-dlg-cancel');

            this.dialog.onApply = P.call(this, this.cmdApplyClick);
            super.setDialog(this.dialog);

            this.txHeight = new TextBox(U.inputEl("page-setup-height"));
            this.txWidth = new TextBox(U.inputEl("page-setup-width"));
            this.opLandscape = new OptionButton(U.inputEl("page-setup-landscape"));
            this.opPortrait = new OptionButton(U.inputEl("page-setup-portrait"));
            this.cbPaperSize = new ComboBox(U.selectEl("page-setup-paper-size"));
            this.cbPaperSize.setOnChange(P.call(this, this.cbPaperSizeSelectedIndexChanged));
        }

        public initDialog(paperSize: csReportPaperType,
                          customHeight: number,
                          customWidth: number,
                          orientation: number,
                          pageSetupApplyClick: () => void) {
            this.customHeight = customHeight;
            this.customWidth = customWidth;
            this.orientation = orientation;
            this.paperSize = paperSize;
            this.pageSetupApplyClick = pageSetupApplyClick;

            U.listSetListIndexForId(this.cbPaperSize, this.paperSize);
            this.txHeight.setText(this.customHeight.toString());
            this.txWidth.setText(this.customWidth.toString());
            if(this.orientation === csRptPageOrientation.LANDSCAPE) {
                this.opLandscape.setChecked(true);
            }
            else {
                this.opPortrait.setChecked(true);
            }
        }

        public getPaperSize() {
            return this.paperSize;
        }

        public getCustomHeight() {
            return this.customHeight;
        }

        public getCustomWidth() {
            return this.customWidth;
        }

        public getOrientation() {
            return this.orientation;
        }

        showModal() {
            return this.dialog.show({title: 'Page Setup', height: 600, width: 500, overlay: true});
        }

        private cmdApplyClick() {
            this.ok = true;
            this.customHeight = U.val(this.txHeight.getText());
            this.customWidth = U.val(this.txWidth.getText());
            this.paperSize = U.valInt(U.listID(this.cbPaperSize));
            this.orientation = this.opLandscape.getChecked() ? csRptPageOrientation.LANDSCAPE : csRptPageOrientation.PORTRAIT;
            this.pageSetupApplyClick();
            return true;
        }

        private cbPaperSizeSelectedIndexChanged() {
            let enabled = U.valInt(U.listID(this.cbPaperSize)) === csReportPaperType.CS_RPT_PAPER_USER;
            this.txHeight.setEnabled(enabled);
            this.txWidth.setEnabled(enabled);
        }
    }
}
