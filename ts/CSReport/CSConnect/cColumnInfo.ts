namespace CSConnect {

    export class cColumnInfo {

        private name: string = "";
        private columnType: CSDatabase.csDataType = null;

        private position: number = 0;
        private key: string = "";

        public getKey() {
            return this.key;
        }

        public setKey(rhs: string) {
            this.key = rhs;
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getColumnType() {
            return this.columnType;
        }

        public setColumnType(rhs: CSDatabase.csDataType) {
            this.columnType = rhs;
        }

        public getPosition() {
            return this.position;
        }

        public setPosition(rhs: number) {
            this.position = rhs;
        }
    }
}
