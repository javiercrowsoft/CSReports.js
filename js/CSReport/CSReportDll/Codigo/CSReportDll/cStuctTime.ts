(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCStructTime = function() {

        const self = {};

        let m_hour = 0;
        let m_minute = 0;
        let m_second = 0;

        self.getHour = function() {
            return m_hour;
        };

        self.setHour = function(rhs) {
            m_hour = rhs;
        };

        self.getMinute = function() {
            return m_minute;
        };

        self.setMinute = function(rhs) {
            m_minute = rhs;
        };

        self.getSecond = function() {
            return m_second;
        };

        self.setSecond = function(rhs) {
            m_second = rhs;
        };

        return self;

    }

}(globalObject));
