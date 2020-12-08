(function(globalObject) {

    globalObject.CSReportPreview = globalObject.CSReportPreview || {};

//     public delegate void FirstPage(object sender, EventArgs e);
//     public delegate void PreviousPage(object sender, EventArgs e);
//     public delegate void MoveToPage(object sender, PageEventArgs e);
//     public delegate void NextPage(object sender, EventArgs e);
//     public delegate void LastPage(object sender, EventArgs e);

//     public delegate void Print(object sender, EventArgs e);
//     public delegate void ExportToPDF(object sender, EventArgs e);

    globalObject.CSReportPreview.createCReportPreview = function() {

        const self = {};
//         public event FirstPage FirstPage;
//         public event PreviousPage PreviousPage;
//         public event MoveToPage MoveToPage;
//         public event NextPage NextPage;        
//         public event LastPage LastPage;

//         public event Print Print;
//         public event ExportToPDF ExportToPDF;

        const cReportPreview = function() {
            InitializeComponent();
        };

        self.getBody = function() {
            return pnReport;
        };

        self.getGraph = function() {
            return null;
        };

        self.getParent = function() {
            return Parent;
        };

        self.setCurrPage = function(page) {
            tsbPage.Text = .ToString();
        };

        self.setPages = function(pages) {
            tsbPages.Text = pages.ToString();
        };

        const tsbFirstPage_Click = function(sender, e) {
            if (FirstPage !== null) {
                FirstPage(this, EventArgs.Empty);
            }
        };

        const tsbPreviousPage_Click = function(sender, e) {
            if (PreviousPage !== null) {
                PreviousPage(this, EventArgs.Empty);
            }
        };

        const tsbNextPage_Click = function(sender, e) {
            if (NextPage !== null) {
                NextPage(this, EventArgs.Empty);
            }
        };

        const tsbLastPage_Click = function(sender, e) {
            if (LastPage !== null) {
                LastPage(this, EventArgs.Empty);
            }
        };

        const tsbExportPDF_Click = function(sender, e) {
            if (ExportToPDF !== null) {
                ExportToPDF(this, EventArgs.Empty);
            }
        };

        const tsbPage_KeyUp = function(sender, e) {
            if (e.KeyCode === Keys.Enter) {
                let page: var= cUtil.valAsInt(tsbPage.Text);
                if (page > 0)  {
                    if (MoveToPage !== null) {
                        MoveToPage(this, new PageEventArgs(page));
                    }
                }
            }
        };

        const tsbPrint_Click = function(sender, e) {
            if (Print !== null) {
                Print(this, EventArgs.Empty);
            }
        };

        const pnReport_Click = function(sender, e) {
            pnEditor.Focus();
        };
        return self;

    }

        self.create = function() {

            const self = {};
        let int: readonlym_page = -1;

        self. = function(page) {
            m_page = page;
        };
        self.page: number = null;{ get { return m_page; } };
        return self;

    }

}(globalObject));
