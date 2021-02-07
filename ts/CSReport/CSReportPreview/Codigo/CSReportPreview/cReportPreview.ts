

namespace CSReportPreview
{
//     public delegate void FirstPage(object sender, EventArgs e);
//     public delegate void PreviousPage(object sender, EventArgs e);
//     public delegate void MoveToPage(object sender, PageEventArgs e);
//     public delegate void NextPage(object sender, EventArgs e);
//     public delegate void LastPage(object sender, EventArgs e);

//     public delegate void Print(object sender, EventArgs e);
//     public delegate void ExportToPDF(object sender, EventArgs e);

    export class cReportPreview {


    {
//         public event FirstPage FirstPage;
//         public event PreviousPage PreviousPage;
//         public event MoveToPage MoveToPage;
//         public event NextPage NextPage;        
//         public event LastPage LastPage;

//         public event Print Print;
//         public event ExportToPDF ExportToPDF;

        public constructor() {
            InitializeComponent();
        }

        public getBody() {
            return pnReport;
        }

        public getGraph() {
            return null;
        }

        public getParent() {
            return Parent;
        }

        public setCurrPage(page: number) {
            tsbPage.Text = .toString();
        }

        public setPages(pages: number) {
            tsbPages.Text = pages.toString();
        }

        private tsbFirstPage_Click(sender: object, e: EventArgs) {
            if (FirstPage !== null) {
                FirstPage(this, EventArgs.Empty);
            }
        }

        private tsbPreviousPage_Click(sender: object, e: EventArgs) {
            if (PreviousPage !== null) {
                PreviousPage(this, EventArgs.Empty);
            }
        }

        private tsbNextPage_Click(sender: object, e: EventArgs) {
            if (NextPage !== null) {
                NextPage(this, EventArgs.Empty);
            }
        }

        private tsbLastPage_Click(sender: object, e: EventArgs) {
            if (LastPage !== null) {
                LastPage(this, EventArgs.Empty);
            }
        }

        private tsbExportPDF_Click(sender: object, e: EventArgs) {
            if (ExportToPDF !== null) {
                ExportToPDF(this, EventArgs.Empty);
            }
        }

        private tsbPage_KeyUp(sender: object, e: KeyEventArgs) {
            if (e.KeyCode === Keys.Enter) {
                let page: var = cUtil.valAsInt(tsbPage.Text);
                if (page > 0)  {
                    if (MoveToPage !== null) {
                        MoveToPage(this, new PageEventArgs(page));
                    }
                }
            }
        }

        private tsbPrint_Click(sender: object, e: EventArgs) {
            if (Print !== null) {
                Print(this, EventArgs.Empty);
            }
        }

        private pnReport_Click(sender: object, e: EventArgs) {
            pnEditor.Focus();
        }


    } 





    public class PageEventArgs : EventArgs    export class PageEventArgs {


    {
        private int: readonly this.page = -1;

        public constructor(page: number) {
            this.page = page;
        }
        public page: number = null;{ get { return this.page; } };


    } 



}
