namespace CSDataBase {

    export class JSONServer {

        private dataSources: JSONDataSources = new JSONDataSources();

        public registerDataSource(dataSource: JSONDataSource, name: string) {
            this.dataSources.add(dataSource, name.toLowerCase());
        }

        public getDataSource(name: string) {
            return this.dataSources.item(name.toLowerCase());
        }
    }

    export class JSONServerConnection {

        private readonly connectionString: string;

        public constructor(connectionString: string = "") {
            this.connectionString = connectionString;
        }
    }
}
