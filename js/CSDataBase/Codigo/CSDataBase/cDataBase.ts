(function(globalObject) {

// http://msdn.microsoft.com/en-us/library/8627sbea%28VS.71%29.aspx
//
// how to get a DataSet from an OracleDataReader
//
// http://msdn.microsoft.com/en-us/library/haa3afyz%28v=vs.71%29.aspx#Y1763
// public delegate void OpenRsProgress();

    globalObject.CSDataBase = globalObject.CSDataBase || {};


    globalObject.CSDataBase.createCDataBase = function() {

        const self = {};
        const c_module = "cDataBase";
        const c_ErrorSqlInfoAdd = "@@ErrorSqlInfoAdd@@";

        let m_ocn = null;
        let m_otxn = null;
        let m_connect = "";

        let m_ors = null;
        let m_eofField = false;
        let m_nextField = 0;
        let m_fieldType = null;

        let m_userId = 0;
        let m_transactionLevel = 0;

        let m_serverName = "";
        let m_userName = "";
        let m_password = "";

        let m_originalStrConnect = "";

        let m_openRsCancel = false;
        let m_openRsExDescript = "";

        let m_commandTimeout = 180;
        let m_connectionTimeout = 180;

        let m_maxTryOpenRs = 2;
        let m_maxTryExecute = 2;

        let m_lastDbError = "";

        let m_eof = false;

        let m_databaseEngine = csDatabaseEngine.SQL_SERVER;

//         public event OpenRsProgress openRsProgress;

UNKNOWN >>         public bool silent
        {
UNKNOWN >>             get { return cDatabaseGlobals.Silent; }
UNKNOWN >>             set { cDatabaseGlobals.Silent = value; }
        };

        self.setSilent = function(rhs) {
            cDatabaseGlobals.Silent = rhs;
        };

UNKNOWN >>         public bool dbIsOpen
        {
UNKNOWN >>             get
            {
                if (m_ocn === null) {
                    return false;
                }
                else {
                    return m_ocn.State === ConnectionState.Open;
                }
            }
        }

UNKNOWN >>         public int commandTimeout
        {
UNKNOWN >>             get { return m_commandTimeout; }
UNKNOWN >>             set { m_commandTimeout = value; }
        }

        self.setCommandTimeout = function(rhs) {
            m_commandTimeout = rhs;
        };

UNKNOWN >>         public int connectionTimeout
        {
UNKNOWN >>             get { return m_connectionTimeout; }
UNKNOWN >>             set { m_connectionTimeout = value; }
        }

        self.setConnectionTimeout = function(rhs) {
            m_connectionTimeout = rhs;
        };

UNKNOWN >>         public bool openRsCancel
        {
UNKNOWN >>             get { return m_openRsCancel; }
UNKNOWN >>             set { m_openRsCancel = value; }
        }

UNKNOWN >>         public string originalStrConnect
        {
UNKNOWN >>             get { return m_originalStrConnect; }
UNKNOWN >>             set { m_originalStrConnect = value; }
        }

UNKNOWN >>         public int userId
        {
UNKNOWN >>             get { return m_userId; }
UNKNOWN >>             set { m_userId = value; }
        }

UNKNOWN >>         public int transactionLevel
        {
UNKNOWN >>             get { return m_transactionLevel; }
        }

UNKNOWN >>         public DbDataReader ors
        {
UNKNOWN >>             set
            {
                m_ors = value;
                m_eofField = false;
                m_nextField = 0;
            }
        }

UNKNOWN >>         public bool eof
        {
UNKNOWN >>             get { return m_eof; }
        }

UNKNOWN >>         public bool eofField
        {
UNKNOWN >>             get { return m_eofField; }
        }

UNKNOWN >>         public CSOAPI.eServerVersion serverVersion
        {
UNKNOWN >>             get
            {
                let ver = "";
                ver = m_ocn.ServerVersion;

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
UNKNOWN >>             get { return m_fieldType; }
        }

UNKNOWN >>         public string strConnect
        {
UNKNOWN >>             get
            {
                if (m_ocn === null) {
                    return "";
                }
                else {
                    return m_ocn.ConnectionString;
                }
            }
        }

UNKNOWN >>         public string dbName
        {
UNKNOWN >>             get
            {
                if (m_ocn !== null) {
                    return m_ocn.Database;
                }
                else {
                    return "";
                }
            }
        }

UNKNOWN >>         public string serverName
        {
UNKNOWN >>             get { return m_serverName; }
        }

UNKNOWN >>         public string openRsExDescript
        {
UNKNOWN >>             get { return m_openRsExDescript; }
UNKNOWN >>             set { m_openRsExDescript = value; }
        }

        self.setOpenRsExDescript = function(rhs) {
            m_openRsExDescript = rhs;
        };

UNKNOWN >>         public int maxTryOpenRs
        {
UNKNOWN >>             get { return m_maxTryOpenRs; }
UNKNOWN >>             set { m_maxTryOpenRs = value; }
        }

UNKNOWN >>         public int maxTryExecute
        {
UNKNOWN >>             get { return m_maxTryExecute; }
UNKNOWN >>             set { m_maxTryExecute = value; }
        }

UNKNOWN >>         public string lastDbError
        {
UNKNOWN >>             get { return m_lastDbError; }
        }

UNKNOWN >>         public string password
        {
UNKNOWN >>             get { return m_password; }
        }

        self.saveSp = function(sqlstmt, ) {
                           DbDataReader ors)
        {
            return saveSp(sqlstmt, ors, -1, "", "", "Error", 0);
        };

        self.saveSp = function(sqlstmt, ) {
                           DbDataReader ors,
                           int timeout,
                           string function,
                           string module,
                           string title,
                           eErrorLevel level)
        {

            let oldCommandTimeout = m_commandTimeout;
            if (timeout !== -1) {
                m_commandTimeout = timeout;
            }
            let rtn = openRs(sqlstmt, ors, function, module, title, level);
            m_commandTimeout = oldCommandTimeout;
            return rtn;
        };

        // list of sql schema names
        // https://msdn.microsoft.com/en-us/library/ms254969(v=vs.110).aspx
        //
        // how to create restriction array
        // https://msdn.microsoft.com/en-us/library/ms136366(v=vs.110).aspx
        //
        self.openSchema = function() {
            return m_ocn.GetSchema();
        };

        self.openSchema = function(collectionName) {
            return m_ocn.GetSchema(collectionName);
        };

        self.openSchema = function(collectionName, restrinctionValues) {
            return m_ocn.GetSchema(collectionName, restrinctionValues);
        };

        self.initDb = function(connect) {
            return initDbEx("", "", "", "", connect, false);
        };

        self.initDb = function(nameDb, ) {
                           string server,
                           string user,
                           string password,
                           string connect)
        {
            return initDbEx(nameDb, server, user, password, connect, false);
        };

        self.initDbEx = function(nameDb, ) {
                             string server,
                             string user,
                             string password,
                             string connect,
                             bool useOleDb)
        {
            let mouseWait = new cMouseWait();
            try {
                closeDb();
                if (m_ocn === null) {
                    m_ocn = createConnection();
                }
                m_originalStrConnect = connect;
                if (connect === "") {
                    connect = string.Format("Data Source={0};User Id={1};Password={2};Integrated Security=no;",
                                            server,
                                            user,
                                            password);
                    m_serverName = server;
                    m_userName = user;
                    m_password = password;
                }
                else {
                    m_serverName = cUtil.getToken(connect, "Data Source=");
                    m_userName = cUtil.getToken(connect, "User=");
                    m_password = cUtil.getToken(connect, "Password=");
                }
                m_connect = connect;
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
        };

        self.addNew = function(dt, dr) {
            dr = null;
            try {
                dr = dt.NewRow();
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "addNew", c_module, "");
                return false;
            }
        };

        self.update = function(dr, dt, da) {
            try {
                dt.Rows.Add(dr);
                da.Update(dt);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "update", c_module, "");
                return false;
            }
        };

        self.delete = function(dr, dt, da) {
            try {
                dt.Rows.Remove(dr);
                da.Update(dt);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "delete", c_module, "");
                return false;
            }
        };

        self.openRsEx = function(showWindowCancel, ) {
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
        };

        self.loadDataTables = function(showWindowCancel, ) {
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
                let o = new DataTable();
                o.Load(ors);
                dt.Add(o);
                return true;
            }
            else {
                dt = null;
                return false;
            }
        };

        self.loadDataTable = function(showWindowCancel, ) {
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
        };

        self.openRsEx = function(showWindowCancel, ) {
                             bool raiseProgressEvent,
                             bool showModal,
                             string sqlstmt,
                             DbDataReader ors,
                             string function,
                             string module,
                             string title)
        {
            let cancelDialogShowed = false;
            let f = null;
            ors = null;
            try {
                // create a command to execute the query
                let cmd = new cOpenRsCommand();
                cmd.getExecuteCommand(this, sqlstmt);

                // execute in asynchronous mode
                cmd.execute();

                let seconds = 0;
                let queryCanceled = false;

                // wait until the query finish
                while (!cmd.done) {
                    // cancel dialog
                    if (showWindowCancel && seconds > 200) {
                        // show the cancel dialog
                        if (!cancelDialogShowed) {
                            f = new fCancelQuery();
                            if (m_openRsExDescript !== "") {
                                f.descript = "Getting data for: " + m_openRsExDescript;
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
        };

        self.asyncOpenRsEx = function(sqlstmt) {
            let ocmd = createCommand(sqlstmt);
            return ocmd.ExecuteReader(CommandBehavior.Default);
        };

        self.openRs = function(sqlstmt, ) {
                           DbDataReader ors,
                           string function,
                           string module,
                           string title,
                           eErrorLevel level)
        {
            let tryCount = 0;
            ors = null;

            while (tryCount < m_maxTryOpenRs) {
                if (pOpenRs(sqlstmt,
                            ors,
                            function,
                            module,
                            title,
                            level,
                            tryCount === m_maxTryOpenRs)) {
                    return true;
                }
            }
            return false;
        };

        const pOpenRs = function(sqlstmt, ) {
                             DbDataReader ors,
                             string function,
                             string module,
                             string title,
                             eErrorLevel level,
                             bool showError)
        {
            ors = null;
            try {
                let ocmd = createCommand(sqlstmt);
                ors = ocmd.ExecuteReader();
                return true;
            }
            catch (ex) {
                if (showError) {
                    cError.mngError(ex, "openRs for " + module + "." + function, c_module, "sentencia: " + sqlstmt);
                }
                return false;
            }
        };

        self.disconnectRecordset = function(sqlstmt, dt) {
            dt = null;
            try {
                let ocmd = createCommand(sqlstmt);
                let oda = new OracleDataAdapter(ocmd as OracleCommand);
                dt = new DataTable();
                oda.Fill(dt);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "disconnectRecordset", "", "sentencia: " + sqlstmt);
                return false;
            }
        };

        self.existsInRecordset = function(dt, ) {
                                      string field,
                                      string val,
                                      bool founded)
        {
            return existsInRecordset(dt, field, val, founded,
                                     "", "", "", eErrorLevel.eErrorInformation);
        };

        self.existsInRecordset = function(dt, ) {
                                      string field,
                                      string val,
                                      bool founded,
                                      string function,
                                      string module,
                                      string title,
                                      eErrorLevel level)
        {
            let filter = field + " = " + val;
            founded = false;

            try {
                if (dt.Rows.Count === 0) {
                    return false;
                }
                else {
                    let vdr = dt.Select(filter);
                    founded = vdr.Length > 0;
                    return true;
                }
            }
            catch (ex) {
                cError.mngError(ex, "existsInRecordset", module, "filter: " + filter);
                return false;
            }
        };

        self.existsInRecord = function(dr, ) {
                                   DataColumn[] columns,
                                   string val,
                                   bool founded)
        {
            return existsInRecord(dr, columns, val, founded,
                                  "", "", "", eErrorLevel.eErrorInformation);
        };

        self.existsInRecord = function(dr, ) {
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
        };

        self.existsInRecordEx = function(dr, ) {
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
        };

        const pExistsInRecord = function(dr, ) {
                                    DataColumn[] columns,
                                    string val,
                                    bool founded,
                                    bool like,
                                    string function,
                                    string module,
                                    string title,
                                    eErrorLevel level)
        {
            let filter = "";
            founded = false;
            val = val.ToLower();

            try {
                for(var i_ = 0; i_ < columns.length; i_++) {
                    let typeCode = System.Type.GetTypeCode(col.GetType()); ;
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
        };

        self.execute = function(sqlstmt) {
            return execute(sqlstmt, "", "", "", eErrorLevel.eErrorInformation);
        };

        self.execute = function(sqlstmt, ) {
                            string function,
                            string module,
                            string title,
                            eErrorLevel level)
        {
            let tryCount = 0;
            ors = null;

            while (tryCount < m_maxTryExecute) {
                if (pExecute(sqlstmt,
                             function,
                             module,
                             title,
                             level,
                             tryCount === m_maxTryExecute)) {
                    return true;
                }
            }
            return false;
        };

        const pExecute = function(sqlstmt, ) {
                              string function,
                              string module,
                              string title,
                              eErrorLevel level,
                              bool showError)
        {
            try {
                let ocmd = createCommand(sqlstmt);
                ocmd.ExecuteNonQuery();
                return true;
            }
            catch (ex) {
                if (showError) {
                    cError.mngError(ex, "pExecute for " + module + "." + function, c_module, "sentencia: " + sqlstmt);
                }
                return false;
            }
        };

        self.sqlString = function(val) {
            return "'" + val.Replace("'", "''") + "'";
        };

        self.sqlDate = function(val) {
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
        };

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
        self.sqlNumber = function(number) {
            if (!G.isNumeric(number)) {
                return "0";
            }
            else {
                let s = cUtil.val(number).ToString(new String('#', 27) + "0." + new String('#', 28), CultureInfo.InvariantCulture);
                s = s.Replace(",", ".");
                if (s.Substring(s.Length - 1, 0) === ".") {
                    s = s.Substring(0, s.Length - 1);
                }
                return s;
            }
        };

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

        self.closeDb = function() {
            try {
                if (m_transactionLevel > 0) {
                    rollbackTransaction();
                }
                m_transactionLevel = 0;
                m_userName = "";
                m_serverName = "";

                if (m_ocn !== null) {
                    if (m_ocn.State !== ConnectionState.Closed) {
                        m_ocn.Close();
                    }

                    m_ocn.Dispose();
                    m_ocn = null;
                }
                m_ocn = createConnection();
            }
            catch (ex) {
                cError.mngError(ex, "closeDb", c_module, "");
            }
        };

        self.beginTransaction = function() {
            try {
                if (m_transactionLevel <= 0) {
                    m_otxn = m_ocn.BeginTransaction();
                    m_transactionLevel = 1;
                }
                else {
                    m_transactionLevel++;
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "commitTransaction", c_module, "");
                return false;
            }
        };

        self.commitTransaction = function() {
            if (m_transactionLevel <= 0) {
                m_transactionLevel = 0;
                return false;
            }
            try {
                if (m_transactionLevel === 1) {
                    m_otxn.Commit();
                    m_transactionLevel = 0;
                }
                else {
                    m_transactionLevel--;
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "commitTransaction", c_module, "");
                return false;
            }
        };

        self.rollbackTransaction = function() {
            try {
                if (m_ocn !== null) {
                    if (m_otxn !== null) {
                        m_otxn.Rollback();
                    }
                }
                m_transactionLevel = 0;
            }
            catch (ex) {
                cError.mngError(ex, "rollbackTransaction", c_module, "");
            }
        };

        self.getData = function(table, ) {
                            string fieldId,
                            string id,
                            string field,
                            string data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        };

        self.getData = function(table, ) {
                            string fieldId,
                            string id,
                            string field,
                            int data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        };

        self.getData = function(table, ) {
                            string fieldId,
                            string id,
                            string field,
                            double data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        };

        self.getData = function(table, ) {
                            string fieldId,
                            string id,
                            string field,
                            DateTime data)
        {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation);
        };

        self.getData = function(table, ) {
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
        };

        self.getData = function(table, ) {
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
        };

        self.getData = function(table, ) {
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
        };

        self.getData = function(table, ) {
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
        };

        const pGetData = function(table, ) {
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
        };

        self.getNewId = function(table, ) {
                             string fieldId,
                             int id,
                             string function,
                             string module,
                             string title,
                             eErrorLevel level)
        {
            let mouseWait = new cMouseWait();
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

        };

        const pGetNewId = function(table, ) {
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
        };

        //------------------------------
        // sql statment parser functions

        self.getSelect = function(sqlstmt) {
            let i = sqlstmt.ToUpper().IndexOf("FROM");
            if (i >= 0) {
                return sqlstmt.Substring(0, i).Trim();
            }
            else {
                return sqlstmt;
            }
        };

        self.getFrom = function(sqlstmt) {
            let i = sqlstmt.ToUpper().IndexOf("FROM");
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
        };

        self.getWhere = function(sqlstmt) {
            let i = sqlstmt.ToUpper().IndexOf("WHERE");
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
        };

        self.getGroup = function(sqlstmt) {
            let i = sqlstmt.ToUpper().IndexOf("GROUP BY");
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
        };

        self.getOrder = function(sqlstmt) {
            let i = sqlstmt.ToUpper().IndexOf("ORDER BY");
            if (i >= 0) {
                return sqlstmt.Substring(i).Trim();
            }
            else {
                return "";
            }
        };

        self.getSearchSqlstmt = function(sqlstmt, toSearch) {
            try {
                let sqlSelect = getSelect(sqlstmt);
                let sqlFrom = getFrom(sqlstmt);
                let sqlWhere = getWhere(sqlstmt);
                let sqlGroup = getGroup(sqlstmt);
                let sqlOrder = getOrder(sqlstmt);
                let filter = "";

                toSearch = toSearch.Trim();

                if (toSearch !== "") {
                    if (sqlWhere === "") {
                        filter = " where (";
                    }
                    else {
                        filter = " and (";
                    }

                    let i = 1;
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
        };

        const pGetColumnFromStatement = function(sqlstmt, i) {
UNKNOWN >>             int k;
            let q = 0;
            for(var p = 1; p <= i; p++) {
                let h = sqlstmt.IndexOf("=", q, StringComparison.Ordinal);
                let r = sqlstmt.IndexOf(",", q, StringComparison.Ordinal);

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
            let c = sqlstmt.Substring(q, 1);
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
            let field = sqlstmt.Substring(q).ToLower();
            if (String.CompareOrdinal(field, "select") === 0
                || String.CompareOrdinal(field, "distinct") === 0) {
                return "";
            }
            else {
                return field.Trim();
            }
        };

        const pGetStmtForColumn = function(column, toSearch, sqlstmt) {
            let realName = pGetColNameFromColExpression(column, sqlstmt);
            return "charindex('" + toSearch + "', convert(varchar(4000)," + realName + ")) > 0";
        };

        const pGetColNameFromColExpression = function(column, sqlstmt) {
            let retval = "";
            let sep = "";
            let sqlSelect = "";
            let toSearch = "";

            sqlSelect = getSelect(sqlstmt).ToLower();
            toSearch = column.ToLower().Trim();

            let i = sqlSelect.IndexOf(toSearch);
            if (i >= 0) {
                retval = sqlSelect.Substring(i + toSearch.Length).Trim().Replace("'", " ").Trim();
                if (retval.Substring(0, 1) === "=") {
                    retval = retval.Substring(1);
                    sep = ",";
                    let q = retval.IndexOf(",");
                    let t = retval.IndexOf(" ");
                    if (q < 0) {
                        sep = " ";
                    }
                    else if (t >= 0) {
                        if (q > t) {
                            sep = " ";
                        }
                    }
                    let w = retval.IndexOf(sep);
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
        };

        const pReconnect = function() {
            closeDb();
            pConnect();
        };

        const pReconnectTry = function() {
            closeDb();
            try {
                pConnect();
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "pReconnectTry", c_module, "");
                return false;
            }
        };

        const pConnect = function() {
            m_ocn.ConnectionString = translateFromAdoIfNeeded(m_connect);
            m_ocn.Open();
        };

        const cDataBase = function(databaseEngine) {
            m_databaseEngine = databaseEngine;
        };

        const createConnection = function() {
            switch (m_databaseEngine)
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
            throw new Exception("The database engine is not supported " + m_databaseEngine.ToString());
        };

        const createCommand = function(sqlstmt) {
            let ocmd = null;

            switch (m_databaseEngine)
            {
                case csDatabaseEngine.SQL_SERVER:
                    ocmd = new SqlCommand(sqlstmt, m_ocn as SqlConnection);
                    break;
                case csDatabaseEngine.POSTGRESQL:
                    throw new NotImplementedException();
                case csDatabaseEngine.ORACLE:
                    ocmd = new OracleCommand(sqlstmt, m_ocn as OracleConnection);
                    break;
                case csDatabaseEngine.CSREPORT_WEB:
                    ocmd = new cJSONCommand(sqlstmt, m_ocn as cJSONServerConnection);
                    break;
            }

            if(ocmd === null) {
                throw new Exception("The database engine is not supported " + m_databaseEngine.ToString());

            ocmd.CommandTimeout = m_commandTimeout;
            ocmd.CommandType = CommandType.Text;

            return ocmd;
        };

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
        const translateFromAdoIfNeeded = function(strConnect) {
            if (m_databaseEngine === csDatabaseEngine.SQL_SERVER) {

                if (strConnect.IndexOf("Provider=") > -1) {
                    let dataSource = cUtil.getToken("Data Source", strConnect);
                    let initialCatalog = cUtil.getToken("Initial Catalog", strConnect);
                    let trusted = cUtil.getToken("Integrated Security", strConnect);
                    let userId = cUtil.getToken("User ID", strConnect);
                    let password = cUtil.getToken("Password", strConnect);
                    if (trusted === "SSPI") {
                        strConnect = String.Format("Data Source={0};Initial Catalog={1};Integrated Security=SSPI;", dataSource, initialCatalog);
                    }
                    else {
                        strConnect = String.Format("Data Source={0};Initial Catalog={1};User id={2};Password={3};", dataSource, initialCatalog, userId, password);
                    }
                }
            }
            return strConnect;
        };

        return self;

    }

        self.create = function() {

            const self = {};
        self.string CSREPORT_WEB = "CSREPORT_WEB";
        return self;

    }

UNKNOWN >>         return self;

    public enum csDatabaseEngine
    { 
        SQL_SERVER = 1,
        POSTGRESQL = 2,
        ORACLE = 3,
        CSREPORT_WEB = 4
        return self;

    }
}(globalObject));
