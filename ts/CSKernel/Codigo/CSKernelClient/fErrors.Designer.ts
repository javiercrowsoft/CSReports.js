
﻿namespace CSKernelClient
{
    export class fErrors {


    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private components: System.ComponentModel.IContainer = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        public Dispose(disposing: boolean) {
            if (disposing && (components !== null)) {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

UNKNOWN >>         #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private InitializeComponent() {
            this.picIcon = new System.Windows.Forms.PictureBox();
            this.lbError = new System.Windows.Forms.Label();
            this.cmdOk = new System.Windows.Forms.Button();
            this.cmdDetails = new System.Windows.Forms.Button();
            this.txError = new System.Windows.Forms.TextBox();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location = new System.Drawing.Point(20, 19);
            this.picIcon.Name = "picIcon";
            this.picIcon.Size = new System.Drawing.Size(65, 50);
            this.picIcon.TabIndex = 0;
            this.picIcon.TabStop = false;
            // 
            // lbError
            // 
            this.lbError.AutoSize = true;
            this.lbError.Location = new System.Drawing.Point(102, 24);
            this.lbError.Name = "lbError";
            this.lbError.Size = new System.Drawing.Size(83, 13);
            this.lbError.TabIndex = 1;
            this.lbError.Text = "Error description";
            // 
            // cmdOk
            // 
            this.cmdOk.Location = new System.Drawing.Point(422, 25);
            this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size = new System.Drawing.Size(96, 29);
            this.cmdOk.TabIndex = 2;
            this.cmdOk.Text = "Ok";
            this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click += new System.EventHandler(this.cmdOk_Click);
            // 
            // cmdDetails
            // 
            this.cmdDetails.Location = new System.Drawing.Point(422, 60);
            this.cmdDetails.Name = "cmdDetails";
            this.cmdDetails.Size = new System.Drawing.Size(96, 29);
            this.cmdDetails.TabIndex = 3;
            this.cmdDetails.Text = "Details";
            this.cmdDetails.UseVisualStyleBackColor = true;
            this.cmdDetails.Click += new System.EventHandler(this.cmdDetails_Click);
            // 
            // txError
            // 
            this.txError.Location = new System.Drawing.Point(15, 107);
            this.txError.Multiline = true;
            this.txError.Name = "txError";
            this.txError.Size = new System.Drawing.Size(502, 94);
            this.txError.TabIndex = 4;
            // 
            // fErrors
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(527, 104);
            this.Controls.Add(this.txError);
            this.Controls.Add(this.cmdDetails);
            this.Controls.Add(this.cmdOk);
            this.Controls.Add(this.lbError);
            this.Controls.Add(this.picIcon);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fErrors";
            this.Text = "Error";
            this.Load += new System.EventHandler(this.fErrors_Load);
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

UNKNOWN >>         #endregion

        private picIcon: System.Windows.Forms.PictureBox = null;
        private lbError: System.Windows.Forms.Label = null;
        private cmdOk: System.Windows.Forms.Button = null;
        private cmdDetails: System.Windows.Forms.Button = null;
        private txError: System.Windows.Forms.TextBox = null;


    }    }
}
