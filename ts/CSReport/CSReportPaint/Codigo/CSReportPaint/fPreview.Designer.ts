(function(globalObject) {
    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

UNKNOWN >>     partial class fPreview
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
            this.rpwReport =  globalObject.CSReportDll.createCSReportPreview.cReportPreview();
            this.SuspendLayout();
            // 
            // rpwReport
            // 
            this.rpwReport.AutoSize = true;
            this.rpwReport.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.rpwReport.Dock = System.Windows.Forms.DockStyle.Fill;
            this.rpwReport.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 0);
            this.rpwReport.Name = "rpwReport";
            this.rpwReport.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(532, 383);
            this.rpwReport.TabIndex = 0;
            // 
            // fPreview
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(532, 383);
            this.Controls.Add(this.rpwReport);
            this.Name = "fPreview";
            this.Text = "fPreview";
            this.Load +=  globalObject.CSReportDll.createSystem.EventHandler(this.fPreview_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let rpwReport: CSReportPreview.cReportPreview = null;
    }
}
