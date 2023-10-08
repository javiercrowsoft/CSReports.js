///<reference path="Control.ts"/>

namespace CSReportEditor {

    export class ComboBox extends Control {

        private elSelect: HTMLSelectElement;

        public constructor(el: HTMLSelectElement = null) {
            super(el);
            this.elSelect = el;
        }
    }
}