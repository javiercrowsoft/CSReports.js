(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFFormulaReplace = function() {

        // @ts-ignore
        let self: CSReportEditor.IfFormulaReplace = {};
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
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.label1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.pictureBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.splitContainer1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.SplitContainer();
            this.tableLayoutPanel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TableLayoutPanel();
            this.panel2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.button2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.button1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.tx_currFormula = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.tx_newFormula = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.panel1.SuspendLayout();
            ().BeginInit();
            ().BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel2.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Controls.Add(this.label1);
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(567, 67);
            this.panel1.TabIndex = 1;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(76, 18);
            this.label1.Name = "label1";
            this.label1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(205, 26);
            this.label1.TabIndex = 0;
            this.label1.Text = "Replace in formulas";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(24, 18);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(46, 39);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 76);
            this.splitContainer1.Name = "splitContainer1";
            this.splitContainer1.Orientation = System.Windows.Forms.Orientation.Horizontal;
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.tx_currFormula);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.tx_newFormula);
            this.splitContainer1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(567, 243);
            this.splitContainer1.SplitterDistance = 119;
            this.splitContainer1.TabIndex = 2;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.splitContainer1, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel2, 0, 2);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 49F));
            this.tableLayoutPanel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(573, 371);
            this.tableLayoutPanel1.TabIndex = 3;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.button2);
            this.panel2.Controls.Add(this.button1);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 325);
            this.panel2.Name = "panel2";
            this.panel2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(567, 43);
            this.panel2.TabIndex = 3;
            // 
            // button2
            // 
            this.button2.Anchor = (());
            this.button2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(483, 11);
            this.button2.Name = "button2";
            this.button2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.button2.TabIndex = 3;
            this.button2.Text = "Cancel";
            this.button2.UseVisualStyleBackColor = true;
            // 
            // button1
            // 
            this.button1.Anchor = (());
            this.button1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(402, 11);
            this.button1.Name = "button1";
            this.button1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.button1.TabIndex = 2;
            this.button1.Text = "Apply";
            this.button1.UseVisualStyleBackColor = true;
            // 
            // tx_currFormula
            // 
            this.tx_currFormula.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tx_currFormula.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tx_currFormula.Multiline = true;
            this.tx_currFormula.Name = "tx_currFormula";
            this.tx_currFormula.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(567, 119);
            this.tx_currFormula.TabIndex = 0;
            // 
            // tx_newFormula
            // 
            this.tx_newFormula.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tx_newFormula.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tx_newFormula.Multiline = true;
            this.tx_newFormula.Name = "tx_newFormula";
            this.tx_newFormula.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(567, 120);
            this.tx_newFormula.TabIndex = 1;
            // 
            // fFormulaReplace
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(573, 371);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Name = "fFormulaReplace";
            this.Text = "fFormulaReplace";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel1.PerformLayout();
            this.splitContainer1.Panel2.ResumeLayout(false);
            this.splitContainer1.Panel2.PerformLayout();
            ().EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel2.ResumeLayout(false);
            this.ResumeLayout(false);

        };

UNKNOWN >>         #endregion

        let panel1: System.Windows.Forms.Panel = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let label1: System.Windows.Forms.Label = null;
        let splitContainer1: System.Windows.Forms.SplitContainer = null;
        let tableLayoutPanel1: System.Windows.Forms.TableLayoutPanel = null;
        let panel2: System.Windows.Forms.Panel = null;
        let button2: System.Windows.Forms.Button = null;
        let button1: System.Windows.Forms.Button = null;
        let tx_currFormula: System.Windows.Forms.TextBox = null;
        let tx_newFormula: System.Windows.Forms.TextBox = null;
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfFormulaReplace {

    Dispose: (bool) => void;
  }
}
