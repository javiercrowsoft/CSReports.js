(function(globalObject) {

    globalObject.CSXml = globalObject.CSXml || {}; //@@@: namespace CSXml
 //@@@: {


    globalObject.CSXml.createCXmlProperty = function() {

        const self = {}; //@@@: public class cXmlProperty
        const c_module = "cXmlProperty"; //@@@: private const string c_module = "cXmlProperty";

        let m_name = ""; //@@@: private string m_name = "";
        let m_value = ""; //@@@: private string m_value = "";
        let m_parent = ""; //@@@: private string m_parent = "";
        let m_binaryValue = null; //@@@: private object m_binaryValue = null;

UNKNOWN >>         public object binaryValue //@@@: public object binaryValue
        { //@@@: {
UNKNOWN >>             get { return m_binaryValue; } //@@@: get { return m_binaryValue; }
UNKNOWN >>             set //@@@: set
            { //@@@: {
                if (value === null) { //@@@: if (value == null)
                    m_binaryValue = null; //@@@: m_binaryValue = null;
                } //@@@: }
                else { //@@@: else
                    let t = value.GetType(); //@@@: Type t = value.GetType();
                    if (t.IsArray) { //@@@: if (t.IsArray)
                        let valueArray = value; //@@@: byte[] valueArray = (byte[])value;
                        let newArray = new byte[valueArray.Length]; //@@@: byte[] newArray = new byte[valueArray.Length];
                        Array.Copy(valueArray, newArray, valueArray.Length); //@@@: Array.Copy(valueArray, newArray, valueArray.Length);
                        m_binaryValue = newArray; //@@@: m_binaryValue = newArray;
                    } //@@@: }
                    else { //@@@: else
                        m_binaryValue = null; //@@@: m_binaryValue = null;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

UNKNOWN >>         public string name //@@@: public string name
        { //@@@: {
UNKNOWN >>             get { return m_name; } //@@@: get { return m_name; }
UNKNOWN >>             set { m_name = value; } //@@@: set { m_name = value; }
        } //@@@: }

        self.getName = function() { //@@@: public string getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(value) { //@@@: public void setName(string value)
            m_name = value; //@@@: m_name = value;
        }; //@@@: }

        self.getValueInt = function(type) { //@@@: public int getValueInt(eTypes type)
            return Convert.ToInt32(getValue(type)); //@@@: return Convert.ToInt32(getValue(type));
        }; //@@@: }

        self.getValueString = function(type) { //@@@: public string getValueString(eTypes type)
            return getValue(type); //@@@: return (string)getValue(type);
        }; //@@@: }

        self.getValueBool = function(type) { //@@@: public bool getValueBool(eTypes type)
            return (getValue(type) !== 0); //@@@: return ((int)getValue(type) != 0);
        }; //@@@: }

        self.getValue = function(type) { //@@@: public object getValue(eTypes type)
            switch (type) //@@@: switch (type)
            { //@@@: {
                case eTypes.eBoolean: //@@@: case eTypes.eBoolean:
                    switch (m_value.ToLower()) //@@@: switch (m_value.ToLower())
                    { //@@@: {
                        case "true": //@@@: case "true":
                        case "verdadero": //@@@: case "verdadero":
                        case "-1": //@@@: case "-1":
                        case "1": //@@@: case "1":
                            return -1; //@@@: return -1;
                        //"False":
                        //"Falso":
                        // or any other value is FALSE
                        default: //@@@: default:
                            return 0; //@@@: return 0;
                    } //@@@: }
                case eTypes.eDate: //@@@: case eTypes.eDate:
                case eTypes.eDateOrNull: //@@@: case eTypes.eDateOrNull:
                    if (cDateUtils.isDate(m_value)) { //@@@: if (cDateUtils.isDate(m_value))
                        return m_value; //@@@: return m_value;
                    } //@@@: }
                    else { //@@@: else
                        return 0; //@@@: return 0;
                    } //@@@: }
                case eTypes.eLong: //@@@: case eTypes.eLong:
                case eTypes.eInteger: //@@@: case eTypes.eInteger:
                case eTypes.eId: //@@@: case eTypes.eId:
                case eTypes.eSingle: //@@@: case eTypes.eSingle:
                case eTypes.eCurrency: //@@@: case eTypes.eCurrency:
                    double dummy; { //@@@: double dummy;
                    if (double.TryParse(m_value, dummy)) { //@@@: if (double.TryParse(m_value, out dummy))
                        return m_value; //@@@: return m_value;
                    } //@@@: }
                    else { //@@@: else
                        return 0; //@@@: return 0;
                    } //@@@: }
                case eTypes.eText: //@@@: case eTypes.eText:
                case eTypes.eVariant: //@@@: case eTypes.eVariant:
                case eTypes.eCuit: //@@@: case eTypes.eCuit:
                    return m_value; //@@@: return m_value;
                default: //@@@: default:
                    return m_value; //@@@: return m_value;
            } //@@@: }
        }; //@@@: }

        self.setValue = function(type, value) { //@@@: public void setValue(eTypes type, object value)
            if (type === eTypes.eBoolean) { //@@@: if (type == eTypes.eBoolean)
                m_value = value ? "-1" : "0"; //@@@: m_value = (bool)value ? "-1" : "0";
            } //@@@: }
            else if (type === eTypes.eInteger) { //@@@: else if (type == eTypes.eInteger)
                m_value = Convert.ToInt64(value).ToString(); //@@@: m_value = Convert.ToInt64(value).ToString();
            } //@@@: }
            else { //@@@: else
                m_value = value.ToString(); //@@@: m_value = value.ToString();
            } //@@@: }
        }; //@@@: }

        self.setValue = function(value) { //@@@: public void setValue(object value)
            let t = value.GetType(); //@@@: Type t = value.GetType();
            if (typeof(bool) === t) { //@@@: if (typeof(bool) == t)
                m_value = value ? "-1" : "0"; //@@@: m_value = (bool)value ? "-1" : "0";
            } //@@@: }
            else { //@@@: else
                m_value = value.ToString(); //@@@: m_value = value.ToString();
            } //@@@: }
        }; //@@@: }

        self.getBinaryValue = function() { //@@@: public byte[] getBinaryValue()
            return m_binaryValue;  //@@@: return (byte[])m_binaryValue;
        }; //@@@: }

        self.setBinaryValue = function(value) { //@@@: public void setBinaryValue(byte[] value)
            binaryValue = value; //@@@: binaryValue = value;
        }; //@@@: }

UNKNOWN >>         public string parent //@@@: public string parent
        { //@@@: {
UNKNOWN >>             get { return m_parent; } //@@@: get { return m_parent; }
UNKNOWN >>             set { m_parent = value; } //@@@: set { m_parent = value; }
        } //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
