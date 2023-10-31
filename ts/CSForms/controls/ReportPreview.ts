///<reference path="Control.ts"/>

namespace CSForms {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;

    export class ReportPreview extends Control {

        private static IMAGE_FIRST_PAGE = "tsbFirstPage.Image.png";
        private static IMAGE_PREVIOUS_PAGE = "tsbPreviousPage.Image.png";
        private static IMAGE_NEXT_PAGE = "tsbNextPage.Image.png";
        private static IMAGE_LAST_PAGE = "tsbLastPage.Image.png";
        private static TOTAL_PAGES_ID = "totalPages";
        private static CURRENT_PAGE_ID = "moveToPage";

        private static previewIndex = 0;

        private parent: object;

        private firstPage: (sender: object, e: EventArgs) => void = null;
        private previousPage: (sender: object, e: EventArgs) => void = null;
        private moveToPage: (sender: object, e: PageEventArgs) => void = null;
        private nextPage: (sender: object, e: EventArgs) => void = null;
        private lastPage: (sender: object, e: EventArgs) => void = null;
        private exportToPDF: (sender: object, e: EventArgs) => void = null;
        private print: (sender: object, e: EventArgs) => void = null;

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
            this.createToolbar(toolbarNode);
            this.picPreview = new PictureBox("pnReport" + ReportPreview.previewIndex++, picReportNode);
        }

        private createToolbar(toolbarNode: HTMLDivElement) {
            this.toolbar = new Toolbar("preview-toolbar" + ReportPreview.previewIndex++, toolbarNode);
            this.toolbar.addButton("firstPage", ReportPreview.IMAGE_FIRST_PAGE, P.call(this, () => this.buttonClick(this.firstPage, EventArgs.Empty)));
            this.toolbar.addButton("previousPage", ReportPreview.IMAGE_PREVIOUS_PAGE, P.call(this, () => this.buttonClick(this.previousPage, EventArgs.Empty)));
            this.toolbar.addInput("moveToPage",
                P.call(this, (event) => {
                    if(event.key === "Enter") {
                        const page = U.valInt(event.target.value);
                        if(page > 0 && this.moveToPage !== null)
                        this.moveToPage(this, new PageEventArgs(page));
                    }
                }));
            this.toolbar.addNumberLabel(ReportPreview.TOTAL_PAGES_ID);
            this.toolbar.addButton("nextPage", ReportPreview.IMAGE_NEXT_PAGE, P.call(this, () => this.buttonClick(this.nextPage, EventArgs.Empty)));
            this.toolbar.addButton("lastPage", ReportPreview.IMAGE_LAST_PAGE, P.call(this, () => this.buttonClick(this.lastPage, EventArgs.Empty)));
        }

        private buttonClick(f: (sender: object, e: any) => void, e: any) {
            if(f !== null) f(this, e);
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

        setNextPage(nextPage: (sender: object, e: EventArgs) => void) {
            this.nextPage = nextPage;
        }

        setLastPage(lastPage: (sender: object, e: EventArgs) => void) {
            this.lastPage = lastPage;
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
            (this.toolbar.getControls().item(ReportPreview.CURRENT_PAGE_ID) as HTMLInputElement).value = (page +1).toString();
        }

        public setPages(pages: number) {
            this.toolbar.getControls().item(ReportPreview.TOTAL_PAGES_ID).textContent = pages.toString();
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