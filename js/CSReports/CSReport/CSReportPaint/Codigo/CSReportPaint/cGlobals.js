(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {
    globalObject.CSReportPaint.createCGlobals = function() {

        const self = {}; //@@@: public static class cGlobals
        let int m_nextKey = 1000; //@@@: private static int m_nextKey = 1000;

        const C_MODULE = "cGlobals"; //@@@: private const string C_MODULE = "cGlobals";

        let Bitmap _flag = new Bitmap(1, 1); //@@@: private static Bitmap _flag = new Bitmap(1, 1);
        let Graphics _g = Graphics.FromImage(_flag); //@@@: private static Graphics _g = Graphics.FromImage(_flag);

        self.getNextKey = function() { //@@@: public static int getNextKey()
            m_nextKey++; //@@@: m_nextKey++;
            return m_nextKey; //@@@: return m_nextKey;
        }; //@@@: }

        self.getKey = function(value) { //@@@: public static String getKey(String value)
            if (value.Length > 0) { //@@@: if (value.Length > 0)
                if ("0123456789".Contains(value.Substring(0, 1))) { //@@@: if ("0123456789".Contains(value.Substring(0, 1)))
                    value = "K" + value; //@@@: value = "K" + value;
                } //@@@: }
            } //@@@: }
            return value; //@@@: return value;
        }; //@@@: }

        self.getBitmapSize = function(image, imgWidth, imgHeight, inTwips) { //@@@: public static void getBitmapSize(Image image, out int imgWidth, out int imgHeight, bool inTwips)
            imgWidth = image.Width; //@@@: imgWidth = image.Width;
            imgHeight = image.Height; //@@@: imgHeight = image.Height;
        }; //@@@: }

        self.setRectangleWidth = function(width) { //@@@: public static Single setRectangleWidth(Single width)
            if (width < 0) { //@@@: if (width < 0)
                width = 0; //@@@: width = 0;
            return width; //@@@: return width;
        }; //@@@: }

        self.setRectangleHeight = function(height) { //@@@: public static Single setRectangleHeight(Single height)
            if (height < 0) { //@@@: if (height < 0)
                height = 0; //@@@: height = 0;
            return height; //@@@: return height;
        }; //@@@: }

        self.newRectangleF = function(left, top, right, bottom) { //@@@: public static RectangleF newRectangleF(Single left, Single top, Single right, Single bottom)
            if (left < 0) left = 0; { //@@@: if (left < 0) left = 0;
            if (top < 0) top = 0; { //@@@: if (top < 0) top = 0;
            if (right < left) right = left; { //@@@: if (right < left) right = left;
            if (bottom < top) bottom = top; { //@@@: if (bottom < top) bottom = top;

            return new RectangleF(left, top, right-left, bottom-top); //@@@: return new RectangleF(left, top, right-left, bottom-top);
        }; //@@@: }

        self.newRectangle = function(left, top, right, bottom) { //@@@: public static Rectangle newRectangle(int left, int top, int right, int bottom)
            if (left < 0) left = 0; { //@@@: if (left < 0) left = 0;
            if (top < 0) top = 0; { //@@@: if (top < 0) top = 0;
            if (right < left) right = left; { //@@@: if (right < left) right = left;
            if (bottom < top) bottom = top; { //@@@: if (bottom < top) bottom = top;

            return new Rectangle(left, top, right-left, bottom-top); //@@@: return new Rectangle(left, top, right-left, bottom-top);
        }; //@@@: }

        const getPixelsFromCmX = function(cm) { //@@@: private static float getPixelsFromCmX(float cm)
            return cm * _g.DpiX / 2.54f; //@@@: return cm * _g.DpiX / 2.54f;
        }; //@@@: }
        const getPixelsFromCmY = function(cm) { //@@@: private static float getPixelsFromCmY(float cm)
            return cm * _g.DpiY / 2.54f; //@@@: return cm * _g.DpiY / 2.54f;
        }; //@@@: }

        self.getRectFromPaperSize = function(info, paperSize, orientation) { //@@@: public static RectangleF getRectFromPaperSize(cReportPaperInfo info, csReportPaperType paperSize, int orientation)
            let rtn = new RectangleF(); //@@@: RectangleF rtn = new RectangleF();

            switch (paperSize) //@@@: switch (paperSize)
            { //@@@: {
                case csReportPaperType.CSRPTPAPERTYPELETTER: //@@@: case csReportPaperType.CSRPTPAPERTYPELETTER:
                    rtn.Height = getPixelsFromCmY(27.94f); // 15840; //@@@: rtn.Height = getPixelsFromCmY(27.94f); // 15840;
                    rtn.Width = getPixelsFromCmX(21.59f);  // 12240; //@@@: rtn.Width = getPixelsFromCmX(21.59f);  // 12240;
                    break; //@@@: break;

                case csReportPaperType.CSRPTPAPERTYPELEGAL: //@@@: case csReportPaperType.CSRPTPAPERTYPELEGAL:
                    rtn.Height = getPixelsFromCmY(35.56f); // 20160; //@@@: rtn.Height = getPixelsFromCmY(35.56f); // 20160;
                    rtn.Width = getPixelsFromCmX(21.59f);  // 12060; //@@@: rtn.Width = getPixelsFromCmX(21.59f);  // 12060;
                    break; //@@@: break;

                case csReportPaperType.CSRPTPAPERTYPEA4: //@@@: case csReportPaperType.CSRPTPAPERTYPEA4:
                    rtn.Height = getPixelsFromCmY(29.7f); // 16832; //@@@: rtn.Height = getPixelsFromCmY(29.7f); // 16832;
                    rtn.Width = getPixelsFromCmX(21f);    // 11908; //@@@: rtn.Width = getPixelsFromCmX(21f);    // 11908;
                    break; //@@@: break;

                case csReportPaperType.CSRPTPAPERTYPEA3: //@@@: case csReportPaperType.CSRPTPAPERTYPEA3:
                    rtn.Height = getPixelsFromCmY(42f); // 23816; //@@@: rtn.Height = getPixelsFromCmY(42f); // 23816;
                    rtn.Width = getPixelsFromCmX(29.7f);    // 16832; //@@@: rtn.Width = getPixelsFromCmX(29.7f);    // 16832;
                    break; //@@@: break;

                case csReportPaperType.CSRPTPAPERUSER: //@@@: case csReportPaperType.CSRPTPAPERUSER:
                    if (info === null) { //@@@: if (info == null)
                        let msg = "The settings for the custome user paper size is not defined"; //@@@: string msg = "The settings for the custome user paper size is not defined";
                        throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT, C_MODULE, msg); //@@@: throw new ReportPaintException(csRptPaintErrors.CSRPT_PAINT_ERR_OBJ_CLIENT, C_MODULE, msg);
                    } //@@@: }
                    else { //@@@: else
                        rtn.Width = getPixelsFromCmY(info.getCustomWidth()); //@@@: rtn.Width = getPixelsFromCmY(info.getCustomWidth());
                        rtn.Height = getPixelsFromCmX(info.getCustomHeight()); //@@@: rtn.Height = getPixelsFromCmX(info.getCustomHeight());
                    } //@@@: }
                    break; //@@@: break;
            } //@@@: }

            if (orientation === csRptPageOrientation.LANDSCAPE) { //@@@: if (orientation == (int)csRptPageOrientation.LANDSCAPE)
                let tmp = 0; //@@@: float tmp = 0;
                tmp = rtn.Height; //@@@: tmp = rtn.Height;
                rtn.Height = rtn.Width; //@@@: rtn.Height = rtn.Width;
                rtn.Width = tmp; //@@@: rtn.Width = tmp;
            } //@@@: }

            return rtn; //@@@: return rtn;
        }; //@@@: }

        // fonts

        self.redim = function(vFonts, size) { //@@@: public static void redim(ref Font[] vFonts, int size)
            vFonts = new Font[size]; //@@@: vFonts = new Font[size];
        }; //@@@: }

        self.redimPreserve = function(vFonts, size) { //@@@: public static void redimPreserve(ref Font[] vFonts, int size)
            if (size === 0) { //@@@: if (size == 0)
                vFonts = new Font[0]; //@@@: vFonts = new Font[0];
            } //@@@: }
            else { //@@@: else
                if (vFonts === null) { //@@@: if (vFonts == null)
                    vFonts = new Font[size]; //@@@: vFonts = new Font[size];
                } //@@@: }
                else if (vFonts.Length === 0) { //@@@: else if (vFonts.Length == 0)
                    vFonts = new Font[size]; //@@@: vFonts = new Font[size];
                } //@@@: }
                else { //@@@: else
                    let newArray = new Font[size]; //@@@: Font[] newArray = new Font[size];
                    Array.Copy(vFonts, newArray, vFonts.Length); //@@@: Array.Copy(vFonts, newArray, vFonts.Length);
                    vFonts = newArray; //@@@: vFonts = newArray;
                } //@@@: }
            } //@@@: }
        }; //@@@: }

        self.addFontIfRequired = function(font, m_fnt) { //@@@: public static int addFontIfRequired(cReportFont font, ref Font[] m_fnt)
            for(var i = 0; i < m_fnt.Length; i++) { //@@@: for(int i = 0; i < m_fnt.Length; i++) {
                if(font.getName() === m_fnt[i].Name  //@@@: if(font.getName() == m_fnt[i].Name
                    && font.getBold() === m_fnt[i].Bold  //@@@: && font.getBold() == m_fnt[i].Bold
                    && font.getItalic() === m_fnt[i].Italic  //@@@: && font.getItalic() == m_fnt[i].Italic
                    && font.getUnderline() === m_fnt[i].Underline  //@@@: && font.getUnderline() == m_fnt[i].Underline
                    && font.getSize() === m_fnt[i].Size  //@@@: && font.getSize() == m_fnt[i].Size
                    && font.getStrike() === m_fnt[i].Strikeout) { //@@@: && font.getStrike() == m_fnt[i].Strikeout) {
                    return i; //@@@: return i;
                } //@@@: }
            } //@@@: }

            redimPreserve(m_fnt, m_fnt.Length + 1); //@@@: redimPreserve(ref m_fnt, m_fnt.Length + 1);

            let fontStyle = FontStyle.Regular; //@@@: FontStyle fontStyle = FontStyle.Regular;
            if (font.getBold()) fontStyle = fontStyle | FontStyle.Bold; { //@@@: if (font.getBold()) fontStyle = fontStyle | FontStyle.Bold;
            if (font.getItalic()) fontStyle = fontStyle | FontStyle.Italic; { //@@@: if (font.getItalic()) fontStyle = fontStyle | FontStyle.Italic;
            if (font.getUnderline()) fontStyle = fontStyle | FontStyle.Underline; { //@@@: if (font.getUnderline()) fontStyle = fontStyle | FontStyle.Underline;
            if (font.getStrike()) fontStyle = fontStyle | FontStyle.Strikeout; { //@@@: if (font.getStrike()) fontStyle = fontStyle | FontStyle.Strikeout;

            let afont = new Font(font.getName(), ((font.getSize() > 0) ? font.getSize() : 3), fontStyle); //@@@: Font afont = new Font(font.getName(), ((font.getSize() > 0) ? font.getSize() : 3), fontStyle);

            m_fnt[m_fnt.Length - 1] = afont; //@@@: m_fnt[m_fnt.Length - 1] = afont;

            return m_fnt.Length - 1; //@@@: return m_fnt.Length - 1;
        }; //@@@: }
        return self;

    } //@@@: }

UNKNOWN >>     public enum csETypeGrid { //@@@: public enum csETypeGrid {
        CSEGRIDNONE, //@@@: CSEGRIDNONE,
        CSEGRIDPOINTS, //@@@: CSEGRIDPOINTS,
        CSEGRIDLINES, //@@@: CSEGRIDLINES,
        CSEGRIDLINESVERTICAL, //@@@: CSEGRIDLINESVERTICAL,
UNKNOWN >>         CSEGRIDLINESHORIZONTAL //@@@: CSEGRIDLINESHORIZONTAL
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptPaintObjType //@@@: public enum csRptPaintObjType
    { //@@@: {
        CSRPTPAINTOBJBOX, //@@@: CSRPTPAINTOBJBOX,
        CSRPTPAINTOBJLINE, //@@@: CSRPTPAINTOBJLINE,
        CSRPTPAINTOBJCIRCLE, //@@@: CSRPTPAINTOBJCIRCLE,
UNKNOWN >>         CSRPTPAINTOBJIMAGE //@@@: CSRPTPAINTOBJIMAGE
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csRptPaintRegionType //@@@: public enum csRptPaintRegionType
    { //@@@: {
        CRPTPNTRGNTYPEBODY, //@@@: CRPTPNTRGNTYPEBODY,
        CRPTPNTRGNTYPELEFTUP, //@@@: CRPTPNTRGNTYPELEFTUP,
        CRPTPNTRGNTYPELEFTDOWN, //@@@: CRPTPNTRGNTYPELEFTDOWN,
        CRPTPNTRGNTYPERIGHTUP, //@@@: CRPTPNTRGNTYPERIGHTUP,
        CRPTPNTRGNTYPERIGHTDOWN, //@@@: CRPTPNTRGNTYPERIGHTDOWN,
        CRPTPNTRGNTYPEUP, //@@@: CRPTPNTRGNTYPEUP,
        CRPTPNTRGNTYPEDOWN, //@@@: CRPTPNTRGNTYPEDOWN,
        CRPTPNTRGNTYPELEFT, //@@@: CRPTPNTRGNTYPELEFT,
UNKNOWN >>         CRPTPNTRGNTYPERIGHT //@@@: CRPTPNTRGNTYPERIGHT
        return self;

    } //@@@: }

UNKNOWN >>         return self;

    public enum csEMoveTo //@@@: public enum csEMoveTo
    { //@@@: {
        C_FIRSTPAGE = 1, //@@@: C_FIRSTPAGE = 1,
        C_NEXTPAGE = -1, //@@@: C_NEXTPAGE = -1,
        C_PREVIOUSPAGE = -2, //@@@: C_PREVIOUSPAGE = -2,
        C_LASTPAGE = -3 //@@@: C_LASTPAGE = -3
        return self;

    } //@@@: }


UNKNOWN >>         return self;

    public enum csPDFQuality //@@@: public enum csPDFQuality
    { //@@@: {
        PDFQUALITYFULL = 1, //@@@: PDFQUALITYFULL = 1,
        PDFQUALITYSMALL = 2, //@@@: PDFQUALITYSMALL = 2,
        PDFQUALITYMEDIUM = 3 //@@@: PDFQUALITYMEDIUM = 3
        return self;

    } //@@@: }

}(globalObject)); //@@@: }
