namespace CSDataBase {

    export class cJSONServer {

        private dataSources: cJSONDataSources = new cJSONDataSources();

        public registerDataSource(dataSource: cJSONDataSource, name: string) {
            this.dataSources.add(dataSource, name.toLowerCase());
        }

        public getDataSource(name: string) {
            return this.dataSources.item(name.toLowerCase());
        }
    }

    export class cJSONServerConnection {

        private readonly connectionString: string;

        public constructor(connectionString: string = "") {
            this.connectionString = connectionString;
        }
    }
}
