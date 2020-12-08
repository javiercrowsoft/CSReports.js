(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFToolbox = function() {

        const self = {};
        let m_editor = null;

        const C_CTRL_IMAGE = 0;
        const C_LABEL_IMAGE = 1;
        const C_FORMULA_FOLDER_IMAGE = 2;
        const C_FORMULA_IMAGE = 3;

        const C_CONTROL_NAME = "C";
        const C_FORMULA_NAME = "F";

        const C_FIELD_INDEX = "FC";
        const C_FIELD_TYPE = "FT";

        const fToolbox = function() {
            InitializeComponent();
        };

        self.clear = function() {
            lv_controls.Items.Clear();
            lv_labels.Items.Clear();
            lv_formulas.Items.Clear();
        };

        self.addLbFormula = function(controlName) {
            lv_formulas.Items.Add(controlName, C_FORMULA_FOLDER_IMAGE);
        };

        self.addFormula = function(name, controlName, formulaName) {
            let item = lv_formulas.Items.Add(name, C_FORMULA_IMAGE);
            let info = "";
            info = cUtil.setInfoString(info, C_CONTROL_NAME, controlName);
            info = cUtil.setInfoString(info, C_FORMULA_NAME, formulaName);
            item.Tag = info;
        };

        self.addField = function(name, fieldType, fieldIndex) {
            let item = lv_controls.Items.Add(name, C_CTRL_IMAGE);
            let info = "";
            info = cUtil.setInfoString(info, C_FIELD_INDEX, fieldType.ToString());
            info = cUtil.setInfoString(info, C_FIELD_TYPE, fieldIndex.ToString());
            item.Tag = info;
        };

        self.addLabels = function(name) {
            lv_labels.Items.Add(name, C_LABEL_IMAGE);
        };

        self.setHandler = function(editor) {
            m_editor = editor;
        };

        return self;

    }
}(globalObject));
