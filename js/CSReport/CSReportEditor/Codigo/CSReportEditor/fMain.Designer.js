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
            this.components = new System.ComponentModel.Container(); //@@@: this.components = new System.ComponentModel.Container();
            let resources = new System.ComponentModel.ComponentResourceManager(typeof(fMain)); //@@@: System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(fMain));
            this.mnMain = new System.Windows.Forms.MenuStrip(); //@@@: this.mnMain = new System.Windows.Forms.MenuStrip();
            this.mnFile = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnFile = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuNewReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuNewReport = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuOpenReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuOpenReport = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuFileRecentList = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuFileRecentList = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuSaveReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuSaveReport = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuReportSaveAs = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuReportSaveAs = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator7 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator7 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuPageSetup = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuPageSetup = new System.Windows.Forms.ToolStripMenuItem();
            this.printerSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.printerSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator8 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator8 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuPreviewReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuPreviewReport = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuPrintReport = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuPrintReport = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator9 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator9 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuExit = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuExit = new System.Windows.Forms.ToolStripMenuItem();
            this.mnEdit = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnEdit = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuCopy = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuCopy = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuPaste = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuPaste = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuPasteSpecial = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuPasteSpecial = new System.Windows.Forms.ToolStripMenuItem();
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
            this.mnuEditAddImage = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddImage = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuEditAddChart = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuEditAddChart = new System.Windows.Forms.ToolStripMenuItem();
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
            this.toolStripSeparator14 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator14 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuViewControls = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuViewControls = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuViewTreeViewCtrls = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuViewTreeViewCtrls = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator23 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator23 = new System.Windows.Forms.ToolStripSeparator();
            this.mnViewGridTool = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnViewGridTool = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuGridPoints = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuGridPoints = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuGridLines = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuGridLines = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuHideGrid = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuHideGrid = new System.Windows.Forms.ToolStripMenuItem();
            this.mnDatabase = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnDatabase = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuConnectionSettings = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuConnectionSettings = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuParametersSettings = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuParametersSettings = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator15 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator15 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseConnectsAuxCfg = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseConnectsAuxCfg = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator16 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator16 = new System.Windows.Forms.ToolStripSeparator();
            this.mnuDataBaseSetDisconnected = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseSetDisconnected = new System.Windows.Forms.ToolStripMenuItem();
            this.manualSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.manualSettingsToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseSQLServerConnection = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseSQLServerConnection = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseConnectConfig = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseConnectConfig = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseEditDataSource = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseEditDataSource = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuDataBaseSetToMainConnect = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuDataBaseSetToMainConnect = new System.Windows.Forms.ToolStripMenuItem();
            this.mnTool = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnTool = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuOptionsTool = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuOptionsTool = new System.Windows.Forms.ToolStripMenuItem();
            this.mnHelp = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnHelp = new System.Windows.Forms.ToolStripMenuItem();
            this.mnuHelpAbout = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.mnuHelpAbout = new System.Windows.Forms.ToolStripMenuItem();
            this.tbMain = new System.Windows.Forms.ToolStrip(); //@@@: this.tbMain = new System.Windows.Forms.ToolStrip();
            this.tsbNew = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbNew = new System.Windows.Forms.ToolStripButton();
            this.tsbOpen = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbOpen = new System.Windows.Forms.ToolStripButton();
            this.tsbSave = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbSave = new System.Windows.Forms.ToolStripButton();
            this.tsbSaveAs = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbSaveAs = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator1 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbDatabase = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbDatabase = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator2 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbPreview = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbPreview = new System.Windows.Forms.ToolStripButton();
            this.tsbPrint = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbPrint = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator3 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator3 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbProperties = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbProperties = new System.Windows.Forms.ToolStripButton();
            this.tsbControls = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbControls = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator4 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator4 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbAlignLeft = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbAlignLeft = new System.Windows.Forms.ToolStripButton();
            this.tsbAligntCenter = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbAligntCenter = new System.Windows.Forms.ToolStripButton();
            this.tsbAlignRight = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbAlignRight = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator5 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator5 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbBold = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbBold = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator6 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator6 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbSearch = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbSearch = new System.Windows.Forms.ToolStripButton();
            this.toolStripSeparator24 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator24 = new System.Windows.Forms.ToolStripSeparator();
            this.tsbCtrlAlignLeft = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlAlignLeft = new System.Windows.Forms.ToolStripButton();
            this.tsbCtrlAlignRight = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlAlignRight = new System.Windows.Forms.ToolStripButton();
            this.tsbCtrlAlignTop = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlAlignTop = new System.Windows.Forms.ToolStripButton();
            this.tsbCtrlAlignBottom = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlAlignBottom = new System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameHeight = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlSameHeight = new System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameWidth = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlSameWidth = new System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameLeft = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlSameLeft = new System.Windows.Forms.ToolStripButton();
            this.tsbCtrlSameTop = new System.Windows.Forms.ToolStripButton(); //@@@: this.tsbCtrlSameTop = new System.Windows.Forms.ToolStripButton();
            this.sbMain = new System.Windows.Forms.StatusStrip(); //@@@: this.sbMain = new System.Windows.Forms.StatusStrip();
            this.splitContainer1 = new System.Windows.Forms.SplitContainer(); //@@@: this.splitContainer1 = new System.Windows.Forms.SplitContainer();
            this.panel1 = new System.Windows.Forms.Panel(); //@@@: this.panel1 = new System.Windows.Forms.Panel();
            this.tab_sidebar = new System.Windows.Forms.TabControl(); //@@@: this.tab_sidebar = new System.Windows.Forms.TabControl();
            this.tabPage5 = new System.Windows.Forms.TabPage(); //@@@: this.tabPage5 = new System.Windows.Forms.TabPage();
            this.tv_controls = new System.Windows.Forms.TreeView(); //@@@: this.tv_controls = new System.Windows.Forms.TreeView();
            this.imageListTree = new System.Windows.Forms.ImageList(this.components); //@@@: this.imageListTree = new System.Windows.Forms.ImageList(this.components);
            this.tabPage3 = new System.Windows.Forms.TabPage(); //@@@: this.tabPage3 = new System.Windows.Forms.TabPage();
            this.lv_controls = new System.Windows.Forms.ListView(); //@@@: this.lv_controls = new System.Windows.Forms.ListView();
            this.columnHeader1 = ((new System.Windows.Forms.ColumnHeader())); //@@@: this.columnHeader1 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.imageList = new System.Windows.Forms.ImageList(this.components); //@@@: this.imageList = new System.Windows.Forms.ImageList(this.components);
            this.tabPage4 = new System.Windows.Forms.TabPage(); //@@@: this.tabPage4 = new System.Windows.Forms.TabPage();
            this.lv_fields = new System.Windows.Forms.ListView(); //@@@: this.lv_fields = new System.Windows.Forms.ListView();
            this.columnHeader2 = ((new System.Windows.Forms.ColumnHeader())); //@@@: this.columnHeader2 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.tabPage1 = new System.Windows.Forms.TabPage(); //@@@: this.tabPage1 = new System.Windows.Forms.TabPage();
            this.lv_properties = new System.Windows.Forms.ListView(); //@@@: this.lv_properties = new System.Windows.Forms.ListView();
            this.columnHeader3 = ((new System.Windows.Forms.ColumnHeader())); //@@@: this.columnHeader3 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.columnHeader4 = ((new System.Windows.Forms.ColumnHeader())); //@@@: this.columnHeader4 = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.tabReports = new System.Windows.Forms.TabControl(); //@@@: this.tabReports = new System.Windows.Forms.TabControl();
            this.tbpEditor = new System.Windows.Forms.TabPage(); //@@@: this.tbpEditor = new System.Windows.Forms.TabPage();
            this.pnEditor = new System.Windows.Forms.Panel(); //@@@: this.pnEditor = new System.Windows.Forms.Panel();
            this.pnRule = new System.Windows.Forms.PictureBox(); //@@@: this.pnRule = new System.Windows.Forms.PictureBox();
            this.pnReport = new System.Windows.Forms.PictureBox(); //@@@: this.pnReport = new System.Windows.Forms.PictureBox();
            this.openFileDlg = new System.Windows.Forms.OpenFileDialog(); //@@@: this.openFileDlg = new System.Windows.Forms.OpenFileDialog();
            this.saveFielDlg = new System.Windows.Forms.SaveFileDialog(); //@@@: this.saveFielDlg = new System.Windows.Forms.SaveFileDialog();
            this.cmnControl = new System.Windows.Forms.ContextMenuStrip(this.components); //@@@: this.cmnControl = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.cmCtrlCopy = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlCopy = new System.Windows.Forms.ToolStripMenuItem();
            this.cmCtrlPaste = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlPaste = new System.Windows.Forms.ToolStripMenuItem();
            this.cmCtrlPasteEx = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlPasteEx = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator17 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator17 = new System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlDelete = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlDelete = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator18 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator18 = new System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlEditText = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlEditText = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator20 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator20 = new System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlSendBack = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlSendBack = new System.Windows.Forms.ToolStripMenuItem();
            this.cmCtrlBringFront = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlBringFront = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator19 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator19 = new System.Windows.Forms.ToolStripSeparator();
            this.cmCtrlProperties = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmCtrlProperties = new System.Windows.Forms.ToolStripMenuItem();
            this.cmnSection = new System.Windows.Forms.ContextMenuStrip(this.components); //@@@: this.cmnSection = new System.Windows.Forms.ContextMenuStrip(this.components);
            this.cmSectionAddSectionLine = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmSectionAddSectionLine = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator21 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator21 = new System.Windows.Forms.ToolStripSeparator();
            this.cmSectionDeleteSection = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmSectionDeleteSection = new System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionDeleteSectionLine = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmSectionDeleteSectionLine = new System.Windows.Forms.ToolStripMenuItem();
            this.toolStripSeparator22 = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.toolStripSeparator22 = new System.Windows.Forms.ToolStripSeparator();
            this.cmSectionSectionProperties = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmSectionSectionProperties = new System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionSectionLineProperties = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmSectionSectionLineProperties = new System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionGroupSeparator = new System.Windows.Forms.ToolStripSeparator(); //@@@: this.cmSectionGroupSeparator = new System.Windows.Forms.ToolStripSeparator();
            this.cmSectionGroupProperties = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmSectionGroupProperties = new System.Windows.Forms.ToolStripMenuItem();
            this.cmSectionMoveGroup = new System.Windows.Forms.ToolStripMenuItem(); //@@@: this.cmSectionMoveGroup = new System.Windows.Forms.ToolStripMenuItem();
            this.printDlg = new System.Windows.Forms.PrintDialog(); //@@@: this.printDlg = new System.Windows.Forms.PrintDialog();
            this.mnMain.SuspendLayout(); //@@@: this.mnMain.SuspendLayout();
            this.tbMain.SuspendLayout(); //@@@: this.tbMain.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).BeginInit();
            this.splitContainer1.Panel1.SuspendLayout(); //@@@: this.splitContainer1.Panel1.SuspendLayout();
            this.splitContainer1.Panel2.SuspendLayout(); //@@@: this.splitContainer1.Panel2.SuspendLayout();
            this.splitContainer1.SuspendLayout(); //@@@: this.splitContainer1.SuspendLayout();
            this.panel1.SuspendLayout(); //@@@: this.panel1.SuspendLayout();
            this.tab_sidebar.SuspendLayout(); //@@@: this.tab_sidebar.SuspendLayout();
            this.tabPage5.SuspendLayout(); //@@@: this.tabPage5.SuspendLayout();
            this.tabPage3.SuspendLayout(); //@@@: this.tabPage3.SuspendLayout();
            this.tabPage4.SuspendLayout(); //@@@: this.tabPage4.SuspendLayout();
            this.tabPage1.SuspendLayout(); //@@@: this.tabPage1.SuspendLayout();
            this.tabReports.SuspendLayout(); //@@@: this.tabReports.SuspendLayout();
            this.tbpEditor.SuspendLayout(); //@@@: this.tbpEditor.SuspendLayout();
            this.pnEditor.SuspendLayout(); //@@@: this.pnEditor.SuspendLayout();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnRule)).BeginInit();
            ().BeginInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnReport)).BeginInit();
            this.cmnControl.SuspendLayout(); //@@@: this.cmnControl.SuspendLayout();
            this.cmnSection.SuspendLayout(); //@@@: this.cmnSection.SuspendLayout();
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
            this.mnuPageSetup, //@@@: this.mnuPageSetup,
            this.printerSettingsToolStripMenuItem, //@@@: this.printerSettingsToolStripMenuItem,
            this.toolStripSeparator8, //@@@: this.toolStripSeparator8,
            this.mnuPreviewReport, //@@@: this.mnuPreviewReport,
            this.mnuPrintReport, //@@@: this.mnuPrintReport,
            this.toolStripSeparator9, //@@@: this.toolStripSeparator9,
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
            this.mnuSaveReport.Click += new System.EventHandler(this.mnuSaveReport_Click); //@@@: this.mnuSaveReport.Click += new System.EventHandler(this.mnuSaveReport_Click);
            // 
            // mnuReportSaveAs
            // 
            this.mnuReportSaveAs.Name = "mnuReportSaveAs"; //@@@: this.mnuReportSaveAs.Name = "mnuReportSaveAs";
            this.mnuReportSaveAs.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuReportSaveAs.Size = new System.Drawing.Size(180, 22);
            this.mnuReportSaveAs.Text = "Save As"; //@@@: this.mnuReportSaveAs.Text = "Save As";
            this.mnuReportSaveAs.Click += new System.EventHandler(this.mnuReportSaveAs_Click); //@@@: this.mnuReportSaveAs.Click += new System.EventHandler(this.mnuReportSaveAs_Click);
            // 
            // toolStripSeparator7
            // 
            this.toolStripSeparator7.Name = "toolStripSeparator7"; //@@@: this.toolStripSeparator7.Name = "toolStripSeparator7";
            this.toolStripSeparator7.Size = new System.Drawing.Size(177, 6); //@@@: this.toolStripSeparator7.Size = new System.Drawing.Size(177, 6);
            // 
            // mnuPageSetup
            // 
            this.mnuPageSetup.Name = "mnuPageSetup"; //@@@: this.mnuPageSetup.Name = "mnuPageSetup";
            this.mnuPageSetup.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuPageSetup.Size = new System.Drawing.Size(180, 22);
            this.mnuPageSetup.Text = "Page Setup"; //@@@: this.mnuPageSetup.Text = "Page Setup";
            this.mnuPageSetup.Click += new System.EventHandler(this.mnuPageSetup_Click); //@@@: this.mnuPageSetup.Click += new System.EventHandler(this.mnuPageSetup_Click);
            // 
            // printerSettingsToolStripMenuItem
            // 
            this.printerSettingsToolStripMenuItem.Name = "printerSettingsToolStripMenuItem"; //@@@: this.printerSettingsToolStripMenuItem.Name = "printerSettingsToolStripMenuItem";
            this.printerSettingsToolStripMenuItem.Size = new System.Drawing.Size(180, 22); //@@@: this.printerSettingsToolStripMenuItem.Size = new System.Drawing.Size(180, 22);
            this.printerSettingsToolStripMenuItem.Text = "Printer Settings"; //@@@: this.printerSettingsToolStripMenuItem.Text = "Printer Settings";
            this.printerSettingsToolStripMenuItem.Click += new System.EventHandler(this.mnuPrinterSettings_Click); //@@@: this.printerSettingsToolStripMenuItem.Click += new System.EventHandler(this.mnuPrinterSettings_Click);
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
            this.mnuPreviewReport.Click += new System.EventHandler(this.mnuPreviewReport_Click); //@@@: this.mnuPreviewReport.Click += new System.EventHandler(this.mnuPreviewReport_Click);
            // 
            // mnuPrintReport
            // 
            this.mnuPrintReport.Name = "mnuPrintReport"; //@@@: this.mnuPrintReport.Name = "mnuPrintReport";
            this.mnuPrintReport.ShortcutKeys = (()); //@@@: this.mnuPrintReport.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.P)));
            this.mnuPrintReport.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuPrintReport.Size = new System.Drawing.Size(180, 22);
            this.mnuPrintReport.Text = "Print"; //@@@: this.mnuPrintReport.Text = "Print";
            this.mnuPrintReport.Click += new System.EventHandler(this.mnuPrintReport_Click); //@@@: this.mnuPrintReport.Click += new System.EventHandler(this.mnuPrintReport_Click);
            // 
            // toolStripSeparator9
            // 
            this.toolStripSeparator9.Name = "toolStripSeparator9"; //@@@: this.toolStripSeparator9.Name = "toolStripSeparator9";
            this.toolStripSeparator9.Size = new System.Drawing.Size(177, 6); //@@@: this.toolStripSeparator9.Size = new System.Drawing.Size(177, 6);
            // 
            // mnuExit
            // 
            this.mnuExit.Name = "mnuExit"; //@@@: this.mnuExit.Name = "mnuExit";
            this.mnuExit.ShortcutKeys = (()); //@@@: this.mnuExit.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.Q)));
            this.mnuExit.Size = new System.Drawing.Size(180, 22); //@@@: this.mnuExit.Size = new System.Drawing.Size(180, 22);
            this.mnuExit.Text = "Exit"; //@@@: this.mnuExit.Text = "Exit";
            this.mnuExit.Click += new System.EventHandler(this.mnuExit_Click); //@@@: this.mnuExit.Click += new System.EventHandler(this.mnuExit_Click);
            // 
            // mnEdit
            // 
            this.mnEdit.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnEdit.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuCopy, //@@@: this.mnuCopy,
            this.mnuPaste, //@@@: this.mnuPaste,
            this.mnuPasteSpecial, //@@@: this.mnuPasteSpecial,
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
            // mnuCopy
            // 
            this.mnuCopy.Name = "mnuCopy"; //@@@: this.mnuCopy.Name = "mnuCopy";
            this.mnuCopy.ShortcutKeys = (()); //@@@: this.mnuCopy.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.C)));
            this.mnuCopy.Size = new System.Drawing.Size(149, 22); //@@@: this.mnuCopy.Size = new System.Drawing.Size(149, 22);
            this.mnuCopy.Text = "Copy"; //@@@: this.mnuCopy.Text = "Copy";
            this.mnuCopy.Click += new System.EventHandler(this.mnuCopy_Click); //@@@: this.mnuCopy.Click += new System.EventHandler(this.mnuCopy_Click);
            // 
            // mnuPaste
            // 
            this.mnuPaste.Name = "mnuPaste"; //@@@: this.mnuPaste.Name = "mnuPaste";
            this.mnuPaste.ShortcutKeys = (()); //@@@: this.mnuPaste.ShortcutKeys = ((System.Windows.Forms.Keys)((System.Windows.Forms.Keys.Control | System.Windows.Forms.Keys.V)));
            this.mnuPaste.Size = new System.Drawing.Size(149, 22); //@@@: this.mnuPaste.Size = new System.Drawing.Size(149, 22);
            this.mnuPaste.Text = "Paste"; //@@@: this.mnuPaste.Text = "Paste";
            this.mnuPaste.Click += new System.EventHandler(this.mnuPaste_Click); //@@@: this.mnuPaste.Click += new System.EventHandler(this.mnuPaste_Click);
            // 
            // mnuPasteSpecial
            // 
            this.mnuPasteSpecial.Name = "mnuPasteSpecial"; //@@@: this.mnuPasteSpecial.Name = "mnuPasteSpecial";
            this.mnuPasteSpecial.Size = new System.Drawing.Size(149, 22); //@@@: this.mnuPasteSpecial.Size = new System.Drawing.Size(149, 22);
            this.mnuPasteSpecial.Text = "Paste Special"; //@@@: this.mnuPasteSpecial.Text = "Paste Special";
            this.mnuPasteSpecial.Click += new System.EventHandler(this.mnuPasteSpecial_Click); //@@@: this.mnuPasteSpecial.Click += new System.EventHandler(this.mnuPasteSpecial_Click);
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
            this.mnuEditSearch.Click += new System.EventHandler(this.mnuEditSearch_Click); //@@@: this.mnuEditSearch.Click += new System.EventHandler(this.mnuEditSearch_Click);
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
            this.mnuEditAddHeader.Click += new System.EventHandler(this.mnuEditAddHeader_Click); //@@@: this.mnuEditAddHeader.Click += new System.EventHandler(this.mnuEditAddHeader_Click);
            // 
            // mnuEditAddGroup
            // 
            this.mnuEditAddGroup.Name = "mnuEditAddGroup"; //@@@: this.mnuEditAddGroup.Name = "mnuEditAddGroup";
            this.mnuEditAddGroup.Size = new System.Drawing.Size(137, 22); //@@@: this.mnuEditAddGroup.Size = new System.Drawing.Size(137, 22);
            this.mnuEditAddGroup.Text = "Add Group"; //@@@: this.mnuEditAddGroup.Text = "Add Group";
            this.mnuEditAddGroup.Click += new System.EventHandler(this.mnuEditAddGroup_Click); //@@@: this.mnuEditAddGroup.Click += new System.EventHandler(this.mnuEditAddGroup_Click);
            // 
            // mnuEditAddFooter
            // 
            this.mnuEditAddFooter.Name = "mnuEditAddFooter"; //@@@: this.mnuEditAddFooter.Name = "mnuEditAddFooter";
            this.mnuEditAddFooter.Size = new System.Drawing.Size(137, 22); //@@@: this.mnuEditAddFooter.Size = new System.Drawing.Size(137, 22);
            this.mnuEditAddFooter.Text = "Add Footer"; //@@@: this.mnuEditAddFooter.Text = "Add Footer";
            this.mnuEditAddFooter.Click += new System.EventHandler(this.mnuEditAddFooter_Click); //@@@: this.mnuEditAddFooter.Click += new System.EventHandler(this.mnuEditAddFooter_Click);
            // 
            // controlsToolStripMenuItem
            // 
            this.controlsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.controlsToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuEditAddLabel, //@@@: this.mnuEditAddLabel,
            this.mnuEditAddLine, //@@@: this.mnuEditAddLine,
            this.mnuEditAddControl, //@@@: this.mnuEditAddControl,
            this.mnuEditAddImage, //@@@: this.mnuEditAddImage,
            this.mnuEditAddChart}); //@@@: this.mnuEditAddChart});
            this.controlsToolStripMenuItem.Name = "controlsToolStripMenuItem"; //@@@: this.controlsToolStripMenuItem.Name = "controlsToolStripMenuItem";
            this.controlsToolStripMenuItem.Size = new System.Drawing.Size(149, 22); //@@@: this.controlsToolStripMenuItem.Size = new System.Drawing.Size(149, 22);
            this.controlsToolStripMenuItem.Text = "Controls"; //@@@: this.controlsToolStripMenuItem.Text = "Controls";
            // 
            // mnuEditAddLabel
            // 
            this.mnuEditAddLabel.Name = "mnuEditAddLabel"; //@@@: this.mnuEditAddLabel.Name = "mnuEditAddLabel";
            this.mnuEditAddLabel.Size = new System.Drawing.Size(175, 22); //@@@: this.mnuEditAddLabel.Size = new System.Drawing.Size(175, 22);
            this.mnuEditAddLabel.Text = "Add Label"; //@@@: this.mnuEditAddLabel.Text = "Add Label";
            this.mnuEditAddLabel.Click += new System.EventHandler(this.mnuEditAddLabel_Click); //@@@: this.mnuEditAddLabel.Click += new System.EventHandler(this.mnuEditAddLabel_Click);
            // 
            // mnuEditAddLine
            // 
            this.mnuEditAddLine.Name = "mnuEditAddLine"; //@@@: this.mnuEditAddLine.Name = "mnuEditAddLine";
            this.mnuEditAddLine.Size = new System.Drawing.Size(175, 22); //@@@: this.mnuEditAddLine.Size = new System.Drawing.Size(175, 22);
            this.mnuEditAddLine.Text = "Add Line"; //@@@: this.mnuEditAddLine.Text = "Add Line";
            this.mnuEditAddLine.Click += new System.EventHandler(this.mnuEditAddLine_Click); //@@@: this.mnuEditAddLine.Click += new System.EventHandler(this.mnuEditAddLine_Click);
            // 
            // mnuEditAddControl
            // 
            this.mnuEditAddControl.Name = "mnuEditAddControl"; //@@@: this.mnuEditAddControl.Name = "mnuEditAddControl";
            this.mnuEditAddControl.Size = new System.Drawing.Size(175, 22); //@@@: this.mnuEditAddControl.Size = new System.Drawing.Size(175, 22);
            this.mnuEditAddControl.Text = "Add Database Field"; //@@@: this.mnuEditAddControl.Text = "Add Database Field";
            this.mnuEditAddControl.Click += new System.EventHandler(this.mnuEditAddControl_Click); //@@@: this.mnuEditAddControl.Click += new System.EventHandler(this.mnuEditAddControl_Click);
            // 
            // mnuEditAddImage
            // 
            this.mnuEditAddImage.Name = "mnuEditAddImage"; //@@@: this.mnuEditAddImage.Name = "mnuEditAddImage";
            this.mnuEditAddImage.Size = new System.Drawing.Size(175, 22); //@@@: this.mnuEditAddImage.Size = new System.Drawing.Size(175, 22);
            this.mnuEditAddImage.Text = "Add Image"; //@@@: this.mnuEditAddImage.Text = "Add Image";
            this.mnuEditAddImage.Click += new System.EventHandler(this.mnuEditAddImage_Click); //@@@: this.mnuEditAddImage.Click += new System.EventHandler(this.mnuEditAddImage_Click);
            // 
            // mnuEditAddChart
            // 
            this.mnuEditAddChart.Name = "mnuEditAddChart"; //@@@: this.mnuEditAddChart.Name = "mnuEditAddChart";
            this.mnuEditAddChart.Size = new System.Drawing.Size(175, 22); //@@@: this.mnuEditAddChart.Size = new System.Drawing.Size(175, 22);
            this.mnuEditAddChart.Text = "Add Chart"; //@@@: this.mnuEditAddChart.Text = "Add Chart";
            this.mnuEditAddChart.Click += new System.EventHandler(this.mnuEditAddChart_Click); //@@@: this.mnuEditAddChart.Click += new System.EventHandler(this.mnuEditAddChart_Click);
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
            this.mnuEditMove.Size = new System.Drawing.Size(152, 22); //@@@: this.mnuEditMove.Size = new System.Drawing.Size(152, 22);
            this.mnuEditMove.Text = "Move"; //@@@: this.mnuEditMove.Text = "Move";
            // 
            // horizontalToolStripMenuItem
            // 
            this.horizontalToolStripMenuItem.Name = "horizontalToolStripMenuItem"; //@@@: this.horizontalToolStripMenuItem.Name = "horizontalToolStripMenuItem";
            this.horizontalToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.horizontalToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.horizontalToolStripMenuItem.Text = "Horizontal"; //@@@: this.horizontalToolStripMenuItem.Text = "Horizontal";
            this.horizontalToolStripMenuItem.Click += new System.EventHandler(this.horizontalToolStripMenuItem_Click); //@@@: this.horizontalToolStripMenuItem.Click += new System.EventHandler(this.horizontalToolStripMenuItem_Click);
            // 
            // verticalToolStripMenuItem
            // 
            this.verticalToolStripMenuItem.Name = "verticalToolStripMenuItem"; //@@@: this.verticalToolStripMenuItem.Name = "verticalToolStripMenuItem";
            this.verticalToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.verticalToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.verticalToolStripMenuItem.Text = "Vertical"; //@@@: this.verticalToolStripMenuItem.Text = "Vertical";
            this.verticalToolStripMenuItem.Click += new System.EventHandler(this.verticalToolStripMenuItem_Click); //@@@: this.verticalToolStripMenuItem.Click += new System.EventHandler(this.verticalToolStripMenuItem_Click);
            // 
            // lockToolStripMenuItem
            // 
            this.lockToolStripMenuItem.Name = "lockToolStripMenuItem"; //@@@: this.lockToolStripMenuItem.Name = "lockToolStripMenuItem";
            this.lockToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.lockToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.lockToolStripMenuItem.Text = "Lock"; //@@@: this.lockToolStripMenuItem.Text = "Lock";
            this.lockToolStripMenuItem.Click += new System.EventHandler(this.lockToolStripMenuItem_Click); //@@@: this.lockToolStripMenuItem.Click += new System.EventHandler(this.lockToolStripMenuItem_Click);
            // 
            // allDirectionsToolStripMenuItem
            // 
            this.allDirectionsToolStripMenuItem.Checked = true; //@@@: this.allDirectionsToolStripMenuItem.Checked = true;
            this.allDirectionsToolStripMenuItem.CheckState = System.Windows.Forms.CheckState.Checked; //@@@: this.allDirectionsToolStripMenuItem.CheckState = System.Windows.Forms.CheckState.Checked;
            this.allDirectionsToolStripMenuItem.Name = "allDirectionsToolStripMenuItem"; //@@@: this.allDirectionsToolStripMenuItem.Name = "allDirectionsToolStripMenuItem";
            this.allDirectionsToolStripMenuItem.Size = new System.Drawing.Size(246, 22); //@@@: this.allDirectionsToolStripMenuItem.Size = new System.Drawing.Size(246, 22);
            this.allDirectionsToolStripMenuItem.Text = "All Directions"; //@@@: this.allDirectionsToolStripMenuItem.Text = "All Directions";
            this.allDirectionsToolStripMenuItem.Click += new System.EventHandler(this.allDirectionsToolStripMenuItem_Click); //@@@: this.allDirectionsToolStripMenuItem.Click += new System.EventHandler(this.allDirectionsToolStripMenuItem_Click);
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
            this.toolStripSeparator14, //@@@: this.toolStripSeparator14,
            this.mnuViewControls, //@@@: this.mnuViewControls,
            this.mnuViewTreeViewCtrls, //@@@: this.mnuViewTreeViewCtrls,
            this.toolStripSeparator23, //@@@: this.toolStripSeparator23,
            this.mnViewGridTool}); //@@@: this.mnViewGridTool});
            this.mnView.Name = "mnView"; //@@@: this.mnView.Name = "mnView";
            this.mnView.Size = new System.Drawing.Size(44, 20); //@@@: this.mnView.Size = new System.Drawing.Size(44, 20);
            this.mnView.Text = "View"; //@@@: this.mnView.Text = "View";
            // 
            // mnuViewToolbar
            // 
            this.mnuViewToolbar.Name = "mnuViewToolbar"; //@@@: this.mnuViewToolbar.Name = "mnuViewToolbar";
            this.mnuViewToolbar.Size = new System.Drawing.Size(139, 22); //@@@: this.mnuViewToolbar.Size = new System.Drawing.Size(139, 22);
            this.mnuViewToolbar.Text = "Toolbox"; //@@@: this.mnuViewToolbar.Text = "Toolbox";
            this.mnuViewToolbar.Click += new System.EventHandler(this.mnuViewToolbar_Click); //@@@: this.mnuViewToolbar.Click += new System.EventHandler(this.mnuViewToolbar_Click);
            // 
            // toolStripSeparator14
            // 
            this.toolStripSeparator14.Name = "toolStripSeparator14"; //@@@: this.toolStripSeparator14.Name = "toolStripSeparator14";
            this.toolStripSeparator14.Size = new System.Drawing.Size(136, 6); //@@@: this.toolStripSeparator14.Size = new System.Drawing.Size(136, 6);
            // 
            // mnuViewControls
            // 
            this.mnuViewControls.Name = "mnuViewControls"; //@@@: this.mnuViewControls.Name = "mnuViewControls";
            this.mnuViewControls.Size = new System.Drawing.Size(139, 22); //@@@: this.mnuViewControls.Size = new System.Drawing.Size(139, 22);
            this.mnuViewControls.Text = "Control Grid"; //@@@: this.mnuViewControls.Text = "Control Grid";
            this.mnuViewControls.Click += new System.EventHandler(this.mnuViewControls_Click); //@@@: this.mnuViewControls.Click += new System.EventHandler(this.mnuViewControls_Click);
            // 
            // mnuViewTreeViewCtrls
            // 
            this.mnuViewTreeViewCtrls.Name = "mnuViewTreeViewCtrls"; //@@@: this.mnuViewTreeViewCtrls.Name = "mnuViewTreeViewCtrls";
            this.mnuViewTreeViewCtrls.Size = new System.Drawing.Size(139, 22); //@@@: this.mnuViewTreeViewCtrls.Size = new System.Drawing.Size(139, 22);
            this.mnuViewTreeViewCtrls.Text = "Control Tree"; //@@@: this.mnuViewTreeViewCtrls.Text = "Control Tree";
            this.mnuViewTreeViewCtrls.Click += new System.EventHandler(this.mnuViewTreeViewCtrls_Click); //@@@: this.mnuViewTreeViewCtrls.Click += new System.EventHandler(this.mnuViewTreeViewCtrls_Click);
            // 
            // toolStripSeparator23
            // 
            this.toolStripSeparator23.Name = "toolStripSeparator23"; //@@@: this.toolStripSeparator23.Name = "toolStripSeparator23";
            this.toolStripSeparator23.Size = new System.Drawing.Size(136, 6); //@@@: this.toolStripSeparator23.Size = new System.Drawing.Size(136, 6);
            // 
            // mnViewGridTool
            // 
            this.mnViewGridTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnViewGridTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuGridPoints, //@@@: this.mnuGridPoints,
            this.mnuGridLines, //@@@: this.mnuGridLines,
            this.mnuHideGrid}); //@@@: this.mnuHideGrid});
            this.mnViewGridTool.Name = "mnViewGridTool"; //@@@: this.mnViewGridTool.Name = "mnViewGridTool";
            this.mnViewGridTool.Size = new System.Drawing.Size(139, 22); //@@@: this.mnViewGridTool.Size = new System.Drawing.Size(139, 22);
            this.mnViewGridTool.Text = "View Grid"; //@@@: this.mnViewGridTool.Text = "View Grid";
            // 
            // mnuGridPoints
            // 
            this.mnuGridPoints.Name = "mnuGridPoints"; //@@@: this.mnuGridPoints.Name = "mnuGridPoints";
            this.mnuGridPoints.Size = new System.Drawing.Size(124, 22); //@@@: this.mnuGridPoints.Size = new System.Drawing.Size(124, 22);
            this.mnuGridPoints.Text = "Points"; //@@@: this.mnuGridPoints.Text = "Points";
            this.mnuGridPoints.Click += new System.EventHandler(this.mnuGridPoints_Click); //@@@: this.mnuGridPoints.Click += new System.EventHandler(this.mnuGridPoints_Click);
            // 
            // mnuGridLines
            // 
            this.mnuGridLines.Name = "mnuGridLines"; //@@@: this.mnuGridLines.Name = "mnuGridLines";
            this.mnuGridLines.Size = new System.Drawing.Size(124, 22); //@@@: this.mnuGridLines.Size = new System.Drawing.Size(124, 22);
            this.mnuGridLines.Text = "Lines"; //@@@: this.mnuGridLines.Text = "Lines";
            this.mnuGridLines.Click += new System.EventHandler(this.mnuGridLines_Click); //@@@: this.mnuGridLines.Click += new System.EventHandler(this.mnuGridLines_Click);
            // 
            // mnuHideGrid
            // 
            this.mnuHideGrid.Name = "mnuHideGrid"; //@@@: this.mnuHideGrid.Name = "mnuHideGrid";
            this.mnuHideGrid.Size = new System.Drawing.Size(124, 22); //@@@: this.mnuHideGrid.Size = new System.Drawing.Size(124, 22);
            this.mnuHideGrid.Text = "Hide Grid"; //@@@: this.mnuHideGrid.Text = "Hide Grid";
            this.mnuHideGrid.Click += new System.EventHandler(this.mnuHideGrid_Click); //@@@: this.mnuHideGrid.Click += new System.EventHandler(this.mnuHideGrid_Click);
            // 
            // mnDatabase
            // 
            this.mnDatabase.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnDatabase.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuConnectionSettings, //@@@: this.mnuConnectionSettings,
            this.mnuParametersSettings, //@@@: this.mnuParametersSettings,
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
            // mnuConnectionSettings
            // 
            this.mnuConnectionSettings.Name = "mnuConnectionSettings"; //@@@: this.mnuConnectionSettings.Name = "mnuConnectionSettings";
            this.mnuConnectionSettings.Size = new System.Drawing.Size(328, 22); //@@@: this.mnuConnectionSettings.Size = new System.Drawing.Size(328, 22);
            this.mnuConnectionSettings.Text = "Connection Settings"; //@@@: this.mnuConnectionSettings.Text = "Connection Settings";
            // 
            // mnuParametersSettings
            // 
            this.mnuParametersSettings.Name = "mnuParametersSettings"; //@@@: this.mnuParametersSettings.Name = "mnuParametersSettings";
            this.mnuParametersSettings.Size = new System.Drawing.Size(328, 22); //@@@: this.mnuParametersSettings.Size = new System.Drawing.Size(328, 22);
            this.mnuParametersSettings.Text = "Parameters Settings"; //@@@: this.mnuParametersSettings.Text = "Parameters Settings";
            this.mnuParametersSettings.Click += new System.EventHandler(this.mnuParametersSettings_Click); //@@@: this.mnuParametersSettings.Click += new System.EventHandler(this.mnuParametersSettings_Click);
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
            this.mnuDataBaseSQLServerConnection, //@@@: this.mnuDataBaseSQLServerConnection,
            this.mnuDataBaseConnectConfig, //@@@: this.mnuDataBaseConnectConfig,
            this.mnuDataBaseEditDataSource}); //@@@: this.mnuDataBaseEditDataSource});
            this.manualSettingsToolStripMenuItem.Name = "manualSettingsToolStripMenuItem"; //@@@: this.manualSettingsToolStripMenuItem.Name = "manualSettingsToolStripMenuItem";
            this.manualSettingsToolStripMenuItem.Size = new System.Drawing.Size(328, 22); //@@@: this.manualSettingsToolStripMenuItem.Size = new System.Drawing.Size(328, 22);
            this.manualSettingsToolStripMenuItem.Text = "Manual Settings"; //@@@: this.manualSettingsToolStripMenuItem.Text = "Manual Settings";
            // 
            // mnuDataBaseSQLServerConnection
            // 
            this.mnuDataBaseSQLServerConnection.Name = "mnuDataBaseSQLServerConnection"; //@@@: this.mnuDataBaseSQLServerConnection.Name = "mnuDataBaseSQLServerConnection";
            this.mnuDataBaseSQLServerConnection.Size = new System.Drawing.Size(195, 22); //@@@: this.mnuDataBaseSQLServerConnection.Size = new System.Drawing.Size(195, 22);
            this.mnuDataBaseSQLServerConnection.Text = "SQL Server Connection"; //@@@: this.mnuDataBaseSQLServerConnection.Text = "SQL Server Connection";
            this.mnuDataBaseSQLServerConnection.Click += new System.EventHandler(this.mnuDataBaseSQLServerConnection_Click); //@@@: this.mnuDataBaseSQLServerConnection.Click += new System.EventHandler(this.mnuDataBaseSQLServerConnection_Click);
            // 
            // mnuDataBaseConnectConfig
            // 
            this.mnuDataBaseConnectConfig.Name = "mnuDataBaseConnectConfig"; //@@@: this.mnuDataBaseConnectConfig.Name = "mnuDataBaseConnectConfig";
            this.mnuDataBaseConnectConfig.Size = new System.Drawing.Size(195, 22); //@@@: this.mnuDataBaseConnectConfig.Size = new System.Drawing.Size(195, 22);
            this.mnuDataBaseConnectConfig.Text = "Connection String"; //@@@: this.mnuDataBaseConnectConfig.Text = "Connection String";
            this.mnuDataBaseConnectConfig.Click += new System.EventHandler(this.mnuDataBaseConnectConfig_Click); //@@@: this.mnuDataBaseConnectConfig.Click += new System.EventHandler(this.mnuDataBaseConnectConfig_Click);
            // 
            // mnuDataBaseEditDataSource
            // 
            this.mnuDataBaseEditDataSource.Name = "mnuDataBaseEditDataSource"; //@@@: this.mnuDataBaseEditDataSource.Name = "mnuDataBaseEditDataSource";
            this.mnuDataBaseEditDataSource.Size = new System.Drawing.Size(195, 22); //@@@: this.mnuDataBaseEditDataSource.Size = new System.Drawing.Size(195, 22);
            this.mnuDataBaseEditDataSource.Text = "Data Source"; //@@@: this.mnuDataBaseEditDataSource.Text = "Data Source";
            this.mnuDataBaseEditDataSource.Click += new System.EventHandler(this.mnuDataBaseEditDataSource_Click); //@@@: this.mnuDataBaseEditDataSource.Click += new System.EventHandler(this.mnuDataBaseEditDataSource_Click);
            // 
            // mnuDataBaseSetToMainConnect
            // 
            this.mnuDataBaseSetToMainConnect.Name = "mnuDataBaseSetToMainConnect"; //@@@: this.mnuDataBaseSetToMainConnect.Name = "mnuDataBaseSetToMainConnect";
            this.mnuDataBaseSetToMainConnect.Size = new System.Drawing.Size(328, 22); //@@@: this.mnuDataBaseSetToMainConnect.Size = new System.Drawing.Size(328, 22);
            this.mnuDataBaseSetToMainConnect.Text = "Apply Main Connection to Addional Conections"; //@@@: this.mnuDataBaseSetToMainConnect.Text = "Apply Main Connection to Addional Conections";
            this.mnuDataBaseSetToMainConnect.Click += new System.EventHandler(this.mnuDataBaseSetToMainConnect_Click); //@@@: this.mnuDataBaseSetToMainConnect.Click += new System.EventHandler(this.mnuDataBaseSetToMainConnect_Click);
            // 
            // mnTool
            // 
            this.mnTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnTool.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuOptionsTool}); //@@@: this.mnuOptionsTool});
            this.mnTool.Name = "mnTool"; //@@@: this.mnTool.Name = "mnTool";
            this.mnTool.Size = new System.Drawing.Size(47, 20); //@@@: this.mnTool.Size = new System.Drawing.Size(47, 20);
            this.mnTool.Text = "Tools"; //@@@: this.mnTool.Text = "Tools";
            // 
            // mnuOptionsTool
            // 
            this.mnuOptionsTool.Name = "mnuOptionsTool"; //@@@: this.mnuOptionsTool.Name = "mnuOptionsTool";
            this.mnuOptionsTool.Size = new System.Drawing.Size(116, 22); //@@@: this.mnuOptionsTool.Size = new System.Drawing.Size(116, 22);
            this.mnuOptionsTool.Text = "Options"; //@@@: this.mnuOptionsTool.Text = "Options";
            this.mnuOptionsTool.Click += new System.EventHandler(this.mnuOptionsTool_Click); //@@@: this.mnuOptionsTool.Click += new System.EventHandler(this.mnuOptionsTool_Click);
            // 
            // mnHelp
            // 
            this.mnHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.mnHelp.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.mnuHelpAbout}); //@@@: this.mnuHelpAbout});
            this.mnHelp.Name = "mnHelp"; //@@@: this.mnHelp.Name = "mnHelp";
            this.mnHelp.Size = new System.Drawing.Size(44, 20); //@@@: this.mnHelp.Size = new System.Drawing.Size(44, 20);
            this.mnHelp.Text = "Help"; //@@@: this.mnHelp.Text = "Help";
            // 
            // mnuHelpAbout
            // 
            this.mnuHelpAbout.Name = "mnuHelpAbout"; //@@@: this.mnuHelpAbout.Name = "mnuHelpAbout";
            this.mnuHelpAbout.Size = new System.Drawing.Size(107, 22); //@@@: this.mnuHelpAbout.Size = new System.Drawing.Size(107, 22);
            this.mnuHelpAbout.Text = "About"; //@@@: this.mnuHelpAbout.Text = "About";
            this.mnuHelpAbout.Click += new System.EventHandler(this.mnuHelpAbout_Click); //@@@: this.mnuHelpAbout.Click += new System.EventHandler(this.mnuHelpAbout_Click);
            // 
            // tbMain
            // 
            this.tbMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.tbMain.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.tsbNew, //@@@: this.tsbNew,
            this.tsbOpen, //@@@: this.tsbOpen,
            this.tsbSave, //@@@: this.tsbSave,
            this.tsbSaveAs, //@@@: this.tsbSaveAs,
            this.toolStripSeparator1, //@@@: this.toolStripSeparator1,
            this.tsbDatabase, //@@@: this.tsbDatabase,
            this.toolStripSeparator2, //@@@: this.toolStripSeparator2,
            this.tsbPreview, //@@@: this.tsbPreview,
            this.tsbPrint, //@@@: this.tsbPrint,
            this.toolStripSeparator3, //@@@: this.toolStripSeparator3,
            this.tsbProperties, //@@@: this.tsbProperties,
            this.tsbControls, //@@@: this.tsbControls,
            this.toolStripSeparator4, //@@@: this.toolStripSeparator4,
            this.tsbAlignLeft, //@@@: this.tsbAlignLeft,
            this.tsbAligntCenter, //@@@: this.tsbAligntCenter,
            this.tsbAlignRight, //@@@: this.tsbAlignRight,
            this.toolStripSeparator5, //@@@: this.toolStripSeparator5,
            this.tsbBold, //@@@: this.tsbBold,
            this.toolStripSeparator6, //@@@: this.toolStripSeparator6,
            this.tsbSearch, //@@@: this.tsbSearch,
            this.toolStripSeparator24, //@@@: this.toolStripSeparator24,
            this.tsbCtrlAlignLeft, //@@@: this.tsbCtrlAlignLeft,
            this.tsbCtrlAlignRight, //@@@: this.tsbCtrlAlignRight,
            this.tsbCtrlAlignTop, //@@@: this.tsbCtrlAlignTop,
            this.tsbCtrlAlignBottom, //@@@: this.tsbCtrlAlignBottom,
            this.tsbCtrlSameHeight, //@@@: this.tsbCtrlSameHeight,
            this.tsbCtrlSameWidth, //@@@: this.tsbCtrlSameWidth,
            this.tsbCtrlSameLeft, //@@@: this.tsbCtrlSameLeft,
            this.tsbCtrlSameTop}); //@@@: this.tsbCtrlSameTop});
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
            this.tsbNew.Text = "New report"; //@@@: this.tsbNew.Text = "New report";
            this.tsbNew.Click += new System.EventHandler(this.tsbNew_Click); //@@@: this.tsbNew.Click += new System.EventHandler(this.tsbNew_Click);
            // 
            // tsbOpen
            // 
            this.tsbOpen.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbOpen.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbOpen.Image = global::CSReportEditor.Properties.Resources.folder_page; //@@@: this.tsbOpen.Image = global::CSReportEditor.Properties.Resources.folder_page;
            this.tsbOpen.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbOpen.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbOpen.Name = "tsbOpen"; //@@@: this.tsbOpen.Name = "tsbOpen";
            this.tsbOpen.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbOpen.Size = new System.Drawing.Size(23, 22);
            this.tsbOpen.Text = "Open a report"; //@@@: this.tsbOpen.Text = "Open a report";
            this.tsbOpen.Click += new System.EventHandler(this.tsbOpen_Click); //@@@: this.tsbOpen.Click += new System.EventHandler(this.tsbOpen_Click);
            // 
            // tsbSave
            // 
            this.tsbSave.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbSave.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbSave.Image = global::CSReportEditor.Properties.Resources.disk; //@@@: this.tsbSave.Image = global::CSReportEditor.Properties.Resources.disk;
            this.tsbSave.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbSave.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbSave.Name = "tsbSave"; //@@@: this.tsbSave.Name = "tsbSave";
            this.tsbSave.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbSave.Size = new System.Drawing.Size(23, 22);
            this.tsbSave.Text = "Save"; //@@@: this.tsbSave.Text = "Save";
            this.tsbSave.Click += new System.EventHandler(this.tsbSave_Click); //@@@: this.tsbSave.Click += new System.EventHandler(this.tsbSave_Click);
            // 
            // tsbSaveAs
            // 
            this.tsbSaveAs.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbSaveAs.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbSaveAs.Image = global::CSReportEditor.Properties.Resources.disk_multiple; //@@@: this.tsbSaveAs.Image = global::CSReportEditor.Properties.Resources.disk_multiple;
            this.tsbSaveAs.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbSaveAs.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbSaveAs.Name = "tsbSaveAs"; //@@@: this.tsbSaveAs.Name = "tsbSaveAs";
            this.tsbSaveAs.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbSaveAs.Size = new System.Drawing.Size(23, 22);
            this.tsbSaveAs.Text = "Save as"; //@@@: this.tsbSaveAs.Text = "Save as";
            this.tsbSaveAs.Click += new System.EventHandler(this.tsbSaveAs_Click); //@@@: this.tsbSaveAs.Click += new System.EventHandler(this.tsbSaveAs_Click);
            // 
            // toolStripSeparator1
            // 
            this.toolStripSeparator1.Name = "toolStripSeparator1"; //@@@: this.toolStripSeparator1.Name = "toolStripSeparator1";
            this.toolStripSeparator1.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator1.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbDatabase
            // 
            this.tsbDatabase.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbDatabase.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbDatabase.Image = global::CSReportEditor.Properties.Resources.database_gear; //@@@: this.tsbDatabase.Image = global::CSReportEditor.Properties.Resources.database_gear;
            this.tsbDatabase.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbDatabase.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbDatabase.Name = "tsbDatabase"; //@@@: this.tsbDatabase.Name = "tsbDatabase";
            this.tsbDatabase.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbDatabase.Size = new System.Drawing.Size(23, 22);
            this.tsbDatabase.Text = "Edit connection settings"; //@@@: this.tsbDatabase.Text = "Edit connection settings";
            this.tsbDatabase.Click += new System.EventHandler(this.tsbDatabase_Click); //@@@: this.tsbDatabase.Click += new System.EventHandler(this.tsbDatabase_Click);
            // 
            // toolStripSeparator2
            // 
            this.toolStripSeparator2.Name = "toolStripSeparator2"; //@@@: this.toolStripSeparator2.Name = "toolStripSeparator2";
            this.toolStripSeparator2.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator2.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbPreview
            // 
            this.tsbPreview.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbPreview.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPreview.Image = global::CSReportEditor.Properties.Resources.lightning; //@@@: this.tsbPreview.Image = global::CSReportEditor.Properties.Resources.lightning;
            this.tsbPreview.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbPreview.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPreview.Name = "tsbPreview"; //@@@: this.tsbPreview.Name = "tsbPreview";
            this.tsbPreview.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbPreview.Size = new System.Drawing.Size(23, 22);
            this.tsbPreview.Text = "Execute this report"; //@@@: this.tsbPreview.Text = "Execute this report";
            this.tsbPreview.Click += new System.EventHandler(this.tsbPreview_Click); //@@@: this.tsbPreview.Click += new System.EventHandler(this.tsbPreview_Click);
            // 
            // tsbPrint
            // 
            this.tsbPrint.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbPrint.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbPrint.Image = global::CSReportEditor.Properties.Resources.printer; //@@@: this.tsbPrint.Image = global::CSReportEditor.Properties.Resources.printer;
            this.tsbPrint.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbPrint.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbPrint.Name = "tsbPrint"; //@@@: this.tsbPrint.Name = "tsbPrint";
            this.tsbPrint.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbPrint.Size = new System.Drawing.Size(23, 22);
            this.tsbPrint.Text = "Print"; //@@@: this.tsbPrint.Text = "Print";
            this.tsbPrint.Click += new System.EventHandler(this.tsbPrint_Click); //@@@: this.tsbPrint.Click += new System.EventHandler(this.tsbPrint_Click);
            // 
            // toolStripSeparator3
            // 
            this.toolStripSeparator3.Name = "toolStripSeparator3"; //@@@: this.toolStripSeparator3.Name = "toolStripSeparator3";
            this.toolStripSeparator3.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator3.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbProperties
            // 
            this.tsbProperties.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbProperties.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbProperties.Image = global::CSReportEditor.Properties.Resources.application_side_boxes; //@@@: this.tsbProperties.Image = global::CSReportEditor.Properties.Resources.application_side_boxes;
            this.tsbProperties.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbProperties.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbProperties.Name = "tsbProperties"; //@@@: this.tsbProperties.Name = "tsbProperties";
            this.tsbProperties.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbProperties.Size = new System.Drawing.Size(23, 22);
            this.tsbProperties.Text = "Edit properties"; //@@@: this.tsbProperties.Text = "Edit properties";
            this.tsbProperties.Click += new System.EventHandler(this.tsbProperties_Click); //@@@: this.tsbProperties.Click += new System.EventHandler(this.tsbProperties_Click);
            // 
            // tsbControls
            // 
            this.tsbControls.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbControls.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbControls.Image = global::CSReportEditor.Properties.Resources.wrench; //@@@: this.tsbControls.Image = global::CSReportEditor.Properties.Resources.wrench;
            this.tsbControls.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbControls.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbControls.Name = "tsbControls"; //@@@: this.tsbControls.Name = "tsbControls";
            this.tsbControls.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbControls.Size = new System.Drawing.Size(23, 22);
            this.tsbControls.Text = "Show toolbox"; //@@@: this.tsbControls.Text = "Show toolbox";
            this.tsbControls.Click += new System.EventHandler(this.tsbControls_Click); //@@@: this.tsbControls.Click += new System.EventHandler(this.tsbControls_Click);
            // 
            // toolStripSeparator4
            // 
            this.toolStripSeparator4.Name = "toolStripSeparator4"; //@@@: this.toolStripSeparator4.Name = "toolStripSeparator4";
            this.toolStripSeparator4.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator4.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbAlignLeft
            // 
            this.tsbAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbAlignLeft.Image = global::CSReportEditor.Properties.Resources.text_align_left; //@@@: this.tsbAlignLeft.Image = global::CSReportEditor.Properties.Resources.text_align_left;
            this.tsbAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbAlignLeft.Name = "tsbAlignLeft"; //@@@: this.tsbAlignLeft.Name = "tsbAlignLeft";
            this.tsbAlignLeft.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbAlignLeft.Size = new System.Drawing.Size(23, 22);
            this.tsbAlignLeft.Text = "Align left"; //@@@: this.tsbAlignLeft.Text = "Align left";
            this.tsbAlignLeft.Click += new System.EventHandler(this.tsbAlignLeft_Click); //@@@: this.tsbAlignLeft.Click += new System.EventHandler(this.tsbAlignLeft_Click);
            // 
            // tsbAligntCenter
            // 
            this.tsbAligntCenter.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbAligntCenter.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbAligntCenter.Image = global::CSReportEditor.Properties.Resources.text_align_center; //@@@: this.tsbAligntCenter.Image = global::CSReportEditor.Properties.Resources.text_align_center;
            this.tsbAligntCenter.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbAligntCenter.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbAligntCenter.Name = "tsbAligntCenter"; //@@@: this.tsbAligntCenter.Name = "tsbAligntCenter";
            this.tsbAligntCenter.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbAligntCenter.Size = new System.Drawing.Size(23, 22);
            this.tsbAligntCenter.Text = "Center"; //@@@: this.tsbAligntCenter.Text = "Center";
            this.tsbAligntCenter.Click += new System.EventHandler(this.tsbAligntCenter_Click); //@@@: this.tsbAligntCenter.Click += new System.EventHandler(this.tsbAligntCenter_Click);
            // 
            // tsbAlignRight
            // 
            this.tsbAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbAlignRight.Image = global::CSReportEditor.Properties.Resources.text_align_right; //@@@: this.tsbAlignRight.Image = global::CSReportEditor.Properties.Resources.text_align_right;
            this.tsbAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbAlignRight.Name = "tsbAlignRight"; //@@@: this.tsbAlignRight.Name = "tsbAlignRight";
            this.tsbAlignRight.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbAlignRight.Size = new System.Drawing.Size(23, 22);
            this.tsbAlignRight.Text = "Align right"; //@@@: this.tsbAlignRight.Text = "Align right";
            this.tsbAlignRight.Click += new System.EventHandler(this.tsbAlignRight_Click); //@@@: this.tsbAlignRight.Click += new System.EventHandler(this.tsbAlignRight_Click);
            // 
            // toolStripSeparator5
            // 
            this.toolStripSeparator5.Name = "toolStripSeparator5"; //@@@: this.toolStripSeparator5.Name = "toolStripSeparator5";
            this.toolStripSeparator5.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator5.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbBold
            // 
            this.tsbBold.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbBold.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbBold.Image = global::CSReportEditor.Properties.Resources.text_bold; //@@@: this.tsbBold.Image = global::CSReportEditor.Properties.Resources.text_bold;
            this.tsbBold.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbBold.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbBold.Name = "tsbBold"; //@@@: this.tsbBold.Name = "tsbBold";
            this.tsbBold.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbBold.Size = new System.Drawing.Size(23, 22);
            this.tsbBold.Text = "Bold"; //@@@: this.tsbBold.Text = "Bold";
            this.tsbBold.Click += new System.EventHandler(this.tsbBold_Click); //@@@: this.tsbBold.Click += new System.EventHandler(this.tsbBold_Click);
            // 
            // toolStripSeparator6
            // 
            this.toolStripSeparator6.Name = "toolStripSeparator6"; //@@@: this.toolStripSeparator6.Name = "toolStripSeparator6";
            this.toolStripSeparator6.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator6.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbSearch
            // 
            this.tsbSearch.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbSearch.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbSearch.Image = global::CSReportEditor.Properties.Resources.find; //@@@: this.tsbSearch.Image = global::CSReportEditor.Properties.Resources.find;
            this.tsbSearch.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbSearch.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbSearch.Name = "tsbSearch"; //@@@: this.tsbSearch.Name = "tsbSearch";
            this.tsbSearch.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbSearch.Size = new System.Drawing.Size(23, 22);
            this.tsbSearch.Text = "Search a text in this report"; //@@@: this.tsbSearch.Text = "Search a text in this report";
            this.tsbSearch.Click += new System.EventHandler(this.tsbSearch_Click); //@@@: this.tsbSearch.Click += new System.EventHandler(this.tsbSearch_Click);
            // 
            // toolStripSeparator24
            // 
            this.toolStripSeparator24.Name = "toolStripSeparator24"; //@@@: this.toolStripSeparator24.Name = "toolStripSeparator24";
            this.toolStripSeparator24.Size = new System.Drawing.Size(6, 25); //@@@: this.toolStripSeparator24.Size = new System.Drawing.Size(6, 25);
            // 
            // tsbCtrlAlignLeft
            // 
            this.tsbCtrlAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlAlignLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignLeft.Image = ((resources.GetObject("tsbCtrlAlignLeft.Image"))); //@@@: this.tsbCtrlAlignLeft.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlAlignLeft.Image")));
            this.tsbCtrlAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlAlignLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignLeft.Name = "tsbCtrlAlignLeft"; //@@@: this.tsbCtrlAlignLeft.Name = "tsbCtrlAlignLeft";
            this.tsbCtrlAlignLeft.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlAlignLeft.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlAlignLeft.Text = "toolStripButton1"; //@@@: this.tsbCtrlAlignLeft.Text = "toolStripButton1";
            this.tsbCtrlAlignLeft.Click += new System.EventHandler(this.tsbCtrlAlignLeft_Click); //@@@: this.tsbCtrlAlignLeft.Click += new System.EventHandler(this.tsbCtrlAlignLeft_Click);
            // 
            // tsbCtrlAlignRight
            // 
            this.tsbCtrlAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlAlignRight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignRight.Image = ((resources.GetObject("tsbCtrlAlignRight.Image"))); //@@@: this.tsbCtrlAlignRight.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlAlignRight.Image")));
            this.tsbCtrlAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlAlignRight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignRight.Name = "tsbCtrlAlignRight"; //@@@: this.tsbCtrlAlignRight.Name = "tsbCtrlAlignRight";
            this.tsbCtrlAlignRight.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlAlignRight.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlAlignRight.Text = "toolStripButton2"; //@@@: this.tsbCtrlAlignRight.Text = "toolStripButton2";
            this.tsbCtrlAlignRight.Click += new System.EventHandler(this.tsbCtrlAlignRight_Click); //@@@: this.tsbCtrlAlignRight.Click += new System.EventHandler(this.tsbCtrlAlignRight_Click);
            // 
            // tsbCtrlAlignTop
            // 
            this.tsbCtrlAlignTop.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlAlignTop.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignTop.Image = ((resources.GetObject("tsbCtrlAlignTop.Image"))); //@@@: this.tsbCtrlAlignTop.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlAlignTop.Image")));
            this.tsbCtrlAlignTop.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlAlignTop.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignTop.Name = "tsbCtrlAlignTop"; //@@@: this.tsbCtrlAlignTop.Name = "tsbCtrlAlignTop";
            this.tsbCtrlAlignTop.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlAlignTop.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlAlignTop.Text = "toolStripButton3"; //@@@: this.tsbCtrlAlignTop.Text = "toolStripButton3";
            this.tsbCtrlAlignTop.Click += new System.EventHandler(this.tsbCtrlAlignTop_Click); //@@@: this.tsbCtrlAlignTop.Click += new System.EventHandler(this.tsbCtrlAlignTop_Click);
            // 
            // tsbCtrlAlignBottom
            // 
            this.tsbCtrlAlignBottom.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlAlignBottom.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlAlignBottom.Image = ((resources.GetObject("tsbCtrlAlignBottom.Image"))); //@@@: this.tsbCtrlAlignBottom.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlAlignBottom.Image")));
            this.tsbCtrlAlignBottom.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlAlignBottom.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlAlignBottom.Name = "tsbCtrlAlignBottom"; //@@@: this.tsbCtrlAlignBottom.Name = "tsbCtrlAlignBottom";
            this.tsbCtrlAlignBottom.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlAlignBottom.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlAlignBottom.Text = "toolStripButton4"; //@@@: this.tsbCtrlAlignBottom.Text = "toolStripButton4";
            this.tsbCtrlAlignBottom.Click += new System.EventHandler(this.tsbCtrlAlignBottom_Click); //@@@: this.tsbCtrlAlignBottom.Click += new System.EventHandler(this.tsbCtrlAlignBottom_Click);
            // 
            // tsbCtrlSameHeight
            // 
            this.tsbCtrlSameHeight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlSameHeight.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameHeight.Image = ((resources.GetObject("tsbCtrlSameHeight.Image"))); //@@@: this.tsbCtrlSameHeight.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlSameHeight.Image")));
            this.tsbCtrlSameHeight.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlSameHeight.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameHeight.Name = "tsbCtrlSameHeight"; //@@@: this.tsbCtrlSameHeight.Name = "tsbCtrlSameHeight";
            this.tsbCtrlSameHeight.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlSameHeight.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlSameHeight.Text = "toolStripButton1"; //@@@: this.tsbCtrlSameHeight.Text = "toolStripButton1";
            this.tsbCtrlSameHeight.Click += new System.EventHandler(this.tsbCtrlSameHeight_Click); //@@@: this.tsbCtrlSameHeight.Click += new System.EventHandler(this.tsbCtrlSameHeight_Click);
            // 
            // tsbCtrlSameWidth
            // 
            this.tsbCtrlSameWidth.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlSameWidth.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameWidth.Image = ((resources.GetObject("tsbCtrlSameWidth.Image"))); //@@@: this.tsbCtrlSameWidth.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlSameWidth.Image")));
            this.tsbCtrlSameWidth.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlSameWidth.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameWidth.Name = "tsbCtrlSameWidth"; //@@@: this.tsbCtrlSameWidth.Name = "tsbCtrlSameWidth";
            this.tsbCtrlSameWidth.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlSameWidth.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlSameWidth.Text = "toolStripButton2"; //@@@: this.tsbCtrlSameWidth.Text = "toolStripButton2";
            this.tsbCtrlSameWidth.Click += new System.EventHandler(this.tsbCtrlSameWidth_Click); //@@@: this.tsbCtrlSameWidth.Click += new System.EventHandler(this.tsbCtrlSameWidth_Click);
            // 
            // tsbCtrlSameLeft
            // 
            this.tsbCtrlSameLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlSameLeft.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameLeft.Image = ((resources.GetObject("tsbCtrlSameLeft.Image"))); //@@@: this.tsbCtrlSameLeft.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlSameLeft.Image")));
            this.tsbCtrlSameLeft.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlSameLeft.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameLeft.Name = "tsbCtrlSameLeft"; //@@@: this.tsbCtrlSameLeft.Name = "tsbCtrlSameLeft";
            this.tsbCtrlSameLeft.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlSameLeft.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlSameLeft.Text = "toolStripButton3"; //@@@: this.tsbCtrlSameLeft.Text = "toolStripButton3";
            this.tsbCtrlSameLeft.Click += new System.EventHandler(this.tsbCtrlSameLeft_Click); //@@@: this.tsbCtrlSameLeft.Click += new System.EventHandler(this.tsbCtrlSameLeft_Click);
            // 
            // tsbCtrlSameTop
            // 
            this.tsbCtrlSameTop.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image; //@@@: this.tsbCtrlSameTop.DisplayStyle = System.Windows.Forms.ToolStripItemDisplayStyle.Image;
            this.tsbCtrlSameTop.Image = ((resources.GetObject("tsbCtrlSameTop.Image"))); //@@@: this.tsbCtrlSameTop.Image = ((System.Drawing.Image)(resources.GetObject("tsbCtrlSameTop.Image")));
            this.tsbCtrlSameTop.ImageTransparentColor = System.Drawing.Color.Magenta; //@@@: this.tsbCtrlSameTop.ImageTransparentColor = System.Drawing.Color.Magenta;
            this.tsbCtrlSameTop.Name = "tsbCtrlSameTop"; //@@@: this.tsbCtrlSameTop.Name = "tsbCtrlSameTop";
            this.tsbCtrlSameTop.Size = new System.Drawing.Size(23, 22); //@@@: this.tsbCtrlSameTop.Size = new System.Drawing.Size(23, 22);
            this.tsbCtrlSameTop.Text = "toolStripButton4"; //@@@: this.tsbCtrlSameTop.Text = "toolStripButton4";
            this.tsbCtrlSameTop.Click += new System.EventHandler(this.tsbCtrlSameTop_Click); //@@@: this.tsbCtrlSameTop.Click += new System.EventHandler(this.tsbCtrlSameTop_Click);
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
            this.splitContainer1.FixedPanel = System.Windows.Forms.FixedPanel.Panel1; //@@@: this.splitContainer1.FixedPanel = System.Windows.Forms.FixedPanel.Panel1;
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
            this.panel1.Controls.Add(this.tab_sidebar); //@@@: this.panel1.Controls.Add(this.tab_sidebar);
            this.panel1.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.panel1.Dock = System.Windows.Forms.DockStyle.Fill;
            this.panel1.Location = new System.Drawing.Point(0, 0); //@@@: this.panel1.Location = new System.Drawing.Point(0, 0);
            this.panel1.Name = "panel1"; //@@@: this.panel1.Name = "panel1";
            this.panel1.Size = new System.Drawing.Size(226, 261); //@@@: this.panel1.Size = new System.Drawing.Size(226, 261);
            this.panel1.TabIndex = 0; //@@@: this.panel1.TabIndex = 0;
            // 
            // tab_sidebar
            // 
            this.tab_sidebar.Controls.Add(this.tabPage5); //@@@: this.tab_sidebar.Controls.Add(this.tabPage5);
            this.tab_sidebar.Controls.Add(this.tabPage3); //@@@: this.tab_sidebar.Controls.Add(this.tabPage3);
            this.tab_sidebar.Controls.Add(this.tabPage4); //@@@: this.tab_sidebar.Controls.Add(this.tabPage4);
            this.tab_sidebar.Controls.Add(this.tabPage1); //@@@: this.tab_sidebar.Controls.Add(this.tabPage1);
            this.tab_sidebar.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.tab_sidebar.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tab_sidebar.Location = new System.Drawing.Point(0, 0); //@@@: this.tab_sidebar.Location = new System.Drawing.Point(0, 0);
            this.tab_sidebar.Name = "tab_sidebar"; //@@@: this.tab_sidebar.Name = "tab_sidebar";
            this.tab_sidebar.SelectedIndex = 0; //@@@: this.tab_sidebar.SelectedIndex = 0;
            this.tab_sidebar.Size = new System.Drawing.Size(226, 261); //@@@: this.tab_sidebar.Size = new System.Drawing.Size(226, 261);
            this.tab_sidebar.TabIndex = 0; //@@@: this.tab_sidebar.TabIndex = 0;
            // 
            // tabPage5
            // 
            this.tabPage5.Controls.Add(this.tv_controls); //@@@: this.tabPage5.Controls.Add(this.tv_controls);
            this.tabPage5.Location = new System.Drawing.Point(4, 22); //@@@: this.tabPage5.Location = new System.Drawing.Point(4, 22);
            this.tabPage5.Name = "tabPage5"; //@@@: this.tabPage5.Name = "tabPage5";
            this.tabPage5.Size = new System.Drawing.Size(218, 235); //@@@: this.tabPage5.Size = new System.Drawing.Size(218, 235);
            this.tabPage5.TabIndex = 2; //@@@: this.tabPage5.TabIndex = 2;
            this.tabPage5.Text = "Report"; //@@@: this.tabPage5.Text = "Report";
            this.tabPage5.UseVisualStyleBackColor = true; //@@@: this.tabPage5.UseVisualStyleBackColor = true;
            // 
            // tv_controls
            // 
            this.tv_controls.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.tv_controls.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tv_controls.ImageIndex = 0; //@@@: this.tv_controls.ImageIndex = 0;
            this.tv_controls.ImageList = this.imageListTree; //@@@: this.tv_controls.ImageList = this.imageListTree;
            this.tv_controls.Location = new System.Drawing.Point(0, 0); //@@@: this.tv_controls.Location = new System.Drawing.Point(0, 0);
            this.tv_controls.Name = "tv_controls"; //@@@: this.tv_controls.Name = "tv_controls";
            this.tv_controls.SelectedImageIndex = 0; //@@@: this.tv_controls.SelectedImageIndex = 0;
            this.tv_controls.Size = new System.Drawing.Size(218, 235); //@@@: this.tv_controls.Size = new System.Drawing.Size(218, 235);
            this.tv_controls.TabIndex = 0; //@@@: this.tv_controls.TabIndex = 0;
            this.tv_controls.BeforeCollapse += new System.Windows.Forms.TreeViewCancelEventHandler(this.tv_controls_BeforeCollapse); //@@@: this.tv_controls.BeforeCollapse += new System.Windows.Forms.TreeViewCancelEventHandler(this.tv_controls_BeforeCollapse);
            this.tv_controls.BeforeExpand += new System.Windows.Forms.TreeViewCancelEventHandler(this.tv_controls_BeforeExpand); //@@@: this.tv_controls.BeforeExpand += new System.Windows.Forms.TreeViewCancelEventHandler(this.tv_controls_BeforeExpand);
            this.tv_controls.NodeMouseClick += new System.Windows.Forms.TreeNodeMouseClickEventHandler(this.tv_controls_NodeMouseClick); //@@@: this.tv_controls.NodeMouseClick += new System.Windows.Forms.TreeNodeMouseClickEventHandler(this.tv_controls_NodeMouseClick);
            this.tv_controls.KeyUp += new System.Windows.Forms.KeyEventHandler(this.tv_controls_KeyUp); //@@@: this.tv_controls.KeyUp += new System.Windows.Forms.KeyEventHandler(this.tv_controls_KeyUp);
            this.tv_controls.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.tv_controls_MouseDoubleClick); //@@@: this.tv_controls.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.tv_controls_MouseDoubleClick);
            this.tv_controls.MouseDown += new System.Windows.Forms.MouseEventHandler(this.tv_controls_MouseDown); //@@@: this.tv_controls.MouseDown += new System.Windows.Forms.MouseEventHandler(this.tv_controls_MouseDown);
            // 
            // imageListTree
            // 
            this.imageListTree.ImageStream = ((resources.GetObject("imageListTree.ImageStream"))); //@@@: this.imageListTree.ImageStream = ((System.Windows.Forms.ImageListStreamer)(resources.GetObject("imageListTree.ImageStream")));
            this.imageListTree.TransparentColor = System.Drawing.Color.Transparent; //@@@: this.imageListTree.TransparentColor = System.Drawing.Color.Transparent;
            this.imageListTree.Images.SetKeyName(0, "xtratabcontrol.gif"); //@@@: this.imageListTree.Images.SetKeyName(0, "xtratabcontrol.gif");
            this.imageListTree.Images.SetKeyName(1, "base002.ico"); //@@@: this.imageListTree.Images.SetKeyName(1, "base002.ico");
            this.imageListTree.Images.SetKeyName(2, "property.ico"); //@@@: this.imageListTree.Images.SetKeyName(2, "property.ico");
            this.imageListTree.Images.SetKeyName(3, "aspxroundpanel.gif"); //@@@: this.imageListTree.Images.SetKeyName(3, "aspxroundpanel.gif");
            // 
            // tabPage3
            // 
            this.tabPage3.Controls.Add(this.lv_controls); //@@@: this.tabPage3.Controls.Add(this.lv_controls);
            this.tabPage3.Location = new System.Drawing.Point(4, 22); //@@@: this.tabPage3.Location = new System.Drawing.Point(4, 22);
            this.tabPage3.Name = "tabPage3"; //@@@: this.tabPage3.Name = "tabPage3";
            this.tabPage3.Padding = new System.Windows.Forms.Padding(3); //@@@: this.tabPage3.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage3.Size = new System.Drawing.Size(218, 235); //@@@: this.tabPage3.Size = new System.Drawing.Size(218, 235);
            this.tabPage3.TabIndex = 0; //@@@: this.tabPage3.TabIndex = 0;
            this.tabPage3.Text = "Controls"; //@@@: this.tabPage3.Text = "Controls";
            this.tabPage3.UseVisualStyleBackColor = true; //@@@: this.tabPage3.UseVisualStyleBackColor = true;
            // 
            // lv_controls
            // 
            this.lv_controls.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] { //@@@: this.lv_controls.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1}); //@@@: this.columnHeader1});
            this.lv_controls.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.lv_controls.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_controls.FullRowSelect = true; //@@@: this.lv_controls.FullRowSelect = true;
            this.lv_controls.Location = new System.Drawing.Point(3, 3); //@@@: this.lv_controls.Location = new System.Drawing.Point(3, 3);
            this.lv_controls.Name = "lv_controls"; //@@@: this.lv_controls.Name = "lv_controls";
            this.lv_controls.Size = new System.Drawing.Size(212, 229); //@@@: this.lv_controls.Size = new System.Drawing.Size(212, 229);
            this.lv_controls.SmallImageList = this.imageList; //@@@: this.lv_controls.SmallImageList = this.imageList;
            this.lv_controls.TabIndex = 0; //@@@: this.lv_controls.TabIndex = 0;
            this.lv_controls.UseCompatibleStateImageBehavior = false; //@@@: this.lv_controls.UseCompatibleStateImageBehavior = false;
            this.lv_controls.View = System.Windows.Forms.View.Details; //@@@: this.lv_controls.View = System.Windows.Forms.View.Details;
            this.lv_controls.ColumnClick += new System.Windows.Forms.ColumnClickEventHandler(this.lv_controls_ColumnClick); //@@@: this.lv_controls.ColumnClick += new System.Windows.Forms.ColumnClickEventHandler(this.lv_controls_ColumnClick);
            this.lv_controls.KeyUp += new System.Windows.Forms.KeyEventHandler(this.lv_controls_KeyUp); //@@@: this.lv_controls.KeyUp += new System.Windows.Forms.KeyEventHandler(this.lv_controls_KeyUp);
            this.lv_controls.MouseClick += new System.Windows.Forms.MouseEventHandler(this.lv_controls_MouseClick); //@@@: this.lv_controls.MouseClick += new System.Windows.Forms.MouseEventHandler(this.lv_controls_MouseClick);
            this.lv_controls.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.lv_controls_MouseDoubleClick); //@@@: this.lv_controls.MouseDoubleClick += new System.Windows.Forms.MouseEventHandler(this.lv_controls_MouseDoubleClick);
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "Name"; //@@@: this.columnHeader1.Text = "Name";
            this.columnHeader1.Width = 170; //@@@: this.columnHeader1.Width = 170;
            // 
            // imageList
            // 
            this.imageList.ImageStream = ((resources.GetObject("imageList.ImageStream"))); //@@@: this.imageList.ImageStream = ((System.Windows.Forms.ImageListStreamer)(resources.GetObject("imageList.ImageStream")));
            this.imageList.TransparentColor = System.Drawing.Color.Transparent; //@@@: this.imageList.TransparentColor = System.Drawing.Color.Transparent;
            this.imageList.Images.SetKeyName(0, "base002.ico"); //@@@: this.imageList.Images.SetKeyName(0, "base002.ico");
            this.imageList.Images.SetKeyName(1, "property.ico"); //@@@: this.imageList.Images.SetKeyName(1, "property.ico");
            // 
            // tabPage4
            // 
            this.tabPage4.Controls.Add(this.lv_fields); //@@@: this.tabPage4.Controls.Add(this.lv_fields);
            this.tabPage4.Location = new System.Drawing.Point(4, 22); //@@@: this.tabPage4.Location = new System.Drawing.Point(4, 22);
            this.tabPage4.Name = "tabPage4"; //@@@: this.tabPage4.Name = "tabPage4";
            this.tabPage4.Padding = new System.Windows.Forms.Padding(3); //@@@: this.tabPage4.Padding = new System.Windows.Forms.Padding(3);
            this.tabPage4.Size = new System.Drawing.Size(218, 235); //@@@: this.tabPage4.Size = new System.Drawing.Size(218, 235);
            this.tabPage4.TabIndex = 1; //@@@: this.tabPage4.TabIndex = 1;
            this.tabPage4.Text = "Database"; //@@@: this.tabPage4.Text = "Database";
            this.tabPage4.UseVisualStyleBackColor = true; //@@@: this.tabPage4.UseVisualStyleBackColor = true;
            // 
            // lv_fields
            // 
            this.lv_fields.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] { //@@@: this.lv_fields.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader2}); //@@@: this.columnHeader2});
            this.lv_fields.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.lv_fields.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_fields.FullRowSelect = true; //@@@: this.lv_fields.FullRowSelect = true;
            this.lv_fields.Location = new System.Drawing.Point(3, 3); //@@@: this.lv_fields.Location = new System.Drawing.Point(3, 3);
            this.lv_fields.Name = "lv_fields"; //@@@: this.lv_fields.Name = "lv_fields";
            this.lv_fields.Size = new System.Drawing.Size(212, 229); //@@@: this.lv_fields.Size = new System.Drawing.Size(212, 229);
            this.lv_fields.SmallImageList = this.imageList; //@@@: this.lv_fields.SmallImageList = this.imageList;
            this.lv_fields.TabIndex = 0; //@@@: this.lv_fields.TabIndex = 0;
            this.lv_fields.UseCompatibleStateImageBehavior = false; //@@@: this.lv_fields.UseCompatibleStateImageBehavior = false;
            this.lv_fields.View = System.Windows.Forms.View.Details; //@@@: this.lv_fields.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "Name"; //@@@: this.columnHeader2.Text = "Name";
            this.columnHeader2.Width = 230; //@@@: this.columnHeader2.Width = 230;
            // 
            // tabPage1
            // 
            this.tabPage1.Controls.Add(this.lv_properties); //@@@: this.tabPage1.Controls.Add(this.lv_properties);
            this.tabPage1.Location = new System.Drawing.Point(4, 22); //@@@: this.tabPage1.Location = new System.Drawing.Point(4, 22);
            this.tabPage1.Name = "tabPage1"; //@@@: this.tabPage1.Name = "tabPage1";
            this.tabPage1.Size = new System.Drawing.Size(218, 235); //@@@: this.tabPage1.Size = new System.Drawing.Size(218, 235);
            this.tabPage1.TabIndex = 3; //@@@: this.tabPage1.TabIndex = 3;
            this.tabPage1.Text = "Properties"; //@@@: this.tabPage1.Text = "Properties";
            this.tabPage1.UseVisualStyleBackColor = true; //@@@: this.tabPage1.UseVisualStyleBackColor = true;
            // 
            // lv_properties
            // 
            this.lv_properties.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] { //@@@: this.lv_properties.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader3, //@@@: this.columnHeader3,
            this.columnHeader4}); //@@@: this.columnHeader4});
            this.lv_properties.Dock = System.Windows.Forms.DockStyle.Fill; //@@@: this.lv_properties.Dock = System.Windows.Forms.DockStyle.Fill;
            this.lv_properties.FullRowSelect = true; //@@@: this.lv_properties.FullRowSelect = true;
            this.lv_properties.Location = new System.Drawing.Point(0, 0); //@@@: this.lv_properties.Location = new System.Drawing.Point(0, 0);
            this.lv_properties.Name = "lv_properties"; //@@@: this.lv_properties.Name = "lv_properties";
            this.lv_properties.Size = new System.Drawing.Size(218, 235); //@@@: this.lv_properties.Size = new System.Drawing.Size(218, 235);
            this.lv_properties.SmallImageList = this.imageListTree; //@@@: this.lv_properties.SmallImageList = this.imageListTree;
            this.lv_properties.TabIndex = 1; //@@@: this.lv_properties.TabIndex = 1;
            this.lv_properties.UseCompatibleStateImageBehavior = false; //@@@: this.lv_properties.UseCompatibleStateImageBehavior = false;
            this.lv_properties.View = System.Windows.Forms.View.Details; //@@@: this.lv_properties.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "Name"; //@@@: this.columnHeader3.Text = "Name";
            this.columnHeader3.Width = 100; //@@@: this.columnHeader3.Width = 100;
            // 
            // columnHeader4
            // 
            this.columnHeader4.Text = "Value"; //@@@: this.columnHeader4.Text = "Value";
            this.columnHeader4.Width = 80; //@@@: this.columnHeader4.Width = 80;
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
            this.tabReports.MouseClick += new System.Windows.Forms.MouseEventHandler(this.tabReports_MouseClick); //@@@: this.tabReports.MouseClick += new System.Windows.Forms.MouseEventHandler(this.tabReports_MouseClick);
            // 
            // tbpEditor
            // 
            this.tbpEditor.Controls.Add(this.pnEditor); //@@@: this.tbpEditor.Controls.Add(this.pnEditor);
            this.tbpEditor.Location = new System.Drawing.Point(4, 22); //@@@: this.tbpEditor.Location = new System.Drawing.Point(4, 22);
            this.tbpEditor.Name = "tbpEditor"; //@@@: this.tbpEditor.Name = "tbpEditor";
            this.tbpEditor.Size = new System.Drawing.Size(444, 235); //@@@: this.tbpEditor.Size = new System.Drawing.Size(444, 235);
            this.tbpEditor.TabIndex = 0; //@@@: this.tbpEditor.TabIndex = 0;
            this.tbpEditor.Text = "New Report [X]"; //@@@: this.tbpEditor.Text = "New Report [X]";
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
            // cmnControl
            // 
            this.cmnControl.Items.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.cmnControl.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.cmCtrlCopy, //@@@: this.cmCtrlCopy,
            this.cmCtrlPaste, //@@@: this.cmCtrlPaste,
            this.cmCtrlPasteEx, //@@@: this.cmCtrlPasteEx,
            this.toolStripSeparator17, //@@@: this.toolStripSeparator17,
            this.cmCtrlDelete, //@@@: this.cmCtrlDelete,
            this.toolStripSeparator18, //@@@: this.toolStripSeparator18,
            this.cmCtrlEditText, //@@@: this.cmCtrlEditText,
            this.toolStripSeparator20, //@@@: this.toolStripSeparator20,
            this.cmCtrlSendBack, //@@@: this.cmCtrlSendBack,
            this.cmCtrlBringFront, //@@@: this.cmCtrlBringFront,
            this.toolStripSeparator19, //@@@: this.toolStripSeparator19,
            this.cmCtrlProperties}); //@@@: this.cmCtrlProperties});
            this.cmnControl.Name = "cmnControl"; //@@@: this.cmnControl.Name = "cmnControl";
            this.cmnControl.Size = new System.Drawing.Size(142, 204); //@@@: this.cmnControl.Size = new System.Drawing.Size(142, 204);
            // 
            // cmCtrlCopy
            // 
            this.cmCtrlCopy.Name = "cmCtrlCopy"; //@@@: this.cmCtrlCopy.Name = "cmCtrlCopy";
            this.cmCtrlCopy.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlCopy.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlCopy.Text = "Copy"; //@@@: this.cmCtrlCopy.Text = "Copy";
            this.cmCtrlCopy.Click += new System.EventHandler(this.cmCtrlCopy_Click); //@@@: this.cmCtrlCopy.Click += new System.EventHandler(this.cmCtrlCopy_Click);
            // 
            // cmCtrlPaste
            // 
            this.cmCtrlPaste.Name = "cmCtrlPaste"; //@@@: this.cmCtrlPaste.Name = "cmCtrlPaste";
            this.cmCtrlPaste.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlPaste.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlPaste.Text = "Paste"; //@@@: this.cmCtrlPaste.Text = "Paste";
            this.cmCtrlPaste.Click += new System.EventHandler(this.cmCtrlPaste_Click); //@@@: this.cmCtrlPaste.Click += new System.EventHandler(this.cmCtrlPaste_Click);
            // 
            // cmCtrlPasteEx
            // 
            this.cmCtrlPasteEx.Name = "cmCtrlPasteEx"; //@@@: this.cmCtrlPasteEx.Name = "cmCtrlPasteEx";
            this.cmCtrlPasteEx.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlPasteEx.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlPasteEx.Text = "Paste special"; //@@@: this.cmCtrlPasteEx.Text = "Paste special";
            this.cmCtrlPasteEx.Click += new System.EventHandler(this.cmCtrlPasteEx_Click); //@@@: this.cmCtrlPasteEx.Click += new System.EventHandler(this.cmCtrlPasteEx_Click);
            // 
            // toolStripSeparator17
            // 
            this.toolStripSeparator17.Name = "toolStripSeparator17"; //@@@: this.toolStripSeparator17.Name = "toolStripSeparator17";
            this.toolStripSeparator17.Size = new System.Drawing.Size(138, 6); //@@@: this.toolStripSeparator17.Size = new System.Drawing.Size(138, 6);
            // 
            // cmCtrlDelete
            // 
            this.cmCtrlDelete.Name = "cmCtrlDelete"; //@@@: this.cmCtrlDelete.Name = "cmCtrlDelete";
            this.cmCtrlDelete.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlDelete.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlDelete.Text = "Delete"; //@@@: this.cmCtrlDelete.Text = "Delete";
            this.cmCtrlDelete.Click += new System.EventHandler(this.cmCtrlDelete_Click); //@@@: this.cmCtrlDelete.Click += new System.EventHandler(this.cmCtrlDelete_Click);
            // 
            // toolStripSeparator18
            // 
            this.toolStripSeparator18.Name = "toolStripSeparator18"; //@@@: this.toolStripSeparator18.Name = "toolStripSeparator18";
            this.toolStripSeparator18.Size = new System.Drawing.Size(138, 6); //@@@: this.toolStripSeparator18.Size = new System.Drawing.Size(138, 6);
            // 
            // cmCtrlEditText
            // 
            this.cmCtrlEditText.Name = "cmCtrlEditText"; //@@@: this.cmCtrlEditText.Name = "cmCtrlEditText";
            this.cmCtrlEditText.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlEditText.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlEditText.Text = "Edit text"; //@@@: this.cmCtrlEditText.Text = "Edit text";
            // 
            // toolStripSeparator20
            // 
            this.toolStripSeparator20.Name = "toolStripSeparator20"; //@@@: this.toolStripSeparator20.Name = "toolStripSeparator20";
            this.toolStripSeparator20.Size = new System.Drawing.Size(138, 6); //@@@: this.toolStripSeparator20.Size = new System.Drawing.Size(138, 6);
            // 
            // cmCtrlSendBack
            // 
            this.cmCtrlSendBack.Name = "cmCtrlSendBack"; //@@@: this.cmCtrlSendBack.Name = "cmCtrlSendBack";
            this.cmCtrlSendBack.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlSendBack.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlSendBack.Text = "Send back"; //@@@: this.cmCtrlSendBack.Text = "Send back";
            this.cmCtrlSendBack.Click += new System.EventHandler(this.cmCtrlSendBack_Click); //@@@: this.cmCtrlSendBack.Click += new System.EventHandler(this.cmCtrlSendBack_Click);
            // 
            // cmCtrlBringFront
            // 
            this.cmCtrlBringFront.Name = "cmCtrlBringFront"; //@@@: this.cmCtrlBringFront.Name = "cmCtrlBringFront";
            this.cmCtrlBringFront.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlBringFront.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlBringFront.Text = "Bring front"; //@@@: this.cmCtrlBringFront.Text = "Bring front";
            this.cmCtrlBringFront.Click += new System.EventHandler(this.cmCtrlBringFront_Click); //@@@: this.cmCtrlBringFront.Click += new System.EventHandler(this.cmCtrlBringFront_Click);
            // 
            // toolStripSeparator19
            // 
            this.toolStripSeparator19.Name = "toolStripSeparator19"; //@@@: this.toolStripSeparator19.Name = "toolStripSeparator19";
            this.toolStripSeparator19.Size = new System.Drawing.Size(138, 6); //@@@: this.toolStripSeparator19.Size = new System.Drawing.Size(138, 6);
            // 
            // cmCtrlProperties
            // 
            this.cmCtrlProperties.Name = "cmCtrlProperties"; //@@@: this.cmCtrlProperties.Name = "cmCtrlProperties";
            this.cmCtrlProperties.Size = new System.Drawing.Size(141, 22); //@@@: this.cmCtrlProperties.Size = new System.Drawing.Size(141, 22);
            this.cmCtrlProperties.Text = "Properties"; //@@@: this.cmCtrlProperties.Text = "Properties";
            this.cmCtrlProperties.Click += new System.EventHandler(this.cmCtrlProperties_Click); //@@@: this.cmCtrlProperties.Click += new System.EventHandler(this.cmCtrlProperties_Click);
            // 
            // cmnSection
            // 
            this.cmnSection.Items.AddRange(new System.Windows.Forms.ToolStripItem[] { //@@@: this.cmnSection.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.cmSectionAddSectionLine, //@@@: this.cmSectionAddSectionLine,
            this.toolStripSeparator21, //@@@: this.toolStripSeparator21,
            this.cmSectionDeleteSection, //@@@: this.cmSectionDeleteSection,
            this.cmSectionDeleteSectionLine, //@@@: this.cmSectionDeleteSectionLine,
            this.toolStripSeparator22, //@@@: this.toolStripSeparator22,
            this.cmSectionSectionProperties, //@@@: this.cmSectionSectionProperties,
            this.cmSectionSectionLineProperties, //@@@: this.cmSectionSectionLineProperties,
            this.cmSectionGroupSeparator, //@@@: this.cmSectionGroupSeparator,
            this.cmSectionGroupProperties, //@@@: this.cmSectionGroupProperties,
            this.cmSectionMoveGroup}); //@@@: this.cmSectionMoveGroup});
            this.cmnSection.Name = "cmnSection"; //@@@: this.cmnSection.Name = "cmnSection";
            this.cmnSection.Size = new System.Drawing.Size(192, 176); //@@@: this.cmnSection.Size = new System.Drawing.Size(192, 176);
            // 
            // cmSectionAddSectionLine
            // 
            this.cmSectionAddSectionLine.Name = "cmSectionAddSectionLine"; //@@@: this.cmSectionAddSectionLine.Name = "cmSectionAddSectionLine";
            this.cmSectionAddSectionLine.Size = new System.Drawing.Size(191, 22); //@@@: this.cmSectionAddSectionLine.Size = new System.Drawing.Size(191, 22);
            this.cmSectionAddSectionLine.Text = "Add section line"; //@@@: this.cmSectionAddSectionLine.Text = "Add section line";
            this.cmSectionAddSectionLine.Click += new System.EventHandler(this.cmSectionAddSectionLine_Click); //@@@: this.cmSectionAddSectionLine.Click += new System.EventHandler(this.cmSectionAddSectionLine_Click);
            // 
            // toolStripSeparator21
            // 
            this.toolStripSeparator21.Name = "toolStripSeparator21"; //@@@: this.toolStripSeparator21.Name = "toolStripSeparator21";
            this.toolStripSeparator21.Size = new System.Drawing.Size(188, 6); //@@@: this.toolStripSeparator21.Size = new System.Drawing.Size(188, 6);
            // 
            // cmSectionDeleteSection
            // 
            this.cmSectionDeleteSection.Name = "cmSectionDeleteSection"; //@@@: this.cmSectionDeleteSection.Name = "cmSectionDeleteSection";
            this.cmSectionDeleteSection.Size = new System.Drawing.Size(191, 22); //@@@: this.cmSectionDeleteSection.Size = new System.Drawing.Size(191, 22);
            this.cmSectionDeleteSection.Text = "Delete section"; //@@@: this.cmSectionDeleteSection.Text = "Delete section";
            this.cmSectionDeleteSection.Click += new System.EventHandler(this.cmSectionDeleteSection_Click); //@@@: this.cmSectionDeleteSection.Click += new System.EventHandler(this.cmSectionDeleteSection_Click);
            // 
            // cmSectionDeleteSectionLine
            // 
            this.cmSectionDeleteSectionLine.Name = "cmSectionDeleteSectionLine"; //@@@: this.cmSectionDeleteSectionLine.Name = "cmSectionDeleteSectionLine";
            this.cmSectionDeleteSectionLine.Size = new System.Drawing.Size(191, 22); //@@@: this.cmSectionDeleteSectionLine.Size = new System.Drawing.Size(191, 22);
            this.cmSectionDeleteSectionLine.Text = "Delete section line"; //@@@: this.cmSectionDeleteSectionLine.Text = "Delete section line";
            this.cmSectionDeleteSectionLine.Click += new System.EventHandler(this.cmSectionDeleteSectionLine_Click); //@@@: this.cmSectionDeleteSectionLine.Click += new System.EventHandler(this.cmSectionDeleteSectionLine_Click);
            // 
            // toolStripSeparator22
            // 
            this.toolStripSeparator22.Name = "toolStripSeparator22"; //@@@: this.toolStripSeparator22.Name = "toolStripSeparator22";
            this.toolStripSeparator22.Size = new System.Drawing.Size(188, 6); //@@@: this.toolStripSeparator22.Size = new System.Drawing.Size(188, 6);
            // 
            // cmSectionSectionProperties
            // 
            this.cmSectionSectionProperties.Name = "cmSectionSectionProperties"; //@@@: this.cmSectionSectionProperties.Name = "cmSectionSectionProperties";
            this.cmSectionSectionProperties.Size = new System.Drawing.Size(191, 22); //@@@: this.cmSectionSectionProperties.Size = new System.Drawing.Size(191, 22);
            this.cmSectionSectionProperties.Text = "Section properties"; //@@@: this.cmSectionSectionProperties.Text = "Section properties";
            this.cmSectionSectionProperties.Click += new System.EventHandler(this.cmSectionSectionProperties_Click); //@@@: this.cmSectionSectionProperties.Click += new System.EventHandler(this.cmSectionSectionProperties_Click);
            // 
            // cmSectionSectionLineProperties
            // 
            this.cmSectionSectionLineProperties.Name = "cmSectionSectionLineProperties"; //@@@: this.cmSectionSectionLineProperties.Name = "cmSectionSectionLineProperties";
            this.cmSectionSectionLineProperties.Size = new System.Drawing.Size(191, 22); //@@@: this.cmSectionSectionLineProperties.Size = new System.Drawing.Size(191, 22);
            this.cmSectionSectionLineProperties.Text = "Section line properties"; //@@@: this.cmSectionSectionLineProperties.Text = "Section line properties";
            this.cmSectionSectionLineProperties.Click += new System.EventHandler(this.cmSectionSectionLineProperties_Click); //@@@: this.cmSectionSectionLineProperties.Click += new System.EventHandler(this.cmSectionSectionLineProperties_Click);
            // 
            // cmSectionGroupSeparator
            // 
            this.cmSectionGroupSeparator.Name = "cmSectionGroupSeparator"; //@@@: this.cmSectionGroupSeparator.Name = "cmSectionGroupSeparator";
            this.cmSectionGroupSeparator.Size = new System.Drawing.Size(188, 6); //@@@: this.cmSectionGroupSeparator.Size = new System.Drawing.Size(188, 6);
            // 
            // cmSectionGroupProperties
            // 
            this.cmSectionGroupProperties.Name = "cmSectionGroupProperties"; //@@@: this.cmSectionGroupProperties.Name = "cmSectionGroupProperties";
            this.cmSectionGroupProperties.Size = new System.Drawing.Size(191, 22); //@@@: this.cmSectionGroupProperties.Size = new System.Drawing.Size(191, 22);
            this.cmSectionGroupProperties.Text = "Group properties"; //@@@: this.cmSectionGroupProperties.Text = "Group properties";
            this.cmSectionGroupProperties.Click += new System.EventHandler(this.cmSectionGroupProperties_Click); //@@@: this.cmSectionGroupProperties.Click += new System.EventHandler(this.cmSectionGroupProperties_Click);
            // 
            // cmSectionMoveGroup
            // 
            this.cmSectionMoveGroup.Name = "cmSectionMoveGroup"; //@@@: this.cmSectionMoveGroup.Name = "cmSectionMoveGroup";
            this.cmSectionMoveGroup.Size = new System.Drawing.Size(191, 22); //@@@: this.cmSectionMoveGroup.Size = new System.Drawing.Size(191, 22);
            this.cmSectionMoveGroup.Text = "Move group"; //@@@: this.cmSectionMoveGroup.Text = "Move group";
            this.cmSectionMoveGroup.Click += new System.EventHandler(this.cmSectionMoveGroup_Click); //@@@: this.cmSectionMoveGroup.Click += new System.EventHandler(this.cmSectionMoveGroup_Click);
            // 
            // printDlg
            // 
            this.printDlg.UseEXDialog = true; //@@@: this.printDlg.UseEXDialog = true;
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
            this.KeyPreview = true; //@@@: this.KeyPreview = true;
            this.MainMenuStrip = this.mnMain; //@@@: this.MainMenuStrip = this.mnMain;
            this.Name = "fMain"; //@@@: this.Name = "fMain";
            this.Text = "CrowSoft Report Editor"; //@@@: this.Text = "CrowSoft Report Editor";
            this.Load += new System.EventHandler(this.fMain_Load); //@@@: this.Load += new System.EventHandler(this.fMain_Load);
            this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.fMain_KeyDown); //@@@: this.KeyDown += new System.Windows.Forms.KeyEventHandler(this.fMain_KeyDown);
            this.KeyUp += new System.Windows.Forms.KeyEventHandler(this.fMain_KeyUp); //@@@: this.KeyUp += new System.Windows.Forms.KeyEventHandler(this.fMain_KeyUp);
            this.mnMain.ResumeLayout(false); //@@@: this.mnMain.ResumeLayout(false);
            this.mnMain.PerformLayout(); //@@@: this.mnMain.PerformLayout();
            this.tbMain.ResumeLayout(false); //@@@: this.tbMain.ResumeLayout(false);
            this.tbMain.PerformLayout(); //@@@: this.tbMain.PerformLayout();
            this.splitContainer1.Panel1.ResumeLayout(false); //@@@: this.splitContainer1.Panel1.ResumeLayout(false);
            this.splitContainer1.Panel2.ResumeLayout(false); //@@@: this.splitContainer1.Panel2.ResumeLayout(false);
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.splitContainer1)).EndInit();
            this.splitContainer1.ResumeLayout(false); //@@@: this.splitContainer1.ResumeLayout(false);
            this.panel1.ResumeLayout(false); //@@@: this.panel1.ResumeLayout(false);
            this.tab_sidebar.ResumeLayout(false); //@@@: this.tab_sidebar.ResumeLayout(false);
            this.tabPage5.ResumeLayout(false); //@@@: this.tabPage5.ResumeLayout(false);
            this.tabPage3.ResumeLayout(false); //@@@: this.tabPage3.ResumeLayout(false);
            this.tabPage4.ResumeLayout(false); //@@@: this.tabPage4.ResumeLayout(false);
            this.tabPage1.ResumeLayout(false); //@@@: this.tabPage1.ResumeLayout(false);
            this.tabReports.ResumeLayout(false); //@@@: this.tabReports.ResumeLayout(false);
            this.tbpEditor.ResumeLayout(false); //@@@: this.tbpEditor.ResumeLayout(false);
            this.pnEditor.ResumeLayout(false); //@@@: this.pnEditor.ResumeLayout(false);
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnRule)).EndInit();
            ().EndInit(); //@@@: ((System.ComponentModel.ISupportInitialize)(this.pnReport)).EndInit();
            this.cmnControl.ResumeLayout(false); //@@@: this.cmnControl.ResumeLayout(false);
            this.cmnSection.ResumeLayout(false); //@@@: this.cmnSection.ResumeLayout(false);
            this.ResumeLayout(false); //@@@: this.ResumeLayout(false);
            this.PerformLayout(); //@@@: this.PerformLayout();

        }; //@@@: }

UNKNOWN >>         #endregion //@@@: #endregion

        let mnMain = null; //@@@: private System.Windows.Forms.MenuStrip mnMain;
        let mnFile = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnFile;
        let mnuPageSetup = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuPageSetup;
        let tbMain = null; //@@@: private System.Windows.Forms.ToolStrip tbMain;
        let tsbNew = null; //@@@: private System.Windows.Forms.ToolStripButton tsbNew;
        let tsbOpen = null; //@@@: private System.Windows.Forms.ToolStripButton tsbOpen;
        let tsbSave = null; //@@@: private System.Windows.Forms.ToolStripButton tsbSave;
        let tsbSaveAs = null; //@@@: private System.Windows.Forms.ToolStripButton tsbSaveAs;
        let toolStripSeparator1 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator1;
        let tsbDatabase = null; //@@@: private System.Windows.Forms.ToolStripButton tsbDatabase;
        let toolStripSeparator2 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator2;
        let tsbPreview = null; //@@@: private System.Windows.Forms.ToolStripButton tsbPreview;
        let tsbPrint = null; //@@@: private System.Windows.Forms.ToolStripButton tsbPrint;
        let toolStripSeparator3 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator3;
        let tsbProperties = null; //@@@: private System.Windows.Forms.ToolStripButton tsbProperties;
        let tsbControls = null; //@@@: private System.Windows.Forms.ToolStripButton tsbControls;
        let toolStripSeparator4 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator4;
        let tsbAlignLeft = null; //@@@: private System.Windows.Forms.ToolStripButton tsbAlignLeft;
        let tsbAligntCenter = null; //@@@: private System.Windows.Forms.ToolStripButton tsbAligntCenter;
        let tsbAlignRight = null; //@@@: private System.Windows.Forms.ToolStripButton tsbAlignRight;
        let toolStripSeparator5 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator5;
        let tsbBold = null; //@@@: private System.Windows.Forms.ToolStripButton tsbBold;
        let toolStripSeparator6 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator6;
        let tsbSearch = null; //@@@: private System.Windows.Forms.ToolStripButton tsbSearch;
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
        let mnuExit = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuExit;
        let mnEdit = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnEdit;
        let mnuCopy = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuCopy;
        let mnuPaste = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuPaste;
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
        let mnuEditAddImage = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddImage;
        let mnuEditAddChart = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuEditAddChart;
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
        let mnViewGridTool = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnViewGridTool;
        let mnuGridPoints = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuGridPoints;
        let mnuGridLines = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuGridLines;
        let mnuHideGrid = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuHideGrid;
        let mnDatabase = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnDatabase;
        let mnTool = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnTool;
        let mnHelp = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnHelp;
        let mnuConnectionSettings = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuConnectionSettings;
        let mnuParametersSettings = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuParametersSettings;
        let toolStripSeparator15 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator15;
        let mnuDataBaseConnectsAuxCfg = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseConnectsAuxCfg;
        let toolStripSeparator16 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator16;
        let mnuDataBaseSetDisconnected = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseSetDisconnected;
        let manualSettingsToolStripMenuItem = null; //@@@: private System.Windows.Forms.ToolStripMenuItem manualSettingsToolStripMenuItem;
        let mnuDataBaseSQLServerConnection = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseSQLServerConnection;
        let mnuDataBaseConnectConfig = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseConnectConfig;
        let mnuDataBaseEditDataSource = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseEditDataSource;
        let mnuDataBaseSetToMainConnect = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuDataBaseSetToMainConnect;
        let mnuOptionsTool = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuOptionsTool;
        let mnuHelpAbout = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuHelpAbout;
        let sbMain = null; //@@@: private System.Windows.Forms.StatusStrip sbMain;
        let splitContainer1 = null; //@@@: private System.Windows.Forms.SplitContainer splitContainer1;
        let panel1 = null; //@@@: private System.Windows.Forms.Panel panel1;
        let tab_sidebar = null; //@@@: private System.Windows.Forms.TabControl tab_sidebar;
        let tabPage3 = null; //@@@: private System.Windows.Forms.TabPage tabPage3;
        let lv_controls = null; //@@@: private System.Windows.Forms.ListView lv_controls;
        let tabPage4 = null; //@@@: private System.Windows.Forms.TabPage tabPage4;
        let lv_fields = null; //@@@: private System.Windows.Forms.ListView lv_fields;
        let tabPage5 = null; //@@@: private System.Windows.Forms.TabPage tabPage5;
        let tv_controls = null; //@@@: private System.Windows.Forms.TreeView tv_controls;
        let tabReports = null; //@@@: private System.Windows.Forms.TabControl tabReports;
        let tbpEditor = null; //@@@: private System.Windows.Forms.TabPage tbpEditor;
        let pnEditor = null; //@@@: private System.Windows.Forms.Panel pnEditor;
        let pnRule = null; //@@@: private System.Windows.Forms.PictureBox pnRule;
        let pnReport = null; //@@@: private System.Windows.Forms.PictureBox pnReport;
        let mnuFileRecentList = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuFileRecentList;
        let openFileDlg = null; //@@@: private System.Windows.Forms.OpenFileDialog openFileDlg;
        let saveFielDlg = null; //@@@: private System.Windows.Forms.SaveFileDialog saveFielDlg;
        let tabPage1 = null; //@@@: private System.Windows.Forms.TabPage tabPage1;
        let cmnControl = null; //@@@: private System.Windows.Forms.ContextMenuStrip cmnControl;
        let cmCtrlProperties = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlProperties;
        let cmCtrlCopy = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlCopy;
        let toolStripSeparator17 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator17;
        let cmCtrlDelete = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlDelete;
        let toolStripSeparator18 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator18;
        let cmCtrlEditText = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlEditText;
        let toolStripSeparator20 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator20;
        let cmCtrlSendBack = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlSendBack;
        let cmCtrlBringFront = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlBringFront;
        let toolStripSeparator19 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator19;
        let cmCtrlPaste = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlPaste;
        let cmCtrlPasteEx = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmCtrlPasteEx;
        let cmnSection = null; //@@@: private System.Windows.Forms.ContextMenuStrip cmnSection;
        let cmSectionAddSectionLine = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmSectionAddSectionLine;
        let toolStripSeparator21 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator21;
        let cmSectionDeleteSection = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmSectionDeleteSection;
        let cmSectionDeleteSectionLine = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmSectionDeleteSectionLine;
        let toolStripSeparator22 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator22;
        let cmSectionSectionProperties = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmSectionSectionProperties;
        let cmSectionSectionLineProperties = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmSectionSectionLineProperties;
        let cmSectionGroupProperties = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmSectionGroupProperties;
        let cmSectionGroupSeparator = null; //@@@: private System.Windows.Forms.ToolStripSeparator cmSectionGroupSeparator;
        let cmSectionMoveGroup = null; //@@@: private System.Windows.Forms.ToolStripMenuItem cmSectionMoveGroup;
        let toolStripSeparator23 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator23;
        let columnHeader1 = null; //@@@: private System.Windows.Forms.ColumnHeader columnHeader1;
        let imageList = null; //@@@: private System.Windows.Forms.ImageList imageList;
        let columnHeader2 = null; //@@@: private System.Windows.Forms.ColumnHeader columnHeader2;
        let lv_properties = null; //@@@: private System.Windows.Forms.ListView lv_properties;
        let columnHeader3 = null; //@@@: private System.Windows.Forms.ColumnHeader columnHeader3;
        let columnHeader4 = null; //@@@: private System.Windows.Forms.ColumnHeader columnHeader4;
        let imageListTree = null; //@@@: private System.Windows.Forms.ImageList imageListTree;
        let mnuPasteSpecial = null; //@@@: private System.Windows.Forms.ToolStripMenuItem mnuPasteSpecial;
        let printDlg = null; //@@@: private System.Windows.Forms.PrintDialog printDlg;
        let tsbCtrlAlignLeft = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlAlignLeft;
        let tsbCtrlAlignRight = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlAlignRight;
        let tsbCtrlAlignTop = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlAlignTop;
        let tsbCtrlAlignBottom = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlAlignBottom;
        let toolStripSeparator24 = null; //@@@: private System.Windows.Forms.ToolStripSeparator toolStripSeparator24;
        let tsbCtrlSameHeight = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlSameHeight;
        let tsbCtrlSameWidth = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlSameWidth;
        let tsbCtrlSameLeft = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlSameLeft;
        let tsbCtrlSameTop = null; //@@@: private System.Windows.Forms.ToolStripButton tsbCtrlSameTop;
    } //@@@: }
} //@@@: }

