///<reference path="Container.ts"/>

namespace CSForms {

    import cWindow = CSKernelClient.cWindow;

    export class TabPage extends Container<Control> {

        private text: string;
        private tabSelector: HTMLElement;
        public onClose: ()=> void;
        public onActive: ()=> void;

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

        showTab() {
            cWindow.clickElem(this.tabSelector);
            if(this.onActive !== null) {
                this.onActive();
            }
        }

        setText(text: string) {
            this.text = text;
            if(this.tabSelector) {
                const textToChange = this.tabSelector.childNodes[0];
                textToChange.nodeValue = this.text;
            }
        }

        getText() {
            return this.text;
        }

    }
}