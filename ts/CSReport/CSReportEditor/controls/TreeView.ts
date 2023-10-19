///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Map = CSOAPI.Map;
    import P = CSKernelClient.Callable;
    import Color = CSReportPaint.Color;

    class TreeState {
        onclick: (node: Node) => void;
        onDblclick: (node: Node) => void;
        activeNode: Node;
    }

    class Nodes extends Map<Node> {

        private folder: HTMLUListElement;
        private images = ['folder.png', 'property.png', 'formula.png', 'database.png']

        public state: TreeState;

        public constructor(folder: HTMLUListElement, state: TreeState) {
            super(null, false);
            this.folder = folder;
            this.state = state;
        }

        // @ts-ignore
        public add(text: string, imageIndex: number = null, key = null) {
            const li = document.createElement('li');
            const a = this.addLabel(text, li, imageIndex);
            this.folder.parentElement.classList.add('expanded');
            const node = new Node(li, imageIndex, a, this.state);
            return this.baseAdd(node, key);
        }

        private addLabel(text: string, li: HTMLLIElement, imageIndex: number) {
            const img = document.createElement('img') as HTMLImageElement;
            img.src = './images/tree/' + this.images[imageIndex];
            li.appendChild(img)
            const a = document.createElement('a') as HTMLAnchorElement;
            a.innerText = text;
            li.appendChild(a);
            this.folder.appendChild(li);
            return a;
        }

        public clear(): void {
            this.removeAllChildNodes(this.folder);
            this.folder.parentElement.classList.remove('expanded', 'collapsed');
            super.baseClear();
        }

        private removeAllChildNodes(parent: HTMLUListElement) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }

    export class Node {

        private li: HTMLLIElement;
        private a: HTMLAnchorElement;
        private _items: Nodes = null;
        selectedImageIndex: number;
        imageIndex: number;
        tag: any;
        foreColor: string;
        backColor: string;

        private state: TreeState;

        public constructor(li: HTMLLIElement, imageIndex: number, a: HTMLAnchorElement, state: TreeState) {
            this.state = state;
            this.li = li;
            this.imageIndex = imageIndex;
            const ul = document.createElement('ul') as HTMLUListElement;
            ul.style.display = 'block';
            this.li.appendChild(ul);
            this._items = new Nodes(ul, state);
            this.a = a;
            a.href = "#";
            a.className = 'nostyle';
            a.onclick = P.call(this, (ev: MouseEvent) => {
                ev.stopPropagation();
                this.focus(ev);
            });
            li.onclick = (ev: MouseEvent)=> {
                if(ev.target === li && ul.childNodes.length > 0) {
                    ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
                    li.classList.toggle("collapsed");
                    ev.stopPropagation();
                    this.focus(ev);
                }
            };
        }

        private deactivate() {
            this.a.classList.remove('active');
        }

        getNodes() {
            return this._items;
        }

        expandAll() {

        }

        setText(text: string) {
            this.li.childNodes[1].textContent = text;
        }

        focus(event: MouseEvent) {
            if(this.state.activeNode) {
                this.state.activeNode.deactivate();
            }
            this.state.activeNode = this;
            this.a.classList.add('active');
            switch(true) {
                case event.detail === 0:
                case event.detail === 1:
                    if(this.state.onclick) {
                        this.state.onclick.call(null, this);
                    }
                    break;
                case event.detail === 2:
                    if(this.state.onDblclick) {
                        this.state.onDblclick.call(null, this);
                    }
                    break;
            }
        }

        getPrevious() {
            let prev = this.li.previousElementSibling;
            if(prev === null) prev = this.li.parentElement.parentElement;
            return prev;
        }

        getNext() {
            let next: HTMLLIElement;
            // is expanded select first child
            //
            let ul = this.li.children.item(2) as HTMLUListElement;
            if(ul.style.display === 'block' && ul.childElementCount > 0) {
                next = ul.children.item(0) as HTMLLIElement;
            }
            else {
                next = this.li.nextElementSibling as HTMLLIElement;
            }
            return next;
        }

    }

    export class TreeView extends Control {

        private readonly div: HTMLDivElement;
        private rootUl: HTMLUListElement;
        private _items: Nodes = null;
        private _selectedNode: Node;
        private _text: string;
        public readonly name: string;

        public state: TreeState;

        public constructor(name: string, el: HTMLElement, text: string) {
            super(el);

            el.tabIndex = 0;
            el.onkeydown = P.call(this, this.onKeyDown)
            el.onkeyup = P.call(this, this.onKeyUp)

            this.name = name;

            this.state = new TreeState();

            this.div = el as HTMLDivElement;
            this.rootUl = document.createElement('ul') as HTMLUListElement;
            this.rootUl.className = "tree";
            this._text = text;
            this.addLabel(text);
            this.div.appendChild(this.rootUl);
            this._items = new Nodes(this.rootUl, this.state);
        }

        private onKeyDown(event: KeyboardEvent) {
            switch(true) {
                case event.key === 'ArrowUp':
                case event.key === 'ArrowDown':
                    event.stopPropagation();
                    event.preventDefault();
                    break;
            }
        }

        private onKeyUp(event: KeyboardEvent) {
            let el: Element;
            switch(true) {
                case event.key === 'ArrowUp':
                    el = this.state.activeNode.getPrevious();
                    event.stopPropagation();
                    break;
                case event.key === 'ArrowDown':
                    el = this.state.activeNode.getNext();
                    event.stopPropagation();
                    break;
            }
            if(el instanceof HTMLLIElement) {
                ((el as HTMLLIElement).children.item(1) as HTMLLIElement).click();
            }
        }

        private addLabel(text: string) {
            const img = document.createElement('img') as HTMLImageElement;
            img.src = './images/tree/folder.png';
            this.rootUl.appendChild(img)
            const a = document.createElement('a') as HTMLAnchorElement;
            a.innerText = text;
            this.rootUl.appendChild(a);
        }

        getNodes() {
            return this._items;
        }

        selectedNode() {
            return this._selectedNode;
        }

        public clear(): void {
            this.getNodes().clear()
            this.addLabel(this._text);
        }
    }

    export enum TreeViewAction {
        Collapse,
        Expand
    }
}