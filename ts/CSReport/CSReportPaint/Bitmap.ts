namespace CSReportPaint {

    export class Bitmap {

        constructor(image: Image) {

        }
    }
    export class Image {}
    export class Graphics {}
    export class RectangleF {
        private left = 0;
        private top = 0;
        private right = 0;
        private bottom = 0;
        private height = 0;
        private width = 0;

        getHeight() {
            return this.height;
        }

        getWidth() {
            return this.width;
        }

        setHeight(h: number) {
            this.height = h;
        }

        setWidth(w: number) {
            this.width = w;
        }

        static new4(left: number, top: number, right: number, bottom: number) {
            const r = new RectangleF();
            r.setTop(top);
            r.setLeft(left);
            r.setRight(right);
            r.setBottom(bottom);
            r.setHeight(top - bottom);
            r.setWidth(left - right);
            return r;
        }

        setTop(top: number) {
            this.top = top;
        }

        setBottom(bottom: number) {
            this.bottom = bottom;
        }

        setLeft(left: number) {
            this.left = left;
        }

        setRight(right: number) {
            this.right = right;
        }

        getTop() {
            return this.top;
        }

        getBottom() {
            return this.bottom;
        }

        getLeft() {
            return this.left;
        }

        getRight() {
            return this.right;
        }
    }

    export class Rectangle extends  RectangleF {

    }
    export class Point {
        constructor(x: number, y: number) {

        }

    }
    export class Pen {}
    export class Brush {}
    export class SolidBrush {}
    export class HatchBrush {}
    export class HatchStyle {}
    export class Color {

        public toArgb() {
            return 0;
        }

        public static Gray = new Color();
        public static Black = new Color();
        public static Red = new Color();
        public static White = new Color();
    }
    export class GraphicsPath {}
    export class SizeF {
        private x: number;
        private y: number;
        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
    export class StringFormat {}
    export enum StringTrimming {
        EllipsisWord
    }
    export enum StringAlignment {
        Near
    }
    export enum StringFormatFlags {
        NoWrap
    }
}
