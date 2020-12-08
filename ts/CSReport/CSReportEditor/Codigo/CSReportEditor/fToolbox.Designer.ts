(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

UNKNOWN >>     partial class fToolbox
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        let components: System.ComponentModel.IContainer= null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        self. = function(disposing) {
            const  = function(null) {
                components.Dispose();
            }
            base.Dispose(disposing);
        };

UNKNOWN >>         #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() {
            this.components =  globalObject.CSReportDll.createSystem.ComponentModel.Container();
            let resources: System.ComponentModel.ComponentResourceManager= new System.ComponentModel.ComponentResourceManager(typeof(fToolbox));
            this.tableLayoutPanel1 =  globalObject.CSReportDll.createSystem.Windows.Forms.TableLayoutPanel();
            this.panel1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Panel();
            this.Label1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.pictureBox1 =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.tabControl1 =  globalObject.CSReportDll.createSystem.Windows.Forms.TabControl();
            this.tabPage1 =  globalObject.CSReportDll.createSystem.Windows.Forms.TabPage();
            this.tabPage2 =  globalObject.CSReportDll.createSystem.Windows.Forms.TabPage();
            this.lv_controls =  globalObject.CSReportDll.createSystem.Windows.Forms.ListView();
            this.columnHeader1 = ((new System.Windows.Forms.ColumnHeader()));
            this.tabPage3 =  globalObject.CSReportDll.createSystem.Windows.Forms.TabPage();
            this.lv_labels =  globalObject.CSReportDll.createSystem.Windows.Forms.ListView();
            this.columnHeader2 = ((new System.Windows.Forms.ColumnHeader()));
            this.lv_formulas =  globalObject.CSReportDll.createSystem.Windows.Forms.ListView();
            this.columnHeader3 = ((new System.Windows.Forms.ColumnHeader()));
            this.imageList =  globalObject.CSReportDll.createSystem.Windows.Forms.ImageList(this.components);
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.tabControl1.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabPage2.SuspendLayout();
            this.tabPage3.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.AutoSize = true;
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.tabControl1, 0, 1);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 2;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(364, 695);
            this.tableLayoutPanel1.TabIndex = 3;
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.Label1);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(358, 67);
            this.panel1.TabIndex = 2;
            // 
            // Label1
            // 
            this.Label1.AutoSize = true;
            this.Label1.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.Label1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(74, 19);
            this.Label1.Name = "Label1";
            this.Label1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(88, 26);
            this.Label1.TabIndex = 2;
            this.Label1.Text = "Toolbox";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(22, 19);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(35, 31);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // tabControl1
            // 
            this.tabControl1.Controls.Add(this.tabPage1);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Controls.Add(this.tabPage3);
            this.tabControl1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(3, 76);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(358, 616);
            this.tabControl1.TabIndex = 5;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.lv_controls);
            this.tabPage1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Padding =  globalObject.CSReportDll.createSystem.Windows.Forms.Padding(3);
            this.tabPage1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(350, 590);
            this.tabPage1.TabIndex = 0;
            this.tabPage1.Text = "Controls";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // tabPage2
            // 
            this.tabPage2.Controls.Add(this.lv_labels);
            this.tabPage2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(4, 22);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding =  globalObject.CSReportDll.createSystem.Windows.Forms.Padding(3);
            this.tabPage2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(350, 541);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "Labels";
            this.tabPage2.UseVisualStyleBackColor = true;
            // 
            // lv_controls
            // 
            this.lv_controls.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1});
            this.lv_controls.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_controls.FullRowSelect = true;
            this.lv_controls.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(3, 3);
            this.lv_controls.MultiSelect = false;
            this.lv_controls.Name = "lv_controls";
            this.lv_controls.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(344, 584);
            this.lv_controls.SmallImageList = this.imageList;
            this.lv_controls.TabIndex = 8;
            this.lv_controls.UseCompatibleStateImageBehavior = false;
            this.lv_controls.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "Control";
            this.columnHeader1.Width = 300;
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.lv_formulas);
            this.tabPage3.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(4, 22);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(350, 541);
            this.tabPage3.TabIndex = 2;
            this.tabPage3.Text = "Formulas";
            this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // lv_labels
            // 
            this.lv_labels.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader2});
            this.lv_labels.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_labels.FullRowSelect = true;
            this.lv_labels.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(3, 3);
            this.lv_labels.MultiSelect = false;
            this.lv_labels.Name = "lv_labels";
            this.lv_labels.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(344, 535);
            this.lv_labels.SmallImageList = this.imageList;
            this.lv_labels.TabIndex = 9;
            this.lv_labels.UseCompatibleStateImageBehavior = false;
            this.lv_labels.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "Labels";
            this.columnHeader2.Width = 300;
            // 
            // lv_formulas
            // 
            this.lv_formulas.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader3});
            this.lv_formulas.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_formulas.FullRowSelect = true;
            this.lv_formulas.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 0);
            this.lv_formulas.MultiSelect = false;
            this.lv_formulas.Name = "lv_formulas";
            this.lv_formulas.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(350, 541);
            this.lv_formulas.SmallImageList = this.imageList;
            this.lv_formulas.TabIndex = 9;
            this.lv_formulas.UseCompatibleStateImageBehavior = false;
            this.lv_formulas.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "Formulas";
            this.columnHeader3.Width = 300;
            // 
            // imageList
            // 
            this.imageList.ImageStream = ((resources.GetObject("imageList.ImageStream")));
            this.imageList.TransparentColor = System.Drawing.Color.Transparent;
            this.imageList.Images.SetKeyName(0, "property.ico");
            this.imageList.Images.SetKeyName(1, "textedit.gif");
            this.imageList.Images.SetKeyName(2, "xtratabcontrol.gif");
            this.imageList.Images.SetKeyName(3, "calcedit.gif");
            // 
            // fToolbox
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(364, 695);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "fToolbox";
            this.Text = "fToolbox";
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.tabControl1.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabPage2.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let tableLayoutPanel1: System.Windows.Forms.TableLayoutPanel = null;
        let panel1: System.Windows.Forms.Panel = null;
        let Label1: System.Windows.Forms.Label = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let tabControl1: System.Windows.Forms.TabControl = null;
        let tabPage1: System.Windows.Forms.TabPage = null;
        let lv_controls: System.Windows.Forms.ListView = null;
        let columnHeader1: System.Windows.Forms.ColumnHeader = null;
        let tabPage2: System.Windows.Forms.TabPage = null;
        let lv_labels: System.Windows.Forms.ListView = null;
        let columnHeader2: System.Windows.Forms.ColumnHeader = null;
        let tabPage3: System.Windows.Forms.TabPage = null;
        let lv_formulas: System.Windows.Forms.ListView = null;
        let columnHeader3: System.Windows.Forms.ColumnHeader = null;
        let imageList: System.Windows.Forms.ImageList = null;
    }
}
