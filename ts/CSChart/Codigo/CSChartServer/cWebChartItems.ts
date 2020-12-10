(function(globalObject) {

    // @ts-ignore
    globalObject.CSChartServer = globalObject.CSChartServer || {};

    globalObject.CSChartServer.createCWebChartItems = function() {

        // @ts-ignore
        let self: CSChartServer.IcWebChartItems = {};

        // Removes an entry with the specified key from the collection.
        self.removeByKey = function(key) {
            this.BaseRemove(key);
        };

        // Removes an entry in the specified index from the collection.
        self.remove = function(index) {
            this.BaseRemoveAt(index);
        };

        // Clears all the elements in the collection.
        self.clear = function() {
            this.BaseClear();
        };

        self.add = function(c, key) {
            key = key || "";
            try {
                if (c === null)  {
                    c = globalObject.CSChartServer.createCWebChartItem();
                }

                if (key === "") {
                    key = cReportGlobals.getKey(cReportGlobals.getNextKey().ToString());
                }

                Add(key, c);

                return c;
            }
            catch(ex) {
                return null;
            }
        };

        self.count = function() {
            return this.Count;
        };

        self.item = function(key) {
            try {
                return this.BaseGet(key);
            }
            catch (ex) {
                return null;
            }
        };

        self.item = function(index) {
            try {
                return this.BaseGet(index);
            }
            catch(ex) {
                return null;
            }
        };

        return self;
    }

}(globalObject));

namespace CSChartServer {

  export interface IcWebChartItems {

    Add: (String, Object) => void;
    Remove: (String) => void;
    Remove: (int) => void;
    Clear: () => void;
    remove: (String) => void;
    remove: (int) => void;
    clear: () => void;
    add: (cWebChartItem) => cWebChartItem;
    add: (cWebChartItem, String) => cWebChartItem;
    count: () => int;
    item: (String) => cWebChartItem;
    item: (int) => cWebChartItem;
  }
}
