///<reference path="../../CSDrawing/Bitmap.ts"/>
///<reference path="Control.ts"/>

namespace CSForms {

    import Color = CSDrawing.Color;

    export class ProgressBar extends Control {

        private elProgressBar: HTMLDivElement;

        public constructor(el: HTMLDivElement = null) {
            super(el);
            this.elProgressBar = el;
        }

        setBackColor(backColor: string) {
            this.elProgressBar.style.backgroundColor = Color.colorFromNumber(backColor);
        }

        setText(text: string) {
            this.elProgressBar.textContent = text;
        }

        setValue(value: number) {
            this.elProgressBar.style.width = Math.floor(this.getWidth() * (value / 100)).toString() + "px";
        }

        setHeight(value: number) {
            super.setHeight(value);
            this.elProgressBar.style.height = this.getHeight().toString() + "px";
        }

    }
}