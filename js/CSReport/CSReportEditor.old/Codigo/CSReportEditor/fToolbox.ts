(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFToolbox = function() {

        const self = {};
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

    }
}(globalObject));
