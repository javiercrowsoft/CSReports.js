(function(globalObject) {

    globalObject.CSXml = globalObject.CSXml || {};



    globalObject.CSXml.createCXmlProperty = function() {

        const self = {};
        const c_module: string= "cXmlProperty";

        let m_name: string= "";
        let m_value: string= "";
        let m_parent: string= "";
        let m_binaryValue: object= null;

UNKNOWN >>         public object binaryValue
        {
UNKNOWN >>             get { return m_binaryValue; }
UNKNOWN >>             set
            {
                if (value === null) {
                    m_binaryValue = null;
                }
                else {
                    let t: Type= value.GetType();
                    if (t.IsArray) {
                        let valueArray: byte[]= value;
                        let newArray: byte[]= new byte[valueArray.Length];
                        Array.Copy(valueArray, newArray, valueArray.Length);
                        m_binaryValue = newArray;
                    }
                    else {
                        m_binaryValue = null;
                    }
                }
            }
        };

UNKNOWN >>         public string name
        {
UNKNOWN >>             get { return m_name; }
UNKNOWN >>             set { m_name = value; }
        }

        self.getName = function() {
            return m_name;
        };

        self.setName = function(value) {
            m_name = value;
        };

        self.getValueInt = function(type) {
            return Convert.ToInt32(getValue(type));
        };

        self.getValueString = function(type) {
            return getValue(type);
        };

        self.getValueBool = function(type) {
            return (getValue(type) !== 0);
        };

        self.getValue = function(type) {
            switch (type)
            {
                case eTypes.eBoolean:
                    switch (m_value.ToLower())
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
                    if (cDateUtils.isDate(m_value)) {
                        return m_value;
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
                    if (double.TryParse(m_value, dummy)) {
                        return m_value;
                    }
                    else {
                        return 0;
                    }
                case eTypes.eText:
                case eTypes.eVariant:
                case eTypes.eCuit:
                    return m_value;
                default:
                    return m_value;
            }
        };

        self.setValue = function(type, value) {
            if (type === eTypes.eBoolean) {
                m_value = value ? "-1" : "0";
            }
            else if (type === eTypes.eInteger) {
                m_value = Convert.ToInt64(value).ToString();
            }
            else {
                m_value = value.ToString();
            }
        };

        self.setValue = function(value) {
            let t: Type= value.GetType();
            if (typeof(bool) === t) {
                m_value = value ? "-1" : "0";
            }
            else {
                m_value = value.ToString();
            }
        };

        self.getBinaryValue = function() {
            return m_binaryValue; 
        };

        self.setBinaryValue = function(value) {
            binaryValue = value;
        };

UNKNOWN >>         public string parent
        {
UNKNOWN >>             get { return m_parent; }
UNKNOWN >>             set { m_parent = value; }
        }

        return self;

    }

}(globalObject));
