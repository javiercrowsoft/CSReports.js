(function(globalObject) {

    globalObject.CSReportScript = globalObject.CSReportScript || {};

    globalObject.CSReportScript.createCReportCompilerVar = function() {

        const self = {};

        let m_value = null;

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        return self;

    }

}(globalObject));
