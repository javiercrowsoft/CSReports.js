(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFColumns = function() {

        // @ts-ignore
        let self: CSReportEditor.IfColumns = {};
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
            let resources: System.ComponentModel.ComponentResourceManager = new System.ComponentModel.ComponentResourceManager(typeof(fColumns));
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.Label1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.pictureBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.cmd_cancel = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_apply = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.lv_columns = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ListView();
            this.columnHeader1 = ((new System.Windows.Forms.ColumnHeader()));
            this.imageList = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ImageList(this.components);
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.Label1);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(455, 70);
            this.panel1.TabIndex = 1;
            // 
            // Label1
            // 
            this.Label1.AutoSize = true;
            this.Label1.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.Label1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(76, 18);
            this.Label1.Name = "Label1";
            this.Label1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(144, 37);
            this.Label1.TabIndex = 2;
            this.Label1.Text = "Columns";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(24, 18);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(46, 39);
            this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false;
            // 
            // cmd_cancel
            // 
            this.cmd_cancel.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(329, 410);
            this.cmd_cancel.Name = "cmd_cancel";
            this.cmd_cancel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_cancel.TabIndex = 5;
            this.cmd_cancel.Text = "Cancel";
            this.cmd_cancel.UseVisualStyleBackColor = true;
            this.cmd_cancel.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_cancel_Click);
            // 
            // cmd_apply
            // 
            this.cmd_apply.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(248, 410);
            this.cmd_apply.Name = "cmd_apply";
            this.cmd_apply.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_apply.TabIndex = 4;
            this.cmd_apply.Text = "Apply";
            this.cmd_apply.UseVisualStyleBackColor = true;
            this.cmd_apply.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_apply_Click);
            // 
            // lv_columns
            // 
            this.lv_columns.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1});
            this.lv_columns.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(12, 87);
            this.lv_columns.Name = "lv_columns";
            this.lv_columns.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(392, 306);
            this.lv_columns.SmallImageList = this.imageList;
            this.lv_columns.TabIndex = 6;
            this.lv_columns.UseCompatibleStateImageBehavior = false;
            this.lv_columns.View = System.Windows.Forms.View.Details;
            this.lv_columns.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.lv_columns_Click);
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "Name";
            this.columnHeader1.Width = 360;
            // 
            // imageList
            // 
            this.imageList.ImageStream = ((resources.GetObject("imageList.ImageStream")));
            this.imageList.TransparentColor = System.Drawing.Color.Transparent;
            this.imageList.Images.SetKeyName(0, "base002.ico");
            // 
            // fColumns
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(416, 445);
            this.Controls.Add(this.lv_columns);
            this.Controls.Add(this.cmd_cancel);
            this.Controls.Add(this.cmd_apply);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fColumns";
            this.Text = "fColumns";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fColumns_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.ResumeLayout(false);

        };

UNKNOWN >>         #endregion

        let panel1: System.Windows.Forms.Panel = null;
        let Label1: System.Windows.Forms.Label = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let cmd_cancel: System.Windows.Forms.Button = null;
        let cmd_apply: System.Windows.Forms.Button = null;
        let lv_columns: System.Windows.Forms.ListView = null;
        let imageList: System.Windows.Forms.ImageList = null;
        let columnHeader1: System.Windows.Forms.ColumnHeader = null;
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfColumns {

    Dispose: (bool) => void;
  }
}
