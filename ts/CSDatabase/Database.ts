namespace CSDatabase {

    import RefWrapper = CSKernelClient.RefWrapper;

    export class Database {

        private silent: boolean;
        private commandTimeout: number;
        private connectionTimeout: number;
        private userDescription: string;
        private strConnect: string;

        public constructor(databaseEngine: DatabaseEngine) {

        }

        public setSilent(silent: boolean) {
            this.silent = silent;
        }

        public setCommandTimeout(commandTimeout: number) {
            this.commandTimeout = commandTimeout;
        }

        public setConnectionTimeout(connectionTimeout: number) {
            this.connectionTimeout = connectionTimeout;
        }

        public initDb(strConnect: string) {
            this.strConnect = strConnect;
            return false;
        }

        setOpenRsExDescript(userDescription: string) {
            this.userDescription = userDescription;
        }

        loadDataTable(showWindowCancel: boolean, raiseProgressEvent: boolean, showModal: boolean,
                      sqlstmt: string, dtr: RefWrapper<DataTable>, dr: DbDataReader) {
            return false;
        }

        public closeDb() {

        }
    }

    export class DbDataReader {

        public isClosed() {
            return false;
        }

        public nextResult() {
            return false;
        }
    }

    export class DatabaseEngineStringConnections {

        public CS_REPORT_WEB: string = "CSREPORT_WEB";
    }

    export enum DatabaseEngine
    { 
        SQL_SERVER = 1,
        POSTGRESQL = 2,
        ORACLE = 3,
        CS_REPORT_WEB = 4
    }
}
