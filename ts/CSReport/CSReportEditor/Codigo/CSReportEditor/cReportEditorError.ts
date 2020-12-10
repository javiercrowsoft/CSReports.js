(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createCReportEditorError = function() {

        // @ts-ignore
        let self: CSReportEditor.IcReportEditorError = {};
        self.errGetDescript = function(rptErrCode) {
            switch (rptErrCode)
            {
                case csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID:
                    return "The section type of the section argument passed to function getHeightOfSectionsBellowMe is not valid.";
                default:
                    return "There is not information for this error";
            }
        };
        return self;

    }    }
        return self;


        return self;

    public enum csRptEditorErrorsUNKNOWN >>     public enum csRptEditorErrors
    {
        CSRPT_EDITOR_SECTION_TYPE_INVALID = 2001
        return self;

    }    }
}(globalObject));


namespace CSReportEditor {

  export interface IcReportEditorError {

    errGetDescript: (csRptEditorErrors) => String;
  }
}
