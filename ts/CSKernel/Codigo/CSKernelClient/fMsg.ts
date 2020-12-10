(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createFMsg = function() {

        // @ts-ignore
        let self: CSKernelClient.IfMsg = {};
        const fMsg = function() {
            InitializeComponent();
        };
        self.setTitle = function(value) {
            this.Text = value;
        };
        self.setIcon = function(icon) {
            switch (icon) {
                case CSMSGICONS.Error:
                    setErrorIcon();
                    break;
                case CSMSGICONS.Exclamation:
                    setErrorWarning();
                    break;
                case CSMSGICONS.Information:
                    setErrorInfo();
                    break;
            }
        };
        self.setMessage = function(value) {
            this.txMsg.Text = value;
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

        const cmdOk_Click = function(sender, e) {
            this.Close();
        };

        const fMsg_Load = function(sender, e) {
            txMsg.SelectionStart = 0;
            txMsg.SelectionLength = 0;

            let height: var = txMsg.Lines.Length * 20;
            if (height > this.Height - 100) {
                this.Height = height + 100;
                txMsg.Height = height;
                cmdOk.Top = this.Height - 80;
            }            

            cWindow.centerForm(this);
        };
        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IfMsg {

    setTitle: (String) => void;
    setIcon: (CSMSGICONS) => void;
    setMessage: (String) => void;
    setErrorIcon: () => void;
    setErrorInfo: () => void;
    setErrorWarning: () => void;
  }
}
