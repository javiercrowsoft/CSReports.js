(function(globalObject) {

    globalObject.CSAssocFile = globalObject.CSAssocFile || {};

    globalObject.CSAssocFile.createFAsk = function() {

        const self = {};

        let m_result: boolean= false;

        const fAsk = function() {
            InitializeComponent();
        };

UNKNOWN >>         public bool result
        {
UNKNOWN >>             get
            {
                return m_result;
            }
        }

UNKNOWN >>         public String question
        {
UNKNOWN >>             set
            {
                lbQuestion.Text = value;
            }
        }

UNKNOWN >>         public String yesButton
        {
UNKNOWN >>             set
            {
                cmdYes.Text = value;
            }
        }

UNKNOWN >>         public String noButton
        {
UNKNOWN >>             set
            {
                cmdNo.Text = value;
            }
        }

UNKNOWN >>         public String dontAsk
        {
UNKNOWN >>             set
            {
                chkDontAskAgain.Text = value;
            }
        }

UNKNOWN >>         public bool dontAskAgain
        {
UNKNOWN >>             get
            {
                return chkDontAskAgain.Checked;
            }
        }

        const cmdYes_Click = function(sender, e) {
            m_result = true;
            Hide();
        };

        const cmdNo_Click = function(sender, e) {
            m_result = false;
            Hide();
        };
        return self;

    }
}(globalObject));
