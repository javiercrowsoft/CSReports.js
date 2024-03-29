///<reference path="../../CSDrawing/Font.ts"/>

namespace CSReportPaint {

    import cReportPaperInfo = CSReportEngine.cReportPaperInfo;
    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import cReportFont = CSReportEngine.cReportFont;
    import csRptPageOrientation = CSReportGlobals.csRptPageOrientation;

    import RectangleF = CSDrawing.RectangleF;
    import Font = CSDrawing.Font;

    export class cGlobals {

        private static nextKey = 1000;

        // TODO: validate if needed
        private _flag = {}; // new Bitmap(1, 1);
        private static _g = {DpiX: 96, DpiY: 96};// Graphics.FromImage(_flag);

        public static getNextKey() {
            this.nextKey++;
            return this.nextKey;
        }

        public static getKey(value: string) {
            if(value.length > 0) {
                if("0123456789".contains(value.substring(0, 1))) {
                    value = "K" + value;
                }
            }
            return value;
        }

        public static setRectangleWidth(width: number) {
            if(width < 0) width = 0;
            return width;
        }

        public static setRectangleHeight(height: number) {
            if(height < 0) height = 0;
            return height;
        }

        public static newRectangleF(left: number, top: number, right: number, bottom: number) {
            if(left < 0) left = 0;
            if(top < 0) top = 0;
            if(right < left) right = left;
            if(bottom < top) bottom = top;

            return RectangleF.new4(left, top, right, bottom);
        }

        public static newRectangle(left: number, top: number, right: number, bottom: number) {
            if(left < 0) left = 0;
            if(top < 0) top = 0;
            if(right < left) right = left;
            if(bottom < top) bottom = top;

            return RectangleF.new4(left, top, right, bottom);
        }

        private static getPixelsFromCmX(cm: number) {
            return cm * this._g.DpiX / 2.54;
        }
        private static getPixelsFromCmY(cm: number) {
            return cm * this._g.DpiY / 2.54;
        }

        public static getRectFromPaperSize(info: cReportPaperInfo, paperSize: csReportPaperType, orientation: number) {
            let rtn: RectangleF = new RectangleF();

            switch (paperSize)
            {
                case csReportPaperType.CS_RPT_PAPER_TYPE_LETTER:
                    rtn.setHeight(this.getPixelsFromCmY(27.94)); // 15840;
                    rtn.setWidth(this.getPixelsFromCmX(21.59));  // 12240;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_LEGAL:
                    rtn.setHeight(this.getPixelsFromCmY(35.56)); // 20160;
                    rtn.setWidth(this.getPixelsFromCmX(21.59));  // 12060;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A4:
                    rtn.setHeight(this.getPixelsFromCmY(29.7)); // 16832;
                    rtn.setWidth(this.getPixelsFromCmX(21));    // 11908;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A3:
                    rtn.setHeight(this.getPixelsFromCmY(42)); // 23816;
                    rtn.setWidth(this.getPixelsFromCmX(29.7));    // 16832;
                    break;

                case csReportPaperType.CS_RPT_PAPER_USER:
                    if(info === null) {
                        throw new ReportPaintException("The settings for the custome user paper size is not defined");
                    }
                    else {
                        rtn.setWidth(this.getPixelsFromCmY(info.getCustomWidth()));
                        rtn.setHeight(this.getPixelsFromCmX(info.getCustomHeight()));
                    }
                    break;
            }

            if(orientation === csRptPageOrientation.LANDSCAPE) {
                let tmp: number = 0;
                tmp = rtn.getHeight();
                rtn.setHeight(rtn.getWidth());
                rtn.setWidth(tmp);
            }

            return rtn;
        }

        // fonts
        public static addFontIfRequired(font: cReportFont, fnt: Font[]): number {
            for(let i = 0; i < fnt.length; i++) {
                if(font.getName() === fnt[i].name
                    && font.getBold() === fnt[i].bold
                    && font.getItalic() === fnt[i].italic
                    && font.getUnderline() === fnt[i]._underline
                    && font.getSize() === fnt[i].size
                    && font.getStrike() === fnt[i].strike) {
                    return i;
                }
            }

            let afont: Font = new Font(
                    font.getName(),
                    ((font.getSize() > 0) ? font.getSize() : 3),
                    font.getBold(),
                    font.getItalic(),
                    font.getStrike(),
                    font.getUnderline()
                );

            fnt[fnt.length] = afont;

            return fnt.length-1;
        }
    }

    export enum csETypeGrid {
        CSEGRIDNONE,
        CSEGRIDPOINTS,
        CSEGRIDLINES,
        CSEGRIDLINESVERTICAL,
        CSEGRIDLINESHORIZONTAL
    }

    export enum csRptPaintObjType {
        PAINT_OBJ_BOX,
        PAINT_OBJ_LINE,
        PAINT_OBJ_CIRCLE,
        PAINT_OBJ_IMAGE
    }

    export enum csRptPaintRegionType {
        BODY,
        LEFT_UP,
        LEFT_DOWN,
        RIGHT_UP,
        RIGHT_DOWN,
        UP,
        DOWN,
        LEFT,
        RIGHT
    }

    export enum csEMoveTo {
        FIRSTPAGE = 1,
        NEXTPAGE = -1,
        PREVIOUSPAGE = -2,
        LASTPAGE = -3
    }

    export enum csPDFQuality {
        PDFQUALITYFULL = 1,
        PDFQUALITYSMALL = 2,
        PDFQUALITYMEDIUM = 3
    }

}
