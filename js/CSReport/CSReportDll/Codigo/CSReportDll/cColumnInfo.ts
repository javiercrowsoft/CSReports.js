(function(globalObject) {
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using CSKernelClient;

    globalObject.CSReportDll = globalObject.CSReportDll || {};
{

    public class cColumnInfo
    {

        private const String C_MODULE = "cColumnInfo";

        private String m_name = "";
        private CSDataBase.csDataType m_columnType;

        // TODO: remove me
        //private String m_value = "";
        private int m_position = 0;
        private String m_key = "";

        public String getKey()
        {
            return m_key;
        }

        public void setKey(String rhs)
        {
            m_key = rhs;
        }

        public String getName()
        {
            return m_name;
        }

        public void setName(String rhs)
        {
            m_name = rhs;
        }

        public CSDataBase.csDataType getColumnType()
        {
            return m_columnType;
        }

        public void setColumnType(CSDataBase.csDataType rhs)
        {
            m_columnType = rhs;
        }

        // TODO: remove me
        /*
        public String getValue()
        {
            return m_value;
        }

        public void setValue(String rhs)
        {
            m_value = rhs;
        }
        */
        self.getPosition = function() {
            return m_position;


        self.setPosition = function(rhs) {
            m_position = rhs;
        }

        self.load = function(xDoc, nodeObj) {
            m_columnType = xDoc.getNodeProperty(nodeObj, "TypeColumn").getValueInt(eTypes.eInteger);
            // TODO: remove me
            //m_value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            m_position = xDoc.getNodeProperty(nodeObj, "Position").getValueInt(eTypes.eInteger);
            m_name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            m_key = xDoc.getNodeProperty(nodeObj, "Key").getValueString(eTypes.eText);

            return true;
        }

        self.save = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(m_key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, m_key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, m_name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Position");
            xProperty.setValue(eTypes.eInteger, m_position);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeColumn");
            xProperty.setValue(eTypes.eInteger, m_columnType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: remove me
            /*
            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, m_value);
            xDoc.addPropertyToNode(nodeObj, xProperty);
            */
            return true;
        }

    }

}
