(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
	globalObject.CSReportEditor.createCMainEditor = function() {

	    const self = {}; //@@@: public class cMainEditor {

	    const C_MODULE = "mPublic"; //@@@: private const string C_MODULE = "mPublic";

	    const NOERROR = 0; //@@@: private const int NOERROR = 0;

		self.CSNOFECHA = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture); //@@@: public DateTime CSNOFECHA = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);

	    self.C_HEIGHT_BAR_SECTION = 120; //@@@: public const int C_HEIGHT_BAR_SECTION = 120;
	    self.C_HEIGHT_NEW_SECTION = 350; //@@@: public const int C_HEIGHT_NEW_SECTION = 350;

	    const C_KEYRECENTLIST = "Recent"; //@@@: private const string C_KEYRECENTLIST = "Recent";

	    const C_CONFIG = "Interfaz"; //@@@: private const string C_CONFIG = "Interfaz";
	    const C_LEFTBARCOLOR = "LeftBarColor"; //@@@: private const string C_LEFTBARCOLOR = "LeftBarColor";
	    const C_HIDELEFTBAR = "HideLeftBar"; //@@@: private const string C_HIDELEFTBAR = "HideLeftBar";
	    const C_BACKCOLOR = "BackColor"; //@@@: private const string C_BACKCOLOR = "BackColor";
	    const C_WORKFOLDER = "WorkFolder"; //@@@: private const string C_WORKFOLDER = "WorkFolder";

	    self.int gNextReport = 0; //@@@: public static int gNextReport = 0;
	    let cEditor m_editor = null; //@@@: private static cEditor m_editor;

        let fToolbox m_fToolbox = null; //@@@: private static fToolbox m_fToolbox = null;
        let fControls m_fControls = null; //@@@: private static fControls m_fControls = null;
        let fTreeViewCtrls m_fTreeViewCtrls = null; //@@@: private static fTreeViewCtrls m_fTreeViewCtrls = null;
        let fSearch m_fSearch = null; //@@@: private static fSearch m_fSearch = null;

		self.int gBackColor = 0; //@@@: public static int gBackColor = 0;
	    self.int gLeftBarColor = 0; //@@@: public static int gLeftBarColor = 0;
	    self.bool gHideLeftBar = null; //@@@: public static bool gHideLeftBar;
	    self.String gWorkFolder = ""; //@@@: public static String gWorkFolder = "";
	    self.bool gbFirstOpen = null; //@@@: public static bool gbFirstOpen;

        let fMain fmain = null; //@@@: private static fMain fmain;

        self.initEditor = function() { //@@@: public static fMain initEditor() {

            cRegionalCfg.init(); //@@@: cRegionalCfg.init();

            if (fmain === null) { //@@@: if (fmain == null) {
                fmain = new fMain(); //@@@: fmain = new fMain();
                fmain.init(); //@@@: fmain.init();
            } //@@@: }
            return fmain; //@@@: return fmain;
        }; //@@@: }

        self.getEditor = function() { //@@@: public static fMain getEditor() {
            return fmain; //@@@: return fmain;
        }; //@@@: }

	    self.getDocActive = function() { //@@@: public static cEditor getDocActive() {
	        return m_editor; //@@@: return m_editor;
	    }; //@@@: }

	    self.setDocActive = function(editor) { //@@@: public static void setDocActive(cEditor editor) {
	        m_editor = editor; //@@@: m_editor = editor;
	        setMenu(); //@@@: setMenu();
            if (editor !== null) { //@@@: if (editor != null)
                let editorTab = editor.getEditorTab(); //@@@: TabPage editorTab = editor.getEditorTab();
                .SelectedTab = editorTab; //@@@: (editorTab.Parent as TabControl).SelectedTab = editorTab;

                if (m_fToolbox !== null && !m_fToolbox.IsDisposed && m_fToolbox.Visible) { //@@@: if (m_fToolbox != null && !m_fToolbox.IsDisposed && m_fToolbox.Visible)
                    if (getToolbox(editor) !== null) { editor.showToolbox(); } //@@@: if (getToolbox(editor) != null) { editor.showToolbox(); }
                } //@@@: }
                if (m_fControls !== null && !m_fControls.IsDisposed && m_fControls.Visible) { //@@@: if (m_fControls != null && !m_fControls.IsDisposed && m_fControls.Visible)
                    if (getCtrlBox(editor) !== null) { editor.showControls(); } //@@@: if (getCtrlBox(editor) != null) { editor.showControls(); }
                } //@@@: }
                if (m_fTreeViewCtrls !== null && !m_fTreeViewCtrls.IsDisposed && m_fTreeViewCtrls.Visible) { //@@@: if (m_fTreeViewCtrls != null && !m_fTreeViewCtrls.IsDisposed && m_fTreeViewCtrls.Visible)
                    if (getCtrlTreeBox(editor) !== null) { editor.showControlsTree(); } //@@@: if (getCtrlTreeBox(editor) != null) { editor.showControlsTree(); }
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                if (m_fToolbox !== null && !m_fToolbox.IsDisposed && m_fToolbox.Visible) { //@@@: if (m_fToolbox != null && !m_fToolbox.IsDisposed && m_fToolbox.Visible)
                    m_fToolbox.clear(); //@@@: m_fToolbox.clear();
                } //@@@: }
                if (m_fControls !== null && !m_fControls.IsDisposed && m_fControls.Visible) { //@@@: if (m_fControls != null && !m_fControls.IsDisposed && m_fControls.Visible)
                    m_fControls.clear(); //@@@: m_fControls.clear();
                } //@@@: }
                if (m_fTreeViewCtrls !== null && !m_fTreeViewCtrls.IsDisposed && m_fTreeViewCtrls.Visible) { //@@@: if (m_fTreeViewCtrls != null && !m_fTreeViewCtrls.IsDisposed && m_fTreeViewCtrls.Visible)
                    m_fTreeViewCtrls.clear(); //@@@: m_fTreeViewCtrls.clear();
                } //@@@: }
            } //@@@: }
            fmain.showControls(editor); //@@@: fmain.showControls(editor);
            fmain.showControlsTree(editor); //@@@: fmain.showControlsTree(editor);
            fmain.showFields(editor); //@@@: fmain.showFields(editor);
        }; //@@@: }

	    self.setDocInacActive = function(editor) { //@@@: public static void setDocInacActive(cEditor editor) {
	        if (m_editor !== editor) { return; } //@@@: if (m_editor != editor) { return; }
	        m_editor = null; //@@@: m_editor = null;
	        setMenu(); //@@@: setMenu();
	        setEditAlignTextState(false); //@@@: setEditAlignTextState(false);
	    }; //@@@: }

	    self.setStatus = function() { //@@@: public static void setStatus() {
	        try { //@@@: try {
	            if (m_editor === null) { //@@@: if (m_editor == null) {
	                setStatus(""); //@@@: setStatus("");
	            }  //@@@: }
	            else { //@@@: else {
	                setStatus(pGetStatus()); //@@@: setStatus(pGetStatus());
	            } //@@@: }

	        } catch (Exception ex) { //@@@: } catch (Exception ex) {
	            cError.mngError(ex, "setStatus", C_MODULE, ""); //@@@: cError.mngError(ex, "setStatus", C_MODULE, "");
	        } //@@@: }
	    }; //@@@: }

        self.setStatus = function(status) { //@@@: public static void setStatus(String status) {

        }; //@@@: }

        self.setBarText = function(text) { //@@@: public static void setBarText(String text) {

        }; //@@@: }

        self.setDisconnectedReport = function(isDisconnectedReport) { //@@@: public static void setDisconnectedReport(bool isDisconnectedReport) {

        }; //@@@: }

        self.setEditAlignTextState = function(status) { //@@@: public static void setEditAlignTextState(bool status) {
            fmain.setEditAlignTextState(status); //@@@: fmain.setEditAlignTextState(status);
        }; //@@@: }

        self.setEditAlignCtlState = function(status) { //@@@: public static void setEditAlignCtlState(bool status) {
            fmain.setEditAlignCtlState(status); //@@@: fmain.setEditAlignCtlState(status);
        }; //@@@: }

        self.setMenuAux = function(enabled) { //@@@: public static void setMenuAux(bool enabled) {
            fmain.setMenuAux(enabled); //@@@: fmain.setMenuAux(enabled);
        }; //@@@: }

        self.addToRecentList = function(fileName) { //@@@: public static void addToRecentList(String fileName){
            fmain.addToRecentList(fileName); //@@@: fmain.addToRecentList(fileName);
        }; //@@@: }

	    self.setEditFontBoldValue = function(bBold) { //@@@: public static void setEditFontBoldValue(int bBold) {
			// TODO: implement
	    }; //@@@: }

	    const setMenu = function() { //@@@: private static void setMenu() {
	        try { //@@@: try {

                if (m_editor === null || m_editor.getReport() === null) { //@@@: if (m_editor == null || m_editor.getReport() == null)
	                fmain.setMenuAux(false); //@@@: fmain.setMenuAux(false);
	                fmain.setBarText(""); //@@@: fmain.setBarText("");
	                fmain.setStatus(""); //@@@: fmain.setStatus("");
	            }  //@@@: }
	            else { //@@@: else {
	                fmain.setMenuAux(true); //@@@: fmain.setMenuAux(true);
	                fmain.setDisconnectedReport(m_editor.getReport().getReportDisconnected()); //@@@: fmain.setDisconnectedReport(m_editor.getReport().getReportDisconnected());
	                fmain.setBarText(m_editor.getReport().getName()); //@@@: fmain.setBarText(m_editor.getReport().getName());
	                fmain.setStatus(pGetStatus()); //@@@: fmain.setStatus(pGetStatus());
	            } //@@@: }
	        } catch (Exception ex) { //@@@: } catch (Exception ex) {
	            cError.mngError(ex, "SetMenu", C_MODULE, ""); //@@@: cError.mngError(ex, "SetMenu", C_MODULE, "");
	        } //@@@: }
	    }; //@@@: }

        const pGetStatus = function() { //@@@: private static string pGetStatus() {
            return ""; //@@@: return "";
        }; //@@@: }

        self.getSearch = function() { //@@@: public static fSearch getSearch()
            return m_fSearch; //@@@: return m_fSearch;
        }; //@@@: }

        self.getSearch = function(editor) { //@@@: public static fSearch getSearch(cEditor editor)
            if (m_fSearch === null || m_fSearch.IsDisposed) { //@@@: if (m_fSearch == null || m_fSearch.IsDisposed)
                m_fSearch = new fSearch(); //@@@: m_fSearch = new fSearch();
            } //@@@: }
            m_fSearch.setHandler(editor); //@@@: m_fSearch.setHandler(editor);
            return m_fSearch; //@@@: return m_fSearch;
        }; //@@@: }

        self.getToolbox = function() { //@@@: public static fToolbox getToolbox()
            return m_fToolbox; //@@@: return m_fToolbox;
        }; //@@@: }

        self.getToolbox = function(editor) { //@@@: public static fToolbox getToolbox(cEditor editor)
            if (m_fToolbox === null || m_fToolbox.IsDisposed) { //@@@: if (m_fToolbox == null || m_fToolbox.IsDisposed)
                m_fToolbox = new fToolbox(); //@@@: m_fToolbox = new fToolbox();
            } //@@@: }
            m_fToolbox.setHandler(editor); //@@@: m_fToolbox.setHandler(editor);
            return m_fToolbox; //@@@: return m_fToolbox;
        }; //@@@: }

        self.getCtrlBox = function() { //@@@: public static fControls getCtrlBox()
            return m_fControls; //@@@: return m_fControls;
        }; //@@@: }

        self.getCtrlBox = function(editor) { //@@@: public static fControls getCtrlBox(cEditor editor)
            if (m_fControls === null || m_fControls.IsDisposed) { //@@@: if (m_fControls == null || m_fControls.IsDisposed)
                m_fControls = new fControls(); //@@@: m_fControls = new fControls();
            } //@@@: }
            m_fControls.setHandler(editor); //@@@: m_fControls.setHandler(editor);
            return m_fControls; //@@@: return m_fControls;
        }; //@@@: }

        self.getCtrlTreeBox = function() { //@@@: public static fTreeViewCtrls getCtrlTreeBox()
            return m_fTreeViewCtrls; //@@@: return m_fTreeViewCtrls;
        }; //@@@: }

        self.getCtrlTreeBox = function(editor) { //@@@: public static fTreeViewCtrls getCtrlTreeBox(cEditor editor)
            if (m_fTreeViewCtrls === null || m_fTreeViewCtrls.IsDisposed) { //@@@: if (m_fTreeViewCtrls == null || m_fTreeViewCtrls.IsDisposed)
                m_fTreeViewCtrls = new fTreeViewCtrls(); //@@@: m_fTreeViewCtrls = new fTreeViewCtrls();
            } //@@@: }
            m_fTreeViewCtrls.setHandler(editor); //@@@: m_fTreeViewCtrls.setHandler(editor);
            return m_fTreeViewCtrls; //@@@: return m_fTreeViewCtrls;
        }; //@@@: }

        self.clearToolbox = function(editor) { //@@@: public static void clearToolbox(cEditor editor)
            if (m_editor === editor) { //@@@: if (m_editor == editor)
                if (m_fToolbox !== null && !m_fToolbox.IsDisposed && m_fToolbox.Visible) { //@@@: if (m_fToolbox != null && !m_fToolbox.IsDisposed && m_fToolbox.Visible)
                    m_fToolbox.clear(); //@@@: m_fToolbox.clear();
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.showProperties = function(key) { //@@@: public static void showProperties(string key)
            fmain.showProperties(m_editor, key);             //@@@: fmain.showProperties(m_editor, key);
        }; //@@@: }
        return self;

    } //@@@: }

UNKNOWN >> 	public enum SpecialFolderIDs { //@@@: public enum SpecialFolderIDs {
	    SFIDDESKTOP = 0x0, //@@@: SFIDDESKTOP = 0x0,
	    SFIDPROGRAMS = 0x2, //@@@: SFIDPROGRAMS = 0x2,
	    SFIDPERSONAL = 0x5, //@@@: SFIDPERSONAL = 0x5,
	    SFIDFAVORITES = 0x6, //@@@: SFIDFAVORITES = 0x6,
	    SFIDSTARTUP = 0x7, //@@@: SFIDSTARTUP = 0x7,
	    SFIDRECENT = 0x8, //@@@: SFIDRECENT = 0x8,
	    SFIDSENDTO = 0x9, //@@@: SFIDSENDTO = 0x9,
	    SFIDSTARTMENU = 0xB, //@@@: SFIDSTARTMENU = 0xB,
	    SFIDDESKTOPDIRECTORY = 0x10, //@@@: SFIDDESKTOPDIRECTORY = 0x10,
	    SFIDNETHOOD = 0x13, //@@@: SFIDNETHOOD = 0x13,
	    SFIDFONTS = 0x14, //@@@: SFIDFONTS = 0x14,
	    SFIDTEMPLATES = 0x15, //@@@: SFIDTEMPLATES = 0x15,
	    SFIDCOMMON_STARTMENU = 0x16, //@@@: SFIDCOMMON_STARTMENU = 0x16,
	    SFIDCOMMON_PROGRAMS = 0x17, //@@@: SFIDCOMMON_PROGRAMS = 0x17,
	    SFIDCOMMON_STARTUP = 0x18, //@@@: SFIDCOMMON_STARTUP = 0x18,
	    SFIDCOMMON_DESKTOPDIRECTORY = 0x19, //@@@: SFIDCOMMON_DESKTOPDIRECTORY = 0x19,
	    SFIDAPPDATA = 0x1A, //@@@: SFIDAPPDATA = 0x1A,
	    SFIDPRINTHOOD = 0x1B, //@@@: SFIDPRINTHOOD = 0x1B,
	    SFIDPROGRAMS_FILES = 0x26, //@@@: SFIDPROGRAMS_FILES = 0x26,
	    SFIDPROGRAMFILES = 0x10000, //@@@: SFIDPROGRAMFILES = 0x10000,
	    SFIDCOMMONFILES = 0x10001 //@@@: SFIDCOMMONFILES = 0x10001
        return self;

	} //@@@: }


UNKNOWN >> 	public enum csEAlignConst { //@@@: public enum csEAlignConst {
	    CSEALIGNTEXTLEFT = 1, //@@@: CSEALIGNTEXTLEFT = 1,
	    CSEALIGNTEXTRIGHT, //@@@: CSEALIGNTEXTRIGHT,
	    CSEALIGNTEXTCENTER, //@@@: CSEALIGNTEXTCENTER,
	    CSEALIGNCTLLEFT, //@@@: CSEALIGNCTLLEFT,
	    CSEALIGNCTLHORIZONTAL, //@@@: CSEALIGNCTLHORIZONTAL,
	    CSEALIGNCTLRIGHT, //@@@: CSEALIGNCTLRIGHT,
	    CSEALIGNCTLVERTICAL, //@@@: CSEALIGNCTLVERTICAL,
	    CSEALIGNCTLTOP, //@@@: CSEALIGNCTLTOP,
	    CSEALIGNCTLBOTTOM, //@@@: CSEALIGNCTLBOTTOM,
	    CSEALIGNCTLWIDTH, //@@@: CSEALIGNCTLWIDTH,
UNKNOWN >> 	    CSEALIGNCTLHEIGHT //@@@: CSEALIGNCTLHEIGHT
        return self;

	} //@@@: }

}(globalObject)); //@@@: }

