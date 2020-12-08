(function(globalObject) {

    globalObject.CSAssocFile = globalObject.CSAssocFile || {}; //@@@: namespace CSAssocFile
 //@@@: {
    globalObject.CSAssocFile.createFAsk = function() {

        const self = {}; //@@@: public partial class fAsk : Form

        let m_result = false; //@@@: private bool m_result = false;

        const fAsk = function() { //@@@: public fAsk()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

UNKNOWN >>         public bool result //@@@: public bool result
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return m_result; //@@@: return m_result;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public String question //@@@: public String question
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                lbQuestion.Text = value; //@@@: lbQuestion.Text = value;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public String yesButton //@@@: public String yesButton
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                cmdYes.Text = value; //@@@: cmdYes.Text = value;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public String noButton //@@@: public String noButton
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                cmdNo.Text = value; //@@@: cmdNo.Text = value;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public String dontAsk //@@@: public String dontAsk
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                chkDontAskAgain.Text = value; //@@@: chkDontAskAgain.Text = value;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public bool dontAskAgain //@@@: public bool dontAskAgain
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chkDontAskAgain.Checked; //@@@: return chkDontAskAgain.Checked;
            } //@@@: }
        } //@@@: }

        const cmdYes_Click = function(sender, e) { //@@@: private void cmdYes_Click(object sender, EventArgs e)
            m_result = true; //@@@: m_result = true;
            Hide(); //@@@: Hide();
        }; //@@@: }

        const cmdNo_Click = function(sender, e) { //@@@: private void cmdNo_Click(object sender, EventArgs e)
            m_result = false; //@@@: m_result = false;
            Hide(); //@@@: Hide();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
