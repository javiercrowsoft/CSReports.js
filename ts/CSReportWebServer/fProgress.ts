///<reference path="../CSForms/controls/ProgressBar.ts"/>

namespace CSReportWebServer {

    import U = CSOAPI.Utils;

    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import Label = CSForms.Label;
    import ProgressBar = CSForms.ProgressBar;

    export class FProgress extends Form {

        private el: HTMLElement;
        private title: HTMLLabelElement;
        private currPage: Label;
        private task: Label;
        private currRow: Label;
        private rowCount: Label;
        private progressBar: ProgressBar;
        private dialog: Dialog;

        public constructor() {
            super();
            this.el = U.el('progress-dlg-template').cloneNode(true) as HTMLElement;
            this.el.id = null;
            this.currPage = new Label(U.labelElc('progress-dlg-curr-page', this.el));
            this.task = new Label(U.labelElc('progress-dlg-task', this.el));
            this.rowCount = new Label(U.labelElc('progress-dlg-row-count', this.el));
            this.currRow = new Label(U.labelElc('progress-dlg-curr-row', this.el));
            this.progressBar = new ProgressBar(U.divElc('progress-dlg-progress-bar-status', this.el));
            this.title = U.labelElc('progress-dlg-title', this.el);
            this.title.textContent = 'Executing report';
            this.dialog = new Dialog(this.el, 'error-dlg-okay');
        }

        getLbCurrPage(): any {
            return this.currPage;
        }

        getLbTask(): any {
            return this.task;
        }

        getLbCurrRecord(): any {
            return this.currRow;
        }

        getLbRecordCount(): any {
            return this.rowCount;
        }

        getPrgBar(): any {
            return this.progressBar;
        }

        show(owner = null) {
            return this.showDialog();
        }

        showDialog() {
            return this.showModal();
        }

        showModal() {
            return this.dialog.show({title: this.title.textContent, height: 500, width: 800, overlay: true});
        }
/*
        private update() {
            const element = document.getElementById("myprogressBar");
            let width = 1;
            const identity = setInterval(scene, 10);
            function scene() {
                if (width >= 100) {
                    clearInterval(identity);
                } else {
                    width++;
                    element.style.width = width + '%';
                    element.innerHTML = width * 1 + '%';
                }
            }
        }*/
    }
}
