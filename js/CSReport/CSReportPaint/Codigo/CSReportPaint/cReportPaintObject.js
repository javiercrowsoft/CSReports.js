(function(globalObject) {

    globalObject.CSReportPaint = globalObject.CSReportPaint || {}; //@@@: namespace CSReportPaint
 //@@@: {
    globalObject.CSReportPaint.createCReportPaintObject = function() {

        const self = {}; //@@@: public class cReportPaintObject

        const C_MODULE = "cReportPaintObject"; //@@@: private const String C_MODULE = "cReportPaintObject";

        let m_aspect = new cReportAspect(); //@@@: private cReportAspect m_aspect = new cReportAspect();
        let m_key = ""; //@@@: private String m_key = "";
        let m_text = ""; //@@@: private String m_text = "";
        let m_paintType = null; //@@@: private csRptPaintObjType m_paintType;
        let m_tag = ""; //@@@: private String m_tag = "";
        let m_rptType = null; //@@@: private csRptSectionType m_rptType;
        let m_rptKeySec = ""; //@@@: private String m_rptKeySec = "";
        let m_image = null; //@@@: private Image m_image = null;
        let m_indexField = 0; //@@@: private int m_indexField = 0;

        let m_isSection = null; //@@@: private bool m_isSection;

        let m_heightSec = 0; //@@@: private float m_heightSec = 0;
        let m_heightSecLine = 0; //@@@: private float m_heightSecLine = 0;
        let m_textLine = ""; //@@@: private String m_textLine = "";

        self.getImage = function() { //@@@: public Image getImage()
            return m_image; //@@@: return m_image;
        }; //@@@: }

        self.setImage = function(rhs) { //@@@: public void setImage(Image rhs)
            m_image = rhs; //@@@: m_image = rhs;
        }; //@@@: }

        self.getAspect = function() { //@@@: public cReportAspect getAspect()
            return m_aspect; //@@@: return m_aspect;
        }; //@@@: }

        self.setAspect = function(rhs) { //@@@: public void setAspect(cReportAspect rhs)
            m_aspect = rhs; //@@@: m_aspect = rhs;
        }; //@@@: }

        self.getKey = function() { //@@@: public String getKey()
            return m_key; //@@@: return m_key;
        }; //@@@: }

        self.setKey = function(rhs) { //@@@: public void setKey(String rhs)
            m_key = rhs; //@@@: m_key = rhs;
        }; //@@@: }

        self.getText = function() { //@@@: public String getText()
            return m_text; //@@@: return m_text;
        }; //@@@: }

        self.setText = function(rhs) { //@@@: public void setText(String rhs)
            m_text = rhs; //@@@: m_text = rhs;
        }; //@@@: }

        self.getPaintType = function() { //@@@: public csRptPaintObjType getPaintType()
            return m_paintType; //@@@: return m_paintType;
        }; //@@@: }

        self.setPaintType = function(rhs) { //@@@: public void setPaintType(csRptPaintObjType rhs)
            m_paintType = rhs; //@@@: m_paintType = rhs;
        }; //@@@: }

        self.getRptType = function() { //@@@: public csRptSectionType getRptType()
            return m_rptType; //@@@: return m_rptType;
        }; //@@@: }

        self.setRptType = function(rhs) { //@@@: public void setRptType(csRptSectionType rhs)
            m_rptType = rhs; //@@@: m_rptType = rhs;
        }; //@@@: }

        self.getTag = function() { //@@@: public String getTag()
            return m_tag; //@@@: return m_tag;
        }; //@@@: }

        self.setTag = function(rhs) { //@@@: public void setTag(String rhs)
            m_tag = rhs; //@@@: m_tag = rhs;
        }; //@@@: }

        self.getRptKeySec = function() { //@@@: public String getRptKeySec()
            return m_rptKeySec; //@@@: return m_rptKeySec;
        }; //@@@: }

        self.setRptKeySec = function(rhs) { //@@@: public void setRptKeySec(String rhs)
            m_rptKeySec = rhs; //@@@: m_rptKeySec = rhs;
        }; //@@@: }

        self.getIndexField = function() { //@@@: public int getIndexField()
            return m_indexField; //@@@: return m_indexField;
        }; //@@@: }

        self.setIndexField = function(rhs) { //@@@: public void setIndexField(int rhs)
            m_indexField = rhs; //@@@: m_indexField = rhs;
        }; //@@@: }

        self.getHeightSec = function() { //@@@: public float getHeightSec()
            return m_heightSec; //@@@: return m_heightSec;
        }; //@@@: }

        self.setHeightSec = function(rhs) { //@@@: public void setHeightSec(float rhs)
            m_heightSec = rhs; //@@@: m_heightSec = rhs;
        }; //@@@: }

        self.getHeightSecLine = function() { //@@@: public float getHeightSecLine()
            return m_heightSecLine; //@@@: return m_heightSecLine;
        }; //@@@: }

        self.setHeightSecLine = function(rhs) { //@@@: public void setHeightSecLine(float rhs)
            m_heightSecLine = rhs; //@@@: m_heightSecLine = rhs;
        }; //@@@: }

        self.getTextLine = function() { //@@@: public String getTextLine()
            return m_textLine; //@@@: return m_textLine;
        }; //@@@: }

        self.setTextLine = function(rhs) { //@@@: public void setTextLine(String rhs)
            m_textLine = rhs; //@@@: m_textLine = rhs;
        }; //@@@: }

        self.getIsSection = function() { //@@@: public bool getIsSection()
            return m_isSection; //@@@: return m_isSection;
        }; //@@@: }

        self.setIsSection = function(rhs) { //@@@: public void setIsSection(bool rhs)
            m_isSection = rhs; //@@@: m_isSection = rhs;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
