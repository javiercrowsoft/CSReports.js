(function(globalObject) {
    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createFInput = function() {

        // @ts-ignore
        let self: CSKernelClient.IfInput = {};
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
            this.tableLayoutPanel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TableLayoutPanel();
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.lb_title = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.pictureBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.panel2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.cmd_cancel = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_apply = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.panel3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.lb_descrip = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_server = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.tableLayoutPanel1.SuspendLayout();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.panel2.SuspendLayout();
            this.panel3.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.AutoSize = true;
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel2, 0, 2);
            this.tableLayoutPanel1.Controls.Add(this.panel3, 0, 1);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 49F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(584, 325);
            this.tableLayoutPanel1.TabIndex = 4;
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lb_title);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(578, 67);
            this.panel1.TabIndex = 2;
            // 
            // lb_title
            // 
            this.lb_title.AutoSize = true;
            this.lb_title.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_title.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(74, 19);
            this.lb_title.Name = "lb_title";
            this.lb_title.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(52, 26);
            this.lb_title.TabIndex = 2;
            this.lb_title.Text = "Title";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSKernelClient.Properties.Resources.config_page;
            this.pictureBox1.InitialImage = null;
            this.pictureBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 19);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(35, 31);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.cmd_cancel);
            this.panel2.Controls.Add(this.cmd_apply);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 279);
            this.panel2.Name = "panel2";
            this.panel2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(578, 43);
            this.panel2.TabIndex = 4;
            // 
            // cmd_cancel
            // 
            this.cmd_cancel.Anchor = (());
            this.cmd_cancel.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(494, 11);
            this.cmd_cancel.Name = "cmd_cancel";
            this.cmd_cancel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_cancel.TabIndex = 1;
            this.cmd_cancel.Text = "Cancel";
            this.cmd_cancel.UseVisualStyleBackColor = true;
            this.cmd_cancel.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_cancel_Click);
            // 
            // cmd_apply
            // 
            this.cmd_apply.Anchor = (());
            this.cmd_apply.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(413, 11);
            this.cmd_apply.Name = "cmd_apply";
            this.cmd_apply.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_apply.TabIndex = 0;
            this.cmd_apply.Text = "Apply";
            this.cmd_apply.UseVisualStyleBackColor = true;
            this.cmd_apply.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_apply_Click);
            // 
            // panel3
            // 
            this.panel3.Controls.Add(this.lb_descrip);
            this.panel3.Controls.Add(this.tx_server);
            this.panel3.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel3.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 76);
            this.panel3.Name = "panel3";
            this.panel3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(578, 197);
            this.panel3.TabIndex = 5;
            // 
            // lb_descrip
            // 
            this.lb_descrip.AutoSize = true;
            this.lb_descrip.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 13);
            this.lb_descrip.Name = "lb_descrip";
            this.lb_descrip.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(55, 13);
            this.lb_descrip.TabIndex = 6;
            this.lb_descrip.Text = "lb_descrip";
            // 
            // tx_server
            // 
            this.tx_server.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 41);
            this.tx_server.Multiline = true;
            this.tx_server.Name = "tx_server";
            this.tx_server.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(536, 134);
            this.tx_server.TabIndex = 5;
            // 
            // fInput
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(584, 325);
            this.Controls.Add(this.tableLayoutPanel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fInput";
            this.Text = "Input";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fInput_Load);
            this.tableLayoutPanel1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.panel2.ResumeLayout(false);
            this.panel3.ResumeLayout(false);
            this.panel3.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let tableLayoutPanel1: System.Windows.Forms.TableLayoutPanel = null;
        let panel1: System.Windows.Forms.Panel = null;
        let lb_title: System.Windows.Forms.Label = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let panel2: System.Windows.Forms.Panel = null;
        let cmd_cancel: System.Windows.Forms.Button = null;
        let cmd_apply: System.Windows.Forms.Button = null;
        let panel3: System.Windows.Forms.Panel = null;
        let lb_descrip: System.Windows.Forms.Label = null;
        let tx_server: System.Windows.Forms.TextBox = null;
        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IfInput {

    Dispose: (bool) => void;
  }
}
