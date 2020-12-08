(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
UNKNOWN >>     public interface cIReportGroupSections //@@@: public interface cIReportGroupSections
    { //@@@: {

        void setTypeSection(csRptSectionType rhs); //@@@: void setTypeSection(csRptSectionType rhs);
        int count(); //@@@: int count();
        cReportSection item(String key); //@@@: cReportSection item(String key);
        cReportSection item(int index); //@@@: cReportSection item(int index);

    } //@@@: }

} //@@@: }
