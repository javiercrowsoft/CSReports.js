(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

UNKNOWN >>     class cReportPaintError
    {
        self.errGetDescript = function(rptErrCode) {
            const  = function() {
                case csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT:
                    return "The ObjectClient property of the object cReportPaint is not defined when calling to DrawObject method.";
                case csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT_INVALID:
                    return "The ObjectClient property of the object cReportPaint is invalid (it references an object which is neither a Printer nor a PictureBox) when calling DrawObject method.";
                default:
                    return "There is not information for this error";
            }
        };
    }

UNKNOWN >>     public enum csRptPaintErrors
    {
        CSRPT_PAINT_ERR_OBJ_CLIENT = 2001,
        CSRPT_PAINT_ERR_OBJ_CLIENT_INVALID,
UNKNOWN >>         CSRPT_PAINT_ERR_PRINTING
    }
}
