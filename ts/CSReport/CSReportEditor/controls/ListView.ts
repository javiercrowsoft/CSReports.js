///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Color = CSReportPaint.Color;

    class Items {

        private _items: Item[] = [];

        // @ts-ignore
        public add(text: string, imageIndex: number) {
            let item = new Item();
            item.text = text;
            item.imageIndex = imageIndex;
            this._items.push(item);
            return item;
        }

        public clear() {
            this._items = [];
        }
    }

    class Item {
        text: string;
        imageIndex: number;
        foreColor: Color;
        tag: any;
        subItems: SubItems;

        public constructor() {
            this.subItems = new SubItems();
        }
    }

    class SubItems {

        private _items: SubItem[] = [];

        public item(index: number) {
            return this._items[index];
        }

        // @ts-ignore
        public add(text: string) {
            let subItem = new SubItem();
            subItem.text = text;
            this._items.push(subItem);
            return subItem;
        }
    }

    class SubItem {
        text: string;
        tag: any;
        foreColor: Color;
    }

    export class ListView extends Control {

        private _items: Items = new Items(null, false, Item);
        private _selectedItems: Items = new Items();

        getItems() {
            return this._items;
        }

        selectedItems() {
            return this._selectedItems;
        }

        sort() {

        }
    }
}