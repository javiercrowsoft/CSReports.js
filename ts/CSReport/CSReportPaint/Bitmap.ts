namespace CSReportPaint {

    export class Bitmap {}
    export class Image {}
    export class Graphics {}
    export class Rectangle {}
    export class RectangleF {
        getHeight() {
            return 0;
        }

        getWidth() {
            return 0;
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
    export class PrintDocument {}
}
