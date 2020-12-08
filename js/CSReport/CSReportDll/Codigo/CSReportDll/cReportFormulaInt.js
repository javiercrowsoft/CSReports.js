(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportFormulaInt = function() {

        const self = {}; //@@@: public class cReportFormulaInt

        const C_MODULE = "cReportFormulaInt"; //@@@: private const String C_MODULE = "cReportFormulaInt";

        let m_variables = new cReportVariables(); //@@@: private cReportVariables m_variables = new cReportVariables();
        let m_parameters = new cReportFormulaParameters(); //@@@: private cReportFormulaParameters m_parameters = new cReportFormulaParameters();
        let m_formulaType = 0; //@@@: private csRptFormulaType m_formulaType = 0;

        self.getVariables = function() { //@@@: internal cReportVariables getVariables()
            return m_variables; //@@@: return m_variables;
        }; //@@@: }

        self.getParameters = function() { //@@@: internal cReportFormulaParameters getParameters()
            return m_parameters; //@@@: return m_parameters;
        }; //@@@: }

        self.getFormulaType = function() { //@@@: public csRptFormulaType getFormulaType()
            return m_formulaType; //@@@: return m_formulaType;
        }; //@@@: }

        self.setFormulaType = function(rhs) { //@@@: public void setFormulaType(csRptFormulaType rhs)
            m_formulaType = rhs; //@@@: m_formulaType = rhs;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
