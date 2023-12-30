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

        private dataSource: DataSource = null;

        public constructor() {
            super();
            this.el = U.el('datasource-dlg');
            this.dialog = new Dialog(this.el, 'datasource-dlg-apply', 'datasource-dlg-cancel');
            this.lvColumns = new ListView("lvColumns", U.el("datasource-lv-datasources"));
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

        public setDataSource(dataSource: DataSource) {
            this.dataSource = dataSource;
            for(let i = 0; i < this.lvColumns.getItems().length; i++) {
                const item = this.lvColumns.getItems()[i];
                if((item.tag as DataSource).getId() === dataSource.getId()) {
                    item.setSelected(true);
                    item.setFocused(true);
                    this.lvColumns.select();
                    break;
                }
            }
        }

        public getDataSource() {
            return this.dataSource;
        }

        private lvColumnsClick() {
            if(this.lvColumns.selectedItems().length > 0) {
                let item = this.lvColumns.selectedItems()[0];
                this.dataSource = item.tag;
            }
        }

        showModal(dataSources: DataSource[]) {
            for(let i = 0; i < dataSources.length; i++) {
                const item = this.lvColumns.add(dataSources[i].name);
                item.subItems.add(dataSources[i].getParamsInfo());
                item.tag = dataSources[i];
            }

            return this.dialog.show({title: 'Data Sources', height: 600, width: 500, overlay: true})
                        .then(P.call(this, (result)=> {
                            if(result) return {
                                                success: true,
                                                dataSource: this.dataSource
                                              };
                            else       return {
                                                success: false,
                                                dataSource: null
                                              };
                        }));
        }

    }
}
