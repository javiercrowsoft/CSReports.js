///<reference path="Control.ts"/>

namespace CSForms {

    import Point = CSDrawing.Point;
    import Graphic = CSDrawing.Graphic;
    import Color = CSDrawing.Color;

    export class PictureBox extends Control {

        private readonly div: HTMLDivElement;
        private readonly canvas: HTMLCanvasElement;
        private readonly graphic: Graphic;
        private paint: (sender: object, e: { graphics: Graphic }) => void;

        public readonly name: string;

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
            if(this.paint !== null) this.paint(this, {graphics: this.getGraphics()});
        }

        public pointToScreen(point: Point) {
            return undefined;
        }

        setPaint(paint: (sender: object, e: { graphics: Graphic }) => void) {
            this.paint = paint;
        }

        getCursor(): Cursor {
            return new Cursor(this.canvas.style.cursor);
        }

        setCursor(cursor: Cursor) {
            super.setCursor(cursor);
            this.canvas.style.cursor = cursor.toString();
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

        setImage(image: CSDrawing.Image) {
            // TODO: implements
        }

    }
}