(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

UNKNOWN >>     partial class fGroup
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
            let resources: System.ComponentModel.ComponentResourceManager= new System.ComponentModel.ComponentResourceManager(typeof(fGroup));
            this.lb_group =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.panel1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Panel();
            this.groupBox1 =  globalObject.CSReportDll.createSystem.Windows.Forms.GroupBox();
            this.pictureBox2 =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.pictureBox1 =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.op_desc =  globalObject.CSReportDll.createSystem.Windows.Forms.RadioButton();
            this.op_asc =  globalObject.CSReportDll.createSystem.Windows.Forms.RadioButton();
            this.label2 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.label3 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.groupBox2 =  globalObject.CSReportDll.createSystem.Windows.Forms.GroupBox();
            this.op_number =  globalObject.CSReportDll.createSystem.Windows.Forms.RadioButton();
            this.op_date =  globalObject.CSReportDll.createSystem.Windows.Forms.RadioButton();
            this.op_text =  globalObject.CSReportDll.createSystem.Windows.Forms.RadioButton();
            this.groupBox3 =  globalObject.CSReportDll.createSystem.Windows.Forms.GroupBox();
            this.chk_reprintGroup =  globalObject.CSReportDll.createSystem.Windows.Forms.CheckBox();
            this.chk_printInNewPage =  globalObject.CSReportDll.createSystem.Windows.Forms.CheckBox();
            this.groupBox4 =  globalObject.CSReportDll.createSystem.Windows.Forms.GroupBox();
            this.chk_grandTotal =  globalObject.CSReportDll.createSystem.Windows.Forms.CheckBox();
            this.cmdCancel =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.cmdOk =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.tx_name =  globalObject.CSReportDll.createSystem.Windows.Forms.TextBox();
            this.tx_dbField =  globalObject.CSReportDll.createSystem.Windows.Forms.TextBox();
            this.cmd_dbField =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.panel1.SuspendLayout();
            this.groupBox1.SuspendLayout();
            ().BeginInit();
            ().BeginInit();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.SuspendLayout();
            // 
            // lb_group
            // 
            this.lb_group.AutoSize = true;
            this.lb_group.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_group.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(13, 10);
            this.lb_group.Name = "lb_group";
            this.lb_group.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(123, 37);
            this.lb_group.TabIndex = 0;
            this.lb_group.Text = "Groups";
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lb_group);
            this.panel1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(-1, -1);
            this.panel1.Name = "panel1";
            this.panel1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(341, 59);
            this.panel1.TabIndex = 1;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.pictureBox2);
            this.groupBox1.Controls.Add(this.pictureBox1);
            this.groupBox1.Controls.Add(this.op_desc);
            this.groupBox1.Controls.Add(this.op_asc);
            this.groupBox1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(19, 135);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(294, 79);
            this.groupBox1.TabIndex = 2;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Order";
            // 
            // pictureBox2
            // 
            this.pictureBox2.Image = ((resources.GetObject("pictureBox2.Image")));
            this.pictureBox2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(231, 26);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(38, 35);
            this.pictureBox2.TabIndex = 3;
            this.pictureBox2.TabStop = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = ((resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(94, 26);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(38, 35);
            this.pictureBox1.TabIndex = 2;
            this.pictureBox1.TabStop = false;
            // 
            // op_desc
            // 
            this.op_desc.AutoSize = true;
            this.op_desc.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(157, 35);
            this.op_desc.Name = "op_desc";
            this.op_desc.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(68, 17);
            this.op_desc.TabIndex = 1;
            this.op_desc.TabStop = true;
            this.op_desc.Text = "D&escend";
            this.op_desc.UseVisualStyleBackColor = true;
            // 
            // op_asc
            // 
            this.op_asc.AutoSize = true;
            this.op_asc.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(27, 35);
            this.op_asc.Name = "op_asc";
            this.op_asc.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(61, 17);
            this.op_asc.TabIndex = 0;
            this.op_asc.TabStop = true;
            this.op_asc.Text = "&Ascend";
            this.op_asc.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(16, 77);
            this.label2.Name = "label2";
            this.label2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(35, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "Name";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(16, 103);
            this.label3.Name = "label3";
            this.label3.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(29, 13);
            this.label3.TabIndex = 6;
            this.label3.Text = "Field";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.op_number);
            this.groupBox2.Controls.Add(this.op_date);
            this.groupBox2.Controls.Add(this.op_text);
            this.groupBox2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(19, 227);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(293, 66);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Comparision Type";
            // 
            // op_number
            // 
            this.op_number.AutoSize = true;
            this.op_number.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(198, 30);
            this.op_number.Name = "op_number";
            this.op_number.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(62, 17);
            this.op_number.TabIndex = 2;
            this.op_number.TabStop = true;
            this.op_number.Text = "N&umber";
            this.op_number.UseVisualStyleBackColor = true;
            // 
            // op_date
            // 
            this.op_date.AutoSize = true;
            this.op_date.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(114, 30);
            this.op_date.Name = "op_date";
            this.op_date.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(48, 17);
            this.op_date.TabIndex = 1;
            this.op_date.TabStop = true;
            this.op_date.Text = "&Date";
            this.op_date.UseVisualStyleBackColor = true;
            // 
            // op_text
            // 
            this.op_text.AutoSize = true;
            this.op_text.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(27, 30);
            this.op_text.Name = "op_text";
            this.op_text.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(46, 17);
            this.op_text.TabIndex = 0;
            this.op_text.TabStop = true;
            this.op_text.Text = "&Text";
            this.op_text.UseVisualStyleBackColor = true;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.chk_reprintGroup);
            this.groupBox3.Controls.Add(this.chk_printInNewPage);
            this.groupBox3.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(19, 306);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(293, 87);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Page Options";
            // 
            // chk_reprintGroup
            // 
            this.chk_reprintGroup.AutoSize = true;
            this.chk_reprintGroup.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(27, 53);
            this.chk_reprintGroup.Name = "chk_reprintGroup";
            this.chk_reprintGroup.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(185, 17);
            this.chk_reprintGroup.TabIndex = 1;
            this.chk_reprintGroup.Text = "Print group headers in every page";
            this.chk_reprintGroup.UseVisualStyleBackColor = true;
            // 
            // chk_printInNewPage
            // 
            this.chk_printInNewPage.AutoSize = true;
            this.chk_printInNewPage.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(27, 30);
            this.chk_printInNewPage.Name = "chk_printInNewPage";
            this.chk_printInNewPage.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(176, 17);
            this.chk_printInNewPage.TabIndex = 0;
            this.chk_printInNewPage.Text = "Print every group in a  globalObject.CSReportDll.createPage";
            this.chk_printInNewPage.UseVisualStyleBackColor = true;
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.chk_grandTotal);
            this.groupBox4.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(19, 406);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(293, 63);
            this.groupBox4.TabIndex = 10;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Formulas";
            // 
            // chk_grandTotal
            // 
            this.chk_grandTotal.AutoSize = true;
            this.chk_grandTotal.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(27, 28);
            this.chk_grandTotal.Name = "chk_grandTotal";
            this.chk_grandTotal.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(134, 17);
            this.chk_grandTotal.TabIndex = 2;
            this.chk_grandTotal.Text = "It is a grand total group";
            this.chk_grandTotal.UseVisualStyleBackColor = true;
            // 
            // cmdCancel
            // 
            this.cmdCancel.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(237, 477);
            this.cmdCancel.Name = "cmdCancel";
            this.cmdCancel.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(75, 23);
            this.cmdCancel.TabIndex = 11;
            this.cmdCancel.Text = "&Cancel";
            this.cmdCancel.UseVisualStyleBackColor = true;
            this.cmdCancel.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdCancel_Click);
            // 
            // cmdOk
            // 
            this.cmdOk.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(156, 477);
            this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(75, 23);
            this.cmdOk.TabIndex = 12;
            this.cmdOk.Text = "&Ok";
            this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdOk_Click);
            // 
            // tx_name
            // 
            this.tx_name.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(57, 74);
            this.tx_name.Name = "tx_name";
            this.tx_name.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(255, 20);
            this.tx_name.TabIndex = 13;
            // 
            // tx_dbField
            // 
            this.tx_dbField.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(57, 100);
            this.tx_dbField.Name = "tx_dbField";
            this.tx_dbField.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(222, 20);
            this.tx_dbField.TabIndex = 14;
            // 
            // cmd_dbField
            // 
            this.cmd_dbField.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(285, 100);
            this.cmd_dbField.Name = "cmd_dbField";
            this.cmd_dbField.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(27, 23);
            this.cmd_dbField.TabIndex = 50;
            this.cmd_dbField.Text = "...";
            this.cmd_dbField.UseVisualStyleBackColor = true;
            this.cmd_dbField.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmd_dbField_Click);
            // 
            // fGroup
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(332, 512);
            this.Controls.Add(this.cmd_dbField);
            this.Controls.Add(this.tx_dbField);
            this.Controls.Add(this.tx_name);
            this.Controls.Add(this.cmdOk);
            this.Controls.Add(this.cmdCancel);
            this.Controls.Add(this.groupBox4);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fGroup";
            this.Text = "Groups";
            this.Load +=  globalObject.CSReportDll.createSystem.EventHandler(this.fGroup_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ().EndInit();
            ().EndInit();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let lb_group: System.Windows.Forms.Label = null;
        let panel1: System.Windows.Forms.Panel = null;
        let groupBox1: System.Windows.Forms.GroupBox = null;
        let label2: System.Windows.Forms.Label = null;
        let label3: System.Windows.Forms.Label = null;
        let pictureBox2: System.Windows.Forms.PictureBox = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let op_desc: System.Windows.Forms.RadioButton = null;
        let op_asc: System.Windows.Forms.RadioButton = null;
        let groupBox2: System.Windows.Forms.GroupBox = null;
        let op_number: System.Windows.Forms.RadioButton = null;
        let op_date: System.Windows.Forms.RadioButton = null;
        let op_text: System.Windows.Forms.RadioButton = null;
        let groupBox3: System.Windows.Forms.GroupBox = null;
        let chk_reprintGroup: System.Windows.Forms.CheckBox = null;
        let chk_printInNewPage: System.Windows.Forms.CheckBox = null;
        let groupBox4: System.Windows.Forms.GroupBox = null;
        let chk_grandTotal: System.Windows.Forms.CheckBox = null;
        let cmdCancel: System.Windows.Forms.Button = null;
        let cmdOk: System.Windows.Forms.Button = null;
        let tx_name: System.Windows.Forms.TextBox = null;
        let tx_dbField: System.Windows.Forms.TextBox = null;
        let cmd_dbField: System.Windows.Forms.Button = null;
    }
}
