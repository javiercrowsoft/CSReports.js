(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFFormula = function() {

        // @ts-ignore
        let self: CSReportEditor.IfFormula = {};

        const C_KEY_SYSFUNCTIONS: string = "FS";
        const C_KEY_SYSVARS: string = "VS";
        const C_KEY_SYSLABELS: string = "VL";
        const C_KEY_SYSDBFIELDS: string = "VC";

        const C_FUNID: string = "I";
        const C_FUNDESCRIP: string = "D";
        const C_FUNNAME: string = "N";
        const C_HELPCONTEXTID: string = "H";
        const C_ISDBFIELDORLABEL: string = "FL";

        const C_FOLDER_INDEX: number = 0;
        const C_DATABSE_INDEX: number = 1;
        const C_LABEL_INDEX: number = 2;
        const C_FORMULA_INDEX: number = 3;

        let m_ok: boolean = false;

        let m_editor: cEditor = null;

        const fFormula = function() {
            InitializeComponent();
        };

		self.createTree = function() {
            tv_formulas.Nodes.Add(C_KEY_SYSFUNCTIONS, "Internal functions", C_FOLDER_INDEX);
            let item: var = tv_formulas.Nodes.Add(C_KEY_SYSVARS, "Internal variables", C_FOLDER_INDEX);
            item.Nodes.Add(C_KEY_SYSDBFIELDS, "Database fields");
            item.Nodes.Add(C_KEY_SYSLABELS, "Labels");
		};

		self.addFormula = function(formulaType, name, nameUser, descrip, helpContextId) {
            let item: var = tv_formulas.Nodes[C_KEY_SYSFUNCTIONS].Nodes.Add(nameUser);
            item.ImageIndex = C_FORMULA_INDEX;
            item.SelectedImageIndex = item.ImageIndex;

            let info: string = "";
            info = cUtil.setInfoString(info, C_FUNID, formulaType.ToString());
            info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip);
            info = cUtil.setInfoString(info, C_FUNNAME, name);
            info = cUtil.setInfoString(info, C_HELPCONTEXTID, helpContextId.ToString());

            item.Tag = info;
		};

		self.addDBField = function(name, descrip) {
            addAux(name, descrip, C_KEY_SYSDBFIELDS, C_DATABSE_INDEX);
		};

		self.addLabel = function(name) {
            addAux(name, "", C_KEY_SYSLABELS, C_LABEL_INDEX);
		};

		self.setFormula = function(formula) {
			tx_formula.Text = formula;
		};

		self.expandTree = function() {
            tv_formulas.Nodes[0].ExpandAll();
            tv_formulas.Nodes[1].ExpandAll();
		};

		self.getOk = function() {
            return m_ok;
		};

		self.getFormula = function() {
			return tx_formula.Text;
		};

        const addAux = function(name, descrip, key, image) {
            let father: var = tv_formulas.Nodes[C_KEY_SYSVARS].Nodes[key];
            let item: var = father.Nodes.Add(name);
            item.ImageIndex = image;
            item.SelectedImageIndex = item.ImageIndex;

            if (descrip !== "")  {
                item.Text = descrip + " ( "+ name + " )";
            }

            let info: var = "";
            info = cUtil.setInfoString(info, C_FUNDESCRIP, descrip);
            info = cUtil.setInfoString(info, C_FUNNAME, name);
            info = cUtil.setInfoString(info, C_ISDBFIELDORLABEL, "1");

            item.Tag = info;
        };

        const fFormula_Load = function(sender, e) {
            cWindow.centerForm(this);
        };

        const tv_formulas_NodeMouseClick = function(sender, e) {
            let info: var = e.Node.Tag as string;
            tx_descrip.Text = cUtil.getInfoString(info, C_FUNDESCRIP, "");
        };

        const isDbOrLabel = function(info) {
            return cUtil.valAsInt(cUtil.getInfoString(info, C_ISDBFIELDORLABEL, "")) === 1;
        };

        const tv_formulas_NodeMouseDoubleClick = function(sender, e) {
            let info: var = e.Node.Tag as string;
            let name: var = cUtil.getInfoString(info, C_FUNNAME, "");
            if (! isDbOrLabel(info)) {
                name += "()";
            }
            let i: number = tx_formula.SelectionStart;
            tx_formula.Text = tx_formula.Text.Substring(0, i) + name + tx_formula.Text.Substring(i);
        };

        const cmd_apply_Click = function(sender, e) {
            if (m_editor.checkSyntax(tx_formula.Text))  {
                m_ok = true;
                this.Hide();
            }
        };

        self.setHandler = function(editor) {
            m_editor = editor;
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };

        const tv_formulas_KeyUp = function(sender, e) {
            if (tv_formulas.SelectedNode !== null) {
                let info: var = tv_formulas.SelectedNode.Tag as string;
                tx_descrip.Text = cUtil.getInfoString(info, C_FUNDESCRIP, "");
            }
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
);


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
/**);


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 * TODO: I would like to add a code editor so you can se coloring and use intelisence when editing a formula(globalObject));


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 * );


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 * http://www.codeproject.com/Articles/27744/Net-Script-Editor-C-Vb-net-Mini-IDE(globalObject));


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 * );


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 * http://stackoverflow.com/questions/2968057/free-open-source-code-editor-ui-control-for-net(globalObject));


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 * );


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 * );


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
 */(globalObject));


namespace CSReportEditor {

  export interface IfFormula {

    createTree: () => void;
    addFormula: (csRptFormulaType, string, string, string, int) => void;
    addDBField: (string, string) => void;
    addLabel: (string) => void;
    setFormula: (string) => void;
    expandTree: () => void;
    getOk: () => bool;
    getFormula: () => string;
    setHandler: (cEditor) => void;
  }
}
