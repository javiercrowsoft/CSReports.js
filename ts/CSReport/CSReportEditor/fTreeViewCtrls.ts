namespace CSReportEditor {

    export class FTreeViewCtrls {

        private editor: cEditor = null;

        private C_IMG_FOLDER: number = 0;
        private C_IMG_FORMULA: number = 3;
        private C_IMG_CONTROL: number = 2;
        private C_IMG_DATBASE_FIELD: number = 1;

        private formulaName: string = "";

        public getFormulaName() {
            return this.formulaName;
        }

        public clear() {
            // tv_controls.Nodes.clear();
        }

        public addCtrls() {
            // let report = this.editor.getReport();
            // cGlobals.addCtrls(report, tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);
            // lbTitle.setText("Report definition: " + report.getName());
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private fTreeViewCtrls_Load(sender: object, e: object) {
            // cWindow.locateFormAtLeft(this);
        }

        private tv_formulas_NodeMouseClick(sender: object, e: object) {
            // selectAndShowInfo(e.Node);
        }

        private selectAndShowInfo(node: object) {
            // if (node !== null && node.Tag !== null) {
            //     let info = node.Tag.toString();
            //     if (info.length > 0) {
            //         let infoType = info.substring(0, 1);
            //         if (infoType === "@") {
            //             tx_descrip.setText(info.substring(4));
            //         }
            //         else if (infoType === "S" || infoType === "L") {
            //             this.editor.selectSection(info.substring(1));
            //         }
            //         else {
            //             tx_descrip.setText(getObjectDescription(getControl(info)));
            //             this.editor.selectCtrl(info);
            //         }
            //     }
            // }
        }

        private tv_formulas_NodeMouseDoubleClick(sender: object, e: object) {
            // if (e.Node.Tag !== null) {
            //     let info = e.Node.Tag.toString();
            //     if (info.length > 0) {
            //         let infoType = info.substring(0, 4);
            //         if (infoType === "@FH=") {
            //             this.formulaName = "Hide";
            //             let formula: string = info.substring(4);
            //             if (this.editor.showEditFormula(formula)) {
            //                 e.Node.Tag = "@FH=" + formula;
            //             }
            //         }
            //         else if (infoType === "@FV=") {
            //             this.formulaName = "Value";
            //             let formula: string = info.substring(4);
            //             if (this.editor.showEditFormula(formula)) {
            //                 e.Node.Tag = "@FV=" + formula;
            //             }
            //         }
            //     }
            // }
        }

        private tv_controls_KeyUp(sender: object, e: object) {
            // selectAndShowInfo(tv_controls.SelectedNode);
        }

        // Get property array
        private getControl(key: string) {
            return this.editor.getReport().getControls().item(key);
        }

        private getObjectDescription(anObject: object) {
            // return getObjectDescription(anObject, 0);
        }

        private getObjectDescriptionAt(anObject: object, n: number) {
            // let descrip = "";
            // let tabs = new String('\t', n);
            // let methods = getMethods(anObject);
            // for(let i_ = 0; i_ < methods.length; i_++) {
            //     if (m.IsPublic
            //         && m.Name.length > 3
            //         && m.Name.substring(0,3) === "get"
            //         && m.Name.substring(0, 4) !== "get_"
            //         && m.GetParameters().length === 0
            //         && m.Name !== "getSectionLine"
            //         ) {
            //         descrip += tabs + m.Name.substring(3) + ": " + getValue(m.Invoke(anObject, null), n) + "\r\n";
            //     }
            // }
            //
            // return descrip;
        }

        private getValue(value: object, n: number) {
            // if (n > 10) return "";
            //
            // if (value === null) {
            //     return "NULL";
            // }
            // else {
            //     let t = value.GetType();
            //     if (t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) {
            //         return value.toString();
            //     }
            //     else {
            //         return "\r\n" + getObjectDescription(value, n + 1);
            //     }
            // }
        }

        private getMethods(obj: object) {
            // return obj.GetType().GetMethods();
        }

        private cmd_edit_Click(sender: object, e: object) {
            // if (tv_controls.SelectedNode !== null) {
            //     if (tv_controls.SelectedNode.Tag !== null) {
            //         let info = tv_controls.SelectedNode.Tag.toString();
            //         if (info.length > 0) {
            //             let infoType = info.substring(0, 1);
            //             if (infoType === "@") {
            //                 tx_descrip.setText(info.substring(4));
            //             }
            //             else {
            //                 this.editor.showProperties(info);
            //             }
            //         }
            //     }
            // }
        }

        private cmd_close_Click(sender: object, e: object) {
            // this.Close();
        }

    } 
}
