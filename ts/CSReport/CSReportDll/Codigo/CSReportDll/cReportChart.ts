(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportChart = function() {

        const self = {};

        const C_MODULE = "cReportChart";

        let m_series = new cReportChartSeries();
        let m_chartLineStyle = null;
        let m_chartBarOutline = null;
        let m_chartShowValues = null;
        let m_pieThickness = null;
        let m_pieDiameter = null;
        let m_imageFormat = csRptChartFormat.PNG;
        let m_copyright = "";
        let m_chartTitle = "";
        let m_chartType = null;
        let m_top = 0;
        let m_chartCreated = null;
        let m_groupFieldName = "";
        let m_groupValue = "";
        let m_groupFieldIndex = 0;
        let m_sort = null;
        let m_image = null;

        self.getLastErrorDescription = function() {
            return cError.getLastErrorDescription();
        };

        self.getLastErrorInfoAdd = function() {
            return cError.getLastErrorInfoAdd();
        };

        self.getLastErrorModule = function() {
            return cError.getLastErrorModule();
        };

        self.getLastErrorNumber = function() {
            return cError.getLastErrorNumber();
        };

        self.getLastErrorLine = function() {
            return cError.getLastErrorLine();
        };

        self.getLastErrorFunction = function() {
            return cError.getLastErrorFunction();
        };

        self.getSeries = function() {
            return m_series;
        };

        self.setSeries = function(rhs) {
            m_series = rhs;
        };

        self.getGridLines = function() {
            return m_chartLineStyle;
        };

        self.setGridLines = function(value) {
            m_chartLineStyle = value;
        };

        self.getOutlineBars = function() {
            return m_chartBarOutline;
        };

        self.setOutlineBars = function(value) {
            m_chartBarOutline = value;
        };

        self.getShowValues = function() {
            return m_chartShowValues;
        };

        self.setShowValues = function(value) {
            m_chartShowValues = value;
        };

        self.getThickness = function() {
            return m_pieThickness;
        };

        self.setThickness = function(value) {
            m_pieThickness = value;
        };

        self.getDiameter = function() {
            return m_pieDiameter;
        };

        self.setDiameter = function(value) {
            m_pieDiameter = value;
        };

        self.getFormat = function() {
            return m_imageFormat;
        };

        self.setFormat = function(value) {
            m_imageFormat = value;
        };

        self.getCopyRight = function() {
            return m_copyright;
        };

        self.setCopyRight = function(value) {
            m_copyright = value;
        };

        self.getGroupFieldName = function() {
            return m_groupFieldName;
        };

        self.setGroupFieldName = function(value) {
            m_groupFieldName = value;
        };

        self.getGroupValue = function() {
            return m_groupValue;
        };

        self.setGroupValue = function(value) {
            m_groupValue = value;
        };

        self.getGroupFieldIndex = function() {
            return m_groupFieldIndex;
        };

        self.setGroupFieldIndex = function(value) {
            m_groupFieldIndex = value;
        };

        self.getChartTitle = function() {
            return m_chartTitle;
        };

        self.setChartTitle = function(rhs) {
            m_chartTitle = rhs;
        };

        self.getSort = function() {
            return m_sort;
        };

        self.setSort = function(rhs) {
            m_sort = rhs;
        };

        self.getChartType = function() {
            return m_chartType;
        };

        self.setChartType = function(rhs) {
            m_chartType = rhs;
        };

        self.getTop = function() {
            return m_top;
        };

        self.setTop = function(rhs) {
            m_top = rhs;
        };

        self.getChartCreated = function() {
            return m_chartCreated;
        };

        self.setChartCreated = function(rhs) {
            m_chartCreated = rhs;
        };

        self.getImage = function() {
            return m_image;
        };

        self.setImage = function(rhs) {
            m_image = rhs;
        };

        self.makeChartFromRs = function(rs, fileName) {
            cError.setSilent(true);
            return make(rs.Rows, "###,###,##0.00", true, fileName);
        };

        self.load = function(xDoc, nodeObj) {
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Chart");

            if (nodeObj !== null) {
                m_chartLineStyle = xDoc.getNodeProperty(nodeObj, "LineStyle").getValueInt(eTypes.eInteger);
                m_chartBarOutline = xDoc.getNodeProperty(nodeObj, "BarOutline").getValueBool(eTypes.eBoolean);
                m_chartShowValues = xDoc.getNodeProperty(nodeObj, "ShowValues").getValueBool(eTypes.eBoolean);
                m_pieThickness = xDoc.getNodeProperty(nodeObj, "PieThickness").getValueInt(eTypes.eInteger);
                m_pieDiameter = xDoc.getNodeProperty(nodeObj, "PieDiameter").getValueInt(eTypes.eInteger);
                m_imageFormat = xDoc.getNodeProperty(nodeObj, "ImageFormat").getValueInt(eTypes.eInteger);
                m_copyright = xDoc.getNodeProperty(nodeObj, "Copyright").getValueString(eTypes.eText);
                m_chartTitle = xDoc.getNodeProperty(nodeObj, "ChartTitle").getValueString(eTypes.eText);
                m_chartType = xDoc.getNodeProperty(nodeObj, "ChartType").getValueInt(eTypes.eInteger);
                m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eInteger);
                m_groupValue = xDoc.getNodeProperty(nodeObj, "GroupValue").getValueString(eTypes.eText);
                m_groupFieldName = xDoc.getNodeProperty(nodeObj, "GroupFieldName").getValueString(eTypes.eText);
                m_groupFieldIndex = xDoc.getNodeProperty(nodeObj, "GroupFieldIndex").getValueInt(eTypes.eInteger);
                m_sort = xDoc.getNodeProperty(nodeObj, "Sort").getValueBool(eTypes.eBoolean);

                let nodeObjAux = null;
                let nodeObjSerie = null;
                let index = 0;

                nodeObj = xDoc.getNodeFromNode(nodeObj, "Series");

                if (xDoc.nodeHasChild(nodeObj)) {
                    nodeObjSerie = xDoc.getNodeChild(nodeObj);

                    while (nodeObjSerie !== null) {
                        index = index + 1;
                        nodeObjAux = nodeObjSerie;
                        if (!getSeries().add(null, "").load(xDoc, nodeObjAux, index)) {
                            return false;
                        }
                        nodeObjSerie = xDoc.getNextNode(nodeObjSerie);
                    }
                }
            }

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Chart");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("LineStyle");
            xProperty.setValue(eTypes.eInteger, m_chartLineStyle);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BarOutline");
            xProperty.setValue(eTypes.eBoolean, m_chartBarOutline);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ShowValues");
            xProperty.setValue(eTypes.eBoolean, m_chartShowValues);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PieThickness");
            xProperty.setValue(eTypes.eInteger, m_pieThickness);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PieDiameter");
            xProperty.setValue(eTypes.eInteger, m_pieDiameter);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ImageFormat");
            xProperty.setValue(eTypes.eInteger, m_imageFormat);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Copyright");
            xProperty.setValue(eTypes.eText, m_copyright);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ChartTitle");
            xProperty.setValue(eTypes.eText, m_chartTitle);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ChartType");
            xProperty.setValue(eTypes.eInteger, m_chartType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top");
            xProperty.setValue(eTypes.eInteger, m_top);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupFieldName");
            xProperty.setValue(eTypes.eText, m_groupFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupFieldIndex");
            xProperty.setValue(eTypes.eInteger, m_groupFieldIndex);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupValue");
            xProperty.setValue(eTypes.eText, m_groupValue);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Sort");
            xProperty.setValue(eTypes.eBoolean, m_sort);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Series");
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let serie = null;
            let index = 0;

            for(var _i = 0; _i < m_series.count(); _i++) {
                serie = m_series.item(_i);
                index = index + 1;
                serie.save(xDoc, nodeObj, index);
            }

            return true;
        };

        self.make = function(rows, strFormat, bIsForWeb, fileName) {
            // we need to delete any previous work image
            //
            pDestroyImage();

            if (rows === null) {
                return false;
            }

            let chart = new cWebChart();

            chart.newChartType(m_chartType, m_chartTitle);

            pFill(chart, rows, strFormat);

            chart.setColorPrimary(m_series.item(0).getColor());
            chart.setLabelPrimary(cReportGlobals.getRealName(m_series.item(0).getValueFieldName()));
            if (m_series.count() > 1) {
                chart.setColorAlternate(m_series.item(1).getColor());
                chart.setLabelAlternate(cReportGlobals.getRealName(m_series.item(1).getValueFieldName()));
            }
            chart.setGridLines(m_chartLineStyle);
            chart.setOutlineBars(m_chartBarOutline);
            chart.setShowValues(m_chartShowValues);
            chart.setShowLegend((m_chartType === csRptChartType.BAR) ? false : m_chartShowValues);

            chart.setThickness(m_pieThickness);
            chart.setDiameter(m_pieDiameter);

            if (!bIsForWeb) {
                fileName = cUtil.getValidPath(System.IO.Path.GetTempPath()) + "~ChartImage";
            }

            chart.setFormat(m_imageFormat);

            // saveToFile
            chart.setSaveTo(1);
            chart.setFileName(fileName);

            pKillFile(fileName);

            chart.setCopyRight(m_copyright);
            chart.renderWebChartImage();

            if (!bIsForWeb) {
                loadChart(fileName);
            }

            m_chartCreated = true;
            return true;

            chart.Dispose();
        };

        const pGetExt = function() {
            let _rtn = "";
            switch (m_imageFormat)
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
        };

        const pKillFile = function(fileName) {
            try { File.Delete(fileName); }
            catch  (ex) { }
        };

        const loadChart = function(fileName) {
            // we need to delete any previous work image
            //
            pDestroyImage();

            if (fileName.Length > 0) {
                let image = Image.FromFile(fileName);
            }
        };

        const pDestroyImage = function() {
            m_chartCreated = false;
        };

        const pGetSerieValues = function(
            rows, 
            v, 
            valueIndex, 
            labelIndex, 
            bOthers) {
            let i = 0;
            let j = 0;
            let q = 0;
            let value = 0;
            let bFound = false;
            let bCompare = false;
            let newTop = 0;

            if (m_groupFieldIndex >= 0) {
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for (j = 0; j < rows.Count; j++) {
                    if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) {
                        newTop++;
                    }
                }

                if (newTop > 0) { newTop--; }

                if (v.Length > newTop) {
                    pRedimPreserve(v, newTop);
                }
            }

            if (m_sort) {

                if (m_groupFieldIndex >= 0) {
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    for (j = 0; j < rows.Count; j++) {

                        if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) {
                            v[0].value = cReportGlobals.valVariant(rows[j][valueIndex]);
                            v[0].label = cReportGlobals.valVariant(rows[j][labelIndex]);
                            v[0].idx = j;
                            break;
                        }
                    }

                }
                else {
                    v[0].value = cReportGlobals.valVariant(rows[0][valueIndex]);
                    v[0].label = cReportGlobals.valVariant(rows[0][labelIndex]);
                    v[0].idx = 0;
                }
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for (j = 0; j < rows.Count; j++) {

                    if (m_groupFieldIndex >= 0) {
                        bCompare = cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue;
                    }
                    else {
                        bCompare = true;
                    }

                    if (bCompare) {
                        value = cUtil.val(cReportGlobals.valVariant(rows[j][valueIndex]));

                        if (value > v[0].value) {
                            v[0].value = value;
                            v[0].label = cReportGlobals.valVariant(rows[j][labelIndex]);
                            v[0].idx = j;
                        }
                    }
                }

                for (i = 0; i < v.Length; i++) {

                    v[i].idx = -1;
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    for (j = 0; j < rows.Count; j++) {

                        if (m_groupFieldIndex >= 0) {
                            bCompare = cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue;
                        }
                        else {
                            bCompare = true;
                        }

                        if (bCompare) {
                            value = cUtil.val(cReportGlobals.valVariant(rows[j][valueIndex]));

                            if (
                                && value <= v[i - 1].value && j !== v[i - 1].idx) {

                                bFound = false;
                                for (q = 0; q <= i; q++) {
                                    if (j === v[q].idx) {
                                        bFound = true;
                                        break;
                                    }
                                }

                                if (!bFound) {
                                    v[i].value = value;
                                    v[i].label = cReportGlobals.valVariant(rows[j][labelIndex]).ToString();
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
                for (j = 0; j < rows.Count; j++) {
                    if (m_groupFieldIndex >= 0) {
                        if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) {
                            if (pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; }
                        }
                    }
                    else {
                        if (pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; }
                    }
                }

                if (bOthers) {
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    if (rows.Count > v.Length) {
                        let n = 0;
                        let k = 0;
                        let bHaveToRedim = false;
                        bHaveToRedim = true;
                        n = v.Length + 1;
                        // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                        for (j = 0; j < rows.Count; j++) {
                            if (m_groupFieldIndex >= 0) {
                                if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) {
                                    if (k >= n) {
                                        if (bHaveToRedim) {
                                            pRedimPreserve(v, n);
                                            bHaveToRedim = false;
                                        }
                                        pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.Length, j, true);
                                    }
                                    else {
                                        k = k + 1;
                                    }
                                }
                            }
                            else {
                                if (bHaveToRedim) {
                                    pRedimPreserve(v, n);
                                    bHaveToRedim = false;
                                }
                                pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.Length, j, true);
                            }
                        }
                    }
                }
            }
        };

        const pGetSerieValuesAux = function(
            rows, 
            v, 
            valueIndex, 
            labelIndex, 
            i, 
            j, 
            bAdd) {
            if (bAdd) {
                v[i].value = v[i].value + cReportGlobals.valVariant(rows[j][valueIndex]);
            }
            else {
                v[i].value = cReportGlobals.valVariant(rows[j][valueIndex]);
            }
            v[i].label = cReportGlobals.valVariant(rows[j][labelIndex]);
            v[i].idx = j;
            i = i + 1;
            return i > v.Length;
        };

        const pFill = function(chart, rows, strFormat) {
            let i = 0;
            let values = null;
            let serie = null;
            let idxSerie = 0;

            if (m_top === 0) { m_top = 50; }

            // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
            if (rows.Count < 0) { return; }

            // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
            if (rows.Count < m_top) {
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                pRedim(values, rows.Count);
            } 
            else {
                pRedim(values, m_top - 1);
            }

            for(var _i = 0; _i < m_series.count(); _i++) {
                serie = m_series.item(_i);

                // At the time we only support two series
                //
                idxSerie = idxSerie + 1;
                if (idxSerie > 2) { return; }

                pGetSerieValues(rows, 
                                values, 
                                serie.getValueIndex(), 
                                serie.getLabelIndex(), 
                                m_chartType === csRptChartType.PIE);

                for (i = 0; i < values.Length; i++) {

                    if (values[i].idx !== -1) {
                        if (idxSerie === 1) {
                            let w_add = chart.getItems().add(null);
                            w_add.setPrimaryValue(values[i].value);
                            w_add.setPrimaryLabel(cReportGlobals.format(values[i].label, strFormat));
                            w_add.setPieLabel(cReportGlobals.format(values[i].label, strFormat));
                            w_add.setAlternateValue(0);
                        } 
                        else if (idxSerie === 2) {
                            let w_item = chart.getItems().item(i);
                            w_item.setAlternateValue(values[i].value);
                            w_item.setPieLabel(cReportGlobals.format(values[i].label, strFormat));
                            w_item.setAltLabel(cReportGlobals.format(values[i].label, strFormat));
                        }
                    }
                }

                if ( && m_chartType === csRptChartType.PIE) {

                    let w_item = chart.getItems().item(chart.getItems().count()-1);
                    w_item.setPrimaryLabel("Otros");
                    w_item.setPieLabel("Otros");
                }

            }

            if (chart.getItems().count() > 0) {
                chart.getItems().item(0).setExplode(true);
            }
        };

        const pRedimPreserve = function(vSeries, size) {
            if (size === 0) {
                vSeries = null;
            }
            else {
                if (vSeries === null) {
                    vSeries = new t_SerieValue[size];
                }
                else if (vSeries.Length === 0) {
                    vSeries = new t_SerieValue[size];
                }
                else {
                    let newArray = new t_SerieValue[size];
                    Array.Copy(vSeries, newArray, vSeries.Length);
                    vSeries = newArray;
                }
            }
        };

        const pRedim = function(vSeries, size) {
            if (size === 0) {
                vSeries = null;
            }
            else {
                vSeries = new t_SerieValue[size];
            }
        };

        const createT_SerieValue = function() {

            const self = {};
            self.label = null;
            self.value = null;
            self.idx = null;
        };

        return self;

    }
}(globalObject));
