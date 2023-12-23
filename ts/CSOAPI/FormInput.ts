namespace CSOAPI {

    import U = CSOAPI.Utils;

    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;

    export class FormInput extends Form {

        private el: HTMLElement;
        private img: HTMLImageElement;
        private title: HTMLLabelElement;
        private input: HTMLInputElement;
        private description: HTMLLabelElement;
        private dialog: Dialog;

        public constructor() {
            super();
            this.el = U.el('input-dlg');
            this.img = U.imageEl('input-dlg-icon');
            this.img.src = "images/dialogs/info.png";
            this.title = U.labelEl('input-dlg-title');
            this.input = U.inputEl('input-dlg-input');
            this.description = U.labelEl('input-dlg-description');
            this.dialog = new Dialog(this.el, 'input-dlg-okay');
            super.setDialog(this.dialog);
        }

        setDetails(details: string) {
            this.description.textContent = details;
        }

        showDialog() {
            return this.showModal();
        }

        showModal() {
            return this.dialog
                .show({title: this.title.textContent, height: 500, width: 800, overlay: true})
                .then((success) =>  { return { success: success, value: this.input.value}; });
        }

        setTitle(title: string) {
            this.title.textContent = title;
        }

        setInput(input: string) {
            this.input.value = input;
        }
    }
}