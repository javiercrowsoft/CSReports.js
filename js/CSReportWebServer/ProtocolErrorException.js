(function(globalObject) {

    globalObject.CSReportWebServer.NativeMessaging = globalObject.CSReportWebServer.NativeMessaging || {}; //@@@: namespace CSReportWebServer.NativeMessaging
 //@@@: {
    [System.Serializable] //@@@: [System.Serializable]
    globalObject.CSReportWebServer.NativeMessaging.createProtocolErrorException = function() {

        const self = {}; //@@@: public class ProtocolErrorException : NativeMessagingException
        const ProtocolErrorException = function() { //@@@: public ProtocolErrorException() : base("Native messaging protocol error.") { }
        const ProtocolErrorException = function(message) { //@@@: public ProtocolErrorException(string message) : base(message) { }
        const ProtocolErrorException = function(message, innerException) { //@@@: public ProtocolErrorException(string message, Exception innerException) : base(message, innerException) { }
        const ProtocolErrorException = function(info, context) { //@@@: protected ProtocolErrorException(SerializationInfo info, StreamingContext context) : base(info, context) { }
}(globalObject)); //@@@: }
