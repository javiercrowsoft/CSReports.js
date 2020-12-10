(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFProgress = function() {

        // @ts-ignore
        let self: CSReportEditor.IfProgress = {};
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
            this.SuspendLayout();
            // 
            // fProgress
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(313, 179);
            this.Name = "fProgress";
            this.Text = "fProgress";
            this.ResumeLayout(false);

        };

UNKNOWN >>         #endregion
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfProgress {

    Dispose: (bool) => void;
  }
}
