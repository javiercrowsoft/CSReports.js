(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCPrintAPI = function() {

        const self = {}; //@@@: public class cPrintAPI
        self.showPrintDialog = function( //@@@: internal static bool showPrintDialog(
            printDialog,  //@@@: PrintDialog printDialog,
            deviceName,  //@@@: ref string deviceName,
            driverName,  //@@@: ref string driverName,
            port,  //@@@: ref string port,
            paperSize,  //@@@: ref csReportPaperType paperSize,
            orientation,  //@@@: ref int orientation,
            fromPage,  //@@@: ref int fromPage,
            toPage,  //@@@: ref int toPage,
            copies,  //@@@: ref int copies,
            paperBin) { //@@@: ref int paperBin)
            printDialog.AllowSomePages = true; //@@@: printDialog.AllowSomePages = true;
            let settings = printDialog.PrinterSettings; //@@@: var settings = printDialog.PrinterSettings;
            settings.PrinterName = deviceName; //@@@: settings.PrinterName = deviceName;
            settings.FromPage = fromPage; //@@@: settings.FromPage = fromPage;
            settings.ToPage = toPage; //@@@: settings.ToPage = toPage;
            settings.Copies = copies; //@@@: settings.Copies = (short)copies;
            if (printDialog.ShowDialog() === DialogResult.OK) { //@@@: if (printDialog.ShowDialog() == DialogResult.OK)
                deviceName = settings.PrinterName; //@@@: deviceName = settings.PrinterName;
                fromPage = settings.FromPage; //@@@: fromPage = settings.FromPage;
                toPage = settings.ToPage; //@@@: toPage = settings.ToPage;
                copies = settings.Copies; //@@@: copies = settings.Copies;
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.printerSetPaperBin = function(m_deviceName, m_oldPaperBin) { //@@@: internal static void printerSetPaperBin(string m_deviceName, int m_oldPaperBin)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.endDoc = function(m_hDC) { //@@@: internal static int endDoc(int m_hDC)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getcPrint = function( //@@@: internal static cPrinter getcPrint(
            printDialog,  //@@@: PrintDialog printDialog,
            deviceName,  //@@@: string deviceName,
            driverName,  //@@@: string driverName,
            port,  //@@@: string port,
            orientation,  //@@@: int orientation,
            paperSize,  //@@@: int paperSize,
            width,  //@@@: int width,
            height) { //@@@: int height)
            let o = new cPrinter(printDialog); //@@@: cPrinter o = new cPrinter(printDialog);

            o.setDeviceName(deviceName); //@@@: o.setDeviceName(deviceName);
            o.setDriverName(driverName); //@@@: o.setDriverName(driverName);
            o.setPort(port); //@@@: o.setPort(port);

            let paperInfo = o.getPaperInfo(); //@@@: cReportPaperInfo paperInfo = o.getPaperInfo();

            paperInfo.setOrientation(orientation); //@@@: paperInfo.setOrientation(orientation);
            paperInfo.setPaperSize(paperSize); //@@@: paperInfo.setPaperSize((csReportPaperType)paperSize);

            if (width === 0 || height === 0) { //@@@: if (width == 0 || height == 0)
                getSizeFromPaperSize(paperSize, orientation, width, height); //@@@: getSizeFromPaperSize((csReportPaperType)paperSize, orientation, out width, out height);
            } //@@@: }

            paperInfo.setWidth(width); //@@@: paperInfo.setWidth(width);
            paperInfo.setHeight(height); //@@@: paperInfo.setHeight(height);
            return o; //@@@: return o;
        }; //@@@: }

        self.getcPrint = function(printDialog, deviceName, driverName, port) { //@@@: internal static cPrinter getcPrint(PrintDialog printDialog, string deviceName, string driverName, string port)
            let printerConfigInfo = cPrintWMI.getPrinterConfigInfoFromWMI(deviceName); //@@@: object printerConfigInfo = cPrintWMI.getPrinterConfigInfoFromWMI(deviceName);

            let paperSize = getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string); //@@@: int paperSize = getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string);
            let orientation = cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1); //@@@: int orientation = (int)cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1);

            let width = cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210); //@@@: int width = (int)cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210);
            let height = cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297); //@@@: int height = (int)cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297);

            return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height); //@@@: return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
        }; //@@@: }

        self.getcPrinterFromDefaultPrinter = function(printDialog) { //@@@: public static cPrinter getcPrinterFromDefaultPrinter(PrintDialog printDialog)
            let deviceName = ""; //@@@: String deviceName = "";
            let driverName = ""; //@@@: String driverName = "";
            let port = ""; //@@@: String port = "";
            let paperSize = 0; //@@@: int paperSize = 0;
            let orientation = 0; //@@@: int orientation = 0;
            let width = 0; //@@@: int width = 0;
            let height = 0; //@@@: int height = 0;

            getDefaultPrinter(deviceName, driverName, port, paperSize, orientation, width, height); //@@@: getDefaultPrinter(out deviceName, out driverName, out port, out paperSize, out orientation, out width, out height);

            if (deviceName !== "") { //@@@: if (deviceName != "")
                return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height); //@@@: return getcPrint(printDialog, deviceName, driverName, port, orientation, paperSize, width, height);
            } //@@@: }
            else { //@@@: else
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }

        self.printerPaperBinNameToId = function(p, p_2, paperBin) { //@@@: internal static int printerPaperBinNameToId(string p, string p_2, string paperBin)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.getDefaultPrinter = function( //@@@: public static void getDefaultPrinter(
            deviceName, driverName, port,  //@@@: out String deviceName, out String driverName, out String port,
            paperSize, orientation, width, height) { //@@@: out int paperSize, out int orientation, out int width, out int height)
            let settings = new PrinterSettings(); //@@@: PrinterSettings settings = new PrinterSettings();

            deviceName = settings.PrinterName; //@@@: deviceName = settings.PrinterName;

            let printerInfo = cPrintWMI.getPrinterInfoFromWMI(settings.PrinterName); //@@@: object printerInfo = cPrintWMI.getPrinterInfoFromWMI(settings.PrinterName);

            driverName = cPrintWMI.getPrinterInfoValueFromWMI("DriverName", printerInfo, "") as string; //@@@: driverName = cPrintWMI.getPrinterInfoValueFromWMI("DriverName", printerInfo, "") as string;
            port = cPrintWMI.getPrinterInfoValueFromWMI("PortName", printerInfo, "") as string; //@@@: port = cPrintWMI.getPrinterInfoValueFromWMI("PortName", printerInfo, "") as string;

            let printerConfigInfo = cPrintWMI.getPrinterConfigInfoFromWMI(settings.PrinterName); //@@@: object printerConfigInfo = cPrintWMI.getPrinterConfigInfoFromWMI(settings.PrinterName);

            paperSize = getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string); //@@@: paperSize = getPaperSizeFromSizeName(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperSize", printerConfigInfo, "A4") as string);
            orientation = Convert.ToInt32(cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1)); //@@@: orientation = Convert.ToInt32(cPrintWMI.getPrinterConfigInfoValueFromWMI("Orientation", printerConfigInfo, 1));

            width = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210)); //@@@: width = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperWidth", printerConfigInfo, 210));
            height = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297)); //@@@: height = cUtil.valAsInt(cPrintWMI.getPrinterConfigInfoValueFromWMI("PaperLength", printerConfigInfo, 297));

            if (width === 0 || height === 0 || paperSize === 99) { //@@@: if (width == 0 || height == 0 || paperSize == 99)
                if (paperSize === 99 /*UNKNOWN*/) paperSize = 1; /*LETTER*/ //@@@: if (paperSize == 99 /*UNKNOWN*/) paperSize = 1; /*LETTER*/

                getSizeFromPaperSize(paperSize, orientation, width, height); //@@@: getSizeFromPaperSize((csReportPaperType)paperSize, orientation, out width, out height);
            } //@@@: }
        }; //@@@: }

        const getSizeFromPaperSize = function(paperSize, orientation, width, height) { //@@@: private static void getSizeFromPaperSize(csReportPaperType paperSize, int orientation, out int width, out int height)
            switch (paperSize) //@@@: switch (paperSize)
            { //@@@: {
                case csReportPaperType.CSRPTPAPERTYPELETTER: //@@@: case csReportPaperType.CSRPTPAPERTYPELETTER:
                    height = 279; //@@@: height = 279;
                    width = 216; //@@@: width = 216;
                    break; //@@@: break;

                case csReportPaperType.CSRPTPAPERTYPELEGAL: //@@@: case csReportPaperType.CSRPTPAPERTYPELEGAL:
                    height = 356; //@@@: height = 356;
                    width = 216; //@@@: width = 216;
                    break; //@@@: break;

                case csReportPaperType.CSRPTPAPERTYPEA4: //@@@: case csReportPaperType.CSRPTPAPERTYPEA4:
                    height = 297; //@@@: height = 297;
                    width = 210; //@@@: width = 210;
                    break; //@@@: break;

                case csReportPaperType.CSRPTPAPERTYPEA3: //@@@: case csReportPaperType.CSRPTPAPERTYPEA3:
                    height = 420; //@@@: height = 420;
                    width = 297; //@@@: width = 297;
                    break; //@@@: break;

                default: //@@@: default:
                    height = 0; //@@@: height = 0;
                    width = 0; //@@@: width = 0;
                    break; //@@@: break;
            } //@@@: }

            if (orientation === csRptPageOrientation.LANDSCAPE) { //@@@: if (orientation == (int)csRptPageOrientation.LANDSCAPE)
                let tmp = 0; //@@@: int tmp = 0;
                tmp = height; //@@@: tmp = height;
                height = width; //@@@: height = width;
                width = tmp; //@@@: width = tmp;
            } //@@@: }
        }; //@@@: }

        const getPaperSizeFromSizeName = function(sizeName) { //@@@: private static int getPaperSizeFromSizeName(string sizeName)
UNKNOWN >>             int size; //@@@: int size;
            switch (sizeName.ToLower()) {  //@@@: switch (sizeName.ToLower()) {
                case "a4": //@@@: case "a4":
                    size = csReportPaperType.CSRPTPAPERTYPEA4; //@@@: size = (int)csReportPaperType.CSRPTPAPERTYPEA4;
                    break; //@@@: break;
                case "letter": //@@@: case "letter":
                    size = csReportPaperType.CSRPTPAPERTYPELETTER; //@@@: size = (int)csReportPaperType.CSRPTPAPERTYPELETTER;
                    break; //@@@: break;
                case "legal": //@@@: case "legal":
                    size = csReportPaperType.CSRPTPAPERTYPELEGAL; //@@@: size = (int)csReportPaperType.CSRPTPAPERTYPELEGAL;
                    break; //@@@: break;
                default: //@@@: default:
                    size = csReportPaperType.CSRPTPAPERUSER; //@@@: size = (int)csReportPaperType.CSRPTPAPERUSER;
                    break; //@@@: break;
            } //@@@: }
            return size; //@@@: return size;
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
