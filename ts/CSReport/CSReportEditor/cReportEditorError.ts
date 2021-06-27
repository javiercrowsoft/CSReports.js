namespace CSReportEditor {

    export class cReportEditorError {

        public errGetDescription(rptErrCode: csRptEditorErrors) {
            switch (rptErrCode)
            {
                case csRptEditorErrors.CSRPT_EDITOR_SECTION_TYPE_INVALID:
                    return "The section type of the section argument passed to function getHeightOfSectionsBellowMe is not valid.";
                default:
                    return "There is not information for this error";
            }
        }
    }

    export enum csRptEditorErrors
    {
        CSRPT_EDITOR_SECTION_TYPE_INVALID = 2001
    }
}
