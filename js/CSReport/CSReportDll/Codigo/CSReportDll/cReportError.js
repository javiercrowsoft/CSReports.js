(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportError = function() {

        const self = {}; //@@@: internal static class cReportError
        const C_MODULE = "cReportError"; //@@@: private const String C_MODULE = "cReportError";

        self.String gDebugControl = ""; //@@@: public static String gDebugControl = "";
        self.int gDebugSectionLine = 0; //@@@: public static int gDebugSectionLine = 0;
        self.String gDebugSection = ""; //@@@: public static String gDebugSection = "";

        self.errGetDescript = function(rptErrCode, x) { //@@@: public static String errGetDescript(csRptErrors rptErrCode, params String[] x)
            let s = ""; //@@@: String s = "";
            switch (rptErrCode) //@@@: switch (rptErrCode)
            { //@@@: {
                case csRptErrors.LAUNCH_INFO_UNDEFINED: //@@@: case csRptErrors.LAUNCH_INFO_UNDEFINED:
                    s = "The cReport launch metodh must be called with an instance of oLaunchInfo class or the cReport init method must be called before calling launch."; //@@@: s = "The cReport launch metodh must be called with an instance of oLaunchInfo class or the cReport init method must be called before calling launch.";
                    break; //@@@: break;

                case csRptErrors.SINTAX_ERROR_MISSING_BRAKETS: //@@@: case csRptErrors.SINTAX_ERROR_MISSING_BRAKETS:
                    s = "Syntax error found in formula. An internal function was found in the code but the open parenthesis was missing."; //@@@: s = "Syntax error found in formula. An internal function was found in the code but the open parenthesis was missing.";
                    break; //@@@: break;

                case csRptErrors.CSRPTERRINDEFINEDFUNCTION: //@@@: case csRptErrors.CSRPTERRINDEFINEDFUNCTION:
                    s = "the function $1 is not defined."; //@@@: s = "the function $1 is not defined.";
                    break; //@@@: break;

                case csRptErrors.CSRPTERRMISSINGPARAM: //@@@: case csRptErrors.CSRPTERRMISSINGPARAM:
                    s = "The parameter $1 was missing in the function call to $2."; //@@@: s = "The parameter $1 was missing in the function call to $2.";
                    break; //@@@: break;

                case csRptErrors.CONTROL_NOT_FOUND: //@@@: case csRptErrors.CONTROL_NOT_FOUND:
                    s = "The control $1 was not found."; //@@@: s = "The control $1 was not found.";
                    break; //@@@: break;

                case csRptErrors.GROUP_NOT_FOUND: //@@@: case csRptErrors.GROUP_NOT_FOUND:
                    s = "The group '$1' refers to field '$2' but this is not between the columns of the recordset."; //@@@: s = "The group '$1' refers to field '$2' but this is not between the columns of the recordset.";
                    break; //@@@: break;

                case csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS: //@@@: case csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS:
                    s = "The group '$1' refers to field '$2' but this is not between the columns of the main recordset."; //@@@: s = "The group '$1' refers to field '$2' but this is not between the columns of the main recordset.";
                    break; //@@@: break;

                case csRptErrors.FIELD_NOT_FOUND: //@@@: case csRptErrors.FIELD_NOT_FOUND:
                    s = "The control '$1' refers to field '$2' but this is not between the columns of the recordset."; //@@@: s = "The control '$1' refers to field '$2' but this is not between the columns of the recordset.";
                    break; //@@@: break;

                case csRptErrors.CSRPTERRVARNOTDEFINED: //@@@: case csRptErrors.CSRPTERRVARNOTDEFINED:
                    s = "The variable $1 was not found in the variables collection. The variables must be declared with DeclareVar before being used by SetVar or GetVar."; //@@@: s = "The variable $1 was not found in the variables collection. The variables must be declared with DeclareVar before being used by SetVar or GetVar.";
                    break; //@@@: break;

                case csRptErrors.CSRPTERRPARAMNOTDEFINED: //@@@: case csRptErrors.CSRPTERRPARAMNOTDEFINED:
                    s = "The parameter $1 was not found in the parameters collection. The parameters must be present in the main recordset."; //@@@: s = "The parameter $1 was not found in the parameters collection. The parameters must be present in the main recordset.";
                    break; //@@@: break;

                case csRptErrors.PRINTER_NOT_DEFINED: //@@@: case csRptErrors.PRINTER_NOT_DEFINED:
                    s = "The printer is not defined. This could happens if your system does not have any printer or default printer is not defined."; //@@@: s = "The printer is not defined. This could happens if your system does not have any printer or default printer is not defined.";
                    break; //@@@: break;

                default: //@@@: default:
                    s = "There is not a message associated to this error code."; //@@@: s = "There is not a message associated to this error code.";
                    break; //@@@: break;
            } //@@@: }

            let i = 0; //@@@: int i = 0;

            for (i = 0; i < x.Length; i++) { //@@@: for (i = 0; i < x.Length; i++)
                s = s.Replace("$" + .ToString(), x[i]); //@@@: s = s.Replace("$" + (i + 1).ToString(), x[i]);
            } //@@@: }

            s = s + "\n\nSection  : " + gDebugSection //@@@: s = s + "\n\nSection  : " + gDebugSection
                    + "\nSec. Line: " + gDebugSectionLine  //@@@: + "\nSec. Line: " + gDebugSectionLine
                    + "\nControl  : " + gDebugControl + "\n"; //@@@: + "\nControl  : " + gDebugControl + "\n";

            return s; //@@@: return s;
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
