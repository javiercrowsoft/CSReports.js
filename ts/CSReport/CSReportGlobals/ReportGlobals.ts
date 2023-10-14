namespace CSReportGlobals {

    import Utils = CSOAPI.Utils;
    import Constants = CSDatabase.Constants;

    export class ReportGlobals {

        public static C_KEY_INDEX_COL: string   = "indexcol";
        public static C_KEY_INDEX_COL2: string  = "indexcol2";
        public static C_KEY_INDEX_GROUP: string = "indexgroup";

        private static nextKey = 1000;

        public static getNextKey() {
            ReportGlobals.nextKey++;
            return ReportGlobals.nextKey;
        }

        public static refreshNextKey(key: string) {
            let keyNumber: number = 0;
            if (Utils.isNumber(key)) {
                keyNumber = Utils.parseInt(key);
            }
            else {
                if (key.length > 1)  {
                    if (Utils.isNumber(key.substring(1))) {
                        keyNumber = Utils.parseInt(key.substring(1));
                    }
                }
            }

            if (ReportGlobals.nextKey < keyNumber) {
                ReportGlobals.nextKey = keyNumber + 1;
            }
        }

        public static getKey(value: string) {
            if (value.length > 0) {
                if ("0123456789".contains(value.substring(0, 1))) {
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
            if (value === null) {
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
                        return Constants.C_NO_DATE;
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
            if (value === null) {
                return CSDatabase.Constants.C_NO_DATE;
            }
            else {
                let utcDate = Date.parse(value.toString())
                if (! isNaN(utcDate)) {
                    return new Date(utcDate);
                }
                else {
                    return CSDatabase.Constants.C_NO_DATE;
                }
            }
        }

        public isDate(value: string): boolean {
            return ! isNaN( Date.parse(value.toString()) );
        }

        public static format(expression: any, strFormat: string): string {
            if (expression === null) {
                return "";
            }
            else {
                let isDate: boolean = false;

                if (expression instanceof Date) {
                    if (expression === CSDatabase.Constants.C_NO_DATE) {
                        return "";
                    }
                    isDate = true;
                }
                if (strFormat === "") {
                    return expression.toString();
                }
                else {
                    if (isDate) {
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

    export enum csColors
    {
        ALICEBLUE = "#F0F8FF",
        ANTIQUEWHITE = "#FAEBD7",
        AQUA = "#00FFFF",
        AQUAMARINE = "#7FFFD4",
        AZURE = "#F0FFFF",
        BEIGE = "#F5F5DC",
        BISQUE = "#FFE4C4",
        BLACK = "#000000",
        BLANCHEDALMOND = "#FFEBCD",
        BLUE = "#0000FF",
        BLUEVIOLET = "#8A2BE2",
        BROWN = "#A52A2A",
        BURLYWOOD = "#DEB887",
        CADETBLUE = "#5F9EA0",
        CHARTREUSE = "#7FFF00",
        CHOCOLATE = "#D2691E",
        CORAL = "#FF7F50",
        CORNFLOWERBLUE = "#6495ED",
        CORNSILK = "#FFF8DC",
        CRIMSON = "#DC143C",
        CYAN = "#00FFFF",
        DARKBLUE = "#00008B",
        DARKCYAN = "#008B8B",
        DARKGOLDENROD = "#B8860B",
        DARKGRAY = "#A9A9A9",
        DARKGREEN = "#006400",
        DARKKHAKI = "#BDB76B",
        DARKMAGENTA = "#8B008B",
        DARKOLIVEGREEN = "#556B2F",
        DARKORANGE = "#FF8C00",
        DARKORCHID = "#9932CC",
        DARKRED = "#8B0000",
        DARKSALMON = "#E9967A",
        DARKSEAGREEN = "#8FBC8B",
        DARKSLATEBLUE = "#483D8B",
        DARKSLATEGRAY = "#2F4F4F",
        DARKTURQUOISE = "#00CED1",
        DARKVIOLET = "#9400D3",
        DEEPPINK = "#FF1493",
        DEEPSKYBLUE = "#00BFFF",
        DIMGRAY = "#696969",
        DODGERBLUE = "#1E90FF",
        FIREBRICK = "#B22222",
        FLORALWHITE = "#FFFAF0",
        FORESTGREEN = "#228B22",
        FUCHSIA = "#FF00FF",
        GAINSBORO = "#DCDCDC",
        GHOSTWHITE = "#F8F8FF",
        GOLD = "#FFD700",
        GOLDENROD = "#DAA520",
        GRAY = "#808080",
        GREEN = "#008000",
        GREENYELLOW = "#ADFF2F",
        HONEYDEW = "#F0FFF0",
        HOTPINK = "#FF69B4",
        INDIANRED = "#CD5C5C",
        INDIGO = "#4B0082",
        IVORY = "#FFFFF0",
        KHAKI = "#F0E68C",
        LAVENDER = "#E6E6FA",
        LAVENDERBLUSH = "#FFF0F5",
        LAWNGREEN = "#7CFC00",
        LEMONCHIFFON = "#FFFACD",
        LIGHTBLUE = "#ADD8E6",
        LIGHTCORAL = "#F08080",
        LIGHTCYAN = "#E0FFFF",
        LIGHTGOLDENRODYELLOW = "#FAFAD2",
        LIGHTGRAY = "#D3D3D3",
        LIGHTGREEN = "#90EE90",
        LIGHTPINK = "#FFB6C1",
        LIGHTSALMON = "#FFA07A",
        LIGHTSEAGREEN = "#20B2AA",
        LIGHTSKYBLUE = "#87CEFA",
        LIGHTSLATEGRAY = "#778899",
        LIGHTSTEELBLUE = "#B0C4DE",
        LIGHTYELLOW = "#FFFFE0",
        LIME = "#00FF00",
        LIMEGREEN = "#32CD32",
        LINEN = "#FAF0E6",
        MAGENTA = "#FF00FF",
        MAROON = "#800000",
        MEDIUMAQUAMARINE = "#66CDAA",
        MEDIUMBLUE = "#0000CD",
        MEDIUMORCHID = "#BA55D3",
        MEDIUMPURPLE = "#9370DB",
        MEDIUMSEAGREEN = "#3CB371",
        MEDIUMSLATEBLUE = "#7B68EE",
        MEDIUMSPRINGGREEN = "#00FA9A",
        MEDIUMTURQUOISE = "#48D1CC",
        MEDIUMVIOLETRED = "#C71585",
        MIDNIGHTBLUE = "#191970",
        MINTCREAM = "#F5FFFA",
        MISTYROSE = "#FFE4E1",
        MOCCASIN = "#FFE4B5",
        NAVAJOWHITE = "#FFDEAD",
        NAVY = "#000080",
        OLDLACE = "#FDF5E6",
        OLIVE = "#808000",
        OLIVEDRAB = "#6B8E23",
        ORANGE = "#FFA500",
        ORANGERED = "#FF4500",
        ORCHID = "#DA70D6",
        PALEGOLDENROD = "#EEE8AA",
        PALEGREEN = "#98FB98",
        PALETURQUOISE = "#AFEEEE",
        PALEVIOLETRED = "#DB7093",
        PAPAYAWHIP = "#FFEFD5",
        PEACHPUFF = "#FFDAB9",
        PERU = "#CD853F",
        PINK = "#FFC0CB",
        PLUM = "#DDA0DD",
        POWDERBLUE = "#B0E0E6",
        PURPLE = "#800080",
        RED = "#FF0000",
        ROSYBROWN = "#BC8F8F",
        ROYALBLUE = "#4169E1",
        SADDLEBROWN = "#8B4513",
        SALMON = "#FA8072",
        SANDYBROWN = "#F4A460",
        SEAGREEN = "#2E8B57",
        SEASHELL = "#FFF5EE",
        SIENNA = "#A0522D",
        SILVER = "#C0C0C0",
        SKYBLUE = "#87CEEB",
        SLATEBLUE = "#6A5ACD",
        SLATEGRAY = "#708090",
        SNOW = "#FFFAFA",
        SPRINGGREEN = "#00FF7F",
        STEELBLUE = "#4682B4",
        TAN = "#D2B48C",
        TEAL = "#008080",
        THISTLE = "#D8BFD8",
        TOMATO = "#FF6347",
        TRANSPARENT = "#FFFF",
        TURQUOISE = "#40E0D0",
        VIOLET = "#EE82EE",
        WHEAT = "#F5DEB3",
        WHITE = "#FFFFFF",
        WHITESMOKE = "#F5F5F5",
        YELLOW = "#FFFF00",
        YELLOWGREEN = "#9ACD32"
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
