namespace CSReports.CSDrawing {

    export interface ISize {
        width: number;
        height: number;
    }

    export interface IPrintGraphic {
        getBoundingClientRect(): ISize;
        fillRectangle(brush: Brush, rect: Rectangle): void;
        drawRectangle(pen: Pen, rect: Rectangle): void;
        drawImage2(bitmap: ImageBitmap, x: number, y: number, width: number, height: number): void;
        drawString(text: string, font: Font, brush: SolidBrush, rect: RectangleF, format: StringFormat): void;
        fillPath(brush: Brush, path: any): void;
        drawPath(pen: Pen, path: any): void;
        fillEllipse(brush: Brush, rect: Rectangle): void;
        drawImage(bitmap: ImageBitmap, x: number, y: number): void;
        dispose(): void;
    }

}