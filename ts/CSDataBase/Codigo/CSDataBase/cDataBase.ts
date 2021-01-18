

// http://msdn.microsoft.com/en-us/library/8627sbea%28VS.71%29.aspx
//
// how to get a DataSet from an OracleDataReader
//
// http://msdn.microsoft.com/en-us/library/haa3afyz%28v=vs.71%29.aspx#Y1763
// public delegate void OpenRsProgress();

namespace CSDataBase
{

    export class cDataBase {


    {
        private c_module: string = "cDataBase";
        private c_ErrorSqlInfoAdd: string = "@@ErrorSqlInfoAdd@@";

        private ocn: DbConnection = null;
        private otxn: DbTransaction = null;
        private connect: string = "";

        private ors: DbDataReader = null;
        private eofField: boolean = false;
        private nextField: number = 0;
        private fieldType: eFieldType = null;

        private userId: number = 0;
        private transactionLevel: number = 0;

        private serverName: string = "";
        private userName: string = "";
        private password: string = "";

        private originalStrConnect: string = "";

        private openRsCancel: boolean = false;
        private openRsExDescript: string = "";

        private commandTimeout: number = 180;
        private connectionTimeout: number = 180;

        private maxTryOpenRs: number = 2;
        private maxTryExecute: number = 2;

        private lastDbError: string = "";

        private eof: boolean = false;

        private databaseEngine: csDatabaseEngine = csDatabaseEngine.SQL_SERVER;

//         public event OpenRsProgress openRsProgress;

UNKNOWN >>         public bool silent
        {
UNKNOWN >>             get { return cDatabaseGlobals.Silent; }
UNKNOWN >>             set { cDatabaseGlobals.Silent = value; }
        }

        public setSilent(rhs: boolean) {
            cDatabaseGlobals.Silent = rhs;
        }

UNKNOWN >>         public bool dbIsOpen
        {
UNKNOWN >>             get
            {
                if (this.ocn === null) {
                    return false;
                }
                else {
                    return this.ocn.State === ConnectionState.Open;
                }
            }
        }

UNKNOWN >>         public int commandTimeout
        {
UNKNOWN >>             get { return this.commandTimeout; }
UNKNOWN >>             set { this.commandTimeout = value; }
        }

        public setCommandTimeout(rhs: number) {
            this.commandTimeout = rhs;
        }

UNKNOWN >>         public int connectionTimeout
        {
UNKNOWN >>             get { return this.connectionTimeout; }
UNKNOWN >>             set { this.connectionTimeout = value; }
        }

        public setConnectionTimeout(rhs: number) {
            this.connectionTimeout = rhs;
        }

UNKNOWN >>         public bool openRsCancel
        {
UNKNOWN >>             get { return this.openRsCancel; }
UNKNOWN >>             set { this.openRsCancel = value; }
        }

UNKNOWN >>         public string originalStrConnect
        {
UNKNOWN >>             get { return this.originalStrConnect; }
UNKNOWN >>             set { this.originalStrConnect = value; }
        }

UNKNOWN >>         public int userId
        {
UNKNOWN >>             get { return this.userId; }
UNKNOWN >>             set { this.userId = value; }
        }

UNKNOWN >>         public int transactionLevel
        {
UNKNOWN >>             get { return this.transactionLevel; }
        }

UNKNOWN >>         public DbDataReader ors
        {
UNKNOWN >>             set
            {
                this.ors = value;
                this.eofField = false;
                this.nextField = 0;
            }
        }

UNKNOWN >>         public bool eof
        {
UNKNOWN >>             get { return this.eof; }
        }

UNKNOWN >>         public bool eofField
        {
UNKNOWN >>             get { return this.eofField; }
        }

UNKNOWN >>         public CSOAPI.eServerVersion serverVersion
        {
UNKNOWN >>             get
            {
                let ver: string = "";
                ver = this.ocn.ServerVersion;

                // TODO: this code is for sql server and the "Access if" don't work
                //       in this version
                //       when it runs we'll have to put the oracle numbers here
                if (ver === "06") {
                    return CSOAPI.eServerVersion.eVSql65;
                }
                else if (ver === "07") {
                    return CSOAPI.eServerVersion.eVSql70;
                }
                else if (ver === "03") {
                    return CSOAPI.eServerVersion.eVSAccess;
                }
                else {
                    return CSOAPI.eServerVersion.eVSUnknown;
                }
            }
        }

UNKNOWN >>         public eFieldType fieldType
        {
UNKNOWN >>             get { return this.fieldType; }
        }

UNKNOWN >>         public string strConnect
        {
UNKNOWN >>             get
            {
                if (this.ocn === null) {
                    return "";
                }
                else {
                    return this.ocn.ConnectionString;
                }
            }
        }

UNKNOWN >>         public string dbName
        {
UNKNOWN >>             get
            {
                if (this.ocn !== null) {
                    return this.ocn.Database;
                }
                else {
                    return "";
                }
            }
        }

UNKNOWN >>         public string serverName
        {
UNKNOWN >>             get { return this.serverName; }
        }

UNKNOWN >>         public string openRsExDescript
        {
UNKNOWN >>             get { return this.openRsExDescript; }
UNKNOWN >>             set { this.openRsExDescript = value; }
        }

        public setOpenRsExDescript(rhs: string) {
            this.openRsExDescript = rhs;
        }

UNKNOWN >>         public int maxTryOpenRs
        {
UNKNOWN >>             get { return this.maxTryOpenRs; }
UNKNOWN >>             set { this.maxTryOpenRs = value; }
        }

UNKNOWN >>         public int maxTryExecute
        {
UNKNOWN >>             get { return this.maxTryExecute; }
UNKNOWN >>             set { this.maxTryExecute = value; }
        }

UNKNOWN >>         public string lastDbError
        {
UNKNOWN >>             get { return this.lastDbError; }
        }

UNKNOWN >>         public string password
        {
UNKNOWN >>             get { return this.password; }
        }

        public saveSp(sqlstmt: string) {
                           DbDataReader ors)
        {
            return saveSp(sqlstmt, ors, -1, "", "", "Error", 0);
        }

        public saveSp(sqlstmt: string) {
                           DbDataReader ors,
                           int timeout,
                           string function,
                           string module,
                           string title,
                           eErrorLevel level)
        {

            let oldCommandTimeout: number = this.commandTimeout;
            if (timeout !== -1) {
                this.commandTimeout = timeout;
            }
            let rtn: boolean = openRs(sqlstmt, ors, function, module, title, level);
            this.commandTimeout = oldCommandTimeout;
            return rtn;
        }

        // list of sql schema names
        // https://msdn.microsoft.com/en-us/library/ms254969(v=vs.110).aspx
        //
        // how to create restriction array
        // https://msdn.microsoft.com/en-us/library/ms136366(v=vs.110).aspx
        //
        public openSchema() {
            return this.ocn.GetSchema();
        }

        public openSchema(collectionName: string) {
            return this.ocn.GetSchema(collectionName);
        }

        public openSchema(collectionName: string, restrinctionValues: string[]) {
            return this.ocn.GetSchema(collectionName, restrinctionValues);
        }

        public initDb(connect: string) {
            return initDbEx("", "", "", "", connect, false);
        }

        public initDb(nameDb: string) {
                           string server,
                           string user,
                           string password,
                           string connect)
        {
            return initDbEx(nameDb, server, user, password, connect, false);
        }

        public initDbEx(nameDb: string) {
                             string server,
                             string user,
                             string password,
                             string connect,
                             bool useOleDb)
        {
            let mouseWait: cMouseWait = new cMouseWait();
            try {
                closeDb();
                if (this.ocn === null) {
                    this.ocn = createConnection();
                }
                this.originalStrConnect = connect;
                if (connect === "") {
                    connect = string.Format("Data Source={0};User Id={1};Password={2};Integrated Security=no;",
                                            server,
                                            user,
                                            password);
                    this.serverName = server;
                    this.userName = user;
                    this.password = password;
                }
                else {
                    this.serverName = cUtil.getToken(connect, "Data Source=");
                    this.userName = cUtil.getToken(connect, "User=");
                    this.password = cUtil.getToken(connect, "Password=");
                }
                this.connect = connect;
                pConnect();
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "initDbEx", c_module, "");
                return false;
            }
UNKNOWN >>             finally
            {
                mouseWait.Dispose();
            }
        }

        public addNew(dt: DataTable, dr: DataRow) {
            dr = null;
            try {
                dr = dt.NewRow();
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "addNew", c_module, "");
                return false;
            }
        }

        public update(dr: DataRow, dt: DataTable, da: DbDataAdapter) {
            try {
                dt.Rows.Add(dr);
                da.Update(dt);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "update", c_module, "");
                return false;
            }
        }

        public delete(dr: DataRow, dt: DataTable, da: DbDataAdapter) {
            try {
                dt.Rows.Remove(dr);
                da.Update(dt);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "delete", c_module, "");
                return false;
            }
        }

        public openRsEx(showWindowCancel: boolean) {
                             bool raiseProgressEvent,
                             bool showModal,
                             string sqlstmt,
                             DbDataReader ors)
        {
            return openRsEx(showWindowCancel,
                            raiseProgressEvent,
                            showModal,
                            sqlstmt,
                            ors,
                            "",
                            "",
                            "");
        }

        public loadDataTables(showWindowCancel: boolean) {
                                     bool raiseProgressEvent,
                                     bool showModal,
                                     string sqlstmt,
                                     List<DataTable> dt,
                                     string function,
                                     string module,
                                     string title)
        {
UNKNOWN >>             DbDataReader ors;
            if (openRsEx(showWindowCancel,
                            raiseProgressEvent,
                            showModal,
                            sqlstmt,
                            ors,
                            function,
                            module,
                            title)) {
                dt = new List();
                let o: var = new DataTable();
                o.Load(ors);
                dt.Add(o);
                return true;
            }
            else {
                dt = null;
                return false;
            }
        }

        public loadDataTable(showWindowCancel: boolean) {
                                     bool raiseProgressEvent,
                                     bool showModal,
                                     string sqlstmt,
                                     DataTable dt,
                                     DbDataReader dr,
                                     string function,
                                     string module,
                                     string title)
        {
UNKNOWN >>             DbDataReader ors;
            if (openRsEx(showWindowCancel,
                            raiseProgressEvent,
                            showModal,
                            sqlstmt,
                            ors,
                            function,
                            module,
                            title)) {
                dr = ors;
                dt = new DataTable();
                dt.Load(ors);
                return true;
            }
            else {
                dt = null;
                dr = null;
                return false;
            }
        }

        public openRsEx(showWindowCancel: boolean) {
                             bool raiseProgressEvent,
                             bool showModal,
                             string sqlstmt,
                             DbDataReader ors,
                             string function,
                             string module,
                             string title)
        {
            let cancelDialogShowed: boolean = false;
            let f: fCancelQuery = null;
            ors = null;
            try {
                // create a command to execute the query
                let cmd: cOpenRsCommand = new cOpenRsCommand();
                cmd.getExecuteCommand(this, sqlstmt);

                // execute in asynchronous mode
                cmd.execute();

                let seconds: number = 0;
                let queryCanceled: boolean = false;

                // wait until the query finish
                while (!cmd.done) {
                    // cancel dialog
                    if (showWindowCancel && seconds > 200) {
                        // show the cancel dialog
                        if (!cancelDialogShowed) {
                            f = new fCancelQuery();
                            if (this.openRsExDescript !== "") {
                                f.descript = "Getting data for: " + this.openRsExDescript;
                            }
                            f.Show();
                            cancelDialogShowed = true;
                        }
                    }

                    // events
                    if (raiseProgressEvent) {
                        if (openRsProgress !== null) {
                            openRsProgress();
                        }
                    }

					if (showWindowCancel) Application.DoEvents(); {

                    if (cancelDialogShowed) {
                        if (f.cancel) {
                            queryCanceled = true;
                            break;
                        }
                    }
                    System.Threading.Thread.Sleep(100);
                    seconds += 100;
                }
                // hide cancel dialog
                if (showWindowCancel && cancelDialogShowed) {
                    f.Hide();
                }

                if (queryCanceled) {
                    pReconnect();
                    return false;
                }
                else {
                    ors = cmd.ors;
                    return cmd.success;
                }
            }
            catch (ex) {
                cError.mngError(ex, "openRsEx", c_module, "");
                return false;
            }
UNKNOWN >>             finally
            {
                f = null;
            }
        }

        public asyncOpenRsEx(sqlstmt: string) {
            let ocmd: DbCommand = createCommand(sqlstmt);
            return ocmd.ExecuteReader(CommandBehavior.Default);
        }

        public openRs(sqlstmt: string) {
                           DbDataReader ors,
                           string function,
                           string module,
                           string title,
                           eErrorLevel level)
        {
            let tryCount: number = 0;
            ors = null;

            while (tryCount < this.maxTryOpenRs) {
                if (pOpenRs(sqlstmt,
                            ors,
                            function,
                            module,
                            title,
                            level,
                            tryCount === this.maxTryOpenRs)) {
                    return true;
                }
            }
            return false;
        }

        private pOpenRs(sqlstmt: string) {
                             DbDataReader ors,
                             string function,
                             string module,
                             string title,
                             eErrorLevel level,
                             bool showError)
        {
            ors = null;
            try {
                let ocmd: DbCommand = createCommand(sqlstmt);
                ors = ocmd.ExecuteReader();
                return true;
            }
            catch (ex) {
                if (showError) {
                    cError.mngError(ex, "openRs for " + module + "." + function, c_module, "sentencia: " + sqlstmt);
                }
                return false;
            }
        }

        public disconnectRecordset(sqlstmt: string, dt: DataTable) {
            dt = null;
            try {
                let ocmd: DbCommand = createCommand(sqlstmt);
                let oda: DbDataAdapter = new OracleDataAdapter(ocmd as OracleCommand);
                dt = new DataTable();
                oda.Fill(dt);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "disconnectRecordset", "", "sentencia: " + sqlstmt);
                return false;
            }
        }

        public existsInRecordset(dt: DataTable) {
                                      string field,
                                      string val,
                                      bool founded)
        {
            return existsInRecordset(dt, field, val, founded,
                                     "", "", "", eErrorLevel.eErrorInformation);
        }

        public existsInRecordset(dt: DataTable) {
                                      string field,
                                      string val,
                                      bool founded,
                                      string function,
                                      string module,
                                      string title,
                                      eErrorLevel level)
        {
            let filter: string = field + " = " + val;
            founded = false;

            try {
                if (dt.Rows.Count === 0) {
                    return false;
                }
                else {
                    let vdr: DataRow[] = dt.Select(filter);
                    founded = vdr.Length > 0;
                    return true;
                }
            }
            catch (ex) {
                cError.mngError(ex, "existsInRecordset", module, "filter: " + filter);
                return false;
            }
        }

        public existsInRecord(dr: DataRow) {
                                   DataColumn[] columns,
                                   string val,
                                   bool founded)
        {
            return existsInRecord(dr, columns, val, founded,
                                  "", "", "", eErrorLevel.eErrorInformation);
        }

        public existsInRecord(dr: DataRow) {
                                   DataColumn[] columns,
                                   string val,
                                   bool founded,
                                   string function,
                                   string module,
                                   string title,
                                   eErrorLevel level)
        {
            return pExistsInRecord(dr, columns, val, founded, true,
                                   function, module, title, level);
        }

        public existsInRecordEx(dr: DataRow) {
                                     DataColumn[] columns,
                                     string val,
                                     bool founded,
                                     bool like,
                                     string function,
                                     string module,
                                     string title,
                                     eErrorLevel level)
        {
            return pExistsInRecord(dr, columns, val, founded, like,
                                   function, module, title, level);
        }

        private pExistsInRecord(dr: DataRow) {
                                    DataColumn[] columns,
                                    string val,
                                    bool founded,
                                    bool like,
                                    string function,
                                    string module,
                                    string title,
                                    eErrorLevel level)
        {
            let filter: string = "";
            founded = false;
            val = val.ToLower();

            try {
                for(var i_ = 0; i_ < columns.length; i_++) {
                    let typeCode: System.TypeCode = System.Type.GetTypeCode(col.GetType()); ;
                    switch (typeCode)
                    {
                        case System.TypeCode.Char:
                        case System.TypeCode.String:
                            if (like) {
                                founded = dr[col.ColumnName].ToString().ToLower().Contains(val);
                            }
                            else {
                                founded = dr[col.ColumnName].ToString().ToLower() === val;
                            }
                            break;
                        case System.TypeCode.Decimal:
                        case System.TypeCode.Double:
                        case System.TypeCode.Int16:
                        case System.TypeCode.Int32:
                        case System.TypeCode.Int64:
                        case System.TypeCode.Single:
                        case System.TypeCode.UInt16:
                        case System.TypeCode.UInt32:
                        case System.TypeCode.UInt64:
UNKNOWN >>                             int ival;
                            if (int.TryParse(val, ival)) {
                                founded = dr[col.ColumnName] === ival;
                            }
                            break;
                        case System.TypeCode.DateTime:
                            break;
                        case System.TypeCode.Boolean:
                            founded = false;
                            break;
                        default:
                            founded = false;
                            break;
                    }
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "existsInRecord", module, "filter: " + filter);
                return false;
            }
        }

        public execute(sqlstmt: string) {
            return execute(sqlstmt, "", "", "", eErrorLevel.eErrorInformation);
        }

        public execute(sqlstmt: string) {
                            string function,
                            string module,
                            string title,
                            eErrorLevel level)
        {
            let tryCount: number = 0;
            ors = null;

            while (tryCount < this.maxTryExecute) {
                if (pExecute(sqlstmt,
                             function,
                             module,
                             title,
                             level,
                             tryCount === this.maxTryExecute)) {
                    return true;
                }
            }
            return false;
        }

        private pExecute(sqlstmt: string) {
                              string function,
                              string module,
                              string title,
                              eErrorLevel level,
                              bool showError)
        {
            try {
                let ocmd: DbCommand = createCommand(sqlstmt);
                ocmd.ExecuteNonQuery();
                return true;
            }
            catch (ex) {
                if (showError) {
                    cError.mngError(ex, "pExecute for " + module + "." + function, c_module, "sentencia: " + sqlstmt);
                }
                return false;
            }
        }

        public sqlString(val: string) {
            return "'" + val.Replace("'", "''") + "'";
        }

        public sqlDate(val: string) {
UNKNOWN >>             DateTime dt;
            if (DateTime.TryParseExact(val, "MM/dd/yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "dd/MM/yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "MM-dd-yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "dd-MM-yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "MM.dd.yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "dd.MM.yyyy", null, DateTimeStyles.None, dt)) { }

            else if (DateTime.TryParseExact(val, "M/dd/yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "dd/M/yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "M-dd-yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "dd-M-yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "M.dd.yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "dd.M.yyyy", null, DateTimeStyles.None, dt)) { }

            else if (DateTime.TryParseExact(val, "M/d/yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "d/M/yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "M-d-yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "d-M-yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "M.d.yyyy", null, DateTimeStyles.None, dt)) { }
            else if (DateTime.TryParseExact(val, "d.M.yyyy", null, DateTimeStyles.None, dt)) { }

            else throw new Exception("Invalid date " + val); {
            return "'" + dt.ToString(cConstants.C_SQL_DATE_STRING, CultureInfo.InvariantCulture) + "'";
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
                if (s.Substring(s.Length - 1, 0) === ".")
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
                if (s.Substring(s.Length - 1, 0) === ".")
                {
                    s = s.Substring(0, s.Length - 1);
                }
                return s;
            }

        }

         */
        public sqlNumber(number: string) {
            if (!G.isNumeric(number)) {
                return "0";
            }
            else {
                let s: var = cUtil.val(number).ToString(new String('#', 27) + "0." + new String('#', 28), CultureInfo.InvariantCulture);
                s = s.Replace(",", ".");
                if (s.Substring(s.Length - 1, 0) === ".") {
                    s = s.Substring(0, s.Length - 1);
                }
                return s;
            }
        }

        /* TODO: remove me 
        public static string sqlNumber(string val)
        {
            double ival;
            NumberStyles style = 
                                    (
                                        NumberStyles.AllowCurrencySymbol
                                        + NumberStyles.AllowDecimalPoint
                                        + NumberStyles.AllowThousands
                                        + NumberStyles.AllowLeadingSign
                                        + NumberStyles.AllowLeadingWhite
                                        + NumberStyles.AllowTrailingSign
                                        + NumberStyles.AllowParentheses
                                    );
            if (!double.TryParse(val, style, null, ival))
            {
                return "0";
            }
            else
            {
                val = String.Format("{0:0.000000}", ival);
                int i = val.IndexOf(cRegionalCfg.decimalPoint);
                if (i !== -1)
                {
                    return val.Substring(0, i) + "." + val.Substring(i + 1);
                }
                else
                {
                    return val;
                }
            }
        }
        */

        public closeDb() {
            try {
                if (this.transactionLevel > 0) {
                    rollbackTransaction();
                }
                this.transactionLevel = 0;
                this.userName = "";
                this.serverName = "";

                if (this.ocn !== null) {
                    if (this.ocn.State !== ConnectionState.Closed) {
                        this.ocn.Close();
                    }

                    this.ocn.Dispose();
                    this.ocn = null;
                }
                this.ocn = createConnection();
            }
            catch (ex) {
                cError.mngError(ex, "closeDb", c_module, "");
            }
        }

        public beginTransaction() {
            try {
                if (this.transactionLevel <= 0) {
                    this.otxn = this.ocn.BeginTransaction();
                    this.transactionLevel = 1;
                }
                else {
                    this.transactionLevel++;
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "commitTransaction", c_module, "");
                return false;
            }
        }

        public commitTransaction() {
            if (this.transactionLevel <= 0) {
                this.transactionLevel = 0;
                return false;
            }
            try {
                if (this.transactionLevel === 1) {
                    this.otxn.Commit();
                    this.transactionLevel = 0;
                }
                else {
                    this.transactionLevel--;
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "commitTransaction", c_module, "");
                return false;
            }
        }

        public rollbackTransaction() {
            try {
                if (this.ocn !== null) {
                    if (this.otxn !== null) {
                        this.otxn.Rollback();
                    }
                }
                this.transactionLevel = 0;
            }
            catch (ex) {
                cError.mngError(ex, "rollbackTransaction", c_module, "");
            }
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            string data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            int data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            double data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            DateTime data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            string data,
                            string function,
                            string module,
                            string title,
                            eErrorLevel level)
        {
UNKNOWN >>             DbDataReader ors;

            data = "";

            if (pGetData(table, fieldId, id, field, ors,
                         function, module, title, level)) {
                if (ors.Read()) {
                    data = ors.GetString(0);
                }
                return true;
            }
            else return false; {
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            int data,
                            string function,
                            string module,
                            string title,
                            eErrorLevel level)
        {
UNKNOWN >>             DbDataReader ors;

            data = 0;

            if (pGetData(table, fieldId, id, field, ors,
                         function, module, title, level)) {
                if (ors.Read()) {
                    data = ors.GetInt32(0);
                }
                return true;
            }
            else return false; {
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            double data,
                            string function,
                            string module,
                            string title,
                            eErrorLevel level)
        {
UNKNOWN >>             DbDataReader ors;

            data = 0;

            if (pGetData(table, fieldId, id, field, ors,
                         function, module, title, level)) {
                if (ors.Read()) {
                    data = ors.GetDouble(0);
                }
                return true;
            }
            else return false; {
        }

        public getData(table: string) {
                            string fieldId,
                            string id,
                            string field,
                            DateTime data,
                            string function,
                            string module,
                            string title,
                            eErrorLevel level)
        {
UNKNOWN >>             DbDataReader ors;

            data = cConstants.C_NO_DATE;

            if (pGetData(table, fieldId, id, field, ors,
                         function, module, title, level)) {
                if (ors.Read()) {
                    data = ors.GetDateTime(0);
                }
                return true;
            }
            else return false; {
        }

        private pGetData(table: string) {
                              string fieldId,
                              string id,
                              string field,
                              DbDataReader ors,
                              string function,
                              string module,
                              string title,
                              eErrorLevel level)
        {
UNKNOWN >>             string sqlstmt;
            ors = null;
            sqlstmt = "select " + field + " from " + table + " where " + fieldId + " = " + id;

            return openRs(sqlstmt, ors, function, module, title, level);
        }

        public getNewId(table: string) {
                             string fieldId,
                             int id,
                             string function,
                             string module,
                             string title,
                             eErrorLevel level)
        {
            let mouseWait: cMouseWait = new cMouseWait();
            id = cConstants.C_NO_ID;
            try {
                if (pGetNewId(table, fieldId, id, false,
                               function, module, title, level)) {
                    return true;
                }
                else {
                    if (pReconnectTry()) {
                        return pGetNewId(table, fieldId, id, true,
                                         function, module, title, level);
                    }
                    else return false; {
                }
            }
            catch (ex) {
                cError.mngError(ex, "getNewId for " + module + "." + function, c_module, "");
                return false;
            }
UNKNOWN >>             finally
            {
                mouseWait.Dispose();
            }

        }

        private pGetNewId(table: string) {
                               string fieldId,
                               int id,
                               bool showError,
                               string function,
                               string module,
                               string title,
                               eErrorLevel level)
        {
            id = 0;
            try {

UNKNOWN >>                 string sqlstmt;
UNKNOWN >>                 DbDataReader ors;
UNKNOWN >>                 DbCommand ocmd;

                sqlstmt = "sp_dbgetnewid "
                                + sqlString(table) + ","
                                + sqlString(fieldId) + ",0";

                ocmd = createCommand(sqlstmt);
                ors = ocmd.ExecuteReader();
                if (ors.Read()) {
                    id = ors.GetInt32(0);
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (ex) {
                cError.mngError(ex, "pGetNewId for " + module + "." + function, c_module, "");
                return false;
            }
        }

        //------------------------------
        // sql statment parser functions

        public getSelect(sqlstmt: string) {
            let i: number = sqlstmt.ToUpper().IndexOf("FROM");
            if (i >= 0) {
                return sqlstmt.Substring(0, i).Trim();
            }
            else {
                return sqlstmt;
            }
        }

        public getFrom(sqlstmt: string) {
            let i: number = sqlstmt.ToUpper().IndexOf("FROM");
            if (i >= 0) {
                sqlstmt = sqlstmt.Substring(i);
                i = sqlstmt.ToUpper().IndexOf("WHERE");
                if (i >= 0) {
                    return sqlstmt.Substring(0, i).Trim();
                }
                else {
                    i = sqlstmt.ToUpper().IndexOf("GROUP BY");
                    if (i >= 0) {
                        return sqlstmt.Substring(0, i).Trim();
                    }
                    else {
                        i = sqlstmt.ToUpper().IndexOf("ORDER BY");
                        if (i >= 0) {
                            return sqlstmt.Substring(0, i).Trim();
                        }
                        else {
                            return sqlstmt;
                        }
                    }
                }
            }
            else {
                return "";
            }
        }

        public getWhere(sqlstmt: string) {
            let i: number = sqlstmt.ToUpper().IndexOf("WHERE");
            if (i >= 0) {
                sqlstmt = sqlstmt.Substring(i);
                i = sqlstmt.ToUpper().IndexOf("GROUP BY");
                if (i >= 0) {
                    return sqlstmt.Substring(0, i).Trim();
                }
                else {
                    i = sqlstmt.ToUpper().IndexOf("ORDER BY");
                    if (i >= 0) {
                        return sqlstmt.Substring(0, i).Trim();
                    }
                    else {
                        return sqlstmt;
                    }
                }
            }
            else {
                return "";
            }
        }

        public getGroup(sqlstmt: string) {
            let i: number = sqlstmt.ToUpper().IndexOf("GROUP BY");
            if (i >= 0) {
                sqlstmt = sqlstmt.Substring(i);
                i = sqlstmt.ToUpper().IndexOf("ORDER BY");
                if (i >= 0) {
                    return sqlstmt.Substring(0, i).Trim();
                }
                else {
                    return sqlstmt;
                }
            }
            else {
                return "";
            }
        }

        public getOrder(sqlstmt: string) {
            let i: number = sqlstmt.ToUpper().IndexOf("ORDER BY");
            if (i >= 0) {
                return sqlstmt.Substring(i).Trim();
            }
            else {
                return "";
            }
        }

        public getSearchSqlstmt(sqlstmt: string, toSearch: string) {
            try {
                let sqlSelect: string = getSelect(sqlstmt);
                let sqlFrom: string = getFrom(sqlstmt);
                let sqlWhere: string = getWhere(sqlstmt);
                let sqlGroup: string = getGroup(sqlstmt);
                let sqlOrder: string = getOrder(sqlstmt);
                let filter: string = "";

                toSearch = toSearch.Trim();

                if (toSearch !== "") {
                    if (sqlWhere === "") {
                        filter = " where (";
                    }
                    else {
                        filter = " and (";
                    }

                    let i: number = 1;
UNKNOWN >>                     string column;

                    column = pGetColumnFromStatement(sqlSelect, i);
                    while (column !== "") {
                        filter = filter + pGetStmtForColumn(column, toSearch, sqlSelect) + " or ";
                        i++;
                        column = pGetColumnFromStatement(sqlSelect, i);
                    }

                    //extrat last 'or' and put a parentheses
                    filter = filter.Substring(0, filter.Length - 3) + ")";
                }
                return sqlSelect + " " + sqlFrom + " " + sqlWhere + " " + filter + " " + sqlOrder + sqlGroup;
            }
            catch (ex) {
                cError.mngError(ex, "getSearchSqlstmt", c_module, "");
                return "";
            }
        }

        private pGetColumnFromStatement(sqlstmt: string, i: number) {
UNKNOWN >>             int k;
            let q: number = 0;
            for(var p = 1; p <= i; p++) {
                let h: number = sqlstmt.IndexOf("=", q, StringComparison.Ordinal);
                let r: number = sqlstmt.IndexOf(",", q, StringComparison.Ordinal);

                if (h < r) {
                    k = h;
                }
                else {
                    k = r;
                }

                if (k < 0) {

                    if (h > r) {
                        k = h;
                    }
                    else {
                        k = r;
                    }

                    if (k < 0) {
                        // if the index column where I am positioned is not lower than
                        // the index column required, the column required doesn't exists.
                        if (p < i) {
                            return "";
                        }

                        break;
                    }
                }
                if (p === i) {
                    sqlstmt = sqlstmt.Substring(0, k);
                }
                else {
                    if (k === h) {
                        if (r < 0) {
                            return "";
                        }
                        k = r;
                    }
                    sqlstmt = sqlstmt.Substring(k + 1);
                }
            }

            sqlstmt = sqlstmt.Trim();
            q = sqlstmt.Length - 1;
            let c: string = sqlstmt.Substring(q, 1);
            if (c === "]") {
                do {
                    c = sqlstmt.Substring(q, 1);
                    if (c === "[") {
                        break;
                    }
                    q--;
                } while (q >= 0);
            }
            else {
                do {
                    c = sqlstmt.Substring(q, 1);
                    if (c === " ") {
                        break;
                    }
                    q--;
                } while (q >= 0);
            }
            q = q < 0 ? 0 : q;
            let field: string = sqlstmt.Substring(q).ToLower();
            if (String.CompareOrdinal(field, "select") === 0
                || String.CompareOrdinal(field, "distinct") === 0) {
                return "";
            }
            else {
                return field.Trim();
            }
        }

        private pGetStmtForColumn(column: string, toSearch: string, sqlstmt: string) {
            let realName: string = pGetColNameFromColExpression(column, sqlstmt);
            return "charindex('" + toSearch + "', convert(varchar(4000)," + realName + ")) > 0";
        }

        private pGetColNameFromColExpression(column: string, sqlstmt: string) {
            let retval: string = "";
            let sep: string = "";
            let sqlSelect: string = "";
            let toSearch: string = "";

            sqlSelect = getSelect(sqlstmt).ToLower();
            toSearch = column.ToLower().Trim();

            let i: number = sqlSelect.IndexOf(toSearch);
            if (i >= 0) {
                retval = sqlSelect.Substring(i + toSearch.Length).Trim().Replace("'", " ").Trim();
                if (retval.Substring(0, 1) === "=") {
                    retval = retval.Substring(1);
                    sep = ",";
                    let q: number = retval.IndexOf(",");
                    let t: number = retval.IndexOf(" ");
                    if (q < 0) {
                        sep = " ";
                    }
                    else if (t >= 0) {
                        if (q > t) {
                            sep = " ";
                        }
                    }
                    let w: number = retval.IndexOf(sep);
                    if (w >= 0) {
                        retval = retval.Substring(0, w).Trim();
                    }
                }
                else {
                    retval = column;
                }
            }
            else {
                retval = column;
            }
            return retval;
        }

        private pReconnect() {
            closeDb();
            pConnect();
        }

        private pReconnectTry() {
            closeDb();
            try {
                pConnect();
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "pReconnectTry", c_module, "");
                return false;
            }
        }

        private pConnect() {
            this.ocn.ConnectionString = translateFromAdoIfNeeded(this.connect);
            this.ocn.Open();
        }

        public constructor(databaseEngine: csDatabaseEngine) {
            this.databaseEngine = databaseEngine;
        }

        private createConnection() {
            switch (this.databaseEngine)
            { 
                case csDatabaseEngine.SQL_SERVER:
                    return new SqlConnection();
                case csDatabaseEngine.POSTGRESQL:
                    throw new NotImplementedException();
                case csDatabaseEngine.ORACLE:
                    return new OracleConnection();
                case csDatabaseEngine.CSREPORT_WEB:
                    return new cJSONServerConnection();
            }
            throw new Exception("The database engine is not supported " + this.databaseEngine.ToString());
        }

        private createCommand(sqlstmt: string) {
            let ocmd: DbCommand = null;

            switch (this.databaseEngine)
            {
                case csDatabaseEngine.SQL_SERVER:
                    ocmd = new SqlCommand(sqlstmt, this.ocn as SqlConnection);
                    break;
                case csDatabaseEngine.POSTGRESQL:
                    throw new NotImplementedException();
                case csDatabaseEngine.ORACLE:
                    ocmd = new OracleCommand(sqlstmt, this.ocn as OracleConnection);
                    break;
                case csDatabaseEngine.CSREPORT_WEB:
                    ocmd = new cJSONCommand(sqlstmt, this.ocn as cJSONServerConnection);
                    break;
            }

            if(ocmd === null) {
                throw new Exception("The database engine is not supported " + this.databaseEngine.ToString());

            ocmd.CommandTimeout = this.commandTimeout;
            ocmd.CommandType = CommandType.Text;

            return ocmd;
        }

        /*

         * // .NET DataProvider -- Standard Connection with username and password

            SqlConnection conn = new SqlConnection();
            conn.ConnectionString =
            "Data Source=ServerName;" +
            "Initial Catalog=DataBaseName;" +
            "User id=UserName;" +
            "Password=Secret;";
            conn.Open();

         * // .NET DataProvider -- Trusted Connection
            SqlConnection conn = new SqlConnection();
            conn.ConnectionString =
            "Data Source=ServerName;" +
            "Initial Catalog=DataBaseName;" +
            "Integrated Security=SSPI;";
            conn.Open();

         * ADO
         * "Provider=SQLOLEDB.1;Integrated Security=SSPI;Persist Security Info=False;Initial Catalog=cairo;Data Source=daimaku;"
         * 
         */
        private translateFromAdoIfNeeded(strConnect: string) {
            if (this.databaseEngine === csDatabaseEngine.SQL_SERVER) {

                if (strConnect.IndexOf("Provider=") > -1) {
                    let dataSource: var = cUtil.getToken("Data Source", strConnect);
                    let initialCatalog: var = cUtil.getToken("Initial Catalog", strConnect);
                    let trusted: var = cUtil.getToken("Integrated Security", strConnect);
                    let userId: var = cUtil.getToken("User ID", strConnect);
                    let password: var = cUtil.getToken("Password", strConnect);
                    if (trusted === "SSPI") {
                        strConnect = String.Format("Data Source={0};Initial Catalog={1};Integrated Security=SSPI;", dataSource, initialCatalog);
                    }
                    else {
                        strConnect = String.Format("Data Source={0};Initial Catalog={1};User id={2};Password={3};", dataSource, initialCatalog, userId, password);
                    }
                }
            }
            return strConnect;
        }



    }    }





    public static class csDataBaseEngineStringConnections    export class csDataBaseEngineStringConnections {


    {
        public string: static CSREPORT_WEB = "CSREPORT_WEB";


    }    }





    public enum csDatabaseEngineUNKNOWN >>     public enum csDatabaseEngine
    { 
        SQL_SERVER = 1,
        POSTGRESQL = 2,
        ORACLE = 3,
        CSREPORT_WEB = 4


    }    }
}
