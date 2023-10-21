namespace CSReportEngine {

    export interface cIReportSection  {
        getFormulaHide(): cReportFormula;
        getHasFormulaHide(): boolean;
        getName(): string;
        setName(name: string);
        setHasFormulaHide(value: boolean);
    }
}
