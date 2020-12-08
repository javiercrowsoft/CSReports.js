(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFTreeViewCtrls = function() {

        const self = {}; //@@@: public partial class fTreeViewCtrls : Form
        let m_editor = null; //@@@: private cEditor m_editor;

        const C_IMG_FOLDER = 0; //@@@: private const int C_IMG_FOLDER = 0;
        const C_IMG_FORMULA = 3; //@@@: private const int C_IMG_FORMULA = 3;
        const C_IMG_CONTROL = 2; //@@@: private const int C_IMG_CONTROL = 2;
        const C_IMG_DATBASE_FIELD = 1; //@@@: private const int C_IMG_DATBASE_FIELD = 1;

        let m_formulaName = ""; //@@@: private String m_formulaName = "";

        const fTreeViewCtrls = function() { //@@@: public fTreeViewCtrls()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.getFormulaName = function() { //@@@: public string getFormulaName()
            return m_formulaName; //@@@: return m_formulaName;
        }; //@@@: }

        self.clear = function() { //@@@: public void clear()
            tv_controls.Nodes.Clear(); //@@@: tv_controls.Nodes.Clear();
        }; //@@@: }

        self.addCtrls = function() { //@@@: public void addCtrls()
            let report = m_editor.getReport(); //@@@: var report = m_editor.getReport();
            cGlobals.addCtrls(report, tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD); //@@@: cGlobals.addCtrls(report, tv_controls, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);
            lbTitle.Text = "Report definition: " + report.getName(); //@@@: lbTitle.Text = "Report definition: " + report.getName();
        }; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

        const fTreeViewCtrls_Load = function(sender, e) { //@@@: private void fTreeViewCtrls_Load(object sender, EventArgs e)
            cWindow.locateFormAtLeft(this); //@@@: cWindow.locateFormAtLeft(this);
        }; //@@@: }

        const tv_formulas_NodeMouseClick = function(sender, e) { //@@@: private void tv_formulas_NodeMouseClick(object sender, TreeNodeMouseClickEventArgs e)
            selectAndShowInfo(e.Node);  //@@@: selectAndShowInfo(e.Node);
        }; //@@@: }

        const selectAndShowInfo = function(node) { //@@@: private void selectAndShowInfo(TreeNode node)
            if (node !== null && node.Tag !== null) { //@@@: if (node != null && node.Tag != null)
                let info = node.Tag.ToString(); //@@@: var info = node.Tag.ToString();
                if (info.Length > 0) { //@@@: if (info.Length > 0)
                    let infoType = info.Substring(0, 1); //@@@: var infoType = info.Substring(0, 1);
                    if (infoType === "@") { //@@@: if (infoType == "@")
                        tx_descrip.Text = info.Substring(4); //@@@: tx_descrip.Text = info.Substring(4);
                    } //@@@: }
                    else if (infoType === "S" || infoType === "L") { //@@@: else if (infoType == "S" || infoType == "L")
                        m_editor.selectSection(info.Substring(1)); //@@@: m_editor.selectSection(info.Substring(1));
                    } //@@@: }
                    else { //@@@: else
                        tx_descrip.Text = getObjectDescription(getControl(info)); //@@@: tx_descrip.Text = getObjectDescription(getControl(info));
                        m_editor.selectCtrl(info); //@@@: m_editor.selectCtrl(info);
                    } //@@@: }
                } //@@@: }
            }         //@@@: }
        }; //@@@: }

        const tv_formulas_NodeMouseDoubleClick = function(sender, e) { //@@@: private void tv_formulas_NodeMouseDoubleClick(object sender, TreeNodeMouseClickEventArgs e)
            if (e.Node.Tag !== null) { //@@@: if (e.Node.Tag != null)
                let info = e.Node.Tag.ToString(); //@@@: var info = e.Node.Tag.ToString();
                if (info.Length > 0) { //@@@: if (info.Length > 0)
                    let infoType = info.Substring(0, 4); //@@@: var infoType = info.Substring(0, 4);
                    if (infoType === "@FH=") { //@@@: if (infoType == "@FH=")
                        m_formulaName = "Hide"; //@@@: m_formulaName = "Hide";
                        let formula = info.Substring(4); //@@@: string formula = info.Substring(4);
                        if (m_editor.showEditFormula(formula)) { //@@@: if (m_editor.showEditFormula(ref formula))
                            e.Node.Tag = "@FH=" + formula; //@@@: e.Node.Tag = "@FH=" + formula;
                        } //@@@: }
                    } //@@@: }
                    else if (infoType === "@FV=") { //@@@: else if (infoType == "@FV=")
                        m_formulaName = "Value"; //@@@: m_formulaName = "Value";
                        let formula = info.Substring(4); //@@@: string formula = info.Substring(4);
                        if (m_editor.showEditFormula(formula)) { //@@@: if (m_editor.showEditFormula(ref formula))
                            e.Node.Tag = "@FV=" + formula; //@@@: e.Node.Tag = "@FV=" + formula;
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const tv_controls_KeyUp = function(sender, e) { //@@@: private void tv_controls_KeyUp(object sender, KeyEventArgs e)
            selectAndShowInfo(tv_controls.SelectedNode); //@@@: selectAndShowInfo(tv_controls.SelectedNode);
        }; //@@@: }

        // Get property array
        const getControl = function(key) { //@@@: private cReportControl getControl(string key)
            return m_editor.getReport().getControls().item(key); //@@@: return m_editor.getReport().getControls().item(key);
        }; //@@@: }

        const getObjectDescription = function(anObject) { //@@@: private string getObjectDescription(object anObject)
            return getObjectDescription(anObject, 0); //@@@: return getObjectDescription(anObject, 0);
        }; //@@@: }

        const getObjectDescription = function(anObject, n) { //@@@: private string getObjectDescription(object anObject, int n)
            let descrip = ""; //@@@: var descrip = "";
            let tabs = new String('\t', n); //@@@: var tabs = new String('\t', n);
            let methods = getMethods(anObject); //@@@: var methods = getMethods(anObject);
            for(var i_ = 0; i_ < methods.length; i_++) { //@@@: foreach (var m in methods)
                if (m.IsPublic  //@@@: if (m.IsPublic
                    && m.Name.Length > 3 //@@@: && m.Name.Length > 3
                    && m.Name.Substring(0,3) === "get" //@@@: && m.Name.Substring(0,3) == "get"
                    && m.Name.Substring(0, 4) !== "get_" //@@@: && m.Name.Substring(0, 4) != "get_"
                    && m.GetParameters().Length === 0 //@@@: && m.GetParameters().Length == 0
                    && m.Name !== "getSectionLine" //@@@: && m.Name != "getSectionLine"
                    ) { //@@@: )
                    descrip += tabs + m.Name.Substring(3) + ": " + getValue(m.Invoke(anObject, null), n) + "\r\n"; //@@@: descrip += tabs + m.Name.Substring(3) + ": " + getValue(m.Invoke(anObject, null), n) + "\r\n";
                } //@@@: }
            } //@@@: }

            return descrip; //@@@: return descrip;
        }; //@@@: }

        const getValue = function(value, n) { //@@@: private string getValue(object value, int n)
            if (n > 10) return ""; { //@@@: if (n > 10) return "";

            if (value === null) { //@@@: if (value == null)
                return "NULL"; //@@@: return "NULL";
            } //@@@: }
            else { //@@@: else
                let t = value.GetType(); //@@@: var t = value.GetType();
                if (t.IsPrimitive || t === typeof(Decimal) || t === typeof(String)) { //@@@: if (t.IsPrimitive || t == typeof(Decimal) || t == typeof(String))
                    return value.ToString(); //@@@: return value.ToString();
                } //@@@: }
                else { //@@@: else
                    return "\r\n" + getObjectDescription(value, n + 1); //@@@: return "\r\n" + getObjectDescription(value, n + 1);
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const getMethods = function(obj) { //@@@: private static MethodInfo[] getMethods(object obj)
            return obj.GetType().GetMethods(); //@@@: return obj.GetType().GetMethods();
        }; //@@@: }

        const cmd_edit_Click = function(sender, e) { //@@@: private void cmd_edit_Click(object sender, EventArgs e)
            if (tv_controls.SelectedNode !== null) { //@@@: if (tv_controls.SelectedNode != null)
                if (tv_controls.SelectedNode.Tag !== null) { //@@@: if (tv_controls.SelectedNode.Tag != null)
                    let info = tv_controls.SelectedNode.Tag.ToString(); //@@@: var info = tv_controls.SelectedNode.Tag.ToString();
                    if (info.Length > 0) { //@@@: if (info.Length > 0)
                        let infoType = info.Substring(0, 1); //@@@: var infoType = info.Substring(0, 1);
                        if (infoType === "@") { //@@@: if (infoType == "@")
                            tx_descrip.Text = info.Substring(4); //@@@: tx_descrip.Text = info.Substring(4);
                        } //@@@: }
                        else { //@@@: else
                            m_editor.showProperties(info); //@@@: m_editor.showProperties(info);
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            }             //@@@: }
        }; //@@@: }

        const cmd_close_Click = function(sender, e) { //@@@: private void cmd_close_Click(object sender, EventArgs e)
            this.Close(); //@@@: this.Close();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
