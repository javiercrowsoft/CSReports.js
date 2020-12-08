(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFFormulaReplace = function() {

        const self = {}; //@@@: public partial class fFormulaReplace : Form
        const fFormulaReplace = function() { //@@@: public fFormulaReplace()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public System.Windows.Forms.TextBox txCurrFormula //@@@: public System.Windows.Forms.TextBox txCurrFormula
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_currFormula; //@@@: return tx_currFormula;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txNewFormula //@@@: public System.Windows.Forms.TextBox txNewFormula
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_newFormula; //@@@: return tx_newFormula;
            } //@@@: }
        } //@@@: }

        self.getOk = function() { //@@@: internal bool getOk()
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
