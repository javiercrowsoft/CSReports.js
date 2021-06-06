namespace CSReportPaint {

    import cError = CSKernelClient.cError;
    import cReportAspect = CSReportDll.cReportAspect;
    import csColors = CSReportGlobals.csColors;
    import cColor = CSKernelClient.cColor;
    import HorizontalAlignment = CSReportGlobals.HorizontalAlignment;
    import csReportBorderType = CSReportGlobals.csReportBorderType;

    export class cReportPaint {

        private static C_GRID_AREA_WIDTH: number = 200;
        private static C_GRID_AREA_HEIGHT: number = 67;

        private static C_KEY_PAINT_OBJ: string = "P";
        private static C_KEY_PAINT_SEC: string = "S";

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
        private vGridObjs: [string[]] = null;
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

                this.vGridObjs = [[]];
                this.fnt = [];
                this.vSelectedKeys = [];

                this.zoom = 100;
            } 
            catch (ex) {
                cError.mngError(ex);
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

        public getPaintObject(sKey: string) {
            if (sKey.substring(0, cReportPaint.C_KEY_PAINT_OBJ.length) === cReportPaint.C_KEY_PAINT_OBJ) {
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
            key = this.getKeyPaintObj();
            let paintObj: cReportPaintObject = null;
            paintObj = this.paintObjects.add(paintObj, key);
            paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject);
            return paintObj;
        }

        public getNewSection(paintTypeObject: csRptPaintObjType) {
            let key: string = "";
            key = this.getKeyPaintSec();
            let paintObj: cReportPaintObject = null;
            paintObj = this.paintSections.add(paintObj, key);
            paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject);
            return paintObj;
        }

        public paintObjIsSection(sKey: string) {
            return sKey.substring(0, cReportPaint.C_KEY_PAINT_SEC.length) === cReportPaint.C_KEY_PAINT_SEC;
        }

		public pointIsInObject(x: number, y: number, sKey: string, regionType: csRptPaintRegionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY) {
            if (this.pointIsInObjectAux(this.paintSections, x, y, sKey, regionType)) {
                return true;
            }
            if (this.pointIsInObjectAux(this.paintObjects, x, y, sKey, regionType)) {
                return true;
            }
            return false;
        }

        public pointIsInThisObject(x: number, y: number, sKey: string, regionType: csRptPaintRegionType) {
            if (this.pointIsInThisObjectAux(this.paintObjects.item(sKey), x, y, sKey, regionType)) {
                return true;
            }
            if (this.pointIsInThisObjectAux(this.paintObjects.item(sKey), x, y, sKey, regionType)) {
                return true;
            }
            return false;
        }

        private pointIsInObjectAux(
            paintObjs: cReportPaintObjects,
            x: number,
            y: number,
            sKey: string,
            regionType: csRptPaintRegionType) {
            for(let i = paintObjs.count()-1; i > -1; i--) {
                if (this.pointIsInThisObjectAux(paintObjs.getNextPaintObjForZOrder(i), x, y, sKey, regionType)) {
                    return true;
                }
            }
            return false;
        }

        private pointIsInThisObjectAux(
            paintObj: cReportPaintObject,
            x: number,
            y: number,
            sKey: string,
            regionType: csRptPaintRegionType) {

            const C_WIDTH_REGION: number = 3;

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

                if (this.pointIsInRegion(left - C_WIDTH_REGION,
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
                    if (this.pointIsInRegion(left + C_WIDTH_REGION,
                                        top + C_WIDTH_REGION,
                                        left + width - C_WIDTH_REGION,
                                        top + height - C_WIDTH_REGION,
                                        x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEBODY;
                    }
                    // Left
                    else if (this.pointIsInRegion(left - C_WIDTH_REGION * 2,
                                                yY,
                                                left + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFT;
                    }
                    // Rigth
                    else if (this.pointIsInRegion(left + width - C_WIDTH_REGION * 2,
                                                yY,
                                                left + width + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHT;
                    }
                    // Up
                    else if (this.pointIsInRegion(xX,
                                                top - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2,
                                                top + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEUP;
                    }
                    // Down
                    else if (this.pointIsInRegion(xX,
                                                top + height - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2,
                                                top + height + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPEDOWN;
                    }
                    // LeftUp
                    else if (this.pointIsInRegion(left - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP;
                    }
                    // LeftDown
                    else if (this.pointIsInRegion(left - C_WIDTH_REGION,
                                                top + height - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION,
                                                top + height + C_WIDTH_REGION,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN;
                    }
                    // RigthUp
                    else if (this.pointIsInRegion(left + width - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION,
                                                left + width + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION,
                                                x, y)) {
                        regionType = csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP;
                    }
                    // RitgthDown
                    else if (this.pointIsInRegion(left + width - C_WIDTH_REGION,
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
            return cReportPaint.C_KEY_PAINT_OBJ + this.nextKey;
        }

        private getKeyPaintSec() {
            this.nextKey = this.nextKey + 1;
            return cReportPaint.C_KEY_PAINT_SEC + this.nextKey;
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
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            z1: number,
            w1: number,
            z2: number,
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

            this.pCreateBrushGrid(picGrid, typeGrid);

            y = (picGrid.VisibleClipBounds.Height / cReportPaint.C_GRID_AREA_HEIGHT);
            x = (picGrid.VisibleClipBounds.Width / cReportPaint.C_GRID_AREA_WIDTH);

            x = x + 1;
            y = y + 1;

            this.vGridObjs = [[]];

            let l: number = 0;
            let t: number = 0;

            for (i = 0; i < y * x; i++) {
                c = this.paintGridAreas.add(c, this.getKey());

                left = cReportPaint.C_GRID_AREA_WIDTH * l;
                top = cReportPaint.C_GRID_AREA_HEIGHT * t;
                let w_aspect: cReportAspect = c.getAspect();
                w_aspect.setLeft(left);
                w_aspect.setTop(top);
                w_aspect.setWidth(cReportPaint.C_GRID_AREA_WIDTH);
                w_aspect.setHeight(cReportPaint.C_GRID_AREA_HEIGHT);

                this.vGridObjs[l][t] = c.getKey();

                c = null;

                l = l + 1;
                if (l >= x) {
                    l = 0;
                    t = t + 1;
                }
            }

            this.refreshBackgroundPicture(picGrid, csColors.C_COLOR_WHITE);
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
            this.alingObjToGrid(sKey, false, true, false, false, true);
        }

        public alingObjLeftToGrid(sKey: string) {
            this.alingObjToGrid(sKey, true, false, false, false, true);
        }

        public alingObjBottomToGrid(sKey: string) {
            this.alingObjToGrid(sKey, false, false, true, false, true);
        }

        public alingObjRightToGrid(sKey: string) {
            this.alingObjToGrid(sKey, false, false, false, true, true);
        }

        public alingObjLeftTopToGrid(sKey: string) {
            this.alingObjToGrid(sKey, true, true, false, false, true);
        }

        public alingObjLeftBottomToGrid(sKey: string) {
            this.alingObjToGrid(sKey, true, false, true, false, true);
        }

        public alingObjRightTopToGrid(sKey: string) {
            this.alingObjToGrid(sKey, false, true, false, true, true);
        }

        public alingObjRightBottomToGrid(sKey: string) {
            this.alingObjToGrid(sKey, false, false, true, true, true);
        }

        public alingToGrid(sKey: string) {
            this.alingObjToGrid(sKey, true, true, false, false, false);
        }

        private alingObjToGrid(
            sKey: string,
            toLeft: boolean,
            toTop: boolean,
            toBottom: boolean,
            toRight: boolean,
            resizing: boolean) {
            let z1: number = 0;
            let q1: number = 0;
            let maxY: number = 0;
            let maxX: number = 0;
            let gridObjAspect: cReportAspect = null;

            maxX = this.vGridObjs.length -1;
            maxY = this.vGridObjs[0].length -1;

            let top: number = 0;
            let left: number = 0;
            let width: number = 0;
            let height: number = 0;
            let offset: number = 0;
            const pointSeparation: number = 0.6;
            const offSetPointSep: number = 0.3;

            let paintObjs: cReportPaintObjects = null;

            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_SEC) {
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
                z1 = Math.trunc(nLeft / cReportPaint.C_GRID_AREA_WIDTH);
                q1 = Math.trunc(nTop / cReportPaint.C_GRID_AREA_HEIGHT);

                if (nLeft > z1 * cReportPaint.C_GRID_AREA_WIDTH) { z1 = z1 + 1; }
                if (nTop > q1 * cReportPaint.C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 0) { z1 = 0; }
                if (q1 < 0) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1][q1]).getAspect();

                if (toTop) {
                    // now we need to get which is the nearest point
                    //
                    top = (w_aspect.getTop() - w_aspect.getOffset()) - gridObjAspect.getTop();
                    top = Math.trunc(top / pointSeparation) * pointSeparation;
                    offset = gridObjAspect.getTop()
                                + top 
                                - offSetPointSep
                                - (w_aspect.getTop() - w_aspect.getOffset());
                    w_aspect.setTop((gridObjAspect.getTop() + top - offSetPointSep) + w_aspect.getOffset());

                    if (resizing) {
                        w_aspect.setHeight(w_aspect.getHeight() - offset);
                    }
                }

                if (toLeft) {
                    left = w_aspect.getLeft() - gridObjAspect.getLeft();
                    left = Math.trunc(left / pointSeparation) * pointSeparation;
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
                z1 = Math.trunc((nLeft + w_aspect.getWidth()) / cReportPaint.C_GRID_AREA_WIDTH);
                if (nLeft + w_aspect.getWidth() > z1 * cReportPaint.C_GRID_AREA_WIDTH) { z1 = z1 + 1; }

                q1 = Math.trunc(nTop / cReportPaint.C_GRID_AREA_HEIGHT);
                if (nTop > q1 * cReportPaint.C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1][q1]).getAspect();

                // now we need to get which is the nearest point
                //
                width = w_aspect.getLeft() + w_aspect.getWidth() - gridObjAspect.getLeft();
                width = Math.trunc(width / pointSeparation) * pointSeparation - offSetPointSep;
                w_aspect.setWidth(gridObjAspect.getLeft() + width - w_aspect.getLeft());

            }

            if (toBottom) {
                // we get the grid where the point C is located
                //
                z1 = Math.trunc(nLeft / cReportPaint.C_GRID_AREA_WIDTH);
                q1 = Math.trunc((nTop + w_aspect.getHeight()) / cReportPaint.C_GRID_AREA_HEIGHT);

                if (nLeft > z1 * cReportPaint.C_GRID_AREA_WIDTH) { z1 = z1 + 1; }
                if (nTop + w_aspect.getHeight() > q1 * cReportPaint.C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1][q1]).getAspect();

                // now we need to get which is the nearest point
                //
                height = (w_aspect.getTop() - w_aspect.getOffset()) + w_aspect.getHeight() - gridObjAspect.getTop();
                height = Math.trunc(height / pointSeparation) * pointSeparation - offSetPointSep;
                w_aspect.setHeight(gridObjAspect.getTop() + height - (w_aspect.getTop() - w_aspect.getOffset()));
            }
        }

        // end Align
        //-------------------------------

        // Drawing
        public clearPage(graph: object) {
            this.refreshBackgroundPicture(graph as Graphics, Color.White.ToArgb());
        }

        public refreshObject(key: string, graph: Graphics) {
            this.pClearObject(key, graph);
            return this.drawObject(key, graph);
        }

        public drawObject(key: string, graph: Graphics) {
            return this.draw(this.paintObjects, key, graph);
        }

        public drawSection(key: string, graph: Graphics) {
            // check the width of the paintObject for this section
            // is into the bounds of the page
            //
            let aspect: cReportAspect = this.paintSections.item(key).getAspect();
            if (aspect.getWidth() > this.bitmap.size.Width-2) {
                aspect.setWidth(this.bitmap.size.Width-2);
            }
            return this.draw(this.paintSections, key, graph);
        }

        public drawRule(key: string, graph: Graphics) {
            const LINE_COLOR: number = 0xcc6600;
            let top: number = 0;
            let heightSec: number = 0;
            let aspect: cReportAspect = null;

            aspect = new cReportAspect();

            let w_item: cReportPaintObject = this.paintSections.item(key);
            heightSec = w_item.getHeightSecLine() * 0.5;
            let w_aspect: cReportAspect = w_item.getAspect();
            aspect.setTop(w_aspect.getTop() + 3 - heightSec);
            aspect.setOffset(w_aspect.getOffset());
            aspect.setTransparent(true);
            aspect.setLeft(0);
            aspect.setHeight(20);
            aspect.setAlign(HorizontalAlignment.Right);
            aspect.setWidth(graph.ClipBounds.Width - 1);

            if (w_item.getTextLine() !== "") {
                top = - Math.trunc(w_item.getHeightSec());
                w_aspect = w_item.getAspect();
                top += Math.trunc(w_aspect.getTop() - w_aspect.getOffset() - 6 + w_aspect.getHeight() * 2);

                this.this.printLine(graph,
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
                this.printText(graph, w_item.getTextLine(), aspect, w_item.getImage());

                heightSec = w_item.getHeightSec() * 0.5f;

                // print section's name
                //
                w_aspect = this.paintSections.item(key).getAspect();
                aspect.setTop(w_aspect.getTop() - heightSec);
                aspect.setAlign(HorizontalAlignment.Left);

                this.printText(graph, w_item.getText(), aspect, w_item.getImage());

            }
            else {
                top = Math.trunc(aspect.getTop() - aspect.getOffset() - heightSec + w_item.getAspect().getHeight());

                if (w_item.getIsSection()) {
                    this.this.printLine(graph,
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
                this.printText(graph, w_item.getText(), aspect, w_item.getImage());
            }

            if (w_item === this.paintSections.item(this.paintSections.count() - 1))  {
                top = Math.trunc(aspect.getTop() + w_item.getHeightSecLine() - heightSec - aspect.getOffset() + 6);

                if (w_item.getIsSection()) {
                    this.this.printLine(graph,
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
            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                this.move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                this.move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
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

            this.moveObjToXY(sKey, x, y, graph);

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
            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                this.move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                this.move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
        }

		public moveHorizontal(sKey: string, x: number, graph: Graphics) {
            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                this.move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                this.move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
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

            this.refreshBackgroundPicture(graph, csColors.C_COLOR_WHITE);
            this.beginMoveDone = false;
        }

        // Drawing - Primitive
        private draw(collObjs: cReportPaintObjects, key: string, graph: Graphics) {
            try {
                if (graph === null) {
                    throw new ReportPaintException(
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

                        this.pDrawObjBox(graph,
                                    oPaintObj.getAspect(),
                                    x1, y1, x2, y2,
                                    filled,
                                    colorIn,
                                    colorOut);
                        break;

                    case csRptPaintObjType.CSRPTPAINTOBJLINE:

                        this.this.printLine(graph, filled, x1, y1, x2, y2, colorIn, 1, false, colorOut, false);
                        break;

                    case csRptPaintObjType.CSRPTPAINTOBJCIRCLE:
                        break;

                    case csRptPaintObjType.CSRPTPAINTOBJIMAGE:

                        this.pDrawObjBox(graph,
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

                            this.drawBMP(graph,
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
                        this.printText(graph,
                                    oPaintObj.getText(),
                                    oPaintObj.getAspect(),
                                    oPaintObj.getImage());
                    }
                }

                return true;

            }
            catch (ex) {
                cError.mngError(ex, "Error al dibujar un objeto");
                return false;
            }
        }

        private drawBMP(graph: Graphics, image: Image, x: number, y: number, bmpWidth: number, bmpHeight: number, destWidth: number, destHeight: number) {
            let sourceRect: Rectangle = new Rectangle(0, 0, bmpWidth, bmpHeight);
            let destRect: Rectangle = new Rectangle(Math.trunc(x), Math.trunc(y), bmpWidth, bmpHeight);

            graph.DrawImage(image, destRect, sourceRect, GraphicsUnit.Pixel);
        }

        public setFocus(sKey: string, graph: Graphics, clearSelected: boolean) {
            if (clearSelected) { this.vSelectedKeys = []; }

            if (!this.pAllreadySelected(sKey)) {
                this.vSelectedKeys.push(sKey);
            }

            this.keyFocus = sKey;
            this.paintPicture(graph, true);
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
                this.vSelectedKeys.pop();
            }
            else {
                this.vSelectedKeys = [];
            }

            if (this.keyFocus === sKey) { this.keyFocus = ""; }

            this.paintPicture(graph, true);
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

            if (this.keyFocus.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
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
            this.showHandles(graph, 
                        Math.trunc(w_aspect.getLeft()), 
                        Math.trunc(w_aspect.getTop() - w_aspect.getOffset()), 
                        Math.trunc(w_aspect.getLeft() + w_aspect.getWidth()), 
                        Math.trunc(w_aspect.getTop() - w_aspect.getOffset() + w_aspect.getHeight()), 
                        color, 
                        bCircle);
        }

        private move(left: number, top: number, width: number, height: number, graph: Graphics) {
            if (this.x1 > 0 || this.x2 > 0 || this.y1 > 0 || this.y2 > 0) {
                this.paintPictureMove(graph, cGlobals.newRectangleF(this.x1, this.y1, this.x2, this.y2));
            }

            this.x1 = left;
            this.y1 = top;
            this.x2 = left + width;
            this.y2 = top + height;

            this.printLine(graph, false, this.x1, this.y1, this.x2, this.y2, 0, 1, true, (int)csColors.C_COLOR_BLACK, false);

            if (this.x1 > 1) { this.x1 = this.x1 - 2; }
            if (this.y1 > 1) { this.y1 = this.y1 - 2; }

            this.x2 = this.x2 + 2;
            this.y2 = this.y2 + 2;
        }

        public resize(graph: Graphics, sKey: string, left: number, top: number, x2: number, y2: number) {
            const C_MIN_WIDTH: number = 1;
            const C_MIN_HEIGHT: number = 1;

            let paintObjAsp: cReportAspect = null;

            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
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

            this.paintPicture(graph, false);

            this.printLine(graph, false, this.x1, this.y1, this.x2, this.y2, (int)csColors.C_COLOR_WHITE, 1, true, (int)csColors.C_COLOR_BLACK, false);

            graph.Dispose();
        }

        public createPicture(graph: Graphics) {
            this.refreshBackgroundPicture(graph, 0);
        }

        public createBackgroundBitmap(graph: Graphics) {
            this.bitmap = new Bitmap(graph.VisibleClipBounds.Width + 1, (int)graph.VisibleClipBounds.Height + 3); // TODO check why 56 ???
        }

        private refreshBackgroundPicture(graph: Graphics, color: number) {
            if (this.bitmap !== null) {
                this.bitmap.Dispose();
            }

            this.createBackgroundBitmap(graph);

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
                this.drawObject(getPaintObjects().getNextKeyForZOrder(i), bitmapGraphic);
            }

            for(let i = 0; i < getPaintSections().count(); i++) {
                this.drawSection(getPaintSections().getNextKeyForZOrder(i), bitmapGraphic);
            }

            this.paintPicture(graph, true);
        }

        //--------------------------------------------------------------------------------------------------
        // Draw - Low Level
        private printLine(
            graph: Graphics,
            filled: boolean,
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            colorInside: number,
            width: number,
            dash: boolean,
            colorOut: number,
            rounded: boolean) {

            let pen: Pen;

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
                let rect: Rectangle = cGlobals.newRectangle(Math.trunc(x1), Math.trunc(y1), Math.trunc(x2), Math.trunc(y2));

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
            // padding
            const c_Margen_Y: number = 1; // 20 twips;
            const c_Margen_X: number = 4; // 80 twips;
            const c_Margen_Bottom: number = 4; // 80 twips;

            let idx: number = cGlobals.addFontIfRequired(aspect.getFont(), this.fnt);

            let font: Font = this.fnt[idx];

            let format: StringFormat = new StringFormat();

            format.Trimming = StringTrimming.EllipsisWord;
            format.Alignment = StringAlignment.Near;

            if (!aspect.getWordWrap()) {
                format.FormatFlags = StringFormatFlags.NoWrap;
            }

            let stringWidth: number = this.getPlEvaluateTextWidth(sText, font, this.scaleX);
            let stringHeight: number = this.getPlEvaluateTextHeight(sText, font, aspect.getWidth(), format, this.scaleY, this.scaleX);

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
                    margenY = Math.trunc(aspect.getHeight() - stringHeight - c_Margen_Bottom);
                }                
                if (margenY < c_Margen_Y)  {
                    margenY = c_Margen_Y;
                }
            }

            let nWidth: number = Math.trunc(aspect.getWidth() - margenX * 2);

            if (stringWidth > nWidth)  {
                stringWidth = nWidth;
            }

            let x: number = 0;
            let y: number = 0;

            switch (aspect.getAlign())
            {
                case HorizontalAlignment.Right:
                    x = Math.trunc(aspect.getLeft() + aspect.getWidth() - stringWidth - margenX);
                    break;
                case HorizontalAlignment.Center:
                    x = Math.trunc(aspect.getLeft() + (aspect.getWidth() - stringWidth) * 0.5);
                    break;
                case HorizontalAlignment.Left:
                    x = Math.trunc(aspect.getLeft() + margenX);
                    break;
            }

            y = Math.trunc(aspect.getTop() - aspect.getOffset() + margenY);

            let rect: RectangleF = cGlobals.newRectangleF(x, y, Math.trunc(x + aspect.getWidth() - margenX), y + stringHeight);

            let brush: SolidBrush = new SolidBrush(cColor.colorFromRGB(aspect.getFont().getForeColor()));

            graph.DrawString(sText, font, brush, rect, format);

            brush.Dispose();
        }

        private showHandles(
            graph: Graphics,
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            color: number,
            bCircle: boolean) {

            const iSize: number = 7;

            if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; }

            if (x1 - iSize < 0) { x1 = iSize; }
            if (y1 - iSize < 0) { y1 = iSize; }            

            let brush: Brush = new SolidBrush(cColor.colorFromRGB(color));

            let rect: Rectangle = cGlobals.newRectangle(x1 - iSize, y1 - iSize - 1, x1, y1);
            this.showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x1 - iSize, y2, x1, y2 + iSize);
            this.showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y1 - iSize - 1, x2 + iSize, y1);
            this.showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y2, x2 + iSize, y2 + iSize);
            this.showHandle(graph, brush, rect, bCircle);

            let x: number = Math.trunc((x1 +  / 2) - iSize / 2);
            rect = cGlobals.newRectangle(x, y2, x + iSize, y2 + iSize);
            this.showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x, y1 - iSize - 1, x + iSize, y1);
            this.showHandle(graph, brush, rect, bCircle);

            let y: number = Math.trunc((y1 +  / 2) - iSize / 2);
            rect = cGlobals.newRectangle(x1 - iSize, y, x1, y + iSize);
            this.showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y, x2 + iSize, y + iSize);
            this.showHandle(graph, brush, rect, bCircle);

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
            let rect: Rectangle = cGlobals.newRectangle(0, 0, this.bitmap.Size.Width, this.bitmap.Size.Height);
            if (this.zoom === 100) {
                //BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, this.hMemDC, 0, 0, vbSrcCopy);
                graph.DrawImage(this.bitmap, rect, rect, GraphicsUnit.Pixel);
            }
            else {

            }
            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                this.setFocusAux(this.vSelectedKeys[i], graph);
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
                this.setFocusAux(this.vSelectedKeys[i], graphic);
            }
            graphic.Dispose();
        }

        private paintPictureMove(graph: Graphics, tR: RectangleF) {
            let rect: Rectangle = cGlobals.newRectangle(0, 0, this.bitmap.Size.Width, this.bitmap.Size.Height);
            if (this.zoom === 100) {
                //BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, this.hMemDC, 0, 0, vbSrcCopy);
                graph.DrawImage(this.bitmap, rect, rect, GraphicsUnit.Pixel);
            }
        }

        // grid
        //
        private pCreateBrushGrid(graph: Graphics, typeGrid: csETypeGrid) {
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
            return Math.trunc(stringSize.Width / scaleX); // TODO: check if it is / or *
        }

        private getPlEvaluateTextHeight(text: string, font: Font, width: number, format: StringFormat, scaleY: number, scaleX: number) {
            let graph: Graphics = Graphics.FromImage(this.bitmap);
            let stringSize: SizeF = graph.MeasureString(text, font, Math.trunc(width * scaleX), format);
            graph.Dispose();
            return Math.trunc(stringSize.Height / scaleY); // TODO: check if it is / or * the same function in cReportPrint is using * one has to be wrong
        }

        private pClearObject(key: string, graph: Graphics) {
            let oPaintObj: cReportPaintObject = null;

            oPaintObj = this.paintObjects.item(key);

            if (oPaintObj === null) { return; }

            let w_aspect: cReportAspect = oPaintObj.getAspect();
            let tR: RectangleF = cGlobals.newRectangleF(w_aspect.getLeft(), w_aspect.getTop(), w_aspect.getLeft() + w_aspect.getWidth(), w_aspect.getTop() + w_aspect.getHeight());

            if (tR.Right > graph.ClipBounds.Width) { tR.Width = cGlobals.setRectangleWidth(graph.ClipBounds.Width - tR.Left); }
            if (tR.Bottom > graph.ClipBounds.Height) { tR.Height = cGlobals.setRectangleHeight(graph.ClipBounds.Height - tR.Top); }
        }

        private pDrawObjBox(
            graph: Graphics,
            aspect: cReportAspect,
            x1: number,
            y1: number,
            x2: number,
            y2: number,
            filled: boolean,
            colorIn: number,
            colorOut: number) {

            // this.notBorder is used by preview and printing to indicate the controls must be print a border only
            // when BorderType !== NONE
            // 
            if (this.notBorder == false || filled || aspect.getBorderType() !== csReportBorderType.CSRPTBSNONE) {
                if (aspect.getBorderType() === csReportBorderType.CSRPTBS3D) {

                    this.printLine(graph, filled, x1, y1, x2, y2, colorIn, 0, false, csColors.C_COLOR_WHITE, false);

                    // top
                    //
                    this.printLine(graph, false, x1, y1, x2, y1, csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false);
                    // down
                    //
                    this.printLine(graph, false, x1, y2 - 1, x2, y2 - 1, csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false);
                    // left
                    //
                    this.printLine(graph, false, x1 + 1, y1, x1 + 1, y2, csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3d(), false);
                    // right
                    //
                    this.printLine(graph, false, x2 - 1, y1, x2 - 1, y2, csColors.C_COLOR_WHITE, 1, false, aspect.getBorderColor3dShadow(), false);
                }
                else if (aspect.getBorderRounded()) {
                    this.printLine(graph, filled, x1, y1, x2, y2, colorIn, aspect.getBorderWidth(), false, colorOut, true);
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
                    let borderWidth: number = 1;

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
                        this.printLine(graph, filled, x1, y1, x2, y2, colorIn, borderWidth, dash, colorOut, false);
                    }
                }
            }
        }

        public getBitmap() {
            return this.bitmap;
        }
    }
}