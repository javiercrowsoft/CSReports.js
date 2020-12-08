(function(globalObject) {
    globalObject.CSReportWebServer = globalObject.CSReportWebServer || {};

UNKNOWN >>     partial class fProgress
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
            this.cmd_cancel =  globalObject.CSReportDll.createSystem.Windows.Forms.Button();
            this.panel1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Panel();
            this.lb_task =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.Label1 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.pictureBox1 =  globalObject.CSReportDll.createSystem.Windows.Forms.PictureBox();
            this.label2 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.lb_curr_page =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.prg_bar =  globalObject.CSReportDll.createSystem.Windows.Forms.ProgressBar();
            this.lb_record_count =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.label4 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.lb_curr_record =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.label6 =  globalObject.CSReportDll.createSystem.Windows.Forms.Label();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // cmd_cancel
            // 
            this.cmd_cancel.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(224, 185);
            this.cmd_cancel.Name = "cmd_cancel";
            this.cmd_cancel.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(88, 27);
            this.cmd_cancel.TabIndex = 9;
            this.cmd_cancel.Text = "Cancel";
            this.cmd_cancel.UseVisualStyleBackColor = true;
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lb_task);
            this.panel1.Controls.Add(this.Label1);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(531, 77);
            this.panel1.TabIndex = 7;
            // 
            // lb_task
            // 
            this.lb_task.AutoSize = true;
            this.lb_task.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_task.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(232, 26);
            this.lb_task.Name = "lb_task";
            this.lb_task.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(0, 24);
            this.lb_task.TabIndex = 3;
            // 
            // Label1
            // 
            this.Label1.AutoSize = true;
            this.Label1.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 14.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.Label1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(77, 26);
            this.Label1.Name = "Label1";
            this.Label1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(159, 24);
            this.Label1.TabIndex = 2;
            this.Label1.Text = "Executing report :";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportWebServer.Properties.Resources.config_page;
            this.pictureBox1.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(24, 18);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(46, 39);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label2.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(42, 102);
            this.label2.Name = "label2";
            this.label2.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(115, 16);
            this.label2.TabIndex = 10;
            this.label2.Text = "Generating page :";
            // 
            // lb_curr_page
            // 
            this.lb_curr_page.AutoSize = true;
            this.lb_curr_page.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_curr_page.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(163, 102);
            this.lb_curr_page.Name = "lb_curr_page";
            this.lb_curr_page.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(15, 16);
            this.lb_curr_page.TabIndex = 11;
            this.lb_curr_page.Text = "0";
            // 
            // prg_bar
            // 
            this.prg_bar.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(24, 145);
            this.prg_bar.Name = "prg_bar";
            this.prg_bar.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(473, 23);
            this.prg_bar.TabIndex = 12;
            // 
            // lb_record_count
            // 
            this.lb_record_count.AutoSize = true;
            this.lb_record_count.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_record_count.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(278, 102);
            this.lb_record_count.Name = "lb_record_count";
            this.lb_record_count.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(15, 16);
            this.lb_record_count.TabIndex = 14;
            this.lb_record_count.Text = "0";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label4.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(224, 102);
            this.label4.Name = "label4";
            this.label4.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(48, 16);
            this.label4.TabIndex = 13;
            this.label4.Text = "Rows :";
            // 
            // lb_curr_record
            // 
            this.lb_curr_record.AutoSize = true;
            this.lb_curr_record.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_curr_record.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(441, 102);
            this.lb_curr_record.Name = "lb_curr_record";
            this.lb_curr_record.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(15, 16);
            this.lb_curr_record.TabIndex = 16;
            this.lb_curr_record.Text = "0";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Font =  globalObject.CSReportDll.createSystem.Drawing.Font("Microsoft Sans Serif", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.label6.Location =  globalObject.CSReportDll.createSystem.Drawing.Point(355, 102);
            this.label6.Name = "label6";
            this.label6.Size =  globalObject.CSReportDll.createSystem.Drawing.Size(80, 16);
            this.label6.TabIndex = 15;
            this.label6.Text = "Current row :";
            // 
            // fProgress
            // 
            this.AutoScaleDimensions =  globalObject.CSReportDll.createSystem.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize =  globalObject.CSReportDll.createSystem.Drawing.Size(526, 228);
            this.Controls.Add(this.lb_curr_record);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.lb_record_count);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.prg_bar);
            this.Controls.Add(this.lb_curr_page);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.cmd_cancel);
            this.Controls.Add(this.panel1);
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fProgress";
            this.Text = "fProgress";
            this.Load +=  globalObject.CSReportDll.createSystem.EventHandler(this.fProgress_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let cmd_cancel: System.Windows.Forms.Button = null;
        let panel1: System.Windows.Forms.Panel = null;
        let Label1: System.Windows.Forms.Label = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let label2: System.Windows.Forms.Label = null;
        let lb_curr_page: System.Windows.Forms.Label = null;
        let prg_bar: System.Windows.Forms.ProgressBar = null;
        let lb_record_count: System.Windows.Forms.Label = null;
        let label4: System.Windows.Forms.Label = null;
        let lb_curr_record: System.Windows.Forms.Label = null;
        let label6: System.Windows.Forms.Label = null;
        let lb_task: System.Windows.Forms.Label = null;
    }
}
