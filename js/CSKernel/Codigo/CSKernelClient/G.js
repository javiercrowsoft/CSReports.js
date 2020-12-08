(function(globalObject) {

    globalObject.CSKernelClient = globalObject.CSKernelClient || {}; //@@@: namespace CSKernelClient
 //@@@: {
    globalObject.CSKernelClient.createG = function() {

        const self = {}; //@@@: public static class G
        self.isNumeric = function(value) { //@@@: public static bool isNumeric(string value)
            double dummyNumber; { //@@@: double dummyNumber;
            return Double.TryParse(value, dummyNumber); //@@@: return Double.TryParse(value, out dummyNumber);
        }; //@@@: }

        // bytes

        self.redim = function(vBytes, size) { //@@@: public static void redim(ref byte[] vBytes, int size)
            vBytes = new byte[size]; //@@@: vBytes = new byte[size];
        }; //@@@: }

        self.redimPreserve = function(vBytes, size) { //@@@: public static void redimPreserve(ref byte[] vBytes, int size)
            if (size === 0) { //@@@: if (size == 0)
                vBytes = new byte[0]; //@@@: vBytes = new byte[0];
            } //@@@: }
            else { //@@@: else
                if (vBytes === null) { //@@@: if (vBytes == null)
                    vBytes = new byte[size]; //@@@: vBytes = new byte[size];
                } //@@@: }
                else if (vBytes.Length === 0) { //@@@: else if (vBytes.Length == 0)
                    vBytes = new byte[size]; //@@@: vBytes = new byte[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new byte[size]; //@@@: byte[] newArray = new byte[size];
                    Array.Copy(vBytes, newArray, vBytes.Length); //@@@: Array.Copy(vBytes, newArray, vBytes.Length);
                    vBytes = newArray; //@@@: vBytes = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        // objects

        self.redim = function(vObjects, size) { //@@@: public static void redim(ref object[] vObjects, int size)
            vObjects = new object[size]; //@@@: vObjects = new object[size];
        }; //@@@: }

        self.redimPreserve = function(vObjects, size) { //@@@: public static void redimPreserve(ref object[] vObjects, int size)
            if (size === 0) { //@@@: if (size == 0)
                vObjects = new object[size]; //@@@: vObjects = new object[size];
            } //@@@: }
            else { //@@@: else
                if (vObjects === null) { //@@@: if (vObjects == null)
                    vObjects = new object[size]; //@@@: vObjects = new object[size];
                } //@@@: }
                else if (vObjects.Length === 0) { //@@@: else if (vObjects.Length == 0)
                    vObjects = new object[size]; //@@@: vObjects = new object[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new object[size]; //@@@: object[] newArray = new object[size];
                    Array.Copy(vObjects, newArray, vObjects.Length); //@@@: Array.Copy(vObjects, newArray, vObjects.Length);
                    vObjects = newArray; //@@@: vObjects = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        // strings

        self.redim = function(vStrings, size) { //@@@: public static void redim(ref String[] vStrings, int size)
            vStrings = new String[size]; //@@@: vStrings = new String[size];
        }; //@@@: }

        self.redim = function(String[, vStrings, size1, size2) { //@@@: public static void redim(ref String[,] vStrings, int size1, int size2)
            vStrings = new String[size1, size2]; //@@@: vStrings = new String[size1, size2];
        }; //@@@: }

        self.redimPreserve = function(vStrings, size) { //@@@: public static void redimPreserve(ref String[] vStrings, int size)
            if (size === 0) { //@@@: if (size == 0)
                vStrings = new String[0]; //@@@: vStrings = new String[0];
            } //@@@: }
            else { //@@@: else
                if (vStrings === null) { //@@@: if (vStrings == null)
                    vStrings = new String[size]; //@@@: vStrings = new String[size];
                } //@@@: }
                else if (vStrings.Length === 0) { //@@@: else if (vStrings.Length == 0)
                    vStrings = new String[size]; //@@@: vStrings = new String[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new String[size]; //@@@: String[] newArray = new String[size];
                    Array.Copy(vStrings, newArray, Math.Min(size, vStrings.Length)); //@@@: Array.Copy(vStrings, newArray, Math.Min(size, vStrings.Length));
                    vStrings = newArray; //@@@: vStrings = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        // ints

        self.redim = function(vInts, size) { //@@@: public static void redim(ref int[] vInts, int size)
            vInts = new int[size]; //@@@: vInts = new int[size];
        }; //@@@: }

        self.redimPreserve = function(vInts, size) { //@@@: public static void redimPreserve(ref int[] vInts, int size)
            if (size === 0) { //@@@: if (size == 0)
                vInts = new int[0]; //@@@: vInts = new int[0];
            } //@@@: }
            else { //@@@: else
                if (vInts === null) { //@@@: if (vInts == null)
                    vInts = new int[size]; //@@@: vInts = new int[size];
                } //@@@: }
                else if (vInts.Length === 0) { //@@@: else if (vInts.Length == 0)
                    vInts = new int[size]; //@@@: vInts = new int[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new int[size]; //@@@: int[] newArray = new int[size];
                    Array.Copy(vInts, newArray, vInts.Length); //@@@: Array.Copy(vInts, newArray, vInts.Length);
                    vInts = newArray; //@@@: vInts = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        // floats

        self.redim = function(vFloats, size) { //@@@: public static void redim(ref float[] vFloats, int size)
            vFloats = new float[size]; //@@@: vFloats = new float[size];
        }; //@@@: }

        self.redimPreserve = function(vFloats, size) { //@@@: public static void redimPreserve(ref float[] vFloats, int size)
            if (size === 0) { //@@@: if (size == 0)
                vFloats = new float[0]; //@@@: vFloats = new float[0];
            } //@@@: }
            else { //@@@: else
                if (vFloats === null) { //@@@: if (vFloats == null)
                    vFloats = new float[size]; //@@@: vFloats = new float[size];
                } //@@@: }
                else if (vFloats.Length === 0) { //@@@: else if (vFloats.Length == 0)
                    vFloats = new float[size]; //@@@: vFloats = new float[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new float[size]; //@@@: float[] newArray = new float[size];
                    Array.Copy(vFloats, newArray, vFloats.Length); //@@@: Array.Copy(vFloats, newArray, vFloats.Length);
                    vFloats = newArray; //@@@: vFloats = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        // DataTables

        self.redim = function(vDataTables, size) { //@@@: public static void redim(ref DataTable[] vDataTables, int size)
            vDataTables = new DataTable[size]; //@@@: vDataTables = new DataTable[size];
        }; //@@@: }

        self.redimPreserve = function(vDataTables, size) { //@@@: public static void redimPreserve(ref DataTable[] vDataTables, int size)
            if (size === 0) { //@@@: if (size == 0)
                vDataTables = new DataTable[0]; //@@@: vDataTables = new DataTable[0];
            } //@@@: }
            else { //@@@: else
                if (vDataTables === null) { //@@@: if (vDataTables == null)
                    vDataTables = new DataTable[size]; //@@@: vDataTables = new DataTable[size];
                } //@@@: }
                else if (vDataTables.Length === 0) { //@@@: else if (vDataTables.Length == 0)
                    vDataTables = new DataTable[size]; //@@@: vDataTables = new DataTable[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new DataTable[size]; //@@@: DataTable[] newArray = new DataTable[size];
                    Array.Copy(vDataTables, newArray, vDataTables.Length); //@@@: Array.Copy(vDataTables, newArray, vDataTables.Length);
                    vDataTables = newArray; //@@@: vDataTables = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
