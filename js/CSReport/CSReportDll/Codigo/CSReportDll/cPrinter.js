(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCPrinter = function() {

        const self = {}; //@@@: public class cPrinter
        const C_MODULE = "cPrinter"; //@@@: private const String C_MODULE = "cPrinter";

        let m_deviceName = ""; //@@@: private String m_deviceName = "";
        let m_driverName = ""; //@@@: private String m_driverName = "";
        let m_port = ""; //@@@: private String m_port = "";
        let m_paperInfo = new cReportPaperInfo(); //@@@: private cReportPaperInfo m_paperInfo = new cReportPaperInfo();

        let m_copies = 0; //@@@: private int m_copies = 0;

        let m_graph = null; //@@@: private Graphics m_graph;

        let m_printDialog = null; //@@@: private PrintDialog m_printDialog;

        const cPrinter = function(printDialog) { //@@@: public cPrinter(PrintDialog printDialog)
            m_printDialog = printDialog; //@@@: m_printDialog = printDialog;
        }; //@@@: }

        self.getCopies = function() { //@@@: public int getCopies()
            return m_copies; //@@@: return m_copies;
        }; //@@@: }

        self.setCopies = function(rhs) { //@@@: public void setCopies(int rhs)
            m_copies = rhs; //@@@: m_copies = rhs;
        }; //@@@: }

        self.getGraph = function() { //@@@: public Graphics getGraph()
            return m_graph; //@@@: return m_graph;
        }; //@@@: }

        self.setGraph = function(rhs) { //@@@: public void setGraph(Graphics rhs)
            m_graph = rhs; //@@@: m_graph = rhs;
        }; //@@@: }

        self.getDeviceName = function() { //@@@: public String getDeviceName()
            return m_deviceName; //@@@: return m_deviceName;
        }; //@@@: }

        self.setDeviceName = function(rhs) { //@@@: public void setDeviceName(String rhs)
            m_deviceName = rhs; //@@@: m_deviceName = rhs;
        }; //@@@: }

        self.getDriverName = function() { //@@@: public String getDriverName()
            return m_driverName; //@@@: return m_driverName;
        }; //@@@: }

        self.setDriverName = function(rhs) { //@@@: public void setDriverName(String rhs)
            m_driverName = rhs; //@@@: m_driverName = rhs;
        }; //@@@: }

        self.getPort = function() { //@@@: public String getPort()
            return m_port; //@@@: return m_port;
        }; //@@@: }

        self.setPort = function(rhs) { //@@@: public void setPort(String rhs)
            m_port = rhs; //@@@: m_port = rhs;
        }; //@@@: }

        self.getPaperInfo = function() { //@@@: public cReportPaperInfo getPaperInfo()
            return m_paperInfo; //@@@: return m_paperInfo;
        }; //@@@: }

        self.setPaperInfo = function(rhs) { //@@@: public void setPaperInfo(cReportPaperInfo rhs)
            m_paperInfo = rhs; //@@@: m_paperInfo = rhs;
        }; //@@@: }

        self.showDialog = function(pages) { //@@@: public bool showDialog(int pages)
            let paperSize = 0; //@@@: csReportPaperType paperSize = 0;
            let orientation = 0; //@@@: int orientation = 0;
            let fromPage = 0; //@@@: int fromPage = 0;
            let toPage = 0; //@@@: int toPage = 0;
            let paperBin = 0; //@@@: int paperBin = 0;

            paperSize = m_paperInfo.getPaperSize(); //@@@: paperSize = m_paperInfo.getPaperSize();
            orientation = m_paperInfo.getOrientation(); //@@@: orientation = m_paperInfo.getOrientation();

            fromPage = 1; //@@@: fromPage = 1;
            toPage = pages; //@@@: toPage = pages;

            if (cPrintAPI.showPrintDialog( //@@@: if (cPrintAPI.showPrintDialog(
                    m_printDialog, //@@@: m_printDialog,
                    m_deviceName, //@@@: ref m_deviceName,
                    m_driverName, //@@@: ref m_driverName,
                    m_port, //@@@: ref m_port,
                    paperSize, //@@@: ref paperSize,
                    orientation, //@@@: ref orientation,
                    fromPage, //@@@: ref fromPage,
                    toPage, //@@@: ref toPage,
                    m_copies, //@@@: ref m_copies,
                    paperBin)) { //@@@: ref paperBin))
                m_paperInfo.setPaperSize(paperSize); //@@@: m_paperInfo.setPaperSize(paperSize);
                m_paperInfo.setOrientation(orientation); //@@@: m_paperInfo.setOrientation(orientation);
                m_paperInfo.setPagesToPrint(fromPage.ToString() + "-" + toPage.ToString()); //@@@: m_paperInfo.setPagesToPrint(fromPage.ToString() + "-" + toPage.ToString());
                m_paperInfo.setPaperBin(paperBin); //@@@: m_paperInfo.setPaperBin(paperBin);

                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const getPaperSize = function(paperSize) { //@@@: private PaperSize getPaperSize(csReportPaperType paperSize)
            let size = new PaperSize(); //@@@: PaperSize size = new PaperSize();

            switch (paperSize) { //@@@: switch (paperSize) {
                case csReportPaperType.CSRPTPAPERTYPEA4: //@@@: case csReportPaperType.CSRPTPAPERTYPEA4:
                    size.RawKind = PaperKind.A4; //@@@: size.RawKind = (int)PaperKind.A4;
                    break; //@@@: break;
                case csReportPaperType.CSRPTPAPERTYPEA3: //@@@: case csReportPaperType.CSRPTPAPERTYPEA3:
                    size.RawKind = PaperKind.A3; //@@@: size.RawKind = (int)PaperKind.A3;
                    break; //@@@: break;
                case csReportPaperType.CSRPTPAPERTYPELETTER: //@@@: case csReportPaperType.CSRPTPAPERTYPELETTER:
                    size.RawKind = PaperKind.Letter; //@@@: size.RawKind = (int)PaperKind.Letter;
                    break; //@@@: break;
                case csReportPaperType.CSRPTPAPERTYPELEGAL: //@@@: case csReportPaperType.CSRPTPAPERTYPELEGAL:
                    size.RawKind = PaperKind.Legal; //@@@: size.RawKind = (int)PaperKind.Legal;
                    break; //@@@: break;
            } //@@@: }
            return size; //@@@: return size;
        }; //@@@: }

        self.starDoc = function(printDoc, title, paperSize, orientation) { //@@@: public bool starDoc(PrintDocument printDoc, String title, csReportPaperType paperSize, int orientation)
            printDoc.DefaultPageSettings.Landscape = (orientation === csRptPageOrientation.LANDSCAPE); //@@@: printDoc.DefaultPageSettings.Landscape = (orientation == (int)csRptPageOrientation.LANDSCAPE);
            printDoc.DefaultPageSettings.PaperSize = getPaperSize(paperSize); //@@@: printDoc.DefaultPageSettings.PaperSize = getPaperSize(paperSize);

            return true; //@@@: return true;
        }; //@@@: }
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
