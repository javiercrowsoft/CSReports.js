///<reference path="../../CSForms/controls/TextBox.ts"/>

namespace CSDatabase {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import TextBox = CSForms.TextBox;

    export class FormSettings extends Form {

        private el: HTMLElement;
        private dialog: Dialog;
        private txURL: TextBox;
        private txApiKey: TextBox;

        public constructor() {
            super();
            this.el = U.el('server-settings-dlg');
            this.dialog = new Dialog(this.el, 'server-settings-dlg-apply', 'server-settings-dlg-cancel');
            this.dialog.onApply = P.call(this, this.cmdApplyClick);
            super.setDialog(this.dialog);

            this.txURL = new TextBox(U.inputEl("server-url"));
            this.txApiKey = new TextBox(U.inputEl("server-api-key"));
        }

        public initDialog() {

        }

        private cmdApplyClick() {
            return true;
        }


        showModal() {

            return this.dialog.show({title: 'Connection Settings', height: 600, width: 500, overlay: true})
                        .then(P.call(this, (result)=> {
                            if(result) return {
                                                success: true,
                                                url: this.txURL.getText(),
                                                apiKey: this.txApiKey.getText(),
                                              };
                            else       return {
                                                success: false
                                              };
                        }));
        }

    }
}
