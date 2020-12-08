(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createCGlobals = function() {

        const self = {};

        self.C_MODULE: string= "CSReportEditor.cGlobals";

        self.C_KEY_HEADER: string= "RH";
        self.C_KEY_FOOTER: string= "RF";
        self.C_KEY_DETAIL: string= "RD";
        self.C_KEY_GROUPH: string= "GH";
        self.C_KEY_GROUPF: string= "GF";

        self.c_BTN_PRINT: string       = "PRINT";
        self.c_BTN_PROPERTIES: string  = "PROPERTIES";
        self.c_BTN_DB: string          = "DB";
        self.c_BTN_SAVE: string        = "SAVE";
        self.c_BTN_OPEN: string        = "OPEN";
        self.c_BTN_TOOL: string        = "TOOL";
        self.c_BTN_NEW: string         = "NEW";
        self.c_BTN_PREV: string        = "PREV";

        self.c_BTN_ALIGN_LEFT: string  = "ALIGN_LEFT";
        self.c_BTN_ALIGN_CENTER: string= "ALIGN_CENTER";
        self.c_BTN_ALIGN_RIGHT: string = "ALIGN_RIGHT";

        self.c_BTN_FONT_BOLD: string= "FONT_BOLD";
        self.c_BTN_SEARCH: string= "SEARCH";

        self.c_BTN_CTL_ALIGN_TOP: string       = "CTL_ALIGN_TOP";
        self.c_BTN_CTL_ALIGN_BOTTOM: string    = "CTL_ALIGN_BOTTOM";
        self.c_BTN_CTL_ALIGN_VERTICAL: string  = "CTL_ALIGN_VERTICAL";
        self.c_BTN_CTL_ALIGN_HORIZONTAL: string= "CTL_ALIGN_HORIZONTAL";
        self.c_BTN_CTL_ALIGN_LEFT: string      = "CTL_ALIGN_LEFT";
        self.c_BTN_CTL_ALIGN_RIGHT: string     = "CTL_ALIGN_RIGHT";

        self.c_BTN_CTL_WIDTH: string = "CTL_WIDTH";
        self.c_BTN_CTL_HEIGHT: string= "CTL_HEIGHT";

        self.C_CONTROL_NAME: string= "Control";

        self.C_TOTINRECENTLIST: number= 7;

        self.C_HEIGHT_NEW_SECTION: number= 23;
        self.C_HEIGHT_BAR_SECTION: number= 8;

        self.C_NO_CHANGE: number= -32768;

        self.C_MAIN_HEADER: string= "Main Header";
        self.C_MAIN_DETAIL: string= "Detail";
        self.C_MAIN_FOOTER: string= "Main Footer";

        self.C_GROUP_LABEL: string= "Group";

		// TODO: refactor
		self.ShiftMask: number= 1;

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
