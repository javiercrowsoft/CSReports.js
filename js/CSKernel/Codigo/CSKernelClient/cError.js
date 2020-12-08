(function(globalObject) {


    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {


    globalObject.CSKernelClient.createCError = function() {

        const self = {}; //@@@: public static class cError
        let String m_lastErrorDescription = ""; //@@@: private static String m_lastErrorDescription = "";
        let String m_lastErrorInfoAdd = ""; //@@@: private static String m_lastErrorInfoAdd = "";
        let String m_lastErrorModule = ""; //@@@: private static String m_lastErrorModule = "";
        let String m_lastErrorNumber = ""; //@@@: private static String m_lastErrorNumber = "";
        let String m_lastErrorLine = ""; //@@@: private static String m_lastErrorLine = "";
        let String m_lastErrorFunction = ""; //@@@: private static String m_lastErrorFunction = "";
        let Boolean m_silent = false; //@@@: private static Boolean m_silent = false;

        self.mngError = function(ex, ) { //@@@: public static void mngError(Exception ex,
                             string function, //@@@: string function,
                             string module, //@@@: string module,
                             string infoAdd) //@@@: string infoAdd)
        { //@@@: {
            mngError(ex, function, module, infoAdd, "", eErrorLevel.eErrorWarning, eErrorType.eErrorVba, null); //@@@: mngError(ex, function, module, infoAdd, "", eErrorLevel.eErrorWarning, eErrorType.eErrorVba, null);
        }; //@@@: }

        self.mngError = function(ex, ) { //@@@: public static void mngError(Exception ex,
                             string function, //@@@: string function,
                             string module, //@@@: string module,
                             string infoAdd, //@@@: string infoAdd,
                             string title, //@@@: string title,
                             eErrorLevel level, //@@@: eErrorLevel level,
                             eErrorType varType, //@@@: eErrorType varType,
                             object connection) //@@@: object connection)
        { //@@@: {
            // TODO: implement function
            let f = new fErrors(); //@@@: fErrors f = new fErrors();
            f.setErrorIcon(); //@@@: f.setErrorIcon();
            f.setDetails(ex.Message); //@@@: f.setDetails(ex.Message);
            f.ShowDialog(); //@@@: f.ShowDialog();
        }; //@@@: }

        self.getLastErrorDescription = function() { //@@@: public static String getLastErrorDescription()
            return m_lastErrorDescription; //@@@: return m_lastErrorDescription;
        }; //@@@: }

        self.getLastErrorInfoAdd = function() { //@@@: public static String getLastErrorInfoAdd()
            return m_lastErrorInfoAdd; //@@@: return m_lastErrorInfoAdd;
        }; //@@@: }

        self.getLastErrorModule = function() { //@@@: public static String getLastErrorModule()
            return m_lastErrorModule; //@@@: return m_lastErrorModule;
        }; //@@@: }

        self.getLastErrorNumber = function() { //@@@: public static String getLastErrorNumber()
            return m_lastErrorNumber; //@@@: return m_lastErrorNumber;
        }; //@@@: }

        self.getLastErrorLine = function() { //@@@: public static String getLastErrorLine()
            return m_lastErrorLine; //@@@: return m_lastErrorLine;
        }; //@@@: }

        self.getLastErrorFunction = function() { //@@@: public static String getLastErrorFunction()
            return m_lastErrorFunction; //@@@: return m_lastErrorFunction;
        }; //@@@: }

        self.setSilent = function(rhs) { //@@@: public static void setSilent(bool rhs)
            m_silent = rhs; //@@@: m_silent = rhs;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
