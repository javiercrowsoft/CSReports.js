(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {};

    globalObject.CSDataBase.createCJSONDataSource = function() {

        const self = {};
        let m_name = null;
        let m_data = null;

        const cJSONDataSource = function(name, data) {
            m_name = name;
            m_data = data;
        };

        self.getName = function() {
            return m_name;
        };

        self.getData = function() {
            return m_data;
        };
        return self;

    }
}(globalObject));