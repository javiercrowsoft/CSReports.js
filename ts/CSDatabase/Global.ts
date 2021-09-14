namespace CSDatabase {

    import Exception = CSOAPI.Exception;
    import cWindow = CSKernelClient.cWindow;

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

        public static getDataTypeFromString(dataType: string) {
            switch (dataType)
            { 
                case "datetime":
                case "datetime2":
                case "date":
                    return csDataType.CS_TD_DBDATE;
                case "tinyint":
                    return csDataType.CS_TD_TINYINT;
                case "smallint":
                    return csDataType.CS_TD_SMALLINT;
                case "int":
                    return csDataType.CS_TD_INTEGER;
                case "bigint":
                    return csDataType.CS_TD_BIGINT;
                case "char":
                case "varchar":
                case "text":
                case "nchar":
                case "nvarchar":
                case "ntext": 
                    return csDataType.CS_TD_VARCHAR;
                case "smallmoney":
                case "money":
                case "decimal":
                case "numeric":
                    return csDataType.CS_TD_DECIMAL;
                case "real":
                case "float":
                    return csDataType.CS_TD_DOUBLE;

                // TODO: remove me
                default:
                    cWindow.msgWarning("The data type [" + dataType + "] is not matched in CSDatabase.DatabaseGlobals.getDataTypeFromString");
                    return csDataType.CS_TD_VARCHAR;
            }

            throw new Exception("The data type [" + dataType + "] is not matched in CSDatabase.DatabaseGlobals.getDataTypeFromString");
        }

        public static getDataTypeFromAdo(adoDBType: number) {
            switch (adoDBType)
            {
                case csAdoDataType.adBigInt:
                case csAdoDataType.adUnsignedBigInt:
                    return csDataType.CS_TD_BIGINT;

                case csAdoDataType.adBinary:
                case csAdoDataType.adVarBinary:
                case csAdoDataType.adLongVarBinary:
                    return csDataType.CS_TD_BINARY;

                case csAdoDataType.adBSTR:
                case csAdoDataType.adChapter:
                case csAdoDataType.adVarChar:
                case csAdoDataType.adLongVarChar:
                case csAdoDataType.adChar:
                    return csDataType.CS_TD_VARCHAR;

                case csAdoDataType.adCurrency:
                    return csDataType.CS_TD_CURRENCY;

                case csAdoDataType.adDate:
                case csAdoDataType.adDBDate:
                case csAdoDataType.adDBTime:
                case csAdoDataType.adDBTimeStamp:
                case csAdoDataType.adDBFileTime:
                    return csDataType.CS_TD_DATE;

                case csAdoDataType.adDecimal:
                case csAdoDataType.adDouble:
                case csAdoDataType.adNumeric:                
                case csAdoDataType.adVarNumeric:
                    return csDataType.CS_TD_DOUBLE;

                case csAdoDataType.adInteger:
                case csAdoDataType.adUnsignedInt:
                    return csDataType.CS_TD_INTEGER;

                case csAdoDataType.adSingle:
                    return csDataType.CS_TD_SINGLE;

                case csAdoDataType.adSmallInt:
                case csAdoDataType.adUnsignedSmallInt:
                    return csDataType.CS_TD_SMALLINT;

                case csAdoDataType.adTinyInt:
                case csAdoDataType.adUnsignedTinyInt:
                case csAdoDataType.adBoolean:
                    return csDataType.CS_TD_TINYINT;

                case csAdoDataType.adVarWChar:
                case csAdoDataType.adWChar:
                case csAdoDataType.adLongVarWChar:
                    return csDataType.CS_TD_VARCHAR;

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

        public static getAdoTypeFromDataType(dataType: csDataType) {
            switch (dataType)
            {
                case csDataType.CS_TD_BIGINT:
                    return csAdoDataType.adBigInt;

                case csDataType.CS_TD_BINARY:
                    return csAdoDataType.adBinary;

                case csDataType.CS_TD_VARCHAR:
                    return csAdoDataType.adVarChar;

                case csDataType.CS_TD_CURRENCY:
                    return csAdoDataType.adCurrency;

                case csDataType.CS_TD_DATE:
                    return csAdoDataType.adDate;

                case csDataType.CS_TD_DOUBLE:
                    return csAdoDataType.adDouble;

                case csDataType.CS_TD_INTEGER:
                    return csAdoDataType.adInteger;

                case csDataType.CS_TD_SINGLE:
                    return csAdoDataType.adSingle;

                case csDataType.CS_TD_SMALLINT:
                    return csAdoDataType.adSmallInt;

                case csDataType.CS_TD_TINYINT:
                    return csAdoDataType.adTinyInt;
            }

            throw new Exception("This datatype is not supported [" + dataType.toString() + "]");
        }
    }

    export enum csDataType {
        CS_TD_CHAR,
        CS_TD_VARCHAR,
        CS_TD_LONGVARCHAR,
        CS_TD_LONGVARWCHAR,
        CS_TD_WCHAR,
        CS_TD_VARWCHAR,
        CS_TD_DECIMAL,
        CS_TD_NUMERIC,
        CS_TD_DOUBLE,
        CS_TD_SINGLE,
        CS_TD_CURRENCY,
        CS_TD_INTEGER,
        CS_TD_BIGINT,
        CS_TD_SMALLINT,
        CS_TD_TINYINT,
        CS_TD_UNSIGNEDTINYINT,
        CS_TD_DBTIME,
        CS_TD_DBTIMESTAMP,
        CS_TD_DBDATE,
        CS_TD_DATE,
        CS_TD_BOOLEAN,
        CS_TD_BINARY,
        CS_TD_LONGVARBINARY
    }

    export enum csCommandType {
        CS_CMD_FILE = 256,
        CS_CMD_SP = 4,
        CS_CMD_TABLE = 2,
        CS_CMD_TABLEDIRECT = 512,
        CS_CMD_TEXT = 1,
        CS_CMD_UNKNOWN = -1
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
