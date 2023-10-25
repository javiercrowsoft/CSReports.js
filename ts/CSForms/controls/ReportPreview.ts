///<reference path="Control.ts"/>

namespace CSForms {

    export class ReportPreview extends Control {

        private static previewIndex = 0;

        private parent: object;

        private firstPage: (sender: object, e: EventArgs) => void;
        private previousPage: (sender: object, e: EventArgs) => void;
        private moveToPage: (sender: object, e: PageEventArgs) => void;
        private moveToNext: (sender: object, e: EventArgs) => void;
        private moveToLast: (sender: object, e: EventArgs) => void;
        private exportToPDF: (sender: object, e: EventArgs) => void;
        private print: (sender: object, e: EventArgs) => void;

        private readonly div: HTMLDivElement;
        private toolbar: Toolbar;
        private picPreview: PictureBox;
        public readonly name: string;

        public constructor(name: string, el: HTMLElement, parent: object =  null) {
            super(el);

            this.name = name;
            this.parent = parent;

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

        setFirstPage(firstPage: (sender: object, e: object) => void) {
            this.firstPage = firstPage;
        }

        setPreviousPage(previousPage: (sender: object, e: EventArgs) => void) {
            this.previousPage = previousPage;
        }

        setMoveToPage(moveToPage: (sender: object, e: PageEventArgs) => void) {
            this.moveToPage = moveToPage;
        }

        setNextPage(moveToNext: (sender: object, e: EventArgs) => void) {
            this.moveToNext = moveToNext;
        }

        setLastPage(moveToLast: (sender: object, e: EventArgs) => void) {
            this.moveToLast = moveToLast;
        }

        //-------------------------------------------------------------------

        public getBody() {
            return this.picPreview;
        }

        public getGraph() {
            return this.picPreview.getGraphics();
        }

        public getParent() {
            return this.parent;
        }

        public setCurrPage(page: number) {
            //tsbPage.setText(.toString());
        }

        public setPages(pages: number) {
            //tsbPages.setText(pages.toString());
        }
    }

    export class EventArgs {
        public static readonly Empty = new EventArgs();
    }

    export class PageEventArgs extends EventArgs {
        private readonly page: number = -1;

        public constructor(page: number) {
            super();
            this.page = page;
        }

        getPage () {
            return this.page;
        }
    }
}