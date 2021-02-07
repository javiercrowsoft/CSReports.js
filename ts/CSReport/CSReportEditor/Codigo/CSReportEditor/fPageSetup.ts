

namespace CSReportEditor
{
    export class fPageSetup {


    {
        private ok: boolean = false;
        private customHeight: number = null;
        private customWidth: number = null;
        private orientation: number = 1;
        private paperSize: csReportPaperType = csReportPaperType.CSRPTPAPERTYPEA4;

        public constructor() {
            InitializeComponent();
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

        private op_portrait_CheckedChanged(sender: object, e: EventArgs) {
            pic_landscape.Visible = false;
            pic_portrait.Visible = true;
        }

        private op_landscape_CheckedChanged(sender: object, e: EventArgs) {
            pic_portrait.Visible = false;
            pic_landscape.Visible = true;
        }

        private cmd_cancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Hide();
        }

        private cmd_apply_Click(sender: object, e: EventArgs) {
            this.ok = true;
            this.customHeight = Utils.val(tx_height.Text);
            this.customWidth = Utils.val(tx_width.Text);
            this.paperSize = cUtil.listID(cb_paperSize);
            this.orientation = op_landscape.Checked ? (int)csRptPageOrientation.LANDSCAPE : (int)csRptPageOrientation.PORTRAIT;
            this.Hide();
        }

        private fPageSetup_Load(sender: object, e: EventArgs) {
            cUtil.listAdd(cb_paperSize, "Letter", (int)csReportPaperType.CSRPTPAPERTYPELETTER);
            cUtil.listAdd(cb_paperSize, "A4", (int)csReportPaperType.CSRPTPAPERTYPEA4);
            cUtil.listAdd(cb_paperSize, "Legal", (int)csReportPaperType.CSRPTPAPERTYPELEGAL);
            cUtil.listAdd(cb_paperSize, "A3", (int)csReportPaperType.CSRPTPAPERTYPEA3);
            cUtil.listAdd(cb_paperSize, "User", (int)csReportPaperType.CSRPTPAPERUSER);
            cUtil.listSetListIndexForId(cb_paperSize, (int)this.paperSize);
            tx_height.Text = this.customHeight.toString();
            tx_width.Text = this.customWidth.toString();
            if (this.orientation === csRptPageOrientation.LANDSCAPE) {
                op_landscape.Checked = true;
            }
            else {
                op_portrait.Checked = true;
            }
            cWindow.centerForm(this);
        }

        private cb_paperSize_SelectedIndexChanged(sender: object, e: EventArgs) {
            let enabled: var = cUtil.listID(cb_paperSize) === csReportPaperType.CSRPTPAPERUSER;
            tx_height.Enabled = enabled;
            tx_width.Enabled = enabled;
        }


    }
}
