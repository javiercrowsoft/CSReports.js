namespace CSReportPaint {

    import cError = CSKernelClient.cError;
    import Utils = CSOAPI.Utils;
    import cIPrintClient = CSIReportPrint.cIPrintClient;
    import cMouseWait = CSKernelClient.cMouseWait;
    import cPrinter = CSReportDll.cPrinter;
    import cPrintAPI = CSReportDll.cPrintAPI;
    import cReportLaunchInfo = CSReportDll.cReportLaunchInfo;
    import csRptGetLineResult = CSReportGlobals.csRptGetLineResult;
    import csRptNewPageResult = CSReportGlobals.csRptNewPageResult;
    import csRptEndPageResult = CSReportGlobals.csRptEndPageResult;

	export class cReportPrint {

        private C_MODULE: string = "cReportPrint";

        private static C_OFFSETHEADER: number = 0;
        private static C_OFFSETDETAIL: number = 100000;
        private static C_OFFSETFOOTER: number = 1000000;

        private report: CSReportDll.cReport = null;
        private paint: cReportPaint = null;
        private rpwPrint: CSReportPreview.cReportPreview = null;
        private fPreview: fPreview = null;

        private lastIndexField: number = 0;

        private currPage: number = -1;

        private fnt: Font[] = null;

        private x: number = 0;
        private y: number = 0;

        private rePaintObject: boolean = null;

        private realWidth: number = 0;
        private realHeight: number = 0;

        private scaleFont: number = 1;

        private scaleY: number = 1;
        private scaleX: number = 1;

        private bModal: boolean = null;

        private bHidePreviewWindow: boolean = null;

        private fileToSavePDF: string = "";
        private pDFQuality: csPDFQuality = null;

        private exportFileName: string = "";

        private objClientToPrint: cIPrintClient = null;
        private pagesToPrint: number[] = null;
        private pageToPrint: number = -1;

        private oldZoom: number = 0;
        private oldScaleY: number = 0;
        private oldScaleX: number = 0;
        private oldScaleFont: number = 0;

        public constructor() {
            try {
                this.scaleX = 1;
                this.scaleY = 1;
                this.fnt = [];
            }
            catch (ex) {
                cError.mngError(ex);
            }
        }

        //---------------------------------------------------------------------------
        //
        // Export to PDF

        // for cExportPDF
        //
        public getFileToSavePDF() {
            return this.fileToSavePDF;
        }

        public setFileToSavePDF(rhs: string) {
            this.fileToSavePDF = rhs;
        }

        public getPDFQuality() {
            return this.pDFQuality;
        }

        public setPDFQuality(rhs: csPDFQuality) {
            this.pDFQuality = rhs;
        }

        // for cPrintManager
        //
        public getExportFileName() {
            return this.exportFileName;
        }

        public setExportFileName(rhs: string) {
            this.exportFileName = rhs;
        }

        //
        //---------------------------------------------------------------------------

        public getReport() {
            return this.report;
        }

        public setPreviewControl(rhs: CSReportPreview.cReportPreview) {
            this.rpwPrint = rhs;
        }

        public getCurrPage() {
            return this.currPage;
        }

        public setCurrPage(rhs: number) {
            this.currPage = rhs;
        }

        public setModal(rhs: boolean) {
            this.bModal = rhs;
        }

        public setHidePreviewWindow(rhs: boolean) {
            this.bHidePreviewWindow = rhs;
        }

        private setReport(rhs: CSReportDll.cReport) {
            this.report = rhs;
        }

        public closePreviewWindow() {
            try {
                if (this.fPreview !== null) {
                    this.fPreview.dispose();
                    this.fPreview = null;
                }
                return true;

            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        public getLine(indexField: number) {
            let fld: CSReportDll.cReportPageField = this.getField(indexField);

            if (fld === null) {
                return null;
            }
            else {
                let w_item: CSReportDll.cReportPage = this.report.getPages().item(this.currPage);
                if (indexField < cReportPrint.C_OFFSETDETAIL) {
                    return this.this.pGetLineAux(fld.getIndexLine(), w_item.getHeader());
                }
                else if (indexField < cReportPrint.C_OFFSETFOOTER) {
                    return this.this.pGetLineAux(fld.getIndexLine(), w_item.getDetail());
                }
                else {
                    return this.this.pGetLineAux(fld.getIndexLine(), w_item.getFooter());
                }
            }
        }

        public getCtrlFooter(ctrlName: string) {
            return this.getFieldByCtrlName(ctrlName, this.report.getPages().item(this.currPage).getFooter());
        }

        public getIndexFieldByName(ctrlName: string) {
            return this.paint.getPaintObjects().item(ctrlName).getIndexField();
        }

        public refreshCtrl(indexField: number) {
            let paintObj: cReportPaintObject = null;
            let fld: CSReportDll.cReportPageField = null;
            let page: CSReportDll.cReportPage = null;

            page = this.report.getPages().item(this.currPage);

            if (indexField < cReportPrint.C_OFFSETDETAIL) {
                if (!this.this.pGetFieldFromIndexAux(page.getHeader(), indexField, fld)) {
                    return;
                }
            }
            else if (indexField < cReportPrint.C_OFFSETFOOTER) {
                if (!this.this.pGetFieldFromIndexAux(page.getDetail(), indexField - cReportPrint.C_OFFSETDETAIL, fld)) {
                    return;
                }
            }
            else {
                if (!this.this.pGetFieldFromIndexAux(page.getFooter(), indexField - cReportPrint.C_OFFSETFOOTER, fld)) {
                    return;
                }
            }

            paintObj = this.this.pGetPaintObjByIndex(indexField);

            let ctrlFont: CSReportDll.cReportFont = null;
            ctrlFont = fld.getInfo().getAspect().getFont();

            let w_aspect: CSReportDll.cReportAspect = paintObj.getAspect();
            let w_font: CSReportDll.cReportFont = w_aspect.getFont();
            w_font.setForeColor(ctrlFont.getForeColor());
            w_font.setBold(ctrlFont.getBold());
            w_font.setItalic(ctrlFont.getItalic());
            w_font.setName(ctrlFont.getName());
            w_font.setSize(ctrlFont.getSize());
            w_font.setStrike(ctrlFont.getStrike());
			w_font.setUnderline(ctrlFont.getUnderline());

            this.paint.refreshObject(paintObj.getKey(), this.rpwPrint.getGraph());
        }

        public refreshCtrlFooter(ctrlName: string) {
            let paintObj: cReportPaintObject = null;
            paintObj = this.this.pGetPaintObjByCtrlName(ctrlName,
                this.report.getPages().item(this.currPage).getFooter(), cReportPrint.C_OFFSETFOOTER);
            paintObj.setText(this.getCtrlFooter(ctrlName).getValue());
            this.paint.refreshObject(paintObj.getKey(), this.rpwPrint.getGraph());
        }

        public getFieldByCtrlName(ctrlName: string, fields: CSReportDll.cReportPageFields, indexField: number = 0) {
            let fld: CSReportDll.cReportPageField = null;

            for(let _i = 0; _i < fields.count(); _i++) {
                fld = fields.item(_i);
                if (fld.getInfo().getName() === ctrlName) {
                    if (this.isInThisLine(ctrlName, indexField, fld)) {
                        return fld;
                    }
                }
            }
            return null;
        }

        public getPaintObjByCtrlNameEx(ctrlName: string, indexField: number) {
            let fld: CSReportDll.cReportPageField = null;
            let fields: CSReportDll.cReportPageFields = null;
            let offset: number = 0;

            let w_item: CSReportDll.cReportPage = this.report.getPages().item(this.currPage);

            fields = w_item.getHeader();
            offset = cReportPrint.C_OFFSETHEADER;
            fld = this.getFieldByCtrlName(ctrlName, fields, indexField);

            if (fld === null) {
                fields = w_item.getDetail();
                offset = cReportPrint.C_OFFSETDETAIL;
                fld = this.getFieldByCtrlName(ctrlName, fields, indexField);

                if (fld === null) {
                    fields = w_item.getFooter();
                    offset = cReportPrint.C_OFFSETFOOTER;
                    fld = this.getFieldByCtrlName(ctrlName, fields, indexField);
                    if (fld === null) {
                        return null;
                    }
                }
            }
            for(let _i = 0; _i < this.paint.getPaintObjects().count(); _i++) {
                let paintObj = this.paint.getPaintObjects().item(_i);
                if (fields.item(paintObj.getIndexField() - offset) === fld) {
                    if (this.isInThisLine(ctrlName, indexField, fld)) {
                        return paintObj;
                    }
                }
            }
            return null;
        }

        public isInThisLine(ctrlName: string, indexField: number, testFld: CSReportDll.cReportPageField) {
            let fields: CSReportDll.cReportPageFields = null;
            let fld: CSReportDll.cReportPageField = null;

            if (indexField === 0) {
                return true;
            }
            fields = this.getLine(indexField);

            for(let _i = 0; _i < fields.count(); _i++) {
                fld = fields.item(_i);
                if (fld.getInfo().getName() === ctrlName) {
                    if (testFld === fld) {
                        return true;
                    }
                }
            }
            return false;
        }

        public getField(indexField: number) {
            let rtn: CSReportDll.cReportPageField = null;
            let page: CSReportDll.cReportPage = null;

            page = this.report.getPages().item(this.currPage);

            if (indexField < cReportPrint.C_OFFSETDETAIL) {
                if (!this.this.pGetFieldFromIndexAux(page.getHeader(), indexField, rtn)) {
                    return null;
                }
            }
            else if (indexField < cReportPrint.C_OFFSETFOOTER) {
                if (!this.this.pGetFieldFromIndexAux(page.getDetail(), indexField - cReportPrint.C_OFFSETDETAIL, rtn)) {
                    return null;
                }
            }
            else {
                if (!this.this.pGetFieldFromIndexAux(page.getFooter(), indexField - cReportPrint.C_OFFSETFOOTER, rtn)) {
                    return null;
                }
            }
            return rtn;
        }

        public fieldIsInDetail(indexField: number) {
            return indexField >= cReportPrint.C_OFFSETDETAIL && indexField < cReportPrint.C_OFFSETFOOTER;
        }

        public printPage(nPage: number, inPrinter: boolean = false) {
            let page: CSReportDll.cReportPage = null;

            let mouse: cMouseWait = new cMouseWait();

            this.rePaintObject = true;

            if (nPage > 1) {
                this.currPage = nPage-1;
            }
            else {
                switch (nPage)
                {
                    case csEMoveTo.C_FIRSTPAGE:
                        this.currPage = 0;
                        break;
                    case csEMoveTo.C_LASTPAGE:
                        this.currPage = this.report.getPages().count()-1;
                        break;
                    case csEMoveTo.C_NEXTPAGE:
                        if (this.currPage + 1 < this.report.getPages().count()) {
                            this.currPage = this.currPage + 1;
                        }
                        else {
                            this.currPage = this.report.getPages().count()-1;
                        }
                        break;
                    case csEMoveTo.C_PREVIOUSPAGE:
                        if (this.currPage - 1 >= 0) {
                            this.currPage = this.currPage - 1;
                        }
                        else {
                            this.currPage = 0;
                        }
                        break;
                }
            }
            if (this.currPage === -1 || this.currPage > this.report.getPages().count()-1) { return; }

            page = this.report.getPages().item(this.currPage);

            // we need to clear the print object
            //
            this.paint.getPaintObjects().clear();

            this.createPaintObjects(page.getHeader(), cReportPrint.C_OFFSETHEADER);
            this.createPaintObjects(page.getDetail(), cReportPrint.C_OFFSETDETAIL);
            this.createPaintObjects(page.getFooter(), cReportPrint.C_OFFSETFOOTER);

            if (!inPrinter) {
                // set the current page in the preview window
                //
                this.rpwPrint.setCurrPage(this.currPage);

                this.rpwPrint.getBody().Refresh();
            }
        }

        public doPrint(objClient: cIPrintClient) {
            return this.pDoPrint(objClient);
        }

        //----------------------------------------------------
        // cIReportPrint implementation
        //
        public makeReport() {
            return this.make();
        }

        public makeXml() {
            // TODO: not implemented yet
            //
            return false;
        }

        public previewReport() {
            this.setPreviewForm();

            this.pCreatePaint();

            this.rpwPrint.setPages(this.report.getPages().count());
            this.printPage(csEMoveTo.C_FIRSTPAGE, false);

            let f: Form = this.rpwPrint.Parent;

            if (this.bModal) {
                f.ShowDialog();
            }
            else {
                if (!this.bHidePreviewWindow) {
                    f.Show();
                    if (f.WindowState === FormWindowState.Minimized) {
                        f.WindowState = FormWindowState.Normal;
                    }
                }
            }

            return true;
        }

        public cIReportPrint_PrintReport() {
            return this.pDoPrint(null);
        }

        private pDoPrint(objClient: cIPrintClient) {
            try {
                let copies: number = 0;
                let q: number = 0;

                this.pCreatePaint();

                this.rePaintObject = true;

                let printer: cPrinter = null;

                // if the printer is not defined
                //
                if (this.report.getLaunchInfo().getPrinter() === null) {
                    printer = cPrintAPI.getcPrinterFromDefaultPrinter(null);
                }
                // we use the printer asigned by the caller
                //
                else {
                    printer = this.report.getLaunchInfo().getPrinter();
                }

                let w_launchInfo: cReportLaunchInfo = this.report.getLaunchInfo();
                copies = w_launchInfo.getCopies();
                if (w_launchInfo.getShowPrintersDialog()) {
                    printer.setCopies(copies);
                    if (!printer.showDialog(this.report.getPages().count())) {
                        return false;
                    }
                    copies = printer.getCopies();
                }
                else {
                    printer.getPaperInfo().setPagesToPrint("1-" + this.report.getPages().count().toString());
                }

                for (q = 0; q < copies; q++) {
                    if (!this.printPagesToPrinter(printer, objClient)) {
                        return false;
                    }
                }
                return true;
            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
            finally
            {
                if (this.rpwPrint !== null) {
                    this.printPage(this.currPage, false);
                    this.rpwPrint.getBody().Refresh();
                }
            }
        }

        private pGetPaintObjByIndex(indexField: number) {
            for(let _i = 0; _i < this.paint.getPaintObjects().count(); _i++) {
                let po: cReportPaintObject = this.paint.getPaintObjects().item(_i);
                if (po.getIndexField() === indexField) {
                    return po;
                }
            }
            return null;
        }

        private pGetPaintObjByCtrlName(ctrlName: string, fields: CSReportDll.cReportPageFields, offset: number) {
            let fld: CSReportDll.cReportPageField = this.getFieldByCtrlName(ctrlName, fields);

            for(let _i = 0; _i < this.paint.getPaintObjects().count(); _i++) {
                let rtn: cReportPaintObject = this.paint.getPaintObjects().item(_i);
                if (fields.item(rtn.getIndexField() - offset) === fld) {
                    return rtn;
                }
            }
            return null;
        }

        private pCreatePaint() {
            if (this.paint === null) {
                this.paint = new cReportPaint();
            }
            this.paint.setNotBorder(true);
        }

        private printPagesToPrinter(printer: cPrinter, objClient: cIPrintClient) {
            try {
                let printDoc: PrintDocument = new PrintDocument();

                let w_paperInfo: cReportPaperInfo = this.report.getPaperInfo();
                if (!printer.starDoc(printDoc,
                                        this.report.getName(),
                                        w_paperInfo.getPaperSize(),
                                        w_paperInfo.getOrientation())) {
                    return false;
                }

                printDoc.PrintPage += new PrintPageEventHandler(this.printPage);
                printDoc.PrinterSettings.PrinterName = printer.getDeviceName();

                this.pageToPrint = -1;
                this.pagesToPrint = this.this.pGetPagesToPrint(printer.getPaperInfo().getPagesToPrint());
                this.objClientToPrint = objClient;
                printDoc.Print();

                return true;

            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        private printPage(sender: object, e: PrintPageEventArgs) {
            if (this.pageToPrint === -1) {

                let dpiX: number = 0;
                let dpiY: number = 0;

                this.oldScaleX = this.paint.getScaleX();
                this.oldScaleY = this.paint.getScaleY();
                this.oldScaleFont = this.scaleFont;
                this.oldZoom = this.paint.getZoom();

                let graph = e.Graphics;
                dpiX = graph.DpiX;
                dpiY = graph.DpiY;

                this.scaleX = dpiX / 100;
                this.scaleY = dpiY / 100;

                let twipsPerPixelX: number = 1440 / dpiX;
                let dPI: number = 0;
                dPI = (1440 / twipsPerPixelX);

                if (dPI !== 96 && dPI > 0) {
                    this.scaleX = this.scaleX * (96 / dPI);
                    this.scaleY = this.scaleY * (96 / dPI);
                }

                // we are not using scaleX and scaleY
                this.scaleX = 1;
                this.scaleY = 1;

                this.paint.setScaleX(this.scaleX);
                this.paint.setScaleY(this.scaleY);

                this.paint.setZoom(100);
                this.scaleFont = 1;
            }

            this.pageToPrint += 1;

            while (this.pageToPrint < this.report.getPages().count()) {
                if (this.pHaveToPrintThisPage(this.pageToPrint+1, this.pagesToPrint)) {
                    this.printPage(this.pageToPrint+1, true);
                    let graph = e.Graphics;

                    if (!this.drawPage(graph, true)) {
                        throw new ReportPaintException("There was an error when printing the report.");
                    }

                    if (!this.pRefreshObjClient(this.pageToPrint, this.objClientToPrint)) {
                        throw new ReportPaintException("There was an error when printing the report.");
                    }

                    e.HasMorePages = (this.pageToPrint+1 < this.pagesToPrint[this.pagesToPrint.length -1]);
                    return;
                }
                else {
                    this.pageToPrint += 1;
                }
            }

            this.paint.setZoom(this.oldZoom);
            this.scaleX = this.oldScaleX;
            this.scaleY = this.oldScaleY;
            this.paint.setScaleX(this.oldScaleX);
            this.paint.setScaleY(this.oldScaleY);
            this.scaleFont = this.oldScaleFont;

            e.HasMorePages = false;
        }

        private pRefreshObjClient(iPage: number, objClient: cIPrintClient) {
            if (objClient === null) {
                return true;
            }
            else {
                return objClient.printingPage(iPage);
            }
        }

        private pHaveToPrintThisPage(page: number, v: number[]) {
            for(let n = 0; n < v.length; n++) {
                if (page === v[n]) {
                    return true;
                }
            }
            return false;
        }

        private pGetPagesToPrint(pagesToPrint: string) {
            let v: string[];
            let n: number[];
            let v2: string[] = null;
            let t: number = 0;
            let r: number = 0;
            let addInterval: boolean = false;

            v = pagesToPrint.split(',');

            n = [];

            for(let i = 0; i < v.length; i++) {
                let k: number = v[i].indexOf("-", 1);
                if (k > 0) {
                    v2 = v[i].split('-');
                    addInterval = false;
                    for (t = 0; t < v2.length; t++) {
                        if (Utils.isNumber(v2[t])) {
                            if (addInterval) {
                                for (r = n[n.length - 1] + 1; r <= Utils.parseInt(v2[t]) - 1; r++) {
                                    n.push(r);
                                }
                            }
                            else {
                                addInterval = true;
                            }
                            n.push(Utils.parseInt(v2[t]));
                        }
                    }
                }
                else {
                    if (Utils.isNumber(v[i])) {
                        n.push(Utils.parseInt(v[i]));
                    }
                }
            }
            return n;
        }

        public setReport(rhs: object) {
            this.report = rhs;
        }

        private pGetLineAux(indexLine: number, fields: CSReportDll.cReportPageFields) {
            let flds: CSReportDll.cReportPageFields = new CSReportDll.cReportPageFields();

            for(let _i = 0; _i < fields.count(); _i++) {
                let fld: CSReportDll.cReportPageField = fields.item(_i);
                if (fld.getIndexLine() === indexLine) {
                    flds.add(fld);
                }
            }
            return flds;
        }

        private make() {
            let detailHeight: number = 0;
            let lineHeight: number = 0;

            let fields: CSReportDll.cReportPageFields = null;
            let field: CSReportDll.cReportPageField = null;
            let detail: CSReportDll.cReportPageFields = null;

            let rslt: csRptGetLineResult ;
            let rsltNewPage: csRptNewPageResult ;

            let top: number = 0;
            let topSection: number = 0;
            let heightSection: number = 0;
            let secLnIndex: number = -1;
            let offsetTop: number[] = null;
            let vdummy: number[] = null;

            let mouse: cMouseWait = new cMouseWait();

            this.printerSetSizeAndOrient(
                this.report.getLaunchInfo().getPrinter().getDeviceName(),
                this.report.getPaperInfo().getPaperSize(),
                this.report.getPaperInfo().getOrientation());

            this.currPage = -1;

            // we create the first page
            //
            rsltNewPage = this.report.newPage();

            // if it has failed
            //
            if (rsltNewPage === csRptNewPageResult.CS_RPT_NP_ERROR) {
                return false;
            }

            // if there is no data
            //
            if (rsltNewPage === csRptNewPageResult.CS_RPT_NP_END) {
                return this.report.endPage() !== csRptEndPageResult.CS_RPT_EP_ERROR;
            }

            // we are goin to evaluate the detail's first line
            // or group header's first line only if there are not
            // groups
            //
            if (this.report.getGroups().count() === 0) {
                this.report.evalPreGroupHeader();
                this.report.evalPre();
            }

            // get details dimensions
            //
            detailHeight = this.getDetailHeight(this.report.getPages().item(this.report.getPages().count()-1), top);

            // add the height of the images for controls which can grow and are in the header
            //
            this.getLineHeight(this.report.getPages().item(this.report.getPages().count()-1).getHeader(), vdummy);

            do {
                // get the line
                //
                rslt = this.report.getLine(fields);

                // if we have finished
                //
                if (rslt === csRptGetLineResult.CS_RPT_GL_END) {
                    break;
                }

                // if the row is virtual we need to call the engine
                // to give it a chance to evalute formulas in the
                // header which are marked to be compiled before printing
                //
                if (rslt === csRptGetLineResult.CS_RPT_GL_VIRTUAL_H) {

                    this.report.evalPreGroupHeader();

                    // idem for footers
                    //
                }
                else if (rslt === csRptGetLineResult.CS_RPT_GL_VIRTUAL_F) {

                    this.report.evalPreGroupFooter();

                    // if the engine responded that we need to create a new page
                    //
                }
                else if (rslt === csRptGetLineResult.CS_RPT_GL_NEW_PAGE) {
                    // get the new page
                    //
                    if (!this.pNewPage(top, detailHeight)) {
                        return false;
                    }
                }
                else {
                    // get the line's height
                    //
                    lineHeight = this.getLineHeight(fields, offsetTop);

                    // if it can fit we create a new page
                    //
                    if (lineHeight > detailHeight) {

                        // get the new page
                        //
                        if (!this.pNewPage(top, detailHeight)) {
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
                        detail = this.report.getPages().item(this.report.getPages().count()-1).getDetail();

                        for(let _i = 0; _i < fields.count(); _i++) {
                            field = fields.item(_i);

                            // get the field's top
                            //
                            let w_sectionLine: CSReportDll.cReportSectionLine = field.getInfo().getSectionLine();

                            // one time for section
                            //
                            if (secLnIndex !== w_sectionLine.getIndex()) {
                                secLnIndex = w_sectionLine.getIndex();
                                let w_aspect: CSReportDll.cReportAspect = w_sectionLine.getAspect();
                                topSection = topSection + (w_aspect.getTop() - (topSection + heightSection));
                                heightSection = heightSection + w_aspect.getHeight();
                            }

                            field.setTop(top
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
                        if (rslt === csRptGetLineResult.CS_RPT_GL_GROUP_HEADER) {
                            this.report.markGroupHeaderPrinted();

                            // evaluate every function which are mark 
                            // to be printed after printing
                            //
                            this.report.evalPostGroupHeader();

                        }
                        else if (rslt === csRptGetLineResult.CS_RPT_GL_GROUP_FOOTER) {
                            this.report.markGroupFooterPrinted();

                            // evaluate every function which are mark 
                            // to be printed after printing
                            //
                            this.report.evalPostGroupFooter();

                        }
                        else if (rslt === csRptGetLineResult.CS_RPT_GL_DETAIL) {
                            this.report.evalPost();
                            this.report.moveToNext();
                        }
                        if (this.report.getLineType() === csRptGetLineResult.CS_RPT_GL_DETAIL) {
                            this.report.evalPre();
                        }
                    }
                }
            } while (true);

            return this.report.endPage() !== csRptEndPageResult.CS_RPT_EP_ERROR;
        }

        private printerSetSizeAndOrient(p: string, csReportPaperType: csReportPaperType, p_2: number) {
            // TODO: implement this
            // throw new NotImplementedException();
        }

        private pNewPage(top: number, detailHeight: number) {
            let rsltNewPage: csRptNewPageResult;
            let rsltEndPage: csRptEndPageResult;

            rsltEndPage = this.report.endPage();
            if (rsltEndPage === csRptEndPageResult.CS_RPT_EP_ERROR) {
                return false;
            }

            rsltNewPage = this.report.newPage();
            if (rsltNewPage === csRptNewPageResult.CS_RPT_NP_ERROR) {
                return false;
            }

            // get details' dimentions
            //
            detailHeight = this.getDetailHeight(this.report.getPages().item(this.report.getPages().count()-1), top);

            return true;
        }

        // returns details' height of this page
        //
        private getDetailHeight(page: CSReportDll.cReportPage, top: number) {
            top = page.getHeaderBottom();
            return page.getFooterTop() - top;
        }

        // returns the bigger control's height and set the height of every control
        //
        private getLineHeight(fields: CSReportDll.cReportPageFields, offsetTop: number[]) {
            let field: CSReportDll.cReportPageField = null;
            let offBottom: number = 0;
            let aspectHeight: number = 0;
            let aspectWidth: number = 0;

            let aspect: CSReportDll.cReportAspect = null;
            let aspectLn: CSReportDll.cReportAspect = null;

            // used to get the offset to top
            //
            let lnHeight: number = 0;

            // used to increase the height of the line
            //
            let lnHeight2: number = 0;
            let newLnHeight: number = 0;

            let font: Font = null;

            let topSection: number = 0;
            let indexSection: number = -1;
            let heightSection: number = 0;

            offsetTop = [];

            if (fields.count() > 0) {

                // search for the highest control
                //
                for(let _i = 0; _i < fields.count(); _i++) {
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

                        // save this offset to add it to every control holded in the
                        // section lines which are under the current section line
                        //
                        offsetTop[indexSection] = offsetTop[indexSection] + newLnHeight - lnHeight;

                        // we get the top of the current line which includes only
                        // the height of visible lines
                        //
                        topSection = topSection + (aspectLn.getTop() - (topSection + heightSection));

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

                            let imgWidth: number = 0;
                            let imgHeight: number = 0;

                            cGlobals.getBitmapSize(field.getImage(), imgWidth, imgHeight, true);

                            field.setHeight(imgHeight);
                            field.setWidth(imgWidth);

                            if (field.getHeight() < aspectHeight) { field.setHeight(aspectHeight); }
                            if (field.getWidth() < aspectWidth) { field.setWidth(aspectWidth); }
                        }
                        else {
                            if (field.getValue() !== "") {
                                let flags: number = 0;

                                // TODO: flags to get height of text to be drawn
                                if (aspect.getWordWrap()) {
                                    flags = 0/*ECGTextAlignFlags.DT_WORDBREAK
                                             || ECGTextAlignFlags.DT_WORD_ELLIPSIS
                                             || ECGTextAlignFlags.DT_LEFT
                                             || ECGTextAlignFlags.DT_NOPREFIX
                                             || ECGTextAlignFlags.DT_EDITCONTROL*/;
                                }
                                else {
                                    flags = 0/*ECGTextAlignFlags.DT_SINGLELINE
                                             || ECGTextAlignFlags.DT_WORD_ELLIPSIS
                                             || ECGTextAlignFlags.DT_LEFT
                                             || ECGTextAlignFlags.DT_NOPREFIX*/;
                                }

                                let idx: number = cGlobals.addFontIfRequired(aspect.getFont(), this.fnt);

                                font = this.fnt[idx];

                                field.setHeight(
                                    this.evaluateTextHeight(
                                        field.getValue(), 
                                        font, 
                                        aspect.getWidth(), 
                                        flags, 
                                        this.scaleY, 
                                        this.scaleX));
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
        }

        // TODO: check if we should have a bitmap as a member field so it is not created everytime
        //
        private evaluateTextHeight(text: string, font: Font, width: number, flags: number, scaleY: number, scaleX: number) {
            let bmp: Bitmap = new Bitmap(1, 1);
            let graph: Graphics = Graphics.FromImage(bmp);
            let stringSize: SizeF = graph.MeasureString(text, font, Math.trunc(width * scaleX));
            graph.Dispose();
            bmp.Dispose();
            return stringSize.Height * scaleY;
        }

        // if the caller hasn't assigned a preview object
        // we use the internal preview object
        //
        private setPreviewForm() {
            if (this.rpwPrint === null) {
                if (this.fPreview === null) {
                    this.fPreview = new fPreview();
                }
                this.rpwPrint = this.fPreview.getRpwReport();
            }
            else {
                if (this.rpwPrint.Parent !== null) {
                    if (!(this.rpwPrint.Parent.GetType() === typeof(Form))) {
                        this.fPreview = new fPreview();
                        this.rpwPrint = this.fPreview.getRpwReport();
                    }
                }
                else {
                    this.fPreview = new fPreview();
                    this.rpwPrint = this.fPreview.getRpwReport();
                }
            }

            let tR: RectangleF;

            let w_printer: cPrinter = this.report.getLaunchInfo().getPrinter();
            tR = cGlobals.getRectFromPaperSize(w_printer.getPaperInfo(), w_printer.getPaperInfo().getPaperSize(), w_printer.getPaperInfo().getOrientation());

            this.realWidth = tR.Width;
            this.realHeight = tR.Height;

            this.rpwPrint.getBody().Width = this.realWidth;
            this.rpwPrint.getBody().Height = this.realHeight;

            if (!this.bModal) {
                if (!this.bHidePreviewWindow) {
                    let obj = this.rpwPrint.getParent();
                    if (obj.GetType() === typeof(Form))  {
                        let f: Form = obj as Form;
                        f.Show();
                    }
                }
            }

            this.rpwPrint.getBody().Paint += new PaintEventHandler(rpwPrintBodyPaint);
            this.rpwPrint.FirstPage += new CSReportPreview.FirstPage(rpwPrintMoveFirst);
            this.rpwPrint.PreviousPage += new CSReportPreview.PreviousPage(rpwPrintMovePrevious);
            this.rpwPrint.MoveToPage += new CSReportPreview.MoveToPage(rpwPrintMoveToPage);
            this.rpwPrint.NextPage += new CSReportPreview.NextPage(rpwPrintMoveNext);
            this.rpwPrint.LastPage += new CSReportPreview.LastPage(rpwPrintMoveLast);
        }

        private createPaintObjects(fields: CSReportDll.cReportPageFields, offset: number) {
            let field: CSReportDll.cReportPageField = null;

            let rptAspect: CSReportDll.cReportAspect = null;
            let rptFont: CSReportDll.cReportFont = null;

            let index: number = 0;

            for(let _i = 0; _i < fields.count(); _i++) {
                field = fields.item(_i);
                index = index + 1;

                if (field.getVisible()) {

                    rptAspect = field.getInfo().getAspect();

                    let w_add: cReportPaintObject = this.paint.getPaintObjects().add(null, "");
                    let w_aspect: CSReportDll.cReportAspect = w_add.getAspect();
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
                    let w_font: CSReportDll.cReportFont = w_aspect.getFont();
                    w_font.setBold(rptFont.getBold());
                    w_font.setForeColor(rptFont.getForeColor());
                    w_font.setItalic(rptFont.getItalic());
                    w_font.setName(rptFont.getName());
                    w_font.setSize(rptFont.getSize() * this.scaleFont);
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
        }

        // TODO: see how to implement this functionality
        //
        private fPreview_FormUnload() {
            this.rpwPrint = null;
            this.report.getLaunchInfo().getObjPaint().setReport(null);
            this.report.getLaunchInfo().setObjPaint(null);
        }

        //------------------------------------------------------------------
        // preview events
        //
        private rpwPrint_BodyDblClick() {
            /*
            try {

                String sKey = "";

                if (this.paint === null) { return; }
                if (this.paint.pointIsInObject(this.x, this.y, sKey)) {
                    Iterator listeners = this.listeners.iterator();
                    while(listeners.hasNext()) {
                        (listeners.next()).dblClickOnField(this.paint.getPaintObjects(sKey).IndexField);
                    }
                }

                //*TODO:** goto found: GoTo ExitProc;
            } catch (Exception ex) {
                cError.mngError(ex);
                if (VBA.ex.Number) { /**TODO:** resume found: Resume(ExitProc)* / }
                //*TODO:** label found: ExitProc:;

            }
        */
        }

        private pGetFieldFromIndexAux(fields: CSReportDll.cReportPageFields, index: number, rtn: CSReportDll.cReportPageField) {
            try {
                rtn = fields.item(index);
                return true;
            }
            catch(ex) {
                return false;
            }
        }

        private rpwPrint_BodyMouseDown(button: number, shift: number, x: number, y: number) {
            /*
            try {
                String sKey = "";

                if (this.paint === null) { return; }

                if (this.paint.pointIsInObject(x, y, sKey)) {
                    int index = 0;
                    index = this.paint.getPaintObjects(sKey).IndexField;

                    bool cancel = null;
                    Iterator listeners = this.listeners.iterator();
                    while(listeners.hasNext()) {
                        (listeners.next()).mouseDownOnField(index, button, shift, cancel, x, y);
                    }

                    if (!cancel) {
                        Iterator listeners = this.listeners.iterator();
                        while(listeners.hasNext()) {
                            (listeners.next()).clickOnField(index);
                        }
                    }
                }


                //*TODO:** goto found: GoTo ExitProc;
            } catch (Exception ex) {
                cError.mngError(ex);
                if (VBA.ex.Number) { /**TODO:** resume found: Resume(ExitProc)* / }
                //*TODO:** label found: ExitProc:;

            }
        */
        }

        private rpwPrint_BodyMouseMove(button: number, shift: number, x: number, y: number) {
            /*
            try {

                String sKey = "";
                int indexField = 0;

                if (this.paint === null) { return; }

                if (this.paint.pointIsInObject(x, y, sKey)) {
                    indexField = this.paint.getPaintObjects(sKey).IndexField;
                    if (this.lastIndexField !== indexField) {
                        Iterator listeners = this.listeners.iterator();
                        while(listeners.hasNext()) {
                            (listeners.next()).mouseOnField(indexField);
                        }
                        this.lastIndexField = indexField;
                    }
                } 
                else {
                    if (this.lastIndexField) {
                        Iterator listeners = this.listeners.iterator();
                        while(listeners.hasNext()) {
                            (listeners.next()).mouseOutField();
                        }
                        this.lastIndexField = 0;
                    }
                }

                this.x = x;
                this.y = y;

                //*TODO:** goto found: GoTo ExitProc;
            } catch (Exception ex) {
                cError.mngError(ex);
                if (VBA.ex.Number) { /**TODO:** resume found: Resume(ExitProc)* / }
                //*TODO:** label found: ExitProc:;

            }
        */
        }

        private rpwPrintBodyPaint(sender: object, e: PaintEventArgs) {
            if (this.paint !== null) {
                this.drawPage(e.Graphics, false);
            }
        }

        private rpwPrint_ChangeZoom(zoom: number) {
            let nZoom: number = 0;
            let width: number = 0;
            let height: number = 0;

            switch (zoom)
            {
                case csEZoom.csEZoomAllPage:

                    width = this.rpwPrint.Width / this.realWidth;
                    height = this.rpwPrint.Height / this.realHeight;

                    if (width < height) {
                        nZoom = this.rpwPrint.Width / this.realWidth;
                    }
                    else {
                        nZoom = this.rpwPrint.Height / this.realHeight;
                    }

                    break;
                case csEZoom.csEZoomCustom:
                    nZoom = 1;
                    break;
                case csEZoom.csEZoomWidth:
                    nZoom = this.rpwPrint.Width / this.realWidth;
                    break;
                default:
                    nZoom = zoom / 100;
                    break;
            }

            if (nZoom < 0.01) { nZoom = 0.01f; }

            let pic: PictureBox = this.rpwPrint.getBody();
            pic.Width = (this.realWidth * nZoom);
            pic.Height = (this.realHeight * nZoom);

            if (nZoom > 0.5) {
                this.paint.setZoom(100);
                this.paint.setScaleX(nZoom);
                this.paint.setScaleY(nZoom);
                this.scaleFont = nZoom;
                printPage(this.currPage);
            }
            else {
                this.paint.setZoom(zoom);
                this.rpwPrint.getBody().Refresh();
            }
        }

        private rpwPrint_DoPrint() {
            cIReportPrint_PrintReport();
        }

        /*TODO: we need to decide if this is useful
         * 
            private void this.rpwPrint_ExportExcel() {
                try {

                    cMouseWait mouse = new cMouseWait();

                    Application.DoEvents();

                    CSReportExport.cReportExcel expExcel = null;
                    expExcel = new CSReportExport.cReportExcel();

                    expExcel.export(this.report);

                } catch (Exception ex) {
                    cError.mngError(ex);
                }
            }
        */
        private rpwPrint_ExportPDF() {
            exportPDF();
        }

        // Files is a list of file names separated by |
        //
        public sendMail(files: string, emailAddress: string) {
            let expPDF: cReportPdf = null;
            expPDF = new cReportPdf();

            expPDF.setExportEmailAddress(emailAddress);
            return expPDF.sendMail(files);
        }

        public exportPDFEx(outputFile: string, bShowPDFWindow: boolean) {
            return pExportPDF(outputFile, bShowPDFWindow);
        }

        public exportPDF() {
            let dummy: string = "";
            return pExportPDF(dummy, true);
        }

        private pGetExportFileName() {
            if (this.exportFileName !== "") {
                return this.exportFileName;
            }
            else {
                return this.report.getName();
            }
        }

        private pExportPDF(outputFile: string, bShowPDFWindow: boolean) {
            try {
                let mouse: cMouseWait = new cMouseWait();

                let expPDF: CSReportExport.cReportPdf = null;
                expPDF = new CSReportExport.cReportPdf();

                expPDF.setFileName(cUtil.getValidPath(System.Environment.GetEnvironmentVariable("TEMP")) + this.pGetExportFileName());
                expPDF.setExportEmailAddress(this.report.getExportEmailAddress());

                return expPDF.exportEx(this.report, this, outputFile, bShowPDFWindow);

            }
            catch (ex) {
                cError.mngError(ex);
                return false;
            }
        }

        /* We need to decide if it is useful
         * 
            private void this.rpwPrint_ExportWord() {
                try {
                    cMouseWait mouse = new cMouseWait();

                    CSReportExport.cReportWord expWord = null;
                    expWord = new CSReportExport.cReportWord();

                    expWord.export(this.report);

                } catch (Exception ex) {
                    cError.mngError(ex);
                }
            }
        */
        private rpwPrintMoveFirst(sender: object, e: EventArgs) {
            printPage(csEMoveTo.C_FIRSTPAGE);
        }

        private rpwPrintMoveLast(sender: object, e: EventArgs) {
            printPage(csEMoveTo.C_LASTPAGE);
        }

        private rpwPrintMoveNext(sender: object, e: EventArgs) {
            printPage(csEMoveTo.C_NEXTPAGE);
        }

        private rpwPrintMovePrevious(sender: object, e: EventArgs) {
            printPage(csEMoveTo.C_PREVIOUSPAGE);
        }

        private rpwPrintMoveToPage(sender: object, e: PageEventArgs) {
            printPage(e.page);
        }

        private rpwPrint_SaveDocument() {
            //If Not this.Report.SaveData(this.rpwPrint.cmFileSaveDialog) Then Exit Sub
        }

        private drawPage(graph: Graphics, isPrinter: boolean) {
            let i: number = 0;

            if (this.rePaintObject) {
                if (isPrinter) {
                    this.paint.createBackgroundBitmap(graph);

                    for (i = 0; i < this.paint.getPaintObjects().count(); i++) {
                        if (!this.paint.drawObject(this.paint.getPaintObjects().getNextKeyForZOrder(i), graph)) { return false; }
                    }

                    for (i = 0; i < this.paint.getPaintSections().count(); i++) {
                        if (!this.paint.drawSection(this.paint.getPaintSections().getNextKeyForZOrder(i), graph)) { return false; }
                    }
                }
                else {
                    this.paint.clearPage(this.rpwPrint.getBody().CreateGraphics());

                    this.rePaintObject = false;

                    this.paint.paintPicture(graph, false);
                }
            }
            else {
                this.paint.paintPicture(graph, false);
            }
            return true;
        }

        private pDestroyFonts() {
            /*
            int iFnt = 0;
            for (iFnt = 1; iFnt <= this.iFontCount; iFnt++)
            {
                DeleteObject(this.hFnt[iFnt]);
            }
            this.fnt = [];
            this.hFnt = [];
             */
        }

        public Dispose() {
            this.report = null;
            this.paint = null;
            if (this.fPreview !== null) {
                this.fPreview.Dispose();
            }
            this.rpwPrint = null;
        }

        public printReport() {
            return this.pDoPrint(null);
        }

        public getPageImageAsBase64(page: number, pageIndex: number) {
            if (this.paint !== null) {
                if(this.currPage !== page -1) printPage(page, true);
				pageIndex = this.currPage + 1;

                let bmp: Bitmap = new Bitmap(this.realWidth, (int)this.realHeight);
                let bmpGraphics: Graphics = Graphics.FromImage(bmp);
                this.drawPage(bmpGraphics, false);
                let memoryStream: MemoryStream = new MemoryStream();
                this.paint.getBitmap().Save(memoryStream, ImageFormat.Png);
                let pngData = memoryStream.ToArray();
                let image = Convert.ToBase64String(pngData);
                return "data:image/png;base64," + image;
            }
            else {
				pageIndex = -1;
                return "";
            }            
        }
    }
}
