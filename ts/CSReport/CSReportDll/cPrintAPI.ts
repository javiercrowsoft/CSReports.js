namespace CSReportDll {

    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import csRptPageOrientation = CSReportGlobals.csRptPageOrientation;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import Utils = CSOAPI.Utils;
    import RefWrapper = CSKernelClient.RefWrapper;

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
            width = new RefWrapper(1),
            height = new RefWrapper(1)
        ) {

            let o: cPrinter = new cPrinter(printDialog);

            o.setDeviceName(deviceName);
            o.setDriverName(driverName);
            o.setPort(port);

            let paperInfo: cReportPaperInfo = o.getPaperInfo();

            paperInfo.setOrientation(orientation);
            paperInfo.setPaperSize(paperSize);

            if (width.get() === 0 || height.get() === 0) {
                this.getSizeFromPaperSize(paperSize, orientation, width, height);
            }

            paperInfo.setWidth(width.get());
            paperInfo.setHeight(height.get());

            return o;
        }

        public getcPrint2(printDialog: PrintDialog, deviceName: string, driverName: string, port: string) {
            let printerConfigInfo: object = cPrintWMI.getPrinterConfigInfoFromWMI(deviceName);

            let paperSize: number = cPrintAPI.getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "PaperSize", printerConfigInfo, "A4"));
            let orientation: number = Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "Orientation", printerConfigInfo, 1));

            let width = new RefWrapper(Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "PaperWidth", printerConfigInfo, 210)));
            let height = new RefWrapper(Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "PaperLength", printerConfigInfo, 297)));

            return cPrintAPI.getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
        }

        public static getcPrinterFromDefaultPrinter(printDialog: PrintDialog) {
            let deviceName = new RefWrapper("");
            let driverName = new RefWrapper("");
            let port = new RefWrapper("");
            let paperSize = new RefWrapper(0);
            let orientation = new RefWrapper(0);
            let width = new RefWrapper(0);
            let height = new RefWrapper(0);

            this.getDefaultPrinter(deviceName, driverName, port, paperSize, orientation, width, height);

            if (deviceName.get() !== "") {
                return this.getcPrint(printDialog, deviceName.get(), driverName.get(), port.get(),
                    orientation.get(), paperSize.get(), width, height);
            }
            else {
                return null;
            }
        }

        public static printerPaperBinNameToId(p: string, p_2: string, paperBin: string): number {
            throw new NotImplementedException();
        }

        public static getDefaultPrinter(deviceName: RefWrapper<string>,
                                        driverName: RefWrapper<string>,
                                        port: RefWrapper<string>,
                                        paperSize: RefWrapper<number>,
                                        orientation: RefWrapper<number>,
                                        width: RefWrapper<number>,
                                        height: RefWrapper<number>) {

            let settings: PrinterSettings = new PrinterSettings();

            deviceName.set(settings.getPrinterName());

            let printerInfo: object = cPrintWMI.getPrinterInfoFromWMI(deviceName.get());

            driverName.set(cPrintWMI.getPrinterInfoValueFromWMI("DriverName", printerInfo, "") as string);
            port.set(cPrintWMI.getPrinterInfoValueFromWMI("PortName", printerInfo, "") as string);

            let printerConfigInfo: object = cPrintWMI.getPrinterConfigInfoFromWMI(settings.getPrinterName());

            paperSize.set(this.getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                "PaperSize", printerConfigInfo, "A4").toString()));
            orientation.set(Math.trunc(Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                            "Orientation", printerConfigInfo, 1))));

            width.set(Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                                "PaperWidth", printerConfigInfo, 210)));
            height.set(Utils.valInt(cPrintWMI.getPrinterConfigInfoValueFromWMI(
                                "PaperLength", printerConfigInfo, 297)));

            if (width.get() === 0 || height.get()  === 0 || paperSize.get()  === 99) {
                if (paperSize.get()  === 99 /*UNKNOWN*/) paperSize.set(1); /*LETTER*/

                this.getSizeFromPaperSize(paperSize.get(), orientation.get(), width, height);
            }
        }

        private static getSizeFromPaperSize(paperSize: csReportPaperType,
                                            orientation: number,
                                            width: RefWrapper<number>,
                                            height: RefWrapper<number>) {
            switch (paperSize)
            {
                case csReportPaperType.CS_RPT_PAPER_TYPE_LETTER:
                    height.set(279);
                    width.set(216);
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_LEGAL:
                    height.set(356);
                    width.set(216);
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A4:
                    height.set(297);
                    width.set(210);
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A3:
                    height.set(420);
                    width.set(297);
                    break;

                default:
                    height.set(0);
                    width.set(0);
                    break;
            }

            if (orientation === csRptPageOrientation.LANDSCAPE) {
                const tmp = height.get();
                height.set(width.get());
                width.set(tmp);
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
