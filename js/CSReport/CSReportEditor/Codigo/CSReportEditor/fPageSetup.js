(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFPageSetup = function() {

        const self = {}; //@@@: public partial class fPageSetup : Form
        let m_ok = false; //@@@: private bool m_ok = false;
        let m_customHeight = null; //@@@: private int m_customHeight;
        let m_customWidth = null; //@@@: private int m_customWidth;
        let m_orientation = 1; //@@@: private int m_orientation = 1;
        let m_paperSize = csReportPaperType.CSRPTPAPERTYPEA4; //@@@: private csReportPaperType m_paperSize = csReportPaperType.CSRPTPAPERTYPEA4;

        const fPageSetup = function() { //@@@: public fPageSetup()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.initDialog = function(paperSize, customHeight, customWidth, orientation) { //@@@: public void initDialog(csReportPaperType paperSize, int customHeight, int customWidth, int orientation)
            m_customHeight = customHeight; //@@@: m_customHeight = customHeight;
            m_customWidth = customWidth; //@@@: m_customWidth = customWidth;
            m_orientation = orientation; //@@@: m_orientation = orientation;
            m_paperSize = paperSize; //@@@: m_paperSize = paperSize;
        }; //@@@: }

        self.setCustomHeight = function(rhs) { //@@@: public void setCustomHeight(int rhs)
            m_customHeight = rhs; //@@@: m_customHeight = rhs;
        }; //@@@: }

        self.setCustomWidth = function(rhs) { //@@@: public void setCustomWidth(int rhs)
            m_customWidth = rhs; //@@@: m_customWidth = rhs;
        }; //@@@: }

        self.setOrientation = function(rhs) { //@@@: public void setOrientation(int rhs)
            m_orientation = rhs; //@@@: m_orientation = rhs;
        }; //@@@: }

        self.getPaperSize = function() { //@@@: public csReportPaperType getPaperSize()
            return m_paperSize; //@@@: return m_paperSize;
        }; //@@@: }

        self.getCustomHeight = function() { //@@@: public int getCustomHeight()
            return m_customHeight; //@@@: return m_customHeight;
        }; //@@@: }

        self.getCustomWidth = function() { //@@@: public int getCustomWidth()
            return m_customWidth; //@@@: return m_customWidth;
        }; //@@@: }

        self.getOrientation = function() { //@@@: public int getOrientation()
            return m_orientation; //@@@: return m_orientation;
        }; //@@@: }

        self.getOk = function() { //@@@: public bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

        const op_portrait_CheckedChanged = function(sender, e) { //@@@: private void op_portrait_CheckedChanged(object sender, EventArgs e)
            pic_landscape.Visible = false; //@@@: pic_landscape.Visible = false;
            pic_portrait.Visible = true; //@@@: pic_portrait.Visible = true;
        }; //@@@: }

        const op_landscape_CheckedChanged = function(sender, e) { //@@@: private void op_landscape_CheckedChanged(object sender, EventArgs e)
            pic_portrait.Visible = false; //@@@: pic_portrait.Visible = false;
            pic_landscape.Visible = true; //@@@: pic_landscape.Visible = true;
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            m_customHeight = cUtil.val(tx_height.Text); //@@@: m_customHeight = (int)cUtil.val(tx_height.Text);
            m_customWidth = cUtil.val(tx_width.Text); //@@@: m_customWidth = (int)cUtil.val(tx_width.Text);
            m_paperSize = cUtil.listID(cb_paperSize); //@@@: m_paperSize = (csReportPaperType)cUtil.listID(cb_paperSize);
            m_orientation = op_landscape.Checked ? (int)csRptPageOrientation.LANDSCAPE : (int)csRptPageOrientation.PORTRAIT; //@@@: m_orientation = op_landscape.Checked ? (int)csRptPageOrientation.LANDSCAPE : (int)csRptPageOrientation.PORTRAIT;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const fPageSetup_Load = function(sender, e) { //@@@: private void fPageSetup_Load(object sender, EventArgs e)
            cUtil.listAdd(cb_paperSize, "Letter", (int)csReportPaperType.CSRPTPAPERTYPELETTER); //@@@: cUtil.listAdd(cb_paperSize, "Letter", (int)csReportPaperType.CSRPTPAPERTYPELETTER);
            cUtil.listAdd(cb_paperSize, "A4", (int)csReportPaperType.CSRPTPAPERTYPEA4); //@@@: cUtil.listAdd(cb_paperSize, "A4", (int)csReportPaperType.CSRPTPAPERTYPEA4);
            cUtil.listAdd(cb_paperSize, "Legal", (int)csReportPaperType.CSRPTPAPERTYPELEGAL); //@@@: cUtil.listAdd(cb_paperSize, "Legal", (int)csReportPaperType.CSRPTPAPERTYPELEGAL);
            cUtil.listAdd(cb_paperSize, "A3", (int)csReportPaperType.CSRPTPAPERTYPEA3); //@@@: cUtil.listAdd(cb_paperSize, "A3", (int)csReportPaperType.CSRPTPAPERTYPEA3);
            cUtil.listAdd(cb_paperSize, "User", (int)csReportPaperType.CSRPTPAPERUSER); //@@@: cUtil.listAdd(cb_paperSize, "User", (int)csReportPaperType.CSRPTPAPERUSER);
            cUtil.listSetListIndexForId(cb_paperSize, (int)m_paperSize); //@@@: cUtil.listSetListIndexForId(cb_paperSize, (int)m_paperSize);
            tx_height.Text = m_customHeight.ToString(); //@@@: tx_height.Text = m_customHeight.ToString();
            tx_width.Text = m_customWidth.ToString(); //@@@: tx_width.Text = m_customWidth.ToString();
            if (m_orientation === csRptPageOrientation.LANDSCAPE) { //@@@: if (m_orientation == (int)csRptPageOrientation.LANDSCAPE)
                op_landscape.Checked = true; //@@@: op_landscape.Checked = true;
            } //@@@: }
            else { //@@@: else
                op_portrait.Checked = true; //@@@: op_portrait.Checked = true;
            } //@@@: }
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }

        const cb_paperSize_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_paperSize_SelectedIndexChanged(object sender, EventArgs e)
            let enabled = cUtil.listID(cb_paperSize) === csReportPaperType.CSRPTPAPERUSER; //@@@: var enabled = cUtil.listID(cb_paperSize) == (int)csReportPaperType.CSRPTPAPERUSER;
            tx_height.Enabled = enabled; //@@@: tx_height.Enabled = enabled;
            tx_width.Enabled = enabled; //@@@: tx_width.Enabled = enabled;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
