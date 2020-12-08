(function(globalObject) {
    globalObject.CSMaskEdit = globalObject.CSMaskEdit || {};

UNKNOWN >>     partial class cMaskEdit
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        let components = null;

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
            this.cmdButton = new System.Windows.Forms.Button();
            this.txText = new System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // cmdButton
            // 
            this.cmdButton.Location = new System.Drawing.Point(228, 0);
            this.cmdButton.Name = "cmdButton";
            this.cmdButton.Size = new System.Drawing.Size(26, 20);
            this.cmdButton.TabIndex = 9;
            this.cmdButton.Text = "...";
            this.cmdButton.UseVisualStyleBackColor = true;
            // 
            // txText
            // 
            this.txText.Location = new System.Drawing.Point(0, 2);
            this.txText.Name = "txText";
            this.txText.Size = new System.Drawing.Size(222, 20);
            this.txText.TabIndex = 8;
            // 
            // cMaskEdit
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.cmdButton);
            this.Controls.Add(this.txText);
            this.Name = "cMaskEdit";
            this.Size = new System.Drawing.Size(254, 20);
            this.SizeChanged += new System.EventHandler(this.cMaskEdit_SizeChanged);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let cmdButton = null;
        let txText = null;
    }
}
