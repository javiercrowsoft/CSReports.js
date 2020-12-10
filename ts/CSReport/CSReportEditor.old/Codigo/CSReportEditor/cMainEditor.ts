(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

	globalObject.CSReportEditor.createCMainEditor = function() {

	    // @ts-ignore
	    let self: CSReportEditor.IcMainEditor = {};

	    const C_MODULE: string = "mPublic";

	    const NOERROR: number = 0;

		self.CSNOFECHA: DateTime = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);

	    self.C_HEIGHT_BAR_SECTION: number = 120;
	    self.C_HEIGHT_NEW_SECTION: number = 350;

	    const C_KEYRECENTLIST: string = "Recent";

	    const C_CONFIG: string = "Interfaz";
	    const C_LEFTBARCOLOR: string = "LeftBarColor";
	    const C_HIDELEFTBAR: string = "HideLeftBar";
	    const C_BACKCOLOR: string = "BackColor";
	    const C_WORKFOLDER: string = "WorkFolder";

	    self.int: static gNextReport = 0;
	    let cEditor: static = null;m_editor;
	    let cEditor: static = null;m_toolBoxOwner;
	    let cEditor: static = null;m_ctrlBoxOwner;
	    let cEditor: static = null;m_ctrlTreeBoxOwner;

		self.int: static gBackColor = 0;
	    self.int: static gLeftBarColor = 0;
	    self.bool: static = null;gHideLeftBar;
	    self.String: static gWorkFolder = "";
	    self.bool: static = null;gbFirstOpen;

        let fMain: static = null;fmain;

        self.initEditor = function() {
            if (fmain === null) {
                fmain = globalObject.CSReportEditor.createFMain();
            }
            return fmain;
        };

	    self.getDocActive = function() {
	        return m_editor;
	    };

	    self.setDocActive = function(f) {
	        m_editor = f;
	        setMenu();
	    };

	    self.setDocInacActive = function(f) {
	        if (m_editor !== f) { return; }
	        m_editor = null;
	        setMenu();
	        setEditAlignTextState(false);
	    };

	    self.setStatus = function() {
	        try {
	            if (m_editor === null) {
	                setStatus("");
	            } 
	            else {
	                setStatus(pGetStatus());
	            }

	        } catch (Exception ex) {
	            cError.mngError(ex, "setStatus", C_MODULE, "");
	        }
	    };

        self.setStatus = function(status) {

        };

        self.setBarText = function(text) {

        };

        self.setDisconnectedReport = function(isDisconnectedReport) {

        };

        self.setEditAlignTextState = function(status) {
            fmain.setEditAlignTextState(status);
        };

        self.setEditAlignCtlState = function(status) {
            fmain.setEditAlignCtlState(status);
        };

        self.setMenuAux = function(enabled) {
            fmain.setMenuAux(enabled);
        };

        self.addToRecentList = function(fileName) {
            fmain.addToRecentList(fileName);
        };

        self.loadRecentList = function() {
            // TODO: implement
            fmain.loadRecentList(new List<String>());
        };

        self.saveRecentList = function() {
            fmain.saveRecentList();
        };
	    self.setEditFontBoldValue = function(bBold) {
			// TODO: implement
	    };

		self.setEditAlignValue = function(align) {
			// TODO: implement
	    };

	    const setMenu = function() {
	        try {

	            if (m_editor === null) {
	                fmain.setMenuAux(false);
	                fmain.setBarText("");
	                fmain.setStatus("");
	            } 
	            else {
	                fmain.setMenuAux(true);
	                fmain.setDisconnectedReport(m_editor.getReport().getReportDisconnected());
	                fmain.setBarText(m_editor.getReport().getName());
	                fmain.setStatus(pGetStatus());
	            }
	        } catch (Exception ex) {
	            cError.mngError(ex, "SetMenu", C_MODULE, "");
	        }
	    };

        const pGetStatus = function() {
            return "";
        };

        return self;

	}	}
        return self;


	self.createRectangle = function() {

	    // @ts-ignore
	    let self: CSReportEditor.IRectangle = {};
		self.height: number = null;
		self.width: number = null;

        const Rectangle = function(rect) {
            height = rect.Height;
            width = rect.Width;
        };
        return self;

	}	}
        return self;


        return self;


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
        return self;

	}	}
        return self;


        return self;


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
        return self;

	}	}
        return self;


}(globalObject));


namespace CSReportEditor {

  export interface IRectangle {

    height;: number;
    width;: number;
  }
}
);


namespace CSReportEditor {

  export interface IRectangle {

    height;: number;
    width;: number;
  }
}
