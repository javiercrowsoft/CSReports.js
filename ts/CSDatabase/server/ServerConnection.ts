namespace CSDatabase {

    import P = CSKernelClient.Callable;

    const K_SERVER_URL = "SERVER_URL";
    const K_API_KEY = "API_KEY";

    export class ServerConnection {

        private server: IReportServer = null;

        private formDataSources: FormDataSources = new FormDataSources();
        private formSettings: FormSettings = new FormSettings();

        public getServerUrl() {
            return localStorage.getItem(K_SERVER_URL) || "";
        }

        public getApiKey() {
            return localStorage.getItem(K_API_KEY) || "";
        }

        selectDataSource() {
            return this.getServer().listDataSources().then(P.call(this, (dataSources) => {
                return this.formDataSources.showModal(DataSource.fromArray(dataSources, this.getServerUrl()));
            }));
        }

        getDataSourceInfo(dataSource: string) {
            return this.getServer().listDataSources().then(P.call(this, (dataSources) => {
                const {name} = this.extractDatasourceName(dataSource);
                return DataSource.fromArray(dataSources, this.getServerUrl()).find(d => d.name === name);
            }));
        }

        private extractDatasourceName(dataSource: string) {
            const arr = dataSource.split("/");
            const name = arr.pop();
            const url = arr.join("/");
            return {name, url};
        }

        excute(dataSource: string, params: CSConnect.cParameters) {
            const {name, url} = this.extractDatasourceName(dataSource);
            const ds = new DataSource(
                name,
                params.getValues().map(p => { return {
                        name: p.getName(),
                        type: p.getColumnType().toString(),
                        value: p.getValue()
                    }}),
                url);
            return this.getServer().execute(ds);
        }


        private getServer() {
            const serverUrl = this.getServerUrl();
            if(this.server === null || this.server.getServerUrl() !== serverUrl) {
                if(serverUrl === 'local') {
                    this.server = new LocalServer();
                }
                else {
                    this.server = new RemoteServer(serverUrl, this.getApiKey());
                }
            }
            return this.server;
        }

        public editSettings() {
            return this.formSettings.showModal().then(P.call(this, (result)=> {
                if(result.success) {
                    localStorage.setItem(K_SERVER_URL, result.url);
                    localStorage.setItem(K_API_KEY, result.apiKey);
                };
            }));
        }
    }

}