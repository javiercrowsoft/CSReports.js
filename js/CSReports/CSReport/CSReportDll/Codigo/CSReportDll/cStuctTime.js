(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCStructTime = function() {

        const self = {}; //@@@: public class cStructTime

        let m_hour = 0; //@@@: private int m_hour = 0;
        let m_minute = 0; //@@@: private int m_minute = 0;
        let m_second = 0; //@@@: private int m_second = 0;

        self.getHour = function() { //@@@: public int getHour()
            return m_hour; //@@@: return m_hour;
        }; //@@@: }

        self.setHour = function(rhs) { //@@@: public void setHour(int rhs)
            m_hour = rhs; //@@@: m_hour = rhs;
        }; //@@@: }

        self.getMinute = function() { //@@@: public int getMinute()
            return m_minute; //@@@: return m_minute;
        }; //@@@: }

        self.setMinute = function(rhs) { //@@@: public void setMinute(int rhs)
            m_minute = rhs; //@@@: m_minute = rhs;
        }; //@@@: }

        self.getSecond = function() { //@@@: public int getSecond()
            return m_second; //@@@: return m_second;
        }; //@@@: }

        self.setSecond = function(rhs) { //@@@: public void setSecond(int rhs)
            m_second = rhs; //@@@: m_second = rhs;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
