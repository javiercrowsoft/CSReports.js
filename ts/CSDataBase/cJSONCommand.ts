namespace CSDataBase {

    import ArgumentException = CSOAPI.ArgumentException;

    export class cJSONCommand {

        private readonly cmdText: string = "";
        private connection: cJSONServerConnection = null;

        public constructor(cmdText: string = "", connection: cJSONServerConnection = null) {
            this.cmdText = cmdText;
            this.connection = connection;
        }

        public executeReader(behavior: CommandBehavior) {
            let cmdName: string = this.getCommandName();
            let data: cJSONDataSource = cJSONServer.getDataSource(this.connection.ConnectionString + "." + cmdName);
            return new cJSONDataReader(data);
        }

        public executeDbDataReader(behavior: CommandBehavior) {
            return this.executeReader(behavior);
        }

        private getCommandName() {
            let cmdText: string = this.cmdText;
            let startIndex: number = cmdText.indexOf("exec");

            if (startIndex < 0) {
                throw new ArgumentException("The command text for this command object is invalid. Format must be 'exec [SP_NAME] parathis.list");
            }

            startIndex += 5;

            cmdText = cmdText.substring(startIndex);
            let length: number = cmdText.indexOf(" ", 1);

            return cmdText.substring(0, length).replace("[","").replace("]","");
        }
    }
}
