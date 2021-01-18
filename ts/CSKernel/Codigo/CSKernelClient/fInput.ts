

namespace CSKernelClient
{
    export class fInput {


    {
        private ok: boolean = false;

        public constructor() {
            InitializeComponent();
        }

        public getOk() {
            return this.ok;
        }

        public setTitle(title: string) {
            lb_title.Text = title;
        }

        public setDescrip(descrip: string) {
            lb_descrip.Text = descrip;
        }

        public setText(text: string) {
            tx_server.Text = text;
        }

        public getText() {
            return tx_server.Text;
        }

        private cmd_apply_Click(sender: object, e: EventArgs) {
            this.ok = true;
            this.Close();
        }

        private cmd_cancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Close();
        }

        private fInput_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
        }



    }    }
}
