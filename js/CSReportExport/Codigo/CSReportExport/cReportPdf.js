(function(globalObject) {

    globalObject.CSReportExport = globalObject.CSReportExport || {}; //@@@: namespace CSReportExport
 //@@@: {
    globalObject.CSReportExport.createCReportPdf = function() {

        const self = {}; //@@@: public class cReportPdf
        self.setExportEmailAddress = function(emailAddress) { //@@@: public void setExportEmailAddress(String emailAddress)
        }; //@@@: }

        self.sendMail = function(files) { //@@@: public bool sendMail(String files)
            return false; //@@@: return false;
        }; //@@@: }

        self.setFileName = function(fileName) { //@@@: public void setFileName(String fileName)
        }; //@@@: }

        self.exportEx = function(report, caller, outputFile, showPDFWindow) { //@@@: public bool exportEx(CSReportDll.cReport report, object caller, String outputFile, bool showPDFWindow)
            return false; //@@@: return false;
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
