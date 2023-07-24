namespace CSReportPaint {

    import cError = CSKernelClient.cError;
    import cReportAspect = CSReportDll.cReportAspect;
    import csColors = CSReportGlobals.csColors;
    import cColor = CSKernelClient.cColor;
    import HorizontalAlignment = CSReportGlobals.HorizontalAlignment;
    import csReportBorderType = CSReportGlobals.csReportBorderType;
    import RefWrapper = CSKernelClient.RefWrapper;

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
            const key = this.getKeyPaintObj();
            const paintObj = this.paintObjects.add(null, key);
            paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject);
            return paintObj;
        }

        public getNewSection(paintTypeObject: csRptPaintObjType) {
            const key = this.getKeyPaintSec();
            const paintObj = this.paintSections.add(null, key);
            paintObj.setKey(key);
            paintObj.setPaintType(paintTypeObject);
            return paintObj;
        }

        public paintObjIsSection(sKey: string) {
            return sKey.substring(0, cReportPaint.C_KEY_PAINT_SEC.length) === cReportPaint.C_KEY_PAINT_SEC;
        }

		public pointIsInObject(
		    x: number, y: number, sKey: string,
            regionType: RefWrapper<csRptPaintRegionType> = new RefWrapper(csRptPaintRegionType.CRPTPNTRGNTYPEBODY)) {
            if (this.pointIsInObjectAux(this.paintSections, x, y, sKey, regionType)) {
                return true;
            }
            else if (this.pointIsInObjectAux(this.paintObjects, x, y, sKey, regionType)) {
                return true;
            }
            return false;
        }

        public pointIsInThisObject(x: number, y: number, sKey: string, regionType: RefWrapper<csRptPaintRegionType>) {
            if (this.pointIsInThisObjectAux(this.paintObjects.item(sKey), x, y, sKey, regionType)) {
                return true;
            }
            else if (this.pointIsInThisObjectAux(this.paintObjects.item(sKey), x, y, sKey, regionType)) {
                return true;
            }
            return false;
        }

        private pointIsInObjectAux(
            paintObjs: cReportPaintObjects,
            x: number,
            y: number,
            sKey: string,
            regionType: RefWrapper<csRptPaintRegionType>) {
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
            regionType: RefWrapper<csRptPaintRegionType>) {

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

                if (CSReportPaint.cReportPaint.pointIsInRegion(left - C_WIDTH_REGION,
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
                    if (CSReportPaint.cReportPaint.pointIsInRegion(left + C_WIDTH_REGION,
                                        top + C_WIDTH_REGION,
                                        left + width - C_WIDTH_REGION,
                                        top + height - C_WIDTH_REGION,
                                        x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPEBODY);
                    }
                    // Left
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(left - C_WIDTH_REGION * 2,
                                                yY,
                                                left + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPELEFT);
                    }
                    // Rigth
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(left + width - C_WIDTH_REGION * 2,
                                                yY,
                                                left + width + C_WIDTH_REGION * 2,
                                                yY + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPERIGHT);
                    }
                    // Up
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(xX,
                                                top - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2,
                                                top + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPEUP);
                    }
                    // Down
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(xX,
                                                top + height - C_WIDTH_REGION * 2,
                                                xX + C_WIDTH_REGION * 2,
                                                top + height + C_WIDTH_REGION * 2,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPEDOWN);
                    }
                    // LeftUp
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(left - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPELEFTUP);
                    }
                    // LeftDown
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(left - C_WIDTH_REGION,
                                                top + height - C_WIDTH_REGION,
                                                left + C_WIDTH_REGION,
                                                top + height + C_WIDTH_REGION,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPELEFTDOWN);
                    }
                    // RightUp
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(left + width - C_WIDTH_REGION,
                                                top - C_WIDTH_REGION,
                                                left + width + C_WIDTH_REGION,
                                                top + C_WIDTH_REGION,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPERIGHTUP);
                    }
                    // RightDown
                    else if (CSReportPaint.cReportPaint.pointIsInRegion(left + width - C_WIDTH_REGION,
                                                top + height - C_WIDTH_REGION,
                                                left + width + C_WIDTH_REGION,
                                                top + height + C_WIDTH_REGION,
                                                x, y)) {
                        regionType.set(csRptPaintRegionType.CRPTPNTRGNTYPERIGHTDOWN);
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

        private static pointIsInRegion(x1: number, y1: number, x2: number, y2: number, x: number, y: number) {
            return x >= x1 && x <= x2 && y >= y1 && y <= y2;
        }

        // we have four points for every region. we need to know if at least one point
        // of region A is in region B or viceversa
        //
        private static regionIsInRegion3D(
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
            else if (x1 <= z2 && x2 >= z2 && w1 <= y1 && w2 >= y1) {
                return true;
            }
            else if (x1 <= z1 && x2 >= z1 && w1 <= y2 && w2 >= y2) {
                return true;
            }
            else if (x1 <= z2 && x2 >= z2 && w1 <= y2 && w2 >= y2) {
                return true;
            }
            // then A in B
            //
            else if (z1 <= x1 && z2 >= x1 && y1 <= w1 && y2 >= w1) {
                return true;
            }
            else if (z1 <= x2 && z2 >= x2 && y1 <= w1 && y2 >= w1) {
                return true;
            }
            else if (z1 <= x1 && z2 >= x1 && y1 <= w2 && y2 >= w2) {
                return true;
            }
            else if (z1 <= x2 && z2 >= x2 && y1 <= w2 && y2 >= w2) {
                return true;
            }
            return false;
        }

        //-----------------------------------------------------------------------------------------------
        // Grid
        //
        public initGrid(graphicGrid: Graphic, typeGrid: csETypeGrid) {
            let top: number = 0;
            let left: number = 0;

            this.createBrushGrid(typeGrid);

            let y = (graphicGrid.getBoundingClientRect().height / cReportPaint.C_GRID_AREA_HEIGHT);
            let x = (graphicGrid.getBoundingClientRect().width / cReportPaint.C_GRID_AREA_WIDTH);

            x = x + 1;
            y = y + 1;

            this.vGridObjs = [[]];

            let l: number = 0;
            let t: number = 0;

            for (let i = 0; i < y * x; i++) {
                const c = this.paintGridAreas.add(null, this.getKey());

                left = cReportPaint.C_GRID_AREA_WIDTH * l;
                top = cReportPaint.C_GRID_AREA_HEIGHT * t;
                const aspect: cReportAspect = c.getAspect();
                aspect.setLeft(left);
                aspect.setTop(top);
                aspect.setWidth(cReportPaint.C_GRID_AREA_WIDTH);
                aspect.setHeight(cReportPaint.C_GRID_AREA_HEIGHT);

                this.vGridObjs[l][t] = c.getKey();

                l = l + 1;
                if (l >= x) {
                    l = 0;
                    t = t + 1;
                }
            }

            this.refreshBackgroundPicture(graphicGrid, Color.White.toArgb());
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
        public alignObjTopToGrid(sKey: string) {
            this.alignObjToGrid(sKey, false, true, false, false, true);
        }

        public alignObjLeftToGrid(sKey: string) {
            this.alignObjToGrid(sKey, true, false, false, false, true);
        }

        public alignObjBottomToGrid(sKey: string) {
            this.alignObjToGrid(sKey, false, false, true, false, true);
        }

        public alignObjRightToGrid(sKey: string) {
            this.alignObjToGrid(sKey, false, false, false, true, true);
        }

        public alignObjLeftTopToGrid(sKey: string) {
            this.alignObjToGrid(sKey, true, true, false, false, true);
        }

        public alignObjLeftBottomToGrid(sKey: string) {
            this.alignObjToGrid(sKey, true, false, true, false, true);
        }

        public alignObjRightTopToGrid(sKey: string) {
            this.alignObjToGrid(sKey, false, true, false, true, true);
        }

        public alignObjRightBottomToGrid(sKey: string) {
            this.alignObjToGrid(sKey, false, false, true, true, true);
        }

        public alignToGrid(sKey: string) {
            this.alignObjToGrid(sKey, true, true, false, false, false);
        }

        private alignObjToGrid(
            sKey: string,
            toLeft: boolean,
            toTop: boolean,
            toBottom: boolean,
            toRight: boolean,
            resizing: boolean) {
            
            let z1: number = 0;
            let q1: number = 0;
            let gridObjAspect: cReportAspect = null;

            let maxX = this.vGridObjs.length -1;
            let maxY = this.vGridObjs[0].length -1;

            let top: number = 0;
            let left: number = 0;
            let width: number = 0;
            let height: number = 0;
            let offset: number = 0;
            const pointSeparation: number = 0.6;
            const offSetPointSep: number = 0.3;

            let paintObjs: cReportPaintObjects;

            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_SEC) {
                paintObjs = this.paintSections;
            }
            else {
                paintObjs = this.paintObjects;
            }

            let item: cReportPaintObject = paintObjs.item(sKey);
            let aspect: cReportAspect = item.getAspect();
            let nLeft = aspect.getLeft() - offSetPointSep;
            let nTop = aspect.getTop() - aspect.getOffset() - offSetPointSep;

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
                    top = (aspect.getTop() - aspect.getOffset()) - gridObjAspect.getTop();
                    top = Math.trunc(top / pointSeparation) * pointSeparation;
                    offset = gridObjAspect.getTop()
                                + top 
                                - offSetPointSep
                                - (aspect.getTop() - aspect.getOffset());
                    aspect.setTop((gridObjAspect.getTop() + top - offSetPointSep) + aspect.getOffset());

                    if (resizing) {
                        aspect.setHeight(aspect.getHeight() - offset);
                    }
                }

                if (toLeft) {
                    left = aspect.getLeft() - gridObjAspect.getLeft();
                    left = Math.trunc(left / pointSeparation) * pointSeparation;
                    offset = gridObjAspect.getLeft() + left - offSetPointSep - aspect.getLeft();
                    aspect.setLeft(gridObjAspect.getLeft() + left - offSetPointSep);

                    if (resizing) {
                        aspect.setWidth(aspect.getWidth() - offset);
                    }
                }
            }

            if (toRight) {
                // we get the grid where the point B is located
                //
                z1 = Math.trunc((nLeft + aspect.getWidth()) / cReportPaint.C_GRID_AREA_WIDTH);
                if (nLeft + aspect.getWidth() > z1 * cReportPaint.C_GRID_AREA_WIDTH) { z1 = z1 + 1; }

                q1 = Math.trunc(nTop / cReportPaint.C_GRID_AREA_HEIGHT);
                if (nTop > q1 * cReportPaint.C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1][q1]).getAspect();

                // now we need to get which is the nearest point
                //
                width = aspect.getLeft() + aspect.getWidth() - gridObjAspect.getLeft();
                width = Math.trunc(width / pointSeparation) * pointSeparation - offSetPointSep;
                aspect.setWidth(gridObjAspect.getLeft() + width - aspect.getLeft());

            }

            if (toBottom) {
                // we get the grid where the point C is located
                //
                z1 = Math.trunc(nLeft / cReportPaint.C_GRID_AREA_WIDTH);
                q1 = Math.trunc((nTop + aspect.getHeight()) / cReportPaint.C_GRID_AREA_HEIGHT);

                if (nLeft > z1 * cReportPaint.C_GRID_AREA_WIDTH) { z1 = z1 + 1; }
                if (nTop + aspect.getHeight() > q1 * cReportPaint.C_GRID_AREA_HEIGHT) { q1 = q1 + 1; }

                if (z1 < 1) { z1 = 0; }
                if (q1 < 1) { q1 = 0; }

                if (z1 > maxX) { z1 = maxX; }
                if (q1 > maxY) { q1 = maxY; }

                gridObjAspect = this.paintGridAreas.item(this.vGridObjs[z1][q1]).getAspect();

                // now we need to get which is the nearest point
                //
                height = (aspect.getTop() - aspect.getOffset()) + aspect.getHeight() - gridObjAspect.getTop();
                height = Math.trunc(height / pointSeparation) * pointSeparation - offSetPointSep;
                aspect.setHeight(gridObjAspect.getTop() + height - (aspect.getTop() - aspect.getOffset()));
            }
        }

        // end Align
        //-------------------------------

        // Drawing
        public clearPage(graph: object) {
            this.refreshBackgroundPicture(graph as Graphic, Color.White.toArgb());
        }

        public refreshObject(key: string, graph: Graphic) {
            this.pClearObject(key, graph);
            return this.drawObject(key, graph);
        }

        public drawObject(key: string, graph: Graphic) {
            return this.draw(this.paintObjects, key, graph);
        }

        public drawSection(key: string, graph: Graphic) {
            // check the width of the paintObject for this section
            // is into the bounds of the page
            //
            let aspect: cReportAspect = this.paintSections.item(key).getAspect();
            if (aspect.getWidth() > this.bitmap.getSize().width-2) {
                aspect.setWidth(this.bitmap.getSize().width-2);
            }
            return this.draw(this.paintSections, key, graph);
        }

        public drawRule(key: string, graphic: Graphic) {
            const LINE_COLOR: number = 0xcc6600;

            const aspect = new cReportAspect();

            let secPO: cReportPaintObject = this.paintSections.item(key);
            let heightSec = secPO.getHeightSecLine() * 0.5;
            let secAspect: cReportAspect = secPO.getAspect();
            aspect.setTop(secAspect.getTop() + 3 - heightSec);
            aspect.setOffset(secAspect.getOffset());
            aspect.setTransparent(true);
            aspect.setLeft(0);
            aspect.setHeight(20);
            aspect.setAlign(HorizontalAlignment.Right);
            aspect.setWidth(graphic.getBoundingClientRect().width - 1);

            let top: number;

            if (secPO.getTextLine() !== "") {
                top = - Math.trunc(secPO.getHeightSec());
                secAspect = secPO.getAspect();
                top += Math.trunc(secAspect.getTop() - secAspect.getOffset() - 6 + secAspect.getHeight() * 2);

                this.printLine(graphic,
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
                this.printText(graphic, secPO.getTextLine(), aspect, secPO.getImage());

                heightSec = secPO.getHeightSec() * 0.5;

                // print section's name
                //
                secAspect = this.paintSections.item(key).getAspect();
                aspect.setTop(secAspect.getTop() - heightSec);
                aspect.setAlign(HorizontalAlignment.Left);

                this.printText(graphic, secPO.getText(), aspect, secPO.getImage());

            }
            else {
                top = Math.trunc(aspect.getTop() - aspect.getOffset() - heightSec + secPO.getAspect().getHeight());

                if (secPO.getIsSection()) {
                    this.printLine(graphic,
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
                this.printText(graphic, secPO.getText(), aspect, secPO.getImage());
            }

            if (secPO === this.paintSections.item(this.paintSections.count() - 1))  {
                top = Math.trunc(aspect.getTop() + secPO.getHeightSecLine() - heightSec - aspect.getOffset() + 6);

                if (secPO.getIsSection()) {
                    this.printLine(graphic,
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

		public moveObjToXY(sKey: string, x: number, y: number, graph: Graphic) {
            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                this.move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                this.move(x, y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
        }

		public moveObjToXYEx(sKey: string, x: number, y: number, graph: Graphic, clear: boolean) {
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

		public moveVertical(sKey: string, y: number, graph: Graphic) {
            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                this.move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                this.move(w_aspect.getLeft(), y, w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
        }

		public moveHorizontal(sKey: string, x: number, graph: Graphic) {
            if (sKey.substring(0, 1) === cReportPaint.C_KEY_PAINT_OBJ) {
                let w_aspect: cReportAspect = this.paintObjects.item(sKey).getAspect();
                this.move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
            else {
                let w_aspect: cReportAspect = this.paintSections.item(sKey).getAspect();
                this.move(x, w_aspect.getTop(), w_aspect.getWidth(), w_aspect.getHeight(), graph);
            }
        }

        public endMove(graph: Graphic) {
            this.x1 = 0;
            this.x2 = 0;
            this.y1 = 0;
            this.y2 = 0;

            this.x1Ex = 0;
            this.x2Ex = 0;
            this.y1Ex = 0;
            this.y2Ex = 0;

            this.refreshBackgroundPicture(graph, Color.White.toArgb());
            this.beginMoveDone = false;
        }

        // Drawing - Primitive
        private draw(collObjs: cReportPaintObjects, key: string, graph: Graphic) {
            try {
                if (graph === null) {
                    throw new ReportPaintException(
                        cReportPaintError.errGetDescription(
                                        csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT));
                }

                let x1: number = 0;
                let y1: number = 0;
                let y2: number = 0;
                let x2: number = 0;
                let colorIn: number = 0;
                let colorOut: number = 0;
                let filled: boolean = false;

                let oPaintObj = collObjs.item(key);

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

                        this.printLine(graph, filled, x1, y1, x2, y2, colorIn, 1, false, colorOut, false);
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
                cError.mngError(ex);
                return false;
            }
        }

        private drawBMP(graph: Graphic,
                        image: Image,
                        x: number, y: number,
                        bmpWidth: number,
                        bmpHeight: number,
                        destWidth: number, destHeight: number) { // TODO: maybe should remove these unused arguments
            graph.drawImage(image, x, y);
        }

        public setFocus(sKey: string, graph: Graphic, clearSelected: boolean) {
            if (clearSelected) { this.vSelectedKeys = []; }

            if (!this.pAllreadySelected(sKey)) {
                this.vSelectedKeys.push(sKey);
            }

            this.keyFocus = sKey;
            this.paintPicture(graph, true);
        }

        public removeFromSelected(sKey: string, graph: Graphic) {
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

        private setFocusAux(sKey: string, graph: Graphic) {
            let paintObjAsp: cReportPaintObject;
            let color;
            let bCircle: boolean;

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

            let aspect: cReportAspect = paintObjAsp.getAspect();
            this.showHandles(graph, 
                        Math.trunc(aspect.getLeft()),
                        Math.trunc(aspect.getTop() - aspect.getOffset()),
                        Math.trunc(aspect.getLeft() + aspect.getWidth()),
                        Math.trunc(aspect.getTop() - aspect.getOffset() + aspect.getHeight()),
                        color, 
                        bCircle);
        }

        private move(left: number, top: number, width: number, height: number, graph: Graphic) {
            if (this.x1 > 0 || this.x2 > 0 || this.y1 > 0 || this.y2 > 0) {
                this.paintPictureMove(graph, cGlobals.newRectangleF(this.x1, this.y1, this.x2, this.y2));
            }

            this.x1 = left;
            this.y1 = top;
            this.x2 = left + width;
            this.y2 = top + height;

            this.printLine(
                graph, false,
                this.x1, this.y1, this.x2, this.y2,
                0, 1, true,
                csColors.C_COLOR_BLACK, false);

            if (this.x1 > 1) { this.x1 = this.x1 - 2; }
            if (this.y1 > 1) { this.y1 = this.y1 - 2; }

            this.x2 = this.x2 + 2;
            this.y2 = this.y2 + 2;
        }

        public resize(graphic: Graphic, sKey: string, left: number, top: number, x2: number, y2: number) {
            const C_MIN_WIDTH: number = 1;
            const C_MIN_HEIGHT: number = 1;

            let paintObjAsp: cReportAspect;

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
            if (this.y2 < paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT) {
                this.y2 = paintObjAsp.getTop() - paintObjAsp.getOffset() + C_MIN_HEIGHT;
            }

            this.paintPicture(graphic, false);

            this.printLine(
                graphic, false,
                this.x1, this.y1, this.x2, this.y2,
                csColors.C_COLOR_WHITE, 1, true, csColors.C_COLOR_BLACK, false);

            graphic.dispose();
        }

        public createPicture(graphic: Graphic) {
            this.refreshBackgroundPicture(graphic, 0);
        }

        public createBackgroundBitmap(graphic: Graphic) {
            this.bitmap = new Bitmap(graphic.getBoundingClientRect().width + 1, graphic.getBoundingClientRect().height + 3); // TODO check why 56 ???
        }

        private refreshBackgroundPicture(graphic: Graphic, rgbColor: string) {
            if (this.bitmap !== null) {
                this.bitmap.dispose();
            }

            this.createBackgroundBitmap(graphic);

            let bitmapGraphic: Graphic = Graphics.FromImage(this.bitmap);

            let rect: Rectangle = cGlobals
                .newRectangle(0, 0,
                    graphic.getBoundingClientRect().width, graphic.getBoundingClientRect().height + 3); // TODO check why 56 ???;

            if (this.brushGrid !== null) {
                bitmapGraphic.fillStyle = this.brushGrid;
            }
            else  {
                bitmapGraphic.fillStyle = rgbColor;
            }
            bitmapGraphic.fillRect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());

            for(let i = 0; i < this.getPaintObjects().count(); i++) {
                this.drawObject(this.getPaintObjects().getNextKeyForZOrder(i), bitmapGraphic);
            }

            for(let i = 0; i < this.getPaintSections().count(); i++) {
                this.drawSection(this.getPaintSections().getNextKeyForZOrder(i), bitmapGraphic);
            }

            this.paintPicture(graphic, true);
        }

        //--------------------------------------------------------------------------------------------------
        // Draw - Low Level
        private printLine(
            graph: Graphic,
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

            let pen = new Pen(cColor.colorFromRGB(colorOut), width);

            if (dash) {
                pen.DashStyle = DashStyle.Dot;
            }

            if (rounded) {
                y1 = y1 * this.scaleY;
                y2 = y2 * this.scaleY;
                x1 = x1 * this.scaleX;
                x2 = x2 * this.scaleX;

                let extGraph: cGraphics = new cGraphics(graph);
                extGraph.DrawRoundRectangle(pen, x1, y1, x2-x1, y2-y1, 8);
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
                        brush.dispose();
                    }

                    // the original version didn't put a border when the height is 20 twips
                    // we want to preserve that behaviour
                    //
                    if (!(rect.getHeight() === 1 && filled)) {
                        graph.DrawRectangle(pen, rect);
                    }
                }
                else {
                    if (rect.getHeight() === 0 || rect.getBottom() === rect.getTop()) { rect.setHeight(1); }
                    if (rect.getWidth() === 0 || rect.getLeft() === rect.getRight()) { rect.setWidth(1); }

                    graph.DrawRectangle(pen, rect);
                }
            }

            pen.dispose();
        }

        private printText(graph: Graphic, sText: string, aspect: cReportAspect, image: Image) {
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
            // this is for security, because
            // when we print to the printer (on screen this doesn't happen)
            // for small differences in the
            // process of scaling up to the printer resolution
            // in some cases part of the text is lost if the
            // rectangle that requested is too small
            //
            stringHeight += 25; //+ 400 the original code was in twips;

            let marginX: number = c_Margen_X;
            let marginY: number = c_Margen_Y;

            if (image !== null) {
                marginX += image.Size.Width;
                marginY = image.Size.Height - stringHeight - c_Margen_Bottom;

                if (marginY + stringHeight > aspect.getHeight())  {
                    marginY = Math.trunc(aspect.getHeight() - stringHeight - c_Margen_Bottom);
                }                
                if (marginY < c_Margen_Y)  {
                    marginY = c_Margen_Y;
                }
            }

            let nWidth: number = Math.trunc(aspect.getWidth() - marginX * 2);

            if (stringWidth > nWidth)  {
                stringWidth = nWidth;
            }

            let x: number = 0;
            let y: number = 0;

            switch (aspect.getAlign())
            {
                case HorizontalAlignment.Right:
                    x = Math.trunc(aspect.getLeft() + aspect.getWidth() - stringWidth - marginX);
                    break;
                case HorizontalAlignment.Center:
                    x = Math.trunc(aspect.getLeft() + (aspect.getWidth() - stringWidth) * 0.5);
                    break;
                case HorizontalAlignment.Left:
                    x = Math.trunc(aspect.getLeft() + marginX);
                    break;
            }

            y = Math.trunc(aspect.getTop() - aspect.getOffset() + marginY);

            let rect: RectangleF = cGlobals.newRectangleF(x, y, Math.trunc(x + aspect.getWidth() - marginX), y + stringHeight);

            let brush: SolidBrush = new SolidBrush(cColor.colorFromRGB(aspect.getFont().getForeColor()));

            graph.DrawString(sText, font, brush, rect, format);

            brush.dispose();
        }

        private showHandles(
            graph: Graphic,
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

            let x: number = Math.trunc((x1 + (x2 - x1) / 2) - iSize / 2);
            rect = cGlobals.newRectangle(x, y2, x + iSize, y2 + iSize);
            this.showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x, y1 - iSize - 1, x + iSize, y1);
            this.showHandle(graph, brush, rect, bCircle);

            let y: number = Math.trunc((y1 + (y2 - y1) / 2) - iSize / 2);
            rect = cGlobals.newRectangle(x1 - iSize, y, x1, y + iSize);
            this.showHandle(graph, brush, rect, bCircle);

            rect = cGlobals.newRectangle(x2, y, x2 + iSize, y + iSize);
            this.showHandle(graph, brush, rect, bCircle);

            brush.dispose();
        }

        private showHandle(graph: Graphic, brush: Brush, rect: Rectangle, circle: boolean) {
            if (circle) {
                graph.FillEllipse(brush, rect);
            }
            else {
                graph.FillRectangle(brush, rect);
            }
        }

        public paintPicture(graph: Graphic, disposeGraphicObject: boolean) {
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
                graph.dispose();
            }
        }

        public beginMove() {
            if (this.beginMoveDone) { return; }

            this.beginMoveDone = true;

            let graphic: Graphic = Graphic.FromImage(this.bitmap);
            for(let i = 0; i < this.vSelectedKeys.length; i++) {
                this.setFocusAux(this.vSelectedKeys[i], graphic);
            }
            graphic.dispose();
        }

        private paintPictureMove(graph: Graphic, tR: RectangleF) {
            let rect: Rectangle = cGlobals.newRectangle(0, 0, this.bitmap.Size.Width, this.bitmap.Size.Height);
            if (this.zoom === 100) {
                //BitBlt(graph.hDC, 0, 0, tR.right, tR.bottom, this.hMemDC, 0, 0, vbSrcCopy);
                graph.DrawImage(this.bitmap, rect, rect, GraphicsUnit.Pixel);
            }
        }

        // grid
        //
        private createBrushGrid(typeGrid: csETypeGrid) {
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
            let graph: Graphic = Graphics.FromImage(this.bitmap);
            let stringSize: SizeF = graph.MeasureString(text, font);
            graph.dispose();
            return Math.trunc(stringSize.Width / scaleX); // TODO: check if it is / or *
        }

        private getPlEvaluateTextHeight(text: string, font: Font, width: number, format: StringFormat, scaleY: number, scaleX: number) {
            let graph: Graphic = Graphics.FromImage(this.bitmap);
            let stringSize: SizeF = graph.MeasureString(text, font, Math.trunc(width * scaleX), format);
            graph.dispose();
            return Math.trunc(stringSize.Height / scaleY); // TODO: check if it is / or * the same function in cReportPrint is using * one has to be wrong
        }

        private pClearObject(key: string, graph: Graphic) {
            let oPaintObj: cReportPaintObject = null;

            oPaintObj = this.paintObjects.item(key);

            if (oPaintObj === null) { return; }

            let w_aspect: cReportAspect = oPaintObj.getAspect();
            let tR: RectangleF = cGlobals.newRectangleF(w_aspect.getLeft(), w_aspect.getTop(), w_aspect.getLeft() + w_aspect.getWidth(), w_aspect.getTop() + w_aspect.getHeight());

            if (tR.Right > graph.ClipBounds.Width) { tR.Width = cGlobals.setRectangleWidth(graph.ClipBounds.Width - tR.Left); }
            if (tR.Bottom > graph.ClipBounds.Height) { tR.Height = cGlobals.setRectangleHeight(graph.ClipBounds.Height - tR.Top); }
        }

        private pDrawObjBox(
            graph: Graphic,
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
            if (this.notBorder == false || filled || aspect.getBorderType() !== csReportBorderType.CS_RPT_BS_NONE) {
                if (aspect.getBorderType() === csReportBorderType.CS_RPT_BS_3D) {

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
                    // TODO: this is a bug. Then only way to get a border is setting BorderType to CS_RPT_BS_3D or 
                    //       BorderRounded === TRUE
                    //
                    //       when BorderType === CS_RPT_BS_FIXED the border is not drawn
                    //
                    //       we need to fix it but the fix will break all reports so first we need to update
                    //       those reports to set the BorderType to CS_RPT_BS_NONE
                    //
                    let dash: boolean = false;
                    let borderWidth: number = 1;

                    if (this.notBorder === false 
                            && (
                                (
                                    aspect.getBorderType() === csReportBorderType.CS_RPT_BS_FIXED 
                                    && !aspect.getBorderRounded()
                                    && aspect.getBorderWidth() === 0
                                )
                                || aspect.getBorderType() === csReportBorderType.CS_RPT_BS_NONE
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
                        || (aspect.getBorderType() === csReportBorderType.CS_RPT_BS_FIXED && aspect.getBorderWidth() > 0)) {
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