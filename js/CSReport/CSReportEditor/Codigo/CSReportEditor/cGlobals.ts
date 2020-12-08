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

		self.showDbFields = function(field, fieldType, index, editor) {
            let fc = null;

            try {
                fc = new fColumns();

                fc.clearColumns();

                let report = editor.getReport();

                let connect = report.getConnect();
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
		};

		self.setEditAlignTextState = function(length) {
            implementThisMessage("setEditAlignTextState", "(CSReportEditor cGlobals)");
		};

		self.setEditAlignCtlState = function(b) {
            implementThisMessage("setEditAlignCtlState", "(CSReportEditor cGlobals)");
		};

		self.setEditFontBoldValue = function(bBold) {
            implementThisMessage("setEditFontBoldValue", "(CSReportEditor cGlobals)");
		};

		self.setEditAlignValue = function(align) {
            implementThisMessage("setEditAlignValue", "(CSReportEditor cGlobals)");
		};

		self.setParametersAux = function(connect, rptConnect) {
            rptConnect.getColumns().clear();
            rptConnect.getParameters().clear();

            for(var i = 0; i < connect.getColumnsInfo().count(); i++) {
                let colInfo = connect.getColumnsInfo().item(i);
                let rptColInfo = new CSReportDll.cColumnInfo();

                rptColInfo.setName(colInfo.getName());
                rptColInfo.setPosition(colInfo.getPosition());
                rptColInfo.setColumnType(colInfo.getColumnType());
                rptConnect.getColumns().add(rptColInfo, "");
            }

            for(var i = 0; i < connect.getParameters().count(); i++) {
                let parameter = connect.getParameters().item(i);
                let rptParameter = new CSReportDll.cParameter();

                rptParameter.setName(parameter.getName());
                rptParameter.setPosition(parameter.getPosition());
                rptParameter.setColumnType(parameter.getColumnType());
                rptParameter.setValue(parameter.getValue());
                rptConnect.getParameters().add(rptParameter, "");
            }        
        };

        self.moveGroup = function(group, editor) {
            throw new NotImplementedException();
        };

        self.getDataSourceStr = function(dataSource) {
            return "{" + dataSource + "}.";
        };

        self.createStandarSections = function(report, tr) {
            report.getHeaders().add(null, C_KEY_HEADER);
            report.getFooters().add(null, C_KEY_FOOTER);
            report.getDetails().add(null, C_KEY_DETAIL);

            // 
            // main header
            //
            let sec = report.getHeaders().item(C_KEY_HEADER);
            sec.setName("Main header");

            let aspect = sec.getAspect();
            aspect.setTop(0);
            aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width);
            let secLn = sec.getSectionLines().item(0);
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
        };

        self.clearCtrlBox = function(editor) {
            throw new NotImplementedException();
        };

        self.implementThisMessage = function(functionName, moduleName) {
            //Console.WriteLine(String.Format("Implement this: public static void {0} {1}", functionName, moduleName));
        };

        self.addCtrls = function(report, lv_controls, C_CTRL_IMAGE, C_DB_IMAGE) {
            lv_controls.Items.Clear();

            for(var i = 0; i < report.getControls().count(); i++) {
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

                if (ctrlInfo.Length > 0) {
                    ctrlName += " (" + ctrlInfo + ")";
                }

                let item = lv_controls.Items.Add(ctrlName, C_CTRL_IMAGE);
                item.Tag = ctrl.getKey();
                item.SubItems.Add("");
                item.SubItems.Add("");
                item.SubItems.Add("");

                if (ctrl.getHasFormulaValue()) item.SubItems[1].Text = "*"; {
                if (ctrl.getHasFormulaHide()) item.SubItems[2].Text = "*"; {

                if (ctrlField.Length > 0) {
                    item.SubItems[3].Text = ctrlField;
                    item.SubItems[3].ForeColor = Color.Blue;
                    item.ImageIndex = C_DB_IMAGE;
                }
                if (ctrl.getName().Length > 4 && ctrl.getName().Substring(0, 4) === "lnk_") {
                    item.ForeColor = Color.Red;
                }
            }
        };

        self.addCtrls = function(
            report, tv_controls, 
            C_IMG_FOLDER, C_IMG_FORMULA, 
            C_IMG_CONTROL, C_IMG_DATBASE_FIELD) {
            tv_controls.Nodes.Clear();

UNKNOWN >>             TreeNode nodeGroup;
            let nodeRoot = tv_controls.Nodes.Add(report.getName());
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
        };

        const pAddCtrlsAux = function(
            sections, father, 
            C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD) {
UNKNOWN >>             TreeNode nodeSec;
UNKNOWN >>             TreeNode nodeSecLn;
UNKNOWN >>             TreeNode nodeCtrl;
UNKNOWN >>             TreeNode item;
UNKNOWN >>             string text;
            let bComplexF = false; ;

UNKNOWN >>             cReportSection sec;
UNKNOWN >>             cReportSectionLine secLn;
UNKNOWN >>             cReportControl ctrl;

            for(var i = 0; i < sections.count(); i++) {
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
        };

        self.fillColumns = function(
            dataSource, columns, lv_columns, 
            C_INDEX, C_FIELDTYPE, add) {
            if (!add) lv_columns.Items.Clear(); {

            for(var i_ = 0; i_ < columns.length; i_++) {
                let item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName()));
                item.ImageIndex = 0;
                let info = cUtil.setInfoString("", C_INDEX, column.getPosition().ToString());
                info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().ToString());
                item.Tag = info;
            }
        };
        return self;

    }

        self.create = function() {

            const self = {};
        self.height = null;
        self.width = null;

        self. = function(rect) {
            height = rect.Height;
            width = rect.Width;
        };
        return self;

    }

UNKNOWN >>         return self;

    public interface cIDatabaseFieldSelector 
    {
        int getFieldType();
        void setFieldType(int rhs);
        int getIndex();
        void setIndex(int rhs);
UNKNOWN >>         System.Windows.Forms.TextBox txDbField { get; }
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
        none,
        label,
        field,
        formula,
        image,
        chart,
UNKNOWN >>         lineLabel
        return self;

    }
}(globalObject));
