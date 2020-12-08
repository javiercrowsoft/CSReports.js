(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFMain = function() {

        const self = {}; //@@@: public partial class fMain : Form
        // TODO: remove me
        //static fMain instance;

        const C_MODULE = "fMain"; //@@@: private const String C_MODULE = "fMain";

        const MRU_FILE = "mru.settings"; //@@@: private const string MRU_FILE = "mru.settings";

        let m_paperSize = 0; //@@@: private int m_paperSize = 0;
        let m_paperSizeWidth = 0; //@@@: private int m_paperSizeWidth = 0;
        let m_paperSizeHeight = 0; //@@@: private int m_paperSizeHeight = 0;
        let m_orientation = 0; //@@@: private int m_orientation = 0;
        let m_printerName = ""; //@@@: private string m_printerName = "";
        let m_driverName = ""; //@@@: private string m_driverName = "";
        let m_port = ""; //@@@: private string m_port = "";
        let m_sourceEditor = null; //@@@: private cEditor m_sourceEditor = null;

        let m_wasDoubleClick = false; //@@@: private bool m_wasDoubleClick = false;

        const C_CTRL_IMAGE = 1; //@@@: private const int C_CTRL_IMAGE = 1;
        const C_DB_IMAGE = 0; //@@@: private const int C_DB_IMAGE = 0;

        const C_IMG_FOLDER = 0; //@@@: private const int C_IMG_FOLDER = 0;
        const C_IMG_FORMULA = 3; //@@@: private const int C_IMG_FORMULA = 3;
        const C_IMG_CONTROL = 2; //@@@: private const int C_IMG_CONTROL = 2;
        const C_IMG_DATBASE_FIELD = 1; //@@@: private const int C_IMG_DATBASE_FIELD = 1;

        const C_FIELDTYPE = "t"; //@@@: private const String C_FIELDTYPE = "t";
        const C_INDEX = "i"; //@@@: private const String C_INDEX = "i";

        let m_contextMenuEditor = null; //@@@: private cEditor m_contextMenuEditor;

        let lvwColumnSorter = null; //@@@: private cListViewColumnSorter lvwColumnSorter;

        const fMain = function() { //@@@: public fMain()
            InitializeComponent(); //@@@: InitializeComponent();

            // it is the first thing we need to do
            //
            CSKernelClient.cUtil.setSepDecimal(); //@@@: CSKernelClient.cUtil.setSepDecimal();

            let printer = cPrintAPI.getcPrinterFromDefaultPrinter(this.printDlg); //@@@: cPrinter printer = cPrintAPI.getcPrinterFromDefaultPrinter(this.printDlg);
            m_paperSize = printer.getPaperInfo().getPaperSize(); //@@@: m_paperSize = (int)printer.getPaperInfo().getPaperSize();
            m_paperSizeHeight = Convert.ToInt32(printer.getPaperInfo().getHeight()); //@@@: m_paperSizeHeight = Convert.ToInt32(printer.getPaperInfo().getHeight());
            m_paperSizeWidth = Convert.ToInt32(printer.getPaperInfo().getHeight()); //@@@: m_paperSizeWidth = Convert.ToInt32(printer.getPaperInfo().getHeight());
        }; //@@@: }

        self.init = function() { //@@@: public void init()
            let editor = new cEditor(this, pnEditor, pnRule, pnReport, tbpEditor); //@@@: cEditor editor = new cEditor(this, pnEditor, pnRule, pnReport, tbpEditor);
            editor.init(); //@@@: editor.init();
            editor.newReport(null);         //@@@: editor.newReport(null);
        }; //@@@: }

        self.getReportCopySource = function() { //@@@: public cEditor getReportCopySource()
            return m_sourceEditor; //@@@: return m_sourceEditor;
        }; //@@@: }

        const createEditor = function() { //@@@: private cEditor createEditor()
            let tab = new TabPage(); //@@@: TabPage tab = new TabPage();
            let pnEditor = new Panel(); //@@@: Panel pnEditor = new Panel();
            let pnRule = new PictureBox(); //@@@: PictureBox pnRule = new PictureBox();
            let pnReport = new PictureBox(); //@@@: PictureBox pnReport = new PictureBox();

            pnEditor.Controls.Add(pnRule); //@@@: pnEditor.Controls.Add(pnRule);
            pnEditor.Controls.Add(pnReport); //@@@: pnEditor.Controls.Add(pnReport);
            tab.Controls.Add(pnEditor); //@@@: tab.Controls.Add(pnEditor);
            pnEditor.Dock = DockStyle.Fill; //@@@: pnEditor.Dock = DockStyle.Fill;
            tabReports.TabPages.Add(tab); //@@@: tabReports.TabPages.Add(tab);
            tab.Text = "New Report [X]"; //@@@: tab.Text = "New Report [X]";

            return new cEditor(this, pnEditor, pnRule, pnReport, tab); //@@@: return new cEditor(this, pnEditor, pnRule, pnReport, tab);
        }; //@@@: }

        const mnuNewReport_Click = function(sender, e) { //@@@: private void mnuNewReport_Click(object sender, EventArgs e)
            let editor = createEditor(); //@@@: cEditor editor = createEditor();
            editor.init(); //@@@: editor.init();
            editor.newReport(null); //@@@: editor.newReport(null);
        }; //@@@: }

        const tsbNew_Click = function(sender, e) { //@@@: private void tsbNew_Click(object sender, EventArgs e)
            mnuNewReport_Click(sender, e); //@@@: mnuNewReport_Click(sender, e);
        }; //@@@: }

        self.setEditAlignTextState = function(status) { //@@@: public void setEditAlignTextState(bool status)
            let buttons = this.tbMain.Items; //@@@: var buttons = this.tbMain.Items;

            buttons[cGlobals.c_BTN_ALIGN_CENTER].Enabled = status; //@@@: buttons[cGlobals.c_BTN_ALIGN_CENTER].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_LEFT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_RIGHT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_ALIGN_RIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_FONT_BOLD].Enabled = status; //@@@: buttons[cGlobals.c_BTN_FONT_BOLD].Enabled = status;
        }; //@@@: }

        self.setEditAlignCtlState = function(status) { //@@@: public void setEditAlignCtlState(bool status)
            let buttons = this.tbMain.Items; //@@@: var buttons = this.tbMain.Items;

            buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_HEIGHT].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_HEIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_WIDTH].Enabled = status; //@@@: buttons[cGlobals.c_BTN_CTL_WIDTH].Enabled = status;
        }; //@@@: }

        self.setMenuAux = function(enabled) { //@@@: public void setMenuAux(bool enabled)
            this.mnuEditAddControl.Enabled = enabled; //@@@: this.mnuEditAddControl.Enabled = enabled;
            this.mnuEditAddHeader.Enabled = enabled; //@@@: this.mnuEditAddHeader.Enabled = enabled;
            this.mnuEditAddLabel.Enabled = enabled; //@@@: this.mnuEditAddLabel.Enabled = enabled;
            this.mnuEditAddGroup.Enabled = enabled; //@@@: this.mnuEditAddGroup.Enabled = enabled;
            this.mnuEditAddFooter.Enabled = enabled; //@@@: this.mnuEditAddFooter.Enabled = enabled;
            this.mnuEditAddLine.Enabled = enabled; //@@@: this.mnuEditAddLine.Enabled = enabled;
            this.mnuEditAddSec.Enabled = enabled; //@@@: this.mnuEditAddSec.Enabled = enabled;
            this.mnuEditMove.Enabled = enabled; //@@@: this.mnuEditMove.Enabled = enabled;
            this.mnuDataBaseEditDataSource.Enabled = enabled; //@@@: this.mnuDataBaseEditDataSource.Enabled = enabled;
            this.mnuPreviewReport.Enabled = enabled; //@@@: this.mnuPreviewReport.Enabled = enabled;
            this.mnuPrintReport.Enabled = enabled; //@@@: this.mnuPrintReport.Enabled = enabled;
            this.mnuSaveReport.Enabled = enabled; //@@@: this.mnuSaveReport.Enabled = enabled;
            this.mnuReportSaveAs.Enabled = enabled; //@@@: this.mnuReportSaveAs.Enabled = enabled;
            this.mnuDataBaseSetDisconnected.Enabled = enabled; //@@@: this.mnuDataBaseSetDisconnected.Enabled = enabled;
            this.mnuEditSearch.Enabled = enabled; //@@@: this.mnuEditSearch.Enabled = enabled;
            this.mnuDataBaseSQLServerConnection.Enabled = enabled; //@@@: this.mnuDataBaseSQLServerConnection.Enabled = enabled;
            this.mnuDataBaseSetToMainConnect.Enabled = enabled; //@@@: this.mnuDataBaseSetToMainConnect.Enabled = enabled;
            this.mnuDataBaseEditDataSource.Enabled = enabled; //@@@: this.mnuDataBaseEditDataSource.Enabled = enabled;
            this.mnuDataBaseConnectsAuxCfg.Enabled = enabled; //@@@: this.mnuDataBaseConnectsAuxCfg.Enabled = enabled;
            this.mnuHideGrid.Enabled = enabled; //@@@: this.mnuHideGrid.Enabled = enabled;
            this.mnuViewToolbar.Enabled = enabled; //@@@: this.mnuViewToolbar.Enabled = enabled;
            this.mnuViewControls.Enabled = enabled; //@@@: this.mnuViewControls.Enabled = enabled;
            this.mnuViewTreeViewCtrls.Enabled = enabled; //@@@: this.mnuViewTreeViewCtrls.Enabled = enabled;

            let buttons = this.tbMain.Items; //@@@: var buttons = this.tbMain.Items;
            tsbPrint.Enabled = enabled; //@@@: tsbPrint.Enabled = enabled;
            tsbProperties.Enabled = enabled; //@@@: tsbProperties.Enabled = enabled;
            tsbDatabase.Enabled = enabled; //@@@: tsbDatabase.Enabled = enabled;
            tsbSave.Enabled = enabled; //@@@: tsbSave.Enabled = enabled;
            tsbControls.Enabled = enabled; //@@@: tsbControls.Enabled = enabled;
            tsbPreview.Enabled = enabled; //@@@: tsbPreview.Enabled = enabled;
            tsbSearch.Enabled = enabled; //@@@: tsbSearch.Enabled = enabled;
        }; //@@@: }

        self.addToRecentList = function(fileName) { //@@@: public void addToRecentList(String fileName)
            let i = 0; //@@@: int i = 0;
            let j = 0; //@@@: int j = 0;
            let found = false; //@@@: bool found = false;
            let menuItems = this.mnuFileRecentList.DropDownItems; //@@@: var menuItems = this.mnuFileRecentList.DropDownItems;

            for (i = 0; i < menuItems.Count; i++) { //@@@: for (i = 0; i < menuItems.Count; i++)
                if (fileName === menuItems[i].Text) { //@@@: if (fileName == menuItems[i].Text)
                    j = i; //@@@: j = i;
                    found = true; //@@@: found = true;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (menuItems.Count < cGlobals.C_TOTINRECENTLIST && !found) { //@@@: if (menuItems.Count < cGlobals.C_TOTINRECENTLIST && !found)
                let menu = this.mnuFileRecentList.DropDownItems.Add(""); //@@@: var menu = this.mnuFileRecentList.DropDownItems.Add("");
                menu.Visible = true; //@@@: menu.Visible = true;
                menu.Click += mnuRecentClick; //@@@: menu.Click += mnuRecentClick;
            } //@@@: }

            if (!found) { j = menuItems.Count - 1; } //@@@: if (!found) { j = menuItems.Count - 1; }

            for (i = j; i > 0; i--) { //@@@: for (i = j; i > 0; i--)
                menuItems[i].Text = menuItems[i - 1].Text; //@@@: menuItems[i].Text = menuItems[i - 1].Text;
            } //@@@: }

            menuItems[0].Text = fileName; //@@@: menuItems[0].Text = fileName;

            saveRecentList(); //@@@: saveRecentList();
        }; //@@@: }

        const getMRUFileName = function() { //@@@: private string getMRUFileName()
            let path = System.Environment.SpecialFolder.LocalApplicationData; //@@@: var path = System.Environment.SpecialFolder.LocalApplicationData;
            return Environment.GetFolderPath(path) + Path.DirectorySeparatorChar + MRU_FILE; //@@@: return Environment.GetFolderPath(path) + Path.DirectorySeparatorChar + MRU_FILE;
        }; //@@@: }

        const loadRecentListFromUserSettings = function() { //@@@: private void loadRecentListFromUserSettings()
            let fileName = getMRUFileName(); //@@@: var fileName = getMRUFileName();
            if (File.Exists(fileName)) { //@@@: if (File.Exists(fileName))
                let lines = File.ReadAllLines(fileName); //@@@: var lines = File.ReadAllLines(fileName);
                loadRecentList(lines.ToList()); //@@@: loadRecentList(lines.ToList());
            } //@@@: }
        }; //@@@: }

        const loadRecentList = function(recentList) { //@@@: private void loadRecentList(List<String> recentList)
            let i = 0; //@@@: int i = 0;
            let recent = ""; //@@@: String recent = "";

            for (i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++) { //@@@: for (i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++)
                recent = recentList[i]; //@@@: recent = recentList[i];
                let menu = this.mnuFileRecentList.DropDownItems.Add(recent); //@@@: var menu = this.mnuFileRecentList.DropDownItems.Add(recent);
                menu.Visible = true; //@@@: menu.Visible = true;
                menu.Click += mnuRecentClick; //@@@: menu.Click += mnuRecentClick;
            } //@@@: }

            if (this.mnuFileRecentList.DropDownItems.Count > 0) { //@@@: if (this.mnuFileRecentList.DropDownItems.Count > 0)
                this.mnuFileRecentList.Visible = true; //@@@: this.mnuFileRecentList.Visible = true;
            } //@@@: }
        }; //@@@: }

        const mnuRecentClick = function(sender, e) { //@@@: private void mnuRecentClick(object sender, EventArgs e)
            let mnu = sender; //@@@: ToolStripMenuItem mnu = (ToolStripMenuItem)sender;
            let editor = createEditor(); //@@@: cEditor editor = createEditor();
            editor.init(); //@@@: editor.init();
            if (editor.openDocument(mnu.Text)) { //@@@: if (editor.openDocument(mnu.Text))
                addToRecentList(editor.getFileName()); //@@@: addToRecentList(editor.getFileName());
            } //@@@: }
        }; //@@@: }

        const saveRecentList = function() { //@@@: private void saveRecentList()
            let i = 0; //@@@: int i = 0;
            let mruList = ""; //@@@: string mruList = "";

            for (i = 0; i < mnuFileRecentList.DropDownItems.Count; i++) { //@@@: for (i = 0; i < mnuFileRecentList.DropDownItems.Count; i++)
                mruList += mnuFileRecentList.DropDownItems[i].Text + Environment.NewLine; //@@@: mruList += mnuFileRecentList.DropDownItems[i].Text + Environment.NewLine;
            } //@@@: }

            let fileName = getMRUFileName(); //@@@: var fileName = getMRUFileName();
            File.WriteAllText(fileName, mruList); //@@@: File.WriteAllText(fileName, mruList);
        }; //@@@: }

        self.setStatus = function(status) { //@@@: public void setStatus(String status)
            // TODO: implement
        }; //@@@: }

        self.setBarText = function(text) { //@@@: public void setBarText(String text)
            // TODO: implement
        }; //@@@: }

        self.setDisconnectedReport = function(isDisconnectedReport) { //@@@: public void setDisconnectedReport(bool isDisconnectedReport)
            // TODO: implement
        }; //@@@: }

		self. = function(msg) { //@@@: public void setsbPnlCtrl (string msg)
            cGlobals.implementThisMessage("setsbPnlCtrl", "(fMain)"); //@@@: cGlobals.implementThisMessage("setsbPnlCtrl", "(fMain)");
		}; //@@@: }

        self.setReportCopySource = function(editor) { //@@@: internal void setReportCopySource(cEditor editor)
            m_sourceEditor = editor; //@@@: m_sourceEditor = editor;
        }; //@@@: }

        self.getPaperSize = function() { //@@@: internal csReportPaperType getPaperSize()
            return m_paperSize; //@@@: return (csReportPaperType)m_paperSize;
        }; //@@@: }

        self.getOrientation = function() { //@@@: internal int getOrientation()
            return m_orientation; //@@@: return m_orientation;
        }; //@@@: }

        const mnuOpenReport_Click = function(sender, e) { //@@@: private void mnuOpenReport_Click(object sender, EventArgs e)
            try { //@@@: try {

                let editor = createEditor(); //@@@: cEditor editor = createEditor();

                editor.init(); //@@@: editor.init();

                if (editor.openDocument()) { //@@@: if (editor.openDocument())
                    addToRecentList(editor.getFileName()); //@@@: addToRecentList(editor.getFileName());
                } //@@@: }

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "mnuOpenReport_Click", C_MODULE, ""); //@@@: cError.mngError(ex, "mnuOpenReport_Click", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const tsbOpen_Click = function(sender, e) { //@@@: private void tsbOpen_Click(object sender, EventArgs e)
            mnuOpenReport_Click(sender, e); //@@@: mnuOpenReport_Click(sender, e);
        }; //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public OpenFileDialog openFileDialog  //@@@: public OpenFileDialog openFileDialog
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return openFileDlg; //@@@: return openFileDlg;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public SaveFileDialog saveFileDialog //@@@: public SaveFileDialog saveFileDialog
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return saveFielDlg; //@@@: return saveFielDlg;
            }             //@@@: }
        } //@@@: }

UNKNOWN >>         public PrintDialog printDialog //@@@: public PrintDialog printDialog
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return printDlg; //@@@: return printDlg;
            } //@@@: }
        } //@@@: }

        const fMain_Load = function(sender, e) { //@@@: private void fMain_Load(object sender, EventArgs e)
            cPrintAPI.getDefaultPrinter( //@@@: cPrintAPI.getDefaultPrinter(
                m_printerName, m_driverName, m_port,  //@@@: out m_printerName, out m_driverName, out m_port,
                m_paperSize, m_orientation, m_paperSizeWidth,  //@@@: out m_paperSize, out m_orientation, out m_paperSizeWidth,
                m_paperSizeHeight); //@@@: out m_paperSizeHeight);

            //
            // remove me and implement a better window position code
            //
            this.Width = 1200; //@@@: this.Width = 1200;
            this.Height = 900; //@@@: this.Height = 900;
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);

            // Create an instance of a ListView column sorter and assign it 
            // to the ListView control.
            lvwColumnSorter = new cListViewColumnSorter(); //@@@: lvwColumnSorter = new cListViewColumnSorter();
            lv_controls.ListViewItemSorter = lvwColumnSorter; //@@@: lv_controls.ListViewItemSorter = lvwColumnSorter;
            lv_controls_ColumnClick(this, new ColumnClickEventArgs(0)); //@@@: lv_controls_ColumnClick(this, new ColumnClickEventArgs(0));

            loadRecentListFromUserSettings(); //@@@: loadRecentListFromUserSettings();
        }; //@@@: }

        const cmCtrlProperties_Click = function(sender, e) { //@@@: private void cmCtrlProperties_Click(object sender, EventArgs e)
            if (m_contextMenuEditor !== null)  { //@@@: if (m_contextMenuEditor != null)
                m_contextMenuEditor.showProperties(); //@@@: m_contextMenuEditor.showProperties();
            } //@@@: }
        }; //@@@: }

        self.showPopMenuSection = function(editor, noDelete, showGroups, p) { //@@@: public void showPopMenuSection(cEditor editor, bool noDelete, bool showGroups, Point p)
            cmSectionDeleteSection.Enabled = !noDelete; //@@@: cmSectionDeleteSection.Enabled = !noDelete;
            cmSectionGroupProperties.Visible = showGroups; //@@@: cmSectionGroupProperties.Visible = showGroups;
            cmSectionMoveGroup.Visible = showGroups; //@@@: cmSectionMoveGroup.Visible = showGroups;
            cmSectionGroupSeparator.Visible = showGroups; //@@@: cmSectionGroupSeparator.Visible = showGroups;

            m_contextMenuEditor = editor; //@@@: m_contextMenuEditor = editor;

            cmnSection.Show(p); //@@@: cmnSection.Show(p);
        }; //@@@: }

        self.showPopMenuControl = function(editor, clickInCtrl, pasteEnabled, p) { //@@@: public void showPopMenuControl(cEditor editor, bool clickInCtrl, bool pasteEnabled, Point p)
            cmCtrlCopy.Enabled = clickInCtrl; //@@@: cmCtrlCopy.Enabled = clickInCtrl;
            cmCtrlDelete.Enabled = clickInCtrl; //@@@: cmCtrlDelete.Enabled = clickInCtrl;
            cmCtrlEditText.Enabled = clickInCtrl; //@@@: cmCtrlEditText.Enabled = clickInCtrl;
            cmCtrlSendBack.Enabled = clickInCtrl; //@@@: cmCtrlSendBack.Enabled = clickInCtrl;
            cmCtrlBringFront.Enabled = clickInCtrl; //@@@: cmCtrlBringFront.Enabled = clickInCtrl;
            cmCtrlProperties.Enabled = clickInCtrl; //@@@: cmCtrlProperties.Enabled = clickInCtrl;

            cmCtrlPaste.Enabled = pasteEnabled; //@@@: cmCtrlPaste.Enabled = pasteEnabled;
            cmCtrlPasteEx.Enabled = pasteEnabled; //@@@: cmCtrlPasteEx.Enabled = pasteEnabled;

            m_contextMenuEditor = editor; //@@@: m_contextMenuEditor = editor;

            cmnControl.Show(p); //@@@: cmnControl.Show(p);
        }; //@@@: }

        const cmSectionSectionProperties_Click = function(sender, e) { //@@@: private void cmSectionSectionProperties_Click(object sender, EventArgs e)
            if (m_contextMenuEditor !== null) { //@@@: if (m_contextMenuEditor != null)
                m_contextMenuEditor.showProperties(); //@@@: m_contextMenuEditor.showProperties();
            } //@@@: }
        }; //@@@: }

        const cmSectionSectionLineProperties_Click = function(sender, e) { //@@@: private void cmSectionSectionLineProperties_Click(object sender, EventArgs e)
            if (m_contextMenuEditor !== null) { //@@@: if (m_contextMenuEditor != null)
                m_contextMenuEditor.showSecLnProperties(); //@@@: m_contextMenuEditor.showSecLnProperties();
            } //@@@: }
        }; //@@@: }

        const cmSectionGroupProperties_Click = function(sender, e) { //@@@: private void cmSectionGroupProperties_Click(object sender, EventArgs e)
            if (m_contextMenuEditor !== null) { //@@@: if (m_contextMenuEditor != null)
                m_contextMenuEditor.showGroupProperties(); //@@@: m_contextMenuEditor.showGroupProperties();
            } //@@@: }
        }; //@@@: }

        const mnuViewTreeViewCtrls_Click = function(sender, e) { //@@@: private void mnuViewTreeViewCtrls_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.showControlsTree(); //@@@: editor.showControlsTree();
            } //@@@: }
        }; //@@@: }

        const mnuViewControls_Click = function(sender, e) { //@@@: private void mnuViewControls_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.showControls(); //@@@: editor.showControls();
            } //@@@: }
        }; //@@@: }

        const mnuViewToolbar_Click = function(sender, e) { //@@@: private void mnuViewToolbar_Click(object sender, EventArgs e)
            showToolbox(); //@@@: showToolbox();
        }; //@@@: }

        const tsbControls_Click = function(sender, e) { //@@@: private void tsbControls_Click(object sender, EventArgs e)
            showToolbox(); //@@@: showToolbox();
        }; //@@@: }

        const showToolbox = function() { //@@@: private void showToolbox()
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.showToolbox(); //@@@: editor.showToolbox();
            } //@@@: }
        }; //@@@: }

        const tsbSearch_Click = function(sender, e) { //@@@: private void tsbSearch_Click(object sender, EventArgs e)
            search(); //@@@: search();
        }; //@@@: }

        const mnuEditSearch_Click = function(sender, e) { //@@@: private void mnuEditSearch_Click(object sender, EventArgs e)
            search(); //@@@: search();
        }; //@@@: }

        const search = function() { //@@@: private void search()
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.search(); //@@@: editor.search();
            } //@@@: }
        }; //@@@: }

        const tsbProperties_Click = function(sender, e) { //@@@: private void tsbProperties_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.showProperties(); //@@@: editor.showProperties();
            } //@@@: }
        }; //@@@: }

        const mnuDataBaseSQLServerConnection_Click = function(sender, e) { //@@@: private void mnuDataBaseSQLServerConnection_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.setSimpleConnection(); //@@@: editor.setSimpleConnection();
            } //@@@: }
        }; //@@@: }

        const mnuDataBaseConnectConfig_Click = function(sender, e) { //@@@: private void mnuDataBaseConnectConfig_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.editConnectionString(); //@@@: editor.editConnectionString();
            } //@@@: }
        }; //@@@: }

        const mnuDataBaseEditDataSource_Click = function(sender, e) { //@@@: private void mnuDataBaseEditDataSource_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.editDataSource(); //@@@: editor.editDataSource();
            } //@@@: }
        }; //@@@: }

        const mnuExit_Click = function(sender, e) { //@@@: private void mnuExit_Click(object sender, EventArgs e)
            this.Close(); //@@@: this.Close();
        }; //@@@: }

        const mnuParametersSettings_Click = function(sender, e) { //@@@: private void mnuParametersSettings_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.setParameters(); //@@@: editor.setParameters();
            } //@@@: }
        }; //@@@: }

        self.showControls = function(editor) { //@@@: public void showControls(cEditor editor)
            lv_controls.Items.Clear(); //@@@: lv_controls.Items.Clear();

            if (editor !== null) { //@@@: if (editor != null)
                cGlobals.addCtrls(editor.getReport(), lv_controls, C_CTRL_IMAGE, C_DB_IMAGE); //@@@: cGlobals.addCtrls(editor.getReport(), lv_controls, C_CTRL_IMAGE, C_DB_IMAGE);
            } //@@@: }
        }; //@@@: }

        self.showControlsTree = function(editor) { //@@@: public void showControlsTree(cEditor editor)
            m_wasDoubleClick = false; //@@@: m_wasDoubleClick = false;
            tv_controls.Nodes.Clear(); //@@@: tv_controls.Nodes.Clear();

            if (editor !== null) { //@@@: if (editor != null)
                cGlobals.addCtrls(editor.getReport(), tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD); //@@@: cGlobals.addCtrls(editor.getReport(), tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);
            }             //@@@: }
        }; //@@@: }

        self.showProperties = function(editor, key) { //@@@: public void showProperties(cEditor editor, string key)
            lv_properties.Items.Clear(); //@@@: lv_properties.Items.Clear();
            if (editor !== null) { //@@@: if (editor != null)
                setObjectDescription(getControlOrSection(editor, key)); //@@@: setObjectDescription(getControlOrSection(editor, key));
            } //@@@: }
        }; //@@@: }

        const getControlOrSection = function(editor, key) { //@@@: private object getControlOrSection(cEditor editor, string key)
            if (key.Length > 1) { //@@@: if (key.Length > 1)
                if (key.Substring(0, 1) === "S") { //@@@: if (key.Substring(0, 1) == "S")
                    return editor.getSectionOrSectionLineFromKey(key.Substring(1)); //@@@: return editor.getSectionOrSectionLineFromKey(key.Substring(1));
                } //@@@: }
                else  { //@@@: else
                    return editor.getReport().getControls().item(key); //@@@: return editor.getReport().getControls().item(key);
                } //@@@: }
            } //@@@: }
            else  { //@@@: else
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        const setObjectDescription = function(anObject) { //@@@: private void setObjectDescription(object anObject)
            setObjectDescription(anObject, 0); //@@@: setObjectDescription(anObject, 0);
        }; //@@@: }

        const setObjectDescription = function(anObject, n) { //@@@: private void setObjectDescription(object anObject, int n)
            if (anObject === null) return; { //@@@: if (anObject == null) return;

            let tabs = new String(' ', n*2); //@@@: var tabs = new String(' ', n*2);
            let methods = getMethods(anObject); //@@@: var methods = getMethods(anObject);
            for(var i_ = 0; i_ < methods.length; i_++) { //@@@: foreach (var m in methods)
                if (m.IsPublic //@@@: if (m.IsPublic
                    && m.Name.Length > 3 //@@@: && m.Name.Length > 3
                    && m.Name.Substring(0, 3) === "get" //@@@: && m.Name.Substring(0, 3) == "get"
                    && m.Name.Substring(0, 4) !== "get_" //@@@: && m.Name.Substring(0, 4) != "get_"
                    && m.GetParameters().Length === 0 //@@@: && m.GetParameters().Length == 0
                    && m.Name !== "getSectionLine" //@@@: && m.Name != "getSectionLine"
                    ) { //@@@: )
                    let item = lv_properties.Items.Add(tabs + m.Name.Substring(3)); //@@@: var item = lv_properties.Items.Add(tabs + m.Name.Substring(3));
                    item.ImageIndex = C_IMG_CONTROL; //@@@: item.ImageIndex = C_IMG_CONTROL;
                    item.SubItems.Add(getValue(m.Invoke(anObject, null), n)); //@@@: item.SubItems.Add(getValue(m.Invoke(anObject, null), n));
                    if (item.SubItems[1].Text === "...") item.ImageIndex = C_IMG_FOLDER; { //@@@: if (item.SubItems[1].Text == "...") item.ImageIndex = C_IMG_FOLDER;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const getValue = function(value, n) { //@@@: private string getValue(object value, int n)
            if (n > 10) return ""; { //@@@: if (n > 10) return "";

            if (value === null) { //@@@: if (value == null)
                return "NULL"; //@@@: return "NULL";
            } //@@@: }
            else { //@@@: else
                let t = value.GetType(); //@@@: var t = value.GetType();
                if (t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) { //@@@: if (t.IsPrimitive || t == typeof(Decimal) || t == typeof(String))
                    return value.ToString(); //@@@: return value.ToString();
                } //@@@: }
                else { //@@@: else
                    setObjectDescription(value, n + 1); //@@@: setObjectDescription(value, n + 1);
                    return "..."; //@@@: return "...";
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const getMethods = function(obj) { //@@@: private static MethodInfo[] getMethods(object obj)
            return obj.GetType().GetMethods(); //@@@: return obj.GetType().GetMethods();
        }; //@@@: }

        self.showFields = function(editor) { //@@@: public void showFields(cEditor editor)
            lv_fields.Items.Clear(); //@@@: lv_fields.Items.Clear();

            if (editor !== null) { //@@@: if (editor != null)
                let connect = editor.getReport().getConnect(); //@@@: var connect = editor.getReport().getConnect();
                cGlobals.fillColumns( //@@@: cGlobals.fillColumns(
                    connect.getDataSource(), //@@@: connect.getDataSource(),
                    connect.getColumns(), lv_fields, C_INDEX, C_FIELDTYPE, false); //@@@: connect.getColumns(), lv_fields, C_INDEX, C_FIELDTYPE, false);
            }             //@@@: }
        }; //@@@: }

        const lv_controls_ColumnClick = function(sender, e) { //@@@: private void lv_controls_ColumnClick(object sender, ColumnClickEventArgs e)
            // Determine if clicked column is already the column that is being sorted.
            if (e.Column === lvwColumnSorter.SortColumn) { //@@@: if (e.Column == lvwColumnSorter.SortColumn)
                // Reverse the current sort direction for this column.
                if (lvwColumnSorter.Order === SortOrder.Ascending) { //@@@: if (lvwColumnSorter.Order == SortOrder.Ascending)
                    lvwColumnSorter.Order = SortOrder.Descending; //@@@: lvwColumnSorter.Order = SortOrder.Descending;
                } //@@@: }
                else { //@@@: else
                    lvwColumnSorter.Order = SortOrder.Ascending; //@@@: lvwColumnSorter.Order = SortOrder.Ascending;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                // Set the column number that is to be sorted; default to ascending.
                lvwColumnSorter.SortColumn = e.Column; //@@@: lvwColumnSorter.SortColumn = e.Column;
                lvwColumnSorter.Order = SortOrder.Ascending; //@@@: lvwColumnSorter.Order = SortOrder.Ascending;
            } //@@@: }

            // Perform the sort with these new sort options.
            lv_controls.Sort(); //@@@: lv_controls.Sort();
        }; //@@@: }

        const lv_controls_MouseClick = function(sender, e) { //@@@: private void lv_controls_MouseClick(object sender, MouseEventArgs e)
            selectControl(); //@@@: selectControl();
        }; //@@@: }

        const lv_controls_KeyUp = function(sender, e) { //@@@: private void lv_controls_KeyUp(object sender, KeyEventArgs e)
            selectControl(); //@@@: selectControl();
        }; //@@@: }

        const selectControl = function() { //@@@: private void selectControl()
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();

            if (lv_controls.SelectedItems.Count > 0 && editor !== null) { //@@@: if (lv_controls.SelectedItems.Count > 0 && editor != null)
                let info = lv_controls.SelectedItems[0].Tag.ToString(); //@@@: var info = lv_controls.SelectedItems[0].Tag.ToString();
                editor.selectCtrl(info); //@@@: editor.selectCtrl(info);
            } //@@@: }
        }; //@@@: }

        const tv_controls_NodeMouseClick = function(sender, e) { //@@@: private void tv_controls_NodeMouseClick(object sender, TreeNodeMouseClickEventArgs e)
            selectControl(e.Node); //@@@: selectControl(e.Node);
        }; //@@@: }

        const selectControl = function(node) { //@@@: private void selectControl(TreeNode node)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();

            if (node !== null && node.Tag !== null && editor !== null) { //@@@: if (node != null && node.Tag != null && editor != null)
                let info = node.Tag.ToString(); //@@@: var info = node.Tag.ToString();
                if (info.Length > 0) { //@@@: if (info.Length > 0)
                    let infoType = info.Substring(0, 1); //@@@: var infoType = info.Substring(0, 1);
                    if ("@SL".IndexOf(infoType) === -1) { //@@@: if ("@SL".IndexOf(infoType) == -1)
                        editor.selectCtrl(info); //@@@: editor.selectCtrl(info);
                    } //@@@: }
                    else if (infoType === "S" || infoType === "L") { //@@@: else if (infoType == "S" || infoType == "L")
                        editor.selectSection(info.Substring(1)); //@@@: editor.selectSection(info.Substring(1));
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const tv_controls_KeyUp = function(sender, e) { //@@@: private void tv_controls_KeyUp(object sender, KeyEventArgs e)
            selectControl(tv_controls.SelectedNode); //@@@: selectControl(tv_controls.SelectedNode);
        }; //@@@: }

        const tv_controls_MouseDoubleClick = function(sender, e) { //@@@: private void tv_controls_MouseDoubleClick(object sender, MouseEventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();

            if (tv_controls.SelectedNode !== null && editor !== null) { //@@@: if (tv_controls.SelectedNode != null && editor != null)
                if (tv_controls.SelectedNode.Tag !== null) { //@@@: if (tv_controls.SelectedNode.Tag != null)
                    let info = tv_controls.SelectedNode.Tag.ToString(); //@@@: var info = tv_controls.SelectedNode.Tag.ToString();
                    if (info.Length > 0) { //@@@: if (info.Length > 0)
                        let infoType = info.Substring(0, 1); //@@@: var infoType = info.Substring(0, 1);
                        if ("@".IndexOf(infoType) === -1) { //@@@: if ("@".IndexOf(infoType) == -1)
                            editor.showProperties(info); //@@@: editor.showProperties(info);
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const tv_controls_MouseDown = function(sender, e) { //@@@: private void tv_controls_MouseDown(object sender, MouseEventArgs e)
            m_wasDoubleClick = e.Clicks > 1; //@@@: m_wasDoubleClick = e.Clicks > 1;
        }; //@@@: }

        const tv_controls_BeforeCollapse = function(sender, e) { //@@@: private void tv_controls_BeforeCollapse(object sender, TreeViewCancelEventArgs e)
            if (m_wasDoubleClick === true && e.Action === TreeViewAction.Collapse) { //@@@: if (m_wasDoubleClick == true && e.Action == TreeViewAction.Collapse)
                e.Cancel = true; //@@@: e.Cancel = true;
        }; //@@@: }

        const tv_controls_BeforeExpand = function(sender, e) { //@@@: private void tv_controls_BeforeExpand(object sender, TreeViewCancelEventArgs e)
            if (m_wasDoubleClick === true && e.Action === TreeViewAction.Expand) { //@@@: if (m_wasDoubleClick == true && e.Action == TreeViewAction.Expand)
                e.Cancel = true; //@@@: e.Cancel = true;
        }; //@@@: }

        const lv_controls_MouseDoubleClick = function(sender, e) { //@@@: private void lv_controls_MouseDoubleClick(object sender, MouseEventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();

            if (lv_controls.SelectedItems.Count > 0 && editor !== null) { //@@@: if (lv_controls.SelectedItems.Count > 0 && editor != null)
                let info = lv_controls.SelectedItems[0].Tag.ToString(); //@@@: var info = lv_controls.SelectedItems[0].Tag.ToString();
                editor.showProperties(info); //@@@: editor.showProperties(info);
            } //@@@: }
        }; //@@@: }

        const mnuPreviewReport_Click = function(sender, e) { //@@@: private void mnuPreviewReport_Click(object sender, EventArgs e)
            previewReport(); //@@@: previewReport();
        }; //@@@: }

        const tsbPreview_Click = function(sender, e) { //@@@: private void tsbPreview_Click(object sender, EventArgs e)
            previewReport(); //@@@: previewReport();
        }; //@@@: }

        const previewReport = function() { //@@@: private void previewReport()
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.preview(); //@@@: editor.preview();
            }         //@@@: }
        }; //@@@: }


        const tabReports_MouseClick = function(sender, e) { //@@@: private void tabReports_MouseClick(object sender, MouseEventArgs e)
            for(var i = 0; i < tabReports.TabCount; ++i) { //@@@: for (int i = 0; i < tabReports.TabCount; ++i)
                let rect = tabReports.GetTabRect(i); //@@@: var rect = tabReports.GetTabRect(i);
                let xRect = new System.Drawing.Rectangle(rect.Left + rect.Width - 18, rect.Top, 18, rect.Height); //@@@: var xRect = new System.Drawing.Rectangle(rect.Left + rect.Width - 18, rect.Top, 18, rect.Height);
                if (xRect.Contains(e.Location)) { //@@@: if (xRect.Contains(e.Location))
                    let editor = tabReports.TabPages[i].Tag; //@@@: cEditor editor = (cEditor)tabReports.TabPages[i].Tag;
                    if (editor.close()) { //@@@: if (editor.close())
                        tabReports.TabPages.RemoveAt(i); //@@@: tabReports.TabPages.RemoveAt(i);
                        if (tabReports.TabPages.Count === 0) { //@@@: if (tabReports.TabPages.Count == 0)
                            cMainEditor.setDocActive(null); //@@@: cMainEditor.setDocActive(null);
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const mnuEditAddHeader_Click = function(sender, e) { //@@@: private void mnuEditAddHeader_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addSection(csRptSectionType.HEADER); //@@@: editor.addSection(csRptSectionType.HEADER);
            } //@@@: }
        }; //@@@: }

        const mnuEditAddGroup_Click = function(sender, e) { //@@@: private void mnuEditAddGroup_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addGroup(); //@@@: editor.addGroup();
            } //@@@: }
        }; //@@@: }

        const mnuEditAddFooter_Click = function(sender, e) { //@@@: private void mnuEditAddFooter_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addSection(csRptSectionType.FOOTER); //@@@: editor.addSection(csRptSectionType.FOOTER);
            } //@@@: }
        }; //@@@: }

        const mnuEditAddLabel_Click = function(sender, e) { //@@@: private void mnuEditAddLabel_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addLabel(); //@@@: editor.addLabel();
            } //@@@: }
        }; //@@@: }

        const mnuEditAddLine_Click = function(sender, e) { //@@@: private void mnuEditAddLine_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addLineLabel(); //@@@: editor.addLineLabel();
            } //@@@: }
        }; //@@@: }

        const mnuEditAddControl_Click = function(sender, e) { //@@@: private void mnuEditAddControl_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addDBField(); //@@@: editor.addDBField();
            } //@@@: }
        }; //@@@: }

        const mnuEditAddImage_Click = function(sender, e) { //@@@: private void mnuEditAddImage_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addImage(); //@@@: editor.addImage();
            } //@@@: }
        }; //@@@: }

        const mnuEditAddChart_Click = function(sender, e) { //@@@: private void mnuEditAddChart_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addChart(); //@@@: editor.addChart();
            } //@@@: }
        }; //@@@: }

        const mnuHelpAbout_Click = function(sender, e) { //@@@: private void mnuHelpAbout_Click(object sender, EventArgs e)
            cWindow.msgInfo( //@@@: cWindow.msgInfo(
UNKNOWN >>                 System.Reflection.Assembly.GetExecutingAssembly().GetName().Name  //@@@: System.Reflection.Assembly.GetExecutingAssembly().GetName().Name
                + " - Version "  //@@@: + " - Version "
                + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version //@@@: + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version
                + "\r\n\r\nhttps://github.com/javiercrowsoft/CSReports.net"); //@@@: + "\r\n\r\nhttps://github.com/javiercrowsoft/CSReports.net");
        }; //@@@: }

        const cmSectionAddSectionLine_Click = function(sender, e) { //@@@: private void cmSectionAddSectionLine_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.addSectionLine(); //@@@: editor.addSectionLine();
            } //@@@: }
        }; //@@@: }

        const deleteReportObject = function(isSectionLine) { //@@@: private void deleteReportObject(Boolean isSectionLine)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.deleteObj(isSectionLine); //@@@: editor.deleteObj(isSectionLine);
            } //@@@: }
        }; //@@@: }

        const cmSectionDeleteSection_Click = function(sender, e) { //@@@: private void cmSectionDeleteSection_Click(object sender, EventArgs e)
            deleteReportObject(false); //@@@: deleteReportObject(false);
        }; //@@@: }

        const cmSectionDeleteSectionLine_Click = function(sender, e) { //@@@: private void cmSectionDeleteSectionLine_Click(object sender, EventArgs e)
            deleteReportObject(true); //@@@: deleteReportObject(true);
        }; //@@@: }

        const cmSectionMoveGroup_Click = function(sender, e) { //@@@: private void cmSectionMoveGroup_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.moveGroup(); //@@@: editor.moveGroup();
            } //@@@: }
        }; //@@@: }

        const tsbDatabase_Click = function(sender, e) { //@@@: private void tsbDatabase_Click(object sender, EventArgs e)
            mnuDataBaseConnectConfig_Click(sender, e); //@@@: mnuDataBaseConnectConfig_Click(sender, e);
        }; //@@@: }

        const mnuDataBaseSetToMainConnect_Click = function(sender, e) { //@@@: private void mnuDataBaseSetToMainConnect_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.setAllConnectToMainConnect(); //@@@: editor.setAllConnectToMainConnect();
            } //@@@: }
        }; //@@@: }

        const alignText = function(align) { //@@@: private void alignText(CSReportGlobals.HorizontalAlignment align)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.textAlign(align); //@@@: editor.textAlign(align);
            } //@@@: }
        }; //@@@: }

        const tsbAlignLeft_Click = function(sender, e) { //@@@: private void tsbAlignLeft_Click(object sender, EventArgs e)
            alignText(CSReportGlobals.HorizontalAlignment.Left); //@@@: alignText(CSReportGlobals.HorizontalAlignment.Left);
        }; //@@@: }

        const tsbAligntCenter_Click = function(sender, e) { //@@@: private void tsbAligntCenter_Click(object sender, EventArgs e)
            alignText(CSReportGlobals.HorizontalAlignment.Center); //@@@: alignText(CSReportGlobals.HorizontalAlignment.Center);
        }; //@@@: }

        const tsbAlignRight_Click = function(sender, e) { //@@@: private void tsbAlignRight_Click(object sender, EventArgs e)
            alignText(CSReportGlobals.HorizontalAlignment.Right); //@@@: alignText(CSReportGlobals.HorizontalAlignment.Right);
        }; //@@@: }

        const tsbBold_Click = function(sender, e) { //@@@: private void tsbBold_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.setFontBold(); //@@@: editor.setFontBold();
            } //@@@: }
        }; //@@@: }

        const saveReport = function(saveAs) { //@@@: private void saveReport(Boolean saveAs)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.saveDocument(saveAs); //@@@: editor.saveDocument(saveAs);
                addToRecentList(editor.getFileName()); //@@@: addToRecentList(editor.getFileName());
            } //@@@: }
        }; //@@@: }

        const tsbSaveAs_Click = function(sender, e) { //@@@: private void tsbSaveAs_Click(object sender, EventArgs e)
            saveReport(true); //@@@: saveReport(true);
        }; //@@@: }

        const tsbSave_Click = function(sender, e) { //@@@: private void tsbSave_Click(object sender, EventArgs e)
            saveReport(false); //@@@: saveReport(false);
        }; //@@@: }

        const mnuSaveReport_Click = function(sender, e) { //@@@: private void mnuSaveReport_Click(object sender, EventArgs e)
            saveReport(false); //@@@: saveReport(false);
        }; //@@@: }

        const mnuReportSaveAs_Click = function(sender, e) { //@@@: private void mnuReportSaveAs_Click(object sender, EventArgs e)
            saveReport(true); //@@@: saveReport(true);
        }; //@@@: }

        const mnuPageSetup_Click = function(sender, e) { //@@@: private void mnuPageSetup_Click(object sender, EventArgs e)
            let pageSetup = new fPageSetup(); //@@@: fPageSetup pageSetup = new fPageSetup();
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                pageSetup.initDialog(editor.getPaperSize(), editor.getCustomHeight(), editor.getCustomWidth(), editor.getOrientation()); //@@@: pageSetup.initDialog(editor.getPaperSize(), editor.getCustomHeight(), editor.getCustomWidth(), editor.getOrientation());
            } //@@@: }

            pageSetup.ShowDialog(); //@@@: pageSetup.ShowDialog();

            if (pageSetup.getOk()) { //@@@: if (pageSetup.getOk())
                m_paperSize = pageSetup.getPaperSize(); //@@@: m_paperSize = (int)pageSetup.getPaperSize();
                m_paperSizeHeight = pageSetup.getCustomHeight(); //@@@: m_paperSizeHeight = pageSetup.getCustomHeight();
                m_paperSizeWidth = pageSetup.getCustomWidth(); //@@@: m_paperSizeWidth = pageSetup.getCustomWidth();
                m_orientation = pageSetup.getOrientation(); //@@@: m_orientation = pageSetup.getOrientation();
                if (editor !== null) { //@@@: if (editor != null)
                    editor.setPaperSize(m_paperSize); //@@@: editor.setPaperSize((csReportPaperType)m_paperSize);
                    editor.setOrientation(m_orientation); //@@@: editor.setOrientation(m_orientation);
                    editor.setCustomHeight(m_paperSizeHeight); //@@@: editor.setCustomHeight(m_paperSizeHeight);
                    editor.setCustomWidth(m_paperSizeWidth); //@@@: editor.setCustomWidth(m_paperSizeWidth);
                    editor.refreshReport(); //@@@: editor.refreshReport();
                } //@@@: }
            } //@@@: }
            pageSetup.Close(); //@@@: pageSetup.Close();
        }; //@@@: }

        const mnuPrinterSettings_Click = function(sender, e) { //@@@: private void mnuPrinterSettings_Click(object sender, EventArgs e)

        }; //@@@: }

        const mnuHideGrid_Click = function(sender, e) { //@@@: private void mnuHideGrid_Click(object sender, EventArgs e)

        }; //@@@: }

        const mnuGridLines_Click = function(sender, e) { //@@@: private void mnuGridLines_Click(object sender, EventArgs e)

        }; //@@@: }

        const mnuGridPoints_Click = function(sender, e) { //@@@: private void mnuGridPoints_Click(object sender, EventArgs e)

        }; //@@@: }

        const mnuOptionsTool_Click = function(sender, e) { //@@@: private void mnuOptionsTool_Click(object sender, EventArgs e)

        }; //@@@: }

        const copy = function() { //@@@: private void copy()
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.copy(); //@@@: editor.copy();
            } //@@@: }
        }; //@@@: }

        const mnuCopy_Click = function(sender, e) { //@@@: private void mnuCopy_Click(object sender, EventArgs e)
            copy(); //@@@: copy();
        }; //@@@: }

        const paste = function(dontMove) { //@@@: private void paste(Boolean dontMove)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.paste(false); //@@@: editor.paste(false);
            } //@@@: }
        }; //@@@: }

        const mnuPaste_Click = function(sender, e) { //@@@: private void mnuPaste_Click(object sender, EventArgs e)
            paste(false); //@@@: paste(false);
        }; //@@@: }

        const mnuPasteSpecial_Click = function(sender, e) { //@@@: private void mnuPasteSpecial_Click(object sender, EventArgs e)
            paste(true); //@@@: paste(true);
        }; //@@@: }

        const cmCtrlCopy_Click = function(sender, e) { //@@@: private void cmCtrlCopy_Click(object sender, EventArgs e)
            copy(); //@@@: copy();
        }; //@@@: }

        const cmCtrlPaste_Click = function(sender, e) { //@@@: private void cmCtrlPaste_Click(object sender, EventArgs e)
            paste(false); //@@@: paste(false);
        }; //@@@: }

        const cmCtrlPasteEx_Click = function(sender, e) { //@@@: private void cmCtrlPasteEx_Click(object sender, EventArgs e)
            paste(true); //@@@: paste(true);
        }; //@@@: }

        const cmCtrlDelete_Click = function(sender, e) { //@@@: private void cmCtrlDelete_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.deleteObj(false); //@@@: editor.deleteObj(false);
            } //@@@: }
        }; //@@@: }

        const printReport = function() { //@@@: private void printReport()
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.printReport(); //@@@: editor.printReport();
            } //@@@: }
        }; //@@@: }

        const tsbPrint_Click = function(sender, e) { //@@@: private void tsbPrint_Click(object sender, EventArgs e)
            printReport(); //@@@: printReport();
        }; //@@@: }

        const mnuPrintReport_Click = function(sender, e) { //@@@: private void mnuPrintReport_Click(object sender, EventArgs e)
            printReport(); //@@@: printReport();
        }; //@@@: }

        const cmCtrlBringFront_Click = function(sender, e) { //@@@: private void cmCtrlBringFront_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.bringToFront(); //@@@: editor.bringToFront();
            } //@@@: }
        }; //@@@: }

        const cmCtrlSendBack_Click = function(sender, e) { //@@@: private void cmCtrlSendBack_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.sendToBack(); //@@@: editor.sendToBack();
            } //@@@: }
        }; //@@@: }

        const lockToolStripMenuItem_Click = function(sender, e) { //@@@: private void lockToolStripMenuItem_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.moveNoMove(); //@@@: editor.moveNoMove();
                lockToolStripMenuItem.Checked = !lockToolStripMenuItem.Checked; //@@@: lockToolStripMenuItem.Checked = !lockToolStripMenuItem.Checked;
                if (lockToolStripMenuItem.Checked) { //@@@: if (lockToolStripMenuItem.Checked)
                    lockToolStripMenuItem.Text = "Unlock"; //@@@: lockToolStripMenuItem.Text = "Unlock";
                } //@@@: }
                else { //@@@: else
                    lockToolStripMenuItem.Text = "Unlock"; //@@@: lockToolStripMenuItem.Text = "Unlock";
                }                 //@@@: }
            } //@@@: }
        }; //@@@: }

        const verticalToolStripMenuItem_Click = function(sender, e) { //@@@: private void verticalToolStripMenuItem_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.moveVertical(); //@@@: editor.moveVertical();
                horizontalToolStripMenuItem.Checked = false; //@@@: horizontalToolStripMenuItem.Checked = false;
                verticalToolStripMenuItem.Checked = true; //@@@: verticalToolStripMenuItem.Checked = true;
                allDirectionsToolStripMenuItem.Checked = false; //@@@: allDirectionsToolStripMenuItem.Checked = false;
            } //@@@: }
        }; //@@@: }

        const horizontalToolStripMenuItem_Click = function(sender, e) { //@@@: private void horizontalToolStripMenuItem_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.moveHorizontal(); //@@@: editor.moveHorizontal();
                horizontalToolStripMenuItem.Checked = true; //@@@: horizontalToolStripMenuItem.Checked = true;
                verticalToolStripMenuItem.Checked = false; //@@@: verticalToolStripMenuItem.Checked = false;
                allDirectionsToolStripMenuItem.Checked = false; //@@@: allDirectionsToolStripMenuItem.Checked = false;
            } //@@@: }
        }; //@@@: }

        const allDirectionsToolStripMenuItem_Click = function(sender, e) { //@@@: private void allDirectionsToolStripMenuItem_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.moveAll(); //@@@: editor.moveAll();
                horizontalToolStripMenuItem.Checked = false; //@@@: horizontalToolStripMenuItem.Checked = false;
                verticalToolStripMenuItem.Checked = false; //@@@: verticalToolStripMenuItem.Checked = false;
                allDirectionsToolStripMenuItem.Checked = true; //@@@: allDirectionsToolStripMenuItem.Checked = true;
            } //@@@: }
        }; //@@@: }

        const tsbCtrlAlignLeft_Click = function(sender, e) { //@@@: private void tsbCtrlAlignLeft_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignLeft); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignLeft);
            } //@@@: }
        }; //@@@: }

        const tsbCtrlAlignRight_Click = function(sender, e) { //@@@: private void tsbCtrlAlignRight_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignRight); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignRight);
            } //@@@: }
        }; //@@@: }

        const tsbCtrlAlignTop_Click = function(sender, e) { //@@@: private void tsbCtrlAlignTop_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignTop); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignTop);
            } //@@@: }
        }; //@@@: }

        const tsbCtrlAlignBottom_Click = function(sender, e) { //@@@: private void tsbCtrlAlignBottom_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignBottom); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignBottom);
            } //@@@: }
        }; //@@@: }

        const tsbCtrlSameHeight_Click = function(sender, e) { //@@@: private void tsbCtrlSameHeight_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHeight); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignHeight);
            } //@@@: }
        }; //@@@: }

        const tsbCtrlSameWidth_Click = function(sender, e) { //@@@: private void tsbCtrlSameWidth_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignWidth); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignWidth);
            } //@@@: }
        }; //@@@: }

        const tsbCtrlSameLeft_Click = function(sender, e) { //@@@: private void tsbCtrlSameLeft_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHorizontal); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignHorizontal);
            } //@@@: }
        }; //@@@: }

        const tsbCtrlSameTop_Click = function(sender, e) { //@@@: private void tsbCtrlSameTop_Click(object sender, EventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.controlsAlign(csECtlAlignConst.csECtlAlignVertical); //@@@: editor.controlsAlign(csECtlAlignConst.csECtlAlignVertical);
            } //@@@: }
        }; //@@@: }

        const fMain_KeyUp = function(sender, e) { //@@@: private void fMain_KeyUp(object sender, KeyEventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.keyUp(sender, e); //@@@: editor.keyUp(sender, e);
            } //@@@: }
        }; //@@@: }

        const fMain_KeyDown = function(sender, e) { //@@@: private void fMain_KeyDown(object sender, KeyEventArgs e)
            let editor = cMainEditor.getDocActive(); //@@@: cEditor editor = cMainEditor.getDocActive();
            if (editor !== null) { //@@@: if (editor != null)
                editor.keyDown(sender, e); //@@@: editor.keyDown(sender, e);
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
