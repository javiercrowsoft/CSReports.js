(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
UNKNOWN >>     class KernelException : System.Exception //@@@: class KernelException : System.Exception
    { //@@@: {
        globalObject.CSKernelClient.createClassName = function() {

            const self = {}; //@@@: public String className { get; set; }

        self. = function() { //@@@: public KernelException() : base() { }

        self. = function(module, message) { //@@@: public KernelException(String module, String message) : base(message)
            className = module; //@@@: className = module;
        }; //@@@: }

        // A constructor is needed for serialization when an
        // exception propagates from a remoting server to the client. 
        self. = function(info, context) { //@@@: protected KernelException(SerializationInfo info, StreamingContext context) { }

        self. = function() { //@@@: public override string ToString()
            return base.ToString() + "\n\nClass Name:" + className; //@@@: return base.ToString() + "\n\nClass Name:" + className;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
