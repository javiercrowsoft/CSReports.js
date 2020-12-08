(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCPrintAPI = function() {

        const self = {};
        self.showPrintDialog = function(
            printDialog, 
            deviceName, 
            driverName, 
            port, 
            paperSize, 
            orientation, 
            fromPage, 
            toPage, 
            copies, 
            paperBin) {
            printDialog.AllowSomePages = true;
            let settings: var= printDialog.PrinterSettings;
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
        };

        self.printerSetPaperBin = function(m_deviceName, m_oldPaperBin) {
            throw new NotImplementedException();
        };

        self.endDoc = function(m_hDC) {
            throw new NotImplementedException();
        };

        self.getcPrint = function(
            printDialog, 
            deviceName, 
            driverName, 
            port, 
            orientation, 
            paperSize, 
            width, 
            height) {
            let o: cPrinter= new cPrinter(printDialog);

            o.setDeviceName(deviceName);
            o.setDriverName(driverName);
            o.setPort(port);

            let paperInfo: cReportPaperInfo= o.getPaperInfo();

            paperInfo.setOrientation(orientation);
            paperInfo.setPaperSize(paperSize);

            if (width === 0 || height === 0) {
                getSizeFromPaperSize(paperSize, orientation, width, height);
            }

            paperInfo.setWidth(width);
            paperInfo.setHeight(height);
            return o;
        };

        self.getcPrint = function(printDialog, deviceName, driverName, port) {
            let printerConfigInfo: object= cPrintWMI.getPrinterConfigInfoFromWMI(deviceName);

            let paperSize: number= getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string);
            let orientation: number= cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1);

            let width: number= cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210);
            let height: number= cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297);

            return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
        };

        self.getcPrinterFromDefaultPrinter = function(printDialog) {
            let deviceName: string= "";
            let driverName: string= "";
            let port: string= "";
            let paperSize: number= 0;
            let orientation: number= 0;
            let width: number= 0;
            let height: number= 0;

            getDefaultPrinter(deviceName, driverName, port, paperSize, orientation, width, height);

            if (deviceName !== "") {
                return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
            }
            else {
                return null;
            }
        };

        self.printerPaperBinNameToId = function(p, p_2, paperBin) {
            throw new NotImplementedException();
        };

        self.getDefaultPrinter = function(
            deviceName, driverName, port, 
            paperSize, orientation, width, height) {
            let settings: PrinterSettings= new PrinterSettings();

            deviceName = settings.PrinterName;

            let printerInfo: object= cPrintWMI.getPrinterInfoFromWMI(settings.PrinterName);

            driverName = cPrintWMI.getPrinterInfoValueFromWMI("DriverName", printerInfo, "") as string;
            port = cPrintWMI.getPrinterInfoValueFromWMI("PortName", printerInfo, "") as string;

            let printerConfigInfo: object= cPrintWMI.getPrinterConfigInfoFromWMI(settings.PrinterName);

            paperSize = getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string);
            orientation = Convert.ToInt32(cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1));

            width = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210));
            height = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297));

            if (width === 0 || height === 0 || paperSize === 99) {
                if (paperSize === 99 /*UNKNOWN*/) paperSize = 1; /*LETTER*/

                getSizeFromPaperSize(paperSize, orientation, width, height);
            }
        };

        const getSizeFromPaperSize = function(paperSize, orientation, width, height) {
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
                let tmp: number= 0;
                tmp = height;
                height = width;
                width = tmp;
            }
        };

        const getPaperSizeFromSizeName = function(sizeName) {
UNKNOWN >>             int size;
            switch (sizeName.ToLower()) { 
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
        };

        return self;

    }
}(globalObject));
