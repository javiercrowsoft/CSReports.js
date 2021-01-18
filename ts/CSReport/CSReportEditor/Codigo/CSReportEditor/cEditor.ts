

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
        private name: string = "";

        private isNew: boolean = false;

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

            this.picReport.Paint += new PaintEventHandler(this.picReport_Paint);
            this.picRule.Paint += new PaintEventHandler(this.picRule_Paint);

            // mouse events
            //
            this.picReport.MouseDown += new MouseEventHandler(this.picReport_MouseDown);
            this.picReport.MouseUp += new MouseEventHandler(this.picReport_MouseUp);
            this.picReport.MouseMove += new MouseEventHandler(this.picReport_MouseMove);

            // tab
            //
            this.editorTab = editorTab;

            this.editorTab.Enter += (s, e) => { cMainEditor.setDocActive(this); };

            this.editorTab.Tag = this;
        }

        public constructor() {

        public close() {
            if (!saveChanges()) {
                return false;
            }
            else {

                // TODO: dispose all objects
                return true;
            }
        }

        private C_MODULE: string = "cEditor";
        private C_TOPBODY: number = 10;
        private C_LEFTBODY: number = 0;
        private C_MIN_HEIGHT_SECTION: number = 3;
        private C_SECTIONLINE: string = "Line ";

        private C_NOMOVE: number = -1111111;

        private report: cReport = null;
        private paint: cReportPaint = null;
        private keyMoving: string = "";
        private moveType: csRptEditorMoveType = null;
        private keySizing: string = "";
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
        // good explanation is found in addSectionLine
        //
        private newSecLineOffSet: number = 0;

        private bMoveVertical: boolean = false;
        private bMoveHorizontal: boolean = false;
        private bNoMove: boolean = false;

        private vSelectedKeys: string[] = new String[0];
        private vCopyKeys: string[] = new String[0];

        private fProgress: fProgress = null;
        private cancelPrinting: boolean = false;

        private formIndex: number = 0;

        private fProperties: fProperties = null;
        private fSecProperties: fSecProperties = null;
        private fFormula: fFormula = null;
        private fGroup: fGroup = null;
        private fConnectsAux: fConnectsAux = null;

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

        private keyboardMoveStep: number = 5;

        private inMouseDown: boolean = false;

        private typeGrid: csETypeGrid = csETypeGrid.CSEGRIDPOINTS;

        public getEditorTab() {
            return this.editorTab;
        }

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
            try {
                let f: fSearch = cMainEditor.getSearch(this);
                f.clear();
                if (!f.Visible) {
                    f.Show(this.fmain);
                }
            }
            catch (ex) {
                cError.mngError(ex, "showControls", C_MODULE, "");
            }
        }

        public moveVertical() {
            formKeyUp(Keys.F11, false);
        }

        public moveHorizontal() {
            formKeyUp(Keys.F12, false);
        }

        public moveNoMove() {
            formKeyUp(Keys.F9, false);
        }

        public moveAll() {
            formKeyUp(Keys.F8, false);
        }

        public showGrid(typeGrid: csETypeGrid) {
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

        public keyUp(sender: object, e: KeyEventArgs) {
            e.Handled = formKeyUp(e.KeyCode, e.Control);

            if (this.keyboardMove) {
                this.keyboardMove = false;
                this.picReport_MouseUp(this, new MouseEventArgs(MouseButtons.Left, 0, this.x, this.y, 0));
                e.Handled = true;
            }
        }

        private formKeyUp(keyCode: Keys, ctrlKey: boolean) {
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

                default:
                    return false;
            }
            return true;
        }

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

        private fSearch_EditCtrl(ctrlKey: string) {
            try {

                selectCtrl(ctrlKey);
                showProperties();

            } catch (Exception ex) {
                cError.mngError(ex, "this.fSearch_EditCtrl", C_MODULE, "");
            }
        }

        private fSearch_SetFocusSec(secKey: string) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "this.fSearch_SetFocusSec", C_MODULE, "");
            }
        }

        private editCtrl(ctrlKey: string) {
            try {

                selectCtrl(ctrlKey);
                showProperties();
            } catch (Exception ex) {
                cError.mngError(ex, "editCtrl", C_MODULE, "");
            }
        }

        public editSection(secKey: string) {
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
                cError.mngError(ex, "editCtrl", C_MODULE, "");
            }
        }

        public setFocusCtrl(ctrlKey: string) {
            try {

                selectCtrl(ctrlKey);

            } catch (Exception ex) {
                cError.mngError(ex, "setFocusCtrl", C_MODULE, "");
            }
        }

        public getSectionOrSectionLineFromKey(key: string) {
            let sec: object = getSectionOrSectionLineFromKey(key, this.report.getHeaders());
            if (sec === null) {
                sec = getSectionOrSectionLineFromKey(key, this.report.getGroupsHeaders());
                if (sec === null) {
                    sec = getSectionOrSectionLineFromKey(key, this.report.getDetails());
                    if (sec === null) {
                        sec = getSectionOrSectionLineFromKey(key, this.report.getGroupsFooters());
                        if (sec === null) {
                            sec = getSectionOrSectionLineFromKey(key, this.report.getFooters());
                        }
                    }
                }
            }

            return sec;
        }

        private getSectionOrSectionLineFromKey(key: string, sections: cIReportGroupSections) {
            for(var i = 0; i < sections.count(); i++) {
                let sec: var = sections.item(i);
                if (sec.getKey() === key) {
                    return sec;
                }
                else {
                    let secLn: var = sec.getSectionLines().item(key);
                    if (secLn !== null) {
                        return secLn;
                    }
                }
            }
            return null;
        }

        public selectSection(secKey: string) {
            try {

                pSelectSection(secKey);

            } catch (Exception ex) {
                cError.mngError(ex, "setelectSection", C_MODULE, "");
            }
        }

        public selectCtrl(ctrlKey: string) {
            let bWasRemoved: boolean = false;
            let sKey: string = "";

            G.redim(this.vSelectedKeys, 0);
            sKey = getReport().getControls().item(ctrlKey).getKeyPaint();
            pAddToSelected(sKey, false, bWasRemoved);

            if (bWasRemoved) { sKey = ""; }

            this.keyFocus = sKey;
            this.keyObj = sKey;
            this.paint.setFocus(this.keyFocus, this.picReport.CreateGraphics(), true);
            cMainEditor.showProperties(ctrlKey);
        }

        private pSelectSection(secKey: string) {
            let bIsSecLn: boolean = false;
            pSelectSection(secKey, bIsSecLn);
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
            this.paint.setFocus(this.keyFocus, this.picReport.CreateGraphics(), true);
            cMainEditor.showProperties("S" + secKey);
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

        public checkSyntax(code: string) {
            let f: cReportFormula = null;

            f = new cReportFormula();

            if (this.fProperties !== null) {
                f.setName(this.fProperties.getFormulaName());
            }
            else if (this.fSecProperties !== null) {
                f.setName(this.fSecProperties.getFormulaName());
            }
            else {
                f.setName(cMainEditor.getCtrlTreeBox().getFormulaName());
            }

            f.setText(code);

            return this.report.getCompiler().checkSyntax(f);
        }

        public showHelpChartField(ctrl: TextBox, idx: number) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

            sField = ctrl.Text;
            nFieldType = this.fProperties.getChartFieldType(idx);
            nIndex = this.fProperties.getChartIndex(idx);

            if (cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                ctrl.Text = sField;
                this.fProperties.setChartFieldType(idx, nFieldType);
                this.fProperties.setChartIndex(idx, nIndex);
                return true;
            }
            else {
                return false;
            }
        }

        public showHelpChartGroupField() {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

            sField = this.fProperties.getDbFieldGroupValue();
            nFieldType = this.fProperties.getChartGroupFieldType();
            nIndex = this.fProperties.getChartGroupIndex();

            if(cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                this.fProperties.setDbFieldGroupValue(sField);
                this.fProperties.setChartGroupFieldType(nFieldType);
                this.fProperties.setChartGroupIndex(nIndex);
                return true;
            }
            else {
                return false;
            }
        }

        public showEditFormula(formula: string) {

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

                this.fFormula.setHandler(this);

                this.fFormula.expandTree();

                //
                // TODO: end functionality to move

                this.fFormula.ShowDialog();

                if (this.fFormula.getOk()) {
                    formula = this.fFormula.getFormula();
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
                this.fFormula.Hide();
                this.fFormula = null;
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

        public keyDown(sender: object, e: KeyEventArgs) {
            let keyCode: Keys = e.KeyCode;
            let shift: boolean = e.Shift;
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

                e.Handled = true;

                let x: number = 0;
                let y: number = 0;

                if (this.vSelectedKeys.Length < 1) { return; }

                if (!this.keyboardMove) {
                    aspect = this.paint.getPaintObject(this.vSelectedKeys[0]).getAspect();
                    y = Convert.ToInt32(aspect.getTop());
                    x = Convert.ToInt32(aspect.getLeft());
                }
                else {
                    y = this.y;
                    x = this.x;
                }

                // resize
                //
                if (shift) {

                    if (this.keySizing === "") {
                        this.keySizing = this.paint.getPaintObject(this.vSelectedKeys[0]).getKey();
                    }

                    if (!this.keyboardMove) {

                        aspect = this.paint.getPaintObject(this.vSelectedKeys[0]).getAspect();
                        y += Convert.ToInt32(aspect.getHeight());
                        x += Convert.ToInt32(aspect.getWidth());

                        pSetMovingFromKeyboard(x, y);

                        if (this.keySizing === "") {
                            this.keySizing = this.paint.getPaintObject(this.vSelectedKeys[0]).getKey();
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
                        this.keyMoving = this.paint.getPaintObject(this.vSelectedKeys[0]).getKey();
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

                this.picReport_MouseMove(this, new MouseEventArgs(MouseButtons.Left, 0, x, y, 0));
                this.x = x;
                this.y = y;

                this.keyboardMove = true;

            } catch (Exception ex) {
                cError.mngError(ex, "this.picReport_KeyDown", C_MODULE, "");
            }
        }

        private pSetMovingFromKeyboard(x: number, y: number) {

            this.keyMoving = this.keyFocus;

            let po: cReportPaintObject = this.paint.getPaintObject(this.keyMoving);

            switch (po.getTag()) {
                case cGlobals.C_KEY_DETAIL:
                case cGlobals.C_KEY_FOOTER:
                case cGlobals.C_KEY_HEADER:
                    this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                    this.picReport.Cursor = Cursors.SizeNS;
                    break;
                default:
                    if (po.getRptType() === csRptSectionType.DETAIL
                        || po.getRptType() === csRptSectionType.HEADER
                        || po.getRptType() === csRptSectionType.GROUP_HEADER
                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                        || po.getRptType() === csRptSectionType.FOOTER) {

                        this.picReport.Cursor = Cursors.SizeNS;
                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;

                    }
                    else if (po.getRptType() === csRptSectionType.SECLN_HEADER
                        || po.getRptType() === csRptSectionType.SECLN_DETAIL
                        || po.getRptType() === csRptSectionType.SECLN_FOOTER
                        || po.getRptType() === csRptSectionType.SECLN_GROUPH
                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) {

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

        private picReport_MouseDown(sender: object, e: System.Windows.Forms.MouseEventArgs) {
            if (this.paint === null) return; {

            let button: MouseButtons = e.Button;
            let ctrlKey: boolean = Control.ModifierKeys.HasFlag(Keys.Control) || Control.ModifierKeys.HasFlag(Keys.Shift);
            let x: number = e.X;
            let y: number = e.Y;

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

                            let po: cReportPaintObject = this.paint.getPaintObject(sKey);
                            lastKeyMoving = this.keyMoving;
                            this.keyMoving = sKey;

                            switch (po.getTag())
                            {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:

                                    // only if no controls are selected
                                    //
                                    if (ctrlKey) {

                                        if (this.vSelectedKeys.Length > 0) {
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
                                    if (po.getRptType() === csRptSectionType.DETAIL
                                        || po.getRptType() === csRptSectionType.HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                                        || po.getRptType() === csRptSectionType.FOOTER) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) {

                                            if (this.vSelectedKeys.Length > 0) {
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
                                    else if (po.getRptType() === csRptSectionType.SECLN_HEADER
                                        || po.getRptType() === csRptSectionType.SECLN_DETAIL
                                        || po.getRptType() === csRptSectionType.SECLN_FOOTER
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPH
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) {

                                        // only if no controls are selected
                                        //
                                        if (ctrlKey) {
                                            if (this.vSelectedKeys.Length > 0) {
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
                    this.paint.setFocus(this.keyFocus, this.picReport.CreateGraphics(), bClearSelected);

                    let poSelected: cReportPaintObject = this.paint.getPaintObject(sKey);
                    if (poSelected !== null) {
                        cMainEditor.showProperties(
                            poSelected.getIsSection()
                            ? "S" + poSelected.getTag()
                            : poSelected.getTag());
                    }
                }
                else if (button === MouseButtons.Right) {
                    this.keySizing = "";
                    this.keyMoving = "";
                    this.keyObj = "";

                    if (this.paint.pointIsInObject(x, y, sKey)) {
                        this.keyObj = sKey;

                        bClearSelected = pSetSelectForRightBttn();

                        this.keyFocus = sKey;
                        this.paint.setFocus(this.keyFocus, this.picReport.CreateGraphics(), bClearSelected);

                        let po: cReportPaintObject = this.paint.getPaintObject(sKey);

                        if (this.paint.paintObjIsSection(sKey)) {

                            let noDelete: boolean = false;

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

                            let isGroup: boolean = false;
                            let isSecLn: boolean = false;

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

                cGlobals.setEditAlignTextState(this.vSelectedKeys.Length);
                cGlobals.setEditAlignCtlState(this.vSelectedKeys.Length > 1);
                pSetEditAlignValue();
                pSetFontBoldValue();

            }
            catch (ex) {
                cError.mngError(ex, "this.picReport_MouseDown", C_MODULE, "");
            }
UNKNOWN >>             finally
            {
                this.inMouseDown = false;
            }
        }

        public setFontBold() {
            let bBold: number = -2;
            let bBoldValue: boolean = false;

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {
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

            let paintObject: cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {

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
            let bBold: number = -2;

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {
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
            let paintObject: cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            let top: number = 0;
            let left: number = 0;

            let newTop: number = 0;
            let newLeft: number = 0;
            let height: number = 0;
            let width: number = 0;
UNKNOWN >>             cReportAspect aspect;

            switch (align) {

                case csECtlAlignConst.csECtlAlignHeight:
                case csECtlAlignConst.csECtlAlignWidth:

                    aspect = this.paint.getPaintObject(this.vSelectedKeys[0]).getAspect();
                    height = aspect.getHeight();
                    width = aspect.getWidth();
                    break;

                case csECtlAlignConst.csECtlAlignVertical:
                case csECtlAlignConst.csECtlAlignHorizontal:

                    aspect = this.paint.getPaintObject(this.vSelectedKeys[0]).getAspect();
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

                    for(var i = 0; i < this.vSelectedKeys.Length; i++) {

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

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {

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
            let paintObject: cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {

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

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {
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
            if (sKey === "") { return; }

            bWasRemoved = false;

            if (ctrlKey) {

                for(var i = 0; i < this.vSelectedKeys.Length; i++) {

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
            if (sKey === "") {
                return true;
            }

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {
                if (this.vSelectedKeys[i] === sKey) {
                    return true;
                }
            }
            return false;
        }

        private pRemoveFromSelected(sKey: string) {
UNKNOWN >>             int i;

            for (i = 0; i < this.vSelectedKeys.Length; i++) {
                if (this.vSelectedKeys[i] === sKey) {
                    break;
                }
            }

            if (i > this.vSelectedKeys.Length) { return; }
            for (i = i + 1; i < this.vSelectedKeys.Length; i++) {
                this.vSelectedKeys[i - 1] = this.vSelectedKeys[i];
            }
            if (this.vSelectedKeys.Length > 0) {
                G.redimPreserve(this.vSelectedKeys, this.vSelectedKeys.Length - 1);
            }
            else {
                G.redim(this.vSelectedKeys, 0);
            }

            this.paint.removeFromSelected(sKey, this.picReport.CreateGraphics());
        }

        private pClearSelected(button: MouseButtons, ctrlKey: boolean, x: number, y: number) {
            let sKey: string = "";

            if (!ctrlKey && button !== MouseButtons.Right) {
                this.paint.pointIsInObject(x, y, sKey);
                for(var i = 0; i < this.vSelectedKeys.Length; i++) {
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

            for (i = this.vSelectedKeys.Length-1; i > -1; i--) {

                aspect = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect();
                offsetLeft = pGetOffsetLeftFromControls(firstLeft, aspect.getLeft());
                offsetTop = pGetOffsetTopFromControls(firstTop, aspect.getTop());
                offSet2 = aspect.getOffset();

                if (this.bMoveHorizontal) {
                    this.paint.moveObjToXYEx(this.keyMoving,
                                            x - this.offX + offsetLeft,
                                            firstTop - offSet2 + offsetTop,
                                            this.picReport.CreateGraphics(),
                                            clear);
                }
                else if (this.bMoveVertical) {
                    this.paint.moveObjToXYEx(this.keyMoving,
                                            firstLeft + offsetLeft,
                                            y - this.offY + offsetTop,
                                            this.picReport.CreateGraphics(),
                                            clear);
                }
                else {
                    this.paint.moveObjToXYEx(this.keyMoving,
                                            x - this.offX + offsetLeft,
                                            y - this.offY + offsetTop,
                                            this.picReport.CreateGraphics(),
                                            clear);
                }

                if (clear) { clear = false; }
            }
        }

        private picReport_MouseMove(sender: object, e: System.Windows.Forms.MouseEventArgs) {
            if (this.paint === null) return; {

            let button: MouseButtons = e.Button;
            let x: number = e.X;
            let y: number = e.Y;

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
                            this.paint.moveHorizontal(this.keyMoving, x, this.picReport.CreateGraphics());
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
                            this.paint.moveVertical(this.keyMoving, y, this.picReport.CreateGraphics());
                            break;
                    }

                    this.moving = true;

                }
                else if (this.keySizing !== "") {
                    switch (this.moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVDOWN:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFT:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVUP:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                            this.paint.resize(this.picReport.CreateGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE);
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
                        let po: cReportPaintObject = this.paint.getPaintObject(sKey);

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

                                if (po.getRptType() === csRptSectionType.DETAIL
                                    || po.getRptType() === csRptSectionType.HEADER
                                    || po.getRptType() === csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                                    || po.getRptType() === csRptSectionType.FOOTER) {

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
                    let po: cReportPaintObject = this.paint.getPaintObject(sKey);
                    if (po.getRptType() === csRptSectionType.CONTROL) {
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
                    + "]F.Hide:[" + cUtil.subString(formulaHide, 1, 100)
                    + "]Activa[" + ( hasFormulaHide).ToString()
                    + "]F.Value:[" + cUtil.subString(formulaValue, 1, 100)
                    + "]Activa[" + ( hasFormulaValue).ToString()
                    + "]Field:[" + fieldName + "]";
            }
            this.fmain.setsbPnlCtrl(msg);
        }

        private picReport_MouseUp(sender: object, e: System.Windows.Forms.MouseEventArgs) {
            if (this.paint === null) return; {

            let button: MouseButtons = e.Button;
            let x: number = e.X;
            let y: number = e.Y;

            // to avoid reentrancy
            if (this.opening) { return; }

            //----------------------------------------------------
            // MOVING
            //----------------------------------------------------

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
                    pResizeControl(x, y);
                }

                refreshBody();
                this.moving = false;
                refreshRule();
            }

            this.keySizing = "";
            this.keyMoving = "";
        }

        private picReport_Paint(sender: object, e: PaintEventArgs) {
            if (this.paint !== null) {
                this.paint.paintPicture(e.Graphics, false);
            }
        }

        private picRule_Paint(sender: object, e: PaintEventArgs) {
            if (this.paint !== null) {
                let ps: cReportPaintObjects = this.paint.getPaintSections();
                for(var i = 0; i < ps.count(); i++) {
                    this.paint.drawRule(ps.getNextKeyForZOrder(i), e.Graphics);
                }
            }
        }

        public setParameters() {
            let connect: CSConnect.cConnect = new CSConnect.cConnect();
            let param: cParameter = null;

            for(var _i = 0; _i < this.report.getConnect().getParameters().count(); _i++) {
                param = this.report.getConnect().getParameters().item(_i);
                let connectParam: CSConnect.cParameter = connect.getParameters().add(null, "");
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
                this.report.getConnect().getDataSourceType())) {
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

                if (cMainEditor.getToolbox(this) !== null) { showToolbox(); }

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
            let sec: cReportSection = null;
            let secs: cReportSections = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;
            let paintObj: cReportPaintObject = null;

            let isGroupFooter: boolean = false;
            let isGroupHeader: boolean = false;
            let isSecLn: boolean = false;

            if (this.keyFocus === "") { return; }

            let group: cReportGroup = null;
            let secG: cReportSection = null;

            if (this.paint.paintObjIsSection(this.keyFocus)) {
                if (this.paint.getPaintSections().item(this.keyFocus) === null) { return; }

                let po: cReportPaintObject = this.paint.getPaintSections().item(this.keyFocus);

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
                            + what + " and all the controls it contains? ", MessageBoxDefaultButton.Button2)) {
                    return;
                }

                if (isSecLn) {

                    for(var _i = 0; _i < secLn.getControls().count(); _i++) {
                        ctrl = secLn.getControls().item(_i);
                        for(var i = 0; i < this.paint.getPaintObjects().count(); i++) {
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
                            for(var i = 0; i < this.paint.getPaintObjects().count(); i++) {
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
                                for(var i = 0; i < this.paint.getPaintObjects().count(); i++) {
                                    paintObj = this.paint.getPaintObjects().item(i);
                                    if (paintObj.getTag() === ctrl.getKey()) {
                                        this.paint.getPaintObjects().remove(paintObj.getKey());
                                        break;
                                    }
                                }
                            }
                        }

                        for(var i = 0; i < this.paint.getPaintSections().count(); i++) {
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

                pValidateSectionAspect();
                updateSectionNameInPaintObjects();
            }
            else {
                paintObj = this.paint.getPaintObjects().item(this.keyFocus);
                if (paintObj === null) { return; }

                if (!cWindow.ask("Confirm you want to delete the control? ", MessageBoxDefaultButton.Button2)) { return; }

                for(var i = 0; i < this.vSelectedKeys.Length; i++) {
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

        private updateSectionNameInPaintObjects() {
            updateSectionNameInPaintObjects(this.report.getHeaders());
            updateSectionNameInPaintObjects(this.report.getFooters());
            updateSectionNameInPaintObjects(this.report.getDetails());
            updateSectionNameInPaintObjects(this.report.getGroupsHeaders());
            updateSectionNameInPaintObjects(this.report.getGroupsFooters());
        }

        private updateSectionNameInPaintObjects(sections: cIReportGroupSections) {
            for(var i =0; i < sections.count(); i++) {
                let sec: var = sections.item(i);
                let paintObj: var = this.paint.getPaintSections().item(sec.getKeyPaint());
                if (paintObj !== null) {
                    paintObj.setText(sec.getName());
                }
            }            
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
                    if (secAux.getTypeSection() === csRptSectionType.MAIN_HEADER) {
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
                        if (secAux.getTypeSection() === csRptSectionType.MAIN_FOOTER) {
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
            this.controlType = csRptEditCtrlType.field;
            this.fieldName = sField;
            this.formulaText = "";
            this.fieldIndex = nIndex;
            this.fieldType = nFieldType;
        }

        public addLabel() {
            pAddLabelAux(csRptEditCtrlType.label);
        }

        public addLineLabel() {
            pAddLabelAux(csRptEditCtrlType.lineLabel);
        }

        public addImage() {
            pAddLabelAux(csRptEditCtrlType.image);
        }

        public addChart() {
            pAddLabelAux(csRptEditCtrlType.chart);
        }

        public pAddLabelAux(ctrlType: csRptEditCtrlType) {
            beginDraging();
            this.controlName = "";
            this.controlType = ctrlType;
            this.fieldName = "";
            this.formulaText = "";
            this.fieldIndex = 0;
            this.fieldType = 0;
        }

        private addControlEnd(left: number, top: number) {

            this.draging = false;

            if (this.controlType === csRptEditCtrlType.none) {
                return true;
            }

            this.dataHasChanged = true;

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

                for(var i = this.vCopyKeys.Length-1; i > -1; i--) {

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

                    if (left - 26 > this.picReport.Width) {
                        left = originalLeft + (offSet % originalLeft);
                        top += 6;
                    }

                    if (top > this.picReport.Height) {
                        top = this.picReport.Height - 6;
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
            ctrl = this.report.getHeaders().item(cGlobals.C_KEY_HEADER).getSectionLines().item(0).getControls().add();

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
            public CTRL_HEIGHT: number = 19;
            public CTRL_WIDTH: number = 133;
            public LINE_HEIGHT: number = 1;

            let label: cReportLabel = null;
            let aspect: cReportAspect = null;

            let ctrlHeigth: number = CTRL_HEIGHT;
            let transparent: boolean = true;

            ctrl.getLabel().getAspect().setAlign(CSReportGlobals.HorizontalAlignment.Left);

            switch (this.controlType) {
                case csRptEditCtrlType.field:
                    ctrl.setControlType(csRptControlType.CSRPTCTFIELD);
                    ctrl.getLabel().setText(this.fieldName);
                    let field: cReportField = ctrl.getField();
                    field.setIndex(this.fieldIndex);
                    field.setName(this.fieldName);
                    field.setFieldType(this.fieldType);

                    if (cDatabaseGlobals.isNumberField(this.fieldType)) {
                        aspect = ctrl.getLabel().getAspect();
                        aspect.setAlign(CSReportGlobals.HorizontalAlignment.Right);
                        aspect.setFormat("#0.00;-#0.00");
                    }
                    break;

                case csRptEditCtrlType.formula:
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    ctrl.getFormulaValue().setText(this.formulaText + "(" + this.controlName + ")");
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
                    label.setText(this.fieldName);
                    label.getAspect().getFont().setBold(true);
                    break;

                case csRptEditCtrlType.lineLabel:
                    ctrlHeigth = LINE_HEIGHT;
                    ctrl.setControlType(csRptControlType.CSRPTCTLABEL);
                    label = ctrl.getLabel();
                    label.setText(this.fieldName);
                    aspect = label.getAspect();
                    aspect.getFont().setBold(true);
                    aspect.setBackColor(Color.Gray.ToArgb());
                    transparent = false;
                    break;

                case csRptEditCtrlType.image:
                    ctrl.setControlType(csRptControlType.CSRPTCTIMAGE);
                    ctrl.getLabel().setText(this.fieldName);
                    break;

                case csRptEditCtrlType.chart:
                    ctrl.setControlType(csRptControlType.CSRPTCTCHART);
                    ctrl.getLabel().setText(this.fieldName);
                    break;
            }

            aspect = ctrl.getLabel().getAspect();
            aspect.setWidth(CTRL_WIDTH);
            aspect.setHeight(ctrlHeigth);
            aspect.setTransparent(transparent);
        }

        private pSetNewControlPosition(ctrl: cReportControl, left: number, top: number) {
            let aspect: cReportAspect = ctrl.getLabel().getAspect();
            aspect.setLeft(left);
            aspect.setTop(top);

            let paintObj: cReportPaintObject = null;
            let paintType: csRptPaintObjType = csRptPaintObjType.CSRPTPAINTOBJBOX;

            if (ctrl.getControlType() === csRptControlType.CSRPTCTIMAGE
                || ctrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
            }

            paintObj = this.paint.getNewObject(paintType);

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

            this.paint.drawObject(paintObj.getKey(), this.picReport.CreateGraphics());
        }

        public addGroup() {
            pShowGroupProperties(null);
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

        public addSectionLine() {
            let sec: cReportSection = null;
            let aspect: cReportAspect = null;
            let isGroup: boolean = false;

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
                    this.newSecLineOffSet = cGlobals.C_HEIGHT_NEW_SECTION;

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
            this.newSecLineOffSet = 0;
        }

        private pAddSectionLinesAux(sec: cReportSection) {
            let typeSecLn: csRptSectionType = csRptSectionType.CONTROL;
            let aspect: cReportAspect = null;
            let maxBottom: number = 0;
            let minBottom: number = 0;
            let index: number = 0;
            let y: number = 0;

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
                    this.offY = 0;
                    y = aspect.getHeight() + aspect.getTop() - this.offSet - cGlobals.C_HEIGHT_BAR_SECTION;
                    typeSecLn = csRptSectionType.SECLN_FOOTER;
                    index = 0;
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
                                C_SECTIONLINE + (sec.getSectionLines().count() - 2).ToString(),
                                true));

            // section line
            let po: cReportPaintObject = this.paint.getPaintSections().item(secL.getKeyPaint());
            po.setRptType(typeSecLn);
            po.setRptKeySec(sec.getKey());

            // section
            po = this.paint.getPaintSections().item(sec.getKeyPaint());
            po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString());

            moveSection(this.paint.getPaintSections().item(this.keyFocus), 0, y, minBottom, maxBottom, sec, false);

            refreshBody();
            refreshRule();
        }

        public addSection(typeSection: csRptSectionType) {

            if (!this.editor.Visible) {
                return;

            let rptSection: cReportSection = null;
            let topSec: cReportSection = null;
            let w_aspect: cReportAspect = null;
            let aspect: cReportAspect = null;
            let paintObj: cReportPaintObject = null;

            let maxBottom: number = 0;
            let minBottom: number = 0;
            let y: number = 0;

            switch (typeSection) {
                case csRptSectionType.HEADER:
                    let w_headers: cReportSections = this.report.getHeaders();
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
                    moveSection(this.paint.getPaintObject(rptSection.getKeyPaint()),
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

                    let w_groupsHeaders: cIReportGroupSections = this.report.getGroupsHeaders();
                    rptSection = w_groupsHeaders.item(w_groupsHeaders.count() - 1);
                    rptSection.setName("G_" + rptSection.getIndex().ToString());

                    // the first group is next to the last header
                    //
                    if (w_groupsHeaders.count() === 1) {
                        topSec = this.report.getHeaders().item(this.report.getHeaders().count() - 1);
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
                    moveSection(this.paint.getPaintObject(rptSection.getKeyPaint()),
                                0,
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                w_aspect.getTop(),
                                w_aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                rptSection,
                                true);
                    break;

                case csRptSectionType.GROUP_FOOTER:

                    let w_groupsFooters: cIReportGroupSections = this.report.getGroupsFooters();
                    rptSection = w_groupsFooters.item(0);
                    rptSection.setName("G_" + rptSection.getIndex().ToString());

                    // all group footers are added to the top so at the
                    // beginning they are next to the detail section
                    //

                    topSec = this.report.getDetails().item(this.report.getDetails().count() - 1);

                    w_aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(w_aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(w_aspect.getTop() + w_aspect.getHeight());

                    rptSection.setKeyPaint(paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.GROUP_FOOTER,
                                                        rptSection.getName(),
                                                        false));

                    paintObj = this.paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveGroupFooter(rptSection.getKey(), minBottom, maxBottom);

                    this.offY = 0;

                    w_aspect = rptSection.getAspect();
                    y = w_aspect.getHeight() + w_aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION;

                    moveSection(paintObj, 0, y, minBottom, maxBottom, rptSection, true);
                    break;

                case csRptSectionType.FOOTER:
                    let w_footers: cReportSections = this.report.getFooters();

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

                    paintObj = this.paint.getPaintObject(rptSection.getKeyPaint());
                    pMoveFooter(rptSection.getKey(), minBottom, maxBottom);

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
                this.report.getLaunchInfo().setObjPaint(new cReportPrint());
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
                let isNew: boolean = this.isNew || this.report.getName() === "";

                if (isNew) {
                    this.report.setName(this.name);
                }

                if (saveAs) {
                    isNew = true;
                }

                setZOrder();

                pValidateSectionAspect();

                if (this.report.save(this.fmain.saveFileDialog, isNew)) {
                    this.isNew = false;
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
        }

        private setZOrder() {
            let ctrl: cReportControl = null;
            for(var _i = 0; _i < this.report.getControls().count(); _i++) {
                ctrl = this.report.getControls().item(_i);
                ctrl.getLabel().getAspect().setNZOrder(this.paint.getPaintObjects().getZOrderForKey(ctrl.getKeyPaint()));
            }
        }

        public newReport(report: cReport) {

            this.isNew = true;

            if (report !== null) {

                this.report = report;

                pValidateSectionAspect();
                reLoadReport();

            }
            else {

                this.report.setName("New report");

                this.paint.createPicture(this.picReport.CreateGraphics());
                refreshRule();

            }

            cMainEditor.setDocActive(this);
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

                    if (!this.report.load(this.fmain.openFileDialog)) {

                        if (this.report.getName() === "") {
                            return false;
                    }

                }
                else {

                    if (!this.report.loadSilent(fileName)) {
                        return false;
                    }
                }

                reLoadReport();

                Application.DoEvents();

                cMainEditor.setDocActive(this);

                this.opening = false;

                // Testing
                //

                //this.paint.initGrid(this.picReport.CreateGraphics(), this.typeGrid);

                //var bmp = this.paint.getBitmap();
/*
                var g = Graphics.FromImage(bmp);
                var graph = this.picReport.CreateGraphics();

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
                //this.picReport.Image = bmp;

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
                        if (!saveDocument(false)) {
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

        public showHelpDbField() {
            return pShowHelpDbField(this.fProperties);
        }

        public showHelpDbFieldForGroup() {
            return pShowHelpDbField(this.fGroup);
        }

        private pShowHelpDbField(f: cIDatabaseFieldSelector) {
            let nIndex: number = 0;
            let nFieldType: number = 0;
            let sField: string = "";

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

            pShowGroupProperties(group);

            refreshAll();
        }

        private pShowGroupProperties(group: cReportGroup) {

            try {

                let isNew: boolean = false;

                this.showingProperties = true;

                if (this.fGroup === null) { this.fGroup = new fGroup(); }

                this.fGroup.setHandler(this);

                if (group === null) { isNew = true; }

                if (isNew) {
                    this.fGroup.txName.Text = "Group" + this.report.getGroups().count() + 1;
                }
                else {
                    this.fGroup.txName.Text = group.getName();
                    this.fGroup.txDbField.Text = group.getFieldName();

                    if (group.getOderType() === csRptGrpOrderType.CSRPTGRPASC) {
                      this.fGroup.opAsc.Checked = true;
                    }
                    else {
                      this.fGroup.opDesc.Checked = true;
                    }

                    this.fGroup.chkPrintInNewPage.Checked = group.getPrintInNewPage();
                    this.fGroup.chkReprintGroup.Checked = group.getRePrintInNewPage();
                    this.fGroup.chkGrandTotal.Checked = group.getGrandTotalGroup();

                    switch (group.getComparisonType()) {
                      case  csRptGrpComparisonType.CSRPTGRPDATE:
                        this.fGroup.opDate.Checked = true;
                        break;

                      case  csRptGrpComparisonType.CSRPTGRPNUMBER:
                        this.fGroup.opNumber.Checked = true;
                        break;

                      case  csRptGrpComparisonType.CSRPTGRPTEXT:
                        this.fGroup.opText.Checked = true;
                        break;
                    }
                }

                this.fGroup.lbGroup.Text = "Group: " + this.fGroup.txName.Text;

                this.fGroup.ShowDialog();

                if (this.fGroup.getOk()) {

                    if (isNew) {
                        group = this.report.getGroups().add(null, "");
                    }

                    group.setName(this.fGroup.txName.Text);
                    group.setFieldName(this.fGroup.txDbField.Text);

                    group.setIndex(this.report.getGroups().Count);
                    group.setOderType(this.fGroup.opAsc.Checked ? csRptGrpOrderType.CSRPTGRPASC : csRptGrpOrderType.CSRPTGRPDESC);

                    group.setPrintInNewPage(this.fGroup.chkPrintInNewPage.Checked);
                    group.setRePrintInNewPage(this.fGroup.chkReprintGroup.Checked);
                    group.setGrandTotalGroup(this.fGroup.chkGrandTotal.Checked);

                    if (this.fGroup.opDate.Checked) {
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPDATE);
                    }
                    else if (this.fGroup.opNumber.Checked) {
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPNUMBER);
                    }
                    else if (this.fGroup.opText.Checked) {
                        group.setComparisonType(csRptGrpComparisonType.CSRPTGRPTEXT);
                    }

                    if (isNew) {
                        addSection(csRptSectionType.GROUP_HEADER);
                        addSection(csRptSectionType.GROUP_FOOTER);
                    }

                    this.dataHasChanged = true;
                }

            } catch (Exception ex) {
                cError.mngError(ex, "showGroupProperties", C_MODULE, "");
            }
UNKNOWN >>             finally {
                this.showingProperties = false;
                if (this.fGroup !== null) {
                    this.fGroup.Close();
                    this.fGroup = null;
                }
            }
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

            pShowSecProperties(secLn, sec.getName() + " - line " + secLn.getIndex().ToString());

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
                }

                this.fSecProperties.setHandler(this);

                this.fSecProperties.chkFormulaHide.Checked = sec.getHasFormulaHide();
                this.fSecProperties.setFormulaHide(sec.getFormulaHide().getText());

                if (sec is cReportSectionLine) {
                    this.fSecProperties.txName.Enabled = false;
                }

                this.fSecProperties.txName.Text = sec is cReportSectionLine ? secLnName : sec.getName();

                this.fSecProperties.lbSectionName.Text = "Section: " + (sec is cReportSectionLine ? secLnName : sec.getName());

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

            let paintObj: cReportPaintObject = this.paint.getPaintSections().item(this.keyFocus);

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
                            }
                            else {

                                // it's a line

                                isSecLn = true;

                                switch (paintObj.getRptType()) {
                                    case csRptSectionType.SECLN_HEADER:
                                        sec = this.report.getHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_DETAIL:
                                        sec = this.report.getDetails().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_FOOTER:
                                        sec = this.report.getFooters().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_GROUPH:
                                        sec = this.report.getGroupsHeaders().item(paintObj.getRptKeySec());
                                        break;
                                    case csRptSectionType.SECLN_GROUPF:
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
                secLn = sec.getSectionLines().item(sec.getSectionLines().count()-1);
                isSecLn = true;
            }

            return sec;
        }

        public showProperties(key: string) {
            if ("SL".IndexOf(cUtil.subString(key, 0, 1)) !== -1) {
                let bIsSecLn: boolean = false;
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
        }

        public showProperties() {
            if (this.keyFocus === "") { return; }

            let mouse: cMouseWait = new cMouseWait();

            if (this.paint.paintObjIsSection(this.keyFocus)) {
                showSectionProperties();
            }
            else {
                this.keyObj = this.keyFocus;
                showCtrlProperties();
            }

            refreshAll();
        }

        private showCtrlProperties() {
            try {

                let paintObject: cReportPaintObject = null;
                let rptCtrl: cReportControl = null;
                let w_aspect: cReportAspect = null;
                let w_font: cReportFont = null;
                let bMultiSelect: boolean = false;

                this.showingProperties = true;

                if (this.fProperties === null) {
                    this.fProperties = new fProperties();
                }

                this.fProperties.setHandler(this);

                paintObject = this.paint.getPaintObject(this.keyObj);
                if (paintObject === null) { return; }

                this.fProperties.txText.Text = paintObject.getText();
                rptCtrl = this.report.getControls().item(paintObject.getTag());

                if (rptCtrl.getControlType() !== csRptControlType.CSRPTCTIMAGE) {
                    this.fProperties.hideTabImage();
                }
                else {
                    this.fProperties.picImage.Image = rptCtrl.getImage().getImage();
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
                        this.fProperties.txDbFieldLbl1.Text = rptCtrl.getChart().getSeries().item(0).getLabelFieldName();
                        this.fProperties.txDbFieldVal1.Text = rptCtrl.getChart().getSeries().item(0).getValueFieldName();

                        this.fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(0).getLabelIndex());
                        this.fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(0).getValueIndex());

                        cUtil.listSetListIndexForId(this.fProperties.cbColorSerie1, (int)rptCtrl.getChart().getSeries().item(0).getColor());

                        if (rptCtrl.getChart().getSeries().count() > 1) {
                            this.fProperties.txDbFieldLbl2.Text = rptCtrl.getChart().getSeries().item(1).getLabelFieldName();
                            this.fProperties.txDbFieldVal2.Text = rptCtrl.getChart().getSeries().item(1).getValueFieldName();

                            this.fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                            this.fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                            cUtil.listSetListIndexForId(this.fProperties.cbColorSerie2, (int)rptCtrl.getChart().getSeries().item(1).getColor());
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
                this.fProperties.shForeColor.BackColor = cColor.colorFromRGB(w_font.getForeColor());
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
                this.fProperties.shBackColor.BackColor = cColor.colorFromRGB(w_aspect.getBackColor());
                this.fProperties.chkTransparent.Checked = w_aspect.getTransparent();

                bMultiSelect = this.vSelectedKeys.Length > 1;

                this.fProperties.resetChangedFlags();

                this.fProperties.ShowDialog();

                if (!this.fProperties.getOk()) { return; }

                for(var i = 0; i < this.vSelectedKeys.Length; i++) {

                    paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                    rptCtrl = this.report.getControls().item(paintObject.getTag());

                    if (!bMultiSelect) {
                        if (rptCtrl.getName() !== this.fProperties.txName.Text) {
                            if (rptCtrl.getName() !== "") {
                                if (cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", MessageBoxDefaultButton.Button2)) {
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
                    if (this.fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(cUtil.valAsInt(this.fProperties.txIdxGroup.Text)); }
                    if (this.fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(this.fProperties.opAfterPrint.Checked ? csRptWhenEval.CSRPTEVALPOST : csRptWhenEval.CSRPTEVALPRE); }

                    if (this.fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(cUtil.valAsInt(this.fProperties.txExportColIdx.Text)); }
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
                        rptCtrl.getImage().setImage(new Bitmap(this.fProperties.picImage.Image));
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
                            rptCtrl.getChart().setTop(cUtil.valAsInt(this.fProperties.txChartTop.Text));
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
                            rptCtrl.getChart().getSeries().item(0).setLabelFieldName(this.fProperties.txDbFieldLbl1.Text);
                            rptCtrl.getChart().getSeries().item(0).setLabelIndex(this.fProperties.getChartIndex(0));
                        }
                        if (this.fProperties.getChartFieldVal1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setValueFieldName(this.fProperties.txDbFieldVal1.Text);
                            rptCtrl.getChart().getSeries().item(0).setValueIndex(this.fProperties.getChartIndex(1));
                        }

                        if (this.fProperties.getChartColorSerie1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setColor(cUtil.listID(this.fProperties.cbColorSerie1));
                        }

                        if (this.fProperties.getChartFieldLbl2Changed() || this.fProperties.getChartFieldVal2Changed()) {
                            if (rptCtrl.getChart().getSeries().count() < 2) {
                                rptCtrl.getChart().getSeries().add();
                            }
                        }

                        if (this.fProperties.txDbFieldLbl2.Text === "" || this.fProperties.txDbFieldVal2.Text === "") {
                            if (rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(1); }
                        }

                        if (rptCtrl.getChart().getSeries().count() > 1) {

                            if (this.fProperties.getChartFieldLbl2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setLabelFieldName(this.fProperties.txDbFieldLbl2.Text);
                                rptCtrl.getChart().getSeries().item(1).setLabelIndex(this.fProperties.getChartIndex(2));
                            }
                            if (this.fProperties.getChartFieldVal2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setValueFieldName(this.fProperties.txDbFieldVal2.Text);
                                rptCtrl.getChart().getSeries().item(1).setValueIndex(this.fProperties.getChartIndex(3));
                            }

                            if (this.fProperties.getChartColorSerie2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setColor(cUtil.listID(this.fProperties.cbColorSerie2));
                            }
                        }
                    }

                    if (this.fProperties.getTextChanged()) { paintObject.setText(this.fProperties.txText.Text); }

                    w_aspect = rptCtrl.getLabel().getAspect();
                    if (this.fProperties.getLeftChanged()) { w_aspect.setLeft(cUtil.val(this.fProperties.txLeft.Text)); }
                    if (this.fProperties.getTopChanged()) { w_aspect.setTop(cUtil.val(this.fProperties.txTop.Text)); }
                    if (this.fProperties.getWidthChanged()) { w_aspect.setWidth(cUtil.val(this.fProperties.txWidth.Text)); }
                    if (this.fProperties.getHeightChanged()) { w_aspect.setHeight(cUtil.val(this.fProperties.txHeight.Text)); }
                    if (this.fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(this.fProperties.txBackColor.Text)); }
                    if (this.fProperties.getTransparentChanged()) { w_aspect.setTransparent(this.fProperties.chkTransparent.Checked); }
                    if (this.fProperties.getAlignChanged()) { w_aspect.setAlign(cUtil.listID(this.fProperties.cbAlign)); }
                    if (this.fProperties.getFormatChanged()) { w_aspect.setFormat(this.fProperties.txFormat.Text); }
                    if (this.fProperties.getSymbolChanged()) {
                        w_aspect.setSymbol(this.fProperties.txSymbol.Text);
                        w_aspect.setIsAccounting(this.fProperties.getIsAccounting());
                    }
                    if (this.fProperties.getWordWrapChanged()) { w_aspect.setWordWrap(this.fProperties.chkWordWrap.Checked); }
                    if (this.fProperties.getCanGrowChanged()) { w_aspect.setCanGrow(this.fProperties.chkCanGrow.Checked); }

                    if (this.fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(this.fProperties.txBorderColor.Text)); }
                    if (this.fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(this.fProperties.txBorder3D.Text)); }
                    if (this.fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(this.fProperties.txBorderShadow.Text)); }
                    if (this.fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(this.fProperties.chkBorderRounded.Checked); }
                    if (this.fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(this.fProperties.txBorderWidth.Text)); }
                    if (this.fProperties.getBorderTypeChanged()) { w_aspect.setBorderType(cUtil.listID(this.fProperties.cbBorderType)); }

                    w_font = w_aspect.getFont();
                    if (this.fProperties.getFontChanged()) { w_font.setName(this.fProperties.txFont.Text); }
                    if (this.fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(this.fProperties.txForeColor.Text)); }
                    if (this.fProperties.getFontSizeChanged()) { w_font.setSize(cUtil.val(this.fProperties.txFontSize.Text)); }
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
                    if (this.fProperties.getLeftChanged()) { w_aspect.setLeft(cUtil.val(this.fProperties.txLeft.Text)); }
                    if (this.fProperties.getTopChanged()) { w_aspect.setTop(cUtil.val(this.fProperties.txTop.Text)); }
                    if (this.fProperties.getWidthChanged()) { w_aspect.setWidth(cUtil.val(this.fProperties.txWidth.Text)); }
                    if (this.fProperties.getHeightChanged()) { w_aspect.setHeight(cUtil.val(this.fProperties.txHeight.Text)); }
                    if (this.fProperties.getBackColorChanged()) { w_aspect.setBackColor(cUtil.valAsInt(this.fProperties.txBackColor.Text)); }
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
                        if (this.fProperties.getBorderColorChanged()) { w_aspect.setBorderColor(cUtil.valAsInt(this.fProperties.txBorderColor.Text)); }
                        if (this.fProperties.getBorder3DChanged()) { w_aspect.setBorderColor3d(cUtil.valAsInt(this.fProperties.txBorder3D.Text)); }
                        if (this.fProperties.getBorder3DShadowChanged()) { w_aspect.setBorderColor3dShadow(cUtil.valAsInt(this.fProperties.txBorderShadow.Text)); }
                        if (this.fProperties.getBorderRoundedChanged()) { w_aspect.setBorderRounded(this.fProperties.chkBorderRounded.Checked); }
                        if (this.fProperties.getBorderWidthChanged()) { w_aspect.setBorderWidth(cUtil.valAsInt(this.fProperties.txBorderWidth.Text)); }
                    }

                    w_font = w_aspect.getFont();
                    if (this.fProperties.getFontChanged()) { w_font.setName(this.fProperties.txFont.Text); }
                    if (this.fProperties.getForeColorChanged()) { w_font.setForeColor(cUtil.valAsInt(this.fProperties.txForeColor.Text)); }
                    if (this.fProperties.getFontSizeChanged()) { w_font.setSize(cUtil.val(this.fProperties.txFontSize.Text)); }
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
            this.picReport.Focus();
            this.draging = true;
            this.picReport.Cursor = new Cursor("Resources" + Path.DirectorySeparatorChar + "move32x32.cur");
        }

        private endDraging() {
            this.draging = false;
            this.controlType = csRptEditCtrlType.none;
            this.picReport.Cursor = Cursors.Default;
        }

        public showToolbox() {

            let f: fToolbox = cMainEditor.getToolbox(this);

            f.clear();

            pAddColumnsToToolbox(this.report.getConnect().getDataSource(), this.report.getConnect().getColumns(), f);

            for(var _i = 0; _i < this.report.getConnectsAux().count(); _i++) {
                let connect: cReportConnect = this.report.getConnectsAux().item(_i);
                pAddColumnsToToolbox(connect.getDataSource(), connect.getColumns(), f);
            }

            for(var _i = 0; _i < this.report.getControls().count(); _i++) {
                let ctrl: cReportControl = this.report.getControls().item(_i);
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
                f.Show(this.fmain);
            }
        }

        public pAddColumnsToToolbox(dataSource: string, columns: cColumnsInfo, f: fToolbox) {
            for(var _i = 0; _i < columns.count(); _i++) {
                let col: cColumnInfo = columns.item(_i);
                f.addField(
                    cGlobals.getDataSourceStr(dataSource) + col.getName(),
                    col.getColumnType(),
                    col.getPosition());
                f.addLabels(col.getName());
            }
        }

        public copy() {
            try {
                if (this.vSelectedKeys.Length === 0) { return; }

                G.redim(this.vCopyKeys, this.vSelectedKeys.Length);

                for(var i = 0; i < this.vSelectedKeys.Length; i++) {
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

                addLabel();

            } catch (Exception ex) {
                cError.mngError(ex, "Paste", C_MODULE, "");
            }
        }

        public editText() {
            try {

                public c_margen: number = 1;

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

            cReportPaintObject paintObjAspect = null;
            paintObjAspect = this.paint.getPaintObject(this.keyObj);
            if (paintObjAspect === null) { return; }

            String sKeyRpt = "";
            sKeyRpt = paintObjAspect.getTag();

            paintObjAspect.setText(TxEdit.Text);

            this.report.getControls().item(sKeyRpt).getLabel().setText(paintObjAspect.getText());
            refreshBody();
             */
        }

        private paintSection(aspect: cReportAspect) {
                                    String sKey,
                                    csRptSectionType rptType,
                                    String text,
                                    bool isSecLn)
        {

            let paintObj: cReportPaintObject = null;
            paintObj = this.paint.getNewSection(csRptPaintObjType.CSRPTPAINTOBJBOX);

            let w_aspect: cReportAspect = paintObj.getAspect();

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
                public innerColor: number = 0x99ccff;

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
                w_aspect.setOffset(this.offSet);
            }

            paintObj.setIsSection(!isSecLn);

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
            offSet = rptSec.getSectionLines().item(0).getAspect().getTop() - secAspect.getTop();
            secTop = secAspect.getTop();

            for(var _i = 0; _i < rptSec.getSectionLines().count(); _i++) {

                let rptSecLine: cReportSectionLine = rptSec.getSectionLines().item(_i);

                let secLineAspect: cReportAspect = rptSecLine.getAspect();

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
            // and the footer hasn't contain a section yet
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

        private moveSection(paintObj: cReportPaintObject) {
                                    float x,
                                    float y,
                                    float minBottom,
                                    float maxBottom,
                                    cReportSection secToMove,
                                    bool isNew)
        {
            if (this.bNoMove) { return; }

            let oldHeight: number = 0;

            this.dataHasChanged = true;

            let w_aspect: cReportAspect = paintObj.getAspect();

            // if Y is contained by the allowed range everything is ok
            //
            if (y >= minBottom && y <= maxBottom) {
                w_aspect.setTop(y - this.offY);

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
            // this.paint.alingToGrid(paintObj.getKey());

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

            if (secToMove.getTypeSection() === csRptSectionType.FOOTER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_FOOTER
                || bChangeTop) {

                for(var i = this.report.getFooters().count()-1; i > -1; i--) {
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

            if (secToMove.getTypeSection() === csRptSectionType.HEADER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_HEADER) {

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

            if (secToMove.getTypeSection() === csRptSectionType.GROUP_HEADER || bChangeTop) {

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

            if (secToMove.getTypeSection() === csRptSectionType.MAIN_DETAIL
                || secToMove.getTypeSection() === csRptSectionType.DETAIL || bChangeTop) {

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

            if (secToMove.getTypeSection() === csRptSectionType.GROUP_FOOTER || bChangeTop) {

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
            let heightLines: number = 0;
UNKNOWN >>             cReportAspect w_aspect;

            // Update section line
            //
            for(var i = 0; i < sec.getSectionLines().count() - 1; i++) {
                w_aspect = sec.getSectionLines().item(i).getAspect();
                heightLines = heightLines + w_aspect.getHeight();
            }

            // for the last section line the height is the rest
            //
            let w_sectionLines: cReportSectionLines = sec.getSectionLines();
            w_aspect = w_sectionLines.item(w_sectionLines.count()-1).getAspect();
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

            this.paint = new cReportPaint();

            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.paint.setGridHeight(
                    pSetSizePics(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                this.report.getPaperInfo(),
                                                                w_paperInfo.getPaperSize(),
                                                                w_paperInfo.getOrientation()).Height));

            this.paint.initGrid(this.picReport.CreateGraphics(), this.typeGrid);

            if (this.report.getName() !== "") {
                this.editorTab.Text = this.report.getName() + "   [X]";
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
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_HEADER);
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
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPH);
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
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_DETAIL);
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
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_GROUPF);
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
                pAddPaintSetcionForSecLn(sec, csRptSectionType.SECLN_FOOTER);
            }

UNKNOWN >>             csRptPaintObjType paintType;

            for(var _i = 0; _i < this.report.getControls().count(); _i++) {

                let rptCtrl: cReportControl = this.report.getControls().item(_i);
                refreshNextNameCtrl(rptCtrl.getName());
                let ctrlAspect: cReportAspect = rptCtrl.getLabel().getAspect();

                if (rptCtrl.getControlType() === csRptControlType.CSRPTCTIMAGE
                    || rptCtrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                    paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
                }
                else {
UNKNOWN >>                     paintType =csRptPaintObjType.CSRPTPAINTOBJBOX;
                }

               let paintObj: cReportPaintObject = this.paint.getNewObject(paintType);

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
                paintObj.setRptType(csRptSectionType.CONTROL);
                paintObj.setTag(rptCtrl.getKey());
                rptCtrl.setKeyPaint(paintObj.getKey());
            }

            this.dataHasChanged = false;

            this.paint.createPicture(this.picReport.CreateGraphics());

            this.picRule.Refresh();
        }

        private pAddPaintSetcionForSecLn(
            sec: cReportSection
            typeSecLn: csRptSectionType) {
            let paintSec: cReportPaintObject = null;

            if (sec.getSectionLines().count() > 1) {

                for(var i = 0; i < sec.getSectionLines().count() - 1; i++) {
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
               let po: cReportPaintObject = this.paint.getPaintSections().item(sec.getKeyPaint());
                po.setTextLine(C_SECTIONLINE + (sec.getSectionLines().count() - 1).ToString());
            }

            // we set the height of the last section line
            //
            paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());

            let secLines: cReportSectionLines = sec.getSectionLines();
            paintSec.setHeightSecLine(secLines.item(secLines.count() - 1).getAspect().getHeight());
        }

        private refreshNextNameCtrl(nameCtrl: string) {
            let x: number = 0;
            if (cUtil.subString(nameCtrl, 0, cGlobals.C_CONTROL_NAME.Length).ToUpper() === cGlobals.C_CONTROL_NAME.ToUpper()) {
                x = cUtil.valAsInt(nameCtrl.Substring(cGlobals.C_CONTROL_NAME.Length + 1));
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

        private showPopMenuSection(noDelete: boolean, showGroups: boolean, x: number, y: number) {
            this.fmain.showPopMenuSection(this, noDelete, showGroups, this.picReport.PointToScreen(new Point(x, y)));
        }

        private showPopMenuControl(clickInCtrl: boolean, x: number, y: number) {

            let pasteEnabled: boolean = false;

            if (this.vCopyKeys.Length > 0) {
                pasteEnabled = true;
            }
            else if (!(this.fmain.getReportCopySource() === null)) {
                pasteEnabled = this.fmain.getReportCopySource().getVCopyKeysCount() > 0;
            }

            this.fmain.showPopMenuControl(this, clickInCtrl, pasteEnabled, this.picReport.PointToScreen(new Point(x, y)));
        }

        private fGroup_UnloadForm() {
            this.fGroup = null;
        }

        public destroyPropertiesFormReference() {
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
            cMainEditor.setDocActive(this);
        }

        private reportDone(sender: object, e: EventArgs) {
            closeProgressDlg();
        }

        private reportProgress(sender: object, e: ProgressEventArgs) {

            let task: string = e.task;
            let page: number = e.page;
            let currRecord: number = e.currRecord;
            let recordCount: number = e.recordCount;

            if (this.cancelPrinting) {
                if (cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)) {
                    e.cancel = true;
                    closeProgressDlg();
                    return;
                }
                else {
                    this.cancelPrinting = false;
                }
            }

            if (this.fProgress === null) { return; }

            if (page > 0) { this.fProgress.lbCurrPage.Text = page.ToString(); }
            if (task !== "") { this.fProgress.lbTask.Text = task; }
            if (currRecord > 0) { this.fProgress.lbCurrRecord.Text = currRecord.ToString(); }
            if (recordCount > 0 && cUtil.val(this.fProgress.lbRecordCount.Text) !== recordCount) {
                this.fProgress.lbRecordCount.Text = recordCount.ToString();
            }

            let percent: number = 0;
            if (recordCount > 0 && currRecord > 0) {
                percent = Convert.ToDouble(currRecord) / recordCount;
                let value: var = Convert.ToInt32(percent * 100);
                if (value > 100) value = 100; {
                this.fProgress.prgBar.Value = value;
            }

            Application.DoEvents();
        }

        private closeProgressDlg() {
            if (this.fProgress !== null && !this.fProgress.IsDisposed) {
                this.fProgress.Close();
            }
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
            let paintObj: cReportPaintObject = null;

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

            for (i = this.vSelectedKeys.Length-1; i > -1; i--) {

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
                if (paintObj.getRptType() === csRptSectionType.CONTROL) {
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
UNKNOWN >>             csRptSectionType rptType;

            let maxBottom: number = 0;
            let minBottom: number = 0;

            let maxBottomSectionLine: number = 0;

            let rptSec: cReportSection = null;
           let paintObj: cReportPaintObject = null;
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
                    this.indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex();
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
           paintObj: cReportPaintObject
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

            // TODO: remove after more testing - aligning the sections has an undesired result: the last section line is shrinked after five resize actions
            //
            // this.paint.alingToGrid(paintObj.getKey());

            // the section line height has been changed
            //
            secLn.getAspect().setHeight(w_aspect.getTop()
                                        + cGlobals.C_HEIGHT_BAR_SECTION
                                        - secLn.getAspect().getTop());
        }

        private pResizeControl(x: number, y: number) {
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

            pMoveControlAfterResize(w_getPaintObject.getAspect(), true);

            for(var i = 0; i < this.vSelectedKeys.Length; i++) {

                if (this.keySizing !== this.vSelectedKeys[i]) {

                    w_getPaintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                    w_aspect = w_getPaintObject.getAspect();

                    w_aspect.setHeight(w_aspect.getHeight() + height);
                    w_aspect.setTop(w_aspect.getTop() + top);
                    w_aspect.setWidth(w_aspect.getWidth() + width);
                    w_aspect.setLeft(w_aspect.getLeft() + left);

                    pMoveControlAfterResize(w_getPaintObject.getAspect(), false);
                }
            }
        }

        private pMoveControlAfterResize(aspect: cReportAspect, bSizing: boolean) {
            public C_MIN_WIDTH: number = 1;
            public C_MIN_HEIGHT: number = 1;

            let rptCtrlAspect: cReportAspect = null;

            if (this.paint.getPaintObject(this.keySizing).getRptType() === csRptSectionType.CONTROL) {
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
            maxBottom: number) {
UNKNOWN >>             float dummy;
            return pMoveHeader(sKeySection, minBottom, maxBottom, false, "", dummy);
        }

        private pMoveHeader(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean
            secLnKey: string
            maxBottomSectionLine: number) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {
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

            maxBottomSectionLine = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        }

        private pMoveGroupHeader(
            sKeySection: string
            minBottom: number
            maxBottom: number) {
UNKNOWN >>             float dummy;
            return pMoveGroupHeader(sKeySection, minBottom, maxBottom, false, "", dummy);
        }

        private pMoveGroupHeader(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean
            secLnKey: string
            maxBottomSectionLine: number) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getGroupsHeaders().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {
                // bottom of previous header + C_Min_Height_Section
                let w_headers: cReportSections = this.report.getHeaders();
                let w_aspect: cReportAspect = w_headers.item(w_headers.count()-1).getAspect();
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

            maxBottomSectionLine = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        }

        private getHeightOfSectionsBellowMe(section: cReportSection, secLnKey: string) {
            let height: number = 0;

            if ( ! String.IsNullOrEmpty(secLnKey) ) {
                let add: boolean = false;
                for(var _i = 0; _i < section.getSectionLines().count(); _i++) {
                    let secLn: cReportSectionLine = section.getSectionLines().item(_i);
                    if (add) {
                        height += secLn.getAspect().getHeight();
                    }
                    else if (secLn.getKey() === secLnKey) {
                        add = true;
                    }
                }
            }

            let rptType: csRptSectionType = section.getTypeSection();

            switch (rptType) {

                case csRptSectionType.HEADER:
                case csRptSectionType.MAIN_HEADER:
                    height += getHeightFromSections(this.report.getHeaders(), section);
                    height += getHeightFromSections(this.report.getGroupsHeaders(), null);
                    height += getHeightFromSections(this.report.getDetails(), null);
                    height += getHeightFromSections(this.report.getGroupsFooters(), null);
                    height += getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.GROUP_HEADER:
                    height += getHeightFromSections(this.report.getGroupsHeaders(), section);
                    height += getHeightFromSections(this.report.getDetails(), null);
                    height += getHeightFromSections(this.report.getGroupsFooters(), null);
                    height += getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.DETAIL:
                case csRptSectionType.MAIN_DETAIL:
                    height += getHeightFromSections(this.report.getDetails(), section);
                    height += getHeightFromSections(this.report.getGroupsFooters(), null);
                    height += getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.GROUP_FOOTER:
                    height += getHeightFromSections(this.report.getGroupsFooters(), section);
                    height += getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:
                    height += getHeightFromSections(this.report.getFooters(), section);
                    break;

                default:
                    throw new ReportEditorException(
                        csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID,
                        C_MODULE,
                        cReportEditorError.errGetDescript(
                                        csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID));
            }

            return height;
        }

        private getHeightFromSections(sections: cIReportGroupSections, section: cReportSection) {
            let add: boolean = section === null;
            let height: number = 0;
            for(var _i = 0; _i < sections.count(); _i++) {
                let sec: cReportSection = sections.item(_i);
                if (add) {
                    height += sec.getAspect().getHeight();
                }
                else if (section === sec) {
                    add = true;
                }
            }
            return height;
        }

        private getAllHeadersAndGroupsAndDetailsHeight() {
            let sec: cReportSection = null;

            let height: number = 0;

            for(var _i = 0; _i < this.report.getHeaders().count(); _i++) {
                sec = this.report.getHeaders().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                sec = this.report.getGroupsHeaders().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            for(var _i = 0; _i < this.report.getDetails().count(); _i++) {
                sec = this.report.getDetails().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            return height;
        }

        private pMoveDetails(
            sKeySection: string
            minBottom: number
            maxBottom: number) {
UNKNOWN >>             float dummy;
            return pMoveDetails(sKeySection, minBottom, maxBottom, false, "", dummy);
        }

        private pMoveDetails(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean
            secLnKey: string
            maxBottomSectionLine: number) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getDetails().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------

            if (index === 0) {
                // if there are groups
                //
                if (this.report.getGroupsHeaders().count() > 0) {
                    // top of the last group header + C_Min_Height_Section
                    let w_groupsHeaders: cIReportGroupSections = this.report.getGroupsHeaders();
                    let w_aspect: cReportAspect = w_groupsHeaders.item(w_groupsHeaders.count()-1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
                else {
                    // top of the last header + C_Min_Height_Section
                    let w_headers: cReportSections = this.report.getHeaders();
                    let w_aspect: cReportAspect = w_headers.item(w_headers.count()-1).getAspect();
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

            maxBottomSectionLine = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        }

        private pMoveGroupFooter(
            sKeySection: string
            minBottom: number
            maxBottom: number) {
UNKNOWN >>             float dummy;
            return pMoveGroupFooter(sKeySection, minBottom, maxBottom, false, "", dummy);
        }

        private pMoveGroupFooter(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean
            secLnKey: string
            maxBottomSectionLine: number) {
            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getGroupsFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {
                // bottom of the last detail + C_Min_Height_Section
                //
                let w_details: cReportSections = this.report.getDetails();
                let w_aspect: cReportAspect = w_details.item(w_details.count() - 1).getAspect();
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

            maxBottomSectionLine = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        }

        private pMoveFooter(
            sKeySection: string
            minBottom: number
            maxBottom: number) {
UNKNOWN >>             float dummy;
            return pMoveFooter(sKeySection, minBottom, maxBottom, false, "", dummy);
        }

        private pMoveFooter(
            sKeySection: string
            minBottom: number
            maxBottom: number
            isForSectionLine: boolean
            secLnKey: string
            maxBottomSectionLine: number) {

            let index: number = 0;
            let rptSec: cReportSection = null;

            rptSec = this.report.getFooters().item(sKeySection);

            index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if (index === 0) {

                // if there are groups
                //
                if (this.report.getGroupsFooters().count() > 0) {

                    // the bottom of the last group footer
                    //
                    let w_groupsFooters: cIReportGroupSections = this.report.getGroupsFooters();
                    let w_aspect: cReportAspect = w_groupsFooters.item(w_groupsFooters.count() - 1).getAspect();
                    minBottom = w_aspect.getHeight() + w_aspect.getTop() + C_MIN_HEIGHT_SECTION;
                }
                else {
                    // bottom of the last detail
                    //
                    let w_details: cReportSections = this.report.getDetails();
                    let w_aspect: cReportAspect = w_details.item(w_details.count() - 1).getAspect();
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

            maxBottomSectionLine = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, secLnKey);
            maxBottom = this.picReport.Height - getHeightOfSectionsBellowMe(rptSec, "");

            return rptSec;
        }

        private pGetMinBottomWithSecLn(secLns: cReportSectionLines, minBottom: number) {
            for(var i = 0; i < secLns.count() - 1; i++) {
                minBottom = minBottom + secLns.item(i).getAspect().getHeight();
            }

            return minBottom;
        }

        private pGetOffSet(realPageHeight: number) {
            let pageHeight: number = 0;
            pGetOffSet(realPageHeight, pageHeight);
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
UNKNOWN >>                            cReportPaintObject po;
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
            for(var i = 0; i < this.vSelectedKeys.Length; i++) {
                if (this.vSelectedKeys[i] === this.keyObj) { return false; }
            }

            G.redim(this.vSelectedKeys, 1);
            this.vSelectedKeys[0] = this.keyObj;

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
            let height: var = CSReportPaint.cGlobals.getRectFromPaperSize(this.report.getPaperInfo(),;
                                                    w_paperInfo.getPaperSize(),
                                                    w_paperInfo.getOrientation()).Height;
            top = height;

            pGetOffSet(height);

            for (i = this.report.getFooters().count()-1; i > -1; i--) {
                sec = this.report.getFooters().item(i);
                top = top - sec.getAspect().getHeight();
                pValidateSectionAspecAux(top, sec);
            }

            pRefreshOffSetInPaintObjs();
        }

        private pValidateSectionAspecAux(top: number, sec: cReportSection) {
            let secLn: cReportSectionLine = null;
            let topLn: number = 0;
            let secLnHeight: number = 0;
            let width: number = 0;

            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                    this.report.getPaperInfo(),
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

            let w_sectionLines: cReportSectionLines = sec.getSectionLines();
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
        }

        public showControls() {
            try {
                let f: fControls = cMainEditor.getCtrlBox(this);
                f.clear();
                f.addCtrls(this.report);
                if (!f.Visible) {
                    f.Show(this.fmain);
                }
            } catch (Exception ex) {
                cError.mngError(ex, "showControls", C_MODULE, "");
            }
        }

        public showControlsTree() {
            try {
                let f: fTreeViewCtrls = cMainEditor.getCtrlTreeBox(this);
                f.clear();
                f.addCtrls();
                if (!f.Visible) {
                    f.Show(this.fmain);
                }
            } catch (Exception ex) {
                cError.mngError(ex, "showControlsTree", C_MODULE, "");
            }
        }

        private pSetInitDir() {
            if (cMainEditor.gbFirstOpen) {
                cMainEditor.gbFirstOpen = false;
                // TODO: implement me
                // this.fmain.cmDialog.InitDir = cGlobals.gWorkFolder;
            }
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

            this.report.Progress += reportProgress;
            this.report.ReportDone += reportDone;

            oLaunchInfo = new cReportLaunchInfo();

            this.report.getPaperInfo().setPaperSize(this.fmain.getPaperSize());
            this.report.getPaperInfo().setOrientation(this.fmain.getOrientation());

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(this.fmain.printDialog));
            oLaunchInfo.setObjPaint(new cReportPrint());
            if (!this.report.init(oLaunchInfo)) { return; }

            this.report.setPathDefault(Application.StartupPath);

            this.picReport.Top = C_TOPBODY;
            this.picRule.Left = 0;
            this.picReport.Left = pGetLeftBody();

            this.keyMoving = "";
            this.keySizing = "";
            this.keyObj = "";
            this.keyFocus = "";
            this.nextNameCtrl = 0;

            this.paint = new cReportPaint();

            let tR: Rectangle = null;
            let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            tR = new Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                this.report.getPaperInfo(),
                                                w_paperInfo.getPaperSize(),
                                                w_paperInfo.getOrientation()));

            cGlobals.createStandarSections(this.report, tR);

            reLoadReport();
        }

        private pUpdateFormulas(currentName: string, newName: string) {
            let rptCtrl: cReportControl = null;

            for(var i = 0; i < this.report.getControls().count(); i++) {

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
            if (cUtil.subString(formulaText, 0, 1).Trim() !== "_") {
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

        public editConnectionString() {
            let stringConnection: string = this.report.getConnect().getStrConnect();
            if (cUtil.getInput(stringConnection, "You can modify the string connection of this report", "String connection")) {
                this.report.getConnect().setStrConnect(stringConnection);
            }
        }

        public editDataSource() {
            let dataSource: string = this.report.getConnect().getDataSource();
            if (cUtil.getInput(dataSource, "You can modify the data source of this report", "Data Source")) {
                this.report.getConnect().setDataSource(dataSource);
            }
        }


    }    }



UNKNOWN >>     enum csAskEditResult {
        CSASKRSLTYES = 1,
        CSASKRSLTNO = 2,
        CSASKRSLTCANCEL = 3


    }    }
}
