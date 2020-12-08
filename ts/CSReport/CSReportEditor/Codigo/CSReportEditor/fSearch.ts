(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFSearch = function() {

        const self = {};
        let m_editor = null;

UNKNOWN >>         private enum csObjType {
            iTypeFormulaH = 1,
            iTypeFormulaV = 0,
            iTypeCtrl = 2,
            iTypeDbField = 3,
            iTypeSecG = 4,
            iTypeSec = 5,
            iTypeSecLn = 6,
            iTypeText = 7
        };


        const fSearch = function() {
            InitializeComponent();
        };

        self.clear = function() {
            lv_controls.Items.Clear();
        };

        const cmd_search_Click = function(sender, e) {
            if (tx_toSearch.Text.Trim() === "") {
                cWindow.msgInfo("You must input some text to search");
            }
            else  {
                let report = m_editor.getReport();
                searchInSections(report.getHeaders(), csObjType.iTypeSec);
                searchInSections(report.getGroupsHeaders(), csObjType.iTypeSecG);
                searchInSections(report.getDetails(), csObjType.iTypeSec);
                searchInSections(report.getGroupsFooters(), csObjType.iTypeSecG);
                searchInSections(report.getFooters(), csObjType.iTypeSec);
            }
        };

        const searchInSections = function(sections, objType) {
UNKNOWN >>             cReportSection sec;
UNKNOWN >>             cReportSectionLine secLn;
UNKNOWN >>             cReportControl ctrl;
UNKNOWN >>             string toSearch;

            toSearch = tx_toSearch.Text.ToLower();

            for(var i = 0; i < sections.count(); i++) {
                sec = sections.item(i);
                if (sec.getName().ToLower().IndexOf(toSearch) > -1) {
                    pAddToSearchResult(sec.getName(), objType, objType, "S" + sec.getKey());
                }
                if (sec.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1) {
                    pAddToSearchResult(sec.getName(), objType, csObjType.iTypeFormulaH, "S" + sec.getKey(), sec.getFormulaHide().getText());
                }
                for(var j = 0; j < sec.getSectionLines().count(); j++) {
                    secLn = sec.getSectionLines().item(j);
                    if (secLn.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1) {
                        pAddToSearchResult(sec.getName() + " - Line " + secLn.getIndex().ToString(),
                            csObjType.iTypeSecLn, csObjType.iTypeFormulaH, "S" + sec.getKey(), secLn.getFormulaHide().getText());
                    }
                    for(var t = 0; t < secLn.getControls().count(); t++) {
                        ctrl = secLn.getControls().item(t);
                        if (ctrl.getName().ToLower().IndexOf(toSearch) > -1) {
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeCtrl, ctrl.getKey());
                        }
                        if (ctrl.getControlType() === csRptControlType.CSRPTCTFIELD
                            || ctrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {
                            if (ctrl.getField().getName().ToLower().IndexOf(toSearch) > -1) {
                                pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeDbField, ctrl.getKey(), ctrl.getField().getName());
                            }
                        }
                        else {
                            if (ctrl.getLabel().getText().IndexOf(toSearch) > -1) {
                                pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeText, ctrl.getKey(), ctrl.getLabel().getText());
                            }
                        }
                        if (ctrl.getFormulaValue().getText().ToLower().IndexOf(toSearch) > -1) {
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaV, ctrl.getKey(), ctrl.getFormulaValue().getText());
                        }
                        if (ctrl.getFormulaHide().getText().ToLower().IndexOf(toSearch) > -1) {
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaH, ctrl.getKey(), ctrl.getFormulaHide().getText());
                        }
                    }
                }
            }
        };

        const pAddToSearchResult = function(name, objType, objType2, key) {
            pAddToSearchResult(name, objType, objType2, key, "");
        };

        const pAddToSearchResult = function(name, objType, objType2, key, where) {
            let item = lv_controls.Items.Add(name);
            item.ImageIndex = objType === objType2 ? (int)objType : (int)objType2;
            item.SubItems.Add(where);
            item.Tag = key;
        };

        self.setHandler = function(editor) {
            m_editor = editor;
        };

        const cmd_close_Click = function(sender, e) {
            this.Close();
        };

        const cmd_edit_Click = function(sender, e) {
            if (lv_controls.SelectedItems.Count > 0) {
                let info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.showProperties(info);
            }
        };

        const lv_controls_KeyUp = function(sender, e) {
            selectControl();
        };

        const lv_controls_MouseClick = function(sender, e) {
            selectControl();
        };

        const selectControl = function() {
            if (lv_controls.SelectedItems.Count > 0) {
                let info = lv_controls.SelectedItems[0].Tag.ToString();
                m_editor.selectCtrl(info);
            }
        };

        return self;

    }
}(globalObject));
