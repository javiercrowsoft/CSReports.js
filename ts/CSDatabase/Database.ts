namespace CSDatabase {

    export class Database {

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
