///<reference path="../../CSForms/controls/TextBox.ts"/>

namespace CSConnect {

    import U = CSOAPI.Utils;
    import P = CSKernelClient.Callable;
    import Form = CSForms.Form;
    import Dialog = CSForms.Dialog;
    import TextBox = CSForms.TextBox;
    import Param = CSDatabase.Param;

    export class fParameters extends Form {

        private el: HTMLElement;
        private dialog: Dialog;

        private parameters: Param[];
        private paramInputs: HTMLInputElement[];

        public constructor() {
            super();
            this.el = U.el('params-dlg');
            this.dialog = new Dialog(this.el, 'params-dlg-apply', 'params-dlg-cancel');
            this.dialog.onApply = P.call(this, this.cmdApplyClick);
            super.setDialog(this.dialog);
        }

        public initDialog(parameters: Param[]) {
            this.parameters = parameters;
            const container = U.divEl("params-params-section");
            while(container.firstChild) {
                container.removeChild(container.firstChild);
            }
            this.paramInputs = [];
            parameters.forEach(P.call(this, p => {
                const div = document.createElement('div');
                div.className = 'row';
                const div2 = document.createElement('div');
                div2.style.marginTop = '20px';
                const label = document.createElement('label') as HTMLLabelElement;
                label.textContent = p.name;
                div2.appendChild(label);
                const input = document.createElement('input') as HTMLInputElement;
                input.value = p.value || '';
                input.type = 'text';
                div2.appendChild(input);
                div.appendChild(div2);
                container.appendChild(div);
                this.paramInputs.push(input);
            }));
        }

        private cmdApplyClick() {
            for(let i = 0; i < this.paramInputs.length; i++) {
                this.parameters[i].value = this.paramInputs[i].value;
            }
            return true;
        }

        showModal() {

            return this.dialog.show({title: 'Connection Settings', height: 600, width: 500, overlay: true})
                        .then(P.call(this, (result)=> {
                            if(result) return {
                                                success: true,
                                                params: this.parameters
                                              };
                            else       return {
                                                success: false
                                              };
                        }));
        }

    }
}
