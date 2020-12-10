(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {};


    globalObject.CSDataBase.createCConstants = function() {

        // @ts-ignore
        let self: CSDataBase.IcConstants = {};
        self.C_SQL_DATE_STRING: string = "yyyyMMdd HH:mm:ss";
        self.C_NO_ID: number = 0;
        self.static: readonly DateTime C_NO_DATE = DateTime.ParseExact("01/01/1900", "dd/mm/yyyy", CultureInfo.InvariantCulture);
        return self;

    }    }
}(globalObject));


namespace CSDataBase {

  export interface IcConstants {

    C_SQL_DATE_STRING: string;
    C_NO_ID: number;
    static: readonly;
  }
}
