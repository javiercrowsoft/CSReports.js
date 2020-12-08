(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {};


    globalObject.CSConnect.createCColumnInfo = function() {

        const self = {};

        const C_MODULE = "cColumnInfo";

        let m_name = "";
        let m_columnType = null;

        // TODO: remove me
        // private String m_value = "";
        let m_position = 0;
        let m_key = "";

        self.getKey = function() {
            return m_key;
        };

        self.setKey = function(rhs) {
            m_key = rhs;
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getColumnType = function() {
            return m_columnType;
        };

        self.setColumnType = function(rhs) {
            m_columnType = rhs;
        };
        // TODO: remove me
        /*
        public String getValue()
        {
            return m_value;
        }

        public void setValue(String rhs)
        {
            m_value = rhs;
        }
        */
        self.getPosition = function() {
            return m_position;
        };

        self.setPosition = function(rhs) {
            m_position = rhs;
        };
        return self;

    }

}(globalObject));
