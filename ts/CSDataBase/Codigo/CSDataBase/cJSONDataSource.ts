(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {};

    globalObject.CSDataBase.createCJSONDataSource = function() {

        // @ts-ignore
        let self: CSDataBase.IcJSONDataSource = {};
        let m_name: string = null;
        let m_data: JObject = null;

        const cJSONDataSource = function(name, data) {
            m_name = name;
            m_data = data;
        };

        self.getName = function() {
            return m_name;
        };

        self.getData = function() {
            return m_data;
        };
        return self;

    }    }
}(globalObject));


namespace CSDataBase {

  export interface IcJSONDataSource {

    getName: () => string;
    getData: () => JObject;
  }
}
