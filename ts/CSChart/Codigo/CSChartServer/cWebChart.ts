namespace CSChartServer {

    import NotImplementedException = CSOAPI.NotImplementedException;

    export class cWebChart {

        private items: cWebChartItems = null;

        public getItems() {
            return this.items;
        }

        public newChartType(chartType: csRptChartType, chartTitle: string) {
            throw new NotImplementedException();
        }

        public setColorPrimary(color: csColors) {
            throw new NotImplementedException();
        }

        public setGridLines(chartLineStyle: csRptChartLineStyle) {
            throw new NotImplementedException();
        }

        public setOutlineBars(chartBarOutline: boolean) {
            throw new NotImplementedException();
        }

        public setShowValues(chartShowValues: boolean) {
            throw new NotImplementedException();
        }

        public setShowLegend(p: boolean) {
            throw new NotImplementedException();
        }

        public setThickness(pieThickness: csRptChartPieThickness) {
            throw new NotImplementedException();
        }

        public setDiameter(pieDiameter: csRptChartPieDiameter) {
            throw new NotImplementedException();
        }

        public setLabelPrimary(p: string) {
            throw new NotImplementedException();
        }

        public setColorAlternate(color: csColors) {
            throw new NotImplementedException();
        }

        public setLabelAlternate(p: string) {
            throw new NotImplementedException();
        }

        public Dispose() {
            throw new NotImplementedException();
        }

        public renderWebChartImage() {
            throw new NotImplementedException();
        }

        public setCopyRight(copyright: string) {
            throw new NotImplementedException();
        }

        public setSaveTo(p: number) {
            throw new NotImplementedException();
        }

        public setFileName(fileName: string) {
            throw new NotImplementedException();
        }

        public setFormat(imageFormat: csRptChartFormat) {
            throw new NotImplementedException();
        }
    }
}
