namespace CSDataBase {

    import Exception = CSOAPI.Exception;

    export class DatabaseGlobals {

        public silent: boolean = false;

        public isNumberField(fieldType: number) {
            switch (fieldType) 
            { 
                case csAdoDataType.adDecimal:
                case csAdoDataType.adDouble: 
                case csAdoDataType.adInteger:
                case csAdoDataType.adCurrency: 
                case csAdoDataType.adBigInt: 
                case csAdoDataType.adNumeric:
                case csAdoDataType.adSingle:
                case csAdoDataType.adSmallInt:
                case csAdoDataType.adTinyInt:
                case csAdoDataType.adUnsignedBigInt:
                case csAdoDataType.adUnsignedInt:
                case csAdoDataType.adUnsignedSmallInt:
                case csAdoDataType.adUnsignedTinyInt:
                case csAdoDataType.adVarNumeric:
                    return true;
            }
            return false;
        }

        public getDataTypeFromString(dataType: string) {
            switch (dataType)
            { 
                case "datetime":
                case "datetime2":
                case "date":
                    return csDataType.CSTDDBDATE;
                case "tinyint":
                    return csDataType.CSTDTINYINT;
                case "smallint":
                    return csDataType.CSTDSMALLINT;
                case "int":
                    return csDataType.CSTDINTEGER;
                case "bigint":
                    return csDataType.CSTDBIGINT;
                case "char":
                case "varchar":
                case "text":
                case "nchar":
                case "nvarchar":
                case "ntext": 
                    return csDataType.CSTDVARCHAR;
                case "smallmoney":
                case "money":
                case "decimal":
                case "numeric":
                    return csDataType.CSTDDECIMAL;
                case "real":
                case "float":
                    return csDataType.CSTDDOUBLE;

                // TODO: remove me
                default:
                    cWindow.msgWarning("The data type [" + dataType + "] is not matched in CSDatabase.DatabaseGlobals.getDataTypeFromString");
                    return csDataType.CSTDVARCHAR;
            }

            throw new Exception("The data type [" + dataType + "] is not matched in CSDatabase.DatabaseGlobals.getDataTypeFromString");
        }

        public getDataTypeFromAdo(adoDBType: number) {
            switch (adoDBType)
            {
                case csAdoDataType.adBigInt:
                case csAdoDataType.adUnsignedBigInt:
                    return csDataType.CSTDBIGINT;

                case csAdoDataType.adBinary:
                case csAdoDataType.adVarBinary:
                case csAdoDataType.adLongVarBinary:
                    return csDataType.CSTDBINARY;

                case csAdoDataType.adBSTR:
                case csAdoDataType.adChapter:
                case csAdoDataType.adVarChar:
                case csAdoDataType.adLongVarChar:
                case csAdoDataType.adChar:
                    return csDataType.CSTDVARCHAR;

                case csAdoDataType.adCurrency:
                    return csDataType.CSTDCURRENCY;

                case csAdoDataType.adDate:
                case csAdoDataType.adDBDate:
                case csAdoDataType.adDBTime:
                case csAdoDataType.adDBTimeStamp:
                case csAdoDataType.adDBFileTime:
                    return csDataType.CSTDDATE;

                case csAdoDataType.adDecimal:
                case csAdoDataType.adDouble:
                case csAdoDataType.adNumeric:                
                case csAdoDataType.adVarNumeric:
                    return csDataType.CSTDDOUBLE;

                case csAdoDataType.adInteger:
                case csAdoDataType.adUnsignedInt:
                    return csDataType.CSTDINTEGER;

                case csAdoDataType.adSingle:
                    return csDataType.CSTDSINGLE;

                case csAdoDataType.adSmallInt:
                case csAdoDataType.adUnsignedSmallInt:
                    return csDataType.CSTDSMALLINT;

                case csAdoDataType.adTinyInt:
                case csAdoDataType.adUnsignedTinyInt:
                case csAdoDataType.adBoolean:
                    return csDataType.CSTDTINYINT;

                case csAdoDataType.adVarWChar:
                case csAdoDataType.adWChar:
                case csAdoDataType.adLongVarWChar:
                    return csDataType.CSTDVARCHAR;

                case csAdoDataType.adEmpty:
                case csAdoDataType.adError:
                case csAdoDataType.adFileTime:
                case csAdoDataType.adGUID:
                case csAdoDataType.adIDispatch:
                case csAdoDataType.adIUnknown:
                case csAdoDataType.adVariant:
                case csAdoDataType.adPropVariant:
                case csAdoDataType.adUserDefined:
                    break;
            }

            throw new Exception("This datatype is not supported [" + adoDBType.toString() + "]");
        }

        public getAdoTypeFromDataType(dataType: csDataType) {
            switch (dataType)
            {
                case csDataType.CSTDBIGINT:
                    return csAdoDataType.adBigInt;

                case csDataType.CSTDBINARY:
                    return csAdoDataType.adBinary;

                case csDataType.CSTDVARCHAR:
                    return csAdoDataType.adVarChar;

                case csDataType.CSTDCURRENCY:
                    return csAdoDataType.adCurrency;

                case csDataType.CSTDDATE:
                    return csAdoDataType.adDate;

                case csDataType.CSTDDOUBLE:
                    return csAdoDataType.adDouble;

                case csDataType.CSTDINTEGER:
                    return csAdoDataType.adInteger;

                case csDataType.CSTDSINGLE:
                    return csAdoDataType.adSingle;

                case csDataType.CSTDSMALLINT:
                    return csAdoDataType.adSmallInt;

                case csDataType.CSTDTINYINT:
                    return csAdoDataType.adTinyInt;
            }

            throw new Exception("This datatype is not supported [" + dataType.toString() + "]");
        }
    }

    export enum csDataType {
        CSTDCHAR = System.TypeCode.Char,
        CSTDVARCHAR = System.TypeCode.String,
        CSTDLONGVARCHAR = System.TypeCode.String,
        CSTDLONGVARWCHAR = System.TypeCode.String,
        CSTDWCHAR = System.TypeCode.String,
        CSTDVARWCHAR = System.TypeCode.String,
        CSTDDECIMAL = System.TypeCode.Decimal,
        CSTDNUMERIC = System.TypeCode.Decimal,
        CSTDDOUBLE = System.TypeCode.Double,
        CSTDSINGLE = System.TypeCode.Single,
        CSTDCURRENCY = System.TypeCode.Decimal,
        CSTDINTEGER = System.TypeCode.Int32,
        CSTDBIGINT = System.TypeCode.Int64,
        CSTDSMALLINT = System.TypeCode.Int16,
        CSTDTINYINT = System.TypeCode.SByte,
        CSTDUNSIGNEDTINYINT = System.TypeCode.Byte,
        CSTDDBTIME = System.TypeCode.DateTime,
        CSTDDBTIMESTAMP = System.TypeCode.DateTime,
        CSTDDBDATE = System.TypeCode.DateTime,
        CSTDDATE = System.TypeCode.DateTime,
        CSTDBOOLEAN = System.TypeCode.Boolean,
        CSTDBINARY = System.TypeCode.Object,
        CSTDLONGVARBINARY = System.TypeCode.Object
    }

    export enum csCommandType {
        CSCMDFILE = 256,
        CSCMDSP = 4,
        CSCMDTABLE = 2,
        CSCMDTABLEDIRECT = 512,
        CSCMDTEXT = 1,
        CSCMDUNKNOWN = -1
    }

    export enum csAdoDataType {
        adBigInt = 20,
        adBinary = 128,
        adBoolean = 11,
        adBSTR = 8,
        adChapter = 136,
        adChar = 129,
        adCurrency = 6,
        adDate = 7,
        adDBDate = 133,
        adDBFileTime = 137,
        adDBTime = 134,
        adDBTimeStamp = 135,
        adDecimal = 14,
        adDouble = 5,
        adEmpty = 0,
        adError = 10,
        adFileTime = 64,
        adGUID = 72,
        adIDispatch = 9,
        adInteger = 3,
        adIUnknown = 13,
        adLongVarBinary = 205,
        adLongVarChar = 201,
        adLongVarWChar = 203,
        adNumeric = 131,
        adPropVariant = 138,
        adSingle = 4,
        adSmallInt = 2,
        adTinyInt = 16,
        adUnsignedBigInt = 21,
        adUnsignedInt = 19,
        adUnsignedSmallInt = 18,
        adUnsignedTinyInt = 17,
        adUserDefined = 132,
        adVarBinary = 204,
        adVarChar = 200,
        adVariant = 12,
        adVarNumeric = 139,
        adVarWChar = 202,
        adWChar = 130
    }
}
