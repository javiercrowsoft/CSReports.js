(function(globalObject) {

    globalObject.CSReportGlobals = globalObject.CSReportGlobals || {}; //@@@: namespace CSReportGlobals
 //@@@: {
    globalObject.CSReportGlobals.createCReportGlobals = function() {

        const self = {}; //@@@: public static class cReportGlobals
        self.C_KEYINDEXCOL = "indexcol"; //@@@: public const String C_KEYINDEXCOL = "indexcol";
        self.C_KEYINDEXCOL2 = "indexcol2"; //@@@: public const String C_KEYINDEXCOL2 = "indexcol2";
        self.C_KEYINDEXGROUP = "indexgroup"; //@@@: public const String C_KEYINDEXGROUP = "indexgroup";

        let int m_nextKey = 1000; //@@@: private static int m_nextKey = 1000;

        self.getNextKey = function() { //@@@: public static int getNextKey()
            m_nextKey++; //@@@: m_nextKey++;
            return m_nextKey; //@@@: return m_nextKey;
        }; //@@@: }

        self.refreshNextKey = function(key) { //@@@: public static void refreshNextKey(String key)
            let keyNumber = 0; //@@@: int keyNumber = 0;
            if (G.isNumeric(key)) { //@@@: if (G.isNumeric(key))
                keyNumber = int.Parse(key); //@@@: keyNumber = int.Parse(key);
            } //@@@: }
            else { //@@@: else
                if (key.Length > 1)  { //@@@: if (key.Length > 1)
                    if (G.isNumeric(key.Substring(1))) { //@@@: if (G.isNumeric(key.Substring(1)))
                        keyNumber = int.Parse(key.Substring(1)); //@@@: keyNumber = int.Parse(key.Substring(1));
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            if (m_nextKey < keyNumber) { //@@@: if (m_nextKey < keyNumber)
                m_nextKey = keyNumber + 1; //@@@: m_nextKey = keyNumber + 1;
            } //@@@: }
        }; //@@@: }

        self.getKey = function(value) { //@@@: public static String getKey(String value)
            if (value.Length > 0) { //@@@: if (value.Length > 0)
                if ("0123456789".Contains(value.Substring(0, 1))) { //@@@: if ("0123456789".Contains(value.Substring(0, 1)))
                    value = "K" + value; //@@@: value = "K" + value;
                } //@@@: }
            } //@@@: }
            return value; //@@@: return value;
        }; //@@@: }

        self.isDbNull = function(val) { //@@@: public static bool isDbNull(object val)
            return val === null; //@@@: return val == null;
        }; //@@@: }

        self.dateValue = function(value) { //@@@: public static DateTime dateValue(object value)
            if (value === null) { //@@@: if (value == null)
                return CSDataBase.cConstants.C_NO_DATE; //@@@: return CSDataBase.cConstants.C_NO_DATE;
            } //@@@: }
            else { //@@@: else
UNKNOWN >>                 DateTime date; //@@@: DateTime date;
                if (DateTime.TryParse(value.ToString(), date)) { //@@@: if (DateTime.TryParse(value.ToString(), out date))
                    return date; //@@@: return date;
                } //@@@: }
                else { //@@@: else
                    return CSDataBase.cConstants.C_NO_DATE; //@@@: return CSDataBase.cConstants.C_NO_DATE;
                } //@@@: }
            } //@@@: }

        }; //@@@: }

        self.isDate = function(date) { //@@@: public static bool isDate(String date)
UNKNOWN >>             DateTime dummyDate; //@@@: DateTime dummyDate;
            return DateTime.TryParse(date, dummyDate); //@@@: return DateTime.TryParse(date, out dummyDate);
        }; //@@@: }

        self.valVariant = function(var) { //@@@: public static object valVariant(object var)
            if (var === null) { //@@@: if (var == null)
                let typeCode = System.Type.GetTypeCode(var.GetType()); //@@@: System.TypeCode typeCode = System.Type.GetTypeCode(var.GetType());
                switch (typeCode) //@@@: switch (typeCode)
                { //@@@: {
                    case System.TypeCode.Char: //@@@: case System.TypeCode.Char:
                    case System.TypeCode.String: //@@@: case System.TypeCode.String:
                        return ""; //@@@: return "";
                    case System.TypeCode.Decimal: //@@@: case System.TypeCode.Decimal:
                    case System.TypeCode.Double: //@@@: case System.TypeCode.Double:
                    case System.TypeCode.Int16: //@@@: case System.TypeCode.Int16:
                    case System.TypeCode.Int32: //@@@: case System.TypeCode.Int32:
                    case System.TypeCode.Int64: //@@@: case System.TypeCode.Int64:
                    case System.TypeCode.Single: //@@@: case System.TypeCode.Single:
                    case System.TypeCode.UInt16: //@@@: case System.TypeCode.UInt16:
                    case System.TypeCode.UInt32: //@@@: case System.TypeCode.UInt32:
                    case System.TypeCode.UInt64: //@@@: case System.TypeCode.UInt64:
                        return 0; //@@@: return 0;
                    case System.TypeCode.DateTime: //@@@: case System.TypeCode.DateTime:
                        return CSDataBase.cConstants.C_NO_DATE; //@@@: return CSDataBase.cConstants.C_NO_DATE;
                    case System.TypeCode.Boolean: //@@@: case System.TypeCode.Boolean:
                        return false; //@@@: return false;
                    default: //@@@: default:
                        return null; //@@@: return null;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                return var; //@@@: return var;
            } //@@@: }
        }; //@@@: }

        self.format = function(expression, strFormat) { //@@@: public static String format(object expression, String strFormat)
            if (expression === null) { //@@@: if (expression == null)
                return ""; //@@@: return "";
            } //@@@: }
            else { //@@@: else
                let isDate = false; //@@@: bool isDate = false;

                let typeCode = System.Type.GetTypeCode(expression.GetType()); //@@@: System.TypeCode typeCode = System.Type.GetTypeCode(expression.GetType());
                if (typeCode === System.TypeCode.DateTime) { //@@@: if (typeCode == System.TypeCode.DateTime)
                    if (expression === CSDataBase.cConstants.C_NO_DATE) { //@@@: if ((DateTime)expression == CSDataBase.cConstants.C_NO_DATE)
                        return ""; //@@@: return "";
                    } //@@@: }
                    isDate = true; //@@@: isDate = true;
                } //@@@: }
                if (strFormat === "") { //@@@: if (strFormat == "")
                    return expression.ToString(); //@@@: return expression.ToString();
                } //@@@: }
                else { //@@@: else
                    if (isDate) { //@@@: if (isDate)
                        return (expression).ToString(strFormat); //@@@: return ((DateTime)expression).ToString(strFormat);
                    } //@@@: }
                    else { //@@@: else
                        return cUtil.val(expression).ToString(strFormat); //@@@: return cUtil.val(expression).ToString(strFormat);
                    }                     //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.getRealName = function(name) { //@@@: public static String getRealName(String name)
            let n = name.IndexOf("}.", 1); //@@@: int n = name.IndexOf("}.", 1);
            if (n > -1) { //@@@: if (n > -1)
                n = n + 2; //@@@: n = n + 2;
            } //@@@: }
            else { //@@@: else
                n = 0; //@@@: n = 0;
            } //@@@: }
            return name.Substring(n); //@@@: return name.Substring(n);
        }; //@@@: }

        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptControlType  //@@@: public enum csRptControlType
    { //@@@: {
        CSRPTCTLABEL = 1, //@@@: CSRPTCTLABEL = 1,
        CSRPTCTFIELD = 2, //@@@: CSRPTCTFIELD = 2,
        CSRPTCTIMAGE = 3, //@@@: CSRPTCTIMAGE = 3,
        CSRPTCTDBIMAGE = 4, //@@@: CSRPTCTDBIMAGE = 4,
        CSRPTCTCHART = 5 //@@@: CSRPTCTCHART = 5
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptSectionType  //@@@: public enum csRptSectionType
    {  //@@@: {
        HEADER = 0, //@@@: HEADER = 0,
        DETAIL = 1, //@@@: DETAIL = 1,
        FOOTER = 2, //@@@: FOOTER = 2,
        GROUP_HEADER = 3, //@@@: GROUP_HEADER = 3,
        GROUP_FOOTER = 4, //@@@: GROUP_FOOTER = 4,
        MAIN_HEADER = 100, //@@@: MAIN_HEADER = 100,
        MAIN_DETAIL = 101, //@@@: MAIN_DETAIL = 101,
		MAIN_FOOTER = 102, //@@@: MAIN_FOOTER = 102,
		CONTROL = 50, //@@@: CONTROL = 50,
		SECLN_HEADER = 1000, //@@@: SECLN_HEADER = 1000,
		SECLN_DETAIL = 1001, //@@@: SECLN_DETAIL = 1001,
		SECLN_FOOTER = 1002, //@@@: SECLN_FOOTER = 1002,
		SECLN_GROUPH = 1003, //@@@: SECLN_GROUPH = 1003,
		SECLN_GROUPF = 1004 //@@@: SECLN_GROUPF = 1004
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptLaunchAction //@@@: public enum csRptLaunchAction
    { //@@@: {
        CSRPTLAUNCHPRINTER = 0, //@@@: CSRPTLAUNCHPRINTER = 0,
        CSRPTLAUNCHFILE = 1, //@@@: CSRPTLAUNCHFILE = 1,
        CSRPTLAUNCHPREVIEW = 2 //@@@: CSRPTLAUNCHPREVIEW = 2
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptWhenEval //@@@: public enum csRptWhenEval
    { //@@@: {
        CSRPTEVALPRE = 0, //@@@: CSRPTEVALPRE = 0,
        CSRPTEVALPOST = 1 //@@@: CSRPTEVALPOST = 1
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csDataSourceType //@@@: public enum csDataSourceType
    { //@@@: {
        CSDTTABLE = 1, //@@@: CSDTTABLE = 1,
        CDDTPROCEDURE = 2 //@@@: CDDTPROCEDURE = 2
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptErrors //@@@: public enum csRptErrors
    { //@@@: {
        LAUNCH_INFO_UNDEFINED = 1001, //@@@: LAUNCH_INFO_UNDEFINED = 1001,
        SINTAX_ERROR_MISSING_BRAKETS, //@@@: SINTAX_ERROR_MISSING_BRAKETS,
        CSRPTERRINDEFINEDFUNCTION, //@@@: CSRPTERRINDEFINEDFUNCTION,
        CSRPTERRMISSINGPARAM, //@@@: CSRPTERRMISSINGPARAM,
        CONTROL_NOT_FOUND, //@@@: CONTROL_NOT_FOUND,
        GROUP_NOT_FOUND, //@@@: GROUP_NOT_FOUND,
        FIELD_NOT_FOUND, //@@@: FIELD_NOT_FOUND,
        CSRPTERRVARNOTDEFINED, //@@@: CSRPTERRVARNOTDEFINED,
        PRINTER_NOT_DEFINED, //@@@: PRINTER_NOT_DEFINED,
        GROUP_NOT_FOUND_IN_MAIN_RS, //@@@: GROUP_NOT_FOUND_IN_MAIN_RS,
        CSRPTERRPARAMNOTDEFINED, //@@@: CSRPTERRPARAMNOTDEFINED,
        ERROR_IN_SCRIPT, //@@@: ERROR_IN_SCRIPT,
UNKNOWN >>         ERROR_WHEN_RUNNING_REPORT //@@@: ERROR_WHEN_RUNNING_REPORT
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csReportPaperType //@@@: public enum csReportPaperType
    { //@@@: {
        CSRPTPAPERTYPEA4 = 9, //@@@: CSRPTPAPERTYPEA4 = 9,
        CSRPTPAPERTYPEA3 = 8, //@@@: CSRPTPAPERTYPEA3 = 8,
        CSRPTPAPERTYPELETTER = 1, //@@@: CSRPTPAPERTYPELETTER = 1,
        CSRPTPAPERTYPELEGAL = 5, //@@@: CSRPTPAPERTYPELEGAL = 5,
        CSRPTPAPERNOTSUPORTED = 0, //@@@: CSRPTPAPERNOTSUPORTED = 0,
        CSRPTPAPERUSER = 99 //@@@: CSRPTPAPERUSER = 99
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptGrpOrderType //@@@: public enum csRptGrpOrderType
    { //@@@: {
        CSRPTGRPASC = 1, //@@@: CSRPTGRPASC = 1,
        CSRPTGRPDESC = 2 //@@@: CSRPTGRPDESC = 2
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptGrpComparisonType //@@@: public enum csRptGrpComparisonType
    { //@@@: {
        CSRPTGRPTEXT = 1, //@@@: CSRPTGRPTEXT = 1,
        CSRPTGRPNUMBER = 2, //@@@: CSRPTGRPNUMBER = 2,
        CSRPTGRPDATE = 3 //@@@: CSRPTGRPDATE = 3
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csColors : uint //@@@: public enum csColors : uint
    { //@@@: {
        ALICEBLUE = 0xFFF0F8FF, //@@@: ALICEBLUE = 0xFFF0F8FF,
        ANTIQUEWHITE = 0xFFFAEBD7, //@@@: ANTIQUEWHITE = 0xFFFAEBD7,
        AQUA = 0xFF00FFFF, //@@@: AQUA = 0xFF00FFFF,
        AQUAMARINE = 0xFF7FFFD4, //@@@: AQUAMARINE = 0xFF7FFFD4,
        AZURE = 0xFFF0FFFF, //@@@: AZURE = 0xFFF0FFFF,
        BEIGE = 0xFFF5F5DC, //@@@: BEIGE = 0xFFF5F5DC,
        BISQUE = 0xFFFFE4C4, //@@@: BISQUE = 0xFFFFE4C4,
        BLACK = 0xFF000000, //@@@: BLACK = 0xFF000000,
        BLANCHEDALMOND = 0xFFFFEBCD, //@@@: BLANCHEDALMOND = 0xFFFFEBCD,
        BLUE = 0xFF0000FF, //@@@: BLUE = 0xFF0000FF,
        BLUEVIOLET = 0xFF8A2BE2, //@@@: BLUEVIOLET = 0xFF8A2BE2,
        BROWN = 0xFFA52A2A, //@@@: BROWN = 0xFFA52A2A,
        BURLYWOOD = 0xFFDEB887, //@@@: BURLYWOOD = 0xFFDEB887,
        CADETBLUE = 0xFF5F9EA0, //@@@: CADETBLUE = 0xFF5F9EA0,
        CHARTREUSE = 0xFF7FFF00, //@@@: CHARTREUSE = 0xFF7FFF00,
        CHOCOLATE = 0xFFD2691E, //@@@: CHOCOLATE = 0xFFD2691E,
        CORAL = 0xFFFF7F50, //@@@: CORAL = 0xFFFF7F50,
        CORNFLOWERBLUE = 0xFF6495ED, //@@@: CORNFLOWERBLUE = 0xFF6495ED,
        CORNSILK = 0xFFFFF8DC, //@@@: CORNSILK = 0xFFFFF8DC,
        CRIMSON = 0xFFDC143C, //@@@: CRIMSON = 0xFFDC143C,
        CYAN = 0xFF00FFFF, //@@@: CYAN = 0xFF00FFFF,
        DARKBLUE = 0xFF00008B, //@@@: DARKBLUE = 0xFF00008B,
        DARKCYAN = 0xFF008B8B, //@@@: DARKCYAN = 0xFF008B8B,
        DARKGOLDENROD = 0xFFB8860B, //@@@: DARKGOLDENROD = 0xFFB8860B,
        DARKGRAY = 0xFFA9A9A9, //@@@: DARKGRAY = 0xFFA9A9A9,
        DARKGREEN = 0xFF006400, //@@@: DARKGREEN = 0xFF006400,
        DARKKHAKI = 0xFFBDB76B, //@@@: DARKKHAKI = 0xFFBDB76B,
        DARKMAGENTA = 0xFF8B008B, //@@@: DARKMAGENTA = 0xFF8B008B,
        DARKOLIVEGREEN = 0xFF556B2F, //@@@: DARKOLIVEGREEN = 0xFF556B2F,
        DARKORANGE = 0xFFFF8C00, //@@@: DARKORANGE = 0xFFFF8C00,
        DARKORCHID = 0xFF9932CC, //@@@: DARKORCHID = 0xFF9932CC,
        DARKRED = 0xFF8B0000, //@@@: DARKRED = 0xFF8B0000,
        DARKSALMON = 0xFFE9967A, //@@@: DARKSALMON = 0xFFE9967A,
        DARKSEAGREEN = 0xFF8FBC8B, //@@@: DARKSEAGREEN = 0xFF8FBC8B,
        DARKSLATEBLUE = 0xFF483D8B, //@@@: DARKSLATEBLUE = 0xFF483D8B,
        DARKSLATEGRAY = 0xFF2F4F4F, //@@@: DARKSLATEGRAY = 0xFF2F4F4F,
        DARKTURQUOISE = 0xFF00CED1, //@@@: DARKTURQUOISE = 0xFF00CED1,
        DARKVIOLET = 0xFF9400D3, //@@@: DARKVIOLET = 0xFF9400D3,
        DEEPPINK = 0xFFFF1493, //@@@: DEEPPINK = 0xFFFF1493,
        DEEPSKYBLUE = 0xFF00BFFF, //@@@: DEEPSKYBLUE = 0xFF00BFFF,
        DIMGRAY = 0xFF696969, //@@@: DIMGRAY = 0xFF696969,
        DODGERBLUE = 0xFF1E90FF, //@@@: DODGERBLUE = 0xFF1E90FF,
        FIREBRICK = 0xFFB22222, //@@@: FIREBRICK = 0xFFB22222,
        FLORALWHITE = 0xFFFFFAF0, //@@@: FLORALWHITE = 0xFFFFFAF0,
        FORESTGREEN = 0xFF228B22, //@@@: FORESTGREEN = 0xFF228B22,
        FUCHSIA = 0xFFFF00FF, //@@@: FUCHSIA = 0xFFFF00FF,
        GAINSBORO = 0xFFDCDCDC, //@@@: GAINSBORO = 0xFFDCDCDC,
        GHOSTWHITE = 0xFFF8F8FF, //@@@: GHOSTWHITE = 0xFFF8F8FF,
        GOLD = 0xFFFFD700, //@@@: GOLD = 0xFFFFD700,
        GOLDENROD = 0xFFDAA520, //@@@: GOLDENROD = 0xFFDAA520,
        GRAY = 0xFF808080, //@@@: GRAY = 0xFF808080,
        GREEN = 0xFF008000, //@@@: GREEN = 0xFF008000,
        GREENYELLOW = 0xFFADFF2F, //@@@: GREENYELLOW = 0xFFADFF2F,
        HONEYDEW = 0xFFF0FFF0, //@@@: HONEYDEW = 0xFFF0FFF0,
        HOTPINK = 0xFFFF69B4, //@@@: HOTPINK = 0xFFFF69B4,
        INDIANRED = 0xFFCD5C5C, //@@@: INDIANRED = 0xFFCD5C5C,
        INDIGO = 0xFF4B0082, //@@@: INDIGO = 0xFF4B0082,
        IVORY = 0xFFFFFFF0, //@@@: IVORY = 0xFFFFFFF0,
        KHAKI = 0xFFF0E68C, //@@@: KHAKI = 0xFFF0E68C,
        LAVENDER = 0xFFE6E6FA, //@@@: LAVENDER = 0xFFE6E6FA,
        LAVENDERBLUSH = 0xFFFFF0F5, //@@@: LAVENDERBLUSH = 0xFFFFF0F5,
        LAWNGREEN = 0xFF7CFC00, //@@@: LAWNGREEN = 0xFF7CFC00,
        LEMONCHIFFON = 0xFFFFFACD, //@@@: LEMONCHIFFON = 0xFFFFFACD,
        LIGHTBLUE = 0xFFADD8E6, //@@@: LIGHTBLUE = 0xFFADD8E6,
        LIGHTCORAL = 0xFFF08080, //@@@: LIGHTCORAL = 0xFFF08080,
        LIGHTCYAN = 0xFFE0FFFF, //@@@: LIGHTCYAN = 0xFFE0FFFF,
        LIGHTGOLDENRODYELLOW = 0xFFFAFAD2, //@@@: LIGHTGOLDENRODYELLOW = 0xFFFAFAD2,
        LIGHTGRAY = 0xFFD3D3D3, //@@@: LIGHTGRAY = 0xFFD3D3D3,
        LIGHTGREEN = 0xFF90EE90, //@@@: LIGHTGREEN = 0xFF90EE90,
        LIGHTPINK = 0xFFFFB6C1, //@@@: LIGHTPINK = 0xFFFFB6C1,
        LIGHTSALMON = 0xFFFFA07A, //@@@: LIGHTSALMON = 0xFFFFA07A,
        LIGHTSEAGREEN = 0xFF20B2AA, //@@@: LIGHTSEAGREEN = 0xFF20B2AA,
        LIGHTSKYBLUE = 0xFF87CEFA, //@@@: LIGHTSKYBLUE = 0xFF87CEFA,
        LIGHTSLATEGRAY = 0xFF778899, //@@@: LIGHTSLATEGRAY = 0xFF778899,
        LIGHTSTEELBLUE = 0xFFB0C4DE, //@@@: LIGHTSTEELBLUE = 0xFFB0C4DE,
        LIGHTYELLOW = 0xFFFFFFE0, //@@@: LIGHTYELLOW = 0xFFFFFFE0,
        LIME = 0xFF00FF00, //@@@: LIME = 0xFF00FF00,
        LIMEGREEN = 0xFF32CD32, //@@@: LIMEGREEN = 0xFF32CD32,
        LINEN = 0xFFFAF0E6, //@@@: LINEN = 0xFFFAF0E6,
        MAGENTA = 0xFFFF00FF, //@@@: MAGENTA = 0xFFFF00FF,
        MAROON = 0xFF800000, //@@@: MAROON = 0xFF800000,
        MEDIUMAQUAMARINE = 0xFF66CDAA, //@@@: MEDIUMAQUAMARINE = 0xFF66CDAA,
        MEDIUMBLUE = 0xFF0000CD, //@@@: MEDIUMBLUE = 0xFF0000CD,
        MEDIUMORCHID = 0xFFBA55D3, //@@@: MEDIUMORCHID = 0xFFBA55D3,
        MEDIUMPURPLE = 0xFF9370DB, //@@@: MEDIUMPURPLE = 0xFF9370DB,
        MEDIUMSEAGREEN = 0xFF3CB371, //@@@: MEDIUMSEAGREEN = 0xFF3CB371,
        MEDIUMSLATEBLUE = 0xFF7B68EE, //@@@: MEDIUMSLATEBLUE = 0xFF7B68EE,
        MEDIUMSPRINGGREEN = 0xFF00FA9A, //@@@: MEDIUMSPRINGGREEN = 0xFF00FA9A,
        MEDIUMTURQUOISE = 0xFF48D1CC, //@@@: MEDIUMTURQUOISE = 0xFF48D1CC,
        MEDIUMVIOLETRED = 0xFFC71585, //@@@: MEDIUMVIOLETRED = 0xFFC71585,
        MIDNIGHTBLUE = 0xFF191970, //@@@: MIDNIGHTBLUE = 0xFF191970,
        MINTCREAM = 0xFFF5FFFA, //@@@: MINTCREAM = 0xFFF5FFFA,
        MISTYROSE = 0xFFFFE4E1, //@@@: MISTYROSE = 0xFFFFE4E1,
        MOCCASIN = 0xFFFFE4B5, //@@@: MOCCASIN = 0xFFFFE4B5,
        NAVAJOWHITE = 0xFFFFDEAD, //@@@: NAVAJOWHITE = 0xFFFFDEAD,
        NAVY = 0xFF000080, //@@@: NAVY = 0xFF000080,
        OLDLACE = 0xFFFDF5E6, //@@@: OLDLACE = 0xFFFDF5E6,
        OLIVE = 0xFF808000, //@@@: OLIVE = 0xFF808000,
        OLIVEDRAB = 0xFF6B8E23, //@@@: OLIVEDRAB = 0xFF6B8E23,
        ORANGE = 0xFFFFA500, //@@@: ORANGE = 0xFFFFA500,
        ORANGERED = 0xFFFF4500, //@@@: ORANGERED = 0xFFFF4500,
        ORCHID = 0xFFDA70D6, //@@@: ORCHID = 0xFFDA70D6,
        PALEGOLDENROD = 0xFFEEE8AA, //@@@: PALEGOLDENROD = 0xFFEEE8AA,
        PALEGREEN = 0xFF98FB98, //@@@: PALEGREEN = 0xFF98FB98,
        PALETURQUOISE = 0xFFAFEEEE, //@@@: PALETURQUOISE = 0xFFAFEEEE,
        PALEVIOLETRED = 0xFFDB7093, //@@@: PALEVIOLETRED = 0xFFDB7093,
        PAPAYAWHIP = 0xFFFFEFD5, //@@@: PAPAYAWHIP = 0xFFFFEFD5,
        PEACHPUFF = 0xFFFFDAB9, //@@@: PEACHPUFF = 0xFFFFDAB9,
        PERU = 0xFFCD853F, //@@@: PERU = 0xFFCD853F,
        PINK = 0xFFFFC0CB, //@@@: PINK = 0xFFFFC0CB,
        PLUM = 0xFFDDA0DD, //@@@: PLUM = 0xFFDDA0DD,
        POWDERBLUE = 0xFFB0E0E6, //@@@: POWDERBLUE = 0xFFB0E0E6,
        PURPLE = 0xFF800080, //@@@: PURPLE = 0xFF800080,
        RED = 0xFFFF0000, //@@@: RED = 0xFFFF0000,
        ROSYBROWN = 0xFFBC8F8F, //@@@: ROSYBROWN = 0xFFBC8F8F,
        ROYALBLUE = 0xFF4169E1, //@@@: ROYALBLUE = 0xFF4169E1,
        SADDLEBROWN = 0xFF8B4513, //@@@: SADDLEBROWN = 0xFF8B4513,
        SALMON = 0xFFFA8072, //@@@: SALMON = 0xFFFA8072,
        SANDYBROWN = 0xFFF4A460, //@@@: SANDYBROWN = 0xFFF4A460,
        SEAGREEN = 0xFF2E8B57, //@@@: SEAGREEN = 0xFF2E8B57,
        SEASHELL = 0xFFFFF5EE, //@@@: SEASHELL = 0xFFFFF5EE,
        SIENNA = 0xFFA0522D, //@@@: SIENNA = 0xFFA0522D,
        SILVER = 0xFFC0C0C0, //@@@: SILVER = 0xFFC0C0C0,
        SKYBLUE = 0xFF87CEEB, //@@@: SKYBLUE = 0xFF87CEEB,
        SLATEBLUE = 0xFF6A5ACD, //@@@: SLATEBLUE = 0xFF6A5ACD,
        SLATEGRAY = 0xFF708090, //@@@: SLATEGRAY = 0xFF708090,
        SNOW = 0xFFFFFAFA, //@@@: SNOW = 0xFFFFFAFA,
        SPRINGGREEN = 0xFF00FF7F, //@@@: SPRINGGREEN = 0xFF00FF7F,
        STEELBLUE = 0xFF4682B4, //@@@: STEELBLUE = 0xFF4682B4,
        TAN = 0xFFD2B48C, //@@@: TAN = 0xFFD2B48C,
        TEAL = 0xFF008080, //@@@: TEAL = 0xFF008080,
        THISTLE = 0xFFD8BFD8, //@@@: THISTLE = 0xFFD8BFD8,
        TOMATO = 0xFFFF6347, //@@@: TOMATO = 0xFFFF6347,
        TRANSPARENT = 0xFFFFFF, //@@@: TRANSPARENT = 0xFFFFFF,
        TURQUOISE = 0xFF40E0D0, //@@@: TURQUOISE = 0xFF40E0D0,
        VIOLET = 0xFFEE82EE, //@@@: VIOLET = 0xFFEE82EE,
        WHEAT = 0xFFF5DEB3, //@@@: WHEAT = 0xFFF5DEB3,
        WHITE = 0xFFFFFFFF, //@@@: WHITE = 0xFFFFFFFF,
        WHITESMOKE = 0xFFF5F5F5, //@@@: WHITESMOKE = 0xFFF5F5F5,
        YELLOW = 0xFFFFFF00, //@@@: YELLOW = 0xFFFFFF00,
        YELLOWGREEN = 0xFF9ACD32, //@@@: YELLOWGREEN = 0xFF9ACD32,

        C_COLOR_BLACK = 0, //@@@: C_COLOR_BLACK = 0,
        C_COLOR_WHITE = 255 //@@@: C_COLOR_WHITE = 255
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptFormulaType //@@@: public enum csRptFormulaType
    { //@@@: {
        CSRPTF_PAGE_NUMBER = 10001, //@@@: CSRPTF_PAGE_NUMBER = 10001,
        CSRPTF_TOTAL_PAGES = 10002, //@@@: CSRPTF_TOTAL_PAGES = 10002,
        CSRPTF_AVERAGE = 10003, //@@@: CSRPTF_AVERAGE = 10003,
        CSRPTF_SUM = 10004, //@@@: CSRPTF_SUM = 10004,
        CSRPTF_MAX = 10005, //@@@: CSRPTF_MAX = 10005,
        CSRPTF_MIN = 10006, //@@@: CSRPTF_MIN = 10006,
        CSRPTF_COUNT = 10007, //@@@: CSRPTF_COUNT = 10007,
        CSRPTF_LENGTH = 10008, //@@@: CSRPTF_LENGTH = 10008,
        CSRPTF_CALCULO = 10009, //@@@: CSRPTF_CALCULO = 10009,
        CSRPTF_SUM_TIME = 10010, //@@@: CSRPTF_SUM_TIME = 10010,
        CSRPTF_GET_STRING = 10011, //@@@: CSRPTF_GET_STRING = 10011,
        CSRPTF_NUMBER_TO_STRING = 10012, //@@@: CSRPTF_NUMBER_TO_STRING = 10012,
        CSRPTF_VAL = 1010, //@@@: CSRPTF_VAL = 1010,
        CSRPTF_DECLARE_VAR = 10013, //@@@: CSRPTF_DECLARE_VAR = 10013,
        CSRPTF_GET_VAR = 10014, //@@@: CSRPTF_GET_VAR = 10014,
        CSRPTF_ADD_TO_VAR = 10015, //@@@: CSRPTF_ADD_TO_VAR = 10015,
        CSRPTF_SET_VAR = 10016, //@@@: CSRPTF_SET_VAR = 10016,
        CSRPTF_GET_DATA_FROM_RS_AD = 10017, //@@@: CSRPTF_GET_DATA_FROM_RS_AD = 10017,
        CSRPTF_GET_PARAM = 10018, //@@@: CSRPTF_GET_PARAM = 10018,
        CSRPTF_IS_EQUAL = 10019, //@@@: CSRPTF_IS_EQUAL = 10019,
        CSRPTF_IS_NOT_EQUAL = 10020, //@@@: CSRPTF_IS_NOT_EQUAL = 10020,
        CSRPTF_IS_GREATER_THAN = 10021, //@@@: CSRPTF_IS_GREATER_THAN = 10021,
        CSRPTF_IS_LESS_THAN = 10022, //@@@: CSRPTF_IS_LESS_THAN = 10022,
        CSRPTF_GET_DATA_FROM_RS = 10023, //@@@: CSRPTF_GET_DATA_FROM_RS = 10023,
        CSRPTF_GROUP_TOTAL = 10024, //@@@: CSRPTF_GROUP_TOTAL = 10024,
        CSRPTF_GROUP_MAX = 10025, //@@@: CSRPTF_GROUP_MAX = 10025,
        CSRPTF_GROUP_MIN = 10026, //@@@: CSRPTF_GROUP_MIN = 10026,
        CSRPTF_GROUP_AVERAGE = 10027, //@@@: CSRPTF_GROUP_AVERAGE = 10027,
        CSRPTF_GROUP_PERCENT = 10028, //@@@: CSRPTF_GROUP_PERCENT = 10028,
        CSRPTF_GROUP_COUNT = 10029, //@@@: CSRPTF_GROUP_COUNT = 10029,
        CSRPTF_GROUP_LINE_NUMBER = 10030, //@@@: CSRPTF_GROUP_LINE_NUMBER = 10030,
        CSRPTF_IS_IN_RS = 10031, //@@@: CSRPTF_IS_IN_RS = 10031,
        CSRPTF_TEXT_REPLACE = 10032, //@@@: CSRPTF_TEXT_REPLACE = 10032,
        CSRPTF_GET_BARCODE = 10033 //@@@: CSRPTF_GET_BARCODE = 10033
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptFileFormat //@@@: public enum csRptFileFormat
    { //@@@: {
        CSRPTEXPORTHTML = 0, //@@@: CSRPTEXPORTHTML = 0,
        CSRPTEXPORTEXCEL = 1, //@@@: CSRPTEXPORTEXCEL = 1,
        CSRPTEXPORTWORD = 2, //@@@: CSRPTEXPORTWORD = 2,
        CSRPTEXPORTTXT = 3, //@@@: CSRPTEXPORTTXT = 3,
        CSRPTEXPORTTXTTAB = 4, //@@@: CSRPTEXPORTTXTTAB = 4,
        CSRPTEXPORTXML = 5 //@@@: CSRPTEXPORTXML = 5
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum HorizontalAlignment //@@@: public enum HorizontalAlignment
    { //@@@: {
        Left = 0, //@@@: Left = 0,
        Right = 1, //@@@: Right = 1,
        Center = 2 //@@@: Center = 2
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csReportBorderType //@@@: public enum csReportBorderType
    { //@@@: {
        CSRPTBSNONE = 0, //@@@: CSRPTBSNONE = 0,
        CSRPTBSFIXED = 1, //@@@: CSRPTBSFIXED = 1,
        CSRPTBS3D = 2 //@@@: CSRPTBS3D = 2
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptGetLineResult //@@@: public enum csRptGetLineResult
    { //@@@: {
        CSRPTGLNONE = 0, //@@@: CSRPTGLNONE = 0,
        CSRPTGLDETAIL = 1, //@@@: CSRPTGLDETAIL = 1,
        CSRPTGLGROUPHEADER = 2, //@@@: CSRPTGLGROUPHEADER = 2,
        CSRPTGLGROUPFOOTER = 3, //@@@: CSRPTGLGROUPFOOTER = 3,
        CSRPTGLEND = 4, //@@@: CSRPTGLEND = 4,
        CSRPTGLNEWPAGE = 5, //@@@: CSRPTGLNEWPAGE = 5,
        CSRPTGLVIRTUALH = 6, //@@@: CSRPTGLVIRTUALH = 6,
        CSRPTGLVIRTUALF = 7, //@@@: CSRPTGLVIRTUALF = 7,
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csRptNewPageResult //@@@: public enum csRptNewPageResult
    { //@@@: {
        CSRPTNPERROR = 1, //@@@: CSRPTNPERROR = 1,
        CSRPTNPSUCCESS = 2, //@@@: CSRPTNPSUCCESS = 2,
        CSRPTNPEND = 3 //@@@: CSRPTNPEND = 3
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csRptEndPageResult //@@@: public enum csRptEndPageResult
    { //@@@: {
        CSRPTEPERROR = csRptNewPageResult.CSRPTNPERROR, //@@@: CSRPTEPERROR = csRptNewPageResult.CSRPTNPERROR,
        CSRPTEPSUCCESS = csRptNewPageResult.CSRPTNPSUCCESS //@@@: CSRPTEPSUCCESS = csRptNewPageResult.CSRPTNPSUCCESS
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptChartLineStyle //@@@: public enum csRptChartLineStyle
    { //@@@: {
        NONE, //@@@: NONE,
        HORIZONTAL, //@@@: HORIZONTAL,
        NUMBERED, //@@@: NUMBERED,
UNKNOWN >>         BOTH //@@@: BOTH
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csRptChartPieThickness //@@@: public enum csRptChartPieThickness
    { //@@@: {
        NONE = 0, //@@@: NONE = 0,
        WAFER = 2, //@@@: WAFER = 2,
        THIN = 4, //@@@: THIN = 4,
        MEDIUM = 8, //@@@: MEDIUM = 8,
        THICK = 16, //@@@: THICK = 16,
        THICKEST = 32 //@@@: THICKEST = 32
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csRptChartPieDiameter //@@@: public enum csRptChartPieDiameter
    { //@@@: {
        SMALLEST = 50, //@@@: SMALLEST = 50,
        SMALLER = 100, //@@@: SMALLER = 100,
        SMALL = 150, //@@@: SMALL = 150,
        MEDIUM = 200, //@@@: MEDIUM = 200,
        LARGE = 250, //@@@: LARGE = 250,
        LARGER = 350, //@@@: LARGER = 350,
        LARGEST = 450 //@@@: LARGEST = 450
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csRptChartFormat //@@@: public enum csRptChartFormat
    { //@@@: {
        GIF, //@@@: GIF,
        JPEG, //@@@: JPEG,
        PNG, //@@@: PNG,
UNKNOWN >>         BMP //@@@: BMP
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csRptChartType //@@@: public enum csRptChartType
    { //@@@: {
        PIE, //@@@: PIE,
UNKNOWN >>         BAR //@@@: BAR
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csEZoom //@@@: public enum csEZoom
    { //@@@: {
        csEZoomCustom = -1, //@@@: csEZoomCustom = -1,
        csEZoomAllPage = -2, //@@@: csEZoomAllPage = -2,
        csEZoomWidth = -3 //@@@: csEZoomWidth = -3
        return self;

    } //@@@: }

UNKNOWN >>         return self;

	public enum csEAlignConst //@@@: public enum csEAlignConst
    { //@@@: {
        csEAlignTextLeft = 1, //@@@: csEAlignTextLeft = 1,
        csEAlignTextRight, //@@@: csEAlignTextRight,
        csEAlignTextCenter, //@@@: csEAlignTextCenter,

        csEAlignCtlLeft, //@@@: csEAlignCtlLeft,
        csEAlignCtlHorizontal, //@@@: csEAlignCtlHorizontal,
        csEAlignCtlRight, //@@@: csEAlignCtlRight,
        csEAlignCtlVertical, //@@@: csEAlignCtlVertical,
        csEAlignCtlTop, //@@@: csEAlignCtlTop,
        csEAlignCtlBottom, //@@@: csEAlignCtlBottom,

        csEAlignCtlWidth, //@@@: csEAlignCtlWidth,
UNKNOWN >>         csEAlignCtlHeight //@@@: csEAlignCtlHeight
        return self;

    } //@@@: }

UNKNOWN >>         return self;

	public enum csECtlAlignConst //@@@: public enum csECtlAlignConst
    { //@@@: {
        csECtlAlignLeft = csEAlignConst.csEAlignCtlLeft, //@@@: csECtlAlignLeft = csEAlignConst.csEAlignCtlLeft,
        csECtlAlignHorizontal = csEAlignConst.csEAlignCtlHorizontal, //@@@: csECtlAlignHorizontal = csEAlignConst.csEAlignCtlHorizontal,
        csECtlAlignRight = csEAlignConst.csEAlignCtlRight, //@@@: csECtlAlignRight = csEAlignConst.csEAlignCtlRight,
        csECtlAlignVertical = csEAlignConst.csEAlignCtlVertical, //@@@: csECtlAlignVertical = csEAlignConst.csEAlignCtlVertical,
        csECtlAlignTop = csEAlignConst.csEAlignCtlTop, //@@@: csECtlAlignTop = csEAlignConst.csEAlignCtlTop,
        csECtlAlignBottom = csEAlignConst.csEAlignCtlBottom, //@@@: csECtlAlignBottom = csEAlignConst.csEAlignCtlBottom,
        csECtlAlignWidth = csEAlignConst.csEAlignCtlWidth, //@@@: csECtlAlignWidth = csEAlignConst.csEAlignCtlWidth,
        csECtlAlignHeight = csEAlignConst.csEAlignCtlHeight //@@@: csECtlAlignHeight = csEAlignConst.csEAlignCtlHeight
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptPageOrientation //@@@: public enum csRptPageOrientation
    { //@@@: {
        PORTRAIT = 1, //@@@: PORTRAIT = 1,
        LANDSCAPE = 2 //@@@: LANDSCAPE = 2
        return self;

    } //@@@: }

}(globalObject)); //@@@: }