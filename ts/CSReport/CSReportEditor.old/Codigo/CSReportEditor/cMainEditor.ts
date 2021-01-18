

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
	    private cEditor: static = null;this.toolBoxOwner;
	    private cEditor: static = null;this.ctrlBoxOwner;
	    private cEditor: static = null;this.ctrlTreeBoxOwner;

		public int: static gBackColor = 0;
	    public int: static gLeftBarColor = 0;
	    public bool: static = null;gHideLeftBar;
	    public String: static gWorkFolder = "";
	    public bool: static = null;gbFirstOpen;

        private fMain: static = null;fmain;

        public initEditor() {
            if (fmain === null) {
                fmain = new fMain();
            }
            return fmain;
        }

	    public getDocActive() {
	        return this.editor;
	    }

	    public setDocActive(f: cEditor) {
	        this.editor = f;
	        setMenu();
	    }

	    public setDocInacActive(f: cEditor) {
	        if (this.editor !== f) { return; }
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

        public loadRecentList() {
            // TODO: implement
            fmain.loadRecentList(new List<String>());
        }

        public saveRecentList() {
            fmain.saveRecentList();
        }
	    public setEditFontBoldValue(bBold: number) {
			// TODO: implement
	    }

		public setEditAlignValue(align: HorizontalAlignment) {
			// TODO: implement
	    }

	    private setMenu() {
	        try {

	            if (this.editor === null) {
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



	}	}



	export class Rectangle {


		public height: number = null;
		public width: number = null;

        public constructor(rect: RectangleF) {
            height = rect.Height;
            width = rect.Width;
        }


	}	}






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

