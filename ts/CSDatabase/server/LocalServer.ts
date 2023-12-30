namespace CSDatabase {

    export class LocalServer implements IReportServer {

        getServerUrl() {
            return "local";
        }

        listDataSources(): Promise<DataSource[]> {
            throw new Error("Method not implemented.");
        }

        execute(ds: DataSource): Promise<DataSource> {
            throw new Error("Method not implemented.");
        }
    }
}