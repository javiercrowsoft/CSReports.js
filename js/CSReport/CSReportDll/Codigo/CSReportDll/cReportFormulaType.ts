(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportFormulaType = function() {

        const self = {};
        let m_name = "";
        let m_nameUser = "";
        let m_id = 0;
        let m_decrip = "";
        let m_helpContextId = 0;

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getNameUser = function() {
            return m_nameUser;
        };

        self.setNameUser = function(rhs) {
            m_nameUser = rhs;
        };

        self.getId = function() {
            return m_id;
        };

        self.setId = function(rhs) {
            m_id = rhs;
        };

        self.getDecrip = function() {
            return m_decrip;
        };

        self.setDecrip = function(rhs) {
            m_decrip = rhs;
        };

        self.getHelpContextId = function() {
            return m_helpContextId;
        };

        self.setHelpContextId = function(rhs) {
            m_helpContextId = rhs;
        };

        self.setHelpContextId = function(rhs) {
            m_helpContextId = rhs;
        };

        return self;

    }

}(globalObject));
