(function(globalObject) {
    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFMain = function() {

        // @ts-ignore
        let self: CSReportEditor.IfMain = {};
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
            this.mnMain = UNKNOWN >>  can't find constructor for class System.Windows.Forms.MenuStrip();
            this.mnFile = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuNewReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuOpenReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuFileRecentList = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuSaveReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuReportSaveAs = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator7 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.exitToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.printerSettingsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator8 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuPreviewReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator9 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuPrintReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.openRecentToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuExit = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnEdit = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.copyToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cutToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.pasteToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator10 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuEditSearch = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator11 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuEditAddSec = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddHeader = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddGroup = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddFooter = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.controlsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddLabel = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddLine = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddControl = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.imageToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.chartToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator12 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuEditMove = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.horizontalToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.verticalToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.lockToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.allDirectionsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator13 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnView = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewToolbar = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewControls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator14 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuViewTreeViewCtrls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.viewGridToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.pointsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.linesToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewGridMain = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnDatabase = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.connectionSettingsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.viewParametersToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator15 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseConnectsAuxCfg = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator16 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseSetDisconnected = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.manualSettingsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseEditStrConnect = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseConnectConfig = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseEditEx = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseSetToMainConnect = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnTool = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.optionsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnHelp = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.aboutToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.tbMain = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStrip();
            this.tsbNew = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripButton2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripButton3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripButton14 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton5 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripButton6 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton7 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripButton8 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.btnAlignLeft = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.btnAligntCenter = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.btnAlignRight = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator5 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton12 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator6 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.toolStripButton13 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.sbMain = UNKNOWN >>  can't find constructor for class System.Windows.Forms.StatusStrip();
            this.splitContainer1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.SplitContainer();
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.tabControl2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabControl();
            this.tabPage3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.listView2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ListView();
            this.tabPage4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.listView1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ListView();
            this.tabPage5 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.treeView1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeView();
            this.tabReports = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabControl();
            this.tbpEditor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.pnEditor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.pnRule = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.pnReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.openFileDlg = UNKNOWN >>  can't find constructor for class System.Windows.Forms.OpenFileDialog();
            this.saveFielDlg = UNKNOWN >>  can't find constructor for class System.Windows.Forms.SaveFileDialog();
            this.mnMain.SuspendLayout();
            this.tbMain.SuspendLayout();
            ().BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.tabControl2.SuspendLayout();
            this.tabPage3.SuspendLayout();
            this.tabPage4.SuspendLayout();
            this.tabPage5.SuspendLayout();
            this.tabReports.SuspendLayout();
            this.tbpEditor.SuspendLayout();
            this.pnEditor.SuspendLayout();
            ().BeginInit();
            ().BeginInit();
            this.SuspendLayout();
            // 
            // mnMain
            // 
            this.mnMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnFile,
            this.mnEdit,
            this.mnView,
            this.mnDatabase,
            this.mnTool,
            this.mnHelp});
            this.mnMain.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.mnMain.Name = "mnMain";
            this.mnMain.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(682, 24);
            this.mnMain.TabIndex = 0;
            this.mnMain.Text = "menuStrip1";
            // 
            // mnFile
            // 
            this.mnFile.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuNewReport,
            this.mnuOpenReport,
            this.mnuFileRecentList,
            this.mnuSaveReport,
            this.mnuReportSaveAs,
            this.toolStripSeparator7,
            this.exitToolStripMenuItem,
            this.printerSettingsToolStripMenuItem,
            this.toolStripSeparator8,
            this.mnuPreviewReport,
            this.toolStripSeparator9,
            this.mnuPrintReport,
            this.openRecentToolStripMenuItem,
            this.mnuExit});
            this.mnFile.Name = "mnFile";
            this.mnFile.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(37, 20);
            this.mnFile.Text = "File";
            // 
            // mnuNewReport
            // 
            this.mnuNewReport.Name = "mnuNewReport";
            this.mnuNewReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuNewReport.Text = "New";
            this.mnuNewReport.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuNewReport_Click);
            // 
            // mnuOpenReport
            // 
            this.mnuOpenReport.Name = "mnuOpenReport";
            this.mnuOpenReport.ShortcutKeys = (());
            this.mnuOpenReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuOpenReport.Text = "Open";
            this.mnuOpenReport.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuOpenReport_Click);
            // 
            // mnuFileRecentList
            // 
            this.mnuFileRecentList.Name = "mnuFileRecentList";
            this.mnuFileRecentList.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuFileRecentList.Text = "Open Recent Files ...";
            // 
            // mnuSaveReport
            // 
            this.mnuSaveReport.Name = "mnuSaveReport";
            this.mnuSaveReport.ShortcutKeys = (());
            this.mnuSaveReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuSaveReport.Text = "Save";
            // 
            // mnuReportSaveAs
            // 
            this.mnuReportSaveAs.Name = "mnuReportSaveAs";
            this.mnuReportSaveAs.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuReportSaveAs.Text = "Save As";
            // 
            // toolStripSeparator7
            // 
            this.toolStripSeparator7.Name = "toolStripSeparator7";
            this.toolStripSeparator7.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(177, 6);
            // 
            // exitToolStripMenuItem
            // 
            this.exitToolStripMenuItem.Name = "exitToolStripMenuItem";
            this.exitToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.exitToolStripMenuItem.Text = "Page Setup";
            // 
            // printerSettingsToolStripMenuItem
            // 
            this.printerSettingsToolStripMenuItem.Name = "printerSettingsToolStripMenuItem";
            this.printerSettingsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.printerSettingsToolStripMenuItem.Text = "Printer Settings";
            // 
            // toolStripSeparator8
            // 
            this.toolStripSeparator8.Name = "toolStripSeparator8";
            this.toolStripSeparator8.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(177, 6);
            // 
            // mnuPreviewReport
            // 
            this.mnuPreviewReport.Name = "mnuPreviewReport";
            this.mnuPreviewReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuPreviewReport.Text = "Preview";
            // 
            // toolStripSeparator9
            // 
            this.toolStripSeparator9.Name = "toolStripSeparator9";
            this.toolStripSeparator9.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(177, 6);
            // 
            // mnuPrintReport
            // 
            this.mnuPrintReport.Name = "mnuPrintReport";
            this.mnuPrintReport.ShortcutKeys = (());
            this.mnuPrintReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuPrintReport.Text = "Print";
            // 
            // openRecentToolStripMenuItem
            // 
            this.openRecentToolStripMenuItem.Name = "openRecentToolStripMenuItem";
            this.openRecentToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.openRecentToolStripMenuItem.Text = "Open Recent";
            // 
            // mnuExit
            // 
            this.mnuExit.Name = "mnuExit";
            this.mnuExit.ShortcutKeys = (());
            this.mnuExit.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuExit.Text = "Exit";
            // 
            // mnEdit
            // 
            this.mnEdit.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.copyToolStripMenuItem,
            this.cutToolStripMenuItem,
            this.pasteToolStripMenuItem,
            this.toolStripSeparator10,
            this.mnuEditSearch,
            this.toolStripSeparator11,
            this.mnuEditAddSec,
            this.controlsToolStripMenuItem,
            this.toolStripSeparator12,
            this.mnuEditMove});
            this.mnEdit.Name = "mnEdit";
            this.mnEdit.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(39, 20);
            this.mnEdit.Text = "Edit";
            // 
            // copyToolStripMenuItem
            // 
            this.copyToolStripMenuItem.Name = "copyToolStripMenuItem";
            this.copyToolStripMenuItem.ShortcutKeys = (());
            this.copyToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.copyToolStripMenuItem.Text = "Copy";
            // 
            // cutToolStripMenuItem
            // 
            this.cutToolStripMenuItem.Name = "cutToolStripMenuItem";
            this.cutToolStripMenuItem.ShortcutKeys = (());
            this.cutToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.cutToolStripMenuItem.Text = "Cut";
            // 
            // pasteToolStripMenuItem
            // 
            this.pasteToolStripMenuItem.Name = "pasteToolStripMenuItem";
            this.pasteToolStripMenuItem.ShortcutKeys = (());
            this.pasteToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.pasteToolStripMenuItem.Text = "Paste";
            // 
            // toolStripSeparator10
            // 
            this.toolStripSeparator10.Name = "toolStripSeparator10";
            this.toolStripSeparator10.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(146, 6);
            // 
            // mnuEditSearch
            // 
            this.mnuEditSearch.Name = "mnuEditSearch";
            this.mnuEditSearch.ShortcutKeys = (());
            this.mnuEditSearch.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.mnuEditSearch.Text = "Search";
            // 
            // toolStripSeparator11
            // 
            this.toolStripSeparator11.Name = "toolStripSeparator11";
            this.toolStripSeparator11.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(146, 6);
            // 
            // mnuEditAddSec
            // 
            this.mnuEditAddSec.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuEditAddHeader,
            this.mnuEditAddGroup,
            this.mnuEditAddFooter});
            this.mnuEditAddSec.Name = "mnuEditAddSec";
            this.mnuEditAddSec.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.mnuEditAddSec.Text = "Sections";
            // 
            // mnuEditAddHeader
            // 
            this.mnuEditAddHeader.Name = "mnuEditAddHeader";
            this.mnuEditAddHeader.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(137, 22);
            this.mnuEditAddHeader.Text = "Add Header";
            // 
            // mnuEditAddGroup
            // 
            this.mnuEditAddGroup.Name = "mnuEditAddGroup";
            this.mnuEditAddGroup.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(137, 22);
            this.mnuEditAddGroup.Text = "Add Group";
            // 
            // mnuEditAddFooter
            // 
            this.mnuEditAddFooter.Name = "mnuEditAddFooter";
            this.mnuEditAddFooter.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(137, 22);
            this.mnuEditAddFooter.Text = "Add Footer";
            // 
            // controlsToolStripMenuItem
            // 
            this.controlsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuEditAddLabel,
            this.mnuEditAddLine,
            this.mnuEditAddControl,
            this.imageToolStripMenuItem,
            this.chartToolStripMenuItem});
            this.controlsToolStripMenuItem.Name = "controlsToolStripMenuItem";
            this.controlsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.controlsToolStripMenuItem.Text = "Controls";
            // 
            // mnuEditAddLabel
            // 
            this.mnuEditAddLabel.Name = "mnuEditAddLabel";
            this.mnuEditAddLabel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(150, 22);
            this.mnuEditAddLabel.Text = "Label";
            // 
            // mnuEditAddLine
            // 
            this.mnuEditAddLine.Name = "mnuEditAddLine";
            this.mnuEditAddLine.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(150, 22);
            this.mnuEditAddLine.Text = "Line";
            // 
            // mnuEditAddControl
            // 
            this.mnuEditAddControl.Name = "mnuEditAddControl";
            this.mnuEditAddControl.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(150, 22);
            this.mnuEditAddControl.Text = "Database Field";
            // 
            // imageToolStripMenuItem
            // 
            this.imageToolStripMenuItem.Name = "imageToolStripMenuItem";
            this.imageToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(150, 22);
            this.imageToolStripMenuItem.Text = "Image";
            // 
            // chartToolStripMenuItem
            // 
            this.chartToolStripMenuItem.Name = "chartToolStripMenuItem";
            this.chartToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(150, 22);
            this.chartToolStripMenuItem.Text = "Chart";
            // 
            // toolStripSeparator12
            // 
            this.toolStripSeparator12.Name = "toolStripSeparator12";
            this.toolStripSeparator12.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(146, 6);
            // 
            // mnuEditMove
            // 
            this.mnuEditMove.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.horizontalToolStripMenuItem,
            this.verticalToolStripMenuItem,
            this.lockToolStripMenuItem,
            this.allDirectionsToolStripMenuItem,
            this.toolStripSeparator13,
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem});
            this.mnuEditMove.Name = "mnuEditMove";
            this.mnuEditMove.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.mnuEditMove.Text = "Move";
            // 
            // horizontalToolStripMenuItem
            // 
            this.horizontalToolStripMenuItem.Name = "horizontalToolStripMenuItem";
            this.horizontalToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.horizontalToolStripMenuItem.Text = "Horizontal";
            // 
            // verticalToolStripMenuItem
            // 
            this.verticalToolStripMenuItem.Name = "verticalToolStripMenuItem";
            this.verticalToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.verticalToolStripMenuItem.Text = "Vertical";
            // 
            // lockToolStripMenuItem
            // 
            this.lockToolStripMenuItem.Name = "lockToolStripMenuItem";
            this.lockToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.lockToolStripMenuItem.Text = "Lock";
            // 
            // allDirectionsToolStripMenuItem
            // 
            this.allDirectionsToolStripMenuItem.Name = "allDirectionsToolStripMenuItem";
            this.allDirectionsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.allDirectionsToolStripMenuItem.Text = "All Directions";
            // 
            // toolStripSeparator13
            // 
            this.toolStripSeparator13.Name = "toolStripSeparator13";
            this.toolStripSeparator13.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(243, 6);
            // 
            // sizeOfMoveStepWithKeyboardToolStripMenuItem
            // 
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Name = "sizeOfMoveStepWithKeyboardToolStripMenuItem";
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.sizeOfMoveStepWithKeyboardToolStripMenuItem.Text = "Size of Move Step with Keyboard";
            // 
            // mnView
            // 
            this.mnView.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuViewToolbar,
            this.mnuViewControls,
            this.toolStripSeparator14,
            this.mnuViewTreeViewCtrls,
            this.viewGridToolStripMenuItem});
            this.mnView.Name = "mnView";
            this.mnView.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(44, 20);
            this.mnView.Text = "View";
            // 
            // mnuViewToolbar
            // 
            this.mnuViewToolbar.Name = "mnuViewToolbar";
            this.mnuViewToolbar.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(140, 22);
            this.mnuViewToolbar.Text = "Toolbox";
            // 
            // mnuViewControls
            // 
            this.mnuViewControls.Name = "mnuViewControls";
            this.mnuViewControls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(140, 22);
            this.mnuViewControls.Text = "Control Grid";
            // 
            // toolStripSeparator14
            // 
            this.toolStripSeparator14.Name = "toolStripSeparator14";
            this.toolStripSeparator14.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(137, 6);
            // 
            // mnuViewTreeViewCtrls
            // 
            this.mnuViewTreeViewCtrls.Name = "mnuViewTreeViewCtrls";
            this.mnuViewTreeViewCtrls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(140, 22);
            this.mnuViewTreeViewCtrls.Text = "Control Tree";
            // 
            // viewGridToolStripMenuItem
            // 
            this.viewGridToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.pointsToolStripMenuItem,
            this.linesToolStripMenuItem,
            this.mnuViewGridMain});
            this.viewGridToolStripMenuItem.Name = "viewGridToolStripMenuItem";
            this.viewGridToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(140, 22);
            this.viewGridToolStripMenuItem.Text = "View Grid";
            // 
            // pointsToolStripMenuItem
            // 
            this.pointsToolStripMenuItem.Name = "pointsToolStripMenuItem";
            this.pointsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(124, 22);
            this.pointsToolStripMenuItem.Text = "Points";
            // 
            // linesToolStripMenuItem
            // 
            this.linesToolStripMenuItem.Name = "linesToolStripMenuItem";
            this.linesToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(124, 22);
            this.linesToolStripMenuItem.Text = "Lines";
            // 
            // mnuViewGridMain
            // 
            this.mnuViewGridMain.Name = "mnuViewGridMain";
            this.mnuViewGridMain.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(124, 22);
            this.mnuViewGridMain.Text = "Hide Grid";
            // 
            // mnDatabase
            // 
            this.mnDatabase.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.connectionSettingsToolStripMenuItem,
            this.viewParametersToolStripMenuItem,
            this.toolStripSeparator15,
            this.mnuDataBaseConnectsAuxCfg,
            this.toolStripSeparator16,
            this.mnuDataBaseSetDisconnected,
            this.manualSettingsToolStripMenuItem,
            this.mnuDataBaseSetToMainConnect});
            this.mnDatabase.Name = "mnDatabase";
            this.mnDatabase.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(67, 20);
            this.mnDatabase.Text = "Database";
            // 
            // connectionSettingsToolStripMenuItem
            // 
            this.connectionSettingsToolStripMenuItem.Name = "connectionSettingsToolStripMenuItem";
            this.connectionSettingsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.connectionSettingsToolStripMenuItem.Text = "Connection Settings";
            // 
            // viewParametersToolStripMenuItem
            // 
            this.viewParametersToolStripMenuItem.Name = "viewParametersToolStripMenuItem";
            this.viewParametersToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.viewParametersToolStripMenuItem.Text = "View Parameters";
            // 
            // toolStripSeparator15
            // 
            this.toolStripSeparator15.Name = "toolStripSeparator15";
            this.toolStripSeparator15.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(325, 6);
            // 
            // mnuDataBaseConnectsAuxCfg
            // 
            this.mnuDataBaseConnectsAuxCfg.Name = "mnuDataBaseConnectsAuxCfg";
            this.mnuDataBaseConnectsAuxCfg.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.mnuDataBaseConnectsAuxCfg.Text = "Additional Connections";
            // 
            // toolStripSeparator16
            // 
            this.toolStripSeparator16.Name = "toolStripSeparator16";
            this.toolStripSeparator16.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(325, 6);
            // 
            // mnuDataBaseSetDisconnected
            // 
            this.mnuDataBaseSetDisconnected.Name = "mnuDataBaseSetDisconnected";
            this.mnuDataBaseSetDisconnected.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.mnuDataBaseSetDisconnected.Text = "Not a Database Report";
            // 
            // manualSettingsToolStripMenuItem
            // 
            this.manualSettingsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuDataBaseEditStrConnect,
            this.mnuDataBaseConnectConfig,
            this.mnuDataBaseEditEx});
            this.manualSettingsToolStripMenuItem.Name = "manualSettingsToolStripMenuItem";
            this.manualSettingsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.manualSettingsToolStripMenuItem.Text = "Manual Settings";
            // 
            // mnuDataBaseEditStrConnect
            // 
            this.mnuDataBaseEditStrConnect.Name = "mnuDataBaseEditStrConnect";
            this.mnuDataBaseEditStrConnect.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(195, 22);
            this.mnuDataBaseEditStrConnect.Text = "SQL Server Connection";
            // 
            // mnuDataBaseConnectConfig
            // 
            this.mnuDataBaseConnectConfig.Name = "mnuDataBaseConnectConfig";
            this.mnuDataBaseConnectConfig.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(195, 22);
            this.mnuDataBaseConnectConfig.Text = "Connection String";
            // 
            // mnuDataBaseEditEx
            // 
            this.mnuDataBaseEditEx.Name = "mnuDataBaseEditEx";
            this.mnuDataBaseEditEx.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(195, 22);
            this.mnuDataBaseEditEx.Text = "Data Source";
            // 
            // mnuDataBaseSetToMainConnect
            // 
            this.mnuDataBaseSetToMainConnect.Name = "mnuDataBaseSetToMainConnect";
            this.mnuDataBaseSetToMainConnect.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.mnuDataBaseSetToMainConnect.Text = "Apply Main Connection to Addional Conections";
            // 
            // mnTool
            // 
            this.mnTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.optionsToolStripMenuItem});
            this.mnTool.Name = "mnTool";
            this.mnTool.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(48, 20);
            this.mnTool.Text = "Tools";
            // 
            // optionsToolStripMenuItem
            // 
            this.optionsToolStripMenuItem.Name = "optionsToolStripMenuItem";
            this.optionsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(116, 22);
            this.optionsToolStripMenuItem.Text = "Options";
            // 
            // mnHelp
            // 
            this.mnHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.aboutToolStripMenuItem});
            this.mnHelp.Name = "mnHelp";
            this.mnHelp.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(44, 20);
            this.mnHelp.Text = "Help";
            // 
            // aboutToolStripMenuItem
            // 
            this.aboutToolStripMenuItem.Name = "aboutToolStripMenuItem";
            this.aboutToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(107, 22);
            this.aboutToolStripMenuItem.Text = "About";
            // 
            // tbMain
            // 
            this.tbMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbNew,
            this.toolStripButton2,
            this.toolStripButton3,
            this.toolStripButton14,
            this.toolStripSeparator1,
            this.toolStripButton4,
            this.toolStripSeparator2,
            this.toolStripButton5,
            this.toolStripButton6,
            this.toolStripSeparator3,
            this.toolStripButton7,
            this.toolStripButton8,
            this.toolStripSeparator4,
            this.btnAlignLeft,
            this.btnAligntCenter,
            this.btnAlignRight,
            this.toolStripSeparator5,
            this.toolStripButton12,
            this.toolStripSeparator6,
            this.toolStripButton13});
            this.tbMain.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 24);
            this.tbMain.Name = "tbMain";
            this.tbMain.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(682, 25);
            this.tbMain.TabIndex = 1;
            this.tbMain.Text = "toolStrip1";
            // 
            // tsbNew
            // 
            this.tsbNew.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbNew.Image = global::CSReportEditor.Properties.Resources.page;
            this.tsbNew.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbNew.Name = "tsbNew";
            this.tsbNew.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbNew.Text = "toolStripButton1";
            this.tsbNew.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbNew_Click);
            // 
            // toolStripButton2
            // 
            this.toolStripButton2.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton2.Image = global::CSReportEditor.Properties.Resources.folder_page;
            this.toolStripButton2.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton2.Name = "toolStripButton2";
            this.toolStripButton2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton2.Text = "toolStripButton2";
            // 
            // toolStripButton3
            // 
            this.toolStripButton3.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton3.Image = global::CSReportEditor.Properties.Resources.disk;
            this.toolStripButton3.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton3.Name = "toolStripButton3";
            this.toolStripButton3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton3.Text = "toolStripButton3";
            // 
            // toolStripButton14
            // 
            this.toolStripButton14.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton14.Image = global::CSReportEditor.Properties.Resources.disk_multiple;
            this.toolStripButton14.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton14.Name = "toolStripButton14";
            this.toolStripButton14.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton14.Text = "toolStripButton14";
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // toolStripButton4
            // 
            this.toolStripButton4.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton4.Image = global::CSReportEditor.Properties.Resources.database_gear;
            this.toolStripButton4.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton4.Name = "toolStripButton4";
            this.toolStripButton4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton4.Text = "toolStripButton4";
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // toolStripButton5
            // 
            this.toolStripButton5.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton5.Image = global::CSReportEditor.Properties.Resources.lightning;
            this.toolStripButton5.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton5.Name = "toolStripButton5";
            this.toolStripButton5.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton5.Text = "toolStripButton5";
            // 
            // toolStripButton6
            // 
            this.toolStripButton6.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton6.Image = global::CSReportEditor.Properties.Resources.printer;
            this.toolStripButton6.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton6.Name = "toolStripButton6";
            this.toolStripButton6.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton6.Text = "toolStripButton6";
            // 
            // toolStripSeparator3
            // 
            this.toolStripSeparator3.Name = "toolStripSeparator3";
            this.toolStripSeparator3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // toolStripButton7
            // 
            this.toolStripButton7.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton7.Image = global::CSReportEditor.Properties.Resources.application_side_boxes;
            this.toolStripButton7.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton7.Name = "toolStripButton7";
            this.toolStripButton7.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton7.Text = "toolStripButton7";
            // 
            // toolStripButton8
            // 
            this.toolStripButton8.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton8.Image = global::CSReportEditor.Properties.Resources.wrench;
            this.toolStripButton8.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton8.Name = "toolStripButton8";
            this.toolStripButton8.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton8.Text = "toolStripButton8";
            // 
            // toolStripSeparator4
            // 
            this.toolStripSeparator4.Name = "toolStripSeparator4";
            this.toolStripSeparator4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // btnAlignLeft
            // 
            this.btnAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.btnAlignLeft.Image = global::CSReportEditor.Properties.Resources.text_align_left;
            this.btnAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnAlignLeft.Name = "btnAlignLeft";
            this.btnAlignLeft.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.btnAlignLeft.Text = "toolStripButton9";
            // 
            // btnAligntCenter
            // 
            this.btnAligntCenter.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.btnAligntCenter.Image = global::CSReportEditor.Properties.Resources.text_align_center;
            this.btnAligntCenter.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnAligntCenter.Name = "btnAligntCenter";
            this.btnAligntCenter.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.btnAligntCenter.Text = "toolStripButton10";
            // 
            // btnAlignRight
            // 
            this.btnAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.btnAlignRight.Image = global::CSReportEditor.Properties.Resources.text_align_right;
            this.btnAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.btnAlignRight.Name = "btnAlignRight";
            this.btnAlignRight.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.btnAlignRight.Text = "toolStripButton11";
            // 
            // toolStripSeparator5
            // 
            this.toolStripSeparator5.Name = "toolStripSeparator5";
            this.toolStripSeparator5.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // toolStripButton12
            // 
            this.toolStripButton12.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton12.Image = global::CSReportEditor.Properties.Resources.text_bold;
            this.toolStripButton12.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton12.Name = "toolStripButton12";
            this.toolStripButton12.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton12.Text = "toolStripButton12";
            // 
            // toolStripSeparator6
            // 
            this.toolStripSeparator6.Name = "toolStripSeparator6";
            this.toolStripSeparator6.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // toolStripButton13
            // 
            this.toolStripButton13.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.toolStripButton13.Image = global::CSReportEditor.Properties.Resources.find;
            this.toolStripButton13.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.toolStripButton13.Name = "toolStripButton13";
            this.toolStripButton13.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.toolStripButton13.Text = "toolStripButton13";
            // 
            // sbMain
            // 
            this.sbMain.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 310);
            this.sbMain.Name = "sbMain";
            this.sbMain.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(682, 22);
            this.sbMain.TabIndex = 3;
            this.sbMain.Text = "statusStrip1";
            // 
            // splitContainer1
            // 
            this.splitContainer1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.splitContainer1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 49);
            this.splitContainer1.Name = "splitContainer1";
            // 
            // splitContainer1.Panel1
            // 
            this.splitContainer1.Panel1.Controls.Add(this.panel1);
            // 
            // splitContainer1.Panel2
            // 
            this.splitContainer1.Panel2.Controls.Add(this.tabReports);
            this.splitContainer1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(682, 261);
            this.splitContainer1.SplitterDistance = 226;
            this.splitContainer1.TabIndex = 4;
            // 
            // panel1
            // 
            this.panel1.Controls.Add(this.tabControl2);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(226, 261);
            this.panel1.TabIndex = 0;
            // 
            // tabControl2
            // 
            this.tabControl2.Controls.Add(this.tabPage3);
            this.tabControl2.Controls.Add(this.tabPage4);
            this.tabControl2.Controls.Add(this.tabPage5);
            this.tabControl2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabControl2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tabControl2.Name = "tabControl2";
            this.tabControl2.SelectedIndex = 0;
            this.tabControl2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(226, 261);
            this.tabControl2.TabIndex = 0;
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.listView2);
            this.tabPage3.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(3);
            this.tabPage3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tabPage3.TabIndex = 0;
            this.tabPage3.Text = "Controls";
            this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // listView2
            // 
            this.listView2.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listView2.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.listView2.Name = "listView2";
            this.listView2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(212, 229);
            this.listView2.TabIndex = 0;
            this.listView2.UseCompatibleStateImageBehavior = false;
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.listView1);
            this.tabPage4.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tabPage4.Name = "tabPage4";
            this.tabPage4.Padding = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(3);
            this.tabPage4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tabPage4.TabIndex = 1;
            this.tabPage4.Text = "Database";
            this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // listView1
            // 
            this.listView1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.listView1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.listView1.Name = "listView1";
            this.listView1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(212, 229);
            this.listView1.TabIndex = 0;
            this.listView1.UseCompatibleStateImageBehavior = false;
            // 
            // tabPage5
            // 
            this.tabPage5.Controls.Add(this.treeView1);
            this.tabPage5.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tabPage5.Name = "tabPage5";
            this.tabPage5.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tabPage5.TabIndex = 2;
            this.tabPage5.Text = "Report";
            this.tabPage5.UseVisualStyleBackColor = true;
            // 
            // treeView1
            // 
            this.treeView1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.treeView1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.treeView1.Name = "treeView1";
            this.treeView1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.treeView1.TabIndex = 0;
            // 
            // tabReports
            // 
            this.tabReports.Controls.Add(this.tbpEditor);
            this.tabReports.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tabReports.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tabReports.Name = "tabReports";
            this.tabReports.SelectedIndex = 0;
            this.tabReports.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(452, 261);
            this.tabReports.TabIndex = 0;
            // 
            // tbpEditor
            // 
            this.tbpEditor.Controls.Add(this.pnEditor);
            this.tbpEditor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpEditor.Name = "tbpEditor";
            this.tbpEditor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(444, 235);
            this.tbpEditor.TabIndex = 0;
            this.tbpEditor.Text = "New Report";
            this.tbpEditor.UseVisualStyleBackColor = true;
            // 
            // pnEditor
            // 
            this.pnEditor.AutoScroll = true;
            this.pnEditor.Controls.Add(this.pnRule);
            this.pnEditor.Controls.Add(this.pnReport);
            this.pnEditor.Dock = System.Windows.Forms.DockStyle.Fill;
            this.pnEditor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.pnEditor.Margin = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(0);
            this.pnEditor.Name = "pnEditor";
            this.pnEditor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(444, 235);
            this.pnEditor.TabIndex = 1;
            // 
            // pnRule
            // 
            this.pnRule.BackColor = System.Drawing.Color.PeachPuff;
            this.pnRule.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.pnRule.Name = "pnRule";
            this.pnRule.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(100, 50);
            this.pnRule.TabIndex = 1;
            this.pnRule.TabStop = false;
            // 
            // pnReport
            // 
            this.pnReport.BackColor = System.Drawing.Color.Beige;
            this.pnReport.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(135, 3);
            this.pnReport.Name = "pnReport";
            this.pnReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(100, 50);
            this.pnReport.TabIndex = 0;
            this.pnReport.TabStop = false;
            // 
            // fMain
            // 
            this.AutoScaleDimensions = UNKNOWN >>  can't find constructor for class System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = UNKNOWN >>  can't find constructor for class System.Drawing.Size(682, 332);
            this.Controls.Add(this.splitContainer1);
            this.Controls.Add(this.sbMain);
            this.Controls.Add(this.tbMain);
            this.Controls.Add(this.mnMain);
            this.MainMenuStrip = this.mnMain;
            this.Name = "fMain";
            this.Text = "CrowSoft Report Editor";
            this.mnMain.ResumeLayout(false);
            this.mnMain.PerformLayout();
            this.tbMain.ResumeLayout(false);
            this.tbMain.PerformLayout();
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false);
            ().EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.tabControl2.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false);
            this.tabPage4.ResumeLayout(false);
            this.tabPage5.ResumeLayout(false);
            this.tabReports.ResumeLayout(false);
            this.tbpEditor.ResumeLayout(false);
            this.pnEditor.ResumeLayout(false);
            ().EndInit();
            ().EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let mnMain: System.Windows.Forms.MenuStrip = null;
        let mnFile: System.Windows.Forms.ToolStripMenuItem = null;
        let exitToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let tbMain: System.Windows.Forms.ToolStrip = null;
        let tsbNew: System.Windows.Forms.ToolStripButton = null;
        let toolStripButton2: System.Windows.Forms.ToolStripButton = null;
        let toolStripButton3: System.Windows.Forms.ToolStripButton = null;
        let toolStripButton14: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator1: System.Windows.Forms.ToolStripSeparator = null;
        let toolStripButton4: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator2: System.Windows.Forms.ToolStripSeparator = null;
        let toolStripButton5: System.Windows.Forms.ToolStripButton = null;
        let toolStripButton6: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator3: System.Windows.Forms.ToolStripSeparator = null;
        let toolStripButton7: System.Windows.Forms.ToolStripButton = null;
        let toolStripButton8: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator4: System.Windows.Forms.ToolStripSeparator = null;
        let btnAlignLeft: System.Windows.Forms.ToolStripButton = null;
        let btnAligntCenter: System.Windows.Forms.ToolStripButton = null;
        let btnAlignRight: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator5: System.Windows.Forms.ToolStripSeparator = null;
        let toolStripButton12: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator6: System.Windows.Forms.ToolStripSeparator = null;
        let toolStripButton13: System.Windows.Forms.ToolStripButton = null;
        let mnuNewReport: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuOpenReport: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuSaveReport: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuReportSaveAs: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator7: System.Windows.Forms.ToolStripSeparator = null;
        let printerSettingsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator8: System.Windows.Forms.ToolStripSeparator = null;
        let mnuPreviewReport: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuPrintReport: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator9: System.Windows.Forms.ToolStripSeparator = null;
        let openRecentToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuExit: System.Windows.Forms.ToolStripMenuItem = null;
        let mnEdit: System.Windows.Forms.ToolStripMenuItem = null;
        let copyToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let cutToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let pasteToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator10: System.Windows.Forms.ToolStripSeparator = null;
        let mnuEditSearch: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator11: System.Windows.Forms.ToolStripSeparator = null;
        let mnuEditAddSec: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuEditAddHeader: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuEditAddGroup: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuEditAddFooter: System.Windows.Forms.ToolStripMenuItem = null;
        let controlsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuEditAddLabel: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuEditAddLine: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuEditAddControl: System.Windows.Forms.ToolStripMenuItem = null;
        let imageToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let chartToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator12: System.Windows.Forms.ToolStripSeparator = null;
        let mnuEditMove: System.Windows.Forms.ToolStripMenuItem = null;
        let horizontalToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let verticalToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let lockToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let allDirectionsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator13: System.Windows.Forms.ToolStripSeparator = null;
        let sizeOfMoveStepWithKeyboardToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let mnView: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuViewToolbar: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuViewControls: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuViewTreeViewCtrls: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator14: System.Windows.Forms.ToolStripSeparator = null;
        let viewGridToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let pointsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let linesToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuViewGridMain: System.Windows.Forms.ToolStripMenuItem = null;
        let mnDatabase: System.Windows.Forms.ToolStripMenuItem = null;
        let mnTool: System.Windows.Forms.ToolStripMenuItem = null;
        let mnHelp: System.Windows.Forms.ToolStripMenuItem = null;
        let connectionSettingsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let viewParametersToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator15: System.Windows.Forms.ToolStripSeparator = null;
        let mnuDataBaseConnectsAuxCfg: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator16: System.Windows.Forms.ToolStripSeparator = null;
        let mnuDataBaseSetDisconnected: System.Windows.Forms.ToolStripMenuItem = null;
        let manualSettingsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseEditStrConnect: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseConnectConfig: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseEditEx: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseSetToMainConnect: System.Windows.Forms.ToolStripMenuItem = null;
        let optionsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let aboutToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let sbMain: System.Windows.Forms.StatusStrip = null;
        let splitContainer1: System.Windows.Forms.SplitContainer = null;
        let panel1: System.Windows.Forms.Panel = null;
        let tabControl2: System.Windows.Forms.TabControl = null;
        let tabPage3: System.Windows.Forms.TabPage = null;
        let listView2: System.Windows.Forms.ListView = null;
        let tabPage4: System.Windows.Forms.TabPage = null;
        let listView1: System.Windows.Forms.ListView = null;
        let tabPage5: System.Windows.Forms.TabPage = null;
        let treeView1: System.Windows.Forms.TreeView = null;
        let tabReports: System.Windows.Forms.TabControl = null;
        let tbpEditor: System.Windows.Forms.TabPage = null;
        let pnEditor: System.Windows.Forms.Panel = null;
        let pnRule: System.Windows.Forms.PictureBox = null;
        let pnReport: System.Windows.Forms.PictureBox = null;
        let mnuFileRecentList: System.Windows.Forms.ToolStripMenuItem = null;
        let openFileDlg: System.Windows.Forms.OpenFileDialog = null;
        let saveFielDlg: System.Windows.Forms.SaveFileDialog = null;

        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfMain {

    Dispose: (bool) => void;
  }
}
);


namespace CSReportEditor {

  export interface IfMain {

    Dispose: (bool) => void;
  }
}
