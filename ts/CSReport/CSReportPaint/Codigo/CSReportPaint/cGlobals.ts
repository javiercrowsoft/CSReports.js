(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {};

    globalObject.CSReportPaint.createCGlobals = function() {

        // @ts-ignore
        let self: CSReportPaint.IcGlobals = {};
        let int: static m_nextKey = 1000;

        const C_MODULE: string = "cGlobals";

        let Bitmap: static _flag = new Bitmap(1, 1);
        let Graphics: static _g = Graphics.FromImage(_flag);

        self.getNextKey = function() {
            m_nextKey++;
            return m_nextKey;
        };

        self.getKey = function(value) {
            if (value.Length > 0) {
                if ("0123456789".Contains(value.Substring(0, 1))) {
                    value = "K" + value;
                }
            }
            return value;
        };

        self.getBitmapSize = function(image, imgWidth, imgHeight, inTwips) {
            imgWidth = image.Width;
            imgHeight = image.Height;
        };

        self.setRectangleWidth = function(width) {
            if (width < 0) {
                width = 0;
            return width;
        };

        self.setRectangleHeight = function(height) {
            if (height < 0) {
                height = 0;
            return height;
        };

        self.newRectangleF = function(left, top, right, bottom) {
            if (left < 0) left = 0; {
            if (top < 0) top = 0; {
            if (right < left) right = left; {
            if (bottom < top) bottom = top; {

            return new RectangleF(left, top, right-left, bottom-top);
        };

        self.newRectangle = function(left, top, right, bottom) {
            if (left < 0) left = 0; {
            if (top < 0) top = 0; {
            if (right < left) right = left; {
            if (bottom < top) bottom = top; {

            return new Rectangle(left, top, right-left, bottom-top);
        };

        const getPixelsFromCmX = function(cm) {
            return cm * _g.DpiX / 2.54f;
        };
        const getPixelsFromCmY = function(cm) {
            return cm * _g.DpiY / 2.54f;
        };

        self.getRectFromPaperSize = function(info, paperSize, orientation) {
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
        };

        // fonts

        self.redim = function(vFonts, size) {
            vFonts = UNKNOWN >>  can't find constructor for class Font[size];
        };

        self.redimPreserve = function(vFonts, size) {
            if (size === 0) {
                vFonts = UNKNOWN >>  can't find constructor for class Font[0];
            }
            else {
                if (vFonts === null) {
                    vFonts = UNKNOWN >>  can't find constructor for class Font[size];
                }
                else if (vFonts.Length === 0) {
                    vFonts = UNKNOWN >>  can't find constructor for class Font[size];
                }
                else {
                    let newArray: Font[] = new Font[size];
                    Array.Copy(vFonts, newArray, vFonts.Length);
                    vFonts = newArray;
                }
            }
        };

        self.addFontIfRequired = function(font, m_fnt) {
            for(var i = 0; i < m_fnt.Length; i++) {
                if(font.getName() === m_fnt[i].Name 
                    && font.getBold() === m_fnt[i].Bold 
                    && font.getItalic() === m_fnt[i].Italic 
                    && font.getUnderline() === m_fnt[i].Underline 
                    && font.getSize() === m_fnt[i].Size 
                    && font.getStrike() === m_fnt[i].Strikeout) {
                    return i;
                }
            }

            redimPreserve(m_fnt, m_fnt.Length + 1);

            let fontStyle: FontStyle = FontStyle.Regular;
            if (font.getBold()) fontStyle = fontStyle | FontStyle.Bold; {
            if (font.getItalic()) fontStyle = fontStyle | FontStyle.Italic; {
            if (font.getUnderline()) fontStyle = fontStyle | FontStyle.Underline; {
            if (font.getStrike()) fontStyle = fontStyle | FontStyle.Strikeout; {

            let afont: Font = new Font(font.getName(), ((font.getSize() > 0) ? font.getSize() : 3), fontStyle);

            m_fnt[m_fnt.Length - 1] = afont;

            return m_fnt.Length - 1;
        };
        return self;

    }    }
        return self;


UNKNOWN >>     public enum csETypeGrid {
        CSEGRIDNONE,
        CSEGRIDPOINTS,
        CSEGRIDLINES,
        CSEGRIDLINESVERTICAL,
UNKNOWN >>         CSEGRIDLINESHORIZONTAL
        return self;

    }    }
        return self;


        return self;

    public enum csRptPaintObjTypeUNKNOWN >>     public enum csRptPaintObjType
    {
        CSRPTPAINTOBJBOX,
        CSRPTPAINTOBJLINE,
        CSRPTPAINTOBJCIRCLE,
UNKNOWN >>         CSRPTPAINTOBJIMAGE
        return self;

    }    }
        return self;


        return self;

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
        return self;

    }    }
        return self;


        return self;

    public enum csEMoveToUNKNOWN >>     public enum csEMoveTo
    {
        C_FIRSTPAGE = 1,
        C_NEXTPAGE = -1,
        C_PREVIOUSPAGE = -2,
        C_LASTPAGE = -3
        return self;

    }    }
        return self;


        return self;


        return self;

    public enum csPDFQualityUNKNOWN >>     public enum csPDFQuality
    {
        PDFQUALITYFULL = 1,
        PDFQUALITYSMALL = 2,
        PDFQUALITYMEDIUM = 3
        return self;

    }    }
        return self;


}(globalObject));


namespace CSReportPaint {

  export interface IcGlobals {

    getNextKey: () => int;
    getKey: (String) => String;
    getBitmapSize: (Image, int, int, bool) => void;
    setRectangleWidth: (Single) => Single;
    setRectangleHeight: (Single) => Single;
    newRectangleF: (Single, Single, Single, Single) => RectangleF;
    newRectangle: (int, int, int, int) => Rectangle;
    getRectFromPaperSize: (cReportPaperInfo, csReportPaperType, int) => RectangleF;
    redim: (Font[], int) => void;
    redimPreserve: (Font[], int) => void;
    addFontIfRequired: (cReportFont, Font[]) => int;
  }
}
