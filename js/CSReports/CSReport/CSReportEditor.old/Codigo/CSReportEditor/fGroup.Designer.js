(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
UNKNOWN >>     partial class fGroup //@@@: partial class fGroup
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

UNKNOWN >>         #region Windows Form Designer generated code //@@@: #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() { //@@@: private void InitializeComponent()
            let resources = new System.ComponentModel.ComponentResourceManager(typeof(fGroup)); //@@@: System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(fGroup));
            this.label1 = new System.Windows.Forms.Label(); //@@@: this.label1 = new System.Windows.Forms.Label();
            this.panel1 = new System.Windows.Forms.Panel(); //@@@: this.panel1 = new System.Windows.Forms.Panel();
            this.groupBox1 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox(); //@@@: this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.pictureBox1 = new System.Windows.Forms.PictureBox(); //@@@: this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.opDesc = new System.Windows.Forms.RadioButton(); //@@@: this.opDesc = new System.Windows.Forms.RadioButton();
            this.opAsc = new System.Windows.Forms.RadioButton(); //@@@: this.opAsc = new System.Windows.Forms.RadioButton();
            this.label2 = new System.Windows.Forms.Label(); //@@@: this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label(); //@@@: this.label3 = new System.Windows.Forms.Label();
            this.txDbField = new CSMaskEdit.cMaskEdit(); //@@@: this.txDbField = new CSMaskEdit.cMaskEdit();
            this.groupBox2 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.opNumber = new System.Windows.Forms.RadioButton(); //@@@: this.opNumber = new System.Windows.Forms.RadioButton();
            this.opDate = new System.Windows.Forms.RadioButton(); //@@@: this.opDate = new System.Windows.Forms.RadioButton();
            this.opText = new System.Windows.Forms.RadioButton(); //@@@: this.opText = new System.Windows.Forms.RadioButton();
            this.groupBox3 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.chkReprintGroup = new System.Windows.Forms.CheckBox(); //@@@: this.chkReprintGroup = new System.Windows.Forms.CheckBox();
            this.chkPrintInNewPage = new System.Windows.Forms.CheckBox(); //@@@: this.chkPrintInNewPage = new System.Windows.Forms.CheckBox();
            this.groupBox4 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.chkGrandTotal = new System.Windows.Forms.CheckBox(); //@@@: this.chkGrandTotal = new System.Windows.Forms.CheckBox();
            this.cmdCancel = new System.Windows.Forms.Button(); //@@@: this.cmdCancel = new System.Windows.Forms.Button();
            this.cmdOk = new System.Windows.Forms.Button(); //@@@: this.cmdOk = new System.Windows.Forms.Button();
            this.txName = new CSMaskEdit.cMaskEdit(); //@@@: this.txName = new CSMaskEdit.cMaskEdit();
            this.panel1.SuspendLayout(); //@@@: this.panel1.SuspendLayout();
            this.groupBox1.SuspendLayout(); //@@@: this.groupBox1.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.groupBox2.SuspendLayout(); //@@@: this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout(); //@@@: this.groupBox3.SuspendLayout();
            this.groupBox4.SuspendLayout(); //@@@: this.groupBox4.SuspendLayout();
            this.SuspendLayout(); //@@@: this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true; //@@@: this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ()); //@@@: this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.Location = new System.Drawing.Point(13, 10); //@@@: this.label1.Location = new System.Drawing.Point(13, 10);
            this.label1.Name = "label1"; //@@@: this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(123, 37); //@@@: this.label1.Size = new System.Drawing.Size(123, 37);
            this.label1.TabIndex = 0; //@@@: this.label1.TabIndex = 0;
            this.label1.Text = "Groups"; //@@@: this.label1.Text = "Groups";
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White; //@@@: this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.label1); //@@@: this.panel1.Controls.Add(this.label1);
            this.panel1.Location = new System.Drawing.Point(-1, -1); //@@@: this.panel1.Location = new System.Drawing.Point(-1, -1);
            this.panel1.Name = "panel1"; //@@@: this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(341, 59); //@@@: this.panel1.Size = new System.Drawing.Size(341, 59);
            this.panel1.TabIndex = 1; //@@@: this.panel1.TabIndex = 1;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.pictureBox2); //@@@: this.groupBox1.Controls.Add(this.pictureBox2);
            this.groupBox1.Controls.Add(this.pictureBox1); //@@@: this.groupBox1.Controls.Add(this.pictureBox1);
            this.groupBox1.Controls.Add(this.opDesc); //@@@: this.groupBox1.Controls.Add(this.opDesc);
            this.groupBox1.Controls.Add(this.opAsc); //@@@: this.groupBox1.Controls.Add(this.opAsc);
            this.groupBox1.Location = new System.Drawing.Point(19, 135); //@@@: this.groupBox1.Location = new System.Drawing.Point(19, 135);
            this.groupBox1.Name = "groupBox1"; //@@@: this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(294, 79); //@@@: this.groupBox1.Size = new System.Drawing.Size(294, 79);
            this.groupBox1.TabIndex = 2; //@@@: this.groupBox1.TabIndex = 2;
            this.groupBox1.TabStop = false; //@@@: this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Order"; //@@@: this.groupBox1.Text = "Order";
            // 
            // pictureBox2
            // 
            this.pictureBox2.Image = ((resources.GetObject("pictureBox2.Image"))); //@@@: this.pictureBox2.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox2.Image")));
            this.pictureBox2.Location = new System.Drawing.Point(231, 26); //@@@: this.pictureBox2.Location = new System.Drawing.Point(231, 26);
            this.pictureBox2.Name = "pictureBox2"; //@@@: this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(38, 35); //@@@: this.pictureBox2.Size = new System.Drawing.Size(38, 35);
            this.pictureBox2.TabIndex = 3; //@@@: this.pictureBox2.TabIndex = 3;
            this.pictureBox2.TabStop = false; //@@@: this.pictureBox2.TabStop = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = ((resources.GetObject("pictureBox1.Image"))); //@@@: this.pictureBox1.Image = ((System.Drawing.Image)(resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = new System.Drawing.Point(94, 26); //@@@: this.pictureBox1.Location = new System.Drawing.Point(94, 26);
            this.pictureBox1.Name = "pictureBox1"; //@@@: this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(38, 35); //@@@: this.pictureBox1.Size = new System.Drawing.Size(38, 35);
            this.pictureBox1.TabIndex = 2; //@@@: this.pictureBox1.TabIndex = 2;
            this.pictureBox1.TabStop = false; //@@@: this.pictureBox1.TabStop = false;
            // 
            // opDesc
            // 
            this.opDesc.AutoSize = true; //@@@: this.opDesc.AutoSize = true;
            this.opDesc.Location = new System.Drawing.Point(157, 35); //@@@: this.opDesc.Location = new System.Drawing.Point(157, 35);
            this.opDesc.Name = "opDesc"; //@@@: this.opDesc.Name = "opDesc";
            this.opDesc.Size = new System.Drawing.Size(68, 17); //@@@: this.opDesc.Size = new System.Drawing.Size(68, 17);
            this.opDesc.TabIndex = 1; //@@@: this.opDesc.TabIndex = 1;
            this.opDesc.TabStop = true; //@@@: this.opDesc.TabStop = true;
            this.opDesc.Text = "D&escend"; //@@@: this.opDesc.Text = "D&escend";
            this.opDesc.UseVisualStyleBackColor = true; //@@@: this.opDesc.UseVisualStyleBackColor = true;
            // 
            // opAsc
            // 
            this.opAsc.AutoSize = true; //@@@: this.opAsc.AutoSize = true;
            this.opAsc.Location = new System.Drawing.Point(27, 35); //@@@: this.opAsc.Location = new System.Drawing.Point(27, 35);
            this.opAsc.Name = "opAsc"; //@@@: this.opAsc.Name = "opAsc";
            this.opAsc.Size = new System.Drawing.Size(61, 17); //@@@: this.opAsc.Size = new System.Drawing.Size(61, 17);
            this.opAsc.TabIndex = 0; //@@@: this.opAsc.TabIndex = 0;
            this.opAsc.TabStop = true; //@@@: this.opAsc.TabStop = true;
            this.opAsc.Text = "&Ascend"; //@@@: this.opAsc.Text = "&Ascend";
            this.opAsc.UseVisualStyleBackColor = true; //@@@: this.opAsc.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true; //@@@: this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(16, 77); //@@@: this.label2.Location = new System.Drawing.Point(16, 77);
            this.label2.Name = "label2"; //@@@: this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(35, 13); //@@@: this.label2.Size = new System.Drawing.Size(35, 13);
            this.label2.TabIndex = 4; //@@@: this.label2.TabIndex = 4;
            this.label2.Text = "Name"; //@@@: this.label2.Text = "Name";
            // 
            // label3
            // 
            this.label3.AutoSize = true; //@@@: this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(16, 103); //@@@: this.label3.Location = new System.Drawing.Point(16, 103);
            this.label3.Name = "label3"; //@@@: this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(29, 13); //@@@: this.label3.Size = new System.Drawing.Size(29, 13);
            this.label3.TabIndex = 6; //@@@: this.label3.TabIndex = 6;
            this.label3.Text = "Field"; //@@@: this.label3.Text = "Field";
            // 
            // txDbField
            // 
            this.txDbField.Location = new System.Drawing.Point(57, 100); //@@@: this.txDbField.Location = new System.Drawing.Point(57, 100);
            this.txDbField.Name = "txDbField"; //@@@: this.txDbField.Name = "txDbField";
            this.txDbField.Size = new System.Drawing.Size(256, 20); //@@@: this.txDbField.Size = new System.Drawing.Size(256, 20);
            this.txDbField.TabIndex = 7; //@@@: this.txDbField.TabIndex = 7;
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.opNumber); //@@@: this.groupBox2.Controls.Add(this.opNumber);
            this.groupBox2.Controls.Add(this.opDate); //@@@: this.groupBox2.Controls.Add(this.opDate);
            this.groupBox2.Controls.Add(this.opText); //@@@: this.groupBox2.Controls.Add(this.opText);
            this.groupBox2.Location = new System.Drawing.Point(19, 227); //@@@: this.groupBox2.Location = new System.Drawing.Point(19, 227);
            this.groupBox2.Name = "groupBox2"; //@@@: this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(293, 66); //@@@: this.groupBox2.Size = new System.Drawing.Size(293, 66);
            this.groupBox2.TabIndex = 8; //@@@: this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false; //@@@: this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Comparision Type"; //@@@: this.groupBox2.Text = "Comparision Type";
            // 
            // opNumber
            // 
            this.opNumber.AutoSize = true; //@@@: this.opNumber.AutoSize = true;
            this.opNumber.Location = new System.Drawing.Point(198, 30); //@@@: this.opNumber.Location = new System.Drawing.Point(198, 30);
            this.opNumber.Name = "opNumber"; //@@@: this.opNumber.Name = "opNumber";
            this.opNumber.Size = new System.Drawing.Size(62, 17); //@@@: this.opNumber.Size = new System.Drawing.Size(62, 17);
            this.opNumber.TabIndex = 2; //@@@: this.opNumber.TabIndex = 2;
            this.opNumber.TabStop = true; //@@@: this.opNumber.TabStop = true;
            this.opNumber.Text = "N&umber"; //@@@: this.opNumber.Text = "N&umber";
            this.opNumber.UseVisualStyleBackColor = true; //@@@: this.opNumber.UseVisualStyleBackColor = true;
            // 
            // opDate
            // 
            this.opDate.AutoSize = true; //@@@: this.opDate.AutoSize = true;
            this.opDate.Location = new System.Drawing.Point(114, 30); //@@@: this.opDate.Location = new System.Drawing.Point(114, 30);
            this.opDate.Name = "opDate"; //@@@: this.opDate.Name = "opDate";
            this.opDate.Size = new System.Drawing.Size(48, 17); //@@@: this.opDate.Size = new System.Drawing.Size(48, 17);
            this.opDate.TabIndex = 1; //@@@: this.opDate.TabIndex = 1;
            this.opDate.TabStop = true; //@@@: this.opDate.TabStop = true;
            this.opDate.Text = "&Date"; //@@@: this.opDate.Text = "&Date";
            this.opDate.UseVisualStyleBackColor = true; //@@@: this.opDate.UseVisualStyleBackColor = true;
            // 
            // opText
            // 
            this.opText.AutoSize = true; //@@@: this.opText.AutoSize = true;
            this.opText.Location = new System.Drawing.Point(27, 30); //@@@: this.opText.Location = new System.Drawing.Point(27, 30);
            this.opText.Name = "opText"; //@@@: this.opText.Name = "opText";
            this.opText.Size = new System.Drawing.Size(46, 17); //@@@: this.opText.Size = new System.Drawing.Size(46, 17);
            this.opText.TabIndex = 0; //@@@: this.opText.TabIndex = 0;
            this.opText.TabStop = true; //@@@: this.opText.TabStop = true;
            this.opText.Text = "&Text"; //@@@: this.opText.Text = "&Text";
            this.opText.UseVisualStyleBackColor = true; //@@@: this.opText.UseVisualStyleBackColor = true;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.chkReprintGroup); //@@@: this.groupBox3.Controls.Add(this.chkReprintGroup);
            this.groupBox3.Controls.Add(this.chkPrintInNewPage); //@@@: this.groupBox3.Controls.Add(this.chkPrintInNewPage);
            this.groupBox3.Location = new System.Drawing.Point(19, 306); //@@@: this.groupBox3.Location = new System.Drawing.Point(19, 306);
            this.groupBox3.Name = "groupBox3"; //@@@: this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(293, 87); //@@@: this.groupBox3.Size = new System.Drawing.Size(293, 87);
            this.groupBox3.TabIndex = 9; //@@@: this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false; //@@@: this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Page Options"; //@@@: this.groupBox3.Text = "Page Options";
            // 
            // chkReprintGroup
            // 
            this.chkReprintGroup.AutoSize = true; //@@@: this.chkReprintGroup.AutoSize = true;
            this.chkReprintGroup.Location = new System.Drawing.Point(27, 53); //@@@: this.chkReprintGroup.Location = new System.Drawing.Point(27, 53);
            this.chkReprintGroup.Name = "chkReprintGroup"; //@@@: this.chkReprintGroup.Name = "chkReprintGroup";
            this.chkReprintGroup.Size = new System.Drawing.Size(185, 17); //@@@: this.chkReprintGroup.Size = new System.Drawing.Size(185, 17);
            this.chkReprintGroup.TabIndex = 1; //@@@: this.chkReprintGroup.TabIndex = 1;
            this.chkReprintGroup.Text = "Print group headers in every page"; //@@@: this.chkReprintGroup.Text = "Print group headers in every page";
            this.chkReprintGroup.UseVisualStyleBackColor = true; //@@@: this.chkReprintGroup.UseVisualStyleBackColor = true;
            // 
            // chkPrintInNewPage
            // 
            this.chkPrintInNewPage.AutoSize = true; //@@@: this.chkPrintInNewPage.AutoSize = true;
            this.chkPrintInNewPage.Location = new System.Drawing.Point(27, 30); //@@@: this.chkPrintInNewPage.Location = new System.Drawing.Point(27, 30);
            this.chkPrintInNewPage.Name = "chkPrintInNewPage"; //@@@: this.chkPrintInNewPage.Name = "chkPrintInNewPage";
            this.chkPrintInNewPage.Size = new System.Drawing.Size(176, 17); //@@@: this.chkPrintInNewPage.Size = new System.Drawing.Size(176, 17);
            this.chkPrintInNewPage.TabIndex = 0; //@@@: this.chkPrintInNewPage.TabIndex = 0;
            this.chkPrintInNewPage.Text = "Print every group in a new page"; //@@@: this.chkPrintInNewPage.Text = "Print every group in a new page";
            this.chkPrintInNewPage.UseVisualStyleBackColor = true; //@@@: this.chkPrintInNewPage.UseVisualStyleBackColor = true;
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.chkGrandTotal); //@@@: this.groupBox4.Controls.Add(this.chkGrandTotal);
            this.groupBox4.Location = new System.Drawing.Point(19, 406); //@@@: this.groupBox4.Location = new System.Drawing.Point(19, 406);
            this.groupBox4.Name = "groupBox4"; //@@@: this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(293, 63); //@@@: this.groupBox4.Size = new System.Drawing.Size(293, 63);
            this.groupBox4.TabIndex = 10; //@@@: this.groupBox4.TabIndex = 10;
            this.groupBox4.TabStop = false; //@@@: this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Formulas"; //@@@: this.groupBox4.Text = "Formulas";
            // 
            // chkGrandTotal
            // 
            this.chkGrandTotal.AutoSize = true; //@@@: this.chkGrandTotal.AutoSize = true;
            this.chkGrandTotal.Location = new System.Drawing.Point(27, 28); //@@@: this.chkGrandTotal.Location = new System.Drawing.Point(27, 28);
            this.chkGrandTotal.Name = "chkGrandTotal"; //@@@: this.chkGrandTotal.Name = "chkGrandTotal";
            this.chkGrandTotal.Size = new System.Drawing.Size(134, 17); //@@@: this.chkGrandTotal.Size = new System.Drawing.Size(134, 17);
            this.chkGrandTotal.TabIndex = 2; //@@@: this.chkGrandTotal.TabIndex = 2;
            this.chkGrandTotal.Text = "It is a grand total group"; //@@@: this.chkGrandTotal.Text = "It is a grand total group";
            this.chkGrandTotal.UseVisualStyleBackColor = true; //@@@: this.chkGrandTotal.UseVisualStyleBackColor = true;
            // 
            // cmdCancel
            // 
            this.cmdCancel.Location = new System.Drawing.Point(237, 477); //@@@: this.cmdCancel.Location = new System.Drawing.Point(237, 477);
            this.cmdCancel.Name = "cmdCancel"; //@@@: this.cmdCancel.Name = "cmdCancel";
            this.cmdCancel.Size = new System.Drawing.Size(75, 23); //@@@: this.cmdCancel.Size = new System.Drawing.Size(75, 23);
            this.cmdCancel.TabIndex = 11; //@@@: this.cmdCancel.TabIndex = 11;
            this.cmdCancel.Text = "&Cancel"; //@@@: this.cmdCancel.Text = "&Cancel";
            this.cmdCancel.UseVisualStyleBackColor = true; //@@@: this.cmdCancel.UseVisualStyleBackColor = true;
            this.cmdCancel.Click += new System.EventHandler(this.cmdCancel_Click); //@@@: this.cmdCancel.Click += new System.EventHandler(this.cmdCancel_Click);
            // 
            // cmdOk
            // 
            this.cmdOk.Location = new System.Drawing.Point(156, 477); //@@@: this.cmdOk.Location = new System.Drawing.Point(156, 477);
            this.cmdOk.Name = "cmdOk"; //@@@: this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size = new System.Drawing.Size(75, 23); //@@@: this.cmdOk.Size = new System.Drawing.Size(75, 23);
            this.cmdOk.TabIndex = 12; //@@@: this.cmdOk.TabIndex = 12;
            this.cmdOk.Text = "&Ok"; //@@@: this.cmdOk.Text = "&Ok";
            this.cmdOk.UseVisualStyleBackColor = true; //@@@: this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click += new System.EventHandler(this.cmdOk_Click); //@@@: this.cmdOk.Click += new System.EventHandler(this.cmdOk_Click);
            // 
            // txName
            // 
            this.txName.Location = new System.Drawing.Point(57, 74); //@@@: this.txName.Location = new System.Drawing.Point(57, 74);
            this.txName.Name = "txName"; //@@@: this.txName.Name = "txName";
            this.txName.Size = new System.Drawing.Size(256, 20); //@@@: this.txName.Size = new System.Drawing.Size(256, 20);
            this.txName.TabIndex = 13; //@@@: this.txName.TabIndex = 13;
            // 
            // fGroup
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F); //@@@: this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font; //@@@: this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(332, 512); //@@@: this.ClientSize = new System.Drawing.Size(332, 512);
            this.Controls.Add(this.txName); //@@@: this.Controls.Add(this.txName);
            this.Controls.Add(this.cmdOk); //@@@: this.Controls.Add(this.cmdOk);
            this.Controls.Add(this.cmdCancel); //@@@: this.Controls.Add(this.cmdCancel);
            this.Controls.Add(this.groupBox4); //@@@: this.Controls.Add(this.groupBox4);
            this.Controls.Add(this.groupBox3); //@@@: this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2); //@@@: this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.txDbField); //@@@: this.Controls.Add(this.txDbField);
            this.Controls.Add(this.label3); //@@@: this.Controls.Add(this.label3);
            this.Controls.Add(this.label2); //@@@: this.Controls.Add(this.label2);
            this.Controls.Add(this.groupBox1); //@@@: this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.panel1); //@@@: this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog; //@@@: this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Name = "fGroup"; //@@@: this.Name = "fGroup";
            this.Text = "Groups"; //@@@: this.Text = "Groups";
            this.panel1.ResumeLayout(false); //@@@: this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout(); //@@@: this.panel1.PerformLayout();
            this.groupBox1.ResumeLayout(false); //@@@: this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout(); //@@@: this.groupBox1.PerformLayout();
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.groupBox2.ResumeLayout(false); //@@@: this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout(); //@@@: this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false); //@@@: this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout(); //@@@: this.groupBox3.PerformLayout();
            this.groupBox4.ResumeLayout(false); //@@@: this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout(); //@@@: this.groupBox4.PerformLayout();
            this.ResumeLayout(false); //@@@: this.ResumeLayout(false);
            this.PerformLayout(); //@@@: this.PerformLayout();

        }; //@@@: }

UNKNOWN >>         #endregion //@@@: #endregion

        let label1 = null; //@@@: private System.Windows.Forms.Label label1;
        let panel1 = null; //@@@: private System.Windows.Forms.Panel panel1;
        let groupBox1 = null; //@@@: private System.Windows.Forms.GroupBox groupBox1;
        let label2 = null; //@@@: private System.Windows.Forms.Label label2;
        let label3 = null; //@@@: private System.Windows.Forms.Label label3;
        let pictureBox2 = null; //@@@: private System.Windows.Forms.PictureBox pictureBox2;
        let pictureBox1 = null; //@@@: private System.Windows.Forms.PictureBox pictureBox1;
        let opDesc = null; //@@@: private System.Windows.Forms.RadioButton opDesc;
        let opAsc = null; //@@@: private System.Windows.Forms.RadioButton opAsc;
        let txDbField = null; //@@@: private CSMaskEdit.cMaskEdit txDbField;
        let groupBox2 = null; //@@@: private System.Windows.Forms.GroupBox groupBox2;
        let opNumber = null; //@@@: private System.Windows.Forms.RadioButton opNumber;
        let opDate = null; //@@@: private System.Windows.Forms.RadioButton opDate;
        let opText = null; //@@@: private System.Windows.Forms.RadioButton opText;
        let groupBox3 = null; //@@@: private System.Windows.Forms.GroupBox groupBox3;
        let chkReprintGroup = null; //@@@: private System.Windows.Forms.CheckBox chkReprintGroup;
        let chkPrintInNewPage = null; //@@@: private System.Windows.Forms.CheckBox chkPrintInNewPage;
        let groupBox4 = null; //@@@: private System.Windows.Forms.GroupBox groupBox4;
        let chkGrandTotal = null; //@@@: private System.Windows.Forms.CheckBox chkGrandTotal;
        let cmdCancel = null; //@@@: private System.Windows.Forms.Button cmdCancel;
        let cmdOk = null; //@@@: private System.Windows.Forms.Button cmdOk;
        let txName = null; //@@@: private CSMaskEdit.cMaskEdit txName;
    } //@@@: }
} //@@@: }
