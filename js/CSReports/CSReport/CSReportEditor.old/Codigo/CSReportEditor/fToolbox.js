(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFToolbox = function() {

        const self = {}; //@@@: public partial class fToolbox : Form
        const fToolbox = function() { //@@@: public fToolbox()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.addLbFormula = function(controlName) { //@@@: internal void addLbFormula(string controlName)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.addFormula = function(name, controlName, formulaName) { //@@@: internal void addFormula(string name, string controlName, string formulaName)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.addField = function(name, fieldType, position) { //@@@: internal void addField(string name, int fieldType, int position)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.addLabels = function(name) { //@@@: internal void addLabels(string name)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getLoaded = function() { //@@@: internal static bool getLoaded()
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
