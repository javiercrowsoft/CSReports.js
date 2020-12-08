(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportFormulaParameter = function() {

        const self = {}; //@@@: public class cReportFormulaParameter
        const C_MODULE = "cReportFormulaParameter"; //@@@: private const String C_MODULE = "cReportFormulaParameter";

        let m_value = ""; //@@@: private String m_value = "";

        self.getValue = function() { //@@@: public String getValue()
            return m_value; //@@@: return m_value;
        }; //@@@: }

        self.setValue = function(rhs) { //@@@: public void setValue(String rhs)
            m_value = rhs; //@@@: m_value = rhs;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
