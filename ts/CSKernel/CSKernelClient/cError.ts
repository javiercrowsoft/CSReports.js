namespace CSKernelClient {

    export class cError {

        private lastErrorDescription = "";
        private lastErrorInfoAdd = "";
        private static silent = false;

        public static mngError(ex: any, infoAdd: string = "") {
            let f: fErrors = new fErrors();
            f.setErrorIcon();
            f.setDetails(ex.getMessage ? ex.getMessage() : ex.toString());
            f.setInfoAdd(infoAdd);
            f.showDialog();
        }

        public static mngWarning(msg: string, title: string = "") {
            let f: fErrors = new fErrors();
            f.setWarnIcon();
            f.setTitle(title);
            f.setDetails(msg);
            f.showDialog();
        }

        public getLastErrorDescription() {
            return this.lastErrorDescription;
        }

        public getLastErrorInfoAdd() {
            return this.lastErrorInfoAdd;
        }

        public static setSilent(rhs: boolean) {
            this.silent = rhs;
        }
    }

    class fErrors {
        setErrorIcon() {

        }

        setDetails(s: string) {

        }

        showDialog() {

        }

        setWarnIcon() {

        }

        setTitle(title: string) {

        }

        setInfoAdd(infoAdd: string) {

        }
    }
}
