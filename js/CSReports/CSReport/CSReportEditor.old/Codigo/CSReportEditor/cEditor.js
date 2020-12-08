(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createCEditor = function() {

        const self = {}; //@@@: public class cEditor
        let m_fmain = null; //@@@: private fMain m_fmain = null;
        let m_editor = null; //@@@: private Panel m_editor = null;
        let m_picRule = null; //@@@: private PictureBox m_picRule = null;
        let m_picReport = null; //@@@: private PictureBox m_picReport = null;
        let m_editorTab = null; //@@@: private TabPage m_editorTab = null;
        let m_reportFullPath = ""; //@@@: private String m_reportFullPath = "";
		let m_graphic = null; //@@@: private Graphics m_graphic;
		let m_name = null; //@@@: private String m_name;

        const cEditor = function(fmain, editor, rule, report, editorTab) { //@@@: public cEditor(fMain fmain, Panel editor, PictureBox rule, PictureBox report, TabPage editorTab) {
            m_fmain = fmain; //@@@: m_fmain = fmain;
            m_editor = editor; //@@@: m_editor = editor;
            m_editor.AutoScroll = true; //@@@: m_editor.AutoScroll = true;

            m_picRule = rule; //@@@: m_picRule = rule;
            m_picRule.SetBounds(cUtil.mp(1), cUtil.mp(1), cUtil.mp(50), cUtil.mp(297)); //@@@: m_picRule.SetBounds(cUtil.mp(1), cUtil.mp(1), cUtil.mp(50), cUtil.mp(297));
            m_picRule.BackColor = Color.PeachPuff; //@@@: m_picRule.BackColor = Color.PeachPuff;

            m_picReport = report; //@@@: m_picReport = report;
            m_picReport.SetBounds(cUtil.mp(50) + cUtil.mp(1), cUtil.mp(1), cUtil.mp(210), cUtil.mp(297)); //@@@: m_picReport.SetBounds(cUtil.mp(50) + cUtil.mp(1), cUtil.mp(1), cUtil.mp(210), cUtil.mp(297));
            m_picReport.BackColor = Color.Beige; //@@@: m_picReport.BackColor = Color.Beige;

            m_editorTab = editorTab; //@@@: m_editorTab = editorTab;
        }; //@@@: }

        const cEditor = function() { //@@@: private cEditor() {}

        const C_MODULE = "cEditor"; //@@@: private const String C_MODULE = "cEditor";
        const C_TOPBODY = 150; //@@@: private const int C_TOPBODY = 150;
        const C_LEFTBODY = 0; //@@@: private const int C_LEFTBODY = 0;
        const C_MIN_HEIGHT_SECTION = 50; //@@@: private const int C_MIN_HEIGHT_SECTION = 50;
        const C_SECTIONLINE = "Line "; //@@@: private const String C_SECTIONLINE = "Line ";

        const C_NOMOVE = -1111111; //@@@: private const int C_NOMOVE = -1111111;

        let m_report = null; //@@@: private cReport m_report;
        let m_paint = null; //@@@: private CSReportPaint.cReportPaint m_paint;
        let m_keyMoving = ""; //@@@: private String m_keyMoving = "";
        let m_moveType = null; //@@@: private csRptEditorMoveType m_moveType;
        let m_keySizing = ""; //@@@: private String m_keySizing = "";
        let m_mouseButtonPress = false; //@@@: private bool m_mouseButtonPress = false;
        let m_offX = 0; //@@@: private float m_offX = 0;
        let m_offY = 0; //@@@: private float m_offY = 0;
        let m_keyObj = ""; //@@@: private String m_keyObj = "";
        let m_keyFocus = ""; //@@@: private String m_keyFocus = "";
        let m_moving = false; //@@@: private bool m_moving = false;
        let m_opening = false; //@@@: private bool m_opening = false;
        let m_offSet = 0; //@@@: private float m_offSet = 0;

        // the first SectionLine from where we need 
        // to modify the top after moving sections. 
        // It is used only in footers.
        let m_indexSecLnMoved = 0; //@@@: private int m_indexSecLnMoved = 0;

        // it is used in MoveSection to calculate
        // the positions after adding new SectionLines.
        //
        let m_newSecLineOffSet = 0; //@@@: private float m_newSecLineOffSet = 0;

        let m_bMoveVertical = false; //@@@: private bool m_bMoveVertical = false;
        let m_bMoveHorizontal = false; //@@@: private bool m_bMoveHorizontal = false;
        let m_bNoMove = false; //@@@: private bool m_bNoMove = false;

        let m_vSelectedKeys = null; //@@@: private String[] m_vSelectedKeys = null;
        let m_vCopyKeys = null; //@@@: private String[] m_vCopyKeys = null;

        let m_fProgress = null; //@@@: private fProgress m_fProgress;
        let m_cancelPrinting = false; //@@@: private bool m_cancelPrinting = false;

        let m_formIndex = 0; //@@@: private int m_formIndex = 0;

        let m_fProperties = null; //@@@: private fProperties m_fProperties;
        let m_fSecProperties = null; //@@@: private fSecProperties m_fSecProperties;
        let m_fFormula = null; //@@@: private fFormula m_fFormula;
        let m_fGroup = null; //@@@: private fGroup m_fGroup;
        let m_fToolBox = null; //@@@: private fToolbox m_fToolBox;
        let m_fControls = null; //@@@: private fControls m_fControls;
        let m_fTreeCtrls = null; //@@@: private fTreeViewCtrls m_fTreeCtrls;
        let m_fConnectsAux = null; //@@@: private fConnectsAux m_fConnectsAux;
        let m_fSearch = null; //@@@: private fSearch m_fSearch;

        // names
        let m_nextNameCtrl = 0; //@@@: private int m_nextNameCtrl = 0;
        let m_showingProperties = false; //@@@: private bool m_showingProperties = false;
        let m_dataHasChanged = false; //@@@: private bool m_dataHasChanged = false;

        // to add new controls
        let m_copyControls = false; //@@@: private bool m_copyControls = false;
        let m_copyControlsFromOtherReport = false; //@@@: private bool m_copyControlsFromOtherReport = false;
        let m_bCopyWithoutMoving = false; //@@@: private bool m_bCopyWithoutMoving = false;

        let m_draging = false; //@@@: private bool m_draging = false;
        let m_controlName = ""; //@@@: private String m_controlName = "";
        let m_controlType = null; //@@@: private csRptEditCtrlType m_controlType;
        let m_fieldName = ""; //@@@: private String m_fieldName = "";
        let m_fieldType = 0; //@@@: private int m_fieldType = 0;
        let m_fieldIndex = 0; //@@@: private int m_fieldIndex = 0;
        let m_formulaText = ""; //@@@: private String m_formulaText = "";

        let m_x = 0; //@@@: private float m_x = 0;
        let m_y = 0; //@@@: private float m_y = 0;
        let m_keyboardMove = false; //@@@: private bool m_keyboardMove = false;

        let m_keyboardMoveStep = 0; //@@@: private int m_keyboardMoveStep = 0;

        let m_inMouseDown = false; //@@@: private bool m_inMouseDown = false;

        let m_typeGrid = null; //@@@: private CSReportPaint.csETypeGrid m_typeGrid;

        self.getVCopyKeys = function(idx) { //@@@: public String getVCopyKeys(int idx) {
            return m_vCopyKeys[idx]; //@@@: return m_vCopyKeys[idx];
        }; //@@@: }

        self.getVCopyKeysCount = function() { //@@@: public int getVCopyKeysCount() {
            return m_vCopyKeys.Length; //@@@: return m_vCopyKeys.Length;
        }; //@@@: }

        self.getPaint = function() { //@@@: public CSReportPaint.cReportPaint getPaint() {
            return m_paint; //@@@: return m_paint;
        }; //@@@: }

        self.setKeyboardMoveStep = function(rhs) { //@@@: public void setKeyboardMoveStep(int rhs) {
            m_keyboardMoveStep = rhs; //@@@: m_keyboardMoveStep = rhs;
        }; //@@@: }
        self.getBMoveNoMove = function() { //@@@: public bool getBMoveNoMove() {
            return m_bNoMove; //@@@: return m_bNoMove;
        }; //@@@: }
        self.getBMoveVertical = function() { //@@@: public bool getBMoveVertical() {
            return m_bMoveVertical; //@@@: return m_bMoveVertical;
        }; //@@@: }
        self.getBMoveHorizontal = function() { //@@@: public bool getBMoveHorizontal() {
            return m_bMoveHorizontal; //@@@: return m_bMoveHorizontal;
        }; //@@@: }

        self.getPaperSize = function() { //@@@: public csReportPaperType getPaperSize() {
            if (m_report === null) { return 0; } //@@@: if (m_report == null) { return 0; }
            return m_report.getPaperInfo().getPaperSize(); //@@@: return m_report.getPaperInfo().getPaperSize();
        }; //@@@: }

        self.getOrientation = function() { //@@@: public int getOrientation() {
            if (m_report === null) { return 0; } //@@@: if (m_report == null) { return 0; }
            return m_report.getPaperInfo().getOrientation(); //@@@: return m_report.getPaperInfo().getOrientation();
        }; //@@@: }

        self.getCopies = function() { //@@@: public int getCopies() {
            if (m_report === null) { return 0; } //@@@: if (m_report == null) { return 0; }
            return m_report.getLaunchInfo().getCopies(); //@@@: return m_report.getLaunchInfo().getCopies();
        }; //@@@: }

        self.setPaperSize = function(rhs) { //@@@: public void setPaperSize(csReportPaperType rhs) {
            if (m_report === null) { return; } //@@@: if (m_report == null) { return; }
            m_report.getPaperInfo().setPaperSize(rhs); //@@@: m_report.getPaperInfo().setPaperSize(rhs);
        }; //@@@: }

        self.setOrientation = function(rhs) { //@@@: public void setOrientation(int rhs) {
            if (m_report === null) { return; } //@@@: if (m_report == null) { return; }
            m_report.getPaperInfo().setOrientation(rhs); //@@@: m_report.getPaperInfo().setOrientation(rhs);
        }; //@@@: }

        self.setCopies = function(rhs) { //@@@: public void setCopies(int rhs) {
            if (m_report === null) { return; } //@@@: if (m_report == null) { return; }
            m_report.getLaunchInfo().setCopies(rhs); //@@@: m_report.getLaunchInfo().setCopies(rhs);
        }; //@@@: }

        self.setCustomHeight = function(rhs) { //@@@: public void setCustomHeight(int rhs) {
            if (m_report === null) { return; } //@@@: if (m_report == null) { return; }
            m_report.getPaperInfo().setCustomHeight(rhs); //@@@: m_report.getPaperInfo().setCustomHeight(rhs);
        }; //@@@: }

        self.setCustomWidth = function(rhs) { //@@@: public void setCustomWidth(int rhs) {
            if (m_report === null) { return; } //@@@: if (m_report == null) { return; }
            m_report.getPaperInfo().setCustomWidth(rhs); //@@@: m_report.getPaperInfo().setCustomWidth(rhs);
        }; //@@@: }

        self.getCustomHeight = function() { //@@@: public int getCustomHeight() {
            if (m_report === null) { return 0; } //@@@: if (m_report == null) { return 0; }
            return m_report.getPaperInfo().getCustomHeight(); //@@@: return m_report.getPaperInfo().getCustomHeight();
        }; //@@@: }

        self.getCustomWidth = function() { //@@@: public int getCustomWidth() {
            if (m_report === null) { return 0; } //@@@: if (m_report == null) { return 0; }
            return m_report.getPaperInfo().getCustomWidth(); //@@@: return m_report.getPaperInfo().getCustomWidth();
        }; //@@@: }

        self.getFileName = function() { //@@@: public String getFileName() {
            return m_report.getPath() + m_report.getName(); //@@@: return m_report.getPath() + m_report.getName();
        }; //@@@: }

        self.getShowingProperties = function() { //@@@: public bool getShowingProperties() {
            return m_showingProperties; //@@@: return m_showingProperties;
        }; //@@@: }

        self.setShowingProperties = function(rhs) { //@@@: public void setShowingProperties(bool rhs) {
            m_showingProperties = rhs; //@@@: m_showingProperties = rhs;
        }; //@@@: }

        self.getFGroup = function() { //@@@: public fGroup getFGroup() {
            return m_fGroup; //@@@: return m_fGroup;
        }; //@@@: }

        self.setFGroup = function(rhs) { //@@@: public void setFGroup(fGroup rhs) {
            m_fGroup = rhs; //@@@: m_fGroup = rhs;
        }; //@@@: }

        self.getReport = function() { //@@@: public cReport getReport() {
            return m_report; //@@@: return m_report;
        }; //@@@: }

        self.getDataHasChanged = function() { //@@@: public bool getDataHasChanged() {
            return m_dataHasChanged; //@@@: return m_dataHasChanged;
        }; //@@@: }

        self.setDataHasChanged = function(rhs) { //@@@: public void setDataHasChanged(bool rhs) {
            m_dataHasChanged = rhs; //@@@: m_dataHasChanged = rhs;
        }; //@@@: }

        self.search = function() { //@@@: public void search() {
            m_fSearch = new fSearch(); //@@@: m_fSearch = new fSearch();
            m_fSearch.ShowDialog(); //@@@: m_fSearch.ShowDialog();
        }; //@@@: }

        self.moveVertical = function() { //@@@: public void moveVertical() {
			// TODO: reimplement
			//form_KeyUp(Keys.F11, false);
        }; //@@@: }

        self.moveHorizontal = function() { //@@@: public void moveHorizontal() {
			// TODO: reimplement
			//form_KeyUp(Keys.F12, false);
        }; //@@@: }

        self.moveNoMove = function() { //@@@: public void moveNoMove() {
			// TODO: reimplement
			//form_KeyUp(Keys.F9, false);
        }; //@@@: }

        self.moveAll = function() { //@@@: public void moveAll() {
			// TODO: reimplement
			//form_KeyUp(Keys.F8, false);
        }; //@@@: }

        self.showGrid = function(typeGrid) { //@@@: public void showGrid(CSReportPaint.csETypeGrid typeGrid) {
            m_typeGrid = typeGrid; //@@@: m_typeGrid = typeGrid;
            m_paint.initGrid(m_picReport.CreateGraphics(), typeGrid); //@@@: m_paint.initGrid(m_picReport.CreateGraphics(), typeGrid);
        }; //@@@: }

        self.showConnectsAux = function() { //@@@: public void showConnectsAux() {
            try { //@@@: try {
                m_fConnectsAux = new fConnectsAux(); //@@@: m_fConnectsAux = new fConnectsAux();

                /* TODO: this code must to be moved to fConnectsAux constructor //@@@: /* TODO: this code must to be moved to fConnectsAux constructor
                 * 

                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = m_fConnectsAux.lvColumns;
                    w___TYPE_NOT_FOUND.ListItems.fToolbox.clear();
                    w___TYPE_NOT_FOUND.ColumnHeaders.fToolbox.clear();
                    w___TYPE_NOT_FOUND.ColumnHeaders.Add(, , "DataSource", 2500);
                    w___TYPE_NOT_FOUND.ColumnHeaders.Add(, , "StrConnect", 5000);
                */
				for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
					pAddConnectAuxToListView(m_report.getConnectsAux().item(_i)); //@@@: pAddConnectAuxToListView(m_report.getConnectsAux().item(_i));
                }                 //@@@: }
                m_fConnectsAux.ShowDialog(); //@@@: m_fConnectsAux.ShowDialog();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "showConnectsAux", C_MODULE, ""); //@@@: cError.mngError(ex, "showConnectsAux", C_MODULE, "");
                m_fConnectsAux.Close(); //@@@: m_fConnectsAux.Close();
                m_fConnectsAux = null; //@@@: m_fConnectsAux = null;
            } //@@@: }
        }; //@@@: }

        const pAddConnectAuxToListView = function(connect) { //@@@: private void pAddConnectAuxToListView(cReportConnect connect) {
			m_fConnectsAux.addConnect(connect.getDataSource(), connect.getStrConnect()); //@@@: m_fConnectsAux.addConnect(connect.getDataSource(), connect.getStrConnect());
        }; //@@@: }
		// TODO: reimplement
		/* //@@@: /*
        private void form_KeyUp(Keys keyCode, bool ctrlKey) {
            // if we are in edit mode we do nothing
            //
            if (TxEdit.Visible) { return; }

            switch (keyCode) {

                case Keys.F2:
                    editText();

                    break;
                case Keys.Delete:
                    deleteObj();

                    break;
                case Keys.Escape:
                    endDraging();

                    break;
                case Keys.F11:
                    m_bMoveVertical = true;
                    m_bMoveHorizontal = false;
                    cGlobals.setStatus();

                    break;
                case Keys.F12:
                    m_bMoveHorizontal = true;
                    m_bMoveVertical = false;
                    cGlobals.setStatus();

                    break;
                case Keys.F8:
                    m_bMoveHorizontal = false;
                    m_bMoveVertical = false;
                    cGlobals.setStatus();

                    break;
                case Keys.F9:
                    m_bNoMove = !m_bNoMove;
                    cGlobals.setStatus();

                    break;
                case Keys.F4:
                    showProperties();

                    break;
                case Keys.C:
                    if (ctrlKey) {
                        copy();
                    }

                    break;
                case Keys.V:
                    if (ctrlKey) {
                        paste(false);
                    }

                    break;
            }

            Application.DoEvents();
        }
		*/

        // TODO: this functionality must to be moved to fConnectsAux
        //
        const m_fConnectsAux_AddConnect = function() { //@@@: private void m_fConnectsAux_AddConnect() {
            try { //@@@: try {

                let rptConnect = null; //@@@: cReportConnect rptConnect = null;
                rptConnect = new cReportConnect(); //@@@: rptConnect = new cReportConnect();

                if (!configConnection(rptConnect)) { return; } //@@@: if (!configConnection(rptConnect)) { return; }

                m_report.getConnectsAux().add(rptConnect); //@@@: m_report.getConnectsAux().add(rptConnect);

                pAddConnectAuxToListView(rptConnect); //@@@: pAddConnectAuxToListView(rptConnect);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fConnectsAux_AddConnect", C_MODULE, "");         //@@@: cError.mngError(ex, "m_fConnectsAux_AddConnect", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        // TODO: this functionality must to be moved to fConnectsAux
        //
        const m_fConnectsAux_DeleteConnect = function() { //@@@: private void m_fConnectsAux_DeleteConnect() {
			/* //@@@: /*
            try {
                int index = 0;

                if (m_fConnectsAux.lvColumns.SelectedItem === null) {
                    cWindow.msgWarning("Select one connection", "Additional connections");
                    return;
                }

                // TODO: this functionality must to be refactored to separate the
                //       UI code from the business code
                //
                index = m_fConnectsAux.lvColumns.SelectedItem.index;

                m_report.getConnectsAux().remove(index);

                m_fConnectsAux.lvColumns.ListItems.Remove(index);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fConnectsAux_DeleteConnect", C_MODULE, "");
            }
            */
        }; //@@@: }

        // TODO: this functionality must to be moved to fConnectsAux
        //
        const m_fConnectsAux_EditConnect = function() { //@@@: private void m_fConnectsAux_EditConnect() {
			/* //@@@: /*
            try {
                int index = 0;

                if (m_fConnectsAux.lvColumns.SelectedItem === null) {
                    cWindow.msgWarning("Select one connection", "Additional Connections");
                    return;
                }

                index = m_fConnectsAux.lvColumns.SelectedItem.index;

                if (!configConnection(m_report.getConnectsAux(index))) { return; }

                //TODO:** can't found type for with block
                //With m_fConnectsAux.lvColumns.SelectedItem
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = m_fConnectsAux.lvColumns.SelectedItem;
                    w___TYPE_NOT_FOUND.Text = m_report.getConnectsAux(index).DataSource;
                    w___TYPE_NOT_FOUND.SubItems(1) = m_report.getConnectsAux(index).strConnect;
                // {end with: w___TYPE_NOT_FOUND}

            } catch (Exception ex) {
                cError.mngError(ex, "m_fConnectsAux_EditConnect", C_MODULE, "");
            }
            */
        }; //@@@: }

        const m_fControls_EditCtrl = function(ctrlKey) { //@@@: private void m_fControls_EditCtrl(String ctrlKey) {
            try { //@@@: try {

                pSelectCtrl(ctrlKey); //@@@: pSelectCtrl(ctrlKey);
                showProperties(); //@@@: showProperties();
                m_fControls.clear(); //@@@: m_fControls.clear();
                m_fControls.addCtrls(m_report); //@@@: m_fControls.addCtrls(m_report);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fControls_EditCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fControls_EditCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fSearch_EditCtrl = function(ctrlKey) { //@@@: private void m_fSearch_EditCtrl(String ctrlKey) {
            try { //@@@: try {

                pSelectCtrl(ctrlKey); //@@@: pSelectCtrl(ctrlKey);
                showProperties(); //@@@: showProperties();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_EditCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fSearch_EditCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fSearch_EditSection = function(secKey) { //@@@: private void m_fSearch_EditSection(String secKey) {
            try { //@@@: try {

                let bIsSecLn = false; //@@@: bool bIsSecLn = false;

				pSelectSection(secKey, bIsSecLn); //@@@: pSelectSection(secKey, out bIsSecLn);

                if (bIsSecLn) { //@@@: if (bIsSecLn) {
                    showSecLnProperties(); //@@@: showSecLnProperties();
                }  //@@@: }
                else { //@@@: else {
                    showProperties(); //@@@: showProperties();
                } //@@@: }

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_EditSection", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fSearch_EditSection", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fSearch_SetFocusCtrl = function(ctrlKey) { //@@@: private void m_fSearch_SetFocusCtrl(String ctrlKey) {
            try { //@@@: try {

                pSelectCtrl(ctrlKey); //@@@: pSelectCtrl(ctrlKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_SetFocusCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fSearch_SetFocusCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fSearch_SetFocusSec = function(secKey) { //@@@: private void m_fSearch_SetFocusSec(String secKey) {
            try { //@@@: try {

                pSelectSection(secKey); //@@@: pSelectSection(secKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_SetFocusSec", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fSearch_SetFocusSec", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fTreeCtrls_EditCtrl = function(ctrlKey) { //@@@: private void m_fTreeCtrls_EditCtrl(String ctrlKey) {
            try { //@@@: try {

                pSelectCtrl(ctrlKey); //@@@: pSelectCtrl(ctrlKey);
                showProperties(); //@@@: showProperties();
                m_fTreeCtrls.clear(); //@@@: m_fTreeCtrls.clear();
                m_fTreeCtrls.addCtrls(m_report); //@@@: m_fTreeCtrls.addCtrls(m_report);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_EditCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fTreeCtrls_EditCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fControls_SetFocusCtrl = function(ctrlKey) { //@@@: private void m_fControls_SetFocusCtrl(String ctrlKey) {
            try { //@@@: try {

                pSelectCtrl(ctrlKey); //@@@: pSelectCtrl(ctrlKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fControls_SetFocusCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fControls_SetFocusCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fTreeCtrls_EditSection = function(secKey) { //@@@: private void m_fTreeCtrls_EditSection(String secKey) {
            try { //@@@: try {

                let bIsSecLn = false; //@@@: bool bIsSecLn = false;

				pSelectSection(secKey, bIsSecLn); //@@@: pSelectSection(secKey, out bIsSecLn);

                if (bIsSecLn) { //@@@: if (bIsSecLn) {
                    showSecLnProperties(); //@@@: showSecLnProperties();
                }  //@@@: }
                else { //@@@: else {
                    showProperties(); //@@@: showProperties();
                } //@@@: }
                m_fTreeCtrls.clear(); //@@@: m_fTreeCtrls.clear();
                m_fTreeCtrls.addCtrls(m_report); //@@@: m_fTreeCtrls.addCtrls(m_report);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_EditCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fTreeCtrls_EditCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fTreeCtrls_SetFocusCtrl = function(ctrlKey) { //@@@: private void m_fTreeCtrls_SetFocusCtrl(String ctrlKey) {
            try { //@@@: try {

                pSelectCtrl(ctrlKey); //@@@: pSelectCtrl(ctrlKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_SetFocusCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fTreeCtrls_SetFocusCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fTreeCtrls_SetFocusSec = function(secKey) { //@@@: private void m_fTreeCtrls_SetFocusSec(String secKey) {
            try { //@@@: try {

                pSelectSection(secKey); //@@@: pSelectSection(secKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_SetFocusSec", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fTreeCtrls_SetFocusSec", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const pSelectCtrl = function(ctrlKey) { //@@@: private void pSelectCtrl(String ctrlKey) {
            let bWasRemoved = false; //@@@: bool bWasRemoved = false;
            let sKey = ""; //@@@: String sKey = "";

			G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            sKey = getReport().getControls().item(ctrlKey).getKeyPaint(); //@@@: sKey = getReport().getControls().item(ctrlKey).getKeyPaint();
            pAddToSelected(sKey, false, bWasRemoved); //@@@: pAddToSelected(sKey, false, out bWasRemoved);

            if (bWasRemoved) { sKey = ""; } //@@@: if (bWasRemoved) { sKey = ""; }

            m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
            m_keyObj = sKey; //@@@: m_keyObj = sKey;
			m_paint.setFocus(m_keyFocus, m_graphic, true); //@@@: m_paint.setFocus(m_keyFocus, m_graphic, true);
        }; //@@@: }

		const pSelectSection = function(secKey) { //@@@: private void pSelectSection(String secKey)
			let bIsSecLn = false; //@@@: bool bIsSecLn = false;
			pSelectSection (secKey, bIsSecLn); //@@@: pSelectSection (secKey, out bIsSecLn);
		}; //@@@: }

        const pSelectSection = function(secKey, bIsSecLn) { //@@@: private void pSelectSection(String secKey, out bool bIsSecLn) {
            let bWasRemoved = false; //@@@: bool bWasRemoved = false;
            let sKey = ""; //@@@: String sKey = "";

            bIsSecLn = false; //@@@: bIsSecLn = false;

			G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);

			if (m_report.getHeaders().item(secKey) !== null) { //@@@: if (m_report.getHeaders().item(secKey) != null) {
                sKey = m_report.getHeaders().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getHeaders().item(secKey).getKeyPaint();
            }  //@@@: }
			else if (m_report.getGroupsHeaders().item(secKey) !== null) { //@@@: else if (m_report.getGroupsHeaders().item(secKey) != null) {
                sKey = m_report.getGroupsHeaders().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getGroupsHeaders().item(secKey).getKeyPaint();
            }  //@@@: }
			else if (m_report.getDetails().item(secKey) !== null) { //@@@: else if (m_report.getDetails().item(secKey) != null) {
                sKey = m_report.getDetails().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getDetails().item(secKey).getKeyPaint();
            }  //@@@: }
			else if (m_report.getGroupsFooters().item(secKey) !== null) { //@@@: else if (m_report.getGroupsFooters().item(secKey) != null) {
                sKey = m_report.getGroupsFooters().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getGroupsFooters().item(secKey).getKeyPaint();
            }  //@@@: }
			else if (m_report.getFooters().item(secKey) !== null) { //@@@: else if (m_report.getFooters().item(secKey) != null) {
                sKey = m_report.getFooters().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getFooters().item(secKey).getKeyPaint();
            }  //@@@: }
            else { //@@@: else {
                let secLn = null; //@@@: cReportSectionLine secLn = null;
                let sec = null; //@@@: cReportSection sec = null;

                bIsSecLn = true; //@@@: bIsSecLn = true;

				secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), out sec);
                if (secLn !== null) { //@@@: if (secLn != null) {
                    sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                    if (sKey === "") { //@@@: if (sKey == "") {
                        sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                    } //@@@: }
                }  //@@@: }
                else { //@@@: else {
					secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), out sec);
                    if (secLn !== null) { //@@@: if (secLn != null) {
                        sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                        if (sKey === "") { //@@@: if (sKey == "") {
                            sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                        } //@@@: }
                    }  //@@@: }
                    else { //@@@: else {
						secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), out sec);
                        if (secLn !== null) { //@@@: if (secLn != null) {
                            sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                            if (sKey === "") { //@@@: if (sKey == "") {
                                sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                            } //@@@: }
                        }  //@@@: }
                        else { //@@@: else {
							secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), out sec);
                            if (secLn !== null) { //@@@: if (secLn != null) {
                                sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                                if (sKey === "") { //@@@: if (sKey == "") {
                                    sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                                } //@@@: }
                            }  //@@@: }
                            else { //@@@: else {
								secLn = pGetSecLnFromKey(secKey, m_report.getFooters(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getFooters(), out sec);
                                if (secLn !== null) { //@@@: if (secLn != null) {
                                    sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                                    if (sKey === "") { //@@@: if (sKey == "") {
                                        sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                                    } //@@@: }
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            if (sKey === "") { return; } //@@@: if (sKey == "") { return; }

            pAddToSelected(sKey, false, bWasRemoved); //@@@: pAddToSelected(sKey, false, out bWasRemoved);
            if (bWasRemoved) { sKey = ""; } //@@@: if (bWasRemoved) { sKey = ""; }

            m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
            m_keyObj = sKey; //@@@: m_keyObj = sKey;
			m_paint.setFocus(m_keyFocus, m_graphic, true); //@@@: m_paint.setFocus(m_keyFocus, m_graphic, true);
        }; //@@@: }

        const pGetSecLnFromKey = function( //@@@: private cReportSectionLine pGetSecLnFromKey(
            secKey,  //@@@: String secKey,
			sections,  //@@@: cIReportGroupSections sections,
            rtnSec) { //@@@: out cReportSection rtnSec)
            let sec = null; //@@@: cReportSection sec = null;
			rtnSec = null; //@@@: rtnSec = null;
			for(var _i = 0; _i < sections.count(); _i++) { //@@@: for (int _i = 0; _i < sections.count(); _i++) {
				sec = sections.item(_i); //@@@: sec = sections.item(_i);
				if (sec.getSectionLines().item(secKey) !== null) { //@@@: if (sec.getSectionLines().item(secKey) != null) {
                    rtnSec = sec; //@@@: rtnSec = sec;
                    return sec.getSectionLines().item(secKey); //@@@: return sec.getSectionLines().item(secKey);
                } //@@@: }
            } //@@@: }
			return null; //@@@: return null;
        }; //@@@: }

        const m_fFormula_CheckSintaxis = function(cancel, code) { //@@@: private void m_fFormula_CheckSintaxis(out bool cancel, String code) {
            let f = null; //@@@: cReportFormula f = null;
            f = new cReportFormula(); //@@@: f = new cReportFormula();
            if (m_fProperties !== null) { //@@@: if (m_fProperties != null) {
                f.setName(m_fProperties.getFormulaName()); //@@@: f.setName(m_fProperties.getFormulaName());
            }  //@@@: }
            else { //@@@: else {
                f.setName(m_fSecProperties.getFormulaName()); //@@@: f.setName(m_fSecProperties.getFormulaName());
            } //@@@: }
            f.setText(code); //@@@: f.setText(code);
			cancel = !m_report.getCompiler().checkSyntax(f); //@@@: cancel = !m_report.getCompiler().checkSyntax(f);
        }; //@@@: }

        const m_fGroup_ShowHelpDbField = function() { //@@@: private void m_fGroup_ShowHelpDbField() {
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;
            let sField = ""; //@@@: String sField = "";

			sField = m_fGroup.getDbField(); //@@@: sField = m_fGroup.getDbField();
            nFieldType = m_fGroup.getFieldType(); //@@@: nFieldType = m_fGroup.getFieldType();
            nIndex = m_fGroup.getIndex(); //@@@: nIndex = m_fGroup.getIndex();

			if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { return; } //@@@: if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { return; }

			m_fGroup.setDbField(sField); //@@@: m_fGroup.setDbField(sField);
            m_fGroup.setFieldType(nFieldType); //@@@: m_fGroup.setFieldType(nFieldType);
            m_fGroup.setIndex(nIndex); //@@@: m_fGroup.setIndex(nIndex);
        }; //@@@: }

        const m_fProperties_ShowEditFormula = function(formula, cancel) { //@@@: private void m_fProperties_ShowEditFormula(String formula, out bool cancel) {
			pShowEditFormula(formula, cancel); //@@@: pShowEditFormula(formula, out cancel);
        }; //@@@: }

		const m_fProperties_ShowHelpChartField = function(cancel, ctrl, idx) { //@@@: private void m_fProperties_ShowHelpChartField(out bool cancel, TextBox ctrl, int idx) {
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;
            let sField = ""; //@@@: String sField = "";

            sField = ctrl.Text; //@@@: sField = ctrl.Text;
            nFieldType = m_fProperties.getChartFieldType(idx); //@@@: nFieldType = m_fProperties.getChartFieldType(idx);
            nIndex = m_fProperties.getChartIndex(idx); //@@@: nIndex = m_fProperties.getChartIndex(idx);

			cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this); //@@@: cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; } //@@@: if (cancel) { return; }

            ctrl.Text = sField; //@@@: ctrl.Text = sField;
            m_fProperties.setChartFieldType(idx, nFieldType); //@@@: m_fProperties.setChartFieldType(idx, nFieldType);
            m_fProperties.setChartIndex(idx, nIndex); //@@@: m_fProperties.setChartIndex(idx, nIndex);
        }; //@@@: }

        const m_fProperties_ShowHelpChartGroupField = function(cancel) { //@@@: private void m_fProperties_ShowHelpChartGroupField(out bool cancel) {
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;
            let sField = ""; //@@@: String sField = "";

			sField = m_fProperties.getDbFieldGroupValue(); //@@@: sField = m_fProperties.getDbFieldGroupValue();
            nFieldType = m_fProperties.getChartGroupFieldType(); //@@@: nFieldType = m_fProperties.getChartGroupFieldType();
            nIndex = m_fProperties.getChartGroupIndex(); //@@@: nIndex = m_fProperties.getChartGroupIndex();

			cancel = cGlobals.showDbFields(sField, nFieldType, nIndex, this); //@@@: cancel = cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; } //@@@: if (cancel) { return; }

			m_fProperties.setDbFieldGroupValue(sField); //@@@: m_fProperties.setDbFieldGroupValue(sField);
            m_fProperties.setChartGroupFieldType(nFieldType); //@@@: m_fProperties.setChartGroupFieldType(nFieldType);
            m_fProperties.setChartGroupIndex(nIndex); //@@@: m_fProperties.setChartGroupIndex(nIndex);
        }; //@@@: }

        const m_fSecProperties_ShowEditFormula = function(formula, cancel) { //@@@: private void m_fSecProperties_ShowEditFormula(String formula, out bool cancel) {
            pShowEditFormula(formula, cancel); //@@@: pShowEditFormula(formula, out cancel);
        }; //@@@: }

		const pShowEditFormula = function(formula, cancel) { //@@@: private void pShowEditFormula(String formula, out bool cancel) {
			cancel = false; //@@@: cancel = false;
			try { //@@@: try {

				let f = null; //@@@: cReportFormulaType f = null;
				let c = null; //@@@: cReportControl c = null;

				if (m_fFormula === null) {  //@@@: if (m_fFormula == null) {
					m_fFormula = new fFormula(); //@@@: m_fFormula = new fFormula();
					// TODO: set event handlers for fFormula
				} //@@@: }

				// TODO: this functionality has to be moved to fFormula
				//

				// Load formulas in the tree
				m_fFormula.createTree(); //@@@: m_fFormula.createTree();

				for(var _i = 0; _i < m_report.getFormulaTypes().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getFormulaTypes().count(); _i++) {
					f = m_report.getFormulaTypes().item(_i); //@@@: f = m_report.getFormulaTypes().item(_i);
					m_fFormula.addFormula(f.getId(), f.getName(), f.getNameUser(), f.getDecrip(), f.getHelpContextId()); //@@@: m_fFormula.addFormula(f.getId(), f.getName(), f.getNameUser(), f.getDecrip(), f.getHelpContextId());
				} //@@@: }

				for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++) {
					c = m_report.getControls().item(_i); //@@@: c = m_report.getControls().item(_i);
					if (c.getControlType() === csRptControlType.CSRPTCTFIELD) { //@@@: if (c.getControlType() == csRptControlType.CSRPTCTFIELD) {
						m_fFormula.addDBField(c.getName(), c.getField().getName()); //@@@: m_fFormula.addDBField(c.getName(), c.getField().getName());
					}  //@@@: }
					else if (c.getControlType() === csRptControlType.CSRPTCTLABEL) { //@@@: else if (c.getControlType() == csRptControlType.CSRPTCTLABEL) {
						m_fFormula.addLabel(c.getName()); //@@@: m_fFormula.addLabel(c.getName());
					} //@@@: }
				} //@@@: }

				m_fFormula.setFormula(formula); //@@@: m_fFormula.setFormula(formula);

				m_fFormula.expandTree(); //@@@: m_fFormula.expandTree();

				m_fFormula.center(); //@@@: m_fFormula.center();

				//
				// TODO: end functionality to move 

				m_fFormula.Show(); //@@@: m_fFormula.Show();

				cancel = !m_fFormula.getOk(); //@@@: cancel = !m_fFormula.getOk();

				if (!cancel) { //@@@: if (!cancel) {
					formula = m_fFormula.getFormula(); //@@@: formula = m_fFormula.getFormula();
				} //@@@: }

			} catch (Exception ex) { //@@@: } catch (Exception ex) {
				cError.mngError(ex, "m_fProperties_ShowEditFormula", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fProperties_ShowEditFormula", C_MODULE, "");
			} //@@@: }
		}; //@@@: }

        const m_fSecProperties_UnloadForm = function() { //@@@: private void m_fSecProperties_UnloadForm() {
            m_fSecProperties = null; //@@@: m_fSecProperties = null;
        }; //@@@: }

        const m_fToolBox_AddControl = function( //@@@: private void m_fToolBox_AddControl(
            controlName,  //@@@: String controlName,
            controlType,  //@@@: csRptEditCtrlType controlType,
            fieldName,  //@@@: String fieldName,
            formulaText,  //@@@: String formulaText,
            fieldType,  //@@@: int fieldType,
            fieldIndex) { //@@@: int fieldIndex)
            beginDraging(); //@@@: beginDraging();
            m_controlName = controlName; //@@@: m_controlName = controlName;
            m_controlType = controlType; //@@@: m_controlType = controlType;
            m_fieldName = fieldName; //@@@: m_fieldName = fieldName;
            m_formulaText = formulaText; //@@@: m_formulaText = formulaText;
            m_fieldIndex = fieldIndex; //@@@: m_fieldIndex = fieldIndex;
            m_fieldType = fieldType; //@@@: m_fieldType = fieldType;
        }; //@@@: }

        const m_fTreeCtrls_UpdateFormulaHide = function(ctrlKey, formula) { //@@@: private void m_fTreeCtrls_UpdateFormulaHide(String ctrlKey, String formula) {
            m_report.getControls().item(ctrlKey).getFormulaHide().setText(formula); //@@@: m_report.getControls().item(ctrlKey).getFormulaHide().setText(formula);
        }; //@@@: }

        const m_fTreeCtrls_UpdateFormulaValue = function(ctrlKey, formula) { //@@@: private void m_fTreeCtrls_UpdateFormulaValue(String ctrlKey, String formula) {
            m_report.getControls().item(ctrlKey).getFormulaValue().setText(formula); //@@@: m_report.getControls().item(ctrlKey).getFormulaValue().setText(formula);
        }; //@@@: }

        const m_fTreeCtrls_UpdateSectionFormulaHide = function(secKey, formula) { //@@@: private void m_fTreeCtrls_UpdateSectionFormulaHide(String secKey, String formula) {

			if (m_report.getHeaders().item(secKey) !== null) { //@@@: if (m_report.getHeaders().item(secKey) != null) {
                m_report.getHeaders().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getHeaders().item(secKey).getFormulaHide().setText(formula);
            }  //@@@: }
			else if (m_report.getGroupsHeaders().item(secKey) !== null) { //@@@: else if (m_report.getGroupsHeaders().item(secKey) != null) {
                m_report.getGroupsHeaders().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getGroupsHeaders().item(secKey).getFormulaHide().setText(formula);
            }  //@@@: }
			else if (m_report.getDetails().item(secKey) !== null) { //@@@: else if (m_report.getDetails().item(secKey) != null) {
                m_report.getDetails().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getDetails().item(secKey).getFormulaHide().setText(formula);
            }  //@@@: }
			else if (m_report.getGroupsFooters().item(secKey) !== null) { //@@@: else if (m_report.getGroupsFooters().item(secKey) != null) {
                m_report.getGroupsFooters().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getGroupsFooters().item(secKey).getFormulaHide().setText(formula);
            }  //@@@: }
			else if (m_report.getFooters().item(secKey) !== null) { //@@@: else if (m_report.getFooters().item(secKey) != null) {
                m_report.getFooters().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getFooters().item(secKey).getFormulaHide().setText(formula);
            }  //@@@: }
            else { //@@@: else {
                let secLn = null; //@@@: cReportSectionLine secLn = null;
                let sec = null; //@@@: cReportSection sec = null;

				secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), out sec);
                if (secLn !== null) { //@@@: if (secLn != null) {
                    secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                }  //@@@: }
                else { //@@@: else {
					secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), out sec);
                    if (secLn !== null) { //@@@: if (secLn != null) {
                        secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                    }  //@@@: }
                    else { //@@@: else {
						secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), out sec);
                        if (secLn !== null) { //@@@: if (secLn != null) {
                            secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                        }  //@@@: }
                        else { //@@@: else {
							secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), out sec);
                            if (secLn !== null) { //@@@: if (secLn != null) {
                                secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                            }  //@@@: }
                            else { //@@@: else {
								secLn = pGetSecLnFromKey(secKey, m_report.getFooters(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getFooters(), out sec);
                                if (secLn !== null) { //@@@: if (secLn != null) {
                                    secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

        }; //@@@: }

        const m_picReport_KeyDown = function(keyCode, shift) { //@@@: private void m_picReport_KeyDown(int keyCode, int shift) {
			let aspect = null; //@@@: cReportAspect aspect = null;
            try { //@@@: try {

                // only process arrow keys 
                switch (keyCode) { //@@@: switch (keyCode) {
				case Keys.Up: //@@@: case (int)Keys.Up:
                        break; //@@@: break;
				case Keys.Down: //@@@: case (int)Keys.Down:
                        break; //@@@: break;
				case Keys.Left: //@@@: case (int)Keys.Left:
                        break; //@@@: break;
				case Keys.Right: //@@@: case (int)Keys.Right:
                        break; //@@@: break;
                default: //@@@: default:
                        return; //@@@: return;
                } //@@@: }

                let x = 0; //@@@: float x = 0;
                let y = 0; //@@@: float y = 0;

				if (m_vSelectedKeys.Length < 1) { return; } //@@@: if (m_vSelectedKeys.Length < 1) { return; }

                if (!m_keyboardMove) { //@@@: if (!m_keyboardMove) {
                    aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
					y = aspect.getTop(); //@@@: y = aspect.getTop();
					x = aspect.getLeft(); //@@@: x = aspect.getLeft();
                }  //@@@: }
                else { //@@@: else {
                    y = m_y; //@@@: y = m_y;
                    x = m_x; //@@@: x = m_x;
                } //@@@: }

                // resize
                //
				if (Control.ModifierKeys === Keys.Shift) { //@@@: if (Control.ModifierKeys == Keys.Shift) {

                    if (m_keySizing === "") { //@@@: if (m_keySizing == "") {
                        m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey(); //@@@: m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey();
                    } //@@@: }

                    if (!m_keyboardMove) { //@@@: if (!m_keyboardMove) {

                        aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
						y = y + aspect.getHeight(); //@@@: y = y + aspect.getHeight();
						x = x + aspect.getWidth(); //@@@: x = x + aspect.getWidth();

                        pSetMovingFromKeyboard(x, y); //@@@: pSetMovingFromKeyboard(x, y);

                        if (m_keySizing === "") { //@@@: if (m_keySizing == "") {
                            m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey(); //@@@: m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey();
                        } //@@@: }

                        switch (keyCode) { //@@@: switch (keyCode) {

						case Keys.Down: //@@@: case (int)Keys.Down:
						case Keys.Up: //@@@: case (int)Keys.Up:
                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                break; //@@@: break;
						case Keys.Right: //@@@: case (int)Keys.Right:
						case Keys.Left: //@@@: case (int)Keys.Left:
                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                break; //@@@: break;
                        } //@@@: }
                    } //@@@: }

                    switch (keyCode) { //@@@: switch (keyCode) {
					case Keys.Up: //@@@: case (int)Keys.Up:
                            y = y - m_keyboardMoveStep; //@@@: y = y - m_keyboardMoveStep;
                            break; //@@@: break;
					case Keys.Down: //@@@: case (int)Keys.Down:
                            y = y + m_keyboardMoveStep; //@@@: y = y + m_keyboardMoveStep;
                            break; //@@@: break;
					case Keys.Left: //@@@: case (int)Keys.Left:
                            x = x - m_keyboardMoveStep; //@@@: x = x - m_keyboardMoveStep;
                            break; //@@@: break;
					case Keys.Right: //@@@: case (int)Keys.Right:
                            x = x + m_keyboardMoveStep; //@@@: x = x + m_keyboardMoveStep;
                            break; //@@@: break;
                    } //@@@: }

                    // move
                    //
                }  //@@@: }
                else { //@@@: else {

                    if (!m_keyboardMove) { //@@@: if (!m_keyboardMove) {
                        pSetMovingFromKeyboard(x, y); //@@@: pSetMovingFromKeyboard(x, y);
                    } //@@@: }

                    if (m_keyMoving === "") { //@@@: if (m_keyMoving == "") {
                        m_keyMoving = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey(); //@@@: m_keyMoving = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey();
                    } //@@@: }

                    switch (keyCode) { //@@@: switch (keyCode) {
					case Keys.Up: //@@@: case (int)Keys.Up:
                            y = y - m_keyboardMoveStep; //@@@: y = y - m_keyboardMoveStep;
                            break; //@@@: break;
					case Keys.Down: //@@@: case (int)Keys.Down:
                            y = y + m_keyboardMoveStep; //@@@: y = y + m_keyboardMoveStep;
                            break; //@@@: break;
					case Keys.Left: //@@@: case (int)Keys.Left:
                            x = x - m_keyboardMoveStep; //@@@: x = x - m_keyboardMoveStep;
                            break; //@@@: break;
					case Keys.Right: //@@@: case (int)Keys.Right:
                            x = x + m_keyboardMoveStep; //@@@: x = x + m_keyboardMoveStep;
                            break; //@@@: break;
                    } //@@@: }
                } //@@@: }

                m_picReport_MouseMove(MouseButtons.Left, 0, x, y); //@@@: m_picReport_MouseMove(MouseButtons.Left, 0, x, y);
                m_x = x; //@@@: m_x = x;
                m_y = y; //@@@: m_y = y;

                m_keyboardMove = true; //@@@: m_keyboardMove = true;

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_picReport_KeyDown", C_MODULE, ""); //@@@: cError.mngError(ex, "m_picReport_KeyDown", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const pSetMovingFromKeyboard = function(x, y) { //@@@: private void pSetMovingFromKeyboard(float x, float y) {

            m_keyMoving = m_keyFocus; //@@@: m_keyMoving = m_keyFocus;

            let po = m_paint.getPaintObject(m_keyMoving); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintObject(m_keyMoving);

			switch (po.getTag()) { //@@@: switch (po.getTag()) {
                case cGlobals.C_KEY_DETAIL: //@@@: case cGlobals.C_KEY_DETAIL:
                case cGlobals.C_KEY_FOOTER: //@@@: case cGlobals.C_KEY_FOOTER:
                case cGlobals.C_KEY_HEADER: //@@@: case cGlobals.C_KEY_HEADER:
                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
					m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                    break; //@@@: break;
				default: //@@@: default:
					if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL  //@@@: if (po.getRptType() == csRptTypeSection.CSRPTTPSCDETAIL
						|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER  //@@@: || po.getRptType() == csRptTypeSection.CSRPTTPSCHEADER
						|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER  //@@@: || po.getRptType() == csRptTypeSection.GROUP_SECTION_HEADER
						|| po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER  //@@@: || po.getRptType() == csRptTypeSection.GROUP_SECTION_FOOTER
						|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) { //@@@: || po.getRptType() == csRptTypeSection.CSRPTTPSCFOOTER) {

						m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    }  //@@@: }
					else if (po.getRptType() === csRptTypeSection.C_KEY_SECLN_HEADER  //@@@: else if (po.getRptType() == csRptTypeSection.C_KEY_SECLN_HEADER
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_DETAIL  //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_DETAIL
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_FOOTER  //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_FOOTER
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPH  //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_GROUPH
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPF) { //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_GROUPF) {

					    m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    }  //@@@: }
                    else { //@@@: else {
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
						m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                    } //@@@: }
                    break; //@@@: break;
            } //@@@: }

            let aspect = m_paint.getPaintObject(m_keyMoving).getAspect(); //@@@: cReportAspect aspect = m_paint.getPaintObject(m_keyMoving).getAspect();
			m_offX = x - aspect.getLeft(); //@@@: m_offX = x - aspect.getLeft();
			m_offY = y - (aspect.getTop() - aspect.getOffset()); //@@@: m_offY = y - (aspect.getTop() - aspect.getOffset());

            m_keyObj = m_keyMoving; //@@@: m_keyObj = m_keyMoving;

			cGlobals.setEditAlignTextState(m_vSelectedKeys.Length); //@@@: cGlobals.setEditAlignTextState(m_vSelectedKeys.Length);
			cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1); //@@@: cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1);
            pSetEditAlignValue(); //@@@: pSetEditAlignValue();
            pSetFontBoldValue(); //@@@: pSetFontBoldValue();

        }; //@@@: }

        const m_picReport_KeyUp = function(keyCode, ctrlKey) { //@@@: private void m_picReport_KeyUp(int keyCode, bool ctrlKey) {
            if (m_keyboardMove) { //@@@: if (m_keyboardMove) {
                m_keyboardMove = false; //@@@: m_keyboardMove = false;
                m_picReport_MouseUp(MouseButtons.Left, 0, m_x, m_y); //@@@: m_picReport_MouseUp(MouseButtons.Left, 0, m_x, m_y);
            } //@@@: }
        }; //@@@: }

		const m_picReport_MouseDown = function(button, ctrlKey, x, y) { //@@@: private void m_picReport_MouseDown(MouseButtons button, bool ctrlKey, int x, int y) {
            try { //@@@: try {

                let sKey = ""; //@@@: String sKey = "";
                let bClearSelected = false; //@@@: bool bClearSelected = false;
                let lastKeyMoving = ""; //@@@: String lastKeyMoving = "";
                let lastKeyObj = ""; //@@@: String lastKeyObj = "";

                // to avoid reentrancy
                if (m_opening) { return; } //@@@: if (m_opening) { return; }

                m_inMouseDown = true; //@@@: m_inMouseDown = true;

                if (m_draging) { //@@@: if (m_draging) {
                    addControlEnd(x, y); //@@@: addControlEnd(x, y);
                    endDraging(); //@@@: endDraging();
                } //@@@: }

                endEditText(false); //@@@: endEditText(false);

				bClearSelected = pClearSelected(button, ctrlKey, x, y); //@@@: bClearSelected = pClearSelected(button, ctrlKey, x, y);

                if (button === MouseButtons.Left) { //@@@: if (button == MouseButtons.Left) {

                    lastKeyObj = m_keyObj; //@@@: lastKeyObj = m_keyObj;
                    m_keyObj = ""; //@@@: m_keyObj = "";

					sKey = m_keyMoving !== "" ? m_keyMoving : m_keySizing; //@@@: sKey = m_keyMoving != "" ? m_keyMoving : m_keySizing;

                    // to force focus in the header
                    if (sKey === "") { //@@@: if (sKey == "") {
						m_paint.pointIsInObject(x, y, sKey); //@@@: m_paint.pointIsInObject(x, y, ref sKey);

                        if (sKey !== "") { //@@@: if (sKey != "") {

                            let po = m_paint.getPaintObject(sKey); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintObject(sKey);
                            lastKeyMoving = m_keyMoving; //@@@: lastKeyMoving = m_keyMoving;
                            m_keyMoving = sKey; //@@@: m_keyMoving = sKey;

							switch (po.getTag()) { //@@@: switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL: //@@@: case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER: //@@@: case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER: //@@@: case cGlobals.C_KEY_HEADER:

                                    // only if no controls are selected
                                    //
                                    if (ctrlKey) { //@@@: if (ctrlKey) {

										if (m_vSelectedKeys.Length > 0)  { //@@@: if (m_vSelectedKeys.Length > 0)
											return; //@@@: return;
										if (m_vSelectedKeys[0].Length > 0) { //@@@: if (m_vSelectedKeys[0].Length > 0)
											return; //@@@: return;
                                        m_keyMoving = lastKeyMoving; //@@@: m_keyMoving = lastKeyMoving;
                                        m_keyObj = lastKeyObj; //@@@: m_keyObj = lastKeyObj;
                                        return; //@@@: return;
                                    } //@@@: }

                                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
									m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;

                                    break; //@@@: break;
								default: //@@@: default:
								if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL  //@@@: if (po.getRptType() == csRptTypeSection.CSRPTTPSCDETAIL
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER  //@@@: || po.getRptType() == csRptTypeSection.CSRPTTPSCHEADER
									|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER  //@@@: || po.getRptType() == csRptTypeSection.GROUP_SECTION_HEADER
									|| po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER  //@@@: || po.getRptType() == csRptTypeSection.GROUP_SECTION_FOOTER
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) { //@@@: || po.getRptType() == csRptTypeSection.CSRPTTPSCFOOTER) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) { //@@@: if (ctrlKey) {

											if (m_vSelectedKeys.Length > 0)  { //@@@: if (m_vSelectedKeys.Length > 0)
												return; //@@@: return;
											if (m_vSelectedKeys[0].Length > 0) { //@@@: if (m_vSelectedKeys[0].Length > 0)
												return; //@@@: return;
                                            m_keyMoving = lastKeyMoving; //@@@: m_keyMoving = lastKeyMoving;
                                            m_keyObj = lastKeyObj; //@@@: m_keyObj = lastKeyObj;
                                            return; //@@@: return;
                                        } //@@@: }

										m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    }  //@@@: }
									else if (po.getRptType() === csRptTypeSection.C_KEY_SECLN_HEADER  //@@@: else if (po.getRptType() == csRptTypeSection.C_KEY_SECLN_HEADER
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_DETAIL  //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_DETAIL
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_FOOTER  //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_FOOTER
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPH  //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_GROUPH
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPF) { //@@@: || po.getRptType() == csRptTypeSection.C_KEY_SECLN_GROUPF) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) { //@@@: if (ctrlKey) {
											if (m_vSelectedKeys.Length > 0)  { //@@@: if (m_vSelectedKeys.Length > 0)
												return; //@@@: return;
											if (m_vSelectedKeys[0].Length > 0) { //@@@: if (m_vSelectedKeys[0].Length > 0)
												return; //@@@: return;
                                            m_keyMoving = lastKeyMoving; //@@@: m_keyMoving = lastKeyMoving;
                                            m_keyObj = lastKeyObj; //@@@: m_keyObj = lastKeyObj;
                                            return; //@@@: return;
                                        } //@@@: }

									    m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    }  //@@@: }
                                    else { //@@@: else {
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
										m_picReport.Cursor = Cursors.SizeAll; //@@@: m_picReport.Cursor = Cursors.SizeAll;
                                    } //@@@: }
                                    break; //@@@: break;
                            }                             //@@@: }
                        } //@@@: }
                    } //@@@: }

                    let bWasRemoved = false; //@@@: bool bWasRemoved = false;
					pAddToSelected(m_keyMoving, ctrlKey, bWasRemoved); //@@@: pAddToSelected(m_keyMoving, ctrlKey, out bWasRemoved);

                    if (bWasRemoved) { sKey = ""; } //@@@: if (bWasRemoved) { sKey = ""; }

                    if (sKey !== "") { //@@@: if (sKey != "") {
                        let aspect = m_paint.getPaintObject(sKey).getAspect(); //@@@: cReportAspect aspect = m_paint.getPaintObject(sKey).getAspect();
						m_offX = x - aspect.getLeft(); //@@@: m_offX = x - aspect.getLeft();
						m_offY = y - (aspect.getTop() - aspect.getOffset()); //@@@: m_offY = y - (aspect.getTop() - aspect.getOffset());
                    } //@@@: }

                    m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
                    m_keyObj = sKey; //@@@: m_keyObj = sKey;
					m_paint.setFocus(m_keyFocus, m_graphic, bClearSelected); //@@@: m_paint.setFocus(m_keyFocus, m_graphic, bClearSelected);

                }  //@@@: }
                else if (button === MouseButtons.Right) { //@@@: else if (button == MouseButtons.Right) {

                    m_keySizing = ""; //@@@: m_keySizing = "";
                    m_keyMoving = ""; //@@@: m_keyMoving = "";
                    m_keyObj = ""; //@@@: m_keyObj = "";

					if (m_paint.pointIsInObject(x, y, sKey)) { //@@@: if (m_paint.pointIsInObject(x, y, ref sKey)) {
                        m_keyObj = sKey; //@@@: m_keyObj = sKey;

                        bClearSelected = pSetSelectForRightBttn(); //@@@: bClearSelected = pSetSelectForRightBttn();

                        m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
						m_paint.setFocus(m_keyFocus, m_graphic, bClearSelected); //@@@: m_paint.setFocus(m_keyFocus, m_graphic, bClearSelected);

                        let po = m_paint.getPaintObject(sKey); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintObject(sKey);

                        if (m_paint.paintObjIsSection(sKey)) { //@@@: if (m_paint.paintObjIsSection(sKey)) {

                            let noDelete = false; //@@@: bool noDelete = false;

                            switch (po.getTag()) { //@@@: switch (po.getTag()) {
                                // this sections can not be moved
                                case cGlobals.C_KEY_HEADER: //@@@: case cGlobals.C_KEY_HEADER:
                                case cGlobals.C_KEY_DETAIL: //@@@: case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER: //@@@: case cGlobals.C_KEY_FOOTER:
                                    noDelete = true; //@@@: noDelete = true;
                                    break; //@@@: break;

                                default: //@@@: default:
                                    noDelete = false; //@@@: noDelete = false;
                                    break; //@@@: break;
                            } //@@@: }

                            let isGroup = false; //@@@: bool isGroup = false;
                            let isSecLn = false; //@@@: bool isSecLn = false;

                            pGetSection(isGroup, isSecLn); //@@@: pGetSection(out isGroup, out isSecLn);

                            if (isSecLn) { noDelete = true; } //@@@: if (isSecLn) { noDelete = true; }

                            showPopMenuSection(noDelete, isGroup); //@@@: showPopMenuSection(noDelete, isGroup);
                        }  //@@@: }
                        else { //@@@: else {
                            showPopMenuControl(true); //@@@: showPopMenuControl(true);
                        } //@@@: }
                    } //@@@: }
                    else { //@@@: else {
                        showPopMenuControl(false); //@@@: showPopMenuControl(false);
                    } //@@@: }
                } //@@@: }

				cGlobals.setEditAlignTextState(m_vSelectedKeys.Length); //@@@: cGlobals.setEditAlignTextState(m_vSelectedKeys.Length);
				cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1); //@@@: cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1);
                pSetEditAlignValue(); //@@@: pSetEditAlignValue();
                pSetFontBoldValue(); //@@@: pSetFontBoldValue();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_picReport_MouseDown", C_MODULE, ""); //@@@: cError.mngError(ex, "m_picReport_MouseDown", C_MODULE, "");
                m_inMouseDown = false; //@@@: m_inMouseDown = false;
            } //@@@: }
        }; //@@@: }

        self.setFontBold = function() { //@@@: public void setFontBold() {
            let bBold = 0; //@@@: int bBold = 0;
            let bBoldValue = false; //@@@: bool bBoldValue = false;
            let i = 0; //@@@: int i = 0;

            bBold = -2; //@@@: bBold = -2;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                let font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont(); //@@@: cReportFont font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

                if (bBold === -2) { //@@@: if (bBold == -2) {
					bBold = font.getBold() ? -1 : 0; //@@@: bBold = font.getBold() ? -1 : 0;
                }  //@@@: }
				else if (bBold !== (font.getBold() ? -1 : 0)) { //@@@: else if (bBold != (font.getBold() ? -1 : 0)) {
                    bBold = -2; //@@@: bBold = -2;
                    break; //@@@: break;
                }                 //@@@: }
            } //@@@: }

            if (bBold === -2) { //@@@: if (bBold == -2) {
                bBoldValue = true; //@@@: bBoldValue = true;
            }  //@@@: }
            else { //@@@: else {
                bBoldValue = bBold === 0; //@@@: bBoldValue = bBold == 0;
            } //@@@: }

            let paintObject = null; //@@@: CSReportPaint.cReportPaintObject paintObject = null;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                rptCtrl = m_report.getControls().item(paintObject.getTag()); //@@@: rptCtrl = m_report.getControls().item(paintObject.getTag());
                rptCtrl.getLabel().getAspect().getFont().setBold(bBoldValue); //@@@: rptCtrl.getLabel().getAspect().getFont().setBold(bBoldValue);
                paintObject.getAspect().getFont().setBold(bBoldValue); //@@@: paintObject.getAspect().getFont().setBold(bBoldValue);
            } //@@@: }

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;
            refreshAll(); //@@@: refreshAll();
            pSetFontBoldValue(); //@@@: pSetFontBoldValue();
        }; //@@@: }

        self.pSetFontBoldValue = function() { //@@@: public void pSetFontBoldValue() {
            let bBold = 0; //@@@: int bBold = 0;
            let i = 0; //@@@: int i = 0;

            bBold = -2; //@@@: bBold = -2;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                let font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont(); //@@@: cReportFont font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

                if (bBold === -2) { //@@@: if (bBold == -2) {
					bBold = font.getBold() ? -1 : 0; //@@@: bBold = font.getBold() ? -1 : 0;
                }  //@@@: }
				else if (bBold !== (font.getBold() ? -1 : 0)) { //@@@: else if (bBold != (font.getBold() ? -1 : 0)) {
                    bBold = -2; //@@@: bBold = -2;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

			cGlobals.setEditFontBoldValue(bBold); //@@@: cGlobals.setEditFontBoldValue(bBold);
        }; //@@@: }

		self.controlsAlign = function(align) { //@@@: public void controlsAlign(CSReportGlobals.csECtlAlignConst align) {
            let i = 0; //@@@: int i = 0;
            let paintObject = null; //@@@: CSReportPaint.cReportPaintObject paintObject = null;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

			let top = 0; //@@@: float top = 0;
			let left = 0; //@@@: float left = 0;

			let newTop = 0; //@@@: float newTop = 0;
			let newLeft = 0; //@@@: float newLeft = 0;
			let height = 0; //@@@: float height = 0;
			let width = 0; //@@@: float width = 0;
UNKNOWN >> 			cReportAspect aspect; //@@@: cReportAspect aspect;

            switch (align) { //@@@: switch (align) {

				case csECtlAlignConst.csECtlAlignHeight: //@@@: case csECtlAlignConst.csECtlAlignHeight:
				case csECtlAlignConst.csECtlAlignWidth: //@@@: case csECtlAlignConst.csECtlAlignWidth:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
				    height = aspect.getHeight(); //@@@: height = aspect.getHeight();
                    width = aspect.getWidth(); //@@@: width = aspect.getWidth();
                    break; //@@@: break;

				case csECtlAlignConst.csECtlAlignVertical: //@@@: case csECtlAlignConst.csECtlAlignVertical:
				case csECtlAlignConst.csECtlAlignHorizontal: //@@@: case csECtlAlignConst.csECtlAlignHorizontal:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
                    newTop = aspect.getTop(); //@@@: newTop = aspect.getTop();
                    newLeft = aspect.getLeft(); //@@@: newLeft = aspect.getLeft();
                    break; //@@@: break;

                default: //@@@: default:

                    switch (align) { //@@@: switch (align) {
						case csECtlAlignConst.csECtlAlignLeft: //@@@: case csECtlAlignConst.csECtlAlignLeft:
                            newLeft = 100000; //@@@: newLeft = 100000;
                            break; //@@@: break;
						case csECtlAlignConst.csECtlAlignRight: //@@@: case csECtlAlignConst.csECtlAlignRight:
                            newLeft = 0; //@@@: newLeft = 0;
                            break; //@@@: break;
						case csECtlAlignConst.csECtlAlignTop: //@@@: case csECtlAlignConst.csECtlAlignTop:
                            newTop = 100000; //@@@: newTop = 100000;
                            break; //@@@: break;
						case csECtlAlignConst.csECtlAlignBottom: //@@@: case csECtlAlignConst.csECtlAlignBottom:
                            newTop = 0; //@@@: newTop = 0;
                            break; //@@@: break;
                    } //@@@: }

                    for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                        aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();
                        top = aspect.getTop(); //@@@: top = aspect.getTop();
                        left = aspect.getLeft(); //@@@: left = aspect.getLeft();

                        switch (align) { //@@@: switch (align) {
							case csECtlAlignConst.csECtlAlignLeft: //@@@: case csECtlAlignConst.csECtlAlignLeft:
                                if (left < newLeft) { newLeft = left; } //@@@: if (left < newLeft) { newLeft = left; }
                                break; //@@@: break;
							case csECtlAlignConst.csECtlAlignRight: //@@@: case csECtlAlignConst.csECtlAlignRight:
                                if (left > newLeft) { newLeft = left; } //@@@: if (left > newLeft) { newLeft = left; }
                                break; //@@@: break;
							case csECtlAlignConst.csECtlAlignTop: //@@@: case csECtlAlignConst.csECtlAlignTop:
                                if (top < newTop) { newTop = top; } //@@@: if (top < newTop) { newTop = top; }
                                break; //@@@: break;
							case csECtlAlignConst.csECtlAlignBottom: //@@@: case csECtlAlignConst.csECtlAlignBottom:
                                if (top > newTop) { newTop = top; } //@@@: if (top > newTop) { newTop = top; }
                                break; //@@@: break;
                        } //@@@: }
                    } //@@@: }

                    break; //@@@: break;
            } //@@@: }

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                rptCtrl = m_report.getControls().item(paintObject.getTag()); //@@@: rptCtrl = m_report.getControls().item(paintObject.getTag());

                switch (align) { //@@@: switch (align) {

					case csECtlAlignConst.csECtlAlignHeight: //@@@: case csECtlAlignConst.csECtlAlignHeight:
                        rptCtrl.getLabel().getAspect().setHeight(height); //@@@: rptCtrl.getLabel().getAspect().setHeight(height);
                        paintObject.getAspect().setHeight(height); //@@@: paintObject.getAspect().setHeight(height);
                        break; //@@@: break;

					case csECtlAlignConst.csECtlAlignWidth: //@@@: case csECtlAlignConst.csECtlAlignWidth:
                        rptCtrl.getLabel().getAspect().setWidth(width); //@@@: rptCtrl.getLabel().getAspect().setWidth(width);
                        paintObject.getAspect().setWidth(width); //@@@: paintObject.getAspect().setWidth(width);
                        break; //@@@: break;

					case csECtlAlignConst.csECtlAlignLeft: //@@@: case csECtlAlignConst.csECtlAlignLeft:
					case csECtlAlignConst.csECtlAlignRight: //@@@: case csECtlAlignConst.csECtlAlignRight:
					case csECtlAlignConst.csECtlAlignHorizontal: //@@@: case csECtlAlignConst.csECtlAlignHorizontal:
                        rptCtrl.getLabel().getAspect().setLeft(newLeft); //@@@: rptCtrl.getLabel().getAspect().setLeft(newLeft);
                        paintObject.getAspect().setLeft(newLeft); //@@@: paintObject.getAspect().setLeft(newLeft);
                        break; //@@@: break;

					case csECtlAlignConst.csECtlAlignTop: //@@@: case csECtlAlignConst.csECtlAlignTop:
					case csECtlAlignConst.csECtlAlignBottom: //@@@: case csECtlAlignConst.csECtlAlignBottom:
					case csECtlAlignConst.csECtlAlignVertical: //@@@: case csECtlAlignConst.csECtlAlignVertical:
                        rptCtrl.getLabel().getAspect().setTop(newTop); //@@@: rptCtrl.getLabel().getAspect().setTop(newTop);
                        paintObject.getAspect().setTop(newTop); //@@@: paintObject.getAspect().setTop(newTop);
                        break; //@@@: break;
                } //@@@: }
            } //@@@: }

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;
            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

		self.textAlign = function(align) { //@@@: public void textAlign(CSReportGlobals.HorizontalAlignment align) {
            let i = 0; //@@@: int i = 0;
            let paintObject = null; //@@@: CSReportPaint.cReportPaintObject paintObject = null;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                rptCtrl = m_report.getControls().item(paintObject.getTag()); //@@@: rptCtrl = m_report.getControls().item(paintObject.getTag());

				rptCtrl.getLabel().getAspect().setAlign(align); //@@@: rptCtrl.getLabel().getAspect().setAlign(align);
				paintObject.getAspect().setAlign(align); //@@@: paintObject.getAspect().setAlign(align);
            } //@@@: }

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;
            refreshAll(); //@@@: refreshAll();
            pSetEditAlignValue(); //@@@: pSetEditAlignValue();
        }; //@@@: }

        const pSetEditAlignValue = function() { //@@@: private void pSetEditAlignValue() {
            let align = -1; //@@@: int align = -1;
            let i = 0; //@@@: int i = 0;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                let aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect(); //@@@: CSReportDll.cReportAspect aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();

                if (align === -1) { //@@@: if (align == -1) {
					align = aspect.getAlign(); //@@@: align = (int)aspect.getAlign();
                }  //@@@: }
				else if (align !== aspect.getAlign()) { //@@@: else if (align != (int)aspect.getAlign()) {
                    align = -2; //@@@: align = -2;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }
			cGlobals.setEditAlignValue(align); //@@@: cGlobals.setEditAlignValue(align);
        }; //@@@: }

        const pAddToSelected = function(sKey, ctrlKey, bWasRemoved) { //@@@: private void pAddToSelected(String sKey, bool ctrlKey, out bool bWasRemoved) {

			bWasRemoved = false; //@@@: bWasRemoved = false;
            let i = 0; //@@@: int i = 0;
            if (sKey === "") { return; } //@@@: if (sKey == "") { return; }

            bWasRemoved = false; //@@@: bWasRemoved = false;

            if (ctrlKey) { //@@@: if (ctrlKey) {

                for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                    if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey) {
                        pRemoveFromSelected(sKey); //@@@: pRemoveFromSelected(sKey);
                        bWasRemoved = true; //@@@: bWasRemoved = true;
                        return; //@@@: return;
                    } //@@@: }
                } //@@@: }
            }  //@@@: }
            else { //@@@: else {
                if (pAllreadySelected(sKey)) { return; } //@@@: if (pAllreadySelected(sKey)) { return; }
            } //@@@: }

			G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length + 1); //@@@: G.redimPreserve(ref m_vSelectedKeys, m_vSelectedKeys.Length + 1);
			m_vSelectedKeys[m_vSelectedKeys.Length - 1] = sKey; //@@@: m_vSelectedKeys[m_vSelectedKeys.Length - 1] = sKey;
        }; //@@@: }

        const pAllreadySelected = function(sKey) { //@@@: private bool pAllreadySelected(String sKey) {
            let i = 0; //@@@: int i = 0;

            if (sKey === "") { //@@@: if (sKey == "") {
                return true; //@@@: return true;
            } //@@@: }

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey) {
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pRemoveFromSelected = function(sKey) { //@@@: private void pRemoveFromSelected(String sKey) {
            let i = 0; //@@@: int i = 0;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey) {
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (i > m_vSelectedKeys.Length) { return; } //@@@: if (i > m_vSelectedKeys.Length) { return; }
            for (i = i + 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = i + 1; i <= m_vSelectedKeys.Length; i++) {
                m_vSelectedKeys[i - 1] = m_vSelectedKeys[i]; //@@@: m_vSelectedKeys[i - 1] = m_vSelectedKeys[i];
            } //@@@: }
            if (m_vSelectedKeys.Length > 0) { //@@@: if (m_vSelectedKeys.Length > 0) {
				G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length - 1); //@@@: G.redimPreserve(ref m_vSelectedKeys, m_vSelectedKeys.Length - 1);
            }  //@@@: }
            else { //@@@: else {
				G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            } //@@@: }

			m_paint.removeFromSelected(sKey, m_graphic); //@@@: m_paint.removeFromSelected(sKey, m_graphic);
        }; //@@@: }

        const pClearSelected = function(button, ctrlKey, x, y) { //@@@: private bool pClearSelected(MouseButtons button, bool ctrlKey, float x, float y) {
            let sKey = ""; //@@@: String sKey = "";
            let i = 0; //@@@: int i = 0;

            if (!ctrlKey && button !== MouseButtons.Right) { //@@@: if (!ctrlKey && button != MouseButtons.Right) {
				m_paint.pointIsInObject(x, y, sKey); //@@@: m_paint.pointIsInObject(x, y, ref sKey);
                for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                    if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey) {
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }
				G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
                return true; //@@@: return true;
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pShowMoveAll = function(x, y) { //@@@: private void pShowMoveAll(float x, float y) {
            let i = 0; //@@@: int i = 0;
			let offsetTop = 0; //@@@: float offsetTop = 0;
			let offsetLeft = 0; //@@@: float offsetLeft = 0;
			let firstLeft = 0; //@@@: float firstLeft = 0;
			let firstTop = 0; //@@@: float firstTop = 0;
            let clear = false; //@@@: bool clear = false;
			let offSet2 = 0; //@@@: float offSet2 = 0;

            if (m_vSelectedKeys.Length === 0) { return; } //@@@: if (m_vSelectedKeys.Length == 0) { return; }

            let aspect = m_paint.getPaintObject(m_keyMoving).getAspect(); //@@@: cReportAspect aspect = m_paint.getPaintObject(m_keyMoving).getAspect();
			firstLeft = aspect.getLeft(); //@@@: firstLeft = aspect.getLeft();
			firstTop = aspect.getTop(); //@@@: firstTop = aspect.getTop();

            clear = true; //@@@: clear = true;

            for (i = m_vSelectedKeys.Length; i <= 1; i--) { //@@@: for (i = m_vSelectedKeys.Length; i <= 1; i--) {

                aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();
                offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft()); //@@@: offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft());
                offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop()); //@@@: offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop());
				offSet2 = aspect.getOffset(); //@@@: offSet2 = aspect.getOffset();

                if (m_bMoveHorizontal) { //@@@: if (m_bMoveHorizontal) {
                    m_paint.moveObjToXYEx(m_keyMoving,  //@@@: m_paint.moveObjToXYEx(m_keyMoving,
                                            x - m_offX + offsetLeft,  //@@@: x - m_offX + offsetLeft,
                                            firstTop - offSet2 + offsetTop,  //@@@: firstTop - offSet2 + offsetTop,
											m_graphic,  //@@@: m_graphic,
                                            clear); //@@@: clear);
                }  //@@@: }
                else if (m_bMoveVertical) { //@@@: else if (m_bMoveVertical) {
                    m_paint.moveObjToXYEx(m_keyMoving,  //@@@: m_paint.moveObjToXYEx(m_keyMoving,
                                            firstLeft + offsetLeft,  //@@@: firstLeft + offsetLeft,
                                            y - m_offY + offsetTop,  //@@@: y - m_offY + offsetTop,
											m_graphic,  //@@@: m_graphic,
                                            clear); //@@@: clear);
                }  //@@@: }
                else { //@@@: else {
                    m_paint.moveObjToXYEx(m_keyMoving,  //@@@: m_paint.moveObjToXYEx(m_keyMoving,
                                            x - m_offX + offsetLeft,  //@@@: x - m_offX + offsetLeft,
                                            y - m_offY + offsetTop,  //@@@: y - m_offY + offsetTop,
						                    m_graphic,  //@@@: m_graphic,
                                            clear); //@@@: clear);
                } //@@@: }

                if (clear) { clear = false; } //@@@: if (clear) { clear = false; }
            } //@@@: }
        }; //@@@: }

        const m_picReport_MouseMove = function( //@@@: private void m_picReport_MouseMove(
            button,  //@@@: MouseButtons button,
            shift,  //@@@: int shift,
            x,  //@@@: float x,
            y) { //@@@: float y)
            let sKey = ""; //@@@: String sKey = "";
			let rgnTp = csRptPaintRegionType.CRPTPNTRGNTYPEBODY; //@@@: csRptPaintRegionType rgnTp = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;

            if (m_draging) { return; } //@@@: if (m_draging) { return; }

            if (m_inMouseDown) { return; } //@@@: if (m_inMouseDown) { return; }

            if (button === MouseButtons.Left) { //@@@: if (button == MouseButtons.Left) {

                m_paint.beginMove(); //@@@: m_paint.beginMove();

                if (m_keyMoving !== "") { //@@@: if (m_keyMoving != "") {

                    switch (m_moveType) { //@@@: switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTALL:
                            pShowMoveAll(x, y); //@@@: pShowMoveAll(x, y);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL:
							m_paint.moveHorizontal(m_keyMoving, x, m_graphic); //@@@: m_paint.moveHorizontal(m_keyMoving, x, m_graphic);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
							m_paint.moveVertical(m_keyMoving, y, m_graphic); //@@@: m_paint.moveVertical(m_keyMoving, y, m_graphic);
                            break; //@@@: break;
                    } //@@@: }

                    m_moving = true; //@@@: m_moving = true;

                }  //@@@: }
                else if (m_keySizing !== "") { //@@@: else if (m_keySizing != "") {
                    switch (m_moveType) { //@@@: switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVDOWN: //@@@: case csRptEditorMoveType.CSRPTEDMOVDOWN:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y); //@@@: m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFT: //@@@: case csRptEditorMoveType.CSRPTEDMOVLEFT:
                            m_paint.resize(m_graphic, m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_graphic, m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHT: //@@@: case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVUP: //@@@: case csRptEditorMoveType.CSRPTEDMOVUP:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN: //@@@: case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                            m_paint.resize(m_graphic, m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y); //@@@: m_paint.resize(m_graphic, m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTUP: //@@@: case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                            m_paint.resize(m_graphic, m_keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_graphic, m_keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN: //@@@: case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y); //@@@: m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTUP: //@@@: case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                    } //@@@: }
                    m_moving = true; //@@@: m_moving = true;
                }  //@@@: }
                else { //@@@: else {
                    m_moving = false; //@@@: m_moving = false;
                } //@@@: }
            }  //@@@: }
            else { //@@@: else {
                if (m_keyFocus !== "") { //@@@: if (m_keyFocus != "") {
                    sKey = m_keyFocus; //@@@: sKey = m_keyFocus;
					if (m_paint.pointIsInThisObject(x, y, m_keyFocus, rgnTp)) { //@@@: if (m_paint.pointIsInThisObject(x, y, ref m_keyFocus, ref rgnTp)) {
                        let po = m_paint.getPaintObject(sKey); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintObject(sKey);

                        let ctrl = m_report.getControls().item(po.getTag()); //@@@: cReportControl ctrl = m_report.getControls().item(po.getTag());
                        pSetSbPnlCtrl( //@@@: pSetSbPnlCtrl(
							ctrl.getName(),  //@@@: ctrl.getName(),
							ctrl.getControlType(),  //@@@: ctrl.getControlType(),
							ctrl.getFormulaHide().getText(),  //@@@: ctrl.getFormulaHide().getText(),
							ctrl.getFormulaValue().getText(),  //@@@: ctrl.getFormulaValue().getText(),
							ctrl.getHasFormulaHide(),  //@@@: ctrl.getHasFormulaHide(),
							ctrl.getHasFormulaValue(),  //@@@: ctrl.getHasFormulaValue(),
							ctrl.getField().getName()); //@@@: ctrl.getField().getName());

						if (po.getPaintType() === csRptPaintObjType.CSRPTPAINTOBJLINE) { //@@@: if (po.getPaintType() == csRptPaintObjType.CSRPTPAINTOBJLINE) {
                            m_keyMoving = sKey; //@@@: m_keyMoving = sKey;
                            m_keySizing = ""; //@@@: m_keySizing = "";
                            m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                        }  //@@@: }
                        else { //@@@: else {
                            switch (po.getTag()) { //@@@: switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL: //@@@: case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER: //@@@: case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:                                         //@@@: case cGlobals.C_KEY_HEADER:
                                    m_keyMoving = sKey; //@@@: m_keyMoving = sKey;
                                    m_keySizing = ""; //@@@: m_keySizing = "";
                                    m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    break; //@@@: break;

                                default: //@@@: default:

								if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL  //@@@: if (po.getRptType() == csRptTypeSection.CSRPTTPSCDETAIL
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER  //@@@: || po.getRptType() == csRptTypeSection.CSRPTTPSCHEADER
									|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER  //@@@: || po.getRptType() == csRptTypeSection.GROUP_SECTION_HEADER
                                        || po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER  //@@@: || po.getRptType() == csRptTypeSection.GROUP_SECTION_FOOTER
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) { //@@@: || po.getRptType() == csRptTypeSection.CSRPTTPSCFOOTER) {

                                        m_keyMoving = sKey; //@@@: m_keyMoving = sKey;
                                        m_keySizing = ""; //@@@: m_keySizing = "";
                                        m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    }  //@@@: }
                                    else { //@@@: else {

                                        switch (rgnTp) { //@@@: switch (rgnTp) {
									case csRptPaintRegionType.CRPTPNTRGNTYPEBODY: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPEBODY:
                                                m_picReport.Cursor = Cursors.SizeAll; //@@@: m_picReport.Cursor = Cursors.SizeAll;
                                                m_keyMoving = sKey; //@@@: m_keyMoving = sKey;
                                                m_keySizing = ""; //@@@: m_keySizing = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEDOWN: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPEDOWN:
                                                m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEUP: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPEUP:
                                                m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVUP; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVUP;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFT: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPELEFT:
										        m_picReport.Cursor = Cursors.SizeWE; //@@@: m_picReport.Cursor = Cursors.SizeWE;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFT; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFT;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHT: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPERIGHT:
                                                m_picReport.Cursor = Cursors.SizeWE; //@@@: m_picReport.Cursor = Cursors.SizeWE;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN:
                                                m_picReport.Cursor = Cursors.SizeNESW; //@@@: m_picReport.Cursor = Cursors.SizeNESW;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFTDOWN; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFTDOWN;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP:
                                                m_picReport.Cursor = Cursors.SizeNESW; //@@@: m_picReport.Cursor = Cursors.SizeNESW;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTUP; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTUP;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN:
                                                m_picReport.Cursor = Cursors.SizeNWSE; //@@@: m_picReport.Cursor = Cursors.SizeNWSE;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN;
                                                break; //@@@: break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP: //@@@: case csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP:
                                                m_picReport.Cursor = Cursors.SizeNWSE; //@@@: m_picReport.Cursor = Cursors.SizeNWSE;
                                                m_keySizing = sKey; //@@@: m_keySizing = sKey;
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFTUP; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFTUP;
                                                break; //@@@: break;

                                            default: //@@@: default:
                                                m_keySizing = ""; //@@@: m_keySizing = "";
                                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                                break; //@@@: break;
                                        } //@@@: }
                                    } //@@@: }
                                    break; //@@@: break;
                            } //@@@: }
                        } //@@@: }
                    }  //@@@: }
                    else { //@@@: else {
                        pSetSbPnlCtrl(""); //@@@: pSetSbPnlCtrl("");
                        m_picReport.Cursor = Cursors.Default; //@@@: m_picReport.Cursor = Cursors.Default;
                        m_keySizing = ""; //@@@: m_keySizing = "";
                        m_keyMoving = ""; //@@@: m_keyMoving = "";
                    } //@@@: }
                } //@@@: }

				if (m_paint.pointIsInObject(x, y, sKey, rgnTp)) { //@@@: if (m_paint.pointIsInObject(x, y, ref sKey, ref rgnTp)) {
                    let po = m_paint.getPaintObject(sKey); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintObject(sKey);
                    if (po.getRptType() === csRptTypeSection.CONTROL) { //@@@: if (po.getRptType() == csRptTypeSection.CONTROL) {
                        let rptCtrl = null; //@@@: cReportControl rptCtrl = null;
                        rptCtrl = m_report.getControls().item(po.getTag()); //@@@: rptCtrl = m_report.getControls().item(po.getTag());
                        if (rptCtrl !== null) { //@@@: if (rptCtrl != null) {
                            pSetSbPnlCtrl(rptCtrl.getName(),  //@@@: pSetSbPnlCtrl(rptCtrl.getName(),
                                            rptCtrl.getControlType(),  //@@@: rptCtrl.getControlType(),
                                            rptCtrl.getFormulaHide().getText(),  //@@@: rptCtrl.getFormulaHide().getText(),
                                            rptCtrl.getFormulaValue().getText(),  //@@@: rptCtrl.getFormulaValue().getText(),
                                            rptCtrl.getHasFormulaHide(),  //@@@: rptCtrl.getHasFormulaHide(),
                                            rptCtrl.getHasFormulaValue(),  //@@@: rptCtrl.getHasFormulaValue(),
                                            rptCtrl.getField().getName()); //@@@: rptCtrl.getField().getName());
                        } //@@@: }
                    }  //@@@: }
                    else { //@@@: else {
                        pSetSbPnlCtrl(""); //@@@: pSetSbPnlCtrl("");
                    } //@@@: }
                }  //@@@: }
                else { //@@@: else {
                    pSetSbPnlCtrl(""); //@@@: pSetSbPnlCtrl("");
                } //@@@: }
            } //@@@: }
        }; //@@@: }

		const pSetSbPnlCtrl = function(ctrlName) { //@@@: private void pSetSbPnlCtrl(String ctrlName)
			pSetSbPnlCtrl (ctrlName, csRptControlType.CSRPTCTLABEL, "", "", false, false, ""); //@@@: pSetSbPnlCtrl (ctrlName, csRptControlType.CSRPTCTLABEL, "", "", false, false, "");
		}; //@@@: }

        const pSetSbPnlCtrl = function( //@@@: private void pSetSbPnlCtrl(
            ctrlName,  //@@@: String ctrlName,
            ctrlType,  //@@@: csRptControlType ctrlType,
            formulaHide,  //@@@: String formulaHide,
            formulaValue,  //@@@: String formulaValue,
            hasFormulaHide,  //@@@: bool hasFormulaHide,
            hasFormulaValue,  //@@@: bool hasFormulaValue,
            fieldName) { //@@@: String fieldName)

            let msg = ""; //@@@: String msg = "";
            let strCtlType = ""; //@@@: String strCtlType = "";

            switch (ctrlType) { //@@@: switch (ctrlType) {
                case csRptControlType.CSRPTCTDBIMAGE: //@@@: case csRptControlType.CSRPTCTDBIMAGE:
                    strCtlType = "DbImage"; //@@@: strCtlType = "DbImage";
                    break; //@@@: break;
                case csRptControlType.CSRPTCTFIELD: //@@@: case csRptControlType.CSRPTCTFIELD:
                    strCtlType = "Field"; //@@@: strCtlType = "Field";
                    break; //@@@: break;
                case csRptControlType.CSRPTCTIMAGE: //@@@: case csRptControlType.CSRPTCTIMAGE:
                    strCtlType = "Image"; //@@@: strCtlType = "Image";
                    break; //@@@: break;
                case csRptControlType.CSRPTCTLABEL: //@@@: case csRptControlType.CSRPTCTLABEL:
                    strCtlType = "Label"; //@@@: strCtlType = "Label";
                    break; //@@@: break;
            } //@@@: }

            if (ctrlName !== "") { //@@@: if (ctrlName != "") {
                msg = "Ctl:[" + ctrlName //@@@: msg = "Ctl:[" + ctrlName
                    + "]Tipo:[" + strCtlType  //@@@: + "]Tipo:[" + strCtlType
					+ "]F.Hide:[" + formulaHide.Substring(1, 100)  //@@@: + "]F.Hide:[" + formulaHide.Substring(1, 100)
                    + "]Activa[" + ( hasFormulaHide).ToString()  //@@@: + "]Activa[" + ((bool) hasFormulaHide).ToString()
					+ "]F.Value:[" + formulaValue.Substring(1, 100)  //@@@: + "]F.Value:[" + formulaValue.Substring(1, 100)
                    + "]Activa[" + ( hasFormulaValue).ToString()  //@@@: + "]Activa[" + ((bool) hasFormulaValue).ToString()
                    + "]Field:[" + fieldName + "]"; //@@@: + "]Field:[" + fieldName + "]";
            } //@@@: }
            m_fmain.setsbPnlCtrl(msg); //@@@: m_fmain.setsbPnlCtrl(msg);
        }; //@@@: }

        const m_picReport_MouseUp = function(button, shift, x, y) { //@@@: private void m_picReport_MouseUp(MouseButtons button, int shift, float x, float y) {
            // to avoid reentrancy
            if (m_opening) { return; } //@@@: if (m_opening) { return; }

            //----------------------------------------------------
            // MOVING
            //----------------------------------------------------
            let sKeySection = ""; //@@@: String sKeySection = "";

            if (m_moving) { //@@@: if (m_moving) {
                if (m_keyMoving !== "") { //@@@: if (m_keyMoving != "") {
                    switch (m_moveType) { //@@@: switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTALL:
                            if (m_bMoveVertical) { //@@@: if (m_bMoveVertical) {
                                pMoveAll(C_NOMOVE, y); //@@@: pMoveAll(C_NOMOVE, y);
                            }  //@@@: }
                            else if (m_bMoveHorizontal) { //@@@: else if (m_bMoveHorizontal) {
                                pMoveAll(x, C_NOMOVE); //@@@: pMoveAll(x, C_NOMOVE);
                            }  //@@@: }
                            else { //@@@: else {
                                pMoveAll(x, y); //@@@: pMoveAll(x, y);
                            } //@@@: }
                            break; //@@@: break;

                        case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL:
                            pMoveHorizontal(x); //@@@: pMoveHorizontal(x);
                            break; //@@@: break;

                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
                            pMoveVertical(x, y); //@@@: pMoveVertical(x, y);
                            break; //@@@: break;
                    } //@@@: }

                //----------------------------------------------------
                // SIZING
                //----------------------------------------------------
                }  //@@@: }
                else if (m_keySizing !== "") { //@@@: else if (m_keySizing != "") {
                    pSizingControl(x, y); //@@@: pSizingControl(x, y);
                } //@@@: }

                refreshBody(); //@@@: refreshBody();
                m_moving = false; //@@@: m_moving = false;
                refreshRule(); //@@@: refreshRule();
            } //@@@: }

            m_keySizing = ""; //@@@: m_keySizing = "";
            m_keyMoving = ""; //@@@: m_keyMoving = "";
        }; //@@@: }

        const m_picReport_Paint = function() { //@@@: private void m_picReport_Paint() {
			m_paint.paintPicture(m_graphic); //@@@: m_paint.paintPicture(m_graphic);
        }; //@@@: }

        const m_picRule_Paint = function() { //@@@: private void m_picRule_Paint() {
            let i = 0; //@@@: int i = 0;

            let ps = m_paint.getPaintSections(); //@@@: CSReportPaint.cReportPaintObjects ps = m_paint.getPaintSections();
            for (i = 1; i <= ps.count(); i++) { //@@@: for (i = 1; i <= ps.count(); i++) {
				m_paint.drawRule(ps.getNextKeyForZOrder(i), m_graphic); //@@@: m_paint.drawRule(ps.getNextKeyForZOrder(i), m_graphic);
            } //@@@: }
        }; //@@@: }

        self.setParameters = function() { //@@@: public void setParameters() {
            let connect = new CSConnect.cConnect(); //@@@: CSConnect.cConnect connect = new CSConnect.cConnect();
            let param = null; //@@@: cParameter param = null;

			for(var _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) {
				param = m_report.getConnect().getParameters().item(_i); //@@@: param = m_report.getConnect().getParameters().item(_i);
				let connectParam = connect.getParameters().add(); //@@@: CSConnect.cParameter connectParam = connect.getParameters().add();
				connectParam.setName(param.getName()); //@@@: connectParam.setName(param.getName());
					connectParam.setValue(param.getValue()); //@@@: connectParam.setValue(param.getValue());
            } //@@@: }

			if (m_report.getConnect().getDataSource() === "") { //@@@: if (m_report.getConnect().getDataSource() == "") {
                cWindow.msgWarning("Before editting the parameter info you must define a connection"); //@@@: cWindow.msgWarning("Before editting the parameter info you must define a connection");
                return; //@@@: return;
            } //@@@: }

			connect.setStrConnect(m_report.getConnect().getStrConnect()); //@@@: connect.setStrConnect(m_report.getConnect().getStrConnect());
			connect.setDataSource(m_report.getConnect().getDataSource()); //@@@: connect.setDataSource(m_report.getConnect().getDataSource());
			connect.setDataSourceType(m_report.getConnect().getDataSourceType()); //@@@: connect.setDataSourceType(m_report.getConnect().getDataSourceType());

			if (!connect.getDataSourceColumnsInfo(m_report.getConnect().getDataSource(),  //@@@: if (!connect.getDataSourceColumnsInfo(m_report.getConnect().getDataSource(),
				m_report.getConnect().getDataSourceType()))  { //@@@: m_report.getConnect().getDataSourceType()))
            	return; //@@@: return;

			cGlobals.setParametersAux(connect, m_report.getConnect()); //@@@: cGlobals.setParametersAux(connect, m_report.getConnect());
        }; //@@@: }

        self.setSimpleConnection = function() { //@@@: public void setSimpleConnection() {
            let f = new fSimpleConnect(); //@@@: fSimpleConnect f = new fSimpleConnect();
            try { //@@@: try {

                let strConnect = ""; //@@@: String strConnect = "";
				strConnect = m_report.getConnect().getStrConnect(); //@@@: strConnect = m_report.getConnect().getStrConnect();
                f.setServer(cUtil.getToken("Data Source", strConnect)); //@@@: f.setServer(cUtil.getToken("Data Source", strConnect));
                f.setDataBase(cUtil.getToken("Initial Catalog", strConnect)); //@@@: f.setDataBase(cUtil.getToken("Initial Catalog", strConnect));
                f.setUser(cUtil.getToken("User ID", strConnect)); //@@@: f.setUser(cUtil.getToken("User ID", strConnect));
                f.setPassword(cUtil.getToken("Password", strConnect)); //@@@: f.setPassword(cUtil.getToken("Password", strConnect));
                if (f.getUser() === "") { //@@@: if (f.getUser() == "") {
                    f.setConnectTypeToNT(); //@@@: f.setConnectTypeToNT();
                }  //@@@: }
                else { //@@@: else {
                    f.setConnectTypeToSQL(); //@@@: f.setConnectTypeToSQL();
                } //@@@: }
                f.ShowDialog(); //@@@: f.ShowDialog();

                if (!f.getOk()) {  //@@@: if (!f.getOk()) {
                    f.Close(); //@@@: f.Close();
                } //@@@: }
                else { //@@@: else {
					m_report.getConnect().setStrConnect(f.getStrConnect()); //@@@: m_report.getConnect().setStrConnect(f.getStrConnect());
                } //@@@: }

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "configConnection", C_MODULE, ""); //@@@: cError.mngError(ex, "configConnection", C_MODULE, "");
                f.Close(); //@@@: f.Close();
            } //@@@: }
        }; //@@@: }

        self.configConnection = function(rptConnect) { //@@@: public bool configConnection(cReportConnect rptConnect) {
            try { //@@@: try {

                let connect = new CSConnect.cConnect(); //@@@: CSConnect.cConnect connect = new CSConnect.cConnect();

				if (!connect.showOpenConnection()) { //@@@: if (!connect.showOpenConnection())
					return false; //@@@: return false;

                refreshAll(); //@@@: refreshAll();

                if (!connect.getDataSourceColumnsInfo( //@@@: if (!connect.getDataSourceColumnsInfo(
					connect.getDataSource(),  //@@@: connect.getDataSource(),
					connect.getDataSourceType())) { //@@@: connect.getDataSourceType())) {
                    return false; //@@@: return false;
                } //@@@: }

                if (rptConnect === null) { //@@@: if (rptConnect == null) {
					cGlobals.setParametersAux(connect, m_report.getConnect()); //@@@: cGlobals.setParametersAux(connect, m_report.getConnect());
                }  //@@@: }
                else { //@@@: else {
                    cGlobals.setParametersAux(connect, rptConnect); //@@@: cGlobals.setParametersAux(connect, rptConnect);
                } //@@@: }

                if (cGlobals.getToolBox(this) !== null) { showToolBox(); } //@@@: if (cGlobals.getToolBox(this) != null) { showToolBox(); }

                return true; //@@@: return true;

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "configConnection", C_MODULE, ""); //@@@: cError.mngError(ex, "configConnection", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.setAllConnectToMainConnect = function() { //@@@: public void setAllConnectToMainConnect() {
            try { //@@@: try {

                let connect = null; //@@@: cReportConnect connect = null;
				for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
					connect = m_report.getConnectsAux().item(_i); //@@@: connect = m_report.getConnectsAux().item(_i);
                    connect.setStrConnect(m_report.getConnect().getStrConnect()); //@@@: connect.setStrConnect(m_report.getConnect().getStrConnect());
                } //@@@: }

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "setAllConnectToMainConnect", C_MODULE, ""); //@@@: cError.mngError(ex, "setAllConnectToMainConnect", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.deleteObj = function(bDelSectionLine) { //@@@: public void deleteObj(bool bDelSectionLine) {
            let i = 0; //@@@: int i = 0;
            let sec = null; //@@@: cReportSection sec = null;
            let secs = null; //@@@: cReportSections secs = null;
            let secLn = null; //@@@: cReportSectionLine secLn = null;
            let ctrl = null; //@@@: cReportControl ctrl = null;
            let paintObj = null; //@@@: CSReportPaint.cReportPaintObject paintObj = null;

            let isGroupFooter = false; //@@@: bool isGroupFooter = false;
            let isGroupHeader = false; //@@@: bool isGroupHeader = false;
            let isSecLn = false; //@@@: bool isSecLn = false;

            if (m_keyFocus === "") { return; } //@@@: if (m_keyFocus == "") { return; }

            let group = null; //@@@: cReportGroup group = null;
            let secG = null; //@@@: cReportSection secG = null;
            if (m_paint.paintObjIsSection(m_keyFocus)) { //@@@: if (m_paint.paintObjIsSection(m_keyFocus)) {
                if (m_paint.getPaintSections().item(m_keyFocus) === null) { return; } //@@@: if (m_paint.getPaintSections().item(m_keyFocus) == null) { return; }

                let po = m_paint.getPaintSections().item(m_keyFocus); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintSections().item(m_keyFocus);

                // first we check it is not a section line
                //
                sec = pGetSection(isSecLn, secLn, false, isGroupHeader, isGroupFooter); //@@@: sec = pGetSection(out isSecLn, out secLn, false, out isGroupHeader, out isGroupFooter);
                if (!isSecLn) { //@@@: if (!isSecLn) {

                    // check it is not the last section line in this section
                    //
                    if (bDelSectionLine) { //@@@: if (bDelSectionLine) {

                        sec = pGetSection(isSecLn, secLn, true, isGroupHeader, isGroupFooter); //@@@: sec = pGetSection(out isSecLn, out secLn, true, out isGroupHeader, out isGroupFooter);
                    } //@@@: }
					if (!pCanDeleteSection(secs, sec, po.getTag())) { return; } //@@@: if (!pCanDeleteSection(out secs, sec, po.getTag())) { return; }
                } //@@@: }

                let what = ""; //@@@: String what = "";

                if (isSecLn) { //@@@: if (isSecLn) {
                    what = "the section line"; //@@@: what = "the section line";
                }  //@@@: }
                else { //@@@: else {
                    what = "the section"; //@@@: what = "the section";
                } //@@@: }

                if (!cWindow.ask("Are yuo sure you want to delete "  //@@@: if (!cWindow.ask("Are yuo sure you want to delete "
                            + what + " and all the controls it contains? ", VbMsgBoxResult.vbNo)) { //@@@: + what + " and all the controls it contains? ", VbMsgBoxResult.vbNo)) {
                    return; //@@@: return;
                } //@@@: }

                if (isSecLn) { //@@@: if (isSecLn) {

					for(var _i = 0; _i < secLn.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < secLn.getControls().count(); _i++) {
						ctrl = secLn.getControls().item(_i); //@@@: ctrl = secLn.getControls().item(_i);
                        for (i = 1; i <= m_paint.getPaintObjects().count(); i++) { //@@@: for (i = 1; i <= m_paint.getPaintObjects().count(); i++) {
                            paintObj = m_paint.getPaintObjects().item(i); //@@@: paintObj = m_paint.getPaintObjects().item(i);
                            if (paintObj.getTag() === ctrl.getKey()) { //@@@: if (paintObj.getTag() == ctrl.getKey()) {
                                m_paint.getPaintObjects().remove(paintObj.getKey()); //@@@: m_paint.getPaintObjects().remove(paintObj.getKey());
                                break; //@@@: break;
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }

                    secLn.getControls().clear(); //@@@: secLn.getControls().clear();

                    // at least one section line has to be in the section
                    //
                    if (sec.getSectionLines().count() > 1) { //@@@: if (sec.getSectionLines().count() > 1) {
                        sec.getSectionLines().remove(secLn.getKey()); //@@@: sec.getSectionLines().remove(secLn.getKey());
                    } //@@@: }

                }  //@@@: }
                else { //@@@: else {

					for(var _i = 0; _i < sec.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < sec.getSectionLines().count(); _i++) {
						secLn = sec.getSectionLines().item(_i); //@@@: secLn = sec.getSectionLines().item(_i);
						for(var _j = 0; _j < secLn.getControls().count(); _j++) { //@@@: for (int _j = 0; _j < secLn.getControls().count(); _j++) {
                            ctrl = secLn.getControls().item(_j); //@@@: ctrl = secLn.getControls().item(_j);
                            for (i = 1; i <= m_paint.getPaintObjects().count(); i++) { //@@@: for (i = 1; i <= m_paint.getPaintObjects().count(); i++) {
                                paintObj = m_paint.getPaintObjects().item(i); //@@@: paintObj = m_paint.getPaintObjects().item(i);
                                if (paintObj.getTag() === ctrl.getKey()) { //@@@: if (paintObj.getTag() == ctrl.getKey()) {
                                    m_paint.getPaintObjects().remove(paintObj.getKey()); //@@@: m_paint.getPaintObjects().remove(paintObj.getKey());
                                    break; //@@@: break;
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }

                    // if this is a group section we need to delete the header and the footer
                    // 

                    if (isGroupFooter || isGroupHeader) { //@@@: if (isGroupFooter || isGroupHeader) {
                        if (isGroupHeader) { //@@@: if (isGroupHeader) {
							for(var _i = 0; _i < m_report.getGroups().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroups().count(); _i++) {
								group = m_report.getGroups().item(_i); //@@@: group = m_report.getGroups().item(_i);
                                if (group.getHeader().getKey() === sec.getKey()) { break; } //@@@: if (group.getHeader().getKey() == sec.getKey()) { break; }
                            } //@@@: }
                            secG = group.getFooter(); //@@@: secG = group.getFooter();
                        }  //@@@: }
                        else if (isGroupFooter) { //@@@: else if (isGroupFooter) {
							for(var _i = 0; _i < m_report.getGroups().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroups().count(); _i++) {
								group = m_report.getGroups().item(_i); //@@@: group = m_report.getGroups().item(_i);
                                if (group.getFooter().getKey() === sec.getKey()) { break; } //@@@: if (group.getFooter().getKey() == sec.getKey()) { break; }
                            } //@@@: }
                            secG = group.getHeader(); //@@@: secG = group.getHeader();
                        } //@@@: }

						for(var _i = 0; _i < secG.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < secG.getSectionLines().count(); _i++) {
							secLn = secG.getSectionLines().item(_i); //@@@: secLn = secG.getSectionLines().item(_i);
							for(var _j = 0; _j < secLn.getControls().count(); _j++) { //@@@: for (int _j = 0; _j < secLn.getControls().count(); _j++) {
                                ctrl = secLn.getControls().item(_j); //@@@: ctrl = secLn.getControls().item(_j);
                                for (i = 1; i <= m_paint.getPaintObjects().count(); i++) { //@@@: for (i = 1; i <= m_paint.getPaintObjects().count(); i++) {
                                    paintObj = m_paint.getPaintObjects().item(i); //@@@: paintObj = m_paint.getPaintObjects().item(i);
                                    if (paintObj.getTag() === ctrl.getKey()) { //@@@: if (paintObj.getTag() == ctrl.getKey()) {
                                        m_paint.getPaintObjects().remove(paintObj.getKey()); //@@@: m_paint.getPaintObjects().remove(paintObj.getKey());
                                        break; //@@@: break;
                                    } //@@@: }
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }

                        for (i = 1; i <= m_paint.getPaintSections().count(); i++) { //@@@: for (i = 1; i <= m_paint.getPaintSections().count(); i++) {
                            paintObj = m_paint.getPaintSections().item(i); //@@@: paintObj = m_paint.getPaintSections().item(i);
                            if (paintObj.getTag() === secG.getKey()) { //@@@: if (paintObj.getTag() == secG.getKey()) {
                                m_paint.getPaintSections().remove(paintObj.getKey()); //@@@: m_paint.getPaintSections().remove(paintObj.getKey());
                                break; //@@@: break;
                            } //@@@: }
                        } //@@@: }

                        m_report.getGroups().remove(group.getIndex()); //@@@: m_report.getGroups().remove(group.getIndex());

                    }  //@@@: }
                    else { //@@@: else {
                        secs.remove(sec.getKey()); //@@@: secs.remove(sec.getKey());
                    } //@@@: }

                } //@@@: }

                let bDeletePaintObj = false; //@@@: bool bDeletePaintObj = false;

                bDeletePaintObj = true; //@@@: bDeletePaintObj = true;
                if (isSecLn) { //@@@: if (isSecLn) {
                    bDeletePaintObj = sec.getKeyPaint() !== m_keyFocus; //@@@: bDeletePaintObj = sec.getKeyPaint() != m_keyFocus;
                } //@@@: }

                if (bDeletePaintObj) { //@@@: if (bDeletePaintObj) {

                    m_paint.getPaintSections().remove(m_keyFocus); //@@@: m_paint.getPaintSections().remove(m_keyFocus);

                    // if I have deleted the last section line in this 
                    // section I need to delete the paint object
                    // asociated with the current last section line
                    // and then to asociate this section line with
                    // the paint object of the section
                }  //@@@: }
                else { //@@@: else {
					let secLns = sec.getSectionLines(); //@@@: cReportSectionLines secLns = sec.getSectionLines();
					m_paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint()); //@@@: m_paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint());
					secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint()); //@@@: secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint());
                } //@@@: }

                pResetKeysFocus(); //@@@: pResetKeysFocus();
				G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            }  //@@@: }
            else { //@@@: else {
                paintObj = m_paint.getPaintObjects().item(m_keyFocus); //@@@: paintObj = m_paint.getPaintObjects().item(m_keyFocus);
                if (paintObj === null) { return; } //@@@: if (paintObj == null) { return; }

                if (!cWindow.ask("Confirm you want to delete the control? ", VbMsgBoxResult.vbNo)) { return; } //@@@: if (!cWindow.ask("Confirm you want to delete the control? ", VbMsgBoxResult.vbNo)) { return; }

                for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                    paintObj = m_paint.getPaintObjects().item(m_vSelectedKeys[i]); //@@@: paintObj = m_paint.getPaintObjects().item(m_vSelectedKeys[i]);
                    ctrl = m_report.getControls().item(paintObj.getTag()); //@@@: ctrl = m_report.getControls().item(paintObj.getTag());

                    m_paint.getPaintObjects().remove(paintObj.getKey()); //@@@: m_paint.getPaintObjects().remove(paintObj.getKey());
                    if (ctrl === null) { return; } //@@@: if (ctrl == null) { return; }
                    ctrl.getSectionLine().getControls().remove(ctrl.getKey()); //@@@: ctrl.getSectionLine().getControls().remove(ctrl.getKey());
                } //@@@: }

                pResetKeysFocus(); //@@@: pResetKeysFocus();
				G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            } //@@@: }

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        const pCanDeleteSection = function( //@@@: private bool pCanDeleteSection(
            secs,  //@@@: out cReportSections secs,
            sec,  //@@@: cReportSection sec,
            tag) { //@@@: String tag)
            let secAux = null; //@@@: cReportSection secAux = null;

            // header
            //
            secAux = m_report.getHeaders().item(tag); //@@@: secAux = m_report.getHeaders().item(tag);
            secs = null; //@@@: secs = null;

            if (secAux !== null) { //@@@: if (secAux != null) {
                if (secAux.Equals(sec) || sec === null) { //@@@: if (secAux.Equals(sec) || sec == null) {
                    if (secAux.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONHEADER) { //@@@: if (secAux.getTypeSection() == csRptTypeSection.CSRPTTPMAINSECTIONHEADER) {
                        cWindow.msgInfo("The main header can't be deleted"); //@@@: cWindow.msgInfo("The main header can't be deleted");
                        return false; //@@@: return false;
                    } //@@@: }
                    secs = m_report.getHeaders(); //@@@: secs = m_report.getHeaders();
                } //@@@: }
            }  //@@@: }
            // if we don't find the section yet
            //
            if (secs === null) { //@@@: if (secs == null) {

                // footers
                //
                secAux = m_report.getFooters().item(tag); //@@@: secAux = m_report.getFooters().item(tag);
                if (secAux !== null) { //@@@: if (secAux != null) {
                    if (secAux.Equals(sec) || sec === null) { //@@@: if (secAux.Equals(sec) || sec == null) {
                        if (secAux.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER) { //@@@: if (secAux.getTypeSection() == csRptTypeSection.CSRPTTPMAINSECTIONFOOTER) {
                            cWindow.msgInfo("The main footer can't be deleted"); //@@@: cWindow.msgInfo("The main footer can't be deleted");
                            return false; //@@@: return false;
                        } //@@@: }
                        secs = m_report.getFooters(); //@@@: secs = m_report.getFooters();
                    } //@@@: }
                }  //@@@: }
                // if we don't find the section yet
                //
                if (secs === null) { //@@@: if (secs == null) {

                    // check for groups
                    //
                    secAux = m_report.getGroupsHeaders().item(tag); //@@@: secAux = m_report.getGroupsHeaders().item(tag);
                    if (secAux !== null) { //@@@: if (secAux != null) {
                        if (!((secAux.Equals(sec) || sec === null))) { //@@@: if (!((secAux.Equals(sec) || sec == null))) {

                            secAux = m_report.getGroupsFooters().item(tag); //@@@: secAux = m_report.getGroupsFooters().item(tag);
                            if (secAux !== null) { //@@@: if (secAux != null) {
                                if (!((secAux.Equals(sec) || sec === null))) { //@@@: if (!((secAux.Equals(sec) || sec == null))) {

                                    // finally the detail section can't be deleted
                                    //
                                    cWindow.msgInfo("The detail section can't be deleted"); //@@@: cWindow.msgInfo("The detail section can't be deleted");
                                    return false; //@@@: return false;
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        const pResetKeysFocus = function() { //@@@: private void pResetKeysFocus() {
            m_keyFocus = ""; //@@@: m_keyFocus = "";
            m_keyMoving = ""; //@@@: m_keyMoving = "";
            m_keySizing = ""; //@@@: m_keySizing = "";
            m_picReport.Cursor = Cursors.Default; //@@@: m_picReport.Cursor = Cursors.Default;
        }; //@@@: }

        self.addDBField = function() { //@@@: public void addDBField() {
            let sField = ""; //@@@: String sField = "";
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;

			if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { //@@@: if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this))
				return; //@@@: return;

            beginDraging(); //@@@: beginDraging();
            m_controlName = ""; //@@@: m_controlName = "";
            m_controlType = csRptEditCtrlType.CSRPTEDITFIELD; //@@@: m_controlType = csRptEditCtrlType.CSRPTEDITFIELD;
            m_fieldName = sField; //@@@: m_fieldName = sField;
            m_formulaText = ""; //@@@: m_formulaText = "";
            m_fieldIndex = nIndex; //@@@: m_fieldIndex = nIndex;
            m_fieldType = nFieldType; //@@@: m_fieldType = nFieldType;
        }; //@@@: }

        self.addLabel = function() { //@@@: public void addLabel() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITLABEL); //@@@: pAddLabelAux(csRptEditCtrlType.CSRPTEDITLABEL);
        }; //@@@: }

        self.addImage = function() { //@@@: public void addImage() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITIMAGE); //@@@: pAddLabelAux(csRptEditCtrlType.CSRPTEDITIMAGE);
        }; //@@@: }

        self.addChart = function() { //@@@: public void addChart() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITCHART); //@@@: pAddLabelAux(csRptEditCtrlType.CSRPTEDITCHART);
        }; //@@@: }

        self.pAddLabelAux = function(ctlType) { //@@@: public void pAddLabelAux(csRptEditCtrlType ctlType) {
            beginDraging(); //@@@: beginDraging();
            m_controlName = ""; //@@@: m_controlName = "";
            m_controlType = ctlType; //@@@: m_controlType = ctlType;
            m_fieldName = ""; //@@@: m_fieldName = "";
            m_formulaText = ""; //@@@: m_formulaText = "";
            m_fieldIndex = 0; //@@@: m_fieldIndex = 0;
            m_fieldType = 0; //@@@: m_fieldType = 0;
        }; //@@@: }

		const addControlEnd = function(left, top) { //@@@: private bool addControlEnd(float left, float top) {
            let ctrl = null; //@@@: cReportControl ctrl = null;

            m_draging = false; //@@@: m_draging = false;

            if (m_controlType === csRptEditCtrlType.CSRPTEDITNONE) { //@@@: if (m_controlType == csRptEditCtrlType.CSRPTEDITNONE) {
                return true; //@@@: return true;
            } //@@@: }

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;

            let i = 0; //@@@: int i = 0;
			let originalLeft = 0; //@@@: float originalLeft = 0;
			let originalTop = 0; //@@@: float originalTop = 0;
            let copyCtrl = null; //@@@: cReportControl copyCtrl = null;
            let movedCtrl = null; //@@@: cReportControl movedCtrl = null;
			let firstCtrlLeft = 0; //@@@: float firstCtrlLeft = 0;
			let offSet = 0; //@@@: float offSet = 0;

            if (m_copyControls) { //@@@: if (m_copyControls) {

                if (m_vCopyKeys.Length === 0) { return false; } //@@@: if (m_vCopyKeys.Length == 0) { return false; }

                originalLeft = left; //@@@: originalLeft = left;
                originalTop = top; //@@@: originalTop = top;

                let keyPaint = m_vCopyKeys[m_vCopyKeys.Length - 1]; //@@@: String keyPaint = m_vCopyKeys[m_vCopyKeys.Length - 1];
				let keyCtrl = m_paint.getPaintObjects().item(keyPaint).getTag(); //@@@: String keyCtrl = m_paint.getPaintObjects().item(keyPaint).getTag();
				movedCtrl = m_report.getControls().item(keyCtrl); //@@@: movedCtrl = m_report.getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft(); //@@@: firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for (i = m_vCopyKeys.Length; i <= 1; i--) { //@@@: for (i = m_vCopyKeys.Length; i <= 1; i--) {

                    keyPaint = m_vCopyKeys[i]; //@@@: keyPaint = m_vCopyKeys[i];
					keyCtrl = m_paint.getPaintObjects().item(keyPaint).getTag(); //@@@: keyCtrl = m_paint.getPaintObjects().item(keyPaint).getTag();
					copyCtrl = m_report.getControls().item(keyCtrl); //@@@: copyCtrl = m_report.getControls().item(keyCtrl);

                    // starting with the first control we move the left
                    // of every control if reach the right margin 
                    // move down a line and restart
                    //
                    offSet = pGetOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft()); //@@@: offSet = pGetOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft());
                    left = originalLeft + offSet; //@@@: left = originalLeft + offSet;

                    if (m_bCopyWithoutMoving) { //@@@: if (m_bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop(); //@@@: top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft(); //@@@: left = copyCtrl.getLabel().getAspect().getLeft();

                    } //@@@: }

                    if (left - 400 > m_picReport.Width) { //@@@: if (left - 400 > m_picReport.Width) {
                        left = originalLeft + (offSet % originalLeft); //@@@: left = originalLeft + (offSet % originalLeft);
                        top += 100; //@@@: top += 100;
                    } //@@@: }

                    if (top > m_picReport.Height) { //@@@: if (top > m_picReport.Height) {
                        top = m_picReport.Height - 100; //@@@: top = m_picReport.Height - 100;
                    } //@@@: }

                    pAddControlEndAux(left, top, copyCtrl); //@@@: pAddControlEndAux(left, top, copyCtrl);

                } //@@@: }
                m_copyControls = false; //@@@: m_copyControls = false;

            }  //@@@: }
            else if (m_copyControlsFromOtherReport) { //@@@: else if (m_copyControlsFromOtherReport) {

                if (m_fmain.getReportCopySource() === null) { return false; } //@@@: if (m_fmain.getReportCopySource() == null) { return false; }

                originalLeft = left; //@@@: originalLeft = left;
                originalTop = top; //@@@: originalTop = top;

                let editor = m_fmain.getReportCopySource(); //@@@: cEditor editor = m_fmain.getReportCopySource();
                let keyPaint = editor.getVCopyKeys(editor.getVCopyKeysCount()); //@@@: String keyPaint = editor.getVCopyKeys(editor.getVCopyKeysCount());
				let keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag(); //@@@: String keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag();
				movedCtrl = editor.getReport().getControls().item(keyCtrl); //@@@: movedCtrl = editor.getReport().getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft(); //@@@: firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for (i = editor.getVCopyKeysCount(); i <= 1; i--) { //@@@: for (i = editor.getVCopyKeysCount(); i <= 1; i--) {

                    keyPaint = editor.getVCopyKeys(i); //@@@: keyPaint = editor.getVCopyKeys(i);
					keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag(); //@@@: keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag();
					copyCtrl = editor.getReport().getControls().item(keyCtrl); //@@@: copyCtrl = editor.getReport().getControls().item(keyCtrl);

                    // starting with the first control we move the left
                    // of every control if reach the right margin 
                    // move down a line and restart
                    //
                    offSet = pGetOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft()); //@@@: offSet = pGetOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft());
                    left = originalLeft + offSet; //@@@: left = originalLeft + offSet;

                    if (m_bCopyWithoutMoving) { //@@@: if (m_bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop(); //@@@: top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft(); //@@@: left = copyCtrl.getLabel().getAspect().getLeft();

                    } //@@@: }

                    if (left - 400 > m_picReport.Width) { //@@@: if (left - 400 > m_picReport.Width) {
                        left = originalLeft + (offSet % originalLeft); //@@@: left = originalLeft + (offSet % originalLeft);
                        top = top + 100; //@@@: top = top + 100;
                    } //@@@: }

                    if (top > m_picReport.Height) { //@@@: if (top > m_picReport.Height) {
                        top = m_picReport.Height - 100; //@@@: top = m_picReport.Height - 100;
                    } //@@@: }

                    pAddControlEndAux(left, top, copyCtrl); //@@@: pAddControlEndAux(left, top, copyCtrl);
                } //@@@: }

                m_copyControlsFromOtherReport = false; //@@@: m_copyControlsFromOtherReport = false;

            }  //@@@: }
            else { //@@@: else {
                pAddControlEndAux(left, top, null); //@@@: pAddControlEndAux(left, top, null);
            } //@@@: }

            refreshBody(); //@@@: refreshBody();

            return true; //@@@: return true;
        }; //@@@: }

		const pGetOffsetLeftFromControls = function(leftCtrl1, leftCtrl2) { //@@@: private float pGetOffsetLeftFromControls(float leftCtrl1, float leftCtrl2) {
            return leftCtrl2 - leftCtrl1; //@@@: return leftCtrl2 - leftCtrl1;
        }; //@@@: }

		const pGetOffsetTopFromControls = function(topCtrl1, topCtrl2) { //@@@: private float pGetOffsetTopFromControls(float topCtrl1, float topCtrl2) {
            return topCtrl2 - topCtrl1; //@@@: return topCtrl2 - topCtrl1;
        }; //@@@: }

		const pAddControlEndAux = function(left, top, baseControl) { //@@@: private void pAddControlEndAux(float left, float top, cReportControl baseControl) {
            let ctrl = null; //@@@: cReportControl ctrl = null;

            // first we add a control in the main header
            // after the user complete the add operation
            // we would move the control to the desired
            // section line
            //
			ctrl = m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(1).getControls().add(); //@@@: ctrl = m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(1).getControls().add();

            // later we will set the properties related to the type of the control
            //
            m_nextNameCtrl = m_nextNameCtrl + 1; //@@@: m_nextNameCtrl = m_nextNameCtrl + 1;
            ctrl.setName(cGlobals.C_CONTROL_NAME + m_nextNameCtrl); //@@@: ctrl.setName(cGlobals.C_CONTROL_NAME + m_nextNameCtrl);

            if (baseControl === null) { //@@@: if (baseControl == null) {
                pSetNewControlProperties(ctrl); //@@@: pSetNewControlProperties(ctrl);
            }  //@@@: }
            else { //@@@: else {
                pCopyControl(baseControl, ctrl); //@@@: pCopyControl(baseControl, ctrl);
            } //@@@: }

            pSetNewControlPosition(ctrl, left, top); //@@@: pSetNewControlPosition(ctrl, left, top);
        }; //@@@: }

        const pCopyFont = function(fromFont, toFont) { //@@@: private void pCopyFont(cReportFont fromFont, cReportFont toFont) {
            toFont.setBold(fromFont.getBold()); //@@@: toFont.setBold(fromFont.getBold());
            toFont.setForeColor(fromFont.getForeColor()); //@@@: toFont.setForeColor(fromFont.getForeColor());
            toFont.setItalic(fromFont.getItalic()); //@@@: toFont.setItalic(fromFont.getItalic());
            toFont.setName(fromFont.getName()); //@@@: toFont.setName(fromFont.getName());
            toFont.setSize(fromFont.getSize()); //@@@: toFont.setSize(fromFont.getSize());
            toFont.setStrike(fromFont.getStrike()); //@@@: toFont.setStrike(fromFont.getStrike());
			toFont.setUnderline(fromFont.getUnderline()); //@@@: toFont.setUnderline(fromFont.getUnderline());
        }; //@@@: }

        /* TODO: it must be removed //@@@: /* TODO: it must be removed
        private void pCopyFontPaint(cReportFont fromFont, cReportFont toFont) { 
            toFont.setBold(fromFont.getBold());
            toFont.setForeColor(fromFont.getForeColor());
            toFont.setItalic(fromFont.getItalic());
            toFont.setName(fromFont.getName());
            toFont.setSize(fromFont.getSize());
            toFont.setStrike(fromFont.getStrike());
            toFont.setUnderline(fromFont.getUnderLine());
        }
         */

        const pCopyChart = function(fromChart, toChart) { //@@@: private void pCopyChart(cReportChart fromChart, cReportChart toChart) {
            toChart.setChartTitle(fromChart.getChartTitle()); //@@@: toChart.setChartTitle(fromChart.getChartTitle());
            toChart.setChartType(fromChart.getChartType()); //@@@: toChart.setChartType(fromChart.getChartType());
            toChart.setDiameter(fromChart.getDiameter()); //@@@: toChart.setDiameter(fromChart.getDiameter());
            toChart.setFormat(fromChart.getFormat()); //@@@: toChart.setFormat(fromChart.getFormat());
            toChart.setGridLines(fromChart.getGridLines()); //@@@: toChart.setGridLines(fromChart.getGridLines());
            toChart.setOutlineBars(fromChart.getOutlineBars()); //@@@: toChart.setOutlineBars(fromChart.getOutlineBars());
            toChart.setShowValues(fromChart.getShowValues()); //@@@: toChart.setShowValues(fromChart.getShowValues());
            toChart.setThickness(fromChart.getThickness()); //@@@: toChart.setThickness(fromChart.getThickness());
            toChart.setTop(fromChart.getTop()); //@@@: toChart.setTop(fromChart.getTop());
            toChart.setGroupFieldName(fromChart.getGroupFieldName()); //@@@: toChart.setGroupFieldName(fromChart.getGroupFieldName());
            toChart.setGroupFieldIndex(fromChart.getGroupFieldIndex()); //@@@: toChart.setGroupFieldIndex(fromChart.getGroupFieldIndex());
            toChart.setGroupValue(fromChart.getGroupValue()); //@@@: toChart.setGroupValue(fromChart.getGroupValue());
            toChart.setSort(fromChart.getSort()); //@@@: toChart.setSort(fromChart.getSort());

            let fromSerie = null; //@@@: cReportChartSerie fromSerie = null;

			for(var _i = 0; _i < fromChart.getSeries().count(); _i++) { //@@@: for (int _i = 0; _i < fromChart.getSeries().count(); _i++) {
                fromSerie = fromChart.getSeries().item(_i); //@@@: fromSerie = fromChart.getSeries().item(_i);
                let serie = toChart.getSeries().add(); //@@@: cReportChartSerie serie = toChart.getSeries().add();
                serie.setColor(fromSerie.getColor()); //@@@: serie.setColor(fromSerie.getColor());
                serie.setLabelFieldName(fromSerie.getLabelFieldName()); //@@@: serie.setLabelFieldName(fromSerie.getLabelFieldName());
				serie.setColor(fromSerie.getLabelIndex()); //@@@: serie.setColor((csColors)fromSerie.getLabelIndex());
                serie.setValueFieldName(fromSerie.getValueFieldName()); //@@@: serie.setValueFieldName(fromSerie.getValueFieldName());
                serie.setValueIndex(fromSerie.getValueIndex()); //@@@: serie.setValueIndex(fromSerie.getValueIndex());
            } //@@@: }
        }; //@@@: }

        const pCopyAspect = function(fromAspect, toAspect) { //@@@: private void pCopyAspect(cReportAspect fromAspect, cReportAspect toAspect) {
            toAspect.setAlign(fromAspect.getAlign()); //@@@: toAspect.setAlign(fromAspect.getAlign());
            toAspect.setBackColor(fromAspect.getBackColor()); //@@@: toAspect.setBackColor(fromAspect.getBackColor());
            toAspect.setBorderColor(fromAspect.getBorderColor()); //@@@: toAspect.setBorderColor(fromAspect.getBorderColor());
            toAspect.setBorderColor3d(fromAspect.getBorderColor3d()); //@@@: toAspect.setBorderColor3d(fromAspect.getBorderColor3d());
            toAspect.setBorderColor3dShadow(fromAspect.getBorderColor3dShadow()); //@@@: toAspect.setBorderColor3dShadow(fromAspect.getBorderColor3dShadow());
            toAspect.setBorderType(fromAspect.getBorderType()); //@@@: toAspect.setBorderType(fromAspect.getBorderType());
            toAspect.setBorderWidth(fromAspect.getBorderWidth()); //@@@: toAspect.setBorderWidth(fromAspect.getBorderWidth());
            toAspect.setCanGrow(fromAspect.getCanGrow()); //@@@: toAspect.setCanGrow(fromAspect.getCanGrow());
            toAspect.setFormat(fromAspect.getFormat()); //@@@: toAspect.setFormat(fromAspect.getFormat());
            toAspect.setHeight(fromAspect.getHeight()); //@@@: toAspect.setHeight(fromAspect.getHeight());
            toAspect.setIsAccounting(fromAspect.getIsAccounting()); //@@@: toAspect.setIsAccounting(fromAspect.getIsAccounting());
            toAspect.setLeft(fromAspect.getLeft()); //@@@: toAspect.setLeft(fromAspect.getLeft());
            toAspect.setNZOrder(fromAspect.getNZOrder()); //@@@: toAspect.setNZOrder(fromAspect.getNZOrder());
            toAspect.setSelectColor(fromAspect.getSelectColor()); //@@@: toAspect.setSelectColor(fromAspect.getSelectColor());
            toAspect.setSymbol(fromAspect.getSymbol()); //@@@: toAspect.setSymbol(fromAspect.getSymbol());
            toAspect.setTop(fromAspect.getTop()); //@@@: toAspect.setTop(fromAspect.getTop());
            toAspect.setTransparent(fromAspect.getTransparent()); //@@@: toAspect.setTransparent(fromAspect.getTransparent());
            toAspect.setWidth(fromAspect.getWidth()); //@@@: toAspect.setWidth(fromAspect.getWidth());
            toAspect.setWordWrap(fromAspect.getWordWrap()); //@@@: toAspect.setWordWrap(fromAspect.getWordWrap());

            pCopyFont(fromAspect.getFont(), toAspect.getFont()); //@@@: pCopyFont(fromAspect.getFont(), toAspect.getFont());
        }; //@@@: }

		// TODO: this function shouldn't be needed
		//
        const pCopyAspectToPaint = function(fromAspect, toAspect) { //@@@: private void pCopyAspectToPaint(cReportAspect fromAspect, cReportAspect toAspect) {
            toAspect.setAlign(fromAspect.getAlign()); //@@@: toAspect.setAlign(fromAspect.getAlign());
            toAspect.setBackColor(fromAspect.getBackColor()); //@@@: toAspect.setBackColor(fromAspect.getBackColor());
            toAspect.setBorderColor(fromAspect.getBorderColor()); //@@@: toAspect.setBorderColor(fromAspect.getBorderColor());
            toAspect.setBorderColor3d(fromAspect.getBorderColor3d()); //@@@: toAspect.setBorderColor3d(fromAspect.getBorderColor3d());
            toAspect.setBorderColor3dShadow(fromAspect.getBorderColor3dShadow()); //@@@: toAspect.setBorderColor3dShadow(fromAspect.getBorderColor3dShadow());
            toAspect.setBorderType(fromAspect.getBorderType()); //@@@: toAspect.setBorderType(fromAspect.getBorderType());
            toAspect.setBorderWidth(fromAspect.getBorderWidth()); //@@@: toAspect.setBorderWidth(fromAspect.getBorderWidth());
            toAspect.setCanGrow(fromAspect.getCanGrow()); //@@@: toAspect.setCanGrow(fromAspect.getCanGrow());
            toAspect.setFormat(fromAspect.getFormat()); //@@@: toAspect.setFormat(fromAspect.getFormat());
            toAspect.setHeight(fromAspect.getHeight()); //@@@: toAspect.setHeight(fromAspect.getHeight());
            toAspect.setIsAccounting(fromAspect.getIsAccounting()); //@@@: toAspect.setIsAccounting(fromAspect.getIsAccounting());
            toAspect.setLeft(fromAspect.getLeft()); //@@@: toAspect.setLeft(fromAspect.getLeft());
            toAspect.setNZOrder(fromAspect.getNZOrder()); //@@@: toAspect.setNZOrder(fromAspect.getNZOrder());
            toAspect.setSelectColor(fromAspect.getSelectColor()); //@@@: toAspect.setSelectColor(fromAspect.getSelectColor());
            toAspect.setSymbol(fromAspect.getSymbol()); //@@@: toAspect.setSymbol(fromAspect.getSymbol());
            toAspect.setTop(fromAspect.getTop()); //@@@: toAspect.setTop(fromAspect.getTop());
            toAspect.setTransparent(fromAspect.getTransparent()); //@@@: toAspect.setTransparent(fromAspect.getTransparent());
            toAspect.setWidth(fromAspect.getWidth()); //@@@: toAspect.setWidth(fromAspect.getWidth());
            toAspect.setWordWrap(fromAspect.getWordWrap()); //@@@: toAspect.setWordWrap(fromAspect.getWordWrap());

            pCopyFontPaint(fromAspect.getFont(), toAspect.getFont()); //@@@: pCopyFontPaint(fromAspect.getFont(), toAspect.getFont());
        }; //@@@: }

		const pCopyFontPaint = function(fromFont, toFont) { //@@@: private void pCopyFontPaint(cReportFont fromFont, cReportFont toFont)
			toFont.setBold(fromFont.getBold()); //@@@: toFont.setBold(fromFont.getBold());
			toFont.setForeColor(fromFont.getForeColor()); //@@@: toFont.setForeColor(fromFont.getForeColor());
			toFont.setItalic(fromFont.getItalic()); //@@@: toFont.setItalic(fromFont.getItalic());
			toFont.setName(fromFont.getName()); //@@@: toFont.setName(fromFont.getName());
			toFont.setSize(fromFont.getSize()); //@@@: toFont.setSize(fromFont.getSize());
			toFont.setStrike(fromFont.getStrike()); //@@@: toFont.setStrike(fromFont.getStrike());
			toFont.setUnderline(fromFont.getUnderline()); //@@@: toFont.setUnderline(fromFont.getUnderline());
		}; //@@@: }

        const pCopyControl = function(fromCtrl, toCtrl) { //@@@: private void pCopyControl(cReportControl fromCtrl, cReportControl toCtrl) {
            toCtrl.setControlType(fromCtrl.getControlType()); //@@@: toCtrl.setControlType(fromCtrl.getControlType());

            let field = toCtrl.getField(); //@@@: cReportField field = toCtrl.getField();
            field.setFieldType(fromCtrl.getField().getFieldType()); //@@@: field.setFieldType(fromCtrl.getField().getFieldType());
            field.setIndex(fromCtrl.getField().getIndex()); //@@@: field.setIndex(fromCtrl.getField().getIndex());
            field.setName(fromCtrl.getField().getName()); //@@@: field.setName(fromCtrl.getField().getName());

            toCtrl.getFormulaHide().setName(fromCtrl.getFormulaHide().getName()); //@@@: toCtrl.getFormulaHide().setName(fromCtrl.getFormulaHide().getName());
            toCtrl.getFormulaHide().setText(fromCtrl.getFormulaHide().getText()); //@@@: toCtrl.getFormulaHide().setText(fromCtrl.getFormulaHide().getText());
            toCtrl.getFormulaValue().setName(fromCtrl.getFormulaValue().getName()); //@@@: toCtrl.getFormulaValue().setName(fromCtrl.getFormulaValue().getName());
            toCtrl.getFormulaValue().setText(fromCtrl.getFormulaValue().getText()); //@@@: toCtrl.getFormulaValue().setText(fromCtrl.getFormulaValue().getText());

            toCtrl.setHasFormulaHide(fromCtrl.getHasFormulaHide()); //@@@: toCtrl.setHasFormulaHide(fromCtrl.getHasFormulaHide());
            toCtrl.setHasFormulaValue(fromCtrl.getHasFormulaValue()); //@@@: toCtrl.setHasFormulaValue(fromCtrl.getHasFormulaValue());

            pCopyAspect(fromCtrl.getImage().getAspect(), toCtrl.getImage().getAspect()); //@@@: pCopyAspect(fromCtrl.getImage().getAspect(), toCtrl.getImage().getAspect());

            let label = toCtrl.getLabel(); //@@@: cReportLabel label = toCtrl.getLabel();
            pCopyAspect(fromCtrl.getLabel().getAspect(), label.getAspect()); //@@@: pCopyAspect(fromCtrl.getLabel().getAspect(), label.getAspect());
            label.setCanGrow(fromCtrl.getLabel().getCanGrow()); //@@@: label.setCanGrow(fromCtrl.getLabel().getCanGrow());
            label.setText(fromCtrl.getLabel().getText()); //@@@: label.setText(fromCtrl.getLabel().getText());

            pCopyAspect(fromCtrl.getLine().getAspect(), toCtrl.getLine().getAspect()); //@@@: pCopyAspect(fromCtrl.getLine().getAspect(), toCtrl.getLine().getAspect());
            pCopyChart(fromCtrl.getChart(), toCtrl.getChart()); //@@@: pCopyChart(fromCtrl.getChart(), toCtrl.getChart());
        }; //@@@: }

        const pSetNewControlProperties = function(ctrl) { //@@@: private void pSetNewControlProperties(cReportControl ctrl) {
			let aspect = null; //@@@: cReportAspect aspect = null;

            ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left); //@@@: ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left);

            switch (m_controlType) { //@@@: switch (m_controlType) {
                case csRptEditCtrlType.CSRPTEDITFIELD: //@@@: case csRptEditCtrlType.CSRPTEDITFIELD:
                    ctrl.setControlType(csRptControlType.CSRPTCTFIELD); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTFIELD);
                    ctrl.getLabel().setText(m_fieldName); //@@@: ctrl.getLabel().setText(m_fieldName);
                    let field = ctrl.getField(); //@@@: cReportField field = ctrl.getField();
                    field.setIndex(m_fieldIndex); //@@@: field.setIndex(m_fieldIndex);
                    field.setName(m_fieldName); //@@@: field.setName(m_fieldName);
                    field.setFieldType(m_fieldType); //@@@: field.setFieldType(m_fieldType);

                    if (cGlobals.isNumberField(m_fieldType)) { //@@@: if (cGlobals.isNumberField(m_fieldType)) {
                        aspect = ctrl.getLabel().getAspect(); //@@@: aspect = ctrl.getLabel().getAspect();
					    aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right); //@@@: aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                        aspect.setFormat("#0.00;-#0.00"); //@@@: aspect.setFormat("#0.00;-#0.00");
                    } //@@@: }
                    break; //@@@: break;

                case csRptEditCtrlType.CSRPTEDITFORMULA: //@@@: case csRptEditCtrlType.CSRPTEDITFORMULA:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getFormulaValue().setText(m_formulaText + "(" + m_controlName + ")"); //@@@: ctrl.getFormulaValue().setText(m_formulaText + "(" + m_controlName + ")");
                    ctrl.setHasFormulaValue(true); //@@@: ctrl.setHasFormulaValue(true);
                    ctrl.getLabel().getAspect().setFormat("0.00;-0.00"); //@@@: ctrl.getLabel().getAspect().setFormat("0.00;-0.00");
                    ctrl.getLabel().getAspect().getFont().setBold(true); //@@@: ctrl.getLabel().getAspect().getFont().setBold(true);
                    ctrl.getLabel().setText(ctrl.getFormulaValue().getText()); //@@@: ctrl.getLabel().setText(ctrl.getFormulaValue().getText());
                    ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Right); //@@@: ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Right);
                    break; //@@@: break;

                case csRptEditCtrlType.CSRPTEDITLABEL: //@@@: case csRptEditCtrlType.CSRPTEDITLABEL:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getLabel().setText(m_fieldName); //@@@: ctrl.getLabel().setText(m_fieldName);
                    ctrl.getLabel().getAspect().getFont().setBold(true); //@@@: ctrl.getLabel().getAspect().getFont().setBold(true);

                    break; //@@@: break;
                case csRptEditCtrlType.CSRPTEDITIMAGE: //@@@: case csRptEditCtrlType.CSRPTEDITIMAGE:
                    ctrl.setControlType(csRptControlType.CSRPTCTIMAGE); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTIMAGE);
                    ctrl.getLabel().setText(m_fieldName); //@@@: ctrl.getLabel().setText(m_fieldName);

                    break; //@@@: break;
                case csRptEditCtrlType.CSRPTEDITCHART: //@@@: case csRptEditCtrlType.CSRPTEDITCHART:
                    ctrl.setControlType(csRptControlType.CSRPTCTCHART); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTCHART);
                    ctrl.getLabel().setText(m_fieldName); //@@@: ctrl.getLabel().setText(m_fieldName);
                    break; //@@@: break;
            } //@@@: }

            self.int ctrl_height = 285; //@@@: const int ctrl_height = 285;
            self.int ctrl_width = 2000; //@@@: const int ctrl_width = 2000;

			aspect = ctrl.getLabel().getAspect(); //@@@: aspect = ctrl.getLabel().getAspect();
            aspect.setWidth(ctrl_width); //@@@: aspect.setWidth(ctrl_width);
            aspect.setHeight(ctrl_height); //@@@: aspect.setHeight(ctrl_height);
            aspect.setTransparent(true); //@@@: aspect.setTransparent(true);
        }; //@@@: }

		const pSetNewControlPosition = function(ctrl, left, top) { //@@@: private void pSetNewControlPosition(cReportControl ctrl, float left, float top) {
            let aspect = ctrl.getLabel().getAspect(); //@@@: cReportAspect aspect = ctrl.getLabel().getAspect();
            aspect.setLeft(left); //@@@: aspect.setLeft(left);
            aspect.setTop(top); //@@@: aspect.setTop(top);

            let paintObj = null; //@@@: cReportPaintObject paintObj = null;
			let paintType = csRptPaintObjType.CSRPTPAINTOBJBOX; //@@@: csRptPaintObjType paintType = csRptPaintObjType.CSRPTPAINTOBJBOX;

            if (ctrl.getControlType() === csRptControlType.CSRPTCTIMAGE  //@@@: if (ctrl.getControlType() == csRptControlType.CSRPTCTIMAGE
                || ctrl.getControlType() === csRptControlType.CSRPTCTCHART) { //@@@: || ctrl.getControlType() == csRptControlType.CSRPTCTCHART) {
                paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE; //@@@: paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE;
            } //@@@: }

            paintObj = m_paint.getNewObject(paintType); //@@@: paintObj = m_paint.getNewObject(paintType);

            aspect = ctrl.getLabel().getAspect(); //@@@: aspect = ctrl.getLabel().getAspect();

			pCopyAspectToPaint(aspect, paintObj.getAspect()); //@@@: pCopyAspectToPaint(aspect, paintObj.getAspect());

            aspect.setLeft(left); //@@@: aspect.setLeft(left);
            aspect.setTop(top); //@@@: aspect.setTop(top);

            paintObj.setText(ctrl.getLabel().getText()); //@@@: paintObj.setText(ctrl.getLabel().getText());

            paintObj.setRptType(csRptTypeSection.CONTROL); //@@@: paintObj.setRptType(csRptTypeSection.CONTROL);

            paintObj.setTag(ctrl.getKey()); //@@@: paintObj.setTag(ctrl.getKey());
            ctrl.setKeyPaint(paintObj.getKey()); //@@@: ctrl.setKeyPaint(paintObj.getKey());

            // position the control in the desired section line
            //
            moveControl(paintObj.getKey()); //@@@: moveControl(paintObj.getKey());

			m_paint.drawObject(paintObj.getKey(), m_graphic); //@@@: m_paint.drawObject(paintObj.getKey(), m_graphic);
        }; //@@@: }

        self.addGroup = function() { //@@@: public void addGroup() {
			cGlobals.showGroupProperties(null, this); //@@@: cGlobals.showGroupProperties(null, this);
            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        const pGetGroup = function(key) { //@@@: private cReportGroup pGetGroup(String key) {
            let group = null; //@@@: cReportGroup group = null;

			for(var _i = 0; _i < m_report.getGroups().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroups().count(); _i++) {
				group = m_report.getGroups().item(_i); //@@@: group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === key) { break; } //@@@: if (group.getHeader().getKey() == key) { break; }
                if (group.getFooter().getKey() === key) { break; } //@@@: if (group.getFooter().getKey() == key) { break; }
            } //@@@: }

            return group; //@@@: return group;
        }; //@@@: }


        //public void addSectionLine() { }

        self.addSectionLine = function() { //@@@: public void addSectionLine() {
            let sec = null; //@@@: cReportSection sec = null;
            let paintObj = null; //@@@: CSReportPaint.cReportPaintObject paintObj = null;
			let aspect = null; //@@@: cReportAspect aspect = null;
            let isGroup = false; //@@@: bool isGroup = false;

			sec = pGetSection(isGroup); //@@@: sec = pGetSection(out isGroup);

            if (sec === null) { return; } //@@@: if (sec == null) { return; }

            switch (sec.getTypeSection()) { //@@@: switch (sec.getTypeSection()) {

                // in footers we add from top
                // it means that the first section line is the last one
                //
                case csRptTypeSection.CSRPTTPSCFOOTER: //@@@: case csRptTypeSection.CSRPTTPSCFOOTER:
                case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER: //@@@: case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:

                    aspect = sec.getSectionLines().add(null, "", 1).getAspect(); //@@@: aspect = sec.getSectionLines().add(null, "", 1).getAspect();
                    aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    aspect.setWidth(sec.getAspect().getWidth()); //@@@: aspect.setWidth(sec.getAspect().getWidth());

                    // for new sections the top is the top of the previous section
                    // plus cGlobals.C_HEIGHT_NEW_SECTION
                    //
				    aspect.setTop(sec.getSectionLines().item(1).getAspect().getTop() - cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setTop(sec.getSectionLines().item(1).getAspect().getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
                    break; //@@@: break;

                default: //@@@: default:

                    // because the height of the sections is calculated
                    // in pChangeHeightSection which is called by moveSection
                    // which is called by pAddSectionLinesAux, and on this
                    // function, the height of the section line is set with
                    // the result of substract to the height of the section
                    // the sum of every section line except the height of the
                    // last one section line, if we don't modify the height
                    // of the section the new section line will have an height
                    // of zero (actually the minimum height is 1 pixel).
                    //
                    // for this reazon we change the height of the section
                    // but this will fail because the moveSection function
                    // get the height of the section line from the difference
                    // between the height of the section and the new height
                    // which results of moving the section.
                    //
                    // To solve the problem we have this member variable 
                    // which is used to instruct moveSection to add 
                    // to the section height the size of the new section line
                    //
                    m_newSecLineOffSet = cGlobals.C_HEIGHT_NEW_SECTION; //@@@: m_newSecLineOffSet = cGlobals.C_HEIGHT_NEW_SECTION;

                    aspect = sec.getSectionLines().add().getAspect(); //@@@: aspect = sec.getSectionLines().add().getAspect();
                    aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    aspect.setWidth(sec.getAspect().getWidth()); //@@@: aspect.setWidth(sec.getAspect().getWidth());

                    break; //@@@: break;
            } //@@@: }

            aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
            aspect.setHeight(aspect.getHeight() + cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setHeight(aspect.getHeight() + cGlobals.C_HEIGHT_NEW_SECTION);

            pAddSectionLinesAux(sec, paintObj); //@@@: pAddSectionLinesAux(sec, paintObj);

            // we reset this variable to zero
            //
            m_newSecLineOffSet = 0; //@@@: m_newSecLineOffSet = 0;
        }; //@@@: }

        const pAddSectionLinesAux = function( //@@@: private void pAddSectionLinesAux(
            sec,  //@@@: cReportSection sec,
            paintObj) { //@@@: CSReportPaint.cReportPaintObject paintObj)
			let typeSecLn = csRptTypeSection.CONTROL; //@@@: csRptTypeSection typeSecLn = csRptTypeSection.CONTROL;
			let aspect = null; //@@@: cReportAspect aspect = null;
            let maxBottom = 0; //@@@: int maxBottom = 0;
            let minBottom = 0; //@@@: int minBottom = 0;
            let index = 0; //@@@: int index = 0;
			let y = 0; //@@@: float y = 0;

            switch (sec.getTypeSection()) { //@@@: switch (sec.getTypeSection()) {
                case csRptTypeSection.CSRPTTPSCHEADER: //@@@: case csRptTypeSection.CSRPTTPSCHEADER:
                case csRptTypeSection.CSRPTTPMAINSECTIONHEADER: //@@@: case csRptTypeSection.CSRPTTPMAINSECTIONHEADER:

                    pMoveHeader(sec.getKey(), minBottom, maxBottom, false); //@@@: pMoveHeader(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_HEADER; //@@@: typeSecLn = csRptTypeSection.C_KEY_SECLN_HEADER;
                    index = sec.getSectionLines().count() - 1; //@@@: index = sec.getSectionLines().count() - 1;
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPSCDETAIL: //@@@: case csRptTypeSection.CSRPTTPSCDETAIL:
                case csRptTypeSection.CSRPTTPMAINSECTIONDETAIL: //@@@: case csRptTypeSection.CSRPTTPMAINSECTIONDETAIL:

                    pMoveDetails(sec.getKey(), minBottom, maxBottom, false); //@@@: pMoveDetails(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_DETAIL; //@@@: typeSecLn = csRptTypeSection.C_KEY_SECLN_DETAIL;
                    index = sec.getSectionLines().count() - 1; //@@@: index = sec.getSectionLines().count() - 1;
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPGROUPHEADER: //@@@: case csRptTypeSection.CSRPTTPGROUPHEADER:

                    pMoveGroupHeader(sec.getKey(), minBottom, maxBottom, false); //@@@: pMoveGroupHeader(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_GROUPH; //@@@: typeSecLn = csRptTypeSection.C_KEY_SECLN_GROUPH;
                    index = sec.getSectionLines().count() - 1; //@@@: index = sec.getSectionLines().count() - 1;
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPGROUPFOOTER: //@@@: case csRptTypeSection.CSRPTTPGROUPFOOTER:

                    pMoveGroupFooter(sec.getKey(), minBottom, maxBottom, false); //@@@: pMoveGroupFooter(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_GROUPF; //@@@: typeSecLn = csRptTypeSection.C_KEY_SECLN_GROUPF;
                    index = sec.getSectionLines().count() - 1; //@@@: index = sec.getSectionLines().count() - 1;
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPSCFOOTER: //@@@: case csRptTypeSection.CSRPTTPSCFOOTER:
                case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER: //@@@: case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:

                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    aspect.setTop(aspect.getTop() - cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setTop(aspect.getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
                    pMoveFooter(sec.getKey(), minBottom, maxBottom, false); //@@@: pMoveFooter(sec.getKey(), minBottom, maxBottom, false);
                    m_offY = 0; //@@@: m_offY = 0;
                    y = aspect.getHeight() + aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION; //@@@: y = aspect.getHeight() + aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION;
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_FOOTER; //@@@: typeSecLn = csRptTypeSection.C_KEY_SECLN_FOOTER;
                    index = 1; //@@@: index = 1;
                    break; //@@@: break;
            } //@@@: }
			// we add a paint object to all sectionlines except the last one 
            // the last sectionline uses the paint object of the section
            //
			let secL = sec.getSectionLines().item(index); //@@@: cReportSectionLine secL = sec.getSectionLines().item(index);
			secL.setKeyPaint( //@@@: secL.setKeyPaint(
				paintSection(secL.getAspect(),  //@@@: paintSection(secL.getAspect(),
								secL.getKey(),  //@@@: secL.getKey(),
                                sec.getTypeSection(),  //@@@: sec.getTypeSection(),
								C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString(),  //@@@: C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString(),
								true)); //@@@: true));

			// section line
            let po = m_paint.getPaintSections().item(secL.getKeyPaint()); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintSections().item(secL.getKeyPaint());
			po.setRptType(typeSecLn); //@@@: po.setRptType(typeSecLn);
			po.setRptKeySec(sec.getKey()); //@@@: po.setRptKeySec(sec.getKey());

			// section
            po = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: po = m_paint.getPaintSections().item(sec.getKeyPaint());
			po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString()); //@@@: po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString());

            moveSection(paintObj, 0, y, minBottom, maxBottom, sec, false); //@@@: moveSection(paintObj, 0, y, minBottom, maxBottom, sec, false);

            refreshBody(); //@@@: refreshBody();
            refreshRule(); //@@@: refreshRule();
        }; //@@@: }

        self.addSection = function(typeSection) { //@@@: public void addSection(csRptTypeSection typeSection) {

			if (!m_editor.Visible) { //@@@: if (!m_editor.Visible)
				return; //@@@: return;

            let rptSection = null; //@@@: cReportSection rptSection = null;
            let topSec = null; //@@@: cReportSection topSec = null;
			let w_aspect = null; //@@@: cReportAspect w_aspect = null;
			let aspect = null; //@@@: cReportAspect aspect = null;
            let paintObj = null; //@@@: CSReportPaint.cReportPaintObject paintObj = null;

            let maxBottom = 0; //@@@: int maxBottom = 0;
            let minBottom = 0; //@@@: int minBottom = 0;
            let y = 0; //@@@: float y = 0;

            switch (typeSection) { //@@@: switch (typeSection) {
                case csRptTypeSection.CSRPTTPSCHEADER: //@@@: case csRptTypeSection.CSRPTTPSCHEADER:
                    let w_headers = m_report.getHeaders(); //@@@: cReportSections w_headers = m_report.getHeaders();
				    rptSection = w_headers.add(); //@@@: rptSection = w_headers.add();
                    rptSection.setName("H_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("H_" + rptSection.getIndex().ToString());
				    aspect = w_headers.item(w_headers.count() - 2).getAspect(); //@@@: aspect = w_headers.item(w_headers.count() - 2).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(0); //@@@: rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight()); //@@@: rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),  //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),  //@@@: rptSection.getKey(),
                                                        csRptTypeSection.CSRPTTPSCHEADER,  //@@@: csRptTypeSection.CSRPTTPSCHEADER,
                                                        rptSection.getName(),  //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

                    w_aspect = rptSection.getAspect(); //@@@: w_aspect = rptSection.getAspect();
                    moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),  //@@@: moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),
                                0,  //@@@: 0,
                                w_aspect.getTop(),  //@@@: w_aspect.getTop(),
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,  //@@@: w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                w_aspect.getTop() + rptSection.getAspect().getHeight(),  //@@@: w_aspect.getTop() + rptSection.getAspect().getHeight(),
                                rptSection,  //@@@: rptSection,
                                true); //@@@: true);
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPSCDETAIL: //@@@: case csRptTypeSection.CSRPTTPSCDETAIL:
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPGROUPHEADER: //@@@: case csRptTypeSection.CSRPTTPGROUPHEADER:

                    let w_groupsHeaders = m_report.getGroupsHeaders(); //@@@: cIReportGroupSections w_groupsHeaders = m_report.getGroupsHeaders();
				    rptSection = w_groupsHeaders.item(w_groupsHeaders.count()); //@@@: rptSection = w_groupsHeaders.item(w_groupsHeaders.count());
                    rptSection.setName("GH_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("GH_" + rptSection.getIndex().ToString());

                    // the first group is next to the last header
                    //
					if (w_groupsHeaders.count() === 1) { //@@@: if (w_groupsHeaders.count() == 1) {
                        topSec = m_report.getHeaders().item(m_report.getHeaders().count()); //@@@: topSec = m_report.getHeaders().item(m_report.getHeaders().count());
                    }  //@@@: }
                    else { //@@@: else {
						topSec = w_groupsHeaders.item(w_groupsHeaders.count() - 1); //@@@: topSec = w_groupsHeaders.item(w_groupsHeaders.count() - 1);
                    } //@@@: }

				    w_aspect = topSec.getAspect(); //@@@: w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(0); //@@@: rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight()); //@@@: rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),  //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),  //@@@: rptSection.getKey(),
                                                        csRptTypeSection.GROUP_SECTION_HEADER,  //@@@: csRptTypeSection.GROUP_SECTION_HEADER,
                                                        rptSection.getName(),  //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

					w_aspect = rptSection.getAspect(); //@@@: w_aspect = rptSection.getAspect();
                    moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),  //@@@: moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),
                                0,  //@@@: 0,
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,  //@@@: w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                w_aspect.getTop(),  //@@@: w_aspect.getTop(),
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,  //@@@: w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                rptSection,  //@@@: rptSection,
                                true); //@@@: true);
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPGROUPFOOTER: //@@@: case csRptTypeSection.CSRPTTPGROUPFOOTER:

                    let w_groupsFooters = m_report.getGroupsFooters(); //@@@: cIReportGroupSections w_groupsFooters = m_report.getGroupsFooters();
                    rptSection = w_groupsFooters.item(1); //@@@: rptSection = w_groupsFooters.item(1);
                    rptSection.setName("GF_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("GF_" + rptSection.getIndex().ToString());

                    // all group footers are added to the top so at the
                    // beginning they are next to the detail section
                    //

                    topSec = m_report.getDetails().item(m_report.getDetails().count()); //@@@: topSec = m_report.getDetails().item(m_report.getDetails().count());

					w_aspect = topSec.getAspect(); //@@@: w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION); //@@@: rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight()); //@@@: rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),  //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),  //@@@: rptSection.getKey(),
                                                        csRptTypeSection.GROUP_SECTION_FOOTER,  //@@@: csRptTypeSection.GROUP_SECTION_FOOTER,
                                                        rptSection.getName(),  //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint()); //@@@: paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveGroupFooter(rptSection.getKey(), minBottom, maxBottom, false); //@@@: pMoveGroupFooter(rptSection.getKey(), minBottom, maxBottom, false);

                    m_offY = 0; //@@@: m_offY = 0;

					w_aspect = rptSection.getAspect(); //@@@: w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION; //@@@: y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true); //@@@: moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break; //@@@: break;

                case csRptTypeSection.CSRPTTPSCFOOTER: //@@@: case csRptTypeSection.CSRPTTPSCFOOTER:
                    let w_footers = m_report.getFooters(); //@@@: cReportSections w_footers = m_report.getFooters();

                    // all footers are added to the beginning of the collection
                    // 
                    rptSection = w_footers.add(null, "" , 1); //@@@: rptSection = w_footers.add(null, "" , 1);
                    rptSection.setName("F_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("F_" + rptSection.getIndex().ToString());

                    aspect = w_footers.item(2).getAspect(); //@@@: aspect = w_footers.item(2).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION); //@@@: rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(aspect.getTop()); //@@@: rptSection.getAspect().setTop(aspect.getTop());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),  //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),  //@@@: rptSection.getKey(),
                                                        csRptTypeSection.CSRPTTPSCFOOTER,  //@@@: csRptTypeSection.CSRPTTPSCFOOTER,
                                                        rptSection.getName(),  //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint()); //@@@: paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveFooter(rptSection.getKey(), minBottom, maxBottom, false); //@@@: pMoveFooter(rptSection.getKey(), minBottom, maxBottom, false);

                    m_offY = 0; //@@@: m_offY = 0;

                    w_aspect = rptSection.getAspect(); //@@@: w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION; //@@@: y = w_aspect.getHeight() + w_aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true); //@@@: moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break; //@@@: break;
            } //@@@: }

            // every section we add has a section line
            // and we need to set his width
            //
			aspect = rptSection.getSectionLines().item(0).getAspect(); //@@@: aspect = rptSection.getSectionLines().item(0).getAspect();
            aspect.setWidth(rptSection.getAspect().getWidth()); //@@@: aspect.setWidth(rptSection.getAspect().getWidth());

            refreshBody(); //@@@: refreshBody();
            refreshRule(); //@@@: refreshRule();
        }; //@@@: }

        self.bringToFront = function() { //@@@: public void bringToFront() {
			m_paint.getPaintObjects().zorder(m_keyObj, true); //@@@: m_paint.getPaintObjects().zorder(m_keyObj, true);
            refreshBody(); //@@@: refreshBody();
            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;
        }; //@@@: }

        self.sendToBack = function() { //@@@: public void sendToBack() {
            m_paint.getPaintObjects().sendToBack(m_keyObj); //@@@: m_paint.getPaintObjects().sendToBack(m_keyObj);
            refreshBody(); //@@@: refreshBody();
            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;
        }; //@@@: }

        self.preview = function() { //@@@: public void preview() {
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW); //@@@: m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW);
            launchReport(); //@@@: launchReport();
        }; //@@@: }

        self.printReport = function() { //@@@: public void printReport() {
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER); //@@@: m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER);
            launchReport(); //@@@: launchReport();
        }; //@@@: }

        const launchReport = function() { //@@@: private void launchReport() {
            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();
            try { //@@@: try {
                setZOrder(); //@@@: setZOrder();
                showProgressDlg(); //@@@: showProgressDlg();

                m_report.getLaunchInfo().getPrinter().setPaperInfo(m_report.getPaperInfo()); //@@@: m_report.getLaunchInfo().getPrinter().setPaperInfo(m_report.getPaperInfo());
                m_report.getLaunchInfo().setObjPaint(new CSReportPaint.cReportPrint()); //@@@: m_report.getLaunchInfo().setObjPaint(new CSReportPaint.cReportPrint());
				// TODO: remove this
				m_report.getLaunchInfo().setHwnd(0); //@@@: m_report.getLaunchInfo().setHwnd(0);
                m_report.getLaunchInfo().setShowPrintersDialog(true); //@@@: m_report.getLaunchInfo().setShowPrintersDialog(true);
                m_report.launch(); //@@@: m_report.launch();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "launchReport", C_MODULE, ""); //@@@: cError.mngError(ex, "launchReport", C_MODULE, "");
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                mouse.Dispose(); //@@@: mouse.Dispose();
                closeProgressDlg(); //@@@: closeProgressDlg();
            } //@@@: }
        }; //@@@: }

        self.saveDocument = function(saveAs) { //@@@: public bool saveDocument(bool saveAs) {
            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();
            try { //@@@: try {
                let isNew = false; //@@@: bool isNew = false;

                isNew = m_report.getName() === ""; //@@@: isNew = m_report.getName() == "";

                if (isNew) { //@@@: if (isNew) {
					m_report.setName(m_name); //@@@: m_report.setName(m_name);
                } //@@@: }

                if (saveAs) { //@@@: if (saveAs) {
                    isNew = true; //@@@: isNew = true;
                } //@@@: }

                setZOrder(); //@@@: setZOrder();

                pValidateSectionAspect(); //@@@: pValidateSectionAspect();

                if (!m_report.save(m_fmain.saveFileDialog, isNew)) { //@@@: if (!m_report.save(m_fmain.saveFileDialog, isNew))
                reLoadReport(); //@@@: reLoadReport();
                return true; //@@@: return true;

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "saveDocument", C_MODULE, ""); //@@@: cError.mngError(ex, "saveDocument", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                mouse.Dispose(); //@@@: mouse.Dispose();
            } //@@@: }
        }; //@@@: }

        const setZOrder = function() { //@@@: private void setZOrder() {
            let ctrl = null; //@@@: cReportControl ctrl = null;
            for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++) {
                ctrl = m_report.getControls().item(_i); //@@@: ctrl = m_report.getControls().item(_i);
                ctrl.getLabel().getAspect().setNZOrder(m_paint.getPaintObjects().getZOrderForKey(ctrl.getKeyPaint())); //@@@: ctrl.getLabel().getAspect().setNZOrder(m_paint.getPaintObjects().getZOrderForKey(ctrl.getKeyPaint()));
            } //@@@: }
        }; //@@@: }

        self.newReport = function(report) { //@@@: public void newReport(cReport report) {

            if (report !== null) { //@@@: if (report != null) {

                m_report = report; //@@@: m_report = report;
                reLoadReport(); //@@@: reLoadReport();
                pValidateSectionAspect(); //@@@: pValidateSectionAspect();
                reLoadReport(); //@@@: reLoadReport();

            }  //@@@: }
            else { //@@@: else {

				m_paint.createPicture(m_graphic); //@@@: m_paint.createPicture(m_graphic);
                refreshRule(); //@@@: refreshRule();

            } //@@@: }

			Application.DoEvents(); //@@@: Application.DoEvents();

			cGlobals.setDocActive(this); //@@@: cGlobals.setDocActive(this);
        }; //@@@: }

        self.openDocument = function() { //@@@: public bool openDocument()
            return openDocument(""); //@@@: return openDocument("");
        }; //@@@: }

        self.openDocument = function(fileName) { //@@@: public bool openDocument(String fileName) {
            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();
            try { //@@@: try {

                // to avoid reentrancy
                m_opening = true; //@@@: m_opening = true;

                if (fileName === "") { //@@@: if (fileName == "") {

                    pSetInitDir(); //@@@: pSetInitDir();

                    // TODO: the original version of this function
                    //       made a very dirty use of the return of m_report.load
                    //
                    //       the code creates a new document when m_report.load(...)
                    //       return false and m_report.getName !== ""
                    //
                    //       when m_report.load is translated we will
                    //       need to rewrite this function
                    //
                    //       in the original function there was a goto to
                    //       a 'done' label 
                    if (!m_report.load(m_fmain.openFileDialog)) { //@@@: if (!m_report.load(m_fmain.openFileDialog)) {

                        if (m_report.getName() === "")   { //@@@: if (m_report.getName() == "")
                            return false; //@@@: return false;

                        // here the original function has a goto
                        // 'goto done'
                    } //@@@: }

                }  //@@@: }
                else { //@@@: else {

                    if (!m_report.loadSilent(fileName)) { //@@@: if (!m_report.loadSilent(fileName)) {
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }

                reLoadReport(); //@@@: reLoadReport();

                // here the original function has a 'done' label
                // 
                /* //@@@: /*
                 * 
                Done:
                   With m_fmain.cmDialog
                        Dim FileEx As CSKernelFile.cFileEx
                        Set FileEx = New CSKernelFile.cFileEx
                        .InitDir = FileEx.FileGetPath(.FileName)
                   End With

                 * I don't know wath this code is suposed to do
                 * but it is clear that is very dirty so we
                 * will need to rewrite all this lines
                 */ 

                Application.DoEvents(); //@@@: Application.DoEvents();

				cGlobals.setDocActive(this); //@@@: cGlobals.setDocActive(this);

                m_opening = false; //@@@: m_opening = false;

                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex) {
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                mouse.Dispose(); //@@@: mouse.Dispose();
            }             //@@@: }
        }; //@@@: }

        self.saveChanges = function() { //@@@: public bool saveChanges() {
UNKNOWN >>             csAskEditResult rslt; //@@@: csAskEditResult rslt;

            if (m_dataHasChanged) { //@@@: if (m_dataHasChanged) {

                rslt = askEdit("Do you want to save changes to " + m_reportFullPath + "?", "CSReportEditor"); //@@@: rslt = askEdit("Do you want to save changes to " + m_reportFullPath + "?", "CSReportEditor");

                switch (rslt) { //@@@: switch (rslt) {
                    case csAskEditResult.CSASKRSLTYES: //@@@: case csAskEditResult.CSASKRSLTYES:
						if (!saveDocument(false))  { //@@@: if (!saveDocument(false))
                            return false;  //@@@: return false;
                        break; //@@@: break;

                    case csAskEditResult.CSASKRSLTCANCEL: //@@@: case csAskEditResult.CSASKRSLTCANCEL:
                        return false; //@@@: return false;
                } //@@@: }
            } //@@@: }

            m_dataHasChanged = false; //@@@: m_dataHasChanged = false;
            return true; //@@@: return true;
        }; //@@@: }

        const askEdit = function(msg, title) { //@@@: private csAskEditResult askEdit(String msg, String title) {

			let rslt = MessageBox.Show(; //@@@: DialogResult rslt = MessageBox.Show(
                                    	msg, title,  //@@@: msg, title,
                                    	MessageBoxButtons.YesNoCancel,  //@@@: MessageBoxButtons.YesNoCancel,
										MessageBoxIcon.Question, //@@@: MessageBoxIcon.Question,
										MessageBoxDefaultButton.Button3); //@@@: MessageBoxDefaultButton.Button3);
            switch (rslt) { //@@@: switch (rslt) {
                case DialogResult.Yes: //@@@: case DialogResult.Yes:
                    return csAskEditResult.CSASKRSLTYES; //@@@: return csAskEditResult.CSASKRSLTYES;
                case DialogResult.No: //@@@: case DialogResult.No:
                    return csAskEditResult.CSASKRSLTNO; //@@@: return csAskEditResult.CSASKRSLTNO;
                default: //@@@: default:
                    return csAskEditResult.CSASKRSLTCANCEL; //@@@: return csAskEditResult.CSASKRSLTCANCEL;
            } //@@@: }
        }; //@@@: }

        const m_fProperties_ShowHelpDbField = function(cancel) { //@@@: private void m_fProperties_ShowHelpDbField(out bool cancel) {
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;
            let sField = ""; //@@@: String sField = "";

            sField = m_fProperties.txDbField.Text; //@@@: sField = m_fProperties.txDbField.Text;
            nFieldType = m_fProperties.getFieldType(); //@@@: nFieldType = m_fProperties.getFieldType();
            nIndex = m_fProperties.getIndex(); //@@@: nIndex = m_fProperties.getIndex();

            cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this); //@@@: cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; } //@@@: if (cancel) { return; }

            m_fProperties.txDbField.Text = sField; //@@@: m_fProperties.txDbField.Text = sField;
            m_fProperties.setFieldType(nFieldType); //@@@: m_fProperties.setFieldType(nFieldType);
            m_fProperties.setIndex(nIndex); //@@@: m_fProperties.setIndex(nIndex);
            m_fProperties.txText.Text = sField; //@@@: m_fProperties.txText.Text = sField;
        }; //@@@: }

        self.showGroupProperties = function() { //@@@: public void showGroupProperties() {
            let sec = null; //@@@: cReportSection sec = null;
            let group = null; //@@@: cReportGroup group = null;
            let isGroup = false; //@@@: bool isGroup = false;

            sec = pGetSection(isGroup); //@@@: sec = pGetSection(out isGroup);

            if (sec === null) { return; } //@@@: if (sec == null) { return; }

            if (!isGroup) { return; } //@@@: if (!isGroup) { return; }

            for(var _i = 0; _i < m_report.getGroups().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroups().count(); _i++) {
                group = m_report.getGroups().item(_i); //@@@: group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === sec.getKey()) { break; } //@@@: if (group.getHeader().getKey() == sec.getKey()) { break; }
                if (group.getFooter().getKey() === sec.getKey()) { break; } //@@@: if (group.getFooter().getKey() == sec.getKey()) { break; }
            } //@@@: }

            cGlobals.showGroupProperties(group, this); //@@@: cGlobals.showGroupProperties(group, this);

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        self.moveGroup = function() { //@@@: public void moveGroup() {
            let sec = null; //@@@: cReportSection sec = null;
            let group = null; //@@@: cReportGroup group = null;
            let isGroup = false; //@@@: bool isGroup = false;

            sec = pGetSection(isGroup); //@@@: sec = pGetSection(out isGroup);

            if (sec === null) { return; } //@@@: if (sec == null) { return; }

            if (!isGroup) { return; } //@@@: if (!isGroup) { return; }

            for(var _i = 0; _i < m_report.getGroups().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroups().count(); _i++) {
                group = m_report.getGroups().item(_i); //@@@: group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === sec.getKey()) { break; } //@@@: if (group.getHeader().getKey() == sec.getKey()) { break; }
                if (group.getFooter().getKey() === sec.getKey()) { break; } //@@@: if (group.getFooter().getKey() == sec.getKey()) { break; }
            } //@@@: }

            cGlobals.moveGroup(group, this); //@@@: cGlobals.moveGroup(group, this);

            G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            refreshReport(); //@@@: refreshReport();
        }; //@@@: }

        self.showSectionProperties = function() { //@@@: public void showSectionProperties() {
            let sec = null; //@@@: cReportSection sec = null;
            let isGroup = false; //@@@: bool isGroup = false;

            sec = pGetSection(isGroup); //@@@: sec = pGetSection(out isGroup);

            if (sec === null) { return; } //@@@: if (sec == null) { return; }

            pShowSecProperties(sec); //@@@: pShowSecProperties(sec);

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        self.showSecLnProperties = function() { //@@@: public void showSecLnProperties() {
            let sec = null; //@@@: cReportSection sec = null;
            let secLn = null; //@@@: cReportSectionLine secLn = null;
            let isSecLn = false; //@@@: bool isSecLn = false;

            sec = pGetSection(isSecLn, secLn, true); //@@@: sec = pGetSection(out isSecLn, out secLn, true);

            if (sec === null) { return; } //@@@: if (sec == null) { return; }
            if (secLn === null) { return; } //@@@: if (secLn == null) { return; }
            if (!isSecLn) { return; } //@@@: if (!isSecLn) { return; }

            pShowSecProperties(secLn, sec.getName() + ": renglón " + secLn.getIndex().ToString()); //@@@: pShowSecProperties(secLn, sec.getName() + ": renglón " + secLn.getIndex().ToString());

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        const pShowSecProperties = function(sec) { //@@@: private void pShowSecProperties(cIReportSection sec)
            pShowSecProperties(sec, ""); //@@@: pShowSecProperties(sec, "");
        }; //@@@: }

        const pShowSecProperties = function(sec, secLnName) { //@@@: private void pShowSecProperties(cIReportSection sec, String secLnName) {
            try { //@@@: try {

                m_showingProperties = true; //@@@: m_showingProperties = true;

                if (m_fSecProperties === null) {  //@@@: if (m_fSecProperties == null) {
                    m_fSecProperties = new fSecProperties(); //@@@: m_fSecProperties = new fSecProperties();
                    // TODO: set event handler for ShowEditFormula, UnloadForm
                } //@@@: }

                m_fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide(); //@@@: m_fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide();
                m_fSecProperties.setFormulaHide(sec.getFormulaHide().getText()); //@@@: m_fSecProperties.setFormulaHide(sec.getFormulaHide().getText());

                if (sec is cReportSection) {  //@@@: if (sec is cReportSection) {
                    m_fSecProperties.txName.Text = sec.getName(); //@@@: m_fSecProperties.txName.Text = sec.getName();
                } //@@@: }

                if (sec is cReportSectionLine) { //@@@: if (sec is cReportSectionLine) {
                    m_fSecProperties.lbControl.Text = secLnName; //@@@: m_fSecProperties.lbControl.Text = secLnName;
                    m_fSecProperties.lbSecLn.Text = "Line properties:"; //@@@: m_fSecProperties.lbSecLn.Text = "Line properties:";
                }  //@@@: }
                else { //@@@: else {
                    m_fSecProperties.lbControl.Text = sec.getName(); //@@@: m_fSecProperties.lbControl.Text = sec.getName();
                } //@@@: }

                m_fSecProperties.ShowDialog(); //@@@: m_fSecProperties.ShowDialog();

                if (m_fSecProperties.getOk()) { //@@@: if (m_fSecProperties.getOk()) {
                    if (m_fSecProperties.getSetFormulaHideChanged()) { sec.setHasFormulaHide(m_fSecProperties.chkFormulaHide.Checked); } //@@@: if (m_fSecProperties.getSetFormulaHideChanged()) { sec.setHasFormulaHide(m_fSecProperties.chkFormulaHide.Checked); }
                    if (m_fSecProperties.getFormulaHideChanged()) { sec.getFormulaHide().setText(m_fSecProperties.getFormulaHide()); } //@@@: if (m_fSecProperties.getFormulaHideChanged()) { sec.getFormulaHide().setText(m_fSecProperties.getFormulaHide()); }
                    if (sec is cReportSection) { sec.setName(m_fSecProperties.txName.Text); } //@@@: if (sec is cReportSection) { sec.setName(m_fSecProperties.txName.Text); }
                } //@@@: }

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "pShowSecProperties", C_MODULE, ""); //@@@: cError.mngError(ex, "pShowSecProperties", C_MODULE, "");
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                m_fSecProperties.Close(); //@@@: m_fSecProperties.Close();
                m_showingProperties = false; //@@@: m_showingProperties = false;
                m_fSecProperties = null; //@@@: m_fSecProperties = null;
            } //@@@: }
        }; //@@@: }

        // ReturnSecLn is flag to state that the caller wants to get
        // the section line asociated with the separator of the section
        // remember that the last section line don't have a separator 
        // but share it with the section.
        //
        const pGetSection = function( //@@@: private cReportSection pGetSection(
            isGroup) { //@@@: out bool isGroup)
UNKNOWN >>             bool isSecLn; //@@@: bool isSecLn;
UNKNOWN >>             bool isGroupHeader; //@@@: bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter; //@@@: bool isGroupFooter;
UNKNOWN >>             cReportSectionLine secLn; //@@@: cReportSectionLine secLn;
            return pGetSection(isGroup, isSecLn, secLn, false, isGroupHeader, isGroupFooter); //@@@: return pGetSection(out isGroup, out isSecLn, out secLn, false, out isGroupHeader, out isGroupFooter);
        }; //@@@: }

		const pGetSection = function( //@@@: private cReportSection pGetSection(
			isGroup,  //@@@: out bool isGroup,
			isSecLn) { //@@@: out bool isSecLn)
UNKNOWN >>             bool isGroupHeader; //@@@: bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter; //@@@: bool isGroupFooter;
UNKNOWN >>             cReportSectionLine secLn; //@@@: cReportSectionLine secLn;
            return pGetSection(isGroup, isSecLn, secLn, false, isGroupHeader, isGroupFooter); //@@@: return pGetSection(out isGroup, out isSecLn, out secLn, false, out isGroupHeader, out isGroupFooter);
		}; //@@@: }

        const pGetSection = function( //@@@: private cReportSection pGetSection(
            isSecLn,  //@@@: out bool isSecLn,
            secLn,  //@@@: out cReportSectionLine secLn,
            returnSecLn) { //@@@: bool returnSecLn)
UNKNOWN >>             bool isGroupHeader; //@@@: bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter; //@@@: bool isGroupFooter;

            return pGetSection(isSecLn, secLn, returnSecLn, isGroupHeader, isGroupFooter); //@@@: return pGetSection(out isSecLn, out secLn, returnSecLn, out isGroupHeader, out isGroupFooter);
        }; //@@@: }

        const pGetSection = function( //@@@: private cReportSection pGetSection(
            isSecLn,  //@@@: out bool isSecLn,
            secLn,  //@@@: out cReportSectionLine secLn,
            returnSecLn,  //@@@: bool returnSecLn,
            isGroupHeader,  //@@@: out bool isGroupHeader,
            isGroupFooter) { //@@@: out bool isGroupFooter)
UNKNOWN >>             bool isGroup; //@@@: bool isGroup;
            return pGetSection(isGroup, isSecLn, secLn, returnSecLn, isGroupHeader, isGroupFooter); //@@@: return pGetSection(out isGroup, out isSecLn, out secLn, returnSecLn, out isGroupHeader, out isGroupFooter);
        }; //@@@: }

        const pGetSection = function( //@@@: private cReportSection pGetSection(
            isGroup,  //@@@: out bool isGroup,
            isSecLn,  //@@@: out bool isSecLn,
			secLn,  //@@@: out cReportSectionLine secLn,
            returnSecLn,  //@@@: bool returnSecLn,
            isGroupHeader,  //@@@: out bool isGroupHeader,
            isGroupFooter) { //@@@: out bool isGroupFooter)

            let sec = null; //@@@: cReportSection sec = null;

            isGroup = false; //@@@: isGroup = false;
            isSecLn = false; //@@@: isSecLn = false;
            secLn = null; //@@@: secLn = null;
            isGroupFooter = false; //@@@: isGroupFooter = false;
            isGroupHeader = false; //@@@: isGroupHeader = false;

			if (m_keyFocus === "") { return null; } //@@@: if (m_keyFocus == "") { return null; }

            // get the section and show his properties
            //
			if (!m_paint.paintObjIsSection(m_keyFocus)) { return null; } //@@@: if (!m_paint.paintObjIsSection(m_keyFocus)) { return null; }

			let paintObj = m_paint.getPaintSections().item(m_keyFocus); //@@@: CSReportPaint.cReportPaintObject paintObj = m_paint.getPaintSections().item(m_keyFocus);

            // nothing to do
            //
			if (paintObj === null) { return null; } //@@@: if (paintObj == null) { return null; }

            sec = m_report.getHeaders().item(paintObj.getTag()); //@@@: sec = m_report.getHeaders().item(paintObj.getTag());
            if (sec !== null) { //@@@: if (sec != null) {

                // it's a header
            }  //@@@: }
            else { //@@@: else {
                sec = m_report.getFooters().item(paintObj.getTag()); //@@@: sec = m_report.getFooters().item(paintObj.getTag());
                if (sec !== null) { //@@@: if (sec != null) {

                    // it's a footer
                }  //@@@: }
                else { //@@@: else {

                    // check if it is a group
                    //
                    sec = m_report.getGroupsHeaders().item(paintObj.getTag()); //@@@: sec = m_report.getGroupsHeaders().item(paintObj.getTag());
                    if (sec !== null) { //@@@: if (sec != null) {

                        // it's a group
                        //
                        isGroup = true; //@@@: isGroup = true;
                        isGroupHeader = true; //@@@: isGroupHeader = true;

                    }  //@@@: }
                    else { //@@@: else {
                        sec = m_report.getGroupsFooters().item(paintObj.getTag()); //@@@: sec = m_report.getGroupsFooters().item(paintObj.getTag());
                        if (sec !== null) { //@@@: if (sec != null) {

                            // it's a group
                            //
                            isGroup = true; //@@@: isGroup = true;
                            isGroupFooter = true; //@@@: isGroupFooter = true;

                        }  //@@@: }
                        else { //@@@: else {
                            // check if it is a detail
                            //
                            sec = m_report.getDetails().item(paintObj.getTag()); //@@@: sec = m_report.getDetails().item(paintObj.getTag());
                            if (sec !== null) { //@@@: if (sec != null) {

                                // it's a detail

                                // it's a line
                            }  //@@@: }
                            else { //@@@: else {
                                isSecLn = true; //@@@: isSecLn = true;
                                switch (paintObj.getRptType()) { //@@@: switch (paintObj.getRptType()) {
                                    case csRptTypeSection.C_KEY_SECLN_HEADER: //@@@: case csRptTypeSection.C_KEY_SECLN_HEADER:
                                        sec = m_report.getHeaders().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getHeaders().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptTypeSection.C_KEY_SECLN_DETAIL: //@@@: case csRptTypeSection.C_KEY_SECLN_DETAIL:
                                        sec = m_report.getDetails().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getDetails().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptTypeSection.C_KEY_SECLN_FOOTER: //@@@: case csRptTypeSection.C_KEY_SECLN_FOOTER:
                                        sec = m_report.getFooters().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getFooters().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptTypeSection.C_KEY_SECLN_GROUPH: //@@@: case csRptTypeSection.C_KEY_SECLN_GROUPH:
                                        sec = m_report.getGroupsHeaders().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getGroupsHeaders().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptTypeSection.C_KEY_SECLN_GROUPF: //@@@: case csRptTypeSection.C_KEY_SECLN_GROUPF:
                                        sec = m_report.getGroupsFooters().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getGroupsFooters().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                } //@@@: }
								secLn = sec.getSectionLines().item(paintObj.getTag()); //@@@: secLn = sec.getSectionLines().item(paintObj.getTag());
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            // if the caller wants a section line and the separator
            // is owned by a section (isSecLn === false) we return
            // the last section line of the section asociated to the separator
            //
            if (returnSecLn && !isSecLn) { //@@@: if (returnSecLn && !isSecLn) {
				secLn = sec.getSectionLines().item(sec.getSectionLines().count()); //@@@: secLn = sec.getSectionLines().item(sec.getSectionLines().count());
                isSecLn = true; //@@@: isSecLn = true;
            } //@@@: }

            return sec; //@@@: return sec;
        }; //@@@: }

        self.showProperties = function() { //@@@: public void showProperties() {
            if (m_keyFocus === "") { return; } //@@@: if (m_keyFocus == "") { return; }

            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();

            if (m_paint.paintObjIsSection(m_keyFocus)) { //@@@: if (m_paint.paintObjIsSection(m_keyFocus)) {
                showSectionProperties(); //@@@: showSectionProperties();
            }  //@@@: }
            else { //@@@: else {
                m_keyObj = m_keyFocus; //@@@: m_keyObj = m_keyFocus;
                pShowCtrlProperties(); //@@@: pShowCtrlProperties();
            } //@@@: }

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        const pShowCtrlProperties = function() { //@@@: private void pShowCtrlProperties() {
            try { //@@@: try {

                let paintObject = null; //@@@: CSReportPaint.cReportPaintObject paintObject = null;
                let rptCtrl = null; //@@@: cReportControl rptCtrl = null;
				let w_aspect = null; //@@@: cReportAspect w_aspect = null;
				let w_font = null; //@@@: cReportFont w_font = null;
                let image = null; //@@@: cReportImage image = null;
                let bMultiSelect = false; //@@@: bool bMultiSelect = false;
                let sText = ""; //@@@: String sText = "";
                let i = 0; //@@@: int i = 0;

                m_showingProperties = true; //@@@: m_showingProperties = true;

                if (m_fProperties === null) {  //@@@: if (m_fProperties == null) {
                    m_fProperties = new fProperties(); //@@@: m_fProperties = new fProperties();
                    // TODO: set event handler for 
                    // ShowEditFormula, ShowHelpChartField, ShowHelpChartGroupField, ShowHelpDbField
                    // UnloadForm
                } //@@@: }

                paintObject = m_paint.getPaintObject(m_keyObj); //@@@: paintObject = m_paint.getPaintObject(m_keyObj);
                if (paintObject === null) { return; } //@@@: if (paintObject == null) { return; }

                m_fProperties.txText.Text = paintObject.getText(); //@@@: m_fProperties.txText.Text = paintObject.getText();
                rptCtrl = m_report.getControls().item(paintObject.getTag()); //@@@: rptCtrl = m_report.getControls().item(paintObject.getTag());

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTIMAGE) { //@@@: if (rptCtrl.getControlType() != csRptControlType.CSRPTCTIMAGE) {
                    m_fProperties.hideTabImage(); //@@@: m_fProperties.hideTabImage();
                } //@@@: }

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTCHART) { //@@@: if (rptCtrl.getControlType() != csRptControlType.CSRPTCTCHART) {
                    m_fProperties.hideTabChart(); //@@@: m_fProperties.hideTabChart();
                }  //@@@: }
                else { //@@@: else {

                    cUtil.listSetListIndexForId(m_fProperties.cbType, (int)rptCtrl.getChart().getChartType()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbType, (int)rptCtrl.getChart().getChartType());
                    cUtil.listSetListIndexForId(m_fProperties.cbFormatType, (int)rptCtrl.getChart().getFormat()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbFormatType, (int)rptCtrl.getChart().getFormat());
                    cUtil.listSetListIndexForId(m_fProperties.cbChartSize, (int)rptCtrl.getChart().getDiameter()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbChartSize, (int)rptCtrl.getChart().getDiameter());
                    cUtil.listSetListIndexForId(m_fProperties.cbChartThickness, (int)rptCtrl.getChart().getThickness()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbChartThickness, (int)rptCtrl.getChart().getThickness());
                    cUtil.listSetListIndexForId(m_fProperties.cbLinesType, (int)rptCtrl.getChart().getGridLines()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbLinesType, (int)rptCtrl.getChart().getGridLines());

                    m_fProperties.txChartTop.Text = rptCtrl.getChart().getTop().ToString(); //@@@: m_fProperties.txChartTop.Text = rptCtrl.getChart().getTop().ToString();
                    m_fProperties.txDbFieldGroupValue.Text = rptCtrl.getChart().getGroupFieldName(); //@@@: m_fProperties.txDbFieldGroupValue.Text = rptCtrl.getChart().getGroupFieldName();
                    m_fProperties.setChartGroupIndex(rptCtrl.getChart().getGroupFieldIndex()); //@@@: m_fProperties.setChartGroupIndex(rptCtrl.getChart().getGroupFieldIndex());
                    m_fProperties.txChartGroupValue.Text = rptCtrl.getChart().getGroupValue(); //@@@: m_fProperties.txChartGroupValue.Text = rptCtrl.getChart().getGroupValue();
                    m_fProperties.chkShowOutlines.Checked = rptCtrl.getChart().getOutlineBars(); //@@@: m_fProperties.chkShowOutlines.Checked = rptCtrl.getChart().getOutlineBars();
                    m_fProperties.chkShowBarValues.Checked = rptCtrl.getChart().getShowValues(); //@@@: m_fProperties.chkShowBarValues.Checked = rptCtrl.getChart().getShowValues();
                    m_fProperties.chkSort.Checked = rptCtrl.getChart().getSort(); //@@@: m_fProperties.chkSort.Checked = rptCtrl.getChart().getSort();
                    m_fProperties.txText.Text = rptCtrl.getChart().getChartTitle(); //@@@: m_fProperties.txText.Text = rptCtrl.getChart().getChartTitle();

                    if (rptCtrl.getChart().getSeries().count() > 0) { //@@@: if (rptCtrl.getChart().getSeries().count() > 0) {
                        m_fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName(); //@@@: m_fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName();
                        m_fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName(); //@@@: m_fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName();

                        m_fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(1).getLabelIndex()); //@@@: m_fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                        m_fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(1).getValueIndex()); //@@@: m_fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                        cUtil.listSetListIndexForId(m_fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(1).getColor()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(1).getColor());

                        if (rptCtrl.getChart().getSeries().count() > 1) { //@@@: if (rptCtrl.getChart().getSeries().count() > 1) {
                            m_fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(2).getLabelFieldName(); //@@@: m_fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(2).getLabelFieldName();
                            m_fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(2).getValueFieldName(); //@@@: m_fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(2).getValueFieldName();

                            m_fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(2).getLabelIndex()); //@@@: m_fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(2).getLabelIndex());
                            m_fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(2).getValueIndex()); //@@@: m_fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(2).getValueIndex());

                            cUtil.listSetListIndexForId(m_fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(2).getColor()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(2).getColor());
                        } //@@@: }
                    } //@@@: }
                } //@@@: }

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD  //@@@: if (rptCtrl.getControlType() == csRptControlType.CSRPTCTFIELD
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) { //@@@: || rptCtrl.getControlType() == csRptControlType.CSRPTCTDBIMAGE) {
                    m_fProperties.txText.Enabled = false; //@@@: m_fProperties.txText.Enabled = false;
                    let w_field = rptCtrl.getField(); //@@@: cReportField w_field = rptCtrl.getField();
                    m_fProperties.txText.Text = w_field.getName(); //@@@: m_fProperties.txText.Text = w_field.getName();
                    m_fProperties.txDbField.Text = w_field.getName(); //@@@: m_fProperties.txDbField.Text = w_field.getName();
                    m_fProperties.setFieldType(w_field.getFieldType()); //@@@: m_fProperties.setFieldType(w_field.getFieldType());
                    m_fProperties.setIndex(w_field.getIndex()); //@@@: m_fProperties.setIndex(w_field.getIndex());
                }  //@@@: }
                else { //@@@: else {
                    m_fProperties.hideTabField(); //@@@: m_fProperties.hideTabField();
                    m_fProperties.txText.Enabled = true; //@@@: m_fProperties.txText.Enabled = true;
                } //@@@: }

                m_fProperties.txName.Text = rptCtrl.getName(); //@@@: m_fProperties.txName.Text = rptCtrl.getName();
                m_fProperties.lbControl.Text = rptCtrl.getName(); //@@@: m_fProperties.lbControl.Text = rptCtrl.getName();
                m_fProperties.chkFormulaHide.Checked = rptCtrl.getHasFormulaHide(); //@@@: m_fProperties.chkFormulaHide.Checked = rptCtrl.getHasFormulaHide();
                m_fProperties.chkFormulaValue.Checked = rptCtrl.getHasFormulaValue(); //@@@: m_fProperties.chkFormulaValue.Checked = rptCtrl.getHasFormulaValue();

                m_fProperties.txExportColIdx.Text = rptCtrl.getExportColIdx().ToString(); //@@@: m_fProperties.txExportColIdx.Text = rptCtrl.getExportColIdx().ToString();
                m_fProperties.chkIsFreeCtrl.Checked = rptCtrl.getIsFreeCtrl(); //@@@: m_fProperties.chkIsFreeCtrl.Checked = rptCtrl.getIsFreeCtrl();

                m_fProperties.txTag.Text = rptCtrl.getTag(); //@@@: m_fProperties.txTag.Text = rptCtrl.getTag();
                m_fProperties.setFormulaHide(rptCtrl.getFormulaHide().getText()); //@@@: m_fProperties.setFormulaHide(rptCtrl.getFormulaHide().getText());
                m_fProperties.setFormulaValue(rptCtrl.getFormulaValue().getText()); //@@@: m_fProperties.setFormulaValue(rptCtrl.getFormulaValue().getText());
                m_fProperties.txIdxGroup.Text = rptCtrl.getFormulaValue().getIdxGroup().ToString(); //@@@: m_fProperties.txIdxGroup.Text = rptCtrl.getFormulaValue().getIdxGroup().ToString();
                m_fProperties.opBeforePrint.Checked = rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CSRPTEVALPRE; //@@@: m_fProperties.opBeforePrint.Checked = rptCtrl.getFormulaValue().getWhenEval() == csRptWhenEval.CSRPTEVALPRE;
                m_fProperties.opAfterPrint.Checked = rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CSRPTEVALPOST; //@@@: m_fProperties.opAfterPrint.Checked = rptCtrl.getFormulaValue().getWhenEval() == csRptWhenEval.CSRPTEVALPOST;

                w_aspect = rptCtrl.getLabel().getAspect(); //@@@: w_aspect = rptCtrl.getLabel().getAspect();
                m_fProperties.chkCanGrow.Checked = w_aspect.getCanGrow(); //@@@: m_fProperties.chkCanGrow.Checked = w_aspect.getCanGrow();
                m_fProperties.txFormat.Text = w_aspect.getFormat(); //@@@: m_fProperties.txFormat.Text = w_aspect.getFormat();
                m_fProperties.txSymbol.Text = w_aspect.getSymbol(); //@@@: m_fProperties.txSymbol.Text = w_aspect.getSymbol();
                m_fProperties.setIsAccounting(w_aspect.getIsAccounting()); //@@@: m_fProperties.setIsAccounting(w_aspect.getIsAccounting());
                m_fProperties.chkWordWrap.Checked = w_aspect.getWordWrap(); //@@@: m_fProperties.chkWordWrap.Checked = w_aspect.getWordWrap();

                cUtil.listSetListIndexForId(m_fProperties.cbAlign, (int)w_aspect.getAlign()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbAlign, (int)w_aspect.getAlign());

                m_fProperties.txBorderColor.Text = w_aspect.getBorderColor().ToString(); //@@@: m_fProperties.txBorderColor.Text = w_aspect.getBorderColor().ToString();
                m_fProperties.txBorder3D.Text = w_aspect.getBorderColor3d().ToString(); //@@@: m_fProperties.txBorder3D.Text = w_aspect.getBorderColor3d().ToString();
                m_fProperties.txBorderShadow.Text = w_aspect.getBorderColor3dShadow().ToString(); //@@@: m_fProperties.txBorderShadow.Text = w_aspect.getBorderColor3dShadow().ToString();
                m_fProperties.chkBorderRounded.Checked = w_aspect.getBorderRounded(); //@@@: m_fProperties.chkBorderRounded.Checked = w_aspect.getBorderRounded();
                m_fProperties.txBorderWidth.Text = w_aspect.getBorderWidth().ToString(); //@@@: m_fProperties.txBorderWidth.Text = w_aspect.getBorderWidth().ToString();

                cUtil.listSetListIndexForId(m_fProperties.cbBorderType, (int)w_aspect.getBorderType()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbBorderType, (int)w_aspect.getBorderType());

                w_font = w_aspect.getFont(); //@@@: w_font = w_aspect.getFont();
                m_fProperties.txFont.Text = w_font.getName(); //@@@: m_fProperties.txFont.Text = w_font.getName();
                m_fProperties.txForeColor.Text = w_font.getForeColor().ToString(); //@@@: m_fProperties.txForeColor.Text = w_font.getForeColor().ToString();
                m_fProperties.txFontSize.Text = w_font.getSize().ToString(); //@@@: m_fProperties.txFontSize.Text = w_font.getSize().ToString();
                m_fProperties.chkFontBold.Checked = w_font.getBold(); //@@@: m_fProperties.chkFontBold.Checked = w_font.getBold();
                m_fProperties.chkFontItalic.Checked = w_font.getItalic(); //@@@: m_fProperties.chkFontItalic.Checked = w_font.getItalic();
                m_fProperties.chkFontUnderline.Checked = w_font.getUnderline(); //@@@: m_fProperties.chkFontUnderline.Checked = w_font.getUnderline();
                m_fProperties.chkFontStrike.Checked = w_font.getStrike(); //@@@: m_fProperties.chkFontStrike.Checked = w_font.getStrike();

                w_aspect = paintObject.getAspect(); //@@@: w_aspect = paintObject.getAspect();
                m_fProperties.txLeft.Text = w_aspect.getLeft().ToString(); //@@@: m_fProperties.txLeft.Text = w_aspect.getLeft().ToString();
                m_fProperties.txTop.Text = w_aspect.getTop().ToString(); //@@@: m_fProperties.txTop.Text = w_aspect.getTop().ToString();
                m_fProperties.txWidth.Text = w_aspect.getWidth().ToString(); //@@@: m_fProperties.txWidth.Text = w_aspect.getWidth().ToString();
                m_fProperties.txHeight.Text = w_aspect.getHeight().ToString(); //@@@: m_fProperties.txHeight.Text = w_aspect.getHeight().ToString();
                m_fProperties.txBackColor.Text = w_aspect.getBackColor().ToString(); //@@@: m_fProperties.txBackColor.Text = w_aspect.getBackColor().ToString();
                m_fProperties.chkTransparent.Checked = w_aspect.getTransparent(); //@@@: m_fProperties.chkTransparent.Checked = w_aspect.getTransparent();

                bMultiSelect = m_vSelectedKeys.Length > 1; //@@@: bMultiSelect = m_vSelectedKeys.Length > 1;

                m_fProperties.resetChangedFlags(); //@@@: m_fProperties.resetChangedFlags();

                m_fProperties.ShowDialog(); //@@@: m_fProperties.ShowDialog();

                if (!m_fProperties.getOk()) { return; } //@@@: if (!m_fProperties.getOk()) { return; }

                for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                    paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    rptCtrl = m_report.getControls().item(paintObject.getTag()); //@@@: rptCtrl = m_report.getControls().item(paintObject.getTag());

                    if (!bMultiSelect) { //@@@: if (!bMultiSelect) {
                        if (rptCtrl.getName() !== m_fProperties.txName.Text) { //@@@: if (rptCtrl.getName() != m_fProperties.txName.Text) {
                            if (rptCtrl.getName() !== "") { //@@@: if (rptCtrl.getName() != "") {
                                if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", VbMsgBoxResult.vbYes)) { //@@@: if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", VbMsgBoxResult.vbYes)) {
                                    pUpdateFormulas(rptCtrl.getName(), m_fProperties.txName.Text); //@@@: pUpdateFormulas(rptCtrl.getName(), m_fProperties.txName.Text);
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                        rptCtrl.setName(m_fProperties.txName.Text); //@@@: rptCtrl.setName(m_fProperties.txName.Text);
                    } //@@@: }

                    if (m_fProperties.getTextChanged()) { rptCtrl.getLabel().setText(m_fProperties.txText.Text); } //@@@: if (m_fProperties.getTextChanged()) { rptCtrl.getLabel().setText(m_fProperties.txText.Text); }
                    if (m_fProperties.getTagChanged()) { rptCtrl.setTag(m_fProperties.txTag.Text); } //@@@: if (m_fProperties.getTagChanged()) { rptCtrl.setTag(m_fProperties.txTag.Text); }
                    if (m_fProperties.getSetFormulaHideChanged()) { rptCtrl.setHasFormulaHide(m_fProperties.chkFormulaHide.Checked); } //@@@: if (m_fProperties.getSetFormulaHideChanged()) { rptCtrl.setHasFormulaHide(m_fProperties.chkFormulaHide.Checked); }
                    if (m_fProperties.getSetFormulaValueChanged()) { rptCtrl.setHasFormulaValue(m_fProperties.chkFormulaValue.Checked); } //@@@: if (m_fProperties.getSetFormulaValueChanged()) { rptCtrl.setHasFormulaValue(m_fProperties.chkFormulaValue.Checked); }
                    if (m_fProperties.getFormulaHideChanged()) { rptCtrl.getFormulaHide().setText(m_fProperties.getFormulaHide()); } //@@@: if (m_fProperties.getFormulaHideChanged()) { rptCtrl.getFormulaHide().setText(m_fProperties.getFormulaHide()); }
                    if (m_fProperties.getFormulaValueChanged()) { rptCtrl.getFormulaValue().setText(m_fProperties.getFormulaValue()); } //@@@: if (m_fProperties.getFormulaValueChanged()) { rptCtrl.getFormulaValue().setText(m_fProperties.getFormulaValue()); }
                    if (m_fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(cReportGlobals.val(m_fProperties.txIdxGroup.Text)); } //@@@: if (m_fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup((int)cReportGlobals.val(m_fProperties.txIdxGroup.Text)); }
                    if (m_fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(m_fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); } //@@@: if (m_fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(m_fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); }

                    if (m_fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(cReportGlobals.val(m_fProperties.txExportColIdx.Text)); } //@@@: if (m_fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx((int)cReportGlobals.val(m_fProperties.txExportColIdx.Text)); }
                    if (m_fProperties.getIsFreeCtrlChanged()) { rptCtrl.setIsFreeCtrl(m_fProperties.chkIsFreeCtrl.Checked); } //@@@: if (m_fProperties.getIsFreeCtrlChanged()) { rptCtrl.setIsFreeCtrl(m_fProperties.chkIsFreeCtrl.Checked); }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) { //@@@: if (rptCtrl.getControlType() == csRptControlType.CSRPTCTFIELD || rptCtrl.getControlType() == csRptControlType.CSRPTCTDBIMAGE) {

                        let w_field = rptCtrl.getField(); //@@@: cReportField w_field = rptCtrl.getField();
                        if (m_fProperties.getDbFieldChanged()) { //@@@: if (m_fProperties.getDbFieldChanged()) {
                            w_field.setFieldType(m_fProperties.getFieldType()); //@@@: w_field.setFieldType(m_fProperties.getFieldType());
                            w_field.setIndex(m_fProperties.getIndex()); //@@@: w_field.setIndex(m_fProperties.getIndex());
                            w_field.setName(m_fProperties.txDbField.Text); //@@@: w_field.setName(m_fProperties.txDbField.Text);
                        } //@@@: }
                    } //@@@: }

                    if (m_fProperties.getPictureChanged()) { //@@@: if (m_fProperties.getPictureChanged()) {
                        image = rptCtrl.getImage(); //@@@: image = rptCtrl.getImage();
                        let picImage = m_fProperties.picImage; //@@@: PictureBox picImage = m_fProperties.picImage;
                        image.setImage(picImage.Image.Clone()); //@@@: image.setImage((Image)picImage.Image.Clone());
                    } //@@@: }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) { //@@@: if (rptCtrl.getControlType() == csRptControlType.CSRPTCTCHART) {

                        if (rptCtrl.getChart().getSeries().count() < 1) {  //@@@: if (rptCtrl.getChart().getSeries().count() < 1) {
                            rptCtrl.getChart().getSeries().add();  //@@@: rptCtrl.getChart().getSeries().add();
                        } //@@@: }

                        if (m_fProperties.getChartTypeChanged()) { //@@@: if (m_fProperties.getChartTypeChanged()) {
                            rptCtrl.getChart().setChartType(cUtil.listID(m_fProperties.cbType)); //@@@: rptCtrl.getChart().setChartType((csRptChartType)cUtil.listID(m_fProperties.cbType));
                        } //@@@: }
                        if (m_fProperties.getChartFormatTypeChanged()) { //@@@: if (m_fProperties.getChartFormatTypeChanged()) {
                            rptCtrl.getChart().setFormat(cUtil.listID(m_fProperties.cbFormatType)); //@@@: rptCtrl.getChart().setFormat((csRptChartFormat)cUtil.listID(m_fProperties.cbFormatType));
                        } //@@@: }
                        if (m_fProperties.getChartSizeChanged()) { //@@@: if (m_fProperties.getChartSizeChanged()) {
                            rptCtrl.getChart().setDiameter(cUtil.listID(m_fProperties.cbChartSize)); //@@@: rptCtrl.getChart().setDiameter((csRptChartPieDiameter)cUtil.listID(m_fProperties.cbChartSize));
                        } //@@@: }
                        if (m_fProperties.getChartThicknessChanged()) { //@@@: if (m_fProperties.getChartThicknessChanged()) {
                            rptCtrl.getChart().setThickness(cUtil.listID(m_fProperties.cbChartThickness)); //@@@: rptCtrl.getChart().setThickness((csRptChartPieThickness)cUtil.listID(m_fProperties.cbChartThickness));
                        } //@@@: }
                        if (m_fProperties.getChartLinesTypeChanged()) { //@@@: if (m_fProperties.getChartLinesTypeChanged()) {
                            rptCtrl.getChart().setGridLines(cUtil.listID(m_fProperties.cbLinesType)); //@@@: rptCtrl.getChart().setGridLines((csRptChartLineStyle)cUtil.listID(m_fProperties.cbLinesType));
                        } //@@@: }

                        if (m_fProperties.getChartShowLinesChanged()) { //@@@: if (m_fProperties.getChartShowLinesChanged()) {
                            rptCtrl.getChart().setOutlineBars(m_fProperties.chkShowOutlines.Checked); //@@@: rptCtrl.getChart().setOutlineBars(m_fProperties.chkShowOutlines.Checked);
                        } //@@@: }
                        if (m_fProperties.getChartShowValuesChanged()) { //@@@: if (m_fProperties.getChartShowValuesChanged()) {
                            rptCtrl.getChart().setShowValues(m_fProperties.chkShowBarValues.Checked); //@@@: rptCtrl.getChart().setShowValues(m_fProperties.chkShowBarValues.Checked);
                        } //@@@: }

                        if (m_fProperties.getTextChanged()) { //@@@: if (m_fProperties.getTextChanged()) {
                            rptCtrl.getChart().setChartTitle(m_fProperties.txText.Text); //@@@: rptCtrl.getChart().setChartTitle(m_fProperties.txText.Text);
                        } //@@@: }

                        if (m_fProperties.getChartTopChanged()) { //@@@: if (m_fProperties.getChartTopChanged()) {
                            rptCtrl.getChart().setTop(cReportGlobals.val(m_fProperties.txChartTop.Text)); //@@@: rptCtrl.getChart().setTop((int)cReportGlobals.val(m_fProperties.txChartTop.Text));
                        } //@@@: }

                        if (m_fProperties.getChartSortChanged()) { //@@@: if (m_fProperties.getChartSortChanged()) {
                            rptCtrl.getChart().setSort(m_fProperties.chkSort.Checked); //@@@: rptCtrl.getChart().setSort(m_fProperties.chkSort.Checked);
                        } //@@@: }

                        if (m_fProperties.getChartGroupValueChanged()) { //@@@: if (m_fProperties.getChartGroupValueChanged()) {
                            rptCtrl.getChart().setGroupValue(m_fProperties.txChartGroupValue.Text); //@@@: rptCtrl.getChart().setGroupValue(m_fProperties.txChartGroupValue.Text);
                        } //@@@: }

                        if (m_fProperties.getChartFieldGroupChanged()) { //@@@: if (m_fProperties.getChartFieldGroupChanged()) {
                            rptCtrl.getChart().setGroupFieldName(m_fProperties.txDbFieldGroupValue.Text); //@@@: rptCtrl.getChart().setGroupFieldName(m_fProperties.txDbFieldGroupValue.Text);
                            rptCtrl.getChart().setGroupFieldIndex(m_fProperties.getChartGroupIndex()); //@@@: rptCtrl.getChart().setGroupFieldIndex(m_fProperties.getChartGroupIndex());
                        } //@@@: }

                        if (m_fProperties.getChartFieldLbl1Changed()) { //@@@: if (m_fProperties.getChartFieldLbl1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setLabelFieldName(m_fProperties.txDbFieldLbl1.Text); //@@@: rptCtrl.getChart().getSeries().item(1).setLabelFieldName(m_fProperties.txDbFieldLbl1.Text);
                            rptCtrl.getChart().getSeries().item(1).setLabelIndex(m_fProperties.getChartIndex(0)); //@@@: rptCtrl.getChart().getSeries().item(1).setLabelIndex(m_fProperties.getChartIndex(0));
                        } //@@@: }
                        if (m_fProperties.getChartFieldVal1Changed()) { //@@@: if (m_fProperties.getChartFieldVal1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setValueFieldName(m_fProperties.txDbFieldVal1.Text); //@@@: rptCtrl.getChart().getSeries().item(1).setValueFieldName(m_fProperties.txDbFieldVal1.Text);
                            rptCtrl.getChart().getSeries().item(1).setValueIndex(m_fProperties.getChartIndex(1)); //@@@: rptCtrl.getChart().getSeries().item(1).setValueIndex(m_fProperties.getChartIndex(1));
                        } //@@@: }

                        if (m_fProperties.getChartColorSerie1Changed()) { //@@@: if (m_fProperties.getChartColorSerie1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setColor(cUtil.listID(m_fProperties.cbColorSerie1)); //@@@: rptCtrl.getChart().getSeries().item(1).setColor((csColors)cUtil.listID(m_fProperties.cbColorSerie1));
                        } //@@@: }

                        if (m_fProperties.getChartFieldLbl2Changed() || m_fProperties.getChartFieldVal2Changed()) { //@@@: if (m_fProperties.getChartFieldLbl2Changed() || m_fProperties.getChartFieldVal2Changed()) {
                            if (rptCtrl.getChart().getSeries().count() < 2) {  //@@@: if (rptCtrl.getChart().getSeries().count() < 2) {
                                rptCtrl.getChart().getSeries().add();  //@@@: rptCtrl.getChart().getSeries().add();
                            } //@@@: }
                        } //@@@: }

                        if (m_fProperties.txDbFieldLbl2.Text === "" || m_fProperties.txDbFieldVal2.Text === "") { //@@@: if (m_fProperties.txDbFieldLbl2.Text == "" || m_fProperties.txDbFieldVal2.Text == "") {
                            if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(2); } //@@@: if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(2); }
                        } //@@@: }

                        if (rptCtrl.getChart().getSeries().count() > 1) { //@@@: if (rptCtrl.getChart().getSeries().count() > 1) {

                            if (m_fProperties.getChartFieldLbl2Changed()) { //@@@: if (m_fProperties.getChartFieldLbl2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setLabelFieldName(m_fProperties.txDbFieldLbl2.Text); //@@@: rptCtrl.getChart().getSeries().item(2).setLabelFieldName(m_fProperties.txDbFieldLbl2.Text);
                                rptCtrl.getChart().getSeries().item(2).setLabelIndex(m_fProperties.getChartIndex(2)); //@@@: rptCtrl.getChart().getSeries().item(2).setLabelIndex(m_fProperties.getChartIndex(2));
                            } //@@@: }
                            if (m_fProperties.getChartFieldVal2Changed()) { //@@@: if (m_fProperties.getChartFieldVal2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setValueFieldName(m_fProperties.txDbFieldVal2.Text); //@@@: rptCtrl.getChart().getSeries().item(2).setValueFieldName(m_fProperties.txDbFieldVal2.Text);
                                rptCtrl.getChart().getSeries().item(2).setValueIndex(m_fProperties.getChartIndex(3)); //@@@: rptCtrl.getChart().getSeries().item(2).setValueIndex(m_fProperties.getChartIndex(3));
                            } //@@@: }

                            if (m_fProperties.getChartColorSerie2Changed()) { //@@@: if (m_fProperties.getChartColorSerie2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setColor(cUtil.listID(m_fProperties.cbColorSerie2)); //@@@: rptCtrl.getChart().getSeries().item(2).setColor((csColors)cUtil.listID(m_fProperties.cbColorSerie2));
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }

                    if (m_fProperties.getTextChanged()) { paintObject.setText(m_fProperties.txText.Text); } //@@@: if (m_fProperties.getTextChanged()) { paintObject.setText(m_fProperties.txText.Text); }

                    w_aspect = rptCtrl.getLabel().getAspect(); //@@@: w_aspect = rptCtrl.getLabel().getAspect();
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cReportGlobals.val(m_fProperties.txLeft.Text)); } //@@@: if (m_fProperties.getLeftChanged()) { w_aspect.setLeft((float)cReportGlobals.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cReportGlobals.val(m_fProperties.txTop.Text)); } //@@@: if (m_fProperties.getTopChanged()) { w_aspect.setTop((float)cReportGlobals.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cReportGlobals.val(m_fProperties.txWidth.Text)); } //@@@: if (m_fProperties.getWidthChanged()) { w_aspect.setWidth((float)cReportGlobals.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cReportGlobals.val(m_fProperties.txHeight.Text)); } //@@@: if (m_fProperties.getHeightChanged()) { w_aspect.setHeight((float)cReportGlobals.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cReportGlobals.val(m_fProperties.txBackColor.Text)); } //@@@: if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor((int)cReportGlobals.val(m_fProperties.txBackColor.Text)); }
                    if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); } //@@@: if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); }
                    if (m_fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(m_fProperties.cbAlign)); } //@@@: if (m_fProperties.getAlignChanged()) { w_aspect.setAlign((CSReportGlobals.HorizontalAlignment)cUtil.listID(m_fProperties.cbAlign)); }
                    if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); } //@@@: if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); }
                    if (m_fProperties.getSymbolChanged()) { //@@@: if (m_fProperties.getSymbolChanged()) {
                        w_aspect.setSymbol(m_fProperties.txSymbol.Text); //@@@: w_aspect.setSymbol(m_fProperties.txSymbol.Text);
                        w_aspect.setIsAccounting(m_fProperties.getIsAccounting()); //@@@: w_aspect.setIsAccounting(m_fProperties.getIsAccounting());
                    } //@@@: }
                    if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); } //@@@: if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); }
                    if (m_fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(m_fProperties.chkCanGrow.Checked); } //@@@: if (m_fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(m_fProperties.chkCanGrow.Checked); }

                    if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cReportGlobals.val(m_fProperties.txBorderColor.Text)); } //@@@: if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor((int)cReportGlobals.val(m_fProperties.txBorderColor.Text)); }
                    if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cReportGlobals.val(m_fProperties.txBorder3D.Text)); } //@@@: if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d((int)cReportGlobals.val(m_fProperties.txBorder3D.Text)); }
                    if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cReportGlobals.val(m_fProperties.txBorderShadow.Text)); } //@@@: if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow((int)cReportGlobals.val(m_fProperties.txBorderShadow.Text)); }
                    if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); } //@@@: if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                    if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cReportGlobals.val(m_fProperties.txBorderWidth.Text)); } //@@@: if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth((int)cReportGlobals.val(m_fProperties.txBorderWidth.Text)); }
                    if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(m_fProperties.cbBorderType)); } //@@@: if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType((csReportBorderType)cUtil.listID(m_fProperties.cbBorderType)); }

                    w_font = w_aspect.getFont(); //@@@: w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); } //@@@: if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cReportGlobals.val(m_fProperties.txForeColor.Text)); } //@@@: if (m_fProperties.getForeColorChanged()) { w_font.setForeColor((int)cReportGlobals.val(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cReportGlobals.val(m_fProperties.txFontSize.Text)); } //@@@: if (m_fProperties.getFontSizeChanged()) { w_font.setSize((float)cReportGlobals.val(m_fProperties.txFontSize.Text)); }
                    if (m_fProperties.getBoldChanged()) { w_font.setBold(m_fProperties.chkFontBold.Checked); } //@@@: if (m_fProperties.getBoldChanged()) { w_font.setBold(m_fProperties.chkFontBold.Checked); }
                    if (m_fProperties.getItalicChanged()) { w_font.setItalic(m_fProperties.chkFontItalic.Checked); } //@@@: if (m_fProperties.getItalicChanged()) { w_font.setItalic(m_fProperties.chkFontItalic.Checked); }
                    if (m_fProperties.getUnderlineChanged()) { w_font.setUnderline(m_fProperties.chkFontUnderline.Checked); } //@@@: if (m_fProperties.getUnderlineChanged()) { w_font.setUnderline(m_fProperties.chkFontUnderline.Checked); }
                    if (m_fProperties.getStrikeChanged()) { w_font.setStrike(m_fProperties.chkFontStrike.Checked); } //@@@: if (m_fProperties.getStrikeChanged()) { w_font.setStrike(m_fProperties.chkFontStrike.Checked); }

                    if (m_fProperties.getPictureChanged()) { //@@@: if (m_fProperties.getPictureChanged()) {
                        paintObject.setImage(rptCtrl.getImage().getImage()); //@@@: paintObject.setImage(rptCtrl.getImage().getImage());
                    } //@@@: }

                    //
                    // TODO: check if we can refactor this now we have a better class hierarchy
                    //

                    w_aspect = paintObject.getAspect(); //@@@: w_aspect = paintObject.getAspect();
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cReportGlobals.val(m_fProperties.txLeft.Text)); } //@@@: if (m_fProperties.getLeftChanged()) { w_aspect.setLeft((float)cReportGlobals.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cReportGlobals.val(m_fProperties.txTop.Text)); } //@@@: if (m_fProperties.getTopChanged()) { w_aspect.setTop((float)cReportGlobals.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cReportGlobals.val(m_fProperties.txWidth.Text)); } //@@@: if (m_fProperties.getWidthChanged()) { w_aspect.setWidth((float)cReportGlobals.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cReportGlobals.val(m_fProperties.txHeight.Text)); } //@@@: if (m_fProperties.getHeightChanged()) { w_aspect.setHeight((float)cReportGlobals.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cReportGlobals.val(m_fProperties.txBackColor.Text)); } //@@@: if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor((int)cReportGlobals.val(m_fProperties.txBackColor.Text)); }
                    if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); } //@@@: if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); }
                    if (m_fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(m_fProperties.cbAlign)); } //@@@: if (m_fProperties.getAlignChanged()) { w_aspect.setAlign((CSReportGlobals.HorizontalAlignment)cUtil.listID(m_fProperties.cbAlign)); }
                    if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); } //@@@: if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); }
                    if (m_fProperties.getSymbolChanged()) { w_aspect.setSymbol(m_fProperties.txSymbol.Text); } //@@@: if (m_fProperties.getSymbolChanged()) { w_aspect.setSymbol(m_fProperties.txSymbol.Text); }
                    if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); } //@@@: if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); }

                    if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(m_fProperties.cbBorderType)); } //@@@: if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType((csReportBorderType)cUtil.listID(m_fProperties.cbBorderType)); }

                    if (w_aspect.getBorderType() === csReportBorderType.CSRPTBSNONE) { //@@@: if (w_aspect.getBorderType() == csReportBorderType.CSRPTBSNONE) {
                        w_aspect.setBorderColor(Color.Black.ToArgb()); //@@@: w_aspect.setBorderColor(Color.Black.ToArgb());
                        w_aspect.setBorderWidth(1); //@@@: w_aspect.setBorderWidth(1);
                        w_aspect.setBorderRounded(false); //@@@: w_aspect.setBorderRounded(false);
                        w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED); //@@@: w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
                    }  //@@@: }
                    else { //@@@: else {
                        if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cReportGlobals.val(m_fProperties.txBorderColor.Text)); } //@@@: if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor((int)cReportGlobals.val(m_fProperties.txBorderColor.Text)); }
                        if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cReportGlobals.val(m_fProperties.txBorder3D.Text)); } //@@@: if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d((int)cReportGlobals.val(m_fProperties.txBorder3D.Text)); }
                        if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cReportGlobals.val(m_fProperties.txBorderShadow.Text)); } //@@@: if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow((int)cReportGlobals.val(m_fProperties.txBorderShadow.Text)); }
                        if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); } //@@@: if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                        if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cReportGlobals.val(m_fProperties.txBorderWidth.Text)); } //@@@: if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth((int)cReportGlobals.val(m_fProperties.txBorderWidth.Text)); }
                    } //@@@: }

                    w_font = w_aspect.getFont(); //@@@: w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); } //@@@: if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cReportGlobals.val(m_fProperties.txForeColor.Text)); } //@@@: if (m_fProperties.getForeColorChanged()) { w_font.setForeColor((int)cReportGlobals.val(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cReportGlobals.val(m_fProperties.txFontSize.Text)); } //@@@: if (m_fProperties.getFontSizeChanged()) { w_font.setSize((float)cReportGlobals.val(m_fProperties.txFontSize.Text)); }
                    if (m_fProperties.getBoldChanged()) { w_font.setBold(m_fProperties.chkFontBold.Checked); } //@@@: if (m_fProperties.getBoldChanged()) { w_font.setBold(m_fProperties.chkFontBold.Checked); }
                    if (m_fProperties.getItalicChanged()) { w_font.setItalic(m_fProperties.chkFontItalic.Checked); } //@@@: if (m_fProperties.getItalicChanged()) { w_font.setItalic(m_fProperties.chkFontItalic.Checked); }
                    if (m_fProperties.getUnderlineChanged()) { w_font.setUnderline(m_fProperties.chkFontUnderline.Checked); } //@@@: if (m_fProperties.getUnderlineChanged()) { w_font.setUnderline(m_fProperties.chkFontUnderline.Checked); }
                    if (m_fProperties.getStrikeChanged()) { w_font.setStrike(m_fProperties.chkFontStrike.Checked); } //@@@: if (m_fProperties.getStrikeChanged()) { w_font.setStrike(m_fProperties.chkFontStrike.Checked); }
                } //@@@: }

                m_dataHasChanged = true; //@@@: m_dataHasChanged = true;

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "pShowCtrlProperties", C_MODULE, ""); //@@@: cError.mngError(ex, "pShowCtrlProperties", C_MODULE, "");
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                m_fProperties.Hide(); //@@@: m_fProperties.Hide();
                m_showingProperties = false; //@@@: m_showingProperties = false;
                m_fProperties = null; //@@@: m_fProperties = null;
                m_paint.endMove(m_picReport.CreateGraphics()); //@@@: m_paint.endMove(m_picReport.CreateGraphics());
            } //@@@: }
        }; //@@@: }

        const beginDraging = function() { //@@@: private void beginDraging() {
            /* TODO: implement me //@@@: /* TODO: implement me
            m_picReport.SetFocus;
            m_draging = true;
            m_picReport.Cursor = Cursors.Custom;
            m_picReport.MouseIcon = LoadPicture(App.Path + "\\move32x32.cur");
             */ 
        }; //@@@: }

        const endDraging = function() { //@@@: private void endDraging() {
            m_draging = false; //@@@: m_draging = false;
            m_controlType = csRptEditCtrlType.CSRPTEDITNONE; //@@@: m_controlType = csRptEditCtrlType.CSRPTEDITNONE;
            m_picReport.Cursor = Cursors.Default; //@@@: m_picReport.Cursor = Cursors.Default;
        }; //@@@: }

        self.showToolBox = function() { //@@@: public void showToolBox() {

            m_fToolBox = cGlobals.getToolBox(this); //@@@: m_fToolBox = cGlobals.getToolBox(this);

            cGlobals.clearToolBox(this); //@@@: cGlobals.clearToolBox(this);

            pAddColumnsToToolbox(m_report.getConnect().getDataSource(), m_report.getConnect().getColumns()); //@@@: pAddColumnsToToolbox(m_report.getConnect().getDataSource(), m_report.getConnect().getColumns());
            let connect = null; //@@@: cReportConnect connect = null;

            for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
                let Connect = m_report.getConnectsAux().item(_i); //@@@: cReportConnect Connect = m_report.getConnectsAux().item(_i);
                pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns()); //@@@: pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns());
            } //@@@: }

            for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++) {
                let ctrl = m_report.getControls().item(_i); //@@@: cReportControl ctrl = m_report.getControls().item(_i);
                if (cGlobals.isNumberField(ctrl.getField().getFieldType())) { //@@@: if (cGlobals.isNumberField(ctrl.getField().getFieldType())) {
                    m_fToolBox.addLbFormula(ctrl.getField().getName()); //@@@: m_fToolBox.addLbFormula(ctrl.getField().getName());

                    // TODO: refactor this to a better way to suggest the 
                    //       list of formulas applicable to the type of 
                    //       the database field
                    //
                    m_fToolBox.addFormula("Suma", ctrl.getName(), "_Sum"); //@@@: m_fToolBox.addFormula("Suma", ctrl.getName(), "_Sum");
                    m_fToolBox.addFormula("Máximo", ctrl.getName(), "_Max"); //@@@: m_fToolBox.addFormula("Máximo", ctrl.getName(), "_Max");
                    m_fToolBox.addFormula("Minimo", ctrl.getName(), "_Min"); //@@@: m_fToolBox.addFormula("Minimo", ctrl.getName(), "_Min");
                    m_fToolBox.addFormula("Promedio", ctrl.getName(), "_Average"); //@@@: m_fToolBox.addFormula("Promedio", ctrl.getName(), "_Average");
                } //@@@: }
            } //@@@: }
            m_fToolBox.Show(m_fmain); //@@@: m_fToolBox.Show(m_fmain);
        }; //@@@: }

        self.pAddColumnsToToolbox = function(dataSource, columns) { //@@@: public void pAddColumnsToToolbox(String dataSource, cColumnsInfo columns) {
            for(var _i = 0; _i < columns.count(); _i++) { //@@@: for (int _i = 0; _i < columns.count(); _i++) {
                let col = columns.item(_i); //@@@: cColumnInfo col = columns.item(_i);
                m_fToolBox.addField( //@@@: m_fToolBox.addField(
                    cGlobals.getDataSourceStr(dataSource) + col.getName(),  //@@@: cGlobals.getDataSourceStr(dataSource) + col.getName(),
                    col.getTypeColumn(),  //@@@: (int)col.getTypeColumn(),
                    col.getPosition()); //@@@: col.getPosition());
                m_fToolBox.addLabels(col.getName()); //@@@: m_fToolBox.addLabels(col.getName());
            } //@@@: }
        }; //@@@: }

        self.copy = function() { //@@@: public void copy() {
            try { //@@@: try {
                let i = 0; //@@@: int i = 0;

                if (m_vSelectedKeys.Length === 0) { return; } //@@@: if (m_vSelectedKeys.Length == 0) { return; }

                G.redim(m_vCopyKeys, m_vSelectedKeys.Length); //@@@: G.redim(ref m_vCopyKeys, m_vSelectedKeys.Length);

                for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                    m_vCopyKeys[i] = m_vSelectedKeys[i]; //@@@: m_vCopyKeys[i] = m_vSelectedKeys[i];
                } //@@@: }

				m_fmain.setReportCopySource(this); //@@@: m_fmain.setReportCopySource(this);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "Copy", C_MODULE, ""); //@@@: cError.mngError(ex, "Copy", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.paste = function(bDontMove) { //@@@: public void paste(bool bDontMove) {
            try { //@@@: try {

                m_bCopyWithoutMoving = bDontMove; //@@@: m_bCopyWithoutMoving = bDontMove;

                if (m_vCopyKeys.Length === 0) { //@@@: if (m_vCopyKeys.Length == 0) {

					if (m_fmain.getReportCopySource() === null) { return; } //@@@: if (m_fmain.getReportCopySource() == null) { return; }

                    m_copyControlsFromOtherReport = true; //@@@: m_copyControlsFromOtherReport = true;

                }  //@@@: }
                else { //@@@: else {

                    m_copyControls = true; //@@@: m_copyControls = true;

                } //@@@: }

                fFormula.addLabel(); //@@@: fFormula.addLabel();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "Paste", C_MODULE, ""); //@@@: cError.mngError(ex, "Paste", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.editText = function() { //@@@: public void editText() {
            try { //@@@: try {

                self.int c_margen = 20; //@@@: const int c_margen = 20;

                let sText = ""; //@@@: String sText = "";
                let paintObjAspect = null; //@@@: cReportAspect paintObjAspect = null;
                let ctrl = null; //@@@: cReportControl ctrl = null;

                if (m_keyObj === "") { return; } //@@@: if (m_keyObj == "") { return; }

                let w_getPaintObject = m_paint.getPaintObject(m_keyObj); //@@@: cReportPaintObject w_getPaintObject = m_paint.getPaintObject(m_keyObj);
                paintObjAspect = w_getPaintObject.getAspect(); //@@@: paintObjAspect = w_getPaintObject.getAspect();
                sText = w_getPaintObject.getText(); //@@@: sText = w_getPaintObject.getText();
                ctrl = m_report.getControls().item(w_getPaintObject.getTag()); //@@@: ctrl = m_report.getControls().item(w_getPaintObject.getTag());
                if (paintObjAspect === null) { return; } //@@@: if (paintObjAspect == null) { return; }

                /* TODO: implement me //@@@: /* TODO: implement me
                TxEdit.Text = sText;
                TxEdit.Left = paintObjAspect.getLeft() + c_margen;
                TxEdit.Top = paintObjAspect.getTop() + c_margen - paintObjAspect.getOffset();
                TxEdit.Width = paintObjAspect.getWidth() - c_margen * 2;
                TxEdit.Height = paintObjAspect.getHeight() - c_margen * 2;
                TxEdit.Visible = true;
                TxEdit.ZOrder;
                TxEdit.SetFocus;
                TxEdit.FontName = paintObjAspect.getFont().getName();
                TxEdit.FontSize = paintObjAspect.getFont().getSize();
                TxEdit.FontBold = paintObjAspect.getFont().getBold();
                TxEdit.ForeColor = paintObjAspect.getFont().getForeColor();
                TxEdit.BackColor = paintObjAspect.getBackColor();
                */
            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "EditText", C_MODULE, ""); //@@@: cError.mngError(ex, "EditText", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const endEditText = function(descartar) { //@@@: private void endEditText(bool descartar) {
            /* TODO: implement me //@@@: /* TODO: implement me
            if (!TxEdit.Visible) { return; }

            TxEdit.Visible = false;

            if (descartar) { return; }

            m_dataHasChanged = true;

            CSReportPaint.cReportPaintObject paintObjAspect = null;
            paintObjAspect = m_paint.getPaintObject(m_keyObj);
            if (paintObjAspect === null) { return; }

            String sKeyRpt = "";
            sKeyRpt = paintObjAspect.getTag();

            paintObjAspect.setText(TxEdit.Text);

            m_report.getControls().item(sKeyRpt).getLabel().setText(paintObjAspect.getText());
            refreshBody();
             */ 
        }; //@@@: }

        const paintStandarSections = function() { //@@@: private void paintStandarSections() {
            let paintSec = null; //@@@: cReportPaintObject paintSec = null;
            let w_headers = m_report.getHeaders(); //@@@: cReportSections w_headers = m_report.getHeaders();
            let w_item = w_headers.item(cGlobals.C_KEY_HEADER); //@@@: cReportSection w_item = w_headers.item(cGlobals.C_KEY_HEADER);

            w_item.setKeyPaint(paintSection(m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getAspect(),  //@@@: w_item.setKeyPaint(paintSection(m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getAspect(),
                                            cGlobals.C_KEY_HEADER, //@@@: cGlobals.C_KEY_HEADER,
                                            csRptTypeSection.CSRPTTPMAINSECTIONHEADER,  //@@@: csRptTypeSection.CSRPTTPMAINSECTIONHEADER,
                                            "Header 1", false)); //@@@: "Header 1", false));

            paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight()); //@@@: paintSec.setHeightSec(w_item.getAspect().getHeight());

            pAddPaintSetcionForSecLn(w_headers.item(cGlobals.C_KEY_HEADER),  //@@@: pAddPaintSetcionForSecLn(w_headers.item(cGlobals.C_KEY_HEADER),
                                                    csRptTypeSection.C_KEY_SECLN_HEADER); //@@@: csRptTypeSection.C_KEY_SECLN_HEADER);

            let w_details = m_report.getDetails(); //@@@: cReportSections w_details = m_report.getDetails();
            w_item = w_details.item(cGlobals.C_KEY_DETAIL); //@@@: w_item = w_details.item(cGlobals.C_KEY_DETAIL);

            w_item.setKeyPaint(paintSection(m_report.getDetails().item(cGlobals.C_KEY_DETAIL).getAspect(),  //@@@: w_item.setKeyPaint(paintSection(m_report.getDetails().item(cGlobals.C_KEY_DETAIL).getAspect(),
                                            cGlobals.C_KEY_DETAIL, //@@@: cGlobals.C_KEY_DETAIL,
                                            csRptTypeSection.CSRPTTPMAINSECTIONDETAIL,  //@@@: csRptTypeSection.CSRPTTPMAINSECTIONDETAIL,
                                            "Detail", false)); //@@@: "Detail", false));

            paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight()); //@@@: paintSec.setHeightSec(w_item.getAspect().getHeight());

            pAddPaintSetcionForSecLn(w_details.item(cGlobals.C_KEY_DETAIL),  //@@@: pAddPaintSetcionForSecLn(w_details.item(cGlobals.C_KEY_DETAIL),
                                        csRptTypeSection.C_KEY_SECLN_DETAIL); //@@@: csRptTypeSection.C_KEY_SECLN_DETAIL);

            let w_footers = m_report.getFooters(); //@@@: cReportSections w_footers = m_report.getFooters();
            w_item = w_footers.item(cGlobals.C_KEY_FOOTER); //@@@: w_item = w_footers.item(cGlobals.C_KEY_FOOTER);

            w_item.setKeyPaint(paintSection(m_report.getFooters().item(cGlobals.C_KEY_FOOTER).getAspect(),  //@@@: w_item.setKeyPaint(paintSection(m_report.getFooters().item(cGlobals.C_KEY_FOOTER).getAspect(),
                                            cGlobals.C_KEY_FOOTER, //@@@: cGlobals.C_KEY_FOOTER,
                                            csRptTypeSection.CSRPTTPMAINSECTIONFOOTER,  //@@@: csRptTypeSection.CSRPTTPMAINSECTIONFOOTER,
                                            "Footer 1", false)); //@@@: "Footer 1", false));

            paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight()); //@@@: paintSec.setHeightSec(w_item.getAspect().getHeight());
            pAddPaintSetcionForSecLn(w_footers.item(cGlobals.C_KEY_FOOTER), csRptTypeSection.C_KEY_SECLN_FOOTER); //@@@: pAddPaintSetcionForSecLn(w_footers.item(cGlobals.C_KEY_FOOTER), csRptTypeSection.C_KEY_SECLN_FOOTER);
        }; //@@@: }

        const paintSection = function(aspect, ) { //@@@: private String paintSection(cReportAspect aspect,
                                    String sKey,  //@@@: String sKey,
			                        csRptTypeSection rptType,  //@@@: csRptTypeSection rptType,
                                    String text,  //@@@: String text,
                                    bool isSectionLine)  //@@@: bool isSectionLine)
        {  //@@@: {

            let paintObj = null; //@@@: CSReportPaint.cReportPaintObject paintObj = null;
            paintObj = m_paint.getNewSection(CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX); //@@@: paintObj = m_paint.getNewSection(CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX);

            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();

            // we only draw the bottom line of the sections
            //
            w_aspect.setLeft(0); //@@@: w_aspect.setLeft(0);
            w_aspect.setTop(aspect.getTop() + aspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION); //@@@: w_aspect.setTop(aspect.getTop() + aspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
            w_aspect.setWidth(aspect.getWidth()); //@@@: w_aspect.setWidth(aspect.getWidth());
            w_aspect.setHeight(cGlobals.C_HEIGHT_BAR_SECTION); //@@@: w_aspect.setHeight(cGlobals.C_HEIGHT_BAR_SECTION);

            let innerColor = 0; //@@@: int innerColor = 0;
            innerColor = 0xAEAEAE; //@@@: innerColor = 0xAEAEAE;

            if (isSectionLine) { //@@@: if (isSectionLine) {
                w_aspect.setBackColor(innerColor); //@@@: w_aspect.setBackColor(innerColor);
                w_aspect.setBorderColor(Color.Red.ToArgb()); //@@@: w_aspect.setBorderColor(Color.Red.ToArgb());
            }  //@@@: }
            else { //@@@: else {
                if (rptType === csRptTypeSection.GROUP_SECTION_FOOTER  //@@@: if (rptType == csRptTypeSection.GROUP_SECTION_FOOTER
                    || rptType === csRptTypeSection.GROUP_SECTION_HEADER) { //@@@: || rptType == csRptTypeSection.GROUP_SECTION_HEADER) {
                    w_aspect.setBackColor(innerColor); //@@@: w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0xC0C000); //@@@: w_aspect.setBorderColor(0xC0C000);
                }  //@@@: }
                else { //@@@: else {
                    w_aspect.setBackColor(innerColor); //@@@: w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0x5A7FB); //@@@: w_aspect.setBorderColor(0x5A7FB);
                } //@@@: }
            } //@@@: }

            if (rptType === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER  //@@@: if (rptType == csRptTypeSection.CSRPTTPMAINSECTIONFOOTER
                || rptType === csRptTypeSection.CSRPTTPSCFOOTER) { //@@@: || rptType == csRptTypeSection.CSRPTTPSCFOOTER) {
                w_aspect.setOffset(m_offSet); //@@@: w_aspect.setOffset(m_offSet);
            } //@@@: }

            paintObj.setIsSection(!isSectionLine); //@@@: paintObj.setIsSection(!isSectionLine);

            paintObj.setRptType(rptType); //@@@: paintObj.setRptType(rptType);
            paintObj.setTag(sKey); //@@@: paintObj.setTag(sKey);

            paintObj.setText(text); //@@@: paintObj.setText(text);

            return paintObj.getKey(); //@@@: return paintObj.getKey();
        }; //@@@: }

        const getLineRegionForControl = function(sKeyPaintObj, ) { //@@@: private bool getLineRegionForControl(String sKeyPaintObj,
                                                cReportSectionLine rptSecLine,  //@@@: out cReportSectionLine rptSecLine,
                                                bool isFreeCtrl)  //@@@: bool isFreeCtrl)
        {  //@@@: {
            let rptSection = null; //@@@: cReportSection rptSection = null;

            rptSecLine = null; //@@@: rptSecLine = null;

            if (!getRegionForControl(sKeyPaintObj, rptSection, isFreeCtrl)) { return false; } //@@@: if (!getRegionForControl(sKeyPaintObj, out rptSection, isFreeCtrl)) { return false; }

            let w1 = 0; //@@@: float w1 = 0;
            let w2 = 0; //@@@: float w2 = 0;

            let y = 0; //@@@: float y = 0;

            let rtnSecLine = null; //@@@: cReportSectionLine rtnSecLine = null;

            let w_aspect = m_paint.getPaintObject(sKeyPaintObj).getAspect(); //@@@: cReportAspect w_aspect = m_paint.getPaintObject(sKeyPaintObj).getAspect();
            if (isFreeCtrl) { //@@@: if (isFreeCtrl) {
                y = w_aspect.getTop() + w_aspect.getOffset(); //@@@: y = w_aspect.getTop() + w_aspect.getOffset();
            }  //@@@: }
            else { //@@@: else {
                y = w_aspect.getTop() + w_aspect.getHeight() / 2 + w_aspect.getOffset(); //@@@: y = w_aspect.getTop() + w_aspect.getHeight() / 2 + w_aspect.getOffset();
            } //@@@: }

            for(var _i = 0; _i < rptSection.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < rptSection.getSectionLines().count(); _i++) {
                let rptSL = rptSection.getSectionLines().item(_i); //@@@: cReportSectionLine rptSL = rptSection.getSectionLines().item(_i);
                w_aspect = rptSL.getAspect(); //@@@: w_aspect = rptSL.getAspect();
                w1 = w_aspect.getTop(); //@@@: w1 = w_aspect.getTop();
                w2 = w_aspect.getTop() + w_aspect.getHeight(); //@@@: w2 = w_aspect.getTop() + w_aspect.getHeight();
                if (isFreeCtrl) { //@@@: if (isFreeCtrl) {
                    if (w1 <= y) { //@@@: if (w1 <= y) {
                        rtnSecLine = rptSL; //@@@: rtnSecLine = rptSL;
                    } //@@@: }
                }  //@@@: }
                else { //@@@: else {
                    if (w1 <= y && w2 >= y) { return false; } //@@@: if (w1 <= y && w2 >= y) { return false; }
                } //@@@: }
            } //@@@: }

            if (rtnSecLine !== null) { //@@@: if (rtnSecLine != null) {
                rptSecLine = rtnSecLine; //@@@: rptSecLine = rtnSecLine;
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else {
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const getRegionForControl = function(sKeyPaintObj, rptSection, isFreeCtrl) { //@@@: private bool getRegionForControl(String sKeyPaintObj, out cReportSection rptSection, bool isFreeCtrl)
            let x = 0; //@@@: float x = 0;
            let y = 0; //@@@: float y = 0;

            let w_aspect = m_paint.getPaintObject(sKeyPaintObj).getAspect(); //@@@: cReportAspect w_aspect = m_paint.getPaintObject(sKeyPaintObj).getAspect();

            // Headers
            //
            x = w_aspect.getLeft(); //@@@: x = w_aspect.getLeft();
            if (isFreeCtrl) { //@@@: if (isFreeCtrl) {
                y = w_aspect.getTop(); //@@@: y = w_aspect.getTop();
            }  //@@@: }
            else { //@@@: else {
                y = w_aspect.getTop() + w_aspect.getHeight() / 2; //@@@: y = w_aspect.getTop() + w_aspect.getHeight() / 2;
            } //@@@: }

            if (getRegionForControlAux(m_report.getHeaders(), x, y, rptSection, isFreeCtrl)) { //@@@: if (getRegionForControlAux(m_report.getHeaders(), x, y, out rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0); //@@@: w_aspect.setOffset(0);
                return true; //@@@: return true;
            } //@@@: }

            // Groups Headers
            //
            if (getRegionForControlAux(m_report.getGroupsHeaders(), x, y, rptSection, isFreeCtrl)) { //@@@: if (getRegionForControlAux(m_report.getGroupsHeaders(), x, y, out rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0); //@@@: w_aspect.setOffset(0);
                return true; //@@@: return true;
            } //@@@: }

            // Details
            //
            if (getRegionForControlAux(m_report.getDetails(), x, y, rptSection, isFreeCtrl)) { //@@@: if (getRegionForControlAux(m_report.getDetails(), x, y, out rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0); //@@@: w_aspect.setOffset(0);
                return true; //@@@: return true;
            } //@@@: }

            // Groups Footers
            //
            if (getRegionForControlAux(m_report.getGroupsFooters(), x, y, rptSection, isFreeCtrl)) { //@@@: if (getRegionForControlAux(m_report.getGroupsFooters(), x, y, out rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0); //@@@: w_aspect.setOffset(0);
                return true; //@@@: return true;
            } //@@@: }

            y = y + m_offSet; //@@@: y = y + m_offSet;

            // Footers
            //
            if (getRegionForControlAux(m_report.getFooters(), x, y, rptSection, isFreeCtrl)) { //@@@: if (getRegionForControlAux(m_report.getFooters(), x, y, out rptSection, isFreeCtrl)) {
                w_aspect.setOffset(m_offSet); //@@@: w_aspect.setOffset(m_offSet);
                return true; //@@@: return true;
            } //@@@: }

            return false; //@@@: return false;
        }; //@@@: }

        const getRegionForControlAux = function(rptSections, ) { //@@@: private bool getRegionForControlAux(cIReportGroupSections rptSections,
                                            float x,  //@@@: float x,
                                            float y,  //@@@: float y,
                                            cReportSection rptSection,  //@@@: out cReportSection rptSection,
                                            bool isFreeCtrl)  //@@@: bool isFreeCtrl)
        { //@@@: {
            let y1 = 0; //@@@: float y1 = 0;
            let y2 = 0; //@@@: float y2 = 0;
            let rtnSec = null; //@@@: cReportSection rtnSec = null;

            rptSection = null; //@@@: rptSection = null;

            for(var _i = 0; _i < rptSections.count(); _i++) { //@@@: for (int _i = 0; _i < rptSections.count(); _i++) {

                let rptSec = rptSections.item(_i); //@@@: cReportSection rptSec = rptSections.item(_i);
                let w_aspect = rptSec.getAspect(); //@@@: cReportAspect w_aspect = rptSec.getAspect();

                y1 = w_aspect.getTop(); //@@@: y1 = w_aspect.getTop();
                y2 = w_aspect.getTop() + w_aspect.getHeight(); //@@@: y2 = w_aspect.getTop() + w_aspect.getHeight();

                if (isFreeCtrl) { //@@@: if (isFreeCtrl) {
                    if (y1 <= y) { //@@@: if (y1 <= y) {
                        rtnSec = rptSec; //@@@: rtnSec = rptSec;
                    } //@@@: }
                }  //@@@: }
                else { //@@@: else {
                    if (y1 <= y && y2 >= y) {  //@@@: if (y1 <= y && y2 >= y) {
                        return true;  //@@@: return true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            if (rtnSec !== null) { //@@@: if (rtnSec != null) {
                rptSection = rtnSec; //@@@: rptSection = rtnSec;
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else {
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const pChangeTopSection = function(rptSec, ) { //@@@: private void pChangeTopSection(cReportSection rptSec,
                                        float offSetTopSection,  //@@@: float offSetTopSection,
                                        bool bChangeTop,  //@@@: bool bChangeTop,
                                        bool bZeroOffset)  //@@@: bool bZeroOffset)
        {  //@@@: {
            let newTopCtrl = 0; //@@@: float newTopCtrl = 0;
            let offSet = 0; //@@@: float offSet = 0;
            let bottom = 0; //@@@: float bottom = 0;
            let secTop = 0; //@@@: float secTop = 0;
            let secLnHeigt = 0; //@@@: float secLnHeigt = 0;
            let offSecLn = 0; //@@@: float offSecLn = 0;
UNKNOWN >>             cReportPaintObject paintSec; //@@@: cReportPaintObject paintSec;

            let secAspect = rptSec.getAspect(); //@@@: cReportAspect secAspect = rptSec.getAspect();
            secAspect.setTop(secAspect.getTop() + offSetTopSection); //@@@: secAspect.setTop(secAspect.getTop() + offSetTopSection);
            offSet = rptSec.getSectionLines().item(1).getAspect().getTop() - secAspect.getTop(); //@@@: offSet = rptSec.getSectionLines().item(1).getAspect().getTop() - secAspect.getTop();
            secTop = secAspect.getTop(); //@@@: secTop = secAspect.getTop();

            for(var _i = 0; _i < rptSec.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < rptSec.getSectionLines().count(); _i++) {

                let rptSecLine = rptSec.getSectionLines().item(_i); //@@@: cReportSectionLine rptSecLine = rptSec.getSectionLines().item(_i);

                let secLineAspect = rptSecLine.getAspect(); //@@@: cReportAspect secLineAspect = rptSecLine.getAspect();

                // footers grow to top
                //
                if (rptSec.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER  //@@@: if (rptSec.getTypeSection() == csRptTypeSection.CSRPTTPMAINSECTIONFOOTER
                    || rptSec.getTypeSection() === csRptTypeSection.CSRPTTPSCFOOTER) { //@@@: || rptSec.getTypeSection() == csRptTypeSection.CSRPTTPSCFOOTER) {

                    if (bChangeTop) { //@@@: if (bChangeTop) {

                        if (bZeroOffset) { //@@@: if (bZeroOffset) {
                            offSet = 0; //@@@: offSet = 0;
                        } //@@@: }

                    }  //@@@: }
                    else { //@@@: else {

                        if (rptSecLine.getRealIndex() >= m_indexSecLnMoved && m_indexSecLnMoved > 0) { //@@@: if (rptSecLine.getRealIndex() >= m_indexSecLnMoved && m_indexSecLnMoved > 0) {

                            bChangeTop = true; //@@@: bChangeTop = true;
                        } //@@@: }

                    } //@@@: }

                    // every other section grow to bottom
                    //
                }  //@@@: }
                else { //@@@: else {
                    offSecLn =  - secLineAspect.getTop(); //@@@: offSecLn = (secTop + secLnHeigt) - secLineAspect.getTop();

                    if (offSetTopSection !== 0) { //@@@: if (offSetTopSection != 0) {
                        offSecLn = 0; //@@@: offSecLn = 0;
                    } //@@@: }
                } //@@@: }

                secLineAspect.setTop(secTop + secLnHeigt); //@@@: secLineAspect.setTop(secTop + secLnHeigt);
                secLnHeigt = secLnHeigt + secLineAspect.getHeight(); //@@@: secLnHeigt = secLnHeigt + secLineAspect.getHeight();

                if (rptSecLine.getKeyPaint() !== "") { //@@@: if (rptSecLine.getKeyPaint() != "") {
                    paintSec = m_paint.getPaintSections().item(rptSecLine.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(rptSecLine.getKeyPaint());
                    paintSec.getAspect().setTop(secLineAspect.getTop() + secLineAspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION); //@@@: paintSec.getAspect().setTop(secLineAspect.getTop() + secLineAspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
                }  //@@@: }
                else { //@@@: else {
                    paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint());
                } //@@@: }
                if (paintSec !== null) { //@@@: if (paintSec != null) {
                    paintSec.setHeightSecLine(secLineAspect.getHeight()); //@@@: paintSec.setHeightSecLine(secLineAspect.getHeight());
                } //@@@: }

                for(var _j = 0; _j < rptSecLine.getControls().count(); _j++) { //@@@: for (int _j = 0; _j < rptSecLine.getControls().count(); _j++) {
                    let rptCtrl = rptSecLine.getControls().item(_j); //@@@: cReportControl rptCtrl = rptSecLine.getControls().item(_j);

                    let ctrLabelAspect = rptCtrl.getLabel().getAspect(); //@@@: cReportAspect ctrLabelAspect = rptCtrl.getLabel().getAspect();

                    if (rptCtrl.getIsFreeCtrl()) { //@@@: if (rptCtrl.getIsFreeCtrl()) {
                        newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn; //@@@: newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn;
                    }  //@@@: }
                    else { //@@@: else {
                        newTopCtrl = (ctrLabelAspect.getTop() + ctrLabelAspect.getHeight() - offSet) + offSecLn; //@@@: newTopCtrl = (ctrLabelAspect.getTop() + ctrLabelAspect.getHeight() - offSet) + offSecLn;
                    } //@@@: }

                    bottom = secLineAspect.getTop() + secLineAspect.getHeight(); //@@@: bottom = secLineAspect.getTop() + secLineAspect.getHeight();

                    if (newTopCtrl > bottom) { //@@@: if (newTopCtrl > bottom) {
                        newTopCtrl = bottom - ctrLabelAspect.getHeight(); //@@@: newTopCtrl = bottom - ctrLabelAspect.getHeight();
                    }  //@@@: }
                    else { //@@@: else {
                        newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn; //@@@: newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn;
                    } //@@@: }

                    if (newTopCtrl < secLineAspect.getTop()) { newTopCtrl = secLineAspect.getTop(); } //@@@: if (newTopCtrl < secLineAspect.getTop()) { newTopCtrl = secLineAspect.getTop(); }

                    ctrLabelAspect.setTop(newTopCtrl); //@@@: ctrLabelAspect.setTop(newTopCtrl);
                    if (m_paint.getPaintObject(rptCtrl.getKeyPaint()) !== null) { //@@@: if (m_paint.getPaintObject(rptCtrl.getKeyPaint()) != null) {
                        m_paint.getPaintObject(rptCtrl.getKeyPaint()).getAspect().setTop(ctrLabelAspect.getTop()); //@@@: m_paint.getPaintObject(rptCtrl.getKeyPaint()).getAspect().setTop(ctrLabelAspect.getTop());
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            // when a group is added the first to get here is the header
            // and the footer has not have a section yet
            //
            if (rptSec.getKeyPaint() === "") { return; } //@@@: if (rptSec.getKeyPaint() == "") { return; }

            let w_aspect = rptSec.getAspect(); //@@@: cReportAspect w_aspect = rptSec.getAspect();

            // we only draw the bottom line of the sections
            //
            paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint());

            if (paintSec !== null) { //@@@: if (paintSec != null) {
                paintSec.getAspect().setTop(w_aspect.getTop()  //@@@: paintSec.getAspect().setTop(w_aspect.getTop()
                                            + w_aspect.getHeight()  //@@@: + w_aspect.getHeight()
                                            - cGlobals.C_HEIGHT_BAR_SECTION); //@@@: - cGlobals.C_HEIGHT_BAR_SECTION);
                paintSec.setHeightSec(w_aspect.getHeight()); //@@@: paintSec.setHeightSec(w_aspect.getHeight());
            } //@@@: }
        }; //@@@: }

        const moveSection = function(paintObj, ) { //@@@: private void moveSection(CSReportPaint.cReportPaintObject paintObj,
                                    float x,  //@@@: float x,
                                    float y,  //@@@: float y,
                                    float minBottom,  //@@@: float minBottom,
                                    float maxBottom,  //@@@: float maxBottom,
                                    cReportSection secToMove,  //@@@: cReportSection secToMove,
                                    bool isNew)  //@@@: bool isNew)
        {  //@@@: {
            let oldHeight = 0; //@@@: float oldHeight = 0;
            let i = 0; //@@@: int i = 0;

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;

            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();

            // if Y is contained by the premited range everything is ok
            //
            if (y >= minBottom && y <= maxBottom) { //@@@: if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - m_offY); //@@@: w_aspect.setTop(y - m_offY);

                // because the top has been set to real dimensions
                // of the screen we must move to the offset
                // of his section
                //
                w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset()); //@@@: w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset());
            }  //@@@: }
            else { //@@@: else {
                // if we have moved to top
                //
                if (y < minBottom) { //@@@: if (y < minBottom) {
                    w_aspect.setTop(minBottom); //@@@: w_aspect.setTop(minBottom);

                    // because the top has been set to real dimensions
                    // of the screen we must move to the offset
                    // of his section
                    //
                    w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset()); //@@@: w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset());
                }  //@@@: }
                else { //@@@: else {
                    w_aspect.setTop(maxBottom); //@@@: w_aspect.setTop(maxBottom);
                } //@@@: }
            } //@@@: }

            m_paint.alingToGrid(paintObj.getKey()); //@@@: m_paint.alingToGrid(paintObj.getKey());

            if (isNew) { //@@@: if (isNew) {
                oldHeight = 0; //@@@: oldHeight = 0;
            }  //@@@: }
            else { //@@@: else {
                oldHeight = secToMove.getAspect().getHeight(); //@@@: oldHeight = secToMove.getAspect().getHeight();
            } //@@@: }

            // for the detail section and every other section which is over the detail
            // we only change the height, for all sections bellow the detail we need to
            // change the height and top becasuse wen we strech a section it needs to move
            // to the bottom of the report
            //
            secToMove.getAspect().setHeight(w_aspect.getTop()  //@@@: secToMove.getAspect().setHeight(w_aspect.getTop()
                                            + cGlobals.C_HEIGHT_BAR_SECTION  //@@@: + cGlobals.C_HEIGHT_BAR_SECTION
                                            - secToMove.getAspect().getTop()); //@@@: - secToMove.getAspect().getTop());

            // every section bellow this section needs to update its top
            //
            let offsetTop = 0; //@@@: float offsetTop = 0;

            w_aspect = secToMove.getAspect(); //@@@: w_aspect = secToMove.getAspect();

            offsetTop = oldHeight - (w_aspect.getHeight() + m_newSecLineOffSet); //@@@: offsetTop = oldHeight - (w_aspect.getHeight() + m_newSecLineOffSet);

            switch (secToMove.getTypeSection()) { //@@@: switch (secToMove.getTypeSection()) {

                    // if the section is a footer we move to bottom
                    // (Ojo footer sections, no group footers)
                    //
                case  csRptTypeSection.CSRPTTPSCFOOTER: //@@@: case  csRptTypeSection.CSRPTTPSCFOOTER:
                case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER: //@@@: case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:

                    w_aspect.setTop(w_aspect.getTop() + offsetTop); //@@@: w_aspect.setTop(w_aspect.getTop() + offsetTop);

                    // OJO: this has to be after we have changed the top of the section
                    //      to allow the paint object to reflect the change
                    //
                    // we move the controls of this section
                    //
                    pChangeHeightSection(secToMove, oldHeight); //@@@: pChangeHeightSection(secToMove, oldHeight);

                    // move the section
                    //
                    pChangeBottomSections(secToMove, offsetTop); //@@@: pChangeBottomSections(secToMove, offsetTop);

                    // for headers, group headers, group footers and the detail section we move to top
                    //
                    break; //@@@: break;
                default: //@@@: default:

                    // move all controls in this section
                    //
                    pChangeHeightSection(secToMove, oldHeight); //@@@: pChangeHeightSection(secToMove, oldHeight);

                    offsetTop = offsetTop * -1; //@@@: offsetTop = offsetTop * -1;

                    pChangeTopSections(secToMove, offsetTop); //@@@: pChangeTopSections(secToMove, offsetTop);
                    break; //@@@: break;
            } //@@@: }

            // finaly we need to update the offset of every section,
            // apply it to every object paint in m_Paint
            //
            let pageHeight = 0; //@@@: float pageHeight = 0;
            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            pGetOffSet(CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: pGetOffSet(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                        m_report.getPaperInfo(),  //@@@: m_report.getPaperInfo(),
                                                        w_paperInfo.getPaperSize(),  //@@@: w_paperInfo.getPaperSize(),
                                                        w_paperInfo.getOrientation()).Height,  //@@@: w_paperInfo.getOrientation()).Height,
                                                        pageHeight); //@@@: pageHeight);
            pRefreshOffSetInPaintObjs(); //@@@: pRefreshOffSetInPaintObjs();
            m_paint.setGridHeight(pageHeight); //@@@: m_paint.setGridHeight(pageHeight);
        }; //@@@: }

        const pChangeBottomSections = function(secToMove, offsetTop) { //@@@: private void pChangeBottomSections(cReportSection secToMove, float offsetTop) {

            let sec = null; //@@@: cReportSection sec = null;
            let bChangeTop = false; //@@@: bool bChangeTop = false;
            let i = 0; //@@@: int i = 0;

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCFOOTER  //@@@: if (secToMove.getTypeSection() == csRptTypeSection.CSRPTTPSCFOOTER
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER  //@@@: || secToMove.getTypeSection() == csRptTypeSection.CSRPTTPMAINSECTIONFOOTER
                || bChangeTop) { //@@@: || bChangeTop) {

                for (i = m_report.getFooters().count(); i <= 1; i--) { //@@@: for (i = m_report.getFooters().count(); i <= 1; i--) {
                    sec = m_report.getFooters().item(i); //@@@: sec = m_report.getFooters().item(i);

                    if (bChangeTop) { //@@@: if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false); //@@@: pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    } //@@@: }

                    if (sec === secToMove) { //@@@: if (sec == secToMove) {
                        bChangeTop = true; //@@@: bChangeTop = true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pChangeTopSections = function(secToMove, offsetTop) { //@@@: private void pChangeTopSections(cReportSection secToMove, float offsetTop) {

            let sec = null; //@@@: cReportSection sec = null;
            let bChangeTop = false; //@@@: bool bChangeTop = false;
            let i = 0; //@@@: int i = 0;

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCHEADER  //@@@: if (secToMove.getTypeSection() == csRptTypeSection.CSRPTTPSCHEADER
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONHEADER) { //@@@: || secToMove.getTypeSection() == csRptTypeSection.CSRPTTPMAINSECTIONHEADER) {

                for(var _i = 0; _i < m_report.getHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getHeaders().count(); _i++) {
                    sec = m_report.getHeaders().item(_i); //@@@: sec = m_report.getHeaders().item(_i);
                    if (bChangeTop) { //@@@: if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false); //@@@: pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    } //@@@: }

                    if (sec === secToMove) { //@@@: if (sec == secToMove) {
                        bChangeTop = true; //@@@: bChangeTop = true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPGROUPHEADER || bChangeTop) { //@@@: if (secToMove.getTypeSection() == csRptTypeSection.CSRPTTPGROUPHEADER || bChangeTop) {

                for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                    sec = m_report.getGroupsHeaders().item(_i); //@@@: sec = m_report.getGroupsHeaders().item(_i);
                    if (bChangeTop) { //@@@: if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false); //@@@: pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    } //@@@: }

                    if (sec === secToMove) { //@@@: if (sec == secToMove) {
                        bChangeTop = true; //@@@: bChangeTop = true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONDETAIL  //@@@: if (secToMove.getTypeSection() == csRptTypeSection.CSRPTTPMAINSECTIONDETAIL
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCDETAIL || bChangeTop) { //@@@: || secToMove.getTypeSection() == csRptTypeSection.CSRPTTPSCDETAIL || bChangeTop) {

                for(var _i = 0; _i < m_report.getDetails().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getDetails().count(); _i++) {
                    sec = m_report.getDetails().item(_i); //@@@: sec = m_report.getDetails().item(_i);
                    if (bChangeTop) { //@@@: if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false); //@@@: pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    } //@@@: }

                    if (sec === secToMove) { //@@@: if (sec == secToMove) {
                        bChangeTop = true; //@@@: bChangeTop = true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPGROUPFOOTER || bChangeTop) { //@@@: if (secToMove.getTypeSection() == csRptTypeSection.CSRPTTPGROUPFOOTER || bChangeTop) {

                for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                    sec = m_report.getGroupsFooters().item(_i); //@@@: sec = m_report.getGroupsFooters().item(_i);
                    if (bChangeTop) { //@@@: if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false); //@@@: pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    } //@@@: }

                    if (sec === secToMove) { //@@@: if (sec == secToMove) {
                        bChangeTop = true; //@@@: bChangeTop = true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pChangeHeightSection = function(sec, oldSecHeight) { //@@@: private void pChangeHeightSection(cReportSection sec, float oldSecHeight) {
            let i = 0; //@@@: int i = 0;
            let heightLines = 0; //@@@: float heightLines = 0;
UNKNOWN >>             cReportAspect w_aspect; //@@@: cReportAspect w_aspect;

            // Update section line
            //
            for (i = 1; i <= sec.getSectionLines().count() - 1; i++) { //@@@: for (i = 1; i <= sec.getSectionLines().count() - 1; i++) {
                w_aspect = sec.getSectionLines().item(i).getAspect(); //@@@: w_aspect = sec.getSectionLines().item(i).getAspect();
                heightLines = heightLines + w_aspect.getHeight(); //@@@: heightLines = heightLines + w_aspect.getHeight();
            } //@@@: }

            // for the last section line the height is the rest
            //
            let w_sectionLines = sec.getSectionLines(); //@@@: cReportSectionLines w_sectionLines = sec.getSectionLines();
            w_aspect = w_sectionLines.item(w_sectionLines.count()).getAspect(); //@@@: w_aspect = w_sectionLines.item(w_sectionLines.count()).getAspect();
            w_aspect.setHeight(sec.getAspect().getHeight() - heightLines); //@@@: w_aspect.setHeight(sec.getAspect().getHeight() - heightLines);

            pChangeTopSection(sec, 0, false, true); //@@@: pChangeTopSection(sec, 0, false, true);
        }; //@@@: }

        const reLoadReport = function() { //@@@: private void reLoadReport() {

            let paintSec = null; //@@@: cReportPaintObject paintSec = null;

            m_paint = null; //@@@: m_paint = null;

            m_keyMoving = ""; //@@@: m_keyMoving = "";
            m_keySizing = ""; //@@@: m_keySizing = "";
            m_keyObj = ""; //@@@: m_keyObj = "";
            m_keyFocus = ""; //@@@: m_keyFocus = "";
            m_moveType = csRptEditorMoveType.CSRPTEDMOVTNONE; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTNONE;

            m_paint = new CSReportPaint.cReportPaint(); //@@@: m_paint = new CSReportPaint.cReportPaint();

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            m_paint.setGridHeight( //@@@: m_paint.setGridHeight(
                    pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                m_report.getPaperInfo(),  //@@@: m_report.getPaperInfo(),
                                                                w_paperInfo.getPaperSize(),  //@@@: w_paperInfo.getPaperSize(),
                                                                w_paperInfo.getOrientation()).Height)); //@@@: w_paperInfo.getOrientation()).Height));

            m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid); //@@@: m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

            if (m_report.getName() !== "") { //@@@: if (m_report.getName() != "") {
                m_editorTab.Text = m_report.getPath() + m_report.getName(); //@@@: m_editorTab.Text = m_report.getPath() + m_report.getName();
            } //@@@: }

            let sec = null; //@@@: cReportSection sec = null;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i); //@@@: sec = m_report.getHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),  //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),  //@@@: sec.getKey(),
                                                sec.getTypeSection(),  //@@@: sec.getTypeSection(),
                                                sec.getName(),  //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_HEADER); //@@@: pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_HEADER);
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i); //@@@: sec = m_report.getGroupsHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),  //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),  //@@@: sec.getKey(),
                                                sec.getTypeSection(),  //@@@: sec.getTypeSection(),
                                                sec.getName(),  //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPH); //@@@: pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPH);
            } //@@@: }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i); //@@@: sec = m_report.getDetails().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),  //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),  //@@@: sec.getKey(),
                                                sec.getTypeSection(),  //@@@: sec.getTypeSection(),
                                                sec.getName(),  //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_DETAIL); //@@@: pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_DETAIL);
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                sec = m_report.getGroupsFooters().item(_i); //@@@: sec = m_report.getGroupsFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),  //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),  //@@@: sec.getKey(),
                                                sec.getTypeSection(),  //@@@: sec.getTypeSection(),
                                                sec.getName(),  //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPF); //@@@: pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPF);
            } //@@@: }

            for(var _i = 0; _i < m_report.getFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getFooters().count(); _i++) {
                sec = m_report.getFooters().item(_i); //@@@: sec = m_report.getFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),  //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),  //@@@: sec.getKey(),
                                                sec.getTypeSection(),  //@@@: sec.getTypeSection(),
                                                sec.getName(),  //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_FOOTER); //@@@: pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_FOOTER);
            } //@@@: }

UNKNOWN >>             CSReportPaint.csRptPaintObjType paintType; //@@@: CSReportPaint.csRptPaintObjType paintType;

            for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++) {

                let rptCtrl = m_report.getControls().item(_i); //@@@: cReportControl rptCtrl = m_report.getControls().item(_i);
                refreshNextNameCtrl(rptCtrl.getName()); //@@@: refreshNextNameCtrl(rptCtrl.getName());
                let ctrlAspect = rptCtrl.getLabel().getAspect(); //@@@: cReportAspect ctrlAspect = rptCtrl.getLabel().getAspect();

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTIMAGE  //@@@: if (rptCtrl.getControlType() == csRptControlType.CSRPTCTIMAGE
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) { //@@@: || rptCtrl.getControlType() == csRptControlType.CSRPTCTCHART) {
                    paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE; //@@@: paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE;
                }  //@@@: }
                else { //@@@: else {
                    paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX; //@@@: paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX;
                } //@@@: }

                let paintObj = m_paint.getNewObject(paintType); //@@@: CSReportPaint.cReportPaintObject paintObj = m_paint.getNewObject(paintType);

                // for old reports
                //
                ctrlAspect.setTransparent(ctrlAspect.getBackColor() === Color.White.ToArgb()); //@@@: ctrlAspect.setTransparent(ctrlAspect.getBackColor() == Color.White.ToArgb());

                paintObj.setImage(rptCtrl.getImage().getImage()); //@@@: paintObj.setImage(rptCtrl.getImage().getImage());

                let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();
                w_aspect.setLeft(ctrlAspect.getLeft()); //@@@: w_aspect.setLeft(ctrlAspect.getLeft());
                w_aspect.setTop(ctrlAspect.getTop()); //@@@: w_aspect.setTop(ctrlAspect.getTop());
                w_aspect.setWidth(ctrlAspect.getWidth()); //@@@: w_aspect.setWidth(ctrlAspect.getWidth());
                w_aspect.setHeight(ctrlAspect.getHeight()); //@@@: w_aspect.setHeight(ctrlAspect.getHeight());
                w_aspect.setBackColor(ctrlAspect.getBackColor()); //@@@: w_aspect.setBackColor(ctrlAspect.getBackColor());
                w_aspect.setTransparent(ctrlAspect.getTransparent()); //@@@: w_aspect.setTransparent(ctrlAspect.getTransparent());
                w_aspect.setAlign(ctrlAspect.getAlign()); //@@@: w_aspect.setAlign(ctrlAspect.getAlign());
                w_aspect.setWordWrap(ctrlAspect.getWordWrap()); //@@@: w_aspect.setWordWrap(ctrlAspect.getWordWrap());

                if (ctrlAspect.getBorderType() === csReportBorderType.CSRPTBSNONE) { //@@@: if (ctrlAspect.getBorderType() == csReportBorderType.CSRPTBSNONE) {
                    w_aspect.setBorderColor(Color.Black.ToArgb()); //@@@: w_aspect.setBorderColor(Color.Black.ToArgb());
                    w_aspect.setBorderWidth(1); //@@@: w_aspect.setBorderWidth(1);
                    w_aspect.setBorderRounded(false); //@@@: w_aspect.setBorderRounded(false);
                    w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED); //@@@: w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
                }  //@@@: }
                else { //@@@: else {
                    w_aspect.setBorderType(ctrlAspect.getBorderType()); //@@@: w_aspect.setBorderType(ctrlAspect.getBorderType());
                    w_aspect.setBorderColor(ctrlAspect.getBorderColor()); //@@@: w_aspect.setBorderColor(ctrlAspect.getBorderColor());
                    w_aspect.setBorderColor3d(ctrlAspect.getBorderColor3d()); //@@@: w_aspect.setBorderColor3d(ctrlAspect.getBorderColor3d());
                    w_aspect.setBorderColor3dShadow(ctrlAspect.getBorderColor3dShadow()); //@@@: w_aspect.setBorderColor3dShadow(ctrlAspect.getBorderColor3dShadow());
                    w_aspect.setBorderRounded(ctrlAspect.getBorderRounded()); //@@@: w_aspect.setBorderRounded(ctrlAspect.getBorderRounded());
                    w_aspect.setBorderWidth(ctrlAspect.getBorderWidth()); //@@@: w_aspect.setBorderWidth(ctrlAspect.getBorderWidth());
                } //@@@: }

                switch (rptCtrl.getSectionLine().getTypeSection()) { //@@@: switch (rptCtrl.getSectionLine().getTypeSection()) {
                    case  csRptTypeSection.CSRPTTPSCFOOTER: //@@@: case  csRptTypeSection.CSRPTTPSCFOOTER:
                    case  csRptTypeSection.CSRPTTPMAINSECTIONFOOTER: //@@@: case  csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:
                        w_aspect.setOffset(m_offSet); //@@@: w_aspect.setOffset(m_offSet);
                        break; //@@@: break;
                } //@@@: }

                let w_font = w_aspect.getFont(); //@@@: cReportFont w_font = w_aspect.getFont();
                w_font.setName(ctrlAspect.getFont().getName()); //@@@: w_font.setName(ctrlAspect.getFont().getName());
                w_font.setForeColor(ctrlAspect.getFont().getForeColor()); //@@@: w_font.setForeColor(ctrlAspect.getFont().getForeColor());
                w_font.setSize(ctrlAspect.getFont().getSize()); //@@@: w_font.setSize(ctrlAspect.getFont().getSize());
                w_font.setBold(ctrlAspect.getFont().getBold()); //@@@: w_font.setBold(ctrlAspect.getFont().getBold());
                w_font.setItalic(ctrlAspect.getFont().getItalic()); //@@@: w_font.setItalic(ctrlAspect.getFont().getItalic());
                w_font.setUnderline(ctrlAspect.getFont().getUnderline()); //@@@: w_font.setUnderline(ctrlAspect.getFont().getUnderline());
                w_font.setStrike(ctrlAspect.getFont().getStrike()); //@@@: w_font.setStrike(ctrlAspect.getFont().getStrike());

                paintObj.setText(rptCtrl.getLabel().getText()); //@@@: paintObj.setText(rptCtrl.getLabel().getText());
                paintObj.setRptType(csRptTypeSection.CONTROL); //@@@: paintObj.setRptType(csRptTypeSection.CONTROL);
                paintObj.setTag(rptCtrl.getKey()); //@@@: paintObj.setTag(rptCtrl.getKey());
                rptCtrl.setKeyPaint(paintObj.getKey()); //@@@: rptCtrl.setKeyPaint(paintObj.getKey());
            } //@@@: }

            m_dataHasChanged = false; //@@@: m_dataHasChanged = false;

            m_paint.createPicture(m_picReport.CreateGraphics()); //@@@: m_paint.createPicture(m_picReport.CreateGraphics());

            m_picRule.Refresh(); //@@@: m_picRule.Refresh();
        }; //@@@: }

        const pAddPaintSetcionForSecLn = function( //@@@: private void pAddPaintSetcionForSecLn(
            sec,  //@@@: cReportSection sec,
			typeSecLn) { //@@@: csRptTypeSection typeSecLn)
            let i = 0; //@@@: int i = 0;
            let paintSec = null; //@@@: cReportPaintObject paintSec = null;

            if (sec.getSectionLines().count() > 1) { //@@@: if (sec.getSectionLines().count() > 1) {

                for (i = 1; i <= sec.getSectionLines().count() - 1; i++) { //@@@: for (i = 1; i <= sec.getSectionLines().count() - 1; i++) {
                    let secLine = sec.getSectionLines().item(i); //@@@: cReportSectionLine secLine = sec.getSectionLines().item(i);
                    secLine.setKeyPaint( //@@@: secLine.setKeyPaint(
                        paintSection( //@@@: paintSection(
                            secLine.getAspect(),  //@@@: secLine.getAspect(),
                            secLine.getKey(),  //@@@: secLine.getKey(),
                            sec.getTypeSection(),  //@@@: sec.getTypeSection(),
                            C_SECTIONLINE + i.ToString(),  //@@@: C_SECTIONLINE + i.ToString(),
                            true)); //@@@: true));

                    // we set the height of every section line
                    //
                    paintSec = m_paint.getPaintSections().item(secLine.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(secLine.getKeyPaint());
                    paintSec.setHeightSecLine(secLine.getAspect().getHeight()); //@@@: paintSec.setHeightSecLine(secLine.getAspect().getHeight());
                    paintSec.setRptType(typeSecLn); //@@@: paintSec.setRptType(typeSecLn);
                    paintSec.setRptKeySec(sec.getKey()); //@@@: paintSec.setRptKeySec(sec.getKey());
                } //@@@: }

                // if there is more than one section we use
                // textLine to show the name of the last line
                //
                let po = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: CSReportPaint.cReportPaintObject po = m_paint.getPaintSections().item(sec.getKeyPaint());
                po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString()); //@@@: po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString());
            } //@@@: }

            // we set the height of the last section line
            //
            paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());

            let secLines = sec.getSectionLines(); //@@@: cReportSectionLines secLines = sec.getSectionLines();
            paintSec.setHeightSecLine(secLines.item(secLines.count()).getAspect().getHeight()); //@@@: paintSec.setHeightSecLine(secLines.item(secLines.count()).getAspect().getHeight());
        }; //@@@: }

        const refreshNextNameCtrl = function(nameCtrl) { //@@@: private void refreshNextNameCtrl(String nameCtrl) {
            let x = 0; //@@@: int x = 0;
            if (nameCtrl.Substring(1, cGlobals.C_CONTROL_NAME.Length).ToUpper() === cGlobals.C_CONTROL_NAME.ToUpper()) { //@@@: if (nameCtrl.Substring(1, cGlobals.C_CONTROL_NAME.Length).ToUpper() == cGlobals.C_CONTROL_NAME.ToUpper()) {
                x = cReportGlobals.val(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1)); //@@@: x = (int)cReportGlobals.val(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1));
                if (x > m_nextNameCtrl) { //@@@: if (x > m_nextNameCtrl) {
                    m_nextNameCtrl = x + 1; //@@@: m_nextNameCtrl = x + 1;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const moveControl = function(sKeyPaintObj) { //@@@: private void moveControl(String sKeyPaintObj) {
            let rptSecLine = null; //@@@: cReportSectionLine rptSecLine = null;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;
            let rptSecLineAspect = null; //@@@: cReportAspect rptSecLineAspect = null;
            let objPaintAspect = null; //@@@: cReportAspect objPaintAspect = null;

            m_paint.alingToGrid(sKeyPaintObj); //@@@: m_paint.alingToGrid(sKeyPaintObj);

            rptCtrl = m_report.getControls().item(m_paint.getPaintObject(sKeyPaintObj).getTag()); //@@@: rptCtrl = m_report.getControls().item(m_paint.getPaintObject(sKeyPaintObj).getTag());

            objPaintAspect = m_paint.getPaintObject(sKeyPaintObj).getAspect(); //@@@: objPaintAspect = m_paint.getPaintObject(sKeyPaintObj).getAspect();

            if (rptCtrl === null) { return; } //@@@: if (rptCtrl == null) { return; }

            let w_aspect = rptCtrl.getLabel().getAspect(); //@@@: cReportAspect w_aspect = rptCtrl.getLabel().getAspect();
            w_aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset()); //@@@: w_aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset());
            w_aspect.setHeight(objPaintAspect.getHeight()); //@@@: w_aspect.setHeight(objPaintAspect.getHeight());
            w_aspect.setWidth(objPaintAspect.getWidth()); //@@@: w_aspect.setWidth(objPaintAspect.getWidth());
            w_aspect.setLeft(objPaintAspect.getLeft()); //@@@: w_aspect.setLeft(objPaintAspect.getLeft());

            if (getLineRegionForControl(sKeyPaintObj, rptSecLine, rptCtrl.getIsFreeCtrl())) { //@@@: if (getLineRegionForControl(sKeyPaintObj, out rptSecLine, rptCtrl.getIsFreeCtrl())) {

                if (!(rptSecLine === rptCtrl.getSectionLine())) { //@@@: if (!(rptSecLine == rptCtrl.getSectionLine())) {
                    rptCtrl.getSectionLine().getControls().remove(rptCtrl.getKey()); //@@@: rptCtrl.getSectionLine().getControls().remove(rptCtrl.getKey());
                    rptSecLine.getControls().add(rptCtrl, rptCtrl.getKey()); //@@@: rptSecLine.getControls().add(rptCtrl, rptCtrl.getKey());
                } //@@@: }

                // we need to check the control is between the limits of the section
                // in which it is contained
                //
                rptSecLineAspect = rptCtrl.getSectionLine().getAspect(); //@@@: rptSecLineAspect = rptCtrl.getSectionLine().getAspect();

                w_aspect = rptCtrl.getLabel().getAspect(); //@@@: w_aspect = rptCtrl.getLabel().getAspect();

                w_aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset()); //@@@: w_aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset());

                if (!rptCtrl.getIsFreeCtrl()) { //@@@: if (!rptCtrl.getIsFreeCtrl()) {
                    if (w_aspect.getTop() + w_aspect.getHeight()  //@@@: if (w_aspect.getTop() + w_aspect.getHeight()
                        > rptSecLineAspect.getTop() + rptSecLineAspect.getHeight()) { //@@@: > rptSecLineAspect.getTop() + rptSecLineAspect.getHeight()) {
                        w_aspect.setTop(rptSecLineAspect.getTop()  //@@@: w_aspect.setTop(rptSecLineAspect.getTop()
                                        + rptSecLineAspect.getHeight()  //@@@: + rptSecLineAspect.getHeight()
                                        - w_aspect.getHeight()); //@@@: - w_aspect.getHeight());
                    } //@@@: }
                } //@@@: }

                if (w_aspect.getTop() < rptSecLineAspect.getTop()) { //@@@: if (w_aspect.getTop() < rptSecLineAspect.getTop()) {
                    w_aspect.setTop(rptSecLineAspect.getTop()); //@@@: w_aspect.setTop(rptSecLineAspect.getTop());
                } //@@@: }

                objPaintAspect.setTop(w_aspect.getTop()); //@@@: objPaintAspect.setTop(w_aspect.getTop());
            } //@@@: }
        }; //@@@: }

        const showPopMenuSection = function(noDelete, showGroups) { //@@@: private void showPopMenuSection(bool noDelete, bool showGroups) {
            /* TODO: implement me //@@@: /* TODO: implement me
            m_fmain.popSecDelete.Enabled = !noDelete;
            m_fmain.popSecPropGroup.Visible = showGroups;
            m_fmain.PopupMenu(m_fmain.popSec);
             */ 
        }; //@@@: }

        const showPopMenuControl = function(clickInCtrl) { //@@@: private void showPopMenuControl(bool clickInCtrl) {
            /* TODO: implement me //@@@: /* TODO: implement me
            if (!clickInCtrl) {
                m_fmain.popObjCopy.Enabled = false;
                m_fmain.popObjCut.Enabled = false;
                m_fmain.popObjDelete.Enabled = false;
                m_fmain.popObjEditText.Enabled = false;
                m_fmain.popObjSendToBack.Enabled = false;
                m_fmain.popObjBringToFront.Enabled = false;
                m_fmain.popObjSendToBack.Enabled = false;
                m_fmain.popObjProperties.Enabled = false;
            } 
            else {
                m_fmain.popObjCopy.Enabled = true;
                m_fmain.popObjCut.Enabled = true;
                m_fmain.popObjDelete.Enabled = true;
                m_fmain.popObjEditText.Enabled = true;
                m_fmain.popObjSendToBack.Enabled = true;
                m_fmain.popObjBringToFront.Enabled = true;
                m_fmain.popObjSendToBack.Enabled = true;
                m_fmain.popObjProperties.Enabled = true;
            }

            bool bPasteEnabled = false;

            if (m_vCopyKeys.Length > 0) {
                bPasteEnabled = true;
            } 
            else if (!(m_fmain.getReportCopySource() === null)) {
                bPasteEnabled = m_fmain.getReportCopySource().getVCopyKeysCount() > 0;
            }

            m_fmain.popObjPaste.Enabled = bPasteEnabled;
            m_fmain.popObjPasteEx.Enabled = bPasteEnabled;
            m_fmain.PopupMenu(w___TYPE_NOT_FOUND.popObj);
             */ 
        }; //@@@: }

        const m_fGroup_UnloadForm = function() { //@@@: private void m_fGroup_UnloadForm() {
            m_fGroup = null; //@@@: m_fGroup = null;
        }; //@@@: }

        const m_fProperties_UnloadForm = function() { //@@@: private void m_fProperties_UnloadForm() {
            m_fProperties = null; //@@@: m_fProperties = null;
        }; //@@@: }

        const refreshBody = function() { //@@@: private void refreshBody() {
            try { //@@@: try {

                m_paint.endMove(m_picReport.CreateGraphics()); //@@@: m_paint.endMove(m_picReport.CreateGraphics());

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "ShowConnectsAux", C_MODULE, ""); //@@@: cError.mngError(ex, "ShowConnectsAux", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const refreshRule = function() { //@@@: private void refreshRule() {
            m_picRule.Refresh(); //@@@: m_picRule.Refresh();
        }; //@@@: }

        self.refreshReport = function() { //@@@: public void refreshReport() {

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            m_paint.setGridHeight(pSetSizePics( //@@@: m_paint.setGridHeight(pSetSizePics(
                                        CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                    m_report.getPaperInfo(),  //@@@: m_report.getPaperInfo(),
                                                                    w_paperInfo.getPaperSize(),  //@@@: w_paperInfo.getPaperSize(),
                                                                    w_paperInfo.getOrientation()).Height)); //@@@: w_paperInfo.getOrientation()).Height));
            pValidateSectionAspect(); //@@@: pValidateSectionAspect();
            reLoadReport(); //@@@: reLoadReport();
        }; //@@@: }

        // TODO: remove me if not needed
        self.refreshPostion = function() { //@@@: public void refreshPostion() {

        self.refreshAll = function() { //@@@: public void refreshAll() {
            refreshBody(); //@@@: refreshBody();
            refreshRule(); //@@@: refreshRule();
        }; //@@@: }

        const m_report_Done = function() { //@@@: private void m_report_Done() {
            closeProgressDlg(); //@@@: closeProgressDlg();
        }; //@@@: }

        /* TODO: implement me //@@@: /* TODO: implement me
        private void m_report_Progress(
            String task, 
            int page, 
            int currRecord, 
            int recordCount, 
            bool cancel) 
        { 
            if (m_cancelPrinting) {
                if (cWindow.ask("Confirm you want to cancel the execution of this report?", VbMsgBoxResult.vbNo)) {
                    cancel = true;
                    closeProgressDlg();
                    return;
                } 
                else {
                    m_cancelPrinting = false;
                }
            }

            if (m_fProgress === null) { return; }

            if (page > 0) { m_fProgress.lbCurrPage.Caption = page; }
            if (task !== "") { m_fProgress.lbTask.Caption = task; }
            if (currRecord > 0) { m_fProgress.lbCurrRecord.Caption = currRecord; }
            if (recordCount > 0 && Val(m_fProgress.lbRecordCount.Caption) !== recordCount) { 
                m_fProgress.lbRecordCount.Caption = recordCount; 
            }

            double percent = 0;
            if (recordCount > 0 && currRecord > 0) {
                percent = currRecord / recordCount;
                m_fProgress.prgVar.Value = percent * 100;
            }
        }
         */

        const closeProgressDlg = function() { //@@@: private void closeProgressDlg() {
            m_fProgress.Close(); //@@@: m_fProgress.Close();
            m_fProgress = null; //@@@: m_fProgress = null;
        }; //@@@: }

        const showProgressDlg = function() { //@@@: private void showProgressDlg() {
            m_cancelPrinting = false; //@@@: m_cancelPrinting = false;
            if (m_fProgress === null) {  //@@@: if (m_fProgress == null) {
                m_fProgress = new fProgress(); //@@@: m_fProgress = new fProgress();
                // TODO: add event for m_report_Progress
            } //@@@: }
            m_fProgress.Show(); //@@@: m_fProgress.Show();
            m_fProgress.BringToFront(); //@@@: m_fProgress.BringToFront();
        }; //@@@: }

        const m_fProgress_Cancel = function() { //@@@: private void m_fProgress_Cancel() {
            m_cancelPrinting = true; //@@@: m_cancelPrinting = true;
        }; //@@@: }

        /* TODO: implement me //@@@: /* TODO: implement me
        private void m_report_FindFileAccess(
            bool answer, 
            object commDialog, 
            String file) 
        { 
            String msg = "";
            msg = "The " + file + " could not be found. ¿Do you want to find it?";
            if (!cWindow.ask(msg, VbMsgBoxResult.vbYes)) { return; }

            commDialog = m_fmain.cmDialog;
            answer = true;
            m_fProgress.BringToFront();
            m_dataHasChanged = true;
        }
         */ 

        /* TODO: implement me //@@@: /* TODO: implement me
        private void txEdit_KeyPress(int keyAscii) {
            if (keyAscii === vbKeyEscape) {
                endEditText(keyAscii === vbKeyEscape);
                keyAscii = 0;
            }
        }
         */

        const pGetLeftBody = function() { //@@@: private int pGetLeftBody() {
            if (cMainEditor.gHideLeftBar) { //@@@: if (cMainEditor.gHideLeftBar) {
                return C_LEFTBODY; //@@@: return C_LEFTBODY;
            }  //@@@: }
            else { //@@@: else {
                return m_picRule.Width + C_LEFTBODY; //@@@: return m_picRule.Width + C_LEFTBODY;
            } //@@@: }
        }; //@@@: }

        const pSetSizePics = function(realPageHeight) { //@@@: private float pSetSizePics(float realPageHeight) {
            let pageHeight = 0; //@@@: float pageHeight = 0;

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            m_picReport.Width = CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: m_picReport.Width = (int)CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                m_report.getPaperInfo(),  //@@@: m_report.getPaperInfo(),
                                                                w_paperInfo.getPaperSize(),  //@@@: w_paperInfo.getPaperSize(),
                                                                w_paperInfo.getOrientation()).Width; //@@@: w_paperInfo.getOrientation()).Width;
            pGetOffSet(realPageHeight, pageHeight); //@@@: pGetOffSet(realPageHeight, pageHeight);

            if (pageHeight > realPageHeight) { realPageHeight = pageHeight; } //@@@: if (pageHeight > realPageHeight) { realPageHeight = pageHeight; }

            m_picReport.Height = realPageHeight; //@@@: m_picReport.Height = (int)realPageHeight;
            m_picRule.Height = (realPageHeight + C_TOPBODY * 2); //@@@: m_picRule.Height = (int)(realPageHeight + C_TOPBODY * 2);

            return pageHeight; //@@@: return pageHeight;
        }; //@@@: }

        const pMoveAll = function(x, y) { //@@@: private void pMoveAll(float x, float y) {
            let rptCtrlAspect = null; //@@@: cReportAspect rptCtrlAspect = null;
            let paintObj = null; //@@@: CSReportPaint.cReportPaintObject paintObj = null;

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;

            if (m_bNoMove) { return; } //@@@: if (m_bNoMove) { return; }

            let i = 0; //@@@: int i = 0;
            let offsetTop = 0; //@@@: float offsetTop = 0;
            let offsetLeft = 0; //@@@: float offsetLeft = 0;
            let firstLeft = 0; //@@@: float firstLeft = 0;
            let firstTop = 0; //@@@: float firstTop = 0;
            let firstOffSet = 0; //@@@: float firstOffSet = 0;

            if (m_vSelectedKeys.Length === 0) { return; } //@@@: if (m_vSelectedKeys.Length == 0) { return; }

            paintObj = m_paint.getPaintObject(m_keyMoving); //@@@: paintObj = m_paint.getPaintObject(m_keyMoving);

            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();
            firstLeft = w_aspect.getLeft(); //@@@: firstLeft = w_aspect.getLeft();
            firstTop = w_aspect.getTop(); //@@@: firstTop = w_aspect.getTop();
            firstOffSet = w_aspect.getOffset(); //@@@: firstOffSet = w_aspect.getOffset();

            for (i = m_vSelectedKeys.Length; i <= 1; i--) { //@@@: for (i = m_vSelectedKeys.Length; i <= 1; i--) {

                paintObj = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: paintObj = m_paint.getPaintObject(m_vSelectedKeys[i]);

                offsetLeft = pGetOffsetLeftFromControls(firstLeft, //@@@: offsetLeft = pGetOffsetLeftFromControls(firstLeft,
                                                        paintObj.getAspect().getLeft()); //@@@: paintObj.getAspect().getLeft());

                offsetTop = pGetOffsetTopFromControls(firstTop - firstOffSet, //@@@: offsetTop = pGetOffsetTopFromControls(firstTop - firstOffSet,
                                                        paintObj.getAspect().getTop()  //@@@: paintObj.getAspect().getTop()
                                                        - paintObj.getAspect().getOffset()); //@@@: - paintObj.getAspect().getOffset());

                w_aspect = paintObj.getAspect(); //@@@: w_aspect = paintObj.getAspect();

                if (x !== C_NOMOVE) { //@@@: if (x != C_NOMOVE) {
                    w_aspect.setLeft(x - m_offX + offsetLeft); //@@@: w_aspect.setLeft(x - m_offX + offsetLeft);
                } //@@@: }

                if (y !== C_NOMOVE) { //@@@: if (y != C_NOMOVE) {
                    w_aspect.setTop(y - m_offY + offsetTop); //@@@: w_aspect.setTop(y - m_offY + offsetTop);
                }  //@@@: }
                else { //@@@: else {

                    // we get rid off the offset because the primitive
                    // add it to the top but we don't allow vertical
                    // moves so Y must to remain constant
                    //
                    w_aspect.setTop(w_aspect.getTop() - paintObj.getAspect().getOffset()); //@@@: w_aspect.setTop(w_aspect.getTop() - paintObj.getAspect().getOffset());
                } //@@@: }

                // only controls move in all directions
                // 
                if (paintObj.getRptType() === csRptTypeSection.CONTROL) { //@@@: if (paintObj.getRptType() == csRptTypeSection.CONTROL) {
                    rptCtrlAspect = m_report.getControls().item(paintObj.getTag()).getLabel().getAspect(); //@@@: rptCtrlAspect = m_report.getControls().item(paintObj.getTag()).getLabel().getAspect();
                    rptCtrlAspect.setLeft(w_aspect.getLeft()); //@@@: rptCtrlAspect.setLeft(w_aspect.getLeft());
                    rptCtrlAspect.setTop(w_aspect.getTop()); //@@@: rptCtrlAspect.setTop(w_aspect.getTop());
                    rptCtrlAspect.setWidth(w_aspect.getWidth()); //@@@: rptCtrlAspect.setWidth(w_aspect.getWidth());
                    rptCtrlAspect.setHeight(w_aspect.getHeight()); //@@@: rptCtrlAspect.setHeight(w_aspect.getHeight());
                } //@@@: }

                moveControl(m_vSelectedKeys[i]); //@@@: moveControl(m_vSelectedKeys[i]);
            } //@@@: }
        }; //@@@: }

        const pMoveHorizontal = function(x) { //@@@: private void pMoveHorizontal(float x) {
            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;
            m_paint.getPaintObject(m_keyMoving).getAspect().setLeft(x - m_offX); //@@@: m_paint.getPaintObject(m_keyMoving).getAspect().setLeft(x - m_offX);
        }; //@@@: }

        const pMoveVertical = function(x, y) { //@@@: private void pMoveVertical(float x, float y) {
            let sKeySection = ""; //@@@: String sKeySection = "";
UNKNOWN >>             csRptTypeSection rptType; //@@@: csRptTypeSection rptType;

            let maxBottom = 0; //@@@: float maxBottom = 0;
            let minBottom = 0; //@@@: float minBottom = 0;

            let rptSec = null; //@@@: cReportSection rptSec = null;
            let paintObj = null; //@@@: CSReportPaint.cReportPaintObject paintObj = null;
            let isSecLn = false; //@@@: bool isSecLn = false;

            m_indexSecLnMoved = -1; //@@@: m_indexSecLnMoved = -1;

            paintObj = m_paint.getPaintObject(m_keyMoving); //@@@: paintObj = m_paint.getPaintObject(m_keyMoving);
            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();

            sKeySection = paintObj.getTag(); //@@@: sKeySection = paintObj.getTag();

            // sections can only be move verticaly
            // always is the bottom of the section which is moved
            // every time we move a section the height change
            //
            rptType = paintObj.getRptType(); //@@@: rptType = paintObj.getRptType();


            switch (rptType) { //@@@: switch (rptType) {

                    //---------------------
                    // HEADER
                    //---------------------

                case csRptTypeSection.CSRPTTPMAINSECTIONHEADER: //@@@: case csRptTypeSection.CSRPTTPMAINSECTIONHEADER:
                case csRptTypeSection.CSRPTTPSCHEADER: //@@@: case csRptTypeSection.CSRPTTPSCHEADER:

                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, false); //@@@: rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // GROUP HEADER
                    //---------------------

                    break; //@@@: break;

                case  csRptTypeSection.GROUP_SECTION_HEADER: //@@@: case  csRptTypeSection.GROUP_SECTION_HEADER:

                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, false); //@@@: rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // DETAIL
                    //---------------------

                    break; //@@@: break;

                case  csRptTypeSection.CSRPTTPMAINSECTIONDETAIL: //@@@: case  csRptTypeSection.CSRPTTPMAINSECTIONDETAIL:
                case  csRptTypeSection.CSRPTTPSCDETAIL: //@@@: case  csRptTypeSection.CSRPTTPSCDETAIL:

                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, false); //@@@: rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // GROUP FOOTER
                    //---------------------

                    break; //@@@: break;

                case  csRptTypeSection.GROUP_SECTION_FOOTER: //@@@: case  csRptTypeSection.GROUP_SECTION_FOOTER:

                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, false); //@@@: rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // FOOTER
                    //---------------------

                    break; //@@@: break;

                case  csRptTypeSection.CSRPTTPMAINSECTIONFOOTER: //@@@: case  csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:
                case  csRptTypeSection.CSRPTTPSCFOOTER: //@@@: case  csRptTypeSection.CSRPTTPSCFOOTER:

                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, false); //@@@: rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // Section Lines
                    //---------------------
                    break; //@@@: break;

                case  csRptTypeSection.C_KEY_SECLN_HEADER: //@@@: case  csRptTypeSection.C_KEY_SECLN_HEADER:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, true); //@@@: rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptTypeSection.C_KEY_SECLN_GROUPH: //@@@: case  csRptTypeSection.C_KEY_SECLN_GROUPH:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, true); //@@@: rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptTypeSection.C_KEY_SECLN_DETAIL: //@@@: case  csRptTypeSection.C_KEY_SECLN_DETAIL:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, true); //@@@: rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptTypeSection.C_KEY_SECLN_GROUPF: //@@@: case  csRptTypeSection.C_KEY_SECLN_GROUPF:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, true); //@@@: rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptTypeSection.C_KEY_SECLN_FOOTER: //@@@: case  csRptTypeSection.C_KEY_SECLN_FOOTER:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, true); //@@@: rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true; //@@@: isSecLn = true;
                    m_indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex(); //@@@: m_indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex();
                    break; //@@@: break;
            } //@@@: }

            if (isSecLn) { //@@@: if (isSecLn) {
                minBottom = pGetMinBottomForSecLn(rptSec, paintObj.getTag(), minBottom); //@@@: minBottom = pGetMinBottomForSecLn(rptSec, paintObj.getTag(), minBottom);
                pChangeSecLnHeight(paintObj,  //@@@: pChangeSecLnHeight(paintObj,
                                    y,  //@@@: y,
                                    minBottom,  //@@@: minBottom,
                                    maxBottom,  //@@@: maxBottom,
                                    rptSec.getSectionLines().item(paintObj.getTag())); //@@@: rptSec.getSectionLines().item(paintObj.getTag()));

                y = rptSec.getAspect().getTop() //@@@: y = rptSec.getAspect().getTop()
                    - paintObj.getAspect().getOffset()  //@@@: - paintObj.getAspect().getOffset()
                    + pGetSecHeigthFromSecLines(rptSec)  //@@@: + pGetSecHeigthFromSecLines(rptSec)
UNKNOWN >>                     - cGlobals.C_HEIGHT_BAR_SECTION; //@@@: - cGlobals.C_HEIGHT_BAR_SECTION;

                m_offY = 0; //@@@: m_offY = 0;
                paintObj = m_paint.getPaintSections().item(rptSec.getKeyPaint()); //@@@: paintObj = m_paint.getPaintSections().item(rptSec.getKeyPaint());
            } //@@@: }

            moveSection(paintObj, x, y, minBottom, maxBottom, rptSec, false); //@@@: moveSection(paintObj, x, y, minBottom, maxBottom, rptSec, false);
        }; //@@@: }

        const pGetSecHeigthFromSecLines = function(sec) { //@@@: private float pGetSecHeigthFromSecLines(cReportSection sec) {
            let rtn = 0; //@@@: float rtn = 0;

            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn = sec.getSectionLines().item(_i); //@@@: cReportSectionLine secLn = sec.getSectionLines().item(_i);
                rtn = rtn + secLn.getAspect().getHeight(); //@@@: rtn = rtn + secLn.getAspect().getHeight();
            } //@@@: }

            return rtn; //@@@: return rtn;
        }; //@@@: }

        const pGetMinBottomForSecLn = function( //@@@: private float pGetMinBottomForSecLn(
            sec,  //@@@: cReportSection sec,
            secLnKey,  //@@@: String secLnKey,
            minBottom) { //@@@: float minBottom)
            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn = sec.getSectionLines().item(_i); //@@@: cReportSectionLine secLn = sec.getSectionLines().item(_i);
                if (secLn.getKey() === secLnKey) { break; } //@@@: if (secLn.getKey() == secLnKey) { break; }
                minBottom = minBottom + secLn.getAspect().getHeight(); //@@@: minBottom = minBottom + secLn.getAspect().getHeight();
            } //@@@: }
            return minBottom; //@@@: return minBottom;
        }; //@@@: }

        const pChangeSecLnHeight = function( //@@@: private void pChangeSecLnHeight(
            paintObj,  //@@@: CSReportPaint.cReportPaintObject paintObj,
            y,  //@@@: float y,
            minBottom,  //@@@: float minBottom,
            maxBottom,  //@@@: float maxBottom,
            secLn) { //@@@: cReportSectionLine secLn)
            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();

            // if Y is contained between the range allowed everything is ok
            //
            if (y >= minBottom && y <= maxBottom) { //@@@: if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - m_offY); //@@@: w_aspect.setTop(y - m_offY);
            }  //@@@: }
            else { //@@@: else {
                // if it have been moved upward
                //
                if (y < minBottom) { //@@@: if (y < minBottom) {
                    w_aspect.setTop(minBottom); //@@@: w_aspect.setTop(minBottom);

                }  //@@@: }
                // if it have been moved downward
                //
                else { //@@@: else {
                    w_aspect.setTop(maxBottom); //@@@: w_aspect.setTop(maxBottom);
                } //@@@: }
            } //@@@: }

            // because the top has been setted to the real dimensions
            // of the screen now we need to move it the offset
            // of its section
            //
            w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset()); //@@@: w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset());

            m_paint.alingToGrid(paintObj.getKey()); //@@@: m_paint.alingToGrid(paintObj.getKey());

            // the section line height has been changed
            //
            secLn.getAspect().setHeight(w_aspect.getTop()  //@@@: secLn.getAspect().setHeight(w_aspect.getTop()
                                        + cGlobals.C_HEIGHT_BAR_SECTION  //@@@: + cGlobals.C_HEIGHT_BAR_SECTION
                                        - secLn.getAspect().getTop()); //@@@: - secLn.getAspect().getTop());
        }; //@@@: }

        const pSizingControl = function(x, y) { //@@@: private void pSizingControl(float x, float y) {
            let i = 0; //@@@: int i = 0;
            let height = 0; //@@@: float height = 0;
            let width = 0; //@@@: float width = 0;
            let left = 0; //@@@: float left = 0;
            let top = 0; //@@@: float top = 0;

            if (m_vSelectedKeys.Length === 0) { return; } //@@@: if (m_vSelectedKeys.Length == 0) { return; }

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;

            // first we need to modify the control which has its size changed
            //
            let w_getPaintObject = m_paint.getPaintObject(m_keySizing); //@@@: cReportPaintObject w_getPaintObject = m_paint.getPaintObject(m_keySizing);
            let w_aspect = w_getPaintObject.getAspect(); //@@@: cReportAspect w_aspect = w_getPaintObject.getAspect();

            // orginal size to know how much it has changed
            //
            height = w_aspect.getHeight(); //@@@: height = w_aspect.getHeight();
            width = w_aspect.getWidth(); //@@@: width = w_aspect.getWidth();
            left = w_aspect.getLeft(); //@@@: left = w_aspect.getLeft();
            top = w_aspect.getTop(); //@@@: top = w_aspect.getTop();

            switch (m_moveType) { //@@@: switch (m_moveType) {
                case  csRptEditorMoveType.CSRPTEDMOVDOWN: //@@@: case  csRptEditorMoveType.CSRPTEDMOVDOWN:
                    w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset())); //@@@: w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset()));
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFT: //@@@: case  csRptEditorMoveType.CSRPTEDMOVLEFT:
                    w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x); //@@@: w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x);
                    w_aspect.setLeft(x); //@@@: w_aspect.setLeft(x);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHT: //@@@: case  csRptEditorMoveType.CSRPTEDMOVRIGHT:
                    w_aspect.setWidth(x - w_aspect.getLeft()); //@@@: w_aspect.setWidth(x - w_aspect.getLeft());
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVUP: //@@@: case  csRptEditorMoveType.CSRPTEDMOVUP:
                    w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y); //@@@: w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y);
                    w_aspect.setTop(y + w_aspect.getOffset()); //@@@: w_aspect.setTop(y + w_aspect.getOffset());
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTDOWN: //@@@: case  csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                    w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset())); //@@@: w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset()));
                    w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x); //@@@: w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x);
                    w_aspect.setLeft(x); //@@@: w_aspect.setLeft(x);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTUP: //@@@: case  csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                    w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y); //@@@: w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y);
                    w_aspect.setTop(y + w_aspect.getOffset()); //@@@: w_aspect.setTop(y + w_aspect.getOffset());
                    w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x); //@@@: w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x);
                    w_aspect.setLeft(x); //@@@: w_aspect.setLeft(x);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN: //@@@: case  csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                    w_aspect.setWidth(x - w_aspect.getLeft()); //@@@: w_aspect.setWidth(x - w_aspect.getLeft());
                    w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset())); //@@@: w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset()));
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTUP: //@@@: case  csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                    w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y); //@@@: w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y);
                    w_aspect.setTop(y + w_aspect.getOffset()); //@@@: w_aspect.setTop(y + w_aspect.getOffset());
                    w_aspect.setWidth(x - w_aspect.getLeft()); //@@@: w_aspect.setWidth(x - w_aspect.getLeft());
                    break; //@@@: break;
            } //@@@: }

            top = w_aspect.getTop() - top; //@@@: top = w_aspect.getTop() - top;
            left = w_aspect.getLeft() - left; //@@@: left = w_aspect.getLeft() - left;
            width = w_aspect.getWidth() - width; //@@@: width = w_aspect.getWidth() - width;
            height = w_aspect.getHeight() - height; //@@@: height = w_aspect.getHeight() - height;

            pMoveControl(w_getPaintObject.getAspect(), true); //@@@: pMoveControl(w_getPaintObject.getAspect(), true);

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                if (m_keySizing !== m_vSelectedKeys[i]) { //@@@: if (m_keySizing != m_vSelectedKeys[i]) {

                    w_getPaintObject = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: w_getPaintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    w_aspect = w_getPaintObject.getAspect(); //@@@: w_aspect = w_getPaintObject.getAspect();

                    w_aspect.setHeight(w_aspect.getHeight() + height); //@@@: w_aspect.setHeight(w_aspect.getHeight() + height);
                    w_aspect.setTop(w_aspect.getTop() + top); //@@@: w_aspect.setTop(w_aspect.getTop() + top);
                    w_aspect.setWidth(w_aspect.getWidth() + width); //@@@: w_aspect.setWidth(w_aspect.getWidth() + width);
                    w_aspect.setLeft(w_aspect.getLeft() + left); //@@@: w_aspect.setLeft(w_aspect.getLeft() + left);

                    pMoveControl(w_getPaintObject.getAspect(), false); //@@@: pMoveControl(w_getPaintObject.getAspect(), false);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pMoveControl = function(aspect, bSizing) { //@@@: private void pMoveControl(cReportAspect aspect, bool bSizing) {
            self.int C_MIN_WIDTH = 10; //@@@: const int C_MIN_WIDTH = 10;
            self.int C_MIN_HEIGHT = 10; //@@@: const int C_MIN_HEIGHT = 10;

            let rptCtrlAspect = null; //@@@: cReportAspect rptCtrlAspect = null;

            if (m_paint.getPaintObject(m_keySizing).getRptType() === csRptTypeSection.CONTROL) { //@@@: if (m_paint.getPaintObject(m_keySizing).getRptType() == csRptTypeSection.CONTROL) {
                rptCtrlAspect = m_report.getControls().item(m_paint.getPaintObject(m_keySizing).getTag()).getLabel().getAspect(); //@@@: rptCtrlAspect = m_report.getControls().item(m_paint.getPaintObject(m_keySizing).getTag()).getLabel().getAspect();
                rptCtrlAspect.setLeft(aspect.getLeft()); //@@@: rptCtrlAspect.setLeft(aspect.getLeft());
                if (!bSizing) { //@@@: if (!bSizing) {
                    rptCtrlAspect.setTop(aspect.getTop() + aspect.getOffset()); //@@@: rptCtrlAspect.setTop(aspect.getTop() + aspect.getOffset());
                }  //@@@: }
                else { //@@@: else {
                    rptCtrlAspect.setTop(aspect.getTop()); //@@@: rptCtrlAspect.setTop(aspect.getTop());
                } //@@@: }
                rptCtrlAspect.setWidth(aspect.getWidth()); //@@@: rptCtrlAspect.setWidth(aspect.getWidth());
                rptCtrlAspect.setHeight(aspect.getHeight()); //@@@: rptCtrlAspect.setHeight(aspect.getHeight());
            } //@@@: }

            switch (m_moveType) { //@@@: switch (m_moveType) {
                case  csRptEditorMoveType.CSRPTEDMOVDOWN: //@@@: case  csRptEditorMoveType.CSRPTEDMOVDOWN:
                    m_paint.alingObjBottomToGrid(m_keySizing); //@@@: m_paint.alingObjBottomToGrid(m_keySizing);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFT: //@@@: case  csRptEditorMoveType.CSRPTEDMOVLEFT:
                    m_paint.alingObjLeftToGrid(m_keySizing); //@@@: m_paint.alingObjLeftToGrid(m_keySizing);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHT: //@@@: case  csRptEditorMoveType.CSRPTEDMOVRIGHT:
                    m_paint.alingObjRightToGrid(m_keySizing); //@@@: m_paint.alingObjRightToGrid(m_keySizing);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVUP: //@@@: case  csRptEditorMoveType.CSRPTEDMOVUP:
                    m_paint.alingObjTopToGrid(m_keySizing); //@@@: m_paint.alingObjTopToGrid(m_keySizing);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTDOWN: //@@@: case  csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                    m_paint.alingObjLeftBottomToGrid(m_keySizing); //@@@: m_paint.alingObjLeftBottomToGrid(m_keySizing);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTUP: //@@@: case  csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                    m_paint.alingObjLeftTopToGrid(m_keySizing); //@@@: m_paint.alingObjLeftTopToGrid(m_keySizing);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN: //@@@: case  csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                    m_paint.alingObjRightBottomToGrid(m_keySizing); //@@@: m_paint.alingObjRightBottomToGrid(m_keySizing);
                    break; //@@@: break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTUP: //@@@: case  csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                    m_paint.alingObjRightTopToGrid(m_keySizing); //@@@: m_paint.alingObjRightTopToGrid(m_keySizing);
                    break; //@@@: break;
            } //@@@: }

            // Validations

            // Width can't be lower than C_MIN_WIDTH
            //
            if (aspect.getWidth() < C_MIN_WIDTH) { aspect.setWidth(C_MIN_WIDTH); } //@@@: if (aspect.getWidth() < C_MIN_WIDTH) { aspect.setWidth(C_MIN_WIDTH); }

            // Height can't be lower than C_MIN_HEIGHT
            //
            if (aspect.getHeight() < C_MIN_HEIGHT) { aspect.setHeight(C_MIN_HEIGHT); } //@@@: if (aspect.getHeight() < C_MIN_HEIGHT) { aspect.setHeight(C_MIN_HEIGHT); }
        }; //@@@: }

        const pMoveHeader = function( //@@@: private cReportSection pMoveHeader(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: float minBottom,
            maxBottom,  //@@@: float maxBottom,
            isForSectionLine) { //@@@: bool isForSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getHeaders().item(sKeySection); //@@@: rptSec = m_report.getHeaders().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) { //@@@: if (index == 1) {
                minBottom = C_MIN_HEIGHT_SECTION; //@@@: minBottom = C_MIN_HEIGHT_SECTION;
            }  //@@@: }
            else { //@@@: else {
                // bottom of previous header + C_Min_Height_Section
                let w_aspect = m_report.getHeaders().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getTop() + w_aspect.getHeight() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getTop() + w_aspect.getHeight() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottom = m_picReport.Height; //@@@: maxBottom = m_picReport.Height;

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pMoveGroupHeader = function( //@@@: private cReportSection pMoveGroupHeader(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: float minBottom,
            maxBottom,  //@@@: float maxBottom,
            isForSectionLine) { //@@@: bool isForSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getGroupsHeaders().item(sKeySection); //@@@: rptSec = m_report.getGroupsHeaders().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) { //@@@: if (index == 1) {
                // bottom of previous header + C_Min_Height_Section
                let w_headers = m_report.getHeaders(); //@@@: cReportSections w_headers = m_report.getHeaders();
                let w_aspect = w_headers.item(w_headers.count()).getAspect(); //@@@: cReportAspect w_aspect = w_headers.item(w_headers.count()).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }  //@@@: }
            else { //@@@: else {
                // bottom of previous group header + C_Min_Height_Section
                let w_aspect = m_report.getGroupsHeaders().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getGroupsHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottom = m_picReport.Height; //@@@: maxBottom = m_picReport.Height;

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pMoveDetails = function( //@@@: private cReportSection pMoveDetails(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: float minBottom,
            maxBottom,  //@@@: float maxBottom,
            isForSectionLine) { //@@@: bool isForSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getDetails().item(sKeySection); //@@@: rptSec = m_report.getDetails().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------

            if (index === 1) { //@@@: if (index == 1) {
                // if there are groups
                //
                if (m_report.getGroupsHeaders().count() > 0) { //@@@: if (m_report.getGroupsHeaders().count() > 0) {
                    // top of the last group header + C_Min_Height_Section
                    let w_groupsHeaders = m_report.getGroupsHeaders(); //@@@: cIReportGroupSections w_groupsHeaders = m_report.getGroupsHeaders();
                    let w_aspect = w_groupsHeaders.item(w_groupsHeaders.count()).getAspect(); //@@@: cReportAspect w_aspect = w_groupsHeaders.item(w_groupsHeaders.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }  //@@@: }
                else { //@@@: else {
                    // top of the last header + C_Min_Height_Section
                    let w_headers = m_report.getHeaders(); //@@@: cReportSections w_headers = m_report.getHeaders();
                    let w_aspect = w_headers.item(w_headers.count()).getAspect(); //@@@: cReportAspect w_aspect = w_headers.item(w_headers.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } //@@@: }
            }  //@@@: }
            else { //@@@: else {
                // top of the previous detail + C_Min_Height_Section
                //
                let w_aspect = m_report.getDetails().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getDetails().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottom = m_picReport.Height; //@@@: maxBottom = m_picReport.Height;

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pMoveGroupFooter = function( //@@@: private cReportSection pMoveGroupFooter(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: float minBottom,
            maxBottom,  //@@@: float maxBottom,
            isForSectionLine) { //@@@: bool isForSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getGroupsFooters().item(sKeySection); //@@@: rptSec = m_report.getGroupsFooters().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) { //@@@: if (index == 1) {
                // bottom of the last detail + C_Min_Height_Section
                //
                let w_details = m_report.getDetails(); //@@@: cReportSections w_details = m_report.getDetails();
                let w_aspect = w_details.item(w_details.count()).getAspect(); //@@@: cReportAspect w_aspect = w_details.item(w_details.count()).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }  //@@@: }
            else { //@@@: else {
                // bottom of the previous group footer + C_Min_Height_Section
                //
                let w_aspect = m_report.getGroupsFooters().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getGroupsFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }
            maxBottom = m_picReport.Height; //@@@: maxBottom = m_picReport.Height;

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pMoveFooter = function( //@@@: private cReportSection pMoveFooter(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: float minBottom,
            maxBottom,  //@@@: float maxBottom,
            isForSectionLine) { //@@@: bool isForSectionLine)

            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getFooters().item(sKeySection); //@@@: rptSec = m_report.getFooters().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) { //@@@: if (index == 1) {

                // if there are groups
                //
                if (m_report.getGroupsFooters().count() > 0) { //@@@: if (m_report.getGroupsFooters().count() > 0) {

                    // the bottom of the last group footer
                    //
                    let w_groupsFooters = m_report.getGroupsFooters(); //@@@: cIReportGroupSections w_groupsFooters = m_report.getGroupsFooters();
                    let w_aspect = w_groupsFooters.item(w_groupsFooters.count()).getAspect(); //@@@: cReportAspect w_aspect = w_groupsFooters.item(w_groupsFooters.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }  //@@@: }
                else { //@@@: else {
                    // bottom of the last detail
                    //
                    let w_details = m_report.getDetails(); //@@@: cReportSections w_details = m_report.getDetails();
                    let w_aspect = w_details.item(w_details.count()).getAspect(); //@@@: cReportAspect w_aspect = w_details.item(w_details.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } //@@@: }
            }  //@@@: }
            else { //@@@: else {
                // bottom of the previous footer
                //
                let w_aspect = m_report.getFooters().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() - m_offSet + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() - m_offSet + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottom = m_picReport.Height; //@@@: maxBottom = m_picReport.Height;

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pGetMinBottomWithSecLn = function(secLns, minBottom) { //@@@: private float pGetMinBottomWithSecLn(cReportSectionLines secLns, float minBottom) {
            let i = 0; //@@@: int i = 0;

            for (i = 1; i <= secLns.count() - 1; i++) { //@@@: for (i = 1; i <= secLns.count() - 1; i++) {
                minBottom = minBottom + secLns.item(i).getAspect().getHeight(); //@@@: minBottom = minBottom + secLns.item(i).getAspect().getHeight();
            } //@@@: }

            return minBottom; //@@@: return minBottom;
        }; //@@@: }

        const pGetOffSet = function(realPageHeight, rtnPageHeight) { //@@@: private void pGetOffSet(float realPageHeight, float rtnPageHeight) {
            let sec = null; //@@@: cReportSection sec = null;

            rtnPageHeight = 0; //@@@: rtnPageHeight = 0;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i); //@@@: sec = m_report.getHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight(); //@@@: rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i); //@@@: sec = m_report.getGroupsHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight(); //@@@: rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            } //@@@: }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i); //@@@: sec = m_report.getDetails().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight(); //@@@: rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                sec = m_report.getGroupsFooters().item(_i); //@@@: sec = m_report.getGroupsFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight(); //@@@: rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            } //@@@: }

            for(var _i = 0; _i < m_report.getFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getFooters().count(); _i++) {
                sec = m_report.getFooters().item(_i); //@@@: sec = m_report.getFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight(); //@@@: rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            } //@@@: }

            m_offSet = realPageHeight - rtnPageHeight; //@@@: m_offSet = realPageHeight - rtnPageHeight;

            if (m_offSet < 0) { m_offSet = 0; } //@@@: if (m_offSet < 0) { m_offSet = 0; }
        }; //@@@: }

        const pRefreshOffSetInPaintObjs = function() { //@@@: private void pRefreshOffSetInPaintObjs() {
            let sec = null; //@@@: cReportSection sec = null;
            let secLines = null; //@@@: cReportSectionLine secLines = null;
            let ctl = null; //@@@: cReportControl ctl = null;

            let w_paintSections = m_paint.getPaintSections(); //@@@: cReportPaintObjects w_paintSections = m_paint.getPaintSections();
                for(var _i = 0; _i < m_report.getFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getFooters().count(); _i++) {
                    sec = m_report.getFooters().item(_i); //@@@: sec = m_report.getFooters().item(_i);
                    w_paintSections.item(sec.getKeyPaint()).getAspect().setOffset(m_offSet); //@@@: w_paintSections.item(sec.getKeyPaint()).getAspect().setOffset(m_offSet);
                    for(var _j = 0; _j < sec.getSectionLines().count(); _j++) { //@@@: for (int _j = 0; _j < sec.getSectionLines().count(); _j++) {
                        secLines = sec.getSectionLines().item(_j); //@@@: secLines = sec.getSectionLines().item(_j);
                        if (secLines.getKeyPaint() !== "") { //@@@: if (secLines.getKeyPaint() != "") {
                            w_paintSections.item(secLines.getKeyPaint()).getAspect().setOffset(m_offSet); //@@@: w_paintSections.item(secLines.getKeyPaint()).getAspect().setOffset(m_offSet);
                        } //@@@: }
                        for(var _k = 0; _k < secLines.getControls().count(); _k++) { //@@@: for (int _k = 0; _k < secLines.getControls().count(); _k++) {
                            ctl = secLines.getControls().item(_k); //@@@: ctl = secLines.getControls().item(_k);
UNKNOWN >>                             CSReportPaint.cReportPaintObject po; //@@@: CSReportPaint.cReportPaintObject po;
                            po = m_paint.getPaintObjects().item(ctl.getKeyPaint()); //@@@: po = m_paint.getPaintObjects().item(ctl.getKeyPaint());
                            po.getAspect().setOffset(m_offSet); //@@@: po.getAspect().setOffset(m_offSet);
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
        }; //@@@: }

        // if the click was over a control which is not part of the
        // selected controls collection we clear the selected collection
        // and add the control which was clicked to the selected collection
        //
        const pSetSelectForRightBttn = function() { //@@@: private bool pSetSelectForRightBttn() {
            let i = 0; //@@@: int i = 0;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) { //@@@: for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === m_keyObj) { return false; } //@@@: if (m_vSelectedKeys[i] == m_keyObj) { return false; }
            } //@@@: }

            G.redim(m_vSelectedKeys, 1); //@@@: G.redim(ref m_vSelectedKeys, 1);
            m_vSelectedKeys[1] = m_keyObj; //@@@: m_vSelectedKeys[1] = m_keyObj;

            return true; //@@@: return true;
        }; //@@@: }

        const pValidateSectionAspect = function() { //@@@: private void pValidateSectionAspect() {
            let sec = null; //@@@: cReportSection sec = null;
            let top = 0; //@@@: float top = 0;
            let i = 0; //@@@: int i = 0;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i); //@@@: sec = m_report.getHeaders().item(_i);
                top = pValidateSectionAspecAux(top, sec); //@@@: top = pValidateSectionAspecAux(top, sec);
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i); //@@@: sec = m_report.getGroupsHeaders().item(_i);
                top = pValidateSectionAspecAux(top, sec); //@@@: top = pValidateSectionAspecAux(top, sec);
            } //@@@: }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i); //@@@: sec = m_report.getDetails().item(_i);
                top = pValidateSectionAspecAux(top, sec); //@@@: top = pValidateSectionAspecAux(top, sec);
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                sec = m_report.getGroupsFooters().item(_i); //@@@: sec = m_report.getGroupsFooters().item(_i);
                top = pValidateSectionAspecAux(top, sec); //@@@: top = pValidateSectionAspecAux(top, sec);
            } //@@@: }

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            top = CSReportPaint.cGlobals.getRectFromPaperSize(m_report.getPaperInfo(), //@@@: top = CSReportPaint.cGlobals.getRectFromPaperSize(m_report.getPaperInfo(),
                                                    w_paperInfo.getPaperSize(),  //@@@: w_paperInfo.getPaperSize(),
                                                    w_paperInfo.getOrientation()).Height; //@@@: w_paperInfo.getOrientation()).Height;

            for (i = m_report.getFooters().count(); i <= 1; i--) { //@@@: for (i = m_report.getFooters().count(); i <= 1; i--) {
                sec = m_report.getFooters().item(i); //@@@: sec = m_report.getFooters().item(i);
                top = top - sec.getAspect().getHeight(); //@@@: top = top - sec.getAspect().getHeight();
                pValidateSectionAspecAux(top, sec); //@@@: pValidateSectionAspecAux(top, sec);
            } //@@@: }
        }; //@@@: }

        const pValidateSectionAspecAux = function(top, sec) { //@@@: private float pValidateSectionAspecAux(float top, cReportSection sec) {
            let secLn = null; //@@@: cReportSectionLine secLn = null;
            let topLn = 0; //@@@: float topLn = 0;
            let i = 0; //@@@: int i = 0;
            let secLnHeight = 0; //@@@: float secLnHeight = 0;
            let width = 0; //@@@: float width = 0;

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            width = CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                    m_report.getPaperInfo(),  //@@@: m_report.getPaperInfo(),
                                                    w_paperInfo.getPaperSize(),  //@@@: w_paperInfo.getPaperSize(),
                                                    w_paperInfo.getOrientation()).Width; //@@@: w_paperInfo.getOrientation()).Width;
            topLn = top; //@@@: topLn = top;

UNKNOWN >>             cReportAspect w_aspect; //@@@: cReportAspect w_aspect;

            for (i = 1; i <= sec.getSectionLines().count() - 1; i++) { //@@@: for (i = 1; i <= sec.getSectionLines().count() - 1; i++) {
                secLn = sec.getSectionLines().item(i); //@@@: secLn = sec.getSectionLines().item(i);
                w_aspect = secLn.getAspect(); //@@@: w_aspect = secLn.getAspect();
                w_aspect.setTop(topLn); //@@@: w_aspect.setTop(topLn);
                w_aspect.setWidth(width); //@@@: w_aspect.setWidth(width);
                if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) { //@@@: if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) {
                    w_aspect.setHeight(C_MIN_HEIGHT_SECTION); //@@@: w_aspect.setHeight(C_MIN_HEIGHT_SECTION);
                } //@@@: }
                topLn = topLn + w_aspect.getHeight(); //@@@: topLn = topLn + w_aspect.getHeight();
                secLnHeight = secLnHeight + w_aspect.getHeight(); //@@@: secLnHeight = secLnHeight + w_aspect.getHeight();
            } //@@@: }

            let w_sectionLines = sec.getSectionLines(); //@@@: cReportSectionLines w_sectionLines = sec.getSectionLines();
            secLn = w_sectionLines.item(w_sectionLines.count()); //@@@: secLn = w_sectionLines.item(w_sectionLines.count());

            w_aspect = secLn.getAspect(); //@@@: w_aspect = secLn.getAspect();
            w_aspect.setTop(topLn); //@@@: w_aspect.setTop(topLn);
            w_aspect.setHeight(sec.getAspect().getHeight() - secLnHeight); //@@@: w_aspect.setHeight(sec.getAspect().getHeight() - secLnHeight);
            if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) { //@@@: if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) {
                w_aspect.setHeight(C_MIN_HEIGHT_SECTION); //@@@: w_aspect.setHeight(C_MIN_HEIGHT_SECTION);
            } //@@@: }
            secLnHeight = secLnHeight + w_aspect.getHeight(); //@@@: secLnHeight = secLnHeight + w_aspect.getHeight();

            w_aspect = sec.getAspect(); //@@@: w_aspect = sec.getAspect();
            w_aspect.setHeight(secLnHeight); //@@@: w_aspect.setHeight(secLnHeight);
            if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) { //@@@: if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) {
                w_aspect.setHeight(C_MIN_HEIGHT_SECTION); //@@@: w_aspect.setHeight(C_MIN_HEIGHT_SECTION);
            } //@@@: }
            w_aspect.setWidth(width); //@@@: w_aspect.setWidth(width);
            w_aspect.setTop(top); //@@@: w_aspect.setTop(top);
            topLn = top; //@@@: topLn = top;
            top = top + w_aspect.getHeight(); //@@@: top = top + w_aspect.getHeight();

            pChangeTopSection(sec, 0, false, false); //@@@: pChangeTopSection(sec, 0, false, false);
            return top; //@@@: return top;
        }; //@@@: }

        self.showControls = function() { //@@@: public void showControls() {
            try { //@@@: try {

                Application.DoEvents(); //@@@: Application.DoEvents();

                m_fControls = cGlobals.getCtrlBox(this); //@@@: m_fControls = cGlobals.getCtrlBox(this);
                cGlobals.clearCtrlBox(this); //@@@: cGlobals.clearCtrlBox(this);
                m_fControls.addCtrls(m_report); //@@@: m_fControls.addCtrls(m_report);
                m_fControls.Show(m_fmain); //@@@: m_fControls.Show(m_fmain);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "showControls", C_MODULE, ""); //@@@: cError.mngError(ex, "showControls", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.showControlsTree = function() { //@@@: public void showControlsTree() {
            try { //@@@: try {

                Application.DoEvents(); //@@@: Application.DoEvents();

                m_fTreeCtrls = cGlobals.getCtrlTreeBox(this); //@@@: m_fTreeCtrls = cGlobals.getCtrlTreeBox(this);
                cGlobals.clearCtrlTreeBox(this); //@@@: cGlobals.clearCtrlTreeBox(this);

                let ctrl = null; //@@@: cReportControl ctrl = null;
                m_fTreeCtrls.addCtrls(m_report); //@@@: m_fTreeCtrls.addCtrls(m_report);
                m_fTreeCtrls.Show(); //@@@: m_fTreeCtrls.Show();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "ShowControlsTree", C_MODULE, ""); //@@@: cError.mngError(ex, "ShowControlsTree", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const pSetInitDir = function() { //@@@: private void pSetInitDir() {
            if (cMainEditor.gbFirstOpen) { //@@@: if (cMainEditor.gbFirstOpen) {
                cMainEditor.gbFirstOpen = false; //@@@: cMainEditor.gbFirstOpen = false;
                // TODO: implement me
                // m_fmain.cmDialog.InitDir = cGlobals.gWorkFolder;
            } //@@@: }
        }; //@@@: }

        const form_Load = function() { //@@@: private void form_Load() {
            G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            G.redim(m_vCopyKeys, 0); //@@@: G.redim(ref m_vCopyKeys, 0);
            m_copyControls = false; //@@@: m_copyControls = false;
            m_copyControlsFromOtherReport = false; //@@@: m_copyControlsFromOtherReport = false;
            m_typeGrid = csETypeGrid.CSEGRIDPOINTS; //@@@: m_typeGrid = csETypeGrid.CSEGRIDPOINTS;
            m_keyboardMoveStep = 50; //@@@: m_keyboardMoveStep = 50;
        }; //@@@: }

        /* TODO: implement me //@@@: /* TODO: implement me
        private void form_QueryUnload(int cancel, int unloadMode) {
            cancel = !saveChanges();
            if (cancel) { cGlobals.setDocActive(this); }
        }
         */

        /* TODO: implement me //@@@: /* TODO: implement me
        private void form_Unload(int cancel) {
            if (m_fmain.getReportCopySource() === this) {
                m_fmain.setReportCopySource(null);
            }
            if (fSearch.fSearch.getFReport() === this) {
                fSearch.fSearch.setFReport(null);
            }
            m_report = null;
            m_paint = null;
            m_fToolBox = null;
            m_fControls = null;
            m_fTreeCtrls = null;
            m_fConnectsAux = null;
            m_fProperties = null;
            m_fFormula = null;
            m_fGroup = null;
            m_fProgress.Hide();
            m_fProgress = null;
            cGlobals.setDocInacActive(this);
            G.redim(m_vSelectedKeys, 0);
            G.redim(m_vCopyKeys, 0);
        }
         */

        self.init = function() { //@@@: public void init() {
            m_showingProperties = false; //@@@: m_showingProperties = false;

            let oLaunchInfo = null; //@@@: cReportLaunchInfo oLaunchInfo = null;
            m_report = new cReport(); //@@@: m_report = new cReport();
            // TODO: event handler for
            //
            /* //@@@: /*
                        m_report_Done();
                        m_report_Progress(task, page, currRecord, recordCount, cancel,);
                        m_report_FindFileAccess(answer, commDialog, file,);
            */
            oLaunchInfo = new cReportLaunchInfo(); //@@@: oLaunchInfo = new cReportLaunchInfo();

            m_report.getPaperInfo().setPaperSize(m_fmain.getPaperSize()); //@@@: m_report.getPaperInfo().setPaperSize(m_fmain.getPaperSize());
            m_report.getPaperInfo().setOrientation(m_fmain.getOrientation()); //@@@: m_report.getPaperInfo().setOrientation(m_fmain.getOrientation());

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter()); //@@@: oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter());
            oLaunchInfo.setObjPaint(new CSReportPaint.cReportPrint()); //@@@: oLaunchInfo.setObjPaint(new CSReportPaint.cReportPrint());
            if (!m_report.init(oLaunchInfo)) { return; } //@@@: if (!m_report.init(oLaunchInfo)) { return; }

            let file = new CSKernelFile.cFile(); //@@@: CSKernelFile.cFile file = new CSKernelFile.cFile();
            m_report.setPathDefault(Application.StartupPath); //@@@: m_report.setPathDefault(Application.StartupPath);

            m_picReport.Top = C_TOPBODY; //@@@: m_picReport.Top = C_TOPBODY;
            m_picRule.Left = 0; //@@@: m_picRule.Left = 0;
            m_picReport.Left = pGetLeftBody(); //@@@: m_picReport.Left = pGetLeftBody();

            m_keyMoving = ""; //@@@: m_keyMoving = "";
            m_keySizing = ""; //@@@: m_keySizing = "";
            m_keyObj = ""; //@@@: m_keyObj = "";
            m_keyFocus = ""; //@@@: m_keyFocus = "";
            m_nextNameCtrl = 0; //@@@: m_nextNameCtrl = 0;

            m_paint = new CSReportPaint.cReportPaint(); //@@@: m_paint = new CSReportPaint.cReportPaint();

            let tR = null; //@@@: Rectangle tR = null;
            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            tR = new Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: tR = new Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                m_report.getPaperInfo(),  //@@@: m_report.getPaperInfo(),
                                                w_paperInfo.getPaperSize(),  //@@@: w_paperInfo.getPaperSize(),
                                                w_paperInfo.getOrientation())); //@@@: w_paperInfo.getOrientation()));
            cGlobals.createStandarSections(m_report, tR); //@@@: cGlobals.createStandarSections(m_report, tR);
            m_paint.setGridHeight(pSetSizePics(tR.height)); //@@@: m_paint.setGridHeight(pSetSizePics(tR.height));
            m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid); //@@@: m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

            paintStandarSections(); //@@@: paintStandarSections();

            m_dataHasChanged = false; //@@@: m_dataHasChanged = false;
        }; //@@@: }

        const pUpdateFormulas = function(currentName, newName) { //@@@: private void pUpdateFormulas(String currentName, String newName) {
            let i = 0; //@@@: int i = 0;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

            for (i = 1; i <= m_report.getControls().count(); i++) { //@@@: for (i = 1; i <= m_report.getControls().count(); i++) {

                rptCtrl = m_report.getControls().item(i); //@@@: rptCtrl = m_report.getControls().item(i);

                let w_formulaHide = rptCtrl.getFormulaHide(); //@@@: cReportFormula w_formulaHide = rptCtrl.getFormulaHide();
                if (w_formulaHide.getText() !== "") { //@@@: if (w_formulaHide.getText() != "") {
                    if (w_formulaHide.getText().IndexOf(currentName, 1) !== 0) { //@@@: if (w_formulaHide.getText().IndexOf(currentName, 1) != 0) {
                        w_formulaHide.setText(pReplaceInFormula(w_formulaHide.getText(), currentName, newName)); //@@@: w_formulaHide.setText(pReplaceInFormula(w_formulaHide.getText(), currentName, newName));
                    } //@@@: }
                } //@@@: }

                let w_formulaValue = rptCtrl.getFormulaValue(); //@@@: cReportFormula w_formulaValue = rptCtrl.getFormulaValue();
                if (w_formulaValue.getText() !== "") { //@@@: if (w_formulaValue.getText() != "") {
                    if (w_formulaValue.getText().IndexOf(currentName, 1) !== 0) { //@@@: if (w_formulaValue.getText().IndexOf(currentName, 1) != 0) {
                        w_formulaValue.setText(pReplaceInFormula(w_formulaValue.getText(), currentName, newName)); //@@@: w_formulaValue.setText(pReplaceInFormula(w_formulaValue.getText(), currentName, newName));
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pReplaceInFormula = function(formulaText, currentName, newName) { //@@@: private String pReplaceInFormula(String formulaText, String currentName, String newName) {
            let _rtn = ""; //@@@: String _rtn = "";

            // if it isn't an internal function we give the user
            // a chance to cancel the changes
            //
            if (formulaText.Substring(0, 1).Trim() !== "_") { //@@@: if (formulaText.Substring(0, 1).Trim() != "_") {
                let fReplace = null; //@@@: fFormulaReplace fReplace = null;
                fReplace = new fFormulaReplace(); //@@@: fReplace = new fFormulaReplace();
                fReplace.txCurrFormula.Text = formulaText; //@@@: fReplace.txCurrFormula.Text = formulaText;
                fReplace.txNewFormula.Text = formulaText.Replace(currentName, newName); //@@@: fReplace.txNewFormula.Text = formulaText.Replace(currentName, newName);
                fReplace.ShowDialog(); //@@@: fReplace.ShowDialog();
                if (fReplace.getOk()) { //@@@: if (fReplace.getOk()) {
                    _rtn = fReplace.txNewFormula.Text; //@@@: _rtn = fReplace.txNewFormula.Text;
                }  //@@@: }
                else { //@@@: else {
                    _rtn = formulaText; //@@@: _rtn = formulaText;
                } //@@@: }
                fReplace.Hide(); //@@@: fReplace.Hide();
            }  //@@@: }
            else { //@@@: else {

                _rtn = formulaText.Replace(currentName, newName); //@@@: _rtn = formulaText.Replace(currentName, newName);
            } //@@@: }
            return _rtn; //@@@: return _rtn;
        }; //@@@: }

        const form_Activate = function() { //@@@: private void form_Activate() {
            cGlobals.setDocActive(this); //@@@: cGlobals.setDocActive(this);
            if (fToolbox.getLoaded()) { //@@@: if (fToolbox.getLoaded()) {
                if (cGlobals.getToolBox(this) !== null) { showToolBox(); } //@@@: if (cGlobals.getToolBox(this) != null) { showToolBox(); }
            } //@@@: }
            if (fControls.getLoaded()) { //@@@: if (fControls.getLoaded()) {
                if (cGlobals.getCtrlBox(this) !== null) { showControls(); } //@@@: if (cGlobals.getCtrlBox(this) != null) { showControls(); }
            } //@@@: }
        }; //@@@: }

        const form_Deactivate = function() { //@@@: private void form_Deactivate() {
            cGlobals.setDocInacActive(this); //@@@: cGlobals.setDocInacActive(this);
            cGlobals.clearToolBox(this); //@@@: cGlobals.clearToolBox(this);
        }; //@@@: }
        return self;

    } //@@@: }

UNKNOWN >>     enum csAskEditResult { //@@@: enum csAskEditResult {
        CSASKRSLTYES = 1, //@@@: CSASKRSLTYES = 1,
        CSASKRSLTNO = 2, //@@@: CSASKRSLTNO = 2,
        CSASKRSLTCANCEL = 3 //@@@: CSASKRSLTCANCEL = 3
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
