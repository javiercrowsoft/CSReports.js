(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportFormula = function() {

        const self = {}; //@@@: public class cReportFormula

        let m_name = ""; //@@@: private String m_name = "";
        let m_text = ""; //@@@: private String m_text = "";
        let m_formulasInt = new cReportFormulasInt(); //@@@: private cReportFormulasInt m_formulasInt = new cReportFormulasInt();
        let m_notSave = null; //@@@: private bool m_notSave;

        // when we compile a function we parse the text and extract
        // from the script all internal functions
        // every internal function is added to the collection m_FormulasInt
        // and replaced in the script by an String $$$n  
        // n is the index of the function in m_FormulasInt
        // when we run the script every occurrence of $$$n is replaced for
        // the value of their corresponding function
        // finaly if the text contains an script we evalute this with the
        // ScriptControl
        // 
        // compiled text of the function
        //
        let m_textC = ""; //@@@: private String m_textC = "";
        let m_idxGroup = 0; //@@@: private int m_idxGroup = 0;
        let m_idxGroup2 = -9999; //@@@: private int m_idxGroup2 = -9999;
        let m_whenEval = null; //@@@: private csRptWhenEval m_whenEval;
        let m_haveToEval = null; //@@@: private bool m_haveToEval;
        let m_lastResult = null; //@@@: private object m_lastResult = null;

        // for debugging
        //
        let m_controlName = ""; //@@@: private String m_controlName = "";
        let m_sectionLineIndex = 0; //@@@: private int m_sectionLineIndex = 0;
        let m_sectionName = ""; //@@@: private String m_sectionName = "";

        let m_compiledScript = null; //@@@: private Assembly m_compiledScript;

        self.getCompiledScript = function() { //@@@: public Assembly getCompiledScript()
            return m_compiledScript; //@@@: return m_compiledScript;
        }; //@@@: }

        self.setCompiledScript = function(value) { //@@@: public void setCompiledScript(Assembly value)
            m_compiledScript = value; //@@@: m_compiledScript = value;
        }; //@@@: }

        self.getIdxGroup = function() { //@@@: public int getIdxGroup()
            return m_idxGroup; //@@@: return m_idxGroup;
        }; //@@@: }

        self.setIdxGroup = function(rhs) { //@@@: public void setIdxGroup(int rhs)
            m_idxGroup = rhs; //@@@: m_idxGroup = rhs;
        }; //@@@: }

        self.getIdxGroup2 = function() { //@@@: public int getIdxGroup2()
            return m_idxGroup2; //@@@: return m_idxGroup2;
        }; //@@@: }

        self.setIdxGroup2 = function(rhs) { //@@@: public void setIdxGroup2(int rhs)
            m_idxGroup2 = rhs; //@@@: m_idxGroup2 = rhs;
        }; //@@@: }

        self.getWhenEval = function() { //@@@: public csRptWhenEval getWhenEval()
            return m_whenEval; //@@@: return m_whenEval;
        }; //@@@: }

        self.setWhenEval = function(rhs) { //@@@: public void setWhenEval(csRptWhenEval rhs)
            m_whenEval = rhs; //@@@: m_whenEval = rhs;
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getText = function() { //@@@: public String getText()
            return m_text; //@@@: return m_text;
        }; //@@@: }

        self.setText = function(rhs) { //@@@: public void setText(String rhs)
            m_text = rhs; //@@@: m_text = rhs;
        }; //@@@: }

        self.getControlName = function() { //@@@: public String getControlName()
            return m_controlName; //@@@: return m_controlName;
        }; //@@@: }

        self.setControlName = function(rhs) { //@@@: public void setControlName(String rhs)
            m_controlName = rhs; //@@@: m_controlName = rhs;
        }; //@@@: }

        self.getSectionName = function() { //@@@: public String getSectionName()
            return m_sectionName; //@@@: return m_sectionName;
        }; //@@@: }

        self.setSectionName = function(rhs) { //@@@: public void setSectionName(String rhs)
            m_sectionName = rhs; //@@@: m_sectionName = rhs;
        }; //@@@: }

        self.getSectionLineIndex = function() { //@@@: public int getSectionLineIndex()
            return m_sectionLineIndex; //@@@: return m_sectionLineIndex;
        }; //@@@: }

        self.setSectionLineIndex = function(rhs) { //@@@: public void setSectionLineIndex(int rhs)
            m_sectionLineIndex = rhs; //@@@: m_sectionLineIndex = rhs;
        }; //@@@: }

        self.getFormulasInt = function() { //@@@: public cReportFormulasInt getFormulasInt()
            return m_formulasInt; //@@@: return m_formulasInt;
        }; //@@@: }

        self.getTextC = function() { //@@@: public String getTextC()
            return m_textC; //@@@: return m_textC;
        }; //@@@: }

        self.setTextC = function(rhs) { //@@@: public void setTextC(String rhs)
            m_textC = rhs; //@@@: m_textC = rhs;
        }; //@@@: }

        self.getNotSave = function() { //@@@: public bool getNotSave()
            return m_notSave; //@@@: return m_notSave;
        }; //@@@: }

        self.setNotSave = function(rhs) { //@@@: public void setNotSave(bool rhs)
            m_notSave = rhs; //@@@: m_notSave = rhs;
        }; //@@@: }

        self.getHaveToEval = function() { //@@@: public bool getHaveToEval()
            return m_haveToEval; //@@@: return m_haveToEval;
        }; //@@@: }

        self.setHaveToEval = function(rhs) { //@@@: public void setHaveToEval(bool rhs)
            m_haveToEval = rhs; //@@@: m_haveToEval = rhs;
        }; //@@@: }

        self.getLastResult = function() { //@@@: public object getLastResult()
            return m_lastResult; //@@@: return m_lastResult;
        }; //@@@: }

        self.setLastResult = function(rhs) { //@@@: public void setLastResult(object rhs)
            m_lastResult = rhs; //@@@: m_lastResult = rhs;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            nodeObj = xDoc.getNodeFromNode(nodeObj, m_name); //@@@: nodeObj = xDoc.getNodeFromNode(nodeObj, m_name);

            if (nodeObj !== null) { //@@@: if (nodeObj != null)
                m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
                m_text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText); //@@@: m_text = xDoc.getNodeProperty(nodeObj, "Text").getValueString(eTypes.eText);
                m_idxGroup = xDoc.getNodeProperty(nodeObj, "idxGroup").getValueInt(eTypes.eLong); //@@@: m_idxGroup = xDoc.getNodeProperty(nodeObj, "idxGroup").getValueInt(eTypes.eLong);
                m_whenEval = xDoc.getNodeProperty(nodeObj, "WhenEval").getValueInt(eTypes.eInteger); //@@@: m_whenEval = (csRptWhenEval)xDoc.getNodeProperty(nodeObj, "WhenEval").getValueInt(eTypes.eInteger);
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_name); //@@@: xProperty.setName(m_name);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Text"); //@@@: xProperty.setName("Text");
            xProperty.setValue(eTypes.eText, m_text); //@@@: xProperty.setValue(eTypes.eText, m_text);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("idxGroup"); //@@@: xProperty.setName("idxGroup");
            xProperty.setValue(eTypes.eLong, m_idxGroup); //@@@: xProperty.setValue(eTypes.eLong, m_idxGroup);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("WhenEval"); //@@@: xProperty.setName("WhenEval");
            xProperty.setValue(eTypes.eInteger, m_whenEval); //@@@: xProperty.setValue(eTypes.eInteger, m_whenEval);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
