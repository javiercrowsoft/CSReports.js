(function(globalObject) {

    // @ts-ignore
    globalObject.CSChartServer = globalObject.CSChartServer || {};

    globalObject.CSChartServer.createCWebChart = function() {

        // @ts-ignore
        let self: CSChartServer.IcWebChart = {};
        let m_items: CSChartServer.IcWebChartItems = null;

        self.getItems = function() {
            return m_items;
        };

        self.newChartType = function(chartType, chartTitle) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setColorPrimary = function(color) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setGridLines = function(chartLineStyle) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setOutlineBars = function(chartBarOutline) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setShowValues = function(chartShowValues) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setShowLegend = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setThickness = function(pieThickness) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setDiameter = function(pieDiameter) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setLabelPrimary = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setColorAlternate = function(globalCSReportDllcsColors) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setLabelAlternate = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.Dispose = function() {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.renderWebChartImage = function() {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setCopyRight = function(copyright) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setSaveTo = function(p) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setFileName = function(fileName) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        self.setFormat = function(imageFormat) {
            throw new globalObject.CSOAPI.NotImplementedException();
        };

        return self;
    }

}(globalObject));

namespace CSChartServer {

  export interface IcWebChart {

    getItems: () => cWebChartItems;
    newChartType: (csRptChartType, string) => void;
    setColorPrimary: (csColors) => void;
    setGridLines: (csRptChartLineStyle) => void;
    setOutlineBars: (bool) => void;
    setShowValues: (bool) => void;
    setShowLegend: (bool) => void;
    setThickness: (csRptChartPieThickness) => void;
    setDiameter: (csRptChartPieDiameter) => void;
    setLabelPrimary: (string) => void;
    setColorAlternate: (csColors) => void;
    setLabelAlternate: (string) => void;
    Dispose: () => void;
    renderWebChartImage: () => void;
    setCopyRight: (string) => void;
    setSaveTo: (int) => void;
    setFileName: (string) => void;
    setFormat: (csRptChartFormat) => void;
  }
}
