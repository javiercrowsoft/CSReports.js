(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportControl = function() {

        const self = {}; //@@@: public class cReportControl

        let m_label = new cReportLabel(); //@@@: private cReportLabel m_label = new cReportLabel();
        let m_image = new cReportImage(); //@@@: private cReportImage m_image = new cReportImage();
        let m_line = new cReportLine(); //@@@: private cReportLine m_line = new cReportLine();
        let m_field = new cReportField(); //@@@: private cReportField m_field = new cReportField();
        let m_typeSection = null; //@@@: private csRptSectionType m_typeSection;
        let m_key = ""; //@@@: private String m_key = "";
        let m_keyPaint = ""; //@@@: private String m_keyPaint = "";
        let m_name = ""; //@@@: private String m_name = "";
        let m_hasFormulaHide = null; //@@@: private bool m_hasFormulaHide;
        let m_hasFormulaValue = null; //@@@: private bool m_hasFormulaValue;
        let m_controlType = null; //@@@: private csRptControlType m_controlType;
        let m_formulaHide = new cReportFormula(); //@@@: private cReportFormula m_formulaHide = new cReportFormula();
        let m_formulaValue = new cReportFormula(); //@@@: private cReportFormula m_formulaValue = new cReportFormula();
        let m_chart = new cReportChart(); //@@@: private cReportChart m_chart = new cReportChart();
        let m_tag = ""; //@@@: private String m_tag = "";
        let m_exportColIdx = 0; //@@@: private int m_exportColIdx = 0;
        let m_isFreeCtrl = null; //@@@: private bool m_isFreeCtrl;

        // this reference tell in which section line is this control
        //
        let m_sectionLine = null; //@@@: private cReportSectionLine m_sectionLine;

        const cReportControl = function() { //@@@: public cReportControl()
            m_formulaHide.setName("H"); //@@@: m_formulaHide.setName("H");
            m_formulaValue.setName("V"); //@@@: m_formulaValue.setName("V");
        }; //@@@: }

        self.getLabel = function() { //@@@: public cReportLabel getLabel()
            return m_label; //@@@: return m_label;
        }; //@@@: }

        self.setLabel = function(rhs) { //@@@: public void setLabel(cReportLabel rhs)
            m_label = rhs; //@@@: m_label = rhs;
        }; //@@@: }

        self.getImage = function() { //@@@: public cReportImage getImage()
            return m_image; //@@@: return m_image;
        }; //@@@: }

        self.setImage = function(rhs) { //@@@: public void setImage(cReportImage rhs)
            m_image = rhs; //@@@: m_image = rhs;
        }; //@@@: }

        self.getFormulaHide = function() { //@@@: public cReportFormula getFormulaHide()
            return m_formulaHide; //@@@: return m_formulaHide;
        }; //@@@: }

        self.getFormulaValue = function() { //@@@: public cReportFormula getFormulaValue()
            return m_formulaValue; //@@@: return m_formulaValue;
        }; //@@@: }

        self.getHasFormulaValue = function() { //@@@: public bool getHasFormulaValue()
            return m_hasFormulaValue; //@@@: return m_hasFormulaValue;
        }; //@@@: }

        self.setHasFormulaValue = function(rhs) { //@@@: public void setHasFormulaValue(bool rhs)
            m_hasFormulaValue = rhs; //@@@: m_hasFormulaValue = rhs;
        }; //@@@: }

        self.getLine = function() { //@@@: public cReportLine getLine()
            return m_line; //@@@: return m_line;
        }; //@@@: }

        self.setLine = function(rhs) { //@@@: public void setLine(cReportLine rhs)
            m_line = rhs; //@@@: m_line = rhs;
        }; //@@@: }

        self.getField = function() { //@@@: public cReportField getField()
            return m_field; //@@@: return m_field;
        }; //@@@: }

        self.setField = function(rhs) { //@@@: public void setField(cReportField rhs)
            m_field = rhs; //@@@: m_field = rhs;
        }; //@@@: }

        self.getKey = function() { //@@@: public String getKey()
            return m_key; //@@@: return m_key;
        }; //@@@: }

        self.setKey = function(rhs) { //@@@: public void setKey(String rhs)
            m_key = rhs; //@@@: m_key = rhs;
        }; //@@@: }

        self.getKeyPaint = function() { //@@@: public String getKeyPaint()
            return m_keyPaint; //@@@: return m_keyPaint;
        }; //@@@: }

        self.setKeyPaint = function(rhs) { //@@@: public void setKeyPaint(String rhs)
            m_keyPaint = rhs; //@@@: m_keyPaint = rhs;
        }; //@@@: }

        self.getChart = function() { //@@@: public cReportChart getChart()
            return m_chart; //@@@: return m_chart;
        }; //@@@: }

        self.getTag = function() { //@@@: public String getTag()
            return m_tag; //@@@: return m_tag;
        }; //@@@: }

        self.setTag = function(rhs) { //@@@: public void setTag(String rhs)
            m_tag = rhs; //@@@: m_tag = rhs;
        }; //@@@: }

        self.getTypeSection = function() { //@@@: public csRptSectionType getTypeSection()
            return m_typeSection; //@@@: return m_typeSection;
        }; //@@@: }

        self.setTypeSection = function(rhs) { //@@@: public void setTypeSection(csRptSectionType rhs)
            m_typeSection = rhs; //@@@: m_typeSection = rhs;
        }; //@@@: }

        self.getSectionLine = function() { //@@@: public cReportSectionLine getSectionLine()
            return m_sectionLine; //@@@: return m_sectionLine;
        }; //@@@: }

        self.setSectionLine = function(rhs) { //@@@: public void setSectionLine(cReportSectionLine rhs)
            m_sectionLine = rhs; //@@@: m_sectionLine = rhs;
        }; //@@@: }

        self.getName = function() { //@@@: public String getName()
            return m_name; //@@@: return m_name;
        }; //@@@: }

        self.setName = function(rhs) { //@@@: public void setName(String rhs)
            m_name = rhs; //@@@: m_name = rhs;
        }; //@@@: }

        self.getHasFormulaHide = function() { //@@@: public bool getHasFormulaHide()
            return m_hasFormulaHide; //@@@: return m_hasFormulaHide;
        }; //@@@: }

        self.setHasFormulaHide = function(rhs) { //@@@: public void setHasFormulaHide(bool rhs)
            m_hasFormulaHide = rhs; //@@@: m_hasFormulaHide = rhs;
        }; //@@@: }

        self.getControlType = function() { //@@@: public csRptControlType getControlType()
            return m_controlType; //@@@: return m_controlType;
        }; //@@@: }

        self.setControlType = function(rhs) { //@@@: public void setControlType(csRptControlType rhs)
            m_controlType = rhs; //@@@: m_controlType = rhs;
        }; //@@@: }

        self.setExportColIdx = function(rhs) { //@@@: public void setExportColIdx(int rhs)
            m_exportColIdx = rhs; //@@@: m_exportColIdx = rhs;
        }; //@@@: }

        self.getExportColIdx = function() { //@@@: public int getExportColIdx()
            return m_exportColIdx; //@@@: return m_exportColIdx;
        }; //@@@: }

        self.setIsFreeCtrl = function(rhs) { //@@@: public void setIsFreeCtrl(bool rhs)
            m_isFreeCtrl = rhs; //@@@: m_isFreeCtrl = rhs;
        }; //@@@: }

        self.getIsFreeCtrl = function() { //@@@: public bool getIsFreeCtrl()
            return m_isFreeCtrl; //@@@: return m_isFreeCtrl;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            m_keyPaint = xDoc.getNodeProperty(nodeObj, "KeyPaint").getValueString(eTypes.eText); //@@@: m_keyPaint = xDoc.getNodeProperty(nodeObj, "KeyPaint").getValueString(eTypes.eText);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText); //@@@: m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            try { m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean); } //@@@: try { m_hasFormulaHide = xDoc.getNodeProperty(nodeObj, "HasFormulaHide").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }
            try { m_hasFormulaValue = xDoc.getNodeProperty(nodeObj, "HasFormulaValue").getValueBool(eTypes.eBoolean); } //@@@: try { m_hasFormulaValue = xDoc.getNodeProperty(nodeObj, "HasFormulaValue").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }
            try { m_controlType = xDoc.getNodeProperty(nodeObj, "ControlType").getValueInt(eTypes.eInteger); } //@@@: try { m_controlType = (csRptControlType)xDoc.getNodeProperty(nodeObj, "ControlType").getValueInt(eTypes.eInteger); }
            catch  (ex) { } //@@@: catch { }
            try { m_tag = xDoc.getNodeProperty(nodeObj, "Tag").getValueString(eTypes.eText); } //@@@: try { m_tag = xDoc.getNodeProperty(nodeObj, "Tag").getValueString(eTypes.eText); }
            catch  (ex) { } //@@@: catch { }
            try { m_exportColIdx = xDoc.getNodeProperty(nodeObj, "ExportColIdx").getValueInt(eTypes.eLong); } //@@@: try { m_exportColIdx = xDoc.getNodeProperty(nodeObj, "ExportColIdx").getValueInt(eTypes.eLong); }
            catch  (ex) { } //@@@: catch { }
            try { m_isFreeCtrl = xDoc.getNodeProperty(nodeObj, "IsFreeCtrl").getValueBool(eTypes.eBoolean); } //@@@: try { m_isFreeCtrl = xDoc.getNodeProperty(nodeObj, "IsFreeCtrl").getValueBool(eTypes.eBoolean); }
            catch  (ex) { } //@@@: catch { }

            try { //@@@: try
                if (!m_field.load(xDoc, nodeObj)) { return false; } //@@@: if (!m_field.load(xDoc, nodeObj)) { return false; }
                if (!m_image.load(xDoc, nodeObj)) { return false; } //@@@: if (!m_image.load(xDoc, nodeObj)) { return false; }
                if (!m_label.load(xDoc, nodeObj)) { return false; } //@@@: if (!m_label.load(xDoc, nodeObj)) { return false; }
                if (!m_line.load(xDoc, nodeObj)) { return false; } //@@@: if (!m_line.load(xDoc, nodeObj)) { return false; }
                if (!m_formulaHide.load(xDoc, nodeObj)) { return false; } //@@@: if (!m_formulaHide.load(xDoc, nodeObj)) { return false; }
                if (!m_formulaValue.load(xDoc, nodeObj)) { return false; } //@@@: if (!m_formulaValue.load(xDoc, nodeObj)) { return false; }
                if (!m_chart.load(xDoc, nodeObj)) { return false; } //@@@: if (!m_chart.load(xDoc, nodeObj)) { return false; }

                // TODO: remove me after all reports were migrated
                //
                if (m_label.getAspect().getFormat() === "" && m_field.getFieldType() === CSDataBase.csAdoDataType.adDBTimeStamp) { //@@@: if (m_label.getAspect().getFormat() == "" && m_field.getFieldType() == (int)CSDataBase.csAdoDataType.adDBTimeStamp)
                    m_label.getAspect().setFormat("dd/MM/yyyy"); //@@@: m_label.getAspect().setFormat("dd/MM/yyyy");
                } //@@@: }

                return true; //@@@: return true;
            } //@@@: }
            catch(ex)  { //@@@: catch(Exception ex)
                return false;  //@@@: return false;
            } //@@@: }
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_key); //@@@: xProperty.setName(m_key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key"); //@@@: xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key); //@@@: xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name"); //@@@: xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name); //@@@: xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("KeyPaint"); //@@@: xProperty.setName("KeyPaint");
            xProperty.setValue(eTypes.eText, m_keyPaint); //@@@: xProperty.setValue(eTypes.eText, m_keyPaint);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaHide"); //@@@: xProperty.setName("HasFormulaHide");
            xProperty.setValue(eTypes.eBoolean, m_hasFormulaHide); //@@@: xProperty.setValue(eTypes.eBoolean, m_hasFormulaHide);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("HasFormulaValue"); //@@@: xProperty.setName("HasFormulaValue");
            xProperty.setValue(eTypes.eBoolean, m_hasFormulaValue); //@@@: xProperty.setValue(eTypes.eBoolean, m_hasFormulaValue);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ControlType"); //@@@: xProperty.setName("ControlType");
            xProperty.setValue(eTypes.eInteger, m_controlType); //@@@: xProperty.setValue(eTypes.eInteger, m_controlType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Tag"); //@@@: xProperty.setName("Tag");
            xProperty.setValue(eTypes.eText, m_tag); //@@@: xProperty.setValue(eTypes.eText, m_tag);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ExportColIdx"); //@@@: xProperty.setName("ExportColIdx");
            xProperty.setValue(eTypes.eLong, m_exportColIdx); //@@@: xProperty.setValue(eTypes.eLong, m_exportColIdx);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("IsFreeCtrl"); //@@@: xProperty.setName("IsFreeCtrl");
            xProperty.setValue(eTypes.eBoolean, m_isFreeCtrl); //@@@: xProperty.setValue(eTypes.eBoolean, m_isFreeCtrl);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            if (!m_field.save(xDoc, nodeObj)) { return false; } //@@@: if (!m_field.save(xDoc, nodeObj)) { return false; }
            if (!m_image.save(xDoc, nodeObj)) { return false; } //@@@: if (!m_image.save(xDoc, nodeObj)) { return false; }
            if (!m_label.save(xDoc, nodeObj)) { return false; } //@@@: if (!m_label.save(xDoc, nodeObj)) { return false; }
            if (!m_line.save(xDoc, nodeObj)) { return false; } //@@@: if (!m_line.save(xDoc, nodeObj)) { return false; }
            if (!m_formulaHide.save(xDoc, nodeObj)) { return false; } //@@@: if (!m_formulaHide.save(xDoc, nodeObj)) { return false; }
            if (!m_formulaValue.save(xDoc, nodeObj)) { return false; } //@@@: if (!m_formulaValue.save(xDoc, nodeObj)) { return false; }
            if (!m_chart.save(xDoc, nodeObj)) { return false; } //@@@: if (!m_chart.save(xDoc, nodeObj)) { return false; }
            return true; //@@@: return true;
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
