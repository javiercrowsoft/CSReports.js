(function(globalObject) {


    globalObject.CSKernelClient = globalObject.CSKernelClient || {};



    globalObject.CSKernelClient.createCError = function() {

        const self = {};
        let String: staticm_lastErrorDescription = "";
        let String: staticm_lastErrorInfoAdd = "";
        let String: staticm_lastErrorModule = "";
        let String: staticm_lastErrorNumber = "";
        let String: staticm_lastErrorLine = "";
        let String: staticm_lastErrorFunction = "";
        let Boolean: staticm_silent = false;

        self.mngError = function(ex, ) {
                             string function,
                             string module,
                             string infoAdd)
        {
            mngError(ex, function, module, infoAdd, "", eErrorLevel.eErrorWarning, eErrorType.eErrorVba, null);
        };

        self.mngError = function(ex, ) {
                             string function,
                             string module,
                             string infoAdd,
                             string title,
                             eErrorLevel level,
                             eErrorType varType,
                             object connection)
        {
            // TODO: implement function
            let f: fErrors= new fErrors();
            f.setErrorIcon();
            f.setDetails(ex.Message);
            f.ShowDialog();
        };

        self.getLastErrorDescription = function() {
            return m_lastErrorDescription;
        };

        self.getLastErrorInfoAdd = function() {
            return m_lastErrorInfoAdd;
        };

        self.getLastErrorModule = function() {
            return m_lastErrorModule;
        };

        self.getLastErrorNumber = function() {
            return m_lastErrorNumber;
        };

        self.getLastErrorLine = function() {
            return m_lastErrorLine;
        };

        self.getLastErrorFunction = function() {
            return m_lastErrorFunction;
        };

        self.setSilent = function(rhs) {
            m_silent = rhs;
        };
        return self;

    }
}(globalObject));
