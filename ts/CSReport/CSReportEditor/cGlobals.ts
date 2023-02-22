namespace CSReportEditor {

    import cError = CSKernelClient.cError;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import cConnect = CSConnect.cConnect;
    import csRptControlType = CSReportGlobals.csRptControlType;
    import cReport = CSReportDll.cReport;
    import cReportConnect = CSReportDll.cReportConnect;
    import cReportGroup = CSReportDll.cReportGroup;
    import cReportSection = CSReportDll.cReportSection;
    import cReportControl = CSReportDll.cReportControl;
    import cReportAspect = CSReportDll.cReportAspect;
    import cReportSectionLine = CSReportDll.cReportSectionLine;
    import RectangleF = CSReportPaint.RectangleF;
    import cIReportGroupSections = CSReportDll.cIReportGroupSections;
    import Color = CSReportPaint.Color;

    export enum csRptEditorMoveType {
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
        CSRPTEDMOVTNONE
    }

    export enum csRptEditCtrlType {
        none,
        label,
        field,
        formula,
        image,
        chart,
        lineLabel
    }

    export class cGlobals {

        public static C_KEY_HEADER: string = "RH";
        public static C_KEY_FOOTER: string = "RF";
        public static C_KEY_DETAIL: string = "RD";
        public static C_KEY_GROUPH: string = "GH";
        public static C_KEY_GROUPF: string = "GF";

        public static c_BTN_PRINT: string        = "PRINT";
        public static c_BTN_PROPERTIES: string   = "PROPERTIES";
        public static c_BTN_DB: string           = "DB";
        public static c_BTN_SAVE: string         = "SAVE";
        public static c_BTN_OPEN: string         = "OPEN";
        public static c_BTN_TOOL: string         = "TOOL";
        public static c_BTN_NEW: string          = "NEW";
        public static c_BTN_PREV: string         = "PREV";

        public static c_BTN_ALIGN_LEFT: string   = "ALIGN_LEFT";
        public static c_BTN_ALIGN_CENTER: string = "ALIGN_CENTER";
        public static c_BTN_ALIGN_RIGHT: string  = "ALIGN_RIGHT";

        public static c_BTN_FONT_BOLD: string = "FONT_BOLD";
        public static c_BTN_SEARCH: string    = "SEARCH";

        public static c_BTN_CTL_ALIGN_TOP: string        = "CTL_ALIGN_TOP";
        public static c_BTN_CTL_ALIGN_BOTTOM: string     = "CTL_ALIGN_BOTTOM";
        public static c_BTN_CTL_ALIGN_VERTICAL: string   = "CTL_ALIGN_VERTICAL";
        public static c_BTN_CTL_ALIGN_HORIZONTAL: string = "CTL_ALIGN_HORIZONTAL";
        public static c_BTN_CTL_ALIGN_LEFT: string       = "CTL_ALIGN_LEFT";
        public static c_BTN_CTL_ALIGN_RIGHT: string      = "CTL_ALIGN_RIGHT";

        public static c_BTN_CTL_WIDTH: string  = "CTL_WIDTH";
        public static c_BTN_CTL_HEIGHT: string = "CTL_HEIGHT";

        public static C_CONTROL_NAME: string = "Control";

        public static C_TOTINRECENTLIST: number = 7;

        public static C_HEIGHT_NEW_SECTION: number = 23;
        public static C_HEIGHT_BAR_SECTION: number = 8;

        public static C_NO_CHANGE: number = -32768;

        public static C_MAIN_HEADER: string = "Main Header";
        public static C_MAIN_DETAIL: string = "Detail";
        public static C_MAIN_FOOTER: string = "Main Footer";

        public static C_GROUP_LABEL: string = "Group";

		public static ShiftMask: number = 1;

        public static setStatus() {

        }

		public static showDbFields(field: string, fieldType: number, index: number, editor: cEditor): boolean {
            let fc: FColumns = null;

            const close = () => {
                if (fc !== null) {
                    fc.close();
                }
            }

            try {
                fc = new FColumns();

                fc.clearColumns();

                let report: cReport = editor.getReport();

                let connect: cReportConnect = report.getConnect();
                fc.fillColumns(connect.getDataSource(), connect.getColumns(), false);

                for(let _i = 0; _i < report.getConnectsAux().count(); _i++) {
                    connect = report.getConnectsAux().item(_i);
                    fc.fillColumns(connect.getDataSource(), connect.getColumns(), true);
                }

                fc.setField(field);
                fc.showDialog();

                if (fc.getOk()) {
                    field = fc.getField();
                    fieldType = fc.getFieldType();
                    index = fc.getIndex();
                    close();
                    return true;
                }
                else {
                    close();
                    return false;
                }

            } catch (ex) {
                close();
                cError.mngError(ex);
                return false;
            }
		}

		public static setEditAlignTextState(state) {
            this.implementThisMessage("setEditAlignTextState", "(CSReportEditor cGlobals)");
		}

		public static setEditAlignCtlState(b: boolean) {
            this.implementThisMessage("setEditAlignCtlState", "(CSReportEditor cGlobals)");
		}

		public static setEditFontBoldValue(bBold: number) {
            this.implementThisMessage("setEditFontBoldValue", "(CSReportEditor cGlobals)");
		}

		public static setEditAlignValue(align: number) {
            this.implementThisMessage("setEditAlignValue", "(CSReportEditor cGlobals)");
		}

		public static setParametersAux(connect: cConnect, rptConnect: cReportConnect) {
            rptConnect.getColumns().clear();
            rptConnect.getParameters().clear();

            for(let i = 0; i < connect.getColumnsInfo().count(); i++) {
                let colInfo: CSConnect.cColumnInfo = connect.getColumnsInfo().item(i);
                let rptColInfo: CSReportDll.cColumnInfo = new CSReportDll.cColumnInfo();

                rptColInfo.setName(colInfo.getName());
                rptColInfo.setPosition(colInfo.getPosition());
                rptColInfo.setColumnType(colInfo.getColumnType());
                rptConnect.getColumns().add(rptColInfo, "");
            }

            for(let i = 0; i < connect.getParameters().count(); i++) {
                let parameter: CSConnect.cParameter = connect.getParameters().item(i);
                let rptParameter: CSReportDll.cParameter = new CSReportDll.cParameter();

                rptParameter.setName(parameter.getName());
                rptParameter.setPosition(parameter.getPosition());
                rptParameter.setColumnType(parameter.getColumnType());
                rptParameter.setValue(parameter.getValue());
                rptConnect.getParameters().add(rptParameter, "");
            }        
        }

        public static moveGroup(group: cReportGroup, editor: cEditor) {
            throw new NotImplementedException();
        }

        public static getDataSourceStr(dataSource: string) {
            return "{" + dataSource + "}.";
        }

        public static createStandardSections(report: cReport, tr: Rectangle) {
            report.getHeaders().add(null, cGlobals.C_KEY_HEADER);
            report.getFooters().add(null, cGlobals.C_KEY_FOOTER);
            report.getDetails().add(null, cGlobals.C_KEY_DETAIL);

            // 
            // main header
            //
            let sec: cReportSection = report.getHeaders().item(cGlobals.C_KEY_HEADER);
            sec.setName("Main header");

            let aspect: cReportAspect = sec.getAspect();
            aspect.setTop(0);
            aspect.setHeight(tr.height * 0.25);
            aspect.setWidth(tr.width);
            let secLn: cReportSectionLine = sec.getSectionLines().item(0);
            secLn.setSectionName("Main header");
            aspect = secLn.getAspect();
            aspect.setTop(0);
            aspect.setHeight(tr.height * 0.25);
            aspect.setWidth(tr.width);

            // 
            // detail
            //
            sec = report.getDetails().item(cGlobals.C_KEY_DETAIL);
            sec.setName("Detail");

            aspect = sec.getAspect();
            aspect.setTop(tr.height * 0.25);
            aspect.setHeight(tr.height * 0.25);
            aspect.setWidth(tr.width);
            secLn = sec.getSectionLines().item(0);
            secLn.setSectionName("Detail");
            aspect = secLn.getAspect();
            aspect.setTop(tr.height * 0.25);
            aspect.setHeight(tr.height * 0.25);
            aspect.setWidth(tr.width);

            // 
            // main footer
            //
            sec = report.getFooters().item(cGlobals.C_KEY_FOOTER);
            sec.setName("Main footer");

            aspect = sec.getAspect();
            aspect.setTop(tr.height * 0.75);
            aspect.setHeight(tr.height * 0.25);
            aspect.setWidth(tr.width);
            secLn = sec.getSectionLines().item(0);
            secLn.setSectionName("Main footer");
            aspect = secLn.getAspect();
            aspect.setTop(tr.height * 0.75);
            aspect.setHeight(tr.height * 0.25);
            aspect.setWidth(tr.width);
        }

        public static clearCtrlBox(editor: cEditor) {
            throw new NotImplementedException();
        }

        public static implementThisMessage(functionName: string, moduleName: string) {
            //Console.WriteLine(String.Format("Implement this: public static void {0} {1}", functionName, moduleName));
        }

        public static addCtrls(report: cReport, lv_controls: ListView, C_CTRL_IMAGE: number, C_DB_IMAGE: number) {
            lv_controls.Items.clear();

            for(let i = 0; i < report.getControls().count(); i++) {
                let ctrl = report.getControls().item(i);
                let ctrlName = ctrl.getName();
                let ctrlInfo = "";
                let ctrlField = "";

                switch (ctrl.getControlType())
                {
                    case csRptControlType.CS_RPT_CT_FIELD:
                        ctrlField = ctrl.getField().getName();
                        break;
                    case csRptControlType.CS_RPT_CT_DB_IMAGE:
                        ctrlInfo = ctrl.getField().getName();
                        break;
                    case csRptControlType.CS_RPT_CT_IMAGE:
                        ctrlInfo = " (Image)";
                        break;
                    case csRptControlType.CS_RPT_CT_LABEL:
                        ctrlInfo = ctrl.getLabel().getText();
                        break;
                }

                if (ctrlInfo.length > 0) {
                    ctrlName += " (" + ctrlInfo + ")";
                }

                let item = lv_controls.Items.Add(ctrlName, C_CTRL_IMAGE);
                item.Tag = ctrl.getKey();
                item.SubItems.Add("");
                item.SubItems.Add("");
                item.SubItems.Add("");

                if (ctrl.getHasFormulaValue()) item.SubItems[1].Text = "*";
                if (ctrl.getHasFormulaHide()) item.SubItems[2].Text = "*";

                if (ctrlField.length > 0) {
                    item.SubItems[3].Text = ctrlField;
                    item.SubItems[3].ForeColor = Color.Blue;
                    item.ImageIndex = C_DB_IMAGE;
                }
                if (ctrl.getName().length > 4 && ctrl.getName().substring(0, 4) === "lnk_") {
                    item.ForeColor = Color.Red;
                }
            }
        }

        public static addCtrls2(report: cReport, tv_controls: TreeView,
                        C_IMG_FOLDER: number, C_IMG_FORMULA: number,
                        C_IMG_CONTROL: number, C_IMG_DATBASE_FIELD: number) {

            tv_controls.Nodes.clear();

            let nodeGroup: object;
            let nodeRoot: object = tv_controls.Nodes.Add(report.getName());
            nodeRoot.ImageIndex = C_IMG_FOLDER;

            nodeGroup = nodeRoot.Nodes.Add("Headers");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            this.pAddCtrlsAux(report.getHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Group Header");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            this.pAddCtrlsAux(report.getGroupsHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Details");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            this.pAddCtrlsAux(report.getDetails(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Group Footer");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            this.pAddCtrlsAux(report.getGroupsFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Footers");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            this.pAddCtrlsAux(report.getFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeRoot.ExpandAll();
        }

        private static pAddCtrlsAux(sections: cIReportGroupSections, father: object,
                             C_IMG_FOLDER: number, C_IMG_FORMULA: number,
                             C_IMG_CONTROL: number, C_IMG_DATBASE_FIELD: number) {
            let nodeSec: object;
            let nodeSecLn: object;
            let nodeCtrl: object;
            let item: object;
            let text: string;
            let bComplexF: boolean = false; ;

            let sec: cReportSection;
            let secLn: cReportSectionLine;
            let ctrl: cReportControl;

            for(let i = 0; i < sections.count(); i++) {
                sec = sections.item(i);
                nodeSec = father.Nodes.Add(sec.getName());
                nodeSec.Tag = "S" + sec.getKey();

                if (sec.getFormulaHide().getText() !== "") {
                    if (sec.getFormulaHide().getText() === "0") {
                        text = "Hidden";
                        bComplexF = false;
                    }
                    else {
                        text = "Visibility formula";
                        bComplexF = true;
                    }
                    item = nodeSec.Nodes.Add(text);
                    item.ImageIndex = C_IMG_FORMULA;
                    item.SelectedImageIndex = C_IMG_FORMULA;
                    if (!sec.getHasFormulaHide()) {
                        item.ForeColor = Color.Red;
                    }

                    if (bComplexF) {
                        item.Tag = "@FH=" + sec.getFormulaHide().getText();
                    }
                }

                for(let j = 0; j < sec.getSectionLines().count(); j++) {
                    secLn = sec.getSectionLines().item(j);
                    nodeSecLn = nodeSec.Nodes.Add("Line " + secLn.getIndex());
                    nodeSecLn.ImageIndex = C_IMG_FOLDER;
                    nodeSecLn.Tag = "L" + secLn.getKey();

                    if (secLn.getFormulaHide().getText() !== "") {
                        if (secLn.getFormulaHide().getText() === "0") {
                            text = "Hidden";
                            bComplexF = false;
                        }
                        else {
                            text = "Visibility formula";
                            bComplexF = true;
                        }
                        item = nodeSecLn.Nodes.Add(text);
                        item.ImageIndex = C_IMG_FORMULA;
                        item.SelectedImageIndex = C_IMG_FORMULA;
                        if (!secLn.getHasFormulaHide()) {
                            item.ForeColor = Color.Red;
                        }
                        if (bComplexF) {
                            item.Tag = "@FH=" + secLn.getFormulaHide().getText();
                        }
                    }
                    for(var t = 0; t < secLn.getControls().count(); t++) {
                        ctrl = secLn.getControls().item(t);
                        nodeCtrl = nodeSecLn.Nodes.Add(
                            ctrl.getName() 
                            + (ctrl.getLabel().getText() !== "" 
                                ? " - " + ctrl.getLabel().getText() 
                                : "")
                            );
                        nodeCtrl.ImageIndex = C_IMG_CONTROL;
                        nodeCtrl.SelectedImageIndex = C_IMG_CONTROL;
                        nodeCtrl.Tag = ctrl.getKey();
                        nodeCtrl.BackColor = cColor.colorFromRGB(ctrl.getLabel().getAspect().getBackColor());
                        nodeCtrl.ForeColor = cColor.colorFromRGB(ctrl.getLabel().getAspect().getFont().getForeColor());

                        if (ctrl.getControlType() === csRptControlType.CS_RPT_CT_FIELD) {
                            item = nodeCtrl.Nodes.Add(ctrl.getField().getName());
                            item.ImageIndex = C_IMG_DATBASE_FIELD;
                            item.SelectedImageIndex = C_IMG_DATBASE_FIELD;
                        }

                        if (ctrl.getFormulaHide().getText() !== "") {
                            if (ctrl.getFormulaHide().getText() === "0") {
                                text = "hidden";
                                bComplexF = false;
                            }
                            else {
                                text = "Visibility formula";
                                bComplexF = true;
                            }

                            item = nodeCtrl.Nodes.Add(text);
                            item.ImageIndex = C_IMG_FORMULA;
                            item.SelectedImageIndex = C_IMG_FORMULA;
                            if (!ctrl.getHasFormulaHide()) {
                                item.ForeColor = Color.Red;
                            }
                            if (bComplexF) {
                                item.Tag = "@FH=" + ctrl.getFormulaHide().getText();
                            }
                        }

                        if (ctrl.getFormulaValue().getText() !== "") {
                            item = nodeCtrl.Nodes.Add("Value formula");
                            item.ImageIndex = C_IMG_FORMULA;
                            item.SelectedImageIndex = C_IMG_FORMULA;
                            if (!ctrl.getHasFormulaValue()) {
                                item.ForeColor = Color.Red;
                            }
                            item.Tag = "@FV=" + ctrl.getFormulaValue().getText();
                        }
                    }
                }
            }
            father.ExpandAll();
        }

        public static fillColumns(dataSource: string, columns: CSReportDll.cColumnsInfo, lv_columns: ListView,
                           C_INDEX: string, C_FIELDTYPE: string, add: boolean) {

            if (!add) lv_columns.Items.clear();

            for(let i_ = 0; i_ < columns.count(); i_++) {
                let item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName()));
                item.ImageIndex = 0;
                let info: string = cUtil.setInfoString("", C_INDEX, column.getPosition().toString());
                info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().toString());
                item.Tag = info;
            }
        }
    } 

    export class Rectangle {
        public height: number = null;
        public width: number = null;

        public constructor(rect: RectangleF) {
            height = rect.Height;
            width = rect.Width;
        }
    } 

    export interface cIDatabaseFieldSelector {
        getFieldType(): number;
        setFieldType(rhs: number): void;
        getIndex(): number;
        setIndex(rhs: number): void;
    }
}
