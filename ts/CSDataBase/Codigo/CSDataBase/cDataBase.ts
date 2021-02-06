namespace CSDataBase {

    export class cDataBase {

        private c_module: string = "cDataBase";
    }

    export class csDataBaseEngineStringConnections {

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
