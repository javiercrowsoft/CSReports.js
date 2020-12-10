(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createCGlobals = function() {

        // @ts-ignore
        let self: CSKernelClient.IcGlobals = {};
        self.String: static gAppName = "";
        self.String: static gAppPath = "";
        self.String: static gDefaultHelpFile = "";

        self.String: static gErrorDB = "";

        // to send emails with errors to crowsoft
        //
        self.String: static gEmailServer = "";
        self.String: static gEmailAddress = "";
        self.int: static gEmailPort = 0;
        self.String: static gEmailUser = "";
        self.String: static gEmailPwd = "";

        self.String: static gEmailErrDescrip = "";

        self.bool: static = null;G_FormResult;

        // used for fEditar to return the result.
        self.String: static G_InputValue = "";

        self.bool: static = null;gNoChangeMouseCursor;
        return self;

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IcGlobals {

    String: static;
    String: static;
    String: static;
    String: static;
    String: static;
    String: static;
    int: static;
    String: static;
    String: static;
    String: static;
    bool: static;
    String: static;
    bool: static;
  }
}
