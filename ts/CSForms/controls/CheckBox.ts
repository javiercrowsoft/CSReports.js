///<reference path="Control.ts"/>

namespace CSForms {

    export class CheckBox extends Control {
        private elInput: HTMLInputElement;

        public constructor(el: HTMLInputElement = null) {
            super(el);
            this.elInput = el;
        }

        setChecked(checked: boolean) {
            this.elInput.checked = checked;
        }

        getChecked(): boolean {
            return this.elInput.checked;
        }

    }
}