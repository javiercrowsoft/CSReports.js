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

		self.showDbFields = function(field, fieldType, index, editor) { //@@@: public static bool showDbFields(ref string field, ref int fieldType, ref int index, cEditor editor)
            let fc = null; //@@@: fColumns fc = null;

            try { //@@@: try {
                fc = new fColumns(); //@@@: fc = new fColumns();

                fc.clearColumns(); //@@@: fc.clearColumns();

                let report = editor.getReport(); //@@@: cReport report = editor.getReport();

                let connect = report.getConnect(); //@@@: cReportConnect connect = report.getConnect();
                fc.fillColumns(connect.getDataSource(), connect.getColumns(), false); //@@@: fc.fillColumns(connect.getDataSource(), connect.getColumns(), false);

                for(var _i = 0; _i < report.getConnectsAux().count(); _i++) { //@@@: for (int _i = 0; _i < report.getConnectsAux().count(); _i++)
                    connect = report.getConnectsAux().item(_i); //@@@: connect = report.getConnectsAux().item(_i);
                    fc.fillColumns(connect.getDataSource(), connect.getColumns(), true); //@@@: fc.fillColumns(connect.getDataSource(), connect.getColumns(), true);
                } //@@@: }

                fc.setField(field); //@@@: fc.setField(field);
                fc.ShowDialog(); //@@@: fc.ShowDialog();

                if (fc.getOk()) { //@@@: if (fc.getOk())
                    field = fc.getField(); //@@@: field = fc.getField();
                    fieldType = fc.getFieldType(); //@@@: fieldType = fc.getFieldType();
                    index = fc.getIndex(); //@@@: index = fc.getIndex();

                    return true; //@@@: return true;
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }

            } catch (Exception ex) { //@@@: } catch (Exception ex) {
                cError.mngError(ex, "showDbFields", C_MODULE, ""); //@@@: cError.mngError(ex, "showDbFields", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally { //@@@: finally {
                if (fc !== null) { //@@@: if (fc != null)
                    fc.Close(); //@@@: fc.Close();
                } //@@@: }
            }       //@@@: }
		}; //@@@: }

		self.setEditAlignTextState = function(length) { //@@@: public static void setEditAlignTextState(object length)
            implementThisMessage("setEditAlignTextState", "(CSReportEditor cGlobals)"); //@@@: implementThisMessage("setEditAlignTextState", "(CSReportEditor cGlobals)");
		}; //@@@: }

		self.setEditAlignCtlState = function(b) { //@@@: public static void setEditAlignCtlState(bool b)
            implementThisMessage("setEditAlignCtlState", "(CSReportEditor cGlobals)"); //@@@: implementThisMessage("setEditAlignCtlState", "(CSReportEditor cGlobals)");
		}; //@@@: }

		self.setEditFontBoldValue = function(bBold) { //@@@: public static void setEditFontBoldValue(int bBold)
            implementThisMessage("setEditFontBoldValue", "(CSReportEditor cGlobals)"); //@@@: implementThisMessage("setEditFontBoldValue", "(CSReportEditor cGlobals)");
		}; //@@@: }

		self.setEditAlignValue = function(align) { //@@@: public static void setEditAlignValue(int align)
            implementThisMessage("setEditAlignValue", "(CSReportEditor cGlobals)"); //@@@: implementThisMessage("setEditAlignValue", "(CSReportEditor cGlobals)");
		}; //@@@: }

		self.setParametersAux = function(connect, rptConnect) { //@@@: public static void setParametersAux(cConnect connect, cReportConnect rptConnect)
            rptConnect.getColumns().clear(); //@@@: rptConnect.getColumns().clear();
            rptConnect.getParameters().clear(); //@@@: rptConnect.getParameters().clear();

            for(var i = 0; i < connect.getColumnsInfo().count(); i++) { //@@@: for (int i = 0; i < connect.getColumnsInfo().count(); i++)
                let colInfo = connect.getColumnsInfo().item(i); //@@@: CSConnect.cColumnInfo colInfo = connect.getColumnsInfo().item(i);
                let rptColInfo = new CSReportDll.cColumnInfo(); //@@@: CSReportDll.cColumnInfo rptColInfo = new CSReportDll.cColumnInfo();

                rptColInfo.setName(colInfo.getName()); //@@@: rptColInfo.setName(colInfo.getName());
                rptColInfo.setPosition(colInfo.getPosition()); //@@@: rptColInfo.setPosition(colInfo.getPosition());
                rptColInfo.setColumnType(colInfo.getColumnType()); //@@@: rptColInfo.setColumnType(colInfo.getColumnType());
                rptConnect.getColumns().add(rptColInfo, ""); //@@@: rptConnect.getColumns().add(rptColInfo, "");
            } //@@@: }

            for(var i = 0; i < connect.getParameters().count(); i++) { //@@@: for (int i = 0; i < connect.getParameters().count(); i++)
                let parameter = connect.getParameters().item(i); //@@@: CSConnect.cParameter parameter = connect.getParameters().item(i);
                let rptParameter = new CSReportDll.cParameter(); //@@@: CSReportDll.cParameter rptParameter = new CSReportDll.cParameter();

                rptParameter.setName(parameter.getName()); //@@@: rptParameter.setName(parameter.getName());
                rptParameter.setPosition(parameter.getPosition()); //@@@: rptParameter.setPosition(parameter.getPosition());
                rptParameter.setColumnType(parameter.getColumnType()); //@@@: rptParameter.setColumnType(parameter.getColumnType());
                rptParameter.setValue(parameter.getValue()); //@@@: rptParameter.setValue(parameter.getValue());
                rptConnect.getParameters().add(rptParameter, ""); //@@@: rptConnect.getParameters().add(rptParameter, "");
            }         //@@@: }
        }; //@@@: }

        self.moveGroup = function(group, editor) { //@@@: public static void moveGroup(cReportGroup group, cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getDataSourceStr = function(dataSource) { //@@@: public static string getDataSourceStr(string dataSource)
            return "{" + dataSource + "}."; //@@@: return "{" + dataSource + "}.";
        }; //@@@: }

        self.createStandarSections = function(report, tr) { //@@@: internal static void createStandarSections(cReport report, Rectangle tr)
            report.getHeaders().add(null, C_KEY_HEADER); //@@@: report.getHeaders().add(null, C_KEY_HEADER);
            report.getFooters().add(null, C_KEY_FOOTER); //@@@: report.getFooters().add(null, C_KEY_FOOTER);
            report.getDetails().add(null, C_KEY_DETAIL); //@@@: report.getDetails().add(null, C_KEY_DETAIL);

            // 
            // main header
            //
            let sec = report.getHeaders().item(C_KEY_HEADER); //@@@: cReportSection sec = report.getHeaders().item(C_KEY_HEADER);
            sec.setName("Main header"); //@@@: sec.setName("Main header");

            let aspect = sec.getAspect(); //@@@: cReportAspect aspect = sec.getAspect();
            aspect.setTop(0); //@@@: aspect.setTop(0);
            aspect.setHeight(tr.height * 0.25f); //@@@: aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width); //@@@: aspect.setWidth(tr.width);
            let secLn = sec.getSectionLines().item(0); //@@@: cReportSectionLine secLn = sec.getSectionLines().item(0);
            secLn.setSectionName("Main header"); //@@@: secLn.setSectionName("Main header");
            aspect = secLn.getAspect(); //@@@: aspect = secLn.getAspect();
            aspect.setTop(0); //@@@: aspect.setTop(0);
            aspect.setHeight(tr.height * 0.25f); //@@@: aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width); //@@@: aspect.setWidth(tr.width);

            // 
            // detail
            //
            sec = report.getDetails().item(C_KEY_DETAIL); //@@@: sec = report.getDetails().item(C_KEY_DETAIL);
            sec.setName("Detail"); //@@@: sec.setName("Detail");

            aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
            aspect.setTop(tr.height * 0.25f); //@@@: aspect.setTop(tr.height * 0.25f);
            aspect.setHeight(tr.height * 0.25f); //@@@: aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width); //@@@: aspect.setWidth(tr.width);
            secLn = sec.getSectionLines().item(0); //@@@: secLn = sec.getSectionLines().item(0);
            secLn.setSectionName("Detail"); //@@@: secLn.setSectionName("Detail");
            aspect = secLn.getAspect(); //@@@: aspect = secLn.getAspect();
            aspect.setTop(tr.height * 0.25f); //@@@: aspect.setTop(tr.height * 0.25f);
            aspect.setHeight(tr.height * 0.25f); //@@@: aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width); //@@@: aspect.setWidth(tr.width);

            // 
            // main footer
            //
            sec = report.getFooters().item(C_KEY_FOOTER); //@@@: sec = report.getFooters().item(C_KEY_FOOTER);
            sec.setName("Main footer"); //@@@: sec.setName("Main footer");

            aspect = sec.getAspect(); //@@@: aspect = sec.getAspect();
            aspect.setTop(tr.height * 0.75f); //@@@: aspect.setTop(tr.height * 0.75f);
            aspect.setHeight(tr.height * 0.25f); //@@@: aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width); //@@@: aspect.setWidth(tr.width);
            secLn = sec.getSectionLines().item(0); //@@@: secLn = sec.getSectionLines().item(0);
            secLn.setSectionName("Main footer"); //@@@: secLn.setSectionName("Main footer");
            aspect = secLn.getAspect(); //@@@: aspect = secLn.getAspect();
            aspect.setTop(tr.height * 0.75f); //@@@: aspect.setTop(tr.height * 0.75f);
            aspect.setHeight(tr.height * 0.25f); //@@@: aspect.setHeight(tr.height * 0.25f);
            aspect.setWidth(tr.width); //@@@: aspect.setWidth(tr.width);
        }; //@@@: }

        self.clearCtrlBox = function(editor) { //@@@: internal static void clearCtrlBox(cEditor editor)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.implementThisMessage = function(functionName, moduleName) { //@@@: public static void implementThisMessage(string functionName, string moduleName)
            //Console.WriteLine(String.Format("Implement this: public static void {0} {1}", functionName, moduleName));
        }; //@@@: }

        self.addCtrls = function(report, lv_controls, C_CTRL_IMAGE, C_DB_IMAGE) { //@@@: public static void addCtrls(cReport report, ListView lv_controls, int C_CTRL_IMAGE, int C_DB_IMAGE)
            lv_controls.Items.Clear(); //@@@: lv_controls.Items.Clear();

            for(var i = 0; i < report.getControls().count(); i++) { //@@@: for (int i = 0; i < report.getControls().count(); i++)
                let ctrl = report.getControls().item(i); //@@@: var ctrl = report.getControls().item(i);
                let ctrlName = ctrl.getName(); //@@@: var ctrlName = ctrl.getName();
                let ctrlInfo = ""; //@@@: var ctrlInfo = "";
                let ctrlField = ""; //@@@: var ctrlField = "";

                switch (ctrl.getControlType()) //@@@: switch (ctrl.getControlType())
                { //@@@: {
                    case csRptControlType.CSRPTCTFIELD: //@@@: case csRptControlType.CSRPTCTFIELD:
                        ctrlField = ctrl.getField().getName(); //@@@: ctrlField = ctrl.getField().getName();
                        break; //@@@: break;
                    case csRptControlType.CSRPTCTDBIMAGE: //@@@: case csRptControlType.CSRPTCTDBIMAGE:
                        ctrlInfo = ctrl.getField().getName(); //@@@: ctrlInfo = ctrl.getField().getName();
                        break; //@@@: break;
                    case csRptControlType.CSRPTCTIMAGE: //@@@: case csRptControlType.CSRPTCTIMAGE:
                        ctrlInfo = " (Image)"; //@@@: ctrlInfo = " (Image)";
                        break; //@@@: break;
                    case csRptControlType.CSRPTCTLABEL: //@@@: case csRptControlType.CSRPTCTLABEL:
                        ctrlInfo = ctrl.getLabel().getText(); //@@@: ctrlInfo = ctrl.getLabel().getText();
                        break; //@@@: break;
                } //@@@: }

                if (ctrlInfo.Length > 0) { //@@@: if (ctrlInfo.Length > 0)
                    ctrlName += " (" + ctrlInfo + ")"; //@@@: ctrlName += " (" + ctrlInfo + ")";
                } //@@@: }

                let item = lv_controls.Items.Add(ctrlName, C_CTRL_IMAGE); //@@@: var item = lv_controls.Items.Add(ctrlName, C_CTRL_IMAGE);
                item.Tag = ctrl.getKey(); //@@@: item.Tag = ctrl.getKey();
                item.SubItems.Add(""); //@@@: item.SubItems.Add("");
                item.SubItems.Add(""); //@@@: item.SubItems.Add("");
                item.SubItems.Add(""); //@@@: item.SubItems.Add("");

                if (ctrl.getHasFormulaValue()) item.SubItems[1].Text = "*"; { //@@@: if (ctrl.getHasFormulaValue()) item.SubItems[1].Text = "*";
                if (ctrl.getHasFormulaHide()) item.SubItems[2].Text = "*"; { //@@@: if (ctrl.getHasFormulaHide()) item.SubItems[2].Text = "*";

                if (ctrlField.Length > 0) { //@@@: if (ctrlField.Length > 0)
                    item.SubItems[3].Text = ctrlField; //@@@: item.SubItems[3].Text = ctrlField;
                    item.SubItems[3].ForeColor = Color.Blue; //@@@: item.SubItems[3].ForeColor = Color.Blue;
                    item.ImageIndex = C_DB_IMAGE; //@@@: item.ImageIndex = C_DB_IMAGE;
                } //@@@: }
                if (ctrl.getName().Length > 4 && ctrl.getName().Substring(0, 4) === "lnk_") { //@@@: if (ctrl.getName().Length > 4 && ctrl.getName().Substring(0, 4) == "lnk_")
                    item.ForeColor = Color.Red; //@@@: item.ForeColor = Color.Red;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.addCtrls = function( //@@@: public static void addCtrls(
            report, tv_controls,  //@@@: cReport report, TreeView tv_controls,
            C_IMG_FOLDER, C_IMG_FORMULA,  //@@@: int C_IMG_FOLDER, int C_IMG_FORMULA,
            C_IMG_CONTROL, C_IMG_DATBASE_FIELD) { //@@@: int C_IMG_CONTROL, int C_IMG_DATBASE_FIELD)
            tv_controls.Nodes.Clear(); //@@@: tv_controls.Nodes.Clear();

UNKNOWN >>             TreeNode nodeGroup; //@@@: TreeNode nodeGroup;
            let nodeRoot = tv_controls.Nodes.Add(report.getName()); //@@@: TreeNode nodeRoot = tv_controls.Nodes.Add(report.getName());
            nodeRoot.ImageIndex = C_IMG_FOLDER; //@@@: nodeRoot.ImageIndex = C_IMG_FOLDER;

            nodeGroup = nodeRoot.Nodes.Add("Headers"); //@@@: nodeGroup = nodeRoot.Nodes.Add("Headers");
            nodeGroup.ImageIndex = C_IMG_FOLDER; //@@@: nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD); //@@@: pAddCtrlsAux(report.getHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Group Header"); //@@@: nodeGroup = nodeRoot.Nodes.Add("Group Header");
            nodeGroup.ImageIndex = C_IMG_FOLDER; //@@@: nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getGroupsHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD); //@@@: pAddCtrlsAux(report.getGroupsHeaders(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Details"); //@@@: nodeGroup = nodeRoot.Nodes.Add("Details");
            nodeGroup.ImageIndex = C_IMG_FOLDER; //@@@: nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getDetails(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD); //@@@: pAddCtrlsAux(report.getDetails(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Group Footer"); //@@@: nodeGroup = nodeRoot.Nodes.Add("Group Footer");
            nodeGroup.ImageIndex = C_IMG_FOLDER; //@@@: nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getGroupsFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD); //@@@: pAddCtrlsAux(report.getGroupsFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeGroup = nodeRoot.Nodes.Add("Footers"); //@@@: nodeGroup = nodeRoot.Nodes.Add("Footers");
            nodeGroup.ImageIndex = C_IMG_FOLDER; //@@@: nodeGroup.ImageIndex = C_IMG_FOLDER;
            pAddCtrlsAux(report.getFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD); //@@@: pAddCtrlsAux(report.getFooters(), nodeGroup, C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD);

            nodeRoot.ExpandAll(); //@@@: nodeRoot.ExpandAll();
        }; //@@@: }

        const pAddCtrlsAux = function( //@@@: private static void pAddCtrlsAux(
            sections, father,  //@@@: cIReportGroupSections sections, TreeNode father,
            C_IMG_FOLDER, C_IMG_FORMULA, C_IMG_CONTROL, C_IMG_DATBASE_FIELD) { //@@@: int C_IMG_FOLDER, int C_IMG_FORMULA, int C_IMG_CONTROL, int C_IMG_DATBASE_FIELD)
UNKNOWN >>             TreeNode nodeSec; //@@@: TreeNode nodeSec;
UNKNOWN >>             TreeNode nodeSecLn; //@@@: TreeNode nodeSecLn;
UNKNOWN >>             TreeNode nodeCtrl; //@@@: TreeNode nodeCtrl;
UNKNOWN >>             TreeNode item; //@@@: TreeNode item;
UNKNOWN >>             string text; //@@@: string text;
            let bComplexF = false; ; //@@@: bool bComplexF = false; ;

UNKNOWN >>             cReportSection sec; //@@@: cReportSection sec;
UNKNOWN >>             cReportSectionLine secLn; //@@@: cReportSectionLine secLn;
UNKNOWN >>             cReportControl ctrl; //@@@: cReportControl ctrl;

            for(var i = 0; i < sections.count(); i++) { //@@@: for (int i = 0; i < sections.count(); i++)
                sec = sections.item(i); //@@@: sec = sections.item(i);
                nodeSec = father.Nodes.Add(sec.getName()); //@@@: nodeSec = father.Nodes.Add(sec.getName());
                nodeSec.Tag = "S" + sec.getKey(); //@@@: nodeSec.Tag = "S" + sec.getKey();

                if (sec.getFormulaHide().getText() !== "") { //@@@: if (sec.getFormulaHide().getText() != "")
                    if (sec.getFormulaHide().getText() === "0") { //@@@: if (sec.getFormulaHide().getText() == "0")
                        text = "Hidden"; //@@@: text = "Hidden";
                        bComplexF = false; ; //@@@: bComplexF = false; ;
                    } //@@@: }
                    else { //@@@: else
                        text = "Visibility formula"; //@@@: text = "Visibility formula";
                        bComplexF = true; //@@@: bComplexF = true;
                    } //@@@: }
                    item = nodeSec.Nodes.Add(text); //@@@: item = nodeSec.Nodes.Add(text);
                    item.ImageIndex = C_IMG_FORMULA; //@@@: item.ImageIndex = C_IMG_FORMULA;
                    item.SelectedImageIndex = C_IMG_FORMULA; //@@@: item.SelectedImageIndex = C_IMG_FORMULA;
                    if (!sec.getHasFormulaHide()) { //@@@: if (!sec.getHasFormulaHide())
                        item.ForeColor = Color.Red; //@@@: item.ForeColor = Color.Red;
                    } //@@@: }

                    if (bComplexF) { //@@@: if (bComplexF)
                        item.Tag = "@FH=" + sec.getFormulaHide().getText(); //@@@: item.Tag = "@FH=" + sec.getFormulaHide().getText();
                    } //@@@: }
                } //@@@: }

                for(var j = 0; j < sec.getSectionLines().count(); j++) { //@@@: for (int j = 0; j < sec.getSectionLines().count(); j++)
                    secLn = sec.getSectionLines().item(j); //@@@: secLn = sec.getSectionLines().item(j);
                    nodeSecLn = nodeSec.Nodes.Add("Line " + secLn.getIndex()); //@@@: nodeSecLn = nodeSec.Nodes.Add("Line " + secLn.getIndex());
                    nodeSecLn.ImageIndex = C_IMG_FOLDER; //@@@: nodeSecLn.ImageIndex = C_IMG_FOLDER;
                    nodeSecLn.Tag = "L" + secLn.getKey(); //@@@: nodeSecLn.Tag = "L" + secLn.getKey();

                    if (secLn.getFormulaHide().getText() !== "") { //@@@: if (secLn.getFormulaHide().getText() != "")
                        if (secLn.getFormulaHide().getText() === "0") { //@@@: if (secLn.getFormulaHide().getText() == "0")
                            text = "Hidden"; //@@@: text = "Hidden";
                            bComplexF = false; //@@@: bComplexF = false;
                        } //@@@: }
                        else { //@@@: else
                            text = "Visibility formula"; //@@@: text = "Visibility formula";
                            bComplexF = true; //@@@: bComplexF = true;
                        } //@@@: }
                        item = nodeSecLn.Nodes.Add(text); //@@@: item = nodeSecLn.Nodes.Add(text);
                        item.ImageIndex = C_IMG_FORMULA; //@@@: item.ImageIndex = C_IMG_FORMULA;
                        item.SelectedImageIndex = C_IMG_FORMULA; //@@@: item.SelectedImageIndex = C_IMG_FORMULA;
                        if (!secLn.getHasFormulaHide()) { //@@@: if (!secLn.getHasFormulaHide())
                            item.ForeColor = Color.Red; //@@@: item.ForeColor = Color.Red;
                        } //@@@: }
                        if (bComplexF) { //@@@: if (bComplexF)
                            item.Tag = "@FH=" + secLn.getFormulaHide().getText(); //@@@: item.Tag = "@FH=" + secLn.getFormulaHide().getText();
                        } //@@@: }
                    } //@@@: }
                    for(var t = 0; t < secLn.getControls().count(); t++) { //@@@: for (int t = 0; t < secLn.getControls().count(); t++)
                        ctrl = secLn.getControls().item(t); //@@@: ctrl = secLn.getControls().item(t);
                        nodeCtrl = nodeSecLn.Nodes.Add( //@@@: nodeCtrl = nodeSecLn.Nodes.Add(
                            ctrl.getName()  //@@@: ctrl.getName()
                            + (ctrl.getLabel().getText() !== ""  //@@@: + (ctrl.getLabel().getText() != ""
                                ? " - " + ctrl.getLabel().getText()  //@@@: ? " - " + ctrl.getLabel().getText()
                                : "") //@@@: : "")
                            ); //@@@: );
                        nodeCtrl.ImageIndex = C_IMG_CONTROL; //@@@: nodeCtrl.ImageIndex = C_IMG_CONTROL;
                        nodeCtrl.SelectedImageIndex = C_IMG_CONTROL; //@@@: nodeCtrl.SelectedImageIndex = C_IMG_CONTROL;
                        nodeCtrl.Tag = ctrl.getKey(); //@@@: nodeCtrl.Tag = ctrl.getKey();
                        nodeCtrl.BackColor = cColor.colorFromRGB(ctrl.getLabel().getAspect().getBackColor()); //@@@: nodeCtrl.BackColor = cColor.colorFromRGB(ctrl.getLabel().getAspect().getBackColor());
                        nodeCtrl.ForeColor = cColor.colorFromRGB(ctrl.getLabel().getAspect().getFont().getForeColor()); //@@@: nodeCtrl.ForeColor = cColor.colorFromRGB(ctrl.getLabel().getAspect().getFont().getForeColor());

                        if (ctrl.getControlType() === csRptControlType.CSRPTCTFIELD) { //@@@: if (ctrl.getControlType() == csRptControlType.CSRPTCTFIELD)
                            item = nodeCtrl.Nodes.Add(ctrl.getField().getName()); //@@@: item = nodeCtrl.Nodes.Add(ctrl.getField().getName());
                            item.ImageIndex = C_IMG_DATBASE_FIELD; //@@@: item.ImageIndex = C_IMG_DATBASE_FIELD;
                            item.SelectedImageIndex = C_IMG_DATBASE_FIELD; //@@@: item.SelectedImageIndex = C_IMG_DATBASE_FIELD;
                        } //@@@: }

                        if (ctrl.getFormulaHide().getText() !== "") { //@@@: if (ctrl.getFormulaHide().getText() != "")
                            if (ctrl.getFormulaHide().getText() === "0") { //@@@: if (ctrl.getFormulaHide().getText() == "0")
                                text = "hidden"; //@@@: text = "hidden";
                                bComplexF = false; //@@@: bComplexF = false;
                            } //@@@: }
                            else { //@@@: else
                                text = "Visibility formula"; //@@@: text = "Visibility formula";
                                bComplexF = true; //@@@: bComplexF = true;
                            } //@@@: }

                            item = nodeCtrl.Nodes.Add(text); //@@@: item = nodeCtrl.Nodes.Add(text);
                            item.ImageIndex = C_IMG_FORMULA; //@@@: item.ImageIndex = C_IMG_FORMULA;
                            item.SelectedImageIndex = C_IMG_FORMULA; //@@@: item.SelectedImageIndex = C_IMG_FORMULA;
                            if (!ctrl.getHasFormulaHide()) { //@@@: if (!ctrl.getHasFormulaHide())
                                item.ForeColor = Color.Red; //@@@: item.ForeColor = Color.Red;
                            } //@@@: }
                            if (bComplexF) { //@@@: if (bComplexF)
                                item.Tag = "@FH=" + ctrl.getFormulaHide().getText(); //@@@: item.Tag = "@FH=" + ctrl.getFormulaHide().getText();
                            } //@@@: }
                        } //@@@: }

                        if (ctrl.getFormulaValue().getText() !== "") { //@@@: if (ctrl.getFormulaValue().getText() != "")
                            item = nodeCtrl.Nodes.Add("Value formula"); //@@@: item = nodeCtrl.Nodes.Add("Value formula");
                            item.ImageIndex = C_IMG_FORMULA; //@@@: item.ImageIndex = C_IMG_FORMULA;
                            item.SelectedImageIndex = C_IMG_FORMULA; //@@@: item.SelectedImageIndex = C_IMG_FORMULA;
                            if (!ctrl.getHasFormulaValue()) { //@@@: if (!ctrl.getHasFormulaValue())
                                item.ForeColor = Color.Red; //@@@: item.ForeColor = Color.Red;
                            } //@@@: }
                            item.Tag = "@FV=" + ctrl.getFormulaValue().getText(); //@@@: item.Tag = "@FV=" + ctrl.getFormulaValue().getText();
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            father.ExpandAll(); //@@@: father.ExpandAll();
        }; //@@@: }

        self.fillColumns = function( //@@@: public static void fillColumns(
            dataSource, columns, lv_columns,  //@@@: string dataSource, CSReportDll.cColumnsInfo columns, ListView lv_columns,
            C_INDEX, C_FIELDTYPE, add) { //@@@: string C_INDEX, string C_FIELDTYPE, bool add)
            if (!add) lv_columns.Items.Clear(); { //@@@: if (!add) lv_columns.Items.Clear();

            for(var i_ = 0; i_ < columns.length; i_++) { //@@@: foreach (CSReportDll.cColumnInfo column in columns)
                let item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName())); //@@@: var item = lv_columns.Items.Add(String.Format("{{{0}}}.{1}", dataSource, column.getName()));
                item.ImageIndex = 0; //@@@: item.ImageIndex = 0;
                let info = cUtil.setInfoString("", C_INDEX, column.getPosition().ToString()); //@@@: string info = cUtil.setInfoString("", C_INDEX, column.getPosition().ToString());
                info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().ToString()); //@@@: info = cUtil.setInfoString(info, C_FIELDTYPE, column.getColumnType().ToString());
                item.Tag = info; //@@@: item.Tag = info;
            } //@@@: }
        }; //@@@: }
        return self;

    } //@@@: }

        self.create = function() {

            const self = {}; //@@@: public class Rectangle
        self.height = null; //@@@: public long height;
        self.width = null; //@@@: public long width;

        self. = function(rect) { //@@@: public Rectangle(RectangleF rect)
            height = rect.Height; //@@@: height = (long)rect.Height;
            width = rect.Width; //@@@: width = (long)rect.Width;
        }; //@@@: }
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public interface cIDatabaseFieldSelector  //@@@: public interface cIDatabaseFieldSelector
    { //@@@: {
        int getFieldType(); //@@@: int getFieldType();
        void setFieldType(int rhs); //@@@: void setFieldType(int rhs);
        int getIndex(); //@@@: int getIndex();
        void setIndex(int rhs); //@@@: void setIndex(int rhs);
UNKNOWN >>         System.Windows.Forms.TextBox txDbField { get; } //@@@: System.Windows.Forms.TextBox txDbField { get; }
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
        none, //@@@: none,
        label, //@@@: label,
        field, //@@@: field,
        formula, //@@@: formula,
        image, //@@@: image,
        chart, //@@@: chart,
UNKNOWN >>         lineLabel //@@@: lineLabel
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
