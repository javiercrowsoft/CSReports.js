(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {
    globalObject.CSReportDll.createCReportFormulaType = function() {

        const self = {}; //@@@: public class cReportFormulaType
        let m_name = ""; //@@@: private String m_name = "";
        let m_nameUser = ""; //@@@: private String m_nameUser = "";
        let m_id = 0; //@@@: private csRptFormulaType m_id = 0;
        let m_decrip = ""; //@@@: private String m_decrip = "";
        let m_helpContextId = 0; //@@@: private int m_helpContextId = 0;

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getNameUser = function() { //@@@: public String getNameUser()
            return m_nameUser; //@@@: return m_nameUser;
        }; //@@@: }

        self.setNameUser = function(rhs) { //@@@: public void setNameUser(String rhs)
            m_nameUser = rhs; //@@@: m_nameUser = rhs;
        }; //@@@: }

        self.getId = function() { //@@@: public csRptFormulaType getId()
            return m_id; //@@@: return m_id;
        }; //@@@: }

        self.setId = function(rhs) { //@@@: public void setId(csRptFormulaType rhs)
            m_id = rhs; //@@@: m_id = rhs;
        }; //@@@: }

        self.getDecrip = function() { //@@@: public String getDecrip()
            return m_decrip; //@@@: return m_decrip;
        }; //@@@: }

        self.setDecrip = function(rhs) { //@@@: public void setDecrip(String rhs)
            m_decrip = rhs; //@@@: m_decrip = rhs;
        }; //@@@: }

        self.getHelpContextId = function() { //@@@: public int getHelpContextId()
            return m_helpContextId; //@@@: return m_helpContextId;
        }; //@@@: }

        self.setHelpContextId = function(rhs) { //@@@: public void setHelpContextId(csRptFormulaType rhs)
            m_helpContextId = rhs; //@@@: m_helpContextId = (int)rhs;
        }; //@@@: }

        self.setHelpContextId = function(rhs) { //@@@: public void setHelpContextId(int rhs)
            m_helpContextId = rhs; //@@@: m_helpContextId = rhs;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
