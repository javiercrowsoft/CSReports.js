///<reference path="Container.ts"/>

namespace CSReportEditor {

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

        public constructor(tabBar: TabBar) {
            this.tabBar = tabBar;
        }

        public hideAll() {
            for(let i = 0; i < this.tabBar.getControls().count(); i++) {
                this.tabBar.getControls().item(i).getElement().style.display = 'none';
            }
        }

        public add(tabPage: TabPage, key?: string): TabPage {
            // add tab control to tab bar
            const tabSelectorNode = document.createElement('button');
            tabSelectorNode.className = "tablinks";
            tabSelectorNode.onclick = (event) => { 
                this.hideAll();
                console.log("open " + tabPage.getText()); 
                tabPage.getElement().style.display = 'block';
                event.stopPropagation();
            };
            tabSelectorNode.innerText = tabPage.getText();
            const tabCloseNode = document.createElement('span');
            tabCloseNode.className = "close";
            tabCloseNode.onclick = (event) => { 
                console.log("close " + tabPage.getText()); 
                tabPage.getElement().style.display = 'none';
                event.stopPropagation();
            };
            tabCloseNode.innerText = "x";
            tabSelectorNode.appendChild(tabCloseNode);
            this.tabBar.getElement().appendChild(tabSelectorNode);
            tabPage.setTabSelector(tabSelectorNode);

            // add tab page to tab bar parent
            this.tabBar.getElement().parentNode.appendChild(tabPage.getElement());

            // show this tab
            this.hideAll();
            tabPage.getElement().style.display = 'block';

            return this.tabBar.getControls().add(tabPage, key);            
        }
    }
}