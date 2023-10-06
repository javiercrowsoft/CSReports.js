///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Color = CSReportPaint.Color;

    class Items {
        private body: HTMLTableSectionElement;
        private _items: Item[] = [];

        // @ts-ignore
        public add(text: string, imageIndex: number = 0) {
            const tr = document.createElement('tr') as HTMLTableRowElement;
            let item = new Item(tr);
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

    class Item {        
        private text: string;
        private imageIndex: number;
        private foreColor: Color;
        tag: any;
        subItems: SubItems;
        private tr: HTMLTableRowElement;
        private td: HTMLTableCellElement;

        public constructor(tr: HTMLTableRowElement) {
            this.subItems = new SubItems();
            this.tr = tr;
            const td = document.createElement('td') as HTMLTableCellElement;
            this.td = td;
            this.tr.appendChild(td);
            this.subItems.setTr(tr);
        }

        setText(text: string) {
            this.text = text;
            this.td.textContent = text;
        }

        setForeColor(color: Color) {
            this.foreColor = color;
        }

        setImageIndex(imageIndex: number) {
            this.imageIndex = imageIndex;
        }
    }

    class SubItems {

        private _items: SubItem[] = [];
        private tr: HTMLTableRowElement;

        public item(index: number) {
            return this._items[index-1];
        }

        // @ts-ignore
        public add(text: string) {
            const td = document.createElement('td') as HTMLTableCellElement;
            let subItem = new SubItem(td);
            subItem.setText(text);
            this._items.push(subItem);
            td.textContent = text;
            this.tr.appendChild(td);
            return subItem;
        }

        getItems() {
            return this._items;
        }

        setTr(tr: HTMLTableRowElement) {
            this.tr = tr;
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

        public constructor(name: string, el: HTMLElement) {
            super(el);
            
            this.name = name;
            
            this.div = el as HTMLDivElement;
            this.table = document.createElement('table') as HTMLTableElement;
            this.table.className = "fl-table";
            this.div.appendChild(this.table);
            this.table.createTHead();
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