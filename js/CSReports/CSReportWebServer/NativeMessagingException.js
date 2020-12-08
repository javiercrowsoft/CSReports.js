(function(globalObject) {

    globalObject.CSReportWebServer.NativeMessaging = globalObject.CSReportWebServer.NativeMessaging || {}; //@@@: namespace CSReportWebServer.NativeMessaging
 //@@@: {
    [System.Serializable] //@@@: [System.Serializable]
    globalObject.CSReportWebServer.NativeMessaging.createNativeMessagingException = function() {

        const self = {}; //@@@: public class NativeMessagingException : System.Exception
        const NativeMessagingException = function() { //@@@: public NativeMessagingException() : base("Native messaging exception.") { }
        const NativeMessagingException = function(message) { //@@@: public NativeMessagingException(string message) : base(message) { }
        const NativeMessagingException = function(message, innerException) { //@@@: public NativeMessagingException(string message, Exception innerException) : base(message, innerException) { }
        const NativeMessagingException = function(info, context) { //@@@: protected NativeMessagingException(SerializationInfo info, StreamingContext context) : base(info, context) { }

}(globalObject)); //@@@: }
