
﻿namespace CSKernelClient
{
    export class fMsg {


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
            this.txMsg = new System.Windows.Forms.TextBox();
            this.cmdOk = new System.Windows.Forms.Button();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location = new System.Drawing.Point(23, 22);
            this.picIcon.Name = "picIcon";
            this.picIcon.Size = new System.Drawing.Size(65, 50);
            this.picIcon.TabIndex = 1;
            this.picIcon.TabStop = false;
            // 
            // txMsg
            // 
            this.txMsg.BackColor = System.Drawing.SystemColors.Control;
            this.txMsg.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txMsg.Font = new System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.txMsg.Location = new System.Drawing.Point(104, 22);
            this.txMsg.Multiline = true;
            this.txMsg.Name = "txMsg";
            this.txMsg.Size = new System.Drawing.Size(438, 71);
            this.txMsg.TabIndex = 2;
            // 
            // cmdOk
            // 
            this.cmdOk.Location = new System.Drawing.Point(228, 99);
            this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size = new System.Drawing.Size(107, 26);
            this.cmdOk.TabIndex = 0;
            this.cmdOk.Text = "Ok";
            this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click += new System.EventHandler(this.cmdOk_Click);
            // 
            // fMsg
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(563, 143);
            this.Controls.Add(this.cmdOk);
            this.Controls.Add(this.txMsg);
            this.Controls.Add(this.picIcon);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fMsg";
            this.Text = "fMsg";
            this.Load += new System.EventHandler(this.fMsg_Load);
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

UNKNOWN >>         #endregion

        private picIcon: System.Windows.Forms.PictureBox = null;
        private txMsg: System.Windows.Forms.TextBox = null;
        private cmdOk: System.Windows.Forms.Button = null;


    }    }
}
