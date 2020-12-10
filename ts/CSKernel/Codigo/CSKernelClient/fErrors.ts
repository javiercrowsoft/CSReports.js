(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createFErrors = function() {

        // @ts-ignore
        let self: CSKernelClient.IfErrors = {};
        const fErrors = function() {
            InitializeComponent();
        };

        const cmdOk_Click = function(sender, e) {
            this.Hide();
        };

        const cmdDetails_Click = function(sender, e) {
            if (cmdDetails.Text === "Details") {
                cmdDetails.Text = "Hide";
                this.Height = 242;
            }
            else  {
                cmdDetails.Text = "Details";
                this.Height = 130;
            }
        };

        self.setDetails = function(details) {
            txError.Text = details;
        };

        self.setErrorIcon = function() {
            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = UNKNOWN >>  can't find constructor for class Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.error.png"));
        };
        self.setErrorInfo = function() {
            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = UNKNOWN >>  can't find constructor for class Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.information.png"));
        };
        self.setErrorWarning = function() {
            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = UNKNOWN >>  can't find constructor for class Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.warning.png"));
        };

        const fErrors_Load = function(sender, e) {
            cWindow.centerForm(this);
        };
        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IfErrors {

    setDetails: (string) => void;
    setErrorIcon: () => void;
    setErrorInfo: () => void;
    setErrorWarning: () => void;
  }
}
