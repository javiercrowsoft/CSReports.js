namespace CSDrawing {

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
                        // @ts-ignore
                        this.bitmap.name = this.name;
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
                    // @ts-ignore
                    bitmap.bitmap.name = name;
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
            bitmap.p = new Promise((resolve) => {
                createImageBitmap(image.bitmap).then(b => {
                    bitmap.bitmap = b;
                    // @ts-ignore
                    bitmap.bitmap.name = name;
                    resolve();
                });
            });
            return bitmap;
        }

        dispose() {
            //console.log("dispose was called in object " + this.constructor.name);
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
            // @ts-ignore
            return this.canvas.getBoundingClientRect();
        }

        setFillStyle(style: string) {
            this.context.fillStyle = style;
        };

        fillRect(x: number, y: number, width: number, height: number) {
            this.context.fillRect(x, y, width, height);
        }

        dispose() {
            //console.log("dispose was called in object " + this.constructor.name);
        }

        drawImage(bitmap: ImageBitmap, x: number, y: number) {
            this.context.clearRect(x, y, bitmap.width, bitmap.height);
            this.context.drawImage(bitmap, x, y);
            //console.log("drawImage");
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
            try {
                // TODO: implement
                // this.context.fill(path);
            }
            catch(ex) {
                console.log(ex);
                throw ex;
            }

        }

        fillRectangle(brush: Brush, rect: Rectangle) {
            this.context.save();
            this.context.fillStyle = brush.toString();
            this.context.fillRect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
            this.context.restore();
        }

        drawRectangle(pen: Pen, rect: Rectangle) {
            this.drawRectangle4(pen, rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
        }

        drawRectangle4(pen: Pen, x: number, y: number, w: number, h: number) {
            this.context.save();
            if(pen.dashStyle == DashStyle.Dot) this.context.setLineDash([3, 2]);
            this.context.lineWidth = pen.width();
            this.context.strokeStyle = pen.color();
            this.context.strokeRect(x, y, w, h);
            this.context.restore();
        }

        drawString(text: string,
                   font: Font,
                   brush: SolidBrush,
                   rect: RectangleF,
                   format: StringFormat) {
            this.context.save();
            this.context.fillStyle = brush.foreground.color;
            this.context.font = font.toStringFont();
            if(format && format.formatFlags == StringFormatFlags.Wrap) {
                this.drawWrappedString(text, rect.getLeft(), rect.getBottom(), rect.getWidth())
            }
            else {
                this.drawStringIntoRect(text, rect);
            }
            this.context.restore();
        }

        private drawStringIntoRect(text: string, rect: RectangleF) {
            this.context.beginPath();
            this.context.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight() + 20);
            this.context.clip();
            this.context.fillText(text, rect.getLeft(), rect.getTop() + rect.getHeight());
            this.context.closePath();
        }

        private drawWrappedString(text: string,
                                  x: number,
                                  y: number,
                                  maxWidth: number) {
            let words = text.split(' ');
            let line = '';
            const lineHeight = this.lineHeight();

            for(let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = this.context.measureText(testLine);
                let testWidth = metrics.width;
                if(testWidth > maxWidth && n > 0) {
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

            for(let n = 0; n < words.length; n++) {
                let testLine = line + words[n] + ' ';
                let metrics = this.context.measureText(testLine);
                let testWidth = metrics.width;
                if(testWidth > maxWidth && n > 0) {
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
        x: number;
        y: number;

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
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
            //console.log("dispose was called in object " + this.constructor.name);
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
            //console.log("dispose was called in object " + this.constructor.name);
        };

        toString() { return csColors.WHITE};
    }

    export class SolidBrush extends Brush {
        private _foreground: Color;

        constructor(foreground: string|number) {
            super();
            if(typeof foreground === 'number') {
                const hex = foreground.toString(16);
                foreground = "#" + "000000".substring(0, 6-hex.length) + hex;
            }
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

    export enum csColors {
        ALICEBLUE = "#F0F8FF",
        ANTIQUEWHITE = "#FAEBD7",
        AQUA = "#00FFFF",
        AQUAMARINE = "#7FFFD4",
        AZURE = "#F0FFFF",
        BEIGE = "#F5F5DC",
        BISQUE = "#FFE4C4",
        BLACK = "#000000",
        BLANCHEDALMOND = "#FFEBCD",
        BLUE = "#0000FF",
        BLUEVIOLET = "#8A2BE2",
        BROWN = "#A52A2A",
        BURLYWOOD = "#DEB887",
        CADETBLUE = "#5F9EA0",
        CHARTREUSE = "#7FFF00",
        CHOCOLATE = "#D2691E",
        CORAL = "#FF7F50",
        CORNFLOWERBLUE = "#6495ED",
        CORNSILK = "#FFF8DC",
        CRIMSON = "#DC143C",
        CYAN = "#00FFFF",
        DARKBLUE = "#00008B",
        DARKCYAN = "#008B8B",
        DARKGOLDENROD = "#B8860B",
        DARKGRAY = "#A9A9A9",
        DARKGREEN = "#006400",
        DARKKHAKI = "#BDB76B",
        DARKMAGENTA = "#8B008B",
        DARKOLIVEGREEN = "#556B2F",
        DARKORANGE = "#FF8C00",
        DARKORCHID = "#9932CC",
        DARKRED = "#8B0000",
        DARKSALMON = "#E9967A",
        DARKSEAGREEN = "#8FBC8B",
        DARKSLATEBLUE = "#483D8B",
        DARKSLATEGRAY = "#2F4F4F",
        DARKTURQUOISE = "#00CED1",
        DARKVIOLET = "#9400D3",
        DEEPPINK = "#FF1493",
        DEEPSKYBLUE = "#00BFFF",
        DIMGRAY = "#696969",
        DODGERBLUE = "#1E90FF",
        FIREBRICK = "#B22222",
        FLORALWHITE = "#FFFAF0",
        FORESTGREEN = "#228B22",
        FUCHSIA = "#FF00FF",
        GAINSBORO = "#DCDCDC",
        GHOSTWHITE = "#F8F8FF",
        GOLD = "#FFD700",
        GOLDENROD = "#DAA520",
        GRAY = "#808080",
        GREEN = "#008000",
        GREENYELLOW = "#ADFF2F",
        HONEYDEW = "#F0FFF0",
        HOTPINK = "#FF69B4",
        INDIANRED = "#CD5C5C",
        INDIGO = "#4B0082",
        IVORY = "#FFFFF0",
        KHAKI = "#F0E68C",
        LAVENDER = "#E6E6FA",
        LAVENDERBLUSH = "#FFF0F5",
        LAWNGREEN = "#7CFC00",
        LEMONCHIFFON = "#FFFACD",
        LIGHTBLUE = "#ADD8E6",
        LIGHTCORAL = "#F08080",
        LIGHTCYAN = "#E0FFFF",
        LIGHTGOLDENRODYELLOW = "#FAFAD2",
        LIGHTGRAY = "#D3D3D3",
        LIGHTGREEN = "#90EE90",
        LIGHTPINK = "#FFB6C1",
        LIGHTSALMON = "#FFA07A",
        LIGHTSEAGREEN = "#20B2AA",
        LIGHTSKYBLUE = "#87CEFA",
        LIGHTSLATEGRAY = "#778899",
        LIGHTSTEELBLUE = "#B0C4DE",
        LIGHTYELLOW = "#FFFFE0",
        LIME = "#00FF00",
        LIMEGREEN = "#32CD32",
        LINEN = "#FAF0E6",
        MAGENTA = "#FF00FF",
        MAROON = "#800000",
        MEDIUMAQUAMARINE = "#66CDAA",
        MEDIUMBLUE = "#0000CD",
        MEDIUMORCHID = "#BA55D3",
        MEDIUMPURPLE = "#9370DB",
        MEDIUMSEAGREEN = "#3CB371",
        MEDIUMSLATEBLUE = "#7B68EE",
        MEDIUMSPRINGGREEN = "#00FA9A",
        MEDIUMTURQUOISE = "#48D1CC",
        MEDIUMVIOLETRED = "#C71585",
        MIDNIGHTBLUE = "#191970",
        MINTCREAM = "#F5FFFA",
        MISTYROSE = "#FFE4E1",
        MOCCASIN = "#FFE4B5",
        NAVAJOWHITE = "#FFDEAD",
        NAVY = "#000080",
        OLDLACE = "#FDF5E6",
        OLIVE = "#808000",
        OLIVEDRAB = "#6B8E23",
        ORANGE = "#FFA500",
        ORANGERED = "#FF4500",
        ORCHID = "#DA70D6",
        PALEGOLDENROD = "#EEE8AA",
        PALEGREEN = "#98FB98",
        PALETURQUOISE = "#AFEEEE",
        PALEVIOLETRED = "#DB7093",
        PAPAYAWHIP = "#FFEFD5",
        PEACHPUFF = "#FFDAB9",
        PERU = "#CD853F",
        PINK = "#FFC0CB",
        PLUM = "#DDA0DD",
        POWDERBLUE = "#B0E0E6",
        PURPLE = "#800080",
        RED = "#FF0000",
        ROSYBROWN = "#BC8F8F",
        ROYALBLUE = "#4169E1",
        SADDLEBROWN = "#8B4513",
        SALMON = "#FA8072",
        SANDYBROWN = "#F4A460",
        SEAGREEN = "#2E8B57",
        SEASHELL = "#FFF5EE",
        SIENNA = "#A0522D",
        SILVER = "#C0C0C0",
        SKYBLUE = "#87CEEB",
        SLATEBLUE = "#6A5ACD",
        SLATEGRAY = "#708090",
        SNOW = "#FFFAFA",
        SPRINGGREEN = "#00FF7F",
        STEELBLUE = "#4682B4",
        TAN = "#D2B48C",
        TEAL = "#008080",
        THISTLE = "#D8BFD8",
        TOMATO = "#FF6347",
        TRANSPARENT = "#FFFF",
        TURQUOISE = "#40E0D0",
        VIOLET = "#EE82EE",
        WHEAT = "#F5DEB3",
        WHITE = "#FFFFFF",
        WHITESMOKE = "#F5F5F5",
        YELLOW = "#FFFF00",
        YELLOWGREEN = "#9ACD32"
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

        get color(): csColors {
            return this._color;
        }

        public static colorFromNumber(color: string|number) {
            //@ts-ignore
            if(typeof color === 'string' && Number.isInteger(color)) {
                color = parseInt(color);
            }
            if(typeof color === 'number') {
                const hex = color.toString(16);
                color = "#" + "000000".substring(0, 6-hex.length) + hex;
            }
            return color;
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
