(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCReportError = function() {

        // @ts-ignore
        let self: CSReportDll.IcReportError = {};
        const C_MODULE: string = "cReportError";

        self.String: static gDebugControl = "";
        self.int: static gDebugSectionLine = 0;
        self.String: static gDebugSection = "";

        self.errGetDescript = function(rptErrCode, x) {
            let s: string = "";
            switch (rptErrCode)
            {
                case csRptErrors.LAUNCH_INFO_UNDEFINED:
                    self.create"The = function() {

                        // @ts-ignore
                        let self: CSReportDll.I"The = {};
                    break;

                case csRptErrors.SINTAX_ERROR_MISSING_BRAKETS:
                    s = "Syntax error found in formula. An internal function was found in the code but the open parenthesis was missing.";
                    break;

                case csRptErrors.CSRPTERRINDEFINEDFUNCTION:
                    s = "the function $1 is not defined.";
                    break;

                case csRptErrors.CSRPTERRMISSINGPARAM:
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

                case csRptErrors.CSRPTERRVARNOTDEFINED:
                    s = "The variable $1 was not found in the variables collection. The variables must be declared with DeclareVar before being used by SetVar or GetVar.";
                    break;

                case csRptErrors.CSRPTERRPARAMNOTDEFINED:
                    s = "The parameter $1 was not found in the parameters collection. The parameters must be present in the main recordset.";
                    break;

                case csRptErrors.PRINTER_NOT_DEFINED:
                    s = "The printer is not defined. This could happens if your system does not have any printer or default printer is not defined.";
                    break;

                default:
                    s = "There is not a message associated to this error code.";
                    break;
            }

            let i: number = 0;

            for (i = 0; i < x.Length; i++) {
                s = s.Replace("$" + .ToString(), x[i]);
            }

            s = s + "\n\nSection  : " + gDebugSection
                    + "\nSec. Line: " + gDebugSectionLine 
                    + "\nControl  : " + gDebugControl + "\n";

            return s;
        };

        return self;

    }    }
}(globalObject));


namespace CSReportDll {

  export interface I"The {

  }
}
