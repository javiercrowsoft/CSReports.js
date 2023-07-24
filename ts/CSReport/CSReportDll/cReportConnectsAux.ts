namespace CSReportDll {

    import Map = CSOAPI.Map;
    import XmlNode = CSXml.XmlNode;

    export class cReportConnectsAux extends Map<cReportConnect> {

        public static C_RPT_CONNECTS_AUX: string = "RptConnectsAux";

        constructor() {
            super(null, false, cReportConnect);
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let connect: cReportConnect = null;

            if (nodeFather === null) {
                let xProperty: CSXml.cXmlProperty = new CSXml.cXmlProperty();
                xProperty.setName(cReportConnectsAux.C_RPT_CONNECTS_AUX);
                nodeFather = xDoc.addNode(xProperty);
            }

            for(let _i = 0; _i < this.count(); _i++) {
                connect = this.item(_i);
                if (! connect.save(xDoc, nodeFather))  {
                    return false;
                }
            }

            return true;
        }

        public load(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let nodeObj: XmlNode = null;
            this.clear();
            if (nodeFather !== null) {
                if (xDoc.nodeHasChild(nodeFather)) {
                    nodeObj = xDoc.getNodeChild(nodeFather);
                    while (nodeObj !== null) {
                        if (! this.add(null, "").load(xDoc, nodeObj))  {
                            return false;
                        }
                        nodeObj = xDoc.getNextNode(nodeObj);
                    }
                }
            }

            return true;
        }
    }

}
