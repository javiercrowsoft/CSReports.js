(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

UNKNOWN >>     partial class fTreeViewCtrls
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        let components = null;

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
            this.components = new System.ComponentModel.Container();
            let resources = new System.ComponentModel.ComponentResourceManager(typeof(fTreeViewCtrls));
            this.tableLayoutPanel1 = new System.Windows.Forms.TableLayoutPanel();
            this.panel1 = new System.Windows.Forms.Panel();
            this.lbTitle = new System.Windows.Forms.Label();
            this.splitContainer1 = new System.Windows.Forms.SplitContainer();
            this.tv_controls = new System.Windows.Forms.TreeView();
            this.imageList = new System.Windows.Forms.ImageList(this.components);
            this.tableLayoutPanel2 = new System.Windows.Forms.TableLayoutPanel();
            this.tx_descrip = new System.Windows.Forms.TextBox();
            this.panel2 = new System.Windows.Forms.Panel();
            this.cmd_close = new System.Windows.Forms.Button();
            this.cmd_edit = new System.Windows.Forms.Button();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            this.tableLayoutPanel2.SuspendLayout();
            this.panel2.SuspendLayout();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.AutoSize = true;
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.splitContainer1, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.panel2, 0, 2);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 49F));
            this.tableLayoutPanel1.Size = new System.Drawing.Size(705, 558);
            this.tableLayoutPanel1.TabIndex = 1;
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lbTitle);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(699, 67);
            this.panel1.TabIndex = 2;
            // 
            // lbTitle
            // 
            this.lbTitle.AutoSize = true;
            this.lbTitle.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lbTitle.Location = new System.Drawing.Point(74, 19);
            this.lbTitle.Name = "lbTitle";
            this.lbTitle.Size = new System.Drawing.Size(170, 26);
            this.lbTitle.TabIndex = 2;
            this.lbTitle.Text = "Report definition";
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = new System.Drawing.Point(3, 76);
            this.splitContainer1.Name = "splitContainer1";
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.tv_controls);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.tableLayoutPanel2);
            this.splitContainer1.Size = new System.Drawing.Size(699, 430);
            this.splitContainer1.SplitterDistance = 282;
            this.splitContainer1.TabIndex = 3;
            // 
            // tv_controls
            // 
            this.tv_controls.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tv_controls.ImageIndex = 0;
            this.tv_controls.ImageList = this.imageList;
            this.tv_controls.Location = new System.Drawing.Point(0, 0);
            this.tv_controls.Name = "tv_controls";
            this.tv_controls.SelectedImageIndex = 0;
            this.tv_controls.Size = new System.Drawing.Size(282, 430);
            this.tv_controls.TabIndex = 0;
            this.tv_controls.NodeMouseClick += new System.Windows.Forms.TreeNodeMouseClickEventHandler(this.tv_formulas_NodeMouseClick);
            this.tv_controls.NodeMouseDoubleClick += new System.Windows.Forms.TreeNodeMouseClickEventHandler(this.tv_formulas_NodeMouseDoubleClick);
            this.tv_controls.KeyUp += new System.Windows.Forms.KeyEventHandler(this.tv_controls_KeyUp);
            // 
            // imageList
            // 
            this.imageList.ImageStream = ((resources.GetObject("imageList.ImageStream")));
            this.imageList.TransparentColor = System.Drawing.Color.Transparent;
            this.imageList.Images.SetKeyName(0, "xtratabcontrol.gif");
            this.imageList.Images.SetKeyName(1, "base002.ico");
            this.imageList.Images.SetKeyName(2, "property.ico");
            this.imageList.Images.SetKeyName(3, "aspxroundpanel.gif");
            // 
            // tableLayoutPanel2
            // 
            this.tableLayoutPanel2.ColumnCount = 1;
            this.tableLayoutPanel2.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.Controls.Add(this.tx_descrip, 0, 0);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 1;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 430F));
            this.tableLayoutPanel2.Size = new System.Drawing.Size(413, 430);
            this.tableLayoutPanel2.TabIndex = 0;
            // 
            // tx_descrip
            // 
            this.tx_descrip.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tx_descrip.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.tx_descrip.Location = new System.Drawing.Point(3, 3);
            this.tx_descrip.Multiline = true;
            this.tx_descrip.Name = "tx_descrip";
            this.tx_descrip.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.tx_descrip.Size = new System.Drawing.Size(407, 424);
            this.tx_descrip.TabIndex = 2;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.cmd_close);
            this.panel2.Controls.Add(this.cmd_edit);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = new System.Drawing.Point(3, 512);
            this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(699, 43);
            this.panel2.TabIndex = 4;
            // 
            // cmd_close
            // 
            this.cmd_close.Anchor = (());
            this.cmd_close.Location = new System.Drawing.Point(615, 11);
            this.cmd_close.Name = "cmd_close";
            this.cmd_close.Size = new System.Drawing.Size(75, 23);
            this.cmd_close.TabIndex = 1;
            this.cmd_close.Text = "Close";
            this.cmd_close.UseVisualStyleBackColor = true;
            this.cmd_close.Click += new System.EventHandler(this.cmd_close_Click);
            // 
            // cmd_edit
            // 
            this.cmd_edit.Anchor = (());
            this.cmd_edit.Location = new System.Drawing.Point(534, 11);
            this.cmd_edit.Name = "cmd_edit";
            this.cmd_edit.Size = new System.Drawing.Size(75, 23);
            this.cmd_edit.TabIndex = 0;
            this.cmd_edit.Text = "Edit";
            this.cmd_edit.UseVisualStyleBackColor = true;
            this.cmd_edit.Click += new System.EventHandler(this.cmd_edit_Click);
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location = new System.Drawing.Point(22, 19);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(35, 31);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // fTreeViewCtrls
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(705, 558);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "fTreeViewCtrls";
            this.Text = "fTreeViewCtrls";
            this.Load += new System.EventHandler(this.fTreeViewCtrls_Load);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false);
            ().EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tableLayoutPanel2.PerformLayout();
            this.panel2.ResumeLayout(false);
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let tableLayoutPanel1 = null;
        let panel1 = null;
        let lbTitle = null;
        let pictureBox1 = null;
        let splitContainer1 = null;
        let tv_controls = null;
        let tableLayoutPanel2 = null;
        let panel2 = null;
        let cmd_close = null;
        let cmd_edit = null;
        let tx_descrip = null;
        let imageList = null;
    }
}
