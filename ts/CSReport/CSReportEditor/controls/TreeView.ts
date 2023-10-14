///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Map = CSOAPI.Map;
    import Color = CSReportPaint.Color;

    class Nodes extends Map<Node> {

        private folder: HTMLUListElement;

        private images = ['folder.png', 'property.png', 'formula.png', 'database.png']

        public constructor(folder: HTMLUListElement) {
            super(null, false);

            this.folder = folder;
        }

        // @ts-ignore
        public add(text: string, imageIndex: number = null, key = null) {
            const li = document.createElement('li');
            const a = this.addLabel(text, li, imageIndex);
            const node = new Node(li, imageIndex, a);
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
            super.baseClear();
        }

        private removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }
    }

    export class Node {

        private li: HTMLLIElement;
        private _items: Nodes = null;
        selectedImageIndex: number;
        imageIndex: number;
        tag: any;
        foreColor: string;
        backColor: string;

        public constructor(li: HTMLLIElement, imageIndex: number, a: HTMLAnchorElement) {
            this.li = li;
            this.imageIndex = imageIndex;
            const ul = document.createElement('ul') as HTMLUListElement;
            this.li.appendChild(ul);
            this._items = new Nodes(ul);
            a.href = "#";
            a.className = 'nostyle';
            a.onclick = ()=> {
                ul.style.display = ul.style.display === 'none' ? 'block' : 'none';
            };
        }

        getNodes() {
            return this._items;
        }

        expandAll() {

        }

        setText(text: string) {
            this.li.childNodes[1].textContent = text;
        }
    }

    export class TreeView extends Control {

        private readonly div: HTMLDivElement;
        private rootUl: HTMLUListElement;
        private _items: Nodes = null;
        private _selectedNode: Node;
        private _text: string;
        public readonly name: string;

        public constructor(name: string, el: HTMLElement, text: string) {
            super(el);

            this.name = name;

            this.div = el as HTMLDivElement;
            this.rootUl = document.createElement('ul') as HTMLUListElement;
            this.rootUl.className = "tree";
            this._text = text;
            this.addLabel(text);
            this.div.appendChild(this.rootUl);
            this._items = new Nodes(this.rootUl);
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