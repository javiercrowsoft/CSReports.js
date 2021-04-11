namespace CSReportDll {

    import csRptPageOrientation = CSReportGlobals.csRptPageOrientation;
    import csReportPaperType = CSReportGlobals.csReportPaperType;

    export class cPrinter {

        private C_MODULE: string = "cPrinter";

        private deviceName: string = "";
        private driverName: string = "";
        private port: string = "";
        private paperInfo: cReportPaperInfo = new cReportPaperInfo();

        private copies: number = 0;

        private graph: Graphics = null;

        private printDialog: PrintDialog = null;

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
            return this.graph;
        }

        public setGraph(rhs: Graphics) {
            this.graph = rhs;
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

            if (cPrintAPI.showPrintDialog(
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
                case csReportPaperType.CSRPTPAPERTYPEA4:
                    size.RawKind = PaperKind.A4;
                    break;
                case csReportPaperType.CSRPTPAPERTYPEA3:
                    size.RawKind = PaperKind.A3;
                    break;
                case csReportPaperType.CSRPTPAPERTYPELETTER:
                    size.RawKind = PaperKind.Letter;
                    break;
                case csReportPaperType.CSRPTPAPERTYPELEGAL:
                    size.RawKind = PaperKind.Legal;
                    break;
            }
            return size;
        }

        public starDoc(printDoc: PrintDocument, title: string, paperSize: csReportPaperType, orientation: number) {
            printDoc.DefaultPageSettings.Landscape = (orientation === csRptPageOrientation.LANDSCAPE);
            printDoc.DefaultPageSettings.PaperSize = this.getPaperSize(paperSize);

            return true;
        }
    }
}
