(function(globalObject) {
    globalObject.CSReportPreview = globalObject.CSReportPreview || {};

    globalObject.CSReportPreview.createCReportPreview = function() {

        // @ts-ignore
        let self: CSReportPreview.IcReportPreview = {};
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        let components: System.ComponentModel.IContainer = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        self.Dispose = function(disposing) {
            if (disposing && (components !== null)) {
                components.Dispose();
            }
            base.Dispose(disposing);
        };

UNKNOWN >>         #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() {
            let resources: System.ComponentModel.ComponentResourceManager = new System.ComponentModel.ComponentResourceManager(typeof(cReportPreview));
            this.toolStrip1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStrip();
            this.tsbFirstPage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbPreviousPage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbPage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripTextBox();
            this.tsbPages = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripLabel();
            this.tsbNextPage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbLastPage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbPrint = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbExportPDF = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.pnEditor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.pnReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.pnRule = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.tableLayoutPanel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TableLayoutPanel();
            this.toolStrip1.SuspendLayout();
            this.pnEditor.SuspendLayout();
            ().BeginInit();
            ().BeginInit();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // toolStrip1
            // 
            this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbFirstPage,
            this.tsbPreviousPage,
            this.tsbPage,
            this.tsbPages,
            this.tsbNextPage,
            this.tsbLastPage,
            this.toolStripSeparator1,
            this.tsbPrint,
            this.toolStripSeparator2,
            this.tsbExportPDF});
            this.toolStrip1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.toolStrip1.Name = "toolStrip1";
            this.toolStrip1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(840, 25);
            this.toolStrip1.TabIndex = 0;
            this.toolStrip1.Text = "toolStrip1";
            // 
            // tsbFirstPage
            // 
            this.tsbFirstPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbFirstPage.Image = ((resources.GetObject("tsbFirstPage.Image")));
            this.tsbFirstPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbFirstPage.Name = "tsbFirstPage";
            this.tsbFirstPage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbFirstPage.Text = "toolStripButton1";
            this.tsbFirstPage.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbFirstPage_Click);
            // 
            // tsbPreviousPage
            // 
            this.tsbPreviousPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPreviousPage.Image = ((resources.GetObject("tsbPreviousPage.Image")));
            this.tsbPreviousPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPreviousPage.Name = "tsbPreviousPage";
            this.tsbPreviousPage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbPreviousPage.Text = "toolStripButton2";
            this.tsbPreviousPage.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbPreviousPage_Click);
            // 
            // tsbPage
            // 
            this.tsbPage.Name = "tsbPage";
            this.tsbPage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(40, 25);
            this.tsbPage.KeyUp += UNKNOWN >>  can't find constructor for class System.Windows.Forms.KeyEventHandler(this.tsbPage_KeyUp);
            // 
            // tsbPages
            // 
            this.tsbPages.AutoSize = false;
            this.tsbPages.Name = "tsbPages";
            this.tsbPages.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(40, 22);
            this.tsbPages.Text = "0";
            // 
            // tsbNextPage
            // 
            this.tsbNextPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbNextPage.Image = ((resources.GetObject("tsbNextPage.Image")));
            this.tsbNextPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbNextPage.Name = "tsbNextPage";
            this.tsbNextPage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbNextPage.Text = "toolStripButton3";
            this.tsbNextPage.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbNextPage_Click);
            // 
            // tsbLastPage
            // 
            this.tsbLastPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbLastPage.Image = ((resources.GetObject("tsbLastPage.Image")));
            this.tsbLastPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbLastPage.Name = "tsbLastPage";
            this.tsbLastPage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbLastPage.Text = "toolStripButton4";
            this.tsbLastPage.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbLastPage_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbPrint
            // 
            this.tsbPrint.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPrint.Image = ((resources.GetObject("tsbPrint.Image")));
            this.tsbPrint.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPrint.Name = "tsbPrint";
            this.tsbPrint.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbPrint.Text = "toolStripButton5";
            this.tsbPrint.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbPrint_Click);
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbExportPDF
            // 
            this.tsbExportPDF.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbExportPDF.Image = ((resources.GetObject("tsbExportPDF.Image")));
            this.tsbExportPDF.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbExportPDF.Name = "tsbExportPDF";
            this.tsbExportPDF.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbExportPDF.Text = "toolStripButton6";
            this.tsbExportPDF.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbExportPDF_Click);
            // 
            // pnEditor
            // 
            this.pnEditor.AutoScroll = true;
            this.pnEditor.Controls.Add(this.pnReport);
            this.pnEditor.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnEditor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(60, 0);
            this.pnEditor.Margin = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(0);
            this.pnEditor.Name = "pnEditor";
            this.pnEditor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(780, 432);
            this.pnEditor.TabIndex = 2;
            // 
            // pnReport
            // 
            this.pnReport.BackColor = System.Drawing.SystemColors.Window;
            this.pnReport.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.pnReport.Name = "pnReport";
            this.pnReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(339, 306);
            this.pnReport.TabIndex = 0;
            this.pnReport.TabStop = false;
            this.pnReport.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.pnReport_Click);
            // 
            // pnRule
            // 
            this.pnRule.BackColor = System.Drawing.SystemColors.ControlLight;
            this.pnRule.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnRule.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.pnRule.Name = "pnRule";
            this.pnRule.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(54, 426);
            this.pnRule.TabIndex = 1;
            this.pnRule.TabStop = false;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 2;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.pnRule, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.pnEditor, 1, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 25);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 1;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(840, 432);
            this.tableLayoutPanel1.TabIndex = 3;
            // 
            // cReportPreview
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tableLayoutPanel1);
            this.Controls.Add(this.toolStrip1);
            this.Name = "cReportPreview";
            this.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(840, 457);
            this.toolStrip1.ResumeLayout(false);
            this.toolStrip1.PerformLayout();
            this.pnEditor.ResumeLayout(false);
            ().EndInit();
            ().EndInit();
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let toolStrip1: System.Windows.Forms.ToolStrip = null;
        let tsbFirstPage: System.Windows.Forms.ToolStripButton = null;
        let tsbPreviousPage: System.Windows.Forms.ToolStripButton = null;
        let tsbPage: System.Windows.Forms.ToolStripTextBox = null;
        let tsbPages: System.Windows.Forms.ToolStripLabel = null;
        let tsbNextPage: System.Windows.Forms.ToolStripButton = null;
        let tsbLastPage: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator1: System.Windows.Forms.ToolStripSeparator = null;
        let tsbPrint: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator2: System.Windows.Forms.ToolStripSeparator = null;
        let tsbExportPDF: System.Windows.Forms.ToolStripButton = null;
        let pnEditor: System.Windows.Forms.Panel = null;
        let pnRule: System.Windows.Forms.PictureBox = null;
        let pnReport: System.Windows.Forms.PictureBox = null;
        let tableLayoutPanel1: System.Windows.Forms.TableLayoutPanel = null;
        return self;

    }    }
}(globalObject));


namespace CSReportPreview {

  export interface IcReportPreview {

    Dispose: (bool) => void;
  }
}
