///<reference path="../../CSDrawing/Font.ts"/>
///<reference path="../../CSReportWebServer/ReportWeb.ts"/>
///<reference path="../../CSForms/controls/Panel.ts"/>
///<reference path="../../CSForms/controls/PictureBox.ts"/>
///<reference path="../../CSForms/controls/TabBar.ts"/>
///<reference path="../../CSForms/controls/ListView.ts"/>
///<reference path="../../CSForms/controls/TreeView.ts"/>
///<reference path="../../CSDatabase/server/ServerConnection.ts"/>

namespace CSReportEditor {

    import cError = CSKernelClient.cError;
    import U = CSOAPI.Utils;
    import cPrintAPI = CSReportEngine.cPrintAPI;
    import PrintDialog = CSReportEngine.PrintDialog;
    import cPrinter = CSReportEngine.cPrinter;
    import Point = CSReportEngine.Point;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import cWindow = CSKernelClient.cWindow;
    import csECtlAlignConst = CSReportGlobals.csECtlAlignConst;
    import Color = CSDrawing.Color;
    import Font = CSDrawing.Font;
    import P = CSKernelClient.Callable;
    import FileContent = CSKernelFile.FileContent;
    import Map = CSOAPI.Map;
    import ReportWeb = CSReportWebServer.ReportWeb;
    import ServerConnection = CSDatabase.ServerConnection;

    import Panel = CSForms.Panel;
    import PictureBox = CSForms.PictureBox;
    import TabBar = CSForms.TabBar;
    import TabPage = CSForms.TabPage;
    import ListView = CSForms.ListView;
    import TreeView = CSForms.TreeView;
    import Node = CSForms.Node;
    import Item = CSForms.Item;
    import ReportPreview = CSForms.ReportPreview;

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
        private C_IMG_CONTROL: number = 1;
        private C_IMG_FORMULA: number = 2;
        private C_IMG_DATABASE_FIELD: number = 3;

        private C_FIELD_TYPE: string = "t";
        private C_INDEX: string = "i";

        private contextMenuEditor: cEditor = null;

        private mainView;
        private tabReports: TabBar;

        private editorIndex = 0;

        private lv_controls: ListView = null;
        private lv_properties: ListView = null;
        private lv_fields: ListView = null;
        private tv_controls: TreeView = null;
        private propertyDlg: PropertyDlg = null;

        private debugData = new Map<FileContent>();
        private previewReports = new Map<ReportWeb>();

        private pageSetup: FPageSetup = new FPageSetup();
        private columnsDlg: FColumns = new FColumns();

        private serverConnection: ServerConnection = new ServerConnection();

        private popupMenuControl: HTMLDivElement = null;

        public constructor() {
            // it is the first thing we need to do
            //
            U.setSepDecimal();

            let printer: cPrinter = cPrintAPI.getcPrinterFromDefaultPrinter(this.printDlg);
            this.printerName = printer.getDeviceName();
            this.driverName = printer.getDriverName();
            this.port = printer.getPort();
            this.paperSize = printer.getPaperInfo().getPaperSize();
            this.orientation = printer.getPaperInfo().getOrientation();
            this.paperSizeWidth = printer.getPaperInfo().getPaperSize();
            this.paperSizeHeight = printer.getPaperInfo().getPaperSize();

            this.loadRecentListFromUserSettings();

            this.mainView = U.el("main-view");

            this.tabReports = new TabBar("tabReports", U.el("tabReports"));

            this.lv_controls = new ListView("lvControls", U.el("sidebar-lv-controls"));
            this.lv_controls.state.onclick = P.call(this, this.lvControlsItemClick);
            this.lv_properties = new ListView("lvControls", U.el("sidebar-lv-properties"));
            this.lv_fields = new ListView("lvFields", U.el("sidebar-lv-database"));
            this.tv_controls = new TreeView("tvControls", U.el("sidebar-tv-controls"), "*");
            this.tv_controls.state.onclick = P.call(this, this.tvControlsNodeClick);

            this.propertyDlg = new PropertyDlg();

            const fontsNode = U.el('ctrl-font') as HTMLSelectElement;
            Font.availableFonts().then((fonts) => fonts.forEach((font)=> fontsNode.add(new Option(font))));

            this.setPopUpMenus();
        }

        private setPopUpMenus() {
            this.popupMenuControl = U.el("popup-menu-control") as HTMLDivElement;
        }

        public init() {
            this.newReportClick();
        }

        public getReportCopySource() {
            return this.sourceEditor;
        }

        private createEditor() {
            const tabPageNode = document.createElement('div');
            tabPageNode.className = "editor";
            this.mainView.appendChild(tabPageNode);

            const pnEditorNode = document.createElement('div');
            pnEditorNode.className = "editor-container";
            tabPageNode.appendChild(pnEditorNode);

            const picRuleNode = document.createElement('div');
            picRuleNode.className = "rule";
            pnEditorNode.appendChild(picRuleNode);

            const picReportNode = document.createElement('div');
            picReportNode.className = "report";
            pnEditorNode.appendChild(picReportNode);

            let pnEditor: Panel = new Panel("pnEditor" + this.editorIndex, pnEditorNode);
            let picRule: PictureBox = new PictureBox("pnRule" + this.editorIndex, picRuleNode);
            let picReport: PictureBox = new PictureBox("pnReport" + this.editorIndex, picReportNode);

            this.editorIndex++;

            picRule.setWidth(70);
            picRule.setBacgroundColor(new Color("#f7f8f9"));
            picReport.setBacgroundColor(Color.White);

            pnEditor.getControls().add(picRule);
            pnEditor.getControls().add(picReport);

            let tab: TabPage = new TabPage("tbpEditor" + this.editorIndex, tabPageNode);
            tab.getControls().add(pnEditor);
            tab.setText("New Report");
            this.tabReports.getPages().add(tab);

            const editor = new cEditor(this, pnEditor, picRule, picReport, tab);

            tab.onClose = () => {
                editor.close().then((canClose) => {
                    if(canClose) {
                        pnEditor.dispose();
                        picRule.dispose();
                        picReport.dispose();
                        try {
                            tabPageNode.parentNode.removeChild(tabPageNode);
                        } catch(ex) {
                            cError.mngError(ex);
                        }
                    }
                });
            };

            tab.onActive = () => {
                cMainEditor.setDocActive(editor);
            };

            return editor;
        }

        private createPreview(editor: cEditor) {
            const tabPageNode = document.createElement('div');
            tabPageNode.className = "editor";
            this.mainView.appendChild(tabPageNode);

            const previewNode = document.createElement('div');
            previewNode.className = "editor-container";
            tabPageNode.appendChild(previewNode);

            let reportPreview: ReportPreview = new ReportPreview("reportPreview", previewNode);

            let tab: TabPage = new TabPage("tbpPreview" + this.editorIndex, tabPageNode);
            tab.getControls().add(reportPreview);
            tab.setText("Preview Report");
            this.tabReports.getPages().add(tab);

            const previewTab = new PreviewTab(this, reportPreview, tab);

            editor.setPreviewTab(previewTab);

            tab.onClose = () => {
                editor.getPreviewTab().close().then(() => {
                    reportPreview.dispose();
                    try {
                        tabPageNode.parentNode.removeChild(tabPageNode);
                    } catch(ex) {
                        cError.mngError(ex);
                    }
                });
            };

            tab.onActive = () => {
                cMainEditor.setDocActive(editor.getPreviewTab());
            };

            return reportPreview;
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
            this.mnuPreviewReport.setEnabled(enabled);
            this.mnuPrintReport.setEnabled(enabled);
            this.mnuSaveReport.setEnabled(enabled);
            this.mnuReportSaveAs.setEnabled(enabled);
            this.mnuDataBaseSetDisconnected.setEnabled(enabled);
            this.mnuEditSearch.setEnabled(enabled);
            this.mnuDataBaseSQLServerConnection.setEnabled(enabled);
            this.mnuDataBaseSetToMainConnect.setEnabled(enabled);
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

            for(i = 0; i < menuItems.Count; i++) {
                if(fileName === menuItems[i].Text) {
                    j = i;
                    found = true;
                    break;
                }
            }

            if(menuItems.Count < cGlobals.C_TOTINRECENTLIST && !found) {
                let menu = this.mnuFileRecentList.DropDownItems.Add("");
                menu.Visible = true;
                menu.Click += mnuRecentClick;
            }

            if(!found) { j = menuItems.Count - 1; }

            for(i = j; i > 0; i--) {
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
            if(File.Exists(fileName)) {
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

            for(i = 0; i < Math.Min(cGlobals.C_TOTINRECENTLIST, recentList.Count); i++) {
                recent = recentList[i];
                let menu = this.mnuFileRecentList.DropDownItems.Add(recent);
                menu.Visible = true;
                menu.Click += mnuRecentClick;
            }

            if(this.mnuFileRecentList.DropDownItems.Count > 0) {
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
            if(editor.openDocument(mnu.Text)) {
                addToRecentList(editor.getFileName());
            }
             */
        }

        private saveRecentList() {
            // TODO: implement
            /*
            let i: number = 0;
            let mruList: string = "";

            for(i = 0; i < mnuFileRecentList.DropDownItems.Count; i++) {
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

        //------------------------------------------------------------------------------------------------------------------

        // menu

        //------------------------------------------------------------------------------------------------------------------

        public newReportClick() {
            let editor: cEditor = this.createEditor();
            editor.init().then(()=> editor.newReport(null));
        }

        public openReportClick() {
            try {

                let editor: cEditor = this.createEditor();

                editor.init();

                editor.openDocument().then(P.call(this, (success)=> {
                    if(success) this.addToRecentList(editor.getFileName());
                }));


            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public saveAsReportClick() {
            this.saveReport(true);
        }

        public pageSetupClick() {
            let maybeEditor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(maybeEditor === null || ! maybeEditor.isEditor) return;

            const editor = (maybeEditor as cEditor);

            this.pageSetup.initDialog(editor.getPaperSize(),
                                      editor.getCustomHeight(),
                                      editor.getCustomWidth(),
                                      editor.getOrientation(),
                                      P.call(this, this.pageSetupApplyClick));

            this.pageSetup.showModal();
        }

        public pageSetupApplyClick() {
            let maybeEditor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(maybeEditor === null || ! maybeEditor.isEditor) return;

            const editor = (maybeEditor as cEditor);

            this.paperSize = this.pageSetup.getPaperSize();
            this.paperSizeHeight = this.pageSetup.getCustomHeight();
            this.paperSizeWidth = this.pageSetup.getCustomWidth();
            this.orientation = this.pageSetup.getOrientation();
            if(editor !== null && editor.isEditor()) {
                editor.setPaperSize(this.paperSize);
                editor.setOrientation(this.orientation);
                editor.setCustomHeight(this.paperSizeHeight);
                editor.setCustomWidth(this.paperSizeWidth);
                editor.refreshReport();
            }
        }

        public saveReportClick() {
            this.saveReport(false);
        }

        public setConnectionClick() {
            this.serverConnection.editSettings();
        }

        public setDataSourceClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                this.serverConnection.selectDataSource().then(P.call(this, (result) => {
                    if(result.success) {
                        (editor as cEditor).setDataSource(result.dataSource.getStringConnection());
                    }
                }));
            }
        }

        public setParamsAndExecuteClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).setParamsAndExecute(this.serverConnection).then(P.call(this, (result)=> {

                    const content = {
                        action: 'preview',
                        data: {
                            code: result.dataSource.name,
                            data: [{
                                data: result.dataSource.recordset,
                                name: result.dataSource.name
                            }],
                            file: result.dataSource.name + '.csr',
                            name: result.dataSource.name,
                            params: (editor as cEditor).getReport().getConnect().getParameters().map(p => { return {name: p.getName(), value: p.getValue()} }),
                            title: result.dataSource.name,
                            type: '-',
                            url: '-'
                        },
                        webReportId: '-'
                    }

                    this.debugData.add({name: result.dataSource.name, content: content as any}, (editor as cEditor).getId());
                }));
            }
        }

        public debugReportClick() {
            let maybeEditor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(maybeEditor === null || ! maybeEditor.isEditor()) return;
            const editor = maybeEditor as cEditor;

            let p = P._(true);
            let previewReport = this.previewReports.item(editor.getId());
            if(previewReport === null) {
                previewReport = new ReportWeb();
                this.previewReports.add(previewReport);
                p = previewReport.init(this.debugData.item(editor.getId()), editor.getReport());
            }
            p.then((result) => {
                if(! result) return false;

                return previewReport.makeReport();
            })
            .then((result) => {
                if(! result) return false;

                return previewReport.getPages();
            })
            .then((result) => {
                if(! result) return false;

                const previewControl = this.createPreview(editor);
                previewReport.previewFirstPage(previewControl);
            })
            .catch((ignore) => {

            });
        }

        public loadDataClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                this.openFileWithDialog().then(P.call(this, (fc: FileContent) => {
                    try {
                        fc.content = JSON.parse(fc.content);
                        this.debugData.add(fc, (editor as cEditor).getId());
                    } catch(ex) {
                        cError.mngError(ex);
                    }
                }));
            }
        }

        private openFileWithDialog() {
            let file: CSKernelFile.cFile = new CSKernelFile.cFile();
            file.init("OpenFileWithDialog");

            return file.userOpenFile();
        }

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

        /* delete me this was replace by other code

        private cmCtrlProperties_Click(sender: object, e: any) {
            if(this.contextMenuEditor !== null) {
                this.contextMenuEditor.showProperties2();
            }
        }*/

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

        public showPopMenuControl(editor: cEditor, clickInCtrl: boolean, pasteEnabled: boolean, p: Point, event: any) {

            setTimeout(P.call(this, () => {
                this.popupMenuControl.style.display = "block";
                this.popupMenuControl.style.top = `${event.pageY}px`;
                this.popupMenuControl.style.left = `${event.pageX}px`;
            }), 100);

            // this.popupMenuControl.style.display = "none";
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

        public showDbFields(field: string, editor: cEditor) {
            this.columnsDlg.clearColumns();

            let report = editor.getReport();
            let connect = report.getConnect();

            this.columnsDlg.fillColumns(connect.getDataSource(), connect.getColumns(), false);

            for(let _i = 0; _i < report.getConnectsAux().count(); _i++) {
                connect = report.getConnectsAux().item(_i);
                this.columnsDlg.fillColumns(connect.getDataSource(), connect.getColumns(), true);
            }

            this.columnsDlg.setField(field);
            return this.columnsDlg.showModal();
		}

        /* delete me this was replace by other code

        private cmSectionSectionProperties_Click(sender: object, e: any) {
            if(this.contextMenuEditor !== null) {
                this.contextMenuEditor.showProperties2();
            }
        }*/

        /* delete me this is implemented by other function

        private cmSectionSectionLineProperties_Click(sender: object, e: any) {
            if(this.contextMenuEditor !== null) {
                this.contextMenuEditor.showSecLnProperties();
            }
        }
        */

        private cmSectionGroupProperties_Click(sender: object, e: any) {
            if(this.contextMenuEditor !== null) {
                this.contextMenuEditor.showCurrentGroupProperties();
            }
        }

        private mnuViewTreeViewCtrls_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).showControlsTree();
            }
        }

        private mnuViewControls_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).showControls();
            }
        }

        private mnuViewToolbar_Click(sender: object, e: any) {
            this.showToolbox();
        }

        private tsbControls_Click(sender: object, e: any) {
            this.showToolbox();
        }

        private showToolbox() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).showToolbox();
            }
        }

        private tsbSearch_Click(sender: object, e: any) {
            this.search();
        }

        private mnuEditSearch_Click(sender: object, e: any) {
            this.search();
        }

        private search() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).search();
            }
        }

        /* delete me this was replace by other code

        private tsbProperties_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).showProperties2();
            }
        }*/

        public showControls(editor: cEditor) {
            this.lv_controls.clear();

            if(editor !== null && editor.isEditor()) {
                cGlobals.addCtrls(editor.getReport(), this.lv_controls, this.C_CTRL_IMAGE, this.C_DB_IMAGE);
            }
        }

        public showControlsTree(editor: cEditor) {
            this.wasDoubleClick = false;
            this.tv_controls.clear();

            if(editor !== null && editor.isEditor()) {
                cGlobals.addCtrls2(
                    editor.getReport(), this.tv_controls,
                    this.C_IMG_FOLDER, this.C_IMG_FORMULA,
                    this.C_IMG_CONTROL, this.C_IMG_DATABASE_FIELD);
            }
        }

        public clearProperties() {
            this.lv_properties.clear();
        }

        public showProperties(editor?: cEditor, key?: string) {
            this.lv_properties.clear();
            this.lv_properties.createHeaders(['Property', 'Value']);
            if(editor !== null && editor.isEditor()) {
                this.setObjectDescription(this.getControlOrSection(editor, key));
            }
        }

        public getPropertyDlg(): PropertyDlg {
            return this.propertyDlg;
        }

        private getControlOrSection(editor: cEditor, key?: string) {
            if(key && key.length > 1) {
                if(key.substring(0, 1) === "S") {
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
            if(anObject === null) return;

            let tabs = " ".repeat(n*2);
            const methods = Object.getOwnPropertyNames(Object.getPrototypeOf(anObject));
            methods.forEach( methodName => {
                if(   methodName.length > 3
                    && methodName.substring(0, 3) === "get"
                    && methodName.substring(0, 4) !== "get_"
                    && anObject[methodName].length === 0
                    && methodName !== "getSectionLine"
                    ) {

                    let item = this.lv_properties.add(tabs + methodName.substring(3), this.C_IMG_CONTROL);
                    item.subItems.add(anObject[methodName].call(anObject));
                    if(item.subItems.item(1).getText() === "...") item.setImageIndex(this.C_IMG_FOLDER);
                }
            });
        }

        private getValue(value: object, n: number) {
            /*
            if(n > 10) return "";

            if(value === null) {
                return "NULL";
            }
            else {
                let t = value.GetType();
                if(t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) {
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
            this.lv_fields.clear();

            if(editor !== null && editor.isEditor()) {
                let connect = editor.getReport().getConnect();
                cGlobals.fillColumns(
                    connect.getDataSource(),
                    connect.getColumns(), this.lv_fields, this.C_INDEX, this.C_FIELD_TYPE,
                    false);
            }
        }

        private lv_controls_ColumnClick(sender: object, e: any) {
            /*
            // Determine if clicked column is already the column that is being sorted.
            if(e.Column === lvwColumnSorter.SortColumn) {
                // Reverse the current sort direction for this column.
                if(lvwColumnSorter.Order === SortOrder.Ascending) {
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
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor === null || ! editor.isEditor()) return;
            if(this.lv_controls.selectedItems().length > 0 && editor !== null) {
                let info = this.lv_controls.selectedItems()[0].tag.toString();
                (editor as cEditor).selectCtrl(info);
            }
        }

        private tvControlsNodeClick(node: Node) {
            this.selectControl2(node);
        }

        private lvControlsItemClick(item: Item) {
            this.selectControl3(item);
        }

        private selectControl2(node: Node) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor === null || ! editor.isEditor()) return;
            if(node !== null
                && node.tag !== undefined
                && node.tag !== null) {

                let info = node.tag.toString();
                if(info.length > 0) {
                    let infoType = info.substring(0, 1);
                    if("@SL".indexOf(infoType) === -1) {
                        (editor as cEditor).selectCtrl(info);
                    }
                    else if(infoType === "S" || infoType === "L") {
                        (editor as cEditor).selectSection(info.substring(1));
                    }
                }
            }
        }

        private selectControl3(item: Item) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor === null || ! editor.isEditor()) return;
            if(item !== null
                && item.tag !== undefined
                && item.tag !== null) {

                let info = item.tag.toString();
                if(info.length > 0) {
                    let infoType = info.substring(0, 1);
                    if("@SL".indexOf(infoType) === -1) {
                        (editor as cEditor).selectCtrl(info);
                    }
                    else if(infoType === "S" || infoType === "L") {
                        (editor as cEditor).selectSection(info.substring(1));
                    }
                }
            }
        }

        /* delete me it has been replaced
        private tv_controls_KeyUp(sender: object, e: any) {
            this.selectControl2(this.tv_controls.selectedNode());
        }

        private tv_controls_MouseDoubleClick(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor === null || ! editor.isEditor()) return;
            if(this.tv_controls.selectedNode() !== null) {
                if(this.tv_controls.selectedNode().tag !== null) {
                    let info = this.tv_controls.selectedNode().tag.toString();
                    if(info.length > 0) {
                        let infoType = info.substring(0, 1);
                        if("@".indexOf(infoType) === -1) {
                            (editor as cEditor).showProperties(info);
                        }
                    }
                }
            }
        }

        private tv_controls_MouseDown(sender: object, e: any) {
            this.wasDoubleClick = e.Clicks > 1;
        }

        private tv_controls_BeforeCollapse(sender: object, e: any) {
            if(this.wasDoubleClick === true && e.Action === TreeViewAction.Collapse)
                e.Cancel = true;
        }

        private tv_controls_BeforeExpand(sender: object, e: any) {
            if(this.wasDoubleClick === true && e.Action === TreeViewAction.Expand)
                e.Cancel = true;
        }
        */

        /* delete me this was replace by other code

        private lv_controls_MouseDoubleClick(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor === null || ! editor.isEditor()) return;
            if(this.lv_controls.selectedItems().length > 0) {
                let info = this.lv_controls.selectedItems[0].tag.toString();
                (editor as cEditor).showProperties(info);
            }
        }*/

        public editAddHeaderClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addSection(csRptSectionType.HEADER);
            }
        }

        public editAddGroupClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addGroup();
            }
        }

        public editAddFooterClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addSection(csRptSectionType.FOOTER);
            }
        }

        public editAddLabelClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addLabel();
            }
        }

        public editAddLineClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addLineLabel();
            }
        }

        public editAddDbControlClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addDBField();
            }
        }

        public editAddImageClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addImage();
            }
        }

        public editAddChartClick() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addChart();
            }
        }

        public helpAboutClick() {
            cWindow.msgInfo(
                "Version 1.0.0"
                + "\r\n\r\nhttps://github.com/javiercrowsoft/CSReports.js",
                "CrowSoft Report Editor");
        }

        private cmSectionAddSectionLine_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).addSectionLine();
            }
        }

        private deleteReportObject(isSectionLine: boolean) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).deleteObj(isSectionLine);
            }
        }

        private cmSectionDeleteSection_Click(sender: object, e: any) {
            this.deleteReportObject(false);
        }

        private cmSectionDeleteSectionLine_Click(sender: object, e: any) {
            this.deleteReportObject(true);
        }

        private cmSectionMoveGroup_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).moveGroup();
            }
        }

        private alignText(align: CSReportGlobals.HorizontalAlignment) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).textAlign(align);
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
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).setFontBold();
            }
        }

        private saveReport(saveAs: boolean) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).saveDocument(saveAs, cMainEditor.runningInBrowser());
                this.addToRecentList((editor as cEditor).getFileName());
            }
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
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).copy();
            }
        }

        private mnuCopy_Click(sender: object, e: any) {
            this.copy();
        }

        private paste(dontMove: boolean) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).paste(false);
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
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).deleteObj(false);
            }
        }

        private printReport() {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).printReport();
            }
        }

        private tsbPrint_Click(sender: object, e: any) {
            this.printReport();
        }

        private mnuPrintReport_Click(sender: object, e: any) {
            this.printReport();
        }

        private cmCtrlBringFront_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).bringToFront();
            }
        }

        private cmCtrlSendBack_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).sendToBack();
            }
        }

        private lockToolStripMenuItem_click(sender: object, e: any) {
            /*
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                editor.moveNoMove();
                lockToolStripMenuItem.setChecked(!lockToolStripMenuItem.Checked);
                if(lockToolStripMenuItem.Checked) {
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
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                editor.moveVertical();
                horizontalToolStripMenuItem.setChecked(false);
                verticalToolStripMenuItem.setChecked(true);
                allDirectionsToolStripMenuItem.setChecked(false);
            }

             */
        }

        private horizontalToolStripMenuItem_click(sender: object, e: any) {
            /*
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                editor.moveHorizontal();
                horizontalToolStripMenuItem.setChecked(true);
                verticalToolStripMenuItem.setChecked(false);
                allDirectionsToolStripMenuItem.setChecked(false);
            }

             */
        }

        private allDirectionsToolStripMenuItem_click(sender: object, e: any) {
            /*
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                editor.moveAll();
                horizontalToolStripMenuItem.setChecked(false);
                verticalToolStripMenuItem.setChecked(false);
                allDirectionsToolStripMenuItem.setChecked(true);
            }

             */
        }

        private tsbCtrlAlignLeft_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignLeft);
            }
        }

        private tsbCtrlAlignRight_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignRight);
            }
        }

        private tsbCtrlAlignTop_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignTop);
            }
        }

        private tsbCtrlAlignBottothis_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignBottom);
            }
        }

        private tsbCtrlSameHeight_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignHeight);
            }
        }

        private tsbCtrlSameWidth_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignWidth);
            }
        }

        private tsbCtrlSameLeft_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignHorizontal);
            }
        }

        private tsbCtrlSameTop_Click(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                (editor as cEditor).controlsAlign(csECtlAlignConst.csECtlAlignVertical);
            }
        }

        private fMain_KeyUp(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
                editor.keyUp(sender, e);
            }
        }

        private fMain_KeyDown(sender: object, e: any) {
            let editor: cEditor | PreviewTab = cMainEditor.getDocActive();
            if(editor !== null && editor.isEditor()) {
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
