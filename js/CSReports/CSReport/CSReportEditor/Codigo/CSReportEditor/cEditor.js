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
        let m_name = ""; //@@@: private String m_name = "";

        let m_isNew = false; //@@@: private bool m_isNew = false;

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

            m_picReport.Paint += new PaintEventHandler(m_picReport_Paint); //@@@: m_picReport.Paint += new PaintEventHandler(m_picReport_Paint);
            m_picRule.Paint += new PaintEventHandler(m_picRule_Paint); //@@@: m_picRule.Paint += new PaintEventHandler(m_picRule_Paint);

            // mouse events
            //
            m_picReport.MouseDown += new MouseEventHandler(m_picReport_MouseDown); //@@@: m_picReport.MouseDown += new MouseEventHandler(m_picReport_MouseDown);
            m_picReport.MouseUp += new MouseEventHandler(m_picReport_MouseUp); //@@@: m_picReport.MouseUp += new MouseEventHandler(m_picReport_MouseUp);
            m_picReport.MouseMove += new MouseEventHandler(m_picReport_MouseMove); //@@@: m_picReport.MouseMove += new MouseEventHandler(m_picReport_MouseMove);

            // tab
            //
            m_editorTab = editorTab; //@@@: m_editorTab = editorTab;

            m_editorTab.Enter += (s, e) => { cMainEditor.setDocActive(this); }; //@@@: m_editorTab.Enter += (s, e) => { cMainEditor.setDocActive(this); };

            m_editorTab.Tag = this; //@@@: m_editorTab.Tag = this;
        }; //@@@: }

        const cEditor = function() { //@@@: private cEditor() {}

        self.close = function() { //@@@: public bool close()
            if (!saveChanges()) { //@@@: if (!saveChanges())
                return false; //@@@: return false;
            } //@@@: }
            else { //@@@: else {

                // TODO: dispose all objects
                return true; //@@@: return true;
            } //@@@: }
        }; //@@@: }

        const C_MODULE = "cEditor"; //@@@: private const String C_MODULE = "cEditor";
        const C_TOPBODY = 10; //@@@: private const int C_TOPBODY = 10;
        const C_LEFTBODY = 0; //@@@: private const int C_LEFTBODY = 0;
        const C_MIN_HEIGHT_SECTION = 3; //@@@: private const int C_MIN_HEIGHT_SECTION = 3;
        const C_SECTIONLINE = "Line "; //@@@: private const String C_SECTIONLINE = "Line ";

        const C_NOMOVE = -1111111; //@@@: private const int C_NOMOVE = -1111111;

        let m_report = null; //@@@: private cReport m_report;
        let m_paint = null; //@@@: private cReportPaint m_paint;
        let m_keyMoving = ""; //@@@: private String m_keyMoving = "";
        let m_moveType = null; //@@@: private csRptEditorMoveType m_moveType;
        let m_keySizing = ""; //@@@: private String m_keySizing = "";
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
        // good explanation is found in addSectionLine
        //
        let m_newSecLineOffSet = 0; //@@@: private float m_newSecLineOffSet = 0;

        let m_bMoveVertical = false; //@@@: private bool m_bMoveVertical = false;
        let m_bMoveHorizontal = false; //@@@: private bool m_bMoveHorizontal = false;
        let m_bNoMove = false; //@@@: private bool m_bNoMove = false;

        let m_vSelectedKeys = new String[0]; //@@@: private String[] m_vSelectedKeys = new String[0];
        let m_vCopyKeys = new String[0]; //@@@: private String[] m_vCopyKeys = new String[0];

        let m_fProgress = null; //@@@: private fProgress m_fProgress;
        let m_cancelPrinting = false; //@@@: private bool m_cancelPrinting = false;

        let m_formIndex = 0; //@@@: private int m_formIndex = 0;

        let m_fProperties = null; //@@@: private fProperties m_fProperties;
        let m_fSecProperties = null; //@@@: private fSecProperties m_fSecProperties;
        let m_fFormula = null; //@@@: private fFormula m_fFormula;
        let m_fGroup = null; //@@@: private fGroup m_fGroup;
        let m_fConnectsAux = null; //@@@: private fConnectsAux m_fConnectsAux;

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

        let m_x = 0; //@@@: private int m_x = 0;
        let m_y = 0; //@@@: private int m_y = 0;
        let m_keyboardMove = false; //@@@: private bool m_keyboardMove = false;

        let m_keyboardMoveStep = 5; //@@@: private int m_keyboardMoveStep = 5;

        let m_inMouseDown = false; //@@@: private bool m_inMouseDown = false;

        let m_typeGrid = csETypeGrid.CSEGRIDPOINTS; //@@@: private csETypeGrid m_typeGrid = csETypeGrid.CSEGRIDPOINTS;

        self.getEditorTab = function() { //@@@: public TabPage getEditorTab() {
            return m_editorTab; //@@@: return m_editorTab;
        }; //@@@: }

        self.getVCopyKeys = function(idx) { //@@@: public String getVCopyKeys(int idx) {
            return m_vCopyKeys[idx]; //@@@: return m_vCopyKeys[idx];
        }; //@@@: }

        self.getVCopyKeysCount = function() { //@@@: public int getVCopyKeysCount() {
            return m_vCopyKeys.Length; //@@@: return m_vCopyKeys.Length;
        }; //@@@: }

        self.getPaint = function() { //@@@: public cReportPaint getPaint() {
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
            try { //@@@: try
                let f = cMainEditor.getSearch(this); //@@@: fSearch f = cMainEditor.getSearch(this);
                f.clear(); //@@@: f.clear();
                if (!f.Visible) { //@@@: if (!f.Visible)
                    f.Show(m_fmain); //@@@: f.Show(m_fmain);
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "showControls", C_MODULE, ""); //@@@: cError.mngError(ex, "showControls", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.moveVertical = function() { //@@@: public void moveVertical() {
            formKeyUp(Keys.F11, false); //@@@: formKeyUp(Keys.F11, false);
        }; //@@@: }

        self.moveHorizontal = function() { //@@@: public void moveHorizontal() {
            formKeyUp(Keys.F12, false); //@@@: formKeyUp(Keys.F12, false);
        }; //@@@: }

        self.moveNoMove = function() { //@@@: public void moveNoMove() {
            formKeyUp(Keys.F9, false); //@@@: formKeyUp(Keys.F9, false);
        }; //@@@: }

        self.moveAll = function() { //@@@: public void moveAll() {
            formKeyUp(Keys.F8, false); //@@@: formKeyUp(Keys.F8, false);
        }; //@@@: }

        self.showGrid = function(typeGrid) { //@@@: public void showGrid(csETypeGrid typeGrid) {
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
                } //@@@: }
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

        self.keyUp = function(sender, e) { //@@@: public void keyUp(object sender, KeyEventArgs e) {
            e.Handled = formKeyUp(e.KeyCode, e.Control); //@@@: e.Handled = formKeyUp(e.KeyCode, e.Control);

            if (m_keyboardMove) { //@@@: if (m_keyboardMove)
                m_keyboardMove = false; //@@@: m_keyboardMove = false;
                m_picReport_MouseUp(this, new MouseEventArgs(MouseButtons.Left, 0, m_x, m_y, 0)); //@@@: m_picReport_MouseUp(this, new MouseEventArgs(MouseButtons.Left, 0, m_x, m_y, 0));
                e.Handled = true; //@@@: e.Handled = true;
            } //@@@: }
        }; //@@@: }

        const formKeyUp = function(keyCode, ctrlKey) { //@@@: private bool formKeyUp(Keys keyCode, bool ctrlKey) {
            // if we are in edit mode we do nothing
            //
            // if (TxEdit.Visible) { return; }

            switch (keyCode) { //@@@: switch (keyCode) {

                case Keys.F2: //@@@: case Keys.F2:
                    editText(); //@@@: editText();
                    break; //@@@: break;

                case Keys.Delete: //@@@: case Keys.Delete:
                    deleteObj(false); //@@@: deleteObj(false);
                    break; //@@@: break;

                case Keys.Escape: //@@@: case Keys.Escape:
                    endDraging(); //@@@: endDraging();
                    break; //@@@: break;

                case Keys.F11: //@@@: case Keys.F11:
                    m_bMoveVertical = true; //@@@: m_bMoveVertical = true;
                    m_bMoveHorizontal = false; //@@@: m_bMoveHorizontal = false;
                    cGlobals.setStatus(); //@@@: cGlobals.setStatus();
                    break; //@@@: break;

                case Keys.F12: //@@@: case Keys.F12:
                    m_bMoveHorizontal = true; //@@@: m_bMoveHorizontal = true;
                    m_bMoveVertical = false; //@@@: m_bMoveVertical = false;
                    cGlobals.setStatus(); //@@@: cGlobals.setStatus();
                    break; //@@@: break;

                case Keys.F8: //@@@: case Keys.F8:
                    m_bMoveHorizontal = false; //@@@: m_bMoveHorizontal = false;
                    m_bMoveVertical = false; //@@@: m_bMoveVertical = false;
                    cGlobals.setStatus(); //@@@: cGlobals.setStatus();
                    break; //@@@: break;

                case Keys.F9: //@@@: case Keys.F9:
                    m_bNoMove = !m_bNoMove; //@@@: m_bNoMove = !m_bNoMove;
                    cGlobals.setStatus(); //@@@: cGlobals.setStatus();
                    break; //@@@: break;

                case Keys.F4: //@@@: case Keys.F4:
                    showProperties(); //@@@: showProperties();
                    break; //@@@: break;

                case Keys.C: //@@@: case Keys.C:
                    if (ctrlKey) { //@@@: if (ctrlKey) {
                        copy(); //@@@: copy();
                    } //@@@: }
                    break; //@@@: break;

                case Keys.V: //@@@: case Keys.V:
                    if (ctrlKey) { //@@@: if (ctrlKey) {
                        paste(false); //@@@: paste(false);
                    } //@@@: }
                    break; //@@@: break;

                default: //@@@: default:
                    return false; //@@@: return false;
            } //@@@: }
            return true; //@@@: return true;
        }; //@@@: }

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
                cError.mngError(ex, "m_fConnectsAux_AddConnect", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fConnectsAux_AddConnect", C_MODULE, "");
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

        const m_fSearch_EditCtrl = function(ctrlKey) { //@@@: private void m_fSearch_EditCtrl(String ctrlKey) {
            try { //@@@: try {

                selectCtrl(ctrlKey); //@@@: selectCtrl(ctrlKey);
                showProperties(); //@@@: showProperties();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_EditCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fSearch_EditCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const m_fSearch_SetFocusSec = function(secKey) { //@@@: private void m_fSearch_SetFocusSec(String secKey) {
            try { //@@@: try {

                pSelectSection(secKey); //@@@: pSelectSection(secKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_SetFocusSec", C_MODULE, ""); //@@@: cError.mngError(ex, "m_fSearch_SetFocusSec", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const editCtrl = function(ctrlKey) { //@@@: private void editCtrl(String ctrlKey) {
            try { //@@@: try {

                selectCtrl(ctrlKey); //@@@: selectCtrl(ctrlKey);
                showProperties(); //@@@: showProperties();
            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "editCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "editCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.editSection = function(secKey) { //@@@: public void editSection(String secKey) {
            try { //@@@: try {

                let bIsSecLn = false; //@@@: bool bIsSecLn = false;

                pSelectSection(secKey, bIsSecLn); //@@@: pSelectSection(secKey, out bIsSecLn);

                if (bIsSecLn) { //@@@: if (bIsSecLn) {
                    showSecLnProperties(); //@@@: showSecLnProperties();
                } //@@@: }
                else { //@@@: else {
                    showProperties(); //@@@: showProperties();
                } //@@@: }
            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "editCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "editCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.setFocusCtrl = function(ctrlKey) { //@@@: public void setFocusCtrl(String ctrlKey) {
            try { //@@@: try {

                selectCtrl(ctrlKey); //@@@: selectCtrl(ctrlKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "setFocusCtrl", C_MODULE, ""); //@@@: cError.mngError(ex, "setFocusCtrl", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.getSectionOrSectionLineFromKey = function(key) { //@@@: public object getSectionOrSectionLineFromKey(string key)
            let sec = getSectionOrSectionLineFromKey(key, m_report.getHeaders()); //@@@: object sec = getSectionOrSectionLineFromKey(key, m_report.getHeaders());
            if (sec === null) { //@@@: if (sec == null)
                sec = getSectionOrSectionLineFromKey(key, m_report.getGroupsHeaders()); //@@@: sec = getSectionOrSectionLineFromKey(key, m_report.getGroupsHeaders());
                if (sec === null) { //@@@: if (sec == null)
                    sec = getSectionOrSectionLineFromKey(key, m_report.getDetails()); //@@@: sec = getSectionOrSectionLineFromKey(key, m_report.getDetails());
                    if (sec === null) { //@@@: if (sec == null)
                        sec = getSectionOrSectionLineFromKey(key, m_report.getGroupsFooters()); //@@@: sec = getSectionOrSectionLineFromKey(key, m_report.getGroupsFooters());
                        if (sec === null) { //@@@: if (sec == null)
                            sec = getSectionOrSectionLineFromKey(key, m_report.getFooters()); //@@@: sec = getSectionOrSectionLineFromKey(key, m_report.getFooters());
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return sec; //@@@: return sec;
        }; //@@@: }

        const getSectionOrSectionLineFromKey = function(key, sections) { //@@@: private object getSectionOrSectionLineFromKey(string key, cIReportGroupSections sections)
            for(var i = 0; i < sections.count(); i++) { //@@@: for (int i = 0; i < sections.count(); i++)
                let sec = sections.item(i); //@@@: var sec = sections.item(i);
                if (sec.getKey() === key) { //@@@: if (sec.getKey() == key)
                    return sec; //@@@: return sec;
                } //@@@: }
                else { //@@@: else {
                    let secLn = sec.getSectionLines().item(key); //@@@: var secLn = sec.getSectionLines().item(key);
                    if (secLn !== null) { //@@@: if (secLn != null)
                        return secLn; //@@@: return secLn;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        self.selectSection = function(secKey) { //@@@: public void selectSection(String secKey)
            try { //@@@: try {

                pSelectSection(secKey); //@@@: pSelectSection(secKey);

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "setelectSection", C_MODULE, ""); //@@@: cError.mngError(ex, "setelectSection", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.selectCtrl = function(ctrlKey) { //@@@: public void selectCtrl(String ctrlKey) {
            let bWasRemoved = false; //@@@: bool bWasRemoved = false;
            let sKey = ""; //@@@: String sKey = "";

            G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            sKey = getReport().getControls().item(ctrlKey).getKeyPaint(); //@@@: sKey = getReport().getControls().item(ctrlKey).getKeyPaint();
            pAddToSelected(sKey, false, bWasRemoved); //@@@: pAddToSelected(sKey, false, out bWasRemoved);

            if (bWasRemoved) { sKey = ""; } //@@@: if (bWasRemoved) { sKey = ""; }

            m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
            m_keyObj = sKey; //@@@: m_keyObj = sKey;
            m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), true); //@@@: m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), true);
            cMainEditor.showProperties(ctrlKey); //@@@: cMainEditor.showProperties(ctrlKey);
        }; //@@@: }

        const pSelectSection = function(secKey) { //@@@: private void pSelectSection(String secKey)
            let bIsSecLn = false; //@@@: bool bIsSecLn = false;
            pSelectSection(secKey, bIsSecLn); //@@@: pSelectSection(secKey, out bIsSecLn);
        }; //@@@: }

        const pSelectSection = function(secKey, bIsSecLn) { //@@@: private void pSelectSection(String secKey, out bool bIsSecLn) {
            let bWasRemoved = false; //@@@: bool bWasRemoved = false;
            let sKey = ""; //@@@: String sKey = "";

            bIsSecLn = false; //@@@: bIsSecLn = false;

            G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);

            if (m_report.getHeaders().item(secKey) !== null) { //@@@: if (m_report.getHeaders().item(secKey) != null) {
                sKey = m_report.getHeaders().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getHeaders().item(secKey).getKeyPaint();
            } //@@@: }
            else if (m_report.getGroupsHeaders().item(secKey) !== null) { //@@@: else if (m_report.getGroupsHeaders().item(secKey) != null) {
                sKey = m_report.getGroupsHeaders().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getGroupsHeaders().item(secKey).getKeyPaint();
            } //@@@: }
            else if (m_report.getDetails().item(secKey) !== null) { //@@@: else if (m_report.getDetails().item(secKey) != null) {
                sKey = m_report.getDetails().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getDetails().item(secKey).getKeyPaint();
            } //@@@: }
            else if (m_report.getGroupsFooters().item(secKey) !== null) { //@@@: else if (m_report.getGroupsFooters().item(secKey) != null) {
                sKey = m_report.getGroupsFooters().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getGroupsFooters().item(secKey).getKeyPaint();
            } //@@@: }
            else if (m_report.getFooters().item(secKey) !== null) { //@@@: else if (m_report.getFooters().item(secKey) != null) {
                sKey = m_report.getFooters().item(secKey).getKeyPaint(); //@@@: sKey = m_report.getFooters().item(secKey).getKeyPaint();
            } //@@@: }
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
                } //@@@: }
                else { //@@@: else {
                    secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), out sec);
                    if (secLn !== null) { //@@@: if (secLn != null) {
                        sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                        if (sKey === "") { //@@@: if (sKey == "") {
                            sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                        } //@@@: }
                    } //@@@: }
                    else { //@@@: else {
                        secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), out sec);
                        if (secLn !== null) { //@@@: if (secLn != null) {
                            sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                            if (sKey === "") { //@@@: if (sKey == "") {
                                sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                            } //@@@: }
                        } //@@@: }
                        else { //@@@: else {
                            secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), out sec);
                            if (secLn !== null) { //@@@: if (secLn != null) {
                                sKey = secLn.getKeyPaint(); //@@@: sKey = secLn.getKeyPaint();
                                if (sKey === "") { //@@@: if (sKey == "") {
                                    sKey = sec.getKeyPaint(); //@@@: sKey = sec.getKeyPaint();
                                } //@@@: }
                            } //@@@: }
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
            m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), true); //@@@: m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), true);
            cMainEditor.showProperties("S" + secKey); //@@@: cMainEditor.showProperties("S" + secKey);
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

        self.checkSyntax = function(code) { //@@@: public bool checkSyntax(String code) {
            let f = null; //@@@: cReportFormula f = null;

            f = new cReportFormula(); //@@@: f = new cReportFormula();

            if (m_fProperties !== null) { //@@@: if (m_fProperties != null)
                f.setName(m_fProperties.getFormulaName()); //@@@: f.setName(m_fProperties.getFormulaName());
            } //@@@: }
            else if (m_fSecProperties !== null) { //@@@: else if (m_fSecProperties != null)
                f.setName(m_fSecProperties.getFormulaName()); //@@@: f.setName(m_fSecProperties.getFormulaName());
            } //@@@: }
            else { //@@@: else
                f.setName(cMainEditor.getCtrlTreeBox().getFormulaName()); //@@@: f.setName(cMainEditor.getCtrlTreeBox().getFormulaName());
            } //@@@: }

            f.setText(code); //@@@: f.setText(code);

            return m_report.getCompiler().checkSyntax(f); //@@@: return m_report.getCompiler().checkSyntax(f);
        }; //@@@: }

        self.showHelpChartField = function(ctrl, idx) { //@@@: public bool showHelpChartField(TextBox ctrl, int idx) {
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;
            let sField = ""; //@@@: String sField = "";

            sField = ctrl.Text; //@@@: sField = ctrl.Text;
            nFieldType = m_fProperties.getChartFieldType(idx); //@@@: nFieldType = m_fProperties.getChartFieldType(idx);
            nIndex = m_fProperties.getChartIndex(idx); //@@@: nIndex = m_fProperties.getChartIndex(idx);

            if (cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { //@@@: if (cGlobals.showDbFields(ref sField, ref nFieldType, ref nIndex, this))
                ctrl.Text = sField; //@@@: ctrl.Text = sField;
                m_fProperties.setChartFieldType(idx, nFieldType); //@@@: m_fProperties.setChartFieldType(idx, nFieldType);
                m_fProperties.setChartIndex(idx, nIndex); //@@@: m_fProperties.setChartIndex(idx, nIndex);
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.showHelpChartGroupField = function() { //@@@: public bool showHelpChartGroupField() {
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;
            let sField = ""; //@@@: String sField = "";

            sField = m_fProperties.getDbFieldGroupValue(); //@@@: sField = m_fProperties.getDbFieldGroupValue();
            nFieldType = m_fProperties.getChartGroupFieldType(); //@@@: nFieldType = m_fProperties.getChartGroupFieldType();
            nIndex = m_fProperties.getChartGroupIndex(); //@@@: nIndex = m_fProperties.getChartGroupIndex();

            if(cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { //@@@: if(cGlobals.showDbFields(ref sField, ref nFieldType, ref nIndex, this))
                m_fProperties.setDbFieldGroupValue(sField); //@@@: m_fProperties.setDbFieldGroupValue(sField);
                m_fProperties.setChartGroupFieldType(nFieldType); //@@@: m_fProperties.setChartGroupFieldType(nFieldType);
                m_fProperties.setChartGroupIndex(nIndex); //@@@: m_fProperties.setChartGroupIndex(nIndex);
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.showEditFormula = function(formula) { //@@@: public bool showEditFormula(ref String formula) {

            try { //@@@: try
                let f = null; //@@@: cReportFormulaType f = null;
                let c = null; //@@@: cReportControl c = null;

                if (m_fFormula === null) { //@@@: if (m_fFormula == null)
                    m_fFormula = new fFormula(); //@@@: m_fFormula = new fFormula();
                    // TODO: set event handlers for fFormula
                } //@@@: }

                // TODO: this functionality has to be moved to fFormula
                //

                // Load formulas in the tree
                m_fFormula.createTree(); //@@@: m_fFormula.createTree();

                for(var _i = 0; _i < m_report.getFormulaTypes().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getFormulaTypes().count(); _i++)
                    f = m_report.getFormulaTypes().item(_i); //@@@: f = m_report.getFormulaTypes().item(_i);
                    m_fFormula.addFormula(f.getId(), f.getName(), f.getNameUser(), f.getDecrip(), f.getHelpContextId()); //@@@: m_fFormula.addFormula(f.getId(), f.getName(), f.getNameUser(), f.getDecrip(), f.getHelpContextId());
                } //@@@: }

                for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++)
                    c = m_report.getControls().item(_i); //@@@: c = m_report.getControls().item(_i);
                    if (c.getControlType() === csRptControlType.CSRPTCTFIELD) { //@@@: if (c.getControlType() == csRptControlType.CSRPTCTFIELD)
                        m_fFormula.addDBField(c.getName(), c.getField().getName()); //@@@: m_fFormula.addDBField(c.getName(), c.getField().getName());
                    } //@@@: }
                    else if (c.getControlType() === csRptControlType.CSRPTCTLABEL) { //@@@: else if (c.getControlType() == csRptControlType.CSRPTCTLABEL)
                        m_fFormula.addLabel(c.getName()); //@@@: m_fFormula.addLabel(c.getName());
                    } //@@@: }
                } //@@@: }

                m_fFormula.setFormula(formula); //@@@: m_fFormula.setFormula(formula);

                m_fFormula.setHandler(this); //@@@: m_fFormula.setHandler(this);

                m_fFormula.expandTree(); //@@@: m_fFormula.expandTree();

                //
                // TODO: end functionality to move

                m_fFormula.ShowDialog(); //@@@: m_fFormula.ShowDialog();

                if (m_fFormula.getOk()) { //@@@: if (m_fFormula.getOk())
                    formula = m_fFormula.getFormula(); //@@@: formula = m_fFormula.getFormula();
                    return true; //@@@: return true;
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "showEditFormula", C_MODULE, ""); //@@@: cError.mngError(ex, "showEditFormula", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                m_fFormula.Hide(); //@@@: m_fFormula.Hide();
                m_fFormula = null; //@@@: m_fFormula = null;
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
            } //@@@: }
            else if (m_report.getGroupsHeaders().item(secKey) !== null) { //@@@: else if (m_report.getGroupsHeaders().item(secKey) != null) {
                m_report.getGroupsHeaders().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getGroupsHeaders().item(secKey).getFormulaHide().setText(formula);
            } //@@@: }
            else if (m_report.getDetails().item(secKey) !== null) { //@@@: else if (m_report.getDetails().item(secKey) != null) {
                m_report.getDetails().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getDetails().item(secKey).getFormulaHide().setText(formula);
            } //@@@: }
            else if (m_report.getGroupsFooters().item(secKey) !== null) { //@@@: else if (m_report.getGroupsFooters().item(secKey) != null) {
                m_report.getGroupsFooters().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getGroupsFooters().item(secKey).getFormulaHide().setText(formula);
            } //@@@: }
            else if (m_report.getFooters().item(secKey) !== null) { //@@@: else if (m_report.getFooters().item(secKey) != null) {
                m_report.getFooters().item(secKey).getFormulaHide().setText(formula); //@@@: m_report.getFooters().item(secKey).getFormulaHide().setText(formula);
            } //@@@: }
            else { //@@@: else {
                let secLn = null; //@@@: cReportSectionLine secLn = null;
                let sec = null; //@@@: cReportSection sec = null;

                secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), out sec);
                if (secLn !== null) { //@@@: if (secLn != null) {
                    secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                } //@@@: }
                else { //@@@: else {
                    secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), out sec);
                    if (secLn !== null) { //@@@: if (secLn != null) {
                        secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                    } //@@@: }
                    else { //@@@: else {
                        secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), out sec);
                        if (secLn !== null) { //@@@: if (secLn != null) {
                            secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                        } //@@@: }
                        else { //@@@: else {
                            secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), sec); //@@@: secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), out sec);
                            if (secLn !== null) { //@@@: if (secLn != null) {
                                secLn.getFormulaHide().setText(formula); //@@@: secLn.getFormulaHide().setText(formula);
                            } //@@@: }
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

        self.keyDown = function(sender, e) { //@@@: public void keyDown(object sender, KeyEventArgs e) {
            let keyCode = e.KeyCode; //@@@: Keys keyCode = e.KeyCode;
            let shift = e.Shift; //@@@: bool shift = e.Shift;
            let aspect = null; //@@@: cReportAspect aspect = null;
            try { //@@@: try {

                // only process arrow keys
                switch (keyCode) { //@@@: switch (keyCode) {
                case Keys.Up: //@@@: case Keys.Up:
                        break; //@@@: break;
                case Keys.Down: //@@@: case Keys.Down:
                        break; //@@@: break;
                case Keys.Left: //@@@: case Keys.Left:
                        break; //@@@: break;
                case Keys.Right: //@@@: case Keys.Right:
                        break; //@@@: break;
                default: //@@@: default:
                        return; //@@@: return;
                } //@@@: }

                e.Handled = true; //@@@: e.Handled = true;

                let x = 0; //@@@: int x = 0;
                let y = 0; //@@@: int y = 0;

                if (m_vSelectedKeys.Length < 1) { return; } //@@@: if (m_vSelectedKeys.Length < 1) { return; }

                if (!m_keyboardMove) { //@@@: if (!m_keyboardMove) {
                    aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
                    y = Convert.ToInt32(aspect.getTop()); //@@@: y = Convert.ToInt32(aspect.getTop());
                    x = Convert.ToInt32(aspect.getLeft()); //@@@: x = Convert.ToInt32(aspect.getLeft());
                } //@@@: }
                else { //@@@: else {
                    y = m_y; //@@@: y = m_y;
                    x = m_x; //@@@: x = m_x;
                } //@@@: }

                // resize
                //
                if (shift) { //@@@: if (shift) {

                    if (m_keySizing === "") { //@@@: if (m_keySizing == "") {
                        m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey(); //@@@: m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey();
                    } //@@@: }

                    if (!m_keyboardMove) { //@@@: if (!m_keyboardMove) {

                        aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
                        y += Convert.ToInt32(aspect.getHeight()); //@@@: y += Convert.ToInt32(aspect.getHeight());
                        x += Convert.ToInt32(aspect.getWidth()); //@@@: x += Convert.ToInt32(aspect.getWidth());

                        pSetMovingFromKeyboard(x, y); //@@@: pSetMovingFromKeyboard(x, y);

                        if (m_keySizing === "") { //@@@: if (m_keySizing == "") {
                            m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey(); //@@@: m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey();
                        } //@@@: }

                        switch (keyCode) { //@@@: switch (keyCode) {

                        case Keys.Down: //@@@: case Keys.Down:
                        case Keys.Up: //@@@: case Keys.Up:
                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                break; //@@@: break;
                        case Keys.Right: //@@@: case Keys.Right:
                        case Keys.Left: //@@@: case Keys.Left:
                                m_keyMoving = ""; //@@@: m_keyMoving = "";
                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                break; //@@@: break;
                        } //@@@: }
                    } //@@@: }

                    switch (keyCode) { //@@@: switch (keyCode) {
                    case Keys.Up: //@@@: case Keys.Up:
                            y = y - m_keyboardMoveStep; //@@@: y = y - m_keyboardMoveStep;
                            break; //@@@: break;
                    case Keys.Down: //@@@: case Keys.Down:
                            y = y + m_keyboardMoveStep; //@@@: y = y + m_keyboardMoveStep;
                            break; //@@@: break;
                    case Keys.Left: //@@@: case Keys.Left:
                            x = x - m_keyboardMoveStep; //@@@: x = x - m_keyboardMoveStep;
                            break; //@@@: break;
                    case Keys.Right: //@@@: case Keys.Right:
                            x = x + m_keyboardMoveStep; //@@@: x = x + m_keyboardMoveStep;
                            break; //@@@: break;
                    } //@@@: }

                    // move
                    //
                } //@@@: }
                else { //@@@: else {

                    if (!m_keyboardMove) { //@@@: if (!m_keyboardMove) {
                        pSetMovingFromKeyboard(x, y); //@@@: pSetMovingFromKeyboard(x, y);
                    } //@@@: }

                    if (m_keyMoving === "") { //@@@: if (m_keyMoving == "") {
                        m_keyMoving = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey(); //@@@: m_keyMoving = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey();
                    } //@@@: }

                    switch (keyCode) { //@@@: switch (keyCode) {
                    case Keys.Up: //@@@: case Keys.Up:
                            y = y - m_keyboardMoveStep; //@@@: y = y - m_keyboardMoveStep;
                            break; //@@@: break;
                    case Keys.Down: //@@@: case Keys.Down:
                            y = y + m_keyboardMoveStep; //@@@: y = y + m_keyboardMoveStep;
                            break; //@@@: break;
                    case Keys.Left: //@@@: case Keys.Left:
                            x = x - m_keyboardMoveStep; //@@@: x = x - m_keyboardMoveStep;
                            break; //@@@: break;
                    case Keys.Right: //@@@: case Keys.Right:
                            x = x + m_keyboardMoveStep; //@@@: x = x + m_keyboardMoveStep;
                            break; //@@@: break;
                    } //@@@: }
                } //@@@: }

                m_picReport_MouseMove(this, new MouseEventArgs(MouseButtons.Left, 0, x, y, 0)); //@@@: m_picReport_MouseMove(this, new MouseEventArgs(MouseButtons.Left, 0, x, y, 0));
                m_x = x; //@@@: m_x = x;
                m_y = y; //@@@: m_y = y;

                m_keyboardMove = true; //@@@: m_keyboardMove = true;

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "m_picReport_KeyDown", C_MODULE, ""); //@@@: cError.mngError(ex, "m_picReport_KeyDown", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const pSetMovingFromKeyboard = function(x, y) { //@@@: private void pSetMovingFromKeyboard(float x, float y) {

            m_keyMoving = m_keyFocus; //@@@: m_keyMoving = m_keyFocus;

            let po = m_paint.getPaintObject(m_keyMoving); //@@@: cReportPaintObject po = m_paint.getPaintObject(m_keyMoving);

            switch (po.getTag()) { //@@@: switch (po.getTag()) {
                case cGlobals.C_KEY_DETAIL: //@@@: case cGlobals.C_KEY_DETAIL:
                case cGlobals.C_KEY_FOOTER: //@@@: case cGlobals.C_KEY_FOOTER:
                case cGlobals.C_KEY_HEADER: //@@@: case cGlobals.C_KEY_HEADER:
                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                    m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                    break; //@@@: break;
                default: //@@@: default:
                    if (po.getRptType() === csRptSectionType.DETAIL //@@@: if (po.getRptType() == csRptSectionType.DETAIL
                        || po.getRptType() === csRptSectionType.HEADER //@@@: || po.getRptType() == csRptSectionType.HEADER
                        || po.getRptType() === csRptSectionType.GROUP_HEADER //@@@: || po.getRptType() == csRptSectionType.GROUP_HEADER
                        || po.getRptType() === csRptSectionType.GROUP_FOOTER //@@@: || po.getRptType() == csRptSectionType.GROUP_FOOTER
                        || po.getRptType() === csRptSectionType.FOOTER) { //@@@: || po.getRptType() == csRptSectionType.FOOTER) {

                        m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    } //@@@: }
                    else if (po.getRptType() === csRptSectionType.SECLN_HEADER //@@@: else if (po.getRptType() == csRptSectionType.SECLN_HEADER
                        || po.getRptType() === csRptSectionType.SECLN_DETAIL //@@@: || po.getRptType() == csRptSectionType.SECLN_DETAIL
                        || po.getRptType() === csRptSectionType.SECLN_FOOTER //@@@: || po.getRptType() == csRptSectionType.SECLN_FOOTER
                        || po.getRptType() === csRptSectionType.SECLN_GROUPH //@@@: || po.getRptType() == csRptSectionType.SECLN_GROUPH
                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) { //@@@: || po.getRptType() == csRptSectionType.SECLN_GROUPF) {

                        m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    } //@@@: }
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

        const m_picReport_MouseDown = function(sender, e) { //@@@: private void m_picReport_MouseDown(object sender, System.Windows.Forms.MouseEventArgs e)
            if (m_paint === null) return; { //@@@: if (m_paint == null) return;

            let button = e.Button; //@@@: MouseButtons button = e.Button;
            let ctrlKey = Control.ModifierKeys.HasFlag(Keys.Control) || Control.ModifierKeys.HasFlag(Keys.Shift); //@@@: bool ctrlKey = Control.ModifierKeys.HasFlag(Keys.Control) || Control.ModifierKeys.HasFlag(Keys.Shift);
            let x = e.X; //@@@: int x = e.X;
            let y = e.Y; //@@@: int y = e.Y;

            try { //@@@: try

                let sKey = ""; //@@@: String sKey = "";
                let bClearSelected = false; //@@@: bool bClearSelected = false;
                let lastKeyMoving = ""; //@@@: String lastKeyMoving = "";
                let lastKeyObj = ""; //@@@: String lastKeyObj = "";

                // to avoid reentrancy
                if (m_opening) { return; } //@@@: if (m_opening) { return; }

                m_inMouseDown = true; //@@@: m_inMouseDown = true;

                if (m_draging) { //@@@: if (m_draging)
                    addControlEnd(x, y); //@@@: addControlEnd(x, y);
                    endDraging(); //@@@: endDraging();
                } //@@@: }

                endEditText(false); //@@@: endEditText(false);

                bClearSelected = pClearSelected(button, ctrlKey, x, y); //@@@: bClearSelected = pClearSelected(button, ctrlKey, x, y);

                if (button === MouseButtons.Left) { //@@@: if (button == MouseButtons.Left)

                    lastKeyObj = m_keyObj; //@@@: lastKeyObj = m_keyObj;
                    m_keyObj = ""; //@@@: m_keyObj = "";

                    sKey = m_keyMoving !== "" ? m_keyMoving : m_keySizing; //@@@: sKey = m_keyMoving != "" ? m_keyMoving : m_keySizing;

                    // to force focus in the header
                    if (sKey === "") { //@@@: if (sKey == "")
                        m_paint.pointIsInObject(x, y, sKey); //@@@: m_paint.pointIsInObject(x, y, ref sKey);

                        if (sKey !== "") { //@@@: if (sKey != "")

                            let po = m_paint.getPaintObject(sKey); //@@@: cReportPaintObject po = m_paint.getPaintObject(sKey);
                            lastKeyMoving = m_keyMoving; //@@@: lastKeyMoving = m_keyMoving;
                            m_keyMoving = sKey; //@@@: m_keyMoving = sKey;

                            switch (po.getTag()) //@@@: switch (po.getTag())
                            { //@@@: {
                                case cGlobals.C_KEY_DETAIL: //@@@: case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER: //@@@: case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER: //@@@: case cGlobals.C_KEY_HEADER:

                                    // only if no controls are selected
                                    //
                                    if (ctrlKey) { //@@@: if (ctrlKey)

                                        if (m_vSelectedKeys.Length > 0) { //@@@: if (m_vSelectedKeys.Length > 0)
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
                                    if (po.getRptType() === csRptSectionType.DETAIL //@@@: if (po.getRptType() == csRptSectionType.DETAIL
                                        || po.getRptType() === csRptSectionType.HEADER //@@@: || po.getRptType() == csRptSectionType.HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_HEADER //@@@: || po.getRptType() == csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER //@@@: || po.getRptType() == csRptSectionType.GROUP_FOOTER
                                        || po.getRptType() === csRptSectionType.FOOTER) { //@@@: || po.getRptType() == csRptSectionType.FOOTER)

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) { //@@@: if (ctrlKey)

                                            if (m_vSelectedKeys.Length > 0) { //@@@: if (m_vSelectedKeys.Length > 0)
                                                return; //@@@: return;
                                            if (m_vSelectedKeys[0].Length > 0) { //@@@: if (m_vSelectedKeys[0].Length > 0)
                                                return; //@@@: return;
                                            m_keyMoving = lastKeyMoving; //@@@: m_keyMoving = lastKeyMoving;
                                            m_keyObj = lastKeyObj; //@@@: m_keyObj = lastKeyObj;
                                            return; //@@@: return;
                                        } //@@@: }

                                        m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    } //@@@: }
                                    else if (po.getRptType() === csRptSectionType.SECLN_HEADER //@@@: else if (po.getRptType() == csRptSectionType.SECLN_HEADER
                                        || po.getRptType() === csRptSectionType.SECLN_DETAIL //@@@: || po.getRptType() == csRptSectionType.SECLN_DETAIL
                                        || po.getRptType() === csRptSectionType.SECLN_FOOTER //@@@: || po.getRptType() == csRptSectionType.SECLN_FOOTER
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPH //@@@: || po.getRptType() == csRptSectionType.SECLN_GROUPH
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) { //@@@: || po.getRptType() == csRptSectionType.SECLN_GROUPF)

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) { //@@@: if (ctrlKey)
                                            if (m_vSelectedKeys.Length > 0) { //@@@: if (m_vSelectedKeys.Length > 0)
                                                return; //@@@: return;
                                            if (m_vSelectedKeys[0].Length > 0) { //@@@: if (m_vSelectedKeys[0].Length > 0)
                                                return; //@@@: return;
                                            m_keyMoving = lastKeyMoving; //@@@: m_keyMoving = lastKeyMoving;
                                            m_keyObj = lastKeyObj; //@@@: m_keyObj = lastKeyObj;
                                            return; //@@@: return;
                                        } //@@@: }

                                        m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    } //@@@: }
                                    else { //@@@: else
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                                        m_picReport.Cursor = Cursors.SizeAll; //@@@: m_picReport.Cursor = Cursors.SizeAll;
                                    } //@@@: }
                                    break; //@@@: break;
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }

                    let bWasRemoved = false; //@@@: bool bWasRemoved = false;
                    pAddToSelected(m_keyMoving, ctrlKey, bWasRemoved); //@@@: pAddToSelected(m_keyMoving, ctrlKey, out bWasRemoved);

                    if (bWasRemoved) { sKey = ""; } //@@@: if (bWasRemoved) { sKey = ""; }

                    if (sKey !== "") { //@@@: if (sKey != "")
                        let aspect = m_paint.getPaintObject(sKey).getAspect(); //@@@: cReportAspect aspect = m_paint.getPaintObject(sKey).getAspect();
                        m_offX = x - aspect.getLeft(); //@@@: m_offX = x - aspect.getLeft();
                        m_offY = y - (aspect.getTop() - aspect.getOffset()); //@@@: m_offY = y - (aspect.getTop() - aspect.getOffset());
                    } //@@@: }

                    m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
                    m_keyObj = sKey; //@@@: m_keyObj = sKey;
                    m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), bClearSelected); //@@@: m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), bClearSelected);

                    let poSelected = m_paint.getPaintObject(sKey); //@@@: cReportPaintObject poSelected = m_paint.getPaintObject(sKey);
                    if (poSelected !== null) { //@@@: if (poSelected != null)
                        cMainEditor.showProperties( //@@@: cMainEditor.showProperties(
                            poSelected.getIsSection() //@@@: poSelected.getIsSection()
                            ? "S" + poSelected.getTag() //@@@: ? "S" + poSelected.getTag()
                            : poSelected.getTag()); //@@@: : poSelected.getTag());
                    } //@@@: }
                } //@@@: }
                else if (button === MouseButtons.Right) { //@@@: else if (button == MouseButtons.Right)
                    m_keySizing = ""; //@@@: m_keySizing = "";
                    m_keyMoving = ""; //@@@: m_keyMoving = "";
                    m_keyObj = ""; //@@@: m_keyObj = "";

                    if (m_paint.pointIsInObject(x, y, sKey)) { //@@@: if (m_paint.pointIsInObject(x, y, ref sKey))
                        m_keyObj = sKey; //@@@: m_keyObj = sKey;

                        bClearSelected = pSetSelectForRightBttn(); //@@@: bClearSelected = pSetSelectForRightBttn();

                        m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
                        m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), bClearSelected); //@@@: m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), bClearSelected);

                        let po = m_paint.getPaintObject(sKey); //@@@: cReportPaintObject po = m_paint.getPaintObject(sKey);

                        if (m_paint.paintObjIsSection(sKey)) { //@@@: if (m_paint.paintObjIsSection(sKey))

                            let noDelete = false; //@@@: bool noDelete = false;

                            switch (po.getTag()) //@@@: switch (po.getTag())
                            { //@@@: {
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

                            showPopMenuSection(noDelete, isGroup, x, y); //@@@: showPopMenuSection(noDelete, isGroup, x, y);

                            cMainEditor.showProperties("S" + po.getTag()); //@@@: cMainEditor.showProperties("S" + po.getTag());
                        } //@@@: }
                        else { //@@@: else
                            showPopMenuControl(true, x, y); //@@@: showPopMenuControl(true, x, y);

                            cMainEditor.showProperties(po.getTag()); //@@@: cMainEditor.showProperties(po.getTag());
                        } //@@@: }
                    } //@@@: }
                    else { //@@@: else
                        showPopMenuControl(false, x, y); //@@@: showPopMenuControl(false, x, y);
                    } //@@@: }
                } //@@@: }

                cGlobals.setEditAlignTextState(m_vSelectedKeys.Length); //@@@: cGlobals.setEditAlignTextState(m_vSelectedKeys.Length);
                cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1); //@@@: cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1);
                pSetEditAlignValue(); //@@@: pSetEditAlignValue();
                pSetFontBoldValue(); //@@@: pSetFontBoldValue();

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "m_picReport_MouseDown", C_MODULE, ""); //@@@: cError.mngError(ex, "m_picReport_MouseDown", C_MODULE, "");
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                m_inMouseDown = false; //@@@: m_inMouseDown = false;
            } //@@@: }
        }; //@@@: }

        self.setFontBold = function() { //@@@: public void setFontBold() {
            let bBold = -2; //@@@: int bBold = -2;
            let bBoldValue = false; //@@@: bool bBoldValue = false;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
                let font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont(); //@@@: cReportFont font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

                if (bBold === -2) { //@@@: if (bBold == -2) {
                    bBold = font.getBold() ? -1 : 0; //@@@: bBold = font.getBold() ? -1 : 0;
                } //@@@: }
                else if (bBold !== (font.getBold() ? -1 : 0)) { //@@@: else if (bBold != (font.getBold() ? -1 : 0)) {
                    bBold = -2; //@@@: bBold = -2;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (bBold === -2) { //@@@: if (bBold == -2) {
                bBoldValue = true; //@@@: bBoldValue = true;
            } //@@@: }
            else { //@@@: else {
                bBoldValue = bBold === 0; //@@@: bBoldValue = bBold == 0;
            } //@@@: }

            let paintObject = null; //@@@: cReportPaintObject paintObject = null;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {

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
            let bBold = -2; //@@@: int bBold = -2;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
                let font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont(); //@@@: cReportFont font = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

                if (bBold === -2) { //@@@: if (bBold == -2) {
                    bBold = font.getBold() ? -1 : 0; //@@@: bBold = font.getBold() ? -1 : 0;
                } //@@@: }
                else if (bBold !== (font.getBold() ? -1 : 0)) { //@@@: else if (bBold != (font.getBold() ? -1 : 0)) {
                    bBold = -2; //@@@: bBold = -2;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            cGlobals.setEditFontBoldValue(bBold); //@@@: cGlobals.setEditFontBoldValue(bBold);
        }; //@@@: }

        self.controlsAlign = function(align) { //@@@: public void controlsAlign(CSReportGlobals.csECtlAlignConst align) {
            let paintObject = null; //@@@: cReportPaintObject paintObject = null;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

            let top = 0; //@@@: float top = 0;
            let left = 0; //@@@: float left = 0;

            let newTop = 0; //@@@: float newTop = 0;
            let newLeft = 0; //@@@: float newLeft = 0;
            let height = 0; //@@@: float height = 0;
            let width = 0; //@@@: float width = 0;
UNKNOWN >>             cReportAspect aspect; //@@@: cReportAspect aspect;

            switch (align) { //@@@: switch (align) {

                case csECtlAlignConst.csECtlAlignHeight: //@@@: case csECtlAlignConst.csECtlAlignHeight:
                case csECtlAlignConst.csECtlAlignWidth: //@@@: case csECtlAlignConst.csECtlAlignWidth:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
                    height = aspect.getHeight(); //@@@: height = aspect.getHeight();
                    width = aspect.getWidth(); //@@@: width = aspect.getWidth();
                    break; //@@@: break;

                case csECtlAlignConst.csECtlAlignVertical: //@@@: case csECtlAlignConst.csECtlAlignVertical:
                case csECtlAlignConst.csECtlAlignHorizontal: //@@@: case csECtlAlignConst.csECtlAlignHorizontal:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
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

                    for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {

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

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {

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
            let paintObject = null; //@@@: cReportPaintObject paintObject = null;
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {

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

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
                let aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect(); //@@@: CSReportDll.cReportAspect aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();

                if (align === -1) { //@@@: if (align == -1) {
                    align = aspect.getAlign(); //@@@: align = (int)aspect.getAlign();
                } //@@@: }
                else if (align !== aspect.getAlign()) { //@@@: else if (align != (int)aspect.getAlign()) {
                    align = -2; //@@@: align = -2;
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }
            cGlobals.setEditAlignValue(align); //@@@: cGlobals.setEditAlignValue(align);
        }; //@@@: }

        const pAddToSelected = function(sKey, ctrlKey, bWasRemoved) { //@@@: private void pAddToSelected(String sKey, bool ctrlKey, out bool bWasRemoved) {

            bWasRemoved = false; //@@@: bWasRemoved = false;
            if (sKey === "") { return; } //@@@: if (sKey == "") { return; }

            bWasRemoved = false; //@@@: bWasRemoved = false;

            if (ctrlKey) { //@@@: if (ctrlKey) {

                for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {

                    if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey) {
                        pRemoveFromSelected(sKey); //@@@: pRemoveFromSelected(sKey);
                        bWasRemoved = true; //@@@: bWasRemoved = true;
                        return; //@@@: return;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            else { //@@@: else {
                if (pAllreadySelected(sKey)) { return; } //@@@: if (pAllreadySelected(sKey)) { return; }
            } //@@@: }

            G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length + 1); //@@@: G.redimPreserve(ref m_vSelectedKeys, m_vSelectedKeys.Length + 1);
            m_vSelectedKeys[m_vSelectedKeys.Length - 1] = sKey; //@@@: m_vSelectedKeys[m_vSelectedKeys.Length - 1] = sKey;
        }; //@@@: }

        const pAllreadySelected = function(sKey) { //@@@: private bool pAllreadySelected(String sKey) {
            if (sKey === "") { //@@@: if (sKey == "") {
                return true; //@@@: return true;
            } //@@@: }

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey) {
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pRemoveFromSelected = function(sKey) { //@@@: private void pRemoveFromSelected(String sKey) {
UNKNOWN >>             int i; //@@@: int i;

            for (i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (i = 0; i < m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey) {
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (i > m_vSelectedKeys.Length) { return; } //@@@: if (i > m_vSelectedKeys.Length) { return; }
            for (i = i + 1; i < m_vSelectedKeys.Length; i++) { //@@@: for (i = i + 1; i < m_vSelectedKeys.Length; i++) {
                m_vSelectedKeys[i - 1] = m_vSelectedKeys[i]; //@@@: m_vSelectedKeys[i - 1] = m_vSelectedKeys[i];
            } //@@@: }
            if (m_vSelectedKeys.Length > 0) { //@@@: if (m_vSelectedKeys.Length > 0) {
                G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length - 1); //@@@: G.redimPreserve(ref m_vSelectedKeys, m_vSelectedKeys.Length - 1);
            } //@@@: }
            else { //@@@: else {
                G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            } //@@@: }

            m_paint.removeFromSelected(sKey, m_picReport.CreateGraphics()); //@@@: m_paint.removeFromSelected(sKey, m_picReport.CreateGraphics());
        }; //@@@: }

        const pClearSelected = function(button, ctrlKey, x, y) { //@@@: private bool pClearSelected(MouseButtons button, bool ctrlKey, float x, float y) {
            let sKey = ""; //@@@: String sKey = "";

            if (!ctrlKey && button !== MouseButtons.Right) { //@@@: if (!ctrlKey && button != MouseButtons.Right) {
                m_paint.pointIsInObject(x, y, sKey); //@@@: m_paint.pointIsInObject(x, y, ref sKey);
                for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
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

            for (i = m_vSelectedKeys.Length-1; i > -1; i--) { //@@@: for (i = m_vSelectedKeys.Length-1; i > -1; i--) {

                aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect(); //@@@: aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();
                offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft()); //@@@: offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft());
                offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop()); //@@@: offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop());
                offSet2 = aspect.getOffset(); //@@@: offSet2 = aspect.getOffset();

                if (m_bMoveHorizontal) { //@@@: if (m_bMoveHorizontal) {
                    m_paint.moveObjToXYEx(m_keyMoving, //@@@: m_paint.moveObjToXYEx(m_keyMoving,
                                            x - m_offX + offsetLeft, //@@@: x - m_offX + offsetLeft,
                                            firstTop - offSet2 + offsetTop, //@@@: firstTop - offSet2 + offsetTop,
                                            m_picReport.CreateGraphics(), //@@@: m_picReport.CreateGraphics(),
                                            clear); //@@@: clear);
                } //@@@: }
                else if (m_bMoveVertical) { //@@@: else if (m_bMoveVertical) {
                    m_paint.moveObjToXYEx(m_keyMoving, //@@@: m_paint.moveObjToXYEx(m_keyMoving,
                                            firstLeft + offsetLeft, //@@@: firstLeft + offsetLeft,
                                            y - m_offY + offsetTop, //@@@: y - m_offY + offsetTop,
                                            m_picReport.CreateGraphics(), //@@@: m_picReport.CreateGraphics(),
                                            clear); //@@@: clear);
                } //@@@: }
                else { //@@@: else {
                    m_paint.moveObjToXYEx(m_keyMoving, //@@@: m_paint.moveObjToXYEx(m_keyMoving,
                                            x - m_offX + offsetLeft, //@@@: x - m_offX + offsetLeft,
                                            y - m_offY + offsetTop, //@@@: y - m_offY + offsetTop,
                                            m_picReport.CreateGraphics(), //@@@: m_picReport.CreateGraphics(),
                                            clear); //@@@: clear);
                } //@@@: }

                if (clear) { clear = false; } //@@@: if (clear) { clear = false; }
            } //@@@: }
        }; //@@@: }

        const m_picReport_MouseMove = function(sender, e) { //@@@: private void m_picReport_MouseMove(object sender, System.Windows.Forms.MouseEventArgs e)
            if (m_paint === null) return; { //@@@: if (m_paint == null) return;

            let button = e.Button; //@@@: MouseButtons button = e.Button;
            let x = e.X; //@@@: int x = e.X;
            let y = e.Y; //@@@: int y = e.Y;

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
                            m_paint.moveHorizontal(m_keyMoving, x, m_picReport.CreateGraphics()); //@@@: m_paint.moveHorizontal(m_keyMoving, x, m_picReport.CreateGraphics());
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
                            m_paint.moveVertical(m_keyMoving, y, m_picReport.CreateGraphics()); //@@@: m_paint.moveVertical(m_keyMoving, y, m_picReport.CreateGraphics());
                            break; //@@@: break;
                    } //@@@: }

                    m_moving = true; //@@@: m_moving = true;

                } //@@@: }
                else if (m_keySizing !== "") { //@@@: else if (m_keySizing != "") {
                    switch (m_moveType) { //@@@: switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVDOWN: //@@@: case csRptEditorMoveType.CSRPTEDMOVDOWN:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFT: //@@@: case csRptEditorMoveType.CSRPTEDMOVLEFT:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHT: //@@@: case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVUP: //@@@: case csRptEditorMoveType.CSRPTEDMOVUP:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN: //@@@: case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTUP: //@@@: case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN: //@@@: case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y);
                            break; //@@@: break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTUP: //@@@: case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE); //@@@: m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE);
                            break; //@@@: break;
                    } //@@@: }
                    m_moving = true; //@@@: m_moving = true;
                } //@@@: }
                else { //@@@: else {
                    m_moving = false; //@@@: m_moving = false;
                } //@@@: }
            } //@@@: }
            else { //@@@: else {
                if (m_keyFocus !== "") { //@@@: if (m_keyFocus != "") {
                    sKey = m_keyFocus; //@@@: sKey = m_keyFocus;
                    if (m_paint.pointIsInThisObject(x, y, m_keyFocus, rgnTp)) { //@@@: if (m_paint.pointIsInThisObject(x, y, ref m_keyFocus, ref rgnTp)) {
                        let po = m_paint.getPaintObject(sKey); //@@@: cReportPaintObject po = m_paint.getPaintObject(sKey);

                        let ctrl = m_report.getControls().item(po.getTag()); //@@@: cReportControl ctrl = m_report.getControls().item(po.getTag());
                        pSetSbPnlCtrl( //@@@: pSetSbPnlCtrl(
                            ctrl.getName(), //@@@: ctrl.getName(),
                            ctrl.getControlType(), //@@@: ctrl.getControlType(),
                            ctrl.getFormulaHide().getText(), //@@@: ctrl.getFormulaHide().getText(),
                            ctrl.getFormulaValue().getText(), //@@@: ctrl.getFormulaValue().getText(),
                            ctrl.getHasFormulaHide(), //@@@: ctrl.getHasFormulaHide(),
                            ctrl.getHasFormulaValue(), //@@@: ctrl.getHasFormulaValue(),
                            ctrl.getField().getName()); //@@@: ctrl.getField().getName());

                        if (po.getPaintType() === csRptPaintObjType.CSRPTPAINTOBJLINE) { //@@@: if (po.getPaintType() == csRptPaintObjType.CSRPTPAINTOBJLINE) {
                            m_keyMoving = sKey; //@@@: m_keyMoving = sKey;
                            m_keySizing = ""; //@@@: m_keySizing = "";
                            m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                        } //@@@: }
                        else { //@@@: else {
                            switch (po.getTag()) { //@@@: switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL: //@@@: case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER: //@@@: case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER: //@@@: case cGlobals.C_KEY_HEADER:
                                    m_keyMoving = sKey; //@@@: m_keyMoving = sKey;
                                    m_keySizing = ""; //@@@: m_keySizing = "";
                                    m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    break; //@@@: break;

                                default: //@@@: default:

                                if (po.getRptType() === csRptSectionType.DETAIL //@@@: if (po.getRptType() == csRptSectionType.DETAIL
                                    || po.getRptType() === csRptSectionType.HEADER //@@@: || po.getRptType() == csRptSectionType.HEADER
                                    || po.getRptType() === csRptSectionType.GROUP_HEADER //@@@: || po.getRptType() == csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER //@@@: || po.getRptType() == csRptSectionType.GROUP_FOOTER
                                    || po.getRptType() === csRptSectionType.FOOTER) { //@@@: || po.getRptType() == csRptSectionType.FOOTER) {

                                        m_keyMoving = sKey; //@@@: m_keyMoving = sKey;
                                        m_keySizing = ""; //@@@: m_keySizing = "";
                                        m_picReport.Cursor = Cursors.SizeNS; //@@@: m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL; //@@@: m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    } //@@@: }
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
                    } //@@@: }
                    else { //@@@: else {
                        pSetSbPnlCtrl(""); //@@@: pSetSbPnlCtrl("");
                        m_picReport.Cursor = Cursors.Default; //@@@: m_picReport.Cursor = Cursors.Default;
                        m_keySizing = ""; //@@@: m_keySizing = "";
                        m_keyMoving = ""; //@@@: m_keyMoving = "";
                    } //@@@: }
                } //@@@: }

                if (m_paint.pointIsInObject(x, y, sKey, rgnTp)) { //@@@: if (m_paint.pointIsInObject(x, y, ref sKey, ref rgnTp)) {
                    let po = m_paint.getPaintObject(sKey); //@@@: cReportPaintObject po = m_paint.getPaintObject(sKey);
                    if (po.getRptType() === csRptSectionType.CONTROL) { //@@@: if (po.getRptType() == csRptSectionType.CONTROL) {
                        let rptCtrl = null; //@@@: cReportControl rptCtrl = null;
                        rptCtrl = m_report.getControls().item(po.getTag()); //@@@: rptCtrl = m_report.getControls().item(po.getTag());
                        if (rptCtrl !== null) { //@@@: if (rptCtrl != null) {
                            pSetSbPnlCtrl(rptCtrl.getName(), //@@@: pSetSbPnlCtrl(rptCtrl.getName(),
                                            rptCtrl.getControlType(), //@@@: rptCtrl.getControlType(),
                                            rptCtrl.getFormulaHide().getText(), //@@@: rptCtrl.getFormulaHide().getText(),
                                            rptCtrl.getFormulaValue().getText(), //@@@: rptCtrl.getFormulaValue().getText(),
                                            rptCtrl.getHasFormulaHide(), //@@@: rptCtrl.getHasFormulaHide(),
                                            rptCtrl.getHasFormulaValue(), //@@@: rptCtrl.getHasFormulaValue(),
                                            rptCtrl.getField().getName()); //@@@: rptCtrl.getField().getName());
                        } //@@@: }
                    } //@@@: }
                    else { //@@@: else {
                        pSetSbPnlCtrl(""); //@@@: pSetSbPnlCtrl("");
                    } //@@@: }
                } //@@@: }
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
                    + "]Tipo:[" + strCtlType //@@@: + "]Tipo:[" + strCtlType
                    + "]F.Hide:[" + cUtil.subString(formulaHide, 1, 100) //@@@: + "]F.Hide:[" + cUtil.subString(formulaHide, 1, 100)
                    + "]Activa[" + ( hasFormulaHide).ToString() //@@@: + "]Activa[" + ((bool) hasFormulaHide).ToString()
                    + "]F.Value:[" + cUtil.subString(formulaValue, 1, 100) //@@@: + "]F.Value:[" + cUtil.subString(formulaValue, 1, 100)
                    + "]Activa[" + ( hasFormulaValue).ToString() //@@@: + "]Activa[" + ((bool) hasFormulaValue).ToString()
                    + "]Field:[" + fieldName + "]"; //@@@: + "]Field:[" + fieldName + "]";
            } //@@@: }
            m_fmain.setsbPnlCtrl(msg); //@@@: m_fmain.setsbPnlCtrl(msg);
        }; //@@@: }

        const m_picReport_MouseUp = function(sender, e) { //@@@: private void m_picReport_MouseUp(object sender, System.Windows.Forms.MouseEventArgs e)
            if (m_paint === null) return; { //@@@: if (m_paint == null) return;

            let button = e.Button; //@@@: MouseButtons button = e.Button;
            let x = e.X; //@@@: int x = e.X;
            let y = e.Y; //@@@: int y = e.Y;

            // to avoid reentrancy
            if (m_opening) { return; } //@@@: if (m_opening) { return; }

            //----------------------------------------------------
            // MOVING
            //----------------------------------------------------

            if (m_moving) { //@@@: if (m_moving) {
                if (m_keyMoving !== "") { //@@@: if (m_keyMoving != "") {
                    switch (m_moveType) { //@@@: switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL: //@@@: case csRptEditorMoveType.CSRPTEDMOVTALL:
                            if (m_bMoveVertical) { //@@@: if (m_bMoveVertical) {
                                pMoveAll(C_NOMOVE, y); //@@@: pMoveAll(C_NOMOVE, y);
                            } //@@@: }
                            else if (m_bMoveHorizontal) { //@@@: else if (m_bMoveHorizontal) {
                                pMoveAll(x, C_NOMOVE); //@@@: pMoveAll(x, C_NOMOVE);
                            } //@@@: }
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
                } //@@@: }
                else if (m_keySizing !== "") { //@@@: else if (m_keySizing != "") {
                    pResizeControl(x, y); //@@@: pResizeControl(x, y);
                } //@@@: }

                refreshBody(); //@@@: refreshBody();
                m_moving = false; //@@@: m_moving = false;
                refreshRule(); //@@@: refreshRule();
            } //@@@: }

            m_keySizing = ""; //@@@: m_keySizing = "";
            m_keyMoving = ""; //@@@: m_keyMoving = "";
        }; //@@@: }

        const m_picReport_Paint = function(sender, e) { //@@@: private void m_picReport_Paint(object sender, PaintEventArgs e)
            if (m_paint !== null) { //@@@: if (m_paint != null)
                m_paint.paintPicture(e.Graphics, false); //@@@: m_paint.paintPicture(e.Graphics, false);
            } //@@@: }
        }; //@@@: }

        const m_picRule_Paint = function(sender, e) { //@@@: private void m_picRule_Paint(object sender, PaintEventArgs e)
            if (m_paint !== null) { //@@@: if (m_paint != null)
                let ps = m_paint.getPaintSections(); //@@@: cReportPaintObjects ps = m_paint.getPaintSections();
                for(var i = 0; i < ps.count(); i++) { //@@@: for (int i = 0; i < ps.count(); i++)
                    m_paint.drawRule(ps.getNextKeyForZOrder(i), e.Graphics); //@@@: m_paint.drawRule(ps.getNextKeyForZOrder(i), e.Graphics);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.setParameters = function() { //@@@: public void setParameters() {
            let connect = new CSConnect.cConnect(); //@@@: CSConnect.cConnect connect = new CSConnect.cConnect();
            let param = null; //@@@: cParameter param = null;

            for(var _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) {
                param = m_report.getConnect().getParameters().item(_i); //@@@: param = m_report.getConnect().getParameters().item(_i);
                let connectParam = connect.getParameters().add(null, ""); //@@@: CSConnect.cParameter connectParam = connect.getParameters().add(null, "");
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

            if (!connect.getDataSourceColumnsInfo(m_report.getConnect().getDataSource(), //@@@: if (!connect.getDataSourceColumnsInfo(m_report.getConnect().getDataSource(),
                m_report.getConnect().getDataSourceType())) { //@@@: m_report.getConnect().getDataSourceType()))
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
                } //@@@: }
                else { //@@@: else {
                    f.setConnectTypeToSQL(); //@@@: f.setConnectTypeToSQL();
                } //@@@: }
                f.ShowDialog(); //@@@: f.ShowDialog();

                if (!f.getOk()) { //@@@: if (!f.getOk()) {
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
                    connect.getDataSource(), //@@@: connect.getDataSource(),
                    connect.getDataSourceType())) { //@@@: connect.getDataSourceType())) {
                    return false; //@@@: return false;
                } //@@@: }

                if (rptConnect === null) { //@@@: if (rptConnect == null) {
                    cGlobals.setParametersAux(connect, m_report.getConnect()); //@@@: cGlobals.setParametersAux(connect, m_report.getConnect());
                } //@@@: }
                else { //@@@: else {
                    cGlobals.setParametersAux(connect, rptConnect); //@@@: cGlobals.setParametersAux(connect, rptConnect);
                } //@@@: }

                if (cMainEditor.getToolbox(this) !== null) { showToolbox(); } //@@@: if (cMainEditor.getToolbox(this) != null) { showToolbox(); }

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
            let sec = null; //@@@: cReportSection sec = null;
            let secs = null; //@@@: cReportSections secs = null;
            let secLn = null; //@@@: cReportSectionLine secLn = null;
            let ctrl = null; //@@@: cReportControl ctrl = null;
            let paintObj = null; //@@@: cReportPaintObject paintObj = null;

            let isGroupFooter = false; //@@@: bool isGroupFooter = false;
            let isGroupHeader = false; //@@@: bool isGroupHeader = false;
            let isSecLn = false; //@@@: bool isSecLn = false;

            if (m_keyFocus === "") { return; } //@@@: if (m_keyFocus == "") { return; }

            let group = null; //@@@: cReportGroup group = null;
            let secG = null; //@@@: cReportSection secG = null;

            if (m_paint.paintObjIsSection(m_keyFocus)) { //@@@: if (m_paint.paintObjIsSection(m_keyFocus)) {
                if (m_paint.getPaintSections().item(m_keyFocus) === null) { return; } //@@@: if (m_paint.getPaintSections().item(m_keyFocus) == null) { return; }

                let po = m_paint.getPaintSections().item(m_keyFocus); //@@@: cReportPaintObject po = m_paint.getPaintSections().item(m_keyFocus);

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
                } //@@@: }
                else { //@@@: else {
                    what = "the section"; //@@@: what = "the section";
                } //@@@: }

                if (!cWindow.ask("Are yuo sure you want to delete " //@@@: if (!cWindow.ask("Are yuo sure you want to delete "
                            + what + " and all the controls it contains? ", MessageBoxDefaultButton.Button2)) { //@@@: + what + " and all the controls it contains? ", MessageBoxDefaultButton.Button2))
                    return; //@@@: return;
                } //@@@: }

                if (isSecLn) { //@@@: if (isSecLn) {

                    for(var _i = 0; _i < secLn.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < secLn.getControls().count(); _i++) {
                        ctrl = secLn.getControls().item(_i); //@@@: ctrl = secLn.getControls().item(_i);
                        for(var i = 0; i < m_paint.getPaintObjects().count(); i++) { //@@@: for (int i = 0; i < m_paint.getPaintObjects().count(); i++) {
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

                } //@@@: }
                else { //@@@: else {

                    for(var _i = 0; _i < sec.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < sec.getSectionLines().count(); _i++) {
                        secLn = sec.getSectionLines().item(_i); //@@@: secLn = sec.getSectionLines().item(_i);
                        for(var _j = 0; _j < secLn.getControls().count(); _j++) { //@@@: for (int _j = 0; _j < secLn.getControls().count(); _j++) {
                            ctrl = secLn.getControls().item(_j); //@@@: ctrl = secLn.getControls().item(_j);
                            for(var i = 0; i < m_paint.getPaintObjects().count(); i++) { //@@@: for (int i = 0; i < m_paint.getPaintObjects().count(); i++) {
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
                        } //@@@: }
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
                                for(var i = 0; i < m_paint.getPaintObjects().count(); i++) { //@@@: for (int i = 0; i < m_paint.getPaintObjects().count(); i++) {
                                    paintObj = m_paint.getPaintObjects().item(i); //@@@: paintObj = m_paint.getPaintObjects().item(i);
                                    if (paintObj.getTag() === ctrl.getKey()) { //@@@: if (paintObj.getTag() == ctrl.getKey()) {
                                        m_paint.getPaintObjects().remove(paintObj.getKey()); //@@@: m_paint.getPaintObjects().remove(paintObj.getKey());
                                        break; //@@@: break;
                                    } //@@@: }
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }

                        for(var i = 0; i < m_paint.getPaintSections().count(); i++) { //@@@: for (int i = 0; i < m_paint.getPaintSections().count(); i++) {
                            paintObj = m_paint.getPaintSections().item(i); //@@@: paintObj = m_paint.getPaintSections().item(i);
                            if (paintObj.getTag() === secG.getKey()) { //@@@: if (paintObj.getTag() == secG.getKey()) {
                                m_paint.getPaintSections().remove(paintObj.getKey()); //@@@: m_paint.getPaintSections().remove(paintObj.getKey());
                                break; //@@@: break;
                            } //@@@: }
                        } //@@@: }

                        m_report.getGroups().remove(group.getIndex()); //@@@: m_report.getGroups().remove(group.getIndex());

                    } //@@@: }
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
                } //@@@: }
                else { //@@@: else {
                    let secLns = sec.getSectionLines(); //@@@: cReportSectionLines secLns = sec.getSectionLines();
                    m_paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint()); //@@@: m_paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint());
                    secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint()); //@@@: secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint());
                } //@@@: }

                pResetKeysFocus(); //@@@: pResetKeysFocus();
                G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);

                pValidateSectionAspect(); //@@@: pValidateSectionAspect();
                updateSectionNameInPaintObjects(); //@@@: updateSectionNameInPaintObjects();
            } //@@@: }
            else { //@@@: else {
                paintObj = m_paint.getPaintObjects().item(m_keyFocus); //@@@: paintObj = m_paint.getPaintObjects().item(m_keyFocus);
                if (paintObj === null) { return; } //@@@: if (paintObj == null) { return; }

                if (!cWindow.ask("Confirm you want to delete the control? ", MessageBoxDefaultButton.Button2)) { return; } //@@@: if (!cWindow.ask("Confirm you want to delete the control? ", MessageBoxDefaultButton.Button2)) { return; }

                for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
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

        const updateSectionNameInPaintObjects = function() { //@@@: private void updateSectionNameInPaintObjects()
            updateSectionNameInPaintObjects(m_report.getHeaders()); //@@@: updateSectionNameInPaintObjects(m_report.getHeaders());
            updateSectionNameInPaintObjects(m_report.getFooters()); //@@@: updateSectionNameInPaintObjects(m_report.getFooters());
            updateSectionNameInPaintObjects(m_report.getDetails()); //@@@: updateSectionNameInPaintObjects(m_report.getDetails());
            updateSectionNameInPaintObjects(m_report.getGroupsHeaders()); //@@@: updateSectionNameInPaintObjects(m_report.getGroupsHeaders());
            updateSectionNameInPaintObjects(m_report.getGroupsFooters()); //@@@: updateSectionNameInPaintObjects(m_report.getGroupsFooters());
        }; //@@@: }

        const updateSectionNameInPaintObjects = function(sections) { //@@@: private void updateSectionNameInPaintObjects(cIReportGroupSections sections)
            for(var i =0; i < sections.count(); i++) { //@@@: for(var i =0; i < sections.count(); i++)
                let sec = sections.item(i); //@@@: var sec = sections.item(i);
                let paintObj = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: var paintObj = m_paint.getPaintSections().item(sec.getKeyPaint());
                if (paintObj !== null) { //@@@: if (paintObj != null)
                    paintObj.setText(sec.getName()); //@@@: paintObj.setText(sec.getName());
                } //@@@: }
            }             //@@@: }
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
                    if (secAux.getTypeSection() === csRptSectionType.MAIN_HEADER) { //@@@: if (secAux.getTypeSection() == csRptSectionType.MAIN_HEADER) {
                        cWindow.msgInfo("The main header can't be deleted"); //@@@: cWindow.msgInfo("The main header can't be deleted");
                        return false; //@@@: return false;
                    } //@@@: }
                    secs = m_report.getHeaders(); //@@@: secs = m_report.getHeaders();
                } //@@@: }
            } //@@@: }
            // if we don't find the section yet
            //
            if (secs === null) { //@@@: if (secs == null) {

                // footers
                //
                secAux = m_report.getFooters().item(tag); //@@@: secAux = m_report.getFooters().item(tag);
                if (secAux !== null) { //@@@: if (secAux != null) {
                    if (secAux.Equals(sec) || sec === null) { //@@@: if (secAux.Equals(sec) || sec == null) {
                        if (secAux.getTypeSection() === csRptSectionType.MAIN_FOOTER) { //@@@: if (secAux.getTypeSection() == csRptSectionType.MAIN_FOOTER) {
                            cWindow.msgInfo("The main footer can't be deleted"); //@@@: cWindow.msgInfo("The main footer can't be deleted");
                            return false; //@@@: return false;
                        } //@@@: }
                        secs = m_report.getFooters(); //@@@: secs = m_report.getFooters();
                    } //@@@: }
                } //@@@: }
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

            if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { //@@@: if (!cGlobals.showDbFields(ref sField, ref nFieldType, ref nIndex, this))
                return; //@@@: return;

            beginDraging(); //@@@: beginDraging();
            m_controlName = ""; //@@@: m_controlName = "";
            m_controlType = csRptEditCtrlType.field; //@@@: m_controlType = csRptEditCtrlType.field;
            m_fieldName = sField; //@@@: m_fieldName = sField;
            m_formulaText = ""; //@@@: m_formulaText = "";
            m_fieldIndex = nIndex; //@@@: m_fieldIndex = nIndex;
            m_fieldType = nFieldType; //@@@: m_fieldType = nFieldType;
        }; //@@@: }

        self.addLabel = function() { //@@@: public void addLabel() {
            pAddLabelAux(csRptEditCtrlType.label); //@@@: pAddLabelAux(csRptEditCtrlType.label);
        }; //@@@: }

        self.addLineLabel = function() { //@@@: public void addLineLabel()
            pAddLabelAux(csRptEditCtrlType.lineLabel); //@@@: pAddLabelAux(csRptEditCtrlType.lineLabel);
        }; //@@@: }

        self.addImage = function() { //@@@: public void addImage() {
            pAddLabelAux(csRptEditCtrlType.image); //@@@: pAddLabelAux(csRptEditCtrlType.image);
        }; //@@@: }

        self.addChart = function() { //@@@: public void addChart() {
            pAddLabelAux(csRptEditCtrlType.chart); //@@@: pAddLabelAux(csRptEditCtrlType.chart);
        }; //@@@: }

        self.pAddLabelAux = function(ctrlType) { //@@@: public void pAddLabelAux(csRptEditCtrlType ctrlType) {
            beginDraging(); //@@@: beginDraging();
            m_controlName = ""; //@@@: m_controlName = "";
            m_controlType = ctrlType; //@@@: m_controlType = ctrlType;
            m_fieldName = ""; //@@@: m_fieldName = "";
            m_formulaText = ""; //@@@: m_formulaText = "";
            m_fieldIndex = 0; //@@@: m_fieldIndex = 0;
            m_fieldType = 0; //@@@: m_fieldType = 0;
        }; //@@@: }

        const addControlEnd = function(left, top) { //@@@: private bool addControlEnd(float left, float top) {

            m_draging = false; //@@@: m_draging = false;

            if (m_controlType === csRptEditCtrlType.none) { //@@@: if (m_controlType == csRptEditCtrlType.none) {
                return true; //@@@: return true;
            } //@@@: }

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;

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

                for(var i = m_vCopyKeys.Length-1; i > -1; i--) { //@@@: for (int i = m_vCopyKeys.Length-1; i > -1; i--) {

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

                    if (left - 26 > m_picReport.Width) { //@@@: if (left - 26 > m_picReport.Width) {
                        left = originalLeft + (offSet % originalLeft); //@@@: left = originalLeft + (offSet % originalLeft);
                        top += 6; //@@@: top += 6;
                    } //@@@: }

                    if (top > m_picReport.Height) { //@@@: if (top > m_picReport.Height) {
                        top = m_picReport.Height - 6; //@@@: top = m_picReport.Height - 6;
                    } //@@@: }

                    pAddControlEndAux(left, top, copyCtrl); //@@@: pAddControlEndAux(left, top, copyCtrl);

                } //@@@: }
                m_copyControls = false; //@@@: m_copyControls = false;

            } //@@@: }
            else if (m_copyControlsFromOtherReport) { //@@@: else if (m_copyControlsFromOtherReport) {

                if (m_fmain.getReportCopySource() === null) { return false; } //@@@: if (m_fmain.getReportCopySource() == null) { return false; }

                originalLeft = left; //@@@: originalLeft = left;
                originalTop = top; //@@@: originalTop = top;

                let editor = m_fmain.getReportCopySource(); //@@@: cEditor editor = m_fmain.getReportCopySource();
                let keyPaint = editor.getVCopyKeys(editor.getVCopyKeysCount()); //@@@: String keyPaint = editor.getVCopyKeys(editor.getVCopyKeysCount());
                let keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag(); //@@@: String keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag();
                movedCtrl = editor.getReport().getControls().item(keyCtrl); //@@@: movedCtrl = editor.getReport().getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft(); //@@@: firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for(var i = editor.getVCopyKeysCount()-1; i > -1; i--) { //@@@: for (int i = editor.getVCopyKeysCount()-1; i > -1; i--) {

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

            } //@@@: }
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
            ctrl = m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(0).getControls().add(); //@@@: ctrl = m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(0).getControls().add();

            // later we will set the properties related to the type of the control
            //
            m_nextNameCtrl = m_nextNameCtrl + 1; //@@@: m_nextNameCtrl = m_nextNameCtrl + 1;
            ctrl.setName(cGlobals.C_CONTROL_NAME + m_nextNameCtrl); //@@@: ctrl.setName(cGlobals.C_CONTROL_NAME + m_nextNameCtrl);

            if (baseControl === null) { //@@@: if (baseControl == null) {
                pSetNewControlProperties(ctrl); //@@@: pSetNewControlProperties(ctrl);
            } //@@@: }
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
            self.int CTRL_HEIGHT = 19; //@@@: const int CTRL_HEIGHT = 19;
            self.int CTRL_WIDTH = 133; //@@@: const int CTRL_WIDTH = 133;
            self.int LINE_HEIGHT = 1; //@@@: const int LINE_HEIGHT = 1;

            let label = null; //@@@: cReportLabel label = null;
            let aspect = null; //@@@: cReportAspect aspect = null;

            let ctrlHeigth = CTRL_HEIGHT; //@@@: int ctrlHeigth = CTRL_HEIGHT;
            let transparent = true; //@@@: bool transparent = true;

            ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left); //@@@: ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left);

            switch (m_controlType) { //@@@: switch (m_controlType) {
                case csRptEditCtrlType.field: //@@@: case csRptEditCtrlType.field:
                    ctrl.setControlType(csRptControlType.CSRPTCTFIELD); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTFIELD);
                    ctrl.getLabel().setText(m_fieldName); //@@@: ctrl.getLabel().setText(m_fieldName);
                    let field = ctrl.getField(); //@@@: cReportField field = ctrl.getField();
                    field.setIndex(m_fieldIndex); //@@@: field.setIndex(m_fieldIndex);
                    field.setName(m_fieldName); //@@@: field.setName(m_fieldName);
                    field.setFieldType(m_fieldType); //@@@: field.setFieldType(m_fieldType);

                    if (cDatabaseGlobals.isNumberField(m_fieldType)) { //@@@: if (cDatabaseGlobals.isNumberField(m_fieldType))
                        aspect = ctrl.getLabel().getAspect(); //@@@: aspect = ctrl.getLabel().getAspect();
                        aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right); //@@@: aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                        aspect.setFormat("#0.00;-#0.00"); //@@@: aspect.setFormat("#0.00;-#0.00");
                    } //@@@: }
                    break; //@@@: break;

                case csRptEditCtrlType.formula: //@@@: case csRptEditCtrlType.formula:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getFormulaValue().setText(m_formulaText + "(" + m_controlName + ")"); //@@@: ctrl.getFormulaValue().setText(m_formulaText + "(" + m_controlName + ")");
                    ctrl.setHasFormulaValue(true); //@@@: ctrl.setHasFormulaValue(true);
                    label = ctrl.getLabel(); //@@@: label = ctrl.getLabel();
                    aspect = label.getAspect(); //@@@: aspect = label.getAspect();
                    aspect.setFormat("0.00;-0.00"); //@@@: aspect.setFormat("0.00;-0.00");
                    aspect.getFont().setBold(true); //@@@: aspect.getFont().setBold(true);
                    label.setText(ctrl.getFormulaValue().getText()); //@@@: label.setText(ctrl.getFormulaValue().getText());
                    aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right); //@@@: aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                    break; //@@@: break;

                case csRptEditCtrlType.label: //@@@: case csRptEditCtrlType.label:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    label = ctrl.getLabel(); //@@@: label = ctrl.getLabel();
                    label.setText(m_fieldName); //@@@: label.setText(m_fieldName);
                    label.getAspect().getFont().setBold(true); //@@@: label.getAspect().getFont().setBold(true);
                    break; //@@@: break;

                case csRptEditCtrlType.lineLabel: //@@@: case csRptEditCtrlType.lineLabel:
                    ctrlHeigth = LINE_HEIGHT; //@@@: ctrlHeigth = LINE_HEIGHT;
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    label = ctrl.getLabel(); //@@@: label = ctrl.getLabel();
                    label.setText(m_fieldName); //@@@: label.setText(m_fieldName);
                    aspect = label.getAspect(); //@@@: aspect = label.getAspect();
                    aspect.getFont().setBold(true); //@@@: aspect.getFont().setBold(true);
                    aspect.setBackColor(Color.Gray.ToArgb()); //@@@: aspect.setBackColor(Color.Gray.ToArgb());
                    transparent = false; //@@@: transparent = false;
                    break; //@@@: break;

                case csRptEditCtrlType.image: //@@@: case csRptEditCtrlType.image:
                    ctrl.setControlType(csRptControlType.CSRPTCTIMAGE); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTIMAGE);
                    ctrl.getLabel().setText(m_fieldName); //@@@: ctrl.getLabel().setText(m_fieldName);
                    break; //@@@: break;

                case csRptEditCtrlType.chart: //@@@: case csRptEditCtrlType.chart:
                    ctrl.setControlType(csRptControlType.CSRPTCTCHART); //@@@: ctrl.setControlType(csRptControlType.CSRPTCTCHART);
                    ctrl.getLabel().setText(m_fieldName); //@@@: ctrl.getLabel().setText(m_fieldName);
                    break; //@@@: break;
            } //@@@: }

            aspect = ctrl.getLabel().getAspect(); //@@@: aspect = ctrl.getLabel().getAspect();
            aspect.setWidth(CTRL_WIDTH); //@@@: aspect.setWidth(CTRL_WIDTH);
            aspect.setHeight(ctrlHeigth); //@@@: aspect.setHeight(ctrlHeigth);
            aspect.setTransparent(transparent); //@@@: aspect.setTransparent(transparent);
        }; //@@@: }

        const pSetNewControlPosition = function(ctrl, left, top) { //@@@: private void pSetNewControlPosition(cReportControl ctrl, float left, float top) {
            let aspect = ctrl.getLabel().getAspect(); //@@@: cReportAspect aspect = ctrl.getLabel().getAspect();
            aspect.setLeft(left); //@@@: aspect.setLeft(left);
            aspect.setTop(top); //@@@: aspect.setTop(top);

            let paintObj = null; //@@@: cReportPaintObject paintObj = null;
            let paintType = csRptPaintObjType.CSRPTPAINTOBJBOX; //@@@: csRptPaintObjType paintType = csRptPaintObjType.CSRPTPAINTOBJBOX;

            if (ctrl.getControlType() === csRptControlType.CSRPTCTIMAGE //@@@: if (ctrl.getControlType() == csRptControlType.CSRPTCTIMAGE
                || ctrl.getControlType() === csRptControlType.CSRPTCTCHART) { //@@@: || ctrl.getControlType() == csRptControlType.CSRPTCTCHART) {
                paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE; //@@@: paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
            } //@@@: }

            paintObj = m_paint.getNewObject(paintType); //@@@: paintObj = m_paint.getNewObject(paintType);

            aspect = ctrl.getLabel().getAspect(); //@@@: aspect = ctrl.getLabel().getAspect();

            pCopyAspectToPaint(aspect, paintObj.getAspect()); //@@@: pCopyAspectToPaint(aspect, paintObj.getAspect());

            aspect.setLeft(left); //@@@: aspect.setLeft(left);
            aspect.setTop(top); //@@@: aspect.setTop(top);

            paintObj.setText(ctrl.getLabel().getText()); //@@@: paintObj.setText(ctrl.getLabel().getText());

            paintObj.setRptType(csRptSectionType.CONTROL); //@@@: paintObj.setRptType(csRptSectionType.CONTROL);

            paintObj.setTag(ctrl.getKey()); //@@@: paintObj.setTag(ctrl.getKey());
            ctrl.setKeyPaint(paintObj.getKey()); //@@@: ctrl.setKeyPaint(paintObj.getKey());

            // position the control in the desired section line
            //
            moveControl(paintObj.getKey()); //@@@: moveControl(paintObj.getKey());

            m_paint.drawObject(paintObj.getKey(), m_picReport.CreateGraphics()); //@@@: m_paint.drawObject(paintObj.getKey(), m_picReport.CreateGraphics());
        }; //@@@: }

        self.addGroup = function() { //@@@: public void addGroup() {
            pShowGroupProperties(null); //@@@: pShowGroupProperties(null);
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

        self.addSectionLine = function() { //@@@: public void addSectionLine() {
            let sec = null; //@@@: cReportSection sec = null;
            let aspect = null; //@@@: cReportAspect aspect = null;
            let isGroup = false; //@@@: bool isGroup = false;

            sec = pGetSection(isGroup); //@@@: sec = pGetSection(out isGroup);

            if (sec === null) { return; } //@@@: if (sec == null) { return; }

            switch (sec.getTypeSection()) { //@@@: switch (sec.getTypeSection()) {

                // in footers we add from top
                // it means that the first section line is the last one
                //
                case csRptSectionType.FOOTER: //@@@: case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER: //@@@: case csRptSectionType.MAIN_FOOTER:

                    aspect = sec.getSectionLines().add(null, "", 0).getAspect(); //@@@: aspect = sec.getSectionLines().add(null, "", 0).getAspect();
                    aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    aspect.setWidth(sec.getAspect().getWidth()); //@@@: aspect.setWidth(sec.getAspect().getWidth());

                    // for new sections the top is the top of the previous section
                    // plus cGlobals.C_HEIGHT_NEW_SECTION
                    //
                    aspect.setTop(sec.getSectionLines().item(0).getAspect().getTop() - cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setTop(sec.getSectionLines().item(0).getAspect().getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
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

            pAddSectionLinesAux(sec); //@@@: pAddSectionLinesAux(sec);

            // we reset this variable to zero
            //
            m_newSecLineOffSet = 0; //@@@: m_newSecLineOffSet = 0;
        }; //@@@: }

        const pAddSectionLinesAux = function(sec) { //@@@: private void pAddSectionLinesAux(cReportSection sec)
            let typeSecLn = csRptSectionType.CONTROL; //@@@: csRptSectionType typeSecLn = csRptSectionType.CONTROL;
            let aspect = null; //@@@: cReportAspect aspect = null;
            let maxBottom = 0; //@@@: float maxBottom = 0;
            let minBottom = 0; //@@@: float minBottom = 0;
            let index = 0; //@@@: int index = 0;
            let y = 0; //@@@: float y = 0;

            switch (sec.getTypeSection()) { //@@@: switch (sec.getTypeSection()) {
                case csRptSectionType.HEADER: //@@@: case csRptSectionType.HEADER:
                case csRptSectionType.MAIN_HEADER: //@@@: case csRptSectionType.MAIN_HEADER:

                    pMoveHeader(sec.getKey(), minBottom, maxBottom); //@@@: pMoveHeader(sec.getKey(), out minBottom, out maxBottom);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_HEADER; //@@@: typeSecLn = csRptSectionType.SECLN_HEADER;
                    index = sec.getSectionLines().count() - 2; //@@@: index = sec.getSectionLines().count() - 2;
                    break; //@@@: break;

                case csRptSectionType.DETAIL: //@@@: case csRptSectionType.DETAIL:
                case csRptSectionType.MAIN_DETAIL: //@@@: case csRptSectionType.MAIN_DETAIL:

                    pMoveDetails(sec.getKey(), minBottom, maxBottom); //@@@: pMoveDetails(sec.getKey(), out minBottom, out maxBottom);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_DETAIL; //@@@: typeSecLn = csRptSectionType.SECLN_DETAIL;
                    index = sec.getSectionLines().count() - 2; //@@@: index = sec.getSectionLines().count() - 2;
                    break; //@@@: break;

                case csRptSectionType.GROUP_HEADER: //@@@: case csRptSectionType.GROUP_HEADER:

                    pMoveGroupHeader(sec.getKey(), minBottom, maxBottom); //@@@: pMoveGroupHeader(sec.getKey(), out minBottom, out maxBottom);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_GROUPH; //@@@: typeSecLn = csRptSectionType.SECLN_GROUPH;
                    index = sec.getSectionLines().count() - 2; //@@@: index = sec.getSectionLines().count() - 2;
                    break; //@@@: break;

                case csRptSectionType.GROUP_FOOTER: //@@@: case csRptSectionType.GROUP_FOOTER:

                    pMoveGroupFooter(sec.getKey(), minBottom, maxBottom); //@@@: pMoveGroupFooter(sec.getKey(), out minBottom, out maxBottom);
                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop(); //@@@: y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_GROUPF; //@@@: typeSecLn = csRptSectionType.SECLN_GROUPF;
                    index = sec.getSectionLines().count() - 2; //@@@: index = sec.getSectionLines().count() - 2;
                    break; //@@@: break;

                case csRptSectionType.FOOTER: //@@@: case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER: //@@@: case csRptSectionType.MAIN_FOOTER:

                    aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
                    aspect.setTop(aspect.getTop() - cGlobals.C_HEIGHT_NEW_SECTION); //@@@: aspect.setTop(aspect.getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
                    pMoveFooter(sec.getKey(), minBottom, maxBottom); //@@@: pMoveFooter(sec.getKey(), out minBottom, out maxBottom);
                    m_offY = 0; //@@@: m_offY = 0;
                    y = aspect.getHeight() + aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION; //@@@: y = aspect.getHeight() + aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION;
                    typeSecLn = csRptSectionType.SECLN_FOOTER; //@@@: typeSecLn = csRptSectionType.SECLN_FOOTER;
                    index = 0; //@@@: index = 0;
                    break; //@@@: break;
            } //@@@: }
            // we add a paint object to all sectionlines except the last one
            // the last sectionline uses the paint object of the section
            //
            let secL = sec.getSectionLines().item(index); //@@@: cReportSectionLine secL = sec.getSectionLines().item(index);
            secL.setKeyPaint( //@@@: secL.setKeyPaint(
                paintSection(secL.getAspect(), //@@@: paintSection(secL.getAspect(),
                                secL.getKey(), //@@@: secL.getKey(),
                                sec.getTypeSection(), //@@@: sec.getTypeSection(),
                                C_SECTIONLINE + (sec.getSectionLines().count() - 2).ToString(), //@@@: C_SECTIONLINE + (sec.getSectionLines().count() - 2).ToString(),
                                true)); //@@@: true));

            // section line
            let po = m_paint.getPaintSections().item(secL.getKeyPaint()); //@@@: cReportPaintObject po = m_paint.getPaintSections().item(secL.getKeyPaint());
            po.setRptType(typeSecLn); //@@@: po.setRptType(typeSecLn);
            po.setRptKeySec(sec.getKey()); //@@@: po.setRptKeySec(sec.getKey());

            // section
            po = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: po = m_paint.getPaintSections().item(sec.getKeyPaint());
            po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString()); //@@@: po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString());

            moveSection(m_paint.getPaintSections().item(m_keyFocus), 0, y, minBottom, maxBottom, sec, false); //@@@: moveSection(m_paint.getPaintSections().item(m_keyFocus), 0, y, minBottom, maxBottom, sec, false);

            refreshBody(); //@@@: refreshBody();
            refreshRule(); //@@@: refreshRule();
        }; //@@@: }

        self.addSection = function(typeSection) { //@@@: public void addSection(csRptSectionType typeSection) {

            if (!m_editor.Visible) { //@@@: if (!m_editor.Visible)
                return; //@@@: return;

            let rptSection = null; //@@@: cReportSection rptSection = null;
            let topSec = null; //@@@: cReportSection topSec = null;
            let w_aspect = null; //@@@: cReportAspect w_aspect = null;
            let aspect = null; //@@@: cReportAspect aspect = null;
            let paintObj = null; //@@@: cReportPaintObject paintObj = null;

            let maxBottom = 0; //@@@: float maxBottom = 0;
            let minBottom = 0; //@@@: float minBottom = 0;
            let y = 0; //@@@: float y = 0;

            switch (typeSection) { //@@@: switch (typeSection) {
                case csRptSectionType.HEADER: //@@@: case csRptSectionType.HEADER:
                    let w_headers = m_report.getHeaders(); //@@@: cReportSections w_headers = m_report.getHeaders();
                    rptSection = w_headers.add(); //@@@: rptSection = w_headers.add();
                    rptSection.setName("H_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("H_" + rptSection.getIndex().ToString());
                    aspect = w_headers.item(w_headers.count() - 2).getAspect(); //@@@: aspect = w_headers.item(w_headers.count() - 2).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(0); //@@@: rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight()); //@@@: rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(), //@@@: rptSection.getKey(),
                                                        csRptSectionType.HEADER, //@@@: csRptSectionType.HEADER,
                                                        rptSection.getName(), //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

                    w_aspect = rptSection.getAspect(); //@@@: w_aspect = rptSection.getAspect();
                    moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()), //@@@: moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),
                                0, //@@@: 0,
                                w_aspect.getTop(), //@@@: w_aspect.getTop(),
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION, //@@@: w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                w_aspect.getTop() + rptSection.getAspect().getHeight(), //@@@: w_aspect.getTop() + rptSection.getAspect().getHeight(),
                                rptSection, //@@@: rptSection,
                                true); //@@@: true);
                    break; //@@@: break;

                case csRptSectionType.DETAIL: //@@@: case csRptSectionType.DETAIL:
                    break; //@@@: break;

                case csRptSectionType.GROUP_HEADER: //@@@: case csRptSectionType.GROUP_HEADER:

                    let w_groupsHeaders = m_report.getGroupsHeaders(); //@@@: cIReportGroupSections w_groupsHeaders = m_report.getGroupsHeaders();
                    rptSection = w_groupsHeaders.item(w_groupsHeaders.count() - 1); //@@@: rptSection = w_groupsHeaders.item(w_groupsHeaders.count() - 1);
                    rptSection.setName("G_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("G_" + rptSection.getIndex().ToString());

                    // the first group is next to the last header
                    //
                    if (w_groupsHeaders.count() === 1) { //@@@: if (w_groupsHeaders.count() == 1) {
                        topSec = m_report.getHeaders().item(m_report.getHeaders().count() - 1); //@@@: topSec = m_report.getHeaders().item(m_report.getHeaders().count() - 1);
                    } //@@@: }
                    else { //@@@: else {
                        topSec = w_groupsHeaders.item(w_groupsHeaders.count() - 2); //@@@: topSec = w_groupsHeaders.item(w_groupsHeaders.count() - 2);
                    } //@@@: }

                    w_aspect = topSec.getAspect(); //@@@: w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(0); //@@@: rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight()); //@@@: rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(), //@@@: rptSection.getKey(),
                                                        csRptSectionType.GROUP_HEADER, //@@@: csRptSectionType.GROUP_HEADER,
                                                        rptSection.getName(), //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

                    w_aspect = rptSection.getAspect(); //@@@: w_aspect = rptSection.getAspect();
                    moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()), //@@@: moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),
                                0, //@@@: 0,
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION, //@@@: w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                w_aspect.getTop(), //@@@: w_aspect.getTop(),
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION, //@@@: w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                rptSection, //@@@: rptSection,
                                true); //@@@: true);
                    break; //@@@: break;

                case csRptSectionType.GROUP_FOOTER: //@@@: case csRptSectionType.GROUP_FOOTER:

                    let w_groupsFooters = m_report.getGroupsFooters(); //@@@: cIReportGroupSections w_groupsFooters = m_report.getGroupsFooters();
                    rptSection = w_groupsFooters.item(0); //@@@: rptSection = w_groupsFooters.item(0);
                    rptSection.setName("G_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("G_" + rptSection.getIndex().ToString());

                    // all group footers are added to the top so at the
                    // beginning they are next to the detail section
                    //

                    topSec = m_report.getDetails().item(m_report.getDetails().count() - 1); //@@@: topSec = m_report.getDetails().item(m_report.getDetails().count() - 1);

                    w_aspect = topSec.getAspect(); //@@@: w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION); //@@@: rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight()); //@@@: rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(), //@@@: rptSection.getKey(),
                                                        csRptSectionType.GROUP_FOOTER, //@@@: csRptSectionType.GROUP_FOOTER,
                                                        rptSection.getName(), //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint()); //@@@: paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveGroupFooter(rptSection.getKey(), minBottom, maxBottom); //@@@: pMoveGroupFooter(rptSection.getKey(), out minBottom, out maxBottom);

                    m_offY = 0; //@@@: m_offY = 0;

                    w_aspect = rptSection.getAspect(); //@@@: w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION; //@@@: y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true); //@@@: moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break; //@@@: break;

                case csRptSectionType.FOOTER: //@@@: case csRptSectionType.FOOTER:
                    let w_footers = m_report.getFooters(); //@@@: cReportSections w_footers = m_report.getFooters();

                    // all footers are added to the beginning of the collection
                    //
                    rptSection = w_footers.add(null, "" , 0); //@@@: rptSection = w_footers.add(null, "" , 0);
                    rptSection.setName("F_" + rptSection.getIndex().ToString()); //@@@: rptSection.setName("F_" + rptSection.getIndex().ToString());

                    aspect = w_footers.item(1).getAspect(); //@@@: aspect = w_footers.item(1).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth()); //@@@: rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION); //@@@: rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(aspect.getTop()); //@@@: rptSection.getAspect().setTop(aspect.getTop());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), //@@@: rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(), //@@@: rptSection.getKey(),
                                                        csRptSectionType.FOOTER, //@@@: csRptSectionType.FOOTER,
                                                        rptSection.getName(), //@@@: rptSection.getName(),
                                                        false)); //@@@: false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint()); //@@@: paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveFooter(rptSection.getKey(), minBottom, maxBottom); //@@@: pMoveFooter(rptSection.getKey(), out minBottom, out maxBottom);

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
                m_report.getLaunchInfo().setObjPaint(new cReportPrint()); //@@@: m_report.getLaunchInfo().setObjPaint(new cReportPrint());
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
                let isNew = m_isNew || m_report.getName() === ""; //@@@: bool isNew = m_isNew || m_report.getName() == "";

                if (isNew) { //@@@: if (isNew) {
                    m_report.setName(m_name); //@@@: m_report.setName(m_name);
                } //@@@: }

                if (saveAs) { //@@@: if (saveAs) {
                    isNew = true; //@@@: isNew = true;
                } //@@@: }

                setZOrder(); //@@@: setZOrder();

                pValidateSectionAspect(); //@@@: pValidateSectionAspect();

                if (m_report.save(m_fmain.saveFileDialog, isNew)) { //@@@: if (m_report.save(m_fmain.saveFileDialog, isNew))
                    m_isNew = false; //@@@: m_isNew = false;
                    reLoadReport(); //@@@: reLoadReport();
                    cMainEditor.setDocActive(this); //@@@: cMainEditor.setDocActive(this);
                    return true; //@@@: return true;
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }

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

            m_isNew = true; //@@@: m_isNew = true;

            if (report !== null) { //@@@: if (report != null) {

                m_report = report; //@@@: m_report = report;

                pValidateSectionAspect(); //@@@: pValidateSectionAspect();
                reLoadReport(); //@@@: reLoadReport();

            } //@@@: }
            else { //@@@: else {

                m_report.setName("New report"); //@@@: m_report.setName("New report");

                m_paint.createPicture(m_picReport.CreateGraphics()); //@@@: m_paint.createPicture(m_picReport.CreateGraphics());
                refreshRule(); //@@@: refreshRule();

            } //@@@: }

            cMainEditor.setDocActive(this); //@@@: cMainEditor.setDocActive(this);
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

                    if (!m_report.load(m_fmain.openFileDialog)) { //@@@: if (!m_report.load(m_fmain.openFileDialog)) {

                        if (m_report.getName() === "") { //@@@: if (m_report.getName() == "")
                            return false; //@@@: return false;
                    } //@@@: }

                } //@@@: }
                else { //@@@: else {

                    if (!m_report.loadSilent(fileName)) { //@@@: if (!m_report.loadSilent(fileName)) {
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }

                reLoadReport(); //@@@: reLoadReport();

                Application.DoEvents(); //@@@: Application.DoEvents();

                cMainEditor.setDocActive(this); //@@@: cMainEditor.setDocActive(this);

                m_opening = false; //@@@: m_opening = false;

                // Testing
                //

                //m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

                //var bmp = m_paint.getBitmap();
/* //@@@: /*
                var g = Graphics.FromImage(bmp);
                var graph = m_picReport.CreateGraphics();

                System.Drawing.Rectangle rect = new System.Drawing.Rectangle(0, 0, (int)graph.VisibleClipBounds.Width, (int)graph.VisibleClipBounds.Height + 56); // TODO check why 56 ???
                Brush brush = new SolidBrush(Color.Red);
                g.FillRectangle(brush, rect);
                brush.Dispose();

                var b = new SolidBrush(Color.Black);
                g.FillRectangle(b, new RectangleF(0,0,10,10));
                g.FillRectangle(b, new RectangleF(100,100, 10, 10));

                Brush bg = new System.Drawing.Drawing2D.HatchBrush(
                                            System.Drawing.Drawing2D.HatchStyle.DottedGrid,
                                            Color.FromArgb(0xC0C0C0),
                                            Color.White);

                g.FillRectangle(bg, new RectangleF(200, 100, 100, 100));



                b.Dispose();
                bg.Dispose();
                graph.Dispose();
                g.Dispose();
 */
                //m_picReport.Image = bmp;

                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex) {
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                mouse.Dispose(); //@@@: mouse.Dispose();
            } //@@@: }
        }; //@@@: }

        self.saveChanges = function() { //@@@: public bool saveChanges() {
UNKNOWN >>             csAskEditResult rslt; //@@@: csAskEditResult rslt;

            if (m_dataHasChanged) { //@@@: if (m_dataHasChanged) {

                rslt = askEdit("Do you want to save changes to " + m_reportFullPath + "?", "CSReportEditor"); //@@@: rslt = askEdit("Do you want to save changes to " + m_reportFullPath + "?", "CSReportEditor");

                switch (rslt) { //@@@: switch (rslt) {
                    case csAskEditResult.CSASKRSLTYES: //@@@: case csAskEditResult.CSASKRSLTYES:
                        if (!saveDocument(false)) { //@@@: if (!saveDocument(false))
                            return false; //@@@: return false;
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
                                        msg, title, //@@@: msg, title,
                                        MessageBoxButtons.YesNoCancel, //@@@: MessageBoxButtons.YesNoCancel,
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

        self.showHelpDbField = function() { //@@@: public bool showHelpDbField() {
            return pShowHelpDbField(m_fProperties); //@@@: return pShowHelpDbField(m_fProperties);
        }; //@@@: }

        self.showHelpDbFieldForGroup = function() { //@@@: public bool showHelpDbFieldForGroup() {
            return pShowHelpDbField(m_fGroup); //@@@: return pShowHelpDbField(m_fGroup);
        }; //@@@: }

        const pShowHelpDbField = function(f) { //@@@: private bool pShowHelpDbField(cIDatabaseFieldSelector f) {
            let nIndex = 0; //@@@: int nIndex = 0;
            let nFieldType = 0; //@@@: int nFieldType = 0;
            let sField = ""; //@@@: String sField = "";

            sField = f.txDbField.Text; //@@@: sField = f.txDbField.Text;
            nFieldType = f.getFieldType(); //@@@: nFieldType = f.getFieldType();
            nIndex = f.getIndex(); //@@@: nIndex = f.getIndex();

            if (cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { //@@@: if (cGlobals.showDbFields(ref sField, ref nFieldType, ref nIndex, this))
                f.txDbField.Text = sField; //@@@: f.txDbField.Text = sField;
                f.setFieldType(nFieldType); //@@@: f.setFieldType(nFieldType);
                f.setIndex(nIndex); //@@@: f.setIndex(nIndex);

                if(f is fProperties) { //@@@: if(f is fProperties) {
                    .txText.Text = sField; //@@@: (f as fProperties).txText.Text = sField;
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                return false; //@@@: return false;
            } //@@@: }
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

            pShowGroupProperties(group); //@@@: pShowGroupProperties(group);

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        const pShowGroupProperties = function(group) { //@@@: private void pShowGroupProperties(cReportGroup group)

            try { //@@@: try {

                let isNew = false; //@@@: bool isNew = false;

                m_showingProperties = true; //@@@: m_showingProperties = true;

                if (m_fGroup === null) { m_fGroup = new fGroup(); } //@@@: if (m_fGroup == null) { m_fGroup = new fGroup(); }

                m_fGroup.setHandler(this); //@@@: m_fGroup.setHandler(this);

                if (group === null) { isNew = true; } //@@@: if (group == null) { isNew = true; }

                if (isNew) { //@@@: if (isNew) {
                    m_fGroup.txName.Text = "Group" + m_report.getGroups().count() + 1; //@@@: m_fGroup.txName.Text = "Group" + m_report.getGroups().count() + 1;
                } //@@@: }
                else { //@@@: else {
                    m_fGroup.txName.Text = group.getName(); //@@@: m_fGroup.txName.Text = group.getName();
                    m_fGroup.txDbField.Text = group.getFieldName(); //@@@: m_fGroup.txDbField.Text = group.getFieldName();

                    if (group.getOderType() === csRptGrpOrderType.CSRPTGRPASC) { //@@@: if (group.getOderType() == csRptGrpOrderType.CSRPTGRPASC) {
                      m_fGroup.opAsc.Checked = true; //@@@: m_fGroup.opAsc.Checked = true;
                    } //@@@: }
                    else { //@@@: else {
                      m_fGroup.opDesc.Checked = true; //@@@: m_fGroup.opDesc.Checked = true;
                    } //@@@: }

                    m_fGroup.chkPrintInNewPage.Checked = group.getPrintInNewPage(); //@@@: m_fGroup.chkPrintInNewPage.Checked = group.getPrintInNewPage();
                    m_fGroup.chkReprintGroup.Checked = group.getRePrintInNewPage(); //@@@: m_fGroup.chkReprintGroup.Checked = group.getRePrintInNewPage();
                    m_fGroup.chkGrandTotal.Checked = group.getGrandTotalGroup(); //@@@: m_fGroup.chkGrandTotal.Checked = group.getGrandTotalGroup();

                    switch (group.getComparisonType()) { //@@@: switch (group.getComparisonType()) {
                      case  csRptGrpComparisonType.CSRPTGRPDATE: //@@@: case  csRptGrpComparisonType.CSRPTGRPDATE:
                        m_fGroup.opDate.Checked = true; //@@@: m_fGroup.opDate.Checked = true;
                        break; //@@@: break;

                      case  csRptGrpComparisonType.CSRPTGRPNUMBER: //@@@: case  csRptGrpComparisonType.CSRPTGRPNUMBER:
                        m_fGroup.opNumber.Checked = true; //@@@: m_fGroup.opNumber.Checked = true;
                        break; //@@@: break;

                      case  csRptGrpComparisonType.CSRPTGRPTEXT: //@@@: case  csRptGrpComparisonType.CSRPTGRPTEXT:
                        m_fGroup.opText.Checked = true; //@@@: m_fGroup.opText.Checked = true;
                        break; //@@@: break;
                    } //@@@: }
                } //@@@: }

                m_fGroup.lbGroup.Text = "Group: " + m_fGroup.txName.Text; //@@@: m_fGroup.lbGroup.Text = "Group: " + m_fGroup.txName.Text;

                m_fGroup.ShowDialog(); //@@@: m_fGroup.ShowDialog();

                if (m_fGroup.getOk()) { //@@@: if (m_fGroup.getOk())

                    if (isNew) { //@@@: if (isNew)
                        group = m_report.getGroups().add(null, ""); //@@@: group = m_report.getGroups().add(null, "");
                    } //@@@: }

                    group.setName(m_fGroup.txName.Text); //@@@: group.setName(m_fGroup.txName.Text);
                    group.setFieldName(m_fGroup.txDbField.Text); //@@@: group.setFieldName(m_fGroup.txDbField.Text);

                    group.setIndex(m_report.getGroups().Count); //@@@: group.setIndex(m_report.getGroups().Count);
                    group.setOderType(m_fGroup.opAsc.Checked ? csRptGrpOrderType.CSRPTGRPASC : csRptGrpOrderType.CSRPTGRPDESC); //@@@: group.setOderType(m_fGroup.opAsc.Checked ? csRptGrpOrderType.CSRPTGRPASC : csRptGrpOrderType.CSRPTGRPDESC);

                    group.setPrintInNewPage(m_fGroup.chkPrintInNewPage.Checked); //@@@: group.setPrintInNewPage(m_fGroup.chkPrintInNewPage.Checked);
                    group.setRePrintInNewPage(m_fGroup.chkReprintGroup.Checked); //@@@: group.setRePrintInNewPage(m_fGroup.chkReprintGroup.Checked);
                    group.setGrandTotalGroup(m_fGroup.chkGrandTotal.Checked); //@@@: group.setGrandTotalGroup(m_fGroup.chkGrandTotal.Checked);

                    if (m_fGroup.opDate.Checked) { //@@@: if (m_fGroup.opDate.Checked)
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPDATE); //@@@: group.setComparisonType(csRptGrpComparisonType.CSRPTGRPDATE);
                    } //@@@: }
                    else if (m_fGroup.opNumber.Checked) { //@@@: else if (m_fGroup.opNumber.Checked)
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPNUMBER); //@@@: group.setComparisonType(csRptGrpComparisonType.CSRPTGRPNUMBER);
                    } //@@@: }
                    else if (m_fGroup.opText.Checked) { //@@@: else if (m_fGroup.opText.Checked)
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPTEXT); //@@@: group.setComparisonType(csRptGrpComparisonType.CSRPTGRPTEXT);
                    } //@@@: }

                    if (isNew) { //@@@: if (isNew)
                        addSection(csRptSectionType.GROUP_HEADER); //@@@: addSection(csRptSectionType.GROUP_HEADER);
                        addSection(csRptSectionType.GROUP_FOOTER); //@@@: addSection(csRptSectionType.GROUP_FOOTER);
                    } //@@@: }

                    m_dataHasChanged = true; //@@@: m_dataHasChanged = true;
                } //@@@: }

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "showGroupProperties", C_MODULE, ""); //@@@: cError.mngError(ex, "showGroupProperties", C_MODULE, "");
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                m_showingProperties = false; //@@@: m_showingProperties = false;
                if (m_fGroup !== null) { //@@@: if (m_fGroup != null)
                    m_fGroup.Close(); //@@@: m_fGroup.Close();
                    m_fGroup = null; //@@@: m_fGroup = null;
                } //@@@: }
            } //@@@: }
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

            pShowSecProperties(secLn, sec.getName() + " - line " + secLn.getIndex().ToString()); //@@@: pShowSecProperties(secLn, sec.getName() + " - line " + secLn.getIndex().ToString());

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        const pShowSecProperties = function(sec) { //@@@: private void pShowSecProperties(cIReportSection sec)
            pShowSecProperties(sec, ""); //@@@: pShowSecProperties(sec, "");
        }; //@@@: }

        const pShowSecProperties = function(sec, secLnName) { //@@@: private void pShowSecProperties(cIReportSection sec, String secLnName) {
            try { //@@@: try {

                m_showingProperties = true; //@@@: m_showingProperties = true;

                if (m_fSecProperties === null) { //@@@: if (m_fSecProperties == null) {
                    m_fSecProperties = new fSecProperties(); //@@@: m_fSecProperties = new fSecProperties();
                } //@@@: }

                m_fSecProperties.setHandler(this); //@@@: m_fSecProperties.setHandler(this);

                m_fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide(); //@@@: m_fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide();
                m_fSecProperties.setFormulaHide(sec.getFormulaHide().getText()); //@@@: m_fSecProperties.setFormulaHide(sec.getFormulaHide().getText());

                if (sec is cReportSectionLine) { //@@@: if (sec is cReportSectionLine) {
                    m_fSecProperties.txName.Enabled = false; //@@@: m_fSecProperties.txName.Enabled = false;
                } //@@@: }

                m_fSecProperties.txName.Text = sec is cReportSectionLine ? secLnName : sec.getName(); //@@@: m_fSecProperties.txName.Text = sec is cReportSectionLine ? secLnName : sec.getName();

                m_fSecProperties.lbSectionName.Text = "Section: " + (sec is cReportSectionLine ? secLnName : sec.getName()); //@@@: m_fSecProperties.lbSectionName.Text = "Section: " + (sec is cReportSectionLine ? secLnName : sec.getName());

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

            let paintObj = m_paint.getPaintSections().item(m_keyFocus); //@@@: cReportPaintObject paintObj = m_paint.getPaintSections().item(m_keyFocus);

            // nothing to do
            //
            if (paintObj === null) { return null; } //@@@: if (paintObj == null) { return null; }

            sec = m_report.getHeaders().item(paintObj.getTag()); //@@@: sec = m_report.getHeaders().item(paintObj.getTag());
            if (sec !== null) { //@@@: if (sec != null) {

                // it's a header
            } //@@@: }
            else { //@@@: else {
                sec = m_report.getFooters().item(paintObj.getTag()); //@@@: sec = m_report.getFooters().item(paintObj.getTag());
                if (sec !== null) { //@@@: if (sec != null) {

                    // it's a footer
                } //@@@: }
                else { //@@@: else {

                    // check if it is a group
                    //
                    sec = m_report.getGroupsHeaders().item(paintObj.getTag()); //@@@: sec = m_report.getGroupsHeaders().item(paintObj.getTag());
                    if (sec !== null) { //@@@: if (sec != null) {

                        // it's a group
                        //
                        isGroup = true; //@@@: isGroup = true;
                        isGroupHeader = true; //@@@: isGroupHeader = true;

                    } //@@@: }
                    else { //@@@: else {
                        sec = m_report.getGroupsFooters().item(paintObj.getTag()); //@@@: sec = m_report.getGroupsFooters().item(paintObj.getTag());
                        if (sec !== null) { //@@@: if (sec != null) {

                            // it's a group
                            //
                            isGroup = true; //@@@: isGroup = true;
                            isGroupFooter = true; //@@@: isGroupFooter = true;

                        } //@@@: }
                        else { //@@@: else {
                            // check if it is a detail
                            //
                            sec = m_report.getDetails().item(paintObj.getTag()); //@@@: sec = m_report.getDetails().item(paintObj.getTag());
                            if (sec !== null) { //@@@: if (sec != null) {

                                // it's a detail
                            } //@@@: }
                            else { //@@@: else {

                                // it's a line

                                isSecLn = true; //@@@: isSecLn = true;

                                switch (paintObj.getRptType()) { //@@@: switch (paintObj.getRptType()) {
                                    case csRptSectionType.SECLN_HEADER: //@@@: case csRptSectionType.SECLN_HEADER:
                                        sec = m_report.getHeaders().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getHeaders().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptSectionType.SECLN_DETAIL: //@@@: case csRptSectionType.SECLN_DETAIL:
                                        sec = m_report.getDetails().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getDetails().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptSectionType.SECLN_FOOTER: //@@@: case csRptSectionType.SECLN_FOOTER:
                                        sec = m_report.getFooters().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getFooters().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptSectionType.SECLN_GROUPH: //@@@: case csRptSectionType.SECLN_GROUPH:
                                        sec = m_report.getGroupsHeaders().item(paintObj.getRptKeySec()); //@@@: sec = m_report.getGroupsHeaders().item(paintObj.getRptKeySec());
                                        break; //@@@: break;
                                    case csRptSectionType.SECLN_GROUPF: //@@@: case csRptSectionType.SECLN_GROUPF:
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
                secLn = sec.getSectionLines().item(sec.getSectionLines().count()-1); //@@@: secLn = sec.getSectionLines().item(sec.getSectionLines().count()-1);
                isSecLn = true; //@@@: isSecLn = true;
            } //@@@: }

            return sec; //@@@: return sec;
        }; //@@@: }

        self.showProperties = function(key) { //@@@: public void showProperties(string key)
            if ("SL".IndexOf(cUtil.subString(key, 0, 1)) !== -1) { //@@@: if ("SL".IndexOf(cUtil.subString(key, 0, 1)) != -1)
                let bIsSecLn = false; //@@@: bool bIsSecLn = false;
                pSelectSection(key.Substring(1), bIsSecLn); //@@@: pSelectSection(key.Substring(1), out bIsSecLn);

                if (bIsSecLn) { //@@@: if (bIsSecLn)
                    showSecLnProperties(); //@@@: showSecLnProperties();
                } //@@@: }
                else { //@@@: else
                    showProperties(); //@@@: showProperties();
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                selectCtrl(key); //@@@: selectCtrl(key);
                showProperties(); //@@@: showProperties();
            } //@@@: }
        }; //@@@: }

        self.showProperties = function() { //@@@: public void showProperties() {
            if (m_keyFocus === "") { return; } //@@@: if (m_keyFocus == "") { return; }

            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();

            if (m_paint.paintObjIsSection(m_keyFocus)) { //@@@: if (m_paint.paintObjIsSection(m_keyFocus)) {
                showSectionProperties(); //@@@: showSectionProperties();
            } //@@@: }
            else { //@@@: else {
                m_keyObj = m_keyFocus; //@@@: m_keyObj = m_keyFocus;
                showCtrlProperties(); //@@@: showCtrlProperties();
            } //@@@: }

            refreshAll(); //@@@: refreshAll();
        }; //@@@: }

        const showCtrlProperties = function() { //@@@: private void showCtrlProperties() {
            try { //@@@: try {

                let paintObject = null; //@@@: cReportPaintObject paintObject = null;
                let rptCtrl = null; //@@@: cReportControl rptCtrl = null;
                let w_aspect = null; //@@@: cReportAspect w_aspect = null;
                let w_font = null; //@@@: cReportFont w_font = null;
                let bMultiSelect = false; //@@@: bool bMultiSelect = false;

                m_showingProperties = true; //@@@: m_showingProperties = true;

                if (m_fProperties === null) { //@@@: if (m_fProperties == null) {
                    m_fProperties = new fProperties(); //@@@: m_fProperties = new fProperties();
                } //@@@: }

                m_fProperties.setHandler(this); //@@@: m_fProperties.setHandler(this);

                paintObject = m_paint.getPaintObject(m_keyObj); //@@@: paintObject = m_paint.getPaintObject(m_keyObj);
                if (paintObject === null) { return; } //@@@: if (paintObject == null) { return; }

                m_fProperties.txText.Text = paintObject.getText(); //@@@: m_fProperties.txText.Text = paintObject.getText();
                rptCtrl = m_report.getControls().item(paintObject.getTag()); //@@@: rptCtrl = m_report.getControls().item(paintObject.getTag());

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTIMAGE) { //@@@: if (rptCtrl.getControlType() != csRptControlType.CSRPTCTIMAGE)
                    m_fProperties.hideTabImage(); //@@@: m_fProperties.hideTabImage();
                } //@@@: }
                else { //@@@: else {
                    m_fProperties.picImage.Image = rptCtrl.getImage().getImage(); //@@@: m_fProperties.picImage.Image = rptCtrl.getImage().getImage();
                } //@@@: }

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTCHART) { //@@@: if (rptCtrl.getControlType() != csRptControlType.CSRPTCTCHART) {
                    m_fProperties.hideTabChart(); //@@@: m_fProperties.hideTabChart();
                } //@@@: }
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
                        m_fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(0).getLabelFieldName(); //@@@: m_fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(0).getLabelFieldName();
                        m_fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(0).getValueFieldName(); //@@@: m_fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(0).getValueFieldName();

                        m_fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(0).getLabelIndex()); //@@@: m_fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(0).getLabelIndex());
                        m_fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(0).getValueIndex()); //@@@: m_fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(0).getValueIndex());

                        cUtil.listSetListIndexForId(m_fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(0).getColor()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(0).getColor());

                        if (rptCtrl.getChart().getSeries().count() > 1) { //@@@: if (rptCtrl.getChart().getSeries().count() > 1) {
                            m_fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName(); //@@@: m_fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName();
                            m_fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName(); //@@@: m_fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName();

                            m_fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(1).getLabelIndex()); //@@@: m_fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                            m_fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(1).getValueIndex()); //@@@: m_fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                            cUtil.listSetListIndexForId(m_fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(1).getColor()); //@@@: cUtil.listSetListIndexForId(m_fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(1).getColor());
                        } //@@@: }
                    } //@@@: }
                } //@@@: }

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD //@@@: if (rptCtrl.getControlType() == csRptControlType.CSRPTCTFIELD
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) { //@@@: || rptCtrl.getControlType() == csRptControlType.CSRPTCTDBIMAGE) {
                    m_fProperties.txText.Enabled = false; //@@@: m_fProperties.txText.Enabled = false;
                    let w_field = rptCtrl.getField(); //@@@: cReportField w_field = rptCtrl.getField();
                    m_fProperties.txText.Text = w_field.getName(); //@@@: m_fProperties.txText.Text = w_field.getName();
                    m_fProperties.txDbField.Text = w_field.getName(); //@@@: m_fProperties.txDbField.Text = w_field.getName();
                    m_fProperties.setFieldType(w_field.getFieldType()); //@@@: m_fProperties.setFieldType(w_field.getFieldType());
                    m_fProperties.setIndex(w_field.getIndex()); //@@@: m_fProperties.setIndex(w_field.getIndex());
                } //@@@: }
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
                m_fProperties.shForeColor.BackColor = cColor.colorFromRGB(w_font.getForeColor()); //@@@: m_fProperties.shForeColor.BackColor = cColor.colorFromRGB(w_font.getForeColor());
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
                m_fProperties.shBackColor.BackColor = cColor.colorFromRGB(w_aspect.getBackColor()); //@@@: m_fProperties.shBackColor.BackColor = cColor.colorFromRGB(w_aspect.getBackColor());
                m_fProperties.chkTransparent.Checked = w_aspect.getTransparent(); //@@@: m_fProperties.chkTransparent.Checked = w_aspect.getTransparent();

                bMultiSelect = m_vSelectedKeys.Length > 1; //@@@: bMultiSelect = m_vSelectedKeys.Length > 1;

                m_fProperties.resetChangedFlags(); //@@@: m_fProperties.resetChangedFlags();

                m_fProperties.ShowDialog(); //@@@: m_fProperties.ShowDialog();

                if (!m_fProperties.getOk()) { return; } //@@@: if (!m_fProperties.getOk()) { return; }

                for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {

                    paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    rptCtrl = m_report.getControls().item(paintObject.getTag()); //@@@: rptCtrl = m_report.getControls().item(paintObject.getTag());

                    if (!bMultiSelect) { //@@@: if (!bMultiSelect) {
                        if (rptCtrl.getName() !== m_fProperties.txName.Text) { //@@@: if (rptCtrl.getName() != m_fProperties.txName.Text) {
                            if (rptCtrl.getName() !== "") { //@@@: if (rptCtrl.getName() != "") {
                                if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", MessageBoxDefaultButton.Button2)) { //@@@: if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", MessageBoxDefaultButton.Button2))
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
                    if (m_fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(cUtil.valAsInt(m_fProperties.txIdxGroup.Text)); } //@@@: if (m_fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(cUtil.valAsInt(m_fProperties.txIdxGroup.Text)); }
                    if (m_fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(m_fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); } //@@@: if (m_fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(m_fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); }

                    if (m_fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(cUtil.valAsInt(m_fProperties.txExportColIdx.Text)); } //@@@: if (m_fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(cUtil.valAsInt(m_fProperties.txExportColIdx.Text)); }
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
                        rptCtrl.getImage().setImage(new Bitmap(m_fProperties.picImage.Image)); //@@@: rptCtrl.getImage().setImage(new Bitmap(m_fProperties.picImage.Image));
                    } //@@@: }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) { //@@@: if (rptCtrl.getControlType() == csRptControlType.CSRPTCTCHART) {

                        if (rptCtrl.getChart().getSeries().count() < 1) { //@@@: if (rptCtrl.getChart().getSeries().count() < 1) {
                            rptCtrl.getChart().getSeries().add(); //@@@: rptCtrl.getChart().getSeries().add();
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
                            rptCtrl.getChart().setTop(cUtil.valAsInt(m_fProperties.txChartTop.Text)); //@@@: rptCtrl.getChart().setTop(cUtil.valAsInt(m_fProperties.txChartTop.Text));
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
                            rptCtrl.getChart().getSeries().item(0).setLabelFieldName(m_fProperties.txDbFieldLbl1.Text); //@@@: rptCtrl.getChart().getSeries().item(0).setLabelFieldName(m_fProperties.txDbFieldLbl1.Text);
                            rptCtrl.getChart().getSeries().item(0).setLabelIndex(m_fProperties.getChartIndex(0)); //@@@: rptCtrl.getChart().getSeries().item(0).setLabelIndex(m_fProperties.getChartIndex(0));
                        } //@@@: }
                        if (m_fProperties.getChartFieldVal1Changed()) { //@@@: if (m_fProperties.getChartFieldVal1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setValueFieldName(m_fProperties.txDbFieldVal1.Text); //@@@: rptCtrl.getChart().getSeries().item(0).setValueFieldName(m_fProperties.txDbFieldVal1.Text);
                            rptCtrl.getChart().getSeries().item(0).setValueIndex(m_fProperties.getChartIndex(1)); //@@@: rptCtrl.getChart().getSeries().item(0).setValueIndex(m_fProperties.getChartIndex(1));
                        } //@@@: }

                        if (m_fProperties.getChartColorSerie1Changed()) { //@@@: if (m_fProperties.getChartColorSerie1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setColor(cUtil.listID(m_fProperties.cbColorSerie1)); //@@@: rptCtrl.getChart().getSeries().item(0).setColor((csColors)cUtil.listID(m_fProperties.cbColorSerie1));
                        } //@@@: }

                        if (m_fProperties.getChartFieldLbl2Changed() || m_fProperties.getChartFieldVal2Changed()) { //@@@: if (m_fProperties.getChartFieldLbl2Changed() || m_fProperties.getChartFieldVal2Changed()) {
                            if (rptCtrl.getChart().getSeries().count() < 2) { //@@@: if (rptCtrl.getChart().getSeries().count() < 2) {
                                rptCtrl.getChart().getSeries().add(); //@@@: rptCtrl.getChart().getSeries().add();
                            } //@@@: }
                        } //@@@: }

                        if (m_fProperties.txDbFieldLbl2.Text === "" || m_fProperties.txDbFieldVal2.Text === "") { //@@@: if (m_fProperties.txDbFieldLbl2.Text == "" || m_fProperties.txDbFieldVal2.Text == "") {
                            if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(1); } //@@@: if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(1); }
                        } //@@@: }

                        if (rptCtrl.getChart().getSeries().count() > 1) { //@@@: if (rptCtrl.getChart().getSeries().count() > 1) {

                            if (m_fProperties.getChartFieldLbl2Changed()) { //@@@: if (m_fProperties.getChartFieldLbl2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setLabelFieldName(m_fProperties.txDbFieldLbl2.Text); //@@@: rptCtrl.getChart().getSeries().item(1).setLabelFieldName(m_fProperties.txDbFieldLbl2.Text);
                                rptCtrl.getChart().getSeries().item(1).setLabelIndex(m_fProperties.getChartIndex(2)); //@@@: rptCtrl.getChart().getSeries().item(1).setLabelIndex(m_fProperties.getChartIndex(2));
                            } //@@@: }
                            if (m_fProperties.getChartFieldVal2Changed()) { //@@@: if (m_fProperties.getChartFieldVal2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setValueFieldName(m_fProperties.txDbFieldVal2.Text); //@@@: rptCtrl.getChart().getSeries().item(1).setValueFieldName(m_fProperties.txDbFieldVal2.Text);
                                rptCtrl.getChart().getSeries().item(1).setValueIndex(m_fProperties.getChartIndex(3)); //@@@: rptCtrl.getChart().getSeries().item(1).setValueIndex(m_fProperties.getChartIndex(3));
                            } //@@@: }

                            if (m_fProperties.getChartColorSerie2Changed()) { //@@@: if (m_fProperties.getChartColorSerie2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setColor(cUtil.listID(m_fProperties.cbColorSerie2)); //@@@: rptCtrl.getChart().getSeries().item(1).setColor((csColors)cUtil.listID(m_fProperties.cbColorSerie2));
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }

                    if (m_fProperties.getTextChanged()) { paintObject.setText(m_fProperties.txText.Text); } //@@@: if (m_fProperties.getTextChanged()) { paintObject.setText(m_fProperties.txText.Text); }

                    w_aspect = rptCtrl.getLabel().getAspect(); //@@@: w_aspect = rptCtrl.getLabel().getAspect();
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cUtil.val(m_fProperties.txLeft.Text)); } //@@@: if (m_fProperties.getLeftChanged()) { w_aspect.setLeft((float)cUtil.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cUtil.val(m_fProperties.txTop.Text)); } //@@@: if (m_fProperties.getTopChanged()) { w_aspect.setTop((float)cUtil.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cUtil.val(m_fProperties.txWidth.Text)); } //@@@: if (m_fProperties.getWidthChanged()) { w_aspect.setWidth((float)cUtil.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cUtil.val(m_fProperties.txHeight.Text)); } //@@@: if (m_fProperties.getHeightChanged()) { w_aspect.setHeight((float)cUtil.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(m_fProperties.txBackColor.Text)); } //@@@: if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(m_fProperties.txBackColor.Text)); }
                    if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); } //@@@: if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); }
                    if (m_fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(m_fProperties.cbAlign)); } //@@@: if (m_fProperties.getAlignChanged()) { w_aspect.setAlign((CSReportGlobals.HorizontalAlignment)cUtil.listID(m_fProperties.cbAlign)); }
                    if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); } //@@@: if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); }
                    if (m_fProperties.getSymbolChanged()) { //@@@: if (m_fProperties.getSymbolChanged()) {
                        w_aspect.setSymbol(m_fProperties.txSymbol.Text); //@@@: w_aspect.setSymbol(m_fProperties.txSymbol.Text);
                        w_aspect.setIsAccounting(m_fProperties.getIsAccounting()); //@@@: w_aspect.setIsAccounting(m_fProperties.getIsAccounting());
                    } //@@@: }
                    if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); } //@@@: if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); }
                    if (m_fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(m_fProperties.chkCanGrow.Checked); } //@@@: if (m_fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(m_fProperties.chkCanGrow.Checked); }

                    if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(m_fProperties.txBorderColor.Text)); } //@@@: if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(m_fProperties.txBorderColor.Text)); }
                    if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(m_fProperties.txBorder3D.Text)); } //@@@: if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(m_fProperties.txBorder3D.Text)); }
                    if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(m_fProperties.txBorderShadow.Text)); } //@@@: if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(m_fProperties.txBorderShadow.Text)); }
                    if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); } //@@@: if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                    if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(m_fProperties.txBorderWidth.Text)); } //@@@: if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(m_fProperties.txBorderWidth.Text)); }
                    if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(m_fProperties.cbBorderType)); } //@@@: if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType((csReportBorderType)cUtil.listID(m_fProperties.cbBorderType)); }

                    w_font = w_aspect.getFont(); //@@@: w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); } //@@@: if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(m_fProperties.txForeColor.Text)); } //@@@: if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cUtil.val(m_fProperties.txFontSize.Text)); } //@@@: if (m_fProperties.getFontSizeChanged()) { w_font.setSize((float)cUtil.val(m_fProperties.txFontSize.Text)); }
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
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cUtil.val(m_fProperties.txLeft.Text)); } //@@@: if (m_fProperties.getLeftChanged()) { w_aspect.setLeft((float)cUtil.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cUtil.val(m_fProperties.txTop.Text)); } //@@@: if (m_fProperties.getTopChanged()) { w_aspect.setTop((float)cUtil.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cUtil.val(m_fProperties.txWidth.Text)); } //@@@: if (m_fProperties.getWidthChanged()) { w_aspect.setWidth((float)cUtil.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cUtil.val(m_fProperties.txHeight.Text)); } //@@@: if (m_fProperties.getHeightChanged()) { w_aspect.setHeight((float)cUtil.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(m_fProperties.txBackColor.Text)); } //@@@: if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(m_fProperties.txBackColor.Text)); }
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
                    } //@@@: }
                    else { //@@@: else {
                        if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(m_fProperties.txBorderColor.Text)); } //@@@: if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(m_fProperties.txBorderColor.Text)); }
                        if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(m_fProperties.txBorder3D.Text)); } //@@@: if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(m_fProperties.txBorder3D.Text)); }
                        if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(m_fProperties.txBorderShadow.Text)); } //@@@: if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(m_fProperties.txBorderShadow.Text)); }
                        if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); } //@@@: if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                        if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(m_fProperties.txBorderWidth.Text)); } //@@@: if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(m_fProperties.txBorderWidth.Text)); }
                    } //@@@: }

                    w_font = w_aspect.getFont(); //@@@: w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); } //@@@: if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(m_fProperties.txForeColor.Text)); } //@@@: if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cUtil.val(m_fProperties.txFontSize.Text)); } //@@@: if (m_fProperties.getFontSizeChanged()) { w_font.setSize((float)cUtil.val(m_fProperties.txFontSize.Text)); }
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
            m_picReport.Focus(); //@@@: m_picReport.Focus();
            m_draging = true; //@@@: m_draging = true;
            m_picReport.Cursor = new Cursor("Resources" + Path.DirectorySeparatorChar + "move32x32.cur"); //@@@: m_picReport.Cursor = new Cursor("Resources" + Path.DirectorySeparatorChar + "move32x32.cur");
        }; //@@@: }

        const endDraging = function() { //@@@: private void endDraging() {
            m_draging = false; //@@@: m_draging = false;
            m_controlType = csRptEditCtrlType.none; //@@@: m_controlType = csRptEditCtrlType.none;
            m_picReport.Cursor = Cursors.Default; //@@@: m_picReport.Cursor = Cursors.Default;
        }; //@@@: }

        self.showToolbox = function() { //@@@: public void showToolbox() {

            let f = cMainEditor.getToolbox(this); //@@@: fToolbox f = cMainEditor.getToolbox(this);

            f.clear(); //@@@: f.clear();

            pAddColumnsToToolbox(m_report.getConnect().getDataSource(), m_report.getConnect().getColumns(), f); //@@@: pAddColumnsToToolbox(m_report.getConnect().getDataSource(), m_report.getConnect().getColumns(), f);

            for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
                let connect = m_report.getConnectsAux().item(_i); //@@@: cReportConnect connect = m_report.getConnectsAux().item(_i);
                pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns(), f); //@@@: pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns(), f);
            } //@@@: }

            for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++) {
                let ctrl = m_report.getControls().item(_i); //@@@: cReportControl ctrl = m_report.getControls().item(_i);
                if (cDatabaseGlobals.isNumberField(ctrl.getField().getFieldType())) { //@@@: if (cDatabaseGlobals.isNumberField(ctrl.getField().getFieldType()))
                    f.addLbFormula(ctrl.getField().getName()); //@@@: f.addLbFormula(ctrl.getField().getName());

                    // TODO: refactor this to a better way to suggest the
                    //       list of formulas applicable to the type of
                    //       the database field
                    //
                    f.addFormula("Sum", ctrl.getName(), "_Sum"); //@@@: f.addFormula("Sum", ctrl.getName(), "_Sum");
                    f.addFormula("Maximum", ctrl.getName(), "_Max"); //@@@: f.addFormula("Maximum", ctrl.getName(), "_Max");
                    f.addFormula("Minimum", ctrl.getName(), "_Min"); //@@@: f.addFormula("Minimum", ctrl.getName(), "_Min");
                    f.addFormula("Averagge", ctrl.getName(), "_Average"); //@@@: f.addFormula("Averagge", ctrl.getName(), "_Average");
                } //@@@: }
            } //@@@: }
            if (!f.Visible) { //@@@: if (!f.Visible)
                f.Show(m_fmain); //@@@: f.Show(m_fmain);
            } //@@@: }
        }; //@@@: }

        self.pAddColumnsToToolbox = function(dataSource, columns, f) { //@@@: public void pAddColumnsToToolbox(String dataSource, cColumnsInfo columns, fToolbox f) {
            for(var _i = 0; _i < columns.count(); _i++) { //@@@: for (int _i = 0; _i < columns.count(); _i++) {
                let col = columns.item(_i); //@@@: cColumnInfo col = columns.item(_i);
                f.addField( //@@@: f.addField(
                    cGlobals.getDataSourceStr(dataSource) + col.getName(), //@@@: cGlobals.getDataSourceStr(dataSource) + col.getName(),
                    col.getColumnType(), //@@@: (int)col.getColumnType(),
                    col.getPosition()); //@@@: col.getPosition());
                f.addLabels(col.getName()); //@@@: f.addLabels(col.getName());
            } //@@@: }
        }; //@@@: }

        self.copy = function() { //@@@: public void copy() {
            try { //@@@: try {
                if (m_vSelectedKeys.Length === 0) { return; } //@@@: if (m_vSelectedKeys.Length == 0) { return; }

                G.redim(m_vCopyKeys, m_vSelectedKeys.Length); //@@@: G.redim(ref m_vCopyKeys, m_vSelectedKeys.Length);

                for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
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

                } //@@@: }
                else { //@@@: else {

                    m_copyControls = true; //@@@: m_copyControls = true;

                } //@@@: }

                addLabel(); //@@@: addLabel();

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "Paste", C_MODULE, ""); //@@@: cError.mngError(ex, "Paste", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.editText = function() { //@@@: public void editText() {
            try { //@@@: try {

                self.int c_margen = 1; //@@@: const int c_margen = 1;

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

            cReportPaintObject paintObjAspect = null;
            paintObjAspect = m_paint.getPaintObject(m_keyObj);
            if (paintObjAspect === null) { return; }

            String sKeyRpt = "";
            sKeyRpt = paintObjAspect.getTag();

            paintObjAspect.setText(TxEdit.Text);

            m_report.getControls().item(sKeyRpt).getLabel().setText(paintObjAspect.getText());
            refreshBody();
             */
        }; //@@@: }

        const paintSection = function(aspect, ) { //@@@: private String paintSection(cReportAspect aspect,
                                    String sKey, //@@@: String sKey,
                                    csRptSectionType rptType, //@@@: csRptSectionType rptType,
                                    String text, //@@@: String text,
                                    bool isSecLn) //@@@: bool isSecLn)
        { //@@@: {

            let paintObj = null; //@@@: cReportPaintObject paintObj = null;
            paintObj = m_paint.getNewSection(csRptPaintObjType.CSRPTPAINTOBJBOX); //@@@: paintObj = m_paint.getNewSection(csRptPaintObjType.CSRPTPAINTOBJBOX);

            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();

            // we only draw the bottom line of the sections
            //
            w_aspect.setLeft(0); //@@@: w_aspect.setLeft(0);
            w_aspect.setTop(aspect.getTop() + aspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION); //@@@: w_aspect.setTop(aspect.getTop() + aspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
            w_aspect.setWidth(aspect.getWidth()); //@@@: w_aspect.setWidth(aspect.getWidth());
            w_aspect.setHeight(cGlobals.C_HEIGHT_BAR_SECTION); //@@@: w_aspect.setHeight(cGlobals.C_HEIGHT_BAR_SECTION);
            w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED); //@@@: w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
            w_aspect.setBorderWidth(1); //@@@: w_aspect.setBorderWidth(1);

            if (isSecLn) { //@@@: if (isSecLn) {
                w_aspect.setBackColor(0xffcc99); //@@@: w_aspect.setBackColor(0xffcc99);
                w_aspect.setBorderColor(Color.Red.ToArgb()); //@@@: w_aspect.setBorderColor(Color.Red.ToArgb());
            } //@@@: }
            else { //@@@: else {
                self.int innerColor = 0x99ccff; //@@@: const int innerColor = 0x99ccff;

                if (rptType === csRptSectionType.GROUP_FOOTER //@@@: if (rptType == csRptSectionType.GROUP_FOOTER
                    || rptType === csRptSectionType.GROUP_HEADER) { //@@@: || rptType == csRptSectionType.GROUP_HEADER) {
                    w_aspect.setBackColor(innerColor); //@@@: w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0xC0C000); //@@@: w_aspect.setBorderColor(0xC0C000);
                } //@@@: }
                else { //@@@: else {
                    w_aspect.setBackColor(innerColor); //@@@: w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0x0066cc); //@@@: w_aspect.setBorderColor(0x0066cc);
                } //@@@: }
            } //@@@: }

            if (rptType === csRptSectionType.MAIN_FOOTER //@@@: if (rptType == csRptSectionType.MAIN_FOOTER
                || rptType === csRptSectionType.FOOTER) { //@@@: || rptType == csRptSectionType.FOOTER) {
                w_aspect.setOffset(m_offSet); //@@@: w_aspect.setOffset(m_offSet);
            } //@@@: }

            paintObj.setIsSection(!isSecLn); //@@@: paintObj.setIsSection(!isSecLn);

            paintObj.setRptType(rptType); //@@@: paintObj.setRptType(rptType);
            paintObj.setTag(sKey); //@@@: paintObj.setTag(sKey);

            paintObj.setText(text); //@@@: paintObj.setText(text);

            return paintObj.getKey(); //@@@: return paintObj.getKey();
        }; //@@@: }

        const getLineRegionForControl = function(sKeyPaintObj, ) { //@@@: private bool getLineRegionForControl(String sKeyPaintObj,
                                                cReportSectionLine rptSecLine, //@@@: out cReportSectionLine rptSecLine,
                                                bool isFreeCtrl) //@@@: bool isFreeCtrl)
        { //@@@: {
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
            } //@@@: }
            else { //@@@: else {
                y = w_aspect.getTop() + w_aspect.getHeight() / 2 + w_aspect.getOffset(); //@@@: y = w_aspect.getTop() + w_aspect.getHeight() / 2 + w_aspect.getOffset();
            } //@@@: }

            for(var _i = 0; _i < rptSection.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < rptSection.getSectionLines().count(); _i++) {
                let rptSL = rptSection.getSectionLines().item(_i); //@@@: cReportSectionLine rptSL = rptSection.getSectionLines().item(_i);
                w_aspect = rptSL.getAspect(); //@@@: w_aspect = rptSL.getAspect();
                w1 = w_aspect.getTop(); //@@@: w1 = w_aspect.getTop();
                w2 = w_aspect.getTop() + w_aspect.getHeight(); //@@@: w2 = w_aspect.getTop() + w_aspect.getHeight();
                if (isFreeCtrl) { //@@@: if (isFreeCtrl) {
                    //
                    // if the control is a free control
                    // this function will return the last sectionLine which
                    // has a bottom bigger than the top of the control
                    //
                    if (w1 <= y) { //@@@: if (w1 <= y) {
                        rtnSecLine = rptSL; //@@@: rtnSecLine = rptSL;
                    } //@@@: }
                } //@@@: }
                else { //@@@: else {
                    //
                    // if the control is not a free control
                    // this function will return the section line
                    // which contains the control
                    //
                    if (w1 <= y && w2 >= y) { //@@@: if (w1 <= y && w2 >= y) {
                        rtnSecLine = rptSL; //@@@: rtnSecLine = rptSL;
                        break; //@@@: break;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            //
            // if the control is not a free contrl and there wasn't a
            // section line which contained the top of the control
            // (I think that can't be posible but anyways)
            // this function will return false and rptSecLine will be null
            //

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
            } //@@@: }
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
                                            float x, //@@@: float x,
                                            float y, //@@@: float y,
                                            cReportSection rptSection, //@@@: out cReportSection rptSection,
                                            bool isFreeCtrl) //@@@: bool isFreeCtrl)
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
                } //@@@: }
                else { //@@@: else {
                    if (y1 <= y && y2 >= y) { //@@@: if (y1 <= y && y2 >= y) {
                        rtnSec = rptSec; //@@@: rtnSec = rptSec;
                        break; //@@@: break;
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
                                        float offSetTopSection, //@@@: float offSetTopSection,
                                        bool bChangeTop, //@@@: bool bChangeTop,
                                        bool bZeroOffset) //@@@: bool bZeroOffset)
        { //@@@: {
            let newTopCtrl = 0; //@@@: float newTopCtrl = 0;
            let offSet = 0; //@@@: float offSet = 0;
            let bottom = 0; //@@@: float bottom = 0;
            let secTop = 0; //@@@: float secTop = 0;
            let secLnHeigt = 0; //@@@: float secLnHeigt = 0;
            let offSecLn = 0; //@@@: float offSecLn = 0;
UNKNOWN >>             cReportPaintObject paintSec; //@@@: cReportPaintObject paintSec;

            let secAspect = rptSec.getAspect(); //@@@: cReportAspect secAspect = rptSec.getAspect();
            secAspect.setTop(secAspect.getTop() + offSetTopSection); //@@@: secAspect.setTop(secAspect.getTop() + offSetTopSection);
            offSet = rptSec.getSectionLines().item(0).getAspect().getTop() - secAspect.getTop(); //@@@: offSet = rptSec.getSectionLines().item(0).getAspect().getTop() - secAspect.getTop();
            secTop = secAspect.getTop(); //@@@: secTop = secAspect.getTop();

            for(var _i = 0; _i < rptSec.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < rptSec.getSectionLines().count(); _i++) {

                let rptSecLine = rptSec.getSectionLines().item(_i); //@@@: cReportSectionLine rptSecLine = rptSec.getSectionLines().item(_i);

                let secLineAspect = rptSecLine.getAspect(); //@@@: cReportAspect secLineAspect = rptSecLine.getAspect();

                // footers grow to top
                //
                if (rptSec.getTypeSection() === csRptSectionType.MAIN_FOOTER //@@@: if (rptSec.getTypeSection() == csRptSectionType.MAIN_FOOTER
                    || rptSec.getTypeSection() === csRptSectionType.FOOTER) { //@@@: || rptSec.getTypeSection() == csRptSectionType.FOOTER) {

                    if (bChangeTop) { //@@@: if (bChangeTop) {

                        if (bZeroOffset) { //@@@: if (bZeroOffset) {
                            offSet = 0; //@@@: offSet = 0;
                        } //@@@: }

                    } //@@@: }
                    else { //@@@: else {

                        if (rptSecLine.getRealIndex() >= m_indexSecLnMoved && m_indexSecLnMoved > 0) { //@@@: if (rptSecLine.getRealIndex() >= m_indexSecLnMoved && m_indexSecLnMoved > 0) {

                            bChangeTop = true; //@@@: bChangeTop = true;
                        } //@@@: }

                    } //@@@: }

                    // every other section grow to bottom
                    //
                } //@@@: }
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
                } //@@@: }
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
                    } //@@@: }
                    else { //@@@: else {
                        newTopCtrl = (ctrLabelAspect.getTop() + ctrLabelAspect.getHeight() - offSet) + offSecLn; //@@@: newTopCtrl = (ctrLabelAspect.getTop() + ctrLabelAspect.getHeight() - offSet) + offSecLn;
                    } //@@@: }

                    bottom = secLineAspect.getTop() + secLineAspect.getHeight(); //@@@: bottom = secLineAspect.getTop() + secLineAspect.getHeight();

                    if (newTopCtrl > bottom) { //@@@: if (newTopCtrl > bottom) {
                        newTopCtrl = bottom - ctrLabelAspect.getHeight(); //@@@: newTopCtrl = bottom - ctrLabelAspect.getHeight();
                    } //@@@: }
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
            // and the footer hasn't contain a section yet
            //
            if (rptSec.getKeyPaint() === "") { return; } //@@@: if (rptSec.getKeyPaint() == "") { return; }

            let w_aspect = rptSec.getAspect(); //@@@: cReportAspect w_aspect = rptSec.getAspect();

            // we only draw the bottom line of the sections
            //
            paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint());

            if (paintSec !== null) { //@@@: if (paintSec != null) {
                paintSec.getAspect().setTop(w_aspect.getTop() //@@@: paintSec.getAspect().setTop(w_aspect.getTop()
                                            + w_aspect.getHeight() //@@@: + w_aspect.getHeight()
                                            - cGlobals.C_HEIGHT_BAR_SECTION); //@@@: - cGlobals.C_HEIGHT_BAR_SECTION);
                paintSec.setHeightSec(w_aspect.getHeight()); //@@@: paintSec.setHeightSec(w_aspect.getHeight());
            } //@@@: }
        }; //@@@: }

        const moveSection = function(paintObj, ) { //@@@: private void moveSection(cReportPaintObject paintObj,
                                    float x, //@@@: float x,
                                    float y, //@@@: float y,
                                    float minBottom, //@@@: float minBottom,
                                    float maxBottom, //@@@: float maxBottom,
                                    cReportSection secToMove, //@@@: cReportSection secToMove,
                                    bool isNew) //@@@: bool isNew)
        { //@@@: {
            if (m_bNoMove) { return; } //@@@: if (m_bNoMove) { return; }

            let oldHeight = 0; //@@@: float oldHeight = 0;

            m_dataHasChanged = true; //@@@: m_dataHasChanged = true;

            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();

            // if Y is contained by the allowed range everything is ok
            //
            if (y >= minBottom && y <= maxBottom) { //@@@: if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - m_offY); //@@@: w_aspect.setTop(y - m_offY);

                // because the top has been set to real dimensions
                // of the screen we must move to the offset
                // of its section
                //
                w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset()); //@@@: w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset());
            } //@@@: }
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
                } //@@@: }
                else { //@@@: else {
                    w_aspect.setTop(maxBottom); //@@@: w_aspect.setTop(maxBottom);
                } //@@@: }
            } //@@@: }

            // TODO: remove after more testing - aligning the sections has an undesired result: the last section line is shrinked after five resize actions
            //
            // m_paint.alingToGrid(paintObj.getKey());

            if (isNew) { //@@@: if (isNew) {
                oldHeight = 0; //@@@: oldHeight = 0;
            } //@@@: }
            else { //@@@: else {
                oldHeight = secToMove.getAspect().getHeight(); //@@@: oldHeight = secToMove.getAspect().getHeight();
            } //@@@: }

            // for the detail section and every other section which is over the detail
            // we only change the height, for all sections bellow the detail we need to
            // change the height and top becasuse wen we strech a section it needs to move
            // to the bottom of the report
            //
            secToMove.getAspect().setHeight(w_aspect.getTop() //@@@: secToMove.getAspect().setHeight(w_aspect.getTop()
                                            + cGlobals.C_HEIGHT_BAR_SECTION //@@@: + cGlobals.C_HEIGHT_BAR_SECTION
                                            - secToMove.getAspect().getTop()); //@@@: - secToMove.getAspect().getTop());

            // every section bellow this section needs to update its top
            //
            let offsetTop = 0; //@@@: float offsetTop = 0;

            w_aspect = secToMove.getAspect(); //@@@: w_aspect = secToMove.getAspect();

            offsetTop = oldHeight - (w_aspect.getHeight() + m_newSecLineOffSet); //@@@: offsetTop = oldHeight - (w_aspect.getHeight() + m_newSecLineOffSet);

            switch (secToMove.getTypeSection()) { //@@@: switch (secToMove.getTypeSection()) {

                    // if the section is a footer we move to bottom
                    // (OJO: footer sections, no group footers)
                    //
                case  csRptSectionType.FOOTER: //@@@: case  csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER: //@@@: case csRptSectionType.MAIN_FOOTER:

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
                                                        m_report.getPaperInfo(), //@@@: m_report.getPaperInfo(),
                                                        w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                                        w_paperInfo.getOrientation()).Height, //@@@: w_paperInfo.getOrientation()).Height,
                                                        pageHeight); //@@@: out pageHeight);
            pRefreshOffSetInPaintObjs(); //@@@: pRefreshOffSetInPaintObjs();
            m_paint.setGridHeight(pageHeight); //@@@: m_paint.setGridHeight(pageHeight);
        }; //@@@: }

        const pChangeBottomSections = function(secToMove, offsetTop) { //@@@: private void pChangeBottomSections(cReportSection secToMove, float offsetTop) {

            let sec = null; //@@@: cReportSection sec = null;
            let bChangeTop = false; //@@@: bool bChangeTop = false;

            if (secToMove.getTypeSection() === csRptSectionType.FOOTER //@@@: if (secToMove.getTypeSection() == csRptSectionType.FOOTER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_FOOTER //@@@: || secToMove.getTypeSection() == csRptSectionType.MAIN_FOOTER
                || bChangeTop) { //@@@: || bChangeTop) {

                for(var i = m_report.getFooters().count()-1; i > -1; i--) { //@@@: for (int i = m_report.getFooters().count()-1; i > -1; i--) {
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

            if (secToMove.getTypeSection() === csRptSectionType.HEADER //@@@: if (secToMove.getTypeSection() == csRptSectionType.HEADER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_HEADER) { //@@@: || secToMove.getTypeSection() == csRptSectionType.MAIN_HEADER) {

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

            if (secToMove.getTypeSection() === csRptSectionType.GROUP_HEADER || bChangeTop) { //@@@: if (secToMove.getTypeSection() == csRptSectionType.GROUP_HEADER || bChangeTop) {

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

            if (secToMove.getTypeSection() === csRptSectionType.MAIN_DETAIL //@@@: if (secToMove.getTypeSection() == csRptSectionType.MAIN_DETAIL
                || secToMove.getTypeSection() === csRptSectionType.DETAIL || bChangeTop) { //@@@: || secToMove.getTypeSection() == csRptSectionType.DETAIL || bChangeTop) {

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

            if (secToMove.getTypeSection() === csRptSectionType.GROUP_FOOTER || bChangeTop) { //@@@: if (secToMove.getTypeSection() == csRptSectionType.GROUP_FOOTER || bChangeTop) {

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
            let heightLines = 0; //@@@: float heightLines = 0;
UNKNOWN >>             cReportAspect w_aspect; //@@@: cReportAspect w_aspect;

            // Update section line
            //
            for(var i = 0; i < sec.getSectionLines().count() - 1; i++) { //@@@: for (int i = 0; i < sec.getSectionLines().count() - 1; i++) {
                w_aspect = sec.getSectionLines().item(i).getAspect(); //@@@: w_aspect = sec.getSectionLines().item(i).getAspect();
                heightLines = heightLines + w_aspect.getHeight(); //@@@: heightLines = heightLines + w_aspect.getHeight();
            } //@@@: }

            // for the last section line the height is the rest
            //
            let w_sectionLines = sec.getSectionLines(); //@@@: cReportSectionLines w_sectionLines = sec.getSectionLines();
            w_aspect = w_sectionLines.item(w_sectionLines.count()-1).getAspect(); //@@@: w_aspect = w_sectionLines.item(w_sectionLines.count()-1).getAspect();
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

            m_paint = new cReportPaint(); //@@@: m_paint = new cReportPaint();

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            m_paint.setGridHeight( //@@@: m_paint.setGridHeight(
                    pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                m_report.getPaperInfo(), //@@@: m_report.getPaperInfo(),
                                                                w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                                                w_paperInfo.getOrientation()).Height)); //@@@: w_paperInfo.getOrientation()).Height));

            m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid); //@@@: m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

            if (m_report.getName() !== "") { //@@@: if (m_report.getName() != "") {
                m_editorTab.Text = m_report.getName() + "   [X]"; //@@@: m_editorTab.Text = m_report.getName() + "   [X]";
            } //@@@: }

            let sec = null; //@@@: cReportSection sec = null;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i); //@@@: sec = m_report.getHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(), //@@@: sec.getKey(),
                                                sec.getTypeSection(), //@@@: sec.getTypeSection(),
                                                sec.getName(), //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_HEADER); //@@@: pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_HEADER);
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i); //@@@: sec = m_report.getGroupsHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(), //@@@: sec.getKey(),
                                                sec.getTypeSection(), //@@@: sec.getTypeSection(),
                                                sec.getName(), //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPH); //@@@: pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPH);
            } //@@@: }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i); //@@@: sec = m_report.getDetails().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(), //@@@: sec.getKey(),
                                                sec.getTypeSection(), //@@@: sec.getTypeSection(),
                                                sec.getName(), //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_DETAIL); //@@@: pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_DETAIL);
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                sec = m_report.getGroupsFooters().item(_i); //@@@: sec = m_report.getGroupsFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(), //@@@: sec.getKey(),
                                                sec.getTypeSection(), //@@@: sec.getTypeSection(),
                                                sec.getName(), //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPF); //@@@: pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPF);
            } //@@@: }

            for(var _i = 0; _i < m_report.getFooters().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getFooters().count(); _i++) {
                sec = m_report.getFooters().item(_i); //@@@: sec = m_report.getFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), //@@@: sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(), //@@@: sec.getKey(),
                                                sec.getTypeSection(), //@@@: sec.getTypeSection(),
                                                sec.getName(), //@@@: sec.getName(),
                                                false)); //@@@: false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight()); //@@@: paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_FOOTER); //@@@: pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_FOOTER);
            } //@@@: }

UNKNOWN >>             csRptPaintObjType paintType; //@@@: csRptPaintObjType paintType;

            for(var _i = 0; _i < m_report.getControls().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getControls().count(); _i++) {

                let rptCtrl = m_report.getControls().item(_i); //@@@: cReportControl rptCtrl = m_report.getControls().item(_i);
                refreshNextNameCtrl(rptCtrl.getName()); //@@@: refreshNextNameCtrl(rptCtrl.getName());
                let ctrlAspect = rptCtrl.getLabel().getAspect(); //@@@: cReportAspect ctrlAspect = rptCtrl.getLabel().getAspect();

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTIMAGE //@@@: if (rptCtrl.getControlType() == csRptControlType.CSRPTCTIMAGE
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) { //@@@: || rptCtrl.getControlType() == csRptControlType.CSRPTCTCHART) {
                    paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE; //@@@: paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
                } //@@@: }
                else { //@@@: else {
UNKNOWN >>                     paintType =csRptPaintObjType.CSRPTPAINTOBJBOX; //@@@: paintType =csRptPaintObjType.CSRPTPAINTOBJBOX;
                } //@@@: }

               let paintObj = m_paint.getNewObject(paintType); //@@@: cReportPaintObject paintObj = m_paint.getNewObject(paintType);

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
                    w_aspect.setBorderWidth(0); //@@@: w_aspect.setBorderWidth(0);
                    w_aspect.setBorderRounded(false); //@@@: w_aspect.setBorderRounded(false);
                    w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED); //@@@: w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
                } //@@@: }
                else { //@@@: else {
                    w_aspect.setBorderType(ctrlAspect.getBorderType()); //@@@: w_aspect.setBorderType(ctrlAspect.getBorderType());
                    w_aspect.setBorderColor(ctrlAspect.getBorderColor()); //@@@: w_aspect.setBorderColor(ctrlAspect.getBorderColor());
                    w_aspect.setBorderColor3d(ctrlAspect.getBorderColor3d()); //@@@: w_aspect.setBorderColor3d(ctrlAspect.getBorderColor3d());
                    w_aspect.setBorderColor3dShadow(ctrlAspect.getBorderColor3dShadow()); //@@@: w_aspect.setBorderColor3dShadow(ctrlAspect.getBorderColor3dShadow());
                    w_aspect.setBorderRounded(ctrlAspect.getBorderRounded()); //@@@: w_aspect.setBorderRounded(ctrlAspect.getBorderRounded());
                    w_aspect.setBorderWidth(ctrlAspect.getBorderWidth()); //@@@: w_aspect.setBorderWidth(ctrlAspect.getBorderWidth());
                } //@@@: }

                switch (rptCtrl.getSectionLine().getTypeSection()) { //@@@: switch (rptCtrl.getSectionLine().getTypeSection()) {
                    case  csRptSectionType.FOOTER: //@@@: case  csRptSectionType.FOOTER:
                    case  csRptSectionType.MAIN_FOOTER: //@@@: case  csRptSectionType.MAIN_FOOTER:
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
                paintObj.setRptType(csRptSectionType.CONTROL); //@@@: paintObj.setRptType(csRptSectionType.CONTROL);
                paintObj.setTag(rptCtrl.getKey()); //@@@: paintObj.setTag(rptCtrl.getKey());
                rptCtrl.setKeyPaint(paintObj.getKey()); //@@@: rptCtrl.setKeyPaint(paintObj.getKey());
            } //@@@: }

            m_dataHasChanged = false; //@@@: m_dataHasChanged = false;

            m_paint.createPicture(m_picReport.CreateGraphics()); //@@@: m_paint.createPicture(m_picReport.CreateGraphics());

            m_picRule.Refresh(); //@@@: m_picRule.Refresh();
        }; //@@@: }

        const pAddPaintSetcionForSecLn = function( //@@@: private void pAddPaintSetcionForSecLn(
            sec,  //@@@: cReportSection sec,
            typeSecLn) { //@@@: csRptSectionType typeSecLn)
            let paintSec = null; //@@@: cReportPaintObject paintSec = null;

            if (sec.getSectionLines().count() > 1) { //@@@: if (sec.getSectionLines().count() > 1) {

                for(var i = 0; i < sec.getSectionLines().count() - 1; i++) { //@@@: for (int i = 0; i < sec.getSectionLines().count() - 1; i++) {
                    let secLine = sec.getSectionLines().item(i); //@@@: cReportSectionLine secLine = sec.getSectionLines().item(i);
                    secLine.setKeyPaint( //@@@: secLine.setKeyPaint(
                        paintSection( //@@@: paintSection(
                            secLine.getAspect(), //@@@: secLine.getAspect(),
                            secLine.getKey(), //@@@: secLine.getKey(),
                            sec.getTypeSection(), //@@@: sec.getTypeSection(),
                            C_SECTIONLINE + i.ToString(), //@@@: C_SECTIONLINE + i.ToString(),
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
               let po = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: cReportPaintObject po = m_paint.getPaintSections().item(sec.getKeyPaint());
                po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString()); //@@@: po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString());
            } //@@@: }

            // we set the height of the last section line
            //
            paintSec = m_paint.getPaintSections().item(sec.getKeyPaint()); //@@@: paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());

            let secLines = sec.getSectionLines(); //@@@: cReportSectionLines secLines = sec.getSectionLines();
            paintSec.setHeightSecLine(secLines.item(secLines.count() - 1).getAspect().getHeight()); //@@@: paintSec.setHeightSecLine(secLines.item(secLines.count() - 1).getAspect().getHeight());
        }; //@@@: }

        const refreshNextNameCtrl = function(nameCtrl) { //@@@: private void refreshNextNameCtrl(String nameCtrl) {
            let x = 0; //@@@: int x = 0;
            if (cUtil.subString(nameCtrl, 0, cGlobals.C_CONTROL_NAME.Length).ToUpper() === cGlobals.C_CONTROL_NAME.ToUpper()) { //@@@: if (cUtil.subString(nameCtrl, 0, cGlobals.C_CONTROL_NAME.Length).ToUpper() == cGlobals.C_CONTROL_NAME.ToUpper())
                x = cUtil.valAsInt(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1)); //@@@: x = cUtil.valAsInt(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1));
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
                    if (w_aspect.getTop() + w_aspect.getHeight() //@@@: if (w_aspect.getTop() + w_aspect.getHeight()
                        > rptSecLineAspect.getTop() + rptSecLineAspect.getHeight()) { //@@@: > rptSecLineAspect.getTop() + rptSecLineAspect.getHeight()) {
                        w_aspect.setTop(rptSecLineAspect.getTop() //@@@: w_aspect.setTop(rptSecLineAspect.getTop()
                                        + rptSecLineAspect.getHeight() //@@@: + rptSecLineAspect.getHeight()
                                        - w_aspect.getHeight()); //@@@: - w_aspect.getHeight());
                    } //@@@: }
                } //@@@: }

                if (w_aspect.getTop() < rptSecLineAspect.getTop()) { //@@@: if (w_aspect.getTop() < rptSecLineAspect.getTop()) {
                    w_aspect.setTop(rptSecLineAspect.getTop()); //@@@: w_aspect.setTop(rptSecLineAspect.getTop());
                } //@@@: }

                objPaintAspect.setTop(w_aspect.getTop()); //@@@: objPaintAspect.setTop(w_aspect.getTop());
            } //@@@: }
        }; //@@@: }

        const showPopMenuSection = function(noDelete, showGroups, x, y) { //@@@: private void showPopMenuSection(bool noDelete, bool showGroups, int x, int y) {
            m_fmain.showPopMenuSection(this, noDelete, showGroups, m_picReport.PointToScreen(new Point(x, y))); //@@@: m_fmain.showPopMenuSection(this, noDelete, showGroups, m_picReport.PointToScreen(new Point(x, y)));
        }; //@@@: }

        const showPopMenuControl = function(clickInCtrl, x, y) { //@@@: private void showPopMenuControl(bool clickInCtrl, int x, int y) {

            let pasteEnabled = false; //@@@: bool pasteEnabled = false;

            if (m_vCopyKeys.Length > 0) { //@@@: if (m_vCopyKeys.Length > 0) {
                pasteEnabled = true; //@@@: pasteEnabled = true;
            } //@@@: }
            else if (!(m_fmain.getReportCopySource() === null)) { //@@@: else if (!(m_fmain.getReportCopySource() == null)) {
                pasteEnabled = m_fmain.getReportCopySource().getVCopyKeysCount() > 0; //@@@: pasteEnabled = m_fmain.getReportCopySource().getVCopyKeysCount() > 0;
            } //@@@: }

            m_fmain.showPopMenuControl(this, clickInCtrl, pasteEnabled, m_picReport.PointToScreen(new Point(x, y))); //@@@: m_fmain.showPopMenuControl(this, clickInCtrl, pasteEnabled, m_picReport.PointToScreen(new Point(x, y)));
        }; //@@@: }

        const m_fGroup_UnloadForm = function() { //@@@: private void m_fGroup_UnloadForm() {
            m_fGroup = null; //@@@: m_fGroup = null;
        }; //@@@: }

        self.destroyPropertiesFormReference = function() { //@@@: public void destroyPropertiesFormReference() {
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
                                                                    m_report.getPaperInfo(), //@@@: m_report.getPaperInfo(),
                                                                    w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                                                    w_paperInfo.getOrientation()).Height)); //@@@: w_paperInfo.getOrientation()).Height));
            pValidateSectionAspect(); //@@@: pValidateSectionAspect();
            reLoadReport(); //@@@: reLoadReport();
        }; //@@@: }

        // TODO: remove me if not needed
        self.refreshPostion = function() { //@@@: public void refreshPostion() {

        self.refreshAll = function() { //@@@: public void refreshAll() {
            refreshBody(); //@@@: refreshBody();
            refreshRule(); //@@@: refreshRule();
            cMainEditor.setDocActive(this); //@@@: cMainEditor.setDocActive(this);
        }; //@@@: }

        const reportDone = function(sender, e) { //@@@: private void reportDone(object sender, EventArgs e)
            closeProgressDlg(); //@@@: closeProgressDlg();
        }; //@@@: }

        const reportProgress = function(sender, e) { //@@@: private void reportProgress(object sender, ProgressEventArgs e)

            let task = e.task; //@@@: String task = e.task;
            let page = e.page; //@@@: int page = e.page;
            let currRecord = e.currRecord; //@@@: int currRecord = e.currRecord;
            let recordCount = e.recordCount; //@@@: int recordCount = e.recordCount;

            if (m_cancelPrinting) { //@@@: if (m_cancelPrinting) {
                if (cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)) { //@@@: if (cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)) {
                    e.cancel = true; //@@@: e.cancel = true;
                    closeProgressDlg(); //@@@: closeProgressDlg();
                    return; //@@@: return;
                } //@@@: }
                else { //@@@: else {
                    m_cancelPrinting = false; //@@@: m_cancelPrinting = false;
                } //@@@: }
            } //@@@: }

            if (m_fProgress === null) { return; } //@@@: if (m_fProgress == null) { return; }

            if (page > 0) { m_fProgress.lbCurrPage.Text = page.ToString(); } //@@@: if (page > 0) { m_fProgress.lbCurrPage.Text = page.ToString(); }
            if (task !== "") { m_fProgress.lbTask.Text = task; } //@@@: if (task != "") { m_fProgress.lbTask.Text = task; }
            if (currRecord > 0) { m_fProgress.lbCurrRecord.Text = currRecord.ToString(); } //@@@: if (currRecord > 0) { m_fProgress.lbCurrRecord.Text = currRecord.ToString(); }
            if (recordCount > 0 && cUtil.val(m_fProgress.lbRecordCount.Text) !== recordCount) { //@@@: if (recordCount > 0 && cUtil.val(m_fProgress.lbRecordCount.Text) != recordCount) {
                m_fProgress.lbRecordCount.Text = recordCount.ToString(); //@@@: m_fProgress.lbRecordCount.Text = recordCount.ToString();
            } //@@@: }

            let percent = 0; //@@@: double percent = 0;
            if (recordCount > 0 && currRecord > 0) { //@@@: if (recordCount > 0 && currRecord > 0) {
                percent = Convert.ToDouble(currRecord) / recordCount; //@@@: percent = Convert.ToDouble(currRecord) / recordCount;
                let value = Convert.ToInt32(percent * 100); //@@@: var value = Convert.ToInt32(percent * 100);
                if (value > 100) value = 100; { //@@@: if (value > 100) value = 100;
                m_fProgress.prgBar.Value = value; //@@@: m_fProgress.prgBar.Value = value;
            } //@@@: }

            Application.DoEvents(); //@@@: Application.DoEvents();
        }; //@@@: }

        const closeProgressDlg = function() { //@@@: private void closeProgressDlg() {
            if (m_fProgress !== null && !m_fProgress.IsDisposed) { //@@@: if (m_fProgress != null && !m_fProgress.IsDisposed)
                m_fProgress.Close(); //@@@: m_fProgress.Close();
            } //@@@: }
            m_fProgress = null; //@@@: m_fProgress = null;
        }; //@@@: }

        const showProgressDlg = function() { //@@@: private void showProgressDlg() {
            m_cancelPrinting = false; //@@@: m_cancelPrinting = false;
            if (m_fProgress === null) { //@@@: if (m_fProgress == null) {
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
            } //@@@: }
            else { //@@@: else {
                return m_picRule.Width + C_LEFTBODY; //@@@: return m_picRule.Width + C_LEFTBODY;
            } //@@@: }
        }; //@@@: }

        const pSetSizePics = function(realPageHeight) { //@@@: private float pSetSizePics(float realPageHeight) {
            let pageHeight = 0; //@@@: float pageHeight = 0;

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            m_picReport.Width = CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: m_picReport.Width = (int)CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                m_report.getPaperInfo(), //@@@: m_report.getPaperInfo(),
                                                                w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                                                w_paperInfo.getOrientation()).Width; //@@@: w_paperInfo.getOrientation()).Width;
            pGetOffSet(realPageHeight, pageHeight); //@@@: pGetOffSet(realPageHeight, out pageHeight);

            if (pageHeight > realPageHeight) { realPageHeight = pageHeight; } //@@@: if (pageHeight > realPageHeight) { realPageHeight = pageHeight; }

            m_picReport.Height = realPageHeight; //@@@: m_picReport.Height = (int)realPageHeight;
            m_picRule.Height = (realPageHeight + C_TOPBODY * 2); //@@@: m_picRule.Height = (int)(realPageHeight + C_TOPBODY * 2);

            return pageHeight; //@@@: return pageHeight;
        }; //@@@: }

        const pMoveAll = function(x, y) { //@@@: private void pMoveAll(float x, float y) {
            let rptCtrlAspect = null; //@@@: cReportAspect rptCtrlAspect = null;
            let paintObj = null; //@@@: cReportPaintObject paintObj = null;

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

            for (i = m_vSelectedKeys.Length-1; i > -1; i--) { //@@@: for (i = m_vSelectedKeys.Length-1; i > -1; i--) {

                paintObj = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: paintObj = m_paint.getPaintObject(m_vSelectedKeys[i]);

                offsetLeft = pGetOffsetLeftFromControls(firstLeft, //@@@: offsetLeft = pGetOffsetLeftFromControls(firstLeft,
                                                        paintObj.getAspect().getLeft()); //@@@: paintObj.getAspect().getLeft());

                offsetTop = pGetOffsetTopFromControls(firstTop - firstOffSet, //@@@: offsetTop = pGetOffsetTopFromControls(firstTop - firstOffSet,
                                                        paintObj.getAspect().getTop() //@@@: paintObj.getAspect().getTop()
                                                        - paintObj.getAspect().getOffset()); //@@@: - paintObj.getAspect().getOffset());

                w_aspect = paintObj.getAspect(); //@@@: w_aspect = paintObj.getAspect();

                if (x !== C_NOMOVE) { //@@@: if (x != C_NOMOVE) {
                    w_aspect.setLeft(x - m_offX + offsetLeft); //@@@: w_aspect.setLeft(x - m_offX + offsetLeft);
                } //@@@: }

                if (y !== C_NOMOVE) { //@@@: if (y != C_NOMOVE) {
                    w_aspect.setTop(y - m_offY + offsetTop); //@@@: w_aspect.setTop(y - m_offY + offsetTop);
                } //@@@: }
                else { //@@@: else {

                    // we get rid off the offset because the primitive
                    // add it to the top but we don't allow vertical
                    // moves so Y must to remain constant
                    //
                    w_aspect.setTop(w_aspect.getTop() - paintObj.getAspect().getOffset()); //@@@: w_aspect.setTop(w_aspect.getTop() - paintObj.getAspect().getOffset());
                } //@@@: }

                // only controls move in all directions
                //
                if (paintObj.getRptType() === csRptSectionType.CONTROL) { //@@@: if (paintObj.getRptType() == csRptSectionType.CONTROL) {
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
UNKNOWN >>             csRptSectionType rptType; //@@@: csRptSectionType rptType;

            let maxBottom = 0; //@@@: float maxBottom = 0;
            let minBottom = 0; //@@@: float minBottom = 0;

            let maxBottomSectionLine = 0; //@@@: float maxBottomSectionLine = 0;

            let rptSec = null; //@@@: cReportSection rptSec = null;
           let paintObj = null; //@@@: cReportPaintObject paintObj = null;
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

                case csRptSectionType.MAIN_HEADER: //@@@: case csRptSectionType.MAIN_HEADER:
                case csRptSectionType.HEADER: //@@@: case csRptSectionType.HEADER:

                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom); //@@@: rptSec = pMoveHeader(sKeySection, out minBottom, out maxBottom);

                    //---------------------
                    // GROUP HEADER
                    //---------------------

                    break; //@@@: break;

                case  csRptSectionType.GROUP_HEADER: //@@@: case  csRptSectionType.GROUP_HEADER:

                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom); //@@@: rptSec = pMoveGroupHeader(sKeySection, out minBottom, out maxBottom);

                    //---------------------
                    // DETAIL
                    //---------------------

                    break; //@@@: break;

                case  csRptSectionType.MAIN_DETAIL: //@@@: case  csRptSectionType.MAIN_DETAIL:
                case  csRptSectionType.DETAIL: //@@@: case  csRptSectionType.DETAIL:

                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom); //@@@: rptSec = pMoveDetails(sKeySection, out minBottom, out maxBottom);

                    //---------------------
                    // GROUP FOOTER
                    //---------------------

                    break; //@@@: break;

                case  csRptSectionType.GROUP_FOOTER: //@@@: case  csRptSectionType.GROUP_FOOTER:

                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom); //@@@: rptSec = pMoveGroupFooter(sKeySection, out minBottom, out maxBottom);

                    //---------------------
                    // FOOTER
                    //---------------------

                    break; //@@@: break;

                case  csRptSectionType.MAIN_FOOTER: //@@@: case  csRptSectionType.MAIN_FOOTER:
                case  csRptSectionType.FOOTER: //@@@: case  csRptSectionType.FOOTER:

                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom); //@@@: rptSec = pMoveFooter(sKeySection, out minBottom, out maxBottom);

                    //---------------------
                    // Section Lines
                    //---------------------
                    break; //@@@: break;

                case  csRptSectionType.SECLN_HEADER: //@@@: case  csRptSectionType.SECLN_HEADER:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine); //@@@: rptSec = pMoveHeader(sKeySection, out minBottom, out maxBottom, true, paintObj.getTag(), out maxBottomSectionLine);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptSectionType.SECLN_GROUPH: //@@@: case  csRptSectionType.SECLN_GROUPH:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine); //@@@: rptSec = pMoveGroupHeader(sKeySection, out minBottom, out maxBottom, true, paintObj.getTag(), out maxBottomSectionLine);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptSectionType.SECLN_DETAIL: //@@@: case  csRptSectionType.SECLN_DETAIL:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine); //@@@: rptSec = pMoveDetails(sKeySection, out minBottom, out maxBottom, true, paintObj.getTag(), out maxBottomSectionLine);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptSectionType.SECLN_GROUPF: //@@@: case  csRptSectionType.SECLN_GROUPF:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine); //@@@: rptSec = pMoveGroupFooter(sKeySection, out minBottom, out maxBottom, true, paintObj.getTag(), out maxBottomSectionLine);
                    isSecLn = true; //@@@: isSecLn = true;
                    break; //@@@: break;

                case  csRptSectionType.SECLN_FOOTER: //@@@: case  csRptSectionType.SECLN_FOOTER:
                    sKeySection = paintObj.getRptKeySec(); //@@@: sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine); //@@@: rptSec = pMoveFooter(sKeySection, out minBottom, out maxBottom, true, paintObj.getTag(), out maxBottomSectionLine);
                    isSecLn = true; //@@@: isSecLn = true;
                    m_indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex(); //@@@: m_indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex();
                    break; //@@@: break;
            } //@@@: }

            if (isSecLn) { //@@@: if (isSecLn) {
                minBottom = pGetMinBottomForSecLn(rptSec, paintObj.getTag(), minBottom); //@@@: minBottom = pGetMinBottomForSecLn(rptSec, paintObj.getTag(), minBottom);
                pChangeSecLnHeight(paintObj, //@@@: pChangeSecLnHeight(paintObj,
                                    y, //@@@: y,
                                    minBottom, //@@@: minBottom,
                                    maxBottomSectionLine, //@@@: maxBottomSectionLine,
                                    rptSec.getSectionLines().item(paintObj.getTag())); //@@@: rptSec.getSectionLines().item(paintObj.getTag()));

                y = rptSec.getAspect().getTop() //@@@: y = rptSec.getAspect().getTop()
                    - paintObj.getAspect().getOffset() //@@@: - paintObj.getAspect().getOffset()
                    + pGetSecHeigthFromSecLines(rptSec) //@@@: + pGetSecHeigthFromSecLines(rptSec)
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
           paintObj,  //@@@: cReportPaintObject paintObj,
            y,  //@@@: float y,
            minBottom,  //@@@: float minBottom,
            maxBottom,  //@@@: float maxBottom,
            secLn) { //@@@: cReportSectionLine secLn)
            let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();

            // if Y is contained between the range allowed everything is ok
            //
            if (y >= minBottom && y <= maxBottom) { //@@@: if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - m_offY); //@@@: w_aspect.setTop(y - m_offY);
            } //@@@: }
            else { //@@@: else {
                // if it have been moved upward
                //
                if (y < minBottom) { //@@@: if (y < minBottom) {
                    w_aspect.setTop(minBottom); //@@@: w_aspect.setTop(minBottom);

                } //@@@: }
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

            // TODO: remove after more testing - aligning the sections has an undesired result: the last section line is shrinked after five resize actions
            //
            // m_paint.alingToGrid(paintObj.getKey());

            // the section line height has been changed
            //
            secLn.getAspect().setHeight(w_aspect.getTop() //@@@: secLn.getAspect().setHeight(w_aspect.getTop()
                                        + cGlobals.C_HEIGHT_BAR_SECTION //@@@: + cGlobals.C_HEIGHT_BAR_SECTION
                                        - secLn.getAspect().getTop()); //@@@: - secLn.getAspect().getTop());
        }; //@@@: }

        const pResizeControl = function(x, y) { //@@@: private void pResizeControl(float x, float y) {
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

            pMoveControlAfterResize(w_getPaintObject.getAspect(), true); //@@@: pMoveControlAfterResize(w_getPaintObject.getAspect(), true);

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {

                if (m_keySizing !== m_vSelectedKeys[i]) { //@@@: if (m_keySizing != m_vSelectedKeys[i]) {

                    w_getPaintObject = m_paint.getPaintObject(m_vSelectedKeys[i]); //@@@: w_getPaintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    w_aspect = w_getPaintObject.getAspect(); //@@@: w_aspect = w_getPaintObject.getAspect();

                    w_aspect.setHeight(w_aspect.getHeight() + height); //@@@: w_aspect.setHeight(w_aspect.getHeight() + height);
                    w_aspect.setTop(w_aspect.getTop() + top); //@@@: w_aspect.setTop(w_aspect.getTop() + top);
                    w_aspect.setWidth(w_aspect.getWidth() + width); //@@@: w_aspect.setWidth(w_aspect.getWidth() + width);
                    w_aspect.setLeft(w_aspect.getLeft() + left); //@@@: w_aspect.setLeft(w_aspect.getLeft() + left);

                    pMoveControlAfterResize(w_getPaintObject.getAspect(), false); //@@@: pMoveControlAfterResize(w_getPaintObject.getAspect(), false);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pMoveControlAfterResize = function(aspect, bSizing) { //@@@: private void pMoveControlAfterResize(cReportAspect aspect, bool bSizing) {
            self.int C_MIN_WIDTH = 1; //@@@: const int C_MIN_WIDTH = 1;
            self.int C_MIN_HEIGHT = 1; //@@@: const int C_MIN_HEIGHT = 1;

            let rptCtrlAspect = null; //@@@: cReportAspect rptCtrlAspect = null;

            if (m_paint.getPaintObject(m_keySizing).getRptType() === csRptSectionType.CONTROL) { //@@@: if (m_paint.getPaintObject(m_keySizing).getRptType() == csRptSectionType.CONTROL) {
                rptCtrlAspect = m_report.getControls().item(m_paint.getPaintObject(m_keySizing).getTag()).getLabel().getAspect(); //@@@: rptCtrlAspect = m_report.getControls().item(m_paint.getPaintObject(m_keySizing).getTag()).getLabel().getAspect();
                rptCtrlAspect.setLeft(aspect.getLeft()); //@@@: rptCtrlAspect.setLeft(aspect.getLeft());
                if (!bSizing) { //@@@: if (!bSizing) {
                    rptCtrlAspect.setTop(aspect.getTop() + aspect.getOffset()); //@@@: rptCtrlAspect.setTop(aspect.getTop() + aspect.getOffset());
                } //@@@: }
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
            minBottom,  //@@@: out float minBottom,
            maxBottom) { //@@@: out float maxBottom)
UNKNOWN >>             float dummy; //@@@: float dummy;
            return pMoveHeader(sKeySection, minBottom, maxBottom, false, "", dummy); //@@@: return pMoveHeader(sKeySection, out minBottom, out maxBottom, false, "", out dummy);
        }; //@@@: }

        const pMoveHeader = function( //@@@: private cReportSection pMoveHeader(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom,  //@@@: out float maxBottom,
            isForSectionLine,  //@@@: bool isForSectionLine,
            secLnKey,  //@@@: string secLnKey,
            maxBottomSectionLine) { //@@@: out float maxBottomSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getHeaders().item(sKeySection); //@@@: rptSec = m_report.getHeaders().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) { //@@@: if (index == 0) {
                minBottom = C_MIN_HEIGHT_SECTION; //@@@: minBottom = C_MIN_HEIGHT_SECTION;
            } //@@@: }
            else { //@@@: else {
                // bottom of previous header + C_Min_Height_Section
                let w_aspect = m_report.getHeaders().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getTop() + w_aspect.getHeight() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getTop() + w_aspect.getHeight() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey); //@@@: maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, ""); //@@@: maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pMoveGroupHeader = function( //@@@: private cReportSection pMoveGroupHeader(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom) { //@@@: out float maxBottom)
UNKNOWN >>             float dummy; //@@@: float dummy;
            return pMoveGroupHeader(sKeySection, minBottom, maxBottom, false, "", dummy); //@@@: return pMoveGroupHeader(sKeySection, out minBottom, out maxBottom, false, "", out dummy);
        }; //@@@: }

        const pMoveGroupHeader = function( //@@@: private cReportSection pMoveGroupHeader(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom,  //@@@: out float maxBottom,
            isForSectionLine,  //@@@: bool isForSectionLine,
            secLnKey,  //@@@: string secLnKey,
            maxBottomSectionLine) { //@@@: out float maxBottomSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getGroupsHeaders().item(sKeySection); //@@@: rptSec = m_report.getGroupsHeaders().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) { //@@@: if (index == 0) {
                // bottom of previous header + C_Min_Height_Section
                let w_headers = m_report.getHeaders(); //@@@: cReportSections w_headers = m_report.getHeaders();
                let w_aspect = w_headers.item(w_headers.count()-1).getAspect(); //@@@: cReportAspect w_aspect = w_headers.item(w_headers.count()-1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }
            else { //@@@: else {
                // bottom of previous group header + C_Min_Height_Section
                let w_aspect = m_report.getGroupsHeaders().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getGroupsHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey); //@@@: maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, ""); //@@@: maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const getHeightOfSectionsBellowMe = function(section, secLnKey) { //@@@: private float getHeightOfSectionsBellowMe(cReportSection section, String secLnKey)
            let height = 0; //@@@: float height = 0;

            if ( ! String.IsNullOrEmpty(secLnKey) ) { //@@@: if ( ! String.IsNullOrEmpty(secLnKey) )
                let add = false; //@@@: bool add = false;
                for(var _i = 0; _i < section.getSectionLines().count(); _i++) { //@@@: for (int _i = 0; _i < section.getSectionLines().count(); _i++)
                    let secLn = section.getSectionLines().item(_i); //@@@: cReportSectionLine secLn = section.getSectionLines().item(_i);
                    if (add) { //@@@: if (add)
                        height += secLn.getAspect().getHeight(); //@@@: height += secLn.getAspect().getHeight();
                    } //@@@: }
                    else if (secLn.getKey() === secLnKey) { //@@@: else if (secLn.getKey() == secLnKey)
                        add = true; //@@@: add = true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            let rptType = section.getTypeSection(); //@@@: csRptSectionType rptType = section.getTypeSection();

            switch (rptType) { //@@@: switch (rptType) {

                case csRptSectionType.HEADER: //@@@: case csRptSectionType.HEADER:
                case csRptSectionType.MAIN_HEADER: //@@@: case csRptSectionType.MAIN_HEADER:
                    height += getHeightFromSections(m_report.getHeaders(), section); //@@@: height += getHeightFromSections(m_report.getHeaders(), section);
                    height += getHeightFromSections(m_report.getGroupsHeaders(), null); //@@@: height += getHeightFromSections(m_report.getGroupsHeaders(), null);
                    height += getHeightFromSections(m_report.getDetails(), null); //@@@: height += getHeightFromSections(m_report.getDetails(), null);
                    height += getHeightFromSections(m_report.getGroupsFooters(), null); //@@@: height += getHeightFromSections(m_report.getGroupsFooters(), null);
                    height += getHeightFromSections(m_report.getFooters(), null); //@@@: height += getHeightFromSections(m_report.getFooters(), null);
                    break; //@@@: break;

                case csRptSectionType.GROUP_HEADER: //@@@: case csRptSectionType.GROUP_HEADER:
                    height += getHeightFromSections(m_report.getGroupsHeaders(), section); //@@@: height += getHeightFromSections(m_report.getGroupsHeaders(), section);
                    height += getHeightFromSections(m_report.getDetails(), null); //@@@: height += getHeightFromSections(m_report.getDetails(), null);
                    height += getHeightFromSections(m_report.getGroupsFooters(), null); //@@@: height += getHeightFromSections(m_report.getGroupsFooters(), null);
                    height += getHeightFromSections(m_report.getFooters(), null); //@@@: height += getHeightFromSections(m_report.getFooters(), null);
                    break; //@@@: break;

                case csRptSectionType.DETAIL: //@@@: case csRptSectionType.DETAIL:
                case csRptSectionType.MAIN_DETAIL: //@@@: case csRptSectionType.MAIN_DETAIL:
                    height += getHeightFromSections(m_report.getDetails(), section); //@@@: height += getHeightFromSections(m_report.getDetails(), section);
                    height += getHeightFromSections(m_report.getGroupsFooters(), null); //@@@: height += getHeightFromSections(m_report.getGroupsFooters(), null);
                    height += getHeightFromSections(m_report.getFooters(), null); //@@@: height += getHeightFromSections(m_report.getFooters(), null);
                    break; //@@@: break;

                case csRptSectionType.GROUP_FOOTER: //@@@: case csRptSectionType.GROUP_FOOTER:
                    height += getHeightFromSections(m_report.getGroupsFooters(), section); //@@@: height += getHeightFromSections(m_report.getGroupsFooters(), section);
                    height += getHeightFromSections(m_report.getFooters(), null); //@@@: height += getHeightFromSections(m_report.getFooters(), null);
                    break; //@@@: break;

                case csRptSectionType.FOOTER: //@@@: case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER: //@@@: case csRptSectionType.MAIN_FOOTER:
                    height += getHeightFromSections(m_report.getFooters(), section); //@@@: height += getHeightFromSections(m_report.getFooters(), section);
                    break; //@@@: break;

                default: //@@@: default:
                    throw new ReportEditorException( //@@@: throw new ReportEditorException(
                        csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID, //@@@: csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID,
                        C_MODULE, //@@@: C_MODULE,
                        cReportEditorError.errGetDescript( //@@@: cReportEditorError.errGetDescript(
                                        csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID)); //@@@: csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID));
            } //@@@: }

            return height; //@@@: return height;
        }; //@@@: }

        const getHeightFromSections = function(sections, section) { //@@@: private float getHeightFromSections(cIReportGroupSections sections, cReportSection section)
            let add = section === null; //@@@: bool add = section == null;
            let height = 0; //@@@: float height = 0;
            for(var _i = 0; _i < sections.count(); _i++) { //@@@: for (int _i = 0; _i < sections.count(); _i++)
                let sec = sections.item(_i); //@@@: cReportSection sec = sections.item(_i);
                if (add) { //@@@: if (add)
                    height += sec.getAspect().getHeight(); //@@@: height += sec.getAspect().getHeight();
                } //@@@: }
                else if (section === sec) { //@@@: else if (section == sec)
                    add = true; //@@@: add = true;
                } //@@@: }
            } //@@@: }
            return height; //@@@: return height;
        }; //@@@: }

        const getAllHeadersAndGroupsAndDetailsHeight = function() { //@@@: private float getAllHeadersAndGroupsAndDetailsHeight()
            let sec = null; //@@@: cReportSection sec = null;

            let height = 0; //@@@: float height = 0;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getHeaders().count(); _i++)
                sec = m_report.getHeaders().item(_i); //@@@: sec = m_report.getHeaders().item(_i);
                height = height + sec.getAspect().getHeight(); //@@@: height = height + sec.getAspect().getHeight();
            } //@@@: }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getGroupsHeaders().count(); _i++)
                sec = m_report.getGroupsHeaders().item(_i); //@@@: sec = m_report.getGroupsHeaders().item(_i);
                height = height + sec.getAspect().getHeight(); //@@@: height = height + sec.getAspect().getHeight();
            } //@@@: }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) { //@@@: for (int _i = 0; _i < m_report.getDetails().count(); _i++)
                sec = m_report.getDetails().item(_i); //@@@: sec = m_report.getDetails().item(_i);
                height = height + sec.getAspect().getHeight(); //@@@: height = height + sec.getAspect().getHeight();
            } //@@@: }

            return height; //@@@: return height;
        }; //@@@: }

        const pMoveDetails = function( //@@@: private cReportSection pMoveDetails(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom) { //@@@: out float maxBottom)
UNKNOWN >>             float dummy; //@@@: float dummy;
            return pMoveDetails(sKeySection, minBottom, maxBottom, false, "", dummy); //@@@: return pMoveDetails(sKeySection, out minBottom, out maxBottom, false, "", out dummy);
        }; //@@@: }

        const pMoveDetails = function( //@@@: private cReportSection pMoveDetails(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom,  //@@@: out float maxBottom,
            isForSectionLine,  //@@@: bool isForSectionLine,
            secLnKey,  //@@@: string secLnKey,
            maxBottomSectionLine) { //@@@: out float maxBottomSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getDetails().item(sKeySection); //@@@: rptSec = m_report.getDetails().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------

            if (index === 0) { //@@@: if (index == 0) {
                // if there are groups
                //
                if (m_report.getGroupsHeaders().count() > 0) { //@@@: if (m_report.getGroupsHeaders().count() > 0) {
                    // top of the last group header + C_Min_Height_Section
                    let w_groupsHeaders = m_report.getGroupsHeaders(); //@@@: cIReportGroupSections w_groupsHeaders = m_report.getGroupsHeaders();
                    let w_aspect = w_groupsHeaders.item(w_groupsHeaders.count()-1).getAspect(); //@@@: cReportAspect w_aspect = w_groupsHeaders.item(w_groupsHeaders.count()-1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } //@@@: }
                else { //@@@: else {
                    // top of the last header + C_Min_Height_Section
                    let w_headers = m_report.getHeaders(); //@@@: cReportSections w_headers = m_report.getHeaders();
                    let w_aspect = w_headers.item(w_headers.count()-1).getAspect(); //@@@: cReportAspect w_aspect = w_headers.item(w_headers.count()-1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } //@@@: }
            } //@@@: }
            else { //@@@: else {
                // top of the previous detail + C_Min_Height_Section
                //
                let w_aspect = m_report.getDetails().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getDetails().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey); //@@@: maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, ""); //@@@: maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pMoveGroupFooter = function( //@@@: private cReportSection pMoveGroupFooter(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom) { //@@@: out float maxBottom)
UNKNOWN >>             float dummy; //@@@: float dummy;
            return pMoveGroupFooter(sKeySection, minBottom, maxBottom, false, "", dummy); //@@@: return pMoveGroupFooter(sKeySection, out minBottom, out maxBottom, false, "", out dummy);
        }; //@@@: }

        const pMoveGroupFooter = function( //@@@: private cReportSection pMoveGroupFooter(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom,  //@@@: out float maxBottom,
            isForSectionLine,  //@@@: bool isForSectionLine,
            secLnKey,  //@@@: string secLnKey,
            maxBottomSectionLine) { //@@@: out float maxBottomSectionLine)
            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getGroupsFooters().item(sKeySection); //@@@: rptSec = m_report.getGroupsFooters().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) { //@@@: if (index == 0) {
                // bottom of the last detail + C_Min_Height_Section
                //
                let w_details = m_report.getDetails(); //@@@: cReportSections w_details = m_report.getDetails();
                let w_aspect = w_details.item(w_details.count() - 1).getAspect(); //@@@: cReportAspect w_aspect = w_details.item(w_details.count() - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }
            else { //@@@: else {
                // bottom of the previous group footer + C_Min_Height_Section
                //
                let w_aspect = m_report.getGroupsFooters().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getGroupsFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey); //@@@: maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, ""); //@@@: maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pMoveFooter = function( //@@@: private cReportSection pMoveFooter(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom) { //@@@: out float maxBottom)
UNKNOWN >>             float dummy; //@@@: float dummy;
            return pMoveFooter(sKeySection, minBottom, maxBottom, false, "", dummy); //@@@: return pMoveFooter(sKeySection, out minBottom, out maxBottom, false, "", out dummy);
        }; //@@@: }

        const pMoveFooter = function( //@@@: private cReportSection pMoveFooter(
            sKeySection,  //@@@: String sKeySection,
            minBottom,  //@@@: out float minBottom,
            maxBottom,  //@@@: out float maxBottom,
            isForSectionLine,  //@@@: bool isForSectionLine,
            secLnKey,  //@@@: string secLnKey,
            maxBottomSectionLine) { //@@@: out float maxBottomSectionLine)

            let index = 0; //@@@: int index = 0;
            let rptSec = null; //@@@: cReportSection rptSec = null;

            rptSec = m_report.getFooters().item(sKeySection); //@@@: rptSec = m_report.getFooters().item(sKeySection);

            index = rptSec.getRealIndex(); //@@@: index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) { //@@@: if (index == 0) {

                // if there are groups
                //
                if (m_report.getGroupsFooters().count() > 0) { //@@@: if (m_report.getGroupsFooters().count() > 0) {

                    // the bottom of the last group footer
                    //
                    let w_groupsFooters = m_report.getGroupsFooters(); //@@@: cIReportGroupSections w_groupsFooters = m_report.getGroupsFooters();
                    let w_aspect = w_groupsFooters.item(w_groupsFooters.count() - 1).getAspect(); //@@@: cReportAspect w_aspect = w_groupsFooters.item(w_groupsFooters.count() - 1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } //@@@: }
                else { //@@@: else {
                    // bottom of the last detail
                    //
                    let w_details = m_report.getDetails(); //@@@: cReportSections w_details = m_report.getDetails();
                    let w_aspect = w_details.item(w_details.count() - 1).getAspect(); //@@@: cReportAspect w_aspect = w_details.item(w_details.count() - 1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } //@@@: }
            } //@@@: }
            else { //@@@: else {
                // bottom of the previous footer
                //
                let w_aspect = m_report.getFooters().item(index - 1).getAspect(); //@@@: cReportAspect w_aspect = m_report.getFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() - m_offSet + C_MIN_HEIGHT_SECTION; //@@@: minBottom = w_aspect.getHeight() + w_aspect.getTop() - m_offSet + C_MIN_HEIGHT_SECTION;
            } //@@@: }

            if (!isForSectionLine) { //@@@: if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom); //@@@: minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            } //@@@: }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey); //@@@: maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, ""); //@@@: maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec; //@@@: return rptSec;
        }; //@@@: }

        const pGetMinBottomWithSecLn = function(secLns, minBottom) { //@@@: private float pGetMinBottomWithSecLn(cReportSectionLines secLns, float minBottom) {
            for(var i = 0; i < secLns.count() - 1; i++) { //@@@: for (int i = 0; i < secLns.count() - 1; i++) {
                minBottom = minBottom + secLns.item(i).getAspect().getHeight(); //@@@: minBottom = minBottom + secLns.item(i).getAspect().getHeight();
            } //@@@: }

            return minBottom; //@@@: return minBottom;
        }; //@@@: }

        const pGetOffSet = function(realPageHeight) { //@@@: private void pGetOffSet(float realPageHeight)
            let pageHeight = 0; //@@@: float pageHeight = 0;
            pGetOffSet(realPageHeight, pageHeight); //@@@: pGetOffSet(realPageHeight, out pageHeight);
        }; //@@@: }

        const pGetOffSet = function(realPageHeight, rtnPageHeight) { //@@@: private void pGetOffSet(float realPageHeight, out float rtnPageHeight) {
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
UNKNOWN >>                            cReportPaintObject po; //@@@: cReportPaintObject po;
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
            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === m_keyObj) { return false; } //@@@: if (m_vSelectedKeys[i] == m_keyObj) { return false; }
            } //@@@: }

            G.redim(m_vSelectedKeys, 1); //@@@: G.redim(ref m_vSelectedKeys, 1);
            m_vSelectedKeys[0] = m_keyObj; //@@@: m_vSelectedKeys[0] = m_keyObj;

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
            let height = CSReportPaint.cGlobals.getRectFromPaperSize(m_report.getPaperInfo(),; //@@@: var height = CSReportPaint.cGlobals.getRectFromPaperSize(m_report.getPaperInfo(),
                                                    w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                                    w_paperInfo.getOrientation()).Height; //@@@: w_paperInfo.getOrientation()).Height;
            top = height; //@@@: top = height;

            pGetOffSet(height); //@@@: pGetOffSet(height);

            for (i = m_report.getFooters().count()-1; i > -1; i--) { //@@@: for (i = m_report.getFooters().count()-1; i > -1; i--) {
                sec = m_report.getFooters().item(i); //@@@: sec = m_report.getFooters().item(i);
                top = top - sec.getAspect().getHeight(); //@@@: top = top - sec.getAspect().getHeight();
                pValidateSectionAspecAux(top, sec); //@@@: pValidateSectionAspecAux(top, sec);
            } //@@@: }

            pRefreshOffSetInPaintObjs(); //@@@: pRefreshOffSetInPaintObjs();
        }; //@@@: }

        const pValidateSectionAspecAux = function(top, sec) { //@@@: private float pValidateSectionAspecAux(float top, cReportSection sec) {
            let secLn = null; //@@@: cReportSectionLine secLn = null;
            let topLn = 0; //@@@: float topLn = 0;
            let secLnHeight = 0; //@@@: float secLnHeight = 0;
            let width = 0; //@@@: float width = 0;

            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            width = CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                    m_report.getPaperInfo(), //@@@: m_report.getPaperInfo(),
                                                    w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                                    w_paperInfo.getOrientation()).Width; //@@@: w_paperInfo.getOrientation()).Width;
            topLn = top; //@@@: topLn = top;

UNKNOWN >>             cReportAspect w_aspect; //@@@: cReportAspect w_aspect;

            for(var i = 0; i < sec.getSectionLines().count() - 1; i++) { //@@@: for (int i = 0; i < sec.getSectionLines().count() - 1; i++) {
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
            secLn = w_sectionLines.item(w_sectionLines.count()-1); //@@@: secLn = w_sectionLines.item(w_sectionLines.count()-1);

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
                let f = cMainEditor.getCtrlBox(this); //@@@: fControls f = cMainEditor.getCtrlBox(this);
                f.clear(); //@@@: f.clear();
                f.addCtrls(m_report); //@@@: f.addCtrls(m_report);
                if (!f.Visible) { //@@@: if (!f.Visible)
                    f.Show(m_fmain); //@@@: f.Show(m_fmain);
                } //@@@: }
            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "showControls", C_MODULE, ""); //@@@: cError.mngError(ex, "showControls", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.showControlsTree = function() { //@@@: public void showControlsTree() {
            try { //@@@: try {
                let f = cMainEditor.getCtrlTreeBox(this); //@@@: fTreeViewCtrls f = cMainEditor.getCtrlTreeBox(this);
                f.clear(); //@@@: f.clear();
                f.addCtrls(); //@@@: f.addCtrls();
                if (!f.Visible) { //@@@: if (!f.Visible)
                    f.Show(m_fmain); //@@@: f.Show(m_fmain);
                } //@@@: }
            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "showControlsTree", C_MODULE, ""); //@@@: cError.mngError(ex, "showControlsTree", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        const pSetInitDir = function() { //@@@: private void pSetInitDir() {
            if (cMainEditor.gbFirstOpen) { //@@@: if (cMainEditor.gbFirstOpen) {
                cMainEditor.gbFirstOpen = false; //@@@: cMainEditor.gbFirstOpen = false;
                // TODO: implement me
                // m_fmain.cmDialog.InitDir = cGlobals.gWorkFolder;
            } //@@@: }
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

            m_report.Progress += reportProgress; //@@@: m_report.Progress += reportProgress;
            m_report.ReportDone += reportDone; //@@@: m_report.ReportDone += reportDone;

            oLaunchInfo = new cReportLaunchInfo(); //@@@: oLaunchInfo = new cReportLaunchInfo();

            m_report.getPaperInfo().setPaperSize(m_fmain.getPaperSize()); //@@@: m_report.getPaperInfo().setPaperSize(m_fmain.getPaperSize());
            m_report.getPaperInfo().setOrientation(m_fmain.getOrientation()); //@@@: m_report.getPaperInfo().setOrientation(m_fmain.getOrientation());

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(m_fmain.printDialog)); //@@@: oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(m_fmain.printDialog));
            oLaunchInfo.setObjPaint(new cReportPrint()); //@@@: oLaunchInfo.setObjPaint(new cReportPrint());
            if (!m_report.init(oLaunchInfo)) { return; } //@@@: if (!m_report.init(oLaunchInfo)) { return; }

            m_report.setPathDefault(Application.StartupPath); //@@@: m_report.setPathDefault(Application.StartupPath);

            m_picReport.Top = C_TOPBODY; //@@@: m_picReport.Top = C_TOPBODY;
            m_picRule.Left = 0; //@@@: m_picRule.Left = 0;
            m_picReport.Left = pGetLeftBody(); //@@@: m_picReport.Left = pGetLeftBody();

            m_keyMoving = ""; //@@@: m_keyMoving = "";
            m_keySizing = ""; //@@@: m_keySizing = "";
            m_keyObj = ""; //@@@: m_keyObj = "";
            m_keyFocus = ""; //@@@: m_keyFocus = "";
            m_nextNameCtrl = 0; //@@@: m_nextNameCtrl = 0;

            m_paint = new cReportPaint(); //@@@: m_paint = new cReportPaint();

            let tR = null; //@@@: Rectangle tR = null;
            let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
            tR = new Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize( //@@@: tR = new Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                m_report.getPaperInfo(), //@@@: m_report.getPaperInfo(),
                                                w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                                w_paperInfo.getOrientation())); //@@@: w_paperInfo.getOrientation()));

            cGlobals.createStandarSections(m_report, tR); //@@@: cGlobals.createStandarSections(m_report, tR);

            reLoadReport(); //@@@: reLoadReport();
        }; //@@@: }

        const pUpdateFormulas = function(currentName, newName) { //@@@: private void pUpdateFormulas(String currentName, String newName) {
            let rptCtrl = null; //@@@: cReportControl rptCtrl = null;

            for(var i = 0; i < m_report.getControls().count(); i++) { //@@@: for (int i = 0; i < m_report.getControls().count(); i++) {

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
            if (cUtil.subString(formulaText, 0, 1).Trim() !== "_") { //@@@: if (cUtil.subString(formulaText, 0, 1).Trim() != "_")
                let fReplace = null; //@@@: fFormulaReplace fReplace = null;
                fReplace = new fFormulaReplace(); //@@@: fReplace = new fFormulaReplace();
                fReplace.txCurrFormula.Text = formulaText; //@@@: fReplace.txCurrFormula.Text = formulaText;
                fReplace.txNewFormula.Text = formulaText.Replace(currentName, newName); //@@@: fReplace.txNewFormula.Text = formulaText.Replace(currentName, newName);
                fReplace.ShowDialog(); //@@@: fReplace.ShowDialog();
                if (fReplace.getOk()) { //@@@: if (fReplace.getOk()) {
                    _rtn = fReplace.txNewFormula.Text; //@@@: _rtn = fReplace.txNewFormula.Text;
                } //@@@: }
                else { //@@@: else {
                    _rtn = formulaText; //@@@: _rtn = formulaText;
                } //@@@: }
                fReplace.Hide(); //@@@: fReplace.Hide();
            } //@@@: }
            else { //@@@: else {

                _rtn = formulaText.Replace(currentName, newName); //@@@: _rtn = formulaText.Replace(currentName, newName);
            } //@@@: }
            return _rtn; //@@@: return _rtn;
        }; //@@@: }

        self.editConnectionString = function() { //@@@: public void editConnectionString()
            let stringConnection = m_report.getConnect().getStrConnect(); //@@@: string stringConnection = m_report.getConnect().getStrConnect();
            if (cUtil.getInput(stringConnection, "You can modify the string connection of this report", "String connection")) { //@@@: if (cUtil.getInput(ref stringConnection, "You can modify the string connection of this report", "String connection"))
                m_report.getConnect().setStrConnect(stringConnection); //@@@: m_report.getConnect().setStrConnect(stringConnection);
            } //@@@: }
        }; //@@@: }

        self.editDataSource = function() { //@@@: public void editDataSource()
            let dataSource = m_report.getConnect().getDataSource(); //@@@: string dataSource = m_report.getConnect().getDataSource();
            if (cUtil.getInput(dataSource, "You can modify the data source of this report", "Data Source")) { //@@@: if (cUtil.getInput(ref dataSource, "You can modify the data source of this report", "Data Source"))
                m_report.getConnect().setDataSource(dataSource); //@@@: m_report.getConnect().setDataSource(dataSource);
            } //@@@: }
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
