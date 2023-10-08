///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Color = CSReportPaint.Color;

    export class Label extends Control {
        
        private elLabel: HTMLLabelElement;

        public constructor(el: HTMLLabelElement = null) {
            super(el);
            this.elLabel = el;
        }

        setBackColor(backColor: string) {
            this.elLabel.style.backgroundColor = Color.colorFromNumber(backColor);
        }

        setText(text: string) {
            this.elLabel.textContent = text;
            super.setText(text);
        }
    }
}