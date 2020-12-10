(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFMain = function() {

        // @ts-ignore
        let self: CSReportEditor.IfMain = {};
        // TODO: remove me
        //static fMain instance;

        const C_MODULE: string = "fMain";

        const MRU_FILE: string = "mru.settings";

        let m_paperSize: number = 0;
        let m_paperSizeWidth: number = 0;
        let m_paperSizeHeight: number = 0;
        let m_orientation: number = 0;
        let m_printerName: string = "";
        let m_driverName: string = "";
        let m_port: string = "";
        let m_sourceEditor: cEditor = null;

        let m_wasDoubleClick: boolean = false;

        const C_CTRL_IMAGE: number = 1;
        const C_DB_IMAGE: number = 0;

        const C_IMG_FOLDER: number = 0;
        const C_IMG_FORMULA: number = 3;
        const C_IMG_CONTROL: number = 2;
        const C_IMG_DATBASE_FIELD: number = 1;

        const C_FIELDTYPE: string = "t";
        const C_INDEX: string = "i";

        let m_contextMenuEditor: cEditor = null;

        let lvwColumnSorter: cListViewColumnSorter = null;

        const fMain = function() {
            InitializeComponent();

            // it is the first thing we need to do
            //
            CSKernelClient.cUtil.setSepDecimal();

            let printer: cPrinter = cPrintAPI.getcPrinterFromDefaultPrinter(this.printDlg);
            m_paperSize = printer.getPaperInfo().getPaperSize();
            m_paperSizeHeight = Convert.ToInt32(printer.getPaperInfo().getHeight());
            m_paperSizeWidth = Convert.ToInt32(printer.getPaperInfo().getHeight());
        };

        self.init = function() {
            let editor: cEditor = new cEditor(this, pnEditor, pnRule, pnReport, tbpEditor);
            editor.init();
            editor.newReport(null);        
        };

        self.getReportCopySource = function() {
            return m_sourceEditor;
        };

        const createEditor = function() {
            let tab: TabPage = new TabPage();
            let pnEditor: Panel = new Panel();
            let pnRule: PictureBox = new PictureBox();
            let pnReport: PictureBox = new PictureBox();

            pnEditor.Controls.Add(pnRule);
            pnEditor.Controls.Add(pnReport);
            tab.Controls.Add(pnEditor);
            pnEditor.Dock = DockStyle.Fill;
            tabReports.TabPages.Add(tab);
            tab.Text = "New Report [X]";

            return new cEditor(this, pnEditor, pnRule, pnReport, tab);
        };

        const mnuNewReport_Click = function(sender, e) {
            let editor: cEditor = createEditor();
            editor.init();
            editor.newReport(null);
        };

        const tsbNew_Click = function(sender, e) {
            mnuNewReport_Click(sender, e);
        };

        self.setEditAlignTextState = function(status) {
            let buttons: var = this.tbMain.Items;

            buttons[cGlobals.c_BTN_ALIGN_CENTER].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_RIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_FONT_BOLD].Enabled = status;
        };

        self.setEditAlignCtlState = function(status) {
            let buttons: var = this.tbMain.Items;

            buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_HEIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_WIDTH].Enabled = status;
        };

        self.setMenuAux = function(enabled) {
            this.mnuEditAddControl.Enabled = enabled;
            this.mnuEditAddHeader.Enabled = enabled;
            this.mnuEditAddLabel.Enabled = enabled;
            this.mnuEditAddGroup.Enabled = enabled;
            this.mnuEditAddFooter.Enabled = enabled;
            this.mnuEditAddLine.Enabled = enabled;
            this.mnuEditAddSec.Enabled = enabled;
            this.mnuEditMove.Enabled = enabled;
            this.mnuDataBaseEditDataSource.Enabled = enabled;
            this.mnuPreviewReport.Enabled = enabled;
            this.mnuPrintReport.Enabled = enabled;
            this.mnuSaveReport.Enabled = enabled;
            this.mnuReportSaveAs.Enabled = enabled;
            this.mnuDataBaseSetDisconnected.Enabled = enabled;
            this.mnuEditSearch.Enabled = enabled;
            this.mnuDataBaseSQLServerConnection.Enabled = enabled;
            this.mnuDataBaseSetToMainConnect.Enabled = enabled;
            this.mnuDataBaseEditDataSource.Enabled = enabled;
            this.mnuDataBaseConnectsAuxCfg.Enabled = enabled;
            this.mnuHideGrid.Enabled = enabled;
            this.mnuViewToolbar.Enabled = enabled;
            this.mnuViewControls.Enabled = enabled;
            this.mnuViewTreeViewCtrls.Enabled = enabled;

            let buttons: var = this.tbMain.Items;
            tsbPrint.Enabled = enabled;
            tsbProperties.Enabled = enabled;
            tsbDatabase.Enabled = enabled;
            tsbSave.Enabled = enabled;
            tsbControls.Enabled = enabled;
            tsbPreview.Enabled = enabled;
            tsbSearch.Enabled = enabled;
        };

        self.addToRecentList = function(fileName) {
            let i: number = 0;
            let j: number = 0;
            let found: boolean = false;
            let menuItems: var = this.mnuFileRecentList.DropDownItems;

            for (i = 0; i < menuItems.Count; i++) {
                if (fileName === menuItems[i].Text) {
                    j = i;
                    found = true;
                    break;
                }
            }

            if (menuItems.Count < cGlobals.C_TOTINRECENTLIST && !found) {
                let menu: var = this.mnuFileRecentList.DropDownItems.Add("");
                menu.Visible = true;
                menu.Click += mnuRecentClick;
            }

            if (!found) { j = menuItems.Count - 1; }

            for (i = j; i > 0; i--) {
                menuItems[i].Text = menuItems[i - 1].Text;
            }

            menuItems[0].Text = fileName;

            saveRecentList();
        };

        const getMRUFileName = function() {
            let path: var = System.Environment.SpecialFolder.LocalApplicationData;
            return Environment.GetFolderPath(path) + Path.DirectorySeparatorChar + MRU_FILE;
        };

        const loadRecentListFromUserSettings = function() {
            let fileName: var = getMRUFileName();
            if (File.Exists(fileName)) {
                let lines: var = File.ReadAllLines(fileName);
                loadRecentList(lines.ToList());
            }
        };

        const loadRecentList = function(recentList) {
            let i: number = 0;
            let recent: string = "";

            for (i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++) {
                recent = recentList[i];
                let menu: var = this.mnuFileRecentList.DropDownItems.Add(recent);
                menu.Visible = true;
                menu.Click += mnuRecentClick;
            }

            if (this.mnuFileRecentList.DropDownItems.Count > 0) {
                this.mnuFileRecentList.Visible = true;
            }
        };

        const mnuRecentClick = function(sender, e) {
            let mnu: ToolStripMenuItem = sender;
            let editor: cEditor = createEditor();
            editor.init();
            if (editor.openDocument(mnu.Text)) {
                addToRecentList(editor.getFileName());
            }
        };

        const saveRecentList = function() {
            let i: number = 0;
            let mruList: string = "";

            for (i = 0; i < mnuFileRecentList.DropDownItems.Count; i++) {
                mruList += mnuFileRecentList.DropDownItems[i].Text + Environment.NewLine;
            }

            let fileName: var = getMRUFileName();
            File.WriteAllText(fileName, mruList);
        };

        self.setStatus = function(status) {
            // TODO: implement
        };

        self.setBarText = function(text) {
            // TODO: implement
        };

        self.setDisconnectedReport = function(isDisconnectedReport) {
            // TODO: implement
        };

		self.setsbPnlCtrl = function(msg) {
            cGlobals.implementThisMessage("setsbPnlCtrl", "(fMain)");
		};

        self.setReportCopySource = function(editor) {
            m_sourceEditor = editor;
        };

        self.getPaperSize = function() {
            return m_paperSize;
        };

        self.getOrientation = function() {
            return m_orientation;
        };

        const mnuOpenReport_Click = function(sender, e) {
            try {

                let editor: cEditor = createEditor();

                editor.init();

                if (editor.openDocument()) {
                    addToRecentList(editor.getFileName());
                }

            } catch (Exception ex) {
                cError.mngError(ex, "mnuOpenReport_Click", C_MODULE, "");
            }
        };

        const tsbOpen_Click = function(sender, e) {
            mnuOpenReport_Click(sender, e);
        };

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public OpenFileDialog openFileDialog 
        {
UNKNOWN >>             get
            {
                return openFileDlg;
            }
        }

UNKNOWN >>         public SaveFileDialog saveFileDialog
        {
UNKNOWN >>             get
            {
                return saveFielDlg;
            }            
        }

UNKNOWN >>         public PrintDialog printDialog
        {
UNKNOWN >>             get
            {
                return printDlg;
            }
        }

        const fMain_Load = function(sender, e) {
            cPrintAPI.getDefaultPrinter(
                m_printerName, m_driverName, m_port, 
                m_paperSize, m_orientation, m_paperSizeWidth, 
                m_paperSizeHeight);

            //
            // remove me and implement a better window position code
            //
            this.Width = 1200;
            this.Height = 900;
            cWindow.centerForm(this);

            // Create an instance of a ListView column sorter and assign it 
            // to the ListView control.
            lvwColumnSorter = globalObject.CSKernelClient.createCListViewColumnSorter();
            lv_controls.ListViewItemSorter = lvwColumnSorter;
            lv_controls_ColumnClick(this, new ColumnClickEventArgs(0));

            loadRecentListFromUserSettings();
        };

        const cmCtrlProperties_Click = function(sender, e) {
            if (m_contextMenuEditor !== null)  {
                m_contextMenuEditor.showProperties();
            }
        };

        self.showPopMenuSection = function(editor, noDelete, showGroups, p) {
            cmSectionDeleteSection.Enabled = !noDelete;
            cmSectionGroupProperties.Visible = showGroups;
            cmSectionMoveGroup.Visible = showGroups;
            cmSectionGroupSeparator.Visible = showGroups;

            m_contextMenuEditor = editor;

            cmnSection.Show(p);
        };

        self.showPopMenuControl = function(editor, clickInCtrl, pasteEnabled, p) {
            cmCtrlCopy.Enabled = clickInCtrl;
            cmCtrlDelete.Enabled = clickInCtrl;
            cmCtrlEditText.Enabled = clickInCtrl;
            cmCtrlSendBack.Enabled = clickInCtrl;
            cmCtrlBringFront.Enabled = clickInCtrl;
            cmCtrlProperties.Enabled = clickInCtrl;

            cmCtrlPaste.Enabled = pasteEnabled;
            cmCtrlPasteEx.Enabled = pasteEnabled;

            m_contextMenuEditor = editor;

            cmnControl.Show(p);
        };

        const cmSectionSectionProperties_Click = function(sender, e) {
            if (m_contextMenuEditor !== null) {
                m_contextMenuEditor.showProperties();
            }
        };

        const cmSectionSectionLineProperties_Click = function(sender, e) {
            if (m_contextMenuEditor !== null) {
                m_contextMenuEditor.showSecLnProperties();
            }
        };

        const cmSectionGroupProperties_Click = function(sender, e) {
            if (m_contextMenuEditor !== null) {
                m_contextMenuEditor.showGroupProperties();
            }
        };

        const mnuViewTreeViewCtrls_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showControlsTree();
            }
        };

        const mnuViewControls_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showControls();
            }
        };

        const mnuViewToolbar_Click = function(sender, e) {
            showToolbox();
        };

        const tsbControls_Click = function(sender, e) {
            showToolbox();
        };

        const showToolbox = function() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showToolbox();
            }
        };

        const tsbSearch_Click = function(sender, e) {
            search();
        };

        const mnuEditSearch_Click = function(sender, e) {
            search();
        };

        const search = function() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.search();
            }
        };

        const tsbProperties_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showProperties();
            }
        };

        const mnuDataBaseSQLServerConnection_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setSimpleConnection();
            }
        };

        const mnuDataBaseConnectConfig_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.editConnectionString();
            }
        };

        const mnuDataBaseEditDataSource_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.editDataSource();
            }
        };

        const mnuExit_Click = function(sender, e) {
            this.Close();
        };

        const mnuParametersSettings_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setParameters();
            }
        };

        self.showControls = function(editor) {
            lv_controls.Items.Clear();

            if (editor !== null) {
                cGlobals.addCtrls(editor.getReport(), lv_controls, C_CTRL_IMAGE, C_DB_IMAGE);
            }
        };

        self.showControlsTree = function(editor) {
            m_wasDoubleClick = false;
            tv_controls.Nodes.Clear();

            if (editor !== null) {
                cGlobals.addCtrls(editor.getReport(), tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);
            }            
        };

        self.showProperties = function(editor, key) {
            lv_properties.Items.Clear();
            if (editor !== null) {
                setObjectDescription(getControlOrSection(editor, key));
            }
        };

        const getControlOrSection = function(editor, key) {
            if (key.Length > 1) {
                if (key.Substring(0, 1) === "S") {
                    return editor.getSectionOrSectionLineFromKey(key.Substring(1));
                }
                else  {
                    return editor.getReport().getControls().item(key);
                }
            }
            else  {
                return null;
            }
        };

        const setObjectDescription = function(anObject) {
            setObjectDescription(anObject, 0);
        };

        const setObjectDescription = function(anObject, n) {
            if (anObject === null) return; {

            let tabs: var = new String(' ', n*2);
            let methods: var = getMethods(anObject);
            for(var i_ = 0; i_ < methods.length; i_++) {
                if (m.IsPublic
                    && m.Name.Length > 3
                    && m.Name.Substring(0, 3) === "get"
                    && m.Name.Substring(0, 4) !== "get_"
                    && m.GetParameters().Length === 0
                    && m.Name !== "getSectionLine"
                    ) {
                    let item: var = lv_properties.Items.Add(tabs + m.Name.Substring(3));
                    item.ImageIndex = C_IMG_CONTROL;
                    item.SubItems.Add(getValue(m.Invoke(anObject, null), n));
                    if (item.SubItems[1].Text === "...") item.ImageIndex = C_IMG_FOLDER; {
                }
            }
        };

        const getValue = function(value, n) {
            if (n > 10) return ""; {

            if (value === null) {
                return "NULL";
            }
            else {
                let t: var = value.GetType();
                if (t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) {
                    return value.ToString();
                }
                else {
                    setObjectDescription(value, n + 1);
                    return "...";
                }
            }
        };

        const getMethods = function(obj) {
            return obj.GetType().GetMethods();
        };

        self.showFields = function(editor) {
            lv_fields.Items.Clear();

            if (editor !== null) {
                let connect: var = editor.getReport().getConnect();
                cGlobals.fillColumns(
                    connect.getDataSource(),
                    connect.getColumns(), lv_fields, C_INDEX, C_FIELDTYPE, false);
            }            
        };

        const lv_controls_ColumnClick = function(sender, e) {
            // Determine if clicked column is already the column that is being sorted.
            if (e.Column === lvwColumnSorter.SortColumn) {
                // Reverse the current sort direction for this column.
                if (lvwColumnSorter.Order === SortOrder.Ascending) {
                    lvwColumnSorter.Order = SortOrder.Descending;
                }
                else {
                    lvwColumnSorter.Order = SortOrder.Ascending;
                }
            }
            else {
                // Set the column number that is to be sorted; default to ascending.
                lvwColumnSorter.SortColumn = e.Column;
                lvwColumnSorter.Order = SortOrder.Ascending;
            }

            // Perform the sort with these new sort options.
            lv_controls.Sort();
        };

        const lv_controls_MouseClick = function(sender, e) {
            selectControl();
        };

        const lv_controls_KeyUp = function(sender, e) {
            selectControl();
        };

        const selectControl = function() {
            let editor: cEditor = cMainEditor.getDocActive();

            if (lv_controls.SelectedItems.Count > 0 && editor !== null) {
                let info: var = lv_controls.SelectedItems[0].Tag.ToString();
                editor.selectCtrl(info);
            }
        };

        const tv_controls_NodeMouseClick = function(sender, e) {
            selectControl(e.Node);
        };

        const selectControl = function(node) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (node !== null && node.Tag !== null && editor !== null) {
                let info: var = node.Tag.ToString();
                if (info.Length > 0) {
                    let infoType: var = info.Substring(0, 1);
                    if ("@SL".IndexOf(infoType) === -1) {
                        editor.selectCtrl(info);
                    }
                    else if (infoType === "S" || infoType === "L") {
                        editor.selectSection(info.Substring(1));
                    }
                }
            }
        };

        const tv_controls_KeyUp = function(sender, e) {
            selectControl(tv_controls.SelectedNode);
        };

        const tv_controls_MouseDoubleClick = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (tv_controls.SelectedNode !== null && editor !== null) {
                if (tv_controls.SelectedNode.Tag !== null) {
                    let info: var = tv_controls.SelectedNode.Tag.ToString();
                    if (info.Length > 0) {
                        let infoType: var = info.Substring(0, 1);
                        if ("@".IndexOf(infoType) === -1) {
                            editor.showProperties(info);
                        }
                    }
                }
            }
        };

        const tv_controls_MouseDown = function(sender, e) {
            m_wasDoubleClick = e.Clicks > 1;
        };

        const tv_controls_BeforeCollapse = function(sender, e) {
            if (m_wasDoubleClick === true && e.Action === TreeViewAction.Collapse) {
                e.Cancel = true;
        };

        const tv_controls_BeforeExpand = function(sender, e) {
            if (m_wasDoubleClick === true && e.Action === TreeViewAction.Expand) {
                e.Cancel = true;
        };

        const lv_controls_MouseDoubleClick = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (lv_controls.SelectedItems.Count > 0 && editor !== null) {
                let info: var = lv_controls.SelectedItems[0].Tag.ToString();
                editor.showProperties(info);
            }
        };

        const mnuPreviewReport_Click = function(sender, e) {
            previewReport();
        };

        const tsbPreview_Click = function(sender, e) {
            previewReport();
        };

        const previewReport = function() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.preview();
            }        
        };


        const tabReports_MouseClick = function(sender, e) {
            for(var i = 0; i < tabReports.TabCount; ++i) {
                let rect: var = tabReports.GetTabRect(i);
                let xRect: var = new System.Drawing.Rectangle(rect.Left + rect.Width - 18, rect.Top, 18, rect.Height);
                if (xRect.Contains(e.Location)) {
                    let editor: cEditor = tabReports.TabPages[i].Tag;
                    if (editor.close()) {
                        tabReports.TabPages.RemoveAt(i);
                        if (tabReports.TabPages.Count === 0) {
                            cMainEditor.setDocActive(null);
                        }
                    }
                }
            }
        };

        const mnuEditAddHeader_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSection(csRptSectionType.HEADER);
            }
        };

        const mnuEditAddGroup_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addGroup();
            }
        };

        const mnuEditAddFooter_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSection(csRptSectionType.FOOTER);
            }
        };

        const mnuEditAddLabel_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addLabel();
            }
        };

        const mnuEditAddLine_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addLineLabel();
            }
        };

        const mnuEditAddControl_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addDBField();
            }
        };

        const mnuEditAddImage_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addImage();
            }
        };

        const mnuEditAddChart_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addChart();
            }
        };

        const mnuHelpAbout_Click = function(sender, e) {
            cWindow.msgInfo(
UNKNOWN >>                 System.Reflection.Assembly.GetExecutingAssembly().GetName().Name 
                + " - Version " 
                + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version
                + "\r\n\r\nhttps://github.com/javiercrowsoft/CSReports.net");
        };

        const cmSectionAddSectionLine_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSectionLine();
            }
        };

        const deleteReportObject = function(isSectionLine) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.deleteObj(isSectionLine);
            }
        };

        const cmSectionDeleteSection_Click = function(sender, e) {
            deleteReportObject(false);
        };

        const cmSectionDeleteSectionLine_Click = function(sender, e) {
            deleteReportObject(true);
        };

        const cmSectionMoveGroup_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveGroup();
            }
        };

        const tsbDatabase_Click = function(sender, e) {
            mnuDataBaseConnectConfig_Click(sender, e);
        };

        const mnuDataBaseSetToMainConnect_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setAllConnectToMainConnect();
            }
        };

        const alignText = function(align) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.textAlign(align);
            }
        };

        const tsbAlignLeft_Click = function(sender, e) {
            alignText(CSReportGlobals.HorizontalAlignment.Left);
        };

        const tsbAligntCenter_Click = function(sender, e) {
            alignText(CSReportGlobals.HorizontalAlignment.Center);
        };

        const tsbAlignRight_Click = function(sender, e) {
            alignText(CSReportGlobals.HorizontalAlignment.Right);
        };

        const tsbBold_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setFontBold();
            }
        };

        const saveReport = function(saveAs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.saveDocument(saveAs);
                addToRecentList(editor.getFileName());
            }
        };

        const tsbSaveAs_Click = function(sender, e) {
            saveReport(true);
        };

        const tsbSave_Click = function(sender, e) {
            saveReport(false);
        };

        const mnuSaveReport_Click = function(sender, e) {
            saveReport(false);
        };

        const mnuReportSaveAs_Click = function(sender, e) {
            saveReport(true);
        };

        const mnuPageSetup_Click = function(sender, e) {
            let pageSetup: fPageSetup = new fPageSetup();
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                pageSetup.initDialog(editor.getPaperSize(), editor.getCustomHeight(), editor.getCustomWidth(), editor.getOrientation());
            }

            pageSetup.ShowDialog();

            if (pageSetup.getOk()) {
                m_paperSize = pageSetup.getPaperSize();
                m_paperSizeHeight = pageSetup.getCustomHeight();
                m_paperSizeWidth = pageSetup.getCustomWidth();
                m_orientation = pageSetup.getOrientation();
                if (editor !== null) {
                    editor.setPaperSize(m_paperSize);
                    editor.setOrientation(m_orientation);
                    editor.setCustomHeight(m_paperSizeHeight);
                    editor.setCustomWidth(m_paperSizeWidth);
                    editor.refreshReport();
                }
            }
            pageSetup.Close();
        };

        const mnuPrinterSettings_Click = function(sender, e) {

        };

        const mnuHideGrid_Click = function(sender, e) {

        };

        const mnuGridLines_Click = function(sender, e) {

        };

        const mnuGridPoints_Click = function(sender, e) {

        };

        const mnuOptionsTool_Click = function(sender, e) {

        };

        const copy = function() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.copy();
            }
        };

        const mnuCopy_Click = function(sender, e) {
            copy();
        };

        const paste = function(dontMove) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.paste(false);
            }
        };

        const mnuPaste_Click = function(sender, e) {
            paste(false);
        };

        const mnuPasteSpecial_Click = function(sender, e) {
            paste(true);
        };

        const cmCtrlCopy_Click = function(sender, e) {
            copy();
        };

        const cmCtrlPaste_Click = function(sender, e) {
            paste(false);
        };

        const cmCtrlPasteEx_Click = function(sender, e) {
            paste(true);
        };

        const cmCtrlDelete_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.deleteObj(false);
            }
        };

        const printReport = function() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.printReport();
            }
        };

        const tsbPrint_Click = function(sender, e) {
            printReport();
        };

        const mnuPrintReport_Click = function(sender, e) {
            printReport();
        };

        const cmCtrlBringFront_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.bringToFront();
            }
        };

        const cmCtrlSendBack_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.sendToBack();
            }
        };

        const lockToolStripMenuItem_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveNoMove();
                lockToolStripMenuItem.Checked = !lockToolStripMenuItem.Checked;
                if (lockToolStripMenuItem.Checked) {
                    lockToolStripMenuItem.Text = "Unlock";
                }
                else {
                    lockToolStripMenuItem.Text = "Unlock";
                }                
            }
        };

        const verticalToolStripMenuItem_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveVertical();
                horizontalToolStripMenuItem.Checked = false;
                verticalToolStripMenuItem.Checked = true;
                allDirectionsToolStripMenuItem.Checked = false;
            }
        };

        const horizontalToolStripMenuItem_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveHorizontal();
                horizontalToolStripMenuItem.Checked = true;
                verticalToolStripMenuItem.Checked = false;
                allDirectionsToolStripMenuItem.Checked = false;
            }
        };

        const allDirectionsToolStripMenuItem_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveAll();
                horizontalToolStripMenuItem.Checked = false;
                verticalToolStripMenuItem.Checked = false;
                allDirectionsToolStripMenuItem.Checked = true;
            }
        };

        const tsbCtrlAlignLeft_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignLeft);
            }
        };

        const tsbCtrlAlignRight_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignRight);
            }
        };

        const tsbCtrlAlignTop_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignTop);
            }
        };

        const tsbCtrlAlignBottom_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignBottom);
            }
        };

        const tsbCtrlSameHeight_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHeight);
            }
        };

        const tsbCtrlSameWidth_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignWidth);
            }
        };

        const tsbCtrlSameLeft_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHorizontal);
            }
        };

        const tsbCtrlSameTop_Click = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignVertical);
            }
        };

        const fMain_KeyUp = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.keyUp(sender, e);
            }
        };

        const fMain_KeyDown = function(sender, e) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.keyDown(sender, e);
            }
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfMain {

    init: () => void;
    getReportCopySource: () => cEditor;
    setEditAlignTextState: (bool) => void;
    setEditAlignCtlState: (bool) => void;
    setMenuAux: (bool) => void;
    addToRecentList: (String) => void;
    setStatus: (String) => void;
    setBarText: (String) => void;
    setDisconnectedReport: (bool) => void;
    setsbPnlCtrl: (string) => void;
    setReportCopySource: (cEditor) => void;
    getPaperSize: () => csReportPaperType;
    getOrientation: () => int;
    showPopMenuSection: (cEditor, bool, bool, Point) => void;
    showPopMenuControl: (cEditor, bool, bool, Point) => void;
    showControls: (cEditor) => void;
    showControlsTree: (cEditor) => void;
    showProperties: (cEditor, string) => void;
    showFields: (cEditor) => void;
  }
}
