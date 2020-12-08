(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

    globalObject.CSReportDll.createCPrinter = function() {

        const self = {};
        const C_MODULE = "cPrinter";

        let m_deviceName = "";
        let m_driverName = "";
        let m_port = "";
        let m_paperInfo = new cReportPaperInfo();

        let m_copies = 0;

        let m_graph = null;

        let m_printDialog = null;

        const cPrinter = function(printDialog) {
            m_printDialog = printDialog;
        };

        self.getCopies = function() {
            return m_copies;
        };

        self.setCopies = function(rhs) {
            m_copies = rhs;
        };

        self.getGraph = function() {
            return m_graph;
        };

        self.setGraph = function(rhs) {
            m_graph = rhs;
        };

        self.getDeviceName = function() {
            return m_deviceName;
        };

        self.setDeviceName = function(rhs) {
            m_deviceName = rhs;
        };

        self.getDriverName = function() {
            return m_driverName;
        };

        self.setDriverName = function(rhs) {
            m_driverName = rhs;
        };

        self.getPort = function() {
            return m_port;
        };

        self.setPort = function(rhs) {
            m_port = rhs;
        };

        self.getPaperInfo = function() {
            return m_paperInfo;
        };

        self.setPaperInfo = function(rhs) {
            m_paperInfo = rhs;
        };

        self.showDialog = function(pages) {
            let paperSize = 0;
            let orientation = 0;
            let fromPage = 0;
            let toPage = 0;
            let paperBin = 0;

            paperSize = m_paperInfo.getPaperSize();
            orientation = m_paperInfo.getOrientation();

            fromPage = 1;
            toPage = pages;

            if (cPrintAPI.showPrintDialog(
                    m_printDialog,
                    m_deviceName,
                    m_driverName,
                    m_port,
                    paperSize,
                    orientation,
                    fromPage,
                    toPage,
                    m_copies,
                    paperBin)) {
                m_paperInfo.setPaperSize(paperSize);
                m_paperInfo.setOrientation(orientation);
                m_paperInfo.setPagesToPrint(fromPage.ToString() + "-" + toPage.ToString());
                m_paperInfo.setPaperBin(paperBin);

                return true;
            }
            else {
                return false;
            }
        };

        const getPaperSize = function(paperSize) {
            let size = new PaperSize();

            switch (paperSize) {
                case csReportPaperType.CSRPTPAPERTYPEA4:
                    size.RawKind = PaperKind.A4;
                    break;
                case csReportPaperType.CSRPTPAPERTYPEA3:
                    size.RawKind = PaperKind.A3;
                    break;
                case csReportPaperType.CSRPTPAPERTYPELETTER:
                    size.RawKind = PaperKind.Letter;
                    break;
                case csReportPaperType.CSRPTPAPERTYPELEGAL:
                    size.RawKind = PaperKind.Legal;
                    break;
            }
            return size;
        };

        self.starDoc = function(printDoc, title, paperSize, orientation) {
            printDoc.DefaultPageSettings.Landscape = (orientation === csRptPageOrientation.LANDSCAPE);
            printDoc.DefaultPageSettings.PaperSize = getPaperSize(paperSize);

            return true;
        };
        return self;

    }

}(globalObject));
