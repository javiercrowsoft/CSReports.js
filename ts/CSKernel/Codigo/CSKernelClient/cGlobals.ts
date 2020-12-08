(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createCGlobals = function() {

        const self = {};
        self.String: staticgAppName = "";
        self.String: staticgAppPath = "";
        self.String: staticgDefaultHelpFile = "";

        self.String: staticgErrorDB = "";

        // to send emails with errors to crowsoft
        //
        self.String: staticgEmailServer = "";
        self.String: staticgEmailAddress = "";
        self.int: staticgEmailPort = 0;
        self.String: staticgEmailUser = "";
        self.String: staticgEmailPwd = "";

        self.String: staticgEmailErrDescrip = "";

        self.bool: static = null;G_FormResult;

        // used for fEditar to return the result.
        self.String: staticG_InputValue = "";

        self.bool: static = null;gNoChangeMouseCursor;
        return self;

    }
}(globalObject));
