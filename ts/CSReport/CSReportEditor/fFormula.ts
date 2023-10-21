///<reference path="../../CSForms/controls/TreeView.ts"/>
///<reference path="../../CSForms/controls/Dialog.ts"/>
///<reference path="../../CSForms/controls/TextBox.ts"/>
///<reference path="../../CSForms/controls/Label.ts"/>
///<reference path="../../CSForms/controls/TabPage.ts"/>

namespace CSReportEditor {

    import U = CSOAPI.Utils;
    import Form = CSForms.Form;
    import csRptFormulaType = CSReportGlobals.csRptFormulaType;
    import csRptControlType = CSReportGlobals.csRptControlType;
    import P = CSKernelClient.Callable;

    import TreeView = CSForms.TreeView;
    import Node = CSForms.Node;
    import TreeViewAction = CSForms.TreeViewAction;
    import Label = CSForms.Label;
    import TextBox = CSForms.TextBox;
    import Dialog = CSForms.Dialog;
    import TabPage = CSForms.TabPage;

    export class FFormula extends Form {

        private KEY_SYS_FUNCTIONS: string = "FS";
        private KEY_SYS_VARS: string = "VS";
        private KEY_SYS_LABELS: string = "VL";
        private KEY_SYS_DB_FIELDS: string = "VC";

        private FUN_ID: string = "I";
        private FUN_DESCRIP: string = "D";
        private FUN_NAME: string = "N";
        private HELP_CONTEXT_ID: string = "H";
        private IS_DB_FIELD_OR_LABEL: string = "FL";

        private FOLDER_INDEX: number = 0;
        private DATABSE_INDEX: number = 1;
        private LABEL_INDEX: number = 2;
        private FORMULA_INDEX: number = 3;

        private editor: cEditor = null;

        private el: HTMLElement;
        private dialog: Dialog;
        private tv_formulas: TreeView = null;
        private tx_formula: TextBox =  null;
        private lb_description: Label = null;

        public constructor() {
            super();
            this.el = U.el('formula-dlg');
            this.dialog = new Dialog(this.el, 'formula-dlg-apply', 'formula-dlg-cancel');

            this.tv_formulas = new TreeView("tvFormulas", U.el("formula-dlg-tree"), "*");
            this.tv_formulas.state.onclick = P.call(this, this.tvFormulasNodeClick);
            this.tv_formulas.state.onDblclick = P.call(this, this.tvFormulasDoubleClick);

            this.tx_formula = new TextBox(U.inputEl("formula-dlg-code"));
            this.lb_description = new Label(U.labelEl("formula-dlg-description"));
            this.dialog.onApply = P.call(this, this.cmdApplyClick);
        }

        showModal() {
            return this.dialog.show({title: 'Formulas', height: 500, width: 800, overlay: true});
        }

		public createTree() {
            this.tv_formulas.clear();
            this.tv_formulas.getNodes().add("Internal functions", this.FOLDER_INDEX, this.KEY_SYS_FUNCTIONS);
            const item = this.tv_formulas.getNodes().add("Internal variables", this.FOLDER_INDEX, this.KEY_SYS_VARS);
            item.getNodes().add("Database fields", 0, this.KEY_SYS_DB_FIELDS);
            item.getNodes().add("Labels", 0, this.KEY_SYS_LABELS);

            const report = this.editor.getReport();

            for(let _i = 0; _i < report.getFormulaTypes().count(); _i++) {
                let f = report.getFormulaTypes().item(_i);
                this.addFormula(
                    f.getId(), f.getName(), f.getNameUser(),
                    f.getDecrip(), f.getHelpContextId());
            }

            for(let _i = 0; _i < report.getControls().count(); _i++) {
                let c = report.getControls().item(_i);
                if(c.getControlType() === csRptControlType.CS_RPT_CT_FIELD) {
                    this.addDBField(c.getName(), c.getField().getName());
                }
                else if(c.getControlType() === csRptControlType.CS_RPT_CT_LABEL) {
                    this.addLabel(c.getName());
                }
            }
		}

		public addFormula(formulaType: csRptFormulaType, name: string, nameUser: string, descrip: string, helpContextId: number) {
            const item = this.tv_formulas.getNodes().item(this.KEY_SYS_FUNCTIONS).getNodes().add(nameUser, this.FORMULA_INDEX);
            item.selectedImageIndex = item.imageIndex;

            let info: string = "";
            info = U.setInfoString(info, this.FUN_ID, formulaType.toString());
            info = U.setInfoString(info, this.FUN_DESCRIP, descrip);
            info = U.setInfoString(info, this.FUN_NAME, name);
            info = U.setInfoString(info, this.HELP_CONTEXT_ID, helpContextId.toString());

            item.tag = info;
		}

		public addDBField(name: string, descrip: string) {
            this.addAux(name, descrip, this.KEY_SYS_DB_FIELDS, this.DATABSE_INDEX);
		}

		public addLabel(name: string) {
            this.addAux(name, "", this.KEY_SYS_LABELS, this.LABEL_INDEX);
		}

		public setFormula(formula: string) {
			this.tx_formula.setText(formula);
		}

		public expandTree() {
            this.tv_formulas.getNodes().item(0).expandAll();
            this.tv_formulas.getNodes().item(1).expandAll();
		}

		public getFormula(): string {
			return this.tx_formula.getText();
		}

        private addAux(name: string, descrip: string, key: string, imageIndex: number) {
            let father = this.tv_formulas.getNodes().item(this.KEY_SYS_VARS).getNodes().item(key);
            let item = father.getNodes().add(name, imageIndex);
            item.selectedImageIndex = item.imageIndex;

            if(descrip !== "")  {
                item.setText(descrip + " ( "+ name + " )");
            }

            let info = "";
            info = U.setInfoString(info, this.FUN_DESCRIP, descrip);
            info = U.setInfoString(info, this.FUN_NAME, name);
            info = U.setInfoString(info, this.IS_DB_FIELD_OR_LABEL, "1");

            item.tag = info;
        }

        private tvFormulasNodeClick(node: Node) {
            let info = node.tag;
            this.lb_description.setText(U.getInfoString(info, this.FUN_DESCRIP, ""));
        }

        private isDbOrLabel(info: string) {
            return U.valInt(U.getInfoString(info, this.IS_DB_FIELD_OR_LABEL, "")) === 1;
        }

        private tvFormulasDoubleClick(node: Node) {
            let info = node.tag as string;
            let name = U.getInfoString(info, this.FUN_NAME, "");
            if(! this.isDbOrLabel(info)) {
                 name += "()";
            }
            let i: number = this.tx_formula.getSelectionStart();
            this.tx_formula.setText(
                      this.tx_formula.getText().substring(0, i)
                    + name
                    + this.tx_formula.getText().substring(i));
        }

        private cmdApplyClick() {
            return this.editor.checkSyntax(this.tx_formula.getText());
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }
    }
}
