namespace CSDatabase {

    const K_SERVER_URL = "SERVER_URL";

    export class ServerConnection {

        private server: IReportServer;

        public getServerUrl() {
            return localStorage.getItem(K_SERVER_URL) || "";
        }

        public setServerUrl(url: string) {
            localStorage.setItem(K_SERVER_URL, url);
        }

    }

}