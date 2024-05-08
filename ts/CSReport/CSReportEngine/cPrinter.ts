///<reference path="../../jsPDF/index.d.ts"/>

namespace CSReportEngine {

    import csRptPageOrientation = CSReportGlobals.csRptPageOrientation;
    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import IPrintGraphic = CSDrawing.IPrintGraphic;
    import ISize = CSDrawing.ISize;
    import Brush = CSDrawing.Brush;
    import Pen = CSDrawing.Pen;
    import Font = CSDrawing.Font;
    import SolidBrush = CSDrawing.SolidBrush;
    import Rectangle = CSDrawing.Rectangle;
    import RectangleF = CSDrawing.RectangleF;
    import StringFormat = CSDrawing.StringFormat;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import jsPDF = JSPDFLibrary.jsPDF;

    export class cPrinter {

        private deviceName: string = "";
        private driverName: string = "";
        private port: string = "";
        private paperInfo: cReportPaperInfo = new cReportPaperInfo();

        private copies: number = 0;

        private graphic: Graphics = null;

        private readonly printDialog: PrintDialog = null;

        public constructor(printDialog: PrintDialog) {
            this.printDialog = printDialog;
        }

        public getCopies() {
            return this.copies;
        }

        public setCopies(rhs: number) {
            this.copies = rhs;
        }

        public getGraph() {
            return this.graphic;
        }

        public setGraph(rhs: Graphics) {
            this.graphic = rhs;
        }

        public getDeviceName() {
            return this.deviceName;
        }

        public setDeviceName(rhs: string) {
            this.deviceName = rhs;
        }

        public getDriverName() {
            return this.driverName;
        }

        public setDriverName(rhs: string) {
            this.driverName = rhs;
        }

        public getPort() {
            return this.port;
        }

        public setPort(rhs: string) {
            this.port = rhs;
        }

        public getPaperInfo() {
            return this.paperInfo;
        }

        public setPaperInfo(rhs: cReportPaperInfo) {
            this.paperInfo = rhs;
        }

        public showDialog(pages: number) {
            let paperSize: csReportPaperType = 0;
            let orientation: number = 0;
            let fromPage: number = 0;
            let toPage: number = 0;
            let paperBin: number = 0;

            paperSize = this.paperInfo.getPaperSize();
            orientation = this.paperInfo.getOrientation();

            fromPage = 1;
            toPage = pages;

            if(cPrintAPI.showPrintDialog(
                    this.printDialog,
                    this.deviceName,
                    this.driverName,
                    this.port,
                    paperSize,
                    orientation,
                    fromPage,
                    toPage,
                    this.copies,
                    paperBin)) {
                this.paperInfo.setPaperSize(paperSize);
                this.paperInfo.setOrientation(orientation);
                this.paperInfo.setPagesToPrint(fromPage.toString() + "-" + toPage.toString());
                this.paperInfo.setPaperBin(paperBin);

                return true;
            }
            else {
                return false;
            }
        }

        private getPaperSize(paperSize: csReportPaperType) {
            let size: PaperSize = new PaperSize();

            switch (paperSize) {
                case csReportPaperType.CS_RPT_PAPER_TYPE_A4:
                    size.RawKind = PaperKind.A4;
                    break;
                case csReportPaperType.CS_RPT_PAPER_TYPE_A3:
                    size.RawKind = PaperKind.A3;
                    break;
                case csReportPaperType.CS_RPT_PAPER_TYPE_LETTER:
                    size.RawKind = PaperKind.Letter;
                    break;
                case csReportPaperType.CS_RPT_PAPER_TYPE_LEGAL:
                    size.RawKind = PaperKind.Legal;
                    break;
            }
            return size;
        }

        public starDoc(printDoc: PrintDocument, title: string, paperSize: csReportPaperType, orientation: number) {
            printDoc.getDefaultPageSettings().Landscape = (orientation === csRptPageOrientation.LANDSCAPE);
            printDoc.getDefaultPageSettings().PaperSize = this.getPaperSize(paperSize);
            return true;
        }
    }

    export class PageSettings {
        Landscape: boolean;
        PaperSize: CSReportEngine.PaperSize;
    }

    export class PDFGraphic implements IPrintGraphic {

        private doc: jsPDF;
        private height: number;
        private width: number;

        constructor(doc: jsPDF, height: number, width: number) {
            this.doc = doc;
            this.height = height;
            this.width = width;
        }

        getBoundingClientRect(): ISize {
            return { height: this.height, width: this.width };
        }
        fillRectangle(brush: Brush, rect: Rectangle) {
            this.doc.setFillColor(brush.toString());
            this.doc.setDrawColor(brush.toString());
            this.doc.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight(), 'F');
        }
        drawRectangle(pen: Pen, rect: Rectangle) {
            this.doc.setDrawColor(pen.color());
            this.doc.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
        }
        drawImage2(bitmap: ImageBitmap, x: number, y: number, width: number, height: number) {
            this.drawImage(bitmap, x, y);
        }
        drawString(text: string, font: Font, brush: SolidBrush, rect: RectangleF, format: StringFormat) {
            this.doc.setTextColor(brush.foreground.color);
            this.doc.setFont(font.name, font.italic ? 'italic' : undefined, font.bold ? 'bold' : undefined);
            this.doc.setFontSize(font.size);
            this.doc.text(text, rect.getLeft(), rect.getTop(), {baseline: 'top'});
        }
        fillPath(brush: Brush, path: any): void {

        }
        drawPath(pen: Pen, path: any): void {

        }
        fillEllipse(brush: Brush, rect: Rectangle): void {
            throw new NotImplementedException();
        }
        drawImage(bitmap: ImageBitmap, x: number, y: number): void {
            const canvas = this.imageBitmapToCanvas(bitmap);
            this.doc.addImage(canvas, x, y, canvas.width, canvas.height);
        }
        dispose(): void {

        }

        private imageBitmapToCanvas(bitmap: ImageBitmap) {
            const canvas: HTMLCanvasElement =  document.createElement("canvas") as HTMLCanvasElement;
            const context: CanvasRenderingContext2D = canvas.getContext("2d");
            canvas.width = bitmap.width;
            canvas.height = bitmap.height;
            context.clearRect(0, 0, bitmap.width, bitmap.height);
            context.drawImage(bitmap, 0, 0);
            return canvas;
        }
    }

    export class PDFPageEvent {
        public hasMorePages: boolean;
        public graphic: PDFGraphic;

        constructor(graphic: PDFGraphic) {
            this.graphic = graphic;
        }
    }

    export class PDFDocument {
        private defaultPageSettings = new PageSettings();
        private printerSettings = new PrinterSettings();
        private printPage: (e: PDFPageEvent) => void = null;
        private doc: jsPDF;
        private size: {height: number, width: number};

        constructor(size: {height: number, width: number},
                    orientation?: "p" | "portrait" | "l" | "landscape",
                    unit?: "pt" | "px" | "in" | "mm" | "cm" | "ex" | "em" | "pc",
                    format?: string | number[],
                    compressPdf?: boolean) {
            this.size = size;
            const jsPDFref = (window as any).jspdf;
			this.doc = new jsPDFref.jsPDF(orientation, unit, format, compressPdf);
        }

        setPrintPage(printPage: (e: PDFPageEvent) => void) {
            this.printPage = printPage;
        }

        getPrinterSettings(): PrinterSettings {
            return this.printerSettings;
        }

        getDefaultPageSettings() {
            return this.defaultPageSettings;
        }

        print(fileName: string) {
            const g = new PDFGraphic(this.doc, this.size.height, this.size.width);
            while(true) {
                const e = new PDFPageEvent(g);
                this.printPage(e);
                if(! e.hasMorePages) break;
                this.doc.addPage();
            }
            this.doc.save(fileName);
        }
    }

    export class PrinterGraphic implements IPrintGraphic {

        DpiX: number;
        DpiY: number;

        getBoundingClientRect(): ISize {
            throw new NotImplementedException();
        }
        fillRectangle(brush: Brush, rect: Rectangle) {
            throw new NotImplementedException();
        }
        drawRectangle(pen: Pen, rect: Rectangle) {
            throw new NotImplementedException();
        }
        drawImage2(bitmap: ImageBitmap, x: number, y: number, width: number, height: number) {
            throw new NotImplementedException();
        }
        drawString(text: string, font: Font, brush: SolidBrush, rect: RectangleF, format: StringFormat) {
            throw new NotImplementedException();
        }
        fillPath(brush: Brush, path: any): void {
            throw new NotImplementedException();
        }
        drawPath(pen: Pen, path: any): void {
            throw new NotImplementedException();
        }
        fillEllipse(brush: Brush, rect: Rectangle): void {
            throw new NotImplementedException();
        }
        drawImage(bitmap: ImageBitmap, x: number, y: number): void {
            throw new NotImplementedException();
        }
        dispose(): void {
            throw new NotImplementedException();
        }
    }

    export class PrintPageEvent {
        public hasMorePages: boolean;
        public graphic: PrinterGraphic;
    }

    export class PrintDocument {
        private defaultPageSettings = new PageSettings();
        private printerSettings = new PrinterSettings();
        private printPage: (e: PrintPageEvent) => void = null;

        setPrintPage(printPage: (e: PrintPageEvent) => void) {
            this.printPage = printPage;
        }

        getPrinterSettings(): PrinterSettings {
            return this.printerSettings;
        }

        getDefaultPageSettings() {
            return this.defaultPageSettings;
        }

        print() {
            while(true) {
                const e = new PrintPageEvent();
                this.printPage(e);
                if(! e.hasMorePages) break;
            }
        }
    }

    export class PaperSize {
        public RawKind: any;
    }

    export enum PaperKind {
        A4,
        A3,
        Letter,
        Legal
    }

    export class Graphics {

    }
}
