namespace CSReportEditor {

    import cError = CSKernelClient.cError;
    
	export class cMainEditor {

		public csNoDate: Date = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);

	    public C_HEIGHT_BAR_SECTION: number = 120;
	    public C_HEIGHT_NEW_SECTION: number = 350;

	    private static editor: cEditor;

        private static fToolbox: FToolbox = null;
        private static fControls: FControls = null;
        private static fTreeViewCtrls: FTreeViewCtrls = null;
        private static fSearch: FSearch = null;

		public static gBackColor = 0;

	    public gHideLeftBar = false;
	    public gWorkFolder = "";
	    public gbFirstOpen = false;

        private static fMain: FMain = null;

        public initEditor() {

            cRegionalCfg.init();

            if (cMainEditor.fMain === null) {
                cMainEditor.fMain = new FMain();
                cMainEditor.fMain.init();
            }
            return cMainEditor.fMain;
        }

        public getEditor() {
            return cMainEditor.fMain;
        }

	    public getDocActive() {
	        return cMainEditor.editor;
	    }

	    public setDocActive(editor: cEditor) {
	        cMainEditor.editor = editor;
	        this.setMenu();
            if (editor !== null) {
                let editorTab: TabPage = editor.getEditorTab();
                this.selectedTab = editorTab;

                if (cMainEditor.fToolbox !== null && !cMainEditor.fToolbox.IsDisposed && cMainEditor.fToolbox.Visible) {
                    if (this.getToolbox(editor) !== null) { editor.showToolbox(); }
                }
                if (cMainEditor.fControls !== null && !cMainEditor.fControls.IsDisposed && cMainEditor.fControls.Visible) {
                    if (this.getCtrlBox(editor) !== null) { editor.showControls(); }
                }
                if (cMainEditor.fTreeViewCtrls !== null && !cMainEditor.fTreeViewCtrls.IsDisposed && cMainEditor.fTreeViewCtrls.Visible) {
                    if (this.getCtrlTreeBox(editor) !== null) { editor.showControlsTree(); }
                }
            }
            else {
                if (cMainEditor.fToolbox !== null && !cMainEditor.fToolbox.IsDisposed && cMainEditor.fToolbox.Visible) {
                    cMainEditor.fToolbox.clear();
                }
                if (cMainEditor.fControls !== null && !cMainEditor.fControls.IsDisposed && cMainEditor.fControls.Visible) {
                    cMainEditor.fControls.clear();
                }
                if (cMainEditor.fTreeViewCtrls !== null && !cMainEditor.fTreeViewCtrls.IsDisposed && cMainEditor.fTreeViewCtrls.Visible) {
                    cMainEditor.fTreeViewCtrls.clear();
                }
            }
            cMainEditor.fMain.showControls(editor);
            cMainEditor.fMain.showControlsTree(editor);
            cMainEditor.fMain.showFields(editor);
        }

	    public setDocInacActive(editor: cEditor) {
	        if (cMainEditor.editor !== editor) { return; }
	        cMainEditor.editor = null;
	        this.setMenu();
            this.setEditAlignTextState(false);
	    }

	    public setStatus() {
	        try {
	            if (cMainEditor.editor === null) {
	                this.setStatusAux("");
	            } 
	            else {
                    this.setStatusAux(this.this.pGetStatus());
	            }

	        } catch (ex) {
	            cError.mngError(ex);
	        }
	    }
	    
	    private setStatusAux(status: string) {
            // TODO: implement
        }

        public setBarText(text: string) {

        }

        public setDisconnectedReport(isDisconnectedReport: boolean) {

        }

        public setEditAlignTextState(status: boolean) {
            cMainEditor.fMain.setEditAlignTextState(status);
        }

        public setEditAlignCtlState(status: boolean) {
            cMainEditor.fMain.setEditAlignCtlState(status);
        }

        public setMenuAux(enabled: boolean) {
            cMainEditor.fMain.setMenuAux(enabled);
        }

        public addToRecentList(fileName: string) {
            cMainEditor.fMain.addToRecentList(fileName);
        }

	    public setEditFontBoldValue(bBold: number) {
			// TODO: implement
	    }

	    private setMenu() {
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
                    cMainEditor.fMain.setStatus(this.this.pGetStatus());
	            }
	        } catch (ex) {
	            cError.mngError(ex);
	        }
	    }

        private pGetStatus() {
            return "";
        }

        public getSearch(editor?: cEditor) {
            if (cMainEditor.fSearch === null || cMainEditor.fSearch.IsDisposed) {
                cMainEditor.fSearch = new fSearch();
            }
            if(editor) cMainEditor.fSearch.setHandler(editor);
            return cMainEditor.fSearch;
        }

        public getToolbox(editor?: cEditor) {
            if (cMainEditor.fToolbox === null || cMainEditor.fToolbox.IsDisposed) {
                cMainEditor.fToolbox = new FToolbox();
            }
            if(editor) cMainEditor.fToolbox.setHandler(editor);
            return cMainEditor.fToolbox;
        }

        public getCtrlBox(editor?: cEditor) {
            if (cMainEditor.fControls === null || cMainEditor.fControls.IsDisposed) {
                cMainEditor.fControls = new FControls();
            }
            if(editor) cMainEditor.fControls.setHandler(editor);
            return cMainEditor.fControls;
        }

        public getCtrlTreeBox(editor: cEditor) {
            if (cMainEditor.fTreeViewCtrls === null || cMainEditor.fTreeViewCtrls.IsDisposed) {
                cMainEditor.fTreeViewCtrls = new FTreeViewCtrls();
            }
            if(editor) cMainEditor.fTreeViewCtrls.setHandler(editor);
            return cMainEditor.fTreeViewCtrls;
        }

        public clearToolbox(editor: cEditor) {
            if (cMainEditor.editor === editor) {
                if (cMainEditor.fToolbox !== null && !cMainEditor.fToolbox.IsDisposed && cMainEditor.fToolbox.Visible) {
                    cMainEditor.fToolbox.clear();
                }
            }
        }

        public showProperties(key: string) {
            cMainEditor.fMain.showProperties(cMainEditor.editor, key);
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

