(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createCGlobals = function() {

        const self = {}; //@@@: public static class cGlobals
        self.String gAppName = ""; //@@@: public static String gAppName = "";
        self.String gAppPath = ""; //@@@: public static String gAppPath = "";
        self.String gDefaultHelpFile = ""; //@@@: public static String gDefaultHelpFile = "";

        self.String gErrorDB = ""; //@@@: public static String gErrorDB = "";

        // to send emails with errors to crowsoft
        //
        self.String gEmailServer = ""; //@@@: public static String gEmailServer = "";
        self.String gEmailAddress = ""; //@@@: public static String gEmailAddress = "";
        self.int gEmailPort = 0; //@@@: public static int gEmailPort = 0;
        self.String gEmailUser = ""; //@@@: public static String gEmailUser = "";
        self.String gEmailPwd = ""; //@@@: public static String gEmailPwd = "";

        self.String gEmailErrDescrip = ""; //@@@: public static String gEmailErrDescrip = "";

        self.bool G_FormResult = null; //@@@: public static bool G_FormResult;

        // used for fEditar to return the result.
        self.String G_InputValue = ""; //@@@: public static String G_InputValue = "";

        self.bool gNoChangeMouseCursor = null; //@@@: public static bool gNoChangeMouseCursor;
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
