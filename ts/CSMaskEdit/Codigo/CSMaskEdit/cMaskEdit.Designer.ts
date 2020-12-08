(function(globalObject) {
    globalObject.CSMaskEdit = globalObject.CSMaskEdit || {};

UNKNOWN >>     partial class cMaskEdit
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

UNKNOWN >>         #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() {
            this.cmdButton =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.txText =  globalObject.CSReportDll.createSystem.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // cmdButton
            // 
            this.cmdButton.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(228, 0);
            this.cmdButton.Name = "cmdButton";
            this.cmdButton.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(26, 20);
            this.cmdButton.TabIndex = 9;
            this.cmdButton.Text = "...";
            this.cmdButton.UseVisualStyleBackColor = true;
            // 
            // txText
            // 
            this.txText.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 2);
            this.txText.Name = "txText";
            this.txText.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(222, 20);
            this.txText.TabIndex = 8;
            // 
            // cMaskEdit
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.cmdButton);
            this.Controls.Add(this.txText);
            this.Name = "cMaskEdit";
            this.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(254, 20);
            this.SizeChanged +=  globalObject.CSReportDll.createSystem.EventHandler(this.cMaskEdit_SizeChanged);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let cmdButton: System.Windows.Forms.Button = null;
        let txText: System.Windows.Forms.TextBox = null;
    }
}
