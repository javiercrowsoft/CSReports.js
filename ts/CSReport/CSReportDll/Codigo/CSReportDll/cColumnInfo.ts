
﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using CSKernelClient;

namespace CSReportDll
{

    public class cColumnInfo
    {

        private const String C_MODULE = "cColumnInfo";

        private String this.name = "";
        private CSDataBase.csDataType this.columnType;

        // TODO: remove me
        //private String this.value = "";
        private int this.position = 0;
        private String this.key = "";

        public String getKey()
        {
            return this.key;
        }

        public void setKey(String rhs)
        {
            this.key = rhs;
        }

        public String getName()
        {
            return this.name;
        }

        public void setName(String rhs)
        {
            this.name = rhs;
        }

        public CSDataBase.csDataType getColumnType()
        {
            return this.columnType;
        }

        public void setColumnType(CSDataBase.csDataType rhs)
        {
            this.columnType = rhs;
        }

        // TODO: remove me
        /*
        public String getValue()
        {
            return this.value;
        }

        public void setValue(String rhs)
        {
            this.value = rhs;
        }
        */
        public getPosition() {
            return this.position;
        }

        public setPosition(rhs: number) {
            this.position = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.columnType = xDoc.getNodeProperty(nodeObj, "TypeColumn").getValueInt(eTypes.eInteger);
            // TODO: remove me
            //this.value = xDoc.getNodeProperty(nodeObj, "Value").getValueString(eTypes.eText);
            this.position = xDoc.getNodeProperty(nodeObj, "Position").getValueInt(eTypes.eInteger);
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);
            this.key = xDoc.getNodeProperty(nodeObj, "Key").getValueString(eTypes.eText);

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(this.key);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, this.key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Position");
            xProperty.setValue(eTypes.eInteger, this.position);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("TypeColumn");
            xProperty.setValue(eTypes.eInteger, this.columnType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: remove me
            /*
            xProperty.setName("Value");
            xProperty.setValue(eTypes.eText, this.value);
            xDoc.addPropertyToNode(nodeObj, xProperty);
            */
            return true;
        }

    }

}
