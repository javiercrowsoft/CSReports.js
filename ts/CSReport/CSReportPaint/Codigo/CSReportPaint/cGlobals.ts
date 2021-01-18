

namespace CSReportPaint
{
    export class cGlobals {


    {
        private int: static this.nextKey = 1000;

        private C_MODULE: string = "cGlobals";

        private Bitmap: static _flag = new Bitmap(1, 1);
        private Graphics: static _g = Graphics.FromImage(_flag);

        public getNextKey() {
            this.nextKey++;
            return this.nextKey;
        }

        public getKey(value: string) {
            if (value.Length > 0) {
                if ("0123456789".Contains(value.Substring(0, 1))) {
                    value = "K" + value;
                }
            }
            return value;
        }

        public getBitmapSize(image: Image, imgWidth: number, imgHeight: number, inTwips: boolean) {
            imgWidth = image.Width;
            imgHeight = image.Height;
        }

        public setRectangleWidth(width: Single) {
            if (width < 0) {
                width = 0;
            return width;
        }

        public setRectangleHeight(height: Single) {
            if (height < 0) {
                height = 0;
            return height;
        }

        public newRectangleF(left: Single, top: Single, right: Single, bottom: Single) {
            if (left < 0) left = 0; {
            if (top < 0) top = 0; {
            if (right < left) right = left; {
            if (bottom < top) bottom = top; {

            return new RectangleF(left, top, right-left, bottom-top);
        }

        public newRectangle(left: number, top: number, right: number, bottom: number) {
            if (left < 0) left = 0; {
            if (top < 0) top = 0; {
            if (right < left) right = left; {
            if (bottom < top) bottom = top; {

            return new Rectangle(left, top, right-left, bottom-top);
        }

        private getPixelsFromCmX(cm: number) {
            return cm * _g.DpiX / 2.54f;
        }
        private getPixelsFromCmY(cm: number) {
            return cm * _g.DpiY / 2.54f;
        }

        public getRectFromPaperSize(info: cReportPaperInfo, paperSize: csReportPaperType, orientation: number) {
            let rtn: RectangleF = new RectangleF();

            switch (paperSize)
            {
                case csReportPaperType.CSRPTPAPERTYPELETTER:
                    rtn.Height = getPixelsFromCmY(27.94f); // 15840;
                    rtn.Width = getPixelsFromCmX(21.59f);  // 12240;
                    break;

                case csReportPaperType.CSRPTPAPERTYPELEGAL:
                    rtn.Height = getPixelsFromCmY(35.56f); // 20160;
                    rtn.Width = getPixelsFromCmX(21.59f);  // 12060;
                    break;

                case csReportPaperType.CSRPTPAPERTYPEA4:
                    rtn.Height = getPixelsFromCmY(29.7f); // 16832;
                    rtn.Width = getPixelsFromCmX(21f);    // 11908;
                    break;

                case csReportPaperType.CSRPTPAPERTYPEA3:
                    rtn.Height = getPixelsFromCmY(42f); // 23816;
                    rtn.Width = getPixelsFromCmX(29.7f);    // 16832;
                    break;

                case csReportPaperType.CSRPTPAPERUSER:
                    if (info === null) {
                        let msg: string = "The settings for the custome user paper size is not defined";
                        throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT, C_MODULE, msg);
                    }
                    else {
                        rtn.Width = getPixelsFromCmY(info.getCustomWidth());
                        rtn.Height = getPixelsFromCmX(info.getCustomHeight());
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

        public redim(vFonts: Font[], size: number) {
            vFonts = new Font[size];
        }

        public redimPreserve(vFonts: Font[], size: number) {
            if (size === 0) {
                vFonts = new Font[0];
            }
            else {
                if (vFonts === null) {
                    vFonts = new Font[size];
                }
                else if (vFonts.Length === 0) {
                    vFonts = new Font[size];
                }
                else {
                    let newArray: Font[] = new Font[size];
                    Array.Copy(vFonts, newArray, vFonts.Length);
                    vFonts = newArray;
                }
            }
        }

        public addFontIfRequired(font: cReportFont, this.fnt: Font[]) {
            for(var i = 0; i < this.fnt.Length; i++) {
                if(font.getName() === this.fnt[i].Name 
                    && font.getBold() === this.fnt[i].Bold 
                    && font.getItalic() === this.fnt[i].Italic 
                    && font.getUnderline() === this.fnt[i].Underline 
                    && font.getSize() === this.fnt[i].Size 
                    && font.getStrike() === this.fnt[i].Strikeout) {
                    return i;
                }
            }

            redimPreserve(this.fnt, this.fnt.Length + 1);

            let fontStyle: FontStyle = FontStyle.Regular;
            if (font.getBold()) fontStyle = fontStyle | FontStyle.Bold; {
            if (font.getItalic()) fontStyle = fontStyle | FontStyle.Italic; {
            if (font.getUnderline()) fontStyle = fontStyle | FontStyle.Underline; {
            if (font.getStrike()) fontStyle = fontStyle | FontStyle.Strikeout; {

            let afont: Font = new Font(font.getName(), ((font.getSize() > 0) ? font.getSize() : 3), fontStyle);

            this.fnt[this.fnt.Length - 1] = afont;

            return this.fnt.Length - 1;
        }


    }    }



UNKNOWN >>     public enum csETypeGrid {
        CSEGRIDNONE,
        CSEGRIDPOINTS,
        CSEGRIDLINES,
        CSEGRIDLINESVERTICAL,
UNKNOWN >>         CSEGRIDLINESHORIZONTAL


    }    }





    public enum csRptPaintObjTypeUNKNOWN >>     public enum csRptPaintObjType
    {
        CSRPTPAINTOBJBOX,
        CSRPTPAINTOBJLINE,
        CSRPTPAINTOBJCIRCLE,
UNKNOWN >>         CSRPTPAINTOBJIMAGE


    }    }





    public enum csRptPaintRegionTypeUNKNOWN >>     public enum csRptPaintRegionType
    {
        CRPTPNTRGNTYPEBODY,
        CRPTPNTRGNTYPELEFTUP,
        CRPTPNTRGNTYPELEFTDOWN,
        CRPTPNTRGNTYPERIGHTUP,
        CRPTPNTRGNTYPERIGHTDOWN,
        CRPTPNTRGNTYPEUP,
        CRPTPNTRGNTYPEDOWN,
        CRPTPNTRGNTYPELEFT,
UNKNOWN >>         CRPTPNTRGNTYPERIGHT


    }    }





    public enum csEMoveToUNKNOWN >>     public enum csEMoveTo
    {
        C_FIRSTPAGE = 1,
        C_NEXTPAGE = -1,
        C_PREVIOUSPAGE = -2,
        C_LASTPAGE = -3


    }    }








    public enum csPDFQualityUNKNOWN >>     public enum csPDFQuality
    {
        PDFQUALITYFULL = 1,
        PDFQUALITYSMALL = 2,
        PDFQUALITYMEDIUM = 3


    }    }



}
