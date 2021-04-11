namespace CSDatabase {

    export class Database {

        private c_module: string = "cDataBase";
    }

    export class DatabaseEngineStringConnections {

        public CSREPORT_WEB: string = "CSREPORT_WEB";
    }

    export enum DatabaseEngine
    { 
        SQL_SERVER = 1,
        POSTGRESQL = 2,
        ORACLE = 3,
        CSREPORT_WEB = 4
    }
}
