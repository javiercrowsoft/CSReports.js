(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createCGlobals = function() {

        const self = {}; //@@@: public static class cGlobals

        self.C_MODULE = "CSReportEditor.cGlobals"; //@@@: public const String C_MODULE = "CSReportEditor.cGlobals";

        self.C_KEY_HEADER = "RH"; //@@@: public const String C_KEY_HEADER = "RH";
        self.C_KEY_FOOTER = "RF"; //@@@: public const String C_KEY_FOOTER = "RF";
        self.C_KEY_DETAIL = "RD"; //@@@: public const String C_KEY_DETAIL = "RD";
        self.C_KEY_GROUPH = "GH"; //@@@: public const String C_KEY_GROUPH = "GH";
        self.C_KEY_GROUPF = "GF"; //@@@: public const String C_KEY_GROUPF = "GF";

        self.c_BTN_PRINT        = "PRINT"; //@@@: public const String c_BTN_PRINT        = "PRINT";
        self.c_BTN_PROPERTIES   = "PROPERTIES"; //@@@: public const String c_BTN_PROPERTIES   = "PROPERTIES";
        self.c_BTN_DB           = "DB"; //@@@: public const String c_BTN_DB           = "DB";
        self.c_BTN_SAVE         = "SAVE"; //@@@: public const String c_BTN_SAVE         = "SAVE";
        self.c_BTN_OPEN         = "OPEN"; //@@@: public const String c_BTN_OPEN         = "OPEN";
        self.c_BTN_TOOL         = "TOOL"; //@@@: public const String c_BTN_TOOL         = "TOOL";
        self.c_BTN_NEW          = "NEW"; //@@@: public const String c_BTN_NEW          = "NEW";
        self.c_BTN_PREV         = "PREV"; //@@@: public const String c_BTN_PREV         = "PREV";

        self.c_BTN_ALIGN_LEFT   = "ALIGN_LEFT"; //@@@: public const String c_BTN_ALIGN_LEFT   = "ALIGN_LEFT";
        self.c_BTN_ALIGN_CENTER = "ALIGN_CENTER"; //@@@: public const String c_BTN_ALIGN_CENTER = "ALIGN_CENTER";
        self.c_BTN_ALIGN_RIGHT  = "ALIGN_RIGHT"; //@@@: public const String c_BTN_ALIGN_RIGHT  = "ALIGN_RIGHT";

        self.c_BTN_FONT_BOLD = "FONT_BOLD"; //@@@: public const string c_BTN_FONT_BOLD = "FONT_BOLD";
        self.c_BTN_SEARCH = "SEARCH"; //@@@: public const string c_BTN_SEARCH = "SEARCH";

        self.c_BTN_CTL_ALIGN_TOP        = "CTL_ALIGN_TOP"; //@@@: public const String c_BTN_CTL_ALIGN_TOP        = "CTL_ALIGN_TOP";
        self.c_BTN_CTL_ALIGN_BOTTOM     = "CTL_ALIGN_BOTTOM"; //@@@: public const String c_BTN_CTL_ALIGN_BOTTOM     = "CTL_ALIGN_BOTTOM";
        self.c_BTN_CTL_ALIGN_VERTICAL   = "CTL_ALIGN_VERTICAL"; //@@@: public const String c_BTN_CTL_ALIGN_VERTICAL   = "CTL_ALIGN_VERTICAL";
        self.c_BTN_CTL_ALIGN_HORIZONTAL = "CTL_ALIGN_HORIZONTAL"; //@@@: public const String c_BTN_CTL_ALIGN_HORIZONTAL = "CTL_ALIGN_HORIZONTAL";
        self.c_BTN_CTL_ALIGN_LEFT       = "CTL_ALIGN_LEFT"; //@@@: public const String c_BTN_CTL_ALIGN_LEFT       = "CTL_ALIGN_LEFT";
        self.c_BTN_CTL_ALIGN_RIGHT      = "CTL_ALIGN_RIGHT"; //@@@: public const String c_BTN_CTL_ALIGN_RIGHT      = "CTL_ALIGN_RIGHT";

        self.c_BTN_CTL_WIDTH  = "CTL_WIDTH"; //@@@: public const String c_BTN_CTL_WIDTH  = "CTL_WIDTH";
        self.c_BTN_CTL_HEIGHT = "CTL_HEIGHT"; //@@@: public const String c_BTN_CTL_HEIGHT = "CTL_HEIGHT";

        self.C_CONTROL_NAME = "Control"; //@@@: public const String C_CONTROL_NAME = "Control";

        self.C_TOTINRECENTLIST = 7; //@@@: public const int C_TOTINRECENTLIST = 7;

        self.C_HEIGHT_NEW_SECTION = 23; //@@@: public const int C_HEIGHT_NEW_SECTION = 23;
        self.C_HEIGHT_BAR_SECTION = 8; //@@@: public const int C_HEIGHT_BAR_SECTION = 8;

        self.C_NO_CHANGE = -32768; //@@@: public const int C_NO_CHANGE = -32768;

        self.C_MAIN_HEADER = "Main Header"; //@@@: public const String C_MAIN_HEADER = "Main Header";
        self.C_MAIN_DETAIL = "Detail"; //@@@: public const String C_MAIN_DETAIL = "Detail";
        self.C_MAIN_FOOTER = "Main Footer"; //@@@: public const String C_MAIN_FOOTER = "Main Footer";

        self.C_GROUP_LABEL = "Group"; //@@@: public const String C_GROUP_LABEL = "Group";

		// TODO: refactor
		self.ShiftMask = 1; //@@@: public const int ShiftMask = 1;

        self.setStatus = function() { //@@@: public static void setStatus()

        }; //@@@: }

        self.isNumberField = function(fieldType) { //@@@: public static bool isNumberField(int fieldType)
            return false; //@@@: return false;
        }; //@@@: }

		self. = function(sField, nFieldType, nIndex, editor) { //@@@: public static bool showDbFields (string sField, int nFieldType, int nIndex, cEditor editor)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.setEditAlignTextState = function(length) { //@@@: public static void setEditAlignTextState(object length)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.setEditAlignCtlState = function(b) { //@@@: public static void setEditAlignCtlState(bool b)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.setEditFontBoldValue = function(bBold) { //@@@: public static void setEditFontBoldValue(int bBold)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.setEditAlignValue = function(align) { //@@@: public static void setEditAlignValue(int align)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.setParametersAux = function(connect, connect2) { //@@@: public static void setParametersAux(CSConnect.cConnect connect, object connect2)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.getToolBox = function(cEditor) { //@@@: public static fToolbox getToolBox(cEditor cEditor)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.showGroupProperties = function(o, editor) { //@@@: public static void showGroupProperties(object o, cEditor editor)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self. = function(editor) { //@@@: public static void setDocActive (cEditor editor)
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

        self.moveGroup = function(group, editor) { //@@@: public static void moveGroup(cReportGroup group, cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getDataSourceStr = function(dataSource) { //@@@: public static string getDataSourceStr(string dataSource)
            return "{" + dataSource + "}."; //@@@: return "{" + dataSource + "}.";
        }; //@@@: }

        self.clearToolBox = function(editor) { //@@@: internal static void clearToolBox(cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getCtrlBox = function(editor) { //@@@: internal static fControls getCtrlBox(cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setDocInacActive = function(editor) { //@@@: internal static void setDocInacActive(cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.createStandarSections = function(report, tr) { //@@@: internal static void createStandarSections(cReport report, Rectangle tr)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.clearCtrlBox = function(editor) { //@@@: internal static void clearCtrlBox(cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getCtrlTreeBox = function(editor) { //@@@: internal static fTreeViewCtrls getCtrlTreeBox(cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.clearCtrlTreeBox = function(editor) { //@@@: internal static void clearCtrlTreeBox(cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }
        return self;

    } //@@@: }

UNKNOWN >>     public enum csRptEditorMoveType { //@@@: public enum csRptEditorMoveType {
        CSRPTEDMOVTHORIZONTAL, //@@@: CSRPTEDMOVTHORIZONTAL,
        CSRPTEDMOVTVERTICAL, //@@@: CSRPTEDMOVTVERTICAL,
        CSRPTEDMOVTALL, //@@@: CSRPTEDMOVTALL,
        CSRPTEDMOVLEFT, //@@@: CSRPTEDMOVLEFT,
        CSRPTEDMOVRIGHT, //@@@: CSRPTEDMOVRIGHT,
        CSRPTEDMOVUP, //@@@: CSRPTEDMOVUP,
        CSRPTEDMOVDOWN, //@@@: CSRPTEDMOVDOWN,
        CSRPTEDMOVLEFTDOWN, //@@@: CSRPTEDMOVLEFTDOWN,
        CSRPTEDMOVLEFTUP, //@@@: CSRPTEDMOVLEFTUP,
        CSRPTEDMOVRIGHTDOWN, //@@@: CSRPTEDMOVRIGHTDOWN,
        CSRPTEDMOVRIGHTUP, //@@@: CSRPTEDMOVRIGHTUP,
UNKNOWN >>         CSRPTEDMOVTNONE //@@@: CSRPTEDMOVTNONE
        return self;

    } //@@@: }

UNKNOWN >>     public enum csRptEditCtrlType { //@@@: public enum csRptEditCtrlType {
        CSRPTEDITNONE, //@@@: CSRPTEDITNONE,
        CSRPTEDITLABEL, //@@@: CSRPTEDITLABEL,
        CSRPTEDITFIELD, //@@@: CSRPTEDITFIELD,
        CSRPTEDITFORMULA, //@@@: CSRPTEDITFORMULA,
        CSRPTEDITIMAGE, //@@@: CSRPTEDITIMAGE,
UNKNOWN >>         CSRPTEDITCHART //@@@: CSRPTEDITCHART
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
