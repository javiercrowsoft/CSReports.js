(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCStructTime = function() {

        // @ts-ignore
        let self: CSReportDll.IcStructTime = {};

        let m_hour: number = 0;
        let m_minute: number = 0;
        let m_second: number = 0;

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

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcStructTime {

    getHour: () => int;
    setHour: (int) => void;
    getMinute: () => int;
    setMinute: (int) => void;
    getSecond: () => int;
    setSecond: (int) => void;
  }
}
