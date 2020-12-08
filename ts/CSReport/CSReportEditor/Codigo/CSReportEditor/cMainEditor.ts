(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

	globalObject.CSReportEditor.createCMainEditor = function() {

	    const self = {};

	    const C_MODULE: string= "mPublic";

	    const NOERROR: number= 0;

		self.CSNOFECHA: DateTime= DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);

	    self.C_HEIGHT_BAR_SECTION: number= 120;
	    self.C_HEIGHT_NEW_SECTION: number= 350;

	    const C_KEYRECENTLIST: string= "Recent";

	    const C_CONFIG: string= "Interfaz";
	    const C_LEFTBARCOLOR: string= "LeftBarColor";
	    const C_HIDELEFTBAR: string= "HideLeftBar";
	    const C_BACKCOLOR: string= "BackColor";
	    const C_WORKFOLDER: string= "WorkFolder";

	    self.int: staticgNextReport = 0;
	    let cEditor: static = null;m_editor;

        let fToolbox: staticm_fToolbox = null;
        let fControls: staticm_fControls = null;
        let fTreeViewCtrls: staticm_fTreeViewCtrls = null;
        let fSearch: staticm_fSearch = null;

		self.int: staticgBackColor = 0;
	    self.int: staticgLeftBarColor = 0;
	    self.bool: static = null;gHideLeftBar;
	    self.String: staticgWorkFolder = "";
	    self.bool: static = null;gbFirstOpen;

        let fMain: static = null;fmain;

        self.initEditor = function() {

            cRegionalCfg.init();

            if (fmain === null) {
                fmain =  globalObject.CSReportDll.createFMain();
                fmain.init();
            }
            return fmain;
        };

        self.getEditor = function() {
            return fmain;
        };

	    self.getDocActive = function() {
	        return m_editor;
	    };

	    self.setDocActive = function(editor) {
	        m_editor = editor;
	        setMenu();
            if (editor !== null) {
                let editorTab: TabPage= editor.getEditorTab();
                .SelectedTab = editorTab;

                if (m_fToolbox !== null && !m_fToolbox.IsDisposed && m_fToolbox.Visible) {
                    if (getToolbox(editor) !== null) { editor.showToolbox(); }
                }
                if (m_fControls !== null && !m_fControls.IsDisposed && m_fControls.Visible) {
                    if (getCtrlBox(editor) !== null) { editor.showControls(); }
                }
                if (m_fTreeViewCtrls !== null && !m_fTreeViewCtrls.IsDisposed && m_fTreeViewCtrls.Visible) {
                    if (getCtrlTreeBox(editor) !== null) { editor.showControlsTree(); }
                }
            }
            else {
                if (m_fToolbox !== null && !m_fToolbox.IsDisposed && m_fToolbox.Visible) {
                    m_fToolbox.clear();
                }
                if (m_fControls !== null && !m_fControls.IsDisposed && m_fControls.Visible) {
                    m_fControls.clear();
                }
                if (m_fTreeViewCtrls !== null && !m_fTreeViewCtrls.IsDisposed && m_fTreeViewCtrls.Visible) {
                    m_fTreeViewCtrls.clear();
                }
            }
            fmain.showControls(editor);
            fmain.showControlsTree(editor);
            fmain.showFields(editor);
        };

	    self.setDocInacActive = function(editor) {
	        if (m_editor !== editor) { return; }
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

	    self.setEditFontBoldValue = function(bBold) {
			// TODO: implement
	    };

	    const setMenu = function() {
	        try {

                if (m_editor === null || m_editor.getReport() === null) {
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

        self.getSearch = function() {
            return m_fSearch;
        };

        self.getSearch = function(editor) {
            if (m_fSearch === null || m_fSearch.IsDisposed) {
                m_fSearch =  globalObject.CSReportDll.createFSearch();
            }
            m_fSearch.setHandler(editor);
            return m_fSearch;
        };

        self.getToolbox = function() {
            return m_fToolbox;
        };

        self.getToolbox = function(editor) {
            if (m_fToolbox === null || m_fToolbox.IsDisposed) {
                m_fToolbox =  globalObject.CSReportDll.createFToolbox();
            }
            m_fToolbox.setHandler(editor);
            return m_fToolbox;
        };

        self.getCtrlBox = function() {
            return m_fControls;
        };

        self.getCtrlBox = function(editor) {
            if (m_fControls === null || m_fControls.IsDisposed) {
                m_fControls =  globalObject.CSReportDll.createFControls();
            }
            m_fControls.setHandler(editor);
            return m_fControls;
        };

        self.getCtrlTreeBox = function() {
            return m_fTreeViewCtrls;
        };

        self.getCtrlTreeBox = function(editor) {
            if (m_fTreeViewCtrls === null || m_fTreeViewCtrls.IsDisposed) {
                m_fTreeViewCtrls =  globalObject.CSReportDll.createFTreeViewCtrls();
            }
            m_fTreeViewCtrls.setHandler(editor);
            return m_fTreeViewCtrls;
        };

        self.clearToolbox = function(editor) {
            if (m_editor === editor) {
                if (m_fToolbox !== null && !m_fToolbox.IsDisposed && m_fToolbox.Visible) {
                    m_fToolbox.clear();
                }
            }
        };

        self.showProperties = function(key) {
            fmain.showProperties(m_editor, key);            
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

