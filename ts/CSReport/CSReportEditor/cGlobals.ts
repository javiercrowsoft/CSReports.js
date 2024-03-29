namespace CSReportEditor {

    import U = CSOAPI.Utils;
    import cError = CSKernelClient.cError;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import cConnect = CSConnect.cConnect;
    import csRptControlType = CSReportGlobals.csRptControlType;
    import cReport = CSReportEngine.cReport;
    import cReportConnect = CSReportEngine.cReportConnect;
    import cReportGroup = CSReportEngine.cReportGroup;
    import cReportSection = CSReportEngine.cReportSection;
    import cReportControl = CSReportEngine.cReportControl;
    import cReportAspect = CSReportEngine.cReportAspect;
    import cReportSectionLine = CSReportEngine.cReportSectionLine;
    import RectangleF = CSDrawing.RectangleF;
    import cIReportGroupSections = CSReportEngine.cIReportGroupSections;
    import Color = CSDrawing.Color;

    import Node = CSForms.Node;
    import ListView = CSForms.ListView;
    import TreeView = CSForms.TreeView;

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

        public static KEY_HEADER: string = "RH";
        public static KEY_FOOTER: string = "RF";
        public static KEY_DETAIL: string = "RD";
        public static KEY_GROUPH: string = "GH";
        public static KEY_GROUPF: string = "GF";

        public static BTN_PRINT: string        = "PRINT";
        public static BTN_PROPERTIES: string   = "PROPERTIES";
        public static BTN_DB: string           = "DB";
        public static BTN_SAVE: string         = "SAVE";
        public static BTN_OPEN: string         = "OPEN";
        public static BTN_TOOL: string         = "TOOL";
        public static BTN_NEW: string          = "NEW";
        public static BTN_PREV: string         = "PREV";

        public static BTN_ALIGN_LEFT: string   = "ALIGN_LEFT";
        public static BTN_ALIGN_CENTER: string = "ALIGN_CENTER";
        public static BTN_ALIGN_RIGHT: string  = "ALIGN_RIGHT";

        public static BTN_FONT_BOLD: string = "FONT_BOLD";
        public static BTN_SEARCH: string    = "SEARCH";

        public static BTN_CTL_ALIGN_TOP: string        = "CTL_ALIGN_TOP";
        public static BTN_CTL_ALIGN_BOTTOM: string     = "CTL_ALIGN_BOTTOM";
        public static BTN_CTL_ALIGN_VERTICAL: string   = "CTL_ALIGN_VERTICAL";
        public static BTN_CTL_ALIGN_HORIZONTAL: string = "CTL_ALIGN_HORIZONTAL";
        public static BTN_CTL_ALIGN_LEFT: string       = "CTL_ALIGN_LEFT";
        public static BTN_CTL_ALIGN_RIGHT: string      = "CTL_ALIGN_RIGHT";

        public static BTN_CTL_WIDTH: string  = "CTL_WIDTH";
        public static BTN_CTL_HEIGHT: string = "CTL_HEIGHT";

        public static CONTROL_NAME: string = "Control";

        public static TOT_IN_RECENT_LIST: number = 7;

        public static HEIGHT_NEW_SECTION: number = 23;
        public static HEIGHT_BAR_SECTION: number = 8;

        public static NO_CHANGE: number = -32768;

        public static MAIN_HEADER: string = "Main Header";
        public static MAIN_DETAIL: string = "Detail";
        public static MAIN_FOOTER: string = "Main Footer";

        public static GROUP_LABEL: string = "Group";

		public static ShiftMask: number = 1;

        public static setStatus() {

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
                let rptColInfo: CSReportEngine.cColumnInfo = new CSReportEngine.cColumnInfo();

                rptColInfo.setName(colInfo.getName());
                rptColInfo.setPosition(colInfo.getPosition());
                rptColInfo.setColumnType(colInfo.getColumnType());
                rptConnect.getColumns().add(rptColInfo, "");
            }

            for(let i = 0; i < connect.getParameters().count(); i++) {
                let parameter: CSConnect.cParameter = connect.getParameters().item(i);
                let rptParameter: CSReportEngine.cParameter = new CSReportEngine.cParameter();

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
            report.getHeaders().add(null, cGlobals.KEY_HEADER);
            report.getFooters().add(null, cGlobals.KEY_FOOTER);
            report.getDetails().add(null, cGlobals.KEY_DETAIL);

            //
            // main header
            //
            let sec: cReportSection = report.getHeaders().item(cGlobals.KEY_HEADER);
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
            sec = report.getDetails().item(cGlobals.KEY_DETAIL);
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
            sec = report.getFooters().item(cGlobals.KEY_FOOTER);
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

        public static addCtrls(report: cReport, lvControls: ListView, ctrlImage: number, dbImage: number) {
            lvControls.clear();

            lvControls.createHeaders(['Name', 'F hide', 'F value', 'Db field']);

            for(let i = 0; i < report.getControls().count(); i++) {
                let ctrl = report.getControls().item(i);
                let ctrlName = ctrl.getName();
                let ctrlInfo = "";
                let ctrlField = "";

                switch (ctrl.getControlType())
                {
                    case csRptControlType.RPT_CT_FIELD:
                        ctrlField = ctrl.getField().getName();
                        break;
                    case csRptControlType.RPT_CT_DB_IMAGE:
                        ctrlInfo = ctrl.getField().getName();
                        break;
                    case csRptControlType.RPT_CT_IMAGE:
                        ctrlInfo = " (Image)";
                        break;
                    case csRptControlType.RPT_CT_LABEL:
                        ctrlInfo = ctrl.getLabel().getText();
                        break;
                }

                if(ctrlInfo.length > 0) {
                    ctrlName += " (" + ctrlInfo + ")";
                }

                let item = lvControls.add(ctrlName, ctrlImage);
                item.tag = ctrl.getKey();
                item.subItems.add("");
                item.subItems.add("");
                item.subItems.add("");

                if(ctrl.getHasFormulaValue()) item.subItems.item(1).setText("*");
                if(ctrl.getHasFormulaHide()) item.subItems.item(2).setText("*");

                if(ctrlField.length > 0) {
                    item.subItems.item(3).setText(ctrlField);
                    item.subItems.item(3).setForeColor(Color.Blue);
                    item.setImageIndex(dbImage);
                }
                if(ctrl.getName().length > 4 && ctrl.getName().substring(0, 4) === "lnk_") {
                    item.setForeColor(Color.Red);
                }
            }
        }

        public static addCtrls2(report: cReport, tv_controls: TreeView,
                        folderImage: number, formulaImage: number,
                        controlImage: number, databaseFieldImage: number) {

            tv_controls.clear();

            let nodeRoot = tv_controls.getNodes().add(report.getName(), folderImage);
            let nodeGroup = nodeRoot.getNodes().add("Headers", folderImage);

            this.pAddCtrlsAux(report.getHeaders(), nodeGroup, folderImage, formulaImage, controlImage, databaseFieldImage);

            nodeGroup = nodeRoot.getNodes().add("Group Header", folderImage);
            this.pAddCtrlsAux(report.getGroupsHeaders(), nodeGroup, folderImage, formulaImage, controlImage, databaseFieldImage);

            nodeGroup = nodeRoot.getNodes().add("Details", folderImage);
            this.pAddCtrlsAux(report.getDetails(), nodeGroup, folderImage, formulaImage, controlImage, databaseFieldImage);

            nodeGroup = nodeRoot.getNodes().add("Group Footer", folderImage);
            this.pAddCtrlsAux(report.getGroupsFooters(), nodeGroup, folderImage, formulaImage, controlImage, databaseFieldImage);

            nodeGroup = nodeRoot.getNodes().add("Footers", folderImage);
            this.pAddCtrlsAux(report.getFooters(), nodeGroup, folderImage, formulaImage, controlImage, databaseFieldImage);

            nodeRoot.expandAll();
        }

        private static pAddCtrlsAux(sections: cIReportGroupSections, father: Node,
                                     folderImage: number, formulaImage: number,
                                     controlImage: number, databaseFieldImage: number) {
            let nodeSec: Node;
            let nodeSecLn: Node;
            let nodeCtrl: Node;
            let item: Node;
            let text: string;
            let bComplexF: boolean = false;
            let sec: cReportSection;
            let secLn: cReportSectionLine;
            let ctrl: cReportControl;

            for(let i = 0; i < sections.count(); i++) {
                sec = sections.item(i);
                nodeSec = father.getNodes().add(sec.getName(), folderImage);
                nodeSec.tag = "S" + sec.getKey();

                if(sec.getFormulaHide().getText() !== "") {
                    if(sec.getFormulaHide().getText() === "0") {
                        text = "Hidden";
                        bComplexF = false;
                    }
                    else {
                        text = "Visibility formula";
                        bComplexF = true;
                    }
                    item = nodeSec.getNodes().add(text, formulaImage);
                    item.selectedImageIndex = formulaImage;
                    if(!sec.getHasFormulaHide()) {
                        item.foreColor = Color.Red.toString();
                    }

                    if(bComplexF) {
                        item.tag = "@FH=" + sec.getFormulaHide().getText();
                    }
                }

                for(let j = 0; j < sec.getSectionLines().count(); j++) {
                    secLn = sec.getSectionLines().item(j);
                    nodeSecLn = nodeSec.getNodes().add("Line " + secLn.getRealIndex(), folderImage);
                    nodeSecLn.tag = "L" + secLn.getKey();

                    if(secLn.getFormulaHide().getText() !== "") {
                        if(secLn.getFormulaHide().getText() === "0") {
                            text = "Hidden";
                            bComplexF = false;
                        }
                        else {
                            text = "Visibility formula";
                            bComplexF = true;
                        }
                        item = nodeSecLn.getNodes().add(text, formulaImage);
                        item.selectedImageIndex = formulaImage;
                        if(!secLn.getHasFormulaHide()) {
                            item.foreColor = Color.Red.toString();
                        }
                        if(bComplexF) {
                            item.tag = "@FH=" + secLn.getFormulaHide().getText();
                        }
                    }
                    for(let t = 0; t < secLn.getControls().count(); t++) {
                        ctrl = secLn.getControls().item(t);
                        nodeCtrl = nodeSecLn.getNodes().add(
                            ctrl.getName()
                            + (ctrl.getLabel().getText() !== ""
                                ? " - " + ctrl.getLabel().getText()
                                : ""),
                            controlImage
                            );
                        nodeCtrl.selectedImageIndex = controlImage;
                        nodeCtrl.tag = ctrl.getKey();
                        nodeCtrl.backColor = ctrl.getLabel().getAspect().getBackColor();
                        nodeCtrl.foreColor = ctrl.getLabel().getAspect().getFont().getForeColor();

                        if(ctrl.getControlType() === csRptControlType.RPT_CT_FIELD) {
                            item = nodeCtrl.getNodes().add(ctrl.getField().getName(), databaseFieldImage);
                            item.selectedImageIndex = databaseFieldImage;
                        }

                        if(ctrl.getFormulaHide().getText() !== "") {
                            if(ctrl.getFormulaHide().getText() === "0") {
                                text = "hidden";
                                bComplexF = false;
                            }
                            else {
                                text = "Visibility formula";
                                bComplexF = true;
                            }

                            item = nodeCtrl.getNodes().add(text, formulaImage);
                            item.selectedImageIndex = formulaImage;
                            if(!ctrl.getHasFormulaHide()) {
                                item.foreColor = Color.Red.toString();
                            }
                            if(bComplexF) {
                                item.tag = "@FH=" + ctrl.getFormulaHide().getText();
                            }
                        }

                        if(ctrl.getFormulaValue().getText() !== "") {
                            item = nodeCtrl.getNodes().add("Value formula", formulaImage);
                            item.selectedImageIndex = formulaImage;
                            if(!ctrl.getHasFormulaValue()) {
                                item.foreColor = Color.Red.toString();
                            }
                            item.tag = "@FV=" + ctrl.getFormulaValue().getText();
                        }
                    }
                }
            }
            father.expandAll();
        }

        public static fillColumns(dataSource: string,
                                  columns: CSReportEngine.cColumnsInfo,
                                  lvColumns: ListView,
                                  index: string,
                                  fieldType: string,
                                  add: boolean) {

            if(!add) {
                lvColumns.clear();
                lvColumns.createHeaders(['Name']);
            }

            for(let i_ = 0; i_ < columns.count(); i_++) {
                let column = columns.item(i_);

                var item = lvColumns.add(`{${dataSource}}.${column.getName()}`);
                item.setImageIndex(0);
                let info = U.setInfoString("", index, column.getPosition().toString());
                info = U.setInfoString(info, fieldType, column.getColumnType().toString());
                item.tag = info;
            }
        }
    }

    export class Rectangle {
        public height: number = null;
        public width: number = null;

        public constructor(rect: RectangleF) {
            this.height = rect.getHeight();
            this.width = rect.getWidth();
        }
    }

    export interface cIDatabaseFieldSelector {
        getFieldType(): number;
        setFieldType(rhs: number): void;
        getIndex(): number;
        setIndex(rhs: number): void;
        getTxDbField(): any;
    }
}
