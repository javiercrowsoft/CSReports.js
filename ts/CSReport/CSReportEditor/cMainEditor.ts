namespace CSReportEditor {

    import cError = CSKernelClient.cError;
    import U = CSOAPI.Utils;

    import TabPage = CSForms.TabPage;

	export class cMainEditor {

		public csNoDate: Date = new Date("1900-01-01T00:00:00Z");

	    public C_HEIGHT_BAR_SECTION: number = 120;
	    public C_HEIGHT_NEW_SECTION: number = 350;

	    private static editor: cEditor | PreviewTab = null;

        private static fToolbox: FToolbox = null;
        private static fControls: FControls = null;
        private static fTreeViewCtrls: FTreeViewCtrls = null;
        private static fSearch: FSearch = null;

		public static gBackColor = 0;

	    public static gHideLeftBar = false;
	    public static gWorkFolder = "";
	    public static gbFirstOpen = false;

        private static fMain: FMain = null;

        public static runningInBrowser() {
            return true;
        }

        public static initEditor() {
            if(this.fMain === null) {
                this.fMain = new FMain();
                this.fMain.init();
            }
        }

        public static getEditor() {
            return this.fMain;
        }

	    public static getDocActive() {
	        return this.editor;
	    }

	    public static setDocActive(maybeEditor: cEditor | PreviewTab) {
	        this.editor = maybeEditor;
	        this.setMenu();

            if(! this.editor.isEditor()) return;
            const editor = (this.editor as cEditor);

            if(editor !== null) {
                let editorTab: TabPage = editor.getEditorTab();
                // TODO: implement
                //  this.selectedTab = editorTab;

                if(this.fToolbox !== null && U.isVisible(this.fToolbox)) {
                    if(this.getToolbox(editor) !== null) { editor.showToolbox(); }
                }
                if(this.fControls !== null && U.isVisible(this.fControls)) {
                    if(this.getCtrlBox(editor) !== null) { editor.showControls(); }
                }
                if(this.fTreeViewCtrls !== null && U.isVisible(this.fTreeViewCtrls)) {
                    if(this.getCtrlTreeBox(editor) !== null) { editor.showControlsTree(); }
                }
            }
            else {
                if(this.fToolbox !== null && U.isVisible(this.fToolbox)) {
                    this.fToolbox.clear();
                }
                if(this.fControls !== null && U.isVisible(this.fControls)) {
                    this.fControls.clear();
                }
                if(this.fTreeViewCtrls !== null && U.isVisible(this.fTreeViewCtrls)) {
                    this.fTreeViewCtrls.clear();
                }
            }
            this.fMain.showControls(editor);
            this.fMain.showControlsTree(editor);
            this.fMain.showFields(editor);
            this.clearProperties();
            this.showProperties();
        }

	    public static setDocInacActive(editor: cEditor) {
	        if(this.editor !== editor) { return; }
	        this.editor = null;
	        this.setMenu();
            this.setEditAlignTextState(false);
	    }

	    public static setStatus() {
	        try {
	            if(this.editor === null) {
	                this.setStatusAux("");
	            }
	            else {
                    this.setStatusAux(this.pGetStatus());
	            }

	        } catch(ex) {
	            cError.mngError(ex);
	        }
	    }

	    private static setStatusAux(status: string) {
            // TODO: implement
        }

        public static setBarText(text: string) {

        }

        public static setDisconnectedReport(isDisconnectedReport: boolean) {

        }

        public static setEditAlignTextState(status: boolean) {
            this.fMain.setEditAlignTextState(status);
        }

        public static setEditAlignCtlState(status: boolean) {
            this.fMain.setEditAlignCtlState(status);
        }

        public static setMenuAux(enabled: boolean) {
            this.fMain.setMenuAux(enabled);
        }

        public static addToRecentList(fileName: string) {
            this.fMain.addToRecentList(fileName);
        }

	    public static setEditFontBoldValue(bBold: number) {
			// TODO: implement
	    }

	    private static setMenu() {
            if(! this.editor.isEditor()) return;
            const editor = (this.editor as cEditor);

	        try {
                if(this.editor === null || editor.getReport() === null) {
                    this.fMain.setMenuAux(false);
                    this.fMain.setBarText("");
                    this.fMain.setStatus("");
	            }
	            else {
                    this.fMain.setMenuAux(true);
                    this.fMain.setDisconnectedReport(editor.getReport().getReportDisconnected());
                    this.fMain.setBarText(editor.getReport().getName());
                    this.fMain.setStatus(this.pGetStatus());
	            }
	        } catch(ex) {
	            cError.mngError(ex);
	        }
	    }

        private static pGetStatus() {
            return "";
        }

        public static getSearch(editor?: cEditor) {
            if(this.fSearch === null) {
                this.fSearch = new FSearch();
            }
            if(editor) this.fSearch.setHandler(editor);
            return this.fSearch;
        }

        public static getToolbox(editor?: cEditor) {
            if(this.fToolbox === null) {
                this.fToolbox = new FToolbox();
            }
            if(editor) this.fToolbox.setHandler(editor);
            return this.fToolbox;
        }

        public static getCtrlBox(editor?: cEditor) {
            if(this.fControls === null) {
                this.fControls = new FControls();
            }
            if(editor) this.fControls.setHandler(editor);
            return this.fControls;
        }

        public static getCtrlTreeBox(editor?: cEditor) {
            if(this.fTreeViewCtrls === null) {
                this.fTreeViewCtrls = new FTreeViewCtrls();
            }
            if(editor) this.fTreeViewCtrls.setHandler(editor);
            return this.fTreeViewCtrls;
        }

        public static clearToolbox(editor: cEditor) {
            if(this.editor === editor) {
                if(this.fToolbox !== null && U.isVisible(this.fToolbox)) {
                    this.fToolbox.clear();
                }
            }
        }

        public static clearProperties() {
            this.getPropertyDlg().clear();
            this.getPropertyDlg().disable();
            this.getPropertyDlg().showCtrlPropertyTabs();
            this.fMain.clearProperties();
        }

        public static showProperties(key?: string, isSection: boolean = false) {
            if(! this.editor.isEditor()) return;
            const editor = (this.editor as cEditor);
            if(key === undefined) {
                key = editor.getSelectedKey();
                isSection = editor.getSelectedKeyIsSection();
            }
            if(isSection) {
                this.clearProperties();
                editor.showSelectedSectionProperties();
            }
            else {
                editor.showSelectedCtrlProperties();
            }
            this.fMain.showProperties(editor, key);
        }

        public static getPropertyDlg(): PropertyDlg {
            return this.fMain.getPropertyDlg();
        }

        public static showPropertyTab(tab: string) {
            U.el('property-format-tab').style.display = tab === 'property-format-tab' ? 'block' : 'none';
            U.el('property-formulas-tab').style.display = tab === 'property-formulas-tab' ? 'block' : 'none';
            U.el('property-database-tab').style.display = tab === 'property-database-tab' ? 'block' : 'none';
            U.el('property-borders-tab').style.display = tab === 'property-borders-tab' ? 'block' : 'none';
            U.el('property-image-tab').style.display = tab === 'property-image-tab' ? 'block' : 'none';
            U.el('property-chart-tab').style.display = tab === 'property-chart-tab' ? 'block' : 'none';
            U.el('property-section-tab').style.display = tab === 'property-section-tab' ? 'block' : 'none';
        }

        public static showSideBarTab(tab: string) {
            U.el('sidebar-tv-controls').style.display = tab === 'sidebar-tv-controls' ? 'block' : 'none';
            U.el('sidebar-lv-controls').style.display = tab === 'sidebar-lv-controls' ? 'block' : 'none';
            U.el('sidebar-lv-properties').style.display = tab === 'sidebar-lv-properties' ? 'block' : 'none';
            U.el('sidebar-lv-database').style.display = tab === 'sidebar-lv-database' ? 'block' : 'none';
        }
    }

    export enum SpecialFolderIDs {
	    SFIDDESKTOP = 0x0,
	    SFIDPROGRAMS = 0x2,
	    SFIDPERSONAL = 0x5,
	    SFIDFAVORITES = 0x6,
	    SFIDSTARTUP = 0x7,
	    SFIDRECENT = 0x8,
	    SFIDSENDTO = 0x9,
	    SFIDSTARTMENU = 0xB,
	    SFIDDESKTOPDIRECTORY = 0x10,
	    SFIDNETHOOD = 0x13,
	    SFIDFONTS = 0x14,
	    SFIDTEMPLATES = 0x15,
	    SFIDCOMMON_STARTMENU = 0x16,
	    SFIDCOMMON_PROGRAMS = 0x17,
	    SFIDCOMMON_STARTUP = 0x18,
	    SFIDCOMMON_DESKTOPDIRECTORY = 0x19,
	    SFIDAPPDATA = 0x1A,
	    SFIDPRINTHOOD = 0x1B,
	    SFIDPROGRAMS_FILES = 0x26,
	    SFIDPROGRAMFILES = 0x10000,
	    SFIDCOMMONFILES = 0x10001
	}

    export enum csEAlignConst {
	    CSEALIGNTEXTLEFT = 1,
	    CSEALIGNTEXTRIGHT,
	    CSEALIGNTEXTCENTER,
	    CSEALIGNCTLLEFT,
	    CSEALIGNCTLHORIZONTAL,
	    CSEALIGNCTLRIGHT,
	    CSEALIGNCTLVERTICAL,
	    CSEALIGNCTLTOP,
	    CSEALIGNCTLBOTTOM,
	    CSEALIGNCTLWIDTH,
 	    CSEALIGNCTLHEIGHT
	}
}

