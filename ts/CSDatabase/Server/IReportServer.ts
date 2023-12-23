namespace CSDatabase {

    export interface IReportServer {

        listDataSources(): Promise<DataSource[]>; // All objects in this list have DataSource.data => null
        execute(ds: DataSource): Promise<DataSource>;
    }

}