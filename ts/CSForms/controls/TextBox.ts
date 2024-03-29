///<reference path="Control.ts"/>

namespace CSForms {

    export class TextBox extends Control {

        private elInput: HTMLInputElement;

        public constructor(el: HTMLInputElement = null) {
            super(el);
            this.elInput = el;
        }

        setText(text: string) {
            this.elInput.value = text;
        }

        getSelectionStart() {
            return this.elInput.selectionStart;
        }

        getText() {
            return this.elInput.value;
        }


    }
}