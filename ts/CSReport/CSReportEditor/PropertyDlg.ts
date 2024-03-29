///<reference path="../../CSDrawing/Bitmap.ts"/>
///<reference path="../../CSForms/controls/Label.ts"/>
///<reference path="../../CSForms/controls/TextBox.ts"/>
///<reference path="../../CSForms/controls/CheckBox.ts"/>
///<reference path="../../CSForms/controls/Button.ts"/>
///<reference path="../../CSForms/controls/OptionButton.ts"/>
///<reference path="../../CSForms/controls/ComboBox.ts"/>
///<reference path="../../CSForms/controls/PictureBox.ts"/>

namespace CSReportEditor {

    import U = CSOAPI.Utils;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import P = CSKernelClient.Callable;
    import Color = CSDrawing.Color;

    import Label = CSForms.Label;
    import TextBox = CSForms.TextBox;
    import CheckBox = CSForms.CheckBox;
    import Button = CSForms.Button;
    import OptionButton = CSForms.OptionButton;
    import ComboBox = CSForms.ComboBox;
    import PictureBox = CSForms.PictureBox;

    export class PropertyDlg {
        // fields
        //#region
        private editor: cEditor;

        private index: number = 0;
        private fieldType: number = 0;

        private formulaHide: string = "";
        private formulaValue: string = "";
        private sectionFormulaHide: string = "";
        private sectionLineFormulaHide: string = "";

        private formulaName: string = "";

        private isAccounting: boolean = null;

        private textChanged: boolean = null;
        private tagChanged: boolean = null;
        private fontChanged: boolean = null;
        private foreColorChanged: boolean = null;
        private backColorChanged: boolean = null;
        private formatChanged: boolean = null;
        private leftChanged: boolean = null;
        private topChanged: boolean = null;
        private heightChanged: boolean = null;
        private widthChanged: boolean = null;
        private symbolChanged: boolean = null;
        private transparentChanged: boolean = null;
        private strikeChanged: boolean = null;
        private underlineChanged: boolean = null;
        private wordWrapChanged: boolean = null;
        private italicChanged: boolean = null;
        private boldChanged: boolean = null;
        private alignChanged: boolean = null;
        private fontSizeChanged: boolean = null;
        private canGrowChanged: boolean = null;
        private formulaHideChanged: boolean = null;
        private formulaValueChanged: boolean = null;
        private bSetFormulaHideChanged: boolean = null;
        private bSetFormulaValueChanged: boolean = null;
        private idxGroupChanged: boolean = null;
        private whenEvalChanged: boolean = null;
        private dbFieldChanged: boolean = null;
        private pictureChanged: boolean = null;
        private borderTypeChanged: boolean = null;
        private border3DChanged: boolean = null;
        private border3DShadowChanged: boolean = null;
        private borderRoundedChanged: boolean = null;
        private borderWidthChanged: boolean = null;
        private borderColorChanged: boolean = null;

        private chartFieldVal1Changed: boolean = null;
        private chartFieldVal2Changed: boolean = null;
        private chartFieldLbl1Changed: boolean = null;
        private chartFieldLbl2Changed: boolean = null;
        private chartSizeChanged: boolean = null;
        private chartThicknessChanged: boolean = null;
        private chartColorSerie1Changed: boolean = null;
        private chartColorSerie2Changed: boolean = null;
        private chartFormatTypeChanged: boolean = null;
        private chartLinesTypeChanged: boolean = null;
        private chartTypeChanged: boolean = null;
        private chartShowLinesChanged: boolean = null;
        private chartShowValuesChanged: boolean = null;
        private chartTopChanged: boolean = null;
        private chartSortChanged: boolean = null;

        private chartFieldGroupChanged: boolean = null;
        private chartGroupValueChanged: boolean = null;

        private isFreeCtrlChanged: boolean = null;
        private exportColIdxChanged: boolean = null;

        private chartIndex: number[] = null;
        private chartFieldType: number[] = null;

        private chartGroupIndex: number = 0;
        private chartGroupFieldType: number = 0;

        //#endregion

        // fields - ctrls
        //#region
        private lbControl: Label;
        private txName: TextBox;
        private txText: TextBox;
        private txTag: TextBox;
        private cbFont: ComboBox;
        private txFontSize: TextBox;
        private cbAlign: ComboBox;
        private chkFontBold: CheckBox;
        private chkFontUnderline: CheckBox;
        private chkFontItalic: CheckBox;
        private chkFontStrike: CheckBox;
        private txForeColor: TextBox;
        private shForeColor: Label;
        private chkTransparent: CheckBox;
        private txBackColor: TextBox;
        private shBackColor: Label;
        private txSymbol: TextBox;
        private txFormat: TextBox;
        private txLeft: TextBox;
        private txTop: TextBox;
        private txWidth: TextBox;
        private txHeight: TextBox;
        private chkCanGrow: CheckBox;
        private chkWordWrap: CheckBox;
        private chkIsFreeCtrl: CheckBox;
        private txExportColIdx: TextBox;

        private chkFormulaHide: CheckBox;
        private lbFormulaHide: Label;
        private cmdFormulaHide: Button;
        private chkFormulaValue: CheckBox;
        private lbFormulaValue: Label;
        private cmdFormulaValue: Button;
        private txIdxGroup: TextBox;
        private opBeforePrint: OptionButton;
        private opAfterPrint: OptionButton;

        private txImageFile: TextBox;
        private picImage: PictureBox;
        private txDbField: TextBox;

        private cbBorderType: ComboBox;
        private txBorderColor: TextBox;
        private shBorderColor: Label;
        private txBorder3D: TextBox;
        private shBorder3D: Label;
        private txBorderShadow: TextBox;
        private shBorderShadow: Label;
        private txBorderWidth: TextBox;
        private chkBorderRounded: CheckBox;

        // sections
        private chkSectionFormulaHide: CheckBox;
        private chkSectionLineFormulaHide: CheckBox;
        private lbSectionFormulaHide: Label;
        private lbSectionLineFormulaHide: Label;
        private cmdSectionFormulaHide: Button;
        private cmdSectionLineFormulaHide: Button;
        private sectionFormulaHideChanged: boolean = null;
        private sectionLineFormulaHideChanged: boolean = null;
        private txSectionName: TextBox;
        private lbSectionLineName: Label;

        private bSetSectionFormulaHideChanged: boolean = null;
        private bSetSectionLineFormulaHideChanged: boolean = null;

        // groups
        private txGroupName: TextBox;
        private txGroupDbField: TextBox;
        private opAsc: OptionButton;
        private opDesc: OptionButton;
        private opDate: OptionButton;
        private opNumber: OptionButton;
        private opText: OptionButton;
        private chkPrintInNewPage: CheckBox;
        private chkReprintGroup: CheckBox;
        private chkGrandTotal: CheckBox;

        private formulaDlg = new FFormula();

        // tabs

        private tabFormat: HTMLElement;
        private tabBorders: HTMLElement;
        private tabFormulas: HTMLElement;
        private tabField: HTMLElement;
        private tabImage: HTMLElement;
        private tabChart: HTMLElement;
        private tabSection: HTMLElement;
        private tabGroup: HTMLElement;

        private currentTab: string = null;

        private static CTRL_TABS = [
            "property-format-tab",
            "property-formulas-tab",
            "property-borders-tab",
            "property-database-tab",
            "property-image-tab",
            "property-chart-tab"
        ];

        private static SECTION_TABS = [
            "property-section-tab",
            "property-group-tab"
        ];

        // footer buttons

        private cmdApply: Button;

        //#endregion

        public constructor() {
            // controls
            this.lbControl = new Label(U.labelEl('ctrl-lb-name'));
            this.txName = new TextBox(U.inputEl('ctrl-name'));
            this.txText = new TextBox(U.inputEl('ctrl-text'));
            this.txTag = new TextBox(U.inputEl('ctrl-tag'));
            this.cbFont = new ComboBox(U.selectEl('ctrl-font'));
            this.txFontSize = new TextBox(U.inputEl('ctrl-font-size'));
            this.cbAlign = new ComboBox(U.selectEl('ctrl-align'));
            this.chkFontBold = new CheckBox(U.inputEl('ctrl-bold'));
            this.chkFontUnderline = new CheckBox(U.inputEl('ctrl-underline'));
            this.chkFontItalic = new CheckBox(U.inputEl('ctrl-italic'));
            this.chkFontStrike = new CheckBox(U.inputEl('ctrl-strike'));
            this.txForeColor = new TextBox(U.inputEl('ctrl-text-color'));
            this.shForeColor = new Label(U.labelEl('ctrl-text-color-sample'));
            this.chkTransparent = new CheckBox(U.inputEl('ctrl-transparent'));
            this.txBackColor = new TextBox(U.inputEl('ctrl-back-color'));
            this.shBackColor = new Label(U.labelEl('ctrl-back-color-sample'));
            this.txSymbol = new TextBox(U.inputEl('ctrl-symbol'));
            this.txFormat = new TextBox(U.inputEl('ctrl-format'));
            this.txLeft = new TextBox(U.inputEl('ctrl-left'));
            this.txTop = new TextBox(U.inputEl('ctrl-top'));
            this.txWidth = new TextBox(U.inputEl('ctrl-width'));
            this.txHeight = new TextBox(U.inputEl('ctrl-height'));
            this.chkCanGrow = new CheckBox(U.inputEl('ctrl-can-grow'));
            this.chkWordWrap = new CheckBox(U.inputEl('ctrl-wrap-text'));
            this.chkIsFreeCtrl = new CheckBox(U.inputEl('ctrl-is-in-background'));
            this.txExportColIdx = new TextBox(U.inputEl('ctrl-export-id'));
            this.chkFormulaHide = new CheckBox(U.inputEl('ctrl-has-visible-formula'));
            this.lbFormulaHide = new Label(U.labelEl('ctrl-visible-formula'));
            this.cmdFormulaHide = new Button(U.el('ctrl-hide-formula-edit'));
            this.chkFormulaValue = new CheckBox(U.inputEl('ctrl-has-value-formula'));
            this.lbFormulaValue = new Label(U.labelEl('ctrl-value-formula'));
            this.cmdFormulaValue = new Button(U.el('ctrl-value-formula-edit'));
            this.txIdxGroup = new TextBox(U.inputEl('ctrl-formula-group'));
            this.opBeforePrint = new OptionButton(U.inputEl('ctrl-formula-run-before'));
            this.opAfterPrint = new OptionButton(U.inputEl('ctrl-formula-run-after'));
            this.txImageFile = new TextBox(U.inputEl('ctrl-image-file'));
            this.picImage = new PictureBox("ctrl-image-preview", U.el('ctrl-image-preview'));
            this.txDbField = new TextBox(U.inputEl('ctrl-db-field'));
            this.cbBorderType = new ComboBox(U.selectEl('ctl-border-type'));
            this.txBorderColor = new TextBox(U.inputEl('ctrl-border-color'));
            this.shBorderColor = new Label(U.labelEl('ctrl-border-color-sample'));
            this.txBorder3D = new TextBox(U.inputEl('ctrl-border-color-3d'));
            this.shBorder3D = new Label(U.labelEl('ctrl-border-color-3d-sample'));
            this.txBorderShadow = new TextBox(U.inputEl('ctrl-border-color-shadow'));
            this.shBorderShadow = new Label(U.labelEl('ctrl-border-color-shadow-sample'));
            this.txBorderWidth = new TextBox(U.inputEl('ctrl-border-width'));
            this.chkBorderRounded = new CheckBox(U.inputEl('ctrl-border-rounded'));

            // sections
            this.txSectionName = new TextBox(U.inputEl('section-name'));
            this.lbSectionLineName = new Label(U.labelEl('section-line-name'));
            this.chkSectionFormulaHide = new CheckBox(U.inputEl('section-has-visible-formula'));
            this.chkSectionFormulaHide.setOnClick(P.call(this, this.chkSectionFormulaHideClick));
            this.chkSectionLineFormulaHide = new CheckBox(U.inputEl('section-line-has-visible-formula'));
            this.lbSectionFormulaHide = new Label(U.labelEl('section-visible-formula'));
            this.lbSectionLineFormulaHide = new Label(U.labelEl('section-line-visible-formula'));
            this.cmdSectionFormulaHide = new Button(U.el('ctrl-section-hide-formula-edit'));
            this.cmdSectionLineFormulaHide = new Button(U.el('ctrl-section-line-hide-formula-edit'));

            // groups
            this.txGroupName = new TextBox(U.inputEl('group-name'));
            this.txGroupDbField = new TextBox(U.inputEl('ctrl-group-db-field'));
            this.opAsc = new OptionButton(U.inputEl('ctrl-group-sort-asc'));
            this.opDesc = new OptionButton(U.inputEl('ctrl-group-sort-desc'));
            this.opText = new OptionButton(U.inputEl('ctrl-group-comparison-text'));
            this.opDate = new OptionButton(U.inputEl('ctrl-group-comparison-date'));
            this.opNumber = new OptionButton(U.inputEl('ctrl-group-comparison-number'));
            this.chkGrandTotal = new CheckBox(U.inputEl('ctrl-group-grand-total'));
            this.chkReprintGroup = new CheckBox(U.inputEl('ctrl-group-header-in-every-page'));
            this.chkPrintInNewPage = new CheckBox(U.inputEl('ctrl-group-in-new-page'));

            // events
            this.chkSectionLineFormulaHide.setOnClick(P.call(this, this.chkSectionLineFormulaHideClick));
            this.chkFormulaHide.setOnClick(P.call(this, this.chkFormulaHideClick));
            this.chkFormulaValue.setOnClick(P.call(this, this.chkFormulaValueClick));

            this.opBeforePrint.setOnClick(P.call(this, this.opAfterPrintClick));
            this.opAfterPrint.setOnClick(P.call(this, this.opBeforePrintClick));

            this.txText.setChange(P.call(this, this.txTextChanged));
            this.txTag.setChange(P.call(this, this.txTagChanged));
            this.cbFont.setOnClick(P.call(this, this.cbFontClick));
            this.cbAlign.setOnClick(P.call(this, this.cbAlignClick));
            this.cbBorderType.setOnClick(P.call(this, this.cbBorderTypeClick));
            this.chkBorderRounded.setOnClick(P.call(this, this.chkBorderRoundedClick));

            this.txFontSize.setChange(P.call(this, this.txFontSizeChanged));
            this.txFormat.setChange(P.call(this, this.txFormatChanged));
            this.txSymbol.setChange(P.call(this, this.txSymbolChanged));
            this.chkFontBold.setChange(P.call(this, this.chkFontBoldChanged));
            this.chkFontUnderline.setChange(P.call(this, this.chkFontUnderlineChanged));
            this.chkFontItalic.setChange(P.call(this, this.chkFontItalicChanged));
            this.chkFontStrike.setChange(P.call(this, this.chkFontStrikeChanged));
            this.txLeft.setChange(P.call(this, this.txLeftChanged));
            this.txTop.setChange(P.call(this, this.txTopChanged));
            this.txHeight.setChange(P.call(this, this.txHeightChanged));
            this.txWidth.setChange(P.call(this, this.txWidthChanged));
            this.chkCanGrow.setChange(P.call(this, this.chkCanGrowCheckedChanged));
            this.chkWordWrap.setChange(P.call(this, this.chkWordWrapCheckedChanged));
            this.chkIsFreeCtrl.setChange(P.call(this, this.chkIsFreeCtrlCheckedChanged));
            this.txExportColIdx.setChange(P.call(this, this.txExportColIdxTextChanged));

            this.txForeColor.setChange(P.call(this, this.txForeColorChanged));
            this.txBackColor.setChange(P.call(this, this.txBackColorChanged));
            this.chkTransparent.setChange(P.call(this, this.chkTransparentChanged));
            this.txBorderColor.setChange(P.call(this, this.txBorderColorChanged));
            this.txBorder3D.setChange(P.call(this, this.txBorder3DChanged));
            this.txBorderShadow.setChange(P.call(this, this.txBorderShadowChanged));
            this.txBorderWidth.setChange(P.call(this, this.txBorderWidthChanged));

            this.txForeColor.setLostFocus(P.call(this, this.txForeColorLostFocus));
            this.txBackColor.setLostFocus(P.call(this, this.txBackColorLostFocus));
            this.txBorderColor.setLostFocus(P.call(this, this.txBorderColorLostFocus));
            this.txBorder3D.setLostFocus(P.call(this, this.txBorder3DLostFocus));
            this.txBorderShadow.setLostFocus(P.call(this, this.txBorderShadowLostFocus));

            //this.txChartGroupValue.setChange(P.call(this, this.txChartGroupValueChanged));
            //this.txCharttxChartTop.setChange(P.call(this, this.txChartTopChanged));

            /* TODO: probably this will be removed
            this.cbTypeSelectedIndexChanged
            this.cbFormatTypeSelectedIndexChanged
            this.cbLinesTypeSelectedIndexChanged
            this.cbChartSizeSelectedIndexChanged
            this.txChartTopTextChanged
            this.cbChartThicknessSelectedIndexChanged
            this.chkShowBarValuesCheckedChanged
            this.chkShowOutlinesCheckedChanged
            this.chkSortCheckedChanged
            this.txDbFieldGroupValueTextChanged
            this.txDbFieldVal1TextChanged
            this.txDbFieldLbl1TextChanged
            this.cbColorSerie1SelectedIndexChanged
            this.txDbFieldVal2TextChanged
            this.txDbFieldLbl2TextChanged
            this.cbColorSerie2SelectedIndexChanged
            */

            this.tabFormat = U.el('property-format-tab-selector');
            this.tabBorders = U.el('property-borders-tab-selector');
            this.tabFormulas = U.el('property-formulas-tab-selector');
            this.tabImage = U.el('property-image-tab-selector');
            this.tabField = U.el('property-database-tab-selector');
            this.tabChart = U.el('property-chart-tab-selector');
            this.tabSection = U.el('property-section-tab-selector');
            this.tabGroup = U.el('property-group-tab-selector');

            this.hideTabField();
            this.hideTabImage();
            this.hideTabChart();
            this.hideTabSection();

            this.cmdFormulaHide.setOnClick(P.call(this, this.editFormulaHideClick));
            this.cmdFormulaValue.setOnClick(P.call(this, this.editFormulaValueClick));

            this.cmdSectionFormulaHide.setOnClick(P.call(this, this.editSectionFormulaHideClick));
            this.cmdSectionLineFormulaHide.setOnClick(P.call(this, this.editSectionLineFormulaHideClick));

            // TODO: implement chart
            // initChart();

            this.cmdApply = new Button(U.el('ctrl-properties-dlg-apply'));
            this.cmdApply.setOnClick(P.call(this, this.cmdApplyClick));
        }

        private cmdApplyClick() {
            this.editor.applyProperties();
        }

        // formula edit click handlers
        //#region
        private editFormulaHideClick() {
            this.formulaName = "Hide";

            this.formulaDlg.setFormula(this.formulaHide);
            this.formulaDlg.setHandler(this.editor);
            this.formulaDlg.createTree();
            this.formulaDlg.expandTree();

            return this.formulaDlg.showModal().then(P.call(this, (result) => {
                if(result) {
                    this.formulaHide = this.formulaDlg.getFormula();
                    this.formulaHideChanged = true;
                    this.lbFormulaHide.setText(this.formulaHide);
                }
            }));
        }

        private editFormulaValueClick() {
            this.formulaName = "Value";

            this.formulaDlg.setFormula(this.formulaValue);
            this.formulaDlg.setHandler(this.editor);
            this.formulaDlg.createTree();
            this.formulaDlg.expandTree();

            return this.formulaDlg.showModal().then(P.call(this, (result) => {
                if(result) {
                    this.formulaValue = this.formulaDlg.getFormula();
                    this.formulaValueChanged = true;
                    this.lbFormulaValue.setText(this.formulaValue);
                }
            }));
        }

        private editSectionFormulaHideClick() {
            this.formulaName = "Hide";

            this.formulaDlg.setFormula(this.sectionFormulaHide);
            this.formulaDlg.setHandler(this.editor);
            this.formulaDlg.createTree();
            this.formulaDlg.expandTree();

            return this.formulaDlg.showModal().then(P.call(this, (result) => {
                if(result) {
                    this.sectionFormulaHide = this.formulaDlg.getFormula();
                    this.sectionFormulaHideChanged = true;
                    this.lbSectionFormulaHide.setText(this.sectionFormulaHide);
                }
            }));
        }

        private editSectionLineFormulaHideClick() {
            this.formulaName = "Hide";

            this.formulaDlg.setFormula(this.sectionLineFormulaHide);
            this.formulaDlg.setHandler(this.editor);
            this.formulaDlg.createTree();
            this.formulaDlg.expandTree();

            return this.formulaDlg.showModal().then(P.call(this, (result) => {
                if(result) {
                    this.sectionLineFormulaHide = this.formulaDlg.getFormula();
                    this.sectionLineFormulaHideChanged = true;
                    this.lbSectionLineFormulaHide.setText(this.sectionLineFormulaHide);
                }
            }));
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }
        //#endregion

        // properties
        //#region

        public getIndex() {
            return this.index;
        }
        public setIndex(rhs: number) {
            this.index = rhs;
        }

        public getFieldType() {
            return this.fieldType;
        }
        public setFieldType(rhs: number) {
            this.fieldType = rhs;
        }

        public getFormulaHide() {
            return this.formulaHide;
        }

        public setFormulaHide(formula: string) {
            this.formulaHide = formula;
            this.lbFormulaHide.setText(formula);
        }

        public getFormulaValue() {
            return this.formulaValue;
        }

        public setFormulaValue(formula: string) {
            this.formulaValue = formula;
            this.lbFormulaValue.setText(formula);
        }

        public getFormulaName() {
            return this.formulaName;
        }

        public setFormulaName(rhs: string) {
            this.formulaName = rhs;
        }

        public getIsAccounting() {
            return this.isAccounting;
        }

        public setIsAccounting(rhs: boolean) {
            this.isAccounting = rhs;
        }

        public getSectionFormulaHide() {
            return this.sectionFormulaHide;
        }

        public setSectionFormulaHide(formula: string) {
            this.sectionFormulaHide = formula;
            this.lbSectionFormulaHide.setText(formula);
        }

        public getSectionLineFormulaHide() {
            return this.sectionLineFormulaHide;
        }

        public setSectionLineFormulaHide(formula: string) {
            this.sectionLineFormulaHide = formula;
            this.lbSectionLineFormulaHide.setText(formula);
        }

        //#endregion

        // has changed getters and setters
        //#region

        public getTextChanged() {
            return this.textChanged;
        }

        public setTextChanged(rhs: boolean) {
            this.textChanged = rhs;
        }

        public getTagChanged() {
            return this.tagChanged;
        }

        public setTagChanged(rhs: boolean) {
            this.tagChanged = rhs;
        }

        public getFontChanged() {
            return this.fontChanged;
        }

        public setFontChanged(rhs: boolean) {
            this.fontChanged = rhs;
        }

        public getForeColorChanged() {
            return this.foreColorChanged;
        }

        public setForeColorChanged(rhs: boolean) {
            this.foreColorChanged = rhs;
        }

        public getBackColorChanged() {
            return this.backColorChanged;
        }

        public setBackColorChanged(rhs: boolean) {
            this.backColorChanged = rhs;
        }

        public getFormatChanged() {
            return this.formatChanged;
        }

        public setFormatChanged(rhs: boolean) {
            this.formatChanged = rhs;
        }

        public getLeftChanged() {
            return this.leftChanged;
        }

        public setLeftChanged(rhs: boolean) {
            this.leftChanged = rhs;
        }

        public getTopChanged() {
            return this.topChanged;
        }

        public setTopChanged(rhs: boolean) {
            this.topChanged = rhs;
        }

        public getHeightChanged() {
            return this.heightChanged;
        }

        public setHeightChanged(rhs: boolean) {
            this.heightChanged = rhs;
        }

        public getWidthChanged() {
            return this.widthChanged;
        }

        public setWidthChanged(rhs: boolean) {
            this.widthChanged = rhs;
        }

        public getSymbolChanged() {
            return this.symbolChanged;
        }

        public setSymbolChanged(rhs: boolean) {
            this.symbolChanged = rhs;
        }

        public getTransparentChanged() {
            return this.transparentChanged;
        }

        public setTransparentChanged(rhs: boolean) {
            this.transparentChanged = rhs;
        }

        public getStrikeChanged() {
            return this.strikeChanged;
        }

        public setStrikeChanged(rhs: boolean) {
            this.strikeChanged = rhs;
        }

        public getUnderlineChanged() {
            return this.underlineChanged;
        }

        public setUnderlineChanged(rhs: boolean) {
            this.underlineChanged = rhs;
        }

        public getWordWrapChanged() {
            return this.wordWrapChanged;
        }

        public setWordWrapChanged(rhs: boolean) {
            this.wordWrapChanged = rhs;
        }

        public getItalicChanged() {
            return this.italicChanged;
        }

        public setItalicChanged(rhs: boolean) {
            this.italicChanged = rhs;
        }

        public getBoldChanged() {
            return this.boldChanged;
        }

        public setBoldChanged(rhs: boolean) {
            this.boldChanged = rhs;
        }

        public getAlignChanged() {
            return this.alignChanged;
        }

        public setAlignChanged(rhs: boolean) {
            this.alignChanged = rhs;
        }

        public getFontSizeChanged() {
            return this.fontSizeChanged;
        }

        public setFontSizeChanged(rhs: boolean) {
            this.fontSizeChanged = rhs;
        }

        public getCanGrowChanged() {
            return this.canGrowChanged;
        }

        public setCanGrowChanged(rhs: boolean) {
            this.canGrowChanged = rhs;
        }

        public getFormulaHideChanged() {
            return this.formulaHideChanged;
        }

        public setFormulaHideChanged(rhs: boolean) {
            this.formulaHideChanged = rhs;
        }

        public getFormulaValueChanged() {
            return this.formulaValueChanged;
        }

        public setFormulaValueChanged(rhs: boolean) {
            this.formulaValueChanged = rhs;
        }

        public getWhenEvalChanged() {
            return this.whenEvalChanged;
        }

        public setWhenEvalChanged(rhs: boolean) {
            this.whenEvalChanged = rhs;
        }

        public getIdxGroupChanged() {
            return this.idxGroupChanged;
        }

        public setIdxGroupChanged(rhs: boolean) {
            this.idxGroupChanged = rhs;
        }

        public getDbFieldChanged() {
            return this.dbFieldChanged;
        }

        public setDbFieldChanged(rhs: boolean) {
            this.dbFieldChanged = rhs;
        }

        public getSetFormulaHideChanged() {
            return this.bSetFormulaHideChanged;
        }

        public setSetFormulaHideChanged(rhs: boolean) {
            this.bSetFormulaHideChanged = rhs;
        }

        public getSetFormulaValueChanged() {
            return this.bSetFormulaValueChanged;
        }

        public setSetFormulaValueChanged(rhs: boolean) {
            this.bSetFormulaValueChanged = rhs;
        }

        public getBorderTypeChanged() {
            return this.borderTypeChanged;
        }

        public setBorderTypeChanged(rhs: boolean) {
            this.borderTypeChanged = rhs;
        }

        public getBorder3DChanged() {
            return this.border3DChanged;
        }

        public setBorder3DChanged(rhs: boolean) {
            this.border3DChanged = rhs;
        }

        public getBorder3DShadowChanged() {
            return this.border3DShadowChanged;
        }

        public setBorder3DShadowChanged(rhs: boolean) {
            this.border3DShadowChanged = rhs;
        }

        public getBorderRoundedChanged() {
            return this.borderRoundedChanged;
        }

        public setBorderRoundedChanged(rhs: boolean) {
            this.borderRoundedChanged = rhs;
        }

        public getBorderWidthChanged() {
            return this.borderWidthChanged;
        }

        public setBorderWidthChanged(rhs: boolean) {
            this.borderWidthChanged = rhs;
        }

        public getBorderColorChanged() {
            return this.borderColorChanged;
        }

        public setBorderColorChanged(rhs: boolean) {
            this.borderColorChanged = rhs;
        }

        public getPictureChanged() {
            return this.pictureChanged;
        }

        public setPictureChanged(rhs: boolean) {
            this.pictureChanged = rhs;
        }

        public getIsFreeCtrlChanged() {
            return this.isFreeCtrlChanged;
        }

        public setIsFreeCtrlChanged(rhs: boolean) {
            this.isFreeCtrlChanged = rhs;
        }

        public getExportColIdxChanged() {
            return this.exportColIdxChanged;
        }

        public setExportColIdxChanged(rhs: boolean) {
            this.exportColIdxChanged = rhs;
        }
        //#endregion

        // chart getters and setters
        //#region

        public getChartGroupIndex() {
            return this.chartGroupIndex;
        }

        public getChartIndex(idx: number) {
            return this.chartIndex[idx];
        }

        public getChartFieldType(idx: number) {
            return this.chartFieldType[idx];
        }

        public getChartGroupFieldType() {
            return this.chartGroupFieldType;
        }

        public setChartGroupIndex(rhs: number) {
            this.chartGroupIndex = rhs;
        }

        public setChartIndex(idx: number, rhs: number) {
            this.chartIndex[idx] = rhs;
        }

        public setChartGroupFieldType(rhs: number) {
            this.chartGroupFieldType = rhs;
        }

        public setChartFieldType(idx: number, rhs: number) {
            this.chartFieldType[idx] = rhs;
        }

        // char has changed getters and setters

        public getChartFieldVal1Changed() {
            return this.chartFieldVal1Changed;
        }

        public setChartFieldVal1Changed(rhs: boolean) {
            this.chartFieldVal1Changed = rhs;
        }

        public getChartFieldVal2Changed() {
            return this.chartFieldVal2Changed;
        }

        public setChartFieldVal2Changed(rhs: boolean) {
            this.chartFieldVal2Changed = rhs;
        }

        public getChartFieldLbl1Changed() {
            return this.chartFieldLbl1Changed;
        }

        public setChartFieldLbl1Changed(rhs: boolean) {
            this.chartFieldLbl1Changed = rhs;
        }

        public getChartFieldGroupChanged() {
            return this.chartFieldGroupChanged;
        }

        public setChartFieldGroupChanged(rhs: boolean) {
            this.chartFieldGroupChanged = rhs;
        }

        public getChartGroupValueChanged() {
            return this.chartGroupValueChanged;
        }

        public setChartGroupValueChanged(rhs: boolean) {
            this.chartGroupValueChanged = rhs;
        }

        public getChartFieldLbl2Changed() {
            return this.chartFieldLbl2Changed;
        }

        public setChartFieldLbl2Changed(rhs: boolean) {
            this.chartFieldLbl2Changed = rhs;
        }

        public getChartSizeChanged() {
            return this.chartSizeChanged;
        }

        public setChartSizeChanged(rhs: boolean) {
            this.chartSizeChanged = rhs;
        }

        public getChartThicknessChanged() {
            return this.chartThicknessChanged;
        }

        public setChartThicknessChanged(rhs: boolean) {
            this.chartThicknessChanged = rhs;
        }

        public getChartColorSerie1Changed() {
            return this.chartColorSerie1Changed;
        }

        public setChartColorSerie1Changed(rhs: boolean) {
            this.chartColorSerie1Changed = rhs;
        }

        public getChartColorSerie2Changed() {
            return this.chartColorSerie2Changed;
        }

        public setChartColorSerie2Changed(rhs: boolean) {
            this.chartColorSerie2Changed = rhs;
        }

        public getChartFormatTypeChanged() {
            return this.chartFormatTypeChanged;
        }

        public setChartFormatTypeChanged(rhs: boolean) {
            this.chartFormatTypeChanged = rhs;
        }

        public getChartLinesTypeChanged() {
            return this.chartLinesTypeChanged;
        }

        public setChartLinesTypeChanged(rhs: boolean) {
            this.chartLinesTypeChanged = rhs;
        }

        public getChartTypeChanged() {
            return this.chartTypeChanged;
        }

        public setChartTypeChanged(rhs: boolean) {
            this.chartTypeChanged = rhs;
        }

        public getChartShowLinesChanged() {
            return this.chartShowLinesChanged;
        }

        public setChartShowLinesChanged(rhs: boolean) {
            this.chartShowLinesChanged = rhs;
        }

        public getChartShowValuesChanged() {
            return this.chartShowValuesChanged;
        }

        public setChartShowValuesChanged(rhs: boolean) {
            this.chartShowValuesChanged = rhs;
        }

        public getChartTopChanged() {
            return this.chartTopChanged;
        }

        public setChartTopChanged(rhs: boolean) {
            this.chartTopChanged = rhs;
        }

        public getChartSortChanged() {
            return this.chartSortChanged;
        }

        public setChartSortChanged(rhs: boolean) {
            this.chartSortChanged = rhs;
        }

        public getHasSectionFormulaHideChanged() {
            return this.bSetSectionFormulaHideChanged;
        }

        public setHasSectionFormulaHideChanged(rhs: boolean) {
            this.bSetSectionFormulaHideChanged = rhs;
        }

        public getSectionFormulaHideChanged() {
            return this.sectionFormulaHideChanged;
        }

        public setSectionFormulaHideChanged(rhs: boolean) {
            this.sectionFormulaHideChanged = rhs;
        }

        public getHasSectionLineFormulaHideChanged() {
            return this.bSetSectionLineFormulaHideChanged;
        }

        public setHasSectionLineFormulaHideChanged(rhs: boolean) {
            this.bSetSectionLineFormulaHideChanged = rhs;
        }

        public getSectionLineFormulaHideChanged() {
            return this.sectionLineFormulaHideChanged;
        }

        public setSectionLineFormulaHideChanged(rhs: boolean) {
            this.sectionLineFormulaHideChanged = rhs;
        }

        //#endregion

        // change events
        //#region

        private cbFontClick() {
            this.fontChanged = true;
        }

        private cbAlignClick() {
            this.alignChanged = true;
        }

        private cbBorderTypeClick() {
            this.borderTypeChanged = true;
        }

        private chkBorderRoundedClick() {
            this.borderRoundedChanged = true;
        }

        private chkFormulaHideClick() {
            this.bSetFormulaHideChanged = true;
        }

        private chkFormulaValueClick() {
            this.bSetFormulaValueChanged = true;
        }

        private chkSectionFormulaHideClick() {
            this.bSetSectionFormulaHideChanged = true;
        }

        private chkSectionLineFormulaHideClick() {
            this.bSetSectionLineFormulaHideChanged = true;
        }

        private opAfterPrintClick() {
            this.whenEvalChanged = true;
        }

        private opBeforePrintClick() {
            this.whenEvalChanged = true;
        }

        private txForeColorLostFocus() {
            try {
                this.shForeColor.setBackColor(new Color(this.txForeColor.getText()).color.toString());
            }catch(ignore) { }
        }

        private txBackColorLostFocus() {
            try {
                this.shBackColor.setBackColor(new Color(this.txBackColor.getText()).color.toString());
            }catch(ignore) { }

        }

        private txBorder3DLostFocus() {
            try {
                this.shBorder3D.setBackColor(new Color(this.txBorder3D.getText()).color);
            }catch(ignore) { }
        }

        private txBorderColorLostFocus() {
            try {
                this.shBorderColor.setBackColor(new Color(this.txBorderColor.getText()).color);
            }catch(ignore) { }
        }

        private txBorderShadowLostFocus() {
            try {
                this.shBorderShadow.setBackColor(new Color(this.txBorderShadow.getText()).color);
            }catch(ignore) { }
        }

        private cmdDbFieldGroupValueClick() {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartGroupField(cancel);
            };
            if(!cancel) {
              this.chartFieldGroupChanged = true;
            }
             * */
        }

        private cmdDbFieldLbl1Click() {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl1, 2);
            };
            if(!cancel) {
              this.chartFieldLbl1Changed = true;
            }
             * */
        }

        private cmdDbFieldLbl2Click() {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl2, 3);
            };
            if(!cancel) {
              this.chartFieldLbl2Changed = true;
            }
             * */
        }

        private cmdDbFieldVal1Click() {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal1, 0);
            };
            if(!cancel) {
              this.chartFieldVal1Changed = true;
            }
             * */
        }

        private cmdDbFieldVal2Click() {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal2, 1);
            };
            if(!cancel) {
              this.chartFieldVal2Changed = true;
            }
             * */
        }

        private initChart() {
            // cUtil.listAdd(cb_formatType, "BMP", (int)csRptChartFormat.BMP);
            // cUtil.listAdd(cb_formatType, "JPG", (int)csRptChartFormat.JPEG);
            // cUtil.listAdd(cb_formatType, "GIF", (int)csRptChartFormat.GIF);
            // cUtil.listAdd(cb_formatType, "PNG", (int)csRptChartFormat.PNG);
            // cUtil.listSetListIndex(cbFormatType, 0);
            //
            // cUtil.listAdd(cb_type, "Pie", (int)csRptChartType.PIE);
            // cUtil.listAdd(cb_type, "Bar", (int)csRptChartType.BAR);
            // cUtil.listSetListIndex(cb_type, 0);
            //
            // chk_showOutlines.setChecked(true);
            // chk_showBarValues.setChecked(true);
            //
            // pFillColors(cbColorSerie1);
            // cUtil.listSetListIndex(cb_colorSerie1, 10);
            //
            // pFillColors(cbColorSerie2);
            // cUtil.listSetListIndex(cb_colorSerie2, 69);
            //
            // cUtil.listAdd(cb_chartSize, "Smallest", 50);
            // cUtil.listAdd(cb_chartSize, "Smaller", 100);
            // cUtil.listAdd(cb_chartSize, "Small", 150);
            // cUtil.listAdd(cb_chartSize, "Medium", 200);
            // cUtil.listAdd(cb_chartSize, "Large", 250);
            // cUtil.listAdd(cb_chartSize, "Big", 350);
            // cUtil.listSetListIndex(cb_chartSize, 3);
            //
            // cUtil.listAdd(cb_chartThickness, "None", 0);
            // cUtil.listAdd(cb_chartThickness, "Wafer", 2);
            // cUtil.listAdd(cb_chartThickness, "Thin", 4);
            // cUtil.listAdd(cb_chartThickness, "Medium", 8);
            // cUtil.listAdd(cb_chartThickness, "Thick", 16);
            // cUtil.listAdd(cb_chartThickness, "Thickest", 32);
            // cUtil.listSetListIndex(cb_chartThickness, 2);
            //
            // cUtil.listAdd(cb_linesType, "None", (int)csRptChartLineStyle.NONE);
            // cUtil.listAdd(cb_linesType, "Horizontal", (int)csRptChartLineStyle.HORIZONTAL);
            // cUtil.listAdd(cb_linesType, "Numbered", (int)csRptChartLineStyle.NUMBERED);
            // cUtil.listAdd(cb_linesType, "Both", (int)csRptChartLineStyle.BOTH);
            // cUtil.listSetListIndex(cb_linesType, 3);
        }

        private pFillColors(cb_list: ComboBox) {
            // TODO: implement
        }

        private cmdForeColorClick() {
            this.picColor(this.txForeColor, this.shForeColor);
        }

        private cmdBackColorClick() {
            this.picColor(this.txBackColor, this.shBackColor);
        }

        private cmdBorderColorClick() {
            this.picColor(this.txBorderColor, this.shBorderColor);
        }

        private cmdBorder3DClick() {
            this.picColor(this.txBorder3D, this.shBorder3D);
        }

        private cmdBorderShadowClick() {
            this.picColor(this.txBorderShadow, this.shBorderShadow);
        }

        private picColor(txColor: TextBox, shColor: object) {
            // // Show the color dialog.
            // let result: DialogResult = colorDialog.ShowDialog();
            // // See if user pressed ok.
            // if(result === DialogResult.OK) {
            //     // Set form background to the selected color.
            //     txColor.setText(colorDialog.Color.ToArgb().toString());
            //     shColor.setBackColor(colorDialog.Color);
            // }
        }

        private cmdFontClick() {
            //
            // fontDialog.ShowEffects = true;
            //
            // let fontStyle: FontStyle = FontStyle.Regular;
            // if(chkFontBold.Checked) fontStyle = fontStyle | FontStyle.Bold; {
            // if(chkFontItalic.Checked) fontStyle = fontStyle | FontStyle.Italic; {
            // if(chkFontUnderline.Checked) fontStyle = fontStyle | FontStyle.Underline; {
            // if(chkFontStrike.Checked) fontStyle = fontStyle | FontStyle.Strikeout; {
            //
            // let fontSize: number = Utils.val(txFontSize.Text);
            // let font: Font = new Font(txFont.Text, ((fontSize > 0f) ? fontSize : 3f), fontStyle);
            //
            // fontDialog.Font = font;
            // fontDialog.Color = cColor.colorFromRGB(Utils.valInt(txForeColor.Text));
            //
	        // let result: DialogResult = fontDialog.ShowDialog();
            //
            // if(result === DialogResult.OK) {
            //     font = fontDialog.Font;
            //
            //     txFont.setText(font.Name);
            //     chkFontBold.setChecked(font.Bold);
            //     chkFontItalic.setChecked(font.Italic);
            //     chkFontUnderline.setChecked(font.Underline);
            //     chkFontStrike.setChecked(font.Strikeout);
            //     txFontSize.setText(font.Size.toString());
            //     txForeColor.setText(fontDialog.Color.ToArgb().toString());
            //     shForeColor.setBackColor(fontDialog.Color);
            // }
        }

        private cmdDbFieldClick() {
            this.editor.showHelpDbField().then(P.call(this, (result) => {
                if(result)  {
                    this.dbFieldChanged = true;
                }
            }));
        }

        private txChartGroupValueChanged() {
            this.chartGroupValueChanged = true;
        }

        private txChartTopChanged() {
            this.chartTopChanged = true;
        }

        private txTextChanged() {
            this.textChanged = true;
        }

        private txTagChanged() {
            this.tagChanged = true;
        }

        private txFontSizeChanged() {
            this.fontSizeChanged = true;
        }

        private txForeColorChanged() {
            this.foreColorChanged = true;
        }

        private txBackColorChanged() {
            this.backColorChanged = true;
        }

        private chkTransparentChanged() {
            this.transparentChanged = true;
        }

        private txFormatChanged() {
            this.formatChanged = true;
        }

        private txSymbolChanged() {
            this.symbolChanged = true;
        }

        private chkFontBoldChanged() {
            this.boldChanged = true;
        }

        private chkFontUnderlineChanged() {
            this.underlineChanged = true;
        }

        private chkFontItalicChanged() {
            this.italicChanged = true;
        }

        private chkFontStrikeChanged() {
            this.strikeChanged = true;
        }

        private txLeftChanged() {
            this.leftChanged = true;
        }

        private txTopChanged() {
            this.topChanged = true;
        }

        private txHeightChanged() {
            this.heightChanged = true;
        }

        private txWidthChanged() {
            this.widthChanged = true;
        }

        private chkCanGrowCheckedChanged() {
            this.canGrowChanged = true;
        }

        private chkWordWrapCheckedChanged() {
            this.wordWrapChanged = true;
        }

        private chkIsFreeCtrlCheckedChanged() {
            this.isFreeCtrlChanged = true;
        }

        private txExportColIdxTextChanged() {
            this.exportColIdxChanged = true;
        }

        private txBorderColorChanged() {
            this.borderColorChanged = true;
        }

        private txBorder3DChanged() {
            this.border3DChanged = true;
        }

        private txBorderShadowChanged() {
            this.border3DShadowChanged = true;
        }

        private txBorderWidthChanged() {
            this.borderWidthChanged = true;
        }

        private cbTypeSelectedIndexChanged() {
            this.chartTypeChanged = true;
        }

        private cbFormatTypeSelectedIndexChanged() {
            this.chartFormatTypeChanged = true;
        }

        private cbLinesTypeSelectedIndexChanged() {
            this.chartLinesTypeChanged = true;
        }

        private cbChartSizeSelectedIndexChanged() {
            this.chartSizeChanged = true;
        }

        private txChartTopTextChanged() {
            this.chartTopChanged = true;
        }

        private cbChartThicknessSelectedIndexChanged() {
            this.chartThicknessChanged = true;
        }

        private chkShowBarValuesCheckedChanged() {
            this.chartShowValuesChanged = true;
        }

        private chkShowOutlinesCheckedChanged() {
            this.chartShowLinesChanged = true;
        }

        private chkSortCheckedChanged() {
            this.chartSortChanged = true;
        }

        private txDbFieldGroupValueTextChanged() {
            this.chartFieldGroupChanged = true;
        }

        private txDbFieldVal1TextChanged() {
            this.chartFieldVal1Changed = true;
        }

        private txDbFieldLbl1TextChanged() {
            this.chartFieldLbl1Changed = true;
        }

        private cbColorSerie1SelectedIndexChanged() {
            this.chartColorSerie1Changed = true;
        }

        private txDbFieldVal2TextChanged() {
            this.chartFieldVal2Changed = true;
        }

        private txDbFieldLbl2TextChanged() {
            this.chartFieldLbl2Changed = true;
        }

        private cbColorSerie2SelectedIndexChanged() {
            this.chartColorSerie2Changed = true;
        }
        //#endregion

        // initializers
        //#region

        public resetChangedFlags() {
            this.textChanged = false;
            this.tagChanged = false;
            this.fontChanged = false;
            this.foreColorChanged = false;
            this.backColorChanged = false;
            this.formatChanged = false;
            this.leftChanged = false;
            this.topChanged = false;
            this.heightChanged = false;
            this.widthChanged = false;
            this.symbolChanged = false;
            this.transparentChanged = false;
            this.strikeChanged = false;
            this.underlineChanged = false;
            this.wordWrapChanged = false;
            this.italicChanged = false;
            this.boldChanged = false;
            this.alignChanged = false;
            this.fontSizeChanged = false;
            this.canGrowChanged = false;
            this.formulaHideChanged = false;
            this.formulaValueChanged = false;
            this.idxGroupChanged = false;
            this.whenEvalChanged = false;
            this.dbFieldChanged = false;
            this.bSetFormulaHideChanged = false;
            this.bSetFormulaValueChanged = false;
            this.pictureChanged = false;
            this.borderTypeChanged = false;
            this.border3DChanged = false;
            this.border3DShadowChanged = false;
            this.borderRoundedChanged = false;
            this.borderWidthChanged = false;
            this.borderColorChanged = false;

            // TODO: implement chart
            this.chartFieldGroupChanged = false;
            this.chartFieldLbl1Changed = false;
            this.chartFieldLbl2Changed = false;
            this.chartFieldVal1Changed = false;
            this.chartFieldVal2Changed = false;

            this.chartSizeChanged = false;
            this.chartThicknessChanged = false;
            this.chartColorSerie1Changed = false;
            this.chartColorSerie2Changed = false;
            this.chartFormatTypeChanged = false;
            this.chartLinesTypeChanged = false;
            this.chartTypeChanged = false;
            this.chartShowLinesChanged = false;
            this.chartShowValuesChanged = false;
            this.chartTopChanged = false;
            this.chartTopChanged = false;

            this.chartFieldGroupChanged = false;
            this.chartGroupValueChanged = false;

            this.isFreeCtrlChanged = false;
            this.exportColIdxChanged = false;

            this.bSetSectionFormulaHideChanged = false;
            this.bSetSectionLineFormulaHideChanged = false;
        }

        //#endregion

        // tab properties management
        //#region

        public hideTabFormats() {
            this.tabFormat.style.display = 'none';
        }

        public hideTabBorders() {
            this.tabBorders.style.display = 'none';
        }

        public hideTabFormulas() {
            this.tabFormulas.style.display = 'none';
        }

        public hideTabField() {
            this.tabField.style.display = 'none';
        }

        public hideTabImage() {
            this.tabImage.style.display = 'none';
        }

        public hideTabChart() {
            this.tabChart.style.display = 'none';
        }

        public hideTabSection() {
            this.tabSection.style.display = 'none';
        }

        public hideTabGroup() {
            this.tabGroup.style.display = 'none';
        }

        public showTabFormat() {
            this.tabFormat.style.display = 'block';
        }

        public showTabBorders() {
            this.tabBorders.style.display = 'block';
        }

        public showTabFormulas() {
            this.tabFormulas.style.display = 'block';
        }

        public showTabField() {
            this.tabField.style.display = 'block';
        }

        public showTabImage() {
            this.tabImage.style.display = 'block';
        }

        public showTabChart() {
            this.tabChart.style.display = 'block';
        }

        public showTabSection() {
            this.tabSection.style.display = 'block';
        }

        public showTabGroup() {
            this.tabGroup.style.display = 'block';
        }

        displayCtrlPropertyTabs() {
            this.hideTabSection();
            this.hideTabGroup();
            this.showTabFormat();
            this.showTabField();
            this.showTabBorders();
            this.showTabFormulas();
        }

        showCtrlPropertyTabs() {
            if(! this.isCtrlTab(this.currentTab) || ! this.tabIsVisible(this.currentTab)) {
                this.selectTab('property-format-tab');
            }
        }

        private isCtrlTab(tab: string) {
            return PropertyDlg.CTRL_TABS.indexOf(tab) > -1;
        }

        private tabIsVisible(tab: string) {
            if(tab === null) return false;
            return U.el(tab).style.display === 'block';
        }

        showSectionPropertyTabs(isGroup: boolean) {
            this.hideTabChart();
            this.hideTabImage();
            this.hideTabFormats();
            this.hideTabField();
            this.hideTabBorders();
            this.hideTabFormulas();
            this.showTabSection();
            if(isGroup) this.showTabGroup();
            if(! this.isSectionTab(this.currentTab) || ! this.tabIsVisible(this.currentTab)) {
                this.selectTab('property-section-tab');
            }
        }

        private isSectionTab(tab: string) {
            return PropertyDlg.SECTION_TABS.indexOf(tab) > -1;
        }

        disable() {
            this.setEnabled(false);
        }
        enable() {
            this.setEnabled(true);
        }
        setEnabled(enable: boolean) {
            this.lbControl.setEnabled(enable);
            this.txName.setEnabled(enable);
            this.txText.setEnabled(enable);
            this.txTag.setEnabled(enable);
            this.cbFont.setEnabled(enable);
            this.txFontSize.setEnabled(enable);
            this.cbAlign.setEnabled(enable);
            this.chkFontBold.setEnabled(enable);
            this.chkFontUnderline.setEnabled(enable);
            this.chkFontItalic.setEnabled(enable);
            this.chkFontStrike.setEnabled(enable);
            this.txForeColor.setEnabled(enable);
            this.shForeColor.setEnabled(enable);
            this.chkTransparent.setEnabled(enable);
            this.txBackColor.setEnabled(enable);
            this.shBackColor.setEnabled(enable);
            this.txSymbol.setEnabled(enable);
            this.txFormat.setEnabled(enable);
            this.txLeft.setEnabled(enable);
            this.txTop.setEnabled(enable);
            this.txWidth.setEnabled(enable);
            this.txHeight.setEnabled(enable);
            this.chkCanGrow.setEnabled(enable);
            this.chkWordWrap.setEnabled(enable);
            this.chkIsFreeCtrl.setEnabled(enable);
            this.txExportColIdx.setEnabled(enable);

            this.chkFormulaHide.setEnabled(enable);
            this.lbFormulaHide.setEnabled(enable);
            this.cmdFormulaHide.setEnabled(enable);
            this.chkFormulaValue.setEnabled(enable);
            this.lbFormulaValue.setEnabled(enable);
            this.cmdFormulaValue.setEnabled(enable);
            this.txIdxGroup.setEnabled(enable);
            this.opBeforePrint.setEnabled(enable);
            this.opAfterPrint.setEnabled(enable);

            this.txImageFile.setEnabled(enable);
            this.picImage.setEnabled(enable);
            this.txDbField.setEnabled(enable);

            this.cbBorderType.setEnabled(enable);
            this.txBorderColor.setEnabled(enable);
            this.shBorderColor.setEnabled(enable);
            this.txBorder3D.setEnabled(enable);
            this.shBorder3D.setEnabled(enable);
            this.txBorderShadow.setEnabled(enable);
            this.shBorderShadow.setEnabled(enable);
            this.txBorderWidth.setEnabled(enable);
            this.chkBorderRounded.setEnabled(enable);
        }
        //#endregion

        // setters and getters for no control properties
        //#region

        public getDbFieldGroupValue(): string {
			throw new NotImplementedException ();
		}

        public setDbFieldGroupValue(sField: string) {
			throw new NotImplementedException ();
		}
        //#endregion

        // expose controls
        //#region

        getTxName(): TextBox {
            return this.txName;
        }

        getTxText(): TextBox {
            return this.txText;
        }

        getTxTag(): TextBox {
            return this.txTag;
        }

        getCbFont(): ComboBox {
            return this.cbFont;
        }

        getShForeColor(): Label {
            return this.shForeColor;
        }

        getTxForeColor(): TextBox {
            return this.txForeColor;
        }

        getChkFontBold(): CheckBox {
            return this.chkFontBold;
        }

        getChkFontItalic(): CheckBox {
            return this.chkFontItalic;
        }

        getTxFontSize(): TextBox {
            return this.txFontSize;
        }

        getChkFontUnderline(): CheckBox {
            return this.chkFontUnderline;
        }

        getChkFontStrike(): CheckBox {
            return this.chkFontStrike;
        }

        getTxImageFile(): TextBox {
            return this.txImageFile;
        }

        getPicImage(): PictureBox {
            return this.picImage;
        }

        getTxDbField(): TextBox {
            return this.txDbField;
        }

        getLbControl(): Label {
            return this.lbControl;
        }

        getChkFormulaHide(): CheckBox {
            return this.chkFormulaHide;
        }

        getChkFormulaValue(): CheckBox {
            return this.chkFormulaValue;
        }

        getTxExportColIdx(): TextBox {
            return this.txExportColIdx;
        }

        getChkIsFreeCtrl(): CheckBox {
            return this.chkIsFreeCtrl;
        }

        getTxIdxGroup(): TextBox {
            return this.txIdxGroup;
        }

        getOpBeforePrint(): OptionButton {
            return this.opBeforePrint;
        }

        getOpAfterPrint(): OptionButton {
            return this.opAfterPrint;
        }

        getChkCanGrow(): CheckBox {
            return this.chkCanGrow;
        }

        getTxFormat(): TextBox {
            return this.txFormat;
        }

        getTxSymbol(): TextBox {
            return this.txSymbol;
        }

        getChkWordWrap(): CheckBox {
            return this.chkWordWrap;
        }

        getTxBorderColor(): TextBox {
            return this.txBorderColor;
        }
        getShBorderColor(): Label {
            return this.shBorderColor;
        }

        getTxBorder3D(): TextBox {
            return this.txBorder3D;
        }
        getShBorder3D(): Label {
            return this.shBorder3D;
        }

        getTxBorderShadow(): TextBox {
            return this.txBorderShadow;
        }
        getShBorderShadow(): Label {
            return this.shBorderShadow;
        }

        getChkBorderRounded(): CheckBox {
            return this.chkBorderRounded;
        }

        getTxBorderWidth(): TextBox {
            return this.txBorderWidth;
        }

        getCbBorderType(): ComboBox {
            return this.cbBorderType;
        }

        getTxLeft(): TextBox {
            return this.txLeft;
        }

        getTxTop(): TextBox {
            return this.txTop;
        }

        getTxWidth(): TextBox {
            return this.txWidth;
        }

        getTxHeight(): TextBox {
            return this.txHeight;
        }

        getTxBackColor(): TextBox {
            return this.txBackColor;
        }

        getShBackColor(): Label {
            return this.shBackColor;
        }

        getChkTransparent(): CheckBox {
            return this.chkTransparent;
        }

        getCbAlign(): ComboBox {
            return this.cbAlign;
        }
        //#endregion

        // chart properties
        //#region

        getCbType() {
            return undefined;
        }

        getCbFormatType() {
            return undefined;
        }

        getCbChartSize() {
            return undefined;
        }

        getCbChartThickness() {
            return undefined;
        }

        getCbLinesType() {
            return undefined;
        }

        getTxChartTop(): any {

        }

        getTxDbFieldGroupValue(): any {

        }

        getTxChartGroupValue(): any {

        }

        getChkShowOutlines(): any {

        }

        getChkSort(): any {

        }

        getChkShowBarValues(): any {

        }

        getTxDbFieldLbl1(): any {

        }

        getTxDbFieldVal1(): any {

        }

        getCbColorSerie1(): any {
            return undefined;
        }

        getTxDbFieldLbl2(): any {

        }

        getTxDbFieldVal2(): any {

        }

        getCbColorSerie2(): any {
            return undefined;
        }

        //#endregion

        // section properties
        //#region

        getTxSectionName(): TextBox {
            return this.txSectionName;
        }
        getLbSectionLineName(): Label {
            return this.lbSectionLineName;
        }
        getChkSectionFormulaHide(): CheckBox {
            return this.chkSectionFormulaHide;
        }
        getChkSectionLineFormulaHide(): CheckBox {
            return this.chkSectionLineFormulaHide;
        }

        //#endregion

        // group properties
        //#region

        getTxGroupName(): TextBox {
            return this.txGroupName;
        }
        getTxGroupDbField(): TextBox {
            return this.txGroupDbField;
        }
        getOpAsc(): OptionButton {
            return this.opAsc;
        }
        getOpDesc(): OptionButton {
            return this.opDesc;
        }
        getChkPrintInNewPage(): CheckBox {
            return this.chkPrintInNewPage;
        }
        getChkReprintGroup(): CheckBox {
            return this.chkReprintGroup;
        }
        getChkGrandTotal(): CheckBox {
            return this.chkGrandTotal;
        }
        getOpDate(): OptionButton {
            return this.opDate;
        }
        getOpNumber(): OptionButton {
            return this.opNumber;
        }
        getOpText(): OptionButton {
            return this.opText;
        }

        //#endregion

        clear() {
            this.lbControl.setText("");
            this.txName.setText("");
            this.txText.setText("");
            this.txTag.setText("");
            this.cbFont.setText("");
            this.txFontSize.setText("");
            this.cbAlign.setText("");
            this.chkFontBold.setChecked(false);
            this.chkFontUnderline.setChecked(false);
            this.chkFontItalic.setChecked(false);
            this.chkFontStrike.setChecked(false);
            this.txForeColor.setText("");
            this.shForeColor.setBackColor(null);
            this.chkTransparent.setChecked(false);
            this.txBackColor.setText("");
            this.shBackColor.setBackColor(null);
            this.txSymbol.setText("");
            this.txFormat.setText("");
            this.txLeft.setText("");
            this.txTop.setText("");
            this.txWidth.setText("");
            this.txHeight.setText("");
            this.chkCanGrow.setChecked(false);
            this.chkIsFreeCtrl.setChecked(false);
            this.txExportColIdx.setText("");

            this.chkFormulaHide.setChecked(false);
            this.lbFormulaHide.setText("");
            this.chkFormulaValue.setChecked(false);
            this.lbFormulaValue.setText("");
            this.txIdxGroup.setText("");

            this.txImageFile.setText("");
            this.picImage.setImage(null);
            this.txDbField.setText("");

            this.cbBorderType.setText("");
            this.txBorderColor.setText("");
            this.shBorderColor.setBackColor(null);
            this.txBorder3D.setText("");
            this.shBorder3D.setBackColor(null);
            this.txBorderShadow.setText("");
            this.shBorderShadow.setBackColor(null);
            this.txBorderWidth.setText("");
            this.chkBorderRounded.setChecked(false);

            this.txSectionName.setText("");
            this.txGroupName.setText("");
            this.txGroupDbField.setText("");
            this.chkPrintInNewPage.setChecked(false);
            this.chkReprintGroup.setChecked(false);
            this.chkGrandTotal.setChecked(false);
            this.opAsc.setChecked(false);
            this.opDesc.setChecked(false);
            this.opNumber.setChecked(false);
            this.opDate.setChecked(false);
            this.opText.setChecked(false);
        }

        public selectTab(tab: string) {

            this.currentTab = tab;

            U.el('property-format-tab').style.display = tab === 'property-format-tab' ? 'block' : 'none';
            U.el('property-formulas-tab').style.display = tab === 'property-formulas-tab' ? 'block' : 'none';
            U.el('property-database-tab').style.display = tab === 'property-database-tab' ? 'block' : 'none';
            U.el('property-borders-tab').style.display = tab === 'property-borders-tab' ? 'block' : 'none';
            U.el('property-image-tab').style.display = tab === 'property-image-tab' ? 'block' : 'none';
            U.el('property-chart-tab').style.display = tab === 'property-chart-tab' ? 'block' : 'none';
            U.el('property-section-tab').style.display = tab === 'property-section-tab' ? 'block' : 'none';
            U.el('property-group-tab').style.display = tab === 'property-group-tab' ? 'block' : 'none';

            U.el('property-format-tab-selector').style.backgroundColor = tab === 'property-format-tab' ? '#111' : '#494947';
            U.el('property-formulas-tab-selector').style.backgroundColor = tab === 'property-formulas-tab' ? '#111' : '#494947';
            U.el('property-database-tab-selector').style.backgroundColor = tab === 'property-database-tab' ? '#111' : '#494947';
            U.el('property-borders-tab-selector').style.backgroundColor = tab === 'property-borders-tab' ? '#111' : '#494947';
            U.el('property-image-tab-selector').style.backgroundColor = tab === 'property-image-tab' ? '#111' : '#494947';
            U.el('property-chart-tab-selector').style.backgroundColor = tab === 'property-chart-tab' ? '#111' : '#494947';
            U.el('property-section-tab-selector').style.backgroundColor = tab === 'property-section-tab' ? '#111' : '#494947';
            U.el('property-group-tab-selector').style.backgroundColor = tab === 'property-group-tab' ? '#111' : '#494947';
        }
    }
}
