
﻿namespace CSReportEditor
{
    export class fSecProperties {


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
            this.panel1 = new System.Windows.Forms.Panel();
            this.lb_control = new System.Windows.Forms.Label();
            this.lb_secLn = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.label2 = new System.Windows.Forms.Label();
            this.tx_name = new System.Windows.Forms.TextBox();
            this.lb_formulaHide = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label25 = new System.Windows.Forms.Label();
            this.chk_formulaHide = new System.Windows.Forms.CheckBox();
            this.cmd_formulaHide = new System.Windows.Forms.Button();
            this.cmd_cancel = new System.Windows.Forms.Button();
            this.cmd_apply = new System.Windows.Forms.Button();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lb_control);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Controls.Add(this.lb_secLn);
            this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(548, 70);
            this.panel1.TabIndex = 1;
            // 
            // lb_control
            // 
            this.lb_control.AutoSize = true;
            this.lb_control.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_control.Location = new System.Drawing.Point(266, 19);
            this.lb_control.Name = "lb_control";
            this.lb_control.Size = new System.Drawing.Size(154, 25);
            this.lb_control.TabIndex = 2;
            this.lb_control.Text = "lbControlName";
            // 
            // lb_secLn
            // 
            this.lb_secLn.AutoSize = true;
            this.lb_secLn.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_secLn.Location = new System.Drawing.Point(76, 18);
            this.lb_secLn.Name = "lb_secLn";
            this.lb_secLn.Size = new System.Drawing.Size(187, 26);
            this.lb_secLn.TabIndex = 0;
            this.lb_secLn.Text = "Section properties";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location = new System.Drawing.Point(24, 18);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(46, 39);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(27, 22);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(35, 13);
            this.label2.TabIndex = 3;
            this.label2.Text = "Name";
            // 
            // tx_name
            // 
            this.tx_name.Location = new System.Drawing.Point(87, 19);
            this.tx_name.Name = "tx_name";
            this.tx_name.Size = new System.Drawing.Size(335, 20);
            this.tx_name.TabIndex = 2;
            // 
            // lb_formulaHide
            // 
            this.lb_formulaHide.ForeColor = System.Drawing.SystemColors.ControlText;
            this.lb_formulaHide.Location = new System.Drawing.Point(16, 25);
            this.lb_formulaHide.Name = "lb_formulaHide";
            this.lb_formulaHide.Size = new System.Drawing.Size(391, 48);
            this.lb_formulaHide.TabIndex = 17;
            this.lb_formulaHide.Text = "label26";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.lb_formulaHide);
            this.groupBox1.Location = new System.Drawing.Point(21, 72);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(423, 77);
            this.groupBox1.TabIndex = 22;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Visibility formula";
            // 
            // label25
            // 
            this.label25.AutoSize = true;
            this.label25.Location = new System.Drawing.Point(27, 49);
            this.label25.Name = "label25";
            this.label25.Size = new System.Drawing.Size(341, 13);
            this.label25.TabIndex = 21;
            this.label25.Text = "The formula must return a non zero value to set the control to be visible";
            // 
            // chk_formulaHide
            // 
            this.chk_formulaHide.AutoSize = true;
            this.chk_formulaHide.Location = new System.Drawing.Point(142, 25);
            this.chk_formulaHide.Name = "chk_formulaHide";
            this.chk_formulaHide.Size = new System.Drawing.Size(265, 17);
            this.chk_formulaHide.TabIndex = 20;
            this.chk_formulaHide.Text = "The control has a formula to determine if it is visible";
            this.chk_formulaHide.UseVisualStyleBackColor = true;
            // 
            // cmd_formulaHide
            // 
            this.cmd_formulaHide.Location = new System.Drawing.Point(30, 19);
            this.cmd_formulaHide.Name = "cmd_formulaHide";
            this.cmd_formulaHide.Size = new System.Drawing.Size(75, 23);
            this.cmd_formulaHide.TabIndex = 19;
            this.cmd_formulaHide.Text = "Edit";
            this.cmd_formulaHide.UseVisualStyleBackColor = true;
            // 
            // cmd_cancel
            // 
            this.cmd_cancel.Location = new System.Drawing.Point(399, 317);
            this.cmd_cancel.Name = "cmd_cancel";
            this.cmd_cancel.Size = new System.Drawing.Size(75, 23);
            this.cmd_cancel.TabIndex = 50;
            this.cmd_cancel.Text = "Cancel";
            this.cmd_cancel.UseVisualStyleBackColor = true;
            // 
            // cmd_apply
            // 
            this.cmd_apply.Location = new System.Drawing.Point(318, 317);
            this.cmd_apply.Name = "cmd_apply";
            this.cmd_apply.Size = new System.Drawing.Size(75, 23);
            this.cmd_apply.TabIndex = 49;
            this.cmd_apply.Text = "Apply";
            this.cmd_apply.UseVisualStyleBackColor = true;
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.tx_name);
            this.groupBox2.Controls.Add(this.label2);
            this.groupBox2.Location = new System.Drawing.Point(12, 80);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(468, 54);
            this.groupBox2.TabIndex = 52;
            this.groupBox2.TabStop = false;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.cmd_formulaHide);
            this.groupBox3.Controls.Add(this.chk_formulaHide);
            this.groupBox3.Controls.Add(this.label25);
            this.groupBox3.Controls.Add(this.groupBox1);
            this.groupBox3.Location = new System.Drawing.Point(12, 140);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(468, 160);
            this.groupBox3.TabIndex = 53;
            this.groupBox3.TabStop = false;
            // 
            // fSecProperties
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(486, 352);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.cmd_cancel);
            this.Controls.Add(this.cmd_apply);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Name = "fSecProperties";
            this.Text = "fSecProperties";
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.groupBox1.ResumeLayout(false);
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.ResumeLayout(false);

        }

UNKNOWN >>         #endregion

        private panel1: System.Windows.Forms.Panel = null;
        private lb_control: System.Windows.Forms.Label = null;
        private pictureBox1: System.Windows.Forms.PictureBox = null;
        private lb_secLn: System.Windows.Forms.Label = null;
        private label2: System.Windows.Forms.Label = null;
        private tx_name: System.Windows.Forms.TextBox = null;
        private lb_formulaHide: System.Windows.Forms.Label = null;
        private groupBox1: System.Windows.Forms.GroupBox = null;
        private label25: System.Windows.Forms.Label = null;
        private chk_formulaHide: System.Windows.Forms.CheckBox = null;
        private cmd_formulaHide: System.Windows.Forms.Button = null;
        private cmd_cancel: System.Windows.Forms.Button = null;
        private cmd_apply: System.Windows.Forms.Button = null;
        private groupBox2: System.Windows.Forms.GroupBox = null;
        private groupBox3: System.Windows.Forms.GroupBox = null;


    }    }
}
