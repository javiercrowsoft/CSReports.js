(function(globalObject) {

    globalObject.CSReportPreview = globalObject.CSReportPreview || {}; //@@@: namespace CSReportPreview
 //@@@: {
//     public delegate void FirstPage(object sender, EventArgs e); //@@@: public delegate void FirstPage(object sender, EventArgs e);
//     public delegate void PreviousPage(object sender, EventArgs e); //@@@: public delegate void PreviousPage(object sender, EventArgs e);
//     public delegate void MoveToPage(object sender, PageEventArgs e); //@@@: public delegate void MoveToPage(object sender, PageEventArgs e);
//     public delegate void NextPage(object sender, EventArgs e); //@@@: public delegate void NextPage(object sender, EventArgs e);
//     public delegate void LastPage(object sender, EventArgs e); //@@@: public delegate void LastPage(object sender, EventArgs e);

//     public delegate void Print(object sender, EventArgs e); //@@@: public delegate void Print(object sender, EventArgs e);
//     public delegate void ExportToPDF(object sender, EventArgs e); //@@@: public delegate void ExportToPDF(object sender, EventArgs e);

    globalObject.CSReportPreview.createCReportPreview = function() {

        const self = {}; //@@@: public partial class cReportPreview : UserControl
//         public event FirstPage FirstPage; //@@@: public event FirstPage FirstPage;
//         public event PreviousPage PreviousPage; //@@@: public event PreviousPage PreviousPage;
//         public event MoveToPage MoveToPage; //@@@: public event MoveToPage MoveToPage;
//         public event NextPage NextPage;         //@@@: public event NextPage NextPage;
//         public event LastPage LastPage; //@@@: public event LastPage LastPage;

//         public event Print Print; //@@@: public event Print Print;
//         public event ExportToPDF ExportToPDF; //@@@: public event ExportToPDF ExportToPDF;

        const cReportPreview = function() { //@@@: public cReportPreview()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.getBody = function() { //@@@: public PictureBox getBody()
            return pnReport; //@@@: return pnReport;
        }; //@@@: }

        self.getGraph = function() { //@@@: public Graphics getGraph()
            return null; //@@@: return null;
        }; //@@@: }

        self.getParent = function() { //@@@: public Object getParent()
            return Parent; //@@@: return Parent;
        }; //@@@: }

        self.setCurrPage = function(page) { //@@@: public void setCurrPage(int page)
            tsbPage.Text = .ToString(); //@@@: tsbPage.Text = (page + 1).ToString();
        }; //@@@: }

        self.setPages = function(pages) { //@@@: public void setPages(int pages)
            tsbPages.Text = pages.ToString(); //@@@: tsbPages.Text = pages.ToString();
        }; //@@@: }

        const tsbFirstPage_Click = function(sender, e) { //@@@: private void tsbFirstPage_Click(object sender, EventArgs e)
            if (FirstPage !== null) { //@@@: if (FirstPage != null)
                FirstPage(this, EventArgs.Empty); //@@@: FirstPage(this, EventArgs.Empty);
            } //@@@: }
        }; //@@@: }

        const tsbPreviousPage_Click = function(sender, e) { //@@@: private void tsbPreviousPage_Click(object sender, EventArgs e)
            if (PreviousPage !== null) { //@@@: if (PreviousPage != null)
                PreviousPage(this, EventArgs.Empty); //@@@: PreviousPage(this, EventArgs.Empty);
            } //@@@: }
        }; //@@@: }

        const tsbNextPage_Click = function(sender, e) { //@@@: private void tsbNextPage_Click(object sender, EventArgs e)
            if (NextPage !== null) { //@@@: if (NextPage != null)
                NextPage(this, EventArgs.Empty); //@@@: NextPage(this, EventArgs.Empty);
            } //@@@: }
        }; //@@@: }

        const tsbLastPage_Click = function(sender, e) { //@@@: private void tsbLastPage_Click(object sender, EventArgs e)
            if (LastPage !== null) { //@@@: if (LastPage != null)
                LastPage(this, EventArgs.Empty); //@@@: LastPage(this, EventArgs.Empty);
            } //@@@: }
        }; //@@@: }

        const tsbExportPDF_Click = function(sender, e) { //@@@: private void tsbExportPDF_Click(object sender, EventArgs e)
            if (ExportToPDF !== null) { //@@@: if (ExportToPDF != null)
                ExportToPDF(this, EventArgs.Empty); //@@@: ExportToPDF(this, EventArgs.Empty);
            } //@@@: }
        }; //@@@: }

        const tsbPage_KeyUp = function(sender, e) { //@@@: private void tsbPage_KeyUp(object sender, KeyEventArgs e)
            if (e.KeyCode === Keys.Enter) { //@@@: if (e.KeyCode == Keys.Enter)
                let page = cUtil.valAsInt(tsbPage.Text); //@@@: var page = cUtil.valAsInt(tsbPage.Text);
                if (page > 0)  { //@@@: if (page > 0)
                    if (MoveToPage !== null) { //@@@: if (MoveToPage != null)
                        MoveToPage(this, new PageEventArgs(page)); //@@@: MoveToPage(this, new PageEventArgs(page));
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const tsbPrint_Click = function(sender, e) { //@@@: private void tsbPrint_Click(object sender, EventArgs e)
            if (Print !== null) { //@@@: if (Print != null)
                Print(this, EventArgs.Empty); //@@@: Print(this, EventArgs.Empty);
            } //@@@: }
        }; //@@@: }

        const pnReport_Click = function(sender, e) { //@@@: private void pnReport_Click(object sender, EventArgs e)
            pnEditor.Focus(); //@@@: pnEditor.Focus();
        }; //@@@: }
        return self;

    } //@@@: }

        self.create = function() {

            const self = {}; //@@@: public class PageEventArgs : EventArgs
        let int m_page = -1; //@@@: private readonly int m_page = -1;

        self. = function(page) { //@@@: public PageEventArgs(int page)
            m_page = page; //@@@: m_page = page;
        }; //@@@: }
        self.page { get { return m_page = null; } }; //@@@: public int page { get { return m_page; } }
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
