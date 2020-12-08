(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {
	globalObject.CSReportPaint.createCReportPrint = function() {

	    const self = {}; //@@@: public class cReportPrint : cIReportPrint, IDisposable

        const C_MODULE = "cReportPrint"; //@@@: private const String C_MODULE = "cReportPrint";

        const C_OFFSETHEADER = 0; //@@@: private const int C_OFFSETHEADER = 0;
        const C_OFFSETDETAIL = 100000; //@@@: private const int C_OFFSETDETAIL = 100000;
        const C_OFFSETFOOTER = 1000000; //@@@: private const int C_OFFSETFOOTER = 1000000;

        let m_report = null; //@@@: private CSReportDll.cReport m_report;
        let m_paint = null; //@@@: private cReportPaint m_paint;
        let m_rpwPrint = null; //@@@: private CSReportPreview.cReportPreview m_rpwPrint;
        let m_fPreview = null; //@@@: private fPreview m_fPreview;

        let m_lastIndexField = 0; //@@@: private int m_lastIndexField = 0;

        let m_currPage = -1; //@@@: private int m_currPage = -1;

        let m_fnt = null; //@@@: private Font[] m_fnt;

        let m_x = 0; //@@@: private int m_x = 0;
        let m_y = 0; //@@@: private int m_y = 0;

        let m_rePaintObject = null; //@@@: private bool m_rePaintObject;

        let m_realWidth = 0; //@@@: private int m_realWidth = 0;
        let m_realHeight = 0; //@@@: private int m_realHeight = 0;

        let m_scaleFont = 1; //@@@: private float m_scaleFont = 1;

        let m_scaleY = 1; //@@@: private float m_scaleY = 1;
        let m_scaleX = 1; //@@@: private float m_scaleX = 1;

        let m_bModal = null; //@@@: private bool m_bModal;

        let m_bHidePreviewWindow = null; //@@@: private bool m_bHidePreviewWindow;

        let m_fileToSavePDF = ""; //@@@: private String m_fileToSavePDF = "";
        let m_pDFQuality = null; //@@@: private csPDFQuality m_pDFQuality;

        let m_exportFileName = ""; //@@@: private String m_exportFileName = "";

        let m_objClientToPrint = null; //@@@: private cIPrintClient m_objClientToPrint;
        let m_pagesToPrint = null; //@@@: private int[] m_pagesToPrint = null;
        let m_pageToPrint = -1; //@@@: private int m_pageToPrint = -1;

        let m_oldZoom = 0; //@@@: private int m_oldZoom = 0;
        let m_oldScaleY = 0; //@@@: private float m_oldScaleY = 0;
        let m_oldScaleX = 0; //@@@: private float m_oldScaleX = 0;
        let m_oldScaleFont = 0; //@@@: private float m_oldScaleFont = 0;

        const cReportPrint = function() { //@@@: public cReportPrint()
            try { //@@@: try
                m_scaleX = 1; //@@@: m_scaleX = 1;
                m_scaleY = 1; //@@@: m_scaleY = 1;

                cGlobals.redim(m_fnt, 0); //@@@: cGlobals.redim(ref m_fnt, 0);
            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                self."constructor", C_MODULE, "") = null; //@@@: cError.mngError(ex, "constructor", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        //---------------------------------------------------------------------------
        //
        // Export to PDF

        // for cExportPDF
        //
        self.getFileToSavePDF = function() { //@@@: public String getFileToSavePDF()
            return m_fileToSavePDF; //@@@: return m_fileToSavePDF;
        }; //@@@: }

        self.setFileToSavePDF = function(rhs) { //@@@: public void setFileToSavePDF(String rhs)
            m_fileToSavePDF = rhs; //@@@: m_fileToSavePDF = rhs;
        }; //@@@: }

        self.getPDFQuality = function() { //@@@: public csPDFQuality getPDFQuality()
            return m_pDFQuality; //@@@: return m_pDFQuality;
        }; //@@@: }

        self.setPDFQuality = function(rhs) { //@@@: public void setPDFQuality(csPDFQuality rhs)
            m_pDFQuality = rhs; //@@@: m_pDFQuality = rhs;
        }; //@@@: }

        // for cPrintManager
        //
        self.getExportFileName = function() { //@@@: public String getExportFileName()
            return m_exportFileName; //@@@: return m_exportFileName;
        }; //@@@: }

        self.setExportFileName = function(rhs) { //@@@: public void setExportFileName(String rhs)
            m_exportFileName = rhs; //@@@: m_exportFileName = rhs;
        }; //@@@: }

        //
        //---------------------------------------------------------------------------

        self.getReport = function() { //@@@: public CSReportDll.cReport getReport()
            return m_report; //@@@: return m_report;
        }; //@@@: }

        self.setPreviewControl = function(rhs) { //@@@: public void setPreviewControl(CSReportPreview.cReportPreview rhs)
            m_rpwPrint = rhs; //@@@: m_rpwPrint = rhs;
        }; //@@@: }

        self.getCurrPage = function() { //@@@: public int getCurrPage()
            return m_currPage; //@@@: return m_currPage;
        }; //@@@: }

        self.setCurrPage = function(rhs) { //@@@: public void setCurrPage(int rhs)
            m_currPage = rhs; //@@@: m_currPage = rhs;
        }; //@@@: }

        self.setModal = function(rhs) { //@@@: public void setModal(bool rhs)
            m_bModal = rhs; //@@@: m_bModal = rhs;
        }; //@@@: }

        self.setHidePreviewWindow = function(rhs) { //@@@: public void setHidePreviewWindow(bool rhs)
            m_bHidePreviewWindow = rhs; //@@@: m_bHidePreviewWindow = rhs;
        }; //@@@: }

        const setReport = function(rhs) { //@@@: private void setReport(CSReportDll.cReport rhs)
            m_report = rhs; //@@@: m_report = rhs;
        }; //@@@: }

        self.closePreviewWindow = function() { //@@@: public bool closePreviewWindow()
            try { //@@@: try
                if (m_fPreview !== null) { //@@@: if (m_fPreview != null)
                    m_fPreview.Dispose(); //@@@: m_fPreview.Dispose();
                    m_fPreview = null; //@@@: m_fPreview = null;
                } //@@@: }
                return true; //@@@: return true;

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "ClosePreviewWindow", C_MODULE, ""); //@@@: cError.mngError(ex, "ClosePreviewWindow", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.getLine = function(indexField) { //@@@: public CSReportDll.cReportPageFields getLine(int indexField)
            let fld = null; //@@@: CSReportDll.cReportPageField fld = null;
            fld = getField(indexField); //@@@: fld = getField(indexField);

            if (fld === null) { //@@@: if (fld == null)
                return null; //@@@: return null;
            } //@@@: }
            else { //@@@: else
                let w_item = m_report.getPages().item(m_currPage); //@@@: CSReportDll.cReportPage w_item = m_report.getPages().item(m_currPage);
                if (indexField < C_OFFSETDETAIL) { //@@@: if (indexField < C_OFFSETDETAIL)
                    return pGetLineAux(fld.getIndexLine(), w_item.getHeader()); //@@@: return pGetLineAux(fld.getIndexLine(), w_item.getHeader());
                } //@@@: }
                else if (indexField < C_OFFSETFOOTER) { //@@@: else if (indexField < C_OFFSETFOOTER)
                    return pGetLineAux(fld.getIndexLine(), w_item.getDetail()); //@@@: return pGetLineAux(fld.getIndexLine(), w_item.getDetail());
                } //@@@: }
                else { //@@@: else
                    return pGetLineAux(fld.getIndexLine(), w_item.getFooter()); //@@@: return pGetLineAux(fld.getIndexLine(), w_item.getFooter());
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.getCtrlFooter = function(ctrlName) { //@@@: public CSReportDll.cReportPageField getCtrlFooter(String ctrlName)
            return getFieldByCtrlName(ctrlName, m_report.getPages().item(m_currPage).getFooter()); //@@@: return getFieldByCtrlName(ctrlName, m_report.getPages().item(m_currPage).getFooter());
        }; //@@@: }

        self.getIndexFieldByName = function(ctrlName) { //@@@: public int getIndexFieldByName(String ctrlName)
            return m_paint.getPaintObjects().item(ctrlName).getIndexField(); //@@@: return m_paint.getPaintObjects().item(ctrlName).getIndexField();
        }; //@@@: }

        self.refreshCtrl = function(indexField) { //@@@: public void refreshCtrl(int indexField)
            let paintObj = null; //@@@: cReportPaintObject paintObj = null;
            let fld = null; //@@@: CSReportDll.cReportPageField fld = null;
            let page = null; //@@@: CSReportDll.cReportPage page = null;

            page = m_report.getPages().item(m_currPage); //@@@: page = m_report.getPages().item(m_currPage);

            if (indexField < C_OFFSETDETAIL) { //@@@: if (indexField < C_OFFSETDETAIL)
                if (!pGetFieldFromIndexAux(page.getHeader(), indexField, fld)) { //@@@: if (!pGetFieldFromIndexAux(page.getHeader(), indexField, ref fld))
                    return; //@@@: return;
                } //@@@: }
            } //@@@: }
            else if (indexField < C_OFFSETFOOTER) { //@@@: else if (indexField < C_OFFSETFOOTER)
                if (!pGetFieldFromIndexAux(page.getDetail(), indexField - C_OFFSETDETAIL, fld)) { //@@@: if (!pGetFieldFromIndexAux(page.getDetail(), indexField - C_OFFSETDETAIL, ref fld))
                    return; //@@@: return;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                if (!pGetFieldFromIndexAux(page.getFooter(), indexField - C_OFFSETFOOTER, fld)) { //@@@: if (!pGetFieldFromIndexAux(page.getFooter(), indexField - C_OFFSETFOOTER, ref fld))
                    return; //@@@: return;
                } //@@@: }
            } //@@@: }

            paintObj = pGetPaintObjByIndex(indexField); //@@@: paintObj = pGetPaintObjByIndex(indexField);

            let ctrlFont = null; //@@@: CSReportDll.cReportFont ctrlFont = null;
            ctrlFont = fld.getInfo().getAspect().getFont(); //@@@: ctrlFont = fld.getInfo().getAspect().getFont();

            let w_aspect = paintObj.getAspect(); //@@@: CSReportDll.cReportAspect w_aspect = paintObj.getAspect();
            let w_font = w_aspect.getFont(); //@@@: CSReportDll.cReportFont w_font = w_aspect.getFont();
            w_font.setForeColor(ctrlFont.getForeColor()); //@@@: w_font.setForeColor(ctrlFont.getForeColor());
            w_font.setBold(ctrlFont.getBold()); //@@@: w_font.setBold(ctrlFont.getBold());
            w_font.setItalic(ctrlFont.getItalic()); //@@@: w_font.setItalic(ctrlFont.getItalic());
            w_font.setName(ctrlFont.getName()); //@@@: w_font.setName(ctrlFont.getName());
            w_font.setSize(ctrlFont.getSize()); //@@@: w_font.setSize(ctrlFont.getSize());
            w_font.setStrike(ctrlFont.getStrike()); //@@@: w_font.setStrike(ctrlFont.getStrike());
			w_font.setUnderline(ctrlFont.getUnderline()); //@@@: w_font.setUnderline(ctrlFont.getUnderline());

            m_paint.refreshObject(paintObj.getKey(), m_rpwPrint.getGraph()); //@@@: m_paint.refreshObject(paintObj.getKey(), m_rpwPrint.getGraph());
        }; //@@@: }

        self.refreshCtrlFooter = function(ctrlName) { //@@@: public void refreshCtrlFooter(String ctrlName)
            let paintObj = null; //@@@: cReportPaintObject paintObj = null;
            paintObj = pGetPaintObjByCtrlName(ctrlName, m_report.getPages().item(m_currPage).getFooter(), C_OFFSETFOOTER); //@@@: paintObj = pGetPaintObjByCtrlName(ctrlName, m_report.getPages().item(m_currPage).getFooter(), C_OFFSETFOOTER);
            paintObj.setText(getCtrlFooter(ctrlName).getValue()); //@@@: paintObj.setText(getCtrlFooter(ctrlName).getValue());
            m_paint.refreshObject(paintObj.getKey(), m_rpwPrint.getGraph()); //@@@: m_paint.refreshObject(paintObj.getKey(), m_rpwPrint.getGraph());
        }; //@@@: }

        self.getFieldByCtrlName = function( //@@@: public CSReportDll.cReportPageField getFieldByCtrlName(
            ctrlName,  //@@@: String ctrlName,
            fields) { //@@@: CSReportDll.cReportPageFields fields)
            return getFieldByCtrlName(ctrlName, fields, 0); //@@@: return getFieldByCtrlName(ctrlName, fields, 0);
        }; //@@@: }

        self.getFieldByCtrlName = function( //@@@: public CSReportDll.cReportPageField getFieldByCtrlName(
            ctrlName,  //@@@: String ctrlName,
            fields,  //@@@: CSReportDll.cReportPageFields fields,
            indexField) { //@@@: int indexField)
            let fld = null; //@@@: CSReportDll.cReportPageField fld = null;

            for(var _i = 0; _i < fields.count(); _i++) { //@@@: for (int _i = 0; _i < fields.count(); _i++)
                fld = fields.item(_i); //@@@: fld = fields.item(_i);
                if (fld.getInfo().getName() === ctrlName) { //@@@: if (fld.getInfo().getName() == ctrlName)
                    if (isInThisLine(ctrlName, indexField, fld)) { //@@@: if (isInThisLine(ctrlName, indexField, fld))
                        return fld; //@@@: return fld;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        self.getPaintObjByCtrlNameEx = function(ctrlName, indexField) { //@@@: public cReportPaintObject getPaintObjByCtrlNameEx(String ctrlName, int indexField)
            let fld = null; //@@@: CSReportDll.cReportPageField fld = null;
            let fields = null; //@@@: CSReportDll.cReportPageFields fields = null;
            let offset = 0; //@@@: int offset = 0;

            let w_item = m_report.getPages().item(m_currPage); //@@@: CSReportDll.cReportPage w_item = m_report.getPages().item(m_currPage);

            fields = w_item.getHeader(); //@@@: fields = w_item.getHeader();
            offset = C_OFFSETHEADER; //@@@: offset = C_OFFSETHEADER;
            fld = getFieldByCtrlName(ctrlName, fields, indexField); //@@@: fld = getFieldByCtrlName(ctrlName, fields, indexField);

            if (fld === null) { //@@@: if (fld == null)
                fields = w_item.getDetail(); //@@@: fields = w_item.getDetail();
                offset = C_OFFSETDETAIL; //@@@: offset = C_OFFSETDETAIL;
                fld = getFieldByCtrlName(ctrlName, fields, indexField); //@@@: fld = getFieldByCtrlName(ctrlName, fields, indexField);

                if (fld === null) { //@@@: if (fld == null)
                    fields = w_item.getFooter(); //@@@: fields = w_item.getFooter();
                    offset = C_OFFSETFOOTER; //@@@: offset = C_OFFSETFOOTER;
                    fld = getFieldByCtrlName(ctrlName, fields, indexField); //@@@: fld = getFieldByCtrlName(ctrlName, fields, indexField);
                    if (fld === null) { //@@@: if (fld == null)
                        return null; //@@@: return null;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            for(var _i = 0; _i < m_paint.getPaintObjects().count(); _i++) { //@@@: for (int _i = 0; _i < m_paint.getPaintObjects().count(); _i++)
                let paintObj = m_paint.getPaintObjects().item(_i); //@@@: var paintObj = m_paint.getPaintObjects().item(_i);
                if (fields.item(paintObj.getIndexField() - offset) === fld) { //@@@: if (fields.item(paintObj.getIndexField() - offset) == fld)
                    if (isInThisLine(ctrlName, indexField, fld)) { //@@@: if (isInThisLine(ctrlName, indexField, fld))
                        return paintObj; //@@@: return paintObj;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        self.isInThisLine = function( //@@@: public bool isInThisLine(
            ctrlName,  //@@@: String ctrlName,
            indexField,  //@@@: int indexField,
            testFld) { //@@@: CSReportDll.cReportPageField testFld)
            let fields = null; //@@@: CSReportDll.cReportPageFields fields = null;
            let fld = null; //@@@: CSReportDll.cReportPageField fld = null;

            if (indexField === 0) { //@@@: if (indexField == 0)
                return true; //@@@: return true;
            } //@@@: }
            fields = getLine(indexField); //@@@: fields = getLine(indexField);

            for(var _i = 0; _i < fields.count(); _i++) { //@@@: for (int _i = 0; _i < fields.count(); _i++)
                fld = fields.item(_i); //@@@: fld = fields.item(_i);
                if (fld.getInfo().getName() === ctrlName) { //@@@: if (fld.getInfo().getName() == ctrlName)
                    if (testFld === fld) { //@@@: if (testFld == fld)
                        return true; //@@@: return true;
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        self.getField = function(indexField) { //@@@: public CSReportDll.cReportPageField getField(int indexField)
            let rtn = null; //@@@: CSReportDll.cReportPageField rtn = null;
            let page = null; //@@@: CSReportDll.cReportPage page = null;

            page = m_report.getPages().item(m_currPage); //@@@: page = m_report.getPages().item(m_currPage);

            if (indexField < C_OFFSETDETAIL) { //@@@: if (indexField < C_OFFSETDETAIL)
                if (!pGetFieldFromIndexAux(page.getHeader(), indexField, rtn)) { //@@@: if (!pGetFieldFromIndexAux(page.getHeader(), indexField, ref rtn))
                    return null; //@@@: return null;
                } //@@@: }
            } //@@@: }
            else if (indexField < C_OFFSETFOOTER) { //@@@: else if (indexField < C_OFFSETFOOTER)
                if (!pGetFieldFromIndexAux(page.getDetail(), indexField - C_OFFSETDETAIL, rtn)) { //@@@: if (!pGetFieldFromIndexAux(page.getDetail(), indexField - C_OFFSETDETAIL, ref rtn))
                    return null; //@@@: return null;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                if (!pGetFieldFromIndexAux(page.getFooter(), indexField - C_OFFSETFOOTER, rtn)) { //@@@: if (!pGetFieldFromIndexAux(page.getFooter(), indexField - C_OFFSETFOOTER, ref rtn))
                    return null; //@@@: return null;
                } //@@@: }
            } //@@@: }
            return rtn; //@@@: return rtn;
        }; //@@@: }

        self.fieldIsInDetail = function(indexField) { //@@@: public bool fieldIsInDetail(int indexField)
            return indexField >= C_OFFSETDETAIL && indexField < C_OFFSETFOOTER; //@@@: return indexField >= C_OFFSETDETAIL && indexField < C_OFFSETFOOTER;
        }; //@@@: }

        self.printPage = function(moveTo) { //@@@: public void printPage(int moveTo)
            printPage(moveTo, false); //@@@: printPage(moveTo, false);
        }; //@@@: }

        self.printPage = function(nPage, inPrinter) { //@@@: public void printPage(int nPage, bool inPrinter)
            let page = null; //@@@: CSReportDll.cReportPage page = null;

            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();

            m_rePaintObject = true; //@@@: m_rePaintObject = true;

            if (nPage > 1) { //@@@: if (nPage > 1)
                m_currPage = nPage-1; //@@@: m_currPage = nPage-1;
            } //@@@: }
            else { //@@@: else
                switch (nPage) //@@@: switch (nPage)
                { //@@@: {
                    case csEMoveTo.C_FIRSTPAGE: //@@@: case (int)csEMoveTo.C_FIRSTPAGE:
                        m_currPage = 0; //@@@: m_currPage = 0;
                        break; //@@@: break;
                    case csEMoveTo.C_LASTPAGE: //@@@: case (int)csEMoveTo.C_LASTPAGE:
                        m_currPage = m_report.getPages().count()-1; //@@@: m_currPage = m_report.getPages().count()-1;
                        break; //@@@: break;
                    case csEMoveTo.C_NEXTPAGE: //@@@: case (int)csEMoveTo.C_NEXTPAGE:
                        if (m_currPage + 1 < m_report.getPages().count()) { //@@@: if (m_currPage + 1 < m_report.getPages().count())
                            m_currPage = m_currPage + 1; //@@@: m_currPage = m_currPage + 1;
                        } //@@@: }
                        else { //@@@: else
                            m_currPage = m_report.getPages().count()-1; //@@@: m_currPage = m_report.getPages().count()-1;
                        } //@@@: }
                        break; //@@@: break;
                    case csEMoveTo.C_PREVIOUSPAGE: //@@@: case (int)csEMoveTo.C_PREVIOUSPAGE:
                        if (m_currPage - 1 >= 0) { //@@@: if (m_currPage - 1 >= 0)
                            m_currPage = m_currPage - 1; //@@@: m_currPage = m_currPage - 1;
                        } //@@@: }
                        else { //@@@: else
                            m_currPage = 0; //@@@: m_currPage = 0;
                        } //@@@: }
                        break; //@@@: break;
                } //@@@: }
            } //@@@: }
            if (m_currPage === -1 || m_currPage > m_report.getPages().count()-1) { return; } //@@@: if (m_currPage == -1 || m_currPage > m_report.getPages().count()-1) { return; }

            page = m_report.getPages().item(m_currPage); //@@@: page = m_report.getPages().item(m_currPage);

            // we need to clear the print object
            //
            m_paint.getPaintObjects().clear(); //@@@: m_paint.getPaintObjects().clear();

            createPaintObjects(page.getHeader(), C_OFFSETHEADER); //@@@: createPaintObjects(page.getHeader(), C_OFFSETHEADER);
            createPaintObjects(page.getDetail(), C_OFFSETDETAIL); //@@@: createPaintObjects(page.getDetail(), C_OFFSETDETAIL);
            createPaintObjects(page.getFooter(), C_OFFSETFOOTER); //@@@: createPaintObjects(page.getFooter(), C_OFFSETFOOTER);

            if (!inPrinter) { //@@@: if (!inPrinter)
                // set the current page in the preview window
                //
                m_rpwPrint.setCurrPage(m_currPage); //@@@: m_rpwPrint.setCurrPage(m_currPage);

                m_rpwPrint.getBody().Refresh(); //@@@: m_rpwPrint.getBody().Refresh();
            } //@@@: }
        }; //@@@: }

        self.doPrint = function(objClient) { //@@@: public bool doPrint(cIPrintClient objClient)
            return pDoPrint(objClient); //@@@: return pDoPrint(objClient);
        }; //@@@: }

        //----------------------------------------------------
        // cIReportPrint implementation
        //
        self.makeReport = function() { //@@@: public bool makeReport()
            return make(); //@@@: return make();
        }; //@@@: }

        self.makeXml = function() { //@@@: public bool makeXml()
            // TODO: not implemented yet
            //
            return false; //@@@: return false;
        }; //@@@: }

        self.previewReport = function() { //@@@: public bool previewReport()
            setPreviewForm(); //@@@: setPreviewForm();

            pCreatePaint(); //@@@: pCreatePaint();

            m_rpwPrint.setPages(m_report.getPages().count()); //@@@: m_rpwPrint.setPages(m_report.getPages().count());
            printPage(csEMoveTo.C_FIRSTPAGE, false); //@@@: printPage((int)csEMoveTo.C_FIRSTPAGE, false);

            let f = m_rpwPrint.Parent; //@@@: Form f = (Form)m_rpwPrint.Parent;

            if (m_bModal) { //@@@: if (m_bModal)
                f.ShowDialog(); //@@@: f.ShowDialog();
            } //@@@: }
            else { //@@@: else
                if (!m_bHidePreviewWindow) { //@@@: if (!m_bHidePreviewWindow)
                    f.Show(); //@@@: f.Show();
                    if (f.WindowState === FormWindowState.Minimized) { //@@@: if (f.WindowState == FormWindowState.Minimized)
                        f.WindowState = FormWindowState.Normal; //@@@: f.WindowState = FormWindowState.Normal;
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.cIReportPrint_PrintReport = function() { //@@@: public bool cIReportPrint_PrintReport()
            return pDoPrint(null); //@@@: return pDoPrint(null);
        }; //@@@: }

        const pDoPrint = function(objClient) { //@@@: private bool pDoPrint(cIPrintClient objClient)
            try { //@@@: try
                let copies = 0; //@@@: int copies = 0;
                let q = 0; //@@@: int q = 0;

                pCreatePaint(); //@@@: pCreatePaint();

                m_rePaintObject = true; //@@@: m_rePaintObject = true;

                let printer = null; //@@@: cPrinter printer = null;

                // if the printer is not defined
                //
                if (m_report.getLaunchInfo().getPrinter() === null) { //@@@: if (m_report.getLaunchInfo().getPrinter() == null)
                    printer = cPrintAPI.getcPrinterFromDefaultPrinter(null); //@@@: printer = cPrintAPI.getcPrinterFromDefaultPrinter(null);
                } //@@@: }
                // we use the printer asigned by the caller
                //
                else { //@@@: else
                    printer = m_report.getLaunchInfo().getPrinter(); //@@@: printer = m_report.getLaunchInfo().getPrinter();
                } //@@@: }

                let w_launchInfo = m_report.getLaunchInfo(); //@@@: cReportLaunchInfo w_launchInfo = m_report.getLaunchInfo();
                copies = w_launchInfo.getCopies(); //@@@: copies = w_launchInfo.getCopies();
                if (w_launchInfo.getShowPrintersDialog()) { //@@@: if (w_launchInfo.getShowPrintersDialog())
                    printer.setCopies(copies); //@@@: printer.setCopies(copies);
                    if (!printer.showDialog(m_report.getPages().count())) { //@@@: if (!printer.showDialog(m_report.getPages().count()))
                        return false; //@@@: return false;
                    } //@@@: }
                    copies = printer.getCopies(); //@@@: copies = printer.getCopies();
                } //@@@: }
                else { //@@@: else
                    printer.getPaperInfo().setPagesToPrint("1-" + m_report.getPages().count().ToString()); //@@@: printer.getPaperInfo().setPagesToPrint("1-" + m_report.getPages().count().ToString());
                } //@@@: }

                for (q = 0; q < copies; q++) { //@@@: for (q = 0; q < copies; q++)
                    if (!printPagesToPrinter(printer, objClient)) { //@@@: if (!printPagesToPrinter(printer, objClient))
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }

                return true; //@@@: return true;

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "pDoPrint", C_MODULE, ""); //@@@: cError.mngError(ex, "pDoPrint", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
UNKNOWN >>             finally //@@@: finally
            { //@@@: {
                if (m_rpwPrint !== null) { //@@@: if (m_rpwPrint != null)
                    printPage(m_currPage, false); //@@@: printPage(m_currPage, false);
                    m_rpwPrint.getBody().Refresh(); //@@@: m_rpwPrint.getBody().Refresh();
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const pGetPaintObjByIndex = function(indexField) { //@@@: private cReportPaintObject pGetPaintObjByIndex(int indexField)
            for(var _i = 0; _i < m_paint.getPaintObjects().count(); _i++) { //@@@: for (int _i = 0; _i < m_paint.getPaintObjects().count(); _i++)
                let po = m_paint.getPaintObjects().item(_i); //@@@: cReportPaintObject po = m_paint.getPaintObjects().item(_i);
                if (po.getIndexField() === indexField) { //@@@: if (po.getIndexField() == indexField)
                    return po; //@@@: return po;
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        const pGetPaintObjByCtrlName = function( //@@@: private cReportPaintObject pGetPaintObjByCtrlName(
            ctrlName,  //@@@: String ctrlName,
            fields,  //@@@: CSReportDll.cReportPageFields fields,
            offset) { //@@@: int offset)
            let fld = getFieldByCtrlName(ctrlName, fields); //@@@: CSReportDll.cReportPageField fld = getFieldByCtrlName(ctrlName, fields);

            for(var _i = 0; _i < m_paint.getPaintObjects().count(); _i++) { //@@@: for (int _i = 0; _i < m_paint.getPaintObjects().count(); _i++)
                let rtn = m_paint.getPaintObjects().item(_i); //@@@: cReportPaintObject rtn = m_paint.getPaintObjects().item(_i);
                if (fields.item(rtn.getIndexField() - offset) === fld) { //@@@: if (fields.item(rtn.getIndexField() - offset) == fld)
                    return rtn; //@@@: return rtn;
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        const pCreatePaint = function() { //@@@: private void pCreatePaint()
            if (m_paint === null) { //@@@: if (m_paint == null)
                m_paint = new cReportPaint(); //@@@: m_paint = new cReportPaint();
            } //@@@: }
            m_paint.setNotBorder(true); //@@@: m_paint.setNotBorder(true);
        }; //@@@: }

        const printPagesToPrinter = function(printer, objClient) { //@@@: private bool printPagesToPrinter(cPrinter printer, cIPrintClient objClient)
            try { //@@@: try
                let printDoc = new PrintDocument(); //@@@: PrintDocument printDoc = new PrintDocument();

                let w_paperInfo = m_report.getPaperInfo(); //@@@: cReportPaperInfo w_paperInfo = m_report.getPaperInfo();
                if (!printer.starDoc(printDoc, //@@@: if (!printer.starDoc(printDoc,
                                        m_report.getName(), //@@@: m_report.getName(),
                                        w_paperInfo.getPaperSize(), //@@@: w_paperInfo.getPaperSize(),
                                        w_paperInfo.getOrientation())) { //@@@: w_paperInfo.getOrientation()))
                    return false; //@@@: return false;
                } //@@@: }

                printDoc.PrintPage += new PrintPageEventHandler(printPage); //@@@: printDoc.PrintPage += new PrintPageEventHandler(printPage);
                printDoc.PrinterSettings.PrinterName = printer.getDeviceName(); //@@@: printDoc.PrinterSettings.PrinterName = printer.getDeviceName();

                //PrintDialog printDialog = new PrintDialog();
                //printDialog.Document = printDoc;

                //DialogResult dialogResult = printDialog.ShowDialog();
                //if (dialogResult === DialogResult.OK)
                //{
                    m_pageToPrint = -1; //@@@: m_pageToPrint = -1;
                    m_pagesToPrint = pGetPagesToPrint(printer.getPaperInfo().getPagesToPrint()); //@@@: m_pagesToPrint = pGetPagesToPrint(printer.getPaperInfo().getPagesToPrint());
                    m_objClientToPrint = objClient; //@@@: m_objClientToPrint = objClient;
                    printDoc.Print(); //@@@: printDoc.Print();
                //}

                /* //@@@: /*
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
                return true; //@@@: return true;

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "printPagePrinter", C_MODULE, ""); //@@@: cError.mngError(ex, "printPagePrinter", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const printPage = function(sender, e) { //@@@: private void printPage(object sender, PrintPageEventArgs e)
            /* //@@@: /*
            if (!printer.starPage())
            {
                throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                          C_MODULE,
                                          "Ocurrio un error al imprimir el reporte."
                                          );
            }
            */

            /* //@@@: /*
            TODO: after some testing we must remove ScaleX and ScaleY
            */

            if (m_pageToPrint === -1) { //@@@: if (m_pageToPrint == -1) {

                let dpiX = 0; //@@@: float dpiX = 0;
                let dpiY = 0; //@@@: float dpiY = 0;

                m_oldScaleX = m_paint.getScaleX(); //@@@: m_oldScaleX = m_paint.getScaleX();
                m_oldScaleY = m_paint.getScaleY(); //@@@: m_oldScaleY = m_paint.getScaleY();
                m_oldScaleFont = m_scaleFont; //@@@: m_oldScaleFont = m_scaleFont;
                m_oldZoom = m_paint.getZoom(); //@@@: m_oldZoom = m_paint.getZoom();

                let graph = e.Graphics; //@@@: var graph = e.Graphics;
                dpiX = graph.DpiX; //@@@: dpiX = graph.DpiX;
                dpiY = graph.DpiY; //@@@: dpiY = graph.DpiY;

                m_scaleX = dpiX / 100; //@@@: m_scaleX = dpiX / 100;
                m_scaleY = dpiY / 100; //@@@: m_scaleY = dpiY / 100;

                let twipsPerPixelX = 1440f / dpiX; //@@@: float twipsPerPixelX = 1440f / dpiX;
                let dPI = 0; //@@@: int dPI = 0;
                dPI = (1440f / twipsPerPixelX); //@@@: dPI = (int)(1440f / twipsPerPixelX);

                if (dPI !== 96 && dPI > 0) { //@@@: if (dPI != 96 && dPI > 0)
                    m_scaleX = m_scaleX * (96f / dPI); //@@@: m_scaleX = m_scaleX * (96f / dPI);
                    m_scaleY = m_scaleY * (96f / dPI); //@@@: m_scaleY = m_scaleY * (96f / dPI);
                } //@@@: }

                // we are not using scaleX and scaleY
                m_scaleX = 1; //@@@: m_scaleX = 1;
                m_scaleY = 1; //@@@: m_scaleY = 1;

                m_paint.setScaleX(m_scaleX); //@@@: m_paint.setScaleX(m_scaleX);
                m_paint.setScaleY(m_scaleY); //@@@: m_paint.setScaleY(m_scaleY);

                m_paint.setZoom(100); //@@@: m_paint.setZoom(100);
                m_scaleFont = 1; //@@@: m_scaleFont = 1;
            } //@@@: }

            m_pageToPrint += 1; //@@@: m_pageToPrint += 1;

            while (m_pageToPrint < m_report.getPages().count()) { //@@@: while (m_pageToPrint < m_report.getPages().count())
                if (pHaveToPrintThisPage(m_pageToPrint+1, m_pagesToPrint)) { //@@@: if (pHaveToPrintThisPage(m_pageToPrint+1, m_pagesToPrint))
                    printPage(m_pageToPrint+1, true); //@@@: printPage(m_pageToPrint+1, true);
                    let graph = e.Graphics; //@@@: var graph = e.Graphics;

                    if (!drawPage(graph, true)) { //@@@: if (!drawPage(graph, true))
                        throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING, //@@@: throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                                  C_MODULE, //@@@: C_MODULE,
                                                  "Ocurrio un error al imprimir el reporte." //@@@: "Ocurrio un error al imprimir el reporte."
                                                  ); //@@@: );
                    } //@@@: }

                    if (!pRefreshObjClient(m_pageToPrint, m_objClientToPrint)) { //@@@: if (!pRefreshObjClient(m_pageToPrint, m_objClientToPrint))
                        throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING, //@@@: throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_PRINTING,
                                                  C_MODULE, //@@@: C_MODULE,
                                                  "Ocurrio un error al imprimir el reporte." //@@@: "Ocurrio un error al imprimir el reporte."
                                                  ); //@@@: );
                    } //@@@: }

                    e.HasMorePages = (m_pageToPrint+1 < m_pagesToPrint.Last()); //@@@: e.HasMorePages = (m_pageToPrint+1 < m_pagesToPrint.Last());
                    return; //@@@: return;
                } //@@@: }
                else { //@@@: else {
                    m_pageToPrint += 1; //@@@: m_pageToPrint += 1;
                } //@@@: }
            } //@@@: }

            m_paint.setZoom(m_oldZoom); //@@@: m_paint.setZoom(m_oldZoom);
            m_scaleX = m_oldScaleX; //@@@: m_scaleX = m_oldScaleX;
            m_scaleY = m_oldScaleY; //@@@: m_scaleY = m_oldScaleY;
            m_paint.setScaleX(m_oldScaleX); //@@@: m_paint.setScaleX(m_oldScaleX);
            m_paint.setScaleY(m_oldScaleY); //@@@: m_paint.setScaleY(m_oldScaleY);
            m_scaleFont = m_oldScaleFont; //@@@: m_scaleFont = m_oldScaleFont;

            e.HasMorePages = false; //@@@: e.HasMorePages = false;
        }; //@@@: }

        const pRefreshObjClient = function(iPage, objClient) { //@@@: private bool pRefreshObjClient(int iPage, cIPrintClient objClient)
            if (objClient === null) { //@@@: if (objClient == null)
                return true; //@@@: return true;
            } //@@@: }
            else { //@@@: else
                return objClient.printingPage(iPage); //@@@: return objClient.printingPage(iPage);
            } //@@@: }
        }; //@@@: }

        const pHaveToPrintThisPage = function(page, v) { //@@@: private bool pHaveToPrintThisPage(int page, int[] v)
            for(var n = 0; n < v.Length; n++) { //@@@: for (int n = 0; n < v.Length; n++)
                if (page === v[n]) { //@@@: if (page == v[n])
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pGetPagesToPrint = function(pagesToPrint) { //@@@: private int[] pGetPagesToPrint(String pagesToPrint)
            let v = null; //@@@: String[] v = null;
            let n = null; //@@@: int[] n = null;
            let v2 = null; //@@@: String[] v2 = null;
            let t = 0; //@@@: int t = 0;
            let r = 0; //@@@: int r = 0;
            let addInterval = false; //@@@: bool addInterval = false;

            v = pagesToPrint.Split(','); //@@@: v = pagesToPrint.Split(',');

            G.redim(n, 0); //@@@: G.redim(ref n, 0);

            for(var i = 0; i < v.Length; i++) { //@@@: for (int i = 0; i < v.Length; i++)
                let k = v[i].IndexOf("-", 1); //@@@: int k = v[i].IndexOf("-", 1);
                if (k > 0) { //@@@: if (k > 0)
                    v2 = v[i].Split('-'); //@@@: v2 = v[i].Split('-');
                    addInterval = false; //@@@: addInterval = false;
                    for (t = 0; t < v2.Length; t++) { //@@@: for (t = 0; t < v2.Length; t++)
                        if (G.isNumeric(v2[t])) { //@@@: if (G.isNumeric(v2[t]))
                            if (addInterval) { //@@@: if (addInterval)
                                for (r = n[n.Length - 1] + 1; r <= int.Parse(v2[t]) - 1; r++) { //@@@: for (r = n[n.Length - 1] + 1; r <= int.Parse(v2[t]) - 1; r++)
                                    G.redimPreserve(n, n.Length + 1); //@@@: G.redimPreserve(ref n, n.Length + 1);
                                    n[n.Length - 1] = r; //@@@: n[n.Length - 1] = r;
                                } //@@@: }
                            } //@@@: }
                            else { //@@@: else
                                addInterval = true; //@@@: addInterval = true;
                            } //@@@: }
                            G.redimPreserve(n, n.Length + 1); //@@@: G.redimPreserve(ref n, n.Length + 1);
                            n[n.Length - 1] = int.Parse(v2[t]); //@@@: n[n.Length - 1] = int.Parse(v2[t]);
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    if (G.isNumeric(v[i])) { //@@@: if (G.isNumeric(v[i]))
                        G.redimPreserve(n, n.Length + 1); //@@@: G.redimPreserve(ref n, n.Length + 1);
                        n[n.Length - 1] = int.Parse(v[i]); //@@@: n[n.Length - 1] = int.Parse(v[i]);
                    } //@@@: }
                } //@@@: }
            } //@@@: }
            return n; //@@@: return n;
        }; //@@@: }

        self.setReport = function(rhs) { //@@@: public void setReport(object rhs)
            m_report = rhs; //@@@: m_report = (CSReportDll.cReport)rhs;
        }; //@@@: }

        const pGetLineAux = function(indexLine, fields) { //@@@: private CSReportDll.cReportPageFields pGetLineAux(int indexLine, CSReportDll.cReportPageFields fields)
            let flds = new CSReportDll.cReportPageFields(); //@@@: CSReportDll.cReportPageFields flds = new CSReportDll.cReportPageFields();

            for(var _i = 0; _i < fields.count(); _i++) { //@@@: for (int _i = 0; _i < fields.count(); _i++)
                let fld = fields.item(_i); //@@@: CSReportDll.cReportPageField fld = fields.item(_i);
                if (fld.getIndexLine() === indexLine) { //@@@: if (fld.getIndexLine() == indexLine)
                    flds.add(fld); //@@@: flds.add(fld);
                } //@@@: }
            } //@@@: }
            return flds; //@@@: return flds;
        }; //@@@: }

        const make = function() { //@@@: private bool make()
            let detailHeight = 0; //@@@: float detailHeight = 0;
            let lineHeight = 0; //@@@: float lineHeight = 0;

            let fields = null; //@@@: CSReportDll.cReportPageFields fields = null;
            let field = null; //@@@: CSReportDll.cReportPageField field = null;
            let detail = null; //@@@: CSReportDll.cReportPageFields detail = null;

UNKNOWN >>             csRptGetLineResult rslt; //@@@: csRptGetLineResult rslt;
UNKNOWN >>             csRptNewPageResult rsltNewPage; //@@@: csRptNewPageResult rsltNewPage;
            let top = 0; //@@@: float top = 0;
            let topSection = 0; //@@@: float topSection = 0;
            let heightSection = 0; //@@@: float heightSection = 0;
            let secLnIndex = -1; //@@@: int secLnIndex = -1;
            let offsetTop = null; //@@@: float[] offsetTop = null;
            let vdummy = null; //@@@: float[] vdummy = null;

            let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();

            printerSetSizeAndOrient( //@@@: printerSetSizeAndOrient(
                m_report.getLaunchInfo().getPrinter().getDeviceName(), //@@@: m_report.getLaunchInfo().getPrinter().getDeviceName(),
                m_report.getPaperInfo().getPaperSize(), //@@@: m_report.getPaperInfo().getPaperSize(),
                m_report.getPaperInfo().getOrientation()); //@@@: m_report.getPaperInfo().getOrientation());

            m_currPage = -1; //@@@: m_currPage = -1;

            // we create the first page
            //
            rsltNewPage = m_report.newPage(); //@@@: rsltNewPage = m_report.newPage();

            // if it has failed
            //
            if (rsltNewPage === csRptNewPageResult.CSRPTNPERROR) { //@@@: if (rsltNewPage == csRptNewPageResult.CSRPTNPERROR)
                return false; //@@@: return false;
            } //@@@: }

            // if there is no data
            //
            if (rsltNewPage === csRptNewPageResult.CSRPTNPEND) { //@@@: if (rsltNewPage == csRptNewPageResult.CSRPTNPEND)
                return m_report.endPage() !== csRptEndPageResult.CSRPTEPERROR; //@@@: return m_report.endPage() != csRptEndPageResult.CSRPTEPERROR;
            } //@@@: }

            // we are goin to evaluate the detail's first line
            // or group header's first line only if there are not
            // groups
            //
            if (m_report.getGroups().count() === 0) { //@@@: if (m_report.getGroups().count() == 0)
                m_report.evalPreGroupHeader(); //@@@: m_report.evalPreGroupHeader();
                m_report.evalPre(); //@@@: m_report.evalPre();
            } //@@@: }

            // get details dimensions
            //
            detailHeight = getDetailHeight(m_report.getPages().item(m_report.getPages().count()-1), top); //@@@: detailHeight = getDetailHeight(m_report.getPages().item(m_report.getPages().count()-1), ref top);

            // add the height of the images for controls which can grow and are in the header
            //
            getLineHeight(m_report.getPages().item(m_report.getPages().count()-1).getHeader(), vdummy); //@@@: getLineHeight(m_report.getPages().item(m_report.getPages().count()-1).getHeader(), ref vdummy);

            do { //@@@: do
                // get the line
                //
                rslt = m_report.getLine(fields); //@@@: rslt = m_report.getLine(ref fields);

                // if we have finished
                //
                if (rslt === csRptGetLineResult.CSRPTGLEND) { //@@@: if (rslt == csRptGetLineResult.CSRPTGLEND)
                    break; //@@@: break;
                } //@@@: }

                // if the row is virtual we need to call the engine
                // to give it a chance to evalute formulas in the
                // header which are marked to be compiled before printing
                //
                if (rslt === csRptGetLineResult.CSRPTGLVIRTUALH) { //@@@: if (rslt == csRptGetLineResult.CSRPTGLVIRTUALH)

                    m_report.evalPreGroupHeader(); //@@@: m_report.evalPreGroupHeader();

                    // idem for footers
                    //
                } //@@@: }
                else if (rslt === csRptGetLineResult.CSRPTGLVIRTUALF) { //@@@: else if (rslt == csRptGetLineResult.CSRPTGLVIRTUALF)

                    m_report.evalPreGroupFooter(); //@@@: m_report.evalPreGroupFooter();

                    // if the engine responded that we need to create a new page
                    //
                } //@@@: }
                else if (rslt === csRptGetLineResult.CSRPTGLNEWPAGE) { //@@@: else if (rslt == csRptGetLineResult.CSRPTGLNEWPAGE)
                    // get the new page
                    //
                    if (!pNewPage(top, detailHeight)) { //@@@: if (!pNewPage(ref top, ref detailHeight))
                        return false; //@@@: return false;
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    // get the line's height
                    //
                    lineHeight = getLineHeight(fields, offsetTop); //@@@: lineHeight = getLineHeight(fields, ref offsetTop);

                    // if it can fit we create a new page
                    //
                    if (lineHeight > detailHeight) { //@@@: if (lineHeight > detailHeight)

                        // get the new page
                        //
                        if (!pNewPage(top, detailHeight)) { //@@@: if (!pNewPage(ref top, ref detailHeight))
                            return false; //@@@: return false;
                        } //@@@: }
                    } //@@@: }
                    else { //@@@: else
                        heightSection = 0; //@@@: heightSection = 0;
                        topSection = 0; //@@@: topSection = 0;
                        secLnIndex = -1; //@@@: secLnIndex = -1;

                        //---------------------------------------------------------------------------------
                        // this code is here and not in a function because we want to improve the
                        // speed when run the report
                        //
                        // add the line to the page
                        //
                        detail = m_report.getPages().item(m_report.getPages().count()-1).getDetail(); //@@@: detail = m_report.getPages().item(m_report.getPages().count()-1).getDetail();

                        for(var _i = 0; _i < fields.count(); _i++) { //@@@: for (int _i = 0; _i < fields.count(); _i++)
                            field = fields.item(_i); //@@@: field = fields.item(_i);

                            // get the field's top
                            //
                            let w_sectionLine = field.getInfo().getSectionLine(); //@@@: CSReportDll.cReportSectionLine w_sectionLine = field.getInfo().getSectionLine();

                            // one time for section
                            //
                            if (secLnIndex !== w_sectionLine.getIndex()) { //@@@: if (secLnIndex != w_sectionLine.getIndex())
                                secLnIndex = w_sectionLine.getIndex(); //@@@: secLnIndex = w_sectionLine.getIndex();
                                let w_aspect = w_sectionLine.getAspect(); //@@@: CSReportDll.cReportAspect w_aspect = w_sectionLine.getAspect();
                                topSection = topSection + (w_aspect.getTop() - ); //@@@: topSection = topSection + (w_aspect.getTop() - (topSection + heightSection));
                                heightSection = heightSection + w_aspect.getHeight(); //@@@: heightSection = heightSection + w_aspect.getHeight();
                            } //@@@: }

UNKNOWN >>                             field.setTop(top //@@@: field.setTop(top
                                            + offsetTop[secLnIndex] //@@@: + offsetTop[secLnIndex]
                                            + (field.getInfo().getAspect().getTop() //@@@: + (field.getInfo().getAspect().getTop()
                                            - topSection)); //@@@: - topSection));

                            detail.add(field); //@@@: detail.add(field);
                        } //@@@: }
                        //---------------------------------------------------------------------------------

                        // get the detail's height
                        //
                        top = top + lineHeight; //@@@: top = top + lineHeight;
                        detailHeight = detailHeight - lineHeight; //@@@: detailHeight = detailHeight - lineHeight;

                        // notify the engine about the groups' staste
                        //
                        if (rslt === csRptGetLineResult.CSRPTGLGROUPHEADER) { //@@@: if (rslt == csRptGetLineResult.CSRPTGLGROUPHEADER)
                            m_report.markGroupHeaderPrinted(); //@@@: m_report.markGroupHeaderPrinted();

                            // evaluate every function which are mark 
                            // to be printed after printing
                            //
                            m_report.evalPostGroupHeader(); //@@@: m_report.evalPostGroupHeader();

                        } //@@@: }
                        else if (rslt === csRptGetLineResult.CSRPTGLGROUPFOOTER) { //@@@: else if (rslt == csRptGetLineResult.CSRPTGLGROUPFOOTER)
                            m_report.markGroupFooterPrinted(); //@@@: m_report.markGroupFooterPrinted();

                            // evaluate every function which are mark 
                            // to be printed after printing
                            //
                            m_report.evalPostGroupFooter(); //@@@: m_report.evalPostGroupFooter();

                        } //@@@: }
                        else if (rslt === csRptGetLineResult.CSRPTGLDETAIL) { //@@@: else if (rslt == csRptGetLineResult.CSRPTGLDETAIL)
                            m_report.evalPost(); //@@@: m_report.evalPost();
                            m_report.moveToNext(); //@@@: m_report.moveToNext();
                        } //@@@: }
                        if (m_report.getLineType() === csRptGetLineResult.CSRPTGLDETAIL) { //@@@: if (m_report.getLineType() == csRptGetLineResult.CSRPTGLDETAIL)
                            m_report.evalPre(); //@@@: m_report.evalPre();
                        } //@@@: }
                    } //@@@: }
                } //@@@: }
            } while (true); //@@@: } while (true);

            return m_report.endPage() !== csRptEndPageResult.CSRPTEPERROR; //@@@: return m_report.endPage() != csRptEndPageResult.CSRPTEPERROR;
        }; //@@@: }

        const printerSetSizeAndOrient = function(p, csReportPaperType, p_2) { //@@@: private void printerSetSizeAndOrient(string p, csReportPaperType csReportPaperType, int p_2)
            // TODO: implement this
            // throw new NotImplementedException();
        }; //@@@: }

        const pNewPage = function(top, detailHeight) { //@@@: private bool pNewPage(ref float top, ref float detailHeight)
UNKNOWN >>             csRptNewPageResult rsltNewPage; //@@@: csRptNewPageResult rsltNewPage;
UNKNOWN >>             csRptEndPageResult rsltEndPage; //@@@: csRptEndPageResult rsltEndPage;

            rsltEndPage = m_report.endPage(); //@@@: rsltEndPage = m_report.endPage();
            if (rsltEndPage === csRptEndPageResult.CSRPTEPERROR) { //@@@: if (rsltEndPage == csRptEndPageResult.CSRPTEPERROR)
                return false; //@@@: return false;
            } //@@@: }

            rsltNewPage = m_report.newPage(); //@@@: rsltNewPage = m_report.newPage();
            if (rsltNewPage === csRptNewPageResult.CSRPTNPERROR) { //@@@: if (rsltNewPage == csRptNewPageResult.CSRPTNPERROR)
                return false; //@@@: return false;
            } //@@@: }

            // get details' dimentions
            //
            detailHeight = getDetailHeight(m_report.getPages().item(m_report.getPages().count()-1), top); //@@@: detailHeight = getDetailHeight(m_report.getPages().item(m_report.getPages().count()-1), ref top);

            return true; //@@@: return true;
        }; //@@@: }

        // returns details' height of this page
        //
        const getDetailHeight = function(page, top) { //@@@: private float getDetailHeight(CSReportDll.cReportPage page, ref float top)
            top = page.getHeaderBottom(); //@@@: top = page.getHeaderBottom();
            return page.getFooterTop() - top; //@@@: return page.getFooterTop() - top;
        }; //@@@: }

        // returns the bigger control's height and set the height of every control
        //
        const getLineHeight = function(fields, offsetTop) { //@@@: private float getLineHeight(CSReportDll.cReportPageFields fields, ref float[] offsetTop)
            let field = null; //@@@: CSReportDll.cReportPageField field = null;
            let offBottom = 0; //@@@: float offBottom = 0;
            let aspectHeight = 0; //@@@: float aspectHeight = 0;
            let aspectWidth = 0; //@@@: float aspectWidth = 0;

            let aspect = null; //@@@: CSReportDll.cReportAspect aspect = null;
            let aspectLn = null; //@@@: CSReportDll.cReportAspect aspectLn = null;

            // used to get the offset to top
            //
            let lnHeight = 0; //@@@: float lnHeight = 0;

            // used to increase the height of the line
            //
            let lnHeight2 = 0; //@@@: float lnHeight2 = 0;
            let newLnHeight = 0; //@@@: float newLnHeight = 0;

            let font = null; //@@@: Font font = null;

            let topSection = 0; //@@@: float topSection = 0;
            let indexSection = -1; //@@@: int indexSection = -1;
            let heightSection = 0; //@@@: float heightSection = 0;

            offsetTop = new float[1]; //@@@: offsetTop = new float[1];

            if (fields.count() > 0) { //@@@: if (fields.count() > 0)

                // search for the highest control
                //
                for(var _i = 0; _i < fields.count(); _i++) { //@@@: for (int _i = 0; _i < fields.count(); _i++)
                    field = fields.item(_i); //@@@: field = fields.item(_i);

                    // if it can grow we need to get its height to be
                    // able to print it
                    //
                    aspect = field.getInfo().getAspect(); //@@@: aspect = field.getInfo().getAspect();
                    aspectLn = field.getInfo().getSectionLine().getAspect(); //@@@: aspectLn = field.getInfo().getSectionLine().getAspect();

                    // TODO: remove me
                    // System.Console.WriteLine(field.getInfo().getSectionLine().getRealIndex());

                    // if the line has changed we need to get the height of the line
                    // and add it to heightSection
                    //
                    if (indexSection !== field.getInfo().getSectionLine().getIndex()) { //@@@: if (indexSection != field.getInfo().getSectionLine().getIndex())

                        // save a reference to this section
                        //
                        indexSection = field.getInfo().getSectionLine().getIndex(); //@@@: indexSection = field.getInfo().getSectionLine().getIndex();

                        if (indexSection > offsetTop.Length -1) { //@@@: if (indexSection > offsetTop.Length -1)
                            G.redimPreserve(offsetTop, indexSection + 1); //@@@: G.redimPreserve(ref offsetTop, indexSection + 1);
                        } //@@@: }

                        // save this offset to add it to every control holded in the
                        // section lines which are under the current section line
                        //
                        offsetTop[indexSection] = offsetTop[indexSection] + newLnHeight - lnHeight; //@@@: offsetTop[indexSection] = offsetTop[indexSection] + newLnHeight - lnHeight;

                        // we get the top of the current line which includes only
                        // the height of visible lines
                        //
                        topSection = topSection + (aspectLn.getTop() - ); //@@@: topSection = topSection + (aspectLn.getTop() - (topSection + heightSection));

                        // add to heightSection the height of this line
                        //
                        heightSection = heightSection + aspectLn.getHeight(); //@@@: heightSection = heightSection + aspectLn.getHeight();

                        // save the height of the line to know if it has changed for canGrow
                        //
                        lnHeight = aspectLn.getHeight(); //@@@: lnHeight = aspectLn.getHeight();

                        // the height of the original section line
                        //
                        lnHeight2 = lnHeight; //@@@: lnHeight2 = lnHeight;

                        // save the height of the line to analize canGrow
                        //
                        newLnHeight = lnHeight; //@@@: newLnHeight = lnHeight;
                    } //@@@: }

                    // add to every control the offset produced by controls which
                    // can grow
                    //
                    if (aspect.getCanGrow()) { //@@@: if (aspect.getCanGrow())

                        aspectHeight = aspect.getHeight(); //@@@: aspectHeight = aspect.getHeight();
                        aspectWidth = aspect.getWidth(); //@@@: aspectWidth = aspect.getWidth();

                        // if there is an image we need to get its height
                        //
                        if (field.getImage() !== null) { //@@@: if (field.getImage() != null)

                            let imgWidth = 0; //@@@: int imgWidth = 0;
                            let imgHeight = 0; //@@@: int imgHeight = 0;

                            cGlobals.getBitmapSize(field.getImage(), imgWidth, imgHeight, true); //@@@: cGlobals.getBitmapSize(field.getImage(), out imgWidth, out imgHeight, true);

                            field.setHeight(imgHeight); //@@@: field.setHeight(imgHeight);
                            field.setWidth(imgWidth); //@@@: field.setWidth(imgWidth);

                            if (field.getHeight() < aspectHeight) { field.setHeight(aspectHeight); } //@@@: if (field.getHeight() < aspectHeight) { field.setHeight(aspectHeight); }
                            if (field.getWidth() < aspectWidth) { field.setWidth(aspectWidth); } //@@@: if (field.getWidth() < aspectWidth) { field.setWidth(aspectWidth); }
                        } //@@@: }
                        else { //@@@: else
                            if (field.getValue() !== "") { //@@@: if (field.getValue() != "")
                                let flags = 0; //@@@: int flags = 0;

                                // TODO: flags to get height of text to be drawn
                                if (aspect.getWordWrap()) { //@@@: if (aspect.getWordWrap())
                                    flags = 0/*ECGTextAlignFlags.DT_WORDBREAK //@@@: flags = 0/*ECGTextAlignFlags.DT_WORDBREAK
UNKNOWN >>                                             || ECGTextAlignFlags.DT_WORD_ELLIPSIS //@@@: || ECGTextAlignFlags.DT_WORD_ELLIPSIS
UNKNOWN >>                                             || ECGTextAlignFlags.DT_LEFT //@@@: || ECGTextAlignFlags.DT_LEFT
UNKNOWN >>                                             || ECGTextAlignFlags.DT_NOPREFIX //@@@: || ECGTextAlignFlags.DT_NOPREFIX
UNKNOWN >>                                             || ECGTextAlignFlags.DT_EDITCONTROL*/; //@@@: || ECGTextAlignFlags.DT_EDITCONTROL*/;
                                } //@@@: }
                                else { //@@@: else
                                    flags = 0/*ECGTextAlignFlags.DT_SINGLELINE //@@@: flags = 0/*ECGTextAlignFlags.DT_SINGLELINE
UNKNOWN >>                                             || ECGTextAlignFlags.DT_WORD_ELLIPSIS //@@@: || ECGTextAlignFlags.DT_WORD_ELLIPSIS
UNKNOWN >>                                             || ECGTextAlignFlags.DT_LEFT //@@@: || ECGTextAlignFlags.DT_LEFT
UNKNOWN >>                                             || ECGTextAlignFlags.DT_NOPREFIX*/; //@@@: || ECGTextAlignFlags.DT_NOPREFIX*/;
                                } //@@@: }

                                let idx = cGlobals.addFontIfRequired(aspect.getFont(), m_fnt); //@@@: int idx = cGlobals.addFontIfRequired(aspect.getFont(), ref m_fnt);

                                font = m_fnt[idx]; //@@@: font = m_fnt[idx];

                                field.setHeight( //@@@: field.setHeight(
                                    evaluateTextHeight( //@@@: evaluateTextHeight(
                                        field.getValue(),  //@@@: field.getValue(),
                                        font,  //@@@: font,
                                        aspect.getWidth(),  //@@@: aspect.getWidth(),
                                        flags,  //@@@: flags,
                                        m_scaleY,  //@@@: m_scaleY,
                                        m_scaleX)); //@@@: m_scaleX));
                                if (field.getHeight() < aspectHeight) { field.setHeight(aspectHeight); } //@@@: if (field.getHeight() < aspectHeight) { field.setHeight(aspectHeight); }
                            } //@@@: }
                        } //@@@: }

                        // if it doesn't fit in the line because is too high
                        //
                        if (field.getHeight() + aspect.getTop() > topSection + newLnHeight) { //@@@: if (field.getHeight() + aspect.getTop() > topSection + newLnHeight)
                            offBottom =  - (aspect.getTop() + aspectHeight); //@@@: offBottom = (topSection + newLnHeight) - (aspect.getTop() + aspectHeight);

                            // to separete a little
                            //
                            if (offBottom < 0) { offBottom = offBottom + 5; } //@@@: if (offBottom < 0) { offBottom = offBottom + 5; }

                            // new line's height 
                            //
                            newLnHeight = aspect.getTop() - topSection + field.getHeight() + offBottom; //@@@: newLnHeight = aspect.getTop() - topSection + field.getHeight() + offBottom;
                        } //@@@: }

                        // if the height of the previous line has changed because 
                        // some control has set to canGrow = true and its value
                        // makes the control's height to change, we need to add
                        // this height to heightSection
                        //
                        if (newLnHeight > lnHeight2) { //@@@: if (newLnHeight > lnHeight2)
                            //                                substract the original height
                            //                                |         add the hieght for canGrow
                            //                                |             |
                            heightSection = heightSection - lnHeight2 + newLnHeight; //@@@: heightSection = heightSection - lnHeight2 + newLnHeight;
                            lnHeight2 = newLnHeight; //@@@: lnHeight2 = newLnHeight;
                        } //@@@: }
                    } //@@@: }
                    else { //@@@: else
                        field.setHeight(aspect.getHeight()); //@@@: field.setHeight(aspect.getHeight());
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            // return the height of the section
            //
            return heightSection; //@@@: return heightSection;
        }; //@@@: }

        // TODO: check if we should have a bitmap as a member field so it is not created everytime
        //
        const evaluateTextHeight = function(text, font, width, flags, scaleY, scaleX) { //@@@: private float evaluateTextHeight(string text, Font font, float width, int flags, float scaleY, float scaleX)
            let bmp = new Bitmap(1, 1); //@@@: Bitmap bmp = new Bitmap(1, 1);
            let graph = Graphics.FromImage(bmp); //@@@: Graphics graph = Graphics.FromImage(bmp);
            let stringSize = graph.MeasureString(text, font, Convert.ToInt32(width * scaleX)); //@@@: SizeF stringSize = graph.MeasureString(text, font, Convert.ToInt32(width * scaleX));
            graph.Dispose(); //@@@: graph.Dispose();
            bmp.Dispose(); //@@@: bmp.Dispose();
            return stringSize.Height * scaleY; //@@@: return stringSize.Height * scaleY;
        }; //@@@: }

        // if the caller hasn't assigned a preview object
        // we use the internal preview object
        //
        const setPreviewForm = function() { //@@@: private void setPreviewForm()
            if (m_rpwPrint === null) { //@@@: if (m_rpwPrint == null)
                if (m_fPreview === null) { //@@@: if (m_fPreview == null)
                    m_fPreview = new fPreview(); //@@@: m_fPreview = new fPreview();
                } //@@@: }
                m_rpwPrint = m_fPreview.getRpwReport(); //@@@: m_rpwPrint = m_fPreview.getRpwReport();
            } //@@@: }
            else { //@@@: else
                if (m_rpwPrint.Parent !== null) { //@@@: if (m_rpwPrint.Parent != null)
                    if (!(m_rpwPrint.Parent.GetType() === typeof(Form))) { //@@@: if (!(m_rpwPrint.Parent.GetType() == typeof(Form)))
                        m_fPreview = new fPreview(); //@@@: m_fPreview = new fPreview();
                        m_rpwPrint = m_fPreview.getRpwReport(); //@@@: m_rpwPrint = m_fPreview.getRpwReport();
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    m_fPreview = new fPreview(); //@@@: m_fPreview = new fPreview();
                    m_rpwPrint = m_fPreview.getRpwReport(); //@@@: m_rpwPrint = m_fPreview.getRpwReport();
                } //@@@: }
            } //@@@: }

UNKNOWN >>             RectangleF tR; //@@@: RectangleF tR;

            let w_printer = m_report.getLaunchInfo().getPrinter(); //@@@: cPrinter w_printer = m_report.getLaunchInfo().getPrinter();
            tR = cGlobals.getRectFromPaperSize(w_printer.getPaperInfo(), w_printer.getPaperInfo().getPaperSize(), w_printer.getPaperInfo().getOrientation()); //@@@: tR = cGlobals.getRectFromPaperSize(w_printer.getPaperInfo(), w_printer.getPaperInfo().getPaperSize(), w_printer.getPaperInfo().getOrientation());

            m_realWidth = tR.Width; //@@@: m_realWidth = (int)tR.Width;
            m_realHeight = tR.Height; //@@@: m_realHeight = (int)tR.Height;

            m_rpwPrint.getBody().Width = m_realWidth; //@@@: m_rpwPrint.getBody().Width = (int)m_realWidth;
            m_rpwPrint.getBody().Height = m_realHeight; //@@@: m_rpwPrint.getBody().Height = (int)m_realHeight;

            if (!m_bModal) { //@@@: if (!m_bModal)
                if (!m_bHidePreviewWindow) { //@@@: if (!m_bHidePreviewWindow)
                    let obj = m_rpwPrint.getParent(); //@@@: var obj = m_rpwPrint.getParent();
                    if (obj.GetType() === typeof(Form))  { //@@@: if (obj.GetType() == typeof(Form))
                        let f = obj as Form; //@@@: Form f = obj as Form;
                        f.Show(); //@@@: f.Show();
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            m_rpwPrint.getBody().Paint += new PaintEventHandler(rpwPrintBodyPaint); //@@@: m_rpwPrint.getBody().Paint += new PaintEventHandler(rpwPrintBodyPaint);
            m_rpwPrint.FirstPage += new CSReportPreview.FirstPage(rpwPrintMoveFirst); //@@@: m_rpwPrint.FirstPage += new CSReportPreview.FirstPage(rpwPrintMoveFirst);
            m_rpwPrint.PreviousPage += new CSReportPreview.PreviousPage(rpwPrintMovePrevious); //@@@: m_rpwPrint.PreviousPage += new CSReportPreview.PreviousPage(rpwPrintMovePrevious);
            m_rpwPrint.MoveToPage += new CSReportPreview.MoveToPage(rpwPrintMoveToPage); //@@@: m_rpwPrint.MoveToPage += new CSReportPreview.MoveToPage(rpwPrintMoveToPage);
            m_rpwPrint.NextPage += new CSReportPreview.NextPage(rpwPrintMoveNext); //@@@: m_rpwPrint.NextPage += new CSReportPreview.NextPage(rpwPrintMoveNext);
            m_rpwPrint.LastPage += new CSReportPreview.LastPage(rpwPrintMoveLast); //@@@: m_rpwPrint.LastPage += new CSReportPreview.LastPage(rpwPrintMoveLast);
        }; //@@@: }

        const createPaintObjects = function(fields, offset) { //@@@: private void createPaintObjects(CSReportDll.cReportPageFields fields, int offset)
            let field = null; //@@@: CSReportDll.cReportPageField field = null;

            let rptAspect = null; //@@@: CSReportDll.cReportAspect rptAspect = null;
            let rptFont = null; //@@@: CSReportDll.cReportFont rptFont = null;

            let index = 0; //@@@: int index = 0;

            for(var _i = 0; _i < fields.count(); _i++) { //@@@: for (int _i = 0; _i < fields.count(); _i++)
                field = fields.item(_i); //@@@: field = fields.item(_i);
                index = index + 1; //@@@: index = index + 1;

                if (field.getVisible()) { //@@@: if (field.getVisible())

                    rptAspect = field.getInfo().getAspect(); //@@@: rptAspect = field.getInfo().getAspect();

                    let w_add = m_paint.getPaintObjects().add(null, ""); //@@@: cReportPaintObject w_add = m_paint.getPaintObjects().add(null, "");
                    let w_aspect = w_add.getAspect(); //@@@: CSReportDll.cReportAspect w_aspect = w_add.getAspect();
                    if (field.getTop() > 0) { //@@@: if (field.getTop() > 0)
                        w_aspect.setTop(field.getTop()); //@@@: w_aspect.setTop(field.getTop());
                    } //@@@: }
                    else { //@@@: else
                        w_aspect.setTop(rptAspect.getTop()); //@@@: w_aspect.setTop(rptAspect.getTop());
                    } //@@@: }
                    if (field.getHeight() > 0) { //@@@: if (field.getHeight() > 0)
                        w_aspect.setHeight(field.getHeight()); //@@@: w_aspect.setHeight(field.getHeight());
                    } //@@@: }
                    else { //@@@: else
                        w_aspect.setHeight(rptAspect.getHeight()); //@@@: w_aspect.setHeight(rptAspect.getHeight());
                    } //@@@: }
                    if (field.getWidth() > 0) { //@@@: if (field.getWidth() > 0)
                        w_aspect.setWidth(field.getWidth()); //@@@: w_aspect.setWidth(field.getWidth());
                    } //@@@: }
                    else { //@@@: else
                        w_aspect.setWidth(rptAspect.getWidth()); //@@@: w_aspect.setWidth(rptAspect.getWidth());
                    } //@@@: }
                    w_aspect.setLeft(rptAspect.getLeft()); //@@@: w_aspect.setLeft(rptAspect.getLeft());
                    w_aspect.setBackColor(rptAspect.getBackColor()); //@@@: w_aspect.setBackColor(rptAspect.getBackColor());
                    w_aspect.setTransparent(rptAspect.getTransparent()); //@@@: w_aspect.setTransparent(rptAspect.getTransparent());
                    w_aspect.setAlign(rptAspect.getAlign()); //@@@: w_aspect.setAlign(rptAspect.getAlign());
                    w_aspect.setWordWrap(rptAspect.getWordWrap()); //@@@: w_aspect.setWordWrap(rptAspect.getWordWrap());

                    w_aspect.setBorderColor(rptAspect.getBorderColor()); //@@@: w_aspect.setBorderColor(rptAspect.getBorderColor());
                    w_aspect.setBorderColor3d(rptAspect.getBorderColor3d()); //@@@: w_aspect.setBorderColor3d(rptAspect.getBorderColor3d());
                    w_aspect.setBorderColor3dShadow(rptAspect.getBorderColor3dShadow()); //@@@: w_aspect.setBorderColor3dShadow(rptAspect.getBorderColor3dShadow());
                    w_aspect.setBorderRounded(rptAspect.getBorderRounded()); //@@@: w_aspect.setBorderRounded(rptAspect.getBorderRounded());
                    w_aspect.setBorderType(rptAspect.getBorderType()); //@@@: w_aspect.setBorderType(rptAspect.getBorderType());
                    w_aspect.setBorderWidth(rptAspect.getBorderWidth()); //@@@: w_aspect.setBorderWidth(rptAspect.getBorderWidth());

                    rptFont = rptAspect.getFont(); //@@@: rptFont = rptAspect.getFont();
                    let w_font = w_aspect.getFont(); //@@@: CSReportDll.cReportFont w_font = w_aspect.getFont();
                    w_font.setBold(rptFont.getBold()); //@@@: w_font.setBold(rptFont.getBold());
                    w_font.setForeColor(rptFont.getForeColor()); //@@@: w_font.setForeColor(rptFont.getForeColor());
                    w_font.setItalic(rptFont.getItalic()); //@@@: w_font.setItalic(rptFont.getItalic());
                    w_font.setName(rptFont.getName()); //@@@: w_font.setName(rptFont.getName());
                    w_font.setSize(rptFont.getSize() * m_scaleFont); //@@@: w_font.setSize(rptFont.getSize() * m_scaleFont);
                    w_font.setStrike(rptFont.getStrike()); //@@@: w_font.setStrike(rptFont.getStrike());
					w_font.setUnderline(rptFont.getUnderline()); //@@@: w_font.setUnderline(rptFont.getUnderline());

                    w_add.setText(field.getValue()); //@@@: w_add.setText(field.getValue());
                    w_add.setImage(field.getImage()); //@@@: w_add.setImage(field.getImage());

                    if (w_add.getImage() !== null) { //@@@: if (w_add.getImage() != null)
                        w_add.setPaintType(csRptPaintObjType.CSRPTPAINTOBJIMAGE); //@@@: w_add.setPaintType(csRptPaintObjType.CSRPTPAINTOBJIMAGE);
                    } //@@@: }
                    w_add.setIndexField(index + offset); //@@@: w_add.setIndexField(index + offset);
                    if (field.getObjectID() !== null) { //@@@: if (field.getObjectID() != null)
                        w_add.setTag(field.getObjectID().getValue()); //@@@: w_add.setTag(field.getObjectID().getValue());
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        // TODO: see how to implement this functionality
        //
        const m_fPreview_FormUnload = function() { //@@@: private void m_fPreview_FormUnload()
            m_rpwPrint = null; //@@@: m_rpwPrint = null;
            m_report.getLaunchInfo().getObjPaint().setReport(null); //@@@: m_report.getLaunchInfo().getObjPaint().setReport(null);
            m_report.getLaunchInfo().setObjPaint(null); //@@@: m_report.getLaunchInfo().setObjPaint(null);
        }; //@@@: }

        //------------------------------------------------------------------
        // preview events
        //
        const m_rpwPrint_BodyDblClick = function() { //@@@: private void m_rpwPrint_BodyDblClick()
            /* //@@@: /*
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
        }; //@@@: }

        const pGetFieldFromIndexAux = function(fields, index, rtn) { //@@@: private bool pGetFieldFromIndexAux(CSReportDll.cReportPageFields fields, int index, ref CSReportDll.cReportPageField rtn)
            try { //@@@: try
                rtn = fields.item(index); //@@@: rtn = fields.item(index);
                return true; //@@@: return true;
            } //@@@: }
            catch(ex) { //@@@: catch
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }


        const m_rpwPrint_BodyMouseDown = function(button, shift, x, y) { //@@@: private void m_rpwPrint_BodyMouseDown(int button, int shift, float x, float y)
            /* //@@@: /*
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
        }; //@@@: }

        const m_rpwPrint_BodyMouseMove = function(button, shift, x, y) { //@@@: private void m_rpwPrint_BodyMouseMove(int button, int shift, float x, float y)
            /* //@@@: /*
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
        }; //@@@: }

        const rpwPrintBodyPaint = function(sender, e) { //@@@: private void rpwPrintBodyPaint(object sender, PaintEventArgs e)
            if (m_paint !== null) { //@@@: if (m_paint != null)
                drawPage(e.Graphics, false); //@@@: drawPage(e.Graphics, false);
            } //@@@: }
        }; //@@@: }

        const m_rpwPrint_ChangeZoom = function(zoom) { //@@@: private void m_rpwPrint_ChangeZoom(int zoom)
            let nZoom = 0; //@@@: float nZoom = 0;
            let width = 0; //@@@: float width = 0;
            let height = 0; //@@@: float height = 0;

            switch (zoom) //@@@: switch (zoom)
            { //@@@: {
                case csEZoom.csEZoomAllPage: //@@@: case (int)csEZoom.csEZoomAllPage:

                    width = m_rpwPrint.Width / m_realWidth; //@@@: width = m_rpwPrint.Width / m_realWidth;
                    height = m_rpwPrint.Height / m_realHeight; //@@@: height = m_rpwPrint.Height / m_realHeight;

                    if (width < height) { //@@@: if (width < height)
                        nZoom = m_rpwPrint.Width / m_realWidth; //@@@: nZoom = m_rpwPrint.Width / m_realWidth;
                    } //@@@: }
                    else { //@@@: else
                        nZoom = m_rpwPrint.Height / m_realHeight; //@@@: nZoom = m_rpwPrint.Height / m_realHeight;
                    } //@@@: }

                    break; //@@@: break;
                case csEZoom.csEZoomCustom: //@@@: case (int)csEZoom.csEZoomCustom:
                    nZoom = 1; //@@@: nZoom = 1;
                    break; //@@@: break;
                case csEZoom.csEZoomWidth: //@@@: case (int)csEZoom.csEZoomWidth:
                    nZoom = m_rpwPrint.Width / m_realWidth; //@@@: nZoom = m_rpwPrint.Width / m_realWidth;
                    break; //@@@: break;
                default: //@@@: default:
                    nZoom = zoom / 100; //@@@: nZoom = zoom / 100;
                    break; //@@@: break;
            } //@@@: }

            if (nZoom < 0.01) { nZoom = 0.01f; } //@@@: if (nZoom < 0.01) { nZoom = 0.01f; }

            let pic = m_rpwPrint.getBody(); //@@@: PictureBox pic = m_rpwPrint.getBody();
            pic.Width = (m_realWidth * nZoom); //@@@: pic.Width = (int)(m_realWidth * nZoom);
            pic.Height = (m_realHeight * nZoom); //@@@: pic.Height = (int)(m_realHeight * nZoom);

            if (nZoom > 0.5) { //@@@: if (nZoom > 0.5)
                m_paint.setZoom(100); //@@@: m_paint.setZoom(100);
                m_paint.setScaleX(nZoom); //@@@: m_paint.setScaleX(nZoom);
                m_paint.setScaleY(nZoom); //@@@: m_paint.setScaleY(nZoom);
                m_scaleFont = nZoom; //@@@: m_scaleFont = nZoom;
                printPage(m_currPage); //@@@: printPage(m_currPage);
            } //@@@: }
            else { //@@@: else
                m_paint.setZoom(zoom); //@@@: m_paint.setZoom(zoom);
                m_rpwPrint.getBody().Refresh(); //@@@: m_rpwPrint.getBody().Refresh();
            } //@@@: }
        }; //@@@: }

        const m_rpwPrint_DoPrint = function() { //@@@: private void m_rpwPrint_DoPrint()
            cIReportPrint_PrintReport(); //@@@: cIReportPrint_PrintReport();
        }; //@@@: }

        /*TODO: we need to decide if it is useful //@@@: /*TODO: we need to decide if it is useful
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
        const m_rpwPrint_ExportPDF = function() { //@@@: private void m_rpwPrint_ExportPDF()
            exportPDF(); //@@@: exportPDF();
        }; //@@@: }

        // Files is a list of file names separated by |
        //
        self.sendMail = function(files, emailAddress) { //@@@: public object sendMail(String files, String emailAddress)
            let expPDF = null; //@@@: cReportPdf expPDF = null;
            expPDF = new cReportPdf(); //@@@: expPDF = new cReportPdf();

            expPDF.setExportEmailAddress(emailAddress); //@@@: expPDF.setExportEmailAddress(emailAddress);
            return expPDF.sendMail(files); //@@@: return expPDF.sendMail(files);
        }; //@@@: }

        self.exportPDFEx = function(outputFile, bShowPDFWindow) { //@@@: public bool exportPDFEx(ref String outputFile, bool bShowPDFWindow)
            return pExportPDF(outputFile, bShowPDFWindow); //@@@: return pExportPDF(ref outputFile, bShowPDFWindow);
        }; //@@@: }

        self.exportPDF = function() { //@@@: public bool exportPDF()
            let dummy = ""; //@@@: string dummy = "";
            return pExportPDF(dummy, true); //@@@: return pExportPDF(ref dummy, true);
        }; //@@@: }

        const pGetExportFileName = function() { //@@@: private String pGetExportFileName()
            if (m_exportFileName !== "") { //@@@: if (m_exportFileName != "")
                return m_exportFileName; //@@@: return m_exportFileName;
            } //@@@: }
            else { //@@@: else
                return m_report.getName(); //@@@: return m_report.getName();
            } //@@@: }
        }; //@@@: }

        const pExportPDF = function(outputFile, bShowPDFWindow) { //@@@: private bool pExportPDF(ref String outputFile, bool bShowPDFWindow)
            try { //@@@: try
                let mouse = new cMouseWait(); //@@@: cMouseWait mouse = new cMouseWait();

                let expPDF = null; //@@@: CSReportExport.cReportPdf expPDF = null;
                expPDF = new CSReportExport.cReportPdf(); //@@@: expPDF = new CSReportExport.cReportPdf();

                expPDF.setFileName(cUtil.getValidPath(System.Environment.GetEnvironmentVariable("TEMP")) + pGetExportFileName()); //@@@: expPDF.setFileName(cUtil.getValidPath(System.Environment.GetEnvironmentVariable("TEMP")) + pGetExportFileName());
                expPDF.setExportEmailAddress(m_report.getExportEmailAddress()); //@@@: expPDF.setExportEmailAddress(m_report.getExportEmailAddress());

                return expPDF.exportEx(m_report, this, outputFile, bShowPDFWindow); //@@@: return expPDF.exportEx(m_report, this, outputFile, bShowPDFWindow);

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "pExportPDF", C_MODULE, ""); //@@@: cError.mngError(ex, "pExportPDF", C_MODULE, "");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        /* We need to decide if it is useful //@@@: /* We need to decide if it is useful
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
        const rpwPrintMoveFirst = function(sender, e) { //@@@: private void rpwPrintMoveFirst(object sender, EventArgs e)
            printPage(csEMoveTo.C_FIRSTPAGE); //@@@: printPage((int)csEMoveTo.C_FIRSTPAGE);
        }; //@@@: }

        const rpwPrintMoveLast = function(sender, e) { //@@@: private void rpwPrintMoveLast(object sender, EventArgs e)
            printPage(csEMoveTo.C_LASTPAGE); //@@@: printPage((int)csEMoveTo.C_LASTPAGE);
        }; //@@@: }

        const rpwPrintMoveNext = function(sender, e) { //@@@: private void rpwPrintMoveNext(object sender, EventArgs e)
            printPage(csEMoveTo.C_NEXTPAGE); //@@@: printPage((int)csEMoveTo.C_NEXTPAGE);
        }; //@@@: }

        const rpwPrintMovePrevious = function(sender, e) { //@@@: private void rpwPrintMovePrevious(object sender, EventArgs e)
            printPage(csEMoveTo.C_PREVIOUSPAGE); //@@@: printPage((int)csEMoveTo.C_PREVIOUSPAGE);
        }; //@@@: }

        const rpwPrintMoveToPage = function(sender, e) { //@@@: private void rpwPrintMoveToPage(object sender, PageEventArgs e)
            printPage(e.page); //@@@: printPage(e.page);
        }; //@@@: }

        const m_rpwPrint_SaveDocument = function() { //@@@: private void m_rpwPrint_SaveDocument()
            //If Not m_Report.SaveData(m_rpwPrint.cmFileSaveDialog) Then Exit Sub
        }; //@@@: }

        const drawPage = function(graph, isPrinter) { //@@@: private bool drawPage(Graphics graph, bool isPrinter)
            let i = 0; //@@@: int i = 0;

            if (m_rePaintObject) { //@@@: if (m_rePaintObject)
                if (isPrinter) { //@@@: if (isPrinter)
                    m_paint.createBackgroundBitmap(graph); //@@@: m_paint.createBackgroundBitmap(graph);

                    for (i = 0; i < m_paint.getPaintObjects().count(); i++) { //@@@: for (i = 0; i < m_paint.getPaintObjects().count(); i++)
                        if (!m_paint.drawObject(m_paint.getPaintObjects().getNextKeyForZOrder(i), graph)) { return false; } //@@@: if (!m_paint.drawObject(m_paint.getPaintObjects().getNextKeyForZOrder(i), graph)) { return false; }
                    } //@@@: }

                    for (i = 0; i < m_paint.getPaintSections().count(); i++) { //@@@: for (i = 0; i < m_paint.getPaintSections().count(); i++)
                        if (!m_paint.drawSection(m_paint.getPaintSections().getNextKeyForZOrder(i), graph)) { return false; } //@@@: if (!m_paint.drawSection(m_paint.getPaintSections().getNextKeyForZOrder(i), graph)) { return false; }
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    m_paint.clearPage(m_rpwPrint.getBody().CreateGraphics()); //@@@: m_paint.clearPage(m_rpwPrint.getBody().CreateGraphics());

                    m_rePaintObject = false; //@@@: m_rePaintObject = false;

                    m_paint.paintPicture(graph, false); //@@@: m_paint.paintPicture(graph, false);
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                m_paint.paintPicture(graph, false); //@@@: m_paint.paintPicture(graph, false);
            } //@@@: }
            return true; //@@@: return true;
        }; //@@@: }

        const pDestroyFonts = function() { //@@@: private void pDestroyFonts()
            /* //@@@: /*
            int iFnt = 0;
            for (iFnt = 1; iFnt <= m_iFontCount; iFnt++)
            {
                DeleteObject(m_hFnt[iFnt]);
            }
            G.redim(m_fnt, 0);
            G.redim(m_hFnt, 0);
             */
        }; //@@@: }

        self.Dispose = function() { //@@@: public void Dispose()
            m_report = null; //@@@: m_report = null;
            m_paint = null; //@@@: m_paint = null;
            if (m_fPreview !== null) { //@@@: if (m_fPreview != null)
                m_fPreview.Dispose(); //@@@: m_fPreview.Dispose();
            } //@@@: }
            m_rpwPrint = null; //@@@: m_rpwPrint = null;
        }; //@@@: }

        self.printReport = function() { //@@@: public bool printReport()
            return pDoPrint(null); //@@@: return pDoPrint(null);
        }; //@@@: }

        self.getPageImageAsBase64 = function(page, pageIndex) { //@@@: public string getPageImageAsBase64(int page, out int pageIndex)
            if (m_paint !== null) { //@@@: if (m_paint != null)
                if(m_currPage !== page -1) printPage(page, true); { //@@@: if(m_currPage != page -1) printPage(page, true);
				pageIndex = m_currPage + 1; //@@@: pageIndex = m_currPage + 1;

                let bmp = new Bitmap(m_realWidth, (int)m_realHeight); //@@@: Bitmap bmp = new Bitmap((int)m_realWidth, (int)m_realHeight);
                let bmpGraphics = Graphics.FromImage(bmp); //@@@: Graphics bmpGraphics = Graphics.FromImage(bmp);
                drawPage(bmpGraphics, false); //@@@: drawPage(bmpGraphics, false);
                let memoryStream = new MemoryStream(); //@@@: MemoryStream memoryStream = new MemoryStream();
                m_paint.getBitmap().Save(memoryStream, ImageFormat.Png); //@@@: m_paint.getBitmap().Save(memoryStream, ImageFormat.Png);
                let pngData = memoryStream.ToArray(); //@@@: var pngData = memoryStream.ToArray();
                let image = Convert.ToBase64String(pngData); //@@@: var image = Convert.ToBase64String(pngData);
                return "data:image/png;base64," + image; //@@@: return "data:image/png;base64," + image;
            } //@@@: }
            else { //@@@: else
				pageIndex = -1; //@@@: pageIndex = -1;
                return ""; //@@@: return "";
            }             //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
