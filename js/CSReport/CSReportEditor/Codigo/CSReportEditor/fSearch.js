(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFSearch = function() {

        const self = {}; //@@@: public partial class fSearch : Form
        let m_editor = null; //@@@: private cEditor m_editor = null;

UNKNOWN >>         private enum csObjType { //@@@: private enum csObjType {
            iTypeFormulaH = 1, //@@@: iTypeFormulaH = 1,
            iTypeFormulaV = 0, //@@@: iTypeFormulaV = 0,
            iTypeCtrl = 2, //@@@: iTypeCtrl = 2,
            iTypeDbField = 3, //@@@: iTypeDbField = 3,
            iTypeSecG = 4, //@@@: iTypeSecG = 4,
            iTypeSec = 5, //@@@: iTypeSec = 5,
            iTypeSecLn = 6, //@@@: iTypeSecLn = 6,
            iTypeText = 7 //@@@: iTypeText = 7
        }; //@@@: }


        const fSearch = function() { //@@@: public fSearch()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.clear = function() { //@@@: public void clear()
            lv_controls.Items.Clear(); //@@@: lv_controls.Items.Clear();
        }; //@@@: }

        const cmd_search_Click = function(sender, e) { //@@@: private void cmd_search_Click(object sender, EventArgs e)
            if (tx_toSearch.Text.Trim() === "") { //@@@: if (tx_toSearch.Text.Trim() == "")
                cWindow.msgInfo("You must input some text to search"); //@@@: cWindow.msgInfo("You must input some text to search");
            } //@@@: }
            else  { //@@@: else
                let report = m_editor.getReport(); //@@@: cReport report = m_editor.getReport();
                searchInSections(report.getHeaders(), csObjType.iTypeSec); //@@@: searchInSections(report.getHeaders(), csObjType.iTypeSec);
                searchInSections(report.getGroupsHeaders(), csObjType.iTypeSecG); //@@@: searchInSections(report.getGroupsHeaders(), csObjType.iTypeSecG);
                searchInSections(report.getDetails(), csObjType.iTypeSec); //@@@: searchInSections(report.getDetails(), csObjType.iTypeSec);
                searchInSections(report.getGroupsFooters(), csObjType.iTypeSecG); //@@@: searchInSections(report.getGroupsFooters(), csObjType.iTypeSecG);
                searchInSections(report.getFooters(), csObjType.iTypeSec); //@@@: searchInSections(report.getFooters(), csObjType.iTypeSec);
            } //@@@: }
        }; //@@@: }

        const searchInSections = function(sections, objType) { //@@@: private void searchInSections(cIReportGroupSections sections, csObjType objType)
UNKNOWN >>             cReportSection sec; //@@@: cReportSection sec;
UNKNOWN >>             cReportSectionLine secLn; //@@@: cReportSectionLine secLn;
UNKNOWN >>             cReportControl ctrl; //@@@: cReportControl ctrl;
UNKNOWN >>             string toSearch; //@@@: string toSearch;

            toSearch = tx_toSearch.Text.ToLower(); //@@@: toSearch = tx_toSearch.Text.ToLower();

            for(var i = 0; i < sections.count(); i++) { //@@@: for (int i = 0; i < sections.count(); i++)
                sec = sections.item(i); //@@@: sec = sections.item(i);
                if (sec.getName().ToLower().IndexOf(toSearch) > -1) { //@@@: if (sec.getName().ToLower().IndexOf(toSearch) > -1)
                    pAddToSearchResult(sec.getName(), objType, objType, "S" + sec.getKey()); //@@@: pAddToSearchResult(sec.getName(), objType, objType, "S" + sec.getKey());
                } //@@@: }
                if (sec.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1) { //@@@: if (sec.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1)
                    pAddToSearchResult(sec.getName(), objType, csObjType.iTypeFormulaH, "S" + sec.getKey(), sec.getFormulaHide().getText()); //@@@: pAddToSearchResult(sec.getName(), objType, csObjType.iTypeFormulaH, "S" + sec.getKey(), sec.getFormulaHide().getText());
                } //@@@: }
                for(var j = 0; j < sec.getSectionLines().count(); j++) { //@@@: for (int j = 0; j < sec.getSectionLines().count(); j++)
                    secLn = sec.getSectionLines().item(j); //@@@: secLn = sec.getSectionLines().item(j);
                    if (secLn.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1) { //@@@: if (secLn.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1)
                        pAddToSearchResult(sec.getName() + " - Line " + secLn.getIndex().ToString(), //@@@: pAddToSearchResult(sec.getName() + " - Line " + secLn.getIndex().ToString(),
                            csObjType.iTypeSecLn, csObjType.iTypeFormulaH, "S" + sec.getKey(), secLn.getFormulaHide().getText()); //@@@: csObjType.iTypeSecLn, csObjType.iTypeFormulaH, "S" + sec.getKey(), secLn.getFormulaHide().getText());
                    } //@@@: }
                    for(var t = 0; t < secLn.getControls().count(); t++) { //@@@: for (int t = 0; t < secLn.getControls().count(); t++)
                        ctrl = secLn.getControls().item(t); //@@@: ctrl = secLn.getControls().item(t);
                        if (ctrl.getName().ToLower().IndexOf(toSearch) > -1) { //@@@: if (ctrl.getName().ToLower().IndexOf(toSearch) > -1)
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeCtrl, ctrl.getKey()); //@@@: pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeCtrl, ctrl.getKey());
                        } //@@@: }
                        if (ctrl.getControlType() === csRptControlType.CSRPTCTFIELD //@@@: if (ctrl.getControlType() == csRptControlType.CSRPTCTFIELD
                            || ctrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) { //@@@: || ctrl.getControlType() == csRptControlType.CSRPTCTDBIMAGE)
                            if (ctrl.getField().getName().ToLower().IndexOf(toSearch) > -1) { //@@@: if (ctrl.getField().getName().ToLower().IndexOf(toSearch) > -1)
                                pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeDbField, ctrl.getKey(), ctrl.getField().getName()); //@@@: pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeDbField, ctrl.getKey(), ctrl.getField().getName());
                            } //@@@: }
                        } //@@@: }
                        else { //@@@: else
                            if (ctrl.getLabel().getText().IndexOf(toSearch) > -1) { //@@@: if (ctrl.getLabel().getText().IndexOf(toSearch) > -1)
                                pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeText, ctrl.getKey(), ctrl.getLabel().getText()); //@@@: pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeText, ctrl.getKey(), ctrl.getLabel().getText());
                            } //@@@: }
                        } //@@@: }
                        if (ctrl.getFormulaValue().getText().ToLower().IndexOf(toSearch) > -1) { //@@@: if (ctrl.getFormulaValue().getText().ToLower().IndexOf(toSearch) > -1)
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaV, ctrl.getKey(), ctrl.getFormulaValue().getText()); //@@@: pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaV, ctrl.getKey(), ctrl.getFormulaValue().getText());
                        } //@@@: }
                        if (ctrl.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1) { //@@@: if (ctrl.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1)
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaH, ctrl.getKey(), ctrl.getFormulaHide().getText()); //@@@: pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaH, ctrl.getKey(), ctrl.getFormulaHide().getText());
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pAddToSearchResult = function(name, objType, objType2, key) { //@@@: private void pAddToSearchResult(string name, csObjType objType, csObjType objType2, string key)
            pAddToSearchResult(name, objType, objType2, key, ""); //@@@: pAddToSearchResult(name, objType, objType2, key, "");
        }; //@@@: }

        const pAddToSearchResult = function(name, objType, objType2, key, where) { //@@@: private void pAddToSearchResult(string name, csObjType objType, csObjType objType2, string key, string where)
            let item = lv_controls.Items.Add(name); //@@@: var item = lv_controls.Items.Add(name);
            item.ImageIndex = objType === objType2 ? (int)objType : (int)objType2; //@@@: item.ImageIndex = objType == objType2 ? (int)objType : (int)objType2;
            item.SubItems.Add(where); //@@@: item.SubItems.Add(where);
            item.Tag = key; //@@@: item.Tag = key;
        }; //@@@: }

        self.setHandler = function(editor) { //@@@: public void setHandler(cEditor editor)
            m_editor = editor; //@@@: m_editor = editor;
        }; //@@@: }

        const cmd_close_Click = function(sender, e) { //@@@: private void cmd_close_Click(object sender, EventArgs e)
            this.Close(); //@@@: this.Close();
        }; //@@@: }

        const cmd_edit_Click = function(sender, e) { //@@@: private void cmd_edit_Click(object sender, EventArgs e)
            if (lv_controls.SelectedItems.Count > 0) { //@@@: if (lv_controls.SelectedItems.Count > 0)
                let info = lv_controls.SelectedItems[0].Tag.ToString(); //@@@: var info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.showProperties(info); //@@@: m_editor.showProperties(info);
            } //@@@: }
        }; //@@@: }

        const lv_controls_KeyUp = function(sender, e) { //@@@: private void lv_controls_KeyUp(object sender, KeyEventArgs e)
            selectControl(); //@@@: selectControl();
        }; //@@@: }

        const lv_controls_MouseClick = function(sender, e) { //@@@: private void lv_controls_MouseClick(object sender, MouseEventArgs e)
            selectControl(); //@@@: selectControl();
        }; //@@@: }

        const selectControl = function() { //@@@: private void selectControl()
            if (lv_controls.SelectedItems.Count > 0) { //@@@: if (lv_controls.SelectedItems.Count > 0)
                let info = lv_controls.SelectedItems[0].Tag.ToString(); //@@@: var info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.selectCtrl(info); //@@@: m_editor.selectCtrl(info);
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
