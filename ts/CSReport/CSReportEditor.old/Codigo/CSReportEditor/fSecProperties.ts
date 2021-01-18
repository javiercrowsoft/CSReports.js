

namespace CSReportEditor
{
    export class fSecProperties {


    {
        private formulaHideChanged: boolean = null;
        private setFormulaHideChanged: boolean = null;
        private formulaHide: string = "";

        public constructor() {
            InitializeComponent();
        }

		public getFormulaName() {
			throw new NotImplementedException ();
		}

        public getFormulaHide() {
            return this.formulaHide;
        }

        public setFormulaHide(rhs: string) {
            this.formulaHide = rhs;
        }

        public getFormulaHideChanged() {
            return this.formulaHideChanged;
        }

        public setFormulaHideChanged(rhs: boolean) {
            this.formulaHideChanged = rhs;
        }

        public getSetFormulaHideChanged() {
            return this.setFormulaHideChanged;
        }

        public setSetFormulaHideChanged(rhs: boolean) {
            this.setFormulaHideChanged = rhs;
        }

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

        public getOk() {
            throw new NotImplementedException();
        }


    }    }
}
