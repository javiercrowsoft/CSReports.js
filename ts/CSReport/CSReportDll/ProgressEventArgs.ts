namespace CSReportDll {

    export class ProgressEventArgs {

        private task = "";
        private page = 0;
        private currRecord = 0;
        private recordCount = 0;
        private cancel: boolean = false;

        public constructor(task: string, page: number, currRecord: number, recordCount: number) {
            this.task = task;
            this.page = page;
            this.currRecord = currRecord;
            this.recordCount = recordCount;
        }

        public getTask() { return this.task; }
        public getPage() { return this.page; }
        public getCurrRecord() { return this.currRecord; }
        public getRecordCount() { return this.recordCount; }
        public isCancel() { return this.cancel; }
        public setCancel(cancel: boolean) { this.cancel = cancel; }
    }
}
