///<reference path="../../CSForms/controls/ListView.ts"/>

namespace CSDatabase {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import ListView = CSForms.ListView;

    export class FormDataSources extends Form {

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
            this.el = U.el('datasource-dlg');
            this.dialog = new Dialog(this.el, 'datasource-dlg-apply', 'datasource-dlg-cancel');
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

        showModal(dataSources: DataSource[]) {

            for(let i = 0; i < dataSources.length; i++) {
                this.lvColumns.add(dataSources[0].name);
            }

            return this.dialog.show({title: 'Data Sources', height: 600, width: 500, overlay: true})
                        .then(P.call(this, (result)=> {
                            if(result) return {
                                                success: true,
                                                dataSource: this.field
                                              };
                            else       return {
                                                success: false,
                                                dataSource: null
                                              };
                        }));
        }

    }
}
