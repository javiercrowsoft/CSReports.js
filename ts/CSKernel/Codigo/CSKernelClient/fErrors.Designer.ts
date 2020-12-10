(function(globalObject) {
    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createFErrors = function() {

        // @ts-ignore
        let self: CSKernelClient.IfErrors = {};
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
            this.picIcon = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.lbError = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cmdOk = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmdDetails = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.txError = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(20, 19);
            this.picIcon.Name = "picIcon";
            this.picIcon.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(65, 50);
            this.picIcon.TabIndex = 0;
            this.picIcon.TabStop = false;
            // 
            // lbError
            // 
            this.lbError.AutoSize = true;
            this.lbError.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(102, 24);
            this.lbError.Name = "lbError";
            this.lbError.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(83, 13);
            this.lbError.TabIndex = 1;
            this.lbError.Text = "Error description";
            // 
            // cmdOk
            // 
            this.cmdOk.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(422, 25);
            this.cmdOk.Name = "cmdOk";
            this.cmdOk.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(96, 29);
            this.cmdOk.TabIndex = 2;
            this.cmdOk.Text = "Ok";
            this.cmdOk.UseVisualStyleBackColor = true;
            this.cmdOk.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmdOk_Click);
            // 
            // cmdDetails
            // 
            this.cmdDetails.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(422, 60);
            this.cmdDetails.Name = "cmdDetails";
            this.cmdDetails.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(96, 29);
            this.cmdDetails.TabIndex = 3;
            this.cmdDetails.Text = "Details";
            this.cmdDetails.UseVisualStyleBackColor = true;
            this.cmdDetails.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmdDetails_Click);
            // 
            // txError
            // 
            this.txError.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(15, 107);
            this.txError.Multiline = true;
            this.txError.Name = "txError";
            this.txError.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(502, 94);
            this.txError.TabIndex = 4;
            // 
            // fErrors
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(527, 104);
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
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fErrors_Load);
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
        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IfErrors {

    Dispose: (bool) => void;
  }
}
