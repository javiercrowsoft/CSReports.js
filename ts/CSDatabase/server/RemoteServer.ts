namespace CSDatabase {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;

    export class RemoteServer implements IReportServer {

        private serverUrl: string;
        private apiKey: string;
        private secret: string;

        public constructor(serverUrl: string, apiKey: string) {
            this.serverUrl = serverUrl;
            this.apiKey = apiKey;
        }

        getServerUrl() {
            return this.serverUrl;
        }

        listDataSources(): Promise<DataSource[]> {
            return this.callApi(
                this.serverUrl +'/data-sources',
                (data) => data as DataSource[]);
        }

        execute(ds: DataSource): Promise<ServerDataSource> {
            return this.callApi(
                this.serverUrl +'/data-sources/' + ds.code + '?' + this.queryParam(ds.params),
                (data) => data as DataSource);
        }

        queryParam(params: Param[]) {
            let queryString = ""
            for(let i = 0; i < params.length; i++) {
                queryString += encodeURIComponent(params[i].name) + '=' + encodeURIComponent(params[i].value) + '&';
             }
             return queryString;
        }

        private callApi(url: string, f: (response: any) => any) {
            return this.getHeaders().then(P.call(this, (headers) => {
                return fetch(url, {method: 'GET', headers: headers}).then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        debugger;
                        return Promise.reject(response);
                    }
                }).then(f);
            }));
        }

        private getHeaders(): Promise<HeadersInit> {
            if(this.secret && this.secret !== "") {
                const headers = {'api-key': this.apiKey, 'secret': this.secret, "Content-Type": "application/json"};
                return P._(headers);
            }
            else {
                return U.getInput("",
                                "Input the password to connect to " + this.getServerUrl(),
                                "API Secret",
                                "password").then(P.call(this,
                    (result) => {
                        if(result.success) {
                            this.secret = result.value;
                            return {'api-key': this.apiKey, 'secret': this.secret};
                        }
                    }));
            }
        }
    }
}