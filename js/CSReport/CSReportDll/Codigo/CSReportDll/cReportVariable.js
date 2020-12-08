(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportVariable = function() {

        const self = {}; //@@@: public class cReportVariable
        const C_MODULE = "cReportVariable"; //@@@: private const String C_MODULE = "cReportVariable";
        let m_value = null; //@@@: private object m_value = null;

        self.getValue = function() { //@@@: public object getValue()
            return m_value; //@@@: return m_value;
        }; //@@@: }

        self.setValue = function(rhs) { //@@@: public void setValue(object rhs)
            m_value = rhs; //@@@: m_value = rhs;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
