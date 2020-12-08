(function(globalObject) {

    globalObject.CSChartServer = globalObject.CSChartServer || {};

    globalObject.CSChartServer.createCWebChart = function() {

        const self = {};
        let m_items = null;

        self.getItems = function() {
            return m_items;
        };

        self.newChartType = function(m_chartType, m_chartTitle) {
            throw new NotImplementedException();
        };

        self.setColorPrimary = function(color) {
            throw new NotImplementedException();
        };

        self.setGridLines = function(m_chartLineStyle) {
            throw new NotImplementedException();
        };

        self.setOutlineBars = function(m_chartBarOutline) {
            throw new NotImplementedException();
        };

        self.setShowValues = function(m_chartShowValues) {
            throw new NotImplementedException();
        };

        self.setShowLegend = function(p) {
            throw new NotImplementedException();
        };

        self.setThickness = function(m_pieThickness) {
            throw new NotImplementedException();
        };

        self.setDiameter = function(m_pieDiameter) {
            throw new NotImplementedException();
        };

        self.setLabelPrimary = function(p) {
            throw new NotImplementedException();
        };

        self.setColorAlternate = function(globalCSReportDllcsColors) {
            throw new NotImplementedException();
        };

        self.setLabelAlternate = function(p) {
            throw new NotImplementedException();
        };

        self.Dispose = function() {
            throw new NotImplementedException();
        };

        self.renderWebChartImage = function() {
            throw new NotImplementedException();
        };

        self.setCopyRight = function(m_copyright) {
            throw new NotImplementedException();
        };

        self.setSaveTo = function(p) {
            throw new NotImplementedException();
        };

        self.setFileName = function(fileName) {
            throw new NotImplementedException();
        };

        self.setFormat = function(m_imageFormat) {
            throw new NotImplementedException();
        };
        return self;

    }
}(globalObject));
