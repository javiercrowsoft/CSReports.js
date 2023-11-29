///<reference path="../CSOAPI/ArgumentException.ts"/>

namespace CSDatabase
{
    import ArgumentException = CSOAPI.ArgumentException;
    import ArgumentNullException = CSOAPI.ArgumentNullException;
    import InvalidOperationException = CSOAPI.InvalidOperationException;

    export class JSONDataReader implements DbDataReader {

        private dataSource: JSONDataSource = null;
        private cols = [];
        private readonly rows = [];

        private resultIndex: number = 0;
        private rowIndex: number = -1;
        private closed: boolean = false;
        private start: Date = new Date(1970, 1, 1, 0, 0, 0);

        public constructor(dataSource: JSONDataSource) {
            this.dataSource = dataSource;
            this.cols = this.dataSource.getData()["columns"];
            this.rows = this.dataSource.getData()["rows"];
        }

        public fieldCount() {
            return this.dataSource.getData()["columns"].length;
        }

        public hasRows(): boolean {
            return this.dataSource.getData()["rows"].length > 0;
        }

        public isClosed() {
            return this.closed;
        }

        public close() {
            // TODO: we should release resources here (unregister the datasource in JSONServer)
            this.closed = true;
        }

        public getName(i: number) {
            return this.cols[i]["name"].toString();
        }

        private getType(typeName: string, columnName: string): DataType {

            let type: DataType;

            switch (typeName.toLowerCase())
            {
                case "integer":
                case "int2":
                case "int4":
                case "smallint":
                case "biginteger":
                case "serial":
                case "bigserial":
                case "decimal":
                case "numeric":
                case "float8":
                case "float4":
                case "real":
                    type = DataType.dbNumber;
                    break;
                case "timestamp":
                case "timestamptz":
                case "date":
                case "time":
                    type = DataType.dbDate;
                    break;
                case "character":
                case "char":
                case "varchar":
                case "text":
                case "character varying":
                    type = DataType.dbText;
                    break;
                case "bytea":
                    type = DataType.dbImage;
                    break;
                default:
                    throw new ArgumentException("The data type for column " + columnName + " of data source " + this.dataSource.getName() + " is not supported");
            }
            return type;
        }

        public getColumnType(i: number) {
            return this.getType(this.cols[i]["columnType"].toString(), this.getName(i));
        }

        public getString(i: number) {
            return this.getValue(i).toString();
        }

        private isByteA(i: number) {
            return this.cols[i]["columnType"].toString() === "bytea";
        }

        private isTimestamptz(i: number) {
            return this.cols[i]["columnType"].toString() === "timestamptz";
        }

        /*private atob(value: string) {
            return value.split ('').map (function (c) { return c.charCodeAt (0); })
        }*/

        public getValue(i: number) {
            let value = this.rows[this.rowIndex]["values"][i];
            if(this.isTimestamptz(i)) {
                if(value.toString().trim().length === 0) {
                    value = this.start;
                }
                else {
                    value = new Date(value).toString();
                }
            }
            return value;
        }

        public getValues(values: object[]) {
            if(values === null) {
                throw new ArgumentNullException("values");
            }
            this.checkRow();
            let count: number = values.length === 0 ? this.fieldCount() : Math.min(this.fieldCount(), values.length);
            for(let i = 0; i < count; i++) {
                values.push(this.getValue(i));
            }
            return count;
        }

        public nextResult() {
            this.resultIndex += 1;
            return this.resultIndex < 1;
        }

        public read() {
            this.rowIndex += 1;
            return this.rowIndex < this.rows.length;
        }

        public isOnRow() {
            return -1 < this.rowIndex && this.rowIndex < this.rows.length;
        }

        private checkRow(): void {
            if(!this.isOnRow()) {
                throw new InvalidOperationException("No row is available");
            }
        }
    }
}
