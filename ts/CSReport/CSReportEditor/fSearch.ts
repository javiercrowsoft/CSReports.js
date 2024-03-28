namespace CSReportEditor {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import cWindow = CSKernelClient.cWindow;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import TextBox = CSForms.TextBox;
    import ListView = CSForms.ListView;
    import cIReportGroupSections = CSReportEngine.cIReportGroupSections;
    import cReportSectionLine = CSReportEngine.cReportSectionLine;
    import cReportSection = CSReportEngine.cReportSection;
    import cReportControl = CSReportEngine.cReportControl;
    import csRptControlType = CSReportGlobals.csRptControlType;

    enum csObjType {
        iTypeFormulaH = 1,
        iTypeFormulaV = 0,
        iTypeCtrl = 2,
        iTypeDbField = 3,
        iTypeSecG = 4,
        iTypeSec = 5,
        iTypeSecLn = 6,
        iTypeText = 7
    }

    export class FSearch extends Form {

        private el: HTMLElement;
        private dialog: Dialog;

        private editor: cEditor = null;
        private txSearchText: TextBox;
        private lvControls: ListView;

        public constructor() {
            super();
            this.el = U.el('search-dlg');
            this.dialog = new Dialog(this.el, 'search-dlg-edit', 'search-dlg-close');
            this.dialog.onApply = P.call(this, this.cmdEditClick);
            this.txSearchText = new TextBox(U.inputEl("search-text"));
            this.txSearchText.setOnKeyDown(P.call(this, this.searchTextKeyDown));
            this.lvControls = new ListView("lvControls", U.el("search-lv-rows"));
            this.lvControls.createHeaders(['Name', 'Found in']);
            this.lvControls.state.onclick = P.call(this, this.lvControlsClick);
            super.setDialog(this.dialog);
        }

        private cmdEditClick() {
            return true;
        }

        show() {
            this.dialog.show({title: 'Columns', height: 600, width: 900, overlay: false});
        }


        public clear() {
            this.lvControls.clear();
        }

        public searchTextKeyDown(e: KeyboardEvent) {
            if(e.key === 'Enter') {
                this.clear();
                if(this.txSearchText.getText().trim() === "") {
                    cWindow.msgInfo("You must input some text to search");
                }
                else  {
                    const report = this.editor.getReport();
                    this.searchInSections(report.getHeaders(), csObjType.iTypeSec);
                    this.searchInSections(report.getGroupsHeaders(), csObjType.iTypeSecG);
                    this.searchInSections(report.getDetails(), csObjType.iTypeSec);
                    this.searchInSections(report.getGroupsFooters(), csObjType.iTypeSecG);
                    this.searchInSections(report.getFooters(), csObjType.iTypeSec);
                }
            }
        }

        private searchInSections(sections: cIReportGroupSections, objType: csObjType) {
            let sec: cReportSection;
            let secLn: cReportSectionLine;
            let ctrl: cReportControl;
            let toSearch: string;

            toSearch = this.txSearchText.getText().toLowerCase();

            for(let i = 0; i < sections.count(); i++) {
                sec = sections.item(i);
                if(sec.getName().toLowerCase().indexOf(toSearch) > -1) {
                    this.addToSearchResult(sec.getName(), objType, objType, "S" + sec.getKey());
                }
                if(sec.getFormulaHide().getText().toLowerCase().indexOf(toSearch) > -1) {
                    this.addToSearchResultAt(sec.getName(), objType, csObjType.iTypeFormulaH, "S" + sec.getKey(), sec.getFormulaHide().getText());
                }
                for(let j = 0; j < sec.getSectionLines().count(); j++) {
                    secLn = sec.getSectionLines().item(j);
                    if(secLn.getFormulaHide().getText().toLowerCase().indexOf(toSearch) > -1) {
                        this.addToSearchResultAt(sec.getName() + " - Line " + secLn.getIndex().toString(),
                            csObjType.iTypeSecLn, csObjType.iTypeFormulaH, "S" + sec.getKey(), secLn.getFormulaHide().getText());
                    }
                    for(var t = 0; t < secLn.getControls().count(); t++) {
                        ctrl = secLn.getControls().item(t);
                        if(ctrl.getName().toLowerCase().indexOf(toSearch) > -1) {
                            this.addToSearchResult(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeCtrl, ctrl.getKey());
                        }
                        if(ctrl.getControlType() === csRptControlType.RPT_CT_FIELD
                            || ctrl.getControlType() === csRptControlType.RPT_CT_DB_IMAGE) {
                            if(ctrl.getField().getName().toLowerCase().indexOf(toSearch) > -1) {
                                this.addToSearchResultAt(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeDbField, ctrl.getKey(), ctrl.getField().getName());
                            }
                        }
                        else {
                            if(ctrl.getLabel().getText().indexOf(toSearch) > -1) {
                                this.addToSearchResultAt(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeText, ctrl.getKey(), ctrl.getLabel().getText());
                            }
                        }
                        if(ctrl.getFormulaValue().getText().toLowerCase().indexOf(toSearch) > -1) {
                            this.addToSearchResultAt(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaV, ctrl.getKey(), ctrl.getFormulaValue().getText());
                        }
                        if(ctrl.getFormulaHide().getText().toLowerCase().indexOf(toSearch) > -1) {
                            this.addToSearchResultAt(ctrl.getName(), csObjType.iTypeCtrl, csObjType.iTypeFormulaH, ctrl.getKey(), ctrl.getFormulaHide().getText());
                        }
                    }
                }
            }
        }

        private addToSearchResult(name: string, objType: csObjType, objType2: csObjType, key: string) {
            this.addToSearchResultAt(name, objType, objType2, key, "");
        }

        private addToSearchResultAt(name: string, objType: csObjType, objType2: csObjType, key: string, where: string) {
            let item = this.lvControls.add(name);
            item.setImageIndex(objType === objType2 ? objType : objType2);
            item.subItems.add(where);
            item.tag = key;
        }

        public setHandler(editor: cEditor) {
            this.editor = editor;
        }

        private lvControlsClick(item) {
            this.selectControl(item);
        }

        private selectControl(item) {
            if(item) {
                let info = item.tag.toString();
                if(info.length && info.charAt(0) === 'S') {
                    this.editor.selectSection(info.substring(1));
                }
                else {
                    this.editor.selectCtrl(info);
                }
            }
        }
    }
}
