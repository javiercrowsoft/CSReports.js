(function(globalObject) {


    globalObject.CSKernelClient = globalObject.CSKernelClient || {};



    globalObject.CSKernelClient.createCError = function() {

        const self = {};
        let String m_lastErrorDescription = "";
        let String m_lastErrorInfoAdd = "";
        let String m_lastErrorModule = "";
        let String m_lastErrorNumber = "";
        let String m_lastErrorLine = "";
        let String m_lastErrorFunction = "";
        let Boolean m_silent = false;

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
            let f = new fErrors();
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
