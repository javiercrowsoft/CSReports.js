(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {}; //@@@: namespace CSDataBase
 //@@@: {
UNKNOWN >>     class cJSONCommand : DbCommand //@@@: class cJSONCommand : DbCommand
    { //@@@: {
        let m_cmdText = ""; //@@@: private string m_cmdText = "";
        let m_connection = null; //@@@: private cJSONServerConnection m_connection = null;
        //
        // Summary:
        //     Initializes a new instance of the System.Data.SqlClient.SqlCommand class.
        self. = function() { //@@@: public cJSONCommand() { }
        //
        // Summary:
        //     Initializes a new instance of the System.Data.SqlClient.SqlCommand class with
        //     the text of the query.
        //
        // Parameters:
        //   cmdText:
        //     The text of the query.
        self. = function(cmdText) { //@@@: public cJSONCommand(string cmdText)
            m_cmdText = cmdText; //@@@: m_cmdText = cmdText;
        }; //@@@: }
        //
        // Summary:
        //     Initializes a new instance of the System.Data.SqlClient.SqlCommand class with
        //     the text of the query and a System.Data.SqlClient.SqlConnection.
        //
        // Parameters:
        //   cmdText:
        //     The text of the query.
        //
        //   connection:
        //     A System.Data.SqlClient.SqlConnection that represents the connection to an instance
        //     of SQL Server.
        self. = function(cmdText, connection) { //@@@: public cJSONCommand(string cmdText, cJSONServerConnection connection)
            m_cmdText = cmdText; //@@@: m_cmdText = cmdText;
            m_connection = connection; //@@@: m_connection = connection;
        }; //@@@: }

        //
        // Summary:
        //     Gets or sets the Transact-SQL statement, table name or stored procedure to execute
        //     at the data source.
        //
        // Returns:
        //     The Transact-SQL statement or stored procedure to execute. The default is an
        //     empty string.
UNKNOWN >>         public override string CommandText { //@@@: public override string CommandText {
UNKNOWN >>             get //@@@: get
            { //@@@: {
                return m_cmdText; //@@@: return m_cmdText;
            } //@@@: }
UNKNOWN >>             set //@@@: set
            { //@@@: {
                m_cmdText = value; //@@@: m_cmdText = value;
            } //@@@: }
        } //@@@: }
        //
        // Summary:
        //     Gets or sets the wait time before terminating the attempt to execute a command
        //     and generating an error.
        //
        // Returns:
        //     The time in seconds to wait for the command to execute. The default is 30 seconds.
        self.int CommandTimeout { get = null; set; }; //@@@: public override int CommandTimeout { get; set; }
        //
        // Summary:
        //     Gets or sets a value indicating how the System.Data.SqlClient.SqlCommand.CommandText
        //     property is to be interpreted.
        //
        // Returns:
        //     One of the System.Data.CommandType values. The default is Text.
        //
        // Exceptions:
        //   T:System.ArgumentException:
        //     The value was not a valid System.Data.CommandType.
        self.CommandType CommandType { get = null; set; }; //@@@: public override CommandType CommandType { get; set; }
        //
        // Summary:
        //     Gets or sets the System.Data.SqlClient.SqlConnection used by this instance of
        //     the System.Data.SqlClient.SqlCommand.
        //
        // Returns:
        //     The connection to a data source. The default value is null.
        //
        // Exceptions:
        //   T:System.InvalidOperationException:
        //     The System.Data.SqlClient.SqlCommand.Connection property was changed while the
        //     command was enlisted in a transaction..
        self.cJSONServerConnection Connection { get = null; set; }; //@@@: public new cJSONServerConnection Connection { get; set; }
        //
        // Summary:
        //     Gets or sets a value indicating whether the command object should be visible
        //     in a Windows Form Designer control.
        //
        // Returns:
        //     A value indicating whether the command object should be visible in a control.
        //     The default is true.
        self.bool DesignTimeVisible { get = null; set; }; //@@@: public override bool DesignTimeVisible { get; set; }
        //
        // Summary:
        //     Gets the collection of System.Data.Common.DbParameter objects.
        //
        // Returns:
        //     The parameters of the SQL statement or stored procedure.
        self.DbParameterCollection Parameters { get = null; }; //@@@: public new DbParameterCollection Parameters { get; }
        //
        // Summary:
        //     Gets or sets the System.Data.SqlClient.SqlTransaction within which the System.Data.SqlClient.SqlCommand
        //     executes.
        //
        // Returns:
        //     The System.Data.SqlClient.SqlTransaction. The default value is null.
        self.DbTransaction Transaction { get = null; set; }; //@@@: public new DbTransaction Transaction { get; set; }
        //
        // Summary:
        //     Gets or sets how command results are applied to the System.Data.DataRow when
        //     used by the Update method of the System.Data.Common.DbDataAdapter.
        //
        // Returns:
        //     One of the System.Data.UpdateRowSource values.
        self.UpdateRowSource UpdatedRowSource { get = null; set; }; //@@@: public override UpdateRowSource UpdatedRowSource { get; set; }
UNKNOWN >>         protected override DbConnection DbConnection { get; set; } //@@@: protected override DbConnection DbConnection { get; set; }
UNKNOWN >>         protected override DbParameterCollection DbParameterCollection { get; } //@@@: protected override DbParameterCollection DbParameterCollection { get; }
UNKNOWN >>         protected override DbTransaction DbTransaction { get; set; } //@@@: protected override DbTransaction DbTransaction { get; set; }

        //
        // Summary:
        //     Tries to cancel the execution of a System.Data.SqlClient.SqlCommand.
        self. = function() { //@@@: public override void Cancel() { }

        //
        // Summary:
        //     Creates a new instance of a System.Data.SqlClient.SqlParameter object.
        //
        // Returns:
        //     A System.Data.SqlClient.SqlParameter object.
        self. = function() { //@@@: public new DbParameter CreateParameter() { throw new NotImplementedException(); }

        self. = function() { //@@@: public override int ExecuteNonQuery() { throw new NotImplementedException(); }
        //
        // Summary:
        //     Sends the System.Data.SqlClient.SqlCommand.CommandText to the System.Data.SqlClient.SqlCommand.Connection
        //     and builds a System.Data.SqlClient.SqlDataReader.
        //
        // Returns:
        //     A System.Data.SqlClient.SqlDataReader object.
        //
        // Exceptions:
        //   T:System.Data.SqlClient.SqlException:
        //     An exception occurred while executing the command against a locked row. This
        //     exception is not generated when you are using Microsoft .NET Framework version
        //     1.0.
        //
        //   T:System.InvalidOperationException:
        //     The current state of the connection is closed. System.Data.SqlClient.SqlCommand.ExecuteReader
        //     requires an open System.Data.SqlClient.SqlConnection.
        self. = function() { //@@@: public new cJSONDataReader ExecuteReader() { throw new NotImplementedException(); }
        //
        // Summary:
        //     Sends the System.Data.SqlClient.SqlCommand.CommandText to the System.Data.SqlClient.SqlCommand.Connection,
        //     and builds a System.Data.SqlClient.SqlDataReader using one of the System.Data.CommandBehavior
        //     values.
        //
        // Parameters:
        //   behavior:
        //     One of the System.Data.CommandBehavior values.
        //
        // Returns:
        //     A System.Data.SqlClient.SqlDataReader object.
        self. = function(behavior) { //@@@: public new cJSONDataReader ExecuteReader(CommandBehavior behavior)
            let cmdName = getCommandName(); //@@@: var cmdName = getCommandName();
            let data = cJSONServer.getDataSource(m_connection.ConnectionString + "." + cmdName); //@@@: var data = cJSONServer.getDataSource(m_connection.ConnectionString + "." + cmdName);
            return new cJSONDataReader(data); //@@@: return new cJSONDataReader(data);
        }; //@@@: }
        //
        // Summary:
        //     Executes the query, and returns the first column of the first row in the result
        //     set returned by the query. Additional columns or rows are ignored.
        //
        // Returns:
        //     The first column of the first row in the result set, or a null reference (Nothing
        //     in Visual Basic) if the result set is empty. Returns a maximum of 2033 characters.
        //
        // Exceptions:
        //   T:System.Data.SqlClient.SqlException:
        //     An exception occurred while executing the command against a locked row. This
        //     exception is not generated when you are using Microsoft .NET Framework version
        //     1.0.
        self. = function() { //@@@: public override object ExecuteScalar() { throw new NotImplementedException(); }
        //
        // Summary:
        //     Creates a prepared version of the command on an instance of SQL Server.
        //
        // Exceptions:
        //   T:System.InvalidOperationException:
        //     The System.Data.SqlClient.SqlCommand.Connection is not set.-or- The System.Data.SqlClient.SqlCommand.Connection
        //     is not System.Data.SqlClient.SqlConnection.Open.
        self. = function() { //@@@: public override void Prepare() { throw new NotImplementedException(); }
        self. = function() { //@@@: protected override DbParameter CreateDbParameter() { throw new NotImplementedException(); }
        self. = function(behavior) { //@@@: protected override DbDataReader ExecuteDbDataReader(CommandBehavior behavior)
            return ExecuteReader(behavior); //@@@: return ExecuteReader(behavior);
        }; //@@@: }

        const getCommandName = function() { //@@@: private string getCommandName()
            let cmdText = m_cmdText; //@@@: var cmdText = m_cmdText;
            let startIndex = cmdText.IndexOf("exec"); //@@@: var startIndex = cmdText.IndexOf("exec");

            const  = function(0) { //@@@: if (startIndex < 0)
                throw new ArgumentException("The command text for this command object is invalid. Format must be 'exec [SP_NAME] param_list"); //@@@: throw new ArgumentException("The command text for this command object is invalid. Format must be 'exec [SP_NAME] param_list");
            } //@@@: }

            startIndex += 5; //@@@: startIndex += 5;

            cmdText = cmdText.Substring(startIndex); //@@@: cmdText = cmdText.Substring(startIndex);
            let length = cmdText.IndexOf(" ", 1); //@@@: var length = cmdText.IndexOf(" ", 1);

            return cmdText.Substring(0, length).Replace("[","").Replace("]",""); //@@@: return cmdText.Substring(0, length).Replace("[","").Replace("]","");
        }; //@@@: }
    } //@@@: }
} //@@@: }
