(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createG = function() {

        const self = {};
        self.isNumeric = function(value) {
            double dummyNumber; {
            return Double.TryParse(value, dummyNumber);
        };

        // bytes

        self.redim = function(vBytes, size) {
            vBytes =  globalObject.CSReportDll.createByte[size];
        };

        self.redimPreserve = function(vBytes, size) {
            if (size === 0) {
                vBytes =  globalObject.CSReportDll.createByte[0];
            }
            else {
                if (vBytes === null) {
                    vBytes =  globalObject.CSReportDll.createByte[size];
                }
                else if (vBytes.Length === 0) {
                    vBytes =  globalObject.CSReportDll.createByte[size];
                }
                else {
                    let newArray: byte[]= new byte[size];
                    Array.Copy(vBytes, newArray, vBytes.Length);
                    vBytes = newArray;
                }
            }
        };

        // objects

        self.redim = function(vObjects, size) {
            vObjects =  globalObject.CSReportDll.createObject[size];
        };

        self.redimPreserve = function(vObjects, size) {
            if (size === 0) {
                vObjects =  globalObject.CSReportDll.createObject[size];
            }
            else {
                if (vObjects === null) {
                    vObjects =  globalObject.CSReportDll.createObject[size];
                }
                else if (vObjects.Length === 0) {
                    vObjects =  globalObject.CSReportDll.createObject[size];
                }
                else {
                    let newArray: object[]= new object[size];
                    Array.Copy(vObjects, newArray, vObjects.Length);
                    vObjects = newArray;
                }
            }
        };

        // strings

        self.redim = function(vStrings, size) {
            vStrings =  globalObject.CSReportDll.createString[size];
        };

        self.redim = function(String[, vStrings, size1, size2) {
            vStrings =  globalObject.CSReportDll.createString[size1, size2];
        };

        self.redimPreserve = function(vStrings, size) {
            if (size === 0) {
                vStrings =  globalObject.CSReportDll.createString[0];
            }
            else {
                if (vStrings === null) {
                    vStrings =  globalObject.CSReportDll.createString[size];
                }
                else if (vStrings.Length === 0) {
                    vStrings =  globalObject.CSReportDll.createString[size];
                }
                else {
                    let newArray: String[]= new String[size];
                    Array.Copy(vStrings, newArray, Math.Min(size, vStrings.Length));
                    vStrings = newArray;
                }
            }
        };

        // ints

        self.redim = function(vInts, size) {
            vInts =  globalObject.CSReportDll.createInt[size];
        };

        self.redimPreserve = function(vInts, size) {
            if (size === 0) {
                vInts =  globalObject.CSReportDll.createInt[0];
            }
            else {
                if (vInts === null) {
                    vInts =  globalObject.CSReportDll.createInt[size];
                }
                else if (vInts.Length === 0) {
                    vInts =  globalObject.CSReportDll.createInt[size];
                }
                else {
                    let newArray: int[]= new int[size];
                    Array.Copy(vInts, newArray, vInts.Length);
                    vInts = newArray;
                }
            }
        };

        // floats

        self.redim = function(vFloats, size) {
            vFloats =  globalObject.CSReportDll.createFloat[size];
        };

        self.redimPreserve = function(vFloats, size) {
            if (size === 0) {
                vFloats =  globalObject.CSReportDll.createFloat[0];
            }
            else {
                if (vFloats === null) {
                    vFloats =  globalObject.CSReportDll.createFloat[size];
                }
                else if (vFloats.Length === 0) {
                    vFloats =  globalObject.CSReportDll.createFloat[size];
                }
                else {
                    let newArray: float[]= new float[size];
                    Array.Copy(vFloats, newArray, vFloats.Length);
                    vFloats = newArray;
                }
            }
        };

        // DataTables

        self.redim = function(vDataTables, size) {
            vDataTables =  globalObject.CSReportDll.createDataTable[size];
        };

        self.redimPreserve = function(vDataTables, size) {
            if (size === 0) {
                vDataTables =  globalObject.CSReportDll.createDataTable[0];
            }
            else {
                if (vDataTables === null) {
                    vDataTables =  globalObject.CSReportDll.createDataTable[size];
                }
                else if (vDataTables.Length === 0) {
                    vDataTables =  globalObject.CSReportDll.createDataTable[size];
                }
                else {
                    let newArray: DataTable[]= new DataTable[size];
                    Array.Copy(vDataTables, newArray, vDataTables.Length);
                    vDataTables = newArray;
                }
            }
        };

        return self;

    }

}(globalObject));
