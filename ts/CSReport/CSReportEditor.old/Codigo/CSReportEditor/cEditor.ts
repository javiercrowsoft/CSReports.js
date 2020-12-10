(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createCEditor = function() {

        // @ts-ignore
        let self: CSReportEditor.IcEditor = {};
        let m_fmain: fMain = null;
        let m_editor: Panel = null;
        let m_picRule: PictureBox = null;
        let m_picReport: PictureBox = null;
        let m_editorTab: TabPage = null;
        let m_reportFullPath: string = "";
		let m_graphic: Graphics = null;
		let m_name: string = null;

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

            m_editorTab = editorTab;
        };

        const cEditor = function() {

        const C_MODULE: string = "cEditor";
        const C_TOPBODY: number = 150;
        const C_LEFTBODY: number = 0;
        const C_MIN_HEIGHT_SECTION: number = 50;
        const C_SECTIONLINE: string = "Line ";

        const C_NOMOVE: number = -1111111;

        let m_report: cReport = null;
        let m_paint: CSReportPaint.cReportPaint = null;
        let m_keyMoving: string = "";
        let m_moveType: csRptEditorMoveType = null;
        let m_keySizing: string = "";
        let m_mouseButtonPress: boolean = false;
        let m_offX: number = 0;
        let m_offY: number = 0;
        let m_keyObj: string = "";
        let m_keyFocus: string = "";
        let m_moving: boolean = false;
        let m_opening: boolean = false;
        let m_offSet: number = 0;

        // the first SectionLine from where we need 
        // to modify the top after moving sections. 
        // It is used only in footers.
        let m_indexSecLnMoved: number = 0;

        // it is used in MoveSection to calculate
        // the positions after adding new SectionLines.
        //
        let m_newSecLineOffSet: number = 0;

        let m_bMoveVertical: boolean = false;
        let m_bMoveHorizontal: boolean = false;
        let m_bNoMove: boolean = false;

        let m_vSelectedKeys: String[] = null;
        let m_vCopyKeys: String[] = null;

        let m_fProgress: fProgress = null;
        let m_cancelPrinting: boolean = false;

        let m_formIndex: number = 0;

        let m_fProperties: fProperties = null;
        let m_fSecProperties: fSecProperties = null;
        let m_fFormula: fFormula = null;
        let m_fGroup: fGroup = null;
        let m_fToolBox: fToolbox = null;
        let m_fControls: fControls = null;
        let m_fTreeCtrls: fTreeViewCtrls = null;
        let m_fConnectsAux: fConnectsAux = null;
        let m_fSearch: fSearch = null;

        // names
        let m_nextNameCtrl: number = 0;
        let m_showingProperties: boolean = false;
        let m_dataHasChanged: boolean = false;

        // to add new controls
        let m_copyControls: boolean = false;
        let m_copyControlsFromOtherReport: boolean = false;
        let m_bCopyWithoutMoving: boolean = false;

        let m_draging: boolean = false;
        let m_controlName: string = "";
        let m_controlType: csRptEditCtrlType = null;
        let m_fieldName: string = "";
        let m_fieldType: number = 0;
        let m_fieldIndex: number = 0;
        let m_formulaText: string = "";

        let m_x: number = 0;
        let m_y: number = 0;
        let m_keyboardMove: boolean = false;

        let m_keyboardMoveStep: number = 0;

        let m_inMouseDown: boolean = false;

        let m_typeGrid: CSReportPaint.csETypeGrid = null;

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
            m_fSearch = globalObject.CSReportEditor.createFSearch();
            m_fSearch.ShowDialog();
        };

        self.moveVertical = function() {
			// TODO: reimplement
			//form_KeyUp(Keys.F11, false);
        };

        self.moveHorizontal = function() {
			// TODO: reimplement
			//form_KeyUp(Keys.F12, false);
        };

        self.moveNoMove = function() {
			// TODO: reimplement
			//form_KeyUp(Keys.F9, false);
        };

        self.moveAll = function() {
			// TODO: reimplement
			//form_KeyUp(Keys.F8, false);
        };

        self.showGrid = function(typeGrid) {
            m_typeGrid = typeGrid;
            m_paint.initGrid(m_picReport.CreateGraphics(), typeGrid);
        };

        self.showConnectsAux = function() {
            try {
                m_fConnectsAux = globalObject.CSReportEditor.createFConnectsAux();

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
		// TODO: reimplement
		/*
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
        const m_fConnectsAux_AddConnect = function() {
            try {

                let rptConnect: cReportConnect = null;
                rptConnect = globalObject.CSReportDll.createCReportConnect();

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

        const m_fControls_EditCtrl = function(ctrlKey) {
            try {

                pSelectCtrl(ctrlKey);
                showProperties();
                m_fControls.clear();
                m_fControls.addCtrls(m_report);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fControls_EditCtrl", C_MODULE, "");
            }
        };

        const m_fSearch_EditCtrl = function(ctrlKey) {
            try {

                pSelectCtrl(ctrlKey);
                showProperties();

            } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_EditCtrl", C_MODULE, "");
            }
        };

        const m_fSearch_EditSection = function(secKey) {
            try {

                let bIsSecLn: boolean = false;

				pSelectSection(secKey, bIsSecLn);

                if (bIsSecLn) {
                    showSecLnProperties();
                } 
                else {
                    showProperties();
                }

            } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_EditSection", C_MODULE, "");
            }
        };

        const m_fSearch_SetFocusCtrl = function(ctrlKey) {
            try {

                pSelectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_SetFocusCtrl", C_MODULE, "");
            }
        };

        const m_fSearch_SetFocusSec = function(secKey) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fSearch_SetFocusSec", C_MODULE, "");
            }
        };

        const m_fTreeCtrls_EditCtrl = function(ctrlKey) {
            try {

                pSelectCtrl(ctrlKey);
                showProperties();
                m_fTreeCtrls.clear();
                m_fTreeCtrls.addCtrls(m_report);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_EditCtrl", C_MODULE, "");
            }
        };

        const m_fControls_SetFocusCtrl = function(ctrlKey) {
            try {

                pSelectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fControls_SetFocusCtrl", C_MODULE, "");
            }
        };

        const m_fTreeCtrls_EditSection = function(secKey) {
            try {

                let bIsSecLn: boolean = false;

				pSelectSection(secKey, bIsSecLn);

                if (bIsSecLn) {
                    showSecLnProperties();
                } 
                else {
                    showProperties();
                }
                m_fTreeCtrls.clear();
                m_fTreeCtrls.addCtrls(m_report);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_EditCtrl", C_MODULE, "");
            }
        };

        const m_fTreeCtrls_SetFocusCtrl = function(ctrlKey) {
            try {

                pSelectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_SetFocusCtrl", C_MODULE, "");
            }
        };

        const m_fTreeCtrls_SetFocusSec = function(secKey) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "m_fTreeCtrls_SetFocusSec", C_MODULE, "");
            }
        };

        const pSelectCtrl = function(ctrlKey) {
            let bWasRemoved: boolean = false;
            let sKey: string = "";

			G.redim(m_vSelectedKeys, 0);
            sKey = getReport().getControls().item(ctrlKey).getKeyPaint();
            pAddToSelected(sKey, false, bWasRemoved);

            if (bWasRemoved) { sKey = ""; }

            m_keyFocus = sKey;
            m_keyObj = sKey;
			m_paint.setFocus(m_keyFocus, m_graphic, true);
        };

		const pSelectSection = function(secKey) {
			let bIsSecLn: boolean = false;
			pSelectSection (secKey, bIsSecLn);
		};

        const pSelectSection = function(secKey, bIsSecLn) {
            let bWasRemoved: boolean = false;
            let sKey: string = "";

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
                let secLn: cReportSectionLine = null;
                let sec: cReportSection = null;

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
			m_paint.setFocus(m_keyFocus, m_graphic, true);
        };

        const pGetSecLnFromKey = function(
            secKey, 
			sections, 
            rtnSec) {
            let sec: cReportSection = null;
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

        const m_fFormula_CheckSintaxis = function(cancel, code) {
            let f: cReportFormula = null;
            f = globalObject.CSReportDll.createCReportFormula();
            if (m_fProperties !== null) {
                f.setName(m_fProperties.getFormulaName());
            } 
            else {
                f.setName(m_fSecProperties.getFormulaName());
            }
            f.setText(code);
			cancel = !m_report.getCompiler().checkSyntax(f);
        };

        const m_fGroup_ShowHelpDbField = function() {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

			sField = m_fGroup.getDbField();
            nFieldType = m_fGroup.getFieldType();
            nIndex = m_fGroup.getIndex();

			if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { return; }

			m_fGroup.setDbField(sField);
            m_fGroup.setFieldType(nFieldType);
            m_fGroup.setIndex(nIndex);
        };

        const m_fProperties_ShowEditFormula = function(formula, cancel) {
			pShowEditFormula(formula, cancel);
        };

		const m_fProperties_ShowHelpChartField = function(cancel, ctrl, idx) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

            sField = ctrl.Text;
            nFieldType = m_fProperties.getChartFieldType(idx);
            nIndex = m_fProperties.getChartIndex(idx);

			cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; }

            ctrl.Text = sField;
            m_fProperties.setChartFieldType(idx, nFieldType);
            m_fProperties.setChartIndex(idx, nIndex);
        };

        const m_fProperties_ShowHelpChartGroupField = function(cancel) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

			sField = m_fProperties.getDbFieldGroupValue();
            nFieldType = m_fProperties.getChartGroupFieldType();
            nIndex = m_fProperties.getChartGroupIndex();

			cancel = cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; }

			m_fProperties.setDbFieldGroupValue(sField);
            m_fProperties.setChartGroupFieldType(nFieldType);
            m_fProperties.setChartGroupIndex(nIndex);
        };

        const m_fSecProperties_ShowEditFormula = function(formula, cancel) {
            pShowEditFormula(formula, cancel);
        };

		const pShowEditFormula = function(formula, cancel) {
			cancel = false;
			try {

				let f: cReportFormulaType = null;
				let c: cReportControl = null;

				if (m_fFormula === null) { 
					m_fFormula = globalObject.CSReportEditor.createFFormula();
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

				m_fFormula.expandTree();

				m_fFormula.center();

				//
				// TODO: end functionality to move 

				m_fFormula.Show();

				cancel = !m_fFormula.getOk();

				if (!cancel) {
					formula = m_fFormula.getFormula();
				}

			} catch (Exception ex) {
				cError.mngError(ex, "m_fProperties_ShowEditFormula", C_MODULE, "");
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
                let secLn: cReportSectionLine = null;
                let sec: cReportSection = null;

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

        const m_picReport_KeyDown = function(keyCode, shift) {
			let aspect: cReportAspect = null;
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

                let x: number = 0;
                let y: number = 0;

				if (m_vSelectedKeys.Length < 1) { return; }

                if (!m_keyboardMove) {
                    aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
					y = aspect.getTop();
					x = aspect.getLeft();
                } 
                else {
                    y = m_y;
                    x = m_x;
                }

                // resize
                //
				if (Control.ModifierKeys === Keys.Shift) {

                    if (m_keySizing === "") {
                        m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey();
                    }

                    if (!m_keyboardMove) {

                        aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
						y = y + aspect.getHeight();
						x = x + aspect.getWidth();

                        pSetMovingFromKeyboard(x, y);

                        if (m_keySizing === "") {
                            m_keySizing = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey();
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
                        m_keyMoving = m_paint.getPaintObject(m_vSelectedKeys[1]).getKey();
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

                m_picReport_MouseMove(MouseButtons.Left, 0, x, y);
                m_x = x;
                m_y = y;

                m_keyboardMove = true;

            } catch (Exception ex) {
                cError.mngError(ex, "m_picReport_KeyDown", C_MODULE, "");
            }
        };

        const pSetMovingFromKeyboard = function(x, y) {

            m_keyMoving = m_keyFocus;

            let po: CSReportPaint.cReportPaintObject = m_paint.getPaintObject(m_keyMoving);

			switch (po.getTag()) {
                case cGlobals.C_KEY_DETAIL:
                case cGlobals.C_KEY_FOOTER:
                case cGlobals.C_KEY_HEADER:
                    m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
					m_picReport.Cursor = Cursors.SizeNS;
                    break;
				default:
					if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL 
						|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER 
						|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER 
						|| po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER 
						|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) {

						m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    } 
					else if (po.getRptType() === csRptTypeSection.C_KEY_SECLN_HEADER 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_DETAIL 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_FOOTER 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPH 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPF) {

					    m_picReport.Cursor = Cursors.SizeNS;
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    } 
                    else {
                        m_moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
						m_picReport.Cursor = Cursors.SizeNS;
                    }
                    break;
            }

            let aspect: cReportAspect = m_paint.getPaintObject(m_keyMoving).getAspect();
			m_offX = x - aspect.getLeft();
			m_offY = y - (aspect.getTop() - aspect.getOffset());

            m_keyObj = m_keyMoving;

			cGlobals.setEditAlignTextState(m_vSelectedKeys.Length);
			cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1);
            pSetEditAlignValue();
            pSetFontBoldValue();

        };

        const m_picReport_KeyUp = function(keyCode, ctrlKey) {
            if (m_keyboardMove) {
                m_keyboardMove = false;
                m_picReport_MouseUp(MouseButtons.Left, 0, m_x, m_y);
            }
        };

		const m_picReport_MouseDown = function(button, ctrlKey, x, y) {
            try {

                let sKey: string = "";
                let bClearSelected: boolean = false;
                let lastKeyMoving: string = "";
                let lastKeyObj: string = "";

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

                            let po: CSReportPaint.cReportPaintObject = m_paint.getPaintObject(sKey);
                            lastKeyMoving = m_keyMoving;
                            m_keyMoving = sKey;

							switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:

                                    // only if no controls are selected
                                    //
                                    if (ctrlKey) {

										if (m_vSelectedKeys.Length > 0)  {
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
								if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL 
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER 
									|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER 
									|| po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER 
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) {

											if (m_vSelectedKeys.Length > 0)  {
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
									else if (po.getRptType() === csRptTypeSection.C_KEY_SECLN_HEADER 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_DETAIL 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_FOOTER 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPH 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPF) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) {
											if (m_vSelectedKeys.Length > 0)  {
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

                    let bWasRemoved: boolean = false;
					pAddToSelected(m_keyMoving, ctrlKey, bWasRemoved);

                    if (bWasRemoved) { sKey = ""; }

                    if (sKey !== "") {
                        let aspect: cReportAspect = m_paint.getPaintObject(sKey).getAspect();
						m_offX = x - aspect.getLeft();
						m_offY = y - (aspect.getTop() - aspect.getOffset());
                    }

                    m_keyFocus = sKey;
                    m_keyObj = sKey;
					m_paint.setFocus(m_keyFocus, m_graphic, bClearSelected);

                } 
                else if (button === MouseButtons.Right) {

                    m_keySizing = "";
                    m_keyMoving = "";
                    m_keyObj = "";

					if (m_paint.pointIsInObject(x, y, sKey)) {
                        m_keyObj = sKey;

                        bClearSelected = pSetSelectForRightBttn();

                        m_keyFocus = sKey;
						m_paint.setFocus(m_keyFocus, m_graphic, bClearSelected);

                        let po: CSReportPaint.cReportPaintObject = m_paint.getPaintObject(sKey);

                        if (m_paint.paintObjIsSection(sKey)) {

                            let noDelete: boolean = false;

                            switch (po.getTag()) {
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

                            let isGroup: boolean = false;
                            let isSecLn: boolean = false;

                            pGetSection(isGroup, isSecLn);

                            if (isSecLn) { noDelete = true; }

                            showPopMenuSection(noDelete, isGroup);
                        } 
                        else {
                            showPopMenuControl(true);
                        }
                    }
                    else {
                        showPopMenuControl(false);
                    }
                }

				cGlobals.setEditAlignTextState(m_vSelectedKeys.Length);
				cGlobals.setEditAlignCtlState(m_vSelectedKeys.Length > 1);
                pSetEditAlignValue();
                pSetFontBoldValue();

            } catch (Exception ex) {
                cError.mngError(ex, "m_picReport_MouseDown", C_MODULE, "");
                m_inMouseDown = false;
            }
        };

        self.setFontBold = function() {
            let bBold: number = 0;
            let bBoldValue: boolean = false;
            let i: number = 0;

            bBold = -2;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                let font: cReportFont = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

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

            let paintObject: CSReportPaint.cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {

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
            let bBold: number = 0;
            let i: number = 0;

            bBold = -2;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                let font: cReportFont = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect().getFont();

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
            let i: number = 0;
            let paintObject: CSReportPaint.cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

			let top: number = 0;
			let left: number = 0;

			let newTop: number = 0;
			let newLeft: number = 0;
			let height: number = 0;
			let width: number = 0;
UNKNOWN >> 			cReportAspect aspect;

            switch (align) {

				case csECtlAlignConst.csECtlAlignHeight:
				case csECtlAlignConst.csECtlAlignWidth:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
				    height = aspect.getHeight();
                    width = aspect.getWidth();
                    break;

				case csECtlAlignConst.csECtlAlignVertical:
				case csECtlAlignConst.csECtlAlignHorizontal:

                    aspect = m_paint.getPaintObject(m_vSelectedKeys[1]).getAspect();
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

                    for (i = 1; i <= m_vSelectedKeys.Length; i++) {

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

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {

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
            let i: number = 0;
            let paintObject: CSReportPaint.cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {

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
            let align: number = -1;
            let i: number = 0;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                let aspect: CSReportDll.cReportAspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();

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
            let i: number = 0;
            if (sKey === "") { return; }

            bWasRemoved = false;

            if (ctrlKey) {

                for (i = 1; i <= m_vSelectedKeys.Length; i++) {

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
            let i: number = 0;

            if (sKey === "") {
                return true;
            }

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) {
                    return true;
                }
            }
            return false;
        };

        const pRemoveFromSelected = function(sKey) {
            let i: number = 0;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === sKey) {
                    break;
                }
            }

            if (i > m_vSelectedKeys.Length) { return; }
            for (i = i + 1; i <= m_vSelectedKeys.Length; i++) {
                m_vSelectedKeys[i - 1] = m_vSelectedKeys[i];
            }
            if (m_vSelectedKeys.Length > 0) {
				G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length - 1);
            } 
            else {
				G.redim(m_vSelectedKeys, 0);
            }

			m_paint.removeFromSelected(sKey, m_graphic);
        };

        const pClearSelected = function(button, ctrlKey, x, y) {
            let sKey: string = "";
            let i: number = 0;

            if (!ctrlKey && button !== MouseButtons.Right) {
				m_paint.pointIsInObject(x, y, sKey);
                for (i = 1; i <= m_vSelectedKeys.Length; i++) {
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
            let i: number = 0;
			let offsetTop: number = 0;
			let offsetLeft: number = 0;
			let firstLeft: number = 0;
			let firstTop: number = 0;
            let clear: boolean = false;
			let offSet2: number = 0;

            if (m_vSelectedKeys.Length === 0) { return; }

            let aspect: cReportAspect = m_paint.getPaintObject(m_keyMoving).getAspect();
			firstLeft = aspect.getLeft();
			firstTop = aspect.getTop();

            clear = true;

            for (i = m_vSelectedKeys.Length; i <= 1; i--) {

                aspect = m_paint.getPaintObject(m_vSelectedKeys[i]).getAspect();
                offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft());
                offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop());
				offSet2 = aspect.getOffset();

                if (m_bMoveHorizontal) {
                    m_paint.moveObjToXYEx(m_keyMoving, 
                                            x - m_offX + offsetLeft, 
                                            firstTop - offSet2 + offsetTop, 
											m_graphic, 
                                            clear);
                } 
                else if (m_bMoveVertical) {
                    m_paint.moveObjToXYEx(m_keyMoving, 
                                            firstLeft + offsetLeft, 
                                            y - m_offY + offsetTop, 
											m_graphic, 
                                            clear);
                } 
                else {
                    m_paint.moveObjToXYEx(m_keyMoving, 
                                            x - m_offX + offsetLeft, 
                                            y - m_offY + offsetTop, 
						                    m_graphic, 
                                            clear);
                }

                if (clear) { clear = false; }
            }
        };

        const m_picReport_MouseMove = function(
            button, 
            shift, 
            x, 
            y) {
            let sKey: string = "";
			let rgnTp: csRptPaintRegionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;

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
							m_paint.moveHorizontal(m_keyMoving, x, m_graphic);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
							m_paint.moveVertical(m_keyMoving, y, m_graphic);
                            break;
                    }

                    m_moving = true;

                } 
                else if (m_keySizing !== "") {
                    switch (m_moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVDOWN:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFT:
                            m_paint.resize(m_graphic, m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVUP:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                            m_paint.resize(m_graphic, m_keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                            m_paint.resize(m_graphic, m_keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                            m_paint.resize(m_graphic, m_keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE);
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
                        let po: CSReportPaint.cReportPaintObject = m_paint.getPaintObject(sKey);

                        let ctrl: cReportControl = m_report.getControls().item(po.getTag());
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

								if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL 
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER 
									|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER 
                                        || po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER 
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) {

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
                    let po: CSReportPaint.cReportPaintObject = m_paint.getPaintObject(sKey);
                    if (po.getRptType() === csRptTypeSection.CONTROL) {
                        let rptCtrl: cReportControl = null;
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

            let msg: string = "";
            let strCtlType: string = "";

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
					+ "]F.Hide:[" + formulaHide.Substring(1, 100) 
                    + "]Activa[" + ( hasFormulaHide).ToString() 
					+ "]F.Value:[" + formulaValue.Substring(1, 100) 
                    + "]Activa[" + ( hasFormulaValue).ToString() 
                    + "]Field:[" + fieldName + "]";
            }
            m_fmain.setsbPnlCtrl(msg);
        };

        const m_picReport_MouseUp = function(button, shift, x, y) {
            // to avoid reentrancy
            if (m_opening) { return; }

            //----------------------------------------------------
            // MOVING
            //----------------------------------------------------
            let sKeySection: string = "";

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
                    pSizingControl(x, y);
                }

                refreshBody();
                m_moving = false;
                refreshRule();
            }

            m_keySizing = "";
            m_keyMoving = "";
        };

        const m_picReport_Paint = function() {
			m_paint.paintPicture(m_graphic);
        };

        const m_picRule_Paint = function() {
            let i: number = 0;

            let ps: CSReportPaint.cReportPaintObjects = m_paint.getPaintSections();
            for (i = 1; i <= ps.count(); i++) {
				m_paint.drawRule(ps.getNextKeyForZOrder(i), m_graphic);
            }
        };

        self.setParameters = function() {
            let connect: CSConnect.cConnect = new CSConnect.cConnect();
            let param: cParameter = null;

			for(var _i = 0; _i < m_report.getConnect().getParameters().count(); _i++) {
				param = m_report.getConnect().getParameters().item(_i);
				let connectParam: CSConnect.cParameter = connect.getParameters().add();
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
				m_report.getConnect().getDataSourceType()))  {
            	return;

			cGlobals.setParametersAux(connect, m_report.getConnect());
        };

        self.setSimpleConnection = function() {
            let f: fSimpleConnect = new fSimpleConnect();
            try {

                let strConnect: string = "";
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

                let connect: CSConnect.cConnect = new CSConnect.cConnect();

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

                if (cGlobals.getToolBox(this) !== null) { showToolBox(); }

                return true;

            } catch (Exception ex) {
                cError.mngError(ex, "configConnection", C_MODULE, "");
                return false;
            }
        };

        self.setAllConnectToMainConnect = function() {
            try {

                let connect: cReportConnect = null;
				for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
					connect = m_report.getConnectsAux().item(_i);
                    connect.setStrConnect(m_report.getConnect().getStrConnect());
                }

            } catch (Exception ex) {
                cError.mngError(ex, "setAllConnectToMainConnect", C_MODULE, "");
            }
        };

        self.deleteObj = function(bDelSectionLine) {
            let i: number = 0;
            let sec: cReportSection = null;
            let secs: cReportSections = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;

            let isGroupFooter: boolean = false;
            let isGroupHeader: boolean = false;
            let isSecLn: boolean = false;

            if (m_keyFocus === "") { return; }

            let group: cReportGroup = null;
            let secG: cReportSection = null;
            if (m_paint.paintObjIsSection(m_keyFocus)) {
                if (m_paint.getPaintSections().item(m_keyFocus) === null) { return; }

                let po: CSReportPaint.cReportPaintObject = m_paint.getPaintSections().item(m_keyFocus);

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

                let what: string = "";

                if (isSecLn) {
                    what = "the section line";
                } 
                else {
                    what = "the section";
                }

                if (!cWindow.ask("Are yuo sure you want to delete " 
                            + what + " and all the controls it contains? ", VbMsgBoxResult.vbNo)) {
                    return;
                }

                if (isSecLn) {

					for(var _i = 0; _i < secLn.getControls().count(); _i++) {
						ctrl = secLn.getControls().item(_i);
                        for (i = 1; i <= m_paint.getPaintObjects().count(); i++) {
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
                            for (i = 1; i <= m_paint.getPaintObjects().count(); i++) {
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
                                for (i = 1; i <= m_paint.getPaintObjects().count(); i++) {
                                    paintObj = m_paint.getPaintObjects().item(i);
                                    if (paintObj.getTag() === ctrl.getKey()) {
                                        m_paint.getPaintObjects().remove(paintObj.getKey());
                                        break;
                                    }
                                }
                            }
                        }

                        for (i = 1; i <= m_paint.getPaintSections().count(); i++) {
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

                let bDeletePaintObj: boolean = false;

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
					let secLns: cReportSectionLines = sec.getSectionLines();
					m_paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint());
					secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint());
                }

                pResetKeysFocus();
				G.redim(m_vSelectedKeys, 0);
            } 
            else {
                paintObj = m_paint.getPaintObjects().item(m_keyFocus);
                if (paintObj === null) { return; }

                if (!cWindow.ask("Confirm you want to delete the control? ", VbMsgBoxResult.vbNo)) { return; }

                for (i = 1; i <= m_vSelectedKeys.Length; i++) {
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

        const pCanDeleteSection = function(
            secs, 
            sec, 
            tag) {
            let secAux: cReportSection = null;

            // header
            //
            secAux = m_report.getHeaders().item(tag);
            secs = null;

            if (secAux !== null) {
                if (secAux.Equals(sec) || sec === null) {
                    if (secAux.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONHEADER) {
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
                        if (secAux.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER) {
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
            let sField: string = "";
            let nIndex: number = 0;
            let nFieldType: number = 0;

			if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
				return;

            beginDraging();
            m_controlName = "";
            m_controlType = csRptEditCtrlType.CSRPTEDITFIELD;
            m_fieldName = sField;
            m_formulaText = "";
            m_fieldIndex = nIndex;
            m_fieldType = nFieldType;
        };

        self.addLabel = function() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITLABEL);
        };

        self.addImage = function() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITIMAGE);
        };

        self.addChart = function() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITCHART);
        };

        self.pAddLabelAux = function(ctlType) {
            beginDraging();
            m_controlName = "";
            m_controlType = ctlType;
            m_fieldName = "";
            m_formulaText = "";
            m_fieldIndex = 0;
            m_fieldType = 0;
        };

		const addControlEnd = function(left, top) {
            let ctrl: cReportControl = null;

            m_draging = false;

            if (m_controlType === csRptEditCtrlType.CSRPTEDITNONE) {
                return true;
            }

            m_dataHasChanged = true;

            let i: number = 0;
			let originalLeft: number = 0;
			let originalTop: number = 0;
            let copyCtrl: cReportControl = null;
            let movedCtrl: cReportControl = null;
			let firstCtrlLeft: number = 0;
			let offSet: number = 0;

            if (m_copyControls) {

                if (m_vCopyKeys.Length === 0) { return false; }

                originalLeft = left;
                originalTop = top;

                let keyPaint: string = m_vCopyKeys[m_vCopyKeys.Length - 1];
				let keyCtrl: string = m_paint.getPaintObjects().item(keyPaint).getTag();
				movedCtrl = m_report.getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for (i = m_vCopyKeys.Length; i <= 1; i--) {

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

                    if (left - 400 > m_picReport.Width) {
                        left = originalLeft + (offSet % originalLeft);
                        top += 100;
                    }

                    if (top > m_picReport.Height) {
                        top = m_picReport.Height - 100;
                    }

                    pAddControlEndAux(left, top, copyCtrl);

                }
                m_copyControls = false;

            } 
            else if (m_copyControlsFromOtherReport) {

                if (m_fmain.getReportCopySource() === null) { return false; }

                originalLeft = left;
                originalTop = top;

                let editor: cEditor = m_fmain.getReportCopySource();
                let keyPaint: string = editor.getVCopyKeys(editor.getVCopyKeysCount());
				let keyCtrl: string = editor.getPaint().getPaintObjects().item(keyPaint).getTag();
				movedCtrl = editor.getReport().getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for (i = editor.getVCopyKeysCount(); i <= 1; i--) {

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
            let ctrl: cReportControl = null;

            // first we add a control in the main header
            // after the user complete the add operation
            // we would move the control to the desired
            // section line
            //
			ctrl = m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(1).getControls().add();

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

            let fromSerie: cReportChartSerie = null;

			for(var _i = 0; _i < fromChart.getSeries().count(); _i++) {
                fromSerie = fromChart.getSeries().item(_i);
                let serie: cReportChartSerie = toChart.getSeries().add();
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

            let field: cReportField = toCtrl.getField();
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

            let label: cReportLabel = toCtrl.getLabel();
            pCopyAspect(fromCtrl.getLabel().getAspect(), label.getAspect());
            label.setCanGrow(fromCtrl.getLabel().getCanGrow());
            label.setText(fromCtrl.getLabel().getText());

            pCopyAspect(fromCtrl.getLine().getAspect(), toCtrl.getLine().getAspect());
            pCopyChart(fromCtrl.getChart(), toCtrl.getChart());
        };

        const pSetNewControlProperties = function(ctrl) {
			let aspect: cReportAspect = null;

            ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left);

            switch (m_controlType) {
                case csRptEditCtrlType.CSRPTEDITFIELD:
                    ctrl.setControlType(csRptControlType.CSRPTCTFIELD);
                    ctrl.getLabel().setText(m_fieldName);
                    let field: cReportField = ctrl.getField();
                    field.setIndex(m_fieldIndex);
                    field.setName(m_fieldName);
                    field.setFieldType(m_fieldType);

                    if (cGlobals.isNumberField(m_fieldType)) {
                        aspect = ctrl.getLabel().getAspect();
					    aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                        aspect.setFormat("#0.00;-#0.00");
                    }
                    break;

                case csRptEditCtrlType.CSRPTEDITFORMULA:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getFormulaValue().setText(m_formulaText + "(" + m_controlName + ")");
                    ctrl.setHasFormulaValue(true);
                    ctrl.getLabel().getAspect().setFormat("0.00;-0.00");
                    ctrl.getLabel().getAspect().getFont().setBold(true);
                    ctrl.getLabel().setText(ctrl.getFormulaValue().getText());
                    ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Right);
                    break;

                case csRptEditCtrlType.CSRPTEDITLABEL:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getLabel().setText(m_fieldName);
                    ctrl.getLabel().getAspect().getFont().setBold(true);

                    break;
                case csRptEditCtrlType.CSRPTEDITIMAGE:
                    ctrl.setControlType(csRptControlType.CSRPTCTIMAGE);
                    ctrl.getLabel().setText(m_fieldName);

                    break;
                case csRptEditCtrlType.CSRPTEDITCHART:
                    ctrl.setControlType(csRptControlType.CSRPTCTCHART);
                    ctrl.getLabel().setText(m_fieldName);
                    break;
            }

            self.ctrl_height: number = 285;
            self.ctrl_width: number = 2000;

			aspect = ctrl.getLabel().getAspect();
            aspect.setWidth(ctrl_width);
            aspect.setHeight(ctrl_height);
            aspect.setTransparent(true);
        };

		const pSetNewControlPosition = function(ctrl, left, top) {
            let aspect: cReportAspect = ctrl.getLabel().getAspect();
            aspect.setLeft(left);
            aspect.setTop(top);

            let paintObj: cReportPaintObject = null;
			let paintType: csRptPaintObjType = csRptPaintObjType.CSRPTPAINTOBJBOX;

            if (ctrl.getControlType() === csRptControlType.CSRPTCTIMAGE 
                || ctrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE;
            }

            paintObj = m_paint.getNewObject(paintType);

            aspect = ctrl.getLabel().getAspect();

			pCopyAspectToPaint(aspect, paintObj.getAspect());

            aspect.setLeft(left);
            aspect.setTop(top);

            paintObj.setText(ctrl.getLabel().getText());

            paintObj.setRptType(csRptTypeSection.CONTROL);

            paintObj.setTag(ctrl.getKey());
            ctrl.setKeyPaint(paintObj.getKey());

            // position the control in the desired section line
            //
            moveControl(paintObj.getKey());

			m_paint.drawObject(paintObj.getKey(), m_graphic);
        };

        self.addGroup = function() {
			cGlobals.showGroupProperties(null, this);
            refreshAll();
        };

        const pGetGroup = function(key) {
            let group: cReportGroup = null;

			for(var _i = 0; _i < m_report.getGroups().count(); _i++) {
				group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === key) { break; }
                if (group.getFooter().getKey() === key) { break; }
            }

            return group;
        };


        //public void addSectionLine() { }

        self.addSectionLine = function() {
            let sec: cReportSection = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;
			let aspect: cReportAspect = null;
            let isGroup: boolean = false;

			sec = pGetSection(isGroup);

            if (sec === null) { return; }

            switch (sec.getTypeSection()) {

                // in footers we add from top
                // it means that the first section line is the last one
                //
                case csRptTypeSection.CSRPTTPSCFOOTER:
                case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:

                    aspect = sec.getSectionLines().add(null, "", 1).getAspect();
                    aspect.setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    aspect.setWidth(sec.getAspect().getWidth());

                    // for new sections the top is the top of the previous section
                    // plus cGlobals.C_HEIGHT_NEW_SECTION
                    //
				    aspect.setTop(sec.getSectionLines().item(1).getAspect().getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
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

            pAddSectionLinesAux(sec, paintObj);

            // we reset this variable to zero
            //
            m_newSecLineOffSet = 0;
        };

        const pAddSectionLinesAux = function(
            sec, 
            paintObj) {
			let typeSecLn: csRptTypeSection = csRptTypeSection.CONTROL;
			let aspect: cReportAspect = null;
            let maxBottom: number = 0;
            let minBottom: number = 0;
            let index: number = 0;
			let y: number = 0;

            switch (sec.getTypeSection()) {
                case csRptTypeSection.CSRPTTPSCHEADER:
                case csRptTypeSection.CSRPTTPMAINSECTIONHEADER:

                    pMoveHeader(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_HEADER;
                    index = sec.getSectionLines().count() - 1;
                    break;

                case csRptTypeSection.CSRPTTPSCDETAIL:
                case csRptTypeSection.CSRPTTPMAINSECTIONDETAIL:

                    pMoveDetails(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_DETAIL;
                    index = sec.getSectionLines().count() - 1;
                    break;

                case csRptTypeSection.CSRPTTPGROUPHEADER:

                    pMoveGroupHeader(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_GROUPH;
                    index = sec.getSectionLines().count() - 1;
                    break;

                case csRptTypeSection.CSRPTTPGROUPFOOTER:

                    pMoveGroupFooter(sec.getKey(), minBottom, maxBottom, false);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_GROUPF;
                    index = sec.getSectionLines().count() - 1;
                    break;

                case csRptTypeSection.CSRPTTPSCFOOTER:
                case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:

                    aspect = sec.getAspect();
                    aspect.setTop(aspect.getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
                    pMoveFooter(sec.getKey(), minBottom, maxBottom, false);
                    m_offY = 0;
                    y = aspect.getHeight() + aspect.getTop() - m_offSet - cGlobals.C_HEIGHT_BAR_SECTION;
                    typeSecLn = csRptTypeSection.C_KEY_SECLN_FOOTER;
                    index = 1;
                    break;
            }
			// we add a paint object to all sectionlines except the last one 
            // the last sectionline uses the paint object of the section
            //
			let secL: cReportSectionLine = sec.getSectionLines().item(index);
			secL.setKeyPaint(
				paintSection(secL.getAspect(), 
								secL.getKey(), 
                                sec.getTypeSection(), 
								C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString(), 
								true));

			// section line
            let po: CSReportPaint.cReportPaintObject = m_paint.getPaintSections().item(secL.getKeyPaint());
			po.setRptType(typeSecLn);
			po.setRptKeySec(sec.getKey());

			// section
            po = m_paint.getPaintSections().item(sec.getKeyPaint());
			po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString());

            moveSection(paintObj, 0, y, minBottom, maxBottom, sec, false);

            refreshBody();
            refreshRule();
        };

        self.addSection = function(typeSection) {

			if (!m_editor.Visible) {
				return;

            let rptSection: cReportSection = null;
            let topSec: cReportSection = null;
			let w_aspect: cReportAspect = null;
			let aspect: cReportAspect = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;

            let maxBottom: number = 0;
            let minBottom: number = 0;
            let y: number = 0;

            switch (typeSection) {
                case csRptTypeSection.CSRPTTPSCHEADER:
                    let w_headers: cReportSections = m_report.getHeaders();
				    rptSection = w_headers.add();
                    rptSection.setName("H_" + rptSection.getIndex().ToString());
				    aspect = w_headers.item(w_headers.count() - 2).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), 
                                                        rptSection.getKey(), 
                                                        csRptTypeSection.CSRPTTPSCHEADER, 
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

                case csRptTypeSection.CSRPTTPSCDETAIL:
                    break;

                case csRptTypeSection.CSRPTTPGROUPHEADER:

                    let w_groupsHeaders: cIReportGroupSections = m_report.getGroupsHeaders();
				    rptSection = w_groupsHeaders.item(w_groupsHeaders.count());
                    rptSection.setName("GH_" + rptSection.getIndex().ToString());

                    // the first group is next to the last header
                    //
					if (w_groupsHeaders.count() === 1) {
                        topSec = m_report.getHeaders().item(m_report.getHeaders().count());
                    } 
                    else {
						topSec = w_groupsHeaders.item(w_groupsHeaders.count() - 1);
                    }

				    w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), 
                                                        rptSection.getKey(), 
                                                        csRptTypeSection.GROUP_SECTION_HEADER, 
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

                case csRptTypeSection.CSRPTTPGROUPFOOTER:

                    let w_groupsFooters: cIReportGroupSections = m_report.getGroupsFooters();
                    rptSection = w_groupsFooters.item(1);
                    rptSection.setName("GF_" + rptSection.getIndex().ToString());

                    // all group footers are added to the top so at the
                    // beginning they are next to the detail section
                    //

                    topSec = m_report.getDetails().item(m_report.getDetails().count());

					w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), 
                                                        rptSection.getKey(), 
                                                        csRptTypeSection.GROUP_SECTION_FOOTER, 
                                                        rptSection.getName(), 
                                                        false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveGroupFooter(rptSection.getKey(), minBottom, maxBottom, false);

                    m_offY = 0;

					w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break;

                case csRptTypeSection.CSRPTTPSCFOOTER:
                    let w_footers: cReportSections = m_report.getFooters();

                    // all footers are added to the beginning of the collection
                    // 
                    rptSection = w_footers.add(null, "" , 1);
                    rptSection.setName("F_" + rptSection.getIndex().ToString());

                    aspect = w_footers.item(2).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(aspect.getTop());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), 
                                                        rptSection.getKey(), 
                                                        csRptTypeSection.CSRPTTPSCFOOTER, 
                                                        rptSection.getName(), 
                                                        false));

                    paintObj = m_paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveFooter(rptSection.getKey(), minBottom, maxBottom, false);

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
            let mouse: cMouseWait = new cMouseWait();
            try {
                setZOrder();
                showProgressDlg();

                m_report.getLaunchInfo().getPrinter().setPaperInfo(m_report.getPaperInfo());
                m_report.getLaunchInfo().setObjPaint(new CSReportPaint.cReportPrint());
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
            let mouse: cMouseWait = new cMouseWait();
            try {
                let isNew: boolean = false;

                isNew = m_report.getName() === "";

                if (isNew) {
					m_report.setName(m_name);
                }

                if (saveAs) {
                    isNew = true;
                }

                setZOrder();

                pValidateSectionAspect();

                if (!m_report.save(m_fmain.saveFileDialog, isNew)) {
                reLoadReport();
                return true;

            } catch (Exception ex) {
                cError.mngError(ex, "saveDocument", C_MODULE, "");
                return false;
            }
UNKNOWN >>             finally {
                mouse.Dispose();
            }
        };

        const setZOrder = function() {
            let ctrl: cReportControl = null;
            for(var _i = 0; _i < m_report.getControls().count(); _i++) {
                ctrl = m_report.getControls().item(_i);
                ctrl.getLabel().getAspect().setNZOrder(m_paint.getPaintObjects().getZOrderForKey(ctrl.getKeyPaint()));
            }
        };

        self.newReport = function(report) {

            if (report !== null) {

                m_report = report;
                reLoadReport();
                pValidateSectionAspect();
                reLoadReport();

            } 
            else {

				m_paint.createPicture(m_graphic);
                refreshRule();

            }

			Application.DoEvents();

			cGlobals.setDocActive(this);
        };

        self.openDocument = function() {
            return openDocument("");
        };

        self.openDocument = function(fileName) {
            let mouse: cMouseWait = new cMouseWait();
            try {

                // to avoid reentrancy
                m_opening = true;

                if (fileName === "") {

                    pSetInitDir();

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
                    if (!m_report.load(m_fmain.openFileDialog)) {

                        if (m_report.getName() === "")   {
                            return false;

                        // here the original function has a goto
                        // 'goto done'
                    }

                } 
                else {

                    if (!m_report.loadSilent(fileName)) {
                        return false;
                    }
                }

                reLoadReport();

                // here the original function has a 'done' label
                // 
                /*
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

                Application.DoEvents();

				cGlobals.setDocActive(this);

                m_opening = false;

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
						if (!saveDocument(false))  {
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

			let rslt: DialogResult = MessageBox.Show(;
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

        const m_fProperties_ShowHelpDbField = function(cancel) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

            sField = m_fProperties.txDbField.Text;
            nFieldType = m_fProperties.getFieldType();
            nIndex = m_fProperties.getIndex();

            cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; }

            m_fProperties.txDbField.Text = sField;
            m_fProperties.setFieldType(nFieldType);
            m_fProperties.setIndex(nIndex);
            m_fProperties.txText.Text = sField;
        };

        self.showGroupProperties = function() {
            let sec: cReportSection = null;
            let group: cReportGroup = null;
            let isGroup: boolean = false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            if (!isGroup) { return; }

            for(var _i = 0; _i < m_report.getGroups().count(); _i++) {
                group = m_report.getGroups().item(_i);
                if (group.getHeader().getKey() === sec.getKey()) { break; }
                if (group.getFooter().getKey() === sec.getKey()) { break; }
            }

            cGlobals.showGroupProperties(group, this);

            refreshAll();
        };

        self.moveGroup = function() {
            let sec: cReportSection = null;
            let group: cReportGroup = null;
            let isGroup: boolean = false;

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
            let sec: cReportSection = null;
            let isGroup: boolean = false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            pShowSecProperties(sec);

            refreshAll();
        };

        self.showSecLnProperties = function() {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let isSecLn: boolean = false;

            sec = pGetSection(isSecLn, secLn, true);

            if (sec === null) { return; }
            if (secLn === null) { return; }
            if (!isSecLn) { return; }

            pShowSecProperties(secLn, sec.getName() + ": renglón " + secLn.getIndex().ToString());

            refreshAll();
        };

        const pShowSecProperties = function(sec) {
            pShowSecProperties(sec, "");
        };

        const pShowSecProperties = function(sec, secLnName) {
            try {

                m_showingProperties = true;

                if (m_fSecProperties === null) { 
                    m_fSecProperties = globalObject.CSReportEditor.createFSecProperties();
                    // TODO: set event handler for ShowEditFormula, UnloadForm
                }

                m_fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide();
                m_fSecProperties.setFormulaHide(sec.getFormulaHide().getText());

                if (sec is cReportSection) { 
                    m_fSecProperties.txName.Text = sec.getName();
                }

                if (sec is cReportSectionLine) {
                    m_fSecProperties.lbControl.Text = secLnName;
                    m_fSecProperties.lbSecLn.Text = "Line properties:";
                } 
                else {
                    m_fSecProperties.lbControl.Text = sec.getName();
                }

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

            let sec: cReportSection = null;

            isGroup = false;
            isSecLn = false;
            secLn = null;
            isGroupFooter = false;
            isGroupHeader = false;

			if (m_keyFocus === "") { return null; }

            // get the section and show his properties
            //
			if (!m_paint.paintObjIsSection(m_keyFocus)) { return null; }

			let paintObj: CSReportPaint.cReportPaintObject = m_paint.getPaintSections().item(m_keyFocus);

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

                                // it's a line
                            } 
                            else {
                                isSecLn = true;
                                switch (paintObj.getRptType()) {
                                    case csRptTypeSection.C_KEY_SECLN_HEADER:
                                        sec = m_report.getHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_DETAIL:
                                        sec = m_report.getDetails().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_FOOTER:
                                        sec = m_report.getFooters().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_GROUPH:
                                        sec = m_report.getGroupsHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_GROUPF:
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
				secLn = sec.getSectionLines().item(sec.getSectionLines().count());
                isSecLn = true;
            }

            return sec;
        };

        self.showProperties = function() {
            if (m_keyFocus === "") { return; }

            let mouse: cMouseWait = new cMouseWait();

            if (m_paint.paintObjIsSection(m_keyFocus)) {
                showSectionProperties();
            } 
            else {
                m_keyObj = m_keyFocus;
                pShowCtrlProperties();
            }

            refreshAll();
        };

        const pShowCtrlProperties = function() {
            try {

                let paintObject: CSReportPaint.cReportPaintObject = null;
                let rptCtrl: cReportControl = null;
				let w_aspect: cReportAspect = null;
				let w_font: cReportFont = null;
                let image: cReportImage = null;
                let bMultiSelect: boolean = false;
                let sText: string = "";
                let i: number = 0;

                m_showingProperties = true;

                if (m_fProperties === null) { 
                    m_fProperties = globalObject.CSReportEditor.createFProperties();
                    // TODO: set event handler for 
                    // ShowEditFormula, ShowHelpChartField, ShowHelpChartGroupField, ShowHelpDbField
                    // UnloadForm
                }

                paintObject = m_paint.getPaintObject(m_keyObj);
                if (paintObject === null) { return; }

                m_fProperties.txText.Text = paintObject.getText();
                rptCtrl = m_report.getControls().item(paintObject.getTag());

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTIMAGE) {
                    m_fProperties.hideTabImage();
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
                        m_fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName();
                        m_fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName();

                        m_fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                        m_fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                        cUtil.listSetListIndexForId(m_fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(1).getColor());

                        if (rptCtrl.getChart().getSeries().count() > 1) {
                            m_fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(2).getLabelFieldName();
                            m_fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(2).getValueFieldName();

                            m_fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(2).getLabelIndex());
                            m_fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(2).getValueIndex());

                            cUtil.listSetListIndexForId(m_fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(2).getColor());
                        }
                    }
                }

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD 
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {
                    m_fProperties.txText.Enabled = false;
                    let w_field: cReportField = rptCtrl.getField();
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
                m_fProperties.chkTransparent.Checked = w_aspect.getTransparent();

                bMultiSelect = m_vSelectedKeys.Length > 1;

                m_fProperties.resetChangedFlags();

                m_fProperties.ShowDialog();

                if (!m_fProperties.getOk()) { return; }

                for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                    paintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    rptCtrl = m_report.getControls().item(paintObject.getTag());

                    if (!bMultiSelect) {
                        if (rptCtrl.getName() !== m_fProperties.txName.Text) {
                            if (rptCtrl.getName() !== "") {
                                if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", VbMsgBoxResult.vbYes)) {
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
                    if (m_fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(cReportGlobals.val(m_fProperties.txIdxGroup.Text)); }
                    if (m_fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(m_fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); }

                    if (m_fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(cReportGlobals.val(m_fProperties.txExportColIdx.Text)); }
                    if (m_fProperties.getIsFreeCtrlChanged()) { rptCtrl.setIsFreeCtrl(m_fProperties.chkIsFreeCtrl.Checked); }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {

                        let w_field: cReportField = rptCtrl.getField();
                        if (m_fProperties.getDbFieldChanged()) {
                            w_field.setFieldType(m_fProperties.getFieldType());
                            w_field.setIndex(m_fProperties.getIndex());
                            w_field.setName(m_fProperties.txDbField.Text);
                        }
                    }

                    if (m_fProperties.getPictureChanged()) {
                        image = rptCtrl.getImage();
                        let picImage: PictureBox = m_fProperties.picImage;
                        image.setImage(picImage.Image.Clone());
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
                            rptCtrl.getChart().setTop(cReportGlobals.val(m_fProperties.txChartTop.Text));
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
                            rptCtrl.getChart().getSeries().item(1).setLabelFieldName(m_fProperties.txDbFieldLbl1.Text);
                            rptCtrl.getChart().getSeries().item(1).setLabelIndex(m_fProperties.getChartIndex(0));
                        }
                        if (m_fProperties.getChartFieldVal1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setValueFieldName(m_fProperties.txDbFieldVal1.Text);
                            rptCtrl.getChart().getSeries().item(1).setValueIndex(m_fProperties.getChartIndex(1));
                        }

                        if (m_fProperties.getChartColorSerie1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setColor(cUtil.listID(m_fProperties.cbColorSerie1));
                        }

                        if (m_fProperties.getChartFieldLbl2Changed() || m_fProperties.getChartFieldVal2Changed()) {
                            if (rptCtrl.getChart().getSeries().count() < 2) { 
                                rptCtrl.getChart().getSeries().add(); 
                            }
                        }

                        if (m_fProperties.txDbFieldLbl2.Text === "" || m_fProperties.txDbFieldVal2.Text === "") {
                            if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(2); }
                        }

                        if (rptCtrl.getChart().getSeries().count() > 1) {

                            if (m_fProperties.getChartFieldLbl2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setLabelFieldName(m_fProperties.txDbFieldLbl2.Text);
                                rptCtrl.getChart().getSeries().item(2).setLabelIndex(m_fProperties.getChartIndex(2));
                            }
                            if (m_fProperties.getChartFieldVal2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setValueFieldName(m_fProperties.txDbFieldVal2.Text);
                                rptCtrl.getChart().getSeries().item(2).setValueIndex(m_fProperties.getChartIndex(3));
                            }

                            if (m_fProperties.getChartColorSerie2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setColor(cUtil.listID(m_fProperties.cbColorSerie2));
                            }
                        }
                    }

                    if (m_fProperties.getTextChanged()) { paintObject.setText(m_fProperties.txText.Text); }

                    w_aspect = rptCtrl.getLabel().getAspect();
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cReportGlobals.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cReportGlobals.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cReportGlobals.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cReportGlobals.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cReportGlobals.val(m_fProperties.txBackColor.Text)); }
                    if (m_fProperties.getTransparentChanged()) { w_aspect.setTransparent(m_fProperties.chkTransparent.Checked); }
                    if (m_fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(m_fProperties.cbAlign)); }
                    if (m_fProperties.getFormatChanged()) { w_aspect.setFormat(m_fProperties.txFormat.Text); }
                    if (m_fProperties.getSymbolChanged()) {
                        w_aspect.setSymbol(m_fProperties.txSymbol.Text);
                        w_aspect.setIsAccounting(m_fProperties.getIsAccounting());
                    }
                    if (m_fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(m_fProperties.chkWordWrap.Checked); }
                    if (m_fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(m_fProperties.chkCanGrow.Checked); }

                    if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cReportGlobals.val(m_fProperties.txBorderColor.Text)); }
                    if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cReportGlobals.val(m_fProperties.txBorder3D.Text)); }
                    if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cReportGlobals.val(m_fProperties.txBorderShadow.Text)); }
                    if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                    if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cReportGlobals.val(m_fProperties.txBorderWidth.Text)); }
                    if (m_fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(m_fProperties.cbBorderType)); }

                    w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cReportGlobals.val(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cReportGlobals.val(m_fProperties.txFontSize.Text)); }
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
                    if (m_fProperties.getLeftChanged()) { w_aspect.setLeft(cReportGlobals.val(m_fProperties.txLeft.Text)); }
                    if (m_fProperties.getTopChanged()) { w_aspect.setTop(cReportGlobals.val(m_fProperties.txTop.Text)); }
                    if (m_fProperties.getWidthChanged()) { w_aspect.setWidth(cReportGlobals.val(m_fProperties.txWidth.Text)); }
                    if (m_fProperties.getHeightChanged()) { w_aspect.setHeight(cReportGlobals.val(m_fProperties.txHeight.Text)); }
                    if (m_fProperties.getBackColorChanged()) { w_aspect.setBackColor(cReportGlobals.val(m_fProperties.txBackColor.Text)); }
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
                        if (m_fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cReportGlobals.val(m_fProperties.txBorderColor.Text)); }
                        if (m_fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cReportGlobals.val(m_fProperties.txBorder3D.Text)); }
                        if (m_fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cReportGlobals.val(m_fProperties.txBorderShadow.Text)); }
                        if (m_fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(m_fProperties.chkBorderRounded.Checked); }
                        if (m_fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cReportGlobals.val(m_fProperties.txBorderWidth.Text)); }
                    }

                    w_font = w_aspect.getFont();
                    if (m_fProperties.getFontChanged()) { w_font.setName(m_fProperties.txFont.Text); }
                    if (m_fProperties.getForeColorChanged()) { w_font.setForeColor(cReportGlobals.val(m_fProperties.txForeColor.Text)); }
                    if (m_fProperties.getFontSizeChanged()) { w_font.setSize(cReportGlobals.val(m_fProperties.txFontSize.Text)); }
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
            /* TODO: implement me
            m_picReport.SetFocus;
            m_draging = true;
            m_picReport.Cursor = Cursors.Custom;
            m_picReport.MouseIcon = LoadPicture(App.Path + "\\move32x32.cur");
             */ 
        };

        const endDraging = function() {
            m_draging = false;
            m_controlType = csRptEditCtrlType.CSRPTEDITNONE;
            m_picReport.Cursor = Cursors.Default;
        };

        self.showToolBox = function() {

            m_fToolBox = cGlobals.getToolBox(this);

            cGlobals.clearToolBox(this);

            pAddColumnsToToolbox(m_report.getConnect().getDataSource(), m_report.getConnect().getColumns());
            let connect: cReportConnect = null;

            for(var _i = 0; _i < m_report.getConnectsAux().count(); _i++) {
                let Connect: cReportConnect = m_report.getConnectsAux().item(_i);
                pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns());
            }

            for(var _i = 0; _i < m_report.getControls().count(); _i++) {
                let ctrl: cReportControl = m_report.getControls().item(_i);
                if (cGlobals.isNumberField(ctrl.getField().getFieldType())) {
                    m_fToolBox.addLbFormula(ctrl.getField().getName());

                    // TODO: refactor this to a better way to suggest the 
                    //       list of formulas applicable to the type of 
                    //       the database field
                    //
                    m_fToolBox.addFormula("Suma", ctrl.getName(), "_Sum");
                    m_fToolBox.addFormula("Máximo", ctrl.getName(), "_Max");
                    m_fToolBox.addFormula("Minimo", ctrl.getName(), "_Min");
                    m_fToolBox.addFormula("Promedio", ctrl.getName(), "_Average");
                }
            }
            m_fToolBox.Show(m_fmain);
        };

        self.pAddColumnsToToolbox = function(dataSource, columns) {
            for(var _i = 0; _i < columns.count(); _i++) {
                let col: cColumnInfo = columns.item(_i);
                m_fToolBox.addField(
                    cGlobals.getDataSourceStr(dataSource) + col.getName(), 
                    col.getTypeColumn(), 
                    col.getPosition());
                m_fToolBox.addLabels(col.getName());
            }
        };

        self.copy = function() {
            try {
                let i: number = 0;

                if (m_vSelectedKeys.Length === 0) { return; }

                G.redim(m_vCopyKeys, m_vSelectedKeys.Length);

                for (i = 1; i <= m_vSelectedKeys.Length; i++) {
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

                fFormula.addLabel();

            } catch (Exception ex) {
                cError.mngError(ex, "Paste", C_MODULE, "");
            }
        };

        self.editText = function() {
            try {

                self.c_margen: number = 20;

                let sText: string = "";
                let paintObjAspect: cReportAspect = null;
                let ctrl: cReportControl = null;

                if (m_keyObj === "") { return; }

                let w_getPaintObject: cReportPaintObject = m_paint.getPaintObject(m_keyObj);
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

            CSReportPaint.cReportPaintObject paintObjAspect = null;
            paintObjAspect = m_paint.getPaintObject(m_keyObj);
            if (paintObjAspect === null) { return; }

            String sKeyRpt = "";
            sKeyRpt = paintObjAspect.getTag();

            paintObjAspect.setText(TxEdit.Text);

            m_report.getControls().item(sKeyRpt).getLabel().setText(paintObjAspect.getText());
            refreshBody();
             */ 
        };

        const paintStandarSections = function() {
            let paintSec: cReportPaintObject = null;
            let w_headers: cReportSections = m_report.getHeaders();
            let w_item: cReportSection = w_headers.item(cGlobals.C_KEY_HEADER);

            w_item.setKeyPaint(paintSection(m_report.getHeaders().item(cGlobals.C_KEY_HEADER).getAspect(), 
                                            cGlobals.C_KEY_HEADER,
                                            csRptTypeSection.CSRPTTPMAINSECTIONHEADER, 
                                            "Header 1", false));

            paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight());

            pAddPaintSetcionForSecLn(w_headers.item(cGlobals.C_KEY_HEADER), 
                                                    csRptTypeSection.C_KEY_SECLN_HEADER);

            let w_details: cReportSections = m_report.getDetails();
            w_item = w_details.item(cGlobals.C_KEY_DETAIL);

            w_item.setKeyPaint(paintSection(m_report.getDetails().item(cGlobals.C_KEY_DETAIL).getAspect(), 
                                            cGlobals.C_KEY_DETAIL,
                                            csRptTypeSection.CSRPTTPMAINSECTIONDETAIL, 
                                            "Detail", false));

            paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight());

            pAddPaintSetcionForSecLn(w_details.item(cGlobals.C_KEY_DETAIL), 
                                        csRptTypeSection.C_KEY_SECLN_DETAIL);

            let w_footers: cReportSections = m_report.getFooters();
            w_item = w_footers.item(cGlobals.C_KEY_FOOTER);

            w_item.setKeyPaint(paintSection(m_report.getFooters().item(cGlobals.C_KEY_FOOTER).getAspect(), 
                                            cGlobals.C_KEY_FOOTER,
                                            csRptTypeSection.CSRPTTPMAINSECTIONFOOTER, 
                                            "Footer 1", false));

            paintSec = m_paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight());
            pAddPaintSetcionForSecLn(w_footers.item(cGlobals.C_KEY_FOOTER), csRptTypeSection.C_KEY_SECLN_FOOTER);
        };

        const paintSection = function(aspect, ) {
                                    String sKey, 
			                        csRptTypeSection rptType, 
                                    String text, 
                                    bool isSectionLine) 
        { 

            let paintObj: CSReportPaint.cReportPaintObject = null;
            paintObj = m_paint.getNewSection(CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX);

            let w_aspect: cReportAspect = paintObj.getAspect();

            // we only draw the bottom line of the sections
            //
            w_aspect.setLeft(0);
            w_aspect.setTop(aspect.getTop() + aspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
            w_aspect.setWidth(aspect.getWidth());
            w_aspect.setHeight(cGlobals.C_HEIGHT_BAR_SECTION);

            let innerColor: number = 0;
            innerColor = 0xAEAEAE;

            if (isSectionLine) {
                w_aspect.setBackColor(innerColor);
                w_aspect.setBorderColor(Color.Red.ToArgb());
            } 
            else {
                if (rptType === csRptTypeSection.GROUP_SECTION_FOOTER 
                    || rptType === csRptTypeSection.GROUP_SECTION_HEADER) {
                    w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0xC0C000);
                } 
                else {
                    w_aspect.setBackColor(innerColor);
                    w_aspect.setBorderColor(0x5A7FB);
                }
            }

            if (rptType === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER 
                || rptType === csRptTypeSection.CSRPTTPSCFOOTER) {
                w_aspect.setOffset(m_offSet);
            }

            paintObj.setIsSection(!isSectionLine);

            paintObj.setRptType(rptType);
            paintObj.setTag(sKey);

            paintObj.setText(text);

            return paintObj.getKey();
        };

        const getLineRegionForControl = function(sKeyPaintObj, ) {
                                                cReportSectionLine rptSecLine, 
                                                bool isFreeCtrl) 
        { 
            let rptSection: cReportSection = null;

            rptSecLine = null;

            if (!getRegionForControl(sKeyPaintObj, rptSection, isFreeCtrl)) { return false; }

            let w1: number = 0;
            let w2: number = 0;

            let y: number = 0;

            let rtnSecLine: cReportSectionLine = null;

            let w_aspect: cReportAspect = m_paint.getPaintObject(sKeyPaintObj).getAspect();
            if (isFreeCtrl) {
                y = w_aspect.getTop() + w_aspect.getOffset();
            } 
            else {
                y = w_aspect.getTop() + w_aspect.getHeight() / 2 + w_aspect.getOffset();
            }

            for(var _i = 0; _i < rptSection.getSectionLines().count(); _i++) {
                let rptSL: cReportSectionLine = rptSection.getSectionLines().item(_i);
                w_aspect = rptSL.getAspect();
                w1 = w_aspect.getTop();
                w2 = w_aspect.getTop() + w_aspect.getHeight();
                if (isFreeCtrl) {
                    if (w1 <= y) {
                        rtnSecLine = rptSL;
                    }
                } 
                else {
                    if (w1 <= y && w2 >= y) { return false; }
                }
            }

            if (rtnSecLine !== null) {
                rptSecLine = rtnSecLine;
                return true;
            }
            else {
                return false;
            }
        };

        const getRegionForControl = function(sKeyPaintObj, rptSection, isFreeCtrl) {
            let x: number = 0;
            let y: number = 0;

            let w_aspect: cReportAspect = m_paint.getPaintObject(sKeyPaintObj).getAspect();

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
            let y1: number = 0;
            let y2: number = 0;
            let rtnSec: cReportSection = null;

            rptSection = null;

            for(var _i = 0; _i < rptSections.count(); _i++) {

                let rptSec: cReportSection = rptSections.item(_i);
                let w_aspect: cReportAspect = rptSec.getAspect();

                y1 = w_aspect.getTop();
                y2 = w_aspect.getTop() + w_aspect.getHeight();

                if (isFreeCtrl) {
                    if (y1 <= y) {
                        rtnSec = rptSec;
                    }
                } 
                else {
                    if (y1 <= y && y2 >= y) { 
                        return true; 
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
            let newTopCtrl: number = 0;
            let offSet: number = 0;
            let bottom: number = 0;
            let secTop: number = 0;
            let secLnHeigt: number = 0;
            let offSecLn: number = 0;
UNKNOWN >>             cReportPaintObject paintSec;

            let secAspect: cReportAspect = rptSec.getAspect();
            secAspect.setTop(secAspect.getTop() + offSetTopSection);
            offSet = rptSec.getSectionLines().item(1).getAspect().getTop() - secAspect.getTop();
            secTop = secAspect.getTop();

            for(var _i = 0; _i < rptSec.getSectionLines().count(); _i++) {

                let rptSecLine: cReportSectionLine = rptSec.getSectionLines().item(_i);

                let secLineAspect: cReportAspect = rptSecLine.getAspect();

                // footers grow to top
                //
                if (rptSec.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER 
                    || rptSec.getTypeSection() === csRptTypeSection.CSRPTTPSCFOOTER) {

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
                    let rptCtrl: cReportControl = rptSecLine.getControls().item(_j);

                    let ctrLabelAspect: cReportAspect = rptCtrl.getLabel().getAspect();

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
            // and the footer has not have a section yet
            //
            if (rptSec.getKeyPaint() === "") { return; }

            let w_aspect: cReportAspect = rptSec.getAspect();

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
            let oldHeight: number = 0;
            let i: number = 0;

            m_dataHasChanged = true;

            let w_aspect: cReportAspect = paintObj.getAspect();

            // if Y is contained by the premited range everything is ok
            //
            if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - m_offY);

                // because the top has been set to real dimensions
                // of the screen we must move to the offset
                // of his section
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

            m_paint.alingToGrid(paintObj.getKey());

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
            let offsetTop: number = 0;

            w_aspect = secToMove.getAspect();

            offsetTop = oldHeight - (w_aspect.getHeight() + m_newSecLineOffSet);

            switch (secToMove.getTypeSection()) {

                    // if the section is a footer we move to bottom
                    // (Ojo footer sections, no group footers)
                    //
                case  csRptTypeSection.CSRPTTPSCFOOTER:
                case csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:

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
            let pageHeight: number = 0;
            let w_paperInfo: cReportPaperInfo = m_report.getPaperInfo();
            pGetOffSet(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                        m_report.getPaperInfo(), 
                                                        w_paperInfo.getPaperSize(), 
                                                        w_paperInfo.getOrientation()).Height, 
                                                        pageHeight);
            pRefreshOffSetInPaintObjs();
            m_paint.setGridHeight(pageHeight);
        };

        const pChangeBottomSections = function(secToMove, offsetTop) {

            let sec: cReportSection = null;
            let bChangeTop: boolean = false;
            let i: number = 0;

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCFOOTER 
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER 
                || bChangeTop) {

                for (i = m_report.getFooters().count(); i <= 1; i--) {
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

            let sec: cReportSection = null;
            let bChangeTop: boolean = false;
            let i: number = 0;

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCHEADER 
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONHEADER) {

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

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPGROUPHEADER || bChangeTop) {

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

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONDETAIL 
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCDETAIL || bChangeTop) {

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

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPGROUPFOOTER || bChangeTop) {

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
            let i: number = 0;
            let heightLines: number = 0;
UNKNOWN >>             cReportAspect w_aspect;

            // Update section line
            //
            for (i = 1; i <= sec.getSectionLines().count() - 1; i++) {
                w_aspect = sec.getSectionLines().item(i).getAspect();
                heightLines = heightLines + w_aspect.getHeight();
            }

            // for the last section line the height is the rest
            //
            let w_sectionLines: cReportSectionLines = sec.getSectionLines();
            w_aspect = w_sectionLines.item(w_sectionLines.count()).getAspect();
            w_aspect.setHeight(sec.getAspect().getHeight() - heightLines);

            pChangeTopSection(sec, 0, false, true);
        };

        const reLoadReport = function() {

            let paintSec: cReportPaintObject = null;

            m_paint = null;

            m_keyMoving = "";
            m_keySizing = "";
            m_keyObj = "";
            m_keyFocus = "";
            m_moveType = csRptEditorMoveType.CSRPTEDMOVTNONE;

            m_paint = UNKNOWN >>  can't find constructor for class CSReportPaint.cReportPaint();

            let w_paperInfo: cReportPaperInfo = m_report.getPaperInfo();
            m_paint.setGridHeight(
                    pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                m_report.getPaperInfo(), 
                                                                w_paperInfo.getPaperSize(), 
                                                                w_paperInfo.getOrientation()).Height));

            m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

            if (m_report.getName() !== "") {
                m_editorTab.Text = m_report.getPath() + m_report.getName();
            }

            let sec: cReportSection = null;

            for(var _i = 0; _i < m_report.getHeaders().count(); _i++) {
                sec = m_report.getHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), 
                                                sec.getKey(), 
                                                sec.getTypeSection(), 
                                                sec.getName(), 
                                                false));
                paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_HEADER);
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
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPH);
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
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_DETAIL);
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
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPF);
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
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_FOOTER);
            }

UNKNOWN >>             CSReportPaint.csRptPaintObjType paintType;

            for(var _i = 0; _i < m_report.getControls().count(); _i++) {

                let rptCtrl: cReportControl = m_report.getControls().item(_i);
                refreshNextNameCtrl(rptCtrl.getName());
                let ctrlAspect: cReportAspect = rptCtrl.getLabel().getAspect();

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTIMAGE 
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                    paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE;
                } 
                else {
                    paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX;
                }

                let paintObj: CSReportPaint.cReportPaintObject = m_paint.getNewObject(paintType);

                // for old reports
                //
                ctrlAspect.setTransparent(ctrlAspect.getBackColor() === Color.White.ToArgb());

                paintObj.setImage(rptCtrl.getImage().getImage());

                let w_aspect: cReportAspect = paintObj.getAspect();
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
                    w_aspect.setBorderWidth(1);
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
                    case  csRptTypeSection.CSRPTTPSCFOOTER:
                    case  csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:
                        w_aspect.setOffset(m_offSet);
                        break;
                }

                let w_font: cReportFont = w_aspect.getFont();
                w_font.setName(ctrlAspect.getFont().getName());
                w_font.setForeColor(ctrlAspect.getFont().getForeColor());
                w_font.setSize(ctrlAspect.getFont().getSize());
                w_font.setBold(ctrlAspect.getFont().getBold());
                w_font.setItalic(ctrlAspect.getFont().getItalic());
                w_font.setUnderline(ctrlAspect.getFont().getUnderline());
                w_font.setStrike(ctrlAspect.getFont().getStrike());

                paintObj.setText(rptCtrl.getLabel().getText());
                paintObj.setRptType(csRptTypeSection.CONTROL);
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
            let i: number = 0;
            let paintSec: cReportPaintObject = null;

            if (sec.getSectionLines().count() > 1) {

                for (i = 1; i <= sec.getSectionLines().count() - 1; i++) {
                    let secLine: cReportSectionLine = sec.getSectionLines().item(i);
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
                let po: CSReportPaint.cReportPaintObject = m_paint.getPaintSections().item(sec.getKeyPaint());
                po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString());
            }

            // we set the height of the last section line
            //
            paintSec = m_paint.getPaintSections().item(sec.getKeyPaint());

            let secLines: cReportSectionLines = sec.getSectionLines();
            paintSec.setHeightSecLine(secLines.item(secLines.count()).getAspect().getHeight());
        };

        const refreshNextNameCtrl = function(nameCtrl) {
            let x: number = 0;
            if (nameCtrl.Substring(1, cGlobals.C_CONTROL_NAME.Length).ToUpper() === cGlobals.C_CONTROL_NAME.ToUpper()) {
                x = cReportGlobals.val(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1));
                if (x > m_nextNameCtrl) {
                    m_nextNameCtrl = x + 1;
                }
            }
        };

        const moveControl = function(sKeyPaintObj) {
            let rptSecLine: cReportSectionLine = null;
            let rptCtrl: cReportControl = null;
            let rptSecLineAspect: cReportAspect = null;
            let objPaintAspect: cReportAspect = null;

            m_paint.alingToGrid(sKeyPaintObj);

            rptCtrl = m_report.getControls().item(m_paint.getPaintObject(sKeyPaintObj).getTag());

            objPaintAspect = m_paint.getPaintObject(sKeyPaintObj).getAspect();

            if (rptCtrl === null) { return; }

            let w_aspect: cReportAspect = rptCtrl.getLabel().getAspect();
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

        const showPopMenuSection = function(noDelete, showGroups) {
            /* TODO: implement me
            m_fmain.popSecDelete.Enabled = !noDelete;
            m_fmain.popSecPropGroup.Visible = showGroups;
            m_fmain.PopupMenu(m_fmain.popSec);
             */ 
        };

        const showPopMenuControl = function(clickInCtrl) {
            /* TODO: implement me
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
        };

        const m_fGroup_UnloadForm = function() {
            m_fGroup = null;
        };

        const m_fProperties_UnloadForm = function() {
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

            let w_paperInfo: cReportPaperInfo = m_report.getPaperInfo();
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
        };

        const m_report_Done = function() {
            closeProgressDlg();
        };

        /* TODO: implement me
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

        const closeProgressDlg = function() {
            m_fProgress.Close();
            m_fProgress = null;
        };

        const showProgressDlg = function() {
            m_cancelPrinting = false;
            if (m_fProgress === null) { 
                m_fProgress = globalObject.CSReportEditor.createFProgress();
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
            let pageHeight: number = 0;

            let w_paperInfo: cReportPaperInfo = m_report.getPaperInfo();
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
            let rptCtrlAspect: cReportAspect = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;

            m_dataHasChanged = true;

            if (m_bNoMove) { return; }

            let i: number = 0;
            let offsetTop: number = 0;
            let offsetLeft: number = 0;
            let firstLeft: number = 0;
            let firstTop: number = 0;
            let firstOffSet: number = 0;

            if (m_vSelectedKeys.Length === 0) { return; }

            paintObj = m_paint.getPaintObject(m_keyMoving);

            let w_aspect: cReportAspect = paintObj.getAspect();
            firstLeft = w_aspect.getLeft();
            firstTop = w_aspect.getTop();
            firstOffSet = w_aspect.getOffset();

            for (i = m_vSelectedKeys.Length; i <= 1; i--) {

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
                if (paintObj.getRptType() === csRptTypeSection.CONTROL) {
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
            let sKeySection: string = "";
UNKNOWN >>             csRptTypeSection rptType;

            let maxBottom: number = 0;
            let minBottom: number = 0;

            let rptSec: cReportSection = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;
            let isSecLn: boolean = false;

            m_indexSecLnMoved = -1;

            paintObj = m_paint.getPaintObject(m_keyMoving);
            let w_aspect: cReportAspect = paintObj.getAspect();

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

                case csRptTypeSection.CSRPTTPMAINSECTIONHEADER:
                case csRptTypeSection.CSRPTTPSCHEADER:

                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // GROUP HEADER
                    //---------------------

                    break;

                case  csRptTypeSection.GROUP_SECTION_HEADER:

                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // DETAIL
                    //---------------------

                    break;

                case  csRptTypeSection.CSRPTTPMAINSECTIONDETAIL:
                case  csRptTypeSection.CSRPTTPSCDETAIL:

                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // GROUP FOOTER
                    //---------------------

                    break;

                case  csRptTypeSection.GROUP_SECTION_FOOTER:

                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // FOOTER
                    //---------------------

                    break;

                case  csRptTypeSection.CSRPTTPMAINSECTIONFOOTER:
                case  csRptTypeSection.CSRPTTPSCFOOTER:

                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, false);

                    //---------------------
                    // Section Lines
                    //---------------------
                    break;

                case  csRptTypeSection.C_KEY_SECLN_HEADER:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveHeader(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true;
                    break;

                case  csRptTypeSection.C_KEY_SECLN_GROUPH:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupHeader(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true;
                    break;

                case  csRptTypeSection.C_KEY_SECLN_DETAIL:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveDetails(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true;
                    break;

                case  csRptTypeSection.C_KEY_SECLN_GROUPF:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveGroupFooter(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true;
                    break;

                case  csRptTypeSection.C_KEY_SECLN_FOOTER:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = pMoveFooter(sKeySection, minBottom, maxBottom, true);
                    isSecLn = true;
                    m_indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex();
                    break;
            }

            if (isSecLn) {
                minBottom = pGetMinBottomForSecLn(rptSec, paintObj.getTag(), minBottom);
                pChangeSecLnHeight(paintObj, 
                                    y, 
                                    minBottom, 
                                    maxBottom, 
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
            let rtn: number = 0;

            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine = sec.getSectionLines().item(_i);
                rtn = rtn + secLn.getAspect().getHeight();
            }

            return rtn;
        };

        const pGetMinBottomForSecLn = function(
            sec, 
            secLnKey, 
            minBottom) {
            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine = sec.getSectionLines().item(_i);
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
            let w_aspect: cReportAspect = paintObj.getAspect();

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

            m_paint.alingToGrid(paintObj.getKey());

            // the section line height has been changed
            //
            secLn.getAspect().setHeight(w_aspect.getTop() 
                                        + cGlobals.C_HEIGHT_BAR_SECTION 
                                        - secLn.getAspect().getTop());
        };

        const pSizingControl = function(x, y) {
            let i: number = 0;
            let height: number = 0;
            let width: number = 0;
            let left: number = 0;
            let top: number = 0;

            if (m_vSelectedKeys.Length === 0) { return; }

            m_dataHasChanged = true;

            // first we need to modify the control which has its size changed
            //
            let w_getPaintObject: cReportPaintObject = m_paint.getPaintObject(m_keySizing);
            let w_aspect: cReportAspect = w_getPaintObject.getAspect();

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

            pMoveControl(w_getPaintObject.getAspect(), true);

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {

                if (m_keySizing !== m_vSelectedKeys[i]) {

                    w_getPaintObject = m_paint.getPaintObject(m_vSelectedKeys[i]);
                    w_aspect = w_getPaintObject.getAspect();

                    w_aspect.setHeight(w_aspect.getHeight() + height);
                    w_aspect.setTop(w_aspect.getTop() + top);
                    w_aspect.setWidth(w_aspect.getWidth() + width);
                    w_aspect.setLeft(w_aspect.getLeft() + left);

                    pMoveControl(w_getPaintObject.getAspect(), false);
                }
            }
        };

        const pMoveControl = function(aspect, bSizing) {
            self.C_MIN_WIDTH: number = 10;
            self.C_MIN_HEIGHT: number = 10;

            let rptCtrlAspect: cReportAspect = null;

            if (m_paint.getPaintObject(m_keySizing).getRptType() === csRptTypeSection.CONTROL) {
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
            maxBottom, 
            isForSectionLine) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = m_report.getHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {
                minBottom = C_MIN_HEIGHT_SECTION;
            } 
            else {
                // bottom of previous header + C_Min_Height_Section
                let w_aspect: cReportAspect = m_report.getHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getTop() + w_aspect.getHeight() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = m_picReport.Height;

            return rptSec;
        };

        const pMoveGroupHeader = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = m_report.getGroupsHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {
                // bottom of previous header + C_Min_Height_Section
                let w_headers: cReportSections = m_report.getHeaders();
                let w_aspect: cReportAspect = w_headers.item(w_headers.count()).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } 
            else {
                // bottom of previous group header + C_Min_Height_Section
                let w_aspect: cReportAspect = m_report.getGroupsHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = m_picReport.Height;

            return rptSec;
        };

        const pMoveDetails = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = m_report.getDetails().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------

            if (index === 1) {
                // if there are groups
                //
                if (m_report.getGroupsHeaders().count() > 0) {
                    // top of the last group header + C_Min_Height_Section
                    let w_groupsHeaders: cIReportGroupSections = m_report.getGroupsHeaders();
                    let w_aspect: cReportAspect = w_groupsHeaders.item(w_groupsHeaders.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } 
                else {
                    // top of the last header + C_Min_Height_Section
                    let w_headers: cReportSections = m_report.getHeaders();
                    let w_aspect: cReportAspect = w_headers.item(w_headers.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
            } 
            else {
                // top of the previous detail + C_Min_Height_Section
                //
                let w_aspect: cReportAspect = m_report.getDetails().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = m_picReport.Height;

            return rptSec;
        };

        const pMoveGroupFooter = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = m_report.getGroupsFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {
                // bottom of the last detail + C_Min_Height_Section
                //
                let w_details: cReportSections = m_report.getDetails();
                let w_aspect: cReportAspect = w_details.item(w_details.count()).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } 
            else {
                // bottom of the previous group footer + C_Min_Height_Section
                //
                let w_aspect: cReportAspect = m_report.getGroupsFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }
            maxBottom = m_picReport.Height;

            return rptSec;
        };

        const pMoveFooter = function(
            sKeySection, 
            minBottom, 
            maxBottom, 
            isForSectionLine) {

            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = m_report.getFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {

                // if there are groups
                //
                if (m_report.getGroupsFooters().count() > 0) {

                    // the bottom of the last group footer
                    //
                    let w_groupsFooters: cIReportGroupSections = m_report.getGroupsFooters();
                    let w_aspect: cReportAspect = w_groupsFooters.item(w_groupsFooters.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } 
                else {
                    // bottom of the last detail
                    //
                    let w_details: cReportSections = m_report.getDetails();
                    let w_aspect: cReportAspect = w_details.item(w_details.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
            } 
            else {
                // bottom of the previous footer
                //
                let w_aspect: cReportAspect = m_report.getFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() - m_offSet + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = m_picReport.Height;

            return rptSec;
        };

        const pGetMinBottomWithSecLn = function(secLns, minBottom) {
            let i: number = 0;

            for (i = 1; i <= secLns.count() - 1; i++) {
                minBottom = minBottom + secLns.item(i).getAspect().getHeight();
            }

            return minBottom;
        };

        const pGetOffSet = function(realPageHeight, rtnPageHeight) {
            let sec: cReportSection = null;

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
            let sec: cReportSection = null;
            let secLines: cReportSectionLine = null;
            let ctl: cReportControl = null;

            let w_paintSections: cReportPaintObjects = m_paint.getPaintSections();
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
UNKNOWN >>                             CSReportPaint.cReportPaintObject po;
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
            let i: number = 0;

            for (i = 1; i <= m_vSelectedKeys.Length; i++) {
                if (m_vSelectedKeys[i] === m_keyObj) { return false; }
            }

            G.redim(m_vSelectedKeys, 1);
            m_vSelectedKeys[1] = m_keyObj;

            return true;
        };

        const pValidateSectionAspect = function() {
            let sec: cReportSection = null;
            let top: number = 0;
            let i: number = 0;

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

            let w_paperInfo: cReportPaperInfo = m_report.getPaperInfo();
            top = CSReportPaint.cGlobals.getRectFromPaperSize(m_report.getPaperInfo(),
                                                    w_paperInfo.getPaperSize(), 
                                                    w_paperInfo.getOrientation()).Height;

            for (i = m_report.getFooters().count(); i <= 1; i--) {
                sec = m_report.getFooters().item(i);
                top = top - sec.getAspect().getHeight();
                pValidateSectionAspecAux(top, sec);
            }
        };

        const pValidateSectionAspecAux = function(top, sec) {
            let secLn: cReportSectionLine = null;
            let topLn: number = 0;
            let i: number = 0;
            let secLnHeight: number = 0;
            let width: number = 0;

            let w_paperInfo: cReportPaperInfo = m_report.getPaperInfo();
            width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                    m_report.getPaperInfo(), 
                                                    w_paperInfo.getPaperSize(), 
                                                    w_paperInfo.getOrientation()).Width;
            topLn = top;

UNKNOWN >>             cReportAspect w_aspect;

            for (i = 1; i <= sec.getSectionLines().count() - 1; i++) {
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

            let w_sectionLines: cReportSectionLines = sec.getSectionLines();
            secLn = w_sectionLines.item(w_sectionLines.count());

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

                Application.DoEvents();

                m_fControls = cGlobals.getCtrlBox(this);
                cGlobals.clearCtrlBox(this);
                m_fControls.addCtrls(m_report);
                m_fControls.Show(m_fmain);

            } catch (Exception ex) {
                cError.mngError(ex, "showControls", C_MODULE, "");
            }
        };

        self.showControlsTree = function() {
            try {

                Application.DoEvents();

                m_fTreeCtrls = cGlobals.getCtrlTreeBox(this);
                cGlobals.clearCtrlTreeBox(this);

                let ctrl: cReportControl = null;
                m_fTreeCtrls.addCtrls(m_report);
                m_fTreeCtrls.Show();

            } catch (Exception ex) {
                cError.mngError(ex, "ShowControlsTree", C_MODULE, "");
            }
        };

        const pSetInitDir = function() {
            if (cMainEditor.gbFirstOpen) {
                cMainEditor.gbFirstOpen = false;
                // TODO: implement me
                // m_fmain.cmDialog.InitDir = cGlobals.gWorkFolder;
            }
        };

        const form_Load = function() {
            G.redim(m_vSelectedKeys, 0);
            G.redim(m_vCopyKeys, 0);
            m_copyControls = false;
            m_copyControlsFromOtherReport = false;
            m_typeGrid = csETypeGrid.CSEGRIDPOINTS;
            m_keyboardMoveStep = 50;
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

            let oLaunchInfo: cReportLaunchInfo = null;
            m_report = globalObject.CSReportDll.createCReport();
            // TODO: event handler for
            //
            /*
                        m_report_Done();
                        m_report_Progress(task, page, currRecord, recordCount, cancel,);
                        m_report_FindFileAccess(answer, commDialog, file,);
            */
            oLaunchInfo = globalObject.CSReportDll.createCReportLaunchInfo();

            m_report.getPaperInfo().setPaperSize(m_fmain.getPaperSize());
            m_report.getPaperInfo().setOrientation(m_fmain.getOrientation());

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter());
            oLaunchInfo.setObjPaint(new CSReportPaint.cReportPrint());
            if (!m_report.init(oLaunchInfo)) { return; }

            let file: CSKernelFile.cFile = new CSKernelFile.cFile();
            m_report.setPathDefault(Application.StartupPath);

            m_picReport.Top = C_TOPBODY;
            m_picRule.Left = 0;
            m_picReport.Left = pGetLeftBody();

            m_keyMoving = "";
            m_keySizing = "";
            m_keyObj = "";
            m_keyFocus = "";
            m_nextNameCtrl = 0;

            m_paint = UNKNOWN >>  can't find constructor for class CSReportPaint.cReportPaint();

            let tR: Rectangle = null;
            let w_paperInfo: cReportPaperInfo = m_report.getPaperInfo();
            tR = UNKNOWN >>  can't find constructor for class Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                m_report.getPaperInfo(), 
                                                w_paperInfo.getPaperSize(), 
                                                w_paperInfo.getOrientation()));
            cGlobals.createStandarSections(m_report, tR);
            m_paint.setGridHeight(pSetSizePics(tR.height));
            m_paint.initGrid(m_picReport.CreateGraphics(), m_typeGrid);

            paintStandarSections();

            m_dataHasChanged = false;
        };

        const pUpdateFormulas = function(currentName, newName) {
            let i: number = 0;
            let rptCtrl: cReportControl = null;

            for (i = 1; i <= m_report.getControls().count(); i++) {

                rptCtrl = m_report.getControls().item(i);

                let w_formulaHide: cReportFormula = rptCtrl.getFormulaHide();
                if (w_formulaHide.getText() !== "") {
                    if (w_formulaHide.getText().IndexOf(currentName, 1) !== 0) {
                        w_formulaHide.setText(pReplaceInFormula(w_formulaHide.getText(), currentName, newName));
                    }
                }

                let w_formulaValue: cReportFormula = rptCtrl.getFormulaValue();
                if (w_formulaValue.getText() !== "") {
                    if (w_formulaValue.getText().IndexOf(currentName, 1) !== 0) {
                        w_formulaValue.setText(pReplaceInFormula(w_formulaValue.getText(), currentName, newName));
                    }
                }
            }
        };

        const pReplaceInFormula = function(formulaText, currentName, newName) {
            let _rtn: string = "";

            // if it isn't an internal function we give the user
            // a chance to cancel the changes
            //
            if (formulaText.Substring(0, 1).Trim() !== "_") {
                let fReplace: fFormulaReplace = null;
                fReplace = globalObject.CSReportEditor.createFFormulaReplace();
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

        const form_Activate = function() {
            cGlobals.setDocActive(this);
            if (fToolbox.getLoaded()) {
                if (cGlobals.getToolBox(this) !== null) { showToolBox(); }
            }
            if (fControls.getLoaded()) {
                if (cGlobals.getCtrlBox(this) !== null) { showControls(); }
            }
        };

        const form_Deactivate = function() {
            cGlobals.setDocInacActive(this);
            cGlobals.clearToolBox(this);
        };
        return self;

    }    }
        return self;


UNKNOWN >>     enum csAskEditResult {
        CSASKRSLTYES = 1,
        CSASKRSLTNO = 2,
        CSASKRSLTCANCEL = 3
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IcEditor {

    getVCopyKeys: (int) => String;
    getVCopyKeysCount: () => int;
    getPaint: () => CSReportPaint.cReportPaint;
    setKeyboardMoveStep: (int) => void;
    getBMoveNoMove: () => bool;
    getBMoveVertical: () => bool;
    getBMoveHorizontal: () => bool;
    getPaperSize: () => csReportPaperType;
    getOrientation: () => int;
    getCopies: () => int;
    setPaperSize: (csReportPaperType) => void;
    setOrientation: (int) => void;
    setCopies: (int) => void;
    setCustomHeight: (int) => void;
    setCustomWidth: (int) => void;
    getCustomHeight: () => int;
    getCustomWidth: () => int;
    getFileName: () => String;
    getShowingProperties: () => bool;
    setShowingProperties: (bool) => void;
    getFGroup: () => fGroup;
    setFGroup: (fGroup) => void;
    getReport: () => cReport;
    getDataHasChanged: () => bool;
    setDataHasChanged: (bool) => void;
    search: () => void;
    moveVertical: () => void;
    moveHorizontal: () => void;
    moveNoMove: () => void;
    moveAll: () => void;
    showGrid: (CSReportPaint.csETypeGrid) => void;
    showConnectsAux: () => void;
    setFontBold: () => void;
    pSetFontBoldValue: () => void;
    controlsAlign: (CSReportGlobals.csECtlAlignConst) => void;
    textAlign: (CSReportGlobals.HorizontalAlignment) => void;
    setParameters: () => void;
    setSimpleConnection: () => void;
    configConnection: (cReportConnect) => bool;
    setAllConnectToMainConnect: () => void;
    deleteObj: (bool) => void;
    addDBField: () => void;
    addLabel: () => void;
    addImage: () => void;
    addChart: () => void;
    pAddLabelAux: (csRptEditCtrlType) => void;
    ctrl_height: number;
    ctrl_width: number;
    addGroup: () => void;
    addSectionLine: () => void;
    addSection: (csRptTypeSection) => void;
    bringToFront: () => void;
    sendToBack: () => void;
    preview: () => void;
    printReport: () => void;
    saveDocument: (bool) => bool;
    newReport: (cReport) => void;
    openDocument: () => bool;
    openDocument: (String) => bool;
    saveChanges: () => bool;
    showGroupProperties: () => void;
    moveGroup: () => void;
    showSectionProperties: () => void;
    showSecLnProperties: () => void;
    showProperties: () => void;
    showToolBox: () => void;
    pAddColumnsToToolbox: (String, cColumnsInfo) => void;
    copy: () => void;
    paste: (bool) => void;
    editText: () => void;
    c_margen: number;
    refreshReport: () => void;
    refreshPostion: () => void;
    refreshAll: () => void;
    C_MIN_WIDTH: number;
    C_MIN_HEIGHT: number;
    showControls: () => void;
    showControlsTree: () => void;
    init: () => void;
  }
}
