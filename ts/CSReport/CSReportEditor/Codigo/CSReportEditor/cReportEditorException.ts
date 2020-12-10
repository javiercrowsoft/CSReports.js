(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createReportEditorException = function() {

        // @ts-ignore
        let self: CSReportEditor.IReportEditorException = {};
        self.errorCode: csRptEditorErrors = null;{ get; set; };
        self.createClassName = function() {

            // @ts-ignore
            let self: CSReportEditor.IclassName = {};

        const ReportEditorException = function() {

        const ReportEditorException = function(code, module, message) {
            : base(message)
        {
            errorCode = code;
            self.createModule; = function() {

                // @ts-ignore
                let self: CSReportEditor.Imodule; = {};

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        const ReportEditorException = function(info, context) {

        self.ToString = function() {
            return base.ToString() + "\n\nCode:" + errorCode.ToString();
        };
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface Imodule; {

    ToString: () => string;
  }
}
