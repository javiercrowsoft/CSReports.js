

namespace CSConnect
{
    export class cParameter {


    {
        private C_MODULE: string = "cParameter";

        private name: string = "";
        private columnType: CSDataBase.csDataType = null;
        private value: string = "";
        private position: number = 0;
        private key: string = "";
        private hasDefault: boolean = null;
        private default: string = "";
        private isNullable: boolean = true;
        private maxLength: number = 0;

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

        public getValue() {
            return this.value;
        }

        public setValue(rhs: string) {
            this.value = rhs;
        }

        public getPosition() {
            return this.position;
        }

        public setPosition(rhs: number) {
            this.position = rhs;
        }

        public getHasDefault() {
            return this.hasDefault;
        }

        public setHasDefault(rhs: boolean) {
            this.hasDefault = rhs;
        }

        public getDefaultValue() {
            return this.default;
        }

        public setDefaultValue(rhs: string) {
            this.default = rhs;
        }

        public getIsNullable() {
            return this.isNullable;
        }

        public setIsNullable(rhs: boolean) {
            this.isNullable = rhs;
        }

        public getMaxLength() {
            return this.maxLength;
        }

        public setMaxLength(rhs: number) {
            this.maxLength = rhs;
        }


    } 
}
