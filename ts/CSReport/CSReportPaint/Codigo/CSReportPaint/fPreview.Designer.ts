
﻿namespace CSReportPaint
{
    export class fPreview {


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
            this.rpwReport = new CSReportPreview.cReportPreview();
            this.SuspendLayout();
            // 
            // rpwReport
            // 
            this.rpwReport.AutoSize = true;
            this.rpwReport.AutoSizeMode = System.Windows.Forms.AutoSizeMode.GrowAndShrink;
            this.rpwReport.Dock = System.Windows.Forms.DockStyle.Fill;
            this.rpwReport.Location = new System.Drawing.Point(0, 0);
            this.rpwReport.Name = "rpwReport";
            this.rpwReport.Size = new System.Drawing.Size(532, 383);
            this.rpwReport.TabIndex = 0;
            // 
            // fPreview
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(532, 383);
            this.Controls.Add(this.rpwReport);
            this.Name = "fPreview";
            this.Text = "fPreview";
            this.Load += new System.EventHandler(this.fPreview_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

UNKNOWN >>         #endregion

        private rpwReport: CSReportPreview.cReportPreview = null;


    } 
}
