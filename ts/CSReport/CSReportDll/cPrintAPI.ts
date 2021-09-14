namespace CSReportDll {

    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import csRptPageOrientation = CSReportGlobals.csRptPageOrientation;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import Utils = CSOAPI.Utils;

    export class cPrintAPI {

        public static showPrintDialog(
            printDialog: PrintDialog,
            deviceName: string,
            driverName: string,
            port: string,
            paperSize: csReportPaperType,
            orientation: number,
            fromPage: number,
            toPage: number,
            copies: number,
            paperBin: number) {

            let settings = printDialog.getPrinterSettings();
            settings.setPrinterName(deviceName);
            settings.setFromPage(fromPage);
            settings.setToPage(toPage);
            settings.setCopies(copies);

            if (printDialog.showDialog() === DialogResult.OK) {
                deviceName = settings.getPrinterName();
                fromPage = settings.getFromPage();
                toPage = settings.getToPage();
                copies = settings.getCopies();
                return true;
            }
            else {
                return false;
            }
        }

        public printerSetPaperBin(deviceName: string, oldPaperBin: number) {
            throw new NotImplementedException();
        }

        public endDoc(hDC: number) {
            throw new NotImplementedException();
        }

        public static getcPrint(
            printDialog: PrintDialog,
            deviceName: string,
            driverName: string,
            port: string,
            orientation: number = 1,
            paperSize: number = 1,
            width: number = 1,
            height: number = 1) {

            let o: cPrinter = new cPrinter(printDialog);

            o.setDeviceName(deviceName);
            o.setDriverName(driverName);
            o.setPort(port);

            let paperInfo: cReportPaperInfo = o.getPaperInfo();

            paperInfo.setOrientation(orientation);
            paperInfo.setPaperSize(paperSize);

            if (width === 0 || height === 0) {
                this.getSizeFromPaperSize(paperSize, orientation, width, height);
            }

            paperInfo.setWidth(width);
            paperInfo.setHeight(height);

            return o;
        }

        public getcPrint2(printDialog: PrintDialog, deviceName: string, driverName: string, port: string) {
            let printerConfigInfo: object = cPrintWMI.getPrinterConfigInfoFromWMI(deviceName);

            let paperSize: number = cPrintAPI.getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "PaperSize", printerConfigInfo, "A4"));
            let orientation: number = Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "Orientation", printerConfigInfo, 1));

            let width: number = Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "PaperWidth", printerConfigInfo, 210));
            let height: number = Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "PaperLength", printerConfigInfo, 297));

            return cPrintAPI.getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
        }

        public static getcPrinterFromDefaultPrinter(printDialog: PrintDialog) {
            let deviceName: string = "";
            let driverName: string = "";
            let port: string = "";
            let paperSize: number = 0;
            let orientation: number = 0;
            let width: number = 0;
            let height: number = 0;

            this.getDefaultPrinter(deviceName, driverName, port, paperSize, orientation, width, height);

            if (deviceName !== "") {
                return this.getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
            }
            else {
                return null;
            }
        }

        public static printerPaperBinNameToId(p: string, p_2: string, paperBin: string): number {
            throw new NotImplementedException();
        }

        public static getDefaultPrinter(deviceName: string, driverName: string, port: string,
                                        paperSize: number, orientation: number,
                                        width: number, height: number) {

            let settings: PrinterSettings = new PrinterSettings();

            deviceName = settings.getPrinterName();

            let printerInfo: object = cPrintWMI.getPrinterInfoFromWMI(deviceName);

            driverName = cPrintWMI.getPrinterInfoValueFromWMI("DriverName", printerInfo, "") as string;
            port = cPrintWMI.getPrinterInfoValueFromWMI("PortName", printerInfo, "") as string;

            let printerConfigInfo: object = cPrintWMI.getPrinterConfigInfoFromWMI(settings.getPrinterName());

            paperSize = this.getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                "PaperSize", printerConfigInfo, "A4").toString());
            orientation = Math.trunc(Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "Orientation", printerConfigInfo, 1)));

            width = Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                                "PaperWidth", printerConfigInfo, 210));
            height = Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                                "PaperLength", printerConfigInfo, 297));

            if (width === 0 || height === 0 || paperSize === 99) {
                if (paperSize === 99 /*UNKNOWN*/) paperSize = 1; /*LETTER*/

                this.getSizeFromPaperSize(paperSize, orientation, width, height);
            }
        }

        private static getSizeFromPaperSize(paperSize: csReportPaperType, orientation: number, width: number, height: number) {
            switch (paperSize)
            {
                case csReportPaperType.CS_RPT_PAPER_TYPE_LETTER:
                    height = 279;
                    width = 216;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_LEGAL:
                    height = 356;
                    width = 216;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A4:
                    height = 297;
                    width = 210;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A3:
                    height = 420;
                    width = 297;
                    break;

                default:
                    height = 0;
                    width = 0;
                    break;
            }

            if (orientation === csRptPageOrientation.LANDSCAPE) {
                let tmp: number = 0;
                tmp = height;
                height = width;
                width = tmp;
            }
        }

        private static getPaperSizeFromSizeName(sizeName: string) {
            let size: number;
            switch (sizeName.toLowerCase()) {
                case "a4":
                    size = csReportPaperType.CS_RPT_PAPER_TYPE_A4;
                    break;
                case "letter":
                    size = csReportPaperType.CS_RPT_PAPER_TYPE_LETTER;
                    break;
                case "legal":
                    size = csReportPaperType.CS_RPT_PAPER_TYPE_LEGAL;
                    break;
                default:
                    size = csReportPaperType.CS_RPT_PAPER_USER;
                    break;
            }
            return size;
        }
    }

    export class PrintDialog {
        getPrinterSettings(): PrinterSettings {
            // TODO: implement
            return null;
        }

        showDialog(): DialogResult {
            // TODO: implement
            return DialogResult.OK;
        }
    }

    export class PrinterSettings {

        private deviceName: string;
        private fromPage: number;
        private toPage: number;
        private copies: number;
        private printerName: string;

        setPrinterName(deviceName: string) {
            this.deviceName = deviceName;
        }

        setFromPage(fromPage: number) {
            this.fromPage = fromPage;
        }

        setToPage(toPage: number) {
            this.toPage = toPage;
        }

        setCopies(copies: number) {
            this.copies = copies;
        }

        getPrinterName() {
            return this.printerName;
        }

        getFromPage() {
            return this.fromPage;
        }

        getToPage() {
            return this.getToPage();
        }

        getCopies() {
            return this.getCopies();
        }
    }

    export enum DialogResult {
        OK
    }

}
