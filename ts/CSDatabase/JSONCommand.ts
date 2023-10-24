///<reference path="../CSOAPI/ArgumentException.ts"/>

namespace CSDatabase {

    import ArgumentException = CSOAPI.ArgumentException;

    export class JSONCommand implements DbCommand {

        private readonly cmdText: string = "";
        private connection: JSONServerConnection = null;

        public commandType: CommandType;
        public commandTimeout: number;

        public constructor(cmdText: string = "", connection: JSONServerConnection = null) {
            this.cmdText = cmdText;
            this.connection = connection;
        }

        public executeReader() {
            let cmdName: string = this.getCommandName();
            let data: JSONDataSource = JSONServer.getDataSource(this.connection.connectionString() + "." + cmdName);
            return new JSONDataReader(data);
        }

        public executeDbDataReader() {
            return this.executeReader();
        }

        private getCommandName() {
            let cmdText: string = this.cmdText;
            let startIndex: number = cmdText.indexOf("exec");

            if(startIndex < 0) {
                throw new ArgumentException("The command text for this command object is invalid. Format must be 'exec [SP_NAME] parathis.list");
            }

            startIndex += 5;

            cmdText = cmdText.substring(startIndex);
            let length: number = cmdText.indexOf(" ", 1);

            return cmdText.substring(0, length).replace("[","").replace("]","");
        }
    }
}
