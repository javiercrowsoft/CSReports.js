(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFProgress = function() {

        // @ts-ignore
        let self: CSReportEditor.IfProgress = {};
        const fProgress = function() {
            InitializeComponent();
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IfProgress {

  }
}
