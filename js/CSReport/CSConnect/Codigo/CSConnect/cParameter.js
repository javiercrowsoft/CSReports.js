(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {}; //@@@: namespace CSConnect
 //@@@: {
    globalObject.CSConnect.createCParameter = function() {

        const self = {}; //@@@: public class cParameter
        const C_MODULE = "cParameter"; //@@@: private const String C_MODULE = "cParameter";

        let m_name = ""; //@@@: private String m_name = "";
        let m_columnType = null; //@@@: private CSDataBase.csDataType m_columnType;
        let m_value = ""; //@@@: private String m_value = "";
        let m_position = 0; //@@@: private int m_position = 0;
        let m_key = ""; //@@@: private String m_key = "";
        let m_hasDefault = null; //@@@: private bool m_hasDefault;
        let m_default = ""; //@@@: private String m_default = "";
        let m_isNullable = true; //@@@: private bool m_isNullable = true;
        let m_maxLength = 0; //@@@: private int m_maxLength = 0;

        self.getKey = function() { //@@@: public String getKey()
            return m_key; //@@@: return m_key;
        }; //@@@: }

        self.setKey = function(rhs) { //@@@: public void setKey(String rhs)
            m_key = rhs; //@@@: m_key = rhs;
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getColumnType = function() { //@@@: public CSDataBase.csDataType getColumnType()
            return m_columnType; //@@@: return m_columnType;
        }; //@@@: }

        self.setColumnType = function(rhs) { //@@@: public void setColumnType(CSDataBase.csDataType rhs)
            m_columnType = rhs; //@@@: m_columnType = rhs;
        }; //@@@: }

        self.getValue = function() { //@@@: public String getValue()
            return m_value; //@@@: return m_value;
        }; //@@@: }

        self.setValue = function(rhs) { //@@@: public void setValue(String rhs)
            m_value = rhs; //@@@: m_value = rhs;
        }; //@@@: }

        self.getPosition = function() { //@@@: public int getPosition()
            return m_position; //@@@: return m_position;
        }; //@@@: }

        self.setPosition = function(rhs) { //@@@: public void setPosition(int rhs)
            m_position = rhs; //@@@: m_position = rhs;
        }; //@@@: }

        self.getHasDefault = function() { //@@@: public bool getHasDefault()
            return m_hasDefault; //@@@: return m_hasDefault;
        }; //@@@: }

        self.setHasDefault = function(rhs) { //@@@: public void setHasDefault(bool rhs)
            m_hasDefault = rhs; //@@@: m_hasDefault = rhs;
        }; //@@@: }

        self.getDefaultValue = function() { //@@@: public String getDefaultValue()
            return m_default; //@@@: return m_default;
        }; //@@@: }

        self.setDefaultValue = function(rhs) { //@@@: public void setDefaultValue(String rhs)
            m_default = rhs; //@@@: m_default = rhs;
        }; //@@@: }

        self.getIsNullable = function() { //@@@: public bool getIsNullable()
            return m_isNullable; //@@@: return m_isNullable;
        }; //@@@: }

        self.setIsNullable = function(rhs) { //@@@: public void setIsNullable(bool rhs)
            m_isNullable = rhs; //@@@: m_isNullable = rhs;
        }; //@@@: }

        self.getMaxLength = function() { //@@@: public int getMaxLength()
            return m_maxLength; //@@@: return m_maxLength;
        }; //@@@: }

        self.setMaxLength = function(rhs) { //@@@: public void setMaxLength(int rhs)
            m_maxLength = rhs; //@@@: m_maxLength = rhs;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
