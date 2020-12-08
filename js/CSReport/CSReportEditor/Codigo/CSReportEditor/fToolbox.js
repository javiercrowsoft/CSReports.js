(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFToolbox = function() {

        const self = {}; //@@@: public partial class fToolbox : Form
        let m_editor = null; //@@@: private cEditor m_editor;

        const C_CTRL_IMAGE = 0; //@@@: private const int C_CTRL_IMAGE = 0;
        const C_LABEL_IMAGE = 1; //@@@: private const int C_LABEL_IMAGE = 1;
        const C_FORMULA_FOLDER_IMAGE = 2; //@@@: private const int C_FORMULA_FOLDER_IMAGE = 2;
        const C_FORMULA_IMAGE = 3; //@@@: private const int C_FORMULA_IMAGE = 3;

        const C_CONTROL_NAME = "C"; //@@@: private const string C_CONTROL_NAME = "C";
        const C_FORMULA_NAME = "F"; //@@@: private const string C_FORMULA_NAME = "F";

        const C_FIELD_INDEX = "FC"; //@@@: private const string C_FIELD_INDEX = "FC";
        const C_FIELD_TYPE = "FT"; //@@@: private const string C_FIELD_TYPE = "FT";

        const fToolbox = function() { //@@@: public fToolbox()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.clear = function() { //@@@: public void clear()
            lv_controls.Items.Clear(); //@@@: lv_controls.Items.Clear();
            lv_labels.Items.Clear(); //@@@: lv_labels.Items.Clear();
            lv_formulas.Items.Clear(); //@@@: lv_formulas.Items.Clear();
        }; //@@@: }

        self.addLbFormula = function(controlName) { //@@@: internal void addLbFormula(string controlName)
            lv_formulas.Items.Add(controlName, C_FORMULA_FOLDER_IMAGE); //@@@: lv_formulas.Items.Add(controlName, C_FORMULA_FOLDER_IMAGE);
        }; //@@@: }

        self.addFormula = function(name, controlName, formulaName) { //@@@: internal void addFormula(string name, string controlName, string formulaName)
            let item = lv_formulas.Items.Add(name, C_FORMULA_IMAGE); //@@@: var item = lv_formulas.Items.Add(name, C_FORMULA_IMAGE);
            let info = ""; //@@@: var info = "";
            info = cUtil.setInfoString(info, C_CONTROL_NAME, controlName); //@@@: info = cUtil.setInfoString(info, C_CONTROL_NAME, controlName);
            info = cUtil.setInfoString(info, C_FORMULA_NAME, formulaName); //@@@: info = cUtil.setInfoString(info, C_FORMULA_NAME, formulaName);
            item.Tag = info; //@@@: item.Tag = info;
        }; //@@@: }

        self.addField = function(name, fieldType, fieldIndex) { //@@@: internal void addField(string name, int fieldType, int fieldIndex)
            let item = lv_controls.Items.Add(name, C_CTRL_IMAGE); //@@@: var item = lv_controls.Items.Add(name, C_CTRL_IMAGE);
            let info = ""; //@@@: var info = "";
            info = cUtil.setInfoString(info, C_FIELD_INDEX, fieldType.ToString()); //@@@: info = cUtil.setInfoString(info, C_FIELD_INDEX, fieldType.ToString());
            info = cUtil.setInfoString(info, C_FIELD_TYPE, fieldIndex.ToString()); //@@@: info = cUtil.setInfoString(info, C_FIELD_TYPE, fieldIndex.ToString());
            item.Tag = info; //@@@: item.Tag = info;
        }; //@@@: }

        self.addLabels = function(name) { //@@@: internal void addLabels(string name)
            lv_labels.Items.Add(name, C_LABEL_IMAGE); //@@@: lv_labels.Items.Add(name, C_LABEL_IMAGE);
        }; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
