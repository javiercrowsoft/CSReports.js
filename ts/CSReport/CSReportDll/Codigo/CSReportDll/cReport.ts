namespace CSReportDll {

//     public delegate void ReportDoneHandler(object sender, EventArgs e);
//     public delegate void ProgressHandler(object sender, ProgressEventArgs e);
//     public delegate void FindAccessFileHandler(object sender, FindAccessFileEventArgs e);

    export class T_Group {
        public first: number = null;
        public last: number = null;
    }

    export class T_Groups {
        public value: object = null;
        public indexField: number = null;
        public changed: boolean = null;
        public reprintHeader: boolean = null;
        public footerMustBeClosed: boolean = null;
        public comparisonType: csRptGrpComparisonType = null;
        public oderType: csRptGrpOrderType = null;
        public grandTotalGroup: boolean = null;
        public groups: T_Group[] = null;
        public lastHPreRowEvalued: number = null;
        public lastHPostRowEvalued: number = null;
        public lastFPreRowEvalued: number = null;
        public lastFPostRowEvalued: number = null;
        // to know which is the line number when we are in a group
        //
        // it is incremented only when the detail section is printed
        // it doesn't care if the details contains more than one line
        //
        public lineNumber: number = null;
    }

    export class cReport {
//         public event ReportDoneHandler ReportDone;
//         public event ProgressHandler Progress;
//         public event FindAccessFileHandler FindAccessFile;


        // remember mark any change that could bring errors 
        // with the label WARNING and the date
        //
        // 2008-02-18 WARNING

        // additional recordset management:
        //
        // there are two types of additional recordsets:
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
        // the formula getDataFromRSAd is used to access data in additional recordsets
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

        private C_MODULE: string = "cReport";
        private C_HEADERS: number = 1;
        private C_FOOTERS: number = 2;
        private C_NODERPTHEADERS: string = "RptHeaders";
        private C_NODERPTDETAILS: string = "RptDetails";
        private C_NODEGROUPS: string = "RptGroups";
        private C_NODERPTFOOTERS: string = "RptFooters";
        private C_RPTCONNECT: string = "RptConnect";
        private C_RPTCONNECTSAUX: string = "RptConnectsAux";
        private C_LAUNCHINFO: string = "RptLaunchInfo";
        private C_NODERPTFORMULAS: string = "RptFormulas";
        private C_NODERPTPAGESSETTING: string = "RptPagesSetting";
        private C_NODERPTPAGES: string = "RptPages";
        private C_NODEPAPERINFO: string = "PaperInfo";
        private C_FILEEX: string = "CrowSoft Report|*.csr| Archivos Xml|*.xml";
        private C_FILEDATAEX: string = "CrowSoft Report data|*.csd| Archivos Xml|*.xml";

        // every formula in a header
        //
        private C_IDX_GROUP_HEADER: number = -1000;
        // every formula in detail
        //
        private C_IDX_GROUP_DETAIL: number = 0;
        // every formula in a footer
        //
        private C_IDX_GROUP_FOOTER: number = -1001;
        // every formumal in groups
        //
        private C_IDX_GROUP_REPORTHEADER: number = -2000;
        private C_IDX_GROUP_REPORTFOOTER: number = -2001;

        private C_IDX_H_LAST_ROW_EVALUED: number = 0;
        private C_IDX_D_LAST_ROW_EVALUED: number = 1;
        private C_IDX_F_LAST_ROW_EVALUED: number = 2;

        // flag to know if we need to check in the group (this.vGroups)
        // which row was the last evaluated
        // instead of checking in this.LastRow..Evalued
        //
        private C_IDX_G_LAST_ROW_EVALUED: number = -1;

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

        private descripUser: string = "";

        private connect: cReportConnect = null;
        private connectsAux: cReportConnectsAux = null;

        private pageSetting: cReportPageSettings = null;
        private pages: cReportPages = null;

        private compiler: cReportCompiler = null;
        private currenPage: number = 0;
        private totalPages: number = 0;

        private reportDisconnected: boolean = null;

        // to sort groups
        //
        // this array contains a table with the data of every recordset
        // in the main connection
        //
        // the function pGetData() reserves a position for every recordset
        // in the additional connections
        //
        private collRows: DataTable[] = null;

        private images: Dictionary = null;
        private rows: DataTable = null;
        private recordCount: number = 0;
        private vRowsIndex: number[] = null;
        private lastRowIndex: number = -1;
        private vRowsIndexAux: number[] = null;
        private iRow: number = 0;
        private iRow2: number = 0;
        private iRowFormula: number = 0;
        private lineIndex: number = 0;

        private lastRowPreEvalued: number[] = null;
        private lastRowPostEvalued: number[] = null;

        // flag to know if there are group headers to re-print in a new page
        // if it is false we can print a footer as the first line in a new page
        //
        private bExistsGrpToRePrintInNP: boolean = null;
        private bHaveToRePrintGroup: boolean = null;

        private NO_GROUP_INDEX: number = 0;

        // to print groups in a new page when a group changes
        //
        private idxGroupToPrintNP: number = NO_GROUP_INDEX;

        // index of the current group header
        //
        private idxGroupHeader: number = NO_GROUP_INDEX;

        // index of the current group footer
        //
        private idxGroupFooter: number = NO_GROUP_INDEX;

        private bPrintFooter: boolean = null;
        private bLastFootersWasPrinted: boolean = null;
        private groupIndexChange: number = NO_GROUP_INDEX;

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

        private databaseEngine: csDatabaseEngine = csDatabaseEngine.SQL_SERVER;

        private exportEmailAddress: string = "";

        public constructor() {
            try {
                this.headers = new cReportSections();
                this.details = new cReportSections();
                this.footers = new cReportSections();
                this.groups = new cReportGroups();
                this.groupsHeaders = getGroups().getGroupsHeaders();
                this.groupsFooters = getGroups().getGroupsFooters();
                this.paperInfo = new cReportPaperInfo();
                this.controls = new cReportControls2();
                this.formulas = new cReportFormulas();
                this.formulaTypes = new cReportFormulaTypes();
                this.connect = new cReportConnect();
                this.pageSetting = new cReportPageSettings();
                this.pages = new cReportPages();

                this.compiler = new cReportCompiler();

                setConnectsAux(new cReportConnectsAux());

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
                cError.mngError(ex, "Class_Initialize", C_MODULE, "");
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

        public setDatabaseEngine(databaseEngine: csDatabaseEngine) {
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
            return this.descripUser;
        }

        public setDescripUser(rhs: string) {
            this.descripUser = rhs;
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

                for(var _i = 0; _i < this.groups.count(); _i++) {
                    group = this.groups.item(_i);
                    collGroups.add(group, group.getKey());
                }

                this.groups.clear();

                let index: number = 0;

                for(var _i = 0; _i < collGroups.count(); _i++) {
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
            if (!OnProgress("", this.pages.count(), 0, 0)) {
                return csRptNewPageResult.CSRPTNPERROR;
            }

            // if it is the first page we evaluate the headers of the report
            //
            if (this.pages.count() === 1) {
                evalFunctions(C_IDX_GROUP_REPORTHEADER, csRptWhenEval.CSRPTEVALPRE);
            }

            // only formulas located in header sections
            //
            evalFunctions(C_IDX_GROUP_HEADER, csRptWhenEval.CSRPTEVALPRE);

            // add field from every header to the page
            //
            addFieldToNewPage(this.headers, page, C_HEADERS);

            // only formulas located in header sections
            //
            evalFunctions(C_IDX_GROUP_HEADER, csRptWhenEval.CSRPTEVALPOST);

            // if it is the first page we evaluate the headers of the report
            //
            if (this.pages.count() === 1) {
                evalFunctions(C_IDX_GROUP_REPORTHEADER, csRptWhenEval.CSRPTEVALPOST);
            }

            // we need to set height of headears an footers
            //
            page.setHeaderBottom(getHeightHeader());
            page.setFooterTop(getTopFooter());

            if (this.rows === null) {
                return csRptNewPageResult.CSRPTNPEND;
            }
            else if (this.iRow > this.lastRowIndex) {
                return csRptNewPageResult.CSRPTNPEND;
            }

            // if there are group headers which need to be reprinted
            // in the new page
            //
            if (this.bExistsGrpToRePrintInNP) {
                this.bHaveToRePrintGroup = true;

                // set on the flag to know we need to re-print group headers
                //
                pMarkGroupHeadersToReprint();
            }

            return csRptNewPageResult.CSRPTNPSUCCESS;
        }

        private pMarkGroupHeadersToReprint() {
            // if this is the first page we do nothing
            //
            if (this.firstGroup) {
                return;
            }

            for(var i = 0; i < this.groupCount; i++) {
                if (this.groups.item(i).getRePrintInNewPage()) {
                    this.vGroups[i].reprintHeader = true;
                }
            }
        }

        private pExistsGroupHeadersToReprint() {
            for(var i = 0; i < this.groupCount; i++) {
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
            for(var i = 0; i < this.groupCount; i++) {
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
            evalFunctions(C_IDX_GROUP_FOOTER, csRptWhenEval.CSRPTEVALPRE);

            // add field from every header to the page
            //
            addFieldToNewPage(this.footers, page, C_FOOTERS);

            // only formulas located in footer sections
            //
            evalFunctions(C_IDX_GROUP_FOOTER, csRptWhenEval.CSRPTEVALPOST);

            return csRptEndPageResult.CSRPTEPSUCCESS;
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
                pCheckExistsGroupHToReprint();

                if (pNotPendingFooters()) {
                    pMarkGroupHeaderPrintedAux();
                }

                // if the group has changed we need to
                // initialize it and then mark it as printed
                //
            }
            else if (this.vGroups[this.idxGroupHeader - 1].changed) {
                pMarkGroupHeaderPrintedAux();
            }
        }

        private pMarkGroupHeaderPrintedAux() {
            let headerSec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            // if we have printed the group we need to set off
            // the flag which tell us the group has changed
            //
            this.vGroups[this.idxGroupHeader - 1].changed = false;

            // if it was a group which has to be printed in a new page
            // we set off the flag because the group has been printed
            //
            if (this.idxGroupToPrintNP === this.idxGroupHeader) {
                this.idxGroupToPrintNP = NO_GROUP_INDEX;
            }

            headerSec = this.groups.item(this.idxGroupHeader - 1).getHeader();

            // we need to initialize the variables of every formula
            // in every control located in the header section of the group
            //
            for(var _i = 0; _i < headerSec.getSectionLines().count(); _i++) {
                secLn = headerSec.getSectionLines().item(_i);
                for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                    ctrl = secLn.getControls().item(_j);
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
            let footerSec: cReportSection = null;
            let ctrl: cReportControl = null;
            let secLn: cReportSectionLine = null;

            // if the group has been printed we set off the flag
            // used to know if it must be closed
            //
            this.vGroups[this.idxGroupFooter - 1].footerMustBeClosed = false;

            footerSec = this.groups.item(this.idxGroupFooter - 1).getFooter();

            // we need to initialize the variables of every formula
            // in the controls of every section lines in the footer group
            //
            for(var _i = 0; _i < footerSec.getSectionLines().count(); _i++) {
                secLn = footerSec.getSectionLines().item(_i);
                for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                    ctrl = secLn.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        this.compiler.initVariable(ctrl.getFormulaHide());
                    }
                    if (ctrl.getHasFormulaValue()) {
                        this.compiler.initVariable(ctrl.getFormulaValue());
                    }
                }
            }

            if (pNotPendingFooters()) {
                this.iRowFormula = this.iRow;
                this.iRow2 = this.iRow;
            }
        }

        public evalPost() {
            evalFunctions(C_IDX_GROUP_DETAIL, csRptWhenEval.CSRPTEVALPOST);
        }

        public evalPreGroupHeader() {
            if (this.idxGroupHeader !== NO_GROUP_INDEX) {
                evalFunctions(this.idxGroupHeader, csRptWhenEval.CSRPTEVALPRE);
            }
        }

        public evalPreGroupFooter() {
            if (this.idxGroupHeader !== NO_GROUP_INDEX) {
                let idxChildGroupFooter: number = NO_GROUP_INDEX;

                idxChildGroupFooter = pGetChildGroupFooterToClose(this.idxGroupHeader);

                // when we close a group we need to evaluate every sub-group
                //
                while (idxChildGroupFooter > this.idxGroupHeader) {
                    evalFunctions(idxChildGroupFooter * -1, csRptWhenEval.CSRPTEVALPRE);
                    idxChildGroupFooter = idxChildGroupFooter - 1;
                }

                // finaly we need to evaluate the group that has changed
                //
                evalFunctions(this.idxGroupHeader * -1, csRptWhenEval.CSRPTEVALPRE);
            }
        }

        public evalPostGroupHeader() {
            if (this.idxGroupHeader === NO_GROUP_INDEX) { return; }
            evalFunctions(this.idxGroupHeader, csRptWhenEval.CSRPTEVALPOST);
        }

        public evalPostGroupFooter() {
            if (this.idxGroupHeader !== NO_GROUP_INDEX) {

                let idxChildGroupFooter: number = 0;

                idxChildGroupFooter = pGetChildGroupFooterToClose(this.idxGroupHeader);

                // when we close a group we need to evaluate every sub-group
                //
                while (idxChildGroupFooter > this.idxGroupHeader) {
                    evalFunctions(idxChildGroupFooter * -1, csRptWhenEval.CSRPTEVALPOST);
                    idxChildGroupFooter = idxChildGroupFooter - 1;
                }

                // finaly we need to evaluate the group that has changed
                //
                evalFunctions(this.idxGroupHeader * -1, csRptWhenEval.CSRPTEVALPOST);
            }
        }

        private pGetChildGroupFooterToClose(idxGroupFather: number) {
            let groupIndex: number = 0;
            for(var j = idxGroupFather - 1; j < this.groupCount; j++) {
                if (this.vGroups[j].footerMustBeClosed) {
                    groupIndex = j + 1;
                }
            }
            return groupIndex;
        }

        public evalPre() {
            evalFunctions(C_IDX_GROUP_DETAIL, csRptWhenEval.CSRPTEVALPRE);
        }

        public moveToNext() {
            // we move to the next group
            //
            this.iRow = this.iRow + 1;
            this.iRow2 = this.iRow;
            this.iRowFormula = this.iRow;

            // we need to move the additional recordset too
            //
            for(var indexRows = 0; indexRows < this.collRows.Length; indexRows++) {
                let indexRow: number = this.vRowsIndexAux[indexRows] + 1;
                if (this.collRows[indexRows] !== null) {
                    if (indexRow < this.collRows[indexRows].Rows.Count) {
                        this.vRowsIndexAux[indexRows] = indexRow;
                    }
                }
            }
        }

        private pExistsGroupToReprintInNP() {
            this.bExistsGrpToRePrintInNP = false;
            for(var i = 0; i < this.groupCount; i++) {
                if (this.groups.item(i).getRePrintInNewPage()) {
                    this.bExistsGrpToRePrintInNP = true;
                    return;
                }
            }
        }

        private pNotPendingFooters() {
            for(var i = 0; i < this.groupCount; i++) {
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
            if (this.idxGroupFooter !== NO_GROUP_INDEX) {
                if (this.vGroups[this.idxGroupFooter - 1].footerMustBeClosed) {
                    return csRptGetLineResult.CSRPTGLGROUPFOOTER;
                }
            }

            // if there are groups headers which need to be printed
            //
            if (this.idxGroupHeader !== NO_GROUP_INDEX) {
                if (this.vGroups[this.idxGroupHeader - 1].changed) {
                    return csRptGetLineResult.CSRPTGLGROUPHEADER;
                }
            }

            // if reach the end of the report and there are not groups
            // which need to be printed we have ended
            //
            if (pReportIsDone()) {
                return csRptGetLineResult.CSRPTGLEND;
            }

            // If there are group headers:
            //
            // - which need to be printed in a new page
            // o
            // - which need to be re-printed because we are in a new page
            //
            if (this.idxGroupToPrintNP > 0 || this.bHaveToRePrintGroup) {
                return csRptGetLineResult.CSRPTGLVIRTUALH;
            }

            // if there are groups footers which have to be printed
            //
            if (pEvalFooterToClose2()) {
                return csRptGetLineResult.CSRPTGLVIRTUALF;
            }

            // if there is nothing more to do we have finished
            //
            if (this.iRow > this.lastRowIndex && pNotPendingFooters()) {
                return csRptGetLineResult.CSRPTGLEND;
            }

            // if there are group headers to process
            //
            if (pGetLineAuxPrintHeader()) {
                return csRptGetLineResult.CSRPTGLVIRTUALH;
            }

            // if we get here we are in line of the detail
            //
            return csRptGetLineResult.CSRPTGLDETAIL;
        }

        // it returns every controls of a line
        // it moves through every row in the main recordset
        //
        public getLine(fields: cReportPageFields) {
            // to know if we need to print in a new page
            // because a group has changed its value
            //
            let bGetNewPage: boolean = false;

            if (fields !== null) {
                fields.clear();
            }

            // if there are not pending calls to close or open groups
            //
            if (!(this.bCloseFooter || this.bOpenHeader)) {

                // if there are not group headers to be re-printed in this page
                //
                if (!pExistsGroupHeadersToReprint()) {

                    // we process the line
                    //
                    let rslt: csRptGetLineResult = pGetLineWork(fields, bGetNewPage);
                    if (bGetNewPage) {
                        return csRptGetLineResult.CSRPTGLNEWPAGE;
                    }
                    else {
                        if (rslt === csRptGetLineResult.CSRPTGLEND || rslt === csRptGetLineResult.CSRPTGLVIRTUALF) {
                            return rslt;
                        }
                    }
                }
            }

            // if we must close footers
            //
            if (this.bCloseFooter) {
                return pGetLineAuxGroupFooter(fields);
            }
            // if the group has changed
            //
            else if (this.bOpenHeader) {
                return pGetLineAuxGroupHeader(bGetNewPage, fields);
            }
            // process a details line
            //
            else {
                return pGetLineAuxDetail(fields);
            }
        }

        private pGetLineWork(fields: cReportPageFields, bGetNewPage: boolean) {
            bGetNewPage = false;

            // if the user has cancel we have finished
            //
            if (pGetLineAuxReportCancel() === csRptGetLineResult.CSRPTGLEND) {
                return csRptGetLineResult.CSRPTGLEND;
            }

            // if we reach the end of the report and there are not groups to process
            // we have finished
            //
            let rslt: csRptGetLineResult = pGetLineWorkAuxReportEnd();
            if (rslt === csRptGetLineResult.CSRPTGLEND || rslt === csRptGetLineResult.CSRPTGLVIRTUALF) {
                return rslt;
            }

            // field collection for this line
            //
            fields = new cReportPageFields();

            // if we need to print the group in a new page
            //
            if (this.idxGroupToPrintNP > 0) {
                pGetLineAuxPrintGroupInNP();
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
                        pEvalFooterToClose();
                    }

                    // if we don't need to re-print group footers
                    //
                    if (!this.bCloseFooter) {
                        // if have done all the pending work we have finished
                        //
                        if (pGetLineAuxReportIsDone() === csRptGetLineResult.CSRPTGLEND) {
                            return csRptGetLineResult.CSRPTGLEND;
                        }

                        // continue with the next group
                        //
                        pGetLineAuxDoGroups(bGetNewPage);
                    }
                }
            }
            return csRptGetLineResult.CSRPTGLNONE;
        }

        private pGetLineAuxPrintGroupInNP() {
            this.idxGroupHeader = this.idxGroupToPrintNP;
            this.idxGroupToPrintNP = NO_GROUP_INDEX;
            this.bOpenHeader = true;
        }

        private pReportIsDone() {
            // if we have finished return csRptGLEnd
            //
            if (this.rows === null || this.iRow > this.recordCount -1) {
                // if there are not pending footers we have finished
                // 
                if (!this.bPrintFooter) {
                    return true;
                }
            }
            return false;
        }

        private pGetLineWorkAuxReportEnd() {
            // if we have finished return csRptGLEnd
            //
            if (this.rows === null || this.iRow > this.recordCount - 1) {
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
                        // getLine() -> pGetLineWork() -> pGetLineWorkAuxReportEnd()
                        // to print the footer
                        //
                        this.bEvalPreGroups = false;

                        return csRptGetLineResult.CSRPTGLVIRTUALF;
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
                            // calls to getLine() -> pGetLineWork() -> pGetLineWorkAuxReportEnd()
                            //
                            this.vGroups[this.vGroups.Length - 1].footerMustBeClosed = true;
                        }
                    }
                }
                // if there are no more footers to be closed we have finished
                // 
                else {
                    reportDone();
                    return csRptGetLineResult.CSRPTGLEND;
                }
            }
            return csRptGetLineResult.CSRPTGLNONE;
        }

        private pGetLineAuxReportCancel() {
            // if the user has canceled we have finished
            //
            if (!OnProgress("", 0, this.iRow, this.recordCount)) {
                reportDone();
                return csRptGetLineResult.CSRPTGLEND;
            }
            else {
                return csRptGetLineResult.CSRPTGLNONE;
            }
        }

        private pGetLineAuxReportIsDone() {
            // if we have printed the las footer we have finished
            //
            if (this.iRow > this.lastRowIndex && pNotPendingFooters()) {
                reportDone();
                this.bPrintFooter = false;
                return csRptGetLineResult.CSRPTGLEND;
            }
            return csRptGetLineResult.CSRPTGLNONE;
        }

        private pEvalFooterToClose2() {
            for(var i = this.groupCount-1; i > -1; i--) {
                if (this.vGroups[i].footerMustBeClosed) {
                    return true;
                }
            }
            return false;
        }

        private pEvalFooterToClose() {
            for(var i = this.groupCount-1; i > -1; i--) {
                if (this.vGroups[i].footerMustBeClosed) {
                    this.idxGroupFooter = i + 1;

                    // we have to check only the footer or the group which has
                    // changed and its subgroups
                    //
                    if (this.idxGroupFooter > this.groupIndexChange) {

                        // we need to close the footer of the group which contains it
                        //
                        let -1].footerMustBeClosed: this.vGroups[i = true;
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
            for(var i = 0; i < this.groupCount; i++) {

                if (!this.vGroups[i].grandTotalGroup) {

                    if (this.vGroups[i].value === null) {
                        return true;
                    }

                    let col: number = this.vGroups[i].indexField;
                    let row: number = this.vRowsIndex[this.iRow2];

                    switch (this.vGroups[i].comparisonType)
                    {
                        case csRptGrpComparisonType.CSRPTGRPTEXT:
                            let text: string = cReportGlobals.valVariant(this.rows.Rows[row][col]).toString().toLowerCase();
                            if (this.vGroups[i].value.toString() !== text) {
                                return true;
                            }
                            break;
                        case csRptGrpComparisonType.CSRPTGRPNUMBER:
                            let number: number = cUtil.val(cReportGlobals.valVariant(this.rows.Rows[row][col]));
                            if (this.vGroups[i].value !== number) {
                                return true;
                            }
                            break;
                        case csRptGrpComparisonType.CSRPTGRPDATE:
                            let date: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(this.rows.Rows[row][col]));
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
            let i: number = 0;
            let j: number = 0;
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let row1: number = this.vRowsIndex[j];
                    let row2: number = this.vRowsIndex[j - 1];
                    let date1: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(this.rows.Rows[row1][orderBy]));
                    let date2: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(this.rows.Rows[row2][orderBy]));
                    if (date1 < date2) {
                        if (!OnProgress("", 0, q, t)) {
                            return false;
                        }
                        changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!OnProgress("", 0, q, t)) {
                    return false;
                }
                if (!bChanged) {
                    break;
                }
            }
            return true;
        }

        private orderDateDesc(first: number, last: number, orderBy: number) {
            let i: number = 0;
            let j: number = 0;
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let row1: number = this.vRowsIndex[j];
                    let row2: number = this.vRowsIndex[j - 1];
                    let date1: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(this.rows.Rows[row1][orderBy]));
                    let date2: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(this.rows.Rows[row2][orderBy]));
                    if (date1 > date2) {
                        if (!OnProgress("", 0, q, t))  {
                            return false; 
                        }
                        changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!OnProgress("", 0, q, t))  {
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
            for(var i = 0; i < this.groupCount; i++) {

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
                    pGroupChanged(i, bGetNewPage);
                    break;
                }
                else {
                    pEvalGroupChange(i);

                    if (this.vGroups[i].changed) {
                        this.idxGroupHeader = i + 1;

                        // if it is the first time we are printing groups
                        //
                        if (this.firstGroup) {
                            pOpenGroupHeader(i);
                        }
                        // the first thing to do is to close footers
                        //
                        else {
                            pCloseGroupFooters(i);
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
            for(var j = this.groupIndexChange - 1; j < this.idxGroupFooter; j++) {
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

        private changeGroup(i: number, value: object) {
            this.vGroups[i].value = value;
            this.vGroups[i].changed = true;
            if (!this.firstGroup) {
                this.vGroups[i].footerMustBeClosed = true;
            }
            pEvalGroupChangedAux(i + 1);
        }

        private pEvalGroupChange(i: number) {
            if (this.vGroups[i].grandTotalGroup) {
                if (this.vGroups[i].value === null) {
                    changeGroup(i, "1");
                }
            }
            else {
                let col: number = this.vGroups[i].indexField;
                let row: number = this.vRowsIndex[this.iRow2];
                switch (this.vGroups[i].comparisonType)
                {
                    case csRptGrpComparisonType.CSRPTGRPTEXT:
                        let text: string = cReportGlobals.valVariant(this.rows.Rows[row][col]).toString().toLowerCase();
                        if (this.vGroups[i].value === null) {
                            changeGroup(i, text);
                        }
                        else if (this.vGroups[i].value.toString() !== text) {
                            changeGroup(i, text);
                        }
                        break;

                    case csRptGrpComparisonType.CSRPTGRPNUMBER:
                        let number: number = cUtil.val(cReportGlobals.valVariant(this.rows.Rows[row][col]));
                        if (this.vGroups[i].value === null) {
                            changeGroup(i, number);
                        }
                        else if (this.vGroups[i].value !== number) {
                            changeGroup(i, number);
                        }
                        break;

                    case csRptGrpComparisonType.CSRPTGRPDATE:
                        let date: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(this.rows.Rows[row][col]));
                        if (this.vGroups[i].value === null) {
                            changeGroup(i, date);
                        }
                        else if (this.vGroups[i].value !== date) {
                            changeGroup(i, date);
                        }
                        break;
                }
            }
        }

        private pEvalGroupChangedAux(i: number) {
            for (; i < this.groupCount; i++) {
                pGroupChangedAux(i);
            }
        }

        private pGroupChangedAux(i: number) {
            let col: number = this.vGroups[i].indexField;
            let row: number = this.vRowsIndex[this.iRow2];
            switch (this.vGroups[i].comparisonType)
            {
                case csRptGrpComparisonType.CSRPTGRPTEXT:
                    this.vGroups[i].value = cReportGlobals.valVariant(this.rows.Rows[row][col]).toString().toLowerCase();
                    break;
                case csRptGrpComparisonType.CSRPTGRPNUMBER:
                    this.vGroups[i].value = cUtil.val(cReportGlobals.valVariant(this.rows.Rows[row][col]));
                    break;
                case csRptGrpComparisonType.CSRPTGRPDATE:
                    this.vGroups[i].value = cReportGlobals.dateValue(cReportGlobals.valVariant(this.rows.Rows[row][col]));
                    break;
            }
        }

        private pGroupChanged(i: number, bGetNewPage: boolean) {
            this.idxGroupHeader = i + 1;
            pGroupChangedAux(i);

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
                this.idxGroupToPrintNP = NO_GROUP_INDEX;
            }

            // set this flag ON to open this group in a future
            // call to getLine(). only if there are more groups
            //
            if (i < this.groupCount - 1) {
                this.vGroups[i + 1].changed = true;
            }
            this.bOpenHeader = true;
        }

        private pGetLineAuxGroupFooter(fields: cReportPageFields) {
            let footerSec: cReportSection = null;
            let ctrl: cReportControl = null;
            let secLn: cReportSectionLine = null;

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

                return csRptGetLineResult.CSRPTGLVIRTUALF;
            }
            else {

                // if there are more footers to be printed this
                // flag will be turn on in the next call to getLine()
                //
                this.bCloseFooter = false;

                // to force the next call to return CSRPTGLVIRTUALF
                //
                this.bEvalPreGroups = true;

                footerSec = this.groups.item(this.idxGroupFooter - 1).getFooter();

                getLineAux(footerSec, fields);

                return csRptGetLineResult.CSRPTGLGROUPFOOTER;
            }
        }

        private pGetLineAuxGroupHeader(bGetNewPage: boolean, fields: cReportPageFields) {
            let headerSec: cReportSection = null;

            if (bGetNewPage && !this.firstGroup) {
                // in the deatil and group headers the row for formulas
                // is the current row
                //
                this.iRowFormula = this.iRow;

                return csRptGetLineResult.CSRPTGLNEWPAGE;
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

                    return csRptGetLineResult.CSRPTGLVIRTUALH;
                }
                else {

                    this.bOpenHeader = false;

                    // to force the next call to getLine() to return CSRPTGLVIRTUALF
                    //
                    this.bEvalPreGroups = true;
                    headerSec = this.groups.item(this.idxGroupHeader - 1).getHeader();
                    getLineAux(headerSec, fields);

                    // set this flag on to indicate we have footers to close
                    //
                    this.bPrintFooter = true;

                    // we return a group line
                    //
                    return csRptGetLineResult.CSRPTGLGROUPHEADER;
                }
            }
        }

        private pGetLineAuxDetail(fields: cReportPageFields) {
            this.firstGroup = false;

            getLineAux(this.details.item(0), fields);

            // we return a detail line
            //
            return csRptGetLineResult.CSRPTGLDETAIL;
        }

        private getLineAux(sec: cReportSection, fields: cReportPageFields) {
            // for every control in every section line of sec
            // we need to create a new cPageField
            //
            let field: cReportPageField = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;
            let isVisible: boolean = false;
            let indexCtrl: number = 0;

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
                isVisible = cUtil.val(this.compiler.resultFunction(sec.getFormulaHide())) !== 0;
            }
            else {
                isVisible = true;
            }

            if (isVisible) {
                // for every section line in sec
                //
                for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                    secLn = sec.getSectionLines().item(_i);
                    this.lineIndex++;

                    if (secLn.getHasFormulaHide()) {
                        this.compiler.evalFunction(secLn.getFormulaHide());
                        isVisible = cUtil.val(this.compiler.resultFunction(secLn.getFormulaHide())) !== 0;
                    }
                    else {
                        isVisible = true;
                    }

                    if (isVisible) {
                        // for every control in the section line
                        //
                        let collByLeft: number[] = secLn.getControls().getCollByLeft();
                        for (indexCtrl = 0; indexCtrl < collByLeft.Length; indexCtrl++) {
                            ctrl = secLn.getControls().item(collByLeft[indexCtrl]);

                            // add a new field to the collection
                            //
                            field = fields.add(null, "");
                            field.setIndexLine(this.lineIndex);

                            if (ctrl.getHasFormulaValue()) {
                                field.setValue(
                                    cReportGlobals.format(
                                        this.compiler.resultFunction(ctrl.getFormulaValue()),
                                        ctrl.getLabel().getAspect().getFormat()));
                            }
                            else {
                                let w_label: cReportLabel = null;
                                switch (ctrl.getControlType())
                                {
                                    case csRptControlType.CSRPTCTFIELD:

                                        pGetIndexRows(indexRows, indexRow, indexField, ctrl);

                                        if (this.collRows[indexRows] !== null) {
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
                                            let value: object = this.collRows[indexRows].Rows[indexRow][indexField];
                                            field.setValue(
                                                cReportGlobals.format(
                                                    cReportGlobals.valVariant(value),
                                                    ctrl.getLabel().getAspect().getFormat()));
                                        }
                                        break;

                                    case csRptControlType.CSRPTCTLABEL:
                                        w_label = ctrl.getLabel();
                                        field.setValue(cReportGlobals.format(w_label.getText(), w_label.getAspect().getFormat()));
                                        break;

                                    case csRptControlType.CSRPTCTIMAGE:
                                        w_label = ctrl.getLabel();
                                        field.setValue(cReportGlobals.format(w_label.getText(), w_label.getAspect().getFormat()));
                                        field.setImage(ctrl.getImage().getImage());
                                        break;

                                    case csRptControlType.CSRPTCTDBIMAGE:
                                        pGetIndexRows(indexRows, indexRow, indexField, ctrl);
                                        if (this.collRows[indexRows] !== null) {
                                            field.setImage(pGetImage(indexRows, indexField, indexRow));
                                        }
                                        break;

                                    case csRptControlType.CSRPTCTCHART:
                                        pGetIndexRows(indexRows, indexRow, indexField, ctrl);
                                        field.setImage(pGetChartImage(indexRows, indexField, indexRow, ctrl));
                                        break;
                                }
                            }

                            if (ctrl.getHasFormulaHide()) {
                                field.setVisible(cUtil.val(this.compiler.resultFunction(ctrl.getFormulaHide())) !== 0);
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
            indexRows = (ctrl.getField().getIndex() / 1000);
            indexField = ctrl.getField().getIndex() - (indexRows * 1000);

            if (indexRows === 0) {
                indexRow = this.vRowsIndex[this.iRow2];
            }
            else {
                indexRow = this.vRowsIndexAux[indexRows];
            }
        }

        public init(oLaunchInfo: cReportLaunchInfo) {
            try {
                setLaunchInfo(oLaunchInfo);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "Init", C_MODULE, "");
                return false;
            }
        }

        // run report
        //
		public launch() {
			return launch(null);
		}
        public launch(oLaunchInfo: cReportLaunchInfo) {
            try {
                let recordsets: List<object[]> = null;
                let rs: DataTable = null;

                this.compiler.setReport(this);
                this.compiler.initGlobalObject();

                if (oLaunchInfo === null) {
                    if (this.launchInfo === null) {
                        throw new ReportLaunchInfoNoDefined(
                            C_MODULE,
                            cReportError.errGetDescript(
                                            csRptErrors.LAUNCH_INFO_UNDEFINED));
                    }
                }
                else {
                    setLaunchInfo(oLaunchInfo);
                }

                if (this.launchInfo.getPrinter() === null) {
                    throw new ReportLaunchInfoNoDefined(
                        C_MODULE,
                        cReportError.errGetDescript(
                                        csRptErrors.PRINTER_NOT_DEFINED));
                }

                if (!OnProgress("Preparando el reporte")) {
                    return false;
                }

                // we need to sort all controls using the zorder property
                //
                sortCollection();

                if (!OnProgress("Compiling report ...")) {
                    return false;
                }

                // compile report
                //
                if (!compileReport()) {
                    return false;
                }

                // we need to sort all controls by his aspect.left property
                //
                pSortControlsByLeft();

                if (!OnProgress("Querying database")) {
                    return false;
                }

                recordsets = new List<object[]>();

                this.collRows = new DataTable[1];

                // get the main recordset
                //
                if (!pGetData(this.rows, rs, this.connect, true, recordsets)) {
                    return false;
                }

                // the first element contains the main recordset
                //
                this.collRows[0] = this.rows;

                pInitImages();

                // get additional recordsets
                //
                if (!pGetDataAux(recordsets)) {
                    return false;
                }

                if (!initGroups(rs, pGetMainDataSource(recordsets))) {
                    return false;
                }

                if (!OnProgress("Initializing report")) {
                    return false;
                }

                if (!initControls(recordsets)) {
                    return false;
                }

                // create the definition of this report
                //
                if (!createPageSetting()) {
                    return false;
                }

                this.pages.clear();
                this.lineIndex = 0;

                // globals initialization
                //
                this.bPrintFooter = false;
                this.bLastFootersWasPrinted = false;
                this.groupIndexChange = NO_GROUP_INDEX;
                this.iRow2 = 0;
                this.iRowFormula = 0;
                pSetGroupFormulaHeaders();
                pSetGroupsInCtrlFormulaHide();
                pSetIndexColInGroupFormulas(recordsets);
                pInitRowFormulas();

                // check if there are groups which need to be reprinted when the page change
                //
                pExistsGroupToReprintInNP();

                // to force the evaluate of the groups in the first page
                //
                this.bEvalPreGroups = true;
                this.bCloseFooter = false;
                this.bOpenHeader = false;

                let formula: cReportFormula = null;
                for(var _i = 0; _i < this.formulas.count(); _i++) {
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
                    case csRptLaunchAction.CSRPTLAUNCHPRINTER:
                        if (!this.launchInfo.getObjPaint().printReport()) {
                            return false;
                        }
                        break;
                    case csRptLaunchAction.CSRPTLAUNCHFILE:
                        if (!this.launchInfo.getObjPaint().makeXml()) {
                            return false;
                        }
                        break;
                    case csRptLaunchAction.CSRPTLAUNCHPREVIEW:
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
                if (this.launchInfo.getAction() !== csRptLaunchAction.CSRPTLAUNCHPREVIEW) {
                    this.launchInfo.getObjPaint().setReport(null);
                    this.launchInfo.setObjPaint(null);
                }

                throw new ReportException(csRptErrors.ERROR_WHEN_RUNNING_REPORT,
                                          C_MODULE,
                                          "Error when running report.\n\n"
                                          + "Info: " + ex.Message + "\n"
                                          + "Source: " + ex.Source + "\n"
                                          + "Stack trace: " + ex.StackTrace + "\n"
                                          + "Description: " + ex.toString()
                                          );
            }
        }

        public loadSilent(fileName: string) {

            try {
                let docXml: CSXml.cXml = null;
                docXml = new CSXml.cXml();

                let f: CSKernelFile.cFile = null;
                f = new CSKernelFile.cFile();

                this.path = cFile.getPath(fileName);
                this.name = cFile.getFileName(fileName);

                docXml.init(null); {
                docXml.setFilter(C_FILEEX); {
                docXml.setName(this.name); {
                docXml.setPath(this.path); {

                if (!docXml.openXml()) {
                    return false;
                }

                this.path = docXml.getPath();
                this.name = docXml.getName();
                let property: CSXml.cXmlProperty = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
                this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

                return nLoad(docXml);
            }
            catch (ex) {
                cError.mngError(ex, "LoadSilent", C_MODULE, "");
                return false;
            }
        }

        public load(commDialog: object) {
            try {
                let docXml: CSXml.cXml = null;
                docXml = new CSXml.cXml();

                docXml.init(commDialog); {
                docXml.setFilter(C_FILEEX); {

                if (this.name !== "") {
                    docXml.setName(this.name); {
                }
                else {
                    docXml.setPath(this.pathDefault + "\\*." + C_FILEEX); {
                }

                docXml.setPath(this.path); {

                if (!docXml.openXmlWithDialog()) {
                    return false;
                }

                this.path = docXml.getPath();
                this.name = docXml.getName();
                let property: CSXml.cXmlProperty = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
                this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

                return nLoad(docXml);
            }
            catch (ex) {
                cError.mngError(ex, "Load", C_MODULE, "");
                return false;
            }
        }

        public save(commDialog: object, withDialog: boolean) {
            let docXml: CSXml.cXml = null;
            docXml = new CSXml.cXml();

            docXml.init(commDialog); {
            docXml.setFilter(C_FILEEX); {
            docXml.setName(this.name); {
            docXml.setPath(this.path); {

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

            let xProperty: CSXml.cXmlProperty = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("RptName");
            xProperty.setValue(eTypes.eText, this.name);
            docXml.addProperty(xProperty); {

            xProperty.setName("ReportDisconnected");
            xProperty.setValue(eTypes.eBoolean, this.reportDisconnected);
            docXml.addProperty(xProperty); {

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

            xProperty.setName(C_NODERPTHEADERS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < this.headers.count(); _i++) {
                sec = this.headers.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODERPTDETAILS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < this.details.count(); _i++) {
                sec = this.details.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODERPTFOOTERS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < this.footers.count(); _i++) {
                sec = this.footers.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODEGROUPS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            let group: cReportGroup = null;

            for(var _i = 0; _i < this.groups.count(); _i++) {
                group = this.groups.item(_i);
                group.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODERPTFORMULAS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            let formula: cReportFormula = null;
            for(var _i = 0; _i < this.formulas.count(); _i++) {
                formula = this.formulas.item(_i);
                if (!formula.getNotSave()) {
                    formula.save(docXml, nodeObj);
                }
            }

            xProperty.setName(C_NODEPAPERINFO);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);
            this.paperInfo.save(docXml, nodeObj);

            if (!docXml.save()) {
                return false;
            }

            if (!docXml.openXml()) {
                return false;
            }

            if (!nLoad(docXml)) {
                return false;
            }

            return true;
        }

        public loadSilentData(fileName: string) {
            let docXml: CSXml.cXml = null;
            docXml = new CSXml.cXml();

            this.path = CSKernelFile.cFile.getPath(fileName);
            this.name = CSKernelFile.cFile.getFileName(fileName);

            docXml.init(null); {
            docXml.setFilter(C_FILEDATAEX); {
            docXml.setName(this.name); {
            docXml.setPath(this.path); {

            if (!docXml.openXml()) {
                return false;
            }

            this.path = docXml.getPath();
            this.name = docXml.getName();

            let property: CSXml.cXmlProperty = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
            this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

            return nLoadData(docXml);
        }

        public loadData(commDialog: object) {
            let docXml: CSXml.cXml = null;
            docXml = new CSXml.cXml();

            docXml.init(commDialog); {
            docXml.setFilter(C_FILEDATAEX); {
            docXml.setName(this.name); {
            docXml.setPath(this.path); {

            if (!docXml.openXmlWithDialog()) {
                return false;
            }

            this.path = docXml.getPath();
            this.name = docXml.getName();
            let property: CSXml.cXmlProperty = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
            this.reportDisconnected = property.getValueBool(eTypes.eBoolean);

            return nLoadData(docXml);
        }

        public saveData(commDialog: object, withDialog: boolean) {
            let docXml: CSXml.cXml = null;
            docXml = new CSXml.cXml();

            docXml.init(commDialog); {
            docXml.setFilter(C_FILEDATAEX); {
            docXml.setName(getFileName(this.name) + "-data.csd"); {
            docXml.setPath(this.path); {

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

            Application.DoEvents();

            let mouse: cMouseWait = new cMouseWait();
            let dataName: string = "";
            let dataPath: string = "";

            dataName = docXml.getName();
            dataPath = docXml.getPath();

            let xProperty: CSXml.cXmlProperty = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("RptName");
            xProperty.setValue(eTypes.eText, dataName);
            docXml.addProperty(xProperty); {

            // Configuracion de paginas
            let nodeObj: XmlNode = null;
            let nodeObjAux: XmlNode = null;

            // Paginas
            let page: cReportPage = null;

            xProperty.setName(C_NODERPTPAGES);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < this.pages.count(); _i++) {
                page = this.pages.item(_i);
                page.save(docXml, nodeObj);
                if (!saveDataForWeb(page, dataName, dataPath)) {
                    return false;
                }
            }

            if (!docXml.save()) {
                return false;
            }

            if (!docXml.openXml()) {
                return false;
            }

            if (!nLoadData(docXml)) {
                return false;
            }

            mouse.Dispose();

            return true;
        }

        private saveDataForWeb(page: cReportPage, dataName: string, dataPath: string) {
            let docXml: CSXml.cXml = null;
            docXml = new CSXml.cXml();

            docXml.init(null); {
            docXml.setFilter("xml"); {
            docXml.setName(getFileName(dataName) + "-1.xml"); {
            docXml.setPath(dataPath); {

            if (!docXml.newXml()) {
                return false;
            }

            dataName = docXml.getName();

            let xProperty: CSXml.cXmlProperty = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Page_" + page.getPageNumber().toString());
            xProperty.setValue(eTypes.eText, dataName);
            docXml.addProperty(xProperty); {

            let nodeObj: XmlNode = null;

            xProperty.setName("Page");
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            page.saveForWeb(docXml, nodeObj);

            return docXml.save();
        }

        public getValueFromRs(colIndex: number) {
            return this.rows.Rows[this.vRowsIndex[this.iRow2]][colIndex];
        }

        public getValueString(controlName: string) {
            let value: var = getValue(controlName, false);
            if (value === null) {
                return "";
            }
            else {
                return value.toString();
            }
        }

        public getValue(controlName: string) {
            return getValue(controlName, false);
        }

        public getValue(controlName: string, notFormat: boolean) {
            let ctrl: cReportControl = null;
            let found: boolean = false;
            let iRow: number = 0;

            if (this.iRowFormula > this.lastRowIndex) {
                iRow = this.lastRowIndex;
            }
            else {
                iRow = this.iRowFormula;
            }

            for(var _i = 0; _i < this.controls.count(); _i++) {
                ctrl = this.controls.item(_i);
                if (ctrl.getName().ToUpper() === controlName.ToUpper()) {
                    found = true;
                    break;
                }
            }

            if (!found) {
                throw new ReportException(csRptErrors.CONTROL_NOT_FOUND,
                                          C_MODULE,
                                          cReportError.errGetDescript(csRptErrors.CONTROL_NOT_FOUND, controlName)
                                          );
            }

            switch (ctrl.getControlType())
            {
                case csRptControlType.CSRPTCTFIELD:

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

                    if (this.collRows[indexRows] !== null) {
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
                        let value: object = this.collRows[indexRows].Rows[indexRow][indexField];
                        if (ctrl.getLabel().getAspect().getFormat() !== "" && notFormat === false) {
                            return cReportGlobals.format(
                                        cReportGlobals.valVariant(value),
                                        ctrl.getLabel().getAspect().getFormat());

                            // this is the same
                        }
                        else {
                            return cReportGlobals.valVariant(value);
                        }
                    }
                    else {
                        return null;
                    }

                case csRptControlType.CSRPTCTLABEL:
                case csRptControlType.CSRPTCTIMAGE:
                    if (ctrl.getHasFormulaValue()) {
                        if (ctrl.getFormulaValue().getHaveToEval()) {
                            let value: object = this.compiler.resultFunction(ctrl.getFormulaValue());
                            if (ctrl.getLabel().getAspect().getFormat() !== "" && notFormat === false) {
                                return cReportGlobals.format(value, ctrl.getLabel().getAspect().getFormat());
                            }
                            else {
                                return value;
                            }
                        }
                        else {
                            let value: object = ctrl.getFormulaValue().getLastResult();
                            if (ctrl.getLabel().getAspect().getFormat() !== "" && notFormat === false) {
                                return cReportGlobals.format(value, ctrl.getLabel().getAspect().getFormat());
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

        private initControls(recordsets: List<object[]>) {
            let ctrl: cReportControl = null;
            let serie: cReportChartSerie = null;
            let idx: number = 0;

            for(var _i = 0; _i < this.controls.count(); _i++) {
                ctrl = this.controls.item(_i);
                if (ctrl.getControlType() === csRptControlType.CSRPTCTFIELD
                    || ctrl.getControlType() === csRptControlType.CSRPTCTDBIMAGE) {
                    idx = ctrl.getField().getIndex();
                    if (!pInitCtrls(ctrl, idx, recordsets, ctrl.getField().getName())) {
                        return false;
                    }
                    ctrl.getField().setIndex(idx);
                }
                else if (ctrl.getControlType() === csRptControlType.CSRPTCTCHART) {
                    if (ctrl.getChart().getGroupFieldName() !== "") {
                        idx = -1;
                        pInitCtrls(ctrl, idx, recordsets, ctrl.getChart().getGroupFieldName());
                        ctrl.getChart().setGroupFieldIndex(idx);
                    }
                    else {
                        ctrl.getChart().setGroupFieldIndex(-1);
                    }

                    for(var _j = 0; _j < ctrl.getChart().getSeries().count(); _j++) {
                        serie = ctrl.getChart().getSeries().item(_j);
                        idx = serie.getValueIndex();
                        if (!pInitCtrls(ctrl, idx, recordsets, serie.getValueFieldName())) {
                            return false;
                        }
                        serie.setValueIndex(idx);
                        idx = serie.getLabelIndex();
                        if (!pInitCtrls(ctrl, idx, recordsets, serie.getLabelFieldName())) {
                            return false;
                        }
                        serie.setLabelIndex(idx);
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
                return columnName === fieldName.Replace(" ", "_").Replace(".","");
            }
        }

        private pInitCtrls(ctrl: cReportControl, idx: number, recordsets: List<object[]>, fieldName: string) {
            let found: boolean = false;
            let j: number = 0;
            let bIsDBImage: boolean = false;

            let dataSource: string = pGetDataSource(fieldName);

            // index of the group which contains the control
            //
            let k: number = 0;

            for(var _i = 0; _i < recordsets.Count; _i++) {
                let varRs: object[] = recordsets[_i];
                let rsDataSource: string = varRs[1];
                if (rsDataSource.ToUpper() === dataSource.ToUpper() || dataSource === "") {
                    let rs: DataTable = varRs[0];

                    for (j = 0; j < rs.Columns.Count; j++) {
                        if (compareColumnName(rs.Columns[j].ColumnName.ToUpper(), cReportGlobals.getRealName(fieldName).ToUpper())) {
                            // TODO: we need to check what is the value of rs.Columns[j].DataType
                            //       when the column contains a binary field (tipicaly used for images)
                            //
                            let typeCode: System.TypeCode = System.Type.GetTypeCode(rs.Columns[j].DataType);
                            bIsDBImage = typeCode === System.TypeCode.Object;
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
                idx = j + k;
                if (bIsDBImage) {
                    ctrl.setControlType(csRptControlType.CSRPTCTDBIMAGE);
                }
            }
            else {
                throw new ReportException(csRptErrors.FIELD_NOT_FOUND,
                                            C_MODULE,
                                            cReportError.errGetDescript(csRptErrors.FIELD_NOT_FOUND, ctrl.getName(), fieldName)
                                            );
            }
            return true;
        }

        private pGetDataSource(name: string) {
            let n: number = 0;
            n = name.IndexOf("}.", 0);
            if (n === -1) {
                return "";
            }
            else {
                n = n - 1;
                return name.Substring(1, n);
            }
        }

        private pInitImages() {
            pDestroyImages();
            this.images = new Dictionary();
        }

        private pDestroyImages() {
            if (this.images !== null) {
                for(var i_ = 0; i_ < this.images.length; i_++) {
                    item.Value.Dispose();
                }
                this.images = null;
            }
        }

        private pGetChartImage(indexRows: number, indexField: number, indexRow: number, ctrl: cReportControl) {
            if (ctrl.getChart().getChartCreated()) {
                return ctrl.getChart().getImage();
            }
            else {
                if (ctrl.getChart().make(this.collRows[indexRows].Rows, ctrl.getLabel().getAspect().getFormat(), false, "")) {
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
            let key: string = "";
            let image: Image = null;
            let fileInTMP: string = "";

            key = "k" + indexRows.toString() + indexField.toString() + indexRow.toString();
            if(this.images.ContainsKey(key)) {
                image = this.images[key];
            }
            else {
                // we are optimistic. if I don't get a picture
                // we return null but don't complaint
                //
                let bytes: byte[] = null;

                // it looks ugly, don't you think?
                //
                // maybe this help a litle:
                //
                //    this.vCollRows(IndexRows)    a matrix with the data 
                //                              contained in the datasource
                //                              referd by this control
                //
                //    (IndexField, IndexRow)    a cell in this matrix
                //
                let value: object = this.collRows[indexRows].Rows[indexRow][indexField];
                bytes = value;

                fileInTMP = pGetFileImageInTMP(bytes);

                if (fileInTMP !== "") {
                    try {
                        let tmpImage: var = Image.FromFile(fileInTMP);
                        image = new Bitmap(tmpImage);
                        tmpImage.Dispose();
                        this.images.Add(key, image);
                    }
                    catch(ex) {
                        // we don't care
                    }
                }
            }
            return image;
        }

        private pGetFileImageInTMP(bytes: byte[]) {
            let fileName: string = "~csrptImage";
            fileName = cUtil.getValidPath(System.IO.Path.GetTempPath()) + fileName;

            let fileEx: CSKernelFile.cFileEx = null;
            fileEx = new CSKernelFile.cFileEx();
            if (!fileEx.fileDelete(fileName)) { return ""; }

            let file: CSKernelFile.cFile = new CSKernelFile.cFile();
            if (!file.open(fileName, eFileMode.eBinaryWrite, true, true, eFileAccess.eLockWrite, false, false)) {
                return "";
            }

            if (!file.binaryWrite(bytes)) {
                return "";
            }

            file.close();

            return fileName;
        }

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

                // finaly we copy into this.PaperInfo the definicion found in LaunchInfo.
                //
                // when the report is called without define a printer
                // whe assign a defult printer and asign this.PaperInfo 
                // to this.LaunchInfo.Printer.PaperInfo, so sometimes we
                // don't need to do that
                //
                if (!object.ReferenceEquals(this.paperInfo, this.launchInfo.getPrinter().getPaperInfo())) {
                    this.paperInfo.setHeight(this.launchInfo.getPrinter().getPaperInfo().getHeight());
                    this.paperInfo.setWidth(this.launchInfo.getPrinter().getPaperInfo().getWidth());
                }
            }
        }

        public getGroupTotal(colIndex: number, indexGroup: number) {
            let iRow: number = 0;
            let rtn: number = 0;
            let i: number = 0;

            if (indexGroup === -1) {
                for (iRow = 0; iRow < this.recordCount; iRow++) {
                    rtn = rtn + cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    for (iRow = 0; iRow < this.recordCount; iRow++) {
                        rtn = rtn + cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                    }
                }
                else {
                    for (iRow = this.iRow; iRow < this.recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else  {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let text: string = cReportGlobals.valVariant(value);
                                        if (this.vGroups[i].value !== text.toLowerCase()) {
                                            return rtn;
                                        }
                                    }

                                    if (i === indexGroup) {
                                        let value: object = this.rows.Rows[colIndex][this.vRowsIndex[iRow]];
                                        rtn = rtn + cReportGlobals.valVariant(value);
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let number: number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }

                                    if (i === indexGroup) {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][colIndex];
                                        rtn = rtn + cReportGlobals.valVariant(value);
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let date: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }

                                    if (i === indexGroup) {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][colIndex];
                                        rtn = rtn + cReportGlobals.valVariant(value);
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return rtn;
        }

        public getGroupMax(colIndex: number, indexGroup: number) {
            let iRow: number = 0;
            let rtn: number = 0;
            let i: number = 0;

            rtn = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);

            if (indexGroup === -1) {
                for (iRow = 0; iRow < this.recordCount; iRow++) {
                    let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                    if (rtn < value) {
                        rtn = value;
                    }
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    for (iRow = 0; iRow < this.recordCount; iRow++) {
                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                        if (rtn < value) {
                            rtn = value;
                        }
                    }
                }
                else {
                    for (iRow = this.iRow; iRow < this.recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let text: string = cReportGlobals.valVariant(value);
                                        if (this.vGroups[i].value !== text.toLowerCase()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        if (rtn < value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let number: number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        if (rtn < value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let date: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        if (rtn < value) {
                                            rtn = value;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return rtn;
        }

        public getGroupMin(colIndex: number, indexGroup: number) {
            let iRow: number = 0;
            let rtn: number = 0;
            let i: number = 0;

            rtn = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);

            if (indexGroup === -1) {
                for (iRow = 0; iRow < this.recordCount; iRow++) {
                    let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                    if (rtn > value) {
                        rtn = value;
                    }
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    for (iRow = 0; iRow < this.recordCount; iRow++) {
                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                        if (rtn > value) {
                            rtn = value;
                        }
                    }
                }
                else {
                    for (iRow = this.iRow; iRow < this.recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let text: string = cReportGlobals.valVariant(value);
                                        if (this.vGroups[i].value !== text.toLowerCase()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        if (rtn > value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let number: number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        if (rtn > value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let date: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value: number = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        if (rtn > value) {
                                            rtn = value;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return rtn;
        }

        public getGroupAverage(colIndex: number, indexGroup: number) {
            let iRow: number = 0;
            let rtn: number = 0;
            let i: number = 0;
            let count: number = 0;

            if (indexGroup === -1) {
                for (iRow = 0; iRow < this.recordCount; iRow++) {
                    rtn = rtn + cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                    count = count + 1;
                }
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {

                    for (iRow = 0; iRow < this.recordCount; iRow++) {
                        rtn = rtn + cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                        count = count + 1;
                    }

                }
                else {
                    for (iRow = this.iRow; iRow < this.recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let text: string = cReportGlobals.valVariant(value);
                                        if (this.vGroups[i].value !== text.toLowerCase()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        count = count + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let number: number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        count = count + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let date: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[iRow]][colIndex]);
                                        count = count + 1;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return cUtil.divideByZero(rtn, count);
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
            let iRow: number = 0;
            let rtn: number = 0;
            let i: number = 0;

            if (indexGroup === -1) {
                rtn = this.recordCount;
            }
            else {
                if (this.vGroups[indexGroup].grandTotalGroup) {
                    rtn = this.recordCount;
                }
                else {
                    for (iRow = this.iRow; iRow < this.recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let text: string = cReportGlobals.valVariant(value);
                                        if (this.vGroups[i].value !== text.toLowerCase()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let number: number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (this.vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value: object = this.rows.Rows[this.vRowsIndex[iRow]][this.vGroups[i].indexField];
                                        let date: Date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (this.vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + 1;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return rtn;
        }

        private addGroup(i: number, j: number, value: object) {
            // set the upper bound of the last group
            //
            this.vGroups[i + 1].groups[this.vGroups[i + 1].groups.Length - 1].last = j - 1;
            // add a new group
            //
            redimPreserve(this.vGroups[i + 1].groups, this.vGroups[i + 1].groups.Length + 1);
            this.vGroups[i + 1].groups[this.vGroups[i + 1].groups.Length - 1].first = j;
            this.vGroups[i + 1].value = value;       
        }

        private initGroups(rs: DataTable, mainDataSource: string) {
            this.groupCount = this.groups.count();
            this.firstGroup = true;

            if (this.groupCount === 0 || this.rows === null) {
                this.vGroups = null;
                return true;
            }
            else {
                this.vGroups = new T_Groups[this.groupCount];
                for (let t = 0; t < this.groupCount; t++) {
                    this.vGroups[t] = new T_Groups();
                }
            }

            if (!OnProgress("Ordenando el reporte", 0, 0, 0)) {
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
                dataSource = pGetDataSource(fieldName).ToUpper();
                fieldName = cReportGlobals.getRealName(fieldName).ToUpper();

                // the column must be in the main recordset
                //
                if (mainDataSource.ToUpper() !== dataSource && dataSource !== "") {
                    let w_item: cReportGroup = this.groups.item(i);
                    throw new ReportException(csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS,
                                                C_MODULE,
                                                cReportError.errGetDescript(
                                                                csRptErrors.GROUP_NOT_FOUND,
                                                                w_item.getName(),
                                                                w_item.getFieldName())
                                                );
                }
                this.vGroups[i].grandTotalGroup = this.groups.item(i).getGrandTotalGroup();

                if (!this.vGroups[i].grandTotalGroup) {
                    for (j = 0; j < rs.Columns.Count; j++) {
                        if (compareColumnName(rs.Columns[j].ColumnName.ToUpper(), fieldName)) {
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
                                                    C_MODULE,
                                                    cReportError.errGetDescript(
                                                                    csRptErrors.GROUP_NOT_FOUND,
                                                                    w_item.getName(),
                                                                    w_item.getFieldName())
                                                    );
                    }
                }
                this.vGroups[i].comparisonType = this.groups.item(i).getComparisonType();
                this.vGroups[i].oderType = this.groups.item(i).getOderType();

                this.vGroups[i].groups = new T_Group[1];
                this.vGroups[i].groups[0] = new T_Group();
            }

            let recordCount: number = 0;
            let q: number = 0;

            this.vGroups[0].groups = new T_Group[1];
            this.vGroups[0].groups[0] = new T_Group();
            recordCount = this.vRowsIndex.Length;
            this.vGroups[0].groups[0].first = 0;
            this.vGroups[0].groups[0].last = recordCount-1;
            recordCount = this.groupCount * recordCount;

            // we need to sort the data
            //
            for (i = 0; i < this.groupCount; i++) {
                for (j = 0; j < this.vGroups[i].groups.Length; j++) {
                    if (!this.vGroups[i].grandTotalGroup) {
                        if (this.vGroups[i].oderType === csRptGrpOrderType.CSRPTGRPASC) {
                            switch (this.vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:
                                    if (!orderTextAsc(this.vGroups[i].groups[j].first,
                                                        this.vGroups[i].groups[j].last,
                                                        this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:
                                    if (!orderNumberAsc(this.vGroups[i].groups[j].first,
                                                        this.vGroups[i].groups[j].last,
                                                        this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:
                                    if (!orderDateAsc(this.vGroups[i].groups[j].first,
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
                                case csRptGrpComparisonType.CSRPTGRPTEXT:
                                    if (!orderTextDesc(this.vGroups[i].groups[j].first,
                                                        this.vGroups[i].groups[j].last,
                                                        this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:
                                    if (!orderNumberDesc(this.vGroups[i].groups[j].first,
                                                            this.vGroups[i].groups[j].last,
                                                            this.vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:
                                    if (!orderDateDesc(this.vGroups[i].groups[j].first,
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
                    for (k = 0; k < this.vGroups[i].groups.Length; k++) {
                        // if it is a total group the next group
                        // is from the first to the last row in 
                        // the main recordset
                        // Si es un grupo de totales el proximo grupo
                        // first (position: 0)
                        // last  (position: this.vGroups[0].groups[0].last)
                        //
                        if (this.vGroups[i].grandTotalGroup) {
                            let t: number = i + 1;
                            let r: number = this.vGroups[t].groups.Length - 1;
                            this.vGroups[t].groups[r].last = -1;

                            // add a group item
                            //
                            redimPreserve(this.vGroups[t].groups, r + 2);
                            r = this.vGroups[t].groups.Length - 1;

                            // set the values of the new group item
                            //
                            this.vGroups[t].groups[t].first = 0;
                            this.vGroups[t].groups[t].last = this.vGroups[0].groups[0].last;
                            this.vGroups[t].value = null;
                        }
                        else {
                            for (j = this.vGroups[i].groups[k].first; j <= this.vGroups[i].groups[k].last; j++) {
                                q = q + 1;
                                if (!OnProgress("", 0, q, recordCount)) {
                                    return false;
                                }

                                let value: object = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[j]][this.vGroups[i].indexField]);
                                if (this.vGroups[i + 1].value === null) {
                                    addGroup(i, j, value);
                                }
                                else {
                                    switch (this.vGroups[i].comparisonType)
                                    {
                                        case csRptGrpComparisonType.CSRPTGRPTEXT:

                                            let text1: string = this.vGroups[i + 1].value.toString();
                                            let text2: string = value.toString();
                                            if (text1.toLowerCase() !== text2.toLowerCase()) {
                                                addGroup(i, j, value);
                                            }
                                            break;

                                        case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                            let number1: number = cUtil.val(this.vGroups[i + 1].value);
                                            let number2: number = cUtil.val(value);
                                            if (number1 !== number2) {
                                                addGroup(i, j, value);
                                            }
                                            break;

                                        case csRptGrpComparisonType.CSRPTGRPDATE:

                                            let date1: Date = this.vGroups[i + 1].value;
                                            let date2: Date = value;
                                            if (date1 !== date2) {
                                                addGroup(i, j, value);
                                            }
                                            break;
                                    }
                                }
                            }
                            this.vGroups[i + 1].groups[this.vGroups[i + 1].groups.Length - 1].last = j - 1;
                            this.vGroups[i + 1].value = null;
                        }
                    }
                }
            }
            return true;
        }

        private pEstimateLoops(n: number) {
            for(var q = n - 1; q > 0; q--) {
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

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let value1: number = cUtil.val(this.rows.Rows[this.vRowsIndex[j]][orderBy]);
                    let value2: number = cUtil.val(this.rows.Rows[this.vRowsIndex[j - 1]][orderBy]);
                    if (value1 < value2) {
                        if (!OnProgress("", 0, q, t))  {
                            return false; 
                        }
                        changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!OnProgress("", 0, q, t))  {
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

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let number1: number = cUtil.val(this.rows.Rows[this.vRowsIndex[j]][orderBy]);
                    let number2: number = cUtil.val(this.rows.Rows[this.vRowsIndex[j - 1]][orderBy]);
                    if (number1 > number2) {
                        if (!OnProgress("", 0, q, t)) {
                            return false;
                        }
                        changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!OnProgress("", 0, q, t)) {
                    return false;
                }
                if (!bChanged) {
                    break;
                }
            }
            return true;
        }

        private orderTextAsc(first: number, last: number, orderBy: number) {
            let i: number = 0;
            let j: number = 0;
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let text1: string = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[j]][orderBy]).toString();
                    let text2: string = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[j - 1]][orderBy]).toString();
                    if (String.Compare(text1.toLowerCase(),
                                        text2.toLowerCase(),
                                        StringComparison.CurrentCulture) < 0) {
                        if (!OnProgress("", 0, q, t))  {
                            return false; 
                        }
                        changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!OnProgress("", 0, q, t))  {
                    return false; 
                }
                if (!bChanged)  {
                    break; 
                }
            }
            return true;
        }

        private orderTextDesc(first: number, last: number, orderBy: number) {
            let i: number = 0;
            let j: number = 0;
            let t: number = 0;
            let q: number = 0;
            let bChanged: boolean = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let text1: string = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[j]][orderBy]).toString();
                    let text2: string = cReportGlobals.valVariant(this.rows.Rows[this.vRowsIndex[j - 1]][orderBy]).toString();
                    if (String.Compare(text1.toLowerCase(),
                                        text2.toLowerCase(),
                                        StringComparison.CurrentCulture) > 0) {
                        if (!OnProgress("", 0, q, t)) {
                            return false;
                        }
                        changeRow(j, j - 1);
                        bChanged = true;
                    }
                }
                if (!OnProgress("", 0, q, t)) {
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
            let idxRowEvalued: number = 0;
            let recordCount: number = 0;

            if (this.rows !== null) {
                recordCount = this.vRowsIndex.Length;
            }

            // if the row to be evaluated is valid
            //
            if (this.iRowFormula < recordCount) {
                switch (idxGroup)
                {
                    case C_IDX_GROUP_HEADER:
                    case C_IDX_GROUP_REPORTHEADER:
                        idxRowEvalued = C_IDX_H_LAST_ROW_EVALUED;
                        break;

                    case C_IDX_GROUP_DETAIL:
                        idxRowEvalued = C_IDX_D_LAST_ROW_EVALUED;
                        break;

                    case C_IDX_GROUP_FOOTER:
                    case C_IDX_GROUP_REPORTFOOTER:
                        idxRowEvalued = C_IDX_F_LAST_ROW_EVALUED;
                        break;

                    // groups headers o footers
                    default:
                        idxRowEvalued = C_IDX_G_LAST_ROW_EVALUED;
                        break;
                }

                // evaluate functions before printing
                //
                if (whenEval === csRptWhenEval.CSRPTEVALPRE) {
                    if (idxRowEvalued === C_IDX_G_LAST_ROW_EVALUED) {
                        // if it is a footer
                        //
                        if (idxGroup < 0) {
                            bHaveToEvalRow = this.vGroups[(idxGroup * -1) - 1].lastFPreRowEvalued < this.iRowFormula;
                        }
                        else {
                            bHaveToEvalRow = this.vGroups[idxGroup - 1].lastHPreRowEvalued < this.iRowFormula;
                        }
                    }
                    else {
                        bHaveToEvalRow = this.lastRowPreEvalued[idxRowEvalued] < this.iRowFormula;
                    }

                }
                // evaluate function after printing
                //
                else {
                    if (idxRowEvalued === C_IDX_G_LAST_ROW_EVALUED) {
                        // if it is a footer
                        //
                        if (idxGroup < 0) {
                            bHaveToEvalRow = this.vGroups[(idxGroup * -1) - 1].lastFPostRowEvalued < this.iRowFormula;
                        }
                        else {
                            bHaveToEvalRow = this.vGroups[idxGroup - 1].lastHPostRowEvalued < this.iRowFormula;
                        }
                    }
                    else {
                        bHaveToEvalRow = this.lastRowPostEvalued[idxRowEvalued] < this.iRowFormula;
                    }
                }

                // if we need to evaluate
                //
                if (bHaveToEvalRow) {
                    for(var _i = 0; _i < this.formulas.count(); _i++) {
                        formula = this.formulas.item(_i);
                        if (formula.getWhenEval() === whenEval
                            && (idxGroup === formula.getIdxGroup()
                                    || formula.getIdxGroup2() === idxGroup)) {
                            formula.setHaveToEval(true);
                        }
                    }
                    for(var _i = 0; _i < this.formulas.count(); _i++) {
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
                    if (whenEval === csRptWhenEval.CSRPTEVALPRE) {
                        if (idxRowEvalued === C_IDX_G_LAST_ROW_EVALUED) {
                            // if it is a footer
                            //
                            if (idxGroup < 0) {
                                this.vGroups[(idxGroup * -1) - 1].lastFPreRowEvalued = this.iRowFormula;
                            }
                            else {
                                this.vGroups[idxGroup - 1].lastHPreRowEvalued = this.iRowFormula;
                            }
                        }
                        else {
                            this.lastRowPreEvalued[idxRowEvalued] = this.iRowFormula;
                        }
                    }
                    // evaluate after printing
                    //
                    else {
                        if (idxRowEvalued === C_IDX_G_LAST_ROW_EVALUED) {
                            // if it is a footer
                            //
                            if (idxGroup < 0) {
                                this.vGroups[(idxGroup * -1) - 1].lastFPostRowEvalued = this.iRowFormula;
                            }
                            else {
                                this.vGroups[idxGroup - 1].lastHPostRowEvalued = this.iRowFormula;
                            }
                        }
                        else {
                            this.lastRowPostEvalued[idxRowEvalued] = this.iRowFormula;
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
            pSetGroupFormulaHF(this.headers, C_IDX_GROUP_HEADER);

            // the main header is -2000
            //
            if (this.headers.item(0).getHasFormulaHide()) {
                this.headers.item(0).getFormulaHide().setIdxGroup(C_IDX_GROUP_REPORTHEADER);
            }

            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(var _i = 0; _i < this.headers.item(0).getSectionLines().count(); _i++) {
                secLn = this.headers.item(0).getSectionLines().item(_i);
                for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                    ctrl = secLn.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        ctrl.getFormulaHide().setIdxGroup(C_IDX_GROUP_REPORTHEADER);
                    }
                    if (ctrl.getHasFormulaValue()) {
                        ctrl.getFormulaValue().setIdxGroup(C_IDX_GROUP_REPORTHEADER);
                    }
                }
            }
        }

        private pSetGroupsInCtrlFormulaHide() {
            for(var _i = 0; _i < this.groups.count(); _i++) {
                let group: cReportGroup = this.groups.item(_i);
                pSetGroupsInCtrlFormulaHideAux(group.getHeader().getSectionLines(), group.getIndex());
                pSetGroupsInCtrlFormulaHideAux(group.getFooter().getSectionLines(), group.getIndex());
            }
        }

        private pSetGroupsInCtrlFormulaHideAux(scls: cReportSectionLines, idxGrop: number) {
            let scl: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(var _i = 0; _i < scls.count(); _i++) {
                scl = scls.item(_i);
                for(var _j = 0; _j < scl.getControls().count(); _j++) {
                    ctrl = scl.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        if (ctrl.getFormulaHide().getIdxGroup() === 0) {
                            ctrl.getFormulaHide().setIdxGroup(idxGrop);
                        }
                    }
                }
            }
        }

        private pSetGroupFormulaHF(sections: cReportSections, idxGrop: number) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    for(var _k = 0; _k < secLn.getControls().count(); _k++) {
                        ctrl = secLn.getControls().item(_k);
                        if (ctrl.getHasFormulaHide()) {
                            if (ctrl.getFormulaHide().getIdxGroup() === 0) {
                                ctrl.getFormulaHide().setIdxGroup(idxGrop);
                            }
                        }
                        if (ctrl.getHasFormulaValue()) {
                            if (ctrl.getFormulaValue().getIdxGroup() === 0) {
                                ctrl.getFormulaValue().setIdxGroup(idxGrop);
                            }
                        }
                    }
                }
            }
        }

        private compileReport() {
            let ctrl: cReportControl = null;

            for(var _i = 0; _i < this.controls.count(); _i++) {
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
                    addFormula(ctrl.getFormulaHide(), ctrl.getName() + "_" + "H");
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
                    addFormula(ctrl.getFormulaValue(), ctrl.getName() + "_" + "V");
                }
            }

            if (!pAddFormulasInSection(this.headers)) { return false; }
            if (!pAddFormulasInSection(this.groupsHeaders)) { return false; }
            if (!pAddFormulasInSection(this.groupsFooters)) { return false; }
            if (!pAddFormulasInSection(this.details)) { return false; }
            if (!pAddFormulasInSection(this.footers)) { return false; }

            let formula: cReportFormula = null;

            for(var _i = 0; _i < this.formulas.count(); _i++) {
                formula = this.formulas.item(_i);
                formula.setCompiledScript(null);
                this.compiler.initVariable(formula);
            }

            pSetIndexGroupInFormulaGroups(this.headers);
            pSetIndexGroupInFormulaGroups(this.groupsHeaders);
            pSetIndexGroupInFormulaGroups(this.groupsFooters);
            pSetIndexGroupInFormulaGroups(this.details);
            pSetIndexGroupInFormulaGroups(this.footers);

            this.compiler.clearVariables();

            return true;
        }

        private pSetIndexGroupInFormulaGroups(sections: cReportSections) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                if (sec.getHasFormulaHide()) {
                    pSetFormulaIndexGroup(sec.getFormulaHide(), sec);
                }
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    if (secLn.getHasFormulaHide()) {
                        pSetFormulaIndexGroup(secLn.getFormulaHide(), sec);
                    }
                    for(var _k = 0; _k < secLn.getControls().count(); _k++) {
                        ctrl = secLn.getControls().item(_k);
                        if (ctrl.getHasFormulaHide()) {
                            pSetFormulaIndexGroup(ctrl.getFormulaHide(), sec);
                        }
                        if (ctrl.getHasFormulaValue()) {
                            pSetFormulaIndexGroup(ctrl.getFormulaValue(), sec);
                        }
                    }
                }
            }
        }

        private pSetFormulaIndexGroup(formula: cReportFormula, sec: cReportSection) {
            let fint: cReportFormulaInt = null;
            let indexGroup: number = 0;

            for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                fint = formula.getFormulasInt().item(_i);

                if (pIsGroupFormula(fint.getFormulaType())) {
                    if (fint.getFormulaType() === csRptFormulaType.CSRPTF_GROUP_PERCENT) {
                        formula.setIdxGroup2(0);
                        indexGroup = cUtil.valAsInt(fint.getParameters().item(2).getValue());
                    }
                    else {
                        indexGroup = cUtil.valAsInt(fint.getParameters().item(1).getValue());
                    }
                    if (fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP) === null) {
                        fint.getParameters().add2("", cReportGlobals.C_KEYINDEXGROUP);
                    }
                    if (indexGroup === -1) {
                        if (sec.getTypeSection() === csRptSectionType.GROUP_HEADER
                            || sec.getTypeSection() === csRptSectionType.GROUP_FOOTER) {
                            // index of the group
                            //
                            fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue(sec.getIndex().toString());
                            formula.setIdxGroup(sec.getIndex());
                        }
                        else if (sec.getTypeSection() === csRptSectionType.MAIN_DETAIL) {
                            // index of the most internal group
                            //
                            fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue(this.groups.count().toString());
                            formula.setIdxGroup(this.groups.count()-1);
                        }
                        else {
                            fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue("0");
                            formula.setIdxGroup(0);
                        }
                    }
                    else {
                        fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue(indexGroup.toString());
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

            for(var _i = 0; _i < sections.count(); _i++) {
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
                    addFormula(sec.getFormulaHide(), sec.getName() + "_" + "H");
                }
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
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
                        addFormula(secLn.getFormulaHide(), sec.getName() 
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

            for(var _i = 0; _i < this.headers.count(); _i++) {
                sec = this.headers.item(_i);
                if (sec.getHasFormulaHide()) {
                    isVisible = cUtil.val(this.compiler.resultFunction(sec.getFormulaHide())) !== 0;
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
            if (w_paperInfo.getPaperSize() === csReportPaperType.CSRPTPAPERUSER) {
                offset = this.paperInfo.getCustomHeight() - w_paperInfo.getCustomHeight();
            }

            let w_aspect: cReportAspect = this.footers.item(0).getAspect();
            return w_aspect.getTop() - offset;
        }

        private addFieldToNewPage(sections: cReportSections, page: cReportPage, where: number) {
            let field: cReportPageField = null;
            let sec: cReportSection = null;
            let secline: cReportSectionLine = null;
            let ctrl: cReportControl = null;
            let isVisible: boolean = false;
            let indexCtrl: number = 0;
            let offset: number = 0;
            let recordCount: number = 0;

            if (this.rows !== null) {
                recordCount = this.vRowsIndex.Length;
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

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                this.lineIndex = this.lineIndex + 1;

                if (sec.getHasFormulaHide()) {
                    isVisible = cUtil.val(this.compiler.resultFunction(sec.getFormulaHide())) !== 0;
                }
                else {
                    isVisible = true;
                }
                if (isVisible) {
                    for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                        secline = sec.getSectionLines().item(_j);
                        if (secline.getHasFormulaHide()) {
                            isVisible = cUtil.val(this.compiler.resultFunction(secline.getFormulaHide())) !== 0;
                        }
                        else {
                            isVisible = true;
                        }
                        if (isVisible) {
                            // For Each Ctrl In Secline.Controls
                            //
                            for (indexCtrl = 0; indexCtrl < secline.getControls().getCollByLeft().Length; indexCtrl++) {
                                ctrl = secline.getControls().item(secline.getControls().getCollByLeft()[indexCtrl]);

                                if (where === C_HEADERS) {
                                    field = page.getHeader().add(null, "");
                                }
                                else if (where === C_FOOTERS) {
                                    field = page.getFooter().add(null, "");
                                }

                                field.setIndexLine(this.lineIndex);

                                if (ctrl.getHasFormulaValue()) {
                                    field.setValue(
                                        cReportGlobals.format(
                                            this.compiler.resultFunction(ctrl.getFormulaValue()), 
                                            ctrl.getLabel().getAspect().getFormat()));
                                }
                                else {
                                    switch (ctrl.getControlType())
                                    {
                                        case csRptControlType.CSRPTCTFIELD:

                                            pGetIndexRows(indexRows, indexRow, indexField, ctrl);

                                            if (this.collRows[indexRows] !== null) {
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
                                                let value: object = this.collRows[indexRows].Rows[indexRow][indexField];
                                                field.setValue(
                                                    cReportGlobals.format(
                                                        cReportGlobals.valVariant(value),
                                                        ctrl.getLabel().getAspect().getFormat()));
                                            }
                                            break;

                                        case csRptControlType.CSRPTCTLABEL:
                                            field.setValue(
                                                cReportGlobals.format(
                                                    ctrl.getLabel().getText(), 
                                                    ctrl.getLabel().getAspect().getFormat()));
                                            break;

                                        case csRptControlType.CSRPTCTIMAGE:
                                            field.setValue(
                                                cReportGlobals.format(
                                                    ctrl.getLabel().getText(), 
                                                    ctrl.getLabel().getAspect().getFormat()));
                                            field.setImage(ctrl.getImage().getImage());
                                            break;

                                        case csRptControlType.CSRPTCTDBIMAGE:

                                            pGetIndexRows(indexRows, indexRow, indexField, ctrl);

                                            if (this.collRows[indexRows] !== null) {
                                                field.setImage(pGetImage(indexRows, indexField, indexRow));
                                            }
                                            break;

                                        case csRptControlType.CSRPTCTCHART:

                                            pGetIndexRows(indexRows, indexRow, indexField, ctrl);
                                            field.setImage(pGetChartImage(indexRows, indexField, indexRow, ctrl));
                                            break;
                                    }
                                }

                                field.setInfo(this.pageSetting.item(ctrl.getKey()));
                                field.setTop(field.getInfo().getAspect().getTop() + offset);

                                if (ctrl.getHasFormulaHide()) {
                                    field.setVisible(
                                        cUtil.val(this.compiler.resultFunction(ctrl.getFormulaHide())) !== 0);
                                }
                                else {
                                    field.setVisible(true);
                                }
                            }
                        }
                    }
                }
                else {
                    if (where === C_HEADERS) {
                        offset = offset - sec.getAspect().getHeight();
                    }
                    else if (where === C_FOOTERS) {
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
            let secline: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            // headers
            //
            for(var _i = 0; _i < this.headers.count(); _i++) {
                sec = this.headers.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secline = sec.getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add(secline, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            // detail
            //
            for(var _i = 0; _i < this.details.count(); _i++) {
                sec = this.details.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secline = sec.getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add(secline, null, ctrl.getKey());
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
            if (w_paperInfo.getPaperSize() === csReportPaperType.CSRPTPAPERUSER) {
                offset = this.originalHeight - w_paperInfo.getCustomHeight();
            }
            for(var _i = 0; _i < this.footers.count(); _i++) {
                sec = this.footers.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secline = sec.getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add(secline, null, ctrl.getKey());
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
            for(var _i = 0; _i < this.groups.count(); _i++) {
                let grp: cReportGroup = this.groups.item(_i);
                // header
                //
                for(var _j = 0; _j < grp.getHeader().getSectionLines().count(); _j++) {
                    secline = grp.getHeader().getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add(secline, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
                // footer
                //
                for(var _j = 0; _j < grp.getFooter().getSectionLines().count(); _j++) {
                    secline = grp.getFooter().getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo: cReportPageInfo = this.pageSetting.add(secline, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            return true;
        }

        private pGetDataAux(recordsets: List<object[]>) {
            for(var _i = 0; _i < this.connectsAux.count(); _i++) {
                let connect: cReportConnect = this.connectsAux.item(_i);
                G.redimPreserve(this.collRows, this.collRows.Length + 1);
                if (!pGetData(this.collRows[this.collRows.Length - 1], connect, false, recordsets)) {
                    return false;
                }
            }
            this.vRowsIndexAux = new int[this.collRows.Length];
            return true;
        }

        private pGetData(
            vRows: DataTable
            connect: cReportConnect
            createIndexVector: boolean
            recordsets: List<object[]>) {
            let dummy: DataTable = null;
            return pGetData(vRows, dummy, connect, createIndexVector, recordsets);
        }

        private pGetData(
            vRows: DataTable
            rs: DataTable
            connect: cReportConnect
            createIndexVector: boolean
            recordsets: List<object[]>) {
            let strConnect: string = "";
            let saveInReport: boolean = false;
            let cn: CSDataBase.cDataBase = null;
            let varRs: object[] = null;
            let rsAux: DataTable = null;
            let dr: DbDataReader = null;

            // if we get an string connection
            //
            if (this.launchInfo.getStrConnect().Trim() !== "") {
                strConnect = this.launchInfo.getStrConnect();
            }
            // if this.launchInfo.getStrConnect() is empty we will use
            // the connection of the connect object
            // 
            else {
                strConnect = connect.getStrConnect();
                saveInReport = true;
            }
            if (!getReportDisconnected()) {
                if (strConnect.Trim() === "") {
                    cWindow.msgWarning("The connection settings were not defined."
                                        + "Both the LaunchInfo and the Connect object have their "
                                        + "strConnect property empty. Whitout this connection string "
                                        + "it will be imposible to open the connection to the database.",
                                        "CSReportEditor");
                    return false;
                }

                cn = new cDataBase(this.databaseEngine);

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
                if (!cn.initDb("", "", "", "", strConnect)) {
                    if (!resumeDBAccessMissing(strConnect, saveInReport, cn)) {
                        return false;
                    }
                }

                // we need to prepare the first sentence
                //
                let sqlstmt: string = "";

                // if it was a select
                //
                if (this.launchInfo.getSqlstmt().Trim() !== "") {
                    sqlstmt = this.launchInfo.getSqlstmt();
                }
                else {
                    if (connect.getDataSourceType() === csDataSourceType.CDDTPROCEDURE) {
                        sqlstmt = "exec [" + connect.getDataSource() + "] " + connect.getSqlParameters();
                    }
                    else if (connect.getDataSourceType() === csDataSourceType.CSDTTABLE) {
                        sqlstmt = "select * from [" + connect.getDataSource() + "]";
                    }
                    else {
                        sqlstmt = connect.getDataSource();
                    }
                }

                // open the recordset
                //
                cn.setOpenRsExDescript(this.descripUser);

                if (!cn.loadDataTable(true,
                                        false,
                                        false,
                                        sqlstmt,
                                        rs,
                                        dr,
                                        "GetData",
                                        C_MODULE,
                                        "")) {
                    return false;
                }

                vRows = rs;

                if (rs.Rows.Count === 0) {
                    if (createIndexVector) {
                        this.vRowsIndex = new int[0];
                        this.lastRowIndex = -1;
                    }
                }
                else {
                    if (createIndexVector) {
                        this.vRowsIndex = new int[vRows.Rows.Count];
                        this.lastRowIndex = this.vRowsIndex.Length - 1;
                        let k: number = 0;
                        for (k = 0; k < this.vRowsIndex.Length; k++) {
                            this.vRowsIndex[k] = k;
                        }
                    }
                }

                varRs = new object[2];
                varRs[0] = rs;
                varRs[1] = connect.getDataSource();
                recordsets.Add(varRs);

                // we need to load every recordset from every data source
                // in the recordset collection (this code suport multiples
                // recordset in the same reader)
                //
                while (!dr.IsClosed && dr.NextResult()) {
                    rsAux = new DataTable();
                    rsAux.Load(dr);

                    varRs = new object[2];
                    varRs[0] = rsAux;
                    varRs[1] = connect.getDataSource();
                    recordsets.Add(varRs);

                    // TODO: check if this works
                    //
                    // we add an empty element to this.collRows to avoid
                    // index of bounds exception
                    //
                    G.redimPreserve(this.collRows, this.collRows.Length + 1);
                }

                cn.closeDb();
            }
            else {
                vRows = null;
                if (createIndexVector) {
                    this.vRowsIndex = new int[0];
                    this.lastRowIndex = -1;
                }
            }
            if (this.rows !== null) {
                this.recordCount = this.vRowsIndex.Length;
            }
            else {
                this.recordCount = 0;
            }
            this.iRow = 0;
            this.idxGroupHeader = NO_GROUP_INDEX;
            this.idxGroupFooter = NO_GROUP_INDEX;

            return true;
        }

        private pInitRowFormulas() {
            let i: number = 0;

            this.lastRowPreEvalued = new int[3];
            this.lastRowPostEvalued = new int[3];

            for (i = 0; i < 3; i++) {
                this.lastRowPreEvalued[i] = -1;
                this.lastRowPostEvalued[i] = -1;
            }

            for (i = 0; i < this.groupCount; i++) {
                // headers
                //
                this.vGroups[i].lastHPreRowEvalued = -1;
                this.vGroups[i].lastHPostRowEvalued = -1;

                // footers
                //
                this.vGroups[i].lastFPreRowEvalued = -1;
                this.vGroups[i].lastFPostRowEvalued = -1;
            }
        }

        private nLoad(docXml: CSXml.cXml) {
            pDestroyCrossRef(this.headers);
            pDestroyCrossRef(this.details);
            pDestroyCrossRef(this.footers);
            pDestroyCrossRef(this.groups.getGroupsHeaders());
            pDestroyCrossRef(this.groups.getGroupsFooters());

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

            if (!loadAux(docXml, this.headers, C_NODERPTHEADERS)) { return false; }
            if (!loadAux(docXml, this.details, C_NODERPTDETAILS)) { return false; }
            if (!loadAux(docXml, this.footers, C_NODERPTFOOTERS)) { return false; }

            if (!loadGroups(docXml)) { return false; }

            pFixGroupIndex();

            if (!loadConnect(docXml)) { return false; }
            if (!loadConnectsAux(docXml)) { return false; }
            if (!loadLaunchInfo(docXml)) { return false; }

            loadPaperInfo(docXml);

            sortCollection();

            this.originalHeight = this.paperInfo.getCustomHeight();

            return true;
        }

        private pFixGroupIndex() {
            let idx: number = 0;
            for(var _i = 0; _i < this.groups.count(); _i++) {
                let group: cReportGroup = this.groups.item(_i);
                group.setIndex(idx);
                idx = idx + 1;
            }
        }

        private loadPaperInfo(docXml: CSXml.cXml) {
            let nodeObj: XmlNode = null;
            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODEPAPERINFO);
            if (!this.paperInfo.load(docXml, nodeObj)) { return; }
        }

        private sortCollection() {
            sortCollectionAux(this.headers);
            sortCollectionAux(this.details);
            sortCollectionAux(this.footers);
            sortCollectionAux(this.groupsFooters);
            sortCollectionAux(this.groupsHeaders);
        }

        private sortCollectionAux(col: cReportSections) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;

            for(var _i = 0; _i < col.count(); _i++) {
                sec = col.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    secLn.setControls(getControlsInZOrder(secLn.getControls()));
                }
            }
        }

        private loadAux(docXml: CSXml.cXml, sections: cReportSections, keySection: string) {
            let nodeObj: XmlNode = null;
            let nodeObjAux: XmlNode = null;
            let nodeObjSec: XmlNode = null;

            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, keySection);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjSec = docXml.getNodeChild(nodeObj);

                while (nodeObjSec !== null) {
                    nodeObjAux = nodeObjSec;
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

        private loadFormulas(docXml: CSXml.cXml) {
            let nodeObj: XmlNode = null;
            let nodeObjAux: XmlNode = null;
            let nodeObjSec: XmlNode = null;

            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODERPTFORMULAS);

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

        private loadConnect(docXml: CSXml.cXml) {
            let nodeObj: XmlNode = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_RPTCONNECT);
            return this.connect.load(docXml, nodeObj);
        }

        private loadConnectsAux(docXml: CSXml.cXml) {
            let nodeObj: XmlNode = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_RPTCONNECTSAUX);
            return this.connectsAux.load(docXml, nodeObj);
        }

        private loadGroups(docXml: CSXml.cXml) {
            let nodeObj: XmlNode = null;
            let nodeObjAux: XmlNode = null;
            let nodeObjGroup: XmlNode = null;

            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODEGROUPS);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjGroup = docXml.getNodeChild(nodeObj);
                while (nodeObjGroup !== null) {
                    nodeObjAux = nodeObjGroup;
                    let key: string = docXml.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    let group: cReportGroup = getGroups().add(null, key);
                    if (!group.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjGroup = docXml.getNextNode(nodeObjGroup);
                }
            }
            return true;
        }

        private loadLaunchInfo(docXml: CSXml.cXml) {
            let nodeObj: XmlNode = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_LAUNCHINFO);
            return this.launchInfo.load(docXml, nodeObj);
        }

        private getFileName(fileNameWithExt: string) {
            return CSKernelFile.cFile.getFileWithoutExt(fileNameWithExt);
        }

        private nLoadData(docXml: CSXml.cXml) {
            let nodeObj: XmlNode = null;
            let nodeObjAux: XmlNode = null;
            let nodeObjSec: XmlNode = null;

            this.pages.clear();
            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODERPTPAGES);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjSec = docXml.getNodeChild(nodeObj);
                while (nodeObjSec !== null) {
                    nodeObjAux = nodeObjSec;
                    let page: cReportPage = this.pages.add(null);
                    if (!page.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjSec = docXml.getNextNode(nodeObjSec);
                }
            }
            return true;
        }

        public OnReportDone() {
            if (ReportDone !== null) {
                ReportDone(this, new EventArgs());
            }
        }

        public OnProgress(task: string) {
            return OnProgress(task, 0, 0, 0);
        }
        public OnProgress(task: string, page: number, currRecord: number, recordCount: number) {
            let cancel: boolean = false;
            if (Progress !== null) {
                let e: ProgressEventArgs = new ProgressEventArgs(task, page, currRecord, recordCount);
                Progress(this, e);
                cancel = e.cancel;
            }
            return !cancel;
        }

        private resumeDBAccessMissing(connectString: string, saveInReport: boolean, cn: CSDataBase.cDataBase) {
            try {
                // if the database is not access we do nothing
                //
                if (connectString.toLowerCase().IndexOf("PROVIDER=Microsoft.Jet.OLEDB.4.0;".toLowerCase()) === 0) {
                    return false;
                }

                // get the datasource's name
                //
                let fileName: string = "";
                fileName = cUtil.getToken(connectString, "Data Source");

                // ask to the user if he wan to search for the database file
                //
                let commDialog: CommonDialog = null;
                if (FindAccessFile !== null) {
                    let e: FindAccessFileEventArgs = new FindAccessFileEventArgs(fileName);
                    FindAccessFile(this, e);
                    if (e.cancel) {
                        return false;
                    }
                    commDialog = e.commonDialog;
                }

                let file: CSKernelFile.cFile = new CSKernelFile.cFile();

                file.filter = "Access files|*.mdb";
                file.init("ResumeDBAccessMissing", C_MODULE, commDialog);

                if (!file.open(this.pathDefault + Path.DirectorySeparatorChar + file,
                                CSKernelClient.eFileMode.eRead,
                                false,
                                false,
                                eFileAccess.eShared,
                                true,
                                true)) {
                    return false;
                }

                fileName = file.fullName;

                file.close();

                connectString = "PROVIDER=Microsoft.Jet.OLEDB.4.0;Data Source=" + fileName;

                if (!cn.initDb(connectString)) {
                    return false;
                }

                // save the new location 
                //
                if (saveInReport) {
                    this.connect.setStrConnect(connectString);
                }
                return true;

            }
            catch (ex) {
                cError.mngError(ex, "ResumeDBAccessMissing", C_MODULE, "");
                return false;
            }
        }

        /* TODO: remove me
        private String getToken(String source, String token)
        {
            token = token.Trim();
            if (token.Substring(token.Length - 1) !== "=") 
            { 
                token = token + "="; 
            }
            int p = source.IndexOf(token);
            if (p < 0) 
            { 
                return ""; 
            }
            int p2 = p2 = p + 1;
            p = source.IndexOf(";", p2);
            if (p < 0) 
            { 
                p = source.Length + 1; 
            }
            p2 = p2 + token.Length - 1;
            p = p - p2;
            return source.Substring(p2, p);
        }*/

        private pSortControlsByLeft() {
            pSortControlsByLeftAux1(this.headers);
            pSortControlsByLeftAux1(this.groupsHeaders);
            pSortControlsByLeftAux1(this.details);
            pSortControlsByLeftAux1(this.groupsFooters);
            pSortControlsByLeftAux1(this.footers);
        }

        private pSortControlsByLeftAux1(sections: cReportSections) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    secLn.getControls().orderCollByLeft();
                }
            }
        }
        // public functions
        public Dispose() {
            this.rows = null;
            this.collRows = null;
            this.vRowsIndexAux = null;
            this.vGroups = null;
            this.vRowsIndex = null;
            this.lastRowIndex = -1;
            this.lastRowPreEvalued = null;
            this.lastRowPostEvalued = null;

            this.controls.clear();
            this.controls = null;

            pDestroyCrossRef(this.headers);
            pDestroyCrossRef(this.details);
            pDestroyCrossRef(this.footers);
            pDestroyCrossRef(this.groups.getGroupsHeaders());
            pDestroyCrossRef(this.groups.getGroupsFooters());

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

            pDestroyImages();
            this.images = null;
        }

        private pDestroyCrossRef(secs: cReportSections) {
            let sec: cReportSection = null;
            let secl: cReportSectionLine = null;

            for(var _i = 0; _i < secs.count(); _i++) {
                sec = secs.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secl = sec.getSectionLines().item(_j);
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

        private pGetMainDataSource(recordsets: List<object[]>) {
            if (recordsets.Count > 0) {
                return recordsets[0][1];
            }
            else  {
                return "";
            }
        }

        private pSetIndexColInGroupFormulas(recordsets: List<object[]>) {
            pSetIndexColInGroupFormulasAux(this.headers, recordsets);
            pSetIndexColInGroupFormulasAux(this.groupsHeaders, recordsets);
            pSetIndexColInGroupFormulasAux(this.groupsFooters, recordsets);
            pSetIndexColInGroupFormulasAux(this.details, recordsets);
            pSetIndexColInGroupFormulasAux(this.footers, recordsets);
        }

        private pSetIndexColInGroupFormulasAux(sections: cReportSections, recordsets: List<object[]>) {
            let sec: cReportSection = null;
            let secLn: cReportSectionLine = null;
            let ctrl: cReportControl = null;

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                if (sec.getHasFormulaHide()) {
                    pSetIndexColInGroupFormula(sec.getFormulaHide(), recordsets);
                }
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    if (secLn.getHasFormulaHide()) {
                        pSetIndexColInGroupFormula(secLn.getFormulaHide(), recordsets);
                    }
                    for(var _k = 0; _k < secLn.getControls().count(); _k++) {
                        ctrl = secLn.getControls().item(_k);
                        if (ctrl.getHasFormulaHide()) {
                            pSetIndexColInGroupFormula(ctrl.getFormulaHide(), recordsets);
                        }
                        if (ctrl.getHasFormulaValue()) {
                            pSetIndexColInGroupFormula(ctrl.getFormulaValue(), recordsets);
                        }
                    }
                }
            }
        }

        private pSetIndexColInGroupFormula(formula: cReportFormula, recordsets: List<object[]>) {
            let fint: cReportFormulaInt = null;
            let colName: string = "";
            let rs: DataTable = null;

            if (!this.reportDisconnected) {
                rs = recordsets[0][0];

                for(var _i = 0; _i < formula.getFormulasInt().count(); _i++) {
                    fint = formula.getFormulasInt().item(_i);

                    if (pIsGroupFormula(fint.getFormulaType())) {
                        colName = fint.getParameters().item(0).getValue();
                        pSetColIndexInGroupFormulaAux(rs, fint, colName, cReportGlobals.C_KEYINDEXCOL);

                        if (fint.getFormulaType() === csRptFormulaType.CSRPTF_GROUP_PERCENT) {
                            colName = fint.getParameters().item(1).getValue();
                            pSetColIndexInGroupFormulaAux(rs, fint, colName, cReportGlobals.C_KEYINDEXCOL2);
                        }
                    }
                }
            }
        }

        private pSetColIndexInGroupFormulaAux(
            rs: DataTable
            fint: cReportFormulaInt
            colName: string
            keyParam: string) {
            for(var i = 0; i < rs.Columns.Count; i++) {
                if (colName.toLowerCase() === rs.Columns[i].ColumnName.toLowerCase()) {
                    if (fint.getParameters().item(keyParam) === null) {
                        fint.getParameters().add2("", keyParam);
                    }
                    fint.getParameters().item(keyParam).setValue(i.toString());
                    break;
                }
            }
        }

        private redimPreserve(groups: T_Group[], size: number) {
            if (size === 0) {
                groups = null;
            }
            else {
                if (groups === null) {
                    groups = new T_Group[size];
                }
                else if (groups.Length === 0) {
                    groups = new T_Group[size];
                }
                else {
                    let newArray: T_Group[] = new T_Group[size];
                    Array.Copy(groups, newArray, groups.Length);
                    for (let t = groups.Length; t < newArray.Length; t++) {
                        newArray[t] = new T_Group();
                    }
                    groups = newArray;
                }
            }
        }

        private getControlsInZOrder(col: cReportControls) {
            let i: number = 0;
            let ctrl: cReportControl = null;
            let ctrls: cReportControls = null;

            ctrls = new cReportControls();
            ctrls.setCopyColl(col.getCopyColl());
            ctrls.setTypeSection(col.getTypeSection());
            ctrls.setSectionLine(col.getSectionLine());

            // we load a new collection ordered by zorder
            //
            while (col.count() > 0) {
                // we search the lower zorder in this collection
                //
                i = 32767;
                for(var _i = 0; _i < col.count(); _i++) {
                    ctrl = col.item(_i);
                    if (ctrl.getLabel().getAspect().getNZOrder() < i) {
                        i = ctrl.getLabel().getAspect().getNZOrder();
                    }
                }

                for(var _i = 0; _i < col.count(); _i++) {
                    ctrl = col.item(_i);
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

        private reportDone() {
            if (ReportDone !== null) {
                ReportDone(this, new EventArgs());
            }
        }


        //
        // debug functions
        //
        public debugGroupKeys() {
            let keys: string[] = new String[this.groups.count() * 2];
            let groupCount: var = this.groups.count();
            for(var i = 0; i < groupCount; i++) {
                let h: var = this.groups.getGroupsHeaders().item(i);
                let f: var = this.groups.getGroupsFooters().item(i);
                keys[i] = "H: " + h.getKey() + " " + h.getKeyPaint() + " " + h.getName() + " " + h.getIndex() + " " + h.getRealIndex() ;
                keys[groupCount+i] = "F: " + f.getKey() + " " + h.getKeyPaint() + " " + f.getName() + " " + f.getIndex() + " " + f.getRealIndex();
            }
            return keys;
        }

        public debugGroupPanitKeys() {
            let keys: string[] = new String[this.groups.count() * 2];
            let groupCount: var = this.groups.count();
            for(var i = 0; i < groupCount; i++) {
                keys[i] = "H: " + this.groups.getGroupsHeaders().item(i).getKeyPaint();
                keys[groupCount + i] = "F: " + this.groups.getGroupsFooters().item(i).getKeyPaint();
            }
            return keys;
        }



    }    }
}
