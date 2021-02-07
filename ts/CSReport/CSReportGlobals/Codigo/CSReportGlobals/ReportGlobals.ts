namespace CSReportGlobals{

    import Utils = CSOAPI.Utils;

    export class ReportGlobals {

        public C_KEYINDEXCOL: string = "indexcol";
        public C_KEYINDEXCOL2: string = "indexcol2";
        public C_KEYINDEXGROUP: string = "indexgroup";

        private static nextKey = 1000;

        public getNextKey() {
            ReportGlobals.nextKey++;
            return ReportGlobals.nextKey;
        }

        public refreshNextKey(key: string) {
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

        public getKey(value: string) {
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

        public dateValue(value: any) {
            if (value === null) {
                return CSDataBase.Constants.C_NO_DATE;
            }
            else {
                let utcDate = Date.parse(value.toString())
                if (! isNaN(utcDate)) {
                    return new Date(utcDate);
                }
                else {
                    return CSDataBase.Constants.C_NO_DATE;
                }
            }
        }

        public isDate(value: string): boolean {
            return ! isNaN( Date.parse(value.toString()) );
        }

        public format(expression: any, strFormat: string): String {
            if (expression === null) {
                return "";
            }
            else {
                let isDate: boolean = false;

                if (expression instanceof Date) {
                    if (expression === CSDataBase.Constants.C_NO_DATE) {
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

        public getRealName(name: string) {
            let n: number = name.indexOf("}.");
            n = (n > -1) ? n + 2 : 0;
            return name.substring(n);
        }
    } 

    export enum csRptControlType 
    {
        CSRPTCTLABEL = 1,
        CSRPTCTFIELD = 2,
        CSRPTCTIMAGE = 3,
        CSRPTCTDBIMAGE = 4,
        CSRPTCTCHART = 5
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
        CSRPTLAUNCHPRINTER = 0,
        CSRPTLAUNCHFILE = 1,
        CSRPTLAUNCHPREVIEW = 2
    } 

    export enum csRptWhenEval
    {
        CSRPTEVALPRE = 0,
        CSRPTEVALPOST = 1
    } 

    export enum csDataSourceType
    {
        CSDTTABLE = 1,
        CDDTPROCEDURE = 2
    }

    export enum csRptErrors
    {
        LAUNCH_INFO_UNDEFINED = 1001,
        SINTAX_ERROR_MISSING_BRAKETS,
        CSRPTERRINDEFINEDFUNCTION,
        CSRPTERRMISSINGPARAM,
        CONTROL_NOT_FOUND,
        GROUP_NOT_FOUND,
        FIELD_NOT_FOUND,
        CSRPTERRVARNOTDEFINED,
        PRINTER_NOT_DEFINED,
        GROUP_NOT_FOUND_IN_MAIN_RS,
        CSRPTERRPARAMNOTDEFINED,
        ERROR_IN_SCRIPT,
        ERROR_WHEN_RUNNING_REPORT
    } 

    export enum csReportPaperType
    {
        CSRPTPAPERTYPEA4 = 9,
        CSRPTPAPERTYPEA3 = 8,
        CSRPTPAPERTYPELETTER = 1,
        CSRPTPAPERTYPELEGAL = 5,
        CSRPTPAPERNOTSUPORTED = 0,
        CSRPTPAPERUSER = 99
    }

    export enum csRptGrpOrderType
    {
        CSRPTGRPASC = 1,
        CSRPTGRPDESC = 2
    }

    export enum csRptGrpComparisonType
    {
        CSRPTGRPTEXT = 1,
        CSRPTGRPNUMBER = 2,
        CSRPTGRPDATE = 3
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
        YELLOWGREEN = "#9ACD32",

        C_COLOR_BLACK = 0,
        C_COLOR_WHITE = 255
    } 

    export enum csRptFormulaType
    {
        CSRPTF_PAGE_NUMBER = 10001,
        CSRPTF_TOTAL_PAGES = 10002,
        CSRPTF_AVERAGE = 10003,
        CSRPTF_SUM = 10004,
        CSRPTF_MAX = 10005,
        CSRPTF_MIN = 10006,
        CSRPTF_COUNT = 10007,
        CSRPTF_LENGTH = 10008,
        CSRPTF_CALCULO = 10009,
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
        CSRPTEXPORTHTML = 0,
        CSRPTEXPORTEXCEL = 1,
        CSRPTEXPORTWORD = 2,
        CSRPTEXPORTTXT = 3,
        CSRPTEXPORTTXTTAB = 4,
        CSRPTEXPORTXML = 5
    } 

    export enum HorizontalAlignment
    {
        Left = 0,
        Right = 1,
        Center = 2
    } 

    export enum csReportBorderType
    {
        CSRPTBSNONE = 0,
        CSRPTBSFIXED = 1,
        CSRPTBS3D = 2
    } 

    export enum csRptGetLineResult
    {
        CSRPTGLNONE = 0,
        CSRPTGLDETAIL = 1,
        CSRPTGLGROUPHEADER = 2,
        CSRPTGLGROUPFOOTER = 3,
        CSRPTGLEND = 4,
        CSRPTGLNEWPAGE = 5,
        CSRPTGLVIRTUALH = 6,
        CSRPTGLVIRTUALF = 7
    } 

    export enum csRptNewPageResult
    {
        CSRPTNPERROR = 1,
        CSRPTNPSUCCESS = 2,
        CSRPTNPEND = 3
    } 

    export enum csRptEndPageResult
    {
        CSRPTEPERROR = csRptNewPageResult.CSRPTNPERROR,
        CSRPTEPSUCCESS = csRptNewPageResult.CSRPTNPSUCCESS
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
