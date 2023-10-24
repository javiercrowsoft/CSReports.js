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
            super.setText(text);
        }

        setValue(value: number) {
            console.log('progress bar: ' + value);
        }

    }
}