///<reference path="Control.ts"/>

namespace CSForms {

    export class Toolbar extends Control {

        private readonly div: HTMLDivElement;
        public readonly name: string;

        public constructor(name: string, el: HTMLElement) {
            super(el);

            this.name = name;

            this.div = el as HTMLDivElement;
        }

    }
}