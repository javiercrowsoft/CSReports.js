(function(globalObject) {

    globalObject.CSReportExport = globalObject.CSReportExport || {};

    globalObject.CSReportExport.createCReportPdf = function() {

        // @ts-ignore
        let self: CSReportExport.IcReportPdf = {};
        self.setExportEmailAddress = function(emailAddress) {
        };

        self.sendMail = function(files) {
            return false;
        };

        self.setFileName = function(fileName) {
        };

        self.exportEx = function(report, caller, outputFile, showPDFWindow) {
            return false;
        };
        return self;

    }    }
}(globalObject));


namespace CSReportExport {

  export interface IcReportPdf {

    setExportEmailAddress: (String) => void;
    sendMail: (String) => bool;
    setFileName: (String) => void;
    exportEx: (CSReportDll.cReport, object, String, bool) => bool;
  }
}
