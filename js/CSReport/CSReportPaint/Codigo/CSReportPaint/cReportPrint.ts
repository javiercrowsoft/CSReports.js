(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

	globalObject.CSReportPaint.createCReportPrint = function() {

	    const self = {};

        const C_MODULE = "cReportPrint";

        const C_OFFSETHEADER = 0;
        const C_OFFSETDETAIL = 100000;
        const C_OFFSETFOOTER = 1000000;

        let m_report = null;
        let m_paint = null;
        let m_rpwPrint = null;
        let m_fPreview = null;

        let m_lastIndexField = 0;

        let m_currPage = -1;

        let m_fnt = null;

        let m_x = 0;
        let m_y = 0;

        let m_rePaintObject = null;

        let m_realWidth = 0;
        let m_realHeight = 0;

        let m_scaleFont = 1;

        let m_scaleY = 1;
        let m_scaleX = 1;

        let m_bModal = null;

        let m_bHidePreviewWindow = null;

        let m_fileToSavePDF = "";
        let m_pDFQuality = null;

        let m_exportFileName = "";

        let m_objClientToPrint = null;
        let m_pagesToPrint = null;
        let m_pageToPrint = -1;

        let m_oldZoom = 0;
        let m_oldScaleY = 0;
        let m_oldScaleX = 0;
        let m_oldScaleFont = 0;

        const cReportPrint = function() {
            try {
                m_scaleX = 1;
                m_scaleY = 1;

                cGlobals.redim(m_fnt, 0);
            }
            catch (ex) {
                self."constructor", C_MODULE, "") = null;
            }
        };

        //---------------------------------------------------------------------------
        //
        // Export to PDF

        // for cExportPDF
        //
        self.getFileToSavePDF = function() {
            return m_fileToSavePDF;
        };

        self.setFileToSavePDF = function(rhs) {
            m_fileToSavePDF = rhs;
        };

        self.getPDFQuality = function() {
            return m_pDFQuality;
        };

        self.setPDFQuality = function(rhs) {
            m_pDFQuality = rhs;
        };

        // for cPrintManager
        //
        self.getExportFileName = function() {
            return m_exportFileName;
        };

        self.setExportFileName = function(rhs) {
            m_exportFileName = rhs;
        };

        //
        //---------------------------------------------------------------------------

        self.getReport = function() {
            return m_report;
        };

        self.setPreviewControl = function(rhs) {
            m_rpwPrint = rhs;
        };

        self.getCurrPage = function() {
            return m_currPage;
        };

        self.setCurrPage = function(rhs) {
            m_currPage = rhs;
        };

        self.setModal = function(rhs) {
            m_bModal = rhs;
        };

        self.setHidePreviewWindow = function(rhs) {
            m_bHidePreviewWindow = rhs;
        };

        const setReport = function(rhs) {
            m_report = rhs;
        };

        self.closePreviewWindow = function() {
            try {
                if (m_fPreview !== null) {
                    m_fPreview.Dispose();
                    m_fPreview = null;
                }
                return true;

            }
            catch (ex) {
                cError.mngError(ex, "ClosePreviewWindow", C_MODULE, "");
                return false;
            }
        };

        self.getLine = function(indexField) {
            let fld = null;
            fld = getField(indexField);

            if (fld === null) {
                return null;
            }
            else {
                let w_item = m_report.getPages().item(m_currPage);
                if (indexField < C_OFFSETDETAIL) {
                    return pGetLineAux(fld.getIndexLine(), w_item.getHeader());
                }
                else if (indexField < C_OFFSETFOOTER) {
                    return pGetLineAux(fld.getIndexLine(), w_item.getDetail());
                }
                else {
                    return pGetLineAux(fld.getIndexLine(), w_item.getFooter());
                }
            }
        };

        self.getCtrlFooter = function(ctrlName) {
            return getFieldByCtrlName(ctrlName, m_report.getPages().item(m_currPage).getFooter());
        };

        self.getIndexFieldByName = function(ctrlName) {
            return m_paint.getPaintObjects().item(ctrlName).getIndexField();
        };

        self.refreshCtrl = function(indexField) {
            let paintObj = null;
            let fld = null;
            let page = null;

            page = m_report.getPages().item(m_currPage);

            if (indexField < C_OFFSETDETAIL) {
                if (!pGetFieldFromIndexAux(page.getHeader(), indexField, fld)) {
                    return;
                }
            }
            else if (indexField < C_OFFSETFOOTER) {
                if (!pGetFieldFromIndexAux(page.getDetail(), indexField - C_OFFSETDETAIL, fld)) {
                    return;
                }
            }
            else {
                if (!pGetFieldFromIndexAux(page.getFooter(), indexField - C_OFFSETFOOTER, fld)) {
                    return;
                }
            }

            paintObj = pGetPaintObjByIndex(indexField);

            let ctrlFont = null;
            ctrlFont = fld.getInfo().getAspect().getFont();

            let w_aspect = paintObj.getAspect();
            let w_font = w_aspect.getFont();
            w_font.setForeColor(ctrlFont.getForeColor());
            w_font.setBold(ctrlFont.getBold());
            w_font.setItalic(ctrlFont.getItalic());
            w_font.setName(ctrlFont.getName());
            w_font.setSize(ctrlFont.getSize());
            w_font.setStrike(ctrlFont.getStrike());
			w_font.setUnderline(ctrlFont.getUnderline());

            m_paint.refreshObject(paintObj.getKey(), m_rpwPrint.getGraph());
        };

        self.refreshCtrlFooter = function(ctrlName) {
            let paintObj = null;
            paintObj = pGetPaintObjByCtrlName(ctrlName, m_report.getPages().item(m_currPage).getFooter(), C_OFFSETFOOTER);
            paintObj.setText(getCtrlFooter(ctrlName).getValue());
            m_paint.refreshObject(paintObj.getKey(), m_rpwPrint.getGraph());
        };

        self.getFieldByCtrlName = function(
            ctrlName, 
            fields) {
            return getFieldByCtrlName(ctrlName, fields, 0);
        };

        self.getFieldByCtrlName = function(
            ctrlName, 
            fields, 
            indexField) {
            let fld = null;

            for(var _i = 0; _i < fields.count(); _i++) {
                fld = fields.item(_i);
                if (fld.getInfo().getName() === ctrlName) {
                    if (isInThisLine(ctrlName, indexField, fld)) {
                        return fld;
                    }
                }
            }
            return null;
        };

        self.getPaintObjByCtrlNameEx = function(ctrlName, indexField) {
            let fld = null;
            let fields = null;
            let offset = 0;

            let w_item = m_report.getPages().item(m_currPage);

            fields = w_item.getHeader();
            offset = C_OFFSETHEADER;
            fld = getFieldByCtrlName(ctrlName, fields, indexField);

            if (fld === null) {
                fields = w_item.getDetail();
                offset = C_OFFSETDETAIL;
                fld = getFieldByCtrlName(ctrlName, fields, indexField);

                if (fld === null) {
                    fields = w_item.getFooter();
                    offset = C_OFFSETFOOTER;
                    fld = getFieldByCtrlName(ctrlName, fields, indexField);
                    if (fld === null) {
                        return null;
                    }
                }
            }
            for(var _i = 0; _i < m_paint.getPaintObjects().count(); _i++) {
                let paintObj = m_paint.getPaintObjects().item(_i);
                if (fields.item(paintObj.getIndexField() - offset) === fld) {
                    if (isInThisLine(ctrlName, indexField, fld)) {
                        return paintObj;
                    }
                }
            }
            return null;
        };

        self.isInThisLine = function(
            ctrlName, 
            indexField, 
            testFld) {
            let fields = null;
            let fld = null;

            if (indexField === 0) {
                return true;
            }
            fields = getLine(indexField);

            for(var _i = 0; _i < fields.count(); _i++) {
                fld = fields.item(_i);
                if (fld.getInfo().getName() === ctrlName) {
                    if (testFld === fld) {
                        return true;
                    }
                }
            }
            return false;
        };

        self.getField = function(indexField) {
            let rtn = null;
            let page = null;

            page = m_report.getPages().item(m_currPage);

            if (indexField < C_OFFSETDETAIL) {
                if (!pGetFieldFromIndexAux(page.getHeader(), indexField, rtn)) {
                    return null;
                }
            }
            else if (indexField < C_OFFSETFOOTER) {
                if (!pGetFieldFromIndexAux(page.getDetail(), indexField - C_OFFSETDETAIL, rtn)) {
                    return null;
                }
            }
            else {
                if (!pGetFieldFromIndexAux(page.getFooter(), indexField - C_OFFSETFOOTER, rtn)) {
                    return null;
                }
            }
            return rtn;
        };

        self.fieldIsInDetail = function(indexField) {
            return indexField >= C_OFFSETDETAIL && indexField < C_OFFSETFOOTER;
        };

        self.printPage = function(moveTo) {
            printPage(moveTo, false);
        };

        self.printPage = function(nPage, inPrinter) {
            let page = null;

            let mouse = new cMouseWait();

            m_rePaintObject = true;

            if (nPage > 1) {
                m_currPage = nPage-1;
            }
            else {
                switch (nPage)
                {
                    case csEMoveTo.C_FIRSTPAGE:
                        m_currPage = 0;
                        break;
                    case csEMoveTo.C_LASTPAGE:
                        m_currPage = m_report.getPages().count()-1;
                        break;
                    case csEMoveTo.C_NEXTPAGE:
                        if (m_currPage + 1 < m_report.getPages().count()) {
                            m_currPage = m_currPage + 1;
                        }
                        else {
                            m_currPage = m_report.getPages().count()-1;
                        }
                        break;
                    case csEMoveTo.C_PREVIOUSPAGE:
                        if (m_currPage - 1 >= 0) {
                            m_currPage = m_currPage - 1;
                        }
                        else {
                            m_currPage = 0;
                        }
                        break;
                }
            }
            if (m_currPage === -1 || m_currPage > m_report.getPages().count()-1) { return; }

            page = m_report.getPages().item(m_currPage);

            // we need to clear the print object
            //
            m_paint.getPaintObjects().clear();

            createPaintObjects(page.getHeader(), C_OFFSETHEADER);
            createPaintObjects(page.getDetail(), C_OFFSETDETAIL);
            createPaintObjects(page.getFooter(), C_OFFSETFOOTER);

            if (!inPrinter) {
                // set the current page in the preview window
                //
                m_rpwPrint.setCurrPage(m_currPage);

                m_rpwPrint.getBody().Refresh();
            }
        };

        self.doPrint = function(objClient) {
            return pDoPrint(objClient);
        };

        //----------------------------------------------------
        // cIReportPrint implementation
        //
        self.makeReport = function() {
            return make();
        };

        self.makeXml = function() {
            // TODO: not implemented yet
            //
            return false;
        };

        self.previewReport = function() {
            setPreviewForm();

            pCreatePaint();

            m_rpwPrint.setPages(m_report.getPages().count());
            printPage(csEMoveTo.C_FIRSTPAGE, false);

            let f = m_rpwPrint.Parent;

            if (m_bModal) {
                f.ShowDialog();
            }
            else {
                if (!m_bHidePreviewWindow) {
                    f.Show();
                    if (f.WindowState === FormWindowState.Minimized) {
                        f.WindowState = FormWindowState.Normal;
                    }
                }
            }

            return true;
        };

        self.cIReportPrint_PrintReport = function() {
            return pDoPrint(null);
        };

        const pDoPrint = function(objClient) {
            try {
                let copies = 0;
                let q = 0;

                pCreatePaint();

                m_rePaintObject = true;

                let printer = null;

                // if the printer is not defined
                //
                if (m_report.getLaunchInfo().getPrinter() === null) {
                    printer = cPrintAPI.getcPrinterFromDefaultPrinter(null);
                }
                // we use the printer asigned by the caller
                //
                else {
                    printer = m_report.getLaunchInfo().getPrinter();
                }

                let w_launchInfo = m_report.getLaunchInfo();
                copies = w_launchInfo.getCopies();
                if (w_launchInfo.getShowPrintersDialog()) {
                    printer.setCopies(copies);
                    if (!printer.showDialog(m_report.getPages().count())) {
                        return false;
                    }
                    copies = printer.getCopies();
                }
                else {
                    printer.getPaperInfo().setPagesToPrint("1-" + m_report.getPages().count().ToString());
                }

                for (q = 0; q < copies; q++) {
                    if (!printPagesToPrinter(printer, objClient)) {
                        return false;
                    }
                }

                return true;

            }
            catch (ex) {
                cError.mngError(ex, "pDoPrint", C_MODULE, "");
                return false;
            }
UNKNOWN >>             finally
            {
                if (m_rpwPrint !== null) {
                    printPage(m_currPage, false);
                    m_rpwPrint.getBody().Refresh();
                }
            }
        };

        const pGetPaintObjByIndex = function(indexField) {
            for(var _i = 0; _i < m_paint.getPaintObjects().count(); _i++) {
                let po = m_paint.getPaintObjects().item(_i);
                if (po.getIndexField() === indexField) {
                    return po;
                }
            }
            return null;
        };

        const pGetPaintObjByCtrlName = function(
            ctrlName, 
            fields, 
            offset) {
            let fld = getFieldByCtrlName(ctrlName, fields);

            for(var _i = 0; _i < m_paint.getPaintObjects().count(); _i++) {
                let rtn = m_paint.getPaintObjects().item(_i);
                if (fields.item(rtn.getIndexField() - offset) === fld) {
                    return rtn;
                }
            }
            return null;
        };

        const pCreatePaint = function() {
            if (m_paint === null) {
                m_paint = new cReportPaint();
            }
            m_paint.setNotBorder(true);
        };

        const printPagesToPrinter = function(printer, objClient) {
            try {
                let printDoc = new PrintDocument();

                let w_paperInfo = m_report.getPaperInfo();
                if (!printer.starDoc(printDoc,
                                        m_report.getName(),
                                        w_paperInfo.getPaperSize(),
                                        w_paperInfo.getOrientation())) {
                    return false;
                }

                printDoc.PrintPage += new PrintPageEventHandler(printPage);
                printDoc.PrinterSettings.PrinterName = printer.getDeviceName();

                //PrintDialog printDialog = new PrintDialog();
                //printDialog.Document = printDoc;

                //DialogResult dialogResult = printDialog.ShowDialog();
                //if (dialogResult === DialogResult.OK)
                //{
                    m_pageToPrint = -1;
                    m_pagesToPrint = pGetPagesToPrint(printer.getPaperInfo().getPagesToPrint());
                    m_objClientToPrint = objClient;
                    printDoc.Print();
                //}

                /*
                for (i = 0; i < m_report.getPages().count(); i++)
                {
                    if (pHaveToPrintThisPage(i, vPages))
                    {
                        if (!printer.starPage())
                        {
                            throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                                      C_MODULE,
                                                      "Ocurrio un error al imprimir el reporte."
                                                      );
                        }
                        printPage(i, true);

                        if (!drawPage(printer))
                        {
                            return false;
                        }
                        if (!printer.endPage())
                        {
                            throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                                      C_MODULE,
                                                      "Ocurrio un error al imprimir el reporte."
                                                      );
                        }
                        if (!pRefreshObjClient(i, objClient))
                        {
                            return false;
                        }
                    }
                }

                if (!printer.endDoc())
                {
                    throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                              C_MODULE,
                                              "Ocurrio un error al imprimir el reporte."
                                              );
                }
                */
                return true;

            }
            catch (ex) {
                cError.mngError(ex, "printPagePrinter", C_MODULE, "");
                return false;
            }
        };

        const printPage = function(sender, e) {
            /*
            if (!printer.starPage())
            {
                throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                          C_MODULE,
                                          "Ocurrio un error al imprimir el reporte."
                                          );
            }
            */

            /*
            TODO: after some testing we must remove ScaleX and ScaleY
            */

            if (m_pageToPrint === -1) {

                let dpiX = 0;
                let dpiY = 0;

                m_oldScaleX = m_paint.getScaleX();
                m_oldScaleY = m_paint.getScaleY();
                m_oldScaleFont = m_scaleFont;
                m_oldZoom = m_paint.getZoom();

                let graph = e.Graphics;
                dpiX = graph.DpiX;
                dpiY = graph.DpiY;

                m_scaleX = dpiX / 100;
                m_scaleY = dpiY / 100;

                let twipsPerPixelX = 1440f / dpiX;
                let dPI = 0;
                dPI = (1440f / twipsPerPixelX);

                if (dPI !== 96 && dPI > 0) {
                    m_scaleX = m_scaleX * (96f / dPI);
                    m_scaleY = m_scaleY * (96f / dPI);
                }

                // we are not using scaleX and scaleY
                m_scaleX = 1;
                m_scaleY = 1;

                m_paint.setScaleX(m_scaleX);
                m_paint.setScaleY(m_scaleY);

                m_paint.setZoom(100);
                m_scaleFont = 1;
            }

            m_pageToPrint += 1;

            while (m_pageToPrint < m_report.getPages().count()) {
                if (pHaveToPrintThisPage(m_pageToPrint+1, m_pagesToPrint)) {
                    printPage(m_pageToPrint+1, true);
                    let graph = e.Graphics;

                    if (!drawPage(graph, true)) {
                        throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                                  C_MODULE,
                                                  "Ocurrio un error al imprimir el reporte."
                                                  );
                    }

                    if (!pRefreshObjClient(m_pageToPrint, m_objClientToPrint)) {
                        throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                                  C_MODULE,
                                                  "Ocurrio un error al imprimir el reporte."
                                                  );
                    }

                    e.HasMorePages = (m_pageToPrint+1 < m_pagesToPrint.Last());
                    return;
                }
                else {
                    m_pageToPrint += 1;
                }
            }

            m_paint.setZoom(m_oldZoom);
            m_scaleX = m_oldScaleX;
            m_scaleY = m_oldScaleY;
            m_paint.setScaleX(m_oldScaleX);
            m_paint.setScaleY(m_oldScaleY);
            m_scaleFont = m_oldScaleFont;

            e.HasMorePages = false;
        };

        const pRefreshObjClient = function(iPage, objClient) {
            if (objClient === null) {
                return true;
            }
            else {
                return objClient.printingPage(iPage);
            }
        };

        const pHaveToPrintThisPage = function(page, v) {
            for(var n = 0; n < v.Length; n++) {
                if (page === v[n]) {
                    return true;
                }
            }
            return false;
        };

        const pGetPagesToPrint = function(pagesToPrint) {
            let v = null;
            let n = null;
            let v2 = null;
            let t = 0;
            let r = 0;
            let addInterval = false;

            v = pagesToPrint.Split(',');

            G.redim(n, 0);

            for(var i = 0; i < v.Length; i++) {
                let k = v[i].IndexOf("-", 1);
                if (k > 0) {
                    v2 = v[i].Split('-');
                    addInterval = false;
                    for (t = 0; t < v2.Length; t++) {
                        if (G.isNumeric(v2[t])) {
                            if (addInterval) {
                                for (r = n[n.Length - 1] + 1; r <= int.Parse(v2[t]) - 1; r++) {
                                    G.redimPreserve(n, n.Length + 1);
                                    n[n.Length - 1] = r;
                                }
                            }
                            else {
                                addInterval = true;
                            }
                            G.redimPreserve(n, n.Length + 1);
                            n[n.Length - 1] = int.Parse(v2[t]);
                        }
                    }
                }
                else {
                    if (G.isNumeric(v[i])) {
                        G.redimPreserve(n, n.Length + 1);
                        n[n.Length - 1] = int.Parse(v[i]);
                    }
                }
            }
            return n;
        };

        self.setReport = function(rhs) {
            m_report = rhs;
        };

        const pGetLineAux = function(indexLine, fields) {
            let flds = new CSReportDll.cReportPageFields();

            for(var _i = 0; _i < fields.count(); _i++) {
                let fld = fields.item(_i);
                if (fld.getIndexLine() === indexLine) {
                    flds.add(fld);
                }
            }
            return flds;
        };

        const make = function() {
            let detailHeight = 0;
            let lineHeight = 0;

            let fields = null;
            let field = null;
            let detail = null;

UNKNOWN >>             csRptGetLineResult rslt;
UNKNOWN >>             csRptNewPageResult rsltNewPage;
            let top = 0;
            let topSection = 0;
            let heightSection = 0;
            let secLnIndex = -1;
            let offsetTop = null;
            let vdummy = null;

            let mouse = new cMouseWait();

            printerSetSizeAndOrient(
                m_report.getLaunchInfo().getPrinter().getDeviceName(),
                m_report.getPaperInfo().getPaperSize(),
                m_report.getPaperInfo().getOrientation());

            m_currPage = -1;

            // we create the first page
            //
            rsltNewPage = m_report.newPage();

            // if it has failed
            //
            if (rsltNewPage === csRptNewPageResult.CSRPTNPERROR) {
                return false;
            }

            // if there is no data
            //
            if (rsltNewPage === csRptNewPageResult.CSRPTNPEND) {
                return m_report.endPage() !== csRptEndPageResult.CSRPTEPERROR;
            }

            // we are goin to evaluate the detail's first line
            // or group header's first line only if there are not
            // groups
            //
            if (m_report.getGroups().count() === 0) {
                m_report.evalPreGroupHeader();
                m_report.evalPre();
            }

            // get details dimensions
            //
            detailHeight = getDetailHeight(m_report.getPages().item(m_report.getPages().count()-1), top);

            // add the height of the images for controls which can grow and are in the header
            //
            getLineHeight(m_report.getPages().item(m_report.getPages().count()-1).getHeader(), vdummy);

            do {
                // get the line
                //
                rslt = m_report.getLine(fields);

                // if we have finished
                //
                if (rslt === csRptGetLineResult.CSRPTGLEND) {
                    break;
                }

                // if the row is virtual we need to call the engine
                // to give it a chance to evalute formulas in the
                // header which are marked to be compiled before printing
                //
                if (rslt === csRptGetLineResult.CSRPTGLVIRTUALH) {

                    m_report.evalPreGroupHeader();

                    // idem for footers
                    //
                }
                else if (rslt === csRptGetLineResult.CSRPTGLVIRTUALF) {

                    m_report.evalPreGroupFooter();

                    // if the engine responded that we need to create a new page
                    //
                }
                else if (rslt === csRptGetLineResult.CSRPTGLNEWPAGE) {
                    // get the new page
                    //
                    if (!pNewPage(top, detailHeight)) {
                        return false;
                    }
                }
                else {
                    // get the line's height
                    //
                    lineHeight = getLineHeight(fields, offsetTop);

                    // if it can fit we create a new page
                    //
                    if (lineHeight > detailHeight) {

                        // get the new page
                        //
                        if (!pNewPage(top, detailHeight)) {
                            return false;
                        }
                    }
                    else {
                        heightSection = 0;
                        topSection = 0;
                        secLnIndex = -1;

                        //---------------------------------------------------------------------------------
                        // this code is here and not in a function because we want to improve the
                        // speed when run the report
                        //
                        // add the line to the page
                        //
                        detail = m_report.getPages().item(m_report.getPages().count()-1).getDetail();

                        for(var _i = 0; _i < fields.count(); _i++) {
                            field = fields.item(_i);

                            // get the field's top
                            //
                            let w_sectionLine = field.getInfo().getSectionLine();

                            // one time for section
                            //
                            if (secLnIndex !== w_sectionLine.getIndex()) {
                                secLnIndex = w_sectionLine.getIndex();
                                let w_aspect = w_sectionLine.getAspect();
                                topSection = topSection + (w_aspect.getTop() - );
                                heightSection = heightSection + w_aspect.getHeight();
                            }

UNKNOWN >>                             field.setTop(top
                                            + offsetTop[secLnIndex]
                                            + (field.getInfo().getAspect().getTop()
                                            - topSection));

                            detail.add(field);
                        }
                        //---------------------------------------------------------------------------------

                        // get the detail's height
                        //
                        top = top + lineHeight;
                        detailHeight = detailHeight - lineHeight;

                        // notify the engine about the groups' staste
                        //
                        if (rslt === csRptGetLineResult.CSRPTGLGROUPHEADER) {
                            m_report.markGroupHeaderPrinted();

                            // evaluate every function which are mark 
                            // to be printed after printing
                            //
                            m_report.evalPostGroupHeader();

                        }
                        else if (rslt === csRptGetLineResult.CSRPTGLGROUPFOOTER) {
                            m_report.markGroupFooterPrinted();

                            // evaluate every function which are mark 
                            // to be printed after printing
                            //
                            m_report.evalPostGroupFooter();

                        }
                        else if (rslt === csRptGetLineResult.CSRPTGLDETAIL) {
                            m_report.evalPost();
                            m_report.moveToNext();
                        }
                        if (m_report.getLineType() === csRptGetLineResult.CSRPTGLDETAIL) {
                            m_report.evalPre();
                        }
                    }
                }
            } while (true);

            return m_report.endPage() !== csRptEndPageResult.CSRPTEPERROR;
        };

        const printerSetSizeAndOrient = function(p, csReportPaperType, p_2) {
            // TODO: implement this
            // throw new NotImplementedException();
        };

        const pNewPage = function(top, detailHeight) {
UNKNOWN >>             csRptNewPageResult rsltNewPage;
UNKNOWN >>             csRptEndPageResult rsltEndPage;

            rsltEndPage = m_report.endPage();
            if (rsltEndPage === csRptEndPageResult.CSRPTEPERROR) {
                return false;
            }

            rsltNewPage = m_report.newPage();
            if (rsltNewPage === csRptNewPageResult.CSRPTNPERROR) {
                return false;
            }

            // get details' dimentions
            //
            detailHeight = getDetailHeight(m_report.getPages().item(m_report.getPages().count()-1), top);

            return true;
        };

        // returns details' height of this page
        //
        const getDetailHeight = function(page, top) {
            top = page.getHeaderBottom();
            return page.getFooterTop() - top;
        };

        // returns the bigger control's height and set the height of every control
        //
        const getLineHeight = function(fields, offsetTop) {
            let field = null;
            let offBottom = 0;
            let aspectHeight = 0;
            let aspectWidth = 0;

            let aspect = null;
            let aspectLn = null;

            // used to get the offset to top
            //
            let lnHeight = 0;

            // used to increase the height of the line
            //
            let lnHeight2 = 0;
            let newLnHeight = 0;

            let font = null;

            let topSection = 0;
            let indexSection = -1;
            let heightSection = 0;

            offsetTop = new float[1];

            if (fields.count() > 0) {

                // search for the highest control
                //
                for(var _i = 0; _i < fields.count(); _i++) {
                    field = fields.item(_i);

                    // if it can grow we need to get its height to be
                    // able to print it
                    //
                    aspect = field.getInfo().getAspect();
                    aspectLn = field.getInfo().getSectionLine().getAspect();

                    // TODO: remove me
                    // System.Console.WriteLine(field.getInfo().getSectionLine().getRealIndex());

                    // if the line has changed we need to get the height of the line
                    // and add it to heightSection
                    //
                    if (indexSection !== field.getInfo().getSectionLine().getIndex()) {

                        // save a reference to this section
                        //
                        indexSection = field.getInfo().getSectionLine().getIndex();

                        if (indexSection > offsetTop.Length -1) {
                            G.redimPreserve(offsetTop, indexSection + 1);
                        }

                        // save this offset to add it to every control holded in the
                        // section lines which are under the current section line
                        //
                        offsetTop[indexSection] = offsetTop[indexSection] + newLnHeight - lnHeight;

                        // we get the top of the current line which includes only
                        // the height of visible lines
                        //
                        topSection = topSection + (aspectLn.getTop() - );

                        // add to heightSection the height of this line
                        //
                        heightSection = heightSection + aspectLn.getHeight();

                        // save the height of the line to know if it has changed for canGrow
                        //
                        lnHeight = aspectLn.getHeight();

                        // the height of the original section line
                        //
                        lnHeight2 = lnHeight;

                        // save the height of the line to analize canGrow
                        //
                        newLnHeight = lnHeight;
                    }

                    // add to every control the offset produced by controls which
                    // can grow
                    //
                    if (aspect.getCanGrow()) {

                        aspectHeight = aspect.getHeight();
                        aspectWidth = aspect.getWidth();

                        // if there is an image we need to get its height
                        //
                        if (field.getImage() !== null) {

                            let imgWidth = 0;
                            let imgHeight = 0;

                            cGlobals.getBitmapSize(field.getImage(), imgWidth, imgHeight, true);

                            field.setHeight(imgHeight);
                            field.setWidth(imgWidth);

                            if (field.getHeight() < aspectHeight) { field.setHeight(aspectHeight); }
                            if (field.getWidth() < aspectWidth) { field.setWidth(aspectWidth); }
                        }
                        else {
                            if (field.getValue() !== "") {
                                let flags = 0;

                                // TODO: flags to get height of text to be drawn
                                if (aspect.getWordWrap()) {
                                    flags = 0/*ECGTextAlignFlags.DT_WORDBREAK
UNKNOWN >>                                             || ECGTextAlignFlags.DT_WORD_ELLIPSIS
UNKNOWN >>                                             || ECGTextAlignFlags.DT_LEFT
UNKNOWN >>                                             || ECGTextAlignFlags.DT_NOPREFIX
UNKNOWN >>                                             || ECGTextAlignFlags.DT_EDITCONTROL*/;
                                }
                                else {
                                    flags = 0/*ECGTextAlignFlags.DT_SINGLELINE
UNKNOWN >>                                             || ECGTextAlignFlags.DT_WORD_ELLIPSIS
UNKNOWN >>                                             || ECGTextAlignFlags.DT_LEFT
UNKNOWN >>                                             || ECGTextAlignFlags.DT_NOPREFIX*/;
                                }

                                let idx = cGlobals.addFontIfRequired(aspect.getFont(), m_fnt);

                                font = m_fnt[idx];

                                field.setHeight(
                                    evaluateTextHeight(
                                        field.getValue(), 
                                        font, 
                                        aspect.getWidth(), 
                                        flags, 
                                        m_scaleY, 
                                        m_scaleX));
                                if (field.getHeight() < aspectHeight) { field.setHeight(aspectHeight); }
                            }
                        }

                        // if it doesn't fit in the line because is too high
                        //
                        if (field.getHeight() + aspect.getTop() > topSection + newLnHeight) {
                            offBottom =  - (aspect.getTop() + aspectHeight);

                            // to separete a little
                            //
                            if (offBottom < 0) { offBottom = offBottom + 5; }

                            // new line's height 
                            //
                            newLnHeight = aspect.getTop() - topSection + field.getHeight() + offBottom;
                        }

                        // if the height of the previous line has changed because 
                        // some control has set to canGrow = true and its value
                        // makes the control's height to change, we need to add
                        // this height to heightSection
                        //
                        if (newLnHeight > lnHeight2) {
                            //                                substract the original height
                            //                                |         add the hieght for canGrow
                            //                                |             |
                            heightSection = heightSection - lnHeight2 + newLnHeight;
                            lnHeight2 = newLnHeight;
                        }
                    }
                    else {
                        field.setHeight(aspect.getHeight());
                    }
                }
            }

            // return the height of the section
            //
            return heightSection;
        };

        // TODO: check if we should have a bitmap as a member field so it is not created everytime
        //
        const evaluateTextHeight = function(text, font, width, flags, scaleY, scaleX) {
            let bmp = new Bitmap(1, 1);
            let graph = Graphics.FromImage(bmp);
            let stringSize = graph.MeasureString(text, font, Convert.ToInt32(width * scaleX));
            graph.Dispose();
            bmp.Dispose();
            return stringSize.Height * scaleY;
        };

        // if the caller hasn't assigned a preview object
        // we use the internal preview object
        //
        const setPreviewForm = function() {
            if (m_rpwPrint === null) {
                if (m_fPreview === null) {
                    m_fPreview = new fPreview();
                }
                m_rpwPrint = m_fPreview.getRpwReport();
            }
            else {
                if (m_rpwPrint.Parent !== null) {
                    if (!(m_rpwPrint.Parent.GetType() === typeof(Form))) {
                        m_fPreview = new fPreview();
                        m_rpwPrint = m_fPreview.getRpwReport();
                    }
                }
                else {
                    m_fPreview = new fPreview();
                    m_rpwPrint = m_fPreview.getRpwReport();
                }
            }

UNKNOWN >>             RectangleF tR;

            let w_printer = m_report.getLaunchInfo().getPrinter();
            tR = cGlobals.getRectFromPaperSize(w_printer.getPaperInfo(), w_printer.getPaperInfo().getPaperSize(), w_printer.getPaperInfo().getOrientation());

            m_realWidth = tR.Width;
            m_realHeight = tR.Height;

            m_rpwPrint.getBody().Width = m_realWidth;
            m_rpwPrint.getBody().Height = m_realHeight;

            if (!m_bModal) {
                if (!m_bHidePreviewWindow) {
                    let obj = m_rpwPrint.getParent();
                    if (obj.GetType() === typeof(Form))  {
                        let f = obj as Form;
                        f.Show();
                    }
                }
            }

            m_rpwPrint.getBody().Paint += new PaintEventHandler(rpwPrintBodyPaint);
            m_rpwPrint.FirstPage += new CSReportPreview.FirstPage(rpwPrintMoveFirst);
            m_rpwPrint.PreviousPage += new CSReportPreview.PreviousPage(rpwPrintMovePrevious);
            m_rpwPrint.MoveToPage += new CSReportPreview.MoveToPage(rpwPrintMoveToPage);
            m_rpwPrint.NextPage += new CSReportPreview.NextPage(rpwPrintMoveNext);
            m_rpwPrint.LastPage += new CSReportPreview.LastPage(rpwPrintMoveLast);
        };

        const createPaintObjects = function(fields, offset) {
            let field = null;

            let rptAspect = null;
            let rptFont = null;

            let index = 0;

            for(var _i = 0; _i < fields.count(); _i++) {
                field = fields.item(_i);
                index = index + 1;

                if (field.getVisible()) {

                    rptAspect = field.getInfo().getAspect();

                    let w_add = m_paint.getPaintObjects().add(null, "");
                    let w_aspect = w_add.getAspect();
                    if (field.getTop() > 0) {
                        w_aspect.setTop(field.getTop());
                    }
                    else {
                        w_aspect.setTop(rptAspect.getTop());
                    }
                    if (field.getHeight() > 0) {
                        w_aspect.setHeight(field.getHeight());
                    }
                    else {
                        w_aspect.setHeight(rptAspect.getHeight());
                    }
                    if (field.getWidth() > 0) {
                        w_aspect.setWidth(field.getWidth());
                    }
                    else {
                        w_aspect.setWidth(rptAspect.getWidth());
                    }
                    w_aspect.setLeft(rptAspect.getLeft());
                    w_aspect.setBackColor(rptAspect.getBackColor());
                    w_aspect.setTransparent(rptAspect.getTransparent());
                    w_aspect.setAlign(rptAspect.getAlign());
                    w_aspect.setWordWrap(rptAspect.getWordWrap());

                    w_aspect.setBorderColor(rptAspect.getBorderColor());
                    w_aspect.setBorderColor3d(rptAspect.getBorderColor3d());
                    w_aspect.setBorderColor3dShadow(rptAspect.getBorderColor3dShadow());
                    w_aspect.setBorderRounded(rptAspect.getBorderRounded());
                    w_aspect.setBorderType(rptAspect.getBorderType());
                    w_aspect.setBorderWidth(rptAspect.getBorderWidth());

                    rptFont = rptAspect.getFont();
                    let w_font = w_aspect.getFont();
                    w_font.setBold(rptFont.getBold());
                    w_font.setForeColor(rptFont.getForeColor());
                    w_font.setItalic(rptFont.getItalic());
                    w_font.setName(rptFont.getName());
                    w_font.setSize(rptFont.getSize() * m_scaleFont);
                    w_font.setStrike(rptFont.getStrike());
					w_font.setUnderline(rptFont.getUnderline());

                    w_add.setText(field.getValue());
                    w_add.setImage(field.getImage());

                    if (w_add.getImage() !== null) {
                        w_add.setPaintType(csRptPaintObjType.CSRPTPAINTOBJIMAGE);
                    }
                    w_add.setIndexField(index + offset);
                    if (field.getObjectID() !== null) {
                        w_add.setTag(field.getObjectID().getValue());
                    }
                }
            }
        };

        // TODO: see how to implement this functionality
        //
        const m_fPreview_FormUnload = function() {
            m_rpwPrint = null;
            m_report.getLaunchInfo().getObjPaint().setReport(null);
            m_report.getLaunchInfo().setObjPaint(null);
        };

        //------------------------------------------------------------------
        // preview events
        //
        const m_rpwPrint_BodyDblClick = function() {
            /*
            try {

                String sKey = "";

                if (m_paint === null) { return; }
                if (m_paint.pointIsInObject(m_x, m_y, sKey)) {
                    Iterator listeners = m_listeners.iterator();
                    while(listeners.hasNext()) {
                        (listeners.next()).dblClickOnField(m_paint.getPaintObjects(sKey).IndexField);
                    }
                }

                //*TODO:** goto found: GoTo ExitProc;
            } catch (Exception ex) {
                cError.mngError(ex, "m_rpwPrint_BodyDblClick", C_MODULE, "");
                if (VBA.ex.Number) { /**TODO:** resume found: Resume(ExitProc)* / }
                //*TODO:** label found: ExitProc:;

            }
        */
        };

        const pGetFieldFromIndexAux = function(fields, index, rtn) {
            try {
                rtn = fields.item(index);
                return true;
            }
            catch(ex) {
                return false;
            }
        };


        const m_rpwPrint_BodyMouseDown = function(button, shift, x, y) {
            /*
            try {
                String sKey = "";

                if (m_paint === null) { return; }

                if (m_paint.pointIsInObject(x, y, sKey)) {
                    int index = 0;
                    index = m_paint.getPaintObjects(sKey).IndexField;

                    bool cancel = null;
                    Iterator listeners = m_listeners.iterator();
                    while(listeners.hasNext()) {
                        (listeners.next()).mouseDownOnField(index, button, shift, cancel, x, y);
                    }

                    if (!cancel) {
                        Iterator listeners = m_listeners.iterator();
                        while(listeners.hasNext()) {
                            (listeners.next()).clickOnField(index);
                        }
                    }
                }


                //*TODO:** goto found: GoTo ExitProc;
            } catch (Exception ex) {
                cError.mngError(ex, "m_rpwPrint_BodyMouseDown", C_MODULE, "");
                if (VBA.ex.Number) { /**TODO:** resume found: Resume(ExitProc)* / }
                //*TODO:** label found: ExitProc:;

            }
        */
        };

        const m_rpwPrint_BodyMouseMove = function(button, shift, x, y) {
            /*
            try {

                String sKey = "";
                int indexField = 0;

                if (m_paint === null) { return; }

                if (m_paint.pointIsInObject(x, y, sKey)) {
                    indexField = m_paint.getPaintObjects(sKey).IndexField;
                    if (m_lastIndexField !== indexField) {
                        Iterator listeners = m_listeners.iterator();
                        while(listeners.hasNext()) {
                            (listeners.next()).mouseOnField(indexField);
                        }
                        m_lastIndexField = indexField;
                    }
                } 
                else {
                    if (m_lastIndexField) {
                        Iterator listeners = m_listeners.iterator();
                        while(listeners.hasNext()) {
                            (listeners.next()).mouseOutField();
                        }
                        m_lastIndexField = 0;
                    }
                }

                m_x = x;
                m_y = y;

                //*TODO:** goto found: GoTo ExitProc;
            } catch (Exception ex) {
                cError.mngError(ex, "m_rpwPrint_BodyMouseMove", C_MODULE, "");
                if (VBA.ex.Number) { /**TODO:** resume found: Resume(ExitProc)* / }
                //*TODO:** label found: ExitProc:;

            }
        */
        };

        const rpwPrintBodyPaint = function(sender, e) {
            if (m_paint !== null) {
                drawPage(e.Graphics, false);
            }
        };

        const m_rpwPrint_ChangeZoom = function(zoom) {
            let nZoom = 0;
            let width = 0;
            let height = 0;

            switch (zoom)
            {
                case csEZoom.csEZoomAllPage:

                    width = m_rpwPrint.Width / m_realWidth;
                    height = m_rpwPrint.Height / m_realHeight;

                    if (width < height) {
                        nZoom = m_rpwPrint.Width / m_realWidth;
                    }
                    else {
                        nZoom = m_rpwPrint.Height / m_realHeight;
                    }

                    break;
                case csEZoom.csEZoomCustom:
                    nZoom = 1;
                    break;
                case csEZoom.csEZoomWidth:
                    nZoom = m_rpwPrint.Width / m_realWidth;
                    break;
                default:
                    nZoom = zoom / 100;
                    break;
            }

            if (nZoom < 0.01) { nZoom = 0.01f; }

            let pic = m_rpwPrint.getBody();
            pic.Width = (m_realWidth * nZoom);
            pic.Height = (m_realHeight * nZoom);

            if (nZoom > 0.5) {
                m_paint.setZoom(100);
                m_paint.setScaleX(nZoom);
                m_paint.setScaleY(nZoom);
                m_scaleFont = nZoom;
                printPage(m_currPage);
            }
            else {
                m_paint.setZoom(zoom);
                m_rpwPrint.getBody().Refresh();
            }
        };

        const m_rpwPrint_DoPrint = function() {
            cIReportPrint_PrintReport();
        };

        /*TODO: we need to decide if it is useful
         * 
            private void m_rpwPrint_ExportExcel() {
                try {

                    cMouseWait mouse = new cMouseWait();

                    Application.DoEvents();

                    CSReportExport.cReportExcel expExcel = null;
                    expExcel = new CSReportExport.cReportExcel();

                    expExcel.export(m_report);

                } catch (Exception ex) {
                    cError.mngError(ex, "m_rpwPrint_ExportExcel", C_MODULE, "");
                }
            }
        */
        const m_rpwPrint_ExportPDF = function() {
            exportPDF();
        };

        // Files is a list of file names separated by |
        //
        self.sendMail = function(files, emailAddress) {
            let expPDF = null;
            expPDF = new cReportPdf();

            expPDF.setExportEmailAddress(emailAddress);
            return expPDF.sendMail(files);
        };

        self.exportPDFEx = function(outputFile, bShowPDFWindow) {
            return pExportPDF(outputFile, bShowPDFWindow);
        };

        self.exportPDF = function() {
            let dummy = "";
            return pExportPDF(dummy, true);
        };

        const pGetExportFileName = function() {
            if (m_exportFileName !== "") {
                return m_exportFileName;
            }
            else {
                return m_report.getName();
            }
        };

        const pExportPDF = function(outputFile, bShowPDFWindow) {
            try {
                let mouse = new cMouseWait();

                let expPDF = null;
                expPDF = new CSReportExport.cReportPdf();

                expPDF.setFileName(cUtil.getValidPath(System.Environment.GetEnvironmentVariable("TEMP")) + pGetExportFileName());
                expPDF.setExportEmailAddress(m_report.getExportEmailAddress());

                return expPDF.exportEx(m_report, this, outputFile, bShowPDFWindow);

            }
            catch (ex) {
                cError.mngError(ex, "pExportPDF", C_MODULE, "");
                return false;
            }
        };

        /* We need to decide if it is useful
         * 
            private void m_rpwPrint_ExportWord() {
                try {
                    cMouseWait mouse = new cMouseWait();

                    CSReportExport.cReportWord expWord = null;
                    expWord = new CSReportExport.cReportWord();

                    expWord.export(m_report);

                } catch (Exception ex) {
                    cError.mngError(ex, "m_rpwPrint_ExportWord", C_MODULE, "");
                }
            }
        */
        const rpwPrintMoveFirst = function(sender, e) {
            printPage(csEMoveTo.C_FIRSTPAGE);
        };

        const rpwPrintMoveLast = function(sender, e) {
            printPage(csEMoveTo.C_LASTPAGE);
        };

        const rpwPrintMoveNext = function(sender, e) {
            printPage(csEMoveTo.C_NEXTPAGE);
        };

        const rpwPrintMovePrevious = function(sender, e) {
            printPage(csEMoveTo.C_PREVIOUSPAGE);
        };

        const rpwPrintMoveToPage = function(sender, e) {
            printPage(e.page);
        };

        const m_rpwPrint_SaveDocument = function() {
            //If Not m_Report.SaveData(m_rpwPrint.cmFileSaveDialog) Then Exit Sub
        };

        const drawPage = function(graph, isPrinter) {
            let i = 0;

            if (m_rePaintObject) {
                if (isPrinter) {
                    m_paint.createBackgroundBitmap(graph);

                    for (i = 0; i < m_paint.getPaintObjects().count(); i++) {
                        if (!m_paint.drawObject(m_paint.getPaintObjects().getNextKeyForZOrder(i), graph)) { return false; }
                    }

                    for (i = 0; i < m_paint.getPaintSections().count(); i++) {
                        if (!m_paint.drawSection(m_paint.getPaintSections().getNextKeyForZOrder(i), graph)) { return false; }
                    }
                }
                else {
                    m_paint.clearPage(m_rpwPrint.getBody().CreateGraphics());

                    m_rePaintObject = false;

                    m_paint.paintPicture(graph, false);
                }
            }
            else {
                m_paint.paintPicture(graph, false);
            }
            return true;
        };

        const pDestroyFonts = function() {
            /*
            int iFnt = 0;
            for (iFnt = 1; iFnt <= m_iFontCount; iFnt++)
            {
                DeleteObject(m_hFnt[iFnt]);
            }
            G.redim(m_fnt, 0);
            G.redim(m_hFnt, 0);
             */
        };

        self.Dispose = function() {
            m_report = null;
            m_paint = null;
            if (m_fPreview !== null) {
                m_fPreview.Dispose();
            }
            m_rpwPrint = null;
        };

        self.printReport = function() {
            return pDoPrint(null);
        };

        self.getPageImageAsBase64 = function(page, pageIndex) {
            if (m_paint !== null) {
                if(m_currPage !== page -1) printPage(page, true); {
				pageIndex = m_currPage + 1;

                let bmp = new Bitmap(m_realWidth, (int)m_realHeight);
                let bmpGraphics = Graphics.FromImage(bmp);
                drawPage(bmpGraphics, false);
                let memoryStream = new MemoryStream();
                m_paint.getBitmap().Save(memoryStream, ImageFormat.Png);
                let pngData = memoryStream.ToArray();
                let image = Convert.ToBase64String(pngData);
                return "data:image/png;base64," + image;
            }
            else {
				pageIndex = -1;
                return "";
            }            
        };

        return self;

    }
}(globalObject));
