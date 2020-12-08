(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportFormulaParameter = function() {

        const self = {};
        const C_MODULE: string= "cReportFormulaParameter";

        let m_value: string= "";

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        return self;

    }

}(globalObject));
