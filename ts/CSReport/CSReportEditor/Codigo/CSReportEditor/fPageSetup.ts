(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFPageSetup = function() {

        const self = {};
        let m_ok: boolean= false;
        let m_customHeight: number = null;
        let m_customWidth: number = null;
        let m_orientation: number= 1;
        let m_paperSize: csReportPaperType= csReportPaperType.CSRPTPAPERTYPEA4;

        const fPageSetup = function() {
            InitializeComponent();
        };

        self.initDialog = function(paperSize, customHeight, customWidth, orientation) {
            m_customHeight = customHeight;
            m_customWidth = customWidth;
            m_orientation = orientation;
            m_paperSize = paperSize;
        };

        self.setCustomHeight = function(rhs) {
            m_customHeight = rhs;
        };

        self.setCustomWidth = function(rhs) {
            m_customWidth = rhs;
        };

        self.setOrientation = function(rhs) {
            m_orientation = rhs;
        };

        self.getPaperSize = function() {
            return m_paperSize;
        };

        self.getCustomHeight = function() {
            return m_customHeight;
        };

        self.getCustomWidth = function() {
            return m_customWidth;
        };

        self.getOrientation = function() {
            return m_orientation;
        };

        self.getOk = function() {
            return m_ok;
        };

        const op_portrait_CheckedChanged = function(sender, e) {
            pic_landscape.Visible = false;
            pic_portrait.Visible = true;
        };

        const op_landscape_CheckedChanged = function(sender, e) {
            pic_portrait.Visible = false;
            pic_landscape.Visible = true;
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };

        const cmd_apply_Click = function(sender, e) {
            m_ok = true;
            m_customHeight = cUtil.val(tx_height.Text);
            m_customWidth = cUtil.val(tx_width.Text);
            m_paperSize = cUtil.listID(cb_paperSize);
            m_orientation = op_landscape.Checked ? (int)csRptPageOrientation.LANDSCAPE : (int)csRptPageOrientation.PORTRAIT;
            this.Hide();
        };

        const fPageSetup_Load = function(sender, e) {
            cUtil.listAdd(cb_paperSize, "Letter", (int)csReportPaperType.CSRPTPAPERTYPELETTER);
            cUtil.listAdd(cb_paperSize, "A4", (int)csReportPaperType.CSRPTPAPERTYPEA4);
            cUtil.listAdd(cb_paperSize, "Legal", (int)csReportPaperType.CSRPTPAPERTYPELEGAL);
            cUtil.listAdd(cb_paperSize, "A3", (int)csReportPaperType.CSRPTPAPERTYPEA3);
            cUtil.listAdd(cb_paperSize, "User", (int)csReportPaperType.CSRPTPAPERUSER);
            cUtil.listSetListIndexForId(cb_paperSize, (int)m_paperSize);
            tx_height.Text = m_customHeight.ToString();
            tx_width.Text = m_customWidth.ToString();
            if (m_orientation === csRptPageOrientation.LANDSCAPE) {
                op_landscape.Checked = true;
            }
            else {
                op_portrait.Checked = true;
            }
            cWindow.centerForm(this);
        };

        const cb_paperSize_SelectedIndexChanged = function(sender, e) {
            let enabled: var= cUtil.listID(cb_paperSize) === csReportPaperType.CSRPTPAPERUSER;
            tx_height.Enabled = enabled;
            tx_width.Enabled = enabled;
        };
        return self;

    }
}(globalObject));
