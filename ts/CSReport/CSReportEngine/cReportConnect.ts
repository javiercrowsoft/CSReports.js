namespace CSReportEngine {

    import csDataType = CSDatabase.csDataType;
    import csDataSourceType = CSReportGlobals.csDataSourceType;
    import eTypes = CSKernelClient.eTypes;
    import cWindow = CSKernelClient.cWindow;
    import P = CSKernelClient.Callable;
    import Database = CSDatabase.Database;

    export class cReportConnect {

        private static RPT_CONNECT: string = "RptConnect";
        private static RPT_COLUMNS: string = "Columns";
        private static RPT_PARAMETERS: string = "Parameters";

        private strConnect: string = "";
        private dataSource: string = "";
        private dataSourceType: csDataSourceType = null;

        private parameters: cParameters = new cParameters();
        private columns: cColumnsInfo = new cColumnsInfo();

        private connectionTimeout: number = 0;
        private commandTimeout: number = 0;

        public constructor() {}

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
            return this.getXFromStrConnect(this.strConnect, "Initial Catalog=");
        }

        public getServer() {
            return this.getXFromStrConnect(this.strConnect, "Data Source=");
        }

        public getUser() {
            return this.getXFromStrConnect(this.strConnect, "User ID=");
        }

        public getPassword() {
            return this.getXFromStrConnect(this.strConnect, "Password=");
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

            let p = P._();

            for(let _i = 0; _i < this.parameters.count(); _i++) {
                p = p.then(P.call(this, () => {

                    param = this.parameters.item(_i);
                    switch (param.getColumnType())
                    {
                        case csDataType.CS_TD_WCHAR:
                        case csDataType.CS_TD_VARWCHAR:
                        case csDataType.CS_TD_VARCHAR:
                        case csDataType.CS_TD_LONGVARWCHAR:
                        case csDataType.CS_TD_LONGVARCHAR:
                        case csDataType.CS_TD_CHAR:
                            s +=  Database.sqlString(param.getValue()) + ",";
                            break;

                        case csDataType.CS_TD_TINYINT:
                        case csDataType.CS_TD_UNSIGNEDTINYINT:
                        case csDataType.CS_TD_SMALLINT:
                        case csDataType.CS_TD_SINGLE:
                        case csDataType.CS_TD_NUMERIC:
                        case csDataType.CS_TD_INTEGER:
                        case csDataType.CS_TD_DOUBLE:
                        case csDataType.CS_TD_DECIMAL:
                        case csDataType.CS_TD_CURRENCY:
                        case csDataType.CS_TD_BOOLEAN:
                        case csDataType.CS_TD_BIGINT:
                            s +=  Database.sqlNumber(param.getValue()) + ",";
                            break;

                        case csDataType.CS_TD_DBTIMESTAMP:
                        case csDataType.CS_TD_DBTIME:
                        case csDataType.CS_TD_DBDATE:
                        case csDataType.CS_TD_DATE:
                            s +=  Database.sqlDate(param.getValue()) + ",";
                            break;
                        default:
                            return cWindow.msgWarning("This data type is not codified "
                                                + param.getColumnType()
                                                + ". Parameter: " + param.getName()
                                                + ". Function: sqlParameters.", "Report connect");
                    }
                }));
            }

            return p.then(()=> {
                if(s.length > 0 &&  s.substring(s.length - 1) === ",") {
                    s = s.substring(0, s.length - 1);
                }

                return s;
            });
        }

        public copy(from: ReportConnectDTO): boolean {
            this.dataSource = from.dataSource;
            this.dataSourceType = from.dataSourceType;
            this.strConnect = from.strConnect;

            this.loadColl(from.columns, this.columns);
            this.loadColl(from.parameters, this.parameters);

            return true;
        }

        private loadColl(from: any, coll: any) {
            for(let i = 0; i < from.count(); i++) {
                let key: string = from.keys[i];
                if(!coll.add(null, key).copy(from.item(i))) {
                    return;
                }
            }
        }

        public load(xDoc: CSXml.cXml, nodeObj): boolean {
            this.dataSource = xDoc.getNodeProperty(nodeObj, "DataSource").getValueString(eTypes.eText);
            this.dataSourceType = xDoc.getNodeProperty(nodeObj, "DataSourceType").getValueInt(eTypes.eInteger);
            this.strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText);

            this.loadNode(xDoc, xDoc.getNodeFromNode(nodeObj, cReportConnect.RPT_COLUMNS), this.columns);
            this.loadNode(xDoc, xDoc.getNodeFromNode(nodeObj, cReportConnect.RPT_PARAMETERS), this.parameters);

            return true;
        }

        private loadNode(xDoc: CSXml.cXml, node, coll) {
            if(xDoc.nodeHasChild(node)) {
                let child = xDoc.getNodeChild(node);
                while (child !== null) {
                    let key: string = xDoc.getNodeProperty(child, "Key").getValueString(eTypes.eText);
                    if(!coll.add(null, key).load(xDoc, child)) {
                        return;
                    }
                    child = xDoc.getNextNode(child);
                }
            }
        }

        public save(xDoc: CSXml.cXml, nodeFather) {
            let nodeObj;
            let xProperty = new CSXml.cXmlProperty();

            xProperty.setName(cReportConnect.RPT_CONNECT);

            if(nodeFather !== null) {
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

            xProperty.setName(cReportConnect.RPT_COLUMNS);
            this.saveColumnNode(xDoc, xDoc.addNodeToNode(nodeObj, xProperty));

            xProperty.setName(cReportConnect.RPT_PARAMETERS);
            this.saveParamNode(xDoc, xDoc.addNodeToNode(nodeObj, xProperty));
        }

        private saveColumnNode(xDoc: CSXml.cXml, node) {
            let col: cColumnInfo = null;
            for(let _i = 0; _i < this.columns.count(); _i++) {
                col = this.columns.item(_i);
                if(!col.save(xDoc, node)) {
                    return false;
                }
            }
        }

        private saveParamNode(xDoc: CSXml.cXml, node) {
            let param: cParameter = null;
            for(let _i = 0; _i < this.parameters.count(); _i++) {
                param = this.parameters.item(_i);
                if(!param.save(xDoc, node)) {
                    return false;
                }
            }
        }

        private getXFromStrConnect(strConnect: string, x: string) {
            if(x.substring(x.length - 1) !== "=") {
                x = x + "=";
            }
            let i = strConnect.indexOf(x, 0);
            if(i > 0) {
                let p = strConnect.indexOf(";", i);
                if(p === 0) {
                    p = strConnect.length + 1;
                }
                i = i + x.length;
                debugger; // seguro que este substring esta mal
                return strConnect.substring(i, p - i);
            }
            else {
                return "";
            }
        }
    }
}
