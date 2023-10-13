///<reference path="Control.ts"/>

namespace CSReportEditor {

    export class Button extends Control {

        setOnClick(f: ()=> void) {
            super.getElement().onclick = f;
        }
    }
}