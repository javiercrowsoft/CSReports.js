///<reference path="./controls/Form.ts"/>

namespace CSReportEditor {

    import csRptFormulaType = CSReportGlobals.csRptFormulaType;
    import RefWrapper = CSKernelClient.RefWrapper;

    export class FFormula extends Form {

        private C_KEY_SYSFUNCTIONS: string = "FS";
        private C_KEY_SYSVARS: string = "VS";
        private C_KEY_SYSLABELS: string = "VL";
        private C_KEY_SYSDBFIELDS: string = "VC";

        private C_FUNID: string = "I";
        private C_FUNDESCRIP: string = "D";
        private C_FUNNAME: string = "N";
        private C_HELPCONTEXTID: string = "H";
        private C_ISDBFIELDORLABEL: string = "FL";

        private C_FOLDER_INDEX: number = 0;
        private C_DATABSE_INDEX: number = 1;
        private C_LABEL_INDEX: number = 2;
        private C_FORMULA_INDEX: number = 3;

        private ok: boolean = false;

        private editor: cEditor = null;

		public createTree() {
            // tv_formulas.Nodes.Add(C_KEY_SYSFUNCTIONS, "Internal functions", C_FOLDER_INDEX);
            // let item = tv_formulas.Nodes.Add(C_KEY_SYSVARS, "Internal variables", C_FOLDER_INDEX);
            // item.Nodes.Add(C_KEY_SYSDBFIELDS, "Database fields");
            // item.Nodes.Add(C_KEY_SYSLABELS, "Labels");
		}

		public addFormula(formulaType: csRptFormulaType, name: string, nameUser: string, descrip: string, helpContextId: number) {
            // let item = tv_formulas.Nodes[C_KEY_SYSFUNCTIONS].Nodes.Add(nameUser);
            // item.ImageIndex = C_FORMULA_INDEX;
            // item.SelectedImageIndex = item.ImageIndex;
            //
            // let info: string = "";
            // info = cUtil.setInfoString(info, C_FUNID, formulaType.toString());
            // info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip);
            // info = cUtil.setInfoString(info, C_FUNNAME, name);
            // info = cUtil.setInfoString(info, C_HELPCONTEXTID, helpContextId.toString());
            //
            // item.Tag = info;
		}

		public addDBField(name: string, descrip: string) {
            // addAux(name, descrip, C_KEY_SYSDBFIELDS, C_DATABSE_INDEX);
		}

		public addLabel(name: string) {
            // addAux(name, "", C_KEY_SYSLABELS, C_LABEL_INDEX);
		}

		public setFormula(formula: RefWrapper<string>) {
			// tx_formula.setText(formula);
		}

		public expandTree() {
            // tv_formulas.Nodes[0].ExpandAll();
            // tv_formulas.Nodes[1].ExpandAll();
		}

		public getOk() {
            return this.ok;
		}

		public getFormula(): string {
			// return tx_formula.Text;
		}

        private addAux(name: string, descrip: string, key: string, image: number) {
            // let father = tv_formulas.Nodes[C_KEY_SYSVARS].Nodes[key];
            // let item = father.Nodes.Add(name);
            // item.ImageIndex = image;
            // item.SelectedImageIndex = item.ImageIndex;
            //
            // if (descrip !== "")  {
            //     item.setText(descrip + " ( "+ name + " )");
            // }
            //
            // let info = "";
            // info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip);
            // info = cUtil.setInfoString(info, C_FUNNAME, name);
            // info = cUtil.setInfoString(info, C_ISDBFIELDORLABEL, "1");
            //
            // item.Tag = info;
        }

        private fFormula_Load(sender: object, e: object) {
            // cWindow.centerForm(this);
        }

        private tv_formulas_NodeMouseClick(sender: object, e: object) {
            // let info = e.Node.Tag as string;
            // tx_descrip.setText(cUtil.getInfoString(info, C_FUNDESCRIP, ""));
        }

        private isDbOrLabel(info: string) {
            // return Utils.valInt(cUtil.getInfoString(info, C_ISDBFIELDORLABEL, "")) === 1;
        }

        private tv_formulas_NodeMouseDoubleClick(sender: object, e: object) {
            // let info = e.Node.Tag as string;
            // let name = cUtil.getInfoString(info, C_FUNNAME, "");
            // if (! isDbOrLabel(info)) {
            //     name += "()";
            // }
            // let i: number = tx_formula.SelectionStart;
            // tx_formula.setText(tx_formula.Text.substring(0, i) + name + tx_formula.Text.substring(i));
        }

        private cmd_apply_Click(sender: object, e: object) {
            // if (this.editor.checkSyntax(tx_formula.Text))  {
            //     this.ok = true;
            //     this.Hide();
            // }
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private cmd_cancel_Click(sender: object, e: object) {
            // this.ok = false;
            // this.Hide();
        }

        private tv_formulas_KeyUp(sender: object, e: object) {
            // if (tv_formulas.SelectedNode !== null) {
            //     let info = tv_formulas.SelectedNode.Tag as string;
            //     tx_descrip.setText(cUtil.getInfoString(info, C_FUNDESCRIP, ""));
            // }
        }
    }
}
