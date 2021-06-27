namespace CSReportDll {

    import csRptErrors = CSReportGlobals.csRptErrors;

    export class cReportError {

        public static gDebugControl = "";
        public static gDebugSectionLine = 0;
        public static gDebugSection = "";

        public static errGetDescription(rptErrCode: csRptErrors, x: string[] = null): string {
            let s: string = "";
            switch (rptErrCode)
            {
                case csRptErrors.LAUNCH_INFO_UNDEFINED:
                    s = "The cReport launch method must be called with an instance of oLaunchInfo class or the cReport init method must be called before calling launch.";
                    break;

                case csRptErrors.SYNTAX_ERROR_MISSING_BRACKETS:
                    s = "Syntax error found in formula. An internal function was found in the code but the open parenthesis was missing.";
                    break;

                case csRptErrors.CS_RPT_ERR_UNDEFINED_FUNCTION:
                    s = "the function $1 is not defined.";
                    break;

                case csRptErrors.CS_RPT_ERR_MISSING_PARAM:
                    s = "The parameter $1 was missing in the function call to $2.";
                    break;

                case csRptErrors.CONTROL_NOT_FOUND:
                    s = "The control $1 was not found.";
                    break;

                case csRptErrors.GROUP_NOT_FOUND:
                    s = "The group '$1' refers to field '$2' but this is not between the columns of the recordset.";
                    break;

                case csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS:
                    s = "The group '$1' refers to field '$2' but this is not between the columns of the main recordset.";
                    break;

                case csRptErrors.FIELD_NOT_FOUND:
                    s = "The control '$1' refers to field '$2' but this is not between the columns of the recordset.";
                    break;

                case csRptErrors.CS_RPT_ERR_VAR_NOT_DEFINED:
                    s = "The variable $1 was not found in the variables collection. The variables must be declared with DeclareVar before being used by SetVar or GetVar.";
                    break;

                case csRptErrors.CS_RPT_ERR_PARAM_NOT_DEFINED:
                    s = "The parameter $1 was not found in the parameters collection. The parameters must be present in the main recordset.";
                    break;

                case csRptErrors.PRINTER_NOT_DEFINED:
                    s = "The printer is not defined. This could happens if your system does not have any printer or default printer is not defined.";
                    break;

                default:
                    s = "There is not a message associated to this error code.";
                    break;
            }

            for (let i = 0; i < x.length; i++) {
                s = s.replace("$" + i.toString(), x[i]);
            }

            s = s + "\n\nSection  : " + this.gDebugSection
                    + "\nSec. Line: " + cReportError.gDebugSectionLine
                    + "\nControl  : " + this.gDebugControl + "\n";

            return s;
        }
    }
}
