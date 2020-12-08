(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

	globalObject.CSReportEditor.createCMainEditor = function() {

	    const self = {};

	    const C_MODULE = "mPublic";

	    const NOERROR = 0;

		self.CSNOFECHA = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);

	    self.C_HEIGHT_BAR_SECTION = 120;
	    self.C_HEIGHT_NEW_SECTION = 350;

	    const C_KEYRECENTLIST = "Recent";

	    const C_CONFIG = "Interfaz";
	    const C_LEFTBARCOLOR = "LeftBarColor";
	    const C_HIDELEFTBAR = "HideLeftBar";
	    const C_BACKCOLOR = "BackColor";
	    const C_WORKFOLDER = "WorkFolder";

	    self.int gNextReport = 0;
	    let cEditor m_editor = null;
	    let cEditor m_toolBoxOwner = null;
	    let cEditor m_ctrlBoxOwner = null;
	    let cEditor m_ctrlTreeBoxOwner = null;

		self.int gBackColor = 0;
	    self.int gLeftBarColor = 0;
	    self.bool gHideLeftBar = null;
	    self.String gWorkFolder = "";
	    self.bool gbFirstOpen = null;

        let fMain fmain = null;

        self.initEditor = function() {
            if (fmain === null) {
                fmain = new fMain();
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

	}

	self.createRectangle = function() {

	    const self = {};
		self.height = null;
		self.width = null;

        const Rectangle = function(rect) {
            height = rect.Height;
            width = rect.Width;
        };
        return self;

	}


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

	}


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

	}

}(globalObject));

