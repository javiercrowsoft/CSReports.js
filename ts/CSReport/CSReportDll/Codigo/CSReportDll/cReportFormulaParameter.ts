(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportFormulaParameter = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportFormulaParameter = {};
        const C_MODULE: string = "cReportFormulaParameter";

        let m_value: string = "";

        self.getValue = function() {
            return m_value;
        };

        self.setValue = function(rhs) {
            m_value = rhs;
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportDll {

  export interface IcReportFormulaParameter {

    getValue: () => String;
    setValue: (String) => void;
  }
}
