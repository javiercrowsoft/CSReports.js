

namespace CSDataBase
{
    export class cJSONDataReader {


    {
        private dataSource: cJSONDataSource = null;
        private cols: JArray = null;
        private rows: JArray = null;

        private resultIndex: number = 0;
        private rowIndex: number = -1;
        private closed: boolean = false;
        private start: DateTime = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public constructor(dataSource: cJSONDataSource) {
            this.dataSource = dataSource;
            this.cols = this.dataSource.getData()["columns"] as JArray;
            this.rows = this.dataSource.getData()["rows"] as JArray;
        }

        //
        // Summary:
        //     Gets the value of the specified column in its native format given the column
        //     name.
        //
        // Parameters:
        //   name:
        //     The column name.
        //
        // Returns:
        //     The value of the specified column in its native format.
        //
        // Exceptions:
        //   T:System.IndexOutOfRangeException:
        //     No column with the specified name was found.
        public override object this[string name]
        {
UNKNOWN >>             get
            {
                throw new NotImplementedException();
            }
        } 

        //
        // Summary:
        //     Gets the value of the specified column in its native format given the column
        //     ordinal.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column in its native format.
        //
        // Exceptions:
        //   T:System.IndexOutOfRangeException:
        //     The index passed was outside the range of 0 through System.Data.IDataRecord.FieldCount.
        public override object this[int i]
        {
UNKNOWN >>             get
            {
                throw new NotImplementedException();
            }
        }

        //
        // Summary:
        //     Gets a value that indicates the depth of nesting for the current row.
        //
        // Returns:
        //     The depth of nesting for the current row.
        public int: override = null;Depth { get; };
        //
        // Summary:
        //     Gets the number of columns in the current row.
        //
        // Returns:
        //     When not positioned in a valid recordset, 0; otherwise the number of columns
        //     in the current row. The default is -1.
        //
        // Exceptions:
        //   T:System.NotSupportedException:
        //     There is no current connection to an instance of SQL Server.
UNKNOWN >>         public override int FieldCount
        {
UNKNOWN >>             get
            {
                return (this.dataSource.getData()["columns"] as JArray).Count;
            }
        }
        //
        // Summary:
        //     Gets a value that indicates whether the System.Data.SqlClient.SqlDataReader contains
        //     one or more rows.
        //
        // Returns:
        //     true if the System.Data.SqlClient.SqlDataReader contains one or more rows; otherwise
        //     false.
UNKNOWN >>         public override bool HasRows {
UNKNOWN >>             get
            {
                return (this.dataSource.getData()["rows"] as JArray).Count > 0;
            }
        }
        //
        // Summary:
        //     Retrieves a Boolean value that indicates whether the specified System.Data.SqlClient.SqlDataReader
        //     instance has been closed.
        //
        // Returns:
        //     true if the specified System.Data.SqlClient.SqlDataReader instance is closed;
        //     otherwise false.
UNKNOWN >>         public override bool IsClosed
        {
UNKNOWN >>             get
            {
                return this.closed;
            }
        }
        //
        // Summary:
        //     Gets the number of rows changed, inserted, or deleted by execution of the Transact-SQL
        //     statement.
        //
        // Returns:
        //     The number of rows changed, inserted, or deleted; 0 if no rows were affected
        //     or the statement failed; and -1 for SELECT statements.
        public int: override = null;RecordsAffected { get; };
        //
        // Summary:
        //     Gets the number of fields in the System.Data.SqlClient.SqlDataReader that are
        //     not hidden.
        //
        // Returns:
        //     The number of fields that are not hidden.
UNKNOWN >>         public override int VisibleFieldCount {
UNKNOWN >>             get
            {
                return (this.dataSource.getData()["columns"] as JArray).Count;
            }
        }

        //
        // Summary:
        //     Closes the System.Data.SqlClient.SqlDataReader object.
        public Close() {
            // TODO: we should release resources here (unregister the datasource in cJSONServer)
            this.closed = true;
        }
        //
        // Summary:
        //     Gets the value of the specified column as a Boolean.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetBoolean(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a byte.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column as a byte.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetByte(i: number) {
        //
        // Summary:
        //     Reads a stream of bytes from the specified column offset into the buffer an array
        //     starting at the given buffer offset.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        //   dataIndex:
        //     The index within the field from which to begin the read operation.
        //
        //   buffer:
        //     The buffer into which to read the stream of bytes.
        //
        //   bufferIndex:
        //     The index within the buffer where the write operation is to start.
        //
        //   length:
        //     The maximum length to copy into the buffer.
        //
        // Returns:
        //     The actual number of bytes read.
        public GetBytes(i: number, dataIndex: number, buffer: byte[], bufferIndex: number, length: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a single character.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetChar(i: number) {
        //
        // Summary:
        //     Reads a stream of characters from the specified column offset into the buffer
        //     as an array starting at the given buffer offset.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        //   dataIndex:
        //     The index within the field from which to begin the read operation.
        //
        //   buffer:
        //     The buffer into which to read the stream of bytes.
        //
        //   bufferIndex:
        //     The index within the buffer where the write operation is to start.
        //
        //   length:
        //     The maximum length to copy into the buffer.
        //
        // Returns:
        //     The actual number of characters read.
        public GetChars(i: number, dataIndex: number, buffer: char[], bufferIndex: number, length: number) {
        //
        // Summary:
        //     Gets a string representing the data type of the specified column.
        //
        // Parameters:
        //   i:
        //     The zero-based ordinal position of the column to find.
        //
        // Returns:
        //     The string representing the data type of the specified column.
        public GetDataTypeName(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a System.DateTime object.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetDateTime(i: number) {
        //
        // Summary:
        //     Retrieves the value of the specified column as a System.DateTimeOffset object.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetDateTimeOffset(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a System.Decimal object.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetDecimal(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a double-precision floating point number.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetDouble(i: number) {
        //
        // Summary:
        //     Returns an System.Collections.IEnumerator that iterates through the System.Data.SqlClient.SqlDataReader.
        //
        // Returns:
        //     An System.Collections.IEnumerator for the System.Data.SqlClient.SqlDataReader.
        public GetEnumerator() {
        //
        // Summary:
        //     Gets the System.Type that is the data type of the object.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The System.Type that is the data type of the object. If the type does not exist
        //     on the client, in the case of a User-Defined Type (UDT) returned from the database,
        //     GetFieldType returns null.
        public GetFieldType(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a single-precision floating point number.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetFloat(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a globally unique identifier (GUID).
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetGuid(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a 16-bit signed integer.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetInt16(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a 32-bit signed integer.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetInt32(i: number) {
        //
        // Summary:
        //     Gets the value of the specified column as a 64-bit signed integer.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetInt64(i: number) {
        //
        // Summary:
        //     Gets the name of the specified column.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The name of the specified column.
        public GetName(i: number) {
            return this.cols[i]["name"].ToString();
        }
        //
        // Summary:
        //     Gets the column ordinal, given the name of the column.
        //
        // Parameters:
        //   name:
        //     The name of the column.
        //
        // Returns:
        //     The zero-based column ordinal.
        //
        // Exceptions:
        //   T:System.IndexOutOfRangeException:
        //     The name specified is not a valid column name.
        public GetOrdinal(name: string) {
        //
        // Summary:
        //     Gets an Object that is a representation of the underlying provider-specific field
        //     type.
        //
        // Parameters:
        //   i:
        //     An System.Int32 representing the column ordinal.
        //
        // Returns:
        //     Gets an System.Object that is a representation of the underlying provider-specific
        //     field type.
        public GetProviderSpecificFieldType(i: number) {
        //
        // Summary:
        //     Gets an Object that is a representation of the underlying provider specific value.
        //
        // Parameters:
        //   i:
        //     An System.Int32 representing the column ordinal.
        //
        // Returns:
        //     An System.Object that is a representation of the underlying provider specific
        //     value.
        public GetProviderSpecificValue(i: number) {
        //
        // Summary:
        //     Gets an array of objects that are a representation of the underlying provider
        //     specific values.
        //
        // Parameters:
        //   values:
        //     An array of System.Object into which to copy the column values.
        //
        // Returns:
        //     The array of objects that are a representation of the underlying provider specific
        //     values.
        public GetProviderSpecificValues(values: object[]) {
        //
        // Summary:
        //     Returns a System.Data.DataTable that describes the column metadata of the System.Data.SqlClient.SqlDataReader.
        //
        // Returns:
        //     A System.Data.DataTable that describes the column metadata.
        //
        // Exceptions:
        //   T:System.InvalidOperationException:
        //     The System.Data.SqlClient.SqlDataReader is closed.
        /*public override DataTable GetSchemaTable()
        {
            var dt = new DataTable();
            dt.Columns.Add("ColumnName");
            dt.Columns.Add("ColumnOrdinal");
            dt.Columns.Add("ColumnType");

            var i = 0;
            foreach (var col in this.cols)
            {
                var row = dt.NewRow();
                row["ColumnName"] = col["name"].ToString();
                row["ColumnType"] = col["columnType"].ToString();
                row["ColumnOrdinal"] = i;
                i += 1;
            }

            return dt;
        }*/

        private getType(typeName: string, columnName: string) {
UNKNOWN >>             Type type;

            switch (typeName.ToLower())
            {
                case "integer":
                case "int2":
                case "int4":
                case "smallint":
                    type = typeof(int);
                    break;
                case "biginteger":
                case "serial":
                case "bigserial":
                    type = typeof(Int64);
                    break;
                case "decimal":
                case "numeric":
                case "float8":
                case "float4":
                case "real":
                    type = typeof(double);
                    break;
                case "timestamp":
                case "timestamptz":
                case "date":
                case "time":
                    type = typeof(DateTime);
                    break;
                case "character":
                case "char":
                case "varchar":
                case "text":
                case "character varying":
                    type = typeof(string);
                    break;
                case "bytea":
                    type = typeof(byte[]);
                    break;
                default:
                    throw new ArgumentException("The data type for column " + columnName + " of data source " + this.dataSource.getName() + " is not supported");
            }
            return type;
        }

        public GetSchemaTable() {
            let table: var = new DataTable("SchemaTable");

            table.Columns.Add("AllowDBNull", typeof(bool));
            table.Columns.Add("BaseCatalogName", typeof(string));
            table.Columns.Add("BaseColumnName", typeof(string));
            table.Columns.Add("BaseSchemaName", typeof(string));
            table.Columns.Add("BaseTableName", typeof(string));
            table.Columns.Add("ColumnName", typeof(string));
            table.Columns.Add("ColumnOrdinal", typeof(int));
            table.Columns.Add("ColumnSize", typeof(int));
            table.Columns.Add("DataType", typeof(Type));
            table.Columns.Add("IsUnique", typeof(bool));
            table.Columns.Add("IsKey", typeof(bool));
            table.Columns.Add("IsAliased", typeof(bool));
            table.Columns.Add("IsExpression", typeof(bool));
            table.Columns.Add("IsIdentity", typeof(bool));
            table.Columns.Add("IsAutoIncrement", typeof(bool));
            table.Columns.Add("IsRowVersion", typeof(bool));
            table.Columns.Add("IsHidden", typeof(bool));
            table.Columns.Add("IsLong", typeof(bool));
            table.Columns.Add("IsReadOnly", typeof(bool));
            table.Columns.Add("NumericPrecision", typeof(int));
            table.Columns.Add("NumericScale", typeof(int));
            table.Columns.Add("ProviderSpecificDataType", typeof(Type));
            table.Columns.Add("ProviderType", typeof(Type));

            let i: var = 0;
            for(var i_ = 0; i_ < this.cols.length; i_++) {
                let colName: var = col["name"].ToString();

                let row: var = table.NewRow();

                row["AllowDBNull"] = false;
                row["BaseColumnName"] = colName;
                row["BaseCatalogName"] = "";
                row["BaseSchemaName"] = "";
                row["BaseTableName"] = "";
                row["ColumnName"] = colName;
                row["ColumnOrdinal"] = i;
                row["ColumnSize"] = -1;
                row["DataType"] = row["ProviderType"] = getType(col["columnType"].ToString(), colName); // Non-standard
                row["IsUnique"] = false;
                row["IsKey"] = false;
                row["IsAliased"] = false;
                row["IsExpression"] = false;
                row["IsAutoIncrement"] = false;
                row["IsIdentity"] = false;
                row["IsRowVersion"] = false;
                row["IsHidden"] = false;
                row["IsLong"] = false;
                row["NumericPrecision"] = 255;
                row["NumericScale"] = 255;

                table.Rows.Add(row);

                i += 1;
            }

            return table;
        }
        //
        // Summary:
        //     Gets the value of the specified column as a string.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     The value of the specified column.
        //
        // Exceptions:
        //   T:System.InvalidCastException:
        //     The specified cast is not valid.
        public GetString(i: number) {

        private isByteA(i: number) {
            return this.cols[i]["columnType"].ToString() === "bytea";
        }
        private isTimestamptz(i: number) {
            return this.cols[i]["columnType"].ToString() === "timestamptz";
        }
        //
        // Summary:
        //     Gets the value of the specified column in its native format.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     This method returns System.DBNull for null database columns.
        public GetValue(i: number) {
            let value: object = this.rows[this.rowIndex]["values"][i];
            if (isByteA(i)) {
                value = Convert.FromBase64String(value.ToString());
            }
            else if (isTimestamptz(i)) {
                if (value.ToString().Trim().Length === 0) {
                    value = this.start;
                }
                else {
                    value = this.start.AddMilliseconds(Convert.ToInt64(value.ToString())).ToLocalTime();
                }                
            }
            return value;
        }
        //
        // Summary:
        //     Populates an array of objects with the column values of the current row.
        //
        // Parameters:
        //   values:
        //     An array of System.Object into which to copy the attribute columns.
        //
        // Returns:
        //     The number of instances of System.Object in the array.
        public GetValues(values: object[]) {
            if (values === null) {
                throw new ArgumentNullException(nameof(values));
            CheckRow();

            let count: var = Math.Min(FieldCount, values.Length);
            for (var i = 0; i < count; i++) {
                values[i] = GetValue(i);
            return count;
        }
        //
        // Summary:
        //     Gets a value that indicates whether the column contains non-existent or missing
        //     values.
        //
        // Parameters:
        //   i:
        //     The zero-based column ordinal.
        //
        // Returns:
        //     true if the specified column value is equivalent to System.DBNull; otherwise
        //     false.
        public IsDBNull(i: number) {
        //
        // Summary:
        //     Advances the data reader to the next result, when reading the results of batch
        //     Transact-SQL statements.
        //
        // Returns:
        //     true if there are more result sets; otherwise false.
        public NextResult() {
            this.resultIndex += 1;
            return this.resultIndex < 2;
        }
        //
        // Summary:
        //     Advances the System.Data.SqlClient.SqlDataReader to the next record.
        //
        // Returns:
        //     true if there are more rows; otherwise false.
        public Read() {
            this.rowIndex += 1;
            return this.rowIndex < this.rows.Count;
        }

        public IsOnRow: boolean = null;=> -1 < this.rowIndex && this.rowIndex < this.rows.Count;

        void CheckRow()
        {
            if (!IsOnRow) {
                throw new InvalidOperationException("No row is available");
        }


    }    }
}
