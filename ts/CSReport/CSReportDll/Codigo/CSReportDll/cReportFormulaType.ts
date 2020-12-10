(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportFormulaType = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportFormulaType = {};
        let m_name: string = "";
        let m_nameUser: string = "";
        let m_id: csRptFormulaType = 0;
        let m_decrip: string = "";
        let m_helpContextId: number = 0;

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

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportFormulaType {

    getName: () => String;
    setName: (String) => void;
    getNameUser: () => String;
    setNameUser: (String) => void;
    getId: () => csRptFormulaType;
    setId: (csRptFormulaType) => void;
    getDecrip: () => String;
    setDecrip: (String) => void;
    getHelpContextId: () => int;
    setHelpContextId: (csRptFormulaType) => void;
    setHelpContextId: (int) => void;
  }
}
