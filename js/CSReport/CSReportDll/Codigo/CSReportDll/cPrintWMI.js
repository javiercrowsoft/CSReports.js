(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
UNKNOWN >>     class cPrintWMI //@@@: class cPrintWMI
    { //@@@: {
        //
        // printer properties
        //

        //
        // used when we need more than one property
        //
        // first call getPrinterInfoFromWMI to get a printerInfo object ( ManagementObject )
        // then call this function one time for each property you need to access
        //
        self.getPrinterInfoValueFromWMI = function(propertyName, printerInfo, defaultValue) { //@@@: public static object getPrinterInfoValueFromWMI(string propertyName, object printerInfo, object defaultValue)
            let printer = printerInfo as ManagementObject; //@@@: ManagementObject printer = printerInfo as ManagementObject;
            const  = function(null) { //@@@: if (printer != null)
                const  = function(in) { //@@@: foreach (PropertyData property in printer.Properties)
                    //Console.WriteLine(string.Format("{0}: {1}", property.Name, property.Value));
                    const  = function() { //@@@: if (propertyName.Equals(property.Name))
                        return property.Value; //@@@: return property.Value;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            return defaultValue; //@@@: return defaultValue;
        }; //@@@: }

        //
        // used when we need only one property
        //
        self.getPrinterInfoValueFromWMI = function(printerName, propertyName, defaultValue) { //@@@: public static object getPrinterInfoValueFromWMI(string printerName, string propertyName, object defaultValue)
            return getPrinterInfoValueFromWMI(propertyName, getPrinterInfoFromWMI(printerName), defaultValue); //@@@: return getPrinterInfoValueFromWMI(propertyName, getPrinterInfoFromWMI(printerName), defaultValue);
        }; //@@@: }

        //
        // printer configuration properties
        //

        //
        // used when we need more than one property
        //
        // first call getPrinterConfigInfoFromWMI to get a printerInfo object ( ManagementObject )
        // then call this function one time for each property you need to access
        //
        self.getPrinterConfigInfoValueFromWMI = function(propertyName, printerInfo, defaultValue) { //@@@: public static object getPrinterConfigInfoValueFromWMI(string propertyName, object printerInfo, object defaultValue)
            return getPrinterInfoValueFromWMI(propertyName, printerInfo, defaultValue); //@@@: return getPrinterInfoValueFromWMI(propertyName, printerInfo, defaultValue);
        }; //@@@: }

        //
        // used when we need only one property
        //
        self.getPrinterConfigInfoValueFromWMI = function(printerName, propertyName, defaultValue) { //@@@: public static object getPrinterConfigInfoValueFromWMI(string printerName, string propertyName, object defaultValue)
            return getPrinterInfoValueFromWMI(propertyName, getPrinterConfigInfoFromWMI(printerName), defaultValue); //@@@: return getPrinterInfoValueFromWMI(propertyName, getPrinterConfigInfoFromWMI(printerName), defaultValue);
        }; //@@@: }

        //
        // printer and printer config query functions
        //

        self.getPrinterInfoFromWMI = function(printerName) { //@@@: public static object getPrinterInfoFromWMI(string printerName)
            return getInfoFromWMI("Win32_Printer", printerName); //@@@: return getInfoFromWMI("Win32_Printer", printerName);
        }; //@@@: }

        self.getPrinterConfigInfoFromWMI = function(printerName) { //@@@: public static object getPrinterConfigInfoFromWMI(string printerName)
            return getInfoFromWMI("Win32_PrinterConfiguration", printerName); //@@@: return getInfoFromWMI("Win32_PrinterConfiguration", printerName);
        }; //@@@: }

        //
        // generic query function
        //
        const getInfoFromWMI = function(tableName, objectName) { //@@@: private static object getInfoFromWMI(string tableName, string objectName)
            try { //@@@: try
                let query = string.Format("SELECT * from {0} WHERE Name = '{1}'", tableName, objectName); //@@@: string query = string.Format("SELECT * from {0} WHERE Name = '{1}'", tableName, objectName);
                let searcher = new ManagementObjectSearcher(query); //@@@: ManagementObjectSearcher searcher = new ManagementObjectSearcher(query);
                let coll = searcher.Get(); //@@@: ManagementObjectCollection coll = searcher.Get();

                const  = function(in) { //@@@: foreach (ManagementObject printer in coll)
                    return printer; //@@@: return printer;
                } //@@@: }
                return null; //@@@: return null;
            } //@@@: }
            const  = function(ex) { //@@@: catch (System.NotImplementedException ex) {
                return null; //@@@: return null;
            } //@@@: }
        }; //@@@: }
    } //@@@: }
} //@@@: }
