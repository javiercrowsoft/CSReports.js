(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

UNKNOWN >>     class cPrintWMI
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
        self.getPrinterInfoValueFromWMI = function(propertyName, printerInfo, defaultValue) {
            let printer: ManagementObject= printerInfo as ManagementObject;
            const  = function(null) {
                const  = function(in) {
                    //Console.WriteLine(string.Format("{0}: {1}", property.Name, property.Value));
                    const  = function() {
                        return property.Value;
                    }
                }
            }
            return defaultValue;
        };

        //
        // used when we need only one property
        //
        self.getPrinterInfoValueFromWMI = function(printerName, propertyName, defaultValue) {
            return getPrinterInfoValueFromWMI(propertyName, getPrinterInfoFromWMI(printerName), defaultValue);
        };

        //
        // printer configuration properties
        //

        //
        // used when we need more than one property
        //
        // first call getPrinterConfigInfoFromWMI to get a printerInfo object ( ManagementObject )
        // then call this function one time for each property you need to access
        //
        self.getPrinterConfigInfoValueFromWMI = function(propertyName, printerInfo, defaultValue) {
            return getPrinterInfoValueFromWMI(propertyName, printerInfo, defaultValue);
        };

        //
        // used when we need only one property
        //
        self.getPrinterConfigInfoValueFromWMI = function(printerName, propertyName, defaultValue) {
            return getPrinterInfoValueFromWMI(propertyName, getPrinterConfigInfoFromWMI(printerName), defaultValue);
        };

        //
        // printer and printer config query functions
        //

        self.getPrinterInfoFromWMI = function(printerName) {
            return getInfoFromWMI("Win32_Printer", printerName);
        };

        self.getPrinterConfigInfoFromWMI = function(printerName) {
            return getInfoFromWMI("Win32_PrinterConfiguration", printerName);
        };

        //
        // generic query function
        //
        const getInfoFromWMI = function(tableName, objectName) {
            try {
                let query: string= string.Format("SELECT * from {0} WHERE Name = '{1}'", tableName, objectName);
                let searcher: ManagementObjectSearcher= new ManagementObjectSearcher(query);
                let coll: ManagementObjectCollection= searcher.Get();

                const  = function(in) {
                    return printer;
                }
                return null;
            }
            const  = function(ex) {
                return null;
            }
        };
    }
}
