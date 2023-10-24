///<reference path="../CSOAPI/Utils.ts"/>
///<reference path="../CSKernel/CSKernelClient/cError.ts"/>

namespace CSDatabase {

    import RefWrapper = CSKernelClient.RefWrapper;
    import U = CSOAPI.Utils;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import Exception = CSOAPI.Exception;
    import cError = CSKernelClient.cError;

    export enum DatabaseEngine {
        SQL_SERVER = 1,
        POSTGRESQL = 2,
        ORACLE = 3,
        CS_REPORT_WEB = 4
    }

    export class Database {

        // yyyyMMdd HH:mm:ss
        private static SQL_DATE_FORMAT = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

        private silent: boolean;
        private commandTimeout: number;
        private connectionTimeout: number;
        private userDescription: string;
        private strConnect: string;

        private ocn: DbConnection = null;
        private databaseEngine = DatabaseEngine.CS_REPORT_WEB;

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
            this.closeDb();
            if (this.ocn == null) {
                this.ocn = this.createConnection();
            }
            this.ocn.setConnectionString(this.strConnect);
            this.ocn.open();
            return true;
        }

        private createConnection(): DbConnection {
            switch (this.databaseEngine) {
                case DatabaseEngine.CS_REPORT_WEB:
                    return new JSONServerConnection();
                case DatabaseEngine.SQL_SERVER:
                case DatabaseEngine.POSTGRESQL:
                case DatabaseEngine.ORACLE:
                default:
                    throw new NotImplementedException();
            }
        }

        setOpenRsExDescript(userDescription: string) {
            this.userDescription = userDescription;
        }

        loadDataTable(sqlstmt: string, dtr: RefWrapper<DataTable>, drr: RefWrapper<DbDataReader>,
                      showWindowCancel = true, raiseProgressEvent = false, showModal = false) {

            let cmd = this.createCommand(sqlstmt);

            const ors = cmd.executeReader();

            if(ors) {
                drr.set(ors);
                dtr.set(new DataTable())
                dtr.get().load(ors);
                return true;
            }
            else {
                drr.set(null);
                dtr.set(null);
                return false;
            }
        }

        private createCommand(sqlstmt: string) {
            let ocmd: DbCommand = null;

            switch (this.databaseEngine) {
                case DatabaseEngine.CS_REPORT_WEB:
                    ocmd = new JSONCommand(sqlstmt, this.ocn as JSONServerConnection);
                    break;
                case DatabaseEngine.SQL_SERVER:
                case DatabaseEngine.POSTGRESQL:
                case DatabaseEngine.ORACLE:
                    throw new NotImplementedException();
            }

            if(ocmd == null)
                throw new Exception("The database engine is not supported " + this.databaseEngine.toString());

            ocmd.commandTimeout = this.commandTimeout;
            ocmd.commandType = CommandType.Text;

            return ocmd;
        }

        public closeDb() {
            try {
                if(this.ocn !== null) {
                    this.ocn.close();
                }
            } catch(ex) {
                cError.mngError(ex);
            }
        }

        public static sqlString(val: string) {
            return "'" + val.replace(/'/g, "''") + "'";
        }

        public static sqlDate(val: string) {
            const date  = new Date(val);
            // @ts-ignore
            return "'" + new Intl.DateTimeFormat('ja-JP', Database.SQL_DATE_FORMAT).format(date)  + "'";
        }

        public static sqlNumber(number: string): string {
            if(! U.isNumber(number)) {
                return "0";
            }
            else {
                let s = U.val(number).toString();
                s = s.replaceAll(",", ".");
                if(s.substring(s.length - 1, s.length) === ".") {
                    s = s.substring(0, s.length - 1);
                }
                return s;
            }
        }

        public openSchema(procedureParameters: string, restrictions: string[]): DataTable {
            // TODO: implement
            return undefined;
        }

        public openRs(sqlstmt: string, rs: RefWrapper<DataTable>): boolean {
            // TODO: implement
            return false;
        }
    }

    export interface DbDataReader {
        read(): boolean;
        isClosed(): boolean;
        nextResult(): boolean;
        getValues(values: object[]): number;
        fieldCount(): number;
        getName(i: number): string;
        getColumnType(i: number): DataType;
    }

    export class DatabaseEngineStringConnections {

        public CS_REPORT_WEB: string = "CSREPORT_WEB";
    }
}
