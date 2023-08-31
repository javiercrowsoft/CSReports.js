///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Map = CSOAPI.Map;
    import Color = CSReportPaint.Color;

    class Nodes extends Map<Node> {

        // @ts-ignore
        public add(key: string) {
            return this.baseAdd(null, key);
        }
    }

    export class Node {

        private _items: Nodes = new Nodes(null, false, Node);
        imageIndex: number;
        selectedImageIndex: number;
        tag: any;
        foreColor: Color;
        backColor: Color;

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