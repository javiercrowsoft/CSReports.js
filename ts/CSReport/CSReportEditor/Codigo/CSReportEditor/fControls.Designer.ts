(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFControls = function() {

        // @ts-ignore
        let self: CSReportEditor.IfControls = {};
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
            let resources: System.ComponentModel.ComponentResourceManager = new System.ComponentModel.ComponentResourceManager(typeof(fControls));
            this.panel2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.cmd_close = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_edit = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.lbTitle = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.pictureBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.tableLayoutPanel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TableLayoutPanel();
            this.lv_controls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ListView();
            this.columnHeader1 = ((new System.Windows.Forms.ColumnHeader()));
            this.columnHeader2 = ((new System.Windows.Forms.ColumnHeader()));
            this.columnHeader3 = ((new System.Windows.Forms.ColumnHeader()));
            this.columnHeader4 = ((new System.Windows.Forms.ColumnHeader()));
            this.imageList = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ImageList(this.components);
            this.panel2.SuspendLayout();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.tableLayoutPanel1.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel2
            // 
            this.panel2.Controls.Add(this.cmd_close);
            this.panel2.Controls.Add(this.cmd_edit);
            this.panel2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 463);
            this.panel2.Name = "panel2";
            this.panel2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(609, 43);
            this.panel2.TabIndex = 4;
            // 
            // cmd_close
            // 
            this.cmd_close.Anchor = (());
            this.cmd_close.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(525, 11);
            this.cmd_close.Name = "cmd_close";
            this.cmd_close.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_close.TabIndex = 1;
            this.cmd_close.Text = "Close";
            this.cmd_close.UseVisualStyleBackColor = true;
            this.cmd_close.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_close_Click);
            // 
            // cmd_edit
            // 
            this.cmd_edit.Anchor = (());
            this.cmd_edit.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(444, 11);
            this.cmd_edit.Name = "cmd_edit";
            this.cmd_edit.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_edit.TabIndex = 0;
            this.cmd_edit.Text = "Edit";
            this.cmd_edit.UseVisualStyleBackColor = true;
            this.cmd_edit.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_edit_Click);
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lbTitle);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(609, 67);
            this.panel1.TabIndex = 2;
            // 
            // lbTitle
            // 
            this.lbTitle.AutoSize = true;
            this.lbTitle.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lbTitle.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(74, 19);
            this.lbTitle.Name = "lbTitle";
            this.lbTitle.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(170, 26);
            this.lbTitle.TabIndex = 2;
            this.lbTitle.Text = "Report definition";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 19);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(35, 31);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // tableLayoutPanel1
            // 
            this.tableLayoutPanel1.AutoSize = true;
            this.tableLayoutPanel1.ColumnCount = 1;
            this.tableLayoutPanel1.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.Controls.Add(this.lv_controls, 0, 1);
            this.tableLayoutPanel1.Controls.Add(this.panel1, 0, 0);
            this.tableLayoutPanel1.Controls.Add(this.panel2, 0, 2);
            this.tableLayoutPanel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tableLayoutPanel1.Name = "tableLayoutPanel1";
            this.tableLayoutPanel1.RowCount = 3;
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 73F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 49F));
            this.tableLayoutPanel1.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 20F));
            this.tableLayoutPanel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(615, 509);
            this.tableLayoutPanel1.TabIndex = 2;
            // 
            // lv_controls
            // 
            this.lv_controls.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2,
            this.columnHeader3,
            this.columnHeader4});
            this.lv_controls.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_controls.FullRowSelect = true;
            this.lv_controls.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 76);
            this.lv_controls.MultiSelect = false;
            this.lv_controls.Name = "lv_controls";
            this.lv_controls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(609, 381);
            this.lv_controls.SmallImageList = this.imageList;
            this.lv_controls.TabIndex = 7;
            this.lv_controls.UseCompatibleStateImageBehavior = false;
            this.lv_controls.View = System.Windows.Forms.View.Details;
            this.lv_controls.ColumnClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.ColumnClickEventHandler(this.lv_controls_ColumnClick);
            this.lv_controls.KeyUp += UNKNOWN >>  can't find constructor for class System.Windows.Forms.KeyEventHandler(this.lv_controls_KeyUp);
            this.lv_controls.MouseClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.MouseEventHandler(this.lv_controls_MouseClick);
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "Name";
            this.columnHeader1.Width = 200;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "Formula Value";
            this.columnHeader2.Width = 85;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "Formula Hide";
            this.columnHeader3.Width = 85;
            // 
            // columnHeader4
            // 
            this.columnHeader4.Text = "DB Field";
            this.columnHeader4.Width = 200;
            // 
            // imageList
            // 
            this.imageList.ImageStream = ((resources.GetObject("imageList.ImageStream")));
            this.imageList.TransparentColor = System.Drawing.Color.Transparent;
            this.imageList.Images.SetKeyName(0, "base002.ico");
            this.imageList.Images.SetKeyName(1, "property.ico");
            // 
            // fControls
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(615, 509);
            this.Controls.Add(this.tableLayoutPanel1);
            this.Name = "fControls";
            this.Text = "fControls";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fControls_Load);
            this.panel2.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.tableLayoutPanel1.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let panel2: System.Windows.Forms.Panel = null;
        let cmd_close: System.Windows.Forms.Button = null;
        let cmd_edit: System.Windows.Forms.Button = null;
        let panel1: System.Windows.Forms.Panel = null;
        let lbTitle: System.Windows.Forms.Label = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let tableLayoutPanel1: System.Windows.Forms.TableLayoutPanel = null;
        let lv_controls: System.Windows.Forms.ListView = null;
        let columnHeader1: System.Windows.Forms.ColumnHeader = null;
        let imageList: System.Windows.Forms.ImageList = null;
        let columnHeader2: System.Windows.Forms.ColumnHeader = null;
        let columnHeader3: System.Windows.Forms.ColumnHeader = null;
        let columnHeader4: System.Windows.Forms.ColumnHeader = null;

        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfControls {

    Dispose: (bool) => void;
  }
}
