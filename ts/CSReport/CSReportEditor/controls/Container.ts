///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Map = CSOAPI.Map;

    export class Container<T> extends Control {

        private controls = new Map<T>()

        public getControls() {
            return this.controls;
        }
    }
}

