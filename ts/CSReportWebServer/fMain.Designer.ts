(function(globalObject) {
    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

UNKNOWN >>     partial class fMain
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
            this.tableLayoutPanel1 =  globalObject.CSReportDll.createSystem.Windows.Forms.TableLayoutPanel();
            this.panel1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Panel();
            this.Label1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.pictureBox1 =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.panel2 =  globalObject.CSReportDll.createSystem.Windows.Forms.Panel();
            this.label2 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.cmdRegister =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.panel3 =  globalObject.CSReportDll.createSystem.Windows.Forms.Panel();
            this.lvLog =  globalObject.CSReportDll.createSystem.Windows.Forms.ListView();
            this.columnHeader1 = ((new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((new System.Windows.Forms.ColumnHeader()));
            this.printDlg =  globalObject.CSReportDll.createSystem.Windows.Forms.PrintDialog();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.panel2.SuspendLayout();
            this.panel3.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel2, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.panel3, 0, 2);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 120F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(500, 471);
            this.tableLayoutPanel1.TabIndex = 0;
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.Label1);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(494, 94);
            this.panel1.TabIndex = 0;
            // 
            // Label1
            // 
            this.Label1.AutoSize = true;
            this.Label1.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.Label1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(88, 27);
            this.Label1.Name = "Label1";
            this.Label1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(348, 37);
            this.Label1.TabIndex = 3;
            this.Label1.Text = "CSReports Web Server";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportWebServer.Properties.Resources.config_page;
            this.pictureBox1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(24, 25);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(46, 39);
            this.pictureBox1.TabIndex = 2;
            this.pictureBox1.TabStop = false;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.label2);
            this.panel2.Controls.Add(this.cmdRegister);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(3, 103);
            this.panel2.Name = "panel2";
            this.panel2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(494, 114);
            this.panel2.TabIndex = 1;
            // 
            // label2
            // 
            this.label2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(9, 18);
            this.label2.Name = "label2";
            this.label2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(475, 30);
            this.label2.TabIndex = 1;
            this.label2.Text = "This program allows web pages to print directly to printer using CSReports.\r\n";
            // 
            // cmdRegister
            // 
            this.cmdRegister.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(9, 70);
            this.cmdRegister.Name = "cmdRegister";
            this.cmdRegister.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(181, 31);
            this.cmdRegister.TabIndex = 0;
            this.cmdRegister.Text = "Register Service";
            this.cmdRegister.UseVisualStyleBackColor = true;
            this.cmdRegister.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdRegister_Click);
            // 
            // panel3
            // 
            this.panel3.Controls.Add(this.lvLog);
            this.panel3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel3.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(3, 223);
            this.panel3.Name = "panel3";
            this.panel3.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(494, 245);
            this.panel3.TabIndex = 2;
            // 
            // lvLog
            // 
            this.lvLog.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2});
            this.lvLog.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lvLog.GridLines = true;
            this.lvLog.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 0);
            this.lvLog.Name = "lvLog";
            this.lvLog.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(494, 245);
            this.lvLog.TabIndex = 0;
            this.lvLog.UseCompatibleStateImageBehavior = false;
            this.lvLog.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "Date";
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "Text";
            this.columnHeader2.Width = 6000;
            // 
            // printDlg
            // 
            this.printDlg.UseEXDialog = true;
            // 
            // fMain
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(500, 471);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "fMain";
            this.Text = "CSReports Web Server";
            this.Load +=  globalObject.CSReportDll.createSystem.EventHandler(this.fMain_Load);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.panel2.ResumeLayout(false);
            this.panel3.ResumeLayout(false);
            this.ResumeLayout(false);

        };

UNKNOWN >>         #endregion

        let tableLayoutPanel1: System.Windows.Forms.TableLayoutPanel = null;
        let panel1: System.Windows.Forms.Panel = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let Label1: System.Windows.Forms.Label = null;
        let panel2: System.Windows.Forms.Panel = null;
        let cmdRegister: System.Windows.Forms.Button = null;
        let panel3: System.Windows.Forms.Panel = null;
        let lvLog: System.Windows.Forms.ListView = null;
        let columnHeader1: System.Windows.Forms.ColumnHeader = null;
        let columnHeader2: System.Windows.Forms.ColumnHeader = null;
        let label2: System.Windows.Forms.Label = null;
        let printDlg: System.Windows.Forms.PrintDialog = null;
    }
}

