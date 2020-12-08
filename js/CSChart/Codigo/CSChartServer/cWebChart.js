(function(globalObject) {

    globalObject.CSChartServer = globalObject.CSChartServer || {}; //@@@: namespace CSChartServer
 //@@@: {
    globalObject.CSChartServer.createCWebChart = function() {

        const self = {}; //@@@: public class cWebChart : IDisposable
        let m_items = null; //@@@: private cWebChartItems m_items;

        self.getItems = function() { //@@@: public cWebChartItems getItems()
            return m_items; //@@@: return m_items;
        }; //@@@: }

        self.newChartType = function(m_chartType, m_chartTitle) { //@@@: public void newChartType(csRptChartType m_chartType, string m_chartTitle)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setColorPrimary = function(color) { //@@@: public void setColorPrimary(csColors color)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setGridLines = function(m_chartLineStyle) { //@@@: public void setGridLines(csRptChartLineStyle m_chartLineStyle)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setOutlineBars = function(m_chartBarOutline) { //@@@: public void setOutlineBars(bool m_chartBarOutline)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setShowValues = function(m_chartShowValues) { //@@@: public void setShowValues(bool m_chartShowValues)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setShowLegend = function(p) { //@@@: public void setShowLegend(bool p)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setThickness = function(m_pieThickness) { //@@@: public void setThickness(csRptChartPieThickness m_pieThickness)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setDiameter = function(m_pieDiameter) { //@@@: public void setDiameter(csRptChartPieDiameter m_pieDiameter)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setLabelPrimary = function(p) { //@@@: public void setLabelPrimary(string p)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setColorAlternate = function(globalCSReportDllcsColors) { //@@@: public void setColorAlternate(csColors globalCSReportDllcsColors)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setLabelAlternate = function(p) { //@@@: public void setLabelAlternate(string p)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.Dispose = function() { //@@@: public void Dispose()
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.renderWebChartImage = function() { //@@@: public void renderWebChartImage()
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setCopyRight = function(m_copyright) { //@@@: public void setCopyRight(string m_copyright)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setSaveTo = function(p) { //@@@: public void setSaveTo(int p)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setFileName = function(fileName) { //@@@: public void setFileName(string fileName)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }

        self.setFormat = function(m_imageFormat) { //@@@: public void setFormat(csRptChartFormat m_imageFormat)
            throw new NotImplementedException(); //@@@: throw new NotImplementedException();
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
