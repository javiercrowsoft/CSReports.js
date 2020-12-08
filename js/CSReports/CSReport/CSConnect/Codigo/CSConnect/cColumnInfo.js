(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {}; //@@@: namespace CSConnect
 //@@@: {

    globalObject.CSConnect.createCColumnInfo = function() {

        const self = {}; //@@@: public class cColumnInfo

        const C_MODULE = "cColumnInfo"; //@@@: private const String C_MODULE = "cColumnInfo";

        let m_name = ""; //@@@: private String m_name = "";
        let m_columnType = null; //@@@: private CSDataBase.csDataType m_columnType;

        // TODO: remove me
        // private String m_value = "";
        let m_position = 0; //@@@: private int m_position = 0;
        let m_key = ""; //@@@: private String m_key = "";

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
        // TODO: remove me
        /* //@@@: /*
        public String getValue()
        {
            return m_value;
        }

        public void setValue(String rhs)
        {
            m_value = rhs;
        }
        */
        self.getPosition = function() { //@@@: public int getPosition()
            return m_position; //@@@: return m_position;
        }; //@@@: }

        self.setPosition = function(rhs) { //@@@: public void setPosition(int rhs)
            m_position = rhs; //@@@: m_position = rhs;
        }; //@@@: }
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
