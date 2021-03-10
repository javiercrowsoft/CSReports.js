

namespace CSReportDll
{
    export class cPrintAPI {


    {
        public showPrintDialog(
            printDialog: PrintDialog
            deviceName: string
            driverName: string
            port: string
            paperSize: csReportPaperType
            orientation: number
            fromPage: number
            toPage: number
            copies: number
            paperBin: number) {
            printDialog.AllowSomePages = true;
            let settings: var = printDialog.PrinterSettings;
            settings.PrinterName = deviceName;
            settings.FromPage = fromPage;
            settings.ToPage = toPage;
            settings.Copies = copies;
            if (printDialog.ShowDialog() === DialogResult.OK) {
                deviceName = settings.PrinterName;
                fromPage = settings.FromPage;
                toPage = settings.ToPage;
                copies = settings.Copies;
                return true;
            }
            else {
                return false;
            }
        }

        public printerSetPaperBin(this.deviceName: string, this.oldPaperBin: number) {
            throw new NotImplementedException();
        }

        public endDoc(this.hDC: number) {
            throw new NotImplementedException();
        }

        public getcPrint(
            printDialog: PrintDialog
            deviceName: string
            driverName: string
            port: string
            orientation: number
            paperSize: number
            width: number
            height: number) {
            let o: cPrinter = new cPrinter(printDialog);

            o.setDeviceName(deviceName);
            o.setDriverName(driverName);
            o.setPort(port);

            let paperInfo: cReportPaperInfo = o.getPaperInfo();

            paperInfo.setOrientation(orientation);
            paperInfo.setPaperSize(paperSize);

            if (width === 0 || height === 0) {
                getSizeFromPaperSize(paperSize, orientation, width, height);
            }

            paperInfo.setWidth(width);
            paperInfo.setHeight(height);
            return o;
        }

        public getcPrint(printDialog: PrintDialog, deviceName: string, driverName: string, port: string) {
            let printerConfigInfo: object = cPrintWMI.getPrinterConfigInfoFromWMI(deviceName);

            let paperSize: number = getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string);
            let orientation: number = cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1);

            let width: number = cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210);
            let height: number = cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297);

            return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
        }

        public getcPrinterFromDefaultPrinter(printDialog: PrintDialog) {
            let deviceName: string = "";
            let driverName: string = "";
            let port: string = "";
            let paperSize: number = 0;
            let orientation: number = 0;
            let width: number = 0;
            let height: number = 0;

            getDefaultPrinter(deviceName, driverName, port, paperSize, orientation, width, height);

            if (deviceName !== "") {
                return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
            }
            else {
                return null;
            }
        }

        public printerPaperBinNameToId(p: string, p_2: string, paperBin: string) {
            throw new NotImplementedException();
        }

        public getDefaultPrinter(
            deviceName: string, driverName: string, port: string
            paperSize: number, orientation: number, width: number, height: number) {
            let settings: PrinterSettings = new PrinterSettings();

            deviceName = settings.PrinterName;

            let printerInfo: object = cPrintWMI.getPrinterInfoFromWMI(settings.PrinterName);

            driverName = cPrintWMI.getPrinterInfoValueFromWMI("DriverName", printerInfo, "") as string;
            port = cPrintWMI.getPrinterInfoValueFromWMI("PortName", printerInfo, "") as string;

            let printerConfigInfo: object = cPrintWMI.getPrinterConfigInfoFromWMI(settings.PrinterName);

            paperSize = getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string);
            orientation = Convert.ToInt32(cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1));

            width = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210));
            height = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297));

            if (width === 0 || height === 0 || paperSize === 99) {
                if (paperSize === 99 /*UNKNOWN*/) paperSize = 1; /*LETTER*/

                getSizeFromPaperSize(paperSize, orientation, width, height);
            }
        }

        private getSizeFromPaperSize(paperSize: csReportPaperType, orientation: number, width: number, height: number) {
            switch (paperSize)
            {
                case csReportPaperType.CSRPTPAPERTYPELETTER:
                    height = 279;
                    width = 216;
                    break;

                case csReportPaperType.CSRPTPAPERTYPELEGAL:
                    height = 356;
                    width = 216;
                    break;

                case csReportPaperType.CSRPTPAPERTYPEA4:
                    height = 297;
                    width = 210;
                    break;

                case csReportPaperType.CSRPTPAPERTYPEA3:
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

        private getPaperSizeFromSizeName(sizeName: string) {
UNKNOWN >>             int size;
            switch (sizeName.toLowerCase()) {
                case "a4":
                    size = csReportPaperType.CSRPTPAPERTYPEA4;
                    break;
                case "letter":
                    size = csReportPaperType.CSRPTPAPERTYPELETTER;
                    break;
                case "legal":
                    size = csReportPaperType.CSRPTPAPERTYPELEGAL;
                    break;
                default:
                    size = csReportPaperType.CSRPTPAPERUSER;
                    break;
            }
            return size;
        }



    } 
}
