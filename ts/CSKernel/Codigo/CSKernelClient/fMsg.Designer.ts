(function(globalObject) {
    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

UNKNOWN >>     partial class fMsg
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
            this.picIcon =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.txMsg =  globalObject.CSReportDll.createSystem.Windows.Forms.TextBox();
            this.cmdOk =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(23, 22);
            this.picIcon.Name = "picIcon";
            this.picIcon.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(65, 50);
            this.picIcon.TabIndex = 1;
            this.picIcon.TabStop = false;
            // 
            // txMsg
            // 
            this.txMsg.BackColor = System.Drawing.SystemColors.Control;
            this.txMsg.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.txMsg.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.txMsg.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(104, 22);
            this.txMsg.Multiline = true;
            this.txMsg.Name = "txMsg";
            this.txMsg.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(438, 71);
            this.txMsg.TabIndex = 2;
            // 
            // cmdOk
            // 
            this.cmdOk.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(228, 99);
            this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(107, 26);
            this.cmdOk.TabIndex = 0;
            this.cmdOk.Text = "Ok";
            this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdOk_Click);
            // 
            // fMsg
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(563, 143);
            this.Controls.Add(this.cmdOk);
            this.Controls.Add(this.txMsg);
            this.Controls.Add(this.picIcon);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fMsg";
            this.Text = "fMsg";
            this.Load +=  globalObject.CSReportDll.createSystem.EventHandler(this.fMsg_Load);
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let picIcon: System.Windows.Forms.PictureBox = null;
        let txMsg: System.Windows.Forms.TextBox = null;
        let cmdOk: System.Windows.Forms.Button = null;
    }
}
