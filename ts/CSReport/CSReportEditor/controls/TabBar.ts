///<reference path="Container.ts"/>

namespace CSReportEditor {

    export class TabBar extends Container<TabPage> {

        public constructor(name: string, el: HTMLElement) {
            super(el);
        }

        public getPages() {
            return this.getControls();
        }
    }
}