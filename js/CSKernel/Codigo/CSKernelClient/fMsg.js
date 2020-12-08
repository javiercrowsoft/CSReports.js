(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createFMsg = function() {

        const self = {}; //@@@: public partial class fMsg : Form
        const fMsg = function() { //@@@: public fMsg()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }
        self.setTitle = function(value) { //@@@: public void setTitle(String value)
            this.Text = value; //@@@: this.Text = value;
        }; //@@@: }
        self.setIcon = function(icon) { //@@@: public void setIcon(CSMSGICONS icon)
            switch (icon) { //@@@: switch (icon) {
                case CSMSGICONS.Error: //@@@: case CSMSGICONS.Error:
                    setErrorIcon(); //@@@: setErrorIcon();
                    break; //@@@: break;
                case CSMSGICONS.Exclamation: //@@@: case CSMSGICONS.Exclamation:
                    setErrorWarning(); //@@@: setErrorWarning();
                    break; //@@@: break;
                case CSMSGICONS.Information: //@@@: case CSMSGICONS.Information:
                    setErrorInfo(); //@@@: setErrorInfo();
                    break; //@@@: break;
            } //@@@: }
        }; //@@@: }
        self.setMessage = function(value) { //@@@: public void setMessage(String value)
            this.txMsg.Text = value; //@@@: this.txMsg.Text = value;
        }; //@@@: }
        self.setErrorIcon = function() { //@@@: public void setErrorIcon()
            let assembly = System.Reflection.Assembly.GetExecutingAssembly(); //@@@: System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.error.png")); //@@@: picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.error.png"));
        }; //@@@: }
        self.setErrorInfo = function() { //@@@: public void setErrorInfo()
            let assembly = System.Reflection.Assembly.GetExecutingAssembly(); //@@@: System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.information.png")); //@@@: picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.information.png"));
        }; //@@@: }
        self.setErrorWarning = function() { //@@@: public void setErrorWarning()
            let assembly = System.Reflection.Assembly.GetExecutingAssembly(); //@@@: System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.warning.png")); //@@@: picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.warning.png"));
        }; //@@@: }

        const cmdOk_Click = function(sender, e) { //@@@: private void cmdOk_Click(object sender, EventArgs e)
            this.Close(); //@@@: this.Close();
        }; //@@@: }

        const fMsg_Load = function(sender, e) { //@@@: private void fMsg_Load(object sender, EventArgs e)
            txMsg.SelectionStart = 0; //@@@: txMsg.SelectionStart = 0;
            txMsg.SelectionLength = 0; //@@@: txMsg.SelectionLength = 0;

            let height = txMsg.Lines.Length * 20; //@@@: var height = txMsg.Lines.Length * 20;
            if (height > this.Height - 100) { //@@@: if (height > this.Height - 100)
                this.Height = height + 100; //@@@: this.Height = height + 100;
                txMsg.Height = height; //@@@: txMsg.Height = height;
                cmdOk.Top = this.Height - 80; //@@@: cmdOk.Top = this.Height - 80;
            }             //@@@: }

            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
