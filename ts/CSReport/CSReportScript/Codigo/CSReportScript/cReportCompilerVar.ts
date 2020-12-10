(function(globalObject) {

    globalObject.CSReportScript = globalObject.CSReportScript || {};

    globalObject.CSReportScript.createCReportCompilerVar = function() {

        // @ts-ignore
        let self: CSReportScript.IcReportCompilerVar = {};

        let m_value: object = null;

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


namespace CSReportScript {

  export interface IcReportCompilerVar {

    getValue: () => object;
    setValue: (object) => void;
  }
}
