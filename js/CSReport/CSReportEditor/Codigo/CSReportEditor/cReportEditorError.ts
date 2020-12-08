(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

UNKNOWN >>     class cReportEditorError
    {
        self.errGetDescript = function(rptErrCode) {
            const  = function() {
                case csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID:
                    return "The section type of the section argument passed to function getHeightOfSectionsBellowMe is not valid.";
                default:
                    return "There is not information for this error";
            }
        };
    }

UNKNOWN >>     public enum csRptEditorErrors
    {
        CSRPT_EDITOR_SECTION_TYPE_INVALID = 2001
    }
}
