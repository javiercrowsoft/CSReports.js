(function(globalObject) {
    globalObject.CSAssocFile = globalObject.CSAssocFile || {}; //@@@: namespace CSAssocFile
 //@@@: {
UNKNOWN >>     partial class fAsk //@@@: partial class fAsk
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
            this.cmdYes = new System.Windows.Forms.Button(); //@@@: this.cmdYes = new System.Windows.Forms.Button();
            this.chkDontAskAgain = new System.Windows.Forms.CheckBox(); //@@@: this.chkDontAskAgain = new System.Windows.Forms.CheckBox();
            this.lbQuestion = new System.Windows.Forms.Label(); //@@@: this.lbQuestion = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox(); //@@@: this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.cmdNo = new System.Windows.Forms.Button(); //@@@: this.cmdNo = new System.Windows.Forms.Button();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout(); //@@@: this.SuspendLayout();
            // 
            // cmdYes
            // 
            this.cmdYes.Location = new System.Drawing.Point(166, 98); //@@@: this.cmdYes.Location = new System.Drawing.Point(166, 98);
            this.cmdYes.Name = "cmdYes"; //@@@: this.cmdYes.Name = "cmdYes";
            this.cmdYes.Size = new System.Drawing.Size(102, 26); //@@@: this.cmdYes.Size = new System.Drawing.Size(102, 26);
            this.cmdYes.TabIndex = 0; //@@@: this.cmdYes.TabIndex = 0;
            this.cmdYes.Text = "&Yes"; //@@@: this.cmdYes.Text = "&Yes";
            this.cmdYes.UseVisualStyleBackColor = true; //@@@: this.cmdYes.UseVisualStyleBackColor = true;
            this.cmdYes.Click += new System.EventHandler(this.cmdYes_Click); //@@@: this.cmdYes.Click += new System.EventHandler(this.cmdYes_Click);
            // 
            // chkDontAskAgain
            // 
            this.chkDontAskAgain.AutoSize = true; //@@@: this.chkDontAskAgain.AutoSize = true;
            this.chkDontAskAgain.Location = new System.Drawing.Point(98, 56); //@@@: this.chkDontAskAgain.Location = new System.Drawing.Point(98, 56);
            this.chkDontAskAgain.Name = "chkDontAskAgain"; //@@@: this.chkDontAskAgain.Name = "chkDontAskAgain";
            this.chkDontAskAgain.Size = new System.Drawing.Size(100, 17); //@@@: this.chkDontAskAgain.Size = new System.Drawing.Size(100, 17);
            this.chkDontAskAgain.TabIndex = 1; //@@@: this.chkDontAskAgain.TabIndex = 1;
            this.chkDontAskAgain.Text = "Don\'t ask again"; //@@@: this.chkDontAskAgain.Text = "Don\'t ask again";
            this.chkDontAskAgain.UseVisualStyleBackColor = true; //@@@: this.chkDontAskAgain.UseVisualStyleBackColor = true;
            // 
            // lbQuestion
            // 
            this.lbQuestion.AutoSize = true; //@@@: this.lbQuestion.AutoSize = true;
            this.lbQuestion.Location = new System.Drawing.Point(95, 23); //@@@: this.lbQuestion.Location = new System.Drawing.Point(95, 23);
            this.lbQuestion.Name = "lbQuestion"; //@@@: this.lbQuestion.Name = "lbQuestion";
            this.lbQuestion.Size = new System.Drawing.Size(291, 13); //@@@: this.lbQuestion.Size = new System.Drawing.Size(291, 13);
            this.lbQuestion.TabIndex = 2; //@@@: this.lbQuestion.TabIndex = 2;
            this.lbQuestion.Text = "Do you want to associate the extension .xxx to xxx program?"; //@@@: this.lbQuestion.Text = "Do you want to associate the extension .xxx to xxx program?";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSAssocFile.Properties.Resources.question2; //@@@: this.pictureBox1.Image = global::CSAssocFile.Properties.Resources.question2;
            this.pictureBox1.Location = new System.Drawing.Point(23, 13); //@@@: this.pictureBox1.Location = new System.Drawing.Point(23, 13);
            this.pictureBox1.Name = "pictureBox1"; //@@@: this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(66, 65); //@@@: this.pictureBox1.Size = new System.Drawing.Size(66, 65);
            this.pictureBox1.TabIndex = 3; //@@@: this.pictureBox1.TabIndex = 3;
            this.pictureBox1.TabStop = false; //@@@: this.pictureBox1.TabStop = false;
            // 
            // cmdNo
            // 
            this.cmdNo.Location = new System.Drawing.Point(274, 98); //@@@: this.cmdNo.Location = new System.Drawing.Point(274, 98);
            this.cmdNo.Name = "cmdNo"; //@@@: this.cmdNo.Name = "cmdNo";
            this.cmdNo.Size = new System.Drawing.Size(102, 26); //@@@: this.cmdNo.Size = new System.Drawing.Size(102, 26);
            this.cmdNo.TabIndex = 4; //@@@: this.cmdNo.TabIndex = 4;
            this.cmdNo.Text = "&No"; //@@@: this.cmdNo.Text = "&No";
            this.cmdNo.UseVisualStyleBackColor = true; //@@@: this.cmdNo.UseVisualStyleBackColor = true;
            this.cmdNo.Click += new System.EventHandler(this.cmdNo_Click); //@@@: this.cmdNo.Click += new System.EventHandler(this.cmdNo_Click);
            // 
            // fAsk
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F); //@@@: this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font; //@@@: this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(441, 137); //@@@: this.ClientSize = new System.Drawing.Size(441, 137);
            this.Controls.Add(this.cmdNo); //@@@: this.Controls.Add(this.cmdNo);
            this.Controls.Add(this.pictureBox1); //@@@: this.Controls.Add(this.pictureBox1);
            this.Controls.Add(this.lbQuestion); //@@@: this.Controls.Add(this.lbQuestion);
            this.Controls.Add(this.chkDontAskAgain); //@@@: this.Controls.Add(this.chkDontAskAgain);
            this.Controls.Add(this.cmdYes); //@@@: this.Controls.Add(this.cmdYes);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog; //@@@: this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.Name = "fAsk"; //@@@: this.Name = "fAsk";
            this.Text = "File Association"; //@@@: this.Text = "File Association";
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false); //@@@: this.ResumeLayout(false);
            this.PerformLayout(); //@@@: this.PerformLayout();

        }; //@@@: }

UNKNOWN >>         #endregion //@@@: #endregion

        let cmdYes = null; //@@@: private System.Windows.Forms.Button cmdYes;
        let chkDontAskAgain = null; //@@@: private System.Windows.Forms.CheckBox chkDontAskAgain;
        let lbQuestion = null; //@@@: private System.Windows.Forms.Label lbQuestion;
        let pictureBox1 = null; //@@@: private System.Windows.Forms.PictureBox pictureBox1;
        let cmdNo = null; //@@@: private System.Windows.Forms.Button cmdNo;
    } //@@@: }
} //@@@: }
