(function(globalObject) {
    globalObject.CSDataBase = globalObject.CSDataBase || {};

UNKNOWN >>     partial class fCancelQuery
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
            this.picIcon =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.lbTask =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.lbTime =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.label2 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.cmdCancel =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.panel1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Panel();
            ().BeginInit();
            this.panel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // picIcon
            // 
            this.picIcon.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(21, 15);
            this.picIcon.Name = "picIcon";
            this.picIcon.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(58, 50);
            this.picIcon.TabIndex = 0;
            this.picIcon.TabStop = false;
            // 
            // lbTask
            // 
            this.lbTask.AutoSize = true;
            this.lbTask.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lbTask.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(105, 29);
            this.lbTask.Name = "lbTask";
            this.lbTask.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(92, 16);
            this.lbTask.TabIndex = 1;
            this.lbTask.Text = "Getting data ...";
            // 
            // lbTime
            // 
            this.lbTime.AutoSize = true;
            this.lbTime.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lbTime.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(202, 52);
            this.lbTime.Name = "lbTime";
            this.lbTime.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(39, 16);
            this.lbTime.TabIndex = 2;
            this.lbTime.Text = "00:00";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(105, 52);
            this.label2.Name = "label2";
            this.label2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(91, 16);
            this.label2.TabIndex = 3;
            this.label2.Text = "Time passed:";
            // 
            // cmdCancel
            // 
            this.cmdCancel.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(94, 119);
            this.cmdCancel.Name = "cmdCancel";
            this.cmdCancel.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(88, 27);
            this.cmdCancel.TabIndex = 4;
            this.cmdCancel.Text = "Cancel";
            this.cmdCancel.UseVisualStyleBackColor = true;
            this.cmdCancel.Click +=  globalObject.CSReportDll.createSystem.EventHandler(this.cmdCancel_Click);
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.picIcon);
            this.panel1.Controls.Add(this.lbTask);
            this.panel1.Controls.Add(this.lbTime);
            this.panel1.Controls.Add(this.label2);
            this.panel1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(292, 100);
            this.panel1.TabIndex = 5;
            // 
            // fCancelQuery
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(292, 158);
            this.Controls.Add(this.panel1);
            this.Controls.Add(this.cmdCancel);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fCancelQuery";
            this.Text = "Open Query";
            this.Load +=  globalObject.CSReportDll.createSystem.EventHandler(this.fCancelQuery_Load);
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
    }
}
