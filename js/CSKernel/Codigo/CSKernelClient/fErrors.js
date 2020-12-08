(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createFErrors = function() {

        const self = {}; //@@@: public partial class fErrors : Form
        const fErrors = function() { //@@@: public fErrors()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        const cmdOk_Click = function(sender, e) { //@@@: private void cmdOk_Click(object sender, EventArgs e)
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmdDetails_Click = function(sender, e) { //@@@: private void cmdDetails_Click(object sender, EventArgs e)
            if (cmdDetails.Text === "Details") { //@@@: if (cmdDetails.Text == "Details")
                cmdDetails.Text = "Hide"; //@@@: cmdDetails.Text = "Hide";
                this.Height = 242; //@@@: this.Height = 242;
            } //@@@: }
            else  { //@@@: else
                cmdDetails.Text = "Details"; //@@@: cmdDetails.Text = "Details";
                this.Height = 130; //@@@: this.Height = 130;
            } //@@@: }
        }; //@@@: }

        self.setDetails = function(details) { //@@@: public void setDetails(string details)
            txError.Text = details; //@@@: txError.Text = details;
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

        const fErrors_Load = function(sender, e) { //@@@: private void fErrors_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
