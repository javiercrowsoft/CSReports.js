///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Map = CSOAPI.Map;

    class Items extends Map<Node> {

        // @ts-ignore
        public add(key: string) {
            return this.baseAdd(null, key);
        }
    }

    class Item {
        imageIndex: number;
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