///<reference path="Control.ts"/>

namespace CSReportEditor {

    export class TextBox extends Control {

        private elInput: HTMLInputElement;

        public constructor(el: HTMLInputElement = null) {
            super(el);
            this.elInput = el;
        }

        setText(text: string) {
            this.elInput.value = text;
            super.setText(text);
        }

        getSelectionStart() {
            return this.elInput.selectionStart;
        }

    }
}