///<reference path="Container.ts"/>

namespace CSForms {

    export class TabBar extends Container<TabPage> {

        private tabPages: TabPages;

        public constructor(name: string, el: HTMLElement) {
            super(el);
            this.tabPages = new TabPages(this);
        }

        public getPages(): TabPages {
            return this.tabPages;
        }
    }

    class TabPages {

        private tabBar: TabBar;
        private selectorFlags = new CSOAPI.Map<HTMLSpanElement>();

        public constructor(tabBar: TabBar) {
            this.tabBar = tabBar;
        }

        public hideAll() {
            for(let i = 0; i < this.tabBar.getControls().count(); i++) {
                this.tabBar.getControls().item(i).getElement().style.display = 'none';
                this.selectorFlags.item(i).style.display = 'none';
            }
        }

        public add(tabPage: TabPage, key?: string): TabPage {
            // add tab control to tab bar
            const tabSelectorNode = document.createElement('button');
            tabSelectorNode.className = "tablinks";
            tabSelectorNode.onclick = (event) => {
                this.hideAll();
                // console.log("open " + tabPage.getText());
                tabPage.getElement().style.display = 'block';
                tabPage.getSelectedFlag().style.display = 'block';
                // event.stopPropagation();
                // @ts-ignore
                if(event.raisedByCode === undefined) tabPage.showTab();
            };
            tabSelectorNode.innerText = tabPage.getText();
            const tabCloseNode = document.createElement('span');
            tabCloseNode.className = "close";
            tabCloseNode.onclick = (event) => {
                // console.log("close " + tabPage.getText());
                tabPage.getElement().style.display = 'none';
                tabSelectorNode.parentNode.removeChild(tabSelectorNode);
                // event.stopPropagation();
                if(tabPage.onClose) tabPage.onClose();
                this.tabBar.getControls().removeByObject(tabPage);
                this.selectorFlags.removeByObject(tabPage.getSelectedFlag());
                if(this.tabBar.getControls().size() > 0) {
                    const nextTab = this.tabBar.getControls().item(0) as TabPage;
                    nextTab.showTab();
                }
                else {
                    CSReportEditor.cMainEditor.setDocActive(null);
                }
            };
            tabCloseNode.innerText = "x";
            tabSelectorNode.appendChild(tabCloseNode);
            const div = document.createElement('div');
            div.appendChild(tabSelectorNode);
            div.style.padding = "0";
            const span = document.createElement('span');
            span.style.backgroundColor = "#92e1a3";
            span.style.widows = "100%";
            span.style.height = "2px";
            span.style.display = "block";
            span.style.position = "relative";
            span.style.top = "44px";
            this.selectorFlags.add(span);
            div.appendChild(span);
            this.tabBar.getElement().appendChild(div);
            tabPage.setTabSelector(tabSelectorNode);
            tabPage.setSelectedFlag(span);

            // add tab page to tab bar parent
            this.tabBar.getElement().parentNode.appendChild(tabPage.getElement());

            // show this tab
            this.hideAll();
            tabPage.getElement().style.display = 'block';

            return this.tabBar.getControls().add(tabPage, key);
        }
    }
}