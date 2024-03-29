namespace CSReportEditor {

    import Form = CSForms.Form;

    export class FToolbox extends Form {

        private editor: cEditor = null;

        private C_CTRL_IMAGE: number = 0;
        private C_LABEL_IMAGE: number = 1;
        private C_FORMULA_FOLDER_IMAGE: number = 2;
        private C_FORMULA_IMAGE: number = 3;

        private C_CONTROL_NAME: string = "C";
        private C_FORMULA_NAME: string = "F";

        private C_FIELD_INDEX: string = "FC";
        private C_FIELD_TYPE: string = "FT";

        public constructor() {
            super();
            // InitializeComponent();
        }

        public clear() {
            // lv_controls.Items.clear();
            // lv_labels.Items.clear();
            // lv_formulas.Items.clear();
        }

        public addLbFormula(controlName: string) {
            // lv_formulas.Items.Add(controlName, C_FORMULA_FOLDER_IMAGE);
        }

        public addFormula(name: string, controlName: string, formulaName: string) {
            // let item = lv_formulas.Items.Add(name, C_FORMULA_IMAGE);
            // let info = "";
            // info = cUtil.setInfoString(info, C_CONTROL_NAME, controlName);
            // info = cUtil.setInfoString(info, C_FORMULA_NAME, formulaName);
            // item.Tag = info;
        }

        public addField(name: string, fieldType: number, fieldIndex: number) {
            // let item = lv_controls.Items.Add(name, C_CTRL_IMAGE);
            // let info = "";
            // info = cUtil.setInfoString(info, C_FIELD_INDEX, fieldType.toString());
            // info = cUtil.setInfoString(info, C_FIELD_TYPE, fieldIndex.toString());
            // item.Tag = info;
        }

        public addLabels(name: string) {
            // lv_labels.Items.Add(name, C_LABEL_IMAGE);
        }

        public setHandler(editor: cEditor) {
            // this.editor = editor;
        }
    }
}
