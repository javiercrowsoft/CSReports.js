(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFProperties = function() {

        // @ts-ignore
        let self: CSReportEditor.IfProperties = {};
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
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.lb_control = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.pictureBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.tab_main = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabControl();
            this.tbpFormat = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.cmd_font = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_backColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_foreColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label24 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_exportColIdx = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label23 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.chk_isFreeCtrl = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.label22 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.chk_wordWrap = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.chk_canGrow = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.label21 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label20 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_width = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label19 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_height = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label18 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_top = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label17 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_left = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label16 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label15 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label13 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_symbol = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label14 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_format = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.chk_transparent = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.sh_backColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label11 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_backColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.chk_fontStrike = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.chk_fontItalic = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.sh_foreColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label9 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_foreColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.chk_fontUnderline = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.chk_fontBold = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.label8 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_align = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.label7 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_fontSize = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label6 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_font = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label5 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_tag = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_text = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_name = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.tbpFormulas = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.groupBox3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.label41 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.op_afterPrint = UNKNOWN >>  can't find constructor for class System.Windows.Forms.RadioButton();
            this.op_beforePrint = UNKNOWN >>  can't find constructor for class System.Windows.Forms.RadioButton();
            this.label40 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label39 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_idxGroup = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label37 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label38 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label35 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label36 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label33 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label34 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label31 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label32 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label30 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label29 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label28 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.groupBox2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.lb_formulaValue = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.chk_formulaValue = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.cmd_formulaValue = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.groupBox1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.lb_formulaHide = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label25 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.chk_formulaHide = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.cmd_formulaHide = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.tbpDatabase = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.cmd_dbField = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label42 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_dbField = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.tbpImage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.panel2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.pic_image = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.cmd_imageFile = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label43 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_imageFile = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.tbpBorders = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.cmd_borderShadowColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_borderColor3d = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_borderColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.chk_borderRounded = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.label51 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_borderWidth = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.sh_borderShadow = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label50 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_borderShadow = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.sh_border3D = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label45 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_border3D = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.sh_borderColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.label47 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_borderColor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label48 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_borderType = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.tbpChart = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.groupBox5 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.label63 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_colorSerie2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.cmd_dbFieldLbl2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label64 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_dbFieldLbl2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.cmd_dbFieldVal2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label65 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_dbFieldVal2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.groupBox4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.GroupBox();
            this.label62 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_colorSerie1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.cmd_dbFieldLbl1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label61 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_dbFieldLbl1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.cmd_dbFieldVal1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label60 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_dbFieldVal1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label58 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_chartGroupValue = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.cmd_dbFieldGroupValue = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.label57 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_dbFieldGroupValue = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.chk_sort = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.chk_showOutlines = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.chk_showBarValues = UNKNOWN >>  can't find constructor for class System.Windows.Forms.CheckBox();
            this.label59 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.tx_chartTop = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TextBox();
            this.label56 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_chartThickness = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.label54 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_chartSize = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.label55 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_linesType = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.label53 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_formatType = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.label52 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Label();
            this.cb_type = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ComboBox();
            this.cmd_apply = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.cmd_cancel = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Button();
            this.colorDialog = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ColorDialog();
            this.fontDialog = UNKNOWN >>  can't find constructor for class System.Windows.Forms.FontDialog();
            this.panel1.SuspendLayout();
            ().BeginInit();
            this.tab_main.SuspendLayout();
            this.tbpFormat.SuspendLayout();
            this.tbpFormulas.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.tbpDatabase.SuspendLayout();
            this.tbpImage.SuspendLayout();
            this.panel2.SuspendLayout();
            ().BeginInit();
            this.tbpBorders.SuspendLayout();
            this.tbpChart.SuspendLayout();
            this.groupBox5.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lb_control);
            this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(455, 70);
            this.panel1.TabIndex = 0;
            // 
            // lb_control
            // 
            this.lb_control.AutoSize = true;
            this.lb_control.Font = UNKNOWN >>  can't find constructor for class System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ());
            this.lb_control.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(76, 18);
            this.lb_control.Name = "lb_control";
            this.lb_control.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(232, 37);
            this.lb_control.TabIndex = 2;
            this.lb_control.Text = "lbControlName";
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
            // tab_main
            // 
            this.tab_main.Controls.Add(this.tbpFormat);
            this.tab_main.Controls.Add(this.tbpFormulas);
            this.tab_main.Controls.Add(this.tbpDatabase);
            this.tab_main.Controls.Add(this.tbpImage);
            this.tab_main.Controls.Add(this.tbpBorders);
            this.tab_main.Controls.Add(this.tbpChart);
            this.tab_main.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(-3, 75);
            this.tab_main.Name = "tab_main";
            this.tab_main.SelectedIndex = 0;
            this.tab_main.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(455, 509);
            this.tab_main.TabIndex = 1;
            // 
            // tbpFormat
            // 
            this.tbpFormat.Controls.Add(this.cmd_font);
            this.tbpFormat.Controls.Add(this.cmd_backColor);
            this.tbpFormat.Controls.Add(this.cmd_foreColor);
            this.tbpFormat.Controls.Add(this.label24);
            this.tbpFormat.Controls.Add(this.tx_exportColIdx);
            this.tbpFormat.Controls.Add(this.label23);
            this.tbpFormat.Controls.Add(this.chk_isFreeCtrl);
            this.tbpFormat.Controls.Add(this.label22);
            this.tbpFormat.Controls.Add(this.chk_wordWrap);
            this.tbpFormat.Controls.Add(this.chk_canGrow);
            this.tbpFormat.Controls.Add(this.label21);
            this.tbpFormat.Controls.Add(this.label20);
            this.tbpFormat.Controls.Add(this.tx_width);
            this.tbpFormat.Controls.Add(this.label19);
            this.tbpFormat.Controls.Add(this.tx_height);
            this.tbpFormat.Controls.Add(this.label18);
            this.tbpFormat.Controls.Add(this.tx_top);
            this.tbpFormat.Controls.Add(this.label17);
            this.tbpFormat.Controls.Add(this.tx_left);
            this.tbpFormat.Controls.Add(this.label16);
            this.tbpFormat.Controls.Add(this.label15);
            this.tbpFormat.Controls.Add(this.label13);
            this.tbpFormat.Controls.Add(this.tx_symbol);
            this.tbpFormat.Controls.Add(this.label14);
            this.tbpFormat.Controls.Add(this.tx_format);
            this.tbpFormat.Controls.Add(this.chk_transparent);
            this.tbpFormat.Controls.Add(this.sh_backColor);
            this.tbpFormat.Controls.Add(this.label11);
            this.tbpFormat.Controls.Add(this.tx_backColor);
            this.tbpFormat.Controls.Add(this.chk_fontStrike);
            this.tbpFormat.Controls.Add(this.chk_fontItalic);
            this.tbpFormat.Controls.Add(this.sh_foreColor);
            this.tbpFormat.Controls.Add(this.label9);
            this.tbpFormat.Controls.Add(this.tx_foreColor);
            this.tbpFormat.Controls.Add(this.chk_fontUnderline);
            this.tbpFormat.Controls.Add(this.chk_fontBold);
            this.tbpFormat.Controls.Add(this.label8);
            this.tbpFormat.Controls.Add(this.cb_align);
            this.tbpFormat.Controls.Add(this.label7);
            this.tbpFormat.Controls.Add(this.tx_fontSize);
            this.tbpFormat.Controls.Add(this.label6);
            this.tbpFormat.Controls.Add(this.tx_font);
            this.tbpFormat.Controls.Add(this.label5);
            this.tbpFormat.Controls.Add(this.tx_tag);
            this.tbpFormat.Controls.Add(this.label4);
            this.tbpFormat.Controls.Add(this.tx_text);
            this.tbpFormat.Controls.Add(this.label3);
            this.tbpFormat.Controls.Add(this.label2);
            this.tbpFormat.Controls.Add(this.tx_name);
            this.tbpFormat.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpFormat.Name = "tbpFormat";
            this.tbpFormat.Padding = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(3);
            this.tbpFormat.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(447, 483);
            this.tbpFormat.TabIndex = 0;
            this.tbpFormat.Text = "Format";
            this.tbpFormat.UseVisualStyleBackColor = true;
            // 
            // cmd_font
            // 
            this.cmd_font.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(275, 120);
            this.cmd_font.Name = "cmd_font";
            this.cmd_font.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(27, 23);
            this.cmd_font.TabIndex = 49;
            this.cmd_font.Text = "...";
            this.cmd_font.UseVisualStyleBackColor = true;
            this.cmd_font.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_font_Click);
            // 
            // cmd_backColor
            // 
            this.cmd_backColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(180, 197);
            this.cmd_backColor.Name = "cmd_backColor";
            this.cmd_backColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(27, 23);
            this.cmd_backColor.TabIndex = 48;
            this.cmd_backColor.Text = "...";
            this.cmd_backColor.UseVisualStyleBackColor = true;
            this.cmd_backColor.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_backColor_Click);
            // 
            // cmd_foreColor
            // 
            this.cmd_foreColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(180, 172);
            this.cmd_foreColor.Name = "cmd_foreColor";
            this.cmd_foreColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(27, 23);
            this.cmd_foreColor.TabIndex = 47;
            this.cmd_foreColor.Text = "...";
            this.cmd_foreColor.UseVisualStyleBackColor = true;
            this.cmd_foreColor.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_foreColor_Click);
            // 
            // label24
            // 
            this.label24.AutoSize = true;
            this.label24.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 447);
            this.label24.Name = "label24";
            this.label24.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(157, 13);
            this.label24.TabIndex = 46;
            this.label24.Text = "Column export ID for this control";
            // 
            // tx_exportColIdx
            // 
            this.tx_exportColIdx.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(180, 444);
            this.tx_exportColIdx.Name = "tx_exportColIdx";
            this.tx_exportColIdx.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_exportColIdx.TabIndex = 45;
            this.tx_exportColIdx.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_exportColIdx_TextChanged);
            // 
            // label23
            // 
            this.label23.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((())));
            this.label23.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 429);
            this.label23.Name = "label23";
            this.label23.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(449, 1);
            this.label23.TabIndex = 44;
            // 
            // chk_isFreeCtrl
            // 
            this.chk_isFreeCtrl.AutoSize = true;
            this.chk_isFreeCtrl.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_isFreeCtrl.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(20, 399);
            this.chk_isFreeCtrl.Name = "chk_isFreeCtrl";
            this.chk_isFreeCtrl.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(402, 17);
            this.chk_isFreeCtrl.TabIndex = 43;
            this.chk_isFreeCtrl.Text = "The control is in the back of the page ( the limit of the section doesn\'t apply t" +
                "o it)";
            this.chk_isFreeCtrl.UseVisualStyleBackColor = true;
            this.chk_isFreeCtrl.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_isFreeCtrl_CheckedChanged);
            // 
            // label22
            // 
            this.label22.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((())));
            this.label22.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 382);
            this.label22.Name = "label22";
            this.label22.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(449, 1);
            this.label22.TabIndex = 42;
            // 
            // chk_wordWrap
            // 
            this.chk_wordWrap.AutoSize = true;
            this.chk_wordWrap.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_wordWrap.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(287, 352);
            this.chk_wordWrap.Name = "chk_wordWrap";
            this.chk_wordWrap.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(72, 17);
            this.chk_wordWrap.TabIndex = 41;
            this.chk_wordWrap.Text = "Wrap text";
            this.chk_wordWrap.UseVisualStyleBackColor = true;
            this.chk_wordWrap.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_wordWrap_CheckedChanged);
            // 
            // chk_canGrow
            // 
            this.chk_canGrow.AutoSize = true;
            this.chk_canGrow.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_canGrow.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(32, 352);
            this.chk_canGrow.Name = "chk_canGrow";
            this.chk_canGrow.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(127, 17);
            this.chk_canGrow.TabIndex = 40;
            this.chk_canGrow.Text = "The control can grow";
            this.chk_canGrow.UseVisualStyleBackColor = true;
            this.chk_canGrow.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_canGrow_CheckedChanged);
            // 
            // label21
            // 
            this.label21.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((())));
            this.label21.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 336);
            this.label21.Name = "label21";
            this.label21.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(449, 1);
            this.label21.TabIndex = 39;
            // 
            // label20
            // 
            this.label20.AutoSize = true;
            this.label20.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(245, 306);
            this.label20.Name = "label20";
            this.label20.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(35, 13);
            this.label20.TabIndex = 38;
            this.label20.Text = "Width";
            // 
            // tx_width
            // 
            this.tx_width.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(287, 303);
            this.tx_width.Name = "tx_width";
            this.tx_width.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_width.TabIndex = 37;
            this.tx_width.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_width_TextChanged);
            // 
            // label19
            // 
            this.label19.AutoSize = true;
            this.label19.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(94, 306);
            this.label19.Name = "label19";
            this.label19.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(38, 13);
            this.label19.TabIndex = 36;
            this.label19.Text = "Height";
            // 
            // tx_height
            // 
            this.tx_height.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(137, 303);
            this.tx_height.Name = "tx_height";
            this.tx_height.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_height.TabIndex = 35;
            this.tx_height.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_height_TextChanged);
            // 
            // label18
            // 
            this.label18.AutoSize = true;
            this.label18.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(245, 280);
            this.label18.Name = "label18";
            this.label18.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(26, 13);
            this.label18.TabIndex = 34;
            this.label18.Text = "Top";
            // 
            // tx_top
            // 
            this.tx_top.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(287, 277);
            this.tx_top.Name = "tx_top";
            this.tx_top.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_top.TabIndex = 33;
            this.tx_top.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_top_TextChanged);
            // 
            // label17
            // 
            this.label17.AutoSize = true;
            this.label17.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(94, 280);
            this.label17.Name = "label17";
            this.label17.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(25, 13);
            this.label17.TabIndex = 32;
            this.label17.Text = "Left";
            // 
            // tx_left
            // 
            this.tx_left.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(137, 277);
            this.tx_left.Name = "tx_left";
            this.tx_left.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_left.TabIndex = 31;
            this.tx_left.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_left_TextChanged);
            // 
            // label16
            // 
            this.label16.AutoSize = true;
            this.label16.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 277);
            this.label16.Name = "label16";
            this.label16.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(44, 13);
            this.label16.TabIndex = 30;
            this.label16.Text = "Position";
            // 
            // label15
            // 
            this.label15.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((())));
            this.label15.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 262);
            this.label15.Name = "label15";
            this.label15.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(449, 1);
            this.label15.TabIndex = 29;
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(299, 228);
            this.label13.Name = "label13";
            this.label13.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(41, 13);
            this.label13.TabIndex = 28;
            this.label13.Text = "Symbol";
            // 
            // tx_symbol
            // 
            this.tx_symbol.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(341, 225);
            this.tx_symbol.Name = "tx_symbol";
            this.tx_symbol.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_symbol.TabIndex = 27;
            this.tx_symbol.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_symbol_TextChanged);
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 228);
            this.label14.Name = "label14";
            this.label14.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(39, 13);
            this.label14.TabIndex = 26;
            this.label14.Text = "Format";
            // 
            // tx_format
            // 
            this.tx_format.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 225);
            this.tx_format.Name = "tx_format";
            this.tx_format.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(216, 20);
            this.tx_format.TabIndex = 25;
            this.tx_format.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_format_TextChanged);
            // 
            // chk_transparent
            // 
            this.chk_transparent.AutoSize = true;
            this.chk_transparent.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_transparent.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(246, 202);
            this.chk_transparent.Name = "chk_transparent";
            this.chk_transparent.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(83, 17);
            this.chk_transparent.TabIndex = 24;
            this.chk_transparent.Text = "Transparent";
            this.chk_transparent.UseVisualStyleBackColor = true;
            // 
            // sh_backColor
            // 
            this.sh_backColor.BackColor = System.Drawing.Color.White;
            this.sh_backColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_backColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(213, 201);
            this.sh_backColor.Name = "sh_backColor";
            this.sh_backColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(20, 17);
            this.sh_backColor.TabIndex = 23;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 202);
            this.label11.Name = "label11";
            this.label11.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(58, 13);
            this.label11.TabIndex = 22;
            this.label11.Text = "Back color";
            // 
            // tx_backColor
            // 
            this.tx_backColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 199);
            this.tx_backColor.Name = "tx_backColor";
            this.tx_backColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(97, 20);
            this.tx_backColor.TabIndex = 21;
            this.tx_backColor.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_backColor_TextChanged);
            // 
            // chk_fontStrike
            // 
            this.chk_fontStrike.AutoSize = true;
            this.chk_fontStrike.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontStrike.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(359, 175);
            this.chk_fontStrike.Name = "chk_fontStrike";
            this.chk_fontStrike.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(53, 17);
            this.chk_fontStrike.TabIndex = 20;
            this.chk_fontStrike.Text = "Strike";
            this.chk_fontStrike.UseVisualStyleBackColor = true;
            this.chk_fontStrike.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_fontStrike_CheckedChanged);
            // 
            // chk_fontItalic
            // 
            this.chk_fontItalic.AutoSize = true;
            this.chk_fontItalic.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontItalic.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(245, 176);
            this.chk_fontItalic.Name = "chk_fontItalic";
            this.chk_fontItalic.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(48, 17);
            this.chk_fontItalic.TabIndex = 19;
            this.chk_fontItalic.Text = "Italic";
            this.chk_fontItalic.UseVisualStyleBackColor = true;
            this.chk_fontItalic.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_fontItalic_CheckedChanged);
            // 
            // sh_foreColor
            // 
            this.sh_foreColor.BackColor = System.Drawing.Color.Black;
            this.sh_foreColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_foreColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(213, 176);
            this.sh_foreColor.Name = "sh_foreColor";
            this.sh_foreColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(20, 17);
            this.sh_foreColor.TabIndex = 18;
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 176);
            this.label9.Name = "label9";
            this.label9.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(54, 13);
            this.label9.TabIndex = 17;
            this.label9.Text = "Text color";
            // 
            // tx_foreColor
            // 
            this.tx_foreColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 173);
            this.tx_foreColor.Name = "tx_foreColor";
            this.tx_foreColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(97, 20);
            this.tx_foreColor.TabIndex = 16;
            this.tx_foreColor.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_foreColor_TextChanged);
            // 
            // chk_fontUnderline
            // 
            this.chk_fontUnderline.AutoSize = true;
            this.chk_fontUnderline.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontUnderline.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(341, 150);
            this.chk_fontUnderline.Name = "chk_fontUnderline";
            this.chk_fontUnderline.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 17);
            this.chk_fontUnderline.TabIndex = 15;
            this.chk_fontUnderline.Text = "Underline";
            this.chk_fontUnderline.UseVisualStyleBackColor = true;
            this.chk_fontUnderline.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_fontUnderline_CheckedChanged);
            // 
            // chk_fontBold
            // 
            this.chk_fontBold.AutoSize = true;
            this.chk_fontBold.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontBold.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(246, 150);
            this.chk_fontBold.Name = "chk_fontBold";
            this.chk_fontBold.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(47, 17);
            this.chk_fontBold.TabIndex = 14;
            this.chk_fontBold.Text = "Bold";
            this.chk_fontBold.UseVisualStyleBackColor = true;
            this.chk_fontBold.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_fontBold_CheckedChanged);
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 149);
            this.label8.Name = "label8";
            this.label8.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(30, 13);
            this.label8.TabIndex = 13;
            this.label8.Text = "Align";
            // 
            // cb_align
            // 
            this.cb_align.FormattingEnabled = true;
            this.cb_align.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 146);
            this.cb_align.Name = "cb_align";
            this.cb_align.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_align.TabIndex = 12;
            this.cb_align.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_align_SelectedIndexChanged);
            this.cb_align.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_align_Click);
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(308, 123);
            this.label7.Name = "label7";
            this.label7.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(27, 13);
            this.label7.TabIndex = 10;
            this.label7.Text = "Size";
            // 
            // tx_fontSize
            // 
            this.tx_fontSize.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(341, 120);
            this.tx_fontSize.Name = "tx_fontSize";
            this.tx_fontSize.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_fontSize.TabIndex = 9;
            this.tx_fontSize.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_fontSize_TextChanged);
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 123);
            this.label6.Name = "label6";
            this.label6.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(28, 13);
            this.label6.TabIndex = 8;
            this.label6.Text = "Font";
            // 
            // tx_font
            // 
            this.tx_font.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 120);
            this.tx_font.Name = "tx_font";
            this.tx_font.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(194, 20);
            this.tx_font.TabIndex = 7;
            this.tx_font.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_font_TextChanged);
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 97);
            this.label5.Name = "label5";
            this.label5.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(26, 13);
            this.label5.TabIndex = 6;
            this.label5.Text = "Tag";
            // 
            // tx_tag
            // 
            this.tx_tag.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 94);
            this.tx_tag.Name = "tx_tag";
            this.tx_tag.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(335, 20);
            this.tx_tag.TabIndex = 5;
            this.tx_tag.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_tag_TextChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 71);
            this.label4.Name = "label4";
            this.label4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(28, 13);
            this.label4.TabIndex = 4;
            this.label4.Text = "Text";
            // 
            // tx_text
            // 
            this.tx_text.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 68);
            this.tx_text.Name = "tx_text";
            this.tx_text.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(335, 20);
            this.tx_text.TabIndex = 3;
            this.tx_text.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_text_TextChanged);
            // 
            // label3
            // 
            this.label3.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((())));
            this.label3.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 49);
            this.label3.Name = "label3";
            this.label3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(449, 1);
            this.label3.TabIndex = 2;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 17);
            this.label2.Name = "label2";
            this.label2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(35, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "Name";
            // 
            // tx_name
            // 
            this.tx_name.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 14);
            this.tx_name.Name = "tx_name";
            this.tx_name.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(335, 20);
            this.tx_name.TabIndex = 0;
            this.tx_name.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_name_TextChanged);
            // 
            // tbpFormulas
            // 
            this.tbpFormulas.Controls.Add(this.groupBox3);
            this.tbpFormulas.Controls.Add(this.label40);
            this.tbpFormulas.Controls.Add(this.label39);
            this.tbpFormulas.Controls.Add(this.tx_idxGroup);
            this.tbpFormulas.Controls.Add(this.label37);
            this.tbpFormulas.Controls.Add(this.label38);
            this.tbpFormulas.Controls.Add(this.label35);
            this.tbpFormulas.Controls.Add(this.label36);
            this.tbpFormulas.Controls.Add(this.label33);
            this.tbpFormulas.Controls.Add(this.label34);
            this.tbpFormulas.Controls.Add(this.label31);
            this.tbpFormulas.Controls.Add(this.label32);
            this.tbpFormulas.Controls.Add(this.label30);
            this.tbpFormulas.Controls.Add(this.label29);
            this.tbpFormulas.Controls.Add(this.label28);
            this.tbpFormulas.Controls.Add(this.groupBox2);
            this.tbpFormulas.Controls.Add(this.chk_formulaValue);
            this.tbpFormulas.Controls.Add(this.cmd_formulaValue);
            this.tbpFormulas.Controls.Add(this.groupBox1);
            this.tbpFormulas.Controls.Add(this.label25);
            this.tbpFormulas.Controls.Add(this.chk_formulaHide);
            this.tbpFormulas.Controls.Add(this.cmd_formulaHide);
            this.tbpFormulas.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpFormulas.Name = "tbpFormulas";
            this.tbpFormulas.Padding = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(3);
            this.tbpFormulas.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(447, 483);
            this.tbpFormulas.TabIndex = 1;
            this.tbpFormulas.Text = "Formulas";
            this.tbpFormulas.UseVisualStyleBackColor = true;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.label41);
            this.groupBox3.Controls.Add(this.op_afterPrint);
            this.groupBox3.Controls.Add(this.op_beforePrint);
            this.groupBox3.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(11, 338);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(423, 43);
            this.groupBox3.TabIndex = 48;
            this.groupBox3.TabStop = false;
            // 
            // label41
            // 
            this.label41.AutoSize = true;
            this.label41.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(11, 17);
            this.label41.Name = "label41";
            this.label41.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(46, 13);
            this.label41.TabIndex = 49;
            this.label41.Text = "Execute";
            // 
            // op_afterPrint
            // 
            this.op_afterPrint.AutoSize = true;
            this.op_afterPrint.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(132, 15);
            this.op_afterPrint.Name = "op_afterPrint";
            this.op_afterPrint.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(120, 17);
            this.op_afterPrint.TabIndex = 1;
            this.op_afterPrint.TabStop = true;
            this.op_afterPrint.Text = "after printing the line";
            this.op_afterPrint.UseVisualStyleBackColor = true;
            // 
            // op_beforePrint
            // 
            this.op_beforePrint.AutoSize = true;
            this.op_beforePrint.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(59, 15);
            this.op_beforePrint.Name = "op_beforePrint";
            this.op_beforePrint.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(67, 17);
            this.op_beforePrint.TabIndex = 0;
            this.op_beforePrint.TabStop = true;
            this.op_beforePrint.Text = "before or";
            this.op_beforePrint.UseVisualStyleBackColor = true;
            // 
            // label40
            // 
            this.label40.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((())));
            this.label40.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(2, 153);
            this.label40.Name = "label40";
            this.label40.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(449, 1);
            this.label40.TabIndex = 47;
            // 
            // label39
            // 
            this.label39.AutoSize = true;
            this.label39.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 320);
            this.label39.Name = "label39";
            this.label39.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(132, 13);
            this.label39.TabIndex = 46;
            this.label39.Text = "Execute only on this group";
            // 
            // tx_idxGroup
            // 
            this.tx_idxGroup.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(156, 317);
            this.tx_idxGroup.Name = "tx_idxGroup";
            this.tx_idxGroup.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(45, 20);
            this.tx_idxGroup.TabIndex = 45;
            // 
            // label37
            // 
            this.label37.ForeColor = System.Drawing.Color.Red;
            this.label37.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(69, 299);
            this.label37.Name = "label37";
            this.label37.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(344, 32);
            this.label37.TabIndex = 44;
            this.label37.Text = "for a formula which is located in footer setcions";
            // 
            // label38
            // 
            this.label38.ForeColor = System.Drawing.Color.Red;
            this.label38.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 299);
            this.label38.Name = "label38";
            this.label38.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(59, 19);
            this.label38.TabIndex = 43;
            this.label38.Text = "-2001";
            // 
            // label35
            // 
            this.label35.ForeColor = System.Drawing.Color.Red;
            this.label35.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(69, 281);
            this.label35.Name = "label35";
            this.label35.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(344, 32);
            this.label35.TabIndex = 42;
            this.label35.Text = "for every fromula which is located in the detail section";
            // 
            // label36
            // 
            this.label36.ForeColor = System.Drawing.Color.Red;
            this.label36.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 281);
            this.label36.Name = "label36";
            this.label36.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(59, 19);
            this.label36.TabIndex = 41;
            this.label36.Text = "0";
            // 
            // label33
            // 
            this.label33.ForeColor = System.Drawing.Color.Red;
            this.label33.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(69, 263);
            this.label33.Name = "label33";
            this.label33.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(344, 32);
            this.label33.TabIndex = 40;
            this.label33.Text = "for a formula which is located in group footers";
            // 
            // label34
            // 
            this.label34.ForeColor = System.Drawing.Color.Red;
            this.label34.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 263);
            this.label34.Name = "label34";
            this.label34.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(59, 19);
            this.label34.TabIndex = 39;
            this.label34.Text = "-index";
            // 
            // label31
            // 
            this.label31.ForeColor = System.Drawing.Color.Red;
            this.label31.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(69, 245);
            this.label31.Name = "label31";
            this.label31.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(344, 32);
            this.label31.TabIndex = 38;
            this.label31.Text = "for a formula which is located in group headers";
            // 
            // label32
            // 
            this.label32.ForeColor = System.Drawing.Color.Red;
            this.label32.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 245);
            this.label32.Name = "label32";
            this.label32.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(59, 19);
            this.label32.TabIndex = 37;
            this.label32.Text = "+index";
            // 
            // label30
            // 
            this.label30.ForeColor = System.Drawing.Color.Red;
            this.label30.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(69, 216);
            this.label30.Name = "label30";
            this.label30.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(344, 32);
            this.label30.TabIndex = 36;
            this.label30.Text = "for a formula which is located in header sections and must be evaluated\r\nbefore p" +
                "rinting the first line of the detail section";
            // 
            // label29
            // 
            this.label29.ForeColor = System.Drawing.Color.Red;
            this.label29.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 216);
            this.label29.Name = "label29";
            this.label29.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(59, 19);
            this.label29.TabIndex = 34;
            this.label29.Text = "-2000";
            // 
            // label28
            // 
            this.label28.ForeColor = System.Drawing.Color.Red;
            this.label28.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(22, 198);
            this.label28.Name = "label28";
            this.label28.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(391, 17);
            this.label28.TabIndex = 35;
            this.label28.Text = "The value of the field \"Execute only on this group\" must follow this rules:";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.lb_formulaValue);
            this.groupBox2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(11, 387);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(423, 87);
            this.groupBox2.TabIndex = 33;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Value formula";
            // 
            // lb_formulaValue
            // 
            this.lb_formulaValue.ForeColor = System.Drawing.SystemColors.ControlText;
            this.lb_formulaValue.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(16, 25);
            this.lb_formulaValue.Name = "lb_formulaValue";
            this.lb_formulaValue.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(391, 58);
            this.lb_formulaValue.TabIndex = 17;
            this.lb_formulaValue.Text = "label27";
            // 
            // chk_formulaValue
            // 
            this.chk_formulaValue.AutoSize = true;
            this.chk_formulaValue.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(132, 172);
            this.chk_formulaValue.Name = "chk_formulaValue";
            this.chk_formulaValue.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(238, 17);
            this.chk_formulaValue.TabIndex = 31;
            this.chk_formulaValue.Text = "Use a formula to calculate the control\'s value";
            this.chk_formulaValue.UseVisualStyleBackColor = true;
            // 
            // cmd_formulaValue
            // 
            this.cmd_formulaValue.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(20, 166);
            this.cmd_formulaValue.Name = "cmd_formulaValue";
            this.cmd_formulaValue.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_formulaValue.TabIndex = 30;
            this.cmd_formulaValue.Text = "Edit";
            this.cmd_formulaValue.UseVisualStyleBackColor = true;
            this.cmd_formulaValue.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_formulaValue_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.lb_formulaHide);
            this.groupBox1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(11, 64);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(423, 77);
            this.groupBox1.TabIndex = 18;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Visibility formula";
            // 
            // lb_formulaHide
            // 
            this.lb_formulaHide.ForeColor = System.Drawing.SystemColors.ControlText;
            this.lb_formulaHide.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(16, 25);
            this.lb_formulaHide.Name = "lb_formulaHide";
            this.lb_formulaHide.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(391, 48);
            this.lb_formulaHide.TabIndex = 17;
            this.lb_formulaHide.Text = "label26";
            // 
            // label25
            // 
            this.label25.AutoSize = true;
            this.label25.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 41);
            this.label25.Name = "label25";
            this.label25.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(341, 13);
            this.label25.TabIndex = 16;
            this.label25.Text = "The formula must return a non zero value to set the control to be visible";
            // 
            // chk_formulaHide
            // 
            this.chk_formulaHide.AutoSize = true;
            this.chk_formulaHide.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(132, 17);
            this.chk_formulaHide.Name = "chk_formulaHide";
            this.chk_formulaHide.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(265, 17);
            this.chk_formulaHide.TabIndex = 15;
            this.chk_formulaHide.Text = "The control has a formula to determine if it is visible";
            this.chk_formulaHide.UseVisualStyleBackColor = true;
            // 
            // cmd_formulaHide
            // 
            this.cmd_formulaHide.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(20, 11);
            this.cmd_formulaHide.Name = "cmd_formulaHide";
            this.cmd_formulaHide.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_formulaHide.TabIndex = 0;
            this.cmd_formulaHide.Text = "Edit";
            this.cmd_formulaHide.UseVisualStyleBackColor = true;
            this.cmd_formulaHide.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_formulaHide_Click);
            // 
            // tbpDatabase
            // 
            this.tbpDatabase.Controls.Add(this.cmd_dbField);
            this.tbpDatabase.Controls.Add(this.label42);
            this.tbpDatabase.Controls.Add(this.tx_dbField);
            this.tbpDatabase.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpDatabase.Name = "tbpDatabase";
            this.tbpDatabase.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(447, 483);
            this.tbpDatabase.TabIndex = 2;
            this.tbpDatabase.Text = "Database";
            this.tbpDatabase.UseVisualStyleBackColor = true;
            // 
            // cmd_dbField
            // 
            this.cmd_dbField.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(359, 14);
            this.cmd_dbField.Name = "cmd_dbField";
            this.cmd_dbField.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(34, 23);
            this.cmd_dbField.TabIndex = 4;
            this.cmd_dbField.Text = "...";
            this.cmd_dbField.UseVisualStyleBackColor = true;
            this.cmd_dbField.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_dbField_Click);
            // 
            // label42
            // 
            this.label42.AutoSize = true;
            this.label42.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 17);
            this.label42.Name = "label42";
            this.label42.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(29, 13);
            this.label42.TabIndex = 3;
            this.label42.Text = "Field";
            // 
            // tx_dbField
            // 
            this.tx_dbField.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 14);
            this.tx_dbField.Name = "tx_dbField";
            this.tx_dbField.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(276, 20);
            this.tx_dbField.TabIndex = 2;
            // 
            // tbpImage
            // 
            this.tbpImage.Controls.Add(this.panel2);
            this.tbpImage.Controls.Add(this.cmd_imageFile);
            this.tbpImage.Controls.Add(this.label43);
            this.tbpImage.Controls.Add(this.tx_imageFile);
            this.tbpImage.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpImage.Name = "tbpImage";
            this.tbpImage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(447, 483);
            this.tbpImage.TabIndex = 3;
            this.tbpImage.Text = "Image";
            this.tbpImage.UseVisualStyleBackColor = true;
            // 
            // panel2
            // 
            this.panel2.AutoScroll = true;
            this.panel2.Controls.Add(this.pic_image);
            this.panel2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(11, 52);
            this.panel2.Name = "panel2";
            this.panel2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(423, 416);
            this.panel2.TabIndex = 9;
            // 
            // pic_image
            // 
            this.pic_image.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.pic_image.Name = "pic_image";
            this.pic_image.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(100, 50);
            this.pic_image.SizeMode = System.Windows.Forms.PictureBoxSizeMode.AutoSize;
            this.pic_image.TabIndex = 8;
            this.pic_image.TabStop = false;
            // 
            // cmd_imageFile
            // 
            this.cmd_imageFile.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(359, 14);
            this.cmd_imageFile.Name = "cmd_imageFile";
            this.cmd_imageFile.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(34, 23);
            this.cmd_imageFile.TabIndex = 7;
            this.cmd_imageFile.Text = "...";
            this.cmd_imageFile.UseVisualStyleBackColor = true;
            // 
            // label43
            // 
            this.label43.AutoSize = true;
            this.label43.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 17);
            this.label43.Name = "label43";
            this.label43.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(52, 13);
            this.label43.TabIndex = 6;
            this.label43.Text = "Image file";
            // 
            // tx_imageFile
            // 
            this.tx_imageFile.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 14);
            this.tx_imageFile.Name = "tx_imageFile";
            this.tx_imageFile.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(276, 20);
            this.tx_imageFile.TabIndex = 5;
            // 
            // tbpBorders
            // 
            this.tbpBorders.Controls.Add(this.cmd_borderShadowColor);
            this.tbpBorders.Controls.Add(this.cmd_borderColor3d);
            this.tbpBorders.Controls.Add(this.cmd_borderColor);
            this.tbpBorders.Controls.Add(this.chk_borderRounded);
            this.tbpBorders.Controls.Add(this.label51);
            this.tbpBorders.Controls.Add(this.tx_borderWidth);
            this.tbpBorders.Controls.Add(this.sh_borderShadow);
            this.tbpBorders.Controls.Add(this.label50);
            this.tbpBorders.Controls.Add(this.tx_borderShadow);
            this.tbpBorders.Controls.Add(this.sh_border3D);
            this.tbpBorders.Controls.Add(this.label45);
            this.tbpBorders.Controls.Add(this.tx_border3D);
            this.tbpBorders.Controls.Add(this.sh_borderColor);
            this.tbpBorders.Controls.Add(this.label47);
            this.tbpBorders.Controls.Add(this.tx_borderColor);
            this.tbpBorders.Controls.Add(this.label48);
            this.tbpBorders.Controls.Add(this.cb_borderType);
            this.tbpBorders.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpBorders.Name = "tbpBorders";
            this.tbpBorders.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(447, 483);
            this.tbpBorders.TabIndex = 4;
            this.tbpBorders.Text = "Borders";
            this.tbpBorders.UseVisualStyleBackColor = true;
            // 
            // cmd_borderShadowColor
            // 
            this.cmd_borderShadowColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(256, 92);
            this.cmd_borderShadowColor.Name = "cmd_borderShadowColor";
            this.cmd_borderShadowColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(27, 23);
            this.cmd_borderShadowColor.TabIndex = 44;
            this.cmd_borderShadowColor.Text = "...";
            this.cmd_borderShadowColor.UseVisualStyleBackColor = true;
            this.cmd_borderShadowColor.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_borderShadowColor_Click);
            // 
            // cmd_borderColor3d
            // 
            this.cmd_borderColor3d.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(256, 66);
            this.cmd_borderColor3d.Name = "cmd_borderColor3d";
            this.cmd_borderColor3d.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(27, 23);
            this.cmd_borderColor3d.TabIndex = 43;
            this.cmd_borderColor3d.Text = "...";
            this.cmd_borderColor3d.UseVisualStyleBackColor = true;
            this.cmd_borderColor3d.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_borderColor3d_Click);
            // 
            // cmd_borderColor
            // 
            this.cmd_borderColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(256, 41);
            this.cmd_borderColor.Name = "cmd_borderColor";
            this.cmd_borderColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(27, 23);
            this.cmd_borderColor.TabIndex = 42;
            this.cmd_borderColor.Text = "...";
            this.cmd_borderColor.UseVisualStyleBackColor = true;
            this.cmd_borderColor.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_borderColor_Click_1);
            // 
            // chk_borderRounded
            // 
            this.chk_borderRounded.AutoSize = true;
            this.chk_borderRounded.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_borderRounded.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 146);
            this.chk_borderRounded.Name = "chk_borderRounded";
            this.chk_borderRounded.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(127, 17);
            this.chk_borderRounded.TabIndex = 41;
            this.chk_borderRounded.Text = "The control can grow";
            this.chk_borderRounded.UseVisualStyleBackColor = true;
            this.chk_borderRounded.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_borderRounded_CheckedChanged);
            // 
            // label51
            // 
            this.label51.AutoSize = true;
            this.label51.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(18, 123);
            this.label51.Name = "label51";
            this.label51.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(35, 13);
            this.label51.TabIndex = 40;
            this.label51.Text = "Width";
            // 
            // tx_borderWidth
            // 
            this.tx_borderWidth.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(129, 120);
            this.tx_borderWidth.Name = "tx_borderWidth";
            this.tx_borderWidth.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_borderWidth.TabIndex = 39;
            this.tx_borderWidth.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_borderWidth_TextChanged_1);
            // 
            // sh_borderShadow
            // 
            this.sh_borderShadow.BackColor = System.Drawing.Color.White;
            this.sh_borderShadow.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_borderShadow.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(292, 97);
            this.sh_borderShadow.Name = "sh_borderShadow";
            this.sh_borderShadow.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(20, 17);
            this.sh_borderShadow.TabIndex = 34;
            // 
            // label50
            // 
            this.label50.AutoSize = true;
            this.label50.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 97);
            this.label50.Name = "label50";
            this.label50.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(90, 13);
            this.label50.TabIndex = 33;
            this.label50.Text = "Color 3D Shadow";
            // 
            // tx_borderShadow
            // 
            this.tx_borderShadow.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(129, 94);
            this.tx_borderShadow.Name = "tx_borderShadow";
            this.tx_borderShadow.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 20);
            this.tx_borderShadow.TabIndex = 32;
            this.tx_borderShadow.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_borderShadow_TextChanged);
            // 
            // sh_border3D
            // 
            this.sh_border3D.BackColor = System.Drawing.Color.White;
            this.sh_border3D.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_border3D.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(292, 71);
            this.sh_border3D.Name = "sh_border3D";
            this.sh_border3D.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(20, 17);
            this.sh_border3D.TabIndex = 31;
            // 
            // label45
            // 
            this.label45.AutoSize = true;
            this.label45.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 71);
            this.label45.Name = "label45";
            this.label45.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(48, 13);
            this.label45.TabIndex = 30;
            this.label45.Text = "Color 3D";
            // 
            // tx_border3D
            // 
            this.tx_border3D.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(129, 68);
            this.tx_border3D.Name = "tx_border3D";
            this.tx_border3D.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 20);
            this.tx_border3D.TabIndex = 29;
            this.tx_border3D.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_border3D_TextChanged);
            // 
            // sh_borderColor
            // 
            this.sh_borderColor.BackColor = System.Drawing.Color.Black;
            this.sh_borderColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_borderColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(292, 45);
            this.sh_borderColor.Name = "sh_borderColor";
            this.sh_borderColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(20, 17);
            this.sh_borderColor.TabIndex = 28;
            // 
            // label47
            // 
            this.label47.AutoSize = true;
            this.label47.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 45);
            this.label47.Name = "label47";
            this.label47.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(31, 13);
            this.label47.TabIndex = 27;
            this.label47.Text = "Color";
            // 
            // tx_borderColor
            // 
            this.tx_borderColor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(129, 42);
            this.tx_borderColor.Name = "tx_borderColor";
            this.tx_borderColor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 20);
            this.tx_borderColor.TabIndex = 26;
            this.tx_borderColor.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_borderColor_TextChanged);
            // 
            // label48
            // 
            this.label48.AutoSize = true;
            this.label48.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(17, 18);
            this.label48.Name = "label48";
            this.label48.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(31, 13);
            this.label48.TabIndex = 25;
            this.label48.Text = "Type";
            // 
            // cb_borderType
            // 
            this.cb_borderType.FormattingEnabled = true;
            this.cb_borderType.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(129, 15);
            this.cb_borderType.Name = "cb_borderType";
            this.cb_borderType.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_borderType.TabIndex = 24;
            this.cb_borderType.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_borderType_SelectedIndexChanged);
            // 
            // tbpChart
            // 
            this.tbpChart.Controls.Add(this.groupBox5);
            this.tbpChart.Controls.Add(this.groupBox4);
            this.tbpChart.Controls.Add(this.label58);
            this.tbpChart.Controls.Add(this.tx_chartGroupValue);
            this.tbpChart.Controls.Add(this.cmd_dbFieldGroupValue);
            this.tbpChart.Controls.Add(this.label57);
            this.tbpChart.Controls.Add(this.tx_dbFieldGroupValue);
            this.tbpChart.Controls.Add(this.chk_sort);
            this.tbpChart.Controls.Add(this.chk_showOutlines);
            this.tbpChart.Controls.Add(this.chk_showBarValues);
            this.tbpChart.Controls.Add(this.label59);
            this.tbpChart.Controls.Add(this.tx_chartTop);
            this.tbpChart.Controls.Add(this.label56);
            this.tbpChart.Controls.Add(this.cb_chartThickness);
            this.tbpChart.Controls.Add(this.label54);
            this.tbpChart.Controls.Add(this.cb_chartSize);
            this.tbpChart.Controls.Add(this.label55);
            this.tbpChart.Controls.Add(this.cb_linesType);
            this.tbpChart.Controls.Add(this.label53);
            this.tbpChart.Controls.Add(this.cb_formatType);
            this.tbpChart.Controls.Add(this.label52);
            this.tbpChart.Controls.Add(this.cb_type);
            this.tbpChart.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpChart.Name = "tbpChart";
            this.tbpChart.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(447, 483);
            this.tbpChart.TabIndex = 5;
            this.tbpChart.Text = "Chart";
            this.tbpChart.UseVisualStyleBackColor = true;
            // 
            // groupBox5
            // 
            this.groupBox5.Controls.Add(this.label63);
            this.groupBox5.Controls.Add(this.cb_colorSerie2);
            this.groupBox5.Controls.Add(this.cmd_dbFieldLbl2);
            this.groupBox5.Controls.Add(this.label64);
            this.groupBox5.Controls.Add(this.tx_dbFieldLbl2);
            this.groupBox5.Controls.Add(this.cmd_dbFieldVal2);
            this.groupBox5.Controls.Add(this.label65);
            this.groupBox5.Controls.Add(this.tx_dbFieldVal2);
            this.groupBox5.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(12, 352);
            this.groupBox5.Name = "groupBox5";
            this.groupBox5.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(422, 104);
            this.groupBox5.TabIndex = 62;
            this.groupBox5.TabStop = false;
            this.groupBox5.Text = "Serie 2";
            // 
            // label63
            // 
            this.label63.AutoSize = true;
            this.label63.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 74);
            this.label63.Name = "label63";
            this.label63.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(31, 13);
            this.label63.TabIndex = 66;
            this.label63.Text = "Color";
            // 
            // cb_colorSerie2
            // 
            this.cb_colorSerie2.FormattingEnabled = true;
            this.cb_colorSerie2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(86, 71);
            this.cb_colorSerie2.Name = "cb_colorSerie2";
            this.cb_colorSerie2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_colorSerie2.TabIndex = 65;
            this.cb_colorSerie2.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_colorSerie2_SelectedIndexChanged);
            // 
            // cmd_dbFieldLbl2
            // 
            this.cmd_dbFieldLbl2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(368, 45);
            this.cmd_dbFieldLbl2.Name = "cmd_dbFieldLbl2";
            this.cmd_dbFieldLbl2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(34, 23);
            this.cmd_dbFieldLbl2.TabIndex = 64;
            this.cmd_dbFieldLbl2.Text = "...";
            this.cmd_dbFieldLbl2.UseVisualStyleBackColor = true;
            // 
            // label64
            // 
            this.label64.AutoSize = true;
            this.label64.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 48);
            this.label64.Name = "label64";
            this.label64.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(54, 13);
            this.label64.TabIndex = 63;
            this.label64.Text = "Field label";
            // 
            // tx_dbFieldLbl2
            // 
            this.tx_dbFieldLbl2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(86, 45);
            this.tx_dbFieldLbl2.Name = "tx_dbFieldLbl2";
            this.tx_dbFieldLbl2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(276, 20);
            this.tx_dbFieldLbl2.TabIndex = 62;
            this.tx_dbFieldLbl2.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_dbFieldLbl2_TextChanged);
            // 
            // cmd_dbFieldVal2
            // 
            this.cmd_dbFieldVal2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(368, 19);
            this.cmd_dbFieldVal2.Name = "cmd_dbFieldVal2";
            this.cmd_dbFieldVal2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(34, 23);
            this.cmd_dbFieldVal2.TabIndex = 61;
            this.cmd_dbFieldVal2.Text = "...";
            this.cmd_dbFieldVal2.UseVisualStyleBackColor = true;
            // 
            // label65
            // 
            this.label65.AutoSize = true;
            this.label65.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 22);
            this.label65.Name = "label65";
            this.label65.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(58, 13);
            this.label65.TabIndex = 60;
            this.label65.Text = "Field value";
            // 
            // tx_dbFieldVal2
            // 
            this.tx_dbFieldVal2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(86, 19);
            this.tx_dbFieldVal2.Name = "tx_dbFieldVal2";
            this.tx_dbFieldVal2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(276, 20);
            this.tx_dbFieldVal2.TabIndex = 59;
            this.tx_dbFieldVal2.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_dbFieldVal2_TextChanged);
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.label62);
            this.groupBox4.Controls.Add(this.cb_colorSerie1);
            this.groupBox4.Controls.Add(this.cmd_dbFieldLbl1);
            this.groupBox4.Controls.Add(this.label61);
            this.groupBox4.Controls.Add(this.tx_dbFieldLbl1);
            this.groupBox4.Controls.Add(this.cmd_dbFieldVal1);
            this.groupBox4.Controls.Add(this.label60);
            this.groupBox4.Controls.Add(this.tx_dbFieldVal1);
            this.groupBox4.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(12, 242);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(422, 104);
            this.groupBox4.TabIndex = 61;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Serie 1";
            // 
            // label62
            // 
            this.label62.AutoSize = true;
            this.label62.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 74);
            this.label62.Name = "label62";
            this.label62.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(31, 13);
            this.label62.TabIndex = 66;
            this.label62.Text = "Color";
            // 
            // cb_colorSerie1
            // 
            this.cb_colorSerie1.FormattingEnabled = true;
            this.cb_colorSerie1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(86, 71);
            this.cb_colorSerie1.Name = "cb_colorSerie1";
            this.cb_colorSerie1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_colorSerie1.TabIndex = 65;
            this.cb_colorSerie1.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_colorSerie1_SelectedIndexChanged);
            // 
            // cmd_dbFieldLbl1
            // 
            this.cmd_dbFieldLbl1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(368, 45);
            this.cmd_dbFieldLbl1.Name = "cmd_dbFieldLbl1";
            this.cmd_dbFieldLbl1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(34, 23);
            this.cmd_dbFieldLbl1.TabIndex = 64;
            this.cmd_dbFieldLbl1.Text = "...";
            this.cmd_dbFieldLbl1.UseVisualStyleBackColor = true;
            // 
            // label61
            // 
            this.label61.AutoSize = true;
            this.label61.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 48);
            this.label61.Name = "label61";
            this.label61.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(54, 13);
            this.label61.TabIndex = 63;
            this.label61.Text = "Field label";
            // 
            // tx_dbFieldLbl1
            // 
            this.tx_dbFieldLbl1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(86, 45);
            this.tx_dbFieldLbl1.Name = "tx_dbFieldLbl1";
            this.tx_dbFieldLbl1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(276, 20);
            this.tx_dbFieldLbl1.TabIndex = 62;
            this.tx_dbFieldLbl1.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_dbFieldLbl1_TextChanged);
            // 
            // cmd_dbFieldVal1
            // 
            this.cmd_dbFieldVal1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(368, 19);
            this.cmd_dbFieldVal1.Name = "cmd_dbFieldVal1";
            this.cmd_dbFieldVal1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(34, 23);
            this.cmd_dbFieldVal1.TabIndex = 61;
            this.cmd_dbFieldVal1.Text = "...";
            this.cmd_dbFieldVal1.UseVisualStyleBackColor = true;
            // 
            // label60
            // 
            this.label60.AutoSize = true;
            this.label60.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(19, 22);
            this.label60.Name = "label60";
            this.label60.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(58, 13);
            this.label60.TabIndex = 60;
            this.label60.Text = "Field value";
            // 
            // tx_dbFieldVal1
            // 
            this.tx_dbFieldVal1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(86, 19);
            this.tx_dbFieldVal1.Name = "tx_dbFieldVal1";
            this.tx_dbFieldVal1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(276, 20);
            this.tx_dbFieldVal1.TabIndex = 59;
            this.tx_dbFieldVal1.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_dbFieldVal1_TextChanged);
            // 
            // label58
            // 
            this.label58.AutoSize = true;
            this.label58.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(8, 219);
            this.label58.Name = "label58";
            this.label58.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(65, 13);
            this.label58.TabIndex = 60;
            this.label58.Text = "Group value";
            // 
            // tx_chartGroupValue
            // 
            this.tx_chartGroupValue.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 216);
            this.tx_chartGroupValue.Name = "tx_chartGroupValue";
            this.tx_chartGroupValue.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_chartGroupValue.TabIndex = 59;
            this.tx_chartGroupValue.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_chartGroupValue_TextChanged_1);
            // 
            // cmd_dbFieldGroupValue
            // 
            this.cmd_dbFieldGroupValue.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(358, 190);
            this.cmd_dbFieldGroupValue.Name = "cmd_dbFieldGroupValue";
            this.cmd_dbFieldGroupValue.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(34, 23);
            this.cmd_dbFieldGroupValue.TabIndex = 58;
            this.cmd_dbFieldGroupValue.Text = "...";
            this.cmd_dbFieldGroupValue.UseVisualStyleBackColor = true;
            // 
            // label57
            // 
            this.label57.AutoSize = true;
            this.label57.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(9, 193);
            this.label57.Name = "label57";
            this.label57.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(65, 13);
            this.label57.TabIndex = 57;
            this.label57.Text = "Group value";
            // 
            // tx_dbFieldGroupValue
            // 
            this.tx_dbFieldGroupValue.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 190);
            this.tx_dbFieldGroupValue.Name = "tx_dbFieldGroupValue";
            this.tx_dbFieldGroupValue.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(276, 20);
            this.tx_dbFieldGroupValue.TabIndex = 56;
            this.tx_dbFieldGroupValue.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_dbFieldGroupValue_TextChanged);
            // 
            // chk_sort
            // 
            this.chk_sort.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_sort.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(9, 156);
            this.chk_sort.Name = "chk_sort";
            this.chk_sort.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(92, 24);
            this.chk_sort.TabIndex = 55;
            this.chk_sort.Text = "Sort";
            this.chk_sort.UseVisualStyleBackColor = true;
            this.chk_sort.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_sort_CheckedChanged);
            // 
            // chk_showOutlines
            // 
            this.chk_showOutlines.AutoSize = true;
            this.chk_showOutlines.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_showOutlines.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(9, 133);
            this.chk_showOutlines.Name = "chk_showOutlines";
            this.chk_showOutlines.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(92, 17);
            this.chk_showOutlines.TabIndex = 54;
            this.chk_showOutlines.Text = "Show outlines";
            this.chk_showOutlines.UseVisualStyleBackColor = true;
            this.chk_showOutlines.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_showOutlines_CheckedChanged);
            // 
            // chk_showBarValues
            // 
            this.chk_showBarValues.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_showBarValues.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(9, 103);
            this.chk_showBarValues.Name = "chk_showBarValues";
            this.chk_showBarValues.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(92, 24);
            this.chk_showBarValues.TabIndex = 53;
            this.chk_showBarValues.Text = "Bar values";
            this.chk_showBarValues.UseVisualStyleBackColor = true;
            this.chk_showBarValues.CheckedChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.chk_showBarValues_CheckedChanged);
            // 
            // label59
            // 
            this.label59.AutoSize = true;
            this.label59.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(7, 72);
            this.label59.Name = "label59";
            this.label59.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(26, 13);
            this.label59.TabIndex = 52;
            this.label59.Text = "Top";
            // 
            // tx_chartTop
            // 
            this.tx_chartTop.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(76, 69);
            this.tx_chartTop.Name = "tx_chartTop";
            this.tx_chartTop.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(71, 20);
            this.tx_chartTop.TabIndex = 51;
            this.tx_chartTop.TextChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tx_chartTop_TextChanged_1);
            // 
            // label56
            // 
            this.label56.AutoSize = true;
            this.label56.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(192, 72);
            this.label56.Name = "label56";
            this.label56.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(97, 13);
            this.label56.TabIndex = 35;
            this.label56.Text = "Pie chart thickness";
            // 
            // cb_chartThickness
            // 
            this.cb_chartThickness.FormattingEnabled = true;
            this.cb_chartThickness.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(295, 69);
            this.cb_chartThickness.Name = "cb_chartThickness";
            this.cb_chartThickness.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_chartThickness.TabIndex = 34;
            this.cb_chartThickness.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_chartThickness_SelectedIndexChanged);
            // 
            // label54
            // 
            this.label54.AutoSize = true;
            this.label54.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(218, 45);
            this.label54.Name = "label54";
            this.label54.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(70, 13);
            this.label54.TabIndex = 33;
            this.label54.Text = "Pie chart size";
            // 
            // cb_chartSize
            // 
            this.cb_chartSize.FormattingEnabled = true;
            this.cb_chartSize.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(295, 42);
            this.cb_chartSize.Name = "cb_chartSize";
            this.cb_chartSize.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_chartSize.TabIndex = 32;
            this.cb_chartSize.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_chartSize_SelectedIndexChanged);
            // 
            // label55
            // 
            this.label55.AutoSize = true;
            this.label55.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(7, 45);
            this.label55.Name = "label55";
            this.label55.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(67, 13);
            this.label55.TabIndex = 31;
            this.label55.Text = "Bar grid lines";
            // 
            // cb_linesType
            // 
            this.cb_linesType.FormattingEnabled = true;
            this.cb_linesType.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 42);
            this.cb_linesType.Name = "cb_linesType";
            this.cb_linesType.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_linesType.TabIndex = 30;
            this.cb_linesType.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_linesType_SelectedIndexChanged);
            // 
            // label53
            // 
            this.label53.AutoSize = true;
            this.label53.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(218, 18);
            this.label53.Name = "label53";
            this.label53.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(39, 13);
            this.label53.TabIndex = 29;
            this.label53.Text = "Format";
            // 
            // cb_formatType
            // 
            this.cb_formatType.FormattingEnabled = true;
            this.cb_formatType.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(295, 15);
            this.cb_formatType.Name = "cb_formatType";
            this.cb_formatType.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_formatType.TabIndex = 28;
            this.cb_formatType.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_formatType_SelectedIndexChanged);
            // 
            // label52
            // 
            this.label52.AutoSize = true;
            this.label52.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(7, 18);
            this.label52.Name = "label52";
            this.label52.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(31, 13);
            this.label52.TabIndex = 27;
            this.label52.Text = "Type";
            // 
            // cb_type
            // 
            this.cb_type.FormattingEnabled = true;
            this.cb_type.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(77, 15);
            this.cb_type.Name = "cb_type";
            this.cb_type.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(121, 21);
            this.cb_type.TabIndex = 26;
            this.cb_type.SelectedIndexChanged += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cb_type_SelectedIndexChanged);
            // 
            // cmd_apply
            // 
            this.cmd_apply.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(279, 590);
            this.cmd_apply.Name = "cmd_apply";
            this.cmd_apply.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_apply.TabIndex = 2;
            this.cmd_apply.Text = "Apply";
            this.cmd_apply.UseVisualStyleBackColor = true;
            this.cmd_apply.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_apply_Click);
            // 
            // cmd_cancel
            // 
            this.cmd_cancel.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(360, 590);
            this.cmd_cancel.Name = "cmd_cancel";
            this.cmd_cancel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(75, 23);
            this.cmd_cancel.TabIndex = 3;
            this.cmd_cancel.Text = "Cancel";
            this.cmd_cancel.UseVisualStyleBackColor = true;
            this.cmd_cancel.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmd_cancel_Click);
            // 
            // fProperties
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(451, 622);
            this.Controls.Add(this.cmd_cancel);
            this.Controls.Add(this.cmd_apply);
            this.Controls.Add(this.tab_main);
            this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "fProperties";
            this.Text = "Control properties";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fProperties_Load);
            this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout();
            ().EndInit();
            this.tab_main.ResumeLayout(false);
            this.tbpFormat.ResumeLayout(false);
            this.tbpFormat.PerformLayout();
            this.tbpFormulas.ResumeLayout(false);
            this.tbpFormulas.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox1.ResumeLayout(false);
            this.tbpDatabase.ResumeLayout(false);
            this.tbpDatabase.PerformLayout();
            this.tbpImage.ResumeLayout(false);
            this.tbpImage.PerformLayout();
            this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout();
            ().EndInit();
            this.tbpBorders.ResumeLayout(false);
            this.tbpBorders.PerformLayout();
            this.tbpChart.ResumeLayout(false);
            this.tbpChart.PerformLayout();
            this.groupBox5.ResumeLayout(false);
            this.groupBox5.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout();
            this.ResumeLayout(false);

        };

UNKNOWN >>         #endregion

        let panel1: System.Windows.Forms.Panel = null;
        let pictureBox1: System.Windows.Forms.PictureBox = null;
        let tab_main: System.Windows.Forms.TabControl = null;
        let tbpFormat: System.Windows.Forms.TabPage = null;
        let label24: System.Windows.Forms.Label = null;
        let tx_exportColIdx: System.Windows.Forms.TextBox = null;
        let label23: System.Windows.Forms.Label = null;
        let chk_isFreeCtrl: System.Windows.Forms.CheckBox = null;
        let label22: System.Windows.Forms.Label = null;
        let chk_wordWrap: System.Windows.Forms.CheckBox = null;
        let chk_canGrow: System.Windows.Forms.CheckBox = null;
        let label21: System.Windows.Forms.Label = null;
        let label20: System.Windows.Forms.Label = null;
        let tx_width: System.Windows.Forms.TextBox = null;
        let label19: System.Windows.Forms.Label = null;
        let tx_height: System.Windows.Forms.TextBox = null;
        let label18: System.Windows.Forms.Label = null;
        let tx_top: System.Windows.Forms.TextBox = null;
        let label17: System.Windows.Forms.Label = null;
        let tx_left: System.Windows.Forms.TextBox = null;
        let label16: System.Windows.Forms.Label = null;
        let label15: System.Windows.Forms.Label = null;
        let label13: System.Windows.Forms.Label = null;
        let tx_symbol: System.Windows.Forms.TextBox = null;
        let label14: System.Windows.Forms.Label = null;
        let tx_format: System.Windows.Forms.TextBox = null;
        let chk_transparent: System.Windows.Forms.CheckBox = null;
        let sh_backColor: System.Windows.Forms.Label = null;
        let label11: System.Windows.Forms.Label = null;
        let tx_backColor: System.Windows.Forms.TextBox = null;
        let chk_fontStrike: System.Windows.Forms.CheckBox = null;
        let chk_fontItalic: System.Windows.Forms.CheckBox = null;
        let sh_foreColor: System.Windows.Forms.Label = null;
        let label9: System.Windows.Forms.Label = null;
        let tx_foreColor: System.Windows.Forms.TextBox = null;
        let chk_fontUnderline: System.Windows.Forms.CheckBox = null;
        let chk_fontBold: System.Windows.Forms.CheckBox = null;
        let label8: System.Windows.Forms.Label = null;
        let cb_align: System.Windows.Forms.ComboBox = null;
        let label7: System.Windows.Forms.Label = null;
        let tx_fontSize: System.Windows.Forms.TextBox = null;
        let label6: System.Windows.Forms.Label = null;
        let tx_font: System.Windows.Forms.TextBox = null;
        let label5: System.Windows.Forms.Label = null;
        let tx_tag: System.Windows.Forms.TextBox = null;
        let label4: System.Windows.Forms.Label = null;
        let tx_text: System.Windows.Forms.TextBox = null;
        let label3: System.Windows.Forms.Label = null;
        let label2: System.Windows.Forms.Label = null;
        let tx_name: System.Windows.Forms.TextBox = null;
        let tbpFormulas: System.Windows.Forms.TabPage = null;
        let tbpDatabase: System.Windows.Forms.TabPage = null;
        let tbpImage: System.Windows.Forms.TabPage = null;
        let tbpBorders: System.Windows.Forms.TabPage = null;
        let tbpChart: System.Windows.Forms.TabPage = null;
        let cmd_apply: System.Windows.Forms.Button = null;
        let cmd_cancel: System.Windows.Forms.Button = null;
        let groupBox3: System.Windows.Forms.GroupBox = null;
        let label41: System.Windows.Forms.Label = null;
        let op_afterPrint: System.Windows.Forms.RadioButton = null;
        let op_beforePrint: System.Windows.Forms.RadioButton = null;
        let label40: System.Windows.Forms.Label = null;
        let label39: System.Windows.Forms.Label = null;
        let tx_idxGroup: System.Windows.Forms.TextBox = null;
        let label37: System.Windows.Forms.Label = null;
        let label38: System.Windows.Forms.Label = null;
        let label35: System.Windows.Forms.Label = null;
        let label36: System.Windows.Forms.Label = null;
        let label33: System.Windows.Forms.Label = null;
        let label34: System.Windows.Forms.Label = null;
        let label31: System.Windows.Forms.Label = null;
        let label32: System.Windows.Forms.Label = null;
        let label30: System.Windows.Forms.Label = null;
        let label29: System.Windows.Forms.Label = null;
        let label28: System.Windows.Forms.Label = null;
        let groupBox2: System.Windows.Forms.GroupBox = null;
        let lb_formulaValue: System.Windows.Forms.Label = null;
        let chk_formulaValue: System.Windows.Forms.CheckBox = null;
        let cmd_formulaValue: System.Windows.Forms.Button = null;
        let groupBox1: System.Windows.Forms.GroupBox = null;
        let lb_formulaHide: System.Windows.Forms.Label = null;
        let label25: System.Windows.Forms.Label = null;
        let chk_formulaHide: System.Windows.Forms.CheckBox = null;
        let cmd_formulaHide: System.Windows.Forms.Button = null;
        let cmd_dbField: System.Windows.Forms.Button = null;
        let label42: System.Windows.Forms.Label = null;
        let tx_dbField: System.Windows.Forms.TextBox = null;
        let pic_image: System.Windows.Forms.PictureBox = null;
        let cmd_imageFile: System.Windows.Forms.Button = null;
        let label43: System.Windows.Forms.Label = null;
        let tx_imageFile: System.Windows.Forms.TextBox = null;
        let chk_borderRounded: System.Windows.Forms.CheckBox = null;
        let label51: System.Windows.Forms.Label = null;
        let tx_borderWidth: System.Windows.Forms.TextBox = null;
        let sh_borderShadow: System.Windows.Forms.Label = null;
        let label50: System.Windows.Forms.Label = null;
        let tx_borderShadow: System.Windows.Forms.TextBox = null;
        let sh_border3D: System.Windows.Forms.Label = null;
        let label45: System.Windows.Forms.Label = null;
        let tx_border3D: System.Windows.Forms.TextBox = null;
        let sh_borderColor: System.Windows.Forms.Label = null;
        let label47: System.Windows.Forms.Label = null;
        let tx_borderColor: System.Windows.Forms.TextBox = null;
        let label48: System.Windows.Forms.Label = null;
        let cb_borderType: System.Windows.Forms.ComboBox = null;
        let label56: System.Windows.Forms.Label = null;
        let cb_chartThickness: System.Windows.Forms.ComboBox = null;
        let label54: System.Windows.Forms.Label = null;
        let cb_chartSize: System.Windows.Forms.ComboBox = null;
        let label55: System.Windows.Forms.Label = null;
        let cb_linesType: System.Windows.Forms.ComboBox = null;
        let label53: System.Windows.Forms.Label = null;
        let cb_formatType: System.Windows.Forms.ComboBox = null;
        let label52: System.Windows.Forms.Label = null;
        let cb_type: System.Windows.Forms.ComboBox = null;
        let chk_sort: System.Windows.Forms.CheckBox = null;
        let chk_showOutlines: System.Windows.Forms.CheckBox = null;
        let chk_showBarValues: System.Windows.Forms.CheckBox = null;
        let label59: System.Windows.Forms.Label = null;
        let tx_chartTop: System.Windows.Forms.TextBox = null;
        let groupBox5: System.Windows.Forms.GroupBox = null;
        let label63: System.Windows.Forms.Label = null;
        let cb_colorSerie2: System.Windows.Forms.ComboBox = null;
        let cmd_dbFieldLbl2: System.Windows.Forms.Button = null;
        let label64: System.Windows.Forms.Label = null;
        let tx_dbFieldLbl2: System.Windows.Forms.TextBox = null;
        let cmd_dbFieldVal2: System.Windows.Forms.Button = null;
        let label65: System.Windows.Forms.Label = null;
        let tx_dbFieldVal2: System.Windows.Forms.TextBox = null;
        let groupBox4: System.Windows.Forms.GroupBox = null;
        let label62: System.Windows.Forms.Label = null;
        let cb_colorSerie1: System.Windows.Forms.ComboBox = null;
        let cmd_dbFieldLbl1: System.Windows.Forms.Button = null;
        let label61: System.Windows.Forms.Label = null;
        let tx_dbFieldLbl1: System.Windows.Forms.TextBox = null;
        let cmd_dbFieldVal1: System.Windows.Forms.Button = null;
        let label60: System.Windows.Forms.Label = null;
        let tx_dbFieldVal1: System.Windows.Forms.TextBox = null;
        let label58: System.Windows.Forms.Label = null;
        let tx_chartGroupValue: System.Windows.Forms.TextBox = null;
        let cmd_dbFieldGroupValue: System.Windows.Forms.Button = null;
        let label57: System.Windows.Forms.Label = null;
        let tx_dbFieldGroupValue: System.Windows.Forms.TextBox = null;
        let cmd_backColor: System.Windows.Forms.Button = null;
        let cmd_foreColor: System.Windows.Forms.Button = null;
        let cmd_borderShadowColor: System.Windows.Forms.Button = null;
        let cmd_borderColor3d: System.Windows.Forms.Button = null;
        let cmd_borderColor: System.Windows.Forms.Button = null;
        let lb_control: System.Windows.Forms.Label = null;
        let colorDialog: System.Windows.Forms.ColorDialog = null;
        let fontDialog: System.Windows.Forms.FontDialog = null;
        let panel2: System.Windows.Forms.Panel = null;
        let cmd_font: System.Windows.Forms.Button = null;
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfProperties {

    Dispose: (bool) => void;
  }
}
