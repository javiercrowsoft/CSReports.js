(function(globalObject) {

    globalObject.CSReportGlobals = globalObject.CSReportGlobals || {};

    globalObject.CSReportGlobals.createCReportGlobals = function() {

        // @ts-ignore
        let self: CSReportGlobals.IcReportGlobals = {};
        self.C_KEYINDEXCOL: string = "indexcol";
        self.C_KEYINDEXCOL2: string = "indexcol2";
        self.C_KEYINDEXGROUP: string = "indexgroup";

        let int: static m_nextKey = 1000;

        self.getNextKey = function() {
            m_nextKey++;
            return m_nextKey;
        };

        self.refreshNextKey = function(key) {
            let keyNumber: number = 0;
            if (G.isNumeric(key)) {
                keyNumber = int.Parse(key);
            }
            else {
                if (key.Length > 1)  {
                    if (G.isNumeric(key.Substring(1))) {
                        keyNumber = int.Parse(key.Substring(1));
                    }
                }
            }

            if (m_nextKey < keyNumber) {
                m_nextKey = keyNumber + 1;
            }
        };

        self.getKey = function(value) {
            if (value.Length > 0) {
                if ("0123456789".Contains(value.Substring(0, 1))) {
                    value = "K" + value;
                }
            }
            return value;
        };

        self.isDbNull = function(val) {
            return val === null;
        };

        self.dateValue = function(value) {
            if (value === null) {
                return CSDataBase.cConstants.C_NO_DATE;
            }
            else {
UNKNOWN >>                 DateTime date;
                if (DateTime.TryParse(value.ToString(), date)) {
                    return date;
                }
                else {
                    return CSDataBase.cConstants.C_NO_DATE;
                }
            }

        };

        self.isDate = function(date) {
UNKNOWN >>             DateTime dummyDate;
            return DateTime.TryParse(date, dummyDate);
        };

        self.valVariant = function(var) {
            if (var === null) {
                let typeCode: System.TypeCode = System.Type.GetTypeCode(var.GetType());
                switch (typeCode)
                {
                    case System.TypeCode.Char:
                    case System.TypeCode.String:
                        return "";
                    case System.TypeCode.Decimal:
                    case System.TypeCode.Double:
                    case System.TypeCode.Int16:
                    case System.TypeCode.Int32:
                    case System.TypeCode.Int64:
                    case System.TypeCode.Single:
                    case System.TypeCode.UInt16:
                    case System.TypeCode.UInt32:
                    case System.TypeCode.UInt64:
                        return 0;
                    case System.TypeCode.DateTime:
                        return CSDataBase.cConstants.C_NO_DATE;
                    case System.TypeCode.Boolean:
                        return false;
                    default:
                        return null;
                }
            }
            else {
                return var;
            }
        };

        self.format = function(expression, strFormat) {
            if (expression === null) {
                return "";
            }
            else {
                let isDate: boolean = false;

                let typeCode: System.TypeCode = System.Type.GetTypeCode(expression.GetType());
                if (typeCode === System.TypeCode.DateTime) {
                    if (expression === CSDataBase.cConstants.C_NO_DATE) {
                        return "";
                    }
                    isDate = true;
                }
                if (strFormat === "") {
                    return expression.ToString();
                }
                else {
                    if (isDate) {
                        return (expression).ToString(strFormat);
                    }
                    else {
                        return cUtil.val(expression).ToString(strFormat);
                    }                    
                }
            }
        };

        self.getRealName = function(name) {
            let n: number = name.IndexOf("}.", 1);
            if (n > -1) {
                n = n + 2;
            }
            else {
                n = 0;
            }
            return name.Substring(n);
        };

        return self;

    }    }
        return self;


        return self;

    public enum csRptControlType UNKNOWN >>     public enum csRptControlType 
    {
        CSRPTCTLABEL = 1,
        CSRPTCTFIELD = 2,
        CSRPTCTIMAGE = 3,
        CSRPTCTDBIMAGE = 4,
        CSRPTCTCHART = 5
        return self;

    }    }
        return self;


        return self;

    public enum csRptSectionType UNKNOWN >>     public enum csRptSectionType 
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
        return self;

    }    }
        return self;


        return self;

    public enum csRptLaunchActionUNKNOWN >>     public enum csRptLaunchAction
    {
        CSRPTLAUNCHPRINTER = 0,
        CSRPTLAUNCHFILE = 1,
        CSRPTLAUNCHPREVIEW = 2
        return self;

    }    }
        return self;


        return self;

    public enum csRptWhenEvalUNKNOWN >>     public enum csRptWhenEval
    {
        CSRPTEVALPRE = 0,
        CSRPTEVALPOST = 1
        return self;

    }    }
        return self;


        return self;

    public enum csDataSourceTypeUNKNOWN >>     public enum csDataSourceType
    {
        CSDTTABLE = 1,
        CDDTPROCEDURE = 2
        return self;

    }    }
        return self;


        return self;

    public enum csRptErrorsUNKNOWN >>     public enum csRptErrors
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
UNKNOWN >>         ERROR_WHEN_RUNNING_REPORT
        return self;

    }    }
        return self;


        return self;

    public enum csReportPaperTypeUNKNOWN >>     public enum csReportPaperType
    {
        CSRPTPAPERTYPEA4 = 9,
        CSRPTPAPERTYPEA3 = 8,
        CSRPTPAPERTYPELETTER = 1,
        CSRPTPAPERTYPELEGAL = 5,
        CSRPTPAPERNOTSUPORTED = 0,
        CSRPTPAPERUSER = 99
        return self;

    }    }
        return self;


        return self;

    public enum csRptGrpOrderTypeUNKNOWN >>     public enum csRptGrpOrderType
    {
        CSRPTGRPASC = 1,
        CSRPTGRPDESC = 2
        return self;

    }    }
        return self;


        return self;

    public enum csRptGrpComparisonTypeUNKNOWN >>     public enum csRptGrpComparisonType
    {
        CSRPTGRPTEXT = 1,
        CSRPTGRPNUMBER = 2,
        CSRPTGRPDATE = 3
        return self;

    }    }
        return self;


        return self;

    public enum csColors : uintUNKNOWN >>     public enum csColors : uint
    {
        ALICEBLUE = 0xFFF0F8FF,
        ANTIQUEWHITE = 0xFFFAEBD7,
        AQUA = 0xFF00FFFF,
        AQUAMARINE = 0xFF7FFFD4,
        AZURE = 0xFFF0FFFF,
        BEIGE = 0xFFF5F5DC,
        BISQUE = 0xFFFFE4C4,
        BLACK = 0xFF000000,
        BLANCHEDALMOND = 0xFFFFEBCD,
        BLUE = 0xFF0000FF,
        BLUEVIOLET = 0xFF8A2BE2,
        BROWN = 0xFFA52A2A,
        BURLYWOOD = 0xFFDEB887,
        CADETBLUE = 0xFF5F9EA0,
        CHARTREUSE = 0xFF7FFF00,
        CHOCOLATE = 0xFFD2691E,
        CORAL = 0xFFFF7F50,
        CORNFLOWERBLUE = 0xFF6495ED,
        CORNSILK = 0xFFFFF8DC,
        CRIMSON = 0xFFDC143C,
        CYAN = 0xFF00FFFF,
        DARKBLUE = 0xFF00008B,
        DARKCYAN = 0xFF008B8B,
        DARKGOLDENROD = 0xFFB8860B,
        DARKGRAY = 0xFFA9A9A9,
        DARKGREEN = 0xFF006400,
        DARKKHAKI = 0xFFBDB76B,
        DARKMAGENTA = 0xFF8B008B,
        DARKOLIVEGREEN = 0xFF556B2F,
        DARKORANGE = 0xFFFF8C00,
        DARKORCHID = 0xFF9932CC,
        DARKRED = 0xFF8B0000,
        DARKSALMON = 0xFFE9967A,
        DARKSEAGREEN = 0xFF8FBC8B,
        DARKSLATEBLUE = 0xFF483D8B,
        DARKSLATEGRAY = 0xFF2F4F4F,
        DARKTURQUOISE = 0xFF00CED1,
        DARKVIOLET = 0xFF9400D3,
        DEEPPINK = 0xFFFF1493,
        DEEPSKYBLUE = 0xFF00BFFF,
        DIMGRAY = 0xFF696969,
        DODGERBLUE = 0xFF1E90FF,
        FIREBRICK = 0xFFB22222,
        FLORALWHITE = 0xFFFFFAF0,
        FORESTGREEN = 0xFF228B22,
        FUCHSIA = 0xFFFF00FF,
        GAINSBORO = 0xFFDCDCDC,
        GHOSTWHITE = 0xFFF8F8FF,
        GOLD = 0xFFFFD700,
        GOLDENROD = 0xFFDAA520,
        GRAY = 0xFF808080,
        GREEN = 0xFF008000,
        GREENYELLOW = 0xFFADFF2F,
        HONEYDEW = 0xFFF0FFF0,
        HOTPINK = 0xFFFF69B4,
        INDIANRED = 0xFFCD5C5C,
        INDIGO = 0xFF4B0082,
        IVORY = 0xFFFFFFF0,
        KHAKI = 0xFFF0E68C,
        LAVENDER = 0xFFE6E6FA,
        LAVENDERBLUSH = 0xFFFFF0F5,
        LAWNGREEN = 0xFF7CFC00,
        LEMONCHIFFON = 0xFFFFFACD,
        LIGHTBLUE = 0xFFADD8E6,
        LIGHTCORAL = 0xFFF08080,
        LIGHTCYAN = 0xFFE0FFFF,
        LIGHTGOLDENRODYELLOW = 0xFFFAFAD2,
        LIGHTGRAY = 0xFFD3D3D3,
        LIGHTGREEN = 0xFF90EE90,
        LIGHTPINK = 0xFFFFB6C1,
        LIGHTSALMON = 0xFFFFA07A,
        LIGHTSEAGREEN = 0xFF20B2AA,
        LIGHTSKYBLUE = 0xFF87CEFA,
        LIGHTSLATEGRAY = 0xFF778899,
        LIGHTSTEELBLUE = 0xFFB0C4DE,
        LIGHTYELLOW = 0xFFFFFFE0,
        LIME = 0xFF00FF00,
        LIMEGREEN = 0xFF32CD32,
        LINEN = 0xFFFAF0E6,
        MAGENTA = 0xFFFF00FF,
        MAROON = 0xFF800000,
        MEDIUMAQUAMARINE = 0xFF66CDAA,
        MEDIUMBLUE = 0xFF0000CD,
        MEDIUMORCHID = 0xFFBA55D3,
        MEDIUMPURPLE = 0xFF9370DB,
        MEDIUMSEAGREEN = 0xFF3CB371,
        MEDIUMSLATEBLUE = 0xFF7B68EE,
        MEDIUMSPRINGGREEN = 0xFF00FA9A,
        MEDIUMTURQUOISE = 0xFF48D1CC,
        MEDIUMVIOLETRED = 0xFFC71585,
        MIDNIGHTBLUE = 0xFF191970,
        MINTCREAM = 0xFFF5FFFA,
        MISTYROSE = 0xFFFFE4E1,
        MOCCASIN = 0xFFFFE4B5,
        NAVAJOWHITE = 0xFFFFDEAD,
        NAVY = 0xFF000080,
        OLDLACE = 0xFFFDF5E6,
        OLIVE = 0xFF808000,
        OLIVEDRAB = 0xFF6B8E23,
        ORANGE = 0xFFFFA500,
        ORANGERED = 0xFFFF4500,
        ORCHID = 0xFFDA70D6,
        PALEGOLDENROD = 0xFFEEE8AA,
        PALEGREEN = 0xFF98FB98,
        PALETURQUOISE = 0xFFAFEEEE,
        PALEVIOLETRED = 0xFFDB7093,
        PAPAYAWHIP = 0xFFFFEFD5,
        PEACHPUFF = 0xFFFFDAB9,
        PERU = 0xFFCD853F,
        PINK = 0xFFFFC0CB,
        PLUM = 0xFFDDA0DD,
        POWDERBLUE = 0xFFB0E0E6,
        PURPLE = 0xFF800080,
        RED = 0xFFFF0000,
        ROSYBROWN = 0xFFBC8F8F,
        ROYALBLUE = 0xFF4169E1,
        SADDLEBROWN = 0xFF8B4513,
        SALMON = 0xFFFA8072,
        SANDYBROWN = 0xFFF4A460,
        SEAGREEN = 0xFF2E8B57,
        SEASHELL = 0xFFFFF5EE,
        SIENNA = 0xFFA0522D,
        SILVER = 0xFFC0C0C0,
        SKYBLUE = 0xFF87CEEB,
        SLATEBLUE = 0xFF6A5ACD,
        SLATEGRAY = 0xFF708090,
        SNOW = 0xFFFFFAFA,
        SPRINGGREEN = 0xFF00FF7F,
        STEELBLUE = 0xFF4682B4,
        TAN = 0xFFD2B48C,
        TEAL = 0xFF008080,
        THISTLE = 0xFFD8BFD8,
        TOMATO = 0xFFFF6347,
        TRANSPARENT = 0xFFFFFF,
        TURQUOISE = 0xFF40E0D0,
        VIOLET = 0xFFEE82EE,
        WHEAT = 0xFFF5DEB3,
        WHITE = 0xFFFFFFFF,
        WHITESMOKE = 0xFFF5F5F5,
        YELLOW = 0xFFFFFF00,
        YELLOWGREEN = 0xFF9ACD32,

        C_COLOR_BLACK = 0,
        C_COLOR_WHITE = 255
        return self;

    }    }
        return self;


        return self;

    public enum csRptFormulaTypeUNKNOWN >>     public enum csRptFormulaType
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
        return self;

    }    }
        return self;


        return self;

    public enum csRptFileFormatUNKNOWN >>     public enum csRptFileFormat
    {
        CSRPTEXPORTHTML = 0,
        CSRPTEXPORTEXCEL = 1,
        CSRPTEXPORTWORD = 2,
        CSRPTEXPORTTXT = 3,
        CSRPTEXPORTTXTTAB = 4,
        CSRPTEXPORTXML = 5
        return self;

    }    }
        return self;


        return self;

    public enum HorizontalAlignmentUNKNOWN >>     public enum HorizontalAlignment
    {
        Left = 0,
        Right = 1,
        Center = 2
        return self;

    }    }
        return self;


        return self;

    public enum csReportBorderTypeUNKNOWN >>     public enum csReportBorderType
    {
        CSRPTBSNONE = 0,
        CSRPTBSFIXED = 1,
        CSRPTBS3D = 2
        return self;

    }    }
        return self;


        return self;

    public enum csRptGetLineResultUNKNOWN >>     public enum csRptGetLineResult
    {
        CSRPTGLNONE = 0,
        CSRPTGLDETAIL = 1,
        CSRPTGLGROUPHEADER = 2,
        CSRPTGLGROUPFOOTER = 3,
        CSRPTGLEND = 4,
        CSRPTGLNEWPAGE = 5,
        CSRPTGLVIRTUALH = 6,
        CSRPTGLVIRTUALF = 7,
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csRptNewPageResultUNKNOWN >>     public enum csRptNewPageResult
    {
        CSRPTNPERROR = 1,
        CSRPTNPSUCCESS = 2,
        CSRPTNPEND = 3
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csRptEndPageResultUNKNOWN >>     public enum csRptEndPageResult
    {
        CSRPTEPERROR = csRptNewPageResult.CSRPTNPERROR,
        CSRPTEPSUCCESS = csRptNewPageResult.CSRPTNPSUCCESS
        return self;

    }    }
        return self;


        return self;

    public enum csRptChartLineStyleUNKNOWN >>     public enum csRptChartLineStyle
    {
        NONE,
        HORIZONTAL,
        NUMBERED,
UNKNOWN >>         BOTH
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csRptChartPieThicknessUNKNOWN >>     public enum csRptChartPieThickness
    {
        NONE = 0,
        WAFER = 2,
        THIN = 4,
        MEDIUM = 8,
        THICK = 16,
        THICKEST = 32
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csRptChartPieDiameterUNKNOWN >>     public enum csRptChartPieDiameter
    {
        SMALLEST = 50,
        SMALLER = 100,
        SMALL = 150,
        MEDIUM = 200,
        LARGE = 250,
        LARGER = 350,
        LARGEST = 450
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csRptChartFormatUNKNOWN >>     public enum csRptChartFormat
    {
        GIF,
        JPEG,
        PNG,
UNKNOWN >>         BMP
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csRptChartTypeUNKNOWN >>     public enum csRptChartType
    {
        PIE,
UNKNOWN >>         BAR
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csEZoomUNKNOWN >>     public enum csEZoom
    {
        csEZoomCustom = -1,
        csEZoomAllPage = -2,
        csEZoomWidth = -3
        return self;

    }    }
        return self;


        return self;

	public enum csEAlignConstUNKNOWN >> 	public enum csEAlignConst
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
UNKNOWN >>         csEAlignCtlHeight
        return self;

    }    }
        return self;


        return self;

	public enum csECtlAlignConstUNKNOWN >> 	public enum csECtlAlignConst
    {
        csECtlAlignLeft = csEAlignConst.csEAlignCtlLeft,
        csECtlAlignHorizontal = csEAlignConst.csEAlignCtlHorizontal,
        csECtlAlignRight = csEAlignConst.csEAlignCtlRight,
        csECtlAlignVertical = csEAlignConst.csEAlignCtlVertical,
        csECtlAlignTop = csEAlignConst.csEAlignCtlTop,
        csECtlAlignBottom = csEAlignConst.csEAlignCtlBottom,
        csECtlAlignWidth = csEAlignConst.csEAlignCtlWidth,
        csECtlAlignHeight = csEAlignConst.csEAlignCtlHeight
        return self;

    }    }
        return self;


        return self;

    public enum csRptPageOrientationUNKNOWN >>     public enum csRptPageOrientation
    {
        PORTRAIT = 1,
        LANDSCAPE = 2
        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportGlobals {

  export interface IcReportGlobals {

    C_KEYINDEXCOL: string;
    C_KEYINDEXCOL2: string;
    C_KEYINDEXGROUP: string;
    getNextKey: () => int;
    refreshNextKey: (String) => void;
    getKey: (String) => String;
    isDbNull: (object) => bool;
    dateValue: (object) => DateTime;
    isDate: (String) => bool;
    valVariant: (object) => object;
    format: (object, String) => String;
    getRealName: (String) => String;
  }
}
