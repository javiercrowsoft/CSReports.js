namespace CSIReportPrint {

    import cReport = CSReportDll.cReport;

    export interface cIReportPrint {
        setReport(report: cReport): void;
        makeReport(): boolean;
        makeXml(): boolean;
        previewReport(): boolean;
        printReport(): boolean;
    }
}
