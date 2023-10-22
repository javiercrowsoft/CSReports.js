///<reference path="../../CSForms/controls/Dialog.ts"/>
///<reference path="../../CSForms/Form.ts"/>

namespace CSKernelClient {

    import U = CSOAPI.Utils;

    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;

    class fErrors extends Form {

        private el: HTMLElement;
        private img: HTMLImageElement;
        private title: HTMLLabelElement;
        private infoAdd: HTMLLabelElement;
        private description: HTMLLabelElement;
        private dialog: Dialog;

        public constructor() {
            super();
            this.el = U.el('error-dlg');
            this.img = U.imageEl('error-dlg-icon');
            this.title = U.labelEl('error-dlg-title');
            this.infoAdd = U.labelEl('error-dlg-info-add');
            this.description = U.labelEl('error-dlg-description');
            this.dialog = new Dialog(this.el, 'error-dlg-okay');
        }

        setErrorIcon() {
            this.img.src = "images/dialogs/error.png";
        }

        setDetails(details: string) {
            this.description.textContent = details;
        }

        showDialog() {
            return this.showModal();
        }

        showModal() {
            return this.dialog.show({title: this.title.textContent, height: 500, width: 800, overlay: true});
        }

        setWarnIcon() {
            this.img.src = "images/dialogs/warn.png";
        }

        setInfoIcon() {
            this.img.src = "images/dialogs/info.png";
        }

        setTitle(title: string) {
            this.title.textContent = title;
        }

        setInfoAdd(infoAdd: string) {
            this.infoAdd.textContent = infoAdd;
        }
    }

    export class cError {

        private lastErrorDescription = "";
        private lastErrorInfoAdd = "";
        private static silent = false;

        private static f: fErrors = null;

        public static mngError(ex: any, infoAdd: string = "") {
            console.log(ex);
            if(this.f == null) this.f = new fErrors();
            this.f.setErrorIcon();
            this.f.setDetails(ex.getMessage ? ex.getMessage() : ex.toString());
            this.f.setInfoAdd(infoAdd);
            return this.f.showDialog();
        }

        public static mngWarning(msg: string, title: string = "") {
            if(this.f == null) this.f = new fErrors();
            this.f.setWarnIcon();
            this.f.setTitle(title);
            this.f.setDetails(msg);
            return this.f.showDialog();
        }

        public getLastErrorDescription() {
            return this.lastErrorDescription;
        }

        public getLastErrorInfoAdd() {
            return this.lastErrorInfoAdd;
        }

        public static setSilent(rhs: boolean) {
            this.silent = rhs;
        }
    }
}
