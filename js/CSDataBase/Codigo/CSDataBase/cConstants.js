(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {}; //@@@: namespace CSDataBase
 //@@@: {

    globalObject.CSDataBase.createCConstants = function() {

        const self = {}; //@@@: public static class cConstants
        self.C_SQL_DATE_STRING = "yyyyMMdd HH:mm:ss"; //@@@: public const string C_SQL_DATE_STRING = "yyyyMMdd HH:mm:ss";
        self.C_NO_ID = 0; //@@@: public const int C_NO_ID = 0;
        self.static DateTime C_NO_DATE = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture); //@@@: public readonly static DateTime C_NO_DATE = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
