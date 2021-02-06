

namespace CSReportEditor
{
    export class fSearch {


    {
        private editor: cEditor = null;

UNKNOWN >>         private enum csObjType {
            iTypeFormulaH = 1,
            iTypeFormulaV = 0,
            iTypeCtrl = 2,
            iTypeDbField = 3,
            iTypeSecG = 4,
            iTypeSec = 5,
            iTypeSecLn = 6,
            iTypeText = 7
        }


        public constructor() {
            InitializeComponent();
        }

        public clear() {
            lv_controls.Items.Clear();
        }

        private cmd_search_Click(sender: object, e: EventArgs) {
            if (tx_toSearch.Text.Trim() === "") {
                cWindow.msgInfo("You must input some text to search");
            }
            else  {
                let report: cReport = this.editor.getReport();
                searchInSections(report.getHeaders(), csObjType.iTypeSec);
                searchInSections(report.getGroupsHeaders(), csObjType.iTypeSecG);
                searchInSections(report.getDetails(), csObjType.iTypeSec);
                searchInSections(report.getGroupsFooters(), csObjType.iTypeSecG);
                searchInSections(report.getFooters(), csObjType.iTypeSec);
            }
        }

        private searchInSections(sections: cIReportGroupSections, objType: csObjType) {
UNKNOWN >>             cReportSection sec;
UNKNOWN >>             cReportSectionLine secLn;
UNKNOWN >>             cReportControl ctrl;
UNKNOWN >>             string toSearch;

            toSearch = tx_toSearch.Text.toLowerCase();

            for(var i = 0; i < sections.count(); i++) {
                sec = sections.item(i);
                if (sec.getName().toLowerCase().IndexOf(toSearch) > -1) {
                    pAddToSearchResult(sec.getName(), objType, objType, "S" + sec.getKey());
                }
                if (sec.getFormulaHide().getText().toLowerCase().IndexOf(toSearch) > -1) {
                    pAddToSearchResult(sec.getName(), objType, csObjType.iTypeFormulaH, "S" + sec.getKey(), sec.getFormulaHide().getText());
                }
                for(var j = 0; j < sec.getSectionLines().count(); j++) {
                    secLn = sec.getSectionLines().item(j);
                    if (secLn.getFormulaHide().getText().toLowerCase().IndexOf(toSearch) > -1) {
                        pAddToSearchResult(sec.getName() + " - Line " + secLn.getIndex().toString(),
                            csObjType.iTypeSecLn, csObjType.iTypeFormulaH, "S" + sec.getKey(), secLn.getFormulaHide().getText());
                    }
                    for(var t = 0; t < secLn.getControls().count(); t++) {
                        ctrl = secLn.getControls().item(t);
                        if (ctrl.getName().toLowerCase().IndexOf(toSearch) > -1) {
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeCtrl, ctrl.getKey());
                        }
                        if (ctrl.getControlType() === csRptControlType.CSRPTCTFIELD
                            || ctrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {
                            if (ctrl.getField().getName().toLowerCase().IndexOf(toSearch) > -1) {
                                pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeDbField, ctrl.getKey(), ctrl.getField().getName());
                            }
                        }
                        else {
                            if (ctrl.getLabel().getText().IndexOf(toSearch) > -1) {
                                pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeText, ctrl.getKey(), ctrl.getLabel().getText());
                            }
                        }
                        if (ctrl.getFormulaValue().getText().toLowerCase().IndexOf(toSearch) > -1) {
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaV, ctrl.getKey(), ctrl.getFormulaValue().getText());
                        }
                        if (ctrl.getFormulaHide().getText().toLowerCase().IndexOf(toSearch) > -1) {
                            pAddToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaH, ctrl.getKey(), ctrl.getFormulaHide().getText());
                        }
                    }
                }
            }
        }

        private pAddToSearchResult(name: string, objType: csObjType, objType2: csObjType, key: string) {
            pAddToSearchResult(name, objType, objType2, key, "");
        }

        private pAddToSearchResult(name: string, objType: csObjType, objType2: csObjType, key: string, where: string) {
            let item: var = lv_controls.Items.Add(name);
            item.ImageIndex = objType === objType2 ? (int)objType : (int)objType2;
            item.SubItems.Add(where);
            item.Tag = key;
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private cmd_close_Click(sender: object, e: EventArgs) {
            this.Close();
        }

        private cmd_edit_Click(sender: object, e: EventArgs) {
            if (lv_controls.SelectedItems.Count > 0) {
                let info: var = lv_controls.SelectedItems[0].Tag.toString();
                this.editor.showProperties(info);
            }
        }

        private lv_controls_KeyUp(sender: object, e: KeyEventArgs) {
            selectControl();
        }

        private lv_controls_MouseClick(sender: object, e: MouseEventArgs) {
            selectControl();
        }

        private selectControl() {
            if (lv_controls.SelectedItems.Count > 0) {
                let info: var = lv_controls.SelectedItems[0].Tag.toString();
                this.editor.selectCtrl(info);
            }
        }



    }    }
}
