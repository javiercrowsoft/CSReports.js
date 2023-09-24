///<reference path="../CSReportGlobals/ReportGlobals.ts"/>
///<reference path="../../CSXml/cXmlProperty.ts"/>
///<reference path="../../CSXml/cXML.ts"/>

namespace CSReportDll {

    import RptGrpComparisonType = CSReportGlobals.RptGrpComparisonType;
    import RptGrpOrderType = CSReportGlobals.RptGrpOrderType;
    import DatabaseEngine = CSDatabase.DatabaseEngine;
    import csRptSectionType = CSReportGlobals.csRptSectionType;
    import csRptNewPageResult = CSReportGlobals.csRptNewPageResult;
    import csRptWhenEval = CSReportGlobals.csRptWhenEval;
    import csRptEndPageResult = CSReportGlobals.csRptEndPageResult;
    import csRptGetLineResult = CSReportGlobals.csRptGetLineResult;
    import cError = CSKernelClient.cError;
    import RefWrapper = CSKernelClient.RefWrapper;
    import ReportGlobals = CSReportGlobals.ReportGlobals;
    import Utils = CSOAPI.Utils;
    import csRptControlType = CSReportGlobals.csRptControlType;
    import csRptErrors = CSReportGlobals.csRptErrors;
    import csRptLaunchAction = CSReportGlobals.csRptLaunchAction;
    import cFile = CSKernelFile.cFile;
    import eTypes = CSKernelClient.eTypes;
    import cXmlProperty = CSXml.cXmlProperty;
    import cXml = CSXml.cXml;
    import XmlNode = CSXml.XmlNode;
    import DataTable = CSDatabase.DataTable;
    import Map = CSOAPI.Map;
    import Bitmap = CSKernelClient.Bitmap;
    import CMouseWait = CSKernelClient.CMouseWait;
    import DataType = CSDatabase.DataType;
    import csRptFormulaType = CSReportGlobals.csRptFormulaType;
    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import cWindow = CSKernelClient.cWindow;
    import csDataSourceType = CSReportGlobals.csDataSourceType;
    import P = CSKernelClient.Callable;

    export class T_Group {
        public first: number = null;
        public last: number = null;
    }

    export class T_Groups {
        public value: string|object|number = null;
        public indexField: number = null;
        public changed: boolean = null;
        public reprintHeader: boolean = null;
        public footerMustBeClosed: boolean = null;
        public comparisonType: RptGrpComparisonType = null;
        public oderType: RptGrpOrderType = null;
        public grandTotalGroup: boolean = null;
        public groups: T_Group[] = null;
        public lastHPreRowEvaluated: number = null;
        public lastHPostRowEvaluated: number = null;
        public lastFPreRowEvaluated: number = null;
        public lastFPostRowEvaluated: number = null;
        // to know which is the line number when we are in a group
        //
        // it is incremented only when the detail section is printed
        // it doesn't care if the details contains more than one line
        //
        public lineNumber: number = null;
    }

    export class cReport {

        // remember mark any change that could bring errors 
        // with the label WARNING and the date
        //
        // 2008-02-18 WARNING

        // additional recordset management:
        //
        // there are two types of additional recordSets:
        //
        //     - every recordset which follow the main recordset in the main connection
        //     - every recordset returned by an additional connection
        //
        // which is their porpouse:
        //
        // they bring a source of data related or not with the main recordset
        //
        // a common use is for getting the logo of company reports 
        //
        // other use is to attach to a number of rows in the main recordset 
        // some heavy data without repeat it in each row. It's very usefull 
        // with images.
        //
        // the formula getDataFromRSAd is used to access data in additional recordSets
        //
        // getDataFromRSAd parameters:
        //                    - datasource name
        //                    - index of the recordset in the datasource
        //                    - column name in the recordset
        //                    - an string with the relaction between the main and the additional recordset
        //
        // Example:    GetDataFromRsAd (lsListaPrecioExpo,2,smallimage,pr_id=pr_id)
        //
        // Nota: in this example we have a relation between two columns but the filter could contain
        //       multiples columns.
        //       the first column is for the main recordset, the second columns is for the 
        //       additional recordset

        //--------------------------------------------------------------------------------

        private C_HEADERS: number = 1;
        private C_FOOTERS: number = 2;
        private C_NODE_RPT_HEADERS: string = "RptHeaders";
        private C_NODE_RPT_DETAILS: string = "RptDetails";
        private C_NODE_GROUPS: string = "RptGroups";
        private C_NODE_RPT_FOOTERS: string = "RptFooters";
        private C_RPT_CONNECT: string = "RptConnect";
        private C_NODE_RPT_FORMULAS: string = "RptFormulas";
        private C_NODE_RPT_PAGES_SETTING: string = "RptPagesSetting";
        private C_NODE_RPT_PAGES: string = "RptPages";
        private C_NODE_PAPER_INFO: string = "PaperInfo";
        private C_FILE_EX: string = "CrowSoft Report|*.csr| Archivos Xml|*.xml";
        private C_FILE_DATA_EX: string = "CrowSoft Report data|*.csd| Archivos Xml|*.xml";

        // every formula in a header
        //
        private C_IDX_GROUP_HEADER: number = -1000;
        //
        // every formula in detail
        //
        private C_IDX_GROUP_DETAIL: number = 0;
        //
        // every formula in a footer
        //
        private C_IDX_GROUP_FOOTER: number = -1001;
        //
        // every formula in groups
        //
        private C_IDX_GROUP_REPORT_HEADER: number = -2000;
        private C_IDX_GROUP_REPORT_FOOTER: number = -2001;

        private C_IDX_H_LAST_ROW_EVALUATED: number = 0;
        private C_IDX_D_LAST_ROW_EVALUATED: number = 1;
        private C_IDX_F_LAST_ROW_EVALUATED: number = 2;

        // flag to know if we need to check in the group (this.vGroups)
        // which row was the last evaluated
        // instead of checking in this.LastRow..Evaluated
        //
        private C_IDX_G_LAST_ROW_EVALUATED: number = -1;

        private launchInfo: cReportLaunchInfo = null;

        private groups: cReportGroups = null;
        private details: cReportSections = null;
        private headers: cReportSections = null;
        private footers: cReportSections = null;
        private groupsHeaders: cReportSections = null;
        private groupsFooters: cReportSections = null;
        private paperInfo: cReportPaperInfo = null;
        private originalHeight: number = 0;
        private controls: cReportControls2 = null;
        private formulas: cReportFormulas = null;
        private formulaTypes: cReportFormulaTypes = null;
        private name: string = "";
        private path: string = "";
        private pathDefault: string = "";

        private userDescription: string = "";

        private connect: cReportConnect = null;
        private connectsAux: cReportConnectsAux = null;

        private pageSetting: cReportPageSettings = null;
        private pages: cReportPages = null;

        private compiler: cReportCompiler = null;
        private currentPage: number = 0;
        private totalPages: number = 0;

        private reportDisconnected: boolean = null;

        // to sort groups
        //
        // this array contains a table with the data of every recordset
        // in the main connection
        //
        // the function this.pGetData() reserves a position for every recordset
        // in the additional connections
        //
        private tables: DataTable[] = null;

        private images: Map<Bitmap> = null;
        private table: DataTable = null;
        private recordCount: number = 0;
        private vRowsIndex: number[] = null;
        private lastRowIndex: number = -1;
        private vRowsIndexAux: number[] = null;
        private iRow: number = 0;
        private iRow2: number = 0;
        private iRowFormula: number = 0;
        private lineIndex: number = 0;

        private lastRowPreEvaluated: number[] = null;
        private lastRowPostEvaluated: number[] = null;

        // flag to know if there are group headers to re-print in a new page
        // if it is false we can print a footer as the first line in a new page
        //
        private bExistsGrpToRePrintInNP: boolean = null;
        private bHaveToRePrintGroup: boolean = null;

        private NO_GROUP_INDEX: number = 0;

        // to print groups in a new page when a group changes
        //
        private idxGroupToPrintNP: number = this.NO_GROUP_INDEX;

        // index of the current group header
        //
        private idxGroupHeader: number = this.NO_GROUP_INDEX;

        // index of the current group footer
        //
        private idxGroupFooter: number = this.NO_GROUP_INDEX;

        private bPrintFooter: boolean = null;
        private bLastFootersWasPrinted: boolean = null;
        private groupIndexChange: number = this.NO_GROUP_INDEX;

        private bEvalPreGroups: boolean = null;
        private bCloseFooter: boolean = null;
        private bOpenHeader: boolean = null;

        // it is incremented only when a the detail section is printed
        // it doesn't care if the details contains more than one line
        //
        // index of the current line
        //
        private lineNumber: number = 0;

        private vGroups: T_Groups[] = null;
        private firstGroup: boolean = null;
        private groupCount: number = 0;

        private isForWeb: boolean = null;

        private databaseEngine: DatabaseEngine = DatabaseEngine.SQL_SERVER;

        private exportEmailAddress: string = "";

        private reportDoneListener: (report: cReport) => void;
        private progressListener: (report: cReport, eventArgs: ProgressEventArgs) => void;

        public constructor() {
            try {
                this.headers = new cReportSections();
                this.details = new cReportSections();
                this.footers = new cReportSections();
                this.groups = new cReportGroups();
                this.groupsHeaders = this.getGroups().getGroupsHeaders();
                this.groupsFooters = this.getGroups().getGroupsFooters();
                this.paperInfo = new cReportPaperInfo();
                this.controls = new cReportControls2();
                this.formulas = new cReportFormulas();
                this.formulaTypes = new cReportFormulaTypes();
                this.connect = new cReportConnect();
                this.pageSetting = new cReportPageSettings();
                this.pages = new cReportPages();

                this.compiler = new cReportCompiler();

                this.setConnectsAux(new cReportConnectsAux());

                this.details.setCopyColl(this.controls);
                this.headers.setCopyColl(this.controls);
                this.footers.setCopyColl(this.controls);
                this.groupsHeaders.setCopyColl(this.controls);
                this.groupsFooters.setCopyColl(this.controls);

                this.details.setTypeSection(csRptSectionType.DETAIL);
                this.headers.setTypeSection(csRptSectionType.HEADER);
                this.footers.setTypeSection(csRptSectionType.FOOTER);
                this.groupsHeaders.setTypeSection(csRptSectionType.GROUP_HEADER);
                this.groupsFooters.setTypeSection(csRptSectionType.GROUP_FOOTER);

                this.details.setMainTypeSection(csRptSectionType.MAIN_DETAIL);
                this.headers.setMainTypeSection(csRptSectionType.MAIN_HEADER);
                this.footers.setMainTypeSection(csRptSectionType.MAIN_FOOTER);
            }
            catch (ex) {
                cError.mngError(ex);
            }
        }

        public getExportEmailAddress() {
            return this.exportEmailAddress;
        }

        public setExportEmailAddress(rhs: string) {
            this.exportEmailAddress = rhs;
        }

        public getIsForWeb() {
            return this.isForWeb;
        }

        public setIsForWeb(rhs: boolean) {
            this.isForWeb = rhs;
        }

        public setDatabaseEngine(databaseEngine: DatabaseEngine) {
            this.databaseEngine = databaseEngine;
        }

        public getConnectsAux() {
            return this.connectsAux;
        }

        public setConnectsAux(rhs: cReportConnectsAux) {
            this.connectsAux = rhs;
        }

        public getGroups() {
            return this.groups;
        }

        public setGroups(rhs: cReportGroups) {
            this.groups = rhs;
        }

        public getDetails() {
            return this.details;
        }

        public setDetails(rhs: cReportSections) {
            this.details = rhs;
        }

        public getHeaders() {
            return this.headers;
        }

        public setHeaders(rhs: cReportSections) {
            this.headers = rhs;
        }

        public getFooters() {
            return this.footers;
        }

        public setFooters(rhs: cReportSections) {
            this.footers = rhs;
        }

        public getGroupsHeaders() {
            return this.groupsHeaders;
        }

        public getGroupsFooters() {
            return this.groupsFooters;
        }

        public getPaperInfo() {
            return this.paperInfo;
        }

        public setPaperInfo(rhs: cReportPaperInfo) {
            this.paperInfo = rhs;
        }

        public getControls() {
            return this.controls;
        }

        public getFormulas() {
            return this.formulas;
        }

        public getFormulaTypes() {
            return this.formulaTypes;
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getPath() {
            return this.path;
        }

        public setPathDefault(rhs: string) {
            this.pathDefault = rhs;
        }

        public getConnect() {
            return this.connect;
        }

        public getPages() {
            return this.pages;
        }

        public getPageSetting() {
            return this.pageSetting;
        }

        public setPageSetting(rhs: cReportPageSettings) {
            this.pageSetting = rhs;
        }

        public getLaunchInfo() {
            return this.launchInfo;
        }

        public getCompiler() {
            return this.compiler;
        }

        public getReportDisconnected() {
            return this.reportDisconnected;
        }

        public setReportDisconnected(rhs: boolean) {
            this.reportDisconnected = rhs;
        }

        public getDescripUser() {
            return this.userDescription;
        }

        public setDescripUser(rhs: string) {
            this.userDescription = rhs;
        }

        public getCurrenPage() {
            return this.pages.count();
        }

        public getTotalPages() {
            return this.pages.count();
        }

        public moveGroup(from: number, to: number) {
            if (from < 1 || from > this.groups.count()) {
                return false;
            }
            if (to < 1 || to > this.groups.count()) {
                return false;
            }

            if (from !== to) {

                let group: cReportGroup = null;
                let collGroups: cReportGroups = new cReportGroups();

                for(let _i = 0; _i < this.groups.count(); _i++) {
                    group = this.groups.item(_i);
                    collGroups.add(group, group.getKey());
                }

                this.groups.clear();

                let index: number = 0;

                for(let _i = 0; _i < collGroups.count(); _i++) {
                    group = collGroups.item(_i);
                    index = index + 1;
                    if (index !== from) {
                        if (index === to) {
                            let group2: cReportGroup = collGroups.item(from);
                            this.groups.add2(group2, group2.getKey());
                        }
                        this.groups.add2(group, group.getKey());
                    }
                }
            }
            return true;
        }

        // this function is called by the print component every time a page is printed
        // the function add a new cReportPage object to the pages collection
        // and then set every header in the new cReportPage
        //
        public newPage() {
            let page: cReportPage = this.pages.add(null, "");
            page.setPageNumber(this.pages.count());

            // if the user has canceled we return an error
            //
            if (!this.progress("", this.pages.count(), 0, 0)) {
                return csRptNewPageResult.CS_RPT_NP_ERROR;
            }

            // if it is the first page we evaluate the headers of the report
            //
            if (this.pages.count() === 1) {
                this.evalFunctions(this.C_IDX_GROUP_REPORT_HEADER, csRptWhenEval.CS_RPT_EVAL_PRE);
            }

            // only formulas located in header sections
            //
            this.evalFunctions(this.C_IDX_GROUP_HEADER, csRptWhenEval.CS_RPT_EVAL_PRE);

            // add field from every header to the page
            //
            this.addFieldToNewPage(this.headers, page, this.C_HEADERS);

            // only formulas located in header sections
            //
            this.evalFunctions(this.C_IDX_GROUP_HEADER, csRptWhenEval.CS_RPT_EVAL_POST);

            // if it is the first page we evaluate the headers of the report
            //
            if (this.pages.count() === 1) {
                this.evalFunctions(this.C_IDX_GROUP_REPORT_HEADER, csRptWhenEval.CS_RPT_EVAL_POST);
            }

            // we need to set height of headers an footers
            //
            page.setHeaderBottom(this.getHeightHeader());
            page.setFooterTop(this.getTopFooter());

            if (this.table === null) {
                return csRptNewPageResult.CS_RPT_NP_END;
            }
            else if (this.iRow > this.lastRowIndex) {
                return csRptNewPageResult.CS_RPT_NP_END;
            }

            // if there are group headers which need to be reprinted
            // in the new page
            //
            if (this.bExistsGrpToRePrintInNP) {
                this.bHaveToRePrintGroup = true;

                // set on the flag to know we need to re-print group headers
                //
                this.pMarkGroupHeadersToReprint();
            }

            return csRptNewPageResult.CS_RPT_NP_SUCCESS;
        }

        private pMarkGroupHeadersToReprint() {
            // if this is the first page we do nothing
            //
            if (this.firstGroup) {
                return;
            }

            for(let i = 0; i < this.groupCount; i++) {
                if (this.groups.item(i).getRePrintInNewPage()) {
                    this.vGroups[i].reprintHeader = true;
                }
            }
        }

        private pExistsGroupHeadersToReprint() {
            for(let i = 0; i < this.groupCount; i++) {
                if (this.vGroups[i].reprintHeader) {
                    this.idxGroupHeader = i + 1;
                    this.bOpenHeader = true;
                    return true;
                }
            }

            // there are no more groups to re-print
            //
            this.bHaveToRePrintGroup = false;
            return false;
        }

        private pCheckExistsGroupHToReprint() {
            for(let i = 0; i < this.groupCount; i++) {
                if (this.vGroups[i].reprintHeader) {
                    return;
                }
            }

            // there are no more groups to re-print
            //
            this.bHaveToRePrintGroup = false;
        }

        // this function is called by the print component every time a page is printed
        // the function set the footers in the last page of the this.pages collection
        //
        public endPage() {
            // last page
            //
            let page: cReportPage = this.pages.item(this.pages.count()-1);

            // only formulas located in footer sections
            //
            this.evalFunctions(this.C_IDX_GROUP_FOOTER, csRptWhenEval.CS_RPT_EVAL_PRE);

            // add field from every header to the page
            //
            this.addFieldToNewPage(this.footers, page, this.C_FOOTERS);

            // only formulas located in footer sections
            //
            this.evalFunctions(this.C_IDX_GROUP_FOOTER, csRptWhenEval.CS_RPT_EVAL_POST);

            return csRptEndPageResult.CS_RPT_EP_SUCCESS;
        }

        public markGroupHeaderPrinted() {
            // if it took place in a re-print
            //
            if (this.vGroups[this.idxGroupHeader - 1].reprintHeader) {

                this.vGroups[this.idxGroupHeader - 1].reprintHeader = false;

                // every time we print a group
                // because was mark as needed to re-print
                // we check if we need to set off the flag
                //
                this.pCheckExistsGroupHToReprint();

                if (this.pNotPendingFooters()) {
                    this.pMarkGroupHeaderPrintedAux();
                }

                // if the group has changed we need to
                // initialize it and then mark it as printed
                //
            }
            else if (this.vGroups[this.idxGroupHeader - 1].changed) {
                this.pMarkGroupHeaderPrintedAux();
            }
        }

        private pMarkGroupHeaderPrintedAux() {

            // if we have printed the group we need to set off
            // the flag which tell us the group has changed
            //
            this.vGroups[this.idxGroupHeader - 1].changed = false;

            // if it was a group which has to be printed in a new page
            // we set off the flag because the group has been printed
            //
            if (this.idxGroupToPrintNP === this.idxGroupHeader) {
                this.idxGroupToPrintNP = this.NO_GROUP_INDEX;
            }

            let headerSec = this.groups.item(this.idxGroupHeader - 1).getHeader();

            // we need to initialize the variables of every formula
            // in every control located in the header section of the group
            //
            for(let _i = 0; _i < headerSec.getSectionLines().count(); _i++) {
                let secLn = headerSec.getSectionLines().item(_i);
                for(let _j = 0; _j < secLn.getControls().count(); _j++) {
                    let ctrl = secLn.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        this.compiler.initVariable(ctrl.getFormulaHide());
                    }
                    if (ctrl.getHasFormulaValue()) {
                        this.compiler.initVariable(ctrl.getFormulaValue());
                    }
                }
            }
        }

        public markGroupFooterPrinted() {
            // if the group has been printed we set off the flag
            // used to know if it must be closed
            //
            this.vGroups[this.idxGroupFooter - 1].footerMustBeClosed = false;

            let footerSec = this.groups.item(this.idxGroupFooter - 1).getFooter();

            // we need to initialize the variables of every formula
            // in the controls of every section lines in the footer group
            //
            for(let _i = 0; _i < footerSec.getSectionLines().count(); _i++) {
                let secLn = footerSec.getSectionLines().item(_i);
                for(let _j = 0; _j < secLn.getControls().count(); _j++) {
                    let ctrl = secLn.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        this.compiler.initVariable(ctrl.getFormulaHide());
                    }
                    if (ctrl.getHasFormulaValue()) {
                        this.compiler.initVariable(ctrl.getFormulaValue());
                    }
                }
            }

            if (this.pNotPendingFooters()) {
                this.iRowFormula = this.iRow;
                this.iRow2 = this.iRow;
            }
        }

        public evalPost() {
            this.evalFunctions(this.C_IDX_GROUP_DETAIL, csRptWhenEval.CS_RPT_EVAL_POST);
        }

        public evalPreGroupHeader() {
            if (this.idxGroupHeader !== this.NO_GROUP_INDEX) {
                this.evalFunctions(this.idxGroupHeader, csRptWhenEval.CS_RPT_EVAL_PRE);
            }
        }

        public evalPreGroupFooter() {
            if (this.idxGroupHeader !== this.NO_GROUP_INDEX) {
                let idxChildGroupFooter: number = this.pGetChildGroupFooterToClose(this.idxGroupHeader);

                // when we close a group we need to evaluate every sub-group
                //
                while (idxChildGroupFooter > this.idxGroupHeader) {
                    this.evalFunctions(idxChildGroupFooter * -1, csRptWhenEval.CS_RPT_EVAL_PRE);
                    idxChildGroupFooter = idxChildGroupFooter - 1;
                }

                // finally we need to evaluate the group that has changed
                //
                this.evalFunctions(this.idxGroupHeader * -1, csRptWhenEval.CS_RPT_EVAL_PRE);
            }
        }

        public evalPostGroupHeader() {
            if (this.idxGroupHeader === this.NO_GROUP_INDEX) { return; }
            this.evalFunctions(this.idxGroupHeader, csRptWhenEval.CS_RPT_EVAL_POST);
        }

        public evalPostGroupFooter() {
            if (this.idxGroupHeader !== this.NO_GROUP_INDEX) {

                let idxChildGroupFooter: number = 0;

                idxChildGroupFooter = this.pGetChildGroupFooterToClose(this.idxGroupHeader);

                // when we close a group we need to evaluate every sub-group
                //
                while (idxChildGroupFooter > this.idxGroupHeader) {
                    this.evalFunctions(idxChildGroupFooter * -1, csRptWhenEval.CS_RPT_EVAL_POST);
                    idxChildGroupFooter = idxChildGroupFooter - 1;
                }

                // finally we need to evaluate the group that has changed
                //
                this.evalFunctions(this.idxGroupHeader * -1, csRptWhenEval.CS_RPT_EVAL_POST);
            }
        }

        private pGetChildGroupFooterToClose(idxGroupFather: number) {
            let groupIndex: number = 0;
            for(let j = idxGroupFather - 1; j < this.groupCount; j++) {
                if (this.vGroups[j].footerMustBeClosed) {
                    groupIndex = j + 1;
                }
            }
            return groupIndex;
        }

        public evalPre() {
            this.evalFunctions(this.C_IDX_GROUP_DETAIL, csRptWhenEval.CS_RPT_EVAL_PRE);
        }

        public moveToNext() {
            // we move to the next group
            //
            this.iRow = this.iRow + 1;
            this.iRow2 = this.iRow;
            this.iRowFormula = this.iRow;

            // we need to move the additional recordset too
            //
            for(let indexRows = 0; indexRows < this.tables.length; indexRows++) {
                let indexRow: number = this.vRowsIndexAux[indexRows] + 1;
                if (this.tables[indexRows] !== null) {
                    if (indexRow < this.tables[indexRows].rows.length) {
                        this.vRowsIndexAux[indexRows] = indexRow;
                    }
                }
            }
        }

        private pExistsGroupToReprintInNP() {
            this.bExistsGrpToRePrintInNP = false;
            for(let i = 0; i < this.groupCount; i++) {
                if (this.groups.item(i).getRePrintInNewPage()) {
                    this.bExistsGrpToRePrintInNP = true;
                    return;
                }
            }
        }

        private pNotPendingFooters() {
            for(let i = 0; i < this.groupCount; i++) {
                if (this.vGroups[i].footerMustBeClosed) {
                    return false;
                }
            }
            return true;
        }

        // it only returns one of the following:
        //
        //      GroupH
        //      Detail
        //      GroupF
        //      End
        //
        public getLineType() {
            // if there are groups footers which need to be printed
            //
            if (this.idxGroupFooter !== this.NO_GROUP_INDEX) {
                if (this.vGroups[this.idxGroupFooter - 1].footerMustBeClosed) {
                    return csRptGetLineResult.CS_RPT_GL_GROUP_FOOTER;
                }
            }

            // if there are groups headers which need to be printed
            //
            if (this.idxGroupHeader !== this.NO_GROUP_INDEX) {
                if (this.vGroups[this.idxGroupHeader - 1].changed) {
                    return csRptGetLineResult.CS_RPT_GL_GROUP_HEADER;
                }
            }

            // if reach the end of the report and there are not groups
            // which need to be printed we have ended
            //
            if (this.pReportIsDone()) {
                return csRptGetLineResult.CS_RPT_GL_END;
            }

            // If there are group headers:
            //
            // - which need to be printed in a new page
            // o
            // - which need to be re-printed because we are in a new page
            //
            if (this.idxGroupToPrintNP > 0 || this.bHaveToRePrintGroup) {
                return csRptGetLineResult.CS_RPT_GL_VIRTUAL_H;
            }

            // if there are groups footers which have to be printed
            //
            if (this.pEvalFooterToClose2()) {
                return csRptGetLineResult.CS_RPT_GL_VIRTUAL_F;
            }

            // if there is nothing more to do we have finished
            //
            if (this.iRow > this.lastRowIndex && this.pNotPendingFooters()) {
                return csRptGetLineResult.CS_RPT_GL_END;
            }

            // if there are group headers to process
            //
            if (this.pGetLineAuxPrintHeader()) {
                return csRptGetLineResult.CS_RPT_GL_VIRTUAL_H;
            }

            // if we get here we are in line of the detail
            //
            return csRptGetLineResult.CS_RPT_GL_DETAIL;
        }

        // it returns every controls of a line
        // it moves through every row in the main recordset
        //
        public getLine(fields: RefWrapper<cReportPageFields>): csRptGetLineResult {
            // to know if we need to print in a new page
            // because a group has changed its value
            //
            let bGetNewPage: boolean = false;

            if (fields.get() !== null) {
                fields.get().clear();
            }

            // if there are not pending calls to close or open groups
            //
            if (!(this.bCloseFooter || this.bOpenHeader)) {

                // if there are not group headers to be re-printed in this page
                //
                if (!this.pExistsGroupHeadersToReprint()) {

                    // we process the line
                    //
                    let rslt: csRptGetLineResult = this.pGetLineWork(fields, bGetNewPage);
                    if (bGetNewPage) {
                        return csRptGetLineResult.CS_RPT_GL_NEW_PAGE;
                    }
                    else {
                        if (rslt === csRptGetLineResult.CS_RPT_GL_END || rslt === csRptGetLineResult.CS_RPT_GL_VIRTUAL_F) {
                            return rslt;
                        }
                    }
                }
            }

            // if we must close footers
            //
            if (this.bCloseFooter) {
                return this.pGetLineAuxGroupFooter(fields);
            }
            // if the group has changed
            //
            else if (this.bOpenHeader) {
                return this.pGetLineAuxGroupHeader(bGetNewPage, fields);
            }
            // process a details line
            //
            else {
                return this.pGetLineAuxDetail(fields);
            }
        }

        private pGetLineWork(fields: RefWrapper<cReportPageFields>, bGetNewPage: boolean) {
            bGetNewPage = false;

            // if the user has cancel we have finished
            //
            if (this.pGetLineAuxReportCancel() === csRptGetLineResult.CS_RPT_GL_END) {
                return csRptGetLineResult.CS_RPT_GL_END;
            }

            // if we reach the end of the report and there are not groups to process
            // we have finished
            //
            let rslt: csRptGetLineResult = this.pGetLineWorkAuxReportEnd();
            if (rslt === csRptGetLineResult.CS_RPT_GL_END || rslt === csRptGetLineResult.CS_RPT_GL_VIRTUAL_F) {
                return rslt;
            }

            // field collection for this line
            //
            fields.set(new cReportPageFields());

            // if we need to print the group in a new page
            //
            if (this.idxGroupToPrintNP > 0) {
                this.pGetLineAuxPrintGroupInNP();
            }
            // we need to process groups
            //
            else {
                // if the report have groups
                //
                if (this.groupCount > 0) {
                    // if we don't need to re-print group headers
                    //
                    if (!this.bHaveToRePrintGroup) {
                        this.pEvalFooterToClose();
                    }

                    // if we don't need to re-print group footers
                    //
                    if (!this.bCloseFooter) {
                        // if have done all the pending work we have finished
                        //
                        if (this.pGetLineAuxReportIsDone() === csRptGetLineResult.CS_RPT_GL_END) {
                            return csRptGetLineResult.CS_RPT_GL_END;
                        }

                        // continue with the next group
                        //
                        this.pGetLineAuxDoGroups(bGetNewPage);
                    }
                }
            }
            return csRptGetLineResult.CS_RPT_GL_NONE;
        }

        private pGetLineAuxPrintGroupInNP() {
            this.idxGroupHeader = this.idxGroupToPrintNP;
            this.idxGroupToPrintNP = this.NO_GROUP_INDEX;
            this.bOpenHeader = true;
        }

        private pReportIsDone() {
            // if we have finished return CS_RPT_GL_END
            //
            if (this.table === null || this.iRow > this.recordCount -1) {
                // if there are not pending footers we have finished
                // 
                if (!this.bPrintFooter) {
                    return true;
                }
            }
            return false;
        }

        private pGetLineWorkAuxReportEnd() {
            // if we have finished return CS_RPT_GL_END
            //
            if (this.table === null || this.iRow > this.recordCount - 1) {
                if (this.iRow > this.recordCount - 1) {
                    this.iRow2 = this.recordCount - 1;
                }

                // if there are footer to be printed
                //
                if (this.bPrintFooter) {
                    // if we need to eval functions before print
                    //
                    if (this.bEvalPreGroups) {
                        // set this flag off to allow the next call to 
                        // getLine() -> this.pGetLineWork() -> this.pGetLineWorkAuxReportEnd()
                        // to print the footer
                        //
                        this.bEvalPreGroups = false;

                        return csRptGetLineResult.CS_RPT_GL_VIRTUAL_F;
                    }
                    else {
                        if (!this.bLastFootersWasPrinted) {
                            // set this flag on to know we have started to
                            // close group footers
                            //
                            this.bLastFootersWasPrinted = true;

                            // we force a change in the first group to force
                            // the close of every group footer
                            //
                            this.groupIndexChange = 1;

                            // set the flag of the last group on to force this call to
                            // print it and the next footers will be printed in sucesive
                            // calls to getLine() -> this.pGetLineWork() -> this.pGetLineWorkAuxReportEnd()
                            //
                            this.vGroups[this.vGroups.length - 1].footerMustBeClosed = true;
                        }
                    }
                }
                // if there are no more footers to be closed we have finished
                // 
                else {
                    this.reportDone();
                    return csRptGetLineResult.CS_RPT_GL_END;
                }
            }
            return csRptGetLineResult.CS_RPT_GL_NONE;
        }

        private pGetLineAuxReportCancel() {
            // if the user has canceled we have finished
            //
            if (!this.progress("", 0, this.iRow, this.recordCount)) {
                this.reportDone();
                return csRptGetLineResult.CS_RPT_GL_END;
            }
            else {
                return csRptGetLineResult.CS_RPT_GL_NONE;
            }
        }

        private pGetLineAuxReportIsDone() {
            // if we have printed the las footer we have finished
            //
            if (this.iRow > this.lastRowIndex && this.pNotPendingFooters()) {
                this.reportDone();
                this.bPrintFooter = false;
                return csRptGetLineResult.CS_RPT_GL_END;
            }
            return csRptGetLineResult.CS_RPT_GL_NONE;
        }

        private pEvalFooterToClose2() {
            for(let i = this.groupCount-1; i > -1; i--) {
                if (this.vGroups[i].footerMustBeClosed) {
                    return true;
                }
            }
            return false;
        }

        private pEvalFooterToClose() {
            for(let i = this.groupCount-1; i > -1; i--) {
                if (this.vGroups[i].footerMustBeClosed) {
                    this.idxGroupFooter = i + 1;

                    // we have to check only the footer or the group which has
                    // changed and its subgroups
                    //
                    if (this.idxGroupFooter > this.groupIndexChange) {

                        // we need to close the footer of the group which contains it
                        //
                        this.vGroups[i-1].footerMustBeClosed = true;
                    }
                    this.bCloseFooter = true;
                    break;
                }
            }
            return this.bCloseFooter;
        }

        private pGetLineAuxPrintHeader() {
            // we need to evaluate groups
            //
            for(let i = 0; i < this.groupCount; i++) {

                if (!this.vGroups[i].grandTotalGroup) {

                    if (this.vGroups[i].value === null) {
                        return true;
                    }

                    let col: number = this.vGroups[i].indexField;
                    let row: number = this.vRowsIndex[this.iRow2];

                    switch (this.vGroups[i].comparisonType)
                    {
                        case RptGrpComparisonType.CS_RPT_GRP_TEXT:
                            let text: string = ReportGlobals.valVariant(this.table.rows[row][col]).toString().toLowerCase();
                            if (this.vGroups[i].value.toString() !== text) {
                                return true;
                            }
                            break;
                        case RptGrpComparisonType.CS_RPT_GRP_NUMBER:
                            let number: number = Utils.val(ReportGlobals.valVariant(this.table.rows[row][col]));
                            if (this.vGroups[i].value !== number) {
                                return true;
                            }
                            break;
                        case RptGrpComparisonType.CS_RPT_GRP_DATE:
                            let date: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(this.table.rows[row][col]));
                            if (this.vGroups[i].value !== date) {
                                return true;
                            }
                            break;
                    }
                }
            }
            return false;
        }

        private orderDateAsc(first: number, last: number, orderBy: number) {
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = this.estimateLoops(last - first);
            for (let i = first + 1; i <= last; i++) {
                bChanged = false;
                for (let j = last; j >= i; j--) {
                    q = q + 1;
                    let row1: number = this.vRowsIndex[j];
                    let row2: number = this.vRowsIndex[j - 1];
                    let date1: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(this.table.rows[row1][orderBy]));
                    let date2: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(this.table.rows[row2][orderBy]));
                    if (date1 < date2) {
                        if (!this.progress("", 0, q, t)) {
                            return false;
                        }
                        this.changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!this.progress("", 0, q, t)) {
                    return false;
                }
                if (!bChanged) {
                    break;
                }
            }
            return true;
        }

        private orderDateDesc(first: number, last: number, orderBy: number) {
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = this.estimateLoops(last - first);
            for (let i = first + 1; i <= last; i++) {
                bChanged = false;
                for (let j = last; j >= i; j--) {
                    q = q + 1;
                    let row1: number = this.vRowsIndex[j];
                    let row2: number = this.vRowsIndex[j - 1];
                    let date1: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(this.table.rows[row1][orderBy]));
                    let date2: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(this.table.rows[row2][orderBy]));
                    if (date1 > date2) {
                        if (!this.progress("", 0, q, t))  {
                            return false; 
                        }
                        this.changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!this.progress("", 0, q, t))  {
                    return false; 
                }
                if (!bChanged)  {
                    break; 
                }
            }
            return true;
        }

        private pGetLineAuxDoGroups(bGetNewPage: boolean) {
            // we continue evaluating groups
            //
            for(let i = 0; i < this.groupCount; i++) {

                // if the group has changed
                //
                // we only get into here where
                //
                //  - a group has changed in the previous call to 
                //    GetLine, and we have closed every GroupsFooter
                //    in previous calls to GetLine or
                //
                //  - we are in a new page and need to re-print group headers
                //
                if (this.vGroups[i].changed) {
                    this.pGroupChanged(i, bGetNewPage);
                    break;
                }
                else {
                    this.pEvalGroupChange(i);

                    if (this.vGroups[i].changed) {
                        this.idxGroupHeader = i + 1;

                        // if it is the first time we are printing groups
                        //
                        if (this.firstGroup) {
                            this.pOpenGroupHeader(i);
                        }
                        // the first thing to do is to close footers
                        //
                        else {
                            this.pCloseGroupFooters(i);
                        }
                        break;
                    }
                }
            }
        }

        private pCloseGroupFooters(i: number) {
            // save the index of the outer footer we need to close
            //
            this.groupIndexChange = i + 1;

            this.bCloseFooter = true;
            this.idxGroupFooter = this.groupCount;

            // when a group changes we need to close from the
            // most inner group to the most outer group 
            // which is changing (this.GroupIndexChange)
            //
            for(let j = this.groupIndexChange - 1; j < this.idxGroupFooter; j++) {
                this.vGroups[j].footerMustBeClosed = true;
            }
        }

        private pOpenGroupHeader(i: number) {
            // set this flag off to know we need to print the last footers
            //
            this.bLastFootersWasPrinted = false;
            this.vGroups[i].changed = false;
            this.idxGroupHeader = i + 1;

            // set this flag on to know we need to close
            // the next group in a future call to getLine()
            // only if there are more group
            //
            if (i < this.groupCount - 1) {
                this.vGroups[i + 1].changed = true;
            }
            this.bOpenHeader = true;
        }

        private changeGroup(i: number, value: string|object|number) {
            this.vGroups[i].value = value;
            this.vGroups[i].changed = true;
            if (!this.firstGroup) {
                this.vGroups[i].footerMustBeClosed = true;
            }
            this.pEvalGroupChangedAux(i + 1);
        }

        private pEvalGroupChange(i: number) {
            if (this.vGroups[i].grandTotalGroup) {
                if (this.vGroups[i].value === null) {
                    this.changeGroup(i, "1");
                }
            }
            else {
                let col: number = this.vGroups[i].indexField;
                let row: number = this.vRowsIndex[this.iRow2];
                switch (this.vGroups[i].comparisonType)
                {
                    case RptGrpComparisonType.CS_RPT_GRP_TEXT:
                        let text: string = ReportGlobals.valVariant(this.table.rows[row][col]).toString().toLowerCase();
                        if (this.vGroups[i].value === null) {
                            this.changeGroup(i, text);
                        }
                        else if (this.vGroups[i].value.toString() !== text) {
                            this.changeGroup(i, text);
                        }
                        break;

                    case RptGrpComparisonType.CS_RPT_GRP_NUMBER:
                        let num: number = Utils.val(ReportGlobals.valVariant(this.table.rows[row][col]));
                        if (this.vGroups[i].value === null) {
                            this.changeGroup(i, num);
                        }
                        else if (this.vGroups[i].value !== num) {
                            this.changeGroup(i, num);
                        }
                        break;

                    case RptGrpComparisonType.CS_RPT_GRP_DATE:
                        let date: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(this.table.rows[row][col]));
                        if (this.vGroups[i].value === null) {
                            this.changeGroup(i, date);
                        }
                        else if (this.vGroups[i].value !== date) {
                            this.changeGroup(i, date);
                        }
                        break;
                }
            }
        }

        private pEvalGroupChangedAux(i: number) {
            for (; i < this.groupCount; i++) {
                this.pGroupChangedAux(i);
            }
        }

        private pGroupChangedAux(i: number) {
            let col: number = this.vGroups[i].indexField;
            let row: number = this.vRowsIndex[this.iRow2];
            switch (this.vGroups[i].comparisonType)
            {
                case RptGrpComparisonType.CS_RPT_GRP_TEXT:
                    this.vGroups[i].value = ReportGlobals.valVariant(this.table.rows[row][col]).toString().toLowerCase();
                    break;
                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:
                    this.vGroups[i].value = Utils.val(ReportGlobals.valVariant(this.table.rows[row][col]));
                    break;
                case RptGrpComparisonType.CS_RPT_GRP_DATE:
                    this.vGroups[i].value = ReportGlobals.dateValue(ReportGlobals.valVariant(this.table.rows[row][col]));
                    break;
            }
        }

        private pGroupChanged(i: number, bGetNewPage: boolean) {
            this.idxGroupHeader = i + 1;
            this.pGroupChangedAux(i);

            bGetNewPage = this.groups.item(i).getPrintInNewPage() && !this.firstGroup;

            // TODO: remove me
            //
            // this.idxGroupHeader = i + 1;

            if (bGetNewPage) {
                // setting it to any value but zero we mean that this group
                // must be printed in a new page
                //
                this.idxGroupToPrintNP = i + 1;
            }
            else {
                this.idxGroupToPrintNP = this.NO_GROUP_INDEX;
            }

            // set this flag ON to open this group in a future
            // call to getLine(). only if there are more groups
            //
            if (i < this.groupCount - 1) {
                this.vGroups[i + 1].changed = true;
            }
            this.bOpenHeader = true;
        }

        private pGetLineAuxGroupFooter(fields: RefWrapper<cReportPageFields>) {

            // if we need to evaluate functions which must run
            // before printing
            //
            if (this.bEvalPreGroups) {
                // when we are evaluating this kind of formulas we must use
                // the previous row because here we are closing groups
                // which means the current row doesn't belong to the
                // group we are closing
                //
                // NOTE: whe we have done whit printing the footers
                // we need to set this.iRowFormula and this.iRow2 to their 
                // original values
                //
                this.iRowFormula = this.iRow - 1;
                this.iRow2 = this.iRow - 1;

                // to force the next call to getLine() to close the footer
                //
                this.bEvalPreGroups = false;

                return csRptGetLineResult.CS_RPT_GL_VIRTUAL_F;
            }
            else {

                // if there are more footers to be printed this
                // flag will be turn on in the next call to getLine()
                //
                this.bCloseFooter = false;

                // to force the next call to return CS_RPT_GL_VIRTUAL_F
                //
                this.bEvalPreGroups = true;

                let footerSec = this.groups.item(this.idxGroupFooter - 1).getFooter();

                this.getLineAux(footerSec, fields);

                return csRptGetLineResult.CS_RPT_GL_GROUP_FOOTER;
            }
        }

        private pGetLineAuxGroupHeader(bGetNewPage: boolean, fields: RefWrapper<cReportPageFields>) {
            let headerSec: cReportSection = null;

            if (bGetNewPage && !this.firstGroup) {
                // in the detail and group headers the row for formulas
                // is the current row
                //
                this.iRowFormula = this.iRow;

                return csRptGetLineResult.CS_RPT_GL_NEW_PAGE;
            }
            else {

                // if we need to evaluate the functions which must
                // run before printing
                //
                if (this.bEvalPreGroups) {
                    // if we are not reprinting group headers
                    //
                    if (!this.bHaveToRePrintGroup) {
                        // in the detail and group headers the row for formulas
                        // is the current row
                        //
                        this.iRowFormula = this.iRow;
                    }
                    // to force the next call to getLine() to print the footer
                    //
                    this.bEvalPreGroups = false;

                    return csRptGetLineResult.CS_RPT_GL_VIRTUAL_H;
                }
                else {

                    this.bOpenHeader = false;

                    // to force the next call to getLine() to return CS_RPT_GL_VIRTUAL_F
                    //
                    this.bEvalPreGroups = true;
                    headerSec = this.groups.item(this.idxGroupHeader - 1).getHeader();
                    this.getLineAux(headerSec, fields);

                    // set this flag on to indicate we have footers to close
                    //
                    this.bPrintFooter = true;

                    // we return a group line
                    //
                    return csRptGetLineResult.CS_RPT_GL_GROUP_HEADER;
                }
            }
        }

        private pGetLineAuxDetail(fields: RefWrapper<cReportPageFields>) {
            this.firstGroup = false;

            this.getLineAux(this.details.item(0), fields);

            // we return a detail line
            //
            return csRptGetLineResult.CS_RPT_GL_DETAIL;
        }

        private getLineAux(sec: cReportSection, wfields: RefWrapper<cReportPageFields>) {
            // for every control in every section line of sec
            // we need to create a new cPageField
            //
            let field: cReportPageField = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;
            let isVisible: boolean;
            let indexCtrl: number = 0;

            let fields: cReportPageFields = wfields.get();

            // this indexes are used to
            //
            // indicate in which data source is this field
            //
            let indexRows: number = 0;
            //
            // in which row is this field
            //
            let indexRow: number = 0;
            //
            // in which column is this field
            //
            let indexField: number = 0;

            if (sec.getHasFormulaHide()) {
                isVisible = Utils.val(this.compiler.resultFunction(sec.getFormulaHide())) !== 0;
            }
            else {
                isVisible = true;
            }

            if (isVisible) {
                // for every section line in sec
                //
                for(let _i = 0; _i < sec.getSectionLines().count(); _i++) {
                    secLn = sec.getSectionLines().item(_i);
                    this.lineIndex++;

                    if (secLn.getHasFormulaHide()) {
                        this.compiler.evalFunction(secLn.getFormulaHide());
                        isVisible = Utils.val(this.compiler.resultFunction(secLn.getFormulaHide())) !== 0;
                    }
                    else {
                        isVisible = true;
                    }

                    if (isVisible) {
                        // for every control in the section line
                        //
                        let collByLeft: number[] = secLn.getControls().getCollByLeft();
                        for (indexCtrl = 0; indexCtrl < collByLeft.length; indexCtrl++) {
                            ctrl = secLn.getControls().item(collByLeft[indexCtrl]);

                            // add a new field to the collection
                            //
                            field = fields.add(null, "");
                            field.setIndexLine(this.lineIndex);

                            if (ctrl.getHasFormulaValue()) {
                                field.setValue(
                                    ReportGlobals.format(
                                        this.compiler.resultFunction(ctrl.getFormulaValue()),
                                        ctrl.getLabel().getAspect().getFormat()));
                            }
                            else {
                                let label: cReportLabel = null;
                                switch (ctrl.getControlType())
                                {
                                    case csRptControlType.CS_RPT_CT_FIELD:

                                        ({indexRows, indexRow, indexField} = this.pGetIndexRows(indexRows, indexRow, indexField, ctrl));

                                        if (this.tables[indexRows] !== null) {
                                            // it looks ugly, dont think you?
                                            //
                                            // maybe this help a litle:
                                            //
                                            //    this.vCollRows(IndexRows) a matrix with the data
                                            //                              contained in the datasource
                                            //                              referred by this control
                                            //
                                            //    (IndexField, IndexRow)    a cell in this matrix
                                            //
                                            let value: object = this.tables[indexRows].rows[indexRow][indexField];
                                            field.setValue(
                                                ReportGlobals.format(
                                                    ReportGlobals.valVariant(value),
                                                    ctrl.getLabel().getAspect().getFormat()));
                                        }
                                        break;

                                    case csRptControlType.CS_RPT_CT_LABEL:
                                        label = ctrl.getLabel();
                                        field.setValue(ReportGlobals.format(label.getText(), label.getAspect().getFormat()));
                                        break;

                                    case csRptControlType.CS_RPT_CT_IMAGE:
                                        label = ctrl.getLabel();
                                        field.setValue(ReportGlobals.format(label.getText(), label.getAspect().getFormat()));
                                        field.setImage(ctrl.getImage().getImage());
                                        break;

                                    case csRptControlType.CS_RPT_CT_DB_IMAGE:

                                        ({indexRows, indexRow, indexField} = this.pGetIndexRows(indexRows, indexRow, indexField, ctrl));

                                        if (this.tables[indexRows] !== null) {
                                            field.setImage(this.pGetImage(indexRows, indexField, indexRow));
                                        }
                                        break;

                                    case csRptControlType.CS_RPT_CT_CHART:

                                        ({indexRows, indexRow, indexField} = this.pGetIndexRows(indexRows, indexRow, indexField, ctrl));

                                        field.setImage(this.pGetChartImage(indexRows, indexField, indexRow, ctrl));
                                        break;
                                }
                            }

                            if (ctrl.getHasFormulaHide()) {
                                field.setVisible(Utils.val(this.compiler.resultFunction(ctrl.getFormulaHide())) !== 0);
                            }
                            else {
                                field.setVisible(true);
                            }

                            // set a reference to the definition of this field
                            //
                            field.setInfo(this.pageSetting.item(ctrl.getKey()));
                        }
                    }
                }
            }
        }

        // indexRows     define the datasource
        // indexRow      define the row in the datasource
        //
        private pGetIndexRows(indexRows: number, indexRow: number, indexField: number, ctrl: cReportControl) {
            // the datasource index have an offset of 1000 between each other
            //
            indexRows= ctrl.getField().getIndex() / 1000;
            indexField = ctrl.getField().getIndex() - (indexRows * 1000);

            if (indexRows === 0) {
                indexRow = this.vRowsIndex[this.iRow2];
            }
            else {
                indexRow = this.vRowsIndexAux[indexRows];
            }

            return {indexRows, indexRow, indexField};
        }

        public init(oLaunchInfo: cReportLaunchInfo) {
            try {
                this.setLaunchInfo(oLaunchInfo);
                return true;
            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        // run report
        //
        public launch(oLaunchInfo: cReportLaunchInfo = null) {
            try {
                let recordSets: [object|string[]] = null;
                let rs: DataTable = null;

                this.compiler.setReport(this);
                this.compiler.initGlobalObject();

                if (oLaunchInfo === null) {
                    if (this.launchInfo === null) {
                        throw new ReportLaunchInfoNoDefined(
                                        csRptErrors.LAUNCH_INFO_UNDEFINED,
                                        cReportError.errGetDescription(csRptErrors.LAUNCH_INFO_UNDEFINED));
                    }
                }
                else {
                    this.setLaunchInfo(oLaunchInfo);
                }

                if (this.launchInfo.getPrinter() === null) {
                    throw new ReportLaunchInfoNoDefined(
                                    csRptErrors.PRINTER_NOT_DEFINED,
                                    cReportError.errGetDescription(csRptErrors.PRINTER_NOT_DEFINED));
                }

                if (!this.progress("Building report ...")) {
                    return false;
                }

                // we need to sort all controls using the zorder property
                //
                this.sortCollection();

                if (! this.progress("Compiling report ...")) {
                    return false;
                }

                // compile report
                //
                if (! this.compileReport()) {
                    return false;
                }

                // we need to sort all controls by his aspect.left property
                //
                this.pSortControlsByLeft();

                if (! this.progress("Querying database")) {
                    return false;
                }

                recordSets = [[]];

                this.tables = new DataTable[1];

                // get the main recordset
                //
                let dtr = new RefWrapper(this.table);
                let rsr = new RefWrapper(rs);
                if (! this.pGetData(dtr, this.connect, true, recordSets, rsr)) {
                    return false;
                }
                this.table = dtr.get();
                rs = rsr.get()

                // the first element contains the main recordset
                //
                this.tables[0] = this.table;

                this.pInitImages();

                // get additional recordSets
                //
                if (!this.pGetDataAux(recordSets)) {
                    return false;
                }

                if (! this.initGroups(rs, this.pGetMainDataSource(recordSets))) {
                    return false;
                }

                if (! this.progress("Initializing report")) {
                    return false;
                }

                if (! this.initControls(recordSets)) {
                    return false;
                }

                // create the definition of this report
                //
                if (! this.createPageSetting()) {
                    return false;
                }

                this.pages.clear();
                this.lineIndex = 0;

                // globals initialization
                //
                this.bPrintFooter = false;
                this.bLastFootersWasPrinted = false;
                this.groupIndexChange = this.NO_GROUP_INDEX;
                this.iRow2 = 0;
                this.iRowFormula = 0;
                this.pSetGroupFormulaHeaders();
                this.pSetGroupsInCtrlFormulaHide();
                this.pSetIndexColInGroupFormulas(recordSets);
                this.pInitRowFormulas();

                // check if there are groups which need to be reprinted when the page change
                //
                this.pExistsGroupToReprintInNP();

                // to force the evaluate of the groups in the first page
                //
                this.bEvalPreGroups = true;
                this.bCloseFooter = false;
                this.bOpenHeader = false;

                let formula: cReportFormula = null;
                for(let _i = 0; _i < this.formulas.count(); _i++) {
                    formula = this.formulas.item(_i);
                    formula.setHaveToEval(true);
                }

                // launch the report
                //
                this.launchInfo.getObjPaint().setReport(this);
                if (!this.launchInfo.getObjPaint().makeReport()) {
                    return false;
                }

                switch (this.launchInfo.getAction())
                {
                    case csRptLaunchAction.CS_RPT_LAUNCH_PRINTER:
                        if (!this.launchInfo.getObjPaint().printReport()) {
                            return false;
                        }
                        break;
                    case csRptLaunchAction.CS_RPT_LAUNCH_FILE:
                        if (!this.launchInfo.getObjPaint().makeXml()) {
                            return false;
                        }
                        break;
                    case csRptLaunchAction.CS_RPT_LAUNCH_PREVIEW:
                        if (!this.launchInfo.getObjPaint().previewReport()) {
                            return false;
                        }
                        break;
                }

                return true;

            }
            catch (ex) {
                this.compiler.setReport(null);

                // if we haven't printed to preview
                // we need to clear the references 
                // between cReport and cReportLaunchInfo
                //
                if (this.launchInfo.getAction() !== csRptLaunchAction.CS_RPT_LAUNCH_PREVIEW) {
                    this.launchInfo.getObjPaint().setReport(null);
                    this.launchInfo.setObjPaint(null);
                }

                throw new ReportException(csRptErrors.ERROR_WHEN_RUNNING_REPORT,
                                          "Error when running report.\n\n"
                                          + "Info: " + ex.Message + "\n"
                                          + "Source: " + ex.Source + "\n"
                                          + "Stack trace: " + ex.StackTrace + "\n"
                                          + "Description: " + ex.toString()
                                          );
            }
        }

        public loadSilent(fileName: string) {

            return P.resolvedPromise(false);

            /* TODO: when working in node backend version or Electron desktop app
            try {
                let docXml: cXml = new cXml();

                this.path = cFile.getPath(fileName);
                this.name = cFile.getFileName(fileName);

                docXml.init();
                docXml.setFilter(this.C_FILE_EX);
                docXml.setName(this.name);
                docXml.setPath(this.path);

                if (!docXml.openXml()) {
                    return false;
                }

                let property: cXmlProperty = docXml.getNodeProperty(
                    docXml.getRootNode(), "ReportDisconnected");

                this.path = docXml.getPath();
                this.name = docXml.getName();
                this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

                return this.nLoad(docXml);
            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }*/
        }

        public load() {
            try {
                let docXml: cXml = new cXml();

                docXml.init();
                docXml.setFilter(this.C_FILE_EX);

                if (this.name !== "") {
                    docXml.setName(this.name);
                }
                else {
                    docXml.setPath(this.pathDefault + "\\*." + this.C_FILE_EX);
                }

                docXml.setPath(this.path);

                return docXml.openXmlWithDialog().then(P.call(this, () => {

                    let property: cXmlProperty = docXml.getNodeProperty(
                        docXml.getRootNode(), "ReportDisconnected");

                    this.path = docXml.getPath();
                    this.name = docXml.getName();
                    this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

                    return this.nLoad(docXml);
                }));
            }
            catch (ex) {
                cError.mngError(ex);
                return P.resolvedPromise(false);
            }
        }

        public save(commDialog: object, withDialog: boolean) {
            let docXml: cXml = new cXml();

            docXml.init();
            docXml.setFilter(this.C_FILE_EX);
            docXml.setName(this.name);
            docXml.setPath(this.path);

            if (withDialog) {
                if (!docXml.newXmlWithDialog()) {
                    return false;
                }
            }
            else {
                if (!docXml.newXml()) {
                    return false;
                }
            }

            this.name = docXml.getName();
            this.path = docXml.getPath();

            let xProperty: cXmlProperty = new cXmlProperty();

            xProperty.setName("RptName");
            xProperty.setValue(eTypes.eText, this.name);
            docXml.addProperty(xProperty);

            xProperty.setName("ReportDisconnected");
            xProperty.setValue(eTypes.eBoolean, this.reportDisconnected);
            docXml.addProperty(xProperty);

            // sections
            //
            let sec: cReportSection = null;
            let nodeObj: XmlNode = null;

            if (!this.connect.save(docXml, null)) {
                return false;
            }
            if (!this.connectsAux.save(docXml, null)) {
                return false;
            }
            if (!this.launchInfo.save(docXml, null)) {
                return false;
            }

            xProperty.setName(this.C_NODE_RPT_HEADERS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(let _i = 0; _i < this.headers.count(); _i++) {
                sec = this.headers.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(this.C_NODE_RPT_DETAILS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(let _i = 0; _i < this.details.count(); _i++) {
                sec = this.details.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(this.C_NODE_RPT_FOOTERS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(let _i = 0; _i < this.footers.count(); _i++) {
                sec = this.footers.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(this.C_NODE_GROUPS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            let group: cReportGroup = null;

            for(let _i = 0; _i < this.groups.count(); _i++) {
                group = this.groups.item(_i);
                group.save(docXml, nodeObj);
            }

            xProperty.setName(this.C_NODE_RPT_FORMULAS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            let formula: cReportFormula = null;
            for(let _i = 0; _i < this.formulas.count(); _i++) {
                formula = this.formulas.item(_i);
                if (!formula.getNotSave()) {
                    formula.save(docXml, nodeObj);
                }
            }

            xProperty.setName(this.C_NODE_PAPER_INFO);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);
            this.paperInfo.save(docXml, nodeObj);

            if (! docXml.save()) {
                return false;
            }

            if (! docXml.openXml()) {
                return false;
            }

            if (! this.nLoad(docXml)) {
                return false;
            }

            return true;
        }

        public loadSilentData(fileName: string) {
            let docXml = new cXml();

            this.path = cFile.getPath(fileName);
            this.name = cFile.getFileName(fileName);

            docXml.init();
            docXml.setFilter(this.C_FILE_DATA_EX);
            docXml.setName(this.name);
            docXml.setPath(this.path);

            if (!docXml.openXml()) {
                return false;
            }

            this.path = docXml.getPath();
            this.name = docXml.getName();

            let property: cXmlProperty = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
            this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

            return this.nLoadData(docXml);
        }

        public loadData(commDialog: object) {
            let docXml: cXml = new cXml();

            docXml.init();
            docXml.setFilter(this.C_FILE_DATA_EX);
            docXml.setName(this.name);
            docXml.setPath(this.path);

            if (!docXml.openXmlWithDialog()) {
                return false;
            }

            this.path = docXml.getPath();
            this.name = docXml.getName();
            let property: cXmlProperty = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
            this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

            return this.nLoadData(docXml);
        }

        public saveData(commDialog: object, withDialog: boolean) {
            let docXml: cXml = new cXml();

            docXml.init();
            docXml.setFilter(this.C_FILE_DATA_EX);
            docXml.setName(this.getFileName(this.name) + "-data.csd");
            docXml.setPath(this.path);

            if (withDialog) {
                if (!docXml.newXmlWithDialog()) {
                    return false;
                }
            }
            else {
                if (!docXml.newXml()) {
                    return false;
                }
            }

            let mouse: CMouseWait = new CMouseWait();

            let dataName = docXml.getName();
            let dataPath = docXml.getPath();

            let xProperty: cXmlProperty = new cXmlProperty();

            xProperty.setName("RptName");
            xProperty.setValue(eTypes.eText, dataName);
            docXml.addProperty(xProperty);

            // page settings
            //

            xProperty.setName(this.C_NODE_RPT_PAGES);
            xProperty.setValue(eTypes.eText, "");
            let nodeObj = docXml.addNode(xProperty);

            for(let _i = 0; _i < this.pages.count(); _i++) {
                let page = this.pages.item(_i);
                page.save(docXml, nodeObj);
                if (! this.saveDataForWeb(page, dataName, dataPath)) {
                    return false;
                }
            }

            if (! docXml.save()) {
                return false;
            }

            if (! docXml.openXml()) {
                return false;
            }

            if (! this.nLoadData(docXml)) {
                return false;
            }

            mouse.dispose();

            return true;
        }

        private saveDataForWeb(page: cReportPage, dataName: string, dataPath: string) {
            let docXml: cXml = new cXml();

            docXml.init();
            docXml.setFilter("xml");
            docXml.setName(this.getFileName(dataName) + "-1.xml");
            docXml.setPath(dataPath);

            if (!docXml.newXml()) {
                return false;
            }

            dataName = docXml.getName();

            let xProperty: cXmlProperty = new cXmlProperty();

            xProperty.setName("Page_" + page.getPageNumber().toString());
            xProperty.setValue(eTypes.eText, dataName);
            docXml.addProperty(xProperty);

            xProperty.setName("Page");
            xProperty.setValue(eTypes.eText, "");
            let nodeObj = docXml.addNode(xProperty);

            page.saveForWeb(docXml, nodeObj);

            return docXml.save();
        }

        public getValueFromRs(colIndex: number): any {
            return this.table.rows[this.vRowsIndex[this.iRow2]][colIndex];
        }

        public getValueString(controlName: string) {
            let value = this.getValue(controlName, false);
            if (value === null) {
                return "";
            }
            else {
                return value.toString();
            }
        }

        public getValue(controlName: string, notFormat: boolean = false) {
            let ctrl: cReportControl = null;
            let found: boolean = false;
            let iRow: number = 0;

            if (this.iRowFormula > this.lastRowIndex) {
                iRow = this.lastRowIndex;
            }
            else {
                iRow = this.iRowFormula;
            }

            for(let _i = 0; _i < this.controls.count(); _i++) {
                ctrl = this.controls.item(_i);
                if (ctrl.getName().toUpperCase() === controlName.toUpperCase()) {
                    found = true;
                    break;
                }
            }

            if (! found) {
                throw new ReportException(csRptErrors.CONTROL_NOT_FOUND,
                                          cReportError.errGetDescription(csRptErrors.CONTROL_NOT_FOUND, [controlName])
                                          );
            }

            switch (ctrl.getControlType()) {
                
                case csRptControlType.CS_RPT_CT_FIELD:

                    // this indexes 
                    // current datasource
                    //
                    let indexRows: number = 0;
                    // current row in the active datasource
                    //
                    let indexRow: number = 0;
                    let indexField: number = 0;

                    // the datasource index have an offset of 1000 between each other
                    //
                    indexRows = (ctrl.getField().getIndex() / 1000);
                    indexField = ctrl.getField().getIndex() - (indexRows * 1000);

                    if (indexRows === 0) {
                        indexRow = this.vRowsIndex[iRow];
                    }
                    else {
                        indexRow = this.vRowsIndexAux[indexRows];
                    }

                    if (this.tables[indexRows] !== null) {
                        // it looks ugly, dont think you?
                        //
                        // maybe this help a litle:
                        //
                        //    this.vCollRows(IndexRows)    a matrix with the data 
                        //                              contained in the datasource
                        //                              referd by this control
                        //
                        //    (IndexField, IndexRow)    a cell in this matrix
                        //
                        let value: object = this.tables[indexRows].rows[indexRow][indexField];
                        if (ctrl.getLabel().getAspect().getFormat() !== "" && notFormat === false) {
                            return ReportGlobals.format(
                                        ReportGlobals.valVariant(value),
                                        ctrl.getLabel().getAspect().getFormat());

                            // this is the same
                        }
                        else {
                            return ReportGlobals.valVariant(value);
                        }
                    }
                    else {
                        return null;
                    }

                case csRptControlType.CS_RPT_CT_LABEL:
                case csRptControlType.CS_RPT_CT_IMAGE:
                    if (ctrl.getHasFormulaValue()) {
                        if (ctrl.getFormulaValue().getHaveToEval()) {
                            let value: object|string = this.compiler.resultFunction(ctrl.getFormulaValue());
                            if (ctrl.getLabel().getAspect().getFormat() !== "" && notFormat === false) {
                                return ReportGlobals.format(value, ctrl.getLabel().getAspect().getFormat());
                            }
                            else {
                                return value;
                            }
                        }
                        else {
                            let value: object = ctrl.getFormulaValue().getLastResult();
                            if (ctrl.getLabel().getAspect().getFormat() !== "" && notFormat === false) {
                                return ReportGlobals.format(value, ctrl.getLabel().getAspect().getFormat());
                            }
                            else {
                                return value;
                            }
                        }
                    }
                    else {
                        return ctrl.getLabel().getText();
                    }
                default:
                    return null;
            }
        }

        private initControls(recordSets: [object|string[]]) {
            let ctrl: cReportControl = null;
            let sequence: cReportChartSequence = null;
            let idx = new RefWrapper(0);

            for(let _i = 0; _i < this.controls.count(); _i++) {
                ctrl = this.controls.item(_i);
                if (ctrl.getControlType() === csRptControlType.CS_RPT_CT_FIELD
                    || ctrl.getControlType() === csRptControlType.CS_RPT_CT_DB_IMAGE) {
                    idx.set(ctrl.getField().getIndex());
                    if (! this.initControlAux(ctrl, idx, recordSets, ctrl.getField().getName())) {
                        return false;
                    }
                    ctrl.getField().setIndex(idx.get());
                }
                else if (ctrl.getControlType() === csRptControlType.CS_RPT_CT_CHART) {
                    if (ctrl.getChart().getGroupFieldName() !== "") {
                        idx.set(-1);
                        this.initControlAux(ctrl, idx, recordSets, ctrl.getChart().getGroupFieldName());
                        ctrl.getChart().setGroupFieldIndex(idx.get());
                    }
                    else {
                        ctrl.getChart().setGroupFieldIndex(-1);
                    }

                    for(let _j = 0; _j < ctrl.getChart().getSeries().count(); _j++) {
                        sequence = ctrl.getChart().getSeries().item(_j);
                        idx.set(sequence.getValueIndex());
                        if (! this.initControlAux(ctrl, idx, recordSets, sequence.getValueFieldName())) {
                            return false;
                        }
                        sequence.setValueIndex(idx.get());
                        idx.set(sequence.getLabelIndex());
                        if (! this.initControlAux(ctrl, idx, recordSets, sequence.getLabelFieldName())) {
                            return false;
                        }
                        sequence.setLabelIndex(idx.get());
                    }
                    ctrl.getChart().setChartCreated(false);
                }
            }
            return true;
        }

        private compareColumnName(columnName: string, fieldName: string) {
            if (columnName === fieldName) {
                return true;
            }
            else {
                return columnName === fieldName
                    .replace(" ", "_").replace(".","");
            }
        }

        private initControlAux(ctrl: cReportControl, idx: RefWrapper<number>, recordSets: [object|string[]], fieldName: string) {
            let found: boolean = false;
            let j: number = 0;
            let bIsDBImage: boolean = false;

            let dataSource: string = this.pGetDataSource(fieldName);

            // index of the group which contains the control
            //
            let k: number = 0;

            for(let _i = 0; _i < recordSets.length; _i++) {
                let varRs: object|string[] = recordSets[_i];
                let rsDataSource: string = varRs[1].toString();
                if (rsDataSource.toUpperCase() === dataSource.toUpperCase() || dataSource === "") {
                    let rs: DataTable = varRs[0] as DataTable;

                    for (j = 0; j < rs.columns.length; j++) {
                        if (this.compareColumnName(
                                    rs.columns[j].getName().toUpperCase(),
                                    ReportGlobals.getRealName(fieldName).toUpperCase())) {
                            //
                            // TODO: we need to check what is the value of rs.Columns[j].DataType
                            //       when the column contains a binary field (typically used for images)
                            //
                            let typeCode = rs.columns[j].getDataType();
                            bIsDBImage = typeCode === DataType.dbImage;
                            found = true;
                            break;
                        }
                    }
                }
                if (found) {
                    break;
                }
                k = k + 1000;
            }

            if (found) {
                idx.set(j + k);
                if (bIsDBImage) {
                    ctrl.setControlType(csRptControlType.CS_RPT_CT_DB_IMAGE);
                }
            }
            else {
                throw new ReportException(
                    csRptErrors.FIELD_NOT_FOUND,
                    cReportError.errGetDescription(
                        csRptErrors.FIELD_NOT_FOUND,
                        [ctrl.getName(), fieldName]));
            }
            return true;
        }

        private pGetDataSource(name: string) {
            let n: number = name.indexOf("}.", 0);
            if (n === -1) {
                return "";
            }
            else {
                n = n - 1;
                return name.substring(1, n);
            }
        }

        private pInitImages() {
            this.pDestroyImages();
            this.images = new Map<Bitmap>();
        }

        private pDestroyImages() {
            if (this.images !== null) {
                this.images.forEachValue((image) => image.dispose());
                this.images = null;
            }
        }

        private pGetChartImage(indexRows: number, indexField: number, indexRow: number, ctrl: cReportControl) {
            if (ctrl.getChart().getChartCreated()) {
                return ctrl.getChart().getImage();
            }
            else {
                if (ctrl.getChart().make(
                        this.tables[indexRows].rows,
                        ctrl.getLabel().getAspect().getFormat(),
                        false, "")) {
                    return ctrl.getChart().getImage();
                }
                else {
                    return null;
                }
            }
        }

        // the params are used to create a key 
        // to use as an id for every image contained 
        // in the report
        //
        private pGetImage(indexRows: number, indexField: number, indexRow: number) {
            let image: any;
            let key = "k" + indexRows.toString() + indexField.toString() + indexRow.toString();
            if(this.images.containsKey(key)) {
                image = this.images[key];
            }
            else {
                let base64 = this.tables[indexRows].rows[indexRow][indexField];
                // TODO: validate the image is valid
                // probably we will need to put the image in a Image object
                // using
                //    image = new Image()
                // and then
                //    image.src = "data:image/png;base64," + base64;
                this.images.add(key, image);
            }
            return image;
        }

        /**

        https://stackoverflow.com/questions/21227078/convert-base64-to-image-in-javascript-jquery

        var image = new Image();
        image.src = 'data:image/png;base64,iVBORw0K...';
        document.body.appendChild(image);

        function base64toBlob(base64Data, contentType) {
            contentType = contentType || '';
            var sliceSize = 1024;
            var byteCharacters = atob(base64Data);
            var bytesLength = byteCharacters.length;
            var slicesCount = Math.ceil(bytesLength / sliceSize);
            var byteArrays = new Array(slicesCount);

            for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
                var begin = sliceIndex * sliceSize;
                var end = Math.min(begin + sliceSize, bytesLength);

                var bytes = new Array(end - begin);
                for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
                    bytes[i] = byteCharacters[offset].charCodeAt(0);
                }
                byteArrays[sliceIndex] = new Uint8Array(bytes);
            }
            return new Blob(byteArrays, { type: contentType });
        }
        */

        public setLaunchInfo(oLaunchInfo: cReportLaunchInfo) {
            this.launchInfo = new cReportLaunchInfo();
            // copy from oLaunchInfo to this.LaunchInfo
            //
            this.launchInfo.setAction(oLaunchInfo.getAction());
            this.launchInfo.setStrConnect(oLaunchInfo.getStrConnect());
            this.launchInfo.setCopies(oLaunchInfo.getCopies());

            this.launchInfo.setObjPaint(oLaunchInfo.getObjPaint());
            this.launchInfo.setDataSource(oLaunchInfo.getDataSource());

            this.launchInfo.setFile(oLaunchInfo.getFile());
            this.launchInfo.setFileFormat(oLaunchInfo.getFileFormat());
            this.launchInfo.setInternalPreview(oLaunchInfo.getInternalPreview());
            this.launchInfo.setShowPrintersDialog(oLaunchInfo.getShowPrintersDialog());
            this.launchInfo.setSilent(oLaunchInfo.getSilent());
            this.launchInfo.setSqlstmt(oLaunchInfo.getSqlstmt());
            this.launchInfo.setPrinter(oLaunchInfo.getPrinter());

            // if the printer is not defined
            //
            if (this.launchInfo.getPrinter() === null) {
                // we use the default printer of the OS
                //
                this.launchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(null));
            }

            // if we have a reference to a printer
            //
            if (this.launchInfo.getPrinter() !== null) {
                // TODO: check the values of paperType after calling
                //       getcPrinterFromDefaultPrinter() because
                //       the constants used by the OS could be differents
                //       from the used by CSReport. in the original vb6 version
                //       it was the case
                //

                // finally we copy into this.PaperInfo the definition found in launchInfo.
                //
                // when the report is called without define a printer
                // whe assign a default printer and assign this.PaperInfo
                // to this.LaunchInfo.Printer.PaperInfo, so sometimes we
                // don't need to do that
                //
                if (! Object.is(this.paperInfo, this.launchInfo.getPrinter().getPaperInfo())) {
                    this.paperInfo.setHeight(this.launchInfo.getPrinter().getPaperInfo().getHeight());
                    this.paperInfo.setWidth(this.launchInfo.getPrinter().getPaperInfo().getWidth());
                }
            }
        }

        public getGroupTotal(colIndex: number, indexGroup: number) {
            let total: number = 0;

            if (indexGroup === -1) {
                for (let i = 0; i < this.recordCount; i++) {
                    total = total + (ReportGlobals.valVariant(
                                    this.table.rows[this.vRowsIndex[i]][colIndex]) as number);
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    for (let i = 0; i < this.recordCount; i++) {
                        total = total + (ReportGlobals.valVariant(
                                        this.table.rows[this.vRowsIndex[i]][colIndex]) as number);
                    }
                }
                else {
                    for (let i = this.iRow; i < this.recordCount; i++) {
                        for (let j = 0; j < indexGroup; j++) {
                            switch (this.vGroups[j].comparisonType)
                            {
                                case RptGrpComparisonType.CS_RPT_GRP_TEXT:

                                    if (this.vGroups[j].value === null) {
                                        return total;
                                    }
                                    else  {
                                        let value = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let text: string = ReportGlobals.valVariant(value) as string;
                                        if (this.vGroups[j].value !== text.toLowerCase()) {
                                            return total;
                                        }
                                    }

                                    if (j === indexGroup) {
                                        let value = this.table.rows[colIndex][this.vRowsIndex[i]];
                                        total = total + (ReportGlobals.valVariant(value) as number);
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:

                                    if (this.vGroups[j].value === null) {
                                        return total;
                                    }
                                    else {
                                        let value = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let number: number = Utils.val(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== number) {
                                            return total;
                                        }
                                    }

                                    if (j === indexGroup) {
                                        let value = this.table.rows[this.vRowsIndex[i]][colIndex];
                                        total = total + (ReportGlobals.valVariant(value) as number);
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_DATE:

                                    if (this.vGroups[j].value === null) {
                                        return total;
                                    }
                                    else {
                                        let value = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let date: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== date) {
                                            return total;
                                        }
                                    }

                                    if (j === indexGroup) {
                                        let value = this.table.rows[this.vRowsIndex[i]][colIndex];
                                        total = total + (ReportGlobals.valVariant(value) as number);
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return total;
        }

        public getGroupMax(colIndex: number, indexGroup: number) {
            let max: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[0]][colIndex]) as number;

            if (indexGroup === -1) {
                for (let i = 0; i < this.recordCount; i++) {
                    let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                    if (max < value) {
                        max = value;
                    }
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    for (let i = 0; i < this.recordCount; i++) {
                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                        if (max < value) {
                            max = value;
                        }
                    }
                }
                else {
                    for (let i = this.iRow; i < this.recordCount; i++) {
                        for (let j = 0; j < indexGroup; j++) {
                            switch (this.vGroups[j].comparisonType)
                            {
                                case RptGrpComparisonType.CS_RPT_GRP_TEXT:

                                    if (this.vGroups[j].value === null) {
                                        return max;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let text: string = ReportGlobals.valVariant(value) as string;
                                        if (this.vGroups[j].value !== text.toLowerCase()) {
                                            return max;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                                        if (max < value) {
                                            max = value;
                                        }
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:

                                    if (this.vGroups[j].value === null) {
                                        return max;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let number: number = Utils.val(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== number) {
                                            return max;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                                        if (max < value) {
                                            max = value;
                                        }
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_DATE:

                                    if (this.vGroups[j].value === null) {
                                        return max;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let date: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== date) {
                                            return max;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                                        if (max < value) {
                                            max = value;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return max;
        }

        public getGroupMin(colIndex: number, indexGroup: number) {
            let min: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[0]][colIndex]) as number;

            if (indexGroup === -1) {
                for (let i = 0; i < this.recordCount; i++) {
                    let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                    if (min > value) {
                        min = value;
                    }
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    for (let i = 0; i < this.recordCount; i++) {
                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                        if (min > value) {
                            min = value;
                        }
                    }
                }
                else {
                    for (let i = this.iRow; i < this.recordCount; i++) {
                        for (let j = 0; j < indexGroup; j++) {
                            switch (this.vGroups[j].comparisonType)
                            {
                                case RptGrpComparisonType.CS_RPT_GRP_TEXT:

                                    if (this.vGroups[j].value === null) {
                                        return min;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let text: string = ReportGlobals.valVariant(value) as string;
                                        if (this.vGroups[j].value !== text.toLowerCase()) {
                                            return min;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                                        if (min > value) {
                                            min = value;
                                        }
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:

                                    if (this.vGroups[j].value === null) {
                                        return min;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let number: number = Utils.val(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== number) {
                                            return min;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                                        if (min > value) {
                                            min = value;
                                        }
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_DATE:

                                    if (this.vGroups[j].value === null) {
                                        return min;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let date: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== date) {
                                            return min;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        let value: number = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number;
                                        if (min > value) {
                                            min = value;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return min;
        }

        public getGroupAverage(colIndex: number, indexGroup: number) {
            let total: number = 0;
            let count: number = 0;

            if (indexGroup === -1) {
                for (let i = 0; i < this.recordCount; i++) {
                    total = total + (ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number);
                    count = count + 1;
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {

                    for (let i = 0; i < this.recordCount; i++) {
                        total = total + (ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number);
                        count = count + 1;
                    }

                }
                else {
                    for (let i = this.iRow; i < this.recordCount; i++) {
                        for (let j = 0; j < indexGroup; j++) {
                            switch (this.vGroups[j].comparisonType)
                            {
                                case RptGrpComparisonType.CS_RPT_GRP_TEXT:

                                    if (this.vGroups[j].value === null) {
                                        return total;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let text: string = ReportGlobals.valVariant(value) as string;
                                        if (this.vGroups[j].value !== text.toLowerCase()) {
                                            return total;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        total = total + (ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number);
                                        count = count + 1;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:

                                    if (this.vGroups[j].value === null) {
                                        return total;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let number: number = Utils.val(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== number) {
                                            return total;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        total = total + (ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number);
                                        count = count + 1;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_DATE:

                                    if (this.vGroups[j].value === null) {
                                        return total;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let date: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== date) {
                                            return total;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        total = total + (ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[i]][colIndex]) as number);
                                        count = count + 1;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return Utils.divideByZero(total, count);
        }

        public getGroupLineNumber(indexGroup: number) {
            if (indexGroup === -1) {
                return this.lineNumber;
            }
            else {
                return this.vGroups[indexGroup].lineNumber;
            }
        }

        public getGroupCount(colIndex: number, indexGroup: number) {
            let count: number = 0;

            if (indexGroup === -1) {
                count = this.recordCount;
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    count = this.recordCount;
                }
                else {
                    for (let i = this.iRow; i < this.recordCount; i++) {
                        for (let j = 0; j < indexGroup; j++) {
                            switch (this.vGroups[j].comparisonType)
                            {
                                case RptGrpComparisonType.CS_RPT_GRP_TEXT:

                                    if (this.vGroups[j].value === null) {
                                        return count;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let text: string = ReportGlobals.valVariant(value) as string;
                                        if (this.vGroups[j].value !== text.toLowerCase()) {
                                            return count;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        count = count + 1;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:

                                    if (this.vGroups[j].value === null) {
                                        return count;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let number: number = Utils.val(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== number) {
                                            return count;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        count = count + 1;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_DATE:

                                    if (this.vGroups[j].value === null) {
                                        return count;
                                    }
                                    else {
                                        let value: object = this.table.rows[this.vRowsIndex[i]][this.vGroups[j].indexField];
                                        let date: Date = ReportGlobals.dateValue(ReportGlobals.valVariant(value));
                                        if (this.vGroups[j].value !== date) {
                                            return count;
                                        }
                                    }
                                    if (j === indexGroup) {
                                        count = count + 1;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return count;
        }

        private addGroup(i: number, j: number, value: object) {
            // set the upper bound of the last group
            //
            this.vGroups[i + 1].groups[this.vGroups[i + 1].groups.length - 1].last = j - 1;
            // add a new group
            //
            this.vGroups[i + 1].groups.push({first: j, last: null});
            this.vGroups[i + 1].value = value;
        }

        private initGroups(rs: DataTable, mainDataSource: string) {
            this.groupCount = this.groups.count();
            this.firstGroup = true;

            if (this.groupCount === 0 || this.table === null) {
                this.vGroups = null;
                return true;
            }
            else {
                this.vGroups = new T_Groups[this.groupCount];
                for (let t = 0; t < this.groupCount; t++) {
                    this.vGroups[t] = new T_Groups();
                }
            }

            if (!this.progress("Sorting report", 0, 0, 0)) {
                return false;
            }

            let k: number = 0;
            let i: number = 0;
            let j: number = 0;
            let found: boolean = false;
            let fieldName: string = "";
            let dataSource: string = "";

            // we need to check every group is in the main recordset
            //
            for (i = 0; i < this.groupCount; i++) {
                this.vGroups[i].value = null;
                found = false;
                fieldName = this.groups.item(i).getFieldName();
                dataSource = this.pGetDataSource(fieldName).toUpperCase();
                fieldName = ReportGlobals.getRealName(fieldName).toUpperCase();

                // the column must be in the main recordset
                //
                if (mainDataSource.toUpperCase() !== dataSource && dataSource !== "") {
                    let w_item: cReportGroup = this.groups.item(i);
                    throw new ReportException(csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS,
                                                cReportError.errGetDescription(
                                                                csRptErrors.GROUP_NOT_FOUND,
                                                                [w_item.getName(), w_item.getFieldName()]));
                }
                this.vGroups[i].grandTotalGroup = this.groups.item(i).getGrandTotalGroup();

                if (!this.vGroups[i].grandTotalGroup) {
                    for (j = 0; j < rs.columns.length; j++) {
                        if (this.compareColumnName(rs.columns[j].getName().toUpperCase(), fieldName)) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        this.vGroups[i].indexField = j;
                    }
                    else {
                        let w_item: cReportGroup = this.groups.item(i);
                        throw new ReportException(csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS,
                                                    cReportError.errGetDescription(
                                                                    csRptErrors.GROUP_NOT_FOUND,
                                                                    [w_item.getName(), w_item.getFieldName()]));
                    }
                }
                this.vGroups[i].comparisonType = this.groups.item(i).getComparisonType();
                this.vGroups[i].oderType = this.groups.item(i).getOderType();

                this.vGroups[i].groups = new T_Group[1];
                this.vGroups[i].groups[0] = new T_Group();
            }

            let recordCount: number;
            let q: number = 0;

            this.vGroups[0].groups = new T_Group[1];
            this.vGroups[0].groups[0] = new T_Group();
            recordCount = this.vRowsIndex.length;
            this.vGroups[0].groups[0].first = 0;
            this.vGroups[0].groups[0].last = recordCount-1;
            recordCount = this.groupCount * recordCount;

            // we need to sort the data
            //
            for (i = 0; i < this.groupCount; i++) {
                for (j = 0; j < this.vGroups[i].groups.length; j++) {
                    if (!this.vGroups[i].grandTotalGroup) {
                        if (this.vGroups[i].oderType === RptGrpOrderType.CS_RPT_GRP_ASC) {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case RptGrpComparisonType.CS_RPT_GRP_TEXT:
                                    if (! this.orderTextAsc(this.vGroups[i].groups[j].first,
                                                            this.vGroups[i].groups[j].last,
                                                            this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:
                                    if (! this.orderNumberAsc(this.vGroups[i].groups[j].first,
                                                              this.vGroups[i].groups[j].last,
                                                              this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_DATE:
                                    if (! this.orderDateAsc(this.vGroups[i].groups[j].first,
                                                            this.vGroups[i].groups[j].last,
                                                            this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;
                            }
                        }
                        else {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case RptGrpComparisonType.CS_RPT_GRP_TEXT:
                                    if (! this.orderTextDesc(this.vGroups[i].groups[j].first,
                                                             this.vGroups[i].groups[j].last,
                                                             this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_NUMBER:
                                    if (! this.orderNumberDesc(this.vGroups[i].groups[j].first,
                                                               this.vGroups[i].groups[j].last,
                                                               this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case RptGrpComparisonType.CS_RPT_GRP_DATE:
                                    if (! this.orderDateDesc(this.vGroups[i].groups[j].first,
                                                             this.vGroups[i].groups[j].last,
                                                             this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;
                            }
                        }
                    }
                }

                // after sorting we need to prepare the next group
                //
                if (i < this.groupCount - 1) {
                    for (k = 0; k < this.vGroups[i].groups.length; k++) {
                        // if it is a total group the next group
                        // is from the first to the last row in 
                        // the main recordset
                        //
                        // first (position: 0)
                        // last  (position: this.vGroups[0].groups[0].last)
                        //
                        if (this.vGroups[i].grandTotalGroup) {
                            let t: number = i + 1;
                            let r: number = this.vGroups[t].groups.length - 1;
                            this.vGroups[t].groups[r].last = -1;

                            // add a group item
                            //
                            this.vGroups[t].groups.push({
                                first: 0,
                                last: this.vGroups[0].groups[0].last
                            });
                            this.vGroups[t].value = null;
                        }
                        else {
                            for (j = this.vGroups[i].groups[k].first; j <= this.vGroups[i].groups[k].last; j++) {
                                q = q + 1;
                                if (!this.progress("", 0, q, recordCount)) {
                                    return false;
                                }

                                let value: object = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[j]][this.vGroups[i].indexField]) as object;
                                if (this.vGroups[i + 1].value === null) {
                                    this.addGroup(i, j, value);
                                }
                                else {
                                    switch (this.vGroups[i].comparisonType)
                                    {
                                        case RptGrpComparisonType.CS_RPT_GRP_TEXT:

                                            let text1: string = this.vGroups[i + 1].value.toString();
                                            let text2: string = value.toString();
                                            if (text1.toLowerCase() !== text2.toLowerCase()) {
                                                this.addGroup(i, j, value);
                                            }
                                            break;

                                        case RptGrpComparisonType.CS_RPT_GRP_NUMBER:

                                            let number1: number = Utils.val(this.vGroups[i + 1].value);
                                            let number2: number = Utils.val(value);
                                            if (number1 !== number2) {
                                                this.addGroup(i, j, value);
                                            }
                                            break;

                                        case RptGrpComparisonType.CS_RPT_GRP_DATE:

                                            let date1: Date = this.vGroups[i + 1].value as Date;
                                            let date2: Date = value as Date;
                                            if (date1 !== date2) {
                                                this.addGroup(i, j, value);
                                            }
                                            break;
                                    }
                                }
                            }
                            this.vGroups[i + 1].groups[this.vGroups[i + 1].groups.length - 1].last = j - 1;
                            this.vGroups[i + 1].value = null;
                        }
                    }
                }
            }
            return true;
        }

        private estimateLoops(n: number) {
            for(let q = n - 1; q > 0; q--) {
                n = n + q;
            }
            return n;
        }

        private orderNumberAsc(first: number, last: number, orderBy: number) {
            let i: number = 0;
            let j: number = 0;
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = this.estimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let value1: number = Utils.val(this.table.rows[this.vRowsIndex[j]][orderBy]);
                    let value2: number = Utils.val(this.table.rows[this.vRowsIndex[j - 1]][orderBy]);
                    if (value1 < value2) {
                        if (!this.progress("", 0, q, t))  {
                            return false; 
                        }
                        this.changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!this.progress("", 0, q, t))  {
                    return false; 
                }
                if (!bChanged)  {
                    break; 
                }
            }
            return true;
        }

        private orderNumberDesc(first: number, last: number, orderBy: number) {
            let i: number = 0;
            let j: number = 0;
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = this.estimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let number1: number = Utils.val(this.table.rows[this.vRowsIndex[j]][orderBy]);
                    let number2: number = Utils.val(this.table.rows[this.vRowsIndex[j - 1]][orderBy]);
                    if (number1 > number2) {
                        if (!this.progress("", 0, q, t)) {
                            return false;
                        }
                        this.changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!this.progress("", 0, q, t)) {
                    return false;
                }
                if (!bChanged) {
                    break;
                }
            }
            return true;
        }

        private orderTextAsc(first: number, last: number, orderBy: number) {
            let j: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            let t = this.estimateLoops(last - first);
            for (let i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let text1: string = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[j]][orderBy]).toString();
                    let text2: string = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[j - 1]][orderBy]).toString();
                    if (text1.toLowerCase().localeCompare(text2.toLowerCase()) < 0) {
                        if (! this.progress("", 0, q, t))  {
                            return false; 
                        }
                        this.changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (! this.progress("", 0, q, t))  {
                    return false; 
                }
                if (! bChanged)  {
                    break; 
                }
            }
            return true;
        }

        private orderTextDesc(first: number, last: number, orderBy: number) {
            let j: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            let t = this.estimateLoops(last - first);
            for (let i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let text1: string = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[j]][orderBy]).toString();
                    let text2: string = ReportGlobals.valVariant(this.table.rows[this.vRowsIndex[j - 1]][orderBy]).toString();
                    if (text1.toLowerCase().localeCompare(text2.toLowerCase()) > 0) {
                        if (! this.progress("", 0, q, t)) {
                            return false;
                        }
                        this.changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!this.progress("", 0, q, t)) {
                    return false;
                }
                if (!bChanged) {
                    break;
                }
            }
            return true;
        }

        private changeRow(i: number, j: number) {
            let q: number = this.vRowsIndex[j];
            this.vRowsIndex[j] = this.vRowsIndex[i];
            this.vRowsIndex[i] = q;
        }

        private evalFunctions(idxGroup: number, whenEval: csRptWhenEval) {
            let formula: cReportFormula = null;
            let bHaveToEvalRow: boolean = false;
            let idxRowEvaluated: number = 0;
            let recordCount: number = 0;

            if (this.table !== null) {
                recordCount = this.vRowsIndex.length;
            }

            // if the row to be evaluated is valid
            //
            if (this.iRowFormula < recordCount) {
                switch (idxGroup)
                {
                    case this.C_IDX_GROUP_HEADER:
                    case this.C_IDX_GROUP_REPORT_HEADER:
                        idxRowEvaluated = this.C_IDX_H_LAST_ROW_EVALUATED;
                        break;

                    case this.C_IDX_GROUP_DETAIL:
                        idxRowEvaluated = this.C_IDX_D_LAST_ROW_EVALUATED;
                        break;

                    case this.C_IDX_GROUP_FOOTER:
                    case this.C_IDX_GROUP_REPORT_FOOTER:
                        idxRowEvaluated = this.C_IDX_F_LAST_ROW_EVALUATED;
                        break;

                    // groups headers o footers
                    default:
                        idxRowEvaluated = this.C_IDX_G_LAST_ROW_EVALUATED;
                        break;
                }

                // evaluate functions before printing
                //
                if (whenEval === csRptWhenEval.CS_RPT_EVAL_PRE) {
                    if (idxRowEvaluated === this.C_IDX_G_LAST_ROW_EVALUATED) {
                        // if it is a footer
                        //
                        if (idxGroup < 0) {
                            bHaveToEvalRow = this.vGroups[(idxGroup * -1) - 1].lastFPreRowEvaluated < this.iRowFormula;
                        }
                        else {
                            bHaveToEvalRow = this.vGroups[idxGroup - 1].lastHPreRowEvaluated < this.iRowFormula;
                        }
                    }
                    else {
                        bHaveToEvalRow = this.lastRowPreEvaluated[idxRowEvaluated] < this.iRowFormula;
                    }

                }
                // evaluate function after printing
                //
                else {
                    if (idxRowEvaluated === this.C_IDX_G_LAST_ROW_EVALUATED) {
                        // if it is a footer
                        //
                        if (idxGroup < 0) {
                            bHaveToEvalRow = this.vGroups[(idxGroup * -1) - 1].lastFPostRowEvaluated < this.iRowFormula;
                        }
                        else {
                            bHaveToEvalRow = this.vGroups[idxGroup - 1].lastHPostRowEvaluated < this.iRowFormula;
                        }
                    }
                    else {
                        bHaveToEvalRow = this.lastRowPostEvaluated[idxRowEvaluated] < this.iRowFormula;
                    }
                }

                // if we need to evaluate
                //
                if (bHaveToEvalRow) {
                    for(let _i = 0; _i < this.formulas.count(); _i++) {
                        formula = this.formulas.item(_i);
                        if (formula.getWhenEval() === whenEval
                            && (idxGroup === formula.getIdxGroup()
                                    || formula.getIdxGroup2() === idxGroup)) {
                            formula.setHaveToEval(true);
                        }
                    }
                    for(let _i = 0; _i < this.formulas.count(); _i++) {
                        formula = this.formulas.item(_i);
                        if (formula.getWhenEval() === whenEval
                            && (idxGroup === formula.getIdxGroup()
                                || formula.getIdxGroup2() === idxGroup)) {
                            if (formula.getIdxGroup2() === idxGroup) {
                                this.compiler.evalFunctionGroup(formula);
                            }
                            else {
                                this.compiler.evalFunction(formula);
                            }
                        }
                    }

                    // update the last evaluated row
                    //

                    // evaluate before printing
                    //
                    if (whenEval === csRptWhenEval.CS_RPT_EVAL_PRE) {
                        if (idxRowEvaluated === this.C_IDX_G_LAST_ROW_EVALUATED) {
                            // if it is a footer
                            //
                            if (idxGroup < 0) {
                                this.vGroups[(idxGroup * -1) - 1].lastFPreRowEvaluated = this.iRowFormula;
                            }
                            else {
                                this.vGroups[idxGroup - 1].lastHPreRowEvaluated = this.iRowFormula;
                            }
                        }
                        else {
                            this.lastRowPreEvaluated[idxRowEvaluated] = this.iRowFormula;
                        }
                    }
                    // evaluate after printing
                    //
                    else {
                        if (idxRowEvaluated === this.C_IDX_G_LAST_ROW_EVALUATED) {
                            // if it is a footer
                            //
                            if (idxGroup < 0) {
                                this.vGroups[(idxGroup * -1) - 1].lastFPostRowEvaluated = this.iRowFormula;
                            }
                            else {
                                this.vGroups[idxGroup - 1].lastHPostRowEvaluated = this.iRowFormula;
                            }
                        }
                        else {
                            this.lastRowPostEvaluated[idxRowEvaluated] = this.iRowFormula;
                        }
                    }
                }
            }
            return true;
        }

        // all the formulas which are in headers are compile
        // only one time for page. to do this we set the idxGroup
        // of the formula to -2000
        //
        private pSetGroupFormulaHeaders() {
            this.pSetGroupFormulaHF(this.headers, this.C_IDX_GROUP_HEADER);

            // the main header is -2000
            //
            if (this.headers.item(0).getHasFormulaHide()) {
                this.headers.item(0).getFormulaHide().setIdxGroup(this.C_IDX_GROUP_REPORT_HEADER);
            }

            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(let _i = 0; _i < this.headers.item(0).getSectionLines().count(); _i++) {
                secLn = this.headers.item(0).getSectionLines().item(_i);
                for(let _j = 0; _j < secLn.getControls().count(); _j++) {
                    ctrl = secLn.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        ctrl.getFormulaHide().setIdxGroup(this.C_IDX_GROUP_REPORT_HEADER);
                    }
                    if (ctrl.getHasFormulaValue()) {
                        ctrl.getFormulaValue().setIdxGroup(this.C_IDX_GROUP_REPORT_HEADER);
                    }
                }
            }
        }

        private pSetGroupsInCtrlFormulaHide() {
            for(let _i = 0; _i < this.groups.count(); _i++) {
                let group: cReportGroup = this.groups.item(_i);
                this.pSetGroupsInCtrlFormulaHideAux(group.getHeader().getSectionLines(), group.getIndex());
                this.pSetGroupsInCtrlFormulaHideAux(group.getFooter().getSectionLines(), group.getIndex());
            }
        }

        private pSetGroupsInCtrlFormulaHideAux(scls: cReportSectionLines, idxGrop: number) {
            let scl: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(let _i = 0; _i < scls.count(); _i++) {
                scl = scls.item(_i);
                for(let _j = 0; _j < scl.getControls().count(); _j++) {
                    ctrl = scl.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        if (ctrl.getFormulaHide().getIdxGroup() === 0) {
                            ctrl.getFormulaHide().setIdxGroup(idxGrop);
                        }
                    }
                }
            }
        }

        private pSetGroupFormulaHF(sections: cReportSections, idxGroup: number) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(let _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    for(let _k = 0; _k < secLn.getControls().count(); _k++) {
                        ctrl = secLn.getControls().item(_k);
                        if (ctrl.getHasFormulaHide()) {
                            if (ctrl.getFormulaHide().getIdxGroup() === 0) {
                                ctrl.getFormulaHide().setIdxGroup(idxGroup);
                            }
                        }
                        if (ctrl.getHasFormulaValue()) {
                            if (ctrl.getFormulaValue().getIdxGroup() === 0) {
                                ctrl.getFormulaValue().setIdxGroup(idxGroup);
                            }
                        }
                    }
                }
            }
        }

        private compileReport() {
            let ctrl: cReportControl = null;

            for(let _i = 0; _i < this.controls.count(); _i++) {
                ctrl = this.controls.item(_i);
                if (ctrl.getHasFormulaHide()) {
                    if (!this.compiler.checkSyntax(ctrl.getFormulaHide()))  {
                        return false; 
                    }

                    // to have debug info
                    //
                    ctrl.getFormulaHide().setSectionName(ctrl.getSectionLine().getSectionName());
                    ctrl.getFormulaHide().setSectionLineIndex(ctrl.getSectionLine().getIndex());
                    ctrl.getFormulaHide().setControlName(ctrl.getName());

                    // add the formula to the formulas collection
                    //
                    this.addFormula(ctrl.getFormulaHide(), ctrl.getName() + "_" + "H");
                }
                if (ctrl.getHasFormulaValue()) {
                    if (!this.compiler.checkSyntax(ctrl.getFormulaValue()))  {
                        return false; 
                    }

                    // to have debug info
                    //
                    ctrl.getFormulaValue().setSectionName(ctrl.getSectionLine().getSectionName());
                    ctrl.getFormulaValue().setSectionLineIndex(ctrl.getSectionLine().getIndex());
                    ctrl.getFormulaValue().setControlName(ctrl.getName());

                    // add the formula to the formulas collection
                    //
                    this.addFormula(ctrl.getFormulaValue(), ctrl.getName() + "_" + "V");
                }
            }

            if (!this.pAddFormulasInSection(this.headers)) { return false; }
            if (!this.pAddFormulasInSection(this.groupsHeaders)) { return false; }
            if (!this.pAddFormulasInSection(this.groupsFooters)) { return false; }
            if (!this.pAddFormulasInSection(this.details)) { return false; }
            if (!this.pAddFormulasInSection(this.footers)) { return false; }

            let formula: cReportFormula = null;

            for(let _i = 0; _i < this.formulas.count(); _i++) {
                formula = this.formulas.item(_i);
                formula.setCompiledScript(null);
                this.compiler.initVariable(formula);
            }

            this.pSetIndexGroupInFormulaGroups(this.headers);
            this.pSetIndexGroupInFormulaGroups(this.groupsHeaders);
            this.pSetIndexGroupInFormulaGroups(this.groupsFooters);
            this.pSetIndexGroupInFormulaGroups(this.details);
            this.pSetIndexGroupInFormulaGroups(this.footers);

            this.compiler.clearVariables();

            return true;
        }

        private pSetIndexGroupInFormulaGroups(sections: cReportSections) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(let _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                if (sec.getHasFormulaHide()) {
                    this.pSetFormulaIndexGroup(sec.getFormulaHide(), sec);
                }
                for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    if (secLn.getHasFormulaHide()) {
                        this.pSetFormulaIndexGroup(secLn.getFormulaHide(), sec);
                    }
                    for(let _k = 0; _k < secLn.getControls().count(); _k++) {
                        ctrl = secLn.getControls().item(_k);
                        if (ctrl.getHasFormulaHide()) {
                            this.pSetFormulaIndexGroup(ctrl.getFormulaHide(), sec);
                        }
                        if (ctrl.getHasFormulaValue()) {
                            this.pSetFormulaIndexGroup(ctrl.getFormulaValue(), sec);
                        }
                    }
                }
            }
        }

        private pSetFormulaIndexGroup(formula: cReportFormula, sec: cReportSection) {
            let fint: cReportFormulaInt = null;
            let indexGroup: number = 0;

            for(let _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);

                if (this.pIsGroupFormula(fint.getFormulaType())) {
                    if (fint.getFormulaType() === csRptFormulaType.CSRPTF_GROUP_PERCENT) {
                        formula.setIdxGroup2(0);
                        indexGroup = Utils.valInt(fint.getParameters().item(2).getValue());
                    }
                    else {
                        indexGroup = Utils.valInt(fint.getParameters().item(1).getValue());
                    }
                    if (fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP) === null) {
                        fint.getParameters().add2("", ReportGlobals.C_KEY_INDEX_GROUP);
                    }
                    if (indexGroup === -1) {
                        if (sec.getTypeSection() === csRptSectionType.GROUP_HEADER
                            || sec.getTypeSection() === csRptSectionType.GROUP_FOOTER) {
                            // index of the group
                            //
                            fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).setValue(sec.getIndex().toString());
                            formula.setIdxGroup(sec.getIndex());
                        }
                        else if (sec.getTypeSection() === csRptSectionType.MAIN_DETAIL) {
                            // index of the most internal group
                            //
                            fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).setValue(this.groups.count().toString());
                            formula.setIdxGroup(this.groups.count()-1);
                        }
                        else {
                            fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).setValue("0");
                            formula.setIdxGroup(0);
                        }
                    }
                    else {
                        fint.getParameters().item(ReportGlobals.C_KEY_INDEX_GROUP).setValue(indexGroup.toString());
                        formula.setIdxGroup(indexGroup);
                    }
                }
            }
        }

        private pIsGroupFormula(formulaType: number) {
            switch (formulaType)
            {
                case csRptFormulaType.CSRPTF_GROUP_TOTAL:
                case csRptFormulaType.CSRPTF_GROUP_MAX:
                case csRptFormulaType.CSRPTF_GROUP_MIN:
                case csRptFormulaType.CSRPTF_GROUP_AVERAGE:
                case csRptFormulaType.CSRPTF_GROUP_PERCENT:
                case csRptFormulaType.CSRPTF_GROUP_COUNT:
                case csRptFormulaType.CSRPTF_GROUP_LINE_NUMBER:

                    return true;

                default:

                    return false;
            }
        }

        private pAddFormulasInSection(sections: cReportSections) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;

            for(let _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                if (sec.getHasFormulaHide()) {
                    if (!this.compiler.checkSyntax(sec.getFormulaHide()))  {
                        return false; 
                    }
                    // to have debug info
                    //
                    sec.getFormulaHide().setSectionName(sec.getName());

                    // add the formula to the formulas collection
                    //
                    this.addFormula(sec.getFormulaHide(), sec.getName() + "_" + "H");
                }
                for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    if (secLn.getHasFormulaHide()) {
                        if (!this.compiler.checkSyntax(secLn.getFormulaHide()))  {
                            return false; 
                        }
                        // to have debug info
                        //
                        secLn.getFormulaHide().setSectionName(secLn.getSectionName());
                        secLn.getFormulaHide().setSectionLineIndex(secLn.getIndex());

                        // add the formula to the formulas collection
                        //
                        this.addFormula(secLn.getFormulaHide(), sec.getName()
                                    + "_R_" + secLn.getIndex().toString() + "_" + "H");
                    }
                }
            }
            return true;
        }

        private addFormula(formula: cReportFormula, name: string) {
            if (this.formulas.item(name) === null) {
                this.formulas.add2(formula, name);
            }
        }

        private getHeightHeader() {
            let sec: cReportSection = null;
            let height: number = 0;
            let isVisible: boolean = false;

            for(let _i = 0; _i < this.headers.count(); _i++) {
                sec = this.headers.item(_i);
                if (sec.getHasFormulaHide()) {
                    isVisible = Utils.val(this.compiler.resultFunction(sec.getFormulaHide())) !== 0;
                }
                else {
                    isVisible = true;
                }

                if (isVisible)  {
                    height = height + sec.getAspect().getHeight();
                }
            }
            return height;
        }

        private getTopFooter() {
            let offset: number = 0;

            let w_paperInfo: cReportPaperInfo = this.launchInfo.getPrinter().getPaperInfo();
            if (w_paperInfo.getPaperSize() === csReportPaperType.CS_RPT_PAPER_USER) {
                offset = this.paperInfo.getCustomHeight() - w_paperInfo.getCustomHeight();
            }

            let w_aspect: cReportAspect = this.footers.item(0).getAspect();
            return w_aspect.getTop() - offset;
        }

        private addFieldToNewPage(sections: cReportSections, page: cReportPage, where: number) {
            let field: cReportPageField = null;
            let sec: cReportSection = null;
            let secLine: cReportSectionLine = null;
            let ctrl: cReportControl = null;
            let isVisible: boolean = false;
            let indexCtrl: number = 0;
            let offset: number = 0;
            let recordCount: number = 0;

            if (this.table !== null) {
                recordCount = this.vRowsIndex.length;
            }

            // this indexes means
            //
            // in which datasource is this control
            //
            let indexRows: number = 0;
            // in which row of the datasource is the control
            //
            let indexRow: number = 0;
            let indexField: number = 0;

            for(let _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                this.lineIndex = this.lineIndex + 1;

                if (sec.getHasFormulaHide()) {
                    isVisible = Utils.val(this.compiler.resultFunction(sec.getFormulaHide())) !== 0;
                }
                else {
                    isVisible = true;
                }
                if (isVisible) {
                    for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                        secLine = sec.getSectionLines().item(_j);
                        if (secLine.getHasFormulaHide()) {
                            isVisible = Utils.val(this.compiler.resultFunction(secLine.getFormulaHide())) !== 0;
                        }
                        else {
                            isVisible = true;
                        }
                        if (isVisible) {
                            // For Each Ctrl In Secline.Controls
                            //
                            for (indexCtrl = 0; indexCtrl < secLine.getControls().getCollByLeft().length; indexCtrl++) {
                                ctrl = secLine.getControls().item(secLine.getControls().getCollByLeft()[indexCtrl]);

                                if (where === this.C_HEADERS) {
                                    field = page.getHeader().add(null, "");
                                }
                                else if (where === this.C_FOOTERS) {
                                    field = page.getFooter().add(null, "");
                                }

                                field.setIndexLine(this.lineIndex);

                                if (ctrl.getHasFormulaValue()) {
                                    field.setValue(
                                        ReportGlobals.format(
                                            this.compiler.resultFunction(ctrl.getFormulaValue()), 
                                            ctrl.getLabel().getAspect().getFormat()));
                                }
                                else {
                                    switch (ctrl.getControlType())
                                    {
                                        case csRptControlType.CS_RPT_CT_FIELD:

                                            ({indexRows, indexRow, indexField} = this.pGetIndexRows(indexRows, indexRow, indexField, ctrl));

                                            if (this.tables[indexRows] !== null) {
                                                // it looks ugly, dont think you?
                                                //
                                                // maybe this help a litle:
                                                //
                                                //    this.tables(IndexRows)    a matrix with the data
                                                //                              contained in the datasource
                                                //                              referred by this control
                                                //
                                                //    (IndexField, IndexRow)    a cell in this matrix
                                                //
                                                let value: object = this.tables[indexRows].rows[indexRow][indexField];
                                                field.setValue(
                                                    ReportGlobals.format(
                                                        ReportGlobals.valVariant(value),
                                                        ctrl.getLabel().getAspect().getFormat()));
                                            }
                                            break;

                                        case csRptControlType.CS_RPT_CT_LABEL:
                                            field.setValue(
                                                ReportGlobals.format(
                                                    ctrl.getLabel().getText(), 
                                                    ctrl.getLabel().getAspect().getFormat()));
                                            break;

                                        case csRptControlType.CS_RPT_CT_IMAGE:
                                            field.setValue(
                                                ReportGlobals.format(
                                                    ctrl.getLabel().getText(), 
                                                    ctrl.getLabel().getAspect().getFormat()));
                                            field.setImage(ctrl.getImage().getImage());
                                            break;

                                        case csRptControlType.CS_RPT_CT_DB_IMAGE:

                                            ({indexRows, indexRow, indexField} = this.pGetIndexRows(indexRows, indexRow, indexField, ctrl));

                                            if (this.tables[indexRows] !== null) {
                                                field.setImage(this.pGetImage(indexRows, indexField, indexRow));
                                            }
                                            break;

                                        case csRptControlType.CS_RPT_CT_CHART:

                                            ({indexRows, indexRow, indexField} = this.pGetIndexRows(indexRows, indexRow, indexField, ctrl));

                                            field.setImage(this.pGetChartImage(indexRows, indexField, indexRow, ctrl));
                                            break;
                                    }
                                }

                                field.setInfo(this.pageSetting.item(ctrl.getKey()));
                                field.setTop(field.getInfo().getAspect().getTop() + offset);

                                if (ctrl.getHasFormulaHide()) {
                                    field.setVisible(
                                        Utils.val(this.compiler.resultFunction(ctrl.getFormulaHide())) !== 0);
                                }
                                else {
                                    field.setVisible(true);
                                }
                            }
                        }
                    }
                }
                else {
                    if (where === this.C_HEADERS) {
                        offset = offset - sec.getAspect().getHeight();
                    }
                    else if (where === this.C_FOOTERS) {
                        offset = offset + sec.getAspect().getHeight();
                    }
                }
            }
        }

        private createPageSetting() {
            // clear the collection
            //
            this.pageSetting.clear();

            this.pageSetting.setHeight(this.launchInfo.getPrinter().getPaperInfo().getHeight());

            let sec: cReportSection = null;
            let secLine: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            // headers
            //
            for(let _i = 0; _i < this.headers.count(); _i++) {
                sec = this.headers.item(_i);
                for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLine = sec.getSectionLines().item(_j);
                    for(let _k = 0; _k < secLine.getControls().count(); _k++) {
                        ctrl = secLine.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add2(secLine, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            // detail
            //
            for(let _i = 0; _i < this.details.count(); _i++) {
                sec = this.details.item(_i);
                for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLine = sec.getSectionLines().item(_j);
                    for(let _k = 0; _k < secLine.getControls().count(); _k++) {
                        ctrl = secLine.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add2(secLine, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            // footers
            //
            let offset: number = 0;

            let w_paperInfo: cReportPaperInfo = this.launchInfo.getPrinter().getPaperInfo();
            if (w_paperInfo.getPaperSize() === csReportPaperType.CS_RPT_PAPER_USER) {
                offset = this.originalHeight - w_paperInfo.getCustomHeight();
            }
            for(let _i = 0; _i < this.footers.count(); _i++) {
                sec = this.footers.item(_i);
                for(let _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLine = sec.getSectionLines().item(_j);
                    for(let _k = 0; _k < secLine.getControls().count(); _k++) {
                        ctrl = secLine.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add2(secLine, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        let aspect: cReportAspect = pageInfo.getAspect();
                        aspect.setTop(aspect.getTop() - offset);
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            // groups
            //
            for(let _i = 0; _i < this.groups.count(); _i++) {
                let grp: cReportGroup = this.groups.item(_i);
                // header
                //
                for(let _j = 0; _j < grp.getHeader().getSectionLines().count(); _j++) {
                    secLine = grp.getHeader().getSectionLines().item(_j);
                    for(let _k = 0; _k < secLine.getControls().count(); _k++) {
                        ctrl = secLine.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add2(secLine, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
                // footer
                //
                for(let _j = 0; _j < grp.getFooter().getSectionLines().count(); _j++) {
                    secLine = grp.getFooter().getSectionLines().item(_j);
                    for(let _k = 0; _k < secLine.getControls().count(); _k++) {
                        ctrl = secLine.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add2(secLine, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            return true;
        }

        private pGetDataAux(recordSets: [object|string[]]) {
            for(let _i = 0; _i < this.connectsAux.count(); _i++) {
                let connect: cReportConnect = this.connectsAux.item(_i);
                let dtr = new RefWrapper(new DataTable());
                if (! this.pGetData(dtr, connect, false, recordSets)) {
                    return false;
                }
                this.tables.push(dtr.get());
            }
            this.vRowsIndexAux = [];
            return true;
        }

        private pGetData(dtr: RefWrapper<DataTable>,
                         connect: cReportConnect, createIndexVector: boolean,
                         recordSets: [object|string[]], rs: RefWrapper<DataTable> = null) {

            let strConnect: string;
            let saveInReport: boolean = false;
            let cn: CSDatabase.Database = null;
            let varRs: object|string[] = null;
            let rsAux: DataTable = null;
            let dr: CSDatabase.DbDataReader = null;

            // if we get an string connection
            //
            if (this.launchInfo.getStrConnect().trim() !== "") {
                strConnect = this.launchInfo.getStrConnect();
            }
            // if this.launchInfo.getStrConnect() is empty we will use
            // the connection of the connect object
            // 
            else {
                strConnect = connect.getStrConnect();
                saveInReport = true;
            }
            if (! this.getReportDisconnected()) {
                if (strConnect.trim() === "") {
                    cWindow.msgWarning("The connection settings were not defined."
                                        + "Both the LaunchInfo and the Connect object have their "
                                        + "strConnect property empty. Without this connection string "
                                        + "it will be impossible to open the connection to the database.",
                                        "CSReportEditor");
                    return false;
                }

                cn = new CSDatabase.Database(this.databaseEngine);

                if (this.isForWeb) {
                    cn.setSilent(true);
                }
                if (connect.getCommandTimeout() > 0) {
                    cn.setCommandTimeout(connect.getCommandTimeout());
                }
                if (connect.getConnectionTimeout() > 0) {
                    cn.setConnectionTimeout(connect.getConnectionTimeout());
                }

                // open the connection
                //
                if (!cn.initDb(strConnect)) return false;

                // we need to prepare the first sentence
                //
                let sqlstmt: string;

                // if it was a select
                //
                if (this.launchInfo.getSqlstmt().trim() !== "") {
                    sqlstmt = this.launchInfo.getSqlstmt();
                }
                else {
                    if (connect.getDataSourceType() === csDataSourceType.CS_DT_PROCEDURE) {
                        sqlstmt = "exec [" + connect.getDataSource() + "] " + connect.getSqlParameters();
                    }
                    else if (connect.getDataSourceType() === csDataSourceType.CS_DT_TABLE) {
                        sqlstmt = "select * from [" + connect.getDataSource() + "]";
                    }
                    else {
                        sqlstmt = connect.getDataSource();
                    }
                }

                // open the recordset
                //
                cn.setOpenRsExDescript(this.userDescription);

                if (! cn.loadDataTable(true, false, false, sqlstmt, rs, dr)) {
                    return false;
                }

                dtr = rs;

                if (rs.get().rows.length === 0) {
                    if (createIndexVector) {
                        this.vRowsIndex = [];
                        this.lastRowIndex = -1;
                    }
                }
                else {
                    if (createIndexVector) {
                        this.vRowsIndex = [];
                        this.lastRowIndex = dtr.get().rows.length - 1;
                        for (let k = 0, count = dtr.get().rows.length; k < count; k++) {
                            this.vRowsIndex.push(k);
                        }
                    }
                }

                varRs = [];
                varRs[0] = rs;
                varRs[1] = connect.getDataSource();

                recordSets.push(varRs);

                // we need to load every recordset from every data source
                // in the recordset collection (this code support multiples
                // recordset in the same reader)
                //
                while (!dr.isClosed() && dr.nextResult()) {
                    rsAux = new DataTable();
                    rsAux.load(dr);

                    varRs = [];
                    varRs[0] = rsAux;
                    varRs[1] = connect.getDataSource();
                    recordSets.push(varRs);

                    // TODO: check if this works
                    //
                    // we add an empty element to this.collRows to avoid
                    // index of bounds exception
                    //
                    this.tables.push();
                }

                cn.closeDb();
            }
            else {
                dtr = null;
                if (createIndexVector) {
                    this.vRowsIndex = [];
                    this.lastRowIndex = -1;
                }
            }
            if (this.table !== null) {
                this.recordCount = this.vRowsIndex.length;
            }
            else {
                this.recordCount = 0;
            }
            this.iRow = 0;
            this.idxGroupHeader = this.NO_GROUP_INDEX;
            this.idxGroupFooter = this.NO_GROUP_INDEX;

            return true;
        }

        private pInitRowFormulas() {

            this.lastRowPreEvaluated = [];
            this.lastRowPostEvaluated = [];

            for (let i = 0; i < 3; i++) {
                this.lastRowPreEvaluated[i] = -1;
                this.lastRowPostEvaluated[i] = -1;
            }

            for (let i = 0; i < this.groupCount; i++) {
                // headers
                //
                this.vGroups[i].lastHPreRowEvaluated = -1;
                this.vGroups[i].lastHPostRowEvaluated = -1;

                // footers
                //
                this.vGroups[i].lastFPreRowEvaluated = -1;
                this.vGroups[i].lastFPostRowEvaluated = -1;
            }
        }

        private nLoad(docXml: cXml) {
            this.pDestroyCrossRef(this.headers);
            this.pDestroyCrossRef(this.details);
            this.pDestroyCrossRef(this.footers);
            this.pDestroyCrossRef(this.groups.getGroupsHeaders());
            this.pDestroyCrossRef(this.groups.getGroupsFooters());

            this.headers.clear();
            this.groups.clear();
            this.details.clear();
            this.footers.clear();
            this.controls.clear();
            this.formulas.clear();
            this.connect.getColumns().clear();
            this.connect.getParameters().clear();

            this.details.setCopyColl(this.controls);
            this.headers.setCopyColl(this.controls);
            this.footers.setCopyColl(this.controls);
            this.groupsHeaders.setCopyColl(this.controls);
            this.groupsFooters.setCopyColl(this.controls);

            if (!this.loadAux(docXml, this.headers, this.C_NODE_RPT_HEADERS)) { return false; }
            if (!this.loadAux(docXml, this.details, this.C_NODE_RPT_DETAILS)) { return false; }
            if (!this.loadAux(docXml, this.footers, this.C_NODE_RPT_FOOTERS)) { return false; }

            if (!this.loadGroups(docXml)) { return false; }

            this.pFixGroupIndex();

            if (!this.loadConnect(docXml)) { return false; }
            if (!this.loadConnectsAux(docXml)) { return false; }
            if (!this.loadLaunchInfo(docXml)) { return false; }

            this.loadPaperInfo(docXml);

            this.sortCollection();

            this.originalHeight = this.paperInfo.getCustomHeight();

            return true;
        }

        private pFixGroupIndex() {
            for(let i = 0; i < this.groups.count(); i++) {
                this.groups.item(i).setIndex(i);
            }
        }

        private loadPaperInfo(docXml: cXml): void {
            let nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, this.C_NODE_PAPER_INFO);
            this.paperInfo.load(docXml, nodeObj)
        }

        private sortCollection() {
            this.sortCollectionAux(this.headers);
            this.sortCollectionAux(this.details);
            this.sortCollectionAux(this.footers);
            this.sortCollectionAux(this.groupsFooters);
            this.sortCollectionAux(this.groupsHeaders);
        }

        private sortCollectionAux(col: cReportSections) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;

            for(let i = 0; i < col.count(); i++) {
                sec = col.item(i);
                for(let j = 0; j < sec.getSectionLines().count(); j++) {
                    secLn = sec.getSectionLines().item(j);
                    secLn.setControls(this.getControlsInZOrder(secLn.getControls()));
                }
            }
        }

        private loadAux(docXml: cXml, sections: cReportSections, keySection: string): boolean {
            let nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, keySection);

            if (docXml.nodeHasChild(nodeObj)) {
                let nodeObjSec = docXml.getNodeChild(nodeObj);

                while (nodeObjSec !== null) {
                    let nodeObjAux = nodeObjSec;
                    let key: string = docXml.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    let sec: cReportSection = sections.add(null, key);
                    if (!sec.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjSec = docXml.getNextNode(nodeObjSec);
                }
            }
            return true;
        }

        private loadFormulas(docXml: cXml): boolean {
            let nodeObj: XmlNode = null;
            let nodeObjAux: XmlNode = null;
            let nodeObjSec: XmlNode = null;

            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, this.C_NODE_RPT_FORMULAS);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjSec = docXml.getNodeChild(nodeObj);
                while (nodeObjSec !== null) {
                    nodeObjAux = nodeObjSec;
                    let name: string = docXml.getNodeProperty(nodeObjAux, "Name").getValueString(eTypes.eText);
                    let formula: cReportFormula = this.formulas.add(name);
                    if (!formula.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjSec = docXml.getNextNode(nodeObjSec);
                }
            }
            return true;
        }

        private loadConnect(docXml: cXml): boolean {
            let nodeObj: XmlNode = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, this.C_RPT_CONNECT);
            return this.connect.load(docXml, nodeObj);
        }

        private loadConnectsAux(docXml: cXml): boolean {
            let nodeObj: XmlNode = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, cReportConnectsAux.C_RPT_CONNECTS_AUX);
            return this.connectsAux.load(docXml, nodeObj);
        }

        private loadGroups(docXml: cXml) {
            let nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, this.C_NODE_GROUPS);

            if (docXml.nodeHasChild(nodeObj)) {
                let nodeObjGroup = docXml.getNodeChild(nodeObj);
                while (nodeObjGroup !== null) {
                    let nodeObjAux = nodeObjGroup;
                    let key: string = docXml.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    let group: cReportGroup = this.getGroups().add(null, key);
                    if (!group.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjGroup = docXml.getNextNode(nodeObjGroup);
                }
            }
            return true;
        }

        private loadLaunchInfo(docXml: cXml) {
            let nodeObj: XmlNode = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, cReportLaunchInfo.C_LAUNCH_INFO);
            return this.launchInfo.load(docXml, nodeObj);
        }

        private getFileName(fileNameWithExt: string) {
            return cFile.getFileWithoutExt(fileNameWithExt);
        }

        private nLoadData(docXml: cXml) {
            this.pages.clear();
            let nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, this.C_NODE_RPT_PAGES);

            if (docXml.nodeHasChild(nodeObj)) {
                let nodeObjSec = docXml.getNodeChild(nodeObj);
                while (nodeObjSec !== null) {
                    let nodeObjAux = nodeObjSec;
                    let page: cReportPage = this.pages.add(null);
                    if (!page.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjSec = docXml.getNextNode(nodeObjSec);
                }
            }
            return true;
        }

        public onReportDone(f: (report: cReport) => void) {
            this.reportDoneListener = f;
        }

        private reportDone() {
            if (this.reportDoneListener !== null) {
                this.reportDoneListener(this);
            }
        }

        public onProgress(f: (report: cReport, eventArgs: ProgressEventArgs) => void) {
            this.progressListener = f;
        }

        private progress(task: string, page: number = 0, currRecord: number = 0, recordCount: number = 0) {
            let cancel: boolean = false;
            if (this.progressListener !== null) {
                let e: ProgressEventArgs = new ProgressEventArgs(task, page, currRecord, recordCount);
                this.progressListener(this, e);
                cancel = e.isCancel();
            }
            return !cancel;
        }

        private pSortControlsByLeft() {
            this.pSortControlsByLeftAux1(this.headers);
            this.pSortControlsByLeftAux1(this.groupsHeaders);
            this.pSortControlsByLeftAux1(this.details);
            this.pSortControlsByLeftAux1(this.groupsFooters);
            this.pSortControlsByLeftAux1(this.footers);
        }

        private pSortControlsByLeftAux1(sections: cReportSections) {
            for(let i = 0; i < sections.count(); i++) {
                let sec = sections.item(i);
                for(let j = 0; j < sec.getSectionLines().count(); j++) {
                    let secLn = sec.getSectionLines().item(j);
                    secLn.getControls().orderCollByLeft();
                }
            }
        }
        // public functions
        public dispose() {
            console.log("dispose was called in object " + this.constructor.name);
            
            this.table = null;
            this.tables = null;
            this.vRowsIndexAux = null;
            this.vGroups = null;
            this.vRowsIndex = null;
            this.lastRowIndex = -1;
            this.lastRowPreEvaluated = null;
            this.lastRowPostEvaluated = null;

            this.controls.clear();
            this.controls = null;

            this.pDestroyCrossRef(this.headers);
            this.pDestroyCrossRef(this.details);
            this.pDestroyCrossRef(this.footers);
            this.pDestroyCrossRef(this.groups.getGroupsHeaders());
            this.pDestroyCrossRef(this.groups.getGroupsFooters());

            this.headers.clear();
            this.details.clear();
            this.footers.clear();
            this.groupsHeaders.clear();
            this.groupsFooters.clear();

            this.details.setCopyColl(null);
            this.headers.setCopyColl(null);
            this.footers.setCopyColl(null);
            this.groupsHeaders.setCopyColl(null);
            this.groupsFooters.setCopyColl(null);

            this.headers = null;
            this.details = null;
            this.footers = null;
            this.groupsHeaders = null;
            this.groupsFooters = null;

            this.paperInfo = null;

            this.formulas.clear();
            this.formulas = null;

            this.formulaTypes.clear();
            this.formulaTypes = null;

            this.connect = null;

            this.pages.clear();
            this.pages = null;

            this.pageSetting.clear();
            this.pageSetting = null;

            this.compiler = null;
            this.launchInfo = null;

            this.connectsAux.clear();
            this.connectsAux = null;

            this.pDestroyImages();
            this.images = null;
        }

        private pDestroyCrossRef(secs: cReportSections) {
            for(let i = 0; i < secs.count(); i++) {
                let sec = secs.item(i);
                for(let j = 0; j < sec.getSectionLines().count(); j++) {
                    let secl = sec.getSectionLines().item(j);
                    secl.getControls().setSectionLine(null);

                    if (secl.getControls().getCopyColl() !== null) {
                        secl.getControls().getCopyColl().clear();
                    }
                    secl.getControls().setCopyColl(null);
                    secl.getControls().clear();
                    secl.setControls(null);
                }
                sec.setCopyColl(null);
            }
            secs.setCopyColl(null);
        }

        private pGetMainDataSource(recordSets: [object|string[]]): string {
            if (recordSets.length > 0) {
                return recordSets[0][1].toString();
            }
            else  {
                return "";
            }
        }

        private pSetIndexColInGroupFormulas(recordSets: [object|string[]]) {
            this.pSetIndexColInGroupFormulasAux(this.headers, recordSets);
            this.pSetIndexColInGroupFormulasAux(this.groupsHeaders, recordSets);
            this.pSetIndexColInGroupFormulasAux(this.groupsFooters, recordSets);
            this.pSetIndexColInGroupFormulasAux(this.details, recordSets);
            this.pSetIndexColInGroupFormulasAux(this.footers, recordSets);
        }

        private pSetIndexColInGroupFormulasAux(sections: cReportSections, recordSets: [object|string[]]) {
            for(let i = 0; i < sections.count(); i++) {
                let sec = sections.item(i);
                if (sec.getHasFormulaHide()) {
                    this.pSetIndexColInGroupFormula(sec.getFormulaHide(), recordSets);
                }
                for(let j = 0; j < sec.getSectionLines().count(); j++) {
                    let secLn = sec.getSectionLines().item(j);
                    if (secLn.getHasFormulaHide()) {
                        this.pSetIndexColInGroupFormula(secLn.getFormulaHide(), recordSets);
                    }
                    for(let k = 0; k < secLn.getControls().count(); k++) {
                        let ctrl = secLn.getControls().item(k);
                        if (ctrl.getHasFormulaHide()) {
                            this.pSetIndexColInGroupFormula(ctrl.getFormulaHide(), recordSets);
                        }
                        if (ctrl.getHasFormulaValue()) {
                            this.pSetIndexColInGroupFormula(ctrl.getFormulaValue(), recordSets);
                        }
                    }
                }
            }
        }

        private pSetIndexColInGroupFormula(formula: cReportFormula, recordSets: [object|string[]]) {
            if (!this.reportDisconnected) {
                let rs = recordSets[0][0];

                for(let i = 0; i < formula.getFormulasInt().count(); i++) {
                    let fint = formula.getFormulasInt().item(i);

                    if (this.pIsGroupFormula(fint.getFormulaType())) {
                        let colName = fint.getParameters().item(0).getValue();
                        this.pSetColIndexInGroupFormulaAux(rs, fint, colName, ReportGlobals.C_KEY_INDEX_COL);

                        if (fint.getFormulaType() === csRptFormulaType.CSRPTF_GROUP_PERCENT) {
                            colName = fint.getParameters().item(1).getValue();
                            this.pSetColIndexInGroupFormulaAux(rs, fint, colName, ReportGlobals.C_KEY_INDEX_COL2);
                        }
                    }
                }
            }
        }

        private pSetColIndexInGroupFormulaAux(rs: DataTable, fint: cReportFormulaInt, colName: string, keyParam: string) {
            for(let i = 0; i < rs.columns.length; i++) {
                if (colName.toLowerCase() === rs.columns[i].getName().toLowerCase()) {
                    if (fint.getParameters().item(keyParam) === null) {
                        fint.getParameters().add2("", keyParam);
                    }
                    fint.getParameters().item(keyParam).setValue(i.toString());
                    break;
                }
            }
        }

        private getControlsInZOrder(col: cReportControls) {
            let ctrls = new cReportControls();
            ctrls.setCopyColl(col.getCopyColl());
            ctrls.setTypeSection(col.getTypeSection());
            ctrls.setSectionLine(col.getSectionLine());

            // we load a new collection ordered by zorder
            //
            while (col.count() > 0) {
                // we search the lower zorder in this collection
                //
                let i = 32767;
                for(let j = 0; j < col.count(); j++) {
                    let ctrl = col.item(j);
                    if (ctrl.getLabel().getAspect().getNZOrder() < i) {
                        i = ctrl.getLabel().getAspect().getNZOrder();
                    }
                }

                for(let j = 0; j < col.count(); j++) {
                    let ctrl = col.item(j);
                    if (ctrl.getLabel().getAspect().getNZOrder() === i) {
                        col.remove(ctrl.getKey());
                        ctrls.add(ctrl, ctrl.getKey());
                        break;
                    }
                }
                i = i + 1;
            }
            return ctrls;
        }

        //
        // debug functions
        //
        public debugGroupKeys() {
            let keys: string[] = new String[this.groups.count() * 2];
            let groupCount = this.groups.count();
            for(let i = 0; i < groupCount; i++) {
                let h = this.groups.getGroupsHeaders().item(i);
                let f = this.groups.getGroupsFooters().item(i);
                keys[i] = "H: " + h.getKey() + " " + h.getKeyPaint() + " " + h.getName() + " " + h.getIndex() + " " + h.getRealIndex() ;
                keys[groupCount+i] = "F: " + f.getKey() + " " + h.getKeyPaint() + " " + f.getName() + " " + f.getIndex() + " " + f.getRealIndex();
            }
            return keys;
        }

        public debugGroupPanitKeys() {
            let keys: string[] = new String[this.groups.count() * 2];
            let groupCount = this.groups.count();
            for(let i = 0; i < groupCount; i++) {
                keys[i] = "H: " + this.groups.getGroupsHeaders().item(i).getKeyPaint();
                keys[groupCount + i] = "F: " + this.groups.getGroupsFooters().item(i).getKeyPaint();
            }
            return keys;
        }
    }
}
