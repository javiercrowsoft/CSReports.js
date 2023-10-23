namespace CSKernelClient {

    import Exception = CSOAPI.Exception;

    export class cWindow {

        private static lastErrorDescription = "";
        private static lastErrorInfoAdd = "";
        private static silent = false;

        public static mngError(ex: Exception, infoAdd: string = "") {
            return cError.mngError(ex, infoAdd);
        }

        public static msgWarning(msg: string, title: string = "") {
            return cError.mngWarning(msg, title);
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

        static msgInfo(msg: string, title = "Info") {
            return cError.mngInfo(msg, title);
        }

        static clickElem(elem) {
            // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
            let eventMouse = document.createEvent("MouseEvents");
            eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            // @ts-ignore
            eventMouse.raisedByCode = true;
            elem.dispatchEvent(eventMouse);
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
