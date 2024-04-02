///<reference path="../../CSOAPI/NotImplementedException.ts"/>

namespace CSChartServer {

    import NotImplementedException = CSOAPI.NotImplementedException;
    import csRptChartType = CSReportGlobals.csRptChartType;
    import csColors = CSDrawing.csColors;
    import csRptChartLineStyle = CSReportGlobals.csRptChartLineStyle;
    import csRptChartPieThickness = CSReportGlobals.csRptChartPieThickness;
    import csRptChartPieDiameter = CSReportGlobals.csRptChartPieDiameter;
    import csRptChartFormat = CSReportGlobals.csRptChartFormat;

    export class cWebChart {

        private chartType: csRptChartType;
        private chartTitle: string;
        private primaryColor: csColors;
        private primaryLabel: string;
        private alternateColor: csColors;
        private alternateLabel: string;
        private chartLineStyle: csRptChartLineStyle;
        private chartBarOutline: boolean;
        private chartShowValues: boolean;
        private showLegend: boolean;
        private pieThickness: csRptChartPieThickness;
        private pieDiameter: csRptChartPieDiameter;
        private copyRight: string;
        private image: ImageData;
        private items: cWebChartItems = new cWebChartItems();

        public getItems() {
            return this.items;
        }

        public newChartType(chartType: csRptChartType, chartTitle: string) {
            this.chartType = chartType;
            this.chartTitle = chartTitle;
        }

        public setPrimaryColor(color: csColors) {
            this.primaryColor = color;
        }

        public setGridLines(chartLineStyle: csRptChartLineStyle) {
            this.chartLineStyle = chartLineStyle;
        }

        public setOutlineBars(chartBarOutline: boolean) {
            this.chartBarOutline = chartBarOutline;
        }

        public setShowValues(chartShowValues: boolean) {
            this.chartShowValues = chartShowValues;
        }

        public setShowLegend(showLegend: boolean) {
            this.showLegend = showLegend;
        }

        public setThickness(pieThickness: csRptChartPieThickness) {
            this.pieThickness = pieThickness;
        }

        public setDiameter(value: csRptChartPieDiameter) {
            this.pieDiameter = value;
        }

        public setPrimaryLabel(value: string) {
            this.primaryLabel = value;
        }

        public setAlternateColor(color: csColors) {
            this.alternateColor = color;
        }

        public setAlternateLabel(value: string) {
            this.alternateLabel = value;
        }

        public renderWebChartImage(width: number, height: number) {
            const canvas = new OffscreenCanvas(width, height);
            const pieChart = new PieChart({
                canvas: canvas,
                seriesName: this.chartTitle,
                padding: 40,
                data: this.items.getValues(),
                colors: ["#80DEEA", "#FFE082", "#FFAB91", "#CE93D8"],
                titleOptions: {
                    align: "center",
                    fill: "black",
                    font: {
                        weight: "bold",
                        size: "24px",
                        family: "Mono"
                    }
                },
                doughnutHoleSize:0.3
            });

            pieChart.draw();

            const ctx = canvas.getContext('2d');
            this.image = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        public getImage() {
            return this.image;
        }

        public setCopyRight(copyright: string) {
            this.copyRight = copyright;
        }

        dispose() {
            //console.log("dispose was called in object " + this.constructor.name);
        }
    }
}
