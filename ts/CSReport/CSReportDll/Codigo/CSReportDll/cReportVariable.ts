(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportVariable = function() {

        const self = {};
        const C_MODULE: string= "cReportVariable";
        let m_value: object= null;

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        return self;

    }

}(globalObject));
