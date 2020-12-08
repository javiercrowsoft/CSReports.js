(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
UNKNOWN >>     public interface cIReportSection //@@@: public interface cIReportSection
    { //@@@: {
        cReportFormula getFormulaHide(); //@@@: cReportFormula getFormulaHide();

        bool getHasFormulaHide(); //@@@: bool getHasFormulaHide();

        string getName(); //@@@: string getName();

        void setName(string name); //@@@: void setName(string name);

        void setHasFormulaHide(bool value); //@@@: void setHasFormulaHide(bool value);
    } //@@@: }
} //@@@: }
