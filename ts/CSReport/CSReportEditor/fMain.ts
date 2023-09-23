namespace CSReportEditor {

    import cError = CSKernelClient.cError;
    import Utils = CSOAPI.Utils;
    import cPrintAPI = CSReportDll.cPrintAPI;
    import PrintDialog = CSReportDll.PrintDialog;
    import cPrinter = CSReportDll.cPrinter;
    import Point = CSReportDll.Point;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import cWindow = CSKernelClient.cWindow;
    import csECtlAlignConst = CSReportGlobals.csECtlAlignConst;
    import Color = CSReportPaint.Color;

    export class FMain {

        private printDlg: PrintDialog;

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
        private C_IMG_DATABASE_FIELD: number = 1;

        private C_FIELDTYPE: string = "t";
        private C_INDEX: string = "i";

        private contextMenuEditor: cEditor = null;

        private tabReports: TabBar;
        private pnEditor: Panel;
        private pnRule: PictureBox;
        private pnReport: PictureBox;
        private tbpEditor;

        // TODO: implement
        //
        saveFileDialog: object;
        openFileDialog: object;

        private lv_controls: ListView = new ListView();
        private lv_properties: ListView = new ListView();
        private tv_controls: TreeView = new TreeView();


        private el(id: string) {
            return document.getElementById(id);
        }

        public constructor() {
            // it is the first thing we need to do
            //
            Utils.setSepDecimal();

            let printer: cPrinter = cPrintAPI.getcPrinterFromDefaultPrinter(this.printDlg);
            this.printerName = printer.getDeviceName();
            this.driverName = printer.getDriverName();
            this.port = printer.getPort();
            this.paperSize = printer.getPaperInfo().getPaperSize();
            this.orientation = printer.getPaperInfo().getOrientation();
            this.paperSizeWidth = printer.getPaperInfo().getPaperSize();
            this.paperSizeHeight = printer.getPaperInfo().getPaperSize();

            this.loadRecentListFromUserSettings();

            this.pnEditor = new Panel(this.el('pnEditor'));
            this.pnRule = new PictureBox("picRule", this.el('pnRule'));
            this.pnReport = new PictureBox("picReport", this.el('pnReport'));
            this.tbpEditor = new TabPage(this.el('tbpReport'));

            this.lv_controls = new ListView();
            this.tv_controls = new TreeView();
            this.lv_properties = new ListView();

            this.pnRule.setWidth(250);
            this.pnRule.setBacgroundColor(Color.AliceBlue);
            this.pnReport.setBacgroundColor(Color.HoneyDew);
        }

        public init() {
            let editor: cEditor = new cEditor(this, this.pnEditor, this.pnRule, this.pnReport, this.tbpEditor);
            editor.init().then(()=> editor.newReport(null));        
        }

        public getReportCopySource() {
            return this.sourceEditor;
        }

        private createEditor() {
            let tab: TabPage = new TabPage();
            let pnEditor: Panel = new Panel();
            let pnRule: PictureBox = new PictureBox("pnRule");
            let pnReport: PictureBox = new PictureBox("pnReport");

            pnRule.setWidth(250);
            pnRule.setBacgroundColor(Color.AliceBlue);
            pnReport.setBacgroundColor(Color.HoneyDew);

            pnEditor.getControls().add(pnRule);
            pnEditor.getControls().add(pnReport);
            tab.getControls().add(pnEditor);
            this.tabReports.getPages().add(tab);
            tab.setText("New Report [X]");

            return new cEditor(this, pnEditor, pnRule, pnReport, tab);
        }

        private newReportClick() {
            let editor: cEditor = this.createEditor();
            editor.init().then(()=> editor.newReport(null));            
        }

        public setEditAlignTextState(status: boolean) {
            // TODO: implement
            /*
            let buttons = this.tbMain.Items;
            buttons[cGlobals.c_BTN_ALIGN_CENTER].setEnabled(status);
            buttons[cGlobals.c_BTN_ALIGN_LEFT].setEnabled(status);
            buttons[cGlobals.c_BTN_ALIGN_RIGHT].setEnabled(status);
            buttons[cGlobals.c_BTN_FONT_BOLD].setEnabled(status);
            */
        }

        public setEditAlignCtlState(status: boolean) {
            // TODO: implement
            /*
            let buttons = this.tbMain.Items;

            buttons[cGlobals.c_BTN_CTL_ALIGN_BOTTOM].setEnabled(status);
            buttons[cGlobals.c_BTN_CTL_ALIGN_TOP].setEnabled(status);

            buttons[cGlobals.c_BTN_CTL_ALIGN_VERTICAL].setEnabled(status);
            buttons[cGlobals.c_BTN_CTL_ALIGN_HORIZONTAL].setEnabled(status);
            buttons[cGlobals.c_BTN_CTL_ALIGN_LEFT].setEnabled(status);
            buttons[cGlobals.c_BTN_CTL_ALIGN_RIGHT].setEnabled(status);

            buttons[cGlobals.c_BTN_CTL_HEIGHT].setEnabled(status);
            buttons[cGlobals.c_BTN_CTL_WIDTH].setEnabled(status);
            */
        }

        public setMenuAux(enabled: boolean) {
            // TODO: implement
            /*
            this.mnuEditAddControl.setEnabled(enabled);
            this.mnuEditAddHeader.setEnabled(enabled);
            this.mnuEditAddLabel.setEnabled(enabled);
            this.mnuEditAddGroup.setEnabled(enabled);
            this.mnuEditAddFooter.setEnabled(enabled);
            this.mnuEditAddLine.setEnabled(enabled);
            this.mnuEditAddSec.setEnabled(enabled);
            this.mnuEditMove.setEnabled(enabled);
            this.mnuDataBaseEditDataSource.setEnabled(enabled);
            this.mnuPreviewReport.setEnabled(enabled);
            this.mnuPrintReport.setEnabled(enabled);
            this.mnuSaveReport.setEnabled(enabled);
            this.mnuReportSaveAs.setEnabled(enabled);
            this.mnuDataBaseSetDisconnected.setEnabled(enabled);
            this.mnuEditSearch.setEnabled(enabled);
            this.mnuDataBaseSQLServerConnection.setEnabled(enabled);
            this.mnuDataBaseSetToMainConnect.setEnabled(enabled);
            this.mnuDataBaseEditDataSource.setEnabled(enabled);
            this.mnuDataBaseConnectsAuxCfg.setEnabled(enabled);
            this.mnuHideGrid.setEnabled(enabled);
            this.mnuViewToolbar.setEnabled(enabled);
            this.mnuViewControls.setEnabled(enabled);
            this.mnuViewTreeViewCtrls.setEnabled(enabled);

            let buttons = this.tbMain.Items;
            tsbPrint.setEnabled(enabled);
            tsbProperties.setEnabled(enabled);
            tsbDatabase.setEnabled(enabled);
            tsbSave.setEnabled(enabled);
            tsbControls.setEnabled(enabled);
            tsbPreview.setEnabled(enabled);
            tsbSearch.setEnabled(enabled);
             */
        }

        public addToRecentList(fileName: string) {
            // TODO: implement
            /*
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
                menuItems[i].setText(menuItems[i - 1].Text);
            }

            menuItems[0].setText(fileName);

            saveRecentList();
             */
        }

        private getMRUFileName() {
            // TODO: implement
            /*
            let path = System.Environment.SpecialFolder.LocalApplicationData;
            return Environment.GetFolderPath(path) + Path.DirectorySeparatorChar + this.MRU_FILE;
             */
        }

        private loadRecentListFromUserSettings() {
            // TODO: implement
            /*
            let fileName = getMRUFileName();
            if (File.Exists(fileName)) {
                let lines = File.ReadAllLines(fileName);
                loadRecentList(lines.ToList());
            }
             */
        }

        private loadRecentList(recentList: string[]) {
            // TODO: implement
            /*
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
            */
        }

        private recentClick() {
            // TODO: implement
            /*
            let mnu: ToolStripMenuItem = sender;
            let editor: cEditor = createEditor();
            editor.init();
            if (editor.openDocument(mnu.Text)) {
                addToRecentList(editor.getFileName());
            }
             */
        }

        private saveRecentList() {
            // TODO: implement
            /*
            let i: number = 0;
            let mruList: string = "";

            for (i = 0; i < mnuFileRecentList.DropDownItems.Count; i++) {
                mruList += mnuFileRecentList.DropDownItems[i].Text + Environment.NewLine;
            }

            let fileName = getMRUFileName();
            File.WriteAllText(fileName, mruList);
             */
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

		public setStatusBarText(msg: string) {
            // TODO: implement
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

        private openReportClick() {
            try {

                let editor: cEditor = this.createEditor();

                editor.init();

                if (editor.openDocument()) {
                    this.addToRecentList(editor.getFileName());
                }

            } catch (ex) {
                cError.mngError(ex);
            }
        }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

        private cmCtrlProperties_Click(sender: object, e: any) {
            if (this.contextMenuEditor !== null)  {
                this.contextMenuEditor.showProperties2();
            }
        }

        public showPopMenuSection(editor: cEditor, noDelete: boolean, showGroups: boolean, p: Point) {
            /*
            cmSectionDeleteSection.setEnabled(!noDelete);
            cmSectionGroupProperties.Visible = showGroups;
            cmSectionMoveGroup.Visible = showGroups;
            cmSectionGroupSeparator.Visible = showGroups;

            this.contextMenuEditor = editor;

            cmnSection.Show(p);

             */
        }

        public showPopMenuControl(editor: cEditor, clickInCtrl: boolean, pasteEnabled: boolean, p: Point) {
            /*
            cmCtrlCopy.setEnabled(clickInCtrl);
            cmCtrlDelete.setEnabled(clickInCtrl);
            cmCtrlEditText.setEnabled(clickInCtrl);
            cmCtrlSendBack.setEnabled(clickInCtrl);
            cmCtrlBringFront.setEnabled(clickInCtrl);
            cmCtrlProperties.setEnabled(clickInCtrl);

            cmCtrlPaste.setEnabled(pasteEnabled);
            cmCtrlPasteEx.setEnabled(pasteEnabled);

            this.contextMenuEditor = editor;

            cmnControl.Show(p);

             */
        }

        private cmSectionSectionProperties_Click(sender: object, e: any) {
            if (this.contextMenuEditor !== null) {
                this.contextMenuEditor.showProperties2();
            }
        }

        private cmSectionSectionLineProperties_Click(sender: object, e: any) {
            if (this.contextMenuEditor !== null) {
                this.contextMenuEditor.showSecLnProperties();
            }
        }

        private cmSectionGroupProperties_Click(sender: object, e: any) {
            if (this.contextMenuEditor !== null) {
                this.contextMenuEditor.showCurrentGroupProperties();
            }
        }

        private mnuViewTreeViewCtrls_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showControlsTree();
            }
        }

        private mnuViewControls_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showControls();
            }
        }

        private mnuViewToolbar_Click(sender: object, e: any) {
            this.showToolbox();
        }

        private tsbControls_Click(sender: object, e: any) {
            this.showToolbox();
        }

        private showToolbox() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showToolbox();
            }
        }

        private tsbSearch_Click(sender: object, e: any) {
            this.search();
        }

        private mnuEditSearch_Click(sender: object, e: any) {
            this.search();
        }

        private search() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.search();
            }
        }

        private tsbProperties_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.showProperties2();
            }
        }

        private mnuDataBaseSQLServerConnection_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setSimpleConnection();
            }
        }

        private mnuDataBaseConnectConfig_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.editConnectionString();
            }
        }

        private mnuDataBaseEditDataSource_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.editDataSource();
            }
        }

        private mnuExit_Click(sender: object, e: any) {
            this.close();
        }

        private mnuParametersSettings_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setParameters();
            }
        }

        public showControls(editor: cEditor) {
            this.lv_controls.clear();

            if (editor !== null) {
                cGlobals.addCtrls(editor.getReport(), this.lv_controls, this.C_CTRL_IMAGE, this.C_DB_IMAGE);
            }
        }

        public showControlsTree(editor: cEditor) {
            this.wasDoubleClick = false;
            this.tv_controls.getNodes().clear();

            if (editor !== null) {
                cGlobals.addCtrls2(
                    editor.getReport(), this.tv_controls,
                    this.C_IMG_FOLDER, this.C_IMG_FORMULA,
                    this.C_IMG_CONTROL, this.C_IMG_DATABASE_FIELD);
            }
        }

        public showProperties(editor?: cEditor, key?: string) {
            this.lv_properties.clear();
            if (editor !== null) {
                this.setObjectDescription(this.getControlOrSection(editor, key));
            }
        }

        private getControlOrSection(editor: cEditor, key?: string) {
            if (key && key.length > 1) {
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

        private setObjectDescription(anObject: object, n?: number) {
            /*
            if (anObject === null) return;

            let tabs = new String(' ', n*2);
            let methods = this.getMethods(anObject);
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
                    if (item.SubItems[1].Text === "...") item.ImageIndex = C_IMG_FOLDER;
                }
            }

             */
        }

        private getValue(value: object, n: number) {
            /*
            if (n > 10) return "";

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

             */
        }

        private getMethods(obj: object) {
            /*
            return obj.GetType().GetMethods();

             */
        }

        public showFields(editor: cEditor) {
            /*lv_fields.Items.clear();

            if (editor !== null) {
                let connect = editor.getReport().getConnect();
                cGlobals.fillColumns(
                    connect.getDataSource(),
                    connect.getColumns(), lv_fields, C_INDEX, C_FIELDTYPE, false);
            }*/
        }

        private lv_controls_ColumnClick(sender: object, e: any) {
            /*
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
            this.lv_controls.sort();

             */
        }

        private lv_controls_MouseClick(sender: object, e: any) {
            this.selectControl();
        }

        private lv_controls_KeyUp(sender: object, e: any) {
            this.selectControl();
        }

        private selectControl() {
            let editor: cEditor = cMainEditor.getDocActive();

            if (this.lv_controls.selectedItems().length > 0 && editor !== null) {
                let info = this.lv_controls.selectedItems()[0].tag.toString();
                editor.selectCtrl(info);
            }
        }

        private tv_controls_NodeMouseClick(sender: object, e: any) {
            this.selectControl2(e.Node);
        }

        private selectControl2(node: Node) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (node !== null && node.tag !== null && editor !== null) {
                let info = node.tag.toString();
                if (info.length > 0) {
                    let infoType = info.substring(0, 1);
                    if ("@SL".indexOf(infoType) === -1) {
                        editor.selectCtrl(info);
                    }
                    else if (infoType === "S" || infoType === "L") {
                        editor.selectSection(info.substring(1));
                    }
                }
            }
        }

        private tv_controls_KeyUp(sender: object, e: any) {
            this.selectControl2(this.tv_controls.selectedNode());
        }

        private tv_controls_MouseDoubleClick(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (this.tv_controls.selectedNode() !== null && editor !== null) {
                if (this.tv_controls.selectedNode().tag !== null) {
                    let info = this.tv_controls.selectedNode().tag.toString();
                    if (info.length > 0) {
                        let infoType = info.substring(0, 1);
                        if ("@".indexOf(infoType) === -1) {
                            editor.showProperties(info);
                        }
                    }
                }
            }
        }

        private tv_controls_MouseDown(sender: object, e: any) {
            this.wasDoubleClick = e.Clicks > 1;
        }

        private tv_controls_BeforeCollapse(sender: object, e: any) {
            if (this.wasDoubleClick === true && e.Action === TreeViewAction.Collapse)
                e.Cancel = true;
        }

        private tv_controls_BeforeExpand(sender: object, e: any) {
            if (this.wasDoubleClick === true && e.Action === TreeViewAction.Expand)
                e.Cancel = true;
        }

        private lv_controls_MouseDoubleClick(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();

            if (this.lv_controls.selectedItems().length > 0 && editor !== null) {
                let info = this.lv_controls.selectedItems[0].tag.toString();
                editor.showProperties(info);
            }
        }

        private mnuPreviewReport_Click(sender: object, e: any) {
            this.previewReport();
        }

        private tsbPreview_Click(sender: object, e: any) {
            this.previewReport();
        }

        private previewReport() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.preview();
            }
        }


        private tabReports_MouseClick(sender: object, e: any) {
            /*
            for(let i = 0; i < this.tabReports.TabCount; ++i) {
                let rect = this.tabReports.GetTabRect(i);
                let xRect = new System.Drawing.Rectangle(rect.Left + rect.Width - 18, rect.Top, 18, rect.Height);
                if (xRect.contains(e.Location)) {
                    let editor: cEditor = this.tabReports.TabPages[i].tag;
                    if (editor.close()) {
                        this.tabReports.TabPages.RemoveAt(i);
                        if (this.tabReports.TabPages.Count === 0) {
                            cMainEditor.setDocActive(null);
                        }
                    }
                }
            }

             */
        }

        private mnuEditAddHeader_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSection(csRptSectionType.HEADER);
            }
        }

        private mnuEditAddGroup_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addGroup();
            }
        }

        private mnuEditAddFooter_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addSection(csRptSectionType.FOOTER);
            }
        }

        private mnuEditAddLabel_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addLabel();
            }
        }

        private mnuEditAddLine_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addLineLabel();
            }
        }

        private mnuEditAddControl_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addDBField();
            }
        }

        private mnuEditAddImage_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addImage();
            }
        }

        private mnuEditAddChart_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.addChart();
            }
        }

        private mnuHelpAbout_Click(sender: object, e: any) {
            cWindow.msgInfo(
                + " - Version "
                + "\r\n\r\nhttps://github.com/javiercrowsoft/CSReports.net");
        }

        private cmSectionAddSectionLine_Click(sender: object, e: any) {
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

        private cmSectionDeleteSection_Click(sender: object, e: any) {
            this.deleteReportObject(false);
        }

        private cmSectionDeleteSectionLine_Click(sender: object, e: any) {
            this.deleteReportObject(true);
        }

        private cmSectionMoveGroup_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveGroup();
            }
        }

        private tsbDatabase_Click(sender: object, e: any) {
            this.mnuDataBaseConnectConfig_Click(sender, e);
        }

        private mnuDataBaseSetToMainConnect_Click(sender: object, e: any) {
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

        private tsbAlignLeft_Click(sender: object, e: any) {
            this.alignText(CSReportGlobals.HorizontalAlignment.Left);
        }

        private tsbAligntCenter_Click(sender: object, e: any) {
            this.alignText(CSReportGlobals.HorizontalAlignment.Center);
        }

        private tsbAlignRight_Click(sender: object, e: any) {
            this.alignText(CSReportGlobals.HorizontalAlignment.Right);
        }

        private tsbBold_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.setFontBold();
            }
        }

        private saveReport(saveAs: boolean) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.saveDocument(saveAs);
                this.addToRecentList(editor.getFileName());
            }
        }

        private tsbSaveAs_Click(sender: object, e: any) {
            this.saveReport(true);
        }

        private tsbSave_Click(sender: object, e: any) {
            this.saveReport(false);
        }

        private mnuSaveReport_Click(sender: object, e: any) {
            this.saveReport(false);
        }

        private mnuReportSaveAs_Click(sender: object, e: any) {
            this.saveReport(true);
        }

        private mnuPageSetup_Click(sender: object, e: any) {
            let pageSetup: FPageSetup = new FPageSetup();
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                pageSetup.initDialog(editor.getPaperSize(), editor.getCustomHeight(), editor.getCustomWidth(), editor.getOrientation());
            }

            pageSetup.showDialog();

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
            pageSetup.close();
        }

        private mnuPrinterSettings_Click(sender: object, e: any) {

        }

        private mnuHideGrid_Click(sender: object, e: any) {

        }

        private mnuGridLines_Click(sender: object, e: any) {

        }

        private mnuGridPoints_Click(sender: object, e: any) {

        }

        private mnuOptionsTool_Click(sender: object, e: any) {

        }

        private copy() {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.copy();
            }
        }

        private mnuCopy_Click(sender: object, e: any) {
            this.copy();
        }

        private paste(dontMove: boolean) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.paste(false);
            }
        }

        private mnuPaste_Click(sender: object, e: any) {
            this.paste(false);
        }

        private mnuPasteSpecial_Click(sender: object, e: any) {
            this.paste(true);
        }

        private cmCtrlCopy_Click(sender: object, e: any) {
            this.copy();
        }

        private cmCtrlPaste_Click(sender: object, e: any) {
            this.paste(false);
        }

        private cmCtrlPasteEx_Click(sender: object, e: any) {
            this.paste(true);
        }

        private cmCtrlDelete_Click(sender: object, e: any) {
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

        private tsbPrint_Click(sender: object, e: any) {
            this.printReport();
        }

        private mnuPrintReport_Click(sender: object, e: any) {
            this.printReport();
        }

        private cmCtrlBringFront_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.bringToFront();
            }
        }

        private cmCtrlSendBack_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.sendToBack();
            }
        }

        private lockToolStripMenuItem_click(sender: object, e: any) {
            /*
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveNoMove();
                lockToolStripMenuItem.setChecked(!lockToolStripMenuItem.Checked);
                if (lockToolStripMenuItem.Checked) {
                    lockToolStripMenuItem.setText("Unlock");
                }
                else {
                    lockToolStripMenuItem.setText("Unlock");
                }
            }
            */
        }

        private verticalToolStripMenuItem_click(sender: object, e: any) {
            /*
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveVertical();
                horizontalToolStripMenuItem.setChecked(false);
                verticalToolStripMenuItem.setChecked(true);
                allDirectionsToolStripMenuItem.setChecked(false);
            }
            
             */
        }

        private horizontalToolStripMenuItem_click(sender: object, e: any) {
            /*
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveHorizontal();
                horizontalToolStripMenuItem.setChecked(true);
                verticalToolStripMenuItem.setChecked(false);
                allDirectionsToolStripMenuItem.setChecked(false);
            }

             */
        }

        private allDirectionsToolStripMenuItem_click(sender: object, e: any) {
            /*
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.moveAll();
                horizontalToolStripMenuItem.setChecked(false);
                verticalToolStripMenuItem.setChecked(false);
                allDirectionsToolStripMenuItem.setChecked(true);
            }

             */
        }

        private tsbCtrlAlignLeft_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignLeft);
            }
        }

        private tsbCtrlAlignRight_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignRight);
            }
        }

        private tsbCtrlAlignTop_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignTop);
            }
        }

        private tsbCtrlAlignBottothis_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignBottom);
            }
        }

        private tsbCtrlSameHeight_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHeight);
            }
        }

        private tsbCtrlSameWidth_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignWidth);
            }
        }

        private tsbCtrlSameLeft_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignHorizontal);
            }
        }

        private tsbCtrlSameTop_Click(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.controlsAlign(csECtlAlignConst.csECtlAlignVertical);
            }
        }

        private fMain_KeyUp(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.keyUp(sender, e);
            }
        }

        private fMain_KeyDown(sender: object, e: any) {
            let editor: cEditor = cMainEditor.getDocActive();
            if (editor !== null) {
                editor.keyDown(sender, e);
            }
        }

        printDialog() {
            return undefined;
        }

        private close() {

        }
    }
}
