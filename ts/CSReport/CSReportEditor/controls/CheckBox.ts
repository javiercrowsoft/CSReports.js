///<reference path="Control.ts"/>

namespace CSReportEditor {

    export class CheckBox extends Control {
        
        private elInput: HTMLInputElement;

        public constructor(el: HTMLInputElement = null) {
            super(el);
            this.elInput = el;
        }

        setChecked(checked: boolean) {
            this.elInput.checked = checked;
        }
    }
}