

namespace CSReportEditor
{
    export class cGlobals {


    {

        public C_MODULE: string = "CSReportEditor.cGlobals";

        public C_KEY_HEADER: string = "RH";
        public C_KEY_FOOTER: string = "RF";
        public C_KEY_DETAIL: string = "RD";
        public C_KEY_GROUPH: string = "GH";
        public C_KEY_GROUPF: string = "GF";

        public c_BTN_PRINT: string        = "PRINT";
        public c_BTN_PROPERTIES: string   = "PROPERTIES";
        public c_BTN_DB: string           = "DB";
        public c_BTN_SAVE: string         = "SAVE";
        public c_BTN_OPEN: string         = "OPEN";
        public c_BTN_TOOL: string         = "TOOL";
        public c_BTN_NEW: string          = "NEW";
        public c_BTN_PREV: string         = "PREV";

        public c_BTN_ALIGN_LEFT: string   = "ALIGN_LEFT";
        public c_BTN_ALIGN_CENTER: string = "ALIGN_CENTER";
        public c_BTN_ALIGN_RIGHT: string  = "ALIGN_RIGHT";

        public c_BTN_FONT_BOLD: string = "FONT_BOLD";
        public c_BTN_SEARCH: string = "SEARCH";

        public c_BTN_CTL_ALIGN_TOP: string        = "CTL_ALIGN_TOP";
        public c_BTN_CTL_ALIGN_BOTTOM: string     = "CTL_ALIGN_BOTTOM";
        public c_BTN_CTL_ALIGN_VERTICAL: string   = "CTL_ALIGN_VERTICAL";
        public c_BTN_CTL_ALIGN_HORIZONTAL: string = "CTL_ALIGN_HORIZONTAL";
        public c_BTN_CTL_ALIGN_LEFT: string       = "CTL_ALIGN_LEFT";
        public c_BTN_CTL_ALIGN_RIGHT: string      = "CTL_ALIGN_RIGHT";

        public c_BTN_CTL_WIDTH: string  = "CTL_WIDTH";
        public c_BTN_CTL_HEIGHT: string = "CTL_HEIGHT";

        public C_CONTROL_NAME: string = "Control";

        public C_TOTINRECENTLIST: number = 7;

        public C_HEIGHT_NEW_SECTION: number = 23;
        public C_HEIGHT_BAR_SECTION: number = 8;

        public C_NO_CHANGE: number = -32768;

        public C_MAIN_HEADER: string = "Main Header";
        public C_MAIN_DETAIL: string = "Detail";
        public C_MAIN_FOOTER: string = "Main Footer";

        public C_GROUP_LABEL: string = "Group";

		// TODO: refactor
		public ShiftMask: number = 1;

        public setStatus() {

        }

        public isNumberField(fieldType: number) {
            return false;
        }

		public showDbFields(sField: string, nFieldType: number, nIndex: number, editor: cEditor) {
			throw new NotImplementedException ();
		}

		public setEditAlignTextState(length: object) {
			throw new NotImplementedException ();
		}

		public setEditAlignCtlState(b: boolean) {
			throw new NotImplementedException ();
		}

		public setEditFontBoldValue(bBold: number) {
			throw new NotImplementedException ();
		}

		public setEditAlignValue(align: number) {
			throw new NotImplementedException ();
		}

		public setParametersAux(connect: CSConnect.cConnect, connect2: object) {
			throw new NotImplementedException ();
		}

		public getToolBox(cEditor: cEditor) {
			throw new NotImplementedException ();
		}

		public showGroupProperties(o: object, editor: cEditor) {
			throw new NotImplementedException ();
		}

		public setDocActive(editor: cEditor) {
			throw new NotImplementedException ();
		}

        public moveGroup(group: cReportGroup, editor: cEditor) {
            throw new NotImplementedException();
        }

        public getDataSourceStr(dataSource: string) {
            return "{" + dataSource + "}.";
        }

        public clearToolBox(editor: cEditor) {
            throw new NotImplementedException();
        }

        public getCtrlBox(editor: cEditor) {
            throw new NotImplementedException();
        }

        public setDocInacActive(editor: cEditor) {
            throw new NotImplementedException();
        }

        public createStandarSections(report: cReport, tr: Rectangle) {
            throw new NotImplementedException();
        }

        public clearCtrlBox(editor: cEditor) {
            throw new NotImplementedException();
        }

        public getCtrlTreeBox(editor: cEditor) {
            throw new NotImplementedException();
        }

        public clearCtrlTreeBox(editor: cEditor) {
            throw new NotImplementedException();
        }


    }    }



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


    }    }



UNKNOWN >>     public enum csRptEditCtrlType {
        CSRPTEDITNONE,
        CSRPTEDITLABEL,
        CSRPTEDITFIELD,
        CSRPTEDITFORMULA,
        CSRPTEDITIMAGE,
UNKNOWN >>         CSRPTEDITCHART


    }    }
}
