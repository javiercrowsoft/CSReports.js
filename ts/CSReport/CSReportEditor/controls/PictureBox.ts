///<reference path="Control.ts"/>

namespace CSReportEditor {

    import Point = CSReportPaint.Point;
    import Graphic = CSReportPaint.Graphic;
    import Color = CSReportPaint.Color;

    export class PictureBox extends Control {

        private readonly div: HTMLDivElement;
        private readonly canvas: HTMLCanvasElement;
        private readonly graphic: Graphic;
        public readonly name: string;
        private bacgroundColor: Color;

        public constructor(name: string, el: HTMLElement) {
            super(el);
            
            this.name = name;
            
            this.div = el as HTMLDivElement;
            this.canvas = document.createElement('canvas') as HTMLCanvasElement;
            this.canvas.style.left = "0px";
            this.canvas.style.top = "0px";
            this.canvas.width = 1;
            this.canvas.height = 1;
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

        setWidth(value: number) {
            super.setWidth(value);
            this.canvas.width = value;
            this.div.style.width = value.toString() + "px";
        }

        setHeight(value: number) {
            super.setHeight(value);
            this.canvas.height = value;
            this.div.style.height = value.toString() + "px";
        }

        setBacgroundColor(color: Color) {
            this.bacgroundColor = color;
            this.canvas.style.backgroundColor = color.color;
        }

        setMouseDownEventListner(f: (event, rect)=>void) {
            let canvas = this.canvas;
            this.canvas.onmousedown = (event) => {
                var rect = canvas.getBoundingClientRect();
                f(event, {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
            };
        }

        setMouseUpEventListner(f: (event, rect)=>void) {
            let canvas = this.canvas;
            this.canvas.onmouseup = (event) => {
                var rect = canvas.getBoundingClientRect();
                f(event, {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
            };
        }

        setMouseEventListner(f: (event, rect)=>void) {
            let canvas = this.canvas;
            this.canvas.onmousemove = (event) => {
                var rect = canvas.getBoundingClientRect();
                f(event, {
                    x: event.clientX - rect.left,
                    y: event.clientY - rect.top
                });
            };
        }
    }
}