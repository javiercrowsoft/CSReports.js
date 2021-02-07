

namespace CSReportDll
{
    export class cPrintWMI {


    {
        //
        // printer properties
        //

        //
        // used when we need more than one property
        //
        // first call getPrinterInfoFromWMI to get a printerInfo object ( ManagementObject )
        // then call this function one time for each property you need to access
        //
        public getPrinterInfoValueFromWMI(propertyName: string, printerInfo: object, defaultValue: object) {
            let printer: ManagementObject = printerInfo as ManagementObject;
            if (printer !== null) {
                for(var i_ = 0; i_ < printer.Properties.length; i_++) {
                    //Console.WriteLine(string.Format("{0}: {1}", property.Name, property.Value));
                    if (propertyName.Equals(property.Name)) {
                        return property.Value;
                    }
                }
            }
            return defaultValue;
        }

        //
        // used when we need only one property
        //
        public getPrinterInfoValueFromWMI(printerName: string, propertyName: string, defaultValue: object) {
            return getPrinterInfoValueFromWMI(propertyName, getPrinterInfoFromWMI(printerName), defaultValue);
        }

        //
        // printer configuration properties
        //

        //
        // used when we need more than one property
        //
        // first call getPrinterConfigInfoFromWMI to get a printerInfo object ( ManagementObject )
        // then call this function one time for each property you need to access
        //
        public getPrinterConfigInfoValueFromWMI(propertyName: string, printerInfo: object, defaultValue: object) {
            return getPrinterInfoValueFromWMI(propertyName, printerInfo, defaultValue);
        }

        //
        // used when we need only one property
        //
        public getPrinterConfigInfoValueFromWMI(printerName: string, propertyName: string, defaultValue: object) {
            return getPrinterInfoValueFromWMI(propertyName, getPrinterConfigInfoFromWMI(printerName), defaultValue);
        }

        //
        // printer and printer config query functions
        //

        public getPrinterInfoFromWMI(printerName: string) {
            return getInfoFromWMI("Win32_Printer", printerName);
        }

        public getPrinterConfigInfoFromWMI(printerName: string) {
            return getInfoFromWMI("Win32_PrinterConfiguration", printerName);
        }

        //
        // generic query function
        //
        private getInfoFromWMI(tableName: string, objectName: string) {
            try {
                let query: string = string.Format("SELECT * from {0} WHERE Name = '{1}'", tableName, objectName);
                let searcher: ManagementObjectSearcher = new ManagementObjectSearcher(query);
                let coll: ManagementObjectCollection = searcher.Get();

                for(var i_ = 0; i_ < coll.length; i_++) {
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
