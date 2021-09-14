///<reference path="Container.ts"/>

namespace CSReportEditor {

    export class TabBar extends Container<TabPage> {

        public getPages() {
            return this.getControls();
        }
    }
}