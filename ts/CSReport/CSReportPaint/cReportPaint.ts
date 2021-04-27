

namespace CSReportPaint
{

    export class cReportPaint {


    {

        private C_MODULE: string = "cReportPaint";

        private C_GRID_AREA_WIDTH: number = 200;
        private C_GRID_AREA_HEIGHT: number = 67;

        private C_KEY_PAINT_OBJ: string = "P";
        private C_KEY_PAINT_SEC: string = "S";

        private paintObjects: cReportPaintObjects = new cReportPaintObjects();
        private paintSections: cReportPaintObjects = new cReportPaintObjects();
        private paintGridAreas: cReportPaintObjects = new cReportPaintObjects();

        private nextKey: number = 0;
        private brushGrid: HatchBrush = null;

        private x1: number = 0;
        private y1: number = 0;
        private y2: number = 0;
        private x2: number = 0;

        private x1Ex: number = 0;
        private y1Ex: number = 0;
        private y2Ex: number = 0;
        private x2Ex: number = 0;

        private beginMoveDone: boolean = null;

        private keyFocus: string = "";
        private vGridObjs: String[,] = null;
        private notBorder: boolean = null;

        private fnt: Font[] = null;

        private gridHeight: number = 0;

        private vSelectedKeys: string[] = null;

        private zoom: number = 0;

        private scaleX: number = 0;
        private scaleY: number = 0;

        private bitmap: Bitmap = null;

        public constructor() {
            try  {
                this.scaleX = 1;
                this.scaleY = 1;

                this.vGridObjs, 0 = [];
                cGlobals.redim(this.fnt, 0);
                this.vSelectedKeys = [];

                this.zoom = 100;
            } 
            catch (ex) {
                public "constructor",: cError.mngError(ex, = null;C_MODULE, "");
            }
        }

        public setGridHeight(rhs: number) {
            this.gridHeight = rhs;
        }

        public getPaintSections() {
            return this.paintSections;
        }

        public getPaintObjects() {
            return this.paintObjects;
        }


        public getNotBorder() {
            return this.notBorder;
        }

        public setNotBorder(rhs: boolean) {
            this.notBorder = rhs;
        }

        public getZoom() {
            return this.zoom;
        }

        public setZoom(rhs: number) {
            this.zoom = rhs;
        }

        public setScaleY(rhs: number) {
            this.scaleY = rhs;
        }

        public setScaleX(rhs: number) {
            this.scaleX = rhs;
        }

        public getScaleY() {
            return this.scaleY;
        }

        public getScaleX() {
            return this.scaleX;
        }

        /*
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
        public getPaintObject(sKey: string) {
            if (cUtil.substring(sKey, 0, C_KEY_PAINT_OBJ.length) === C_KEY_PAINT_OBJ) {
                return this.paintObjects.item(sKey);
            }
            else {
                return this.paintSections.item(sKey);
            }
        }

        public getPaintObjectForTag(tag: string) {
            for(let i = 0; i < this.paintObjects.count(); i++) {
                let paintObj: cReportPaintObject = this.paintObjects.item(i);
                if (paintObj.getTag() === tag) {
                    return paintObj;
                }
            }
            return null;
        }

        public getPaintSectionForTag(tag: string) {
            for(let i = 0; i < this.paintSections.count(); i++) {
                let paintObj: cReportPaintObject = this.paintSections.item(i);
                if (paintObj.getTag() === tag) {
                    return paintObj;
                }
            }
            return null;
        }

        public getNewObject(paintTypeObject: csRptPaintObjType) {
            let key: string = "";
            key = getKeyPaintObj();
            let paintObj: cReportPaintObject = null;
            paintObj = this.paintObjects.add(paintObj, key);
            paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject);
            return paintObj;
        }

        public getNewSection(paintTypeObject: csRptPaintObjType) {
            let key: string = "";
            key = getKeyPaintSec();
            let paintObj: cReportPaintObject = null;
            paintObj = this.paintSections.add(paintObj, key);
            paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject);
            return paintObj;
        }

        public paintObjIsSection(sKey: string) {
            return sKey.substring(0, C_KEY_PAINT_SEC.length) === C_KEY_PAINT_SEC;
        }

		public pointIsInObject(x: number, y: number, sKey: string) {
			let regionType: csRptPaintRegionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;
			return pointIsInObject(x, y, sKey, regionType);
		}

		public pointIsInObject(x: number, y: number, sKey: string, regionType: csRptPaintRegionType) {
            if (pointIsInObjectAux(this.paintSections, x, y, sKey, regionType)) {
                return true;
            }
            if (pointIsInObjectAux(this.paintObjects, x, y, sKey, regionType)) {
                return true;
            }
            return false;
        }

        public pointIsInThisObject(x: number, y: number, sKey: string, regionType: csRptPaintRegionType) {
            if (pointIsInThisObjectAux(this.paintObjects.item(sKey), x, y, sKey, regionType)) {
                return true;
            }
            if (pointIsInThisObjectAux(this.paintObjects.item(sKey), x, y, sKey, regionType)) {
                return true;
            }
            return false;
        }

        private pointIsInObjectAux(
            paintObjs: cReportPaintObjects
            x: number
            y: number
            sKey: string
            regionType: csRptPaintRegionType) {
            for(let i = paintObjs.count()-1; i > -1; i--) {
                if (pointIsInThisObjectAux(paintObjs.getNextPaintObjForZOrder(i), x, y, sKey, regionType)) {
                    return true;
                }
            }
            return false;
        }

        private pointIsInThisObjectAux(
            paintObj: cReportPaintObject
            x: number
            y: number
            sKey: string
            regionType: csRptPaintRegionType) {
        { /* ByRef PaintObj As cReportPaintObject, 
           * ByVal x As Single, 
           * ByVal y As Single, 
           * ByRef sKey As String, 
           * Optional ByRef RegionType As csRptPaintRegionType */

            public C_WIDTH_REGION: number = 3;

            let yY: number = 0;
            let xX: number = 0;

            let top: number = 0;
            let height: number = 0;
            let width: number = 0;
            let left: number = 0;

            if (paintObj === null) {
                return false;
            }
            else {
                let w_aspect: cReportAspect = paintObj.getAspect();
                left = w_aspect.getLeft();
                width = w_aspect.getWidth();
                top = w_aspect.getTop() - w_aspect.getOffset();
                height = w_aspect.getHeight();

                if (pointIsInRegion(left - C_WIDTH_REGION,
                                    top - C_WIDTH_REGION,
                                    left + width + C_WIDTH_REGION,
                                    top + height + C_WIDTH_REGION,
                                    x, y)) {
                    sKey = paintObj.getKey();

                    yY = top + height / 2;
                    yY = yY - C_WIDTH_REGION;

                    xX = left + width / 2;
                    xX = xX - C_WIDTH_REGION;

                    // we need to know in which region it is
                    //

                    // body
                    //
                    if (pointIsInRegion(left + C_WIDTH_REGION,
                                        top + C_WIDTH_REGION,
                                        left + width - C_WIDTH_REGION,
                                        top + height - C_WIDTH_REGION,
                                        x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;
                    }
                    // Left
                    else if (pointIsInRegion(left - C_WIDTH_REGION * 2,
                                                yY,
                                                left + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFT;
                    }
                    // Rigth
                    else if (pointIsInRegion(left + width - C_WIDTH_REGION * 2,
                                                yY,
                                                left + width + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHT;
                    }
                    // Up
                    else if (pointIsInRegion(xX,
                                                top - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2,
                                                top + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEUP;
                    }
                    // Down
                    else if (pointIsInRegion(xX,
                                                top + height - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2,
                                                top + height + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEDOWN;
                    }
                    // LeftUp
                    else if (pointIsInRegion(left - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP;
                    }
                    // LeftDown
                    else if (pointIsInRegion(left - C_WIDTH_REGION,
                                                top + height - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION,
                                                top + height + C_WIDTH_REGION,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN;
                    }
                    // RigthUp
                    else if (pointIsInRegion(left + width - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION,
                                                left + width + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP;
                    }
                    // RitgthDown
                    else if (pointIsInRegion(left + width - C_WIDTH_REGION,
                                                top + height - C_WIDTH_REGION,
                                                left + width + C_WIDTH_REGION,
                                                top + height + C_WIDTH_REGION,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN;
                    }

                    return true;
                }
                else {
                    return false;
                }
            }
        }

        private getKeyPaintObj() {
            this.nextKey = this.nextKey + 1;
            return C_KEY_PAINT_OBJ + this.nextKey;
        }

        private getKeyPaintSec() {
            this.nextKey = this.nextKey + 1;
            return C_KEY_PAINT_SEC + this.nextKey;
        }

        private getKey() {
            this.nextKey = this.nextKey + 1;
            return "K" + this.nextKey;
        }

        private pointIsInRegion(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
            return x >= x1 && x <= x2 && y >= y1 && y <= y2;
        }

        // we have four points for every region. we need to know if at least one point
        // of region A is in region B or viceversa
        //
        private regionIsInRegion(
            x1: number
            y1: number
            x2: number
            y2: number
            z1: number
            w1: number
            z2: number
            w2: number) {
            // first B in A
            //
            if (x1 <= z1 && x2 >= z1 && w1 <= y1 && w2 >= y1) {
                return true;
            }
            if (x1 <= z2 && x2 >= z2 && w1 <= y1 && w2 >= y1) {
                return true;
            }
            if (x1 <= z1 && x2 >= z1 && w1 <= y2 && w2 >= y2) {
                return true;
            }
            if (x1 <= z2 && x2 >= z2 && w1 <= y2 && w2 >= y2) {
                return true;
            }
            // then A in B
            //
            if (z1 <= x1 && z2 >= x1 && y1 <= w1 && y2 >= w1) {
                return true;
            }
            if (z1 <= x2 && z2 >= x2 && y1 <= w1 && y2 >= w1) {
                return true;
            }
            if (z1 <= x1 && z2 >= x1 && y1 <= w2 && y2 >= w2) {
                return true;
            }
            if (z1 <= x2 && z2 >= x2 && y1 <= w2 && y2 >= w2) {
                return true;
            }
            return false;
        }

        //-----------------------------------------------------------------------------------------------
        // Grid
        //
        public initGrid(picGrid: Graphics, typeGrid: csETypeGrid) {
            let x: number = 0;
            let y: number = 0;
            let c: cReportPaintObject = null;
            let top: number = 0;
            let left: number = 0;
            let i: number = 0;

            pCreateBrushGrid(picGrid, typeGrid);

            y = (picGrid.VisibleClipBounds.Height / C_GRID_AREA_HEIGHT);
            x = (picGrid.VisibleClipBounds.Width / C_GRID_AREA_WIDTH);

            x = x + 1;
            y = y + 1;

            G.redim(this.vGridObjs, x, y);

            let l: number = 0;
            let t: number = 0;

            for (i = 0; i < y * x; i++) {
                c = this.paintGridAreas.add(c, getKey());

                left = C_GRID_AREA_WIDTH * l;
                top = C_GRID_AREA_HEIGHT * t;
                let w_aspect: cReportAspect = c.getAspect();
                w_aspect.setLeft(left);
                w_aspect.setTop(top);
                w_aspect.setWidth(C_GRID_AREA_WIDTH);
                w_aspect.setHeight(C_GRID_AREA_HEIGHT);

                let t]: this.vGridObjs[l, = c.getKey();

                c = null;

                l = l + 1;
                if (l >= x) {
                    l = 0;
                    t = t + 1;
                }
            }

            refreshBackgroundPicture(picGrid, (int)csColors.C_COLOR_WHITE);
        }

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
        public alingObjTopToGrid(sKey: string) {
            alingObjToGrid(sKey, false, true, false, false, true);
        }

        public alingObjLeftToGrid(sKey: string) {
            alingObjToGrid(sKey, true, false, false, false, true);
        }

        public alingObjBottomToGrid(sKey: string) {
            alingObjToGrid(sKey, false, false, true, false, true);
        }

        public alingObjRightToGrid(sKey: string) {
            alingObjToGrid(sKey, false, false, false, true, true);
        }

        public alingObjLeftTopToGrid(sKey: string) {
            alingObjToGrid(sKey, true, true, false, false, true);
        }

        public alingObjLeftBottomToGrid(sKey: string) {
            alingObjToGrid(sKey, true, false, true, false, true);
        }

        public alingObjRightTopToGrid(sKey: string) {
            alingObjToGrid(sKey, false, true, false, true, true);
        }

        public alingObjRightBottomToGrid(sKey: string) {
            alingObjToGrid(sKey, false, false, true, true, true);
        }

        public alingToGrid(sKey: string) {
            alingObjToGrid(sKey, true, true, false, false, false);
        }

        private alingObjToGrid(
            sKey: string
            toLeft: boolean
            toTop: boolean
            toBottom: boolean
            toRight: boolean
            resizing: boolean) {
            let z1: number = 0;
            let q1: number = 0;
            let maxY: number = 0;
            let maxX: number = 0;
            let gridObjAspect: cReportAspect = null;

            maxX = this.vGridObjs.GetLength(0)-1;
            maxY = this.vGridObjs.GetLength(1)-1;

            let top: number = 0;
            let left: number = 0;
            let width: number = 0;
            let height: number = 0;
            let offset: number = 0;
            public pointSeparation: number = 0.6f;
            public offSetPointSep: number = 0.3f;

            let paintObjs: cReportPaintObjects = null;

            if (sKey.substring(0, 1) === C_KEY_PAINT_SEC) {
                paintObjs = this.paintSections;
            }
            else {
                paintObjs = this.paintObjects;
            }

            let nLeft: number = 0;
            let nTop: number = 0;

            let w_item: cReportPaintObject = paintObjs.item(sKey);
            let w_aspect: cReportAspect = w_item.getAspect();
            nLeft = w_aspect.getLeft() - offSetPointSep;
            nTop = w_aspect.getTop() - w_aspect.getOffset() - offSetPointSep;

            if (nLeft < 0) { nLeft = 0; }
            if (nTop < 0) { nTop = 0; }

            if (toTop || toLeft) {
                // we get the grid where the point A is located
                //
                z1 = Convert.ToInt32(nLeft / C_GRID_AREA_WIDTH);
                q1 = Convert.ToInt32(nTop / C_GRID_AREA_HEIGHT);

                if (nLeft > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; }
                if (nTop > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 0) { z1 = 0; }
                if (q1 < 0) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1, q1]).getAspect();

                if (toTop) {
                    // now we need to get which is the nearest point
                    //
                    top = (w_aspect.getTop() - w_aspect.getOffset()) - gridObjAspect.getTop();
                    top = Convert.ToInt32(top / pointSeparation) * pointSeparation;
                    offset = gridObjAspect.getTop()
                                + top 
UNKNOWN >>                                 - offSetPointSep 
                                - (w_aspect.getTop() - w_aspect.getOffset());
                    w_aspect.setTop((gridObjAspect.getTop() + top - offSetPointSep) + w_aspect.getOffset());

                    if (resizing) {
                        w_aspect.setHeight(w_aspect.getHeight() - offset);
                    }
                }

                if (toLeft) {
                    left = w_aspect.getLeft() - gridObjAspect.getLeft();
                    left = Convert.ToInt32(left / pointSeparation) * pointSeparation;
                    offset = gridObjAspect.getLeft() + left - offSetPointSep - w_aspect.getLeft();
                    w_aspect.setLeft(gridObjAspect.getLeft() + left - offSetPointSep);

                    if (resizing) {
                        w_aspect.setWidth(w_aspect.getWidth() - offset);
                    }
                }
            }

            if (toRight) {
                // we get the grid where the point B is located
                //
                z1 = Convert.ToInt32((nLeft + w_aspect.getWidth()) / C_GRID_AREA_WIDTH);
                if (nLeft + w_aspect.getWidth() > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; }

                q1 = Convert.ToInt32(nTop / C_GRID_AREA_HEIGHT);
                if (nTop > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1, q1]).getAspect();

                // now we need to get which is the nearest point
                //
                width = w_aspect.getLeft() + w_aspect.getWidth() - gridObjAspect.getLeft();
                width = Convert.ToInt32(width / pointSeparation) * pointSeparation - offSetPointSep;
                w_aspect.setWidth(gridObjAspect.getLeft() + width - w_aspect.getLeft());

            }

            if (toBottom) {
                // we get the grid where the point C is located
                //
                z1 = Convert.ToInt32(nLeft / C_GRID_AREA_WIDTH);
                q1 = Convert.ToInt32((nTop + w_aspect.getHeight()) / C_GRID_AREA_HEIGHT);

                if (nLeft > z1 * C_GRID_AREA_WIDTH) { z1 = z1 + 1; }
                if (nTop + w_aspect.getHeight() > q1 * C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1, q1]).getAspect();

                // now we need to get which is the nearest point
                //
                height = (w_aspect.getTop() - w_aspect.getOffset()) + w_aspect.getHeight() - gridObjAspect.getTop();
                height = Convert.ToInt32(height / pointSeparation) * pointSeparation - offSetPointSep;
                w_aspect.setHeight(gridObjAspect.getTop() + height - (w_aspect.getTop() - w_aspect.getOffset()));
            }
        }

        // end Align
        //-------------------------------

        // Drawing
        public clearPage(graph: object) {
            refreshBackgroundPicture(graph as Graphics, Color.White.ToArgb());
        }

        public refreshObject(key: string, graph: Graphics) {
            pClearObject(key, graph);
            return drawObject(key, graph);
        }

        public drawObject(key: string, graph: Graphics) {
            return draw(this.paintObjects, key, graph);
        }

        public drawSection(key: string, graph: Graphics) {
            // check the width of the paintObject for this section
            // is into the bounds of the page
            //
            let aspect: cReportAspect = this.paintSections.item(key).getAspect();
            if (aspect.getWidth() > this.bitmap.Size.Width-2) {
                aspect.setWidth(this.bitmap.Size.Width-2);
            }
            return draw(this.paintSections, key, graph);
        }

        public drawRule(key: string, graph: Graphics) {
            public LINE_COLOR: number = 0xcc6600;
            let top: number = 0;
            let heightSec: number = 0;
            let aspect: cReportAspect = null;

            aspect = new cReportAspect();

            let w_item: cReportPaintObject = this.paintSections.item(key);
            heightSec = w_item.getHeightSecLine() * 0.5f;
            let w_aspect: cReportAspect = w_item.getAspect();
            aspect.setTop(w_aspect.getTop() + 3 - heightSec);
            aspect.setOffset(w_aspect.getOffset());
            aspect.setTransparent(true);
            aspect.setLeft(0);
            aspect.setHeight(20);
            aspect.setAlign(HorizontalAlignment.Right);
            aspect.setWidth(graph.ClipBounds.Width - 1);

            if (w_item.getTextLine() !== "") {
                top = - Convert.ToInt32(w_item.getHeightSec());
                w_aspect = w_item.getAspect();
                top += Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset() - 6 + w_aspect.getHeight() * 2);

                printLine(graph, 
                            true, 
                            0, 
                            top, 
                            aspect.getWidth(), 
                            top,
                            LINE_COLOR, 
                            1, 
                            true,
                            LINE_COLOR, 
                            false);

                // last section line
                //
                printText(graph, w_item.getTextLine(), aspect, w_item.getImage());

                heightSec = w_item.getHeightSec() * 0.5f;

                // print section's name
                //
                w_aspect = this.paintSections.item(key).getAspect();
                aspect.setTop(w_aspect.getTop() - heightSec);
                aspect.setAlign(HorizontalAlignment.Left);

                printText(graph, w_item.getText(), aspect, w_item.getImage());

            }
            else {
                top = Convert.ToInt32(aspect.getTop() - aspect.getOffset() - heightSec + w_item.getAspect().getHeight());

                if (w_item.getIsSection()) {
                    printLine(graph, 
                                true,
                                0, 
                                top, 
                                aspect.getWidth(), 
                                top,
                                LINE_COLOR, 
                                1, 
                                true,
                                LINE_COLOR, 
                                false);
                }

                // every section line except the last one
                //
                printText(graph, w_item.getText(), aspect, w_item.getImage());
            }

            if (w_item === this.paintSections.item(this.paintSections.count() - 1))  {
                top = Convert.ToInt32(aspect.getTop() + w_item.getHeightSecLine() - heightSec - aspect.getOffset() + 6);

                if (w_item.getIsSection()) {
                    printLine(graph,
                                true,
                                0,
                                top,
                                aspect.getWidth(),
                                top,
                                LINE_COLOR,
                                1,
                                true,
                                LINE_COLOR,
                                false);
                }
            }

            return true;
        }

		public moveObjToXY(sKey: string, x: number, y: number, graph: Graphics) {
            if (sKey.substring(0, 1) === C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
        }

		public moveObjToXYEx(sKey: string, x: number, y: number, graph: Graphics, clear: boolean) {
            if (clear) {
                this.x1 = this.x1Ex;
                this.y1 = this.y1Ex;
                this.x2 = this.x2Ex;
                this.y2 = this.y2Ex;
            }
            else {
                this.x1 = 0;
                this.x2 = 0;
                this.y1 = 0;
                this.y2 = 0;
            }

            moveObjToXY(sKey, x, y, graph);

            if (this.x1Ex === 0) { this.x1Ex = this.x1; }
            if (this.y1Ex === 0) { this.y1Ex = this.y1; }
            if (this.x2Ex === 0) { this.x2Ex = this.x2; }
            if (this.y2Ex === 0) { this.y2Ex = this.y2; }

            if (this.x1Ex > this.x1 && this.x1 > 0) { this.x1Ex = this.x1; }
            if (this.y1Ex > this.y1 && this.y1 > 0) { this.y1Ex = this.y1; }
            if (this.x2Ex < this.x2 && this.x2 > 0) { this.x2Ex = this.x2; }
            if (this.y2Ex < this.y2 && this.y2 > 0) { this.y2Ex = this.y2; }
        }

		public moveVertical(sKey: string, y: number, graph: Graphics) {
            if (sKey.substring(0, 1) === C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
        }

		public moveHorizontal(sKey: string, x: number, graph: Graphics) {
            if (sKey.substring(0, 1) === C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
        }

        public endMove(graph: Graphics) {
            this.x1 = 0;
            this.x2 = 0;
            this.y1 = 0;
            this.y2 = 0;

            this.x1Ex = 0;
            this.x2Ex = 0;
            this.y1Ex = 0;
            this.y2Ex = 0;

            refreshBackgroundPicture(graph, (int)csColors.C_COLOR_WHITE);
            this.beginMoveDone = false;
        }

        // Drawing - Primitive
        private draw(collObjs: cReportPaintObjects, key: string, graph: Graphics) {
            try {
                if (graph === null) {
                    throw new ReportPaintException(
                        csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT,
                        C_MODULE,
                        cReportPaintError.errGetDescript(
                                        csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT));
                }

                let oPaintObj: cReportPaintObject = null;
                let x1: number = 0;
                let y1: number = 0;
                let y2: number = 0;
                let x2: number = 0;
                let colorIn: number = 0;
                let colorOut: number = 0;
                let filled: boolean = false;

                oPaintObj = collObjs.item(key);

                if (oPaintObj === null) { return false; }

                let w_aspect: cReportAspect = oPaintObj.getAspect();

                x1 = w_aspect.getLeft();
                x2 = x1 + w_aspect.getWidth();
                y1 = w_aspect.getTop() - w_aspect.getOffset();
                y2 = y1 + w_aspect.getHeight();

                if (!w_aspect.getTransparent()) {
                    colorIn = w_aspect.getBackColor();
                    filled = true;
                }

                colorOut = w_aspect.getBorderColor();

                switch (oPaintObj.getPaintType())
                {
                    case csRptPaintObjType.CSRPTPAINTOBJBOX:

                        pDrawObjBox(graph,
                                    oPaintObj.getAspect(),
                                    x1, y1, x2, y2,
                                    filled,
                                    colorIn,
                                    colorOut);
                        break;

                    case csRptPaintObjType.CSRPTPAINTOBJLINE:

                        printLine(graph, filled, x1, y1, x2, y2, colorIn, 1, false, colorOut, false);
                        break;

                    case csRptPaintObjType.CSRPTPAINTOBJCIRCLE:
                        break;

                    case csRptPaintObjType.CSRPTPAINTOBJIMAGE:

                        pDrawObjBox(graph,
                                    oPaintObj.getAspect(),
                                    x1 - 1, y1 - 1, x2 + 1, y2 + 1,
                                    filled,
                                    colorIn,
                                    0xC0C000);

                        let bmpWidth: number = 0;
                        let bmpHeight: number = 0;

                        if (oPaintObj.getImage() !== null) {
                            cGlobals.getBitmapSize(oPaintObj.getImage(), bmpWidth, bmpHeight, true);

                            if (bmpWidth > w_aspect.getWidth()) {
                                bmpWidth = w_aspect.getWidth();
                            }
                            if (bmpHeight > w_aspect.getHeight()) {
                                bmpHeight = w_aspect.getHeight();
                            }

                            drawBMP(graph,
                                    oPaintObj.getImage(),
                                    x1 * this.scaleX,
                                    y1 * this.scaleY,
                                    bmpWidth,
                                    bmpHeight,
                                    bmpWidth * this.scaleX,
                                    bmpHeight * this.scaleY);
                        }
                        break;
                }

                if (oPaintObj.getText() !== "") {
                    if (collObjs === this.paintObjects) {
                        printText(graph,
                                    oPaintObj.getText(),
                                    oPaintObj.getAspect(),
                                    oPaintObj.getImage());
                    }
                }

                return true;

            }
            catch (ex) {
                cError.mngError(ex, "Draw", C_MODULE, "Error al dibujar un objeto");
                return false;
            }
        }

        private drawBMP(graph: Graphics, image: Image, x: number, y: number, bmpWidth: number, bmpHeight: number, destWidth: number, destHeight: number) {
            //throw new NotImplementedException();
            /*
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

            let sourceRect: Rectangle = new Rectangle(0, 0, bmpWidth, bmpHeight);
            let destRect: Rectangle = new Rectangle(Convert.ToInt32(x), Convert.ToInt32(y), bmpWidth, bmpHeight);

            graph.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);
        }

        public setFocus(sKey: string, graph: Graphics, clearSelected: boolean) {
            if (clearSelected) { this.vSelectedKeys = []; }

            if (!pAllreadySelected(sKey)) {
                G.redimPreserve(this.vSelectedKeys, this.vSelectedKeys.length + 1);
                let -1]: this.vSelectedKeys[this.vSelectedKeys.length = sKey;
            }

            this.keyFocus = sKey;
            paintPicture(graph, true);
        }

        public removeFromSelected(sKey: string, graph: Graphics) {
            let i: number = 0;

            for (i = 0; i < this.vSelectedKeys.length; i++) {
                if (this.vSelectedKeys[i] === sKey) {
                    break;
                }
            }

            if (i >= this.vSelectedKeys.length) { return; }

            for (i = i + 1; i < this.vSelectedKeys.length; i++) {
                this.vSelectedKeys[i - 1] = this.vSelectedKeys[i];
            }
            if (this.vSelectedKeys.length > 0) {
                G.redimPreserve(this.vSelectedKeys, this.vSelectedKeys.length - 1);
            }
            else {
                this.vSelectedKeys = [];
            }

            if (this.keyFocus === sKey) { this.keyFocus = ""; }

            paintPicture(graph, true);
        }

        private pAllreadySelected(sKey: string) {
            if (sKey === "") {
                return true;
            }

            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                if (this.vSelectedKeys[i] === sKey) {
                    return true;
                }
            }
            return false;
        }

        private setFocusAux(sKey: string, graph: Graphics) {
            let paintObjAsp: cReportPaintObject = null;
            let color: number = 0;
            let bCircle: boolean = false;

            this.keyFocus = sKey;

            if (this.keyFocus.substring(0, 1) === C_KEY_PAINT_OBJ) {
                paintObjAsp = this.paintObjects.item(this.keyFocus);
                color = 0x80C0FF;
                bCircle = false;
            }
            else {
                paintObjAsp = this.paintSections.item(this.keyFocus);
                color = 0x80C0FF;
                bCircle = true;
            }

            if (paintObjAsp === null) { return; }

            let w_aspect: cReportAspect = paintObjAsp.getAspect();
            showHandles(graph, 
                        Convert.ToInt32(w_aspect.getLeft()), 
                        Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset()), 
                        Convert.ToInt32(w_aspect.getLeft() + w_aspect.getWidth()), 
                        Convert.ToInt32(w_aspect.getTop() - w_aspect.getOffset() + w_aspect.getHeight()), 
                        color, 
                        bCircle);
        }

        private move(left: number, top: number, width: number, height: number, graph: Graphics) {
            if (this.x1 > 0 || this.x2 > 0 || this.y1 > 0 || this.y2 > 0) {
                paintPictureMove(graph, cGlobals.newRectangleF(this.x1, this.y1, this.x2, this.y2));
            }

            this.x1 = left;
            this.y1 = top;
            this.x2 = left + width;
            this.y2 = top + height;

            printLine(graph, false, this.x1, this.y1, this.x2, this.y2, 0, 1, true, (int)csColors.C_COLOR_BLACK, false);

            if (this.x1 > 1) { this.x1 = this.x1 - 2; }
            if (this.y1 > 1) { this.y1 = this.y1 - 2; }

            this.x2 = this.x2 + 2;
            this.y2 = this.y2 + 2;
        }

        public resize(graph: Graphics, sKey: string, left: number, top: number, x2: number, y2: number) {
            public C_MIN_WIDTH: number = 1;
            public C_MIN_HEIGHT: number = 1;

            let paintObjAsp: cReportAspect = null;

            if (sKey.substring(0, 1) === C_KEY_PAINT_OBJ) {
                paintObjAsp = this.paintObjects.item(sKey).getAspect();
            }
            else {
                paintObjAsp = this.paintSections.item(sKey).getAspect();
            }

            if (left === -32768) {
                this.x1 = paintObjAsp.getLeft();
            }
            else {
                this.x1 = left;
            }

            if (top === -32768) {
                this.y1 = paintObjAsp.getTop() - paintObjAsp.getOffset();
            }
            else {
                this.y1 = top;
            }

            this.x2 = paintObjAsp.getLeft();
            if (x2 === -32768) {
                this.x2 = this.x2 + paintObjAsp.getWidth();
            }
            else {
                this.x2 = x2;
            }

            this.y2 = paintObjAsp.getTop() - paintObjAsp.getOffset();
            if (y2 === -32768) {
                this.y2 = this.y2 + paintObjAsp.getHeight();
            }
            else {
                this.y2 = y2;
            }

            // validations :

            // x2 can't be lower than Left
            if (this.x2 < paintObjAsp.getLeft() + C_MIN_WIDTH) { this.x2 = paintObjAsp.getLeft() + C_MIN_WIDTH; }

            // y2 can't be lower than Top
            if (this.y2 < paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT) { this.y2 = paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT; }

            paintPicture(graph, false);

            printLine(graph, false, this.x1, this.y1, this.x2, this.y2, (int)csColors.C_COLOR_WHITE, 1, true, (int)csColors.C_COLOR_BLACK, false);

            graph.Dispose();
        }

        public createPicture(graph: Graphics) {
            refreshBackgroundPicture(graph, 0);
        }

        public createBackgroundBitmap(graph: Graphics) {
            this.bitmap = new Bitmap(graph.VisibleClipBounds.Width + 1, (int)graph.VisibleClipBounds.Height + 3); // TODO check why 56 ???
        }

        private refreshBackgroundPicture(graph: Graphics, color: number) {
            /*
            int i = 0;
            RECT tR = null;
            RECT tR2 = null;

            if (this.hBmpCopy !== 0) { DeleteObject(this.hBmpCopy); }
            if (this.hMemDC !== 0) { DeleteObject(this.hMemDC); }

            GetClientRect(graph.hwnd, tR);

            LSet(tR2 === tR);

            this.hMemDC = CreateCompatibleDC(0);
            this.hBmpCopy = CreateCompatibleBitmap(graph.hDC, tR.right, tR.bottom + 56);

            DeleteObject(SelectObject(this.hMemDC, this.hBmpCopy));

            int hBr = 0;
            hBr = CreateSolidBrush(mAux.translateColor(color));
            tR2.bottom = tR2.bottom + 56;
            FillRect(this.hMemDC, tR2, hBr);
            DeleteObject(hBr);

            tR.bottom = this.gridHeight / Screen.TwipsPerPixelY;
            FillRect(this.hMemDC, tR, this.hBrushGrid);

            for (i = 1; i <= getPaintObjects().count(); i++)
            {
                drawObject(getPaintObjects().getNextKeyForZOrder(i), this.hMemDC, graph);
            }

            for (i = 1; i <= getPaintSections().count(); i++)
            {
                drawSection(getPaintSections().getNextKeyForZOrder(i), this.hMemDC, graph);
            }

            paintPicture(graph);
            */
            if (this.bitmap !== null) {
                this.bitmap.Dispose();
            }

            createBackgroundBitmap(graph);

            let bitmapGraphic: Graphics = Graphics.FromImage(this.bitmap);

            let rect: Rectangle = cGlobals.newRectangle(0, 0, (int)graph.VisibleClipBounds.Width, (int)graph.VisibleClipBounds.Height + 3); // TODO check why 56 ???;

            if (this.brushGrid !== null) {
                bitmapGraphic.FillRectangle(this.brushGrid, rect);
            }
            else  {
                let brush: Brush = new SolidBrush(cColor.colorFromRGB(color));
                bitmapGraphic.FillRectangle(brush, rect);
                brush.Dispose();            
            }

            for(let i = 0; i < getPaintObjects().count(); i++) {
                drawObject(getPaintObjects().getNextKeyForZOrder(i), bitmapGraphic);
            }

            for(let i = 0; i < getPaintSections().count(); i++) {
                drawSection(getPaintSections().getNextKeyForZOrder(i), bitmapGraphic);
            }

            paintPicture(graph, true);
        }

        //--------------------------------------------------------------------------------------------------
        // Draw - Low Level
        private printLine(
            graph: Graphics
            filled: boolean
            x1: number
            y1: number
            x2: number
            y2: number
            colorInside: number
            width: number
            dash: boolean
            colorOut: number
            rounded: boolean) {
            /*
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


                y1 = y1 * this.scaleY;
                y2 = y2 * this.scaleY;
                x1 = x1 * this.scaleX;
                x2 = x2 * this.scaleX;

                RoundRect(hDC, x1, y1, x2, y2, 20 * this.scaleX, 20 * this.scaleY);
            } 
            else {

                tR = cGlobals.newRectangle(x1, y1, x2, y2);
                mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);

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

UNKNOWN >>             Pen pen;

            pen = new Pen(cColor.colorFromRGB(colorOut), width);

            if (dash) {
                pen.DashStyle = DashStyle.Dot;
            }

            if (rounded) {
                y1 = y1 * this.scaleY;
                y2 = y2 * this.scaleY;
                x1 = x1 * this.scaleX;
                x2 = x2 * this.scaleX;

                let extGraph: cGraphics = new cGraphics(graph);
                extGraph.DrawRoundRectangle(pen, x1, y1, x2-x1, y2-y1, 8f);
            }
            else {
                let rect: Rectangle = cGlobals.newRectangle(Convert.ToInt32(x1), Convert.ToInt32(y1), Convert.ToInt32(x2), Convert.ToInt32(y2));

                if (y2 !== y1 && x1 !== x2) {
                    if (filled) {
                        /* TODO: remove me after some testing
                         * 
                        if (!(rect.Height === 1 && filled))
                        {
                            rect.Inflate(-1, -1);
                        }
                        */
                        let brush: Brush = new SolidBrush(cColor.colorFromRGB(colorInside));
                        graph.FillRectangle(brush, rect);
                        brush.Dispose();
                    }

                    // the original version didn't put a border when the height is 20 twips
                    // we want to preserve that behaviour
                    //
                    if (!(rect.Height === 1 && filled)) {
                        graph.DrawRectangle(pen, rect);
                    }
                }
                else {
                    if (rect.Height === 0 || rect.Bottom === rect.Top) { rect.Height = 1; }
                    if (rect.Width === 0 || rect.Left === rect.Right) { rect.Width = 1; }

                    graph.DrawRectangle(pen, rect);
                }
            }

            pen.Dispose();
        }

        private printText(graph: Graphics, sText: string, aspect: cReportAspect, image: Image) {
            /*
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

            hFntOld = SelectObject(hDC, this.hFnt[mAux.addFontIfRequired(oFont, hDC, this.fontCount, this.fnt, this.hFnt)]);

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

            stringWidth = getPlEvaluateTextWidth(sText, hDC, this.scaleX);
            stringHeight = getPlEvaluateTextHeight(sText, hDC, aspect.getWidth(), flags, this.scaleY, this.scaleX);

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
                mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
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
            public c_Margen_Y: number = 1; // 20 twips;
            public c_Margen_X: number = 4; // 80 twips;
            public c_Margen_Bottom: number = 4; // 80 twips;

            let idx: number = cGlobals.addFontIfRequired(aspect.getFont(), this.fnt);

            let font: Font = this.fnt[idx];

            let format: StringFormat = new StringFormat();

            format.Trimming = StringTrimming.EllipsisWord;
            format.Alignment = StringAlignment.Near;

            if (!aspect.getWordWrap()) {
                format.FormatFlags = StringFormatFlags.NoWrap;
            }

            let stringWidth: number = getPlEvaluateTextWidth(sText, font, this.scaleX);
            let stringHeight: number = getPlEvaluateTextHeight(sText, font, aspect.getWidth(), format, this.scaleY, this.scaleX);

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
            stringHeight += 25; //+ 400 the original code was in twips;

            let margenX: number = c_Margen_X;
            let margenY: number = c_Margen_Y;

            if (image !== null) {
                margenX += image.Size.Width;
                margenY = image.Size.Height - stringHeight - c_Margen_Bottom;

                if (margenY + stringHeight > aspect.getHeight())  {
                    margenY = Convert.ToInt32(aspect.getHeight() - stringHeight - c_Margen_Bottom);
                }                
                if (margenY < c_Margen_Y)  {
                    margenY = c_Margen_Y;
                }
            }

            let nWidth: number = Convert.ToInt32(aspect.getWidth() - margenX * 2);

            if (stringWidth > nWidth)  {
                stringWidth = nWidth;
            }

            let x: number = 0;
            let y: number = 0;

            switch (aspect.getAlign())
            {
                case HorizontalAlignment.Right:
                    x = Convert.ToInt32(aspect.getLeft() + aspect.getWidth() - stringWidth - margenX);
                    break;
                case HorizontalAlignment.Center:
                    x = Convert.ToInt32(aspect.getLeft() + (aspect.getWidth() - stringWidth) * 0.5);
                    break;
                case HorizontalAlignment.Left:
                    x = Convert.ToInt32(aspect.getLeft() + margenX);
                    break;
            }

            y = Convert.ToInt32(aspect.getTop() - aspect.getOffset() + margenY);

            let rect: RectangleF = cGlobals.newRectangleF(x, y, Convert.ToInt32(x + aspect.getWidth() - margenX), y + stringHeight);

            let brush: SolidBrush = new SolidBrush(cColor.colorFromRGB(aspect.getFont().getForeColor()));

            graph.DrawString(sText, font, brush, rect, format);

            brush.Dispose();
        }

        private showHandles(
            graph: Graphics
            x1: number
            y1: number
            x2: number
            y2: number
            color: number
            bCircle: boolean) {
            /*
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
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x1 - iSize, y2, x1, y2 + iSize);
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x2, y1 - iSize - 10, x2 + iSize, y1);
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x2, y2, x2 + iSize, y2 + iSize);
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
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
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x, y1 - iSize - 10, x + iSize, y1);
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
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
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
            if (bCircle)
            {
                Ellipse(hDC, tR.left, tR.top, tR.right, tR.bottom);
            }
            else
            {
                FillRect(hDC, tR, hBrush);
            }

            tR = cGlobals.newRectangle(x2, y, x2 + iSize, y + iSize);
            mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);
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
            public iSize: number = 7;

            if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; }

            if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; }            

            let brush: Brush = new SolidBrush(cColor.colorFromRGB(color));

            let rect: Rectangle = cGlobals.newRectangle(x1 - iSize, y1 - iSize - 1, x1, y1);
            showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x1 - iSize, y2, x1, y2 + iSize);
            showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y1 - iSize - 1, x2 + iSize, y1);
            showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y2, x2 + iSize, y2 + iSize);
            showHandle(graph, brush, rect, bCircle);

            let x: number = Convert.ToInt32((x1 +  / 2f) - iSize / 2f);
            rect = cGlobals.newRectangle(x, y2, x + iSize, y2 + iSize);
            showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x, y1 - iSize - 1, x + iSize, y1);
            showHandle(graph, brush, rect, bCircle);

            let y: number = Convert.ToInt32((y1 +  / 2f) - iSize / 2f);
            rect = cGlobals.newRectangle(x1 - iSize, y, x1, y + iSize);
            showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y, x2 + iSize, y + iSize);
            showHandle(graph, brush, rect, bCircle);

            brush.Dispose();
        }

        private showHandle(graph: Graphics, brush: Brush, rect: Rectangle, circle: boolean) {
            if (circle) {
                graph.FillEllipse(brush, rect);
            }
            else {
                graph.FillRectangle(brush, rect);
            }
        }

        public paintPicture(graph: Graphics, disposeGraphicObject: boolean) {
            /*
            RECT tR = null;

            GetClientRect(graph.hwnd, tR);

            if (this.zoom === 100)
            {
                BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, this.hMemDC, 0, 0, vbSrcCopy);
            }
            else
            {
                int width = 0;
                int height = 0;
                int oldStrMode = 0;
                POINTAPI lrPoint = null;

                mAux.getBitmapSize(this.hBmpCopy, width, height, false);

                oldStrMode = SetStretchBltMode(graph.hDC, STRETCH_HALFTONE);

                StretchBlt(graph.hDC, 0, 0, tR.right, tR.bottom, this.hMemDC, 0, 0, width, height, vbSrcCopy);
                SetStretchBltMode(graph.hDC, oldStrMode);
            }

            int i = 0;

            for (i = 1; i <= this.vSelectedKeys.length; i++)
            {
                setFocusAux(this.vSelectedKeys[i], graph);
            }
            */

            let rect: Rectangle = cGlobals.newRectangle(0, 0, this.bitmap.Size.Width, this.bitmap.Size.Height);
            if (this.zoom === 100) {
                //BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, this.hMemDC, 0, 0, vbSrcCopy);
                graph.DrawImage(this.bitmap, rect, rect, GraphicsUnit.Pixel);
            }
            else {

            }
            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                setFocusAux(this.vSelectedKeys[i], graph);
            }

            if (disposeGraphicObject) {
                graph.Dispose();
            }
        }

        public beginMove() {
            if (this.beginMoveDone) { return; }

            this.beginMoveDone = true;

            let graphic: Graphics = Graphics.FromImage(this.bitmap);
            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                setFocusAux(this.vSelectedKeys[i], graphic);
            }
            graphic.Dispose();
        }

        private paintPictureMove(graph: Graphics, tR: RectangleF) {
            /*
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

                      mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);

                      BitBlt(graph.hDC, tR.left, tR.top, tR.right - tR.left, tR.bottom - tR.top, this.hMemDC, tR.left, tR.top, vbSrcCopy);
             * */
            let rect: Rectangle = cGlobals.newRectangle(0, 0, this.bitmap.Size.Width, this.bitmap.Size.Height);
            if (this.zoom === 100) {
                //BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, this.hMemDC, 0, 0, vbSrcCopy);
                graph.DrawImage(this.bitmap, rect, rect, GraphicsUnit.Pixel);
            }
        }

        // grid
        //
        private pCreateBrushGrid(graph: Graphics, typeGrid: csETypeGrid) {
            /*
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


            this.hBrushGrid = CreatePatternBrush(hBmp);
            DeleteObject(hMemDC);
            DeleteObject(hBmp);
            DeleteObject(hBrush);
             */

            switch (typeGrid)
            {
                case csETypeGrid.CSEGRIDLINES:
                    this.brushGrid = new HatchBrush(
                                            HatchStyle.Cross,
                                            cColor.colorFromRGB(0xC0C0C0),
                                            Color.White);
                    break;
                case csETypeGrid.CSEGRIDPOINTS:
                    this.brushGrid = new HatchBrush(
                                            HatchStyle.DottedGrid,
                                            cColor.colorFromRGB(0xC0C0C0),
                                            Color.White);
                    break;
                case csETypeGrid.CSEGRIDLINESHORIZONTAL:
                    this.brushGrid = new HatchBrush(
                                            HatchStyle.Horizontal,
                                            cColor.colorFromRGB(0xC0C0C0),
                                            Color.White);
                    break;
                case csETypeGrid.CSEGRIDLINESVERTICAL:
                    this.brushGrid = new HatchBrush(
                                            HatchStyle.Vertical,
                                            cColor.colorFromRGB(0xC0C0C0),
                                            Color.White);
                    break;
                case csETypeGrid.CSEGRIDNONE:
                    this.brushGrid = new HatchBrush(
                                            HatchStyle.DottedGrid,
                                            cColor.colorFromRGB(0xCCCCCC),
                                            Color.White);
                    break;
            }
        }

        //
        //
        private getPlEvaluateTextWidth(text: string, font: Font, scaleX: number) {
            let graph: Graphics = Graphics.FromImage(this.bitmap);
            let stringSize: SizeF = graph.MeasureString(text, font);
            graph.Dispose();
            return Convert.ToInt32(stringSize.Width / scaleX); // TODO: check if it is / or *
        }

        private getPlEvaluateTextHeight(text: string, font: Font, width: number, format: StringFormat, scaleY: number, scaleX: number) {
            let graph: Graphics = Graphics.FromImage(this.bitmap);
            let stringSize: SizeF = graph.MeasureString(text, font, Convert.ToInt32(width * scaleX), format);
            graph.Dispose();
            return Convert.ToInt32(stringSize.Height / scaleY); // TODO: check if it is / or * the same function in cReportPrint is using * one has to be wrong
        }

        private pClearObject(key: string, graph: Graphics) {
            let oPaintObj: cReportPaintObject = null;

            oPaintObj = this.paintObjects.item(key);

            if (oPaintObj === null) { return; }

            let w_aspect: cReportAspect = oPaintObj.getAspect();
            let tR: RectangleF = cGlobals.newRectangleF(w_aspect.getLeft(), w_aspect.getTop(), w_aspect.getLeft() + w_aspect.getWidth(), w_aspect.getTop() + w_aspect.getHeight());

            if (tR.Right > graph.ClipBounds.Width) { tR.Width = cGlobals.setRectangleWidth(graph.ClipBounds.Width - tR.Left); }
            if (tR.Bottom > graph.ClipBounds.Height) { tR.Height = cGlobals.setRectangleHeight(graph.ClipBounds.Height - tR.Top); }

            //TODO: check
            //mAux.rectTwipsToPixel(tR, this.scaleX, this.scaleY);

            // TODO: replace api call
            /*
            int hBr = 0;
            hBr = CreateSolidBrush(mAux.translateColor(vbWhite));
            FillRect(hDC, tR, hBr);
            DeleteObject(hBr);
             */ 
        }

        private pDrawObjBox(
            graph: Graphics
            aspect: cReportAspect
            x1: number
            y1: number
            x2: number
            y2: number
            filled: boolean
            colorIn: number
            colorOut: number) {

            // this.notBorder is used by preview and printing to indicate the controls must be print a border only
            // when BorderType !== NONE
            // 
            if ( || (aspect.getBorderType() !== csReportBorderType.CSRPTBSNONE)) {
                if (aspect.getBorderType() === csReportBorderType.CSRPTBS3D) {

                    printLine(graph, filled, x1, y1, x2, y2, colorIn, 0, false, (int)csColors.C_COLOR_WHITE, false);

                    // top
                    //
                    printLine(graph, false, x1, y1, x2, y1, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false);
                    // down
                    //
                    printLine(graph, false, x1, y2 - 1, x2, y2 - 1, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false);
                    // left
                    //
                    printLine(graph, false, x1 + 1, y1, x1 + 1, y2, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false);
                    // right
                    //
                    printLine(graph, false, x2 - 1, y1, x2 - 1, y2, (int)csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false);
                }
                else if (aspect.getBorderRounded()) {
                    printLine(graph, filled, x1, y1, x2, y2, colorIn, (int)aspect.getBorderWidth(), false, colorOut, true);
                }
                else {
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
                    let dash: boolean = false;
                    public borderWidth: number = 1;

                    if (this.notBorder === false 
                            && (
                                (
                                    aspect.getBorderType() === csReportBorderType.CSRPTBSFIXED 
                                    && !aspect.getBorderRounded()
                                    && aspect.getBorderWidth() === 0
                                )
                                || aspect.getBorderType() === csReportBorderType.CSRPTBSNONE
                            )
                        ) {
                        colorOut = Color.Gray.ToArgb(); // 0xff9966; //Color.LightGray.ToArgb();
                        dash = true;
                    }

                    // TODO: clean this. we have many issues with this code. the value 16777215 is white
                    //       it is used in cairo reports. when a control has a background (colorIn) === white
                    //       we must not call printLine
                    //
                    if (!this.notBorder 
                        || (filled && colorIn !== 16777215) // this is the value of white controls in cairo reports.
                        || (aspect.getBorderType() === csReportBorderType.CSRPTBSFIXED && aspect.getBorderWidth() > 0)) {
                        printLine(graph, filled, x1, y1, x2, y2, colorIn, borderWidth, dash, colorOut, false);
                    }
                }
            }
        }

        public getBitmap() {
            return this.bitmap;
        }



    } 



}


/*

http://stackoverflow.com/questions/7507602/best-practice-for-onpaint-invalidate-clipping-and-regions

Since a lot of people are viewing this question I will go ahead and answer it to the best of my current knowledge.

The Graphics class supplied with PaintEventArgs is always hard-clipped by the invalidation request. This is usually done by the operating system, but it can be done by your code.

You can't reset this clip or escape from these clip bounds, but you shouldn't need to. When painting, you generally shouldn't care about how it's being clipped unless you desperately need to maximize performance.

The graphics class uses a stack of containers to apply clipping and transformations. You can extend this stack yourself by using Graphics.BeginContainer and Graphics.EndContainer. Each time you begin a container, any changes you make to the Transform or the Clip are temporary and they are applied after any previous Transform or Clip which was configured before the BeginContainer. So essentially, when you get an OnPaint event it has already been clipped and you are in a new container so you can't see the clip (your Clip region or ClipRect will show as being infinite) and you can't break of those clip bounds.

When the state of your visual objects change (for example, on mouse or keyboard events or reacting to data changes), it's normally fine to simply call Invalidate() which will repaint the entire control. Windows will call OnPaint during moments of low CPU usage. Each call to Invalidate() usually will not always correspond to an OnPaint event. Invalidate could be called multiple times before the next paint. So if 10 properties in your data model change all at once, you can safely call Invalidate 10 times on each property change and you'll likely only trigger a single OnPaint event.

I've noticed you should be careful with using Update() and Refresh(). These force a synchronous OnPaint immediately. They're useful for drawing during a single threaded operation (updating a progress bar perhaps), but using them at the wrong times could lead to excessive and unnecessary painting.

If you want to use clip rectangles to improve performance while repainting a scene, you need not keep track of an aggregated clip area yourself. Windows will do this for you. Just invalidate a rectangle or a region that requires invalidation and paint as normal. For example, if an object that you are painting is moved, each time you want to invalidate it's old bounds and it's new bounds, so that you repaint the background where it originally was in addition to painting it in its new location. You must also take into account pen stroke sizes, etc.

And as Hans Passant mentioned, always use 32bppPArgb as the bitmap format for high resolution images. Here's a code snippet on how to load an image as "high performance":

public static Bitmap GetHighPerformanceBitmap(Image original)
{
    Bitmap bitmap;

    bitmap = new Bitmap(original.Width, original.Height, PixelFormat.Format32bppPArgb);
    bitmap.SetResolution(original.HorizontalResolution, original.VerticalResolution);

    using (Graphics g = Graphics.FromImage(bitmap))
    {
        g.DrawImage(original, new Rectangle(new Point(0, 0), bitmap.Size), new Rectangle(new Point(0, 0), bitmap.Size), GraphicsUnit.Pixel);
    }

    return bitmap;
}

 */
