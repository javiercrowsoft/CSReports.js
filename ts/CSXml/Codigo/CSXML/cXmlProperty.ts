

namespace CSXml
{


    export class cXmlProperty {


    {
        private c_module: string = "cXmlProperty";

        private name: string = "";
        private value: string = "";
        private parent: string = "";
        private binaryValue: object = null;

UNKNOWN >>         public object binaryValue
        {
UNKNOWN >>             get { return this.binaryValue; }
UNKNOWN >>             set
            {
                if (value === null) {
                    this.binaryValue = null;
                }
                else {
                    let t: Type = value.GetType();
                    if (t.IsArray) {
                        let valueArray: byte[] = value;
                        let newArray: byte[] = new byte[valueArray.Length];
                        Array.Copy(valueArray, newArray, valueArray.Length);
                        this.binaryValue = newArray;
                    }
                    else {
                        this.binaryValue = null;
                    }
                }
            }
        }

UNKNOWN >>         public string name
        {
UNKNOWN >>             get { return this.name; }
UNKNOWN >>             set { this.name = value; }
        }

        public getName() {
            return this.name;
        }

        public setName(value: string) {
            this.name = value;
        }

        public getValueInt(type: eTypes) {
            return Convert.ToInt32(getValue(type));
        }

        public getValueString(type: eTypes) {
            return getValue(type);
        }

        public getValueBool(type: eTypes) {
            return (getValue(type) !== 0);
        }

        public getValue(type: eTypes) {
            switch (type)
            {
                case eTypes.eBoolean:
                    switch (this.value.ToLower())
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
                    double dummy; {
                    if (double.TryParse(this.value, dummy)) {
                        return this.value;
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

        public setValue(type: eTypes, value: object) {
            if (type === eTypes.eBoolean) {
                this.value = value ? "-1" : "0";
            }
            else if (type === eTypes.eInteger) {
                this.value = Convert.ToInt64(value).ToString();
            }
            else {
                this.value = value.ToString();
            }
        }

        public setValue(value: object) {
            let t: Type = value.GetType();
            if (typeof(bool) === t) {
                this.value = value ? "-1" : "0";
            }
            else {
                this.value = value.ToString();
            }
        }

        public getBinaryValue() {
            return this.binaryValue; 
        }

        public setBinaryValue(value: byte[]) {
            binaryValue = value;
        }

UNKNOWN >>         public string parent
        {
UNKNOWN >>             get { return this.parent; }
UNKNOWN >>             set { this.parent = value; }
        }



    }    }



}
