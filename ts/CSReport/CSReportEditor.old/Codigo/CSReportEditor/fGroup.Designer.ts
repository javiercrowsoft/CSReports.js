(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFGroup = function() {

        // @ts-ignore
        let self: CSReportEditor.IfGroup = {};
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
            let resources: System.ComponentModel.ComponentResourceManager = new System.ComponentModel.ComponentResourceManager(typeof(fGroup));
            this.label1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.groupBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.pictureBox2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.pictureBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.opDesc = UNKNOWN >>  can't find constructor for class System.Windows.Forms.RadioButton();
            this.opAsc = UNKNOWN >>  can't find constructor for class System.Windows.Forms.RadioButton();
            this.label2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.txDbField = UNKNOWN >>  can't find constructor for class CSMaskEdit.cMaskEdit();
            this.groupBox2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.opNumber = UNKNOWN >>  can't find constructor for class System.Windows.Forms.RadioButton();
            this.opDate = UNKNOWN >>  can't find constructor for class System.Windows.Forms.RadioButton();
            this.opText = UNKNOWN >>  can't find constructor for class System.Windows.Forms.RadioButton();
            this.groupBox3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.chkReprintGroup = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.chkPrintInNewPage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.groupBox4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.chkGrandTotal = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.cmdCancel = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmdOk = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.txName = UNKNOWN >>  can't find constructor for class CSMaskEdit.cMaskEdit();
            this.panel1.SuspendLayout();
            this.groupBox1.SuspendLayout();
            ().BeginInit();
            ().BeginInit();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.SuspendLayout();
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(13, 10);
            this.label1.Name = "label1";
            this.label1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(123, 37);
            this.label1.TabIndex = 0;
            this.label1.Text = "Groups";
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.label1);
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(-1, -1);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(341, 59);
            this.panel1.TabIndex = 1;
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.pictureBox2);
            this.groupBox1.Controls.Add(this.pictureBox1);
            this.groupBox1.Controls.Add(this.opDesc);
            this.groupBox1.Controls.Add(this.opAsc);
            this.groupBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 135);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(294, 79);
            this.groupBox1.TabIndex = 2;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Order";
            // 
            // pictureBox2
            // 
            this.pictureBox2.Image = ((resources.GetObject("pictureBox2.Image")));
            this.pictureBox2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(231, 26);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(38, 35);
            this.pictureBox2.TabIndex = 3;
            this.pictureBox2.TabStop = false;
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = ((resources.GetObject("pictureBox1.Image")));
            this.pictureBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(94, 26);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(38, 35);
            this.pictureBox1.TabIndex = 2;
            this.pictureBox1.TabStop = false;
            // 
            // opDesc
            // 
            this.opDesc.AutoSize = true;
            this.opDesc.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(157, 35);
            this.opDesc.Name = "opDesc";
            this.opDesc.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(68, 17);
            this.opDesc.TabIndex = 1;
            this.opDesc.TabStop = true;
            this.opDesc.Text = "D&escend";
            this.opDesc.UseVisualStyleBackColor = true;
            // 
            // opAsc
            // 
            this.opAsc.AutoSize = true;
            this.opAsc.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(27, 35);
            this.opAsc.Name = "opAsc";
            this.opAsc.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(61, 17);
            this.opAsc.TabIndex = 0;
            this.opAsc.TabStop = true;
            this.opAsc.Text = "&Ascend";
            this.opAsc.UseVisualStyleBackColor = true;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(16, 77);
            this.label2.Name = "label2";
            this.label2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(35, 13);
            this.label2.TabIndex = 4;
            this.label2.Text = "Name";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(16, 103);
            this.label3.Name = "label3";
            this.label3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(29, 13);
            this.label3.TabIndex = 6;
            this.label3.Text = "Field";
            // 
            // txDbField
            // 
            this.txDbField.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(57, 100);
            this.txDbField.Name = "txDbField";
            this.txDbField.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(256, 20);
            this.txDbField.TabIndex = 7;
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.opNumber);
            this.groupBox2.Controls.Add(this.opDate);
            this.groupBox2.Controls.Add(this.opText);
            this.groupBox2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 227);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(293, 66);
            this.groupBox2.TabIndex = 8;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Comparision Type";
            // 
            // opNumber
            // 
            this.opNumber.AutoSize = true;
            this.opNumber.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(198, 30);
            this.opNumber.Name = "opNumber";
            this.opNumber.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(62, 17);
            this.opNumber.TabIndex = 2;
            this.opNumber.TabStop = true;
            this.opNumber.Text = "N&umber";
            this.opNumber.UseVisualStyleBackColor = true;
            // 
            // opDate
            // 
            this.opDate.AutoSize = true;
            this.opDate.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(114, 30);
            this.opDate.Name = "opDate";
            this.opDate.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(48, 17);
            this.opDate.TabIndex = 1;
            this.opDate.TabStop = true;
            this.opDate.Text = "&Date";
            this.opDate.UseVisualStyleBackColor = true;
            // 
            // opText
            // 
            this.opText.AutoSize = true;
            this.opText.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(27, 30);
            this.opText.Name = "opText";
            this.opText.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(46, 17);
            this.opText.TabIndex = 0;
            this.opText.TabStop = true;
            this.opText.Text = "&Text";
            this.opText.UseVisualStyleBackColor = true;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.chkReprintGroup);
            this.groupBox3.Controls.Add(this.chkPrintInNewPage);
            this.groupBox3.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 306);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(293, 87);
            this.groupBox3.TabIndex = 9;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "Page Options";
            // 
            // chkReprintGroup
            // 
            this.chkReprintGroup.AutoSize = true;
            this.chkReprintGroup.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(27, 53);
            this.chkReprintGroup.Name = "chkReprintGroup";
            this.chkReprintGroup.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(185, 17);
            this.chkReprintGroup.TabIndex = 1;
            this.chkReprintGroup.Text = "Print group headers in every page";
            this.chkReprintGroup.UseVisualStyleBackColor = true;
            // 
            // chkPrintInNewPage
            // 
            this.chkPrintInNewPage.AutoSize = true;
            this.chkPrintInNewPage.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(27, 30);
            this.chkPrintInNewPage.Name = "chkPrintInNewPage";
            this.chkPrintInNewPage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(176, 17);
            this.chkPrintInNewPage.TabIndex = 0;
            this.chkPrintInNewPage.Text = "Print every group in a UNKNOWN >>  can't find constructor for class page";
            this.chkPrintInNewPage.UseVisualStyleBackColor = true;
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.chkGrandTotal);
            this.groupBox4.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 406);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(293, 63);
            this.groupBox4.TabIndex = 10;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Formulas";
            // 
            // chkGrandTotal
            // 
            this.chkGrandTotal.AutoSize = true;
            this.chkGrandTotal.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(27, 28);
            this.chkGrandTotal.Name = "chkGrandTotal";
            this.chkGrandTotal.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(134, 17);
            this.chkGrandTotal.TabIndex = 2;
            this.chkGrandTotal.Text = "It is a grand total group";
            this.chkGrandTotal.UseVisualStyleBackColor = true;
            // 
            // cmdCancel
            // 
            this.cmdCancel.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(237, 477);
            this.cmdCancel.Name = "cmdCancel";
            this.cmdCancel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmdCancel.TabIndex = 11;
            this.cmdCancel.Text = "&Cancel";
            this.cmdCancel.UseVisualStyleBackColor = true;
            this.cmdCancel.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmdCancel_Click);
            // 
            // cmdOk
            // 
            this.cmdOk.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(156, 477);
            this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmdOk.TabIndex = 12;
            this.cmdOk.Text = "&Ok";
            this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmdOk_Click);
            // 
            // txName
            // 
            this.txName.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(57, 74);
            this.txName.Name = "txName";
            this.txName.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(256, 20);
            this.txName.TabIndex = 13;
            // 
            // fGroup
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(332, 512);
            this.Controls.Add(this.txName);
            this.Controls.Add(this.cmdOk);
            this.Controls.Add(this.cmdCancel);
            this.Controls.Add(this.groupBox4);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.txDbField);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Name = "fGroup";
            this.Text = "Groups";
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

        let label1: System.Windows.Forms.Label = null;
        let panel1: System.Windows.Forms.Panel = null;
        let groupBox1: System.Windows.Forms.GroupBox = null;
        let label2: System.Windows.Forms.Label = null;
        let label3: System.Windows.Forms.Label = null;
        let pictureBox2: System.Windows.Forms.PictureBox = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let opDesc: System.Windows.Forms.RadioButton = null;
        let opAsc: System.Windows.Forms.RadioButton = null;
        let txDbField: CSMaskEdit.cMaskEdit = null;
        let groupBox2: System.Windows.Forms.GroupBox = null;
        let opNumber: System.Windows.Forms.RadioButton = null;
        let opDate: System.Windows.Forms.RadioButton = null;
        let opText: System.Windows.Forms.RadioButton = null;
        let groupBox3: System.Windows.Forms.GroupBox = null;
        let chkReprintGroup: System.Windows.Forms.CheckBox = null;
        let chkPrintInNewPage: System.Windows.Forms.CheckBox = null;
        let groupBox4: System.Windows.Forms.GroupBox = null;
        let chkGrandTotal: System.Windows.Forms.CheckBox = null;
        let cmdCancel: System.Windows.Forms.Button = null;
        let cmdOk: System.Windows.Forms.Button = null;
        let txName: CSMaskEdit.cMaskEdit = null;
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfGroup {

    Dispose: (bool) => void;
  }
}
