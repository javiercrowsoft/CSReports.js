namespace CSReports.CSReportEditor {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import ListView = CSForms.ListView;

    export class FConnectsAux extends Form {

        private el: HTMLElement;
        private dialog: Dialog;
        private lvConnections: ListView;

        public constructor() {
            super();
            this.el = U.el('connect-aux-dlg');
            this.dialog = new Dialog(this.el, 'connect-aux-dlg-apply');
            this.lvConnections = new ListView("lvConnections", U.el("connect-aux-lv-connections"));
            this.dialog.onApply = P.call(this, this.cmdApplyClick);
            super.setDialog(this.dialog);
        }

        private cmdApplyClick() {
            return true;
        }

        public clear() {
            this.lvConnections.clear();
            this.lvConnections.createHeaders(['Data Source', 'Str Connect']);
        }

        public addConnect(dataSource: string, strConnect: string) {
            var item = this.lvConnections.add(dataSource);
            item.subItems.add(strConnect);
		}

        public removeConnect(dataSource: string) {
            for(let i = 0; i < this.lvConnections.getItems().length; i++) {
                if(this.lvConnections.getItems()[i].getText() === dataSource) {
                    this.lvConnections.remove(i);
                    break;
                }
            }
		}

        public getSelectedDataSource() {
            let dataSource: string = null;
            if(this.lvConnections.selectedItems().length > 0) {
                dataSource = this.lvConnections.selectedItems()[0].getText();
            }
            return dataSource;
        }

        showModal() {
            return this.dialog.show({title: 'Connections', height: 600, width: 1200, overlay: true})
                        .then(P.call(this, (result)=> {
                            if(result) return {
                                                success: true
                                              };
                            else       return {
                                                success: false
                                              };
                        }));
        }
    }
}
