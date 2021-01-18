

namespace CSReportEditor
{
    export class fProperties {


    {
        private ok: boolean = null;
        private done: boolean = null;

        private index: number = 0;
        private fieldType: number = 0;

        private formulaHide: string = "";
        private formulaValue: string = "";

        private formulaName: string = "";

        private isAccounting: boolean = null;

        private mouse: cMouseWait = null;

        private C_LABEL: number = 0;
        private C_FORMULA: number = 1;
        private C_FIELD: number = 2;
        private C_IMAGE: number = 3;
        private C_CHART: number = 5;

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
        private idxGroupChanged: boolean = null;
        private whenEvalChanged: boolean = null;
        private dbFieldChanged: boolean = null;
        private setFormulaHideChanged: boolean = null;
        private setFormulaValueChanged: boolean = null;
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

        public constructor() {
            InitializeComponent();
        }

        // properties

        public getPictureChanged() {
            return this.pictureChanged;
        }

        public setPictureChanged(rhs: boolean) {
            this.pictureChanged = rhs;
        }

        public getOk() {
            return this.ok;
        }

        public getIndex() {
            return this.index;
        }

        public getChartGroupIndex() {
            return this.chartGroupIndex;
        }

        public getChartIndex(idx: number) {
            return this.chartIndex[idx];
        }

        public getFieldType() {
            return this.fieldType;
        }

        public getChartFieldType(idx: number) {
            return this.chartFieldType[idx];
        }

        public getChartGroupFieldType() {
            return this.chartGroupFieldType;
        }

        public setIndex(rhs: number) {
            this.index = rhs;
        }

        public setChartGroupIndex(rhs: number) {
            this.chartGroupIndex = rhs;
        }

        public setChartIndex(idx: number, rhs: number) {
            this.chartIndex[idx] = rhs;
        }

        public setFieldType(rhs: number) {
            this.fieldType = rhs;
        }

        public setChartGroupFieldType(rhs: number) {
            this.chartGroupFieldType = rhs;
        }

        public setChartFieldType(idx: number, rhs: number) {
            this.chartFieldType[idx] = rhs;
        }

        public getFormulaHide() {
            return this.formulaHide;
        }

        public setFormulaHide(rhs: string) {
            this.formulaHide = rhs;
        }

        public getFormulaValue() {
            return this.formulaValue;
        }

        public setFormulaValue(rhs: string) {
            this.formulaValue = rhs;
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
            return this.setFormulaHideChanged;
        }

        public setSetFormulaHideChanged(rhs: boolean) {
            this.setFormulaHideChanged = rhs;
        }

        public getSetFormulaValueChanged() {
            return this.setFormulaValueChanged;
        }

        public setSetFormulaValueChanged(rhs: boolean) {
            this.setFormulaValueChanged = rhs;
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

        //------------------------------------------------------------------------------------------------------------------

        // change events

        //------------------------------------------------------------------------------------------------------------------

        private cb_align_Click(sender: object, e: EventArgs) {
            this.alignChanged = true;
        }

        private cb_borderType_Click(sender: object, e: EventArgs) {
            this.borderTypeChanged = true;
        }

        private chk_borderRounded_Click(sender: object, e: EventArgs) {
            this.borderRoundedChanged = true;
        }

        private chk_formulaHide_Click(sender: object, e: EventArgs) {
            this.setFormulaHideChanged = true;
        }

        private chk_formulaValue_Click(sender: object, e: EventArgs) {
            this.setFormulaValueChanged = true;
        }

        private cmd_formulaHide_Click(sender: object, e: EventArgs) {
            let cancel: boolean = false;
            this.formulaName = "Ocultar";
            showFormula(this.formulaHide, cancel);
            if (!cancel) {
                this.formulaHideChanged = true;
                lb_formulaHide.Text = this.formulaHide;
            }
        }

        private cmd_formulaValue_Click(sender: object, e: EventArgs) {
            let cancel: boolean = false;
            this.formulaName = "Valor";
            showFormula(this.formulaValue, cancel);
            if (!cancel) {
                this.formulaValueChanged = true;
                lbFormulaValue.Text = this.formulaValue;
            }
        }

        private showFormula(formula: string, cancel: boolean) {
            //TODO: fix me
            cancel = false;
            /*
          Iterator listeners = this.listeners.iterator();
          while(listeners.hasNext()) {
              (listeners.next()).showEditFormula(formula, cancel);
          };*/
        }

        private op_afterPrint_Click(sender: object, e: EventArgs) {
            this.whenEvalChanged = true;
        }

        private op_beforePrint_Click(sender: object, e: EventArgs) {
            this.whenEvalChanged = true;
        }

        private tx_border3D_LostFocus(sender: object, e: EventArgs) {
            try {
                shBorder3D.BackColor = Color.FromArgb(Int32.Parse(txBorder3D.Text));
            }
            catch (ignore) { }
        }

        private cmd_border3D_click(sender: object, e: EventArgs) {
            try {
                // TODO: fix me
                /*
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = CommDialog;
                w___TYPE_NOT_FOUND.CancelError = true;
                w___TYPE_NOT_FOUND.Color = txBorder3D.csValue;
                w___TYPE_NOT_FOUND.Flags = cdlCCRGBInit;
                VBA.ex.clear();
                w___TYPE_NOT_FOUND.ShowColor;
                if (VBA.ex.Number !== 0) { return; }
                txBorder3D.cReportPaintObject.setText(w___TYPE_NOT_FOUND.Color);
                shBorder3D.cReportAspect.setBackColor(txBorder3D.csValue);
                 */
            }
            catch (ignore) { }
        }

        private tx_borderColor_LostFocus(sender: object, e: EventArgs) {
            try {
                shBorderColor.BackColor = Color.FromArgb(Int32.Parse(txBorderColor.Text));
            }
            catch (ignore) { }
        }

        private cmd_borderColor_Click(sender: object, e: EventArgs) {
            try {
                // TODO: fix me
                /*
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = CommDialog;
                w___TYPE_NOT_FOUND.CancelError = true;
                w___TYPE_NOT_FOUND.Color = txBorderColor.csValue;
                w___TYPE_NOT_FOUND.Flags = cdlCCRGBInit;
                VBA.ex.clear();
                w___TYPE_NOT_FOUND.ShowColor;
                if (VBA.ex.Number !== 0) { return; }
                txBorderColor.cReportPaintObject.setText(w___TYPE_NOT_FOUND.Color);
                shBorderColor.cReportAspect.setBackColor(txBorderColor.csValue);
                 */
            }
            catch (ignore) { }
        }

        private tx_borderShadow_LostFocus(sender: object, e: EventArgs) {
            try {
                shBorderShadow.BackColor = Color.FromArgb(Int32.Parse(txBorderShadow.Text));
            }
            catch (ignore) { }
        }

        private cmd_borderShadow_Click(sender: object, e: EventArgs) {
            try {
                // TODO: fix me
                /*
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = CommDialog;
                w___TYPE_NOT_FOUND.CancelError = true;
                w___TYPE_NOT_FOUND.Color = txBorderShadow.csValue;
                w___TYPE_NOT_FOUND.Flags = cdlCCRGBInit;
                VBA.ex.clear();
                w___TYPE_NOT_FOUND.ShowColor;
                if (VBA.ex.Number !== 0) { return; }
                txBorderShadow.cReportPaintObject.setText(w___TYPE_NOT_FOUND.Color);
                shBorderShadow.cReportAspect.setBackColor(txBorderShadow.csValue);
                 */
            }
            catch (ignore) { }
        }

        private tx_BorderWidth_TextChanged(sender: object, e: EventArgs) {
            this.borderWidthChanged = true;
        }

        private tx_ChartGroupValue_TextChanged(sender: object, e: EventArgs) {
            this.chartGroupValueChanged = true;
        }

        private tx_ChartTop_TextChanged(sender: object, e: EventArgs) {
            this.chartTopChanged = true;
        }

        private cmd_dbField_Click(sender: object, e: EventArgs) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpDbField(cancel);
            };
            if (!cancel) {
              this.dbFieldChanged = true;
            }
             * */
        }

        private cmd_dbFieldGroupValue_Click(sender: object, e: EventArgs) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartGroupField(cancel);
            };
            if (!cancel) {
              this.chartFieldGroupChanged = true;
            }
             * */
        }

        private cmd_dbFieldLbl1_Click(sender: object, e: EventArgs) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl1, 2);
            };
            if (!cancel) {
              this.chartFieldLbl1Changed = true;
            }
             * */
        }

        private cmd_dbFieldLbl2_Click(sender: object, e: EventArgs) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl2, 3);
            };
            if (!cancel) {
              this.chartFieldLbl2Changed = true;
            }
             * */
        }

        private cmd_dbFieldVal1_Click(sender: object, e: EventArgs) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal1, 0);
            };
            if (!cancel) {
              this.chartFieldVal1Changed = true;
            }
             * */
        }

        private cmd_dbFieldVal2_Click(sender: object, e: EventArgs) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = this.listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal2, 1);
            };
            if (!cancel) {
              this.chartFieldVal2Changed = true;
            }
             * */
        }

        private cmd_foreColor_Click(sender: object, e: EventArgs) {
            try {
                /* TODO: fix me
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = CommDialog;
                w___TYPE_NOT_FOUND.CancelError = true;
                w___TYPE_NOT_FOUND.Color = TxForeColor.csValue;
                w___TYPE_NOT_FOUND.Flags = cdlCCRGBInit;
                VBA.ex.clear();
                w___TYPE_NOT_FOUND.ShowColor;
                if (VBA.ex.Number !== 0) { return; }
                TxForeColor.cReportPaintObject.setText(w___TYPE_NOT_FOUND.Color);

                shForeColor.cReportAspect.setBackColor(TxForeColor.csValue);
                 * */
            }
            catch (ignore) { }
        }

        private tx_foreColor_LostFocus(sender: object, e: EventArgs) {
            try {
                shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text));
            }
            catch (ignore) { }
        }

        private cmd_backColor_Click(sender: object, e: EventArgs) {
            try {
                /* TODO: fix me
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = CommDialog;
                w___TYPE_NOT_FOUND.CancelError = true;
                w___TYPE_NOT_FOUND.Color = TxBackColor.csValue;
                VBA.ex.clear();
                w___TYPE_NOT_FOUND.ShowColor;
                if (VBA.ex.Number !== 0) { return; }
                TxBackColor.cReportPaintObject.setText(w___TYPE_NOT_FOUND.Color);
                shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
                 * */
            }
            catch (ignore) { }
        }

        private tx_backColor_LostFocus(sender: object, e: EventArgs) {
            try {
                shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
            }
            catch (ignore) { }
        }

        private cmd_font_Click(sender: object, e: EventArgs) {
            try {

                /* TODO: fix me
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = CommDialog;
                w___TYPE_NOT_FOUND.CancelError = true;
                w___TYPE_NOT_FOUND.Flags = cdlCFBoth || cdlCFEffects;
                w___TYPE_NOT_FOUND.FontName = txFont.cReportPaintObject.getText();
                w___TYPE_NOT_FOUND.FontBold = chkFontBold.cColumnInfo.getValue() === vbChecked;
                w___TYPE_NOT_FOUND.FontItalic = chkFontItalic.cColumnInfo.getValue() === vbChecked;
                w___TYPE_NOT_FOUND.FontUnderline = chkFontUnderline.cColumnInfo.getValue() === vbChecked;
                w___TYPE_NOT_FOUND.FontStrikethru = chkFontStrike.cColumnInfo.getValue() === vbChecked;
                w___TYPE_NOT_FOUND.FontSize = TxFontSize.csValue;
                w___TYPE_NOT_FOUND.Color = TxForeColor.csValue;
                VBA.ex.clear();
                w___TYPE_NOT_FOUND.ShowFont;

                if (VBA.ex.Number !== 0) { return; }

                txFont.cReportPaintObject.setText(w___TYPE_NOT_FOUND.FontName);
                chkFontBold.cColumnInfo.setValue(w___TYPE_NOT_FOUND.FontBold ? vbChecked : vbUnchecked));
                chkFontItalic.cColumnInfo.setValue(w___TYPE_NOT_FOUND.FontItalic ? vbChecked : vbUnchecked));
                chkFontUnderline.cColumnInfo.setValue(w___TYPE_NOT_FOUND.FontUnderline ? vbChecked : vbUnchecked));
                chkFontStrike.cColumnInfo.setValue(w___TYPE_NOT_FOUND.FontStrikethru ? vbChecked : vbUnchecked));
                TxFontSize.cReportPaintObject.setText(w___TYPE_NOT_FOUND.FontSize);
                TxForeColor.cReportPaintObject.setText(w___TYPE_NOT_FOUND.Color);
                 * */
            }
            catch (ignore) { }
        }

        //------------------------------------------------------------------------------------------------------------------

        // initializers

        //------------------------------------------------------------------------------------------------------------------

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
            this.setFormulaHideChanged = false;
            this.setFormulaValueChanged = false;
            this.pictureChanged = false;
            this.borderTypeChanged = false;
            this.border3DChanged = false;
            this.border3DShadowChanged = false;
            this.borderRoundedChanged = false;
            this.borderWidthChanged = false;
            this.borderColorChanged = false;

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

        }

        public hideTabField() {
            tab_main.TabPages.RemoveAt(C_FIELD);
        }

        public hideTabImage() {
            tab_main.TabPages.RemoveAt(C_IMAGE);
        }

        public hideTabChart() {
            tab_main.TabPages.RemoveAt(C_CHART);
        }

        //------------------------------------------------------------------------------------------------------------------

        // setters and getters for no control properties

        //------------------------------------------------------------------------------------------------------------------

        /*
		public string getFormulaName ()
		{
			throw new NotImplementedException ();
		}

		public int getChartFieldType (int idx)
		{
			throw new NotImplementedException ();
		}

		public int getChartIndex (int idx)
		{
			throw new NotImplementedException ();
		}

		public void setChartFieldType (int idx, int nFieldType)
		{
			throw new NotImplementedException ();
		}

		public void setChartIndex (int idx, int nIndex)
		{
			throw new NotImplementedException ();
		}
        */
		public getDbFieldGroupValue() {
			throw new NotImplementedException ();
		}
        /*
		public int getChartGroupFieldType ()
		{
			throw new NotImplementedException ();
		}

		public int getChartGroupIndex ()
		{
			throw new NotImplementedException ();
		}
        */
		public setDbFieldGroupValue(sField: string) {
			throw new NotImplementedException ();
		}
        /*
		public void setChartGroupFieldType (int nFieldType)
		{
			throw new NotImplementedException ();
		}

		public void setChartGroupIndex (int nIndex)
		{
			throw new NotImplementedException ();
		}
        */

        //------------------------------------------------------------------------------------------------------------------

        // expose controls

        //------------------------------------------------------------------------------------------------------------------

UNKNOWN >>         public System.Windows.Forms.TextBox txExportColIdx
        {
UNKNOWN >>             get
            {
                return tx_exportColIdx;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkIsFreeCtrl
        {
UNKNOWN >>             get
            {
                return chk_isFreeCtrl;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkWordWrap
        {
UNKNOWN >>             get
            {
                return chk_wordWrap;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkCanGrow
        {
UNKNOWN >>             get
            {
                return chk_canGrow;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txWidth
        {
UNKNOWN >>             get
            {
                return tx_width;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txHeight
        {
UNKNOWN >>             get
            {
                return tx_height;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txTop
        {
UNKNOWN >>             get
            {
                return tx_top;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txLeft
        {
UNKNOWN >>             get
            {
                return tx_left;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txSymbol
        {
UNKNOWN >>             get
            {
                return tx_symbol;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txFormat
        {
UNKNOWN >>             get
            {
                return tx_format;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkTransparent
        {
UNKNOWN >>             get
            {
                return chk_transparent;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label shBackColor
        {
UNKNOWN >>             get
            {
                return sh_backColor;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txBackColor
        {
UNKNOWN >>             get
            {
                return tx_backColor;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontStrike
        {
UNKNOWN >>             get
            {
                return chk_fontStrike;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontItalic
        {
UNKNOWN >>             get
            {
                return chk_fontItalic;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label shForeColor
        {
UNKNOWN >>             get
            {
                return sh_foreColor;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txForeColor
        {
UNKNOWN >>             get
            {
                return tx_foreColor;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontUnderline
        {
UNKNOWN >>             get
            {
                return chk_fontUnderline;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontBold
        {
UNKNOWN >>             get
            {
                return chk_fontBold;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbAlign
        {
UNKNOWN >>             get
            {
                return cb_align;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txFontSize
        {
UNKNOWN >>             get
            {
                return tx_fontSize;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txFont
        {
UNKNOWN >>             get
            {
                return tx_font;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txTag
        {
UNKNOWN >>             get
            {
                return tx_tag;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txText
        {
UNKNOWN >>             get
            {
                return tx_text;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label lbControl
        {
UNKNOWN >>             get
            {
                return lb_control;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txName
        {
UNKNOWN >>             get
            {
                return tx_name;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdApply
        {
UNKNOWN >>             get
            {
                return cmd_apply;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdCancel
        {
UNKNOWN >>             get
            {
                return cmd_cancel;
            }
        }
UNKNOWN >>         public System.Windows.Forms.RadioButton opAfterPrint
        {
UNKNOWN >>             get
            {
                return op_afterPrint;
            }
        }
UNKNOWN >>         public System.Windows.Forms.RadioButton opBeforePrint
        {
UNKNOWN >>             get
            {
                return op_beforePrint;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txIdxGroup
        {
UNKNOWN >>             get
            {
                return tx_idxGroup;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label lbFormulaValue
        {
UNKNOWN >>             get
            {
                return lb_formulaValue;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFormulaValue
        {
UNKNOWN >>             get
            {
                return chk_formulaValue;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdFormulaValue
        {
UNKNOWN >>             get
            {
                return cmd_formulaValue;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label lbFormulaHide
        {
UNKNOWN >>             get
            {
                return lb_formulaHide;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFormulaHide
        {
UNKNOWN >>             get
            {
                return chk_formulaHide;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdFormulaHide
        {
UNKNOWN >>             get
            {
                return cmd_formulaHide;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbField
        {
UNKNOWN >>             get
            {
                return cmd_dbField;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbField
        {
UNKNOWN >>             get
            {
                return tx_dbField;
            }
        }
UNKNOWN >>         public System.Windows.Forms.PictureBox picImage
        {
UNKNOWN >>             get
            {
                return pic_image;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdImageFile
        {
UNKNOWN >>             get
            {
                return cmd_imageFile;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txImageFile
        {
UNKNOWN >>             get
            {
                return tx_imageFile;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkBorderRounded
        {
UNKNOWN >>             get
            {
                return chk_borderRounded;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorderWidth
        {
UNKNOWN >>             get
            {
                return tx_borderWidth;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label shBorderShadow
        {
UNKNOWN >>             get
            {
                return sh_borderShadow;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorderShadow
        {
UNKNOWN >>             get
            {
                return tx_borderShadow;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label shBorder3D
        {
UNKNOWN >>             get
            {
                return sh_border3D;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorder3D
        {
UNKNOWN >>             get
            {
                return tx_border3D;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Label shBorderColor
        {
UNKNOWN >>             get
            {
                return sh_borderColor;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorderColor
        {
UNKNOWN >>             get
            {
                return tx_borderColor;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbBorderType
        {
UNKNOWN >>             get
            {
                return cb_borderType;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbChartThickness
        {
UNKNOWN >>             get
            {
                return cb_chartThickness;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbChartSize
        {
UNKNOWN >>             get
            {
                return cb_chartSize;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbLinesType
        {
UNKNOWN >>             get
            {
                return cb_linesType;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbFormatType
        {
UNKNOWN >>             get
            {
                return cb_formatType;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbType
        {
UNKNOWN >>             get
            {
                return cb_type;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkSort
        {
UNKNOWN >>             get
            {
                return chk_sort;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkShowOutlines
        {
UNKNOWN >>             get
            {
                return chk_showOutlines;
            }
        }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkShowBarValues
        {
UNKNOWN >>             get
            {
                return chk_showBarValues;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txChartTop
        {
UNKNOWN >>             get
            {
                return tx_chartTop;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbColorSerie2
        {
UNKNOWN >>             get
            {
                return cb_colorSerie2;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldLbl2
        {
UNKNOWN >>             get
            {
                return cmd_dbFieldLbl2;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldLbl2
        {
UNKNOWN >>             get
            {
                return tx_dbFieldLbl2;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldVal2
        {
UNKNOWN >>             get
            {
                return cmd_dbFieldVal2;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldVal2
        {
UNKNOWN >>             get
            {
                return tx_dbFieldVal2;
            }
        }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbColorSerie1
        {
UNKNOWN >>             get
            {
                return cb_colorSerie1;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldLbl1
        {
UNKNOWN >>             get
            {
                return cmd_dbFieldLbl1;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldLbl1
        {
UNKNOWN >>             get
            {
                return tx_dbFieldLbl1;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldVal1
        {
UNKNOWN >>             get
            {
                return cmd_dbFieldVal1;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldVal1
        {
UNKNOWN >>             get
            {
                return tx_dbFieldVal1;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txChartGroupValue
        {
UNKNOWN >>             get
            {
                return tx_chartGroupValue;
            }
        }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldGroupValue
        {
UNKNOWN >>             get
            {
                return cmd_dbFieldGroupValue;
            }
        }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldGroupValue
        {
UNKNOWN >>             get
            {
                return tx_dbFieldGroupValue;
            }
        }


    }    }
}
