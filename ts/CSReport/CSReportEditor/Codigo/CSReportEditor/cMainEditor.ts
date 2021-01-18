

namespace CSReportEditor
{
	export class cMainEditor {



	    private C_MODULE: string = "mPublic";

	    private NOERROR: number = 0;

		public CSNOFECHA: DateTime = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);

	    public C_HEIGHT_BAR_SECTION: number = 120;
	    public C_HEIGHT_NEW_SECTION: number = 350;

	    private C_KEYRECENTLIST: string = "Recent";

	    private C_CONFIG: string = "Interfaz";
	    private C_LEFTBARCOLOR: string = "LeftBarColor";
	    private C_HIDELEFTBAR: string = "HideLeftBar";
	    private C_BACKCOLOR: string = "BackColor";
	    private C_WORKFOLDER: string = "WorkFolder";

	    public int: static gNextReport = 0;
	    private cEditor: static = null;this.editor;

        private fToolbox: static this.fToolbox = null;
        private fControls: static this.fControls = null;
        private fTreeViewCtrls: static this.fTreeViewCtrls = null;
        private fSearch: static this.fSearch = null;

		public int: static gBackColor = 0;
	    public int: static gLeftBarColor = 0;
	    public bool: static = null;gHideLeftBar;
	    public String: static gWorkFolder = "";
	    public bool: static = null;gbFirstOpen;

        private fMain: static = null;fmain;

        public initEditor() {

            cRegionalCfg.init();

            if (fmain === null) {
                fmain = new fMain();
                fmain.init();
            }
            return fmain;
        }

        public getEditor() {
            return fmain;
        }

	    public getDocActive() {
	        return this.editor;
	    }

	    public setDocActive(editor: cEditor) {
	        this.editor = editor;
	        setMenu();
            if (editor !== null) {
                let editorTab: TabPage = editor.getEditorTab();
                .SelectedTab = editorTab;

                if (this.fToolbox !== null && !this.fToolbox.IsDisposed && this.fToolbox.Visible) {
                    if (getToolbox(editor) !== null) { editor.showToolbox(); }
                }
                if (this.fControls !== null && !this.fControls.IsDisposed && this.fControls.Visible) {
                    if (getCtrlBox(editor) !== null) { editor.showControls(); }
                }
                if (this.fTreeViewCtrls !== null && !this.fTreeViewCtrls.IsDisposed && this.fTreeViewCtrls.Visible) {
                    if (getCtrlTreeBox(editor) !== null) { editor.showControlsTree(); }
                }
            }
            else {
                if (this.fToolbox !== null && !this.fToolbox.IsDisposed && this.fToolbox.Visible) {
                    this.fToolbox.clear();
                }
                if (this.fControls !== null && !this.fControls.IsDisposed && this.fControls.Visible) {
                    this.fControls.clear();
                }
                if (this.fTreeViewCtrls !== null && !this.fTreeViewCtrls.IsDisposed && this.fTreeViewCtrls.Visible) {
                    this.fTreeViewCtrls.clear();
                }
            }
            fmain.showControls(editor);
            fmain.showControlsTree(editor);
            fmain.showFields(editor);
        }

	    public setDocInacActive(editor: cEditor) {
	        if (this.editor !== editor) { return; }
	        this.editor = null;
	        setMenu();
	        setEditAlignTextState(false);
	    }

	    public setStatus() {
	        try {
	            if (this.editor === null) {
	                setStatus("");
	            } 
	            else {
	                setStatus(pGetStatus());
	            }

	        } catch (Exception ex) {
	            cError.mngError(ex, "setStatus", C_MODULE, "");
	        }
	    }

        public setStatus(status: string) {

        }

        public setBarText(text: string) {

        }

        public setDisconnectedReport(isDisconnectedReport: boolean) {

        }

        public setEditAlignTextState(status: boolean) {
            fmain.setEditAlignTextState(status);
        }

        public setEditAlignCtlState(status: boolean) {
            fmain.setEditAlignCtlState(status);
        }

        public setMenuAux(enabled: boolean) {
            fmain.setMenuAux(enabled);
        }

        public addToRecentList(fileName: string) {
            fmain.addToRecentList(fileName);
        }

	    public setEditFontBoldValue(bBold: number) {
			// TODO: implement
	    }

	    private setMenu() {
	        try {

                if (this.editor === null || this.editor.getReport() === null) {
	                fmain.setMenuAux(false);
	                fmain.setBarText("");
	                fmain.setStatus("");
	            } 
	            else {
	                fmain.setMenuAux(true);
	                fmain.setDisconnectedReport(this.editor.getReport().getReportDisconnected());
	                fmain.setBarText(this.editor.getReport().getName());
	                fmain.setStatus(pGetStatus());
	            }
	        } catch (Exception ex) {
	            cError.mngError(ex, "SetMenu", C_MODULE, "");
	        }
	    }

        private pGetStatus() {
            return "";
        }

        public getSearch() {
            return this.fSearch;
        }

        public getSearch(editor: cEditor) {
            if (this.fSearch === null || this.fSearch.IsDisposed) {
                this.fSearch = new fSearch();
            }
            this.fSearch.setHandler(editor);
            return this.fSearch;
        }

        public getToolbox() {
            return this.fToolbox;
        }

        public getToolbox(editor: cEditor) {
            if (this.fToolbox === null || this.fToolbox.IsDisposed) {
                this.fToolbox = new fToolbox();
            }
            this.fToolbox.setHandler(editor);
            return this.fToolbox;
        }

        public getCtrlBox() {
            return this.fControls;
        }

        public getCtrlBox(editor: cEditor) {
            if (this.fControls === null || this.fControls.IsDisposed) {
                this.fControls = new fControls();
            }
            this.fControls.setHandler(editor);
            return this.fControls;
        }

        public getCtrlTreeBox() {
            return this.fTreeViewCtrls;
        }

        public getCtrlTreeBox(editor: cEditor) {
            if (this.fTreeViewCtrls === null || this.fTreeViewCtrls.IsDisposed) {
                this.fTreeViewCtrls = new fTreeViewCtrls();
            }
            this.fTreeViewCtrls.setHandler(editor);
            return this.fTreeViewCtrls;
        }

        public clearToolbox(editor: cEditor) {
            if (this.editor === editor) {
                if (this.fToolbox !== null && !this.fToolbox.IsDisposed && this.fToolbox.Visible) {
                    this.fToolbox.clear();
                }
            }
        }

        public showProperties(key: string) {
            fmain.showProperties(this.editor, key);            
        }


    }    }



UNKNOWN >> 	public enum SpecialFolderIDs {
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


	}	}






UNKNOWN >> 	public enum csEAlignConst {
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
UNKNOWN >> 	    CSEALIGNCTLHEIGHT


	}	}



}

