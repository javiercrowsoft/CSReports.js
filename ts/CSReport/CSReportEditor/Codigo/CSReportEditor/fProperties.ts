(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFProperties = function() {

        const self = {};
        let m_editor: cEditor = null;

        let m_ok: boolean = null;
        let m_done: boolean = null;

        let m_index: number= 0;
        let m_fieldType: number= 0;

        let m_formulaHide: string= "";
        let m_formulaValue: string= "";

        let m_formulaName: string= "";

        let m_isAccounting: boolean = null;

        let m_mouse: cMouseWait = null;

        let m_textChanged: boolean = null;
        let m_tagChanged: boolean = null;
        let m_fontChanged: boolean = null;
        let m_foreColorChanged: boolean = null;
        let m_backColorChanged: boolean = null;
        let m_formatChanged: boolean = null;
        let m_leftChanged: boolean = null;
        let m_topChanged: boolean = null;
        let m_heightChanged: boolean = null;
        let m_widthChanged: boolean = null;
        let m_symbolChanged: boolean = null;
        let m_transparentChanged: boolean = null;
        let m_strikeChanged: boolean = null;
        let m_underlineChanged: boolean = null;
        let m_wordWrapChanged: boolean = null;
        let m_italicChanged: boolean = null;
        let m_boldChanged: boolean = null;
        let m_alignChanged: boolean = null;
        let m_fontSizeChanged: boolean = null;
        let m_canGrowChanged: boolean = null;
        let m_formulaHideChanged: boolean = null;
        let m_formulaValueChanged: boolean = null;
        let m_idxGroupChanged: boolean = null;
        let m_whenEvalChanged: boolean = null;
        let m_dbFieldChanged: boolean = null;
        let m_setFormulaHideChanged: boolean = null;
        let m_setFormulaValueChanged: boolean = null;
        let m_pictureChanged: boolean = null;
        let m_borderTypeChanged: boolean = null;
        let m_border3DChanged: boolean = null;
        let m_border3DShadowChanged: boolean = null;
        let m_borderRoundedChanged: boolean = null;
        let m_borderWidthChanged: boolean = null;
        let m_borderColorChanged: boolean = null;

        let m_chartFieldVal1Changed: boolean = null;
        let m_chartFieldVal2Changed: boolean = null;
        let m_chartFieldLbl1Changed: boolean = null;
        let m_chartFieldLbl2Changed: boolean = null;
        let m_chartSizeChanged: boolean = null;
        let m_chartThicknessChanged: boolean = null;
        let m_chartColorSerie1Changed: boolean = null;
        let m_chartColorSerie2Changed: boolean = null;
        let m_chartFormatTypeChanged: boolean = null;
        let m_chartLinesTypeChanged: boolean = null;
        let m_chartTypeChanged: boolean = null;
        let m_chartShowLinesChanged: boolean = null;
        let m_chartShowValuesChanged: boolean = null;
        let m_chartTopChanged: boolean = null;
        let m_chartSortChanged: boolean = null;

        let m_chartFieldGroupChanged: boolean = null;
        let m_chartGroupValueChanged: boolean = null;

        let m_isFreeCtrlChanged: boolean = null;
        let m_exportColIdxChanged: boolean = null;

        let m_chartIndex: int[] = null;
        let m_chartFieldType: int[] = null;

        let m_chartGroupIndex: number= 0;
        let m_chartGroupFieldType: number= 0;

        const fProperties = function() {
            InitializeComponent();

            cb_align.Items.Clear();
            cUtil.listAdd(cb_align, "Left", (int)CSReportGlobals.HorizontalAlignment.Left);
            cUtil.listAdd(cb_align, "Right", (int)CSReportGlobals.HorizontalAlignment.Right);
            cUtil.listAdd(cb_align, "Center", (int)CSReportGlobals.HorizontalAlignment.Center);

            cb_borderType.Items.Clear();
            cUtil.listAdd(cb_borderType, "Flat", (int)csReportBorderType.CSRPTBSFIXED);
            cUtil.listAdd(cb_borderType, "3D", (int)csReportBorderType.CSRPTBS3D);
            cUtil.listAdd(cb_borderType, "(Ninguno)", (int)csReportBorderType.CSRPTBSNONE);

            G.redim(m_chartFieldType, 3);
            G.redim(m_chartIndex, 3);

            initChart();
        };

        // properties

        self.getPictureChanged = function() {
            return m_pictureChanged;
        };

        self.setPictureChanged = function(rhs) {
            m_pictureChanged = rhs;
        };

        self.getOk = function() {
            return m_ok;
        };

        self.getIndex = function() {
            return m_index;
        };

        self.getChartGroupIndex = function() {
            return m_chartGroupIndex;
        };

        self.getChartIndex = function(idx) {
            return m_chartIndex[idx];
        };

        self.getFieldType = function() {
            return m_fieldType;
        };

        self.getChartFieldType = function(idx) {
            return m_chartFieldType[idx];
        };

        self.getChartGroupFieldType = function() {
            return m_chartGroupFieldType;
        };

        self.setIndex = function(rhs) {
            m_index = rhs;
        };

        self.setChartGroupIndex = function(rhs) {
            m_chartGroupIndex = rhs;
        };

        self.setChartIndex = function(idx, rhs) {
            m_chartIndex[idx] = rhs;
        };

        self.setFieldType = function(rhs) {
            m_fieldType = rhs;
        };

        self.setChartGroupFieldType = function(rhs) {
            m_chartGroupFieldType = rhs;
        };

        self.setChartFieldType = function(idx, rhs) {
            m_chartFieldType[idx] = rhs;
        };

        self.getFormulaHide = function() {
            return m_formulaHide;
        };

        self.setFormulaHide = function(rhs) {
            m_formulaHide = rhs;
        };

        self.getFormulaValue = function() {
            return m_formulaValue;
        };

        self.setFormulaValue = function(rhs) {
            m_formulaValue = rhs;
        };

        self.getFormulaName = function() {
            return m_formulaName;
        };

        self.setFormulaName = function(rhs) {
            m_formulaName = rhs;
        };

        self.getIsAccounting = function() {
            return m_isAccounting;
        };

        self.setIsAccounting = function(rhs) {
            m_isAccounting = rhs;
        };

        self.getTextChanged = function() {
            return m_textChanged;
        };

        self.setTextChanged = function(rhs) {
            m_textChanged = rhs;
        };

        self.getTagChanged = function() {
            return m_tagChanged;
        };

        self.setTagChanged = function(rhs) {
            m_tagChanged = rhs;
        };

        self.getFontChanged = function() {
            return m_fontChanged;
        };

        self.setFontChanged = function(rhs) {
            m_fontChanged = rhs;
        };

        self.getForeColorChanged = function() {
            return m_foreColorChanged;
        };

        self.setForeColorChanged = function(rhs) {
            m_foreColorChanged = rhs;
        };

        self.getBackColorChanged = function() {
            return m_backColorChanged;
        };

        self.setBackColorChanged = function(rhs) {
            m_backColorChanged = rhs;
        };

        self.getFormatChanged = function() {
            return m_formatChanged;
        };

        self.setFormatChanged = function(rhs) {
            m_formatChanged = rhs;
        };

        self.getLeftChanged = function() {
            return m_leftChanged;
        };

        self.setLeftChanged = function(rhs) {
            m_leftChanged = rhs;
        };

        self.getTopChanged = function() {
            return m_topChanged;
        };

        self.setTopChanged = function(rhs) {
            m_topChanged = rhs;
        };

        self.getHeightChanged = function() {
            return m_heightChanged;
        };

        self.setHeightChanged = function(rhs) {
            m_heightChanged = rhs;
        };

        self.getWidthChanged = function() {
            return m_widthChanged;
        };

        self.setWidthChanged = function(rhs) {
            m_widthChanged = rhs;
        };

        self.getSymbolChanged = function() {
            return m_symbolChanged;
        };

        self.setSymbolChanged = function(rhs) {
            m_symbolChanged = rhs;
        };

        self.getTransparentChanged = function() {
            return m_transparentChanged;
        };

        self.setTransparentChanged = function(rhs) {
            m_transparentChanged = rhs;
        };

        self.getStrikeChanged = function() {
            return m_strikeChanged;
        };

        self.setStrikeChanged = function(rhs) {
            m_strikeChanged = rhs;
        };

        self.getUnderlineChanged = function() {
            return m_underlineChanged;
        };

        self.setUnderlineChanged = function(rhs) {
            m_underlineChanged = rhs;
        };

        self.getWordWrapChanged = function() {
            return m_wordWrapChanged;
        };

        self.setWordWrapChanged = function(rhs) {
            m_wordWrapChanged = rhs;
        };

        self.getItalicChanged = function() {
            return m_italicChanged;
        };

        self.setItalicChanged = function(rhs) {
            m_italicChanged = rhs;
        };

        self.getBoldChanged = function() {
            return m_boldChanged;
        };

        self.setBoldChanged = function(rhs) {
            m_boldChanged = rhs;
        };

        self.getAlignChanged = function() {
            return m_alignChanged;
        };

        self.setAlignChanged = function(rhs) {
            m_alignChanged = rhs;
        };

        self.getFontSizeChanged = function() {
            return m_fontSizeChanged;
        };

        self.setFontSizeChanged = function(rhs) {
            m_fontSizeChanged = rhs;
        };

        self.getCanGrowChanged = function() {
            return m_canGrowChanged;
        };

        self.setCanGrowChanged = function(rhs) {
            m_canGrowChanged = rhs;
        };

        self.getFormulaHideChanged = function() {
            return m_formulaHideChanged;
        };

        self.setFormulaHideChanged = function(rhs) {
            m_formulaHideChanged = rhs;
        };

        self.getFormulaValueChanged = function() {
            return m_formulaValueChanged;
        };

        self.setFormulaValueChanged = function(rhs) {
            m_formulaValueChanged = rhs;
        };

        self.getWhenEvalChanged = function() {
            return m_whenEvalChanged;
        };

        self.setWhenEvalChanged = function(rhs) {
            m_whenEvalChanged = rhs;
        };

        self.getIdxGroupChanged = function() {
            return m_idxGroupChanged;
        };

        self.setIdxGroupChanged = function(rhs) {
            m_idxGroupChanged = rhs;
        };

        self.getDbFieldChanged = function() {
            return m_dbFieldChanged;
        };

        self.setDbFieldChanged = function(rhs) {
            m_dbFieldChanged = rhs;
        };

        self.getSetFormulaHideChanged = function() {
            return m_setFormulaHideChanged;
        };

        self.setSetFormulaHideChanged = function(rhs) {
            m_setFormulaHideChanged = rhs;
        };

        self.getSetFormulaValueChanged = function() {
            return m_setFormulaValueChanged;
        };

        self.setSetFormulaValueChanged = function(rhs) {
            m_setFormulaValueChanged = rhs;
        };

        self.getBorderTypeChanged = function() {
            return m_borderTypeChanged;
        };

        self.setBorderTypeChanged = function(rhs) {
            m_borderTypeChanged = rhs;
        };

        self.getBorder3DChanged = function() {
            return m_border3DChanged;
        };

        self.setBorder3DChanged = function(rhs) {
            m_border3DChanged = rhs;
        };

        self.getBorder3DShadowChanged = function() {
            return m_border3DShadowChanged;
        };

        self.setBorder3DShadowChanged = function(rhs) {
            m_border3DShadowChanged = rhs;
        };

        self.getBorderRoundedChanged = function() {
            return m_borderRoundedChanged;
        };

        self.setBorderRoundedChanged = function(rhs) {
            m_borderRoundedChanged = rhs;
        };

        self.getBorderWidthChanged = function() {
            return m_borderWidthChanged;
        };

        self.setBorderWidthChanged = function(rhs) {
            m_borderWidthChanged = rhs;
        };

        self.getBorderColorChanged = function() {
            return m_borderColorChanged;
        };

        self.setBorderColorChanged = function(rhs) {
            m_borderColorChanged = rhs;
        };

        self.getChartFieldVal1Changed = function() {
            return m_chartFieldVal1Changed;
        };

        self.setChartFieldVal1Changed = function(rhs) {
            m_chartFieldVal1Changed = rhs;
        };

        self.getChartFieldVal2Changed = function() {
            return m_chartFieldVal2Changed;
        };

        self.setChartFieldVal2Changed = function(rhs) {
            m_chartFieldVal2Changed = rhs;
        };

        self.getChartFieldLbl1Changed = function() {
            return m_chartFieldLbl1Changed;
        };

        self.setChartFieldLbl1Changed = function(rhs) {
            m_chartFieldLbl1Changed = rhs;
        };

        self.getChartFieldGroupChanged = function() {
            return m_chartFieldGroupChanged;
        };

        self.setChartFieldGroupChanged = function(rhs) {
            m_chartFieldGroupChanged = rhs;
        };

        self.getChartGroupValueChanged = function() {
            return m_chartGroupValueChanged;
        };

        self.setChartGroupValueChanged = function(rhs) {
            m_chartGroupValueChanged = rhs;
        };

        self.getChartFieldLbl2Changed = function() {
            return m_chartFieldLbl2Changed;
        };

        self.setChartFieldLbl2Changed = function(rhs) {
            m_chartFieldLbl2Changed = rhs;
        };

        self.getChartSizeChanged = function() {
            return m_chartSizeChanged;
        };

        self.setChartSizeChanged = function(rhs) {
            m_chartSizeChanged = rhs;
        };

        self.getChartThicknessChanged = function() {
            return m_chartThicknessChanged;
        };

        self.setChartThicknessChanged = function(rhs) {
            m_chartThicknessChanged = rhs;
        };

        self.getChartColorSerie1Changed = function() {
            return m_chartColorSerie1Changed;
        };

        self.setChartColorSerie1Changed = function(rhs) {
            m_chartColorSerie1Changed = rhs;
        };

        self.getChartColorSerie2Changed = function() {
            return m_chartColorSerie2Changed;
        };

        self.setChartColorSerie2Changed = function(rhs) {
            m_chartColorSerie2Changed = rhs;
        };

        self.getChartFormatTypeChanged = function() {
            return m_chartFormatTypeChanged;
        };

        self.setChartFormatTypeChanged = function(rhs) {
            m_chartFormatTypeChanged = rhs;
        };

        self.getChartLinesTypeChanged = function() {
            return m_chartLinesTypeChanged;
        };

        self.setChartLinesTypeChanged = function(rhs) {
            m_chartLinesTypeChanged = rhs;
        };

        self.getChartTypeChanged = function() {
            return m_chartTypeChanged;
        };

        self.setChartTypeChanged = function(rhs) {
            m_chartTypeChanged = rhs;
        };

        self.getChartShowLinesChanged = function() {
            return m_chartShowLinesChanged;
        };

        self.setChartShowLinesChanged = function(rhs) {
            m_chartShowLinesChanged = rhs;
        };

        self.getChartShowValuesChanged = function() {
            return m_chartShowValuesChanged;
        };

        self.setChartShowValuesChanged = function(rhs) {
            m_chartShowValuesChanged = rhs;
        };

        self.getChartTopChanged = function() {
            return m_chartTopChanged;
        };

        self.setChartTopChanged = function(rhs) {
            m_chartTopChanged = rhs;
        };

        self.getChartSortChanged = function() {
            return m_chartSortChanged;
        };

        self.setChartSortChanged = function(rhs) {
            m_chartSortChanged = rhs;
        };

        self.getIsFreeCtrlChanged = function() {
            return m_isFreeCtrlChanged;
        };

        self.setIsFreeCtrlChanged = function(rhs) {
            m_isFreeCtrlChanged = rhs;
        };

        self.getExportColIdxChanged = function() {
            return m_exportColIdxChanged;
        };

        self.setExportColIdxChanged = function(rhs) {
            m_exportColIdxChanged = rhs;
        };        

        //------------------------------------------------------------------------------------------------------------------

        // change events

        //------------------------------------------------------------------------------------------------------------------

        const cb_align_Click = function(sender, e) {
            m_alignChanged = true;
        };

        const cb_borderType_Click = function(sender, e) {
            m_borderTypeChanged = true;
        };

        const chk_borderRounded_Click = function(sender, e) {
            m_borderRoundedChanged = true;
        };

        const chk_formulaHide_Click = function(sender, e) {
            m_setFormulaHideChanged = true;
        };

        const chk_formulaValue_Click = function(sender, e) {
            m_setFormulaValueChanged = true;
        };

        const cmd_formulaHide_Click = function(sender, e) {
            m_formulaName = "Hide";
            if (m_editor.showEditFormula(m_formulaHide)) {
                m_formulaHideChanged = true;
                lb_formulaHide.Text = m_formulaHide;
            }
        };

        const cmd_formulaValue_Click = function(sender, e) {
            m_formulaName = "Value";
            if (m_editor.showEditFormula(m_formulaValue)) {
                m_formulaValueChanged = true;
                lbFormulaValue.Text = m_formulaValue;
            }
        };

        const op_afterPrint_Click = function(sender, e) {
            m_whenEvalChanged = true;
        };

        const op_beforePrint_Click = function(sender, e) {
            m_whenEvalChanged = true;
        };

        const tx_border3D_LostFocus = function(sender, e) {
            try {
                shBorder3D.BackColor = Color.FromArgb(Int32.Parse(txBorder3D.Text));
            }
            catch (ignore) { }
        };

        const cmd_border3D_click = function(sender, e) {
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
        };

        const tx_borderColor_LostFocus = function(sender, e) {
            try {
                shBorderColor.BackColor = Color.FromArgb(Int32.Parse(txBorderColor.Text));
            }
            catch (ignore) { }
        };

        const cmd_borderColor_Click = function(sender, e) {
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
        };

        const tx_borderShadow_LostFocus = function(sender, e) {
            try {
                shBorderShadow.BackColor = Color.FromArgb(Int32.Parse(txBorderShadow.Text));
            }
            catch (ignore) { }
        };

        const cmd_borderShadow_Click = function(sender, e) {
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
        };

        const tx_BorderWidth_TextChanged = function(sender, e) {
            m_borderWidthChanged = true;
        };

        const tx_ChartGroupValue_TextChanged = function(sender, e) {
            m_chartGroupValueChanged = true;
        };

        const tx_ChartTop_TextChanged = function(sender, e) {
            m_chartTopChanged = true;
        };

        const cmd_dbFieldGroupValue_Click = function(sender, e) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartGroupField(cancel);
            };
            if (!cancel) {
              m_chartFieldGroupChanged = true;
            }
             * */
        };

        const cmd_dbFieldLbl1_Click = function(sender, e) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl1, 2);
            };
            if (!cancel) {
              m_chartFieldLbl1Changed = true;
            }
             * */
        };

        const cmd_dbFieldLbl2_Click = function(sender, e) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl2, 3);
            };
            if (!cancel) {
              m_chartFieldLbl2Changed = true;
            }
             * */
        };

        const cmd_dbFieldVal1_Click = function(sender, e) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal1, 0);
            };
            if (!cancel) {
              m_chartFieldVal1Changed = true;
            }
             * */
        };

        const cmd_dbFieldVal2_Click = function(sender, e) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal2, 1);
            };
            if (!cancel) {
              m_chartFieldVal2Changed = true;
            }
             * */
        };

        const tx_foreColor_LostFocus = function(sender, e) {
            try {
                shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text));
            }
            catch (ignore) { }
        };

        const tx_backColor_LostFocus = function(sender, e) {
            try {
                shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
            }
            catch (ignore) { }
        };

        //------------------------------------------------------------------------------------------------------------------

        // initializers

        //------------------------------------------------------------------------------------------------------------------

        self.resetChangedFlags = function() {
            m_textChanged = false;
            m_tagChanged = false;
            m_fontChanged = false;
            m_foreColorChanged = false;
            m_backColorChanged = false;
            m_formatChanged = false;
            m_leftChanged = false;
            m_topChanged = false;
            m_heightChanged = false;
            m_widthChanged = false;
            m_symbolChanged = false;
            m_transparentChanged = false;
            m_strikeChanged = false;
            m_underlineChanged = false;
            m_wordWrapChanged = false;
            m_italicChanged = false;
            m_boldChanged = false;
            m_alignChanged = false;
            m_fontSizeChanged = false;
            m_canGrowChanged = false;
            m_formulaHideChanged = false;
            m_formulaValueChanged = false;
            m_idxGroupChanged = false;
            m_whenEvalChanged = false;
            m_dbFieldChanged = false;
            m_setFormulaHideChanged = false;
            m_setFormulaValueChanged = false;
            m_pictureChanged = false;
            m_borderTypeChanged = false;
            m_border3DChanged = false;
            m_border3DShadowChanged = false;
            m_borderRoundedChanged = false;
            m_borderWidthChanged = false;
            m_borderColorChanged = false;

            m_chartFieldGroupChanged = false;
            m_chartFieldLbl1Changed = false;
            m_chartFieldLbl2Changed = false;
            m_chartFieldVal1Changed = false;
            m_chartFieldVal2Changed = false;

            m_chartSizeChanged = false;
            m_chartThicknessChanged = false;
            m_chartColorSerie1Changed = false;
            m_chartColorSerie2Changed = false;
            m_chartFormatTypeChanged = false;
            m_chartLinesTypeChanged = false;
            m_chartTypeChanged = false;
            m_chartShowLinesChanged = false;
            m_chartShowValuesChanged = false;
            m_chartTopChanged = false;
            m_chartTopChanged = false;

            m_chartFieldGroupChanged = false;
            m_chartGroupValueChanged = false;

            m_isFreeCtrlChanged = false;
            m_exportColIdxChanged = false;

        };

        self.hideTabField = function() {
            tab_main.TabPages.Remove(tbpDatabase);
        };

        self.hideTabImage = function() {
            tab_main.TabPages.Remove(tbpImage);
        };

        self.hideTabChart = function() {
            tab_main.TabPages.Remove(tbpChart);
        };

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
		self. = function() {
			throw new NotImplementedException ();
		};
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
		self. = function(sField) {
			throw new NotImplementedException ();
		};
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

        const fProperties_Load = function(sender, e) {
            m_done = false;
            tab_main.SelectedTab = tbpFormat;
            cWindow.centerForm(this);
            m_ok = false;

            lb_formulaHide.Text = m_formulaHide;
            lb_formulaValue.Text = m_formulaValue;
        };

        const initChart = function() {
            cUtil.listAdd(cb_formatType, "BMP", (int)csRptChartFormat.BMP);
            cUtil.listAdd(cb_formatType, "JPG", (int)csRptChartFormat.JPEG);
            cUtil.listAdd(cb_formatType, "GIF", (int)csRptChartFormat.GIF);
            cUtil.listAdd(cb_formatType, "PNG", (int)csRptChartFormat.PNG);
            cUtil.listSetListIndex(cbFormatType, 0);

            cUtil.listAdd(cb_type, "Pie", (int)csRptChartType.PIE);
            cUtil.listAdd(cb_type, "Bar", (int)csRptChartType.BAR);
            cUtil.listSetListIndex(cb_type, 0);

            chk_showOutlines.Checked = true;
            chk_showBarValues.Checked = true;

            pFillColors(cbColorSerie1);
            cUtil.listSetListIndex(cb_colorSerie1, 10);

            pFillColors(cbColorSerie2);
            cUtil.listSetListIndex(cb_colorSerie2, 69);

            cUtil.listAdd(cb_chartSize, "Smallest", 50);
            cUtil.listAdd(cb_chartSize, "Smaller", 100);
            cUtil.listAdd(cb_chartSize, "Small", 150);
            cUtil.listAdd(cb_chartSize, "Medium", 200);
            cUtil.listAdd(cb_chartSize, "Large", 250);
            cUtil.listAdd(cb_chartSize, "Big", 350);
            cUtil.listSetListIndex(cb_chartSize, 3);

            cUtil.listAdd(cb_chartThickness, "None", 0);
            cUtil.listAdd(cb_chartThickness, "Wafer", 2);
            cUtil.listAdd(cb_chartThickness, "Thin", 4);
            cUtil.listAdd(cb_chartThickness, "Medium", 8);
            cUtil.listAdd(cb_chartThickness, "Thick", 16);
            cUtil.listAdd(cb_chartThickness, "Thickest", 32);
            cUtil.listSetListIndex(cb_chartThickness, 2);

            cUtil.listAdd(cb_linesType, "None", (int)csRptChartLineStyle.NONE);
            cUtil.listAdd(cb_linesType, "Horizontal", (int)csRptChartLineStyle.HORIZONTAL);
            cUtil.listAdd(cb_linesType, "Numbered", (int)csRptChartLineStyle.NUMBERED);
            cUtil.listAdd(cb_linesType, "Both", (int)csRptChartLineStyle.BOTH);
            cUtil.listSetListIndex(cb_linesType, 3);

          };

        const pFillColors = function(cb_list) {
            cUtil.listAdd(cb_list, "AliceBlue", (int)0xF0F8FF);
            cUtil.listAdd(cb_list, "AntiqueWhite ", (int)0xFAEBD7);
            cUtil.listAdd(cb_list, "Aqua ", (int)0x00FFFF);
            cUtil.listAdd(cb_list, "Aquamarine ", (int)0x7FFFD4);
            cUtil.listAdd(cb_list, "Azure ", (int)0xF0FFFF);
            cUtil.listAdd(cb_list, "Beige ", (int)0xF5F5DC);
            cUtil.listAdd(cb_list, "Bisque ", (int)0xFFE4C4);
            cUtil.listAdd(cb_list, "Black ", (int)0x000000);
            cUtil.listAdd(cb_list, "BlanchedAlmond ", (int)0xFFEBCD);
            cUtil.listAdd(cb_list, "Blue ", (int)0x0000FF);
            cUtil.listAdd(cb_list, "BlueViolet ", (int)0x8A2BE2);
            cUtil.listAdd(cb_list, "Brown ", (int)0xA52A2A);
            cUtil.listAdd(cb_list, "BurlyWood ", (int)0xDEB887);
            cUtil.listAdd(cb_list, "CadetBlue ", (int)0x5F9EA0);
            cUtil.listAdd(cb_list, "Chartreuse ", (int)0x7FFF00);
            cUtil.listAdd(cb_list, "Chocolate ", (int)0xD2691E);
            cUtil.listAdd(cb_list, "Coral ", (int)0xFF7F50);
            cUtil.listAdd(cb_list, "CornflowerBlue ", (int)0x6495ED);
            cUtil.listAdd(cb_list, "Cornsilk ", (int)0xFFF8DC);
            cUtil.listAdd(cb_list, "Crimson ", (int)0xDC143C);
            cUtil.listAdd(cb_list, "Cyan ", (int)0x00FFFF);
            cUtil.listAdd(cb_list, "DarkBlue ", (int)0x00008B);
            cUtil.listAdd(cb_list, "DarkCyan ", (int)0x008B8B);
            cUtil.listAdd(cb_list, "DarkGoldenrod ", (int)0xB8860B);
            cUtil.listAdd(cb_list, "DarkGray ", (int)0xA9A9A9);
            cUtil.listAdd(cb_list, "DarkGreen ", (int)0x006400);
            cUtil.listAdd(cb_list, "DarkKhaki ", (int)0xBDB76B);
            cUtil.listAdd(cb_list, "DarkMagenta ", (int)0x8B008B);
            cUtil.listAdd(cb_list, "DarkOliveGreen ", (int)0x556B2F);
            cUtil.listAdd(cb_list, "DarkOrange ", (int)0xFF8C00);
            cUtil.listAdd(cb_list, "DarkOrchid ", (int)0x9932CC);
            cUtil.listAdd(cb_list, "DarkRed ", (int)0x8B0000);
            cUtil.listAdd(cb_list, "DarkSalmon ", (int)0xE9967A);
            cUtil.listAdd(cb_list, "DarkSeaGreen ", (int)0x8FBC8B);
            cUtil.listAdd(cb_list, "DarkSlateBlue ", (int)0x483D8B);
            cUtil.listAdd(cb_list, "DarkSlateGray ", (int)0x2F4F4F);
            cUtil.listAdd(cb_list, "DarkTurquoise ", (int)0x00CED1);
            cUtil.listAdd(cb_list, "DarkViolet ", (int)0x9400D3);
            cUtil.listAdd(cb_list, "DeepPink ", (int)0xFF1493);
            cUtil.listAdd(cb_list, "DeepSkyBlue ", (int)0x00BFFF);
            cUtil.listAdd(cb_list, "DimGray ", (int)0x696969);
            cUtil.listAdd(cb_list, "DodgerBlue ", (int)0x1E90FF);
            cUtil.listAdd(cb_list, "Firebrick ", (int)0xB22222);
            cUtil.listAdd(cb_list, "FloralWhite ", (int)0xFFFAF0);
            cUtil.listAdd(cb_list, "ForestGreen ", (int)0x228B22);
            cUtil.listAdd(cb_list, "Fuchsia ", (int)0xFF00FF);
            cUtil.listAdd(cb_list, "Gainsboro ", (int)0xDCDCDC);
            cUtil.listAdd(cb_list, "GhostWhite ", (int)0xF8F8FF);
            cUtil.listAdd(cb_list, "Gold ", (int)0xFFD700);
            cUtil.listAdd(cb_list, "Goldenrod ", (int)0xDAA520);
            cUtil.listAdd(cb_list, "Gray ", (int)0x808080);
            cUtil.listAdd(cb_list, "Green ", (int)0x008000);
            cUtil.listAdd(cb_list, "GreenYellow ", (int)0xADFF2F);
            cUtil.listAdd(cb_list, "Honeydew ", (int)0xF0FFF0);
            cUtil.listAdd(cb_list, "HotPink ", (int)0xFF69B4);
            cUtil.listAdd(cb_list, "IndianRed ", (int)0xCD5C5C);
            cUtil.listAdd(cb_list, "Indigo ", (int)0x4B0082);
            cUtil.listAdd(cb_list, "Ivory ", (int)0xFFFFF0);
            cUtil.listAdd(cb_list, "Khaki ", (int)0xF0E68C);
            cUtil.listAdd(cb_list, "Lavender ", (int)0xE6E6FA);
            cUtil.listAdd(cb_list, "LavenderBlush ", (int)0xFFF0F5);
            cUtil.listAdd(cb_list, "LawnGreen ", (int)0x7CFC00);
            cUtil.listAdd(cb_list, "LemonChiffon ", (int)0xFFFACD);
            cUtil.listAdd(cb_list, "LightBlue ", (int)0xADD8E6);
            cUtil.listAdd(cb_list, "LightCoral ", (int)0xF08080);
            cUtil.listAdd(cb_list, "LightCyan ", (int)0xE0FFFF);
            cUtil.listAdd(cb_list, "LightGoldenrodYellow ", (int)0xFAFAD2);
            cUtil.listAdd(cb_list, "LightGray ", (int)0xD3D3D3);
            cUtil.listAdd(cb_list, "LightGreen ", (int)0x90EE90);
            cUtil.listAdd(cb_list, "LightPink ", (int)0xFFB6C1);
            cUtil.listAdd(cb_list, "LightSalmon ", (int)0xFFA07A);
            cUtil.listAdd(cb_list, "LightSeaGreen ", (int)0x20B2AA);
            cUtil.listAdd(cb_list, "LightSkyBlue ", (int)0x87CEFA);
            cUtil.listAdd(cb_list, "LightSlateGray ", (int)0x778899);
            cUtil.listAdd(cb_list, "LightSteelBlue ", (int)0xB0C4DE);
            cUtil.listAdd(cb_list, "LightYellow ", (int)0xFFFFE0);
            cUtil.listAdd(cb_list, "Lime ", (int)0x00FF00);
            cUtil.listAdd(cb_list, "LimeGreen ", (int)0x32CD32);
            cUtil.listAdd(cb_list, "Linen ", (int)0xFAF0E6);
            cUtil.listAdd(cb_list, "Magenta ", (int)0xFF00FF);
            cUtil.listAdd(cb_list, "Maroon ", (int)0x800000);
            cUtil.listAdd(cb_list, "MediumAquamarine ", (int)0x66CDAA);
            cUtil.listAdd(cb_list, "MediumBlue ", (int)0x0000CD);
            cUtil.listAdd(cb_list, "MediumOrchid ", (int)0xBA55D3);
            cUtil.listAdd(cb_list, "MediumPurple ", (int)0x9370DB);
            cUtil.listAdd(cb_list, "MediumSeaGreen ", (int)0x3CB371);
            cUtil.listAdd(cb_list, "MediumSlateBlue ", (int)0x7B68EE);
            cUtil.listAdd(cb_list, "MediumSpringGreen ", (int)0x00FA9A);
            cUtil.listAdd(cb_list, "MediumTurquoise ", (int)0x48D1CC);
            cUtil.listAdd(cb_list, "MediumVioletRed ", (int)0xC71585);
            cUtil.listAdd(cb_list, "MidnightBlue ", (int)0x191970);
            cUtil.listAdd(cb_list, "MintCream ", (int)0xF5FFFA);
            cUtil.listAdd(cb_list, "MistyRose ", (int)0xFFE4E1);
            cUtil.listAdd(cb_list, "Moccasin ", (int)0xFFE4B5);
            cUtil.listAdd(cb_list, "NavajoWhite ", (int)0xFFDEAD);
            cUtil.listAdd(cb_list, "Navy ", (int)0x000080);
            cUtil.listAdd(cb_list, "OldLace ", (int)0xFDF5E6);
            cUtil.listAdd(cb_list, "Olive ", (int)0x808000);
            cUtil.listAdd(cb_list, "OliveDrab ", (int)0x6B8E23);
            cUtil.listAdd(cb_list, "Orange ", (int)0xFFA500);
            cUtil.listAdd(cb_list, "OrangeRed ", (int)0xFF4500);
            cUtil.listAdd(cb_list, "Orchid ", (int)0xDA70D6);
            cUtil.listAdd(cb_list, "PaleGoldenrod ", (int)0xEEE8AA);
            cUtil.listAdd(cb_list, "PaleGreen ", (int)0x98FB98);
            cUtil.listAdd(cb_list, "PaleTurquoise ", (int)0xAFEEEE);
            cUtil.listAdd(cb_list, "PaleVioletRed ", (int)0xDB7093);
            cUtil.listAdd(cb_list, "PapayaWhip ", (int)0xFFEFD5);
            cUtil.listAdd(cb_list, "PeachPuff ", (int)0xFFDAB9);
            cUtil.listAdd(cb_list, "Peru ", (int)0xCD853F);
            cUtil.listAdd(cb_list, "Pink ", (int)0xFFC0CB);
            cUtil.listAdd(cb_list, "Plum ", (int)0xDDA0DD);
            cUtil.listAdd(cb_list, "PowderBlue ", (int)0xB0E0E6);
            cUtil.listAdd(cb_list, "Purple ", (int)0x800080);
            cUtil.listAdd(cb_list, "Red ", (int)0xFF0000);
            cUtil.listAdd(cb_list, "RosyBrown ", (int)0xBC8F8F);
            cUtil.listAdd(cb_list, "RoyalBlue ", (int)0x4169E1);
            cUtil.listAdd(cb_list, "SaddleBrown ", (int)0x8B4513);
            cUtil.listAdd(cb_list, "Salmon ", (int)0xFA8072);
            cUtil.listAdd(cb_list, "SandyBrown ", (int)0xF4A460);
            cUtil.listAdd(cb_list, "SeaGreen ", (int)0x2E8B57);
            cUtil.listAdd(cb_list, "SeaShell ", (int)0xFFF5EE);
            cUtil.listAdd(cb_list, "Sienna ", (int)0xA0522D);
            cUtil.listAdd(cb_list, "Silver ", (int)0xC0C0C0);
            cUtil.listAdd(cb_list, "SkyBlue ", (int)0x87CEEB);
            cUtil.listAdd(cb_list, "SlateBlue ", (int)0x6A5ACD);
            cUtil.listAdd(cb_list, "SlateGray ", (int)0x708090);
            cUtil.listAdd(cb_list, "Snow ", (int)0xFFFAFA);
            cUtil.listAdd(cb_list, "SpringGreen ", (int)0x00FF7F);
            cUtil.listAdd(cb_list, "SteelBlue ", (int)0x4682B4);
            cUtil.listAdd(cb_list, "Tan ", (int)0xD2B48C);
            cUtil.listAdd(cb_list, "Teal ", (int)0x008080);
            cUtil.listAdd(cb_list, "Thistle ", (int)0xD8BFD8);
            cUtil.listAdd(cb_list, "Tomato ", (int)0xFF6347);
            cUtil.listAdd(cb_list, "Transparent ", (int)0xFFFF);
            cUtil.listAdd(cb_list, "Turquoise ", (int)0x40E0D0);
            cUtil.listAdd(cb_list, "Violet ", (int)0xEE82EE);
            cUtil.listAdd(cb_list, "Wheat ", (int)0xF5DEB3);
            cUtil.listAdd(cb_list, "White ", (int)0xFFFFFF);
            cUtil.listAdd(cb_list, "WhiteSmoke ", (int)0xF5F5F5);
            cUtil.listAdd(cb_list, "Yellow ", (int)0xFFFF00);
            cUtil.listAdd(cb_list, "YellowGreen ", (int)0x9ACD32);
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };

        const cmd_foreColor_Click = function(sender, e) {
            picColor(tx_foreColor, sh_foreColor);
        };

        const cmd_backColor_Click = function(sender, e) {
            picColor(tx_backColor, sh_backColor);
        };

        const picColor = function(txColor, shColor) {
            // Show the color dialog.
            let result: DialogResult= colorDialog.ShowDialog();
            // See if user pressed ok.
            if (result === DialogResult.OK) {
                // Set form background to the selected color.
                txColor.Text = colorDialog.Color.ToArgb().ToString();
                shColor.BackColor = colorDialog.Color;
            }
        };

        const cmd_font_Click = function(sender, e) {

            fontDialog.ShowEffects = true;

            let fontStyle: FontStyle= FontStyle.Regular;
            if (chkFontBold.Checked) fontStyle = fontStyle | FontStyle.Bold; {
            if (chkFontItalic.Checked) fontStyle = fontStyle | FontStyle.Italic; {
            if (chkFontUnderline.Checked) fontStyle = fontStyle | FontStyle.Underline; {
            if (chkFontStrike.Checked) fontStyle = fontStyle | FontStyle.Strikeout; {

            let fontSize: number= cUtil.val(txFontSize.Text);
            let font: Font= new Font(txFont.Text, ((fontSize > 0f) ? fontSize : 3f), fontStyle);

            fontDialog.Font = font;
            fontDialog.Color = cColor.colorFromRGB(cUtil.valAsInt(txForeColor.Text));

	        let result: DialogResult= fontDialog.ShowDialog();

            if (result === DialogResult.OK) {
                font = fontDialog.Font;

                txFont.Text = font.Name;
                chkFontBold.Checked = font.Bold;
                chkFontItalic.Checked = font.Italic;
                chkFontUnderline.Checked = font.Underline;
                chkFontStrike.Checked = font.Strikeout;
                txFontSize.Text = font.Size.ToString();
                txForeColor.Text = fontDialog.Color.ToArgb().ToString();
                shForeColor.BackColor = fontDialog.Color;
            }            
        };

        const cmd_borderColor_Click_1 = function(sender, e) {
            picColor(tx_borderColor, sh_borderColor);
        };

        const cmd_borderColor3d_Click = function(sender, e) {
            picColor(tx_border3D, sh_border3D);
        };

        const cmd_borderShadowColor_Click = function(sender, e) {
            picColor(tx_borderShadow, sh_borderShadow);
        };

        self.setHandler = function(editor) {
            m_editor = editor;
        };

        const cmd_dbField_Click = function(sender, e) {
            if (m_editor.showHelpDbField()) {
                m_dbFieldChanged = true;
            }
        };

        const cmd_apply_Click = function(sender, e) {
            m_ok = true;
            this.Hide();
        };

        const tx_name_TextChanged = function(sender, e) {

        };

        const tx_text_TextChanged = function(sender, e) {
            m_textChanged = true;
        };

        const tx_tag_TextChanged = function(sender, e) {
            m_tagChanged = true;
        };

        const tx_font_TextChanged = function(sender, e) {
            m_fontChanged = true;
        };

        const tx_fontSize_TextChanged = function(sender, e) {
            m_fontSizeChanged = true;
        };

        const cb_align_SelectedIndexChanged = function(sender, e) {
            m_alignChanged = true;
        };

        const tx_foreColor_TextChanged = function(sender, e) {
            m_foreColorChanged = true;
        };

        const tx_backColor_TextChanged = function(sender, e) {
            m_backColorChanged = true;
        };

        const tx_format_TextChanged = function(sender, e) {
            m_formatChanged = true;
        };

        const tx_symbol_TextChanged = function(sender, e) {
            m_symbolChanged = true;
        };

        const chk_fontBold_CheckedChanged = function(sender, e) {
            m_boldChanged = true;
        };

        const chk_fontUnderline_CheckedChanged = function(sender, e) {
            m_underlineChanged = true;
        };

        const chk_fontItalic_CheckedChanged = function(sender, e) {
            m_italicChanged = true;
        };

        const chk_fontStrike_CheckedChanged = function(sender, e) {
            m_strikeChanged = true;
        };

        const tx_left_TextChanged = function(sender, e) {
            m_leftChanged = true;
        };

        const tx_top_TextChanged = function(sender, e) {
            m_topChanged = true;
        };

        const tx_height_TextChanged = function(sender, e) {
            m_heightChanged = true;
        };

        const tx_width_TextChanged = function(sender, e) {
            m_widthChanged = true;
        };

        const chk_canGrow_CheckedChanged = function(sender, e) {
            m_canGrowChanged = true;
        };

        const chk_wordWrap_CheckedChanged = function(sender, e) {
            m_wordWrapChanged = true;
        };

        const chk_isFreeCtrl_CheckedChanged = function(sender, e) {
            m_isFreeCtrlChanged = true;
        };

        const tx_exportColIdx_TextChanged = function(sender, e) {
            m_exportColIdxChanged = true;
        };

        const cb_borderType_SelectedIndexChanged = function(sender, e) {
            m_borderTypeChanged = true;
        };

        const tx_borderColor_TextChanged = function(sender, e) {
            m_borderColorChanged = true;
        };

        const tx_border3D_TextChanged = function(sender, e) {
            m_border3DChanged = true;
        };

        const tx_borderShadow_TextChanged = function(sender, e) {
            m_border3DShadowChanged = true;
        };

        const tx_borderWidth_TextChanged_1 = function(sender, e) {
            m_borderWidthChanged = true;
        };

        const chk_borderRounded_CheckedChanged = function(sender, e) {
            m_borderRoundedChanged = true;
        };

        const cb_type_SelectedIndexChanged = function(sender, e) {
            m_chartTypeChanged = true;
        };

        const cb_formatType_SelectedIndexChanged = function(sender, e) {
            m_chartFormatTypeChanged = true;
        };

        const cb_linesType_SelectedIndexChanged = function(sender, e) {
            m_chartLinesTypeChanged = true;
        };

        const cb_chartSize_SelectedIndexChanged = function(sender, e) {
            m_chartSizeChanged = true;
        };

        const tx_chartTop_TextChanged_1 = function(sender, e) {
            m_chartTopChanged = true;
        };

        const cb_chartThickness_SelectedIndexChanged = function(sender, e) {
            m_chartThicknessChanged = true;
        };

        const chk_showBarValues_CheckedChanged = function(sender, e) {
            m_chartShowValuesChanged = true;
        };

        const chk_showOutlines_CheckedChanged = function(sender, e) {
            m_chartShowLinesChanged = true;
        };

        const chk_sort_CheckedChanged = function(sender, e) {
            m_chartSortChanged = true;
        };

        const tx_dbFieldGroupValue_TextChanged = function(sender, e) {
            m_chartFieldGroupChanged = true;
        };

        const tx_chartGroupValue_TextChanged_1 = function(sender, e) {
            m_chartGroupValueChanged = true;
        };

        const tx_dbFieldVal1_TextChanged = function(sender, e) {
            m_chartFieldVal1Changed = true;
        };

        const tx_dbFieldLbl1_TextChanged = function(sender, e) {
            m_chartFieldLbl1Changed = true;
        };

        const cb_colorSerie1_SelectedIndexChanged = function(sender, e) {
            m_chartColorSerie1Changed = true;
        };

        const tx_dbFieldVal2_TextChanged = function(sender, e) {
            m_chartFieldVal2Changed = true;
        };

        const tx_dbFieldLbl2_TextChanged = function(sender, e) {
            m_chartFieldLbl2Changed = true;
        };

        const cb_colorSerie2_SelectedIndexChanged = function(sender, e) {
            m_chartColorSerie2Changed = true;
        };
        return self;

    }
}(globalObject));
