(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
UNKNOWN >>     partial class fProperties //@@@: partial class fProperties
    { //@@@: {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        let components = null; //@@@: private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        self. = function(disposing) { //@@@: protected override void Dispose(bool disposing)
            const  = function(null) { //@@@: if (disposing && (components != null))
                components.Dispose(); //@@@: components.Dispose();
            } //@@@: }
            base.Dispose(disposing); //@@@: base.Dispose(disposing);
        }; //@@@: }

UNKNOWN >>         #region Windows Form Designer generated code //@@@: #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        const InitializeComponent = function() { //@@@: private void InitializeComponent()
            this.panel1 = new System.Windows.Forms.Panel(); //@@@: this.panel1 = new System.Windows.Forms.Panel();
            this.lb_control = new System.Windows.Forms.Label(); //@@@: this.lb_control = new System.Windows.Forms.Label();
            this.pictureBox1 = new System.Windows.Forms.PictureBox(); //@@@: this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.tab_main = new System.Windows.Forms.TabControl(); //@@@: this.tab_main = new System.Windows.Forms.TabControl();
            this.tbpFormat = new System.Windows.Forms.TabPage(); //@@@: this.tbpFormat = new System.Windows.Forms.TabPage();
            this.cmd_font = new System.Windows.Forms.Button(); //@@@: this.cmd_font = new System.Windows.Forms.Button();
            this.cmd_backColor = new System.Windows.Forms.Button(); //@@@: this.cmd_backColor = new System.Windows.Forms.Button();
            this.cmd_foreColor = new System.Windows.Forms.Button(); //@@@: this.cmd_foreColor = new System.Windows.Forms.Button();
            this.label24 = new System.Windows.Forms.Label(); //@@@: this.label24 = new System.Windows.Forms.Label();
            this.tx_exportColIdx = new System.Windows.Forms.TextBox(); //@@@: this.tx_exportColIdx = new System.Windows.Forms.TextBox();
            this.label23 = new System.Windows.Forms.Label(); //@@@: this.label23 = new System.Windows.Forms.Label();
            this.chk_isFreeCtrl = new System.Windows.Forms.CheckBox(); //@@@: this.chk_isFreeCtrl = new System.Windows.Forms.CheckBox();
            this.label22 = new System.Windows.Forms.Label(); //@@@: this.label22 = new System.Windows.Forms.Label();
            this.chk_wordWrap = new System.Windows.Forms.CheckBox(); //@@@: this.chk_wordWrap = new System.Windows.Forms.CheckBox();
            this.chk_canGrow = new System.Windows.Forms.CheckBox(); //@@@: this.chk_canGrow = new System.Windows.Forms.CheckBox();
            this.label21 = new System.Windows.Forms.Label(); //@@@: this.label21 = new System.Windows.Forms.Label();
            this.label20 = new System.Windows.Forms.Label(); //@@@: this.label20 = new System.Windows.Forms.Label();
            this.tx_width = new System.Windows.Forms.TextBox(); //@@@: this.tx_width = new System.Windows.Forms.TextBox();
            this.label19 = new System.Windows.Forms.Label(); //@@@: this.label19 = new System.Windows.Forms.Label();
            this.tx_height = new System.Windows.Forms.TextBox(); //@@@: this.tx_height = new System.Windows.Forms.TextBox();
            this.label18 = new System.Windows.Forms.Label(); //@@@: this.label18 = new System.Windows.Forms.Label();
            this.tx_top = new System.Windows.Forms.TextBox(); //@@@: this.tx_top = new System.Windows.Forms.TextBox();
            this.label17 = new System.Windows.Forms.Label(); //@@@: this.label17 = new System.Windows.Forms.Label();
            this.tx_left = new System.Windows.Forms.TextBox(); //@@@: this.tx_left = new System.Windows.Forms.TextBox();
            this.label16 = new System.Windows.Forms.Label(); //@@@: this.label16 = new System.Windows.Forms.Label();
            this.label15 = new System.Windows.Forms.Label(); //@@@: this.label15 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label(); //@@@: this.label13 = new System.Windows.Forms.Label();
            this.tx_symbol = new System.Windows.Forms.TextBox(); //@@@: this.tx_symbol = new System.Windows.Forms.TextBox();
            this.label14 = new System.Windows.Forms.Label(); //@@@: this.label14 = new System.Windows.Forms.Label();
            this.tx_format = new System.Windows.Forms.TextBox(); //@@@: this.tx_format = new System.Windows.Forms.TextBox();
            this.chk_transparent = new System.Windows.Forms.CheckBox(); //@@@: this.chk_transparent = new System.Windows.Forms.CheckBox();
            this.sh_backColor = new System.Windows.Forms.Label(); //@@@: this.sh_backColor = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label(); //@@@: this.label11 = new System.Windows.Forms.Label();
            this.tx_backColor = new System.Windows.Forms.TextBox(); //@@@: this.tx_backColor = new System.Windows.Forms.TextBox();
            this.chk_fontStrike = new System.Windows.Forms.CheckBox(); //@@@: this.chk_fontStrike = new System.Windows.Forms.CheckBox();
            this.chk_fontItalic = new System.Windows.Forms.CheckBox(); //@@@: this.chk_fontItalic = new System.Windows.Forms.CheckBox();
            this.sh_foreColor = new System.Windows.Forms.Label(); //@@@: this.sh_foreColor = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label(); //@@@: this.label9 = new System.Windows.Forms.Label();
            this.tx_foreColor = new System.Windows.Forms.TextBox(); //@@@: this.tx_foreColor = new System.Windows.Forms.TextBox();
            this.chk_fontUnderline = new System.Windows.Forms.CheckBox(); //@@@: this.chk_fontUnderline = new System.Windows.Forms.CheckBox();
            this.chk_fontBold = new System.Windows.Forms.CheckBox(); //@@@: this.chk_fontBold = new System.Windows.Forms.CheckBox();
            this.label8 = new System.Windows.Forms.Label(); //@@@: this.label8 = new System.Windows.Forms.Label();
            this.cb_align = new System.Windows.Forms.ComboBox(); //@@@: this.cb_align = new System.Windows.Forms.ComboBox();
            this.label7 = new System.Windows.Forms.Label(); //@@@: this.label7 = new System.Windows.Forms.Label();
            this.tx_fontSize = new System.Windows.Forms.TextBox(); //@@@: this.tx_fontSize = new System.Windows.Forms.TextBox();
            this.label6 = new System.Windows.Forms.Label(); //@@@: this.label6 = new System.Windows.Forms.Label();
            this.tx_font = new System.Windows.Forms.TextBox(); //@@@: this.tx_font = new System.Windows.Forms.TextBox();
            this.label5 = new System.Windows.Forms.Label(); //@@@: this.label5 = new System.Windows.Forms.Label();
            this.tx_tag = new System.Windows.Forms.TextBox(); //@@@: this.tx_tag = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label(); //@@@: this.label4 = new System.Windows.Forms.Label();
            this.tx_text = new System.Windows.Forms.TextBox(); //@@@: this.tx_text = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label(); //@@@: this.label3 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label(); //@@@: this.label2 = new System.Windows.Forms.Label();
            this.tx_name = new System.Windows.Forms.TextBox(); //@@@: this.tx_name = new System.Windows.Forms.TextBox();
            this.tbpFormulas = new System.Windows.Forms.TabPage(); //@@@: this.tbpFormulas = new System.Windows.Forms.TabPage();
            this.groupBox3 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.label41 = new System.Windows.Forms.Label(); //@@@: this.label41 = new System.Windows.Forms.Label();
            this.op_afterPrint = new System.Windows.Forms.RadioButton(); //@@@: this.op_afterPrint = new System.Windows.Forms.RadioButton();
            this.op_beforePrint = new System.Windows.Forms.RadioButton(); //@@@: this.op_beforePrint = new System.Windows.Forms.RadioButton();
            this.label40 = new System.Windows.Forms.Label(); //@@@: this.label40 = new System.Windows.Forms.Label();
            this.label39 = new System.Windows.Forms.Label(); //@@@: this.label39 = new System.Windows.Forms.Label();
            this.tx_idxGroup = new System.Windows.Forms.TextBox(); //@@@: this.tx_idxGroup = new System.Windows.Forms.TextBox();
            this.label37 = new System.Windows.Forms.Label(); //@@@: this.label37 = new System.Windows.Forms.Label();
            this.label38 = new System.Windows.Forms.Label(); //@@@: this.label38 = new System.Windows.Forms.Label();
            this.label35 = new System.Windows.Forms.Label(); //@@@: this.label35 = new System.Windows.Forms.Label();
            this.label36 = new System.Windows.Forms.Label(); //@@@: this.label36 = new System.Windows.Forms.Label();
            this.label33 = new System.Windows.Forms.Label(); //@@@: this.label33 = new System.Windows.Forms.Label();
            this.label34 = new System.Windows.Forms.Label(); //@@@: this.label34 = new System.Windows.Forms.Label();
            this.label31 = new System.Windows.Forms.Label(); //@@@: this.label31 = new System.Windows.Forms.Label();
            this.label32 = new System.Windows.Forms.Label(); //@@@: this.label32 = new System.Windows.Forms.Label();
            this.label30 = new System.Windows.Forms.Label(); //@@@: this.label30 = new System.Windows.Forms.Label();
            this.label29 = new System.Windows.Forms.Label(); //@@@: this.label29 = new System.Windows.Forms.Label();
            this.label28 = new System.Windows.Forms.Label(); //@@@: this.label28 = new System.Windows.Forms.Label();
            this.groupBox2 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.lb_formulaValue = new System.Windows.Forms.Label(); //@@@: this.lb_formulaValue = new System.Windows.Forms.Label();
            this.chk_formulaValue = new System.Windows.Forms.CheckBox(); //@@@: this.chk_formulaValue = new System.Windows.Forms.CheckBox();
            this.cmd_formulaValue = new System.Windows.Forms.Button(); //@@@: this.cmd_formulaValue = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.lb_formulaHide = new System.Windows.Forms.Label(); //@@@: this.lb_formulaHide = new System.Windows.Forms.Label();
            this.label25 = new System.Windows.Forms.Label(); //@@@: this.label25 = new System.Windows.Forms.Label();
            this.chk_formulaHide = new System.Windows.Forms.CheckBox(); //@@@: this.chk_formulaHide = new System.Windows.Forms.CheckBox();
            this.cmd_formulaHide = new System.Windows.Forms.Button(); //@@@: this.cmd_formulaHide = new System.Windows.Forms.Button();
            this.tbpDatabase = new System.Windows.Forms.TabPage(); //@@@: this.tbpDatabase = new System.Windows.Forms.TabPage();
            this.cmd_dbField = new System.Windows.Forms.Button(); //@@@: this.cmd_dbField = new System.Windows.Forms.Button();
            this.label42 = new System.Windows.Forms.Label(); //@@@: this.label42 = new System.Windows.Forms.Label();
            this.tx_dbField = new System.Windows.Forms.TextBox(); //@@@: this.tx_dbField = new System.Windows.Forms.TextBox();
            this.tbpImage = new System.Windows.Forms.TabPage(); //@@@: this.tbpImage = new System.Windows.Forms.TabPage();
            this.panel2 = new System.Windows.Forms.Panel(); //@@@: this.panel2 = new System.Windows.Forms.Panel();
            this.pic_image = new System.Windows.Forms.PictureBox(); //@@@: this.pic_image = new System.Windows.Forms.PictureBox();
            this.cmd_imageFile = new System.Windows.Forms.Button(); //@@@: this.cmd_imageFile = new System.Windows.Forms.Button();
            this.label43 = new System.Windows.Forms.Label(); //@@@: this.label43 = new System.Windows.Forms.Label();
            this.tx_imageFile = new System.Windows.Forms.TextBox(); //@@@: this.tx_imageFile = new System.Windows.Forms.TextBox();
            this.tbpBorders = new System.Windows.Forms.TabPage(); //@@@: this.tbpBorders = new System.Windows.Forms.TabPage();
            this.cmd_borderShadowColor = new System.Windows.Forms.Button(); //@@@: this.cmd_borderShadowColor = new System.Windows.Forms.Button();
            this.cmd_borderColor3d = new System.Windows.Forms.Button(); //@@@: this.cmd_borderColor3d = new System.Windows.Forms.Button();
            this.cmd_borderColor = new System.Windows.Forms.Button(); //@@@: this.cmd_borderColor = new System.Windows.Forms.Button();
            this.chk_borderRounded = new System.Windows.Forms.CheckBox(); //@@@: this.chk_borderRounded = new System.Windows.Forms.CheckBox();
            this.label51 = new System.Windows.Forms.Label(); //@@@: this.label51 = new System.Windows.Forms.Label();
            this.tx_borderWidth = new System.Windows.Forms.TextBox(); //@@@: this.tx_borderWidth = new System.Windows.Forms.TextBox();
            this.sh_borderShadow = new System.Windows.Forms.Label(); //@@@: this.sh_borderShadow = new System.Windows.Forms.Label();
            this.label50 = new System.Windows.Forms.Label(); //@@@: this.label50 = new System.Windows.Forms.Label();
            this.tx_borderShadow = new System.Windows.Forms.TextBox(); //@@@: this.tx_borderShadow = new System.Windows.Forms.TextBox();
            this.sh_border3D = new System.Windows.Forms.Label(); //@@@: this.sh_border3D = new System.Windows.Forms.Label();
            this.label45 = new System.Windows.Forms.Label(); //@@@: this.label45 = new System.Windows.Forms.Label();
            this.tx_border3D = new System.Windows.Forms.TextBox(); //@@@: this.tx_border3D = new System.Windows.Forms.TextBox();
            this.sh_borderColor = new System.Windows.Forms.Label(); //@@@: this.sh_borderColor = new System.Windows.Forms.Label();
            this.label47 = new System.Windows.Forms.Label(); //@@@: this.label47 = new System.Windows.Forms.Label();
            this.tx_borderColor = new System.Windows.Forms.TextBox(); //@@@: this.tx_borderColor = new System.Windows.Forms.TextBox();
            this.label48 = new System.Windows.Forms.Label(); //@@@: this.label48 = new System.Windows.Forms.Label();
            this.cb_borderType = new System.Windows.Forms.ComboBox(); //@@@: this.cb_borderType = new System.Windows.Forms.ComboBox();
            this.tbpChart = new System.Windows.Forms.TabPage(); //@@@: this.tbpChart = new System.Windows.Forms.TabPage();
            this.groupBox5 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox5 = new System.Windows.Forms.GroupBox();
            this.label63 = new System.Windows.Forms.Label(); //@@@: this.label63 = new System.Windows.Forms.Label();
            this.cb_colorSerie2 = new System.Windows.Forms.ComboBox(); //@@@: this.cb_colorSerie2 = new System.Windows.Forms.ComboBox();
            this.cmd_dbFieldLbl2 = new System.Windows.Forms.Button(); //@@@: this.cmd_dbFieldLbl2 = new System.Windows.Forms.Button();
            this.label64 = new System.Windows.Forms.Label(); //@@@: this.label64 = new System.Windows.Forms.Label();
            this.tx_dbFieldLbl2 = new System.Windows.Forms.TextBox(); //@@@: this.tx_dbFieldLbl2 = new System.Windows.Forms.TextBox();
            this.cmd_dbFieldVal2 = new System.Windows.Forms.Button(); //@@@: this.cmd_dbFieldVal2 = new System.Windows.Forms.Button();
            this.label65 = new System.Windows.Forms.Label(); //@@@: this.label65 = new System.Windows.Forms.Label();
            this.tx_dbFieldVal2 = new System.Windows.Forms.TextBox(); //@@@: this.tx_dbFieldVal2 = new System.Windows.Forms.TextBox();
            this.groupBox4 = new System.Windows.Forms.GroupBox(); //@@@: this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.label62 = new System.Windows.Forms.Label(); //@@@: this.label62 = new System.Windows.Forms.Label();
            this.cb_colorSerie1 = new System.Windows.Forms.ComboBox(); //@@@: this.cb_colorSerie1 = new System.Windows.Forms.ComboBox();
            this.cmd_dbFieldLbl1 = new System.Windows.Forms.Button(); //@@@: this.cmd_dbFieldLbl1 = new System.Windows.Forms.Button();
            this.label61 = new System.Windows.Forms.Label(); //@@@: this.label61 = new System.Windows.Forms.Label();
            this.tx_dbFieldLbl1 = new System.Windows.Forms.TextBox(); //@@@: this.tx_dbFieldLbl1 = new System.Windows.Forms.TextBox();
            this.cmd_dbFieldVal1 = new System.Windows.Forms.Button(); //@@@: this.cmd_dbFieldVal1 = new System.Windows.Forms.Button();
            this.label60 = new System.Windows.Forms.Label(); //@@@: this.label60 = new System.Windows.Forms.Label();
            this.tx_dbFieldVal1 = new System.Windows.Forms.TextBox(); //@@@: this.tx_dbFieldVal1 = new System.Windows.Forms.TextBox();
            this.label58 = new System.Windows.Forms.Label(); //@@@: this.label58 = new System.Windows.Forms.Label();
            this.tx_chartGroupValue = new System.Windows.Forms.TextBox(); //@@@: this.tx_chartGroupValue = new System.Windows.Forms.TextBox();
            this.cmd_dbFieldGroupValue = new System.Windows.Forms.Button(); //@@@: this.cmd_dbFieldGroupValue = new System.Windows.Forms.Button();
            this.label57 = new System.Windows.Forms.Label(); //@@@: this.label57 = new System.Windows.Forms.Label();
            this.tx_dbFieldGroupValue = new System.Windows.Forms.TextBox(); //@@@: this.tx_dbFieldGroupValue = new System.Windows.Forms.TextBox();
            this.chk_sort = new System.Windows.Forms.CheckBox(); //@@@: this.chk_sort = new System.Windows.Forms.CheckBox();
            this.chk_showOutlines = new System.Windows.Forms.CheckBox(); //@@@: this.chk_showOutlines = new System.Windows.Forms.CheckBox();
            this.chk_showBarValues = new System.Windows.Forms.CheckBox(); //@@@: this.chk_showBarValues = new System.Windows.Forms.CheckBox();
            this.label59 = new System.Windows.Forms.Label(); //@@@: this.label59 = new System.Windows.Forms.Label();
            this.tx_chartTop = new System.Windows.Forms.TextBox(); //@@@: this.tx_chartTop = new System.Windows.Forms.TextBox();
            this.label56 = new System.Windows.Forms.Label(); //@@@: this.label56 = new System.Windows.Forms.Label();
            this.cb_chartThickness = new System.Windows.Forms.ComboBox(); //@@@: this.cb_chartThickness = new System.Windows.Forms.ComboBox();
            this.label54 = new System.Windows.Forms.Label(); //@@@: this.label54 = new System.Windows.Forms.Label();
            this.cb_chartSize = new System.Windows.Forms.ComboBox(); //@@@: this.cb_chartSize = new System.Windows.Forms.ComboBox();
            this.label55 = new System.Windows.Forms.Label(); //@@@: this.label55 = new System.Windows.Forms.Label();
            this.cb_linesType = new System.Windows.Forms.ComboBox(); //@@@: this.cb_linesType = new System.Windows.Forms.ComboBox();
            this.label53 = new System.Windows.Forms.Label(); //@@@: this.label53 = new System.Windows.Forms.Label();
            this.cb_formatType = new System.Windows.Forms.ComboBox(); //@@@: this.cb_formatType = new System.Windows.Forms.ComboBox();
            this.label52 = new System.Windows.Forms.Label(); //@@@: this.label52 = new System.Windows.Forms.Label();
            this.cb_type = new System.Windows.Forms.ComboBox(); //@@@: this.cb_type = new System.Windows.Forms.ComboBox();
            this.cmd_apply = new System.Windows.Forms.Button(); //@@@: this.cmd_apply = new System.Windows.Forms.Button();
            this.cmd_cancel = new System.Windows.Forms.Button(); //@@@: this.cmd_cancel = new System.Windows.Forms.Button();
            this.colorDialog = new System.Windows.Forms.ColorDialog(); //@@@: this.colorDialog = new System.Windows.Forms.ColorDialog();
            this.fontDialog = new System.Windows.Forms.FontDialog(); //@@@: this.fontDialog = new System.Windows.Forms.FontDialog();
            this.panel1.SuspendLayout(); //@@@: this.panel1.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.tab_main.SuspendLayout(); //@@@: this.tab_main.SuspendLayout();
            this.tbpFormat.SuspendLayout(); //@@@: this.tbpFormat.SuspendLayout();
            this.tbpFormulas.SuspendLayout(); //@@@: this.tbpFormulas.SuspendLayout();
            this.groupBox3.SuspendLayout(); //@@@: this.groupBox3.SuspendLayout();
            this.groupBox2.SuspendLayout(); //@@@: this.groupBox2.SuspendLayout();
            this.groupBox1.SuspendLayout(); //@@@: this.groupBox1.SuspendLayout();
            this.tbpDatabase.SuspendLayout(); //@@@: this.tbpDatabase.SuspendLayout();
            this.tbpImage.SuspendLayout(); //@@@: this.tbpImage.SuspendLayout();
            this.panel2.SuspendLayout(); //@@@: this.panel2.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pic_image)).BeginInit();
            this.tbpBorders.SuspendLayout(); //@@@: this.tbpBorders.SuspendLayout();
            this.tbpChart.SuspendLayout(); //@@@: this.tbpChart.SuspendLayout();
            this.groupBox5.SuspendLayout(); //@@@: this.groupBox5.SuspendLayout();
            this.groupBox4.SuspendLayout(); //@@@: this.groupBox4.SuspendLayout();
            this.SuspendLayout(); //@@@: this.SuspendLayout();
            // 
            // panel1
            // 
            this.panel1.BackColor = System.Drawing.Color.White; //@@@: this.panel1.BackColor = System.Drawing.Color.White;
            this.panel1.Controls.Add(this.lb_control); //@@@: this.panel1.Controls.Add(this.lb_control);
            this.panel1.Controls.Add(this.pictureBox1); //@@@: this.panel1.Controls.Add(this.pictureBox1);
            this.panel1.Location = new System.Drawing.Point(0, 0); //@@@: this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1"; //@@@: this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(455, 70); //@@@: this.panel1.Size = new System.Drawing.Size(455, 70);
            this.panel1.TabIndex = 0; //@@@: this.panel1.TabIndex = 0;
            // 
            // lb_control
            // 
            this.lb_control.AutoSize = true; //@@@: this.lb_control.AutoSize = true;
            this.lb_control.Font = new System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ()); //@@@: this.lb_control.Font = new System.Drawing.Font("Microsoft Sans Serif", 24F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.lb_control.Location = new System.Drawing.Point(76, 18); //@@@: this.lb_control.Location = new System.Drawing.Point(76, 18);
            this.lb_control.Name = "lb_control"; //@@@: this.lb_control.Name = "lb_control";
            this.lb_control.Size = new System.Drawing.Size(232, 37); //@@@: this.lb_control.Size = new System.Drawing.Size(232, 37);
            this.lb_control.TabIndex = 2; //@@@: this.lb_control.TabIndex = 2;
            this.lb_control.Text = "lbControlName"; //@@@: this.lb_control.Text = "lbControlName";
            // 
            // pictureBox1
            // 
            this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page; //@@@: this.pictureBox1.Image = global::CSReportEditor.Properties.Resources.config_page;
            this.pictureBox1.Location = new System.Drawing.Point(24, 18); //@@@: this.pictureBox1.Location = new System.Drawing.Point(24, 18);
            this.pictureBox1.Name = "pictureBox1"; //@@@: this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(46, 39); //@@@: this.pictureBox1.Size = new System.Drawing.Size(46, 39);
            this.pictureBox1.TabIndex = 1; //@@@: this.pictureBox1.TabIndex = 1;
            this.pictureBox1.TabStop = false; //@@@: this.pictureBox1.TabStop = false;
            // 
            // tab_main
            // 
            this.tab_main.Controls.Add(this.tbpFormat); //@@@: this.tab_main.Controls.Add(this.tbpFormat);
            this.tab_main.Controls.Add(this.tbpFormulas); //@@@: this.tab_main.Controls.Add(this.tbpFormulas);
            this.tab_main.Controls.Add(this.tbpDatabase); //@@@: this.tab_main.Controls.Add(this.tbpDatabase);
            this.tab_main.Controls.Add(this.tbpImage); //@@@: this.tab_main.Controls.Add(this.tbpImage);
            this.tab_main.Controls.Add(this.tbpBorders); //@@@: this.tab_main.Controls.Add(this.tbpBorders);
            this.tab_main.Controls.Add(this.tbpChart); //@@@: this.tab_main.Controls.Add(this.tbpChart);
            this.tab_main.Location = new System.Drawing.Point(-3, 75); //@@@: this.tab_main.Location = new System.Drawing.Point(-3, 75);
            this.tab_main.Name = "tab_main"; //@@@: this.tab_main.Name = "tab_main";
            this.tab_main.SelectedIndex = 0; //@@@: this.tab_main.SelectedIndex = 0;
            this.tab_main.Size = new System.Drawing.Size(455, 509); //@@@: this.tab_main.Size = new System.Drawing.Size(455, 509);
            this.tab_main.TabIndex = 1; //@@@: this.tab_main.TabIndex = 1;
            // 
            // tbpFormat
            // 
            this.tbpFormat.Controls.Add(this.cmd_font); //@@@: this.tbpFormat.Controls.Add(this.cmd_font);
            this.tbpFormat.Controls.Add(this.cmd_backColor); //@@@: this.tbpFormat.Controls.Add(this.cmd_backColor);
            this.tbpFormat.Controls.Add(this.cmd_foreColor); //@@@: this.tbpFormat.Controls.Add(this.cmd_foreColor);
            this.tbpFormat.Controls.Add(this.label24); //@@@: this.tbpFormat.Controls.Add(this.label24);
            this.tbpFormat.Controls.Add(this.tx_exportColIdx); //@@@: this.tbpFormat.Controls.Add(this.tx_exportColIdx);
            this.tbpFormat.Controls.Add(this.label23); //@@@: this.tbpFormat.Controls.Add(this.label23);
            this.tbpFormat.Controls.Add(this.chk_isFreeCtrl); //@@@: this.tbpFormat.Controls.Add(this.chk_isFreeCtrl);
            this.tbpFormat.Controls.Add(this.label22); //@@@: this.tbpFormat.Controls.Add(this.label22);
            this.tbpFormat.Controls.Add(this.chk_wordWrap); //@@@: this.tbpFormat.Controls.Add(this.chk_wordWrap);
            this.tbpFormat.Controls.Add(this.chk_canGrow); //@@@: this.tbpFormat.Controls.Add(this.chk_canGrow);
            this.tbpFormat.Controls.Add(this.label21); //@@@: this.tbpFormat.Controls.Add(this.label21);
            this.tbpFormat.Controls.Add(this.label20); //@@@: this.tbpFormat.Controls.Add(this.label20);
            this.tbpFormat.Controls.Add(this.tx_width); //@@@: this.tbpFormat.Controls.Add(this.tx_width);
            this.tbpFormat.Controls.Add(this.label19); //@@@: this.tbpFormat.Controls.Add(this.label19);
            this.tbpFormat.Controls.Add(this.tx_height); //@@@: this.tbpFormat.Controls.Add(this.tx_height);
            this.tbpFormat.Controls.Add(this.label18); //@@@: this.tbpFormat.Controls.Add(this.label18);
            this.tbpFormat.Controls.Add(this.tx_top); //@@@: this.tbpFormat.Controls.Add(this.tx_top);
            this.tbpFormat.Controls.Add(this.label17); //@@@: this.tbpFormat.Controls.Add(this.label17);
            this.tbpFormat.Controls.Add(this.tx_left); //@@@: this.tbpFormat.Controls.Add(this.tx_left);
            this.tbpFormat.Controls.Add(this.label16); //@@@: this.tbpFormat.Controls.Add(this.label16);
            this.tbpFormat.Controls.Add(this.label15); //@@@: this.tbpFormat.Controls.Add(this.label15);
            this.tbpFormat.Controls.Add(this.label13); //@@@: this.tbpFormat.Controls.Add(this.label13);
            this.tbpFormat.Controls.Add(this.tx_symbol); //@@@: this.tbpFormat.Controls.Add(this.tx_symbol);
            this.tbpFormat.Controls.Add(this.label14); //@@@: this.tbpFormat.Controls.Add(this.label14);
            this.tbpFormat.Controls.Add(this.tx_format); //@@@: this.tbpFormat.Controls.Add(this.tx_format);
            this.tbpFormat.Controls.Add(this.chk_transparent); //@@@: this.tbpFormat.Controls.Add(this.chk_transparent);
            this.tbpFormat.Controls.Add(this.sh_backColor); //@@@: this.tbpFormat.Controls.Add(this.sh_backColor);
            this.tbpFormat.Controls.Add(this.label11); //@@@: this.tbpFormat.Controls.Add(this.label11);
            this.tbpFormat.Controls.Add(this.tx_backColor); //@@@: this.tbpFormat.Controls.Add(this.tx_backColor);
            this.tbpFormat.Controls.Add(this.chk_fontStrike); //@@@: this.tbpFormat.Controls.Add(this.chk_fontStrike);
            this.tbpFormat.Controls.Add(this.chk_fontItalic); //@@@: this.tbpFormat.Controls.Add(this.chk_fontItalic);
            this.tbpFormat.Controls.Add(this.sh_foreColor); //@@@: this.tbpFormat.Controls.Add(this.sh_foreColor);
            this.tbpFormat.Controls.Add(this.label9); //@@@: this.tbpFormat.Controls.Add(this.label9);
            this.tbpFormat.Controls.Add(this.tx_foreColor); //@@@: this.tbpFormat.Controls.Add(this.tx_foreColor);
            this.tbpFormat.Controls.Add(this.chk_fontUnderline); //@@@: this.tbpFormat.Controls.Add(this.chk_fontUnderline);
            this.tbpFormat.Controls.Add(this.chk_fontBold); //@@@: this.tbpFormat.Controls.Add(this.chk_fontBold);
            this.tbpFormat.Controls.Add(this.label8); //@@@: this.tbpFormat.Controls.Add(this.label8);
            this.tbpFormat.Controls.Add(this.cb_align); //@@@: this.tbpFormat.Controls.Add(this.cb_align);
            this.tbpFormat.Controls.Add(this.label7); //@@@: this.tbpFormat.Controls.Add(this.label7);
            this.tbpFormat.Controls.Add(this.tx_fontSize); //@@@: this.tbpFormat.Controls.Add(this.tx_fontSize);
            this.tbpFormat.Controls.Add(this.label6); //@@@: this.tbpFormat.Controls.Add(this.label6);
            this.tbpFormat.Controls.Add(this.tx_font); //@@@: this.tbpFormat.Controls.Add(this.tx_font);
            this.tbpFormat.Controls.Add(this.label5); //@@@: this.tbpFormat.Controls.Add(this.label5);
            this.tbpFormat.Controls.Add(this.tx_tag); //@@@: this.tbpFormat.Controls.Add(this.tx_tag);
            this.tbpFormat.Controls.Add(this.label4); //@@@: this.tbpFormat.Controls.Add(this.label4);
            this.tbpFormat.Controls.Add(this.tx_text); //@@@: this.tbpFormat.Controls.Add(this.tx_text);
            this.tbpFormat.Controls.Add(this.label3); //@@@: this.tbpFormat.Controls.Add(this.label3);
            this.tbpFormat.Controls.Add(this.label2); //@@@: this.tbpFormat.Controls.Add(this.label2);
            this.tbpFormat.Controls.Add(this.tx_name); //@@@: this.tbpFormat.Controls.Add(this.tx_name);
            this.tbpFormat.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpFormat.Location = new System.Drawing.Point(4, 22);
            this.tbpFormat.Name = "tbpFormat"; //@@@: this.tbpFormat.Name = "tbpFormat";
            this.tbpFormat.Padding = new System.Windows.Forms.Padding(3); //@@@: this.tbpFormat.Padding = new System.Windows.Forms.Padding(3);
            this.tbpFormat.Size = new System.Drawing.Size(447, 483); //@@@: this.tbpFormat.Size = new System.Drawing.Size(447, 483);
            this.tbpFormat.TabIndex = 0; //@@@: this.tbpFormat.TabIndex = 0;
            this.tbpFormat.Text = "Format"; //@@@: this.tbpFormat.Text = "Format";
            this.tbpFormat.UseVisualStyleBackColor = true; //@@@: this.tbpFormat.UseVisualStyleBackColor = true;
            // 
            // cmd_font
            // 
            this.cmd_font.Location = new System.Drawing.Point(275, 120); //@@@: this.cmd_font.Location = new System.Drawing.Point(275, 120);
            this.cmd_font.Name = "cmd_font"; //@@@: this.cmd_font.Name = "cmd_font";
            this.cmd_font.Size = new System.Drawing.Size(27, 23); //@@@: this.cmd_font.Size = new System.Drawing.Size(27, 23);
            this.cmd_font.TabIndex = 49; //@@@: this.cmd_font.TabIndex = 49;
            this.cmd_font.Text = "..."; //@@@: this.cmd_font.Text = "...";
            this.cmd_font.UseVisualStyleBackColor = true; //@@@: this.cmd_font.UseVisualStyleBackColor = true;
            this.cmd_font.Click += new System.EventHandler(this.cmd_font_Click); //@@@: this.cmd_font.Click += new System.EventHandler(this.cmd_font_Click);
            // 
            // cmd_backColor
            // 
            this.cmd_backColor.Location = new System.Drawing.Point(180, 197); //@@@: this.cmd_backColor.Location = new System.Drawing.Point(180, 197);
            this.cmd_backColor.Name = "cmd_backColor"; //@@@: this.cmd_backColor.Name = "cmd_backColor";
            this.cmd_backColor.Size = new System.Drawing.Size(27, 23); //@@@: this.cmd_backColor.Size = new System.Drawing.Size(27, 23);
            this.cmd_backColor.TabIndex = 48; //@@@: this.cmd_backColor.TabIndex = 48;
            this.cmd_backColor.Text = "..."; //@@@: this.cmd_backColor.Text = "...";
            this.cmd_backColor.UseVisualStyleBackColor = true; //@@@: this.cmd_backColor.UseVisualStyleBackColor = true;
            this.cmd_backColor.Click += new System.EventHandler(this.cmd_backColor_Click); //@@@: this.cmd_backColor.Click += new System.EventHandler(this.cmd_backColor_Click);
            // 
            // cmd_foreColor
            // 
            this.cmd_foreColor.Location = new System.Drawing.Point(180, 172); //@@@: this.cmd_foreColor.Location = new System.Drawing.Point(180, 172);
            this.cmd_foreColor.Name = "cmd_foreColor"; //@@@: this.cmd_foreColor.Name = "cmd_foreColor";
            this.cmd_foreColor.Size = new System.Drawing.Size(27, 23); //@@@: this.cmd_foreColor.Size = new System.Drawing.Size(27, 23);
            this.cmd_foreColor.TabIndex = 47; //@@@: this.cmd_foreColor.TabIndex = 47;
            this.cmd_foreColor.Text = "..."; //@@@: this.cmd_foreColor.Text = "...";
            this.cmd_foreColor.UseVisualStyleBackColor = true; //@@@: this.cmd_foreColor.UseVisualStyleBackColor = true;
            this.cmd_foreColor.Click += new System.EventHandler(this.cmd_foreColor_Click); //@@@: this.cmd_foreColor.Click += new System.EventHandler(this.cmd_foreColor_Click);
            // 
            // label24
            // 
            this.label24.AutoSize = true; //@@@: this.label24.AutoSize = true;
            this.label24.Location = new System.Drawing.Point(17, 447); //@@@: this.label24.Location = new System.Drawing.Point(17, 447);
            this.label24.Name = "label24"; //@@@: this.label24.Name = "label24";
            this.label24.Size = new System.Drawing.Size(157, 13); //@@@: this.label24.Size = new System.Drawing.Size(157, 13);
            this.label24.TabIndex = 46; //@@@: this.label24.TabIndex = 46;
            this.label24.Text = "Column export ID for this control"; //@@@: this.label24.Text = "Column export ID for this control";
            // 
            // tx_exportColIdx
            // 
            this.tx_exportColIdx.Location = new System.Drawing.Point(180, 444); //@@@: this.tx_exportColIdx.Location = new System.Drawing.Point(180, 444);
            this.tx_exportColIdx.Name = "tx_exportColIdx"; //@@@: this.tx_exportColIdx.Name = "tx_exportColIdx";
            this.tx_exportColIdx.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_exportColIdx.Size = new System.Drawing.Size(71, 20);
            this.tx_exportColIdx.TabIndex = 45; //@@@: this.tx_exportColIdx.TabIndex = 45;
            this.tx_exportColIdx.TextChanged += new System.EventHandler(this.tx_exportColIdx_TextChanged); //@@@: this.tx_exportColIdx.TextChanged += new System.EventHandler(this.tx_exportColIdx_TextChanged);
            // 
            // label23
            // 
            this.label23.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((()))); //@@@: this.label23.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label23.Location = new System.Drawing.Point(0, 429); //@@@: this.label23.Location = new System.Drawing.Point(0, 429);
            this.label23.Name = "label23"; //@@@: this.label23.Name = "label23";
            this.label23.Size = new System.Drawing.Size(449, 1); //@@@: this.label23.Size = new System.Drawing.Size(449, 1);
            this.label23.TabIndex = 44; //@@@: this.label23.TabIndex = 44;
            // 
            // chk_isFreeCtrl
            // 
            this.chk_isFreeCtrl.AutoSize = true; //@@@: this.chk_isFreeCtrl.AutoSize = true;
            this.chk_isFreeCtrl.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_isFreeCtrl.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_isFreeCtrl.Location = new System.Drawing.Point(20, 399); //@@@: this.chk_isFreeCtrl.Location = new System.Drawing.Point(20, 399);
            this.chk_isFreeCtrl.Name = "chk_isFreeCtrl"; //@@@: this.chk_isFreeCtrl.Name = "chk_isFreeCtrl";
            this.chk_isFreeCtrl.Size = new System.Drawing.Size(402, 17); //@@@: this.chk_isFreeCtrl.Size = new System.Drawing.Size(402, 17);
            this.chk_isFreeCtrl.TabIndex = 43; //@@@: this.chk_isFreeCtrl.TabIndex = 43;
            this.chk_isFreeCtrl.Text = "The control is in the back of the page ( the limit of the section doesn\'t apply t" + //@@@: this.chk_isFreeCtrl.Text = "The control is in the back of the page ( the limit of the section doesn\'t apply t" +
                "o it)"; //@@@: "o it)";
            this.chk_isFreeCtrl.UseVisualStyleBackColor = true; //@@@: this.chk_isFreeCtrl.UseVisualStyleBackColor = true;
            this.chk_isFreeCtrl.CheckedChanged += new System.EventHandler(this.chk_isFreeCtrl_CheckedChanged); //@@@: this.chk_isFreeCtrl.CheckedChanged += new System.EventHandler(this.chk_isFreeCtrl_CheckedChanged);
            // 
            // label22
            // 
            this.label22.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((()))); //@@@: this.label22.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label22.Location = new System.Drawing.Point(0, 382); //@@@: this.label22.Location = new System.Drawing.Point(0, 382);
            this.label22.Name = "label22"; //@@@: this.label22.Name = "label22";
            this.label22.Size = new System.Drawing.Size(449, 1); //@@@: this.label22.Size = new System.Drawing.Size(449, 1);
            this.label22.TabIndex = 42; //@@@: this.label22.TabIndex = 42;
            // 
            // chk_wordWrap
            // 
            this.chk_wordWrap.AutoSize = true; //@@@: this.chk_wordWrap.AutoSize = true;
            this.chk_wordWrap.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_wordWrap.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_wordWrap.Location = new System.Drawing.Point(287, 352); //@@@: this.chk_wordWrap.Location = new System.Drawing.Point(287, 352);
            this.chk_wordWrap.Name = "chk_wordWrap"; //@@@: this.chk_wordWrap.Name = "chk_wordWrap";
            this.chk_wordWrap.Size = new System.Drawing.Size(72, 17); //@@@: this.chk_wordWrap.Size = new System.Drawing.Size(72, 17);
            this.chk_wordWrap.TabIndex = 41; //@@@: this.chk_wordWrap.TabIndex = 41;
            this.chk_wordWrap.Text = "Wrap text"; //@@@: this.chk_wordWrap.Text = "Wrap text";
            this.chk_wordWrap.UseVisualStyleBackColor = true; //@@@: this.chk_wordWrap.UseVisualStyleBackColor = true;
            this.chk_wordWrap.CheckedChanged += new System.EventHandler(this.chk_wordWrap_CheckedChanged); //@@@: this.chk_wordWrap.CheckedChanged += new System.EventHandler(this.chk_wordWrap_CheckedChanged);
            // 
            // chk_canGrow
            // 
            this.chk_canGrow.AutoSize = true; //@@@: this.chk_canGrow.AutoSize = true;
            this.chk_canGrow.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_canGrow.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_canGrow.Location = new System.Drawing.Point(32, 352); //@@@: this.chk_canGrow.Location = new System.Drawing.Point(32, 352);
            this.chk_canGrow.Name = "chk_canGrow"; //@@@: this.chk_canGrow.Name = "chk_canGrow";
            this.chk_canGrow.Size = new System.Drawing.Size(127, 17); //@@@: this.chk_canGrow.Size = new System.Drawing.Size(127, 17);
            this.chk_canGrow.TabIndex = 40; //@@@: this.chk_canGrow.TabIndex = 40;
            this.chk_canGrow.Text = "The control can grow"; //@@@: this.chk_canGrow.Text = "The control can grow";
            this.chk_canGrow.UseVisualStyleBackColor = true; //@@@: this.chk_canGrow.UseVisualStyleBackColor = true;
            this.chk_canGrow.CheckedChanged += new System.EventHandler(this.chk_canGrow_CheckedChanged); //@@@: this.chk_canGrow.CheckedChanged += new System.EventHandler(this.chk_canGrow_CheckedChanged);
            // 
            // label21
            // 
            this.label21.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((()))); //@@@: this.label21.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label21.Location = new System.Drawing.Point(0, 336); //@@@: this.label21.Location = new System.Drawing.Point(0, 336);
            this.label21.Name = "label21"; //@@@: this.label21.Name = "label21";
            this.label21.Size = new System.Drawing.Size(449, 1); //@@@: this.label21.Size = new System.Drawing.Size(449, 1);
            this.label21.TabIndex = 39; //@@@: this.label21.TabIndex = 39;
            // 
            // label20
            // 
            this.label20.AutoSize = true; //@@@: this.label20.AutoSize = true;
            this.label20.Location = new System.Drawing.Point(245, 306); //@@@: this.label20.Location = new System.Drawing.Point(245, 306);
            this.label20.Name = "label20"; //@@@: this.label20.Name = "label20";
            this.label20.Size = new System.Drawing.Size(35, 13); //@@@: this.label20.Size = new System.Drawing.Size(35, 13);
            this.label20.TabIndex = 38; //@@@: this.label20.TabIndex = 38;
            this.label20.Text = "Width"; //@@@: this.label20.Text = "Width";
            // 
            // tx_width
            // 
            this.tx_width.Location = new System.Drawing.Point(287, 303); //@@@: this.tx_width.Location = new System.Drawing.Point(287, 303);
            this.tx_width.Name = "tx_width"; //@@@: this.tx_width.Name = "tx_width";
            this.tx_width.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_width.Size = new System.Drawing.Size(71, 20);
            this.tx_width.TabIndex = 37; //@@@: this.tx_width.TabIndex = 37;
            this.tx_width.TextChanged += new System.EventHandler(this.tx_width_TextChanged); //@@@: this.tx_width.TextChanged += new System.EventHandler(this.tx_width_TextChanged);
            // 
            // label19
            // 
            this.label19.AutoSize = true; //@@@: this.label19.AutoSize = true;
            this.label19.Location = new System.Drawing.Point(94, 306); //@@@: this.label19.Location = new System.Drawing.Point(94, 306);
            this.label19.Name = "label19"; //@@@: this.label19.Name = "label19";
            this.label19.Size = new System.Drawing.Size(38, 13); //@@@: this.label19.Size = new System.Drawing.Size(38, 13);
            this.label19.TabIndex = 36; //@@@: this.label19.TabIndex = 36;
            this.label19.Text = "Height"; //@@@: this.label19.Text = "Height";
            // 
            // tx_height
            // 
            this.tx_height.Location = new System.Drawing.Point(137, 303); //@@@: this.tx_height.Location = new System.Drawing.Point(137, 303);
            this.tx_height.Name = "tx_height"; //@@@: this.tx_height.Name = "tx_height";
            this.tx_height.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_height.Size = new System.Drawing.Size(71, 20);
            this.tx_height.TabIndex = 35; //@@@: this.tx_height.TabIndex = 35;
            this.tx_height.TextChanged += new System.EventHandler(this.tx_height_TextChanged); //@@@: this.tx_height.TextChanged += new System.EventHandler(this.tx_height_TextChanged);
            // 
            // label18
            // 
            this.label18.AutoSize = true; //@@@: this.label18.AutoSize = true;
            this.label18.Location = new System.Drawing.Point(245, 280); //@@@: this.label18.Location = new System.Drawing.Point(245, 280);
            this.label18.Name = "label18"; //@@@: this.label18.Name = "label18";
            this.label18.Size = new System.Drawing.Size(26, 13); //@@@: this.label18.Size = new System.Drawing.Size(26, 13);
            this.label18.TabIndex = 34; //@@@: this.label18.TabIndex = 34;
            this.label18.Text = "Top"; //@@@: this.label18.Text = "Top";
            // 
            // tx_top
            // 
            this.tx_top.Location = new System.Drawing.Point(287, 277); //@@@: this.tx_top.Location = new System.Drawing.Point(287, 277);
            this.tx_top.Name = "tx_top"; //@@@: this.tx_top.Name = "tx_top";
            this.tx_top.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_top.Size = new System.Drawing.Size(71, 20);
            this.tx_top.TabIndex = 33; //@@@: this.tx_top.TabIndex = 33;
            this.tx_top.TextChanged += new System.EventHandler(this.tx_top_TextChanged); //@@@: this.tx_top.TextChanged += new System.EventHandler(this.tx_top_TextChanged);
            // 
            // label17
            // 
            this.label17.AutoSize = true; //@@@: this.label17.AutoSize = true;
            this.label17.Location = new System.Drawing.Point(94, 280); //@@@: this.label17.Location = new System.Drawing.Point(94, 280);
            this.label17.Name = "label17"; //@@@: this.label17.Name = "label17";
            this.label17.Size = new System.Drawing.Size(25, 13); //@@@: this.label17.Size = new System.Drawing.Size(25, 13);
            this.label17.TabIndex = 32; //@@@: this.label17.TabIndex = 32;
            this.label17.Text = "Left"; //@@@: this.label17.Text = "Left";
            // 
            // tx_left
            // 
            this.tx_left.Location = new System.Drawing.Point(137, 277); //@@@: this.tx_left.Location = new System.Drawing.Point(137, 277);
            this.tx_left.Name = "tx_left"; //@@@: this.tx_left.Name = "tx_left";
            this.tx_left.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_left.Size = new System.Drawing.Size(71, 20);
            this.tx_left.TabIndex = 31; //@@@: this.tx_left.TabIndex = 31;
            this.tx_left.TextChanged += new System.EventHandler(this.tx_left_TextChanged); //@@@: this.tx_left.TextChanged += new System.EventHandler(this.tx_left_TextChanged);
            // 
            // label16
            // 
            this.label16.AutoSize = true; //@@@: this.label16.AutoSize = true;
            this.label16.Location = new System.Drawing.Point(17, 277); //@@@: this.label16.Location = new System.Drawing.Point(17, 277);
            this.label16.Name = "label16"; //@@@: this.label16.Name = "label16";
            this.label16.Size = new System.Drawing.Size(44, 13); //@@@: this.label16.Size = new System.Drawing.Size(44, 13);
            this.label16.TabIndex = 30; //@@@: this.label16.TabIndex = 30;
            this.label16.Text = "Position"; //@@@: this.label16.Text = "Position";
            // 
            // label15
            // 
            this.label15.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((()))); //@@@: this.label15.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label15.Location = new System.Drawing.Point(0, 262); //@@@: this.label15.Location = new System.Drawing.Point(0, 262);
            this.label15.Name = "label15"; //@@@: this.label15.Name = "label15";
            this.label15.Size = new System.Drawing.Size(449, 1); //@@@: this.label15.Size = new System.Drawing.Size(449, 1);
            this.label15.TabIndex = 29; //@@@: this.label15.TabIndex = 29;
            // 
            // label13
            // 
            this.label13.AutoSize = true; //@@@: this.label13.AutoSize = true;
            this.label13.Location = new System.Drawing.Point(299, 228); //@@@: this.label13.Location = new System.Drawing.Point(299, 228);
            this.label13.Name = "label13"; //@@@: this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(41, 13); //@@@: this.label13.Size = new System.Drawing.Size(41, 13);
            this.label13.TabIndex = 28; //@@@: this.label13.TabIndex = 28;
            this.label13.Text = "Symbol"; //@@@: this.label13.Text = "Symbol";
            // 
            // tx_symbol
            // 
            this.tx_symbol.Location = new System.Drawing.Point(341, 225); //@@@: this.tx_symbol.Location = new System.Drawing.Point(341, 225);
            this.tx_symbol.Name = "tx_symbol"; //@@@: this.tx_symbol.Name = "tx_symbol";
            this.tx_symbol.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_symbol.Size = new System.Drawing.Size(71, 20);
            this.tx_symbol.TabIndex = 27; //@@@: this.tx_symbol.TabIndex = 27;
            this.tx_symbol.TextChanged += new System.EventHandler(this.tx_symbol_TextChanged); //@@@: this.tx_symbol.TextChanged += new System.EventHandler(this.tx_symbol_TextChanged);
            // 
            // label14
            // 
            this.label14.AutoSize = true; //@@@: this.label14.AutoSize = true;
            this.label14.Location = new System.Drawing.Point(17, 228); //@@@: this.label14.Location = new System.Drawing.Point(17, 228);
            this.label14.Name = "label14"; //@@@: this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(39, 13); //@@@: this.label14.Size = new System.Drawing.Size(39, 13);
            this.label14.TabIndex = 26; //@@@: this.label14.TabIndex = 26;
            this.label14.Text = "Format"; //@@@: this.label14.Text = "Format";
            // 
            // tx_format
            // 
            this.tx_format.Location = new System.Drawing.Point(77, 225); //@@@: this.tx_format.Location = new System.Drawing.Point(77, 225);
            this.tx_format.Name = "tx_format"; //@@@: this.tx_format.Name = "tx_format";
            this.tx_format.Size = new System.Drawing.Size(216, 20); //@@@: this.tx_format.Size = new System.Drawing.Size(216, 20);
            this.tx_format.TabIndex = 25; //@@@: this.tx_format.TabIndex = 25;
            this.tx_format.TextChanged += new System.EventHandler(this.tx_format_TextChanged); //@@@: this.tx_format.TextChanged += new System.EventHandler(this.tx_format_TextChanged);
            // 
            // chk_transparent
            // 
            this.chk_transparent.AutoSize = true; //@@@: this.chk_transparent.AutoSize = true;
            this.chk_transparent.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_transparent.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_transparent.Location = new System.Drawing.Point(246, 202); //@@@: this.chk_transparent.Location = new System.Drawing.Point(246, 202);
            this.chk_transparent.Name = "chk_transparent"; //@@@: this.chk_transparent.Name = "chk_transparent";
            this.chk_transparent.Size = new System.Drawing.Size(83, 17); //@@@: this.chk_transparent.Size = new System.Drawing.Size(83, 17);
            this.chk_transparent.TabIndex = 24; //@@@: this.chk_transparent.TabIndex = 24;
            this.chk_transparent.Text = "Transparent"; //@@@: this.chk_transparent.Text = "Transparent";
            this.chk_transparent.UseVisualStyleBackColor = true; //@@@: this.chk_transparent.UseVisualStyleBackColor = true;
            // 
            // sh_backColor
            // 
            this.sh_backColor.BackColor = System.Drawing.Color.White; //@@@: this.sh_backColor.BackColor = System.Drawing.Color.White;
            this.sh_backColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle; //@@@: this.sh_backColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_backColor.Location = new System.Drawing.Point(213, 201); //@@@: this.sh_backColor.Location = new System.Drawing.Point(213, 201);
            this.sh_backColor.Name = "sh_backColor"; //@@@: this.sh_backColor.Name = "sh_backColor";
            this.sh_backColor.Size = new System.Drawing.Size(20, 17); //@@@: this.sh_backColor.Size = new System.Drawing.Size(20, 17);
            this.sh_backColor.TabIndex = 23; //@@@: this.sh_backColor.TabIndex = 23;
            // 
            // label11
            // 
            this.label11.AutoSize = true; //@@@: this.label11.AutoSize = true;
            this.label11.Location = new System.Drawing.Point(17, 202); //@@@: this.label11.Location = new System.Drawing.Point(17, 202);
            this.label11.Name = "label11"; //@@@: this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(58, 13); //@@@: this.label11.Size = new System.Drawing.Size(58, 13);
            this.label11.TabIndex = 22; //@@@: this.label11.TabIndex = 22;
            this.label11.Text = "Back color"; //@@@: this.label11.Text = "Back color";
            // 
            // tx_backColor
            // 
            this.tx_backColor.Location = new System.Drawing.Point(77, 199); //@@@: this.tx_backColor.Location = new System.Drawing.Point(77, 199);
            this.tx_backColor.Name = "tx_backColor"; //@@@: this.tx_backColor.Name = "tx_backColor";
            this.tx_backColor.Size = new System.Drawing.Size(97, 20); //@@@: this.tx_backColor.Size = new System.Drawing.Size(97, 20);
            this.tx_backColor.TabIndex = 21; //@@@: this.tx_backColor.TabIndex = 21;
            this.tx_backColor.TextChanged += new System.EventHandler(this.tx_backColor_TextChanged); //@@@: this.tx_backColor.TextChanged += new System.EventHandler(this.tx_backColor_TextChanged);
            // 
            // chk_fontStrike
            // 
            this.chk_fontStrike.AutoSize = true; //@@@: this.chk_fontStrike.AutoSize = true;
            this.chk_fontStrike.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_fontStrike.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontStrike.Location = new System.Drawing.Point(359, 175); //@@@: this.chk_fontStrike.Location = new System.Drawing.Point(359, 175);
            this.chk_fontStrike.Name = "chk_fontStrike"; //@@@: this.chk_fontStrike.Name = "chk_fontStrike";
            this.chk_fontStrike.Size = new System.Drawing.Size(53, 17); //@@@: this.chk_fontStrike.Size = new System.Drawing.Size(53, 17);
            this.chk_fontStrike.TabIndex = 20; //@@@: this.chk_fontStrike.TabIndex = 20;
            this.chk_fontStrike.Text = "Strike"; //@@@: this.chk_fontStrike.Text = "Strike";
            this.chk_fontStrike.UseVisualStyleBackColor = true; //@@@: this.chk_fontStrike.UseVisualStyleBackColor = true;
            this.chk_fontStrike.CheckedChanged += new System.EventHandler(this.chk_fontStrike_CheckedChanged); //@@@: this.chk_fontStrike.CheckedChanged += new System.EventHandler(this.chk_fontStrike_CheckedChanged);
            // 
            // chk_fontItalic
            // 
            this.chk_fontItalic.AutoSize = true; //@@@: this.chk_fontItalic.AutoSize = true;
            this.chk_fontItalic.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_fontItalic.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontItalic.Location = new System.Drawing.Point(245, 176); //@@@: this.chk_fontItalic.Location = new System.Drawing.Point(245, 176);
            this.chk_fontItalic.Name = "chk_fontItalic"; //@@@: this.chk_fontItalic.Name = "chk_fontItalic";
            this.chk_fontItalic.Size = new System.Drawing.Size(48, 17); //@@@: this.chk_fontItalic.Size = new System.Drawing.Size(48, 17);
            this.chk_fontItalic.TabIndex = 19; //@@@: this.chk_fontItalic.TabIndex = 19;
            this.chk_fontItalic.Text = "Italic"; //@@@: this.chk_fontItalic.Text = "Italic";
            this.chk_fontItalic.UseVisualStyleBackColor = true; //@@@: this.chk_fontItalic.UseVisualStyleBackColor = true;
            this.chk_fontItalic.CheckedChanged += new System.EventHandler(this.chk_fontItalic_CheckedChanged); //@@@: this.chk_fontItalic.CheckedChanged += new System.EventHandler(this.chk_fontItalic_CheckedChanged);
            // 
            // sh_foreColor
            // 
            this.sh_foreColor.BackColor = System.Drawing.Color.Black; //@@@: this.sh_foreColor.BackColor = System.Drawing.Color.Black;
            this.sh_foreColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle; //@@@: this.sh_foreColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_foreColor.Location = new System.Drawing.Point(213, 176); //@@@: this.sh_foreColor.Location = new System.Drawing.Point(213, 176);
            this.sh_foreColor.Name = "sh_foreColor"; //@@@: this.sh_foreColor.Name = "sh_foreColor";
            this.sh_foreColor.Size = new System.Drawing.Size(20, 17); //@@@: this.sh_foreColor.Size = new System.Drawing.Size(20, 17);
            this.sh_foreColor.TabIndex = 18; //@@@: this.sh_foreColor.TabIndex = 18;
            // 
            // label9
            // 
            this.label9.AutoSize = true; //@@@: this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(17, 176); //@@@: this.label9.Location = new System.Drawing.Point(17, 176);
            this.label9.Name = "label9"; //@@@: this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(54, 13); //@@@: this.label9.Size = new System.Drawing.Size(54, 13);
            this.label9.TabIndex = 17; //@@@: this.label9.TabIndex = 17;
            this.label9.Text = "Text color"; //@@@: this.label9.Text = "Text color";
            // 
            // tx_foreColor
            // 
            this.tx_foreColor.Location = new System.Drawing.Point(77, 173); //@@@: this.tx_foreColor.Location = new System.Drawing.Point(77, 173);
            this.tx_foreColor.Name = "tx_foreColor"; //@@@: this.tx_foreColor.Name = "tx_foreColor";
            this.tx_foreColor.Size = new System.Drawing.Size(97, 20); //@@@: this.tx_foreColor.Size = new System.Drawing.Size(97, 20);
            this.tx_foreColor.TabIndex = 16; //@@@: this.tx_foreColor.TabIndex = 16;
            this.tx_foreColor.TextChanged += new System.EventHandler(this.tx_foreColor_TextChanged); //@@@: this.tx_foreColor.TextChanged += new System.EventHandler(this.tx_foreColor_TextChanged);
            // 
            // chk_fontUnderline
            // 
            this.chk_fontUnderline.AutoSize = true; //@@@: this.chk_fontUnderline.AutoSize = true;
            this.chk_fontUnderline.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_fontUnderline.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontUnderline.Location = new System.Drawing.Point(341, 150); //@@@: this.chk_fontUnderline.Location = new System.Drawing.Point(341, 150);
            this.chk_fontUnderline.Name = "chk_fontUnderline"; //@@@: this.chk_fontUnderline.Name = "chk_fontUnderline";
            this.chk_fontUnderline.Size = new System.Drawing.Size(71, 17); //@@@: this.chk_fontUnderline.Size = new System.Drawing.Size(71, 17);
            this.chk_fontUnderline.TabIndex = 15; //@@@: this.chk_fontUnderline.TabIndex = 15;
            this.chk_fontUnderline.Text = "Underline"; //@@@: this.chk_fontUnderline.Text = "Underline";
            this.chk_fontUnderline.UseVisualStyleBackColor = true; //@@@: this.chk_fontUnderline.UseVisualStyleBackColor = true;
            this.chk_fontUnderline.CheckedChanged += new System.EventHandler(this.chk_fontUnderline_CheckedChanged); //@@@: this.chk_fontUnderline.CheckedChanged += new System.EventHandler(this.chk_fontUnderline_CheckedChanged);
            // 
            // chk_fontBold
            // 
            this.chk_fontBold.AutoSize = true; //@@@: this.chk_fontBold.AutoSize = true;
            this.chk_fontBold.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_fontBold.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_fontBold.Location = new System.Drawing.Point(246, 150); //@@@: this.chk_fontBold.Location = new System.Drawing.Point(246, 150);
            this.chk_fontBold.Name = "chk_fontBold"; //@@@: this.chk_fontBold.Name = "chk_fontBold";
            this.chk_fontBold.Size = new System.Drawing.Size(47, 17); //@@@: this.chk_fontBold.Size = new System.Drawing.Size(47, 17);
            this.chk_fontBold.TabIndex = 14; //@@@: this.chk_fontBold.TabIndex = 14;
            this.chk_fontBold.Text = "Bold"; //@@@: this.chk_fontBold.Text = "Bold";
            this.chk_fontBold.UseVisualStyleBackColor = true; //@@@: this.chk_fontBold.UseVisualStyleBackColor = true;
            this.chk_fontBold.CheckedChanged += new System.EventHandler(this.chk_fontBold_CheckedChanged); //@@@: this.chk_fontBold.CheckedChanged += new System.EventHandler(this.chk_fontBold_CheckedChanged);
            // 
            // label8
            // 
            this.label8.AutoSize = true; //@@@: this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(17, 149); //@@@: this.label8.Location = new System.Drawing.Point(17, 149);
            this.label8.Name = "label8"; //@@@: this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(30, 13); //@@@: this.label8.Size = new System.Drawing.Size(30, 13);
            this.label8.TabIndex = 13; //@@@: this.label8.TabIndex = 13;
            this.label8.Text = "Align"; //@@@: this.label8.Text = "Align";
            // 
            // cb_align
            // 
            this.cb_align.FormattingEnabled = true; //@@@: this.cb_align.FormattingEnabled = true;
            this.cb_align.Location = new System.Drawing.Point(77, 146); //@@@: this.cb_align.Location = new System.Drawing.Point(77, 146);
            this.cb_align.Name = "cb_align"; //@@@: this.cb_align.Name = "cb_align";
            this.cb_align.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_align.Size = new System.Drawing.Size(121, 21);
            this.cb_align.TabIndex = 12; //@@@: this.cb_align.TabIndex = 12;
            this.cb_align.SelectedIndexChanged += new System.EventHandler(this.cb_align_SelectedIndexChanged); //@@@: this.cb_align.SelectedIndexChanged += new System.EventHandler(this.cb_align_SelectedIndexChanged);
            this.cb_align.Click += new System.EventHandler(this.cb_align_Click); //@@@: this.cb_align.Click += new System.EventHandler(this.cb_align_Click);
            // 
            // label7
            // 
            this.label7.AutoSize = true; //@@@: this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(308, 123); //@@@: this.label7.Location = new System.Drawing.Point(308, 123);
            this.label7.Name = "label7"; //@@@: this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(27, 13); //@@@: this.label7.Size = new System.Drawing.Size(27, 13);
            this.label7.TabIndex = 10; //@@@: this.label7.TabIndex = 10;
            this.label7.Text = "Size"; //@@@: this.label7.Text = "Size";
            // 
            // tx_fontSize
            // 
            this.tx_fontSize.Location = new System.Drawing.Point(341, 120); //@@@: this.tx_fontSize.Location = new System.Drawing.Point(341, 120);
            this.tx_fontSize.Name = "tx_fontSize"; //@@@: this.tx_fontSize.Name = "tx_fontSize";
            this.tx_fontSize.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_fontSize.Size = new System.Drawing.Size(71, 20);
            this.tx_fontSize.TabIndex = 9; //@@@: this.tx_fontSize.TabIndex = 9;
            this.tx_fontSize.TextChanged += new System.EventHandler(this.tx_fontSize_TextChanged); //@@@: this.tx_fontSize.TextChanged += new System.EventHandler(this.tx_fontSize_TextChanged);
            // 
            // label6
            // 
            this.label6.AutoSize = true; //@@@: this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(17, 123); //@@@: this.label6.Location = new System.Drawing.Point(17, 123);
            this.label6.Name = "label6"; //@@@: this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(28, 13); //@@@: this.label6.Size = new System.Drawing.Size(28, 13);
            this.label6.TabIndex = 8; //@@@: this.label6.TabIndex = 8;
            this.label6.Text = "Font"; //@@@: this.label6.Text = "Font";
            // 
            // tx_font
            // 
            this.tx_font.Location = new System.Drawing.Point(77, 120); //@@@: this.tx_font.Location = new System.Drawing.Point(77, 120);
            this.tx_font.Name = "tx_font"; //@@@: this.tx_font.Name = "tx_font";
            this.tx_font.Size = new System.Drawing.Size(194, 20); //@@@: this.tx_font.Size = new System.Drawing.Size(194, 20);
            this.tx_font.TabIndex = 7; //@@@: this.tx_font.TabIndex = 7;
            this.tx_font.TextChanged += new System.EventHandler(this.tx_font_TextChanged); //@@@: this.tx_font.TextChanged += new System.EventHandler(this.tx_font_TextChanged);
            // 
            // label5
            // 
            this.label5.AutoSize = true; //@@@: this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(17, 97); //@@@: this.label5.Location = new System.Drawing.Point(17, 97);
            this.label5.Name = "label5"; //@@@: this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(26, 13); //@@@: this.label5.Size = new System.Drawing.Size(26, 13);
            this.label5.TabIndex = 6; //@@@: this.label5.TabIndex = 6;
            this.label5.Text = "Tag"; //@@@: this.label5.Text = "Tag";
            // 
            // tx_tag
            // 
            this.tx_tag.Location = new System.Drawing.Point(77, 94); //@@@: this.tx_tag.Location = new System.Drawing.Point(77, 94);
            this.tx_tag.Name = "tx_tag"; //@@@: this.tx_tag.Name = "tx_tag";
            this.tx_tag.Size = new System.Drawing.Size(335, 20); //@@@: this.tx_tag.Size = new System.Drawing.Size(335, 20);
            this.tx_tag.TabIndex = 5; //@@@: this.tx_tag.TabIndex = 5;
            this.tx_tag.TextChanged += new System.EventHandler(this.tx_tag_TextChanged); //@@@: this.tx_tag.TextChanged += new System.EventHandler(this.tx_tag_TextChanged);
            // 
            // label4
            // 
            this.label4.AutoSize = true; //@@@: this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(17, 71); //@@@: this.label4.Location = new System.Drawing.Point(17, 71);
            this.label4.Name = "label4"; //@@@: this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(28, 13); //@@@: this.label4.Size = new System.Drawing.Size(28, 13);
            this.label4.TabIndex = 4; //@@@: this.label4.TabIndex = 4;
            this.label4.Text = "Text"; //@@@: this.label4.Text = "Text";
            // 
            // tx_text
            // 
            this.tx_text.Location = new System.Drawing.Point(77, 68); //@@@: this.tx_text.Location = new System.Drawing.Point(77, 68);
            this.tx_text.Name = "tx_text"; //@@@: this.tx_text.Name = "tx_text";
            this.tx_text.Size = new System.Drawing.Size(335, 20); //@@@: this.tx_text.Size = new System.Drawing.Size(335, 20);
            this.tx_text.TabIndex = 3; //@@@: this.tx_text.TabIndex = 3;
            this.tx_text.TextChanged += new System.EventHandler(this.tx_text_TextChanged); //@@@: this.tx_text.TextChanged += new System.EventHandler(this.tx_text_TextChanged);
            // 
            // label3
            // 
            this.label3.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((()))); //@@@: this.label3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label3.Location = new System.Drawing.Point(0, 49); //@@@: this.label3.Location = new System.Drawing.Point(0, 49);
            this.label3.Name = "label3"; //@@@: this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(449, 1); //@@@: this.label3.Size = new System.Drawing.Size(449, 1);
            this.label3.TabIndex = 2; //@@@: this.label3.TabIndex = 2;
            // 
            // label2
            // 
            this.label2.AutoSize = true; //@@@: this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(17, 17); //@@@: this.label2.Location = new System.Drawing.Point(17, 17);
            this.label2.Name = "label2"; //@@@: this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(35, 13); //@@@: this.label2.Size = new System.Drawing.Size(35, 13);
            this.label2.TabIndex = 1; //@@@: this.label2.TabIndex = 1;
            this.label2.Text = "Name"; //@@@: this.label2.Text = "Name";
            // 
            // tx_name
            // 
            this.tx_name.Location = new System.Drawing.Point(77, 14); //@@@: this.tx_name.Location = new System.Drawing.Point(77, 14);
            this.tx_name.Name = "tx_name"; //@@@: this.tx_name.Name = "tx_name";
            this.tx_name.Size = new System.Drawing.Size(335, 20); //@@@: this.tx_name.Size = new System.Drawing.Size(335, 20);
            this.tx_name.TabIndex = 0; //@@@: this.tx_name.TabIndex = 0;
            this.tx_name.TextChanged += new System.EventHandler(this.tx_name_TextChanged); //@@@: this.tx_name.TextChanged += new System.EventHandler(this.tx_name_TextChanged);
            // 
            // tbpFormulas
            // 
            this.tbpFormulas.Controls.Add(this.groupBox3); //@@@: this.tbpFormulas.Controls.Add(this.groupBox3);
            this.tbpFormulas.Controls.Add(this.label40); //@@@: this.tbpFormulas.Controls.Add(this.label40);
            this.tbpFormulas.Controls.Add(this.label39); //@@@: this.tbpFormulas.Controls.Add(this.label39);
            this.tbpFormulas.Controls.Add(this.tx_idxGroup); //@@@: this.tbpFormulas.Controls.Add(this.tx_idxGroup);
            this.tbpFormulas.Controls.Add(this.label37); //@@@: this.tbpFormulas.Controls.Add(this.label37);
            this.tbpFormulas.Controls.Add(this.label38); //@@@: this.tbpFormulas.Controls.Add(this.label38);
            this.tbpFormulas.Controls.Add(this.label35); //@@@: this.tbpFormulas.Controls.Add(this.label35);
            this.tbpFormulas.Controls.Add(this.label36); //@@@: this.tbpFormulas.Controls.Add(this.label36);
            this.tbpFormulas.Controls.Add(this.label33); //@@@: this.tbpFormulas.Controls.Add(this.label33);
            this.tbpFormulas.Controls.Add(this.label34); //@@@: this.tbpFormulas.Controls.Add(this.label34);
            this.tbpFormulas.Controls.Add(this.label31); //@@@: this.tbpFormulas.Controls.Add(this.label31);
            this.tbpFormulas.Controls.Add(this.label32); //@@@: this.tbpFormulas.Controls.Add(this.label32);
            this.tbpFormulas.Controls.Add(this.label30); //@@@: this.tbpFormulas.Controls.Add(this.label30);
            this.tbpFormulas.Controls.Add(this.label29); //@@@: this.tbpFormulas.Controls.Add(this.label29);
            this.tbpFormulas.Controls.Add(this.label28); //@@@: this.tbpFormulas.Controls.Add(this.label28);
            this.tbpFormulas.Controls.Add(this.groupBox2); //@@@: this.tbpFormulas.Controls.Add(this.groupBox2);
            this.tbpFormulas.Controls.Add(this.chk_formulaValue); //@@@: this.tbpFormulas.Controls.Add(this.chk_formulaValue);
            this.tbpFormulas.Controls.Add(this.cmd_formulaValue); //@@@: this.tbpFormulas.Controls.Add(this.cmd_formulaValue);
            this.tbpFormulas.Controls.Add(this.groupBox1); //@@@: this.tbpFormulas.Controls.Add(this.groupBox1);
            this.tbpFormulas.Controls.Add(this.label25); //@@@: this.tbpFormulas.Controls.Add(this.label25);
            this.tbpFormulas.Controls.Add(this.chk_formulaHide); //@@@: this.tbpFormulas.Controls.Add(this.chk_formulaHide);
            this.tbpFormulas.Controls.Add(this.cmd_formulaHide); //@@@: this.tbpFormulas.Controls.Add(this.cmd_formulaHide);
            this.tbpFormulas.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpFormulas.Location = new System.Drawing.Point(4, 22);
            this.tbpFormulas.Name = "tbpFormulas"; //@@@: this.tbpFormulas.Name = "tbpFormulas";
            this.tbpFormulas.Padding = new System.Windows.Forms.Padding(3); //@@@: this.tbpFormulas.Padding = new System.Windows.Forms.Padding(3);
            this.tbpFormulas.Size = new System.Drawing.Size(447, 483); //@@@: this.tbpFormulas.Size = new System.Drawing.Size(447, 483);
            this.tbpFormulas.TabIndex = 1; //@@@: this.tbpFormulas.TabIndex = 1;
            this.tbpFormulas.Text = "Formulas"; //@@@: this.tbpFormulas.Text = "Formulas";
            this.tbpFormulas.UseVisualStyleBackColor = true; //@@@: this.tbpFormulas.UseVisualStyleBackColor = true;
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.label41); //@@@: this.groupBox3.Controls.Add(this.label41);
            this.groupBox3.Controls.Add(this.op_afterPrint); //@@@: this.groupBox3.Controls.Add(this.op_afterPrint);
            this.groupBox3.Controls.Add(this.op_beforePrint); //@@@: this.groupBox3.Controls.Add(this.op_beforePrint);
            this.groupBox3.Location = new System.Drawing.Point(11, 338); //@@@: this.groupBox3.Location = new System.Drawing.Point(11, 338);
            this.groupBox3.Name = "groupBox3"; //@@@: this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(423, 43); //@@@: this.groupBox3.Size = new System.Drawing.Size(423, 43);
            this.groupBox3.TabIndex = 48; //@@@: this.groupBox3.TabIndex = 48;
            this.groupBox3.TabStop = false; //@@@: this.groupBox3.TabStop = false;
            // 
            // label41
            // 
            this.label41.AutoSize = true; //@@@: this.label41.AutoSize = true;
            this.label41.Location = new System.Drawing.Point(11, 17); //@@@: this.label41.Location = new System.Drawing.Point(11, 17);
            this.label41.Name = "label41"; //@@@: this.label41.Name = "label41";
            this.label41.Size = new System.Drawing.Size(46, 13); //@@@: this.label41.Size = new System.Drawing.Size(46, 13);
            this.label41.TabIndex = 49; //@@@: this.label41.TabIndex = 49;
            this.label41.Text = "Execute"; //@@@: this.label41.Text = "Execute";
            // 
            // op_afterPrint
            // 
            this.op_afterPrint.AutoSize = true; //@@@: this.op_afterPrint.AutoSize = true;
            this.op_afterPrint.Location = new System.Drawing.Point(132, 15); //@@@: this.op_afterPrint.Location = new System.Drawing.Point(132, 15);
            this.op_afterPrint.Name = "op_afterPrint"; //@@@: this.op_afterPrint.Name = "op_afterPrint";
            this.op_afterPrint.Size = new System.Drawing.Size(120, 17); //@@@: this.op_afterPrint.Size = new System.Drawing.Size(120, 17);
            this.op_afterPrint.TabIndex = 1; //@@@: this.op_afterPrint.TabIndex = 1;
            this.op_afterPrint.TabStop = true; //@@@: this.op_afterPrint.TabStop = true;
            this.op_afterPrint.Text = "after printing the line"; //@@@: this.op_afterPrint.Text = "after printing the line";
            this.op_afterPrint.UseVisualStyleBackColor = true; //@@@: this.op_afterPrint.UseVisualStyleBackColor = true;
            // 
            // op_beforePrint
            // 
            this.op_beforePrint.AutoSize = true; //@@@: this.op_beforePrint.AutoSize = true;
            this.op_beforePrint.Location = new System.Drawing.Point(59, 15); //@@@: this.op_beforePrint.Location = new System.Drawing.Point(59, 15);
            this.op_beforePrint.Name = "op_beforePrint"; //@@@: this.op_beforePrint.Name = "op_beforePrint";
            this.op_beforePrint.Size = new System.Drawing.Size(67, 17); //@@@: this.op_beforePrint.Size = new System.Drawing.Size(67, 17);
            this.op_beforePrint.TabIndex = 0; //@@@: this.op_beforePrint.TabIndex = 0;
            this.op_beforePrint.TabStop = true; //@@@: this.op_beforePrint.TabStop = true;
            this.op_beforePrint.Text = "before or"; //@@@: this.op_beforePrint.Text = "before or";
            this.op_beforePrint.UseVisualStyleBackColor = true; //@@@: this.op_beforePrint.UseVisualStyleBackColor = true;
            // 
            // label40
            // 
            this.label40.BackColor = System.Drawing.Color.FromArgb(((())), ((())), ((()))); //@@@: this.label40.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(224)))), ((int)(((byte)(224)))), ((int)(((byte)(224)))));
            this.label40.Location = new System.Drawing.Point(2, 153); //@@@: this.label40.Location = new System.Drawing.Point(2, 153);
            this.label40.Name = "label40"; //@@@: this.label40.Name = "label40";
            this.label40.Size = new System.Drawing.Size(449, 1); //@@@: this.label40.Size = new System.Drawing.Size(449, 1);
            this.label40.TabIndex = 47; //@@@: this.label40.TabIndex = 47;
            // 
            // label39
            // 
            this.label39.AutoSize = true; //@@@: this.label39.AutoSize = true;
            this.label39.Location = new System.Drawing.Point(17, 320); //@@@: this.label39.Location = new System.Drawing.Point(17, 320);
            this.label39.Name = "label39"; //@@@: this.label39.Name = "label39";
            this.label39.Size = new System.Drawing.Size(132, 13); //@@@: this.label39.Size = new System.Drawing.Size(132, 13);
            this.label39.TabIndex = 46; //@@@: this.label39.TabIndex = 46;
            this.label39.Text = "Execute only on this group"; //@@@: this.label39.Text = "Execute only on this group";
            // 
            // tx_idxGroup
            // 
            this.tx_idxGroup.Location = new System.Drawing.Point(156, 317); //@@@: this.tx_idxGroup.Location = new System.Drawing.Point(156, 317);
            this.tx_idxGroup.Name = "tx_idxGroup"; //@@@: this.tx_idxGroup.Name = "tx_idxGroup";
            this.tx_idxGroup.Size = new System.Drawing.Size(45, 20); //@@@: this.tx_idxGroup.Size = new System.Drawing.Size(45, 20);
            this.tx_idxGroup.TabIndex = 45; //@@@: this.tx_idxGroup.TabIndex = 45;
            // 
            // label37
            // 
            this.label37.ForeColor = System.Drawing.Color.Red; //@@@: this.label37.ForeColor = System.Drawing.Color.Red;
            this.label37.Location = new System.Drawing.Point(69, 299); //@@@: this.label37.Location = new System.Drawing.Point(69, 299);
            this.label37.Name = "label37"; //@@@: this.label37.Name = "label37";
            this.label37.Size = new System.Drawing.Size(344, 32); //@@@: this.label37.Size = new System.Drawing.Size(344, 32);
            this.label37.TabIndex = 44; //@@@: this.label37.TabIndex = 44;
            this.label37.Text = "for a formula which is located in footer setcions"; //@@@: this.label37.Text = "for a formula which is located in footer setcions";
            // 
            // label38
            // 
            this.label38.ForeColor = System.Drawing.Color.Red; //@@@: this.label38.ForeColor = System.Drawing.Color.Red;
            this.label38.Location = new System.Drawing.Point(22, 299); //@@@: this.label38.Location = new System.Drawing.Point(22, 299);
            this.label38.Name = "label38"; //@@@: this.label38.Name = "label38";
            this.label38.Size = new System.Drawing.Size(59, 19); //@@@: this.label38.Size = new System.Drawing.Size(59, 19);
            this.label38.TabIndex = 43; //@@@: this.label38.TabIndex = 43;
            this.label38.Text = "-2001"; //@@@: this.label38.Text = "-2001";
            // 
            // label35
            // 
            this.label35.ForeColor = System.Drawing.Color.Red; //@@@: this.label35.ForeColor = System.Drawing.Color.Red;
            this.label35.Location = new System.Drawing.Point(69, 281); //@@@: this.label35.Location = new System.Drawing.Point(69, 281);
            this.label35.Name = "label35"; //@@@: this.label35.Name = "label35";
            this.label35.Size = new System.Drawing.Size(344, 32); //@@@: this.label35.Size = new System.Drawing.Size(344, 32);
            this.label35.TabIndex = 42; //@@@: this.label35.TabIndex = 42;
            this.label35.Text = "for every fromula which is located in the detail section"; //@@@: this.label35.Text = "for every fromula which is located in the detail section";
            // 
            // label36
            // 
            this.label36.ForeColor = System.Drawing.Color.Red; //@@@: this.label36.ForeColor = System.Drawing.Color.Red;
            this.label36.Location = new System.Drawing.Point(22, 281); //@@@: this.label36.Location = new System.Drawing.Point(22, 281);
            this.label36.Name = "label36"; //@@@: this.label36.Name = "label36";
            this.label36.Size = new System.Drawing.Size(59, 19); //@@@: this.label36.Size = new System.Drawing.Size(59, 19);
            this.label36.TabIndex = 41; //@@@: this.label36.TabIndex = 41;
            this.label36.Text = "0"; //@@@: this.label36.Text = "0";
            // 
            // label33
            // 
            this.label33.ForeColor = System.Drawing.Color.Red; //@@@: this.label33.ForeColor = System.Drawing.Color.Red;
            this.label33.Location = new System.Drawing.Point(69, 263); //@@@: this.label33.Location = new System.Drawing.Point(69, 263);
            this.label33.Name = "label33"; //@@@: this.label33.Name = "label33";
            this.label33.Size = new System.Drawing.Size(344, 32); //@@@: this.label33.Size = new System.Drawing.Size(344, 32);
            this.label33.TabIndex = 40; //@@@: this.label33.TabIndex = 40;
            this.label33.Text = "for a formula which is located in group footers"; //@@@: this.label33.Text = "for a formula which is located in group footers";
            // 
            // label34
            // 
            this.label34.ForeColor = System.Drawing.Color.Red; //@@@: this.label34.ForeColor = System.Drawing.Color.Red;
            this.label34.Location = new System.Drawing.Point(22, 263); //@@@: this.label34.Location = new System.Drawing.Point(22, 263);
            this.label34.Name = "label34"; //@@@: this.label34.Name = "label34";
            this.label34.Size = new System.Drawing.Size(59, 19); //@@@: this.label34.Size = new System.Drawing.Size(59, 19);
            this.label34.TabIndex = 39; //@@@: this.label34.TabIndex = 39;
            this.label34.Text = "-index"; //@@@: this.label34.Text = "-index";
            // 
            // label31
            // 
            this.label31.ForeColor = System.Drawing.Color.Red; //@@@: this.label31.ForeColor = System.Drawing.Color.Red;
            this.label31.Location = new System.Drawing.Point(69, 245); //@@@: this.label31.Location = new System.Drawing.Point(69, 245);
            this.label31.Name = "label31"; //@@@: this.label31.Name = "label31";
            this.label31.Size = new System.Drawing.Size(344, 32); //@@@: this.label31.Size = new System.Drawing.Size(344, 32);
            this.label31.TabIndex = 38; //@@@: this.label31.TabIndex = 38;
            this.label31.Text = "for a formula which is located in group headers"; //@@@: this.label31.Text = "for a formula which is located in group headers";
            // 
            // label32
            // 
            this.label32.ForeColor = System.Drawing.Color.Red; //@@@: this.label32.ForeColor = System.Drawing.Color.Red;
            this.label32.Location = new System.Drawing.Point(22, 245); //@@@: this.label32.Location = new System.Drawing.Point(22, 245);
            this.label32.Name = "label32"; //@@@: this.label32.Name = "label32";
            this.label32.Size = new System.Drawing.Size(59, 19); //@@@: this.label32.Size = new System.Drawing.Size(59, 19);
            this.label32.TabIndex = 37; //@@@: this.label32.TabIndex = 37;
            this.label32.Text = "+index"; //@@@: this.label32.Text = "+index";
            // 
            // label30
            // 
            this.label30.ForeColor = System.Drawing.Color.Red; //@@@: this.label30.ForeColor = System.Drawing.Color.Red;
            this.label30.Location = new System.Drawing.Point(69, 216); //@@@: this.label30.Location = new System.Drawing.Point(69, 216);
            this.label30.Name = "label30"; //@@@: this.label30.Name = "label30";
            this.label30.Size = new System.Drawing.Size(344, 32); //@@@: this.label30.Size = new System.Drawing.Size(344, 32);
            this.label30.TabIndex = 36; //@@@: this.label30.TabIndex = 36;
            this.label30.Text = "for a formula which is located in header sections and must be evaluated\r\nbefore p" + //@@@: this.label30.Text = "for a formula which is located in header sections and must be evaluated\r\nbefore p" +
                "rinting the first line of the detail section"; //@@@: "rinting the first line of the detail section";
            // 
            // label29
            // 
            this.label29.ForeColor = System.Drawing.Color.Red; //@@@: this.label29.ForeColor = System.Drawing.Color.Red;
            this.label29.Location = new System.Drawing.Point(22, 216); //@@@: this.label29.Location = new System.Drawing.Point(22, 216);
            this.label29.Name = "label29"; //@@@: this.label29.Name = "label29";
            this.label29.Size = new System.Drawing.Size(59, 19); //@@@: this.label29.Size = new System.Drawing.Size(59, 19);
            this.label29.TabIndex = 34; //@@@: this.label29.TabIndex = 34;
            this.label29.Text = "-2000"; //@@@: this.label29.Text = "-2000";
            // 
            // label28
            // 
            this.label28.ForeColor = System.Drawing.Color.Red; //@@@: this.label28.ForeColor = System.Drawing.Color.Red;
            this.label28.Location = new System.Drawing.Point(22, 198); //@@@: this.label28.Location = new System.Drawing.Point(22, 198);
            this.label28.Name = "label28"; //@@@: this.label28.Name = "label28";
            this.label28.Size = new System.Drawing.Size(391, 17); //@@@: this.label28.Size = new System.Drawing.Size(391, 17);
            this.label28.TabIndex = 35; //@@@: this.label28.TabIndex = 35;
            this.label28.Text = "The value of the field \"Execute only on this group\" must follow this rules:"; //@@@: this.label28.Text = "The value of the field \"Execute only on this group\" must follow this rules:";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.lb_formulaValue); //@@@: this.groupBox2.Controls.Add(this.lb_formulaValue);
            this.groupBox2.Location = new System.Drawing.Point(11, 387); //@@@: this.groupBox2.Location = new System.Drawing.Point(11, 387);
            this.groupBox2.Name = "groupBox2"; //@@@: this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(423, 87); //@@@: this.groupBox2.Size = new System.Drawing.Size(423, 87);
            this.groupBox2.TabIndex = 33; //@@@: this.groupBox2.TabIndex = 33;
            this.groupBox2.TabStop = false; //@@@: this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Value formula"; //@@@: this.groupBox2.Text = "Value formula";
            // 
            // lb_formulaValue
            // 
            this.lb_formulaValue.ForeColor = System.Drawing.SystemColors.ControlText; //@@@: this.lb_formulaValue.ForeColor = System.Drawing.SystemColors.ControlText;
            this.lb_formulaValue.Location = new System.Drawing.Point(16, 25); //@@@: this.lb_formulaValue.Location = new System.Drawing.Point(16, 25);
            this.lb_formulaValue.Name = "lb_formulaValue"; //@@@: this.lb_formulaValue.Name = "lb_formulaValue";
            this.lb_formulaValue.Size = new System.Drawing.Size(391, 58); //@@@: this.lb_formulaValue.Size = new System.Drawing.Size(391, 58);
            this.lb_formulaValue.TabIndex = 17; //@@@: this.lb_formulaValue.TabIndex = 17;
            this.lb_formulaValue.Text = "label27"; //@@@: this.lb_formulaValue.Text = "label27";
            // 
            // chk_formulaValue
            // 
            this.chk_formulaValue.AutoSize = true; //@@@: this.chk_formulaValue.AutoSize = true;
            this.chk_formulaValue.Location = new System.Drawing.Point(132, 172); //@@@: this.chk_formulaValue.Location = new System.Drawing.Point(132, 172);
            this.chk_formulaValue.Name = "chk_formulaValue"; //@@@: this.chk_formulaValue.Name = "chk_formulaValue";
            this.chk_formulaValue.Size = new System.Drawing.Size(238, 17); //@@@: this.chk_formulaValue.Size = new System.Drawing.Size(238, 17);
            this.chk_formulaValue.TabIndex = 31; //@@@: this.chk_formulaValue.TabIndex = 31;
            this.chk_formulaValue.Text = "Use a formula to calculate the control\'s value"; //@@@: this.chk_formulaValue.Text = "Use a formula to calculate the control\'s value";
            this.chk_formulaValue.UseVisualStyleBackColor = true; //@@@: this.chk_formulaValue.UseVisualStyleBackColor = true;
            // 
            // cmd_formulaValue
            // 
            this.cmd_formulaValue.Location = new System.Drawing.Point(20, 166); //@@@: this.cmd_formulaValue.Location = new System.Drawing.Point(20, 166);
            this.cmd_formulaValue.Name = "cmd_formulaValue"; //@@@: this.cmd_formulaValue.Name = "cmd_formulaValue";
            this.cmd_formulaValue.Size = new System.Drawing.Size(75, 23); //@@@: this.cmd_formulaValue.Size = new System.Drawing.Size(75, 23);
            this.cmd_formulaValue.TabIndex = 30; //@@@: this.cmd_formulaValue.TabIndex = 30;
            this.cmd_formulaValue.Text = "Edit"; //@@@: this.cmd_formulaValue.Text = "Edit";
            this.cmd_formulaValue.UseVisualStyleBackColor = true; //@@@: this.cmd_formulaValue.UseVisualStyleBackColor = true;
            this.cmd_formulaValue.Click += new System.EventHandler(this.cmd_formulaValue_Click); //@@@: this.cmd_formulaValue.Click += new System.EventHandler(this.cmd_formulaValue_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.lb_formulaHide); //@@@: this.groupBox1.Controls.Add(this.lb_formulaHide);
            this.groupBox1.Location = new System.Drawing.Point(11, 64); //@@@: this.groupBox1.Location = new System.Drawing.Point(11, 64);
            this.groupBox1.Name = "groupBox1"; //@@@: this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(423, 77); //@@@: this.groupBox1.Size = new System.Drawing.Size(423, 77);
            this.groupBox1.TabIndex = 18; //@@@: this.groupBox1.TabIndex = 18;
            this.groupBox1.TabStop = false; //@@@: this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Visibility formula"; //@@@: this.groupBox1.Text = "Visibility formula";
            // 
            // lb_formulaHide
            // 
            this.lb_formulaHide.ForeColor = System.Drawing.SystemColors.ControlText; //@@@: this.lb_formulaHide.ForeColor = System.Drawing.SystemColors.ControlText;
            this.lb_formulaHide.Location = new System.Drawing.Point(16, 25); //@@@: this.lb_formulaHide.Location = new System.Drawing.Point(16, 25);
            this.lb_formulaHide.Name = "lb_formulaHide"; //@@@: this.lb_formulaHide.Name = "lb_formulaHide";
            this.lb_formulaHide.Size = new System.Drawing.Size(391, 48); //@@@: this.lb_formulaHide.Size = new System.Drawing.Size(391, 48);
            this.lb_formulaHide.TabIndex = 17; //@@@: this.lb_formulaHide.TabIndex = 17;
            this.lb_formulaHide.Text = "label26"; //@@@: this.lb_formulaHide.Text = "label26";
            // 
            // label25
            // 
            this.label25.AutoSize = true; //@@@: this.label25.AutoSize = true;
            this.label25.Location = new System.Drawing.Point(17, 41); //@@@: this.label25.Location = new System.Drawing.Point(17, 41);
            this.label25.Name = "label25"; //@@@: this.label25.Name = "label25";
            this.label25.Size = new System.Drawing.Size(341, 13); //@@@: this.label25.Size = new System.Drawing.Size(341, 13);
            this.label25.TabIndex = 16; //@@@: this.label25.TabIndex = 16;
            this.label25.Text = "The formula must return a non zero value to set the control to be visible"; //@@@: this.label25.Text = "The formula must return a non zero value to set the control to be visible";
            // 
            // chk_formulaHide
            // 
            this.chk_formulaHide.AutoSize = true; //@@@: this.chk_formulaHide.AutoSize = true;
            this.chk_formulaHide.Location = new System.Drawing.Point(132, 17); //@@@: this.chk_formulaHide.Location = new System.Drawing.Point(132, 17);
            this.chk_formulaHide.Name = "chk_formulaHide"; //@@@: this.chk_formulaHide.Name = "chk_formulaHide";
            this.chk_formulaHide.Size = new System.Drawing.Size(265, 17); //@@@: this.chk_formulaHide.Size = new System.Drawing.Size(265, 17);
            this.chk_formulaHide.TabIndex = 15; //@@@: this.chk_formulaHide.TabIndex = 15;
            this.chk_formulaHide.Text = "The control has a formula to determine if it is visible"; //@@@: this.chk_formulaHide.Text = "The control has a formula to determine if it is visible";
            this.chk_formulaHide.UseVisualStyleBackColor = true; //@@@: this.chk_formulaHide.UseVisualStyleBackColor = true;
            // 
            // cmd_formulaHide
            // 
            this.cmd_formulaHide.Location = new System.Drawing.Point(20, 11); //@@@: this.cmd_formulaHide.Location = new System.Drawing.Point(20, 11);
            this.cmd_formulaHide.Name = "cmd_formulaHide"; //@@@: this.cmd_formulaHide.Name = "cmd_formulaHide";
            this.cmd_formulaHide.Size = new System.Drawing.Size(75, 23); //@@@: this.cmd_formulaHide.Size = new System.Drawing.Size(75, 23);
            this.cmd_formulaHide.TabIndex = 0; //@@@: this.cmd_formulaHide.TabIndex = 0;
            this.cmd_formulaHide.Text = "Edit"; //@@@: this.cmd_formulaHide.Text = "Edit";
            this.cmd_formulaHide.UseVisualStyleBackColor = true; //@@@: this.cmd_formulaHide.UseVisualStyleBackColor = true;
            this.cmd_formulaHide.Click += new System.EventHandler(this.cmd_formulaHide_Click); //@@@: this.cmd_formulaHide.Click += new System.EventHandler(this.cmd_formulaHide_Click);
            // 
            // tbpDatabase
            // 
            this.tbpDatabase.Controls.Add(this.cmd_dbField); //@@@: this.tbpDatabase.Controls.Add(this.cmd_dbField);
            this.tbpDatabase.Controls.Add(this.label42); //@@@: this.tbpDatabase.Controls.Add(this.label42);
            this.tbpDatabase.Controls.Add(this.tx_dbField); //@@@: this.tbpDatabase.Controls.Add(this.tx_dbField);
            this.tbpDatabase.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpDatabase.Location = new System.Drawing.Point(4, 22);
            this.tbpDatabase.Name = "tbpDatabase"; //@@@: this.tbpDatabase.Name = "tbpDatabase";
            this.tbpDatabase.Size = new System.Drawing.Size(447, 483); //@@@: this.tbpDatabase.Size = new System.Drawing.Size(447, 483);
            this.tbpDatabase.TabIndex = 2; //@@@: this.tbpDatabase.TabIndex = 2;
            this.tbpDatabase.Text = "Database"; //@@@: this.tbpDatabase.Text = "Database";
            this.tbpDatabase.UseVisualStyleBackColor = true; //@@@: this.tbpDatabase.UseVisualStyleBackColor = true;
            // 
            // cmd_dbField
            // 
            this.cmd_dbField.Location = new System.Drawing.Point(359, 14); //@@@: this.cmd_dbField.Location = new System.Drawing.Point(359, 14);
            this.cmd_dbField.Name = "cmd_dbField"; //@@@: this.cmd_dbField.Name = "cmd_dbField";
            this.cmd_dbField.Size = new System.Drawing.Size(34, 23); //@@@: this.cmd_dbField.Size = new System.Drawing.Size(34, 23);
            this.cmd_dbField.TabIndex = 4; //@@@: this.cmd_dbField.TabIndex = 4;
            this.cmd_dbField.Text = "..."; //@@@: this.cmd_dbField.Text = "...";
            this.cmd_dbField.UseVisualStyleBackColor = true; //@@@: this.cmd_dbField.UseVisualStyleBackColor = true;
            this.cmd_dbField.Click += new System.EventHandler(this.cmd_dbField_Click); //@@@: this.cmd_dbField.Click += new System.EventHandler(this.cmd_dbField_Click);
            // 
            // label42
            // 
            this.label42.AutoSize = true; //@@@: this.label42.AutoSize = true;
            this.label42.Location = new System.Drawing.Point(17, 17); //@@@: this.label42.Location = new System.Drawing.Point(17, 17);
            this.label42.Name = "label42"; //@@@: this.label42.Name = "label42";
            this.label42.Size = new System.Drawing.Size(29, 13); //@@@: this.label42.Size = new System.Drawing.Size(29, 13);
            this.label42.TabIndex = 3; //@@@: this.label42.TabIndex = 3;
            this.label42.Text = "Field"; //@@@: this.label42.Text = "Field";
            // 
            // tx_dbField
            // 
            this.tx_dbField.Location = new System.Drawing.Point(77, 14); //@@@: this.tx_dbField.Location = new System.Drawing.Point(77, 14);
            this.tx_dbField.Name = "tx_dbField"; //@@@: this.tx_dbField.Name = "tx_dbField";
            this.tx_dbField.Size = new System.Drawing.Size(276, 20); //@@@: this.tx_dbField.Size = new System.Drawing.Size(276, 20);
            this.tx_dbField.TabIndex = 2; //@@@: this.tx_dbField.TabIndex = 2;
            // 
            // tbpImage
            // 
            this.tbpImage.Controls.Add(this.panel2); //@@@: this.tbpImage.Controls.Add(this.panel2);
            this.tbpImage.Controls.Add(this.cmd_imageFile); //@@@: this.tbpImage.Controls.Add(this.cmd_imageFile);
            this.tbpImage.Controls.Add(this.label43); //@@@: this.tbpImage.Controls.Add(this.label43);
            this.tbpImage.Controls.Add(this.tx_imageFile); //@@@: this.tbpImage.Controls.Add(this.tx_imageFile);
            this.tbpImage.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpImage.Location = new System.Drawing.Point(4, 22);
            this.tbpImage.Name = "tbpImage"; //@@@: this.tbpImage.Name = "tbpImage";
            this.tbpImage.Size = new System.Drawing.Size(447, 483); //@@@: this.tbpImage.Size = new System.Drawing.Size(447, 483);
            this.tbpImage.TabIndex = 3; //@@@: this.tbpImage.TabIndex = 3;
            this.tbpImage.Text = "Image"; //@@@: this.tbpImage.Text = "Image";
            this.tbpImage.UseVisualStyleBackColor = true; //@@@: this.tbpImage.UseVisualStyleBackColor = true;
            // 
            // panel2
            // 
            this.panel2.AutoScroll = true; //@@@: this.panel2.AutoScroll = true;
            this.panel2.Controls.Add(this.pic_image); //@@@: this.panel2.Controls.Add(this.pic_image);
            this.panel2.Location = new System.Drawing.Point(11, 52); //@@@: this.panel2.Location = new System.Drawing.Point(11, 52);
            this.panel2.Name = "panel2"; //@@@: this.panel2.Name = "panel2";
            this.panel2.Size = new System.Drawing.Size(423, 416); //@@@: this.panel2.Size = new System.Drawing.Size(423, 416);
            this.panel2.TabIndex = 9; //@@@: this.panel2.TabIndex = 9;
            // 
            // pic_image
            // 
            this.pic_image.Location = new System.Drawing.Point(0, 0); //@@@: this.pic_image.Location = new System.Drawing.Point(0, 0);
            this.pic_image.Name = "pic_image"; //@@@: this.pic_image.Name = "pic_image";
            this.pic_image.Size = new System.Drawing.Size(100, 50); //@@@: this.pic_image.Size = new System.Drawing.Size(100, 50);
            this.pic_image.SizeMode = System.Windows.Forms.PictureBoxSizeMode.AutoSize; //@@@: this.pic_image.SizeMode = System.Windows.Forms.PictureBoxSizeMode.AutoSize;
            this.pic_image.TabIndex = 8; //@@@: this.pic_image.TabIndex = 8;
            this.pic_image.TabStop = false; //@@@: this.pic_image.TabStop = false;
            // 
            // cmd_imageFile
            // 
            this.cmd_imageFile.Location = new System.Drawing.Point(359, 14); //@@@: this.cmd_imageFile.Location = new System.Drawing.Point(359, 14);
            this.cmd_imageFile.Name = "cmd_imageFile"; //@@@: this.cmd_imageFile.Name = "cmd_imageFile";
            this.cmd_imageFile.Size = new System.Drawing.Size(34, 23); //@@@: this.cmd_imageFile.Size = new System.Drawing.Size(34, 23);
            this.cmd_imageFile.TabIndex = 7; //@@@: this.cmd_imageFile.TabIndex = 7;
            this.cmd_imageFile.Text = "..."; //@@@: this.cmd_imageFile.Text = "...";
            this.cmd_imageFile.UseVisualStyleBackColor = true; //@@@: this.cmd_imageFile.UseVisualStyleBackColor = true;
            // 
            // label43
            // 
            this.label43.AutoSize = true; //@@@: this.label43.AutoSize = true;
            this.label43.Location = new System.Drawing.Point(17, 17); //@@@: this.label43.Location = new System.Drawing.Point(17, 17);
            this.label43.Name = "label43"; //@@@: this.label43.Name = "label43";
            this.label43.Size = new System.Drawing.Size(52, 13); //@@@: this.label43.Size = new System.Drawing.Size(52, 13);
            this.label43.TabIndex = 6; //@@@: this.label43.TabIndex = 6;
            this.label43.Text = "Image file"; //@@@: this.label43.Text = "Image file";
            // 
            // tx_imageFile
            // 
            this.tx_imageFile.Location = new System.Drawing.Point(77, 14); //@@@: this.tx_imageFile.Location = new System.Drawing.Point(77, 14);
            this.tx_imageFile.Name = "tx_imageFile"; //@@@: this.tx_imageFile.Name = "tx_imageFile";
            this.tx_imageFile.Size = new System.Drawing.Size(276, 20); //@@@: this.tx_imageFile.Size = new System.Drawing.Size(276, 20);
            this.tx_imageFile.TabIndex = 5; //@@@: this.tx_imageFile.TabIndex = 5;
            // 
            // tbpBorders
            // 
            this.tbpBorders.Controls.Add(this.cmd_borderShadowColor); //@@@: this.tbpBorders.Controls.Add(this.cmd_borderShadowColor);
            this.tbpBorders.Controls.Add(this.cmd_borderColor3d); //@@@: this.tbpBorders.Controls.Add(this.cmd_borderColor3d);
            this.tbpBorders.Controls.Add(this.cmd_borderColor); //@@@: this.tbpBorders.Controls.Add(this.cmd_borderColor);
            this.tbpBorders.Controls.Add(this.chk_borderRounded); //@@@: this.tbpBorders.Controls.Add(this.chk_borderRounded);
            this.tbpBorders.Controls.Add(this.label51); //@@@: this.tbpBorders.Controls.Add(this.label51);
            this.tbpBorders.Controls.Add(this.tx_borderWidth); //@@@: this.tbpBorders.Controls.Add(this.tx_borderWidth);
            this.tbpBorders.Controls.Add(this.sh_borderShadow); //@@@: this.tbpBorders.Controls.Add(this.sh_borderShadow);
            this.tbpBorders.Controls.Add(this.label50); //@@@: this.tbpBorders.Controls.Add(this.label50);
            this.tbpBorders.Controls.Add(this.tx_borderShadow); //@@@: this.tbpBorders.Controls.Add(this.tx_borderShadow);
            this.tbpBorders.Controls.Add(this.sh_border3D); //@@@: this.tbpBorders.Controls.Add(this.sh_border3D);
            this.tbpBorders.Controls.Add(this.label45); //@@@: this.tbpBorders.Controls.Add(this.label45);
            this.tbpBorders.Controls.Add(this.tx_border3D); //@@@: this.tbpBorders.Controls.Add(this.tx_border3D);
            this.tbpBorders.Controls.Add(this.sh_borderColor); //@@@: this.tbpBorders.Controls.Add(this.sh_borderColor);
            this.tbpBorders.Controls.Add(this.label47); //@@@: this.tbpBorders.Controls.Add(this.label47);
            this.tbpBorders.Controls.Add(this.tx_borderColor); //@@@: this.tbpBorders.Controls.Add(this.tx_borderColor);
            this.tbpBorders.Controls.Add(this.label48); //@@@: this.tbpBorders.Controls.Add(this.label48);
            this.tbpBorders.Controls.Add(this.cb_borderType); //@@@: this.tbpBorders.Controls.Add(this.cb_borderType);
            this.tbpBorders.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpBorders.Location = new System.Drawing.Point(4, 22);
            this.tbpBorders.Name = "tbpBorders"; //@@@: this.tbpBorders.Name = "tbpBorders";
            this.tbpBorders.Size = new System.Drawing.Size(447, 483); //@@@: this.tbpBorders.Size = new System.Drawing.Size(447, 483);
            this.tbpBorders.TabIndex = 4; //@@@: this.tbpBorders.TabIndex = 4;
            this.tbpBorders.Text = "Borders"; //@@@: this.tbpBorders.Text = "Borders";
            this.tbpBorders.UseVisualStyleBackColor = true; //@@@: this.tbpBorders.UseVisualStyleBackColor = true;
            // 
            // cmd_borderShadowColor
            // 
            this.cmd_borderShadowColor.Location = new System.Drawing.Point(256, 92); //@@@: this.cmd_borderShadowColor.Location = new System.Drawing.Point(256, 92);
            this.cmd_borderShadowColor.Name = "cmd_borderShadowColor"; //@@@: this.cmd_borderShadowColor.Name = "cmd_borderShadowColor";
            this.cmd_borderShadowColor.Size = new System.Drawing.Size(27, 23); //@@@: this.cmd_borderShadowColor.Size = new System.Drawing.Size(27, 23);
            this.cmd_borderShadowColor.TabIndex = 44; //@@@: this.cmd_borderShadowColor.TabIndex = 44;
            this.cmd_borderShadowColor.Text = "..."; //@@@: this.cmd_borderShadowColor.Text = "...";
            this.cmd_borderShadowColor.UseVisualStyleBackColor = true; //@@@: this.cmd_borderShadowColor.UseVisualStyleBackColor = true;
            this.cmd_borderShadowColor.Click += new System.EventHandler(this.cmd_borderShadowColor_Click); //@@@: this.cmd_borderShadowColor.Click += new System.EventHandler(this.cmd_borderShadowColor_Click);
            // 
            // cmd_borderColor3d
            // 
            this.cmd_borderColor3d.Location = new System.Drawing.Point(256, 66); //@@@: this.cmd_borderColor3d.Location = new System.Drawing.Point(256, 66);
            this.cmd_borderColor3d.Name = "cmd_borderColor3d"; //@@@: this.cmd_borderColor3d.Name = "cmd_borderColor3d";
            this.cmd_borderColor3d.Size = new System.Drawing.Size(27, 23); //@@@: this.cmd_borderColor3d.Size = new System.Drawing.Size(27, 23);
            this.cmd_borderColor3d.TabIndex = 43; //@@@: this.cmd_borderColor3d.TabIndex = 43;
            this.cmd_borderColor3d.Text = "..."; //@@@: this.cmd_borderColor3d.Text = "...";
            this.cmd_borderColor3d.UseVisualStyleBackColor = true; //@@@: this.cmd_borderColor3d.UseVisualStyleBackColor = true;
            this.cmd_borderColor3d.Click += new System.EventHandler(this.cmd_borderColor3d_Click); //@@@: this.cmd_borderColor3d.Click += new System.EventHandler(this.cmd_borderColor3d_Click);
            // 
            // cmd_borderColor
            // 
            this.cmd_borderColor.Location = new System.Drawing.Point(256, 41); //@@@: this.cmd_borderColor.Location = new System.Drawing.Point(256, 41);
            this.cmd_borderColor.Name = "cmd_borderColor"; //@@@: this.cmd_borderColor.Name = "cmd_borderColor";
            this.cmd_borderColor.Size = new System.Drawing.Size(27, 23); //@@@: this.cmd_borderColor.Size = new System.Drawing.Size(27, 23);
            this.cmd_borderColor.TabIndex = 42; //@@@: this.cmd_borderColor.TabIndex = 42;
            this.cmd_borderColor.Text = "..."; //@@@: this.cmd_borderColor.Text = "...";
            this.cmd_borderColor.UseVisualStyleBackColor = true; //@@@: this.cmd_borderColor.UseVisualStyleBackColor = true;
            this.cmd_borderColor.Click += new System.EventHandler(this.cmd_borderColor_Click_1); //@@@: this.cmd_borderColor.Click += new System.EventHandler(this.cmd_borderColor_Click_1);
            // 
            // chk_borderRounded
            // 
            this.chk_borderRounded.AutoSize = true; //@@@: this.chk_borderRounded.AutoSize = true;
            this.chk_borderRounded.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_borderRounded.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_borderRounded.Location = new System.Drawing.Point(17, 146); //@@@: this.chk_borderRounded.Location = new System.Drawing.Point(17, 146);
            this.chk_borderRounded.Name = "chk_borderRounded"; //@@@: this.chk_borderRounded.Name = "chk_borderRounded";
            this.chk_borderRounded.Size = new System.Drawing.Size(127, 17); //@@@: this.chk_borderRounded.Size = new System.Drawing.Size(127, 17);
            this.chk_borderRounded.TabIndex = 41; //@@@: this.chk_borderRounded.TabIndex = 41;
            this.chk_borderRounded.Text = "The control can grow"; //@@@: this.chk_borderRounded.Text = "The control can grow";
            this.chk_borderRounded.UseVisualStyleBackColor = true; //@@@: this.chk_borderRounded.UseVisualStyleBackColor = true;
            this.chk_borderRounded.CheckedChanged += new System.EventHandler(this.chk_borderRounded_CheckedChanged); //@@@: this.chk_borderRounded.CheckedChanged += new System.EventHandler(this.chk_borderRounded_CheckedChanged);
            // 
            // label51
            // 
            this.label51.AutoSize = true; //@@@: this.label51.AutoSize = true;
            this.label51.Location = new System.Drawing.Point(18, 123); //@@@: this.label51.Location = new System.Drawing.Point(18, 123);
            this.label51.Name = "label51"; //@@@: this.label51.Name = "label51";
            this.label51.Size = new System.Drawing.Size(35, 13); //@@@: this.label51.Size = new System.Drawing.Size(35, 13);
            this.label51.TabIndex = 40; //@@@: this.label51.TabIndex = 40;
            this.label51.Text = "Width"; //@@@: this.label51.Text = "Width";
            // 
            // tx_borderWidth
            // 
            this.tx_borderWidth.Location = new System.Drawing.Point(129, 120); //@@@: this.tx_borderWidth.Location = new System.Drawing.Point(129, 120);
            this.tx_borderWidth.Name = "tx_borderWidth"; //@@@: this.tx_borderWidth.Name = "tx_borderWidth";
            this.tx_borderWidth.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_borderWidth.Size = new System.Drawing.Size(71, 20);
            this.tx_borderWidth.TabIndex = 39; //@@@: this.tx_borderWidth.TabIndex = 39;
            this.tx_borderWidth.TextChanged += new System.EventHandler(this.tx_borderWidth_TextChanged_1); //@@@: this.tx_borderWidth.TextChanged += new System.EventHandler(this.tx_borderWidth_TextChanged_1);
            // 
            // sh_borderShadow
            // 
            this.sh_borderShadow.BackColor = System.Drawing.Color.White; //@@@: this.sh_borderShadow.BackColor = System.Drawing.Color.White;
            this.sh_borderShadow.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle; //@@@: this.sh_borderShadow.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_borderShadow.Location = new System.Drawing.Point(292, 97); //@@@: this.sh_borderShadow.Location = new System.Drawing.Point(292, 97);
            this.sh_borderShadow.Name = "sh_borderShadow"; //@@@: this.sh_borderShadow.Name = "sh_borderShadow";
            this.sh_borderShadow.Size = new System.Drawing.Size(20, 17); //@@@: this.sh_borderShadow.Size = new System.Drawing.Size(20, 17);
            this.sh_borderShadow.TabIndex = 34; //@@@: this.sh_borderShadow.TabIndex = 34;
            // 
            // label50
            // 
            this.label50.AutoSize = true; //@@@: this.label50.AutoSize = true;
            this.label50.Location = new System.Drawing.Point(17, 97); //@@@: this.label50.Location = new System.Drawing.Point(17, 97);
            this.label50.Name = "label50"; //@@@: this.label50.Name = "label50";
            this.label50.Size = new System.Drawing.Size(90, 13); //@@@: this.label50.Size = new System.Drawing.Size(90, 13);
            this.label50.TabIndex = 33; //@@@: this.label50.TabIndex = 33;
            this.label50.Text = "Color 3D Shadow"; //@@@: this.label50.Text = "Color 3D Shadow";
            // 
            // tx_borderShadow
            // 
            this.tx_borderShadow.Location = new System.Drawing.Point(129, 94); //@@@: this.tx_borderShadow.Location = new System.Drawing.Point(129, 94);
            this.tx_borderShadow.Name = "tx_borderShadow"; //@@@: this.tx_borderShadow.Name = "tx_borderShadow";
            this.tx_borderShadow.Size = new System.Drawing.Size(121, 20); //@@@: this.tx_borderShadow.Size = new System.Drawing.Size(121, 20);
            this.tx_borderShadow.TabIndex = 32; //@@@: this.tx_borderShadow.TabIndex = 32;
            this.tx_borderShadow.TextChanged += new System.EventHandler(this.tx_borderShadow_TextChanged); //@@@: this.tx_borderShadow.TextChanged += new System.EventHandler(this.tx_borderShadow_TextChanged);
            // 
            // sh_border3D
            // 
            this.sh_border3D.BackColor = System.Drawing.Color.White; //@@@: this.sh_border3D.BackColor = System.Drawing.Color.White;
            this.sh_border3D.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle; //@@@: this.sh_border3D.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_border3D.Location = new System.Drawing.Point(292, 71); //@@@: this.sh_border3D.Location = new System.Drawing.Point(292, 71);
            this.sh_border3D.Name = "sh_border3D"; //@@@: this.sh_border3D.Name = "sh_border3D";
            this.sh_border3D.Size = new System.Drawing.Size(20, 17); //@@@: this.sh_border3D.Size = new System.Drawing.Size(20, 17);
            this.sh_border3D.TabIndex = 31; //@@@: this.sh_border3D.TabIndex = 31;
            // 
            // label45
            // 
            this.label45.AutoSize = true; //@@@: this.label45.AutoSize = true;
            this.label45.Location = new System.Drawing.Point(17, 71); //@@@: this.label45.Location = new System.Drawing.Point(17, 71);
            this.label45.Name = "label45"; //@@@: this.label45.Name = "label45";
            this.label45.Size = new System.Drawing.Size(48, 13); //@@@: this.label45.Size = new System.Drawing.Size(48, 13);
            this.label45.TabIndex = 30; //@@@: this.label45.TabIndex = 30;
            this.label45.Text = "Color 3D"; //@@@: this.label45.Text = "Color 3D";
            // 
            // tx_border3D
            // 
            this.tx_border3D.Location = new System.Drawing.Point(129, 68); //@@@: this.tx_border3D.Location = new System.Drawing.Point(129, 68);
            this.tx_border3D.Name = "tx_border3D"; //@@@: this.tx_border3D.Name = "tx_border3D";
            this.tx_border3D.Size = new System.Drawing.Size(121, 20); //@@@: this.tx_border3D.Size = new System.Drawing.Size(121, 20);
            this.tx_border3D.TabIndex = 29; //@@@: this.tx_border3D.TabIndex = 29;
            this.tx_border3D.TextChanged += new System.EventHandler(this.tx_border3D_TextChanged); //@@@: this.tx_border3D.TextChanged += new System.EventHandler(this.tx_border3D_TextChanged);
            // 
            // sh_borderColor
            // 
            this.sh_borderColor.BackColor = System.Drawing.Color.Black; //@@@: this.sh_borderColor.BackColor = System.Drawing.Color.Black;
            this.sh_borderColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle; //@@@: this.sh_borderColor.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.sh_borderColor.Location = new System.Drawing.Point(292, 45); //@@@: this.sh_borderColor.Location = new System.Drawing.Point(292, 45);
            this.sh_borderColor.Name = "sh_borderColor"; //@@@: this.sh_borderColor.Name = "sh_borderColor";
            this.sh_borderColor.Size = new System.Drawing.Size(20, 17); //@@@: this.sh_borderColor.Size = new System.Drawing.Size(20, 17);
            this.sh_borderColor.TabIndex = 28; //@@@: this.sh_borderColor.TabIndex = 28;
            // 
            // label47
            // 
            this.label47.AutoSize = true; //@@@: this.label47.AutoSize = true;
            this.label47.Location = new System.Drawing.Point(17, 45); //@@@: this.label47.Location = new System.Drawing.Point(17, 45);
            this.label47.Name = "label47"; //@@@: this.label47.Name = "label47";
            this.label47.Size = new System.Drawing.Size(31, 13); //@@@: this.label47.Size = new System.Drawing.Size(31, 13);
            this.label47.TabIndex = 27; //@@@: this.label47.TabIndex = 27;
            this.label47.Text = "Color"; //@@@: this.label47.Text = "Color";
            // 
            // tx_borderColor
            // 
            this.tx_borderColor.Location = new System.Drawing.Point(129, 42); //@@@: this.tx_borderColor.Location = new System.Drawing.Point(129, 42);
            this.tx_borderColor.Name = "tx_borderColor"; //@@@: this.tx_borderColor.Name = "tx_borderColor";
            this.tx_borderColor.Size = new System.Drawing.Size(121, 20); //@@@: this.tx_borderColor.Size = new System.Drawing.Size(121, 20);
            this.tx_borderColor.TabIndex = 26; //@@@: this.tx_borderColor.TabIndex = 26;
            this.tx_borderColor.TextChanged += new System.EventHandler(this.tx_borderColor_TextChanged); //@@@: this.tx_borderColor.TextChanged += new System.EventHandler(this.tx_borderColor_TextChanged);
            // 
            // label48
            // 
            this.label48.AutoSize = true; //@@@: this.label48.AutoSize = true;
            this.label48.Location = new System.Drawing.Point(17, 18); //@@@: this.label48.Location = new System.Drawing.Point(17, 18);
            this.label48.Name = "label48"; //@@@: this.label48.Name = "label48";
            this.label48.Size = new System.Drawing.Size(31, 13); //@@@: this.label48.Size = new System.Drawing.Size(31, 13);
            this.label48.TabIndex = 25; //@@@: this.label48.TabIndex = 25;
            this.label48.Text = "Type"; //@@@: this.label48.Text = "Type";
            // 
            // cb_borderType
            // 
            this.cb_borderType.FormattingEnabled = true; //@@@: this.cb_borderType.FormattingEnabled = true;
            this.cb_borderType.Location = new System.Drawing.Point(129, 15); //@@@: this.cb_borderType.Location = new System.Drawing.Point(129, 15);
            this.cb_borderType.Name = "cb_borderType"; //@@@: this.cb_borderType.Name = "cb_borderType";
            this.cb_borderType.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_borderType.Size = new System.Drawing.Size(121, 21);
            this.cb_borderType.TabIndex = 24; //@@@: this.cb_borderType.TabIndex = 24;
            this.cb_borderType.SelectedIndexChanged += new System.EventHandler(this.cb_borderType_SelectedIndexChanged); //@@@: this.cb_borderType.SelectedIndexChanged += new System.EventHandler(this.cb_borderType_SelectedIndexChanged);
            // 
            // tbpChart
            // 
            this.tbpChart.Controls.Add(this.groupBox5); //@@@: this.tbpChart.Controls.Add(this.groupBox5);
            this.tbpChart.Controls.Add(this.groupBox4); //@@@: this.tbpChart.Controls.Add(this.groupBox4);
            this.tbpChart.Controls.Add(this.label58); //@@@: this.tbpChart.Controls.Add(this.label58);
            this.tbpChart.Controls.Add(this.tx_chartGroupValue); //@@@: this.tbpChart.Controls.Add(this.tx_chartGroupValue);
            this.tbpChart.Controls.Add(this.cmd_dbFieldGroupValue); //@@@: this.tbpChart.Controls.Add(this.cmd_dbFieldGroupValue);
            this.tbpChart.Controls.Add(this.label57); //@@@: this.tbpChart.Controls.Add(this.label57);
            this.tbpChart.Controls.Add(this.tx_dbFieldGroupValue); //@@@: this.tbpChart.Controls.Add(this.tx_dbFieldGroupValue);
            this.tbpChart.Controls.Add(this.chk_sort); //@@@: this.tbpChart.Controls.Add(this.chk_sort);
            this.tbpChart.Controls.Add(this.chk_showOutlines); //@@@: this.tbpChart.Controls.Add(this.chk_showOutlines);
            this.tbpChart.Controls.Add(this.chk_showBarValues); //@@@: this.tbpChart.Controls.Add(this.chk_showBarValues);
            this.tbpChart.Controls.Add(this.label59); //@@@: this.tbpChart.Controls.Add(this.label59);
            this.tbpChart.Controls.Add(this.tx_chartTop); //@@@: this.tbpChart.Controls.Add(this.tx_chartTop);
            this.tbpChart.Controls.Add(this.label56); //@@@: this.tbpChart.Controls.Add(this.label56);
            this.tbpChart.Controls.Add(this.cb_chartThickness); //@@@: this.tbpChart.Controls.Add(this.cb_chartThickness);
            this.tbpChart.Controls.Add(this.label54); //@@@: this.tbpChart.Controls.Add(this.label54);
            this.tbpChart.Controls.Add(this.cb_chartSize); //@@@: this.tbpChart.Controls.Add(this.cb_chartSize);
            this.tbpChart.Controls.Add(this.label55); //@@@: this.tbpChart.Controls.Add(this.label55);
            this.tbpChart.Controls.Add(this.cb_linesType); //@@@: this.tbpChart.Controls.Add(this.cb_linesType);
            this.tbpChart.Controls.Add(this.label53); //@@@: this.tbpChart.Controls.Add(this.label53);
            this.tbpChart.Controls.Add(this.cb_formatType); //@@@: this.tbpChart.Controls.Add(this.cb_formatType);
            this.tbpChart.Controls.Add(this.label52); //@@@: this.tbpChart.Controls.Add(this.label52);
            this.tbpChart.Controls.Add(this.cb_type); //@@@: this.tbpChart.Controls.Add(this.cb_type);
            this.tbpChart.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpChart.Location = new System.Drawing.Point(4, 22);
            this.tbpChart.Name = "tbpChart"; //@@@: this.tbpChart.Name = "tbpChart";
            this.tbpChart.Size = new System.Drawing.Size(447, 483); //@@@: this.tbpChart.Size = new System.Drawing.Size(447, 483);
            this.tbpChart.TabIndex = 5; //@@@: this.tbpChart.TabIndex = 5;
            this.tbpChart.Text = "Chart"; //@@@: this.tbpChart.Text = "Chart";
            this.tbpChart.UseVisualStyleBackColor = true; //@@@: this.tbpChart.UseVisualStyleBackColor = true;
            // 
            // groupBox5
            // 
            this.groupBox5.Controls.Add(this.label63); //@@@: this.groupBox5.Controls.Add(this.label63);
            this.groupBox5.Controls.Add(this.cb_colorSerie2); //@@@: this.groupBox5.Controls.Add(this.cb_colorSerie2);
            this.groupBox5.Controls.Add(this.cmd_dbFieldLbl2); //@@@: this.groupBox5.Controls.Add(this.cmd_dbFieldLbl2);
            this.groupBox5.Controls.Add(this.label64); //@@@: this.groupBox5.Controls.Add(this.label64);
            this.groupBox5.Controls.Add(this.tx_dbFieldLbl2); //@@@: this.groupBox5.Controls.Add(this.tx_dbFieldLbl2);
            this.groupBox5.Controls.Add(this.cmd_dbFieldVal2); //@@@: this.groupBox5.Controls.Add(this.cmd_dbFieldVal2);
            this.groupBox5.Controls.Add(this.label65); //@@@: this.groupBox5.Controls.Add(this.label65);
            this.groupBox5.Controls.Add(this.tx_dbFieldVal2); //@@@: this.groupBox5.Controls.Add(this.tx_dbFieldVal2);
            this.groupBox5.Location = new System.Drawing.Point(12, 352); //@@@: this.groupBox5.Location = new System.Drawing.Point(12, 352);
            this.groupBox5.Name = "groupBox5"; //@@@: this.groupBox5.Name = "groupBox5";
            this.groupBox5.Size = new System.Drawing.Size(422, 104); //@@@: this.groupBox5.Size = new System.Drawing.Size(422, 104);
            this.groupBox5.TabIndex = 62; //@@@: this.groupBox5.TabIndex = 62;
            this.groupBox5.TabStop = false; //@@@: this.groupBox5.TabStop = false;
            this.groupBox5.Text = "Serie 2"; //@@@: this.groupBox5.Text = "Serie 2";
            // 
            // label63
            // 
            this.label63.AutoSize = true; //@@@: this.label63.AutoSize = true;
            this.label63.Location = new System.Drawing.Point(19, 74); //@@@: this.label63.Location = new System.Drawing.Point(19, 74);
            this.label63.Name = "label63"; //@@@: this.label63.Name = "label63";
            this.label63.Size = new System.Drawing.Size(31, 13); //@@@: this.label63.Size = new System.Drawing.Size(31, 13);
            this.label63.TabIndex = 66; //@@@: this.label63.TabIndex = 66;
            this.label63.Text = "Color"; //@@@: this.label63.Text = "Color";
            // 
            // cb_colorSerie2
            // 
            this.cb_colorSerie2.FormattingEnabled = true; //@@@: this.cb_colorSerie2.FormattingEnabled = true;
            this.cb_colorSerie2.Location = new System.Drawing.Point(86, 71); //@@@: this.cb_colorSerie2.Location = new System.Drawing.Point(86, 71);
            this.cb_colorSerie2.Name = "cb_colorSerie2"; //@@@: this.cb_colorSerie2.Name = "cb_colorSerie2";
            this.cb_colorSerie2.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_colorSerie2.Size = new System.Drawing.Size(121, 21);
            this.cb_colorSerie2.TabIndex = 65; //@@@: this.cb_colorSerie2.TabIndex = 65;
            this.cb_colorSerie2.SelectedIndexChanged += new System.EventHandler(this.cb_colorSerie2_SelectedIndexChanged); //@@@: this.cb_colorSerie2.SelectedIndexChanged += new System.EventHandler(this.cb_colorSerie2_SelectedIndexChanged);
            // 
            // cmd_dbFieldLbl2
            // 
            this.cmd_dbFieldLbl2.Location = new System.Drawing.Point(368, 45); //@@@: this.cmd_dbFieldLbl2.Location = new System.Drawing.Point(368, 45);
            this.cmd_dbFieldLbl2.Name = "cmd_dbFieldLbl2"; //@@@: this.cmd_dbFieldLbl2.Name = "cmd_dbFieldLbl2";
            this.cmd_dbFieldLbl2.Size = new System.Drawing.Size(34, 23); //@@@: this.cmd_dbFieldLbl2.Size = new System.Drawing.Size(34, 23);
            this.cmd_dbFieldLbl2.TabIndex = 64; //@@@: this.cmd_dbFieldLbl2.TabIndex = 64;
            this.cmd_dbFieldLbl2.Text = "..."; //@@@: this.cmd_dbFieldLbl2.Text = "...";
            this.cmd_dbFieldLbl2.UseVisualStyleBackColor = true; //@@@: this.cmd_dbFieldLbl2.UseVisualStyleBackColor = true;
            // 
            // label64
            // 
            this.label64.AutoSize = true; //@@@: this.label64.AutoSize = true;
            this.label64.Location = new System.Drawing.Point(19, 48); //@@@: this.label64.Location = new System.Drawing.Point(19, 48);
            this.label64.Name = "label64"; //@@@: this.label64.Name = "label64";
            this.label64.Size = new System.Drawing.Size(54, 13); //@@@: this.label64.Size = new System.Drawing.Size(54, 13);
            this.label64.TabIndex = 63; //@@@: this.label64.TabIndex = 63;
            this.label64.Text = "Field label"; //@@@: this.label64.Text = "Field label";
            // 
            // tx_dbFieldLbl2
            // 
            this.tx_dbFieldLbl2.Location = new System.Drawing.Point(86, 45); //@@@: this.tx_dbFieldLbl2.Location = new System.Drawing.Point(86, 45);
            this.tx_dbFieldLbl2.Name = "tx_dbFieldLbl2"; //@@@: this.tx_dbFieldLbl2.Name = "tx_dbFieldLbl2";
            this.tx_dbFieldLbl2.Size = new System.Drawing.Size(276, 20); //@@@: this.tx_dbFieldLbl2.Size = new System.Drawing.Size(276, 20);
            this.tx_dbFieldLbl2.TabIndex = 62; //@@@: this.tx_dbFieldLbl2.TabIndex = 62;
            this.tx_dbFieldLbl2.TextChanged += new System.EventHandler(this.tx_dbFieldLbl2_TextChanged); //@@@: this.tx_dbFieldLbl2.TextChanged += new System.EventHandler(this.tx_dbFieldLbl2_TextChanged);
            // 
            // cmd_dbFieldVal2
            // 
            this.cmd_dbFieldVal2.Location = new System.Drawing.Point(368, 19); //@@@: this.cmd_dbFieldVal2.Location = new System.Drawing.Point(368, 19);
            this.cmd_dbFieldVal2.Name = "cmd_dbFieldVal2"; //@@@: this.cmd_dbFieldVal2.Name = "cmd_dbFieldVal2";
            this.cmd_dbFieldVal2.Size = new System.Drawing.Size(34, 23); //@@@: this.cmd_dbFieldVal2.Size = new System.Drawing.Size(34, 23);
            this.cmd_dbFieldVal2.TabIndex = 61; //@@@: this.cmd_dbFieldVal2.TabIndex = 61;
            this.cmd_dbFieldVal2.Text = "..."; //@@@: this.cmd_dbFieldVal2.Text = "...";
            this.cmd_dbFieldVal2.UseVisualStyleBackColor = true; //@@@: this.cmd_dbFieldVal2.UseVisualStyleBackColor = true;
            // 
            // label65
            // 
            this.label65.AutoSize = true; //@@@: this.label65.AutoSize = true;
            this.label65.Location = new System.Drawing.Point(19, 22); //@@@: this.label65.Location = new System.Drawing.Point(19, 22);
            this.label65.Name = "label65"; //@@@: this.label65.Name = "label65";
            this.label65.Size = new System.Drawing.Size(58, 13); //@@@: this.label65.Size = new System.Drawing.Size(58, 13);
            this.label65.TabIndex = 60; //@@@: this.label65.TabIndex = 60;
            this.label65.Text = "Field value"; //@@@: this.label65.Text = "Field value";
            // 
            // tx_dbFieldVal2
            // 
            this.tx_dbFieldVal2.Location = new System.Drawing.Point(86, 19); //@@@: this.tx_dbFieldVal2.Location = new System.Drawing.Point(86, 19);
            this.tx_dbFieldVal2.Name = "tx_dbFieldVal2"; //@@@: this.tx_dbFieldVal2.Name = "tx_dbFieldVal2";
            this.tx_dbFieldVal2.Size = new System.Drawing.Size(276, 20); //@@@: this.tx_dbFieldVal2.Size = new System.Drawing.Size(276, 20);
            this.tx_dbFieldVal2.TabIndex = 59; //@@@: this.tx_dbFieldVal2.TabIndex = 59;
            this.tx_dbFieldVal2.TextChanged += new System.EventHandler(this.tx_dbFieldVal2_TextChanged); //@@@: this.tx_dbFieldVal2.TextChanged += new System.EventHandler(this.tx_dbFieldVal2_TextChanged);
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.label62); //@@@: this.groupBox4.Controls.Add(this.label62);
            this.groupBox4.Controls.Add(this.cb_colorSerie1); //@@@: this.groupBox4.Controls.Add(this.cb_colorSerie1);
            this.groupBox4.Controls.Add(this.cmd_dbFieldLbl1); //@@@: this.groupBox4.Controls.Add(this.cmd_dbFieldLbl1);
            this.groupBox4.Controls.Add(this.label61); //@@@: this.groupBox4.Controls.Add(this.label61);
            this.groupBox4.Controls.Add(this.tx_dbFieldLbl1); //@@@: this.groupBox4.Controls.Add(this.tx_dbFieldLbl1);
            this.groupBox4.Controls.Add(this.cmd_dbFieldVal1); //@@@: this.groupBox4.Controls.Add(this.cmd_dbFieldVal1);
            this.groupBox4.Controls.Add(this.label60); //@@@: this.groupBox4.Controls.Add(this.label60);
            this.groupBox4.Controls.Add(this.tx_dbFieldVal1); //@@@: this.groupBox4.Controls.Add(this.tx_dbFieldVal1);
            this.groupBox4.Location = new System.Drawing.Point(12, 242); //@@@: this.groupBox4.Location = new System.Drawing.Point(12, 242);
            this.groupBox4.Name = "groupBox4"; //@@@: this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(422, 104); //@@@: this.groupBox4.Size = new System.Drawing.Size(422, 104);
            this.groupBox4.TabIndex = 61; //@@@: this.groupBox4.TabIndex = 61;
            this.groupBox4.TabStop = false; //@@@: this.groupBox4.TabStop = false;
            this.groupBox4.Text = "Serie 1"; //@@@: this.groupBox4.Text = "Serie 1";
            // 
            // label62
            // 
            this.label62.AutoSize = true; //@@@: this.label62.AutoSize = true;
            this.label62.Location = new System.Drawing.Point(19, 74); //@@@: this.label62.Location = new System.Drawing.Point(19, 74);
            this.label62.Name = "label62"; //@@@: this.label62.Name = "label62";
            this.label62.Size = new System.Drawing.Size(31, 13); //@@@: this.label62.Size = new System.Drawing.Size(31, 13);
            this.label62.TabIndex = 66; //@@@: this.label62.TabIndex = 66;
            this.label62.Text = "Color"; //@@@: this.label62.Text = "Color";
            // 
            // cb_colorSerie1
            // 
            this.cb_colorSerie1.FormattingEnabled = true; //@@@: this.cb_colorSerie1.FormattingEnabled = true;
            this.cb_colorSerie1.Location = new System.Drawing.Point(86, 71); //@@@: this.cb_colorSerie1.Location = new System.Drawing.Point(86, 71);
            this.cb_colorSerie1.Name = "cb_colorSerie1"; //@@@: this.cb_colorSerie1.Name = "cb_colorSerie1";
            this.cb_colorSerie1.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_colorSerie1.Size = new System.Drawing.Size(121, 21);
            this.cb_colorSerie1.TabIndex = 65; //@@@: this.cb_colorSerie1.TabIndex = 65;
            this.cb_colorSerie1.SelectedIndexChanged += new System.EventHandler(this.cb_colorSerie1_SelectedIndexChanged); //@@@: this.cb_colorSerie1.SelectedIndexChanged += new System.EventHandler(this.cb_colorSerie1_SelectedIndexChanged);
            // 
            // cmd_dbFieldLbl1
            // 
            this.cmd_dbFieldLbl1.Location = new System.Drawing.Point(368, 45); //@@@: this.cmd_dbFieldLbl1.Location = new System.Drawing.Point(368, 45);
            this.cmd_dbFieldLbl1.Name = "cmd_dbFieldLbl1"; //@@@: this.cmd_dbFieldLbl1.Name = "cmd_dbFieldLbl1";
            this.cmd_dbFieldLbl1.Size = new System.Drawing.Size(34, 23); //@@@: this.cmd_dbFieldLbl1.Size = new System.Drawing.Size(34, 23);
            this.cmd_dbFieldLbl1.TabIndex = 64; //@@@: this.cmd_dbFieldLbl1.TabIndex = 64;
            this.cmd_dbFieldLbl1.Text = "..."; //@@@: this.cmd_dbFieldLbl1.Text = "...";
            this.cmd_dbFieldLbl1.UseVisualStyleBackColor = true; //@@@: this.cmd_dbFieldLbl1.UseVisualStyleBackColor = true;
            // 
            // label61
            // 
            this.label61.AutoSize = true; //@@@: this.label61.AutoSize = true;
            this.label61.Location = new System.Drawing.Point(19, 48); //@@@: this.label61.Location = new System.Drawing.Point(19, 48);
            this.label61.Name = "label61"; //@@@: this.label61.Name = "label61";
            this.label61.Size = new System.Drawing.Size(54, 13); //@@@: this.label61.Size = new System.Drawing.Size(54, 13);
            this.label61.TabIndex = 63; //@@@: this.label61.TabIndex = 63;
            this.label61.Text = "Field label"; //@@@: this.label61.Text = "Field label";
            // 
            // tx_dbFieldLbl1
            // 
            this.tx_dbFieldLbl1.Location = new System.Drawing.Point(86, 45); //@@@: this.tx_dbFieldLbl1.Location = new System.Drawing.Point(86, 45);
            this.tx_dbFieldLbl1.Name = "tx_dbFieldLbl1"; //@@@: this.tx_dbFieldLbl1.Name = "tx_dbFieldLbl1";
            this.tx_dbFieldLbl1.Size = new System.Drawing.Size(276, 20); //@@@: this.tx_dbFieldLbl1.Size = new System.Drawing.Size(276, 20);
            this.tx_dbFieldLbl1.TabIndex = 62; //@@@: this.tx_dbFieldLbl1.TabIndex = 62;
            this.tx_dbFieldLbl1.TextChanged += new System.EventHandler(this.tx_dbFieldLbl1_TextChanged); //@@@: this.tx_dbFieldLbl1.TextChanged += new System.EventHandler(this.tx_dbFieldLbl1_TextChanged);
            // 
            // cmd_dbFieldVal1
            // 
            this.cmd_dbFieldVal1.Location = new System.Drawing.Point(368, 19); //@@@: this.cmd_dbFieldVal1.Location = new System.Drawing.Point(368, 19);
            this.cmd_dbFieldVal1.Name = "cmd_dbFieldVal1"; //@@@: this.cmd_dbFieldVal1.Name = "cmd_dbFieldVal1";
            this.cmd_dbFieldVal1.Size = new System.Drawing.Size(34, 23); //@@@: this.cmd_dbFieldVal1.Size = new System.Drawing.Size(34, 23);
            this.cmd_dbFieldVal1.TabIndex = 61; //@@@: this.cmd_dbFieldVal1.TabIndex = 61;
            this.cmd_dbFieldVal1.Text = "..."; //@@@: this.cmd_dbFieldVal1.Text = "...";
            this.cmd_dbFieldVal1.UseVisualStyleBackColor = true; //@@@: this.cmd_dbFieldVal1.UseVisualStyleBackColor = true;
            // 
            // label60
            // 
            this.label60.AutoSize = true; //@@@: this.label60.AutoSize = true;
            this.label60.Location = new System.Drawing.Point(19, 22); //@@@: this.label60.Location = new System.Drawing.Point(19, 22);
            this.label60.Name = "label60"; //@@@: this.label60.Name = "label60";
            this.label60.Size = new System.Drawing.Size(58, 13); //@@@: this.label60.Size = new System.Drawing.Size(58, 13);
            this.label60.TabIndex = 60; //@@@: this.label60.TabIndex = 60;
            this.label60.Text = "Field value"; //@@@: this.label60.Text = "Field value";
            // 
            // tx_dbFieldVal1
            // 
            this.tx_dbFieldVal1.Location = new System.Drawing.Point(86, 19); //@@@: this.tx_dbFieldVal1.Location = new System.Drawing.Point(86, 19);
            this.tx_dbFieldVal1.Name = "tx_dbFieldVal1"; //@@@: this.tx_dbFieldVal1.Name = "tx_dbFieldVal1";
            this.tx_dbFieldVal1.Size = new System.Drawing.Size(276, 20); //@@@: this.tx_dbFieldVal1.Size = new System.Drawing.Size(276, 20);
            this.tx_dbFieldVal1.TabIndex = 59; //@@@: this.tx_dbFieldVal1.TabIndex = 59;
            this.tx_dbFieldVal1.TextChanged += new System.EventHandler(this.tx_dbFieldVal1_TextChanged); //@@@: this.tx_dbFieldVal1.TextChanged += new System.EventHandler(this.tx_dbFieldVal1_TextChanged);
            // 
            // label58
            // 
            this.label58.AutoSize = true; //@@@: this.label58.AutoSize = true;
            this.label58.Location = new System.Drawing.Point(8, 219); //@@@: this.label58.Location = new System.Drawing.Point(8, 219);
            this.label58.Name = "label58"; //@@@: this.label58.Name = "label58";
            this.label58.Size = new System.Drawing.Size(65, 13); //@@@: this.label58.Size = new System.Drawing.Size(65, 13);
            this.label58.TabIndex = 60; //@@@: this.label58.TabIndex = 60;
            this.label58.Text = "Group value"; //@@@: this.label58.Text = "Group value";
            // 
            // tx_chartGroupValue
            // 
            this.tx_chartGroupValue.Location = new System.Drawing.Point(77, 216); //@@@: this.tx_chartGroupValue.Location = new System.Drawing.Point(77, 216);
            this.tx_chartGroupValue.Name = "tx_chartGroupValue"; //@@@: this.tx_chartGroupValue.Name = "tx_chartGroupValue";
            this.tx_chartGroupValue.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_chartGroupValue.Size = new System.Drawing.Size(71, 20);
            this.tx_chartGroupValue.TabIndex = 59; //@@@: this.tx_chartGroupValue.TabIndex = 59;
            this.tx_chartGroupValue.TextChanged += new System.EventHandler(this.tx_chartGroupValue_TextChanged_1); //@@@: this.tx_chartGroupValue.TextChanged += new System.EventHandler(this.tx_chartGroupValue_TextChanged_1);
            // 
            // cmd_dbFieldGroupValue
            // 
            this.cmd_dbFieldGroupValue.Location = new System.Drawing.Point(358, 190); //@@@: this.cmd_dbFieldGroupValue.Location = new System.Drawing.Point(358, 190);
            this.cmd_dbFieldGroupValue.Name = "cmd_dbFieldGroupValue"; //@@@: this.cmd_dbFieldGroupValue.Name = "cmd_dbFieldGroupValue";
            this.cmd_dbFieldGroupValue.Size = new System.Drawing.Size(34, 23); //@@@: this.cmd_dbFieldGroupValue.Size = new System.Drawing.Size(34, 23);
            this.cmd_dbFieldGroupValue.TabIndex = 58; //@@@: this.cmd_dbFieldGroupValue.TabIndex = 58;
            this.cmd_dbFieldGroupValue.Text = "..."; //@@@: this.cmd_dbFieldGroupValue.Text = "...";
            this.cmd_dbFieldGroupValue.UseVisualStyleBackColor = true; //@@@: this.cmd_dbFieldGroupValue.UseVisualStyleBackColor = true;
            // 
            // label57
            // 
            this.label57.AutoSize = true; //@@@: this.label57.AutoSize = true;
            this.label57.Location = new System.Drawing.Point(9, 193); //@@@: this.label57.Location = new System.Drawing.Point(9, 193);
            this.label57.Name = "label57"; //@@@: this.label57.Name = "label57";
            this.label57.Size = new System.Drawing.Size(65, 13); //@@@: this.label57.Size = new System.Drawing.Size(65, 13);
            this.label57.TabIndex = 57; //@@@: this.label57.TabIndex = 57;
            this.label57.Text = "Group value"; //@@@: this.label57.Text = "Group value";
            // 
            // tx_dbFieldGroupValue
            // 
            this.tx_dbFieldGroupValue.Location = new System.Drawing.Point(77, 190); //@@@: this.tx_dbFieldGroupValue.Location = new System.Drawing.Point(77, 190);
            this.tx_dbFieldGroupValue.Name = "tx_dbFieldGroupValue"; //@@@: this.tx_dbFieldGroupValue.Name = "tx_dbFieldGroupValue";
            this.tx_dbFieldGroupValue.Size = new System.Drawing.Size(276, 20); //@@@: this.tx_dbFieldGroupValue.Size = new System.Drawing.Size(276, 20);
            this.tx_dbFieldGroupValue.TabIndex = 56; //@@@: this.tx_dbFieldGroupValue.TabIndex = 56;
            this.tx_dbFieldGroupValue.TextChanged += new System.EventHandler(this.tx_dbFieldGroupValue_TextChanged); //@@@: this.tx_dbFieldGroupValue.TextChanged += new System.EventHandler(this.tx_dbFieldGroupValue_TextChanged);
            // 
            // chk_sort
            // 
            this.chk_sort.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_sort.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_sort.Location = new System.Drawing.Point(9, 156); //@@@: this.chk_sort.Location = new System.Drawing.Point(9, 156);
            this.chk_sort.Name = "chk_sort"; //@@@: this.chk_sort.Name = "chk_sort";
            this.chk_sort.Size = new System.Drawing.Size(92, 24); //@@@: this.chk_sort.Size = new System.Drawing.Size(92, 24);
            this.chk_sort.TabIndex = 55; //@@@: this.chk_sort.TabIndex = 55;
            this.chk_sort.Text = "Sort"; //@@@: this.chk_sort.Text = "Sort";
            this.chk_sort.UseVisualStyleBackColor = true; //@@@: this.chk_sort.UseVisualStyleBackColor = true;
            this.chk_sort.CheckedChanged += new System.EventHandler(this.chk_sort_CheckedChanged); //@@@: this.chk_sort.CheckedChanged += new System.EventHandler(this.chk_sort_CheckedChanged);
            // 
            // chk_showOutlines
            // 
            this.chk_showOutlines.AutoSize = true; //@@@: this.chk_showOutlines.AutoSize = true;
            this.chk_showOutlines.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_showOutlines.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_showOutlines.Location = new System.Drawing.Point(9, 133); //@@@: this.chk_showOutlines.Location = new System.Drawing.Point(9, 133);
            this.chk_showOutlines.Name = "chk_showOutlines"; //@@@: this.chk_showOutlines.Name = "chk_showOutlines";
            this.chk_showOutlines.Size = new System.Drawing.Size(92, 17); //@@@: this.chk_showOutlines.Size = new System.Drawing.Size(92, 17);
            this.chk_showOutlines.TabIndex = 54; //@@@: this.chk_showOutlines.TabIndex = 54;
            this.chk_showOutlines.Text = "Show outlines"; //@@@: this.chk_showOutlines.Text = "Show outlines";
            this.chk_showOutlines.UseVisualStyleBackColor = true; //@@@: this.chk_showOutlines.UseVisualStyleBackColor = true;
            this.chk_showOutlines.CheckedChanged += new System.EventHandler(this.chk_showOutlines_CheckedChanged); //@@@: this.chk_showOutlines.CheckedChanged += new System.EventHandler(this.chk_showOutlines_CheckedChanged);
            // 
            // chk_showBarValues
            // 
            this.chk_showBarValues.CheckAlign = System.Drawing.ContentAlignment.MiddleRight; //@@@: this.chk_showBarValues.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.chk_showBarValues.Location = new System.Drawing.Point(9, 103); //@@@: this.chk_showBarValues.Location = new System.Drawing.Point(9, 103);
            this.chk_showBarValues.Name = "chk_showBarValues"; //@@@: this.chk_showBarValues.Name = "chk_showBarValues";
            this.chk_showBarValues.Size = new System.Drawing.Size(92, 24); //@@@: this.chk_showBarValues.Size = new System.Drawing.Size(92, 24);
            this.chk_showBarValues.TabIndex = 53; //@@@: this.chk_showBarValues.TabIndex = 53;
            this.chk_showBarValues.Text = "Bar values"; //@@@: this.chk_showBarValues.Text = "Bar values";
            this.chk_showBarValues.UseVisualStyleBackColor = true; //@@@: this.chk_showBarValues.UseVisualStyleBackColor = true;
            this.chk_showBarValues.CheckedChanged += new System.EventHandler(this.chk_showBarValues_CheckedChanged); //@@@: this.chk_showBarValues.CheckedChanged += new System.EventHandler(this.chk_showBarValues_CheckedChanged);
            // 
            // label59
            // 
            this.label59.AutoSize = true; //@@@: this.label59.AutoSize = true;
            this.label59.Location = new System.Drawing.Point(7, 72); //@@@: this.label59.Location = new System.Drawing.Point(7, 72);
            this.label59.Name = "label59"; //@@@: this.label59.Name = "label59";
            this.label59.Size = new System.Drawing.Size(26, 13); //@@@: this.label59.Size = new System.Drawing.Size(26, 13);
            this.label59.TabIndex = 52; //@@@: this.label59.TabIndex = 52;
            this.label59.Text = "Top"; //@@@: this.label59.Text = "Top";
            // 
            // tx_chartTop
            // 
            this.tx_chartTop.Location = new System.Drawing.Point(76, 69); //@@@: this.tx_chartTop.Location = new System.Drawing.Point(76, 69);
            this.tx_chartTop.Name = "tx_chartTop"; //@@@: this.tx_chartTop.Name = "tx_chartTop";
            this.tx_chartTop.Size = new System.Drawing.Size(71, 20); //@@@: this.tx_chartTop.Size = new System.Drawing.Size(71, 20);
            this.tx_chartTop.TabIndex = 51; //@@@: this.tx_chartTop.TabIndex = 51;
            this.tx_chartTop.TextChanged += new System.EventHandler(this.tx_chartTop_TextChanged_1); //@@@: this.tx_chartTop.TextChanged += new System.EventHandler(this.tx_chartTop_TextChanged_1);
            // 
            // label56
            // 
            this.label56.AutoSize = true; //@@@: this.label56.AutoSize = true;
            this.label56.Location = new System.Drawing.Point(192, 72); //@@@: this.label56.Location = new System.Drawing.Point(192, 72);
            this.label56.Name = "label56"; //@@@: this.label56.Name = "label56";
            this.label56.Size = new System.Drawing.Size(97, 13); //@@@: this.label56.Size = new System.Drawing.Size(97, 13);
            this.label56.TabIndex = 35; //@@@: this.label56.TabIndex = 35;
            this.label56.Text = "Pie chart thickness"; //@@@: this.label56.Text = "Pie chart thickness";
            // 
            // cb_chartThickness
            // 
            this.cb_chartThickness.FormattingEnabled = true; //@@@: this.cb_chartThickness.FormattingEnabled = true;
            this.cb_chartThickness.Location = new System.Drawing.Point(295, 69); //@@@: this.cb_chartThickness.Location = new System.Drawing.Point(295, 69);
            this.cb_chartThickness.Name = "cb_chartThickness"; //@@@: this.cb_chartThickness.Name = "cb_chartThickness";
            this.cb_chartThickness.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_chartThickness.Size = new System.Drawing.Size(121, 21);
            this.cb_chartThickness.TabIndex = 34; //@@@: this.cb_chartThickness.TabIndex = 34;
            this.cb_chartThickness.SelectedIndexChanged += new System.EventHandler(this.cb_chartThickness_SelectedIndexChanged); //@@@: this.cb_chartThickness.SelectedIndexChanged += new System.EventHandler(this.cb_chartThickness_SelectedIndexChanged);
            // 
            // label54
            // 
            this.label54.AutoSize = true; //@@@: this.label54.AutoSize = true;
            this.label54.Location = new System.Drawing.Point(218, 45); //@@@: this.label54.Location = new System.Drawing.Point(218, 45);
            this.label54.Name = "label54"; //@@@: this.label54.Name = "label54";
            this.label54.Size = new System.Drawing.Size(70, 13); //@@@: this.label54.Size = new System.Drawing.Size(70, 13);
            this.label54.TabIndex = 33; //@@@: this.label54.TabIndex = 33;
            this.label54.Text = "Pie chart size"; //@@@: this.label54.Text = "Pie chart size";
            // 
            // cb_chartSize
            // 
            this.cb_chartSize.FormattingEnabled = true; //@@@: this.cb_chartSize.FormattingEnabled = true;
            this.cb_chartSize.Location = new System.Drawing.Point(295, 42); //@@@: this.cb_chartSize.Location = new System.Drawing.Point(295, 42);
            this.cb_chartSize.Name = "cb_chartSize"; //@@@: this.cb_chartSize.Name = "cb_chartSize";
            this.cb_chartSize.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_chartSize.Size = new System.Drawing.Size(121, 21);
            this.cb_chartSize.TabIndex = 32; //@@@: this.cb_chartSize.TabIndex = 32;
            this.cb_chartSize.SelectedIndexChanged += new System.EventHandler(this.cb_chartSize_SelectedIndexChanged); //@@@: this.cb_chartSize.SelectedIndexChanged += new System.EventHandler(this.cb_chartSize_SelectedIndexChanged);
            // 
            // label55
            // 
            this.label55.AutoSize = true; //@@@: this.label55.AutoSize = true;
            this.label55.Location = new System.Drawing.Point(7, 45); //@@@: this.label55.Location = new System.Drawing.Point(7, 45);
            this.label55.Name = "label55"; //@@@: this.label55.Name = "label55";
            this.label55.Size = new System.Drawing.Size(67, 13); //@@@: this.label55.Size = new System.Drawing.Size(67, 13);
            this.label55.TabIndex = 31; //@@@: this.label55.TabIndex = 31;
            this.label55.Text = "Bar grid lines"; //@@@: this.label55.Text = "Bar grid lines";
            // 
            // cb_linesType
            // 
            this.cb_linesType.FormattingEnabled = true; //@@@: this.cb_linesType.FormattingEnabled = true;
            this.cb_linesType.Location = new System.Drawing.Point(77, 42); //@@@: this.cb_linesType.Location = new System.Drawing.Point(77, 42);
            this.cb_linesType.Name = "cb_linesType"; //@@@: this.cb_linesType.Name = "cb_linesType";
            this.cb_linesType.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_linesType.Size = new System.Drawing.Size(121, 21);
            this.cb_linesType.TabIndex = 30; //@@@: this.cb_linesType.TabIndex = 30;
            this.cb_linesType.SelectedIndexChanged += new System.EventHandler(this.cb_linesType_SelectedIndexChanged); //@@@: this.cb_linesType.SelectedIndexChanged += new System.EventHandler(this.cb_linesType_SelectedIndexChanged);
            // 
            // label53
            // 
            this.label53.AutoSize = true; //@@@: this.label53.AutoSize = true;
            this.label53.Location = new System.Drawing.Point(218, 18); //@@@: this.label53.Location = new System.Drawing.Point(218, 18);
            this.label53.Name = "label53"; //@@@: this.label53.Name = "label53";
            this.label53.Size = new System.Drawing.Size(39, 13); //@@@: this.label53.Size = new System.Drawing.Size(39, 13);
            this.label53.TabIndex = 29; //@@@: this.label53.TabIndex = 29;
            this.label53.Text = "Format"; //@@@: this.label53.Text = "Format";
            // 
            // cb_formatType
            // 
            this.cb_formatType.FormattingEnabled = true; //@@@: this.cb_formatType.FormattingEnabled = true;
            this.cb_formatType.Location = new System.Drawing.Point(295, 15); //@@@: this.cb_formatType.Location = new System.Drawing.Point(295, 15);
            this.cb_formatType.Name = "cb_formatType"; //@@@: this.cb_formatType.Name = "cb_formatType";
            this.cb_formatType.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_formatType.Size = new System.Drawing.Size(121, 21);
            this.cb_formatType.TabIndex = 28; //@@@: this.cb_formatType.TabIndex = 28;
            this.cb_formatType.SelectedIndexChanged += new System.EventHandler(this.cb_formatType_SelectedIndexChanged); //@@@: this.cb_formatType.SelectedIndexChanged += new System.EventHandler(this.cb_formatType_SelectedIndexChanged);
            // 
            // label52
            // 
            this.label52.AutoSize = true; //@@@: this.label52.AutoSize = true;
            this.label52.Location = new System.Drawing.Point(7, 18); //@@@: this.label52.Location = new System.Drawing.Point(7, 18);
            this.label52.Name = "label52"; //@@@: this.label52.Name = "label52";
            this.label52.Size = new System.Drawing.Size(31, 13); //@@@: this.label52.Size = new System.Drawing.Size(31, 13);
            this.label52.TabIndex = 27; //@@@: this.label52.TabIndex = 27;
            this.label52.Text = "Type"; //@@@: this.label52.Text = "Type";
            // 
            // cb_type
            // 
            this.cb_type.FormattingEnabled = true; //@@@: this.cb_type.FormattingEnabled = true;
            this.cb_type.Location = new System.Drawing.Point(77, 15); //@@@: this.cb_type.Location = new System.Drawing.Point(77, 15);
            this.cb_type.Name = "cb_type"; //@@@: this.cb_type.Name = "cb_type";
            this.cb_type.Size = new System.Drawing.Size(121, 21); //@@@: this.cb_type.Size = new System.Drawing.Size(121, 21);
            this.cb_type.TabIndex = 26; //@@@: this.cb_type.TabIndex = 26;
            this.cb_type.SelectedIndexChanged += new System.EventHandler(this.cb_type_SelectedIndexChanged); //@@@: this.cb_type.SelectedIndexChanged += new System.EventHandler(this.cb_type_SelectedIndexChanged);
            // 
            // cmd_apply
            // 
            this.cmd_apply.Location = new System.Drawing.Point(279, 590); //@@@: this.cmd_apply.Location = new System.Drawing.Point(279, 590);
            this.cmd_apply.Name = "cmd_apply"; //@@@: this.cmd_apply.Name = "cmd_apply";
            this.cmd_apply.Size = new System.Drawing.Size(75, 23); //@@@: this.cmd_apply.Size = new System.Drawing.Size(75, 23);
            this.cmd_apply.TabIndex = 2; //@@@: this.cmd_apply.TabIndex = 2;
            this.cmd_apply.Text = "Apply"; //@@@: this.cmd_apply.Text = "Apply";
            this.cmd_apply.UseVisualStyleBackColor = true; //@@@: this.cmd_apply.UseVisualStyleBackColor = true;
            this.cmd_apply.Click += new System.EventHandler(this.cmd_apply_Click); //@@@: this.cmd_apply.Click += new System.EventHandler(this.cmd_apply_Click);
            // 
            // cmd_cancel
            // 
            this.cmd_cancel.Location = new System.Drawing.Point(360, 590); //@@@: this.cmd_cancel.Location = new System.Drawing.Point(360, 590);
            this.cmd_cancel.Name = "cmd_cancel"; //@@@: this.cmd_cancel.Name = "cmd_cancel";
            this.cmd_cancel.Size = new System.Drawing.Size(75, 23); //@@@: this.cmd_cancel.Size = new System.Drawing.Size(75, 23);
            this.cmd_cancel.TabIndex = 3; //@@@: this.cmd_cancel.TabIndex = 3;
            this.cmd_cancel.Text = "Cancel"; //@@@: this.cmd_cancel.Text = "Cancel";
            this.cmd_cancel.UseVisualStyleBackColor = true; //@@@: this.cmd_cancel.UseVisualStyleBackColor = true;
            this.cmd_cancel.Click += new System.EventHandler(this.cmd_cancel_Click); //@@@: this.cmd_cancel.Click += new System.EventHandler(this.cmd_cancel_Click);
            // 
            // fProperties
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F); //@@@: this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font; //@@@: this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(451, 622); //@@@: this.ClientSize = new System.Drawing.Size(451, 622);
            this.Controls.Add(this.cmd_cancel); //@@@: this.Controls.Add(this.cmd_cancel);
            this.Controls.Add(this.cmd_apply); //@@@: this.Controls.Add(this.cmd_apply);
            this.Controls.Add(this.tab_main); //@@@: this.Controls.Add(this.tab_main);
            this.Controls.Add(this.panel1); //@@@: this.Controls.Add(this.panel1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle; //@@@: this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false; //@@@: this.MaximizeBox = false;
            this.MinimizeBox = false; //@@@: this.MinimizeBox = false;
            this.Name = "fProperties"; //@@@: this.Name = "fProperties";
            this.Text = "Control properties"; //@@@: this.Text = "Control properties";
            this.Load += new System.EventHandler(this.fProperties_Load); //@@@: this.Load += new System.EventHandler(this.fProperties_Load);
            this.panel1.ResumeLayout(false); //@@@: this.panel1.ResumeLayout(false);
            this.panel1.PerformLayout(); //@@@: this.panel1.PerformLayout();
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.tab_main.ResumeLayout(false); //@@@: this.tab_main.ResumeLayout(false);
            this.tbpFormat.ResumeLayout(false); //@@@: this.tbpFormat.ResumeLayout(false);
            this.tbpFormat.PerformLayout(); //@@@: this.tbpFormat.PerformLayout();
            this.tbpFormulas.ResumeLayout(false); //@@@: this.tbpFormulas.ResumeLayout(false);
            this.tbpFormulas.PerformLayout(); //@@@: this.tbpFormulas.PerformLayout();
            this.groupBox3.ResumeLayout(false); //@@@: this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout(); //@@@: this.groupBox3.PerformLayout();
            this.groupBox2.ResumeLayout(false); //@@@: this.groupBox2.ResumeLayout(false);
            this.groupBox1.ResumeLayout(false); //@@@: this.groupBox1.ResumeLayout(false);
            this.tbpDatabase.ResumeLayout(false); //@@@: this.tbpDatabase.ResumeLayout(false);
            this.tbpDatabase.PerformLayout(); //@@@: this.tbpDatabase.PerformLayout();
            this.tbpImage.ResumeLayout(false); //@@@: this.tbpImage.ResumeLayout(false);
            this.tbpImage.PerformLayout(); //@@@: this.tbpImage.PerformLayout();
            this.panel2.ResumeLayout(false); //@@@: this.panel2.ResumeLayout(false);
            this.panel2.PerformLayout(); //@@@: this.panel2.PerformLayout();
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pic_image)).EndInit();
            this.tbpBorders.ResumeLayout(false); //@@@: this.tbpBorders.ResumeLayout(false);
            this.tbpBorders.PerformLayout(); //@@@: this.tbpBorders.PerformLayout();
            this.tbpChart.ResumeLayout(false); //@@@: this.tbpChart.ResumeLayout(false);
            this.tbpChart.PerformLayout(); //@@@: this.tbpChart.PerformLayout();
            this.groupBox5.ResumeLayout(false); //@@@: this.groupBox5.ResumeLayout(false);
            this.groupBox5.PerformLayout(); //@@@: this.groupBox5.PerformLayout();
            this.groupBox4.ResumeLayout(false); //@@@: this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout(); //@@@: this.groupBox4.PerformLayout();
            this.ResumeLayout(false); //@@@: this.ResumeLayout(false);

        }; //@@@: }

UNKNOWN >>         #endregion //@@@: #endregion

        let panel1 = null; //@@@: private System.Windows.Forms.Panel panel1;
        let pictureBox1 = null; //@@@: private System.Windows.Forms.PictureBox pictureBox1;
        let tab_main = null; //@@@: private System.Windows.Forms.TabControl tab_main;
        let tbpFormat = null; //@@@: private System.Windows.Forms.TabPage tbpFormat;
        let label24 = null; //@@@: private System.Windows.Forms.Label label24;
        let tx_exportColIdx = null; //@@@: private System.Windows.Forms.TextBox tx_exportColIdx;
        let label23 = null; //@@@: private System.Windows.Forms.Label label23;
        let chk_isFreeCtrl = null; //@@@: private System.Windows.Forms.CheckBox chk_isFreeCtrl;
        let label22 = null; //@@@: private System.Windows.Forms.Label label22;
        let chk_wordWrap = null; //@@@: private System.Windows.Forms.CheckBox chk_wordWrap;
        let chk_canGrow = null; //@@@: private System.Windows.Forms.CheckBox chk_canGrow;
        let label21 = null; //@@@: private System.Windows.Forms.Label label21;
        let label20 = null; //@@@: private System.Windows.Forms.Label label20;
        let tx_width = null; //@@@: private System.Windows.Forms.TextBox tx_width;
        let label19 = null; //@@@: private System.Windows.Forms.Label label19;
        let tx_height = null; //@@@: private System.Windows.Forms.TextBox tx_height;
        let label18 = null; //@@@: private System.Windows.Forms.Label label18;
        let tx_top = null; //@@@: private System.Windows.Forms.TextBox tx_top;
        let label17 = null; //@@@: private System.Windows.Forms.Label label17;
        let tx_left = null; //@@@: private System.Windows.Forms.TextBox tx_left;
        let label16 = null; //@@@: private System.Windows.Forms.Label label16;
        let label15 = null; //@@@: private System.Windows.Forms.Label label15;
        let label13 = null; //@@@: private System.Windows.Forms.Label label13;
        let tx_symbol = null; //@@@: private System.Windows.Forms.TextBox tx_symbol;
        let label14 = null; //@@@: private System.Windows.Forms.Label label14;
        let tx_format = null; //@@@: private System.Windows.Forms.TextBox tx_format;
        let chk_transparent = null; //@@@: private System.Windows.Forms.CheckBox chk_transparent;
        let sh_backColor = null; //@@@: private System.Windows.Forms.Label sh_backColor;
        let label11 = null; //@@@: private System.Windows.Forms.Label label11;
        let tx_backColor = null; //@@@: private System.Windows.Forms.TextBox tx_backColor;
        let chk_fontStrike = null; //@@@: private System.Windows.Forms.CheckBox chk_fontStrike;
        let chk_fontItalic = null; //@@@: private System.Windows.Forms.CheckBox chk_fontItalic;
        let sh_foreColor = null; //@@@: private System.Windows.Forms.Label sh_foreColor;
        let label9 = null; //@@@: private System.Windows.Forms.Label label9;
        let tx_foreColor = null; //@@@: private System.Windows.Forms.TextBox tx_foreColor;
        let chk_fontUnderline = null; //@@@: private System.Windows.Forms.CheckBox chk_fontUnderline;
        let chk_fontBold = null; //@@@: private System.Windows.Forms.CheckBox chk_fontBold;
        let label8 = null; //@@@: private System.Windows.Forms.Label label8;
        let cb_align = null; //@@@: private System.Windows.Forms.ComboBox cb_align;
        let label7 = null; //@@@: private System.Windows.Forms.Label label7;
        let tx_fontSize = null; //@@@: private System.Windows.Forms.TextBox tx_fontSize;
        let label6 = null; //@@@: private System.Windows.Forms.Label label6;
        let tx_font = null; //@@@: private System.Windows.Forms.TextBox tx_font;
        let label5 = null; //@@@: private System.Windows.Forms.Label label5;
        let tx_tag = null; //@@@: private System.Windows.Forms.TextBox tx_tag;
        let label4 = null; //@@@: private System.Windows.Forms.Label label4;
        let tx_text = null; //@@@: private System.Windows.Forms.TextBox tx_text;
        let label3 = null; //@@@: private System.Windows.Forms.Label label3;
        let label2 = null; //@@@: private System.Windows.Forms.Label label2;
        let tx_name = null; //@@@: private System.Windows.Forms.TextBox tx_name;
        let tbpFormulas = null; //@@@: private System.Windows.Forms.TabPage tbpFormulas;
        let tbpDatabase = null; //@@@: private System.Windows.Forms.TabPage tbpDatabase;
        let tbpImage = null; //@@@: private System.Windows.Forms.TabPage tbpImage;
        let tbpBorders = null; //@@@: private System.Windows.Forms.TabPage tbpBorders;
        let tbpChart = null; //@@@: private System.Windows.Forms.TabPage tbpChart;
        let cmd_apply = null; //@@@: private System.Windows.Forms.Button cmd_apply;
        let cmd_cancel = null; //@@@: private System.Windows.Forms.Button cmd_cancel;
        let groupBox3 = null; //@@@: private System.Windows.Forms.GroupBox groupBox3;
        let label41 = null; //@@@: private System.Windows.Forms.Label label41;
        let op_afterPrint = null; //@@@: private System.Windows.Forms.RadioButton op_afterPrint;
        let op_beforePrint = null; //@@@: private System.Windows.Forms.RadioButton op_beforePrint;
        let label40 = null; //@@@: private System.Windows.Forms.Label label40;
        let label39 = null; //@@@: private System.Windows.Forms.Label label39;
        let tx_idxGroup = null; //@@@: private System.Windows.Forms.TextBox tx_idxGroup;
        let label37 = null; //@@@: private System.Windows.Forms.Label label37;
        let label38 = null; //@@@: private System.Windows.Forms.Label label38;
        let label35 = null; //@@@: private System.Windows.Forms.Label label35;
        let label36 = null; //@@@: private System.Windows.Forms.Label label36;
        let label33 = null; //@@@: private System.Windows.Forms.Label label33;
        let label34 = null; //@@@: private System.Windows.Forms.Label label34;
        let label31 = null; //@@@: private System.Windows.Forms.Label label31;
        let label32 = null; //@@@: private System.Windows.Forms.Label label32;
        let label30 = null; //@@@: private System.Windows.Forms.Label label30;
        let label29 = null; //@@@: private System.Windows.Forms.Label label29;
        let label28 = null; //@@@: private System.Windows.Forms.Label label28;
        let groupBox2 = null; //@@@: private System.Windows.Forms.GroupBox groupBox2;
        let lb_formulaValue = null; //@@@: private System.Windows.Forms.Label lb_formulaValue;
        let chk_formulaValue = null; //@@@: private System.Windows.Forms.CheckBox chk_formulaValue;
        let cmd_formulaValue = null; //@@@: private System.Windows.Forms.Button cmd_formulaValue;
        let groupBox1 = null; //@@@: private System.Windows.Forms.GroupBox groupBox1;
        let lb_formulaHide = null; //@@@: private System.Windows.Forms.Label lb_formulaHide;
        let label25 = null; //@@@: private System.Windows.Forms.Label label25;
        let chk_formulaHide = null; //@@@: private System.Windows.Forms.CheckBox chk_formulaHide;
        let cmd_formulaHide = null; //@@@: private System.Windows.Forms.Button cmd_formulaHide;
        let cmd_dbField = null; //@@@: private System.Windows.Forms.Button cmd_dbField;
        let label42 = null; //@@@: private System.Windows.Forms.Label label42;
        let tx_dbField = null; //@@@: private System.Windows.Forms.TextBox tx_dbField;
        let pic_image = null; //@@@: private System.Windows.Forms.PictureBox pic_image;
        let cmd_imageFile = null; //@@@: private System.Windows.Forms.Button cmd_imageFile;
        let label43 = null; //@@@: private System.Windows.Forms.Label label43;
        let tx_imageFile = null; //@@@: private System.Windows.Forms.TextBox tx_imageFile;
        let chk_borderRounded = null; //@@@: private System.Windows.Forms.CheckBox chk_borderRounded;
        let label51 = null; //@@@: private System.Windows.Forms.Label label51;
        let tx_borderWidth = null; //@@@: private System.Windows.Forms.TextBox tx_borderWidth;
        let sh_borderShadow = null; //@@@: private System.Windows.Forms.Label sh_borderShadow;
        let label50 = null; //@@@: private System.Windows.Forms.Label label50;
        let tx_borderShadow = null; //@@@: private System.Windows.Forms.TextBox tx_borderShadow;
        let sh_border3D = null; //@@@: private System.Windows.Forms.Label sh_border3D;
        let label45 = null; //@@@: private System.Windows.Forms.Label label45;
        let tx_border3D = null; //@@@: private System.Windows.Forms.TextBox tx_border3D;
        let sh_borderColor = null; //@@@: private System.Windows.Forms.Label sh_borderColor;
        let label47 = null; //@@@: private System.Windows.Forms.Label label47;
        let tx_borderColor = null; //@@@: private System.Windows.Forms.TextBox tx_borderColor;
        let label48 = null; //@@@: private System.Windows.Forms.Label label48;
        let cb_borderType = null; //@@@: private System.Windows.Forms.ComboBox cb_borderType;
        let label56 = null; //@@@: private System.Windows.Forms.Label label56;
        let cb_chartThickness = null; //@@@: private System.Windows.Forms.ComboBox cb_chartThickness;
        let label54 = null; //@@@: private System.Windows.Forms.Label label54;
        let cb_chartSize = null; //@@@: private System.Windows.Forms.ComboBox cb_chartSize;
        let label55 = null; //@@@: private System.Windows.Forms.Label label55;
        let cb_linesType = null; //@@@: private System.Windows.Forms.ComboBox cb_linesType;
        let label53 = null; //@@@: private System.Windows.Forms.Label label53;
        let cb_formatType = null; //@@@: private System.Windows.Forms.ComboBox cb_formatType;
        let label52 = null; //@@@: private System.Windows.Forms.Label label52;
        let cb_type = null; //@@@: private System.Windows.Forms.ComboBox cb_type;
        let chk_sort = null; //@@@: private System.Windows.Forms.CheckBox chk_sort;
        let chk_showOutlines = null; //@@@: private System.Windows.Forms.CheckBox chk_showOutlines;
        let chk_showBarValues = null; //@@@: private System.Windows.Forms.CheckBox chk_showBarValues;
        let label59 = null; //@@@: private System.Windows.Forms.Label label59;
        let tx_chartTop = null; //@@@: private System.Windows.Forms.TextBox tx_chartTop;
        let groupBox5 = null; //@@@: private System.Windows.Forms.GroupBox groupBox5;
        let label63 = null; //@@@: private System.Windows.Forms.Label label63;
        let cb_colorSerie2 = null; //@@@: private System.Windows.Forms.ComboBox cb_colorSerie2;
        let cmd_dbFieldLbl2 = null; //@@@: private System.Windows.Forms.Button cmd_dbFieldLbl2;
        let label64 = null; //@@@: private System.Windows.Forms.Label label64;
        let tx_dbFieldLbl2 = null; //@@@: private System.Windows.Forms.TextBox tx_dbFieldLbl2;
        let cmd_dbFieldVal2 = null; //@@@: private System.Windows.Forms.Button cmd_dbFieldVal2;
        let label65 = null; //@@@: private System.Windows.Forms.Label label65;
        let tx_dbFieldVal2 = null; //@@@: private System.Windows.Forms.TextBox tx_dbFieldVal2;
        let groupBox4 = null; //@@@: private System.Windows.Forms.GroupBox groupBox4;
        let label62 = null; //@@@: private System.Windows.Forms.Label label62;
        let cb_colorSerie1 = null; //@@@: private System.Windows.Forms.ComboBox cb_colorSerie1;
        let cmd_dbFieldLbl1 = null; //@@@: private System.Windows.Forms.Button cmd_dbFieldLbl1;
        let label61 = null; //@@@: private System.Windows.Forms.Label label61;
        let tx_dbFieldLbl1 = null; //@@@: private System.Windows.Forms.TextBox tx_dbFieldLbl1;
        let cmd_dbFieldVal1 = null; //@@@: private System.Windows.Forms.Button cmd_dbFieldVal1;
        let label60 = null; //@@@: private System.Windows.Forms.Label label60;
        let tx_dbFieldVal1 = null; //@@@: private System.Windows.Forms.TextBox tx_dbFieldVal1;
        let label58 = null; //@@@: private System.Windows.Forms.Label label58;
        let tx_chartGroupValue = null; //@@@: private System.Windows.Forms.TextBox tx_chartGroupValue;
        let cmd_dbFieldGroupValue = null; //@@@: private System.Windows.Forms.Button cmd_dbFieldGroupValue;
        let label57 = null; //@@@: private System.Windows.Forms.Label label57;
        let tx_dbFieldGroupValue = null; //@@@: private System.Windows.Forms.TextBox tx_dbFieldGroupValue;
        let cmd_backColor = null; //@@@: private System.Windows.Forms.Button cmd_backColor;
        let cmd_foreColor = null; //@@@: private System.Windows.Forms.Button cmd_foreColor;
        let cmd_borderShadowColor = null; //@@@: private System.Windows.Forms.Button cmd_borderShadowColor;
        let cmd_borderColor3d = null; //@@@: private System.Windows.Forms.Button cmd_borderColor3d;
        let cmd_borderColor = null; //@@@: private System.Windows.Forms.Button cmd_borderColor;
        let lb_control = null; //@@@: private System.Windows.Forms.Label lb_control;
        let colorDialog = null; //@@@: private System.Windows.Forms.ColorDialog colorDialog;
        let fontDialog = null; //@@@: private System.Windows.Forms.FontDialog fontDialog;
        let panel2 = null; //@@@: private System.Windows.Forms.Panel panel2;
        let cmd_font = null; //@@@: private System.Windows.Forms.Button cmd_font;
    } //@@@: }
} //@@@: }
