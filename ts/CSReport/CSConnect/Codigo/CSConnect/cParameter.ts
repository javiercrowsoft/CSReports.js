(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {};

    globalObject.CSConnect.createCParameter = function() {

        const self = {};
        const C_MODULE: string= "cParameter";

        let m_name: string= "";
        let m_columnType: CSDataBase.csDataType = null;
        let m_value: string= "";
        let m_position: number= 0;
        let m_key: string= "";
        let m_hasDefault: boolean = null;
        let m_default: string= "";
        let m_isNullable: boolean= true;
        let m_maxLength: number= 0;

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

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        self.getPosition = function() {
            return m_position;
        };

        self.setPosition = function(rhs) {
            m_position = rhs;
        };

        self.getHasDefault = function() {
            return m_hasDefault;
        };

        self.setHasDefault = function(rhs) {
            m_hasDefault = rhs;
        };

        self.getDefaultValue = function() {
            return m_default;
        };

        self.setDefaultValue = function(rhs) {
            m_default = rhs;
        };

        self.getIsNullable = function() {
            return m_isNullable;
        };

        self.setIsNullable = function(rhs) {
            m_isNullable = rhs;
        };

        self.getMaxLength = function() {
            return m_maxLength;
        };

        self.setMaxLength = function(rhs) {
            m_maxLength = rhs;
        };
        return self;

    }
}(globalObject));
