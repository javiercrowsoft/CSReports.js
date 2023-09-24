namespace CSXml {

    import eTypes = CSKernelClient.eTypes;
    import cDateUtils = CSKernelClient.cDateUtils;

    export class cXmlProperty {

        private name: string = "";
        private value: string = "";
        private parent: string = "";
        private binaryValue: any = null;

        public getBinaryValue() {
            return this.binaryValue;
        }

        public setBinaryValue(value) {
            if (value === null) {
                this.binaryValue = null;
            }
            else {
                if (Array.isArray(value)) {
                    let valueArray: Uint8Array[] = value;
                    let newArray = [...valueArray];
                    this.binaryValue = newArray;
                }
                else if(value instanceof ArrayBuffer) {
                    this.binaryValue = new Uint8Array(value);
                }
                else {
                    this.binaryValue = null;
                }
            }
        }

        public getName() {
            return this.name;
        }

        public setName(value: string) {
            this.name = value;
        }

        public getValueInt(type: eTypes) {
            return Math.trunc(this.getValue(type));
        }

        public getValueString(type: eTypes) {
            return this.getValue(type);
        }

        public getValueBool(type: eTypes) {
            return (this.getValue(type) !== 0);
        }

        public getValue(type: eTypes): any {
            switch (type)
            {
                case eTypes.eBoolean:
                    switch (this.value.toLowerCase())
                    {
                        case "true":
                        case "verdadero":
                        case "-1":
                        case "1":
                            return -1;
                        //"False":
                        //"Falso":
                        // or any other value is FALSE
                        default:
                            return 0;
                    }
                case eTypes.eDate:
                case eTypes.eDateOrNull:
                    if (cDateUtils.isDate(this.value)) {
                        return this.value;
                    }
                    else {
                        return 0;
                    }
                case eTypes.eLong:
                case eTypes.eInteger:
                case eTypes.eId:
                case eTypes.eSingle:
                case eTypes.eCurrency:
                    if (! Number.isNaN(this.value as any) ) {
                        return  Number(this.value);
                    }
                    else {
                        return 0;
                    }
                case eTypes.eText:
                case eTypes.eVariant:
                case eTypes.eCuit:
                    return this.value;
                default:
                    return this.value;
            }
        }

        public setValue(type: eTypes, value: any) {
            if (type === eTypes.eBoolean) {
                this.value = value ? "-1" : "0";
            }
            else if (type === eTypes.eInteger) {
                this.value = parseInt(value).toString();
            }
            else {
                this.value = value.toString();
            }
        }

        public setValue2(value: object) {
            if (typeof value === "boolean") {
                this.value = value ? "-1" : "0";
            }
            else {
                this.value = value.toString();
            }
        }

        public getParent() {
            return this.parent;
        }

        public setParent(parent) {
            this.parent = parent;
        }
    }
}
