(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

UNKNOWN >>     class ReportPaintException : System.Exception
    {
        self.errorCode: csRptPaintErrors = null;{ get; set; };
        globalObject.CSReportPaint.createClassName = function() {

            const self = {};

        self. = function() {

        self. = function(code, module, message) {
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

