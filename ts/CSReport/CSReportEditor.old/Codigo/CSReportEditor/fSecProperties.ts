(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFSecProperties = function() {

        // @ts-ignore
        let self: CSReportEditor.IfSecProperties = {};
        let m_formulaHideChanged: boolean = null;
        let m_setFormulaHideChanged: boolean = null;
        let m_formulaHide: string = "";

        const fSecProperties = function() {
            InitializeComponent();
        };

		self.getFormulaName = function() {
			throw new NotImplementedException ();
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

UNKNOWN >>         public System.Windows.Forms.Label lbSecLn
        {
UNKNOWN >>             get
            {
                return lb_secLn;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label lbControl
        {
UNKNOWN >>             get
            {
                return lb_control;
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
            throw new NotImplementedException();
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfSecProperties {

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
