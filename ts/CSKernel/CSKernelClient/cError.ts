namespace CSKernelClient {

    import Exception = CSOAPI.Exception;

    export class cError {

        private lastErrorDescription = "";
        private lastErrorInfoAdd = "";
        private silent = false;

        public static mngError(ex: object, infoAdd: string = "") {
            let f: fErrors = new fErrors();
            f.setErrorIcon();
            f.setDetails(ex.getMessage());
            f.showDialog();
        }

        public getLastErrorDescription() {
            return this.lastErrorDescription;
        }

        public getLastErrorInfoAdd() {
            return this.lastErrorInfoAdd;
        }

        public setSilent(rhs: boolean) {
            this.silent = rhs;
        }
    }
}
