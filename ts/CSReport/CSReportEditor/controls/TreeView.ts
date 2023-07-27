///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Map = CSOAPI.Map;

    class Nodes extends Map<Node> {

        // @ts-ignore
        public add(key: string) {
            return this.baseAdd(null, key);
        }
    }

    class Node {

        private _items: Nodes = new Nodes(null, false, Node);
        imageIndex: number;
        tag: any;

        getNodes() {
            return this._items;
        }

        expandAll() {

        }
    }

    export class TreeView extends Control {

        private _items: Nodes = new Nodes(null, false, Node);
        private _selectedNode: Node;

        getNodes() {
            return this._items;
        }

        selectedNode() {
            return this._selectedNode;
        }
    }
}