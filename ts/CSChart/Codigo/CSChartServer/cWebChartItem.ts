(function(globalObject) {

    // @ts-ignore
    globalObject.CSChartServer = globalObject.CSChartServer || {};

    globalObject.CSChartServer.createCWebChartItem = function() {

        // @ts-ignore
        let self: CSChartServer.IcWebChartItem = {};

        self.setPrimaryValue = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setPrimaryLabel = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setPieLabel = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setAlternateValue = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setAltLabel = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setExplode = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };
        return self;
    }

}(globalObject));

namespace CSChartServer {

  export interface IcWebChartItem {

    setPrimaryValue: (double) => void;
    setPrimaryLabel: (string) => void;
    setPieLabel: (string) => void;
    setAlternateValue: (int) => void;
    setAltLabel: (string) => void;
    setExplode: (bool) => void;
  }
}
