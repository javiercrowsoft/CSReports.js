namespace CSReportEngine {

    export class ProgressEventArgs {

        public readonly task;
        public readonly page;
        public readonly currRecord;
        public readonly recordCount;
        public cancel: boolean = false;

        public constructor(task: string, page: number, currRecord: number, recordCount: number) {
            this.task = task;
            this.page = page;
            this.currRecord = currRecord;
            this.recordCount = recordCount;
        }
    }
}
