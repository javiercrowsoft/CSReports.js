///<reference path="Control.ts"/>

namespace CSForms {

    export class ReportPreview extends Control {

        private static previewIndex = 0;

        private readonly div: HTMLDivElement;
        private toolbar: Toolbar;
        private picPreview: PictureBox;
        public readonly name: string;

        public constructor(name: string, el: HTMLElement) {
            super(el);

            this.name = name;

            const toolbarNode = document.createElement('div');
            toolbarNode.className = "preview-toolbar";
            el.appendChild(toolbarNode);

            const pnEditorNode = document.createElement('div');
            pnEditorNode.className = "editor-container";
            el.appendChild(pnEditorNode);

            const picReportNode = document.createElement('div');
            picReportNode.className = "report";
            pnEditorNode.appendChild(picReportNode);

            this.div = el as HTMLDivElement;
            this.toolbar = new Toolbar("toolbar" + ReportPreview.previewIndex++, toolbarNode);
            this.picPreview = new PictureBox("pnReport" + ReportPreview.previewIndex++, picReportNode);
        }
    }
}