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

        static ask(question: string, defaultButton: any): Promise<boolean> {
            return Promise.resolve(false);
        }

        static askYesNoCancel(question: string, title: string, defaultButton: any): Promise<csAskEditResult> {
            return Promise.resolve(csAskEditResult.CSASKRSLTCANCEL);
        }

        static msgInfo(theMainHeaderCanTBeDeleted: string): Promise<void> {
            return Promise.resolve();
        }
    }

    export enum MessageBoxDefaultButton {
        Button2,
        Button3
    }

    export enum csAskEditResult {
        CSASKRSLTYES = 1,
        CSASKRSLTNO = 2,
        CSASKRSLTCANCEL = 3
    }

}
