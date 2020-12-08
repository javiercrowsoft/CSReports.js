(function(globalObject) {

    globalObject.CSReportScript = globalObject.CSReportScript || {}; //@@@: namespace CSReportScript
 //@@@: {
    globalObject.CSReportScript.createCReportCompilerVar = function() {

        const self = {}; //@@@: public class cReportCompilerVar

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
