(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {
UNKNOWN >>     class cReportPaintError //@@@: class cReportPaintError
    { //@@@: {
        self.errGetDescript = function(rptErrCode) { //@@@: public static String errGetDescript(csRptPaintErrors rptErrCode)
            const  = function() { //@@@: switch (rptErrCode)
                case csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT: //@@@: case csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT:
                    return "The ObjectClient property of the object cReportPaint is not defined when calling to DrawObject method."; //@@@: return "The ObjectClient property of the object cReportPaint is not defined when calling to DrawObject method.";
                case csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT_INVALID: //@@@: case csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT_INVALID:
                    return "The ObjectClient property of the object cReportPaint is invalid (it references an object which is neither a Printer nor a PictureBox) when calling DrawObject method."; //@@@: return "The ObjectClient property of the object cReportPaint is invalid (it references an object which is neither a Printer nor a PictureBox) when calling DrawObject method.";
                default: //@@@: default:
                    return "There is not information for this error"; //@@@: return "There is not information for this error";
            } //@@@: }
        }; //@@@: }
    } //@@@: }

UNKNOWN >>     public enum csRptPaintErrors //@@@: public enum csRptPaintErrors
    { //@@@: {
        CSRPT_PAINT_ERR_OBJ_CLIENT = 2001, //@@@: CSRPT_PAINT_ERR_OBJ_CLIENT = 2001,
        CSRPT_PAINT_ERR_OBJ_CLIENT_INVALID, //@@@: CSRPT_PAINT_ERR_OBJ_CLIENT_INVALID,
UNKNOWN >>         CSRPT_PAINT_ERR_PRINTING //@@@: CSRPT_PAINT_ERR_PRINTING
    } //@@@: }
} //@@@: }
