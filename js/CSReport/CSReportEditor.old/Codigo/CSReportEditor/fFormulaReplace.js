(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFFormulaReplace = function() {

        const self = {};
        var fFormulaReplace = function() {
            InitializeComponent();
        };

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public System.Windows.Forms.TextBox txCurrFormula
        {
UNKNOWN >>             get
            {
                return tx_currFormula;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txNewFormula
        {
UNKNOWN >>             get
            {
                return tx_newFormula;
            }
        }

        self.getOk = function() {
            throw new NotImplementedException();
        };
        return self;

    }
}(globalObject));