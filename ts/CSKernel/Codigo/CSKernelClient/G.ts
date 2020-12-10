(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {};

    globalObject.CSKernelClient.createG = function() {

        // @ts-ignore
        let self: CSKernelClient.IG = {};
        self.isNumeric = function(value) {
            double dummyNumber; {
            return Double.TryParse(value, dummyNumber);
        };

        // bytes

        self.redim = function(vBytes, size) {
            vBytes = UNKNOWN >>  can't find constructor for class byte[size];
        };

        self.redimPreserve = function(vBytes, size) {
            if (size === 0) {
                vBytes = UNKNOWN >>  can't find constructor for class byte[0];
            }
            else {
                if (vBytes === null) {
                    vBytes = UNKNOWN >>  can't find constructor for class byte[size];
                }
                else if (vBytes.Length === 0) {
                    vBytes = UNKNOWN >>  can't find constructor for class byte[size];
                }
                else {
                    let newArray: byte[] = new byte[size];
                    Array.Copy(vBytes, newArray, vBytes.Length);
                    vBytes = newArray;
                }
            }
        };

        // objects

        self.redim = function(vObjects, size) {
            vObjects = UNKNOWN >>  can't find constructor for class object[size];
        };

        self.redimPreserve = function(vObjects, size) {
            if (size === 0) {
                vObjects = UNKNOWN >>  can't find constructor for class object[size];
            }
            else {
                if (vObjects === null) {
                    vObjects = UNKNOWN >>  can't find constructor for class object[size];
                }
                else if (vObjects.Length === 0) {
                    vObjects = UNKNOWN >>  can't find constructor for class object[size];
                }
                else {
                    let newArray: object[] = new object[size];
                    Array.Copy(vObjects, newArray, vObjects.Length);
                    vObjects = newArray;
                }
            }
        };

        // strings

        self.redim = function(vStrings, size) {
            vStrings = UNKNOWN >>  can't find constructor for class String[size];
        };

        self.redim = function(String[, vStrings, size1, size2) {
            vStrings = UNKNOWN >>  can't find constructor for class String[size1, size2];
        };

        self.redimPreserve = function(vStrings, size) {
            if (size === 0) {
                vStrings = UNKNOWN >>  can't find constructor for class String[0];
            }
            else {
                if (vStrings === null) {
                    vStrings = UNKNOWN >>  can't find constructor for class String[size];
                }
                else if (vStrings.Length === 0) {
                    vStrings = UNKNOWN >>  can't find constructor for class String[size];
                }
                else {
                    let newArray: String[] = new String[size];
                    Array.Copy(vStrings, newArray, Math.Min(size, vStrings.Length));
                    vStrings = newArray;
                }
            }
        };

        // ints

        self.redim = function(vInts, size) {
            vInts = UNKNOWN >>  can't find constructor for class int[size];
        };

        self.redimPreserve = function(vInts, size) {
            if (size === 0) {
                vInts = UNKNOWN >>  can't find constructor for class int[0];
            }
            else {
                if (vInts === null) {
                    vInts = UNKNOWN >>  can't find constructor for class int[size];
                }
                else if (vInts.Length === 0) {
                    vInts = UNKNOWN >>  can't find constructor for class int[size];
                }
                else {
                    let newArray: int[] = new int[size];
                    Array.Copy(vInts, newArray, vInts.Length);
                    vInts = newArray;
                }
            }
        };

        // floats

        self.redim = function(vFloats, size) {
            vFloats = UNKNOWN >>  can't find constructor for class float[size];
        };

        self.redimPreserve = function(vFloats, size) {
            if (size === 0) {
                vFloats = UNKNOWN >>  can't find constructor for class float[0];
            }
            else {
                if (vFloats === null) {
                    vFloats = UNKNOWN >>  can't find constructor for class float[size];
                }
                else if (vFloats.Length === 0) {
                    vFloats = UNKNOWN >>  can't find constructor for class float[size];
                }
                else {
                    let newArray: float[] = new float[size];
                    Array.Copy(vFloats, newArray, vFloats.Length);
                    vFloats = newArray;
                }
            }
        };

        // DataTables

        self.redim = function(vDataTables, size) {
            vDataTables = UNKNOWN >>  can't find constructor for class DataTable[size];
        };

        self.redimPreserve = function(vDataTables, size) {
            if (size === 0) {
                vDataTables = UNKNOWN >>  can't find constructor for class DataTable[0];
            }
            else {
                if (vDataTables === null) {
                    vDataTables = UNKNOWN >>  can't find constructor for class DataTable[size];
                }
                else if (vDataTables.Length === 0) {
                    vDataTables = UNKNOWN >>  can't find constructor for class DataTable[size];
                }
                else {
                    let newArray: DataTable[] = new DataTable[size];
                    Array.Copy(vDataTables, newArray, vDataTables.Length);
                    vDataTables = newArray;
                }
            }
        };

        return self;

    }    }
        return self;


}(globalObject));


namespace CSKernelClient {

  export interface IG {

    isNumeric: (string) => bool;
    redim: (byte[], int) => void;
    redimPreserve: (byte[], int) => void;
    redim: (object[], int) => void;
    redimPreserve: (object[], int) => void;
    redim: (String[], int) => void;
    redim: (ref, ], int, int) => void;
    redimPreserve: (String[], int) => void;
    redim: (int[], int) => void;
    redimPreserve: (int[], int) => void;
    redim: (float[], int) => void;
    redimPreserve: (float[], int) => void;
    redim: (DataTable[], int) => void;
    redimPreserve: (DataTable[], int) => void;
  }
}
