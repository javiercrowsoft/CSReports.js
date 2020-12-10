(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFFormula = function() {

        // @ts-ignore
        let self: CSReportEditor.IfFormula = {};
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

UNKNOWN >>         #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() {
            this.components = UNKNOWN >>  can't find constructor for class System.ComponentModel.Container();
            let resources: System.ComponentModel.ComponentResourceManager = new System.ComponentModel.ComponentResourceManager(typeof(fFormula));
            this.tableLayoutPanel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TableLayoutPanel();
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.label1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.pictureBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.splitContainer1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.SplitContainer();
            this.tv_formulas = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeView();
            this.imageList = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ImageList(this.components);
            this.tableLayoutPanel2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TableLayoutPanel();
            this.tx_formula = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.tx_descrip = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.panel2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.cmd_cancel = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_apply = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            ().BeginInit();
            ().BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            this.tableLayoutPanel2.SuspendLayout();
            this.panel2.SuspendLayout();
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
            this.tableLayoutPanel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 49F));
            this.tableLayoutPanel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(941, 539);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.label1);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(935, 67);
            this.panel1.TabIndex = 2;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(74, 19);
            this.label1.Name = "label1";
            this.label1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(152, 26);
            this.label1.TabIndex = 2;
            this.label1.Text = "Formula editor";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 19);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(35, 31);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 76);
            this.splitContainer1.Name = "splitContainer1";
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.tv_formulas);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.tableLayoutPanel2);
            this.splitContainer1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(935, 411);
            this.splitContainer1.SplitterDistance = 221;
            this.splitContainer1.TabIndex = 3;
            // 
            // tv_formulas
            // 
            this.tv_formulas.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tv_formulas.ImageIndex = 0;
            this.tv_formulas.ImageList = this.imageList;
            this.tv_formulas.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tv_formulas.Name = "tv_formulas";
            this.tv_formulas.SelectedImageIndex = 0;
            this.tv_formulas.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(221, 411);
            this.tv_formulas.TabIndex = 0;
            this.tv_formulas.NodeMouseClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeNodeMouseClickEventHandler(this.tv_formulas_NodeMouseClick);
            this.tv_formulas.NodeMouseDoubleClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeNodeMouseClickEventHandler(this.tv_formulas_NodeMouseDoubleClick);
            this.tv_formulas.KeyUp += UNKNOWN >>  can't find constructor for class System.Windows.Forms.KeyEventHandler(this.tv_formulas_KeyUp);
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
            this.tableLayoutPanel2.Controls.Add(this.tx_formula, 0, 1);
            this.tableLayoutPanel2.Controls.Add(this.tx_descrip, 0, 0);
            this.tableLayoutPanel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tableLayoutPanel2.Name = "tableLayoutPanel2";
            this.tableLayoutPanel2.RowCount = 2;
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 117F));
            this.tableLayoutPanel2.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(710, 411);
            this.tableLayoutPanel2.TabIndex = 0;
            // 
            // tx_formula
            // 
            this.tx_formula.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tx_formula.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 120);
            this.tx_formula.Multiline = true;
            this.tx_formula.Name = "tx_formula";
            this.tx_formula.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.tx_formula.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(704, 288);
            this.tx_formula.TabIndex = 1;
            // 
            // tx_descrip
            // 
            this.tx_descrip.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tx_descrip.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.tx_descrip.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.tx_descrip.Multiline = true;
            this.tx_descrip.Name = "tx_descrip";
            this.tx_descrip.ScrollBars = System.Windows.Forms.ScrollBars.Vertical;
            this.tx_descrip.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(704, 111);
            this.tx_descrip.TabIndex = 0;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.cmd_cancel);
            this.panel2.Controls.Add(this.cmd_apply);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 493);
            this.panel2.Name = "panel2";
            this.panel2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(935, 43);
            this.panel2.TabIndex = 4;
            // 
            // cmd_cancel
            // 
            this.cmd_cancel.Anchor = (());
            this.cmd_cancel.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(851, 11);
            this.cmd_cancel.Name = "cmd_cancel";
            this.cmd_cancel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_cancel.TabIndex = 1;
            this.cmd_cancel.Text = "Cancel";
            this.cmd_cancel.UseVisualStyleBackColor = true;
            this.cmd_cancel.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_cancel_Click);
            // 
            // cmd_apply
            // 
            this.cmd_apply.Anchor = (());
            this.cmd_apply.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(770, 11);
            this.cmd_apply.Name = "cmd_apply";
            this.cmd_apply.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_apply.TabIndex = 0;
            this.cmd_apply.Text = "Apply";
            this.cmd_apply.UseVisualStyleBackColor = true;
            this.cmd_apply.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_apply_Click);
            // 
            // fFormula
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(941, 539);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "fFormula";
            this.Text = "fFormula";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fFormula_Load);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false);
            ().EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.tableLayoutPanel2.ResumeLayout(false);
            this.tableLayoutPanel2.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let tableLayoutPanel1: System.Windows.Forms.TableLayoutPanel = null;
        let panel1: System.Windows.Forms.Panel = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let label1: System.Windows.Forms.Label = null;
        let splitContainer1: System.Windows.Forms.SplitContainer = null;
        let tv_formulas: System.Windows.Forms.TreeView = null;
        let tableLayoutPanel2: System.Windows.Forms.TableLayoutPanel = null;
        let tx_descrip: System.Windows.Forms.TextBox = null;
        let panel2: System.Windows.Forms.Panel = null;
        let cmd_cancel: System.Windows.Forms.Button = null;
        let cmd_apply: System.Windows.Forms.Button = null;
        let tx_formula: System.Windows.Forms.TextBox = null;
        let imageList: System.Windows.Forms.ImageList = null;

        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfFormula {

    Dispose: (bool) => void;
  }
}
