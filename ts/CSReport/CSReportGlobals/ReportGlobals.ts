namespace CSReportGlobals {

    import Utils = CSOAPI.Utils;
    import Constants = CSDatabase.Constants;

    export class ReportGlobals {

        public static KEY_INDEX_COL: string   = "indexcol";
        public static KEY_INDEX_COL2: string  = "indexcol2";
        public static KEY_INDEX_GROUP: string = "indexgroup";

        private static nextKey = 1000;

        public static getNextKey() {
            ReportGlobals.nextKey++;
            return ReportGlobals.nextKey;
        }

        public static refreshNextKey(key: string) {
            let keyNumber: number = 0;
            if(Utils.isNumber(key)) {
                keyNumber = Utils.parseInt(key);
            }
            else {
                if(key.length > 1)  {
                    if(Utils.isNumber(key.substring(1))) {
                        keyNumber = Utils.parseInt(key.substring(1));
                    }
                }
            }

            if(ReportGlobals.nextKey < keyNumber) {
                ReportGlobals.nextKey = keyNumber + 1;
            }
        }

        public static getKey(value: string) {
            if(value.length > 0) {
                if("0123456789".contains(value.substring(0, 1))) {
                    value = "K" + value;
                }
            }
            return value;
        }

        public isDbNull(val: any) {
            return val === null;
        }

        private static toType(obj): string {
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
        }

        public static valVariant<T>(value: object): T {
            if(value === null) {
                let typeCode = this.toType(value);
                switch (typeCode) {
                    case "string":
                        // @ts-ignore
                        return "";
                    case "number":
                        // @ts-ignore
                        return 0;
                    case "date":
                        // @ts-ignore
                        return Constants.NO_DATE;
                    case "boolean":
                        // @ts-ignore
                        return false;
                    default:
                        return null;
                }
            }
            else {
                // @ts-ignore
                return value;
            }
        }

        public static dateValue(value: any) {
            if(value === null) {
                return CSDatabase.Constants.NO_DATE;
            }
            else {
                let utcDate = Date.parse(value.toString())
                if(! isNaN(utcDate)) {
                    return new Date(utcDate);
                }
                else {
                    return CSDatabase.Constants.NO_DATE;
                }
            }
        }

        public isDate(value: string): boolean {
            return ! isNaN( Date.parse(value.toString()) );
        }

        public static format(expression: any, strFormat: string): string {
            if(expression === null) {
                return "";
            }
            else {
                let isDate: boolean = false;

                if(expression instanceof Date) {
                    if(expression === CSDatabase.Constants.NO_DATE) {
                        return "";
                    }
                    isDate = true;
                }
                if(strFormat === "") {
                    return expression.toString();
                }
                else {
                    if(isDate) {
                        return expression.toString().format(strFormat);
                    }
                    else {
                        return Utils.val(expression).toString().format(strFormat);
                    }
                }
            }
        }

        public static getRealName(name: string) {
            let n: number = name.indexOf("}.");
            n = (n > -1) ? n + 2 : 0;
            return name.substring(n);
        }
    }

    export enum csRptControlType
    {
        CS_RPT_CT_LABEL = 1,
        CS_RPT_CT_FIELD = 2,
        CS_RPT_CT_IMAGE = 3,
        CS_RPT_CT_DB_IMAGE = 4,
        CS_RPT_CT_CHART = 5
    }

    export enum csRptSectionType
    {
        HEADER = 0,
        DETAIL = 1,
        FOOTER = 2,
        GROUP_HEADER = 3,
        GROUP_FOOTER = 4,
        MAIN_HEADER = 100,
        MAIN_DETAIL = 101,
		MAIN_FOOTER = 102,
		CONTROL = 50,
		SECLN_HEADER = 1000,
		SECLN_DETAIL = 1001,
		SECLN_FOOTER = 1002,
		SECLN_GROUPH = 1003,
		SECLN_GROUPF = 1004
    }

    export enum csRptLaunchAction
    {
        CS_RPT_LAUNCH_PRINTER = 0,
        CS_RPT_LAUNCH_FILE = 1,
        CS_RPT_LAUNCH_PREVIEW = 2
    }

    export enum csRptWhenEval
    {
        CS_RPT_EVAL_PRE = 0,
        CS_RPT_EVAL_POST = 1
    }

    export enum csDataSourceType
    {
        CS_DT_TABLE = 1,
        CS_DT_PROCEDURE = 2
    }

    export enum csRptErrors
    {
        LAUNCH_INFO_UNDEFINED = 1001,
        SYNTAX_ERROR_MISSING_BRACKETS,
        CS_RPT_ERR_UNDEFINED_FUNCTION,
        CS_RPT_ERR_MISSING_PARAM,
        CONTROL_NOT_FOUND,
        GROUP_NOT_FOUND,
        FIELD_NOT_FOUND,
        CS_RPT_ERR_VAR_NOT_DEFINED,
        PRINTER_NOT_DEFINED,
        GROUP_NOT_FOUND_IN_MAIN_RS,
        CS_RPT_ERR_PARAM_NOT_DEFINED,
        ERROR_IN_SCRIPT,
        ERROR_WHEN_RUNNING_REPORT
    }

    export enum csReportPaperType
    {
        CS_RPT_PAPER_TYPE_A4 = 9,
        CS_RPT_PAPER_TYPE_A3 = 8,
        CS_RPT_PAPER_TYPE_LETTER = 1,
        CS_RPT_PAPER_TYPE_LEGAL = 5,
        CS_RPT_PAPER_NOT_SUPPORTED = 0,
        CS_RPT_PAPER_USER = 99
    }

    export enum RptGrpOrderType
    {
        CS_RPT_GRP_ASC = 1,
        CS_RPT_GRP_DESC = 2
    }

    export enum RptGrpComparisonType
    {
        CS_RPT_GRP_TEXT = 1,
        CS_RPT_GRP_NUMBER = 2,
        CS_RPT_GRP_DATE = 3
    }

    export enum csRptFormulaType
    {
        CSRPTF_NONE = 0,
        CSRPTF_PAGE_NUMBER = 10001,
        CSRPTF_TOTAL_PAGES = 10002,
        CSRPTF_AVERAGE = 10003,
        CSRPTF_SUM = 10004,
        CSRPTF_MAX = 10005,
        CSRPTF_MIN = 10006,
        CSRPTF_COUNT = 10007,
        CSRPTF_LENGTH = 10008,
        CSRPTF_CALCULATE = 10009,
        CSRPTF_SUM_TIME = 10010,
        CSRPTF_GET_STRING = 10011,
        CSRPTF_NUMBER_TO_STRING = 10012,
        CSRPTF_VAL = 1010,
        CSRPTF_DECLARE_VAR = 10013,
        CSRPTF_GET_VAR = 10014,
        CSRPTF_ADD_TO_VAR = 10015,
        CSRPTF_SET_VAR = 10016,
        CSRPTF_GET_DATA_FROM_RS_AD = 10017,
        CSRPTF_GET_PARAM = 10018,
        CSRPTF_IS_EQUAL = 10019,
        CSRPTF_IS_NOT_EQUAL = 10020,
        CSRPTF_IS_GREATER_THAN = 10021,
        CSRPTF_IS_LESS_THAN = 10022,
        CSRPTF_GET_DATA_FROM_RS = 10023,
        CSRPTF_GROUP_TOTAL = 10024,
        CSRPTF_GROUP_MAX = 10025,
        CSRPTF_GROUP_MIN = 10026,
        CSRPTF_GROUP_AVERAGE = 10027,
        CSRPTF_GROUP_PERCENT = 10028,
        CSRPTF_GROUP_COUNT = 10029,
        CSRPTF_GROUP_LINE_NUMBER = 10030,
        CSRPTF_IS_IN_RS = 10031,
        CSRPTF_TEXT_REPLACE = 10032,
        CSRPTF_GET_BARCODE = 10033
    }

    export enum csRptFileFormat
    {
        CS_RPT_EXPORT_HTML = 0,
        CS_RPT_EXPORT_EXCEL = 1,
        CS_RPT_EXPORT_WORD = 2,
        CS_RPT_EXPORT_TXT = 3,
        CS_RPT_EXPORT_TXT_TAB = 4,
        CS_RPT_EXPORT_XML = 5
    }

    export enum HorizontalAlignment
    {
        Left = 0,
        Right = 1,
        Center = 2
    }

    export enum csReportBorderType
    {
        CS_RPT_BS_NONE = 0,
        CS_RPT_BS_FIXED = 1,
        CS_RPT_BS_3D = 2
    }

    export enum csRptGetLineResult
    {
        CS_RPT_GL_NONE = 0,
        CS_RPT_GL_DETAIL = 1,
        CS_RPT_GL_GROUP_HEADER = 2,
        CS_RPT_GL_GROUP_FOOTER = 3,
        CS_RPT_GL_END = 4,
        CS_RPT_GL_NEW_PAGE = 5,
        CS_RPT_GL_VIRTUAL_H = 6,
        CS_RPT_GL_VIRTUAL_F = 7
    }

    export enum csRptNewPageResult
    {
        CS_RPT_NP_ERROR = 1,
        CS_RPT_NP_SUCCESS = 2,
        CS_RPT_NP_END = 3
    }

    export enum csRptEndPageResult
    {
        CS_RPT_EP_ERROR = csRptNewPageResult.CS_RPT_NP_ERROR,
        CS_RPT_EP_SUCCESS = csRptNewPageResult.CS_RPT_NP_SUCCESS
    }

    export enum csRptChartLineStyle
    {
        NONE,
        HORIZONTAL,
        NUMBERED,
        BOTH
    }

    export enum csRptChartPieThickness
    {
        NONE = 0,
        WAFER = 2,
        THIN = 4,
        MEDIUM = 8,
        THICK = 16,
        THICKEST = 32
    }

    export enum csRptChartPieDiameter
    {
        SMALLEST = 50,
        SMALLER = 100,
        SMALL = 150,
        MEDIUM = 200,
        LARGE = 250,
        LARGER = 350,
        LARGEST = 450
    }

    export enum csRptChartFormat
    {
        GIF,
        JPEG,
        PNG,
        BMP
    }

    export enum csRptChartType
    {
        PIE,
        BAR
    }

    export enum csEZoom
    {
        csEZoomCustom = -1,
        csEZoomAllPage = -2,
        csEZoomWidth = -3
    }

	export enum csEAlignConst
    {
        csEAlignTextLeft = 1,
        csEAlignTextRight,
        csEAlignTextCenter,

        csEAlignCtlLeft,
        csEAlignCtlHorizontal,
        csEAlignCtlRight,
        csEAlignCtlVertical,
        csEAlignCtlTop,
        csEAlignCtlBottom,

        csEAlignCtlWidth,
        csEAlignCtlHeight
    }

	export enum csECtlAlignConst
    {
        csECtlAlignLeft = csEAlignConst.csEAlignCtlLeft,
        csECtlAlignHorizontal = csEAlignConst.csEAlignCtlHorizontal,
        csECtlAlignRight = csEAlignConst.csEAlignCtlRight,
        csECtlAlignVertical = csEAlignConst.csEAlignCtlVertical,
        csECtlAlignTop = csEAlignConst.csEAlignCtlTop,
        csECtlAlignBottom = csEAlignConst.csEAlignCtlBottom,
        csECtlAlignWidth = csEAlignConst.csEAlignCtlWidth,
        csECtlAlignHeight = csEAlignConst.csEAlignCtlHeight
    }

    export enum csRptPageOrientation
    {
        PORTRAIT = 1,
        LANDSCAPE = 2
    }
}
