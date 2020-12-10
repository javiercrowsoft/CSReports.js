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
            this.components = UNKNOWN >>  can't find constructor for class System.ComponentModel.Container();
            let resources: System.ComponentModel.ComponentResourceManager = new System.ComponentModel.ComponentResourceManager(typeof(fMain));
            this.mnMain = UNKNOWN >>  can't find constructor for class System.Windows.Forms.MenuStrip();
            this.mnFile = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuNewReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuOpenReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuFileRecentList = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuSaveReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuReportSaveAs = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator7 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuPageSetup = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.printerSettingsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator8 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuPreviewReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuPrintReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator9 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuExit = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnEdit = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuCopy = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuPaste = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuPasteSpecial = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
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
            this.mnuEditAddImage = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddChart = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
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
            this.toolStripSeparator14 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuViewControls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewTreeViewCtrls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator23 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnViewGridTool = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuGridPoints = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuGridLines = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuHideGrid = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnDatabase = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuConnectionSettings = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuParametersSettings = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator15 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseConnectsAuxCfg = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator16 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseSetDisconnected = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.manualSettingsToolStripMenuItem = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseSQLServerConnection = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseConnectConfig = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseEditDataSource = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseSetToMainConnect = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnTool = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuOptionsTool = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnHelp = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.mnuHelpAbout = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.tbMain = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStrip();
            this.tsbNew = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbOpen = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbSave = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbSaveAs = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbDatabase = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator2 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbPreview = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbPrint = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbProperties = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbControls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbAlignLeft = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbAligntCenter = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbAlignRight = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator5 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbBold = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator6 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbSearch = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator24 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.tsbCtrlAlignLeft = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbCtrlAlignRight = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbCtrlAlignTop = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbCtrlAlignBottom = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameHeight = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameWidth = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameLeft = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameTop = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripButton();
            this.sbMain = UNKNOWN >>  can't find constructor for class System.Windows.Forms.StatusStrip();
            this.splitContainer1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.SplitContainer();
            this.panel1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.tab_sidebar = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabControl();
            this.tabPage5 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.tv_controls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeView();
            this.imageListTree = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ImageList(this.components);
            this.tabPage3 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.lv_controls = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ListView();
            this.columnHeader1 = ((new System.Windows.Forms.ColumnHeader()));
            this.imageList = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ImageList(this.components);
            this.tabPage4 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.lv_fields = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ListView();
            this.columnHeader2 = ((new System.Windows.Forms.ColumnHeader()));
            this.tabPage1 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.lv_properties = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ListView();
            this.columnHeader3 = ((new System.Windows.Forms.ColumnHeader()));
            this.columnHeader4 = ((new System.Windows.Forms.ColumnHeader()));
            this.tabReports = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabControl();
            this.tbpEditor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.TabPage();
            this.pnEditor = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Panel();
            this.pnRule = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.pnReport = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PictureBox();
            this.openFileDlg = UNKNOWN >>  can't find constructor for class System.Windows.Forms.OpenFileDialog();
            this.saveFielDlg = UNKNOWN >>  can't find constructor for class System.Windows.Forms.SaveFileDialog();
            this.cmnControl = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ContextMenuStrip(this.components);
            this.cmCtrlCopy = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmCtrlPaste = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmCtrlPasteEx = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator17 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlDelete = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator18 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlEditText = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator20 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlSendBack = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmCtrlBringFront = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator19 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlProperties = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmnSection = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ContextMenuStrip(this.components);
            this.cmSectionAddSectionLine = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator21 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.cmSectionDeleteSection = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionDeleteSectionLine = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator22 = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.cmSectionSectionProperties = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionSectionLineProperties = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionGroupSeparator = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripSeparator();
            this.cmSectionGroupProperties = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionMoveGroup = UNKNOWN >>  can't find constructor for class System.Windows.Forms.ToolStripMenuItem();
            this.printDlg = UNKNOWN >>  can't find constructor for class System.Windows.Forms.PrintDialog();
            this.mnMain.SuspendLayout();
            this.tbMain.SuspendLayout();
            ().BeginInit();
            this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout();
            this.panel1.SuspendLayout();
            this.tab_sidebar.SuspendLayout();
            this.tabPage5.SuspendLayout();
            this.tabPage3.SuspendLayout();
            this.tabPage4.SuspendLayout();
            this.tabPage1.SuspendLayout();
            this.tabReports.SuspendLayout();
            this.tbpEditor.SuspendLayout();
            this.pnEditor.SuspendLayout();
            ().BeginInit();
            ().BeginInit();
            this.cmnControl.SuspendLayout();
            this.cmnSection.SuspendLayout();
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
            this.mnuPageSetup,
            this.printerSettingsToolStripMenuItem,
            this.toolStripSeparator8,
            this.mnuPreviewReport,
            this.mnuPrintReport,
            this.toolStripSeparator9,
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
            this.mnuSaveReport.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuSaveReport_Click);
            // 
            // mnuReportSaveAs
            // 
            this.mnuReportSaveAs.Name = "mnuReportSaveAs";
            this.mnuReportSaveAs.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuReportSaveAs.Text = "Save As";
            this.mnuReportSaveAs.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuReportSaveAs_Click);
            // 
            // toolStripSeparator7
            // 
            this.toolStripSeparator7.Name = "toolStripSeparator7";
            this.toolStripSeparator7.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(177, 6);
            // 
            // mnuPageSetup
            // 
            this.mnuPageSetup.Name = "mnuPageSetup";
            this.mnuPageSetup.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuPageSetup.Text = "Page Setup";
            this.mnuPageSetup.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuPageSetup_Click);
            // 
            // printerSettingsToolStripMenuItem
            // 
            this.printerSettingsToolStripMenuItem.Name = "printerSettingsToolStripMenuItem";
            this.printerSettingsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.printerSettingsToolStripMenuItem.Text = "Printer Settings";
            this.printerSettingsToolStripMenuItem.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuPrinterSettings_Click);
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
            this.mnuPreviewReport.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuPreviewReport_Click);
            // 
            // mnuPrintReport
            // 
            this.mnuPrintReport.Name = "mnuPrintReport";
            this.mnuPrintReport.ShortcutKeys = (());
            this.mnuPrintReport.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuPrintReport.Text = "Print";
            this.mnuPrintReport.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuPrintReport_Click);
            // 
            // toolStripSeparator9
            // 
            this.toolStripSeparator9.Name = "toolStripSeparator9";
            this.toolStripSeparator9.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(177, 6);
            // 
            // mnuExit
            // 
            this.mnuExit.Name = "mnuExit";
            this.mnuExit.ShortcutKeys = (());
            this.mnuExit.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(180, 22);
            this.mnuExit.Text = "Exit";
            this.mnuExit.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuExit_Click);
            // 
            // mnEdit
            // 
            this.mnEdit.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuCopy,
            this.mnuPaste,
            this.mnuPasteSpecial,
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
            // mnuCopy
            // 
            this.mnuCopy.Name = "mnuCopy";
            this.mnuCopy.ShortcutKeys = (());
            this.mnuCopy.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.mnuCopy.Text = "Copy";
            this.mnuCopy.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuCopy_Click);
            // 
            // mnuPaste
            // 
            this.mnuPaste.Name = "mnuPaste";
            this.mnuPaste.ShortcutKeys = (());
            this.mnuPaste.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.mnuPaste.Text = "Paste";
            this.mnuPaste.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuPaste_Click);
            // 
            // mnuPasteSpecial
            // 
            this.mnuPasteSpecial.Name = "mnuPasteSpecial";
            this.mnuPasteSpecial.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.mnuPasteSpecial.Text = "Paste Special";
            this.mnuPasteSpecial.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuPasteSpecial_Click);
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
            this.mnuEditSearch.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditSearch_Click);
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
            this.mnuEditAddHeader.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddHeader_Click);
            // 
            // mnuEditAddGroup
            // 
            this.mnuEditAddGroup.Name = "mnuEditAddGroup";
            this.mnuEditAddGroup.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(137, 22);
            this.mnuEditAddGroup.Text = "Add Group";
            this.mnuEditAddGroup.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddGroup_Click);
            // 
            // mnuEditAddFooter
            // 
            this.mnuEditAddFooter.Name = "mnuEditAddFooter";
            this.mnuEditAddFooter.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(137, 22);
            this.mnuEditAddFooter.Text = "Add Footer";
            this.mnuEditAddFooter.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddFooter_Click);
            // 
            // controlsToolStripMenuItem
            // 
            this.controlsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuEditAddLabel,
            this.mnuEditAddLine,
            this.mnuEditAddControl,
            this.mnuEditAddImage,
            this.mnuEditAddChart});
            this.controlsToolStripMenuItem.Name = "controlsToolStripMenuItem";
            this.controlsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(149, 22);
            this.controlsToolStripMenuItem.Text = "Controls";
            // 
            // mnuEditAddLabel
            // 
            this.mnuEditAddLabel.Name = "mnuEditAddLabel";
            this.mnuEditAddLabel.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(175, 22);
            this.mnuEditAddLabel.Text = "Add Label";
            this.mnuEditAddLabel.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddLabel_Click);
            // 
            // mnuEditAddLine
            // 
            this.mnuEditAddLine.Name = "mnuEditAddLine";
            this.mnuEditAddLine.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(175, 22);
            this.mnuEditAddLine.Text = "Add Line";
            this.mnuEditAddLine.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddLine_Click);
            // 
            // mnuEditAddControl
            // 
            this.mnuEditAddControl.Name = "mnuEditAddControl";
            this.mnuEditAddControl.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(175, 22);
            this.mnuEditAddControl.Text = "Add Database Field";
            this.mnuEditAddControl.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddControl_Click);
            // 
            // mnuEditAddImage
            // 
            this.mnuEditAddImage.Name = "mnuEditAddImage";
            this.mnuEditAddImage.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(175, 22);
            this.mnuEditAddImage.Text = "Add Image";
            this.mnuEditAddImage.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddImage_Click);
            // 
            // mnuEditAddChart
            // 
            this.mnuEditAddChart.Name = "mnuEditAddChart";
            this.mnuEditAddChart.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(175, 22);
            this.mnuEditAddChart.Text = "Add Chart";
            this.mnuEditAddChart.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuEditAddChart_Click);
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
            this.mnuEditMove.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(152, 22);
            this.mnuEditMove.Text = "Move";
            // 
            // horizontalToolStripMenuItem
            // 
            this.horizontalToolStripMenuItem.Name = "horizontalToolStripMenuItem";
            this.horizontalToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.horizontalToolStripMenuItem.Text = "Horizontal";
            this.horizontalToolStripMenuItem.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.horizontalToolStripMenuItem_Click);
            // 
            // verticalToolStripMenuItem
            // 
            this.verticalToolStripMenuItem.Name = "verticalToolStripMenuItem";
            this.verticalToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.verticalToolStripMenuItem.Text = "Vertical";
            this.verticalToolStripMenuItem.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.verticalToolStripMenuItem_Click);
            // 
            // lockToolStripMenuItem
            // 
            this.lockToolStripMenuItem.Name = "lockToolStripMenuItem";
            this.lockToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.lockToolStripMenuItem.Text = "Lock";
            this.lockToolStripMenuItem.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.lockToolStripMenuItem_Click);
            // 
            // allDirectionsToolStripMenuItem
            // 
            this.allDirectionsToolStripMenuItem.Checked = true;
            this.allDirectionsToolStripMenuItem.CheckState = System.Windows.Forms.CheckState.Checked;
            this.allDirectionsToolStripMenuItem.Name = "allDirectionsToolStripMenuItem";
            this.allDirectionsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(246, 22);
            this.allDirectionsToolStripMenuItem.Text = "All Directions";
            this.allDirectionsToolStripMenuItem.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.allDirectionsToolStripMenuItem_Click);
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
            this.toolStripSeparator14,
            this.mnuViewControls,
            this.mnuViewTreeViewCtrls,
            this.toolStripSeparator23,
            this.mnViewGridTool});
            this.mnView.Name = "mnView";
            this.mnView.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(44, 20);
            this.mnView.Text = "View";
            // 
            // mnuViewToolbar
            // 
            this.mnuViewToolbar.Name = "mnuViewToolbar";
            this.mnuViewToolbar.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(139, 22);
            this.mnuViewToolbar.Text = "Toolbox";
            this.mnuViewToolbar.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuViewToolbar_Click);
            // 
            // toolStripSeparator14
            // 
            this.toolStripSeparator14.Name = "toolStripSeparator14";
            this.toolStripSeparator14.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(136, 6);
            // 
            // mnuViewControls
            // 
            this.mnuViewControls.Name = "mnuViewControls";
            this.mnuViewControls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(139, 22);
            this.mnuViewControls.Text = "Control Grid";
            this.mnuViewControls.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuViewControls_Click);
            // 
            // mnuViewTreeViewCtrls
            // 
            this.mnuViewTreeViewCtrls.Name = "mnuViewTreeViewCtrls";
            this.mnuViewTreeViewCtrls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(139, 22);
            this.mnuViewTreeViewCtrls.Text = "Control Tree";
            this.mnuViewTreeViewCtrls.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuViewTreeViewCtrls_Click);
            // 
            // toolStripSeparator23
            // 
            this.toolStripSeparator23.Name = "toolStripSeparator23";
            this.toolStripSeparator23.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(136, 6);
            // 
            // mnViewGridTool
            // 
            this.mnViewGridTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuGridPoints,
            this.mnuGridLines,
            this.mnuHideGrid});
            this.mnViewGridTool.Name = "mnViewGridTool";
            this.mnViewGridTool.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(139, 22);
            this.mnViewGridTool.Text = "View Grid";
            // 
            // mnuGridPoints
            // 
            this.mnuGridPoints.Name = "mnuGridPoints";
            this.mnuGridPoints.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(124, 22);
            this.mnuGridPoints.Text = "Points";
            this.mnuGridPoints.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuGridPoints_Click);
            // 
            // mnuGridLines
            // 
            this.mnuGridLines.Name = "mnuGridLines";
            this.mnuGridLines.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(124, 22);
            this.mnuGridLines.Text = "Lines";
            this.mnuGridLines.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuGridLines_Click);
            // 
            // mnuHideGrid
            // 
            this.mnuHideGrid.Name = "mnuHideGrid";
            this.mnuHideGrid.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(124, 22);
            this.mnuHideGrid.Text = "Hide Grid";
            this.mnuHideGrid.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuHideGrid_Click);
            // 
            // mnDatabase
            // 
            this.mnDatabase.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuConnectionSettings,
            this.mnuParametersSettings,
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
            // mnuConnectionSettings
            // 
            this.mnuConnectionSettings.Name = "mnuConnectionSettings";
            this.mnuConnectionSettings.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.mnuConnectionSettings.Text = "Connection Settings";
            // 
            // mnuParametersSettings
            // 
            this.mnuParametersSettings.Name = "mnuParametersSettings";
            this.mnuParametersSettings.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.mnuParametersSettings.Text = "Parameters Settings";
            this.mnuParametersSettings.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuParametersSettings_Click);
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
            this.mnuDataBaseSQLServerConnection,
            this.mnuDataBaseConnectConfig,
            this.mnuDataBaseEditDataSource});
            this.manualSettingsToolStripMenuItem.Name = "manualSettingsToolStripMenuItem";
            this.manualSettingsToolStripMenuItem.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.manualSettingsToolStripMenuItem.Text = "Manual Settings";
            // 
            // mnuDataBaseSQLServerConnection
            // 
            this.mnuDataBaseSQLServerConnection.Name = "mnuDataBaseSQLServerConnection";
            this.mnuDataBaseSQLServerConnection.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(195, 22);
            this.mnuDataBaseSQLServerConnection.Text = "SQL Server Connection";
            this.mnuDataBaseSQLServerConnection.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuDataBaseSQLServerConnection_Click);
            // 
            // mnuDataBaseConnectConfig
            // 
            this.mnuDataBaseConnectConfig.Name = "mnuDataBaseConnectConfig";
            this.mnuDataBaseConnectConfig.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(195, 22);
            this.mnuDataBaseConnectConfig.Text = "Connection String";
            this.mnuDataBaseConnectConfig.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuDataBaseConnectConfig_Click);
            // 
            // mnuDataBaseEditDataSource
            // 
            this.mnuDataBaseEditDataSource.Name = "mnuDataBaseEditDataSource";
            this.mnuDataBaseEditDataSource.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(195, 22);
            this.mnuDataBaseEditDataSource.Text = "Data Source";
            this.mnuDataBaseEditDataSource.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuDataBaseEditDataSource_Click);
            // 
            // mnuDataBaseSetToMainConnect
            // 
            this.mnuDataBaseSetToMainConnect.Name = "mnuDataBaseSetToMainConnect";
            this.mnuDataBaseSetToMainConnect.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(328, 22);
            this.mnuDataBaseSetToMainConnect.Text = "Apply Main Connection to Addional Conections";
            this.mnuDataBaseSetToMainConnect.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuDataBaseSetToMainConnect_Click);
            // 
            // mnTool
            // 
            this.mnTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuOptionsTool});
            this.mnTool.Name = "mnTool";
            this.mnTool.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(47, 20);
            this.mnTool.Text = "Tools";
            // 
            // mnuOptionsTool
            // 
            this.mnuOptionsTool.Name = "mnuOptionsTool";
            this.mnuOptionsTool.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(116, 22);
            this.mnuOptionsTool.Text = "Options";
            this.mnuOptionsTool.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuOptionsTool_Click);
            // 
            // mnHelp
            // 
            this.mnHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuHelpAbout});
            this.mnHelp.Name = "mnHelp";
            this.mnHelp.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(44, 20);
            this.mnHelp.Text = "Help";
            // 
            // mnuHelpAbout
            // 
            this.mnuHelpAbout.Name = "mnuHelpAbout";
            this.mnuHelpAbout.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(107, 22);
            this.mnuHelpAbout.Text = "About";
            this.mnuHelpAbout.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.mnuHelpAbout_Click);
            // 
            // tbMain
            // 
            this.tbMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbNew,
            this.tsbOpen,
            this.tsbSave,
            this.tsbSaveAs,
            this.toolStripSeparator1,
            this.tsbDatabase,
            this.toolStripSeparator2,
            this.tsbPreview,
            this.tsbPrint,
            this.toolStripSeparator3,
            this.tsbProperties,
            this.tsbControls,
            this.toolStripSeparator4,
            this.tsbAlignLeft,
            this.tsbAligntCenter,
            this.tsbAlignRight,
            this.toolStripSeparator5,
            this.tsbBold,
            this.toolStripSeparator6,
            this.tsbSearch,
            this.toolStripSeparator24,
            this.tsbCtrlAlignLeft,
            this.tsbCtrlAlignRight,
            this.tsbCtrlAlignTop,
            this.tsbCtrlAlignBottom,
            this.tsbCtrlSameHeight,
            this.tsbCtrlSameWidth,
            this.tsbCtrlSameLeft,
            this.tsbCtrlSameTop});
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
            this.tsbNew.Text = "New report";
            this.tsbNew.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbNew_Click);
            // 
            // tsbOpen
            // 
            this.tsbOpen.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbOpen.Image = global::CSReportEditor.Properties.Resources.folder_page;
            this.tsbOpen.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbOpen.Name = "tsbOpen";
            this.tsbOpen.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbOpen.Text = "Open a report";
            this.tsbOpen.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbOpen_Click);
            // 
            // tsbSave
            // 
            this.tsbSave.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbSave.Image = global::CSReportEditor.Properties.Resources.disk;
            this.tsbSave.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbSave.Name = "tsbSave";
            this.tsbSave.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbSave.Text = "Save";
            this.tsbSave.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbSave_Click);
            // 
            // tsbSaveAs
            // 
            this.tsbSaveAs.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbSaveAs.Image = global::CSReportEditor.Properties.Resources.disk_multiple;
            this.tsbSaveAs.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbSaveAs.Name = "tsbSaveAs";
            this.tsbSaveAs.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbSaveAs.Text = "Save as";
            this.tsbSaveAs.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbSaveAs_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbDatabase
            // 
            this.tsbDatabase.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbDatabase.Image = global::CSReportEditor.Properties.Resources.database_gear;
            this.tsbDatabase.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbDatabase.Name = "tsbDatabase";
            this.tsbDatabase.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbDatabase.Text = "Edit connection settings";
            this.tsbDatabase.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbDatabase_Click);
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbPreview
            // 
            this.tsbPreview.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPreview.Image = global::CSReportEditor.Properties.Resources.lightning;
            this.tsbPreview.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPreview.Name = "tsbPreview";
            this.tsbPreview.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbPreview.Text = "Execute this report";
            this.tsbPreview.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbPreview_Click);
            // 
            // tsbPrint
            // 
            this.tsbPrint.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPrint.Image = global::CSReportEditor.Properties.Resources.printer;
            this.tsbPrint.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPrint.Name = "tsbPrint";
            this.tsbPrint.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbPrint.Text = "Print";
            this.tsbPrint.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbPrint_Click);
            // 
            // toolStripSeparator3
            // 
            this.toolStripSeparator3.Name = "toolStripSeparator3";
            this.toolStripSeparator3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbProperties
            // 
            this.tsbProperties.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbProperties.Image = global::CSReportEditor.Properties.Resources.application_side_boxes;
            this.tsbProperties.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbProperties.Name = "tsbProperties";
            this.tsbProperties.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbProperties.Text = "Edit properties";
            this.tsbProperties.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbProperties_Click);
            // 
            // tsbControls
            // 
            this.tsbControls.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbControls.Image = global::CSReportEditor.Properties.Resources.wrench;
            this.tsbControls.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbControls.Name = "tsbControls";
            this.tsbControls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbControls.Text = "Show toolbox";
            this.tsbControls.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbControls_Click);
            // 
            // toolStripSeparator4
            // 
            this.toolStripSeparator4.Name = "toolStripSeparator4";
            this.toolStripSeparator4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbAlignLeft
            // 
            this.tsbAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbAlignLeft.Image = global::CSReportEditor.Properties.Resources.text_align_left;
            this.tsbAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbAlignLeft.Name = "tsbAlignLeft";
            this.tsbAlignLeft.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbAlignLeft.Text = "Align left";
            this.tsbAlignLeft.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbAlignLeft_Click);
            // 
            // tsbAligntCenter
            // 
            this.tsbAligntCenter.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbAligntCenter.Image = global::CSReportEditor.Properties.Resources.text_align_center;
            this.tsbAligntCenter.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbAligntCenter.Name = "tsbAligntCenter";
            this.tsbAligntCenter.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbAligntCenter.Text = "Center";
            this.tsbAligntCenter.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbAligntCenter_Click);
            // 
            // tsbAlignRight
            // 
            this.tsbAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbAlignRight.Image = global::CSReportEditor.Properties.Resources.text_align_right;
            this.tsbAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbAlignRight.Name = "tsbAlignRight";
            this.tsbAlignRight.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbAlignRight.Text = "Align right";
            this.tsbAlignRight.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbAlignRight_Click);
            // 
            // toolStripSeparator5
            // 
            this.toolStripSeparator5.Name = "toolStripSeparator5";
            this.toolStripSeparator5.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbBold
            // 
            this.tsbBold.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbBold.Image = global::CSReportEditor.Properties.Resources.text_bold;
            this.tsbBold.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbBold.Name = "tsbBold";
            this.tsbBold.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbBold.Text = "Bold";
            this.tsbBold.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbBold_Click);
            // 
            // toolStripSeparator6
            // 
            this.toolStripSeparator6.Name = "toolStripSeparator6";
            this.toolStripSeparator6.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbSearch
            // 
            this.tsbSearch.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbSearch.Image = global::CSReportEditor.Properties.Resources.find;
            this.tsbSearch.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbSearch.Name = "tsbSearch";
            this.tsbSearch.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbSearch.Text = "Search a text in this report";
            this.tsbSearch.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbSearch_Click);
            // 
            // toolStripSeparator24
            // 
            this.toolStripSeparator24.Name = "toolStripSeparator24";
            this.toolStripSeparator24.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(6, 25);
            // 
            // tsbCtrlAlignLeft
            // 
            this.tsbCtrlAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignLeft.Image = ((resources.GetObject("tsbCtrlAlignLeft.Image")));
            this.tsbCtrlAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignLeft.Name = "tsbCtrlAlignLeft";
            this.tsbCtrlAlignLeft.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlAlignLeft.Text = "toolStripButton1";
            this.tsbCtrlAlignLeft.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlAlignLeft_Click);
            // 
            // tsbCtrlAlignRight
            // 
            this.tsbCtrlAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignRight.Image = ((resources.GetObject("tsbCtrlAlignRight.Image")));
            this.tsbCtrlAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignRight.Name = "tsbCtrlAlignRight";
            this.tsbCtrlAlignRight.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlAlignRight.Text = "toolStripButton2";
            this.tsbCtrlAlignRight.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlAlignRight_Click);
            // 
            // tsbCtrlAlignTop
            // 
            this.tsbCtrlAlignTop.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignTop.Image = ((resources.GetObject("tsbCtrlAlignTop.Image")));
            this.tsbCtrlAlignTop.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignTop.Name = "tsbCtrlAlignTop";
            this.tsbCtrlAlignTop.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlAlignTop.Text = "toolStripButton3";
            this.tsbCtrlAlignTop.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlAlignTop_Click);
            // 
            // tsbCtrlAlignBottom
            // 
            this.tsbCtrlAlignBottom.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignBottom.Image = ((resources.GetObject("tsbCtrlAlignBottom.Image")));
            this.tsbCtrlAlignBottom.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignBottom.Name = "tsbCtrlAlignBottom";
            this.tsbCtrlAlignBottom.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlAlignBottom.Text = "toolStripButton4";
            this.tsbCtrlAlignBottom.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlAlignBottom_Click);
            // 
            // tsbCtrlSameHeight
            // 
            this.tsbCtrlSameHeight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameHeight.Image = ((resources.GetObject("tsbCtrlSameHeight.Image")));
            this.tsbCtrlSameHeight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameHeight.Name = "tsbCtrlSameHeight";
            this.tsbCtrlSameHeight.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlSameHeight.Text = "toolStripButton1";
            this.tsbCtrlSameHeight.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlSameHeight_Click);
            // 
            // tsbCtrlSameWidth
            // 
            this.tsbCtrlSameWidth.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameWidth.Image = ((resources.GetObject("tsbCtrlSameWidth.Image")));
            this.tsbCtrlSameWidth.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameWidth.Name = "tsbCtrlSameWidth";
            this.tsbCtrlSameWidth.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlSameWidth.Text = "toolStripButton2";
            this.tsbCtrlSameWidth.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlSameWidth_Click);
            // 
            // tsbCtrlSameLeft
            // 
            this.tsbCtrlSameLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameLeft.Image = ((resources.GetObject("tsbCtrlSameLeft.Image")));
            this.tsbCtrlSameLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameLeft.Name = "tsbCtrlSameLeft";
            this.tsbCtrlSameLeft.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlSameLeft.Text = "toolStripButton3";
            this.tsbCtrlSameLeft.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlSameLeft_Click);
            // 
            // tsbCtrlSameTop
            // 
            this.tsbCtrlSameTop.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameTop.Image = ((resources.GetObject("tsbCtrlSameTop.Image")));
            this.tsbCtrlSameTop.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameTop.Name = "tsbCtrlSameTop";
            this.tsbCtrlSameTop.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(23, 22);
            this.tsbCtrlSameTop.Text = "toolStripButton4";
            this.tsbCtrlSameTop.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.tsbCtrlSameTop_Click);
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
            this.splitContainer1.FixedPanel = System.Windows.Forms.FixedPanel.Panel1;
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
            this.panel1.Controls.Add(this.tab_sidebar);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1";
            this.panel1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(226, 261);
            this.panel1.TabIndex = 0;
            // 
            // tab_sidebar
            // 
            this.tab_sidebar.Controls.Add(this.tabPage5);
            this.tab_sidebar.Controls.Add(this.tabPage3);
            this.tab_sidebar.Controls.Add(this.tabPage4);
            this.tab_sidebar.Controls.Add(this.tabPage1);
            this.tab_sidebar.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tab_sidebar.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tab_sidebar.Name = "tab_sidebar";
            this.tab_sidebar.SelectedIndex = 0;
            this.tab_sidebar.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(226, 261);
            this.tab_sidebar.TabIndex = 0;
            // 
            // tabPage5
            // 
            this.tabPage5.Controls.Add(this.tv_controls);
            this.tabPage5.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tabPage5.Name = "tabPage5";
            this.tabPage5.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tabPage5.TabIndex = 2;
            this.tabPage5.Text = "Report";
            this.tabPage5.UseVisualStyleBackColor = true;
            // 
            // tv_controls
            // 
            this.tv_controls.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tv_controls.ImageIndex = 0;
            this.tv_controls.ImageList = this.imageListTree;
            this.tv_controls.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.tv_controls.Name = "tv_controls";
            this.tv_controls.SelectedImageIndex = 0;
            this.tv_controls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tv_controls.TabIndex = 0;
            this.tv_controls.BeforeCollapse += UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeViewCancelEventHandler(this.tv_controls_BeforeCollapse);
            this.tv_controls.BeforeExpand += UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeViewCancelEventHandler(this.tv_controls_BeforeExpand);
            this.tv_controls.NodeMouseClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.TreeNodeMouseClickEventHandler(this.tv_controls_NodeMouseClick);
            this.tv_controls.KeyUp += UNKNOWN >>  can't find constructor for class System.Windows.Forms.KeyEventHandler(this.tv_controls_KeyUp);
            this.tv_controls.MouseDoubleClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.MouseEventHandler(this.tv_controls_MouseDoubleClick);
            this.tv_controls.MouseDown += UNKNOWN >>  can't find constructor for class System.Windows.Forms.MouseEventHandler(this.tv_controls_MouseDown);
            // 
            // imageListTree
            // 
            this.imageListTree.ImageStream = ((resources.GetObject("imageListTree.ImageStream")));
            this.imageListTree.TransparentColor = System.Drawing.Color.Transparent;
            this.imageListTree.Images.SetKeyName(0, "xtratabcontrol.gif");
            this.imageListTree.Images.SetKeyName(1, "base002.ico");
            this.imageListTree.Images.SetKeyName(2, "property.ico");
            this.imageListTree.Images.SetKeyName(3, "aspxroundpanel.gif");
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.lv_controls);
            this.tabPage3.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(3);
            this.tabPage3.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tabPage3.TabIndex = 0;
            this.tabPage3.Text = "Controls";
            this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // lv_controls
            // 
            this.lv_controls.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1});
            this.lv_controls.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_controls.FullRowSelect = true;
            this.lv_controls.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.lv_controls.Name = "lv_controls";
            this.lv_controls.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(212, 229);
            this.lv_controls.SmallImageList = this.imageList;
            this.lv_controls.TabIndex = 0;
            this.lv_controls.UseCompatibleStateImageBehavior = false;
            this.lv_controls.View = System.Windows.Forms.View.Details;
            this.lv_controls.ColumnClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.ColumnClickEventHandler(this.lv_controls_ColumnClick);
            this.lv_controls.KeyUp += UNKNOWN >>  can't find constructor for class System.Windows.Forms.KeyEventHandler(this.lv_controls_KeyUp);
            this.lv_controls.MouseClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.MouseEventHandler(this.lv_controls_MouseClick);
            this.lv_controls.MouseDoubleClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.MouseEventHandler(this.lv_controls_MouseDoubleClick);
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "Name";
            this.columnHeader1.Width = 170;
            // 
            // imageList
            // 
            this.imageList.ImageStream = ((resources.GetObject("imageList.ImageStream")));
            this.imageList.TransparentColor = System.Drawing.Color.Transparent;
            this.imageList.Images.SetKeyName(0, "base002.ico");
            this.imageList.Images.SetKeyName(1, "property.ico");
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.lv_fields);
            this.tabPage4.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tabPage4.Name = "tabPage4";
            this.tabPage4.Padding = UNKNOWN >>  can't find constructor for class System.Windows.Forms.Padding(3);
            this.tabPage4.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tabPage4.TabIndex = 1;
            this.tabPage4.Text = "Database";
            this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // lv_fields
            // 
            this.lv_fields.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader2});
            this.lv_fields.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_fields.FullRowSelect = true;
            this.lv_fields.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(3, 3);
            this.lv_fields.Name = "lv_fields";
            this.lv_fields.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(212, 229);
            this.lv_fields.SmallImageList = this.imageList;
            this.lv_fields.TabIndex = 0;
            this.lv_fields.UseCompatibleStateImageBehavior = false;
            this.lv_fields.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "Name";
            this.columnHeader2.Width = 230;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.lv_properties);
            this.tabPage1.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1";
            this.tabPage1.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.tabPage1.TabIndex = 3;
            this.tabPage1.Text = "Properties";
            this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // lv_properties
            // 
            this.lv_properties.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader3,
            this.columnHeader4});
            this.lv_properties.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_properties.FullRowSelect = true;
            this.lv_properties.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(0, 0);
            this.lv_properties.Name = "lv_properties";
            this.lv_properties.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(218, 235);
            this.lv_properties.SmallImageList = this.imageListTree;
            this.lv_properties.TabIndex = 1;
            this.lv_properties.UseCompatibleStateImageBehavior = false;
            this.lv_properties.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "Name";
            this.columnHeader3.Width = 100;
            // 
            // columnHeader4
            // 
            this.columnHeader4.Text = "Value";
            this.columnHeader4.Width = 80;
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
            this.tabReports.MouseClick += UNKNOWN >>  can't find constructor for class System.Windows.Forms.MouseEventHandler(this.tabReports_MouseClick);
            // 
            // tbpEditor
            // 
            this.tbpEditor.Controls.Add(this.pnEditor);
            this.tbpEditor.Location = UNKNOWN >>  can't find constructor for class System.Drawing.Point(4, 22);
            this.tbpEditor.Name = "tbpEditor";
            this.tbpEditor.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(444, 235);
            this.tbpEditor.TabIndex = 0;
            this.tbpEditor.Text = "New Report [X]";
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
            // cmnControl
            // 
            this.cmnControl.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.cmCtrlCopy,
            this.cmCtrlPaste,
            this.cmCtrlPasteEx,
            this.toolStripSeparator17,
            this.cmCtrlDelete,
            this.toolStripSeparator18,
            this.cmCtrlEditText,
            this.toolStripSeparator20,
            this.cmCtrlSendBack,
            this.cmCtrlBringFront,
            this.toolStripSeparator19,
            this.cmCtrlProperties});
            this.cmnControl.Name = "cmnControl";
            this.cmnControl.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(142, 204);
            // 
            // cmCtrlCopy
            // 
            this.cmCtrlCopy.Name = "cmCtrlCopy";
            this.cmCtrlCopy.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlCopy.Text = "Copy";
            this.cmCtrlCopy.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmCtrlCopy_Click);
            // 
            // cmCtrlPaste
            // 
            this.cmCtrlPaste.Name = "cmCtrlPaste";
            this.cmCtrlPaste.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlPaste.Text = "Paste";
            this.cmCtrlPaste.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmCtrlPaste_Click);
            // 
            // cmCtrlPasteEx
            // 
            this.cmCtrlPasteEx.Name = "cmCtrlPasteEx";
            this.cmCtrlPasteEx.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlPasteEx.Text = "Paste special";
            this.cmCtrlPasteEx.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmCtrlPasteEx_Click);
            // 
            // toolStripSeparator17
            // 
            this.toolStripSeparator17.Name = "toolStripSeparator17";
            this.toolStripSeparator17.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(138, 6);
            // 
            // cmCtrlDelete
            // 
            this.cmCtrlDelete.Name = "cmCtrlDelete";
            this.cmCtrlDelete.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlDelete.Text = "Delete";
            this.cmCtrlDelete.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmCtrlDelete_Click);
            // 
            // toolStripSeparator18
            // 
            this.toolStripSeparator18.Name = "toolStripSeparator18";
            this.toolStripSeparator18.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(138, 6);
            // 
            // cmCtrlEditText
            // 
            this.cmCtrlEditText.Name = "cmCtrlEditText";
            this.cmCtrlEditText.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlEditText.Text = "Edit text";
            // 
            // toolStripSeparator20
            // 
            this.toolStripSeparator20.Name = "toolStripSeparator20";
            this.toolStripSeparator20.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(138, 6);
            // 
            // cmCtrlSendBack
            // 
            this.cmCtrlSendBack.Name = "cmCtrlSendBack";
            this.cmCtrlSendBack.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlSendBack.Text = "Send back";
            this.cmCtrlSendBack.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmCtrlSendBack_Click);
            // 
            // cmCtrlBringFront
            // 
            this.cmCtrlBringFront.Name = "cmCtrlBringFront";
            this.cmCtrlBringFront.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlBringFront.Text = "Bring front";
            this.cmCtrlBringFront.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmCtrlBringFront_Click);
            // 
            // toolStripSeparator19
            // 
            this.toolStripSeparator19.Name = "toolStripSeparator19";
            this.toolStripSeparator19.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(138, 6);
            // 
            // cmCtrlProperties
            // 
            this.cmCtrlProperties.Name = "cmCtrlProperties";
            this.cmCtrlProperties.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(141, 22);
            this.cmCtrlProperties.Text = "Properties";
            this.cmCtrlProperties.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmCtrlProperties_Click);
            // 
            // cmnSection
            // 
            this.cmnSection.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.cmSectionAddSectionLine,
            this.toolStripSeparator21,
            this.cmSectionDeleteSection,
            this.cmSectionDeleteSectionLine,
            this.toolStripSeparator22,
            this.cmSectionSectionProperties,
            this.cmSectionSectionLineProperties,
            this.cmSectionGroupSeparator,
            this.cmSectionGroupProperties,
            this.cmSectionMoveGroup});
            this.cmnSection.Name = "cmnSection";
            this.cmnSection.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(192, 176);
            // 
            // cmSectionAddSectionLine
            // 
            this.cmSectionAddSectionLine.Name = "cmSectionAddSectionLine";
            this.cmSectionAddSectionLine.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(191, 22);
            this.cmSectionAddSectionLine.Text = "Add section line";
            this.cmSectionAddSectionLine.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmSectionAddSectionLine_Click);
            // 
            // toolStripSeparator21
            // 
            this.toolStripSeparator21.Name = "toolStripSeparator21";
            this.toolStripSeparator21.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(188, 6);
            // 
            // cmSectionDeleteSection
            // 
            this.cmSectionDeleteSection.Name = "cmSectionDeleteSection";
            this.cmSectionDeleteSection.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(191, 22);
            this.cmSectionDeleteSection.Text = "Delete section";
            this.cmSectionDeleteSection.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmSectionDeleteSection_Click);
            // 
            // cmSectionDeleteSectionLine
            // 
            this.cmSectionDeleteSectionLine.Name = "cmSectionDeleteSectionLine";
            this.cmSectionDeleteSectionLine.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(191, 22);
            this.cmSectionDeleteSectionLine.Text = "Delete section line";
            this.cmSectionDeleteSectionLine.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmSectionDeleteSectionLine_Click);
            // 
            // toolStripSeparator22
            // 
            this.toolStripSeparator22.Name = "toolStripSeparator22";
            this.toolStripSeparator22.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(188, 6);
            // 
            // cmSectionSectionProperties
            // 
            this.cmSectionSectionProperties.Name = "cmSectionSectionProperties";
            this.cmSectionSectionProperties.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(191, 22);
            this.cmSectionSectionProperties.Text = "Section properties";
            this.cmSectionSectionProperties.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmSectionSectionProperties_Click);
            // 
            // cmSectionSectionLineProperties
            // 
            this.cmSectionSectionLineProperties.Name = "cmSectionSectionLineProperties";
            this.cmSectionSectionLineProperties.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(191, 22);
            this.cmSectionSectionLineProperties.Text = "Section line properties";
            this.cmSectionSectionLineProperties.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmSectionSectionLineProperties_Click);
            // 
            // cmSectionGroupSeparator
            // 
            this.cmSectionGroupSeparator.Name = "cmSectionGroupSeparator";
            this.cmSectionGroupSeparator.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(188, 6);
            // 
            // cmSectionGroupProperties
            // 
            this.cmSectionGroupProperties.Name = "cmSectionGroupProperties";
            this.cmSectionGroupProperties.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(191, 22);
            this.cmSectionGroupProperties.Text = "Group properties";
            this.cmSectionGroupProperties.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmSectionGroupProperties_Click);
            // 
            // cmSectionMoveGroup
            // 
            this.cmSectionMoveGroup.Name = "cmSectionMoveGroup";
            this.cmSectionMoveGroup.Size = UNKNOWN >>  can't find constructor for class System.Drawing.Size(191, 22);
            this.cmSectionMoveGroup.Text = "Move group";
            this.cmSectionMoveGroup.Click += UNKNOWN >>  can't find constructor for class System.EventHandler(this.cmSectionMoveGroup_Click);
            // 
            // printDlg
            // 
            this.printDlg.UseEXDialog = true;
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
            this.KeyPreview = true;
            this.MainMenuStrip = this.mnMain;
            this.Name = "fMain";
            this.Text = "CrowSoft Report Editor";
            this.Load += UNKNOWN >>  can't find constructor for class System.EventHandler(this.fMain_Load);
            this.KeyDown += UNKNOWN >>  can't find constructor for class System.Windows.Forms.KeyEventHandler(this.fMain_KeyDown);
            this.KeyUp += UNKNOWN >>  can't find constructor for class System.Windows.Forms.KeyEventHandler(this.fMain_KeyUp);
            this.mnMain.ResumeLayout(false);
            this.mnMain.PerformLayout();
            this.tbMain.ResumeLayout(false);
            this.tbMain.PerformLayout();
            this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false);
            ().EndInit();
            this.splitContainer1.ResumeLayout(false);
            this.panel1.ResumeLayout(false);
            this.tab_sidebar.ResumeLayout(false);
            this.tabPage5.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false);
            this.tabPage4.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false);
            this.tabReports.ResumeLayout(false);
            this.tbpEditor.ResumeLayout(false);
            this.pnEditor.ResumeLayout(false);
            ().EndInit();
            ().EndInit();
            this.cmnControl.ResumeLayout(false);
            this.cmnSection.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        };

UNKNOWN >>         #endregion

        let mnMain: System.Windows.Forms.MenuStrip = null;
        let mnFile: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuPageSetup: System.Windows.Forms.ToolStripMenuItem = null;
        let tbMain: System.Windows.Forms.ToolStrip = null;
        let tsbNew: System.Windows.Forms.ToolStripButton = null;
        let tsbOpen: System.Windows.Forms.ToolStripButton = null;
        let tsbSave: System.Windows.Forms.ToolStripButton = null;
        let tsbSaveAs: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator1: System.Windows.Forms.ToolStripSeparator = null;
        let tsbDatabase: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator2: System.Windows.Forms.ToolStripSeparator = null;
        let tsbPreview: System.Windows.Forms.ToolStripButton = null;
        let tsbPrint: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator3: System.Windows.Forms.ToolStripSeparator = null;
        let tsbProperties: System.Windows.Forms.ToolStripButton = null;
        let tsbControls: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator4: System.Windows.Forms.ToolStripSeparator = null;
        let tsbAlignLeft: System.Windows.Forms.ToolStripButton = null;
        let tsbAligntCenter: System.Windows.Forms.ToolStripButton = null;
        let tsbAlignRight: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator5: System.Windows.Forms.ToolStripSeparator = null;
        let tsbBold: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator6: System.Windows.Forms.ToolStripSeparator = null;
        let tsbSearch: System.Windows.Forms.ToolStripButton = null;
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
        let mnuExit: System.Windows.Forms.ToolStripMenuItem = null;
        let mnEdit: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuCopy: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuPaste: System.Windows.Forms.ToolStripMenuItem = null;
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
        let mnuEditAddImage: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuEditAddChart: System.Windows.Forms.ToolStripMenuItem = null;
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
        let mnViewGridTool: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuGridPoints: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuGridLines: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuHideGrid: System.Windows.Forms.ToolStripMenuItem = null;
        let mnDatabase: System.Windows.Forms.ToolStripMenuItem = null;
        let mnTool: System.Windows.Forms.ToolStripMenuItem = null;
        let mnHelp: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuConnectionSettings: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuParametersSettings: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator15: System.Windows.Forms.ToolStripSeparator = null;
        let mnuDataBaseConnectsAuxCfg: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator16: System.Windows.Forms.ToolStripSeparator = null;
        let mnuDataBaseSetDisconnected: System.Windows.Forms.ToolStripMenuItem = null;
        let manualSettingsToolStripMenuItem: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseSQLServerConnection: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseConnectConfig: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseEditDataSource: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuDataBaseSetToMainConnect: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuOptionsTool: System.Windows.Forms.ToolStripMenuItem = null;
        let mnuHelpAbout: System.Windows.Forms.ToolStripMenuItem = null;
        let sbMain: System.Windows.Forms.StatusStrip = null;
        let splitContainer1: System.Windows.Forms.SplitContainer = null;
        let panel1: System.Windows.Forms.Panel = null;
        let tab_sidebar: System.Windows.Forms.TabControl = null;
        let tabPage3: System.Windows.Forms.TabPage = null;
        let lv_controls: System.Windows.Forms.ListView = null;
        let tabPage4: System.Windows.Forms.TabPage = null;
        let lv_fields: System.Windows.Forms.ListView = null;
        let tabPage5: System.Windows.Forms.TabPage = null;
        let tv_controls: System.Windows.Forms.TreeView = null;
        let tabReports: System.Windows.Forms.TabControl = null;
        let tbpEditor: System.Windows.Forms.TabPage = null;
        let pnEditor: System.Windows.Forms.Panel = null;
        let pnRule: System.Windows.Forms.PictureBox = null;
        let pnReport: System.Windows.Forms.PictureBox = null;
        let mnuFileRecentList: System.Windows.Forms.ToolStripMenuItem = null;
        let openFileDlg: System.Windows.Forms.OpenFileDialog = null;
        let saveFielDlg: System.Windows.Forms.SaveFileDialog = null;
        let tabPage1: System.Windows.Forms.TabPage = null;
        let cmnControl: System.Windows.Forms.ContextMenuStrip = null;
        let cmCtrlProperties: System.Windows.Forms.ToolStripMenuItem = null;
        let cmCtrlCopy: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator17: System.Windows.Forms.ToolStripSeparator = null;
        let cmCtrlDelete: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator18: System.Windows.Forms.ToolStripSeparator = null;
        let cmCtrlEditText: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator20: System.Windows.Forms.ToolStripSeparator = null;
        let cmCtrlSendBack: System.Windows.Forms.ToolStripMenuItem = null;
        let cmCtrlBringFront: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator19: System.Windows.Forms.ToolStripSeparator = null;
        let cmCtrlPaste: System.Windows.Forms.ToolStripMenuItem = null;
        let cmCtrlPasteEx: System.Windows.Forms.ToolStripMenuItem = null;
        let cmnSection: System.Windows.Forms.ContextMenuStrip = null;
        let cmSectionAddSectionLine: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator21: System.Windows.Forms.ToolStripSeparator = null;
        let cmSectionDeleteSection: System.Windows.Forms.ToolStripMenuItem = null;
        let cmSectionDeleteSectionLine: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator22: System.Windows.Forms.ToolStripSeparator = null;
        let cmSectionSectionProperties: System.Windows.Forms.ToolStripMenuItem = null;
        let cmSectionSectionLineProperties: System.Windows.Forms.ToolStripMenuItem = null;
        let cmSectionGroupProperties: System.Windows.Forms.ToolStripMenuItem = null;
        let cmSectionGroupSeparator: System.Windows.Forms.ToolStripSeparator = null;
        let cmSectionMoveGroup: System.Windows.Forms.ToolStripMenuItem = null;
        let toolStripSeparator23: System.Windows.Forms.ToolStripSeparator = null;
        let columnHeader1: System.Windows.Forms.ColumnHeader = null;
        let imageList: System.Windows.Forms.ImageList = null;
        let columnHeader2: System.Windows.Forms.ColumnHeader = null;
        let lv_properties: System.Windows.Forms.ListView = null;
        let columnHeader3: System.Windows.Forms.ColumnHeader = null;
        let columnHeader4: System.Windows.Forms.ColumnHeader = null;
        let imageListTree: System.Windows.Forms.ImageList = null;
        let mnuPasteSpecial: System.Windows.Forms.ToolStripMenuItem = null;
        let printDlg: System.Windows.Forms.PrintDialog = null;
        let tsbCtrlAlignLeft: System.Windows.Forms.ToolStripButton = null;
        let tsbCtrlAlignRight: System.Windows.Forms.ToolStripButton = null;
        let tsbCtrlAlignTop: System.Windows.Forms.ToolStripButton = null;
        let tsbCtrlAlignBottom: System.Windows.Forms.ToolStripButton = null;
        let toolStripSeparator24: System.Windows.Forms.ToolStripSeparator = null;
        let tsbCtrlSameHeight: System.Windows.Forms.ToolStripButton = null;
        let tsbCtrlSameWidth: System.Windows.Forms.ToolStripButton = null;
        let tsbCtrlSameLeft: System.Windows.Forms.ToolStripButton = null;
        let tsbCtrlSameTop: System.Windows.Forms.ToolStripButton = null;
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
