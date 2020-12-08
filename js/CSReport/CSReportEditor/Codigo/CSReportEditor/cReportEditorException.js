(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
UNKNOWN >>     class ReportEditorException : System.Exception //@@@: class ReportEditorException : System.Exception
    { //@@@: {
        self.errorCode { get = null; set; }; //@@@: public csRptEditorErrors errorCode { get; set; }
        globalObject.CSReportEditor.createClassName = function() {

            const self = {}; //@@@: public String className { get; set; }

        self. = function() { //@@@: public ReportEditorException() : base() { }

        self. = function(code, module, message) { //@@@: public ReportEditorException(csRptEditorErrors code, String module, String message)
            : base(message) //@@@: : base(message)
        { //@@@: {
            errorCode = code; //@@@: errorCode = code;
            className = module; //@@@: className = module;
        }; //@@@: }

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        self. = function(info, context) { //@@@: protected ReportEditorException(SerializationInfo info, StreamingContext context) { }

        self. = function() { //@@@: public override string ToString()
            return base.ToString() + "\n\nCode:" + errorCode.ToString(); //@@@: return base.ToString() + "\n\nCode:" + errorCode.ToString();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
