///<reference path="Container.ts"/>

namespace CSForms {

    export class Panel extends Container<Control> {

        public constructor(name: string, el: HTMLElement) {
            super(el);
        }
    }
}