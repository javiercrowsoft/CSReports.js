(function(globalObject) {


    globalObject.CSKernelClient = globalObject.CSKernelClient || {};



    globalObject.CSKernelClient.createCError = function() {

        // @ts-ignore
        let self: CSKernelClient.IcError = {};
        let String: static m_lastErrorDescription = "";
        let String: static m_lastErrorInfoAdd = "";
        let String: static m_lastErrorModule = "";
        let String: static m_lastErrorNumber = "";
        let String: static m_lastErrorLine = "";
        let String: static m_lastErrorFunction = "";
        let Boolean: static m_silent = false;

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
            let f: fErrors = new fErrors();
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

    }    }
}(globalObject));


namespace CSKernelClient {

  export interface IcError {

    mngError: (Exception, ) => void;
    mngError: (Exception, ) => void;
    getLastErrorDescription: () => String;
    getLastErrorInfoAdd: () => String;
    getLastErrorModule: () => String;
    getLastErrorNumber: () => String;
    getLastErrorLine: () => String;
    getLastErrorFunction: () => String;
    setSilent: (bool) => void;
  }
}
