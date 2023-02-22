namespace CSReportEditor {

    import cMouseWait = CSKernelClient.cMouseWait;
    import NotImplementedException = CSOAPI.NotImplementedException;

    export class FProperties {

        private editor: cEditor = null;

        private ok: boolean = null;
        private done: boolean = null;

        private index: number = 0;
        private fieldType: number = 0;

        private formulaHide: string = "";
        private formulaValue: string = "";

        private formulaName: string = "";

        private isAccounting: boolean = null;

        private mouse: cMouseWait = null;

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

        public constructor() {
            // InitializeComponent();
            //
            // cb_align.Items.clear();
            // cUtil.listAdd(cb_align, "Left", (int)CSReportGlobals.HorizontalAlignment.Left);
            // cUtil.listAdd(cb_align, "Right", (int)CSReportGlobals.HorizontalAlignment.Right);
            // cUtil.listAdd(cb_align, "Center", (int)CSReportGlobals.HorizontalAlignment.Center);
            //
            // cb_borderType.Items.clear();
            // cUtil.listAdd(cb_borderType, "Flat", (int)csReportBorderType.CS_RPT_BS_FIXED);
            // cUtil.listAdd(cb_borderType, "3D", (int)csReportBorderType.CS_RPT_BS_3D);
            // cUtil.listAdd(cb_borderType, "(Ninguno)", (int)csReportBorderType.CS_RPT_BS_NONE);
            //
            // G.redim(this.chartFieldType, 3);
            // G.redim(this.chartIndex, 3);
            //
            // initChart();
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

        private cb_align_Click(sender: object, e: object) {
            this.alignChanged = true;
        }

        private cb_borderType_Click(sender: object, e: object) {
            this.borderTypeChanged = true;
        }

        private chk_borderRounded_Click(sender: object, e: object) {
            this.borderRoundedChanged = true;
        }

        private chk_formulaHide_Click(sender: object, e: object) {
            this.bSetFormulaHideChanged = true;
        }

        private chk_formulaValue_Click(sender: object, e: object) {
            this.bSetFormulaValueChanged = true;
        }

        private cmd_formulaHide_Click(sender: object, e: object) {
            // this.formulaName = "Hide";
            // if (this.editor.showEditFormula(this.formulaHide)) {
            //     this.formulaHideChanged = true;
            //     lb_formulaHide.Text = this.formulaHide;
            // }
        }

        private cmd_formulaValue_Click(sender: object, e: object) {
            // this.formulaName = "Value";
            // if (this.editor.showEditFormula(this.formulaValue)) {
            //     this.formulaValueChanged = true;
            //     lbFormulaValue.Text = this.formulaValue;
            // }
        }

        private op_afterPrint_Click(sender: object, e: object) {
            this.whenEvalChanged = true;
        }

        private op_beforePrint_Click(sender: object, e: object) {
            this.whenEvalChanged = true;
        }

        private tx_border3D_LostFocus(sender: object, e: object) {
            // try {
            //     shBorder3D.BackColor = Color.FromArgb(Int32.Parse(txBorder3D.Text));
            // }
            // catch (ignore) { }
        }

        private cmd_border3D_click(sender: object, e: object) {
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

        private tx_borderColor_LostFocus(sender: object, e: object) {
            // try {
            //     shBorderColor.BackColor = Color.FromArgb(Int32.Parse(txBorderColor.Text));
            // }
            // catch (ignore) { }
        }

        private cmd_borderColor_Click(sender: object, e: object) {
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

        private tx_borderShadow_LostFocus(sender: object, e: object) {
            // try {
            //     shBorderShadow.BackColor = Color.FromArgb(Int32.Parse(txBorderShadow.Text));
            // }
            // catch (ignore) { }
        }

        private cmd_borderShadow_Click(sender: object, e: object) {
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

        private tx_BorderWidth_TextChanged(sender: object, e: object) {
            this.borderWidthChanged = true;
        }

        private tx_ChartGroupValue_TextChanged(sender: object, e: object) {
            this.chartGroupValueChanged = true;
        }

        private tx_ChartTop_TextChanged(sender: object, e: object) {
            this.chartTopChanged = true;
        }

        private cmd_dbFieldGroupValue_Click(sender: object, e: object) {
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

        private cmd_dbFieldLbl1_Click(sender: object, e: object) {
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

        private cmd_dbFieldLbl2_Click(sender: object, e: object) {
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

        private cmd_dbFieldVal1_Click(sender: object, e: object) {
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

        private cmd_dbFieldVal2_Click(sender: object, e: object) {
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

        private tx_foreColor_LostFocus(sender: object, e: object) {
            // try {
            //     shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text));
            // }
            // catch (ignore) { }
        }

        private tx_backColor_LostFocus(sender: object, e: object) {
            // try {
            //     shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
            // }
            // catch (ignore) { }
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
            this.bSetFormulaHideChanged = false;
            this.bSetFormulaValueChanged = false;
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
            // tab_main.TabPages.Remove(tbpDatabase);
        }

        public hideTabImage() {
            // tab_main.TabPages.Remove(tbpImage);
        }

        public hideTabChart() {
            // tab_main.TabPages.Remove(tbpChart);
        }

        //------------------------------------------------------------------------------------------------------------------

        // setters and getters for no control properties

        //------------------------------------------------------------------------------------------------------------------

        /*
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
		public getDbFieldGroupValue(): string {
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
			// throw new NotImplementedException ();
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

        private fProperties_Load(sender: object, e: object) {
            // this.done = false;
            // tab_main.SelectedTab = tbpFormat;
            // cWindow.centerForm(this);
            // this.ok = false;
            //
            // lb_formulaHide.Text = this.formulaHide;
            // lb_formulaValue.Text = this.formulaValue;
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
            // chk_showOutlines.Checked = true;
            // chk_showBarValues.Checked = true;
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
            // cUtil.listAdd(cb_list, "AliceBlue", (int)0xF0F8FF);
            // cUtil.listAdd(cb_list, "AntiqueWhite ", (int)0xFAEBD7);
            // cUtil.listAdd(cb_list, "Aqua ", (int)0x00FFFF);
            // cUtil.listAdd(cb_list, "Aquamarine ", (int)0x7FFFD4);
            // cUtil.listAdd(cb_list, "Azure ", (int)0xF0FFFF);
            // cUtil.listAdd(cb_list, "Beige ", (int)0xF5F5DC);
            // cUtil.listAdd(cb_list, "Bisque ", (int)0xFFE4C4);
            // cUtil.listAdd(cb_list, "Black ", (int)0x000000);
            // cUtil.listAdd(cb_list, "BlanchedAlmond ", (int)0xFFEBCD);
            // cUtil.listAdd(cb_list, "Blue ", (int)0x0000FF);
            // cUtil.listAdd(cb_list, "BlueViolet ", (int)0x8A2BE2);
            // cUtil.listAdd(cb_list, "Brown ", (int)0xA52A2A);
            // cUtil.listAdd(cb_list, "BurlyWood ", (int)0xDEB887);
            // cUtil.listAdd(cb_list, "CadetBlue ", (int)0x5F9EA0);
            // cUtil.listAdd(cb_list, "Chartreuse ", (int)0x7FFF00);
            // cUtil.listAdd(cb_list, "Chocolate ", (int)0xD2691E);
            // cUtil.listAdd(cb_list, "Coral ", (int)0xFF7F50);
            // cUtil.listAdd(cb_list, "CornflowerBlue ", (int)0x6495ED);
            // cUtil.listAdd(cb_list, "Cornsilk ", (int)0xFFF8DC);
            // cUtil.listAdd(cb_list, "Crimson ", (int)0xDC143C);
            // cUtil.listAdd(cb_list, "Cyan ", (int)0x00FFFF);
            // cUtil.listAdd(cb_list, "DarkBlue ", (int)0x00008B);
            // cUtil.listAdd(cb_list, "DarkCyan ", (int)0x008B8B);
            // cUtil.listAdd(cb_list, "DarkGoldenrod ", (int)0xB8860B);
            // cUtil.listAdd(cb_list, "DarkGray ", (int)0xA9A9A9);
            // cUtil.listAdd(cb_list, "DarkGreen ", (int)0x006400);
            // cUtil.listAdd(cb_list, "DarkKhaki ", (int)0xBDB76B);
            // cUtil.listAdd(cb_list, "DarkMagenta ", (int)0x8B008B);
            // cUtil.listAdd(cb_list, "DarkOliveGreen ", (int)0x556B2F);
            // cUtil.listAdd(cb_list, "DarkOrange ", (int)0xFF8C00);
            // cUtil.listAdd(cb_list, "DarkOrchid ", (int)0x9932CC);
            // cUtil.listAdd(cb_list, "DarkRed ", (int)0x8B0000);
            // cUtil.listAdd(cb_list, "DarkSalmon ", (int)0xE9967A);
            // cUtil.listAdd(cb_list, "DarkSeaGreen ", (int)0x8FBC8B);
            // cUtil.listAdd(cb_list, "DarkSlateBlue ", (int)0x483D8B);
            // cUtil.listAdd(cb_list, "DarkSlateGray ", (int)0x2F4F4F);
            // cUtil.listAdd(cb_list, "DarkTurquoise ", (int)0x00CED1);
            // cUtil.listAdd(cb_list, "DarkViolet ", (int)0x9400D3);
            // cUtil.listAdd(cb_list, "DeepPink ", (int)0xFF1493);
            // cUtil.listAdd(cb_list, "DeepSkyBlue ", (int)0x00BFFF);
            // cUtil.listAdd(cb_list, "DimGray ", (int)0x696969);
            // cUtil.listAdd(cb_list, "DodgerBlue ", (int)0x1E90FF);
            // cUtil.listAdd(cb_list, "Firebrick ", (int)0xB22222);
            // cUtil.listAdd(cb_list, "FloralWhite ", (int)0xFFFAF0);
            // cUtil.listAdd(cb_list, "ForestGreen ", (int)0x228B22);
            // cUtil.listAdd(cb_list, "Fuchsia ", (int)0xFF00FF);
            // cUtil.listAdd(cb_list, "Gainsboro ", (int)0xDCDCDC);
            // cUtil.listAdd(cb_list, "GhostWhite ", (int)0xF8F8FF);
            // cUtil.listAdd(cb_list, "Gold ", (int)0xFFD700);
            // cUtil.listAdd(cb_list, "Goldenrod ", (int)0xDAA520);
            // cUtil.listAdd(cb_list, "Gray ", (int)0x808080);
            // cUtil.listAdd(cb_list, "Green ", (int)0x008000);
            // cUtil.listAdd(cb_list, "GreenYellow ", (int)0xADFF2F);
            // cUtil.listAdd(cb_list, "Honeydew ", (int)0xF0FFF0);
            // cUtil.listAdd(cb_list, "HotPink ", (int)0xFF69B4);
            // cUtil.listAdd(cb_list, "IndianRed ", (int)0xCD5C5C);
            // cUtil.listAdd(cb_list, "Indigo ", (int)0x4B0082);
            // cUtil.listAdd(cb_list, "Ivory ", (int)0xFFFFF0);
            // cUtil.listAdd(cb_list, "Khaki ", (int)0xF0E68C);
            // cUtil.listAdd(cb_list, "Lavender ", (int)0xE6E6FA);
            // cUtil.listAdd(cb_list, "LavenderBlush ", (int)0xFFF0F5);
            // cUtil.listAdd(cb_list, "LawnGreen ", (int)0x7CFC00);
            // cUtil.listAdd(cb_list, "LemonChiffon ", (int)0xFFFACD);
            // cUtil.listAdd(cb_list, "LightBlue ", (int)0xADD8E6);
            // cUtil.listAdd(cb_list, "LightCoral ", (int)0xF08080);
            // cUtil.listAdd(cb_list, "LightCyan ", (int)0xE0FFFF);
            // cUtil.listAdd(cb_list, "LightGoldenrodYellow ", (int)0xFAFAD2);
            // cUtil.listAdd(cb_list, "LightGray ", (int)0xD3D3D3);
            // cUtil.listAdd(cb_list, "LightGreen ", (int)0x90EE90);
            // cUtil.listAdd(cb_list, "LightPink ", (int)0xFFB6C1);
            // cUtil.listAdd(cb_list, "LightSalmon ", (int)0xFFA07A);
            // cUtil.listAdd(cb_list, "LightSeaGreen ", (int)0x20B2AA);
            // cUtil.listAdd(cb_list, "LightSkyBlue ", (int)0x87CEFA);
            // cUtil.listAdd(cb_list, "LightSlateGray ", (int)0x778899);
            // cUtil.listAdd(cb_list, "LightSteelBlue ", (int)0xB0C4DE);
            // cUtil.listAdd(cb_list, "LightYellow ", (int)0xFFFFE0);
            // cUtil.listAdd(cb_list, "Lime ", (int)0x00FF00);
            // cUtil.listAdd(cb_list, "LimeGreen ", (int)0x32CD32);
            // cUtil.listAdd(cb_list, "Linen ", (int)0xFAF0E6);
            // cUtil.listAdd(cb_list, "Magenta ", (int)0xFF00FF);
            // cUtil.listAdd(cb_list, "Maroon ", (int)0x800000);
            // cUtil.listAdd(cb_list, "MediumAquamarine ", (int)0x66CDAA);
            // cUtil.listAdd(cb_list, "MediumBlue ", (int)0x0000CD);
            // cUtil.listAdd(cb_list, "MediumOrchid ", (int)0xBA55D3);
            // cUtil.listAdd(cb_list, "MediumPurple ", (int)0x9370DB);
            // cUtil.listAdd(cb_list, "MediumSeaGreen ", (int)0x3CB371);
            // cUtil.listAdd(cb_list, "MediumSlateBlue ", (int)0x7B68EE);
            // cUtil.listAdd(cb_list, "MediumSpringGreen ", (int)0x00FA9A);
            // cUtil.listAdd(cb_list, "MediumTurquoise ", (int)0x48D1CC);
            // cUtil.listAdd(cb_list, "MediumVioletRed ", (int)0xC71585);
            // cUtil.listAdd(cb_list, "MidnightBlue ", (int)0x191970);
            // cUtil.listAdd(cb_list, "MintCream ", (int)0xF5FFFA);
            // cUtil.listAdd(cb_list, "MistyRose ", (int)0xFFE4E1);
            // cUtil.listAdd(cb_list, "Moccasin ", (int)0xFFE4B5);
            // cUtil.listAdd(cb_list, "NavajoWhite ", (int)0xFFDEAD);
            // cUtil.listAdd(cb_list, "Navy ", (int)0x000080);
            // cUtil.listAdd(cb_list, "OldLace ", (int)0xFDF5E6);
            // cUtil.listAdd(cb_list, "Olive ", (int)0x808000);
            // cUtil.listAdd(cb_list, "OliveDrab ", (int)0x6B8E23);
            // cUtil.listAdd(cb_list, "Orange ", (int)0xFFA500);
            // cUtil.listAdd(cb_list, "OrangeRed ", (int)0xFF4500);
            // cUtil.listAdd(cb_list, "Orchid ", (int)0xDA70D6);
            // cUtil.listAdd(cb_list, "PaleGoldenrod ", (int)0xEEE8AA);
            // cUtil.listAdd(cb_list, "PaleGreen ", (int)0x98FB98);
            // cUtil.listAdd(cb_list, "PaleTurquoise ", (int)0xAFEEEE);
            // cUtil.listAdd(cb_list, "PaleVioletRed ", (int)0xDB7093);
            // cUtil.listAdd(cb_list, "PapayaWhip ", (int)0xFFEFD5);
            // cUtil.listAdd(cb_list, "PeachPuff ", (int)0xFFDAB9);
            // cUtil.listAdd(cb_list, "Peru ", (int)0xCD853F);
            // cUtil.listAdd(cb_list, "Pink ", (int)0xFFC0CB);
            // cUtil.listAdd(cb_list, "Plum ", (int)0xDDA0DD);
            // cUtil.listAdd(cb_list, "PowderBlue ", (int)0xB0E0E6);
            // cUtil.listAdd(cb_list, "Purple ", (int)0x800080);
            // cUtil.listAdd(cb_list, "Red ", (int)0xFF0000);
            // cUtil.listAdd(cb_list, "RosyBrown ", (int)0xBC8F8F);
            // cUtil.listAdd(cb_list, "RoyalBlue ", (int)0x4169E1);
            // cUtil.listAdd(cb_list, "SaddleBrown ", (int)0x8B4513);
            // cUtil.listAdd(cb_list, "Salmon ", (int)0xFA8072);
            // cUtil.listAdd(cb_list, "SandyBrown ", (int)0xF4A460);
            // cUtil.listAdd(cb_list, "SeaGreen ", (int)0x2E8B57);
            // cUtil.listAdd(cb_list, "SeaShell ", (int)0xFFF5EE);
            // cUtil.listAdd(cb_list, "Sienna ", (int)0xA0522D);
            // cUtil.listAdd(cb_list, "Silver ", (int)0xC0C0C0);
            // cUtil.listAdd(cb_list, "SkyBlue ", (int)0x87CEEB);
            // cUtil.listAdd(cb_list, "SlateBlue ", (int)0x6A5ACD);
            // cUtil.listAdd(cb_list, "SlateGray ", (int)0x708090);
            // cUtil.listAdd(cb_list, "Snow ", (int)0xFFFAFA);
            // cUtil.listAdd(cb_list, "SpringGreen ", (int)0x00FF7F);
            // cUtil.listAdd(cb_list, "SteelBlue ", (int)0x4682B4);
            // cUtil.listAdd(cb_list, "Tan ", (int)0xD2B48C);
            // cUtil.listAdd(cb_list, "Teal ", (int)0x008080);
            // cUtil.listAdd(cb_list, "Thistle ", (int)0xD8BFD8);
            // cUtil.listAdd(cb_list, "Tomato ", (int)0xFF6347);
            // cUtil.listAdd(cb_list, "Transparent ", (int)0xFFFF);
            // cUtil.listAdd(cb_list, "Turquoise ", (int)0x40E0D0);
            // cUtil.listAdd(cb_list, "Violet ", (int)0xEE82EE);
            // cUtil.listAdd(cb_list, "Wheat ", (int)0xF5DEB3);
            // cUtil.listAdd(cb_list, "White ", (int)0xFFFFFF);
            // cUtil.listAdd(cb_list, "WhiteSmoke ", (int)0xF5F5F5);
            // cUtil.listAdd(cb_list, "Yellow ", (int)0xFFFF00);
            // cUtil.listAdd(cb_list, "YellowGreen ", (int)0x9ACD32);
        }

        private cmd_cancel_Click(sender: object, e: object) {
            // this.ok = false;
            // this.Hide();
        }

        private cmd_foreColor_Click(sender: object, e: object) {
            // picColor(tx_foreColor, sh_foreColor);
        }

        private cmd_backColor_Click(sender: object, e: object) {
            // picColor(tx_backColor, sh_backColor);
        }

        private picColor(txColor: TextBox, shColor: object) {
            // // Show the color dialog.
            // let result: DialogResult = colorDialog.ShowDialog();
            // // See if user pressed ok.
            // if (result === DialogResult.OK) {
            //     // Set form background to the selected color.
            //     txColor.Text = colorDialog.Color.ToArgb().toString();
            //     shColor.BackColor = colorDialog.Color;
            // }
        }

        private cmd_font_Click(sender: object, e: object) {
            //
            // fontDialog.ShowEffects = true;
            //
            // let fontStyle: FontStyle = FontStyle.Regular;
            // if (chkFontBold.Checked) fontStyle = fontStyle | FontStyle.Bold; {
            // if (chkFontItalic.Checked) fontStyle = fontStyle | FontStyle.Italic; {
            // if (chkFontUnderline.Checked) fontStyle = fontStyle | FontStyle.Underline; {
            // if (chkFontStrike.Checked) fontStyle = fontStyle | FontStyle.Strikeout; {
            //
            // let fontSize: number = Utils.val(txFontSize.Text);
            // let font: Font = new Font(txFont.Text, ((fontSize > 0f) ? fontSize : 3f), fontStyle);
            //
            // fontDialog.Font = font;
            // fontDialog.Color = cColor.colorFromRGB(Utils.valInt(txForeColor.Text));
            //
	        // let result: DialogResult = fontDialog.ShowDialog();
            //
            // if (result === DialogResult.OK) {
            //     font = fontDialog.Font;
            //
            //     txFont.Text = font.Name;
            //     chkFontBold.Checked = font.Bold;
            //     chkFontItalic.Checked = font.Italic;
            //     chkFontUnderline.Checked = font.Underline;
            //     chkFontStrike.Checked = font.Strikeout;
            //     txFontSize.Text = font.Size.toString();
            //     txForeColor.Text = fontDialog.Color.ToArgb().toString();
            //     shForeColor.BackColor = fontDialog.Color;
            // }
        }

        private cmd_borderColor_Click_1(sender: object, e: object) {
            // picColor(tx_borderColor, sh_borderColor);
        }

        private cmd_borderColor3d_Click(sender: object, e: object) {
            // picColor(tx_border3D, sh_border3D);
        }

        private cmd_borderShadowColor_Click(sender: object, e: object) {
            // picColor(tx_borderShadow, sh_borderShadow);
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private cmd_dbField_Click(sender: object, e: object) {
            if (this.editor.showHelpDbField()) {
                this.dbFieldChanged = true;
            }
        }

        private cmd_apply_Click(sender: object, e: object) {
            // this.ok = true;
            // this.Hide();
        }

        private tx_name_TextChanged(sender: object, e: object) {

        }

        private tx_text_TextChanged(sender: object, e: object) {
            this.textChanged = true;
        }

        private tx_tag_TextChanged(sender: object, e: object) {
            this.tagChanged = true;
        }

        private tx_font_TextChanged(sender: object, e: object) {
            this.fontChanged = true;
        }

        private tx_fontSize_TextChanged(sender: object, e: object) {
            this.fontSizeChanged = true;
        }

        private cb_align_SelectedIndexChanged(sender: object, e: object) {
            this.alignChanged = true;
        }

        private tx_foreColor_TextChanged(sender: object, e: object) {
            this.foreColorChanged = true;
        }

        private tx_backColor_TextChanged(sender: object, e: object) {
            this.backColorChanged = true;
        }

        private tx_format_TextChanged(sender: object, e: object) {
            this.formatChanged = true;
        }

        private tx_symbol_TextChanged(sender: object, e: object) {
            this.symbolChanged = true;
        }

        private chk_fontBold_CheckedChanged(sender: object, e: object) {
            this.boldChanged = true;
        }

        private chk_fontUnderline_CheckedChanged(sender: object, e: object) {
            this.underlineChanged = true;
        }

        private chk_fontItalic_CheckedChanged(sender: object, e: object) {
            this.italicChanged = true;
        }

        private chk_fontStrike_CheckedChanged(sender: object, e: object) {
            this.strikeChanged = true;
        }

        private tx_left_TextChanged(sender: object, e: object) {
            this.leftChanged = true;
        }

        private tx_top_TextChanged(sender: object, e: object) {
            this.topChanged = true;
        }

        private tx_height_TextChanged(sender: object, e: object) {
            this.heightChanged = true;
        }

        private tx_width_TextChanged(sender: object, e: object) {
            this.widthChanged = true;
        }

        private chk_canGrow_CheckedChanged(sender: object, e: object) {
            this.canGrowChanged = true;
        }

        private chk_wordWrap_CheckedChanged(sender: object, e: object) {
            this.wordWrapChanged = true;
        }

        private chk_isFreeCtrl_CheckedChanged(sender: object, e: object) {
            this.isFreeCtrlChanged = true;
        }

        private tx_exportColIdx_TextChanged(sender: object, e: object) {
            this.exportColIdxChanged = true;
        }

        private cb_borderType_SelectedIndexChanged(sender: object, e: object) {
            this.borderTypeChanged = true;
        }

        private tx_borderColor_TextChanged(sender: object, e: object) {
            this.borderColorChanged = true;
        }

        private tx_border3D_TextChanged(sender: object, e: object) {
            this.border3DChanged = true;
        }

        private tx_borderShadow_TextChanged(sender: object, e: object) {
            this.border3DShadowChanged = true;
        }

        private tx_borderWidth_TextChanged_1(sender: object, e: object) {
            this.borderWidthChanged = true;
        }

        private chk_borderRounded_CheckedChanged(sender: object, e: object) {
            this.borderRoundedChanged = true;
        }

        private cb_type_SelectedIndexChanged(sender: object, e: object) {
            this.chartTypeChanged = true;
        }

        private cb_formatType_SelectedIndexChanged(sender: object, e: object) {
            this.chartFormatTypeChanged = true;
        }

        private cb_linesType_SelectedIndexChanged(sender: object, e: object) {
            this.chartLinesTypeChanged = true;
        }

        private cb_chartSize_SelectedIndexChanged(sender: object, e: object) {
            this.chartSizeChanged = true;
        }

        private tx_chartTop_TextChanged_1(sender: object, e: object) {
            this.chartTopChanged = true;
        }

        private cb_chartThickness_SelectedIndexChanged(sender: object, e: object) {
            this.chartThicknessChanged = true;
        }

        private chk_showBarValues_CheckedChanged(sender: object, e: object) {
            this.chartShowValuesChanged = true;
        }

        private chk_showOutlines_CheckedChanged(sender: object, e: object) {
            this.chartShowLinesChanged = true;
        }

        private chk_sort_CheckedChanged(sender: object, e: object) {
            this.chartSortChanged = true;
        }

        private tx_dbFieldGroupValue_TextChanged(sender: object, e: object) {
            this.chartFieldGroupChanged = true;
        }

        private tx_chartGroupValue_TextChanged_1(sender: object, e: object) {
            this.chartGroupValueChanged = true;
        }

        private tx_dbFieldVal1_TextChanged(sender: object, e: object) {
            this.chartFieldVal1Changed = true;
        }

        private tx_dbFieldLbl1_TextChanged(sender: object, e: object) {
            this.chartFieldLbl1Changed = true;
        }

        private cb_colorSerie1_SelectedIndexChanged(sender: object, e: object) {
            this.chartColorSerie1Changed = true;
        }

        private tx_dbFieldVal2_TextChanged(sender: object, e: object) {
            this.chartFieldVal2Changed = true;
        }

        private tx_dbFieldLbl2_TextChanged(sender: object, e: object) {
            this.chartFieldLbl2Changed = true;
        }

        private cb_colorSerie2_SelectedIndexChanged(sender: object, e: object) {
            this.chartColorSerie2Changed = true;
        }


    } 
}
