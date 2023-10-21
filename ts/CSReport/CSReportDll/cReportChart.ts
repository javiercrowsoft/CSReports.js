namespace CSReportDll {

    import csRptChartLineStyle = CSReportGlobals.csRptChartLineStyle;
    import csRptChartPieThickness = CSReportGlobals.csRptChartPieThickness;
    import csRptChartPieDiameter = CSReportGlobals.csRptChartPieDiameter;
    import csRptChartFormat = CSReportGlobals.csRptChartFormat;
    import csRptChartType = CSReportGlobals.csRptChartType;
    import ReportGlobals = CSReportGlobals.ReportGlobals;
    import XmlNode = CSXml.XmlNode;
    import eTypes = CSKernelClient.eTypes;
    import cWebChart = CSChartServer.cWebChart;
    import DataTable = CSDatabase.DataTable;
    import cError = CSKernelClient.cError;
    import Utils = CSOAPI.Utils;
    import cWebChartItem = CSChartServer.cWebChartItem;

    export class cReportChart {

        private series: cReportChartSeries = new cReportChartSeries();
        private chartLineStyle: csRptChartLineStyle = null;
        private chartBarOutline: boolean = null;
        private chartShowValues: boolean = null;
        private pieThickness: csRptChartPieThickness = null;
        private pieDiameter: csRptChartPieDiameter = null;
        private imageFormat: csRptChartFormat = csRptChartFormat.PNG;
        private copyright: string = "";
        private chartTitle: string = "";
        private chartType: csRptChartType = null;
        private top: number = 0;
        private chartCreated: boolean = null;
        private groupFieldName: string = "";
        private groupValue: string = "";
        private groupFieldIndex: number = 0;
        private sort: boolean = null;
        private image: object = null;

        public getSeries() {
            return this.series;
        }

        public setSeries(rhs: cReportChartSeries) {
            this.series = rhs;
        }

        public getGridLines() {
            return this.chartLineStyle;
        }

        public setGridLines(value: csRptChartLineStyle) {
            this.chartLineStyle = value;
        }

        public getOutlineBars() {
            return this.chartBarOutline;
        }

        public setOutlineBars(value: boolean) {
            this.chartBarOutline = value;
        }

        public getShowValues() {
            return this.chartShowValues;
        }

        public setShowValues(value: boolean) {
            this.chartShowValues = value;
        }

        public getThickness() {
            return this.pieThickness;
        }

        public setThickness(value: csRptChartPieThickness) {
            this.pieThickness = value;
        }

        public getDiameter() {
            return this.pieDiameter;
        }

        public setDiameter(value: csRptChartPieDiameter) {
            this.pieDiameter = value;
        }

        public getFormat() {
            return this.imageFormat;
        }

        public setFormat(value: csRptChartFormat) {
            this.imageFormat = value;
        }

        public getCopyRight() {
            return this.copyright;
        }

        public setCopyRight(value: string) {
            this.copyright = value;
        }

        public getGroupFieldName() {
            return this.groupFieldName;
        }

        public setGroupFieldName(value: string) {
            this.groupFieldName = value;
        }

        public getGroupValue() {
            return this.groupValue;
        }

        public setGroupValue(value: string) {
            this.groupValue = value;
        }

        public getGroupFieldIndex() {
            return this.groupFieldIndex;
        }

        public setGroupFieldIndex(value: number) {
            this.groupFieldIndex = value;
        }

        public getChartTitle() {
            return this.chartTitle;
        }

        public setChartTitle(rhs: string) {
            this.chartTitle = rhs;
        }

        public getSort() {
            return this.sort;
        }

        public setSort(rhs: boolean) {
            this.sort = rhs;
        }

        public getChartType() {
            return this.chartType;
        }

        public setChartType(rhs: csRptChartType) {
            this.chartType = rhs;
        }

        public getTop() {
            return this.top;
        }

        public setTop(rhs: number) {
            this.top = rhs;
        }

        public getChartCreated() {
            return this.chartCreated;
        }

        public setChartCreated(rhs: boolean) {
            this.chartCreated = rhs;
        }

        public getImage() {
            return this.image;
        }

        public setImage(rhs: object) {
            this.image = rhs;
        }

        public makeChartFromRs(rs: DataTable, fileName: string) {
            cError.setSilent(true);
            return this.make(rs.getRows(), "###,###,##0.00", true, fileName);
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Chart");

            if(nodeObj !== null) {
                this.chartLineStyle = xDoc.getNodeProperty(nodeObj, "LineStyle").getValueInt(eTypes.eInteger);
                this.chartBarOutline = xDoc.getNodeProperty(nodeObj, "BarOutline").getValueBool(eTypes.eBoolean);
                this.chartShowValues = xDoc.getNodeProperty(nodeObj, "ShowValues").getValueBool(eTypes.eBoolean);
                this.pieThickness = xDoc.getNodeProperty(nodeObj, "PieThickness").getValueInt(eTypes.eInteger);
                this.pieDiameter = xDoc.getNodeProperty(nodeObj, "PieDiameter").getValueInt(eTypes.eInteger);
                this.imageFormat = xDoc.getNodeProperty(nodeObj, "ImageFormat").getValueInt(eTypes.eInteger);
                this.copyright = xDoc.getNodeProperty(nodeObj, "Copyright").getValueString(eTypes.eText);
                this.chartTitle = xDoc.getNodeProperty(nodeObj, "ChartTitle").getValueString(eTypes.eText);
                this.chartType = xDoc.getNodeProperty(nodeObj, "ChartType").getValueInt(eTypes.eInteger);
                this.top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eInteger);
                this.groupValue = xDoc.getNodeProperty(nodeObj, "GroupValue").getValueString(eTypes.eText);
                this.groupFieldName = xDoc.getNodeProperty(nodeObj, "GroupFieldName").getValueString(eTypes.eText);
                this.groupFieldIndex = xDoc.getNodeProperty(nodeObj, "GroupFieldIndex").getValueInt(eTypes.eInteger);
                this.sort = xDoc.getNodeProperty(nodeObj, "Sort").getValueBool(eTypes.eBoolean);

                let nodeObjAux: XmlNode = null;
                let nodeObjSeries: XmlNode = null;
                let index: number = 0;

                nodeObj = xDoc.getNodeFromNode(nodeObj, "Series");

                if(xDoc.nodeHasChild(nodeObj)) {
                    nodeObjSeries = xDoc.getNodeChild(nodeObj);

                    while (nodeObjSeries !== null) {
                        index = index + 1;
                        nodeObjAux = nodeObjSeries;
                        if(!this.getSeries().add(null, "").load(xDoc, nodeObjAux, index)) {
                            return false;
                        }
                        nodeObjSeries = xDoc.getNextNode(nodeObjSeries);
                    }
                }
            }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty = new CSXml.cXmlProperty();
            xProperty.setName("Chart");

            let nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("LineStyle");
            xProperty.setValue(eTypes.eInteger, this.chartLineStyle);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BarOutline");
            xProperty.setValue(eTypes.eBoolean, this.chartBarOutline);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ShowValues");
            xProperty.setValue(eTypes.eBoolean, this.chartShowValues);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PieThickness");
            xProperty.setValue(eTypes.eInteger, this.pieThickness);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PieDiameter");
            xProperty.setValue(eTypes.eInteger, this.pieDiameter);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ImageFormat");
            xProperty.setValue(eTypes.eInteger, this.imageFormat);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Copyright");
            xProperty.setValue(eTypes.eText, this.copyright);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ChartTitle");
            xProperty.setValue(eTypes.eText, this.chartTitle);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ChartType");
            xProperty.setValue(eTypes.eInteger, this.chartType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top");
            xProperty.setValue(eTypes.eInteger, this.top);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupFieldName");
            xProperty.setValue(eTypes.eText, this.groupFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupFieldIndex");
            xProperty.setValue(eTypes.eInteger, this.groupFieldIndex);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupValue");
            xProperty.setValue(eTypes.eText, this.groupValue);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Sort");
            xProperty.setValue(eTypes.eBoolean, this.sort);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Series");
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let serie: cReportChartSequence = null;
            let index: number = 0;

            for(let _i = 0; _i < this.series.count(); _i++) {
                serie = this.series.item(_i);
                index = index + 1;
                serie.save(xDoc, nodeObj, index);
            }

            return true;
        }

        public make(rows: any[][], strFormat: string, bIsForWeb: boolean, fileName: string) {
            // we need to delete any previous work image
            //
            this.destroyImage();

            if(rows === null) {
                return false;
            }

            let chart: cWebChart = new cWebChart();

            chart.newChartType(this.chartType, this.chartTitle);

            this.fill(chart, rows, strFormat);

            chart.setColorPrimary(this.series.item(0).getColor());
            chart.setLabelPrimary(ReportGlobals.getRealName(this.series.item(0).getValueFieldName()));
            if(this.series.count() > 1) {
                chart.setColorAlternate(this.series.item(1).getColor());
                chart.setLabelAlternate(ReportGlobals.getRealName(this.series.item(1).getValueFieldName()));
            }
            chart.setGridLines(this.chartLineStyle);
            chart.setOutlineBars(this.chartBarOutline);
            chart.setShowValues(this.chartShowValues);
            chart.setShowLegend((this.chartType === csRptChartType.BAR) ? false : this.chartShowValues);

            chart.setThickness(this.pieThickness);
            chart.setDiameter(this.pieDiameter);

            if(!bIsForWeb) {
                fileName = Utils.getValidPath(""/* TODO: reimplement * System.IO.Path.GetTempPath()*/) + "~ChartImage";
            }

            chart.setFormat(this.imageFormat);

            // saveToFile
            chart.setSaveTo(1);
            chart.setFileName(fileName);

            this.killFile(fileName);

            chart.setCopyRight(this.copyright);
            chart.renderWebChartImage();

            if(!bIsForWeb) {
                this.loadChart(fileName);
            }

            this.chartCreated = true;
            chart.dispose();

            return true;
        }

        private pGetExt() {
            let _rtn: string = "";
            switch (this.imageFormat)
            {
                case csRptChartFormat.BMP:
                    _rtn = ".bmp";
                    break;
                case csRptChartFormat.JPEG:
                    _rtn = ".jpg";
                    break;
                case csRptChartFormat.GIF:
                    _rtn = ".gif";
                    break;
                case csRptChartFormat.PNG:
                    _rtn = ".png";
                    break;
            }
            return _rtn;
        }

        private killFile(fileName: string) {
            // TODO: reimplement
            /*
            try { File.delete(fileName); }
            catch  (ex) { }
             */
        }

        private loadChart(fileName: string) {
            // we need to delete any previous work image
            //
            this.destroyImage();

            if(fileName.length > 0) {
                // TODO: reimplement
                //  let image: Image = Image.FromFile(fileName);
            }
        }

        private destroyImage() {
            this.chartCreated = false;
        }

        private getSeriesValues(
            rows: any[][],
            v: t_SerieValue[],
            valueIndex: number,
            labelIndex: number,
            bOthers: boolean) {
            let i: number = 0;
            let j: number = 0;
            let q: number = 0;
            let value: number = 0;
            let bFound: boolean = false;
            let bCompare: boolean = false;
            let newTop: number = 0;

            if(this.groupFieldIndex >= 0) {
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for(j = 0; j < rows.length; j++) {
                    if(ReportGlobals.valVariant(rows[j][this.groupFieldIndex]) === this.groupValue) {
                        newTop++;
                    }
                }

                if(newTop > 0) { newTop--; }
            }

            if(this.sort) {

                if(this.groupFieldIndex >= 0) {
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    for(j = 0; j < rows.length; j++) {

                        if(ReportGlobals.valVariant(rows[j][this.groupFieldIndex]) === this.groupValue) {
                            v[0].value = ReportGlobals.valVariant(rows[j][valueIndex]);
                            v[0].label = ReportGlobals.valVariant(rows[j][labelIndex]);
                            v[0].idx = j;
                            break;
                        }
                    }

                }
                else {
                    v[0].value = ReportGlobals.valVariant(rows[0][valueIndex]);
                    v[0].label = ReportGlobals.valVariant(rows[0][labelIndex]);
                    v[0].idx = 0;
                }
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for(j = 0; j < rows.length; j++) {

                    if(this.groupFieldIndex >= 0) {
                        bCompare = ReportGlobals.valVariant(rows[j][this.groupFieldIndex]) === this.groupValue;
                    }
                    else {
                        bCompare = true;
                    }

                    if(bCompare) {
                        value = Utils.val(ReportGlobals.valVariant(rows[j][valueIndex]));

                        if(value > v[0].value) {
                            v[0].value = value;
                            v[0].label = ReportGlobals.valVariant(rows[j][labelIndex]);
                            v[0].idx = j;
                        }
                    }
                }

                for(i = 0; i < v.length; i++) {

                    v[i].idx = -1;
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    for(j = 0; j < rows.length; j++) {

                        if(this.groupFieldIndex >= 0) {
                            bCompare = ReportGlobals.valVariant(rows[j][this.groupFieldIndex]) === this.groupValue;
                        }
                        else {
                            bCompare = true;
                        }

                        if(bCompare) {
                            value = Utils.val(ReportGlobals.valVariant(rows[j][valueIndex]));

                            if((value > v[i].value || v[i].idx == -1)
                                && value <= v[i - 1].value && j !== v[i - 1].idx) {

                                bFound = false;
                                for(q = 0; q <= i; q++) {
                                    if(j === v[q].idx) {
                                        bFound = true;
                                        break;
                                    }
                                }

                                if(!bFound) {
                                    v[i].value = value;
                                    v[i].label = ReportGlobals.valVariant(rows[j][labelIndex]).toString();
                                    v[i].idx = j;
                                }
                            }
                        }
                    }
                }
            }
            else {
                i = 0;
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for(j = 0; j < rows.length; j++) {
                    if(this.groupFieldIndex >= 0) {
                        if(ReportGlobals.valVariant(rows[j][this.groupFieldIndex]) === this.groupValue) {
                            if(this.pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; }
                        }
                    }
                    else {
                        if(this.pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; }
                    }
                }

                if(bOthers) {
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    if(rows.length > v.length) {
                        let n: number = 0;
                        let k: number = 0;
                        let bHaveToRedim: boolean = false;
                        bHaveToRedim = true;
                        n = v.length + 1;
                        // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                        for(j = 0; j < rows.length; j++) {
                            if(this.groupFieldIndex >= 0) {
                                if(ReportGlobals.valVariant(rows[j][this.groupFieldIndex]) === this.groupValue) {
                                    if(k >= n) {
                                        if(bHaveToRedim) {
                                            this.redimPreserve(v, n);
                                            bHaveToRedim = false;
                                        }
                                        this.pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.length, j, true);
                                    }
                                    else {
                                        k = k + 1;
                                    }
                                }
                            }
                            else {
                                if(bHaveToRedim) {
                                    this.redimPreserve(v, n);
                                    bHaveToRedim = false;
                                }
                                this.pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.length, j, true);
                            }
                        }
                    }
                }
            }
        }

        private pGetSerieValuesAux(
            rows: any[][],
            v: t_SerieValue[],
            valueIndex: number,
            labelIndex: number,
            i: number,
            j: number,
            bAdd: boolean) {
            if(bAdd) {
                v[i].value = v[i].value + ReportGlobals.valVariant<number>(rows[j][valueIndex]);
            }
            else {
                v[i].value = ReportGlobals.valVariant(rows[j][valueIndex]);
            }
            v[i].label = ReportGlobals.valVariant(rows[j][labelIndex]);
            v[i].idx = j;
            i = i + 1;
            return i > v.length;
        }

        private fill(chart: cWebChart, rows: any[][], strFormat: string) {
            let i: number = 0;
            let values: t_SerieValue[] = null;
            let serie: cReportChartSequence = null;
            let idxSerie: number = 0;

            if(this.top === 0) { this.top = 50; }

            // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
            if(rows.length < 0) { return; }

            for(let _i = 0; _i < this.series.count(); _i++) {
                serie = this.series.item(_i);

                // At the time we only support two series
                //
                idxSerie = idxSerie + 1;
                if(idxSerie > 2) { return; }

                this.getSeriesValues(rows,
                                values,
                                serie.getValueIndex(),
                                serie.getLabelIndex(),
                                this.chartType === csRptChartType.PIE);

                for(i = 0; i < values.length; i++) {

                    if(values[i].idx !== -1) {
                        if(idxSerie === 1) {
                            let w_add: cWebChartItem = chart.getItems().add(null);
                            w_add.setPrimaryValue(values[i].value);
                            w_add.setPrimaryLabel(ReportGlobals.format(values[i].label, strFormat));
                            w_add.setPieLabel(ReportGlobals.format(values[i].label, strFormat));
                            w_add.setAlternateValue(0);
                        }
                        else if(idxSerie === 2) {
                            let w_item: cWebChartItem = chart.getItems().item(i);
                            w_item.setAlternateValue(values[i].value);
                            w_item.setPieLabel(ReportGlobals.format(values[i].label, strFormat));
                            w_item.setAltLabel(ReportGlobals.format(values[i].label, strFormat));
                        }
                    }
                }

                if((values.length > this.top - 1) && this.chartType === csRptChartType.PIE) {

                    let w_item: cWebChartItem = chart.getItems().item(chart.getItems().count()-1);
                    w_item.setPrimaryLabel("Otros");
                    w_item.setPieLabel("Otros");
                }

            }

            if(chart.getItems().count() > 0) {
                chart.getItems().item(0).setExplode(true);
            }
        }

        private redimPreserve(vSeries: t_SerieValue[], size: number) {
            if(size === 0) {
                vSeries = null;
            }
            else {
                if(vSeries === null) {
                    vSeries = new t_SerieValue[size];
                }
                else if(vSeries.length === 0) {
                    vSeries = new t_SerieValue[size];
                }
                else {
                    vSeries.length = size;
                }
            }
        }

        private redim(vSeries: t_SerieValue[], size: number) {
            if(size === 0) {
                vSeries = null;
            }
            else {
                vSeries = new t_SerieValue[size];
            }
        }

        toString() {
            return "type: " + this.chartType;
        }
    }

    class t_SerieValue {
        public label: string = null;
        public value: number = null;
        public idx: number = null;
    }
}
