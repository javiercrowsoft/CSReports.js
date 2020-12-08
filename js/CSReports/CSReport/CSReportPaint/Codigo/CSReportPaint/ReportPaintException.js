(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {
UNKNOWN >>     class ReportPaintException : System.Exception //@@@: class ReportPaintException : System.Exception
    { //@@@: {
        self.errorCode { get = null; set; }; //@@@: public csRptPaintErrors errorCode { get; set; }
        globalObject.CSReportPaint.createClassName = function() {

            const self = {}; //@@@: public String className { get; set; }

        self. = function() { //@@@: public ReportPaintException() : base() { }

        self. = function(code, module, message) { //@@@: public ReportPaintException(csRptPaintErrors code, String module, String message) : base(message)
            errorCode = code; //@@@: errorCode = code;
            className = module; //@@@: className = module;
        }; //@@@: }

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        self. = function(info, context) { //@@@: protected ReportPaintException(SerializationInfo info, StreamingContext context) { }

        self. = function() { //@@@: public override string ToString()
            return base.ToString() + "\n\nCode:" + errorCode.ToString(); //@@@: return base.ToString() + "\n\nCode:" + errorCode.ToString();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }

