(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {};

    globalObject.CSDataBase.createCJSONServer = function() {

        const self = {};
        let cJSONDataSources m_dataSources = new cJSONDataSources();

        self.registerDataSource = function(dataSource, name) {
            m_dataSources.add(dataSource, name.ToLower());
        };

        self.getDataSource = function(name) {
            return m_dataSources.item(name.ToLower());
        };
        return self;

    }

UNKNOWN >>         return self;

    class cJSONServerConnection : DbConnection
    {
        //
        // Summary:
        //     Initializes a new instance of the System.Data.SqlClient.SqlConnection class.
        self. = function() {
        //
        // Summary:
        //     Initializes a new instance of the System.Data.SqlClient.SqlConnection class when
        //     given a string that contains the connection string.
        //
        // Parameters:
        //   connectionString:
        //     The connection used to open the SQL Server database.
        self. = function(connectionString) {
            this.ConnectionString = connectionString;
        };

        //
        // Summary:
        //     Gets or sets the string used to open a SQL Server database.
        //
        // Returns:
        //     The connection string that includes the source database name, and other parameters
        //     needed to establish the initial connection. The default value is an empty string.
        //
        // Exceptions:
        //   T:System.ArgumentException:
        //     An invalid connection string argument has been supplied, or a required connection
        //     string argument has not been supplied.
        self.string ConnectionString { get = null; set; };
        //
        // Summary:
        //     Gets the time to wait while trying to establish a connection before terminating
        //     the attempt and generating an error.
        //
        // Returns:
        //     The time (in seconds) to wait for a connection to open. The default value is
        //     15 seconds.
        //
        // Exceptions:
        //   T:System.ArgumentException:
        //     The value set is less than 0.
        self.int ConnectionTimeout { get = null; };
        //
        // Summary:
        //     Gets the name of the current database or the database to be used after a connection
        //     is opened.
        //
        // Returns:
        //     The name of the current database or the name of the database to be used after
        //     a connection is opened. The default value is an empty string.
        self.string Database { get = null; };
        //
        // Summary:
        //     Gets the name of the instance of SQL Server to which to connect.
        //
        // Returns:
        //     The name of the instance of SQL Server to which to connect. The default value
        //     is an empty string.
        self.string DataSource { get = null; };
        //
        // Summary:
        //     Gets or sets the System.Data.SqlClient.SqlConnection.FireInfoMessageEventOnUserErrors
        //     property.
        //
        // Returns:
        //     true if the System.Data.SqlClient.SqlConnection.FireInfoMessageEventOnUserErrors
        //     property has been set; otherwise false.
        self.FireInfoMessageEventOnUserErrors { get = null; set; };
        //
        // Summary:
        //     Gets the size (in bytes) of network packets used to communicate with an instance
        //     of SQL Server.
        //
        // Returns:
        //     The size (in bytes) of network packets. The default value is 8000.
        self.PacketSize { get = null; };
        //
        // Summary:
        //     Gets a string that contains the version of the instance of SQL Server to which
        //     the client is connected.
        //
        // Returns:
        //     The version of the instance of SQL Server.
        //
        // Exceptions:
        //   T:System.InvalidOperationException:
        //     The connection is closed.
        self.string ServerVersion { get = null; };
        //
        // Summary:
        //     Indicates the state of the System.Data.SqlClient.SqlConnection.
        //
        // Returns:
        //     An System.Data.ConnectionState enumeration.
        self.ConnectionState State { get = null; };
        //
        // Summary:
        //     When set to true, enables statistics gathering for the current connection.
        //
        // Returns:
        //     Returns true if statistics gathering is enabled; otherwise false. false is the
        //     default.
        self.StatisticsEnabled { get = null; set; };
        //
        // Summary:
        //     Gets a string that identifies the database client.
        //
        // Returns:
        //     A string that identifies the database client. If not specified, the name of the
        //     client computer. If neither is specified, the value is an empty string.
        self.WorkstationId { get = null; };
UNKNOWN >>         protected override DbProviderFactory DbProviderFactory { get; }

        //
        // Summary:
        //     Changes the current database for an open System.Data.SqlClient.SqlConnection.
        //
        // Parameters:
        //   database:
        //     The name of the database to use instead of the current database.
        //
        // Exceptions:
        //   T:System.ArgumentException:
        //     The database name is not valid.
        //
        //   T:System.InvalidOperationException:
        //     The connection is not open.
        //
        //   T:System.Data.SqlClient.SqlException:
        //     Cannot change the database.
        self. = function(database) {
        //
        // Summary:
        //     Closes the connection to the database. This is the preferred method of closing
        //     any open connection.
        //
        // Exceptions:
        //   T:System.Data.SqlClient.SqlException:
        //     The connection-level error that occurred while opening the connection.
        self. = function() {

        //
        // Summary:
        //     Enlists in the specified transaction as a distributed transaction.
        //
        // Parameters:
        //   transaction:
        //     A reference to an existing System.Transactions.Transaction in which to enlist.
        //public override void EnlistTransaction(System.Transactions.Transaction transaction) { }
        //
        // Summary:
        //     Returns schema information for the data source of this System.Data.SqlClient.SqlConnection.
        //
        // Returns:
        //     A System.Data.DataTable that contains schema information.
        self. = function() {
        //
        // Summary:
        //     Returns schema information for the data source of this System.Data.SqlClient.SqlConnection
        //     using the specified string for the schema name.
        //
        // Parameters:
        //   collectionName:
        //     Specifies the name of the schema to return.
        //
        // Returns:
        //     A System.Data.DataTable that contains schema information.
        //
        // Exceptions:
        //   T:System.ArgumentException:
        //     collectionName is specified as null.
        self. = function(collectionName) {
        //
        // Summary:
        //     Returns schema information for the data source of this System.Data.SqlClient.SqlConnection
        //     using the specified string for the schema name and the specified string array
        //     for the restriction values.
        //
        // Parameters:
        //   collectionName:
        //     Specifies the name of the schema to return.
        //
        //   restrictionValues:
        //     A set of restriction values for the requested schema.
        //
        // Returns:
        //     A System.Data.DataTable that contains schema information.
        //
        // Exceptions:
        //   T:System.ArgumentException:
        //     collectionName is specified as null.
        self. = function(collectionName, restrictionValues) {
        //
        // Summary:
        //     Opens a database connection with the property settings specified by the System.Data.SqlClient.SqlConnection.ConnectionString.
        //
        // Exceptions:
        //   T:System.InvalidOperationException:
        //     Cannot open a connection without specifying a data source or server.or The connection
        //     is already open.
        //
        //   T:System.Data.SqlClient.SqlException:
        //     A connection-level error occurred while opening the connection. If the System.Data.SqlClient.SqlException.Number
        //     property contains the value 18487 or 18488, this indicates that the specified
        //     password has expired or must be reset. See the System.Data.SqlClient.SqlConnection.ChangePassword(System.String,System.String)
        //     method for more information.
        //
        //   T:System.ArgumentException:
        //     A Connection Plan is specified together with one of the following:FailOverPartner,
        //     AttachDbFileName, UserInstance=true, or contextConnection=true.
        self. = function() {

        self. = function(isolationLevel) {
        self. = function() {
        self. = function(disposing) {

        return self;

    }
}(globalObject));