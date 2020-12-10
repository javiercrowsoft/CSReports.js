(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFConnectsAux = function() {

        // @ts-ignore
        let self: CSReportEditor.IfConnectsAux = {};
        const fConnectsAux = function() {
            InitializeComponent();
        };

		self.addConnect = function(str, str2) {
			throw new NotImplementedException ();
		};
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfConnectsAux {

    addConnect: (string, string) => void;
  }
}
