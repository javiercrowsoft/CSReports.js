namespace CSReportEditor {

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
            this.el = U.el('db-columns-dlg');
            this.dialog = new Dialog(this.el, 'db-columns-dlg-apply', 'db-columns-dlg-cancel');
            this.lvConnections = new ListView("lvColumns", U.el("db-columns-lv-columns"));
            this.lvConnections.state.onclick = P.call(this, this.lvConnectionsClick);
            this.dialog.onApply = P.call(this, this.cmdApplyClick);
            super.setDialog(this.dialog);
        }

        private cmdApplyClick() {
            return true;
        }

        public clear() {
            this.lvConnections.clear();
        }

		public addConnect(str: string, str2: string) {

		}

        private lvConnectionsClick() {
            if(this.lvConnections.selectedItems().length > 0) {
                let item = this.lvConnections.selectedItems()[0];

            }
        }

        showModal() {
            return this.dialog.show({title: 'Columns', height: 600, width: 500, overlay: true})
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
