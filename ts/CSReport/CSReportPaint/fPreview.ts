///<reference path="../../CSForms/controls/ReportPreview.ts"/>

namespace CSReportPaint {

    import U = CSOAPI.Utils;

    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import ReportPreview = CSForms.ReportPreview;

    export class fPreview extends Form {

        private el: HTMLElement;
        private title: HTMLLabelElement;
        private reportPreview: ReportPreview;
        private dialog: Dialog;


        public constructor() {
            super();
            this.el = U.el('preview-dlg-template').cloneNode(true) as HTMLElement;
            this.el.id = null;
            this.title = U.labelElc('preview-dlg-title', this.el);
            this.title.textContent = 'Preview report';
            this.reportPreview = new ReportPreview("reportPreview", U.elc('preview-dlg-report-preview', this.el));
            this.dialog = new Dialog(this.el, 'preview-dlg-okay');
            super.setDialog(this.dialog);
        }

        getRpwReport() {
            return this.reportPreview;
        }

        show(owner = null) {
            return this.showDialog();
        }

        showDialog() {
            return this.showModal();
        }

        showModal() {
            return this.dialog.show({title: this.title.textContent, height: 1024, width: 800, overlay: true});
        }
    }

}
