(function(globalObject) {
    globalObject.CSMaskEdit = globalObject.CSMaskEdit || {};

    globalObject.CSMaskEdit.createCMaskEdit = function() {

        // @ts-ignore
        let self: CSMaskEdit.IcMaskEdit = {};
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

UNKNOWN >>         #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() {
            this.cmdButton = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.txText = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.SuspendLayout();
            // 
            // cmdButton
            // 
            this.cmdButton.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(228, 0);
            this.cmdButton.Name = "cmdButton";
            this.cmdButton.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(26, 20);
            this.cmdButton.TabIndex = 9;
            this.cmdButton.Text = "...";
            this.cmdButton.UseVisualStyleBackColor = true;
            // 
            // txText
            // 
            this.txText.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 2);
            this.txText.Name = "txText";
            this.txText.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(222, 20);
            this.txText.TabIndex = 8;
            // 
            // cMaskEdit
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.cmdButton);
            this.Controls.Add(this.txText);
            this.Name = "cMaskEdit";
            this.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(254, 20);
            this.SizeChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cMaskEdit_SizeChanged);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let cmdButton: System.Windows.Forms.Button = null;
        let txText: System.Windows.Forms.TextBox = null;
        return self;

    }    }
}(globalObject));


namespace CSMaskEdit {

  export interface IcMaskEdit {

    Dispose: (bool) => void;
  }
}
