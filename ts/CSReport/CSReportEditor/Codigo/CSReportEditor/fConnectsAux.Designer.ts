(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFConnectsAux = function() {

        // @ts-ignore
        let self: CSReportEditor.IfConnectsAux = {};
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
            this.components = UNKNOWN >>  can't find constructor for class System.ComponentModel.Container();
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Text = "fConnectsAux";
        };

UNKNOWN >>         #endregion
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfConnectsAux {

    Dispose: (bool) => void;
  }
}
