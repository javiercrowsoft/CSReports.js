(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createCGlobals = function() {

        const self = {};
        self.String gAppName = "";
        self.String gAppPath = "";
        self.String gDefaultHelpFile = "";

        self.String gErrorDB = "";

        // to send emails with errors to crowsoft
        //
        self.String gEmailServer = "";
        self.String gEmailAddress = "";
        self.int gEmailPort = 0;
        self.String gEmailUser = "";
        self.String gEmailPwd = "";

        self.String gEmailErrDescrip = "";

        self.bool G_FormResult = null;

        // used for fEditar to return the result.
        self.String G_InputValue = "";

        self.bool gNoChangeMouseCursor = null;
        return self;

    }
}(globalObject));
