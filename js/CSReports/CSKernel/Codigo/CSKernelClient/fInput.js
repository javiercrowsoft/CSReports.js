(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createFInput = function() {

        const self = {}; //@@@: public partial class fInput : Form
        let m_ok = false; //@@@: private bool m_ok = false;

        const fInput = function() { //@@@: public fInput()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.getOk = function() { //@@@: public bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

        self.setTitle = function(title) { //@@@: public void setTitle(string title)
            lb_title.Text = title; //@@@: lb_title.Text = title;
        }; //@@@: }

        self.setDescrip = function(descrip) { //@@@: public void setDescrip(string descrip)
            lb_descrip.Text = descrip; //@@@: lb_descrip.Text = descrip;
        }; //@@@: }

        self.setText = function(text) { //@@@: public void setText(string text)
            tx_server.Text = text; //@@@: tx_server.Text = text;
        }; //@@@: }

        self.getText = function() { //@@@: public string getText()
            return tx_server.Text; //@@@: return tx_server.Text;
        }; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            this.Close(); //@@@: this.Close();
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Close(); //@@@: this.Close();
        }; //@@@: }

        const fInput_Load = function(sender, e) { //@@@: private void fInput_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
