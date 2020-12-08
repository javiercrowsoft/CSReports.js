(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportChart = function() {

        const self = {}; //@@@: public class cReportChart

        const C_MODULE = "cReportChart"; //@@@: private const String C_MODULE = "cReportChart";

        let m_series = new cReportChartSeries(); //@@@: private cReportChartSeries m_series = new cReportChartSeries();
        let m_chartLineStyle = null; //@@@: private csRptChartLineStyle m_chartLineStyle;
        let m_chartBarOutline = null; //@@@: private bool m_chartBarOutline;
        let m_chartShowValues = null; //@@@: private bool m_chartShowValues;
        let m_pieThickness = null; //@@@: private csRptChartPieThickness m_pieThickness;
        let m_pieDiameter = null; //@@@: private csRptChartPieDiameter m_pieDiameter;
        let m_imageFormat = csRptChartFormat.PNG; //@@@: private csRptChartFormat m_imageFormat = csRptChartFormat.PNG;
        let m_copyright = ""; //@@@: private String m_copyright = "";
        let m_chartTitle = ""; //@@@: private String m_chartTitle = "";
        let m_chartType = null; //@@@: private csRptChartType m_chartType;
        let m_top = 0; //@@@: private int m_top = 0;
        let m_chartCreated = null; //@@@: private bool m_chartCreated;
        let m_groupFieldName = ""; //@@@: private String m_groupFieldName = "";
        let m_groupValue = ""; //@@@: private String m_groupValue = "";
        let m_groupFieldIndex = 0; //@@@: private int m_groupFieldIndex = 0;
        let m_sort = null; //@@@: private bool m_sort;
        let m_image = null; //@@@: private Image m_image;

        self.getLastErrorDescription = function() { //@@@: public String getLastErrorDescription()
            return cError.getLastErrorDescription(); //@@@: return cError.getLastErrorDescription();
        }; //@@@: }

        self.getLastErrorInfoAdd = function() { //@@@: public String getLastErrorInfoAdd()
            return cError.getLastErrorInfoAdd(); //@@@: return cError.getLastErrorInfoAdd();
        }; //@@@: }

        self.getLastErrorModule = function() { //@@@: public String getLastErrorModule()
            return cError.getLastErrorModule(); //@@@: return cError.getLastErrorModule();
        }; //@@@: }

        self.getLastErrorNumber = function() { //@@@: public String getLastErrorNumber()
            return cError.getLastErrorNumber(); //@@@: return cError.getLastErrorNumber();
        }; //@@@: }

        self.getLastErrorLine = function() { //@@@: public String getLastErrorLine()
            return cError.getLastErrorLine(); //@@@: return cError.getLastErrorLine();
        }; //@@@: }

        self.getLastErrorFunction = function() { //@@@: public String getLastErrorFunction()
            return cError.getLastErrorFunction(); //@@@: return cError.getLastErrorFunction();
        }; //@@@: }

        self.getSeries = function() { //@@@: public cReportChartSeries getSeries()
            return m_series; //@@@: return m_series;
        }; //@@@: }

        self.setSeries = function(rhs) { //@@@: public void setSeries(cReportChartSeries rhs)
            m_series = rhs; //@@@: m_series = rhs;
        }; //@@@: }

        self.getGridLines = function() { //@@@: public csRptChartLineStyle getGridLines()
            return m_chartLineStyle; //@@@: return m_chartLineStyle;
        }; //@@@: }

        self.setGridLines = function(value) { //@@@: public void setGridLines(csRptChartLineStyle value)
            m_chartLineStyle = value; //@@@: m_chartLineStyle = value;
        }; //@@@: }

        self.getOutlineBars = function() { //@@@: public bool getOutlineBars()
            return m_chartBarOutline; //@@@: return m_chartBarOutline;
        }; //@@@: }

        self.setOutlineBars = function(value) { //@@@: public void setOutlineBars(bool value)
            m_chartBarOutline = value; //@@@: m_chartBarOutline = value;
        }; //@@@: }

        self.getShowValues = function() { //@@@: public bool getShowValues()
            return m_chartShowValues; //@@@: return m_chartShowValues;
        }; //@@@: }

        self.setShowValues = function(value) { //@@@: public void setShowValues(bool value)
            m_chartShowValues = value; //@@@: m_chartShowValues = value;
        }; //@@@: }

        self.getThickness = function() { //@@@: public csRptChartPieThickness getThickness()
            return m_pieThickness; //@@@: return m_pieThickness;
        }; //@@@: }

        self.setThickness = function(value) { //@@@: public void setThickness(csRptChartPieThickness value)
            m_pieThickness = value; //@@@: m_pieThickness = value;
        }; //@@@: }

        self.getDiameter = function() { //@@@: public csRptChartPieDiameter getDiameter()
            return m_pieDiameter; //@@@: return m_pieDiameter;
        }; //@@@: }

        self.setDiameter = function(value) { //@@@: public void setDiameter(csRptChartPieDiameter value)
            m_pieDiameter = value; //@@@: m_pieDiameter = value;
        }; //@@@: }

        self.getFormat = function() { //@@@: public csRptChartFormat getFormat()
            return m_imageFormat; //@@@: return m_imageFormat;
        }; //@@@: }

        self.setFormat = function(value) { //@@@: public void setFormat(csRptChartFormat value)
            m_imageFormat = value; //@@@: m_imageFormat = value;
        }; //@@@: }

        self.getCopyRight = function() { //@@@: public String getCopyRight()
            return m_copyright; //@@@: return m_copyright;
        }; //@@@: }

        self.setCopyRight = function(value) { //@@@: public void setCopyRight(String value)
            m_copyright = value; //@@@: m_copyright = value;
        }; //@@@: }

        self.getGroupFieldName = function() { //@@@: public String getGroupFieldName()
            return m_groupFieldName; //@@@: return m_groupFieldName;
        }; //@@@: }

        self.setGroupFieldName = function(value) { //@@@: public void setGroupFieldName(String value)
            m_groupFieldName = value; //@@@: m_groupFieldName = value;
        }; //@@@: }

        self.getGroupValue = function() { //@@@: public String getGroupValue()
            return m_groupValue; //@@@: return m_groupValue;
        }; //@@@: }

        self.setGroupValue = function(value) { //@@@: public void setGroupValue(String value)
            m_groupValue = value; //@@@: m_groupValue = value;
        }; //@@@: }

        self.getGroupFieldIndex = function() { //@@@: public int getGroupFieldIndex()
            return m_groupFieldIndex; //@@@: return m_groupFieldIndex;
        }; //@@@: }

        self.setGroupFieldIndex = function(value) { //@@@: public void setGroupFieldIndex(int value)
            m_groupFieldIndex = value; //@@@: m_groupFieldIndex = value;
        }; //@@@: }

        self.getChartTitle = function() { //@@@: public String getChartTitle()
            return m_chartTitle; //@@@: return m_chartTitle;
        }; //@@@: }

        self.setChartTitle = function(rhs) { //@@@: public void setChartTitle(String rhs)
            m_chartTitle = rhs; //@@@: m_chartTitle = rhs;
        }; //@@@: }

        self.getSort = function() { //@@@: public bool getSort()
            return m_sort; //@@@: return m_sort;
        }; //@@@: }

        self.setSort = function(rhs) { //@@@: public void setSort(bool rhs)
            m_sort = rhs; //@@@: m_sort = rhs;
        }; //@@@: }

        self.getChartType = function() { //@@@: public csRptChartType getChartType()
            return m_chartType; //@@@: return m_chartType;
        }; //@@@: }

        self.setChartType = function(rhs) { //@@@: public void setChartType(csRptChartType rhs)
            m_chartType = rhs; //@@@: m_chartType = rhs;
        }; //@@@: }

        self.getTop = function() { //@@@: public int getTop()
            return m_top; //@@@: return m_top;
        }; //@@@: }

        self.setTop = function(rhs) { //@@@: public void setTop(int rhs)
            m_top = rhs; //@@@: m_top = rhs;
        }; //@@@: }

        self.getChartCreated = function() { //@@@: public bool getChartCreated()
            return m_chartCreated; //@@@: return m_chartCreated;
        }; //@@@: }

        self.setChartCreated = function(rhs) { //@@@: public void setChartCreated(bool rhs)
            m_chartCreated = rhs; //@@@: m_chartCreated = rhs;
        }; //@@@: }

        self.getImage = function() { //@@@: public Image getImage()
            return m_image; //@@@: return m_image;
        }; //@@@: }

        self.setImage = function(rhs) { //@@@: public void setImage(Image rhs)
            m_image = rhs; //@@@: m_image = rhs;
        }; //@@@: }

        self.makeChartFromRs = function(rs, fileName) { //@@@: public bool makeChartFromRs(DataTable rs, String fileName)
            cError.setSilent(true); //@@@: cError.setSilent(true);
            return make(rs.Rows, "###,###,##0.00", true, fileName); //@@@: return make(rs.Rows, "###,###,##0.00", true, fileName);
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, "Chart"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Chart");

            if (nodeObj !== null) { //@@@: if (nodeObj != null)
                m_chartLineStyle = xDoc.getNodeProperty(nodeObj, "LineStyle").getValueInt(eTypes.eInteger); //@@@: m_chartLineStyle = (csRptChartLineStyle)xDoc.getNodeProperty(nodeObj, "LineStyle").getValueInt(eTypes.eInteger);
                m_chartBarOutline = xDoc.getNodeProperty(nodeObj, "BarOutline").getValueBool(eTypes.eBoolean); //@@@: m_chartBarOutline = xDoc.getNodeProperty(nodeObj, "BarOutline").getValueBool(eTypes.eBoolean);
                m_chartShowValues = xDoc.getNodeProperty(nodeObj, "ShowValues").getValueBool(eTypes.eBoolean); //@@@: m_chartShowValues = xDoc.getNodeProperty(nodeObj, "ShowValues").getValueBool(eTypes.eBoolean);
                m_pieThickness = xDoc.getNodeProperty(nodeObj, "PieThickness").getValueInt(eTypes.eInteger); //@@@: m_pieThickness = (csRptChartPieThickness)xDoc.getNodeProperty(nodeObj, "PieThickness").getValueInt(eTypes.eInteger);
                m_pieDiameter = xDoc.getNodeProperty(nodeObj, "PieDiameter").getValueInt(eTypes.eInteger); //@@@: m_pieDiameter = (csRptChartPieDiameter)xDoc.getNodeProperty(nodeObj, "PieDiameter").getValueInt(eTypes.eInteger);
                m_imageFormat = xDoc.getNodeProperty(nodeObj, "ImageFormat").getValueInt(eTypes.eInteger); //@@@: m_imageFormat = (csRptChartFormat)xDoc.getNodeProperty(nodeObj, "ImageFormat").getValueInt(eTypes.eInteger);
                m_copyright = xDoc.getNodeProperty(nodeObj, "Copyright").getValueString(eTypes.eText); //@@@: m_copyright = xDoc.getNodeProperty(nodeObj, "Copyright").getValueString(eTypes.eText);
                m_chartTitle = xDoc.getNodeProperty(nodeObj, "ChartTitle").getValueString(eTypes.eText); //@@@: m_chartTitle = xDoc.getNodeProperty(nodeObj, "ChartTitle").getValueString(eTypes.eText);
                m_chartType = xDoc.getNodeProperty(nodeObj, "ChartType").getValueInt(eTypes.eInteger); //@@@: m_chartType = (csRptChartType)xDoc.getNodeProperty(nodeObj, "ChartType").getValueInt(eTypes.eInteger);
                m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eInteger); //@@@: m_top = xDoc.getNodeProperty(nodeObj, "Top").getValueInt(eTypes.eInteger);
                m_groupValue = xDoc.getNodeProperty(nodeObj, "GroupValue").getValueString(eTypes.eText); //@@@: m_groupValue = xDoc.getNodeProperty(nodeObj, "GroupValue").getValueString(eTypes.eText);
                m_groupFieldName = xDoc.getNodeProperty(nodeObj, "GroupFieldName").getValueString(eTypes.eText); //@@@: m_groupFieldName = xDoc.getNodeProperty(nodeObj, "GroupFieldName").getValueString(eTypes.eText);
                m_groupFieldIndex = xDoc.getNodeProperty(nodeObj, "GroupFieldIndex").getValueInt(eTypes.eInteger); //@@@: m_groupFieldIndex = xDoc.getNodeProperty(nodeObj, "GroupFieldIndex").getValueInt(eTypes.eInteger);
                m_sort = xDoc.getNodeProperty(nodeObj, "Sort").getValueBool(eTypes.eBoolean); //@@@: m_sort = xDoc.getNodeProperty(nodeObj, "Sort").getValueBool(eTypes.eBoolean);

                let nodeObjAux = null; //@@@: XmlNode nodeObjAux = null;
                let nodeObjSerie = null; //@@@: XmlNode nodeObjSerie = null;
                let index = 0; //@@@: int index = 0;

                nodeObj = xDoc.getNodeFromNode(nodeObj, "Series"); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, "Series");

                if (xDoc.nodeHasChild(nodeObj)) { //@@@: if (xDoc.nodeHasChild(nodeObj))
                    nodeObjSerie = xDoc.getNodeChild(nodeObj); //@@@: nodeObjSerie = xDoc.getNodeChild(nodeObj);

                    while (nodeObjSerie !== null) { //@@@: while (nodeObjSerie != null)
                        index = index + 1; //@@@: index = index + 1;
                        nodeObjAux = nodeObjSerie; //@@@: nodeObjAux = nodeObjSerie;
                        if (!getSeries().add(null, "").load(xDoc, nodeObjAux, index)) { //@@@: if (!getSeries().add(null, "").load(xDoc, nodeObjAux, index))
                            return false; //@@@: return false;
                        } //@@@: }
                        nodeObjSerie = xDoc.getNextNode(nodeObjSerie); //@@@: nodeObjSerie = xDoc.getNextNode(nodeObjSerie);
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Chart"); //@@@: xProperty.setName("Chart");
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("LineStyle"); //@@@: xProperty.setName("LineStyle");
            xProperty.setValue(eTypes.eInteger, m_chartLineStyle); //@@@: xProperty.setValue(eTypes.eInteger, m_chartLineStyle);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("BarOutline"); //@@@: xProperty.setName("BarOutline");
            xProperty.setValue(eTypes.eBoolean, m_chartBarOutline); //@@@: xProperty.setValue(eTypes.eBoolean, m_chartBarOutline);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ShowValues"); //@@@: xProperty.setName("ShowValues");
            xProperty.setValue(eTypes.eBoolean, m_chartShowValues); //@@@: xProperty.setValue(eTypes.eBoolean, m_chartShowValues);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PieThickness"); //@@@: xProperty.setName("PieThickness");
            xProperty.setValue(eTypes.eInteger, m_pieThickness); //@@@: xProperty.setValue(eTypes.eInteger, m_pieThickness);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PieDiameter"); //@@@: xProperty.setName("PieDiameter");
            xProperty.setValue(eTypes.eInteger, m_pieDiameter); //@@@: xProperty.setValue(eTypes.eInteger, m_pieDiameter);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ImageFormat"); //@@@: xProperty.setName("ImageFormat");
            xProperty.setValue(eTypes.eInteger, m_imageFormat); //@@@: xProperty.setValue(eTypes.eInteger, m_imageFormat);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Copyright"); //@@@: xProperty.setName("Copyright");
            xProperty.setValue(eTypes.eText, m_copyright); //@@@: xProperty.setValue(eTypes.eText, m_copyright);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ChartTitle"); //@@@: xProperty.setName("ChartTitle");
            xProperty.setValue(eTypes.eText, m_chartTitle); //@@@: xProperty.setValue(eTypes.eText, m_chartTitle);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ChartType"); //@@@: xProperty.setName("ChartType");
            xProperty.setValue(eTypes.eInteger, m_chartType); //@@@: xProperty.setValue(eTypes.eInteger, m_chartType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Top"); //@@@: xProperty.setName("Top");
            xProperty.setValue(eTypes.eInteger, m_top); //@@@: xProperty.setValue(eTypes.eInteger, m_top);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupFieldName"); //@@@: xProperty.setName("GroupFieldName");
            xProperty.setValue(eTypes.eText, m_groupFieldName); //@@@: xProperty.setValue(eTypes.eText, m_groupFieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupFieldIndex"); //@@@: xProperty.setName("GroupFieldIndex");
            xProperty.setValue(eTypes.eInteger, m_groupFieldIndex); //@@@: xProperty.setValue(eTypes.eInteger, m_groupFieldIndex);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GroupValue"); //@@@: xProperty.setName("GroupValue");
            xProperty.setValue(eTypes.eText, m_groupValue); //@@@: xProperty.setValue(eTypes.eText, m_groupValue);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Sort"); //@@@: xProperty.setName("Sort");
            xProperty.setValue(eTypes.eBoolean, m_sort); //@@@: xProperty.setValue(eTypes.eBoolean, m_sort);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Series"); //@@@: xProperty.setName("Series");
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let serie = null; //@@@: cReportChartSerie serie = null;
            let index = 0; //@@@: int index = 0;

            for(var _i = 0; _i < m_series.count(); _i++) { //@@@: for (int _i = 0; _i < m_series.count(); _i++)
                serie = m_series.item(_i); //@@@: serie = m_series.item(_i);
                index = index + 1; //@@@: index = index + 1;
                serie.save(xDoc, nodeObj, index); //@@@: serie.save(xDoc, nodeObj, index);
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.make = function(rows, strFormat, bIsForWeb, fileName) { //@@@: public bool make(DataRowCollection rows, String strFormat, bool bIsForWeb, String fileName)
            // we need to delete any previous work image
            //
            pDestroyImage(); //@@@: pDestroyImage();

            if (rows === null) { //@@@: if (rows == null)
                return false; //@@@: return false;
            } //@@@: }

            let chart = new cWebChart(); //@@@: cWebChart chart = new cWebChart();

            chart.newChartType(m_chartType, m_chartTitle); //@@@: chart.newChartType((csRptChartType)m_chartType, m_chartTitle);

            pFill(chart, rows, strFormat); //@@@: pFill(chart, rows, strFormat);

            chart.setColorPrimary(m_series.item(0).getColor()); //@@@: chart.setColorPrimary((csColors)m_series.item(0).getColor());
            chart.setLabelPrimary(cReportGlobals.getRealName(m_series.item(0).getValueFieldName())); //@@@: chart.setLabelPrimary(cReportGlobals.getRealName(m_series.item(0).getValueFieldName()));
            if (m_series.count() > 1) { //@@@: if (m_series.count() > 1)
                chart.setColorAlternate(m_series.item(1).getColor()); //@@@: chart.setColorAlternate(m_series.item(1).getColor());
                chart.setLabelAlternate(cReportGlobals.getRealName(m_series.item(1).getValueFieldName())); //@@@: chart.setLabelAlternate(cReportGlobals.getRealName(m_series.item(1).getValueFieldName()));
            } //@@@: }
            chart.setGridLines(m_chartLineStyle); //@@@: chart.setGridLines(m_chartLineStyle);
            chart.setOutlineBars(m_chartBarOutline); //@@@: chart.setOutlineBars(m_chartBarOutline);
            chart.setShowValues(m_chartShowValues); //@@@: chart.setShowValues(m_chartShowValues);
            chart.setShowLegend((m_chartType === csRptChartType.BAR) ? false : m_chartShowValues); //@@@: chart.setShowLegend((m_chartType == csRptChartType.BAR) ? false : m_chartShowValues);

            chart.setThickness(m_pieThickness); //@@@: chart.setThickness(m_pieThickness);
            chart.setDiameter(m_pieDiameter); //@@@: chart.setDiameter(m_pieDiameter);

            if (!bIsForWeb) { //@@@: if (!bIsForWeb)
                fileName = cUtil.getValidPath(System.IO.Path.GetTempPath()) + "~ChartImage"; //@@@: fileName = cUtil.getValidPath(System.IO.Path.GetTempPath()) + "~ChartImage";
            } //@@@: }

            chart.setFormat(m_imageFormat); //@@@: chart.setFormat(m_imageFormat);

            // saveToFile
            chart.setSaveTo(1); //@@@: chart.setSaveTo(1);
            chart.setFileName(fileName); //@@@: chart.setFileName(fileName);

            pKillFile(fileName); //@@@: pKillFile(fileName);

            chart.setCopyRight(m_copyright); //@@@: chart.setCopyRight(m_copyright);
            chart.renderWebChartImage(); //@@@: chart.renderWebChartImage();

            if (!bIsForWeb) { //@@@: if (!bIsForWeb)
                loadChart(fileName); //@@@: loadChart(fileName);
            } //@@@: }

            m_chartCreated = true; //@@@: m_chartCreated = true;
            return true; //@@@: return true;

            chart.Dispose(); //@@@: chart.Dispose();
        }; //@@@: }

        const pGetExt = function() { //@@@: private String pGetExt()
            let _rtn = ""; //@@@: String _rtn = "";
            switch (m_imageFormat) //@@@: switch (m_imageFormat)
            { //@@@: {
                case csRptChartFormat.BMP: //@@@: case csRptChartFormat.BMP:
                    _rtn = ".bmp"; //@@@: _rtn = ".bmp";
                    break; //@@@: break;
                case csRptChartFormat.JPEG: //@@@: case csRptChartFormat.JPEG:
                    _rtn = ".jpg"; //@@@: _rtn = ".jpg";
                    break; //@@@: break;
                case csRptChartFormat.GIF: //@@@: case csRptChartFormat.GIF:
                    _rtn = ".gif"; //@@@: _rtn = ".gif";
                    break; //@@@: break;
                case csRptChartFormat.PNG: //@@@: case csRptChartFormat.PNG:
                    _rtn = ".png"; //@@@: _rtn = ".png";
                    break; //@@@: break;
            } //@@@: }
            return _rtn; //@@@: return _rtn;
        }; //@@@: }

        const pKillFile = function(fileName) { //@@@: private void pKillFile(String fileName)
            try { File.Delete(fileName); } //@@@: try { File.Delete(fileName); }
            catch  (ex) { } //@@@: catch { }
        }; //@@@: }

        const loadChart = function(fileName) { //@@@: private void loadChart(String fileName)
            // we need to delete any previous work image
            //
            pDestroyImage(); //@@@: pDestroyImage();

            if (fileName.Length > 0) { //@@@: if (fileName.Length > 0)
                let image = Image.FromFile(fileName); //@@@: Image image = Image.FromFile(fileName);
            } //@@@: }
        }; //@@@: }

        const pDestroyImage = function() { //@@@: private void pDestroyImage()
            m_chartCreated = false; //@@@: m_chartCreated = false;
        }; //@@@: }

        const pGetSerieValues = function( //@@@: private void pGetSerieValues(
            rows,  //@@@: DataRowCollection rows,
            v,  //@@@: t_SerieValue[] v,
            valueIndex,  //@@@: int valueIndex,
            labelIndex,  //@@@: int labelIndex,
            bOthers) { //@@@: bool bOthers)
            let i = 0; //@@@: int i = 0;
            let j = 0; //@@@: int j = 0;
            let q = 0; //@@@: int q = 0;
            let value = 0; //@@@: double value = 0;
            let bFound = false; //@@@: bool bFound = false;
            let bCompare = false; //@@@: bool bCompare = false;
            let newTop = 0; //@@@: int newTop = 0;

            if (m_groupFieldIndex >= 0) { //@@@: if (m_groupFieldIndex >= 0)
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for (j = 0; j < rows.Count; j++) { //@@@: for (j = 0; j < rows.Count; j++)
                    if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) { //@@@: if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) == m_groupValue)
                        newTop++; //@@@: newTop++;
                    } //@@@: }
                } //@@@: }

                if (newTop > 0) { newTop--; } //@@@: if (newTop > 0) { newTop--; }

                if (v.Length > newTop) { //@@@: if (v.Length > newTop)
                    pRedimPreserve(v, newTop); //@@@: pRedimPreserve(ref v, newTop);
                } //@@@: }
            } //@@@: }

            if (m_sort) { //@@@: if (m_sort)

                if (m_groupFieldIndex >= 0) { //@@@: if (m_groupFieldIndex >= 0)
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    for (j = 0; j < rows.Count; j++) { //@@@: for (j = 0; j < rows.Count; j++)

                        if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) { //@@@: if ((String)cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) == m_groupValue)
                            v[0].value = cReportGlobals.valVariant(rows[j][valueIndex]); //@@@: v[0].value = (double)cReportGlobals.valVariant(rows[j][valueIndex]);
                            v[0].label = cReportGlobals.valVariant(rows[j][labelIndex]); //@@@: v[0].label = (String)cReportGlobals.valVariant(rows[j][labelIndex]);
                            v[0].idx = j; //@@@: v[0].idx = j;
                            break; //@@@: break;
                        } //@@@: }
                    } //@@@: }

                } //@@@: }
                else { //@@@: else
                    v[0].value = cReportGlobals.valVariant(rows[0][valueIndex]); //@@@: v[0].value = (double)cReportGlobals.valVariant(rows[0][valueIndex]);
                    v[0].label = cReportGlobals.valVariant(rows[0][labelIndex]); //@@@: v[0].label = (String)cReportGlobals.valVariant(rows[0][labelIndex]);
                    v[0].idx = 0; //@@@: v[0].idx = 0;
                } //@@@: }
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for (j = 0; j < rows.Count; j++) { //@@@: for (j = 0; j < rows.Count; j++)

                    if (m_groupFieldIndex >= 0) { //@@@: if (m_groupFieldIndex >= 0)
                        bCompare = cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue; //@@@: bCompare = (String)cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) == m_groupValue;
                    } //@@@: }
                    else { //@@@: else
                        bCompare = true; //@@@: bCompare = true;
                    } //@@@: }

                    if (bCompare) { //@@@: if (bCompare)
                        value = cUtil.val(cReportGlobals.valVariant(rows[j][valueIndex])); //@@@: value = cUtil.val(cReportGlobals.valVariant(rows[j][valueIndex]));

                        if (value > v[0].value) { //@@@: if (value > v[0].value)
                            v[0].value = value; //@@@: v[0].value = value;
                            v[0].label = cReportGlobals.valVariant(rows[j][labelIndex]); //@@@: v[0].label = (String)cReportGlobals.valVariant(rows[j][labelIndex]);
                            v[0].idx = j; //@@@: v[0].idx = j;
                        } //@@@: }
                    } //@@@: }
                } //@@@: }

                for (i = 0; i < v.Length; i++) { //@@@: for (i = 0; i < v.Length; i++)

                    v[i].idx = -1; //@@@: v[i].idx = -1;
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    for (j = 0; j < rows.Count; j++) { //@@@: for (j = 0; j < rows.Count; j++)

                        if (m_groupFieldIndex >= 0) { //@@@: if (m_groupFieldIndex >= 0)
                            bCompare = cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue; //@@@: bCompare = (String)cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) == m_groupValue;
                        } //@@@: }
                        else { //@@@: else
                            bCompare = true; //@@@: bCompare = true;
                        } //@@@: }

                        if (bCompare) { //@@@: if (bCompare)
                            value = cUtil.val(cReportGlobals.valVariant(rows[j][valueIndex])); //@@@: value = cUtil.val(cReportGlobals.valVariant(rows[j][valueIndex]));

                            if ( //@@@: if ((value > v[i].value || v[i].idx == -1)
                                && value <= v[i - 1].value && j !== v[i - 1].idx) { //@@@: && value <= v[i - 1].value && j != v[i - 1].idx)

                                bFound = false; //@@@: bFound = false;
                                for (q = 0; q <= i; q++) { //@@@: for (q = 0; q <= i; q++)
                                    if (j === v[q].idx) { //@@@: if (j == v[q].idx)
                                        bFound = true; //@@@: bFound = true;
                                        break; //@@@: break;
                                    } //@@@: }
                                } //@@@: }

                                if (!bFound) { //@@@: if (!bFound)
                                    v[i].value = value; //@@@: v[i].value = value;
                                    v[i].label = cReportGlobals.valVariant(rows[j][labelIndex]).ToString(); //@@@: v[i].label = cReportGlobals.valVariant(rows[j][labelIndex]).ToString();
                                    v[i].idx = j; //@@@: v[i].idx = j;
                                } //@@@: }
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }

            } //@@@: }
            else { //@@@: else
                i = 0; //@@@: i = 0;
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                for (j = 0; j < rows.Count; j++) { //@@@: for (j = 0; j < rows.Count; j++)
                    if (m_groupFieldIndex >= 0) { //@@@: if (m_groupFieldIndex >= 0)
                        if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) { //@@@: if ((String)cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) == m_groupValue)
                            if (pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; } //@@@: if (pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; }
                        } //@@@: }
                    } //@@@: }
                    else { //@@@: else
                        if (pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; } //@@@: if (pGetSerieValuesAux(rows, v, valueIndex, labelIndex, i, j, false)) { break; }
                    } //@@@: }
                } //@@@: }

                if (bOthers) { //@@@: if (bOthers)
                    // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                    if (rows.Count > v.Length) { //@@@: if (rows.Count > v.Length)
                        let n = 0; //@@@: int n = 0;
                        let k = 0; //@@@: int k = 0;
                        let bHaveToRedim = false; //@@@: bool bHaveToRedim = false;
                        bHaveToRedim = true; //@@@: bHaveToRedim = true;
                        n = v.Length + 1; //@@@: n = v.Length + 1;
                        // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                        for (j = 0; j < rows.Count; j++) { //@@@: for (j = 0; j < rows.Count; j++)
                            if (m_groupFieldIndex >= 0) { //@@@: if (m_groupFieldIndex >= 0)
                                if (cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) === m_groupValue) { //@@@: if ((String)cReportGlobals.valVariant(rows[j][m_groupFieldIndex]) == m_groupValue)
                                    if (k >= n) { //@@@: if (k >= n)
                                        if (bHaveToRedim) { //@@@: if (bHaveToRedim)
                                            pRedimPreserve(v, n); //@@@: pRedimPreserve(ref v, n);
                                            bHaveToRedim = false; //@@@: bHaveToRedim = false;
                                        } //@@@: }
                                        pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.Length, j, true); //@@@: pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.Length, j, true);
                                    } //@@@: }
                                    else { //@@@: else
                                        k = k + 1; //@@@: k = k + 1;
                                    } //@@@: }
                                } //@@@: }
                            } //@@@: }
                            else { //@@@: else
                                if (bHaveToRedim) { //@@@: if (bHaveToRedim)
                                    pRedimPreserve(v, n); //@@@: pRedimPreserve(ref v, n);
                                    bHaveToRedim = false; //@@@: bHaveToRedim = false;
                                } //@@@: }
                                pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.Length, j, true); //@@@: pGetSerieValuesAux(rows, v, valueIndex, labelIndex, v.Length, j, true);
                            } //@@@: }
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pGetSerieValuesAux = function( //@@@: private bool pGetSerieValuesAux(
            rows,  //@@@: DataRowCollection rows,
            v,  //@@@: t_SerieValue[] v,
            valueIndex,  //@@@: int valueIndex,
            labelIndex,  //@@@: int labelIndex,
            i,  //@@@: int i,
            j,  //@@@: int j,
            bAdd) { //@@@: bool bAdd)
            if (bAdd) { //@@@: if (bAdd)
                v[i].value = v[i].value + cReportGlobals.valVariant(rows[j][valueIndex]); //@@@: v[i].value = v[i].value + (double)cReportGlobals.valVariant(rows[j][valueIndex]);
            } //@@@: }
            else { //@@@: else
                v[i].value = cReportGlobals.valVariant(rows[j][valueIndex]); //@@@: v[i].value = (double)cReportGlobals.valVariant(rows[j][valueIndex]);
            } //@@@: }
            v[i].label = cReportGlobals.valVariant(rows[j][labelIndex]); //@@@: v[i].label = (String)cReportGlobals.valVariant(rows[j][labelIndex]);
            v[i].idx = j; //@@@: v[i].idx = j;
            i = i + 1; //@@@: i = i + 1;
            return i > v.Length; //@@@: return i > v.Length;
        }; //@@@: }

        const pFill = function(chart, rows, strFormat) { //@@@: private void pFill(cWebChart chart, DataRowCollection rows, String strFormat)
            let i = 0; //@@@: int i = 0;
            let values = null; //@@@: t_SerieValue[] values = null;
            let serie = null; //@@@: cReportChartSerie serie = null;
            let idxSerie = 0; //@@@: int idxSerie = 0;

            if (m_top === 0) { m_top = 50; } //@@@: if (m_top == 0) { m_top = 50; }

            // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
            if (rows.Count < 0) { return; } //@@@: if (rows.Count < 0) { return; }

            // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
            if (rows.Count < m_top) { //@@@: if (rows.Count < m_top) {
                // TODO: we need the rows dimension. remeber rows is a matrix (cols by rows)
                pRedim(values, rows.Count); //@@@: pRedim(ref values, rows.Count);
            }  //@@@: }
            else { //@@@: else {
                pRedim(values, m_top - 1); //@@@: pRedim(ref values, m_top - 1);
            } //@@@: }

            for(var _i = 0; _i < m_series.count(); _i++) { //@@@: for (int _i = 0; _i < m_series.count(); _i++) {
                serie = m_series.item(_i); //@@@: serie = m_series.item(_i);

                // At the time we only support two series
                //
                idxSerie = idxSerie + 1; //@@@: idxSerie = idxSerie + 1;
                if (idxSerie > 2) { return; } //@@@: if (idxSerie > 2) { return; }

                pGetSerieValues(rows,  //@@@: pGetSerieValues(rows,
                                values,  //@@@: values,
                                serie.getValueIndex(),  //@@@: serie.getValueIndex(),
                                serie.getLabelIndex(),  //@@@: serie.getLabelIndex(),
                                m_chartType === csRptChartType.PIE); //@@@: m_chartType == csRptChartType.PIE);

                for (i = 0; i < values.Length; i++) { //@@@: for (i = 0; i < values.Length; i++) {

                    if (values[i].idx !== -1) { //@@@: if (values[i].idx != -1) {
                        if (idxSerie === 1) { //@@@: if (idxSerie == 1) {
                            let w_add = chart.getItems().add(null); //@@@: cWebChartItem w_add = chart.getItems().add(null);
                            w_add.setPrimaryValue(values[i].value); //@@@: w_add.setPrimaryValue(values[i].value);
                            w_add.setPrimaryLabel(cReportGlobals.format(values[i].label, strFormat)); //@@@: w_add.setPrimaryLabel(cReportGlobals.format(values[i].label, strFormat));
                            w_add.setPieLabel(cReportGlobals.format(values[i].label, strFormat)); //@@@: w_add.setPieLabel(cReportGlobals.format(values[i].label, strFormat));
                            w_add.setAlternateValue(0); //@@@: w_add.setAlternateValue(0);
                        }  //@@@: }
                        else if (idxSerie === 2) { //@@@: else if (idxSerie == 2) {
                            let w_item = chart.getItems().item(i); //@@@: cWebChartItem w_item = chart.getItems().item(i);
                            w_item.setAlternateValue(values[i].value); //@@@: w_item.setAlternateValue(values[i].value);
                            w_item.setPieLabel(cReportGlobals.format(values[i].label, strFormat)); //@@@: w_item.setPieLabel(cReportGlobals.format(values[i].label, strFormat));
                            w_item.setAltLabel(cReportGlobals.format(values[i].label, strFormat)); //@@@: w_item.setAltLabel(cReportGlobals.format(values[i].label, strFormat));
                        } //@@@: }
                    } //@@@: }
                } //@@@: }

                if ( && m_chartType === csRptChartType.PIE) { //@@@: if ((values.Length > m_top - 1) && m_chartType == csRptChartType.PIE) {

                    let w_item = chart.getItems().item(chart.getItems().count()-1); //@@@: cWebChartItem w_item = chart.getItems().item(chart.getItems().count()-1);
                    w_item.setPrimaryLabel("Otros"); //@@@: w_item.setPrimaryLabel("Otros");
                    w_item.setPieLabel("Otros"); //@@@: w_item.setPieLabel("Otros");
                } //@@@: }

            } //@@@: }

            if (chart.getItems().count() > 0) { //@@@: if (chart.getItems().count() > 0) {
                chart.getItems().item(0).setExplode(true); //@@@: chart.getItems().item(0).setExplode(true);
            } //@@@: }
        }; //@@@: }

        const pRedimPreserve = function(vSeries, size) { //@@@: private static void pRedimPreserve(ref t_SerieValue[] vSeries, int size)
            if (size === 0) { //@@@: if (size == 0)
                vSeries = null; //@@@: vSeries = null;
            } //@@@: }
            else { //@@@: else
                if (vSeries === null) { //@@@: if (vSeries == null)
                    vSeries = new t_SerieValue[size]; //@@@: vSeries = new t_SerieValue[size];
                } //@@@: }
                else if (vSeries.Length === 0) { //@@@: else if (vSeries.Length == 0)
                    vSeries = new t_SerieValue[size]; //@@@: vSeries = new t_SerieValue[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new t_SerieValue[size]; //@@@: t_SerieValue[] newArray = new t_SerieValue[size];
                    Array.Copy(vSeries, newArray, vSeries.Length); //@@@: Array.Copy(vSeries, newArray, vSeries.Length);
                    vSeries = newArray; //@@@: vSeries = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pRedim = function(vSeries, size) { //@@@: private static void pRedim(ref t_SerieValue[] vSeries, int size)
            if (size === 0) { //@@@: if (size == 0)
                vSeries = null; //@@@: vSeries = null;
            } //@@@: }
            else { //@@@: else
                vSeries = new t_SerieValue[size]; //@@@: vSeries = new t_SerieValue[size];
            } //@@@: }
        }; //@@@: }

        const createT_SerieValue = function() {

            const self = {}; //@@@: private class t_SerieValue
            self.label = null; //@@@: public String label;
            self.value = null; //@@@: public Double value;
            self.idx = null; //@@@: public long idx;
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
