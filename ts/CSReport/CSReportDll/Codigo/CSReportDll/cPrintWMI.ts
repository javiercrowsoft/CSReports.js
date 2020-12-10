(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCPrintWMI = function() {

        // @ts-ignore
        let self: CSReportDll.IcPrintWMI = {};
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
        };
        return self;

    }    }
}(globalObject));


namespace CSReportDll {

  export interface IcPrintWMI {

    getPrinterInfoValueFromWMI: (string, object, object) => object;
    getPrinterInfoValueFromWMI: (string, string, object) => object;
    getPrinterConfigInfoValueFromWMI: (string, object, object) => object;
    getPrinterConfigInfoValueFromWMI: (string, string, object) => object;
    getPrinterInfoFromWMI: (string) => object;
    getPrinterConfigInfoFromWMI: (string) => object;
  }
}
