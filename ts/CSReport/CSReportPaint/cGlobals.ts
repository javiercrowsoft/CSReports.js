namespace CSReportPaint {

    import cReportPaperInfo = CSReportDll.cReportPaperInfo;
    import csReportPaperType = CSReportGlobals.csReportPaperType;
    import cReportFont = CSReportDll.cReportFont;

    export class cGlobals {

        private static nextKey = 1000;

        private _flag = new Bitmap(1, 1);
        private _g = Graphics.FromImage(_flag);

        public static getNextKey() {
            this.nextKey++;
            return this.nextKey;
        }

        public static getKey(value: string) {
            if (value.length > 0) {
                if ("0123456789".contains(value.substring(0, 1))) {
                    value = "K" + value;
                }
            }
            return value;
        }

        public static getBitmapSize(image: Image, imgWidth: number, imgHeight: number, inTwips: boolean) {
            imgWidth = image.Width;
            imgHeight = image.Height;
        }

        public static setRectangleWidth(width: number) {
            if (width < 0) width = 0;
            return width;
        }

        public static setRectangleHeight(height: number) {
            if (height < 0) height = 0;
            return height;
        }

        public static newRectangleF(left: number, top: number, right: number, bottom: number) {
            if (left < 0) left = 0;
            if (top < 0) top = 0;
            if (right < left) right = left;
            if (bottom < top) bottom = top;

            return new RectangleF(left, top, right-left, bottom-top);
        }

        public static newRectangle(left: number, top: number, right: number, bottom: number) {
            if (left < 0) left = 0;
            if (top < 0) top = 0;
            if (right < left) right = left;
            if (bottom < top) bottom = top;

            return new Rectangle(left, top, right-left, bottom-top);
        }

        private static getPixelsFromCmX(cm: number) {
            return cm * _g.DpiX / 2.54;
        }
        private static getPixelsFromCmY(cm: number) {
            return cm * _g.DpiY / 2.54;
        }

        public static getRectFromPaperSize(info: cReportPaperInfo, paperSize: csReportPaperType, orientation: number) {
            let rtn: RectangleF = new RectangleF();

            switch (paperSize)
            {
                case csReportPaperType.CS_RPT_PAPER_TYPE_LETTER:
                    rtn.Height = this.getPixelsFromCmY(27.94); // 15840;
                    rtn.Width = this.getPixelsFromCmX(21.59);  // 12240;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_LEGAL:
                    rtn.Height = this.getPixelsFromCmY(35.56); // 20160;
                    rtn.Width = this.getPixelsFromCmX(21.59);  // 12060;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A4:
                    rtn.Height = this.getPixelsFromCmY(29.7); // 16832;
                    rtn.Width = this.getPixelsFromCmX(21);    // 11908;
                    break;

                case csReportPaperType.CS_RPT_PAPER_TYPE_A3:
                    rtn.Height = this.getPixelsFromCmY(42); // 23816;
                    rtn.Width = this.getPixelsFromCmX(29.7);    // 16832;
                    break;

                case csReportPaperType.CS_RPT_PAPER_USER:
                    if (info === null) {
                        throw new ReportPaintException("The settings for the custome user paper size is not defined");
                    }
                    else {
                        rtn.Width = this.getPixelsFromCmY(info.getCustomWidth());
                        rtn.Height = this.getPixelsFromCmX(info.getCustomHeight());
                    }
                    break;
            }

            if (orientation === csRptPageOrientation.LANDSCAPE) {
                let tmp: number = 0;
                tmp = rtn.Height;
                rtn.Height = rtn.Width;
                rtn.Width = tmp;
            }

            return rtn;
        }

        // fonts
        public addFontIfRequired(font: cReportFont, fnt: Font[]) {
            for(let i = 0; i < this.fnt.length; i++) {
                if(font.getName() === this.fnt[i].Name 
                    && font.getBold() === this.fnt[i].Bold 
                    && font.getItalic() === this.fnt[i].Italic 
                    && font.getUnderline() === this.fnt[i].Underline 
                    && font.getSize() === this.fnt[i].Size 
                    && font.getStrike() === this.fnt[i].Strikeout) {
                    return i;
                }
            }

            redimPreserve(this.fnt, this.fnt.length + 1);

            let fontStyle: FontStyle = FontStyle.Regular;
            if (font.getBold()) fontStyle = fontStyle + FontStyle.Bold;
            if (font.getItalic()) fontStyle = fontStyle + FontStyle.Italic;
            if (font.getUnderline()) fontStyle = fontStyle + FontStyle.Underline;
            if (font.getStrike()) fontStyle = fontStyle + FontStyle.Strikeout;

            let afont: Font = new Font(font.getName(), ((font.getSize() > 0) ? font.getSize() : 3), fontStyle);

            this.fnt[this.fnt.length - 1] = afont;

            return this.fnt.length - 1;
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
        CSRPTPAINTOBJBOX,
        CSRPTPAINTOBJLINE,
        CSRPTPAINTOBJCIRCLE,
        CSRPTPAINTOBJIMAGE
    }

    export enum csRptPaintRegionType {
        CRPTPNTRGNTYPEBODY,
        CRPTPNTRGNTYPELEFTUP,
        CRPTPNTRGNTYPELEFTDOWN,
        CRPTPNTRGNTYPERIGHTUP,
        CRPTPNTRGNTYPERIGHTDOWN,
        CRPTPNTRGNTYPEUP,
        CRPTPNTRGNTYPEDOWN,
        CRPTPNTRGNTYPELEFT,
        CRPTPNTRGNTYPERIGHT
    }

    export enum csEMoveTo {
        C_FIRSTPAGE = 1,
        C_NEXTPAGE = -1,
        C_PREVIOUSPAGE = -2,
        C_LASTPAGE = -3
    } 

    export enum csPDFQuality {
        PDFQUALITYFULL = 1,
        PDFQUALITYSMALL = 2,
        PDFQUALITYMEDIUM = 3
    }

}
