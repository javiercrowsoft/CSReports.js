(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
UNKNOWN >>     partial class fMain //@@@: partial class fMain
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
            this.mnMain = new System.Windows.Forms.MenuStrip(); //@@@: this.mnMain = new System.Windows.Forms.MenuStrip();
            this.mnFile = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnFile = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuNewReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuNewReport = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuOpenReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuOpenReport = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuFileRecentList = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuFileRecentList = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuSaveReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuSaveReport = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuReportSaveAs = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuReportSaveAs = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator7 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator7 = new System.Windows.Forms.ToolStripSeparator();
            this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.exitToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.printerSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.printerSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator8 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator8 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuPreviewReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuPreviewReport = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator9 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator9 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuPrintReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuPrintReport = new System.Windows.Forms.ToolStripMenuItem();
            this.openRecentToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.openRecentToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuExit = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuExit = new System.Windows.Forms.ToolStripMenuItem();
            this.mnEdit = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnEdit = new System.Windows.Forms.ToolStripMenuItem();
            this.copyToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.copyToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.cutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.pasteToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.pasteToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator10 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator10 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuEditSearch = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditSearch = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator11 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator11 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuEditAddSec = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddSec = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddHeader = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddHeader = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddGroup = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddGroup = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddFooter = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddFooter = new System.Windows.Forms.ToolStripMenuItem();
            this.controlsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.controlsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddLabel = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddLabel = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddLine = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddLine = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddControl = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddControl = new System.Windows.Forms.ToolStripMenuItem();
            this.imageToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.imageToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.chartToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.chartToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator12 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator12 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuEditMove = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditMove = new System.Windows.Forms.ToolStripMenuItem();
            this.horizontalToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.horizontalToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.verticalToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.verticalToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.lockToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.lockToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.allDirectionsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.allDirectionsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator13 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator13 = new System.Windows.Forms.ToolStripSeparator();
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.sizeOfMoveStepWithKeyboardToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnView = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnView = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewToolbar = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuViewToolbar = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewControls = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuViewControls = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator14 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator14 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuViewTreeViewCtrls = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuViewTreeViewCtrls = new System.Windows.Forms.ToolStripMenuItem();
            this.viewGridToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.viewGridToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.pointsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.pointsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.linesToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.linesToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewGridMain = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuViewGridMain = new System.Windows.Forms.ToolStripMenuItem();
            this.mnDatabase = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnDatabase = new System.Windows.Forms.ToolStripMenuItem();
            this.connectionSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.connectionSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.viewParametersToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.viewParametersToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator15 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator15 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseConnectsAuxCfg = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseConnectsAuxCfg = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator16 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator16 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseSetDisconnected = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseSetDisconnected = new System.Windows.Forms.ToolStripMenuItem();
            this.manualSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.manualSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseEditStrConnect = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseEditStrConnect = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseConnectConfig = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseConnectConfig = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseEditEx = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseEditEx = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseSetToMainConnect = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseSetToMainConnect = new System.Windows.Forms.ToolStripMenuItem();
            this.mnTool = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnTool = new System.Windows.Forms.ToolStripMenuItem();
            this.optionsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.optionsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnHelp = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnHelp = new System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.aboutToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.tbMain = new System.Windows.Forms.ToolStrip(); //@@@: this.tbMain = new System.Windows.Forms.ToolStrip();
            this.tsbNew = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbNew = new System.Windows.Forms.ToolStripButton();
            this.toolStripButton2 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton2 = new System.Windows.Forms.ToolStripButton();
            this.toolStripButton3 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton3 = new System.Windows.Forms.ToolStripButton();
            this.toolStripButton14 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton14 = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton4 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton4 = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton5 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton5 = new System.Windows.Forms.ToolStripButton();
            this.toolStripButton6 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton6 = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator3 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator3 = new System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton7 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton7 = new System.Windows.Forms.ToolStripButton();
            this.toolStripButton8 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton8 = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator4 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator4 = new System.Windows.Forms.ToolStripSeparator();
            this.btnAlignLeft = new System.Windows.Forms.ToolStripButton(); //@@@: this.btnAlignLeft = new System.Windows.Forms.ToolStripButton();
            this.btnAligntCenter = new System.Windows.Forms.ToolStripButton(); //@@@: this.btnAligntCenter = new System.Windows.Forms.ToolStripButton();
            this.btnAlignRight = new System.Windows.Forms.ToolStripButton(); //@@@: this.btnAlignRight = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator5 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator5 = new System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton12 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton12 = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator6 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator6 = new System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton13 = new System.Windows.Forms.ToolStripButton(); //@@@: this.toolStripButton13 = new System.Windows.Forms.ToolStripButton();
            this.sbMain = new System.Windows.Forms.StatusStrip(); //@@@: this.sbMain = new System.Windows.Forms.StatusStrip();
            this.splitContainer1 = new System.Windows.Forms.SplitContainer(); //@@@: this.splitContainer1 = new System.Windows.Forms.SplitContainer();
            this.panel1 = new System.Windows.Forms.Panel(); //@@@: this.panel1 = new System.Windows.Forms.Panel();
            this.tabControl2 = new System.Windows.Forms.TabControl(); //@@@: this.tabControl2 = new System.Windows.Forms.TabControl();
            this.tabPage3 = new System.Windows.Forms.TabPage(); //@@@: this.tabPage3 = new System.Windows.Forms.TabPage();
            this.listView2 = new System.Windows.Forms.ListView(); //@@@: this.listView2 = new System.Windows.Forms.ListView();
            this.tabPage4 = new System.Windows.Forms.TabPage(); //@@@: this.tabPage4 = new System.Windows.Forms.TabPage();
            this.listView1 = new System.Windows.Forms.ListView(); //@@@: this.listView1 = new System.Windows.Forms.ListView();
            this.tabPage5 = new System.Windows.Forms.TabPage(); //@@@: this.tabPage5 = new System.Windows.Forms.TabPage();
            this.treeView1 = new System.Windows.Forms.TreeView(); //@@@: this.treeView1 = new System.Windows.Forms.TreeView();
            this.tabReports = new System.Windows.Forms.TabControl(); //@@@: this.tabReports = new System.Windows.Forms.TabControl();
            this.tbpEditor = new System.Windows.Forms.TabPage(); //@@@: this.tbpEditor = new System.Windows.Forms.TabPage();
            this.pnEditor = new System.Windows.Forms.Panel(); //@@@: this.pnEditor = new System.Windows.Forms.Panel();
            this.pnRule = new System.Windows.Forms.PictureBox(); //@@@: this.pnRule = new System.Windows.Forms.PictureBox();
            this.pnReport = new System.Windows.Forms.PictureBox(); //@@@: this.pnReport = new System.Windows.Forms.PictureBox();
            this.openFileDlg = new System.Windows.Forms.OpenFileDialog(); //@@@: this.openFileDlg = new System.Windows.Forms.OpenFileDialog();
            this.saveFielDlg = new System.Windows.Forms.SaveFileDialog(); //@@@: this.saveFielDlg = new System.Windows.Forms.SaveFileDialog();
            this.mnMain.SuspendLayout(); //@@@: this.mnMain.SuspendLayout();
            this.tbMain.SuspendLayout(); //@@@: this.tbMain.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).BeginInit();
            this.splitContainer1.Panel1.SuspendLayout(); //@@@: this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout(); //@@@: this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout(); //@@@: this.splitContainer1.SuspendLayout();
            this.panel1.SuspendLayout(); //@@@: this.panel1.SuspendLayout();
            this.tabControl2.SuspendLayout(); //@@@: this.tabControl2.SuspendLayout();
            this.tabPage3.SuspendLayout(); //@@@: this.tabPage3.SuspendLayout();
            this.tabPage4.SuspendLayout(); //@@@: this.tabPage4.SuspendLayout();
            this.tabPage5.SuspendLayout(); //@@@: this.tabPage5.SuspendLayout();
            this.tabReports.SuspendLayout(); //@@@: this.tabReports.SuspendLayout();
            this.tbpEditor.SuspendLayout(); //@@@: this.tbpEditor.SuspendLayout();
            this.pnEditor.SuspendLayout(); //@@@: this.pnEditor.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnRule)).BeginInit();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnReport)).BeginInit();
            this.SuspendLayout(); //@@@: this.SuspendLayout();
            // 
            // mnMain
            // 
            this.mnMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnFile, //@@@: this.mnFile,
            this.mnEdit, //@@@: this.mnEdit,
            this.mnView, //@@@: this.mnView,
            this.mnDatabase, //@@@: this.mnDatabase,
            this.mnTool, //@@@: this.mnTool,
            this.mnHelp}); //@@@: this.mnHelp});
            this.mnMain.Location = new System.Drawing.Point(0, 0); //@@@: this.mnMain.Location = new System.Drawing.Point(0, 0);
            this.mnMain.Name = "mnMain"; //@@@: this.mnMain.Name = "mnMain";
            this.mnMain.Size = new System.Drawing.Size(682, 24); //@@@: this.mnMain.Size = new System.Drawing.Size(682, 24);
            this.mnMain.TabIndex = 0; //@@@: this.mnMain.TabIndex = 0;
            this.mnMain.Text = "menuStrip1"; //@@@: this.mnMain.Text = "menuStrip1";
            // 
            // mnFile
            // 
            this.mnFile.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnFile.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuNewReport, //@@@: this.mnuNewReport,
            this.mnuOpenReport, //@@@: this.mnuOpenReport,
            this.mnuFileRecentList, //@@@: this.mnuFileRecentList,
            this.mnuSaveReport, //@@@: this.mnuSaveReport,
            this.mnuReportSaveAs, //@@@: this.mnuReportSaveAs,
            this.toolStripSeparator7, //@@@: this.toolStripSeparator7,
            this.exitToolStripMenuItem, //@@@: this.exitToolStripMenuItem,
            this.printerSettingsToolStripMenuItem, //@@@: this.printerSettingsToolStripMenuItem,
            this.toolStripSeparator8, //@@@: this.toolStripSeparator8,
            this.mnuPreviewReport, //@@@: this.mnuPreviewReport,
            this.toolStripSeparator9, //@@@: this.toolStripSeparator9,
            this.mnuPrintReport, //@@@: this.mnuPrintReport,
            this.openRecentToolStripMenuItem, //@@@: this.openRecentToolStripMenuItem,
            this.mnuExit}); //@@@: this.mnuExit});
            this.mnFile.Name = "mnFile"; //@@@: this.mnFile.Name = "mnFile";
            this.mnFile.Size = new System.Drawing.Size(37, 20); //@@@: this.mnFile.Size = new System.Drawing.Size(37, 20);
            this.mnFile.Text = "File"; //@@@: this.mnFile.Text = "File";
            // 
            // mnuNewReport
            // 
            this.mnuNewReport.Name = "mnuNewReport"; //@@@: this.mnuNewReport.Name = "mnuNewReport";
            this.mnuNewReport.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuNewReport.Size = new System.Drawing.Size(180, 22);
            this.mnuNewReport.Text = "New"; //@@@: this.mnuNewReport.Text = "New";
            this.mnuNewReport.Click += new System.EventHandler(this.mnuNewReport_Click); //@@@: this.mnuNewReport.Click += new System.EventHandler(this.mnuNewReport_Click);
            // 
            // mnuOpenReport
            // 
            this.mnuOpenReport.Name = "mnuOpenReport"; //@@@: this.mnuOpenReport.Name = "mnuOpenReport";
            this.mnuOpenReport.ShortcutKeys = (()); //@@@: this.mnuOpenReport.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.O)));
            this.mnuOpenReport.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuOpenReport.Size = new System.Drawing.Size(180, 22);
            this.mnuOpenReport.Text = "Open"; //@@@: this.mnuOpenReport.Text = "Open";
            this.mnuOpenReport.Click += new System.EventHandler(this.mnuOpenReport_Click); //@@@: this.mnuOpenReport.Click += new System.EventHandler(this.mnuOpenReport_Click);
            // 
            // mnuFileRecentList
            // 
            this.mnuFileRecentList.Name = "mnuFileRecentList"; //@@@: this.mnuFileRecentList.Name = "mnuFileRecentList";
            this.mnuFileRecentList.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuFileRecentList.Size = new System.Drawing.Size(180, 22);
            this.mnuFileRecentList.Text = "Open Recent Files ..."; //@@@: this.mnuFileRecentList.Text = "Open Recent Files ...";
            // 
            // mnuSaveReport
            // 
            this.mnuSaveReport.Name = "mnuSaveReport"; //@@@: this.mnuSaveReport.Name = "mnuSaveReport";
            this.mnuSaveReport.ShortcutKeys = (()); //@@@: this.mnuSaveReport.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.S)));
            this.mnuSaveReport.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuSaveReport.Size = new System.Drawing.Size(180, 22);
            this.mnuSaveReport.Text = "Save"; //@@@: this.mnuSaveReport.Text = "Save";
            // 
            // mnuReportSaveAs
            // 
            this.mnuReportSaveAs.Name = "mnuReportSaveAs"; //@@@: this.mnuReportSaveAs.Name = "mnuReportSaveAs";
            this.mnuReportSaveAs.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuReportSaveAs.Size = new System.Drawing.Size(180, 22);
            this.mnuReportSaveAs.Text = "Save As"; //@@@: this.mnuReportSaveAs.Text = "Save As";
            // 
            // toolStripSeparator7
            // 
            this.toolStripSeparator7.Name = "toolStripSeparator7"; //@@@: this.toolStripSeparator7.Name = "toolStripSeparator7";
            this.toolStripSeparator7.Size = new System.Drawing.Size(177, 6); //@@@: this.toolStripSeparator7.Size = new System.Drawing.Size(177, 6);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem"; //@@@: this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = new System.Drawing.Size(180, 22); //@@@: this.exitToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.exitToolStripMenuItem.Text = "Page Setup"; //@@@: this.exitToolStripMenuItem.Text = "Page Setup";
            // 
            // printerSettingsToolStripMenuItem
            // 
            this.printerSettingsToolStripMenuItem.Name = "printerSettingsToolStripMenuItem"; //@@@: this.printerSettingsToolStripMenuItem.Name = "printerSettingsToolStripMenuItem";
            this.printerSettingsToolStripMenuItem.Size = new System.Drawing.Size(180, 22); //@@@: this.printerSettingsToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.printerSettingsToolStripMenuItem.Text = "Printer Settings"; //@@@: this.printerSettingsToolStripMenuItem.Text = "Printer Settings";
            // 
            // toolStripSeparator8
            // 
            this.toolStripSeparator8.Name = "toolStripSeparator8"; //@@@: this.toolStripSeparator8.Name = "toolStripSeparator8";
            this.toolStripSeparator8.Size = new System.Drawing.Size(177, 6); //@@@: this.toolStripSeparator8.Size = new System.Drawing.Size(177, 6);
            // 
            // mnuPreviewReport
            // 
            this.mnuPreviewReport.Name = "mnuPreviewReport"; //@@@: this.mnuPreviewReport.Name = "mnuPreviewReport";
            this.mnuPreviewReport.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuPreviewReport.Size = new System.Drawing.Size(180, 22);
            this.mnuPreviewReport.Text = "Preview"; //@@@: this.mnuPreviewReport.Text = "Preview";
            // 
            // toolStripSeparator9
            // 
            this.toolStripSeparator9.Name = "toolStripSeparator9"; //@@@: this.toolStripSeparator9.Name = "toolStripSeparator9";
            this.toolStripSeparator9.Size = new System.Drawing.Size(177, 6); //@@@: this.toolStripSeparator9.Size = new System.Drawing.Size(177, 6);
            // 
            // mnuPrintReport
            // 
            this.mnuPrintReport.Name = "mnuPrintReport"; //@@@: this.mnuPrintReport.Name = "mnuPrintReport";
            this.mnuPrintReport.ShortcutKeys = (()); //@@@: this.mnuPrintReport.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.P)));
            this.mnuPrintReport.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuPrintReport.Size = new System.Drawing.Size(180, 22);
            this.mnuPrintReport.Text = "Print"; //@@@: this.mnuPrintReport.Text = "Print";
            // 
            // openRecentToolStripMenuItem
            // 
            this.openRecentToolStripMenuItem.Name = "openRecentToolStripMenuItem"; //@@@: this.openRecentToolStripMenuItem.Name = "openRecentToolStripMenuItem";
            this.openRecentToolStripMenuItem.Size = new System.Drawing.Size(180, 22); //@@@: this.openRecentToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.openRecentToolStripMenuItem.Text = "Open Recent"; //@@@: this.openRecentToolStripMenuItem.Text = "Open Recent";
            // 
            // mnuExit
            // 
            this.mnuExit.Name = "mnuExit"; //@@@: this.mnuExit.Name = "mnuExit";
            this.mnuExit.ShortcutKeys = (()); //@@@: this.mnuExit.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.Q)));
            this.mnuExit.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuExit.Size = new System.Drawing.Size(180, 22);
            this.mnuExit.Text = "Exit"; //@@@: this.mnuExit.Text = "Exit";
            // 
            // mnEdit
            // 
            this.mnEdit.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnEdit.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.copyToolStripMenuItem, //@@@: this.copyToolStripMenuItem,
            this.cutToolStripMenuItem, //@@@: this.cutToolStripMenuItem,
            this.pasteToolStripMenuItem, //@@@: this.pasteToolStripMenuItem,
            this.toolStripSeparator10, //@@@: this.toolStripSeparator10,
            this.mnuEditSearch, //@@@: this.mnuEditSearch,
            this.toolStripSeparator11, //@@@: this.toolStripSeparator11,
            this.mnuEditAddSec, //@@@: this.mnuEditAddSec,
            this.controlsToolStripMenuItem, //@@@: this.controlsToolStripMenuItem,
            this.toolStripSeparator12, //@@@: this.toolStripSeparator12,
            this.mnuEditMove}); //@@@: this.mnuEditMove});
            this.mnEdit.Name = "mnEdit"; //@@@: this.mnEdit.Name = "mnEdit";
            this.mnEdit.Size = new System.Drawing.Size(39, 20); //@@@: this.mnEdit.Size = new System.Drawing.Size(39, 20);
            this.mnEdit.Text = "Edit"; //@@@: this.mnEdit.Text = "Edit";
            // 
            // copyToolStripMenuItem
            // 
            this.copyToolStripMenuItem.Name = "copyToolStripMenuItem"; //@@@: this.copyToolStripMenuItem.Name = "copyToolStripMenuItem";
            this.copyToolStripMenuItem.ShortcutKeys = (()); //@@@: this.copyToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.C)));
            this.copyToolStripMenuItem.Size = new System.Drawing.Size(149, 22); //@@@: this.copyToolStripMenuItem.Size = new System.Drawing.Size(149, 22);
            this.copyToolStripMenuItem.Text = "Copy"; //@@@: this.copyToolStripMenuItem.Text = "Copy";
            // 
            // cutToolStripMenuItem
            // 
            this.cutToolStripMenuItem.Name = "cutToolStripMenuItem"; //@@@: this.cutToolStripMenuItem.Name = "cutToolStripMenuItem";
            this.cutToolStripMenuItem.ShortcutKeys = (()); //@@@: this.cutToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.X)));
            this.cutToolStripMenuItem.Size = new System.Drawing.Size(149, 22); //@@@: this.cutToolStripMenuItem.Size = new System.Drawing.Size(149, 22);
            this.cutToolStripMenuItem.Text = "Cut"; //@@@: this.cutToolStripMenuItem.Text = "Cut";
            // 
            // pasteToolStripMenuItem
            // 
            this.pasteToolStripMenuItem.Name = "pasteToolStripMenuItem"; //@@@: this.pasteToolStripMenuItem.Name = "pasteToolStripMenuItem";
            this.pasteToolStripMenuItem.ShortcutKeys = (()); //@@@: this.pasteToolStripMenuItem.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.V)));
            this.pasteToolStripMenuItem.Size = new System.Drawing.Size(149, 22); //@@@: this.pasteToolStripMenuItem.Size = new System.Drawing.Size(149, 22);
            this.pasteToolStripMenuItem.Text = "Paste"; //@@@: this.pasteToolStripMenuItem.Text = "Paste";
            // 
            // toolStripSeparator10
            // 
            this.toolStripSeparator10.Name = "toolStripSeparator10"; //@@@: this.toolStripSeparator10.Name = "toolStripSeparator10";
            this.toolStripSeparator10.Size = new System.Drawing.Size(146, 6); //@@@: this.toolStripSeparator10.Size = new System.Drawing.Size(146, 6);
            // 
            // mnuEditSearch
            // 
            this.mnuEditSearch.Name = "mnuEditSearch"; //@@@: this.mnuEditSearch.Name = "mnuEditSearch";
            this.mnuEditSearch.ShortcutKeys = (()); //@@@: this.mnuEditSearch.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.F)));
            this.mnuEditSearch.Size = new System.Drawing.Size(149, 22); //@@@: this.mnuEditSearch.Size = new System.Drawing.Size(149, 22);
            this.mnuEditSearch.Text = "Search"; //@@@: this.mnuEditSearch.Text = "Search";
            // 
            // toolStripSeparator11
            // 
            this.toolStripSeparator11.Name = "toolStripSeparator11"; //@@@: this.toolStripSeparator11.Name = "toolStripSeparator11";
            this.toolStripSeparator11.Size = new System.Drawing.Size(146, 6); //@@@: this.toolStripSeparator11.Size = new System.Drawing.Size(146, 6);
            // 
            // mnuEditAddSec
            // 
            this.mnuEditAddSec.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnuEditAddSec.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuEditAddHeader, //@@@: this.mnuEditAddHeader,
            this.mnuEditAddGroup, //@@@: this.mnuEditAddGroup,
            this.mnuEditAddFooter}); //@@@: this.mnuEditAddFooter});
            this.mnuEditAddSec.Name = "mnuEditAddSec"; //@@@: this.mnuEditAddSec.Name = "mnuEditAddSec";
            this.mnuEditAddSec.Size = new System.Drawing.Size(149, 22); //@@@: this.mnuEditAddSec.Size = new System.Drawing.Size(149, 22);
            this.mnuEditAddSec.Text = "Sections"; //@@@: this.mnuEditAddSec.Text = "Sections";
            // 
            // mnuEditAddHeader
            // 
            this.mnuEditAddHeader.Name = "mnuEditAddHeader"; //@@@: this.mnuEditAddHeader.Name = "mnuEditAddHeader";
            this.mnuEditAddHeader.Size = new System.Drawing.Size(137, 22); //@@@: this.mnuEditAddHeader.Size = new System.Drawing.Size(137, 22);
            this.mnuEditAddHeader.Text = "Add Header"; //@@@: this.mnuEditAddHeader.Text = "Add Header";
            // 
            // mnuEditAddGroup
            // 
            this.mnuEditAddGroup.Name = "mnuEditAddGroup"; //@@@: this.mnuEditAddGroup.Name = "mnuEditAddGroup";
            this.mnuEditAddGroup.Size = new System.Drawing.Size(137, 22); //@@@: this.mnuEditAddGroup.Size = new System.Drawing.Size(137, 22);
            this.mnuEditAddGroup.Text = "Add Group"; //@@@: this.mnuEditAddGroup.Text = "Add Group";
            // 
            // mnuEditAddFooter
            // 
            this.mnuEditAddFooter.Name = "mnuEditAddFooter"; //@@@: this.mnuEditAddFooter.Name = "mnuEditAddFooter";
            this.mnuEditAddFooter.Size = new System.Drawing.Size(137, 22); //@@@: this.mnuEditAddFooter.Size = new System.Drawing.Size(137, 22);
            this.mnuEditAddFooter.Text = "Add Footer"; //@@@: this.mnuEditAddFooter.Text = "Add Footer";
            // 
            // controlsToolStripMenuItem
            // 
            this.controlsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.controlsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuEditAddLabel, //@@@: this.mnuEditAddLabel,
            this.mnuEditAddLine, //@@@: this.mnuEditAddLine,
            this.mnuEditAddControl, //@@@: this.mnuEditAddControl,
            this.imageToolStripMenuItem, //@@@: this.imageToolStripMenuItem,
            this.chartToolStripMenuItem}); //@@@: this.chartToolStripMenuItem});
            this.controlsToolStripMenuItem.Name = "controlsToolStripMenuItem"; //@@@: this.controlsToolStripMenuItem.Name = "controlsToolStripMenuItem";
            this.controlsToolStripMenuItem.Size = new System.Drawing.Size(149, 22); //@@@: this.controlsToolStripMenuItem.Size = new System.Drawing.Size(149, 22);
            this.controlsToolStripMenuItem.Text = "Controls"; //@@@: this.controlsToolStripMenuItem.Text = "Controls";
            // 
            // mnuEditAddLabel
            // 
            this.mnuEditAddLabel.Name = "mnuEditAddLabel"; //@@@: this.mnuEditAddLabel.Name = "mnuEditAddLabel";
            this.mnuEditAddLabel.Size = new System.Drawing.Size(150, 22); //@@@: this.mnuEditAddLabel.Size = new System.Drawing.Size(150, 22);
            this.mnuEditAddLabel.Text = "Label"; //@@@: this.mnuEditAddLabel.Text = "Label";
            // 
            // mnuEditAddLine
            // 
            this.mnuEditAddLine.Name = "mnuEditAddLine"; //@@@: this.mnuEditAddLine.Name = "mnuEditAddLine";
            this.mnuEditAddLine.Size = new System.Drawing.Size(150, 22); //@@@: this.mnuEditAddLine.Size = new System.Drawing.Size(150, 22);
            this.mnuEditAddLine.Text = "Line"; //@@@: this.mnuEditAddLine.Text = "Line";
            // 
            // mnuEditAddControl
            // 
            this.mnuEditAddControl.Name = "mnuEditAddControl"; //@@@: this.mnuEditAddControl.Name = "mnuEditAddControl";
            this.mnuEditAddControl.Size = new System.Drawing.Size(150, 22); //@@@: this.mnuEditAddControl.Size = new System.Drawing.Size(150, 22);
            this.mnuEditAddControl.Text = "Database Field"; //@@@: this.mnuEditAddControl.Text = "Database Field";
            // 
            // imageToolStripMenuItem
            // 
            this.imageToolStripMenuItem.Name = "imageToolStripMenuItem"; //@@@: this.imageToolStripMenuItem.Name = "imageToolStripMenuItem";
            this.imageToolStripMenuItem.Size = new System.Drawing.Size(150, 22); //@@@: this.imageToolStripMenuItem.Size = new System.Drawing.Size(150, 22);
            this.imageToolStripMenuItem.Text = "Image"; //@@@: this.imageToolStripMenuItem.Text = "Image";
            // 
            // chartToolStripMenuItem
            // 
            this.chartToolStripMenuItem.Name = "chartToolStripMenuItem"; //@@@: this.chartToolStripMenuItem.Name = "chartToolStripMenuItem";
            this.chartToolStripMenuItem.Size = new System.Drawing.Size(150, 22); //@@@: this.chartToolStripMenuItem.Size = new System.Drawing.Size(150, 22);
            this.chartToolStripMenuItem.Text = "Chart"; //@@@: this.chartToolStripMenuItem.Text = "Chart";
            // 
            // toolStripSeparator12
            // 
            this.toolStripSeparator12.Name = "toolStripSeparator12"; //@@@: this.toolStripSeparator12.Name = "toolStripSeparator12";
            this.toolStripSeparator12.Size = new System.Drawing.Size(146, 6); //@@@: this.toolStripSeparator12.Size = new System.Drawing.Size(146, 6);
            // 
            // mnuEditMove
            // 
            this.mnuEditMove.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnuEditMove.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.horizontalToolStripMenuItem, //@@@: this.horizontalToolStripMenuItem,
            this.verticalToolStripMenuItem, //@@@: this.verticalToolStripMenuItem,
            this.lockToolStripMenuItem, //@@@: this.lockToolStripMenuItem,
            this.allDirectionsToolStripMenuItem, //@@@: this.allDirectionsToolStripMenuItem,
            this.toolStripSeparator13, //@@@: this.toolStripSeparator13,
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem}); //@@@: this.sizeOfMoveStepWithKeyboardToolStripMenuItem});
            this.mnuEditMove.Name = "mnuEditMove"; //@@@: this.mnuEditMove.Name = "mnuEditMove";
            this.mnuEditMove.Size = new System.Drawing.Size(149, 22); //@@@: this.mnuEditMove.Size = new System.Drawing.Size(149, 22);
            this.mnuEditMove.Text = "Move"; //@@@: this.mnuEditMove.Text = "Move";
            // 
            // horizontalToolStripMenuItem
            // 
            this.horizontalToolStripMenuItem.Name = "horizontalToolStripMenuItem"; //@@@: this.horizontalToolStripMenuItem.Name = "horizontalToolStripMenuItem";
            this.horizontalToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.horizontalToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.horizontalToolStripMenuItem.Text = "Horizontal"; //@@@: this.horizontalToolStripMenuItem.Text = "Horizontal";
            // 
            // verticalToolStripMenuItem
            // 
            this.verticalToolStripMenuItem.Name = "verticalToolStripMenuItem"; //@@@: this.verticalToolStripMenuItem.Name = "verticalToolStripMenuItem";
            this.verticalToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.verticalToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.verticalToolStripMenuItem.Text = "Vertical"; //@@@: this.verticalToolStripMenuItem.Text = "Vertical";
            // 
            // lockToolStripMenuItem
            // 
            this.lockToolStripMenuItem.Name = "lockToolStripMenuItem"; //@@@: this.lockToolStripMenuItem.Name = "lockToolStripMenuItem";
            this.lockToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.lockToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.lockToolStripMenuItem.Text = "Lock"; //@@@: this.lockToolStripMenuItem.Text = "Lock";
            // 
            // allDirectionsToolStripMenuItem
            // 
            this.allDirectionsToolStripMenuItem.Name = "allDirectionsToolStripMenuItem"; //@@@: this.allDirectionsToolStripMenuItem.Name = "allDirectionsToolStripMenuItem";
            this.allDirectionsToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.allDirectionsToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.allDirectionsToolStripMenuItem.Text = "All Directions"; //@@@: this.allDirectionsToolStripMenuItem.Text = "All Directions";
            // 
            // toolStripSeparator13
            // 
            this.toolStripSeparator13.Name = "toolStripSeparator13"; //@@@: this.toolStripSeparator13.Name = "toolStripSeparator13";
            this.toolStripSeparator13.Size = new System.Drawing.Size(243, 6); //@@@: this.toolStripSeparator13.Size = new System.Drawing.Size(243, 6);
            // 
            // sizeOfMoveStepWithKeyboardToolStripMenuItem
            // 
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Name = "sizeOfMoveStepWithKeyboardToolStripMenuItem"; //@@@: this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Name = "sizeOfMoveStepWithKeyboardToolStripMenuItem";
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Text = "Size of Move Step with Keyboard"; //@@@: this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Text = "Size of Move Step with Keyboard";
            // 
            // mnView
            // 
            this.mnView.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnView.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuViewToolbar, //@@@: this.mnuViewToolbar,
            this.mnuViewControls, //@@@: this.mnuViewControls,
            this.toolStripSeparator14, //@@@: this.toolStripSeparator14,
            this.mnuViewTreeViewCtrls, //@@@: this.mnuViewTreeViewCtrls,
            this.viewGridToolStripMenuItem}); //@@@: this.viewGridToolStripMenuItem});
            this.mnView.Name = "mnView"; //@@@: this.mnView.Name = "mnView";
            this.mnView.Size = new System.Drawing.Size(44, 20); //@@@: this.mnView.Size = new System.Drawing.Size(44, 20);
            this.mnView.Text = "View"; //@@@: this.mnView.Text = "View";
            // 
            // mnuViewToolbar
            // 
            this.mnuViewToolbar.Name = "mnuViewToolbar"; //@@@: this.mnuViewToolbar.Name = "mnuViewToolbar";
            this.mnuViewToolbar.Size = new System.Drawing.Size(140, 22); //@@@: this.mnuViewToolbar.Size = new System.Drawing.Size(140, 22);
            this.mnuViewToolbar.Text = "Toolbox"; //@@@: this.mnuViewToolbar.Text = "Toolbox";
            // 
            // mnuViewControls
            // 
            this.mnuViewControls.Name = "mnuViewControls"; //@@@: this.mnuViewControls.Name = "mnuViewControls";
            this.mnuViewControls.Size = new System.Drawing.Size(140, 22); //@@@: this.mnuViewControls.Size = new System.Drawing.Size(140, 22);
            this.mnuViewControls.Text = "Control Grid"; //@@@: this.mnuViewControls.Text = "Control Grid";
            // 
            // toolStripSeparator14
            // 
            this.toolStripSeparator14.Name = "toolStripSeparator14"; //@@@: this.toolStripSeparator14.Name = "toolStripSeparator14";
            this.toolStripSeparator14.Size = new System.Drawing.Size(137, 6); //@@@: this.toolStripSeparator14.Size = new System.Drawing.Size(137, 6);
            // 
            // mnuViewTreeViewCtrls
            // 
            this.mnuViewTreeViewCtrls.Name = "mnuViewTreeViewCtrls"; //@@@: this.mnuViewTreeViewCtrls.Name = "mnuViewTreeViewCtrls";
            this.mnuViewTreeViewCtrls.Size = new System.Drawing.Size(140, 22); //@@@: this.mnuViewTreeViewCtrls.Size = new System.Drawing.Size(140, 22);
            this.mnuViewTreeViewCtrls.Text = "Control Tree"; //@@@: this.mnuViewTreeViewCtrls.Text = "Control Tree";
            // 
            // viewGridToolStripMenuItem
            // 
            this.viewGridToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.viewGridToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.pointsToolStripMenuItem, //@@@: this.pointsToolStripMenuItem,
            this.linesToolStripMenuItem, //@@@: this.linesToolStripMenuItem,
            this.mnuViewGridMain}); //@@@: this.mnuViewGridMain});
            this.viewGridToolStripMenuItem.Name = "viewGridToolStripMenuItem"; //@@@: this.viewGridToolStripMenuItem.Name = "viewGridToolStripMenuItem";
            this.viewGridToolStripMenuItem.Size = new System.Drawing.Size(140, 22); //@@@: this.viewGridToolStripMenuItem.Size = new System.Drawing.Size(140, 22);
            this.viewGridToolStripMenuItem.Text = "View Grid"; //@@@: this.viewGridToolStripMenuItem.Text = "View Grid";
            // 
            // pointsToolStripMenuItem
            // 
            this.pointsToolStripMenuItem.Name = "pointsToolStripMenuItem"; //@@@: this.pointsToolStripMenuItem.Name = "pointsToolStripMenuItem";
            this.pointsToolStripMenuItem.Size = new System.Drawing.Size(124, 22); //@@@: this.pointsToolStripMenuItem.Size = new System.Drawing.Size(124, 22);
            this.pointsToolStripMenuItem.Text = "Points"; //@@@: this.pointsToolStripMenuItem.Text = "Points";
            // 
            // linesToolStripMenuItem
            // 
            this.linesToolStripMenuItem.Name = "linesToolStripMenuItem"; //@@@: this.linesToolStripMenuItem.Name = "linesToolStripMenuItem";
            this.linesToolStripMenuItem.Size = new System.Drawing.Size(124, 22); //@@@: this.linesToolStripMenuItem.Size = new System.Drawing.Size(124, 22);
            this.linesToolStripMenuItem.Text = "Lines"; //@@@: this.linesToolStripMenuItem.Text = "Lines";
            // 
            // mnuViewGridMain
            // 
            this.mnuViewGridMain.Name = "mnuViewGridMain"; //@@@: this.mnuViewGridMain.Name = "mnuViewGridMain";
            this.mnuViewGridMain.Size = new System.Drawing.Size(124, 22); //@@@: this.mnuViewGridMain.Size = new System.Drawing.Size(124, 22);
            this.mnuViewGridMain.Text = "Hide Grid"; //@@@: this.mnuViewGridMain.Text = "Hide Grid";
            // 
            // mnDatabase
            // 
            this.mnDatabase.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnDatabase.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.connectionSettingsToolStripMenuItem, //@@@: this.connectionSettingsToolStripMenuItem,
            this.viewParametersToolStripMenuItem, //@@@: this.viewParametersToolStripMenuItem,
            this.toolStripSeparator15, //@@@: this.toolStripSeparator15,
            this.mnuDataBaseConnectsAuxCfg, //@@@: this.mnuDataBaseConnectsAuxCfg,
            this.toolStripSeparator16, //@@@: this.toolStripSeparator16,
            this.mnuDataBaseSetDisconnected, //@@@: this.mnuDataBaseSetDisconnected,
            this.manualSettingsToolStripMenuItem, //@@@: this.manualSettingsToolStripMenuItem,
            this.mnuDataBaseSetToMainConnect}); //@@@: this.mnuDataBaseSetToMainConnect});
            this.mnDatabase.Name = "mnDatabase"; //@@@: this.mnDatabase.Name = "mnDatabase";
            this.mnDatabase.Size = new System.Drawing.Size(67, 20); //@@@: this.mnDatabase.Size = new System.Drawing.Size(67, 20);
            this.mnDatabase.Text = "Database"; //@@@: this.mnDatabase.Text = "Database";
            // 
            // connectionSettingsToolStripMenuItem
            // 
            this.connectionSettingsToolStripMenuItem.Name = "connectionSettingsToolStripMenuItem"; //@@@: this.connectionSettingsToolStripMenuItem.Name = "connectionSettingsToolStripMenuItem";
            this.connectionSettingsToolStripMenuItem.Size = new System.Drawing.Size(328, 22); //@@@: this.connectionSettingsToolStripMenuItem.Size = new System.Drawing.Size(328, 22);
            this.connectionSettingsToolStripMenuItem.Text = "Connection Settings"; //@@@: this.connectionSettingsToolStripMenuItem.Text = "Connection Settings";
            // 
            // viewParametersToolStripMenuItem
            // 
            this.viewParametersToolStripMenuItem.Name = "viewParametersToolStripMenuItem"; //@@@: this.viewParametersToolStripMenuItem.Name = "viewParametersToolStripMenuItem";
            this.viewParametersToolStripMenuItem.Size = new System.Drawing.Size(328, 22); //@@@: this.viewParametersToolStripMenuItem.Size = new System.Drawing.Size(328, 22);
            this.viewParametersToolStripMenuItem.Text = "View Parameters"; //@@@: this.viewParametersToolStripMenuItem.Text = "View Parameters";
            // 
            // toolStripSeparator15
            // 
            this.toolStripSeparator15.Name = "toolStripSeparator15"; //@@@: this.toolStripSeparator15.Name = "toolStripSeparator15";
            this.toolStripSeparator15.Size = new System.Drawing.Size(325, 6); //@@@: this.toolStripSeparator15.Size = new System.Drawing.Size(325, 6);
            // 
            // mnuDataBaseConnectsAuxCfg
            // 
            this.mnuDataBaseConnectsAuxCfg.Name = "mnuDataBaseConnectsAuxCfg"; //@@@: this.mnuDataBaseConnectsAuxCfg.Name = "mnuDataBaseConnectsAuxCfg";
            this.mnuDataBaseConnectsAuxCfg.Size = new System.Drawing.Size(328, 22); //@@@: this.mnuDataBaseConnectsAuxCfg.Size = new System.Drawing.Size(328, 22);
            this.mnuDataBaseConnectsAuxCfg.Text = "Additional Connections"; //@@@: this.mnuDataBaseConnectsAuxCfg.Text = "Additional Connections";
            // 
            // toolStripSeparator16
            // 
            this.toolStripSeparator16.Name = "toolStripSeparator16"; //@@@: this.toolStripSeparator16.Name = "toolStripSeparator16";
            this.toolStripSeparator16.Size = new System.Drawing.Size(325, 6); //@@@: this.toolStripSeparator16.Size = new System.Drawing.Size(325, 6);
            // 
            // mnuDataBaseSetDisconnected
            // 
            this.mnuDataBaseSetDisconnected.Name = "mnuDataBaseSetDisconnected"; //@@@: this.mnuDataBaseSetDisconnected.Name = "mnuDataBaseSetDisconnected";
            this.mnuDataBaseSetDisconnected.Size = new System.Drawing.Size(328, 22); //@@@: this.mnuDataBaseSetDisconnected.Size = new System.Drawing.Size(328, 22);
            this.mnuDataBaseSetDisconnected.Text = "Not a Database Report"; //@@@: this.mnuDataBaseSetDisconnected.Text = "Not a Database Report";
            // 
            // manualSettingsToolStripMenuItem
            // 
            this.manualSettingsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.manualSettingsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuDataBaseEditStrConnect, //@@@: this.mnuDataBaseEditStrConnect,
            this.mnuDataBaseConnectConfig, //@@@: this.mnuDataBaseConnectConfig,
            this.mnuDataBaseEditEx}); //@@@: this.mnuDataBaseEditEx});
            this.manualSettingsToolStripMenuItem.Name = "manualSettingsToolStripMenuItem"; //@@@: this.manualSettingsToolStripMenuItem.Name = "manualSettingsToolStripMenuItem";
            this.manualSettingsToolStripMenuItem.Size = new System.Drawing.Size(328, 22); //@@@: this.manualSettingsToolStripMenuItem.Size = new System.Drawing.Size(328, 22);
            this.manualSettingsToolStripMenuItem.Text = "Manual Settings"; //@@@: this.manualSettingsToolStripMenuItem.Text = "Manual Settings";
            // 
            // mnuDataBaseEditStrConnect
            // 
            this.mnuDataBaseEditStrConnect.Name = "mnuDataBaseEditStrConnect"; //@@@: this.mnuDataBaseEditStrConnect.Name = "mnuDataBaseEditStrConnect";
            this.mnuDataBaseEditStrConnect.Size = new System.Drawing.Size(195, 22); //@@@: this.mnuDataBaseEditStrConnect.Size = new System.Drawing.Size(195, 22);
            this.mnuDataBaseEditStrConnect.Text = "SQL Server Connection"; //@@@: this.mnuDataBaseEditStrConnect.Text = "SQL Server Connection";
            // 
            // mnuDataBaseConnectConfig
            // 
            this.mnuDataBaseConnectConfig.Name = "mnuDataBaseConnectConfig"; //@@@: this.mnuDataBaseConnectConfig.Name = "mnuDataBaseConnectConfig";
            this.mnuDataBaseConnectConfig.Size = new System.Drawing.Size(195, 22); //@@@: this.mnuDataBaseConnectConfig.Size = new System.Drawing.Size(195, 22);
            this.mnuDataBaseConnectConfig.Text = "Connection String"; //@@@: this.mnuDataBaseConnectConfig.Text = "Connection String";
            // 
            // mnuDataBaseEditEx
            // 
            this.mnuDataBaseEditEx.Name = "mnuDataBaseEditEx"; //@@@: this.mnuDataBaseEditEx.Name = "mnuDataBaseEditEx";
            this.mnuDataBaseEditEx.Size = new System.Drawing.Size(195, 22); //@@@: this.mnuDataBaseEditEx.Size = new System.Drawing.Size(195, 22);
            this.mnuDataBaseEditEx.Text = "Data Source"; //@@@: this.mnuDataBaseEditEx.Text = "Data Source";
            // 
            // mnuDataBaseSetToMainConnect
            // 
            this.mnuDataBaseSetToMainConnect.Name = "mnuDataBaseSetToMainConnect"; //@@@: this.mnuDataBaseSetToMainConnect.Name = "mnuDataBaseSetToMainConnect";
            this.mnuDataBaseSetToMainConnect.Size = new System.Drawing.Size(328, 22); //@@@: this.mnuDataBaseSetToMainConnect.Size = new System.Drawing.Size(328, 22);
            this.mnuDataBaseSetToMainConnect.Text = "Apply Main Connection to Addional Conections"; //@@@: this.mnuDataBaseSetToMainConnect.Text = "Apply Main Connection to Addional Conections";
            // 
            // mnTool
            // 
            this.mnTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.optionsToolStripMenuItem}); //@@@: this.optionsToolStripMenuItem});
            this.mnTool.Name = "mnTool"; //@@@: this.mnTool.Name = "mnTool";
            this.mnTool.Size = new System.Drawing.Size(48, 20); //@@@: this.mnTool.Size = new System.Drawing.Size(48, 20);
            this.mnTool.Text = "Tools"; //@@@: this.mnTool.Text = "Tools";
            // 
            // optionsToolStripMenuItem
            // 
            this.optionsToolStripMenuItem.Name = "optionsToolStripMenuItem"; //@@@: this.optionsToolStripMenuItem.Name = "optionsToolStripMenuItem";
            this.optionsToolStripMenuItem.Size = new System.Drawing.Size(116, 22); //@@@: this.optionsToolStripMenuItem.Size = new System.Drawing.Size(116, 22);
            this.optionsToolStripMenuItem.Text = "Options"; //@@@: this.optionsToolStripMenuItem.Text = "Options";
            // 
            // mnHelp
            // 
            this.mnHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.aboutToolStripMenuItem}); //@@@: this.aboutToolStripMenuItem});
            this.mnHelp.Name = "mnHelp"; //@@@: this.mnHelp.Name = "mnHelp";
            this.mnHelp.Size = new System.Drawing.Size(44, 20); //@@@: this.mnHelp.Size = new System.Drawing.Size(44, 20);
            this.mnHelp.Text = "Help"; //@@@: this.mnHelp.Text = "Help";
            // 
            // aboutToolStripMenuItem
            // 
            this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem"; //@@@: this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem";
            this.aboutToolStripMenuItem.Size = new System.Drawing.Size(107, 22); //@@@: this.aboutToolStripMenuItem.Size = new System.Drawing.Size(107, 22);
            this.aboutToolStripMenuItem.Text = "About"; //@@@: this.aboutToolStripMenuItem.Text = "About";
            // 
            // tbMain
            // 
            this.tbMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.tbMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbNew, //@@@: this.tsbNew,
            this.toolStripButton2, //@@@: this.toolStripButton2,
            this.toolStripButton3, //@@@: this.toolStripButton3,
            this.toolStripButton14, //@@@: this.toolStripButton14,
            this.toolStripSeparator1, //@@@: this.toolStripSeparator1,
            this.toolStripButton4, //@@@: this.toolStripButton4,
            this.toolStripSeparator2, //@@@: this.toolStripSeparator2,
            this.toolStripButton5, //@@@: this.toolStripButton5,
            this.toolStripButton6, //@@@: this.toolStripButton6,
            this.toolStripSeparator3, //@@@: this.toolStripSeparator3,
            this.toolStripButton7, //@@@: this.toolStripButton7,
            this.toolStripButton8, //@@@: this.toolStripButton8,
            this.toolStripSeparator4, //@@@: this.toolStripSeparator4,
            this.btnAlignLeft, //@@@: this.btnAlignLeft,
            this.btnAligntCenter, //@@@: this.btnAligntCenter,
            this.btnAlignRight, //@@@: this.btnAlignRight,
            this.toolStripSeparator5, //@@@: this.toolStripSeparator5,
            this.toolStripButton12, //@@@: this.toolStripButton12,
            this.toolStripSeparator6, //@@@: this.toolStripSeparator6,
            this.toolStripButton13}); //@@@: this.toolStripButton13});
            this.tbMain.Location = new System.Drawing.Point(0, 24); //@@@: this.tbMain.Location = new System.Drawing.Point(0, 24);
            this.tbMain.Name = "tbMain"; //@@@: this.tbMain.Name = "tbMain";
            this.tbMain.Size = new System.Drawing.Size(682, 25); //@@@: this.tbMain.Size = new System.Drawing.Size(682, 25);
            this.tbMain.TabIndex = 1; //@@@: this.tbMain.TabIndex = 1;
            this.tbMain.Text = "toolStrip1"; //@@@: this.tbMain.Text = "toolStrip1";
            // 
            // tsbNew
            // 
            this.tsbNew.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbNew.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbNew.Image = global::CSReportEditor.Properties.Resources.page; //@@@: this.tsbNew.Image = global::CSReportEditor.Properties.Resources.page;
            this.tsbNew.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbNew.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbNew.Name = "tsbNew"; //@@@: this.tsbNew.Name = "tsbNew";
            this.tsbNew.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbNew.Size = new System.Drawing.Size(23, 22);
            this.tsbNew.Text = "toolStripButton1"; //@@@: this.tsbNew.Text = "toolStripButton1";
            this.tsbNew.Click += new System.EventHandler(this.tsbNew_Click); //@@@: this.tsbNew.Click += new System.EventHandler(this.tsbNew_Click);
            // 
            // toolStripButton2
            // 
            this.toolStripButton2.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton2.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton2.Image = global::CSReportEditor.Properties.Resources.folder_page; //@@@: this.toolStripButton2.Image = global::CSReportEditor.Properties.Resources.folder_page;
            this.toolStripButton2.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton2.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton2.Name = "toolStripButton2"; //@@@: this.toolStripButton2.Name = "toolStripButton2";
            this.toolStripButton2.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton2.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton2.Text = "toolStripButton2"; //@@@: this.toolStripButton2.Text = "toolStripButton2";
            // 
            // toolStripButton3
            // 
            this.toolStripButton3.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton3.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton3.Image = global::CSReportEditor.Properties.Resources.disk; //@@@: this.toolStripButton3.Image = global::CSReportEditor.Properties.Resources.disk;
            this.toolStripButton3.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton3.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton3.Name = "toolStripButton3"; //@@@: this.toolStripButton3.Name = "toolStripButton3";
            this.toolStripButton3.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton3.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton3.Text = "toolStripButton3"; //@@@: this.toolStripButton3.Text = "toolStripButton3";
            // 
            // toolStripButton14
            // 
            this.toolStripButton14.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton14.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton14.Image = global::CSReportEditor.Properties.Resources.disk_multiple; //@@@: this.toolStripButton14.Image = global::CSReportEditor.Properties.Resources.disk_multiple;
            this.toolStripButton14.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton14.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton14.Name = "toolStripButton14"; //@@@: this.toolStripButton14.Name = "toolStripButton14";
            this.toolStripButton14.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton14.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton14.Text = "toolStripButton14"; //@@@: this.toolStripButton14.Text = "toolStripButton14";
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1"; //@@@: this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator1.Size = new System.Drawing.Size(6, 25);
            // 
            // toolStripButton4
            // 
            this.toolStripButton4.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton4.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton4.Image = global::CSReportEditor.Properties.Resources.database_gear; //@@@: this.toolStripButton4.Image = global::CSReportEditor.Properties.Resources.database_gear;
            this.toolStripButton4.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton4.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton4.Name = "toolStripButton4"; //@@@: this.toolStripButton4.Name = "toolStripButton4";
            this.toolStripButton4.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton4.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton4.Text = "toolStripButton4"; //@@@: this.toolStripButton4.Text = "toolStripButton4";
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2"; //@@@: this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator2.Size = new System.Drawing.Size(6, 25);
            // 
            // toolStripButton5
            // 
            this.toolStripButton5.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton5.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton5.Image = global::CSReportEditor.Properties.Resources.lightning; //@@@: this.toolStripButton5.Image = global::CSReportEditor.Properties.Resources.lightning;
            this.toolStripButton5.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton5.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton5.Name = "toolStripButton5"; //@@@: this.toolStripButton5.Name = "toolStripButton5";
            this.toolStripButton5.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton5.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton5.Text = "toolStripButton5"; //@@@: this.toolStripButton5.Text = "toolStripButton5";
            // 
            // toolStripButton6
            // 
            this.toolStripButton6.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton6.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton6.Image = global::CSReportEditor.Properties.Resources.printer; //@@@: this.toolStripButton6.Image = global::CSReportEditor.Properties.Resources.printer;
            this.toolStripButton6.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton6.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton6.Name = "toolStripButton6"; //@@@: this.toolStripButton6.Name = "toolStripButton6";
            this.toolStripButton6.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton6.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton6.Text = "toolStripButton6"; //@@@: this.toolStripButton6.Text = "toolStripButton6";
            // 
            // toolStripSeparator3
            // 
            this.toolStripSeparator3.Name = "toolStripSeparator3"; //@@@: this.toolStripSeparator3.Name = "toolStripSeparator3";
            this.toolStripSeparator3.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator3.Size = new System.Drawing.Size(6, 25);
            // 
            // toolStripButton7
            // 
            this.toolStripButton7.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton7.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton7.Image = global::CSReportEditor.Properties.Resources.application_side_boxes; //@@@: this.toolStripButton7.Image = global::CSReportEditor.Properties.Resources.application_side_boxes;
            this.toolStripButton7.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton7.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton7.Name = "toolStripButton7"; //@@@: this.toolStripButton7.Name = "toolStripButton7";
            this.toolStripButton7.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton7.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton7.Text = "toolStripButton7"; //@@@: this.toolStripButton7.Text = "toolStripButton7";
            // 
            // toolStripButton8
            // 
            this.toolStripButton8.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton8.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton8.Image = global::CSReportEditor.Properties.Resources.wrench; //@@@: this.toolStripButton8.Image = global::CSReportEditor.Properties.Resources.wrench;
            this.toolStripButton8.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton8.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton8.Name = "toolStripButton8"; //@@@: this.toolStripButton8.Name = "toolStripButton8";
            this.toolStripButton8.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton8.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton8.Text = "toolStripButton8"; //@@@: this.toolStripButton8.Text = "toolStripButton8";
            // 
            // toolStripSeparator4
            // 
            this.toolStripSeparator4.Name = "toolStripSeparator4"; //@@@: this.toolStripSeparator4.Name = "toolStripSeparator4";
            this.toolStripSeparator4.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator4.Size = new System.Drawing.Size(6, 25);
            // 
            // btnAlignLeft
            // 
            this.btnAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.btnAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.btnAlignLeft.Image = global::CSReportEditor.Properties.Resources.text_align_left; //@@@: this.btnAlignLeft.Image = global::CSReportEditor.Properties.Resources.text_align_left;
            this.btnAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.btnAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnAlignLeft.Name = "btnAlignLeft"; //@@@: this.btnAlignLeft.Name = "btnAlignLeft";
            this.btnAlignLeft.Size = new System.Drawing.Size(23, 22); //@@@: this.btnAlignLeft.Size = new System.Drawing.Size(23, 22);
            this.btnAlignLeft.Text = "toolStripButton9"; //@@@: this.btnAlignLeft.Text = "toolStripButton9";
            // 
            // btnAligntCenter
            // 
            this.btnAligntCenter.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.btnAligntCenter.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.btnAligntCenter.Image = global::CSReportEditor.Properties.Resources.text_align_center; //@@@: this.btnAligntCenter.Image = global::CSReportEditor.Properties.Resources.text_align_center;
            this.btnAligntCenter.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.btnAligntCenter.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnAligntCenter.Name = "btnAligntCenter"; //@@@: this.btnAligntCenter.Name = "btnAligntCenter";
            this.btnAligntCenter.Size = new System.Drawing.Size(23, 22); //@@@: this.btnAligntCenter.Size = new System.Drawing.Size(23, 22);
            this.btnAligntCenter.Text = "toolStripButton10"; //@@@: this.btnAligntCenter.Text = "toolStripButton10";
            // 
            // btnAlignRight
            // 
            this.btnAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.btnAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.btnAlignRight.Image = global::CSReportEditor.Properties.Resources.text_align_right; //@@@: this.btnAlignRight.Image = global::CSReportEditor.Properties.Resources.text_align_right;
            this.btnAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.btnAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnAlignRight.Name = "btnAlignRight"; //@@@: this.btnAlignRight.Name = "btnAlignRight";
            this.btnAlignRight.Size = new System.Drawing.Size(23, 22); //@@@: this.btnAlignRight.Size = new System.Drawing.Size(23, 22);
            this.btnAlignRight.Text = "toolStripButton11"; //@@@: this.btnAlignRight.Text = "toolStripButton11";
            // 
            // toolStripSeparator5
            // 
            this.toolStripSeparator5.Name = "toolStripSeparator5"; //@@@: this.toolStripSeparator5.Name = "toolStripSeparator5";
            this.toolStripSeparator5.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator5.Size = new System.Drawing.Size(6, 25);
            // 
            // toolStripButton12
            // 
            this.toolStripButton12.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton12.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton12.Image = global::CSReportEditor.Properties.Resources.text_bold; //@@@: this.toolStripButton12.Image = global::CSReportEditor.Properties.Resources.text_bold;
            this.toolStripButton12.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton12.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton12.Name = "toolStripButton12"; //@@@: this.toolStripButton12.Name = "toolStripButton12";
            this.toolStripButton12.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton12.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton12.Text = "toolStripButton12"; //@@@: this.toolStripButton12.Text = "toolStripButton12";
            // 
            // toolStripSeparator6
            // 
            this.toolStripSeparator6.Name = "toolStripSeparator6"; //@@@: this.toolStripSeparator6.Name = "toolStripSeparator6";
            this.toolStripSeparator6.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator6.Size = new System.Drawing.Size(6, 25);
            // 
            // toolStripButton13
            // 
            this.toolStripButton13.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.toolStripButton13.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton13.Image = global::CSReportEditor.Properties.Resources.find; //@@@: this.toolStripButton13.Image = global::CSReportEditor.Properties.Resources.find;
            this.toolStripButton13.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.toolStripButton13.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton13.Name = "toolStripButton13"; //@@@: this.toolStripButton13.Name = "toolStripButton13";
            this.toolStripButton13.Size = new System.Drawing.Size(23, 22); //@@@: this.toolStripButton13.Size = new System.Drawing.Size(23, 22);
            this.toolStripButton13.Text = "toolStripButton13"; //@@@: this.toolStripButton13.Text = "toolStripButton13";
            // 
            // sbMain
            // 
            this.sbMain.Location = new System.Drawing.Point(0, 310); //@@@: this.sbMain.Location = new System.Drawing.Point(0, 310);
            this.sbMain.Name = "sbMain"; //@@@: this.sbMain.Name = "sbMain";
            this.sbMain.Size = new System.Drawing.Size(682, 22); //@@@: this.sbMain.Size = new System.Drawing.Size(682, 22);
            this.sbMain.TabIndex = 3; //@@@: this.sbMain.TabIndex = 3;
            this.sbMain.Text = "statusStrip1"; //@@@: this.sbMain.Text = "statusStrip1";
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = new System.Drawing.Point(0, 49); //@@@: this.splitContainer1.Location = new System.Drawing.Point(0, 49);
            this.splitContainer1.Name = "splitContainer1"; //@@@: this.splitContainer1.Name = "splitContainer1";
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.panel1); //@@@: this.splitContainer1.Panel1.Controls.Add(this.panel1);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.tabReports); //@@@: this.splitContainer1.Panel2.Controls.Add(this.tabReports);
            this.splitContainer1.Size = new System.Drawing.Size(682, 261); //@@@: this.splitContainer1.Size = new System.Drawing.Size(682, 261);
            this.splitContainer1.SplitterDistance = 226; //@@@: this.splitContainer1.SplitterDistance = 226;
            this.splitContainer1.TabIndex = 4; //@@@: this.splitContainer1.TabIndex = 4;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.tabControl2); //@@@: this.panel1.Controls.Add(this.tabControl2);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 0); //@@@: this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1"; //@@@: this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(226, 261); //@@@: this.panel1.Size = new System.Drawing.Size(226, 261);
            this.panel1.TabIndex = 0; //@@@: this.panel1.TabIndex = 0;
            // 
            // tabControl2
            // 
            this.tabControl2.Controls.Add(this.tabPage3); //@@@: this.tabControl2.Controls.Add(this.tabPage3);
            this.tabControl2.Controls.Add(this.tabPage4); //@@@: this.tabControl2.Controls.Add(this.tabPage4);
            this.tabControl2.Controls.Add(this.tabPage5); //@@@: this.tabControl2.Controls.Add(this.tabPage5);
            this.tabControl2.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.tabControl2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl2.Location = new System.Drawing.Point(0, 0); //@@@: this.tabControl2.Location = new System.Drawing.Point(0, 0);
            this.tabControl2.Name = "tabControl2"; //@@@: this.tabControl2.Name = "tabControl2";
            this.tabControl2.SelectedIndex = 0; //@@@: this.tabControl2.SelectedIndex = 0;
            this.tabControl2.Size = new System.Drawing.Size(226, 261); //@@@: this.tabControl2.Size = new System.Drawing.Size(226, 261);
            this.tabControl2.TabIndex = 0; //@@@: this.tabControl2.TabIndex = 0;
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.listView2); //@@@: this.tabPage3.Controls.Add(this.listView2);
            this.tabPage3.Location = new System.Drawing.Point(4, 22); //@@@: this.tabPage3.Location = new System.Drawing.Point(4, 22);
            this.tabPage3.Name = "tabPage3"; //@@@: this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = new System.Windows.Forms.Padding(3); //@@@: this.tabPage3.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage3.Size = new System.Drawing.Size(218, 235); //@@@: this.tabPage3.Size = new System.Drawing.Size(218, 235);
            this.tabPage3.TabIndex = 0; //@@@: this.tabPage3.TabIndex = 0;
            this.tabPage3.Text = "Controls"; //@@@: this.tabPage3.Text = "Controls";
            this.tabPage3.UseVisualStyleBackColor = true; //@@@: this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // listView2
            // 
            this.listView2.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.listView2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listView2.Location = new System.Drawing.Point(3, 3); //@@@: this.listView2.Location = new System.Drawing.Point(3, 3);
            this.listView2.Name = "listView2"; //@@@: this.listView2.Name = "listView2";
            this.listView2.Size = new System.Drawing.Size(212, 229); //@@@: this.listView2.Size = new System.Drawing.Size(212, 229);
            this.listView2.TabIndex = 0; //@@@: this.listView2.TabIndex = 0;
            this.listView2.UseCompatibleStateImageBehavior = false; //@@@: this.listView2.UseCompatibleStateImageBehavior = false;
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.listView1); //@@@: this.tabPage4.Controls.Add(this.listView1);
            this.tabPage4.Location = new System.Drawing.Point(4, 22); //@@@: this.tabPage4.Location = new System.Drawing.Point(4, 22);
            this.tabPage4.Name = "tabPage4"; //@@@: this.tabPage4.Name = "tabPage4";
            this.tabPage4.Padding = new System.Windows.Forms.Padding(3); //@@@: this.tabPage4.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage4.Size = new System.Drawing.Size(218, 235); //@@@: this.tabPage4.Size = new System.Drawing.Size(218, 235);
            this.tabPage4.TabIndex = 1; //@@@: this.tabPage4.TabIndex = 1;
            this.tabPage4.Text = "Database"; //@@@: this.tabPage4.Text = "Database";
            this.tabPage4.UseVisualStyleBackColor = true; //@@@: this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // listView1
            // 
            this.listView1.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.listView1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listView1.Location = new System.Drawing.Point(3, 3); //@@@: this.listView1.Location = new System.Drawing.Point(3, 3);
            this.listView1.Name = "listView1"; //@@@: this.listView1.Name = "listView1";
            this.listView1.Size = new System.Drawing.Size(212, 229); //@@@: this.listView1.Size = new System.Drawing.Size(212, 229);
            this.listView1.TabIndex = 0; //@@@: this.listView1.TabIndex = 0;
            this.listView1.UseCompatibleStateImageBehavior = false; //@@@: this.listView1.UseCompatibleStateImageBehavior = false;
            // 
            // tabPage5
            // 
            this.tabPage5.Controls.Add(this.treeView1); //@@@: this.tabPage5.Controls.Add(this.treeView1);
            this.tabPage5.Location = new System.Drawing.Point(4, 22); //@@@: this.tabPage5.Location = new System.Drawing.Point(4, 22);
            this.tabPage5.Name = "tabPage5"; //@@@: this.tabPage5.Name = "tabPage5";
            this.tabPage5.Size = new System.Drawing.Size(218, 235); //@@@: this.tabPage5.Size = new System.Drawing.Size(218, 235);
            this.tabPage5.TabIndex = 2; //@@@: this.tabPage5.TabIndex = 2;
            this.tabPage5.Text = "Report"; //@@@: this.tabPage5.Text = "Report";
            this.tabPage5.UseVisualStyleBackColor = true; //@@@: this.tabPage5.UseVisualStyleBackColor = true;
            // 
            // treeView1
            // 
            this.treeView1.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.treeView1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.treeView1.Location = new System.Drawing.Point(0, 0); //@@@: this.treeView1.Location = new System.Drawing.Point(0, 0);
            this.treeView1.Name = "treeView1"; //@@@: this.treeView1.Name = "treeView1";
            this.treeView1.Size = new System.Drawing.Size(218, 235); //@@@: this.treeView1.Size = new System.Drawing.Size(218, 235);
            this.treeView1.TabIndex = 0; //@@@: this.treeView1.TabIndex = 0;
            // 
            // tabReports
            // 
            this.tabReports.Controls.Add(this.tbpEditor); //@@@: this.tabReports.Controls.Add(this.tbpEditor);
            this.tabReports.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.tabReports.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabReports.Location = new System.Drawing.Point(0, 0); //@@@: this.tabReports.Location = new System.Drawing.Point(0, 0);
            this.tabReports.Name = "tabReports"; //@@@: this.tabReports.Name = "tabReports";
            this.tabReports.SelectedIndex = 0; //@@@: this.tabReports.SelectedIndex = 0;
            this.tabReports.Size = new System.Drawing.Size(452, 261); //@@@: this.tabReports.Size = new System.Drawing.Size(452, 261);
            this.tabReports.TabIndex = 0; //@@@: this.tabReports.TabIndex = 0;
            // 
            // tbpEditor
            // 
            this.tbpEditor.Controls.Add(this.pnEditor); //@@@: this.tbpEditor.Controls.Add(this.pnEditor);
            this.tbpEditor.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpEditor.Location = new System.Drawing.Point(4, 22);
            this.tbpEditor.Name = "tbpEditor"; //@@@: this.tbpEditor.Name = "tbpEditor";
            this.tbpEditor.Size = new System.Drawing.Size(444, 235); //@@@: this.tbpEditor.Size = new System.Drawing.Size(444, 235);
            this.tbpEditor.TabIndex = 0; //@@@: this.tbpEditor.TabIndex = 0;
            this.tbpEditor.Text = "New Report"; //@@@: this.tbpEditor.Text = "New Report";
            this.tbpEditor.UseVisualStyleBackColor = true; //@@@: this.tbpEditor.UseVisualStyleBackColor = true;
            // 
            // pnEditor
            // 
            this.pnEditor.AutoScroll = true; //@@@: this.pnEditor.AutoScroll = true;
            this.pnEditor.Controls.Add(this.pnRule); //@@@: this.pnEditor.Controls.Add(this.pnRule);
            this.pnEditor.Controls.Add(this.pnReport); //@@@: this.pnEditor.Controls.Add(this.pnReport);
            this.pnEditor.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.pnEditor.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnEditor.Location = new System.Drawing.Point(0, 0); //@@@: this.pnEditor.Location = new System.Drawing.Point(0, 0);
            this.pnEditor.Margin = new System.Windows.Forms.Padding(0); //@@@: this.pnEditor.Margin = new System.Windows.Forms.Padding(0);
            this.pnEditor.Name = "pnEditor"; //@@@: this.pnEditor.Name = "pnEditor";
            this.pnEditor.Size = new System.Drawing.Size(444, 235); //@@@: this.pnEditor.Size = new System.Drawing.Size(444, 235);
            this.pnEditor.TabIndex = 1; //@@@: this.pnEditor.TabIndex = 1;
            // 
            // pnRule
            // 
            this.pnRule.BackColor = System.Drawing.Color.PeachPuff; //@@@: this.pnRule.BackColor = System.Drawing.Color.PeachPuff;
            this.pnRule.Location = new System.Drawing.Point(3, 3); //@@@: this.pnRule.Location = new System.Drawing.Point(3, 3);
            this.pnRule.Name = "pnRule"; //@@@: this.pnRule.Name = "pnRule";
            this.pnRule.Size = new System.Drawing.Size(100, 50); //@@@: this.pnRule.Size = new System.Drawing.Size(100, 50);
            this.pnRule.TabIndex = 1; //@@@: this.pnRule.TabIndex = 1;
            this.pnRule.TabStop = false; //@@@: this.pnRule.TabStop = false;
            // 
            // pnReport
            // 
            this.pnReport.BackColor = System.Drawing.Color.Beige; //@@@: this.pnReport.BackColor = System.Drawing.Color.Beige;
            this.pnReport.Location = new System.Drawing.Point(135, 3); //@@@: this.pnReport.Location = new System.Drawing.Point(135, 3);
            this.pnReport.Name = "pnReport"; //@@@: this.pnReport.Name = "pnReport";
            this.pnReport.Size = new System.Drawing.Size(100, 50); //@@@: this.pnReport.Size = new System.Drawing.Size(100, 50);
            this.pnReport.TabIndex = 0; //@@@: this.pnReport.TabIndex = 0;
            this.pnReport.TabStop = false; //@@@: this.pnReport.TabStop = false;
            // 
            // fMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F); //@@@: this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font; //@@@: this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(682, 332); //@@@: this.ClientSize = new System.Drawing.Size(682, 332);
            this.Controls.Add(this.splitContainer1); //@@@: this.Controls.Add(this.splitContainer1);
            this.Controls.Add(this.sbMain); //@@@: this.Controls.Add(this.sbMain);
            this.Controls.Add(this.tbMain); //@@@: this.Controls.Add(this.tbMain);
            this.Controls.Add(this.mnMain); //@@@: this.Controls.Add(this.mnMain);
            this.MainMenuStrip = this.mnMain; //@@@: this.MainMenuStrip = this.mnMain;
            this.Name = "fMain"; //@@@: this.Name = "fMain";
            this.Text = "CrowSoft Report Editor"; //@@@: this.Text = "CrowSoft Report Editor";
            this.mnMain.ResumeLayout(false); //@@@: this.mnMain.ResumeLayout(false);
            this.mnMain.PerformLayout(); //@@@: this.mnMain.PerformLayout();
            this.tbMain.ResumeLayout(false); //@@@: this.tbMain.ResumeLayout(false);
            this.tbMain.PerformLayout(); //@@@: this.tbMain.PerformLayout();
            this.splitContainer1.Panel1.ResumeLayout(false); //@@@: this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false); //@@@: this.splitContainer1.Panel2.ResumeLayout(false);
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).EndInit();
            this.splitContainer1.ResumeLayout(false); //@@@: this.splitContainer1.ResumeLayout(false);
            this.panel1.ResumeLayout(false); //@@@: this.panel1.ResumeLayout(false);
            this.tabControl2.ResumeLayout(false); //@@@: this.tabControl2.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false); //@@@: this.tabPage3.ResumeLayout(false);
            this.tabPage4.ResumeLayout(false); //@@@: this.tabPage4.ResumeLayout(false);
            this.tabPage5.ResumeLayout(false); //@@@: this.tabPage5.ResumeLayout(false);
            this.tabReports.ResumeLayout(false); //@@@: this.tabReports.ResumeLayout(false);
            this.tbpEditor.ResumeLayout(false); //@@@: this.tbpEditor.ResumeLayout(false);
            this.pnEditor.ResumeLayout(false); //@@@: this.pnEditor.ResumeLayout(false);
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnRule)).EndInit();
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnReport)).EndInit();
            this.ResumeLayout(false); //@@@: this.ResumeLayout(false);
            this.PerformLayout(); //@@@: this.PerformLayout();

        }; //@@@: }

UNKNOWN >>         #endregion //@@@: #endregion

        let mnMain = null; //@@@: private System.Windows.Forms.MenuStrip mnMain;
        let mnFile = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnFile;
        let exitToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem exitToolStripMenuItem;
        let tbMain = null; //@@@: private System.Windows.Forms.ToolStrip tbMain;
        let tsbNew = null; //@@@: private System.Windows.Forms.ToolStripButton tsbNew;
        let toolStripButton2 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton2;
        let toolStripButton3 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton3;
        let toolStripButton14 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton14;
        let toolStripSeparator1 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        let toolStripButton4 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton4;
        let toolStripSeparator2 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator2;
        let toolStripButton5 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton5;
        let toolStripButton6 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton6;
        let toolStripSeparator3 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator3;
        let toolStripButton7 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton7;
        let toolStripButton8 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton8;
        let toolStripSeparator4 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator4;
        let btnAlignLeft = null; //@@@: private System.Windows.Forms.ToolStripButton btnAlignLeft;
        let btnAligntCenter = null; //@@@: private System.Windows.Forms.ToolStripButton btnAligntCenter;
        let btnAlignRight = null; //@@@: private System.Windows.Forms.ToolStripButton btnAlignRight;
        let toolStripSeparator5 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator5;
        let toolStripButton12 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton12;
        let toolStripSeparator6 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator6;
        let toolStripButton13 = null; //@@@: private System.Windows.Forms.ToolStripButton toolStripButton13;
        let mnuNewReport = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuNewReport;
        let mnuOpenReport = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuOpenReport;
        let mnuSaveReport = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuSaveReport;
        let mnuReportSaveAs = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuReportSaveAs;
        let toolStripSeparator7 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator7;
        let printerSettingsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem printerSettingsToolStripMenuItem;
        let toolStripSeparator8 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator8;
        let mnuPreviewReport = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuPreviewReport;
        let mnuPrintReport = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuPrintReport;
        let toolStripSeparator9 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator9;
        let openRecentToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem openRecentToolStripMenuItem;
        let mnuExit = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuExit;
        let mnEdit = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnEdit;
        let copyToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem copyToolStripMenuItem;
        let cutToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cutToolStripMenuItem;
        let pasteToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem pasteToolStripMenuItem;
        let toolStripSeparator10 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator10;
        let mnuEditSearch = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditSearch;
        let toolStripSeparator11 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator11;
        let mnuEditAddSec = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddSec;
        let mnuEditAddHeader = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddHeader;
        let mnuEditAddGroup = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddGroup;
        let mnuEditAddFooter = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddFooter;
        let controlsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem controlsToolStripMenuItem;
        let mnuEditAddLabel = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddLabel;
        let mnuEditAddLine = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddLine;
        let mnuEditAddControl = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddControl;
        let imageToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem imageToolStripMenuItem;
        let chartToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem chartToolStripMenuItem;
        let toolStripSeparator12 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator12;
        let mnuEditMove = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditMove;
        let horizontalToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem horizontalToolStripMenuItem;
        let verticalToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem verticalToolStripMenuItem;
        let lockToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem lockToolStripMenuItem;
        let allDirectionsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem allDirectionsToolStripMenuItem;
        let toolStripSeparator13 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator13;
        let sizeOfMoveStepWithKeyboardToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem sizeOfMoveStepWithKeyboardToolStripMenuItem;
        let mnView = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnView;
        let mnuViewToolbar = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuViewToolbar;
        let mnuViewControls = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuViewControls;
        let mnuViewTreeViewCtrls = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuViewTreeViewCtrls;
        let toolStripSeparator14 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator14;
        let viewGridToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem viewGridToolStripMenuItem;
        let pointsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem pointsToolStripMenuItem;
        let linesToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem linesToolStripMenuItem;
        let mnuViewGridMain = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuViewGridMain;
        let mnDatabase = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnDatabase;
        let mnTool = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnTool;
        let mnHelp = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnHelp;
        let connectionSettingsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem connectionSettingsToolStripMenuItem;
        let viewParametersToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem viewParametersToolStripMenuItem;
        let toolStripSeparator15 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator15;
        let mnuDataBaseConnectsAuxCfg = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseConnectsAuxCfg;
        let toolStripSeparator16 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator16;
        let mnuDataBaseSetDisconnected = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseSetDisconnected;
        let manualSettingsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem manualSettingsToolStripMenuItem;
        let mnuDataBaseEditStrConnect = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseEditStrConnect;
        let mnuDataBaseConnectConfig = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseConnectConfig;
        let mnuDataBaseEditEx = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseEditEx;
        let mnuDataBaseSetToMainConnect = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseSetToMainConnect;
        let optionsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem optionsToolStripMenuItem;
        let aboutToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem aboutToolStripMenuItem;
        let sbMain = null; //@@@: private System.Windows.Forms.StatusStrip sbMain;
        let splitContainer1 = null; //@@@: private System.Windows.Forms.SplitContainer splitContainer1;
        let panel1 = null; //@@@: private System.Windows.Forms.Panel panel1;
        let tabControl2 = null; //@@@: private System.Windows.Forms.TabControl tabControl2;
        let tabPage3 = null; //@@@: private System.Windows.Forms.TabPage tabPage3;
        let listView2 = null; //@@@: private System.Windows.Forms.ListView listView2;
        let tabPage4 = null; //@@@: private System.Windows.Forms.TabPage tabPage4;
        let listView1 = null; //@@@: private System.Windows.Forms.ListView listView1;
        let tabPage5 = null; //@@@: private System.Windows.Forms.TabPage tabPage5;
        let treeView1 = null; //@@@: private System.Windows.Forms.TreeView treeView1;
        let tabReports = null; //@@@: private System.Windows.Forms.TabControl tabReports;
        let tbpEditor = null; //@@@: private System.Windows.Forms.TabPage tbpEditor;
        let pnEditor = null; //@@@: private System.Windows.Forms.Panel pnEditor;
        let pnRule = null; //@@@: private System.Windows.Forms.PictureBox pnRule;
        let pnReport = null; //@@@: private System.Windows.Forms.PictureBox pnReport;
        let mnuFileRecentList = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuFileRecentList;
        let openFileDlg = null; //@@@: private System.Windows.Forms.OpenFileDialog openFileDlg;
        let saveFielDlg = null; //@@@: private System.Windows.Forms.SaveFileDialog saveFielDlg;

    } //@@@: }
} //@@@: }

