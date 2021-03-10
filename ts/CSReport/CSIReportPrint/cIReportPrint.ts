namespace CSIReportPrint {

    import cReport = CSReportDll.cReport;

    interface cIReportPrint {
        setReport(report: cReport): void;
        makeReport(): boolean;
        makeXml(): boolean;
        previewReport(): boolean;
        printReport(): boolean;
    }
}
