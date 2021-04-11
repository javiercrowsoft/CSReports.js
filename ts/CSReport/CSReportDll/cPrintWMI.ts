namespace CSReportDll {

    export class cPrintWMI {

        public getPrinterInfoValueFromWMI(propertyName: string, printerInfo: object, defaultValue: object) {

        }

        public getPrinterInfoValueFromWMI2(printerName: string, propertyName: string, defaultValue: object) {
            return this.getPrinterInfoValueFromWMI(propertyName, this.getPrinterInfoFromWMI(printerName), defaultValue);
        }

        public getPrinterConfigInfoValueFromWMI(propertyName: string, printerInfo: object, defaultValue: object) {
            return this.getPrinterInfoValueFromWMI(propertyName, printerInfo, defaultValue);
        }

        public getPrinterConfigInfoValueFromWMI2(printerName: string, propertyName: string, defaultValue: object) {
            return this.getPrinterInfoValueFromWMI(propertyName, this.getPrinterConfigInfoFromWMI(printerName), defaultValue);
        }

        public getPrinterInfoFromWMI(printerName: string) {
            return this.getInfoFromWMI("Win32_Printer", printerName);
        }

        public getPrinterConfigInfoFromWMI(printerName: string) {
            return this.getInfoFromWMI("Win32_PrinterConfiguration", printerName);
        }

        //
        // generic query function
        //
        private getInfoFromWMI(tableName: string, objectName: string) {
            try {
                let query: string = string.Format("SELECT * from {0} WHERE Name = '{1}'", tableName, objectName);
                let searcher: ManagementObjectSearcher = new ManagementObjectSearcher(query);
                let coll: ManagementObjectCollection = searcher.Get();

                for(let i_ = 0; i_ < coll.length; i_++) {
                    return printer;
                }
                return null;
            }
            catch (ex) {
                return null;
            }
        }


    } 
}
