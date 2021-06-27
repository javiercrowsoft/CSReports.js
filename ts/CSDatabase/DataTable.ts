namespace CSDatabase {

    export class DataTable {

        public columns: DataColumn[];
        public rows: [[]];
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
