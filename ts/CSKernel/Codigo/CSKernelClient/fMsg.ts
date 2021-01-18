

namespace CSKernelClient
{
    export class fMsg {


    {
        public constructor() {
            InitializeComponent();
        }
        public setTitle(value: string) {
            this.Text = value;
        }
        public setIcon(icon: CSMSGICONS) {
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
        }
        public setMessage(value: string) {
            this.txMsg.Text = value;
        }
        public setErrorIcon() {
            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.error.png"));
        }
        public setErrorInfo() {
            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.information.png"));
        }
        public setErrorWarning() {
            let assembly: System.Reflection.Assembly = System.Reflection.Assembly.GetExecutingAssembly();
            picIcon.Image = new Bitmap(assembly.GetManifestResourceStream(assembly.GetName().Name + ".Resources.warning.png"));
        }

        private cmdOk_Click(sender: object, e: EventArgs) {
            this.Close();
        }

        private fMsg_Load(sender: object, e: EventArgs) {
            txMsg.SelectionStart = 0;
            txMsg.SelectionLength = 0;

            let height: var = txMsg.Lines.Length * 20;
            if (height > this.Height - 100) {
                this.Height = height + 100;
                txMsg.Height = height;
                cmdOk.Top = this.Height - 80;
            }            

            cWindow.centerForm(this);
        }


    }    }
}
