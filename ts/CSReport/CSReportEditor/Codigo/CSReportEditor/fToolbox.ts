(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFToolbox = function() {

        // @ts-ignore
        let self: CSReportEditor.IfToolbox = {};
        let m_editor: cEditor = null;

        const C_CTRL_IMAGE: number = 0;
        const C_LABEL_IMAGE: number = 1;
        const C_FORMULA_FOLDER_IMAGE: number = 2;
        const C_FORMULA_IMAGE: number = 3;

        const C_CONTROL_NAME: string = "C";
        const C_FORMULA_NAME: string = "F";

        const C_FIELD_INDEX: string = "FC";
        const C_FIELD_TYPE: string = "FT";

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
            let item: var = lv_formulas.Items.Add(name, C_FORMULA_IMAGE);
            let info: var = "";
            info = cUtil.setInfoString(info, C_CONTROL_NAME, controlName);
            info = cUtil.setInfoString(info, C_FORMULA_NAME, formulaName);
            item.Tag = info;
        };

        self.addField = function(name, fieldType, fieldIndex) {
            let item: var = lv_controls.Items.Add(name, C_CTRL_IMAGE);
            let info: var = "";
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

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfToolbox {

    clear: () => void;
    addLbFormula: (string) => void;
    addFormula: (string, string, string) => void;
    addField: (string, int, int) => void;
    addLabels: (string) => void;
    setHandler: (cEditor) => void;
  }
}
