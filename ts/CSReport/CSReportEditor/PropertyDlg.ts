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

    import csRptChartType = CSReportGlobals.csRptChartType;
    import csRptChartLineStyle = CSReportGlobals.csRptChartLineStyle;
    import csRptChartPieThickness = CSReportGlobals.csRptChartPieThickness;
    import csRptChartPieDiameter = CSReportGlobals.csRptChartPieDiameter;

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

        private chartIndex: number[] = [];
        private chartFieldType: number[] = [];

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

        // charts
        private cbType: ComboBox;
        private cbLinesType: ComboBox;
        private cbChartSize: ComboBox;
        private txChartTop: TextBox;
        private cbChartThickness: ComboBox;
        private chkShowBarValues: CheckBox;
        private chkShowOutlines: CheckBox;
        private chkSort: CheckBox;
        private txChartDbFieldGroup: TextBox;
        private txChartGroupValue: TextBox;
        private txChartDbFieldVal1: TextBox;
        private txChartDbFieldLbl1: TextBox;
        private cbColorSerie1: ComboBox;
        private txChartDbFieldVal2: TextBox;
        private txChartDbFieldLbl2: TextBox;
        private cbColorSerie2: ComboBox;

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
            U.el('ctrl-db-field-button').onclick = P.call(this, () => this.selectDbField(this.txDbField.getText(), this.setDbField));
            this.cbBorderType = new ComboBox(U.selectEl('ctl-border-type'));
            this.txBorderColor = new TextBox(U.inputEl('ctrl-border-color'));
            this.shBorderColor = new Label(U.labelEl('ctrl-border-color-sample'));
            this.txBorder3D = new TextBox(U.inputEl('ctrl-border-color-3d'));
            this.shBorder3D = new Label(U.labelEl('ctrl-border-color-3d-sample'));
            this.txBorderShadow = new TextBox(U.inputEl('ctrl-border-color-shadow'));
            this.shBorderShadow = new Label(U.labelEl('ctrl-border-color-shadow-sample'));
            this.txBorderWidth = new TextBox(U.inputEl('ctrl-border-width'));
            this.chkBorderRounded = new CheckBox(U.inputEl('ctrl-border-rounded'));

            // charts
            this.cbType = new ComboBox(U.selectEl('ctl-chart-type'));
            this.cbLinesType = new ComboBox(U.selectEl('ctl-chart-bar-grid-lines'));
            this.chkShowBarValues = new CheckBox(U.inputEl('ctrl-chart-show-bar-values'));
            this.chkShowOutlines = new CheckBox(U.inputEl('ctrl-chart-show-outline'));
            this.cbChartSize = new ComboBox(U.selectEl('ctl-chart-pie-size'));
            this.cbChartThickness = new ComboBox(U.selectEl('ctl-chart-pie-thickness'));
            this.txChartTop = new TextBox(U.inputEl('ctrl-chart-top'));
            this.chkSort = new CheckBox(U.inputEl('ctrl-chart-sort'));
            this.txChartDbFieldGroup = new TextBox(U.inputEl('ctrl-chart-group-db-field'));
            this.txChartGroupValue = new TextBox(U.inputEl('ctrl-chart-group-value'));
            this.txChartDbFieldVal1 = new TextBox(U.inputEl('ctrl-chart-serie1-db-field-value'));
            this.txChartDbFieldLbl1 = new TextBox(U.inputEl('ctrl-chart-serie1-db-field-label'));
            this.cbColorSerie1 = new ComboBox(U.selectEl('ctrl-chart-serie1-color'));
            this.txChartDbFieldVal2 = new TextBox(U.inputEl('ctrl-chart-serie2-db-field-value'));
            this.txChartDbFieldLbl2 = new TextBox(U.inputEl('ctrl-chart-serie2-db-field-label'));
            this.cbColorSerie2 = new ComboBox(U.selectEl('ctrl-chart-serie2-color'));

            U.el('ctrl-chart-group-db-field-button').onclick = P.call(this, () => this.selectDbField(this.txChartDbFieldGroup.getText(), this.setChartGroupDbField));
            U.el('ctrl-chart-serie1-db-field-value-button').onclick = P.call(this, () => this.selectDbField(this.txChartDbFieldVal1.getText(), this.setChartSerie1DbFieldValue));
            U.el('ctrl-chart-serie1-db-field-label-button').onclick = P.call(this, () => this.selectDbField(this.txChartDbFieldLbl1.getText(), this.setChartSerie1DbFieldLabel));
            U.el('ctrl-chart-serie2-db-field-value-button').onclick = P.call(this, () => this.selectDbField(this.txChartDbFieldVal2.getText(), this.setChartSerie2DbFieldValue));
            U.el('ctrl-chart-serie2-db-field-label-button').onclick = P.call(this, () => this.selectDbField(this.txChartDbFieldLbl2.getText(), this.setChartSerie2DbFieldLabel));

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

            this.txChartGroupValue.setChange(P.call(this, this.txChartGroupValueChanged));
            this.txChartTop.setChange(P.call(this, this.txChartTopChanged));
            this.cbType.setOnClick(P.call(this, this.cbTypeSelectedIndexChanged));
            this.cbLinesType.setOnClick(P.call(this, this.cbLinesTypeSelectedIndexChanged));
            this.cbChartSize.setOnClick(P.call(this, this.cbChartSizeSelectedIndexChanged));
            this.txChartTop.setChange(P.call(this, this.txChartTopTextChanged));
            this.cbChartThickness.setOnClick(P.call(this, this.cbChartThicknessSelectedIndexChanged));
            this.chkShowBarValues.setChange(P.call(this, this.chkShowBarValuesCheckedChanged));
            this.chkShowOutlines.setChange(P.call(this, this.chkShowOutlinesCheckedChanged));
            this.chkSort.setChange(P.call(this, this.chkSortCheckedChanged));
            this.txChartDbFieldGroup.setChange(P.call(this, this.txDbFieldGroupTextChanged));
            this.txChartDbFieldVal1.setChange(P.call(this, this.txDbFieldVal1TextChanged));
            this.txChartDbFieldLbl1.setChange(P.call(this, this.txDbFieldLbl1TextChanged));
            this.cbColorSerie1.setOnClick(P.call(this, this.cbColorSerie1SelectedIndexChanged));
            this.txChartDbFieldVal2.setChange(P.call(this, this.txDbFieldVal2TextChanged));
            this.txChartDbFieldLbl2.setChange(P.call(this, this.txDbFieldLbl2TextChanged));
            this.cbColorSerie2.setOnClick(P.call(this, this.cbColorSerie2SelectedIndexChanged));

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

            this.initChart();

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
        public setIndex(value: number) {
            this.index = value;
        }

        public getFieldType() {
            return this.fieldType;
        }
        public setFieldType(value: number) {
            this.fieldType = value;
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

        public setFormulaName(value: string) {
            this.formulaName = value;
        }

        public getIsAccounting() {
            return this.isAccounting;
        }

        public setIsAccounting(value: boolean) {
            this.isAccounting = value;
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

        public setTextChanged(value: boolean) {
            this.textChanged = value;
        }

        public getTagChanged() {
            return this.tagChanged;
        }

        public setTagChanged(value: boolean) {
            this.tagChanged = value;
        }

        public getFontChanged() {
            return this.fontChanged;
        }

        public setFontChanged(value: boolean) {
            this.fontChanged = value;
        }

        public getForeColorChanged() {
            return this.foreColorChanged;
        }

        public setForeColorChanged(value: boolean) {
            this.foreColorChanged = value;
        }

        public getBackColorChanged() {
            return this.backColorChanged;
        }

        public setBackColorChanged(value: boolean) {
            this.backColorChanged = value;
        }

        public getFormatChanged() {
            return this.formatChanged;
        }

        public setFormatChanged(value: boolean) {
            this.formatChanged = value;
        }

        public getLeftChanged() {
            return this.leftChanged;
        }

        public setLeftChanged(value: boolean) {
            this.leftChanged = value;
        }

        public getTopChanged() {
            return this.topChanged;
        }

        public setTopChanged(value: boolean) {
            this.topChanged = value;
        }

        public getHeightChanged() {
            return this.heightChanged;
        }

        public setHeightChanged(value: boolean) {
            this.heightChanged = value;
        }

        public getWidthChanged() {
            return this.widthChanged;
        }

        public setWidthChanged(value: boolean) {
            this.widthChanged = value;
        }

        public getSymbolChanged() {
            return this.symbolChanged;
        }

        public setSymbolChanged(value: boolean) {
            this.symbolChanged = value;
        }

        public getTransparentChanged() {
            return this.transparentChanged;
        }

        public setTransparentChanged(value: boolean) {
            this.transparentChanged = value;
        }

        public getStrikeChanged() {
            return this.strikeChanged;
        }

        public setStrikeChanged(value: boolean) {
            this.strikeChanged = value;
        }

        public getUnderlineChanged() {
            return this.underlineChanged;
        }

        public setUnderlineChanged(value: boolean) {
            this.underlineChanged = value;
        }

        public getWordWrapChanged() {
            return this.wordWrapChanged;
        }

        public setWordWrapChanged(value: boolean) {
            this.wordWrapChanged = value;
        }

        public getItalicChanged() {
            return this.italicChanged;
        }

        public setItalicChanged(value: boolean) {
            this.italicChanged = value;
        }

        public getBoldChanged() {
            return this.boldChanged;
        }

        public setBoldChanged(value: boolean) {
            this.boldChanged = value;
        }

        public getAlignChanged() {
            return this.alignChanged;
        }

        public setAlignChanged(value: boolean) {
            this.alignChanged = value;
        }

        public getFontSizeChanged() {
            return this.fontSizeChanged;
        }

        public setFontSizeChanged(value: boolean) {
            this.fontSizeChanged = value;
        }

        public getCanGrowChanged() {
            return this.canGrowChanged;
        }

        public setCanGrowChanged(value: boolean) {
            this.canGrowChanged = value;
        }

        public getFormulaHideChanged() {
            return this.formulaHideChanged;
        }

        public setFormulaHideChanged(value: boolean) {
            this.formulaHideChanged = value;
        }

        public getFormulaValueChanged() {
            return this.formulaValueChanged;
        }

        public setFormulaValueChanged(value: boolean) {
            this.formulaValueChanged = value;
        }

        public getWhenEvalChanged() {
            return this.whenEvalChanged;
        }

        public setWhenEvalChanged(value: boolean) {
            this.whenEvalChanged = value;
        }

        public getIdxGroupChanged() {
            return this.idxGroupChanged;
        }

        public setIdxGroupChanged(value: boolean) {
            this.idxGroupChanged = value;
        }

        public getDbFieldChanged() {
            return this.dbFieldChanged;
        }

        public setDbFieldChanged(value: boolean) {
            this.dbFieldChanged = value;
        }

        public getSetFormulaHideChanged() {
            return this.bSetFormulaHideChanged;
        }

        public setSetFormulaHideChanged(value: boolean) {
            this.bSetFormulaHideChanged = value;
        }

        public getSetFormulaValueChanged() {
            return this.bSetFormulaValueChanged;
        }

        public setSetFormulaValueChanged(value: boolean) {
            this.bSetFormulaValueChanged = value;
        }

        public getBorderTypeChanged() {
            return this.borderTypeChanged;
        }

        public setBorderTypeChanged(value: boolean) {
            this.borderTypeChanged = value;
        }

        public getBorder3DChanged() {
            return this.border3DChanged;
        }

        public setBorder3DChanged(value: boolean) {
            this.border3DChanged = value;
        }

        public getBorder3DShadowChanged() {
            return this.border3DShadowChanged;
        }

        public setBorder3DShadowChanged(value: boolean) {
            this.border3DShadowChanged = value;
        }

        public getBorderRoundedChanged() {
            return this.borderRoundedChanged;
        }

        public setBorderRoundedChanged(value: boolean) {
            this.borderRoundedChanged = value;
        }

        public getBorderWidthChanged() {
            return this.borderWidthChanged;
        }

        public setBorderWidthChanged(value: boolean) {
            this.borderWidthChanged = value;
        }

        public getBorderColorChanged() {
            return this.borderColorChanged;
        }

        public setBorderColorChanged(value: boolean) {
            this.borderColorChanged = value;
        }

        public getPictureChanged() {
            return this.pictureChanged;
        }

        public setPictureChanged(value: boolean) {
            this.pictureChanged = value;
        }

        public getIsFreeCtrlChanged() {
            return this.isFreeCtrlChanged;
        }

        public setIsFreeCtrlChanged(value: boolean) {
            this.isFreeCtrlChanged = value;
        }

        public getExportColIdxChanged() {
            return this.exportColIdxChanged;
        }

        public setExportColIdxChanged(value: boolean) {
            this.exportColIdxChanged = value;
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

        public setChartGroupIndex(value: number) {
            this.chartGroupIndex = value;
        }

        public setChartIndex(idx: number, value: number) {
            this.chartIndex[idx] = value;
        }

        public setChartGroupFieldType(value: number) {
            this.chartGroupFieldType = value;
        }

        public setChartFieldType(idx: number, value: number) {
            this.chartFieldType[idx] = value;
        }

        // char has changed getters and setters

        public getChartFieldVal1Changed() {
            return this.chartFieldVal1Changed;
        }

        public setChartFieldVal1Changed(value: boolean) {
            this.chartFieldVal1Changed = value;
        }

        public getChartFieldVal2Changed() {
            return this.chartFieldVal2Changed;
        }

        public setChartFieldVal2Changed(value: boolean) {
            this.chartFieldVal2Changed = value;
        }

        public getChartFieldLbl1Changed() {
            return this.chartFieldLbl1Changed;
        }

        public setChartFieldLbl1Changed(value: boolean) {
            this.chartFieldLbl1Changed = value;
        }

        public getChartFieldGroupChanged() {
            return this.chartFieldGroupChanged;
        }

        public setChartFieldGroupChanged(value: boolean) {
            this.chartFieldGroupChanged = value;
        }

        public getChartGroupValueChanged() {
            return this.chartGroupValueChanged;
        }

        public setChartGroupValueChanged(value: boolean) {
            this.chartGroupValueChanged = value;
        }

        public getChartFieldLbl2Changed() {
            return this.chartFieldLbl2Changed;
        }

        public setChartFieldLbl2Changed(value: boolean) {
            this.chartFieldLbl2Changed = value;
        }

        public getChartSizeChanged() {
            return this.chartSizeChanged;
        }

        public setChartSizeChanged(value: boolean) {
            this.chartSizeChanged = value;
        }

        public getChartThicknessChanged() {
            return this.chartThicknessChanged;
        }

        public setChartThicknessChanged(value: boolean) {
            this.chartThicknessChanged = value;
        }

        public getChartColorSerie1Changed() {
            return this.chartColorSerie1Changed;
        }

        public setChartColorSerie1Changed(value: boolean) {
            this.chartColorSerie1Changed = value;
        }

        public getChartColorSerie2Changed() {
            return this.chartColorSerie2Changed;
        }

        public setChartColorSerie2Changed(value: boolean) {
            this.chartColorSerie2Changed = value;
        }

        public getChartLinesTypeChanged() {
            return this.chartLinesTypeChanged;
        }

        public setChartLinesTypeChanged(value: boolean) {
            this.chartLinesTypeChanged = value;
        }

        public getChartTypeChanged() {
            return this.chartTypeChanged;
        }

        public setChartTypeChanged(value: boolean) {
            this.chartTypeChanged = value;
        }

        public getChartShowLinesChanged() {
            return this.chartShowLinesChanged;
        }

        public setChartShowLinesChanged(value: boolean) {
            this.chartShowLinesChanged = value;
        }

        public getChartShowValuesChanged() {
            return this.chartShowValuesChanged;
        }

        public setChartShowValuesChanged(value: boolean) {
            this.chartShowValuesChanged = value;
        }

        public getChartTopChanged() {
            return this.chartTopChanged;
        }

        public setChartTopChanged(value: boolean) {
            this.chartTopChanged = value;
        }

        public getChartSortChanged() {
            return this.chartSortChanged;
        }

        public setChartSortChanged(value: boolean) {
            this.chartSortChanged = value;
        }

        public getHasSectionFormulaHideChanged() {
            return this.bSetSectionFormulaHideChanged;
        }

        public setHasSectionFormulaHideChanged(value: boolean) {
            this.bSetSectionFormulaHideChanged = value;
        }

        public getSectionFormulaHideChanged() {
            return this.sectionFormulaHideChanged;
        }

        public setSectionFormulaHideChanged(value: boolean) {
            this.sectionFormulaHideChanged = value;
        }

        public getHasSectionLineFormulaHideChanged() {
            return this.bSetSectionLineFormulaHideChanged;
        }

        public setHasSectionLineFormulaHideChanged(value: boolean) {
            this.bSetSectionLineFormulaHideChanged = value;
        }

        public getSectionLineFormulaHideChanged() {
            return this.sectionLineFormulaHideChanged;
        }

        public setSectionLineFormulaHideChanged(value: boolean) {
            this.sectionLineFormulaHideChanged = value;
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
            U.listAdd(this.cbType, "Pie", csRptChartType.PIE);
            U.listAdd(this.cbType, "Bar", csRptChartType.BAR);
            U.listSetListIndex(this.cbType, 0);

            this.chkShowOutlines.setChecked(true);
            this.chkShowBarValues.setChecked(true);

            this.fillColors(this.cbColorSerie1);
            U.listSetListIndex(this.cbColorSerie1, 10);

            this.fillColors(this.cbColorSerie2);
            U.listSetListIndex(this.cbColorSerie2, 69);

            U.listAdd(this.cbChartSize, "Smallest", 50);
            U.listAdd(this.cbChartSize, "Smaller", 100);
            U.listAdd(this.cbChartSize, "Small", 150);
            U.listAdd(this.cbChartSize, "Medium", 200);
            U.listAdd(this.cbChartSize, "Large", 250);
            U.listAdd(this.cbChartSize, "Big", 350);
            U.listSetListIndex(this.cbChartSize, 3);

            U.listAdd(this.cbChartThickness, "None", 0);
            U.listAdd(this.cbChartThickness, "Wafer", 2);
            U.listAdd(this.cbChartThickness, "Thin", 4);
            U.listAdd(this.cbChartThickness, "Medium", 8);
            U.listAdd(this.cbChartThickness, "Thick", 16);
            U.listAdd(this.cbChartThickness, "Thickest", 32);
            U.listSetListIndex(this.cbChartThickness, 2);

            U.listAdd(this.cbLinesType, "None", csRptChartLineStyle.NONE);
            U.listAdd(this.cbLinesType, "Horizontal", csRptChartLineStyle.HORIZONTAL);
            U.listAdd(this.cbLinesType, "Numbered", csRptChartLineStyle.NUMBERED);
            U.listAdd(this.cbLinesType, "Both", csRptChartLineStyle.BOTH);
            U.listSetListIndex(this.cbLinesType, 3);
        }

        private fillColors(cbList: ComboBox) {
            U.listAdd(cbList, "AliceBlue", "#FFF0F8FF");
            U.listAdd(cbList, "AntiqueWhite", "#FAEBD7");
            U.listAdd(cbList, "Aqua", "#00FFFF");
            U.listAdd(cbList, "Aquamarine", "#7FFFD4");
            U.listAdd(cbList, "Azure", "#F0FFFF");
            U.listAdd(cbList, "Beige", "#F5F5DC");
            U.listAdd(cbList, "Bisque", "#FFE4C4");
            U.listAdd(cbList, "Black", "#000000");
            U.listAdd(cbList, "BlanchedAlmond", "#FFEBCD");
            U.listAdd(cbList, "Blue", "#0000FF");
            U.listAdd(cbList, "BlueViolet", "#8A2BE2");
            U.listAdd(cbList, "Brown", "#A52A2A");
            U.listAdd(cbList, "BurlyWood", "#DEB887");
            U.listAdd(cbList, "CadetBlue", "#5F9EA0");
            U.listAdd(cbList, "Chartreuse", "#7FFF00");
            U.listAdd(cbList, "Chocolate", "#D2691E");
            U.listAdd(cbList, "Coral", "#FF7F50");
            U.listAdd(cbList, "CornflowerBlue", "#6495ED");
            U.listAdd(cbList, "Cornsilk", "#FFF8DC");
            U.listAdd(cbList, "Crimson", "#DC143C");
            U.listAdd(cbList, "Cyan", "#00FFFF");
            U.listAdd(cbList, "DarkBlue", "#00008B");
            U.listAdd(cbList, "DarkCyan", "#008B8B");
            U.listAdd(cbList, "DarkGoldenrod", "#B8860B");
            U.listAdd(cbList, "DarkGray", "#A9A9A9");
            U.listAdd(cbList, "DarkGreen", "#006400");
            U.listAdd(cbList, "DarkKhaki", "#BDB76B");
            U.listAdd(cbList, "DarkMagenta", "#8B008B");
            U.listAdd(cbList, "DarkOliveGreen", "#556B2F");
            U.listAdd(cbList, "DarkOrange", "#FF8C00");
            U.listAdd(cbList, "DarkOrchid", "#9932CC");
            U.listAdd(cbList, "DarkRed", "#8B0000");
            U.listAdd(cbList, "DarkSalmon", "#E9967A");
            U.listAdd(cbList, "DarkSeaGreen", "#8FBC8B");
            U.listAdd(cbList, "DarkSlateBlue", "#483D8B");
            U.listAdd(cbList, "DarkSlateGray", "#2F4F4F");
            U.listAdd(cbList, "DarkTurquoise", "#00CED1");
            U.listAdd(cbList, "DarkViolet", "#9400D3");
            U.listAdd(cbList, "DeepPink", "#FF1493");
            U.listAdd(cbList, "DeepSkyBlue", "#00BFFF");
            U.listAdd(cbList, "DimGray", "#696969");
            U.listAdd(cbList, "DodgerBlue", "#1E90FF");
            U.listAdd(cbList, "Firebrick", "#B22222");
            U.listAdd(cbList, "FloralWhite", "#FFFAF0");
            U.listAdd(cbList, "ForestGreen", "#228B22");
            U.listAdd(cbList, "Fuchsia", "#FF00FF");
            U.listAdd(cbList, "Gainsboro", "#DCDCDC");
            U.listAdd(cbList, "GhostWhite", "#F8F8FF");
            U.listAdd(cbList, "Gold", "#FFD700");
            U.listAdd(cbList, "Goldenrod", "#DAA520");
            U.listAdd(cbList, "Gray", "#808080");
            U.listAdd(cbList, "Green", "#008000");
            U.listAdd(cbList, "GreenYellow", "#ADFF2F");
            U.listAdd(cbList, "Honeydew", "#F0FFF0");
            U.listAdd(cbList, "HotPink", "#FF69B4");
            U.listAdd(cbList, "IndianRed", "#CD5C5C");
            U.listAdd(cbList, "Indigo", "#4B0082");
            U.listAdd(cbList, "Ivory", "#FFFFF0");
            U.listAdd(cbList, "Khaki", "#F0E68C");
            U.listAdd(cbList, "Lavender", "#E6E6FA");
            U.listAdd(cbList, "LavenderBlush", "#FFF0F5");
            U.listAdd(cbList, "LawnGreen", "#7CFC00");
            U.listAdd(cbList, "LemonChiffon", "#FFFACD");
            U.listAdd(cbList, "LightBlue", "#ADD8E6");
            U.listAdd(cbList, "LightCoral", "#F08080");
            U.listAdd(cbList, "LightCyan", "#E0FFFF");
            U.listAdd(cbList, "LightGoldenrodYellow", "#FAFAD2");
            U.listAdd(cbList, "LightGray", "#D3D3D3");
            U.listAdd(cbList, "LightGreen", "#90EE90");
            U.listAdd(cbList, "LightPink", "#FFB6C1");
            U.listAdd(cbList, "LightSalmon", "#FFA07A");
            U.listAdd(cbList, "LightSeaGreen", "#20B2AA");
            U.listAdd(cbList, "LightSkyBlue", "#87CEFA");
            U.listAdd(cbList, "LightSlateGray", "#778899");
            U.listAdd(cbList, "LightSteelBlue", "#B0C4DE");
            U.listAdd(cbList, "LightYellow", "#FFFFE0");
            U.listAdd(cbList, "Lime", "#00FF00");
            U.listAdd(cbList, "LimeGreen", "#32CD32");
            U.listAdd(cbList, "Linen", "#FAF0E6");
            U.listAdd(cbList, "Magenta", "#FF00FF");
            U.listAdd(cbList, "Maroon", "#800000");
            U.listAdd(cbList, "MediumAquamarine", "#66CDAA");
            U.listAdd(cbList, "MediumBlue", "#0000CD");
            U.listAdd(cbList, "MediumOrchid", "#BA55D3");
            U.listAdd(cbList, "MediumPurple", "#9370DB");
            U.listAdd(cbList, "MediumSeaGreen", "#3CB371");
            U.listAdd(cbList, "MediumSlateBlue", "#7B68EE");
            U.listAdd(cbList, "MediumSpringGreen", "#00FA9A");
            U.listAdd(cbList, "MediumTurquoise", "#48D1CC");
            U.listAdd(cbList, "MediumVioletRed", "#C71585");
            U.listAdd(cbList, "MidnightBlue", "#191970");
            U.listAdd(cbList, "MintCream", "#F5FFFA");
            U.listAdd(cbList, "MistyRose", "#FFE4E1");
            U.listAdd(cbList, "Moccasin", "#FFE4B5");
            U.listAdd(cbList, "NavajoWhite", "#FFDEAD");
            U.listAdd(cbList, "Navy", "#000080");
            U.listAdd(cbList, "OldLace", "#FDF5E6");
            U.listAdd(cbList, "Olive", "#808000");
            U.listAdd(cbList, "OliveDrab", "#6B8E23");
            U.listAdd(cbList, "Orange", "#FFA500");
            U.listAdd(cbList, "OrangeRed", "#FF4500");
            U.listAdd(cbList, "Orchid", "#DA70D6");
            U.listAdd(cbList, "PaleGoldenrod", "#EEE8AA");
            U.listAdd(cbList, "PaleGreen", "#98FB98");
            U.listAdd(cbList, "PaleTurquoise", "#AFEEEE");
            U.listAdd(cbList, "PaleVioletRed", "#DB7093");
            U.listAdd(cbList, "PapayaWhip", "#FFEFD5");
            U.listAdd(cbList, "PeachPuff", "#FFDAB9");
            U.listAdd(cbList, "Peru", "#CD853F");
            U.listAdd(cbList, "Pink", "#FFC0CB");
            U.listAdd(cbList, "Plum", "#DDA0DD");
            U.listAdd(cbList, "PowderBlue", "#B0E0E6");
            U.listAdd(cbList, "Purple", "#800080");
            U.listAdd(cbList, "Red", "#FF0000");
            U.listAdd(cbList, "RosyBrown", "#BC8F8F");
            U.listAdd(cbList, "RoyalBlue", "#4169E1");
            U.listAdd(cbList, "SaddleBrown", "#8B4513");
            U.listAdd(cbList, "Salmon", "#FA8072");
            U.listAdd(cbList, "SandyBrown", "#F4A460");
            U.listAdd(cbList, "SeaGreen", "#2E8B57");
            U.listAdd(cbList, "SeaShell", "#FFF5EE");
            U.listAdd(cbList, "Sienna", "#A0522D");
            U.listAdd(cbList, "Silver", "#C0C0C0");
            U.listAdd(cbList, "SkyBlue", "#87CEEB");
            U.listAdd(cbList, "SlateBlue", "#6A5ACD");
            U.listAdd(cbList, "SlateGray", "#708090");
            U.listAdd(cbList, "Snow", "#FFFAFA");
            U.listAdd(cbList, "SpringGreen", "#00FF7F");
            U.listAdd(cbList, "SteelBlue", "#4682B4");
            U.listAdd(cbList, "Tan", "#D2B48C");
            U.listAdd(cbList, "Teal", "#008080");
            U.listAdd(cbList, "Thistle", "#D8BFD8");
            U.listAdd(cbList, "Tomato", "#FF6347");
            U.listAdd(cbList, "Transparent", "#FFFF");
            U.listAdd(cbList, "Turquoise", "#40E0D0");
            U.listAdd(cbList, "Violet", "#EE82EE");
            U.listAdd(cbList, "Wheat", "#F5DEB3");
            U.listAdd(cbList, "White", "#FFFFFF");
            U.listAdd(cbList, "WhiteSmoke", "#F5F5F5");
            U.listAdd(cbList, "Yellow", "#FFFF00");
            U.listAdd(cbList, "YellowGreen", "#9ACD32");
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
            this.txForeColorLostFocus();
        }

        private txBackColorChanged() {
            this.backColorChanged = true;
            this.txBackColorLostFocus();
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
            this.txBorderColorLostFocus();
        }

        private txBorder3DChanged() {
            this.border3DChanged = true;
            this.txBorder3DLostFocus();
        }

        private txBorderShadowChanged() {
            this.border3DShadowChanged = true;
            this.txBorderShadowLostFocus();
        }

        private txBorderWidthChanged() {
            this.borderWidthChanged = true;
        }

        private cbTypeSelectedIndexChanged() {
            this.chartTypeChanged = true;
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

        private txDbFieldGroupTextChanged() {
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

        getCbType(): ComboBox {
            return this.cbType;
        }

        getCbChartSize(): ComboBox {
            return this.cbChartSize;
        }

        getCbChartThickness(): ComboBox {
            return this.cbChartThickness;
        }

        getCbLinesType(): ComboBox {
            return this.cbLinesType;
        }

        getTxChartTop(): TextBox {
            return this.txChartTop;
        }

        getTxDbFieldGroupValue(): TextBox {
            return this.txChartDbFieldGroup;
        }

        getTxChartGroupValue(): TextBox {
            return this.txChartGroupValue;
        }

        getChkShowOutlines(): CheckBox {
            return this.chkShowOutlines;
        }

        getChkSort(): CheckBox {
            return this.chkSort;
        }

        getChkShowBarValues(): CheckBox {
            return this.chkShowBarValues;
        }

        getTxDbFieldLbl1(): TextBox {
            return this.txChartDbFieldLbl1;
        }

        getTxDbFieldVal1(): TextBox {
            return this.txChartDbFieldVal1;
        }

        getCbColorSerie1(): ComboBox {
            return this.cbColorSerie1;
        }

        getTxDbFieldLbl2(): TextBox {
            return this.txChartDbFieldLbl2;
        }

        getTxDbFieldVal2(): TextBox {
            return this.txChartDbFieldVal2;
        }

        getCbColorSerie2(): ComboBox {
            return this.cbColorSerie2;
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

        private setDbField(result: any) {
            if(result.success) {
                this.txDbField.setText(result.field);
                this.setFieldType(result.fieldType);
                this.setIndex(result.fieldIndex);
                this.dbFieldChanged = true;
                return true;
            }
            else {
                return false;
            }
        }

        private setChartGroupDbField(result: any) {
            if(result.success) {
                this.txChartDbFieldGroup.setText(result.field);
                this.setChartGroupFieldType(result.fieldType);
                this.setChartGroupIndex(result.fieldIndex);
                this.chartFieldGroupChanged = true;
                return true;
            }
            else {
                return false;
            }
        }

        private setChartSerie1DbFieldLabel(result: any) {
            if(result.success) {
                this.txChartDbFieldLbl1.setText(result.field);
                this.setChartFieldType(0, result.fieldType);
                this.setChartIndex(0, result.fieldIndex);
                this.chartFieldLbl1Changed = true;
                return true;
            }
            else {
                return false;
            }
        }

        private setChartSerie1DbFieldValue(result: any) {
            if(result.success) {
                this.txChartDbFieldVal1.setText(result.field);
                this.setChartFieldType(1, result.fieldType);
                this.setChartIndex(1, result.fieldIndex);
                this.chartFieldVal1Changed = true;
                return true;
            }
            else {
                return false;
            }
        }

        private setChartSerie2DbFieldLabel(result: any) {
            if(result.success) {
                this.txChartDbFieldLbl2.setText(result.field);
                this.setChartFieldType(2, result.fieldType);
                this.setChartIndex(2, result.fieldIndex);
                this.chartFieldLbl2Changed = true;
                return true;
            }
            else {
                return false;
            }
        }

        private setChartSerie2DbFieldValue(result: any) {
            if(result.success) {
                this.txChartDbFieldVal2.setText(result.field);
                this.setChartFieldType(3, result.fieldType);
                this.setChartIndex(3, result.fieldIndex);
                this.chartFieldVal2Changed = true;
                return true;
            }
            else {
                return false;
            }
        }

        private selectDbField(field: string, f: (result: any) => void) {
            this.editor.showHelpDbField3(field).then((result) => f.apply(this, [result]));
        }
    }
}
