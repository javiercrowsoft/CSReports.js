(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createFMsg = function() {

        const self = {};
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
            let assembly: System.Reflection.Assembly= System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image =  globalObject.CSReportDll.createBitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.error.png"));
        };
        self.setErrorInfo = function() {
            let assembly: System.Reflection.Assembly= System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image =  globalObject.CSReportDll.createBitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.information.png"));
        };
        self.setErrorWarning = function() {
            let assembly: System.Reflection.Assembly= System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image =  globalObject.CSReportDll.createBitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.warning.png"));
        };

        const cmdOk_Click = function(sender, e) {
            this.Close();
        };

        const fMsg_Load = function(sender, e) {
            txMsg.SelectionStart = 0;
            txMsg.SelectionLength = 0;

            let height: var= txMsg.Lines.Length * 20;
            if (height > this.Height - 100) {
                this.Height = height + 100;
                txMsg.Height = height;
                cmdOk.Top = this.Height - 80;
            }            

            cWindow.centerForm(this);
        };
        return self;

    }
}(globalObject));
