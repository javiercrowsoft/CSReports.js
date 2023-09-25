///<reference path="Container.ts"/>

namespace CSReportEditor {

    export class TabPage extends Container<Control> {

        private tabSelector: HTMLElement;

        public constructor(name: string, el: HTMLElement) {
            super(el);
        }
        
        private tag: object;

        public setTabSelector(tabSelector: HTMLElement) {
            this.tabSelector = tabSelector;
        }

        public getTag() {
            return this.tag;
        }

        public setTag(tag: object) {
            this.tag = tag;
        }

        setText(text: string) {
            super.setText(text);
            if(this.tabSelector) {
                const textToChange = this.tabSelector.childNodes[0];
                textToChange.nodeValue = super.getText();
            }
        }
    }
}