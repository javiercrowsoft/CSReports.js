(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createCWindow = function() {

        // @ts-ignore
        let self: CSKernelClient.IcWindow = {};
        let String: static m_title = "Message";

        self.setTitle = function(value) {
            m_title = value;
        };

        self.msgError = function(msg, title, details) {
            pMsgAux(msg, CSMSGICONS.Error, title, details);
        };

        self.msgError = function(msg, title) {
            msgError(msg, title, "");
        };

        self.msgError = function(msg) {
            msgError(msg, "@@@@@", "");
        };

        self.msgWarning = function(msg, title, details) {
            pMsgAux(msg, CSMSGICONS.Exclamation, title, details);
        };

        self.msgWarning = function(msg, title) {
            msgWarning(msg, title, "");
        };

        self.msgWarning = function(msg) {
            msgWarning(msg, "@@@@@", "");
        };

        self.ask = function(msg, defaultButton) {
            return ask(msg, defaultButton, "@@@@@");
        };

        self.ask = function(msg, defaultButton, Title) {
            return MessageBox.Show(msg, "", MessageBoxButtons.YesNo, MessageBoxIcon.Question, defaultButton) === DialogResult.Yes;
        };

        self.msgInfo = function(msg) {
            msgInfo(msg, "@@@@@");
        };

        self.msgInfo = function(msg, title) {
            pMsgAux(msg, CSMSGICONS.Information, title, "");
        };

        const pMsgAux = function(msg, icon, title, details) {
            if (title === "@@@@@") { title = m_title; }
            let fmsg: fMsg = new fMsg();
            fmsg.setIcon(icon);
            fmsg.setMessage(msg);
            fmsg.setTitle(title);
            fmsg.ShowDialog();
        };

        self.centerForm = function(form) {
            form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2;
            form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2;
        };

        self.locateFormAtLeft = function(form) {
            form.Left = 100;
            form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2;
        };

        self.locateFormAtTop = function(form) {
            let top: var = (Screen.FromControl(form).Bounds.Height - form.Height) / 2 - 200;
            form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2;
            form.Top = top;
        };
        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IcWindow {

    setTitle: (String) => void;
    msgError: (String, String, String) => void;
    msgError: (String, String) => void;
    msgError: (String) => void;
    msgWarning: (String, String, String) => void;
    msgWarning: (String, String) => void;
    msgWarning: (String) => void;
    ask: (String, MessageBoxDefaultButton) => bool;
    ask: (String, MessageBoxDefaultButton, String) => bool;
    msgInfo: (String) => void;
    msgInfo: (String, String) => void;
    centerForm: (Form) => void;
    locateFormAtLeft: (Form) => void;
    locateFormAtTop: (Form) => void;
  }
}
