namespace CSReportEngine {

    export interface ReportLaunchInfoDTO {
        file: string;
        dataSource: any;
        sqlstmt: string;
        strConnect: string;
        printer: any;
        showPrintersDialog: boolean;
        internalPreview: boolean;
        action: number;
        copies: number;
        silent: boolean;
        fileFormat: any;
        objPaint: any;
    }

    export interface ReportFontDTO {
        foreColor: number;
        size: number;
        name: string;
        underline: boolean;
        bold: boolean;
        italic: boolean;
        strike: boolean;
    }

    export interface ReportAspectDTO {
        left: number;
        top: number;
        height: number;
        width: number;
        backColor: number;
        borderWidth: number;
        borderType: number;
        borderColor: number;
        borderColor3d: number;
        borderColor3dShadow: number;
        selectColor: number;
        font: ReportFontDTO,
        canGrow: boolean;
        nZOrder: number;
        align: number;
        transparent: boolean;
        format: string;
        symbol: string;
        isAccounting: boolean;
        wordWrap: boolean;
        borderRounded: boolean;
        offset: number;
    }

    export interface ReportFormulaIntDTO {
        keys: string[],
        values: any[],
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
        construct: any;
    }

    export interface ReportFormulaDTO {
        name: string;
        text: string;
        formulasInt: ReportFormulaIntDTO,
        notSave: any;
        textC: string;
        idxGroup: number;
        idxGroup2: -9999,
        whenEval: number;
        haveToEval: any;
        lastResult: any;
        controlName: string;
        sectionLineIndex: number;
        sectionName: string;
        compiledScript: any;
    }

    export interface ReportLabelDTO {
        aspect: ReportAspectDTO;
        text: string;
        canGrow: any;
    }

    export interface ReportImageDTO {
        aspect: ReportAspectDTO;
        image: any;
    }

    export interface ReportLineDTO {
        aspect: ReportAspectDTO;
    }

    export interface ReportFieldDTO{
        name: string;
        index: number;
        fieldType: number;
    }

    export interface ReportChartSeriesDTO {
        keys: string[];
        values: any[];
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
    }

    export interface ReportChartDTO {
        series: ReportChartSeriesDTO;
        chartLineStyle: number;
        chartBarOutline: boolean;
        chartShowValues: boolean;
        pieThickness: number;
        pieDiameter: number;
        imageFormat: number;
        copyright: string;
        chartTitle: string;
        chartType: number;
        top: number;
        chartCreated: any;
        groupFieldName: string;
        groupValue: string;
        groupFieldIndex: number;
        sort: boolean;
        image: any;
    }

    export interface ReportControlDTO {
        label: ReportLabelDTO;
        image: ReportImageDTO;
        line: ReportLineDTO;
        field: ReportFieldDTO;
        typeSection: number;
        key: string;
        keyPaint: string;
        name: string;
        hasFormulaHide: boolean;
        hasFormulaValue: boolean;
        controlType: number;
        formulaHide: ReportFormulaDTO;
        formulaValue: ReportFormulaDTO;
        chart: ReportChartDTO,
        tag: string;
        exportColIdx: number;
        isFreeCtrl: boolean;
        sectionLine: any;
    }

    export interface ReportControlsDTO {
        keys: string[];
        values: ReportControlDTO[],
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
        copyColl: any;
        typeSection: number;
        collByLeft: any;
        sectionLine: any;
    }

    export interface ReportSectionLineDTO {
        controls: ReportControlsDTO;
        aspect: ReportAspectDTO;
        index: number;
        realIndex: number;
        key: string;
        keyPaint: string;
        formulaHide: ReportFormulaDTO;
        hasFormulaHide: boolean;
        idField: string;
        sectionName: string;
    }

    export interface ReportSectionLinesDTO {
        keys: string[];
        values: ReportSectionLineDTO[],
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
        copyColl: any;
        typeSection: number;
    }

    export interface ReportSectionDTO {
        sectionLines: ReportSectionLinesDTO,
        aspect: ReportAspectDTO,
        index: number;
        typeSection: number;
        realIndex: number;
        key: string;
        name: string;
        keyPaint: string;
        formulaHide: ReportFormulaDTO,
        hasFormulaHide: boolean;
    }

    export interface ReportGroupDTO {
        header: ReportSectionDTO;
        footer: ReportSectionDTO;
        index: number;
        name: string;
        oderType: number;
        comparisonType: number;
        printInNewPage: boolean;
        rePrintInNewPage: boolean;
        grandTotalGroup: boolean;
        fieldName: string;
        key: string;
    }

    export interface ReportSectionsDTO {
        keys: string[];
        values: ReportSectionDTO [];
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
        copyColl: any;
        typeSection: number;
        mainTypeSection: any;
    }

    export interface ReportGroupsDTO {
        keys: string[];
        values: ReportGroupDTO[],
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
        groupsHeaders: ReportSectionsDTO;
        groupsFooters: ReportSectionsDTO;
    }

    export interface ReportPaperInfoDTO {
        width: number;
        height: number;
        paperSize: number;
        orientation: number;
        customHeight: number;
        customWidth: number;
        pagesToPrint: string;
        paperBin: number;
    }

    export interface ReportParameterDTO {
        name: string;
        columnType: number;
        value: string;
        position: number;
        key: string;
        hasDefault: boolean;
        default: string;
        isNullable: boolean;
        maxLength: number;
    }

    export interface ReportParametersDTO {
        keys: string[];
        values: ReportParameterDTO[];
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
    }

    export interface ReportColumnDTO {
        name: string;
        position: number;
        key: string;
        columnType: number;
    }

    export interface ReportColumnsDTO {
        keys: string[];
        values: ReportColumnDTO[];
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
    }

    export interface ReportConnectDTO {
        strConnect: string;
        dataSource: string;
        dataSourceType: number;
        parameters: ReportParametersDTO,
        columns: ReportColumnsDTO,
        connectionTimeout: number;
        commandTimeout: number;
    }

    export interface ReportConnectsAuxDTO {
        keys: string[];
        values: ReportConnectDTO[];
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
    }

    export interface ReportPageSettingDTO {
        keys: string[],
        values: any[],
        isReadOnly: boolean;
        length: number;
        keyIndex: number;
        construct: any;
        height: number;
    }

    export interface ReportDTO {
        launchInfo: ReportLaunchInfoDTO,
        groups: ReportGroupsDTO;
        details: ReportSectionsDTO;
        headers: ReportSectionsDTO;
        footers: ReportSectionsDTO;
        groupsHeaders: ReportSectionsDTO;
        groupsFooters: ReportSectionsDTO;
        paperInfo: ReportPaperInfoDTO;
        originalHeight: number;
        controls: any;
        formulas: any;
        formulaTypes: any;
        name: string;
        path: string;
        pathDefault: string;
        userDescription: string;
        connect: ReportConnectDTO,
        connectsAux: ReportConnectsAuxDTO;
        pageSetting: ReportPageSettingDTO,
        pages: any;
        compiler: any;
        currentPage: number;
        totalPages: number;
        reportDisconnected: boolean;
        tables: any;
        images: any;
        table: any;
        recordCount: number;
        vRowsIndex: any;
        lastRowIndex: -1,
        vRowsIndexAux: any;
        iRow: number;
        iRow2: number;
        iRowFormula: number;
        lineIndex: number;
        lastRowPreEvaluated: any;
        lastRowPostEvaluated: any;
        bExistsGrpToRePrintInNP: any;
        bHaveToRePrintGroup: any;
        NO_GROUP_INDEX: number;
        idxGroupToPrintNP: number;
        idxGroupHeader: number;
        idxGroupFooter: number;
        bPrintFooter: any;
        bLastFootersWasPrinted: any;
        groupIndexChange: number;
        bEvalPreGroups: any;
        bCloseFooter: any;
        bOpenHeader: any;
        lineNumber: number;
        vGroups: any;
        firstGroup: any;
        groupCount: number;
        isForWeb: any;
        databaseEngine: number;
        exportEmailAddress: string;
    }
}