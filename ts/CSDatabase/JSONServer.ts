namespace CSDatabase {

    export class JSONServer {

        private static dataSources: JSONDataSources = new JSONDataSources();

        public static registerDataSource(dataSource: JSONDataSource, name: string) {
            this.dataSources.add(dataSource, name.toLowerCase());
        }

        public static getDataSource(name: string): JSONDataSource {
            return this.dataSources.item(name.toLowerCase());
        }
    }

    export class JSONServerConnection implements DbConnection {

        private _connectionString: string;

        public constructor(connectionString: string = "") {
            this._connectionString = connectionString;
        }

        public connectionString(): string {
            return this._connectionString;
        }

        public setConnectionString(strConnect: string) {
            this._connectionString = strConnect;
        }

        public open() {}
        public close() {}
    }
}
