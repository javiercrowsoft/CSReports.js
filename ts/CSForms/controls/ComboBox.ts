///<reference path="Control.ts"/>

namespace CSForms {

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
            if(optionToSelect) {
                optionToSelect.selected = true;
            }
            else {
                const optionSelected = options.find(item => item.selected === true);
                if(optionSelected) {
                    optionSelected.selected = false;
                }
            }
        }
    }
}