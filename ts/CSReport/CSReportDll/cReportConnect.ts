namespace CSReportDll {

    export class cReportConnect {

        private C_MODULE: string = "cReportConnect";

        private C_RPTCONNECT: string = "RptConnect";
        private C_RPTCOLUMNS: string = "Columns";
        private C_RPTPARAMETERS: string = "Parameters";

        private strConnect: string = "";
        private dataSource: string = "";
        private dataSourceType: csDataSourceType = null;

        private parameters: cParameters = new cParameters();
        private columns: cColumnsInfo = new cColumnsInfo();

        private connectionTimeout: number = 0;
        private commandTimeout: number = 0;

        public getConnectionTimeout() {
            return this.connectionTimeout;
        }

        public setConnectionTimeout(rhs: number) {
            this.connectionTimeout = rhs;
        }

        public getCommandTimeout() {
            return this.commandTimeout;
        }

        public setCommandTimeout(rhs: number) {
            this.commandTimeout = rhs;
        }

        public getStrConnect() {
            return this.strConnect;
        }

        public setStrConnect(rhs: string) {
            this.strConnect = rhs;
        }

        public getDataBase() {
            return getXFromStrConnect(this.strConnect, "Initial Catalog=");
        }

        public getServer() {
            return getXFromStrConnect(this.strConnect, "Data Source=");
        }

        public getUser() {
            return getXFromStrConnect(this.strConnect, "User ID=");
        }

        public getPassword() {
            return getXFromStrConnect(this.strConnect, "Password=");
        }

        public getDataSource() {
            return this.dataSource;
        }

        public setDataSource(rhs: string) {
            this.dataSource = rhs;
        }

        public getDataSourceType() {
            return this.dataSourceType;
        }

        public setDataSourceType(rhs: csDataSourceType) {
            this.dataSourceType = rhs;
        }

        public getParameters() {
            return this.parameters;
        }

        public setParameters(rhs: cParameters) {
            this.parameters = rhs;
        }

        public getColumns() {
            return this.columns;
        }

        public setColumns(rhs: cColumnsInfo) {
            this.columns = rhs;
        }

        public getSqlParameters() {
            let s: string = "";
            let param: cParameter = null;
            for(let _i = 0; _i < this.parameters.count(); _i++) {
                param = this.parameters.item(_i);
                switch (param.getColumnType())
                {
                    case csDataType.CSTDWCHAR:
                        /*
                            case  csDataType.CSTDVARWCHAR:
                            case  csDataType.CSTDVARCHAR:
                            case  csDataType.CSTDLONGVARWCHAR:
                            case  csDataType.CSTDLONGVARCHAR:
                            case  csDataType.CSTDCHAR:
                         */
                        s +=  Database.sqlString(param.getValue()) + ",";
                        break;
                    case csDataType.CSTDTINYINT:
                    case csDataType.CSTDUNSIGNEDTINYINT:
                    case csDataType.CSTDSMALLINT:
                    case csDataType.CSTDSINGLE:
                    case csDataType.CSTDNUMERIC:
                    case csDataType.CSTDINTEGER:
                    case csDataType.CSTDDOUBLE:
                    /*
                        case  csDataType.CSTDDECIMAL:
                        case  csDataType.CSTDCURRENCY:
                    */
                    case csDataType.CSTDBOOLEAN:
                    case csDataType.CSTDBIGINT:
                        s +=  Database.sqlNumber(param.getValue()) + ",";
                        break;
                    case csDataType.CSTDDBTIMESTAMP:
                        /*
                        case  csDataType.CSTDDBTIME:
                        case  csDataType.CSTDDBDATE:
                        case  csDataType.CSTDDATE:
                        */
                        s +=  Database.sqlDate(param.getValue()) + ",";
                        break;
                    default:
                        cWindow.msgWarning("This data type is not codified "
                                            + param.getColumnType()
                                            + ". Parameter: " + param.getName()
                                            + ". Function: sqlParameters.");
                        break;
                }
            }

            if (s.length > 0 &&  s.substring(s.length - 1) === ",") {
                s = s.substring(0, s.length - 1);
            }

            return s;
        }

        public load(xDoc: CSXml.cXml, nodeObj: XmlNode) {
            let nodeObjAux: XmlNode = null;
            let nodeObjAux2: XmlNode = null;

            this.dataSource = xDoc.getNodeProperty(nodeObj, "DataSource").getValueString(eTypes.eText);
            this.dataSourceType = xDoc.getNodeProperty(nodeObj, "DataSourceType").getValueInt(eTypes.eInteger);
            this.strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText);

            nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTCOLUMNS);

            if (xDoc.nodeHasChild(nodeObjAux2)) {
                nodeObjAux = xDoc.getNodeChild(nodeObjAux2);
                while (nodeObjAux !== null) {
                    let key: string = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    if (!this.columns.add(null, key).load(xDoc, nodeObjAux)) {
                        return false;
                    }
                    nodeObjAux = xDoc.getNextNode(nodeObjAux);
                }
            }

            nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTPARAMETERS);

            if (xDoc.nodeHasChild(nodeObjAux2)) {
                nodeObjAux = xDoc.getNodeChild(nodeObjAux2);
                while (nodeObjAux !== null) {
                    let key: string = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    if (!this.parameters.add(null, key).load(xDoc, nodeObjAux)) {
                        return false;
                    }
                    nodeObjAux = xDoc.getNextNode(nodeObjAux);
                }
            }

            return true;
        }

        public save(xDoc: CSXml.cXml, nodeFather: XmlNode) {
            let xProperty: CSXml.cXmlProperty = null;
            let nodeObj: XmlNode = null;
            let nodeObjAux: XmlNode = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(C_RPTCONNECT);

            if (nodeFather !== null) {
                nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);
            }
            else {
                nodeObj = xDoc.addNode(xProperty);
            }

            xProperty.setName("DataSource");
            xProperty.setValue(eTypes.eText, this.dataSource);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("DataSourceType");
            xProperty.setValue(eTypes.eInteger, this.dataSourceType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("StrConnect");
            xProperty.setValue(eTypes.eText, this.strConnect);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            nodeObjAux = nodeObj;

            xProperty.setName(C_RPTCOLUMNS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let col: cColumnInfo = null;
            for(let _i = 0; _i < this.columns.count(); _i++) {
                col = this.columns.item(_i);
                if (!col.save(xDoc, nodeObj)) {
                    return false;
                }
            }

            nodeObj = nodeObjAux;

            xProperty.setName(C_RPTPARAMETERS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let param: cParameter = null;
            for(let _i = 0; _i < this.parameters.count(); _i++) {
                param = this.parameters.item(_i);
                if (!param.save(xDoc, nodeObj)) {
                    return false;
                }
            }

            return true;
        }

        private getXFromStrConnect(strConnect: string, x: string) {
            let i: number = 0;
            let p: number = 0;

            if (x.substring(x.length - 1) !== "=") {
                x = x + "=";
            }
            i = strConnect.IndexOf(x, 0);
            if (i > 0) {
                p = strConnect.IndexOf(";", i);
                if (p === 0) {
                    p = strConnect.length + 1;
                }
                i = i + x.length;
                return strConnect.substring(i, p - i);
            }
            else {
                return "";
            }
        }
    }
}
