///<reference path="Container.ts"/>

namespace CSReportEditor {

    export class TabPage extends Container<Control> {

        public constructor(name: string, el: HTMLElement) {
            super(el);
        }
        
        private tag: object;

        public getTag() {
            return this.tag;
        }

        public setTag(tag: object) {
            this.tag = tag;
        }

    }
}