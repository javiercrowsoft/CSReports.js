(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {};


    globalObject.CSDataBase.createCConstants = function() {

        const self = {};
        self.C_SQL_DATE_STRING = "yyyyMMdd HH:mm:ss";
        self.C_NO_ID = 0;
        self.static DateTime C_NO_DATE = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);
        return self;

    }
}(globalObject));
