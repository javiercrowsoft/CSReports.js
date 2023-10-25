namespace CSForms {

    export class Form {

        private _dialog: Dialog;

        public setDialog(dialog: Dialog) {
            this._dialog = dialog;
        }

        show(owner = null) {

        }

        showDialog() {

        }

        close(result: boolean = false) {
            this._dialog.close(result);
        }

        getVisible() {
            return false;
        }

        hide() {

        }

        bringToFront() {

        }

        isDisposed() {
            return false;
        }

    }
}