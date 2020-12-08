(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFTreeViewCtrls = function() {

        const self = {};
        let m_editor: cEditor = null;

        const C_IMG_FOLDER: number= 0;
        const C_IMG_FORMULA: number= 3;
        const C_IMG_CONTROL: number= 2;
        const C_IMG_DATBASE_FIELD: number= 1;

        let m_formulaName: string= "";

        const fTreeViewCtrls = function() {
            InitializeComponent();
        };

        self.getFormulaName = function() {
            return m_formulaName;
        };

        self.clear = function() {
            tv_controls.Nodes.Clear();
        };

        self.addCtrls = function() {
            let report: var= m_editor.getReport();
            cGlobals.addCtrls(report, tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);
            lbTitle.Text = "Report definition: " + report.getName();
        };

        self.setHandler = function(editor) {
            m_editor = editor;
        };

        const fTreeViewCtrls_Load = function(sender, e) {
            cWindow.locateFormAtLeft(this);
        };

        const tv_formulas_NodeMouseClick = function(sender, e) {
            selectAndShowInfo(e.Node); 
        };

        const selectAndShowInfo = function(node) {
            if (node !== null && node.Tag !== null) {
                let info: var= node.Tag.ToString();
                if (info.Length > 0) {
                    let infoType: var= info.Substring(0, 1);
                    if (infoType === "@") {
                        tx_descrip.Text = info.Substring(4);
                    }
                    else if (infoType === "S" || infoType === "L") {
                        m_editor.selectSection(info.Substring(1));
                    }
                    else {
                        tx_descrip.Text = getObjectDescription(getControl(info));
                        m_editor.selectCtrl(info);
                    }
                }
            }        
        };

        const tv_formulas_NodeMouseDoubleClick = function(sender, e) {
            if (e.Node.Tag !== null) {
                let info: var= e.Node.Tag.ToString();
                if (info.Length > 0) {
                    let infoType: var= info.Substring(0, 4);
                    if (infoType === "@FH=") {
                        m_formulaName = "Hide";
                        let formula: string= info.Substring(4);
                        if (m_editor.showEditFormula(formula)) {
                            e.Node.Tag = "@FH=" + formula;
                        }
                    }
                    else if (infoType === "@FV=") {
                        m_formulaName = "Value";
                        let formula: string= info.Substring(4);
                        if (m_editor.showEditFormula(formula)) {
                            e.Node.Tag = "@FV=" + formula;
                        }
                    }
                }
            }
        };

        const tv_controls_KeyUp = function(sender, e) {
            selectAndShowInfo(tv_controls.SelectedNode);
        };

        // Get property array
        const getControl = function(key) {
            return m_editor.getReport().getControls().item(key);
        };

        const getObjectDescription = function(anObject) {
            return getObjectDescription(anObject, 0);
        };

        const getObjectDescription = function(anObject, n) {
            let descrip: var= "";
            let tabs: var= new String('\t', n);
            let methods: var= getMethods(anObject);
            for(var i_ = 0; i_ < methods.length; i_++) {
                if (m.IsPublic 
                    && m.Name.Length > 3
                    && m.Name.Substring(0,3) === "get"
                    && m.Name.Substring(0, 4) !== "get_"
                    && m.GetParameters().Length === 0
                    && m.Name !== "getSectionLine"
                    ) {
                    descrip += tabs + m.Name.Substring(3) + ": " + getValue(m.Invoke(anObject, null), n) + "\r\n";
                }
            }

            return descrip;
        };

        const getValue = function(value, n) {
            if (n > 10) return ""; {

            if (value === null) {
                return "NULL";
            }
            else {
                let t: var= value.GetType();
                if (t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) {
                    return value.ToString();
                }
                else {
                    return "\r\n" + getObjectDescription(value, n + 1);
                }
            }
        };

        const getMethods = function(obj) {
            return obj.GetType().GetMethods();
        };

        const cmd_edit_Click = function(sender, e) {
            if (tv_controls.SelectedNode !== null) {
                if (tv_controls.SelectedNode.Tag !== null) {
                    let info: var= tv_controls.SelectedNode.Tag.ToString();
                    if (info.Length > 0) {
                        let infoType: var= info.Substring(0, 1);
                        if (infoType === "@") {
                            tx_descrip.Text = info.Substring(4);
                        }
                        else {
                            m_editor.showProperties(info);
                        }
                    }
                }
            }            
        };

        const cmd_close_Click = function(sender, e) {
            this.Close();
        };
        return self;

    }
}(globalObject));
