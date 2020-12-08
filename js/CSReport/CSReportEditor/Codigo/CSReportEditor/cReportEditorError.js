(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
UNKNOWN >>     class cReportEditorError //@@@: class cReportEditorError
    { //@@@: {
        self.errGetDescript = function(rptErrCode) { //@@@: public static String errGetDescript(csRptEditorErrors rptErrCode)
            const  = function() { //@@@: switch (rptErrCode)
                case csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID: //@@@: case csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID:
                    return "The section type of the section argument passed to function getHeightOfSectionsBellowMe is not valid."; //@@@: return "The section type of the section argument passed to function getHeightOfSectionsBellowMe is not valid.";
                default: //@@@: default:
                    return "There is not information for this error"; //@@@: return "There is not information for this error";
            } //@@@: }
        }; //@@@: }
    } //@@@: }

UNKNOWN >>     public enum csRptEditorErrors //@@@: public enum csRptEditorErrors
    { //@@@: {
        CSRPT_EDITOR_SECTION_TYPE_INVALID = 2001 //@@@: CSRPT_EDITOR_SECTION_TYPE_INVALID = 2001
    } //@@@: }
} //@@@: }
