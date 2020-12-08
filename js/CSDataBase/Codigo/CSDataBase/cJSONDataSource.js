(function(globalObject) {

    globalObject.CSDataBase = globalObject.CSDataBase || {}; //@@@: namespace CSDataBase
 //@@@: {
    globalObject.CSDataBase.createCJSONDataSource = function() {

        const self = {}; //@@@: public class cJSONDataSource
        let m_name = null; //@@@: private string m_name;
        let m_data = null; //@@@: private JObject m_data;

        const cJSONDataSource = function(name, data) { //@@@: public cJSONDataSource(string name, JObject data)
            m_name = name; //@@@: m_name = name;
            m_data = data; //@@@: m_data = data;
        }; //@@@: }

        self.getName = function() { //@@@: public string getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.getData = function() { //@@@: public JObject getData()
            return m_data; //@@@: return m_data;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
