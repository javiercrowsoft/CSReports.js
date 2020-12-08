(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createCGlobals = function() {

        const self = {};

        self.C_MODULE = "CSReportEditor.cGlobals";

        self.C_KEY_HEADER = "RH";
        self.C_KEY_FOOTER = "RF";
        self.C_KEY_DETAIL = "RD";
        self.C_KEY_GROUPH = "GH";
        self.C_KEY_GROUPF = "GF";

        self.c_BTN_PRINT        = "PRINT";
        self.c_BTN_PROPERTIES   = "PROPERTIES";
        self.c_BTN_DB           = "DB";
        self.c_BTN_SAVE         = "SAVE";
        self.c_BTN_OPEN         = "OPEN";
        self.c_BTN_TOOL         = "TOOL";
        self.c_BTN_NEW          = "NEW";
        self.c_BTN_PREV         = "PREV";

        self.c_BTN_ALIGN_LEFT   = "ALIGN_LEFT";
        self.c_BTN_ALIGN_CENTER = "ALIGN_CENTER";
        self.c_BTN_ALIGN_RIGHT  = "ALIGN_RIGHT";

        self.c_BTN_FONT_BOLD = "FONT_BOLD";
        self.c_BTN_SEARCH = "SEARCH";

        self.c_BTN_CTL_ALIGN_TOP        = "CTL_ALIGN_TOP";
        self.c_BTN_CTL_ALIGN_BOTTOM     = "CTL_ALIGN_BOTTOM";
        self.c_BTN_CTL_ALIGN_VERTICAL   = "CTL_ALIGN_VERTICAL";
        self.c_BTN_CTL_ALIGN_HORIZONTAL = "CTL_ALIGN_HORIZONTAL";
        self.c_BTN_CTL_ALIGN_LEFT       = "CTL_ALIGN_LEFT";
        self.c_BTN_CTL_ALIGN_RIGHT      = "CTL_ALIGN_RIGHT";

        self.c_BTN_CTL_WIDTH  = "CTL_WIDTH";
        self.c_BTN_CTL_HEIGHT = "CTL_HEIGHT";

        self.C_CONTROL_NAME = "Control";

        self.C_TOTINRECENTLIST = 7;

        self.C_HEIGHT_NEW_SECTION = 23;
        self.C_HEIGHT_BAR_SECTION = 8;

        self.C_NO_CHANGE = -32768;

        self.C_MAIN_HEADER = "Main Header";
        self.C_MAIN_DETAIL = "Detail";
        self.C_MAIN_FOOTER = "Main Footer";

        self.C_GROUP_LABEL = "Group";

		// TODO: refactor
		self.ShiftMask = 1;

        self.setStatus = function() {

        };

        self.isNumberField = function(fieldType) {
            return false;
        };

		self. = function(sField, nFieldType, nIndex, editor) {
			throw new NotImplementedException ();
		};

		self.setEditAlignTextState = function(length) {
			throw new NotImplementedException ();
		};

		self.setEditAlignCtlState = function(b) {
			throw new NotImplementedException ();
		};

		self.setEditFontBoldValue = function(bBold) {
			throw new NotImplementedException ();
		};

		self.setEditAlignValue = function(align) {
			throw new NotImplementedException ();
		};

		self.setParametersAux = function(connect, connect2) {
			throw new NotImplementedException ();
		};

		self.getToolBox = function(cEditor) {
			throw new NotImplementedException ();
		};

		self.showGroupProperties = function(o, editor) {
			throw new NotImplementedException ();
		};

		self. = function(editor) {
			throw new NotImplementedException ();
		};

        self.moveGroup = function(group, editor) {
            throw new NotImplementedException();
        };

        self.getDataSourceStr = function(dataSource) {
            return "{" + dataSource + "}.";
        };

        self.clearToolBox = function(editor) {
            throw new NotImplementedException();
        };

        self.getCtrlBox = function(editor) {
            throw new NotImplementedException();
        };

        self.setDocInacActive = function(editor) {
            throw new NotImplementedException();
        };

        self.createStandarSections = function(report, tr) {
            throw new NotImplementedException();
        };

        self.clearCtrlBox = function(editor) {
            throw new NotImplementedException();
        };

        self.getCtrlTreeBox = function(editor) {
            throw new NotImplementedException();
        };

        self.clearCtrlTreeBox = function(editor) {
            throw new NotImplementedException();
        };
        return self;

    }

UNKNOWN >>     public enum csRptEditorMoveType {
        CSRPTEDMOVTHORIZONTAL,
        CSRPTEDMOVTVERTICAL,
        CSRPTEDMOVTALL,
        CSRPTEDMOVLEFT,
        CSRPTEDMOVRIGHT,
        CSRPTEDMOVUP,
        CSRPTEDMOVDOWN,
        CSRPTEDMOVLEFTDOWN,
        CSRPTEDMOVLEFTUP,
        CSRPTEDMOVRIGHTDOWN,
        CSRPTEDMOVRIGHTUP,
UNKNOWN >>         CSRPTEDMOVTNONE
        return self;

    }

UNKNOWN >>     public enum csRptEditCtrlType {
        CSRPTEDITNONE,
        CSRPTEDITLABEL,
        CSRPTEDITFIELD,
        CSRPTEDITFORMULA,
        CSRPTEDITIMAGE,
UNKNOWN >>         CSRPTEDITCHART
        return self;

    }
}(globalObject));
