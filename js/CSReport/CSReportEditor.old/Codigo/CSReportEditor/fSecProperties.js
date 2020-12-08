(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFSecProperties = function() {

        const self = {}; //@@@: public partial class fSecProperties : Form
        let m_formulaHideChanged = null; //@@@: private bool m_formulaHideChanged;
        let m_setFormulaHideChanged = null; //@@@: private bool m_setFormulaHideChanged;
        let m_formulaHide = ""; //@@@: private String m_formulaHide = "";

        const fSecProperties = function() { //@@@: public fSecProperties()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

		self. = function() { //@@@: public string getFormulaName ()
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
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

UNKNOWN >>         public System.Windows.Forms.Label lbSecLn //@@@: public System.Windows.Forms.Label lbSecLn
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_secLn; //@@@: return lb_secLn;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label lbControl //@@@: public System.Windows.Forms.Label lbControl
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_control; //@@@: return lb_control;
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
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
