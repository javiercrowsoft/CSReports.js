


namespace CSKernelClient
{


    export class cError {


    {
        private String: static this.lastErrorDescription = "";
        private String: static this.lastErrorInfoAdd = "";
        private String: static this.lastErrorModule = "";
        private String: static this.lastErrorNumber = "";
        private String: static this.lastErrorLine = "";
        private String: static this.lastErrorFunction = "";
        private Boolean: static this.silent = false;

        public mngError(ex: Exception) {
                             string function,
                             string module,
                             string infoAdd)
        {
            mngError(ex, function, module, infoAdd, "", eErrorLevel.eErrorWarning, eErrorType.eErrorVba, null);
        }

        public mngError(ex: Exception) {
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
        }

        public getLastErrorDescription() {
            return this.lastErrorDescription;
        }

        public getLastErrorInfoAdd() {
            return this.lastErrorInfoAdd;
        }

        public getLastErrorModule() {
            return this.lastErrorModule;
        }

        public getLastErrorNumber() {
            return this.lastErrorNumber;
        }

        public getLastErrorLine() {
            return this.lastErrorLine;
        }

        public getLastErrorFunction() {
            return this.lastErrorFunction;
        }

        public setSilent(rhs: boolean) {
            this.silent = rhs;
        }


    }    }
}
