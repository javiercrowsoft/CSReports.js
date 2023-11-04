///<reference path="Control.ts"/>

namespace CSForms {

    import Color = CSDrawing.Color;
    import P = CSKernelClient.Callable;

    export class ListState {
        onclick: (item: Item) => void;
        onDblclick: (item: Item) => void;
        activeItem: Item;
    }

    class Items {

        private body: HTMLTableSectionElement;
        private _items: Item[] = [];

        public state: ListState;

        // @ts-ignore
        public add(text: string, imageIndex: number = 0) {
            const tr = document.createElement('tr') as HTMLTableRowElement;
            let item = new Item(tr, this.state);
            item.setText(text);
            item.setImageIndex(imageIndex);
            this._items.push(item);
            this.body.appendChild(tr);
            return item;
        }

        public clear() {
            this._items = [];
        }

        getItems() {
            return this._items;
        }

        setBody(body: HTMLTableSectionElement) {
            this.body = body;
        }
    }

    export class Item {
        private text: string;
        private imageIndex: number;
        private foreColor: Color;
        private tr: HTMLTableRowElement;
        private td: HTMLTableCellElement;

        public tag: any;
        public subItems: SubItems;
        public state: ListState;

        public constructor(tr: HTMLTableRowElement, state: ListState) {
            this.state = state;
            this.subItems = new SubItems(this);
            this.subItems.state = state;
            this.tr = tr;
            const td = document.createElement('td') as HTMLTableCellElement;
            this.td = td;
            this.td.onclick = P.call(this, this.onclick);
            this.td.style.cursor = "pointer";
            this.tr.appendChild(td);
            this.subItems.setTr(tr);
        }

        onclick() {
            if(this.state.onclick) {
                this.state.onclick(this);
                this.tr.style.backgroundColor = "lightgreen";
                if(this.state.activeItem?.subItems?.getTr()) {
                    this.state.activeItem.subItems.getTr().style.backgroundColor = '';
                }
                this.state.activeItem = this;
            }
        }

        setText(text: string) {
            this.text = text;
            this.td.textContent = text;
        }

        getText() {
            return this.text;
        }

        setForeColor(color: Color) {
            this.foreColor = color;
        }

        setImageIndex(imageIndex: number) {
            this.imageIndex = imageIndex;
        }
    }

    class SubItems {

        private _subItems: SubItem[] = [];
        private tr: HTMLTableRowElement;

        private _item: Item;

        public state: ListState;

        public constructor(item: Item) {
            this._item = item;
        }

        public item(index: number) {
            return this._subItems[index-1];
        }

        // @ts-ignore
        public add(text: string) {
            const td = document.createElement('td') as HTMLTableCellElement;
            td.textContent = text;
            td.onclick = P.call(this, this.onclick);
            td.style.cursor = "pointer";
            this.tr.appendChild(td);

            let subItem = new SubItem(td);
            subItem.setText(text);
            this._subItems.push(subItem);
            return subItem;
        }

        onclick() {
            if(this.state.onclick) {
                this.state.onclick(this._item);
                this.tr.style.backgroundColor = "lightgreen";
                if(this.state.activeItem?.subItems?.getTr()) {
                    this.state.activeItem.subItems.getTr().style.backgroundColor = '';
                }
                this.state.activeItem = this._item;
            }
        }

        getItems() {
            return this._subItems;
        }

        setTr(tr: HTMLTableRowElement) {
            this.tr = tr;
        }

        getTr() {
            return this.tr;
        }
    }

    class SubItem {
        private text: string;
        tag: any;
        private foreColor: Color;
        private td: HTMLTableCellElement;

        public constructor(td: HTMLTableCellElement) {
            this.td = td;
        }

        getText() {
            return this.text;
        }

        setText(text: string) {
            this.text = text;
            this.td.textContent = text;
        }

        setForeColor(color: Color) {
            this.foreColor = color;
        }
    }

    export class ListView extends Control {

        private readonly div: HTMLDivElement;
        private table: HTMLTableElement;
        private _items: Items = new Items();
        private _selectedItems: Items = new Items();
        public readonly name: string;

        public state = new ListState();

        public constructor(name: string, el: HTMLElement) {
            super(el);

            this.name = name;

            this.div = el as HTMLDivElement;
            this.table = document.createElement('table') as HTMLTableElement;
            this.table.className = "fl-table";
            this.div.appendChild(this.table);
            this.table.createTHead();
            this._items.state = this.state;
            this._items.setBody(this.table.createTBody())
        }

        public clear() {
            this._items.clear();
            if(this.table.tBodies.length > 0) {
                const body = this.table.tBodies[0];
                while(body.firstChild) {
                    body.removeChild(body.firstChild);
                }
            }
        }

        getItems() {
            return this._items.getItems();
        }

        selectedItems() {
            return this._selectedItems.getItems();
        }

        add(text: string, imageIndex?: number) {
            return this._items.add(text, imageIndex)
        }

        sort() {

        }

        getMaxSubitemsSize() {
            let maxCols = 0;
            for(let i = 0; i < this._items.getItems().length; i++) {
                let size = this._items.getItems()[i].subItems.getItems().length;
                if(size > maxCols) maxCols = size;
            }
            return maxCols;
        }

        createHeaders(columns: string[]) {
            while(this.table.tHead.firstChild) {
                this.table.tHead.removeChild(this.table.tHead.firstChild);
            }
            for(let i = 0; i < columns.length; i++) {
                const thead = document.createElement('th') as HTMLTableCellElement;
                thead.textContent = columns[i];
                this.table.tHead.appendChild(thead)
            }
        }
    }
}