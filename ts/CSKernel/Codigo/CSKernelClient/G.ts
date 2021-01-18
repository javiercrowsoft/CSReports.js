

namespace CSKernelClient
{
    export class G {


    {
        public isNumeric(value: string) {
            double dummyNumber; {
            return Double.TryParse(value, dummyNumber);
        }

        // bytes

        public redim(vBytes: byte[], size: number) {
            vBytes = new byte[size];
        }

        public redimPreserve(vBytes: byte[], size: number) {
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
                    let newArray: byte[] = new byte[size];
                    Array.Copy(vBytes, newArray, vBytes.Length);
                    vBytes = newArray;
                }
            }
        }

        // objects

        public redim(vObjects: object[], size: number) {
            vObjects = new object[size];
        }

        public redimPreserve(vObjects: object[], size: number) {
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
                    let newArray: object[] = new object[size];
                    Array.Copy(vObjects, newArray, vObjects.Length);
                    vObjects = newArray;
                }
            }
        }

        // strings

        public redim(vStrings: string[], size: number) {
            vStrings = new String[size];
        }

        public redim(String[: ref, vStrings: ], size1: number, size2: number) {
            vStrings = new String[size1, size2];
        }

        public redimPreserve(vStrings: string[], size: number) {
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
                    let newArray: string[] = new String[size];
                    Array.Copy(vStrings, newArray, Math.Min(size, vStrings.Length));
                    vStrings = newArray;
                }
            }
        }

        // ints

        public redim(vInts: number[], size: number) {
            vInts = new int[size];
        }

        public redimPreserve(vInts: number[], size: number) {
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
                    let newArray: number[] = new int[size];
                    Array.Copy(vInts, newArray, vInts.Length);
                    vInts = newArray;
                }
            }
        }

        // floats

        public redim(vFloats: number[], size: number) {
            vFloats = new float[size];
        }

        public redimPreserve(vFloats: number[], size: number) {
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
                    let newArray: number[] = new float[size];
                    Array.Copy(vFloats, newArray, vFloats.Length);
                    vFloats = newArray;
                }
            }
        }

        // DataTables

        public redim(vDataTables: DataTable[], size: number) {
            vDataTables = new DataTable[size];
        }

        public redimPreserve(vDataTables: DataTable[], size: number) {
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
                    let newArray: DataTable[] = new DataTable[size];
                    Array.Copy(vDataTables, newArray, vDataTables.Length);
                    vDataTables = newArray;
                }
            }
        }



    }    }



}
