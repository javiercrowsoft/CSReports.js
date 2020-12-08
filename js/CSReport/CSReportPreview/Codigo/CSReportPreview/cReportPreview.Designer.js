(function(globalObject) {
    globalObject.CSReportPreview = globalObject.CSReportPreview || {}; //@@@: namespace CSReportPreview
 //@@@: {
UNKNOWN >>     partial class cReportPreview //@@@: partial class cReportPreview
    { //@@@: {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        let components = null; //@@@: private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        self. = function(disposing) { //@@@: protected override void Dispose(bool disposing)
            const  = function(null) { //@@@: if (disposing && (components != null))
                components.Dispose(); //@@@: components.Dispose();
            } //@@@: }
            base.Dispose(disposing); //@@@: base.Dispose(disposing);
        }; //@@@: }

UNKNOWN >>         #region Component Designer generated code //@@@: #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() { //@@@: private void InitializeComponent()
            let resources = new System.ComponentModel.ComponentResourceManager(typeof(cReportPreview)); //@@@: System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(cReportPreview));
            this.toolStrip1 = new System.Windows.Forms.ToolStrip(); //@@@: this.toolStrip1 = new System.Windows.Forms.ToolStrip();
            this.tsbFirstPage = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbFirstPage = new System.Windows.Forms.ToolStripButton();
            this.tsbPreviousPage = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbPreviousPage = new System.Windows.Forms.ToolStripButton();
            this.tsbPage = new System.Windows.Forms.ToolStripTextBox(); //@@@: this.tsbPage = new System.Windows.Forms.ToolStripTextBox();
            this.tsbPages = new System.Windows.Forms.ToolStripLabel(); //@@@: this.tsbPages = new System.Windows.Forms.ToolStripLabel();
            this.tsbNextPage = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbNextPage = new System.Windows.Forms.ToolStripButton();
            this.tsbLastPage = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbLastPage = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbPrint = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbPrint = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbExportPDF = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbExportPDF = new System.Windows.Forms.ToolStripButton();
            this.pnEditor = new System.Windows.Forms.Panel(); //@@@: this.pnEditor = new System.Windows.Forms.Panel();
            this.pnReport = new System.Windows.Forms.PictureBox(); //@@@: this.pnReport = new System.Windows.Forms.PictureBox();
            this.pnRule = new System.Windows.Forms.PictureBox(); //@@@: this.pnRule = new System.Windows.Forms.PictureBox();
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel(); //@@@: this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.toolStrip1.SuspendLayout(); //@@@: this.toolStrip1.SuspendLayout();
            this.pnEditor.SuspendLayout(); //@@@: this.pnEditor.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnReport)).BeginInit();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnRule)).BeginInit();
            this.tableLayoutPanel1.SuspendLayout(); //@@@: this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout(); //@@@: this.SuspendLayout();
            // 
            // toolStrip1
            // 
            this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.toolStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbFirstPage, //@@@: this.tsbFirstPage,
            this.tsbPreviousPage, //@@@: this.tsbPreviousPage,
            this.tsbPage, //@@@: this.tsbPage,
            this.tsbPages, //@@@: this.tsbPages,
            this.tsbNextPage, //@@@: this.tsbNextPage,
            this.tsbLastPage, //@@@: this.tsbLastPage,
            this.toolStripSeparator1, //@@@: this.toolStripSeparator1,
            this.tsbPrint, //@@@: this.tsbPrint,
            this.toolStripSeparator2, //@@@: this.toolStripSeparator2,
            this.tsbExportPDF}); //@@@: this.tsbExportPDF});
            this.toolStrip1.Location = new System.Drawing.Point(0, 0); //@@@: this.toolStrip1.Location = new System.Drawing.Point(0, 0);
            this.toolStrip1.Name = "toolStrip1"; //@@@: this.toolStrip1.Name = "toolStrip1";
            this.toolStrip1.Size = new System.Drawing.Size(840, 25); //@@@: this.toolStrip1.Size = new System.Drawing.Size(840, 25);
            this.toolStrip1.TabIndex = 0; //@@@: this.toolStrip1.TabIndex = 0;
            this.toolStrip1.Text = "toolStrip1"; //@@@: this.toolStrip1.Text = "toolStrip1";
            // 
            // tsbFirstPage
            // 
            this.tsbFirstPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbFirstPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbFirstPage.Image = ((resources.GetObject("tsbFirstPage.Image"))); //@@@: this.tsbFirstPage.Image = ((System.Drawing.Image)(resources.GetObject("tsbFirstPage.Image")));
            this.tsbFirstPage.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbFirstPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbFirstPage.Name = "tsbFirstPage"; //@@@: this.tsbFirstPage.Name = "tsbFirstPage";
            this.tsbFirstPage.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbFirstPage.Size = new System.Drawing.Size(23, 22);
            this.tsbFirstPage.Text = "toolStripButton1"; //@@@: this.tsbFirstPage.Text = "toolStripButton1";
            this.tsbFirstPage.Click += new System.EventHandler(this.tsbFirstPage_Click); //@@@: this.tsbFirstPage.Click += new System.EventHandler(this.tsbFirstPage_Click);
            // 
            // tsbPreviousPage
            // 
            this.tsbPreviousPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbPreviousPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPreviousPage.Image = ((resources.GetObject("tsbPreviousPage.Image"))); //@@@: this.tsbPreviousPage.Image = ((System.Drawing.Image)(resources.GetObject("tsbPreviousPage.Image")));
            this.tsbPreviousPage.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbPreviousPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPreviousPage.Name = "tsbPreviousPage"; //@@@: this.tsbPreviousPage.Name = "tsbPreviousPage";
            this.tsbPreviousPage.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbPreviousPage.Size = new System.Drawing.Size(23, 22);
            this.tsbPreviousPage.Text = "toolStripButton2"; //@@@: this.tsbPreviousPage.Text = "toolStripButton2";
            this.tsbPreviousPage.Click += new System.EventHandler(this.tsbPreviousPage_Click); //@@@: this.tsbPreviousPage.Click += new System.EventHandler(this.tsbPreviousPage_Click);
            // 
            // tsbPage
            // 
            this.tsbPage.Name = "tsbPage"; //@@@: this.tsbPage.Name = "tsbPage";
            this.tsbPage.Size = new System.Drawing.Size(40, 25); //@@@: this.tsbPage.Size = new System.Drawing.Size(40, 25);
            this.tsbPage.KeyUp += new System.Windows.Forms.KeyEventHandler(this.tsbPage_KeyUp); //@@@: this.tsbPage.KeyUp += new System.Windows.Forms.KeyEventHandler(this.tsbPage_KeyUp);
            // 
            // tsbPages
            // 
            this.tsbPages.AutoSize = false; //@@@: this.tsbPages.AutoSize = false;
            this.tsbPages.Name = "tsbPages"; //@@@: this.tsbPages.Name = "tsbPages";
            this.tsbPages.Size = new System.Drawing.Size(40, 22); //@@@: this.tsbPages.Size = new System.Drawing.Size(40, 22);
            this.tsbPages.Text = "0"; //@@@: this.tsbPages.Text = "0";
            // 
            // tsbNextPage
            // 
            this.tsbNextPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbNextPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbNextPage.Image = ((resources.GetObject("tsbNextPage.Image"))); //@@@: this.tsbNextPage.Image = ((System.Drawing.Image)(resources.GetObject("tsbNextPage.Image")));
            this.tsbNextPage.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbNextPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbNextPage.Name = "tsbNextPage"; //@@@: this.tsbNextPage.Name = "tsbNextPage";
            this.tsbNextPage.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbNextPage.Size = new System.Drawing.Size(23, 22);
            this.tsbNextPage.Text = "toolStripButton3"; //@@@: this.tsbNextPage.Text = "toolStripButton3";
            this.tsbNextPage.Click += new System.EventHandler(this.tsbNextPage_Click); //@@@: this.tsbNextPage.Click += new System.EventHandler(this.tsbNextPage_Click);
            // 
            // tsbLastPage
            // 
            this.tsbLastPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbLastPage.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbLastPage.Image = ((resources.GetObject("tsbLastPage.Image"))); //@@@: this.tsbLastPage.Image = ((System.Drawing.Image)(resources.GetObject("tsbLastPage.Image")));
            this.tsbLastPage.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbLastPage.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbLastPage.Name = "tsbLastPage"; //@@@: this.tsbLastPage.Name = "tsbLastPage";
            this.tsbLastPage.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbLastPage.Size = new System.Drawing.Size(23, 22);
            this.tsbLastPage.Text = "toolStripButton4"; //@@@: this.tsbLastPage.Text = "toolStripButton4";
            this.tsbLastPage.Click += new System.EventHandler(this.tsbLastPage_Click); //@@@: this.tsbLastPage.Click += new System.EventHandler(this.tsbLastPage_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1"; //@@@: this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator1.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbPrint
            // 
            this.tsbPrint.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbPrint.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPrint.Image = ((resources.GetObject("tsbPrint.Image"))); //@@@: this.tsbPrint.Image = ((System.Drawing.Image)(resources.GetObject("tsbPrint.Image")));
            this.tsbPrint.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbPrint.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPrint.Name = "tsbPrint"; //@@@: this.tsbPrint.Name = "tsbPrint";
            this.tsbPrint.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbPrint.Size = new System.Drawing.Size(23, 22);
            this.tsbPrint.Text = "toolStripButton5"; //@@@: this.tsbPrint.Text = "toolStripButton5";
            this.tsbPrint.Click += new System.EventHandler(this.tsbPrint_Click); //@@@: this.tsbPrint.Click += new System.EventHandler(this.tsbPrint_Click);
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2"; //@@@: this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator2.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbExportPDF
            // 
            this.tsbExportPDF.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbExportPDF.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbExportPDF.Image = ((resources.GetObject("tsbExportPDF.Image"))); //@@@: this.tsbExportPDF.Image = ((System.Drawing.Image)(resources.GetObject("tsbExportPDF.Image")));
            this.tsbExportPDF.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbExportPDF.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbExportPDF.Name = "tsbExportPDF"; //@@@: this.tsbExportPDF.Name = "tsbExportPDF";
            this.tsbExportPDF.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbExportPDF.Size = new System.Drawing.Size(23, 22);
            this.tsbExportPDF.Text = "toolStripButton6"; //@@@: this.tsbExportPDF.Text = "toolStripButton6";
            this.tsbExportPDF.Click += new System.EventHandler(this.tsbExportPDF_Click); //@@@: this.tsbExportPDF.Click += new System.EventHandler(this.tsbExportPDF_Click);
            // 
            // pnEditor
            // 
            this.pnEditor.AutoScroll = true; //@@@: this.pnEditor.AutoScroll = true;
            this.pnEditor.Controls.Add(this.pnReport); //@@@: this.pnEditor.Controls.Add(this.pnReport);
            this.pnEditor.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.pnEditor.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnEditor.Location = new System.Drawing.Point(60, 0); //@@@: this.pnEditor.Location = new System.Drawing.Point(60, 0);
            this.pnEditor.Margin = new System.Windows.Forms.Padding(0); //@@@: this.pnEditor.Margin = new System.Windows.Forms.Padding(0);
            this.pnEditor.Name = "pnEditor"; //@@@: this.pnEditor.Name = "pnEditor";
            this.pnEditor.Size = new System.Drawing.Size(780, 432); //@@@: this.pnEditor.Size = new System.Drawing.Size(780, 432);
            this.pnEditor.TabIndex = 2; //@@@: this.pnEditor.TabIndex = 2;
            // 
            // pnReport
            // 
            this.pnReport.BackColor = System.Drawing.SystemColors.Window; //@@@: this.pnReport.BackColor = System.Drawing.SystemColors.Window;
            this.pnReport.Location = new System.Drawing.Point(3, 3); //@@@: this.pnReport.Location = new System.Drawing.Point(3, 3);
            this.pnReport.Name = "pnReport"; //@@@: this.pnReport.Name = "pnReport";
            this.pnReport.Size = new System.Drawing.Size(339, 306); //@@@: this.pnReport.Size = new System.Drawing.Size(339, 306);
            this.pnReport.TabIndex = 0; //@@@: this.pnReport.TabIndex = 0;
            this.pnReport.TabStop = false; //@@@: this.pnReport.TabStop = false;
            this.pnReport.Click += new System.EventHandler(this.pnReport_Click); //@@@: this.pnReport.Click += new System.EventHandler(this.pnReport_Click);
            // 
            // pnRule
            // 
            this.pnRule.BackColor = System.Drawing.SystemColors.ControlLight; //@@@: this.pnRule.BackColor = System.Drawing.SystemColors.ControlLight;
            this.pnRule.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.pnRule.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnRule.Location = new System.Drawing.Point(3, 3); //@@@: this.pnRule.Location = new System.Drawing.Point(3, 3);
            this.pnRule.Name = "pnRule"; //@@@: this.pnRule.Name = "pnRule";
            this.pnRule.Size = new System.Drawing.Size(54, 426); //@@@: this.pnRule.Size = new System.Drawing.Size(54, 426);
            this.pnRule.TabIndex = 1; //@@@: this.pnRule.TabIndex = 1;
            this.pnRule.TabStop = false; //@@@: this.pnRule.TabStop = false;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 2; //@@@: this.tableLayoutPanel1.ColumnCount = 2;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 60F)); //@@@: this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Absolute, 60F));
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F)); //@@@: this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.pnRule, 0, 0); //@@@: this.tableLayoutPanel1.Controls.Add(this.pnRule, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.pnEditor, 1, 0); //@@@: this.tableLayoutPanel1.Controls.Add(this.pnEditor, 1, 0);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 25); //@@@: this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 25);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1"; //@@@: this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 1; //@@@: this.tableLayoutPanel1.RowCount = 1;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F)); //@@@: this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(840, 432); //@@@: this.tableLayoutPanel1.Size = new System.Drawing.Size(840, 432);
            this.tableLayoutPanel1.TabIndex = 3; //@@@: this.tableLayoutPanel1.TabIndex = 3;
            // 
            // cReportPreview
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F); //@@@: this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font; //@@@: this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tableLayoutPanel1); //@@@: this.Controls.Add(this.tableLayoutPanel1);
            this.Controls.Add(this.toolStrip1); //@@@: this.Controls.Add(this.toolStrip1);
            this.Name = "cReportPreview"; //@@@: this.Name = "cReportPreview";
            this.Size = new System.Drawing.Size(840, 457); //@@@: this.Size = new System.Drawing.Size(840, 457);
            this.toolStrip1.ResumeLayout(false); //@@@: this.toolStrip1.ResumeLayout(false);
            this.toolStrip1.PerformLayout(); //@@@: this.toolStrip1.PerformLayout();
            this.pnEditor.ResumeLayout(false); //@@@: this.pnEditor.ResumeLayout(false);
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnReport)).EndInit();
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnRule)).EndInit();
            this.tableLayoutPanel1.ResumeLayout(false); //@@@: this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false); //@@@: this.ResumeLayout(false);
            this.PerformLayout(); //@@@: this.PerformLayout();

        }; //@@@: }

UNKNOWN >>         #endregion //@@@: #endregion

        let toolStrip1 = null; //@@@: private System.Windows.Forms.ToolStrip toolStrip1;
        let tsbFirstPage = null; //@@@: private System.Windows.Forms.ToolStripButton tsbFirstPage;
        let tsbPreviousPage = null; //@@@: private System.Windows.Forms.ToolStripButton tsbPreviousPage;
        let tsbPage = null; //@@@: private System.Windows.Forms.ToolStripTextBox tsbPage;
        let tsbPages = null; //@@@: private System.Windows.Forms.ToolStripLabel tsbPages;
        let tsbNextPage = null; //@@@: private System.Windows.Forms.ToolStripButton tsbNextPage;
        let tsbLastPage = null; //@@@: private System.Windows.Forms.ToolStripButton tsbLastPage;
        let toolStripSeparator1 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        let tsbPrint = null; //@@@: private System.Windows.Forms.ToolStripButton tsbPrint;
        let toolStripSeparator2 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator2;
        let tsbExportPDF = null; //@@@: private System.Windows.Forms.ToolStripButton tsbExportPDF;
        let pnEditor = null; //@@@: private System.Windows.Forms.Panel pnEditor;
        let pnRule = null; //@@@: private System.Windows.Forms.PictureBox pnRule;
        let pnReport = null; //@@@: private System.Windows.Forms.PictureBox pnReport;
        let tableLayoutPanel1 = null; //@@@: private System.Windows.Forms.TableLayoutPanel tableLayoutPanel1;
    } //@@@: }
} //@@@: }
