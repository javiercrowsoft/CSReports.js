namespace CSDatabase {

    export interface DbConnection {

        connectionString(): string;
        setConnectionString(strConnect: string): void;
        open(): void;
        close(): void;
    }
}