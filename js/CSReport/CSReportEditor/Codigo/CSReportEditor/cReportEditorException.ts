(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

UNKNOWN >>     class ReportEditorException : System.Exception
    {
        self.errorCode { get = null; set; };
        globalObject.CSReportEditor.createClassName = function() {

            const self = {};

        self. = function() {

        self. = function(code, module, message) {
            : base(message)
        {
            errorCode = code;
            className = module;
        };

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        self. = function(info, context) {

        self. = function() {
            return base.ToString() + "\n\nCode:" + errorCode.ToString();
        };
        return self;

    }
}(globalObject));
