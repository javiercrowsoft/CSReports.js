namespace CSKernelClient {

    import Exception = CSOAPI.Exception;

    export class cWindow {

        private static lastErrorDescription = "";
        private static lastErrorInfoAdd = "";
        private static silent = false;

        public static mngError(ex: Exception, infoAdd: string = "") {
            cError.mngError(ex, infoAdd);
        }

        public static msgWarning(msg: string, title: string = "") {
            cError.mngWarning(msg, title);
        }

        public static getLastErrorDescription() {
            return this.lastErrorDescription;
        }

        public static getLastErrorInfoAdd() {
            return this.lastErrorInfoAdd;
        }

        public static setSilent(rhs: boolean) {
            this.silent = rhs;
        }
    }
}
