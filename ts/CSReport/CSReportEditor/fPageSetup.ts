namespace CSReportEditor {

    import Form = CSForms.Form;
    import csReportPaperType = CSReportGlobals.csReportPaperType;

    export class FPageSetup extends Form {

        private ok: boolean = false;
        private customHeight: number = null;
        private customWidth: number = null;
        private orientation: number = 1;
        private paperSize: csReportPaperType = csReportPaperType.CS_RPT_PAPER_TYPE_A4;

        public constructor() {
            super();
            // InitializeComponent();
        }

        public initDialog(paperSize: csReportPaperType, customHeight: number, customWidth: number, orientation: number) {
            this.customHeight = customHeight;
            this.customWidth = customWidth;
            this.orientation = orientation;
            this.paperSize = paperSize;
        }

        public setCustomHeight(rhs: number) {
            this.customHeight = rhs;
        }

        public setCustomWidth(rhs: number) {
            this.customWidth = rhs;
        }

        public setOrientation(rhs: number) {
            this.orientation = rhs;
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

        public getOk() {
            return this.ok;
        }

        private op_portrait_CheckedChanged(sender: object, e: object) {
            /*
            pic_landscape.Visible = false;
            pic_portrait.Visible = true;

             */
        }

        private op_landscape_CheckedChanged(sender: object, e: object) {
            /*
            pic_portrait.Visible = false;
            pic_landscape.Visible = true;

             */
        }

        private cmd_cancel_Click(sender: object, e: object) {
            /*
            this.ok = false;
            this.Hide();

             */
        }

        private cmd_apply_Click(sender: object, e: object) {
            /*
            this.ok = true;
            this.customHeight = Utils.val(tx_height.Text);
            this.customWidth = Utils.val(tx_width.Text);
            this.paperSize = cUtil.listID(cb_paperSize);
            this.orientation = op_landscape.Checked ? csRptPageOrientation.LANDSCAPE : csRptPageOrientation.PORTRAIT;
            this.Hide();

             */
        }

        private fPageSetup_Load(sender: object, e: object) {
            /*
            cUtil.listAdd(cb_paperSize, "Letter", (int)csReportPaperType.CS_RPT_PAPER_TYPE_LETTER);
            cUtil.listAdd(cb_paperSize, "A4", (int)csReportPaperType.CS_RPT_PAPER_TYPE_A4);
            cUtil.listAdd(cb_paperSize, "Legal", (int)csReportPaperType.CS_RPT_PAPER_TYPE_LEGAL);
            cUtil.listAdd(cb_paperSize, "A3", (int)csReportPaperType.CS_RPT_PAPER_TYPE_A3);
            cUtil.listAdd(cb_paperSize, "User", (int)csReportPaperType.CS_RPT_PAPER_USER);
            cUtil.listSetListIndexForId(cb_paperSize, (int)this.paperSize);
            tx_height.setText(this.customHeight.toString());
            tx_width.setText(this.customWidth.toString());
            if(this.orientation === csRptPageOrientation.LANDSCAPE) {
                op_landscape.setChecked(true);
            }
            else {
                op_portrait.setChecked(true);
            }
            cWindow.centerForm(this);

             */
        }

        private cb_paperSize_SelectedIndexChanged(sender: object, e: object) {
            /*
            let enabled = cUtil.listID(cb_paperSize) === csReportPaperType.CS_RPT_PAPER_USER;
            tx_height.setEnabled(enabled);
            tx_width.setEnabled(enabled);

             */
        }
    }
}
