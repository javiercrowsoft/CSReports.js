namespace CSReportEngine {

    export class FindAccessFileEventArgs {

        private file: string;
        private cancel: boolean;

        public FindAccessFileEventArgs(file: string) {
            this.file = file;
        }
        public getFile() {
            return this.file;
        }
        public isCancel() {
            return this.cancel;
        }
    }
}
