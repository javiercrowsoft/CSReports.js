namespace CSReportEngine {

    export class cPrintWMI {

        public static getPrinterInfoValueFromWMI(propertyName: string, printerInfo: object, defaultValue: string) {
            // TODO: implement
            return "";
        }

        public static getPrinterInfoValueFromWMI2(printerName: string, propertyName: string, defaultValue: string) {
            return this.getPrinterInfoValueFromWMI(propertyName, this.getPrinterInfoFromWMI(printerName), defaultValue);
        }

        public static getPrinterConfigInfoValueFromWMI(propertyName: string, printerInfo: object, defaultValue: number|string) {
            return this.getPrinterInfoValueFromWMI(propertyName, printerInfo, defaultValue.toString());
        }

        public static getPrinterConfigInfoValueFromWMI2(printerName: string, propertyName: string, defaultValue: string) {
            return this.getPrinterInfoValueFromWMI(propertyName, cPrintWMI.getPrinterConfigInfoFromWMI(printerName), defaultValue);
        }

        public static getPrinterInfoFromWMI(printerName: string) {
            return this.getInfoFromWMI("Win32_Printer", printerName);
        }

        public static getPrinterConfigInfoFromWMI(printerName: string) {
            return this.getInfoFromWMI("Win32_PrinterConfiguration", printerName);
        }

        //
        // generic query function
        //
        private static getInfoFromWMI(tableName: string, objectName: string) {
            // TODO: implement
            return null;
            /*
            try {
                let query: string = string.Format("SELECT * from {0} WHERE Name = '{1}'", tableName, objectName);
                let searcher: ManagementObjectSearcher = new ManagementObjectSearcher(query);
                let coll: ManagementObjectCollection = searcher.Get();

                for(let i_ = 0; i_ < coll.length; i_++) {
                    return printer;
                }
                return null;
            }
            catch(ex) {
                return null;
            }
             */
        }


    }
}
