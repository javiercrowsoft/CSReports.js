namespace CSReportDll {

    import RptGrpOrderType = CSReportGlobals.RptGrpOrderType;
    import RptGrpComparisonType = CSReportGlobals.RptGrpComparisonType;
    import eTypes = CSKernelClient.eTypes;
    import XmlNode = CSXml.XmlNode;

    export class cReportGroup {

        private C_HEADER: string = "H";
        private C_FOOTER: string = "F";

        private header: cReportSection = null;
        private footer: cReportSection = null;
        private index: number = 0;

        private name: string = "";

        private oderType: RptGrpOrderType = null;
        private comparisonType: RptGrpComparisonType = null;

        // to print in a new page when the group change
        //
        private printInNewPage: boolean = null;

        // to reprint group headers in every new page
        //
        private rePrintInNewPage: boolean = null;
        private grandTotalGroup: boolean = null;
        private fieldName: string = "";
        private key: string = "";

        public getHeader() {
            return this.header;
        }

        public setHeader(rhs: cReportSection) {
            this.header = rhs;
        }

        public getFooter() {
            return this.footer;
        }

        public setFooter(rhs: cReportSection) {
            this.footer = rhs;
        }

        public getIndex() {
            return this.index;
        }

        public setIndex(rhs: number) {
            this.index = rhs;
        }

        public getOderType() {
            return this.oderType;
        }

        public setOderType(rhs: RptGrpOrderType) {
            this.oderType = rhs;
        }

        public getComparisonType() {
            return this.comparisonType;
        }

        public setComparisonType(rhs: RptGrpComparisonType) {
            this.comparisonType = rhs;
        }

        public getPrintInNewPage() {
            return this.printInNewPage;
        }

        public setPrintInNewPage(rhs: boolean) {
            this.printInNewPage = rhs;
        }

        public getRePrintInNewPage() {
            return this.rePrintInNewPage;
        }

        public setRePrintInNewPage(rhs: boolean) {
            this.rePrintInNewPage = rhs;
        }

        public getGrandTotalGroup() {
            return this.grandTotalGroup;
        }

        public setGrandTotalGroup(rhs: boolean) {
            this.grandTotalGroup = rhs;
        }

        public getFieldName() {
            return this.fieldName;
        }

        public setFieldName(rhs: string) {
            this.fieldName = rhs;
        }

        public getName() {
            return this.name;
        }

        public setName(rhs: string) {
            this.name = rhs;
        }

        public getKey() {
            return this.key;
        }

        public setKey(rhs: string) {
            this.key = rhs;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            this.name = xDoc.getNodeProperty(nodeObj, "Name").getValueString(eTypes.eText);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            this.index = xDoc.getNodeProperty(nodeObj, "Indice").getValueInt(eTypes.eInteger);

            this.comparisonType = xDoc.getNodeProperty(nodeObj, "ComparisonType").getValueInt(eTypes.eInteger);
            this.fieldName = xDoc.getNodeProperty(nodeObj, "FieldName").getValueString(eTypes.eText);
            this.oderType = xDoc.getNodeProperty(nodeObj, "OderType").getValueInt(eTypes.eInteger);
            this.printInNewPage = xDoc.getNodeProperty(nodeObj, "PrintInNewPage").getValueBool(eTypes.eBoolean);
            this.rePrintInNewPage = xDoc.getNodeProperty(nodeObj, "RePrintInNewPage").getValueBool(eTypes.eBoolean);
            this.grandTotalGroup = xDoc.getNodeProperty(nodeObj, "GrandTotalGroup").getValueBool(eTypes.eBoolean);

            this.fixName();

            let nodeObjAux: XmlNode = null;

            nodeObjAux = nodeObj;
            nodeObjAux = xDoc.getNodeFromNode(nodeObj, this.C_HEADER);
            nodeObjAux = xDoc.getNodeChild(nodeObjAux);
            if (!this.header.load(xDoc, nodeObjAux))  {
                return false; 
            }

            this.header.setName(this.name);

            nodeObjAux = nodeObj;
            nodeObjAux = xDoc.getNodeFromNode(nodeObj, this.C_FOOTER);
            nodeObjAux = xDoc.getNodeChild(nodeObjAux);
            if (!this.footer.load(xDoc, nodeObjAux))  {
                return false; 
            }

            this.footer.setName(this.name);

            return true;
        }

        public fixName() {
            if (this.name.length === 0
                || this.name.toLowerCase().substring(0, 5) === "group"
                || this.name.toLowerCase().substring(0, 5) === "grupo"
                || this.name.toLowerCase().substring(0, 3) === "gh_"
                || this.name.toLowerCase().substring(0, 3) === "gf_"
                || this.name.toLowerCase().substring(0, 2) === "g_"
                ) {
                this.name = "G_" + this.index;
            }

        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;

            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(this.name);
            nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);

            xProperty.setName("Key");
            xProperty.setValue(eTypes.eText, this.key);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("Name");
            xProperty.setValue(eTypes.eText, this.name);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            // TODO: fix me - this is Spanish - English bug we should use Index
            //
            xProperty.setName("Indice");

            xProperty.setValue(eTypes.eInteger, this.index);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("ComparisonType");
            xProperty.setValue(eTypes.eInteger, this.comparisonType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("FieldName");
            xProperty.setValue(eTypes.eText, this.fieldName);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("OderType");
            xProperty.setValue(eTypes.eInteger, this.oderType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("PrintInNewPage");
            xProperty.setValue(eTypes.eBoolean, this.printInNewPage);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("RePrintInNewPage");
            xProperty.setValue(eTypes.eBoolean, this.rePrintInNewPage);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("GrandTotalGroup");
            xProperty.setValue(eTypes.eBoolean, this.grandTotalGroup);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            let nodeObjAux: XmlNode = null;
            nodeObjAux = nodeObj;
            xProperty.setName(this.C_HEADER);
            nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty);
            this.header.save(xDoc, nodeObjAux);

            nodeObjAux = nodeObj;
            xProperty.setName(this.C_FOOTER);
            nodeObjAux = xDoc.addNodeToNode(nodeObjAux, xProperty);
            this.footer.save(xDoc, nodeObjAux);

            return true;

        }
    }
}
