

namespace CSReportEditor
{
    export class fMain {


    {
        // TODO: remove me
        //static fMain instance;

        private C_MODULE: string = "fMain";

        private MRU_FILE: string = "mru.settings";

        private paperSize: number = 0;
        private paperSizeWidth: number = 0;
        private paperSizeHeight: number = 0;
        private orientation: number = 0;
        private printerName: string = "";
        private driverName: string = "";
        private port: string = "";
        private sourceEditor: cEditor = null;

        private wasDoubleClick: boolean = false;

        private C_CTRL_IMAGE: number = 1;
        private C_DB_IMAGE: number = 0;

        private C_IMG_FOLDER: number = 0;
        private C_IMG_FORMULA: number = 3;
        private C_IMG_CONTROL: number = 2;
        private C_IMG_DATBASE_FIELD: number = 1;

        private C_FIELDTYPE: string = "t";
        private C_INDEX: string = "i";

        private contextMenuEditor: cEditor = null;

        private lvwColumnSorter: cListViewColumnSorter = null;

        public constructor() {
            InitializeComponent();

            // it is the first thing we need to do
            //
            CSKernelClient.cUtil.setSepDecimal();

            let printer: cPrinter = cPrintAPI.getcPrinterFromDefaultPrinter(this.printDlg);
            this.paperSize = printer.getPaperInfo().getPaperSize();
            this.paperSizeHeight = Math.trunc(printer.getPaperInfo().getHeight());
            this.paperSizeWidth = Math.trunc(printer.getPaperInfo().getHeight());
        }

        public init() {
            let editor: cEditor = new cEditor(this, pnEditor, pnRule, pnReport, tbpEditor);
            editor.init();
            editor.newReport(null);        
        }

        public getReportCopySource() {
            return this.sourceEditor;
        }

        private createEditor() {
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
        }

        private mnuNewReport_Click(sender: object, e: EventArgs) {
            let editor: cEditor = createEditor();
            editor.init();
            editor.newReport(null);
        }

        private tsbNew_Click(sender: object, e: EventArgs) {
            mnuNewReport_Click(sender, e);
        }

        public setEditAlignTextState(status: boolean) {
            let buttons = this.tbMain.Items;

            buttons[cGlobals.c_BTN_ALIGN_CENTER].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_ALIGN_RIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_FONT_BOLD].Enabled = status;
        }

        public setEditAlignCtlState(status: boolean) {
            let buttons = this.tbMain.Items;

            buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].Enabled = status;

            buttons[cGlobals.c_BTN_CTL_HEIGHT].Enabled = status;
            buttons[cGlobals.c_BTN_CTL_WIDTH].Enabled = status;
        }

        public setMenuAux(enabled: boolean) {
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

            let buttons = this.tbMain.Items;
            tsbPrint.Enabled = enabled;
            tsbProperties.Enabled = enabled;
            tsbDatabase.Enabled = enabled;
            tsbSave.Enabled = enabled;
            tsbControls.Enabled = enabled;
            tsbPreview.Enabled = enabled;
            tsbSearch.Enabled = enabled;
        }

        public addToRecentList(fileName: string) {
            let i: number = 0;
            let j: number = 0;
            let found: boolean = false;
            let menuItems = this.mnuFileRecentList.DropDownItems;

            for (i = 0; i < menuItems.Count; i++) {
                if (fileName === menuItems[i].Text) {
                    j = i;
                    found = true;
                    break;
                }
            }

            if (menuItems.Count < cGlobals.C_TOTINRECENTLIST && !found) {
                let menu = this.mnuFileRecentList.DropDownItems.Add("");
                menu.Visible = true;
                menu.Click += mnuRecentClick;
            }

            if (!found) { j = menuItems.Count - 1; }

            for (i = j; i > 0; i--) {
                menuItems[i].Text = menuItems[i - 1].Text;
            }

            menuItems[0].Text = fileName;

            saveRecentList();
        }

        private getMRUFileName() {
            let path = System.Environment.SpecialFolder.LocalApplicationData;
            return Environment.GetFolderPath(path) + Path.DirectorySeparatorChar + MRU_FILE;
        }

        private loadRecentListFromUserSettings() {
            let fileName = getMRUFileName();
            if (File.Exists(fileName)) {
                let lines = File.ReadAllLines(fileName);
                loadRecentList(lines.ToList());
            }
        }

        private loadRecentList(recentList: List<String>) {
            let i: number = 0;
            let recent: string = "";

            for (i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++) {
                recent = recentList[i];
                let menu = this.mnuFileRecentList.DropDownItems.Add(recent);
                menu.Visible = true;
                menu.Click += mnuRecentClick;
            }

            if (this.mnuFileRecentList.DropDownItems.Count > 0) {
                this.mnuFileRecentList.Visible = true;
            }
        }

        private mnuRecentClick(sender: object, e: EventArgs) {
            let mnu: ToolStripMenuItem = sender;
            let editor: cEditor = createEditor();
            editor.init();
            if (editor.openDocument(mnu.Text)) {
                addToRecentList(editor.getFileName());
            }
        }

        private saveRecentList() {
            let i: number = 0;
            let mruList: string = "";

            for (i = 0; i < mnuFileRecentList.DropDownItems.Count; i++) {
                mruList += mnuFileRecentList.DropDownItems[i].Text + Environment.NewLine;
            }

            let fileName = getMRUFileName();
            File.WriteAllText(fileName, mruList);
        }

        public setStatus(status: string) {
            // TODO: implement
        }

        public setBarText(text: string) {
            // TODO: implement
        }

        public setDisconnectedReport(isDisconnectedReport: boolean) {
            // TODO: implement
        }

		public setsbPnlCtrl(msg: string) {
            cGlobals.implementThisMessage("setsbPnlCtrl", "(fMain)");
		}

        public setReportCopySource(editor: cEditor) {
            this.sourceEditor = editor;
        }

        public getPaperSize() {
            return this.paperSize;
        }

        public getOrientation() {
            return this.orientation;
        }

        private mnuOpenReport_Click(sender: object, e: EventArgs) {
            try {

                let editor: cEditor = createEditor();

                editor.init();

                if (editor.openDocument()) {
                    addToRecentList(editor.getFileName());
                }

            } catch (Exception ex) {
                cError.mngError(ex, "mnuOpenReport_Click", C_MODULE, "");
            }
        }

        private tsbOpen_Click(sender: object, e: EventArgs) {
            mnuOpenReport_Click(sender, e);
        }

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

        private fMain_Load(sender: object, e: EventArgs) {
            cPrintAPI.getDefaultPrinter(
                this.printerName, this.driverName, this.port, 
                this.paperSize, this.orientation, this.paperSizeWidth, 
                this.paperSizeHeight);

            //
            // remove me and implement a better window position code
            //
            this.Width = 1200;
            this.Height = 900;
            cWindow.centerForm(this);

            // Create an instance of a ListView column sorter and assign it 
            // to the ListView control.
            lvwColumnSorter = new cListViewColumnSorter();
            lv_controls.ListViewItemSorter = lvwColumnSorter;
            lv_controls_ColumnClick(this, new ColumnClickEventArgs(0));

            loadRecentListFromUserSettings();
        }

        private cmCtrlProperties_Click(sender: object, e: EventArgs) {
            if (this.contextMenuEditor !== null)  {
                this.contextMenuEditor.showProperties();
            }
        }

        public showPopMenuSection(editor: cEditor, noDelete: boolean, showGroups: boolean, p: Point) {
            cmSectionDeleteSection.Enabled = !noDelete;
            cmSectionGroupProperties.Visible = showGroups;
            cmSectionMoveGroup.Visible = showGroups;
            cmSectionGroupSeparator.Visible = showGroups;

            this.contextMenuEditor = editor;

            cmnSection.Show(p);
        }

        public showPopMenuControl(editor: cEditor, clickInCtrl: boolean, pasteEnabled: boolean, p: Point) {
            cmCtrlCopy.Enabled = clickInCtrl;
            cmCtrlDelete.Enabled = clickInCtrl;
            cmCtrlEditText.Enabled = clickInCtrl;
            cmCtrlSendBack.Enabled = clickInCtrl;
            cmCtrlBringFront.Enabled = clickInCtrl;
            cmCtrlProperties.Enabled = clickInCtrl;

            cmCtrlPaste.Enabled = pasteEnabled;
            cmCtrlPasteEx.Enabled = pasteEnabled;

            this.contextMenuEditor = editor;

            cmnControl.Show(p);
        }

        private cmSectionSectionProperties_Click(sender: object, e: EventArgs) {
            if (this.contextMenuEditor !== null) {
                this.contextMenuEditor.showProperties();
            }
        }

        private cmSectionSectionLineProperties_Click(sender: object, e: EventArgs) {
            if (this.contextMenuEditor !== null) {
                this.contextMenuEditor.showSecLnProperties();
            }
        }

        private cmSectionGroupProperties_Click(sender: object, e: EventArgs) {
            if (this.contextMenuEditor !== null) {
                this.contextMenuEditor.showGroupProperties();
            }
        }

        private mnuViewTreeViewCtrls_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showControlsTree();
            }
        }

        private mnuViewControls_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showControls();
            }
        }

        private mnuViewToolbar_Click(sender: object, e: EventArgs) {
            showToolbox();
        }

        private tsbControls_Click(sender: object, e: EventArgs) {
            showToolbox();
        }

        private showToolbox() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showToolbox();
            }
        }

        private tsbSearch_Click(sender: object, e: EventArgs) {
            search();
        }

        private mnuEditSearch_Click(sender: object, e: EventArgs) {
            search();
        }

        private search() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.search();
            }
        }

        private tsbProperties_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showProperties();
            }
        }

        private mnuDataBaseSQLServerConnection_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setSimpleConnection();
            }
        }

        private mnuDataBaseConnectConfig_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.editConnectionString();
            }
        }

        private mnuDataBaseEditDataSource_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.editDataSource();
            }
        }

        private mnuExit_Click(sender: object, e: EventArgs) {
            this.Close();
        }

        private mnuParametersSettings_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setParameters();
            }
        }

        public showControls(editor: cEditor) {
            lv_controls.Items.clear();

            if (editor !== null) {
                cGlobals.addCtrls(editor.getReport(), lv_controls, C_CTRL_IMAGE, C_DB_IMAGE);
            }
        }

        public showControlsTree(editor: cEditor) {
            this.wasDoubleClick = false;
            tv_controls.Nodes.clear();

            if (editor !== null) {
                cGlobals.addCtrls(editor.getReport(), tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);
            }            
        }

        public showProperties(editor: cEditor, key: string) {
            lv_properties.Items.clear();
            if (editor !== null) {
                setObjectDescription(getControlOrSection(editor, key));
            }
        }

        private getControlOrSection(editor: cEditor, key: string) {
            if (key.length > 1) {
                if (key.substring(0, 1) === "S") {
                    return editor.getSectionOrSectionLineFromKey(key.substring(1));
                }
                else  {
                    return editor.getReport().getControls().item(key);
                }
            }
            else  {
                return null;
            }
        }

        private setObjectDescription(anObject: object) {
            setObjectDescription(anObject, 0);
        }

        private setObjectDescription(anObject: object, n: number) {
            if (anObject === null) return; {

            let tabs = new String(' ', n*2);
            let methods = getMethods(anObject);
            for(let i_ = 0; i_ < methods.length; i_++) {
                if (m.IsPublic
                    && m.Name.length > 3
                    && m.Name.substring(0, 3) === "get"
                    && m.Name.substring(0, 4) !== "get_"
                    && m.GetParameters().length === 0
                    && m.Name !== "getSectionLine"
                    ) {
                    let item = lv_properties.Items.Add(tabs + m.Name.substring(3));
                    item.ImageIndex = C_IMG_CONTROL;
                    item.SubItems.Add(getValue(m.Invoke(anObject, null), n));
                    if (item.SubItems[1].Text === "...") item.ImageIndex = C_IMG_FOLDER; {
                }
            }
        }

        private getValue(value: object, n: number) {
            if (n > 10) return ""; {

            if (value === null) {
                return "NULL";
            }
            else {
                let t = value.GetType();
                if (t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) {
                    return value.toString();
                }
                else {
                    setObjectDescription(value, n + 1);
                    return "...";
                }
            }
        }

        private getMethods(obj: object) {
            return obj.GetType().GetMethods();
        }

        public showFields(editor: cEditor) {
            lv_fields.Items.clear();

            if (editor !== null) {
                let connect = editor.getReport().getConnect();
                cGlobals.fillColumns(
                    connect.getDataSource(),
                    connect.getColumns(), lv_fields, C_INDEX, C_FIELDTYPE, false);
            }            
        }

        private lv_controls_ColumnClick(sender: object, e: ColumnClickEventArgs) {
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
        }

        private lv_controls_MouseClick(sender: object, e: MouseEventArgs) {
            selectControl();
        }

        private lv_controls_KeyUp(sender: object, e: KeyEventArgs) {
            selectControl();
        }

        private selectControl() {
            let editor: cEditor = cMainEditor.getDocActive();

            if (lv_controls.SelectedItems.Count > 0 && editor !== null) {
                let info = lv_controls.SelectedItems[0].Tag.toString();
                editor.selectCtrl(info);
            }
        }

        private tv_controls_NodeMouseClick(sender: object, e: TreeNodeMouseClickEventArgs) {
            selectControl(e.Node);
        }

        private selectControl(node: TreeNode) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (node !== null && node.Tag !== null && editor !== null) {
                let info = node.Tag.toString();
                if (info.length > 0) {
                    let infoType = info.substring(0, 1);
                    if ("@SL".IndexOf(infoType) === -1) {
                        editor.selectCtrl(info);
                    }
                    else if (infoType === "S" || infoType === "L") {
                        editor.selectSection(info.substring(1));
                    }
                }
            }
        }

        private tv_controls_KeyUp(sender: object, e: KeyEventArgs) {
            selectControl(tv_controls.SelectedNode);
        }

        private tv_controls_MouseDoubleClick(sender: object, e: MouseEventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (tv_controls.SelectedNode !== null && editor !== null) {
                if (tv_controls.SelectedNode.Tag !== null) {
                    let info = tv_controls.SelectedNode.Tag.toString();
                    if (info.length > 0) {
                        let infoType = info.substring(0, 1);
                        if ("@".IndexOf(infoType) === -1) {
                            editor.showProperties(info);
                        }
                    }
                }
            }
        }

        private tv_controls_MouseDown(sender: object, e: MouseEventArgs) {
            this.wasDoubleClick = e.Clicks > 1;
        }

        private tv_controls_BeforeCollapse(sender: object, e: TreeViewCancelEventArgs) {
            if (this.wasDoubleClick === true && e.Action === TreeViewAction.Collapse) {
                e.Cancel = true;
        }

        private tv_controls_BeforeExpand(sender: object, e: TreeViewCancelEventArgs) {
            if (this.wasDoubleClick === true && e.Action === TreeViewAction.Expand) {
                e.Cancel = true;
        }

        private lv_controls_MouseDoubleClick(sender: object, e: MouseEventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (lv_controls.SelectedItems.Count > 0 && editor !== null) {
                let info = lv_controls.SelectedItems[0].Tag.toString();
                editor.showProperties(info);
            }
        }

        private mnuPreviewReport_Click(sender: object, e: EventArgs) {
            previewReport();
        }

        private tsbPreview_Click(sender: object, e: EventArgs) {
            previewReport();
        }

        private previewReport() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.preview();
            }        
        }


        private tabReports_MouseClick(sender: object, e: MouseEventArgs) {
            for(let i = 0; i < tabReports.TabCount; ++i) {
                let rect = tabReports.GetTabRect(i);
                let xRect = new System.Drawing.Rectangle(rect.Left + rect.Width - 18, rect.Top, 18, rect.Height);
                if (xRect.contains(e.Location)) {
                    let editor: cEditor = tabReports.TabPages[i].Tag;
                    if (editor.close()) {
                        tabReports.TabPages.RemoveAt(i);
                        if (tabReports.TabPages.Count === 0) {
                            cMainEditor.setDocActive(null);
                        }
                    }
                }
            }
        }

        private mnuEditAddHeader_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSection(csRptSectionType.HEADER);
            }
        }

        private mnuEditAddGroup_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addGroup();
            }
        }

        private mnuEditAddFooter_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSection(csRptSectionType.FOOTER);
            }
        }

        private mnuEditAddLabel_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addLabel();
            }
        }

        private mnuEditAddLine_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addLineLabel();
            }
        }

        private mnuEditAddControl_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addDBField();
            }
        }

        private mnuEditAddImage_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addImage();
            }
        }

        private mnuEditAddChart_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addChart();
            }
        }

        private mnuHelpAbout_Click(sender: object, e: EventArgs) {
            cWindow.msgInfo(
UNKNOWN >>                 System.Reflection.Assembly.GetExecutingAssembly().GetName().Name 
                + " - Version " 
                + System.Reflection.Assembly.GetExecutingAssembly().GetName().Version
                + "\r\n\r\nhttps://github.com/javiercrowsoft/CSReports.net");
        }

        private cmSectionAddSectionLine_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSectionLine();
            }
        }

        private deleteReportObject(isSectionLine: boolean) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.deleteObj(isSectionLine);
            }
        }

        private cmSectionDeleteSection_Click(sender: object, e: EventArgs) {
            deleteReportObject(false);
        }

        private cmSectionDeleteSectionLine_Click(sender: object, e: EventArgs) {
            deleteReportObject(true);
        }

        private cmSectionMoveGroup_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveGroup();
            }
        }

        private tsbDatabase_Click(sender: object, e: EventArgs) {
            mnuDataBaseConnectConfig_Click(sender, e);
        }

        private mnuDataBaseSetToMainConnect_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setAllConnectToMainConnect();
            }
        }

        private alignText(align: CSReportGlobals.HorizontalAlignment) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.textAlign(align);
            }
        }

        private tsbAlignLeft_Click(sender: object, e: EventArgs) {
            alignText(CSReportGlobals.HorizontalAlignment.Left);
        }

        private tsbAligntCenter_Click(sender: object, e: EventArgs) {
            alignText(CSReportGlobals.HorizontalAlignment.Center);
        }

        private tsbAlignRight_Click(sender: object, e: EventArgs) {
            alignText(CSReportGlobals.HorizontalAlignment.Right);
        }

        private tsbBold_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setFontBold();
            }
        }

        private saveReport(saveAs: boolean) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.saveDocument(saveAs);
                addToRecentList(editor.getFileName());
            }
        }

        private tsbSaveAs_Click(sender: object, e: EventArgs) {
            saveReport(true);
        }

        private tsbSave_Click(sender: object, e: EventArgs) {
            saveReport(false);
        }

        private mnuSaveReport_Click(sender: object, e: EventArgs) {
            saveReport(false);
        }

        private mnuReportSaveAs_Click(sender: object, e: EventArgs) {
            saveReport(true);
        }

        private mnuPageSetup_Click(sender: object, e: EventArgs) {
            let pageSetup: fPageSetup = new fPageSetup();
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                pageSetup.initDialog(editor.getPaperSize(), editor.getCustomHeight(), editor.getCustomWidth(), editor.getOrientation());
            }

            pageSetup.ShowDialog();

            if (pageSetup.getOk()) {
                this.paperSize = pageSetup.getPaperSize();
                this.paperSizeHeight = pageSetup.getCustomHeight();
                this.paperSizeWidth = pageSetup.getCustomWidth();
                this.orientation = pageSetup.getOrientation();
                if (editor !== null) {
                    editor.setPaperSize(this.paperSize);
                    editor.setOrientation(this.orientation);
                    editor.setCustomHeight(this.paperSizeHeight);
                    editor.setCustomWidth(this.paperSizeWidth);
                    editor.refreshReport();
                }
            }
            pageSetup.Close();
        }

        private mnuPrinterSettings_Click(sender: object, e: EventArgs) {

        }

        private mnuHideGrid_Click(sender: object, e: EventArgs) {

        }

        private mnuGridLines_Click(sender: object, e: EventArgs) {

        }

        private mnuGridPoints_Click(sender: object, e: EventArgs) {

        }

        private mnuOptionsTool_Click(sender: object, e: EventArgs) {

        }

        private copy() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.copy();
            }
        }

        private mnuCopy_Click(sender: object, e: EventArgs) {
            copy();
        }

        private paste(dontMove: boolean) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.paste(false);
            }
        }

        private mnuPaste_Click(sender: object, e: EventArgs) {
            paste(false);
        }

        private mnuPasteSpecial_Click(sender: object, e: EventArgs) {
            paste(true);
        }

        private cmCtrlCopy_Click(sender: object, e: EventArgs) {
            copy();
        }

        private cmCtrlPaste_Click(sender: object, e: EventArgs) {
            paste(false);
        }

        private cmCtrlPasteEx_Click(sender: object, e: EventArgs) {
            paste(true);
        }

        private cmCtrlDelete_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.deleteObj(false);
            }
        }

        private printReport() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.printReport();
            }
        }

        private tsbPrint_Click(sender: object, e: EventArgs) {
            printReport();
        }

        private mnuPrintReport_Click(sender: object, e: EventArgs) {
            printReport();
        }

        private cmCtrlBringFront_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.bringToFront();
            }
        }

        private cmCtrlSendBack_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.sendToBack();
            }
        }

        private lockToolStripMenuItethis.Click(sender: object, e: EventArgs) {
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
        }

        private verticalToolStripMenuItethis.Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveVertical();
                horizontalToolStripMenuItem.Checked = false;
                verticalToolStripMenuItem.Checked = true;
                allDirectionsToolStripMenuItem.Checked = false;
            }
        }

        private horizontalToolStripMenuItethis.Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveHorizontal();
                horizontalToolStripMenuItem.Checked = true;
                verticalToolStripMenuItem.Checked = false;
                allDirectionsToolStripMenuItem.Checked = false;
            }
        }

        private allDirectionsToolStripMenuItethis.Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveAll();
                horizontalToolStripMenuItem.Checked = false;
                verticalToolStripMenuItem.Checked = false;
                allDirectionsToolStripMenuItem.Checked = true;
            }
        }

        private tsbCtrlAlignLeft_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignLeft);
            }
        }

        private tsbCtrlAlignRight_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignRight);
            }
        }

        private tsbCtrlAlignTop_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignTop);
            }
        }

        private tsbCtrlAlignBottothis.Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignBottom);
            }
        }

        private tsbCtrlSameHeight_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHeight);
            }
        }

        private tsbCtrlSameWidth_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignWidth);
            }
        }

        private tsbCtrlSameLeft_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHorizontal);
            }
        }

        private tsbCtrlSameTop_Click(sender: object, e: EventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignVertical);
            }
        }

        private fMain_KeyUp(sender: object, e: KeyEventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.keyUp(sender, e);
            }
        }

        private fMain_KeyDown(sender: object, e: KeyEventArgs) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.keyDown(sender, e);
            }
        }


    }
}
