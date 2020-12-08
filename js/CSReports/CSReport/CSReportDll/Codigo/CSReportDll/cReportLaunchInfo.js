(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportLaunchInfo = function() {

        const self = {}; //@@@: public class cReportLaunchInfo

        const C_LAUNCHINFO = "RptLaunchInfo"; //@@@: private const String C_LAUNCHINFO = "RptLaunchInfo";

        let m_file = ""; //@@@: private String m_file = "";
        let m_dataSource = null; //@@@: private object m_dataSource = null;
        let m_sqlstmt = ""; //@@@: private String m_sqlstmt = "";
        let m_strConnect = ""; //@@@: private String m_strConnect = "";
        let m_printer = null; //@@@: private cPrinter m_printer;
        let m_showPrintersDialog = null; //@@@: private bool m_showPrintersDialog;
        let m_internalPreview = null; //@@@: private bool m_internalPreview;
        let m_action = null; //@@@: private csRptLaunchAction m_action;
        let m_copies = 0; //@@@: private int m_copies = 0;
        let m_silent = null; //@@@: private bool m_silent;
        let m_fileFormat = null; //@@@: private csRptFileFormat m_fileFormat;
        let m_hWnd = 0; //@@@: private int m_hWnd = 0;

        let m_objPaint = null; //@@@: private CSIReportPrint.cIReportPrint m_objPaint;

        self.getHwnd = function() { //@@@: public int getHwnd()
            return m_hWnd; //@@@: return m_hWnd;
        }; //@@@: }

        self.setHwnd = function(rhs) { //@@@: public void setHwnd(int rhs)
            m_hWnd = rhs; //@@@: m_hWnd = rhs;
        }; //@@@: }

        self.getFile = function() { //@@@: public String getFile()
            return m_file; //@@@: return m_file;
        }; //@@@: }

        self.setFile = function(rhs) { //@@@: public void setFile(String rhs)
            m_file = rhs; //@@@: m_file = rhs;
        }; //@@@: }

        self.getDataSource = function() { //@@@: public object getDataSource()
            return m_dataSource; //@@@: return m_dataSource;
        }; //@@@: }

        self.setDataSource = function(rhs) { //@@@: public void setDataSource(object rhs)
            m_dataSource = rhs; //@@@: m_dataSource = rhs;
        }; //@@@: }

        self.getSqlstmt = function() { //@@@: public String getSqlstmt()
            return m_sqlstmt; //@@@: return m_sqlstmt;
        }; //@@@: }

        self.setSqlstmt = function(rhs) { //@@@: public void setSqlstmt(String rhs)
            m_sqlstmt = rhs; //@@@: m_sqlstmt = rhs;
        }; //@@@: }

        self.getStrConnect = function() { //@@@: public String getStrConnect()
            return m_strConnect; //@@@: return m_strConnect;
        }; //@@@: }

        self.setStrConnect = function(rhs) { //@@@: public void setStrConnect(String rhs)
            m_strConnect = rhs; //@@@: m_strConnect = rhs;
        }; //@@@: }

        // System.Drawing.Printing.PrinterSettings
        //
        self.getPrinter = function() { //@@@: public cPrinter getPrinter()
            return m_printer; //@@@: return m_printer;
        }; //@@@: }

        // System.Drawing.Printing.PrinterSettings
        //
        self.setPrinter = function(rhs) { //@@@: public void setPrinter(cPrinter rhs)
            m_printer = rhs; //@@@: m_printer = rhs;
        }; //@@@: }

        self.getFileFormat = function() { //@@@: public csRptFileFormat getFileFormat()
            return m_fileFormat; //@@@: return m_fileFormat;
        }; //@@@: }

        self.setFileFormat = function(rhs) { //@@@: public void setFileFormat(csRptFileFormat rhs)
            m_fileFormat = rhs; //@@@: m_fileFormat = rhs;
        }; //@@@: }

        self.getObjPaint = function() { //@@@: public CSIReportPrint.cIReportPrint getObjPaint()
            return m_objPaint; //@@@: return m_objPaint;
        }; //@@@: }

        self.setObjPaint = function(rhs) { //@@@: public void setObjPaint(CSIReportPrint.cIReportPrint rhs)
            m_objPaint = rhs; //@@@: m_objPaint = rhs;
        }; //@@@: }

        self.getAction = function() { //@@@: public csRptLaunchAction getAction()
            return m_action; //@@@: return m_action;
        }; //@@@: }

        self.setAction = function(rhs) { //@@@: public void setAction(csRptLaunchAction rhs)
            m_action = rhs; //@@@: m_action = rhs;
        }; //@@@: }

        self.getShowPrintersDialog = function() { //@@@: public bool getShowPrintersDialog()
            return m_showPrintersDialog; //@@@: return m_showPrintersDialog;
        }; //@@@: }

        self.setShowPrintersDialog = function(rhs) { //@@@: public void setShowPrintersDialog(bool rhs)
            m_showPrintersDialog = rhs; //@@@: m_showPrintersDialog = rhs;
        }; //@@@: }

        self.getInternalPreview = function() { //@@@: public bool getInternalPreview()
            return m_internalPreview; //@@@: return m_internalPreview;
        }; //@@@: }

        self.setInternalPreview = function(rhs) { //@@@: public void setInternalPreview(bool rhs)
            m_internalPreview = rhs; //@@@: m_internalPreview = rhs;
        }; //@@@: }

        self.getCopies = function() { //@@@: public int getCopies()
            return m_copies; //@@@: return m_copies;
        }; //@@@: }

        self.setCopies = function(rhs) { //@@@: public void setCopies(int rhs)
            m_copies = rhs; //@@@: m_copies = rhs;
        }; //@@@: }

        self.getSilent = function() { //@@@: public bool getSilent()
            return m_silent; //@@@: return m_silent;
        }; //@@@: }

        self.setSilent = function(rhs) { //@@@: public void setSilent(bool rhs)
            m_silent = rhs; //@@@: m_silent = rhs;
        }; //@@@: }

        self.initPrinter = function(printDialog, deviceName, driverName, port) { //@@@: public void initPrinter(PrintDialog printDialog, String deviceName, String driverName, String port)
            m_printer = cPrintAPI.getcPrint(printDialog, deviceName, driverName, port); //@@@: m_printer = cPrintAPI.getcPrint(printDialog, deviceName, driverName, port);
        }; //@@@: }

        self.setPaperBin = function(paperBin) { //@@@: public void setPaperBin(String paperBin)
            if (m_printer === null) { return; } //@@@: if (m_printer == null) { return; }

            if (paperBin.Length === 0) { //@@@: if (paperBin.Length == 0)
                let idPaperBin = 0; //@@@: int idPaperBin = 0;
                idPaperBin = cPrintAPI.printerPaperBinNameToId(m_printer.getDeviceName(), //@@@: idPaperBin = cPrintAPI.printerPaperBinNameToId(m_printer.getDeviceName(),
                                                                m_printer.getPort(),  //@@@: m_printer.getPort(),
                                                                paperBin); //@@@: paperBin);
                m_printer.getPaperInfo().setPaperBin(idPaperBin); //@@@: m_printer.getPaperInfo().setPaperBin(idPaperBin);
            } //@@@: }
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            m_strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText); //@@@: m_strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText);
            m_action = xDoc.getNodeProperty(nodeObj, "Action").getValueInt(eTypes.eInteger); //@@@: m_action = (csRptLaunchAction)xDoc.getNodeProperty(nodeObj, "Action").getValueInt(eTypes.eInteger);
            m_copies = xDoc.getNodeProperty(nodeObj, "Copies").getValueInt(eTypes.eInteger); //@@@: m_copies = xDoc.getNodeProperty(nodeObj, "Copies").getValueInt(eTypes.eInteger);
            m_file = xDoc.getNodeProperty(nodeObj, "File").getValueString(eTypes.eText); //@@@: m_file = xDoc.getNodeProperty(nodeObj, "File").getValueString(eTypes.eText);
            m_fileFormat = xDoc.getNodeProperty(nodeObj, "FileFormat").getValueInt(eTypes.eInteger); //@@@: m_fileFormat = (csRptFileFormat)xDoc.getNodeProperty(nodeObj, "FileFormat").getValueInt(eTypes.eInteger);
            m_internalPreview = xDoc.getNodeProperty(nodeObj, "InternalPreview").getValueBool(eTypes.eBoolean); //@@@: m_internalPreview = xDoc.getNodeProperty(nodeObj, "InternalPreview").getValueBool(eTypes.eBoolean);
            m_showPrintersDialog = xDoc.getNodeProperty(nodeObj, "ShowPrintersDialog").getValueBool(eTypes.eBoolean); //@@@: m_showPrintersDialog = xDoc.getNodeProperty(nodeObj, "ShowPrintersDialog").getValueBool(eTypes.eBoolean);
            m_silent = xDoc.getNodeProperty(nodeObj, "Silent").getValueBool(eTypes.eBoolean); //@@@: m_silent = xDoc.getNodeProperty(nodeObj, "Silent").getValueBool(eTypes.eBoolean);
            m_sqlstmt = xDoc.getNodeProperty(nodeObj, "Sqlstmt").getValueString(eTypes.eText); //@@@: m_sqlstmt = xDoc.getNodeProperty(nodeObj, "Sqlstmt").getValueString(eTypes.eText);

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = new CSXml.cXmlProperty(); //@@@: CSXml.cXmlProperty xProperty = new CSXml.cXmlProperty();
            let nodeObj = null; //@@@: XmlNode nodeObj = null;

            xProperty.setName(C_LAUNCHINFO); //@@@: xProperty.setName(C_LAUNCHINFO);

            if (nodeFather !== null) { //@@@: if (nodeFather != null)
                nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);
            } //@@@: }
            else { //@@@: else
                nodeObj = xDoc.addNode(xProperty); //@@@: nodeObj = xDoc.addNode(xProperty);
            } //@@@: }

            xProperty.setName("Action"); //@@@: xProperty.setName("Action");
            xProperty.setValue(eTypes.eInteger, m_action); //@@@: xProperty.setValue(eTypes.eInteger, m_action);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Copies"); //@@@: xProperty.setName("Copies");
            xProperty.setValue(eTypes.eInteger, m_copies); //@@@: xProperty.setValue(eTypes.eInteger, m_copies);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("File"); //@@@: xProperty.setName("File");
            xProperty.setValue(eTypes.eText, m_file); //@@@: xProperty.setValue(eTypes.eText, m_file);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FileFormat"); //@@@: xProperty.setName("FileFormat");
            xProperty.setValue(eTypes.eInteger, m_fileFormat); //@@@: xProperty.setValue(eTypes.eInteger, m_fileFormat);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("InternalPreview"); //@@@: xProperty.setName("InternalPreview");
            self.<<<ERROR>>> {{undefined}} = function(, ) { //@@@: xProperty.setValue(eTypes.eBoolean, m_internalPreview);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ShowPrintersDialog"); //@@@: xProperty.setName("ShowPrintersDialog");
            xProperty.setValue(eTypes.eBoolean, m_showPrintersDialog); //@@@: xProperty.setValue(eTypes.eBoolean, m_showPrintersDialog);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Silent"); //@@@: xProperty.setName("Silent");
            xProperty.setValue(eTypes.eBoolean, m_silent); //@@@: xProperty.setValue(eTypes.eBoolean, m_silent);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Sqlstmt"); //@@@: xProperty.setName("Sqlstmt");
            xProperty.setValue(eTypes.eText, m_sqlstmt); //@@@: xProperty.setValue(eTypes.eText, m_sqlstmt);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("StrConnect"); //@@@: xProperty.setName("StrConnect");
            xProperty.setValue(eTypes.eText, m_strConnect); //@@@: xProperty.setValue(eTypes.eText, m_strConnect);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
