namespace CSDatabase {

    import RefWrapper = CSKernelClient.RefWrapper;
    import Utils = CSOAPI.Utils;

    export class Database {

        // yyyyMMdd HH:mm:ss
        private static SQL_DATE_FORMAT = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };

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

        public static sqlString(val: string) {
            return "'" + val.replace(/'/g, "''") + "'";
        }

        public static sqlDate(val: string) {
            const date  = new Date(val);
            // @ts-ignore
            return "'" + new Intl.DateTimeFormat('ja-JP', Database.SQL_DATE_FORMAT).format(date)  + "'";
        }

    /* TODO: remove me
    private string getNumberSql(string number)
    {
        if (! G.isNumeric(number))
        {
            return "0";
        }
        else
        {
            var s = cUtil.val(number).ToString(new String('#', 27) + "0." + new String('#', 28), CultureInfo.InvariantCulture);
            s = s.Replace(",", ".");
            if (s.Substring(s.Length - 1, 0) == ".")
            {
                s = s.Substring(0, s.Length - 1);
            }
            return s;
        }

    }
    private string getNumberSql(string number)
    {
        if (!G.isNumeric(number))
        {
            return "0";
        }
        else
        {
            var s = cUtil.val(number).ToString(new String('#', 27) + "0." + new String('#', 28), CultureInfo.InvariantCulture);
            s = s.Replace(",", ".");
            if (s.Substring(s.Length - 1, 0) == ".")
            {
                s = s.Substring(0, s.Length - 1);
            }
            return s;
        }

    }

     */
        public static sqlNumber(number: string): string {
            if (! Utils.isNumber(number)) {
                return "0";
            }
            else {
                let s = Utils.val(number).toString();
                s = s.replace(",", ".");
                if (s.substring(s.length - 1, 0) == ".") {
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
