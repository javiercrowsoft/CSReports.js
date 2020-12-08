(function(globalObject) {
    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
UNKNOWN >>     partial class fMsg //@@@: partial class fMsg
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
            this.picIcon = new System.Windows.Forms.PictureBox(); //@@@: this.picIcon = new System.Windows.Forms.PictureBox();
            this.txMsg = new System.Windows.Forms.TextBox(); //@@@: this.txMsg = new System.Windows.Forms.TextBox();
            this.cmdOk = new System.Windows.Forms.Button(); //@@@: this.cmdOk = new System.Windows.Forms.Button();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.picIcon)).BeginInit();
            this.SuspendLayout(); //@@@: this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location = new System.Drawing.Point(23, 22); //@@@: this.picIcon.Location = new System.Drawing.Point(23, 22);
            this.picIcon.Name = "picIcon"; //@@@: this.picIcon.Name = "picIcon";
            this.picIcon.Size = new System.Drawing.Size(65, 50); //@@@: this.picIcon.Size = new System.Drawing.Size(65, 50);
            this.picIcon.TabIndex = 1; //@@@: this.picIcon.TabIndex = 1;
            this.picIcon.TabStop = false; //@@@: this.picIcon.TabStop = false;
            // 
            // txMsg
            // 
            this.txMsg.BackColor = System.Drawing.SystemColors.Control; //@@@: this.txMsg.BackColor = System.Drawing.SystemColors.Control;
            this.txMsg.BorderStyle = System.Windows.Forms.BorderStyle.None; //@@@: this.txMsg.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txMsg.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ()); //@@@: this.txMsg.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.txMsg.Location = new System.Drawing.Point(104, 22); //@@@: this.txMsg.Location = new System.Drawing.Point(104, 22);
            this.txMsg.Multiline = true; //@@@: this.txMsg.Multiline = true;
            this.txMsg.Name = "txMsg"; //@@@: this.txMsg.Name = "txMsg";
            this.txMsg.Size = new System.Drawing.Size(438, 71); //@@@: this.txMsg.Size = new System.Drawing.Size(438, 71);
            this.txMsg.TabIndex = 2; //@@@: this.txMsg.TabIndex = 2;
            // 
            // cmdOk
            // 
            this.cmdOk.Location = new System.Drawing.Point(228, 99); //@@@: this.cmdOk.Location = new System.Drawing.Point(228, 99);
            this.cmdOk.Name = "cmdOk"; //@@@: this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size = new System.Drawing.Size(107, 26); //@@@: this.cmdOk.Size = new System.Drawing.Size(107, 26);
            this.cmdOk.TabIndex = 0; //@@@: this.cmdOk.TabIndex = 0;
            this.cmdOk.Text = "Ok"; //@@@: this.cmdOk.Text = "Ok";
            this.cmdOk.UseVisualStyleBackColor = true; //@@@: this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click += new System.EventHandler(this.cmdOk_Click); //@@@: this.cmdOk.Click += new System.EventHandler(this.cmdOk_Click);
            // 
            // fMsg
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F); //@@@: this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font; //@@@: this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(563, 143); //@@@: this.ClientSize = new System.Drawing.Size(563, 143);
            this.Controls.Add(this.cmdOk); //@@@: this.Controls.Add(this.cmdOk);
            this.Controls.Add(this.txMsg); //@@@: this.Controls.Add(this.txMsg);
            this.Controls.Add(this.picIcon); //@@@: this.Controls.Add(this.picIcon);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog; //@@@: this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false; //@@@: this.MaximizeBox = false;
            this.MinimizeBox = false; //@@@: this.MinimizeBox = false;
            this.Name = "fMsg"; //@@@: this.Name = "fMsg";
            this.Text = "fMsg"; //@@@: this.Text = "fMsg";
            this.Load += new System.EventHandler(this.fMsg_Load); //@@@: this.Load += new System.EventHandler(this.fMsg_Load);
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.picIcon)).EndInit();
            this.ResumeLayout(false); //@@@: this.ResumeLayout(false);
            this.PerformLayout(); //@@@: this.PerformLayout();

        }; //@@@: }

UNKNOWN >>         #endregion //@@@: #endregion

        let picIcon = null; //@@@: private System.Windows.Forms.PictureBox picIcon;
        let txMsg = null; //@@@: private System.Windows.Forms.TextBox txMsg;
        let cmdOk = null; //@@@: private System.Windows.Forms.Button cmdOk;
    } //@@@: }
} //@@@: }
