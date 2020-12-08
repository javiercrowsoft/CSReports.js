(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

UNKNOWN >>     public interface cIReportSection
    {
        cReportFormula getFormulaHide();

        bool getHasFormulaHide();

        string getName();

        void setName(string name);

        void setHasFormulaHide(bool value);
    }
}
