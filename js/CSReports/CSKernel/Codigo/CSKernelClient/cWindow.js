(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createCWindow = function() {

        const self = {}; //@@@: public static class cWindow
        let String m_title = "Message"; //@@@: private static String m_title = "Message";

        self.setTitle = function(value) { //@@@: public static void setTitle(String value)
            m_title = value; //@@@: m_title = value;
        }; //@@@: }

        self.msgError = function(msg, title, details) { //@@@: public static void msgError(String msg, String title, String details)
            pMsgAux(msg, CSMSGICONS.Error, title, details); //@@@: pMsgAux(msg, CSMSGICONS.Error, title, details);
        }; //@@@: }

        self.msgError = function(msg, title) { //@@@: public static void msgError(String msg, String title)
            msgError(msg, title, ""); //@@@: msgError(msg, title, "");
        }; //@@@: }

        self.msgError = function(msg) { //@@@: public static void msgError(String msg)
            msgError(msg, "@@@@@", ""); //@@@: msgError(msg, "@@@@@", "");
        }; //@@@: }

        self.msgWarning = function(msg, title, details) { //@@@: public static void msgWarning(String msg, String title, String details)
            pMsgAux(msg, CSMSGICONS.Exclamation, title, details); //@@@: pMsgAux(msg, CSMSGICONS.Exclamation, title, details);
        }; //@@@: }

        self.msgWarning = function(msg, title) { //@@@: public static void msgWarning(String msg, String title)
            msgWarning(msg, title, ""); //@@@: msgWarning(msg, title, "");
        }; //@@@: }

        self.msgWarning = function(msg) { //@@@: public static void msgWarning(String msg)
            msgWarning(msg, "@@@@@", ""); //@@@: msgWarning(msg, "@@@@@", "");
        }; //@@@: }

        self.ask = function(msg, defaultButton) { //@@@: public static bool ask(String msg, MessageBoxDefaultButton defaultButton)
            return ask(msg, defaultButton, "@@@@@"); //@@@: return ask(msg, defaultButton, "@@@@@");
        }; //@@@: }

        self.ask = function(msg, defaultButton, Title) { //@@@: public static bool ask(String msg, MessageBoxDefaultButton defaultButton, String Title)
            return MessageBox.Show(msg, "", MessageBoxButtons.YesNo, MessageBoxIcon.Question, defaultButton) === DialogResult.Yes; //@@@: return MessageBox.Show(msg, "", MessageBoxButtons.YesNo, MessageBoxIcon.Question, defaultButton) == DialogResult.Yes;
        }; //@@@: }

        self.msgInfo = function(msg) { //@@@: public static void msgInfo(String msg)
            msgInfo(msg, "@@@@@"); //@@@: msgInfo(msg, "@@@@@");
        }; //@@@: }

        self.msgInfo = function(msg, title) { //@@@: public static void msgInfo(String msg, String title)
            pMsgAux(msg, CSMSGICONS.Information, title, ""); //@@@: pMsgAux(msg, CSMSGICONS.Information, title, "");
        }; //@@@: }

        const pMsgAux = function(msg, icon, title, details) { //@@@: private static void pMsgAux(String msg, CSMSGICONS icon, String title, String details)
            if (title === "@@@@@") { title = m_title; } //@@@: if (title == "@@@@@") { title = m_title; }
            let fmsg = new fMsg(); //@@@: fMsg fmsg = new fMsg();
            fmsg.setIcon(icon); //@@@: fmsg.setIcon(icon);
            fmsg.setMessage(msg); //@@@: fmsg.setMessage(msg);
            fmsg.setTitle(title); //@@@: fmsg.setTitle(title);
            fmsg.ShowDialog(); //@@@: fmsg.ShowDialog();
        }; //@@@: }

        self.centerForm = function(form) { //@@@: public static void centerForm(Form form)
            form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2; //@@@: form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2;
            form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2; //@@@: form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2;
        }; //@@@: }

        self.locateFormAtLeft = function(form) { //@@@: public static void locateFormAtLeft(Form form)
            form.Left = 100; //@@@: form.Left = 100;
            form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2; //@@@: form.Top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2;
        }; //@@@: }

        self.locateFormAtTop = function(form) { //@@@: public static void locateFormAtTop(Form form)
            let top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2 - 200; //@@@: var top = (Screen.FromControl(form).Bounds.Height - form.Height) / 2 - 200;
            form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2; //@@@: form.Left = (Screen.FromControl(form).Bounds.Width - form.Width) / 2;
            form.Top = top; //@@@: form.Top = top;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
