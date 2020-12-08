(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFProperties = function() {

        const self = {}; //@@@: public partial class fProperties : Form
        let m_ok = null; //@@@: private bool m_ok;
        let m_done = null; //@@@: private bool m_done;

        let m_index = 0; //@@@: private int m_index = 0;
        let m_fieldType = 0; //@@@: private int m_fieldType = 0;

        let m_formulaHide = ""; //@@@: private String m_formulaHide = "";
        let m_formulaValue = ""; //@@@: private String m_formulaValue = "";

        let m_formulaName = ""; //@@@: private String m_formulaName = "";

        let m_isAccounting = null; //@@@: private bool m_isAccounting;

        let m_mouse = null; //@@@: private cMouseWait m_mouse;

        const C_LABEL = 0; //@@@: private const int C_LABEL = 0;
        const C_FORMULA = 1; //@@@: private const int C_FORMULA = 1;
        const C_FIELD = 2; //@@@: private const int C_FIELD = 2;
        const C_IMAGE = 3; //@@@: private const int C_IMAGE = 3;
        const C_CHART = 5; //@@@: private const int C_CHART = 5;

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
            let cancel = false; //@@@: bool cancel = false;
            m_formulaName = "Ocultar"; //@@@: m_formulaName = "Ocultar";
            showFormula(m_formulaHide, cancel); //@@@: showFormula(m_formulaHide, out cancel);
            if (!cancel) { //@@@: if (!cancel)
                m_formulaHideChanged = true; //@@@: m_formulaHideChanged = true;
                lb_formulaHide.Text = m_formulaHide; //@@@: lb_formulaHide.Text = m_formulaHide;
            } //@@@: }
        }; //@@@: }

        const cmd_formulaValue_Click = function(sender, e) { //@@@: private void cmd_formulaValue_Click(object sender, EventArgs e)
            let cancel = false; //@@@: bool cancel = false;
            m_formulaName = "Valor"; //@@@: m_formulaName = "Valor";
            showFormula(m_formulaValue, cancel); //@@@: showFormula(m_formulaValue, out cancel);
            if (!cancel) { //@@@: if (!cancel)
                m_formulaValueChanged = true; //@@@: m_formulaValueChanged = true;
                lbFormulaValue.Text = m_formulaValue; //@@@: lbFormulaValue.Text = m_formulaValue;
            } //@@@: }
        }; //@@@: }

        const showFormula = function(formula, cancel) { //@@@: private void showFormula(String formula, out bool cancel)
            //TODO: fix me
            cancel = false; //@@@: cancel = false;
            /* //@@@: /*
          Iterator listeners = m_listeners.iterator();
          while(listeners.hasNext()) {
              (listeners.next()).showEditFormula(formula, cancel);
          };*/
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

        const cmd_dbField_Click = function(sender, e) { //@@@: private void cmd_dbField_Click(object sender, EventArgs e)
            /* TODO: fix me //@@@: /* TODO: fix me
            bool cancel = false;
            Iterator listeners = m_listeners.iterator();
            while(listeners.hasNext()) {
                (listeners.next()).showHelpDbField(cancel);
            };
            if (!cancel) {
              m_dbFieldChanged = true;
            }
             * */
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

        const cmd_foreColor_Click = function(sender, e) { //@@@: private void cmd_foreColor_Click(object sender, EventArgs e)
            try { //@@@: try
                /* TODO: fix me //@@@: /* TODO: fix me
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
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const tx_foreColor_LostFocus = function(sender, e) { //@@@: private void tx_foreColor_LostFocus(object sender, EventArgs e)
            try { //@@@: try
                shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text)); //@@@: shForeColor.BackColor = Color.FromArgb(Int32.Parse(tx_foreColor.Text));
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const cmd_backColor_Click = function(sender, e) { //@@@: private void cmd_backColor_Click(object sender, EventArgs e)
            try { //@@@: try
                /* TODO: fix me //@@@: /* TODO: fix me
                __TYPE_NOT_FOUND w___TYPE_NOT_FOUND = CommDialog;
                w___TYPE_NOT_FOUND.CancelError = true;
                w___TYPE_NOT_FOUND.Color = TxBackColor.csValue;
                VBA.ex.clear();
                w___TYPE_NOT_FOUND.ShowColor;
                if (VBA.ex.Number !== 0) { return; }
                TxBackColor.cReportPaintObject.setText(w___TYPE_NOT_FOUND.Color);
                shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
                 * */
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const tx_backColor_LostFocus = function(sender, e) { //@@@: private void tx_backColor_LostFocus(object sender, EventArgs e)
            try { //@@@: try
                shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text)); //@@@: shBackColor.BackColor = Color.FromArgb(Int32.Parse(tx_backColor.Text));
            } //@@@: }
            catch (ignore) { } //@@@: catch (Exception ignore) { }
        }; //@@@: }

        const cmd_font_Click = function(sender, e) { //@@@: private void cmd_font_Click(object sender, EventArgs e)
            try { //@@@: try

                /* TODO: fix me //@@@: /* TODO: fix me
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
            tab_main.TabPages.RemoveAt(C_FIELD); //@@@: tab_main.TabPages.RemoveAt(C_FIELD);
        }; //@@@: }

        self.hideTabImage = function() { //@@@: public void hideTabImage()
            tab_main.TabPages.RemoveAt(C_IMAGE); //@@@: tab_main.TabPages.RemoveAt(C_IMAGE);
        }; //@@@: }

        self.hideTabChart = function() { //@@@: public void hideTabChart()
            tab_main.TabPages.RemoveAt(C_CHART); //@@@: tab_main.TabPages.RemoveAt(C_CHART);
        }; //@@@: }

        //------------------------------------------------------------------------------------------------------------------

        // setters and getters for no control properties

        //------------------------------------------------------------------------------------------------------------------

        /* //@@@: /*
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
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
