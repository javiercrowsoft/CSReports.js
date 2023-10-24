namespace CSDatabase {

    export interface DbCommand {

        executeReader(): DbDataReader;
        commandType: CommandType;
        commandTimeout: number;
    }

    export enum CommandType
    {
        //
        // Summary:
        //     An SQL text command. (Default.)
        Text = 1,
        //
        // Summary:
        //     The name of a stored procedure.
        StoredProcedure = 4,
        //
        // Summary:
        //     The name of a table.
        TableDirect = 0x200
    }
}