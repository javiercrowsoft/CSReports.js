(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {

    globalObject.CSReportPaint.createCReportPaint = function() {

        const self = {}; //@@@: public class cReportPaint

        const C_MODULE = "cReportPaint"; //@@@: private const String C_MODULE = "cReportPaint";

        const C_GRID_AREA_WIDTH = 200; //@@@: private const float C_GRID_AREA_WIDTH = 200;
        const C_GRID_AREA_HEIGHT = 67; //@@@: private const float C_GRID_AREA_HEIGHT = 67;

        const C_KEY_PAINT_OBJ = "P"; //@@@: private const String C_KEY_PAINT_OBJ = "P";
        const C_KEY_PAINT_SEC = "S"; //@@@: private const String C_KEY_PAINT_SEC = "S";

        let m_paintObjects = new cReportPaintObjects(); //@@@: private cReportPaintObjects m_paintObjects = new cReportPaintObjects();
        let m_paintSections = new cReportPaintObjects(); //@@@: private cReportPaintObjects m_paintSections = new cReportPaintObjects();
        let m_paintGridAreas = new cReportPaintObjects(); //@@@: private cReportPaintObjects m_paintGridAreas = new cReportPaintObjects();

        let m_nextKey = 0; //@@@: private int m_nextKey = 0;
        let m_brushGrid = null; //@@@: private HatchBrush m_brushGrid;

        let m_x1 = 0; //@@@: private float m_x1 = 0;
        let m_y1 = 0; //@@@: private float m_y1 = 0;
        let m_y2 = 0; //@@@: private float m_y2 = 0;
        let m_x2 = 0; //@@@: private float m_x2 = 0;

        let m_x1Ex = 0; //@@@: private float m_x1Ex = 0;
        let m_y1Ex = 0; //@@@: private float m_y1Ex = 0;
        let m_y2Ex = 0; //@@@: private float m_y2Ex = 0;
        let m_x2Ex = 0; //@@@: private float m_x2Ex = 0;

        let m_beginMoveDone = null; //@@@: private bool m_beginMoveDone;

        let m_keyFocus = ""; //@@@: private String m_keyFocus = "";
        let m_vGridObjs = null; //@@@: private String[,] m_vGridObjs = null;
        let m_notBorder = null; //@@@: private bool m_notBorder;

        let m_fnt = null; //@@@: private Font[] m_fnt;

        let m_gridHeight = 0; //@@@: private float m_gridHeight = 0;

        let m_vSelectedKeys = null; //@@@: private String[] m_vSelectedKeys = null;

        let m_zoom = 0; //@@@: private int m_zoom = 0;

        let m_scaleX = 0; //@@@: private float m_scaleX = 0;
        let m_scaleY = 0; //@@@: private float m_scaleY = 0;

        let m_bitmap = null; //@@@: private Bitmap m_bitmap;

        const cReportPaint = function() { //@@@: public cReportPaint()
            try  { //@@@: try
                m_scaleX = 1; //@@@: m_scaleX = 1;
                m_scaleY = 1; //@@@: m_scaleY = 1;

                G.redim(m_vGridObjs, 0, 0); //@@@: G.redim(ref m_vGridObjs, 0, 0);
                cGlobals.redim(m_fnt, 0); //@@@: cGlobals.redim(ref m_fnt, 0);
                G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);

                m_zoom = 100; //@@@: m_zoom = 100;
            }  //@@@: }
            catch (ex) { //@@@: catch (Exception ex) {
                self."constructor", C_MODULE, "") = null; //@@@: cError.mngError(ex, "constructor", C_MODULE, "");
            } //@@@: }
        }; //@@@: }

        self.setGridHeight = function(rhs) { //@@@: public void setGridHeight(float rhs)
            m_gridHeight = rhs; //@@@: m_gridHeight = rhs;
        }; //@@@: }

        self.getPaintSections = function() { //@@@: public cReportPaintObjects getPaintSections()
            return m_paintSections; //@@@: return m_paintSections;
        }; //@@@: }

        self.getPaintObjects = function() { //@@@: public cReportPaintObjects getPaintObjects()
            return m_paintObjects; //@@@: return m_paintObjects;
        }; //@@@: }


        self.getNotBorder = function() { //@@@: internal bool getNotBorder()
            return m_notBorder; //@@@: return m_notBorder;
        }; //@@@: }

        self.setNotBorder = function(rhs) { //@@@: internal void setNotBorder(bool rhs)
            m_notBorder = rhs; //@@@: m_notBorder = rhs;
        }; //@@@: }

        self.getZoom = function() { //@@@: internal int getZoom()
            return m_zoom; //@@@: return m_zoom;
        }; //@@@: }

        self.setZoom = function(rhs) { //@@@: internal void setZoom(int rhs)
            m_zoom = rhs; //@@@: m_zoom = rhs;
        }; //@@@: }

        self.setScaleY = function(rhs) { //@@@: internal void setScaleY(float rhs)
            m_scaleY = rhs; //@@@: m_scaleY = rhs;
        }; //@@@: }

        self.setScaleX = function(rhs) { //@@@: internal void setScaleX(float rhs)
            m_scaleX = rhs; //@@@: m_scaleX = rhs;
        }; //@@@: }

        self.getScaleY = function() { //@@@: internal float getScaleY()
            return m_scaleY; //@@@: return m_scaleY;
        }; //@@@: }

        self.getScaleX = function() { //@@@: internal float getScaleX()
            return m_scaleX; //@@@: return m_scaleX;
        }; //@@@: }

        /* //@@@: /*
         * TODO: delete
         * 
        public int copyBitmap(int hDCSource, int width, int height, int hCurrentBmp) {
            int hDCDest = 0;
            int hBmpOld = 0;
            int hBmp = 0;

            width = width / Screen.TwipsPerPixelX;
            height = height / Screen.TwipsPerPixelY;

            hDCDest = CreateCompatibleDC(hDCSource);
            hBmp = CreateCompatibleBitmap(hDCSource, width, height);
            hBmpOld = SelectObject(hDCDest, hBmp);

            BitBlt(hDCDest, 0, 0, width, height, hDCSource, 0, 0, vbSrcCopy);

            SelectObject(hDCDest, hBmpOld);
            DeleteObject(hDCDest);

            if (VBA.ex.LastDllError !== 0) {
                VBA.ex.Raise(vbObjectError, C_MODULE, "Error al copiar el bitmap. Numero: "+ VBA.ex.LastDllError);
            }

            if (hCurrentBmp !== 0) {
                DeleteObject(hCurrentBmp);
            }

            return hBmp;
        }
        */
        self.getPaintObject = function(sKey) { //@@@: public cReportPaintObject getPaintObject(String sKey)
            if (cUtil.subString(sKey, 0, C_KEY_PAINT_OBJ.Length) === C_KEY_PAINT_OBJ) { //@@@: if (cUtil.subString(sKey, 0, C_KEY_PAINT_OBJ.Length) == C_KEY_PAINT_OBJ)
                return m_paintObjects.item(sKey); //@@@: return m_paintObjects.item(sKey);
            } //@@@: }
            else { //@@@: else
                return m_paintSections.item(sKey); //@@@: return m_paintSections.item(sKey);
            } //@@@: }
        }; //@@@: }

        self.getPaintObjectForTag = function(tag) { //@@@: public cReportPaintObject getPaintObjectForTag(String tag)
            for(var i = 0; i < m_paintObjects.count(); i++) { //@@@: for (int i = 0; i < m_paintObjects.count(); i++)
                let paintObj = m_paintObjects.item(i); //@@@: cReportPaintObject paintObj = m_paintObjects.item(i);
                if (paintObj.getTag() === tag) { //@@@: if (paintObj.getTag() == tag)
                    return paintObj; //@@@: return paintObj;
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        self.getPaintSectionForTag = function(tag) { //@@@: public cReportPaintObject getPaintSectionForTag(String tag)
            for(var i = 0; i < m_paintSections.count(); i++) { //@@@: for (int i = 0; i < m_paintSections.count(); i++)
                let paintObj = m_paintSections.item(i); //@@@: cReportPaintObject paintObj = m_paintSections.item(i);
                if (paintObj.getTag() === tag) { //@@@: if (paintObj.getTag() == tag)
                    return paintObj; //@@@: return paintObj;
                } //@@@: }
            } //@@@: }
            return null; //@@@: return null;
        }; //@@@: }

        self.getNewObject = function(paintTypeObject) { //@@@: public cReportPaintObject getNewObject(csRptPaintObjType paintTypeObject)
            let key = ""; //@@@: String key = "";
            key = getKeyPaintObj(); //@@@: key = getKeyPaintObj();
            let paintObj = null; //@@@: cReportPaintObject paintObj = null;
            paintObj = m_paintObjects.add(paintObj, key); //@@@: paintObj = m_paintObjects.add(paintObj, key);
            paintObj.setKey(key); //@@@: paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject); //@@@: paintObj.setPaintType(paintTypeObject);
            return paintObj; //@@@: return paintObj;
        }; //@@@: }

        self.getNewSection = function(paintTypeObject) { //@@@: public cReportPaintObject getNewSection(csRptPaintObjType paintTypeObject)
            let key = ""; //@@@: String key = "";
            key = getKeyPaintSec(); //@@@: key = getKeyPaintSec();
            let paintObj = null; //@@@: cReportPaintObject paintObj = null;
            paintObj = m_paintSections.add(paintObj, key); //@@@: paintObj = m_paintSections.add(paintObj, key);
            paintObj.setKey(key); //@@@: paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject); //@@@: paintObj.setPaintType(paintTypeObject);
            return paintObj; //@@@: return paintObj;
        }; //@@@: }

        self.paintObjIsSection = function(sKey) { //@@@: public bool paintObjIsSection(String sKey)
            return sKey.Substring(0, C_KEY_PAINT_SEC.Length) === C_KEY_PAINT_SEC; //@@@: return sKey.Substring(0, C_KEY_PAINT_SEC.Length) == C_KEY_PAINT_SEC;
        }; //@@@: }

		self.pointIsInObject = function(x, y, sKey) { //@@@: public bool pointIsInObject(float x, float y, ref String sKey)
			let regionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY; //@@@: csRptPaintRegionType regionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;
			return pointIsInObject(x, y, sKey, regionType); //@@@: return pointIsInObject(x, y, ref sKey, ref regionType);
		}; //@@@: }

		self.pointIsInObject = function(x, y, sKey, regionType) { //@@@: public bool pointIsInObject(float x, float y, ref String sKey, ref csRptPaintRegionType regionType)
            if (pointIsInObjectAux(m_paintSections, x, y, sKey, regionType)) { //@@@: if (pointIsInObjectAux(m_paintSections, x, y, ref sKey, ref regionType))
                return true; //@@@: return true;
            } //@@@: }
            if (pointIsInObjectAux(m_paintObjects, x, y, sKey, regionType)) { //@@@: if (pointIsInObjectAux(m_paintObjects, x, y, ref sKey, ref regionType))
                return true; //@@@: return true;
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        self.pointIsInThisObject = function(x, y, sKey, regionType) { //@@@: public bool pointIsInThisObject(float x, float y, ref String sKey, ref csRptPaintRegionType regionType)
            if (pointIsInThisObjectAux(m_paintObjects.item(sKey), x, y, sKey, regionType)) { //@@@: if (pointIsInThisObjectAux(m_paintObjects.item(sKey), x, y, ref sKey, ref regionType))
                return true; //@@@: return true;
            } //@@@: }
            if (pointIsInThisObjectAux(m_paintObjects.item(sKey), x, y, sKey, regionType)) { //@@@: if (pointIsInThisObjectAux(m_paintObjects.item(sKey), x, y, ref sKey, ref regionType))
                return true; //@@@: return true;
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pointIsInObjectAux = function( //@@@: private bool pointIsInObjectAux(
            paintObjs,  //@@@: cReportPaintObjects paintObjs,
            x,  //@@@: float x,
            y,  //@@@: float y,
            sKey,  //@@@: ref String sKey,
            regionType) { //@@@: ref csRptPaintRegionType regionType)
            for(var i = paintObjs.count()-1; i > -1; i--) { //@@@: for (int i = paintObjs.count()-1; i > -1; i--)
                if (pointIsInThisObjectAux(paintObjs.getNextPaintObjForZOrder(i), x, y, sKey, regionType)) { //@@@: if (pointIsInThisObjectAux(paintObjs.getNextPaintObjForZOrder(i), x, y, ref sKey, ref regionType))
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const pointIsInThisObjectAux = function( //@@@: private bool pointIsInThisObjectAux(
            paintObj,  //@@@: cReportPaintObject paintObj,
            x,  //@@@: float x,
            y,  //@@@: float y,
            sKey,  //@@@: ref String sKey,
            regionType) { //@@@: ref csRptPaintRegionType regionType)
        { /* ByRef PaintObj As cReportPaintObject,  //@@@: { /* ByRef PaintObj As cReportPaintObject,
           * ByVal x As Single,  //@@@: * ByVal x As Single,
           * ByVal y As Single,  //@@@: * ByVal y As Single,
           * ByRef sKey As String,  //@@@: * ByRef sKey As String,
           * Optional ByRef RegionType As csRptPaintRegionType */ //@@@: * Optional ByRef RegionType As csRptPaintRegionType */

            self.int C_WIDTH_REGION = 3; //@@@: const int C_WIDTH_REGION = 3;

            let yY = 0; //@@@: float yY = 0;
            let xX = 0; //@@@: float xX = 0;

            let top = 0; //@@@: float top = 0;
            let height = 0; //@@@: float height = 0;
            let width = 0; //@@@: float width = 0;
            let left = 0; //@@@: float left = 0;

            if (paintObj === null) { //@@@: if (paintObj == null)
                return false; //@@@: return false;
            } //@@@: }
            else { //@@@: else
                let w_aspect = paintObj.getAspect(); //@@@: cReportAspect w_aspect = paintObj.getAspect();
                left = w_aspect.getLeft(); //@@@: left = w_aspect.getLeft();
                width = w_aspect.getWidth(); //@@@: width = w_aspect.getWidth();
                top = w_aspect.getTop() - w_aspect.getOffset(); //@@@: top = w_aspect.getTop() - w_aspect.getOffset();
                height = w_aspect.getHeight(); //@@@: height = w_aspect.getHeight();

                if (pointIsInRegion(left - C_WIDTH_REGION, //@@@: if (pointIsInRegion(left - C_WIDTH_REGION,
                                    top - C_WIDTH_REGION, //@@@: top - C_WIDTH_REGION,
                                    left + width + C_WIDTH_REGION, //@@@: left + width + C_WIDTH_REGION,
                                    top + height + C_WIDTH_REGION, //@@@: top + height + C_WIDTH_REGION,
                                    x, y)) { //@@@: x, y))
                    sKey = paintObj.getKey(); //@@@: sKey = paintObj.getKey();

                    yY = top + height / 2; //@@@: yY = top + height / 2;
                    yY = yY - C_WIDTH_REGION; //@@@: yY = yY - C_WIDTH_REGION;

                    xX = left + width / 2; //@@@: xX = left + width / 2;
                    xX = xX - C_WIDTH_REGION; //@@@: xX = xX - C_WIDTH_REGION;

                    // we need to know in which region it is
                    //

                    // body
                    //
                    if (pointIsInRegion(left + C_WIDTH_REGION, //@@@: if (pointIsInRegion(left + C_WIDTH_REGION,
                                        top + C_WIDTH_REGION, //@@@: top + C_WIDTH_REGION,
                                        left + width - C_WIDTH_REGION, //@@@: left + width - C_WIDTH_REGION,
                                        top + height - C_WIDTH_REGION, //@@@: top + height - C_WIDTH_REGION,
                                        x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;
                    } //@@@: }
                    // Left
                    else if (pointIsInRegion(left - C_WIDTH_REGION * 2, //@@@: else if (pointIsInRegion(left - C_WIDTH_REGION * 2,
                                                yY, //@@@: yY,
                                                left + C_WIDTH_REGION * 2, //@@@: left + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2, //@@@: yY + C_WIDTH_REGION * 2,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFT; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFT;
                    } //@@@: }
                    // Rigth
                    else if (pointIsInRegion(left + width - C_WIDTH_REGION * 2, //@@@: else if (pointIsInRegion(left + width - C_WIDTH_REGION * 2,
                                                yY, //@@@: yY,
                                                left + width + C_WIDTH_REGION * 2, //@@@: left + width + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2, //@@@: yY + C_WIDTH_REGION * 2,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHT; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHT;
                    } //@@@: }
                    // Up
                    else if (pointIsInRegion(xX, //@@@: else if (pointIsInRegion(xX,
                                                top - C_WIDTH_REGION * 2, //@@@: top - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2, //@@@: xX + C_WIDTH_REGION * 2,
                                                top + C_WIDTH_REGION * 2, //@@@: top + C_WIDTH_REGION * 2,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEUP; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPEUP;
                    } //@@@: }
                    // Down
                    else if (pointIsInRegion(xX, //@@@: else if (pointIsInRegion(xX,
                                                top + height - C_WIDTH_REGION * 2, //@@@: top + height - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2, //@@@: xX + C_WIDTH_REGION * 2,
                                                top + height + C_WIDTH_REGION * 2, //@@@: top + height + C_WIDTH_REGION * 2,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEDOWN; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPEDOWN;
                    } //@@@: }
                    // LeftUp
                    else if (pointIsInRegion(left - C_WIDTH_REGION, //@@@: else if (pointIsInRegion(left - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION, //@@@: top - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION, //@@@: left + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION, //@@@: top + C_WIDTH_REGION,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP;
                    } //@@@: }
                    // LeftDown
                    else if (pointIsInRegion(left - C_WIDTH_REGION, //@@@: else if (pointIsInRegion(left - C_WIDTH_REGION,
                                                top + height - C_WIDTH_REGION, //@@@: top + height - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION, //@@@: left + C_WIDTH_REGION,
                                                top + height + C_WIDTH_REGION, //@@@: top + height + C_WIDTH_REGION,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN;
                    } //@@@: }
                    // RigthUp
                    else if (pointIsInRegion(left + width - C_WIDTH_REGION, //@@@: else if (pointIsInRegion(left + width - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION, //@@@: top - C_WIDTH_REGION,
                                                left + width + C_WIDTH_REGION, //@@@: left + width + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION, //@@@: top + C_WIDTH_REGION,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP;
                    } //@@@: }
                    // RitgthDown
                    else if (pointIsInRegion(left + width - C_WIDTH_REGION, //@@@: else if (pointIsInRegion(left + width - C_WIDTH_REGION,
                                                top + height - C_WIDTH_REGION, //@@@: top + height - C_WIDTH_REGION,
                                                left + width + C_WIDTH_REGION, //@@@: left + width + C_WIDTH_REGION,
                                                top + height + C_WIDTH_REGION, //@@@: top + height + C_WIDTH_REGION,
                                                x, y)) { //@@@: x, y))
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN; //@@@: regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN;
                    } //@@@: }

                    return true; //@@@: return true;
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        const getKeyPaintObj = function() { //@@@: private String getKeyPaintObj()
            m_nextKey = m_nextKey + 1; //@@@: m_nextKey = m_nextKey + 1;
            return C_KEY_PAINT_OBJ + m_nextKey; //@@@: return C_KEY_PAINT_OBJ + m_nextKey;
        }; //@@@: }

        const getKeyPaintSec = function() { //@@@: private String getKeyPaintSec()
            m_nextKey = m_nextKey + 1; //@@@: m_nextKey = m_nextKey + 1;
            return C_KEY_PAINT_SEC + m_nextKey; //@@@: return C_KEY_PAINT_SEC + m_nextKey;
        }; //@@@: }

        const getKey = function() { //@@@: private String getKey()
            m_nextKey = m_nextKey + 1; //@@@: m_nextKey = m_nextKey + 1;
            return "K" + m_nextKey; //@@@: return "K" + m_nextKey;
        }; //@@@: }

        const pointIsInRegion = function(x1, y1, x2, y2, x, y) { //@@@: private bool pointIsInRegion(float x1, float y1, float x2, float y2, float x, float y)
            return x >= x1 && x <= x2 && y >= y1 && y <= y2; //@@@: return x >= x1 && x <= x2 && y >= y1 && y <= y2;
        }; //@@@: }

        // we have four points for every region. we need to know if at least one point
        // of region A is in region B or viceversa
        //
        const regionIsInRegion = function( //@@@: private bool regionIsInRegion(
            x1,  //@@@: float x1,
            y1,  //@@@: float y1,
            x2,  //@@@: float x2,
            y2,  //@@@: float y2,
            z1,  //@@@: float z1,
            w1,  //@@@: float w1,
            z2,  //@@@: float z2,
            w2) { //@@@: float w2)
            // first B in A
            //
            if (x1 <= z1 && x2 >= z1 && w1 <= y1 && w2 >= y1) { //@@@: if (x1 <= z1 && x2 >= z1 && w1 <= y1 && w2 >= y1)
                return true; //@@@: return true;
            } //@@@: }
            if (x1 <= z2 && x2 >= z2 && w1 <= y1 && w2 >= y1) { //@@@: if (x1 <= z2 && x2 >= z2 && w1 <= y1 && w2 >= y1)
                return true; //@@@: return true;
            } //@@@: }
            if (x1 <= z1 && x2 >= z1 && w1 <= y2 && w2 >= y2) { //@@@: if (x1 <= z1 && x2 >= z1 && w1 <= y2 && w2 >= y2)
                return true; //@@@: return true;
            } //@@@: }
            if (x1 <= z2 && x2 >= z2 && w1 <= y2 && w2 >= y2) { //@@@: if (x1 <= z2 && x2 >= z2 && w1 <= y2 && w2 >= y2)
                return true; //@@@: return true;
            } //@@@: }
            // then A in B
            //
            if (z1 <= x1 && z2 >= x1 && y1 <= w1 && y2 >= w1) { //@@@: if (z1 <= x1 && z2 >= x1 && y1 <= w1 && y2 >= w1)
                return true; //@@@: return true;
            } //@@@: }
            if (z1 <= x2 && z2 >= x2 && y1 <= w1 && y2 >= w1) { //@@@: if (z1 <= x2 && z2 >= x2 && y1 <= w1 && y2 >= w1)
                return true; //@@@: return true;
            } //@@@: }
            if (z1 <= x1 && z2 >= x1 && y1 <= w2 && y2 >= w2) { //@@@: if (z1 <= x1 && z2 >= x1 && y1 <= w2 && y2 >= w2)
                return true; //@@@: return true;
            } //@@@: }
            if (z1 <= x2 && z2 >= x2 && y1 <= w2 && y2 >= w2) { //@@@: if (z1 <= x2 && z2 >= x2 && y1 <= w2 && y2 >= w2)
                return true; //@@@: return true;
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        //-----------------------------------------------------------------------------------------------
        // Grid
        //
        self.initGrid = function(picGrid, typeGrid) { //@@@: public void initGrid(Graphics picGrid, csETypeGrid typeGrid)
            let x = 0; //@@@: int x = 0;
            let y = 0; //@@@: int y = 0;
            let c = null; //@@@: cReportPaintObject c = null;
            let top = 0; //@@@: float top = 0;
            let left = 0; //@@@: float left = 0;
            let i = 0; //@@@: int i = 0;

            pCreateBrushGrid(picGrid, typeGrid); //@@@: pCreateBrushGrid(picGrid, typeGrid);

            y = (picGrid.VisibleClipBounds.Height / C_GRID_AREA_HEIGHT); //@@@: y = (int)(picGrid.VisibleClipBounds.Height / C_GRID_AREA_HEIGHT);
            x = (picGrid.VisibleClipBounds.Width / C_GRID_AREA_WIDTH); //@@@: x = (int)(picGrid.VisibleClipBounds.Width / C_GRID_AREA_WIDTH);

            x = x + 1; //@@@: x = x + 1;
            y = y + 1; //@@@: y = y + 1;

            G.redim(m_vGridObjs, x, y); //@@@: G.redim(ref m_vGridObjs, x, y);

            let l = 0; //@@@: int l = 0;
            let t = 0; //@@@: int t = 0;

            for (i = 0; i < y * x; i++) { //@@@: for (i = 0; i < y * x; i++)
                c = m_paintGridAreas.add(c, getKey()); //@@@: c = m_paintGridAreas.add(c, getKey());

                left = C_GRID_AREA_WIDTH * l; //@@@: left = C_GRID_AREA_WIDTH * l;
                top = C_GRID_AREA_HEIGHT * t; //@@@: top = C_GRID_AREA_HEIGHT * t;
                let w_aspect = c.getAspect(); //@@@: cReportAspect w_aspect = c.getAspect();
                w_aspect.setLeft(left); //@@@: w_aspect.setLeft(left);
                w_aspect.setTop(top); //@@@: w_aspect.setTop(top);
                w_aspect.setWidth(C_GRID_AREA_WIDTH); //@@@: w_aspect.setWidth(C_GRID_AREA_WIDTH);
                w_aspect.setHeight(C_GRID_AREA_HEIGHT); //@@@: w_aspect.setHeight(C_GRID_AREA_HEIGHT);

                let t] = c.getKey(); //@@@: m_vGridObjs[l, t] = c.getKey();

                c = null; //@@@: c = null;

                l = l + 1; //@@@: l = l + 1;
                if (l >= x) { //@@@: if (l >= x)
                    l = 0; //@@@: l = 0;
                    t = t + 1; //@@@: t = t + 1;
                } //@@@: }
            } //@@@: }

            refreshBackgroundPicture(picGrid, (int)csColors.C_COLOR_WHITE); //@@@: refreshBackgroundPicture(picGrid, (int)csColors.C_COLOR_WHITE);
        }; //@@@: }

        //----------------------------------------------------------------------------------
        // Align

        // to align an object we need to know in which
        // grid it is located every one of this three points:
        //
        //          a------------------b
        //          |                  |
        //          |                  |
        //          c-------------------

        // a define top and left
        // b define widht
        // c define heigth
        self.alingObjTopToGrid = function(sKey) { //@@@: public void alingObjTopToGrid(String sKey)
            alingObjToGrid(sKey, false, true, false, false, true); //@@@: alingObjToGrid(sKey, false, true, false, false, true);
        }; //@@@: }

        self.alingObjLeftToGrid = function(sKey) { //@@@: public void alingObjLeftToGrid(String sKey)
            alingObjToGrid(sKey, true, false, false, false, true); //@@@: alingObjToGrid(sKey, true, false, false, false, true);
        }; //@@@: }

        self.alingObjBottomToGrid = function(sKey) { //@@@: public void alingObjBottomToGrid(String sKey)
            alingObjToGrid(sKey, false, false, true, false, true); //@@@: alingObjToGrid(sKey, false, false, true, false, true);
        }; //@@@: }

        self.alingObjRightToGrid = function(sKey) { //@@@: public void alingObjRightToGrid(String sKey)
            alingObjToGrid(sKey, false, false, false, true, true); //@@@: alingObjToGrid(sKey, false, false, false, true, true);
        }; //@@@: }

        self.alingObjLeftTopToGrid = function(sKey) { //@@@: public void alingObjLeftTopToGrid(String sKey)
            alingObjToGrid(sKey, true, true, false, false, true); //@@@: alingObjToGrid(sKey, true, true, false, false, true);
        }; //@@@: }

        self.alingObjLeftBottomToGrid = function(sKey) { //@@@: public void alingObjLeftBottomToGrid(String sKey)
            alingObjToGrid(sKey, true, false, true, false, true); //@@@: alingObjToGrid(sKey, true, false, true, false, true);
        }; //@@@: }

        self.alingObjRightTopToGrid = function(sKey) { //@@@: public void alingObjRightTopToGrid(String sKey)
            alingObjToGrid(sKey, false, true, false, true, true); //@@@: alingObjToGrid(sKey, false, true, false, true, true);
        }; //@@@: }

        self.alingObjRightBottomToGrid = function(sKey) { //@@@: public void alingObjRightBottomToGrid(String sKey)
            alingObjToGrid(sKey, false, false, true, true, true); //@@@: alingObjToGrid(sKey, false, false, true, true, true);
        }; //@@@: }

        self.alingToGrid = function(sKey) { //@@@: public void alingToGrid(String sKey)
            alingObjToGrid(sKey, true, true, false, false, false); //@@@: alingObjToGrid(sKey, true, true, false, false, false);
        }; //@@@: }

        const alingObjToGrid = function( //@@@: private void alingObjToGrid(
            sKey,  //@@@: String sKey,
            toLeft,  //@@@: bool toLeft,
            toTop,  //@@@: bool toTop,
            toBottom,  //@@@: bool toBottom,
            toRight,  //@@@: bool toRight,
            resizing) { //@@@: bool resizing)
            let z1 = 0; //@@@: int z1 = 0;
            let q1 = 0; //@@@: int q1 = 0;
            let maxY = 0; //@@@: int maxY = 0;
            let maxX = 0; //@@@: int maxX = 0;
            let gridObjAspect = null; //@@@: cReportAspect gridObjAspect = null;

            maxX = m_vGridObjs.GetLength(0)-1; //@@@: maxX = m_vGridObjs.GetLength(0)-1;
            maxY = m_vGridObjs.GetLength(1)-1; //@@@: maxY = m_vGridObjs.GetLength(1)-1;

            let top = 0; //@@@: float top = 0;
            let left = 0; //@@@: float left = 0;
            let width = 0; //@@@: float width = 0;
            let height = 0; //@@@: float height = 0;
            let offset = 0; //@@@: float offset = 0;
            self.float pointSeparation = 0.6f; //@@@: const float pointSeparation = 0.6f;
            self.float offSetPointSep = 0.3f; //@@@: const float offSetPointSep = 0.3f;

            let paintObjs = null; //@@@: cReportPaintObjects paintObjs = null;

            if (sKey.Substring(0, 1) === C_KEY_PAINT_SEC) { //@@@: if (sKey.Substring(0, 1) == C_KEY_PAINT_SEC)
                paintObjs = m_paintSections; //@@@: paintObjs = m_paintSections;
            } //@@@: }
            else { //@@@: else
                paintObjs = m_paintObjects; //@@@: paintObjs = m_paintObjects;
            } //@@@: }

            let nLeft = 0; //@@@: float nLeft = 0;
            let nTop = 0; //@@@: float nTop = 0;

            let w_item = paintObjs.item(sKey); //@@@: cReportPaintObject w_item = paintObjs.item(sKey);
            let w_aspect = w_item.getAspect(); //@@@: cReportAspect w_aspect = w_item.getAspect();
            nLeft = w_aspect.getLeft() - offSetPointSep; //@@@: nLeft = w_aspect.getLeft() - offSetPointSep;
            nTop = w_aspect.getTop() - w_aspect.getOffset() - offSetPointSep; //@@@: nTop = w_aspect.getTop() - w_aspect.getOffset() - offSetPointSep;

            if (nLeft < 0) { nLeft = 0; } //@@@: if (nLeft < 0) { nLeft = 0; }
            if (nTop < 0) { nTop = 0; } //@@@: if (nTop < 0) { nTop = 0; }

            if (toTop || toLeft) { //@@@: if (toTop || toLeft)
                // we get the grid where the point A is located
                //
                z1 = Convert.ToInt32(nLeft / C_GRID_AREA_WIDTH); //@@@: z1 = Convert.ToInt32(nLeft / C_GRID_AREA_WIDTH);
                q1 = Convert.ToInt32(nTop / C_GRID_AREA_HEIGHT); //@@@: q1 = Convert.ToInt32(nTop / C_GRID_AREA_HEIGHT);

                if (nLeft > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; } //@@@: if (nLeft > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; }
                if (nTop > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; } //@@@: if (nTop > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 0) { z1 = 0; } //@@@: if (z1 < 0) { z1 = 0; }
                if (q1 < 0) { q1 = 0; } //@@@: if (q1 < 0) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; } //@@@: if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; } //@@@: if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = m_paintGridAreas.item(m_vGridObjs[z1, q1]).getAspect(); //@@@: gridObjAspect = m_paintGridAreas.item(m_vGridObjs[z1, q1]).getAspect();

                if (toTop) { //@@@: if (toTop)
                    // now we need to get which is the nearest point
                    //
                    top = (w_aspect.getTop() - w_aspect.getOffset()) - gridObjAspect.getTop(); //@@@: top = (w_aspect.getTop() - w_aspect.getOffset()) - gridObjAspect.getTop();
                    top = Convert.ToInt32(top / pointSeparation) * pointSeparation; //@@@: top = Convert.ToInt32(top / pointSeparation) * pointSeparation;
                    offset = gridObjAspect.getTop() //@@@: offset = gridObjAspect.getTop()
                                + top  //@@@: + top
UNKNOWN >>                                 - offSetPointSep  //@@@: - offSetPointSep
                                - (w_aspect.getTop() - w_aspect.getOffset()); //@@@: - (w_aspect.getTop() - w_aspect.getOffset());
                    w_aspect.setTop((gridObjAspect.getTop() + top - offSetPointSep) + w_aspect.getOffset()); //@@@: w_aspect.setTop((gridObjAspect.getTop() + top - offSetPointSep) + w_aspect.getOffset());

                    if (resizing) { //@@@: if (resizing)
                        w_aspect.setHeight(w_aspect.getHeight() - offset); //@@@: w_aspect.setHeight(w_aspect.getHeight() - offset);
                    } //@@@: }
                } //@@@: }

                if (toLeft) { //@@@: if (toLeft)
                    left = w_aspect.getLeft() - gridObjAspect.getLeft(); //@@@: left = w_aspect.getLeft() - gridObjAspect.getLeft();
                    left = Convert.ToInt32(left / pointSeparation) * pointSeparation; //@@@: left = Convert.ToInt32(left / pointSeparation) * pointSeparation;
                    offset = gridObjAspect.getLeft() + left - offSetPointSep - w_aspect.getLeft(); //@@@: offset = gridObjAspect.getLeft() + left - offSetPointSep - w_aspect.getLeft();
                    w_aspect.setLeft(gridObjAspect.getLeft() + left - offSetPointSep); //@@@: w_aspect.setLeft(gridObjAspect.getLeft() + left - offSetPointSep);

                    if (resizing) { //@@@: if (resizing)
                        w_aspect.setWidth(w_aspect.getWidth() - offset); //@@@: w_aspect.setWidth(w_aspect.getWidth() - offset);
                    } //@@@: }
                } //@@@: }
            } //@@@: }

            if (toRight) { //@@@: if (toRight)
                // we get the grid where the point B is located
                //
                z1 = Convert.ToInt32((nLeft + w_aspect.getWidth()) / C_GRID_AREA_WIDTH); //@@@: z1 = Convert.ToInt32((nLeft + w_aspect.getWidth()) / C_GRID_AREA_WIDTH);
                if (nLeft + w_aspect.getWidth() > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; } //@@@: if (nLeft + w_aspect.getWidth() > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; }

                q1 = Convert.ToInt32(nTop / C_GRID_AREA_HEIGHT); //@@@: q1 = Convert.ToInt32(nTop / C_GRID_AREA_HEIGHT);
                if (nTop > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; } //@@@: if (nTop > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; } //@@@: if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; } //@@@: if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; } //@@@: if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; } //@@@: if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = m_paintGridAreas.item(m_vGridObjs[z1, q1]).getAspect(); //@@@: gridObjAspect = m_paintGridAreas.item(m_vGridObjs[z1, q1]).getAspect();

                // now we need to get which is the nearest point
                //
                width = w_aspect.getLeft() + w_aspect.getWidth() - gridObjAspect.getLeft(); //@@@: width = w_aspect.getLeft() + w_aspect.getWidth() - gridObjAspect.getLeft();
                width = Convert.ToInt32(width / pointSeparation) * pointSeparation - offSetPointSep; //@@@: width = Convert.ToInt32(width / pointSeparation) * pointSeparation - offSetPointSep;
                w_aspect.setWidth(gridObjAspect.getLeft() + width - w_aspect.getLeft()); //@@@: w_aspect.setWidth(gridObjAspect.getLeft() + width - w_aspect.getLeft());

            } //@@@: }

            if (toBottom) { //@@@: if (toBottom)
                // we get the grid where the point C is located
                //
                z1 = Convert.ToInt32(nLeft / C_GRID_AREA_WIDTH); //@@@: z1 = Convert.ToInt32(nLeft / C_GRID_AREA_WIDTH);
                q1 = Convert.ToInt32((nTop + w_aspect.getHeight()) / C_GRID_AREA_HEIGHT); //@@@: q1 = Convert.ToInt32((nTop + w_aspect.getHeight()) / C_GRID_AREA_HEIGHT);

                if (nLeft > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; } //@@@: if (nLeft > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; }
                if (nTop + w_aspect.getHeight() > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; } //@@@: if (nTop + w_aspect.getHeight() > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; } //@@@: if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; } //@@@: if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; } //@@@: if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; } //@@@: if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = m_paintGridAreas.item(m_vGridObjs[z1, q1]).getAspect(); //@@@: gridObjAspect = m_paintGridAreas.item(m_vGridObjs[z1, q1]).getAspect();

                // now we need to get which is the nearest point
                //
                height = (w_aspect.getTop() - w_aspect.getOffset()) + w_aspect.getHeight() - gridObjAspect.getTop(); //@@@: height = (w_aspect.getTop() - w_aspect.getOffset()) + w_aspect.getHeight() - gridObjAspect.getTop();
                height = Convert.ToInt32(height / pointSeparation) * pointSeparation - offSetPointSep; //@@@: height = Convert.ToInt32(height / pointSeparation) * pointSeparation - offSetPointSep;
                w_aspect.setHeight(gridObjAspect.getTop() + height - (w_aspect.getTop() - w_aspect.getOffset())); //@@@: w_aspect.setHeight(gridObjAspect.getTop() + height - (w_aspect.getTop() - w_aspect.getOffset()));
            } //@@@: }
        }; //@@@: }

        // end Align
        //-------------------------------

        // Drawing
        self.clearPage = function(graph) { //@@@: public void clearPage(object graph)
            refreshBackgroundPicture(graph as Graphics, Color.White.ToArgb()); //@@@: refreshBackgroundPicture(graph as Graphics, Color.White.ToArgb());
        }; //@@@: }

        self.refreshObject = function(key, graph) { //@@@: public bool refreshObject(String key, Graphics graph)
            pClearObject(key, graph); //@@@: pClearObject(key, graph);
            return drawObject(key, graph); //@@@: return drawObject(key, graph);
        }; //@@@: }

        self.drawObject = function(key, graph) { //@@@: public bool drawObject(String key, Graphics graph)
            return draw(m_paintObjects, key, graph); //@@@: return draw(m_paintObjects, key, graph);
        }; //@@@: }

        self.drawSection = function(key, graph) { //@@@: public bool drawSection(String key, Graphics graph)
            // check the width of the paintObject for this section
            // is into the bounds of the page
            //
            let aspect = m_paintSections.item(key).getAspect(); //@@@: cReportAspect aspect = m_paintSections.item(key).getAspect();
            if (aspect.getWidth() > m_bitmap.Size.Width-2) { //@@@: if (aspect.getWidth() > m_bitmap.Size.Width-2)
                aspect.setWidth(m_bitmap.Size.Width-2); //@@@: aspect.setWidth(m_bitmap.Size.Width-2);
            } //@@@: }
            return draw(m_paintSections, key, graph); //@@@: return draw(m_paintSections, key, graph);
        }; //@@@: }

        self.drawRule = function(key, graph) { //@@@: public bool drawRule(String key, Graphics graph)
            self.int LINE_COLOR = 0xcc6600; //@@@: const int LINE_COLOR = 0xcc6600;
            let top = 0; //@@@: int top = 0;
            let heightSec = 0; //@@@: float heightSec = 0;
            let aspect = null; //@@@: cReportAspect aspect = null;

            aspect = new cReportAspect(); //@@@: aspect = new cReportAspect();

            let w_item = m_paintSections.item(key); //@@@: cReportPaintObject w_item = m_paintSections.item(key);
            heightSec = w_item.getHeightSecLine() * 0.5f; //@@@: heightSec = w_item.getHeightSecLine() * 0.5f;
            let w_aspect = w_item.getAspect(); //@@@: cReportAspect w_aspect = w_item.getAspect();
            aspect.setTop(w_aspect.getTop() + 3 - heightSec); //@@@: aspect.setTop(w_aspect.getTop() + 3 - heightSec);
            aspect.setOffset(w_aspect.getOffset()); //@@@: aspect.setOffset(w_aspect.getOffset());
            aspect.setTransparent(true); //@@@: aspect.setTransparent(true);
            aspect.setLeft(0); //@@@: aspect.setLeft(0);
            aspect.setHeight(20); //@@@: aspect.setHeight(20);
            aspect.setAlign(HorizontalAlignment.Right); //@@@: aspect.setAlign(HorizontalAlignment.Right);
            aspect.setWidth(graph.ClipBounds.Width - 1); //@@@: aspect.setWidth(graph.ClipBounds.Width - 1);

            if (w_item.getTextLine() !== "") { //@@@: if (w_item.getTextLine() != "")
                top = - Convert.ToInt32(w_item.getHeightSec()); //@@@: top = - Convert.ToInt32(w_item.getHeightSec());
                w_aspect = w_item.getAspect(); //@@@: w_aspect = w_item.getAspect();
                top += Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset() - 6 + w_aspect.getHeight() * 2); //@@@: top += Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset() - 6 + w_aspect.getHeight() * 2);

                printLine(graph,  //@@@: printLine(graph,
                            true,  //@@@: true,
                            0,  //@@@: 0,
                            top,  //@@@: top,
                            aspect.getWidth(),  //@@@: aspect.getWidth(),
                            top, //@@@: top,
                            LINE_COLOR,  //@@@: LINE_COLOR,
                            1,  //@@@: 1,
                            true, //@@@: true,
                            LINE_COLOR,  //@@@: LINE_COLOR,
                            false); //@@@: false);

                // last section line
                //
                printText(graph, w_item.getTextLine(), aspect, w_item.getImage()); //@@@: printText(graph, w_item.getTextLine(), aspect, w_item.getImage());

                heightSec = w_item.getHeightSec() * 0.5f; //@@@: heightSec = w_item.getHeightSec() * 0.5f;

                // print section's name
                //
                w_aspect = m_paintSections.item(key).getAspect(); //@@@: w_aspect = m_paintSections.item(key).getAspect();
                aspect.setTop(w_aspect.getTop() - heightSec); //@@@: aspect.setTop(w_aspect.getTop() - heightSec);
                aspect.setAlign(HorizontalAlignment.Left); //@@@: aspect.setAlign(HorizontalAlignment.Left);

                printText(graph, w_item.getText(), aspect, w_item.getImage()); //@@@: printText(graph, w_item.getText(), aspect, w_item.getImage());

            } //@@@: }
            else { //@@@: else
                top = Convert.ToInt32(aspect.getTop() - aspect.getOffset() - heightSec + w_item.getAspect().getHeight()); //@@@: top = Convert.ToInt32(aspect.getTop() - aspect.getOffset() - heightSec + w_item.getAspect().getHeight());

                if (w_item.getIsSection()) { //@@@: if (w_item.getIsSection())
                    printLine(graph,  //@@@: printLine(graph,
                                true, //@@@: true,
                                0,  //@@@: 0,
                                top,  //@@@: top,
                                aspect.getWidth(),  //@@@: aspect.getWidth(),
                                top, //@@@: top,
                                LINE_COLOR,  //@@@: LINE_COLOR,
                                1,  //@@@: 1,
                                true, //@@@: true,
                                LINE_COLOR,  //@@@: LINE_COLOR,
                                false); //@@@: false);
                } //@@@: }

                // every section line except the last one
                //
                printText(graph, w_item.getText(), aspect, w_item.getImage()); //@@@: printText(graph, w_item.getText(), aspect, w_item.getImage());
            } //@@@: }

            if (w_item === m_paintSections.item(m_paintSections.count() - 1))  { //@@@: if (w_item == m_paintSections.item(m_paintSections.count() - 1))
                top = Convert.ToInt32(aspect.getTop() + w_item.getHeightSecLine() - heightSec - aspect.getOffset() + 6); //@@@: top = Convert.ToInt32(aspect.getTop() + w_item.getHeightSecLine() - heightSec - aspect.getOffset() + 6);

                if (w_item.getIsSection()) { //@@@: if (w_item.getIsSection())
                    printLine(graph, //@@@: printLine(graph,
                                true, //@@@: true,
                                0, //@@@: 0,
                                top, //@@@: top,
                                aspect.getWidth(), //@@@: aspect.getWidth(),
                                top, //@@@: top,
                                LINE_COLOR, //@@@: LINE_COLOR,
                                1, //@@@: 1,
                                true, //@@@: true,
                                LINE_COLOR, //@@@: LINE_COLOR,
                                false); //@@@: false);
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

		self.moveObjToXY = function(sKey, x, y, graph) { //@@@: public void moveObjToXY(String sKey, float x, float y, Graphics graph)
            if (sKey.Substring(0, 1) === C_KEY_PAINT_OBJ) { //@@@: if (sKey.Substring(0, 1) == C_KEY_PAINT_OBJ)
                let w_aspect = m_paintObjects.item(sKey).getAspect(); //@@@: cReportAspect w_aspect = m_paintObjects.item(sKey).getAspect();
                move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph); //@@@: move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            } //@@@: }
            else { //@@@: else
                let w_aspect = m_paintSections.item(sKey).getAspect(); //@@@: cReportAspect w_aspect = m_paintSections.item(sKey).getAspect();
                move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph); //@@@: move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            } //@@@: }
        }; //@@@: }

		self.moveObjToXYEx = function(sKey, x, y, graph, clear) { //@@@: public void moveObjToXYEx(String sKey, float x, float y, Graphics graph, bool clear)
            if (clear) { //@@@: if (clear)
                m_x1 = m_x1Ex; //@@@: m_x1 = m_x1Ex;
                m_y1 = m_y1Ex; //@@@: m_y1 = m_y1Ex;
                m_x2 = m_x2Ex; //@@@: m_x2 = m_x2Ex;
                m_y2 = m_y2Ex; //@@@: m_y2 = m_y2Ex;
            } //@@@: }
            else { //@@@: else
                m_x1 = 0; //@@@: m_x1 = 0;
                m_x2 = 0; //@@@: m_x2 = 0;
                m_y1 = 0; //@@@: m_y1 = 0;
                m_y2 = 0; //@@@: m_y2 = 0;
            } //@@@: }

            moveObjToXY(sKey, x, y, graph); //@@@: moveObjToXY(sKey, x, y, graph);

            if (m_x1Ex === 0) { m_x1Ex = m_x1; } //@@@: if (m_x1Ex == 0) { m_x1Ex = m_x1; }
            if (m_y1Ex === 0) { m_y1Ex = m_y1; } //@@@: if (m_y1Ex == 0) { m_y1Ex = m_y1; }
            if (m_x2Ex === 0) { m_x2Ex = m_x2; } //@@@: if (m_x2Ex == 0) { m_x2Ex = m_x2; }
            if (m_y2Ex === 0) { m_y2Ex = m_y2; } //@@@: if (m_y2Ex == 0) { m_y2Ex = m_y2; }

            if (m_x1Ex > m_x1 && m_x1 > 0) { m_x1Ex = m_x1; } //@@@: if (m_x1Ex > m_x1 && m_x1 > 0) { m_x1Ex = m_x1; }
            if (m_y1Ex > m_y1 && m_y1 > 0) { m_y1Ex = m_y1; } //@@@: if (m_y1Ex > m_y1 && m_y1 > 0) { m_y1Ex = m_y1; }
            if (m_x2Ex < m_x2 && m_x2 > 0) { m_x2Ex = m_x2; } //@@@: if (m_x2Ex < m_x2 && m_x2 > 0) { m_x2Ex = m_x2; }
            if (m_y2Ex < m_y2 && m_y2 > 0) { m_y2Ex = m_y2; } //@@@: if (m_y2Ex < m_y2 && m_y2 > 0) { m_y2Ex = m_y2; }
        }; //@@@: }

		self.moveVertical = function(sKey, y, graph) { //@@@: public void moveVertical(String sKey, float y, Graphics graph)
            if (sKey.Substring(0, 1) === C_KEY_PAINT_OBJ) { //@@@: if (sKey.Substring(0, 1) == C_KEY_PAINT_OBJ)
                let w_aspect = m_paintObjects.item(sKey).getAspect(); //@@@: cReportAspect w_aspect = m_paintObjects.item(sKey).getAspect();
                move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph); //@@@: move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            } //@@@: }
            else { //@@@: else
                let w_aspect = m_paintSections.item(sKey).getAspect(); //@@@: cReportAspect w_aspect = m_paintSections.item(sKey).getAspect();
                move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph); //@@@: move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            } //@@@: }
        }; //@@@: }

		self.moveHorizontal = function(sKey, x, graph) { //@@@: public void moveHorizontal(String sKey, float x, Graphics graph)
            if (sKey.Substring(0, 1) === C_KEY_PAINT_OBJ) { //@@@: if (sKey.Substring(0, 1) == C_KEY_PAINT_OBJ)
                let w_aspect = m_paintObjects.item(sKey).getAspect(); //@@@: cReportAspect w_aspect = m_paintObjects.item(sKey).getAspect();
                move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph); //@@@: move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
            } //@@@: }
            else { //@@@: else
                let w_aspect = m_paintSections.item(sKey).getAspect(); //@@@: cReportAspect w_aspect = m_paintSections.item(sKey).getAspect();
                move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph); //@@@: move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
            } //@@@: }
        }; //@@@: }

        self.endMove = function(graph) { //@@@: public void endMove(Graphics graph)
            m_x1 = 0; //@@@: m_x1 = 0;
            m_x2 = 0; //@@@: m_x2 = 0;
            m_y1 = 0; //@@@: m_y1 = 0;
            m_y2 = 0; //@@@: m_y2 = 0;

            m_x1Ex = 0; //@@@: m_x1Ex = 0;
            m_x2Ex = 0; //@@@: m_x2Ex = 0;
            m_y1Ex = 0; //@@@: m_y1Ex = 0;
            m_y2Ex = 0; //@@@: m_y2Ex = 0;

            refreshBackgroundPicture(graph, (int)csColors.C_COLOR_WHITE); //@@@: refreshBackgroundPicture(graph, (int)csColors.C_COLOR_WHITE);
            m_beginMoveDone = false; //@@@: m_beginMoveDone = false;
        }; //@@@: }

        // Drawing - Primitive
        const draw = function(collObjs, key, graph) { //@@@: private bool draw(cReportPaintObjects collObjs, String key, Graphics graph)
            try { //@@@: try
                if (graph === null) { //@@@: if (graph == null)
                    throw new ReportPaintException( //@@@: throw new ReportPaintException(
                        csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT, //@@@: csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT,
                        C_MODULE, //@@@: C_MODULE,
                        cReportPaintError.errGetDescript( //@@@: cReportPaintError.errGetDescript(
                                        csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT)); //@@@: csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT));
                } //@@@: }

                let oPaintObj = null; //@@@: cReportPaintObject oPaintObj = null;
                let x1 = 0; //@@@: float x1 = 0;
                let y1 = 0; //@@@: float y1 = 0;
                let y2 = 0; //@@@: float y2 = 0;
                let x2 = 0; //@@@: float x2 = 0;
                let colorIn = 0; //@@@: int colorIn = 0;
                let colorOut = 0; //@@@: int colorOut = 0;
                let filled = false; //@@@: bool filled = false;

                oPaintObj = collObjs.item(key); //@@@: oPaintObj = collObjs.item(key);

                if (oPaintObj === null) { return false; } //@@@: if (oPaintObj == null) { return false; }

                let w_aspect = oPaintObj.getAspect(); //@@@: cReportAspect w_aspect = oPaintObj.getAspect();

                x1 = w_aspect.getLeft(); //@@@: x1 = w_aspect.getLeft();
                x2 = x1 + w_aspect.getWidth(); //@@@: x2 = x1 + w_aspect.getWidth();
                y1 = w_aspect.getTop() - w_aspect.getOffset(); //@@@: y1 = w_aspect.getTop() - w_aspect.getOffset();
                y2 = y1 + w_aspect.getHeight(); //@@@: y2 = y1 + w_aspect.getHeight();

                if (!w_aspect.getTransparent()) { //@@@: if (!w_aspect.getTransparent())
                    colorIn = w_aspect.getBackColor(); //@@@: colorIn = w_aspect.getBackColor();
                    filled = true; //@@@: filled = true;
                } //@@@: }

                colorOut = w_aspect.getBorderColor(); //@@@: colorOut = w_aspect.getBorderColor();

                switch (oPaintObj.getPaintType()) //@@@: switch (oPaintObj.getPaintType())
                { //@@@: {
                    case csRptPaintObjType.CSRPTPAINTOBJBOX: //@@@: case csRptPaintObjType.CSRPTPAINTOBJBOX:

                        pDrawObjBox(graph, //@@@: pDrawObjBox(graph,
                                    oPaintObj.getAspect(), //@@@: oPaintObj.getAspect(),
                                    x1, y1, x2, y2, //@@@: x1, y1, x2, y2,
                                    filled, //@@@: filled,
                                    colorIn, //@@@: colorIn,
                                    colorOut); //@@@: colorOut);
                        break; //@@@: break;

                    case csRptPaintObjType.CSRPTPAINTOBJLINE: //@@@: case csRptPaintObjType.CSRPTPAINTOBJLINE:

                        printLine(graph, filled, x1, y1, x2, y2, colorIn, 1, false, colorOut, false); //@@@: printLine(graph, filled, x1, y1, x2, y2, colorIn, 1, false, colorOut, false);
                        break; //@@@: break;

                    case csRptPaintObjType.CSRPTPAINTOBJCIRCLE: //@@@: case csRptPaintObjType.CSRPTPAINTOBJCIRCLE:
                        break; //@@@: break;

                    case csRptPaintObjType.CSRPTPAINTOBJIMAGE: //@@@: case csRptPaintObjType.CSRPTPAINTOBJIMAGE:

                        pDrawObjBox(graph, //@@@: pDrawObjBox(graph,
                                    oPaintObj.getAspect(), //@@@: oPaintObj.getAspect(),
                                    x1 - 1, y1 - 1, x2 + 1, y2 + 1, //@@@: x1 - 1, y1 - 1, x2 + 1, y2 + 1,
                                    filled, //@@@: filled,
                                    colorIn, //@@@: colorIn,
                                    0xC0C000); //@@@: 0xC0C000);

                        let bmpWidth = 0; //@@@: int bmpWidth = 0;
                        let bmpHeight = 0; //@@@: int bmpHeight = 0;

                        if (oPaintObj.getImage() !== null) { //@@@: if (oPaintObj.getImage() != null)
                            cGlobals.getBitmapSize(oPaintObj.getImage(), bmpWidth, bmpHeight, true); //@@@: cGlobals.getBitmapSize(oPaintObj.getImage(), out bmpWidth, out bmpHeight, true);

                            if (bmpWidth > w_aspect.getWidth()) { //@@@: if (bmpWidth > w_aspect.getWidth())
                                bmpWidth = w_aspect.getWidth(); //@@@: bmpWidth = (int)w_aspect.getWidth();
                            } //@@@: }
                            if (bmpHeight > w_aspect.getHeight()) { //@@@: if (bmpHeight > w_aspect.getHeight())
                                bmpHeight = w_aspect.getHeight(); //@@@: bmpHeight = (int)w_aspect.getHeight();
                            } //@@@: }

                            drawBMP(graph, //@@@: drawBMP(graph,
                                    oPaintObj.getImage(), //@@@: oPaintObj.getImage(),
                                    x1 * m_scaleX, //@@@: x1 * m_scaleX,
                                    y1 * m_scaleY, //@@@: y1 * m_scaleY,
                                    bmpWidth, //@@@: bmpWidth,
                                    bmpHeight, //@@@: bmpHeight,
                                    bmpWidth * m_scaleX, //@@@: bmpWidth * m_scaleX,
                                    bmpHeight * m_scaleY); //@@@: bmpHeight * m_scaleY);
                        } //@@@: }
                        break; //@@@: break;
                } //@@@: }

                if (oPaintObj.getText() !== "") { //@@@: if (oPaintObj.getText() != "")
                    if (collObjs === m_paintObjects) { //@@@: if (collObjs == m_paintObjects)
                        printText(graph, //@@@: printText(graph,
                                    oPaintObj.getText(), //@@@: oPaintObj.getText(),
                                    oPaintObj.getAspect(), //@@@: oPaintObj.getAspect(),
                                    oPaintObj.getImage()); //@@@: oPaintObj.getImage());
                    } //@@@: }
                } //@@@: }

                return true; //@@@: return true;

            } //@@@: }
            catch (ex) { //@@@: catch (Exception ex)
                cError.mngError(ex, "Draw", C_MODULE, "Error al dibujar un objeto"); //@@@: cError.mngError(ex, "Draw", C_MODULE, "Error al dibujar un objeto");
                return false; //@@@: return false;
            } //@@@: }
        }; //@@@: }

        const drawBMP = function(graph, image, x, y, bmpWidth, bmpHeight, destWidth, destHeight) { //@@@: private void drawBMP(Graphics graph, Image image, float x, float y, int bmpWidth, int bmpHeight, float destWidth, float destHeight)
            //throw new NotImplementedException();
            /* //@@@: /*
              Dim hDC      As Long
              Dim hOldBmp  As Long

              hDC = CreateCompatibleDC(0&)
              hOldBmp = SelectObject(hDC, hBmp)

              x = x / Screen.TwipsPerPixelX
              y = y / Screen.TwipsPerPixelY
              Width = Width / Screen.TwipsPerPixelX
              Height = Height / Screen.TwipsPerPixelY
              DestWidth = DestWidth / Screen.TwipsPerPixelX
              DestHeight = DestHeight / Screen.TwipsPerPixelY

              If DestWidth <> Width Then
                Dim OldStrMode As Long

                OldStrMode = SetStretchBltMode(hDCDest, HALFTONE)

                StretchBlt hDCDest, x, y, DestWidth, DestHeight, hDC, 0, 0, Width, Height, vbSrcCopy

                SetStretchBltMode hDCDest, OldStrMode

              Else
                BitBlt hDCDest, x, y, Width, Height, hDC, 0, 0, vbSrcCopy
              End If

              SelectObject hDC, hOldBmp
              DeleteObject hDC
             */

            let sourceRect = new Rectangle(0, 0, bmpWidth, bmpHeight); //@@@: Rectangle sourceRect = new Rectangle(0, 0, bmpWidth, bmpHeight);
            let destRect = new Rectangle(Convert.ToInt32(x), Convert.ToInt32(y), bmpWidth, bmpHeight); //@@@: Rectangle destRect = new Rectangle(Convert.ToInt32(x), Convert.ToInt32(y), bmpWidth, bmpHeight);

            graph.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel); //@@@: graph.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);
        }; //@@@: }

        self.setFocus = function(sKey, graph, clearSelected) { //@@@: public void setFocus(String sKey, Graphics graph, bool clearSelected)
            if (clearSelected) { G.redim(m_vSelectedKeys, 0); } //@@@: if (clearSelected) { G.redim(ref m_vSelectedKeys, 0); }

            if (!pAllreadySelected(sKey)) { //@@@: if (!pAllreadySelected(sKey))
                G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length + 1); //@@@: G.redimPreserve(ref m_vSelectedKeys, m_vSelectedKeys.Length + 1);
                let -1] = sKey; //@@@: m_vSelectedKeys[m_vSelectedKeys.Length -1] = sKey;
            } //@@@: }

            m_keyFocus = sKey; //@@@: m_keyFocus = sKey;
            paintPicture(graph, true); //@@@: paintPicture(graph, true);
        }; //@@@: }

        self.removeFromSelected = function(sKey, graph) { //@@@: public void removeFromSelected(String sKey, Graphics graph)
            let i = 0; //@@@: int i = 0;

            for (i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (i = 0; i < m_vSelectedKeys.Length; i++)
                if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey)
                    break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (i >= m_vSelectedKeys.Length) { return; } //@@@: if (i >= m_vSelectedKeys.Length) { return; }

            for (i = i + 1; i < m_vSelectedKeys.Length; i++) { //@@@: for (i = i + 1; i < m_vSelectedKeys.Length; i++)
                m_vSelectedKeys[i - 1] = m_vSelectedKeys[i]; //@@@: m_vSelectedKeys[i - 1] = m_vSelectedKeys[i];
            } //@@@: }
            if (m_vSelectedKeys.Length > 0) { //@@@: if (m_vSelectedKeys.Length > 0)
                G.redimPreserve(m_vSelectedKeys, m_vSelectedKeys.Length - 1); //@@@: G.redimPreserve(ref m_vSelectedKeys, m_vSelectedKeys.Length - 1);
            } //@@@: }
            else { //@@@: else
                G.redim(m_vSelectedKeys, 0); //@@@: G.redim(ref m_vSelectedKeys, 0);
            } //@@@: }

            if (m_keyFocus === sKey) { m_keyFocus = ""; } //@@@: if (m_keyFocus == sKey) { m_keyFocus = ""; }

            paintPicture(graph, true); //@@@: paintPicture(graph, true);
        }; //@@@: }

        const pAllreadySelected = function(sKey) { //@@@: private bool pAllreadySelected(String sKey)
            if (sKey === "") { //@@@: if (sKey == "")
                return true; //@@@: return true;
            } //@@@: }

            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++)
                if (m_vSelectedKeys[i] === sKey) { //@@@: if (m_vSelectedKeys[i] == sKey)
                    return true; //@@@: return true;
                } //@@@: }
            } //@@@: }
            return false; //@@@: return false;
        }; //@@@: }

        const setFocusAux = function(sKey, graph) { //@@@: private void setFocusAux(String sKey, Graphics graph)
            let paintObjAsp = null; //@@@: cReportPaintObject paintObjAsp = null;
            let color = 0; //@@@: int color = 0;
            let bCircle = false; //@@@: bool bCircle = false;

            m_keyFocus = sKey; //@@@: m_keyFocus = sKey;

            if (m_keyFocus.Substring(0, 1) === C_KEY_PAINT_OBJ) { //@@@: if (m_keyFocus.Substring(0, 1) == C_KEY_PAINT_OBJ)
                paintObjAsp = m_paintObjects.item(m_keyFocus); //@@@: paintObjAsp = m_paintObjects.item(m_keyFocus);
                color = 0x80C0FF; //@@@: color = 0x80C0FF;
                bCircle = false; //@@@: bCircle = false;
            } //@@@: }
            else { //@@@: else
                paintObjAsp = m_paintSections.item(m_keyFocus); //@@@: paintObjAsp = m_paintSections.item(m_keyFocus);
                color = 0x80C0FF; //@@@: color = 0x80C0FF;
                bCircle = true; //@@@: bCircle = true;
            } //@@@: }

            if (paintObjAsp === null) { return; } //@@@: if (paintObjAsp == null) { return; }

            let w_aspect = paintObjAsp.getAspect(); //@@@: cReportAspect w_aspect = paintObjAsp.getAspect();
            showHandles(graph,  //@@@: showHandles(graph,
                        Convert.ToInt32(w_aspect.getLeft()),  //@@@: Convert.ToInt32(w_aspect.getLeft()),
                        Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset()),  //@@@: Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset()),
                        Convert.ToInt32(w_aspect.getLeft() + w_aspect.getWidth()),  //@@@: Convert.ToInt32(w_aspect.getLeft() + w_aspect.getWidth()),
                        Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset() + w_aspect.getHeight()),  //@@@: Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset() + w_aspect.getHeight()),
                        color,  //@@@: color,
                        bCircle); //@@@: bCircle);
        }; //@@@: }

        const move = function(left, top, width, height, graph) { //@@@: private void move(float left, float top, float width, float height, Graphics graph)
            if (m_x1 > 0 || m_x2 > 0 || m_y1 > 0 || m_y2 > 0) { //@@@: if (m_x1 > 0 || m_x2 > 0 || m_y1 > 0 || m_y2 > 0)
                paintPictureMove(graph, cGlobals.newRectangleF(m_x1, m_y1, m_x2, m_y2)); //@@@: paintPictureMove(graph, cGlobals.newRectangleF(m_x1, m_y1, m_x2, m_y2));
            } //@@@: }

            m_x1 = left; //@@@: m_x1 = left;
            m_y1 = top; //@@@: m_y1 = top;
            m_x2 = left + width; //@@@: m_x2 = left + width;
            m_y2 = top + height; //@@@: m_y2 = top + height;

            printLine(graph, false, m_x1, m_y1, m_x2, m_y2, 0, 1, true, (int)csColors.C_COLOR_BLACK, false); //@@@: printLine(graph, false, m_x1, m_y1, m_x2, m_y2, 0, 1, true, (int)csColors.C_COLOR_BLACK, false);

            if (m_x1 > 1) { m_x1 = m_x1 - 2; } //@@@: if (m_x1 > 1) { m_x1 = m_x1 - 2; }
            if (m_y1 > 1) { m_y1 = m_y1 - 2; } //@@@: if (m_y1 > 1) { m_y1 = m_y1 - 2; }

            m_x2 = m_x2 + 2; //@@@: m_x2 = m_x2 + 2;
            m_y2 = m_y2 + 2; //@@@: m_y2 = m_y2 + 2;
        }; //@@@: }

        self.resize = function(graph, sKey, left, top, x2, y2) { //@@@: public void resize(Graphics graph, String sKey, float left, float top, float x2, float y2)
            self.int C_MIN_WIDTH = 1; //@@@: const int C_MIN_WIDTH = 1;
            self.int C_MIN_HEIGHT = 1; //@@@: const int C_MIN_HEIGHT = 1;

            let paintObjAsp = null; //@@@: cReportAspect paintObjAsp = null;

            if (sKey.Substring(0, 1) === C_KEY_PAINT_OBJ) { //@@@: if (sKey.Substring(0, 1) == C_KEY_PAINT_OBJ)
                paintObjAsp = m_paintObjects.item(sKey).getAspect(); //@@@: paintObjAsp = m_paintObjects.item(sKey).getAspect();
            } //@@@: }
            else { //@@@: else
                paintObjAsp = m_paintSections.item(sKey).getAspect(); //@@@: paintObjAsp = m_paintSections.item(sKey).getAspect();
            } //@@@: }

            if (left === -32768) { //@@@: if ((int)left == -32768)
                m_x1 = paintObjAsp.getLeft(); //@@@: m_x1 = paintObjAsp.getLeft();
            } //@@@: }
            else { //@@@: else
                m_x1 = left; //@@@: m_x1 = left;
            } //@@@: }

            if (top === -32768) { //@@@: if ((int)top == -32768)
                m_y1 = paintObjAsp.getTop() - paintObjAsp.getOffset(); //@@@: m_y1 = paintObjAsp.getTop() - paintObjAsp.getOffset();
            } //@@@: }
            else { //@@@: else
                m_y1 = top; //@@@: m_y1 = top;
            } //@@@: }

            m_x2 = paintObjAsp.getLeft(); //@@@: m_x2 = paintObjAsp.getLeft();
            if (x2 === -32768) { //@@@: if ((int)x2 == -32768)
                m_x2 = m_x2 + paintObjAsp.getWidth(); //@@@: m_x2 = m_x2 + paintObjAsp.getWidth();
            } //@@@: }
            else { //@@@: else
                m_x2 = x2; //@@@: m_x2 = x2;
            } //@@@: }

            m_y2 = paintObjAsp.getTop() - paintObjAsp.getOffset(); //@@@: m_y2 = paintObjAsp.getTop() - paintObjAsp.getOffset();
            if (y2 === -32768) { //@@@: if ((int)y2 == -32768)
                m_y2 = m_y2 + paintObjAsp.getHeight(); //@@@: m_y2 = m_y2 + paintObjAsp.getHeight();
            } //@@@: }
            else { //@@@: else
                m_y2 = y2; //@@@: m_y2 = y2;
            } //@@@: }

            // validations :

            // x2 can't be lower than Left
            if (m_x2 < paintObjAsp.getLeft() + C_MIN_WIDTH) { m_x2 = paintObjAsp.getLeft() + C_MIN_WIDTH; } //@@@: if (m_x2 < paintObjAsp.getLeft() + C_MIN_WIDTH) { m_x2 = paintObjAsp.getLeft() + C_MIN_WIDTH; }

            // y2 can't be lower than Top
            if (m_y2 < paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT) { m_y2 = paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT; } //@@@: if (m_y2 < paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT) { m_y2 = paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT; }

            paintPicture(graph, false); //@@@: paintPicture(graph, false);

            printLine(graph, false, m_x1, m_y1, m_x2, m_y2, (int)csColors.C_COLOR_WHITE, 1, true, (int)csColors.C_COLOR_BLACK, false); //@@@: printLine(graph, false, m_x1, m_y1, m_x2, m_y2, (int)csColors.C_COLOR_WHITE, 1, true, (int)csColors.C_COLOR_BLACK, false);

            graph.Dispose(); //@@@: graph.Dispose();
        }; //@@@: }

        self.createPicture = function(graph) { //@@@: public void createPicture(Graphics graph)
            refreshBackgroundPicture(graph, 0); //@@@: refreshBackgroundPicture(graph, 0);
        }; //@@@: }

        self.createBackgroundBitmap = function(graph) { //@@@: public void createBackgroundBitmap(Graphics graph)
            m_bitmap = new Bitmap(graph.VisibleClipBounds.Width + 1, (int)graph.VisibleClipBounds.Height + 3); // TODO check why 56 ??? //@@@: m_bitmap = new Bitmap((int)graph.VisibleClipBounds.Width + 1, (int)graph.VisibleClipBounds.Height + 3); // TODO check why 56 ???
        }; //@@@: }

        const refreshBackgroundPicture = function(graph, color) { //@@@: private void refreshBackgroundPicture(Graphics graph, int color)
            /* //@@@: /*
            int i = 0;
            RECT tR = null;
            RECT tR2 = null;

            if (m_hBmpCopy !== 0) { DeleteObject(m_hBmpCopy); }
            if (m_hMemDC !== 0) { DeleteObject(m_hMemDC); }

            GetClientRect(graph.hwnd, tR);

            LSet(tR2 === tR);

            m_hMemDC = CreateCompatibleDC(0);
            m_hBmpCopy = CreateCompatibleBitmap(graph.hDC, tR.right, tR.bottom + 56);

            DeleteObject(SelectObject(m_hMemDC, m_hBmpCopy));

            int hBr = 0;
            hBr = CreateSolidBrush(mAux.translateColor(color));
            tR2.bottom = tR2.bottom + 56;
            FillRect(m_hMemDC, tR2, hBr);
            DeleteObject(hBr);

            tR.bottom = m_gridHeight / Screen.TwipsPerPixelY;
            FillRect(m_hMemDC, tR, m_hBrushGrid);

            for (i = 1; i <= getPaintObjects().count(); i++)
            {
                drawObject(getPaintObjects().getNextKeyForZOrder(i), m_hMemDC, graph);
            }

            for (i = 1; i <= getPaintSections().count(); i++)
            {
                drawSection(getPaintSections().getNextKeyForZOrder(i), m_hMemDC, graph);
            }

            paintPicture(graph);
            */
            if (m_bitmap !== null) { //@@@: if (m_bitmap != null)
                m_bitmap.Dispose(); //@@@: m_bitmap.Dispose();
            } //@@@: }

            createBackgroundBitmap(graph); //@@@: createBackgroundBitmap(graph);

            let bitmapGraphic = Graphics.FromImage(m_bitmap); //@@@: Graphics bitmapGraphic = Graphics.FromImage(m_bitmap);

            let rect = cGlobals.newRectangle(0, 0, (int)graph.VisibleClipBounds.Width, (int)graph.VisibleClipBounds.Height + 3); // TODO check why 56 ???; //@@@: Rectangle rect = cGlobals.newRectangle(0, 0, (int)graph.VisibleClipBounds.Width, (int)graph.VisibleClipBounds.Height + 3); // TODO check why 56 ???

            if (m_brushGrid !== null) { //@@@: if (m_brushGrid != null)
                bitmapGraphic.FillRectangle(m_brushGrid, rect); //@@@: bitmapGraphic.FillRectangle(m_brushGrid, rect);
            } //@@@: }
            else  { //@@@: else
                let brush = new SolidBrush(cColor.colorFromRGB(color)); //@@@: Brush brush = new SolidBrush(cColor.colorFromRGB(color));
                bitmapGraphic.FillRectangle(brush, rect); //@@@: bitmapGraphic.FillRectangle(brush, rect);
                brush.Dispose();             //@@@: brush.Dispose();
            } //@@@: }

            for(var i = 0; i < getPaintObjects().count(); i++) { //@@@: for (int i = 0; i < getPaintObjects().count(); i++)
                drawObject(getPaintObjects().getNextKeyForZOrder(i), bitmapGraphic); //@@@: drawObject(getPaintObjects().getNextKeyForZOrder(i), bitmapGraphic);
            } //@@@: }

            for(var i = 0; i < getPaintSections().count(); i++) { //@@@: for (int i = 0; i < getPaintSections().count(); i++)
                drawSection(getPaintSections().getNextKeyForZOrder(i), bitmapGraphic); //@@@: drawSection(getPaintSections().getNextKeyForZOrder(i), bitmapGraphic);
            } //@@@: }

            paintPicture(graph, true); //@@@: paintPicture(graph, true);
        }; //@@@: }

        //--------------------------------------------------------------------------------------------------
        // Draw - Low Level
        const printLine = function( //@@@: private void printLine(
            graph,  //@@@: Graphics graph,
            filled,  //@@@: bool filled,
            x1,  //@@@: float x1,
            y1,  //@@@: float y1,
            x2,  //@@@: float x2,
            y2,  //@@@: float y2,
            colorInside,  //@@@: int colorInside,
            width,  //@@@: int width,
            dash,  //@@@: bool dash,
            colorOut,  //@@@: int colorOut,
            rounded) { //@@@: bool rounded)
            /* //@@@: /*
            RECT tR = null;
            int lResult = 0;
            int hRPen = 0;

            if (dash) {
                hRPen = CreatePen(PS_DOT, width, mAux.translateColor(colorOut));
            } 
            else {
                hRPen = CreatePen(PS_SOLID, width, mAux.translateColor(colorOut));
            }
            DeleteObject(SelectObject(hDC, hRPen));

            if (rounded) {

                x1 = x1 / Screen.TwipsPerPixelX;
                x2 = x2 / Screen.TwipsPerPixelX;

                y1 = y1 / Screen.TwipsPerPixelY;
                y2 = y2 / Screen.TwipsPerPixelY;


                y1 = y1 * m_scaleY;
                y2 = y2 * m_scaleY;
                x1 = x1 * m_scaleX;
                x2 = x2 * m_scaleX;

                RoundRect(hDC, x1, y1, x2, y2, 20 * m_scaleX, 20 * m_scaleY);
            } 
            else {

                tR = cGlobals.newRectangle(x1, y1, x2, y2);
                mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);

                if (y2 !== y1 && x1 !== x2) {

                    Rectangle(hDC, tR.left, tR.top, tR.right, tR.bottom);

                    if (filled) {
                        int hBrush2 = 0;
                        InflateRect(tR, -1, -1);
                        hBrush2 = CreateSolidBrush(mAux.translateColor(colorInside));
                        lResult = FillRect(hDC, tR, hBrush2);
                        DeleteObject(hBrush2);
                    }

                } 
                else {
                    if (tR.bottom === 0 || tR.bottom === tR.top) { tR.bottom = tR.top + 1; }
                    if (tR.right === 0 || tR.left === tR.right) { tR.right = tR.left + 1; }
                    Rectangle(hDC, tR.left, tR.top, tR.right, tR.bottom);
                }
            }

            DeleteObject(hRPen);
             */

UNKNOWN >>             Pen pen; //@@@: Pen pen;

            pen = new Pen(cColor.colorFromRGB(colorOut), width); //@@@: pen = new Pen(cColor.colorFromRGB(colorOut), width);

            if (dash) { //@@@: if (dash)
                pen.DashStyle = DashStyle.Dot; //@@@: pen.DashStyle = DashStyle.Dot;
            } //@@@: }

            if (rounded) { //@@@: if (rounded)
                y1 = y1 * m_scaleY; //@@@: y1 = y1 * m_scaleY;
                y2 = y2 * m_scaleY; //@@@: y2 = y2 * m_scaleY;
                x1 = x1 * m_scaleX; //@@@: x1 = x1 * m_scaleX;
                x2 = x2 * m_scaleX; //@@@: x2 = x2 * m_scaleX;

                let extGraph = new cGraphics(graph); //@@@: cGraphics extGraph = new cGraphics(graph);
                extGraph.DrawRoundRectangle(pen, x1, y1, x2-x1, y2-y1, 8f); //@@@: extGraph.DrawRoundRectangle(pen, x1, y1, x2-x1, y2-y1, 8f);
            } //@@@: }
            else { //@@@: else
                let rect = cGlobals.newRectangle(Convert.ToInt32(x1), Convert.ToInt32(y1), Convert.ToInt32(x2), Convert.ToInt32(y2)); //@@@: Rectangle rect = cGlobals.newRectangle(Convert.ToInt32(x1), Convert.ToInt32(y1), Convert.ToInt32(x2), Convert.ToInt32(y2));

                if (y2 !== y1 && x1 !== x2) { //@@@: if (y2 != y1 && x1 != x2)
                    if (filled) { //@@@: if (filled)
                        /* TODO: remove me after some testing //@@@: /* TODO: remove me after some testing
                         * 
                        if (!(rect.Height === 1 && filled))
                        {
                            rect.Inflate(-1, -1);
                        }
                        */
                        let brush = new SolidBrush(cColor.colorFromRGB(colorInside)); //@@@: Brush brush = new SolidBrush(cColor.colorFromRGB(colorInside));
                        graph.FillRectangle(brush, rect); //@@@: graph.FillRectangle(brush, rect);
                        brush.Dispose(); //@@@: brush.Dispose();
                    } //@@@: }

                    // the original version didn't put a border when the height is 20 twips
                    // we want to preserve that behaviour
                    //
                    if (!(rect.Height === 1 && filled)) { //@@@: if (!(rect.Height == 1 && filled))
                        graph.DrawRectangle(pen, rect); //@@@: graph.DrawRectangle(pen, rect);
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    if (rect.Height === 0 || rect.Bottom === rect.Top) { rect.Height = 1; } //@@@: if (rect.Height == 0 || rect.Bottom == rect.Top) { rect.Height = 1; }
                    if (rect.Width === 0 || rect.Left === rect.Right) { rect.Width = 1; } //@@@: if (rect.Width == 0 || rect.Left == rect.Right) { rect.Width = 1; }

                    graph.DrawRectangle(pen, rect); //@@@: graph.DrawRectangle(pen, rect);
                } //@@@: }
            } //@@@: }

            pen.Dispose(); //@@@: pen.Dispose();
        }; //@@@: }

        const printText = function(graph, sText, aspect, image) { //@@@: private void printText(Graphics graph, String sText, cReportAspect aspect, Image image)
            /* //@@@: /*
            // Para separarlo del borde
            Const(c_Margen_Y As Integer === 20);
            Const(c_Margen_X As Integer === 80);
            Const(c_Margen_Bottom As Integer === 80);

            StdFont oFont = null;
            oFont = new StdFont();
            RECT tR = null;

            int oldBkColor = 0;
            int oldBkMode = 0;
            int oldFontColor = 0;
            int flags = 0;

            cReportFont w_font = aspect.getFont();
                oFont.Name = w_font.getName();
                oFont.Bold = w_font.getBold();
                oFont.Italic = w_font.getItalic();
                oFont.UnderLine = w_font.getUnderLine();
                oFont.Size = (w_font.getSize() > 0) ? w_font.getSize() : 3);
            // {end with: w_font}

            int stringWidth = 0;
            int stringHeight = 0;
            int nWidth = 0;

            int hFntOld = 0;

            hFntOld = SelectObject(hDC, m_hFnt[mAux.addFontIfRequired(oFont, hDC, m_fontCount, m_fnt, m_hFnt)]);

            // With aspect;
                oldFontColor = SetTextColor(hDC, mAux.translateColor(aspect.getFont().getForeColor()));
                oldBkColor = SetBkColor(hDC, mAux.translateColor(aspect.getBackColor()));
                oldBkMode = SetBkMode(hDC, aspect.getTransparent() ? C_TRANSPARENT : C_OPAQUE));

                if (aspect.getWordWrap()) {
                    flags = ECGTextAlignFlags.DT_WORDBREAK || ECGTextAlignFlags.DT_WORD_ELLIPSIS || ECGTextAlignFlags.DT_LEFT || ECGTextAlignFlags.DT_NOPREFIX || ECGTextAlignFlags.DT_EDITCONTROL;
                } 
                else {
                    flags = ECGTextAlignFlags.DT_SINGLELINE || ECGTextAlignFlags.DT_WORD_ELLIPSIS || ECGTextAlignFlags.DT_LEFT || ECGTextAlignFlags.DT_NOPREFIX;
                }
            // {end with: aspect}

            stringWidth = getPlEvaluateTextWidth(sText, hDC, m_scaleX);
            stringHeight = getPlEvaluateTextHeight(sText, hDC, aspect.getWidth(), flags, m_scaleY, m_scaleX);

            // Esto es por seguridad, ya que
            // cuando imprimo en la impresora (en pantalla esto no pasa)
            // por pequeñas diferencias en la
            // proceso de escalar hasta la resolucion
            // de la impresora en algunos casos
            // pierdo parte del texto si el
            // rectangulo que pido es demasiado pequeño
            //
            stringHeight = stringHeight + 400;

            int margenX = 0;
            int margenY = 0;
            int width = 0;
            int height = 0;

            margenX = c_Margen_X;
            margenY = c_Margen_Y;

            if (hImage !== 0) {
                mAux.getBitmapSize(hImage, width, height);
                margenX = margenX + width;
                margenY = height - stringHeight - c_Margen_Bottom;
                // With aspect;
                    if (margenY + stringHeight > aspect.getHeight()) { margenY = aspect.getHeight() - stringHeight - c_Margen_Bottom; }
                // {end with: aspect}
                if (margenY < c_Margen_Y) { margenY = c_Margen_Y; }
            }

            nWidth = aspect.getWidth() - margenX * 2;
            if (stringWidth > nWidth) { stringWidth = nWidth; }

            int x = 0;
            int y = 0;

            switch (aspect.setAlign()) {
                case  AlignmentConstants.vbRightJustify:
                    x = aspect.getLeft() + aspect.getWidth() - stringWidth - margenX;
                    break;
                case  AlignmentConstants.vbCenter:
                    x = aspect.getLeft() + (aspect.getWidth() - stringWidth) * 0.5;
                    break;
                case  AlignmentConstants.vbLeftJustify:
                    x = aspect.getLeft() + margenX;
                    break;
            }

            y = aspect.getTop() - aspect.setOffset() + margenY;

            // With aspect;
                //'.Height)
                tR = cGlobals.newRectangle(x, y, x + aspect.getWidth() - margenX, y + stringHeight);
                mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
                //    If .WordWrap Then
                //      Flags = DT_WORDBREAK Or DT_WORD_ELLIPSIS Or DT_LEFT Or DT_NOPREFIX Or DT_EDITCONTROL
                //    Else
                //      Flags = DT_SINGLELINE Or DT_WORD_ELLIPSIS Or DT_LEFT Or DT_NOPREFIX
                //    End If
                DrawText(hDC, sText+ vbNullChar, -1, tR, flags);
            // {end with: aspect}

            SetBkColor(hDC, oldBkColor);
            SetTextColor(hDC, oldFontColor);
            SetBkMode(hDC, oldBkMode);

            SelectObject(hDC, hFntOld);
             */

            // padding
            self.int c_Margen_Y = 1; // 20 twips; //@@@: const int c_Margen_Y = 1; // 20 twips;
            self.int c_Margen_X = 4; // 80 twips; //@@@: const int c_Margen_X = 4; // 80 twips;
            self.int c_Margen_Bottom = 4; // 80 twips; //@@@: const int c_Margen_Bottom = 4; // 80 twips;

            let idx = cGlobals.addFontIfRequired(aspect.getFont(), m_fnt); //@@@: int idx = cGlobals.addFontIfRequired(aspect.getFont(), ref m_fnt);

            let font = m_fnt[idx]; //@@@: Font font = m_fnt[idx];

            let format = new StringFormat(); //@@@: StringFormat format = new StringFormat();

            format.Trimming = StringTrimming.EllipsisWord; //@@@: format.Trimming = StringTrimming.EllipsisWord;
            format.Alignment = StringAlignment.Near; //@@@: format.Alignment = StringAlignment.Near;

            if (!aspect.getWordWrap()) { //@@@: if (!aspect.getWordWrap()) {
                format.FormatFlags = StringFormatFlags.NoWrap; //@@@: format.FormatFlags = StringFormatFlags.NoWrap;
            } //@@@: }

            let stringWidth = getPlEvaluateTextWidth(sText, font, m_scaleX); //@@@: int stringWidth = getPlEvaluateTextWidth(sText, font, m_scaleX);
            let stringHeight = getPlEvaluateTextHeight(sText, font, aspect.getWidth(), format, m_scaleY, m_scaleX); //@@@: int stringHeight = getPlEvaluateTextHeight(sText, font, aspect.getWidth(), format, m_scaleY, m_scaleX);

            // TODO: translate this to English if it is really needed
            //
            // Esto es por seguridad, ya que
            // cuando imprimo en la impresora (en pantalla esto no pasa)
            // por pequeñas diferencias en la
            // proceso de escalar hasta la resolucion
            // de la impresora en algunos casos
            // pierdo parte del texto si el
            // rectangulo que pido es demasiado pequeño
            //
            stringHeight += 25; //+ 400 the original code was in twips; //@@@: stringHeight += 25; //+ 400 the original code was in twips;

            let margenX = c_Margen_X; //@@@: int margenX = c_Margen_X;
            let margenY = c_Margen_Y; //@@@: int margenY = c_Margen_Y;

            if (image !== null) { //@@@: if (image != null)
                margenX += image.Size.Width; //@@@: margenX += image.Size.Width;
                margenY = image.Size.Height - stringHeight - c_Margen_Bottom; //@@@: margenY = image.Size.Height - stringHeight - c_Margen_Bottom;

                if (margenY + stringHeight > aspect.getHeight())  { //@@@: if (margenY + stringHeight > aspect.getHeight())
                    margenY = Convert.ToInt32(aspect.getHeight() - stringHeight - c_Margen_Bottom); //@@@: margenY = Convert.ToInt32(aspect.getHeight() - stringHeight - c_Margen_Bottom);
                }                 //@@@: }
                if (margenY < c_Margen_Y)  { //@@@: if (margenY < c_Margen_Y)
                    margenY = c_Margen_Y; //@@@: margenY = c_Margen_Y;
                } //@@@: }
            } //@@@: }

            let nWidth = Convert.ToInt32(aspect.getWidth() - margenX * 2); //@@@: int nWidth = Convert.ToInt32(aspect.getWidth() - margenX * 2);

            if (stringWidth > nWidth)  { //@@@: if (stringWidth > nWidth)
                stringWidth = nWidth; //@@@: stringWidth = nWidth;
            } //@@@: }

            let x = 0; //@@@: int x = 0;
            let y = 0; //@@@: int y = 0;

            switch (aspect.getAlign()) //@@@: switch (aspect.getAlign())
            { //@@@: {
                case HorizontalAlignment.Right: //@@@: case HorizontalAlignment.Right:
                    x = Convert.ToInt32(aspect.getLeft() + aspect.getWidth() - stringWidth - margenX); //@@@: x = Convert.ToInt32(aspect.getLeft() + aspect.getWidth() - stringWidth - margenX);
                    break; //@@@: break;
                case HorizontalAlignment.Center: //@@@: case HorizontalAlignment.Center:
                    x = Convert.ToInt32(aspect.getLeft() + (aspect.getWidth() - stringWidth) * 0.5); //@@@: x = Convert.ToInt32(aspect.getLeft() + (aspect.getWidth() - stringWidth) * 0.5);
                    break; //@@@: break;
                case HorizontalAlignment.Left: //@@@: case HorizontalAlignment.Left:
                    x = Convert.ToInt32(aspect.getLeft() + margenX); //@@@: x = Convert.ToInt32(aspect.getLeft() + margenX);
                    break; //@@@: break;
            } //@@@: }

            y = Convert.ToInt32(aspect.getTop() - aspect.getOffset() + margenY); //@@@: y = Convert.ToInt32(aspect.getTop() - aspect.getOffset() + margenY);

            let rect = cGlobals.newRectangleF(x, y, Convert.ToInt32(x + aspect.getWidth() - margenX), y + stringHeight); //@@@: RectangleF rect = cGlobals.newRectangleF(x, y, Convert.ToInt32(x + aspect.getWidth() - margenX), y + stringHeight);

            let brush = new SolidBrush(cColor.colorFromRGB(aspect.getFont().getForeColor())); //@@@: SolidBrush brush = new SolidBrush(cColor.colorFromRGB(aspect.getFont().getForeColor()));

            graph.DrawString(sText, font, brush, rect, format); //@@@: graph.DrawString(sText, font, brush, rect, format);

            brush.Dispose(); //@@@: brush.Dispose();
        }; //@@@: }

        const showHandles = function( //@@@: private void showHandles(
            graph,  //@@@: Graphics graph,
            x1,  //@@@: int x1,
            y1,  //@@@: int y1,
            x2,  //@@@: int x2,
            y2,  //@@@: int y2,
            color,  //@@@: int color,
            bCircle) { //@@@: bool bCircle)
            /* //@@@: /*
            const int iSize = 100;
            int hBrush = 0;
            RECT tR = null;
            int x = 0;
            int y = 0;

            int hOldBrush = 0;
            int hOldPen = 0;
            int hPen = 0;

            hBrush = CreateSolidBrush(mAux.translateColor(color));

            if (bCircle)
            {
                hPen = CreatePen(PS_SOLID, 1, mAux.translateColor(color));
                hOldPen = SelectObject(hDC, hPen);
                hOldBrush = SelectObject(hDC, hBrush);
            }

            if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; }

            if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; }

            tR = cGlobals.newRectangle(x1 - iSize, y1 - iSize - 10, x1, y1);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x1 - iSize, y2, x1, y2 + iSize);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x2, y1 - iSize - 10, x2 + iSize, y1);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x2, y2, x2 + iSize, y2 + iSize);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            x = x1 +  / 2;
            x = x - iSize / 2;
            tR = cGlobals.newRectangle(x, y2, x + iSize, y2 + iSize);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x, y1 - iSize - 10, x + iSize, y1);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            y = y1 +  / 2;
            y = y - iSize / 2;
            tR = cGlobals.newRectangle(x1 - iSize, y, x1, y + iSize);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x2, y, x2 + iSize, y + iSize);
            mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            if (bCircle)
            {
                DeleteObject(SelectObject(hDC, hOldPen));
                DeleteObject(SelectObject(hDC, hOldBrush));
            }

            else
            {
                DeleteObject(hBrush);
            }
            */
            self.int iSize = 7; //@@@: const int iSize = 7;

            if (x1 - iSize < 0) { x1 = iSize; } //@@@: if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; } //@@@: if (y1 - iSize < 0) { y1 = iSize; }

            if (x1 - iSize < 0) { x1 = iSize; } //@@@: if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; }             //@@@: if (y1 - iSize < 0) { y1 = iSize; }

            let brush = new SolidBrush(cColor.colorFromRGB(color)); //@@@: Brush brush = new SolidBrush(cColor.colorFromRGB(color));

            let rect = cGlobals.newRectangle(x1 - iSize, y1 - iSize - 1, x1, y1); //@@@: Rectangle rect = cGlobals.newRectangle(x1 - iSize, y1 - iSize - 1, x1, y1);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x1 - iSize, y2, x1, y2 + iSize); //@@@: rect = cGlobals.newRectangle(x1 - iSize, y2, x1, y2 + iSize);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y1 - iSize - 1, x2 + iSize, y1); //@@@: rect = cGlobals.newRectangle(x2, y1 - iSize - 1, x2 + iSize, y1);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y2, x2 + iSize, y2 + iSize); //@@@: rect = cGlobals.newRectangle(x2, y2, x2 + iSize, y2 + iSize);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            let x = Convert.ToInt32((x1 +  / 2f) - iSize / 2f); //@@@: int x = Convert.ToInt32((x1 + (x2 - x1) / 2f) - iSize / 2f);
            rect = cGlobals.newRectangle(x, y2, x + iSize, y2 + iSize); //@@@: rect = cGlobals.newRectangle(x, y2, x + iSize, y2 + iSize);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x, y1 - iSize - 1, x + iSize, y1); //@@@: rect = cGlobals.newRectangle(x, y1 - iSize - 1, x + iSize, y1);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            let y = Convert.ToInt32((y1 +  / 2f) - iSize / 2f); //@@@: int y = Convert.ToInt32((y1 + (y2 - y1) / 2f) - iSize / 2f);
            rect = cGlobals.newRectangle(x1 - iSize, y, x1, y + iSize); //@@@: rect = cGlobals.newRectangle(x1 - iSize, y, x1, y + iSize);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y, x2 + iSize, y + iSize); //@@@: rect = cGlobals.newRectangle(x2, y, x2 + iSize, y + iSize);
            showHandle(graph, brush, rect, bCircle); //@@@: showHandle(graph, brush, rect, bCircle);

            brush.Dispose(); //@@@: brush.Dispose();
        }; //@@@: }

        const showHandle = function(graph, brush, rect, circle) { //@@@: private void showHandle(Graphics graph, Brush brush, Rectangle rect, bool circle)
            if (circle) { //@@@: if (circle)
                graph.FillEllipse(brush, rect); //@@@: graph.FillEllipse(brush, rect);
            } //@@@: }
            else { //@@@: else
                graph.FillRectangle(brush, rect); //@@@: graph.FillRectangle(brush, rect);
            } //@@@: }
        }; //@@@: }

        self.paintPicture = function(graph, disposeGraphicObject) { //@@@: public void paintPicture(Graphics graph, bool disposeGraphicObject)
            /* //@@@: /*
            RECT tR = null;

            GetClientRect(graph.hwnd, tR);

            if (m_zoom === 100)
            {
                BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, m_hMemDC, 0, 0, vbSrcCopy);
            }
            else
            {
                int width = 0;
                int height = 0;
                int oldStrMode = 0;
                POINTAPI lrPoint = null;

                mAux.getBitmapSize(m_hBmpCopy, width, height, false);

                oldStrMode = SetStretchBltMode(graph.hDC, STRETCH_HALFTONE);

                StretchBlt(graph.hDC, 0, 0, tR.right, tR.bottom, m_hMemDC, 0, 0, width, height, vbSrcCopy);
                SetStretchBltMode(graph.hDC, oldStrMode);
            }

            int i = 0;

            for (i = 1; i <= m_vSelectedKeys.Length; i++)
            {
                setFocusAux(m_vSelectedKeys[i], graph);
            }
            */

            let rect = cGlobals.newRectangle(0, 0, m_bitmap.Size.Width, m_bitmap.Size.Height); //@@@: Rectangle rect = cGlobals.newRectangle(0, 0, m_bitmap.Size.Width, m_bitmap.Size.Height);
            if (m_zoom === 100) { //@@@: if (m_zoom == 100)
                //BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, m_hMemDC, 0, 0, vbSrcCopy);
                graph.DrawImage(m_bitmap, rect, rect, GraphicsUnit.Pixel); //@@@: graph.DrawImage(m_bitmap, rect, rect, GraphicsUnit.Pixel);
            } //@@@: }
            else { //@@@: else

            } //@@@: }
            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++)
                setFocusAux(m_vSelectedKeys[i], graph); //@@@: setFocusAux(m_vSelectedKeys[i], graph);
            } //@@@: }

            if (disposeGraphicObject) { //@@@: if (disposeGraphicObject)
                graph.Dispose(); //@@@: graph.Dispose();
            } //@@@: }
        }; //@@@: }

        self.beginMove = function() { //@@@: public void beginMove()
            if (m_beginMoveDone) { return; } //@@@: if (m_beginMoveDone) { return; }

            m_beginMoveDone = true; //@@@: m_beginMoveDone = true;

            let graphic = Graphics.FromImage(m_bitmap); //@@@: Graphics graphic = Graphics.FromImage(m_bitmap);
            for(var i = 0; i < m_vSelectedKeys.Length; i++) { //@@@: for (int i = 0; i < m_vSelectedKeys.Length; i++)
                setFocusAux(m_vSelectedKeys[i], graphic); //@@@: setFocusAux(m_vSelectedKeys[i], graphic);
            } //@@@: }
            graphic.Dispose(); //@@@: graphic.Dispose();
        }; //@@@: }

        const paintPictureMove = function(graph, tR) { //@@@: private void paintPictureMove(Graphics graph, RectangleF tR)
            /* //@@@: /*
                      InflateRect(tR, 3, 3);

                      if (tR.left < 0) { tR.left = 0; }
                      if (tR.top < 0) { tR.top = 0; }

                      if (tR.right > graph.Width) {
                          tR.right = graph.Width;
                      }

                      if (tR.bottom > graph.Height) {
                          tR.bottom = graph.Height - tR.top;
                      }

                      InflateRect(tR, 3, 3);

                      mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);

                      BitBlt(graph.hDC, tR.left, tR.top, tR.right - tR.left, tR.bottom - tR.top, m_hMemDC, tR.left, tR.top, vbSrcCopy);
             * */
            let rect = cGlobals.newRectangle(0, 0, m_bitmap.Size.Width, m_bitmap.Size.Height); //@@@: Rectangle rect = cGlobals.newRectangle(0, 0, m_bitmap.Size.Width, m_bitmap.Size.Height);
            if (m_zoom === 100) { //@@@: if (m_zoom == 100)
                //BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, m_hMemDC, 0, 0, vbSrcCopy);
                graph.DrawImage(m_bitmap, rect, rect, GraphicsUnit.Pixel); //@@@: graph.DrawImage(m_bitmap, rect, rect, GraphicsUnit.Pixel);
            } //@@@: }
        }; //@@@: }

        // grid
        //
        const pCreateBrushGrid = function(graph, typeGrid) { //@@@: private void pCreateBrushGrid(Graphics graph, csETypeGrid typeGrid)
            /* //@@@: /*
            int i = 0;
            int hBmp = 0;
            int hMemDC = 0;
            int hBrush = 0;

            hMemDC = CreateCompatibleDC(0);
            hBmp = CreateCompatibleBitmap(graph.hDC, 10, 10);
            SelectObject(hMemDC, hBmp);

            hBrush = CreateSolidBrush(mAux.translateColor(vbWhite));
            FillRect(hMemDC, cGlobals.newRectangle(0, 0, 10, 10), hBrush);

            switch (typeGrid)
            {
                case csEGridLines:
                    for (i = 1; i <= 10; i++)
                    {
                        SetPixel(hMemDC, 0, i, mAux.translateColor(&HC0C0C0));
                        SetPixel(hMemDC, i, 0, mAux.translateColor(&HC0C0C0));
                    }
                    break;
                case csEGridPoints:
                    SetPixel(hMemDC, 1, 1, mAux.translateColor(vbBlack));
                    break;
                case csEGridLinesHorizontal:
                    for (i = 0; i <= 10; i++)
                    {
                        SetPixel(hMemDC, i, 0, mAux.translateColor(&HC0C0C0));
                    }
                    break;
                case csEGridLinesVertical:
                    for (i = 0; i <= 10; i++)
                    {
                        SetPixel(hMemDC, 0, i, mAux.translateColor(&HC0C0C0));
                    }
                    break;
            }


            m_hBrushGrid = CreatePatternBrush(hBmp);
            DeleteObject(hMemDC);
            DeleteObject(hBmp);
            DeleteObject(hBrush);
             */

            switch (typeGrid) //@@@: switch (typeGrid)
            { //@@@: {
                case csETypeGrid.CSEGRIDLINES: //@@@: case csETypeGrid.CSEGRIDLINES:
                    m_brushGrid = new HatchBrush( //@@@: m_brushGrid = new HatchBrush(
                                            HatchStyle.Cross, //@@@: HatchStyle.Cross,
                                            cColor.colorFromRGB(0xC0C0C0), //@@@: cColor.colorFromRGB(0xC0C0C0),
                                            Color.White); //@@@: Color.White);
                    break; //@@@: break;
                case csETypeGrid.CSEGRIDPOINTS: //@@@: case csETypeGrid.CSEGRIDPOINTS:
                    m_brushGrid = new HatchBrush( //@@@: m_brushGrid = new HatchBrush(
                                            HatchStyle.DottedGrid, //@@@: HatchStyle.DottedGrid,
                                            cColor.colorFromRGB(0xC0C0C0), //@@@: cColor.colorFromRGB(0xC0C0C0),
                                            Color.White); //@@@: Color.White);
                    break; //@@@: break;
                case csETypeGrid.CSEGRIDLINESHORIZONTAL: //@@@: case csETypeGrid.CSEGRIDLINESHORIZONTAL:
                    m_brushGrid = new HatchBrush( //@@@: m_brushGrid = new HatchBrush(
                                            HatchStyle.Horizontal, //@@@: HatchStyle.Horizontal,
                                            cColor.colorFromRGB(0xC0C0C0), //@@@: cColor.colorFromRGB(0xC0C0C0),
                                            Color.White); //@@@: Color.White);
                    break; //@@@: break;
                case csETypeGrid.CSEGRIDLINESVERTICAL: //@@@: case csETypeGrid.CSEGRIDLINESVERTICAL:
                    m_brushGrid = new HatchBrush( //@@@: m_brushGrid = new HatchBrush(
                                            HatchStyle.Vertical, //@@@: HatchStyle.Vertical,
                                            cColor.colorFromRGB(0xC0C0C0), //@@@: cColor.colorFromRGB(0xC0C0C0),
                                            Color.White); //@@@: Color.White);
                    break; //@@@: break;
                case csETypeGrid.CSEGRIDNONE: //@@@: case csETypeGrid.CSEGRIDNONE:
                    m_brushGrid = new HatchBrush( //@@@: m_brushGrid = new HatchBrush(
                                            HatchStyle.DottedGrid, //@@@: HatchStyle.DottedGrid,
                                            cColor.colorFromRGB(0xCCCCCC), //@@@: cColor.colorFromRGB(0xCCCCCC),
                                            Color.White); //@@@: Color.White);
                    break; //@@@: break;
            } //@@@: }
        }; //@@@: }

        //
        //
        const getPlEvaluateTextWidth = function(text, font, scaleX) { //@@@: private int getPlEvaluateTextWidth(String text, Font font, float scaleX)
            let graph = Graphics.FromImage(m_bitmap); //@@@: Graphics graph = Graphics.FromImage(m_bitmap);
            let stringSize = graph.MeasureString(text, font); //@@@: SizeF stringSize = graph.MeasureString(text, font);
            graph.Dispose(); //@@@: graph.Dispose();
            return Convert.ToInt32(stringSize.Width / scaleX); // TODO: check if it is / or * //@@@: return Convert.ToInt32(stringSize.Width / scaleX); // TODO: check if it is / or *
        }; //@@@: }

        const getPlEvaluateTextHeight = function(text, font, width, format, scaleY, scaleX) { //@@@: private int getPlEvaluateTextHeight(String text, Font font, float width, StringFormat format, float scaleY, float scaleX)
            let graph = Graphics.FromImage(m_bitmap); //@@@: Graphics graph = Graphics.FromImage(m_bitmap);
            let stringSize = graph.MeasureString(text, font, Convert.ToInt32(width * scaleX), format); //@@@: SizeF stringSize = graph.MeasureString(text, font, Convert.ToInt32(width * scaleX), format);
            graph.Dispose(); //@@@: graph.Dispose();
            return Convert.ToInt32(stringSize.Height / scaleY); // TODO: check if it is / or * the same function in cReportPrint is using * one has to be wrong //@@@: return Convert.ToInt32(stringSize.Height / scaleY); // TODO: check if it is / or * the same function in cReportPrint is using * one has to be wrong
        }; //@@@: }

        const pClearObject = function(key, graph) { //@@@: private void pClearObject(String key, Graphics graph)
            let oPaintObj = null; //@@@: cReportPaintObject oPaintObj = null;

            oPaintObj = m_paintObjects.item(key); //@@@: oPaintObj = m_paintObjects.item(key);

            if (oPaintObj === null) { return; } //@@@: if (oPaintObj == null) { return; }

            let w_aspect = oPaintObj.getAspect(); //@@@: cReportAspect w_aspect = oPaintObj.getAspect();
            let tR = cGlobals.newRectangleF(w_aspect.getLeft(), w_aspect.getTop(), w_aspect.getLeft() + w_aspect.getWidth(), w_aspect.getTop() + w_aspect.getHeight()); //@@@: RectangleF tR = cGlobals.newRectangleF(w_aspect.getLeft(), w_aspect.getTop(), w_aspect.getLeft() + w_aspect.getWidth(), w_aspect.getTop() + w_aspect.getHeight());

            if (tR.Right > graph.ClipBounds.Width) { tR.Width = cGlobals.setRectangleWidth(graph.ClipBounds.Width - tR.Left); } //@@@: if (tR.Right > graph.ClipBounds.Width) { tR.Width = cGlobals.setRectangleWidth(graph.ClipBounds.Width - tR.Left); }
            if (tR.Bottom > graph.ClipBounds.Height) { tR.Height = cGlobals.setRectangleHeight(graph.ClipBounds.Height - tR.Top); } //@@@: if (tR.Bottom > graph.ClipBounds.Height) { tR.Height = cGlobals.setRectangleHeight(graph.ClipBounds.Height - tR.Top); }

            //TODO: check
            //mAux.rectTwipsToPixel(tR, m_scaleX, m_scaleY);

            // TODO: replace api call
            /* //@@@: /*
            int hBr = 0;
            hBr = CreateSolidBrush(mAux.translateColor(vbWhite));
            FillRect(hDC, tR, hBr);
            DeleteObject(hBr);
             */ 
        }; //@@@: }

        const pDrawObjBox = function( //@@@: private void pDrawObjBox(
            graph,  //@@@: Graphics graph,
            aspect,  //@@@: cReportAspect aspect,
            x1,  //@@@: float x1,
            y1,  //@@@: float y1,
            x2,  //@@@: float x2,
            y2,  //@@@: float y2,
            filled,  //@@@: bool filled,
            colorIn,  //@@@: int colorIn,
            colorOut) { //@@@: int colorOut)

            // m_notBorder is used by preview and printing to indicate the controls must be print a border only
            // when BorderType !== NONE
            // 
            if ( || (aspect.getBorderType() !== csReportBorderType.CSRPTBSNONE)) { //@@@: if ((m_notBorder == false || filled) || (aspect.getBorderType() != csReportBorderType.CSRPTBSNONE))
                if (aspect.getBorderType() === csReportBorderType.CSRPTBS3D) { //@@@: if (aspect.getBorderType() == csReportBorderType.CSRPTBS3D)

                    printLine(graph, filled, x1, y1, x2, y2, colorIn, 0, false, (int)csColors.C_COLOR_WHITE, false); //@@@: printLine(graph, filled, x1, y1, x2, y2, colorIn, 0, false, (int)csColors.C_COLOR_WHITE, false);

                    // top
                    //
                    printLine(graph, false, x1, y1, x2, y1, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false); //@@@: printLine(graph, false, x1, y1, x2, y1, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false);
                    // down
                    //
                    printLine(graph, false, x1, y2 - 1, x2, y2 - 1, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false); //@@@: printLine(graph, false, x1, y2 - 1, x2, y2 - 1, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false);
                    // left
                    //
                    printLine(graph, false, x1 + 1, y1, x1 + 1, y2, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false); //@@@: printLine(graph, false, x1 + 1, y1, x1 + 1, y2, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false);
                    // right
                    //
                    printLine(graph, false, x2 - 1, y1, x2 - 1, y2, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false); //@@@: printLine(graph, false, x2 - 1, y1, x2 - 1, y2, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false);
                } //@@@: }
                else if (aspect.getBorderRounded()) { //@@@: else if (aspect.getBorderRounded())
                    printLine(graph, filled, x1, y1, x2, y2, colorIn, (int)aspect.getBorderWidth(), false, colorOut, true); //@@@: printLine(graph, filled, x1, y1, x2, y2, colorIn, (int)aspect.getBorderWidth(), false, colorOut, true);
                } //@@@: }
                else { //@@@: else
                    //
                    // we are in the editor window
                    //
                    // TODO: this is a bug. Then only way to get a border is setting BorderType to CSRPTBS3D or 
                    //       BorderRounded === TRUE
                    //
                    //       when BorderType === CSRPTBSFIXED the border is not drawn
                    //
                    //       we need to fix it but the fix will break all reports so first we need to update
                    //       those reports to set the BorderType to CSRPTBSNONE
                    //
                    let dash = false; //@@@: bool dash = false;
                    self.int borderWidth = 1; //@@@: const int borderWidth = 1;

                    if (m_notBorder === false  //@@@: if (m_notBorder == false
                            && ( //@@@: && (
                                ( //@@@: (
                                    aspect.getBorderType() === csReportBorderType.CSRPTBSFIXED  //@@@: aspect.getBorderType() == csReportBorderType.CSRPTBSFIXED
                                    && !aspect.getBorderRounded() //@@@: && !aspect.getBorderRounded()
                                    && aspect.getBorderWidth() === 0 //@@@: && aspect.getBorderWidth() == 0
                                ) //@@@: )
                                || aspect.getBorderType() === csReportBorderType.CSRPTBSNONE //@@@: || aspect.getBorderType() == csReportBorderType.CSRPTBSNONE
                            ) //@@@: )
                        ) { //@@@: )
                        colorOut = Color.Gray.ToArgb(); // 0xff9966; //Color.LightGray.ToArgb(); //@@@: colorOut = Color.Gray.ToArgb(); // 0xff9966; //Color.LightGray.ToArgb();
                        dash = true; //@@@: dash = true;
                    } //@@@: }

                    // TODO: clean this. we have many issues with this code. the value 16777215 is white
                    //       it is used in cairo reports. when a control has a background (colorIn) === white
                    //       we must not call printLine
                    //
                    if (!m_notBorder  //@@@: if (!m_notBorder
                        || (filled && colorIn !== 16777215) // this is the value of white controls in cairo reports. //@@@: || (filled && colorIn != 16777215) // this is the value of white controls in cairo reports.
                        || (aspect.getBorderType() === csReportBorderType.CSRPTBSFIXED && aspect.getBorderWidth() > 0)) { //@@@: || (aspect.getBorderType() == csReportBorderType.CSRPTBSFIXED && aspect.getBorderWidth() > 0))
                        printLine(graph, filled, x1, y1, x2, y2, colorIn, borderWidth, dash, colorOut, false); //@@@: printLine(graph, filled, x1, y1, x2, y2, colorIn, borderWidth, dash, colorOut, false);
                    } //@@@: }
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.getBitmap = function() { //@@@: public Image getBitmap()
            return m_bitmap; //@@@: return m_bitmap;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }


/*); //@@@: /*

http://stackoverflow.com/questions/7507602/best-practice-for-onpaint-invalidate-clipping-and-regions(globalObject));

Since a lot of people are viewing this question I will go ahead and answer it to the best of my current knowledge.(globalObject));

The Graphics class supplied with PaintEventArgs is always hard-clipped by the invalidation request. This is usually done by the operating system, but it can be done by your code.(globalObject));

You can't reset this clip or escape from these clip bounds, but you shouldn't need to. When painting, you generally shouldn't care about how it's being clipped unless you desperately need to maximize performance.(globalObject));

The graphics class uses a stack of containers to apply clipping and transformations. You can extend this stack yourself by using Graphics.BeginContainer and Graphics.EndContainer. Each time you begin a container, any changes you make to the Transform or the Clip are temporary and they are applied after any previous Transform or Clip which was configured before the BeginContainer. So essentially, when you get an OnPaint event it has already been clipped and you are in a new container so you can't see the clip (your Clip region or ClipRect will show as being infinite) and you can't break of those clip bounds.(globalObject));

When the state of your visual objects change (for example, on mouse or keyboard events or reacting to data changes), it's normally fine to simply call Invalidate() which will repaint the entire control. Windows will call OnPaint during moments of low CPU usage. Each call to Invalidate() usually will not always correspond to an OnPaint event. Invalidate could be called multiple times before the next paint. So if 10 properties in your data model change all at once, you can safely call Invalidate 10 times on each property change and you'll likely only trigger a single OnPaint event.(globalObject));

I've noticed you should be careful with using Update() and Refresh(). These force a synchronous OnPaint immediately. They're useful for drawing during a single threaded operation (updating a progress bar perhaps), but using them at the wrong times could lead to excessive and unnecessary painting.(globalObject));

If you want to use clip rectangles to improve performance while repainting a scene, you need not keep track of an aggregated clip area yourself. Windows will do this for you. Just invalidate a rectangle or a region that requires invalidation and paint as normal. For example, if an object that you are painting is moved, each time you want to invalidate it's old bounds and it's new bounds, so that you repaint the background where it originally was in addition to painting it in its new location. You must also take into account pen stroke sizes, etc.(globalObject));

And as Hans Passant mentioned, always use 32bppPArgb as the bitmap format for high resolution images. Here's a code snippet on how to load an image as "high performance":(globalObject));

public static Bitmap GetHighPerformanceBitmap(Image original));
{(globalObject));
Bitmap bitmap;(globalObject));

bitmap = new Bitmap(original.Width, original.Height, PixelFormat.Format32bppPArgb);(globalObject));
bitmap.SetResolution(original.HorizontalResolution, original.VerticalResolution);(globalObject));

using (Graphics g = Graphics.FromImage(bitmap)));
{(globalObject));
g.DrawImage(original, new Rectangle(new Point(0, 0), bitmap.Size), new Rectangle(new Point(0, 0), bitmap.Size), GraphicsUnit.Pixel);(globalObject));
}(globalObject));

return bitmap;(globalObject));
}(globalObject));

*/(globalObject));