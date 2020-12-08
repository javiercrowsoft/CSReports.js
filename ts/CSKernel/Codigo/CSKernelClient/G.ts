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
            vBytes = new byte[size];
        };

        self.redimPreserve = function(vBytes, size) {
            if (size === 0) {
                vBytes = new byte[0];
            }
            else {
                if (vBytes === null) {
                    vBytes = new byte[size];
                }
                else if (vBytes.Length === 0) {
                    vBytes = new byte[size];
                }
                else {
                    let newArray = new byte[size];
                    Array.Copy(vBytes, newArray, vBytes.Length);
                    vBytes = newArray;
                }
            }
        };

        // objects

        self.redim = function(vObjects, size) {
            vObjects = new object[size];
        };

        self.redimPreserve = function(vObjects, size) {
            if (size === 0) {
                vObjects = new object[size];
            }
            else {
                if (vObjects === null) {
                    vObjects = new object[size];
                }
                else if (vObjects.Length === 0) {
                    vObjects = new object[size];
                }
                else {
                    let newArray = new object[size];
                    Array.Copy(vObjects, newArray, vObjects.Length);
                    vObjects = newArray;
                }
            }
        };

        // strings

        self.redim = function(vStrings, size) {
            vStrings = new String[size];
        };

        self.redim = function(String[, vStrings, size1, size2) {
            vStrings = new String[size1, size2];
        };

        self.redimPreserve = function(vStrings, size) {
            if (size === 0) {
                vStrings = new String[0];
            }
            else {
                if (vStrings === null) {
                    vStrings = new String[size];
                }
                else if (vStrings.Length === 0) {
                    vStrings = new String[size];
                }
                else {
                    let newArray = new String[size];
                    Array.Copy(vStrings, newArray, Math.Min(size, vStrings.Length));
                    vStrings = newArray;
                }
            }
        };

        // ints

        self.redim = function(vInts, size) {
            vInts = new int[size];
        };

        self.redimPreserve = function(vInts, size) {
            if (size === 0) {
                vInts = new int[0];
            }
            else {
                if (vInts === null) {
                    vInts = new int[size];
                }
                else if (vInts.Length === 0) {
                    vInts = new int[size];
                }
                else {
                    let newArray = new int[size];
                    Array.Copy(vInts, newArray, vInts.Length);
                    vInts = newArray;
                }
            }
        };

        // floats

        self.redim = function(vFloats, size) {
            vFloats = new float[size];
        };

        self.redimPreserve = function(vFloats, size) {
            if (size === 0) {
                vFloats = new float[0];
            }
            else {
                if (vFloats === null) {
                    vFloats = new float[size];
                }
                else if (vFloats.Length === 0) {
                    vFloats = new float[size];
                }
                else {
                    let newArray = new float[size];
                    Array.Copy(vFloats, newArray, vFloats.Length);
                    vFloats = newArray;
                }
            }
        };

        // DataTables

        self.redim = function(vDataTables, size) {
            vDataTables = new DataTable[size];
        };

        self.redimPreserve = function(vDataTables, size) {
            if (size === 0) {
                vDataTables = new DataTable[0];
            }
            else {
                if (vDataTables === null) {
                    vDataTables = new DataTable[size];
                }
                else if (vDataTables.Length === 0) {
                    vDataTables = new DataTable[size];
                }
                else {
                    let newArray = new DataTable[size];
                    Array.Copy(vDataTables, newArray, vDataTables.Length);
                    vDataTables = newArray;
                }
            }
        };

        return self;

    }

}(globalObject));
