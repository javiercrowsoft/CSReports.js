(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFFormula = function() {

        // @ts-ignore
        let self: CSReportEditor.IfFormula = {};
        const fFormula = function() {
            InitializeComponent();
        };

		self.createTree = function() {
			throw new NotImplementedException ();
		};

		self.addFormula = function(csRptFormulaType, str, str2, str3, i) {
			throw new NotImplementedException ();
		};

		self.addDBField = function(str, str2) {
			throw new NotImplementedException ();
		};

		self.addLabel = function(str) {
			throw new NotImplementedException ();
		};

		self.setFormula = function(formula) {
			throw new NotImplementedException ();
		};

		self.expandTree = function() {
			throw new NotImplementedException ();
		};

		self.center = function() {
			throw new NotImplementedException ();
		};

		self.getOk = function() {
			throw new NotImplementedException ();
		};

		self.getFormula = function() {
			throw new NotImplementedException ();
		};

        self.addLabel = function() {
            throw new NotImplementedException();
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
    center: () => void;
    getOk: () => bool;
    getFormula: () => string;
    addLabel: () => void;
  }
}
