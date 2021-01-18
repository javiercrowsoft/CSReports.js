

namespace CSKernelClient
{
    export class cWindow {


    {
        private String: static this.title = "Message";

        public setTitle(value: string) {
            this.title = value;
        }

        public msgError(msg: string, title: string, details: string) {
            pMsgAux(msg, CSMSGICONS.Error, title, details);
        }

        public msgError(msg: string, title: string) {
            msgError(msg, title, "");
        }

        public msgError(msg: string) {
            msgError(msg, "@@@@@", "");
        }

        public msgWarning(msg: string, title: string, details: string) {
            pMsgAux(msg, CSMSGICONS.Exclamation, title, details);
        }

        public msgWarning(msg: string, title: string) {
            msgWarning(msg, title, "");
        }

        public msgWarning(msg: string) {
            msgWarning(msg, "@@@@@", "");
        }

        public ask(msg: string, defaultButton: MessageBoxDefaultButton) {
            return ask(msg, defaultButton, "@@@@@");
        }

        public ask(msg: string, defaultButton: MessageBoxDefaultButton, Title: string) {
            return MessageBox.Show(msg, "", MessageBoxButtons.YesNo, MessageBoxIcon.Question, defaultButton) === DialogResult.Yes;
        }

        public msgInfo(msg: string) {
            msgInfo(msg, "@@@@@");
        }

        public msgInfo(msg: string, title: string) {
            pMsgAux(msg, CSMSGICONS.Information, title, "");
        }

        private pMsgAux(msg: string, icon: CSMSGICONS, title: string, details: string) {
            if (title === "@@@@@") { title = this.title; }
            let fmsg: fMsg = new fMsg();
            fmsg.setIcon(icon);
            fmsg.setMessage(msg);
            fmsg.setTitle(title);
            fmsg.ShowDialog();
        }

        public centerForm(form: Form) {
            form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2;
            form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2;
        }

        public locateFormAtLeft(form: Form) {
            form.Left = 100;
            form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2;
        }

        public locateFormAtTop(form: Form) {
            let top: var = (Screen.FromControl(form).Bounds.Height - form.Height) / 2 - 200;
            form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2;
            form.Top = top;
        }


    }    }
}
