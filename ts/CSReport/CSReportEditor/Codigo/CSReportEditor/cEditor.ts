(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createCEditor = function() {

        const self = {};
        let m_fmain: fMain= null;
        let m_editor: Panel= null;
        let m_picRule: PictureBox= null;
        let m_picReport: PictureBox= null;
        let m_editorTab: TabPage= null;
        let m_reportFullPath: string= "";
        let m_name: string= "";

        let m_isNew: boolean= false;

        const cEditor = function(fmain, editor, rule, report, editorTab) {
            m_fmain = fmain;
            m_editor = editor;
            m_editor.AutoScroll = true;

            m_picRule = rule;
            m_picRule.SetBounds(cUtil.mp(1), cUtil.mp(1), cUtil.mp(50), cUtil.mp(297));
            m_picRule.BackColor = Color.PeachPuff;

            m_picReport = report;
            m_picReport.SetBounds(cUtil.mp(50) + cUtil.mp(1), cUtil.mp(1), cUtil.mp(210), cUtil.mp(297));
            m_picReport.BackColor = Color.Beige;

            m_picReport.Paint +=  globalObject.CSReportDll.createPaintEventHandler(m_picReport_Paint);
            m_picRule.Paint +=  globalObject.CSReportDll.createPaintEventHandler(m_picRule_Paint);

            // mouse events
            //
            m_picReport.MouseDown +=  globalObject.CSReportDll.createMouseEventHandler(m_picReport_MouseDown);
            m_picReport.MouseUp +=  globalObject.CSReportDll.createMouseEventHandler(m_picReport_MouseUp);
            m_picReport.MouseMove +=  globalObject.CSReportDll.createMouseEventHandler(m_picReport_MouseMove);

            // tab
            //
            m_editorTab = editorTab;

            m_editorTab.Enter += (s, e) => { cMainEditor.setDocActive(this); };

            m_editorTab.Tag = this;
        };

        const cEditor = function() {

        self.close = function() {
            if (!saveChanges()) {
                return false;
            }
            else {

                // TODO: dispose all objects
                return true;
            }
        };

        const C_MODULE: string= "cEditor";
        const C_TOPBODY: number= 10;
        const C_LEFTBODY: number= 0;
        const C_MIN_HEIGHT_SECTION: number= 3;
        const C_SECTIONLINE: string= "Line ";

        const C_NOMOVE: number= -1111111;

        let m_report: cReport = null;
        let m_paint: cReportPaint = null;
        let m_keyMoving: string= "";
        let m_moveType: csRptEditorMoveType = null;
        let m_keySizing: string= "";
        let m_offX: number= 0;
        let m_offY: number= 0;
        let m_keyObj: string= "";
        let m_keyFocus: string= "";
        let m_moving: boolean= false;
        let m_opening: boolean= false;
        let m_offSet: number= 0;

        // the first SectionLine from where we need
        // to modify the top after moving sections.
        // It is used only in footers.
        let m_indexSecLnMoved: number= 0;

        // it is used in MoveSection to calculate
        // the positions after adding new SectionLines.
        //
        // good explanation is found in addSectionLine
        //
        let m_newSecLineOffSet: number= 0;

        let m_bMoveVertical: boolean= false;
        let m_bMoveHorizontal: boolean= false;
        let m_bNoMove: boolean= false;

        let m_vSelectedKeys: String[]= new String[0];
        let m_vCopyKeys: String[]= new String[0];

        let m_fProgress: fProgress = null;
        let m_cancelPrinting: boolean= false;

        let m_formIndex: number= 0;

        let m_fProperties: fProperties = null;
        let m_fSecProperties: fSecProperties = null;
        let m_fFormula: fFormula = null;
        let m_fGroup: fGroup = null;
        let m_fConnectsAux: fConnectsAux = null;

        // names
        let m_nextNameCtrl: number= 0;
        let m_showingProperties: boolean= false;
        let m_dataHasChanged: boolean= false;

        // to add new controls
        let m_copyControls: boolean= false;
        let m_copyControlsFromOtherReport: boolean= false;
        let m_bCopyWithoutMoving: boolean= false;

        let m_draging: boolean= false;
        let m_controlName: string= "";
        let m_controlType: csRptEditCtrlType = null;
        let m_fieldName: string= "";
        let m_fieldType: number= 0;
        let m_fieldIndex: number= 0;
        let m_formulaText: string= "";

        let m_x: number= 0;
        let m_y: number= 0;
        let m_keyboardMove: boolean= false;

        let m_keyboardMoveStep: number= 5;

        let m_inMouseDown: boolean= false;

        let m_typeGrid: csETypeGrid= csETypeGrid.CSEGRIDPOINTS;

        self.getEditorTab = function() {
            return m_editorTab;
        };

        self.getVCopyKeys = function(idx) {
            return m_vCopyKeys[idx];
        };

        self.getVCopyKeysCount = function() {
            return m_vCopyKeys.Length;
        };

        self.getPaint = function() {
            return m_paint;
        };

        self.setKeyboardMoveStep = function(rhs) {
            m_keyboardMoveStep = rhs;
        };
        self.getBMoveNoMove = function() {
            return m_bNoMove;
        };
        self.getBMoveVertical = function() {
            return m_bMoveVertical;
        };
        self.getBMoveHorizontal = function() {
            return m_bMoveHorizontal;
        };

        self.getPaperSize = function() {
            if (m_report === null) { return 0; }
            return m_report.getPaperInfo().getPaperSize();
        };

        self.getOrientation = function() {
            if (m_report === null) { return 0; }
            return m_report.getPaperInfo().getOrientation();
        };

        self.getCopies = function() {
            if (m_report === null) { return 0; }
            return m_report.getLaunchInfo().getCopies();
        };

        self.setPaperSize = function(rhs) {
            if (m_report === null) { return; }
            m_report.getPaperInfo().setPaperSize(rhs);
        };

        self.setOrientation = function(rhs) {
            if (m_report === null) { return; }
            m_report.getPaperInfo().setOrientation(rhs);
        };

        self.setCopies = function(rhs) {
            if (m_report === null) { return; }
            m_report.getLaunchInfo().setCopies(rhs);
        };

        self.setCustomHeight = function(rhs) {
            if (m_report === null) { return; }
            m_report.getPaperInfo().setCustomHeight(rhs);
        };

        self.setCustomWidth = function(rhs) {
            if (m_report === null) { return; }
            m_report.getPaperInfo().setCustomWidth(rhs);
        };

        self.getCustomHeight = function() {
            if (m_report === null) { return 0; }
            return m_report.getPaperInfo().getCustomHeight();
        };

        self.getCustomWidth = function() {
            if (m_report === null) { return 0; }
            return m_report.getPaperInfo().getCustomWidth();
        };

        self.getFileName = function() {
            return m_report.getPath() + m_report.getName();
        };

        self.getShowingProperties = function() {
            return m_showingProperties;
        };

        self.setShowingProperties = function(rhs) {
            m_showingProperties = rhs;
        };

        self.getFGroup = function() {
            return m_fGroup;
        };

        self.setFGroup = function(rhs) {
            m_fGroup = rhs;
        };

        self.getReport = function() {
            return m_report;
        };

        self.getDataHasChanged = function() {
            return m_dataHasChanged;
        };

        self.setDataHasChanged = function(rhs) {
            m_dataHasChanged = rhs;
        };

        self.search = function() {
            try {
                let f: fSearch= cMainEditor.getSearch(this);
                f.clear();
                if (!f.Visible) {
                    f.Show(m_fmain);
                }
            }
            catch (ex) {
                cError.mngError(ex, "showControls", C_MODULE, "");
            }
        };

        self.moveVertical = function() {
            formKeyUp(Keys.F11, false);
        };

        self.moveHorizontal = function() {
            formKeyUp(Keys.F12, false);
        };

        self.moveNoMove = function() {
            formKeyUp(Keys.F9, false);
        };

        self.moveAll = function() {
            formKeyUp(Keys.F8, false);
        };

        self.showGrid = function(typeGrid) {
            m_typeGrid = typeGrid;
            m_paint.initGrid(m_picReport.CreateGraphics(), typeGrid);
        };

        self.showConnectsAux = function() {
            try {
                m_fConnectsAux =  globalObject.CSReportDll.createFConnectsAux();

                /* TODO: this code must to be moved to fConnectsAux constructor
                 *

                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = m_fConnectsAux.lvColumns;
                    w___TYPE_NOT_FOUND.ListItems.fToolbox.clear();
                    w___TYPE_NOT_FOUND.ColumnHeaders.fToolbox.clear();
                    w___TYPE_NOT_FOUND.ColumnHeaders.Add(, , "DataSource", 2500);
                    w___TYPE_NOT_FOUND.ColumnHeaders.Add(, , "StrConnect", 5000);
                */
                for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
                    pAddConnectAuxToListView(m_report.getConnectsAux().item(_i));
                }
                m_fConnectsAux.ShowDialog();

            } catch (Exception ex) {
                cError.mngError(ex, "showConnectsAux", C_MODULE, "");
                m_fConnectsAux.Close();
                m_fConnectsAux = null;
            }
        };

        const pAddConnectAuxToListView = function(connect) {
            m_fConnectsAux.addConnect(connect.getDataSource(), connect.getStrConnect());
        };

        self.keyUp = function(sender, e) {
            e.Handled = formKeyUp(e.KeyCode, e.Control);

            if (m_keyboardMove) {
                m_keyboardMove = false;
                m_picReport_MouseUp(this, new MouseEventArgs(MouseButtons.Left, 0, m_x, m_y, 0));
                e.Handled = true;
            }
        };

        const formKeyUp = function(keyCode, ctrlKey) {
            // if we are in edit mode we do nothing
            //
            // if (TxEdit.Visible) { return; }

            switch (keyCode) {

                case Keys.F2:
                    editText();
                    break;

                case Keys.Delete:
                    deleteObj(false);
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

                default:
                    return false;
            }
            return true;
        };

        // TODO: this functionality must to be moved to fConnectsAux
        //
        const m_fConnectsAux_AddConnect = function() {
            try {

                let rptConnect: cReportConnect= null;
                rptConnect =  globalObject.CSReportDll.createCReportConnect();

                if (!configConnection(rptConnect)) { return; }

                m_report.getConnectsAux().add(rptConnect);

                pAddConnectAuxToListView(rptConnect);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fConnectsAux_AddConnect", C_MODULE, "");
            }
        };

        // TODO: this functionality must to be moved to fConnectsAux
        //
        const m_fConnectsAux_DeleteConnect = function() {
            /*
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
        };

        // TODO: this functionality must to be moved to fConnectsAux
        //
        const m_fConnectsAux_EditConnect = function() {
            /*
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
        };

        const m_fSearch_EditCtrl = function(ctrlKey) {
            try {

                selectCtrl(ctrlKey);
                showProperties();

            } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_EditCtrl", C_MODULE, "");
            }
        };

        const m_fSearch_SetFocusSec = function(secKey) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_SetFocusSec", C_MODULE, "");
            }
        };

        const editCtrl = function(ctrlKey) {
            try {

                selectCtrl(ctrlKey);
                showProperties();
            } catch (Exception ex) {
                cError.mngError(ex, "editCtrl", C_MODULE, "");
            }
        };

        self.editSection = function(secKey) {
            try {

                let bIsSecLn: boolean= false;

                pSelectSection(secKey, bIsSecLn);

                if (bIsSecLn) {
                    showSecLnProperties();
                }
                else {
                    showProperties();
                }
            } catch (Exception ex) {
                cError.mngError(ex, "editCtrl", C_MODULE, "");
            }
        };

        self.setFocusCtrl = function(ctrlKey) {
            try {

                selectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "setFocusCtrl", C_MODULE, "");
            }
        };

        self.getSectionOrSectionLineFromKey = function(key) {
            let sec: object= getSectionOrSectionLineFromKey(key, m_report.getHeaders());
            if (sec === null) {
                sec = getSectionOrSectionLineFromKey(key, m_report.getGroupsHeaders());
                if (sec === null) {
                    sec = getSectionOrSectionLineFromKey(key, m_report.getDetails());
                    if (sec === null) {
                        sec = getSectionOrSectionLineFromKey(key, m_report.getGroupsFooters());
                        if (sec === null) {
                            sec = getSectionOrSectionLineFromKey(key, m_report.getFooters());
                        }
                    }
                }
            }

            return sec;
        };

        const getSectionOrSectionLineFromKey = function(key, sections) {
            for(var i = 0; i < sections.count(); i++) {
                let sec: var= sections.item(i);
                if (sec.getKey() === key) {
                    return sec;
                }
                else {
                    let secLn: var= sec.getSectionLines().item(key);
                    if (secLn !== null) {
                        return secLn;
                    }
                }
            }
            return null;
        };

        self.selectSection = function(secKey) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "setelectSection", C_MODULE, "");
            }
        };

        self.selectCtrl = function(ctrlKey) {
            let bWasRemoved: boolean= false;
            let sKey: string= "";

            G.redim(m_vSelectedKeys, 0);
            sKey = getReport().getControls().item(ctrlKey).getKeyPaint();
            pAddToSelected(sKey, false, bWasRemoved);

            if (bWasRemoved) { sKey = ""; }

            m_keyFocus = sKey;
            m_keyObj = sKey;
            m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), true);
            cMainEditor.showProperties(ctrlKey);
        };

        const pSelectSection = function(secKey) {
            let bIsSecLn: boolean= false;
            pSelectSection(secKey, bIsSecLn);
        };

        const pSelectSection = function(secKey, bIsSecLn) {
            let bWasRemoved: boolean= false;
            let sKey: string= "";

            bIsSecLn = false;

            G.redim(m_vSelectedKeys, 0);

            if (m_report.getHeaders().item(secKey) !== null) {
                sKey = m_report.getHeaders().item(secKey).getKeyPaint();
            }
            else if (m_report.getGroupsHeaders().item(secKey) !== null) {
                sKey = m_report.getGroupsHeaders().item(secKey).getKeyPaint();
            }
            else if (m_report.getDetails().item(secKey) !== null) {
                sKey = m_report.getDetails().item(secKey).getKeyPaint();
            }
            else if (m_report.getGroupsFooters().item(secKey) !== null) {
                sKey = m_report.getGroupsFooters().item(secKey).getKeyPaint();
            }
            else if (m_report.getFooters().item(secKey) !== null) {
                sKey = m_report.getFooters().item(secKey).getKeyPaint();
            }
            else {
                let secLn: cReportSectionLine= null;
                let sec: cReportSection= null;

                bIsSecLn = true;

                secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), sec);
                if (secLn !== null) {
                    sKey = secLn.getKeyPaint();
                    if (sKey === "") {
                        sKey = sec.getKeyPaint();
                    }
                }
                else {
                    secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), sec);
                    if (secLn !== null) {
                        sKey = secLn.getKeyPaint();
                        if (sKey === "") {
                            sKey = sec.getKeyPaint();
                        }
                    }
                    else {
                        secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), sec);
                        if (secLn !== null) {
                            sKey = secLn.getKeyPaint();
                            if (sKey === "") {
                                sKey = sec.getKeyPaint();
                            }
                        }
                        else {
                            secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), sec);
                            if (secLn !== null) {
                                sKey = secLn.getKeyPaint();
                                if (sKey === "") {
                                    sKey = sec.getKeyPaint();
                                }
                            }
                            else {
                                secLn = pGetSecLnFromKey(secKey, m_report.getFooters(), sec);
                                if (secLn !== null) {
                                    sKey = secLn.getKeyPaint();
                                    if (sKey === "") {
                                        sKey = sec.getKeyPaint();
                                    }
                                }
                            }
                        }
                    }
                }
            }

            if (sKey === "") { return; }

            pAddToSelected(sKey, false, bWasRemoved);
            if (bWasRemoved) { sKey = ""; }

            m_keyFocus = sKey;
            m_keyObj = sKey;
            m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), true);
            cMainEditor.showProperties("S" + secKey);
        };

        const pGetSecLnFromKey = function(
            secKey, 
            sections, 
            rtnSec) {
            let sec: cReportSection= null;
            rtnSec = null;
            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                if (sec.getSectionLines().item(secKey) !== null) {
                    rtnSec = sec;
                    return sec.getSectionLines().item(secKey);
                }
            }
            return null;
        };

        self.checkSyntax = function(code) {
            let f: cReportFormula= null;

            f =  globalObject.CSReportDll.createCReportFormula();

            if (m_fProperties !== null) {
                f.setName(m_fProperties.getFormulaName());
            }
            else if (m_fSecProperties !== null) {
                f.setName(m_fSecProperties.getFormulaName());
            }
            else {
                f.setName(cMainEditor.getCtrlTreeBox().getFormulaName());
            }

            f.setText(code);

            return m_report.getCompiler().checkSyntax(f);
        };

        self.showHelpChartField = function(ctrl, idx) {
            let nIndex: number= 0;
            let nFieldType: number= 0;
            let sField: string= "";

            sField = ctrl.Text;
            nFieldType = m_fProperties.getChartFieldType(idx);
            nIndex = m_fProperties.getChartIndex(idx);

            if (cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                ctrl.Text = sField;
                m_fProperties.setChartFieldType(idx, nFieldType);
                m_fProperties.setChartIndex(idx, nIndex);
                return true;
            }
            else {
                return false;
            }
        };

        self.showHelpChartGroupField = function() {
            let nIndex: number= 0;
            let nFieldType: number= 0;
            let sField: string= "";

            sField = m_fProperties.getDbFieldGroupValue();
            nFieldType = m_fProperties.getChartGroupFieldType();
            nIndex = m_fProperties.getChartGroupIndex();

            if(cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                m_fProperties.setDbFieldGroupValue(sField);
                m_fProperties.setChartGroupFieldType(nFieldType);
                m_fProperties.setChartGroupIndex(nIndex);
                return true;
            }
            else {
                return false;
            }
        };

        self.showEditFormula = function(formula) {

            try {
                let f: cReportFormulaType= null;
                let c: cReportControl= null;

                if (m_fFormula === null) {
                    m_fFormula =  globalObject.CSReportDll.createFFormula();
                    // TODO: set event handlers for fFormula
                }

                // TODO: this functionality has to be moved to fFormula
                //

                // Load formulas in the tree
                m_fFormula.createTree();

                for(var _i = 0; _i < m_report.getFormulaTypes().count(); _i++) {
                    f = m_report.getFormulaTypes().item(_i);
                    m_fFormula.addFormula(f.getId(), f.getName(), f.getNameUser(), f.getDecrip(), f.getHelpContextId());
                }

                for(var _i = 0; _i < m_report.getControls().count(); _i++) {
                    c = m_report.getControls().item(_i);
                    if (c.getControlType() === csRptControlType.CSRPTCTFIELD) {
                        m_fFormula.addDBField(c.getName(), c.getField().getName());
                    }
                    else if (c.getControlType() === csRptControlType.CSRPTCTLABEL) {
                        m_fFormula.addLabel(c.getName());
                    }
                }

                m_fFormula.setFormula(formula);

                m_fFormula.setHandler(this);

                m_fFormula.expandTree();

                //
                // TODO: end functionality to move

                m_fFormula.ShowDialog();

                if (m_fFormula.getOk()) {
                    formula = m_fFormula.getFormula();
                    return true;
                }
                else {
                    return false;
                }

            }
            catch (ex) {
                cError.mngError(ex, "showEditFormula", C_MODULE, "");
                return false;
            }
UNKNOWN >>             finally
            {
                m_fFormula.Hide();
                m_fFormula = null;
            }
        };

        const m_fSecProperties_UnloadForm = function() {
            m_fSecProperties = null;
        };

        const m_fToolBox_AddControl = function(
            controlName, 
            controlType, 
            fieldName, 
            formulaText, 
            fieldType, 
            fieldIndex) {
            beginDraging();
            m_controlName = controlName;
            m_controlType = controlType;
            m_fieldName = fieldName;
            m_formulaText = formulaText;
            m_fieldIndex = fieldIndex;
            m_fieldType = fieldType;
        };

        const m_fTreeCtrls_UpdateFormulaHide = function(ctrlKey, formula) {
            m_report.getControls().item(ctrlKey).getFormulaHide().setText(formula);
        };

        const m_fTreeCtrls_UpdateFormulaValue = function(ctrlKey, formula) {
            m_report.getControls().item(ctrlKey).getFormulaValue().setText(formula);
        };

        const m_fTreeCtrls_UpdateSectionFormulaHide = function(secKey, formula) {

            if (m_report.getHeaders().item(secKey) !== null) {
                m_report.getHeaders().item(secKey).getFormulaHide().setText(formula);
            }
            else if (m_report.getGroupsHeaders().item(secKey) !== null) {
                m_report.getGroupsHeaders().item(secKey).getFormulaHide().setText(formula);
            }
            else if (m_report.getDetails().item(secKey) !== null) {
                m_report.getDetails().item(secKey).getFormulaHide().setText(formula);
            }
            else if (m_report.getGroupsFooters().item(secKey) !== null) {
                m_report.getGroupsFooters().item(secKey).getFormulaHide().setText(formula);
            }
            else if (m_report.getFooters().item(secKey) !== null) {
                m_report.getFooters().item(secKey).getFormulaHide().setText(formula);
            }
            else {
                let secLn: cReportSectionLine= null;
                let sec: cReportSection= null;

                secLn = pGetSecLnFromKey(secKey, m_report.getHeaders(), sec);
                if (secLn !== null) {
                    secLn.getFormulaHide().setText(formula);
                }
                else {
                    secLn = pGetSecLnFromKey(secKey, m_report.getGroupsHeaders(), sec);
                    if (secLn !== null) {
                        secLn.getFormulaHide().setText(formula);
                    }
                    else {
                        secLn = pGetSecLnFromKey(secKey, m_report.getDetails(), sec);
                        if (secLn !== null) {
                            secLn.getFormulaHide().setText(formula);
                        }
                        else {
                            secLn = pGetSecLnFromKey(secKey, m_report.getGroupsFooters(), sec);
                            if (secLn !== null) {
                                secLn.getFormulaHide().setText(formula);
                            }
                            else {
                                secLn = pGetSecLnFromKey(secKey, m_report.getFooters(), sec);
                                if (secLn !== null) {
                                    secLn.getFormulaHide().setText(formula);
                                }
                            }
                        }
                    }
                }
            }
        };

        self.keyDown = function(sender, e) {
            let keyCode: Keys= e.KeyCode;
            let shift: boolean= e.Shift;
            let aspect: cReportAspect= null;
            try {

                // only process arrow keys
                switch (keyCode) {
                case Keys.Up:
                        break;
                case Keys.Down:
                        break;
                case Keys.Left:
                        break;
                case Keys.Right:
                        break;
                default:
                        return;
                }

                e.Handled = true;

                let x: number= 0;
                let y: number= 0;

                if (m_vSelectedKeys.Length < 1) { return; }

                if (!m_keyboardMove) {
                    aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
                    y = Convert.ToInt32(aspect.getTop());
                    x = Convert.ToInt32(aspect.getLeft());
                }
                else {
                    y = m_y;
                    x = m_x;
                }

                // resize
                //
                if (shift) {

                    if (m_keySizing === "") {
                        m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey();
                    }

                    if (!m_keyboardMove) {

                        aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
                        y += Convert.ToInt32(aspect.getHeight());
                        x += Convert.ToInt32(aspect.getWidth());

                        pSetMovingFromKeyboard(x, y);

                        if (m_keySizing === "") {
                            m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey();
                        }

                        switch (keyCode) {

                        case Keys.Down:
                        case Keys.Up:
                                m_keyMoving = "";
                                m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                break;
                        case Keys.Right:
                        case Keys.Left:
                                m_keyMoving = "";
                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                break;
                        }
                    }

                    switch (keyCode) {
                    case Keys.Up:
                            y = y - m_keyboardMoveStep;
                            break;
                    case Keys.Down:
                            y = y + m_keyboardMoveStep;
                            break;
                    case Keys.Left:
                            x = x - m_keyboardMoveStep;
                            break;
                    case Keys.Right:
                            x = x + m_keyboardMoveStep;
                            break;
                    }

                    // move
                    //
                }
                else {

                    if (!m_keyboardMove) {
                        pSetMovingFromKeyboard(x, y);
                    }

                    if (m_keyMoving === "") {
                        m_keyMoving = m_paint.getPaintObject(m_vSelectedKeys[0]).getKey();
                    }

                    switch (keyCode) {
                    case Keys.Up:
                            y = y - m_keyboardMoveStep;
                            break;
                    case Keys.Down:
                            y = y + m_keyboardMoveStep;
                            break;
                    case Keys.Left:
                            x = x - m_keyboardMoveStep;
                            break;
                    case Keys.Right:
                            x = x + m_keyboardMoveStep;
                            break;
                    }
                }

                m_picReport_MouseMove(this, new MouseEventArgs(MouseButtons.Left, 0, x, y, 0));
                m_x = x;
                m_y = y;

                m_keyboardMove = true;

            } catch (Exception ex) {
                cError.mngError(ex, "m_picReport_KeyDown", C_MODULE, "");
            }
        };

        const pSetMovingFromKeyboard = function(x, y) {

            m_keyMoving = m_keyFocus;

            let po: cReportPaintObject= m_paint.getPaintObject(m_keyMoving);

            switch (po.getTag()) {
                case cGlobals.C_KEY_DETAIL:
                case cGlobals.C_KEY_FOOTER:
                case cGlobals.C_KEY_HEADER:
                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                    m_picReport.Cursor = Cursors.SizeNS;
                    break;
                default:
                    if (po.getRptType() === csRptSectionType.DETAIL
                        || po.getRptType() === csRptSectionType.HEADER
                        || po.getRptType() === csRptSectionType.GROUP_HEADER
                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                        || po.getRptType() === csRptSectionType.FOOTER) {

                        m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    }
                    else if (po.getRptType() === csRptSectionType.SECLN_HEADER
                        || po.getRptType() === csRptSectionType.SECLN_DETAIL
                        || po.getRptType() === csRptSectionType.SECLN_FOOTER
                        || po.getRptType() === csRptSectionType.SECLN_GROUPH
                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) {

                        m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    }
                    else {
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                        m_picReport.Cursor = Cursors.SizeNS;
                    }
                    break;
            }

            let aspect: cReportAspect= m_paint.getPaintObject(m_keyMoving).getAspect();
            m_offX = x - aspect.getLeft();
            m_offY = y - (aspect.getTop() - aspect.getOffset());

            m_keyObj = m_keyMoving;

            cGlobals.setEditAlignTextState(m_vSelectedKeys.Length);
            cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1);
            pSetEditAlignValue();
            pSetFontBoldValue();

        };

        const m_picReport_MouseDown = function(sender, e) {
            if (m_paint === null) return; {

            let button: MouseButtons= e.Button;
            let ctrlKey: boolean= Control.ModifierKeys.HasFlag(Keys.Control) || Control.ModifierKeys.HasFlag(Keys.Shift);
            let x: number= e.X;
            let y: number= e.Y;

            try {

                let sKey: string= "";
                let bClearSelected: boolean= false;
                let lastKeyMoving: string= "";
                let lastKeyObj: string= "";

                // to avoid reentrancy
                if (m_opening) { return; }

                m_inMouseDown = true;

                if (m_draging) {
                    addControlEnd(x, y);
                    endDraging();
                }

                endEditText(false);

                bClearSelected = pClearSelected(button, ctrlKey, x, y);

                if (button === MouseButtons.Left) {

                    lastKeyObj = m_keyObj;
                    m_keyObj = "";

                    sKey = m_keyMoving !== "" ? m_keyMoving : m_keySizing;

                    // to force focus in the header
                    if (sKey === "") {
                        m_paint.pointIsInObject(x, y, sKey);

                        if (sKey !== "") {

                            let po: cReportPaintObject= m_paint.getPaintObject(sKey);
                            lastKeyMoving = m_keyMoving;
                            m_keyMoving = sKey;

                            switch (po.getTag())
                            {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:

                                    // only if no controls are selected
                                    //
                                    if (ctrlKey) {

                                        if (m_vSelectedKeys.Length > 0) {
                                            return;
                                        if (m_vSelectedKeys[0].Length > 0) {
                                            return;
                                        m_keyMoving = lastKeyMoving;
                                        m_keyObj = lastKeyObj;
                                        return;
                                    }

                                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    m_picReport.Cursor = Cursors.SizeNS;
                                    break;

                                default:
                                    if (po.getRptType() === csRptSectionType.DETAIL
                                        || po.getRptType() === csRptSectionType.HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                                        || po.getRptType() === csRptSectionType.FOOTER) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) {

                                            if (m_vSelectedKeys.Length > 0) {
                                                return;
                                            if (m_vSelectedKeys[0].Length > 0) {
                                                return;
                                            m_keyMoving = lastKeyMoving;
                                            m_keyObj = lastKeyObj;
                                            return;
                                        }

                                        m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    }
                                    else if (po.getRptType() === csRptSectionType.SECLN_HEADER
                                        || po.getRptType() === csRptSectionType.SECLN_DETAIL
                                        || po.getRptType() === csRptSectionType.SECLN_FOOTER
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPH
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) {
                                            if (m_vSelectedKeys.Length > 0) {
                                                return;
                                            if (m_vSelectedKeys[0].Length > 0) {
                                                return;
                                            m_keyMoving = lastKeyMoving;
                                            m_keyObj = lastKeyObj;
                                            return;
                                        }

                                        m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    }
                                    else {
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                                        m_picReport.Cursor = Cursors.SizeAll;
                                    }
                                    break;
                            }
                        }
                    }

                    let bWasRemoved: boolean= false;
                    pAddToSelected(m_keyMoving, ctrlKey, bWasRemoved);

                    if (bWasRemoved) { sKey = ""; }

                    if (sKey !== "") {
                        let aspect: cReportAspect= m_paint.getPaintObject(sKey).getAspect();
                        m_offX = x - aspect.getLeft();
                        m_offY = y - (aspect.getTop() - aspect.getOffset());
                    }

                    m_keyFocus = sKey;
                    m_keyObj = sKey;
                    m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), bClearSelected);

                    let poSelected: cReportPaintObject= m_paint.getPaintObject(sKey);
                    if (poSelected !== null) {
                        cMainEditor.showProperties(
                            poSelected.getIsSection()
                            ? "S" + poSelected.getTag()
                            : poSelected.getTag());
                    }
                }
                else if (button === MouseButtons.Right) {
                    m_keySizing = "";
                    m_keyMoving = "";
                    m_keyObj = "";

                    if (m_paint.pointIsInObject(x, y, sKey)) {
                        m_keyObj = sKey;

                        bClearSelected = pSetSelectForRightBttn();

                        m_keyFocus = sKey;
                        m_paint.setFocus(m_keyFocus, m_picReport.CreateGraphics(), bClearSelected);

                        let po: cReportPaintObject= m_paint.getPaintObject(sKey);

                        if (m_paint.paintObjIsSection(sKey)) {

                            let noDelete: boolean= false;

                            switch (po.getTag())
                            {
                                // this sections can not be moved
                                case cGlobals.C_KEY_HEADER:
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                    noDelete = true;
                                    break;

                                default:
                                    noDelete = false;
                                    break;
                            }

                            let isGroup: boolean= false;
                            let isSecLn: boolean= false;

                            pGetSection(isGroup, isSecLn);

                            if (isSecLn) { noDelete = true; }

                            showPopMenuSection(noDelete, isGroup, x, y);

                            cMainEditor.showProperties("S" + po.getTag());
                        }
                        else {
                            showPopMenuControl(true, x, y);

                            cMainEditor.showProperties(po.getTag());
                        }
                    }
                    else {
                        showPopMenuControl(false, x, y);
                    }
                }

                cGlobals.setEditAlignTextState(m_vSelectedKeys.Length);
                cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1);
                pSetEditAlignValue();
                pSetFontBoldValue();

            }
            catch (ex) {
                cError.mngError(ex, "m_picReport_MouseDown", C_MODULE, "");
            }
UNKNOWN >>             finally
            {
                m_inMouseDown = false;
            }
        };

        self.setFontBold = function() {
            let bBold: number= -2;
            let bBoldValue: boolean= false;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                let font: cReportFont= m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

                if (bBold === -2) {
                    bBold = font.getBold() ? -1 : 0;
                }
                else if (bBold !== (font.getBold() ? -1 : 0)) {
                    bBold = -2;
                    break;
                }
            }

            if (bBold === -2) {
                bBoldValue = true;
            }
            else {
                bBoldValue = bBold === 0;
            }

            let paintObject: cReportPaintObject= null;
            let rptCtrl: cReportControl= null;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {

                paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                rptCtrl = m_report.getControls().item(paintObject.getTag());
                rptCtrl.getLabel().getAspect().getFont().setBold(bBoldValue);
                paintObject.getAspect().getFont().setBold(bBoldValue);
            }

            m_dataHasChanged = true;
            refreshAll();
            pSetFontBoldValue();
        };

        self.pSetFontBoldValue = function() {
            let bBold: number= -2;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                let font: cReportFont= m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

                if (bBold === -2) {
                    bBold = font.getBold() ? -1 : 0;
                }
                else if (bBold !== (font.getBold() ? -1 : 0)) {
                    bBold = -2;
                    break;
                }
            }

            cGlobals.setEditFontBoldValue(bBold);
        };

        self.controlsAlign = function(align) {
            let paintObject: cReportPaintObject= null;
            let rptCtrl: cReportControl= null;

            let top: number= 0;
            let left: number= 0;

            let newTop: number= 0;
            let newLeft: number= 0;
            let height: number= 0;
            let width: number= 0;
UNKNOWN >>             cReportAspect aspect;

            switch (align) {

                case csECtlAlignConst.csECtlAlignHeight:
                case csECtlAlignConst.csECtlAlignWidth:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
                    height = aspect.getHeight();
                    width = aspect.getWidth();
                    break;

                case csECtlAlignConst.csECtlAlignVertical:
                case csECtlAlignConst.csECtlAlignHorizontal:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[0]).getAspect();
                    newTop = aspect.getTop();
                    newLeft = aspect.getLeft();
                    break;

                default:

                    switch (align) {
                        case csECtlAlignConst.csECtlAlignLeft:
                            newLeft = 100000;
                            break;
                        case csECtlAlignConst.csECtlAlignRight:
                            newLeft = 0;
                            break;
                        case csECtlAlignConst.csECtlAlignTop:
                            newTop = 100000;
                            break;
                        case csECtlAlignConst.csECtlAlignBottom:
                            newTop = 0;
                            break;
                    }

                    for(var i = 0; i < m_vSelectedKeys.Length; i++) {

                        aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();
                        top = aspect.getTop();
                        left = aspect.getLeft();

                        switch (align) {
                            case csECtlAlignConst.csECtlAlignLeft:
                                if (left < newLeft) { newLeft = left; }
                                break;
                            case csECtlAlignConst.csECtlAlignRight:
                                if (left > newLeft) { newLeft = left; }
                                break;
                            case csECtlAlignConst.csECtlAlignTop:
                                if (top < newTop) { newTop = top; }
                                break;
                            case csECtlAlignConst.csECtlAlignBottom:
                                if (top > newTop) { newTop = top; }
                                break;
                        }
                    }

                    break;
            }

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {

                paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                rptCtrl = m_report.getControls().item(paintObject.getTag());

                switch (align) {

                    case csECtlAlignConst.csECtlAlignHeight:
                        rptCtrl.getLabel().getAspect().setHeight(height);
                        paintObject.getAspect().setHeight(height);
                        break;

                    case csECtlAlignConst.csECtlAlignWidth:
                        rptCtrl.getLabel().getAspect().setWidth(width);
                        paintObject.getAspect().setWidth(width);
                        break;

                    case csECtlAlignConst.csECtlAlignLeft:
                    case csECtlAlignConst.csECtlAlignRight:
                    case csECtlAlignConst.csECtlAlignHorizontal:
                        rptCtrl.getLabel().getAspect().setLeft(newLeft);
                        paintObject.getAspect().setLeft(newLeft);
                        break;

                    case csECtlAlignConst.csECtlAlignTop:
                    case csECtlAlignConst.csECtlAlignBottom:
                    case csECtlAlignConst.csECtlAlignVertical:
                        rptCtrl.getLabel().getAspect().setTop(newTop);
                        paintObject.getAspect().setTop(newTop);
                        break;
                }
            }

            m_dataHasChanged = true;
            refreshAll();
        };

        self.textAlign = function(align) {
            let paintObject: cReportPaintObject= null;
            let rptCtrl: cReportControl= null;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {

                paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                rptCtrl = m_report.getControls().item(paintObject.getTag());

                rptCtrl.getLabel().getAspect().setAlign(align);
                paintObject.getAspect().setAlign(align);
            }

            m_dataHasChanged = true;
            refreshAll();
            pSetEditAlignValue();
        };

        const pSetEditAlignValue = function() {
            let align: number= -1;

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                let aspect: CSReportDll.cReportAspect= m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();

                if (align === -1) {
                    align = aspect.getAlign();
                }
                else if (align !== aspect.getAlign()) {
                    align = -2;
                    break;
                }
            }
            cGlobals.setEditAlignValue(align);
        };

        const pAddToSelected = function(sKey, ctrlKey, bWasRemoved) {

            bWasRemoved = false;
            if (sKey === "") { return; }

            bWasRemoved = false;

            if (ctrlKey) {

                for(var i = 0; i < m_vSelectedKeys.Length; i++) {

                    if (m_vSelectedKeys[i] === sKey) {
                        pRemoveFromSelected(sKey);
                        bWasRemoved = true;
                        return;
                    }
                }
            }
            else {
                if (pAllreadySelected(sKey)) { return; }
            }

            G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length + 1);
            m_vSelectedKeys[m_vSelectedKeys.Length - 1] = sKey;
        };

        const pAllreadySelected = function(sKey) {
            if (sKey === "") {
                return true;
            }

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) {
                    return true;
                }
            }
            return false;
        };

        const pRemoveFromSelected = function(sKey) {
UNKNOWN >>             int i;

            for (i = 0; i < m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) {
                    break;
                }
            }

            if (i > m_vSelectedKeys.Length) { return; }
            for (i = i + 1; i < m_vSelectedKeys.Length; i++) {
                m_vSelectedKeys[i - 1] = m_vSelectedKeys[i];
            }
            if (m_vSelectedKeys.Length > 0) {
                G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length - 1);
            }
            else {
                G.redim(m_vSelectedKeys, 0);
            }

            m_paint.removeFromSelected(sKey, m_picReport.CreateGraphics());
        };

        const pClearSelected = function(button, ctrlKey, x, y) {
            let sKey: string= "";

            if (!ctrlKey && button !== MouseButtons.Right) {
                m_paint.pointIsInObject(x, y, sKey);
                for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                    if (m_vSelectedKeys[i] === sKey) {
                        return false;
                    }
                }
                G.redim(m_vSelectedKeys, 0);
                return true;
            }
            return false;
        };

        const pShowMoveAll = function(x, y) {
            let i: number= 0;
            let offsetTop: number= 0;
            let offsetLeft: number= 0;
            let firstLeft: number= 0;
            let firstTop: number= 0;
            let clear: boolean= false;
            let offSet2: number= 0;

            if (m_vSelectedKeys.Length === 0) { return; }

            let aspect: cReportAspect= m_paint.getPaintObject(m_keyMoving).getAspect();
            firstLeft = aspect.getLeft();
            firstTop = aspect.getTop();

            clear = true;

            for (i = m_vSelectedKeys.Length-1; i > -1; i--) {

                aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();
                offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft());
                offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop());
                offSet2 = aspect.getOffset();

                if (m_bMoveHorizontal) {
                    m_paint.moveObjToXYEx(m_keyMoving,
                                            x - m_offX + offsetLeft,
                                            firstTop - offSet2 + offsetTop,
                                            m_picReport.CreateGraphics(),
                                            clear);
                }
                else if (m_bMoveVertical) {
                    m_paint.moveObjToXYEx(m_keyMoving,
                                            firstLeft + offsetLeft,
                                            y - m_offY + offsetTop,
                                            m_picReport.CreateGraphics(),
                                            clear);
                }
                else {
                    m_paint.moveObjToXYEx(m_keyMoving,
                                            x - m_offX + offsetLeft,
                                            y - m_offY + offsetTop,
                                            m_picReport.CreateGraphics(),
                                            clear);
                }

                if (clear) { clear = false; }
            }
        };

        const m_picReport_MouseMove = function(sender, e) {
            if (m_paint === null) return; {

            let button: MouseButtons= e.Button;
            let x: number= e.X;
            let y: number= e.Y;

            let sKey: string= "";
            let rgnTp: csRptPaintRegionType= csRptPaintRegionType.CRPTPNTRGNTYPEBODY;

            if (m_draging) { return; }

            if (m_inMouseDown) { return; }

            if (button === MouseButtons.Left) {

                m_paint.beginMove();

                if (m_keyMoving !== "") {

                    switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL:
                            pShowMoveAll(x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL:
                            m_paint.moveHorizontal(m_keyMoving, x, m_picReport.CreateGraphics());
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
                            m_paint.moveVertical(m_keyMoving, y, m_picReport.CreateGraphics());
                            break;
                    }

                    m_moving = true;

                }
                else if (m_keySizing !== "") {
                    switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVDOWN:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFT:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVUP:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                            m_paint.resize(m_picReport.CreateGraphics(), m_keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE);
                            break;
                    }
                    m_moving = true;
                }
                else {
                    m_moving = false;
                }
            }
            else {
                if (m_keyFocus !== "") {
                    sKey = m_keyFocus;
                    if (m_paint.pointIsInThisObject(x, y, m_keyFocus, rgnTp)) {
                        let po: cReportPaintObject= m_paint.getPaintObject(sKey);

                        let ctrl: cReportControl= m_report.getControls().item(po.getTag());
                        pSetSbPnlCtrl(
                            ctrl.getName(),
                            ctrl.getControlType(),
                            ctrl.getFormulaHide().getText(),
                            ctrl.getFormulaValue().getText(),
                            ctrl.getHasFormulaHide(),
                            ctrl.getHasFormulaValue(),
                            ctrl.getField().getName());

                        if (po.getPaintType() === csRptPaintObjType.CSRPTPAINTOBJLINE) {
                            m_keyMoving = sKey;
                            m_keySizing = "";
                            m_picReport.Cursor = Cursors.SizeNS;
                        }
                        else {
                            switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:
                                    m_keyMoving = sKey;
                                    m_keySizing = "";
                                    m_picReport.Cursor = Cursors.SizeNS;
                                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    break;

                                default:

                                if (po.getRptType() === csRptSectionType.DETAIL
                                    || po.getRptType() === csRptSectionType.HEADER
                                    || po.getRptType() === csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                                    || po.getRptType() === csRptSectionType.FOOTER) {

                                        m_keyMoving = sKey;
                                        m_keySizing = "";
                                        m_picReport.Cursor = Cursors.SizeNS;
                                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    }
                                    else {

                                        switch (rgnTp) {
                                    case csRptPaintRegionType.CRPTPNTRGNTYPEBODY:
                                                m_picReport.Cursor = Cursors.SizeAll;
                                                m_keyMoving = sKey;
                                                m_keySizing = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEDOWN:
                                                m_picReport.Cursor = Cursors.SizeNS;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEUP:
                                                m_picReport.Cursor = Cursors.SizeNS;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVUP;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFT:
                                                m_picReport.Cursor = Cursors.SizeWE;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFT;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHT:
                                                m_picReport.Cursor = Cursors.SizeWE;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN:
                                                m_picReport.Cursor = Cursors.SizeNESW;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFTDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP:
                                                m_picReport.Cursor = Cursors.SizeNESW;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTUP;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN:
                                                m_picReport.Cursor = Cursors.SizeNWSE;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP:
                                                m_picReport.Cursor = Cursors.SizeNWSE;
                                                m_keySizing = sKey;
                                                m_keyMoving = "";
                                                m_moveType = csRptEditorMoveType.CSRPTEDMOVLEFTUP;
                                                break;

                                            default:
                                                m_keySizing = "";
                                                m_keyMoving = "";
                                                break;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    else {
                        pSetSbPnlCtrl("");
                        m_picReport.Cursor = Cursors.Default;
                        m_keySizing = "";
                        m_keyMoving = "";
                    }
                }

                if (m_paint.pointIsInObject(x, y, sKey, rgnTp)) {
                    let po: cReportPaintObject= m_paint.getPaintObject(sKey);
                    if (po.getRptType() === csRptSectionType.CONTROL) {
                        let rptCtrl: cReportControl= null;
                        rptCtrl = m_report.getControls().item(po.getTag());
                        if (rptCtrl !== null) {
                            pSetSbPnlCtrl(rptCtrl.getName(),
                                            rptCtrl.getControlType(),
                                            rptCtrl.getFormulaHide().getText(),
                                            rptCtrl.getFormulaValue().getText(),
                                            rptCtrl.getHasFormulaHide(),
                                            rptCtrl.getHasFormulaValue(),
                                            rptCtrl.getField().getName());
                        }
                    }
                    else {
                        pSetSbPnlCtrl("");
                    }
                }
                else {
                    pSetSbPnlCtrl("");
                }
            }
        };

        const pSetSbPnlCtrl = function(ctrlName) {
            pSetSbPnlCtrl (ctrlName, csRptControlType.CSRPTCTLABEL, "", "", false, false, "");
        };

        const pSetSbPnlCtrl = function(
            ctrlName, 
            ctrlType, 
            formulaHide, 
            formulaValue, 
            hasFormulaHide, 
            hasFormulaValue, 
            fieldName) {

            let msg: string= "";
            let strCtlType: string= "";

            switch (ctrlType) {
                case csRptControlType.CSRPTCTDBIMAGE:
                    strCtlType = "DbImage";
                    break;
                case csRptControlType.CSRPTCTFIELD:
                    strCtlType = "Field";
                    break;
                case csRptControlType.CSRPTCTIMAGE:
                    strCtlType = "Image";
                    break;
                case csRptControlType.CSRPTCTLABEL:
                    strCtlType = "Label";
                    break;
            }

            if (ctrlName !== "") {
                msg = "Ctl:[" + ctrlName
                    + "]Tipo:[" + strCtlType
                    + "]F.Hide:[" + cUtil.subString(formulaHide, 1, 100)
                    + "]Activa[" + ( hasFormulaHide).ToString()
                    + "]F.Value:[" + cUtil.subString(formulaValue, 1, 100)
                    + "]Activa[" + ( hasFormulaValue).ToString()
                    + "]Field:[" + fieldName + "]";
            }
            m_fmain.setsbPnlCtrl(msg);
        };

        const m_picReport_MouseUp = function(sender, e) {
            if (m_paint === null) return; {

            let button: MouseButtons= e.Button;
            let x: number= e.X;
            let y: number= e.Y;

            // to avoid reentrancy
            if (m_opening) { return; }

            //----------------------------------------------------
            // MOVING
            //----------------------------------------------------

            if (m_moving) {
                if (m_keyMoving !== "") {
                    switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL:
                            if (m_bMoveVertical) {
                                pMoveAll(C_NOMOVE, y);
                            }
                            else if (m_bMoveHorizontal) {
                                pMoveAll(x, C_NOMOVE);
                            }
                            else {
                                pMoveAll(x, y);
                            }
                            break;

                        case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL:
                            pMoveHorizontal(x);
                            break;

                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
                            pMoveVertical(x, y);
                            break;
                    }

                //----------------------------------------------------
                // SIZING
                //----------------------------------------------------
                }
                else if (m_keySizing !== "") {
                    pResizeControl(x, y);
                }

                refreshBody();
                m_moving = false;
                refreshRule();
            }

            m_keySizing = "";
            m_keyMoving = "";
        };

        const m_picReport_Paint = function(sender, e) {
            if (m_paint !== null) {
                m_paint.paintPicture(e.Graphics, false);
            }
        };

        const m_picRule_Paint = function(sender, e) {
            if (m_paint !== null) {
                let ps: cReportPaintObjects= m_paint.getPaintSections();
                for(var i = 0; i < ps.count(); i++) {
                    m_paint.drawRule(ps.getNextKeyForZOrder(i), e.Graphics);
                }
            }
        };

        self.setParameters = function() {
            let connect: CSConnect.cConnect= new CSConnect.cConnect();
            let param: cParameter= null;

            for(var _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) {
                param = m_report.getConnect().getParameters().item(_i);
                let connectParam: CSConnect.cParameter= connect.getParameters().add(null, "");
                connectParam.setName(param.getName());
                connectParam.setValue(param.getValue());
            }

            if (m_report.getConnect().getDataSource() === "") {
                cWindow.msgWarning("Before editting the parameter info you must define a connection");
                return;
            }

            connect.setStrConnect(m_report.getConnect().getStrConnect());
            connect.setDataSource(m_report.getConnect().getDataSource());
            connect.setDataSourceType(m_report.getConnect().getDataSourceType());

            if (!connect.getDataSourceColumnsInfo(m_report.getConnect().getDataSource(),
                m_report.getConnect().getDataSourceType())) {
                return;

            cGlobals.setParametersAux(connect, m_report.getConnect());
        };

        self.setSimpleConnection = function() {
            let f: fSimpleConnect= new fSimpleConnect();
            try {

                let strConnect: string= "";
                strConnect = m_report.getConnect().getStrConnect();
                f.setServer(cUtil.getToken("Data Source", strConnect));
                f.setDataBase(cUtil.getToken("Initial Catalog", strConnect));
                f.setUser(cUtil.getToken("User ID", strConnect));
                f.setPassword(cUtil.getToken("Password", strConnect));
                if (f.getUser() === "") {
                    f.setConnectTypeToNT();
                }
                else {
                    f.setConnectTypeToSQL();
                }
                f.ShowDialog();

                if (!f.getOk()) {
                    f.Close();
                }
                else {
                    m_report.getConnect().setStrConnect(f.getStrConnect());
                }

            } catch (Exception ex) {
                cError.mngError(ex, "configConnection", C_MODULE, "");
                f.Close();
            }
        };

        self.configConnection = function(rptConnect) {
            try {

                let connect: CSConnect.cConnect= new CSConnect.cConnect();

                if (!connect.showOpenConnection()) {
                    return false;

                refreshAll();

                if (!connect.getDataSourceColumnsInfo(
                    connect.getDataSource(),
                    connect.getDataSourceType())) {
                    return false;
                }

                if (rptConnect === null) {
                    cGlobals.setParametersAux(connect, m_report.getConnect());
                }
                else {
                    cGlobals.setParametersAux(connect, rptConnect);
                }

                if (cMainEditor.getToolbox(this) !== null) { showToolbox(); }

                return true;

            } catch (Exception ex) {
                cError.mngError(ex, "configConnection", C_MODULE, "");
                return false;
            }
        };

        self.setAllConnectToMainConnect = function() {
            try {

                let connect: cReportConnect= null;
                for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
                    connect = m_report.getConnectsAux().item(_i);
                    connect.setStrConnect(m_report.getConnect().getStrConnect());
                }

            } catch (Exception ex) {
                cError.mngError(ex, "setAllConnectToMainConnect", C_MODULE, "");
            }
        };

        self.deleteObj = function(bDelSectionLine) {
            let sec: cReportSection= null;
            let secs: cReportSections= null;
            let secLn: cReportSectionLine= null;
            let ctrl: cReportControl= null;
            let paintObj: cReportPaintObject= null;

            let isGroupFooter: boolean= false;
            let isGroupHeader: boolean= false;
            let isSecLn: boolean= false;

            if (m_keyFocus === "") { return; }

            let group: cReportGroup= null;
            let secG: cReportSection= null;

            if (m_paint.paintObjIsSection(m_keyFocus)) {
                if (m_paint.getPaintSections().item(m_keyFocus) === null) { return; }

                let po: cReportPaintObject= m_paint.getPaintSections().item(m_keyFocus);

                // first we check it is not a section line
                //
                sec = pGetSection(isSecLn, secLn, false, isGroupHeader, isGroupFooter);
                if (!isSecLn) {

                    // check it is not the last section line in this section
                    //
                    if (bDelSectionLine) {

                        sec = pGetSection(isSecLn, secLn, true, isGroupHeader, isGroupFooter);
                    }
                    if (!pCanDeleteSection(secs, sec, po.getTag())) { return; }
                }

                let what: string= "";

                if (isSecLn) {
                    what = "the section line";
                }
                else {
                    what = "the section";
                }

                if (!cWindow.ask("Are yuo sure you want to delete "
                            + what + " and all the controls it contains? ", MessageBoxDefaultButton.Button2)) {
                    return;
                }

                if (isSecLn) {

                    for(var _i = 0; _i < secLn.getControls().count(); _i++) {
                        ctrl = secLn.getControls().item(_i);
                        for(var i = 0; i < m_paint.getPaintObjects().count(); i++) {
                            paintObj = m_paint.getPaintObjects().item(i);
                            if (paintObj.getTag() === ctrl.getKey()) {
                                m_paint.getPaintObjects().remove(paintObj.getKey());
                                break;
                            }
                        }
                    }

                    secLn.getControls().clear();

                    // at least one section line has to be in the section
                    //
                    if (sec.getSectionLines().count() > 1) {
                        sec.getSectionLines().remove(secLn.getKey());
                    }

                }
                else {

                    for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                        secLn = sec.getSectionLines().item(_i);
                        for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                            ctrl = secLn.getControls().item(_j);
                            for(var i = 0; i < m_paint.getPaintObjects().count(); i++) {
                                paintObj = m_paint.getPaintObjects().item(i);
                                if (paintObj.getTag() === ctrl.getKey()) {
                                    m_paint.getPaintObjects().remove(paintObj.getKey());
                                    break;
                                }
                            }
                        }
                    }

                    // if this is a group section we need to delete the header and the footer
                    //

                    if (isGroupFooter || isGroupHeader) {
                        if (isGroupHeader) {
                            for(var _i = 0; _i < m_report.getGroups().count(); _i++) {
                                group = m_report.getGroups().item(_i);
                                if (group.getHeader().getKey() === sec.getKey()) { break; }
                            }
                            secG = group.getFooter();
                        }
                        else if (isGroupFooter) {
                            for(var _i = 0; _i < m_report.getGroups().count(); _i++) {
                                group = m_report.getGroups().item(_i);
                                if (group.getFooter().getKey() === sec.getKey()) { break; }
                            }
                            secG = group.getHeader();
                        }

                        for(var _i = 0; _i < secG.getSectionLines().count(); _i++) {
                            secLn = secG.getSectionLines().item(_i);
                            for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                                ctrl = secLn.getControls().item(_j);
                                for(var i = 0; i < m_paint.getPaintObjects().count(); i++) {
                                    paintObj = m_paint.getPaintObjects().item(i);
                                    if (paintObj.getTag() === ctrl.getKey()) {
                                        m_paint.getPaintObjects().remove(paintObj.getKey());
                                        break;
                                    }
                                }
                            }
                        }

                        for(var i = 0; i < m_paint.getPaintSections().count(); i++) {
                            paintObj = m_paint.getPaintSections().item(i);
                            if (paintObj.getTag() === secG.getKey()) {
                                m_paint.getPaintSections().remove(paintObj.getKey());
                                break;
                            }
                        }

                        m_report.getGroups().remove(group.getIndex());

                    }
                    else {
                        secs.remove(sec.getKey());
                    }

                }

                let bDeletePaintObj: boolean= false;

                bDeletePaintObj = true;
                if (isSecLn) {
                    bDeletePaintObj = sec.getKeyPaint() !== m_keyFocus;
                }

                if (bDeletePaintObj) {

                    m_paint.getPaintSections().remove(m_keyFocus);

                    // if I have deleted the last section line in this
                    // section I need to delete the paint object
                    // asociated with the current last section line
                    // and then to asociate this section line with
                    // the paint object of the section
                }
                else {
                    let secLns: cReportSectionLines= sec.getSectionLines();
                    m_paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint());
                    secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint());
                }

                pResetKeysFocus();
                G.redim(m_vSelectedKeys, 0);

                pValidateSectionAspect();
                updateSectionNameInPaintObjects();
            }
            else {
                paintObj = m_paint.getPaintObjects().item(m_keyFocus);
                if (paintObj === null) { return; }

                if (!cWindow.ask("Confirm you want to delete the control? ", MessageBoxDefaultButton.Button2)) { return; }

                for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                    paintObj = m_paint.getPaintObjects().item(m_vSelectedKeys[i]);
                    ctrl = m_report.getControls().item(paintObj.getTag());

                    m_paint.getPaintObjects().remove(paintObj.getKey());
                    if (ctrl === null) { return; }
                    ctrl.getSectionLine().getControls().remove(ctrl.getKey());
                }

                pResetKeysFocus();
                G.redim(m_vSelectedKeys, 0);
            }

            refreshAll();
        };

        const updateSectionNameInPaintObjects = function() {
            updateSectionNameInPaintObjects(m_report.getHeaders());
            updateSectionNameInPaintObjects(m_report.getFooters());
            updateSectionNameInPaintObjects(m_report.getDetails());
            updateSectionNameInPaintObjects(m_report.getGroupsHeaders());
            updateSectionNameInPaintObjects(m_report.getGroupsFooters());
        };

        const updateSectionNameInPaintObjects = function(sections) {
            for(var i =0; i < sections.count(); i++) {
                let sec: var= sections.item(i);
                let paintObj: var= m_paint.getPaintSections().item(sec.getKeyPaint());
                if (paintObj !== null) {
                    paintObj.setText(sec.getName());
                }
            }            
        };

        const pCanDeleteSection = function(
            secs, 
            sec, 
            tag) {
            let secAux: cReportSection= null;

            // header
            //
            secAux = m_report.getHeaders().item(tag);
            secs = null;

            if (secAux !== null) {
                if (secAux.Equals(sec) || sec === null) {
                    if (secAux.getTypeSection() === csRptSectionType.MAIN_HEADER) {
                        cWindow.msgInfo("The main header can't be deleted");
                        return false;
                    }
                    secs = m_report.getHeaders();
                }
            }
            // if we don't find the section yet
            //
            if (secs === null) {

                // footers
                //
                secAux = m_report.getFooters().item(tag);
                if (secAux !== null) {
                    if (secAux.Equals(sec) || sec === null) {
                        if (secAux.getTypeSection() === csRptSectionType.MAIN_FOOTER) {
                            cWindow.msgInfo("The main footer can't be deleted");
                            return false;
                        }
                        secs = m_report.getFooters();
                    }
                }
                // if we don't find the section yet
                //
                if (secs === null) {

                    // check for groups
                    //
                    secAux = m_report.getGroupsHeaders().item(tag);
                    if (secAux !== null) {
                        if (!((secAux.Equals(sec) || sec === null))) {

                            secAux = m_report.getGroupsFooters().item(tag);
                            if (secAux !== null) {
                                if (!((secAux.Equals(sec) || sec === null))) {

                                    // finally the detail section can't be deleted
                                    //
                                    cWindow.msgInfo("The detail section can't be deleted");
                                    return false;
                                }
                            }
                        }
                    }
                }
            }

            return true;
        };

        const pResetKeysFocus = function() {
            m_keyFocus = "";
            m_keyMoving = "";
            m_keySizing = "";
            m_picReport.Cursor = Cursors.Default;
        };

        self.addDBField = function() {
            let sField: string= "";
            let nIndex: number= 0;
            let nFieldType: number= 0;

            if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                return;

            beginDraging();
            m_controlName = "";
            m_controlType = csRptEditCtrlType.field;
            m_fieldName = sField;
            m_formulaText = "";
            m_fieldIndex = nIndex;
            m_fieldType = nFieldType;
        };

        self.addLabel = function() {
            pAddLabelAux(csRptEditCtrlType.label);
        };

        self.addLineLabel = function() {
            pAddLabelAux(csRptEditCtrlType.lineLabel);
        };

        self.addImage = function() {
            pAddLabelAux(csRptEditCtrlType.image);
        };

        self.addChart = function() {
            pAddLabelAux(csRptEditCtrlType.chart);
        };

        self.pAddLabelAux = function(ctrlType) {
            beginDraging();
            m_controlName = "";
            m_controlType = ctrlType;
            m_fieldName = "";
            m_formulaText = "";
            m_fieldIndex = 0;
            m_fieldType = 0;
        };

        const addControlEnd = function(left, top) {

            m_draging = false;

            if (m_controlType === csRptEditCtrlType.none) {
                return true;
            }

            m_dataHasChanged = true;

            let originalLeft: number= 0;
            let originalTop: number= 0;
            let copyCtrl: cReportControl= null;
            let movedCtrl: cReportControl= null;
            let firstCtrlLeft: number= 0;
            let offSet: number= 0;

            if (m_copyControls) {

                if (m_vCopyKeys.Length === 0) { return false; }

                originalLeft = left;
                originalTop = top;

                let keyPaint: string= m_vCopyKeys[m_vCopyKeys.Length - 1];
                let keyCtrl: string= m_paint.getPaintObjects().item(keyPaint).getTag();
                movedCtrl = m_report.getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for(var i = m_vCopyKeys.Length-1; i > -1; i--) {

                    keyPaint = m_vCopyKeys[i];
                    keyCtrl = m_paint.getPaintObjects().item(keyPaint).getTag();
                    copyCtrl = m_report.getControls().item(keyCtrl);

                    // starting with the first control we move the left
                    // of every control if reach the right margin
                    // move down a line and restart
                    //
                    offSet = pGetOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft());
                    left = originalLeft + offSet;

                    if (m_bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft();

                    }

                    if (left - 26 > m_picReport.Width) {
                        left = originalLeft + (offSet % originalLeft);
                        top += 6;
                    }

                    if (top > m_picReport.Height) {
                        top = m_picReport.Height - 6;
                    }

                    pAddControlEndAux(left, top, copyCtrl);

                }
                m_copyControls = false;

            }
            else if (m_copyControlsFromOtherReport) {

                if (m_fmain.getReportCopySource() === null) { return false; }

                originalLeft = left;
                originalTop = top;

                let editor: cEditor= m_fmain.getReportCopySource();
                let keyPaint: string= editor.getVCopyKeys(editor.getVCopyKeysCount());
                let keyCtrl: string= editor.getPaint().getPaintObjects().item(keyPaint).getTag();
                movedCtrl = editor.getReport().getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for(var i = editor.getVCopyKeysCount()-1; i > -1; i--) {

                    keyPaint = editor.getVCopyKeys(i);
                    keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag();
                    copyCtrl = editor.getReport().getControls().item(keyCtrl);

                    // starting with the first control we move the left
                    // of every control if reach the right margin
                    // move down a line and restart
                    //
                    offSet = pGetOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft());
                    left = originalLeft + offSet;

                    if (m_bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft();

                    }

                    if (left - 400 > m_picReport.Width) {
                        left = originalLeft + (offSet % originalLeft);
                        top = top + 100;
                    }

                    if (top > m_picReport.Height) {
                        top = m_picReport.Height - 100;
                    }

                    pAddControlEndAux(left, top, copyCtrl);
                }

                m_copyControlsFromOtherReport = false;

            }
            else {
                pAddControlEndAux(left, top, null);
            }

            refreshBody();

            return true;
        };

        const pGetOffsetLeftFromControls = function(leftCtrl1, leftCtrl2) {
            return leftCtrl2 - leftCtrl1;
        };

        const pGetOffsetTopFromControls = function(topCtrl1, topCtrl2) {
            return topCtrl2 - topCtrl1;
        };

        const pAddControlEndAux = function(left, top, baseControl) {
            let ctrl: cReportControl= null;

            // first we add a control in the main header
            // after the user complete the add operation
            // we would move the control to the desired
            // section line
            //
            ctrl = m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(0).getControls().add();

            // later we will set the properties related to the type of the control
            //
            m_nextNameCtrl = m_nextNameCtrl + 1;
            ctrl.setName(cGlobals.C_CONTROL_NAME + m_nextNameCtrl);

            if (baseControl === null) {
                pSetNewControlProperties(ctrl);
            }
            else {
                pCopyControl(baseControl, ctrl);
            }

            pSetNewControlPosition(ctrl, left, top);
        };

        const pCopyFont = function(fromFont, toFont) {
            toFont.setBold(fromFont.getBold());
            toFont.setForeColor(fromFont.getForeColor());
            toFont.setItalic(fromFont.getItalic());
            toFont.setName(fromFont.getName());
            toFont.setSize(fromFont.getSize());
            toFont.setStrike(fromFont.getStrike());
            toFont.setUnderline(fromFont.getUnderline());
        };

        /* TODO: it must be removed
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

        const pCopyChart = function(fromChart, toChart) {
            toChart.setChartTitle(fromChart.getChartTitle());
            toChart.setChartType(fromChart.getChartType());
            toChart.setDiameter(fromChart.getDiameter());
            toChart.setFormat(fromChart.getFormat());
            toChart.setGridLines(fromChart.getGridLines());
            toChart.setOutlineBars(fromChart.getOutlineBars());
            toChart.setShowValues(fromChart.getShowValues());
            toChart.setThickness(fromChart.getThickness());
            toChart.setTop(fromChart.getTop());
            toChart.setGroupFieldName(fromChart.getGroupFieldName());
            toChart.setGroupFieldIndex(fromChart.getGroupFieldIndex());
            toChart.setGroupValue(fromChart.getGroupValue());
            toChart.setSort(fromChart.getSort());

            let fromSerie: cReportChartSerie= null;

            for(var _i = 0; _i < fromChart.getSeries().count(); _i++) {
                fromSerie = fromChart.getSeries().item(_i);
                let serie: cReportChartSerie= toChart.getSeries().add();
                serie.setColor(fromSerie.getColor());
                serie.setLabelFieldName(fromSerie.getLabelFieldName());
                serie.setColor(fromSerie.getLabelIndex());
                serie.setValueFieldName(fromSerie.getValueFieldName());
                serie.setValueIndex(fromSerie.getValueIndex());
            }
        };

        const pCopyAspect = function(fromAspect, toAspect) {
            toAspect.setAlign(fromAspect.getAlign());
            toAspect.setBackColor(fromAspect.getBackColor());
            toAspect.setBorderColor(fromAspect.getBorderColor());
            toAspect.setBorderColor3d(fromAspect.getBorderColor3d());
            toAspect.setBorderColor3dShadow(fromAspect.getBorderColor3dShadow());
            toAspect.setBorderType(fromAspect.getBorderType());
            toAspect.setBorderWidth(fromAspect.getBorderWidth());
            toAspect.setCanGrow(fromAspect.getCanGrow());
            toAspect.setFormat(fromAspect.getFormat());
            toAspect.setHeight(fromAspect.getHeight());
            toAspect.setIsAccounting(fromAspect.getIsAccounting());
            toAspect.setLeft(fromAspect.getLeft());
            toAspect.setNZOrder(fromAspect.getNZOrder());
            toAspect.setSelectColor(fromAspect.getSelectColor());
            toAspect.setSymbol(fromAspect.getSymbol());
            toAspect.setTop(fromAspect.getTop());
            toAspect.setTransparent(fromAspect.getTransparent());
            toAspect.setWidth(fromAspect.getWidth());
            toAspect.setWordWrap(fromAspect.getWordWrap());

            pCopyFont(fromAspect.getFont(), toAspect.getFont());
        };

        // TODO: this function shouldn't be needed
        //
        const pCopyAspectToPaint = function(fromAspect, toAspect) {
            toAspect.setAlign(fromAspect.getAlign());
            toAspect.setBackColor(fromAspect.getBackColor());
            toAspect.setBorderColor(fromAspect.getBorderColor());
            toAspect.setBorderColor3d(fromAspect.getBorderColor3d());
            toAspect.setBorderColor3dShadow(fromAspect.getBorderColor3dShadow());
            toAspect.setBorderType(fromAspect.getBorderType());
            toAspect.setBorderWidth(fromAspect.getBorderWidth());
            toAspect.setCanGrow(fromAspect.getCanGrow());
            toAspect.setFormat(fromAspect.getFormat());
            toAspect.setHeight(fromAspect.getHeight());
            toAspect.setIsAccounting(fromAspect.getIsAccounting());
            toAspect.setLeft(fromAspect.getLeft());
            toAspect.setNZOrder(fromAspect.getNZOrder());
            toAspect.setSelectColor(fromAspect.getSelectColor());
            toAspect.setSymbol(fromAspect.getSymbol());
            toAspect.setTop(fromAspect.getTop());
            toAspect.setTransparent(fromAspect.getTransparent());
            toAspect.setWidth(fromAspect.getWidth());
            toAspect.setWordWrap(fromAspect.getWordWrap());

            pCopyFontPaint(fromAspect.getFont(), toAspect.getFont());
        };

        const pCopyFontPaint = function(fromFont, toFont) {
            toFont.setBold(fromFont.getBold());
            toFont.setForeColor(fromFont.getForeColor());
            toFont.setItalic(fromFont.getItalic());
            toFont.setName(fromFont.getName());
            toFont.setSize(fromFont.getSize());
            toFont.setStrike(fromFont.getStrike());
            toFont.setUnderline(fromFont.getUnderline());
        };

        const pCopyControl = function(fromCtrl, toCtrl) {
            toCtrl.setControlType(fromCtrl.getControlType());

            let field: cReportField= toCtrl.getField();
            field.setFieldType(fromCtrl.getField().getFieldType());
            field.setIndex(fromCtrl.getField().getIndex());
            field.setName(fromCtrl.getField().getName());

            toCtrl.getFormulaHide().setName(fromCtrl.getFormulaHide().getName());
            toCtrl.getFormulaHide().setText(fromCtrl.getFormulaHide().getText());
            toCtrl.getFormulaValue().setName(fromCtrl.getFormulaValue().getName());
            toCtrl.getFormulaValue().setText(fromCtrl.getFormulaValue().getText());

            toCtrl.setHasFormulaHide(fromCtrl.getHasFormulaHide());
            toCtrl.setHasFormulaValue(fromCtrl.getHasFormulaValue());

            pCopyAspect(fromCtrl.getImage().getAspect(), toCtrl.getImage().getAspect());

            let label: cReportLabel= toCtrl.getLabel();
            pCopyAspect(fromCtrl.getLabel().getAspect(), label.getAspect());
            label.setCanGrow(fromCtrl.getLabel().getCanGrow());
            label.setText(fromCtrl.getLabel().getText());

            pCopyAspect(fromCtrl.getLine().getAspect(), toCtrl.getLine().getAspect());
            pCopyChart(fromCtrl.getChart(), toCtrl.getChart());
        };

        const pSetNewControlProperties = function(ctrl) {
            self.int: constCTRL_HEIGHT = 19;
            self.int: constCTRL_WIDTH = 133;
            self.int: constLINE_HEIGHT = 1;

            let label: cReportLabel= null;
            let aspect: cReportAspect= null;

            let ctrlHeigth: number= CTRL_HEIGHT;
            let transparent: boolean= true;

            ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left);

            switch (m_controlType) {
                case csRptEditCtrlType.field:
                    ctrl.setControlType(csRptControlType.CSRPTCTFIELD);
                    ctrl.getLabel().setText(m_fieldName);
                    let field: cReportField= ctrl.getField();
                    field.setIndex(m_fieldIndex);
                    field.setName(m_fieldName);
                    field.setFieldType(m_fieldType);

                    if (cDatabaseGlobals.isNumberField(m_fieldType)) {
                        aspect = ctrl.getLabel().getAspect();
                        aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                        aspect.setFormat("#0.00;-#0.00");
                    }
                    break;

                case csRptEditCtrlType.formula:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getFormulaValue().setText(m_formulaText + "(" + m_controlName + ")");
                    ctrl.setHasFormulaValue(true);
                    label = ctrl.getLabel();
                    aspect = label.getAspect();
                    aspect.setFormat("0.00;-0.00");
                    aspect.getFont().setBold(true);
                    label.setText(ctrl.getFormulaValue().getText());
                    aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                    break;

                case csRptEditCtrlType.label:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    label = ctrl.getLabel();
                    label.setText(m_fieldName);
                    label.getAspect().getFont().setBold(true);
                    break;

                case csRptEditCtrlType.lineLabel:
                    ctrlHeigth = LINE_HEIGHT;
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    label = ctrl.getLabel();
                    label.setText(m_fieldName);
                    aspect = label.getAspect();
                    aspect.getFont().setBold(true);
                    aspect.setBackColor(Color.Gray.ToArgb());
                    transparent = false;
                    break;

                case csRptEditCtrlType.image:
                    ctrl.setControlType(csRptControlType.CSRPTCTIMAGE);
                    ctrl.getLabel().setText(m_fieldName);
                    break;

                case csRptEditCtrlType.chart:
                    ctrl.setControlType(csRptControlType.CSRPTCTCHART);
                    ctrl.getLabel().setText(m_fieldName);
                    break;
            }

            aspect = ctrl.getLabel().getAspect();
            aspect.setWidth(CTRL_WIDTH);
            aspect.setHeight(ctrlHeigth);
            aspect.setTransparent(transparent);
        };

        const pSetNewControlPosition = function(ctrl, left, top) {
            let aspect: cReportAspect= ctrl.getLabel().getAspect();
            aspect.setLeft(left);
            aspect.setTop(top);

            let paintObj: cReportPaintObject= null;
            let paintType: csRptPaintObjType= csRptPaintObjType.CSRPTPAINTOBJBOX;

            if (ctrl.getControlType() === csRptControlType.CSRPTCTIMAGE
                || ctrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
            }

            paintObj = m_paint.getNewObject(paintType);

            aspect = ctrl.getLabel().getAspect();

            pCopyAspectToPaint(aspect, paintObj.getAspect());

            aspect.setLeft(left);
            aspect.setTop(top);

            paintObj.setText(ctrl.getLabel().getText());

            paintObj.setRptType(csRptSectionType.CONTROL);

            paintObj.setTag(ctrl.getKey());
            ctrl.setKeyPaint(paintObj.getKey());

            // position the control in the desired section line
            //
            moveControl(paintObj.getKey());

            m_paint.drawObject(paintObj.getKey(), m_picReport.CreateGraphics());
        };

        self.addGroup = function() {
            pShowGroupProperties(null);
            refreshAll();
        };

        const pGetGroup = function(key) {
            let group: cReportGroup= null;

            for(var _i = 0; _i < m_report.getGroups().count(); _i++) {
                group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === key) { break; }
                if (group.getFooter().getKey() === key) { break; }
            }

            return group;
        };

        self.addSectionLine = function() {
            let sec: cReportSection= null;
            let aspect: cReportAspect= null;
            let isGroup: boolean= false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            switch (sec.getTypeSection()) {

                // in footers we add from top
                // it means that the first section line is the last one
                //
                case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:

                    aspect = sec.getSectionLines().add(null, "", 0).getAspect();
                    aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    aspect.setWidth(sec.getAspect().getWidth());

                    // for new sections the top is the top of the previous section
                    // plus cGlobals.C_HEIGHT_NEW_SECTION
                    //
                    aspect.setTop(sec.getSectionLines().item(0).getAspect().getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
                    break;

                default:

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
                    m_newSecLineOffSet = cGlobals.C_HEIGHT_NEW_SECTION;

                    aspect = sec.getSectionLines().add().getAspect();
                    aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    aspect.setWidth(sec.getAspect().getWidth());

                    break;
            }

            aspect = sec.getAspect();
            aspect.setHeight(aspect.getHeight() + cGlobals.C_HEIGHT_NEW_SECTION);

            pAddSectionLinesAux(sec);

            // we reset this variable to zero
            //
            m_newSecLineOffSet = 0;
        };

        const pAddSectionLinesAux = function(sec) {
            let typeSecLn: csRptSectionType= csRptSectionType.CONTROL;
            let aspect: cReportAspect= null;
            let maxBottom: number= 0;
            let minBottom: number= 0;
            let index: number= 0;
            let y: number= 0;

            switch (sec.getTypeSection()) {
                case csRptSectionType.HEADER:
                case csRptSectionType.MAIN_HEADER:

                    pMoveHeader(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_HEADER;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.DETAIL:
                case csRptSectionType.MAIN_DETAIL:

                    pMoveDetails(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_DETAIL;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.GROUP_HEADER:

                    pMoveGroupHeader(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_GROUPH;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.GROUP_FOOTER:

                    pMoveGroupFooter(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_GROUPF;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:

                    aspect = sec.getAspect();
                    aspect.setTop(aspect.getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
                    pMoveFooter(sec.getKey(), minBottom, maxBottom);
                    m_offY = 0;
                    y = aspect.getHeight() + aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION;
                    typeSecLn = csRptSectionType.SECLN_FOOTER;
                    index = 0;
                    break;
            }
            // we add a paint object to all sectionlines except the last one
            // the last sectionline uses the paint object of the section
            //
            let secL: cReportSectionLine= sec.getSectionLines().item(index);
            secL.setKeyPaint(
                paintSection(secL.getAspect(),
                                secL.getKey(),
                                sec.getTypeSection(),
                                C_SECTIONLINE + (sec.getSectionLines().count() - 2).ToString(),
                                true));

            // section line
            let po: cReportPaintObject= m_paint.getPaintSections().item(secL.getKeyPaint());
            po.setRptType(typeSecLn);
            po.setRptKeySec(sec.getKey());

            // section
            po = m_paint.getPaintSections().item(sec.getKeyPaint());
            po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString());

            moveSection(m_paint.getPaintSections().item(m_keyFocus), 0, y, minBottom, maxBottom, sec, false);

            refreshBody();
            refreshRule();
        };

        self.addSection = function(typeSection) {

            if (!m_editor.Visible) {
                return;

            let rptSection: cReportSection= null;
            let topSec: cReportSection= null;
            let w_aspect: cReportAspect= null;
            let aspect: cReportAspect= null;
            let paintObj: cReportPaintObject= null;

            let maxBottom: number= 0;
            let minBottom: number= 0;
            let y: number= 0;

            switch (typeSection) {
                case csRptSectionType.HEADER:
                    let w_headers: cReportSections= m_report.getHeaders();
                    rptSection = w_headers.add();
                    rptSection.setName("H_" + rptSection.getIndex().ToString());
                    aspect = w_headers.item(w_headers.count() - 2).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.HEADER,
                                                        rptSection.getName(),
                                                        false));

                    w_aspect = rptSection.getAspect();
                    moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),
                                0,
                                w_aspect.getTop(),
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                w_aspect.getTop() + rptSection.getAspect().getHeight(),
                                rptSection,
                                true);
                    break;

                case csRptSectionType.DETAIL:
                    break;

                case csRptSectionType.GROUP_HEADER:

                    let w_groupsHeaders: cIReportGroupSections= m_report.getGroupsHeaders();
                    rptSection = w_groupsHeaders.item(w_groupsHeaders.count() - 1);
                    rptSection.setName("G_" + rptSection.getIndex().ToString());

                    // the first group is next to the last header
                    //
                    if (w_groupsHeaders.count() === 1) {
                        topSec = m_report.getHeaders().item(m_report.getHeaders().count() - 1);
                    }
                    else {
                        topSec = w_groupsHeaders.item(w_groupsHeaders.count() - 2);
                    }

                    w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.GROUP_HEADER,
                                                        rptSection.getName(),
                                                        false));

                    w_aspect = rptSection.getAspect();
                    moveSection(m_paint.getPaintObject(rptSection.getKeyPaint()),
                                0,
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                w_aspect.getTop(),
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                rptSection,
                                true);
                    break;

                case csRptSectionType.GROUP_FOOTER:

                    let w_groupsFooters: cIReportGroupSections= m_report.getGroupsFooters();
                    rptSection = w_groupsFooters.item(0);
                    rptSection.setName("G_" + rptSection.getIndex().ToString());

                    // all group footers are added to the top so at the
                    // beginning they are next to the detail section
                    //

                    topSec = m_report.getDetails().item(m_report.getDetails().count() - 1);

                    w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.GROUP_FOOTER,
                                                        rptSection.getName(),
                                                        false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveGroupFooter(rptSection.getKey(), minBottom, maxBottom);

                    m_offY = 0;

                    w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break;

                case csRptSectionType.FOOTER:
                    let w_footers: cReportSections= m_report.getFooters();

                    // all footers are added to the beginning of the collection
                    //
                    rptSection = w_footers.add(null, "" , 0);
                    rptSection.setName("F_" + rptSection.getIndex().ToString());

                    aspect = w_footers.item(1).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(aspect.getTop());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.FOOTER,
                                                        rptSection.getName(),
                                                        false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveFooter(rptSection.getKey(), minBottom, maxBottom);

                    m_offY = 0;

                    w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break;
            }

            // every section we add has a section line
            // and we need to set his width
            //
            aspect = rptSection.getSectionLines().item(0).getAspect();
            aspect.setWidth(rptSection.getAspect().getWidth());

            refreshBody();
            refreshRule();
        };

        self.bringToFront = function() {
            m_paint.getPaintObjects().zorder(m_keyObj, true);
            refreshBody();
            m_dataHasChanged = true;
        };

        self.sendToBack = function() {
            m_paint.getPaintObjects().sendToBack(m_keyObj);
            refreshBody();
            m_dataHasChanged = true;
        };

        self.preview = function() {
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW);
            launchReport();
        };

        self.printReport = function() {
            m_report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER);
            launchReport();
        };

        const launchReport = function() {
            let mouse: cMouseWait= new cMouseWait();
            try {
                setZOrder();
                showProgressDlg();

                m_report.getLaunchInfo().getPrinter().setPaperInfo(m_report.getPaperInfo());
                m_report.getLaunchInfo().setObjPaint(new cReportPrint());
                // TODO: remove this
                m_report.getLaunchInfo().setHwnd(0);
                m_report.getLaunchInfo().setShowPrintersDialog(true);
                m_report.launch();

            } catch (Exception ex) {
                cError.mngError(ex, "launchReport", C_MODULE, "");
            }
UNKNOWN >>             finally {
                mouse.Dispose();
                closeProgressDlg();
            }
        };

        self.saveDocument = function(saveAs) {
            let mouse: cMouseWait= new cMouseWait();
            try {
                let isNew: boolean= m_isNew || m_report.getName() === "";

                if (isNew) {
                    m_report.setName(m_name);
                }

                if (saveAs) {
                    isNew = true;
                }

                setZOrder();

                pValidateSectionAspect();

                if (m_report.save(m_fmain.saveFileDialog, isNew)) {
                    m_isNew = false;
                    reLoadReport();
                    cMainEditor.setDocActive(this);
                    return true;
                }
                else {
                    return false;
                }

            } catch (Exception ex) {
                cError.mngError(ex, "saveDocument", C_MODULE, "");
                return false;
            }
UNKNOWN >>             finally {
                mouse.Dispose();
            }
        };

        const setZOrder = function() {
            let ctrl: cReportControl= null;
            for(var _i = 0; _i < m_report.getControls().count(); _i++) {
                ctrl = m_report.getControls().item(_i);
                ctrl.getLabel().getAspect().setNZOrder(m_paint.getPaintObjects().getZOrderForKey(ctrl.getKeyPaint()));
            }
        };

        self.newReport = function(report) {

            m_isNew = true;

            if (report !== null) {

                m_report = report;

                pValidateSectionAspect();
                reLoadReport();

            }
            else {

                m_report.setName("New report");

                m_paint.createPicture(m_picReport.CreateGraphics());
                refreshRule();

            }

            cMainEditor.setDocActive(this);
        };

        self.openDocument = function() {
            return openDocument("");
        };

        self.openDocument = function(fileName) {
            let mouse: cMouseWait= new cMouseWait();
            try {

                // to avoid reentrancy
                m_opening = true;

                if (fileName === "") {

                    pSetInitDir();

                    if (!m_report.load(m_fmain.openFileDialog)) {

                        if (m_report.getName() === "") {
                            return false;
                    }

                }
                else {

                    if (!m_report.loadSilent(fileName)) {
                        return false;
                    }
                }

                reLoadReport();

                Application.DoEvents();

                cMainEditor.setDocActive(this);

                m_opening = false;

                // Testing
                //

                //m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

                //var bmp = m_paint.getBitmap();
/*
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

                return true;
            }
            catch (ex) {
                return false;
            }
UNKNOWN >>             finally {
                mouse.Dispose();
            }
        };

        self.saveChanges = function() {
UNKNOWN >>             csAskEditResult rslt;

            if (m_dataHasChanged) {

                rslt = askEdit("Do you want to save changes to " + m_reportFullPath + "?", "CSReportEditor");

                switch (rslt) {
                    case csAskEditResult.CSASKRSLTYES:
                        if (!saveDocument(false)) {
                            return false;
                        break;

                    case csAskEditResult.CSASKRSLTCANCEL:
                        return false;
                }
            }

            m_dataHasChanged = false;
            return true;
        };

        const askEdit = function(msg, title) {

            let rslt: DialogResult= MessageBox.Show(;
                                        msg, title,
                                        MessageBoxButtons.YesNoCancel,
                                        MessageBoxIcon.Question,
                                        MessageBoxDefaultButton.Button3);
            switch (rslt) {
                case DialogResult.Yes:
                    return csAskEditResult.CSASKRSLTYES;
                case DialogResult.No:
                    return csAskEditResult.CSASKRSLTNO;
                default:
                    return csAskEditResult.CSASKRSLTCANCEL;
            }
        };

        self.showHelpDbField = function() {
            return pShowHelpDbField(m_fProperties);
        };

        self.showHelpDbFieldForGroup = function() {
            return pShowHelpDbField(m_fGroup);
        };

        const pShowHelpDbField = function(f) {
            let nIndex: number= 0;
            let nFieldType: number= 0;
            let sField: string= "";

            sField = f.txDbField.Text;
            nFieldType = f.getFieldType();
            nIndex = f.getIndex();

            if (cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                f.txDbField.Text = sField;
                f.setFieldType(nFieldType);
                f.setIndex(nIndex);

                if(f is fProperties) {
                    .txText.Text = sField;
                }
                return true;
            }
            else {
                return false;
            }
        };

        self.showGroupProperties = function() {
            let sec: cReportSection= null;
            let group: cReportGroup= null;
            let isGroup: boolean= false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            if (!isGroup) { return; }

            for(var _i = 0; _i < m_report.getGroups().count(); _i++) {
                group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === sec.getKey()) { break; }
                if (group.getFooter().getKey() === sec.getKey()) { break; }
            }

            pShowGroupProperties(group);

            refreshAll();
        };

        const pShowGroupProperties = function(group) {

            try {

                let isNew: boolean= false;

                m_showingProperties = true;

                if (m_fGroup === null) { m_fGroup = new fGroup(); }

                m_fGroup.setHandler(this);

                if (group === null) { isNew = true; }

                if (isNew) {
                    m_fGroup.txName.Text = "Group" + m_report.getGroups().count() + 1;
                }
                else {
                    m_fGroup.txName.Text = group.getName();
                    m_fGroup.txDbField.Text = group.getFieldName();

                    if (group.getOderType() === csRptGrpOrderType.CSRPTGRPASC) {
                      m_fGroup.opAsc.Checked = true;
                    }
                    else {
                      m_fGroup.opDesc.Checked = true;
                    }

                    m_fGroup.chkPrintInNewPage.Checked = group.getPrintInNewPage();
                    m_fGroup.chkReprintGroup.Checked = group.getRePrintInNewPage();
                    m_fGroup.chkGrandTotal.Checked = group.getGrandTotalGroup();

                    switch (group.getComparisonType()) {
                      case  csRptGrpComparisonType.CSRPTGRPDATE:
                        m_fGroup.opDate.Checked = true;
                        break;

                      case  csRptGrpComparisonType.CSRPTGRPNUMBER:
                        m_fGroup.opNumber.Checked = true;
                        break;

                      case  csRptGrpComparisonType.CSRPTGRPTEXT:
                        m_fGroup.opText.Checked = true;
                        break;
                    }
                }

                m_fGroup.lbGroup.Text = "Group: " + m_fGroup.txName.Text;

                m_fGroup.ShowDialog();

                if (m_fGroup.getOk()) {

                    if (isNew) {
                        group = m_report.getGroups().add(null, "");
                    }

                    group.setName(m_fGroup.txName.Text);
                    group.setFieldName(m_fGroup.txDbField.Text);

                    group.setIndex(m_report.getGroups().Count);
                    group.setOderType(m_fGroup.opAsc.Checked ? csRptGrpOrderType.CSRPTGRPASC : csRptGrpOrderType.CSRPTGRPDESC);

                    group.setPrintInNewPage(m_fGroup.chkPrintInNewPage.Checked);
                    group.setRePrintInNewPage(m_fGroup.chkReprintGroup.Checked);
                    group.setGrandTotalGroup(m_fGroup.chkGrandTotal.Checked);

                    if (m_fGroup.opDate.Checked) {
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPDATE);
                    }
                    else if (m_fGroup.opNumber.Checked) {
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPNUMBER);
                    }
                    else if (m_fGroup.opText.Checked) {
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPTEXT);
                    }

                    if (isNew) {
                        addSection(csRptSectionType.GROUP_HEADER);
                        addSection(csRptSectionType.GROUP_FOOTER);
                    }

                    m_dataHasChanged = true;
                }

            } catch (Exception ex) {
                cError.mngError(ex, "showGroupProperties", C_MODULE, "");
            }
UNKNOWN >>             finally {
                m_showingProperties = false;
                if (m_fGroup !== null) {
                    m_fGroup.Close();
                    m_fGroup = null;
                }
            }
        };

        self.moveGroup = function() {
            let sec: cReportSection= null;
            let group: cReportGroup= null;
            let isGroup: boolean= false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            if (!isGroup) { return; }

            for(var _i = 0; _i < m_report.getGroups().count(); _i++) {
                group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === sec.getKey()) { break; }
                if (group.getFooter().getKey() === sec.getKey()) { break; }
            }

            cGlobals.moveGroup(group, this);

            G.redim(m_vSelectedKeys, 0);
            refreshReport();
        };

        self.showSectionProperties = function() {
            let sec: cReportSection= null;
            let isGroup: boolean= false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            pShowSecProperties(sec);

            refreshAll();
        };

        self.showSecLnProperties = function() {
            let sec: cReportSection= null;
            let secLn: cReportSectionLine= null;
            let isSecLn: boolean= false;

            sec = pGetSection(isSecLn, secLn, true);

            if (sec === null) { return; }
            if (secLn === null) { return; }
            if (!isSecLn) { return; }

            pShowSecProperties(secLn, sec.getName() + " - line " + secLn.getIndex().ToString());

            refreshAll();
        };

        const pShowSecProperties = function(sec) {
            pShowSecProperties(sec, "");
        };

        const pShowSecProperties = function(sec, secLnName) {
            try {

                m_showingProperties = true;

                if (m_fSecProperties === null) {
                    m_fSecProperties =  globalObject.CSReportDll.createFSecProperties();
                }

                m_fSecProperties.setHandler(this);

                m_fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide();
                m_fSecProperties.setFormulaHide(sec.getFormulaHide().getText());

                if (sec is cReportSectionLine) {
                    m_fSecProperties.txName.Enabled = false;
                }

                m_fSecProperties.txName.Text = sec is cReportSectionLine ? secLnName : sec.getName();

                m_fSecProperties.lbSectionName.Text = "Section: " + (sec is cReportSectionLine ? secLnName : sec.getName());

                m_fSecProperties.ShowDialog();

                if (m_fSecProperties.getOk()) {
                    if (m_fSecProperties.getSetFormulaHideChanged()) { sec.setHasFormulaHide(m_fSecProperties.chkFormulaHide.Checked); }
                    if (m_fSecProperties.getFormulaHideChanged()) { sec.getFormulaHide().setText(m_fSecProperties.getFormulaHide()); }
                    if (sec is cReportSection) { sec.setName(m_fSecProperties.txName.Text); }
                }

            } catch (Exception ex) {
                cError.mngError(ex, "pShowSecProperties", C_MODULE, "");
            }
UNKNOWN >>             finally {
                m_fSecProperties.Close();
                m_showingProperties = false;
                m_fSecProperties = null;
            }
        };

        // ReturnSecLn is flag to state that the caller wants to get
        // the section line asociated with the separator of the section
        // remember that the last section line don't have a separator
        // but share it with the section.
        //
        const pGetSection = function(
            isGroup) {
UNKNOWN >>             bool isSecLn;
UNKNOWN >>             bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter;
UNKNOWN >>             cReportSectionLine secLn;
            return pGetSection(isGroup, isSecLn, secLn, false, isGroupHeader, isGroupFooter);
        };

        const pGetSection = function(
            isGroup, 
            isSecLn) {
UNKNOWN >>             bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter;
UNKNOWN >>             cReportSectionLine secLn;
            return pGetSection(isGroup, isSecLn, secLn, false, isGroupHeader, isGroupFooter);
        };

        const pGetSection = function(
            isSecLn, 
            secLn, 
            returnSecLn) {
UNKNOWN >>             bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter;

            return pGetSection(isSecLn, secLn, returnSecLn, isGroupHeader, isGroupFooter);
        };

        const pGetSection = function(
            isSecLn, 
            secLn, 
            returnSecLn, 
            isGroupHeader, 
            isGroupFooter) {
UNKNOWN >>             bool isGroup;
            return pGetSection(isGroup, isSecLn, secLn, returnSecLn, isGroupHeader, isGroupFooter);
        };

        const pGetSection = function(
            isGroup, 
            isSecLn, 
            secLn, 
            returnSecLn, 
            isGroupHeader, 
            isGroupFooter) {

            let sec: cReportSection= null;

            isGroup = false;
            isSecLn = false;
            secLn = null;
            isGroupFooter = false;
            isGroupHeader = false;

            if (m_keyFocus === "") { return null; }

            // get the section and show his properties
            //
            if (!m_paint.paintObjIsSection(m_keyFocus)) { return null; }

            let paintObj: cReportPaintObject= m_paint.getPaintSections().item(m_keyFocus);

            // nothing to do
            //
            if (paintObj === null) { return null; }

            sec = m_report.getHeaders().item(paintObj.getTag());
            if (sec !== null) {

                // it's a header
            }
            else {
                sec = m_report.getFooters().item(paintObj.getTag());
                if (sec !== null) {

                    // it's a footer
                }
                else {

                    // check if it is a group
                    //
                    sec = m_report.getGroupsHeaders().item(paintObj.getTag());
                    if (sec !== null) {

                        // it's a group
                        //
                        isGroup = true;
                        isGroupHeader = true;

                    }
                    else {
                        sec = m_report.getGroupsFooters().item(paintObj.getTag());
                        if (sec !== null) {

                            // it's a group
                            //
                            isGroup = true;
                            isGroupFooter = true;

                        }
                        else {
                            // check if it is a detail
                            //
                            sec = m_report.getDetails().item(paintObj.getTag());
                            if (sec !== null) {

                                // it's a detail
                            }
                            else {

                                // it's a line

                                isSecLn = true;

                                switch (paintObj.getRptType()) {
                                    case csRptSectionType.SECLN_HEADER:
                                        sec = m_report.getHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_DETAIL:
                                        sec = m_report.getDetails().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_FOOTER:
                                        sec = m_report.getFooters().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_GROUPH:
                                        sec = m_report.getGroupsHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_GROUPF:
                                        sec = m_report.getGroupsFooters().item(paintObj.getRptKeySec());
                                        break;
                                }
                                secLn = sec.getSectionLines().item(paintObj.getTag());
                            }
                        }
                    }
                }
            }

            // if the caller wants a section line and the separator
            // is owned by a section (isSecLn === false) we return
            // the last section line of the section asociated to the separator
            //
            if (returnSecLn && !isSecLn) {
                secLn = sec.getSectionLines().item(sec.getSectionLines().count()-1);
                isSecLn = true;
            }

            return sec;
        };

        self.showProperties = function(key) {
            if ("SL".IndexOf(cUtil.subString(key, 0, 1)) !== -1) {
                let bIsSecLn: boolean= false;
                pSelectSection(key.Substring(1), bIsSecLn);

                if (bIsSecLn) {
                    showSecLnProperties();
                }
                else {
                    showProperties();
                }
            }
            else {
                selectCtrl(key);
                showProperties();
            }
        };

        self.showProperties = function() {
            if (m_keyFocus === "") { return; }

            let mouse: cMouseWait= new cMouseWait();

            if (m_paint.paintObjIsSection(m_keyFocus)) {
                showSectionProperties();
            }
            else {
                m_keyObj = m_keyFocus;
                showCtrlProperties();
            }

            refreshAll();
        };

        const showCtrlProperties = function() {
            try {

                let paintObject: cReportPaintObject= null;
                let rptCtrl: cReportControl= null;
                let w_aspect: cReportAspect= null;
                let w_font: cReportFont= null;
                let bMultiSelect: boolean= false;

                m_showingProperties = true;

                if (m_fProperties === null) {
                    m_fProperties =  globalObject.CSReportDll.createFProperties();
                }

                m_fProperties.setHandler(this);

                paintObject = m_paint.getPaintObject(m_keyObj);
                if (paintObject === null) { return; }

                m_fProperties.txText.Text = paintObject.getText();
                rptCtrl = m_report.getControls().item(paintObject.getTag());

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTIMAGE) {
                    m_fProperties.hideTabImage();
                }
                else {
                    m_fProperties.picImage.Image = rptCtrl.getImage().getImage();
                }

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTCHART) {
                    m_fProperties.hideTabChart();
                }
                else {

                    cUtil.listSetListIndexForId(m_fProperties.cbType, (int)rptCtrl.getChart().getChartType());
                    cUtil.listSetListIndexForId(m_fProperties.cbFormatType, (int)rptCtrl.getChart().getFormat());
                    cUtil.listSetListIndexForId(m_fProperties.cbChartSize, (int)rptCtrl.getChart().getDiameter());
                    cUtil.listSetListIndexForId(m_fProperties.cbChartThickness, (int)rptCtrl.getChart().getThickness());
                    cUtil.listSetListIndexForId(m_fProperties.cbLinesType, (int)rptCtrl.getChart().getGridLines());

                    m_fProperties.txChartTop.Text = rptCtrl.getChart().getTop().ToString();
                    m_fProperties.txDbFieldGroupValue.Text = rptCtrl.getChart().getGroupFieldName();
                    m_fProperties.setChartGroupIndex(rptCtrl.getChart().getGroupFieldIndex());
                    m_fProperties.txChartGroupValue.Text = rptCtrl.getChart().getGroupValue();
                    m_fProperties.chkShowOutlines.Checked = rptCtrl.getChart().getOutlineBars();
                    m_fProperties.chkShowBarValues.Checked = rptCtrl.getChart().getShowValues();
                    m_fProperties.chkSort.Checked = rptCtrl.getChart().getSort();
                    m_fProperties.txText.Text = rptCtrl.getChart().getChartTitle();

                    if (rptCtrl.getChart().getSeries().count() > 0) {
                        m_fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(0).getLabelFieldName();
                        m_fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(0).getValueFieldName();

                        m_fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(0).getLabelIndex());
                        m_fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(0).getValueIndex());

                        cUtil.listSetListIndexForId(m_fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(0).getColor());

                        if (rptCtrl.getChart().getSeries().count() > 1) {
                            m_fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName();
                            m_fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName();

                            m_fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                            m_fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                            cUtil.listSetListIndexForId(m_fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(1).getColor());
                        }
                    }
                }

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {
                    m_fProperties.txText.Enabled = false;
                    let w_field: cReportField= rptCtrl.getField();
                    m_fProperties.txText.Text = w_field.getName();
                    m_fProperties.txDbField.Text = w_field.getName();
                    m_fProperties.setFieldType(w_field.getFieldType());
                    m_fProperties.setIndex(w_field.getIndex());
                }
                else {
                    m_fProperties.hideTabField();
                    m_fProperties.txText.Enabled = true;
                }

                m_fProperties.txName.Text = rptCtrl.getName();
                m_fProperties.lbControl.Text = rptCtrl.getName();
                m_fProperties.chkFormulaHide.Checked = rptCtrl.getHasFormulaHide();
                m_fProperties.chkFormulaValue.Checked = rptCtrl.getHasFormulaValue();

                m_fProperties.txExportColIdx.Text = rptCtrl.getExportColIdx().ToString();
                m_fProperties.chkIsFreeCtrl.Checked = rptCtrl.getIsFreeCtrl();

                m_fProperties.txTag.Text = rptCtrl.getTag();
                m_fProperties.setFormulaHide(rptCtrl.getFormulaHide().getText());
                m_fProperties.setFormulaValue(rptCtrl.getFormulaValue().getText());
                m_fProperties.txIdxGroup.Text = rptCtrl.getFormulaValue().getIdxGroup().ToString();
                m_fProperties.opBeforePrint.Checked = rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CSRPTEVALPRE;
                m_fProperties.opAfterPrint.Checked = rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CSRPTEVALPOST;

                w_aspect = rptCtrl.getLabel().getAspect();
                m_fProperties.chkCanGrow.Checked = w_aspect.getCanGrow();
                m_fProperties.txFormat.Text = w_aspect.getFormat();
                m_fProperties.txSymbol.Text = w_aspect.getSymbol();
                m_fProperties.setIsAccounting(w_aspect.getIsAccounting());
                m_fProperties.chkWordWrap.Checked = w_aspect.getWordWrap();

                cUtil.listSetListIndexForId(m_fProperties.cbAlign, (int)w_aspect.getAlign());

                m_fProperties.txBorderColor.Text = w_aspect.getBorderColor().ToString();
                m_fProperties.txBorder3D.Text = w_aspect.getBorderColor3d().ToString();
                m_fProperties.txBorderShadow.Text = w_aspect.getBorderColor3dShadow().ToString();
                m_fProperties.chkBorderRounded.Checked = w_aspect.getBorderRounded();
                m_fProperties.txBorderWidth.Text = w_aspect.getBorderWidth().ToString();

                cUtil.listSetListIndexForId(m_fProperties.cbBorderType, (int)w_aspect.getBorderType());

                w_font = w_aspect.getFont();
                m_fProperties.txFont.Text = w_font.getName();
                m_fProperties.txForeColor.Text = w_font.getForeColor().ToString();
                m_fProperties.shForeColor.BackColor = cColor.colorFromRGB(w_font.getForeColor());
                m_fProperties.txFontSize.Text = w_font.getSize().ToString();
                m_fProperties.chkFontBold.Checked = w_font.getBold();
                m_fProperties.chkFontItalic.Checked = w_font.getItalic();
                m_fProperties.chkFontUnderline.Checked = w_font.getUnderline();
                m_fProperties.chkFontStrike.Checked = w_font.getStrike();

                w_aspect = paintObject.getAspect();
                m_fProperties.txLeft.Text = w_aspect.getLeft().ToString();
                m_fProperties.txTop.Text = w_aspect.getTop().ToString();
                m_fProperties.txWidth.Text = w_aspect.getWidth().ToString();
                m_fProperties.txHeight.Text = w_aspect.getHeight().ToString();
                m_fProperties.txBackColor.Text = w_aspect.getBackColor().ToString();
                m_fProperties.shBackColor.BackColor = cColor.colorFromRGB(w_aspect.getBackColor());
                m_fProperties.chkTransparent.Checked = w_aspect.getTransparent();

                bMultiSelect = m_vSelectedKeys.Length > 1;

                m_fProperties.resetChangedFlags();

                m_fProperties.ShowDialog();

                if (!m_fProperties.getOk()) { return; }

                for(var i = 0; i < m_vSelectedKeys.Length; i++) {

                    paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    rptCtrl = m_report.getControls().item(paintObject.getTag());

                    if (!bMultiSelect) {
                        if (rptCtrl.getName() !== m_fProperties.txName.Text) {
                            if (rptCtrl.getName() !== "") {
                                if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", MessageBoxDefaultButton.Button2)) {
                                    pUpdateFormulas(rptCtrl.getName(), m_fProperties.txName.Text);
                                }
                            }
                        }
                        rptCtrl.setName(m_fProperties.txName.Text);
                    }

                    if (m_fProperties.getTextChanged()) { rptCtrl.getLabel().setText(m_fProperties.txText.Text); }
                    if (m_fProperties.getTagChanged()) { rptCtrl.setTag(m_fProperties.txTag.Text); }
                    if (m_fProperties.getSetFormulaHideChanged()) { rptCtrl.setHasFormulaHide(m_fProperties.chkFormulaHide.Checked); }
                    if (m_fProperties.getSetFormulaValueChanged()) { rptCtrl.setHasFormulaValue(m_fProperties.chkFormulaValue.Checked); }
                    if (m_fProperties.getFormulaHideChanged()) { rptCtrl.getFormulaHide().setText(m_fProperties.getFormulaHide()); }
                    if (m_fProperties.getFormulaValueChanged()) { rptCtrl.getFormulaValue().setText(m_fProperties.getFormulaValue()); }
                    if (m_fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(cUtil.valAsInt(m_fProperties.txIdxGroup.Text)); }
                    if (m_fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(m_fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); }

                    if (m_fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(cUtil.valAsInt(m_fProperties.txExportColIdx.Text)); }
                    if (m_fProperties.getIsFreeCtrlChanged()) { rptCtrl.setIsFreeCtrl(m_fProperties.chkIsFreeCtrl.Checked); }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {

                        let w_field: cReportField= rptCtrl.getField();
                        if (m_fProperties.getDbFieldChanged()) {
                            w_field.setFieldType(m_fProperties.getFieldType());
                            w_field.setIndex(m_fProperties.getIndex());
                            w_field.setName(m_fProperties.txDbField.Text);
                        }
                    }

                    if (m_fProperties.getPictureChanged()) {
                        rptCtrl.getImage().setImage(new Bitmap(m_fProperties.picImage.Image));
                    }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) {

                        if (rptCtrl.getChart().getSeries().count() < 1) {
                            rptCtrl.getChart().getSeries().add();
                        }

                        if (m_fProperties.getChartTypeChanged()) {
                            rptCtrl.getChart().setChartType(cUtil.listID(m_fProperties.cbType));
                        }
                        if (m_fProperties.getChartFormatTypeChanged()) {
                            rptCtrl.getChart().setFormat(cUtil.listID(m_fProperties.cbFormatType));
                        }
                        if (m_fProperties.getChartSizeChanged()) {
                            rptCtrl.getChart().setDiameter(cUtil.listID(m_fProperties.cbChartSize));
                        }
                        if (m_fProperties.getChartThicknessChanged()) {
                            rptCtrl.getChart().setThickness(cUtil.listID(m_fProperties.cbChartThickness));
                        }
                        if (m_fProperties.getChartLinesTypeChanged()) {
                            rptCtrl.getChart().setGridLines(cUtil.listID(m_fProperties.cbLinesType));
                        }

                        if (m_fProperties.getChartShowLinesChanged()) {
                            rptCtrl.getChart().setOutlineBars(m_fProperties.chkShowOutlines.Checked);
                        }
                        if (m_fProperties.getChartShowValuesChanged()) {
                            rptCtrl.getChart().setShowValues(m_fProperties.chkShowBarValues.Checked);
                        }

                        if (m_fProperties.getTextChanged()) {
                            rptCtrl.getChart().setChartTitle(m_fProperties.txText.Text);
                        }

                        if (m_fProperties.getChartTopChanged()) {
                            rptCtrl.getChart().setTop(cUtil.valAsInt(m_fProperties.txChartTop.Text));
                        }

                        if (m_fProperties.getChartSortChanged()) {
                            rptCtrl.getChart().setSort(m_fProperties.chkSort.Checked);
                        }

                        if (m_fProperties.getChartGroupValueChanged()) {
                            rptCtrl.getChart().setGroupValue(m_fProperties.txChartGroupValue.Text);
                        }

                        if (m_fProperties.getChartFieldGroupChanged()) {
                            rptCtrl.getChart().setGroupFieldName(m_fProperties.txDbFieldGroupValue.Text);
                            rptCtrl.getChart().setGroupFieldIndex(m_fProperties.getChartGroupIndex());
                        }

                        if (m_fProperties.getChartFieldLbl1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setLabelFieldName(m_fProperties.txDbFieldLbl1.Text);
                            rptCtrl.getChart().getSeries().item(0).setLabelIndex(m_fProperties.getChartIndex(0));
                        }
                        if (m_fProperties.getChartFieldVal1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setValueFieldName(m_fProperties.txDbFieldVal1.Text);
                            rptCtrl.getChart().getSeries().item(0).setValueIndex(m_fProperties.getChartIndex(1));
                        }

                        if (m_fProperties.getChartColorSerie1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setColor(cUtil.listID(m_fProperties.cbColorSerie1));
                        }

                        if (m_fProperties.getChartFieldLbl2Changed() || m_fProperties.getChartFieldVal2Changed()) {
                            if (rptCtrl.getChart().getSeries().count() < 2) {
                                rptCtrl.getChart().getSeries().add();
                            }
                        }

                        if (m_fProperties.txDbFieldLbl2.Text === "" || m_fProperties.txDbFieldVal2.Text === "") {
                            if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(1); }
                        }

                        if (rptCtrl.getChart().getSeries().count() > 1) {

                            if (m_fProperties.getChartFieldLbl2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setLabelFieldName(m_fProperties.txDbFieldLbl2.Text);
                                rptCtrl.getChart().getSeries().item(1).setLabelIndex(m_fProperties.getChartIndex(2));
                            }
                            if (m_fProperties.getChartFieldVal2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setValueFieldName(m_fProperties.txDbFieldVal2.Text);
                                rptCtrl.getChart().getSeries().item(1).setValueIndex(m_fProperties.getChartIndex(3));
                            }

                            if (m_fProperties.getChartColorSerie2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setColor(cUtil.listID(m_fProperties.cbColorSerie2));
                            }
                        }
                    }

                    if (m_fProperties.getTextChanged()) { paintObject.setText(m_fProperties.txText.Text); }

                    w_aspect = rptCtrl.getLabel().getAspect();
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cUtil.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cUtil.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cUtil.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cUtil.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(m_fProperties.txBackColor.Text)); }
                    if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); }
                    if (m_fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(m_fProperties.cbAlign)); }
                    if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); }
                    if (m_fProperties.getSymbolChanged()) {
                        w_aspect.setSymbol(m_fProperties.txSymbol.Text);
                        w_aspect.setIsAccounting(m_fProperties.getIsAccounting());
                    }
                    if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); }
                    if (m_fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(m_fProperties.chkCanGrow.Checked); }

                    if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(m_fProperties.txBorderColor.Text)); }
                    if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(m_fProperties.txBorder3D.Text)); }
                    if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(m_fProperties.txBorderShadow.Text)); }
                    if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                    if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(m_fProperties.txBorderWidth.Text)); }
                    if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(m_fProperties.cbBorderType)); }

                    w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cUtil.val(m_fProperties.txFontSize.Text)); }
                    if (m_fProperties.getBoldChanged()) { w_font.setBold(m_fProperties.chkFontBold.Checked); }
                    if (m_fProperties.getItalicChanged()) { w_font.setItalic(m_fProperties.chkFontItalic.Checked); }
                    if (m_fProperties.getUnderlineChanged()) { w_font.setUnderline(m_fProperties.chkFontUnderline.Checked); }
                    if (m_fProperties.getStrikeChanged()) { w_font.setStrike(m_fProperties.chkFontStrike.Checked); }

                    if (m_fProperties.getPictureChanged()) {
                        paintObject.setImage(rptCtrl.getImage().getImage());
                    }

                    //
                    // TODO: check if we can refactor this now we have a better class hierarchy
                    //

                    w_aspect = paintObject.getAspect();
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cUtil.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cUtil.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cUtil.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cUtil.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(m_fProperties.txBackColor.Text)); }
                    if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); }
                    if (m_fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(m_fProperties.cbAlign)); }
                    if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); }
                    if (m_fProperties.getSymbolChanged()) { w_aspect.setSymbol(m_fProperties.txSymbol.Text); }
                    if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); }

                    if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(m_fProperties.cbBorderType)); }

                    if (w_aspect.getBorderType() === csReportBorderType.CSRPTBSNONE) {
                        w_aspect.setBorderColor(Color.Black.ToArgb());
                        w_aspect.setBorderWidth(1);
                        w_aspect.setBorderRounded(false);
                        w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
                    }
                    else {
                        if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(m_fProperties.txBorderColor.Text)); }
                        if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(m_fProperties.txBorder3D.Text)); }
                        if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(m_fProperties.txBorderShadow.Text)); }
                        if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                        if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(m_fProperties.txBorderWidth.Text)); }
                    }

                    w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cUtil.val(m_fProperties.txFontSize.Text)); }
                    if (m_fProperties.getBoldChanged()) { w_font.setBold(m_fProperties.chkFontBold.Checked); }
                    if (m_fProperties.getItalicChanged()) { w_font.setItalic(m_fProperties.chkFontItalic.Checked); }
                    if (m_fProperties.getUnderlineChanged()) { w_font.setUnderline(m_fProperties.chkFontUnderline.Checked); }
                    if (m_fProperties.getStrikeChanged()) { w_font.setStrike(m_fProperties.chkFontStrike.Checked); }
                }

                m_dataHasChanged = true;

            } catch (Exception ex) {
                cError.mngError(ex, "pShowCtrlProperties", C_MODULE, "");
            }
UNKNOWN >>             finally {
                m_fProperties.Hide();
                m_showingProperties = false;
                m_fProperties = null;
                m_paint.endMove(m_picReport.CreateGraphics());
            }
        };

        const beginDraging = function() {
            m_picReport.Focus();
            m_draging = true;
            m_picReport.Cursor =  globalObject.CSReportDll.createCursor("Resources" + Path.DirectorySeparatorChar + "move32x32.cur");
        };

        const endDraging = function() {
            m_draging = false;
            m_controlType = csRptEditCtrlType.none;
            m_picReport.Cursor = Cursors.Default;
        };

        self.showToolbox = function() {

            let f: fToolbox= cMainEditor.getToolbox(this);

            f.clear();

            pAddColumnsToToolbox(m_report.getConnect().getDataSource(), m_report.getConnect().getColumns(), f);

            for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
                let connect: cReportConnect= m_report.getConnectsAux().item(_i);
                pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns(), f);
            }

            for(var _i = 0; _i < m_report.getControls().count(); _i++) {
                let ctrl: cReportControl= m_report.getControls().item(_i);
                if (cDatabaseGlobals.isNumberField(ctrl.getField().getFieldType())) {
                    f.addLbFormula(ctrl.getField().getName());

                    // TODO: refactor this to a better way to suggest the
                    //       list of formulas applicable to the type of
                    //       the database field
                    //
                    f.addFormula("Sum", ctrl.getName(), "_Sum");
                    f.addFormula("Maximum", ctrl.getName(), "_Max");
                    f.addFormula("Minimum", ctrl.getName(), "_Min");
                    f.addFormula("Averagge", ctrl.getName(), "_Average");
                }
            }
            if (!f.Visible) {
                f.Show(m_fmain);
            }
        };

        self.pAddColumnsToToolbox = function(dataSource, columns, f) {
            for(var _i = 0; _i < columns.count(); _i++) {
                let col: cColumnInfo= columns.item(_i);
                f.addField(
                    cGlobals.getDataSourceStr(dataSource) + col.getName(),
                    col.getColumnType(),
                    col.getPosition());
                f.addLabels(col.getName());
            }
        };

        self.copy = function() {
            try {
                if (m_vSelectedKeys.Length === 0) { return; }

                G.redim(m_vCopyKeys, m_vSelectedKeys.Length);

                for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                    m_vCopyKeys[i] = m_vSelectedKeys[i];
                }

                m_fmain.setReportCopySource(this);

            } catch (Exception ex) {
                cError.mngError(ex, "Copy", C_MODULE, "");
            }
        };

        self.paste = function(bDontMove) {
            try {

                m_bCopyWithoutMoving = bDontMove;

                if (m_vCopyKeys.Length === 0) {

                    if (m_fmain.getReportCopySource() === null) { return; }

                    m_copyControlsFromOtherReport = true;

                }
                else {

                    m_copyControls = true;

                }

                addLabel();

            } catch (Exception ex) {
                cError.mngError(ex, "Paste", C_MODULE, "");
            }
        };

        self.editText = function() {
            try {

                self.int: constc_margen = 1;

                let sText: string= "";
                let paintObjAspect: cReportAspect= null;
                let ctrl: cReportControl= null;

                if (m_keyObj === "") { return; }

                let w_getPaintObject: cReportPaintObject= m_paint.getPaintObject(m_keyObj);
                paintObjAspect = w_getPaintObject.getAspect();
                sText = w_getPaintObject.getText();
                ctrl = m_report.getControls().item(w_getPaintObject.getTag());
                if (paintObjAspect === null) { return; }

                /* TODO: implement me
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
            } catch (Exception ex) {
                cError.mngError(ex, "EditText", C_MODULE, "");
            }
        };

        const endEditText = function(descartar) {
            /* TODO: implement me
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
        };

        const paintSection = function(aspect, ) {
                                    String sKey,
                                    csRptSectionType rptType,
                                    String text,
                                    bool isSecLn)
        {

            let paintObj: cReportPaintObject= null;
            paintObj = m_paint.getNewSection(csRptPaintObjType.CSRPTPAINTOBJBOX);

            let w_aspect: cReportAspect= paintObj.getAspect();

            // we only draw the bottom line of the sections
            //
            w_aspect.setLeft(0);
            w_aspect.setTop(aspect.getTop() + aspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
            w_aspect.setWidth(aspect.getWidth());
            w_aspect.setHeight(cGlobals.C_HEIGHT_BAR_SECTION);
            w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
            w_aspect.setBorderWidth(1);

            if (isSecLn) {
                w_aspect.setBackColor(0xffcc99);
                w_aspect.setBorderColor(Color.Red.ToArgb());
            }
            else {
                self.int: constinnerColor = 0x99ccff;

                if (rptType === csRptSectionType.GROUP_FOOTER
                    || rptType === csRptSectionType.GROUP_HEADER) {
                    w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0xC0C000);
                }
                else {
                    w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0x0066cc);
                }
            }

            if (rptType === csRptSectionType.MAIN_FOOTER
                || rptType === csRptSectionType.FOOTER) {
                w_aspect.setOffset(m_offSet);
            }

            paintObj.setIsSection(!isSecLn);

            paintObj.setRptType(rptType);
            paintObj.setTag(sKey);

            paintObj.setText(text);

            return paintObj.getKey();
        };

        const getLineRegionForControl = function(sKeyPaintObj, ) {
                                                cReportSectionLine rptSecLine,
                                                bool isFreeCtrl)
        {
            let rptSection: cReportSection= null;

            rptSecLine = null;

            if (!getRegionForControl(sKeyPaintObj, rptSection, isFreeCtrl)) { return false; }

            let w1: number= 0;
            let w2: number= 0;

            let y: number= 0;

            let rtnSecLine: cReportSectionLine= null;

            let w_aspect: cReportAspect= m_paint.getPaintObject(sKeyPaintObj).getAspect();
            if (isFreeCtrl) {
                y = w_aspect.getTop() + w_aspect.getOffset();
            }
            else {
                y = w_aspect.getTop() + w_aspect.getHeight() / 2 + w_aspect.getOffset();
            }

            for(var _i = 0; _i < rptSection.getSectionLines().count(); _i++) {
                let rptSL: cReportSectionLine= rptSection.getSectionLines().item(_i);
                w_aspect = rptSL.getAspect();
                w1 = w_aspect.getTop();
                w2 = w_aspect.getTop() + w_aspect.getHeight();
                if (isFreeCtrl) {
                    //
                    // if the control is a free control
                    // this function will return the last sectionLine which
                    // has a bottom bigger than the top of the control
                    //
                    if (w1 <= y) {
                        rtnSecLine = rptSL;
                    }
                }
                else {
                    //
                    // if the control is not a free control
                    // this function will return the section line
                    // which contains the control
                    //
                    if (w1 <= y && w2 >= y) {
                        rtnSecLine = rptSL;
                        break;
                    }
                }
            }

            //
            // if the control is not a free contrl and there wasn't a
            // section line which contained the top of the control
            // (I think that can't be posible but anyways)
            // this function will return false and rptSecLine will be null
            //

            if (rtnSecLine !== null) {
                rptSecLine = rtnSecLine;
                return true;
            }
            else {
                return false;
            }
        };

        const getRegionForControl = function(sKeyPaintObj, rptSection, isFreeCtrl) {
            let x: number= 0;
            let y: number= 0;

            let w_aspect: cReportAspect= m_paint.getPaintObject(sKeyPaintObj).getAspect();

            // Headers
            //
            x = w_aspect.getLeft();
            if (isFreeCtrl) {
                y = w_aspect.getTop();
            }
            else {
                y = w_aspect.getTop() + w_aspect.getHeight() / 2;
            }

            if (getRegionForControlAux(m_report.getHeaders(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            // Groups Headers
            //
            if (getRegionForControlAux(m_report.getGroupsHeaders(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            // Details
            //
            if (getRegionForControlAux(m_report.getDetails(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            // Groups Footers
            //
            if (getRegionForControlAux(m_report.getGroupsFooters(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            y = y + m_offSet;

            // Footers
            //
            if (getRegionForControlAux(m_report.getFooters(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(m_offSet);
                return true;
            }

            return false;
        };

        const getRegionForControlAux = function(rptSections, ) {
                                            float x,
                                            float y,
                                            cReportSection rptSection,
                                            bool isFreeCtrl)
        {
            let y1: number= 0;
            let y2: number= 0;
            let rtnSec: cReportSection= null;

            rptSection = null;

            for(var _i = 0; _i < rptSections.count(); _i++) {

                let rptSec: cReportSection= rptSections.item(_i);
                let w_aspect: cReportAspect= rptSec.getAspect();

                y1 = w_aspect.getTop();
                y2 = w_aspect.getTop() + w_aspect.getHeight();

                if (isFreeCtrl) {
                    if (y1 <= y) {
                        rtnSec = rptSec;
                    }
                }
                else {
                    if (y1 <= y && y2 >= y) {
                        rtnSec = rptSec;
                        break;
                    }
                }
            }

            if (rtnSec !== null) {
                rptSection = rtnSec;
                return true;
            }
            else {
                return false;
            }
        };

        const pChangeTopSection = function(rptSec, ) {
                                        float offSetTopSection,
                                        bool bChangeTop,
                                        bool bZeroOffset)
        {
            let newTopCtrl: number= 0;
            let offSet: number= 0;
            let bottom: number= 0;
            let secTop: number= 0;
            let secLnHeigt: number= 0;
            let offSecLn: number= 0;
UNKNOWN >>             cReportPaintObject paintSec;

            let secAspect: cReportAspect= rptSec.getAspect();
            secAspect.setTop(secAspect.getTop() + offSetTopSection);
            offSet = rptSec.getSectionLines().item(0).getAspect().getTop() - secAspect.getTop();
            secTop = secAspect.getTop();

            for(var _i = 0; _i < rptSec.getSectionLines().count(); _i++) {

                let rptSecLine: cReportSectionLine= rptSec.getSectionLines().item(_i);

                let secLineAspect: cReportAspect= rptSecLine.getAspect();

                // footers grow to top
                //
                if (rptSec.getTypeSection() === csRptSectionType.MAIN_FOOTER
                    || rptSec.getTypeSection() === csRptSectionType.FOOTER) {

                    if (bChangeTop) {

                        if (bZeroOffset) {
                            offSet = 0;
                        }

                    }
                    else {

                        if (rptSecLine.getRealIndex() >= m_indexSecLnMoved && m_indexSecLnMoved > 0) {

                            bChangeTop = true;
                        }

                    }

                    // every other section grow to bottom
                    //
                }
                else {
                    offSecLn =  - secLineAspect.getTop();

                    if (offSetTopSection !== 0) {
                        offSecLn = 0;
                    }
                }

                secLineAspect.setTop(secTop + secLnHeigt);
                secLnHeigt = secLnHeigt + secLineAspect.getHeight();

                if (rptSecLine.getKeyPaint() !== "") {
                    paintSec = m_paint.getPaintSections().item(rptSecLine.getKeyPaint());
                    paintSec.getAspect().setTop(secLineAspect.getTop() + secLineAspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
                }
                else {
                    paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint());
                }
                if (paintSec !== null) {
                    paintSec.setHeightSecLine(secLineAspect.getHeight());
                }

                for(var _j = 0; _j < rptSecLine.getControls().count(); _j++) {
                    let rptCtrl: cReportControl= rptSecLine.getControls().item(_j);

                    let ctrLabelAspect: cReportAspect= rptCtrl.getLabel().getAspect();

                    if (rptCtrl.getIsFreeCtrl()) {
                        newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn;
                    }
                    else {
                        newTopCtrl = (ctrLabelAspect.getTop() + ctrLabelAspect.getHeight() - offSet) + offSecLn;
                    }

                    bottom = secLineAspect.getTop() + secLineAspect.getHeight();

                    if (newTopCtrl > bottom) {
                        newTopCtrl = bottom - ctrLabelAspect.getHeight();
                    }
                    else {
                        newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn;
                    }

                    if (newTopCtrl < secLineAspect.getTop()) { newTopCtrl = secLineAspect.getTop(); }

                    ctrLabelAspect.setTop(newTopCtrl);
                    if (m_paint.getPaintObject(rptCtrl.getKeyPaint()) !== null) {
                        m_paint.getPaintObject(rptCtrl.getKeyPaint()).getAspect().setTop(ctrLabelAspect.getTop());
                    }
                }
            }

            // when a group is added the first to get here is the header
            // and the footer hasn't contain a section yet
            //
            if (rptSec.getKeyPaint() === "") { return; }

            let w_aspect: cReportAspect= rptSec.getAspect();

            // we only draw the bottom line of the sections
            //
            paintSec = m_paint.getPaintSections().item(rptSec.getKeyPaint());

            if (paintSec !== null) {
                paintSec.getAspect().setTop(w_aspect.getTop()
                                            + w_aspect.getHeight()
                                            - cGlobals.C_HEIGHT_BAR_SECTION);
                paintSec.setHeightSec(w_aspect.getHeight());
            }
        };

        const moveSection = function(paintObj, ) {
                                    float x,
                                    float y,
                                    float minBottom,
                                    float maxBottom,
                                    cReportSection secToMove,
                                    bool isNew)
        {
            if (m_bNoMove) { return; }

            let oldHeight: number= 0;

            m_dataHasChanged = true;

            let w_aspect: cReportAspect= paintObj.getAspect();

            // if Y is contained by the allowed range everything is ok
            //
            if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - m_offY);

                // because the top has been set to real dimensions
                // of the screen we must move to the offset
                // of its section
                //
                w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset());
            }
            else {
                // if we have moved to top
                //
                if (y < minBottom) {
                    w_aspect.setTop(minBottom);

                    // because the top has been set to real dimensions
                    // of the screen we must move to the offset
                    // of his section
                    //
                    w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset());
                }
                else {
                    w_aspect.setTop(maxBottom);
                }
            }

            // TODO: remove after more testing - aligning the sections has an undesired result: the last section line is shrinked after five resize actions
            //
            // m_paint.alingToGrid(paintObj.getKey());

            if (isNew) {
                oldHeight = 0;
            }
            else {
                oldHeight = secToMove.getAspect().getHeight();
            }

            // for the detail section and every other section which is over the detail
            // we only change the height, for all sections bellow the detail we need to
            // change the height and top becasuse wen we strech a section it needs to move
            // to the bottom of the report
            //
            secToMove.getAspect().setHeight(w_aspect.getTop()
                                            + cGlobals.C_HEIGHT_BAR_SECTION
                                            - secToMove.getAspect().getTop());

            // every section bellow this section needs to update its top
            //
            let offsetTop: number= 0;

            w_aspect = secToMove.getAspect();

            offsetTop = oldHeight - (w_aspect.getHeight() + m_newSecLineOffSet);

            switch (secToMove.getTypeSection()) {

                    // if the section is a footer we move to bottom
                    // (OJO: footer sections, no group footers)
                    //
                case  csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:

                    w_aspect.setTop(w_aspect.getTop() + offsetTop);

                    // OJO: this has to be after we have changed the top of the section
                    //      to allow the paint object to reflect the change
                    //
                    // we move the controls of this section
                    //
                    pChangeHeightSection(secToMove, oldHeight);

                    // move the section
                    //
                    pChangeBottomSections(secToMove, offsetTop);

                    // for headers, group headers, group footers and the detail section we move to top
                    //
                    break;
                default:

                    // move all controls in this section
                    //
                    pChangeHeightSection(secToMove, oldHeight);

                    offsetTop = offsetTop * -1;

                    pChangeTopSections(secToMove, offsetTop);
                    break;
            }

            // finaly we need to update the offset of every section,
            // apply it to every object paint in m_Paint
            //
            let pageHeight: number= 0;
            let w_paperInfo: cReportPaperInfo= m_report.getPaperInfo();
            pGetOffSet(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                        m_report.getPaperInfo(),
                                                        w_paperInfo.getPaperSize(),
                                                        w_paperInfo.getOrientation()).Height,
                                                        pageHeight);
            pRefreshOffSetInPaintObjs();
            m_paint.setGridHeight(pageHeight);
        };

        const pChangeBottomSections = function(secToMove, offsetTop) {

            let sec: cReportSection= null;
            let bChangeTop: boolean= false;

            if (secToMove.getTypeSection() === csRptSectionType.FOOTER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_FOOTER
                || bChangeTop) {

                for(var i = m_report.getFooters().count()-1; i > -1; i--) {
                    sec = m_report.getFooters().item(i);

                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }
        };

        const pChangeTopSections = function(secToMove, offsetTop) {

            let sec: cReportSection= null;
            let bChangeTop: boolean= false;

            if (secToMove.getTypeSection() === csRptSectionType.HEADER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_HEADER) {

                for(var _i = 0; _i < m_report.getHeaders().count(); _i++) {
                    sec = m_report.getHeaders().item(_i);
                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if (secToMove.getTypeSection() === csRptSectionType.GROUP_HEADER || bChangeTop) {

                for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                    sec = m_report.getGroupsHeaders().item(_i);
                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if (secToMove.getTypeSection() === csRptSectionType.MAIN_DETAIL
                || secToMove.getTypeSection() === csRptSectionType.DETAIL || bChangeTop) {

                for(var _i = 0; _i < m_report.getDetails().count(); _i++) {
                    sec = m_report.getDetails().item(_i);
                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if (secToMove.getTypeSection() === csRptSectionType.GROUP_FOOTER || bChangeTop) {

                for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                    sec = m_report.getGroupsFooters().item(_i);
                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }
        };

        const pChangeHeightSection = function(sec, oldSecHeight) {
            let heightLines: number= 0;
UNKNOWN >>             cReportAspect w_aspect;

            // Update section line
            //
            for(var i = 0; i < sec.getSectionLines().count() - 1; i++) {
                w_aspect = sec.getSectionLines().item(i).getAspect();
                heightLines = heightLines + w_aspect.getHeight();
            }

            // for the last section line the height is the rest
            //
            let w_sectionLines: cReportSectionLines= sec.getSectionLines();
            w_aspect = w_sectionLines.item(w_sectionLines.count()-1).getAspect();
            w_aspect.setHeight(sec.getAspect().getHeight() - heightLines);

            pChangeTopSection(sec, 0, false, true);
        };

        const reLoadReport = function() {

            let paintSec: cReportPaintObject= null;

            m_paint = null;

            m_keyMoving = "";
            m_keySizing = "";
            m_keyObj = "";
            m_keyFocus = "";
            m_moveType = csRptEditorMoveType.CSRPTEDMOVTNONE;

            m_paint =  globalObject.CSReportDll.createCReportPaint();

            let w_paperInfo: cReportPaperInfo= m_report.getPaperInfo();
            m_paint.setGridHeight(
                    pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                m_report.getPaperInfo(),
                                                                w_paperInfo.getPaperSize(),
                                                                w_paperInfo.getOrientation()).Height));

            m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

            if (m_report.getName() !== "") {
                m_editorTab.Text = m_report.getName() + "   [X]";
            }

            let sec: cReportSection= null;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),
                                                sec.getTypeSection(),
                                                sec.getName(),
                                                false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_HEADER);
            }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),
                                                sec.getTypeSection(),
                                                sec.getName(),
                                                false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPH);
            }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),
                                                sec.getTypeSection(),
                                                sec.getName(),
                                                false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_DETAIL);
            }

            for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                sec = m_report.getGroupsFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),
                                                sec.getTypeSection(),
                                                sec.getName(),
                                                false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPF);
            }

            for(var _i = 0; _i < m_report.getFooters().count(); _i++) {
                sec = m_report.getFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(),
                                                sec.getKey(),
                                                sec.getTypeSection(),
                                                sec.getName(),
                                                false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_FOOTER);
            }

UNKNOWN >>             csRptPaintObjType paintType;

            for(var _i = 0; _i < m_report.getControls().count(); _i++) {

                let rptCtrl: cReportControl= m_report.getControls().item(_i);
                refreshNextNameCtrl(rptCtrl.getName());
                let ctrlAspect: cReportAspect= rptCtrl.getLabel().getAspect();

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTIMAGE
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                    paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
                }
                else {
UNKNOWN >>                     paintType =csRptPaintObjType.CSRPTPAINTOBJBOX;
                }

               let paintObj: cReportPaintObject= m_paint.getNewObject(paintType);

                // for old reports
                //
                ctrlAspect.setTransparent(ctrlAspect.getBackColor() === Color.White.ToArgb());

                paintObj.setImage(rptCtrl.getImage().getImage());

                let w_aspect: cReportAspect= paintObj.getAspect();
                w_aspect.setLeft(ctrlAspect.getLeft());
                w_aspect.setTop(ctrlAspect.getTop());
                w_aspect.setWidth(ctrlAspect.getWidth());
                w_aspect.setHeight(ctrlAspect.getHeight());
                w_aspect.setBackColor(ctrlAspect.getBackColor());
                w_aspect.setTransparent(ctrlAspect.getTransparent());
                w_aspect.setAlign(ctrlAspect.getAlign());
                w_aspect.setWordWrap(ctrlAspect.getWordWrap());

                if (ctrlAspect.getBorderType() === csReportBorderType.CSRPTBSNONE) {
                    w_aspect.setBorderColor(Color.Black.ToArgb());
                    w_aspect.setBorderWidth(0);
                    w_aspect.setBorderRounded(false);
                    w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
                }
                else {
                    w_aspect.setBorderType(ctrlAspect.getBorderType());
                    w_aspect.setBorderColor(ctrlAspect.getBorderColor());
                    w_aspect.setBorderColor3d(ctrlAspect.getBorderColor3d());
                    w_aspect.setBorderColor3dShadow(ctrlAspect.getBorderColor3dShadow());
                    w_aspect.setBorderRounded(ctrlAspect.getBorderRounded());
                    w_aspect.setBorderWidth(ctrlAspect.getBorderWidth());
                }

                switch (rptCtrl.getSectionLine().getTypeSection()) {
                    case  csRptSectionType.FOOTER:
                    case  csRptSectionType.MAIN_FOOTER:
                        w_aspect.setOffset(m_offSet);
                        break;
                }

                let w_font: cReportFont= w_aspect.getFont();
                w_font.setName(ctrlAspect.getFont().getName());
                w_font.setForeColor(ctrlAspect.getFont().getForeColor());
                w_font.setSize(ctrlAspect.getFont().getSize());
                w_font.setBold(ctrlAspect.getFont().getBold());
                w_font.setItalic(ctrlAspect.getFont().getItalic());
                w_font.setUnderline(ctrlAspect.getFont().getUnderline());
                w_font.setStrike(ctrlAspect.getFont().getStrike());

                paintObj.setText(rptCtrl.getLabel().getText());
                paintObj.setRptType(csRptSectionType.CONTROL);
                paintObj.setTag(rptCtrl.getKey());
                rptCtrl.setKeyPaint(paintObj.getKey());
            }

            m_dataHasChanged = false;

            m_paint.createPicture(m_picReport.CreateGraphics());

            m_picRule.Refresh();
        };

        const pAddPaintSetcionForSecLn = function(
            sec, 
            typeSecLn) {
            let paintSec: cReportPaintObject= null;

            if (sec.getSectionLines().count() > 1) {

                for(var i = 0; i < sec.getSectionLines().count() - 1; i++) {
                    let secLine: cReportSectionLine= sec.getSectionLines().item(i);
                    secLine.setKeyPaint(
                        paintSection(
                            secLine.getAspect(),
                            secLine.getKey(),
                            sec.getTypeSection(),
                            C_SECTIONLINE + i.ToString(),
                            true));

                    // we set the height of every section line
                    //
                    paintSec = m_paint.getPaintSections().item(secLine.getKeyPaint());
                    paintSec.setHeightSecLine(secLine.getAspect().getHeight());
                    paintSec.setRptType(typeSecLn);
                    paintSec.setRptKeySec(sec.getKey());
                }

                // if there is more than one section we use
                // textLine to show the name of the last line
                //
               let po: cReportPaintObject= m_paint.getPaintSections().item(sec.getKeyPaint());
                po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString());
            }

            // we set the height of the last section line
            //
            paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());

            let secLines: cReportSectionLines= sec.getSectionLines();
            paintSec.setHeightSecLine(secLines.item(secLines.count() - 1).getAspect().getHeight());
        };

        const refreshNextNameCtrl = function(nameCtrl) {
            let x: number= 0;
            if (cUtil.subString(nameCtrl, 0, cGlobals.C_CONTROL_NAME.Length).ToUpper() === cGlobals.C_CONTROL_NAME.ToUpper()) {
                x = cUtil.valAsInt(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1));
                if (x > m_nextNameCtrl) {
                    m_nextNameCtrl = x + 1;
                }
            }
        };

        const moveControl = function(sKeyPaintObj) {
            let rptSecLine: cReportSectionLine= null;
            let rptCtrl: cReportControl= null;
            let rptSecLineAspect: cReportAspect= null;
            let objPaintAspect: cReportAspect= null;

            m_paint.alingToGrid(sKeyPaintObj);

            rptCtrl = m_report.getControls().item(m_paint.getPaintObject(sKeyPaintObj).getTag());

            objPaintAspect = m_paint.getPaintObject(sKeyPaintObj).getAspect();

            if (rptCtrl === null) { return; }

            let w_aspect: cReportAspect= rptCtrl.getLabel().getAspect();
            w_aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset());
            w_aspect.setHeight(objPaintAspect.getHeight());
            w_aspect.setWidth(objPaintAspect.getWidth());
            w_aspect.setLeft(objPaintAspect.getLeft());

            if (getLineRegionForControl(sKeyPaintObj, rptSecLine, rptCtrl.getIsFreeCtrl())) {

                if (!(rptSecLine === rptCtrl.getSectionLine())) {
                    rptCtrl.getSectionLine().getControls().remove(rptCtrl.getKey());
                    rptSecLine.getControls().add(rptCtrl, rptCtrl.getKey());
                }

                // we need to check the control is between the limits of the section
                // in which it is contained
                //
                rptSecLineAspect = rptCtrl.getSectionLine().getAspect();

                w_aspect = rptCtrl.getLabel().getAspect();

                w_aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset());

                if (!rptCtrl.getIsFreeCtrl()) {
                    if (w_aspect.getTop() + w_aspect.getHeight()
                        > rptSecLineAspect.getTop() + rptSecLineAspect.getHeight()) {
                        w_aspect.setTop(rptSecLineAspect.getTop()
                                        + rptSecLineAspect.getHeight()
                                        - w_aspect.getHeight());
                    }
                }

                if (w_aspect.getTop() < rptSecLineAspect.getTop()) {
                    w_aspect.setTop(rptSecLineAspect.getTop());
                }

                objPaintAspect.setTop(w_aspect.getTop());
            }
        };

        const showPopMenuSection = function(noDelete, showGroups, x, y) {
            m_fmain.showPopMenuSection(this, noDelete, showGroups, m_picReport.PointToScreen(new Point(x, y)));
        };

        const showPopMenuControl = function(clickInCtrl, x, y) {

            let pasteEnabled: boolean= false;

            if (m_vCopyKeys.Length > 0) {
                pasteEnabled = true;
            }
            else if (!(m_fmain.getReportCopySource() === null)) {
                pasteEnabled = m_fmain.getReportCopySource().getVCopyKeysCount() > 0;
            }

            m_fmain.showPopMenuControl(this, clickInCtrl, pasteEnabled, m_picReport.PointToScreen(new Point(x, y)));
        };

        const m_fGroup_UnloadForm = function() {
            m_fGroup = null;
        };

        self.destroyPropertiesFormReference = function() {
            m_fProperties = null;
        };

        const refreshBody = function() {
            try {

                m_paint.endMove(m_picReport.CreateGraphics());

            } catch (Exception ex) {
                cError.mngError(ex, "ShowConnectsAux", C_MODULE, "");
            }
        };

        const refreshRule = function() {
            m_picRule.Refresh();
        };

        self.refreshReport = function() {

            let w_paperInfo: cReportPaperInfo= m_report.getPaperInfo();
            m_paint.setGridHeight(pSetSizePics(
                                       CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                    m_report.getPaperInfo(),
                                                                    w_paperInfo.getPaperSize(),
                                                                    w_paperInfo.getOrientation()).Height));
            pValidateSectionAspect();
            reLoadReport();
        };

        // TODO: remove me if not needed
        self.refreshPostion = function() {

        self.refreshAll = function() {
            refreshBody();
            refreshRule();
            cMainEditor.setDocActive(this);
        };

        const reportDone = function(sender, e) {
            closeProgressDlg();
        };

        const reportProgress = function(sender, e) {

            let task: string= e.task;
            let page: number= e.page;
            let currRecord: number= e.currRecord;
            let recordCount: number= e.recordCount;

            if (m_cancelPrinting) {
                if (cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)) {
                    e.cancel = true;
                    closeProgressDlg();
                    return;
                }
                else {
                    m_cancelPrinting = false;
                }
            }

            if (m_fProgress === null) { return; }

            if (page > 0) { m_fProgress.lbCurrPage.Text = page.ToString(); }
            if (task !== "") { m_fProgress.lbTask.Text = task; }
            if (currRecord > 0) { m_fProgress.lbCurrRecord.Text = currRecord.ToString(); }
            if (recordCount > 0 && cUtil.val(m_fProgress.lbRecordCount.Text) !== recordCount) {
                m_fProgress.lbRecordCount.Text = recordCount.ToString();
            }

            let percent: number= 0;
            if (recordCount > 0 && currRecord > 0) {
                percent = Convert.ToDouble(currRecord) / recordCount;
                let value: var= Convert.ToInt32(percent * 100);
                if (value > 100) value = 100; {
                m_fProgress.prgBar.Value = value;
            }

            Application.DoEvents();
        };

        const closeProgressDlg = function() {
            if (m_fProgress !== null && !m_fProgress.IsDisposed) {
                m_fProgress.Close();
            }
            m_fProgress = null;
        };

        const showProgressDlg = function() {
            m_cancelPrinting = false;
            if (m_fProgress === null) {
                m_fProgress =  globalObject.CSReportDll.createFProgress();
                // TODO: add event for m_report_Progress
            }
            m_fProgress.Show();
            m_fProgress.BringToFront();
        };

        const m_fProgress_Cancel = function() {
            m_cancelPrinting = true;
        };

        /* TODO: implement me
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

        /* TODO: implement me
        private void txEdit_KeyPress(int keyAscii) {
            if (keyAscii === vbKeyEscape) {
                endEditText(keyAscii === vbKeyEscape);
                keyAscii = 0;
            }
        }
         */

        const pGetLeftBody = function() {
            if (cMainEditor.gHideLeftBar) {
                return C_LEFTBODY;
            }
            else {
                return m_picRule.Width + C_LEFTBODY;
            }
        };

        const pSetSizePics = function(realPageHeight) {
            let pageHeight: number= 0;

            let w_paperInfo: cReportPaperInfo= m_report.getPaperInfo();
            m_picReport.Width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                m_report.getPaperInfo(),
                                                                w_paperInfo.getPaperSize(),
                                                                w_paperInfo.getOrientation()).Width;
            pGetOffSet(realPageHeight, pageHeight);

            if (pageHeight > realPageHeight) { realPageHeight = pageHeight; }

            m_picReport.Height = realPageHeight;
            m_picRule.Height = (realPageHeight + C_TOPBODY * 2);

            return pageHeight;
        };

        const pMoveAll = function(x, y) {
            let rptCtrlAspect: cReportAspect= null;
            let paintObj: cReportPaintObject= null;

            m_dataHasChanged = true;

            if (m_bNoMove) { return; }

            let i: number= 0;
            let offsetTop: number= 0;
            let offsetLeft: number= 0;
            let firstLeft: number= 0;
            let firstTop: number= 0;
            let firstOffSet: number= 0;

            if (m_vSelectedKeys.Length === 0) { return; }

            paintObj = m_paint.getPaintObject(m_keyMoving);

            let w_aspect: cReportAspect= paintObj.getAspect();
            firstLeft = w_aspect.getLeft();
            firstTop = w_aspect.getTop();
            firstOffSet = w_aspect.getOffset();

            for (i = m_vSelectedKeys.Length-1; i > -1; i--) {

                paintObj = m_paint.getPaintObject(m_vSelectedKeys[i]);

                offsetLeft = pGetOffsetLeftFromControls(firstLeft,
                                                        paintObj.getAspect().getLeft());

                offsetTop = pGetOffsetTopFromControls(firstTop - firstOffSet,
                                                        paintObj.getAspect().getTop()
                                                        - paintObj.getAspect().getOffset());

                w_aspect = paintObj.getAspect();

                if (x !== C_NOMOVE) {
                    w_aspect.setLeft(x - m_offX + offsetLeft);
                }

                if (y !== C_NOMOVE) {
                    w_aspect.setTop(y - m_offY + offsetTop);
                }
                else {

                    // we get rid off the offset because the primitive
                    // add it to the top but we don't allow vertical
                    // moves so Y must to remain constant
                    //
                    w_aspect.setTop(w_aspect.getTop() - paintObj.getAspect().getOffset());
                }

                // only controls move in all directions
                //
                if (paintObj.getRptType() === csRptSectionType.CONTROL) {
                    rptCtrlAspect = m_report.getControls().item(paintObj.getTag()).getLabel().getAspect();
                    rptCtrlAspect.setLeft(w_aspect.getLeft());
                    rptCtrlAspect.setTop(w_aspect.getTop());
                    rptCtrlAspect.setWidth(w_aspect.getWidth());
                    rptCtrlAspect.setHeight(w_aspect.getHeight());
                }

                moveControl(m_vSelectedKeys[i]);
            }
        };

        const pMoveHorizontal = function(x) {
            m_dataHasChanged = true;
            m_paint.getPaintObject(m_keyMoving).getAspect().setLeft(x - m_offX);
        };

        const pMoveVertical = function(x, y) {
            let sKeySection: string= "";
UNKNOWN >>             csRptSectionType rptType;

            let maxBottom: number= 0;
            let minBottom: number= 0;

            let maxBottomSectionLine: number= 0;

            let rptSec: cReportSection= null;
           let paintObj: cReportPaintObject= null;
            let isSecLn: boolean= false;

            m_indexSecLnMoved = -1;

            paintObj = m_paint.getPaintObject(m_keyMoving);
            let w_aspect: cReportAspect= paintObj.getAspect();

            sKeySection = paintObj.getTag();

            // sections can only be move verticaly
            // always is the bottom of the section which is moved
            // every time we move a section the height change
            //
            rptType = paintObj.getRptType();

            switch (rptType) {

                    //---------------------
                    // HEADER
                    //---------------------

                case csRptSectionType.MAIN_HEADER:
                case csRptSectionType.HEADER:

                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // GROUP HEADER
                    //---------------------

                    break;

                case  csRptSectionType.GROUP_HEADER:

                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // DETAIL
                    //---------------------

                    break;

                case  csRptSectionType.MAIN_DETAIL:
                case  csRptSectionType.DETAIL:

                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // GROUP FOOTER
                    //---------------------

                    break;

                case  csRptSectionType.GROUP_FOOTER:

                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // FOOTER
                    //---------------------

                    break;

                case  csRptSectionType.MAIN_FOOTER:
                case  csRptSectionType.FOOTER:

                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // Section Lines
                    //---------------------
                    break;

                case  csRptSectionType.SECLN_HEADER:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case  csRptSectionType.SECLN_GROUPH:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case  csRptSectionType.SECLN_DETAIL:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case  csRptSectionType.SECLN_GROUPF:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case  csRptSectionType.SECLN_FOOTER:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    m_indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex();
                    break;
            }

            if (isSecLn) {
                minBottom = pGetMinBottomForSecLn(rptSec, paintObj.getTag(), minBottom);
                pChangeSecLnHeight(paintObj,
                                    y,
                                    minBottom,
                                    maxBottomSectionLine,
                                    rptSec.getSectionLines().item(paintObj.getTag()));

                y = rptSec.getAspect().getTop()
                    - paintObj.getAspect().getOffset()
                    + pGetSecHeigthFromSecLines(rptSec)
UNKNOWN >>                     - cGlobals.C_HEIGHT_BAR_SECTION;

                m_offY = 0;
                paintObj = m_paint.getPaintSections().item(rptSec.getKeyPaint());
            }

            moveSection(paintObj, x, y, minBottom, maxBottom, rptSec, false);
        };

        const pGetSecHeigthFromSecLines = function(sec) {
            let rtn: number= 0;

            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine= sec.getSectionLines().item(_i);
                rtn = rtn + secLn.getAspect().getHeight();
            }

            return rtn;
        };

        const pGetMinBottomForSecLn = function(
            sec, 
            secLnKey, 
            minBottom) {
            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine= sec.getSectionLines().item(_i);
                if (secLn.getKey() === secLnKey) { break; }
                minBottom = minBottom + secLn.getAspect().getHeight();
            }
            return minBottom;
        };

        const pChangeSecLnHeight = function(
           paintObj, 
            y, 
            minBottom, 
            maxBottom, 
            secLn) {
            let w_aspect: cReportAspect= paintObj.getAspect();

            // if Y is contained between the range allowed everything is ok
            //
            if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - m_offY);
            }
            else {
                // if it have been moved upward
                //
                if (y < minBottom) {
                    w_aspect.setTop(minBottom);

                }
                // if it have been moved downward
                //
                else {
                    w_aspect.setTop(maxBottom);
                }
            }

            // because the top has been setted to the real dimensions
            // of the screen now we need to move it the offset
            // of its section
            //
            w_aspect.setTop(w_aspect.getTop() + w_aspect.getOffset());

            // TODO: remove after more testing - aligning the sections has an undesired result: the last section line is shrinked after five resize actions
            //
            // m_paint.alingToGrid(paintObj.getKey());

            // the section line height has been changed
            //
            secLn.getAspect().setHeight(w_aspect.getTop()
                                        + cGlobals.C_HEIGHT_BAR_SECTION
                                        - secLn.getAspect().getTop());
        };

        const pResizeControl = function(x, y) {
            let height: number= 0;
            let width: number= 0;
            let left: number= 0;
            let top: number= 0;

            if (m_vSelectedKeys.Length === 0) { return; }

            m_dataHasChanged = true;

            // first we need to modify the control which has its size changed
            //
            let w_getPaintObject: cReportPaintObject= m_paint.getPaintObject(m_keySizing);
            let w_aspect: cReportAspect= w_getPaintObject.getAspect();

            // orginal size to know how much it has changed
            //
            height = w_aspect.getHeight();
            width = w_aspect.getWidth();
            left = w_aspect.getLeft();
            top = w_aspect.getTop();

            switch (m_moveType) {
                case  csRptEditorMoveType.CSRPTEDMOVDOWN:
                    w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset()));
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFT:
                    w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x);
                    w_aspect.setLeft(x);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHT:
                    w_aspect.setWidth(x - w_aspect.getLeft());
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVUP:
                    w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y);
                    w_aspect.setTop(y + w_aspect.getOffset());
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                    w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset()));
                    w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x);
                    w_aspect.setLeft(x);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                    w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y);
                    w_aspect.setTop(y + w_aspect.getOffset());
                    w_aspect.setWidth(w_aspect.getWidth() + w_aspect.getLeft() - x);
                    w_aspect.setLeft(x);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                    w_aspect.setWidth(x - w_aspect.getLeft());
                    w_aspect.setHeight(y - (w_aspect.getTop() - w_aspect.getOffset()));
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                    w_aspect.setHeight(w_aspect.getHeight() + (w_aspect.getTop() - w_aspect.getOffset()) - y);
                    w_aspect.setTop(y + w_aspect.getOffset());
                    w_aspect.setWidth(x - w_aspect.getLeft());
                    break;
            }

            top = w_aspect.getTop() - top;
            left = w_aspect.getLeft() - left;
            width = w_aspect.getWidth() - width;
            height = w_aspect.getHeight() - height;

            pMoveControlAfterResize(w_getPaintObject.getAspect(), true);

            for(var i = 0; i < m_vSelectedKeys.Length; i++) {

                if (m_keySizing !== m_vSelectedKeys[i]) {

                    w_getPaintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    w_aspect = w_getPaintObject.getAspect();

                    w_aspect.setHeight(w_aspect.getHeight() + height);
                    w_aspect.setTop(w_aspect.getTop() + top);
                    w_aspect.setWidth(w_aspect.getWidth() + width);
                    w_aspect.setLeft(w_aspect.getLeft() + left);

                    pMoveControlAfterResize(w_getPaintObject.getAspect(), false);
                }
            }
        };

        const pMoveControlAfterResize = function(aspect, bSizing) {
            self.int: constC_MIN_WIDTH = 1;
            self.int: constC_MIN_HEIGHT = 1;

            let rptCtrlAspect: cReportAspect= null;

            if (m_paint.getPaintObject(m_keySizing).getRptType() === csRptSectionType.CONTROL) {
                rptCtrlAspect = m_report.getControls().item(m_paint.getPaintObject(m_keySizing).getTag()).getLabel().getAspect();
                rptCtrlAspect.setLeft(aspect.getLeft());
                if (!bSizing) {
                    rptCtrlAspect.setTop(aspect.getTop() + aspect.getOffset());
                }
                else {
                    rptCtrlAspect.setTop(aspect.getTop());
                }
                rptCtrlAspect.setWidth(aspect.getWidth());
                rptCtrlAspect.setHeight(aspect.getHeight());
            }

            switch (m_moveType) {
                case  csRptEditorMoveType.CSRPTEDMOVDOWN:
                    m_paint.alingObjBottomToGrid(m_keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFT:
                    m_paint.alingObjLeftToGrid(m_keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHT:
                    m_paint.alingObjRightToGrid(m_keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVUP:
                    m_paint.alingObjTopToGrid(m_keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                    m_paint.alingObjLeftBottomToGrid(m_keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                    m_paint.alingObjLeftTopToGrid(m_keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                    m_paint.alingObjRightBottomToGrid(m_keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                    m_paint.alingObjRightTopToGrid(m_keySizing);
                    break;
            }

            // Validations

            // Width can't be lower than C_MIN_WIDTH
            //
            if (aspect.getWidth() < C_MIN_WIDTH) { aspect.setWidth(C_MIN_WIDTH); }

            // Height can't be lower than C_MIN_HEIGHT
            //
            if (aspect.getHeight() < C_MIN_HEIGHT) { aspect.setHeight(C_MIN_HEIGHT); }
        };

        const pMoveHeader = function(
            sKeySection, 
            minBottom, 
            maxBottom) {
UNKNOWN >>             float dummy;
            return pMoveHeader(sKeySection, minBottom, maxBottom, false, "", dummy);
        };

        const pMoveHeader = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine, 
            secLnKey, 
            maxBottomSectionLine) {
            let index: number= 0;
            let rptSec: cReportSection= null;

            rptSec = m_report.getHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {
                minBottom = C_MIN_HEIGHT_SECTION;
            }
            else {
                // bottom of previous header + C_Min_Height_Section
                let w_aspect: cReportAspect= m_report.getHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getTop() + w_aspect.getHeight() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        };

        const pMoveGroupHeader = function(
            sKeySection, 
            minBottom, 
            maxBottom) {
UNKNOWN >>             float dummy;
            return pMoveGroupHeader(sKeySection, minBottom, maxBottom, false, "", dummy);
        };

        const pMoveGroupHeader = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine, 
            secLnKey, 
            maxBottomSectionLine) {
            let index: number= 0;
            let rptSec: cReportSection= null;

            rptSec = m_report.getGroupsHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {
                // bottom of previous header + C_Min_Height_Section
                let w_headers: cReportSections= m_report.getHeaders();
                let w_aspect: cReportAspect= w_headers.item(w_headers.count()-1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }
            else {
                // bottom of previous group header + C_Min_Height_Section
                let w_aspect: cReportAspect= m_report.getGroupsHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        };

        const getHeightOfSectionsBellowMe = function(section, secLnKey) {
            let height: number= 0;

            if ( ! String.IsNullOrEmpty(secLnKey) ) {
                let add: boolean= false;
                for(var _i = 0; _i < section.getSectionLines().count(); _i++) {
                    let secLn: cReportSectionLine= section.getSectionLines().item(_i);
                    if (add) {
                        height += secLn.getAspect().getHeight();
                    }
                    else if (secLn.getKey() === secLnKey) {
                        add = true;
                    }
                }
            }

            let rptType: csRptSectionType= section.getTypeSection();

            switch (rptType) {

                case csRptSectionType.HEADER:
                case csRptSectionType.MAIN_HEADER:
                    height += getHeightFromSections(m_report.getHeaders(), section);
                    height += getHeightFromSections(m_report.getGroupsHeaders(), null);
                    height += getHeightFromSections(m_report.getDetails(), null);
                    height += getHeightFromSections(m_report.getGroupsFooters(), null);
                    height += getHeightFromSections(m_report.getFooters(), null);
                    break;

                case csRptSectionType.GROUP_HEADER:
                    height += getHeightFromSections(m_report.getGroupsHeaders(), section);
                    height += getHeightFromSections(m_report.getDetails(), null);
                    height += getHeightFromSections(m_report.getGroupsFooters(), null);
                    height += getHeightFromSections(m_report.getFooters(), null);
                    break;

                case csRptSectionType.DETAIL:
                case csRptSectionType.MAIN_DETAIL:
                    height += getHeightFromSections(m_report.getDetails(), section);
                    height += getHeightFromSections(m_report.getGroupsFooters(), null);
                    height += getHeightFromSections(m_report.getFooters(), null);
                    break;

                case csRptSectionType.GROUP_FOOTER:
                    height += getHeightFromSections(m_report.getGroupsFooters(), section);
                    height += getHeightFromSections(m_report.getFooters(), null);
                    break;

                case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:
                    height += getHeightFromSections(m_report.getFooters(), section);
                    break;

                default:
                    throw new ReportEditorException(
                        csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID,
                        C_MODULE,
                        cReportEditorError.errGetDescript(
                                        csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID));
            }

            return height;
        };

        const getHeightFromSections = function(sections, section) {
            let add: boolean= section === null;
            let height: number= 0;
            for(var _i = 0; _i < sections.count(); _i++) {
                let sec: cReportSection= sections.item(_i);
                if (add) {
                    height += sec.getAspect().getHeight();
                }
                else if (section === sec) {
                    add = true;
                }
            }
            return height;
        };

        const getAllHeadersAndGroupsAndDetailsHeight = function() {
            let sec: cReportSection= null;

            let height: number= 0;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            return height;
        };

        const pMoveDetails = function(
            sKeySection, 
            minBottom, 
            maxBottom) {
UNKNOWN >>             float dummy;
            return pMoveDetails(sKeySection, minBottom, maxBottom, false, "", dummy);
        };

        const pMoveDetails = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine, 
            secLnKey, 
            maxBottomSectionLine) {
            let index: number= 0;
            let rptSec: cReportSection= null;

            rptSec = m_report.getDetails().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------

            if (index === 0) {
                // if there are groups
                //
                if (m_report.getGroupsHeaders().count() > 0) {
                    // top of the last group header + C_Min_Height_Section
                    let w_groupsHeaders: cIReportGroupSections= m_report.getGroupsHeaders();
                    let w_aspect: cReportAspect= w_groupsHeaders.item(w_groupsHeaders.count()-1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
                else {
                    // top of the last header + C_Min_Height_Section
                    let w_headers: cReportSections= m_report.getHeaders();
                    let w_aspect: cReportAspect= w_headers.item(w_headers.count()-1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
            }
            else {
                // top of the previous detail + C_Min_Height_Section
                //
                let w_aspect: cReportAspect= m_report.getDetails().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        };

        const pMoveGroupFooter = function(
            sKeySection, 
            minBottom, 
            maxBottom) {
UNKNOWN >>             float dummy;
            return pMoveGroupFooter(sKeySection, minBottom, maxBottom, false, "", dummy);
        };

        const pMoveGroupFooter = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine, 
            secLnKey, 
            maxBottomSectionLine) {
            let index: number= 0;
            let rptSec: cReportSection= null;

            rptSec = m_report.getGroupsFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {
                // bottom of the last detail + C_Min_Height_Section
                //
                let w_details: cReportSections= m_report.getDetails();
                let w_aspect: cReportAspect= w_details.item(w_details.count() - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }
            else {
                // bottom of the previous group footer + C_Min_Height_Section
                //
                let w_aspect: cReportAspect= m_report.getGroupsFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        };

        const pMoveFooter = function(
            sKeySection, 
            minBottom, 
            maxBottom) {
UNKNOWN >>             float dummy;
            return pMoveFooter(sKeySection, minBottom, maxBottom, false, "", dummy);
        };

        const pMoveFooter = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine, 
            secLnKey, 
            maxBottomSectionLine) {

            let index: number= 0;
            let rptSec: cReportSection= null;

            rptSec = m_report.getFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {

                // if there are groups
                //
                if (m_report.getGroupsFooters().count() > 0) {

                    // the bottom of the last group footer
                    //
                    let w_groupsFooters: cIReportGroupSections= m_report.getGroupsFooters();
                    let w_aspect: cReportAspect= w_groupsFooters.item(w_groupsFooters.count() - 1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
                else {
                    // bottom of the last detail
                    //
                    let w_details: cReportSections= m_report.getDetails();
                    let w_aspect: cReportAspect= w_details.item(w_details.count() - 1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
            }
            else {
                // bottom of the previous footer
                //
                let w_aspect: cReportAspect= m_report.getFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() - m_offSet + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottomSectionLine = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = m_picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        };

        const pGetMinBottomWithSecLn = function(secLns, minBottom) {
            for(var i = 0; i < secLns.count() - 1; i++) {
                minBottom = minBottom + secLns.item(i).getAspect().getHeight();
            }

            return minBottom;
        };

        const pGetOffSet = function(realPageHeight) {
            let pageHeight: number= 0;
            pGetOffSet(realPageHeight, pageHeight);
        };

        const pGetOffSet = function(realPageHeight, rtnPageHeight) {
            let sec: cReportSection= null;

            rtnPageHeight = 0;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                sec = m_report.getGroupsFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < m_report.getFooters().count(); _i++) {
                sec = m_report.getFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            m_offSet = realPageHeight - rtnPageHeight;

            if (m_offSet < 0) { m_offSet = 0; }
        };

        const pRefreshOffSetInPaintObjs = function() {
            let sec: cReportSection= null;
            let secLines: cReportSectionLine= null;
            let ctl: cReportControl= null;

            let w_paintSections: cReportPaintObjects= m_paint.getPaintSections();
                for(var _i = 0; _i < m_report.getFooters().count(); _i++) {
                    sec = m_report.getFooters().item(_i);
                    w_paintSections.item(sec.getKeyPaint()).getAspect().setOffset(m_offSet);
                    for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                        secLines = sec.getSectionLines().item(_j);
                        if (secLines.getKeyPaint() !== "") {
                            w_paintSections.item(secLines.getKeyPaint()).getAspect().setOffset(m_offSet);
                        }
                        for(var _k = 0; _k < secLines.getControls().count(); _k++) {
                            ctl = secLines.getControls().item(_k);
UNKNOWN >>                            cReportPaintObject po;
                            po = m_paint.getPaintObjects().item(ctl.getKeyPaint());
                            po.getAspect().setOffset(m_offSet);
                        }
                    }
                }
        };

        // if the click was over a control which is not part of the
        // selected controls collection we clear the selected collection
        // and add the control which was clicked to the selected collection
        //
        const pSetSelectForRightBttn = function() {
            for(var i = 0; i < m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === m_keyObj) { return false; }
            }

            G.redim(m_vSelectedKeys, 1);
            m_vSelectedKeys[0] = m_keyObj;

            return true;
        };

        const pValidateSectionAspect = function() {
            let sec: cReportSection= null;
            let top: number= 0;
            let i: number= 0;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            for(var _i = 0; _i < m_report.getGroupsHeaders().count(); _i++) {
                sec = m_report.getGroupsHeaders().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            for(var _i = 0; _i < m_report.getDetails().count(); _i++) {
                sec = m_report.getDetails().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            for(var _i = 0; _i < m_report.getGroupsFooters().count(); _i++) {
                sec = m_report.getGroupsFooters().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            let w_paperInfo: cReportPaperInfo= m_report.getPaperInfo();
            let height: var= CSReportPaint.cGlobals.getRectFromPaperSize(m_report.getPaperInfo(),;
                                                    w_paperInfo.getPaperSize(),
                                                    w_paperInfo.getOrientation()).Height;
            top = height;

            pGetOffSet(height);

            for (i = m_report.getFooters().count()-1; i > -1; i--) {
                sec = m_report.getFooters().item(i);
                top = top - sec.getAspect().getHeight();
                pValidateSectionAspecAux(top, sec);
            }

            pRefreshOffSetInPaintObjs();
        };

        const pValidateSectionAspecAux = function(top, sec) {
            let secLn: cReportSectionLine= null;
            let topLn: number= 0;
            let secLnHeight: number= 0;
            let width: number= 0;

            let w_paperInfo: cReportPaperInfo= m_report.getPaperInfo();
            width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                    m_report.getPaperInfo(),
                                                    w_paperInfo.getPaperSize(),
                                                    w_paperInfo.getOrientation()).Width;
            topLn = top;

UNKNOWN >>             cReportAspect w_aspect;

            for(var i = 0; i < sec.getSectionLines().count() - 1; i++) {
                secLn = sec.getSectionLines().item(i);
                w_aspect = secLn.getAspect();
                w_aspect.setTop(topLn);
                w_aspect.setWidth(width);
                if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) {
                    w_aspect.setHeight(C_MIN_HEIGHT_SECTION);
                }
                topLn = topLn + w_aspect.getHeight();
                secLnHeight = secLnHeight + w_aspect.getHeight();
            }

            let w_sectionLines: cReportSectionLines= sec.getSectionLines();
            secLn = w_sectionLines.item(w_sectionLines.count()-1);

            w_aspect = secLn.getAspect();
            w_aspect.setTop(topLn);
            w_aspect.setHeight(sec.getAspect().getHeight() - secLnHeight);
            if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) {
                w_aspect.setHeight(C_MIN_HEIGHT_SECTION);
            }
            secLnHeight = secLnHeight + w_aspect.getHeight();

            w_aspect = sec.getAspect();
            w_aspect.setHeight(secLnHeight);
            if (w_aspect.getHeight() < C_MIN_HEIGHT_SECTION) {
                w_aspect.setHeight(C_MIN_HEIGHT_SECTION);
            }
            w_aspect.setWidth(width);
            w_aspect.setTop(top);
            topLn = top;
            top = top + w_aspect.getHeight();

            pChangeTopSection(sec, 0, false, false);
            return top;
        };

        self.showControls = function() {
            try {
                let f: fControls= cMainEditor.getCtrlBox(this);
                f.clear();
                f.addCtrls(m_report);
                if (!f.Visible) {
                    f.Show(m_fmain);
                }
            } catch (Exception ex) {
                cError.mngError(ex, "showControls", C_MODULE, "");
            }
        };

        self.showControlsTree = function() {
            try {
                let f: fTreeViewCtrls= cMainEditor.getCtrlTreeBox(this);
                f.clear();
                f.addCtrls();
                if (!f.Visible) {
                    f.Show(m_fmain);
                }
            } catch (Exception ex) {
                cError.mngError(ex, "showControlsTree", C_MODULE, "");
            }
        };

        const pSetInitDir = function() {
            if (cMainEditor.gbFirstOpen) {
                cMainEditor.gbFirstOpen = false;
                // TODO: implement me
                // m_fmain.cmDialog.InitDir = cGlobals.gWorkFolder;
            }
        };

        /* TODO: implement me
        private void form_QueryUnload(int cancel, int unloadMode) {
            cancel = !saveChanges();
            if (cancel) { cGlobals.setDocActive(this); }
        }
         */

        /* TODO: implement me
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

        self.init = function() {
            m_showingProperties = false;

            let oLaunchInfo: cReportLaunchInfo= null;
            m_report =  globalObject.CSReportDll.createCReport();

            // TODO: event handler for
            //
            /*
                        m_report_Done();
                        m_report_Progress(task, page, currRecord, recordCount, cancel,);
                        m_report_FindFileAccess(answer, commDialog, file,);
            */

            m_report.Progress += reportProgress;
            m_report.ReportDone += reportDone;

            oLaunchInfo =  globalObject.CSReportDll.createCReportLaunchInfo();

            m_report.getPaperInfo().setPaperSize(m_fmain.getPaperSize());
            m_report.getPaperInfo().setOrientation(m_fmain.getOrientation());

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(m_fmain.printDialog));
            oLaunchInfo.setObjPaint(new cReportPrint());
            if (!m_report.init(oLaunchInfo)) { return; }

            m_report.setPathDefault(Application.StartupPath);

            m_picReport.Top = C_TOPBODY;
            m_picRule.Left = 0;
            m_picReport.Left = pGetLeftBody();

            m_keyMoving = "";
            m_keySizing = "";
            m_keyObj = "";
            m_keyFocus = "";
            m_nextNameCtrl = 0;

            m_paint =  globalObject.CSReportDll.createCReportPaint();

            let tR: Rectangle= null;
            let w_paperInfo: cReportPaperInfo= m_report.getPaperInfo();
            tR =  globalObject.CSReportDll.createRectangle(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                m_report.getPaperInfo(),
                                                w_paperInfo.getPaperSize(),
                                                w_paperInfo.getOrientation()));

            cGlobals.createStandarSections(m_report, tR);

            reLoadReport();
        };

        const pUpdateFormulas = function(currentName, newName) {
            let rptCtrl: cReportControl= null;

            for(var i = 0; i < m_report.getControls().count(); i++) {

                rptCtrl = m_report.getControls().item(i);

                let w_formulaHide: cReportFormula= rptCtrl.getFormulaHide();
                if (w_formulaHide.getText() !== "") {
                    if (w_formulaHide.getText().IndexOf(currentName, 1) !== 0) {
                        w_formulaHide.setText(pReplaceInFormula(w_formulaHide.getText(), currentName, newName));
                    }
                }

                let w_formulaValue: cReportFormula= rptCtrl.getFormulaValue();
                if (w_formulaValue.getText() !== "") {
                    if (w_formulaValue.getText().IndexOf(currentName, 1) !== 0) {
                        w_formulaValue.setText(pReplaceInFormula(w_formulaValue.getText(), currentName, newName));
                    }
                }
            }
        };

        const pReplaceInFormula = function(formulaText, currentName, newName) {
            let _rtn: string= "";

            // if it isn't an internal function we give the user
            // a chance to cancel the changes
            //
            if (cUtil.subString(formulaText, 0, 1).Trim() !== "_") {
                let fReplace: fFormulaReplace= null;
                fReplace =  globalObject.CSReportDll.createFFormulaReplace();
                fReplace.txCurrFormula.Text = formulaText;
                fReplace.txNewFormula.Text = formulaText.Replace(currentName, newName);
                fReplace.ShowDialog();
                if (fReplace.getOk()) {
                    _rtn = fReplace.txNewFormula.Text;
                }
                else {
                    _rtn = formulaText;
                }
                fReplace.Hide();
            }
            else {

                _rtn = formulaText.Replace(currentName, newName);
            }
            return _rtn;
        };

        self.editConnectionString = function() {
            let stringConnection: string= m_report.getConnect().getStrConnect();
            if (cUtil.getInput(stringConnection, "You can modify the string connection of this report", "String connection")) {
                m_report.getConnect().setStrConnect(stringConnection);
            }
        };

        self.editDataSource = function() {
            let dataSource: string= m_report.getConnect().getDataSource();
            if (cUtil.getInput(dataSource, "You can modify the data source of this report", "Data Source")) {
                m_report.getConnect().setDataSource(dataSource);
            }
        };
        return self;

    }

UNKNOWN >>     enum csAskEditResult {
        CSASKRSLTYES = 1,
        CSASKRSLTNO = 2,
        CSASKRSLTCANCEL = 3
        return self;

    }
}(globalObject));
