(function(globalObject) {

// http://msdn.microsoft.com/en-us/library/8627sbea%28VS.71%29.aspx
//
// how to get a DataSet from an OracleDataReader
//
// http://msdn.microsoft.com/en-us/library/haa3afyz%28v=vs.71%29.aspx#Y1763
// public delegate void OpenRsProgress(); //@@@: public delegate void OpenRsProgress();

    globalObject.CSDataBase = globalObject.CSDataBase || {}; //@@@: namespace CSDataBase
 //@@@: {

    globalObject.CSDataBase.createCDataBase = function() {

        const self = {}; //@@@: public class cDataBase
        const c_module = "cDataBase"; //@@@: private const string c_module = "cDataBase";
        const c_ErrorSqlInfoAdd = "@@ErrorSqlInfoAdd@@"; //@@@: private const string c_ErrorSqlInfoAdd = "@@ErrorSqlInfoAdd@@";

        let m_ocn = null; //@@@: private DbConnection m_ocn = null;
        let m_otxn = null; //@@@: private DbTransaction m_otxn = null;
        let m_connect = ""; //@@@: private string m_connect = "";

        let m_ors = null; //@@@: private DbDataReader m_ors = null;
        let m_eofField = false; //@@@: private bool m_eofField = false;
        let m_nextField = 0; //@@@: private int m_nextField = 0;
        let m_fieldType = null; //@@@: private eFieldType m_fieldType;

        let m_userId = 0; //@@@: private int m_userId = 0;
        let m_transactionLevel = 0; //@@@: private int m_transactionLevel = 0;

        let m_serverName = ""; //@@@: private string m_serverName = "";
        let m_userName = ""; //@@@: private string m_userName = "";
        let m_password = ""; //@@@: private string m_password = "";

        let m_originalStrConnect = ""; //@@@: private string m_originalStrConnect = "";

        let m_openRsCancel = false; //@@@: private bool m_openRsCancel = false;
        let m_openRsExDescript = ""; //@@@: private string m_openRsExDescript = "";

        let m_commandTimeout = 180; //@@@: private int m_commandTimeout = 180;
        let m_connectionTimeout = 180; //@@@: private int m_connectionTimeout = 180;

        let m_maxTryOpenRs = 2; //@@@: private int m_maxTryOpenRs = 2;
        let m_maxTryExecute = 2; //@@@: private int m_maxTryExecute = 2;

        let m_lastDbError = ""; //@@@: private string m_lastDbError = "";

        let m_eof = false; //@@@: private bool m_eof = false;

        let m_databaseEngine = csDatabaseEngine.SQL_SERVER; //@@@: private csDatabaseEngine m_databaseEngine = csDatabaseEngine.SQL_SERVER;

//         public event OpenRsProgress openRsProgress; //@@@: public event OpenRsProgress openRsProgress;

UNKNOWN >>         public bool silent //@@@: public bool silent
        { //@@@: {
UNKNOWN >>             get { return cDatabaseGlobals.Silent; } //@@@: get { return cDatabaseGlobals.Silent; }
UNKNOWN >>             set { cDatabaseGlobals.Silent = value; } //@@@: set { cDatabaseGlobals.Silent = value; }
        }; //@@@: }

        self.setSilent = function(rhs) { //@@@: public void setSilent(Boolean rhs)
            cDatabaseGlobals.Silent = rhs; //@@@: cDatabaseGlobals.Silent = rhs;
        }; //@@@: }

UNKNOWN >>         public bool dbIsOpen //@@@: public bool dbIsOpen
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                if (m_ocn === null) { //@@@: if (m_ocn == null)
                    return false; //@@@: return false;
                } //@@@: }
                else { //@@@: else
                    return m_ocn.State === ConnectionState.Open; //@@@: return m_ocn.State == ConnectionState.Open;
                } //@@@: }
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public int commandTimeout //@@@: public int commandTimeout
        { //@@@: {
UNKNOWN >>             get { return m_commandTimeout; } //@@@: get { return m_commandTimeout; }
UNKNOWN >>             set { m_commandTimeout = value; } //@@@: set { m_commandTimeout = value; }
        } //@@@: }

        self.setCommandTimeout = function(rhs) { //@@@: public void setCommandTimeout(int rhs)
            m_commandTimeout = rhs; //@@@: m_commandTimeout = rhs;
        }; //@@@: }

UNKNOWN >>         public int connectionTimeout //@@@: public int connectionTimeout
        { //@@@: {
UNKNOWN >>             get { return m_connectionTimeout; } //@@@: get { return m_connectionTimeout; }
UNKNOWN >>             set { m_connectionTimeout = value; } //@@@: set { m_connectionTimeout = value; }
        } //@@@: }

        self.setConnectionTimeout = function(rhs) { //@@@: public void setConnectionTimeout(int rhs)
            m_connectionTimeout = rhs; //@@@: m_connectionTimeout = rhs;
        }; //@@@: }

UNKNOWN >>         public bool openRsCancel //@@@: public bool openRsCancel
        { //@@@: {
UNKNOWN >>             get { return m_openRsCancel; } //@@@: get { return m_openRsCancel; }
UNKNOWN >>             set { m_openRsCancel = value; } //@@@: set { m_openRsCancel = value; }
        } //@@@: }

UNKNOWN >>         public string originalStrConnect //@@@: public string originalStrConnect
        { //@@@: {
UNKNOWN >>             get { return m_originalStrConnect; } //@@@: get { return m_originalStrConnect; }
UNKNOWN >>             set { m_originalStrConnect = value; } //@@@: set { m_originalStrConnect = value; }
        } //@@@: }

UNKNOWN >>         public int userId //@@@: public int userId
        { //@@@: {
UNKNOWN >>             get { return m_userId; } //@@@: get { return m_userId; }
UNKNOWN >>             set { m_userId = value; } //@@@: set { m_userId = value; }
        } //@@@: }

UNKNOWN >>         public int transactionLevel //@@@: public int transactionLevel
        { //@@@: {
UNKNOWN >>             get { return m_transactionLevel; } //@@@: get { return m_transactionLevel; }
        } //@@@: }

UNKNOWN >>         public DbDataReader ors //@@@: public DbDataReader ors
        { //@@@: {
UNKNOWN >>             set //@@@: set
            { //@@@: {
                m_ors = value; //@@@: m_ors = value;
                m_eofField = false; //@@@: m_eofField = false;
                m_nextField = 0; //@@@: m_nextField = 0;
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public bool eof //@@@: public bool eof
        { //@@@: {
UNKNOWN >>             get { return m_eof; } //@@@: get { return m_eof; }
        } //@@@: }

UNKNOWN >>         public bool eofField //@@@: public bool eofField
        { //@@@: {
UNKNOWN >>             get { return m_eofField; } //@@@: get { return m_eofField; }
        } //@@@: }

UNKNOWN >>         public CSOAPI.eServerVersion serverVersion //@@@: public CSOAPI.eServerVersion serverVersion
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                let ver = ""; //@@@: string ver = "";
                ver = m_ocn.ServerVersion; //@@@: ver = m_ocn.ServerVersion;

                // TODO: this code is for sql server and the "Access if" don't work
                //       in this version
                //       when it runs we'll have to put the oracle numbers here
                if (ver === "06") { //@@@: if (ver == "06")
                    return CSOAPI.eServerVersion.eVSql65; //@@@: return CSOAPI.eServerVersion.eVSql65;
                } //@@@: }
                else if (ver === "07") { //@@@: else if (ver == "07")
                    return CSOAPI.eServerVersion.eVSql70; //@@@: return CSOAPI.eServerVersion.eVSql70;
                } //@@@: }
                else if (ver === "03") { //@@@: else if (ver == "03")
                    return CSOAPI.eServerVersion.eVSAccess; //@@@: return CSOAPI.eServerVersion.eVSAccess;
                } //@@@: }
                else { //@@@: else
                    return CSOAPI.eServerVersion.eVSUnknown; //@@@: return CSOAPI.eServerVersion.eVSUnknown;
                } //@@@: }
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public eFieldType fieldType //@@@: public eFieldType fieldType
        { //@@@: {
UNKNOWN >>             get { return m_fieldType; } //@@@: get { return m_fieldType; }
        } //@@@: }

UNKNOWN >>         public string strConnect //@@@: public string strConnect
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                if (m_ocn === null) { //@@@: if (m_ocn == null)
                    return ""; //@@@: return "";
                } //@@@: }
                else { //@@@: else
                    return m_ocn.ConnectionString; //@@@: return m_ocn.ConnectionString;
                } //@@@: }
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public string dbName //@@@: public string dbName
        { //@@@: {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                if (m_ocn !== null) { //@@@: if (m_ocn != null)
                    return m_ocn.Database; //@@@: return m_ocn.Database;
                } //@@@: }
                else { //@@@: else
                    return ""; //@@@: return "";
                } //@@@: }
            } //@@@: }
        } //@@@: }

UNKNOWN >>         public string serverName //@@@: public string serverName
        { //@@@: {
UNKNOWN >>             get { return m_serverName; } //@@@: get { return m_serverName; }
        } //@@@: }

UNKNOWN >>         public string openRsExDescript //@@@: public string openRsExDescript
        { //@@@: {
UNKNOWN >>             get { return m_openRsExDescript; } //@@@: get { return m_openRsExDescript; }
UNKNOWN >>             set { m_openRsExDescript = value; } //@@@: set { m_openRsExDescript = value; }
        } //@@@: }

        self.setOpenRsExDescript = function(rhs) { //@@@: public void setOpenRsExDescript(String rhs)
            m_openRsExDescript = rhs; //@@@: m_openRsExDescript = rhs;
        }; //@@@: }

UNKNOWN >>         public int maxTryOpenRs //@@@: public int maxTryOpenRs
        { //@@@: {
UNKNOWN >>             get { return m_maxTryOpenRs; } //@@@: get { return m_maxTryOpenRs; }
UNKNOWN >>             set { m_maxTryOpenRs = value; } //@@@: set { m_maxTryOpenRs = value; }
        } //@@@: }

UNKNOWN >>         public int maxTryExecute //@@@: public int maxTryExecute
        { //@@@: {
UNKNOWN >>             get { return m_maxTryExecute; } //@@@: get { return m_maxTryExecute; }
UNKNOWN >>             set { m_maxTryExecute = value; } //@@@: set { m_maxTryExecute = value; }
        } //@@@: }

UNKNOWN >>         public string lastDbError //@@@: public string lastDbError
        { //@@@: {
UNKNOWN >>             get { return m_lastDbError; } //@@@: get { return m_lastDbError; }
        } //@@@: }

UNKNOWN >>         public string password //@@@: public string password
        { //@@@: {
UNKNOWN >>             get { return m_password; } //@@@: get { return m_password; }
        } //@@@: }

        self.saveSp = function(sqlstmt, ) { //@@@: public bool saveSp(string sqlstmt,
                           DbDataReader ors) //@@@: out DbDataReader ors)
        { //@@@: {
            return saveSp(sqlstmt, ors, -1, "", "", "Error", 0); //@@@: return saveSp(sqlstmt, out ors, -1, "", "", "Error", 0);
        }; //@@@: }

        self.saveSp = function(sqlstmt, ) { //@@@: public bool saveSp(string sqlstmt,
                           DbDataReader ors, //@@@: out DbDataReader ors,
                           int timeout, //@@@: int timeout,
                           string function, //@@@: string function,
                           string module, //@@@: string module,
                           string title, //@@@: string title,
                           eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {

            let oldCommandTimeout = m_commandTimeout; //@@@: int oldCommandTimeout = m_commandTimeout;
            if (timeout !== -1) { //@@@: if (timeout != -1)
                m_commandTimeout = timeout; //@@@: m_commandTimeout = timeout;
            } //@@@: }
            let rtn = openRs(sqlstmt, ors, function, module, title, level); //@@@: bool rtn = openRs(sqlstmt, out ors, function, module, title, level);
            m_commandTimeout = oldCommandTimeout; //@@@: m_commandTimeout = oldCommandTimeout;
            return rtn; //@@@: return rtn;
        }; //@@@: }

        // list of sql schema names
        // https://msdn.microsoft.com/en-us/library/ms254969(v=vs.110).aspx
        //
        // how to create restriction array
        // https://msdn.microsoft.com/en-us/library/ms136366(v=vs.110).aspx
        //
        self.openSchema = function() { //@@@: public DataTable openSchema()
            return m_ocn.GetSchema(); //@@@: return m_ocn.GetSchema();
        }; //@@@: }

        self.openSchema = function(collectionName) { //@@@: public DataTable openSchema(string collectionName)
            return m_ocn.GetSchema(collectionName); //@@@: return m_ocn.GetSchema(collectionName);
        }; //@@@: }

        self.openSchema = function(collectionName, restrinctionValues) { //@@@: public DataTable openSchema(string collectionName, string[] restrinctionValues)
            return m_ocn.GetSchema(collectionName, restrinctionValues); //@@@: return m_ocn.GetSchema(collectionName, restrinctionValues);
        }; //@@@: }

        self.initDb = function(connect) { //@@@: public bool initDb(string connect)
            return initDbEx("", "", "", "", connect, false); //@@@: return initDbEx("", "", "", "", connect, false);
        }; //@@@: }

        self.initDb = function(nameDb, ) { //@@@: public bool initDb(string nameDb,
                           string server, //@@@: string server,
                           string user, //@@@: string user,
                           string password, //@@@: string password,
                           string connect) //@@@: string connect)
        { //@@@: {
            return initDbEx(nameDb, server, user, password, connect, false); //@@@: return initDbEx(nameDb, server, user, password, connect, false);
        }; //@@@: }

        self.initDbEx = function(nameDb, ) { //@@@: public bool initDbEx(string nameDb,
                             string server, //@@@: string server,
                             string user, //@@@: string user,
                             string password, //@@@: string password,
                             string connect, //@@@: string connect,
                             bool useOleDb) //@@@: bool useOleDb)
        { //@@@: {
            let mouseWait = new cMouseWait(); //@@@: cMouseWait mouseWait = new cMouseWait();
            try { //@@@: try
                closeDb(); //@@@: closeDb();
                if (m_ocn === null) { //@@@: if (m_ocn == null)
                    m_ocn = createConnection(); //@@@: m_ocn = createConnection();
                } //@@@: }
                m_originalStrConnect = connect; //@@@: m_originalStrConnect = connect;
                if (connect === "") { //@@@: if (connect == "")
                    connect = string.Format("Data Source={0};User Id={1};Password={2};Integrated Security=no;", //@@@: connect = string.Format("Data Source={0};User Id={1};Password={2};Integrated Security=no;",
                                            server, //@@@: server,
                                            user, //@@@: user,
                                            password); //@@@: password);
                    m_serverName = server; //@@@: m_serverName = server;
                    m_userName = user; //@@@: m_userName = user;
                    m_password = password; //@@@: m_password = password;
                } //@@@: }
                else { //@@@: else
                    m_serverName = cUtil.getToken(connect, "Data Source="); //@@@: m_serverName = cUtil.getToken(connect, "Data Source=");
                    m_userName = cUtil.getToken(connect, "User="); //@@@: m_userName = cUtil.getToken(connect, "User=");
                    m_password = cUtil.getToken(connect, "Password="); //@@@: m_password = cUtil.getToken(connect, "Password=");
                } //@@@: }
                m_connect = connect; //@@@: m_connect = connect;
                pConnect(); //@@@: pConnect();
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "initDbEx", c_module, ""); //@@@: cError.mngError(ex, "initDbEx", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                mouseWait.Dispose(); //@@@: mouseWait.Dispose();
            } //@@@: }
        }; //@@@: }

        self.addNew = function(dt, dr) { //@@@: public bool addNew(DataTable dt, out DataRow dr)
            dr = null; //@@@: dr = null;
            try { //@@@: try
                dr = dt.NewRow(); //@@@: dr = dt.NewRow();
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "addNew", c_module, ""); //@@@: cError.mngError(ex, "addNew", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.update = function(dr, dt, da) { //@@@: public bool update(DataRow dr, DataTable dt, DbDataAdapter da)
            try { //@@@: try
                dt.Rows.Add(dr); //@@@: dt.Rows.Add(dr);
                da.Update(dt); //@@@: da.Update(dt);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "update", c_module, ""); //@@@: cError.mngError(ex, "update", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.delete = function(dr, dt, da) { //@@@: public bool delete(DataRow dr, DataTable dt, DbDataAdapter da)
            try { //@@@: try
                dt.Rows.Remove(dr); //@@@: dt.Rows.Remove(dr);
                da.Update(dt); //@@@: da.Update(dt);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "delete", c_module, ""); //@@@: cError.mngError(ex, "delete", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.openRsEx = function(showWindowCancel, ) { //@@@: public bool openRsEx(bool showWindowCancel,
                             bool raiseProgressEvent, //@@@: bool raiseProgressEvent,
                             bool showModal, //@@@: bool showModal,
                             string sqlstmt, //@@@: string sqlstmt,
                             DbDataReader ors) //@@@: out DbDataReader ors)
        { //@@@: {
            return openRsEx(showWindowCancel, //@@@: return openRsEx(showWindowCancel,
                            raiseProgressEvent, //@@@: raiseProgressEvent,
                            showModal, //@@@: showModal,
                            sqlstmt, //@@@: sqlstmt,
                            ors, //@@@: out ors,
                            "", //@@@: "",
                            "", //@@@: "",
                            ""); //@@@: "");
        }; //@@@: }

        self.loadDataTables = function(showWindowCancel, ) { //@@@: public bool loadDataTables(bool showWindowCancel,
                                     bool raiseProgressEvent, //@@@: bool raiseProgressEvent,
                                     bool showModal, //@@@: bool showModal,
                                     string sqlstmt, //@@@: string sqlstmt,
                                     List<DataTable> dt, //@@@: out List<DataTable> dt,
                                     string function, //@@@: string function,
                                     string module, //@@@: string module,
                                     string title) //@@@: string title)
        { //@@@: {
UNKNOWN >>             DbDataReader ors; //@@@: DbDataReader ors;
            if (openRsEx(showWindowCancel, //@@@: if (openRsEx(showWindowCancel,
                            raiseProgressEvent, //@@@: raiseProgressEvent,
                            showModal, //@@@: showModal,
                            sqlstmt, //@@@: sqlstmt,
                            ors, //@@@: out ors,
                            function, //@@@: function,
                            module, //@@@: module,
                            title)) { //@@@: title))
                dt = new List(); //@@@: dt = new List<DataTable>();
                let o = new DataTable(); //@@@: var o = new DataTable();
                o.Load(ors); //@@@: o.Load(ors);
                dt.Add(o); //@@@: dt.Add(o);
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                dt = null; //@@@: dt = null;
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.loadDataTable = function(showWindowCancel, ) { //@@@: public bool loadDataTable(bool showWindowCancel,
                                     bool raiseProgressEvent, //@@@: bool raiseProgressEvent,
                                     bool showModal, //@@@: bool showModal,
                                     string sqlstmt, //@@@: string sqlstmt,
                                     DataTable dt, //@@@: out DataTable dt,
                                     DbDataReader dr, //@@@: out DbDataReader dr,
                                     string function, //@@@: string function,
                                     string module, //@@@: string module,
                                     string title) //@@@: string title)
        { //@@@: {
UNKNOWN >>             DbDataReader ors; //@@@: DbDataReader ors;
            if (openRsEx(showWindowCancel, //@@@: if (openRsEx(showWindowCancel,
                            raiseProgressEvent, //@@@: raiseProgressEvent,
                            showModal, //@@@: showModal,
                            sqlstmt, //@@@: sqlstmt,
                            ors, //@@@: out ors,
                            function, //@@@: function,
                            module, //@@@: module,
                            title)) { //@@@: title))
                dr = ors; //@@@: dr = ors;
                dt = new DataTable(); //@@@: dt = new DataTable();
                dt.Load(ors); //@@@: dt.Load(ors);
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                dt = null; //@@@: dt = null;
                dr = null; //@@@: dr = null;
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.openRsEx = function(showWindowCancel, ) { //@@@: public bool openRsEx(bool showWindowCancel,
                             bool raiseProgressEvent, //@@@: bool raiseProgressEvent,
                             bool showModal, //@@@: bool showModal,
                             string sqlstmt, //@@@: string sqlstmt,
                             DbDataReader ors, //@@@: out DbDataReader ors,
                             string function, //@@@: string function,
                             string module, //@@@: string module,
                             string title) //@@@: string title)
        { //@@@: {
            let cancelDialogShowed = false; //@@@: bool cancelDialogShowed = false;
            let f = null; //@@@: fCancelQuery f = null;
            ors = null; //@@@: ors = null;
            try { //@@@: try
                // create a command to execute the query
                let cmd = new cOpenRsCommand(); //@@@: cOpenRsCommand cmd = new cOpenRsCommand();
                cmd.getExecuteCommand(this, sqlstmt); //@@@: cmd.getExecuteCommand(this, sqlstmt);

                // execute in asynchronous mode
                cmd.execute(); //@@@: cmd.execute();

                let seconds = 0; //@@@: int seconds = 0;
                let queryCanceled = false; //@@@: bool queryCanceled = false;

                // wait until the query finish
                while (!cmd.done) { //@@@: while (!cmd.done)
                    // cancel dialog
                    if (showWindowCancel && seconds > 200) { //@@@: if (showWindowCancel && seconds > 200)
                        // show the cancel dialog
                        if (!cancelDialogShowed) { //@@@: if (!cancelDialogShowed)
                            f = new fCancelQuery(); //@@@: f = new fCancelQuery();
                            if (m_openRsExDescript !== "") { //@@@: if (m_openRsExDescript != "")
                                f.descript = "Getting data for: " + m_openRsExDescript; //@@@: f.descript = "Getting data for: " + m_openRsExDescript;
                            } //@@@: }
                            f.Show(); //@@@: f.Show();
                            cancelDialogShowed = true; //@@@: cancelDialogShowed = true;
                        } //@@@: }
                    } //@@@: }

                    // events
                    if (raiseProgressEvent) { //@@@: if (raiseProgressEvent)
                        if (openRsProgress !== null) { //@@@: if (openRsProgress != null)
                            openRsProgress(); //@@@: openRsProgress();
                        } //@@@: }
                    } //@@@: }

					if (showWindowCancel) Application.DoEvents(); { //@@@: if (showWindowCancel) Application.DoEvents();

                    if (cancelDialogShowed) { //@@@: if (cancelDialogShowed)
                        if (f.cancel) { //@@@: if (f.cancel)
                            queryCanceled = true; //@@@: queryCanceled = true;
                            break; //@@@: break;
                        } //@@@: }
                    } //@@@: }
                    System.Threading.Thread.Sleep(100); //@@@: System.Threading.Thread.Sleep(100);
                    seconds += 100; //@@@: seconds += 100;
                } //@@@: }
                // hide cancel dialog
                if (showWindowCancel && cancelDialogShowed) { //@@@: if (showWindowCancel && cancelDialogShowed)
                    f.Hide(); //@@@: f.Hide();
                } //@@@: }

                if (queryCanceled) { //@@@: if (queryCanceled)
                    pReconnect(); //@@@: pReconnect();
                    return false; //@@@: return false;
                } //@@@: }
                else { //@@@: else
                    ors = cmd.ors; //@@@: ors = cmd.ors;
                    return cmd.success; //@@@: return cmd.success;
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "openRsEx", c_module, ""); //@@@: cError.mngError(ex, "openRsEx", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                f = null; //@@@: f = null;
            } //@@@: }
        }; //@@@: }

        self.asyncOpenRsEx = function(sqlstmt) { //@@@: public DbDataReader asyncOpenRsEx(string sqlstmt)
            let ocmd = createCommand(sqlstmt); //@@@: DbCommand ocmd = createCommand(sqlstmt);
            return ocmd.ExecuteReader(CommandBehavior.Default); //@@@: return ocmd.ExecuteReader(CommandBehavior.Default);
        }; //@@@: }

        self.openRs = function(sqlstmt, ) { //@@@: public bool openRs(string sqlstmt,
                           DbDataReader ors, //@@@: out DbDataReader ors,
                           string function, //@@@: string function,
                           string module, //@@@: string module,
                           string title, //@@@: string title,
                           eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            let tryCount = 0; //@@@: int tryCount = 0;
            ors = null; //@@@: ors = null;

            while (tryCount < m_maxTryOpenRs) { //@@@: while (tryCount < m_maxTryOpenRs)
                if (pOpenRs(sqlstmt, //@@@: if (pOpenRs(sqlstmt,
                            ors, //@@@: out ors,
                            function, //@@@: function,
                            module, //@@@: module,
                            title, //@@@: title,
                            level, //@@@: level,
                            tryCount === m_maxTryOpenRs)) { //@@@: tryCount == m_maxTryOpenRs))
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pOpenRs = function(sqlstmt, ) { //@@@: private bool pOpenRs(string sqlstmt,
                             DbDataReader ors, //@@@: out DbDataReader ors,
                             string function, //@@@: string function,
                             string module, //@@@: string module,
                             string title, //@@@: string title,
                             eErrorLevel level, //@@@: eErrorLevel level,
                             bool showError) //@@@: bool showError)
        { //@@@: {
            ors = null; //@@@: ors = null;
            try { //@@@: try
                let ocmd = createCommand(sqlstmt); //@@@: DbCommand ocmd = createCommand(sqlstmt);
                ors = ocmd.ExecuteReader(); //@@@: ors = ocmd.ExecuteReader();
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                if (showError) { //@@@: if (showError)
                    cError.mngError(ex, "openRs for " + module + "." + function, c_module, "sentencia: " + sqlstmt); //@@@: cError.mngError(ex, "openRs for " + module + "." + function, c_module, "sentencia: " + sqlstmt);
                } //@@@: }
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.disconnectRecordset = function(sqlstmt, dt) { //@@@: public bool disconnectRecordset(string sqlstmt, out DataTable dt)
            dt = null; //@@@: dt = null;
            try { //@@@: try
                let ocmd = createCommand(sqlstmt); //@@@: DbCommand ocmd = createCommand(sqlstmt);
                let oda = new OracleDataAdapter(ocmd as OracleCommand); //@@@: DbDataAdapter oda = new OracleDataAdapter(ocmd as OracleCommand);
                dt = new DataTable(); //@@@: dt = new DataTable();
                oda.Fill(dt); //@@@: oda.Fill(dt);
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "disconnectRecordset", "", "sentencia: " + sqlstmt); //@@@: cError.mngError(ex, "disconnectRecordset", "", "sentencia: " + sqlstmt);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.existsInRecordset = function(dt, ) { //@@@: public bool existsInRecordset(DataTable dt,
                                      string field, //@@@: string field,
                                      string val, //@@@: string val,
                                      bool founded) //@@@: out bool founded)
        { //@@@: {
            return existsInRecordset(dt, field, val, founded, //@@@: return existsInRecordset(dt, field, val, out founded,
                                     "", "", "", eErrorLevel.eErrorInformation); //@@@: "", "", "", eErrorLevel.eErrorInformation);
        }; //@@@: }

        self.existsInRecordset = function(dt, ) { //@@@: public bool existsInRecordset(DataTable dt,
                                      string field, //@@@: string field,
                                      string val, //@@@: string val,
                                      bool founded, //@@@: out bool founded,
                                      string function, //@@@: string function,
                                      string module, //@@@: string module,
                                      string title, //@@@: string title,
                                      eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            let filter = field + " = " + val; //@@@: string filter = field + " = " + val;
            founded = false; //@@@: founded = false;

            try { //@@@: try
                if (dt.Rows.Count === 0) { //@@@: if (dt.Rows.Count == 0)
                    return false; //@@@: return false;
                } //@@@: }
                else { //@@@: else
                    let vdr = dt.Select(filter); //@@@: DataRow[] vdr = dt.Select(filter);
                    founded = vdr.Length > 0; //@@@: founded = vdr.Length > 0;
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "existsInRecordset", module, "filter: " + filter); //@@@: cError.mngError(ex, "existsInRecordset", module, "filter: " + filter);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.existsInRecord = function(dr, ) { //@@@: public bool existsInRecord(DataRow dr,
                                   DataColumn[] columns, //@@@: DataColumn[] columns,
                                   string val, //@@@: string val,
                                   bool founded) //@@@: out bool founded)
        { //@@@: {
            return existsInRecord(dr, columns, val, founded, //@@@: return existsInRecord(dr, columns, val, out founded,
                                  "", "", "", eErrorLevel.eErrorInformation); //@@@: "", "", "", eErrorLevel.eErrorInformation);
        }; //@@@: }

        self.existsInRecord = function(dr, ) { //@@@: public bool existsInRecord(DataRow dr,
                                   DataColumn[] columns, //@@@: DataColumn[] columns,
                                   string val, //@@@: string val,
                                   bool founded, //@@@: out bool founded,
                                   string function, //@@@: string function,
                                   string module, //@@@: string module,
                                   string title, //@@@: string title,
                                   eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            return pExistsInRecord(dr, columns, val, founded, true, //@@@: return pExistsInRecord(dr, columns, val, out founded, true,
                                   function, module, title, level); //@@@: function, module, title, level);
        }; //@@@: }

        self.existsInRecordEx = function(dr, ) { //@@@: public bool existsInRecordEx(DataRow dr,
                                     DataColumn[] columns, //@@@: DataColumn[] columns,
                                     string val, //@@@: string val,
                                     bool founded, //@@@: out bool founded,
                                     bool like, //@@@: bool like,
                                     string function, //@@@: string function,
                                     string module, //@@@: string module,
                                     string title, //@@@: string title,
                                     eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            return pExistsInRecord(dr, columns, val, founded, like, //@@@: return pExistsInRecord(dr, columns, val, out founded, like,
                                   function, module, title, level); //@@@: function, module, title, level);
        }; //@@@: }

        const pExistsInRecord = function(dr, ) { //@@@: private bool pExistsInRecord(DataRow dr,
                                    DataColumn[] columns, //@@@: DataColumn[] columns,
                                    string val, //@@@: string val,
                                    bool founded, //@@@: out bool founded,
                                    bool like, //@@@: bool like,
                                    string function, //@@@: string function,
                                    string module, //@@@: string module,
                                    string title, //@@@: string title,
                                    eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            let filter = ""; //@@@: string filter = "";
            founded = false; //@@@: founded = false;
            val = val.ToLower(); //@@@: val = val.ToLower();

            try { //@@@: try
                for(var i_ = 0; i_ < columns.length; i_++) { //@@@: foreach (DataColumn col in columns)
                    let typeCode = System.Type.GetTypeCode(col.GetType()); ; //@@@: System.TypeCode typeCode = System.Type.GetTypeCode(col.GetType()); ;
                    switch (typeCode) //@@@: switch (typeCode)
                    { //@@@: {
                        case System.TypeCode.Char: //@@@: case System.TypeCode.Char:
                        case System.TypeCode.String: //@@@: case System.TypeCode.String:
                            if (like) { //@@@: if (like)
                                founded = dr[col.ColumnName].ToString().ToLower().Contains(val); //@@@: founded = dr[col.ColumnName].ToString().ToLower().Contains(val);
                            } //@@@: }
                            else { //@@@: else
                                founded = dr[col.ColumnName].ToString().ToLower() === val; //@@@: founded = dr[col.ColumnName].ToString().ToLower() == val;
                            } //@@@: }
                            break; //@@@: break;
                        case System.TypeCode.Decimal: //@@@: case System.TypeCode.Decimal:
                        case System.TypeCode.Double: //@@@: case System.TypeCode.Double:
                        case System.TypeCode.Int16: //@@@: case System.TypeCode.Int16:
                        case System.TypeCode.Int32: //@@@: case System.TypeCode.Int32:
                        case System.TypeCode.Int64: //@@@: case System.TypeCode.Int64:
                        case System.TypeCode.Single: //@@@: case System.TypeCode.Single:
                        case System.TypeCode.UInt16: //@@@: case System.TypeCode.UInt16:
                        case System.TypeCode.UInt32: //@@@: case System.TypeCode.UInt32:
                        case System.TypeCode.UInt64: //@@@: case System.TypeCode.UInt64:
UNKNOWN >>                             int ival; //@@@: int ival;
                            if (int.TryParse(val, ival)) { //@@@: if (int.TryParse(val, out ival))
                                founded = dr[col.ColumnName] === ival; //@@@: founded = (int)dr[col.ColumnName] == ival;
                            } //@@@: }
                            break; //@@@: break;
                        case System.TypeCode.DateTime: //@@@: case System.TypeCode.DateTime:
                            break; //@@@: break;
                        case System.TypeCode.Boolean: //@@@: case System.TypeCode.Boolean:
                            founded = false; //@@@: founded = false;
                            break; //@@@: break;
                        default: //@@@: default:
                            founded = false; //@@@: founded = false;
                            break; //@@@: break;
                    } //@@@: }
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "existsInRecord", module, "filter: " + filter); //@@@: cError.mngError(ex, "existsInRecord", module, "filter: " + filter);
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.execute = function(sqlstmt) { //@@@: public bool execute(string sqlstmt)
            return execute(sqlstmt, "", "", "", eErrorLevel.eErrorInformation); //@@@: return execute(sqlstmt, "", "", "", eErrorLevel.eErrorInformation);
        }; //@@@: }

        self.execute = function(sqlstmt, ) { //@@@: public bool execute(string sqlstmt,
                            string function, //@@@: string function,
                            string module, //@@@: string module,
                            string title, //@@@: string title,
                            eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            let tryCount = 0; //@@@: int tryCount = 0;
            ors = null; //@@@: ors = null;

            while (tryCount < m_maxTryExecute) { //@@@: while (tryCount < m_maxTryExecute)
                if (pExecute(sqlstmt, //@@@: if (pExecute(sqlstmt,
                             function, //@@@: function,
                             module, //@@@: module,
                             title, //@@@: title,
                             level, //@@@: level,
                             tryCount === m_maxTryExecute)) { //@@@: tryCount == m_maxTryExecute))
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pExecute = function(sqlstmt, ) { //@@@: private bool pExecute(string sqlstmt,
                              string function, //@@@: string function,
                              string module, //@@@: string module,
                              string title, //@@@: string title,
                              eErrorLevel level, //@@@: eErrorLevel level,
                              bool showError) //@@@: bool showError)
        { //@@@: {
            try { //@@@: try
                let ocmd = createCommand(sqlstmt); //@@@: DbCommand ocmd = createCommand(sqlstmt);
                ocmd.ExecuteNonQuery(); //@@@: ocmd.ExecuteNonQuery();
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                if (showError) { //@@@: if (showError)
                    cError.mngError(ex, "pExecute for " + module + "." + function, c_module, "sentencia: " + sqlstmt); //@@@: cError.mngError(ex, "pExecute for " + module + "." + function, c_module, "sentencia: " + sqlstmt);
                } //@@@: }
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.sqlString = function(val) { //@@@: public static string sqlString(string val)
            return "'" + val.Replace("'", "''") + "'"; //@@@: return "'" + val.Replace("'", "''") + "'";
        }; //@@@: }

        self.sqlDate = function(val) { //@@@: public static string sqlDate(string val)
UNKNOWN >>             DateTime dt; //@@@: DateTime dt;
            if (DateTime.TryParseExact(val, "MM/dd/yyyy", null, DateTimeStyles.None, dt)) { } //@@@: if (DateTime.TryParseExact(val, "MM/dd/yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "dd/MM/yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "dd/MM/yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "MM-dd-yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "MM-dd-yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "dd-MM-yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "dd-MM-yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "MM.dd.yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "MM.dd.yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "dd.MM.yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "dd.MM.yyyy", null, DateTimeStyles.None, out dt)) { }

            else if (DateTime.TryParseExact(val, "M/dd/yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "M/dd/yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "dd/M/yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "dd/M/yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "M-dd-yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "M-dd-yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "dd-M-yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "dd-M-yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "M.dd.yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "M.dd.yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "dd.M.yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "dd.M.yyyy", null, DateTimeStyles.None, out dt)) { }

            else if (DateTime.TryParseExact(val, "M/d/yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "M/d/yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "d/M/yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "d/M/yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "M-d-yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "M-d-yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "d-M-yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "d-M-yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "M.d.yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "M.d.yyyy", null, DateTimeStyles.None, out dt)) { }
            else if (DateTime.TryParseExact(val, "d.M.yyyy", null, DateTimeStyles.None, dt)) { } //@@@: else if (DateTime.TryParseExact(val, "d.M.yyyy", null, DateTimeStyles.None, out dt)) { }

            else throw new Exception("Invalid date " + val); { //@@@: else throw new Exception("Invalid date " + val);
            return "'" + dt.ToString(cConstants.C_SQL_DATE_STRING, CultureInfo.InvariantCulture) + "'"; //@@@: return "'" + dt.ToString(cConstants.C_SQL_DATE_STRING, CultureInfo.InvariantCulture) + "'";
        }; //@@@: }

        /* TODO: remove me //@@@: /* TODO: remove me
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
        self.sqlNumber = function(number) { //@@@: public static string sqlNumber(string number)
            if (!G.isNumeric(number)) { //@@@: if (!G.isNumeric(number))
                return "0"; //@@@: return "0";
            } //@@@: }
            else { //@@@: else
                let s = cUtil.val(number).ToString(new String('#', 27) + "0." + new String('#', 28), CultureInfo.InvariantCulture); //@@@: var s = cUtil.val(number).ToString(new String('#', 27) + "0." + new String('#', 28), CultureInfo.InvariantCulture);
                s = s.Replace(",", "."); //@@@: s = s.Replace(",", ".");
                if (s.Substring(s.Length - 1, 0) === ".") { //@@@: if (s.Substring(s.Length - 1, 0) == ".")
                    s = s.Substring(0, s.Length - 1); //@@@: s = s.Substring(0, s.Length - 1);
                } //@@@: }
                return s; //@@@: return s;
            } //@@@: }
        }; //@@@: }

        /* TODO: remove me  //@@@: /* TODO: remove me
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

        self.closeDb = function() { //@@@: public void closeDb()
            try { //@@@: try
                if (m_transactionLevel > 0) { //@@@: if (m_transactionLevel > 0)
                    rollbackTransaction(); //@@@: rollbackTransaction();
                } //@@@: }
                m_transactionLevel = 0; //@@@: m_transactionLevel = 0;
                m_userName = ""; //@@@: m_userName = "";
                m_serverName = ""; //@@@: m_serverName = "";

                if (m_ocn !== null) { //@@@: if (m_ocn != null)
                    if (m_ocn.State !== ConnectionState.Closed) { //@@@: if (m_ocn.State != ConnectionState.Closed)
                        m_ocn.Close(); //@@@: m_ocn.Close();
                    } //@@@: }

                    m_ocn.Dispose(); //@@@: m_ocn.Dispose();
                    m_ocn = null; //@@@: m_ocn = null;
                } //@@@: }
                m_ocn = createConnection(); //@@@: m_ocn = createConnection();
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "closeDb", c_module, ""); //@@@: cError.mngError(ex, "closeDb", c_module, "");
            } //@@@: }
        }; //@@@: }

        self.beginTransaction = function() { //@@@: public bool beginTransaction()
            try { //@@@: try
                if (m_transactionLevel <= 0) { //@@@: if (m_transactionLevel <= 0)
                    m_otxn = m_ocn.BeginTransaction(); //@@@: m_otxn = m_ocn.BeginTransaction();
                    m_transactionLevel = 1; //@@@: m_transactionLevel = 1;
                } //@@@: }
                else { //@@@: else
                    m_transactionLevel++; //@@@: m_transactionLevel++;
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "commitTransaction", c_module, ""); //@@@: cError.mngError(ex, "commitTransaction", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.commitTransaction = function() { //@@@: public bool commitTransaction()
            if (m_transactionLevel <= 0) { //@@@: if (m_transactionLevel <= 0)
                m_transactionLevel = 0; //@@@: m_transactionLevel = 0;
                return false; //@@@: return false;
            } //@@@: }
            try { //@@@: try
                if (m_transactionLevel === 1) { //@@@: if (m_transactionLevel == 1)
                    m_otxn.Commit(); //@@@: m_otxn.Commit();
                    m_transactionLevel = 0; //@@@: m_transactionLevel = 0;
                } //@@@: }
                else { //@@@: else
                    m_transactionLevel--; //@@@: m_transactionLevel--;
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "commitTransaction", c_module, ""); //@@@: cError.mngError(ex, "commitTransaction", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.rollbackTransaction = function() { //@@@: public void rollbackTransaction()
            try { //@@@: try
                if (m_ocn !== null) { //@@@: if (m_ocn != null)
                    if (m_otxn !== null) { //@@@: if (m_otxn != null)
                        m_otxn.Rollback(); //@@@: m_otxn.Rollback();
                    } //@@@: }
                } //@@@: }
                m_transactionLevel = 0; //@@@: m_transactionLevel = 0;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "rollbackTransaction", c_module, ""); //@@@: cError.mngError(ex, "rollbackTransaction", c_module, "");
            } //@@@: }
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            string data) //@@@: out string data)
        { //@@@: {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation); //@@@: return getData(table, fieldId, id, field, out data, "", "", "", eErrorLevel.eErrorInformation);
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            int data) //@@@: out int data)
        { //@@@: {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation); //@@@: return getData(table, fieldId, id, field, out data, "", "", "", eErrorLevel.eErrorInformation);
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            double data) //@@@: out double data)
        { //@@@: {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation); //@@@: return getData(table, fieldId, id, field, out data, "", "", "", eErrorLevel.eErrorInformation);
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            DateTime data) //@@@: out DateTime data)
        { //@@@: {
            return getData(table, fieldId, id, field, data, "", "", "", eErrorLevel.eErrorInformation); //@@@: return getData(table, fieldId, id, field, out data, "", "", "", eErrorLevel.eErrorInformation);
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            string data, //@@@: out string data,
                            string function, //@@@: string function,
                            string module, //@@@: string module,
                            string title, //@@@: string title,
                            eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
UNKNOWN >>             DbDataReader ors; //@@@: DbDataReader ors;

            data = ""; //@@@: data = "";

            if (pGetData(table, fieldId, id, field, ors, //@@@: if (pGetData(table, fieldId, id, field, out ors,
                         function, module, title, level)) { //@@@: function, module, title, level))
                if (ors.Read()) { //@@@: if (ors.Read())
                    data = ors.GetString(0); //@@@: data = ors.GetString(0);
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            else return false; { //@@@: else return false;
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            int data, //@@@: out int data,
                            string function, //@@@: string function,
                            string module, //@@@: string module,
                            string title, //@@@: string title,
                            eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
UNKNOWN >>             DbDataReader ors; //@@@: DbDataReader ors;

            data = 0; //@@@: data = 0;

            if (pGetData(table, fieldId, id, field, ors, //@@@: if (pGetData(table, fieldId, id, field, out ors,
                         function, module, title, level)) { //@@@: function, module, title, level))
                if (ors.Read()) { //@@@: if (ors.Read())
                    data = ors.GetInt32(0); //@@@: data = (int)ors.GetInt32(0);
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            else return false; { //@@@: else return false;
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            double data, //@@@: out double data,
                            string function, //@@@: string function,
                            string module, //@@@: string module,
                            string title, //@@@: string title,
                            eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
UNKNOWN >>             DbDataReader ors; //@@@: DbDataReader ors;

            data = 0; //@@@: data = 0;

            if (pGetData(table, fieldId, id, field, ors, //@@@: if (pGetData(table, fieldId, id, field, out ors,
                         function, module, title, level)) { //@@@: function, module, title, level))
                if (ors.Read()) { //@@@: if (ors.Read())
                    data = ors.GetDouble(0); //@@@: data = ors.GetDouble(0);
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            else return false; { //@@@: else return false;
        }; //@@@: }

        self.getData = function(table, ) { //@@@: public bool getData(string table,
                            string fieldId, //@@@: string fieldId,
                            string id, //@@@: string id,
                            string field, //@@@: string field,
                            DateTime data, //@@@: out DateTime data,
                            string function, //@@@: string function,
                            string module, //@@@: string module,
                            string title, //@@@: string title,
                            eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
UNKNOWN >>             DbDataReader ors; //@@@: DbDataReader ors;

            data = cConstants.C_NO_DATE; //@@@: data = cConstants.C_NO_DATE;

            if (pGetData(table, fieldId, id, field, ors, //@@@: if (pGetData(table, fieldId, id, field, out ors,
                         function, module, title, level)) { //@@@: function, module, title, level))
                if (ors.Read()) { //@@@: if (ors.Read())
                    data = ors.GetDateTime(0); //@@@: data = ors.GetDateTime(0);
                } //@@@: }
                return true; //@@@: return true;
            } //@@@: }
            else return false; { //@@@: else return false;
        }; //@@@: }

        const pGetData = function(table, ) { //@@@: private bool pGetData(string table,
                              string fieldId, //@@@: string fieldId,
                              string id, //@@@: string id,
                              string field, //@@@: string field,
                              DbDataReader ors, //@@@: out DbDataReader ors,
                              string function, //@@@: string function,
                              string module, //@@@: string module,
                              string title, //@@@: string title,
                              eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
UNKNOWN >>             string sqlstmt; //@@@: string sqlstmt;
            ors = null; //@@@: ors = null;
            sqlstmt = "select " + field + " from " + table + " where " + fieldId + " = " + id; //@@@: sqlstmt = "select " + field + " from " + table + " where " + fieldId + " = " + id;

            return openRs(sqlstmt, ors, function, module, title, level); //@@@: return openRs(sqlstmt, out ors, function, module, title, level);
        }; //@@@: }

        self.getNewId = function(table, ) { //@@@: public bool getNewId(string table,
                             string fieldId, //@@@: string fieldId,
                             int id, //@@@: out int id,
                             string function, //@@@: string function,
                             string module, //@@@: string module,
                             string title, //@@@: string title,
                             eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            let mouseWait = new cMouseWait(); //@@@: cMouseWait mouseWait = new cMouseWait();
            id = cConstants.C_NO_ID; //@@@: id = cConstants.C_NO_ID;
            try { //@@@: try
                if (pGetNewId(table, fieldId, id, false, //@@@: if (pGetNewId(table, fieldId, out id, false,
                               function, module, title, level)) { //@@@: function, module, title, level))
                    return true; //@@@: return true;
                } //@@@: }
                else { //@@@: else
                    if (pReconnectTry()) { //@@@: if (pReconnectTry())
                        return pGetNewId(table, fieldId, id, true, //@@@: return pGetNewId(table, fieldId, out id, true,
                                         function, module, title, level); //@@@: function, module, title, level);
                    } //@@@: }
                    else return false; { //@@@: else return false;
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "getNewId for " + module + "." + function, c_module, ""); //@@@: cError.mngError(ex, "getNewId for " + module + "." + function, c_module, "");
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                mouseWait.Dispose(); //@@@: mouseWait.Dispose();
            } //@@@: }

        }; //@@@: }

        const pGetNewId = function(table, ) { //@@@: private bool pGetNewId(string table,
                               string fieldId, //@@@: string fieldId,
                               int id, //@@@: out int id,
                               bool showError, //@@@: bool showError,
                               string function, //@@@: string function,
                               string module, //@@@: string module,
                               string title, //@@@: string title,
                               eErrorLevel level) //@@@: eErrorLevel level)
        { //@@@: {
            id = 0; //@@@: id = 0;
            try { //@@@: try

UNKNOWN >>                 string sqlstmt; //@@@: string sqlstmt;
UNKNOWN >>                 DbDataReader ors; //@@@: DbDataReader ors;
UNKNOWN >>                 DbCommand ocmd; //@@@: DbCommand ocmd;

                sqlstmt = "sp_dbgetnewid " //@@@: sqlstmt = "sp_dbgetnewid "
                                + sqlString(table) + "," //@@@: + sqlString(table) + ","
                                + sqlString(fieldId) + ",0"; //@@@: + sqlString(fieldId) + ",0";

                ocmd = createCommand(sqlstmt); //@@@: ocmd = createCommand(sqlstmt);
                ors = ocmd.ExecuteReader(); //@@@: ors = ocmd.ExecuteReader();
                if (ors.Read()) { //@@@: if (ors.Read())
                    id = ors.GetInt32(0); //@@@: id = (int)ors.GetInt32(0);
                    return true; //@@@: return true;
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "pGetNewId for " + module + "." + function, c_module, ""); //@@@: cError.mngError(ex, "pGetNewId for " + module + "." + function, c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        //------------------------------
        // sql statment parser functions

        self.getSelect = function(sqlstmt) { //@@@: public string getSelect(string sqlstmt)
            let i = sqlstmt.ToUpper().IndexOf("FROM"); //@@@: int i = sqlstmt.ToUpper().IndexOf("FROM");
            if (i >= 0) { //@@@: if (i >= 0)
                return sqlstmt.Substring(0, i).Trim(); //@@@: return sqlstmt.Substring(0, i).Trim();
            } //@@@: }
            else { //@@@: else
                return sqlstmt; //@@@: return sqlstmt;
            } //@@@: }
        }; //@@@: }

        self.getFrom = function(sqlstmt) { //@@@: public string getFrom(string sqlstmt)
            let i = sqlstmt.ToUpper().IndexOf("FROM"); //@@@: int i = sqlstmt.ToUpper().IndexOf("FROM");
            if (i >= 0) { //@@@: if (i >= 0)
                sqlstmt = sqlstmt.Substring(i); //@@@: sqlstmt = sqlstmt.Substring(i);
                i = sqlstmt.ToUpper().IndexOf("WHERE"); //@@@: i = sqlstmt.ToUpper().IndexOf("WHERE");
                if (i >= 0) { //@@@: if (i >= 0)
                    return sqlstmt.Substring(0, i).Trim(); //@@@: return sqlstmt.Substring(0, i).Trim();
                } //@@@: }
                else { //@@@: else
                    i = sqlstmt.ToUpper().IndexOf("GROUP BY"); //@@@: i = sqlstmt.ToUpper().IndexOf("GROUP BY");
                    if (i >= 0) { //@@@: if (i >= 0)
                        return sqlstmt.Substring(0, i).Trim(); //@@@: return sqlstmt.Substring(0, i).Trim();
                    } //@@@: }
                    else { //@@@: else
                        i = sqlstmt.ToUpper().IndexOf("ORDER BY"); //@@@: i = sqlstmt.ToUpper().IndexOf("ORDER BY");
                        if (i >= 0) { //@@@: if (i >= 0)
                            return sqlstmt.Substring(0, i).Trim(); //@@@: return sqlstmt.Substring(0, i).Trim();
                        } //@@@: }
                        else { //@@@: else
                            return sqlstmt; //@@@: return sqlstmt;
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        self.getWhere = function(sqlstmt) { //@@@: public string getWhere(string sqlstmt)
            let i = sqlstmt.ToUpper().IndexOf("WHERE"); //@@@: int i = sqlstmt.ToUpper().IndexOf("WHERE");
            if (i >= 0) { //@@@: if (i >= 0)
                sqlstmt = sqlstmt.Substring(i); //@@@: sqlstmt = sqlstmt.Substring(i);
                i = sqlstmt.ToUpper().IndexOf("GROUP BY"); //@@@: i = sqlstmt.ToUpper().IndexOf("GROUP BY");
                if (i >= 0) { //@@@: if (i >= 0)
                    return sqlstmt.Substring(0, i).Trim(); //@@@: return sqlstmt.Substring(0, i).Trim();
                } //@@@: }
                else { //@@@: else
                    i = sqlstmt.ToUpper().IndexOf("ORDER BY"); //@@@: i = sqlstmt.ToUpper().IndexOf("ORDER BY");
                    if (i >= 0) { //@@@: if (i >= 0)
                        return sqlstmt.Substring(0, i).Trim(); //@@@: return sqlstmt.Substring(0, i).Trim();
                    } //@@@: }
                    else { //@@@: else
                        return sqlstmt; //@@@: return sqlstmt;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        self.getGroup = function(sqlstmt) { //@@@: public string getGroup(string sqlstmt)
            let i = sqlstmt.ToUpper().IndexOf("GROUP BY"); //@@@: int i = sqlstmt.ToUpper().IndexOf("GROUP BY");
            if (i >= 0) { //@@@: if (i >= 0)
                sqlstmt = sqlstmt.Substring(i); //@@@: sqlstmt = sqlstmt.Substring(i);
                i = sqlstmt.ToUpper().IndexOf("ORDER BY"); //@@@: i = sqlstmt.ToUpper().IndexOf("ORDER BY");
                if (i >= 0) { //@@@: if (i >= 0)
                    return sqlstmt.Substring(0, i).Trim(); //@@@: return sqlstmt.Substring(0, i).Trim();
                } //@@@: }
                else { //@@@: else
                    return sqlstmt; //@@@: return sqlstmt;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        self.getOrder = function(sqlstmt) { //@@@: public string getOrder(string sqlstmt)
            let i = sqlstmt.ToUpper().IndexOf("ORDER BY"); //@@@: int i = sqlstmt.ToUpper().IndexOf("ORDER BY");
            if (i >= 0) { //@@@: if (i >= 0)
                return sqlstmt.Substring(i).Trim(); //@@@: return sqlstmt.Substring(i).Trim();
            } //@@@: }
            else { //@@@: else
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        self.getSearchSqlstmt = function(sqlstmt, toSearch) { //@@@: public string getSearchSqlstmt(string sqlstmt, string toSearch)
            try { //@@@: try
                let sqlSelect = getSelect(sqlstmt); //@@@: string sqlSelect = getSelect(sqlstmt);
                let sqlFrom = getFrom(sqlstmt); //@@@: string sqlFrom = getFrom(sqlstmt);
                let sqlWhere = getWhere(sqlstmt); //@@@: string sqlWhere = getWhere(sqlstmt);
                let sqlGroup = getGroup(sqlstmt); //@@@: string sqlGroup = getGroup(sqlstmt);
                let sqlOrder = getOrder(sqlstmt); //@@@: string sqlOrder = getOrder(sqlstmt);
                let filter = ""; //@@@: string filter = "";

                toSearch = toSearch.Trim(); //@@@: toSearch = toSearch.Trim();

                if (toSearch !== "") { //@@@: if (toSearch != "")
                    if (sqlWhere === "") { //@@@: if (sqlWhere == "")
                        filter = " where ("; //@@@: filter = " where (";
                    } //@@@: }
                    else { //@@@: else
                        filter = " and ("; //@@@: filter = " and (";
                    } //@@@: }

                    let i = 1; //@@@: int i = 1;
UNKNOWN >>                     string column; //@@@: string column;

                    column = pGetColumnFromStatement(sqlSelect, i); //@@@: column = pGetColumnFromStatement(sqlSelect, i);
                    while (column !== "") { //@@@: while (column != "")
                        filter = filter + pGetStmtForColumn(column, toSearch, sqlSelect) + " or "; //@@@: filter = filter + pGetStmtForColumn(column, toSearch, sqlSelect) + " or ";
                        i++; //@@@: i++;
                        column = pGetColumnFromStatement(sqlSelect, i); //@@@: column = pGetColumnFromStatement(sqlSelect, i);
                    } //@@@: }

                    //extrat last 'or' and put a parentheses
                    filter = filter.Substring(0, filter.Length - 3) + ")"; //@@@: filter = filter.Substring(0, filter.Length - 3) + ")";
                } //@@@: }
                return sqlSelect + " " + sqlFrom + " " + sqlWhere + " " + filter + " " + sqlOrder + sqlGroup; //@@@: return sqlSelect + " " + sqlFrom + " " + sqlWhere + " " + filter + " " + sqlOrder + sqlGroup;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "getSearchSqlstmt", c_module, ""); //@@@: cError.mngError(ex, "getSearchSqlstmt", c_module, "");
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        const pGetColumnFromStatement = function(sqlstmt, i) { //@@@: private string pGetColumnFromStatement(string sqlstmt, int i)
UNKNOWN >>             int k; //@@@: int k;
            let q = 0; //@@@: int q = 0;
            for(var p = 1; p <= i; p++) { //@@@: for (int p = 1; p <= i; p++)
                let h = sqlstmt.IndexOf("=", q, StringComparison.Ordinal); //@@@: int h = sqlstmt.IndexOf("=", q, StringComparison.Ordinal);
                let r = sqlstmt.IndexOf(",", q, StringComparison.Ordinal); //@@@: int r = sqlstmt.IndexOf(",", q, StringComparison.Ordinal);

                if (h < r) { //@@@: if (h < r)
                    k = h; //@@@: k = h;
                } //@@@: }
                else { //@@@: else
                    k = r; //@@@: k = r;
                } //@@@: }

                if (k < 0) { //@@@: if (k < 0)

                    if (h > r) { //@@@: if (h > r)
                        k = h; //@@@: k = h;
                    } //@@@: }
                    else { //@@@: else
                        k = r; //@@@: k = r;
                    } //@@@: }

                    if (k < 0) { //@@@: if (k < 0)
                        // if the index column where I am positioned is not lower than
                        // the index column required, the column required doesn't exists.
                        if (p < i) { //@@@: if (p < i)
                            return ""; //@@@: return "";
                        } //@@@: }

                        break; //@@@: break;
                    } //@@@: }
                } //@@@: }
                if (p === i) { //@@@: if (p == i)
                    sqlstmt = sqlstmt.Substring(0, k); //@@@: sqlstmt = sqlstmt.Substring(0, k);
                } //@@@: }
                else { //@@@: else
                    if (k === h) { //@@@: if (k == h)
                        if (r < 0) { //@@@: if (r < 0)
                            return ""; //@@@: return "";
                        } //@@@: }
                        k = r; //@@@: k = r;
                    } //@@@: }
                    sqlstmt = sqlstmt.Substring(k + 1); //@@@: sqlstmt = sqlstmt.Substring(k + 1);
                } //@@@: }
            } //@@@: }

            sqlstmt = sqlstmt.Trim(); //@@@: sqlstmt = sqlstmt.Trim();
            q = sqlstmt.Length - 1; //@@@: q = sqlstmt.Length - 1;
            let c = sqlstmt.Substring(q, 1); //@@@: string c = sqlstmt.Substring(q, 1);
            if (c === "]") { //@@@: if (c == "]")
                do { //@@@: do
                    c = sqlstmt.Substring(q, 1); //@@@: c = sqlstmt.Substring(q, 1);
                    if (c === "[") { //@@@: if (c == "[")
                        break; //@@@: break;
                    } //@@@: }
                    q--; //@@@: q--;
                } while (q >= 0); //@@@: } while (q >= 0);
            } //@@@: }
            else { //@@@: else
                do { //@@@: do
                    c = sqlstmt.Substring(q, 1); //@@@: c = sqlstmt.Substring(q, 1);
                    if (c === " ") { //@@@: if (c == " ")
                        break; //@@@: break;
                    } //@@@: }
                    q--; //@@@: q--;
                } while (q >= 0); //@@@: } while (q >= 0);
            } //@@@: }
            q = q < 0 ? 0 : q; //@@@: q = q < 0 ? 0 : q;
            let field = sqlstmt.Substring(q).ToLower(); //@@@: string field = sqlstmt.Substring(q).ToLower();
            if (String.CompareOrdinal(field, "select") === 0 //@@@: if (String.CompareOrdinal(field, "select") == 0
                || String.CompareOrdinal(field, "distinct") === 0) { //@@@: || String.CompareOrdinal(field, "distinct") == 0)
                return ""; //@@@: return "";
            } //@@@: }
            else { //@@@: else
                return field.Trim(); //@@@: return field.Trim();
            } //@@@: }
        }; //@@@: }

        const pGetStmtForColumn = function(column, toSearch, sqlstmt) { //@@@: private string pGetStmtForColumn(string column, string toSearch, string sqlstmt)
            let realName = pGetColNameFromColExpression(column, sqlstmt); //@@@: string realName = pGetColNameFromColExpression(column, sqlstmt);
            return "charindex('" + toSearch + "', convert(varchar(4000)," + realName + ")) > 0"; //@@@: return "charindex('" + toSearch + "', convert(varchar(4000)," + realName + ")) > 0";
        }; //@@@: }

        const pGetColNameFromColExpression = function(column, sqlstmt) { //@@@: private string pGetColNameFromColExpression(string column, string sqlstmt)
            let retval = ""; //@@@: string retval = "";
            let sep = ""; //@@@: string sep = "";
            let sqlSelect = ""; //@@@: string sqlSelect = "";
            let toSearch = ""; //@@@: string toSearch = "";

            sqlSelect = getSelect(sqlstmt).ToLower(); //@@@: sqlSelect = getSelect(sqlstmt).ToLower();
            toSearch = column.ToLower().Trim(); //@@@: toSearch = column.ToLower().Trim();

            let i = sqlSelect.IndexOf(toSearch); //@@@: int i = sqlSelect.IndexOf(toSearch);
            if (i >= 0) { //@@@: if (i >= 0)
                retval = sqlSelect.Substring(i + toSearch.Length).Trim().Replace("'", " ").Trim(); //@@@: retval = sqlSelect.Substring(i + toSearch.Length).Trim().Replace("'", " ").Trim();
                if (retval.Substring(0, 1) === "=") { //@@@: if (retval.Substring(0, 1) == "=")
                    retval = retval.Substring(1); //@@@: retval = retval.Substring(1);
                    sep = ","; //@@@: sep = ",";
                    let q = retval.IndexOf(","); //@@@: int q = retval.IndexOf(",");
                    let t = retval.IndexOf(" "); //@@@: int t = retval.IndexOf(" ");
                    if (q < 0) { //@@@: if (q < 0)
                        sep = " "; //@@@: sep = " ";
                    } //@@@: }
                    else if (t >= 0) { //@@@: else if (t >= 0)
                        if (q > t) { //@@@: if (q > t)
                            sep = " "; //@@@: sep = " ";
                        } //@@@: }
                    } //@@@: }
                    let w = retval.IndexOf(sep); //@@@: int w = retval.IndexOf(sep);
                    if (w >= 0) { //@@@: if (w >= 0)
                        retval = retval.Substring(0, w).Trim(); //@@@: retval = retval.Substring(0, w).Trim();
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    retval = column; //@@@: retval = column;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                retval = column; //@@@: retval = column;
            } //@@@: }
            return retval; //@@@: return retval;
        }; //@@@: }

        const pReconnect = function() { //@@@: private void pReconnect()
            closeDb(); //@@@: closeDb();
            pConnect(); //@@@: pConnect();
        }; //@@@: }

        const pReconnectTry = function() { //@@@: private bool pReconnectTry()
            closeDb(); //@@@: closeDb();
            try { //@@@: try
                pConnect(); //@@@: pConnect();
                return true; //@@@: return true;
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "pReconnectTry", c_module, ""); //@@@: cError.mngError(ex, "pReconnectTry", c_module, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const pConnect = function() { //@@@: private void pConnect()
            m_ocn.ConnectionString = translateFromAdoIfNeeded(m_connect); //@@@: m_ocn.ConnectionString = translateFromAdoIfNeeded(m_connect);
            m_ocn.Open(); //@@@: m_ocn.Open();
        }; //@@@: }

        const cDataBase = function(databaseEngine) { //@@@: public cDataBase(csDatabaseEngine databaseEngine)
            m_databaseEngine = databaseEngine; //@@@: m_databaseEngine = databaseEngine;
        }; //@@@: }

        const createConnection = function() { //@@@: private DbConnection createConnection()
            switch (m_databaseEngine) //@@@: switch (m_databaseEngine)
            {  //@@@: {
                case csDatabaseEngine.SQL_SERVER: //@@@: case csDatabaseEngine.SQL_SERVER:
                    return new SqlConnection(); //@@@: return new SqlConnection();
                case csDatabaseEngine.POSTGRESQL: //@@@: case csDatabaseEngine.POSTGRESQL:
                    throw new NotImplementedException(); //@@@: throw new NotImplementedException();
                case csDatabaseEngine.ORACLE: //@@@: case csDatabaseEngine.ORACLE:
                    return new OracleConnection(); //@@@: return new OracleConnection();
                case csDatabaseEngine.CSREPORT_WEB: //@@@: case csDatabaseEngine.CSREPORT_WEB:
                    return new cJSONServerConnection(); //@@@: return new cJSONServerConnection();
            } //@@@: }
            throw new Exception("The database engine is not supported " + m_databaseEngine.ToString()); //@@@: throw new Exception("The database engine is not supported " + m_databaseEngine.ToString());
        }; //@@@: }

        const createCommand = function(sqlstmt) { //@@@: private DbCommand createCommand(string sqlstmt)
            let ocmd = null; //@@@: DbCommand ocmd = null;

            switch (m_databaseEngine) //@@@: switch (m_databaseEngine)
            { //@@@: {
                case csDatabaseEngine.SQL_SERVER: //@@@: case csDatabaseEngine.SQL_SERVER:
                    ocmd = new SqlCommand(sqlstmt, m_ocn as SqlConnection); //@@@: ocmd = new SqlCommand(sqlstmt, m_ocn as SqlConnection);
                    break; //@@@: break;
                case csDatabaseEngine.POSTGRESQL: //@@@: case csDatabaseEngine.POSTGRESQL:
                    throw new NotImplementedException(); //@@@: throw new NotImplementedException();
                case csDatabaseEngine.ORACLE: //@@@: case csDatabaseEngine.ORACLE:
                    ocmd = new OracleCommand(sqlstmt, m_ocn as OracleConnection); //@@@: ocmd = new OracleCommand(sqlstmt, m_ocn as OracleConnection);
                    break; //@@@: break;
                case csDatabaseEngine.CSREPORT_WEB: //@@@: case csDatabaseEngine.CSREPORT_WEB:
                    ocmd = new cJSONCommand(sqlstmt, m_ocn as cJSONServerConnection); //@@@: ocmd = new cJSONCommand(sqlstmt, m_ocn as cJSONServerConnection);
                    break; //@@@: break;
            } //@@@: }

            if(ocmd === null) { //@@@: if(ocmd == null)
                throw new Exception("The database engine is not supported " + m_databaseEngine.ToString()); //@@@: throw new Exception("The database engine is not supported " + m_databaseEngine.ToString());

            ocmd.CommandTimeout = m_commandTimeout; //@@@: ocmd.CommandTimeout = m_commandTimeout;
            ocmd.CommandType = CommandType.Text; //@@@: ocmd.CommandType = CommandType.Text;

            return ocmd; //@@@: return ocmd;
        }; //@@@: }

        /* //@@@: /*

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
        const translateFromAdoIfNeeded = function(strConnect) { //@@@: private string translateFromAdoIfNeeded(string strConnect)
            if (m_databaseEngine === csDatabaseEngine.SQL_SERVER) { //@@@: if (m_databaseEngine == csDatabaseEngine.SQL_SERVER)

                if (strConnect.IndexOf("Provider=") > -1) { //@@@: if (strConnect.IndexOf("Provider=") > -1)
                    let dataSource = cUtil.getToken("Data Source", strConnect); //@@@: var dataSource = cUtil.getToken("Data Source", strConnect);
                    let initialCatalog = cUtil.getToken("Initial Catalog", strConnect); //@@@: var initialCatalog = cUtil.getToken("Initial Catalog", strConnect);
                    let trusted = cUtil.getToken("Integrated Security", strConnect); //@@@: var trusted = cUtil.getToken("Integrated Security", strConnect);
                    let userId = cUtil.getToken("User ID", strConnect); //@@@: var userId = cUtil.getToken("User ID", strConnect);
                    let password = cUtil.getToken("Password", strConnect); //@@@: var password = cUtil.getToken("Password", strConnect);
                    if (trusted === "SSPI") { //@@@: if (trusted == "SSPI")
                        strConnect = String.Format("Data Source={0};Initial Catalog={1};Integrated Security=SSPI;", dataSource, initialCatalog); //@@@: strConnect = String.Format("Data Source={0};Initial Catalog={1};Integrated Security=SSPI;", dataSource, initialCatalog);
                    } //@@@: }
                    else { //@@@: else
                        strConnect = String.Format("Data Source={0};Initial Catalog={1};User id={2};Password={3};", dataSource, initialCatalog, userId, password); //@@@: strConnect = String.Format("Data Source={0};Initial Catalog={1};User id={2};Password={3};", dataSource, initialCatalog, userId, password);
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            return strConnect; //@@@: return strConnect;
        }; //@@@: }

        return self;

    } //@@@: }

        self.create = function() {

            const self = {}; //@@@: public static class csDataBaseEngineStringConnections
        self.string CSREPORT_WEB = "CSREPORT_WEB"; //@@@: public static string CSREPORT_WEB = "CSREPORT_WEB";
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csDatabaseEngine //@@@: public enum csDatabaseEngine
    {  //@@@: {
        SQL_SERVER = 1, //@@@: SQL_SERVER = 1,
        POSTGRESQL = 2, //@@@: POSTGRESQL = 2,
        ORACLE = 3, //@@@: ORACLE = 3,
        CSREPORT_WEB = 4 //@@@: CSREPORT_WEB = 4
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
