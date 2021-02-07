namespace CSDataBase {

    export class Database {

        private c_module: string = "cDataBase";
    }

    export class csDatabaseEngineStringConnections {

        public CSREPORT_WEB: string = "CSREPORT_WEB";
    }

    export enum csDatabaseEngine
    { 
        SQL_SERVER = 1,
        POSTGRESQL = 2,
        ORACLE = 3,
        CSREPORT_WEB = 4
    }
}
