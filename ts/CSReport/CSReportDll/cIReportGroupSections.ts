namespace CSReportDll {

    import csRptSectionType = CSReportGlobals.csRptSectionType;

    export interface cIReportGroupSections {

        setTypeSection(rhs: csRptSectionType);
        count(): number;
        item(key: string|number): cReportSection;
    }

}
