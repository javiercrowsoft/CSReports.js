(function(globalObject) {
    globalObject.CSDataBase = globalObject.CSDataBase || {};

    globalObject.CSDataBase.createFCancelQuery = function() {

        // @ts-ignore
        let self: CSDataBase.IfCancelQuery = {};
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
            this.lbTask = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.lbTime = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cmdCancel = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            ().BeginInit();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(21, 15);
            this.picIcon.Name = "picIcon";
            this.picIcon.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(58, 50);
            this.picIcon.TabIndex = 0;
            this.picIcon.TabStop = false;
            // 
            // lbTask
            // 
            this.lbTask.AutoSize = true;
            this.lbTask.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lbTask.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(105, 29);
            this.lbTask.Name = "lbTask";
            this.lbTask.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(92, 16);
            this.lbTask.TabIndex = 1;
            this.lbTask.Text = "Getting data ...";
            // 
            // lbTime
            // 
            this.lbTime.AutoSize = true;
            this.lbTime.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lbTime.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(202, 52);
            this.lbTime.Name = "lbTime";
            this.lbTime.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(39, 16);
            this.lbTime.TabIndex = 2;
            this.lbTime.Text = "00:00";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(105, 52);
            this.label2.Name = "label2";
            this.label2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(91, 16);
            this.label2.TabIndex = 3;
            this.label2.Text = "Time passed:";
            // 
            // cmdCancel
            // 
            this.cmdCancel.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(94, 119);
            this.cmdCancel.Name = "cmdCancel";
            this.cmdCancel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(88, 27);
            this.cmdCancel.TabIndex = 4;
            this.cmdCancel.Text = "Cancel";
            this.cmdCancel.UseVisualStyleBackColor = true;
            this.cmdCancel.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmdCancel_Click);
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.picIcon);
            this.panel1.Controls.Add(this.lbTask);
            this.panel1.Controls.Add(this.lbTime);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(292, 100);
            this.panel1.TabIndex = 5;
            // 
            // fCancelQuery
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(292, 158);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.cmdCancel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fCancelQuery";
            this.Text = "Open Query";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fCancelQuery_Load);
            ().EndInit();
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            this.ResumeLayout(false);

        };

UNKNOWN >>         #endregion

        let picIcon: System.Windows.Forms.PictureBox = null;
        let lbTask: System.Windows.Forms.Label = null;
        let lbTime: System.Windows.Forms.Label = null;
        let label2: System.Windows.Forms.Label = null;
        let cmdCancel: System.Windows.Forms.Button = null;
        let panel1: System.Windows.Forms.Panel = null;
        return self;

    }    }
}(globalObject));


namespace CSDataBase {

  export interface IfCancelQuery {

    Dispose: (bool) => void;
  }
}
