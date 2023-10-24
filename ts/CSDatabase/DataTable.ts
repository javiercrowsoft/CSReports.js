namespace CSDatabase {

    export class DataTable {

        public columns: DataColumn[] = [];
        public rows: any[][] = [];

        public load(dr: CSDatabase.DbDataReader) {
            for(let i = 0; i < dr.fieldCount(); i++) {
                this.columns.push(new DataColumn(dr.getName(i), dr.getColumnType(i)));
            }

            while(dr.read()) {
                const row = [];
                dr.getValues(row);
                this.rows.push(row);
            }
        }

        getFieldCount() {
            return this.columns.length;
        }

        getColumnName(i: number): string {
            return this.columns[i].getName();
        }

        getFieldType(i: number): CSDatabase.csDataType {
            switch(this.columns[i].getDataType()) {
                case DataType.dbDate:
                    return csDataType.CS_TD_DATE;
                case DataType.dbImage:
                    return csDataType.CS_TD_LONGVARBINARY;
                case DataType.dbNumber:
                    return csDataType.CS_TD_NUMERIC;
                case DataType.dbText:
                    return csDataType.CS_TD_VARCHAR;
            }
        }

        getRows() {
            return this.rows;
        }
    }

    export enum DataType {
        dbImage = 1,
        dbNumber = 2,
        dbText = 3,
        dbDate = 4
    }

    export class DataColumn {

        private readonly name: string;
        private readonly dataType: DataType;

        constructor(name: string, dataType: DataType) {
            this.name = name;
            this.dataType = dataType;
        }

        public getName() {
            return this.name;
        }

        public getDataType() {
            return this.dataType;
        }
    }
}
