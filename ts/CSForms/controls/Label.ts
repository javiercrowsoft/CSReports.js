///<reference path="../../CSDrawing/Bitmap.ts"/>
///<reference path="Control.ts"/>

namespace CSForms {

    import Color = CSDrawing.Color;

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
        }

        getText() {
            return this.elLabel.textContent;
        }
    }
}