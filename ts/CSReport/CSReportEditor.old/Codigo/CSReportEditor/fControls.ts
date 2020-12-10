(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFControls = function() {

        // @ts-ignore
        let self: CSReportEditor.IfControls = {};
        const fControls = function() {
            InitializeComponent();
        };

		self.clear = function() {
			throw new NotImplementedException ();
		};

		self.addCtrls = function(m_report) {
			throw new NotImplementedException ();
		};

        self.getLoaded = function() {
            throw new NotImplementedException();
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfControls {

    clear: () => void;
    addCtrls: (cReport) => void;
    getLoaded: () => bool;
  }
}
