namespace CSReportEditor {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import ListView = CSForms.ListView;
    import cColumnsInfo = CSReportEngine.cColumnsInfo;

    export class FColumns extends Form {

        private el: HTMLElement;
        private dialog: Dialog;
        private lvColumns: ListView;

        private C_FIELDTYPE: string = "t";
        private C_INDEX: string = "i";

        private field: string = "";
        private fieldType: number = -1;
        private fieldIndex: number = -1;

        public constructor() {
            super();
            this.el = U.el('db-columns-dlg');
            this.dialog = new Dialog(this.el, 'db-columns-dlg-apply', 'db-columns-dlg-cancel');
            this.lvColumns = new ListView("lvColumns", U.el("db-columns-lv-columns"));
            this.lvColumns.state.onclick = P.call(this, this.lvColumnsClick);
            this.dialog.onApply = P.call(this, this.cmdApplyClick);
            super.setDialog(this.dialog);
        }

        public initDialog() {

        }

        private cmdApplyClick() {
            return true;
        }

        public clearColumns() {
            this.lvColumns.clear();
        }

        public fillColumns(dataSource: string, columns: cColumnsInfo, add: boolean) {
            cGlobals.fillColumns(dataSource,
                                 columns,
                                 this.lvColumns,
                                 this.C_INDEX,
                                 this.C_FIELDTYPE, add);
            /*
            // TODO: delete me
            columns.forEach(P.call(this, (_, column) => {
                var item = this.lvColumns.add(`{{{${dataSource}}}.{${column.getName()}}`);
                item.setImageIndex(0);
                let info = U.setInfoString("", this.C_INDEX, column.getPosition().toString());
                info = U.setInfoString(info, this.C_FIELDTYPE, column.getColumnType().toString());
                item.tag = info;
            }));
            */
        }

        public setField(field: string) {
            this.field = field;
            for(let i = 0; i < this.lvColumns.getItems().length; i++) {
                const item = this.lvColumns.getItems()[i];
                if(item.getText() === field) {
                    item.setSelected(true);
                    item.setFocused(true);
                    this.lvColumns.select();
                    break;
                }
            }
        }

        public getField() {
            return this.field;
        }

        public getFieldType() {
            return this.fieldType;
        }

        public getIndex() {
            return this.fieldIndex;
        }

        private lvColumnsClick() {
            if(this.lvColumns.selectedItems().length > 0) {
                let item = this.lvColumns.selectedItems()[0];
                this.field = item.getText();
                let info = item.tag.toString();
                this.fieldType = U.valInt(U.getInfoString(info, this.C_FIELDTYPE, "-1"));
                this.fieldIndex = U.valInt(U.getInfoString(info, this.C_INDEX, "-1"));
            }
        }

        showModal() {
            return this.dialog.show({title: 'Page Setup', height: 600, width: 500, overlay: true})
                        .then(P.call(this, (result)=> {
                            if(result) return {
                                                success: true,
                                                field: this.field,
                                                fieldType: this.fieldType,
                                                fieldIndex: this.fieldIndex
                                              };
                            else       return {
                                                success: false,
                                                field: null,
                                                fieldType: null,
                                                fieldIndex: null
                                              };
                        }));
        }

    }
}
