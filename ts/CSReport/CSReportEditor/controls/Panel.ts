///<reference path="Container.ts"/>

namespace CSReportEditor {

    export class Panel extends Container<Control> {

        public constructor(name: string, el: HTMLElement) {
            super(el);
        }
        
        isVisible() {
            return false;
        }
    }
}