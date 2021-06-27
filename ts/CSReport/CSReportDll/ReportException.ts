namespace CSReportDll {

    import Exception = CSOAPI.Exception;
    import csRptErrors = CSReportGlobals.csRptErrors;

    export class ReportException extends Exception {

        constructor(errorCode: csRptErrors, message: string) {
            super(message);
        }
    }
}
