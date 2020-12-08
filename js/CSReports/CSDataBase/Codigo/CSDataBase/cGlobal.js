(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {}; //@@@: namespace CSDataBase
 //@@@: {
    //
    // TODO: has a function to translate from Ado.net to csAdoDataType which is the value
    //       we use to save in csr files
    //
    //       use the table here http://www.frentonline.com/Knowledgebase/MSSQLServer/Datatype/tabid/362/Default.aspx
    //

    globalObject.CSDataBase.createCDatabaseGlobals = function() {

        const self = {}; //@@@: public static class cDatabaseGlobals
        self.bool Silent = false; //@@@: public static bool Silent = false;

        self.isNumberField = function(fieldType) { //@@@: public static bool isNumberField(int fieldType)
            switch (fieldType)  //@@@: switch ((csAdoDataType)fieldType)
            {  //@@@: {
                case csAdoDataType.adDecimal: //@@@: case csAdoDataType.adDecimal:
                case csAdoDataType.adDouble:  //@@@: case csAdoDataType.adDouble:
                case csAdoDataType.adInteger: //@@@: case csAdoDataType.adInteger:
                case csAdoDataType.adCurrency:  //@@@: case csAdoDataType.adCurrency:
                case csAdoDataType.adBigInt:  //@@@: case csAdoDataType.adBigInt:
                case csAdoDataType.adNumeric: //@@@: case csAdoDataType.adNumeric:
                case csAdoDataType.adSingle: //@@@: case csAdoDataType.adSingle:
                case csAdoDataType.adSmallInt: //@@@: case csAdoDataType.adSmallInt:
                case csAdoDataType.adTinyInt: //@@@: case csAdoDataType.adTinyInt:
                case csAdoDataType.adUnsignedBigInt: //@@@: case csAdoDataType.adUnsignedBigInt:
                case csAdoDataType.adUnsignedInt: //@@@: case csAdoDataType.adUnsignedInt:
                case csAdoDataType.adUnsignedSmallInt: //@@@: case csAdoDataType.adUnsignedSmallInt:
                case csAdoDataType.adUnsignedTinyInt: //@@@: case csAdoDataType.adUnsignedTinyInt:
                case csAdoDataType.adVarNumeric: //@@@: case csAdoDataType.adVarNumeric:
                    return true; //@@@: return true;
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        self.getDataTypeFromString = function(dataType) { //@@@: public static csDataType getDataTypeFromString(string dataType)
            switch (dataType) //@@@: switch (dataType)
            {  //@@@: {
                case "datetime": //@@@: case "datetime":
                case "datetime2": //@@@: case "datetime2":
                case "date": //@@@: case "date":
                    return csDataType.CSTDDBDATE; //@@@: return csDataType.CSTDDBDATE;
                case "tinyint": //@@@: case "tinyint":
                    return csDataType.CSTDTINYINT; //@@@: return csDataType.CSTDTINYINT;
                case "smallint": //@@@: case "smallint":
                    return csDataType.CSTDSMALLINT; //@@@: return csDataType.CSTDSMALLINT;
                case "int": //@@@: case "int":
                    return csDataType.CSTDINTEGER; //@@@: return csDataType.CSTDINTEGER;
                case "bigint": //@@@: case "bigint":
                    return csDataType.CSTDBIGINT; //@@@: return csDataType.CSTDBIGINT;
                case "char": //@@@: case "char":
                case "varchar": //@@@: case "varchar":
                case "text": //@@@: case "text":
                case "nchar": //@@@: case "nchar":
                case "nvarchar": //@@@: case "nvarchar":
                case "ntext":  //@@@: case "ntext":
                    return csDataType.CSTDVARCHAR; //@@@: return csDataType.CSTDVARCHAR;
                case "smallmoney": //@@@: case "smallmoney":
                case "money": //@@@: case "money":
                case "decimal": //@@@: case "decimal":
                case "numeric": //@@@: case "numeric":
                    return csDataType.CSTDDECIMAL; //@@@: return csDataType.CSTDDECIMAL;
                case "real": //@@@: case "real":
                case "float": //@@@: case "float":
                    return csDataType.CSTDDOUBLE; //@@@: return csDataType.CSTDDOUBLE;

                // TODO: remove me
                default: //@@@: default:
                    cWindow.msgWarning("The data type [" + dataType + "] is not matched in CSDatabase.cDatabaseGlobals.getDataTypeFromString"); //@@@: cWindow.msgWarning("The data type [" + dataType + "] is not matched in CSDatabase.cDatabaseGlobals.getDataTypeFromString");
                    return csDataType.CSTDVARCHAR; //@@@: return csDataType.CSTDVARCHAR;
            } //@@@: }
            throw new Exception("The data type [" + dataType + "] is not matched in CSDatabase.cDatabaseGlobals.getDataTypeFromString"); //@@@: throw new Exception("The data type [" + dataType + "] is not matched in CSDatabase.cDatabaseGlobals.getDataTypeFromString");
        }; //@@@: }

        self.getDataTypeFromAdo = function(adoDBType) { //@@@: public static csDataType getDataTypeFromAdo(int adoDBType)
            switch (adoDBType) //@@@: switch ((csAdoDataType)adoDBType)
            { //@@@: {
                case csAdoDataType.adBigInt: //@@@: case csAdoDataType.adBigInt:
                case csAdoDataType.adUnsignedBigInt: //@@@: case csAdoDataType.adUnsignedBigInt:
                    return csDataType.CSTDBIGINT; //@@@: return csDataType.CSTDBIGINT;

                case csAdoDataType.adBinary: //@@@: case csAdoDataType.adBinary:
                case csAdoDataType.adVarBinary: //@@@: case csAdoDataType.adVarBinary:
                case csAdoDataType.adLongVarBinary: //@@@: case csAdoDataType.adLongVarBinary:
                    return csDataType.CSTDBINARY; //@@@: return csDataType.CSTDBINARY;

                case csAdoDataType.adBSTR: //@@@: case csAdoDataType.adBSTR:
                case csAdoDataType.adChapter: //@@@: case csAdoDataType.adChapter:
                case csAdoDataType.adVarChar: //@@@: case csAdoDataType.adVarChar:
                case csAdoDataType.adLongVarChar: //@@@: case csAdoDataType.adLongVarChar:
                case csAdoDataType.adChar: //@@@: case csAdoDataType.adChar:
                    return csDataType.CSTDVARCHAR; //@@@: return csDataType.CSTDVARCHAR;

                case csAdoDataType.adCurrency: //@@@: case csAdoDataType.adCurrency:
                    return csDataType.CSTDCURRENCY; //@@@: return csDataType.CSTDCURRENCY;

                case csAdoDataType.adDate: //@@@: case csAdoDataType.adDate:
                case csAdoDataType.adDBDate: //@@@: case csAdoDataType.adDBDate:
                case csAdoDataType.adDBTime: //@@@: case csAdoDataType.adDBTime:
                case csAdoDataType.adDBTimeStamp: //@@@: case csAdoDataType.adDBTimeStamp:
                case csAdoDataType.adDBFileTime: //@@@: case csAdoDataType.adDBFileTime:
                    return csDataType.CSTDDATE; //@@@: return csDataType.CSTDDATE;

                case csAdoDataType.adDecimal: //@@@: case csAdoDataType.adDecimal:
                case csAdoDataType.adDouble: //@@@: case csAdoDataType.adDouble:
                case csAdoDataType.adNumeric:                 //@@@: case csAdoDataType.adNumeric:
                case csAdoDataType.adVarNumeric: //@@@: case csAdoDataType.adVarNumeric:
                    return csDataType.CSTDDOUBLE; //@@@: return csDataType.CSTDDOUBLE;

                case csAdoDataType.adInteger: //@@@: case csAdoDataType.adInteger:
                case csAdoDataType.adUnsignedInt: //@@@: case csAdoDataType.adUnsignedInt:
                    return csDataType.CSTDINTEGER; //@@@: return csDataType.CSTDINTEGER;

                case csAdoDataType.adSingle: //@@@: case csAdoDataType.adSingle:
                    return csDataType.CSTDSINGLE; //@@@: return csDataType.CSTDSINGLE;

                case csAdoDataType.adSmallInt: //@@@: case csAdoDataType.adSmallInt:
                case csAdoDataType.adUnsignedSmallInt: //@@@: case csAdoDataType.adUnsignedSmallInt:
                    return csDataType.CSTDSMALLINT; //@@@: return csDataType.CSTDSMALLINT;

                case csAdoDataType.adTinyInt: //@@@: case csAdoDataType.adTinyInt:
                case csAdoDataType.adUnsignedTinyInt: //@@@: case csAdoDataType.adUnsignedTinyInt:
                case csAdoDataType.adBoolean: //@@@: case csAdoDataType.adBoolean:
                    return csDataType.CSTDTINYINT; //@@@: return csDataType.CSTDTINYINT;

                case csAdoDataType.adVarWChar: //@@@: case csAdoDataType.adVarWChar:
                case csAdoDataType.adWChar: //@@@: case csAdoDataType.adWChar:
                case csAdoDataType.adLongVarWChar: //@@@: case csAdoDataType.adLongVarWChar:
                    return csDataType.CSTDVARCHAR; //@@@: return csDataType.CSTDVARCHAR;

                case csAdoDataType.adEmpty: //@@@: case csAdoDataType.adEmpty:
                case csAdoDataType.adError: //@@@: case csAdoDataType.adError:
                case csAdoDataType.adFileTime: //@@@: case csAdoDataType.adFileTime:
                case csAdoDataType.adGUID: //@@@: case csAdoDataType.adGUID:
                case csAdoDataType.adIDispatch: //@@@: case csAdoDataType.adIDispatch:
                case csAdoDataType.adIUnknown: //@@@: case csAdoDataType.adIUnknown:
                case csAdoDataType.adVariant: //@@@: case csAdoDataType.adVariant:
                case csAdoDataType.adPropVariant: //@@@: case csAdoDataType.adPropVariant:
                case csAdoDataType.adUserDefined: //@@@: case csAdoDataType.adUserDefined:
                    break; //@@@: break;
            } //@@@: }

            throw new Exception("This datatype is not supported [" + adoDBType.ToString() + "]"); //@@@: throw new Exception("This datatype is not supported [" + adoDBType.ToString() + "]");
        }; //@@@: }

        self.getAdoTypeFromDataType = function(dataType) { //@@@: public static csAdoDataType getAdoTypeFromDataType(csDataType dataType)
            switch (dataType) //@@@: switch (dataType)
            { //@@@: {
                case csDataType.CSTDBIGINT: //@@@: case csDataType.CSTDBIGINT:
                    return csAdoDataType.adBigInt; //@@@: return csAdoDataType.adBigInt;

                case csDataType.CSTDBINARY: //@@@: case csDataType.CSTDBINARY:
                    return csAdoDataType.adBinary; //@@@: return csAdoDataType.adBinary;

                case csDataType.CSTDVARCHAR: //@@@: case csDataType.CSTDVARCHAR:
                    return csAdoDataType.adVarChar; //@@@: return csAdoDataType.adVarChar;

                case csDataType.CSTDCURRENCY: //@@@: case csDataType.CSTDCURRENCY:
                    return csAdoDataType.adCurrency; //@@@: return csAdoDataType.adCurrency;

                case csDataType.CSTDDATE: //@@@: case csDataType.CSTDDATE:
                    return csAdoDataType.adDate; //@@@: return csAdoDataType.adDate;

                case csDataType.CSTDDOUBLE: //@@@: case csDataType.CSTDDOUBLE:
                    return csAdoDataType.adDouble; //@@@: return csAdoDataType.adDouble;

                case csDataType.CSTDINTEGER: //@@@: case csDataType.CSTDINTEGER:
                    return csAdoDataType.adInteger; //@@@: return csAdoDataType.adInteger;

                case csDataType.CSTDSINGLE: //@@@: case csDataType.CSTDSINGLE:
                    return csAdoDataType.adSingle; //@@@: return csAdoDataType.adSingle;

                case csDataType.CSTDSMALLINT: //@@@: case csDataType.CSTDSMALLINT:
                    return csAdoDataType.adSmallInt; //@@@: return csAdoDataType.adSmallInt;

                case csDataType.CSTDTINYINT: //@@@: case csDataType.CSTDTINYINT:
                    return csAdoDataType.adTinyInt; //@@@: return csAdoDataType.adTinyInt;
            } //@@@: }

            throw new Exception("This datatype is not supported [" + dataType.ToString() + "]"); //@@@: throw new Exception("This datatype is not supported [" + dataType.ToString() + "]");
        }; //@@@: }

        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csDataType //@@@: public enum csDataType
    { //@@@: {
        CSTDCHAR = System.TypeCode.Char, //@@@: CSTDCHAR = System.TypeCode.Char,
        CSTDVARCHAR = System.TypeCode.String, //@@@: CSTDVARCHAR = System.TypeCode.String,
        CSTDLONGVARCHAR = System.TypeCode.String, //@@@: CSTDLONGVARCHAR = System.TypeCode.String,
        CSTDLONGVARWCHAR = System.TypeCode.String, //@@@: CSTDLONGVARWCHAR = System.TypeCode.String,
        CSTDWCHAR = System.TypeCode.String, //@@@: CSTDWCHAR = System.TypeCode.String,
        CSTDVARWCHAR = System.TypeCode.String, //@@@: CSTDVARWCHAR = System.TypeCode.String,
        CSTDDECIMAL = System.TypeCode.Decimal, //@@@: CSTDDECIMAL = System.TypeCode.Decimal,
        CSTDNUMERIC = System.TypeCode.Decimal, //@@@: CSTDNUMERIC = System.TypeCode.Decimal,
        CSTDDOUBLE = System.TypeCode.Double, //@@@: CSTDDOUBLE = System.TypeCode.Double,
        CSTDSINGLE = System.TypeCode.Single, //@@@: CSTDSINGLE = System.TypeCode.Single,
        CSTDCURRENCY = System.TypeCode.Decimal, //@@@: CSTDCURRENCY = System.TypeCode.Decimal,
        CSTDINTEGER = System.TypeCode.Int32, //@@@: CSTDINTEGER = System.TypeCode.Int32,
        CSTDBIGINT = System.TypeCode.Int64, //@@@: CSTDBIGINT = System.TypeCode.Int64,
        CSTDSMALLINT = System.TypeCode.Int16, //@@@: CSTDSMALLINT = System.TypeCode.Int16,
        CSTDTINYINT = System.TypeCode.SByte, //@@@: CSTDTINYINT = System.TypeCode.SByte,
        CSTDUNSIGNEDTINYINT = System.TypeCode.Byte, //@@@: CSTDUNSIGNEDTINYINT = System.TypeCode.Byte,
        CSTDDBTIME = System.TypeCode.DateTime, //@@@: CSTDDBTIME = System.TypeCode.DateTime,
        CSTDDBTIMESTAMP = System.TypeCode.DateTime, //@@@: CSTDDBTIMESTAMP = System.TypeCode.DateTime,
        CSTDDBDATE = System.TypeCode.DateTime, //@@@: CSTDDBDATE = System.TypeCode.DateTime,
        CSTDDATE = System.TypeCode.DateTime, //@@@: CSTDDATE = System.TypeCode.DateTime,
        CSTDBOOLEAN = System.TypeCode.Boolean, //@@@: CSTDBOOLEAN = System.TypeCode.Boolean,
        CSTDBINARY = System.TypeCode.Object, //@@@: CSTDBINARY = System.TypeCode.Object,
        CSTDLONGVARBINARY = System.TypeCode.Object //@@@: CSTDLONGVARBINARY = System.TypeCode.Object
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csCommandType //@@@: public enum csCommandType
    { //@@@: {
        CSCMDFILE = 256, //@@@: CSCMDFILE = 256,
        CSCMDSP = 4, //@@@: CSCMDSP = 4,
        CSCMDTABLE = 2, //@@@: CSCMDTABLE = 2,
        CSCMDTABLEDIRECT = 512, //@@@: CSCMDTABLEDIRECT = 512,
        CSCMDTEXT = 1, //@@@: CSCMDTEXT = 1,
        CSCMDUNKNOWN = -1 //@@@: CSCMDUNKNOWN = -1
        return self;

    } //@@@: }

UNKNOWN >>     public enum csAdoDataType { //@@@: public enum csAdoDataType {
        adBigInt = 20, //@@@: adBigInt = 20,
        adBinary = 128, //@@@: adBinary = 128,
        adBoolean = 11, //@@@: adBoolean = 11,
        adBSTR = 8, //@@@: adBSTR = 8,
        adChapter = 136, //@@@: adChapter = 136,
        adChar = 129, //@@@: adChar = 129,
        adCurrency = 6, //@@@: adCurrency = 6,
        adDate = 7, //@@@: adDate = 7,
        adDBDate = 133, //@@@: adDBDate = 133,
        adDBFileTime = 137, //@@@: adDBFileTime = 137,
        adDBTime = 134, //@@@: adDBTime = 134,
        adDBTimeStamp = 135, //@@@: adDBTimeStamp = 135,
        adDecimal = 14, //@@@: adDecimal = 14,
        adDouble = 5, //@@@: adDouble = 5,
        adEmpty = 0, //@@@: adEmpty = 0,
        adError = 10, //@@@: adError = 10,
        adFileTime = 64, //@@@: adFileTime = 64,
        adGUID = 72, //@@@: adGUID = 72,
        adIDispatch = 9, //@@@: adIDispatch = 9,
        adInteger = 3, //@@@: adInteger = 3,
        adIUnknown = 13, //@@@: adIUnknown = 13,
        adLongVarBinary = 205, //@@@: adLongVarBinary = 205,
        adLongVarChar = 201, //@@@: adLongVarChar = 201,
        adLongVarWChar = 203, //@@@: adLongVarWChar = 203,
        adNumeric = 131, //@@@: adNumeric = 131,
        adPropVariant = 138, //@@@: adPropVariant = 138,
        adSingle = 4, //@@@: adSingle = 4,
        adSmallInt = 2, //@@@: adSmallInt = 2,
        adTinyInt = 16, //@@@: adTinyInt = 16,
        adUnsignedBigInt = 21, //@@@: adUnsignedBigInt = 21,
        adUnsignedInt = 19, //@@@: adUnsignedInt = 19,
        adUnsignedSmallInt = 18, //@@@: adUnsignedSmallInt = 18,
        adUnsignedTinyInt = 17, //@@@: adUnsignedTinyInt = 17,
        adUserDefined = 132, //@@@: adUserDefined = 132,
        adVarBinary = 204, //@@@: adVarBinary = 204,
        adVarChar = 200, //@@@: adVarChar = 200,
        adVariant = 12, //@@@: adVariant = 12,
        adVarNumeric = 139, //@@@: adVarNumeric = 139,
        adVarWChar = 202, //@@@: adVarWChar = 202,
        adWChar = 130 //@@@: adWChar = 130
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
