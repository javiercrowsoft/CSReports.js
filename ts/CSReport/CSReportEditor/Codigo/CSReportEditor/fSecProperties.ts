(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFSecProperties = function() {

        // @ts-ignore
        let self: CSReportEditor.IfSecProperties = {};
        let m_editor: cEditor = null;

        let m_ok: boolean = false;

        let m_formulaHideChanged: boolean = null;
        let m_setFormulaHideChanged: boolean = null;
        let m_formulaHide: string = "";

        let m_formulaName: string = "";

        const fSecProperties = function() {
            InitializeComponent();
        };

        self.setHandler = function(editor) {
            m_editor = editor;
        };

		self.getFormulaName = function() {
			return m_formulaName;
		};

        self.getFormulaHide = function() {
            return m_formulaHide;
        };

        self.setFormulaHide = function(rhs) {
            m_formulaHide = rhs;
        };

        self.getFormulaHideChanged = function() {
            return m_formulaHideChanged;
        };

        self.setFormulaHideChanged = function(rhs) {
            m_formulaHideChanged = rhs;
        };

        self.getSetFormulaHideChanged = function() {
            return m_setFormulaHideChanged;
        };

        self.setSetFormulaHideChanged = function(rhs) {
            m_setFormulaHideChanged = rhs;
        };

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public System.Windows.Forms.Label lbSectionName
        {
UNKNOWN >>             get
            {
                return lb_section;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txName
        {
UNKNOWN >>             get
            {
                return tx_name;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label lbFormulaHide
        {
UNKNOWN >>             get
            {
                return lb_formulaHide;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFormulaHide
        {
UNKNOWN >>             get
            {
                return chk_formulaHide;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdFormulaHide
        {
UNKNOWN >>             get
            {
                return cmd_formulaHide;
            }
        }

        self.getOk = function() {
            return m_ok;
        };

        const fSecProperties_Load = function(sender, e) {
            cWindow.centerForm(this);
            lb_formulaHide.Text = m_formulaHide;
        };

        const cmd_apply_Click = function(sender, e) {
            m_ok = true;
            this.Hide();
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };

        const cmd_formulaHide_Click = function(sender, e) {
            m_formulaName = "Ocultar";
            if (m_editor.showEditFormula(m_formulaHide)) {
                m_formulaHideChanged = true;
                lb_formulaHide.Text = m_formulaHide;
            }
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfSecProperties {

    setHandler: (cEditor) => void;
    getFormulaName: () => string;
    getFormulaHide: () => String;
    setFormulaHide: (String) => void;
    getFormulaHideChanged: () => bool;
    setFormulaHideChanged: (bool) => void;
    getSetFormulaHideChanged: () => bool;
    setSetFormulaHideChanged: (bool) => void;
    getOk: () => bool;
  }
}
