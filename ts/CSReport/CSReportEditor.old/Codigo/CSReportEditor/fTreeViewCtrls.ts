(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFTreeViewCtrls = function() {

        // @ts-ignore
        let self: CSReportEditor.IfTreeViewCtrls = {};
        const fTreeViewCtrls = function() {
            InitializeComponent();
        };

		self.clear = function() {
			throw new NotImplementedException ();
		};

		self.addCtrls = function(m_report) {
			throw new NotImplementedException ();
		};
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfTreeViewCtrls {

    clear: () => void;
    addCtrls: (cReport) => void;
  }
}
