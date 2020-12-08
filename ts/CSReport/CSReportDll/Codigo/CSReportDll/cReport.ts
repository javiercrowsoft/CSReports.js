(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


//     public delegate void ReportDoneHandler(object sender, EventArgs e);
//     public delegate void ProgressHandler(object sender, ProgressEventArgs e);
//     public delegate void FindAccessFileHandler(object sender, FindAccessFileEventArgs e);

    globalObject.CSReportDll.createCReport = function() {

        const self = {};
//         public event ReportDoneHandler ReportDone;
//         public event ProgressHandler Progress;
//         public event FindAccessFileHandler FindAccessFile;

        const createT_Group = function() {

            const self = {};
            self.first = null;
            self.last = null;
        };


        const createT_Groups = function() {

            const self = {};
            self.value = null;
            self.indexField = null;
            self.changed = null;
            self.reprintHeader = null;
            self.footerMustBeClosed = null;
            self.comparisonType = null;
            self.oderType = null;
            self.grandTotalGroup = null;
            self.groups = null;
            self.lastHPreRowEvalued = null;
            self.lastHPostRowEvalued = null;
            self.lastFPreRowEvalued = null;
            self.lastFPostRowEvalued = null;
            // to know which is the line number when we are in a group
            //
            // it is incremented only when the detail section is printed
            // it doesn't care if the details contains more than one line
            //
            self.lineNumber = null;
        };

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

        const C_MODULE = "cReport";
        const C_HEADERS = 1;
        const C_FOOTERS = 2;
        const C_NODERPTHEADERS = "RptHeaders";
        const C_NODERPTDETAILS = "RptDetails";
        const C_NODEGROUPS = "RptGroups";
        const C_NODERPTFOOTERS = "RptFooters";
        const C_RPTCONNECT = "RptConnect";
        const C_RPTCONNECTSAUX = "RptConnectsAux";
        const C_LAUNCHINFO = "RptLaunchInfo";
        const C_NODERPTFORMULAS = "RptFormulas";
        const C_NODERPTPAGESSETTING = "RptPagesSetting";
        const C_NODERPTPAGES = "RptPages";
        const C_NODEPAPERINFO = "PaperInfo";
        const C_FILEEX = "CrowSoft Report|*.csr| Archivos Xml|*.xml";
        const C_FILEDATAEX = "CrowSoft Report data|*.csd| Archivos Xml|*.xml";

        // every formula in a header
        //
        const C_IDX_GROUP_HEADER = -1000;
        // every formula in detail
        //
        const C_IDX_GROUP_DETAIL = 0;
        // every formula in a footer
        //
        const C_IDX_GROUP_FOOTER = -1001;
        // every formumal in groups
        //
        const C_IDX_GROUP_REPORTHEADER = -2000;
        const C_IDX_GROUP_REPORTFOOTER = -2001;

        const C_IDX_H_LAST_ROW_EVALUED = 0;
        const C_IDX_D_LAST_ROW_EVALUED = 1;
        const C_IDX_F_LAST_ROW_EVALUED = 2;

        // flag to know if we need to check in the group (m_vGroups)
        // which row was the last evaluated
        // instead of checking in m_LastRow..Evalued
        //
        const C_IDX_G_LAST_ROW_EVALUED = -1;

        let m_launchInfo = null;

        let m_groups = null;
        let m_details = null;
        let m_headers = null;
        let m_footers = null;
        let m_groupsHeaders = null;
        let m_groupsFooters = null;
        let m_paperInfo = null;
        let m_originalHeight = 0;
        let m_controls = null;
        let m_formulas = null;
        let m_formulaTypes = null;
        let m_name = "";
        let m_path = "";
        let m_pathDefault = "";

        let m_descripUser = "";

        let m_connect = null;
        let m_connectsAux = null;

        let m_pageSetting = null;
        let m_pages = null;

        let m_compiler = null;
        let m_currenPage = 0;
        let m_totalPages = 0;

        let m_reportDisconnected = null;

        // to sort groups
        //
        // this array contains a table with the data of every recordset
        // in the main connection
        //
        // the function pGetData() reserves a position for every recordset
        // in the additional connections
        //
        let m_collRows = null;

        let m_images = null;
        let m_rows = null;
        let m_recordCount = 0;
        let m_vRowsIndex = null;
        let m_lastRowIndex = -1;
        let m_vRowsIndexAux = null;
        let m_iRow = 0;
        let m_iRow2 = 0;
        let m_iRowFormula = 0;
        let m_lineIndex = 0;

        let m_lastRowPreEvalued = null;
        let m_lastRowPostEvalued = null;

        // flag to know if there are group headers to re-print in a new page
        // if it is false we can print a footer as the first line in a new page
        //
        let m_bExistsGrpToRePrintInNP = null;
        let m_bHaveToRePrintGroup = null;

        const NO_GROUP_INDEX = 0;

        // to print groups in a new page when a group changes
        //
        let m_idxGroupToPrintNP = NO_GROUP_INDEX;

        // index of the current group header
        //
        let m_idxGroupHeader = NO_GROUP_INDEX;

        // index of the current group footer
        //
        let m_idxGroupFooter = NO_GROUP_INDEX;

        let m_bPrintFooter = null;
        let m_bLastFootersWasPrinted = null;
        let m_groupIndexChange = NO_GROUP_INDEX;

        let m_bEvalPreGroups = null;
        let m_bCloseFooter = null;
        let m_bOpenHeader = null;


        // it is incremented only when a the detail section is printed
        // it doesn't care if the details contains more than one line
        //
        // index of the current line
        //
        let m_lineNumber = 0;

        let m_vGroups = null;
        let m_firstGroup = null;
        let m_groupCount = 0;

        let m_isForWeb = null;

        let m_databaseEngine = csDatabaseEngine.SQL_SERVER;

        let m_exportEmailAddress = "";

        const cReport = function() {
            try {
                m_headers = new cReportSections();
                m_details = new cReportSections();
                m_footers = new cReportSections();
                m_groups = new cReportGroups();
                m_groupsHeaders = getGroups().getGroupsHeaders();
                m_groupsFooters = getGroups().getGroupsFooters();
                m_paperInfo = new cReportPaperInfo();
                m_controls = new cReportControls2();
                m_formulas = new cReportFormulas();
                m_formulaTypes = new cReportFormulaTypes();
                m_connect = new cReportConnect();
                m_pageSetting = new cReportPageSettings();
                m_pages = new cReportPages();

                m_compiler = new cReportCompiler();

                setConnectsAux(new cReportConnectsAux());

                m_details.setCopyColl(m_controls);
                m_headers.setCopyColl(m_controls);
                m_footers.setCopyColl(m_controls);
                m_groupsHeaders.setCopyColl(m_controls);
                m_groupsFooters.setCopyColl(m_controls);

                m_details.setTypeSection(csRptSectionType.DETAIL);
                m_headers.setTypeSection(csRptSectionType.HEADER);
                m_footers.setTypeSection(csRptSectionType.FOOTER);
                m_groupsHeaders.setTypeSection(csRptSectionType.GROUP_HEADER);
                m_groupsFooters.setTypeSection(csRptSectionType.GROUP_FOOTER);

                m_details.setMainTypeSection(csRptSectionType.MAIN_DETAIL);
                m_headers.setMainTypeSection(csRptSectionType.MAIN_HEADER);
                m_footers.setMainTypeSection(csRptSectionType.MAIN_FOOTER);
            }
            catch (ex) {
                cError.mngError(ex, "Class_Initialize", C_MODULE, "");
            }
        };

        self.getExportEmailAddress = function() {
            return m_exportEmailAddress;
        };

        self.setExportEmailAddress = function(rhs) {
            m_exportEmailAddress = rhs;
        };

        self.getIsForWeb = function() {
            return m_isForWeb;
        };

        self.setIsForWeb = function(rhs) {
            m_isForWeb = rhs;
        };

        self.setDatabaseEngine = function(databaseEngine) {
            m_databaseEngine = databaseEngine;
        };

        self.getConnectsAux = function() {
            return m_connectsAux;
        };

        self.setConnectsAux = function(rhs) {
            m_connectsAux = rhs;
        };

        self.getGroups = function() {
            return m_groups;
        };

        self.setGroups = function(rhs) {
            m_groups = rhs;
        };

        self.getDetails = function() {
            return m_details;
        };

        self.setDetails = function(rhs) {
            m_details = rhs;
        };

        self.getHeaders = function() {
            return m_headers;
        };

        self.setHeaders = function(rhs) {
            m_headers = rhs;
        };

        self.getFooters = function() {
            return m_footers;
        };

        self.setFooters = function(rhs) {
            m_footers = rhs;
        };

        self.getGroupsHeaders = function() {
            return m_groupsHeaders;
        };

        self.getGroupsFooters = function() {
            return m_groupsFooters;
        };

        self.getPaperInfo = function() {
            return m_paperInfo;
        };

        self.setPaperInfo = function(rhs) {
            m_paperInfo = rhs;
        };

        self.getControls = function() {
            return m_controls;
        };

        self.getFormulas = function() {
            return m_formulas;
        };

        self.getFormulaTypes = function() {
            return m_formulaTypes;
        };

        self.getName = function() {
            return m_name;
        };

        self.setName = function(rhs) {
            m_name = rhs;
        };

        self.getPath = function() {
            return m_path;
        };

        self.setPathDefault = function(rhs) {
            m_pathDefault = rhs;
        };

        self.getConnect = function() {
            return m_connect;
        };

        self.getPages = function() {
            return m_pages;
        };

        self.getPageSetting = function() {
            return m_pageSetting;
        };

        self.setPageSetting = function(rhs) {
            m_pageSetting = rhs;
        };

        self.getLaunchInfo = function() {
            return m_launchInfo;
        };

        self.getCompiler = function() {
            return m_compiler;
        };

        self.getReportDisconnected = function() {
            return m_reportDisconnected;
        };

        self.setReportDisconnected = function(rhs) {
            m_reportDisconnected = rhs;
        };

        self.getDescripUser = function() {
            return m_descripUser;
        };

        self.setDescripUser = function(rhs) {
            m_descripUser = rhs;
        };

        self.getCurrenPage = function() {
            return m_pages.count();
        };

        self.getTotalPages = function() {
            return m_pages.count();
        };

        self.moveGroup = function(from, to) {
            if (from < 1 || from > m_groups.count()) {
                return false;
            }
            if (to < 1 || to > m_groups.count()) {
                return false;
            }

            if (from !== to) {

                let group = null;
                let collGroups = new cReportGroups();

                for(var _i = 0; _i < m_groups.count(); _i++) {
                    group = m_groups.item(_i);
                    collGroups.add(group, group.getKey());
                }

                m_groups.clear();

                let index = 0;

                for(var _i = 0; _i < collGroups.count(); _i++) {
                    group = collGroups.item(_i);
                    index = index + 1;
                    if (index !== from) {
                        if (index === to) {
                            let group2 = collGroups.item(from);
                            m_groups.add2(group2, group2.getKey());
                        }
                        m_groups.add2(group, group.getKey());
                    }
                }
            }
            return true;
        };

        // this function is called by the print component every time a page is printed
        // the function add a new cReportPage object to the pages collection
        // and then set every header in the new cReportPage
        //
        self.newPage = function() {
            let page = m_pages.add(null, "");
            page.setPageNumber(m_pages.count());

            // if the user has canceled we return an error
            //
            if (!OnProgress("", m_pages.count(), 0, 0)) {
                return csRptNewPageResult.CSRPTNPERROR;
            }

            // if it is the first page we evaluate the headers of the report
            //
            if (m_pages.count() === 1) {
                evalFunctions(C_IDX_GROUP_REPORTHEADER, csRptWhenEval.CSRPTEVALPRE);
            }

            // only formulas located in header sections
            //
            evalFunctions(C_IDX_GROUP_HEADER, csRptWhenEval.CSRPTEVALPRE);

            // add field from every header to the page
            //
            addFieldToNewPage(m_headers, page, C_HEADERS);

            // only formulas located in header sections
            //
            evalFunctions(C_IDX_GROUP_HEADER, csRptWhenEval.CSRPTEVALPOST);

            // if it is the first page we evaluate the headers of the report
            //
            if (m_pages.count() === 1) {
                evalFunctions(C_IDX_GROUP_REPORTHEADER, csRptWhenEval.CSRPTEVALPOST);
            }

            // we need to set height of headears an footers
            //
            page.setHeaderBottom(getHeightHeader());
            page.setFooterTop(getTopFooter());

            if (m_rows === null) {
                return csRptNewPageResult.CSRPTNPEND;
            }
            else if (m_iRow > m_lastRowIndex) {
                return csRptNewPageResult.CSRPTNPEND;
            }

            // if there are group headers which need to be reprinted
            // in the new page
            //
            if (m_bExistsGrpToRePrintInNP) {
                m_bHaveToRePrintGroup = true;

                // set on the flag to know we need to re-print group headers
                //
                pMarkGroupHeadersToReprint();
            }

            return csRptNewPageResult.CSRPTNPSUCCESS;
        };

        const pMarkGroupHeadersToReprint = function() {
            // if this is the first page we do nothing
            //
            if (m_firstGroup) {
                return;
            }

            for(var i = 0; i < m_groupCount; i++) {
                if (m_groups.item(i).getRePrintInNewPage()) {
                    m_vGroups[i].reprintHeader = true;
                }
            }
        };

        const pExistsGroupHeadersToReprint = function() {
            for(var i = 0; i < m_groupCount; i++) {
                if (m_vGroups[i].reprintHeader) {
                    m_idxGroupHeader = i + 1;
                    m_bOpenHeader = true;
                    return true;
                }
            }

            // there are no more groups to re-print
            //
            m_bHaveToRePrintGroup = false;
            return false;
        };

        const pCheckExistsGroupHToReprint = function() {
            for(var i = 0; i < m_groupCount; i++) {
                if (m_vGroups[i].reprintHeader) {
                    return;
                }
            }

            // there are no more groups to re-print
            //
            m_bHaveToRePrintGroup = false;
        };

        // this function is called by the print component every time a page is printed
        // the function set the footers in the last page of the m_pages collection
        //
        self.endPage = function() {
            // last page
            //
            let page = m_pages.item(m_pages.count()-1);

            // only formulas located in footer sections
            //
            evalFunctions(C_IDX_GROUP_FOOTER, csRptWhenEval.CSRPTEVALPRE);

            // add field from every header to the page
            //
            addFieldToNewPage(m_footers, page, C_FOOTERS);

            // only formulas located in footer sections
            //
            evalFunctions(C_IDX_GROUP_FOOTER, csRptWhenEval.CSRPTEVALPOST);

            return csRptEndPageResult.CSRPTEPSUCCESS;
        };

        self.markGroupHeaderPrinted = function() {
            // if it took place in a re-print
            //
            if (m_vGroups[m_idxGroupHeader - 1].reprintHeader) {

                m_vGroups[m_idxGroupHeader - 1].reprintHeader = false;

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
            else if (m_vGroups[m_idxGroupHeader - 1].changed) {
                pMarkGroupHeaderPrintedAux();
            }
        };

        const pMarkGroupHeaderPrintedAux = function() {
            let headerSec = null;
            let secLn = null;
            let ctrl = null;

            // if we have printed the group we need to set off
            // the flag which tell us the group has changed
            //
            m_vGroups[m_idxGroupHeader - 1].changed = false;

            // if it was a group which has to be printed in a new page
            // we set off the flag because the group has been printed
            //
            if (m_idxGroupToPrintNP === m_idxGroupHeader) {
                m_idxGroupToPrintNP = NO_GROUP_INDEX;
            }

            headerSec = m_groups.item(m_idxGroupHeader - 1).getHeader();

            // we need to initialize the variables of every formula
            // in every control located in the header section of the group
            //
            for(var _i = 0; _i < headerSec.getSectionLines().count(); _i++) {
                secLn = headerSec.getSectionLines().item(_i);
                for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                    ctrl = secLn.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        m_compiler.initVariable(ctrl.getFormulaHide());
                    }
                    if (ctrl.getHasFormulaValue()) {
                        m_compiler.initVariable(ctrl.getFormulaValue());
                    }
                }
            }
        };

        self.markGroupFooterPrinted = function() {
            let footerSec = null;
            let ctrl = null;
            let secLn = null;

            // if the group has been printed we set off the flag
            // used to know if it must be closed
            //
            m_vGroups[m_idxGroupFooter - 1].footerMustBeClosed = false;

            footerSec = m_groups.item(m_idxGroupFooter - 1).getFooter();

            // we need to initialize the variables of every formula
            // in the controls of every section lines in the footer group
            //
            for(var _i = 0; _i < footerSec.getSectionLines().count(); _i++) {
                secLn = footerSec.getSectionLines().item(_i);
                for(var _j = 0; _j < secLn.getControls().count(); _j++) {
                    ctrl = secLn.getControls().item(_j);
                    if (ctrl.getHasFormulaHide()) {
                        m_compiler.initVariable(ctrl.getFormulaHide());
                    }
                    if (ctrl.getHasFormulaValue()) {
                        m_compiler.initVariable(ctrl.getFormulaValue());
                    }
                }
            }

            if (pNotPendingFooters()) {
                m_iRowFormula = m_iRow;
                m_iRow2 = m_iRow;
            }
        };

        self.evalPost = function() {
            evalFunctions(C_IDX_GROUP_DETAIL, csRptWhenEval.CSRPTEVALPOST);
        };

        self.evalPreGroupHeader = function() {
            if (m_idxGroupHeader !== NO_GROUP_INDEX) {
                evalFunctions(m_idxGroupHeader, csRptWhenEval.CSRPTEVALPRE);
            }
        };

        self.evalPreGroupFooter = function() {
            if (m_idxGroupHeader !== NO_GROUP_INDEX) {
                let idxChildGroupFooter = NO_GROUP_INDEX;

                idxChildGroupFooter = pGetChildGroupFooterToClose(m_idxGroupHeader);

                // when we close a group we need to evaluate every sub-group
                //
                while (idxChildGroupFooter > m_idxGroupHeader) {
                    evalFunctions(idxChildGroupFooter * -1, csRptWhenEval.CSRPTEVALPRE);
                    idxChildGroupFooter = idxChildGroupFooter - 1;
                }

                // finaly we need to evaluate the group that has changed
                //
                evalFunctions(m_idxGroupHeader * -1, csRptWhenEval.CSRPTEVALPRE);
            }
        };

        self.evalPostGroupHeader = function() {
            if (m_idxGroupHeader === NO_GROUP_INDEX) { return; }
            evalFunctions(m_idxGroupHeader, csRptWhenEval.CSRPTEVALPOST);
        };

        self.evalPostGroupFooter = function() {
            if (m_idxGroupHeader !== NO_GROUP_INDEX) {

                let idxChildGroupFooter = 0;

                idxChildGroupFooter = pGetChildGroupFooterToClose(m_idxGroupHeader);

                // when we close a group we need to evaluate every sub-group
                //
                while (idxChildGroupFooter > m_idxGroupHeader) {
                    evalFunctions(idxChildGroupFooter * -1, csRptWhenEval.CSRPTEVALPOST);
                    idxChildGroupFooter = idxChildGroupFooter - 1;
                }

                // finaly we need to evaluate the group that has changed
                //
                evalFunctions(m_idxGroupHeader * -1, csRptWhenEval.CSRPTEVALPOST);
            }
        };

        const pGetChildGroupFooterToClose = function(idxGroupFather) {
            let groupIndex = 0;
            for(var j = idxGroupFather - 1; j < m_groupCount; j++) {
                if (m_vGroups[j].footerMustBeClosed) {
                    groupIndex = j + 1;
                }
            }
            return groupIndex;
        };

        self.evalPre = function() {
            evalFunctions(C_IDX_GROUP_DETAIL, csRptWhenEval.CSRPTEVALPRE);
        };

        self.moveToNext = function() {
            // we move to the next group
            //
            m_iRow = m_iRow + 1;
            m_iRow2 = m_iRow;
            m_iRowFormula = m_iRow;

            // we need to move the additional recordset too
            //
            for(var indexRows = 0; indexRows < m_collRows.Length; indexRows++) {
                let indexRow = m_vRowsIndexAux[indexRows] + 1;
                if (m_collRows[indexRows] !== null) {
                    if (indexRow < m_collRows[indexRows].Rows.Count) {
                        m_vRowsIndexAux[indexRows] = indexRow;
                    }
                }
            }
        };

        const pExistsGroupToReprintInNP = function() {
            m_bExistsGrpToRePrintInNP = false;
            for(var i = 0; i < m_groupCount; i++) {
                if (m_groups.item(i).getRePrintInNewPage()) {
                    m_bExistsGrpToRePrintInNP = true;
                    return;
                }
            }
        };

        const pNotPendingFooters = function() {
            for(var i = 0; i < m_groupCount; i++) {
                if (m_vGroups[i].footerMustBeClosed) {
                    return false;
                }
            }
            return true;
        };

        // it only returns one of the following:
        //
        //      GroupH
        //      Detail
        //      GroupF
        //      End
        //
        self.getLineType = function() {
            // if there are groups footers which need to be printed
            //
            if (m_idxGroupFooter !== NO_GROUP_INDEX) {
                if (m_vGroups[m_idxGroupFooter - 1].footerMustBeClosed) {
                    return csRptGetLineResult.CSRPTGLGROUPFOOTER;
                }
            }

            // if there are groups headers which need to be printed
            //
            if (m_idxGroupHeader !== NO_GROUP_INDEX) {
                if (m_vGroups[m_idxGroupHeader - 1].changed) {
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
            if (m_idxGroupToPrintNP > 0 || m_bHaveToRePrintGroup) {
                return csRptGetLineResult.CSRPTGLVIRTUALH;
            }

            // if there are groups footers which have to be printed
            //
            if (pEvalFooterToClose2()) {
                return csRptGetLineResult.CSRPTGLVIRTUALF;
            }

            // if there is nothing more to do we have finished
            //
            if (m_iRow > m_lastRowIndex && pNotPendingFooters()) {
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
        };

        // it returns every controls of a line
        // it moves through every row in the main recordset
        //
        self.getLine = function(fields) {
            // to know if we need to print in a new page
            // because a group has changed its value
            //
            let bGetNewPage = false;

            if (fields !== null) {
                fields.clear();
            }

            // if there are not pending calls to close or open groups
            //
            if (!(m_bCloseFooter || m_bOpenHeader)) {

                // if there are not group headers to be re-printed in this page
                //
                if (!pExistsGroupHeadersToReprint()) {

                    // we process the line
                    //
                    let rslt = pGetLineWork(fields, bGetNewPage);
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
            if (m_bCloseFooter) {
                return pGetLineAuxGroupFooter(fields);
            }
            // if the group has changed
            //
            else if (m_bOpenHeader) {
                return pGetLineAuxGroupHeader(bGetNewPage, fields);
            }
            // process a details line
            //
            else {
                return pGetLineAuxDetail(fields);
            }
        };

        const pGetLineWork = function(fields, bGetNewPage) {
            bGetNewPage = false;

            // if the user has cancel we have finished
            //
            if (pGetLineAuxReportCancel() === csRptGetLineResult.CSRPTGLEND) {
                return csRptGetLineResult.CSRPTGLEND;
            }

            // if we reach the end of the report and there are not groups to process
            // we have finished
            //
            let rslt = pGetLineWorkAuxReportEnd();
            if (rslt === csRptGetLineResult.CSRPTGLEND || rslt === csRptGetLineResult.CSRPTGLVIRTUALF) {
                return rslt;
            }

            // field collection for this line
            //
            fields = new cReportPageFields();

            // if we need to print the group in a new page
            //
            if (m_idxGroupToPrintNP > 0) {
                pGetLineAuxPrintGroupInNP();
            }
            // we need to process groups
            //
            else {
                // if the report have groups
                //
                if (m_groupCount > 0) {
                    // if we don't need to re-print group headers
                    //
                    if (!m_bHaveToRePrintGroup) {
                        pEvalFooterToClose();
                    }

                    // if we don't need to re-print group footers
                    //
                    if (!m_bCloseFooter) {
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
        };

        const pGetLineAuxPrintGroupInNP = function() {
            m_idxGroupHeader = m_idxGroupToPrintNP;
            m_idxGroupToPrintNP = NO_GROUP_INDEX;
            m_bOpenHeader = true;
        };

        const pReportIsDone = function() {
            // if we have finished return csRptGLEnd
            //
            if (m_rows === null || m_iRow > m_recordCount -1) {
                // if there are not pending footers we have finished
                // 
                if (!m_bPrintFooter) {
                    return true;
                }
            }
            return false;
        };

        const pGetLineWorkAuxReportEnd = function() {
            // if we have finished return csRptGLEnd
            //
            if (m_rows === null || m_iRow > m_recordCount - 1) {
                if (m_iRow > m_recordCount - 1) {
                    m_iRow2 = m_recordCount - 1;
                }

                // if there are footer to be printed
                //
                if (m_bPrintFooter) {
                    // if we need to eval functions before print
                    //
                    if (m_bEvalPreGroups) {
                        // set this flag off to allow the next call to 
                        // getLine() -> pGetLineWork() -> pGetLineWorkAuxReportEnd()
                        // to print the footer
                        //
                        m_bEvalPreGroups = false;

                        return csRptGetLineResult.CSRPTGLVIRTUALF;
                    }
                    else {
                        if (!m_bLastFootersWasPrinted) {
                            // set this flag on to know we have started to
                            // close group footers
                            //
                            m_bLastFootersWasPrinted = true;

                            // we force a change in the first group to force
                            // the close of every group footer
                            //
                            m_groupIndexChange = 1;

                            // set the flag of the last group on to force this call to
                            // print it and the next footers will be printed in sucesive
                            // calls to getLine() -> pGetLineWork() -> pGetLineWorkAuxReportEnd()
                            //
                            m_vGroups[m_vGroups.Length - 1].footerMustBeClosed = true;
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
        };

        const pGetLineAuxReportCancel = function() {
            // if the user has canceled we have finished
            //
            if (!OnProgress("", 0, m_iRow, m_recordCount)) {
                reportDone();
                return csRptGetLineResult.CSRPTGLEND;
            }
            else {
                return csRptGetLineResult.CSRPTGLNONE;
            }
        };

        const pGetLineAuxReportIsDone = function() {
            // if we have printed the las footer we have finished
            //
            if (m_iRow > m_lastRowIndex && pNotPendingFooters()) {
                reportDone();
                m_bPrintFooter = false;
                return csRptGetLineResult.CSRPTGLEND;
            }
            return csRptGetLineResult.CSRPTGLNONE;
        };

        const pEvalFooterToClose2 = function() {
            for(var i = m_groupCount-1; i > -1; i--) {
                if (m_vGroups[i].footerMustBeClosed) {
                    return true;
                }
            }
            return false;
        };

        const pEvalFooterToClose = function() {
            for(var i = m_groupCount-1; i > -1; i--) {
                if (m_vGroups[i].footerMustBeClosed) {
                    m_idxGroupFooter = i + 1;

                    // we have to check only the footer or the group which has
                    // changed and its subgroups
                    //
                    if (m_idxGroupFooter > m_groupIndexChange) {

                        // we need to close the footer of the group which contains it
                        //
                        let -1].footerMustBeClosed = true;
                    }
                    m_bCloseFooter = true;
                    break;
                }
            }
            return m_bCloseFooter;
        };

        const pGetLineAuxPrintHeader = function() {
            // we need to evaluate groups
            //
            for(var i = 0; i < m_groupCount; i++) {

                if (!m_vGroups[i].grandTotalGroup) {

                    if (m_vGroups[i].value === null) {
                        return true;
                    }

                    let col = m_vGroups[i].indexField;
                    let row = m_vRowsIndex[m_iRow2];

                    switch (m_vGroups[i].comparisonType)
                    {
                        case csRptGrpComparisonType.CSRPTGRPTEXT:
                            let text = cReportGlobals.valVariant(m_rows.Rows[row][col]).ToString().ToLower();
                            if (m_vGroups[i].value.ToString() !== text) {
                                return true;
                            }
                            break;
                        case csRptGrpComparisonType.CSRPTGRPNUMBER:
                            let number = cUtil.val(cReportGlobals.valVariant(m_rows.Rows[row][col]));
                            if (m_vGroups[i].value !== number) {
                                return true;
                            }
                            break;
                        case csRptGrpComparisonType.CSRPTGRPDATE:
                            let date = cReportGlobals.dateValue(cReportGlobals.valVariant(m_rows.Rows[row][col]));
                            if (m_vGroups[i].value !== date) {
                                return true;
                            }
                            break;
                    }
                }
            }
            return false;
        };

        const orderDateAsc = function(first, last, orderBy) {
            let i = 0;
            let j = 0;
            let t = 0;
            let q = 0;
            let bChanged = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let row1 = m_vRowsIndex[j];
                    let row2 = m_vRowsIndex[j - 1];
                    let date1 = cReportGlobals.dateValue(cReportGlobals.valVariant(m_rows.Rows[row1][orderBy]));
                    let date2 = cReportGlobals.dateValue(cReportGlobals.valVariant(m_rows.Rows[row2][orderBy]));
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
        };

        const orderDateDesc = function(first, last, orderBy) {
            let i = 0;
            let j = 0;
            let t = 0;
            let q = 0;
            let bChanged = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let row1 = m_vRowsIndex[j];
                    let row2 = m_vRowsIndex[j - 1];
                    let date1 = cReportGlobals.dateValue(cReportGlobals.valVariant(m_rows.Rows[row1][orderBy]));
                    let date2 = cReportGlobals.dateValue(cReportGlobals.valVariant(m_rows.Rows[row2][orderBy]));
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
        };

        const pGetLineAuxDoGroups = function(bGetNewPage) {
            // we continue evaluating groups
            //
            for(var i = 0; i < m_groupCount; i++) {

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
                if (m_vGroups[i].changed) {
                    pGroupChanged(i, bGetNewPage);
                    break;
                }
                else {
                    pEvalGroupChange(i);

                    if (m_vGroups[i].changed) {
                        m_idxGroupHeader = i + 1;

                        // if it is the first time we are printing groups
                        //
                        if (m_firstGroup) {
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
        };

        const pCloseGroupFooters = function(i) {
            // save the index of the outer footer we need to close
            //
            m_groupIndexChange = i + 1;

            m_bCloseFooter = true;
            m_idxGroupFooter = m_groupCount;

            // when a group changes we need to close from the
            // most inner group to the most outer group 
            // which is changing (m_GroupIndexChange)
            //
            for(var j = m_groupIndexChange - 1; j < m_idxGroupFooter; j++) {
                m_vGroups[j].footerMustBeClosed = true;
            }
        };

        const pOpenGroupHeader = function(i) {
            // set this flag off to know we need to print the last footers
            //
            m_bLastFootersWasPrinted = false;
            m_vGroups[i].changed = false;
            m_idxGroupHeader = i + 1;

            // set this flag on to know we need to close
            // the next group in a future call to getLine()
            // only if there are more group
            //
            if (i < m_groupCount - 1) {
                m_vGroups[i + 1].changed = true;
            }
            m_bOpenHeader = true;
        };

        const changeGroup = function(i, value) {
            m_vGroups[i].value = value;
            m_vGroups[i].changed = true;
            if (!m_firstGroup) {
                m_vGroups[i].footerMustBeClosed = true;
            }
            pEvalGroupChangedAux(i + 1);
        };

        const pEvalGroupChange = function(i) {
            if (m_vGroups[i].grandTotalGroup) {
                if (m_vGroups[i].value === null) {
                    changeGroup(i, "1");
                }
            }
            else {
                let col = m_vGroups[i].indexField;
                let row = m_vRowsIndex[m_iRow2];
                switch (m_vGroups[i].comparisonType)
                {
                    case csRptGrpComparisonType.CSRPTGRPTEXT:
                        let text = cReportGlobals.valVariant(m_rows.Rows[row][col]).ToString().ToLower();
                        if (m_vGroups[i].value === null) {
                            changeGroup(i, text);
                        }
                        else if (m_vGroups[i].value.ToString() !== text) {
                            changeGroup(i, text);
                        }
                        break;

                    case csRptGrpComparisonType.CSRPTGRPNUMBER:
                        let number = cUtil.val(cReportGlobals.valVariant(m_rows.Rows[row][col]));
                        if (m_vGroups[i].value === null) {
                            changeGroup(i, number);
                        }
                        else if (m_vGroups[i].value !== number) {
                            changeGroup(i, number);
                        }
                        break;

                    case csRptGrpComparisonType.CSRPTGRPDATE:
                        let date = cReportGlobals.dateValue(cReportGlobals.valVariant(m_rows.Rows[row][col]));
                        if (m_vGroups[i].value === null) {
                            changeGroup(i, date);
                        }
                        else if (m_vGroups[i].value !== date) {
                            changeGroup(i, date);
                        }
                        break;
                }
            }
        };

        const pEvalGroupChangedAux = function(i) {
            for (; i < m_groupCount; i++) {
                pGroupChangedAux(i);
            }
        };

        const pGroupChangedAux = function(i) {
            let col = m_vGroups[i].indexField;
            let row = m_vRowsIndex[m_iRow2];
            switch (m_vGroups[i].comparisonType)
            {
                case csRptGrpComparisonType.CSRPTGRPTEXT:
                    m_vGroups[i].value = cReportGlobals.valVariant(m_rows.Rows[row][col]).ToString().ToLower();
                    break;
                case csRptGrpComparisonType.CSRPTGRPNUMBER:
                    m_vGroups[i].value = cUtil.val(cReportGlobals.valVariant(m_rows.Rows[row][col]));
                    break;
                case csRptGrpComparisonType.CSRPTGRPDATE:
                    m_vGroups[i].value = cReportGlobals.dateValue(cReportGlobals.valVariant(m_rows.Rows[row][col]));
                    break;
            }
        };

        const pGroupChanged = function(i, bGetNewPage) {
            m_idxGroupHeader = i + 1;
            pGroupChangedAux(i);

            bGetNewPage = m_groups.item(i).getPrintInNewPage() && !m_firstGroup;

            // TODO: remove me
            //
            // m_idxGroupHeader = i + 1;

            if (bGetNewPage) {
                // setting it to any value but zero we mean that this group
                // must be printed in a new page
                //
                m_idxGroupToPrintNP = i + 1;
            }
            else {
                m_idxGroupToPrintNP = NO_GROUP_INDEX;
            }

            // set this flag ON to open this group in a future
            // call to getLine(). only if there are more groups
            //
            if (i < m_groupCount - 1) {
                m_vGroups[i + 1].changed = true;
            }
            m_bOpenHeader = true;
        };

        const pGetLineAuxGroupFooter = function(fields) {
            let footerSec = null;
            let ctrl = null;
            let secLn = null;

            // if we need to evaluate functions which must run
            // before printing
            //
            if (m_bEvalPreGroups) {
                // when we are evaluating this kind of formulas we must use
                // the previous row because here we are closing groups
                // which means the current row doesn't belong to the
                // group we are closing
                //
                // NOTE: whe we have done whit printing the footers
                // we need to set m_iRowFormula and m_iRow2 to their 
                // original values
                //
                m_iRowFormula = m_iRow - 1;
                m_iRow2 = m_iRow - 1;

                // to force the next call to getLine() to close the footer
                //
                m_bEvalPreGroups = false;

                return csRptGetLineResult.CSRPTGLVIRTUALF;
            }
            else {

                // if there are more footers to be printed this
                // flag will be turn on in the next call to getLine()
                //
                m_bCloseFooter = false;

                // to force the next call to return CSRPTGLVIRTUALF
                //
                m_bEvalPreGroups = true;

                footerSec = m_groups.item(m_idxGroupFooter - 1).getFooter();

                getLineAux(footerSec, fields);

                return csRptGetLineResult.CSRPTGLGROUPFOOTER;
            }
        };

        const pGetLineAuxGroupHeader = function(bGetNewPage, fields) {
            let headerSec = null;

            if (bGetNewPage && !m_firstGroup) {
                // in the deatil and group headers the row for formulas
                // is the current row
                //
                m_iRowFormula = m_iRow;

                return csRptGetLineResult.CSRPTGLNEWPAGE;
            }
            else {

                // if we need to evaluate the functions which must
                // run before printing
                //
                if (m_bEvalPreGroups) {
                    // if we are not reprinting group headers
                    //
                    if (!m_bHaveToRePrintGroup) {
                        // in the detail and group headers the row for formulas
                        // is the current row
                        //
                        m_iRowFormula = m_iRow;
                    }
                    // to force the next call to getLine() to print the footer
                    //
                    m_bEvalPreGroups = false;

                    return csRptGetLineResult.CSRPTGLVIRTUALH;
                }
                else {

                    m_bOpenHeader = false;

                    // to force the next call to getLine() to return CSRPTGLVIRTUALF
                    //
                    m_bEvalPreGroups = true;
                    headerSec = m_groups.item(m_idxGroupHeader - 1).getHeader();
                    getLineAux(headerSec, fields);

                    // set this flag on to indicate we have footers to close
                    //
                    m_bPrintFooter = true;

                    // we return a group line
                    //
                    return csRptGetLineResult.CSRPTGLGROUPHEADER;
                }
            }
        };

        const pGetLineAuxDetail = function(fields) {
            m_firstGroup = false;

            getLineAux(m_details.item(0), fields);

            // we return a detail line
            //
            return csRptGetLineResult.CSRPTGLDETAIL;
        };

        const getLineAux = function(sec, fields) {
            // for every control in every section line of sec
            // we need to create a new cPageField
            //
            let field = null;
            let secLn = null;
            let ctrl = null;
            let isVisible = false;
            let indexCtrl = 0;

            // this indexes are used to
            //
            // indicate in which data source is this field
            //
            let indexRows = 0;
            //
            // in which row is this field
            //
            let indexRow = 0;
            //
            // in which column is this field
            //
            let indexField = 0;

            if (sec.getHasFormulaHide()) {
                isVisible = cUtil.val(m_compiler.resultFunction(sec.getFormulaHide())) !== 0;
            }
            else {
                isVisible = true;
            }

            if (isVisible) {
                // for every section line in sec
                //
                for(var _i = 0; _i < sec.getSectionLines().count(); _i++) {
                    secLn = sec.getSectionLines().item(_i);
                    m_lineIndex++;

                    if (secLn.getHasFormulaHide()) {
                        m_compiler.evalFunction(secLn.getFormulaHide());
                        isVisible = cUtil.val(m_compiler.resultFunction(secLn.getFormulaHide())) !== 0;
                    }
                    else {
                        isVisible = true;
                    }

                    if (isVisible) {
                        // for every control in the section line
                        //
                        let collByLeft = secLn.getControls().getCollByLeft();
                        for (indexCtrl = 0; indexCtrl < collByLeft.Length; indexCtrl++) {
                            ctrl = secLn.getControls().item(collByLeft[indexCtrl]);

                            // add a new field to the collection
                            //
                            field = fields.add(null, "");
                            field.setIndexLine(m_lineIndex);

                            if (ctrl.getHasFormulaValue()) {
                                field.setValue(
                                    cReportGlobals.format(
                                        m_compiler.resultFunction(ctrl.getFormulaValue()),
                                        ctrl.getLabel().getAspect().getFormat()));
                            }
                            else {
                                let w_label = null;
                                switch (ctrl.getControlType())
                                {
                                    case csRptControlType.CSRPTCTFIELD:

                                        pGetIndexRows(indexRows, indexRow, indexField, ctrl);

                                        if (m_collRows[indexRows] !== null) {
                                            // it looks ugly, dont think you?
                                            //
                                            // maybe this help a litle:
                                            //
                                            //    m_vCollRows(IndexRows)    a matrix with the data 
                                            //                              contained in the datasource
                                            //                              referd by this control
                                            //
                                            //    (IndexField, IndexRow)    a cell in this matrix
                                            //
                                            let value = m_collRows[indexRows].Rows[indexRow][indexField];
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
                                        if (m_collRows[indexRows] !== null) {
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
                                field.setVisible(cUtil.val(m_compiler.resultFunction(ctrl.getFormulaHide())) !== 0);
                            }
                            else {
                                field.setVisible(true);
                            }

                            // set a reference to the definition of this field
                            //
                            field.setInfo(m_pageSetting.item(ctrl.getKey()));
                        }
                    }
                }
            }
        };

        // indexRows     define the datasource
        // indexRow      define the row in the datasource
        //
        const pGetIndexRows = function(indexRows, indexRow, indexField, ctrl) {
            // the datasource index have an offset of 1000 between each other
            //
            indexRows = (ctrl.getField().getIndex() / 1000);
            indexField = ctrl.getField().getIndex() - (indexRows * 1000);

            if (indexRows === 0) {
                indexRow = m_vRowsIndex[m_iRow2];
            }
            else {
                indexRow = m_vRowsIndexAux[indexRows];
            }
        };

        self.init = function(oLaunchInfo) {
            try {
                setLaunchInfo(oLaunchInfo);
                return true;
            }
            catch (ex) {
                cError.mngError(ex, "Init", C_MODULE, "");
                return false;
            }
        };

        // run report
        //
		self.launch = function() {
			return launch(null);
		};
        self.launch = function(oLaunchInfo) {
            try {
                let recordsets = null;
                let rs = null;

                m_compiler.setReport(this);
                m_compiler.initGlobalObject();

                if (oLaunchInfo === null) {
                    if (m_launchInfo === null) {
                        throw new ReportLaunchInfoNoDefined(
                            C_MODULE,
                            cReportError.errGetDescript(
                                            csRptErrors.LAUNCH_INFO_UNDEFINED));
                    }
                }
                else {
                    setLaunchInfo(oLaunchInfo);
                }

                if (m_launchInfo.getPrinter() === null) {
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

                m_collRows = new DataTable[1];

                // get the main recordset
                //
                if (!pGetData(m_rows, rs, m_connect, true, recordsets)) {
                    return false;
                }

                // the first element contains the main recordset
                //
                m_collRows[0] = m_rows;

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

                m_pages.clear();
                m_lineIndex = 0;

                // globals initialization
                //
                m_bPrintFooter = false;
                m_bLastFootersWasPrinted = false;
                m_groupIndexChange = NO_GROUP_INDEX;
                m_iRow2 = 0;
                m_iRowFormula = 0;
                pSetGroupFormulaHeaders();
                pSetGroupsInCtrlFormulaHide();
                pSetIndexColInGroupFormulas(recordsets);
                pInitRowFormulas();

                // check if there are groups which need to be reprinted when the page change
                //
                pExistsGroupToReprintInNP();

                // to force the evaluate of the groups in the first page
                //
                m_bEvalPreGroups = true;
                m_bCloseFooter = false;
                m_bOpenHeader = false;

                let formula = null;
                for(var _i = 0; _i < m_formulas.count(); _i++) {
                    formula = m_formulas.item(_i);
                    formula.setHaveToEval(true);
                }

                // launch the report
                //
                m_launchInfo.getObjPaint().setReport(this);
                if (!m_launchInfo.getObjPaint().makeReport()) {
                    return false;
                }

                switch (m_launchInfo.getAction())
                {
                    case csRptLaunchAction.CSRPTLAUNCHPRINTER:
                        if (!m_launchInfo.getObjPaint().printReport()) {
                            return false;
                        }
                        break;
                    case csRptLaunchAction.CSRPTLAUNCHFILE:
                        if (!m_launchInfo.getObjPaint().makeXml()) {
                            return false;
                        }
                        break;
                    case csRptLaunchAction.CSRPTLAUNCHPREVIEW:
                        if (!m_launchInfo.getObjPaint().previewReport()) {
                            return false;
                        }
                        break;
                }

                return true;

            }
            catch (ex) {
                m_compiler.setReport(null);

                // if we haven't printed to preview
                // we need to clear the references 
                // between cReport and cReportLaunchInfo
                //
                if (m_launchInfo.getAction() !== csRptLaunchAction.CSRPTLAUNCHPREVIEW) {
                    m_launchInfo.getObjPaint().setReport(null);
                    m_launchInfo.setObjPaint(null);
                }

                throw new ReportException(csRptErrors.ERROR_WHEN_RUNNING_REPORT,
                                          C_MODULE,
                                          "Error when running report.\n\n"
                                          + "Info: " + ex.Message + "\n"
                                          + "Source: " + ex.Source + "\n"
                                          + "Stack trace: " + ex.StackTrace + "\n"
                                          + "Description: " + ex.ToString()
                                          );
            }
        };

        self.loadSilent = function(fileName) {

            try {
                let docXml = null;
                docXml = new CSXml.cXml();

                let f = null;
                f = new CSKernelFile.cFile();

                m_path = cFile.getPath(fileName);
                m_name = cFile.getFileName(fileName);

                docXml.init(null); {
                docXml.setFilter(C_FILEEX); {
                docXml.setName(m_name); {
                docXml.setPath(m_path); {

                if (!docXml.openXml()) {
                    return false;
                }

                m_path = docXml.getPath();
                m_name = docXml.getName();
                let property = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
                m_reportDisconnected = property.getValueBool(eTypes.eBoolean);

                return nLoad(docXml);
            }
            catch (ex) {
                cError.mngError(ex, "LoadSilent", C_MODULE, "");
                return false;
            }
        };

        self.load = function(commDialog) {
            try {
                let docXml = null;
                docXml = new CSXml.cXml();

                docXml.init(commDialog); {
                docXml.setFilter(C_FILEEX); {

                if (m_name !== "") {
                    docXml.setName(m_name); {
                }
                else {
                    docXml.setPath(m_pathDefault + "\\*." + C_FILEEX); {
                }

                docXml.setPath(m_path); {

                if (!docXml.openXmlWithDialog()) {
                    return false;
                }

                m_path = docXml.getPath();
                m_name = docXml.getName();
                let property = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
                m_reportDisconnected = property.getValueBool(eTypes.eBoolean);

                return nLoad(docXml);
            }
            catch (ex) {
                cError.mngError(ex, "Load", C_MODULE, "");
                return false;
            }
        };

        self.save = function(commDialog, withDialog) {
            let docXml = null;
            docXml = new CSXml.cXml();

            docXml.init(commDialog); {
            docXml.setFilter(C_FILEEX); {
            docXml.setName(m_name); {
            docXml.setPath(m_path); {

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

            m_name = docXml.getName();
            m_path = docXml.getPath();

            let xProperty = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("RptName");
            xProperty.setValue(eTypes.eText, m_name);
            docXml.addProperty(xProperty); {

            xProperty.setName("ReportDisconnected");
            xProperty.setValue(eTypes.eBoolean, m_reportDisconnected);
            docXml.addProperty(xProperty); {

            // sections
            //
            let sec = null;
            let nodeObj = null;

            if (!m_connect.save(docXml, null)) {
                return false;
            }
            if (!m_connectsAux.save(docXml, null)) {
                return false;
            }
            if (!m_launchInfo.save(docXml, null)) {
                return false;
            }

            xProperty.setName(C_NODERPTHEADERS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < m_headers.count(); _i++) {
                sec = m_headers.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODERPTDETAILS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < m_details.count(); _i++) {
                sec = m_details.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODERPTFOOTERS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < m_footers.count(); _i++) {
                sec = m_footers.item(_i);
                sec.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODEGROUPS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            let group = null;

            for(var _i = 0; _i < m_groups.count(); _i++) {
                group = m_groups.item(_i);
                group.save(docXml, nodeObj);
            }

            xProperty.setName(C_NODERPTFORMULAS);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            let formula = null;
            for(var _i = 0; _i < m_formulas.count(); _i++) {
                formula = m_formulas.item(_i);
                if (!formula.getNotSave()) {
                    formula.save(docXml, nodeObj);
                }
            }

            xProperty.setName(C_NODEPAPERINFO);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);
            m_paperInfo.save(docXml, nodeObj);

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
        };

        self.loadSilentData = function(fileName) {
            let docXml = null;
            docXml = new CSXml.cXml();

            m_path = CSKernelFile.cFile.getPath(fileName);
            m_name = CSKernelFile.cFile.getFileName(fileName);

            docXml.init(null); {
            docXml.setFilter(C_FILEDATAEX); {
            docXml.setName(m_name); {
            docXml.setPath(m_path); {

            if (!docXml.openXml()) {
                return false;
            }

            m_path = docXml.getPath();
            m_name = docXml.getName();

            let property = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
            m_reportDisconnected = property.getValueBool(eTypes.eBoolean);

            return nLoadData(docXml);
        };

        self.loadData = function(commDialog) {
            let docXml = null;
            docXml = new CSXml.cXml();

            docXml.init(commDialog); {
            docXml.setFilter(C_FILEDATAEX); {
            docXml.setName(m_name); {
            docXml.setPath(m_path); {

            if (!docXml.openXmlWithDialog()) {
                return false;
            }

            m_path = docXml.getPath();
            m_name = docXml.getName();
            let property = docXml.getNodeProperty(docXml.getRootNode(), "ReportDisconnected");
            m_reportDisconnected = property.getValueBool(eTypes.eBoolean);

            return nLoadData(docXml);
        };

        self.saveData = function(commDialog, withDialog) {
            let docXml = null;
            docXml = new CSXml.cXml();

            docXml.init(commDialog); {
            docXml.setFilter(C_FILEDATAEX); {
            docXml.setName(getFileName(m_name) + "-data.csd"); {
            docXml.setPath(m_path); {

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

            let mouse = new cMouseWait();
            let dataName = "";
            let dataPath = "";

            dataName = docXml.getName();
            dataPath = docXml.getPath();

            let xProperty = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("RptName");
            xProperty.setValue(eTypes.eText, dataName);
            docXml.addProperty(xProperty); {

            // Configuracion de paginas
            let nodeObj = null;
            let nodeObjAux = null;

            // Paginas
            let page = null;

            xProperty.setName(C_NODERPTPAGES);
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            for(var _i = 0; _i < m_pages.count(); _i++) {
                page = m_pages.item(_i);
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
        };

        const saveDataForWeb = function(page, dataName, dataPath) {
            let docXml = null;
            docXml = new CSXml.cXml();

            docXml.init(null); {
            docXml.setFilter("xml"); {
            docXml.setName(getFileName(dataName) + "-1.xml"); {
            docXml.setPath(dataPath); {

            if (!docXml.newXml()) {
                return false;
            }

            dataName = docXml.getName();

            let xProperty = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName("Page_" + page.getPageNumber().ToString());
            xProperty.setValue(eTypes.eText, dataName);
            docXml.addProperty(xProperty); {

            let nodeObj = null;

            xProperty.setName("Page");
            xProperty.setValue(eTypes.eText, "");
            nodeObj = docXml.addNode(xProperty);

            page.saveForWeb(docXml, nodeObj);

            return docXml.save();
        };

        self.getValueFromRs = function(colIndex) {
            return m_rows.Rows[m_vRowsIndex[m_iRow2]][colIndex];
        };

        self.getValueString = function(controlName) {
            let value = getValue(controlName, false);
            if (value === null) {
                return "";
            }
            else {
                return value.ToString();
            }
        };

        self.getValue = function(controlName) {
            return getValue(controlName, false);
        };

        self.getValue = function(controlName, notFormat) {
            let ctrl = null;
            let found = false;
            let iRow = 0;

            if (m_iRowFormula > m_lastRowIndex) {
                iRow = m_lastRowIndex;
            }
            else {
                iRow = m_iRowFormula;
            }

            for(var _i = 0; _i < m_controls.count(); _i++) {
                ctrl = m_controls.item(_i);
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
                    let indexRows = 0;
                    // current row in the active datasource
                    //
                    let indexRow = 0;
                    let indexField = 0;

                    // the datasource index have an offset of 1000 between each other
                    //
                    indexRows = (ctrl.getField().getIndex() / 1000);
                    indexField = ctrl.getField().getIndex() - (indexRows * 1000);

                    if (indexRows === 0) {
                        indexRow = m_vRowsIndex[iRow];
                    }
                    else {
                        indexRow = m_vRowsIndexAux[indexRows];
                    }

                    if (m_collRows[indexRows] !== null) {
                        // it looks ugly, dont think you?
                        //
                        // maybe this help a litle:
                        //
                        //    m_vCollRows(IndexRows)    a matrix with the data 
                        //                              contained in the datasource
                        //                              referd by this control
                        //
                        //    (IndexField, IndexRow)    a cell in this matrix
                        //
                        let value = m_collRows[indexRows].Rows[indexRow][indexField];
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
                            let value = m_compiler.resultFunction(ctrl.getFormulaValue());
                            if (ctrl.getLabel().getAspect().getFormat() !== "" && notFormat === false) {
                                return cReportGlobals.format(value, ctrl.getLabel().getAspect().getFormat());
                            }
                            else {
                                return value;
                            }
                        }
                        else {
                            let value = ctrl.getFormulaValue().getLastResult();
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
        };

        const initControls = function(recordsets) {
            let ctrl = null;
            let serie = null;
            let idx = 0;

            for(var _i = 0; _i < m_controls.count(); _i++) {
                ctrl = m_controls.item(_i);
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
        };

        const compareColumnName = function(columnName, fieldName) {
            if (columnName === fieldName) {
                return true;
            }
            else {
                return columnName === fieldName.Replace(" ", "_").Replace(".","");
            }
        };

        const pInitCtrls = function(ctrl, idx, recordsets, fieldName) {
            let found = false;
            let j = 0;
            let bIsDBImage = false;

            let dataSource = pGetDataSource(fieldName);

            // index of the group which contains the control
            //
            let k = 0;

            for(var _i = 0; _i < recordsets.Count; _i++) {
                let varRs = recordsets[_i];
                let rsDataSource = varRs[1];
                if (rsDataSource.ToUpper() === dataSource.ToUpper() || dataSource === "") {
                    let rs = varRs[0];

                    for (j = 0; j < rs.Columns.Count; j++) {
                        if (compareColumnName(rs.Columns[j].ColumnName.ToUpper(), cReportGlobals.getRealName(fieldName).ToUpper())) {
                            // TODO: we need to check what is the value of rs.Columns[j].DataType
                            //       when the column contains a binary field (tipicaly used for images)
                            //
                            let typeCode = System.Type.GetTypeCode(rs.Columns[j].DataType);
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
        };

        const pGetDataSource = function(name) {
            let n = 0;
            n = name.IndexOf("}.", 0);
            if (n === -1) {
                return "";
            }
            else {
                n = n - 1;
                return name.Substring(1, n);
            }
        };

        const pInitImages = function() {
            pDestroyImages();
            m_images = new Dictionary();
        };

        const pDestroyImages = function() {
            if (m_images !== null) {
                for(var i_ = 0; i_ < m_images.length; i_++) {
                    item.Value.Dispose();
                }
                m_images = null;
            }
        };

        const pGetChartImage = function(indexRows, indexField, indexRow, ctrl) {
            if (ctrl.getChart().getChartCreated()) {
                return ctrl.getChart().getImage();
            }
            else {
                if (ctrl.getChart().make(m_collRows[indexRows].Rows, ctrl.getLabel().getAspect().getFormat(), false, "")) {
                    return ctrl.getChart().getImage();
                }
                else {
                    return null;
                }
            }
        };

        // the params are used to create a key 
        // to use as an id for every image contained 
        // in the report
        //
        const pGetImage = function(indexRows, indexField, indexRow) {
            let key = "";
            let image = null;
            let fileInTMP = "";

            key = "k" + indexRows.ToString() + indexField.ToString() + indexRow.ToString();
            if(m_images.ContainsKey(key)) {
                image = m_images[key];
            }
            else {
                // we are optimistic. if I don't get a picture
                // we return null but don't complaint
                //
                let bytes = null;

                // it looks ugly, don't you think?
                //
                // maybe this help a litle:
                //
                //    m_vCollRows(IndexRows)    a matrix with the data 
                //                              contained in the datasource
                //                              referd by this control
                //
                //    (IndexField, IndexRow)    a cell in this matrix
                //
                let value = m_collRows[indexRows].Rows[indexRow][indexField];
                bytes = value;

                fileInTMP = pGetFileImageInTMP(bytes);

                if (fileInTMP !== "") {
                    try {
                        let tmpImage = Image.FromFile(fileInTMP);
                        image = new Bitmap(tmpImage);
                        tmpImage.Dispose();
                        m_images.Add(key, image);
                    }
                    catch(ex) {
                        // we don't care
                    }
                }
            }
            return image;
        };

        const pGetFileImageInTMP = function(bytes) {
            let fileName = "~csrptImage";
            fileName = cUtil.getValidPath(System.IO.Path.GetTempPath()) + fileName;

            let fileEx = null;
            fileEx = new CSKernelFile.cFileEx();
            if (!fileEx.fileDelete(fileName)) { return ""; }

            let file = new CSKernelFile.cFile();
            if (!file.open(fileName, eFileMode.eBinaryWrite, true, true, eFileAccess.eLockWrite, false, false)) {
                return "";
            }

            if (!file.binaryWrite(bytes)) {
                return "";
            }

            file.close();

            return fileName;
        };

        self.setLaunchInfo = function(oLaunchInfo) {
            m_launchInfo = new cReportLaunchInfo();
            // copy from oLaunchInfo to m_LaunchInfo
            //
            m_launchInfo.setAction(oLaunchInfo.getAction());
            m_launchInfo.setStrConnect(oLaunchInfo.getStrConnect());
            m_launchInfo.setCopies(oLaunchInfo.getCopies());

            m_launchInfo.setObjPaint(oLaunchInfo.getObjPaint());
            m_launchInfo.setDataSource(oLaunchInfo.getDataSource());

            m_launchInfo.setFile(oLaunchInfo.getFile());
            m_launchInfo.setFileFormat(oLaunchInfo.getFileFormat());
            m_launchInfo.setInternalPreview(oLaunchInfo.getInternalPreview());
            m_launchInfo.setShowPrintersDialog(oLaunchInfo.getShowPrintersDialog());
            m_launchInfo.setSilent(oLaunchInfo.getSilent());
            m_launchInfo.setSqlstmt(oLaunchInfo.getSqlstmt());
            m_launchInfo.setPrinter(oLaunchInfo.getPrinter());

            // if the printer is not defined
            //
            if (m_launchInfo.getPrinter() === null) {
                // we use the default printer of the OS
                //
                m_launchInfo.setPrinter(cPrintAPI.getcPrinterFromDefaultPrinter(null));
            }

            // if we have a reference to a printer
            //
            if (m_launchInfo.getPrinter() !== null) {
                // TODO: check the values of paperType after calling
                //       getcPrinterFromDefaultPrinter() because
                //       the constants used by the OS could be differents
                //       from the used by CSReport. in the original vb6 version
                //       it was the case
                //

                // finaly we copy into m_PaperInfo the definicion found in LaunchInfo.
                //
                // when the report is called without define a printer
                // whe assign a defult printer and asign m_PaperInfo 
                // to m_LaunchInfo.Printer.PaperInfo, so sometimes we
                // don't need to do that
                //
                if (!object.ReferenceEquals(m_paperInfo, m_launchInfo.getPrinter().getPaperInfo())) {
                    m_paperInfo.setHeight(m_launchInfo.getPrinter().getPaperInfo().getHeight());
                    m_paperInfo.setWidth(m_launchInfo.getPrinter().getPaperInfo().getWidth());
                }
            }
        };

        self.getGroupTotal = function(colIndex, indexGroup) {
            let iRow = 0;
            let rtn = 0;
            let i = 0;

            if (indexGroup === -1) {
                for (iRow = 0; iRow < m_recordCount; iRow++) {
                    rtn = rtn + cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                }
            }
            else {
                if (m_vGroups[indexGroup].grandTotalGroup) {
                    for (iRow = 0; iRow < m_recordCount; iRow++) {
                        rtn = rtn + cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                    }
                }
                else {
                    for (iRow = m_iRow; iRow < m_recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (m_vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else  {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let text = cReportGlobals.valVariant(value);
                                        if (m_vGroups[i].value !== text.ToLower()) {
                                            return rtn;
                                        }
                                    }

                                    if (i === indexGroup) {
                                        let value = m_rows.Rows[colIndex][m_vRowsIndex[iRow]];
                                        rtn = rtn + cReportGlobals.valVariant(value);
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }

                                    if (i === indexGroup) {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][colIndex];
                                        rtn = rtn + cReportGlobals.valVariant(value);
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }

                                    if (i === indexGroup) {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][colIndex];
                                        rtn = rtn + cReportGlobals.valVariant(value);
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return rtn;
        };

        self.getGroupMax = function(colIndex, indexGroup) {
            let iRow = 0;
            let rtn = 0;
            let i = 0;

            rtn = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);

            if (indexGroup === -1) {
                for (iRow = 0; iRow < m_recordCount; iRow++) {
                    let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                    if (rtn < value) {
                        rtn = value;
                    }
                }
            }
            else {
                if (m_vGroups[indexGroup].grandTotalGroup) {
                    for (iRow = 0; iRow < m_recordCount; iRow++) {
                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                        if (rtn < value) {
                            rtn = value;
                        }
                    }
                }
                else {
                    for (iRow = m_iRow; iRow < m_recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (m_vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let text = cReportGlobals.valVariant(value);
                                        if (m_vGroups[i].value !== text.ToLower()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                                        if (rtn < value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                                        if (rtn < value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
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
        };

        self.getGroupMin = function(colIndex, indexGroup) {
            let iRow = 0;
            let rtn = 0;
            let i = 0;

            rtn = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);

            if (indexGroup === -1) {
                for (iRow = 0; iRow < m_recordCount; iRow++) {
                    let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                    if (rtn > value) {
                        rtn = value;
                    }
                }
            }
            else {
                if (m_vGroups[indexGroup].grandTotalGroup) {
                    for (iRow = 0; iRow < m_recordCount; iRow++) {
                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                        if (rtn > value) {
                            rtn = value;
                        }
                    }
                }
                else {
                    for (iRow = m_iRow; iRow < m_recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (m_vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let text = cReportGlobals.valVariant(value);
                                        if (m_vGroups[i].value !== text.ToLower()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                                        if (rtn > value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                                        if (rtn > value) {
                                            rtn = value;
                                        }
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
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
        };

        self.getGroupAverage = function(colIndex, indexGroup) {
            let iRow = 0;
            let rtn = 0;
            let i = 0;
            let count = 0;

            if (indexGroup === -1) {
                for (iRow = 0; iRow < m_recordCount; iRow++) {
                    rtn = rtn + cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                    count = count + 1;
                }
            }
            else {
                if (m_vGroups[indexGroup].grandTotalGroup) {

                    for (iRow = 0; iRow < m_recordCount; iRow++) {
                        rtn = rtn + cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                        count = count + 1;
                    }

                }
                else {
                    for (iRow = m_iRow; iRow < m_recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (m_vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let text = cReportGlobals.valVariant(value);
                                        if (m_vGroups[i].value !== text.ToLower()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                                        count = count + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                                        count = count + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== date) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[iRow]][colIndex]);
                                        count = count + 1;
                                    }
                                    break;
                            }
                        }
                    }
                }
            }
            return cUtil.divideByZero(rtn, count);
        };

        self.getGroupLineNumber = function(indexGroup) {
            if (indexGroup === -1) {
                return m_lineNumber;
            }
            else {
                return m_vGroups[indexGroup].lineNumber;
            }
        };

        self.getGroupCount = function(colIndex, indexGroup) {
            let iRow = 0;
            let rtn = 0;
            let i = 0;

            if (indexGroup === -1) {
                rtn = m_recordCount;
            }
            else {
                if (m_vGroups[indexGroup].grandTotalGroup) {
                    rtn = m_recordCount;
                }
                else {
                    for (iRow = m_iRow; iRow < m_recordCount; iRow++) {
                        for (i = 0; i < indexGroup; i++) {
                            switch (m_vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let text = cReportGlobals.valVariant(value);
                                        if (m_vGroups[i].value !== text.ToLower()) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let number = cUtil.val(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== number) {
                                            return rtn;
                                        }
                                    }
                                    if (i === indexGroup) {
                                        rtn = rtn + 1;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:

                                    if (m_vGroups[i].value === null) {
                                        return rtn;
                                    }
                                    else {
                                        let value = m_rows.Rows[m_vRowsIndex[iRow]][m_vGroups[i].indexField];
                                        let date = cReportGlobals.dateValue(cReportGlobals.valVariant(value));
                                        if (m_vGroups[i].value !== date) {
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
        };

        const addGroup = function(i, j, value) {
            // set the upper bound of the last group
            //
            m_vGroups[i + 1].groups[m_vGroups[i + 1].groups.Length - 1].last = j - 1;
            // add a new group
            //
            redimPreserve(m_vGroups[i + 1].groups, m_vGroups[i + 1].groups.Length + 1);
            m_vGroups[i + 1].groups[m_vGroups[i + 1].groups.Length - 1].first = j;
            m_vGroups[i + 1].value = value;       
        };

        const initGroups = function(rs, mainDataSource) {
            m_groupCount = m_groups.count();
            m_firstGroup = true;

            if (m_groupCount === 0 || m_rows === null) {
                m_vGroups = null;
                return true;
            }
            else {
                m_vGroups = new T_Groups[m_groupCount];
                for (var t = 0; t < m_groupCount; t++) {
                    m_vGroups[t] = new T_Groups();
                }
            }

            if (!OnProgress("Ordenando el reporte", 0, 0, 0)) {
                return false;
            }

            let k = 0;
            let i = 0;
            let j = 0;
            let found = false;
            let fieldName = "";
            let dataSource = "";

            // we need to check every group is in the main recordset
            //
            for (i = 0; i < m_groupCount; i++) {
                m_vGroups[i].value = null;
                found = false;
                fieldName = m_groups.item(i).getFieldName();
                dataSource = pGetDataSource(fieldName).ToUpper();
                fieldName = cReportGlobals.getRealName(fieldName).ToUpper();

                // the column must be in the main recordset
                //
                if (mainDataSource.ToUpper() !== dataSource && dataSource !== "") {
                    let w_item = m_groups.item(i);
                    throw new ReportException(csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS,
                                                C_MODULE,
                                                cReportError.errGetDescript(
                                                                csRptErrors.GROUP_NOT_FOUND,
                                                                w_item.getName(),
                                                                w_item.getFieldName())
                                                );
                }
                m_vGroups[i].grandTotalGroup = m_groups.item(i).getGrandTotalGroup();

                if (!m_vGroups[i].grandTotalGroup) {
                    for (j = 0; j < rs.Columns.Count; j++) {
                        if (compareColumnName(rs.Columns[j].ColumnName.ToUpper(), fieldName)) {
                            found = true;
                            break;
                        }
                    }
                    if (found) {
                        m_vGroups[i].indexField = j;
                    }
                    else {
                        let w_item = m_groups.item(i);
                        throw new ReportException(csRptErrors.GROUP_NOT_FOUND_IN_MAIN_RS,
                                                    C_MODULE,
                                                    cReportError.errGetDescript(
                                                                    csRptErrors.GROUP_NOT_FOUND,
                                                                    w_item.getName(),
                                                                    w_item.getFieldName())
                                                    );
                    }
                }
                m_vGroups[i].comparisonType = m_groups.item(i).getComparisonType();
                m_vGroups[i].oderType = m_groups.item(i).getOderType();

                m_vGroups[i].groups = new T_Group[1];
                m_vGroups[i].groups[0] = new T_Group();
            }

            let recordCount = 0;
            let q = 0;

            m_vGroups[0].groups = new T_Group[1];
            m_vGroups[0].groups[0] = new T_Group();
            recordCount = m_vRowsIndex.Length;
            m_vGroups[0].groups[0].first = 0;
            m_vGroups[0].groups[0].last = recordCount-1;
            recordCount = m_groupCount * recordCount;

            // we need to sort the data
            //
            for (i = 0; i < m_groupCount; i++) {
                for (j = 0; j < m_vGroups[i].groups.Length; j++) {
                    if (!m_vGroups[i].grandTotalGroup) {
                        if (m_vGroups[i].oderType === csRptGrpOrderType.CSRPTGRPASC) {
                            switch (m_vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:
                                    if (!orderTextAsc(m_vGroups[i].groups[j].first,
                                                        m_vGroups[i].groups[j].last,
                                                        m_vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:
                                    if (!orderNumberAsc(m_vGroups[i].groups[j].first,
                                                        m_vGroups[i].groups[j].last,
                                                        m_vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:
                                    if (!orderDateAsc(m_vGroups[i].groups[j].first,
                                                        m_vGroups[i].groups[j].last,
                                                        m_vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;
                            }
                        }
                        else {
                            switch (m_vGroups[i].comparisonType)
                            {
                                case csRptGrpComparisonType.CSRPTGRPTEXT:
                                    if (!orderTextDesc(m_vGroups[i].groups[j].first,
                                                        m_vGroups[i].groups[j].last,
                                                        m_vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPNUMBER:
                                    if (!orderNumberDesc(m_vGroups[i].groups[j].first,
                                                            m_vGroups[i].groups[j].last,
                                                            m_vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;

                                case csRptGrpComparisonType.CSRPTGRPDATE:
                                    if (!orderDateDesc(m_vGroups[i].groups[j].first,
                                                        m_vGroups[i].groups[j].last,
                                                        m_vGroups[i].indexField)) {
                                        return false;
                                    }
                                    break;
                            }
                        }
                    }
                }

                // after sorting we need to prepare the next group
                //
                if (i < m_groupCount - 1) {
                    for (k = 0; k < m_vGroups[i].groups.Length; k++) {
                        // if it is a total group the next group
                        // is from the first to the last row in 
                        // the main recordset
                        // Si es un grupo de totales el proximo grupo
                        // first (position: 0)
                        // last  (position: m_vGroups[0].groups[0].last)
                        //
                        if (m_vGroups[i].grandTotalGroup) {
                            let t = i + 1;
                            let r = m_vGroups[t].groups.Length - 1;
                            m_vGroups[t].groups[r].last = -1;

                            // add a group item
                            //
                            redimPreserve(m_vGroups[t].groups, r + 2);
                            r = m_vGroups[t].groups.Length - 1;

                            // set the values of the new group item
                            //
                            m_vGroups[t].groups[t].first = 0;
                            m_vGroups[t].groups[t].last = m_vGroups[0].groups[0].last;
                            m_vGroups[t].value = null;
                        }
                        else {
                            for (j = m_vGroups[i].groups[k].first; j <= m_vGroups[i].groups[k].last; j++) {
                                q = q + 1;
                                if (!OnProgress("", 0, q, recordCount)) {
                                    return false;
                                }

                                let value = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[j]][m_vGroups[i].indexField]);
                                if (m_vGroups[i + 1].value === null) {
                                    addGroup(i, j, value);
                                }
                                else {
                                    switch (m_vGroups[i].comparisonType)
                                    {
                                        case csRptGrpComparisonType.CSRPTGRPTEXT:

                                            let text1 = m_vGroups[i + 1].value.ToString();
                                            let text2 = value.ToString();
                                            if (text1.ToLower() !== text2.ToLower()) {
                                                addGroup(i, j, value);
                                            }
                                            break;

                                        case csRptGrpComparisonType.CSRPTGRPNUMBER:

                                            let number1 = cUtil.val(m_vGroups[i + 1].value);
                                            let number2 = cUtil.val(value);
                                            if (number1 !== number2) {
                                                addGroup(i, j, value);
                                            }
                                            break;

                                        case csRptGrpComparisonType.CSRPTGRPDATE:

                                            let date1 = m_vGroups[i + 1].value;
                                            let date2 = value;
                                            if (date1 !== date2) {
                                                addGroup(i, j, value);
                                            }
                                            break;
                                    }
                                }
                            }
                            m_vGroups[i + 1].groups[m_vGroups[i + 1].groups.Length - 1].last = j - 1;
                            m_vGroups[i + 1].value = null;
                        }
                    }
                }
            }
            return true;
        };

        const pEstimateLoops = function(n) {
            for(var q = n - 1; q > 0; q--) {
                n = n + q;
            }
            return n;
        };

        const orderNumberAsc = function(first, last, orderBy) {
            let i = 0;
            let j = 0;
            let t = 0;
            let q = 0;
            let bChanged = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let value1 = cUtil.val(m_rows.Rows[m_vRowsIndex[j]][orderBy]);
                    let value2 = cUtil.val(m_rows.Rows[m_vRowsIndex[j - 1]][orderBy]);
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
        };

        const orderNumberDesc = function(first, last, orderBy) {
            let i = 0;
            let j = 0;
            let t = 0;
            let q = 0;
            let bChanged = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let number1 = cUtil.val(m_rows.Rows[m_vRowsIndex[j]][orderBy]);
                    let number2 = cUtil.val(m_rows.Rows[m_vRowsIndex[j - 1]][orderBy]);
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
        };

        const orderTextAsc = function(first, last, orderBy) {
            let i = 0;
            let j = 0;
            let t = 0;
            let q = 0;
            let bChanged = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let text1 = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[j]][orderBy]).ToString();
                    let text2 = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[j - 1]][orderBy]).ToString();
                    if (String.Compare(text1.ToLower(), 
                                        text2.ToLower(), 
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
        };

        const orderTextDesc = function(first, last, orderBy) {
            let i = 0;
            let j = 0;
            let t = 0;
            let q = 0;
            let bChanged = false;

            t = pEstimateLoops(last - first);
            for (i = first + 1; i <= last; i++) {
                bChanged = false;
                for (j = last; j >= i; j--) {
                    q = q + 1;
                    let text1 = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[j]][orderBy]).ToString();
                    let text2 = cReportGlobals.valVariant(m_rows.Rows[m_vRowsIndex[j - 1]][orderBy]).ToString();
                    if (String.Compare(text1.ToLower(),
                                        text2.ToLower(),
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
        };

        const changeRow = function(i, j) {
            let q = m_vRowsIndex[j];
            m_vRowsIndex[j] = m_vRowsIndex[i];
            m_vRowsIndex[i] = q;
        };

        const evalFunctions = function(idxGroup, whenEval) {
            let formula = null;
            let bHaveToEvalRow = false;
            let idxRowEvalued = 0;
            let recordCount = 0;

            if (m_rows !== null) {
                recordCount = m_vRowsIndex.Length;
            }

            // if the row to be evaluated is valid
            //
            if (m_iRowFormula < recordCount) {
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
                            bHaveToEvalRow = m_vGroups[(idxGroup * -1) - 1].lastFPreRowEvalued < m_iRowFormula;
                        }
                        else {
                            bHaveToEvalRow = m_vGroups[idxGroup - 1].lastHPreRowEvalued < m_iRowFormula;
                        }
                    }
                    else {
                        bHaveToEvalRow = m_lastRowPreEvalued[idxRowEvalued] < m_iRowFormula;
                    }

                }
                // evaluate function after printing
                //
                else {
                    if (idxRowEvalued === C_IDX_G_LAST_ROW_EVALUED) {
                        // if it is a footer
                        //
                        if (idxGroup < 0) {
                            bHaveToEvalRow = m_vGroups[(idxGroup * -1) - 1].lastFPostRowEvalued < m_iRowFormula;
                        }
                        else {
                            bHaveToEvalRow = m_vGroups[idxGroup - 1].lastHPostRowEvalued < m_iRowFormula;
                        }
                    }
                    else {
                        bHaveToEvalRow = m_lastRowPostEvalued[idxRowEvalued] < m_iRowFormula;
                    }
                }

                // if we need to evaluate
                //
                if (bHaveToEvalRow) {
                    for(var _i = 0; _i < m_formulas.count(); _i++) {
                        formula = m_formulas.item(_i);
                        if (formula.getWhenEval() === whenEval
                            && (idxGroup === formula.getIdxGroup()
                                    || formula.getIdxGroup2() === idxGroup)) {
                            formula.setHaveToEval(true);
                        }
                    }
                    for(var _i = 0; _i < m_formulas.count(); _i++) {
                        formula = m_formulas.item(_i);
                        if (formula.getWhenEval() === whenEval
                            && (idxGroup === formula.getIdxGroup()
                                || formula.getIdxGroup2() === idxGroup)) {
                            if (formula.getIdxGroup2() === idxGroup) {
                                m_compiler.evalFunctionGroup(formula);
                            }
                            else {
                                m_compiler.evalFunction(formula);
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
                                m_vGroups[(idxGroup * -1) - 1].lastFPreRowEvalued = m_iRowFormula;
                            }
                            else {
                                m_vGroups[idxGroup - 1].lastHPreRowEvalued = m_iRowFormula;
                            }
                        }
                        else {
                            m_lastRowPreEvalued[idxRowEvalued] = m_iRowFormula;
                        }
                    }
                    // evaluate after printing
                    //
                    else {
                        if (idxRowEvalued === C_IDX_G_LAST_ROW_EVALUED) {
                            // if it is a footer
                            //
                            if (idxGroup < 0) {
                                m_vGroups[(idxGroup * -1) - 1].lastFPostRowEvalued = m_iRowFormula;
                            }
                            else {
                                m_vGroups[idxGroup - 1].lastHPostRowEvalued = m_iRowFormula;
                            }
                        }
                        else {
                            m_lastRowPostEvalued[idxRowEvalued] = m_iRowFormula;
                        }
                    }
                }
            }
            return true;
        };

        // all the formulas which are in headers are compile
        // only one time for page. to do this we set the idxGroup
        // of the formula to -2000
        //
        const pSetGroupFormulaHeaders = function() {
            pSetGroupFormulaHF(m_headers, C_IDX_GROUP_HEADER);

            // the main header is -2000
            //
            if (m_headers.item(0).getHasFormulaHide()) {
                m_headers.item(0).getFormulaHide().setIdxGroup(C_IDX_GROUP_REPORTHEADER);
            }

            let secLn = null;
            let ctrl = null;

            for(var _i = 0; _i < m_headers.item(0).getSectionLines().count(); _i++) {
                secLn = m_headers.item(0).getSectionLines().item(_i);
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
        };

        const pSetGroupsInCtrlFormulaHide = function() {
            for(var _i = 0; _i < m_groups.count(); _i++) {
                let group = m_groups.item(_i);
                pSetGroupsInCtrlFormulaHideAux(group.getHeader().getSectionLines(), group.getIndex());
                pSetGroupsInCtrlFormulaHideAux(group.getFooter().getSectionLines(), group.getIndex());
            }
        };

        const pSetGroupsInCtrlFormulaHideAux = function(scls, idxGrop) {
            let scl = null;
            let ctrl = null;

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
        };

        const pSetGroupFormulaHF = function(sections, idxGrop) {
            let sec = null;
            let secLn = null;
            let ctrl = null;

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
        };

        const compileReport = function() {
            let ctrl = null;

            for(var _i = 0; _i < m_controls.count(); _i++) {
                ctrl = m_controls.item(_i);
                if (ctrl.getHasFormulaHide()) {
                    if (!m_compiler.checkSyntax(ctrl.getFormulaHide()))  {
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
                    if (!m_compiler.checkSyntax(ctrl.getFormulaValue()))  {
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

            if (!pAddFormulasInSection(m_headers)) { return false; }
            if (!pAddFormulasInSection(m_groupsHeaders)) { return false; }
            if (!pAddFormulasInSection(m_groupsFooters)) { return false; }
            if (!pAddFormulasInSection(m_details)) { return false; }
            if (!pAddFormulasInSection(m_footers)) { return false; }

            let formula = null;

            for(var _i = 0; _i < m_formulas.count(); _i++) {
                formula = m_formulas.item(_i);
                formula.setCompiledScript(null);
                m_compiler.initVariable(formula);
            }

            pSetIndexGroupInFormulaGroups(m_headers);
            pSetIndexGroupInFormulaGroups(m_groupsHeaders);
            pSetIndexGroupInFormulaGroups(m_groupsFooters);
            pSetIndexGroupInFormulaGroups(m_details);
            pSetIndexGroupInFormulaGroups(m_footers);

            m_compiler.clearVariables();

            return true;
        };

        const pSetIndexGroupInFormulaGroups = function(sections) {
            let sec = null;
            let secLn = null;
            let ctrl = null;

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
        };

        const pSetFormulaIndexGroup = function(formula, sec) {
            let fint = null;
            let indexGroup = 0;

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
                            fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue(sec.getIndex().ToString());
                            formula.setIdxGroup(sec.getIndex());
                        }
                        else if (sec.getTypeSection() === csRptSectionType.MAIN_DETAIL) {
                            // index of the most internal group
                            //
                            fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue(m_groups.count().ToString());
                            formula.setIdxGroup(m_groups.count()-1);
                        }
                        else {
                            fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue("0");
                            formula.setIdxGroup(0);
                        }
                    }
                    else {
                        fint.getParameters().item(cReportGlobals.C_KEYINDEXGROUP).setValue(indexGroup.ToString());
                        formula.setIdxGroup(indexGroup);
                    }
                }
            }
        };

        const pIsGroupFormula = function(formulaType) {
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
        };

        const pAddFormulasInSection = function(sections) {
            let sec = null;
            let secLn = null;

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                if (sec.getHasFormulaHide()) {
                    if (!m_compiler.checkSyntax(sec.getFormulaHide()))  {
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
                        if (!m_compiler.checkSyntax(secLn.getFormulaHide()))  {
                            return false; 
                        }
                        // to have debug info
                        //
                        secLn.getFormulaHide().setSectionName(secLn.getSectionName());
                        secLn.getFormulaHide().setSectionLineIndex(secLn.getIndex());

                        // add the formula to the formulas collection
                        //
                        addFormula(secLn.getFormulaHide(), sec.getName() 
                                    + "_R_" + secLn.getIndex().ToString() + "_" + "H");
                    }
                }
            }
            return true;
        };

        const addFormula = function(formula, name) {
            if (m_formulas.item(name) === null) {
                m_formulas.add2(formula, name);
            }
        };

        const getHeightHeader = function() {
            let sec = null;
            let height = 0;
            let isVisible = false;

            for(var _i = 0; _i < m_headers.count(); _i++) {
                sec = m_headers.item(_i);
                if (sec.getHasFormulaHide()) {
                    isVisible = cUtil.val(m_compiler.resultFunction(sec.getFormulaHide())) !== 0;
                }
                else {
                    isVisible = true;
                }

                if (isVisible)  {
                    height = height + sec.getAspect().getHeight();
                }
            }
            return height;
        };

        const getTopFooter = function() {
            let offset = 0;

            let w_paperInfo = m_launchInfo.getPrinter().getPaperInfo();
            if (w_paperInfo.getPaperSize() === csReportPaperType.CSRPTPAPERUSER) {
                offset = m_paperInfo.getCustomHeight() - w_paperInfo.getCustomHeight();
            }

            let w_aspect = m_footers.item(0).getAspect();
            return w_aspect.getTop() - offset;
        };

        const addFieldToNewPage = function(sections, page, where) {
            let field = null;
            let sec = null;
            let secline = null;
            let ctrl = null;
            let isVisible = false;
            let indexCtrl = 0;
            let offset = 0;
            let recordCount = 0;

            if (m_rows !== null) {
                recordCount = m_vRowsIndex.Length;
            }

            // this indexes means
            //
            // in which datasource is this control
            //
            let indexRows = 0;
            // in which row of the datasource is the control
            //
            let indexRow = 0;
            let indexField = 0;

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                m_lineIndex = m_lineIndex + 1;

                if (sec.getHasFormulaHide()) {
                    isVisible = cUtil.val(m_compiler.resultFunction(sec.getFormulaHide())) !== 0;
                }
                else {
                    isVisible = true;
                }
                if (isVisible) {
                    for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                        secline = sec.getSectionLines().item(_j);
                        if (secline.getHasFormulaHide()) {
                            isVisible = cUtil.val(m_compiler.resultFunction(secline.getFormulaHide())) !== 0;
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

                                field.setIndexLine(m_lineIndex);

                                if (ctrl.getHasFormulaValue()) {
                                    field.setValue(
                                        cReportGlobals.format(
                                            m_compiler.resultFunction(ctrl.getFormulaValue()), 
                                            ctrl.getLabel().getAspect().getFormat()));
                                }
                                else {
                                    switch (ctrl.getControlType())
                                    {
                                        case csRptControlType.CSRPTCTFIELD:

                                            pGetIndexRows(indexRows, indexRow, indexField, ctrl);

                                            if (m_collRows[indexRows] !== null) {
                                                // it looks ugly, dont think you?
                                                //
                                                // maybe this help a litle:
                                                //
                                                //    m_vCollRows(IndexRows)    a matrix with the data 
                                                //                              contained in the datasource
                                                //                              referd by this control
                                                //
                                                //    (IndexField, IndexRow)    a cell in this matrix
                                                //
                                                let value = m_collRows[indexRows].Rows[indexRow][indexField];
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

                                            if (m_collRows[indexRows] !== null) {
                                                field.setImage(pGetImage(indexRows, indexField, indexRow));
                                            }
                                            break;

                                        case csRptControlType.CSRPTCTCHART:

                                            pGetIndexRows(indexRows, indexRow, indexField, ctrl);
                                            field.setImage(pGetChartImage(indexRows, indexField, indexRow, ctrl));
                                            break;
                                    }
                                }

                                field.setInfo(m_pageSetting.item(ctrl.getKey()));
                                field.setTop(field.getInfo().getAspect().getTop() + offset);

                                if (ctrl.getHasFormulaHide()) {
                                    field.setVisible(
                                        cUtil.val(m_compiler.resultFunction(ctrl.getFormulaHide())) !== 0);
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
        };

        const createPageSetting = function() {
            // clear the collection
            //
            m_pageSetting.clear();

            m_pageSetting.setHeight(m_launchInfo.getPrinter().getPaperInfo().getHeight());

            let sec = null;
            let secline = null;
            let ctrl = null;

            // headers
            //
            for(var _i = 0; _i < m_headers.count(); _i++) {
                sec = m_headers.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secline = sec.getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo = m_pageSetting.add(secline, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            // detail
            //
            for(var _i = 0; _i < m_details.count(); _i++) {
                sec = m_details.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secline = sec.getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo = m_pageSetting.add(secline, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            // footers
            //
            let offset = 0;

            let w_paperInfo = m_launchInfo.getPrinter().getPaperInfo();
            if (w_paperInfo.getPaperSize() === csReportPaperType.CSRPTPAPERUSER) {
                offset = m_originalHeight - w_paperInfo.getCustomHeight();
            }
            for(var _i = 0; _i < m_footers.count(); _i++) {
                sec = m_footers.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secline = sec.getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo = m_pageSetting.add(secline, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        let aspect = pageInfo.getAspect();
                        aspect.setTop(aspect.getTop() - offset);
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            // groups
            //
            for(var _i = 0; _i < m_groups.count(); _i++) {
                let grp = m_groups.item(_i);
                // header
                //
                for(var _j = 0; _j < grp.getHeader().getSectionLines().count(); _j++) {
                    secline = grp.getHeader().getSectionLines().item(_j);
                    for(var _k = 0; _k < secline.getControls().count(); _k++) {
                        ctrl = secline.getControls().item(_k);
                        let pageInfo = m_pageSetting.add(secline, null, ctrl.getKey());
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
                        let pageInfo = m_pageSetting.add(secline, null, ctrl.getKey());
                        pageInfo.setAspect(ctrl.getLabel().getAspect());
                        pageInfo.setName(ctrl.getName());
                        pageInfo.setFieldType(ctrl.getField().getFieldType());
                        pageInfo.setTag(ctrl.getTag());
                    }
                }
            }
            return true;
        };

        const pGetDataAux = function(recordsets) {
            for(var _i = 0; _i < m_connectsAux.count(); _i++) {
                let connect = m_connectsAux.item(_i);
                G.redimPreserve(m_collRows, m_collRows.Length + 1);
                if (!pGetData(m_collRows[m_collRows.Length - 1], connect, false, recordsets)) {
                    return false;
                }
            }
            m_vRowsIndexAux = new int[m_collRows.Length];
            return true;
        };

        const pGetData = function(
            vRows, 
            connect, 
            createIndexVector, 
            recordsets) {
            let dummy = null;
            return pGetData(vRows, dummy, connect, createIndexVector, recordsets);
        };

        const pGetData = function(
            vRows, 
            rs, 
            connect, 
            createIndexVector, 
            recordsets) {
            let strConnect = "";
            let saveInReport = false;
            let cn = null;
            let varRs = null;
            let rsAux = null;
            let dr = null;

            // if we get an string connection
            //
            if (m_launchInfo.getStrConnect().Trim() !== "") {
                strConnect = m_launchInfo.getStrConnect();
            }
            // if m_launchInfo.getStrConnect() is empty we will use
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

                cn = new cDataBase(m_databaseEngine);

                if (m_isForWeb) {
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
                let sqlstmt = "";

                // if it was a select
                //
                if (m_launchInfo.getSqlstmt().Trim() !== "") {
                    sqlstmt = m_launchInfo.getSqlstmt();
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
                cn.setOpenRsExDescript(m_descripUser);

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
                        m_vRowsIndex = new int[0];
                        m_lastRowIndex = -1;
                    }
                }
                else {
                    if (createIndexVector) {
                        m_vRowsIndex = new int[vRows.Rows.Count];
                        m_lastRowIndex = m_vRowsIndex.Length - 1;
                        let k = 0;
                        for (k = 0; k < m_vRowsIndex.Length; k++) {
                            m_vRowsIndex[k] = k;
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
                    // we add an empty element to m_collRows to avoid
                    // index of bounds exception
                    //
                    G.redimPreserve(m_collRows, m_collRows.Length + 1);
                }

                cn.closeDb();
            }
            else {
                vRows = null;
                if (createIndexVector) {
                    m_vRowsIndex = new int[0];
                    m_lastRowIndex = -1;
                }
            }
            if (m_rows !== null) {
                m_recordCount = m_vRowsIndex.Length;
            }
            else {
                m_recordCount = 0;
            }
            m_iRow = 0;
            m_idxGroupHeader = NO_GROUP_INDEX;
            m_idxGroupFooter = NO_GROUP_INDEX;

            return true;
        };

        const pInitRowFormulas = function() {
            let i = 0;

            m_lastRowPreEvalued = new int[3];
            m_lastRowPostEvalued = new int[3];

            for (i = 0; i < 3; i++) {
                m_lastRowPreEvalued[i] = -1;
                m_lastRowPostEvalued[i] = -1;
            }

            for (i = 0; i < m_groupCount; i++) {
                // headers
                //
                m_vGroups[i].lastHPreRowEvalued = -1;
                m_vGroups[i].lastHPostRowEvalued = -1;

                // footers
                //
                m_vGroups[i].lastFPreRowEvalued = -1;
                m_vGroups[i].lastFPostRowEvalued = -1;
            }
        };

        const nLoad = function(docXml) {
            pDestroyCrossRef(m_headers);
            pDestroyCrossRef(m_details);
            pDestroyCrossRef(m_footers);
            pDestroyCrossRef(m_groups.getGroupsHeaders());
            pDestroyCrossRef(m_groups.getGroupsFooters());

            m_headers.clear();
            m_groups.clear();
            m_details.clear();
            m_footers.clear();
            m_controls.clear();
            m_formulas.clear();
            m_connect.getColumns().clear();
            m_connect.getParameters().clear();

            m_details.setCopyColl(m_controls);
            m_headers.setCopyColl(m_controls);
            m_footers.setCopyColl(m_controls);
            m_groupsHeaders.setCopyColl(m_controls);
            m_groupsFooters.setCopyColl(m_controls);

            if (!loadAux(docXml, m_headers, C_NODERPTHEADERS)) { return false; }
            if (!loadAux(docXml, m_details, C_NODERPTDETAILS)) { return false; }
            if (!loadAux(docXml, m_footers, C_NODERPTFOOTERS)) { return false; }

            if (!loadGroups(docXml)) { return false; }

            pFixGroupIndex();

            if (!loadConnect(docXml)) { return false; }
            if (!loadConnectsAux(docXml)) { return false; }
            if (!loadLaunchInfo(docXml)) { return false; }

            loadPaperInfo(docXml);

            sortCollection();

            m_originalHeight = m_paperInfo.getCustomHeight();

            return true;
        };

        const pFixGroupIndex = function() {
            let idx = 0;
            for(var _i = 0; _i < m_groups.count(); _i++) {
                let group = m_groups.item(_i);
                group.setIndex(idx);
                idx = idx + 1;
            }
        };

        const loadPaperInfo = function(docXml) {
            let nodeObj = null;
            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODEPAPERINFO);
            if (!m_paperInfo.load(docXml, nodeObj)) { return; }
        };

        const sortCollection = function() {
            sortCollectionAux(m_headers);
            sortCollectionAux(m_details);
            sortCollectionAux(m_footers);
            sortCollectionAux(m_groupsFooters);
            sortCollectionAux(m_groupsHeaders);
        };

        const sortCollectionAux = function(col) {
            let sec = null;
            let secLn = null;

            for(var _i = 0; _i < col.count(); _i++) {
                sec = col.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    secLn.setControls(getControlsInZOrder(secLn.getControls()));
                }
            }
        };

        const loadAux = function(docXml, sections, keySection) {
            let nodeObj = null;
            let nodeObjAux = null;
            let nodeObjSec = null;

            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, keySection);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjSec = docXml.getNodeChild(nodeObj);

                while (nodeObjSec !== null) {
                    nodeObjAux = nodeObjSec;
                    let key = docXml.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    let sec = sections.add(null, key);
                    if (!sec.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjSec = docXml.getNextNode(nodeObjSec);
                }
            }
            return true;
        };

        const loadFormulas = function(docXml) {
            let nodeObj = null;
            let nodeObjAux = null;
            let nodeObjSec = null;

            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODERPTFORMULAS);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjSec = docXml.getNodeChild(nodeObj);
                while (nodeObjSec !== null) {
                    nodeObjAux = nodeObjSec;
                    let name = docXml.getNodeProperty(nodeObjAux, "Name").getValueString(eTypes.eText);
                    let formula = m_formulas.add(name);
                    if (!formula.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjSec = docXml.getNextNode(nodeObjSec);
                }
            }
            return true;
        };

        const loadConnect = function(docXml) {
            let nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_RPTCONNECT);
            return m_connect.load(docXml, nodeObj);
        };

        const loadConnectsAux = function(docXml) {
            let nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_RPTCONNECTSAUX);
            return m_connectsAux.load(docXml, nodeObj);
        };

        const loadGroups = function(docXml) {
            let nodeObj = null;
            let nodeObjAux = null;
            let nodeObjGroup = null;

            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODEGROUPS);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjGroup = docXml.getNodeChild(nodeObj);
                while (nodeObjGroup !== null) {
                    nodeObjAux = nodeObjGroup;
                    let key = docXml.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    let group = getGroups().add(null, key);
                    if (!group.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjGroup = docXml.getNextNode(nodeObjGroup);
                }
            }
            return true;
        };

        const loadLaunchInfo = function(docXml) {
            let nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_LAUNCHINFO);
            return m_launchInfo.load(docXml, nodeObj);
        };

        const getFileName = function(fileNameWithExt) {
            return CSKernelFile.cFile.getFileWithoutExt(fileNameWithExt);
        };

        const nLoadData = function(docXml) {
            let nodeObj = null;
            let nodeObjAux = null;
            let nodeObjSec = null;

            m_pages.clear();
            nodeObj = docXml.getRootNode();
            nodeObj = docXml.getNodeFromNode(nodeObj, C_NODERPTPAGES);

            if (docXml.nodeHasChild(nodeObj)) {
                nodeObjSec = docXml.getNodeChild(nodeObj);
                while (nodeObjSec !== null) {
                    nodeObjAux = nodeObjSec;
                    let page = m_pages.add(null);
                    if (!page.load(docXml, nodeObjAux))  {
                        return false; 
                    }
                    nodeObjSec = docXml.getNextNode(nodeObjSec);
                }
            }
            return true;
        };

        self.OnReportDone = function() {
            if (ReportDone !== null) {
                ReportDone(this, new EventArgs());
            }
        };

        self.OnProgress = function(task) {
            return OnProgress(task, 0, 0, 0);
        };
        self.OnProgress = function(task, page, currRecord, recordCount) {
            let cancel = false;
            if (Progress !== null) {
                let e = new ProgressEventArgs(task, page, currRecord, recordCount);
                Progress(this, e);
                cancel = e.cancel;
            }
            return !cancel;
        };

        const resumeDBAccessMissing = function(connectString, saveInReport, cn) {
            try {
                // if the database is not access we do nothing
                //
                if (connectString.ToLower().IndexOf("PROVIDER=Microsoft.Jet.OLEDB.4.0;".ToLower()) === 0) {
                    return false;
                }

                // get the datasource's name
                //
                let fileName = "";
                fileName = cUtil.getToken(connectString, "Data Source");

                // ask to the user if he wan to search for the database file
                //
                let commDialog = null;
                if (FindAccessFile !== null) {
                    let e = new FindAccessFileEventArgs(fileName);
                    FindAccessFile(this, e);
                    if (e.cancel) {
                        return false;
                    }
                    commDialog = e.commonDialog;
                }

                let file = new CSKernelFile.cFile();

                file.filter = "Access files|*.mdb";
                file.init("ResumeDBAccessMissing", C_MODULE, commDialog);

                if (!file.open(m_pathDefault + Path.DirectorySeparatorChar + file,
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
                    m_connect.setStrConnect(connectString);
                }
                return true;

            }
            catch (ex) {
                cError.mngError(ex, "ResumeDBAccessMissing", C_MODULE, "");
                return false;
            }
        };

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

        const pSortControlsByLeft = function() {
            pSortControlsByLeftAux1(m_headers);
            pSortControlsByLeftAux1(m_groupsHeaders);
            pSortControlsByLeftAux1(m_details);
            pSortControlsByLeftAux1(m_groupsFooters);
            pSortControlsByLeftAux1(m_footers);
        };

        const pSortControlsByLeftAux1 = function(sections) {
            let sec = null;
            let secLn = null;

            for(var _i = 0; _i < sections.count(); _i++) {
                sec = sections.item(_i);
                for(var _j = 0; _j < sec.getSectionLines().count(); _j++) {
                    secLn = sec.getSectionLines().item(_j);
                    secLn.getControls().orderCollByLeft();
                }
            }
        };
        // public functions
        self.Dispose = function() {
            m_rows = null;
            m_collRows = null;
            m_vRowsIndexAux = null;
            m_vGroups = null;
            m_vRowsIndex = null;
            m_lastRowIndex = -1;
            m_lastRowPreEvalued = null;
            m_lastRowPostEvalued = null;

            m_controls.clear();
            m_controls = null;

            pDestroyCrossRef(m_headers);
            pDestroyCrossRef(m_details);
            pDestroyCrossRef(m_footers);
            pDestroyCrossRef(m_groups.getGroupsHeaders());
            pDestroyCrossRef(m_groups.getGroupsFooters());

            m_headers.clear();
            m_details.clear();
            m_footers.clear();
            m_groupsHeaders.clear();
            m_groupsFooters.clear();

            m_details.setCopyColl(null);
            m_headers.setCopyColl(null);
            m_footers.setCopyColl(null);
            m_groupsHeaders.setCopyColl(null);
            m_groupsFooters.setCopyColl(null);

            m_headers = null;
            m_details = null;
            m_footers = null;
            m_groupsHeaders = null;
            m_groupsFooters = null;

            m_paperInfo = null;

            m_formulas.clear();
            m_formulas = null;

            m_formulaTypes.clear();
            m_formulaTypes = null;

            m_connect = null;

            m_pages.clear();
            m_pages = null;

            m_pageSetting.clear();
            m_pageSetting = null;

            m_compiler = null;
            m_launchInfo = null;

            m_connectsAux.clear();
            m_connectsAux = null;

            pDestroyImages();
            m_images = null;
        };

        const pDestroyCrossRef = function(secs) {
            let sec = null;
            let secl = null;

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
        };

        const pGetMainDataSource = function(recordsets) {
            if (recordsets.Count > 0) {
                return recordsets[0][1];
            }
            else  {
                return "";
            }
        };

        const pSetIndexColInGroupFormulas = function(recordsets) {
            pSetIndexColInGroupFormulasAux(m_headers, recordsets);
            pSetIndexColInGroupFormulasAux(m_groupsHeaders, recordsets);
            pSetIndexColInGroupFormulasAux(m_groupsFooters, recordsets);
            pSetIndexColInGroupFormulasAux(m_details, recordsets);
            pSetIndexColInGroupFormulasAux(m_footers, recordsets);
        };

        const pSetIndexColInGroupFormulasAux = function(sections, recordsets) {
            let sec = null;
            let secLn = null;
            let ctrl = null;

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
        };

        const pSetIndexColInGroupFormula = function(formula, recordsets) {
            let fint = null;
            let colName = "";
            let rs = null;

            if (!m_reportDisconnected) {
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
        };

        const pSetColIndexInGroupFormulaAux = function(
            rs, 
            fint, 
            colName, 
            keyParam) {
            for(var i = 0; i < rs.Columns.Count; i++) {
                if (colName.ToLower() === rs.Columns[i].ColumnName.ToLower()) {
                    if (fint.getParameters().item(keyParam) === null) {
                        fint.getParameters().add2("", keyParam);
                    }
                    fint.getParameters().item(keyParam).setValue(i.ToString());
                    break;
                }
            }
        };

        const redimPreserve = function(groups, size) {
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
                    let newArray = new T_Group[size];
                    Array.Copy(groups, newArray, groups.Length);
                    for (var t = groups.Length; t < newArray.Length; t++) {
                        newArray[t] = new T_Group();
                    }
                    groups = newArray;
                }
            }
        };

        const getControlsInZOrder = function(col) {
            let i = 0;
            let ctrl = null;
            let ctrls = null;

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
        };

        const reportDone = function() {
            if (ReportDone !== null) {
                ReportDone(this, new EventArgs());
            }
        };


        //
        // debug functions
        //
        self.debugGroupKeys = function() {
            let keys = new String[m_groups.count() * 2];
            let groupCount = m_groups.count();
            for(var i = 0; i < groupCount; i++) {
                let h = m_groups.getGroupsHeaders().item(i);
                let f = m_groups.getGroupsFooters().item(i);
                keys[i] = "H: " + h.getKey() + " " + h.getKeyPaint() + " " + h.getName() + " " + h.getIndex() + " " + h.getRealIndex() ;
                keys[groupCount+i] = "F: " + f.getKey() + " " + h.getKeyPaint() + " " + f.getName() + " " + f.getIndex() + " " + f.getRealIndex();
            }
            return keys;
        };

        self.debugGroupPanitKeys = function() {
            let keys = new String[m_groups.count() * 2];
            let groupCount = m_groups.count();
            for(var i = 0; i < groupCount; i++) {
                keys[i] = "H: " + m_groups.getGroupsHeaders().item(i).getKeyPaint();
                keys[groupCount + i] = "F: " + m_groups.getGroupsFooters().item(i).getKeyPaint();
            }
            return keys;
        };

        return self;

    }
}(globalObject));
