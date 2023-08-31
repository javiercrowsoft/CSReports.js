namespace CSReportPreview {
//     public delegate void FirstPage(object sender, EventArgs e);
//     public delegate void PreviousPage(object sender, EventArgs e);
//     public delegate void MoveToPage(object sender, PageEventArgs e);
//     public delegate void NextPage(object sender, EventArgs e);
//     public delegate void LastPage(object sender, EventArgs e);

//     public delegate void Print(object sender, EventArgs e);
//     public delegate void ExportToPDF(object sender, EventArgs e);

    import PictureBox = CSReportEditor.PictureBox;
    import Panel = CSReportEditor.Panel;

    export class cReportPreview {
//         public event FirstPage FirstPage;
//         public event PreviousPage PreviousPage;
//         public event MoveToPage MoveToPage;
//         public event NextPage NextPage;        
//         public event LastPage LastPage;

//         public event Print Print;
//         public event ExportToPDF ExportToPDF;

        private pnReport: PictureBox;
        private pnEditor: Panel;
        private parent: object;

        private firstPage: (sender: object, e: EventArgs) => void;
        private previousPage: (sender: object, e: EventArgs) => void;
        private moveToPage: (sender: object, e: PageEventArgs) => void;
        private moveToNext: (sender: object, e: EventArgs) => void;
        private moveToLast: (sender: object, e: EventArgs) => void;
        private exportToPDF: (sender: object, e: EventArgs) => void;
        private print: (sender: object, e: EventArgs) => void;

        public constructor() {
            // InitializeComponent();
        }

        public getBody() {
            return this.pnReport;
        }

        public getGraph() {
            return null;
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

        private tsbFirstPage_Click(sender: object, e: object) {
            if (this.firstPage !== null) {
                this.firstPage(this, EventArgs.Empty);
            }
        }

        private tsbPreviousPage_Click(sender: object, e: object) {
            if (this.previousPage !== null) {
                this.previousPage(this, EventArgs.Empty);
            }
        }

        private tsbNextPage_Click(sender: object, e: object) {
            if (this.moveToNext !== null) {
                this.moveToNext(this, EventArgs.Empty);
            }
        }

        private tsbLastPage_Click(sender: object, e: object) {
            if (this.moveToLast !== null) {
                this.moveToLast(this, EventArgs.Empty);
            }
        }

        private tsbExportPDF_Click(sender: object, e: object) {
            if (this.exportToPDF !== null) {
                this.exportToPDF(this, EventArgs.Empty);
            }
        }

        private tsbPage_KeyUp(sender: object, e: object) {
            /*
            if (e.KeyCode === Keys.Enter) {
                let page = Utils.valInt(tsbPage.Text);
                if (page > 0)  {
                    if (MoveToPage !== null) {
                        MoveToPage(this, new PageEventArgs(page));
                    }
                }
            }
             */
        }

        private tsbPrint_Click(sender: object, e: object) {
            if (this.print !== null) {
                this.print(this, EventArgs.Empty);
            }
        }

        private pnReport_Click(sender: object, e: object) {
            this.pnEditor.focus();
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
