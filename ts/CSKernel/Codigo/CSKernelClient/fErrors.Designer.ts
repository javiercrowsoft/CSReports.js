(function(globalObject) {
    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

UNKNOWN >>     partial class fErrors
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
            this.lbError =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.cmdOk =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.cmdDetails =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.txError =  globalObject.CSReportDll.createSystem.Windows.Forms.TextBox();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(20, 19);
            this.picIcon.Name = "picIcon";
            this.picIcon.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(65, 50);
            this.picIcon.TabIndex = 0;
            this.picIcon.TabStop = false;
            // 
            // lbError
            // 
            this.lbError.AutoSize = true;
            this.lbError.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(102, 24);
            this.lbError.Name = "lbError";
            this.lbError.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(83, 13);
            this.lbError.TabIndex = 1;
            this.lbError.Text = "Error description";
            // 
            // cmdOk
            // 
            this.cmdOk.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(422, 25);
            this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(96, 29);
            this.cmdOk.TabIndex = 2;
            this.cmdOk.Text = "Ok";
            this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdOk_Click);
            // 
            // cmdDetails
            // 
            this.cmdDetails.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(422, 60);
            this.cmdDetails.Name = "cmdDetails";
            this.cmdDetails.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(96, 29);
            this.cmdDetails.TabIndex = 3;
            this.cmdDetails.Text = "Details";
            this.cmdDetails.UseVisualStyleBackColor = true;
            this.cmdDetails.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdDetails_Click);
            // 
            // txError
            // 
            this.txError.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(15, 107);
            this.txError.Multiline = true;
            this.txError.Name = "txError";
            this.txError.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(502, 94);
            this.txError.TabIndex = 4;
            // 
            // fErrors
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(527, 104);
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
            this.Load +=  globalObject.CSReportDll.createSystem.EventHandler(this.fErrors_Load);
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let picIcon: System.Windows.Forms.PictureBox = null;
        let lbError: System.Windows.Forms.Label = null;
        let cmdOk: System.Windows.Forms.Button = null;
        let cmdDetails: System.Windows.Forms.Button = null;
        let txError: System.Windows.Forms.TextBox = null;
    }
}
