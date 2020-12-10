(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFToolbox = function() {

        // @ts-ignore
        let self: CSReportEditor.IfToolbox = {};
        const fToolbox = function() {
            InitializeComponent();
        };

        self.addLbFormula = function(controlName) {
            throw new NotImplementedException();
        };

        self.addFormula = function(name, controlName, formulaName) {
            throw new NotImplementedException();
        };

        self.addField = function(name, fieldType, position) {
            throw new NotImplementedException();
        };

        self.addLabels = function(name) {
            throw new NotImplementedException();
        };

        self.getLoaded = function() {
            throw new NotImplementedException();
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfToolbox {

    addLbFormula: (string) => void;
    addFormula: (string, string, string) => void;
    addField: (string, int, int) => void;
    addLabels: (string) => void;
    getLoaded: () => bool;
  }
}
