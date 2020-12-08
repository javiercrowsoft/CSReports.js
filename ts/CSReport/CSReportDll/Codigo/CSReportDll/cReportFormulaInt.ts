(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportFormulaInt = function() {

        const self = {};

        const C_MODULE: string= "cReportFormulaInt";

        let m_variables: cReportVariables= new cReportVariables();
        let m_parameters: cReportFormulaParameters= new cReportFormulaParameters();
        let m_formulaType: csRptFormulaType= 0;

        self.getVariables = function() {
            return m_variables;
        };

        self.getParameters = function() {
            return m_parameters;
        };

        self.getFormulaType = function() {
            return m_formulaType;
        };

        self.setFormulaType = function(rhs) {
            m_formulaType = rhs;
        };

        return self;

    }

}(globalObject));
