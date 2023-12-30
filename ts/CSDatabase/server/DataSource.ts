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

        constructor(name: string, params: Param[], url: string) {
            this.name = name;
            this.params = params;
            this.url = url;
        }

        getId() {
            return this.name +"."+ this.getParamsInfo();
        }

        getParamsInfo() {
            return this.params.map(p => p.name + " " + p.type).join(", ");
        }

        getStringConnection() {
            return this.url + "/" + this.name;
        }

        static load(url: string, dataSource: DataSource) {
            return new DataSource(dataSource.name, dataSource.params, url);
        }

        static fromArray(dataSources: DataSource[], url: string) {
            return dataSources.map(d => this.load(url, d));
        }
    }
}