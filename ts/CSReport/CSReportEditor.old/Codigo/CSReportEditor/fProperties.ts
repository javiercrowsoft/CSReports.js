(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFProperties = function() {

        const self = {};
        let m_ok = null;
        let m_done = null;

        let m_index = 0;
        let m_fieldType = 0;

        let m_formulaHide = "";
        let m_formulaValue = "";

        let m_formulaName = "";

        let m_isAccounting = null;

        let m_mouse = null;

        const C_LABEL = 0;
        const C_FORMULA = 1;
        const C_FIELD = 2;
        const C_IMAGE = 3;
        const C_CHART = 5;

        let m_textChanged = null;
        let m_tagChanged = null;
        let m_fontChanged = null;
        let m_foreColorChanged = null;
        let m_backColorChanged = null;
        let m_formatChanged = null;
        let m_leftChanged = null;
        let m_topChanged = null;
        let m_heightChanged = null;
        let m_widthChanged = null;
        let m_symbolChanged = null;
        let m_transparentChanged = null;
        let m_strikeChanged = null;
        let m_underlineChanged = null;
        let m_wordWrapChanged = null;
        let m_italicChanged = null;
        let m_boldChanged = null;
        let m_alignChanged = null;
        let m_fontSizeChanged = null;
        let m_canGrowChanged = null;
        let m_formulaHideChanged = null;
        let m_formulaValueChanged = null;
        let m_idxGroupChanged = null;
        let m_whenEvalChanged = null;
        let m_dbFieldChanged = null;
        let m_setFormulaHideChanged = null;
        let m_setFormulaValueChanged = null;
        let m_pictureChanged = null;
        let m_borderTypeChanged = null;
        let m_border3DChanged = null;
        let m_border3DShadowChanged = null;
        let m_borderRoundedChanged = null;
        let m_borderWidthChanged = null;
        let m_borderColorChanged = null;

        let m_chartFieldVal1Changed = null;
        let m_chartFieldVal2Changed = null;
        let m_chartFieldLbl1Changed = null;
        let m_chartFieldLbl2Changed = null;
        let m_chartSizeChanged = null;
        let m_chartThicknessChanged = null;
        let m_chartColorSerie1Changed = null;
        let m_chartColorSerie2Changed = null;
        let m_chartFormatTypeChanged = null;
        let m_chartLinesTypeChanged = null;
        let m_chartTypeChanged = null;
        let m_chartShowLinesChanged = null;
        let m_chartShowValuesChanged = null;
        let m_chartTopChanged = null;
        let m_chartSortChanged = null;

        let m_chartFieldGroupChanged = null;
        let m_chartGroupValueChanged = null;

        let m_isFreeCtrlChanged = null;
        let m_exportColIdxChanged = null;

        let m_chartIndex = null;
        let m_chartFieldType = null;

        let m_chartGroupIndex = 0;
        let m_chartGroupFieldType = 0;

        const fProperties = function() {
            InitializeComponent();
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
            let cancel = false;
            m_formulaName = "Ocultar";
            showFormula(m_formulaHide, cancel);
            if (!cancel) {
                m_formulaHideChanged = true;
                lb_formulaHide.Text = m_formulaHide;
            }
        };

        const cmd_formulaValue_Click = function(sender, e) {
            let cancel = false;
            m_formulaName = "Valor";
            showFormula(m_formulaValue, cancel);
            if (!cancel) {
                m_formulaValueChanged = true;
                lbFormulaValue.Text = m_formulaValue;
            }
        };

        const showFormula = function(formula, cancel) {
            //TODO: fix me
            cancel = false;
            /*
          Iterator listeners = m_listeners.iterator();
          while(listeners.hasNext()) {
              (listeners.next()).showEditFormula(formula, cancel);
          };*/
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

        const cmd_dbField_Click = function(sender, e) {
            /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpDbField(cancel);
            };
            if (!cancel) {
              m_dbFieldChanged = true;
            }
             * */
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

        const cmd_foreColor_Click = function(sender, e) {
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
        };

        const tx_foreColor_LostFocus = function(sender, e) {
            try {
                shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text));
            }
            catch (ignore) { }
        };

        const cmd_backColor_Click = function(sender, e) {
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
        };

        const tx_backColor_LostFocus = function(sender, e) {
            try {
                shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
            }
            catch (ignore) { }
        };

        const cmd_font_Click = function(sender, e) {
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
            tab_main.TabPages.RemoveAt(C_FIELD);
        };

        self.hideTabImage = function() {
            tab_main.TabPages.RemoveAt(C_IMAGE);
        };

        self.hideTabChart = function() {
            tab_main.TabPages.RemoveAt(C_CHART);
        };

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
        return self;

    }
}(globalObject));
