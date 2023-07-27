namespace CSReportPaint {

    import csColors = CSReportGlobals.csColors;

    // Bitmap Documentation
    // https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap

    export class Bitmap {
        private bitmap: ImageBitmap;
        private p: Promise<void>;

        constructor(width: number, height: number) {
            // only fromImage should call with 0,0
            //
            this.p = new Promise((resolve) => {
                if(width > 0 && height > 0) {
                    const canvas = document.createElement("canvas") as HTMLCanvasElement;
                    const ctx = canvas.getContext("2d");
                    const imgData = ctx.createImageData(width, height);
                    createImageBitmap(imgData).then(b => {
                        this.bitmap = b;
                        resolve();
                    });
                } else {
                    this.bitmap = null;
                    resolve();
                }
            });
        }

        getBitmap() {
            return this.p.then(() => this.bitmap)
        }

        getSize() {
            return { height: this.bitmap.height, width: this.bitmap.width };
        }

        public static fromImage(image: Image) {
            const bitmap = new Bitmap(0,0);
            createImageBitmap(image.bitmap).then(b => bitmap.bitmap = b);
        }

        dispose() {

        }
    }

    export class Image {
        private readonly _bitmap: ImageBitmap;

        constructor(bitmap: ImageBitmap) {
            this._bitmap = bitmap;
        }

        get bitmap(): ImageBitmap {
            return this._bitmap;
        }
    }

    export class Graphic {
        private readonly canvas: HTMLCanvasElement;
        private readonly context: CanvasRenderingContext2D;

        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
        }

        getBoundingClientRect(): DOMRect {
            return this.canvas.getBoundingClientRect();
        }

        setFillStyle(style: string) {
            this.context.fillStyle = style;
        };

        fillRect(x: number, y: number, width: number, height: number) {
            this.context.fillRect(x, y, width, height);
        }

        dispose() {

        }

        drawImage(image: CSReportPaint.Image, x: number, y: number) {
            this.context.drawImage(image.bitmap, x, y);
        }

        getContext() {
            return this.context;
        }

        static fromImage(bitmap: CSReportPaint.Bitmap) {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            return bitmap.getBitmap().then(bmp => {
                ctx.drawImage(bmp,0,0);
                return new Graphic(canvas);
            });
        }
    }

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

    export class HatchBrush {
        private _hatchStyle: CSReportPaint.HatchStyle;
        private _foreground: CSReportPaint.Color;
        private _background: CSReportPaint.Color;

        constructor(hatchStyle: CSReportPaint.HatchStyle, foreground: CSReportPaint.Color, background: CSReportPaint.Color) {
            this._hatchStyle = hatchStyle;
            this._foreground = foreground;
            this._background = background;
        }


        get hatchStyle(): CSReportPaint.HatchStyle {
            return this._hatchStyle;
        }

        get foreground(): CSReportPaint.Color {
            return this._foreground;
        }

        get background(): CSReportPaint.Color {
            return this._background;
        }
    }

    export enum HatchStyle {
        Cross,
        DottedGrid,
        Horizontal,
        Vertical
    }
    export class Color {

        private readonly _color: csColors;

        public toArgb() {
            return this.hexToRgb(this._color);
        }

        private hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? "rgb("
                + parseInt(result[1], 16) + ", "
                + parseInt(result[2], 16) + ", "
                + parseInt(result[3], 16) + ")"
                : null;
        }

        private componentToHex(c: number) {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        public rgbToHex(r: number, g: number, b: number) {
            return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
        }

        constructor(color: csColors) {
            this._color = color;
        }

        get color(): CSReportGlobals.csColors {
            return this._color;
        }

        public static Gray = new Color(csColors.GRAY);
        public static Black = new Color(csColors.BLACK);
        public static Red = new Color(csColors.RED);
        public static White = new Color(csColors.WHITE);
        public static Blue = new Color(csColors.BLUE);
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
