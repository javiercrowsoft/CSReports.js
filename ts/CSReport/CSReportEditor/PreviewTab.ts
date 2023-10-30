namespace CSReportEditor {

    import P = CSKernelClient.Callable;
    import TabPage = CSForms.TabPage;
    import ReportPreview = CSForms.ReportPreview;

    export class PreviewTab {
        close() {
            return P._();
        }

        public constructor(fMain: FMain, reportPreview: ReportPreview, previewTab: TabPage) {

        }

        public isEditor() {
            return false;
        }

        public keyUp(sender: object, e) {}
        public keyDown(sender: object, e) {}

    }
}