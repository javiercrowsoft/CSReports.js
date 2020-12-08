(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFProperties = function() {

        const self = {}; //@@@: public partial class fProperties : Form, cIDatabaseFieldSelector
        let m_editor = null; //@@@: private cEditor m_editor;

        let m_ok = null; //@@@: private bool m_ok;
        let m_done = null; //@@@: private bool m_done;

        let m_index = 0; //@@@: private int m_index = 0;
        let m_fieldType = 0; //@@@: private int m_fieldType = 0;

        let m_formulaHide = ""; //@@@: private String m_formulaHide = "";
        let m_formulaValue = ""; //@@@: private String m_formulaValue = "";

        let m_formulaName = ""; //@@@: private String m_formulaName = "";

        let m_isAccounting = null; //@@@: private bool m_isAccounting;

        let m_mouse = null; //@@@: private cMouseWait m_mouse;

        let m_textChanged = null; //@@@: private bool m_textChanged;
        let m_tagChanged = null; //@@@: private bool m_tagChanged;
        let m_fontChanged = null; //@@@: private bool m_fontChanged;
        let m_foreColorChanged = null; //@@@: private bool m_foreColorChanged;
        let m_backColorChanged = null; //@@@: private bool m_backColorChanged;
        let m_formatChanged = null; //@@@: private bool m_formatChanged;
        let m_leftChanged = null; //@@@: private bool m_leftChanged;
        let m_topChanged = null; //@@@: private bool m_topChanged;
        let m_heightChanged = null; //@@@: private bool m_heightChanged;
        let m_widthChanged = null; //@@@: private bool m_widthChanged;
        let m_symbolChanged = null; //@@@: private bool m_symbolChanged;
        let m_transparentChanged = null; //@@@: private bool m_transparentChanged;
        let m_strikeChanged = null; //@@@: private bool m_strikeChanged;
        let m_underlineChanged = null; //@@@: private bool m_underlineChanged;
        let m_wordWrapChanged = null; //@@@: private bool m_wordWrapChanged;
        let m_italicChanged = null; //@@@: private bool m_italicChanged;
        let m_boldChanged = null; //@@@: private bool m_boldChanged;
        let m_alignChanged = null; //@@@: private bool m_alignChanged;
        let m_fontSizeChanged = null; //@@@: private bool m_fontSizeChanged;
        let m_canGrowChanged = null; //@@@: private bool m_canGrowChanged;
        let m_formulaHideChanged = null; //@@@: private bool m_formulaHideChanged;
        let m_formulaValueChanged = null; //@@@: private bool m_formulaValueChanged;
        let m_idxGroupChanged = null; //@@@: private bool m_idxGroupChanged;
        let m_whenEvalChanged = null; //@@@: private bool m_whenEvalChanged;
        let m_dbFieldChanged = null; //@@@: private bool m_dbFieldChanged;
        let m_setFormulaHideChanged = null; //@@@: private bool m_setFormulaHideChanged;
        let m_setFormulaValueChanged = null; //@@@: private bool m_setFormulaValueChanged;
        let m_pictureChanged = null; //@@@: private bool m_pictureChanged;
        let m_borderTypeChanged = null; //@@@: private bool m_borderTypeChanged;
        let m_border3DChanged = null; //@@@: private bool m_border3DChanged;
        let m_border3DShadowChanged = null; //@@@: private bool m_border3DShadowChanged;
        let m_borderRoundedChanged = null; //@@@: private bool m_borderRoundedChanged;
        let m_borderWidthChanged = null; //@@@: private bool m_borderWidthChanged;
        let m_borderColorChanged = null; //@@@: private bool m_borderColorChanged;

        let m_chartFieldVal1Changed = null; //@@@: private bool m_chartFieldVal1Changed;
        let m_chartFieldVal2Changed = null; //@@@: private bool m_chartFieldVal2Changed;
        let m_chartFieldLbl1Changed = null; //@@@: private bool m_chartFieldLbl1Changed;
        let m_chartFieldLbl2Changed = null; //@@@: private bool m_chartFieldLbl2Changed;
        let m_chartSizeChanged = null; //@@@: private bool m_chartSizeChanged;
        let m_chartThicknessChanged = null; //@@@: private bool m_chartThicknessChanged;
        let m_chartColorSerie1Changed = null; //@@@: private bool m_chartColorSerie1Changed;
        let m_chartColorSerie2Changed = null; //@@@: private bool m_chartColorSerie2Changed;
        let m_chartFormatTypeChanged = null; //@@@: private bool m_chartFormatTypeChanged;
        let m_chartLinesTypeChanged = null; //@@@: private bool m_chartLinesTypeChanged;
        let m_chartTypeChanged = null; //@@@: private bool m_chartTypeChanged;
        let m_chartShowLinesChanged = null; //@@@: private bool m_chartShowLinesChanged;
        let m_chartShowValuesChanged = null; //@@@: private bool m_chartShowValuesChanged;
        let m_chartTopChanged = null; //@@@: private bool m_chartTopChanged;
        let m_chartSortChanged = null; //@@@: private bool m_chartSortChanged;

        let m_chartFieldGroupChanged = null; //@@@: private bool m_chartFieldGroupChanged;
        let m_chartGroupValueChanged = null; //@@@: private bool m_chartGroupValueChanged;

        let m_isFreeCtrlChanged = null; //@@@: private bool m_isFreeCtrlChanged;
        let m_exportColIdxChanged = null; //@@@: private bool m_exportColIdxChanged;

        let m_chartIndex = null; //@@@: private int[] m_chartIndex;
        let m_chartFieldType = null; //@@@: private int[] m_chartFieldType;

        let m_chartGroupIndex = 0; //@@@: private int m_chartGroupIndex = 0;
        let m_chartGroupFieldType = 0; //@@@: private int m_chartGroupFieldType = 0;

        const fProperties = function() { //@@@: public fProperties()
            InitializeComponent(); //@@@: InitializeComponent();

            cb_align.Items.Clear(); //@@@: cb_align.Items.Clear();
            cUtil.listAdd(cb_align, "Left", (int)CSReportGlobals.HorizontalAlignment.Left); //@@@: cUtil.listAdd(cb_align, "Left", (int)CSReportGlobals.HorizontalAlignment.Left);
            cUtil.listAdd(cb_align, "Right", (int)CSReportGlobals.HorizontalAlignment.Right); //@@@: cUtil.listAdd(cb_align, "Right", (int)CSReportGlobals.HorizontalAlignment.Right);
            cUtil.listAdd(cb_align, "Center", (int)CSReportGlobals.HorizontalAlignment.Center); //@@@: cUtil.listAdd(cb_align, "Center", (int)CSReportGlobals.HorizontalAlignment.Center);

            cb_borderType.Items.Clear(); //@@@: cb_borderType.Items.Clear();
            cUtil.listAdd(cb_borderType, "Flat", (int)csReportBorderType.CSRPTBSFIXED); //@@@: cUtil.listAdd(cb_borderType, "Flat", (int)csReportBorderType.CSRPTBSFIXED);
            cUtil.listAdd(cb_borderType, "3D", (int)csReportBorderType.CSRPTBS3D); //@@@: cUtil.listAdd(cb_borderType, "3D", (int)csReportBorderType.CSRPTBS3D);
            cUtil.listAdd(cb_borderType, "(Ninguno)", (int)csReportBorderType.CSRPTBSNONE); //@@@: cUtil.listAdd(cb_borderType, "(Ninguno)", (int)csReportBorderType.CSRPTBSNONE);

            G.redim(m_chartFieldType, 3); //@@@: G.redim(ref m_chartFieldType, 3);
            G.redim(m_chartIndex, 3); //@@@: G.redim(ref m_chartIndex, 3);

            initChart(); //@@@: initChart();
        }; //@@@: }

        // properties

        self.getPictureChanged = function() { //@@@: public bool getPictureChanged()
            return m_pictureChanged; //@@@: return m_pictureChanged;
        }; //@@@: }

        self.setPictureChanged = function(rhs) { //@@@: public void setPictureChanged(bool rhs)
            m_pictureChanged = rhs; //@@@: m_pictureChanged = rhs;
        }; //@@@: }

        self.getOk = function() { //@@@: public bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

        self.getIndex = function() { //@@@: public int getIndex()
            return m_index; //@@@: return m_index;
        }; //@@@: }

        self.getChartGroupIndex = function() { //@@@: public int getChartGroupIndex()
            return m_chartGroupIndex; //@@@: return m_chartGroupIndex;
        }; //@@@: }

        self.getChartIndex = function(idx) { //@@@: public int getChartIndex(int idx)
            return m_chartIndex[idx]; //@@@: return m_chartIndex[idx];
        }; //@@@: }

        self.getFieldType = function() { //@@@: public int getFieldType()
            return m_fieldType; //@@@: return m_fieldType;
        }; //@@@: }

        self.getChartFieldType = function(idx) { //@@@: public int getChartFieldType(int idx)
            return m_chartFieldType[idx]; //@@@: return m_chartFieldType[idx];
        }; //@@@: }

        self.getChartGroupFieldType = function() { //@@@: public int getChartGroupFieldType()
            return m_chartGroupFieldType; //@@@: return m_chartGroupFieldType;
        }; //@@@: }

        self.setIndex = function(rhs) { //@@@: public void setIndex(int rhs)
            m_index = rhs; //@@@: m_index = rhs;
        }; //@@@: }

        self.setChartGroupIndex = function(rhs) { //@@@: public void setChartGroupIndex(int rhs)
            m_chartGroupIndex = rhs; //@@@: m_chartGroupIndex = rhs;
        }; //@@@: }

        self.setChartIndex = function(idx, rhs) { //@@@: public void setChartIndex(int idx, int rhs)
            m_chartIndex[idx] = rhs; //@@@: m_chartIndex[idx] = rhs;
        }; //@@@: }

        self.setFieldType = function(rhs) { //@@@: public void setFieldType(int rhs)
            m_fieldType = rhs; //@@@: m_fieldType = rhs;
        }; //@@@: }

        self.setChartGroupFieldType = function(rhs) { //@@@: public void setChartGroupFieldType(int rhs)
            m_chartGroupFieldType = rhs; //@@@: m_chartGroupFieldType = rhs;
        }; //@@@: }

        self.setChartFieldType = function(idx, rhs) { //@@@: public void setChartFieldType(int idx, int rhs)
            m_chartFieldType[idx] = rhs; //@@@: m_chartFieldType[idx] = rhs;
        }; //@@@: }

        self.getFormulaHide = function() { //@@@: public String getFormulaHide()
            return m_formulaHide; //@@@: return m_formulaHide;
        }; //@@@: }

        self.setFormulaHide = function(rhs) { //@@@: public void setFormulaHide(String rhs)
            m_formulaHide = rhs; //@@@: m_formulaHide = rhs;
        }; //@@@: }

        self.getFormulaValue = function() { //@@@: public String getFormulaValue()
            return m_formulaValue; //@@@: return m_formulaValue;
        }; //@@@: }

        self.setFormulaValue = function(rhs) { //@@@: public void setFormulaValue(String rhs)
            m_formulaValue = rhs; //@@@: m_formulaValue = rhs;
        }; //@@@: }

        self.getFormulaName = function() { //@@@: public String getFormulaName()
            return m_formulaName; //@@@: return m_formulaName;
        }; //@@@: }

        self.setFormulaName = function(rhs) { //@@@: public void setFormulaName(String rhs)
            m_formulaName = rhs; //@@@: m_formulaName = rhs;
        }; //@@@: }

        self.getIsAccounting = function() { //@@@: public bool getIsAccounting()
            return m_isAccounting; //@@@: return m_isAccounting;
        }; //@@@: }

        self.setIsAccounting = function(rhs) { //@@@: public void setIsAccounting(bool rhs)
            m_isAccounting = rhs; //@@@: m_isAccounting = rhs;
        }; //@@@: }

        self.getTextChanged = function() { //@@@: public bool getTextChanged()
            return m_textChanged; //@@@: return m_textChanged;
        }; //@@@: }

        self.setTextChanged = function(rhs) { //@@@: public void setTextChanged(bool rhs)
            m_textChanged = rhs; //@@@: m_textChanged = rhs;
        }; //@@@: }

        self.getTagChanged = function() { //@@@: public bool getTagChanged()
            return m_tagChanged; //@@@: return m_tagChanged;
        }; //@@@: }

        self.setTagChanged = function(rhs) { //@@@: public void setTagChanged(bool rhs)
            m_tagChanged = rhs; //@@@: m_tagChanged = rhs;
        }; //@@@: }

        self.getFontChanged = function() { //@@@: public bool getFontChanged()
            return m_fontChanged; //@@@: return m_fontChanged;
        }; //@@@: }

        self.setFontChanged = function(rhs) { //@@@: public void setFontChanged(bool rhs)
            m_fontChanged = rhs; //@@@: m_fontChanged = rhs;
        }; //@@@: }

        self.getForeColorChanged = function() { //@@@: public bool getForeColorChanged()
            return m_foreColorChanged; //@@@: return m_foreColorChanged;
        }; //@@@: }

        self.setForeColorChanged = function(rhs) { //@@@: public void setForeColorChanged(bool rhs)
            m_foreColorChanged = rhs; //@@@: m_foreColorChanged = rhs;
        }; //@@@: }

        self.getBackColorChanged = function() { //@@@: public bool getBackColorChanged()
            return m_backColorChanged; //@@@: return m_backColorChanged;
        }; //@@@: }

        self.setBackColorChanged = function(rhs) { //@@@: public void setBackColorChanged(bool rhs)
            m_backColorChanged = rhs; //@@@: m_backColorChanged = rhs;
        }; //@@@: }

        self.getFormatChanged = function() { //@@@: public bool getFormatChanged()
            return m_formatChanged; //@@@: return m_formatChanged;
        }; //@@@: }

        self.setFormatChanged = function(rhs) { //@@@: public void setFormatChanged(bool rhs)
            m_formatChanged = rhs; //@@@: m_formatChanged = rhs;
        }; //@@@: }

        self.getLeftChanged = function() { //@@@: public bool getLeftChanged()
            return m_leftChanged; //@@@: return m_leftChanged;
        }; //@@@: }

        self.setLeftChanged = function(rhs) { //@@@: public void setLeftChanged(bool rhs)
            m_leftChanged = rhs; //@@@: m_leftChanged = rhs;
        }; //@@@: }

        self.getTopChanged = function() { //@@@: public bool getTopChanged()
            return m_topChanged; //@@@: return m_topChanged;
        }; //@@@: }

        self.setTopChanged = function(rhs) { //@@@: public void setTopChanged(bool rhs)
            m_topChanged = rhs; //@@@: m_topChanged = rhs;
        }; //@@@: }

        self.getHeightChanged = function() { //@@@: public bool getHeightChanged()
            return m_heightChanged; //@@@: return m_heightChanged;
        }; //@@@: }

        self.setHeightChanged = function(rhs) { //@@@: public void setHeightChanged(bool rhs)
            m_heightChanged = rhs; //@@@: m_heightChanged = rhs;
        }; //@@@: }

        self.getWidthChanged = function() { //@@@: public bool getWidthChanged()
            return m_widthChanged; //@@@: return m_widthChanged;
        }; //@@@: }

        self.setWidthChanged = function(rhs) { //@@@: public void setWidthChanged(bool rhs)
            m_widthChanged = rhs; //@@@: m_widthChanged = rhs;
        }; //@@@: }

        self.getSymbolChanged = function() { //@@@: public bool getSymbolChanged()
            return m_symbolChanged; //@@@: return m_symbolChanged;
        }; //@@@: }

        self.setSymbolChanged = function(rhs) { //@@@: public void setSymbolChanged(bool rhs)
            m_symbolChanged = rhs; //@@@: m_symbolChanged = rhs;
        }; //@@@: }

        self.getTransparentChanged = function() { //@@@: public bool getTransparentChanged()
            return m_transparentChanged; //@@@: return m_transparentChanged;
        }; //@@@: }

        self.setTransparentChanged = function(rhs) { //@@@: public void setTransparentChanged(bool rhs)
            m_transparentChanged = rhs; //@@@: m_transparentChanged = rhs;
        }; //@@@: }

        self.getStrikeChanged = function() { //@@@: public bool getStrikeChanged()
            return m_strikeChanged; //@@@: return m_strikeChanged;
        }; //@@@: }

        self.setStrikeChanged = function(rhs) { //@@@: public void setStrikeChanged(bool rhs)
            m_strikeChanged = rhs; //@@@: m_strikeChanged = rhs;
        }; //@@@: }

        self.getUnderlineChanged = function() { //@@@: public bool getUnderlineChanged()
            return m_underlineChanged; //@@@: return m_underlineChanged;
        }; //@@@: }

        self.setUnderlineChanged = function(rhs) { //@@@: public void setUnderlineChanged(bool rhs)
            m_underlineChanged = rhs; //@@@: m_underlineChanged = rhs;
        }; //@@@: }

        self.getWordWrapChanged = function() { //@@@: public bool getWordWrapChanged()
            return m_wordWrapChanged; //@@@: return m_wordWrapChanged;
        }; //@@@: }

        self.setWordWrapChanged = function(rhs) { //@@@: public void setWordWrapChanged(bool rhs)
            m_wordWrapChanged = rhs; //@@@: m_wordWrapChanged = rhs;
        }; //@@@: }

        self.getItalicChanged = function() { //@@@: public bool getItalicChanged()
            return m_italicChanged; //@@@: return m_italicChanged;
        }; //@@@: }

        self.setItalicChanged = function(rhs) { //@@@: public void setItalicChanged(bool rhs)
            m_italicChanged = rhs; //@@@: m_italicChanged = rhs;
        }; //@@@: }

        self.getBoldChanged = function() { //@@@: public bool getBoldChanged()
            return m_boldChanged; //@@@: return m_boldChanged;
        }; //@@@: }

        self.setBoldChanged = function(rhs) { //@@@: public void setBoldChanged(bool rhs)
            m_boldChanged = rhs; //@@@: m_boldChanged = rhs;
        }; //@@@: }

        self.getAlignChanged = function() { //@@@: public bool getAlignChanged()
            return m_alignChanged; //@@@: return m_alignChanged;
        }; //@@@: }

        self.setAlignChanged = function(rhs) { //@@@: public void setAlignChanged(bool rhs)
            m_alignChanged = rhs; //@@@: m_alignChanged = rhs;
        }; //@@@: }

        self.getFontSizeChanged = function() { //@@@: public bool getFontSizeChanged()
            return m_fontSizeChanged; //@@@: return m_fontSizeChanged;
        }; //@@@: }

        self.setFontSizeChanged = function(rhs) { //@@@: public void setFontSizeChanged(bool rhs)
            m_fontSizeChanged = rhs; //@@@: m_fontSizeChanged = rhs;
        }; //@@@: }

        self.getCanGrowChanged = function() { //@@@: public bool getCanGrowChanged()
            return m_canGrowChanged; //@@@: return m_canGrowChanged;
        }; //@@@: }

        self.setCanGrowChanged = function(rhs) { //@@@: public void setCanGrowChanged(bool rhs)
            m_canGrowChanged = rhs; //@@@: m_canGrowChanged = rhs;
        }; //@@@: }

        self.getFormulaHideChanged = function() { //@@@: public bool getFormulaHideChanged()
            return m_formulaHideChanged; //@@@: return m_formulaHideChanged;
        }; //@@@: }

        self.setFormulaHideChanged = function(rhs) { //@@@: public void setFormulaHideChanged(bool rhs)
            m_formulaHideChanged = rhs; //@@@: m_formulaHideChanged = rhs;
        }; //@@@: }

        self.getFormulaValueChanged = function() { //@@@: public bool getFormulaValueChanged()
            return m_formulaValueChanged; //@@@: return m_formulaValueChanged;
        }; //@@@: }

        self.setFormulaValueChanged = function(rhs) { //@@@: public void setFormulaValueChanged(bool rhs)
            m_formulaValueChanged = rhs; //@@@: m_formulaValueChanged = rhs;
        }; //@@@: }

        self.getWhenEvalChanged = function() { //@@@: public bool getWhenEvalChanged()
            return m_whenEvalChanged; //@@@: return m_whenEvalChanged;
        }; //@@@: }

        self.setWhenEvalChanged = function(rhs) { //@@@: public void setWhenEvalChanged(bool rhs)
            m_whenEvalChanged = rhs; //@@@: m_whenEvalChanged = rhs;
        }; //@@@: }

        self.getIdxGroupChanged = function() { //@@@: public bool getIdxGroupChanged()
            return m_idxGroupChanged; //@@@: return m_idxGroupChanged;
        }; //@@@: }

        self.setIdxGroupChanged = function(rhs) { //@@@: public void setIdxGroupChanged(bool rhs)
            m_idxGroupChanged = rhs; //@@@: m_idxGroupChanged = rhs;
        }; //@@@: }

        self.getDbFieldChanged = function() { //@@@: public bool getDbFieldChanged()
            return m_dbFieldChanged; //@@@: return m_dbFieldChanged;
        }; //@@@: }

        self.setDbFieldChanged = function(rhs) { //@@@: public void setDbFieldChanged(bool rhs)
            m_dbFieldChanged = rhs; //@@@: m_dbFieldChanged = rhs;
        }; //@@@: }

        self.getSetFormulaHideChanged = function() { //@@@: public bool getSetFormulaHideChanged()
            return m_setFormulaHideChanged; //@@@: return m_setFormulaHideChanged;
        }; //@@@: }

        self.setSetFormulaHideChanged = function(rhs) { //@@@: public void setSetFormulaHideChanged(bool rhs)
            m_setFormulaHideChanged = rhs; //@@@: m_setFormulaHideChanged = rhs;
        }; //@@@: }

        self.getSetFormulaValueChanged = function() { //@@@: public bool getSetFormulaValueChanged()
            return m_setFormulaValueChanged; //@@@: return m_setFormulaValueChanged;
        }; //@@@: }

        self.setSetFormulaValueChanged = function(rhs) { //@@@: public void setSetFormulaValueChanged(bool rhs)
            m_setFormulaValueChanged = rhs; //@@@: m_setFormulaValueChanged = rhs;
        }; //@@@: }

        self.getBorderTypeChanged = function() { //@@@: public bool getBorderTypeChanged()
            return m_borderTypeChanged; //@@@: return m_borderTypeChanged;
        }; //@@@: }

        self.setBorderTypeChanged = function(rhs) { //@@@: public void setBorderTypeChanged(bool rhs)
            m_borderTypeChanged = rhs; //@@@: m_borderTypeChanged = rhs;
        }; //@@@: }

        self.getBorder3DChanged = function() { //@@@: public bool getBorder3DChanged()
            return m_border3DChanged; //@@@: return m_border3DChanged;
        }; //@@@: }

        self.setBorder3DChanged = function(rhs) { //@@@: public void setBorder3DChanged(bool rhs)
            m_border3DChanged = rhs; //@@@: m_border3DChanged = rhs;
        }; //@@@: }

        self.getBorder3DShadowChanged = function() { //@@@: public bool getBorder3DShadowChanged()
            return m_border3DShadowChanged; //@@@: return m_border3DShadowChanged;
        }; //@@@: }

        self.setBorder3DShadowChanged = function(rhs) { //@@@: public void setBorder3DShadowChanged(bool rhs)
            m_border3DShadowChanged = rhs; //@@@: m_border3DShadowChanged = rhs;
        }; //@@@: }

        self.getBorderRoundedChanged = function() { //@@@: public bool getBorderRoundedChanged()
            return m_borderRoundedChanged; //@@@: return m_borderRoundedChanged;
        }; //@@@: }

        self.setBorderRoundedChanged = function(rhs) { //@@@: public void setBorderRoundedChanged(bool rhs)
            m_borderRoundedChanged = rhs; //@@@: m_borderRoundedChanged = rhs;
        }; //@@@: }

        self.getBorderWidthChanged = function() { //@@@: public bool getBorderWidthChanged()
            return m_borderWidthChanged; //@@@: return m_borderWidthChanged;
        }; //@@@: }

        self.setBorderWidthChanged = function(rhs) { //@@@: public void setBorderWidthChanged(bool rhs)
            m_borderWidthChanged = rhs; //@@@: m_borderWidthChanged = rhs;
        }; //@@@: }

        self.getBorderColorChanged = function() { //@@@: public bool getBorderColorChanged()
            return m_borderColorChanged; //@@@: return m_borderColorChanged;
        }; //@@@: }

        self.setBorderColorChanged = function(rhs) { //@@@: public void setBorderColorChanged(bool rhs)
            m_borderColorChanged = rhs; //@@@: m_borderColorChanged = rhs;
        }; //@@@: }

        self.getChartFieldVal1Changed = function() { //@@@: public bool getChartFieldVal1Changed()
            return m_chartFieldVal1Changed; //@@@: return m_chartFieldVal1Changed;
        }; //@@@: }

        self.setChartFieldVal1Changed = function(rhs) { //@@@: public void setChartFieldVal1Changed(bool rhs)
            m_chartFieldVal1Changed = rhs; //@@@: m_chartFieldVal1Changed = rhs;
        }; //@@@: }

        self.getChartFieldVal2Changed = function() { //@@@: public bool getChartFieldVal2Changed()
            return m_chartFieldVal2Changed; //@@@: return m_chartFieldVal2Changed;
        }; //@@@: }

        self.setChartFieldVal2Changed = function(rhs) { //@@@: public void setChartFieldVal2Changed(bool rhs)
            m_chartFieldVal2Changed = rhs; //@@@: m_chartFieldVal2Changed = rhs;
        }; //@@@: }

        self.getChartFieldLbl1Changed = function() { //@@@: public bool getChartFieldLbl1Changed()
            return m_chartFieldLbl1Changed; //@@@: return m_chartFieldLbl1Changed;
        }; //@@@: }

        self.setChartFieldLbl1Changed = function(rhs) { //@@@: public void setChartFieldLbl1Changed(bool rhs)
            m_chartFieldLbl1Changed = rhs; //@@@: m_chartFieldLbl1Changed = rhs;
        }; //@@@: }

        self.getChartFieldGroupChanged = function() { //@@@: public bool getChartFieldGroupChanged()
            return m_chartFieldGroupChanged; //@@@: return m_chartFieldGroupChanged;
        }; //@@@: }

        self.setChartFieldGroupChanged = function(rhs) { //@@@: public void setChartFieldGroupChanged(bool rhs)
            m_chartFieldGroupChanged = rhs; //@@@: m_chartFieldGroupChanged = rhs;
        }; //@@@: }

        self.getChartGroupValueChanged = function() { //@@@: public bool getChartGroupValueChanged()
            return m_chartGroupValueChanged; //@@@: return m_chartGroupValueChanged;
        }; //@@@: }

        self.setChartGroupValueChanged = function(rhs) { //@@@: public void setChartGroupValueChanged(bool rhs)
            m_chartGroupValueChanged = rhs; //@@@: m_chartGroupValueChanged = rhs;
        }; //@@@: }

        self.getChartFieldLbl2Changed = function() { //@@@: public bool getChartFieldLbl2Changed()
            return m_chartFieldLbl2Changed; //@@@: return m_chartFieldLbl2Changed;
        }; //@@@: }

        self.setChartFieldLbl2Changed = function(rhs) { //@@@: public void setChartFieldLbl2Changed(bool rhs)
            m_chartFieldLbl2Changed = rhs; //@@@: m_chartFieldLbl2Changed = rhs;
        }; //@@@: }

        self.getChartSizeChanged = function() { //@@@: public bool getChartSizeChanged()
            return m_chartSizeChanged; //@@@: return m_chartSizeChanged;
        }; //@@@: }

        self.setChartSizeChanged = function(rhs) { //@@@: public void setChartSizeChanged(bool rhs)
            m_chartSizeChanged = rhs; //@@@: m_chartSizeChanged = rhs;
        }; //@@@: }

        self.getChartThicknessChanged = function() { //@@@: public bool getChartThicknessChanged()
            return m_chartThicknessChanged; //@@@: return m_chartThicknessChanged;
        }; //@@@: }

        self.setChartThicknessChanged = function(rhs) { //@@@: public void setChartThicknessChanged(bool rhs)
            m_chartThicknessChanged = rhs; //@@@: m_chartThicknessChanged = rhs;
        }; //@@@: }

        self.getChartColorSerie1Changed = function() { //@@@: public bool getChartColorSerie1Changed()
            return m_chartColorSerie1Changed; //@@@: return m_chartColorSerie1Changed;
        }; //@@@: }

        self.setChartColorSerie1Changed = function(rhs) { //@@@: public void setChartColorSerie1Changed(bool rhs)
            m_chartColorSerie1Changed = rhs; //@@@: m_chartColorSerie1Changed = rhs;
        }; //@@@: }

        self.getChartColorSerie2Changed = function() { //@@@: public bool getChartColorSerie2Changed()
            return m_chartColorSerie2Changed; //@@@: return m_chartColorSerie2Changed;
        }; //@@@: }

        self.setChartColorSerie2Changed = function(rhs) { //@@@: public void setChartColorSerie2Changed(bool rhs)
            m_chartColorSerie2Changed = rhs; //@@@: m_chartColorSerie2Changed = rhs;
        }; //@@@: }

        self.getChartFormatTypeChanged = function() { //@@@: public bool getChartFormatTypeChanged()
            return m_chartFormatTypeChanged; //@@@: return m_chartFormatTypeChanged;
        }; //@@@: }

        self.setChartFormatTypeChanged = function(rhs) { //@@@: public void setChartFormatTypeChanged(bool rhs)
            m_chartFormatTypeChanged = rhs; //@@@: m_chartFormatTypeChanged = rhs;
        }; //@@@: }

        self.getChartLinesTypeChanged = function() { //@@@: public bool getChartLinesTypeChanged()
            return m_chartLinesTypeChanged; //@@@: return m_chartLinesTypeChanged;
        }; //@@@: }

        self.setChartLinesTypeChanged = function(rhs) { //@@@: public void setChartLinesTypeChanged(bool rhs)
            m_chartLinesTypeChanged = rhs; //@@@: m_chartLinesTypeChanged = rhs;
        }; //@@@: }

        self.getChartTypeChanged = function() { //@@@: public bool getChartTypeChanged()
            return m_chartTypeChanged; //@@@: return m_chartTypeChanged;
        }; //@@@: }

        self.setChartTypeChanged = function(rhs) { //@@@: public void setChartTypeChanged(bool rhs)
            m_chartTypeChanged = rhs; //@@@: m_chartTypeChanged = rhs;
        }; //@@@: }

        self.getChartShowLinesChanged = function() { //@@@: public bool getChartShowLinesChanged()
            return m_chartShowLinesChanged; //@@@: return m_chartShowLinesChanged;
        }; //@@@: }

        self.setChartShowLinesChanged = function(rhs) { //@@@: public void setChartShowLinesChanged(bool rhs)
            m_chartShowLinesChanged = rhs; //@@@: m_chartShowLinesChanged = rhs;
        }; //@@@: }

        self.getChartShowValuesChanged = function() { //@@@: public bool getChartShowValuesChanged()
            return m_chartShowValuesChanged; //@@@: return m_chartShowValuesChanged;
        }; //@@@: }

        self.setChartShowValuesChanged = function(rhs) { //@@@: public void setChartShowValuesChanged(bool rhs)
            m_chartShowValuesChanged = rhs; //@@@: m_chartShowValuesChanged = rhs;
        }; //@@@: }

        self.getChartTopChanged = function() { //@@@: public bool getChartTopChanged()
            return m_chartTopChanged; //@@@: return m_chartTopChanged;
        }; //@@@: }

        self.setChartTopChanged = function(rhs) { //@@@: public void setChartTopChanged(bool rhs)
            m_chartTopChanged = rhs; //@@@: m_chartTopChanged = rhs;
        }; //@@@: }

        self.getChartSortChanged = function() { //@@@: public bool getChartSortChanged()
            return m_chartSortChanged; //@@@: return m_chartSortChanged;
        }; //@@@: }

        self.setChartSortChanged = function(rhs) { //@@@: public void setChartSortChanged(bool rhs)
            m_chartSortChanged = rhs; //@@@: m_chartSortChanged = rhs;
        }; //@@@: }

        self.getIsFreeCtrlChanged = function() { //@@@: public bool getIsFreeCtrlChanged()
            return m_isFreeCtrlChanged; //@@@: return m_isFreeCtrlChanged;
        }; //@@@: }

        self.setIsFreeCtrlChanged = function(rhs) { //@@@: public void setIsFreeCtrlChanged(bool rhs)
            m_isFreeCtrlChanged = rhs; //@@@: m_isFreeCtrlChanged = rhs;
        }; //@@@: }

        self.getExportColIdxChanged = function() { //@@@: public bool getExportColIdxChanged()
            return m_exportColIdxChanged; //@@@: return m_exportColIdxChanged;
        }; //@@@: }

        self.setExportColIdxChanged = function(rhs) { //@@@: public void setExportColIdxChanged(bool rhs)
            m_exportColIdxChanged = rhs; //@@@: m_exportColIdxChanged = rhs;
        };         //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // change events

        //------------------------------------------------------------------------------------------------------------------

        const cb_align_Click = function(sender, e) { //@@@: private void cb_align_Click(object sender, EventArgs e)
            m_alignChanged = true; //@@@: m_alignChanged = true;
        }; //@@@: }

        const cb_borderType_Click = function(sender, e) { //@@@: private void cb_borderType_Click(object sender, EventArgs e)
            m_borderTypeChanged = true; //@@@: m_borderTypeChanged = true;
        }; //@@@: }

        const chk_borderRounded_Click = function(sender, e) { //@@@: private void chk_borderRounded_Click(object sender, EventArgs e)
            m_borderRoundedChanged = true; //@@@: m_borderRoundedChanged = true;
        }; //@@@: }

        const chk_formulaHide_Click = function(sender, e) { //@@@: private void chk_formulaHide_Click(object sender, EventArgs e)
            m_setFormulaHideChanged = true; //@@@: m_setFormulaHideChanged = true;
        }; //@@@: }

        const chk_formulaValue_Click = function(sender, e) { //@@@: private void chk_formulaValue_Click(object sender, EventArgs e)
            m_setFormulaValueChanged = true; //@@@: m_setFormulaValueChanged = true;
        }; //@@@: }

        const cmd_formulaHide_Click = function(sender, e) { //@@@: private void cmd_formulaHide_Click(object sender, EventArgs e)
            m_formulaName = "Hide"; //@@@: m_formulaName = "Hide";
            if (m_editor.showEditFormula(m_formulaHide)) { //@@@: if (m_editor.showEditFormula(ref m_formulaHide))
                m_formulaHideChanged = true; //@@@: m_formulaHideChanged = true;
                lb_formulaHide.Text = m_formulaHide; //@@@: lb_formulaHide.Text = m_formulaHide;
            } //@@@: }
        }; //@@@: }

        const cmd_formulaValue_Click = function(sender, e) { //@@@: private void cmd_formulaValue_Click(object sender, EventArgs e)
            m_formulaName = "Value"; //@@@: m_formulaName = "Value";
            if (m_editor.showEditFormula(m_formulaValue)) { //@@@: if (m_editor.showEditFormula(ref m_formulaValue))
                m_formulaValueChanged = true; //@@@: m_formulaValueChanged = true;
                lbFormulaValue.Text = m_formulaValue; //@@@: lbFormulaValue.Text = m_formulaValue;
            } //@@@: }
        }; //@@@: }

        const op_afterPrint_Click = function(sender, e) { //@@@: private void op_afterPrint_Click(object sender, EventArgs e)
            m_whenEvalChanged = true; //@@@: m_whenEvalChanged = true;
        }; //@@@: }

        const op_beforePrint_Click = function(sender, e) { //@@@: private void op_beforePrint_Click(object sender, EventArgs e)
            m_whenEvalChanged = true; //@@@: m_whenEvalChanged = true;
        }; //@@@: }

        const tx_border3D_LostFocus = function(sender, e) { //@@@: private void tx_border3D_LostFocus(object sender, EventArgs e)
            try { //@@@: try
                shBorder3D.BackColor = Color.FromArgb(Int32.Parse(txBorder3D.Text)); //@@@: shBorder3D.BackColor = Color.FromArgb(Int32.Parse(txBorder3D.Text));
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const cmd_border3D_click = function(sender, e) { //@@@: private void cmd_border3D_click(object sender, EventArgs e)
            try { //@@@: try
                // TODO: fix me
                /* //@@@: /*
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
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const tx_borderColor_LostFocus = function(sender, e) { //@@@: private void tx_borderColor_LostFocus(object sender, EventArgs e)
            try { //@@@: try
                shBorderColor.BackColor = Color.FromArgb(Int32.Parse(txBorderColor.Text)); //@@@: shBorderColor.BackColor = Color.FromArgb(Int32.Parse(txBorderColor.Text));
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const cmd_borderColor_Click = function(sender, e) { //@@@: private void cmd_borderColor_Click(object sender, EventArgs e)
            try { //@@@: try
                // TODO: fix me
                /* //@@@: /*
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
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const tx_borderShadow_LostFocus = function(sender, e) { //@@@: private void tx_borderShadow_LostFocus(object sender, EventArgs e)
            try { //@@@: try
                shBorderShadow.BackColor = Color.FromArgb(Int32.Parse(txBorderShadow.Text)); //@@@: shBorderShadow.BackColor = Color.FromArgb(Int32.Parse(txBorderShadow.Text));
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const cmd_borderShadow_Click = function(sender, e) { //@@@: private void cmd_borderShadow_Click(object sender, EventArgs e)
            try { //@@@: try
                // TODO: fix me
                /* //@@@: /*
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
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const tx_BorderWidth_TextChanged = function(sender, e) { //@@@: private void tx_BorderWidth_TextChanged(object sender, EventArgs e)
            m_borderWidthChanged = true; //@@@: m_borderWidthChanged = true;
        }; //@@@: }

        const tx_ChartGroupValue_TextChanged = function(sender, e) { //@@@: private void tx_ChartGroupValue_TextChanged(object sender, EventArgs e)
            m_chartGroupValueChanged = true; //@@@: m_chartGroupValueChanged = true;
        }; //@@@: }

        const tx_ChartTop_TextChanged = function(sender, e) { //@@@: private void tx_ChartTop_TextChanged(object sender, EventArgs e)
            m_chartTopChanged = true; //@@@: m_chartTopChanged = true;
        }; //@@@: }

        const cmd_dbFieldGroupValue_Click = function(sender, e) { //@@@: private void cmd_dbFieldGroupValue_Click(object sender, EventArgs e)
            /* TODO: fix me //@@@: /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartGroupField(cancel);
            };
            if (!cancel) {
              m_chartFieldGroupChanged = true;
            }
             * */
        }; //@@@: }

        const cmd_dbFieldLbl1_Click = function(sender, e) { //@@@: private void cmd_dbFieldLbl1_Click(object sender, EventArgs e)
            /* TODO: fix me //@@@: /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl1, 2);
            };
            if (!cancel) {
              m_chartFieldLbl1Changed = true;
            }
             * */
        }; //@@@: }

        const cmd_dbFieldLbl2_Click = function(sender, e) { //@@@: private void cmd_dbFieldLbl2_Click(object sender, EventArgs e)
            /* TODO: fix me //@@@: /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldLbl2, 3);
            };
            if (!cancel) {
              m_chartFieldLbl2Changed = true;
            }
             * */
        }; //@@@: }

        const cmd_dbFieldVal1_Click = function(sender, e) { //@@@: private void cmd_dbFieldVal1_Click(object sender, EventArgs e)
            /* TODO: fix me //@@@: /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal1, 0);
            };
            if (!cancel) {
              m_chartFieldVal1Changed = true;
            }
             * */
        }; //@@@: }

        const cmd_dbFieldVal2_Click = function(sender, e) { //@@@: private void cmd_dbFieldVal2_Click(object sender, EventArgs e)
            /* TODO: fix me //@@@: /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpChartField(cancel, TxDbFieldVal2, 1);
            };
            if (!cancel) {
              m_chartFieldVal2Changed = true;
            }
             * */
        }; //@@@: }

        const tx_foreColor_LostFocus = function(sender, e) { //@@@: private void tx_foreColor_LostFocus(object sender, EventArgs e)
            try { //@@@: try
                shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text)); //@@@: shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text));
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const tx_backColor_LostFocus = function(sender, e) { //@@@: private void tx_backColor_LostFocus(object sender, EventArgs e)
            try { //@@@: try
                shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text)); //@@@: shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // initializers

        //------------------------------------------------------------------------------------------------------------------

        self.resetChangedFlags = function() { //@@@: public void resetChangedFlags()
            m_textChanged = false; //@@@: m_textChanged = false;
            m_tagChanged = false; //@@@: m_tagChanged = false;
            m_fontChanged = false; //@@@: m_fontChanged = false;
            m_foreColorChanged = false; //@@@: m_foreColorChanged = false;
            m_backColorChanged = false; //@@@: m_backColorChanged = false;
            m_formatChanged = false; //@@@: m_formatChanged = false;
            m_leftChanged = false; //@@@: m_leftChanged = false;
            m_topChanged = false; //@@@: m_topChanged = false;
            m_heightChanged = false; //@@@: m_heightChanged = false;
            m_widthChanged = false; //@@@: m_widthChanged = false;
            m_symbolChanged = false; //@@@: m_symbolChanged = false;
            m_transparentChanged = false; //@@@: m_transparentChanged = false;
            m_strikeChanged = false; //@@@: m_strikeChanged = false;
            m_underlineChanged = false; //@@@: m_underlineChanged = false;
            m_wordWrapChanged = false; //@@@: m_wordWrapChanged = false;
            m_italicChanged = false; //@@@: m_italicChanged = false;
            m_boldChanged = false; //@@@: m_boldChanged = false;
            m_alignChanged = false; //@@@: m_alignChanged = false;
            m_fontSizeChanged = false; //@@@: m_fontSizeChanged = false;
            m_canGrowChanged = false; //@@@: m_canGrowChanged = false;
            m_formulaHideChanged = false; //@@@: m_formulaHideChanged = false;
            m_formulaValueChanged = false; //@@@: m_formulaValueChanged = false;
            m_idxGroupChanged = false; //@@@: m_idxGroupChanged = false;
            m_whenEvalChanged = false; //@@@: m_whenEvalChanged = false;
            m_dbFieldChanged = false; //@@@: m_dbFieldChanged = false;
            m_setFormulaHideChanged = false; //@@@: m_setFormulaHideChanged = false;
            m_setFormulaValueChanged = false; //@@@: m_setFormulaValueChanged = false;
            m_pictureChanged = false; //@@@: m_pictureChanged = false;
            m_borderTypeChanged = false; //@@@: m_borderTypeChanged = false;
            m_border3DChanged = false; //@@@: m_border3DChanged = false;
            m_border3DShadowChanged = false; //@@@: m_border3DShadowChanged = false;
            m_borderRoundedChanged = false; //@@@: m_borderRoundedChanged = false;
            m_borderWidthChanged = false; //@@@: m_borderWidthChanged = false;
            m_borderColorChanged = false; //@@@: m_borderColorChanged = false;

            m_chartFieldGroupChanged = false; //@@@: m_chartFieldGroupChanged = false;
            m_chartFieldLbl1Changed = false; //@@@: m_chartFieldLbl1Changed = false;
            m_chartFieldLbl2Changed = false; //@@@: m_chartFieldLbl2Changed = false;
            m_chartFieldVal1Changed = false; //@@@: m_chartFieldVal1Changed = false;
            m_chartFieldVal2Changed = false; //@@@: m_chartFieldVal2Changed = false;

            m_chartSizeChanged = false; //@@@: m_chartSizeChanged = false;
            m_chartThicknessChanged = false; //@@@: m_chartThicknessChanged = false;
            m_chartColorSerie1Changed = false; //@@@: m_chartColorSerie1Changed = false;
            m_chartColorSerie2Changed = false; //@@@: m_chartColorSerie2Changed = false;
            m_chartFormatTypeChanged = false; //@@@: m_chartFormatTypeChanged = false;
            m_chartLinesTypeChanged = false; //@@@: m_chartLinesTypeChanged = false;
            m_chartTypeChanged = false; //@@@: m_chartTypeChanged = false;
            m_chartShowLinesChanged = false; //@@@: m_chartShowLinesChanged = false;
            m_chartShowValuesChanged = false; //@@@: m_chartShowValuesChanged = false;
            m_chartTopChanged = false; //@@@: m_chartTopChanged = false;
            m_chartTopChanged = false; //@@@: m_chartTopChanged = false;

            m_chartFieldGroupChanged = false; //@@@: m_chartFieldGroupChanged = false;
            m_chartGroupValueChanged = false; //@@@: m_chartGroupValueChanged = false;

            m_isFreeCtrlChanged = false; //@@@: m_isFreeCtrlChanged = false;
            m_exportColIdxChanged = false; //@@@: m_exportColIdxChanged = false;

        }; //@@@: }

        self.hideTabField = function() { //@@@: public void hideTabField()
            tab_main.TabPages.Remove(tbpDatabase); //@@@: tab_main.TabPages.Remove(tbpDatabase);
        }; //@@@: }

        self.hideTabImage = function() { //@@@: public void hideTabImage()
            tab_main.TabPages.Remove(tbpImage); //@@@: tab_main.TabPages.Remove(tbpImage);
        }; //@@@: }

        self.hideTabChart = function() { //@@@: public void hideTabChart()
            tab_main.TabPages.Remove(tbpChart); //@@@: tab_main.TabPages.Remove(tbpChart);
        }; //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // setters and getters for no control properties

        //------------------------------------------------------------------------------------------------------------------

        /* //@@@: /*
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
		self. = function() { //@@@: public string getDbFieldGroupValue ()
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }
        /* //@@@: /*
		public int getChartGroupFieldType ()
		{
			throw new NotImplementedException ();
		}

		public int getChartGroupIndex ()
		{
			throw new NotImplementedException ();
		}
        */
		self. = function(sField) { //@@@: public void setDbFieldGroupValue (string sField)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }
        /* //@@@: /*
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

UNKNOWN >>         public System.Windows.Forms.TextBox txExportColIdx //@@@: public System.Windows.Forms.TextBox txExportColIdx
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_exportColIdx; //@@@: return tx_exportColIdx;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkIsFreeCtrl //@@@: public System.Windows.Forms.CheckBox chkIsFreeCtrl
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_isFreeCtrl; //@@@: return chk_isFreeCtrl;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkWordWrap //@@@: public System.Windows.Forms.CheckBox chkWordWrap
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_wordWrap; //@@@: return chk_wordWrap;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkCanGrow //@@@: public System.Windows.Forms.CheckBox chkCanGrow
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_canGrow; //@@@: return chk_canGrow;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txWidth //@@@: public System.Windows.Forms.TextBox txWidth
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_width; //@@@: return tx_width;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txHeight //@@@: public System.Windows.Forms.TextBox txHeight
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_height; //@@@: return tx_height;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txTop //@@@: public System.Windows.Forms.TextBox txTop
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_top; //@@@: return tx_top;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txLeft //@@@: public System.Windows.Forms.TextBox txLeft
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_left; //@@@: return tx_left;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txSymbol //@@@: public System.Windows.Forms.TextBox txSymbol
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_symbol; //@@@: return tx_symbol;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txFormat //@@@: public System.Windows.Forms.TextBox txFormat
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_format; //@@@: return tx_format;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkTransparent //@@@: public System.Windows.Forms.CheckBox chkTransparent
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_transparent; //@@@: return chk_transparent;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label shBackColor //@@@: public System.Windows.Forms.Label shBackColor
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return sh_backColor; //@@@: return sh_backColor;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txBackColor //@@@: public System.Windows.Forms.TextBox txBackColor
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_backColor; //@@@: return tx_backColor;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontStrike //@@@: public System.Windows.Forms.CheckBox chkFontStrike
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_fontStrike; //@@@: return chk_fontStrike;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontItalic //@@@: public System.Windows.Forms.CheckBox chkFontItalic
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_fontItalic; //@@@: return chk_fontItalic;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label shForeColor //@@@: public System.Windows.Forms.Label shForeColor
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return sh_foreColor; //@@@: return sh_foreColor;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txForeColor //@@@: public System.Windows.Forms.TextBox txForeColor
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_foreColor; //@@@: return tx_foreColor;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontUnderline //@@@: public System.Windows.Forms.CheckBox chkFontUnderline
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_fontUnderline; //@@@: return chk_fontUnderline;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFontBold //@@@: public System.Windows.Forms.CheckBox chkFontBold
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_fontBold; //@@@: return chk_fontBold;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbAlign //@@@: public System.Windows.Forms.ComboBox cbAlign
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_align; //@@@: return cb_align;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txFontSize //@@@: public System.Windows.Forms.TextBox txFontSize
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_fontSize; //@@@: return tx_fontSize;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txFont //@@@: public System.Windows.Forms.TextBox txFont
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_font; //@@@: return tx_font;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txTag //@@@: public System.Windows.Forms.TextBox txTag
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_tag; //@@@: return tx_tag;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txText //@@@: public System.Windows.Forms.TextBox txText
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_text; //@@@: return tx_text;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label lbControl //@@@: public System.Windows.Forms.Label lbControl
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_control; //@@@: return lb_control;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txName //@@@: public System.Windows.Forms.TextBox txName
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_name; //@@@: return tx_name;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdApply //@@@: public System.Windows.Forms.Button cmdApply
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_apply; //@@@: return cmd_apply;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdCancel //@@@: public System.Windows.Forms.Button cmdCancel
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_cancel; //@@@: return cmd_cancel;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.RadioButton opAfterPrint //@@@: public System.Windows.Forms.RadioButton opAfterPrint
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return op_afterPrint; //@@@: return op_afterPrint;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.RadioButton opBeforePrint //@@@: public System.Windows.Forms.RadioButton opBeforePrint
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return op_beforePrint; //@@@: return op_beforePrint;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txIdxGroup //@@@: public System.Windows.Forms.TextBox txIdxGroup
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_idxGroup; //@@@: return tx_idxGroup;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label lbFormulaValue //@@@: public System.Windows.Forms.Label lbFormulaValue
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_formulaValue; //@@@: return lb_formulaValue;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFormulaValue //@@@: public System.Windows.Forms.CheckBox chkFormulaValue
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_formulaValue; //@@@: return chk_formulaValue;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdFormulaValue //@@@: public System.Windows.Forms.Button cmdFormulaValue
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_formulaValue; //@@@: return cmd_formulaValue;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label lbFormulaHide //@@@: public System.Windows.Forms.Label lbFormulaHide
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return lb_formulaHide; //@@@: return lb_formulaHide;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkFormulaHide //@@@: public System.Windows.Forms.CheckBox chkFormulaHide
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_formulaHide; //@@@: return chk_formulaHide;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdFormulaHide //@@@: public System.Windows.Forms.Button cmdFormulaHide
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_formulaHide; //@@@: return cmd_formulaHide;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbField //@@@: public System.Windows.Forms.Button cmdDbField
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_dbField; //@@@: return cmd_dbField;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbField //@@@: public System.Windows.Forms.TextBox txDbField
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_dbField; //@@@: return tx_dbField;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.PictureBox picImage //@@@: public System.Windows.Forms.PictureBox picImage
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return pic_image; //@@@: return pic_image;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdImageFile //@@@: public System.Windows.Forms.Button cmdImageFile
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_imageFile; //@@@: return cmd_imageFile;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txImageFile //@@@: public System.Windows.Forms.TextBox txImageFile
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_imageFile; //@@@: return tx_imageFile;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkBorderRounded //@@@: public System.Windows.Forms.CheckBox chkBorderRounded
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_borderRounded; //@@@: return chk_borderRounded;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorderWidth //@@@: public System.Windows.Forms.TextBox txBorderWidth
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_borderWidth; //@@@: return tx_borderWidth;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label shBorderShadow //@@@: public System.Windows.Forms.Label shBorderShadow
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return sh_borderShadow; //@@@: return sh_borderShadow;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorderShadow //@@@: public System.Windows.Forms.TextBox txBorderShadow
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_borderShadow; //@@@: return tx_borderShadow;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label shBorder3D //@@@: public System.Windows.Forms.Label shBorder3D
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return sh_border3D; //@@@: return sh_border3D;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorder3D //@@@: public System.Windows.Forms.TextBox txBorder3D
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_border3D; //@@@: return tx_border3D;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Label shBorderColor //@@@: public System.Windows.Forms.Label shBorderColor
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return sh_borderColor; //@@@: return sh_borderColor;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txBorderColor //@@@: public System.Windows.Forms.TextBox txBorderColor
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_borderColor; //@@@: return tx_borderColor;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbBorderType //@@@: public System.Windows.Forms.ComboBox cbBorderType
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_borderType; //@@@: return cb_borderType;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbChartThickness //@@@: public System.Windows.Forms.ComboBox cbChartThickness
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_chartThickness; //@@@: return cb_chartThickness;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbChartSize //@@@: public System.Windows.Forms.ComboBox cbChartSize
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_chartSize; //@@@: return cb_chartSize;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbLinesType //@@@: public System.Windows.Forms.ComboBox cbLinesType
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_linesType; //@@@: return cb_linesType;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbFormatType //@@@: public System.Windows.Forms.ComboBox cbFormatType
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_formatType; //@@@: return cb_formatType;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbType //@@@: public System.Windows.Forms.ComboBox cbType
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_type; //@@@: return cb_type;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkSort //@@@: public System.Windows.Forms.CheckBox chkSort
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_sort; //@@@: return chk_sort;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkShowOutlines //@@@: public System.Windows.Forms.CheckBox chkShowOutlines
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_showOutlines; //@@@: return chk_showOutlines;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.CheckBox chkShowBarValues //@@@: public System.Windows.Forms.CheckBox chkShowBarValues
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return chk_showBarValues; //@@@: return chk_showBarValues;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txChartTop //@@@: public System.Windows.Forms.TextBox txChartTop
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_chartTop; //@@@: return tx_chartTop;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbColorSerie2 //@@@: public System.Windows.Forms.ComboBox cbColorSerie2
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_colorSerie2; //@@@: return cb_colorSerie2;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldLbl2 //@@@: public System.Windows.Forms.Button cmdDbFieldLbl2
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_dbFieldLbl2; //@@@: return cmd_dbFieldLbl2;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldLbl2 //@@@: public System.Windows.Forms.TextBox txDbFieldLbl2
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_dbFieldLbl2; //@@@: return tx_dbFieldLbl2;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldVal2 //@@@: public System.Windows.Forms.Button cmdDbFieldVal2
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_dbFieldVal2; //@@@: return cmd_dbFieldVal2;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldVal2 //@@@: public System.Windows.Forms.TextBox txDbFieldVal2
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_dbFieldVal2; //@@@: return tx_dbFieldVal2;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.ComboBox cbColorSerie1 //@@@: public System.Windows.Forms.ComboBox cbColorSerie1
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cb_colorSerie1; //@@@: return cb_colorSerie1;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldLbl1 //@@@: public System.Windows.Forms.Button cmdDbFieldLbl1
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_dbFieldLbl1; //@@@: return cmd_dbFieldLbl1;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldLbl1 //@@@: public System.Windows.Forms.TextBox txDbFieldLbl1
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_dbFieldLbl1; //@@@: return tx_dbFieldLbl1;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldVal1 //@@@: public System.Windows.Forms.Button cmdDbFieldVal1
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_dbFieldVal1; //@@@: return cmd_dbFieldVal1;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldVal1 //@@@: public System.Windows.Forms.TextBox txDbFieldVal1
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_dbFieldVal1; //@@@: return tx_dbFieldVal1;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txChartGroupValue //@@@: public System.Windows.Forms.TextBox txChartGroupValue
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_chartGroupValue; //@@@: return tx_chartGroupValue;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.Button cmdDbFieldGroupValue //@@@: public System.Windows.Forms.Button cmdDbFieldGroupValue
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return cmd_dbFieldGroupValue; //@@@: return cmd_dbFieldGroupValue;
            } //@@@: }
        } //@@@: }
UNKNOWN >>         public System.Windows.Forms.TextBox txDbFieldGroupValue //@@@: public System.Windows.Forms.TextBox txDbFieldGroupValue
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return tx_dbFieldGroupValue; //@@@: return tx_dbFieldGroupValue;
            } //@@@: }
        } //@@@: }

        const fProperties_Load = function(sender, e) { //@@@: private void fProperties_Load(object sender, EventArgs e)
            m_done = false; //@@@: m_done = false;
            tab_main.SelectedTab = tbpFormat; //@@@: tab_main.SelectedTab = tbpFormat;
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
            m_ok = false; //@@@: m_ok = false;

            lb_formulaHide.Text = m_formulaHide; //@@@: lb_formulaHide.Text = m_formulaHide;
            lb_formulaValue.Text = m_formulaValue; //@@@: lb_formulaValue.Text = m_formulaValue;
        }; //@@@: }

        const initChart = function() { //@@@: private void initChart()
            cUtil.listAdd(cb_formatType, "BMP", (int)csRptChartFormat.BMP); //@@@: cUtil.listAdd(cb_formatType, "BMP", (int)csRptChartFormat.BMP);
            cUtil.listAdd(cb_formatType, "JPG", (int)csRptChartFormat.JPEG); //@@@: cUtil.listAdd(cb_formatType, "JPG", (int)csRptChartFormat.JPEG);
            cUtil.listAdd(cb_formatType, "GIF", (int)csRptChartFormat.GIF); //@@@: cUtil.listAdd(cb_formatType, "GIF", (int)csRptChartFormat.GIF);
            cUtil.listAdd(cb_formatType, "PNG", (int)csRptChartFormat.PNG); //@@@: cUtil.listAdd(cb_formatType, "PNG", (int)csRptChartFormat.PNG);
            cUtil.listSetListIndex(cbFormatType, 0); //@@@: cUtil.listSetListIndex(cbFormatType, 0);

            cUtil.listAdd(cb_type, "Pie", (int)csRptChartType.PIE); //@@@: cUtil.listAdd(cb_type, "Pie", (int)csRptChartType.PIE);
            cUtil.listAdd(cb_type, "Bar", (int)csRptChartType.BAR); //@@@: cUtil.listAdd(cb_type, "Bar", (int)csRptChartType.BAR);
            cUtil.listSetListIndex(cb_type, 0); //@@@: cUtil.listSetListIndex(cb_type, 0);

            chk_showOutlines.Checked = true; //@@@: chk_showOutlines.Checked = true;
            chk_showBarValues.Checked = true; //@@@: chk_showBarValues.Checked = true;

            pFillColors(cbColorSerie1); //@@@: pFillColors(cbColorSerie1);
            cUtil.listSetListIndex(cb_colorSerie1, 10); //@@@: cUtil.listSetListIndex(cb_colorSerie1, 10);

            pFillColors(cbColorSerie2); //@@@: pFillColors(cbColorSerie2);
            cUtil.listSetListIndex(cb_colorSerie2, 69); //@@@: cUtil.listSetListIndex(cb_colorSerie2, 69);

            cUtil.listAdd(cb_chartSize, "Smallest", 50); //@@@: cUtil.listAdd(cb_chartSize, "Smallest", 50);
            cUtil.listAdd(cb_chartSize, "Smaller", 100); //@@@: cUtil.listAdd(cb_chartSize, "Smaller", 100);
            cUtil.listAdd(cb_chartSize, "Small", 150); //@@@: cUtil.listAdd(cb_chartSize, "Small", 150);
            cUtil.listAdd(cb_chartSize, "Medium", 200); //@@@: cUtil.listAdd(cb_chartSize, "Medium", 200);
            cUtil.listAdd(cb_chartSize, "Large", 250); //@@@: cUtil.listAdd(cb_chartSize, "Large", 250);
            cUtil.listAdd(cb_chartSize, "Big", 350); //@@@: cUtil.listAdd(cb_chartSize, "Big", 350);
            cUtil.listSetListIndex(cb_chartSize, 3); //@@@: cUtil.listSetListIndex(cb_chartSize, 3);

            cUtil.listAdd(cb_chartThickness, "None", 0); //@@@: cUtil.listAdd(cb_chartThickness, "None", 0);
            cUtil.listAdd(cb_chartThickness, "Wafer", 2); //@@@: cUtil.listAdd(cb_chartThickness, "Wafer", 2);
            cUtil.listAdd(cb_chartThickness, "Thin", 4); //@@@: cUtil.listAdd(cb_chartThickness, "Thin", 4);
            cUtil.listAdd(cb_chartThickness, "Medium", 8); //@@@: cUtil.listAdd(cb_chartThickness, "Medium", 8);
            cUtil.listAdd(cb_chartThickness, "Thick", 16); //@@@: cUtil.listAdd(cb_chartThickness, "Thick", 16);
            cUtil.listAdd(cb_chartThickness, "Thickest", 32); //@@@: cUtil.listAdd(cb_chartThickness, "Thickest", 32);
            cUtil.listSetListIndex(cb_chartThickness, 2); //@@@: cUtil.listSetListIndex(cb_chartThickness, 2);

            cUtil.listAdd(cb_linesType, "None", (int)csRptChartLineStyle.NONE); //@@@: cUtil.listAdd(cb_linesType, "None", (int)csRptChartLineStyle.NONE);
            cUtil.listAdd(cb_linesType, "Horizontal", (int)csRptChartLineStyle.HORIZONTAL); //@@@: cUtil.listAdd(cb_linesType, "Horizontal", (int)csRptChartLineStyle.HORIZONTAL);
            cUtil.listAdd(cb_linesType, "Numbered", (int)csRptChartLineStyle.NUMBERED); //@@@: cUtil.listAdd(cb_linesType, "Numbered", (int)csRptChartLineStyle.NUMBERED);
            cUtil.listAdd(cb_linesType, "Both", (int)csRptChartLineStyle.BOTH); //@@@: cUtil.listAdd(cb_linesType, "Both", (int)csRptChartLineStyle.BOTH);
            cUtil.listSetListIndex(cb_linesType, 3); //@@@: cUtil.listSetListIndex(cb_linesType, 3);

          }; //@@@: }

        const pFillColors = function(cb_list) { //@@@: private void pFillColors(ComboBox cb_list)
            cUtil.listAdd(cb_list, "AliceBlue", (int)0xF0F8FF); //@@@: cUtil.listAdd(cb_list, "AliceBlue", (int)0xF0F8FF);
            cUtil.listAdd(cb_list, "AntiqueWhite ", (int)0xFAEBD7); //@@@: cUtil.listAdd(cb_list, "AntiqueWhite ", (int)0xFAEBD7);
            cUtil.listAdd(cb_list, "Aqua ", (int)0x00FFFF); //@@@: cUtil.listAdd(cb_list, "Aqua ", (int)0x00FFFF);
            cUtil.listAdd(cb_list, "Aquamarine ", (int)0x7FFFD4); //@@@: cUtil.listAdd(cb_list, "Aquamarine ", (int)0x7FFFD4);
            cUtil.listAdd(cb_list, "Azure ", (int)0xF0FFFF); //@@@: cUtil.listAdd(cb_list, "Azure ", (int)0xF0FFFF);
            cUtil.listAdd(cb_list, "Beige ", (int)0xF5F5DC); //@@@: cUtil.listAdd(cb_list, "Beige ", (int)0xF5F5DC);
            cUtil.listAdd(cb_list, "Bisque ", (int)0xFFE4C4); //@@@: cUtil.listAdd(cb_list, "Bisque ", (int)0xFFE4C4);
            cUtil.listAdd(cb_list, "Black ", (int)0x000000); //@@@: cUtil.listAdd(cb_list, "Black ", (int)0x000000);
            cUtil.listAdd(cb_list, "BlanchedAlmond ", (int)0xFFEBCD); //@@@: cUtil.listAdd(cb_list, "BlanchedAlmond ", (int)0xFFEBCD);
            cUtil.listAdd(cb_list, "Blue ", (int)0x0000FF); //@@@: cUtil.listAdd(cb_list, "Blue ", (int)0x0000FF);
            cUtil.listAdd(cb_list, "BlueViolet ", (int)0x8A2BE2); //@@@: cUtil.listAdd(cb_list, "BlueViolet ", (int)0x8A2BE2);
            cUtil.listAdd(cb_list, "Brown ", (int)0xA52A2A); //@@@: cUtil.listAdd(cb_list, "Brown ", (int)0xA52A2A);
            cUtil.listAdd(cb_list, "BurlyWood ", (int)0xDEB887); //@@@: cUtil.listAdd(cb_list, "BurlyWood ", (int)0xDEB887);
            cUtil.listAdd(cb_list, "CadetBlue ", (int)0x5F9EA0); //@@@: cUtil.listAdd(cb_list, "CadetBlue ", (int)0x5F9EA0);
            cUtil.listAdd(cb_list, "Chartreuse ", (int)0x7FFF00); //@@@: cUtil.listAdd(cb_list, "Chartreuse ", (int)0x7FFF00);
            cUtil.listAdd(cb_list, "Chocolate ", (int)0xD2691E); //@@@: cUtil.listAdd(cb_list, "Chocolate ", (int)0xD2691E);
            cUtil.listAdd(cb_list, "Coral ", (int)0xFF7F50); //@@@: cUtil.listAdd(cb_list, "Coral ", (int)0xFF7F50);
            cUtil.listAdd(cb_list, "CornflowerBlue ", (int)0x6495ED); //@@@: cUtil.listAdd(cb_list, "CornflowerBlue ", (int)0x6495ED);
            cUtil.listAdd(cb_list, "Cornsilk ", (int)0xFFF8DC); //@@@: cUtil.listAdd(cb_list, "Cornsilk ", (int)0xFFF8DC);
            cUtil.listAdd(cb_list, "Crimson ", (int)0xDC143C); //@@@: cUtil.listAdd(cb_list, "Crimson ", (int)0xDC143C);
            cUtil.listAdd(cb_list, "Cyan ", (int)0x00FFFF); //@@@: cUtil.listAdd(cb_list, "Cyan ", (int)0x00FFFF);
            cUtil.listAdd(cb_list, "DarkBlue ", (int)0x00008B); //@@@: cUtil.listAdd(cb_list, "DarkBlue ", (int)0x00008B);
            cUtil.listAdd(cb_list, "DarkCyan ", (int)0x008B8B); //@@@: cUtil.listAdd(cb_list, "DarkCyan ", (int)0x008B8B);
            cUtil.listAdd(cb_list, "DarkGoldenrod ", (int)0xB8860B); //@@@: cUtil.listAdd(cb_list, "DarkGoldenrod ", (int)0xB8860B);
            cUtil.listAdd(cb_list, "DarkGray ", (int)0xA9A9A9); //@@@: cUtil.listAdd(cb_list, "DarkGray ", (int)0xA9A9A9);
            cUtil.listAdd(cb_list, "DarkGreen ", (int)0x006400); //@@@: cUtil.listAdd(cb_list, "DarkGreen ", (int)0x006400);
            cUtil.listAdd(cb_list, "DarkKhaki ", (int)0xBDB76B); //@@@: cUtil.listAdd(cb_list, "DarkKhaki ", (int)0xBDB76B);
            cUtil.listAdd(cb_list, "DarkMagenta ", (int)0x8B008B); //@@@: cUtil.listAdd(cb_list, "DarkMagenta ", (int)0x8B008B);
            cUtil.listAdd(cb_list, "DarkOliveGreen ", (int)0x556B2F); //@@@: cUtil.listAdd(cb_list, "DarkOliveGreen ", (int)0x556B2F);
            cUtil.listAdd(cb_list, "DarkOrange ", (int)0xFF8C00); //@@@: cUtil.listAdd(cb_list, "DarkOrange ", (int)0xFF8C00);
            cUtil.listAdd(cb_list, "DarkOrchid ", (int)0x9932CC); //@@@: cUtil.listAdd(cb_list, "DarkOrchid ", (int)0x9932CC);
            cUtil.listAdd(cb_list, "DarkRed ", (int)0x8B0000); //@@@: cUtil.listAdd(cb_list, "DarkRed ", (int)0x8B0000);
            cUtil.listAdd(cb_list, "DarkSalmon ", (int)0xE9967A); //@@@: cUtil.listAdd(cb_list, "DarkSalmon ", (int)0xE9967A);
            cUtil.listAdd(cb_list, "DarkSeaGreen ", (int)0x8FBC8B); //@@@: cUtil.listAdd(cb_list, "DarkSeaGreen ", (int)0x8FBC8B);
            cUtil.listAdd(cb_list, "DarkSlateBlue ", (int)0x483D8B); //@@@: cUtil.listAdd(cb_list, "DarkSlateBlue ", (int)0x483D8B);
            cUtil.listAdd(cb_list, "DarkSlateGray ", (int)0x2F4F4F); //@@@: cUtil.listAdd(cb_list, "DarkSlateGray ", (int)0x2F4F4F);
            cUtil.listAdd(cb_list, "DarkTurquoise ", (int)0x00CED1); //@@@: cUtil.listAdd(cb_list, "DarkTurquoise ", (int)0x00CED1);
            cUtil.listAdd(cb_list, "DarkViolet ", (int)0x9400D3); //@@@: cUtil.listAdd(cb_list, "DarkViolet ", (int)0x9400D3);
            cUtil.listAdd(cb_list, "DeepPink ", (int)0xFF1493); //@@@: cUtil.listAdd(cb_list, "DeepPink ", (int)0xFF1493);
            cUtil.listAdd(cb_list, "DeepSkyBlue ", (int)0x00BFFF); //@@@: cUtil.listAdd(cb_list, "DeepSkyBlue ", (int)0x00BFFF);
            cUtil.listAdd(cb_list, "DimGray ", (int)0x696969); //@@@: cUtil.listAdd(cb_list, "DimGray ", (int)0x696969);
            cUtil.listAdd(cb_list, "DodgerBlue ", (int)0x1E90FF); //@@@: cUtil.listAdd(cb_list, "DodgerBlue ", (int)0x1E90FF);
            cUtil.listAdd(cb_list, "Firebrick ", (int)0xB22222); //@@@: cUtil.listAdd(cb_list, "Firebrick ", (int)0xB22222);
            cUtil.listAdd(cb_list, "FloralWhite ", (int)0xFFFAF0); //@@@: cUtil.listAdd(cb_list, "FloralWhite ", (int)0xFFFAF0);
            cUtil.listAdd(cb_list, "ForestGreen ", (int)0x228B22); //@@@: cUtil.listAdd(cb_list, "ForestGreen ", (int)0x228B22);
            cUtil.listAdd(cb_list, "Fuchsia ", (int)0xFF00FF); //@@@: cUtil.listAdd(cb_list, "Fuchsia ", (int)0xFF00FF);
            cUtil.listAdd(cb_list, "Gainsboro ", (int)0xDCDCDC); //@@@: cUtil.listAdd(cb_list, "Gainsboro ", (int)0xDCDCDC);
            cUtil.listAdd(cb_list, "GhostWhite ", (int)0xF8F8FF); //@@@: cUtil.listAdd(cb_list, "GhostWhite ", (int)0xF8F8FF);
            cUtil.listAdd(cb_list, "Gold ", (int)0xFFD700); //@@@: cUtil.listAdd(cb_list, "Gold ", (int)0xFFD700);
            cUtil.listAdd(cb_list, "Goldenrod ", (int)0xDAA520); //@@@: cUtil.listAdd(cb_list, "Goldenrod ", (int)0xDAA520);
            cUtil.listAdd(cb_list, "Gray ", (int)0x808080); //@@@: cUtil.listAdd(cb_list, "Gray ", (int)0x808080);
            cUtil.listAdd(cb_list, "Green ", (int)0x008000); //@@@: cUtil.listAdd(cb_list, "Green ", (int)0x008000);
            cUtil.listAdd(cb_list, "GreenYellow ", (int)0xADFF2F); //@@@: cUtil.listAdd(cb_list, "GreenYellow ", (int)0xADFF2F);
            cUtil.listAdd(cb_list, "Honeydew ", (int)0xF0FFF0); //@@@: cUtil.listAdd(cb_list, "Honeydew ", (int)0xF0FFF0);
            cUtil.listAdd(cb_list, "HotPink ", (int)0xFF69B4); //@@@: cUtil.listAdd(cb_list, "HotPink ", (int)0xFF69B4);
            cUtil.listAdd(cb_list, "IndianRed ", (int)0xCD5C5C); //@@@: cUtil.listAdd(cb_list, "IndianRed ", (int)0xCD5C5C);
            cUtil.listAdd(cb_list, "Indigo ", (int)0x4B0082); //@@@: cUtil.listAdd(cb_list, "Indigo ", (int)0x4B0082);
            cUtil.listAdd(cb_list, "Ivory ", (int)0xFFFFF0); //@@@: cUtil.listAdd(cb_list, "Ivory ", (int)0xFFFFF0);
            cUtil.listAdd(cb_list, "Khaki ", (int)0xF0E68C); //@@@: cUtil.listAdd(cb_list, "Khaki ", (int)0xF0E68C);
            cUtil.listAdd(cb_list, "Lavender ", (int)0xE6E6FA); //@@@: cUtil.listAdd(cb_list, "Lavender ", (int)0xE6E6FA);
            cUtil.listAdd(cb_list, "LavenderBlush ", (int)0xFFF0F5); //@@@: cUtil.listAdd(cb_list, "LavenderBlush ", (int)0xFFF0F5);
            cUtil.listAdd(cb_list, "LawnGreen ", (int)0x7CFC00); //@@@: cUtil.listAdd(cb_list, "LawnGreen ", (int)0x7CFC00);
            cUtil.listAdd(cb_list, "LemonChiffon ", (int)0xFFFACD); //@@@: cUtil.listAdd(cb_list, "LemonChiffon ", (int)0xFFFACD);
            cUtil.listAdd(cb_list, "LightBlue ", (int)0xADD8E6); //@@@: cUtil.listAdd(cb_list, "LightBlue ", (int)0xADD8E6);
            cUtil.listAdd(cb_list, "LightCoral ", (int)0xF08080); //@@@: cUtil.listAdd(cb_list, "LightCoral ", (int)0xF08080);
            cUtil.listAdd(cb_list, "LightCyan ", (int)0xE0FFFF); //@@@: cUtil.listAdd(cb_list, "LightCyan ", (int)0xE0FFFF);
            cUtil.listAdd(cb_list, "LightGoldenrodYellow ", (int)0xFAFAD2); //@@@: cUtil.listAdd(cb_list, "LightGoldenrodYellow ", (int)0xFAFAD2);
            cUtil.listAdd(cb_list, "LightGray ", (int)0xD3D3D3); //@@@: cUtil.listAdd(cb_list, "LightGray ", (int)0xD3D3D3);
            cUtil.listAdd(cb_list, "LightGreen ", (int)0x90EE90); //@@@: cUtil.listAdd(cb_list, "LightGreen ", (int)0x90EE90);
            cUtil.listAdd(cb_list, "LightPink ", (int)0xFFB6C1); //@@@: cUtil.listAdd(cb_list, "LightPink ", (int)0xFFB6C1);
            cUtil.listAdd(cb_list, "LightSalmon ", (int)0xFFA07A); //@@@: cUtil.listAdd(cb_list, "LightSalmon ", (int)0xFFA07A);
            cUtil.listAdd(cb_list, "LightSeaGreen ", (int)0x20B2AA); //@@@: cUtil.listAdd(cb_list, "LightSeaGreen ", (int)0x20B2AA);
            cUtil.listAdd(cb_list, "LightSkyBlue ", (int)0x87CEFA); //@@@: cUtil.listAdd(cb_list, "LightSkyBlue ", (int)0x87CEFA);
            cUtil.listAdd(cb_list, "LightSlateGray ", (int)0x778899); //@@@: cUtil.listAdd(cb_list, "LightSlateGray ", (int)0x778899);
            cUtil.listAdd(cb_list, "LightSteelBlue ", (int)0xB0C4DE); //@@@: cUtil.listAdd(cb_list, "LightSteelBlue ", (int)0xB0C4DE);
            cUtil.listAdd(cb_list, "LightYellow ", (int)0xFFFFE0); //@@@: cUtil.listAdd(cb_list, "LightYellow ", (int)0xFFFFE0);
            cUtil.listAdd(cb_list, "Lime ", (int)0x00FF00); //@@@: cUtil.listAdd(cb_list, "Lime ", (int)0x00FF00);
            cUtil.listAdd(cb_list, "LimeGreen ", (int)0x32CD32); //@@@: cUtil.listAdd(cb_list, "LimeGreen ", (int)0x32CD32);
            cUtil.listAdd(cb_list, "Linen ", (int)0xFAF0E6); //@@@: cUtil.listAdd(cb_list, "Linen ", (int)0xFAF0E6);
            cUtil.listAdd(cb_list, "Magenta ", (int)0xFF00FF); //@@@: cUtil.listAdd(cb_list, "Magenta ", (int)0xFF00FF);
            cUtil.listAdd(cb_list, "Maroon ", (int)0x800000); //@@@: cUtil.listAdd(cb_list, "Maroon ", (int)0x800000);
            cUtil.listAdd(cb_list, "MediumAquamarine ", (int)0x66CDAA); //@@@: cUtil.listAdd(cb_list, "MediumAquamarine ", (int)0x66CDAA);
            cUtil.listAdd(cb_list, "MediumBlue ", (int)0x0000CD); //@@@: cUtil.listAdd(cb_list, "MediumBlue ", (int)0x0000CD);
            cUtil.listAdd(cb_list, "MediumOrchid ", (int)0xBA55D3); //@@@: cUtil.listAdd(cb_list, "MediumOrchid ", (int)0xBA55D3);
            cUtil.listAdd(cb_list, "MediumPurple ", (int)0x9370DB); //@@@: cUtil.listAdd(cb_list, "MediumPurple ", (int)0x9370DB);
            cUtil.listAdd(cb_list, "MediumSeaGreen ", (int)0x3CB371); //@@@: cUtil.listAdd(cb_list, "MediumSeaGreen ", (int)0x3CB371);
            cUtil.listAdd(cb_list, "MediumSlateBlue ", (int)0x7B68EE); //@@@: cUtil.listAdd(cb_list, "MediumSlateBlue ", (int)0x7B68EE);
            cUtil.listAdd(cb_list, "MediumSpringGreen ", (int)0x00FA9A); //@@@: cUtil.listAdd(cb_list, "MediumSpringGreen ", (int)0x00FA9A);
            cUtil.listAdd(cb_list, "MediumTurquoise ", (int)0x48D1CC); //@@@: cUtil.listAdd(cb_list, "MediumTurquoise ", (int)0x48D1CC);
            cUtil.listAdd(cb_list, "MediumVioletRed ", (int)0xC71585); //@@@: cUtil.listAdd(cb_list, "MediumVioletRed ", (int)0xC71585);
            cUtil.listAdd(cb_list, "MidnightBlue ", (int)0x191970); //@@@: cUtil.listAdd(cb_list, "MidnightBlue ", (int)0x191970);
            cUtil.listAdd(cb_list, "MintCream ", (int)0xF5FFFA); //@@@: cUtil.listAdd(cb_list, "MintCream ", (int)0xF5FFFA);
            cUtil.listAdd(cb_list, "MistyRose ", (int)0xFFE4E1); //@@@: cUtil.listAdd(cb_list, "MistyRose ", (int)0xFFE4E1);
            cUtil.listAdd(cb_list, "Moccasin ", (int)0xFFE4B5); //@@@: cUtil.listAdd(cb_list, "Moccasin ", (int)0xFFE4B5);
            cUtil.listAdd(cb_list, "NavajoWhite ", (int)0xFFDEAD); //@@@: cUtil.listAdd(cb_list, "NavajoWhite ", (int)0xFFDEAD);
            cUtil.listAdd(cb_list, "Navy ", (int)0x000080); //@@@: cUtil.listAdd(cb_list, "Navy ", (int)0x000080);
            cUtil.listAdd(cb_list, "OldLace ", (int)0xFDF5E6); //@@@: cUtil.listAdd(cb_list, "OldLace ", (int)0xFDF5E6);
            cUtil.listAdd(cb_list, "Olive ", (int)0x808000); //@@@: cUtil.listAdd(cb_list, "Olive ", (int)0x808000);
            cUtil.listAdd(cb_list, "OliveDrab ", (int)0x6B8E23); //@@@: cUtil.listAdd(cb_list, "OliveDrab ", (int)0x6B8E23);
            cUtil.listAdd(cb_list, "Orange ", (int)0xFFA500); //@@@: cUtil.listAdd(cb_list, "Orange ", (int)0xFFA500);
            cUtil.listAdd(cb_list, "OrangeRed ", (int)0xFF4500); //@@@: cUtil.listAdd(cb_list, "OrangeRed ", (int)0xFF4500);
            cUtil.listAdd(cb_list, "Orchid ", (int)0xDA70D6); //@@@: cUtil.listAdd(cb_list, "Orchid ", (int)0xDA70D6);
            cUtil.listAdd(cb_list, "PaleGoldenrod ", (int)0xEEE8AA); //@@@: cUtil.listAdd(cb_list, "PaleGoldenrod ", (int)0xEEE8AA);
            cUtil.listAdd(cb_list, "PaleGreen ", (int)0x98FB98); //@@@: cUtil.listAdd(cb_list, "PaleGreen ", (int)0x98FB98);
            cUtil.listAdd(cb_list, "PaleTurquoise ", (int)0xAFEEEE); //@@@: cUtil.listAdd(cb_list, "PaleTurquoise ", (int)0xAFEEEE);
            cUtil.listAdd(cb_list, "PaleVioletRed ", (int)0xDB7093); //@@@: cUtil.listAdd(cb_list, "PaleVioletRed ", (int)0xDB7093);
            cUtil.listAdd(cb_list, "PapayaWhip ", (int)0xFFEFD5); //@@@: cUtil.listAdd(cb_list, "PapayaWhip ", (int)0xFFEFD5);
            cUtil.listAdd(cb_list, "PeachPuff ", (int)0xFFDAB9); //@@@: cUtil.listAdd(cb_list, "PeachPuff ", (int)0xFFDAB9);
            cUtil.listAdd(cb_list, "Peru ", (int)0xCD853F); //@@@: cUtil.listAdd(cb_list, "Peru ", (int)0xCD853F);
            cUtil.listAdd(cb_list, "Pink ", (int)0xFFC0CB); //@@@: cUtil.listAdd(cb_list, "Pink ", (int)0xFFC0CB);
            cUtil.listAdd(cb_list, "Plum ", (int)0xDDA0DD); //@@@: cUtil.listAdd(cb_list, "Plum ", (int)0xDDA0DD);
            cUtil.listAdd(cb_list, "PowderBlue ", (int)0xB0E0E6); //@@@: cUtil.listAdd(cb_list, "PowderBlue ", (int)0xB0E0E6);
            cUtil.listAdd(cb_list, "Purple ", (int)0x800080); //@@@: cUtil.listAdd(cb_list, "Purple ", (int)0x800080);
            cUtil.listAdd(cb_list, "Red ", (int)0xFF0000); //@@@: cUtil.listAdd(cb_list, "Red ", (int)0xFF0000);
            cUtil.listAdd(cb_list, "RosyBrown ", (int)0xBC8F8F); //@@@: cUtil.listAdd(cb_list, "RosyBrown ", (int)0xBC8F8F);
            cUtil.listAdd(cb_list, "RoyalBlue ", (int)0x4169E1); //@@@: cUtil.listAdd(cb_list, "RoyalBlue ", (int)0x4169E1);
            cUtil.listAdd(cb_list, "SaddleBrown ", (int)0x8B4513); //@@@: cUtil.listAdd(cb_list, "SaddleBrown ", (int)0x8B4513);
            cUtil.listAdd(cb_list, "Salmon ", (int)0xFA8072); //@@@: cUtil.listAdd(cb_list, "Salmon ", (int)0xFA8072);
            cUtil.listAdd(cb_list, "SandyBrown ", (int)0xF4A460); //@@@: cUtil.listAdd(cb_list, "SandyBrown ", (int)0xF4A460);
            cUtil.listAdd(cb_list, "SeaGreen ", (int)0x2E8B57); //@@@: cUtil.listAdd(cb_list, "SeaGreen ", (int)0x2E8B57);
            cUtil.listAdd(cb_list, "SeaShell ", (int)0xFFF5EE); //@@@: cUtil.listAdd(cb_list, "SeaShell ", (int)0xFFF5EE);
            cUtil.listAdd(cb_list, "Sienna ", (int)0xA0522D); //@@@: cUtil.listAdd(cb_list, "Sienna ", (int)0xA0522D);
            cUtil.listAdd(cb_list, "Silver ", (int)0xC0C0C0); //@@@: cUtil.listAdd(cb_list, "Silver ", (int)0xC0C0C0);
            cUtil.listAdd(cb_list, "SkyBlue ", (int)0x87CEEB); //@@@: cUtil.listAdd(cb_list, "SkyBlue ", (int)0x87CEEB);
            cUtil.listAdd(cb_list, "SlateBlue ", (int)0x6A5ACD); //@@@: cUtil.listAdd(cb_list, "SlateBlue ", (int)0x6A5ACD);
            cUtil.listAdd(cb_list, "SlateGray ", (int)0x708090); //@@@: cUtil.listAdd(cb_list, "SlateGray ", (int)0x708090);
            cUtil.listAdd(cb_list, "Snow ", (int)0xFFFAFA); //@@@: cUtil.listAdd(cb_list, "Snow ", (int)0xFFFAFA);
            cUtil.listAdd(cb_list, "SpringGreen ", (int)0x00FF7F); //@@@: cUtil.listAdd(cb_list, "SpringGreen ", (int)0x00FF7F);
            cUtil.listAdd(cb_list, "SteelBlue ", (int)0x4682B4); //@@@: cUtil.listAdd(cb_list, "SteelBlue ", (int)0x4682B4);
            cUtil.listAdd(cb_list, "Tan ", (int)0xD2B48C); //@@@: cUtil.listAdd(cb_list, "Tan ", (int)0xD2B48C);
            cUtil.listAdd(cb_list, "Teal ", (int)0x008080); //@@@: cUtil.listAdd(cb_list, "Teal ", (int)0x008080);
            cUtil.listAdd(cb_list, "Thistle ", (int)0xD8BFD8); //@@@: cUtil.listAdd(cb_list, "Thistle ", (int)0xD8BFD8);
            cUtil.listAdd(cb_list, "Tomato ", (int)0xFF6347); //@@@: cUtil.listAdd(cb_list, "Tomato ", (int)0xFF6347);
            cUtil.listAdd(cb_list, "Transparent ", (int)0xFFFF); //@@@: cUtil.listAdd(cb_list, "Transparent ", (int)0xFFFF);
            cUtil.listAdd(cb_list, "Turquoise ", (int)0x40E0D0); //@@@: cUtil.listAdd(cb_list, "Turquoise ", (int)0x40E0D0);
            cUtil.listAdd(cb_list, "Violet ", (int)0xEE82EE); //@@@: cUtil.listAdd(cb_list, "Violet ", (int)0xEE82EE);
            cUtil.listAdd(cb_list, "Wheat ", (int)0xF5DEB3); //@@@: cUtil.listAdd(cb_list, "Wheat ", (int)0xF5DEB3);
            cUtil.listAdd(cb_list, "White ", (int)0xFFFFFF); //@@@: cUtil.listAdd(cb_list, "White ", (int)0xFFFFFF);
            cUtil.listAdd(cb_list, "WhiteSmoke ", (int)0xF5F5F5); //@@@: cUtil.listAdd(cb_list, "WhiteSmoke ", (int)0xF5F5F5);
            cUtil.listAdd(cb_list, "Yellow ", (int)0xFFFF00); //@@@: cUtil.listAdd(cb_list, "Yellow ", (int)0xFFFF00);
            cUtil.listAdd(cb_list, "YellowGreen ", (int)0x9ACD32); //@@@: cUtil.listAdd(cb_list, "YellowGreen ", (int)0x9ACD32);
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmd_foreColor_Click = function(sender, e) { //@@@: private void cmd_foreColor_Click(object sender, EventArgs e)
            picColor(tx_foreColor, sh_foreColor); //@@@: picColor(tx_foreColor, sh_foreColor);
        }; //@@@: }

        const cmd_backColor_Click = function(sender, e) { //@@@: private void cmd_backColor_Click(object sender, EventArgs e)
            picColor(tx_backColor, sh_backColor); //@@@: picColor(tx_backColor, sh_backColor);
        }; //@@@: }

        const picColor = function(txColor, shColor) { //@@@: private void picColor(TextBox txColor, Label shColor)
            // Show the color dialog.
            let result = colorDialog.ShowDialog(); //@@@: DialogResult result = colorDialog.ShowDialog();
            // See if user pressed ok.
            if (result === DialogResult.OK) { //@@@: if (result == DialogResult.OK)
                // Set form background to the selected color.
                txColor.Text = colorDialog.Color.ToArgb().ToString(); //@@@: txColor.Text = colorDialog.Color.ToArgb().ToString();
                shColor.BackColor = colorDialog.Color; //@@@: shColor.BackColor = colorDialog.Color;
            } //@@@: }
        }; //@@@: }

        const cmd_font_Click = function(sender, e) { //@@@: private void cmd_font_Click(object sender, EventArgs e)

            fontDialog.ShowEffects = true; //@@@: fontDialog.ShowEffects = true;

            let fontStyle = FontStyle.Regular; //@@@: FontStyle fontStyle = FontStyle.Regular;
            if (chkFontBold.Checked) fontStyle = fontStyle | FontStyle.Bold; { //@@@: if (chkFontBold.Checked) fontStyle = fontStyle | FontStyle.Bold;
            if (chkFontItalic.Checked) fontStyle = fontStyle | FontStyle.Italic; { //@@@: if (chkFontItalic.Checked) fontStyle = fontStyle | FontStyle.Italic;
            if (chkFontUnderline.Checked) fontStyle = fontStyle | FontStyle.Underline; { //@@@: if (chkFontUnderline.Checked) fontStyle = fontStyle | FontStyle.Underline;
            if (chkFontStrike.Checked) fontStyle = fontStyle | FontStyle.Strikeout; { //@@@: if (chkFontStrike.Checked) fontStyle = fontStyle | FontStyle.Strikeout;

            let fontSize = cUtil.val(txFontSize.Text); //@@@: float fontSize = (float)cUtil.val(txFontSize.Text);
            let font = new Font(txFont.Text, ((fontSize > 0f) ? fontSize : 3f), fontStyle); //@@@: Font font = new Font(txFont.Text, ((fontSize > 0f) ? fontSize : 3f), fontStyle);

            fontDialog.Font = font; //@@@: fontDialog.Font = font;
            fontDialog.Color = cColor.colorFromRGB(cUtil.valAsInt(txForeColor.Text)); //@@@: fontDialog.Color = cColor.colorFromRGB(cUtil.valAsInt(txForeColor.Text));

	        let result = fontDialog.ShowDialog(); //@@@: DialogResult result = fontDialog.ShowDialog();

            if (result === DialogResult.OK) { //@@@: if (result == DialogResult.OK)
                font = fontDialog.Font; //@@@: font = fontDialog.Font;

                txFont.Text = font.Name; //@@@: txFont.Text = font.Name;
                chkFontBold.Checked = font.Bold; //@@@: chkFontBold.Checked = font.Bold;
                chkFontItalic.Checked = font.Italic; //@@@: chkFontItalic.Checked = font.Italic;
                chkFontUnderline.Checked = font.Underline; //@@@: chkFontUnderline.Checked = font.Underline;
                chkFontStrike.Checked = font.Strikeout; //@@@: chkFontStrike.Checked = font.Strikeout;
                txFontSize.Text = font.Size.ToString(); //@@@: txFontSize.Text = font.Size.ToString();
                txForeColor.Text = fontDialog.Color.ToArgb().ToString(); //@@@: txForeColor.Text = fontDialog.Color.ToArgb().ToString();
                shForeColor.BackColor = fontDialog.Color; //@@@: shForeColor.BackColor = fontDialog.Color;
            }             //@@@: }
        }; //@@@: }

        const cmd_borderColor_Click_1 = function(sender, e) { //@@@: private void cmd_borderColor_Click_1(object sender, EventArgs e)
            picColor(tx_borderColor, sh_borderColor); //@@@: picColor(tx_borderColor, sh_borderColor);
        }; //@@@: }

        const cmd_borderColor3d_Click = function(sender, e) { //@@@: private void cmd_borderColor3d_Click(object sender, EventArgs e)
            picColor(tx_border3D, sh_border3D); //@@@: picColor(tx_border3D, sh_border3D);
        }; //@@@: }

        const cmd_borderShadowColor_Click = function(sender, e) { //@@@: private void cmd_borderShadowColor_Click(object sender, EventArgs e)
            picColor(tx_borderShadow, sh_borderShadow); //@@@: picColor(tx_borderShadow, sh_borderShadow);
        }; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

        const cmd_dbField_Click = function(sender, e) { //@@@: private void cmd_dbField_Click(object sender, EventArgs e)
            if (m_editor.showHelpDbField()) { //@@@: if (m_editor.showHelpDbField())
                m_dbFieldChanged = true; //@@@: m_dbFieldChanged = true;
            } //@@@: }
        }; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const tx_name_TextChanged = function(sender, e) { //@@@: private void tx_name_TextChanged(object sender, EventArgs e)

        }; //@@@: }

        const tx_text_TextChanged = function(sender, e) { //@@@: private void tx_text_TextChanged(object sender, EventArgs e)
            m_textChanged = true; //@@@: m_textChanged = true;
        }; //@@@: }

        const tx_tag_TextChanged = function(sender, e) { //@@@: private void tx_tag_TextChanged(object sender, EventArgs e)
            m_tagChanged = true; //@@@: m_tagChanged = true;
        }; //@@@: }

        const tx_font_TextChanged = function(sender, e) { //@@@: private void tx_font_TextChanged(object sender, EventArgs e)
            m_fontChanged = true; //@@@: m_fontChanged = true;
        }; //@@@: }

        const tx_fontSize_TextChanged = function(sender, e) { //@@@: private void tx_fontSize_TextChanged(object sender, EventArgs e)
            m_fontSizeChanged = true; //@@@: m_fontSizeChanged = true;
        }; //@@@: }

        const cb_align_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_align_SelectedIndexChanged(object sender, EventArgs e)
            m_alignChanged = true; //@@@: m_alignChanged = true;
        }; //@@@: }

        const tx_foreColor_TextChanged = function(sender, e) { //@@@: private void tx_foreColor_TextChanged(object sender, EventArgs e)
            m_foreColorChanged = true; //@@@: m_foreColorChanged = true;
        }; //@@@: }

        const tx_backColor_TextChanged = function(sender, e) { //@@@: private void tx_backColor_TextChanged(object sender, EventArgs e)
            m_backColorChanged = true; //@@@: m_backColorChanged = true;
        }; //@@@: }

        const tx_format_TextChanged = function(sender, e) { //@@@: private void tx_format_TextChanged(object sender, EventArgs e)
            m_formatChanged = true; //@@@: m_formatChanged = true;
        }; //@@@: }

        const tx_symbol_TextChanged = function(sender, e) { //@@@: private void tx_symbol_TextChanged(object sender, EventArgs e)
            m_symbolChanged = true; //@@@: m_symbolChanged = true;
        }; //@@@: }

        const chk_fontBold_CheckedChanged = function(sender, e) { //@@@: private void chk_fontBold_CheckedChanged(object sender, EventArgs e)
            m_boldChanged = true; //@@@: m_boldChanged = true;
        }; //@@@: }

        const chk_fontUnderline_CheckedChanged = function(sender, e) { //@@@: private void chk_fontUnderline_CheckedChanged(object sender, EventArgs e)
            m_underlineChanged = true; //@@@: m_underlineChanged = true;
        }; //@@@: }

        const chk_fontItalic_CheckedChanged = function(sender, e) { //@@@: private void chk_fontItalic_CheckedChanged(object sender, EventArgs e)
            m_italicChanged = true; //@@@: m_italicChanged = true;
        }; //@@@: }

        const chk_fontStrike_CheckedChanged = function(sender, e) { //@@@: private void chk_fontStrike_CheckedChanged(object sender, EventArgs e)
            m_strikeChanged = true; //@@@: m_strikeChanged = true;
        }; //@@@: }

        const tx_left_TextChanged = function(sender, e) { //@@@: private void tx_left_TextChanged(object sender, EventArgs e)
            m_leftChanged = true; //@@@: m_leftChanged = true;
        }; //@@@: }

        const tx_top_TextChanged = function(sender, e) { //@@@: private void tx_top_TextChanged(object sender, EventArgs e)
            m_topChanged = true; //@@@: m_topChanged = true;
        }; //@@@: }

        const tx_height_TextChanged = function(sender, e) { //@@@: private void tx_height_TextChanged(object sender, EventArgs e)
            m_heightChanged = true; //@@@: m_heightChanged = true;
        }; //@@@: }

        const tx_width_TextChanged = function(sender, e) { //@@@: private void tx_width_TextChanged(object sender, EventArgs e)
            m_widthChanged = true; //@@@: m_widthChanged = true;
        }; //@@@: }

        const chk_canGrow_CheckedChanged = function(sender, e) { //@@@: private void chk_canGrow_CheckedChanged(object sender, EventArgs e)
            m_canGrowChanged = true; //@@@: m_canGrowChanged = true;
        }; //@@@: }

        const chk_wordWrap_CheckedChanged = function(sender, e) { //@@@: private void chk_wordWrap_CheckedChanged(object sender, EventArgs e)
            m_wordWrapChanged = true; //@@@: m_wordWrapChanged = true;
        }; //@@@: }

        const chk_isFreeCtrl_CheckedChanged = function(sender, e) { //@@@: private void chk_isFreeCtrl_CheckedChanged(object sender, EventArgs e)
            m_isFreeCtrlChanged = true; //@@@: m_isFreeCtrlChanged = true;
        }; //@@@: }

        const tx_exportColIdx_TextChanged = function(sender, e) { //@@@: private void tx_exportColIdx_TextChanged(object sender, EventArgs e)
            m_exportColIdxChanged = true; //@@@: m_exportColIdxChanged = true;
        }; //@@@: }

        const cb_borderType_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_borderType_SelectedIndexChanged(object sender, EventArgs e)
            m_borderTypeChanged = true; //@@@: m_borderTypeChanged = true;
        }; //@@@: }

        const tx_borderColor_TextChanged = function(sender, e) { //@@@: private void tx_borderColor_TextChanged(object sender, EventArgs e)
            m_borderColorChanged = true; //@@@: m_borderColorChanged = true;
        }; //@@@: }

        const tx_border3D_TextChanged = function(sender, e) { //@@@: private void tx_border3D_TextChanged(object sender, EventArgs e)
            m_border3DChanged = true; //@@@: m_border3DChanged = true;
        }; //@@@: }

        const tx_borderShadow_TextChanged = function(sender, e) { //@@@: private void tx_borderShadow_TextChanged(object sender, EventArgs e)
            m_border3DShadowChanged = true; //@@@: m_border3DShadowChanged = true;
        }; //@@@: }

        const tx_borderWidth_TextChanged_1 = function(sender, e) { //@@@: private void tx_borderWidth_TextChanged_1(object sender, EventArgs e)
            m_borderWidthChanged = true; //@@@: m_borderWidthChanged = true;
        }; //@@@: }

        const chk_borderRounded_CheckedChanged = function(sender, e) { //@@@: private void chk_borderRounded_CheckedChanged(object sender, EventArgs e)
            m_borderRoundedChanged = true; //@@@: m_borderRoundedChanged = true;
        }; //@@@: }

        const cb_type_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_type_SelectedIndexChanged(object sender, EventArgs e)
            m_chartTypeChanged = true; //@@@: m_chartTypeChanged = true;
        }; //@@@: }

        const cb_formatType_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_formatType_SelectedIndexChanged(object sender, EventArgs e)
            m_chartFormatTypeChanged = true; //@@@: m_chartFormatTypeChanged = true;
        }; //@@@: }

        const cb_linesType_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_linesType_SelectedIndexChanged(object sender, EventArgs e)
            m_chartLinesTypeChanged = true; //@@@: m_chartLinesTypeChanged = true;
        }; //@@@: }

        const cb_chartSize_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_chartSize_SelectedIndexChanged(object sender, EventArgs e)
            m_chartSizeChanged = true; //@@@: m_chartSizeChanged = true;
        }; //@@@: }

        const tx_chartTop_TextChanged_1 = function(sender, e) { //@@@: private void tx_chartTop_TextChanged_1(object sender, EventArgs e)
            m_chartTopChanged = true; //@@@: m_chartTopChanged = true;
        }; //@@@: }

        const cb_chartThickness_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_chartThickness_SelectedIndexChanged(object sender, EventArgs e)
            m_chartThicknessChanged = true; //@@@: m_chartThicknessChanged = true;
        }; //@@@: }

        const chk_showBarValues_CheckedChanged = function(sender, e) { //@@@: private void chk_showBarValues_CheckedChanged(object sender, EventArgs e)
            m_chartShowValuesChanged = true; //@@@: m_chartShowValuesChanged = true;
        }; //@@@: }

        const chk_showOutlines_CheckedChanged = function(sender, e) { //@@@: private void chk_showOutlines_CheckedChanged(object sender, EventArgs e)
            m_chartShowLinesChanged = true; //@@@: m_chartShowLinesChanged = true;
        }; //@@@: }

        const chk_sort_CheckedChanged = function(sender, e) { //@@@: private void chk_sort_CheckedChanged(object sender, EventArgs e)
            m_chartSortChanged = true; //@@@: m_chartSortChanged = true;
        }; //@@@: }

        const tx_dbFieldGroupValue_TextChanged = function(sender, e) { //@@@: private void tx_dbFieldGroupValue_TextChanged(object sender, EventArgs e)
            m_chartFieldGroupChanged = true; //@@@: m_chartFieldGroupChanged = true;
        }; //@@@: }

        const tx_chartGroupValue_TextChanged_1 = function(sender, e) { //@@@: private void tx_chartGroupValue_TextChanged_1(object sender, EventArgs e)
            m_chartGroupValueChanged = true; //@@@: m_chartGroupValueChanged = true;
        }; //@@@: }

        const tx_dbFieldVal1_TextChanged = function(sender, e) { //@@@: private void tx_dbFieldVal1_TextChanged(object sender, EventArgs e)
            m_chartFieldVal1Changed = true; //@@@: m_chartFieldVal1Changed = true;
        }; //@@@: }

        const tx_dbFieldLbl1_TextChanged = function(sender, e) { //@@@: private void tx_dbFieldLbl1_TextChanged(object sender, EventArgs e)
            m_chartFieldLbl1Changed = true; //@@@: m_chartFieldLbl1Changed = true;
        }; //@@@: }

        const cb_colorSerie1_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_colorSerie1_SelectedIndexChanged(object sender, EventArgs e)
            m_chartColorSerie1Changed = true; //@@@: m_chartColorSerie1Changed = true;
        }; //@@@: }

        const tx_dbFieldVal2_TextChanged = function(sender, e) { //@@@: private void tx_dbFieldVal2_TextChanged(object sender, EventArgs e)
            m_chartFieldVal2Changed = true; //@@@: m_chartFieldVal2Changed = true;
        }; //@@@: }

        const tx_dbFieldLbl2_TextChanged = function(sender, e) { //@@@: private void tx_dbFieldLbl2_TextChanged(object sender, EventArgs e)
            m_chartFieldLbl2Changed = true; //@@@: m_chartFieldLbl2Changed = true;
        }; //@@@: }

        const cb_colorSerie2_SelectedIndexChanged = function(sender, e) { //@@@: private void cb_colorSerie2_SelectedIndexChanged(object sender, EventArgs e)
            m_chartColorSerie2Changed = true; //@@@: m_chartColorSerie2Changed = true;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
