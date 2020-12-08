(function(globalObject) {
    globalObject.CSAssocFile = globalObject.CSAssocFile || {};

UNKNOWN >>     partial class fAsk
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
            this.cmdYes =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.chkDontAskAgain =  globalObject.CSReportDll.createSystem.Windows.Forms.CheckBox();
            this.lbQuestion =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.pictureBox1 =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.cmdNo =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // cmdYes
            // 
            this.cmdYes.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(166, 98);
            this.cmdYes.Name = "cmdYes";
            this.cmdYes.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(102, 26);
            this.cmdYes.TabIndex = 0;
            this.cmdYes.Text = "&Yes";
            this.cmdYes.UseVisualStyleBackColor = true;
            this.cmdYes.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdYes_Click);
            // 
            // chkDontAskAgain
            // 
            this.chkDontAskAgain.AutoSize = true;
            this.chkDontAskAgain.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(98, 56);
            this.chkDontAskAgain.Name = "chkDontAskAgain";
            this.chkDontAskAgain.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(100, 17);
            this.chkDontAskAgain.TabIndex = 1;
            this.chkDontAskAgain.Text = "Don\'t ask again";
            this.chkDontAskAgain.UseVisualStyleBackColor = true;
            // 
            // lbQuestion
            // 
            this.lbQuestion.AutoSize = true;
            this.lbQuestion.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(95, 23);
            this.lbQuestion.Name = "lbQuestion";
            this.lbQuestion.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(291, 13);
            this.lbQuestion.TabIndex = 2;
            this.lbQuestion.Text = "Do you want to associate the extension .xxx to xxx program?";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSAssocFile.Properties.Resources.question2;
            this.pictureBox1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(23, 13);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(66, 65);
            this.pictureBox1.TabIndex = 3;
            this.pictureBox1.TabStop = false;
            // 
            // cmdNo
            // 
            this.cmdNo.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(274, 98);
            this.cmdNo.Name = "cmdNo";
            this.cmdNo.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(102, 26);
            this.cmdNo.TabIndex = 4;
            this.cmdNo.Text = "&No";
            this.cmdNo.UseVisualStyleBackColor = true;
            this.cmdNo.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdNo_Click);
            // 
            // fAsk
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(441, 137);
            this.Controls.Add(this.cmdNo);
            this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.lbQuestion);
            this.Controls.Add(this.chkDontAskAgain);
            this.Controls.Add(this.cmdYes);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Name = "fAsk";
            this.Text = "File Association";
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let cmdYes: System.Windows.Forms.Button = null;
        let chkDontAskAgain: System.Windows.Forms.CheckBox = null;
        let lbQuestion: System.Windows.Forms.Label = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let cmdNo: System.Windows.Forms.Button = null;
    }
}
