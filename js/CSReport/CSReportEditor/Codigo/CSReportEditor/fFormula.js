(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFFormula = function() {

        const self = {}; //@@@: public partial class fFormula : Form

        const C_KEY_SYSFUNCTIONS = "FS"; //@@@: private const String C_KEY_SYSFUNCTIONS = "FS";
        const C_KEY_SYSVARS = "VS"; //@@@: private const String C_KEY_SYSVARS = "VS";
        const C_KEY_SYSLABELS = "VL"; //@@@: private const String C_KEY_SYSLABELS = "VL";
        const C_KEY_SYSDBFIELDS = "VC"; //@@@: private const String C_KEY_SYSDBFIELDS = "VC";

        const C_FUNID = "I"; //@@@: private const String C_FUNID = "I";
        const C_FUNDESCRIP = "D"; //@@@: private const String C_FUNDESCRIP = "D";
        const C_FUNNAME = "N"; //@@@: private const String C_FUNNAME = "N";
        const C_HELPCONTEXTID = "H"; //@@@: private const String C_HELPCONTEXTID = "H";
        const C_ISDBFIELDORLABEL = "FL"; //@@@: private const String C_ISDBFIELDORLABEL = "FL";

        const C_FOLDER_INDEX = 0; //@@@: private const int C_FOLDER_INDEX = 0;
        const C_DATABSE_INDEX = 1; //@@@: private const int C_DATABSE_INDEX = 1;
        const C_LABEL_INDEX = 2; //@@@: private const int C_LABEL_INDEX = 2;
        const C_FORMULA_INDEX = 3; //@@@: private const int C_FORMULA_INDEX = 3;

        let m_ok = false; //@@@: private bool m_ok = false;

        let m_editor = null; //@@@: private cEditor m_editor;

        const fFormula = function() { //@@@: public fFormula()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

		self.createTree = function() { //@@@: public void createTree()
            tv_formulas.Nodes.Add(C_KEY_SYSFUNCTIONS, "Internal functions", C_FOLDER_INDEX); //@@@: tv_formulas.Nodes.Add(C_KEY_SYSFUNCTIONS, "Internal functions", C_FOLDER_INDEX);
            let item = tv_formulas.Nodes.Add(C_KEY_SYSVARS, "Internal variables", C_FOLDER_INDEX); //@@@: var item = tv_formulas.Nodes.Add(C_KEY_SYSVARS, "Internal variables", C_FOLDER_INDEX);
            item.Nodes.Add(C_KEY_SYSDBFIELDS, "Database fields"); //@@@: item.Nodes.Add(C_KEY_SYSDBFIELDS, "Database fields");
            item.Nodes.Add(C_KEY_SYSLABELS, "Labels"); //@@@: item.Nodes.Add(C_KEY_SYSLABELS, "Labels");
		}; //@@@: }

		self.addFormula = function(formulaType, name, nameUser, descrip, helpContextId) { //@@@: public void addFormula(csRptFormulaType formulaType, string name, string nameUser, string descrip, int helpContextId)
            let item = tv_formulas.Nodes[C_KEY_SYSFUNCTIONS].Nodes.Add(nameUser); //@@@: var item = tv_formulas.Nodes[C_KEY_SYSFUNCTIONS].Nodes.Add(nameUser);
            item.ImageIndex = C_FORMULA_INDEX; //@@@: item.ImageIndex = C_FORMULA_INDEX;
            item.SelectedImageIndex = item.ImageIndex; //@@@: item.SelectedImageIndex = item.ImageIndex;

            let info = ""; //@@@: string info = "";
            info = cUtil.setInfoString(info, C_FUNID, formulaType.ToString()); //@@@: info = cUtil.setInfoString(info, C_FUNID, formulaType.ToString());
            info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip); //@@@: info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip);
            info = cUtil.setInfoString(info, C_FUNNAME, name); //@@@: info = cUtil.setInfoString(info, C_FUNNAME, name);
            info = cUtil.setInfoString(info, C_HELPCONTEXTID, helpContextId.ToString()); //@@@: info = cUtil.setInfoString(info, C_HELPCONTEXTID, helpContextId.ToString());

            item.Tag = info; //@@@: item.Tag = info;
		}; //@@@: }

		self.addDBField = function(name, descrip) { //@@@: public void addDBField(string name, string descrip)
            addAux(name, descrip, C_KEY_SYSDBFIELDS, C_DATABSE_INDEX); //@@@: addAux(name, descrip, C_KEY_SYSDBFIELDS, C_DATABSE_INDEX);
		}; //@@@: }

		self.addLabel = function(name) { //@@@: public void addLabel(string name)
            addAux(name, "", C_KEY_SYSLABELS, C_LABEL_INDEX); //@@@: addAux(name, "", C_KEY_SYSLABELS, C_LABEL_INDEX);
		}; //@@@: }

		self.setFormula = function(formula) { //@@@: public void setFormula(string formula)
			tx_formula.Text = formula; //@@@: tx_formula.Text = formula;
		}; //@@@: }

		self. = function() { //@@@: public void expandTree ()
            tv_formulas.Nodes[0].ExpandAll(); //@@@: tv_formulas.Nodes[0].ExpandAll();
            tv_formulas.Nodes[1].ExpandAll(); //@@@: tv_formulas.Nodes[1].ExpandAll();
		}; //@@@: }

		self.getOk = function() { //@@@: public bool getOk()
            return m_ok; //@@@: return m_ok;
		}; //@@@: }

		self.getFormula = function() { //@@@: public string getFormula()
			return tx_formula.Text; //@@@: return tx_formula.Text;
		}; //@@@: }

        const addAux = function(name, descrip, key, image) { //@@@: private void addAux(String name, String descrip, String key, int image) {
            let father = tv_formulas.Nodes[C_KEY_SYSVARS].Nodes[key]; //@@@: var father = tv_formulas.Nodes[C_KEY_SYSVARS].Nodes[key];
            let item = father.Nodes.Add(name); //@@@: var item = father.Nodes.Add(name);
            item.ImageIndex = image; //@@@: item.ImageIndex = image;
            item.SelectedImageIndex = item.ImageIndex; //@@@: item.SelectedImageIndex = item.ImageIndex;

            if (descrip !== "")  { //@@@: if (descrip != "")
                item.Text = descrip + " ( "+ name + " )"; //@@@: item.Text = descrip + " ( "+ name + " )";
            } //@@@: }

            let info = ""; //@@@: var info = "";
            info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip); //@@@: info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip);
            info = cUtil.setInfoString(info, C_FUNNAME, name); //@@@: info = cUtil.setInfoString(info, C_FUNNAME, name);
            info = cUtil.setInfoString(info, C_ISDBFIELDORLABEL, "1"); //@@@: info = cUtil.setInfoString(info, C_ISDBFIELDORLABEL, "1");

            item.Tag = info; //@@@: item.Tag = info;
        }; //@@@: }

        const fFormula_Load = function(sender, e) { //@@@: private void fFormula_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }

        const tv_formulas_NodeMouseClick = function(sender, e) { //@@@: private void tv_formulas_NodeMouseClick(object sender, TreeNodeMouseClickEventArgs e)
            let info = e.Node.Tag as string; //@@@: var info = e.Node.Tag as string;
            tx_descrip.Text = cUtil.getInfoString(info, C_FUNDESCRIP, ""); //@@@: tx_descrip.Text = cUtil.getInfoString(info, C_FUNDESCRIP, "");
        }; //@@@: }

        const isDbOrLabel = function(info) { //@@@: private bool isDbOrLabel(string info)
            return cUtil.valAsInt(cUtil.getInfoString(info, C_ISDBFIELDORLABEL, "")) === 1; //@@@: return cUtil.valAsInt(cUtil.getInfoString(info, C_ISDBFIELDORLABEL, "")) == 1;
        }; //@@@: }

        const tv_formulas_NodeMouseDoubleClick = function(sender, e) { //@@@: private void tv_formulas_NodeMouseDoubleClick(object sender, TreeNodeMouseClickEventArgs e)
            let info = e.Node.Tag as string; //@@@: var info = e.Node.Tag as string;
            let name = cUtil.getInfoString(info, C_FUNNAME, ""); //@@@: var name = cUtil.getInfoString(info, C_FUNNAME, "");
            if (! isDbOrLabel(info)) { //@@@: if (! isDbOrLabel(info))
                name += "()"; //@@@: name += "()";
            } //@@@: }
            let i = tx_formula.SelectionStart; //@@@: int i = tx_formula.SelectionStart;
            tx_formula.Text = tx_formula.Text.Substring(0, i) + name + tx_formula.Text.Substring(i); //@@@: tx_formula.Text = tx_formula.Text.Substring(0, i) + name + tx_formula.Text.Substring(i);
        }; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            if (m_editor.checkSyntax(tx_formula.Text))  { //@@@: if (m_editor.checkSyntax(tx_formula.Text))
                m_ok = true; //@@@: m_ok = true;
                this.Hide(); //@@@: this.Hide();
            } //@@@: }
        }; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const tv_formulas_KeyUp = function(sender, e) { //@@@: private void tv_formulas_KeyUp(object sender, KeyEventArgs e)
            if (tv_formulas.SelectedNode !== null) { //@@@: if (tv_formulas.SelectedNode != null)
                let info = tv_formulas.SelectedNode.Tag as string; //@@@: var info = tv_formulas.SelectedNode.Tag as string;
                tx_descrip.Text = cUtil.getInfoString(info, C_FUNDESCRIP, ""); //@@@: tx_descrip.Text = cUtil.getInfoString(info, C_FUNDESCRIP, "");
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }

/**); //@@@: /**
* TODO: I would like to add a code editor so you can se coloring and use intelisence when editing a formula(globalObject));
*);
* http://www.codeproject.com/Articles/27744/Net-Script-Editor-C-Vb-net-Mini-IDE(globalObject));
*);
* http://stackoverflow.com/questions/2968057/free-open-source-code-editor-ui-control-for-net(globalObject));
*);
*);
*/(globalObject));
