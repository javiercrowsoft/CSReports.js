(function(globalObject) {
    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

    globalObject.CSReportPaint.createFPreview = function() {

        // @ts-ignore
        let self: CSReportPaint.IfPreview = {};
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
            this.rpwReport = UNKNOWN >>  can't find constructor for class CSReportPreview.cReportPreview();
            this.SuspendLayout();
            // 
            // rpwReport
            // 
            this.rpwReport.AutoSize = true;
            this.rpwReport.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.rpwReport.Dock = System.Windows.Forms.DockStyle.Fill;
            this.rpwReport.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.rpwReport.Name = "rpwReport";
            this.rpwReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(532, 383);
            this.rpwReport.TabIndex = 0;
            // 
            // fPreview
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(532, 383);
            this.Controls.Add(this.rpwReport);
            this.Name = "fPreview";
            this.Text = "fPreview";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fPreview_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let rpwReport: CSReportPreview.cReportPreview = null;
        return self;

    }    }
}(globalObject));


namespace CSReportPaint {

  export interface IfPreview {

    Dispose: (bool) => void;
  }
}
