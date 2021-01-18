

namespace CSReportEditor
{
    export class cEditor {


    {
        private fmain: fMain = null;
        private editor: Panel = null;
        private picRule: PictureBox = null;
        private picReport: PictureBox = null;
        private editorTab: TabPage = null;
        private reportFullPath: string = "";
		private graphic: Graphics = null;
		private name: string = null;

        public constructor(fmain: fMain, editor: Panel, rule: PictureBox, report: PictureBox, editorTab: TabPage) {
            this.fmain = fmain;
            this.editor = editor;
            this.editor.AutoScroll = true;

            this.picRule = rule;
            this.picRule.SetBounds(cUtil.mp(1), cUtil.mp(1), cUtil.mp(50), cUtil.mp(297));
            this.picRule.BackColor = Color.PeachPuff;

            this.picReport = report;
            this.picReport.SetBounds(cUtil.mp(50) + cUtil.mp(1), cUtil.mp(1), cUtil.mp(210), cUtil.mp(297));
            this.picReport.BackColor = Color.Beige;

            this.editorTab = editorTab;
        }

        public constructor() {

        private C_MODULE: string = "cEditor";
        private C_TOPBODY: number = 150;
        private C_LEFTBODY: number = 0;
        private C_MIN_HEIGHT_SECTION: number = 50;
        private C_SECTIONLINE: string = "Line ";

        private C_NOMOVE: number = -1111111;

        private report: cReport = null;
        private paint: CSReportPaint.cReportPaint = null;
        private keyMoving: string = "";
        private moveType: csRptEditorMoveType = null;
        private keySizing: string = "";
        private mouseButtonPress: boolean = false;
        private offX: number = 0;
        private offY: number = 0;
        private keyObj: string = "";
        private keyFocus: string = "";
        private moving: boolean = false;
        private opening: boolean = false;
        private offSet: number = 0;

        // the first SectionLine from where we need 
        // to modify the top after moving sections. 
        // It is used only in footers.
        private indexSecLnMoved: number = 0;

        // it is used in MoveSection to calculate
        // the positions after adding new SectionLines.
        //
        private newSecLineOffSet: number = 0;

        private bMoveVertical: boolean = false;
        private bMoveHorizontal: boolean = false;
        private bNoMove: boolean = false;

        private vSelectedKeys: string[] = null;
        private vCopyKeys: string[] = null;

        private fProgress: fProgress = null;
        private cancelPrinting: boolean = false;

        private formIndex: number = 0;

        private fProperties: fProperties = null;
        private fSecProperties: fSecProperties = null;
        private fFormula: fFormula = null;
        private fGroup: fGroup = null;
        private fToolBox: fToolbox = null;
        private fControls: fControls = null;
        private fTreeCtrls: fTreeViewCtrls = null;
        private fConnectsAux: fConnectsAux = null;
        private fSearch: fSearch = null;

        // names
        private nextNameCtrl: number = 0;
        private showingProperties: boolean = false;
        private dataHasChanged: boolean = false;

        // to add new controls
        private copyControls: boolean = false;
        private copyControlsFromOtherReport: boolean = false;
        private bCopyWithoutMoving: boolean = false;

        private draging: boolean = false;
        private controlName: string = "";
        private controlType: csRptEditCtrlType = null;
        private fieldName: string = "";
        private fieldType: number = 0;
        private fieldIndex: number = 0;
        private formulaText: string = "";

        private x: number = 0;
        private y: number = 0;
        private keyboardMove: boolean = false;

        private keyboardMoveStep: number = 0;

        private inMouseDown: boolean = false;

        private typeGrid: CSReportPaint.csETypeGrid = null;

        public getVCopyKeys(idx: number) {
            return this.vCopyKeys[idx];
        }

        public getVCopyKeysCount() {
            return this.vCopyKeys.Length;
        }

        public getPaint() {
            return this.paint;
        }

        public setKeyboardMoveStep(rhs: number) {
            this.keyboardMoveStep = rhs;
        }
        public getBMoveNoMove() {
            return this.bNoMove;
        }
        public getBMoveVertical() {
            return this.bMoveVertical;
        }
        public getBMoveHorizontal() {
            return this.bMoveHorizontal;
        }

        public getPaperSize() {
            if (this.report === null) { return 0; }
            return this.report.getPaperInfo().getPaperSize();
        }

        public getOrientation() {
            if (this.report === null) { return 0; }
            return this.report.getPaperInfo().getOrientation();
        }

        public getCopies() {
            if (this.report === null) { return 0; }
            return this.report.getLaunchInfo().getCopies();
        }

        public setPaperSize(rhs: csReportPaperType) {
            if (this.report === null) { return; }
            this.report.getPaperInfo().setPaperSize(rhs);
        }

        public setOrientation(rhs: number) {
            if (this.report === null) { return; }
            this.report.getPaperInfo().setOrientation(rhs);
        }

        public setCopies(rhs: number) {
            if (this.report === null) { return; }
            this.report.getLaunchInfo().setCopies(rhs);
        }

        public setCustomHeight(rhs: number) {
            if (this.report === null) { return; }
            this.report.getPaperInfo().setCustomHeight(rhs);
        }

        public setCustomWidth(rhs: number) {
            if (this.report === null) { return; }
            this.report.getPaperInfo().setCustomWidth(rhs);
        }

        public getCustomHeight() {
            if (this.report === null) { return 0; }
            return this.report.getPaperInfo().getCustomHeight();
        }

        public getCustomWidth() {
            if (this.report === null) { return 0; }
            return this.report.getPaperInfo().getCustomWidth();
        }

        public getFileName() {
            return this.report.getPath() + this.report.getName();
        }

        public getShowingProperties() {
            return this.showingProperties;
        }

        public setShowingProperties(rhs: boolean) {
            this.showingProperties = rhs;
        }

        public getFGroup() {
            return this.fGroup;
        }

        public setFGroup(rhs: fGroup) {
            this.fGroup = rhs;
        }

        public getReport() {
            return this.report;
        }

        public getDataHasChanged() {
            return this.dataHasChanged;
        }

        public setDataHasChanged(rhs: boolean) {
            this.dataHasChanged = rhs;
        }

        public search() {
            this.fSearch = new fSearch();
            this.fSearch.ShowDialog();
        }

        public moveVertical() {
			// TODO: reimplement
			//forthis.KeyUp(Keys.F11, false);
        }

        public moveHorizontal() {
			// TODO: reimplement
			//forthis.KeyUp(Keys.F12, false);
        }

        public moveNoMove() {
			// TODO: reimplement
			//forthis.KeyUp(Keys.F9, false);
        }

        public moveAll() {
			// TODO: reimplement
			//forthis.KeyUp(Keys.F8, false);
        }

        public showGrid(typeGrid: CSReportPaint.csETypeGrid) {
            this.typeGrid = typeGrid;
            this.paint.initGrid(this.picReport.CreateGraphics(), typeGrid);
        }

        public showConnectsAux() {
            try {
                this.fConnectsAux = new fConnectsAux();

                /* TODO: this code must to be moved to fConnectsAux constructor
                 * 

                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = this.fConnectsAux.lvColumns;
                    w___TYPE_NOT_FOUND.ListItems.fToolbox.clear();
                    w___TYPE_NOT_FOUND.ColumnHeaders.fToolbox.clear();
                    w___TYPE_NOT_FOUND.ColumnHeaders.Add(, , "DataSource", 2500);
                    w___TYPE_NOT_FOUND.ColumnHeaders.Add(, , "StrConnect", 5000);
                */
				for(var _i = 0; _i < this.report.getConnectsAux().count(); _i++) {
					pAddConnectAuxToListView(this.report.getConnectsAux().item(_i));
                }                
                this.fConnectsAux.ShowDialog();

            } catch (Exception ex) {
                cError.mngError(ex, "showConnectsAux", C_MODULE, "");
                this.fConnectsAux.Close();
                this.fConnectsAux = null;
            }
        }

        private pAddConnectAuxToListView(connect: cReportConnect) {
			this.fConnectsAux.addConnect(connect.getDataSource(), connect.getStrConnect());
        }
		// TODO: reimplement
		/*
        private void forthis.KeyUp(Keys keyCode, bool ctrlKey) {
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
                    this.bMoveVertical = true;
                    this.bMoveHorizontal = false;
                    cGlobals.setStatus();

                    break;
                case Keys.F12:
                    this.bMoveHorizontal = true;
                    this.bMoveVertical = false;
                    cGlobals.setStatus();

                    break;
                case Keys.F8:
                    this.bMoveHorizontal = false;
                    this.bMoveVertical = false;
                    cGlobals.setStatus();

                    break;
                case Keys.F9:
                    this.bNoMove = !this.bNoMove;
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
        private fConnectsAux_AddConnect() {
            try {

                let rptConnect: cReportConnect = null;
                rptConnect = new cReportConnect();

                if (!configConnection(rptConnect)) { return; }

                this.report.getConnectsAux().add(rptConnect);

                pAddConnectAuxToListView(rptConnect);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fConnectsAux_AddConnect", C_MODULE, "");        
            }
        }

        // TODO: this functionality must to be moved to fConnectsAux
        //
        private fConnectsAux_DeleteConnect() {
			/*
            try {
                int index = 0;

                if (this.fConnectsAux.lvColumns.SelectedItem === null) {
                    cWindow.msgWarning("Select one connection", "Additional connections");
                    return;
                }

                // TODO: this functionality must to be refactored to separate the
                //       UI code from the business code
                //
                index = this.fConnectsAux.lvColumns.SelectedItem.index;

                this.report.getConnectsAux().remove(index);

                this.fConnectsAux.lvColumns.ListItems.Remove(index);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fConnectsAux_DeleteConnect", C_MODULE, "");
            }
            */
        }

        // TODO: this functionality must to be moved to fConnectsAux
        //
        private fConnectsAux_EditConnect() {
			/*
            try {
                int index = 0;

                if (this.fConnectsAux.lvColumns.SelectedItem === null) {
                    cWindow.msgWarning("Select one connection", "Additional Connections");
                    return;
                }

                index = this.fConnectsAux.lvColumns.SelectedItem.index;

                if (!configConnection(this.report.getConnectsAux(index))) { return; }

                //TODO:** can't found type for with block
                //With this.fConnectsAux.lvColumns.SelectedItem
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = this.fConnectsAux.lvColumns.SelectedItem;
                    w___TYPE_NOT_FOUND.Text = this.report.getConnectsAux(index).DataSource;
                    w___TYPE_NOT_FOUND.SubItems(1) = this.report.getConnectsAux(index).strConnect;
                // {end with: w___TYPE_NOT_FOUND}

            } catch (Exception ex) {
                cError.mngError(ex, "this.fConnectsAux_EditConnect", C_MODULE, "");
            }
            */
        }

        private fControls_EditCtrl(ctrlKey: string) {
            try {

                pSelectCtrl(ctrlKey);
                showProperties();
                this.fControls.clear();
                this.fControls.addCtrls(this.report);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fControls_EditCtrl", C_MODULE, "");
            }
        }

        private fSearch_EditCtrl(ctrlKey: string) {
            try {

                pSelectCtrl(ctrlKey);
                showProperties();

            } catch (Exception ex) {
                cError.mngError(ex, "this.fSearch_EditCtrl", C_MODULE, "");
            }
        }

        private fSearch_EditSection(secKey: string) {
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
                cError.mngError(ex, "this.fSearch_EditSection", C_MODULE, "");
            }
        }

        private fSearch_SetFocusCtrl(ctrlKey: string) {
            try {

                pSelectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fSearch_SetFocusCtrl", C_MODULE, "");
            }
        }

        private fSearch_SetFocusSec(secKey: string) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fSearch_SetFocusSec", C_MODULE, "");
            }
        }

        private fTreeCtrls_EditCtrl(ctrlKey: string) {
            try {

                pSelectCtrl(ctrlKey);
                showProperties();
                this.fTreeCtrls.clear();
                this.fTreeCtrls.addCtrls(this.report);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fTreeCtrls_EditCtrl", C_MODULE, "");
            }
        }

        private fControls_SetFocusCtrl(ctrlKey: string) {
            try {

                pSelectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fControls_SetFocusCtrl", C_MODULE, "");
            }
        }

        private fTreeCtrls_EditSection(secKey: string) {
            try {

                let bIsSecLn: boolean = false;

				pSelectSection(secKey, bIsSecLn);

                if (bIsSecLn) {
                    showSecLnProperties();
                } 
                else {
                    showProperties();
                }
                this.fTreeCtrls.clear();
                this.fTreeCtrls.addCtrls(this.report);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fTreeCtrls_EditCtrl", C_MODULE, "");
            }
        }

        private fTreeCtrls_SetFocusCtrl(ctrlKey: string) {
            try {

                pSelectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fTreeCtrls_SetFocusCtrl", C_MODULE, "");
            }
        }

        private fTreeCtrls_SetFocusSec(secKey: string) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fTreeCtrls_SetFocusSec", C_MODULE, "");
            }
        }

        private pSelectCtrl(ctrlKey: string) {
            let bWasRemoved: boolean = false;
            let sKey: string = "";

			G.redim(this.vSelectedKeys, 0);
            sKey = getReport().getControls().item(ctrlKey).getKeyPaint();
            pAddToSelected(sKey, false, bWasRemoved);

            if (bWasRemoved) { sKey = ""; }

            this.keyFocus = sKey;
            this.keyObj = sKey;
			this.paint.setFocus(this.keyFocus, this.graphic, true);
        }

		private pSelectSection(secKey: string) {
			let bIsSecLn: boolean = false;
			pSelectSection (secKey, bIsSecLn);
		}

        private pSelectSection(secKey: string, bIsSecLn: boolean) {
            let bWasRemoved: boolean = false;
            let sKey: string = "";

            bIsSecLn = false;

			G.redim(this.vSelectedKeys, 0);

			if (this.report.getHeaders().item(secKey) !== null) {
                sKey = this.report.getHeaders().item(secKey).getKeyPaint();
            } 
			else if (this.report.getGroupsHeaders().item(secKey) !== null) {
                sKey = this.report.getGroupsHeaders().item(secKey).getKeyPaint();
            } 
			else if (this.report.getDetails().item(secKey) !== null) {
                sKey = this.report.getDetails().item(secKey).getKeyPaint();
            } 
			else if (this.report.getGroupsFooters().item(secKey) !== null) {
                sKey = this.report.getGroupsFooters().item(secKey).getKeyPaint();
            } 
			else if (this.report.getFooters().item(secKey) !== null) {
                sKey = this.report.getFooters().item(secKey).getKeyPaint();
            } 
            else {
                let secLn: cReportSectionLine = null;
                let sec: cReportSection = null;

                bIsSecLn = true;

				secLn = pGetSecLnFromKey(secKey, this.report.getHeaders(), sec);
                if (secLn !== null) {
                    sKey = secLn.getKeyPaint();
                    if (sKey === "") {
                        sKey = sec.getKeyPaint();
                    }
                } 
                else {
					secLn = pGetSecLnFromKey(secKey, this.report.getGroupsHeaders(), sec);
                    if (secLn !== null) {
                        sKey = secLn.getKeyPaint();
                        if (sKey === "") {
                            sKey = sec.getKeyPaint();
                        }
                    } 
                    else {
						secLn = pGetSecLnFromKey(secKey, this.report.getDetails(), sec);
                        if (secLn !== null) {
                            sKey = secLn.getKeyPaint();
                            if (sKey === "") {
                                sKey = sec.getKeyPaint();
                            }
                        } 
                        else {
							secLn = pGetSecLnFromKey(secKey, this.report.getGroupsFooters(), sec);
                            if (secLn !== null) {
                                sKey = secLn.getKeyPaint();
                                if (sKey === "") {
                                    sKey = sec.getKeyPaint();
                                }
                            } 
                            else {
								secLn = pGetSecLnFromKey(secKey, this.report.getFooters(), sec);
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

            this.keyFocus = sKey;
            this.keyObj = sKey;
			this.paint.setFocus(this.keyFocus, this.graphic, true);
        }

        private pGetSecLnFromKey(
            secKey: string
			sections: cIReportGroupSections
            rtnSec: cReportSection) {
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
        }

        private fFormula_CheckSintaxis(cancel: boolean, code: string) {
            let f: cReportFormula = null;
            f = new cReportFormula();
            if (this.fProperties !== null) {
                f.setName(this.fProperties.getFormulaName());
            } 
            else {
                f.setName(this.fSecProperties.getFormulaName());
            }
            f.setText(code);
			cancel = !this.report.getCompiler().checkSyntax(f);
        }

        private fGroup_ShowHelpDbField() {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

			sField = this.fGroup.getDbField();
            nFieldType = this.fGroup.getFieldType();
            nIndex = this.fGroup.getIndex();

			if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) { return; }

			this.fGroup.setDbField(sField);
            this.fGroup.setFieldType(nFieldType);
            this.fGroup.setIndex(nIndex);
        }

        private fProperties_ShowEditFormula(formula: string, cancel: boolean) {
			pShowEditFormula(formula, cancel);
        }

		private fProperties_ShowHelpChartField(cancel: boolean, ctrl: TextBox, idx: number) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

            sField = ctrl.Text;
            nFieldType = this.fProperties.getChartFieldType(idx);
            nIndex = this.fProperties.getChartIndex(idx);

			cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; }

            ctrl.Text = sField;
            this.fProperties.setChartFieldType(idx, nFieldType);
            this.fProperties.setChartIndex(idx, nIndex);
        }

        private fProperties_ShowHelpChartGroupField(cancel: boolean) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

			sField = this.fProperties.getDbFieldGroupValue();
            nFieldType = this.fProperties.getChartGroupFieldType();
            nIndex = this.fProperties.getChartGroupIndex();

			cancel = cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; }

			this.fProperties.setDbFieldGroupValue(sField);
            this.fProperties.setChartGroupFieldType(nFieldType);
            this.fProperties.setChartGroupIndex(nIndex);
        }

        private fSecProperties_ShowEditFormula(formula: string, cancel: boolean) {
            pShowEditFormula(formula, cancel);
        }

		private pShowEditFormula(formula: string, cancel: boolean) {
			cancel = false;
			try {

				let f: cReportFormulaType = null;
				let c: cReportControl = null;

				if (this.fFormula === null) { 
					this.fFormula = new fFormula();
					// TODO: set event handlers for fFormula
				}

				// TODO: this functionality has to be moved to fFormula
				//

				// Load formulas in the tree
				this.fFormula.createTree();

				for(var _i = 0; _i < this.report.getFormulaTypes().count(); _i++) {
					f = this.report.getFormulaTypes().item(_i);
					this.fFormula.addFormula(f.getId(), f.getName(), f.getNameUser(), f.getDecrip(), f.getHelpContextId());
				}

				for(var _i = 0; _i < this.report.getControls().count(); _i++) {
					c = this.report.getControls().item(_i);
					if (c.getControlType() === csRptControlType.CSRPTCTFIELD) {
						this.fFormula.addDBField(c.getName(), c.getField().getName());
					} 
					else if (c.getControlType() === csRptControlType.CSRPTCTLABEL) {
						this.fFormula.addLabel(c.getName());
					}
				}

				this.fFormula.setFormula(formula);

				this.fFormula.expandTree();

				this.fFormula.center();

				//
				// TODO: end functionality to move 

				this.fFormula.Show();

				cancel = !this.fFormula.getOk();

				if (!cancel) {
					formula = this.fFormula.getFormula();
				}

			} catch (Exception ex) {
				cError.mngError(ex, "this.fProperties_ShowEditFormula", C_MODULE, "");
			}
		}

        private fSecProperties_UnloadForm() {
            this.fSecProperties = null;
        }

        private fToolBox_AddControl(
            controlName: string
            controlType: csRptEditCtrlType
            fieldName: string
            formulaText: string
            fieldType: number
            fieldIndex: number) {
            beginDraging();
            this.controlName = controlName;
            this.controlType = controlType;
            this.fieldName = fieldName;
            this.formulaText = formulaText;
            this.fieldIndex = fieldIndex;
            this.fieldType = fieldType;
        }

        private fTreeCtrls_UpdateFormulaHide(ctrlKey: string, formula: string) {
            this.report.getControls().item(ctrlKey).getFormulaHide().setText(formula);
        }

        private fTreeCtrls_UpdateFormulaValue(ctrlKey: string, formula: string) {
            this.report.getControls().item(ctrlKey).getFormulaValue().setText(formula);
        }

        private fTreeCtrls_UpdateSectionFormulaHide(secKey: string, formula: string) {

			if (this.report.getHeaders().item(secKey) !== null) {
                this.report.getHeaders().item(secKey).getFormulaHide().setText(formula);
            } 
			else if (this.report.getGroupsHeaders().item(secKey) !== null) {
                this.report.getGroupsHeaders().item(secKey).getFormulaHide().setText(formula);
            } 
			else if (this.report.getDetails().item(secKey) !== null) {
                this.report.getDetails().item(secKey).getFormulaHide().setText(formula);
            } 
			else if (this.report.getGroupsFooters().item(secKey) !== null) {
                this.report.getGroupsFooters().item(secKey).getFormulaHide().setText(formula);
            } 
			else if (this.report.getFooters().item(secKey) !== null) {
                this.report.getFooters().item(secKey).getFormulaHide().setText(formula);
            } 
            else {
                let secLn: cReportSectionLine = null;
                let sec: cReportSection = null;

				secLn = pGetSecLnFromKey(secKey, this.report.getHeaders(), sec);
                if (secLn !== null) {
                    secLn.getFormulaHide().setText(formula);
                } 
                else {
					secLn = pGetSecLnFromKey(secKey, this.report.getGroupsHeaders(), sec);
                    if (secLn !== null) {
                        secLn.getFormulaHide().setText(formula);
                    } 
                    else {
						secLn = pGetSecLnFromKey(secKey, this.report.getDetails(), sec);
                        if (secLn !== null) {
                            secLn.getFormulaHide().setText(formula);
                        } 
                        else {
							secLn = pGetSecLnFromKey(secKey, this.report.getGroupsFooters(), sec);
                            if (secLn !== null) {
                                secLn.getFormulaHide().setText(formula);
                            } 
                            else {
								secLn = pGetSecLnFromKey(secKey, this.report.getFooters(), sec);
                                if (secLn !== null) {
                                    secLn.getFormulaHide().setText(formula);
                                }
                            }
                        }
                    }
                }
            }

        }

        private picReport_KeyDown(keyCode: number, shift: number) {
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

				if (this.vSelectedKeys.Length < 1) { return; }

                if (!this.keyboardMove) {
                    aspect = this.paint.getPaintObject(this.vSelectedKeys[1]).getAspect();
					y = aspect.getTop();
					x = aspect.getLeft();
                } 
                else {
                    y = this.y;
                    x = this.x;
                }

                // resize
                //
				if (Control.ModifierKeys === Keys.Shift) {

                    if (this.keySizing === "") {
                        this.keySizing = this.paint.getPaintObject(this.vSelectedKeys[1]).getKey();
                    }

                    if (!this.keyboardMove) {

                        aspect = this.paint.getPaintObject(this.vSelectedKeys[1]).getAspect();
						y = y + aspect.getHeight();
						x = x + aspect.getWidth();

                        pSetMovingFromKeyboard(x, y);

                        if (this.keySizing === "") {
                            this.keySizing = this.paint.getPaintObject(this.vSelectedKeys[1]).getKey();
                        }

                        switch (keyCode) {

						case Keys.Down:
						case Keys.Up:
                                this.keyMoving = "";
                                this.moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                break;
						case Keys.Right:
						case Keys.Left:
                                this.keyMoving = "";
                                this.moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                break;
                        }
                    }

                    switch (keyCode) {
					case Keys.Up:
                            y = y - this.keyboardMoveStep;
                            break;
					case Keys.Down:
                            y = y + this.keyboardMoveStep;
                            break;
					case Keys.Left:
                            x = x - this.keyboardMoveStep;
                            break;
					case Keys.Right:
                            x = x + this.keyboardMoveStep;
                            break;
                    }

                    // move
                    //
                } 
                else {

                    if (!this.keyboardMove) {
                        pSetMovingFromKeyboard(x, y);
                    }

                    if (this.keyMoving === "") {
                        this.keyMoving = this.paint.getPaintObject(this.vSelectedKeys[1]).getKey();
                    }

                    switch (keyCode) {
					case Keys.Up:
                            y = y - this.keyboardMoveStep;
                            break;
					case Keys.Down:
                            y = y + this.keyboardMoveStep;
                            break;
					case Keys.Left:
                            x = x - this.keyboardMoveStep;
                            break;
					case Keys.Right:
                            x = x + this.keyboardMoveStep;
                            break;
                    }
                }

                this.picReport_MouseMove(MouseButtons.Left, 0, x, y);
                this.x = x;
                this.y = y;

                this.keyboardMove = true;

            } catch (Exception ex) {
                cError.mngError(ex, "this.picReport_KeyDown", C_MODULE, "");
            }
        }

        private pSetMovingFromKeyboard(x: number, y: number) {

            this.keyMoving = this.keyFocus;

            let po: CSReportPaint.cReportPaintObject = this.paint.getPaintObject(this.keyMoving);

			switch (po.getTag()) {
                case cGlobals.C_KEY_DETAIL:
                case cGlobals.C_KEY_FOOTER:
                case cGlobals.C_KEY_HEADER:
                    this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
					this.picReport.Cursor = Cursors.SizeNS;
                    break;
				default:
					if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL 
						|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER 
						|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER 
						|| po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER 
						|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) {

						this.picReport.Cursor = Cursors.SizeNS;
                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    } 
					else if (po.getRptType() === csRptTypeSection.C_KEY_SECLN_HEADER 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_DETAIL 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_FOOTER 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPH 
						|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPF) {

					    this.picReport.Cursor = Cursors.SizeNS;
                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    } 
                    else {
                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
						this.picReport.Cursor = Cursors.SizeNS;
                    }
                    break;
            }

            let aspect: cReportAspect = this.paint.getPaintObject(this.keyMoving).getAspect();
			this.offX = x - aspect.getLeft();
			this.offY = y - (aspect.getTop() - aspect.getOffset());

            this.keyObj = this.keyMoving;

			cGlobals.setEditAlignTextState(this.vSelectedKeys.Length);
			cGlobals.setEditAlignCtlState(this.vSelectedKeys.Length > 1);
            pSetEditAlignValue();
            pSetFontBoldValue();

        }

        private picReport_KeyUp(keyCode: number, ctrlKey: boolean) {
            if (this.keyboardMove) {
                this.keyboardMove = false;
                this.picReport_MouseUp(MouseButtons.Left, 0, this.x, this.y);
            }
        }

		private picReport_MouseDown(button: MouseButtons, ctrlKey: boolean, x: number, y: number) {
            try {

                let sKey: string = "";
                let bClearSelected: boolean = false;
                let lastKeyMoving: string = "";
                let lastKeyObj: string = "";

                // to avoid reentrancy
                if (this.opening) { return; }

                this.inMouseDown = true;

                if (this.draging) {
                    addControlEnd(x, y);
                    endDraging();
                }

                endEditText(false);

				bClearSelected = pClearSelected(button, ctrlKey, x, y);

                if (button === MouseButtons.Left) {

                    lastKeyObj = this.keyObj;
                    this.keyObj = "";

					sKey = this.keyMoving !== "" ? this.keyMoving : this.keySizing;

                    // to force focus in the header
                    if (sKey === "") {
						this.paint.pointIsInObject(x, y, sKey);

                        if (sKey !== "") {

                            let po: CSReportPaint.cReportPaintObject = this.paint.getPaintObject(sKey);
                            lastKeyMoving = this.keyMoving;
                            this.keyMoving = sKey;

							switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:

                                    // only if no controls are selected
                                    //
                                    if (ctrlKey) {

										if (this.vSelectedKeys.Length > 0)  {
											return;
										if (this.vSelectedKeys[0].Length > 0) {
											return;
                                        this.keyMoving = lastKeyMoving;
                                        this.keyObj = lastKeyObj;
                                        return;
                                    }

                                    this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
									this.picReport.Cursor = Cursors.SizeNS;

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

											if (this.vSelectedKeys.Length > 0)  {
												return;
											if (this.vSelectedKeys[0].Length > 0) {
												return;
                                            this.keyMoving = lastKeyMoving;
                                            this.keyObj = lastKeyObj;
                                            return;
                                        }

										this.picReport.Cursor = Cursors.SizeNS;
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    } 
									else if (po.getRptType() === csRptTypeSection.C_KEY_SECLN_HEADER 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_DETAIL 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_FOOTER 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPH 
										|| po.getRptType() === csRptTypeSection.C_KEY_SECLN_GROUPF) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) {
											if (this.vSelectedKeys.Length > 0)  {
												return;
											if (this.vSelectedKeys[0].Length > 0) {
												return;
                                            this.keyMoving = lastKeyMoving;
                                            this.keyObj = lastKeyObj;
                                            return;
                                        }

									    this.picReport.Cursor = Cursors.SizeNS;
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                                    } 
                                    else {
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
										this.picReport.Cursor = Cursors.SizeAll;
                                    }
                                    break;
                            }                            
                        }
                    }

                    let bWasRemoved: boolean = false;
					pAddToSelected(this.keyMoving, ctrlKey, bWasRemoved);

                    if (bWasRemoved) { sKey = ""; }

                    if (sKey !== "") {
                        let aspect: cReportAspect = this.paint.getPaintObject(sKey).getAspect();
						this.offX = x - aspect.getLeft();
						this.offY = y - (aspect.getTop() - aspect.getOffset());
                    }

                    this.keyFocus = sKey;
                    this.keyObj = sKey;
					this.paint.setFocus(this.keyFocus, this.graphic, bClearSelected);

                } 
                else if (button === MouseButtons.Right) {

                    this.keySizing = "";
                    this.keyMoving = "";
                    this.keyObj = "";

					if (this.paint.pointIsInObject(x, y, sKey)) {
                        this.keyObj = sKey;

                        bClearSelected = pSetSelectForRightBttn();

                        this.keyFocus = sKey;
						this.paint.setFocus(this.keyFocus, this.graphic, bClearSelected);

                        let po: CSReportPaint.cReportPaintObject = this.paint.getPaintObject(sKey);

                        if (this.paint.paintObjIsSection(sKey)) {

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

				cGlobals.setEditAlignTextState(this.vSelectedKeys.Length);
				cGlobals.setEditAlignCtlState(this.vSelectedKeys.Length > 1);
                pSetEditAlignValue();
                pSetFontBoldValue();

            } catch (Exception ex) {
                cError.mngError(ex, "this.picReport_MouseDown", C_MODULE, "");
                this.inMouseDown = false;
            }
        }

        public setFontBold() {
            let bBold: number = 0;
            let bBoldValue: boolean = false;
            let i: number = 0;

            bBold = -2;

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                let font: cReportFont = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect().getFont();

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

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {

                paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                rptCtrl = this.report.getControls().item(paintObject.getTag());
                rptCtrl.getLabel().getAspect().getFont().setBold(bBoldValue);
                paintObject.getAspect().getFont().setBold(bBoldValue);
            }

            this.dataHasChanged = true;
            refreshAll();
            pSetFontBoldValue();
        }

        public pSetFontBoldValue() {
            let bBold: number = 0;
            let i: number = 0;

            bBold = -2;

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                let font: cReportFont = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect().getFont();

                if (bBold === -2) {
					bBold = font.getBold() ? -1 : 0;
                } 
				else if (bBold !== (font.getBold() ? -1 : 0)) {
                    bBold = -2;
                    break;
                }
            }

			cGlobals.setEditFontBoldValue(bBold);
        }

		public controlsAlign(align: CSReportGlobals.csECtlAlignConst) {
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

                    aspect = this.paint.getPaintObject(this.vSelectedKeys[1]).getAspect();
				    height = aspect.getHeight();
                    width = aspect.getWidth();
                    break;

				case csECtlAlignConst.csECtlAlignVertical:
				case csECtlAlignConst.csECtlAlignHorizontal:

                    aspect = this.paint.getPaintObject(this.vSelectedKeys[1]).getAspect();
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

                    for (i = 1; i <= this.vSelectedKeys.Length; i++) {

                        aspect = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect();
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

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {

                paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                rptCtrl = this.report.getControls().item(paintObject.getTag());

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

            this.dataHasChanged = true;
            refreshAll();
        }

		public textAlign(align: CSReportGlobals.HorizontalAlignment) {
            let i: number = 0;
            let paintObject: CSReportPaint.cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {

                paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                rptCtrl = this.report.getControls().item(paintObject.getTag());

				rptCtrl.getLabel().getAspect().setAlign(align);
				paintObject.getAspect().setAlign(align);
            }

            this.dataHasChanged = true;
            refreshAll();
            pSetEditAlignValue();
        }

        private pSetEditAlignValue() {
            let align: number = -1;
            let i: number = 0;

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                let aspect: CSReportDll.cReportAspect = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect();

                if (align === -1) {
					align = aspect.getAlign();
                } 
				else if (align !== aspect.getAlign()) {
                    align = -2;
                    break;
                }
            }
			cGlobals.setEditAlignValue(align);
        }

        private pAddToSelected(sKey: string, ctrlKey: boolean, bWasRemoved: boolean) {

			bWasRemoved = false;
            let i: number = 0;
            if (sKey === "") { return; }

            bWasRemoved = false;

            if (ctrlKey) {

                for (i = 1; i <= this.vSelectedKeys.Length; i++) {

                    if (this.vSelectedKeys[i] === sKey) {
                        pRemoveFromSelected(sKey);
                        bWasRemoved = true;
                        return;
                    }
                }
            } 
            else {
                if (pAllreadySelected(sKey)) { return; }
            }

			G.redimPreserve(this.vSelectedKeys, this.vSelectedKeys.Length + 1);
			this.vSelectedKeys[this.vSelectedKeys.Length - 1] = sKey;
        }

        private pAllreadySelected(sKey: string) {
            let i: number = 0;

            if (sKey === "") {
                return true;
            }

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                if (this.vSelectedKeys[i] === sKey) {
                    return true;
                }
            }
            return false;
        }

        private pRemoveFromSelected(sKey: string) {
            let i: number = 0;

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                if (this.vSelectedKeys[i] === sKey) {
                    break;
                }
            }

            if (i > this.vSelectedKeys.Length) { return; }
            for (i = i + 1; i <= this.vSelectedKeys.Length; i++) {
                this.vSelectedKeys[i - 1] = this.vSelectedKeys[i];
            }
            if (this.vSelectedKeys.Length > 0) {
				G.redimPreserve(this.vSelectedKeys, this.vSelectedKeys.Length - 1);
            } 
            else {
				G.redim(this.vSelectedKeys, 0);
            }

			this.paint.removeFromSelected(sKey, this.graphic);
        }

        private pClearSelected(button: MouseButtons, ctrlKey: boolean, x: number, y: number) {
            let sKey: string = "";
            let i: number = 0;

            if (!ctrlKey && button !== MouseButtons.Right) {
				this.paint.pointIsInObject(x, y, sKey);
                for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                    if (this.vSelectedKeys[i] === sKey) {
                        return false;
                    }
                }
				G.redim(this.vSelectedKeys, 0);
                return true;
            }
            return false;
        }

        private pShowMoveAll(x: number, y: number) {
            let i: number = 0;
			let offsetTop: number = 0;
			let offsetLeft: number = 0;
			let firstLeft: number = 0;
			let firstTop: number = 0;
            let clear: boolean = false;
			let offSet2: number = 0;

            if (this.vSelectedKeys.Length === 0) { return; }

            let aspect: cReportAspect = this.paint.getPaintObject(this.keyMoving).getAspect();
			firstLeft = aspect.getLeft();
			firstTop = aspect.getTop();

            clear = true;

            for (i = this.vSelectedKeys.Length; i <= 1; i--) {

                aspect = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect();
                offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft());
                offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop());
				offSet2 = aspect.getOffset();

                if (this.bMoveHorizontal) {
                    this.paint.moveObjToXYEx(this.keyMoving, 
                                            x - this.offX + offsetLeft, 
                                            firstTop - offSet2 + offsetTop, 
											this.graphic, 
                                            clear);
                } 
                else if (this.bMoveVertical) {
                    this.paint.moveObjToXYEx(this.keyMoving, 
                                            firstLeft + offsetLeft, 
                                            y - this.offY + offsetTop, 
											this.graphic, 
                                            clear);
                } 
                else {
                    this.paint.moveObjToXYEx(this.keyMoving, 
                                            x - this.offX + offsetLeft, 
                                            y - this.offY + offsetTop, 
						                    this.graphic, 
                                            clear);
                }

                if (clear) { clear = false; }
            }
        }

        private picReport_MouseMove(
            button: MouseButtons
            shift: number
            x: number
            y: number) {
            let sKey: string = "";
			let rgnTp: csRptPaintRegionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;

            if (this.draging) { return; }

            if (this.inMouseDown) { return; }

            if (button === MouseButtons.Left) {

                this.paint.beginMove();

                if (this.keyMoving !== "") {

                    switch (this.moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL:
                            pShowMoveAll(x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL:
							this.paint.moveHorizontal(this.keyMoving, x, this.graphic);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
							this.paint.moveVertical(this.keyMoving, y, this.graphic);
                            break;
                    }

                    this.moving = true;

                } 
                else if (this.keySizing !== "") {
                    switch (this.moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVDOWN:
                            this.paint.resize(this.graphic, this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFT:
                            this.paint.resize(this.graphic, this.keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                            this.paint.resize(this.graphic, this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVUP:
                            this.paint.resize(this.graphic, this.keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                            this.paint.resize(this.graphic, this.keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                            this.paint.resize(this.graphic, this.keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                            this.paint.resize(this.graphic, this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                            this.paint.resize(this.graphic, this.keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE);
                            break;
                    }
                    this.moving = true;
                } 
                else {
                    this.moving = false;
                }
            } 
            else {
                if (this.keyFocus !== "") {
                    sKey = this.keyFocus;
					if (this.paint.pointIsInThisObject(x, y, this.keyFocus, rgnTp)) {
                        let po: CSReportPaint.cReportPaintObject = this.paint.getPaintObject(sKey);

                        let ctrl: cReportControl = this.report.getControls().item(po.getTag());
                        pSetSbPnlCtrl(
							ctrl.getName(), 
							ctrl.getControlType(), 
							ctrl.getFormulaHide().getText(), 
							ctrl.getFormulaValue().getText(), 
							ctrl.getHasFormulaHide(), 
							ctrl.getHasFormulaValue(), 
							ctrl.getField().getName());

						if (po.getPaintType() === csRptPaintObjType.CSRPTPAINTOBJLINE) {
                            this.keyMoving = sKey;
                            this.keySizing = "";
                            this.picReport.Cursor = Cursors.SizeNS;
                        } 
                        else {
                            switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:                                        
                                    this.keyMoving = sKey;
                                    this.keySizing = "";
                                    this.picReport.Cursor = Cursors.SizeNS;
                                    this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    break;

                                default:

								if (po.getRptType() === csRptTypeSection.CSRPTTPSCDETAIL 
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCHEADER 
									|| po.getRptType() === csRptTypeSection.GROUP_SECTION_HEADER 
                                        || po.getRptType() === csRptTypeSection.GROUP_SECTION_FOOTER 
									|| po.getRptType() === csRptTypeSection.CSRPTTPSCFOOTER) {

                                        this.keyMoving = sKey;
                                        this.keySizing = "";
                                        this.picReport.Cursor = Cursors.SizeNS;
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    } 
                                    else {

                                        switch (rgnTp) {
									case csRptPaintRegionType.CRPTPNTRGNTYPEBODY:
                                                this.picReport.Cursor = Cursors.SizeAll;
                                                this.keyMoving = sKey;
                                                this.keySizing = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEDOWN:
                                                this.picReport.Cursor = Cursors.SizeNS;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEUP:
                                                this.picReport.Cursor = Cursors.SizeNS;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVUP;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFT:
										        this.picReport.Cursor = Cursors.SizeWE;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVLEFT;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHT:
                                                this.picReport.Cursor = Cursors.SizeWE;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN:
                                                this.picReport.Cursor = Cursors.SizeNESW;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVLEFTDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP:
                                                this.picReport.Cursor = Cursors.SizeNESW;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTUP;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN:
                                                this.picReport.Cursor = Cursors.SizeNWSE;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP:
                                                this.picReport.Cursor = Cursors.SizeNWSE;
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVLEFTUP;
                                                break;

                                            default:
                                                this.keySizing = "";
                                                this.keyMoving = "";
                                                break;
                                        }
                                    }
                                    break;
                            }
                        }
                    } 
                    else {
                        pSetSbPnlCtrl("");
                        this.picReport.Cursor = Cursors.Default;
                        this.keySizing = "";
                        this.keyMoving = "";
                    }
                }

				if (this.paint.pointIsInObject(x, y, sKey, rgnTp)) {
                    let po: CSReportPaint.cReportPaintObject = this.paint.getPaintObject(sKey);
                    if (po.getRptType() === csRptTypeSection.CONTROL) {
                        let rptCtrl: cReportControl = null;
                        rptCtrl = this.report.getControls().item(po.getTag());
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
        }

		private pSetSbPnlCtrl(ctrlName: string) {
			pSetSbPnlCtrl (ctrlName, csRptControlType.CSRPTCTLABEL, "", "", false, false, "");
		}

        private pSetSbPnlCtrl(
            ctrlName: string
            ctrlType: csRptControlType
            formulaHide: string
            formulaValue: string
            hasFormulaHide: boolean
            hasFormulaValue: boolean
            fieldName: string) {

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
            this.fmain.setsbPnlCtrl(msg);
        }

        private picReport_MouseUp(button: MouseButtons, shift: number, x: number, y: number) {
            // to avoid reentrancy
            if (this.opening) { return; }

            //----------------------------------------------------
            // MOVING
            //----------------------------------------------------
            let sKeySection: string = "";

            if (this.moving) {
                if (this.keyMoving !== "") {
                    switch (this.moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL:
                            if (this.bMoveVertical) {
                                pMoveAll(C_NOMOVE, y);
                            } 
                            else if (this.bMoveHorizontal) {
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
                else if (this.keySizing !== "") {
                    pSizingControl(x, y);
                }

                refreshBody();
                this.moving = false;
                refreshRule();
            }

            this.keySizing = "";
            this.keyMoving = "";
        }

        private picReport_Paint() {
			this.paint.paintPicture(this.graphic);
        }

        private picRule_Paint() {
            let i: number = 0;

            let ps: CSReportPaint.cReportPaintObjects = this.paint.getPaintSections();
            for (i = 1; i <= ps.count(); i++) {
				this.paint.drawRule(ps.getNextKeyForZOrder(i), this.graphic);
            }
        }

        public setParameters() {
            let connect: CSConnect.cConnect = new CSConnect.cConnect();
            let param: cParameter = null;

			for(var _i = 0; _i < this.report.getConnect().getParameters().count(); _i++) {
				param = this.report.getConnect().getParameters().item(_i);
				let connectParam: CSConnect.cParameter = connect.getParameters().add();
				connectParam.setName(param.getName());
					connectParam.setValue(param.getValue());
            }

			if (this.report.getConnect().getDataSource() === "") {
                cWindow.msgWarning("Before editting the parameter info you must define a connection");
                return;
            }

			connect.setStrConnect(this.report.getConnect().getStrConnect());
			connect.setDataSource(this.report.getConnect().getDataSource());
			connect.setDataSourceType(this.report.getConnect().getDataSourceType());

			if (!connect.getDataSourceColumnsInfo(this.report.getConnect().getDataSource(), 
				this.report.getConnect().getDataSourceType()))  {
            	return;

			cGlobals.setParametersAux(connect, this.report.getConnect());
        }

        public setSimpleConnection() {
            let f: fSimpleConnect = new fSimpleConnect();
            try {

                let strConnect: string = "";
				strConnect = this.report.getConnect().getStrConnect();
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
					this.report.getConnect().setStrConnect(f.getStrConnect());
                }

            } catch (Exception ex) {
                cError.mngError(ex, "configConnection", C_MODULE, "");
                f.Close();
            }
        }

        public configConnection(rptConnect: cReportConnect) {
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
					cGlobals.setParametersAux(connect, this.report.getConnect());
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
        }

        public setAllConnectToMainConnect() {
            try {

                let connect: cReportConnect = null;
				for(var _i = 0; _i < this.report.getConnectsAux().count(); _i++) {
					connect = this.report.getConnectsAux().item(_i);
                    connect.setStrConnect(this.report.getConnect().getStrConnect());
                }

            } catch (Exception ex) {
                cError.mngError(ex, "setAllConnectToMainConnect", C_MODULE, "");
            }
        }

        public deleteObj(bDelSectionLine: boolean) {
            let i: number = 0;
            let sec: cReportSection = null;
            let secs: cReportSections = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;

            let isGroupFooter: boolean = false;
            let isGroupHeader: boolean = false;
            let isSecLn: boolean = false;

            if (this.keyFocus === "") { return; }

            let group: cReportGroup = null;
            let secG: cReportSection = null;
            if (this.paint.paintObjIsSection(this.keyFocus)) {
                if (this.paint.getPaintSections().item(this.keyFocus) === null) { return; }

                let po: CSReportPaint.cReportPaintObject = this.paint.getPaintSections().item(this.keyFocus);

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
                        for (i = 1; i <= this.paint.getPaintObjects().count(); i++) {
                            paintObj = this.paint.getPaintObjects().item(i);
                            if (paintObj.getTag() === ctrl.getKey()) {
                                this.paint.getPaintObjects().remove(paintObj.getKey());
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
                            for (i = 1; i <= this.paint.getPaintObjects().count(); i++) {
                                paintObj = this.paint.getPaintObjects().item(i);
                                if (paintObj.getTag() === ctrl.getKey()) {
                                    this.paint.getPaintObjects().remove(paintObj.getKey());
                                    break;
                                }
                            }
                        }
                    }

                    // if this is a group section we need to delete the header and the footer
                    // 

                    if (isGroupFooter || isGroupHeader) {
                        if (isGroupHeader) {
							for(var _i = 0; _i < this.report.getGroups().count(); _i++) {
								group = this.report.getGroups().item(_i);
                                if (group.getHeader().getKey() === sec.getKey()) { break; }
                            }
                            secG = group.getFooter();
                        } 
                        else if (isGroupFooter) {
							for(var _i = 0; _i < this.report.getGroups().count(); _i++) {
								group = this.report.getGroups().item(_i);
                                if (group.getFooter().getKey() === sec.getKey()) { break; }
                            }
                            secG = group.getHeader();
                        }

						for(var _i = 0; _i < secG.getSectionLines().count(); _i++) {
							secLn = secG.getSectionLines().item(_i);
							for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                                ctrl = secLn.getControls().item(_j);
                                for (i = 1; i <= this.paint.getPaintObjects().count(); i++) {
                                    paintObj = this.paint.getPaintObjects().item(i);
                                    if (paintObj.getTag() === ctrl.getKey()) {
                                        this.paint.getPaintObjects().remove(paintObj.getKey());
                                        break;
                                    }
                                }
                            }
                        }

                        for (i = 1; i <= this.paint.getPaintSections().count(); i++) {
                            paintObj = this.paint.getPaintSections().item(i);
                            if (paintObj.getTag() === secG.getKey()) {
                                this.paint.getPaintSections().remove(paintObj.getKey());
                                break;
                            }
                        }

                        this.report.getGroups().remove(group.getIndex());

                    } 
                    else {
                        secs.remove(sec.getKey());
                    }

                }

                let bDeletePaintObj: boolean = false;

                bDeletePaintObj = true;
                if (isSecLn) {
                    bDeletePaintObj = sec.getKeyPaint() !== this.keyFocus;
                }

                if (bDeletePaintObj) {

                    this.paint.getPaintSections().remove(this.keyFocus);

                    // if I have deleted the last section line in this 
                    // section I need to delete the paint object
                    // asociated with the current last section line
                    // and then to asociate this section line with
                    // the paint object of the section
                } 
                else {
					let secLns: cReportSectionLines = sec.getSectionLines();
					this.paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint());
					secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint());
                }

                pResetKeysFocus();
				G.redim(this.vSelectedKeys, 0);
            } 
            else {
                paintObj = this.paint.getPaintObjects().item(this.keyFocus);
                if (paintObj === null) { return; }

                if (!cWindow.ask("Confirm you want to delete the control? ", VbMsgBoxResult.vbNo)) { return; }

                for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                    paintObj = this.paint.getPaintObjects().item(this.vSelectedKeys[i]);
                    ctrl = this.report.getControls().item(paintObj.getTag());

                    this.paint.getPaintObjects().remove(paintObj.getKey());
                    if (ctrl === null) { return; }
                    ctrl.getSectionLine().getControls().remove(ctrl.getKey());
                }

                pResetKeysFocus();
				G.redim(this.vSelectedKeys, 0);
            }

            refreshAll();
        }

        private pCanDeleteSection(
            secs: cReportSections
            sec: cReportSection
            tag: string) {
            let secAux: cReportSection = null;

            // header
            //
            secAux = this.report.getHeaders().item(tag);
            secs = null;

            if (secAux !== null) {
                if (secAux.Equals(sec) || sec === null) {
                    if (secAux.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONHEADER) {
                        cWindow.msgInfo("The main header can't be deleted");
                        return false;
                    }
                    secs = this.report.getHeaders();
                }
            } 
            // if we don't find the section yet
            //
            if (secs === null) {

                // footers
                //
                secAux = this.report.getFooters().item(tag);
                if (secAux !== null) {
                    if (secAux.Equals(sec) || sec === null) {
                        if (secAux.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER) {
                            cWindow.msgInfo("The main footer can't be deleted");
                            return false;
                        }
                        secs = this.report.getFooters();
                    }
                } 
                // if we don't find the section yet
                //
                if (secs === null) {

                    // check for groups
                    //
                    secAux = this.report.getGroupsHeaders().item(tag);
                    if (secAux !== null) {
                        if (!((secAux.Equals(sec) || sec === null))) {

                            secAux = this.report.getGroupsFooters().item(tag);
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
        }

        private pResetKeysFocus() {
            this.keyFocus = "";
            this.keyMoving = "";
            this.keySizing = "";
            this.picReport.Cursor = Cursors.Default;
        }

        public addDBField() {
            let sField: string = "";
            let nIndex: number = 0;
            let nFieldType: number = 0;

			if (!cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
				return;

            beginDraging();
            this.controlName = "";
            this.controlType = csRptEditCtrlType.CSRPTEDITFIELD;
            this.fieldName = sField;
            this.formulaText = "";
            this.fieldIndex = nIndex;
            this.fieldType = nFieldType;
        }

        public addLabel() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITLABEL);
        }

        public addImage() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITIMAGE);
        }

        public addChart() {
            pAddLabelAux(csRptEditCtrlType.CSRPTEDITCHART);
        }

        public pAddLabelAux(ctlType: csRptEditCtrlType) {
            beginDraging();
            this.controlName = "";
            this.controlType = ctlType;
            this.fieldName = "";
            this.formulaText = "";
            this.fieldIndex = 0;
            this.fieldType = 0;
        }

		private addControlEnd(left: number, top: number) {
            let ctrl: cReportControl = null;

            this.draging = false;

            if (this.controlType === csRptEditCtrlType.CSRPTEDITNONE) {
                return true;
            }

            this.dataHasChanged = true;

            let i: number = 0;
			let originalLeft: number = 0;
			let originalTop: number = 0;
            let copyCtrl: cReportControl = null;
            let movedCtrl: cReportControl = null;
			let firstCtrlLeft: number = 0;
			let offSet: number = 0;

            if (this.copyControls) {

                if (this.vCopyKeys.Length === 0) { return false; }

                originalLeft = left;
                originalTop = top;

                let keyPaint: string = this.vCopyKeys[this.vCopyKeys.Length - 1];
				let keyCtrl: string = this.paint.getPaintObjects().item(keyPaint).getTag();
				movedCtrl = this.report.getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for (i = this.vCopyKeys.Length; i <= 1; i--) {

                    keyPaint = this.vCopyKeys[i];
					keyCtrl = this.paint.getPaintObjects().item(keyPaint).getTag();
					copyCtrl = this.report.getControls().item(keyCtrl);

                    // starting with the first control we move the left
                    // of every control if reach the right margin 
                    // move down a line and restart
                    //
                    offSet = pGetOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft());
                    left = originalLeft + offSet;

                    if (this.bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft();

                    }

                    if (left - 400 > this.picReport.Width) {
                        left = originalLeft + (offSet % originalLeft);
                        top += 100;
                    }

                    if (top > this.picReport.Height) {
                        top = this.picReport.Height - 100;
                    }

                    pAddControlEndAux(left, top, copyCtrl);

                }
                this.copyControls = false;

            } 
            else if (this.copyControlsFromOtherReport) {

                if (this.fmain.getReportCopySource() === null) { return false; }

                originalLeft = left;
                originalTop = top;

                let editor: cEditor = this.fmain.getReportCopySource();
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

                    if (this.bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft();

                    }

                    if (left - 400 > this.picReport.Width) {
                        left = originalLeft + (offSet % originalLeft);
                        top = top + 100;
                    }

                    if (top > this.picReport.Height) {
                        top = this.picReport.Height - 100;
                    }

                    pAddControlEndAux(left, top, copyCtrl);
                }

                this.copyControlsFromOtherReport = false;

            } 
            else {
                pAddControlEndAux(left, top, null);
            }

            refreshBody();

            return true;
        }

		private pGetOffsetLeftFromControls(leftCtrl1: number, leftCtrl2: number) {
            return leftCtrl2 - leftCtrl1;
        }

		private pGetOffsetTopFromControls(topCtrl1: number, topCtrl2: number) {
            return topCtrl2 - topCtrl1;
        }

		private pAddControlEndAux(left: number, top: number, baseControl: cReportControl) {
            let ctrl: cReportControl = null;

            // first we add a control in the main header
            // after the user complete the add operation
            // we would move the control to the desired
            // section line
            //
			ctrl = this.report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(1).getControls().add();

            // later we will set the properties related to the type of the control
            //
            this.nextNameCtrl = this.nextNameCtrl + 1;
            ctrl.setName(cGlobals.C_CONTROL_NAME + this.nextNameCtrl);

            if (baseControl === null) {
                pSetNewControlProperties(ctrl);
            } 
            else {
                pCopyControl(baseControl, ctrl);
            }

            pSetNewControlPosition(ctrl, left, top);
        }

        private pCopyFont(fromFont: cReportFont, toFont: cReportFont) {
            toFont.setBold(fromFont.getBold());
            toFont.setForeColor(fromFont.getForeColor());
            toFont.setItalic(fromFont.getItalic());
            toFont.setName(fromFont.getName());
            toFont.setSize(fromFont.getSize());
            toFont.setStrike(fromFont.getStrike());
			toFont.setUnderline(fromFont.getUnderline());
        }

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

        private pCopyChart(fromChart: cReportChart, toChart: cReportChart) {
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
        }

        private pCopyAspect(fromAspect: cReportAspect, toAspect: cReportAspect) {
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
        }

		// TODO: this function shouldn't be needed
		//
        private pCopyAspectToPaint(fromAspect: cReportAspect, toAspect: cReportAspect) {
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
        }

		private pCopyFontPaint(fromFont: cReportFont, toFont: cReportFont) {
			toFont.setBold(fromFont.getBold());
			toFont.setForeColor(fromFont.getForeColor());
			toFont.setItalic(fromFont.getItalic());
			toFont.setName(fromFont.getName());
			toFont.setSize(fromFont.getSize());
			toFont.setStrike(fromFont.getStrike());
			toFont.setUnderline(fromFont.getUnderline());
		}

        private pCopyControl(fromCtrl: cReportControl, toCtrl: cReportControl) {
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
        }

        private pSetNewControlProperties(ctrl: cReportControl) {
			let aspect: cReportAspect = null;

            ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left);

            switch (this.controlType) {
                case csRptEditCtrlType.CSRPTEDITFIELD:
                    ctrl.setControlType(csRptControlType.CSRPTCTFIELD);
                    ctrl.getLabel().setText(this.fieldName);
                    let field: cReportField = ctrl.getField();
                    field.setIndex(this.fieldIndex);
                    field.setName(this.fieldName);
                    field.setFieldType(this.fieldType);

                    if (cGlobals.isNumberField(this.fieldType)) {
                        aspect = ctrl.getLabel().getAspect();
					    aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                        aspect.setFormat("#0.00;-#0.00");
                    }
                    break;

                case csRptEditCtrlType.CSRPTEDITFORMULA:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getFormulaValue().setText(this.formulaText + "(" + this.controlName + ")");
                    ctrl.setHasFormulaValue(true);
                    ctrl.getLabel().getAspect().setFormat("0.00;-0.00");
                    ctrl.getLabel().getAspect().getFont().setBold(true);
                    ctrl.getLabel().setText(ctrl.getFormulaValue().getText());
                    ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Right);
                    break;

                case csRptEditCtrlType.CSRPTEDITLABEL:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getLabel().setText(this.fieldName);
                    ctrl.getLabel().getAspect().getFont().setBold(true);

                    break;
                case csRptEditCtrlType.CSRPTEDITIMAGE:
                    ctrl.setControlType(csRptControlType.CSRPTCTIMAGE);
                    ctrl.getLabel().setText(this.fieldName);

                    break;
                case csRptEditCtrlType.CSRPTEDITCHART:
                    ctrl.setControlType(csRptControlType.CSRPTCTCHART);
                    ctrl.getLabel().setText(this.fieldName);
                    break;
            }

            public ctrl_height: number = 285;
            public ctrl_width: number = 2000;

			aspect = ctrl.getLabel().getAspect();
            aspect.setWidth(ctrl_width);
            aspect.setHeight(ctrl_height);
            aspect.setTransparent(true);
        }

		private pSetNewControlPosition(ctrl: cReportControl, left: number, top: number) {
            let aspect: cReportAspect = ctrl.getLabel().getAspect();
            aspect.setLeft(left);
            aspect.setTop(top);

            let paintObj: cReportPaintObject = null;
			let paintType: csRptPaintObjType = csRptPaintObjType.CSRPTPAINTOBJBOX;

            if (ctrl.getControlType() === csRptControlType.CSRPTCTIMAGE 
                || ctrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE;
            }

            paintObj = this.paint.getNewObject(paintType);

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

			this.paint.drawObject(paintObj.getKey(), this.graphic);
        }

        public addGroup() {
			cGlobals.showGroupProperties(null, this);
            refreshAll();
        }

        private pGetGroup(key: string) {
            let group: cReportGroup = null;

			for(var _i = 0; _i < this.report.getGroups().count(); _i++) {
				group = this.report.getGroups().item(_i);
                if (group.getHeader().getKey() === key) { break; }
                if (group.getFooter().getKey() === key) { break; }
            }

            return group;
        }


        //public void addSectionLine() { }

        public addSectionLine() {
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
                    this.newSecLineOffSet = cGlobals.C_HEIGHT_NEW_SECTION;

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
            this.newSecLineOffSet = 0;
        }

        private pAddSectionLinesAux(
            sec: cReportSection
            paintObj: CSReportPaint.cReportPaintObject) {
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
                    this.offY = 0;
                    y = aspect.getHeight() + aspect.getTop() - this.offSet - cGlobals.C_HEIGHT_BAR_SECTION;
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
            let po: CSReportPaint.cReportPaintObject = this.paint.getPaintSections().item(secL.getKeyPaint());
			po.setRptType(typeSecLn);
			po.setRptKeySec(sec.getKey());

			// section
            po = this.paint.getPaintSections().item(sec.getKeyPaint());
			po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString());

            moveSection(paintObj, 0, y, minBottom, maxBottom, sec, false);

            refreshBody();
            refreshRule();
        }

        public addSection(typeSection: csRptTypeSection) {

			if (!this.editor.Visible) {
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
                    let w_headers: cReportSections = this.report.getHeaders();
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
                    moveSection(this.paint.getPaintObject(rptSection.getKeyPaint()), 
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

                    let w_groupsHeaders: cIReportGroupSections = this.report.getGroupsHeaders();
				    rptSection = w_groupsHeaders.item(w_groupsHeaders.count());
                    rptSection.setName("GH_" + rptSection.getIndex().ToString());

                    // the first group is next to the last header
                    //
					if (w_groupsHeaders.count() === 1) {
                        topSec = this.report.getHeaders().item(this.report.getHeaders().count());
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
                    moveSection(this.paint.getPaintObject(rptSection.getKeyPaint()), 
                                0, 
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION, 
                                w_aspect.getTop(), 
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION, 
                                rptSection, 
                                true);
                    break;

                case csRptTypeSection.CSRPTTPGROUPFOOTER:

                    let w_groupsFooters: cIReportGroupSections = this.report.getGroupsFooters();
                    rptSection = w_groupsFooters.item(1);
                    rptSection.setName("GF_" + rptSection.getIndex().ToString());

                    // all group footers are added to the top so at the
                    // beginning they are next to the detail section
                    //

                    topSec = this.report.getDetails().item(this.report.getDetails().count());

					w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(), 
                                                        rptSection.getKey(), 
                                                        csRptTypeSection.GROUP_SECTION_FOOTER, 
                                                        rptSection.getName(), 
                                                        false));

                    paintObj = this.paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveGroupFooter(rptSection.getKey(), minBottom, maxBottom, false);

                    this.offY = 0;

					w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break;

                case csRptTypeSection.CSRPTTPSCFOOTER:
                    let w_footers: cReportSections = this.report.getFooters();

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

                    paintObj = this.paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveFooter(rptSection.getKey(), minBottom, maxBottom, false);

                    this.offY = 0;

                    w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - this.offSet - cGlobals.C_HEIGHT_BAR_SECTION;

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
        }

        public bringToFront() {
			this.paint.getPaintObjects().zorder(this.keyObj, true);
            refreshBody();
            this.dataHasChanged = true;
        }

        public sendToBack() {
            this.paint.getPaintObjects().sendToBack(this.keyObj);
            refreshBody();
            this.dataHasChanged = true;
        }

        public preview() {
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPREVIEW);
            launchReport();
        }

        public printReport() {
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CSRPTLAUNCHPRINTER);
            launchReport();
        }

        private launchReport() {
            let mouse: cMouseWait = new cMouseWait();
            try {
                setZOrder();
                showProgressDlg();

                this.report.getLaunchInfo().getPrinter().setPaperInfo(this.report.getPaperInfo());
                this.report.getLaunchInfo().setObjPaint(new CSReportPaint.cReportPrint());
				// TODO: remove this
				this.report.getLaunchInfo().setHwnd(0);
                this.report.getLaunchInfo().setShowPrintersDialog(true);
                this.report.launch();

            } catch (Exception ex) {
                cError.mngError(ex, "launchReport", C_MODULE, "");
            }
UNKNOWN >>             finally {
                mouse.Dispose();
                closeProgressDlg();
            }
        }

        public saveDocument(saveAs: boolean) {
            let mouse: cMouseWait = new cMouseWait();
            try {
                let isNew: boolean = false;

                isNew = this.report.getName() === "";

                if (isNew) {
					this.report.setName(this.name);
                }

                if (saveAs) {
                    isNew = true;
                }

                setZOrder();

                pValidateSectionAspect();

                if (!this.report.save(this.fmain.saveFileDialog, isNew)) {
                reLoadReport();
                return true;

            } catch (Exception ex) {
                cError.mngError(ex, "saveDocument", C_MODULE, "");
                return false;
            }
UNKNOWN >>             finally {
                mouse.Dispose();
            }
        }

        private setZOrder() {
            let ctrl: cReportControl = null;
            for(var _i = 0; _i < this.report.getControls().count(); _i++) {
                ctrl = this.report.getControls().item(_i);
                ctrl.getLabel().getAspect().setNZOrder(this.paint.getPaintObjects().getZOrderForKey(ctrl.getKeyPaint()));
            }
        }

        public newReport(report: cReport) {

            if (report !== null) {

                this.report = report;
                reLoadReport();
                pValidateSectionAspect();
                reLoadReport();

            } 
            else {

				this.paint.createPicture(this.graphic);
                refreshRule();

            }

			Application.DoEvents();

			cGlobals.setDocActive(this);
        }

        public openDocument() {
            return openDocument("");
        }

        public openDocument(fileName: string) {
            let mouse: cMouseWait = new cMouseWait();
            try {

                // to avoid reentrancy
                this.opening = true;

                if (fileName === "") {

                    pSetInitDir();

                    // TODO: the original version of this function
                    //       made a very dirty use of the return of this.report.load
                    //
                    //       the code creates a new document when this.report.load(...)
                    //       return false and this.report.getName !== ""
                    //
                    //       when this.report.load is translated we will
                    //       need to rewrite this function
                    //
                    //       in the original function there was a goto to
                    //       a 'done' label 
                    if (!this.report.load(this.fmain.openFileDialog)) {

                        if (this.report.getName() === "")   {
                            return false;

                        // here the original function has a goto
                        // 'goto done'
                    }

                } 
                else {

                    if (!this.report.loadSilent(fileName)) {
                        return false;
                    }
                }

                reLoadReport();

                // here the original function has a 'done' label
                // 
                /*
                 * 
                Done:
                   With this.fmain.cmDialog
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

                this.opening = false;

                return true;
            }
            catch (ex) {
                return false;
            }
UNKNOWN >>             finally {
                mouse.Dispose();
            }            
        }

        public saveChanges() {
UNKNOWN >>             csAskEditResult rslt;

            if (this.dataHasChanged) {

                rslt = askEdit("Do you want to save changes to " + this.reportFullPath + "?", "CSReportEditor");

                switch (rslt) {
                    case csAskEditResult.CSASKRSLTYES:
						if (!saveDocument(false))  {
                            return false; 
                        break;

                    case csAskEditResult.CSASKRSLTCANCEL:
                        return false;
                }
            }

            this.dataHasChanged = false;
            return true;
        }

        private askEdit(msg: string, title: string) {

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
        }

        private fProperties_ShowHelpDbField(cancel: boolean) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

            sField = this.fProperties.txDbField.Text;
            nFieldType = this.fProperties.getFieldType();
            nIndex = this.fProperties.getIndex();

            cancel = !cGlobals.showDbFields(sField, nFieldType, nIndex, this);
            if (cancel) { return; }

            this.fProperties.txDbField.Text = sField;
            this.fProperties.setFieldType(nFieldType);
            this.fProperties.setIndex(nIndex);
            this.fProperties.txText.Text = sField;
        }

        public showGroupProperties() {
            let sec: cReportSection = null;
            let group: cReportGroup = null;
            let isGroup: boolean = false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            if (!isGroup) { return; }

            for(var _i = 0; _i < this.report.getGroups().count(); _i++) {
                group = this.report.getGroups().item(_i);
                if (group.getHeader().getKey() === sec.getKey()) { break; }
                if (group.getFooter().getKey() === sec.getKey()) { break; }
            }

            cGlobals.showGroupProperties(group, this);

            refreshAll();
        }

        public moveGroup() {
            let sec: cReportSection = null;
            let group: cReportGroup = null;
            let isGroup: boolean = false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            if (!isGroup) { return; }

            for(var _i = 0; _i < this.report.getGroups().count(); _i++) {
                group = this.report.getGroups().item(_i);
                if (group.getHeader().getKey() === sec.getKey()) { break; }
                if (group.getFooter().getKey() === sec.getKey()) { break; }
            }

            cGlobals.moveGroup(group, this);

            G.redim(this.vSelectedKeys, 0);
            refreshReport();
        }

        public showSectionProperties() {
            let sec: cReportSection = null;
            let isGroup: boolean = false;

            sec = pGetSection(isGroup);

            if (sec === null) { return; }

            pShowSecProperties(sec);

            refreshAll();
        }

        public showSecLnProperties() {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let isSecLn: boolean = false;

            sec = pGetSection(isSecLn, secLn, true);

            if (sec === null) { return; }
            if (secLn === null) { return; }
            if (!isSecLn) { return; }

            pShowSecProperties(secLn, sec.getName() + ": renglón " + secLn.getIndex().ToString());

            refreshAll();
        }

        private pShowSecProperties(sec: cIReportSection) {
            pShowSecProperties(sec, "");
        }

        private pShowSecProperties(sec: cIReportSection, secLnName: string) {
            try {

                this.showingProperties = true;

                if (this.fSecProperties === null) { 
                    this.fSecProperties = new fSecProperties();
                    // TODO: set event handler for ShowEditFormula, UnloadForm
                }

                this.fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide();
                this.fSecProperties.setFormulaHide(sec.getFormulaHide().getText());

                if (sec is cReportSection) { 
                    this.fSecProperties.txName.Text = sec.getName();
                }

                if (sec is cReportSectionLine) {
                    this.fSecProperties.lbControl.Text = secLnName;
                    this.fSecProperties.lbSecLn.Text = "Line properties:";
                } 
                else {
                    this.fSecProperties.lbControl.Text = sec.getName();
                }

                this.fSecProperties.ShowDialog();

                if (this.fSecProperties.getOk()) {
                    if (this.fSecProperties.getSetFormulaHideChanged()) { sec.setHasFormulaHide(this.fSecProperties.chkFormulaHide.Checked); }
                    if (this.fSecProperties.getFormulaHideChanged()) { sec.getFormulaHide().setText(this.fSecProperties.getFormulaHide()); }
                    if (sec is cReportSection) { sec.setName(this.fSecProperties.txName.Text); }
                }

            } catch (Exception ex) {
                cError.mngError(ex, "pShowSecProperties", C_MODULE, "");
            }
UNKNOWN >>             finally {
                this.fSecProperties.Close();
                this.showingProperties = false;
                this.fSecProperties = null;
            }
        }

        // ReturnSecLn is flag to state that the caller wants to get
        // the section line asociated with the separator of the section
        // remember that the last section line don't have a separator 
        // but share it with the section.
        //
        private pGetSection(
            isGroup: boolean) {
UNKNOWN >>             bool isSecLn;
UNKNOWN >>             bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter;
UNKNOWN >>             cReportSectionLine secLn;
            return pGetSection(isGroup, isSecLn, secLn, false, isGroupHeader, isGroupFooter);
        }

		private pGetSection(
			isGroup: boolean
			isSecLn: boolean) {
UNKNOWN >>             bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter;
UNKNOWN >>             cReportSectionLine secLn;
            return pGetSection(isGroup, isSecLn, secLn, false, isGroupHeader, isGroupFooter);
		}

        private pGetSection(
            isSecLn: boolean
            secLn: cReportSectionLine
            returnSecLn: boolean) {
UNKNOWN >>             bool isGroupHeader;
UNKNOWN >>             bool isGroupFooter;

            return pGetSection(isSecLn, secLn, returnSecLn, isGroupHeader, isGroupFooter);
        }

        private pGetSection(
            isSecLn: boolean
            secLn: cReportSectionLine
            returnSecLn: boolean
            isGroupHeader: boolean
            isGroupFooter: boolean) {
UNKNOWN >>             bool isGroup;
            return pGetSection(isGroup, isSecLn, secLn, returnSecLn, isGroupHeader, isGroupFooter);
        }

        private pGetSection(
            isGroup: boolean
            isSecLn: boolean
			secLn: cReportSectionLine
            returnSecLn: boolean
            isGroupHeader: boolean
            isGroupFooter: boolean) {

            let sec: cReportSection = null;

            isGroup = false;
            isSecLn = false;
            secLn = null;
            isGroupFooter = false;
            isGroupHeader = false;

			if (this.keyFocus === "") { return null; }

            // get the section and show his properties
            //
			if (!this.paint.paintObjIsSection(this.keyFocus)) { return null; }

			let paintObj: CSReportPaint.cReportPaintObject = this.paint.getPaintSections().item(this.keyFocus);

            // nothing to do
            //
			if (paintObj === null) { return null; }

            sec = this.report.getHeaders().item(paintObj.getTag());
            if (sec !== null) {

                // it's a header
            } 
            else {
                sec = this.report.getFooters().item(paintObj.getTag());
                if (sec !== null) {

                    // it's a footer
                } 
                else {

                    // check if it is a group
                    //
                    sec = this.report.getGroupsHeaders().item(paintObj.getTag());
                    if (sec !== null) {

                        // it's a group
                        //
                        isGroup = true;
                        isGroupHeader = true;

                    } 
                    else {
                        sec = this.report.getGroupsFooters().item(paintObj.getTag());
                        if (sec !== null) {

                            // it's a group
                            //
                            isGroup = true;
                            isGroupFooter = true;

                        } 
                        else {
                            // check if it is a detail
                            //
                            sec = this.report.getDetails().item(paintObj.getTag());
                            if (sec !== null) {

                                // it's a detail

                                // it's a line
                            } 
                            else {
                                isSecLn = true;
                                switch (paintObj.getRptType()) {
                                    case csRptTypeSection.C_KEY_SECLN_HEADER:
                                        sec = this.report.getHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_DETAIL:
                                        sec = this.report.getDetails().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_FOOTER:
                                        sec = this.report.getFooters().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_GROUPH:
                                        sec = this.report.getGroupsHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptTypeSection.C_KEY_SECLN_GROUPF:
                                        sec = this.report.getGroupsFooters().item(paintObj.getRptKeySec());
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
        }

        public showProperties() {
            if (this.keyFocus === "") { return; }

            let mouse: cMouseWait = new cMouseWait();

            if (this.paint.paintObjIsSection(this.keyFocus)) {
                showSectionProperties();
            } 
            else {
                this.keyObj = this.keyFocus;
                pShowCtrlProperties();
            }

            refreshAll();
        }

        private pShowCtrlProperties() {
            try {

                let paintObject: CSReportPaint.cReportPaintObject = null;
                let rptCtrl: cReportControl = null;
				let w_aspect: cReportAspect = null;
				let w_font: cReportFont = null;
                let image: cReportImage = null;
                let bMultiSelect: boolean = false;
                let sText: string = "";
                let i: number = 0;

                this.showingProperties = true;

                if (this.fProperties === null) { 
                    this.fProperties = new fProperties();
                    // TODO: set event handler for 
                    // ShowEditFormula, ShowHelpChartField, ShowHelpChartGroupField, ShowHelpDbField
                    // UnloadForm
                }

                paintObject = this.paint.getPaintObject(this.keyObj);
                if (paintObject === null) { return; }

                this.fProperties.txText.Text = paintObject.getText();
                rptCtrl = this.report.getControls().item(paintObject.getTag());

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTIMAGE) {
                    this.fProperties.hideTabImage();
                }

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTCHART) {
                    this.fProperties.hideTabChart();
                } 
                else {

                    cUtil.listSetListIndexForId(this.fProperties.cbType, (int)rptCtrl.getChart().getChartType());
                    cUtil.listSetListIndexForId(this.fProperties.cbFormatType, (int)rptCtrl.getChart().getFormat());
                    cUtil.listSetListIndexForId(this.fProperties.cbChartSize, (int)rptCtrl.getChart().getDiameter());
                    cUtil.listSetListIndexForId(this.fProperties.cbChartThickness, (int)rptCtrl.getChart().getThickness());
                    cUtil.listSetListIndexForId(this.fProperties.cbLinesType, (int)rptCtrl.getChart().getGridLines());

                    this.fProperties.txChartTop.Text = rptCtrl.getChart().getTop().ToString();
                    this.fProperties.txDbFieldGroupValue.Text = rptCtrl.getChart().getGroupFieldName();
                    this.fProperties.setChartGroupIndex(rptCtrl.getChart().getGroupFieldIndex());
                    this.fProperties.txChartGroupValue.Text = rptCtrl.getChart().getGroupValue();
                    this.fProperties.chkShowOutlines.Checked = rptCtrl.getChart().getOutlineBars();
                    this.fProperties.chkShowBarValues.Checked = rptCtrl.getChart().getShowValues();
                    this.fProperties.chkSort.Checked = rptCtrl.getChart().getSort();
                    this.fProperties.txText.Text = rptCtrl.getChart().getChartTitle();

                    if (rptCtrl.getChart().getSeries().count() > 0) {
                        this.fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName();
                        this.fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName();

                        this.fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                        this.fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                        cUtil.listSetListIndexForId(this.fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(1).getColor());

                        if (rptCtrl.getChart().getSeries().count() > 1) {
                            this.fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(2).getLabelFieldName();
                            this.fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(2).getValueFieldName();

                            this.fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(2).getLabelIndex());
                            this.fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(2).getValueIndex());

                            cUtil.listSetListIndexForId(this.fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(2).getColor());
                        }
                    }
                }

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD 
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {
                    this.fProperties.txText.Enabled = false;
                    let w_field: cReportField = rptCtrl.getField();
                    this.fProperties.txText.Text = w_field.getName();
                    this.fProperties.txDbField.Text = w_field.getName();
                    this.fProperties.setFieldType(w_field.getFieldType());
                    this.fProperties.setIndex(w_field.getIndex());
                } 
                else {
                    this.fProperties.hideTabField();
                    this.fProperties.txText.Enabled = true;
                }

                this.fProperties.txName.Text = rptCtrl.getName();
                this.fProperties.lbControl.Text = rptCtrl.getName();
                this.fProperties.chkFormulaHide.Checked = rptCtrl.getHasFormulaHide();
                this.fProperties.chkFormulaValue.Checked = rptCtrl.getHasFormulaValue();

                this.fProperties.txExportColIdx.Text = rptCtrl.getExportColIdx().ToString();
                this.fProperties.chkIsFreeCtrl.Checked = rptCtrl.getIsFreeCtrl();

                this.fProperties.txTag.Text = rptCtrl.getTag();
                this.fProperties.setFormulaHide(rptCtrl.getFormulaHide().getText());
                this.fProperties.setFormulaValue(rptCtrl.getFormulaValue().getText());
                this.fProperties.txIdxGroup.Text = rptCtrl.getFormulaValue().getIdxGroup().ToString();
                this.fProperties.opBeforePrint.Checked = rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CSRPTEVALPRE;
                this.fProperties.opAfterPrint.Checked = rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CSRPTEVALPOST;

                w_aspect = rptCtrl.getLabel().getAspect();
                this.fProperties.chkCanGrow.Checked = w_aspect.getCanGrow();
                this.fProperties.txFormat.Text = w_aspect.getFormat();
                this.fProperties.txSymbol.Text = w_aspect.getSymbol();
                this.fProperties.setIsAccounting(w_aspect.getIsAccounting());
                this.fProperties.chkWordWrap.Checked = w_aspect.getWordWrap();

                cUtil.listSetListIndexForId(this.fProperties.cbAlign, (int)w_aspect.getAlign());

                this.fProperties.txBorderColor.Text = w_aspect.getBorderColor().ToString();
                this.fProperties.txBorder3D.Text = w_aspect.getBorderColor3d().ToString();
                this.fProperties.txBorderShadow.Text = w_aspect.getBorderColor3dShadow().ToString();
                this.fProperties.chkBorderRounded.Checked = w_aspect.getBorderRounded();
                this.fProperties.txBorderWidth.Text = w_aspect.getBorderWidth().ToString();

                cUtil.listSetListIndexForId(this.fProperties.cbBorderType, (int)w_aspect.getBorderType());

                w_font = w_aspect.getFont();
                this.fProperties.txFont.Text = w_font.getName();
                this.fProperties.txForeColor.Text = w_font.getForeColor().ToString();
                this.fProperties.txFontSize.Text = w_font.getSize().ToString();
                this.fProperties.chkFontBold.Checked = w_font.getBold();
                this.fProperties.chkFontItalic.Checked = w_font.getItalic();
                this.fProperties.chkFontUnderline.Checked = w_font.getUnderline();
                this.fProperties.chkFontStrike.Checked = w_font.getStrike();

                w_aspect = paintObject.getAspect();
                this.fProperties.txLeft.Text = w_aspect.getLeft().ToString();
                this.fProperties.txTop.Text = w_aspect.getTop().ToString();
                this.fProperties.txWidth.Text = w_aspect.getWidth().ToString();
                this.fProperties.txHeight.Text = w_aspect.getHeight().ToString();
                this.fProperties.txBackColor.Text = w_aspect.getBackColor().ToString();
                this.fProperties.chkTransparent.Checked = w_aspect.getTransparent();

                bMultiSelect = this.vSelectedKeys.Length > 1;

                this.fProperties.resetChangedFlags();

                this.fProperties.ShowDialog();

                if (!this.fProperties.getOk()) { return; }

                for (i = 1; i <= this.vSelectedKeys.Length; i++) {

                    paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                    rptCtrl = this.report.getControls().item(paintObject.getTag());

                    if (!bMultiSelect) {
                        if (rptCtrl.getName() !== this.fProperties.txName.Text) {
                            if (rptCtrl.getName() !== "") {
                                if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", VbMsgBoxResult.vbYes)) {
                                    pUpdateFormulas(rptCtrl.getName(), this.fProperties.txName.Text);
                                }
                            }
                        }
                        rptCtrl.setName(this.fProperties.txName.Text);
                    }

                    if (this.fProperties.getTextChanged()) { rptCtrl.getLabel().setText(this.fProperties.txText.Text); }
                    if (this.fProperties.getTagChanged()) { rptCtrl.setTag(this.fProperties.txTag.Text); }
                    if (this.fProperties.getSetFormulaHideChanged()) { rptCtrl.setHasFormulaHide(this.fProperties.chkFormulaHide.Checked); }
                    if (this.fProperties.getSetFormulaValueChanged()) { rptCtrl.setHasFormulaValue(this.fProperties.chkFormulaValue.Checked); }
                    if (this.fProperties.getFormulaHideChanged()) { rptCtrl.getFormulaHide().setText(this.fProperties.getFormulaHide()); }
                    if (this.fProperties.getFormulaValueChanged()) { rptCtrl.getFormulaValue().setText(this.fProperties.getFormulaValue()); }
                    if (this.fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(cReportGlobals.val(this.fProperties.txIdxGroup.Text)); }
                    if (this.fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(this.fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); }

                    if (this.fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(cReportGlobals.val(this.fProperties.txExportColIdx.Text)); }
                    if (this.fProperties.getIsFreeCtrlChanged()) { rptCtrl.setIsFreeCtrl(this.fProperties.chkIsFreeCtrl.Checked); }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTFIELD || rptCtrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {

                        let w_field: cReportField = rptCtrl.getField();
                        if (this.fProperties.getDbFieldChanged()) {
                            w_field.setFieldType(this.fProperties.getFieldType());
                            w_field.setIndex(this.fProperties.getIndex());
                            w_field.setName(this.fProperties.txDbField.Text);
                        }
                    }

                    if (this.fProperties.getPictureChanged()) {
                        image = rptCtrl.getImage();
                        let picImage: PictureBox = this.fProperties.picImage;
                        image.setImage(picImage.Image.Clone());
                    }

                    if (rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) {

                        if (rptCtrl.getChart().getSeries().count() < 1) { 
                            rptCtrl.getChart().getSeries().add(); 
                        }

                        if (this.fProperties.getChartTypeChanged()) {
                            rptCtrl.getChart().setChartType(cUtil.listID(this.fProperties.cbType));
                        }
                        if (this.fProperties.getChartFormatTypeChanged()) {
                            rptCtrl.getChart().setFormat(cUtil.listID(this.fProperties.cbFormatType));
                        }
                        if (this.fProperties.getChartSizeChanged()) {
                            rptCtrl.getChart().setDiameter(cUtil.listID(this.fProperties.cbChartSize));
                        }
                        if (this.fProperties.getChartThicknessChanged()) {
                            rptCtrl.getChart().setThickness(cUtil.listID(this.fProperties.cbChartThickness));
                        }
                        if (this.fProperties.getChartLinesTypeChanged()) {
                            rptCtrl.getChart().setGridLines(cUtil.listID(this.fProperties.cbLinesType));
                        }

                        if (this.fProperties.getChartShowLinesChanged()) {
                            rptCtrl.getChart().setOutlineBars(this.fProperties.chkShowOutlines.Checked);
                        }
                        if (this.fProperties.getChartShowValuesChanged()) {
                            rptCtrl.getChart().setShowValues(this.fProperties.chkShowBarValues.Checked);
                        }

                        if (this.fProperties.getTextChanged()) {
                            rptCtrl.getChart().setChartTitle(this.fProperties.txText.Text);
                        }

                        if (this.fProperties.getChartTopChanged()) {
                            rptCtrl.getChart().setTop(cReportGlobals.val(this.fProperties.txChartTop.Text));
                        }

                        if (this.fProperties.getChartSortChanged()) {
                            rptCtrl.getChart().setSort(this.fProperties.chkSort.Checked);
                        }

                        if (this.fProperties.getChartGroupValueChanged()) {
                            rptCtrl.getChart().setGroupValue(this.fProperties.txChartGroupValue.Text);
                        }

                        if (this.fProperties.getChartFieldGroupChanged()) {
                            rptCtrl.getChart().setGroupFieldName(this.fProperties.txDbFieldGroupValue.Text);
                            rptCtrl.getChart().setGroupFieldIndex(this.fProperties.getChartGroupIndex());
                        }

                        if (this.fProperties.getChartFieldLbl1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setLabelFieldName(this.fProperties.txDbFieldLbl1.Text);
                            rptCtrl.getChart().getSeries().item(1).setLabelIndex(this.fProperties.getChartIndex(0));
                        }
                        if (this.fProperties.getChartFieldVal1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setValueFieldName(this.fProperties.txDbFieldVal1.Text);
                            rptCtrl.getChart().getSeries().item(1).setValueIndex(this.fProperties.getChartIndex(1));
                        }

                        if (this.fProperties.getChartColorSerie1Changed()) {
                            rptCtrl.getChart().getSeries().item(1).setColor(cUtil.listID(this.fProperties.cbColorSerie1));
                        }

                        if (this.fProperties.getChartFieldLbl2Changed() || this.fProperties.getChartFieldVal2Changed()) {
                            if (rptCtrl.getChart().getSeries().count() < 2) { 
                                rptCtrl.getChart().getSeries().add(); 
                            }
                        }

                        if (this.fProperties.txDbFieldLbl2.Text === "" || this.fProperties.txDbFieldVal2.Text === "") {
                            if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(2); }
                        }

                        if (rptCtrl.getChart().getSeries().count() > 1) {

                            if (this.fProperties.getChartFieldLbl2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setLabelFieldName(this.fProperties.txDbFieldLbl2.Text);
                                rptCtrl.getChart().getSeries().item(2).setLabelIndex(this.fProperties.getChartIndex(2));
                            }
                            if (this.fProperties.getChartFieldVal2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setValueFieldName(this.fProperties.txDbFieldVal2.Text);
                                rptCtrl.getChart().getSeries().item(2).setValueIndex(this.fProperties.getChartIndex(3));
                            }

                            if (this.fProperties.getChartColorSerie2Changed()) {
                                rptCtrl.getChart().getSeries().item(2).setColor(cUtil.listID(this.fProperties.cbColorSerie2));
                            }
                        }
                    }

                    if (this.fProperties.getTextChanged()) { paintObject.setText(this.fProperties.txText.Text); }

                    w_aspect = rptCtrl.getLabel().getAspect();
                    if (this.fProperties.getLeftChanged()) { w_aspect.setLeft(cReportGlobals.val(this.fProperties.txLeft.Text)); }
                    if (this.fProperties.getTopChanged()) { w_aspect.setTop(cReportGlobals.val(this.fProperties.txTop.Text)); }
                    if (this.fProperties.getWidthChanged()) { w_aspect.setWidth(cReportGlobals.val(this.fProperties.txWidth.Text)); }
                    if (this.fProperties.getHeightChanged()) { w_aspect.setHeight(cReportGlobals.val(this.fProperties.txHeight.Text)); }
                    if (this.fProperties.getBackColorChanged()) { w_aspect.setBackColor(cReportGlobals.val(this.fProperties.txBackColor.Text)); }
                    if (this.fProperties.getTransparentChanged()) { w_aspect.setTransparent(this.fProperties.chkTransparent.Checked); }
                    if (this.fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(this.fProperties.cbAlign)); }
                    if (this.fProperties.getFormatChanged()) { w_aspect.setFormat(this.fProperties.txFormat.Text); }
                    if (this.fProperties.getSymbolChanged()) {
                        w_aspect.setSymbol(this.fProperties.txSymbol.Text);
                        w_aspect.setIsAccounting(this.fProperties.getIsAccounting());
                    }
                    if (this.fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(this.fProperties.chkWordWrap.Checked); }
                    if (this.fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(this.fProperties.chkCanGrow.Checked); }

                    if (this.fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cReportGlobals.val(this.fProperties.txBorderColor.Text)); }
                    if (this.fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cReportGlobals.val(this.fProperties.txBorder3D.Text)); }
                    if (this.fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cReportGlobals.val(this.fProperties.txBorderShadow.Text)); }
                    if (this.fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(this.fProperties.chkBorderRounded.Checked); }
                    if (this.fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cReportGlobals.val(this.fProperties.txBorderWidth.Text)); }
                    if (this.fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(this.fProperties.cbBorderType)); }

                    w_font = w_aspect.getFont();
                    if (this.fProperties.getFontChanged()) { w_font.setName(this.fProperties.txFont.Text); }
                    if (this.fProperties.getForeColorChanged()) { w_font.setForeColor(cReportGlobals.val(this.fProperties.txForeColor.Text)); }
                    if (this.fProperties.getFontSizeChanged()) { w_font.setSize(cReportGlobals.val(this.fProperties.txFontSize.Text)); }
                    if (this.fProperties.getBoldChanged()) { w_font.setBold(this.fProperties.chkFontBold.Checked); }
                    if (this.fProperties.getItalicChanged()) { w_font.setItalic(this.fProperties.chkFontItalic.Checked); }
                    if (this.fProperties.getUnderlineChanged()) { w_font.setUnderline(this.fProperties.chkFontUnderline.Checked); }
                    if (this.fProperties.getStrikeChanged()) { w_font.setStrike(this.fProperties.chkFontStrike.Checked); }

                    if (this.fProperties.getPictureChanged()) {
                        paintObject.setImage(rptCtrl.getImage().getImage());
                    }

                    //
                    // TODO: check if we can refactor this now we have a better class hierarchy
                    //

                    w_aspect = paintObject.getAspect();
                    if (this.fProperties.getLeftChanged()) { w_aspect.setLeft(cReportGlobals.val(this.fProperties.txLeft.Text)); }
                    if (this.fProperties.getTopChanged()) { w_aspect.setTop(cReportGlobals.val(this.fProperties.txTop.Text)); }
                    if (this.fProperties.getWidthChanged()) { w_aspect.setWidth(cReportGlobals.val(this.fProperties.txWidth.Text)); }
                    if (this.fProperties.getHeightChanged()) { w_aspect.setHeight(cReportGlobals.val(this.fProperties.txHeight.Text)); }
                    if (this.fProperties.getBackColorChanged()) { w_aspect.setBackColor(cReportGlobals.val(this.fProperties.txBackColor.Text)); }
                    if (this.fProperties.getTransparentChanged()) { w_aspect.setTransparent(this.fProperties.chkTransparent.Checked); }
                    if (this.fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(this.fProperties.cbAlign)); }
                    if (this.fProperties.getFormatChanged()) { w_aspect.setFormat(this.fProperties.txFormat.Text); }
                    if (this.fProperties.getSymbolChanged()) { w_aspect.setSymbol(this.fProperties.txSymbol.Text); }
                    if (this.fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(this.fProperties.chkWordWrap.Checked); }

                    if (this.fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(this.fProperties.cbBorderType)); }

                    if (w_aspect.getBorderType() === csReportBorderType.CSRPTBSNONE) {
                        w_aspect.setBorderColor(Color.Black.ToArgb());
                        w_aspect.setBorderWidth(1);
                        w_aspect.setBorderRounded(false);
                        w_aspect.setBorderType(csReportBorderType.CSRPTBSFIXED);
                    } 
                    else {
                        if (this.fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cReportGlobals.val(this.fProperties.txBorderColor.Text)); }
                        if (this.fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cReportGlobals.val(this.fProperties.txBorder3D.Text)); }
                        if (this.fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cReportGlobals.val(this.fProperties.txBorderShadow.Text)); }
                        if (this.fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(this.fProperties.chkBorderRounded.Checked); }
                        if (this.fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cReportGlobals.val(this.fProperties.txBorderWidth.Text)); }
                    }

                    w_font = w_aspect.getFont();
                    if (this.fProperties.getFontChanged()) { w_font.setName(this.fProperties.txFont.Text); }
                    if (this.fProperties.getForeColorChanged()) { w_font.setForeColor(cReportGlobals.val(this.fProperties.txForeColor.Text)); }
                    if (this.fProperties.getFontSizeChanged()) { w_font.setSize(cReportGlobals.val(this.fProperties.txFontSize.Text)); }
                    if (this.fProperties.getBoldChanged()) { w_font.setBold(this.fProperties.chkFontBold.Checked); }
                    if (this.fProperties.getItalicChanged()) { w_font.setItalic(this.fProperties.chkFontItalic.Checked); }
                    if (this.fProperties.getUnderlineChanged()) { w_font.setUnderline(this.fProperties.chkFontUnderline.Checked); }
                    if (this.fProperties.getStrikeChanged()) { w_font.setStrike(this.fProperties.chkFontStrike.Checked); }
                }

                this.dataHasChanged = true;

            } catch (Exception ex) {
                cError.mngError(ex, "pShowCtrlProperties", C_MODULE, "");
            }
UNKNOWN >>             finally {
                this.fProperties.Hide();
                this.showingProperties = false;
                this.fProperties = null;
                this.paint.endMove(this.picReport.CreateGraphics());
            }
        }

        private beginDraging() {
            /* TODO: implement me
            this.picReport.SetFocus;
            this.draging = true;
            this.picReport.Cursor = Cursors.Custom;
            this.picReport.MouseIcon = LoadPicture(App.Path + "\\move32x32.cur");
             */ 
        }

        private endDraging() {
            this.draging = false;
            this.controlType = csRptEditCtrlType.CSRPTEDITNONE;
            this.picReport.Cursor = Cursors.Default;
        }

        public showToolBox() {

            this.fToolBox = cGlobals.getToolBox(this);

            cGlobals.clearToolBox(this);

            pAddColumnsToToolbox(this.report.getConnect().getDataSource(), this.report.getConnect().getColumns());
            let connect: cReportConnect = null;

            for(var _i = 0; _i < this.report.getConnectsAux().count(); _i++) {
                let Connect: cReportConnect = this.report.getConnectsAux().item(_i);
                pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns());
            }

            for(var _i = 0; _i < this.report.getControls().count(); _i++) {
                let ctrl: cReportControl = this.report.getControls().item(_i);
                if (cGlobals.isNumberField(ctrl.getField().getFieldType())) {
                    this.fToolBox.addLbFormula(ctrl.getField().getName());

                    // TODO: refactor this to a better way to suggest the 
                    //       list of formulas applicable to the type of 
                    //       the database field
                    //
                    this.fToolBox.addFormula("Suma", ctrl.getName(), "_Sum");
                    this.fToolBox.addFormula("Máximo", ctrl.getName(), "_Max");
                    this.fToolBox.addFormula("Minimo", ctrl.getName(), "_Min");
                    this.fToolBox.addFormula("Promedio", ctrl.getName(), "_Average");
                }
            }
            this.fToolBox.Show(this.fmain);
        }

        public pAddColumnsToToolbox(dataSource: string, columns: cColumnsInfo) {
            for(var _i = 0; _i < columns.count(); _i++) {
                let col: cColumnInfo = columns.item(_i);
                this.fToolBox.addField(
                    cGlobals.getDataSourceStr(dataSource) + col.getName(), 
                    col.getTypeColumn(), 
                    col.getPosition());
                this.fToolBox.addLabels(col.getName());
            }
        }

        public copy() {
            try {
                let i: number = 0;

                if (this.vSelectedKeys.Length === 0) { return; }

                G.redim(this.vCopyKeys, this.vSelectedKeys.Length);

                for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                    this.vCopyKeys[i] = this.vSelectedKeys[i];
                }

				this.fmain.setReportCopySource(this);

            } catch (Exception ex) {
                cError.mngError(ex, "Copy", C_MODULE, "");
            }
        }

        public paste(bDontMove: boolean) {
            try {

                this.bCopyWithoutMoving = bDontMove;

                if (this.vCopyKeys.Length === 0) {

					if (this.fmain.getReportCopySource() === null) { return; }

                    this.copyControlsFromOtherReport = true;

                } 
                else {

                    this.copyControls = true;

                }

                fFormula.addLabel();

            } catch (Exception ex) {
                cError.mngError(ex, "Paste", C_MODULE, "");
            }
        }

        public editText() {
            try {

                public c_margen: number = 20;

                let sText: string = "";
                let paintObjAspect: cReportAspect = null;
                let ctrl: cReportControl = null;

                if (this.keyObj === "") { return; }

                let w_getPaintObject: cReportPaintObject = this.paint.getPaintObject(this.keyObj);
                paintObjAspect = w_getPaintObject.getAspect();
                sText = w_getPaintObject.getText();
                ctrl = this.report.getControls().item(w_getPaintObject.getTag());
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
        }

        private endEditText(descartar: boolean) {
            /* TODO: implement me
            if (!TxEdit.Visible) { return; }

            TxEdit.Visible = false;

            if (descartar) { return; }

            this.dataHasChanged = true;

            CSReportPaint.cReportPaintObject paintObjAspect = null;
            paintObjAspect = this.paint.getPaintObject(this.keyObj);
            if (paintObjAspect === null) { return; }

            String sKeyRpt = "";
            sKeyRpt = paintObjAspect.getTag();

            paintObjAspect.setText(TxEdit.Text);

            this.report.getControls().item(sKeyRpt).getLabel().setText(paintObjAspect.getText());
            refreshBody();
             */ 
        }

        private paintStandarSections() {
            let paintSec: cReportPaintObject = null;
            let w_headers: cReportSections = this.report.getHeaders();
            let w_item: cReportSection = w_headers.item(cGlobals.C_KEY_HEADER);

            w_item.setKeyPaint(paintSection(this.report.getHeaders().item(cGlobals.C_KEY_HEADER).getAspect(), 
                                            cGlobals.C_KEY_HEADER,
                                            csRptTypeSection.CSRPTTPMAINSECTIONHEADER, 
                                            "Header 1", false));

            paintSec = this.paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight());

            pAddPaintSetcionForSecLn(w_headers.item(cGlobals.C_KEY_HEADER), 
                                                    csRptTypeSection.C_KEY_SECLN_HEADER);

            let w_details: cReportSections = this.report.getDetails();
            w_item = w_details.item(cGlobals.C_KEY_DETAIL);

            w_item.setKeyPaint(paintSection(this.report.getDetails().item(cGlobals.C_KEY_DETAIL).getAspect(), 
                                            cGlobals.C_KEY_DETAIL,
                                            csRptTypeSection.CSRPTTPMAINSECTIONDETAIL, 
                                            "Detail", false));

            paintSec = this.paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight());

            pAddPaintSetcionForSecLn(w_details.item(cGlobals.C_KEY_DETAIL), 
                                        csRptTypeSection.C_KEY_SECLN_DETAIL);

            let w_footers: cReportSections = this.report.getFooters();
            w_item = w_footers.item(cGlobals.C_KEY_FOOTER);

            w_item.setKeyPaint(paintSection(this.report.getFooters().item(cGlobals.C_KEY_FOOTER).getAspect(), 
                                            cGlobals.C_KEY_FOOTER,
                                            csRptTypeSection.CSRPTTPMAINSECTIONFOOTER, 
                                            "Footer 1", false));

            paintSec = this.paint.getPaintSections().item(w_item.getKeyPaint());
            paintSec.setHeightSec(w_item.getAspect().getHeight());
            pAddPaintSetcionForSecLn(w_footers.item(cGlobals.C_KEY_FOOTER), csRptTypeSection.C_KEY_SECLN_FOOTER);
        }

        private paintSection(aspect: cReportAspect) {
                                    String sKey, 
			                        csRptTypeSection rptType, 
                                    String text, 
                                    bool isSectionLine) 
        { 

            let paintObj: CSReportPaint.cReportPaintObject = null;
            paintObj = this.paint.getNewSection(CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX);

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
                w_aspect.setOffset(this.offSet);
            }

            paintObj.setIsSection(!isSectionLine);

            paintObj.setRptType(rptType);
            paintObj.setTag(sKey);

            paintObj.setText(text);

            return paintObj.getKey();
        }

        private getLineRegionForControl(sKeyPaintObj: string) {
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

            let w_aspect: cReportAspect = this.paint.getPaintObject(sKeyPaintObj).getAspect();
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
        }

        private getRegionForControl(sKeyPaintObj: string, rptSection: cReportSection, isFreeCtrl: boolean) {
            let x: number = 0;
            let y: number = 0;

            let w_aspect: cReportAspect = this.paint.getPaintObject(sKeyPaintObj).getAspect();

            // Headers
            //
            x = w_aspect.getLeft();
            if (isFreeCtrl) {
                y = w_aspect.getTop();
            } 
            else {
                y = w_aspect.getTop() + w_aspect.getHeight() / 2;
            }

            if (getRegionForControlAux(this.report.getHeaders(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            // Groups Headers
            //
            if (getRegionForControlAux(this.report.getGroupsHeaders(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            // Details
            //
            if (getRegionForControlAux(this.report.getDetails(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            // Groups Footers
            //
            if (getRegionForControlAux(this.report.getGroupsFooters(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(0);
                return true;
            }

            y = y + this.offSet;

            // Footers
            //
            if (getRegionForControlAux(this.report.getFooters(), x, y, rptSection, isFreeCtrl)) {
                w_aspect.setOffset(this.offSet);
                return true;
            }

            return false;
        }

        private getRegionForControlAux(rptSections: cIReportGroupSections) {
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
        }

        private pChangeTopSection(rptSec: cReportSection) {
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

                        if (rptSecLine.getRealIndex() >= this.indexSecLnMoved && this.indexSecLnMoved > 0) {

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
                    paintSec = this.paint.getPaintSections().item(rptSecLine.getKeyPaint());
                    paintSec.getAspect().setTop(secLineAspect.getTop() + secLineAspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
                } 
                else {
                    paintSec = this.paint.getPaintSections().item(rptSec.getKeyPaint());
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
                    if (this.paint.getPaintObject(rptCtrl.getKeyPaint()) !== null) {
                        this.paint.getPaintObject(rptCtrl.getKeyPaint()).getAspect().setTop(ctrLabelAspect.getTop());
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
            paintSec = this.paint.getPaintSections().item(rptSec.getKeyPaint());

            if (paintSec !== null) {
                paintSec.getAspect().setTop(w_aspect.getTop() 
                                            + w_aspect.getHeight() 
                                            - cGlobals.C_HEIGHT_BAR_SECTION);
                paintSec.setHeightSec(w_aspect.getHeight());
            }
        }

        private moveSection(paintObj: CSReportPaint.cReportPaintObject) {
                                    float x, 
                                    float y, 
                                    float minBottom, 
                                    float maxBottom, 
                                    cReportSection secToMove, 
                                    bool isNew) 
        { 
            let oldHeight: number = 0;
            let i: number = 0;

            this.dataHasChanged = true;

            let w_aspect: cReportAspect = paintObj.getAspect();

            // if Y is contained by the premited range everything is ok
            //
            if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - this.offY);

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

            this.paint.alingToGrid(paintObj.getKey());

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

            offsetTop = oldHeight - (w_aspect.getHeight() + this.newSecLineOffSet);

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
            // apply it to every object paint in this.Paint
            //
            let pageHeight: number = 0;
            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            pGetOffSet(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                        this.report.getPaperInfo(), 
                                                        w_paperInfo.getPaperSize(), 
                                                        w_paperInfo.getOrientation()).Height, 
                                                        pageHeight);
            pRefreshOffSetInPaintObjs();
            this.paint.setGridHeight(pageHeight);
        }

        private pChangeBottomSections(secToMove: cReportSection, offsetTop: number) {

            let sec: cReportSection = null;
            let bChangeTop: boolean = false;
            let i: number = 0;

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCFOOTER 
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONFOOTER 
                || bChangeTop) {

                for (i = this.report.getFooters().count(); i <= 1; i--) {
                    sec = this.report.getFooters().item(i);

                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }
        }

        private pChangeTopSections(secToMove: cReportSection, offsetTop: number) {

            let sec: cReportSection = null;
            let bChangeTop: boolean = false;
            let i: number = 0;

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPSCHEADER 
                || secToMove.getTypeSection() === csRptTypeSection.CSRPTTPMAINSECTIONHEADER) {

                for(var _i = 0; _i < this.report.getHeaders().count(); _i++) {
                    sec = this.report.getHeaders().item(_i);
                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPGROUPHEADER || bChangeTop) {

                for(var _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                    sec = this.report.getGroupsHeaders().item(_i);
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

                for(var _i = 0; _i < this.report.getDetails().count(); _i++) {
                    sec = this.report.getDetails().item(_i);
                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if (secToMove.getTypeSection() === csRptTypeSection.CSRPTTPGROUPFOOTER || bChangeTop) {

                for(var _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                    sec = this.report.getGroupsFooters().item(_i);
                    if (bChangeTop) {
                        pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if (sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }
        }

        private pChangeHeightSection(sec: cReportSection, oldSecHeight: number) {
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
        }

        private reLoadReport() {

            let paintSec: cReportPaintObject = null;

            this.paint = null;

            this.keyMoving = "";
            this.keySizing = "";
            this.keyObj = "";
            this.keyFocus = "";
            this.moveType = csRptEditorMoveType.CSRPTEDMOVTNONE;

            this.paint = new CSReportPaint.cReportPaint();

            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.paint.setGridHeight(
                    pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                this.report.getPaperInfo(), 
                                                                w_paperInfo.getPaperSize(), 
                                                                w_paperInfo.getOrientation()).Height));

            this.paint.initGrid(this.picReport.CreateGraphics(), this.typeGrid);

            if (this.report.getName() !== "") {
                this.editorTab.Text = this.report.getPath() + this.report.getName();
            }

            let sec: cReportSection = null;

            for(var _i = 0; _i < this.report.getHeaders().count(); _i++) {
                sec = this.report.getHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), 
                                                sec.getKey(), 
                                                sec.getTypeSection(), 
                                                sec.getName(), 
                                                false));
                paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_HEADER);
            }

            for(var _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                sec = this.report.getGroupsHeaders().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), 
                                                sec.getKey(), 
                                                sec.getTypeSection(), 
                                                sec.getName(), 
                                                false));
                paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPH);
            }

            for(var _i = 0; _i < this.report.getDetails().count(); _i++) {
                sec = this.report.getDetails().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), 
                                                sec.getKey(), 
                                                sec.getTypeSection(), 
                                                sec.getName(), 
                                                false));
                paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_DETAIL);
            }

            for(var _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                sec = this.report.getGroupsFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), 
                                                sec.getKey(), 
                                                sec.getTypeSection(), 
                                                sec.getName(), 
                                                false));
                paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_GROUPF);
            }

            for(var _i = 0; _i < this.report.getFooters().count(); _i++) {
                sec = this.report.getFooters().item(_i);
                sec.setKeyPaint(paintSection(sec.getAspect(), 
                                                sec.getKey(), 
                                                sec.getTypeSection(), 
                                                sec.getName(), 
                                                false));
                paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                paintSec.setHeightSec(sec.getAspect().getHeight());
                pAddPaintSetcionForSecLn(sec, csRptTypeSection.C_KEY_SECLN_FOOTER);
            }

UNKNOWN >>             CSReportPaint.csRptPaintObjType paintType;

            for(var _i = 0; _i < this.report.getControls().count(); _i++) {

                let rptCtrl: cReportControl = this.report.getControls().item(_i);
                refreshNextNameCtrl(rptCtrl.getName());
                let ctrlAspect: cReportAspect = rptCtrl.getLabel().getAspect();

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTIMAGE 
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                    paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJIMAGE;
                } 
                else {
                    paintType = CSReportPaint.csRptPaintObjType.CSRPTPAINTOBJBOX;
                }

                let paintObj: CSReportPaint.cReportPaintObject = this.paint.getNewObject(paintType);

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
                        w_aspect.setOffset(this.offSet);
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

            this.dataHasChanged = false;

            this.paint.createPicture(this.picReport.CreateGraphics());

            this.picRule.Refresh();
        }

        private pAddPaintSetcionForSecLn(
            sec: cReportSection
			typeSecLn: csRptTypeSection) {
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
                    paintSec = this.paint.getPaintSections().item(secLine.getKeyPaint());
                    paintSec.setHeightSecLine(secLine.getAspect().getHeight());
                    paintSec.setRptType(typeSecLn);
                    paintSec.setRptKeySec(sec.getKey());
                }

                // if there is more than one section we use
                // textLine to show the name of the last line
                //
                let po: CSReportPaint.cReportPaintObject = this.paint.getPaintSections().item(sec.getKeyPaint());
                po.setTextLine(C_SECTIONLINE + sec.getSectionLines().count().ToString());
            }

            // we set the height of the last section line
            //
            paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());

            let secLines: cReportSectionLines = sec.getSectionLines();
            paintSec.setHeightSecLine(secLines.item(secLines.count()).getAspect().getHeight());
        }

        private refreshNextNameCtrl(nameCtrl: string) {
            let x: number = 0;
            if (nameCtrl.Substring(1, cGlobals.C_CONTROL_NAME.Length).ToUpper() === cGlobals.C_CONTROL_NAME.ToUpper()) {
                x = cReportGlobals.val(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1));
                if (x > this.nextNameCtrl) {
                    this.nextNameCtrl = x + 1;
                }
            }
        }

        private moveControl(sKeyPaintObj: string) {
            let rptSecLine: cReportSectionLine = null;
            let rptCtrl: cReportControl = null;
            let rptSecLineAspect: cReportAspect = null;
            let objPaintAspect: cReportAspect = null;

            this.paint.alingToGrid(sKeyPaintObj);

            rptCtrl = this.report.getControls().item(this.paint.getPaintObject(sKeyPaintObj).getTag());

            objPaintAspect = this.paint.getPaintObject(sKeyPaintObj).getAspect();

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
        }

        private showPopMenuSection(noDelete: boolean, showGroups: boolean) {
            /* TODO: implement me
            this.fmain.popSecDelete.Enabled = !noDelete;
            this.fmain.popSecPropGroup.Visible = showGroups;
            this.fmain.PopupMenu(this.fmain.popSec);
             */ 
        }

        private showPopMenuControl(clickInCtrl: boolean) {
            /* TODO: implement me
            if (!clickInCtrl) {
                this.fmain.popObjCopy.Enabled = false;
                this.fmain.popObjCut.Enabled = false;
                this.fmain.popObjDelete.Enabled = false;
                this.fmain.popObjEditText.Enabled = false;
                this.fmain.popObjSendToBack.Enabled = false;
                this.fmain.popObjBringToFront.Enabled = false;
                this.fmain.popObjSendToBack.Enabled = false;
                this.fmain.popObjProperties.Enabled = false;
            } 
            else {
                this.fmain.popObjCopy.Enabled = true;
                this.fmain.popObjCut.Enabled = true;
                this.fmain.popObjDelete.Enabled = true;
                this.fmain.popObjEditText.Enabled = true;
                this.fmain.popObjSendToBack.Enabled = true;
                this.fmain.popObjBringToFront.Enabled = true;
                this.fmain.popObjSendToBack.Enabled = true;
                this.fmain.popObjProperties.Enabled = true;
            }

            bool bPasteEnabled = false;

            if (this.vCopyKeys.Length > 0) {
                bPasteEnabled = true;
            } 
            else if (!(this.fmain.getReportCopySource() === null)) {
                bPasteEnabled = this.fmain.getReportCopySource().getVCopyKeysCount() > 0;
            }

            this.fmain.popObjPaste.Enabled = bPasteEnabled;
            this.fmain.popObjPasteEx.Enabled = bPasteEnabled;
            this.fmain.PopupMenu(w___TYPE_NOT_FOUND.popObj);
             */ 
        }

        private fGroup_UnloadForm() {
            this.fGroup = null;
        }

        private fProperties_UnloadForm() {
            this.fProperties = null;
        }

        private refreshBody() {
            try {

                this.paint.endMove(this.picReport.CreateGraphics());

            } catch (Exception ex) {
                cError.mngError(ex, "ShowConnectsAux", C_MODULE, "");
            }
        }

        private refreshRule() {
            this.picRule.Refresh();
        }

        public refreshReport() {

            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.paint.setGridHeight(pSetSizePics(
                                        CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                    this.report.getPaperInfo(), 
                                                                    w_paperInfo.getPaperSize(), 
                                                                    w_paperInfo.getOrientation()).Height));
            pValidateSectionAspect();
            reLoadReport();
        }

        // TODO: remove me if not needed
        public refreshPostion() {

        public refreshAll() {
            refreshBody();
            refreshRule();
        }

        private report_Done() {
            closeProgressDlg();
        }

        /* TODO: implement me
        private void this.report_Progress(
            String task, 
            int page, 
            int currRecord, 
            int recordCount, 
            bool cancel) 
        { 
            if (this.cancelPrinting) {
                if (cWindow.ask("Confirm you want to cancel the execution of this report?", VbMsgBoxResult.vbNo)) {
                    cancel = true;
                    closeProgressDlg();
                    return;
                } 
                else {
                    this.cancelPrinting = false;
                }
            }

            if (this.fProgress === null) { return; }

            if (page > 0) { this.fProgress.lbCurrPage.Caption = page; }
            if (task !== "") { this.fProgress.lbTask.Caption = task; }
            if (currRecord > 0) { this.fProgress.lbCurrRecord.Caption = currRecord; }
            if (recordCount > 0 && Val(this.fProgress.lbRecordCount.Caption) !== recordCount) { 
                this.fProgress.lbRecordCount.Caption = recordCount; 
            }

            double percent = 0;
            if (recordCount > 0 && currRecord > 0) {
                percent = currRecord / recordCount;
                this.fProgress.prgVar.Value = percent * 100;
            }
        }
         */

        private closeProgressDlg() {
            this.fProgress.Close();
            this.fProgress = null;
        }

        private showProgressDlg() {
            this.cancelPrinting = false;
            if (this.fProgress === null) { 
                this.fProgress = new fProgress();
                // TODO: add event for this.report_Progress
            }
            this.fProgress.Show();
            this.fProgress.BringToFront();
        }

        private fProgress_Cancel() {
            this.cancelPrinting = true;
        }

        /* TODO: implement me
        private void this.report_FindFileAccess(
            bool answer, 
            object commDialog, 
            String file) 
        { 
            String msg = "";
            msg = "The " + file + " could not be found. ¿Do you want to find it?";
            if (!cWindow.ask(msg, VbMsgBoxResult.vbYes)) { return; }

            commDialog = this.fmain.cmDialog;
            answer = true;
            this.fProgress.BringToFront();
            this.dataHasChanged = true;
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

        private pGetLeftBody() {
            if (cMainEditor.gHideLeftBar) {
                return C_LEFTBODY;
            } 
            else {
                return this.picRule.Width + C_LEFTBODY;
            }
        }

        private pSetSizePics(realPageHeight: number) {
            let pageHeight: number = 0;

            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.picReport.Width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                this.report.getPaperInfo(), 
                                                                w_paperInfo.getPaperSize(), 
                                                                w_paperInfo.getOrientation()).Width;
            pGetOffSet(realPageHeight, pageHeight);

            if (pageHeight > realPageHeight) { realPageHeight = pageHeight; }

            this.picReport.Height = realPageHeight;
            this.picRule.Height = (realPageHeight + C_TOPBODY * 2);

            return pageHeight;
        }

        private pMoveAll(x: number, y: number) {
            let rptCtrlAspect: cReportAspect = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;

            this.dataHasChanged = true;

            if (this.bNoMove) { return; }

            let i: number = 0;
            let offsetTop: number = 0;
            let offsetLeft: number = 0;
            let firstLeft: number = 0;
            let firstTop: number = 0;
            let firstOffSet: number = 0;

            if (this.vSelectedKeys.Length === 0) { return; }

            paintObj = this.paint.getPaintObject(this.keyMoving);

            let w_aspect: cReportAspect = paintObj.getAspect();
            firstLeft = w_aspect.getLeft();
            firstTop = w_aspect.getTop();
            firstOffSet = w_aspect.getOffset();

            for (i = this.vSelectedKeys.Length; i <= 1; i--) {

                paintObj = this.paint.getPaintObject(this.vSelectedKeys[i]);

                offsetLeft = pGetOffsetLeftFromControls(firstLeft,
                                                        paintObj.getAspect().getLeft());

                offsetTop = pGetOffsetTopFromControls(firstTop - firstOffSet,
                                                        paintObj.getAspect().getTop() 
                                                        - paintObj.getAspect().getOffset());

                w_aspect = paintObj.getAspect();

                if (x !== C_NOMOVE) {
                    w_aspect.setLeft(x - this.offX + offsetLeft);
                }

                if (y !== C_NOMOVE) {
                    w_aspect.setTop(y - this.offY + offsetTop);
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
                    rptCtrlAspect = this.report.getControls().item(paintObj.getTag()).getLabel().getAspect();
                    rptCtrlAspect.setLeft(w_aspect.getLeft());
                    rptCtrlAspect.setTop(w_aspect.getTop());
                    rptCtrlAspect.setWidth(w_aspect.getWidth());
                    rptCtrlAspect.setHeight(w_aspect.getHeight());
                }

                moveControl(this.vSelectedKeys[i]);
            }
        }

        private pMoveHorizontal(x: number) {
            this.dataHasChanged = true;
            this.paint.getPaintObject(this.keyMoving).getAspect().setLeft(x - this.offX);
        }

        private pMoveVertical(x: number, y: number) {
            let sKeySection: string = "";
UNKNOWN >>             csRptTypeSection rptType;

            let maxBottom: number = 0;
            let minBottom: number = 0;

            let rptSec: cReportSection = null;
            let paintObj: CSReportPaint.cReportPaintObject = null;
            let isSecLn: boolean = false;

            this.indexSecLnMoved = -1;

            paintObj = this.paint.getPaintObject(this.keyMoving);
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
                    this.indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex();
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

                this.offY = 0;
                paintObj = this.paint.getPaintSections().item(rptSec.getKeyPaint());
            }

            moveSection(paintObj, x, y, minBottom, maxBottom, rptSec, false);
        }

        private pGetSecHeigthFromSecLines(sec: cReportSection) {
            let rtn: number = 0;

            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine = sec.getSectionLines().item(_i);
                rtn = rtn + secLn.getAspect().getHeight();
            }

            return rtn;
        }

        private pGetMinBottomForSecLn(
            sec: cReportSection
            secLnKey: string
            minBottom: number) {
            for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine = sec.getSectionLines().item(_i);
                if (secLn.getKey() === secLnKey) { break; }
                minBottom = minBottom + secLn.getAspect().getHeight();
            }
            return minBottom;
        }

        private pChangeSecLnHeight(
            paintObj: CSReportPaint.cReportPaintObject
            y: number
            minBottom: number
            maxBottom: number
            secLn: cReportSectionLine) {
            let w_aspect: cReportAspect = paintObj.getAspect();

            // if Y is contained between the range allowed everything is ok
            //
            if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - this.offY);
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

            this.paint.alingToGrid(paintObj.getKey());

            // the section line height has been changed
            //
            secLn.getAspect().setHeight(w_aspect.getTop() 
                                        + cGlobals.C_HEIGHT_BAR_SECTION 
                                        - secLn.getAspect().getTop());
        }

        private pSizingControl(x: number, y: number) {
            let i: number = 0;
            let height: number = 0;
            let width: number = 0;
            let left: number = 0;
            let top: number = 0;

            if (this.vSelectedKeys.Length === 0) { return; }

            this.dataHasChanged = true;

            // first we need to modify the control which has its size changed
            //
            let w_getPaintObject: cReportPaintObject = this.paint.getPaintObject(this.keySizing);
            let w_aspect: cReportAspect = w_getPaintObject.getAspect();

            // orginal size to know how much it has changed
            //
            height = w_aspect.getHeight();
            width = w_aspect.getWidth();
            left = w_aspect.getLeft();
            top = w_aspect.getTop();

            switch (this.moveType) {
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

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {

                if (this.keySizing !== this.vSelectedKeys[i]) {

                    w_getPaintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                    w_aspect = w_getPaintObject.getAspect();

                    w_aspect.setHeight(w_aspect.getHeight() + height);
                    w_aspect.setTop(w_aspect.getTop() + top);
                    w_aspect.setWidth(w_aspect.getWidth() + width);
                    w_aspect.setLeft(w_aspect.getLeft() + left);

                    pMoveControl(w_getPaintObject.getAspect(), false);
                }
            }
        }

        private pMoveControl(aspect: cReportAspect, bSizing: boolean) {
            public C_MIN_WIDTH: number = 10;
            public C_MIN_HEIGHT: number = 10;

            let rptCtrlAspect: cReportAspect = null;

            if (this.paint.getPaintObject(this.keySizing).getRptType() === csRptTypeSection.CONTROL) {
                rptCtrlAspect = this.report.getControls().item(this.paint.getPaintObject(this.keySizing).getTag()).getLabel().getAspect();
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

            switch (this.moveType) {
                case  csRptEditorMoveType.CSRPTEDMOVDOWN:
                    this.paint.alingObjBottomToGrid(this.keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFT:
                    this.paint.alingObjLeftToGrid(this.keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHT:
                    this.paint.alingObjRightToGrid(this.keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVUP:
                    this.paint.alingObjTopToGrid(this.keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                    this.paint.alingObjLeftBottomToGrid(this.keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                    this.paint.alingObjLeftTopToGrid(this.keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                    this.paint.alingObjRightBottomToGrid(this.keySizing);
                    break;
                case  csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                    this.paint.alingObjRightTopToGrid(this.keySizing);
                    break;
            }

            // Validations

            // Width can't be lower than C_MIN_WIDTH
            //
            if (aspect.getWidth() < C_MIN_WIDTH) { aspect.setWidth(C_MIN_WIDTH); }

            // Height can't be lower than C_MIN_HEIGHT
            //
            if (aspect.getHeight() < C_MIN_HEIGHT) { aspect.setHeight(C_MIN_HEIGHT); }
        }

        private pMoveHeader(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {
                minBottom = C_MIN_HEIGHT_SECTION;
            } 
            else {
                // bottom of previous header + C_Min_Height_Section
                let w_aspect: cReportAspect = this.report.getHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getTop() + w_aspect.getHeight() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = this.picReport.Height;

            return rptSec;
        }

        private pMoveGroupHeader(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getGroupsHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {
                // bottom of previous header + C_Min_Height_Section
                let w_headers: cReportSections = this.report.getHeaders();
                let w_aspect: cReportAspect = w_headers.item(w_headers.count()).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } 
            else {
                // bottom of previous group header + C_Min_Height_Section
                let w_aspect: cReportAspect = this.report.getGroupsHeaders().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = this.picReport.Height;

            return rptSec;
        }

        private pMoveDetails(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getDetails().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------

            if (index === 1) {
                // if there are groups
                //
                if (this.report.getGroupsHeaders().count() > 0) {
                    // top of the last group header + C_Min_Height_Section
                    let w_groupsHeaders: cIReportGroupSections = this.report.getGroupsHeaders();
                    let w_aspect: cReportAspect = w_groupsHeaders.item(w_groupsHeaders.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } 
                else {
                    // top of the last header + C_Min_Height_Section
                    let w_headers: cReportSections = this.report.getHeaders();
                    let w_aspect: cReportAspect = w_headers.item(w_headers.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
            } 
            else {
                // top of the previous detail + C_Min_Height_Section
                //
                let w_aspect: cReportAspect = this.report.getDetails().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = this.picReport.Height;

            return rptSec;
        }

        private pMoveGroupFooter(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getGroupsFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {
                // bottom of the last detail + C_Min_Height_Section
                //
                let w_details: cReportSections = this.report.getDetails();
                let w_aspect: cReportAspect = w_details.item(w_details.count()).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            } 
            else {
                // bottom of the previous group footer + C_Min_Height_Section
                //
                let w_aspect: cReportAspect = this.report.getGroupsFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }
            maxBottom = this.picReport.Height;

            return rptSec;
        }

        private pMoveFooter(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean) {

            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 1) {

                // if there are groups
                //
                if (this.report.getGroupsFooters().count() > 0) {

                    // the bottom of the last group footer
                    //
                    let w_groupsFooters: cIReportGroupSections = this.report.getGroupsFooters();
                    let w_aspect: cReportAspect = w_groupsFooters.item(w_groupsFooters.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                } 
                else {
                    // bottom of the last detail
                    //
                    let w_details: cReportSections = this.report.getDetails();
                    let w_aspect: cReportAspect = w_details.item(w_details.count()).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
            } 
            else {
                // bottom of the previous footer
                //
                let w_aspect: cReportAspect = this.report.getFooters().item(index - 1).getAspect();
                minBottom = w_aspect.getHeight() + w_aspect.getTop() - this.offSet + C_MIN_HEIGHT_SECTION;
            }

            if (!isForSectionLine) {
                minBottom = pGetMinBottomWithSecLn(rptSec.getSectionLines(), minBottom);
            }

            maxBottom = this.picReport.Height;

            return rptSec;
        }

        private pGetMinBottomWithSecLn(secLns: cReportSectionLines, minBottom: number) {
            let i: number = 0;

            for (i = 1; i <= secLns.count() - 1; i++) {
                minBottom = minBottom + secLns.item(i).getAspect().getHeight();
            }

            return minBottom;
        }

        private pGetOffSet(realPageHeight: number, rtnPageHeight: number) {
            let sec: cReportSection = null;

            rtnPageHeight = 0;

            for(var _i = 0; _i < this.report.getHeaders().count(); _i++) {
                sec = this.report.getHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                sec = this.report.getGroupsHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < this.report.getDetails().count(); _i++) {
                sec = this.report.getDetails().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                sec = this.report.getGroupsFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < this.report.getFooters().count(); _i++) {
                sec = this.report.getFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            this.offSet = realPageHeight - rtnPageHeight;

            if (this.offSet < 0) { this.offSet = 0; }
        }

        private pRefreshOffSetInPaintObjs() {
            let sec: cReportSection = null;
            let secLines: cReportSectionLine = null;
            let ctl: cReportControl = null;

            let w_paintSections: cReportPaintObjects = this.paint.getPaintSections();
                for(var _i = 0; _i < this.report.getFooters().count(); _i++) {
                    sec = this.report.getFooters().item(_i);
                    w_paintSections.item(sec.getKeyPaint()).getAspect().setOffset(this.offSet);
                    for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                        secLines = sec.getSectionLines().item(_j);
                        if (secLines.getKeyPaint() !== "") {
                            w_paintSections.item(secLines.getKeyPaint()).getAspect().setOffset(this.offSet);
                        }
                        for(var _k = 0; _k < secLines.getControls().count(); _k++) {
                            ctl = secLines.getControls().item(_k);
UNKNOWN >>                             CSReportPaint.cReportPaintObject po;
                            po = this.paint.getPaintObjects().item(ctl.getKeyPaint());
                            po.getAspect().setOffset(this.offSet);
                        }
                    }
                }
        }

        // if the click was over a control which is not part of the
        // selected controls collection we clear the selected collection
        // and add the control which was clicked to the selected collection
        //
        private pSetSelectForRightBttn() {
            let i: number = 0;

            for (i = 1; i <= this.vSelectedKeys.Length; i++) {
                if (this.vSelectedKeys[i] === this.keyObj) { return false; }
            }

            G.redim(this.vSelectedKeys, 1);
            this.vSelectedKeys[1] = this.keyObj;

            return true;
        }

        private pValidateSectionAspect() {
            let sec: cReportSection = null;
            let top: number = 0;
            let i: number = 0;

            for(var _i = 0; _i < this.report.getHeaders().count(); _i++) {
                sec = this.report.getHeaders().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            for(var _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                sec = this.report.getGroupsHeaders().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            for(var _i = 0; _i < this.report.getDetails().count(); _i++) {
                sec = this.report.getDetails().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            for(var _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                sec = this.report.getGroupsFooters().item(_i);
                top = pValidateSectionAspecAux(top, sec);
            }

            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            top = CSReportPaint.cGlobals.getRectFromPaperSize(this.report.getPaperInfo(),
                                                    w_paperInfo.getPaperSize(), 
                                                    w_paperInfo.getOrientation()).Height;

            for (i = this.report.getFooters().count(); i <= 1; i--) {
                sec = this.report.getFooters().item(i);
                top = top - sec.getAspect().getHeight();
                pValidateSectionAspecAux(top, sec);
            }
        }

        private pValidateSectionAspecAux(top: number, sec: cReportSection) {
            let secLn: cReportSectionLine = null;
            let topLn: number = 0;
            let i: number = 0;
            let secLnHeight: number = 0;
            let width: number = 0;

            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                    this.report.getPaperInfo(), 
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
        }

        public showControls() {
            try {

                Application.DoEvents();

                this.fControls = cGlobals.getCtrlBox(this);
                cGlobals.clearCtrlBox(this);
                this.fControls.addCtrls(this.report);
                this.fControls.Show(this.fmain);

            } catch (Exception ex) {
                cError.mngError(ex, "showControls", C_MODULE, "");
            }
        }

        public showControlsTree() {
            try {

                Application.DoEvents();

                this.fTreeCtrls = cGlobals.getCtrlTreeBox(this);
                cGlobals.clearCtrlTreeBox(this);

                let ctrl: cReportControl = null;
                this.fTreeCtrls.addCtrls(this.report);
                this.fTreeCtrls.Show();

            } catch (Exception ex) {
                cError.mngError(ex, "ShowControlsTree", C_MODULE, "");
            }
        }

        private pSetInitDir() {
            if (cMainEditor.gbFirstOpen) {
                cMainEditor.gbFirstOpen = false;
                // TODO: implement me
                // this.fmain.cmDialog.InitDir = cGlobals.gWorkFolder;
            }
        }

        private forthis.Load() {
            G.redim(this.vSelectedKeys, 0);
            G.redim(this.vCopyKeys, 0);
            this.copyControls = false;
            this.copyControlsFromOtherReport = false;
            this.typeGrid = csETypeGrid.CSEGRIDPOINTS;
            this.keyboardMoveStep = 50;
        }

        /* TODO: implement me
        private void forthis.QueryUnload(int cancel, int unloadMode) {
            cancel = !saveChanges();
            if (cancel) { cGlobals.setDocActive(this); }
        }
         */

        /* TODO: implement me
        private void forthis.Unload(int cancel) {
            if (this.fmain.getReportCopySource() === this) {
                this.fmain.setReportCopySource(null);
            }
            if (fSearch.fSearch.getFReport() === this) {
                fSearch.fSearch.setFReport(null);
            }
            this.report = null;
            this.paint = null;
            this.fToolBox = null;
            this.fControls = null;
            this.fTreeCtrls = null;
            this.fConnectsAux = null;
            this.fProperties = null;
            this.fFormula = null;
            this.fGroup = null;
            this.fProgress.Hide();
            this.fProgress = null;
            cGlobals.setDocInacActive(this);
            G.redim(this.vSelectedKeys, 0);
            G.redim(this.vCopyKeys, 0);
        }
         */

        public init() {
            this.showingProperties = false;

            let oLaunchInfo: cReportLaunchInfo = null;
            this.report = new cReport();
            // TODO: event handler for
            //
            /*
                        this.report_Done();
                        this.report_Progress(task, page, currRecord, recordCount, cancel,);
                        this.report_FindFileAccess(answer, commDialog, file,);
            */
            oLaunchInfo = new cReportLaunchInfo();

            this.report.getPaperInfo().setPaperSize(this.fmain.getPaperSize());
            this.report.getPaperInfo().setOrientation(this.fmain.getOrientation());

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter());
            oLaunchInfo.setObjPaint(new CSReportPaint.cReportPrint());
            if (!this.report.init(oLaunchInfo)) { return; }

            let file: CSKernelFile.cFile = new CSKernelFile.cFile();
            this.report.setPathDefault(Application.StartupPath);

            this.picReport.Top = C_TOPBODY;
            this.picRule.Left = 0;
            this.picReport.Left = pGetLeftBody();

            this.keyMoving = "";
            this.keySizing = "";
            this.keyObj = "";
            this.keyFocus = "";
            this.nextNameCtrl = 0;

            this.paint = new CSReportPaint.cReportPaint();

            let tR: Rectangle = null;
            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            tR = new Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                this.report.getPaperInfo(), 
                                                w_paperInfo.getPaperSize(), 
                                                w_paperInfo.getOrientation()));
            cGlobals.createStandarSections(this.report, tR);
            this.paint.setGridHeight(pSetSizePics(tR.height));
            this.paint.initGrid(this.picReport.CreateGraphics(), this.typeGrid);

            paintStandarSections();

            this.dataHasChanged = false;
        }

        private pUpdateFormulas(currentName: string, newName: string) {
            let i: number = 0;
            let rptCtrl: cReportControl = null;

            for (i = 1; i <= this.report.getControls().count(); i++) {

                rptCtrl = this.report.getControls().item(i);

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
        }

        private pReplaceInFormula(formulaText: string, currentName: string, newName: string) {
            let _rtn: string = "";

            // if it isn't an internal function we give the user
            // a chance to cancel the changes
            //
            if (formulaText.Substring(0, 1).Trim() !== "_") {
                let fReplace: fFormulaReplace = null;
                fReplace = new fFormulaReplace();
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
        }

        private forthis.Activate() {
            cGlobals.setDocActive(this);
            if (fToolbox.getLoaded()) {
                if (cGlobals.getToolBox(this) !== null) { showToolBox(); }
            }
            if (fControls.getLoaded()) {
                if (cGlobals.getCtrlBox(this) !== null) { showControls(); }
            }
        }

        private forthis.Deactivate() {
            cGlobals.setDocInacActive(this);
            cGlobals.clearToolBox(this);
        }


    }    }



UNKNOWN >>     enum csAskEditResult {
        CSASKRSLTYES = 1,
        CSASKRSLTNO = 2,
        CSASKRSLTCANCEL = 3


    }    }
}
