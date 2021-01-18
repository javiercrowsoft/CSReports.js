

namespace CSKernelClient
{
    export class fErrors {


    {
        public constructor() {
            InitializeComponent();
        }

        private cmdOk_Click(sender: object, e: EventArgs) {
            this.Hide();
        }

        private cmdDetails_Click(sender: object, e: EventArgs) {
            if (cmdDetails.Text === "Details") {
                cmdDetails.Text = "Hide";
                this.Height = 242;
            }
            else  {
                cmdDetails.Text = "Details";
                this.Height = 130;
            }
        }

        public setDetails(details: string) {
            txError.Text = details;
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

        private fErrors_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
        }


    }    }
}
