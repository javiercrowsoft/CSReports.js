namespace CSDatabase {

    class Param {
        name: string;
        type: string;
        value: string;
    }

    class Column {
        name: string;
        columnType: string;
    }

    class Row {
        values: any[]
    }

    class DataSet {
        columns: Column[];
        rows: Row[]
    }

    class Query {
        name: string;
        data: DataSet
    }

    export class DataSource {
        public url: string;
        public type: string;
        public title: string;
        public name: string;
        public code: string;
        public file: string;
        params: Param[];
        data: Query[];
    }
}