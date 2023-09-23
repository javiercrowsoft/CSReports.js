namespace CSReportPaint {

    import csColors = CSReportGlobals.csColors;

    // Bitmap Documentation
    // https://developer.mozilla.org/en-US/docs/Web/API/createImageBitmap

    export class Bitmap {
        private bitmap: ImageBitmap;
        private p: Promise<void>;
        public readonly name;

        constructor(width: number, height: number, name: string) {
            this.name = name;

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

        static fromContext2d(ctx: CanvasRenderingContext2D, name: string) {
            const bitmap = new Bitmap(0,0, name);
            bitmap.p = new Promise((resolve) => {
                createImageBitmap(ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)).then(b => {
                    bitmap.bitmap = b;
                    resolve();
                });
            });
            return bitmap;
        }

        getBitmap() {
            return this.p.then(() => this.bitmap)
        }

        whenLoaded() {
            return this.p;
        }

        getSize() {
            return { height: this.bitmap.height, width: this.bitmap.width };
        }

        public static fromImage(image: Image, name: string) {
            const bitmap = new Bitmap(0,0, name);
            createImageBitmap(image.bitmap).then(b => bitmap.bitmap = b);
        }

        dispose() {
            console.log("dispose was called in object " + this.constructor.name);
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
        public readonly name: string;

        constructor(canvas: HTMLCanvasElement, name: string) {
            this.name = name;
            this.canvas = canvas;
            this.context = canvas.getContext("2d");
            // @ts-ignore
            this.canvas.name = name
        }

        getBoundingClientRect(): DOMRect {
            // @ts-ignore;
            return this.canvas.getBoundingClientRect();
        }

        setFillStyle(style: string) {
            this.context.fillStyle = style;
        };

        fillRect(x: number, y: number, width: number, height: number) {
            this.context.fillRect(x, y, width, height);
        }

        dispose() {
            console.log("dispose was called in object " + this.constructor.name);
        }

        drawImage(bitmap: ImageBitmap, x: number, y: number) {
            this.context.drawImage(bitmap, x, y);
        }

        getContext() {
            return this.context;
        }

        static fromImage(bitmap: Bitmap): Promise<Graphic> {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            // @ts-ignore
            canvas.name = name;            
            const ctx = canvas.getContext('2d');
            return bitmap.getBitmap().then(bmp => {
                ctx.canvas.width = bmp.width;
                ctx.canvas.height = bmp.height;
                ctx.drawImage(bmp,0,0);
                return new Graphic(canvas, bitmap.name);
            });
        }

        static createGraphic(name: string, width?: number, height?: number) {
            const canvas = document.createElement('canvas') as HTMLCanvasElement;
            // @ts-ignore
            canvas.name = name;            
            const ctx = canvas.getContext('2d');
            if(width) ctx.canvas.width = width;
            if(height) ctx.canvas.height = height;
            return new Graphic(canvas, name);
        }

        fillPath(brush: Brush, path: any) {
            this.context.fill(path);
        }

        drawPath(pen: Pen, path: any) {
            this.context.fill(path);
        }

        fillRectangle(brush: Brush, rect: Rectangle) {
            this.context.save();
            this.context.fillStyle = brush.toString();
            this.context.fillRect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
            this.context.restore();
        }

        drawRectangle(pen: Pen, rect: Rectangle) {
            this.context.save();
            if(pen.dashStyle == DashStyle.Dot) this.context.setLineDash([3, 2]);
            this.context.lineWidth = pen.width();
            this.context.strokeStyle = pen.color();
            this.context.strokeRect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
            this.context.restore();
        }

        drawString(text: string, 
                   font: Font, 
                   brush: SolidBrush, 
                   rect: RectangleF, 
                   format: StringFormat) {

            this.context.fillStyle = brush.foreground.color;
            this.context.font = font.toStringFont();
            if(format && format.formatFlags == StringFormatFlags.Wrap) {
                this.drawWrappedString(text, rect.getLeft(), rect.getBottom(), rect.getWidth())
            }
            else {
                this.drawStringIntoRect(text, rect);
            }
        }

        private drawStringIntoRect(text: string, rect: RectangleF) {
            this.context.save();
            this.context.beginPath();
            this.context.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
            this.context.clip();
            this.context.fillText(text, rect.getLeft(), rect.getTop() + rect.getHeight());
            this.context.closePath();
            this.context.restore();
        }

        private drawWrappedString(text: string, 
                                  x: number, 
                                  y: number, 
                                  maxWidth: number) {
            let words = text.split(' ');
            let line = '';
            const lineHeight = this.lineHeight();

            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = this.context.measureText(testLine);
                let testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    this.context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
            }
            this.context.fillText(line, x, y);
        }

        // this function uses the current font applied to the context
        //
        private lineHeight() {
            const m = this.context.measureText("ABCDEFGHYJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@\"\\/#$%^*()_+=?><");
            // @ts-ignore
            return Math.floor(m.fontBoundingBoxAscent + m.fontBoundingBoxDescent);
        }

        private measureWrappedString(text: string, maxWidth: number) {
            let words = text.split(' ');
            let line = '';
            let width = 0;
            let wrapped = false;            
            const lineHeight = this.lineHeight();
            let y = lineHeight;            

            for (let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = this.context.measureText(testLine);
                let testWidth = metrics.width;                
                if (testWidth > maxWidth && n > 0) {
                    line = words[n] + ' ';
                    y += lineHeight;
                    wrapped = true;
                }
                else {
                    line = testLine;
                    width = testWidth;
                }
            }
            if(wrapped) width = maxWidth;
            return new SizeF(Math.floor(width), Math.floor(y));
        }

        fillEllipse(brush: Brush, rect: Rectangle) {

        }

        measureString(text: string, font: Font, width = -1, format?: StringFormat): SizeF {
            let size: SizeF;

            this.context.save();
            
            this.context.font = font.toStringFont();                        
            if(format && format.formatFlags == StringFormatFlags.Wrap) {
                size = this.measureWrappedString(text, width);
            }
            else {                
                const m = this.context.measureText(text);
                size = new SizeF(
                    Math.floor(m.width), 
                    // @ts-ignore
                    Math.floor(m.fontBoundingBoxAscent + m.fontBoundingBoxDescent));
            }

            this.context.restore();

            return size;
        }

        getHeight() {
            return this.canvas.height;
        }
        
        getWidth(): number {
            return this.canvas.width;
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
            r.setHeight(bottom - top);
            r.setWidth(right - left);
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

        static new2(location: any, sizeF: SizeF) {
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

        toString(): string {
            return "x0: " + this.getLeft() 
                + "\n y0: " + this.getTop() 
                + "\n x1: " + this.getWidth() 
                + "\n y1: " + this.getBottom();
        }
    }

    export class Rectangle extends  RectangleF {

    }

    export class Point {
        constructor(x: number, y: number) {

        }

    }

    export enum DashStyle {
        Dot = 1
    }

    export class Pen {
        dashStyle: DashStyle;
        private _color: string;
        private _width: number;
        
        constructor(color: string, width: number) {
            this._color = color;
            this._width = width;
        }

        dispose() {
            console.log("dispose was called in object " + this.constructor.name);
        }

        color() {
            return this._color;
        }

        width() {
            return this._width;
        }
    }

    export abstract class Brush {
        dispose() {
            console.log("dispose was called in object " + this.constructor.name);
        };
        
        toString() { return csColors.WHITE};
    }

    export class SolidBrush extends Brush {
        private _foreground: Color;
        
        constructor(foreground: string) {
            super();
            this._foreground = new Color(foreground);
        }

        get foreground(): Color {
            return this._foreground;
        }

        toString() {
            return this._foreground.color;
        }
    }

    export class HatchBrush extends Brush {
        private _hatchStyle: HatchStyle;
        private _foreground: Color;
        private _background: Color;

        constructor(hatchStyle: HatchStyle, foreground: Color, background: Color) {
            super();
            this._hatchStyle = hatchStyle;
            this._foreground = foreground;
            this._background = background;
        }

        get hatchStyle(): HatchStyle {
            return this._hatchStyle;
        }

        get foreground(): Color {
            return this._foreground;
        }

        get background(): Color {
            return this._background;
        }

        toString() {
            return this._foreground.color;
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

        public static rgbToHex(r: number, g: number, b: number) {
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
        public static AliceBlue = new Color(csColors.ALICEBLUE);
        public static HoneyDew = new Color(csColors.HONEYDEW);
    }

    export class GraphicsPath {

        addRectangle(baseRect: RectangleF) {

        }

        closeFigure() {

        }

        addArc(arc: RectangleF, number: number, number2: number) {

        }

        addEllipse(baseRect: RectangleF) {

        }
    }

    export class SizeF {
        width: number;
        height: number;
        constructor(width: number, height: number) {
            this.width = width;
            this.height = height;
        }
    }

    export enum StringTrimming {
        EllipsisWord
    }
    export enum StringAlignment {
        Near
    }
    export enum StringFormatFlags {
        Wrap,
        NoWrap
    }
    export class StringFormat {
        trimming = StringTrimming.EllipsisWord;
        alignment = StringAlignment.Near;
        formatFlags = StringFormatFlags.Wrap;
    }

}
