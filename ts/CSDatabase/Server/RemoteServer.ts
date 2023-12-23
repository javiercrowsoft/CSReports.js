namespace CSDatabase {

    export class RemoteServer {

        listDataSources(): Promise<DataSource[]> {
            throw new Error("Method not implemented.");
        }

        execute(ds: DataSource): Promise<DataSource> {
            throw new Error("Method not implemented.");
        }
    }
}