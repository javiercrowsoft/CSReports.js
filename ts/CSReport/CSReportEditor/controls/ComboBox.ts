///<reference path="Control.ts"/>

namespace CSReportEditor {

    export class ComboBox extends Control {

        private elSelect: HTMLSelectElement;

        public constructor(el: HTMLSelectElement = null) {
            super(el);
            this.elSelect = el;
        }

        setText(text: string) {
            this.changeSelected(text);
            super.setText(text);
        }

        changeSelected(text: string) {
            const options = Array.from(this.elSelect.options);
            const optionToSelect = options.find(item => item.text === text);
            optionToSelect.selected = true;
        }
    }
}