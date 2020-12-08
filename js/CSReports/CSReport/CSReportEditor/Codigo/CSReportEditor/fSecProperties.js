(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFSecProperties = function() {

        const self = {}; //@@@: public partial class fSecProperties : Form
        let m_editor = null; //@@@: private cEditor m_editor;

        let m_ok = false; //@@@: private bool m_ok = false;

        let m_formulaHideChanged = null; //@@@: private bool m_formulaHideChanged;
        let m_setFormulaHideChanged = null; //@@@: private bool m_setFormulaHideChanged;
        let m_formulaHide = ""; //@@@: private String m_formulaHide = "";

        let m_formulaName = ""; //@@@: private String m_formulaName = "";

        const fSecProperties = function() { //@@@: public fSecProperties()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

		self. = function() { //@@@: public string getFormulaName ()
			return m_formulaName; //@@@: return m_formulaName;
		}; //@@@: }

        self.getFormulaHide = function() { //@@@: public String getFormulaHide()
            return m_formulaHide; //@@@: return m_formulaHide;
        }; //@@@: }

        self.setFormulaHide = function(rhs) { //@@@: public void setFormulaHide(String rhs)
            m_formulaHide = rhs; //@@@: m_formulaHide = rhs;
        }; //@@@: }

        self.getFormulaHideChanged = function() { //@@@: public bool getFormulaHideChanged()
            return m_formulaHideChanged; //@@@: return m_formulaHideChanged;
        }; //@@@: }

        self.setFormulaHideChanged = function(rhs) { //@@@: public void setFormulaHideChanged(bool rhs)
            m_formulaHideChanged = rhs; //@@@: m_formulaHideChanged = rhs;
        }; //@@@: }

        self.getSetFormulaHideChanged = function() { //@@@: public bool getSetFormulaHideChanged()
            return m_setFormulaHideChanged; //@@@: return m_setFormulaHideChanged;
        }; //@@@: }

        self.setSetFormulaHideChanged = function(rhs) { //@@@: public void setSetFormulaHideChanged(bool rhs)
            m_setFormulaHideChanged = rhs; //@@@: m_setFormulaHideChanged = rhs;
        }; //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public System.Windows.Forms.Label lbSectionName //@@@: public System.Windows.Forms.Label lbSectionName
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_section; //@@@: return lb_section;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txName //@@@: public System.Windows.Forms.TextBox txName
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_name; //@@@: return tx_name;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label lbFormulaHide //@@@: public System.Windows.Forms.Label lbFormulaHide
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_formulaHide; //@@@: return lb_formulaHide;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFormulaHide //@@@: public System.Windows.Forms.CheckBox chkFormulaHide
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_formulaHide; //@@@: return chk_formulaHide;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdFormulaHide //@@@: public System.Windows.Forms.Button cmdFormulaHide
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_formulaHide; //@@@: return cmd_formulaHide;
            } //@@@: }
        } //@@@: }

        self.getOk = function() { //@@@: internal bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

        const fSecProperties_Load = function(sender, e) { //@@@: private void fSecProperties_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
            lb_formulaHide.Text = m_formulaHide; //@@@: lb_formulaHide.Text = m_formulaHide;
        }; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmd_formulaHide_Click = function(sender, e) { //@@@: private void cmd_formulaHide_Click(object sender, EventArgs e)
            m_formulaName = "Ocultar"; //@@@: m_formulaName = "Ocultar";
            if (m_editor.showEditFormula(m_formulaHide)) { //@@@: if (m_editor.showEditFormula(ref m_formulaHide))
                m_formulaHideChanged = true; //@@@: m_formulaHideChanged = true;
                lb_formulaHide.Text = m_formulaHide; //@@@: lb_formulaHide.Text = m_formulaHide;
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
