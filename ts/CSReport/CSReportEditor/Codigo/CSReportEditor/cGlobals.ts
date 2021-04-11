

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

		public showDbFields(field: string, fieldType: number, index: number, editor: cEditor) {
            let fc: fColumns = null;

            try {
                fc = new fColumns();

                fc.clearColumns();

                let report: cReport = editor.getReport();

                let connect: cReportConnect = report.getConnect();
                fc.fillColumns(connect.getDataSource(), connect.getColumns(), false);

                for(var _i = 0; _i < report.getConnectsAux().count(); _i++) {
                    connect = report.getConnectsAux().item(_i);
                    fc.fillColumns(connect.getDataSource(), connect.getColumns(), true);
                }

                fc.setField(field);
                fc.ShowDialog();

                if (fc.getOk()) {
                    field = fc.getField();
                    fieldType = fc.getFieldType();
                    index = fc.getIndex();

                    return true;
                }
                else {
                    return false;
                }

            } catch (Exception ex) {
                cError.mngError(ex, "showDbFields", C_MODULE, "");
                return false;
            }
UNKNOWN >>             finally {
                if (fc !== null) {
                    fc.Close();
                }
            }      
		}

		public setEditAlignTextState(length: object) {
            implementThisMessage("setEditAlignTextState", "(CSReportEditor cGlobals)");
		}

		public setEditAlignCtlState(b: boolean) {
            implementThisMessage("setEditAlignCtlState", "(CSReportEditor cGlobals)");
		}

		public setEditFontBoldValue(bBold: number) {
            implementThisMessage("setEditFontBoldValue", "(CSReportEditor cGlobals)");
		}

		public setEditAlignValue(align: number) {
            implementThisMessage("setEditAlignValue", "(CSReportEditor cGlobals)");
		}

		public setParametersAux(connect: cConnect, rptConnect: cReportConnect) {
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

        public moveGroup(group: cReportGroup, editor: cEditor) {
            throw new NotImplementedException();
        }

        public getDataSourceStr(dataSource: string) {
            return "{" + dataSource + "}.";
        }

        public createStandarSections(report: cReport, tr: Rectangle) {
            report.getHeaders().add(null, C_KEY_HEADER);
            report.getFooters().add(null, C_KEY_FOOTER);
            report.getDetails().add(null, C_KEY_DETAIL);

            // 
            // main header
            //
            let sec: cReportSection = report.getHeaders().item(C_KEY_HEADER);
            sec.setName("Main header");

            let aspect: cReportAspect = sec.getAspect();
            aspect.setTop(0);
            aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width);
            let secLn: cReportSectionLine = sec.getSectionLines().item(0);
            secLn.setSectionName("Main header");
            aspect = secLn.getAspect();
            aspect.setTop(0);
            aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width);

            // 
            // detail
            //
            sec = report.getDetails().item(C_KEY_DETAIL);
            sec.setName("Detail");

            aspect = sec.getAspect();
            aspect.setTop(tr.height * 0.25f);
            aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width);
            secLn = sec.getSectionLines().item(0);
            secLn.setSectionName("Detail");
            aspect = secLn.getAspect();
            aspect.setTop(tr.height * 0.25f);
            aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width);

            // 
            // main footer
            //
            sec = report.getFooters().item(C_KEY_FOOTER);
            sec.setName("Main footer");

            aspect = sec.getAspect();
            aspect.setTop(tr.height * 0.75f);
            aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width);
            secLn = sec.getSectionLines().item(0);
            secLn.setSectionName("Main footer");
            aspect = secLn.getAspect();
            aspect.setTop(tr.height * 0.75f);
            aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width);
        }

        public clearCtrlBox(editor: cEditor) {
            throw new NotImplementedException();
        }

        public implementThisMessage(functionName: string, moduleName: string) {
            //Console.WriteLine(String.Format("Implement this: public static void {0} {1}", functionName, moduleName));
        }

        public addCtrls(report: cReport, lv_controls: ListView, C_CTRL_IMAGE: number, C_DB_IMAGE: number) {
            lv_controls.Items.clear();

            for(let i = 0; i < report.getControls().count(); i++) {
                let ctrl = report.getControls().item(i);
                let ctrlName = ctrl.getName();
                let ctrlInfo = "";
                let ctrlField = "";

                switch (ctrl.getControlType())
                {
                    case csRptControlType.CSRPTCTFIELD:
                        ctrlField = ctrl.getField().getName();
                        break;
                    case csRptControlType.CSRPTCTDBIMAGE:
                        ctrlInfo = ctrl.getField().getName();
                        break;
                    case csRptControlType.CSRPTCTIMAGE:
                        ctrlInfo = " (Image)";
                        break;
                    case csRptControlType.CSRPTCTLABEL:
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

                if (ctrl.getHasFormulaValue()) item.SubItems[1].Text = "*"; {
                if (ctrl.getHasFormulaHide()) item.SubItems[2].Text = "*"; {

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

        public addCtrls(
            report: cReport, tv_controls: TreeView
            C_IMG_FOLDER: number, C_IMG_FORMULA: number
            C_IMG_CONTROL: number, C_IMG_DATBASE_FIELD: number) {
            tv_controls.Nodes.clear();

UNKNOWN >>             TreeNode nodeGroup;
            let nodeRoot: TreeNode = tv_controls.Nodes.Add(report.getName());
            nodeRoot.ImageIndex = C_IMG_FOLDER;

            nodeGroup = nodeRoot.Nodes.Add("Headers");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Group Header");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getGroupsHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Details");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getDetails(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Group Footer");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getGroupsFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Footers");
            nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeRoot.ExpandAll();
        }

        private pAddCtrlsAux(
            sections: cIReportGroupSections, father: TreeNode
            C_IMG_FOLDER: number, C_IMG_FORMULA: number, C_IMG_CONTROL: number, C_IMG_DATBASE_FIELD: number) {
UNKNOWN >>             TreeNode nodeSec;
UNKNOWN >>             TreeNode nodeSecLn;
UNKNOWN >>             TreeNode nodeCtrl;
UNKNOWN >>             TreeNode item;
UNKNOWN >>             string text;
            let bComplexF: boolean = false; ;

UNKNOWN >>             cReportSection sec;
UNKNOWN >>             cReportSectionLine secLn;
UNKNOWN >>             cReportControl ctrl;

            for(let i = 0; i < sections.count(); i++) {
                sec = sections.item(i);
                nodeSec = father.Nodes.Add(sec.getName());
                nodeSec.Tag = "S" + sec.getKey();

                if (sec.getFormulaHide().getText() !== "") {
                    if (sec.getFormulaHide().getText() === "0") {
                        text = "Hidden";
                        bComplexF = false; ;
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

                for(var j = 0; j < sec.getSectionLines().count(); j++) {
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

                        if (ctrl.getControlType() === csRptControlType.CSRPTCTFIELD) {
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

        public fillColumns(
            dataSource: string, columns: CSReportDll.cColumnsInfo, lv_columns: ListView
            C_INDEX: string, C_FIELDTYPE: string, add: boolean) {
            if (!add) lv_columns.Items.clear(); {

            for(let i_ = 0; i_ < columns.length; i_++) {
                let item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName()));
                item.ImageIndex = 0;
                let info: string = cUtil.setInfoString("", C_INDEX, column.getPosition().toString());
                info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().toString());
                item.Tag = info;
            }
        }


    } 





    public class Rectangle    export class Rectangle {


    {
        public height: number = null;
        public width: number = null;

        public constructor(rect: RectangleF) {
            height = rect.Height;
            width = rect.Width;
        }


    } 





    public interface cIDatabaseFieldSelector UNKNOWN >>     public interface cIDatabaseFieldSelector 
    {
        int getFieldType();
        void setFieldType(int rhs);
        int getIndex();
        void setIndex(int rhs);
UNKNOWN >>         System.Windows.Forms.TextBox txDbField { get; }


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


    } 



UNKNOWN >>     public enum csRptEditCtrlType {
        none,
        label,
        field,
        formula,
        image,
        chart,
UNKNOWN >>         lineLabel


    } 
}
