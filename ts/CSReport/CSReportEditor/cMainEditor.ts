namespace CSReportEditor {

    import cError = CSKernelClient.cError;
    import Utils = CSOAPI.Utils;

	export class cMainEditor {

		public csNoDate: Date = new Date("1900-01-01T00:00:00Z");

	    public C_HEIGHT_BAR_SECTION: number = 120;
	    public C_HEIGHT_NEW_SECTION: number = 350;

	    private static editor: cEditor;

        private static fToolbox: FToolbox = null;
        private static fControls: FControls = null;
        private static fTreeViewCtrls: FTreeViewCtrls = null;
        private static fSearch: FSearch = null;

		public static gBackColor = 0;

	    public static gHideLeftBar = false;
	    public static gWorkFolder = "";
	    public static gbFirstOpen = false;

        private static fMain: FMain = null;

        public static initEditor() {
            if(this.fMain === null) {
                cMainEditor.fMain = new FMain();
                this.fMain.init();
            }
        }

        public static getEditor() {
            return cMainEditor.fMain;
        }

	    public static getDocActive() {
	        return cMainEditor.editor;
	    }

	    public static setDocActive(editor: cEditor) {
	        cMainEditor.editor = editor;
	        this.setMenu();
            if (editor !== null) {
                let editorTab: TabPage = editor.getEditorTab();
                // TODO: implement
                //  this.selectedTab = editorTab;

                if (cMainEditor.fToolbox !== null && Utils.isVisible(cMainEditor.fToolbox)) {
                    if (this.getToolbox(editor) !== null) { editor.showToolbox(); }
                }
                if (cMainEditor.fControls !== null && Utils.isVisible(cMainEditor.fControls)) {
                    if (this.getCtrlBox(editor) !== null) { editor.showControls(); }
                }
                if (cMainEditor.fTreeViewCtrls !== null && Utils.isVisible(cMainEditor.fTreeViewCtrls)) {
                    if (this.getCtrlTreeBox(editor) !== null) { editor.showControlsTree(); }
                }
            }
            else {
                if (cMainEditor.fToolbox !== null && Utils.isVisible(cMainEditor.fToolbox)) {
                    cMainEditor.fToolbox.clear();
                }
                if (cMainEditor.fControls !== null && Utils.isVisible(cMainEditor.fControls)) {
                    cMainEditor.fControls.clear();
                }
                if (cMainEditor.fTreeViewCtrls !== null && Utils.isVisible(cMainEditor.fTreeViewCtrls)) {
                    cMainEditor.fTreeViewCtrls.clear();
                }
            }
            cMainEditor.fMain.showControls(editor);
            cMainEditor.fMain.showControlsTree(editor);
            cMainEditor.fMain.showFields(editor);
        }

	    public static setDocInacActive(editor: cEditor) {
	        if (cMainEditor.editor !== editor) { return; }
	        cMainEditor.editor = null;
	        this.setMenu();
            this.setEditAlignTextState(false);
	    }

	    public static setStatus() {
	        try {
	            if (cMainEditor.editor === null) {
	                this.setStatusAux("");
	            } 
	            else {
                    this.setStatusAux(this.pGetStatus());
	            }

	        } catch (ex) {
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
            cMainEditor.fMain.setEditAlignTextState(status);
        }

        public static setEditAlignCtlState(status: boolean) {
            cMainEditor.fMain.setEditAlignCtlState(status);
        }

        public static setMenuAux(enabled: boolean) {
            cMainEditor.fMain.setMenuAux(enabled);
        }

        public static addToRecentList(fileName: string) {
            cMainEditor.fMain.addToRecentList(fileName);
        }

	    public static setEditFontBoldValue(bBold: number) {
			// TODO: implement
	    }

	    private static setMenu() {
	        try {

                if (cMainEditor.editor === null || cMainEditor.editor.getReport() === null) {
                    cMainEditor.fMain.setMenuAux(false);
                    cMainEditor.fMain.setBarText("");
                    cMainEditor.fMain.setStatus("");
	            } 
	            else {
                    cMainEditor.fMain.setMenuAux(true);
                    cMainEditor.fMain.setDisconnectedReport(cMainEditor.editor.getReport().getReportDisconnected());
                    cMainEditor.fMain.setBarText(cMainEditor.editor.getReport().getName());
                    cMainEditor.fMain.setStatus(this.pGetStatus());
	            }
	        } catch (ex) {
	            cError.mngError(ex);
	        }
	    }

        private static pGetStatus() {
            return "";
        }

        public static getSearch(editor?: cEditor) {
            if (cMainEditor.fSearch === null) {
                cMainEditor.fSearch = new FSearch();
            }
            if(editor) cMainEditor.fSearch.setHandler(editor);
            return cMainEditor.fSearch;
        }

        public static getToolbox(editor?: cEditor) {
            if (cMainEditor.fToolbox === null) {
                cMainEditor.fToolbox = new FToolbox();
            }
            if(editor) cMainEditor.fToolbox.setHandler(editor);
            return cMainEditor.fToolbox;
        }

        public static getCtrlBox(editor?: cEditor) {
            if (cMainEditor.fControls === null) {
                cMainEditor.fControls = new FControls();
            }
            if(editor) cMainEditor.fControls.setHandler(editor);
            return cMainEditor.fControls;
        }

        public static getCtrlTreeBox(editor?: cEditor) {
            if (cMainEditor.fTreeViewCtrls === null) {
                cMainEditor.fTreeViewCtrls = new FTreeViewCtrls();
            }
            if(editor) cMainEditor.fTreeViewCtrls.setHandler(editor);
            return cMainEditor.fTreeViewCtrls;
        }

        public static clearToolbox(editor: cEditor) {
            if (cMainEditor.editor === editor) {
                if (cMainEditor.fToolbox !== null && Utils.isVisible(cMainEditor.fToolbox)) {
                    cMainEditor.fToolbox.clear();
                }
            }
        }

        public static showProperties(key?: string) {
            cMainEditor.fMain.showProperties(cMainEditor.editor, key);
            cMainEditor.editor.showCtrlProperties2();
        }

        static getPropertyDlg(): PropertyDlg {
            return cMainEditor.fMain.getPropertyDlg();
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

