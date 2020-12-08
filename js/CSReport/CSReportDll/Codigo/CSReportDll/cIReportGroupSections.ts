(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};

UNKNOWN >>     public interface cIReportGroupSections
    {

        void setTypeSection(csRptSectionType rhs);
        int count();
        cReportSection item(String key);
        cReportSection item(int index);

    }

}
