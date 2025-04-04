namespace CSReports.CSChartServer {

    export class PieChartFont {
        weight: string;
        size: string;
        family: string;
    }

    export class PieChartTitleOptions {
        align: CanvasTextAlign;
        fill: string;
        font: PieChartFont;
    }

    export class PieChartOptions {
        canvas: OffscreenCanvas;
        seriesName: string;
        padding: number;
        data: cWebChartItem[];
        colors: string[];
        titleOptions: PieChartTitleOptions;
        doughnutHoleSize: number;
    }

    export class PieChart {

        private options: PieChartOptions;
        private canvas: OffscreenCanvas;
        private ctx: OffscreenCanvasRenderingContext2D;
        private colors: any;
        private titleOptions: PieChartTitleOptions;
        private totalValue: number;
        private radius

        constructor(options: PieChartOptions) {
            this.options = options;
            this.canvas = options.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.colors = options.colors;
            this.titleOptions = options.titleOptions;
            this.totalValue = this.options.data.map(s => s.getPrimaryValue()).reduce((a, b) => a + b, 0);
            this.radius = Math.min(this.canvas.width / 2, this.canvas.height / 2) - options.padding;
        }

        drawSlices() {
            var colorIndex = 0;
            var startAngle = -Math.PI / 2;

            for (let i = 0; i < this.options.data.length; i++) {
                var val = this.options.data[i].getPrimaryValue();
                var sliceAngle = (2 * Math.PI * val) / this.totalValue;

                this.drawPieSlice(
                    this.ctx,
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    this.radius,
                    startAngle,
                    startAngle + sliceAngle,
                    this.colors[colorIndex % this.colors.length]
                );

                startAngle += sliceAngle;
                colorIndex++;
            }

            if (this.options.doughnutHoleSize) {
                this.drawPieSlice(
                    this.ctx,
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    this.options.doughnutHoleSize * this.radius,
                    0,
                    2 * Math.PI,
                    "#FFF",
                    "#FFF"
                );

                this.drawArc(
                    this.ctx,
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    this.options.doughnutHoleSize * this.radius,
                    0,
                    2 * Math.PI,
                    "#000"
                );
            }
        }

        drawLabels() {
            var colorIndex = 0;
            var startAngle = -Math.PI / 2;
            for (let i = 0; i < this.options.data.length; i++) {
                var val = this.options.data[i].getPrimaryValue();
                var sliceAngle = (2 * Math.PI * val) / this.totalValue;
                var labelX =
                    this.canvas.width / 2 +
                    (this.radius / 2) * Math.cos(startAngle + sliceAngle / 2);
                var labelY =
                    this.canvas.height / 2 +
                    (this.radius / 2) * Math.sin(startAngle + sliceAngle / 2);

                if (this.options.doughnutHoleSize) {
                    var offset = (this.radius * this.options.doughnutHoleSize) / 2;
                    labelX =
                        this.canvas.width / 2 +
                        (offset + this.radius / 2) * Math.cos(startAngle + sliceAngle / 2);
                    labelY =
                        this.canvas.height / 2 +
                        (offset + this.radius / 2) * Math.sin(startAngle + sliceAngle / 2);
                }

                var labelText = Math.round((100 * val) / this.totalValue);
                this.ctx.fillStyle = "black";
                this.ctx.font = "20px Mono";
                this.ctx.fillText(labelText + "%", labelX-20, labelY);
                startAngle += sliceAngle;
            }
        }

        drawTitle() {
            this.ctx.save();

            this.ctx.textBaseline = "bottom";
            this.ctx.textAlign = this.titleOptions.align;
            this.ctx.fillStyle = this.titleOptions.fill;
            this.ctx.font = `${this.titleOptions.font.weight} ${this.titleOptions.font.size} ${this.titleOptions.font.family}`;

            let xPos = this.canvas.width / 2;

            if (this.titleOptions.align == "left") {
                xPos = 10;
            }
            if (this.titleOptions.align == "right") {
                xPos = this.canvas.width - 10;
            }

            this.ctx.fillText(this.options.seriesName, xPos, this.canvas.height);

            this.ctx.restore();
        }

        drawLegend() {
            /*
            let pIndex = 0;
            let legend = document.querySelector("div[for='myCanvas']");
            let ul = document.createElement("ul");
            legend.append(ul);

            for (let i = 0; i < this.options.data.length; i++) {
                let li = document.createElement("li");
                li.style.listStyle = "none";
                li.style.borderLeft =
                    "20px solid " + this.colors[pIndex % this.colors.length];
                li.style.padding = "5px";
                li.textContent = this.options.data[i].getPrimaryLabel();
                ul.append(li);
                pIndex++;
            }
            */
        }

        draw() {
            this.drawSlices();
            this.drawLabels();
            this.drawTitle();
            this.drawLegend();
        }

        private drawLine(ctx, startX, startY, endX, endY, color): void {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
            ctx.restore();
        }

        private drawArc(ctx, centerX, centerY, radius, startAngle, endAngle, color): void {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.stroke();
            ctx.restore();
        }

        private drawPieSlice(
            ctx,
            centerX,
            centerY,
            radius,
            startAngle,
            endAngle,
            fillColor,
            strokeColor?
        ): void {
            ctx.save();
            ctx.fillStyle = fillColor;
            ctx.strokeStyle = strokeColor;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            ctx.restore();
        }
    }
}