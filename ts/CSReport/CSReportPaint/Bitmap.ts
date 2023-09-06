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

        getSize(): SizeF {
            return null;
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

        drawImage(bitmap: ImageBitmap, x: number, y: number) {
            this.context.drawImage(bitmap, x, y);
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

        fillPath(brush: CSReportPaint.Brush, path: any) {
            this.context.fill(path);
        }

        drawPath(pen: CSReportPaint.Pen, path: any) {
            this.context.fill(path);
        }

        fillRectangle(brush: CSReportPaint.Brush, rect: CSReportPaint.Rectangle) {

        }

        drawRectangle(pen: CSReportPaint.Pen, rect: CSReportPaint.Rectangle) {

        }

        drawString(text: string, font: CSReportPaint.Font, brush: CSReportPaint.SolidBrush, rect: CSReportPaint.RectangleF, format: CSReportPaint.StringFormat) {

        }

        fillEllipse(brush: CSReportPaint.Brush, rect: CSReportPaint.Rectangle) {

        }
    }

    export class Location {
        left: number;
        top: number;

        constructor(left: number, top: number) {
            this.left = left;
            this.top = top;
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

        setX(x: number) {
            this.left = x;
        }

        setY(y: number) {
            this.top = y;
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

        static new2(location: any, sizeF: CSReportPaint.SizeF) {
            const r = new RectangleF();
            r.setLeft(location.left);
            r.setTop(location.top);
            r.setRight(location.left + sizeF.width);
            r.setBottom(location.top + sizeF.height);
            r.setHeight(sizeF.height);
            r.setWidth(sizeF.width);
            return r;

        }

        getLocation(): Location {
            return new Location(this.left, this.top);
        }
    }

    export class Rectangle extends  RectangleF {

    }

    export class Point {
        constructor(x: number, y: number) {

        }

    }

    export enum DashStyle {
        Dot
    }

    export class Pen {
        dashStyle: DashStyle;
        constructor(colorOut: string, width: number) {

        }

        dispose() {

        }
    }

    export class Brush {
        dispose() {

        }
    }

    export class SolidBrush extends Brush{
        constructor(colorInside: string) {
            super();
        }
    }

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
            return Color.hexToRgb(this._color);
        }

        public static colorFromRGB(rgb: string) {
            return new Color(rgb);
        }

        private static hexToRgb(hex) {
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

        private static componentToHex(c: number) {
            const hex = c.toString(16);
            return hex.length == 1 ? "0" + hex : hex;
        }

        public rgbToHex(r: number, g: number, b: number) {
            return "#" + Color.componentToHex(r) + Color.componentToHex(g) + Color.componentToHex(b);
        }

        constructor(color: csColors|string|number) {
            // @ts-ignore
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

    export class GraphicsPath {

        addRectangle(baseRect: CSReportPaint.RectangleF) {

        }

        closeFigure() {

        }

        addArc(arc: CSReportPaint.RectangleF, number: number, number2: number) {

        }

        addEllipse(baseRect: CSReportPaint.RectangleF) {

        }
    }

    export class SizeF {
        width: number;
        height: number;
        constructor(x: number, y: number) {
            this.width = x;
            this.height = y;
        }
    }
    export class StringFormat {
        trimming: CSReportPaint.StringTrimming;
        alignment: CSReportPaint.StringAlignment;
        formatFlags: CSReportPaint.StringFormatFlags;

    }
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
