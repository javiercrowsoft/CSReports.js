namespace CSKernelClient {

    import Exception = CSOAPI.Exception;

    export class cWindow {

        private static lastErrorDescription = "";
        private static lastErrorInfoAdd = "";
        private static silent = false;

        public static mngError(ex: Exception, infoAdd: string = "") {
            let f: fErrors = new fErrors();
            f.setErrorIcon();
            f.setDetails(ex.getMessage());
            f.showDialog();
        }

        public static msgWarning(msg: string, title: string) {

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
