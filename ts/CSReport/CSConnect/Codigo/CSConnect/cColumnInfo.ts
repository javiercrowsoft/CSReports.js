

namespace CSConnect
{

    export class cColumnInfo {


    {

        private C_MODULE: string = "cColumnInfo";

        private name: string = "";
        private columnType: CSDataBase.csDataType = null;

        // TODO: remove me
        // private String this.value = "";
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

        public setColumnType(rhs: CSDataBase.csDataType) {
            this.columnType = rhs;
        }
        // TODO: remove me
        /*
        public String getValue()
        {
            return this.value;
        }

        public void setValue(String rhs)
        {
            this.value = rhs;
        }
        */
        public getPosition() {
            return this.position;
        }

        public setPosition(rhs: number) {
            this.position = rhs;
        }


    }    }



}
