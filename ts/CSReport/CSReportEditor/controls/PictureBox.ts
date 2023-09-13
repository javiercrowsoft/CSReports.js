///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Point = CSReportPaint.Point;
    import Graphic = CSReportPaint.Graphic;

    export class PictureBox extends Control {
        createGraphics(): object {
            throw new Error("Method not implemented.");
        }

        private readonly canvas: HTMLCanvasElement;
        private readonly graphic: Graphic;
        public readonly name: string;

        public constructor(name: string, el: HTMLElement = null) {
            super(el);
            
            this.name = name;
            
            this.canvas = document.createElement('canvas') as HTMLCanvasElement;
            this.canvas.style.left = "0px";
            this.canvas.style.top = "0px";
            this.canvas.width = 1224;
            this.canvas.height = 768;
            this.graphic = new Graphic(this.canvas, name);

            // @ts-ignore
            this.canvas.name = name;

            // TODO: implement
            /*
            this.canvas.style.zIndex = 8;
            this.canvas.style.position = "absolute";
            this.canvas.style.border = "1px solid";
            */
            el.appendChild(this.canvas);
        }

        public getGraphics() {
            return this.graphic;
        }

        public getContext() {
            return this.graphic.getContext();
        }

        public refresh() {

        }

        public pointToScreen(point: Point) {
            return undefined;
        }

        setPaint(paint: (sender: object, e: { graphics: Graphic }) => void) {

        }
    }
}