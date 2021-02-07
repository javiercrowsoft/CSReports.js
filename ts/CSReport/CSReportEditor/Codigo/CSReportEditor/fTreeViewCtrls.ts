

namespace CSReportEditor
{
    export class fTreeViewCtrls {


    {
        private editor: cEditor = null;

        private C_IMG_FOLDER: number = 0;
        private C_IMG_FORMULA: number = 3;
        private C_IMG_CONTROL: number = 2;
        private C_IMG_DATBASE_FIELD: number = 1;

        private formulaName: string = "";

        public constructor() {
            InitializeComponent();
        }

        public getFormulaName() {
            return this.formulaName;
        }

        public clear() {
            tv_controls.Nodes.Clear();
        }

        public addCtrls() {
            let report: var = this.editor.getReport();
            cGlobals.addCtrls(report, tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);
            lbTitle.Text = "Report definition: " + report.getName();
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private fTreeViewCtrls_Load(sender: object, e: EventArgs) {
            cWindow.locateFormAtLeft(this);
        }

        private tv_formulas_NodeMouseClick(sender: object, e: TreeNodeMouseClickEventArgs) {
            selectAndShowInfo(e.Node); 
        }

        private selectAndShowInfo(node: TreeNode) {
            if (node !== null && node.Tag !== null) {
                let info: var = node.Tag.toString();
                if (info.length > 0) {
                    let infoType: var = info.substring(0, 1);
                    if (infoType === "@") {
                        tx_descrip.Text = info.substring(4);
                    }
                    else if (infoType === "S" || infoType === "L") {
                        this.editor.selectSection(info.substring(1));
                    }
                    else {
                        tx_descrip.Text = getObjectDescription(getControl(info));
                        this.editor.selectCtrl(info);
                    }
                }
            }        
        }

        private tv_formulas_NodeMouseDoubleClick(sender: object, e: TreeNodeMouseClickEventArgs) {
            if (e.Node.Tag !== null) {
                let info: var = e.Node.Tag.toString();
                if (info.length > 0) {
                    let infoType: var = info.substring(0, 4);
                    if (infoType === "@FH=") {
                        this.formulaName = "Hide";
                        let formula: string = info.substring(4);
                        if (this.editor.showEditFormula(formula)) {
                            e.Node.Tag = "@FH=" + formula;
                        }
                    }
                    else if (infoType === "@FV=") {
                        this.formulaName = "Value";
                        let formula: string = info.substring(4);
                        if (this.editor.showEditFormula(formula)) {
                            e.Node.Tag = "@FV=" + formula;
                        }
                    }
                }
            }
        }

        private tv_controls_KeyUp(sender: object, e: KeyEventArgs) {
            selectAndShowInfo(tv_controls.SelectedNode);
        }

        // Get property array
        private getControl(key: string) {
            return this.editor.getReport().getControls().item(key);
        }

        private getObjectDescription(anObject: object) {
            return getObjectDescription(anObject, 0);
        }

        private getObjectDescription(anObject: object, n: number) {
            let descrip: var = "";
            let tabs: var = new String('\t', n);
            let methods: var = getMethods(anObject);
            for(var i_ = 0; i_ < methods.length; i_++) {
                if (m.IsPublic 
                    && m.Name.length > 3
                    && m.Name.substring(0,3) === "get"
                    && m.Name.substring(0, 4) !== "get_"
                    && m.GetParameters().length === 0
                    && m.Name !== "getSectionLine"
                    ) {
                    descrip += tabs + m.Name.substring(3) + ": " + getValue(m.Invoke(anObject, null), n) + "\r\n";
                }
            }

            return descrip;
        }

        private getValue(value: object, n: number) {
            if (n > 10) return ""; {

            if (value === null) {
                return "NULL";
            }
            else {
                let t: var = value.GetType();
                if (t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) {
                    return value.toString();
                }
                else {
                    return "\r\n" + getObjectDescription(value, n + 1);
                }
            }
        }

        private getMethods(obj: object) {
            return obj.GetType().GetMethods();
        }

        private cmd_edit_Click(sender: object, e: EventArgs) {
            if (tv_controls.SelectedNode !== null) {
                if (tv_controls.SelectedNode.Tag !== null) {
                    let info: var = tv_controls.SelectedNode.Tag.toString();
                    if (info.length > 0) {
                        let infoType: var = info.substring(0, 1);
                        if (infoType === "@") {
                            tx_descrip.Text = info.substring(4);
                        }
                        else {
                            this.editor.showProperties(info);
                        }
                    }
                }
            }            
        }

        private cmd_close_Click(sender: object, e: EventArgs) {
            this.Close();
        }


    } 
}
