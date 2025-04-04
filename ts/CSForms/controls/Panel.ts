///<reference path="Container.ts"/>

namespace CSReports.CSForms {

    export class Panel extends Container<Control> {

        public constructor(name: string, el: HTMLElement) {
            super(el);
        }
    }
}