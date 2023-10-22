///<reference path="../CSReportEngine/cReport.ts"/>
///<reference path="../CSReportEngine/cReportConnect.ts"/>
///<reference path="../CSReportEngine/cReportSectionLine.ts"/>
///<reference path="../CSReportEngine/cReportSection.ts"/>
///<reference path="../CSReportEngine/cReportFormula.ts"/>
///<reference path="../CSReportEngine/cReportChartSequence.ts"/>
///<reference path="../CSReportEngine/cPrintAPI.ts"/>
///<reference path="../CSReportEngine/cReportLaunchInfo.ts"/>
///<reference path="../CSReportPaint/cReportPaint.ts"/>
///<reference path="../CSReportPaint/cReportPrint.ts"/>
///<reference path="../../CSDrawing/Bitmap.ts"/>
///<reference path="../CSReportPaint/cGlobals.ts"/>
///<reference path="../../CSForms/controls/Panel.ts"/>
///<reference path="../../CSForms/controls/PictureBox.ts"/>
///<reference path="../../CSForms/controls/TabPage.ts"/>
///<reference path="../../CSForms/controls/TextBox.ts"/>
///<reference path="../../CSForms/controls/Cursor.ts"/>
///<reference path="../../CSForms/controls/MouseEventArgs.ts"/>

namespace CSReportEditor {

    import cReport = CSReportEngine.cReport;
    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import cError = CSKernelClient.cError;
    import cReportConnect = CSReportEngine.cReportConnect;
    import RefWrapper = CSKernelClient.RefWrapper;
    import cIReportGroupSections = CSReportEngine.cIReportGroupSections;
    import cReportSectionLine = CSReportEngine.cReportSectionLine;
    import cReportSection = CSReportEngine.cReportSection;
    import cReportFormula = CSReportEngine.cReportFormula;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import cReportControl = CSReportEngine.cReportControl;
    import csRptControlType = CSReportGlobals.csRptControlType;
    import cReportAspect = CSReportEngine.cReportAspect;
    import cReportFont = CSReportEngine.cReportFont;
    import csECtlAlignConst = CSReportGlobals.csECtlAlignConst;
    import Utils = CSOAPI.Utils;
    import cReportSections = CSReportEngine.cReportSections;
    import cReportGroup = CSReportEngine.cReportGroup;
    import cReportSectionLines = CSReportEngine.cReportSectionLines;
    import cReportChart = CSReportEngine.cReportChart;
    import cReportChartSequence = CSReportEngine.cReportChartSequence;
    import cReportField = CSReportEngine.cReportField;
    import cReportLabel = CSReportEngine.cReportLabel;
    import RptGrpComparisonType = CSReportGlobals.RptGrpComparisonType;
    import RptGrpOrderType = CSReportGlobals.RptGrpOrderType;
    import CMouseWait = CSKernelClient.CMouseWait;
    import DatabaseGlobals = CSDatabase.DatabaseGlobals;
    import cColumnInfo = CSConnect.cColumnInfo;
    import cIReportSection = CSReportEngine.cIReportSection;
    import csRptWhenEval = CSReportGlobals.csRptWhenEval;
    import csReportBorderType = CSReportGlobals.csReportBorderType;
    import cReportPaperInfo = CSReportEngine.cReportPaperInfo;
    import cColumnsInfo = CSReportEngine.cColumnsInfo;
    import cPrintAPI = CSReportEngine.cPrintAPI;
    import cReportLaunchInfo = CSReportEngine.cReportLaunchInfo;
    import csETypeGrid = CSReportPaint.csETypeGrid;
    import csRptPaintObjType = CSReportPaint.csRptPaintObjType;
    import cReportPaintObjects = CSReportPaint.cReportPaintObjects;
    import cReportPaintObject = CSReportPaint.cReportPaintObject;
    import csRptPaintRegionType = CSReportPaint.csRptPaintRegionType;
    import cReportPaint = CSReportPaint.cReportPaint;
    import cReportPrint = CSReportPaint.cReportPrint;
    import cWindow = CSKernelClient.cWindow;
    import MessageBoxDefaultButton = CSKernelClient.MessageBoxDefaultButton;
    import csAskEditResult = CSKernelClient.csAskEditResult;
    import Exception = CSOAPI.Exception;
    import Color = CSDrawing.Color;
    import csRptLaunchAction = CSReportGlobals.csRptLaunchAction;
    import Point = CSDrawing.Point;
    import HorizontalAlignment = CSReportGlobals.HorizontalAlignment;
    import P = CSKernelClient.Callable;

    import Panel = CSForms.Panel;
    import PictureBox = CSForms.PictureBox;
    import TabPage = CSForms.TabPage;
    import TextBox = CSForms.TextBox;
    import Cursor = CSForms.Cursor;
    import MouseEventArgs = CSForms.MouseEventArgs;
    import MouseButtons = CSForms.MouseButtons;

    export class cEditor {

        private readonly fMain: FMain = null;
        private editor: Panel = null;
        private picRule: PictureBox = null;
        private picReport: PictureBox = null;
        private readonly editorTab: TabPage = null;
        private reportFullPath: string = "";
        private name: string = "";
        private __id: number;

        private static __nextId: number = 0;

        private isNew: boolean = false;

        // the id change if we load a new report in this editor
        //
        public getId() {
            return this.getFileName() + "__" + this.__id;
        }

        public constructor(fMain: FMain, editor: Panel, rule: PictureBox, report: PictureBox, editorTab: TabPage) {
            this.fMain = fMain;
            this.editor = editor;
            this.picRule = rule;
            this.picReport = report;

            // tab
            //
            this.editorTab = editorTab;
            this.editorTab.setTag(this);

            this.__id = cEditor.__nextId++;
        }

        public close() {
            return this.saveChanges();
        }

        private C_TOP_BODY: number = 10;
        private C_LEFT_BODY: number = 0;
        private C_MIN_HEIGHT_SECTION: number = 3;
        private C_SECTION_LINE: string = "L ";

        private C_NO_MOVE: number = -1111111;

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

        private vSelectedKeys: string[] = [];
        private vCopyKeys: string[] = [];

        private fProgress: FProgress = null;
        private cancelPrinting: boolean = false;

        private formIndex: number = 0;

        private fProperties: FProperties = null;
        private fSecProperties: FSecProperties = null;
        private fGroup: FGroup = null;
        private fConnectsAux: FConnectsAux = null;

        // names
        private nextNameCtrl: number = 0;
        private showingProperties: boolean = false;
        private dataHasChanged: boolean = false;

        // to add new controls
        private copyControls: boolean = false;
        private copyControlsFromOtherReport: boolean = false;
        private bCopyWithoutMoving: boolean = false;

        private dragging: boolean = false;
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
            return this.vCopyKeys.length;
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
            if(this.report === null) { return 0; }
            return this.report.getPaperInfo().getPaperSize();
        }

        public getOrientation() {
            if(this.report === null) { return 0; }
            return this.report.getPaperInfo().getOrientation();
        }

        public getCopies() {
            if(this.report === null) { return 0; }
            return this.report.getLaunchInfo().getCopies();
        }

        public setPaperSize(rhs: csReportPaperType) {
            if(this.report === null) return;
            this.report.getPaperInfo().setPaperSize(rhs);
        }

        public setOrientation(rhs: number) {
            if(this.report === null) return;
            this.report.getPaperInfo().setOrientation(rhs);
        }

        public setCopies(rhs: number) {
            if(this.report === null) return;
            this.report.getLaunchInfo().setCopies(rhs);
        }

        public setCustomHeight(rhs: number) {
            if(this.report === null) return;
            this.report.getPaperInfo().setCustomHeight(rhs);
        }

        public setCustomWidth(rhs: number) {
            if(this.report === null) return;
            this.report.getPaperInfo().setCustomWidth(rhs);
        }

        public getCustomHeight() {
            if(this.report === null) { return 0; }
            return this.report.getPaperInfo().getCustomHeight();
        }

        public getCustomWidth() {
            if(this.report === null) { return 0; }
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

        public setFGroup(rhs: FGroup) {
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
                let f: FSearch = cMainEditor.getSearch(this);
                f.clear();
                if(!f.getVisible()) {
                    f.show(this.fMain);
                }
            }
            catch(ex) {
                cError.mngError(ex);
            }
        }

        public moveVertical() {
            this.formKeyUp(Keys.F11, false);
        }

        public moveHorizontal() {
            this.formKeyUp(Keys.F12, false);
        }

        public moveNoMove() {
            this.formKeyUp(Keys.F9, false);
        }

        public moveAll() {
            this.formKeyUp(Keys.F8, false);
        }

        public showGrid(typeGrid: csETypeGrid) {
            this.typeGrid = typeGrid;
            return this.paint.initGrid(this.picReport.getGraphics(), typeGrid);
        }

        public showConnectsAux() {
            try {
                this.fConnectsAux = new FConnectsAux();

                for(let _i = 0; _i < this.report.getConnectsAux().count(); _i++) {
                    this.pAddConnectAuxToListView(this.report.getConnectsAux().item(_i));
                }
                this.fConnectsAux.showDialog();

            } catch(ex) {
                cError.mngError(ex);
                this.fConnectsAux.close();
                this.fConnectsAux = null;
            }
        }

        private pAddConnectAuxToListView(connect: cReportConnect) {
            this.fConnectsAux.addConnect(connect.getDataSource(), connect.getStrConnect());
        }

        public keyUp(sender: object, e) {
            e.Handled = this.formKeyUp(e.KeyCode, e.Control);

            if(this.keyboardMove) {
                this.keyboardMove = false;
                this.picReportMouseUp(
                    new MouseEventArgs(MouseButtons.Left, 0, this.x, this.y, 0),
                    new Point(this.x, this.y));
                e.Handled = true;
            }
        }

        private formKeyUp(keyCode: Keys, ctrlKey: boolean) {
            // if we are in edit mode we do nothing
            //
            // if(TxEdit.Visible) return;

            switch (keyCode) {

                case Keys.F2:
                    this.editText();
                    break;

                case Keys.Delete:
                    this.deleteObj(false);
                    break;

                case Keys.Escape:
                    this.endDragging();
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
                    this.showProperties2();
                    break;

                case Keys.C:
                    if(ctrlKey) {
                        this.copy();
                    }
                    break;

                case Keys.V:
                    if(ctrlKey) {
                        this.paste(false);
                    }
                    break;

                default:
                    return false;
            }
            return true;
        }

        private setFormEvents () {

            // TODO: this functionality must be moved to fConnectsAux
            //
            this.fConnectsAux.addConnect = () => {
                try {
                    let rptConnect: cReportConnect = new cReportConnect();
                    if(!this.configConnection(rptConnect)) return;
                    this.report.getConnectsAux().add(rptConnect);
                    this.pAddConnectAuxToListView(rptConnect);
                } catch(ex) {
                    cError.mngError(ex);
                }
            };

            cMainEditor.getSearch(this).setEditCtrl((ctrlKey: string) => {
                try {
                    this.selectCtrl(ctrlKey);
                    this.showProperties2();
                } catch(ex) {
                    cError.mngError(ex);
                }
            });

            cMainEditor.getSearch(this).setFocusSec((secKey: string) => {
                try {
                    this.selectSection(secKey);
                } catch(ex) {
                    cError.mngError(ex);
                }
            });
        }

        public editSection(secKey: string) {
            try {
                let bIsSecLn = new RefWrapper(false);
                this.selectSection(secKey, bIsSecLn);

                if(bIsSecLn.get()) {
                    this.showSecLnProperties();
                }
                else {
                    this.showProperties2();
                }
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public setFocusCtrl(ctrlKey: string) {
            try {
                this.selectCtrl(ctrlKey);
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public getSectionOrSectionLineFromKey(key: string) {
            let sec: object = cEditor.getSectionOrSectionLine(key, this.report.getHeaders());
            if(sec === null) {
                sec = cEditor.getSectionOrSectionLine(key, this.report.getGroupsHeaders());
                if(sec === null) {
                    sec = cEditor.getSectionOrSectionLine(key, this.report.getDetails());
                    if(sec === null) {
                        sec = cEditor.getSectionOrSectionLine(key, this.report.getGroupsFooters());
                        if(sec === null) {
                            sec = cEditor.getSectionOrSectionLine(key, this.report.getFooters());
                        }
                    }
                }
            }
            return sec;
        }

        private static getSectionOrSectionLine(key: string, sections: cIReportGroupSections) {
            for(let i = 0; i < sections.count(); i++) {
                let sec = sections.item(i);
                if(sec.getKey() === key) {
                    return sec;
                }
                else {
                    let secLn = sec.getSectionLines().item(key);
                    if(secLn !== null) {
                        return secLn;
                    }
                }
            }
            return null;
        }

        public selectCtrl(ctrlKey: string) {
            let bWasRemoved = new RefWrapper(false);
            let sKey = this.getReport().getControls().item(ctrlKey).getKeyPaint();
            this.vSelectedKeys = [];
            this.pAddToSelected(sKey, false, bWasRemoved);

            if(bWasRemoved.get()) { sKey = ""; }

            this.keyFocus = sKey;
            this.keyObj = sKey;
            this.paint.setFocus(this.keyFocus, this.picReport.getGraphics(), true);
            cMainEditor.showProperties(ctrlKey);
        }

        public selectSection(secKey: string, bIsSecLn: RefWrapper<boolean> = new RefWrapper()) {
            try {
                let bWasRemoved = new RefWrapper(false);
                let sKey: string = "";

                bIsSecLn.set(false);

                this.vSelectedKeys = [];

                if(this.report.getHeaders().item(secKey) !== null) {
                    sKey = this.report.getHeaders().item(secKey).getKeyPaint();
                }
                else if(this.report.getGroupsHeaders().item(secKey) !== null) {
                    sKey = this.report.getGroupsHeaders().item(secKey).getKeyPaint();
                }
                else if(this.report.getDetails().item(secKey) !== null) {
                    sKey = this.report.getDetails().item(secKey).getKeyPaint();
                }
                else if(this.report.getGroupsFooters().item(secKey) !== null) {
                    sKey = this.report.getGroupsFooters().item(secKey).getKeyPaint();
                }
                else if(this.report.getFooters().item(secKey) !== null) {
                    sKey = this.report.getFooters().item(secKey).getKeyPaint();
                }
                else {
                    let sec: RefWrapper<cReportSection> = new RefWrapper();

                    bIsSecLn.set(true);

                    let secLn = cEditor.getSecLnFromKey(secKey, this.report.getHeaders(), sec);
                    if(secLn !== null) {
                        sKey = secLn.getKeyPaint();
                        if(sKey === "") {
                            sKey = sec.get().getKeyPaint();
                        }
                    }
                    else {
                        secLn = cEditor.getSecLnFromKey(secKey, this.report.getGroupsHeaders(), sec);
                        if(secLn !== null) {
                            sKey = secLn.getKeyPaint();
                            if(sKey === "") {
                                sKey = sec.get().getKeyPaint();
                            }
                        }
                        else {
                            secLn = cEditor.getSecLnFromKey(secKey, this.report.getDetails(), sec);
                            if(secLn !== null) {
                                sKey = secLn.getKeyPaint();
                                if(sKey === "") {
                                    sKey = sec.get().getKeyPaint();
                                }
                            }
                            else {
                                secLn = cEditor.getSecLnFromKey(secKey, this.report.getGroupsFooters(), sec);
                                if(secLn !== null) {
                                    sKey = secLn.getKeyPaint();
                                    if(sKey === "") {
                                        sKey = sec.get().getKeyPaint();
                                    }
                                }
                                else {
                                    secLn = cEditor.getSecLnFromKey(secKey, this.report.getFooters(), sec);
                                    if(secLn !== null) {
                                        sKey = secLn.getKeyPaint();
                                        if(sKey === "") {
                                            sKey = sec.get().getKeyPaint();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                if(sKey === "") return;

                this.pAddToSelected(sKey, false, bWasRemoved);
                if(bWasRemoved.get()) { sKey = ""; }

                this.keyFocus = sKey;
                this.keyObj = sKey;
                this.paint.setFocus(this.keyFocus, this.picReport.getGraphics(), true);
                cMainEditor.showProperties("S" + secKey, true);
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        private static getSecLnFromKey(secKey: string, sections: cIReportGroupSections, rtnSec: RefWrapper<cReportSection>) {
            let sec: cReportSection = null;
            rtnSec.set(null);
            for(let _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                if(sec.getSectionLines().item(secKey) !== null) {
                    rtnSec.set(sec);
                    return sec.getSectionLines().item(secKey);
                }
            }
            return null;
        }

        public checkSyntax(code: string) {
            let f = new cReportFormula();

            if(this.fProperties !== null) {
                f.setName(this.fProperties.getFormulaName());
            }
            else if(this.fSecProperties !== null) {
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

            sField = ctrl.getText();
            nFieldType = this.fProperties.getChartFieldType(idx);
            nIndex = this.fProperties.getChartIndex(idx);

            if(cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                ctrl.setText(sField);
                this.fProperties.setChartFieldType(idx, nFieldType);
                this.fProperties.setChartIndex(idx, nIndex);
                return true;
            }
            else {
                return false;
            }
        }

        public showHelpChartGroupField() {
            let sField = this.fProperties.getDbFieldGroupValue();
            let nFieldType = this.fProperties.getChartGroupFieldType();
            let nIndex = this.fProperties.getChartGroupIndex();

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

        private fSecProperties_UnloadForm() {
            this.fSecProperties = null;
        }

        private fToolBox_AddControl(controlName: string,
                                    controlType: csRptEditCtrlType,
                                    fieldName: string,
                                    formulaText: string,
                                    fieldType: number,
                                    fieldIndex: number) {
            this.beginDragging();
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

            if(this.report.getHeaders().item(secKey) !== null) {
                this.report.getHeaders().item(secKey).getFormulaHide().setText(formula);
            }
            else if(this.report.getGroupsHeaders().item(secKey) !== null) {
                this.report.getGroupsHeaders().item(secKey).getFormulaHide().setText(formula);
            }
            else if(this.report.getDetails().item(secKey) !== null) {
                this.report.getDetails().item(secKey).getFormulaHide().setText(formula);
            }
            else if(this.report.getGroupsFooters().item(secKey) !== null) {
                this.report.getGroupsFooters().item(secKey).getFormulaHide().setText(formula);
            }
            else if(this.report.getFooters().item(secKey) !== null) {
                this.report.getFooters().item(secKey).getFormulaHide().setText(formula);
            }
            else {
                let sec = new RefWrapper<cReportSection>(null);

                let secLn = cEditor.getSecLnFromKey(secKey, this.report.getHeaders(), sec);
                if(secLn !== null) {
                    secLn.getFormulaHide().setText(formula);
                }
                else {
                    secLn = cEditor.getSecLnFromKey(secKey, this.report.getGroupsHeaders(), sec);
                    if(secLn !== null) {
                        secLn.getFormulaHide().setText(formula);
                    }
                    else {
                        secLn = cEditor.getSecLnFromKey(secKey, this.report.getDetails(), sec);
                        if(secLn !== null) {
                            secLn.getFormulaHide().setText(formula);
                        }
                        else {
                            secLn = cEditor.getSecLnFromKey(secKey, this.report.getGroupsFooters(), sec);
                            if(secLn !== null) {
                                secLn.getFormulaHide().setText(formula);
                            }
                            else {
                                secLn = cEditor.getSecLnFromKey(secKey, this.report.getFooters(), sec);
                                if(secLn !== null) {
                                    secLn.getFormulaHide().setText(formula);
                                }
                            }
                        }
                    }
                }
            }
        }

        public keyDown(sender: object, e) {
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

                if(this.vSelectedKeys.length < 1) return;

                if(!this.keyboardMove) {
                    aspect = this.paint.getPaintObject(this.vSelectedKeys[0]).getAspect();
                    y = Math.trunc(aspect.getTop());
                    x = Math.trunc(aspect.getLeft());
                }
                else {
                    y = this.y;
                    x = this.x;
                }

                // resize
                //
                if(shift) {

                    if(this.keySizing === "") {
                        this.keySizing = this.paint.getPaintObject(this.vSelectedKeys[0]).getKey();
                    }

                    if(!this.keyboardMove) {

                        aspect = this.paint.getPaintObject(this.vSelectedKeys[0]).getAspect();
                        y += Math.trunc(aspect.getHeight());
                        x += Math.trunc(aspect.getWidth());

                        this.setMovingFromKeyboard(x, y);

                        if(this.keySizing === "") {
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

                    if(!this.keyboardMove) {
                        this.setMovingFromKeyboard(x, y);
                    }

                    if(this.keyMoving === "") {
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

                this.picReportMouseMove(
                    new MouseEventArgs(MouseButtons.Left, 0, x, y, 0),
                    new Point(this.x, this.y));
                this.x = x;
                this.y = y;

                this.keyboardMove = true;

            } catch(ex) {
                cError.mngError(ex);
            }
        }

        private setMovingFromKeyboard(x: number, y: number) {

            this.keyMoving = this.keyFocus;

            let po: cReportPaintObject = this.paint.getPaintObject(this.keyMoving);

            switch (po.getTag()) {
                case cGlobals.C_KEY_DETAIL:
                case cGlobals.C_KEY_FOOTER:
                case cGlobals.C_KEY_HEADER:
                    this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                    this.picReport.setCursor(Cursor.SizeNS);
                    break;
                default:
                    if(po.getRptType() === csRptSectionType.DETAIL
                        || po.getRptType() === csRptSectionType.HEADER
                        || po.getRptType() === csRptSectionType.GROUP_HEADER
                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                        || po.getRptType() === csRptSectionType.FOOTER) {

                        this.picReport.setCursor(Cursor.SizeNS);
                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                    }
                    else if(po.getRptType() === csRptSectionType.SECLN_HEADER
                        || po.getRptType() === csRptSectionType.SECLN_DETAIL
                        || po.getRptType() === csRptSectionType.SECLN_FOOTER
                        || po.getRptType() === csRptSectionType.SECLN_GROUPH
                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) {

                        this.picReport.setCursor(Cursor.SizeNS);
                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                    }
                    else {
                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                        this.picReport.setCursor(Cursor.SizeNS);
                    }
                    break;
            }

            let aspect: cReportAspect = this.paint.getPaintObject(this.keyMoving).getAspect();
            this.offX = x - aspect.getLeft();
            this.offY = y - (aspect.getTop() - aspect.getOffset());

            this.keyObj = this.keyMoving;

            cGlobals.setEditAlignTextState(this.vSelectedKeys.length);
            cGlobals.setEditAlignCtlState(this.vSelectedKeys.length > 1);
            this.pSetEditAlignValue();
            this.pSetFontBoldValue();
        }

        private picReportMouseDown(event, insidePos: Point) {

            if(this.paint === null) return;

            let button = event.buttons !== 0 ? event.button : -1;
            let ctrlKey: boolean = event.ctrlKey || event.shiftKey;
            let x: number = insidePos.x;
            let y: number = insidePos.y;

            try {

                let sKey: string = "";
                let lastKeyMoving: string = "";
                let lastKeyObj: string = "";

                // to avoid reentrancy
                if(this.opening) return;

                this.inMouseDown = true;

                if(this.dragging) {
                    this.addControlEnd(x, y);
                    this.endDragging();
                }

                this.endEditText(false);

                let bClearSelected = this.clearSelected(button, ctrlKey, x, y);

                if(button === MouseButtons.Left) {

                    lastKeyObj = this.keyObj;
                    this.keyObj = "";

                    sKey = this.keyMoving !== "" ? this.keyMoving : this.keySizing;

                    // to force focus in the header
                    if(sKey === "") {

                        const rsKey = new RefWrapper(sKey);
                        this.paint.pointIsInObject(x, y, rsKey);
                        sKey = rsKey.get();

                        if(sKey !== "") {

                            let po: cReportPaintObject = this.paint.getPaintObject(sKey);
                            lastKeyMoving = this.keyMoving;
                            this.keyMoving = sKey;

                            switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:

                                    // only if no controls are selected
                                    //
                                    if(ctrlKey) {

                                        if(this.vSelectedKeys.length > 0) return;
                                        if(this.vSelectedKeys[0].length > 0) return;

                                        this.keyMoving = lastKeyMoving;
                                        this.keyObj = lastKeyObj;
                                        return;
                                    }

                                    this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    this.picReport.setCursor(Cursor.SizeNS);
                                    break;

                                default:
                                    if(po.getRptType() === csRptSectionType.DETAIL
                                        || po.getRptType() === csRptSectionType.HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                                        || po.getRptType() === csRptSectionType.FOOTER) {

                                        // only if no controls are selected
                                        //
                                        if(ctrlKey) {

                                            if(this.vSelectedKeys.length > 0) return;
                                            if(this.vSelectedKeys[0].length > 0) return;

                                            this.keyMoving = lastKeyMoving;
                                            this.keyObj = lastKeyObj;
                                            return;
                                        }

                                        this.picReport.setCursor(Cursor.SizeNS);
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    }
                                    else if(po.getRptType() === csRptSectionType.SECLN_HEADER
                                        || po.getRptType() === csRptSectionType.SECLN_DETAIL
                                        || po.getRptType() === csRptSectionType.SECLN_FOOTER
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPH
                                        || po.getRptType() === csRptSectionType.SECLN_GROUPF) {

                                        // only if no controls are selected
                                        //
                                        if(ctrlKey) {

                                            if(this.vSelectedKeys.length > 0) return;
                                            if(this.vSelectedKeys[0].length > 0) return;

                                            this.keyMoving = lastKeyMoving;
                                            this.keyObj = lastKeyObj;
                                            return;
                                        }

                                        this.picReport.setCursor(Cursor.SizeNS);
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    }
                                    else {
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                                        this.picReport.setCursor(Cursor.MoveAll);
                                    }
                                    break;
                            }
                        }
                        else {
                            cMainEditor.clearProperties();
                        }
                    }

                    let bWasRemoved = new RefWrapper(false);
                    this.pAddToSelected(this.keyMoving, ctrlKey, bWasRemoved);

                    if(bWasRemoved.get()) { sKey = ""; }

                    if(sKey !== "") {
                        let aspect: cReportAspect = this.paint.getPaintObject(sKey).getAspect();
                        this.offX = x - aspect.getLeft();
                        this.offY = y - (aspect.getTop() - aspect.getOffset());
                    }

                    this.keyFocus = sKey;
                    this.keyObj = sKey;
                    this.paint.setFocus(this.keyFocus, this.picReport.getGraphics(), bClearSelected);

                    let poSelected: cReportPaintObject = this.paint.getPaintObject(sKey);
                    if(poSelected !== null) {
                        const propertyKey = poSelected.getIsSection() ? "S" + poSelected.getTag() : poSelected.getTag();
                        cMainEditor.showProperties(propertyKey, poSelected.getIsSection() || poSelected.getIsSectionLine());
                    }
                }
                else if(button === MouseButtons.Right) {
                    this.keySizing = "";
                    this.keyMoving = "";
                    this.keyObj = "";

                    const rsKey = new RefWrapper(sKey);
                    if(this.paint.pointIsInObject(x, y, rsKey)) {
                        sKey = rsKey.get()

                        this.keyObj = sKey;

                        bClearSelected = this.setSelectForRightButton();

                        this.keyFocus = sKey;
                        this.paint.setFocus(this.keyFocus, this.picReport.getGraphics(), bClearSelected);

                        let po: cReportPaintObject = this.paint.getPaintObject(sKey);

                        if(this.paint.paintObjIsSection(sKey)) {

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

                            let isGroup = new RefWrapper(false);
                            let isSecLn = new RefWrapper(false);

                            this.getSection(isGroup, isSecLn);

                            if(isSecLn.get()) { noDelete = true; }

                            this.showPopMenuSection(noDelete, isGroup.get(), x, y);
                            cMainEditor.showProperties("S" + po.getTag(), true);
                        }
                        else {
                            this.showPopMenuControl(true, x, y);
                            cMainEditor.showProperties(po.getTag());
                        }
                    }
                    else {
                        this.showPopMenuControl(false, x, y);
                    }
                }

                cGlobals.setEditAlignTextState(this.vSelectedKeys.length > 0);
                cGlobals.setEditAlignCtlState(this.vSelectedKeys.length > 1);
                this.pSetEditAlignValue();
                this.pSetFontBoldValue();
            }
            catch(ex) {
                cError.mngError(ex);
            }
            finally {
                this.inMouseDown = false;
            }
        }

        public setFontBold() {
            let bBold: number = -2;
            let bBoldValue: boolean;

            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                let font: cReportFont = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect().getFont();

                if(bBold === -2) {
                    bBold = font.getBold() ? -1 : 0;
                }
                else if(bBold !== (font.getBold() ? -1 : 0)) {
                    bBold = -2;
                    break;
                }
            }

            if(bBold === -2) {
                bBoldValue = true;
            }
            else {
                bBoldValue = bBold === 0;
            }

            let paintObject: cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            for(let i = 0; i < this.vSelectedKeys.length; i++) {

                paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                rptCtrl = this.report.getControls().item(paintObject.getTag());
                rptCtrl.getLabel().getAspect().getFont().setBold(bBoldValue);
                paintObject.getAspect().getFont().setBold(bBoldValue);
            }

            this.dataHasChanged = true;
            this.refreshAll();
            this.pSetFontBoldValue();
        }

        public pSetFontBoldValue() {
            let bBold: number = -2;

            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                let font: cReportFont = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect().getFont();

                if(bBold === -2) {
                    bBold = font.getBold() ? -1 : 0;
                }
                else if(bBold !== (font.getBold() ? -1 : 0)) {
                    bBold = -2;
                    break;
                }
            }

            cGlobals.setEditFontBoldValue(bBold);
        }

        public controlsAlign(align: CSReportGlobals.csECtlAlignConst) {
            let paintObject: cReportPaintObject = null;
            let rptCtrl: cReportControl = null;
            let aspect: cReportAspect = null;

            let top: number = 0;
            let left: number = 0;

            let newTop: number = 0;
            let newLeft: number = 0;
            let height: number = 0;
            let width: number = 0;

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

                    for(let i = 0; i < this.vSelectedKeys.length; i++) {

                        aspect = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect();
                        top = aspect.getTop();
                        left = aspect.getLeft();

                        switch (align) {
                            case csECtlAlignConst.csECtlAlignLeft:
                                if(left < newLeft) { newLeft = left; }
                                break;
                            case csECtlAlignConst.csECtlAlignRight:
                                if(left > newLeft) { newLeft = left; }
                                break;
                            case csECtlAlignConst.csECtlAlignTop:
                                if(top < newTop) { newTop = top; }
                                break;
                            case csECtlAlignConst.csECtlAlignBottom:
                                if(top > newTop) { newTop = top; }
                                break;
                        }
                    }

                    break;
            }

            for(let i = 0; i < this.vSelectedKeys.length; i++) {

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
            this.refreshAll();
        }

        public textAlign(align: HorizontalAlignment) {
            let paintObject: cReportPaintObject = null;
            let rptCtrl: cReportControl = null;

            for(let i = 0; i < this.vSelectedKeys.length; i++) {

                paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                rptCtrl = this.report.getControls().item(paintObject.getTag());

                rptCtrl.getLabel().getAspect().setAlign(align);
                paintObject.getAspect().setAlign(align);
            }

            this.dataHasChanged = true;
            this.refreshAll();
            this.pSetEditAlignValue();
        }

        private pSetEditAlignValue() {
            let align: number = -1;

            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                let aspect = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect();

                if(align === -1) {
                    align = aspect.getAlign();
                }
                else if(align !== aspect.getAlign()) {
                    align = -2;
                    break;
                }
            }
            cGlobals.setEditAlignValue(align);
        }

        private pAddToSelected(sKey: string, ctrlKey: boolean, bWasRemoved: RefWrapper<boolean>) {
            bWasRemoved.set(false);
            if(sKey === "") return;
            if(ctrlKey) {
                for(let i = 0; i < this.vSelectedKeys.length; i++) {
                    if(this.vSelectedKeys[i] === sKey) {
                        this.pRemoveFromSelected(sKey);
                        bWasRemoved.set(true);
                        return;
                    }
                }
            }
            else {
                if(this.alreadySelected(sKey)) return;
            }
            this.vSelectedKeys.push(sKey);
        }

        private alreadySelected(sKey: string) {
            if(sKey === "") {
                return true;
            }

            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                if(this.vSelectedKeys[i] === sKey) {
                    return true;
                }
            }
            return false;
        }

        private pRemoveFromSelected(sKey: string) {
            let i: number;

            for(i = 0; i < this.vSelectedKeys.length; i++) {
                if(this.vSelectedKeys[i] === sKey) {
                    break;
                }
            }

            if(i > this.vSelectedKeys.length) return;
            for(i = i + 1; i < this.vSelectedKeys.length; i++) {
                this.vSelectedKeys[i - 1] = this.vSelectedKeys[i];
            }
            if(this.vSelectedKeys.length > 0) {
                this.vSelectedKeys ;
            }
            else {
                this.vSelectedKeys = [];
            }

            this.paint.removeFromSelected(sKey, this.picReport.getGraphics());
        }

        private clearSelected(button: MouseButtons, ctrlKey: boolean, x: number, y: number) {
            if(!ctrlKey && button !== MouseButtons.Right) {
                let sKey = new RefWrapper("");
                this.paint.pointIsInObject(x, y, sKey);
                for(let i = 0; i < this.vSelectedKeys.length; i++) {
                    if(this.vSelectedKeys[i] === sKey.get()) {
                        return false;
                    }
                }
                this.vSelectedKeys = [];
                return true;
            }
            return false;
        }

        private showMoveAll(x: number, y: number) {
            let i: number = 0;
            let offsetTop: number = 0;
            let offsetLeft: number = 0;
            let firstLeft: number = 0;
            let firstTop: number = 0;
            let clear: boolean = false;
            let offSet2: number = 0;

            if(this.vSelectedKeys.length === 0) return;

            let aspect: cReportAspect = this.paint.getPaintObject(this.keyMoving).getAspect();
            firstLeft = aspect.getLeft();
            firstTop = aspect.getTop();

            clear = true;

            for(i = this.vSelectedKeys.length-1; i > -1; i--) {

                aspect = this.paint.getPaintObject(this.vSelectedKeys[i]).getAspect();
                offsetLeft = cEditor.getOffsetLeftFromControls(firstLeft, aspect.getLeft());
                offsetTop = cEditor.getOffsetTopFromControls(firstTop, aspect.getTop());
                offSet2 = aspect.getOffset();

                if(this.bMoveHorizontal) {
                    this.paint.moveObjToXYEx(this.keyMoving,
                                            x - this.offX + offsetLeft,
                                            firstTop - offSet2 + offsetTop,
                                            this.picReport.getGraphics(),
                                            clear);
                }
                else if(this.bMoveVertical) {
                    this.paint.moveObjToXYEx(this.keyMoving,
                                            firstLeft + offsetLeft,
                                            y - this.offY + offsetTop,
                                            this.picReport.getGraphics(),
                                            clear);
                }
                else {
                    this.paint.moveObjToXYEx(this.keyMoving,
                                            x - this.offX + offsetLeft,
                                            y - this.offY + offsetTop,
                                            this.picReport.getGraphics(),
                                            clear);
                }

                if(clear) { clear = false; }
            }
        }

        private picReportMouseMove(event, insidePos: Point) {
            //console.log("picReportMouseMove " + insidePos);

            if(this.paint === null) return;

            let button: MouseButtons = event.buttons !== 0 ? event.button : -1;
            let x: number = insidePos.x;
            let y: number = insidePos.y;

            let sKey: string = "";
            let rgnTp = new RefWrapper(csRptPaintRegionType.CRPTPNTRGNTYPEBODY);

            if(this.dragging) return;

            if(this.inMouseDown) return;

            //console.log("picReportMouseMove button: " + button);

            if(button === MouseButtons.Left) {

                this.paint.beginMove();

                if(this.keyMoving !== "") {

                    switch (this.moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL:
                            this.showMoveAll(x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL:
                            this.paint.moveHorizontal(this.keyMoving, x, this.picReport.getGraphics());
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
                            this.paint.moveVertical(this.keyMoving, y, this.picReport.getGraphics());
                            break;
                    }

                    this.moving = true;

                }
                else if(this.keySizing !== "") {
                    switch (this.moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVDOWN:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFT:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVUP:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, x, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, x, y, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, cGlobals.C_NO_CHANGE, x, y);
                            break;
                        case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                            this.paint.resize(this.picReport.getGraphics(), this.keySizing, cGlobals.C_NO_CHANGE, y, x, cGlobals.C_NO_CHANGE);
                            break;
                    }
                    this.moving = true;
                }
                else {
                    this.moving = false;
                }
            }
            else {
                if(this.keyFocus !== "") {
                    sKey = this.keyFocus;
                    const keyFocus = new RefWrapper(this.keyFocus);
                    if(this.paint.pointIsInThisObject(x, y, keyFocus, rgnTp)) {
                    const keyFocus = new RefWrapper(this.keyFocus);
                        this.keyFocus = keyFocus.get();
                        let po: cReportPaintObject = this.paint.getPaintObject(sKey);

                        let ctrl: cReportControl = this.report.getControls().item(po.getTag());
                        this.setStatusBarText(
                            ctrl.getName(),
                            ctrl.getControlType(),
                            ctrl.getFormulaHide().getText(),
                            ctrl.getFormulaValue().getText(),
                            ctrl.getHasFormulaHide(),
                            ctrl.getHasFormulaValue(),
                            ctrl.getField().getName());

                        if(po.getPaintType() === csRptPaintObjType.CSRPTPAINTOBJLINE) {
                            this.keyMoving = sKey;
                            this.keySizing = "";
                            this.picReport.setCursor(Cursor.SizeNS);
                        }
                        else {
                            switch (po.getTag()) {
                                case cGlobals.C_KEY_DETAIL:
                                case cGlobals.C_KEY_FOOTER:
                                case cGlobals.C_KEY_HEADER:
                                    this.keyMoving = sKey;
                                    this.keySizing = "";
                                    this.picReport.setCursor(Cursor.SizeNS);
                                    this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    break;

                                default:

                                if(po.getRptType() === csRptSectionType.DETAIL
                                    || po.getRptType() === csRptSectionType.HEADER
                                    || po.getRptType() === csRptSectionType.GROUP_HEADER
                                        || po.getRptType() === csRptSectionType.GROUP_FOOTER
                                    || po.getRptType() === csRptSectionType.FOOTER) {

                                        this.keyMoving = sKey;
                                        this.keySizing = "";
                                        this.picReport.setCursor(Cursor.SizeNS);
                                        this.moveType = csRptEditorMoveType.CSRPTEDMOVTVERTICAL;
                                    }
                                    else {

                                        switch (rgnTp.get()) {
                                            case csRptPaintRegionType.CRPTPNTRGNTYPEBODY:
                                                this.picReport.setCursor(Cursor.MoveAll);
                                                this.keyMoving = sKey;
                                                this.keySizing = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVTALL;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEDOWN:
                                                this.picReport.setCursor(Cursor.SizeNS);
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPEUP:
                                                this.picReport.setCursor(Cursor.SizeNS);
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVUP;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFT:
                                                this.picReport.setCursor(Cursor.SizeEW);
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVLEFT;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHT:
                                                this.picReport.setCursor(Cursor.SizeEW);
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVRIGHT;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN:
                                                this.picReport.setCursor(Cursor.SizeNESW);
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVLEFTDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP:
                                                this.picReport.setCursor(Cursor.SizeNESW);
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTUP;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN:
                                                this.picReport.setCursor(Cursor.SizeNWSE);
                                                this.keySizing = sKey;
                                                this.keyMoving = "";
                                                this.moveType = csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN;
                                                break;

                                            case csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP:
                                                this.picReport.setCursor(Cursor.SizeNWSE);
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
                        this.setStatusBarText("");
                        this.picReport.setCursor(Cursor.Default);
                        this.keySizing = "";
                        this.keyMoving = "";
                    }
                }

                const rsKey = new RefWrapper(sKey);
                if(this.paint.pointIsInObject(x, y, rsKey, rgnTp)) {
                    sKey = rsKey.get();

                    let po: cReportPaintObject = this.paint.getPaintObject(sKey);
                    if(po.getRptType() === csRptSectionType.CONTROL) {
                        let rptCtrl: cReportControl = this.report.getControls().item(po.getTag());
                        if(rptCtrl !== null) {
                            this.setStatusBarText(rptCtrl.getName(),
                                            rptCtrl.getControlType(),
                                            rptCtrl.getFormulaHide().getText(),
                                            rptCtrl.getFormulaValue().getText(),
                                            rptCtrl.getHasFormulaHide(),
                                            rptCtrl.getHasFormulaValue(),
                                            rptCtrl.getField().getName());
                        }
                    }
                    else {
                        this.setStatusBarText("");
                    }
                }
                else {
                    this.setStatusBarText("");
                }
            }
        }

        private setStatusBarText(ctrlName: string,
                                  ctrlType: csRptControlType = csRptControlType.CS_RPT_CT_LABEL,
                                  formulaHide: string = "",
                                  formulaValue: string = "",
                                  hasFormulaHide: boolean = false,
                                  hasFormulaValue: boolean = false,
                                  fieldName: string = "") {

            let msg: string = "";
            let strCtlType: string = "";

            switch (ctrlType) {
                case csRptControlType.CS_RPT_CT_DB_IMAGE:
                    strCtlType = "DbImage";
                    break;
                case csRptControlType.CS_RPT_CT_FIELD:
                    strCtlType = "Field";
                    break;
                case csRptControlType.CS_RPT_CT_IMAGE:
                    strCtlType = "Image";
                    break;
                case csRptControlType.CS_RPT_CT_LABEL:
                    strCtlType = "Label";
                    break;
            }

            if(ctrlName !== "") {
                msg = "Ctl:[" + ctrlName
                    + "]Tipo:[" + strCtlType
                    + "]F.Hide:[" + formulaHide.substring(0, 100)
                    + "]Activa[" + ( hasFormulaHide).toString()
                    + "]F.Value:[" + formulaValue.substring(0, 100)
                    + "]Activa[" + ( hasFormulaValue).toString()
                    + "]Field:[" + fieldName + "]";
            }
            this.fMain.setStatusBarText(msg);
        }

        private picReportMouseUp(event, insidePos: Point) {
            //console.log("picReportMouseUp " + insidePos);

            if(this.paint === null) return;

            let x: number = insidePos.x;
            let y: number = insidePos.y;

            // to avoid reentrancy
            if(this.opening) return;

            //----------------------------------------------------
            // MOVING
            //----------------------------------------------------

            if(this.moving) {
                if(this.keyMoving !== "") {
                    switch (this.moveType) {
                        case csRptEditorMoveType.CSRPTEDMOVTALL:
                            if(this.bMoveVertical) {
                                this.pMoveAll(this.C_NO_MOVE, y);
                            }
                            else if(this.bMoveHorizontal) {
                                this.pMoveAll(x, this.C_NO_MOVE);
                            }
                            else {
                                this.pMoveAll(x, y);
                            }
                            break;

                        case csRptEditorMoveType.CSRPTEDMOVTHORIZONTAL:
                            this.pMoveHorizontal(x);
                            break;

                        case csRptEditorMoveType.CSRPTEDMOVTVERTICAL:
                            this.pMoveVertical(x, y);
                            break;
                    }

                //----------------------------------------------------
                // SIZING
                //----------------------------------------------------
                }
                else if(this.keySizing !== "") {
                    this.pResizeControl(x, y);
                }

                this.refreshBody();
                this.moving = false;
                this.refreshRule();
            }

            this.keySizing = "";
            this.keyMoving = "";
        }

        private picReport_Paint(sender: object, e: any) {
            if(this.paint !== null) {
                this.paint.paintPicture(e.Graphics, false);
            }
        }

        public setParameters() {
            let connect: CSConnect.cConnect = new CSConnect.cConnect();
            let param: CSReportEngine.cParameter = null;

            for(let _i = 0; _i < this.report.getConnect().getParameters().count(); _i++) {
                param = this.report.getConnect().getParameters().item(_i);
                let connectParam: CSConnect.cParameter = connect.getParameters().add(null, "");
                connectParam.setName(param.getName());
                connectParam.setValue(param.getValue());
            }

            if(this.report.getConnect().getDataSource() === "") {
                cWindow.msgWarning("Before editing the parameter info you must define a connection");
                return;
            }

            connect.setStrConnect(this.report.getConnect().getStrConnect());
            connect.setDataSource(this.report.getConnect().getDataSource());
            connect.setDataSourceType(this.report.getConnect().getDataSourceType());

            if(! connect.getDataSourceColumnsInfo()) {
                return;
            }

            cGlobals.setParametersAux(connect, this.report.getConnect());
        }

        public setSimpleConnection() {
            let f: FSimpleConnect = new FSimpleConnect();
            try {

                let strConnect: string = "";
                strConnect = this.report.getConnect().getStrConnect();
                f.setServer(Utils.getToken("Data Source", strConnect));
                f.setDataBase(Utils.getToken("Initial Catalog", strConnect));
                f.setUser(Utils.getToken("User ID", strConnect));
                f.setPassword(Utils.getToken("Password", strConnect));
                if(f.getUser() === "") {
                    f.setConnectTypeToNT();
                }
                else {
                    f.setConnectTypeToSQL();
                }
                f.showDialog();

                if(!f.getOk()) {
                    f.close();
                }
                else {
                    this.report.getConnect().setStrConnect(f.getStrConnect());
                }

            } catch(ex) {
                cError.mngError(ex);
                f.close();
            }
        }

        public configConnection(rptConnect: cReportConnect) {
            try {

                let connect: CSConnect.cConnect = new CSConnect.cConnect();

                if(! connect.showOpenConnection())
                    return false;

                this.refreshAll();

                if(! connect.getDataSourceColumnsInfo()) {
                    return false;
                }

                if(rptConnect === null) {
                    cGlobals.setParametersAux(connect, this.report.getConnect());
                }
                else {
                    cGlobals.setParametersAux(connect, rptConnect);
                }

                if(cMainEditor.getToolbox(this) !== null) { this.showToolbox(); }

                return true;

            } catch(ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public setAllConnectToMainConnect() {
            try {

                let connect: cReportConnect = null;
                for(let _i = 0; _i < this.report.getConnectsAux().count(); _i++) {
                    connect = this.report.getConnectsAux().item(_i);
                    connect.setStrConnect(this.report.getConnect().getStrConnect());
                }

            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public deleteObj(bDelSectionLine: boolean): Promise<void> {
            let sec: cReportSection = null;
            let secs = new RefWrapper<cReportSections>(null);
            let secLn = new RefWrapper<cReportSectionLine>(null);
            let ctrl: cReportControl = null;
            let paintObj: cReportPaintObject = null;

            let isGroupFooter = new RefWrapper(false);
            let isGroupHeader = new RefWrapper(false);
            let isSecLn = new RefWrapper(false);

            if(this.keyFocus === "") return;

            let group: cReportGroup = null;
            let secG: cReportSection = null;

            if(this.paint.paintObjIsSection(this.keyFocus)) {
                if(this.paint.getPaintSections().item(this.keyFocus) === null) return;

                let po: cReportPaintObject = this.paint.getPaintSections().item(this.keyFocus);

                // first we check it is not a section line
                //
                sec = this.getSection2(isSecLn, secLn, false, isGroupHeader, isGroupFooter);
                if(!isSecLn.get()) {

                    // check it is not the last section line in this section
                    //
                    if(bDelSectionLine) {

                        sec = this.getSection2(isSecLn, secLn, true, isGroupHeader, isGroupFooter);
                    }
                    if(!this.canDeleteSection(secs, sec, po.getTag())) return;
                }

                let what: string;

                if(isSecLn.get()) {
                    what = "the section line";
                } else {
                    what = "the section";
                }

                return cWindow.ask("Are yuo sure you want to delete "
                    + what + " and all the controls it contains? ", MessageBoxDefaultButton.Button2).then((answer) => {
                    if(!answer)
                        return;

                    if(isSecLn) {

                        for(let _i = 0; _i < secLn.get().getControls().count(); _i++) {
                            ctrl = secLn.get().getControls().item(_i);
                            for(let i = 0; i < this.paint.getPaintObjects().count(); i++) {
                                paintObj = this.paint.getPaintObjects().item(i);
                                if(paintObj.getTag() === ctrl.getKey()) {
                                    this.paint.getPaintObjects().remove(paintObj.getKey());
                                    break;
                                }
                            }
                        }

                        secLn.get().getControls().clear();

                        // at least one section line has to be in the section
                        //
                        if(sec.getSectionLines().count() > 1) {
                            sec.getSectionLines().remove(secLn.get().getKey());
                        }

                    } else {

                        for(let _i = 0; _i < sec.getSectionLines().count(); _i++) {
                            secLn.set(sec.getSectionLines().item(_i));
                            for(let _j = 0; _j < secLn.get().getControls().count(); _j++) {
                                ctrl = secLn.get().getControls().item(_j);
                                for(let i = 0; i < this.paint.getPaintObjects().count(); i++) {
                                    paintObj = this.paint.getPaintObjects().item(i);
                                    if(paintObj.getTag() === ctrl.getKey()) {
                                        this.paint.getPaintObjects().remove(paintObj.getKey());
                                        break;
                                    }
                                }
                            }
                        }

                        // if this is a group section we need to delete the header and the footer
                        //

                        if(isGroupFooter || isGroupHeader) {
                            if(isGroupHeader) {
                                for(let _i = 0; _i < this.report.getGroups().count(); _i++) {
                                    group = this.report.getGroups().item(_i);
                                    if(group.getHeader().getKey() === sec.getKey()) {
                                        break;
                                    }
                                }
                                secG = group.getFooter();
                            } else if(isGroupFooter) {
                                for(let _i = 0; _i < this.report.getGroups().count(); _i++) {
                                    group = this.report.getGroups().item(_i);
                                    if(group.getFooter().getKey() === sec.getKey()) {
                                        break;
                                    }
                                }
                                secG = group.getHeader();
                            }

                            for(let _i = 0; _i < secG.getSectionLines().count(); _i++) {
                                secLn.set(secG.getSectionLines().item(_i));
                                for(let _j = 0; _j < secLn.get().getControls().count(); _j++) {
                                    ctrl = secLn.get().getControls().item(_j);
                                    for(let i = 0; i < this.paint.getPaintObjects().count(); i++) {
                                        paintObj = this.paint.getPaintObjects().item(i);
                                        if(paintObj.getTag() === ctrl.getKey()) {
                                            this.paint.getPaintObjects().remove(paintObj.getKey());
                                            break;
                                        }
                                    }
                                }
                            }

                            for(let i = 0; i < this.paint.getPaintSections().count(); i++) {
                                paintObj = this.paint.getPaintSections().item(i);
                                if(paintObj.getTag() === secG.getKey()) {
                                    this.paint.getPaintSections().remove(paintObj.getKey());
                                    break;
                                }
                            }
                            if(group === null) {
                                throw new Exception("group is null");
                            }
                            this.report.getGroups().remove(group.getIndex());
                        } else {
                            if(secs === null) {
                                throw new Exception("secs is null");
                            }
                            secs.get().remove(sec.getKey());
                        }
                    }

                    let bDeletePaintObj: boolean = true;
                    if(isSecLn) {
                        bDeletePaintObj = sec.getKeyPaint() !== this.keyFocus;
                    }

                    if(bDeletePaintObj) {

                        this.paint.getPaintSections().remove(this.keyFocus);

                        // if I have deleted the last section line in this
                        // section I need to delete the paint object
                        // associated with the current last section line
                        // and then to associate this section line with
                        // the paint object of the section
                    } else {
                        let secLns: cReportSectionLines = sec.getSectionLines();
                        this.paint.getPaintSections().remove(secLns.item(secLns.count() - 1).getKeyPaint());
                        secLns.item(secLns.count() - 1).setKeyPaint(sec.getKeyPaint());
                    }

                    this.pResetKeysFocus();
                    this.vSelectedKeys = [];

                    this.validateSectionAspect();
                    this.updateSectionNameInPaintObjects();
                });
            }
            else {
                paintObj = this.paint.getPaintObjects().item(this.keyFocus);
                if(paintObj === null) return;

                if(! cWindow.ask("Confirm you want to delete the control? ", MessageBoxDefaultButton.Button2)) return;

                for(let i = 0; i < this.vSelectedKeys.length; i++) {
                    paintObj = this.paint.getPaintObjects().item(this.vSelectedKeys[i]);
                    ctrl = this.report.getControls().item(paintObj.getTag());

                    this.paint.getPaintObjects().remove(paintObj.getKey());
                    if(ctrl === null) return;
                    ctrl.getSectionLine().getControls().remove(ctrl.getKey());
                }

                this.pResetKeysFocus();
                this.vSelectedKeys = [];
            }

            this.refreshAll();

            return Promise.resolve();
        }

        private updateSectionNameInPaintObjects() {
            this.updateSectionNameInPaintObjectsAux(this.report.getHeaders());
            this.updateSectionNameInPaintObjectsAux(this.report.getFooters());
            this.updateSectionNameInPaintObjectsAux(this.report.getDetails());
            this.updateSectionNameInPaintObjectsAux(this.report.getGroupsHeaders());
            this.updateSectionNameInPaintObjectsAux(this.report.getGroupsFooters());
        }

        private updateSectionNameInPaintObjectsAux(sections: cIReportGroupSections) {
            for(let i =0; i < sections.count(); i++) {
                let sec = sections.item(i);
                let paintObj = this.paint.getPaintSections().item(sec.getKeyPaint());
                if(paintObj !== null) {
                    paintObj.setText(sec.getName());
                }
            }
        }

        private canDeleteSection(secs: RefWrapper<cReportSections>,
                                  sec: cReportSection,
                                  tag: string) {
            // header
            //
            let secAux: cReportSection = this.report.getHeaders().item(tag);
            secs.set(null);

            if(secAux !== null) {
                if(secAux === sec || sec === null) {
                    if(secAux.getTypeSection() === csRptSectionType.MAIN_HEADER) {
                        return cWindow.msgInfo("The main header can't be deleted").then(() => {
                            return false;
                        });
                    }
                    secs.set(this.report.getHeaders());
                }
            }
            // if we don't find the section yet
            //
            if(secs.get() === null) {

                // footers
                //
                secAux = this.report.getFooters().item(tag);
                if(secAux !== null) {
                    if(secAux === sec || sec === null) {
                        if(secAux.getTypeSection() === csRptSectionType.MAIN_FOOTER) {
                            cWindow.msgInfo("The main footer can't be deleted");
                            return false;
                        }
                        secs.set(this.report.getFooters());
                    }
                }
                // if we don't find the section yet
                //
                if(secs.get() === null) {

                    // check for groups
                    //
                    secAux = this.report.getGroupsHeaders().item(tag);
                    if(secAux !== null) {
                        if(!((secAux === sec || sec === null))) {

                            secAux = this.report.getGroupsFooters().item(tag);
                            if(secAux !== null) {
                                if(!(secAux === sec || sec === null)) {

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
            this.picReport.setCursor(Cursor.Default);
        }

        public addDBField() {
            let sField: string = "";
            let nIndex: number = 0;
            let nFieldType: number = 0;

            if(! cGlobals.showDbFields(sField, nFieldType, nIndex, this)) return;

            this.beginDragging();
            this.controlName = "";
            this.controlType = csRptEditCtrlType.field;
            this.fieldName = sField;
            this.formulaText = "";
            this.fieldIndex = nIndex;
            this.fieldType = nFieldType;
        }

        public addLabel() {
            this.pAddLabelAux(csRptEditCtrlType.label);
        }

        public addLineLabel() {
            this.pAddLabelAux(csRptEditCtrlType.lineLabel);
        }

        public addImage() {
            this.pAddLabelAux(csRptEditCtrlType.image);
        }

        public addChart() {
            this.pAddLabelAux(csRptEditCtrlType.chart);
        }

        public pAddLabelAux(ctrlType: csRptEditCtrlType) {
            this.beginDragging();
            this.controlName = "";
            this.controlType = ctrlType;
            this.fieldName = "";
            this.formulaText = "";
            this.fieldIndex = 0;
            this.fieldType = 0;
        }

        private addControlEnd(left: number, top: number) {

            this.dragging = false;

            if(this.controlType === csRptEditCtrlType.none) {
                return true;
            }

            this.dataHasChanged = true;

            let originalLeft: number = 0;
            let copyCtrl: cReportControl = null;
            let movedCtrl: cReportControl = null;
            let firstCtrlLeft: number = 0;
            let offSet: number = 0;

            if(this.copyControls) {

                if(this.vCopyKeys.length === 0) { return false; }

                originalLeft = left;

                let keyPaint: string = this.vCopyKeys[this.vCopyKeys.length - 1];
                let keyCtrl: string = this.paint.getPaintObjects().item(keyPaint).getTag();
                movedCtrl = this.report.getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for(let i = this.vCopyKeys.length-1; i > -1; i--) {

                    keyPaint = this.vCopyKeys[i];
                    keyCtrl = this.paint.getPaintObjects().item(keyPaint).getTag();
                    copyCtrl = this.report.getControls().item(keyCtrl);

                    // starting with the first control we move the left
                    // of every control if reach the right margin
                    // move down a line and restart
                    //
                    offSet = cEditor.getOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft());
                    left = originalLeft + offSet;

                    if(this.bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft();

                    }

                    if(left - 26 > this.picReport.getWidth()) {
                        left = originalLeft + (offSet % originalLeft);
                        top += 6;
                    }

                    if(top > this.picReport.getHeight()) {
                        top = this.picReport.getHeight() - 6;
                    }

                    this.addControlEndAux(left, top, copyCtrl);

                }
                this.copyControls = false;

            }
            else if(this.copyControlsFromOtherReport) {

                if(this.fMain.getReportCopySource() === null) { return false; }

                originalLeft = left;

                let editor: cEditor = this.fMain.getReportCopySource();
                let keyPaint: string = editor.getVCopyKeys(editor.getVCopyKeysCount());
                let keyCtrl: string = editor.getPaint().getPaintObjects().item(keyPaint).getTag();
                movedCtrl = editor.getReport().getControls().item(keyCtrl);
                firstCtrlLeft = movedCtrl.getLabel().getAspect().getLeft();

                for(let i = editor.getVCopyKeysCount()-1; i > -1; i--) {

                    keyPaint = editor.getVCopyKeys(i);
                    keyCtrl = editor.getPaint().getPaintObjects().item(keyPaint).getTag();
                    copyCtrl = editor.getReport().getControls().item(keyCtrl);

                    // starting with the first control we move the left
                    // of every control if reach the right margin
                    // move down a line and restart
                    //
                    offSet = cEditor.getOffsetLeftFromControls(firstCtrlLeft, copyCtrl.getLabel().getAspect().getLeft());
                    left = originalLeft + offSet;

                    if(this.bCopyWithoutMoving) {

                        top = copyCtrl.getLabel().getAspect().getTop();
                        left = copyCtrl.getLabel().getAspect().getLeft();

                    }

                    if(left - 400 > this.picReport.getWidth()) {
                        left = originalLeft + (offSet % originalLeft);
                        top = top + 100;
                    }

                    if(top > this.picReport.getHeight()) {
                        top = this.picReport.getHeight() - 100;
                    }

                    this.addControlEndAux(left, top, copyCtrl);
                }

                this.copyControlsFromOtherReport = false;
            }
            else {
                this.addControlEndAux(left, top, null);
            }

            this.refreshBody();

            return true;
        }

        private static getOffsetLeftFromControls(leftCtrl1: number, leftCtrl2: number) {
            return leftCtrl2 - leftCtrl1;
        }

        private static getOffsetTopFromControls(topCtrl1: number, topCtrl2: number) {
            return topCtrl2 - topCtrl1;
        }

        private addControlEndAux(left: number, top: number, baseControl: cReportControl) {
            // first we add a control in the main header
            // after the user complete the add operation
            // we would move the control to the desired
            // section line
            //
            let ctrl = this.report.getHeaders().item(cGlobals.C_KEY_HEADER)
                .getSectionLines().item(0).getControls().add();

            // later we will set the properties related to the type of the control
            //
            this.nextNameCtrl = this.nextNameCtrl + 1;
            ctrl.setName(cGlobals.C_CONTROL_NAME + this.nextNameCtrl);

            if(baseControl === null) {
                this.setNewControlProperties(ctrl);
            }
            else {
                cEditor.copyControl(baseControl, ctrl);
            }

            this.setNewControlPosition(ctrl, left, top);
        }

        private static copyFont(fromFont: cReportFont, toFont: cReportFont) {
            toFont.setBold(fromFont.getBold());
            toFont.setForeColor(fromFont.getForeColor());
            toFont.setItalic(fromFont.getItalic());
            toFont.setName(fromFont.getName());
            toFont.setSize(fromFont.getSize());
            toFont.setStrike(fromFont.getStrike());
            toFont.setUnderline(fromFont.getUnderline());
        }

        private static copyChart(fromChart: cReportChart, toChart: cReportChart) {
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

            for(let _i = 0; _i < fromChart.getSeries().count(); _i++) {
                let fromSequence = fromChart.getSeries().item(_i);
                let sequence: cReportChartSequence = toChart.getSeries().add(new cReportChartSequence());
                sequence.setColor(fromSequence.getColor());
                sequence.setLabelFieldName(fromSequence.getLabelFieldName());
                sequence.setLabelIndex(fromSequence.getLabelIndex());
                sequence.setValueFieldName(fromSequence.getValueFieldName());
                sequence.setValueIndex(fromSequence.getValueIndex());
            }
        }

        private static copyAspect(fromAspect: cReportAspect, toAspect: cReportAspect) {
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

            cEditor.copyFont(fromAspect.getFont(), toAspect.getFont());
        }

        // TODO: this function shouldn't be needed
        //
        private static copyAspectToPaint(fromAspect: cReportAspect, toAspect: cReportAspect) {
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

            cEditor.copyFontPaint(fromAspect.getFont(), toAspect.getFont());
        }

        private static copyFontPaint(fromFont: cReportFont, toFont: cReportFont) {
            toFont.setBold(fromFont.getBold());
            toFont.setForeColor(fromFont.getForeColor());
            toFont.setItalic(fromFont.getItalic());
            toFont.setName(fromFont.getName());
            toFont.setSize(fromFont.getSize());
            toFont.setStrike(fromFont.getStrike());
            toFont.setUnderline(fromFont.getUnderline());
        }

        private static copyControl(fromCtrl: cReportControl, toCtrl: cReportControl) {
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

            cEditor.copyAspect(fromCtrl.getImage().getAspect(), toCtrl.getImage().getAspect());

            let label: cReportLabel = toCtrl.getLabel();
            cEditor.copyAspect(fromCtrl.getLabel().getAspect(), label.getAspect());
            label.setCanGrow(fromCtrl.getLabel().getCanGrow());
            label.setText(fromCtrl.getLabel().getText());

            cEditor.copyAspect(fromCtrl.getLine().getAspect(), toCtrl.getLine().getAspect());
            cEditor.copyChart(fromCtrl.getChart(), toCtrl.getChart());
        }

        private setNewControlProperties(ctrl: cReportControl) {
            const CTRL_HEIGHT: number = 19;
            const CTRL_WIDTH: number = 133;
            const LINE_HEIGHT: number = 1;

            let label: cReportLabel = null;
            let aspect: cReportAspect = null;

            let ctrlHeight: number = CTRL_HEIGHT;
            let transparent: boolean = true;

            ctrl.getLabel().getAspect().setAlign(HorizontalAlignment.Left);

            switch (this.controlType) {
                case csRptEditCtrlType.field:
                    ctrl.setControlType(csRptControlType.CS_RPT_CT_FIELD);
                    ctrl.getLabel().setText(this.fieldName);
                    let field: cReportField = ctrl.getField();
                    field.setIndex(this.fieldIndex);
                    field.setName(this.fieldName);
                    field.setFieldType(this.fieldType);

                    if(DatabaseGlobals.isNumberField(this.fieldType)) {
                        aspect = ctrl.getLabel().getAspect();
                        aspect.setAlign(HorizontalAlignment.Right);
                        aspect.setFormat("#0.00;-#0.00");
                    }
                    break;

                case csRptEditCtrlType.formula:
                    ctrl.setControlType(csRptControlType.CS_RPT_CT_LABEL);
                    ctrl.getFormulaValue().setText(this.formulaText + "(" + this.controlName + ")");
                    ctrl.setHasFormulaValue(true);
                    label = ctrl.getLabel();
                    aspect = label.getAspect();
                    aspect.setFormat("0.00;-0.00");
                    aspect.getFont().setBold(true);
                    label.setText(ctrl.getFormulaValue().getText());
                    aspect.setAlign(HorizontalAlignment.Right);
                    break;

                case csRptEditCtrlType.label:
                    ctrl.setControlType(csRptControlType.CS_RPT_CT_LABEL);
                    label = ctrl.getLabel();
                    label.setText(this.fieldName);
                    label.getAspect().getFont().setBold(true);
                    break;

                case csRptEditCtrlType.lineLabel:
                    ctrlHeight = LINE_HEIGHT;
                    ctrl.setControlType(csRptControlType.CS_RPT_CT_LABEL);
                    label = ctrl.getLabel();
                    label.setText(this.fieldName);
                    aspect = label.getAspect();
                    aspect.getFont().setBold(true);
                    aspect.setBackColor(Color.Gray.toArgb());
                    transparent = false;
                    break;

                case csRptEditCtrlType.image:
                    ctrl.setControlType(csRptControlType.CS_RPT_CT_IMAGE);
                    ctrl.getLabel().setText(this.fieldName);
                    break;

                case csRptEditCtrlType.chart:
                    ctrl.setControlType(csRptControlType.CS_RPT_CT_CHART);
                    ctrl.getLabel().setText(this.fieldName);
                    break;
            }

            aspect = ctrl.getLabel().getAspect();
            aspect.setWidth(CTRL_WIDTH);
            aspect.setHeight(ctrlHeight);
            aspect.setTransparent(transparent);
        }

        private setNewControlPosition(ctrl: cReportControl, left: number, top: number) {
            let aspect: cReportAspect = ctrl.getLabel().getAspect();
            aspect.setLeft(left);
            aspect.setTop(top);

            let paintType: csRptPaintObjType = csRptPaintObjType.CSRPTPAINTOBJBOX;

            if(ctrl.getControlType() === csRptControlType.CS_RPT_CT_IMAGE
                || ctrl.getControlType() === csRptControlType.CS_RPT_CT_CHART) {
                paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
            }

            let paintObj = this.paint.getNewObject(paintType);

            aspect = ctrl.getLabel().getAspect();

            cEditor.copyAspectToPaint(aspect, paintObj.getAspect());

            aspect.setLeft(left);
            aspect.setTop(top);

            paintObj.setText(ctrl.getLabel().getText());

            paintObj.setRptType(csRptSectionType.CONTROL);

            paintObj.setTag(ctrl.getKey());
            ctrl.setKeyPaint(paintObj.getKey());

            // position the control in the desired section line
            //
            this.moveControl(paintObj.getKey());

            this.paint.drawObject(paintObj.getKey(), this.picReport.getGraphics());
        }

        public addGroup() {
            this.showCurrentGroupProperties();
            this.refreshAll();
        }

        private getGroup(key: string) {
            let group: cReportGroup = null;

            for(let _i = 0; _i < this.report.getGroups().count(); _i++) {
                group = this.report.getGroups().item(_i);
                if(group.getHeader().getKey() === key) { break; }
                if(group.getFooter().getKey() === key) { break; }
            }

            return group;
        }

        public addSectionLine() {
            let aspect: cReportAspect = null;
            let isGroup = new RefWrapper(false);

            let sec = this.getSection(isGroup);

            if(sec === null) return;

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
                    // the result of subtract to the height of the section
                    // the sum of every section line except the height of the
                    // last one section line, if we don't modify the height
                    // of the section the new section line will have an height
                    // of zero (actually the minimum height is 1 pixel).
                    //
                    // for this reason we change the height of the section
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

            this.pAddSectionLinesAux(sec);

            // we reset this variable to zero
            //
            this.newSecLineOffSet = 0;
        }

        private pAddSectionLinesAux(sec: cReportSection) {
            let typeSecLn: csRptSectionType = csRptSectionType.CONTROL;
            let aspect: cReportAspect = null;
            let maxBottom = new RefWrapper<number>(0);
            let minBottom = new RefWrapper<number>(0);
            let index: number = 0;
            let y: number = 0;

            switch (sec.getTypeSection()) {
                case csRptSectionType.HEADER:
                case csRptSectionType.MAIN_HEADER:

                    this.moveHeader(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_HEADER;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.DETAIL:
                case csRptSectionType.MAIN_DETAIL:

                    this.moveDetails(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_DETAIL;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.GROUP_HEADER:

                    this.moveGroupHeader(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_GROUPH;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.GROUP_FOOTER:

                    this.moveGroupFooter(sec.getKey(), minBottom, maxBottom);
                    aspect = sec.getAspect();
                    y = aspect.getHeight() + aspect.getTop();
                    typeSecLn = csRptSectionType.SECLN_GROUPF;
                    index = sec.getSectionLines().count() - 2;
                    break;

                case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:

                    aspect = sec.getAspect();
                    aspect.setTop(aspect.getTop() - cGlobals.C_HEIGHT_NEW_SECTION);
                    this.moveFooter(sec.getKey(), minBottom, maxBottom);
                    this.offY = 0;
                    y = aspect.getHeight() + aspect.getTop() - this.offSet - cGlobals.C_HEIGHT_BAR_SECTION;
                    typeSecLn = csRptSectionType.SECLN_FOOTER;
                    index = 0;
                    break;
            }
            // we add a paint object to all sectionLines except the last one
            // the last sectionLine uses the paint object of the section
            //
            let secL: cReportSectionLine = sec.getSectionLines().item(index);
            secL.setKeyPaint(
                this.paintSection(secL.getAspect(),
                                secL.getKey(),
                                sec.getTypeSection(),
                                this.C_SECTION_LINE + (sec.getSectionLines().count() - 2).toString(),
                                true));

            // section line
            let po: cReportPaintObject = this.paint.getPaintSections().item(secL.getKeyPaint());
            po.setRptType(typeSecLn);
            po.setRptKeySec(sec.getKey());

            // section
            po = this.paint.getPaintSections().item(sec.getKeyPaint());
            po.setTextLine(this.C_SECTION_LINE + (sec.getSectionLines().count() - 1).toString());

            this.moveSection(this.paint.getPaintSections().item(this.keyFocus), 0, y,
                minBottom.get(), maxBottom.get(), sec, false);

            this.refreshBody();
            this.refreshRule();
        }

        public addSection(typeSection: csRptSectionType) {

            if(!this.editor.isVisible()) return;

            let rptSection: cReportSection = null;
            let topSec: cReportSection = null;
            let aspect: cReportAspect = null;
            let paintObj: cReportPaintObject = null;

            let maxBottom = new RefWrapper<number>(0);
            let minBottom = new RefWrapper<number>(0);
            let y: number = 0;

            switch (typeSection) {
                case csRptSectionType.HEADER:
                    let headers: cReportSections = this.report.getHeaders();
                    rptSection = headers.add();
                    rptSection.setName("H_" + rptSection.getIndex().toString());
                    aspect = headers.item(headers.count() - 2).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight());

                    rptSection.setKeyPaint(this.paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.HEADER,
                                                        rptSection.getName(),
                                                        false));

                    aspect = rptSection.getAspect();
                    this.moveSection(this.paint.getPaintObject(rptSection.getKeyPaint()),
                                0,
                                aspect.getTop(),
                                aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                aspect.getTop() + rptSection.getAspect().getHeight(),
                                rptSection,
                                true);
                    break;

                case csRptSectionType.DETAIL:
                    break;

                case csRptSectionType.GROUP_HEADER:

                    let groupsHeaders: cIReportGroupSections = this.report.getGroupsHeaders();
                    rptSection = groupsHeaders.item(groupsHeaders.count() - 1);
                    rptSection.setName("G_" + rptSection.getIndex().toString());

                    // the first group is next to the last header
                    //
                    if(groupsHeaders.count() === 1) {
                        topSec = this.report.getHeaders().item(this.report.getHeaders().count() - 1);
                    }
                    else {
                        topSec = groupsHeaders.item(groupsHeaders.count() - 2);
                    }

                    aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(0);
                    rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight());

                    rptSection.setKeyPaint(this.paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.GROUP_HEADER,
                                                        rptSection.getName(),
                                                        false));

                    aspect = rptSection.getAspect();
                    this.moveSection(this.paint.getPaintObject(rptSection.getKeyPaint()),
                                0,
                                aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                aspect.getTop(),
                                aspect.getTop() + cGlobals.C_HEIGHT_NEW_SECTION,
                                rptSection,
                                true);
                    break;

                case csRptSectionType.GROUP_FOOTER:

                    let groupsFooters: cIReportGroupSections = this.report.getGroupsFooters();
                    rptSection = groupsFooters.item(0);
                    rptSection.setName("G_" + rptSection.getIndex().toString());

                    // all group footers are added to the top so at the
                    // beginning they are next to the detail section
                    //

                    topSec = this.report.getDetails().item(this.report.getDetails().count() - 1);

                    aspect = topSec.getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(aspect.getTop() + aspect.getHeight());

                    rptSection.setKeyPaint(this.paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.GROUP_FOOTER,
                                                        rptSection.getName(),
                                                        false));

                    paintObj = this.paint.getPaintObject(rptSection.getKeyPaint());
                    this.moveGroupFooter(rptSection.getKey(), minBottom, maxBottom);

                    this.offY = 0;

                    aspect = rptSection.getAspect();
                    y = aspect.getHeight() + aspect.getTop() - cGlobals.C_HEIGHT_BAR_SECTION;

                    this.moveSection(paintObj, 0, y, minBottom.get(), maxBottom.get(), rptSection, true);
                    break;

                case csRptSectionType.FOOTER:
                    let footers: cReportSections = this.report.getFooters();

                    // all footers are added to the beginning of the collection
                    //
                    rptSection = footers.add(null, "" , 0);
                    rptSection.setName("F_" + rptSection.getIndex().toString());

                    aspect = footers.item(1).getAspect();
                    rptSection.getAspect().setWidth(aspect.getWidth());
                    rptSection.getAspect().setHeight(cGlobals.C_HEIGHT_NEW_SECTION);
                    rptSection.getAspect().setTop(aspect.getTop());

                    rptSection.setKeyPaint(this.paintSection(rptSection.getAspect(),
                                                        rptSection.getKey(),
                                                        csRptSectionType.FOOTER,
                                                        rptSection.getName(),
                                                        false));

                    paintObj = this.paint.getPaintObject(rptSection.getKeyPaint());
                    this.moveFooter(rptSection.getKey(), minBottom, maxBottom);

                    this.offY = 0;

                    aspect = rptSection.getAspect();
                    y = aspect.getHeight() + aspect.getTop() - this.offSet - cGlobals.C_HEIGHT_BAR_SECTION;

                    this.moveSection(paintObj, 0, y, minBottom.get(), maxBottom.get(), rptSection, true);
                    break;
            }

            // every section we add has a section line
            // and we need to set its width
            //
            aspect = rptSection.getSectionLines().item(0).getAspect();
            aspect.setWidth(rptSection.getAspect().getWidth());

            this.refreshBody();
            this.refreshRule();
        }

        public bringToFront() {
            this.paint.getPaintObjects().setZorder(this.keyObj, true);
            this.refreshBody();
            this.dataHasChanged = true;
        }

        public sendToBack() {
            this.paint.getPaintObjects().sendToBack(this.keyObj);
            this.refreshBody();
            this.dataHasChanged = true;
        }

        public preview() {
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CS_RPT_LAUNCH_PREVIEW);
            this.launchReport();
        }

        public printReport() {
            this.report.getLaunchInfo().setAction(csRptLaunchAction.CS_RPT_LAUNCH_PRINTER);
            this.launchReport();
        }

        private launchReport() {
            let mouse: CMouseWait = new CMouseWait();
            try {
                this.setZOrder();
                this.showProgressDlg();

                this.report.getLaunchInfo().getPrinter().setPaperInfo(this.report.getPaperInfo());
                this.report.getLaunchInfo().setObjPaint(new cReportPrint());
                this.report.getLaunchInfo().setShowPrintersDialog(true);
                this.report.launch();

            } catch(ex) {
                cError.mngError(ex);
            }
            finally {
                mouse.dispose();
                this.closeProgressDlg();
            }
        }

        public saveDocument(saveAs: boolean) {
            let mouse: CMouseWait = new CMouseWait();
            try {
                let isNew: boolean = this.isNew || this.report.getName() === "";

                if(isNew) {
                    this.report.setName(this.name);
                }

                if(saveAs) {
                    isNew = true;
                }

                this.setZOrder();

                this.validateSectionAspect();

                if(this.report.save(this.fMain.saveFileDialog, isNew)) {
                    this.isNew = false;
                    this.reLoadReport();
                    cMainEditor.setDocActive(this);
                    return true;
                }
                else {
                    return false;
                }

            } catch(ex) {
                cError.mngError(ex);
                return false;
            }
            finally {
                mouse.dispose();
            }
        }

        private setZOrder() {
            let ctrl: cReportControl = null;
            for(let _i = 0; _i < this.report.getControls().count(); _i++) {
                ctrl = this.report.getControls().item(_i);
                ctrl.getLabel().getAspect().setNZOrder(this.paint.getPaintObjects().getZOrderForKey(ctrl.getKeyPaint()));
            }
        }

        public newReport(report: cReport) {
            this.isNew = true;
            if(report !== null) {
                this.report = report;
                this.validateSectionAspect();
                this.reLoadReport();
            }
            else {
                this.report.setName("New report");
                this.paint.createPicture(this.picReport.getGraphics());
                this.refreshRule();
            }
            cMainEditor.setDocActive(this);
        }

        public openDocument(fileName: string = ""): Promise<boolean> {
            let mouse: CMouseWait = new CMouseWait();
            try {

                // to avoid reentrancy
                this.opening = true;
                let p: Promise<boolean>;

                if(fileName === "") {
                    CSReportEditor.cEditor.setInitDir();
                    p = this.report.load();
                    // TODO: remove after debug
                    // if(! this.report.load()) {
                    //    if(this.report.getName() === "") return false;
                    // }
                }
                else {
                    p = this.report.loadSilent(fileName);
                }

                return p.then(P.call(this, (loadSuccess: boolean) => {
                    if(! loadSuccess) {
                        mouse.dispose();
                        return false;
                    }
                    else {
                        this.reLoadReport();
                        cMainEditor.setDocActive(this);
                        this.opening = false;
                        return true;
                    }
                }));
            }
            catch(ex) {
                cError.mngError(ex);
                mouse.dispose();
                return P.resolvedPromise(false);
            }
        }

        public saveChanges() {
            if(this.dataHasChanged) {
                return this.askEdit("Do you want to save changes to " + this.reportFullPath + "?", "CSReportEditor").then((answer) => {
                    if(answer === csAskEditResult.CSASKRSLTYES) {
                        if(! this.saveDocument(false))
                            return false;
                        else {
                            this.dataHasChanged = false;
                            return true;
                        }
                    } else {
                        return false;
                    }
                });
            }
            this.dataHasChanged = false;
            return P.resolvedPromise(true);
        }

        private askEdit(msg: string, title: string) {
            return cWindow.askYesNoCancel(msg, title, MessageBoxDefaultButton.Button3);
        }

        public showHelpDbField() {
            return this.pShowHelpDbField(this.fProperties);
        }

        public showHelpDbFieldForGroup() {
            return this.pShowHelpDbField(this.fGroup);
        }

        private pShowHelpDbField(f: cIDatabaseFieldSelector) {
            const sField = f.getTxDbField().getText();
            const nFieldType = f.getFieldType();
            const nIndex = f.getIndex();

            if(cGlobals.showDbFields(sField, nFieldType, nIndex, this)) {
                f.getTxDbField().setText(sField);
                f.setFieldType(nFieldType);
                f.setIndex(nIndex);

                if(f instanceof FProperties) {
                    f.getTxText().setText(sField);
                }
                return true;
            }
            else {
                return false;
            }
        }

        public showCurrentGroupProperties() {
            let group: cReportGroup = null;
            let isGroup = new RefWrapper(false);

            let sec = this.getSection(isGroup);

            if(sec === null) return;

            if(! isGroup.get()) return;

            for(let _i = 0; _i < this.report.getGroups().count(); _i++) {
                group = this.report.getGroups().item(_i);
                if(group.getHeader().getKey() === sec.getKey()) { break; }
                if(group.getFooter().getKey() === sec.getKey()) { break; }
            }

            this.showGroupProperties(group);

            this.refreshAll();
        }

        private showGroupProperties(group: cReportGroup) {

            try {

                let isNew: boolean = false;

                this.showingProperties = true;

                if(this.fGroup === null) { this.fGroup = new FGroup(); }

                this.fGroup.setHandler(this);

                if(group === null) { isNew = true; }

                if(isNew) {
                    this.fGroup.getTxName().setText("Group" + this.report.getGroups().count() + 1);
                }
                else {
                    this.fGroup.getTxName().setText(group.getName());
                    this.fGroup.getTxDbField().setText(group.getFieldName());

                    if(group.getOderType() === RptGrpOrderType.CS_RPT_GRP_ASC) {
                      this.fGroup.getOpAsc().setChecked(true);
                    }
                    else {
                      this.fGroup.getOpDesc().setChecked(true);
                    }

                    this.fGroup.getChkPrintInNewPage().setChecked(group.getPrintInNewPage());
                    this.fGroup.getChkReprintGroup().setChecked(group.getRePrintInNewPage());
                    this.fGroup.getChkGrandTotal().setChecked(group.getGrandTotalGroup());

                    switch (group.getComparisonType()) {
                      case  RptGrpComparisonType.CS_RPT_GRP_DATE:
                        this.fGroup.getOpDate().setChecked(true);
                        break;

                      case  RptGrpComparisonType.CS_RPT_GRP_NUMBER:
                        this.fGroup.getOpNumber().setChecked(true);
                        break;

                      case  RptGrpComparisonType.CS_RPT_GRP_TEXT:
                        this.fGroup.getOpText().setChecked(true);
                        break;
                    }
                }

                this.fGroup.getLbGroup().setText("Group: " + this.fGroup.getTxName().getText());

                this.fGroup.showDialog();

                if(this.fGroup.getOk()) {

                    if(isNew) {
                        group = this.report.getGroups().add(null, "");
                    }

                    group.setName(this.fGroup.getTxName().getText());
                    group.setFieldName(this.fGroup.getTxDbField().getText());

                    group.setIndex(this.report.getGroups().count());
                    group.setOderType(this.fGroup.getOpAsc().getChecked() ? RptGrpOrderType.CS_RPT_GRP_ASC : RptGrpOrderType.CS_RPT_GRP_DESC);

                    group.setPrintInNewPage(this.fGroup.getChkPrintInNewPage().getChecked());
                    group.setRePrintInNewPage(this.fGroup.getChkReprintGroup().getChecked());
                    group.setGrandTotalGroup(this.fGroup.getChkGrandTotal().getChecked());

                    if(this.fGroup.getOpDate().getChecked()) {
                        group.setComparisonType(RptGrpComparisonType.CS_RPT_GRP_DATE);
                    }
                    else if(this.fGroup.getOpNumber().getChecked()) {
                        group.setComparisonType(RptGrpComparisonType.CS_RPT_GRP_NUMBER);
                    }
                    else if(this.fGroup.getOpText().getChecked()) {
                        group.setComparisonType(RptGrpComparisonType.CS_RPT_GRP_TEXT);
                    }

                    if(isNew) {
                        this.addSection(csRptSectionType.GROUP_HEADER);
                        this.addSection(csRptSectionType.GROUP_FOOTER);
                    }

                    this.dataHasChanged = true;
                }

            } catch(ex) {
                cError.mngError(ex);
            }
            finally {
                this.showingProperties = false;
                if(this.fGroup !== null) {
                    this.fGroup.close();
                    this.fGroup = null;
                }
            }
        }

        public moveGroup() {
            let group: cReportGroup = null;
            let isGroup = new RefWrapper(false);

            const sec = this.getSection(isGroup);

            if(sec === null) return;

            if(! isGroup.get()) return;

            for(let _i = 0; _i < this.report.getGroups().count(); _i++) {
                group = this.report.getGroups().item(_i);
                if(group.getHeader().getKey() === sec.getKey()) { break; }
                if(group.getFooter().getKey() === sec.getKey()) { break; }
            }

            cGlobals.moveGroup(group, this);

            this.vSelectedKeys = [];
            this.refreshReport();
        }

        public showSectionProperties() {
            let isGroup = new RefWrapper(false);

            let sec = this.getSection(isGroup);

            if(sec === null) return;

            this.pShowSecProperties(sec);

            this.refreshAll();
        }

        public showSelectedSectionProperties() {
            let secLn = new RefWrapper<cReportSectionLine>(null);
            let isGroup = new RefWrapper(false);
            let isSecLn = new RefWrapper(false);

            let sec = this.getSection(isGroup, isSecLn, secLn, true);

            if(sec === null) return;
            if(secLn.get() === null) return;
            if(! isSecLn.get()) return;

            try {

                const propertyDlg = cMainEditor.getPropertyDlg();

                propertyDlg.setHandler(this);

                propertyDlg.getChkSectionFormulaHide().setChecked(sec.getHasFormulaHide());
                propertyDlg.setSectionFormulaHide(sec.getFormulaHide().getText());
                propertyDlg.getChkSectionLineFormulaHide().setChecked(secLn.get().getHasFormulaHide());
                propertyDlg.setSectionLineFormulaHide(secLn.get().getFormulaHide().getText());

                if(sec instanceof cReportSectionLine) {
                    propertyDlg.getTxSectionName().setEnabled(false);
                }

                const secLnName = sec.getName() + " - line " + secLn.get().getIndex().toString()

                propertyDlg.getLbControl().setText(sec.getName());
                propertyDlg.getTxSectionName().setText(sec.getName());
                propertyDlg.getLbSectionLineName().setText("Section: " + secLnName);

                propertyDlg.showSectionPropertyTabs();

            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public showSecLnProperties() {
            let secLn = new RefWrapper<cReportSectionLine>(null);
            let isSecLn = new RefWrapper(false);

            let sec = this.getSection2(isSecLn, secLn, true);

            if(sec === null) return;
            if(secLn.get() === null) return;
            if(! isSecLn.get()) return;

            this.pShowSecProperties(secLn.get(), sec.getName() + " - line " + secLn.get().getIndex().toString());

            this.refreshAll();
        }

        private pShowSecProperties(sec: cIReportSection, secLnName: string = "") {
            try {

                this.showingProperties = true;

                if(this.fSecProperties === null) {
                    this.fSecProperties = new FSecProperties();
                }

                this.fSecProperties.setHandler(this);

                this.fSecProperties.getChkFormulaHide().setChecked(sec.getHasFormulaHide());
                this.fSecProperties.setFormulaHide(sec.getFormulaHide().getText());

                if(sec instanceof cReportSectionLine) {
                    this.fSecProperties.getTxName().setEnabled(false);
                }

                this.fSecProperties.getTxName().setText(sec instanceof cReportSectionLine ? secLnName : sec.getName());

                this.fSecProperties.getLbSectionName().setText("Section: " + (sec instanceof cReportSectionLine ? secLnName : sec.getName()));

                this.fSecProperties.showDialog();

                if(this.fSecProperties.getOk()) {
                    if(this.fSecProperties.getHasFormulaHideChanged()) { sec.setHasFormulaHide(this.fSecProperties.getChkFormulaHide().getChecked()); }
                    if(this.fSecProperties.getFormulaHideChanged()) { sec.getFormulaHide().setText(this.fSecProperties.getFormulaHide()); }
                    if(sec instanceof cReportSection) { sec.setName(this.fSecProperties.getTxName().getText()); }
                }

            } catch(ex) {
                cError.mngError(ex);
            }
            finally {
                this.fSecProperties.close();
                this.showingProperties = false;
                this.fSecProperties = null;
            }
        }

        // returnSecLn is flag to state that the caller wants to get
        // the section line associated with the separator of the section
        // remember that the last section line doesn't have a separator
        // but share it with the section.
        //
        private getSection2(isSecLn: RefWrapper<boolean> = new RefWrapper(false),
                            secLn: RefWrapper<cReportSectionLine> = new RefWrapper(null),
                            returnSecLn: boolean = false,
                            isGroupHeader: RefWrapper<boolean> = new RefWrapper(false),
                            isGroupFooter: RefWrapper<boolean> = new RefWrapper(false)) {
            const isGroup = new RefWrapper(false);
            return this.getSection(isGroup, isSecLn, secLn, returnSecLn, isGroupHeader, isGroupFooter);
        }

        private getSection( isGroup: RefWrapper<boolean>,
                            isSecLn: RefWrapper<boolean> = new RefWrapper(false),
                            secLn: RefWrapper<cReportSectionLine> = new RefWrapper(null),
                            returnSecLn: boolean = false,
                            isGroupHeader: RefWrapper<boolean> = new RefWrapper(false),
                            isGroupFooter: RefWrapper<boolean> = new RefWrapper(false)) {

            let sec: cReportSection = null;

            isGroup.set(false);
            isSecLn.set(false);
            secLn.set(null);
            isGroupFooter.set(false);
            isGroupHeader.set(false);

            if(this.keyFocus === "") { return null; }

            // get the section and show his properties
            //
            if(!this.paint.paintObjIsSection(this.keyFocus)) { return null; }

            let paintObj: cReportPaintObject = this.paint.getPaintSections().item(this.keyFocus);

            // nothing to do
            //
            if(paintObj === null) { return null; }

            sec = this.report.getHeaders().item(paintObj.getTag());
            if(sec !== null) {

                // it's a header
            }
            else {
                sec = this.report.getFooters().item(paintObj.getTag());
                if(sec !== null) {

                    // it's a footer
                }
                else {

                    // check if it is a group
                    //
                    sec = this.report.getGroupsHeaders().item(paintObj.getTag());
                    if(sec !== null) {

                        // it's a group
                        //
                        isGroup.set(true);
                        isGroupHeader.set(true);

                    }
                    else {
                        sec = this.report.getGroupsFooters().item(paintObj.getTag());
                        if(sec !== null) {

                            // it's a group
                            //
                            isGroup.set(true);
                            isGroupFooter.set(true);

                        }
                        else {
                            // check if it is a detail
                            //
                            sec = this.report.getDetails().item(paintObj.getTag());
                            if(sec !== null) {

                                // it's a detail
                            }
                            else {

                                // it's a line

                                isSecLn.set(true);

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
                                secLn.set(sec.getSectionLines().item(paintObj.getTag()));
                            }
                        }
                    }
                }
            }

            // if the caller wants a section line and the separator
            // is owned by a section (isSecLn === false) we return
            // the last section line of the section asociated to the separator
            //
            if(returnSecLn && !isSecLn.get()) {
                secLn.set(sec.getSectionLines().item(sec.getSectionLines().count()-1));
                isSecLn.set(true);
            }

            return sec;
        }

        public showProperties(key: string) {
            if("SL".indexOf(key.substring(0, 1)) !== -1) {
                let bIsSecLn = new RefWrapper(false);
                this.selectSection(key.substring(1), bIsSecLn);

                if(bIsSecLn.get()) {
                    this.showSecLnProperties();
                }
                else {
                    this.showProperties2();
                }
            }
            else {
                this.selectCtrl(key);
                this.showProperties2();
            }
        }

        public showProperties2() {
            if(this.keyFocus === "") return;

            const mouse: CMouseWait = new CMouseWait();

            if(this.paint.paintObjIsSection(this.keyFocus)) {
                this.showSectionProperties();
            }
            else {
                this.keyObj = this.keyFocus;
                this.showCtrlProperties();
            }

            this.refreshAll();

            mouse.dispose();
        }

        public getSelectedKey() {
            if(this.keyObj) {
                let poSelected = this.paint.getPaintObject(this.keyObj);
                if(poSelected !== null) {
                    return poSelected.getIsSection() ? "S" + poSelected.getTag() : poSelected.getTag();
                }
            }
            return null;
        }

        public getSelectedKeyIsSection() {
            return this.keyObj?.substring(0,1) === 'S';
        }

        public showSelectedCtrlProperties() {
            try {

                let rptCtrl: cReportControl = null;
                let aspect: cReportAspect = null;
                let font: cReportFont = null;

                const propertyDlg = cMainEditor.getPropertyDlg();

                propertyDlg.setHandler(this);

                let paintObject = this.paint.getPaintObject(this.keyObj);
                if(paintObject === null) return;

                propertyDlg.getTxText().setText(paintObject.getText());
                rptCtrl = this.report.getControls().item(paintObject.getTag());

                if(rptCtrl === null) return;

                propertyDlg.showCtrlPropertyTabs();

                propertyDlg.enable();

                if(rptCtrl.getControlType() !== csRptControlType.CS_RPT_CT_IMAGE) {
                    propertyDlg.hideTabImage();
                }
                else {
                    propertyDlg.getPicImage().setImage(rptCtrl.getImage().getImage());
                    propertyDlg.showTabImage();
                }

                if(rptCtrl.getControlType() !== csRptControlType.CS_RPT_CT_CHART) {
                    propertyDlg.hideTabChart();
                }
                else {
                    Utils.listSetListIndexForId(propertyDlg.getCbType(), rptCtrl.getChart().getChartType());
                    Utils.listSetListIndexForId(propertyDlg.getCbFormatType(), rptCtrl.getChart().getFormat());
                    Utils.listSetListIndexForId(propertyDlg.getCbChartSize(), rptCtrl.getChart().getDiameter());
                    Utils.listSetListIndexForId(propertyDlg.getCbChartThickness(), rptCtrl.getChart().getThickness());
                    Utils.listSetListIndexForId(propertyDlg.getCbLinesType(), rptCtrl.getChart().getGridLines());

                    propertyDlg.getTxChartTop().setText(rptCtrl.getChart().getTop().toString());
                    propertyDlg.getTxDbFieldGroupValue().setText(rptCtrl.getChart().getGroupFieldName());
                    propertyDlg.setChartGroupIndex(rptCtrl.getChart().getGroupFieldIndex());
                    propertyDlg.getTxChartGroupValue().setText(rptCtrl.getChart().getGroupValue());
                    propertyDlg.getChkShowOutlines().setChecked(rptCtrl.getChart().getOutlineBars());
                    propertyDlg.getChkShowBarValues().setChecked(rptCtrl.getChart().getShowValues());
                    propertyDlg.getChkSort().setChecked(rptCtrl.getChart().getSort());
                    propertyDlg.getTxText().setText(rptCtrl.getChart().getChartTitle());

                    if(rptCtrl.getChart().getSeries().count() > 0) {
                        propertyDlg.getTxDbFieldLbl1().setText(rptCtrl.getChart().getSeries().item(0).getLabelFieldName());
                        propertyDlg.getTxDbFieldVal1().setText(rptCtrl.getChart().getSeries().item(0).getValueFieldName());

                        propertyDlg.setChartIndex(0, rptCtrl.getChart().getSeries().item(0).getLabelIndex());
                        propertyDlg.setChartIndex(1, rptCtrl.getChart().getSeries().item(0).getValueIndex());

                        Utils.listSetListIndexForId(propertyDlg.getCbColorSerie1(), rptCtrl.getChart().getSeries().item(0).getColor());

                        if(rptCtrl.getChart().getSeries().count() > 1) {
                            propertyDlg.getTxDbFieldLbl1().setText(rptCtrl.getChart().getSeries().item(1).getLabelFieldName());
                            propertyDlg.getTxDbFieldVal2().setText(rptCtrl.getChart().getSeries().item(1).getValueFieldName());

                            propertyDlg.setChartIndex(2, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                            propertyDlg.setChartIndex(3, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                            Utils.listSetListIndexForId(propertyDlg.getCbColorSerie2(), rptCtrl.getChart().getSeries().item(1).getColor());
                        }
                    }
                    propertyDlg.showTabChart();
                }

                if(rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_FIELD
                    || rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_DB_IMAGE) {
                    propertyDlg.getTxText().setEnabled(false);
                    let field: cReportField = rptCtrl.getField();
                    propertyDlg.getTxText().setText(field.getName());
                    propertyDlg.getTxDbField().setText(field.getName());
                    propertyDlg.setFieldType(field.getFieldType());
                    propertyDlg.setIndex(field.getIndex());
                    propertyDlg.showTabField();
                }
                else {
                    propertyDlg.hideTabField();
                    propertyDlg.getTxText().setEnabled(true);
                }

                propertyDlg.getTxName().setText(rptCtrl.getName());
                propertyDlg.getLbControl().setText(rptCtrl.getName());
                propertyDlg.getChkFormulaHide().setChecked(rptCtrl.getHasFormulaHide());
                propertyDlg.getChkFormulaValue().setChecked(rptCtrl.getHasFormulaValue());

                propertyDlg.getTxExportColIdx().setText(rptCtrl.getExportColIdx().toString());
                propertyDlg.getChkIsFreeCtrl().setChecked(rptCtrl.getIsFreeCtrl());

                propertyDlg.getTxTag().setText(rptCtrl.getTag());
                propertyDlg.setFormulaHide(rptCtrl.getFormulaHide().getText());
                propertyDlg.setFormulaValue(rptCtrl.getFormulaValue().getText());
                propertyDlg.getTxIdxGroup().setText(rptCtrl.getFormulaValue().getIdxGroup().toString());
                propertyDlg.getOpBeforePrint().setChecked(rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CS_RPT_EVAL_PRE);
                propertyDlg.getOpAfterPrint().setChecked(rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CS_RPT_EVAL_POST);

                aspect = rptCtrl.getLabel().getAspect();
                propertyDlg.getChkCanGrow().setChecked(aspect.getCanGrow());
                propertyDlg.getTxFormat().setText(aspect.getFormat());
                propertyDlg.getTxSymbol().setText(aspect.getSymbol());
                propertyDlg.setIsAccounting(aspect.getIsAccounting());
                propertyDlg.getChkWordWrap().setChecked(aspect.getWordWrap());

                Utils.listSetListIndexForId(propertyDlg.getCbAlign(), aspect.getAlign());

                propertyDlg.getTxBorderColor().setText(aspect.getBorderColor().toString());
                propertyDlg.getShBorderColor().setBackColor(aspect.getBorderColor());
                propertyDlg.getTxBorder3D().setText(aspect.getBorderColor3d().toString());
                propertyDlg.getShBorder3D().setBackColor(aspect.getBorderColor3d());
                propertyDlg.getTxBorderShadow().setText(aspect.getBorderColor3dShadow().toString());
                propertyDlg.getShBorderShadow().setBackColor(aspect.getBorderColor3dShadow());
                propertyDlg.getChkBorderRounded().setChecked(aspect.getBorderRounded());
                propertyDlg.getTxBorderWidth().setText(aspect.getBorderWidth().toString());

                Utils.listSetListIndexForId(propertyDlg.getCbBorderType(), aspect.getBorderType());

                font = aspect.getFont();
                propertyDlg.getCbFont().setText(font.getName());
                propertyDlg.getTxForeColor().setText(font.getForeColor().toString());
                propertyDlg.getShForeColor().setBackColor(font.getForeColor());
                propertyDlg.getTxFontSize().setText(font.getSize().toString());
                propertyDlg.getChkFontBold().setChecked(font.getBold());
                propertyDlg.getChkFontItalic().setChecked(font.getItalic());
                propertyDlg.getChkFontUnderline().setChecked(font.getUnderline());
                propertyDlg.getChkFontStrike().setChecked(font.getStrike());

                aspect = paintObject.getAspect();
                propertyDlg.getTxLeft().setText(aspect.getLeft().toString());
                propertyDlg.getTxTop().setText(aspect.getTop().toString());
                propertyDlg.getTxWidth().setText(aspect.getWidth().toString());
                propertyDlg.getTxHeight().setText(aspect.getHeight().toString());
                propertyDlg.getTxBackColor().setText(aspect.getBackColor().toString());
                propertyDlg.getShBackColor().setBackColor(aspect.getBackColor());
                propertyDlg.getChkTransparent().setChecked(aspect.getTransparent());

                propertyDlg.resetChangedFlags();

            } catch(ex) {
                cError.mngError(ex);
            }
        }

        private showCtrlProperties() {
            try {

                let rptCtrl: cReportControl = null;
                let aspect: cReportAspect = null;
                let font: cReportFont = null;
                let bMultiSelect: boolean = false;

                this.showingProperties = true;

                if(this.fProperties === null) {
                    this.fProperties = new FProperties();
                }

                this.fProperties.setHandler(this);

                let paintObject = this.paint.getPaintObject(this.keyObj);
                if(paintObject === null) return;

                this.fProperties.getTxText().setText(paintObject.getText());
                rptCtrl = this.report.getControls().item(paintObject.getTag());

                if(rptCtrl.getControlType() !== csRptControlType.CS_RPT_CT_IMAGE) {
                    this.fProperties.hideTabImage();
                }
                else {
                    this.fProperties.getPicImage().Image = rptCtrl.getImage().getImage();
                }

                if(rptCtrl.getControlType() !== csRptControlType.CS_RPT_CT_CHART) {
                    this.fProperties.hideTabChart();
                }
                else {

                    Utils.listSetListIndexForId(this.fProperties.getCbType(), rptCtrl.getChart().getChartType());
                    Utils.listSetListIndexForId(this.fProperties.getCbFormatType(), rptCtrl.getChart().getFormat());
                    Utils.listSetListIndexForId(this.fProperties.getCbChartSize(), rptCtrl.getChart().getDiameter());
                    Utils.listSetListIndexForId(this.fProperties.getCbChartThickness(), rptCtrl.getChart().getThickness());
                    Utils.listSetListIndexForId(this.fProperties.getCbLinesType(), rptCtrl.getChart().getGridLines());

                    this.fProperties.getTxChartTop().setText(rptCtrl.getChart().getTop().toString());
                    this.fProperties.getTxDbFieldGroupValue().setText(rptCtrl.getChart().getGroupFieldName());
                    this.fProperties.setChartGroupIndex(rptCtrl.getChart().getGroupFieldIndex());
                    this.fProperties.getTxChartGroupValue().setText(rptCtrl.getChart().getGroupValue());
                    this.fProperties.getChkShowOutlines().setChecked(rptCtrl.getChart().getOutlineBars());
                    this.fProperties.getChkShowBarValues().setChecked(rptCtrl.getChart().getShowValues());
                    this.fProperties.getChkSort().setChecked(rptCtrl.getChart().getSort());
                    this.fProperties.getTxText().setText(rptCtrl.getChart().getChartTitle());

                    if(rptCtrl.getChart().getSeries().count() > 0) {
                        this.fProperties.getTxDbFieldLbl1().setText(rptCtrl.getChart().getSeries().item(0).getLabelFieldName());
                        this.fProperties.getTxDbFieldVal1().setText(rptCtrl.getChart().getSeries().item(0).getValueFieldName());

                        this.fProperties.setChartIndex(0, rptCtrl.getChart().getSeries().item(0).getLabelIndex());
                        this.fProperties.setChartIndex(1, rptCtrl.getChart().getSeries().item(0).getValueIndex());

                        Utils.listSetListIndexForId(this.fProperties.getCbColorSerie1(), rptCtrl.getChart().getSeries().item(0).getColor());

                        if(rptCtrl.getChart().getSeries().count() > 1) {
                            this.fProperties.getTxDbFieldLbl1().setText(rptCtrl.getChart().getSeries().item(1).getLabelFieldName());
                            this.fProperties.getTxDbFieldVal2().setText(rptCtrl.getChart().getSeries().item(1).getValueFieldName());

                            this.fProperties.setChartIndex(2, rptCtrl.getChart().getSeries().item(1).getLabelIndex());
                            this.fProperties.setChartIndex(3, rptCtrl.getChart().getSeries().item(1).getValueIndex());

                            Utils.listSetListIndexForId(this.fProperties.getCbColorSerie2(), rptCtrl.getChart().getSeries().item(1).getColor());
                        }
                    }
                }

                if(rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_FIELD
                    || rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_DB_IMAGE) {
                    this.fProperties.getTxText().setEnabled(false);
                    let field: cReportField = rptCtrl.getField();
                    this.fProperties.getTxText().setText(field.getName());
                    this.fProperties.getTxDbField().setText(field.getName());
                    this.fProperties.setFieldType(field.getFieldType());
                    this.fProperties.setIndex(field.getIndex());
                }
                else {
                    this.fProperties.hideTabField();
                    this.fProperties.getTxText().setEnabled(true);
                }

                this.fProperties.getTxName().setText(rptCtrl.getName());
                this.fProperties.getLbControl().setText(rptCtrl.getName());
                this.fProperties.getChkFormulaHide().setChecked(rptCtrl.getHasFormulaHide());
                this.fProperties.getChkFormulaValue().setChecked(rptCtrl.getHasFormulaValue());

                this.fProperties.getTxExportColIdx().setText(rptCtrl.getExportColIdx().toString());
                this.fProperties.getChkIsFreeCtrl().setChecked(rptCtrl.getIsFreeCtrl());

                this.fProperties.getTxTag().setText(rptCtrl.getTag());
                this.fProperties.setFormulaHide(rptCtrl.getFormulaHide().getText());
                this.fProperties.setFormulaValue(rptCtrl.getFormulaValue().getText());
                this.fProperties.getTxIdxGroup().setText(rptCtrl.getFormulaValue().getIdxGroup().toString());
                this.fProperties.getOpBeforePrint().setChecked(rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CS_RPT_EVAL_PRE);
                this.fProperties.getOpAfterPrint().setChecked(rptCtrl.getFormulaValue().getWhenEval() === csRptWhenEval.CS_RPT_EVAL_POST);

                aspect = rptCtrl.getLabel().getAspect();
                this.fProperties.getChkCanGrow().setChecked(aspect.getCanGrow());
                this.fProperties.getTxFormat().setText(aspect.getFormat());
                this.fProperties.getTxSymbol().setText(aspect.getSymbol());
                this.fProperties.setIsAccounting(aspect.getIsAccounting());
                this.fProperties.getChkWordWrap().setChecked(aspect.getWordWrap());

                Utils.listSetListIndexForId(this.fProperties.getCbAlign(), aspect.getAlign());

                this.fProperties.getTxBorderColor().setText(aspect.getBorderColor().toString());
                this.fProperties.getTxBorder3D().setText(aspect.getBorderColor3d().toString());
                this.fProperties.getTxBorderShadow().setText(aspect.getBorderColor3dShadow().toString());
                this.fProperties.getChkBorderRounded().setChecked(aspect.getBorderRounded());
                this.fProperties.getTxBorderWidth().setText(aspect.getBorderWidth().toString());

                Utils.listSetListIndexForId(this.fProperties.getCbBorderType(), aspect.getBorderType());

                font = aspect.getFont();
                this.fProperties.getTxFont().setText(font.getName());
                this.fProperties.getTxForeColor().setText(font.getForeColor().toString());
                this.fProperties.getShForeColor().setBackColor(font.getForeColor());
                this.fProperties.getTxFontSize().setText(font.getSize().toString());
                this.fProperties.getChkFontBold().setChecked(font.getBold());
                this.fProperties.getChkFontItalic().setChecked(font.getItalic());
                this.fProperties.getChkFontUnderline().setChecked(font.getUnderline());
                this.fProperties.getChkFontStrike().setChecked(font.getStrike());

                aspect = paintObject.getAspect();
                this.fProperties.getTxLeft().setText(aspect.getLeft().toString());
                this.fProperties.getTxTop().setText(aspect.getTop().toString());
                this.fProperties.getTxWidth().setText(aspect.getWidth().toString());
                this.fProperties.getTxHeight().setText(aspect.getHeight().toString());
                this.fProperties.getTxBackColor().setText(aspect.getBackColor().toString());
                this.fProperties.getShBackColor().setBackColor(aspect.getBackColor());
                this.fProperties.getChkTransparent().setChecked(aspect.getTransparent());

                bMultiSelect = this.vSelectedKeys.length > 1;

                this.fProperties.resetChangedFlags();

                this.fProperties.showDialog();

                if(!this.fProperties.getOk()) return;

                for(let i = 0; i < this.vSelectedKeys.length; i++) {

                    paintObject = this.paint.getPaintObject(this.vSelectedKeys[i]);
                    rptCtrl = this.report.getControls().item(paintObject.getTag());

                    if(!bMultiSelect) {
                        if(rptCtrl.getName() !== this.fProperties.getTxName().getText()) {
                            if(rptCtrl.getName() !== "") {
                                if(cWindow.ask("You have changed the name of this control.;;Do you want to update all references to this control in all formulas of this report?", MessageBoxDefaultButton.Button2)) {
                                    this.updateFormulas(rptCtrl.getName(), this.fProperties.getTxName().getText());
                                }
                            }
                        }
                        rptCtrl.setName(this.fProperties.getTxName().getText());
                    }

                    if(this.fProperties.getTextChanged()) { rptCtrl.getLabel().setText(this.fProperties.getTxText().getText()); }
                    if(this.fProperties.getTagChanged()) { rptCtrl.setTag(this.fProperties.getTxTag().getText()); }
                    if(this.fProperties.getSetFormulaHideChanged()) { rptCtrl.setHasFormulaHide(this.fProperties.getChkFormulaHide().getChecked()); }
                    if(this.fProperties.getSetFormulaValueChanged()) { rptCtrl.setHasFormulaValue(this.fProperties.getChkFormulaValue().getChecked()); }
                    if(this.fProperties.getFormulaHideChanged()) { rptCtrl.getFormulaHide().setText(this.fProperties.getFormulaHide()); }
                    if(this.fProperties.getFormulaValueChanged()) { rptCtrl.getFormulaValue().setText(this.fProperties.getFormulaValue()); }
                    if(this.fProperties.getIdxGroupChanged()) { rptCtrl.getFormulaValue().setIdxGroup(Utils.valInt(this.fProperties.getTxIdxGroup().getText())); }
                    if(this.fProperties.getWhenEvalChanged()) { rptCtrl.getFormulaValue().setWhenEval(this.fProperties.getOpAfterPrint().Checked ? csRptWhenEval.CS_RPT_EVAL_POST : csRptWhenEval.CS_RPT_EVAL_PRE); }

                    if(this.fProperties.getExportColIdxChanged()) { rptCtrl.setExportColIdx(Utils.valInt(this.fProperties.getTxExportColIdx().getText())); }
                    if(this.fProperties.getIsFreeCtrlChanged()) { rptCtrl.setIsFreeCtrl(this.fProperties.getChkIsFreeCtrl().getChecked()); }

                    if(rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_FIELD || rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_DB_IMAGE) {

                        let field: cReportField = rptCtrl.getField();
                        if(this.fProperties.getDbFieldChanged()) {
                            field.setFieldType(this.fProperties.getFieldType());
                            field.setIndex(this.fProperties.getIndex());
                            field.setName(this.fProperties.getTxDbField().getText());
                        }
                    }

                    if(this.fProperties.getPictureChanged()) {
                        rptCtrl.getImage().setImage(this.fProperties.getPicImage().Image);
                    }

                    if(rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_CHART) {

                        if(rptCtrl.getChart().getSeries().count() < 1) {
                            rptCtrl.getChart().getSeries().add(new cReportChartSequence());
                        }

                        if(this.fProperties.getChartTypeChanged()) {
                            rptCtrl.getChart().setChartType(Utils.listID(this.fProperties.getCbType()));
                        }
                        if(this.fProperties.getChartFormatTypeChanged()) {
                            rptCtrl.getChart().setFormat(Utils.listID(this.fProperties.getCbFormatType()));
                        }
                        if(this.fProperties.getChartSizeChanged()) {
                            rptCtrl.getChart().setDiameter(Utils.listID(this.fProperties.getCbChartSize()));
                        }
                        if(this.fProperties.getChartThicknessChanged()) {
                            rptCtrl.getChart().setThickness(Utils.listID(this.fProperties.getCbChartThickness()));
                        }
                        if(this.fProperties.getChartLinesTypeChanged()) {
                            rptCtrl.getChart().setGridLines(Utils.listID(this.fProperties.getCbLinesType()));
                        }

                        if(this.fProperties.getChartShowLinesChanged()) {
                            rptCtrl.getChart().setOutlineBars(this.fProperties.getChkShowOutlines().getChecked());
                        }
                        if(this.fProperties.getChartShowValuesChanged()) {
                            rptCtrl.getChart().setShowValues(this.fProperties.getChkShowBarValues().getChecked());
                        }

                        if(this.fProperties.getTextChanged()) {
                            rptCtrl.getChart().setChartTitle(this.fProperties.getTxText().getText());
                        }

                        if(this.fProperties.getChartTopChanged()) {
                            rptCtrl.getChart().setTop(Utils.valInt(this.fProperties.getTxChartTop().getText()));
                        }

                        if(this.fProperties.getChartSortChanged()) {
                            rptCtrl.getChart().setSort(this.fProperties.getChkSort().getChecked());
                        }

                        if(this.fProperties.getChartGroupValueChanged()) {
                            rptCtrl.getChart().setGroupValue(this.fProperties.getTxChartGroupValue().getText());
                        }

                        if(this.fProperties.getChartFieldGroupChanged()) {
                            rptCtrl.getChart().setGroupFieldName(this.fProperties.getTxDbFieldGroupValue().getText());
                            rptCtrl.getChart().setGroupFieldIndex(this.fProperties.getChartGroupIndex());
                        }

                        if(this.fProperties.getChartFieldLbl1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setLabelFieldName(this.fProperties.getTxDbFieldLbl1().getText());
                            rptCtrl.getChart().getSeries().item(0).setLabelIndex(this.fProperties.getChartIndex(0));
                        }
                        if(this.fProperties.getChartFieldVal1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setValueFieldName(this.fProperties.getTxDbFieldVal1().getText());
                            rptCtrl.getChart().getSeries().item(0).setValueIndex(this.fProperties.getChartIndex(1));
                        }

                        if(this.fProperties.getChartColorSerie1Changed()) {
                            rptCtrl.getChart().getSeries().item(0).setColor(Utils.listID(this.fProperties.getCbColorSerie1()));
                        }

                        if(this.fProperties.getChartFieldLbl2Changed() || this.fProperties.getChartFieldVal2Changed()) {
                            if(rptCtrl.getChart().getSeries().count() < 2) {
                                rptCtrl.getChart().getSeries().add();
                            }
                        }

                        if(this.fProperties.getTxDbFieldLbl2().Text === "" || this.fProperties.getTxDbFieldVal2().Text === "") {
                            if(rptCtrl.getChart().getSeries().count() > 1) { rptCtrl.getChart().getSeries().remove(1); }
                        }

                        if(rptCtrl.getChart().getSeries().count() > 1) {

                            if(this.fProperties.getChartFieldLbl2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setLabelFieldName(this.fProperties.getTxDbFieldLbl2().getText());
                                rptCtrl.getChart().getSeries().item(1).setLabelIndex(this.fProperties.getChartIndex(2));
                            }
                            if(this.fProperties.getChartFieldVal2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setValueFieldName(this.fProperties.getTxDbFieldVal2().getText());
                                rptCtrl.getChart().getSeries().item(1).setValueIndex(this.fProperties.getChartIndex(3));
                            }

                            if(this.fProperties.getChartColorSerie2Changed()) {
                                rptCtrl.getChart().getSeries().item(1).setColor(Utils.listID(this.fProperties.getCbColorSerie2()));
                            }
                        }
                    }

                    if(this.fProperties.getTextChanged()) { paintObject.setText(this.fProperties.getTxText().getText()); }

                    aspect = rptCtrl.getLabel().getAspect();
                    if(this.fProperties.getLeftChanged()) { aspect.setLeft(Utils.val(this.fProperties.getTxLeft().getText())); }
                    if(this.fProperties.getTopChanged()) { aspect.setTop(Utils.val(this.fProperties.getTxTop().getText())); }
                    if(this.fProperties.getWidthChanged()) { aspect.setWidth(Utils.val(this.fProperties.getTxWidth().getText())); }
                    if(this.fProperties.getHeightChanged()) { aspect.setHeight(Utils.val(this.fProperties.getTxHeight().getText())); }
                    if(this.fProperties.getBackColorChanged()) { aspect.setBackColor(this.fProperties.getTxBackColor().getText()); }
                    if(this.fProperties.getTransparentChanged()) { aspect.setTransparent(this.fProperties.getChkTransparent().getChecked()); }
                    if(this.fProperties.getAlignChanged()) { aspect.setAlign(Utils.listID(this.fProperties.getCbAlign())); }
                    if(this.fProperties.getFormatChanged()) { aspect.setFormat(this.fProperties.getTxFormat().getText()); }
                    if(this.fProperties.getSymbolChanged()) {
                        aspect.setSymbol(this.fProperties.getTxSymbol().getText());
                        aspect.setIsAccounting(this.fProperties.getIsAccounting());
                    }
                    if(this.fProperties.getWordWrapChanged()) { aspect.setWordWrap(this.fProperties.getChkWordWrap().getChecked()); }
                    if(this.fProperties.getCanGrowChanged()) { aspect.setCanGrow(this.fProperties.getChkCanGrow().getChecked()); }

                    if(this.fProperties.getBorderColorChanged()) { aspect.setBorderColor(this.fProperties.getTxBorderColor().getText()); }
                    if(this.fProperties.getBorder3DChanged()) { aspect.setBorderColor3d(this.fProperties.getTxBorder3D().getText()); }
                    if(this.fProperties.getBorder3DShadowChanged()) { aspect.setBorderColor3dShadow(this.fProperties.getTxBorderShadow().getText()); }
                    if(this.fProperties.getBorderRoundedChanged()) { aspect.setBorderRounded(this.fProperties.getChkBorderRounded().getChecked()); }
                    if(this.fProperties.getBorderWidthChanged()) { aspect.setBorderWidth(Utils.valInt(this.fProperties.getTxBorderWidth().getText())); }
                    if(this.fProperties.getBorderTypeChanged()) { aspect.setBorderType(Utils.listID(this.fProperties.getCbBorderType())); }

                    font = aspect.getFont();
                    if(this.fProperties.getFontChanged()) { font.setName(this.fProperties.getTxFont().getText()); }
                    if(this.fProperties.getForeColorChanged()) { font.setForeColor(this.fProperties.getTxForeColor().getText()); }
                    if(this.fProperties.getFontSizeChanged()) { font.setSize(Utils.val(this.fProperties.getTxFontSize().getText())); }
                    if(this.fProperties.getBoldChanged()) { font.setBold(this.fProperties.getChkFontBold().getChecked()); }
                    if(this.fProperties.getItalicChanged()) { font.setItalic(this.fProperties.getChkFontItalic().getChecked()); }
                    if(this.fProperties.getUnderlineChanged()) { font.setUnderline(this.fProperties.getChkFontUnderline().getChecked()); }
                    if(this.fProperties.getStrikeChanged()) { font.setStrike(this.fProperties.getChkFontStrike().getChecked()); }

                    if(this.fProperties.getPictureChanged()) {
                        paintObject.setImage(rptCtrl.getImage().getImage());
                    }

                    //
                    // TODO: check if we can refactor this now we have a better class hierarchy
                    //

                    aspect = paintObject.getAspect();
                    if(this.fProperties.getLeftChanged()) { aspect.setLeft(Utils.val(this.fProperties.getTxLeft().getText())); }
                    if(this.fProperties.getTopChanged()) { aspect.setTop(Utils.val(this.fProperties.getTxTop().getText())); }
                    if(this.fProperties.getWidthChanged()) { aspect.setWidth(Utils.val(this.fProperties.getTxWidth().getText())); }
                    if(this.fProperties.getHeightChanged()) { aspect.setHeight(Utils.val(this.fProperties.getTxHeight().getText())); }
                    if(this.fProperties.getBackColorChanged()) { aspect.setBackColor(this.fProperties.getTxBackColor().getText()); }
                    if(this.fProperties.getTransparentChanged()) { aspect.setTransparent(this.fProperties.getChkTransparent().getChecked()); }
                    if(this.fProperties.getAlignChanged()) { aspect.setAlign(Utils.listID(this.fProperties.getCbAlign())); }
                    if(this.fProperties.getFormatChanged()) { aspect.setFormat(this.fProperties.getTxFormat().getText()); }
                    if(this.fProperties.getSymbolChanged()) { aspect.setSymbol(this.fProperties.getTxSymbol().getText()); }
                    if(this.fProperties.getWordWrapChanged()) { aspect.setWordWrap(this.fProperties.getChkWordWrap().getChecked()); }

                    if(this.fProperties.getBorderTypeChanged()) { aspect.setBorderType(Utils.listID(this.fProperties.getCbBorderType())); }

                    if(aspect.getBorderType() === csReportBorderType.CS_RPT_BS_NONE) {
                        aspect.setBorderColor(Color.Black.toArgb());
                        aspect.setBorderWidth(1);
                        aspect.setBorderRounded(false);
                        aspect.setBorderType(csReportBorderType.CS_RPT_BS_FIXED);
                    }
                    else {
                        if(this.fProperties.getBorderColorChanged()) { aspect.setBorderColor(this.fProperties.getTxBorderColor().getText()); }
                        if(this.fProperties.getBorder3DChanged()) { aspect.setBorderColor3d(this.fProperties.getTxBorder3D().getText()); }
                        if(this.fProperties.getBorder3DShadowChanged()) { aspect.setBorderColor3dShadow(this.fProperties.getTxBorderShadow().getText()); }
                        if(this.fProperties.getBorderRoundedChanged()) { aspect.setBorderRounded(this.fProperties.getChkBorderRounded().getChecked()); }
                        if(this.fProperties.getBorderWidthChanged()) { aspect.setBorderWidth(Utils.valInt(this.fProperties.getTxBorderWidth().getText())); }
                    }

                    font = aspect.getFont();
                    if(this.fProperties.getFontChanged()) { font.setName(this.fProperties.getTxFont().getText()); }
                    if(this.fProperties.getForeColorChanged()) { font.setForeColor(this.fProperties.getTxForeColor().getText()); }
                    if(this.fProperties.getFontSizeChanged()) { font.setSize(Utils.val(this.fProperties.getTxFontSize().getText())); }
                    if(this.fProperties.getBoldChanged()) { font.setBold(this.fProperties.getChkFontBold().getChecked()); }
                    if(this.fProperties.getItalicChanged()) { font.setItalic(this.fProperties.getChkFontItalic().getChecked()); }
                    if(this.fProperties.getUnderlineChanged()) { font.setUnderline(this.fProperties.getChkFontUnderline().getChecked()); }
                    if(this.fProperties.getStrikeChanged()) { font.setStrike(this.fProperties.getChkFontStrike().getChecked()); }
                }

                this.dataHasChanged = true;

            } catch(ex) {
                cError.mngError(ex);
            }
            finally {
                this.fProperties.hide();
                this.showingProperties = false;
                this.fProperties = null;
                this.paint.endMove(this.picReport.getGraphics());
            }
        }

        private beginDragging() {
            this.picReport.focus();
            this.dragging = true;
            this.picReport.setCursor(Cursor.Move); // new Cursor("Resources" + Path.DirectorySeparatorChar + "move32x32.cur");
        }

        private endDragging() {
            this.dragging = false;
            this.controlType = csRptEditCtrlType.none;
            this.picReport.setCursor(Cursor.Default);
        }

        public showToolbox() {

            let f: FToolbox = cMainEditor.getToolbox(this);

            f.clear();

            this.addColumnsToToolbox(this.report.getConnect().getDataSource(), this.report.getConnect().getColumns(), f);

            for(let _i = 0; _i < this.report.getConnectsAux().count(); _i++) {
                let connect: cReportConnect = this.report.getConnectsAux().item(_i);
                this.addColumnsToToolbox(connect.getDataSource(), connect.getColumns(), f);
            }

            for(let _i = 0; _i < this.report.getControls().count(); _i++) {
                let ctrl: cReportControl = this.report.getControls().item(_i);
                if(DatabaseGlobals.isNumberField(ctrl.getField().getFieldType())) {
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
            if(!f.getVisible()) {
                f.show(this.fMain);
            }
        }

        public addColumnsToToolbox(dataSource: string, columns: cColumnsInfo, f: FToolbox) {
            for(let _i = 0; _i < columns.count(); _i++) {
                let col = columns.item(_i);
                f.addField(
                    cGlobals.getDataSourceStr(dataSource) + col.getName(),
                    col.getColumnType(),
                    col.getPosition());
                f.addLabels(col.getName());
            }
        }

        public copy() {
            if(this.vSelectedKeys.length === 0) return;
            try {
                this.vCopyKeys = [...this.vSelectedKeys];
                this.fMain.setReportCopySource(this);
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public paste(bDontMove: boolean) {
            try {
                this.bCopyWithoutMoving = bDontMove;
                if(this.vCopyKeys.length === 0) {
                    if(this.fMain.getReportCopySource() === null) return;
                    this.copyControlsFromOtherReport = true;
                }
                else {
                    this.copyControls = true;
                }
                this.addLabel();
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public editText() {
            try {
                let sText: string = "";
                let paintObjAspect: cReportAspect = null;
                let ctrl: cReportControl = null;

                if(this.keyObj === "") return;

                let paintObject: cReportPaintObject = this.paint.getPaintObject(this.keyObj);
                paintObjAspect = paintObject.getAspect();
                sText = paintObject.getText();
                ctrl = this.report.getControls().item(paintObject.getTag());

                if(paintObjAspect === null) return;

            } catch(ex) {
                cError.mngError(ex);
            }
        }

        private endEditText(descartar: boolean) {
            /* TODO: implement me
            if(!TxEdit.Visible) return;

            TxEdit.Visible = false;

            if(descartar) return;

            this.dataHasChanged = true;

            cReportPaintObject paintObjAspect = null;
            paintObjAspect = this.paint.getPaintObject(this.keyObj);
            if(paintObjAspect === null) return;

            String sKeyRpt = "";
            sKeyRpt = paintObjAspect.getTag();

            paintObjAspect.setText(TxEdit.getText());

            this.report.getControls().item(sKeyRpt).getLabel().setText(paintObjAspect.getText());
            refreshBody();
             */
        }

        private paintSection(aspect: cReportAspect,
                             sKey: string,
                             rptType: csRptSectionType,
                             text: string,
                             isSecLn: boolean) {

            const paintObj = this.paint.getNewSection(csRptPaintObjType.CSRPTPAINTOBJBOX);

            let paintAspect: cReportAspect = paintObj.getAspect();

            // we only draw the bottom line of the sections
            //
            paintAspect.setLeft(0);
            paintAspect.setTop(aspect.getTop() + aspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
            paintAspect.setWidth(aspect.getWidth());
            paintAspect.setHeight(cGlobals.C_HEIGHT_BAR_SECTION);
            paintAspect.setBorderType(csReportBorderType.CS_RPT_BS_FIXED);
            paintAspect.setBorderWidth(1);

            if(isSecLn) {
                paintAspect.setBackColor("#ffcc99");
                paintAspect.setBorderColor(Color.Red.toArgb());
            }
            else {
                const INNER_COLOR = "#99ccff";

                if(rptType === csRptSectionType.GROUP_FOOTER
                    || rptType === csRptSectionType.GROUP_HEADER) {
                    paintAspect.setBackColor(INNER_COLOR);
                    paintAspect.setBorderColor("#C0C000");
                }
                else {
                    paintAspect.setBackColor(INNER_COLOR);
                    paintAspect.setBorderColor("#0066cc");
                }
            }

            if(rptType === csRptSectionType.MAIN_FOOTER
                || rptType === csRptSectionType.FOOTER) {
                paintAspect.setOffset(this.offSet);
            }

            paintObj.setIsSection(!isSecLn);
            paintObj.setIsSectionLine(isSecLn);

            paintObj.setRptType(rptType);
            paintObj.setTag(sKey);

            paintObj.setText(text);

            return paintObj.getKey();
        }

        private getLineRegionForControl(sKeyPaintObj: string,
                                        rptSecLine: RefWrapper<cReportSectionLine>,
                                        isFreeCtrl: boolean) {

            let rptSection = new RefWrapper<cReportSection>(null);

            rptSecLine.set(null);

            if(! this.getRegionForControl(sKeyPaintObj, rptSection, isFreeCtrl)) { return false; }

            let w1: number = 0;
            let w2: number = 0;

            let y: number = 0;

            let rtnSecLine: cReportSectionLine = null;

            let aspect: cReportAspect = this.paint.getPaintObject(sKeyPaintObj).getAspect();
            if(isFreeCtrl) {
                y = aspect.getTop() + aspect.getOffset();
            }
            else {
                y = aspect.getTop() + aspect.getHeight() / 2 + aspect.getOffset();
            }

            for(let _i = 0; _i < rptSection.get().getSectionLines().count(); _i++) {
                let rptSL: cReportSectionLine = rptSection.get().getSectionLines().item(_i);
                aspect = rptSL.getAspect();
                w1 = aspect.getTop();
                w2 = aspect.getTop() + aspect.getHeight();
                if(isFreeCtrl) {
                    //
                    // if the control is a free control
                    // this function will return the last sectionLine which
                    // has a bottom bigger than the top of the control
                    //
                    if(w1 <= y) {
                        rtnSecLine = rptSL;
                    }
                }
                else {
                    //
                    // if the control is not a free control
                    // this function will return the section line
                    // which contains the control
                    //
                    if(w1 <= y && w2 >= y) {
                        rtnSecLine = rptSL;
                        break;
                    }
                }
            }

            //
            // if the control is not a free control and there wasn't a
            // section line which contained the top of the control
            // (I think that can't be possible but anyways)
            // this function will return false and rptSecLine will be null
            //

            if(rtnSecLine !== null) {
                rptSecLine.set(rtnSecLine);
                return true;
            }
            else {
                return false;
            }
        }

        private getRegionForControl(sKeyPaintObj: string, rptSection: RefWrapper<cReportSection>, isFreeCtrl: boolean) {
            let y: number;

            let aspect: cReportAspect = this.paint.getPaintObject(sKeyPaintObj).getAspect();

            // Headers
            //
            let x = aspect.getLeft();
            if(isFreeCtrl) {
                y = aspect.getTop();
            }
            else {
                y = aspect.getTop() + aspect.getHeight() / 2;
            }

            if(cEditor.getRegionForControlAux(this.report.getHeaders(), x, y, rptSection, isFreeCtrl)) {
                aspect.setOffset(0);
                return true;
            }

            // Groups Headers
            //
            if(cEditor.getRegionForControlAux(this.report.getGroupsHeaders(), x, y, rptSection, isFreeCtrl)) {
                aspect.setOffset(0);
                return true;
            }

            // Details
            //
            if(cEditor.getRegionForControlAux(this.report.getDetails(), x, y, rptSection, isFreeCtrl)) {
                aspect.setOffset(0);
                return true;
            }

            // Groups Footers
            //
            if(cEditor.getRegionForControlAux(this.report.getGroupsFooters(), x, y, rptSection, isFreeCtrl)) {
                aspect.setOffset(0);
                return true;
            }

            y = y + this.offSet;

            // Footers
            //
            if(cEditor.getRegionForControlAux(this.report.getFooters(), x, y, rptSection, isFreeCtrl)) {
                aspect.setOffset(this.offSet);
                return true;
            }

            return false;
        }

        private static getRegionForControlAux(rptSections: cIReportGroupSections,
                                              x: number,
                                              y: number,
                                              rptSection: RefWrapper<cReportSection>,
                                              isFreeCtrl: boolean) {
            let y1: number = 0;
            let y2: number = 0;
            let rtnSec: cReportSection = null;

            rptSection.set(null);

            for(let _i = 0; _i < rptSections.count(); _i++) {

                let rptSec: cReportSection = rptSections.item(_i);
                let aspect: cReportAspect = rptSec.getAspect();

                y1 = aspect.getTop();
                y2 = aspect.getTop() + aspect.getHeight();

                if(isFreeCtrl) {
                    if(y1 <= y) {
                        rtnSec = rptSec;
                    }
                }
                else {
                    if(y1 <= y && y2 >= y) {
                        rtnSec = rptSec;
                        break;
                    }
                }
            }

            if(rtnSec !== null) {
                rptSection.set(rtnSec);
                return true;
            }
            else {
                return false;
            }
        }

        private pChangeTopSection(rptSec: cReportSection,
                                  offSetTopSection: number,
                                  bChangeTop: boolean,
                                  bZeroOffset: boolean) {

            let newTopCtrl: number = 0;
            let bottom: number = 0;
            let secLnHeight: number = 0;
            let offSecLn: number = 0;
            let paintSec: cReportPaintObject;

            let secAspect: cReportAspect = rptSec.getAspect();
            secAspect.setTop(secAspect.getTop() + offSetTopSection);
            let offSet = rptSec.getSectionLines().item(0).getAspect().getTop() - secAspect.getTop();
            const secTop = secAspect.getTop();

            for(let _i = 0; _i < rptSec.getSectionLines().count(); _i++) {

                let rptSecLine: cReportSectionLine = rptSec.getSectionLines().item(_i);

                let secLineAspect: cReportAspect = rptSecLine.getAspect();

                // footers grow to top
                //
                if(rptSec.getTypeSection() === csRptSectionType.MAIN_FOOTER
                    || rptSec.getTypeSection() === csRptSectionType.FOOTER) {

                    if(bChangeTop) {

                        if(bZeroOffset) {
                            offSet = 0;
                        }

                    }
                    else {

                        if(rptSecLine.getRealIndex() >= this.indexSecLnMoved && this.indexSecLnMoved > 0) {

                            bChangeTop = true;
                        }

                    }

                    // every other section grow to bottom
                    //
                }
                else {
                    offSecLn =  - secLineAspect.getTop();

                    if(offSetTopSection !== 0) {
                        offSecLn = 0;
                    }
                }

                secLineAspect.setTop(secTop + secLnHeight);
                secLnHeight = secLnHeight + secLineAspect.getHeight();

                if(rptSecLine.getKeyPaint() !== "") {
                    paintSec = this.paint.getPaintSections().item(rptSecLine.getKeyPaint());
                    paintSec.getAspect().setTop(secLineAspect.getTop() + secLineAspect.getHeight() - cGlobals.C_HEIGHT_BAR_SECTION);
                }
                else {
                    paintSec = this.paint.getPaintSections().item(rptSec.getKeyPaint());
                }
                if(paintSec !== null) {
                    paintSec.setHeightSecLine(secLineAspect.getHeight());
                }

                for(let _j = 0; _j < rptSecLine.getControls().count(); _j++) {
                    let rptCtrl: cReportControl = rptSecLine.getControls().item(_j);

                    let ctrLabelAspect: cReportAspect = rptCtrl.getLabel().getAspect();

                    if(rptCtrl.getIsFreeCtrl()) {
                        newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn;
                    }
                    else {
                        newTopCtrl = (ctrLabelAspect.getTop() + ctrLabelAspect.getHeight() - offSet) + offSecLn;
                    }

                    bottom = secLineAspect.getTop() + secLineAspect.getHeight();

                    if(newTopCtrl > bottom) {
                        newTopCtrl = bottom - ctrLabelAspect.getHeight();
                    }
                    else {
                        newTopCtrl = (ctrLabelAspect.getTop() - offSet) + offSecLn;
                    }

                    if(newTopCtrl < secLineAspect.getTop()) { newTopCtrl = secLineAspect.getTop(); }

                    ctrLabelAspect.setTop(newTopCtrl);
                    if(this.paint.getPaintObject(rptCtrl.getKeyPaint()) !== null) {
                        this.paint.getPaintObject(rptCtrl.getKeyPaint()).getAspect().setTop(ctrLabelAspect.getTop());
                    }
                }
            }

            // when a group instanceof added the first to get here is the header
            // and the footer hasn't contain a section yet
            //
            if(rptSec.getKeyPaint() === "") return;

            let aspect: cReportAspect = rptSec.getAspect();

            // we only draw the bottom line of the sections
            //
            paintSec = this.paint.getPaintSections().item(rptSec.getKeyPaint());

            if(paintSec !== null) {
                paintSec.getAspect().setTop(aspect.getTop()
                                            + aspect.getHeight()
                                            - cGlobals.C_HEIGHT_BAR_SECTION);
                paintSec.setHeightSec(aspect.getHeight());
            }
        }

        private moveSection(paintObj: cReportPaintObject,
                            x: number,
                            y: number,
                            minBottom: number,
                            maxBottom: number,
                            secToMove: cReportSection,
                            isNew: boolean) {

            if(this.bNoMove) return;

            let oldHeight: number = 0;

            this.dataHasChanged = true;

            let aspect: cReportAspect = paintObj.getAspect();

            // if Y instanceof contained by the allowed range everything is ok
            //
            if(y >= minBottom && y <= maxBottom) {
                aspect.setTop(y - this.offY);

                // because the top has been set to real dimensions
                // of the screen we must move to the offset
                // of its section
                //
                aspect.setTop(aspect.getTop() + aspect.getOffset());
            }
            else {
                // if we have moved to top
                //
                if(y < minBottom) {
                    aspect.setTop(minBottom);

                    // because the top has been set to real dimensions
                    // of the screen we must move to the offset
                    // of his section
                    //
                    aspect.setTop(aspect.getTop() + aspect.getOffset());
                }
                else {
                    aspect.setTop(maxBottom);
                }
            }

            // TODO: remove after more testing - aligning the sections has an undesired result: the last section line is shrinked after five resize actions
            //
            // this.paint.alignToGrid(paintObj.getKey());

            if(isNew) {
                oldHeight = 0;
            }
            else {
                oldHeight = secToMove.getAspect().getHeight();
            }

            // for the detail section and every other section which is over the detail
            // we only change the height, for all sections bellow the detail we need to
            // change the height and top because wen we stretch a section it needs to move
            // to the bottom of the report
            //
            secToMove.getAspect().setHeight(aspect.getTop()
                                            + cGlobals.C_HEIGHT_BAR_SECTION
                                            - secToMove.getAspect().getTop());

            // every section bellow this section needs to update its top
            //
            let offsetTop: number = 0;

            aspect = secToMove.getAspect();

            offsetTop = oldHeight - (aspect.getHeight() + this.newSecLineOffSet);

            switch (secToMove.getTypeSection()) {

                    // if the section is a footer we move to bottom
                    // (OJO: footer sections, no group footers)
                    //
                case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:

                    aspect.setTop(aspect.getTop() + offsetTop);

                    // OJO: this has to be after we have changed the top of the section
                    //      to allow the paint object to reflect the change
                    //
                    // we move the controls of this section
                    //
                    this.pChangeHeightSection(secToMove, oldHeight);

                    // move the section
                    //
                    this.pChangeBottomSections(secToMove, offsetTop);

                    // for headers, group headers, group footers and the detail section we move to top
                    //
                    break;
                default:

                    // move all controls in this section
                    //
                    this.pChangeHeightSection(secToMove, oldHeight);

                    offsetTop = offsetTop * -1;

                    this.pChangeTopSections(secToMove, offsetTop);
                    break;
            }

            // finally we need to update the offset of every section,
            // apply it to every object paint in this.Paint
            //
            let pageHeight: number = 0;
            let paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.pGetOffSet(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                            this.report.getPaperInfo(),
                                                            paperInfo.getPaperSize(),
                                                            paperInfo.getOrientation()
                                                        ).getHeight(),
                                                        pageHeight);
            this.pRefreshOffSetInPaintObjs();
            this.paint.setGridHeight(pageHeight);
        }

        private pChangeBottomSections(secToMove: cReportSection, offsetTop: number) {

            let sec: cReportSection = null;
            let bChangeTop: boolean = false;

            if(secToMove.getTypeSection() === csRptSectionType.FOOTER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_FOOTER
                || bChangeTop) {

                for(let i = this.report.getFooters().count()-1; i > -1; i--) {
                    sec = this.report.getFooters().item(i);

                    if(bChangeTop) {
                        this.pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if(sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }
        }

        private pChangeTopSections(secToMove: cReportSection, offsetTop: number) {

            let sec: cReportSection = null;
            let bChangeTop: boolean = false;

            if(secToMove.getTypeSection() === csRptSectionType.HEADER
                || secToMove.getTypeSection() === csRptSectionType.MAIN_HEADER) {

                for(let _i = 0; _i < this.report.getHeaders().count(); _i++) {
                    sec = this.report.getHeaders().item(_i);
                    if(bChangeTop) {
                        this.pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if(sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if(secToMove.getTypeSection() === csRptSectionType.GROUP_HEADER || bChangeTop) {

                for(let _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                    sec = this.report.getGroupsHeaders().item(_i);
                    if(bChangeTop) {
                        this.pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if(sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if(secToMove.getTypeSection() === csRptSectionType.MAIN_DETAIL
                || secToMove.getTypeSection() === csRptSectionType.DETAIL || bChangeTop) {

                for(let _i = 0; _i < this.report.getDetails().count(); _i++) {
                    sec = this.report.getDetails().item(_i);
                    if(bChangeTop) {
                        this.pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if(sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }

            if(secToMove.getTypeSection() === csRptSectionType.GROUP_FOOTER || bChangeTop) {

                for(let _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                    sec = this.report.getGroupsFooters().item(_i);
                    if(bChangeTop) {
                        this.pChangeTopSection(sec, offsetTop, bChangeTop, false);
                    }

                    if(sec === secToMove) {
                        bChangeTop = true;
                    }
                }
            }
        }

        private pChangeHeightSection(sec: cReportSection, oldSecHeight: number) {
            let heightLines: number = 0;
            let aspect: cReportAspect;

            // Update section line
            //
            for(let i = 0; i < sec.getSectionLines().count() - 1; i++) {
                aspect = sec.getSectionLines().item(i).getAspect();
                heightLines = heightLines + aspect.getHeight();
            }

            // for the last section line the height is the rest
            //
            let sectionLines: cReportSectionLines = sec.getSectionLines();
            aspect = sectionLines.item(sectionLines.count()-1).getAspect();
            aspect.setHeight(sec.getAspect().getHeight() - heightLines);

            this.pChangeTopSection(sec, 0, false, true);
        }

        private getSectionRuleName(sec: cReportSection) {
            switch(sec.getTypeSection()) {
                case csRptSectionType.HEADER: return "H " + sec.getRealIndex();
                case csRptSectionType.DETAIL: return "D " + sec.getRealIndex();
                case csRptSectionType.FOOTER: return "F " + sec.getRealIndex();
                case csRptSectionType.GROUP_HEADER: return "GH " + sec.getRealIndex();
                case csRptSectionType.GROUP_FOOTER: return "GF " + sec.getRealIndex();
                case csRptSectionType.MAIN_HEADER: return "MH";
                case csRptSectionType.MAIN_DETAIL: return "MD";
                case csRptSectionType.MAIN_FOOTER: return "MF";
                case csRptSectionType.CONTROL: return "C";
                case csRptSectionType.SECLN_HEADER: return "LH";
                case csRptSectionType.SECLN_DETAIL: return "LD";
                case csRptSectionType.SECLN_FOOTER: return "F " + sec.getRealIndex();
                case csRptSectionType.SECLN_GROUPH: return "GH " + sec.getRealIndex();
                case csRptSectionType.SECLN_GROUPF: return "GF " + sec.getRealIndex();
            }
        }

        private reLoadReport() {

            let paintSec: cReportPaintObject = null;

            this.keyMoving = "";
            this.keySizing = "";
            this.keyObj = "";
            this.keyFocus = "";
            this.moveType = csRptEditorMoveType.CSRPTEDMOVTNONE;

            this.paint = new cReportPaint();

            let paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.paint.setGridHeight(
                    this.setSizePics(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                this.report.getPaperInfo(),
                                                                paperInfo.getPaperSize(),
                                                                paperInfo.getOrientation()).getHeight()));

            return this.paint.initGrid(this.picReport.getGraphics(), this.typeGrid).then(P.call(this, () => {

                if(this.report.getName() !== "") {
                    this.editorTab.setText(this.report.getName());
                }

                let sec: cReportSection = null;

                for(let _i = 0; _i < this.report.getHeaders().count(); _i++) {
                    sec = this.report.getHeaders().item(_i);
                    const secName = this.getSectionRuleName(sec);
                    sec.setKeyPaint(this.paintSection(sec.getAspect(),
                                                    sec.getKey(),
                                                    sec.getTypeSection(),
                                                    secName,
                                                    false));
                    paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                    paintSec.setHeightSec(sec.getAspect().getHeight());
                    this.addPaintSectionForSecLn(sec, csRptSectionType.SECLN_HEADER);
                }

                for(let _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                    sec = this.report.getGroupsHeaders().item(_i);
                    const secName = this.getSectionRuleName(sec);
                    sec.setKeyPaint(this.paintSection(sec.getAspect(),
                                                    sec.getKey(),
                                                    sec.getTypeSection(),
                                                    secName,
                                                    false));
                    paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                    paintSec.setHeightSec(sec.getAspect().getHeight());
                    this.addPaintSectionForSecLn(sec, csRptSectionType.SECLN_GROUPH);
                }

                for(let _i = 0; _i < this.report.getDetails().count(); _i++) {
                    sec = this.report.getDetails().item(_i);
                    const secName = this.getSectionRuleName(sec);
                    sec.setKeyPaint(this.paintSection(sec.getAspect(),
                                                    sec.getKey(),
                                                    sec.getTypeSection(),
                                                    secName,
                                                    false));
                    paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                    paintSec.setHeightSec(sec.getAspect().getHeight());
                    this.addPaintSectionForSecLn(sec, csRptSectionType.SECLN_DETAIL);
                }

                for(let _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                    sec = this.report.getGroupsFooters().item(_i);
                    const secName = this.getSectionRuleName(sec);
                    sec.setKeyPaint(this.paintSection(sec.getAspect(),
                                                    sec.getKey(),
                                                    sec.getTypeSection(),
                                                    secName,
                                                    false));
                    paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                    paintSec.setHeightSec(sec.getAspect().getHeight());
                    this.addPaintSectionForSecLn(sec, csRptSectionType.SECLN_GROUPF);
                }

                for(let _i = 0; _i < this.report.getFooters().count(); _i++) {
                    sec = this.report.getFooters().item(_i);
                    const secName = this.getSectionRuleName(sec);
                    sec.setKeyPaint(this.paintSection(sec.getAspect(),
                                                    sec.getKey(),
                                                    sec.getTypeSection(),
                                                    secName,
                                                    false));
                    paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());
                    paintSec.setHeightSec(sec.getAspect().getHeight());
                    this.addPaintSectionForSecLn(sec, csRptSectionType.SECLN_FOOTER);
                }

                let paintType: csRptPaintObjType;

                for(let _i = 0; _i < this.report.getControls().count(); _i++) {

                    let rptCtrl: cReportControl = this.report.getControls().item(_i);
                    this.refreshNextNameCtrl(rptCtrl.getName());
                    let ctrlAspect: cReportAspect = rptCtrl.getLabel().getAspect();

                    if(rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_IMAGE
                        || rptCtrl.getControlType() === csRptControlType.CS_RPT_CT_CHART) {
                        paintType = csRptPaintObjType.CSRPTPAINTOBJIMAGE;
                    }
                    else {
                        paintType = csRptPaintObjType.CSRPTPAINTOBJBOX;
                    }

                    let paintObj: cReportPaintObject = this.paint.getNewObject(paintType);

                    // for old reports
                    //
                    ctrlAspect.setTransparent(ctrlAspect.getBackColor() === Color.White.toArgb());

                    paintObj.setImage(rptCtrl.getImage().getImage());

                    let aspect: cReportAspect = paintObj.getAspect();
                    aspect.setLeft(ctrlAspect.getLeft());
                    aspect.setTop(ctrlAspect.getTop());
                    aspect.setWidth(ctrlAspect.getWidth());
                    aspect.setHeight(ctrlAspect.getHeight());
                    aspect.setBackColor(ctrlAspect.getBackColor());
                    aspect.setTransparent(ctrlAspect.getTransparent());
                    aspect.setAlign(ctrlAspect.getAlign());
                    aspect.setWordWrap(ctrlAspect.getWordWrap());

                    if(ctrlAspect.getBorderType() === csReportBorderType.CS_RPT_BS_NONE) {
                        aspect.setBorderColor(Color.Black.toArgb());
                        aspect.setBorderWidth(0);
                        aspect.setBorderRounded(false);
                        aspect.setBorderType(csReportBorderType.CS_RPT_BS_FIXED);
                    }
                    else {
                        aspect.setBorderType(ctrlAspect.getBorderType());
                        aspect.setBorderColor(ctrlAspect.getBorderColor());
                        aspect.setBorderColor3d(ctrlAspect.getBorderColor3d());
                        aspect.setBorderColor3dShadow(ctrlAspect.getBorderColor3dShadow());
                        aspect.setBorderRounded(ctrlAspect.getBorderRounded());
                        aspect.setBorderWidth(ctrlAspect.getBorderWidth());
                    }

                    switch (rptCtrl.getSectionLine().getTypeSection()) {
                        case csRptSectionType.FOOTER:
                        case csRptSectionType.MAIN_FOOTER:
                            aspect.setOffset(this.offSet);
                            break;
                    }

                    let font: cReportFont = aspect.getFont();
                    font.setName(ctrlAspect.getFont().getName());
                    font.setForeColor(ctrlAspect.getFont().getForeColor());
                    font.setSize(ctrlAspect.getFont().getSize());
                    font.setBold(ctrlAspect.getFont().getBold());
                    font.setItalic(ctrlAspect.getFont().getItalic());
                    font.setUnderline(ctrlAspect.getFont().getUnderline());
                    font.setStrike(ctrlAspect.getFont().getStrike());

                    paintObj.setText(rptCtrl.getLabel().getText());
                    paintObj.setRptType(csRptSectionType.CONTROL);
                    paintObj.setTag(rptCtrl.getKey());
                    rptCtrl.setKeyPaint(paintObj.getKey());
                }

                this.dataHasChanged = false;

                this.paint.createPicture(this.picReport.getGraphics());

                this.refreshRule();

                cMainEditor.clearProperties();
            }));
        }

        private addPaintSectionForSecLn(sec: cReportSection, typeSecLn: csRptSectionType) {
            let paintSec: cReportPaintObject = null;

            if(sec.getSectionLines().count() > 1) {

                for(let i = 0; i < sec.getSectionLines().count() - 1; i++) {
                    let secLine: cReportSectionLine = sec.getSectionLines().item(i);
                    secLine.setKeyPaint(
                        this.paintSection(
                            secLine.getAspect(),
                            secLine.getKey(),
                            sec.getTypeSection(),
                            this.C_SECTION_LINE + i.toString(),
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
                po.setTextLine(this.C_SECTION_LINE + (sec.getSectionLines().count() - 1).toString());
            }

            // we set the height of the last section line
            //
            paintSec = this.paint.getPaintSections().item(sec.getKeyPaint());

            let secLines: cReportSectionLines = sec.getSectionLines();
            paintSec.setHeightSecLine(secLines.item(secLines.count() - 1).getAspect().getHeight());
        }

        private refreshNextNameCtrl(nameCtrl: string) {
            let x: number = 0;
            if(nameCtrl.substring(0, cGlobals.C_CONTROL_NAME.length).toUpperCase() === cGlobals.C_CONTROL_NAME.toUpperCase()) {
                x = Utils.valInt(nameCtrl.substring(cGlobals.C_CONTROL_NAME.length + 1));
                if(x > this.nextNameCtrl) {
                    this.nextNameCtrl = x + 1;
                }
            }
        }

        private moveControl(sKeyPaintObj: string) {
            let rptSecLine = new RefWrapper<cReportSectionLine>(null);
            let rptSecLineAspect: cReportAspect = null;

            this.paint.alignToGrid(sKeyPaintObj);

            const rptCtrl = this.report.getControls().item(this.paint.getPaintObject(sKeyPaintObj).getTag());

            const objPaintAspect = this.paint.getPaintObject(sKeyPaintObj).getAspect();

            if(rptCtrl === null) return;

            let aspect: cReportAspect = rptCtrl.getLabel().getAspect();
            aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset());
            aspect.setHeight(objPaintAspect.getHeight());
            aspect.setWidth(objPaintAspect.getWidth());
            aspect.setLeft(objPaintAspect.getLeft());

            if(this.getLineRegionForControl(sKeyPaintObj, rptSecLine, rptCtrl.getIsFreeCtrl())) {

                if(!(rptSecLine.get() === rptCtrl.getSectionLine())) {
                    rptCtrl.getSectionLine().getControls().remove(rptCtrl.getKey());
                    rptSecLine.get().getControls().add(rptCtrl, rptCtrl.getKey());
                }

                // we need to check the control is between the limits of the section
                // in which it is contained
                //
                rptSecLineAspect = rptCtrl.getSectionLine().getAspect();

                aspect = rptCtrl.getLabel().getAspect();

                aspect.setTop(objPaintAspect.getTop() + objPaintAspect.getOffset());

                if(!rptCtrl.getIsFreeCtrl()) {
                    if(aspect.getTop() + aspect.getHeight()
                        > rptSecLineAspect.getTop() + rptSecLineAspect.getHeight()) {
                        aspect.setTop(rptSecLineAspect.getTop()
                                        + rptSecLineAspect.getHeight()
                                        - aspect.getHeight());
                    }
                }

                if(aspect.getTop() < rptSecLineAspect.getTop()) {
                    aspect.setTop(rptSecLineAspect.getTop());
                }

                objPaintAspect.setTop(aspect.getTop());
            }
        }

        private showPopMenuSection(noDelete: boolean, showGroups: boolean, x: number, y: number) {
            this.fMain.showPopMenuSection(this, noDelete, showGroups, this.picReport.pointToScreen(new Point(x, y)));
        }

        private showPopMenuControl(clickInCtrl: boolean, x: number, y: number) {

            let pasteEnabled: boolean = false;

            if(this.vCopyKeys.length > 0) {
                pasteEnabled = true;
            }
            else if(!(this.fMain.getReportCopySource() === null)) {
                pasteEnabled = this.fMain.getReportCopySource().getVCopyKeysCount() > 0;
            }

            this.fMain.showPopMenuControl(this, clickInCtrl, pasteEnabled, this.picReport.pointToScreen(new Point(x, y)));
        }

        private fGroup_UnloadForm() {
            this.fGroup = null;
        }

        public destroyPropertiesFormReference() {
            this.fProperties = null;
        }

        private refreshBody() {
            try {

                this.paint.endMove(this.picReport.getGraphics());

            } catch(ex) {
                cError.mngError(ex);
            }
        }

        private refreshRule() {
            if(this.paint !== null) {
                this.paint.clearRule(this.picRule.getGraphics());
                let ps: cReportPaintObjects = this.paint.getPaintSections();
                for(let i = 0; i < ps.count(); i++) {
                    this.paint.drawRule(ps.getNextKeyForZOrder(i), this.picRule.getGraphics());
                }
            }
        }

        public refreshReport() {

            let paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.paint.setGridHeight(this.setSizePics(
                                       CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                    this.report.getPaperInfo(),
                                                                    paperInfo.getPaperSize(),
                                                                    paperInfo.getOrientation())
                                           .getHeight()));
            this.validateSectionAspect();
            return this.reLoadReport();
        }

        public refreshAll() {
            this.refreshBody();
            this.refreshRule();
            cMainEditor.setDocActive(this);
        }

        private reportDone(report: cReport) {
            this.closeProgressDlg();
        }

        private reportProgress(sender: object, e: any) {

            let task: string = e.task;
            let page: number = e.page;
            let currRecord: number = e.currRecord;
            let recordCount: number = e.recordCount;

            if(this.cancelPrinting) {
                if(cWindow.ask("Confirm you want to cancel the execution of this report?", MessageBoxDefaultButton.Button2)) {
                    e.cancel = true;
                    this.closeProgressDlg();
                    return;
                }
                else {
                    this.cancelPrinting = false;
                }
            }

            if(this.fProgress === null) return;

            if(page > 0) { this.fProgress.getLbCurrPage().setText(page.toString()); }
            if(task !== "") { this.fProgress.getLbTask().setText(task); }
            if(currRecord > 0) { this.fProgress.getLbCurrRecord().setText(currRecord.toString()); }
            if(recordCount > 0 && Utils.val(this.fProgress.getLbRecordCount().getText()) !== recordCount) {
                this.fProgress.getLbRecordCount().setText(recordCount.toString());
            }

            let percent: number = 0;
            if(recordCount > 0 && currRecord > 0) {
                percent = currRecord / recordCount;
                let value = Math.trunc(percent * 100);
                if(value > 100) value = 100;
                this.fProgress.getPrgBar().setValue(value);
            }
        }

        private closeProgressDlg() {
            if(this.fProgress !== null && !this.fProgress.isDisposed()) {
                this.fProgress.close();
            }
            this.fProgress = null;
        }

        private showProgressDlg() {
            this.cancelPrinting = false;
            if(this.fProgress === null) {
                this.fProgress = new FProgress();
                // TODO: add event for this.report_Progress
            }
            this.fProgress.show();
            this.fProgress.bringToFront();
        }

        private fProgress_Cancel() {
            this.cancelPrinting = true;
        }

        private getLeftBody() {
            if(cMainEditor.gHideLeftBar) {
                return this.C_LEFT_BODY;
            }
            else {
                return this.picRule.getWidth() + this.C_LEFT_BODY;
            }
        }

        private setSizePics(realPageHeight: number) {
            let pageHeight: number = 0;

            let paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            this.picReport.setWidth(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                                this.report.getPaperInfo(),
                                                                paperInfo.getPaperSize(),
                                                                paperInfo.getOrientation())
                                                        .getWidth());
            this.pGetOffSet(realPageHeight, pageHeight);

            if(pageHeight > realPageHeight) { realPageHeight = pageHeight; }

            this.picReport.setHeight(realPageHeight);
            this.picRule.setHeight(realPageHeight + this.C_TOP_BODY * 2);

            return pageHeight;
        }

        private pMoveAll(x: number, y: number) {
            let rptCtrlAspect: cReportAspect = null;
            let paintObj: cReportPaintObject = null;

            this.dataHasChanged = true;

            if(this.bNoMove) return;

            let i: number = 0;
            let offsetTop: number = 0;
            let offsetLeft: number = 0;
            let firstLeft: number = 0;
            let firstTop: number = 0;
            let firstOffSet: number = 0;

            if(this.vSelectedKeys.length === 0) return;

            paintObj = this.paint.getPaintObject(this.keyMoving);

            let aspect: cReportAspect = paintObj.getAspect();
            firstLeft = aspect.getLeft();
            firstTop = aspect.getTop();
            firstOffSet = aspect.getOffset();

            for(i = this.vSelectedKeys.length-1; i > -1; i--) {

                paintObj = this.paint.getPaintObject(this.vSelectedKeys[i]);

                offsetLeft = cEditor.getOffsetLeftFromControls(firstLeft,
                                                        paintObj.getAspect().getLeft());

                offsetTop = cEditor.getOffsetTopFromControls(firstTop - firstOffSet,
                                                        paintObj.getAspect().getTop()
                                                        - paintObj.getAspect().getOffset());

                aspect = paintObj.getAspect();

                if(x !== this.C_NO_MOVE) {
                    aspect.setLeft(x - this.offX + offsetLeft);
                }

                if(y !== this.C_NO_MOVE) {
                    aspect.setTop(y - this.offY + offsetTop);
                }
                else {

                    // we get rid off the offset because the primitive
                    // add it to the top but we don't allow vertical
                    // moves so Y must to remain constant
                    //
                    aspect.setTop(aspect.getTop() - paintObj.getAspect().getOffset());
                }

                // only controls move in all directions
                //
                if(paintObj.getRptType() === csRptSectionType.CONTROL) {
                    rptCtrlAspect = this.report.getControls().item(paintObj.getTag()).getLabel().getAspect();
                    rptCtrlAspect.setLeft(aspect.getLeft());
                    rptCtrlAspect.setTop(aspect.getTop());
                    rptCtrlAspect.setWidth(aspect.getWidth());
                    rptCtrlAspect.setHeight(aspect.getHeight());
                }

                this.moveControl(this.vSelectedKeys[i]);
            }
        }

        private pMoveHorizontal(x: number) {
            this.dataHasChanged = true;
            this.paint.getPaintObject(this.keyMoving).getAspect().setLeft(x - this.offX);
        }

        private pMoveVertical(x: number, y: number) {
            let sKeySection: string = "";

            let maxBottom = new RefWrapper<number>(0);
            let minBottom = new RefWrapper<number>(0);

            let maxBottomSectionLine = new RefWrapper<number>(0);

            let rptSec: cReportSection = null;
            let isSecLn: boolean = false;

            this.indexSecLnMoved = -1;

            let paintObj = this.paint.getPaintObject(this.keyMoving);
            let aspect: cReportAspect = paintObj.getAspect();

            sKeySection = paintObj.getTag();

            // sections can only be move vertically
            // always instanceof the bottom of the section which is moved
            // every time we move a section the height change
            //
            let rptType = paintObj.getRptType();

            switch (rptType) {

                    //---------------------
                    // HEADER
                    //---------------------

                case csRptSectionType.MAIN_HEADER:
                case csRptSectionType.HEADER:

                    rptSec = this.moveHeader(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // GROUP HEADER
                    //---------------------

                    break;

                case csRptSectionType.GROUP_HEADER:

                    rptSec = this.moveGroupHeader(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // DETAIL
                    //---------------------

                    break;

                case csRptSectionType.MAIN_DETAIL:
                case csRptSectionType.DETAIL:

                    rptSec = this.moveDetails(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // GROUP FOOTER
                    //---------------------

                    break;

                case csRptSectionType.GROUP_FOOTER:

                    rptSec = this.moveGroupFooter(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // FOOTER
                    //---------------------

                    break;

                case csRptSectionType.MAIN_FOOTER:
                case csRptSectionType.FOOTER:

                    rptSec = this.moveFooter(sKeySection, minBottom, maxBottom);

                    //---------------------
                    // Section Lines
                    //---------------------
                    break;

                case csRptSectionType.SECLN_HEADER:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = this.moveHeader(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case csRptSectionType.SECLN_GROUPH:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = this.moveGroupHeader(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case csRptSectionType.SECLN_DETAIL:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = this.moveDetails(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case csRptSectionType.SECLN_GROUPF:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = this.moveGroupFooter(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    break;

                case csRptSectionType.SECLN_FOOTER:
                    sKeySection = paintObj.getRptKeySec();
                    rptSec = this.moveFooter(sKeySection, minBottom, maxBottom, true, paintObj.getTag(), maxBottomSectionLine);
                    isSecLn = true;
                    this.indexSecLnMoved = rptSec.getSectionLines().item(paintObj.getTag()).getRealIndex();
                    break;
            }

            if(isSecLn) {
                minBottom.set(cEditor.getMinBottomForSecLn(rptSec, paintObj.getTag(), minBottom.get()));
                this.changeSecLnHeight(paintObj,
                                    y,
                                    minBottom.get(),
                                    maxBottomSectionLine.get(),
                                    rptSec.getSectionLines().item(paintObj.getTag()));

                y = rptSec.getAspect().getTop()
                    - paintObj.getAspect().getOffset()
                    + cEditor.getSecHeightFromSecLines(rptSec)
                    - cGlobals.C_HEIGHT_BAR_SECTION;

                this.offY = 0;
                paintObj = this.paint.getPaintSections().item(rptSec.getKeyPaint());
            }

            this.moveSection(paintObj, x, y, minBottom.get(), maxBottom.get(), rptSec, false);
        }

        private static getSecHeightFromSecLines(sec: cReportSection) {
            let rtn: number = 0;

            for(let _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine = sec.getSectionLines().item(_i);
                rtn = rtn + secLn.getAspect().getHeight();
            }

            return rtn;
        }

        private static getMinBottomForSecLn(sec: cReportSection, secLnKey: string, minBottom: number) {
            for(let _i = 0; _i < sec.getSectionLines().count(); _i++) {
                let secLn: cReportSectionLine = sec.getSectionLines().item(_i);
                if(secLn.getKey() === secLnKey) { break; }
                minBottom = minBottom + secLn.getAspect().getHeight();
            }
            return minBottom;
        }

        private changeSecLnHeight(paintObj: cReportPaintObject,
                                  y: number, minBottom: number, maxBottom: number,
                                  secLn: cReportSectionLine) {
            let aspect: cReportAspect = paintObj.getAspect();

            // if Y instanceof contained between the range allowed everything is ok
            //
            if(y >= minBottom && y <= maxBottom) {
                aspect.setTop(y - this.offY);
            }
            else {
                // if it have been moved upward
                //
                if(y < minBottom) {
                    aspect.setTop(minBottom);

                }
                // if it have been moved downward
                //
                else {
                    aspect.setTop(maxBottom);
                }
            }

            // because the top has been setted to the real dimensions
            // of the screen now we need to move it the offset
            // of its section
            //
            aspect.setTop(aspect.getTop() + aspect.getOffset());

            // TODO: remove after more testing - aligning the sections has an undesired result:
            //  the last section line is shrinked after five resize actions
            //
            // this.paint.alignToGrid(paintObj.getKey());

            // the section line height has been changed
            //
            secLn.getAspect().setHeight(aspect.getTop()
                                        + cGlobals.C_HEIGHT_BAR_SECTION
                                        - secLn.getAspect().getTop());
        }

        private pResizeControl(x: number, y: number) {

            let height: number = 0;
            let width: number = 0;
            let left: number = 0;
            let top: number = 0;

            if(this.vSelectedKeys.length === 0) return;

            this.dataHasChanged = true;

            // first we need to modify the control which has its size changed
            //
            let po: cReportPaintObject = this.paint.getPaintObject(this.keySizing);
            let aspect: cReportAspect = po.getAspect();

            // original size to know how much it has changed
            //
            height = aspect.getHeight();
            width = aspect.getWidth();
            left = aspect.getLeft();
            top = aspect.getTop();

            switch (this.moveType) {
                case csRptEditorMoveType.CSRPTEDMOVDOWN:
                    aspect.setHeight(y - (aspect.getTop() - aspect.getOffset()));
                    break;
                case csRptEditorMoveType.CSRPTEDMOVLEFT:
                    aspect.setWidth(aspect.getWidth() + aspect.getLeft() - x);
                    aspect.setLeft(x);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                    aspect.setWidth(x - aspect.getLeft());
                    break;
                case csRptEditorMoveType.CSRPTEDMOVUP:
                    aspect.setHeight(aspect.getHeight() + (aspect.getTop() - aspect.getOffset()) - y);
                    aspect.setTop(y + aspect.getOffset());
                    break;
                case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                    aspect.setHeight(y - (aspect.getTop() - aspect.getOffset()));
                    aspect.setWidth(aspect.getWidth() + aspect.getLeft() - x);
                    aspect.setLeft(x);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                    aspect.setHeight(aspect.getHeight() + (aspect.getTop() - aspect.getOffset()) - y);
                    aspect.setTop(y + aspect.getOffset());
                    aspect.setWidth(aspect.getWidth() + aspect.getLeft() - x);
                    aspect.setLeft(x);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                    aspect.setWidth(x - aspect.getLeft());
                    aspect.setHeight(y - (aspect.getTop() - aspect.getOffset()));
                    break;
                case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                    aspect.setHeight(aspect.getHeight() + (aspect.getTop() - aspect.getOffset()) - y);
                    aspect.setTop(y + aspect.getOffset());
                    aspect.setWidth(x - aspect.getLeft());
                    break;
            }

            top = aspect.getTop() - top;
            left = aspect.getLeft() - left;
            width = aspect.getWidth() - width;
            height = aspect.getHeight() - height;

            this.pMoveControlAfterResize(po.getAspect(), true);

            for(let i = 0; i < this.vSelectedKeys.length; i++) {

                if(this.keySizing !== this.vSelectedKeys[i]) {

                    po = this.paint.getPaintObject(this.vSelectedKeys[i]);
                    aspect = po.getAspect();

                    aspect.setHeight(aspect.getHeight() + height);
                    aspect.setTop(aspect.getTop() + top);
                    aspect.setWidth(aspect.getWidth() + width);
                    aspect.setLeft(aspect.getLeft() + left);

                    this.pMoveControlAfterResize(po.getAspect(), false);
                }
            }
        }

        private pMoveControlAfterResize(aspect: cReportAspect, bSizing: boolean) {
            const C_MIN_WIDTH: number = 1;
            const C_MIN_HEIGHT: number = 1;

            let rptCtrlAspect: cReportAspect = null;

            if(this.paint.getPaintObject(this.keySizing).getRptType() === csRptSectionType.CONTROL) {
                rptCtrlAspect = this.report.getControls().item(
                    this.paint.getPaintObject(this.keySizing).getTag()).getLabel().getAspect();
                rptCtrlAspect.setLeft(aspect.getLeft());
                if(!bSizing) {
                    rptCtrlAspect.setTop(aspect.getTop() + aspect.getOffset());
                }
                else {
                    rptCtrlAspect.setTop(aspect.getTop());
                }
                rptCtrlAspect.setWidth(aspect.getWidth());
                rptCtrlAspect.setHeight(aspect.getHeight());
            }

            switch (this.moveType) {
                case csRptEditorMoveType.CSRPTEDMOVDOWN:
                    this.paint.alignObjBottomToGrid(this.keySizing);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVLEFT:
                    this.paint.alignObjLeftToGrid(this.keySizing);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVRIGHT:
                    this.paint.alignObjRightToGrid(this.keySizing);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVUP:
                    this.paint.alignObjTopToGrid(this.keySizing);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVLEFTDOWN:
                    this.paint.alignObjLeftBottomToGrid(this.keySizing);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVLEFTUP:
                    this.paint.alignObjLeftTopToGrid(this.keySizing);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVRIGHTDOWN:
                    this.paint.alignObjRightBottomToGrid(this.keySizing);
                    break;
                case csRptEditorMoveType.CSRPTEDMOVRIGHTUP:
                    this.paint.alignObjRightTopToGrid(this.keySizing);
                    break;
            }

            // Validations

            // Width can't be lower than C_MIN_WIDTH
            //
            if(aspect.getWidth() < C_MIN_WIDTH) { aspect.setWidth(C_MIN_WIDTH); }

            // Height can't be lower than C_MIN_HEIGHT
            //
            if(aspect.getHeight() < C_MIN_HEIGHT) { aspect.setHeight(C_MIN_HEIGHT); }
        }

        private moveHeader(sKeySection: string,
                            minBottom: RefWrapper<number>,
                            maxBottom: RefWrapper<number>,
                            isForSectionLine: boolean = false,
                            secLnKey: string = "",
                            maxBottomSectionLine: RefWrapper<number> = null) {

            let rptSec = this.report.getHeaders().item(sKeySection);
            let index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if(index === 0) {
                minBottom.set(this.C_MIN_HEIGHT_SECTION);
            }
            else {
                // bottom of previous header + C_Min_Height_Section
                let aspect: cReportAspect = this.report.getHeaders().item(index - 1).getAspect();
                minBottom.set(aspect.getTop() + aspect.getHeight() + this.C_MIN_HEIGHT_SECTION);
            }

            if(!isForSectionLine) {
                minBottom.set(cEditor.getMinBottomWithSecLn(rptSec.getSectionLines(), minBottom.get()));
            }
            if(maxBottomSectionLine != null) {
                maxBottomSectionLine.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, secLnKey));
            }
            maxBottom.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, ""));

            return rptSec;
        }

        private moveGroupHeader(sKeySection: string,
                                 minBottom: RefWrapper<number>,
                                 maxBottom: RefWrapper<number>,
                                 isForSectionLine: boolean = false,
                                 secLnKey: string = "",
                                 maxBottomSectionLine: RefWrapper<number> = null) {
            const rptSec = this.report.getGroupsHeaders().item(sKeySection);
            const index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if(index === 0) {
                // bottom of previous header + C_Min_Height_Section
                let headers: cReportSections = this.report.getHeaders();
                let aspect: cReportAspect = headers.item(headers.count()-1).getAspect();
                minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
            }
            else {
                // bottom of previous group header + C_Min_Height_Section
                let aspect: cReportAspect = this.report.getGroupsHeaders().item(index - 1).getAspect();
                minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
            }

            if(!isForSectionLine) {
                minBottom.set(cEditor.getMinBottomWithSecLn(rptSec.getSectionLines(), minBottom.get()));
            }

            if(maxBottomSectionLine != null) {
                maxBottomSectionLine.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, secLnKey));
            }
            maxBottom.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, ""));

            return rptSec;
        }

        private getHeightOfSectionsBellowMe(section: cReportSection, secLnKey: string) {
            let height: number = 0;

            if( ! (secLnKey === null || secLnKey.trim() === "") ) {
                let add: boolean = false;
                for(let _i = 0; _i < section.getSectionLines().count(); _i++) {
                    let secLn: cReportSectionLine = section.getSectionLines().item(_i);
                    if(add) {
                        height += secLn.getAspect().getHeight();
                    }
                    else if(secLn.getKey() === secLnKey) {
                        add = true;
                    }
                }
            }

            let rptType: csRptSectionType = section.getTypeSection();

            switch (rptType) {

                case csRptSectionType.HEADER:
                case csRptSectionType.MAIN_HEADER:
                    height += cEditor.getHeightFromSections(this.report.getHeaders(), section);
                    height += cEditor.getHeightFromSections(this.report.getGroupsHeaders(), null);
                    height += cEditor.getHeightFromSections(this.report.getDetails(), null);
                    height += cEditor.getHeightFromSections(this.report.getGroupsFooters(), null);
                    height += cEditor.getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.GROUP_HEADER:
                    height += cEditor.getHeightFromSections(this.report.getGroupsHeaders(), section);
                    height += cEditor.getHeightFromSections(this.report.getDetails(), null);
                    height += cEditor.getHeightFromSections(this.report.getGroupsFooters(), null);
                    height += cEditor.getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.DETAIL:
                case csRptSectionType.MAIN_DETAIL:
                    height += cEditor.getHeightFromSections(this.report.getDetails(), section);
                    height += cEditor.getHeightFromSections(this.report.getGroupsFooters(), null);
                    height += cEditor.getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.GROUP_FOOTER:
                    height += cEditor.getHeightFromSections(this.report.getGroupsFooters(), section);
                    height += cEditor.getHeightFromSections(this.report.getFooters(), null);
                    break;

                case csRptSectionType.FOOTER:
                case csRptSectionType.MAIN_FOOTER:
                    height += cEditor.getHeightFromSections(this.report.getFooters(), section);
                    break;

                default:
                    throw new ReportEditorException(
                        cReportEditorError.errGetDescription(
                                        csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID));
            }

            return height;
        }

        private static getHeightFromSections(sections: cIReportGroupSections, section: cReportSection) {
            let add: boolean = section === null;
            let height: number = 0;
            for(let _i = 0; _i < sections.count(); _i++) {
                let sec: cReportSection = sections.item(_i);
                if(add) {
                    height += sec.getAspect().getHeight();
                }
                else if(section === sec) {
                    add = true;
                }
            }
            return height;
        }

        private getAllHeadersAndGroupsAndDetailsHeight() {
            let sec: cReportSection = null;

            let height: number = 0;

            for(let _i = 0; _i < this.report.getHeaders().count(); _i++) {
                sec = this.report.getHeaders().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            for(let _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                sec = this.report.getGroupsHeaders().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            for(let _i = 0; _i < this.report.getDetails().count(); _i++) {
                sec = this.report.getDetails().item(_i);
                height = height + sec.getAspect().getHeight();
            }

            return height;
        }

        private moveDetails(sKeySection: string,
                             minBottom: RefWrapper<number>,
                             maxBottom: RefWrapper<number>,
                             isForSectionLine: boolean = false,
                             secLnKey: string = "",
                             maxBottomSectionLine:  RefWrapper<number> = null) {

            let rptSec = this.report.getDetails().item(sKeySection);
            let index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------

            if(index === 0) {
                // if there are groups
                //
                if(this.report.getGroupsHeaders().count() > 0) {
                    // top of the last group header + C_Min_Height_Section
                    let groupsHeaders: cIReportGroupSections = this.report.getGroupsHeaders();
                    let aspect: cReportAspect = groupsHeaders.item(groupsHeaders.count()-1).getAspect();
                    minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
                }
                else {
                    // top of the last header + C_Min_Height_Section
                    let headers: cReportSections = this.report.getHeaders();
                    let aspect: cReportAspect = headers.item(headers.count()-1).getAspect();
                    minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
                }
            }
            else {
                // top of the previous detail + C_Min_Height_Section
                //
                let aspect: cReportAspect = this.report.getDetails().item(index - 1).getAspect();
                minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
            }

            if(!isForSectionLine) {
                minBottom.set(cEditor.getMinBottomWithSecLn(rptSec.getSectionLines(), minBottom.get()));
            }

            if(maxBottomSectionLine != null) {
                maxBottomSectionLine.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, secLnKey));
            }
            maxBottom.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, ""));

            return rptSec;
        }

        private moveGroupFooter(sKeySection: string,
                                 minBottom: RefWrapper<number>,
                                 maxBottom: RefWrapper<number>,
                                 isForSectionLine: boolean = false,
                                 secLnKey: string = "",
                                 maxBottomSectionLine: RefWrapper<number> = null) {

            let rptSec = this.report.getGroupsFooters().item(sKeySection);
            let index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if(index === 0) {
                // bottom of the last detail + C_Min_Height_Section
                //
                let details: cReportSections = this.report.getDetails();
                let aspect: cReportAspect = details.item(details.count() - 1).getAspect();
                minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
            }
            else {
                // bottom of the previous group footer + C_Min_Height_Section
                //
                let aspect: cReportAspect = this.report.getGroupsFooters().item(index - 1).getAspect();
                minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
            }

            if(!isForSectionLine) {
                minBottom.set(cEditor.getMinBottomWithSecLn(rptSec.getSectionLines(), minBottom.get()));
            }
            if(maxBottomSectionLine != null) {
                maxBottomSectionLine.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, secLnKey));
            }
            maxBottom.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, ""));

            return rptSec;
        }

        private moveFooter(sKeySection: string,
                            minBottom: RefWrapper<number>,
                            maxBottom: RefWrapper<number>,
                            isForSectionLine: boolean = false,
                            secLnKey: string = "",
                            maxBottomSectionLine: RefWrapper<number> = null) {

            let rptSec = this.report.getFooters().item(sKeySection);
            let index = rptSec.getRealIndex();

            //-----------
            // MinBottom
            //-----------
            if(index === 0) {

                // if there are groups
                //
                if(this.report.getGroupsFooters().count() > 0) {

                    // the bottom of the last group footer
                    //
                    let groupsFooters: cIReportGroupSections = this.report.getGroupsFooters();
                    let aspect: cReportAspect = groupsFooters.item(groupsFooters.count() - 1).getAspect();
                    minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
                }
                else {
                    // bottom of the last detail
                    //
                    let details: cReportSections = this.report.getDetails();
                    let aspect: cReportAspect = details.item(details.count() - 1).getAspect();
                    minBottom.set(aspect.getHeight() + aspect.getTop() + this.C_MIN_HEIGHT_SECTION);
                }
            }
            else {
                // bottom of the previous footer
                //
                let aspect: cReportAspect = this.report.getFooters().item(index - 1).getAspect();
                minBottom.set(aspect.getHeight() + aspect.getTop() - this.offSet + this.C_MIN_HEIGHT_SECTION);
            }

            if(!isForSectionLine) {
                minBottom.set(cEditor.getMinBottomWithSecLn(rptSec.getSectionLines(), minBottom.get()));
            }

            if(maxBottomSectionLine != null) {
                maxBottomSectionLine.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, secLnKey));
            }
            maxBottom.set(this.picReport.getHeight() - this.getHeightOfSectionsBellowMe(rptSec, ""));

            return rptSec;
        }

        private static getMinBottomWithSecLn(secLns: cReportSectionLines, minBottom: number) {
            for(let i = 0; i < secLns.count() - 1; i++) {
                minBottom = minBottom + secLns.item(i).getAspect().getHeight();
            }

            return minBottom;
        }

        private pGetOffSet(realPageHeight: number, rtnPageHeight: number = 0) {
            let sec: cReportSection = null;

            rtnPageHeight = 0;

            for(let _i = 0; _i < this.report.getHeaders().count(); _i++) {
                sec = this.report.getHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(let _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                sec = this.report.getGroupsHeaders().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(let _i = 0; _i < this.report.getDetails().count(); _i++) {
                sec = this.report.getDetails().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(let _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                sec = this.report.getGroupsFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            for(let _i = 0; _i < this.report.getFooters().count(); _i++) {
                sec = this.report.getFooters().item(_i);
                rtnPageHeight = rtnPageHeight + sec.getAspect().getHeight();
            }

            this.offSet = realPageHeight - rtnPageHeight;

            if(this.offSet < 0) { this.offSet = 0; }
        }

        private pRefreshOffSetInPaintObjs() {
            let sec: cReportSection = null;
            let secLines: cReportSectionLine = null;
            let ctl: cReportControl = null;

            let paintSections: cReportPaintObjects = this.paint.getPaintSections();
                for(let _i = 0; _i < this.report.getFooters().count(); _i++) {
                    sec = this.report.getFooters().item(_i);
                    paintSections.item(sec.getKeyPaint()).getAspect().setOffset(this.offSet);
                    for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                        secLines = sec.getSectionLines().item(_j);
                        if(secLines.getKeyPaint() !== "") {
                            paintSections.item(secLines.getKeyPaint()).getAspect().setOffset(this.offSet);
                        }
                        for(let _k = 0; _k < secLines.getControls().count(); _k++) {
                            ctl = secLines.getControls().item(_k);
                            let po = this.paint.getPaintObjects().item(ctl.getKeyPaint());
                            po.getAspect().setOffset(this.offSet);
                        }
                    }
                }
        }

        // if the click was over a control which is not part of the
        // selected controls collection we clear the selected collection
        // and add the control which was clicked to the selected collection
        //
        private setSelectForRightButton() {
            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                if(this.vSelectedKeys[i] === this.keyObj) { return false; }
            }
            this.vSelectedKeys = [this.keyObj];
            return true;
        }

        private validateSectionAspect() {
            let sec: cReportSection = null;
            let top: number = 0;

            for(let _i = 0; _i < this.report.getHeaders().count(); _i++) {
                sec = this.report.getHeaders().item(_i);
                top = this.validateSectionAspectAux(top, sec);
            }

            for(let _i = 0; _i < this.report.getGroupsHeaders().count(); _i++) {
                sec = this.report.getGroupsHeaders().item(_i);
                top = this.validateSectionAspectAux(top, sec);
            }

            for(let _i = 0; _i < this.report.getDetails().count(); _i++) {
                sec = this.report.getDetails().item(_i);
                top = this.validateSectionAspectAux(top, sec);
            }

            for(let _i = 0; _i < this.report.getGroupsFooters().count(); _i++) {
                sec = this.report.getGroupsFooters().item(_i);
                top = this.validateSectionAspectAux(top, sec);
            }

            let paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            let height = CSReportPaint.cGlobals.getRectFromPaperSize(this.report.getPaperInfo(),
                                                    paperInfo.getPaperSize(),
                                                    paperInfo.getOrientation()
                            ).getHeight();
            top = height;

            this.pGetOffSet(height);

            for(let i = this.report.getFooters().count()-1; i > -1; i--) {
                sec = this.report.getFooters().item(i);
                top = top - sec.getAspect().getHeight();
                this.validateSectionAspectAux(top, sec);
            }

            this.pRefreshOffSetInPaintObjs();
        }

        private validateSectionAspectAux(top: number, sec: cReportSection) {
            let secLn: cReportSectionLine = null;
            let secLnHeight: number = 0;

            let paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            let width = CSReportPaint.cGlobals.getRectFromPaperSize(
                                                    this.report.getPaperInfo(),
                                                    paperInfo.getPaperSize(),
                                                    paperInfo.getOrientation()
                            ).getWidth();
            let topLn = top;

            let aspect: cReportAspect;

            for(let i = 0; i < sec.getSectionLines().count() - 1; i++) {
                secLn = sec.getSectionLines().item(i);
                aspect = secLn.getAspect();
                aspect.setTop(topLn);
                aspect.setWidth(width);
                if(aspect.getHeight() < this.C_MIN_HEIGHT_SECTION) {
                    aspect.setHeight(this.C_MIN_HEIGHT_SECTION);
                }
                topLn = topLn + aspect.getHeight();
                secLnHeight = secLnHeight + aspect.getHeight();
            }

            let sectionLines: cReportSectionLines = sec.getSectionLines();
            secLn = sectionLines.item(sectionLines.count()-1);

            // section line
            //
            aspect = secLn.getAspect();
            aspect.setTop(topLn);
            aspect.setHeight(sec.getAspect().getHeight() - secLnHeight);
            if(aspect.getHeight() < this.C_MIN_HEIGHT_SECTION) {
                aspect.setHeight(this.C_MIN_HEIGHT_SECTION);
            }
            secLnHeight = secLnHeight + aspect.getHeight();

            // section
            //
            aspect = sec.getAspect();
            aspect.setHeight(secLnHeight);
            if(aspect.getHeight() < this.C_MIN_HEIGHT_SECTION) {
                aspect.setHeight(this.C_MIN_HEIGHT_SECTION);
            }
            aspect.setWidth(width);
            aspect.setTop(top);
            top = top + aspect.getHeight();

            this.pChangeTopSection(sec, 0, false, false);
            return top;
        }

        public showControls() {
            try {
                let f: FControls = cMainEditor.getCtrlBox(this);
                f.clear();
                f.addCtrls(this.report);
                if(!f.getVisible()) {
                    f.show(this.fMain);
                }
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public showControlsTree() {
            try {
                let f: FTreeViewCtrls = cMainEditor.getCtrlTreeBox(this);
                f.clear();
                f.addCtrls();
                if(!f.getVisible()) {
                    f.show(this.fMain);
                }
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        private static setInitDir() {
            if(cMainEditor.gbFirstOpen) {
                cMainEditor.gbFirstOpen = false;
                // TODO: implement me
                // this.fmain.cmDialog.InitDir = cGlobals.gWorkFolder;
            }
        }

        public init() {
            this.showingProperties = false;

            this.report = new cReport();

            this.report.onProgress(this.reportProgress);
            this.report.onReportDone(this.reportDone);

            const oLaunchInfo = new cReportLaunchInfo();

            this.report.getPaperInfo().setPaperSize(this.fMain.getPaperSize());
            this.report.getPaperInfo().setOrientation(this.fMain.getOrientation());

            oLaunchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(this.fMain.printDialog()));
            oLaunchInfo.setObjPaint(new cReportPrint());
            if(!this.report.init(oLaunchInfo)) return;

            this.report.setPathDefault("~"); // Application.StartupPath

            this.picReport.setTop(this.C_TOP_BODY);
            this.picRule.setLeft(0);
            this.picReport.setLeft(this.getLeftBody());

            this.keyMoving = "";
            this.keySizing = "";
            this.keyObj = "";
            this.keyFocus = "";
            this.nextNameCtrl = 0;

            this.paint = new cReportPaint();

            let paperInfo: cReportPaperInfo = this.report.getPaperInfo();
            let tR = new Rectangle(CSReportPaint.cGlobals.getRectFromPaperSize(
                                                this.report.getPaperInfo(),
                                                paperInfo.getPaperSize(),
                                                paperInfo.getOrientation()));

            cGlobals.createStandardSections(this.report, tR);

            // mouse events
            //
            this.picReport.setMouseDownEventListner(P.call(this, this.picReportMouseDown));
            this.picReport.setMouseUpEventListner(P.call(this, this.picReportMouseUp));
            this.picReport.setMouseEventListner(P.call(this, this.picReportMouseMove));

            return this.reLoadReport();
        }

        private updateFormulas(currentName: string, newName: string) {
            let rptCtrl: cReportControl = null;

            for(let i = 0; i < this.report.getControls().count(); i++) {

                rptCtrl = this.report.getControls().item(i);

                let formulaHide: cReportFormula = rptCtrl.getFormulaHide();
                if(formulaHide.getText() !== "") {
                    if(formulaHide.getText().indexOf(currentName, 1) !== 0) {
                        formulaHide.setText(CSReportEditor.cEditor.replaceInFormula(formulaHide.getText(), currentName, newName));
                    }
                }

                let formulaValue: cReportFormula = rptCtrl.getFormulaValue();
                if(formulaValue.getText() !== "") {
                    if(formulaValue.getText().indexOf(currentName, 1) !== 0) {
                        formulaValue.setText(CSReportEditor.cEditor.replaceInFormula(formulaValue.getText(), currentName, newName));
                    }
                }
            }
        }

        private static replaceInFormula(formulaText: string, currentName: string, newName: string) {
            let rtn: string;

            // if it isn't an internal function we give the user
            // a chance to cancel the changes
            //
            if(formulaText.substring(0, 1).trim() !== "_") {
                const fReplace = new FFormulaReplace();
                fReplace.getTxCurrFormula().setText(formulaText);
                fReplace.getTxNewFormula().setText(formulaText.replace(currentName, newName));
                fReplace.showDialog();
                if(fReplace.getOk()) {
                    rtn = fReplace.getTxNewFormula().getText();
                }
                else {
                    rtn = formulaText;
                }
                fReplace.hide();
            }
            else {

                rtn = formulaText.replace(currentName, newName);
            }
            return rtn;
        }

        public editConnectionString() {
            let stringConnection = new RefWrapper(this.report.getConnect().getStrConnect());
            return Utils.getInput(stringConnection, "You can modify the string connection of this report", "String connection").then(()=> {
                this.report.getConnect().setStrConnect(stringConnection.get());
            });
        }

        public editDataSource() {
            let dataSource = new RefWrapper(this.report.getConnect().getDataSource());
            return Utils.getInput(dataSource, "You can modify the data source of this report", "Data Source").then(()=> {
                this.report.getConnect().setDataSource(dataSource.get());
            });
        }
    }

    enum Keys {
        F11,
        F12,
        F9,
        F8,
        F2,
        F4,
        Delete,
        Escape,
        Up,
        Down,
        Left,
        Right,
        C,
        V
    }
}
