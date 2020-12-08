(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {};


    globalObject.CSReportDll.createCReportConnect = function() {

        const self = {};

        const C_MODULE = "cReportConnect";

        const C_RPTCONNECT = "RptConnect";
        const C_RPTCOLUMNS = "Columns";
        const C_RPTPARAMETERS = "Parameters";

        let m_strConnect = "";
        let m_dataSource = "";
        let m_dataSourceType = null;

        let m_parameters = new cParameters();
        let m_columns = new cColumnsInfo();

        let m_connectionTimeout = 0;
        let m_commandTimeout = 0;

        self.getConnectionTimeout = function() {
            return m_connectionTimeout;
        };

        self.setConnectionTimeout = function(rhs) {
            m_connectionTimeout = rhs;
        };

        self.getCommandTimeout = function() {
            return m_commandTimeout;
        };

        self.setCommandTimeout = function(rhs) {
            m_commandTimeout = rhs;
        };

        self.getStrConnect = function() {
            return m_strConnect;
        };

        self.setStrConnect = function(rhs) {
            m_strConnect = rhs;
        };

        self.getDataBase = function() {
            return getXFromStrConnect(m_strConnect, "Initial Catalog=");
        };

        self.getServer = function() {
            return getXFromStrConnect(m_strConnect, "Data Source=");
        };

        self.getUser = function() {
            return getXFromStrConnect(m_strConnect, "User ID=");
        };

        self.getPassword = function() {
            return getXFromStrConnect(m_strConnect, "Password=");
        };

        self.getDataSource = function() {
            return m_dataSource;
        };

        self.setDataSource = function(rhs) {
            m_dataSource = rhs;
        };

        self.getDataSourceType = function() {
            return m_dataSourceType;
        };

        self.setDataSourceType = function(rhs) {
            m_dataSourceType = rhs;
        };

        self.getParameters = function() {
            return m_parameters;
        };

        self.setParameters = function(rhs) {
            m_parameters = rhs;
        };

        self.getColumns = function() {
            return m_columns;
        };

        self.setColumns = function(rhs) {
            m_columns = rhs;
        };

        self.getSqlParameters = function() {
            let s = "";
            let param = null;
            for(var _i = 0; _i < m_parameters.count(); _i++) {
                param = m_parameters.item(_i);
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
                        s +=  cDataBase.sqlString(param.getValue()) + ",";
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
                        s +=  cDataBase.sqlNumber(param.getValue()) + ",";
                        break;
                    case csDataType.CSTDDBTIMESTAMP:
                        /*
                        case  csDataType.CSTDDBTIME:
                        case  csDataType.CSTDDBDATE:
                        case  csDataType.CSTDDATE:
                        */
                        s +=  cDataBase.sqlDate(param.getValue()) + ",";
                        break;
                    default:
                        cWindow.msgWarning("This data type is not codified "
                                            + param.getColumnType()
                                            + ". Parameter: " + param.getName()
                                            + ". Function: sqlParameters.");
                        break;
                }
            }

            if (s.Length > 0 &&  s.Substring(s.Length - 1) === ",") {
                s = s.Substring(0, s.Length - 1);
            }

            return s;
        };

        self.load = function(xDoc, nodeObj) {
            let nodeObjAux = null;
            let nodeObjAux2 = null;

            m_dataSource = xDoc.getNodeProperty(nodeObj, "DataSource").getValueString(eTypes.eText);
            m_dataSourceType = xDoc.getNodeProperty(nodeObj, "DataSourceType").getValueInt(eTypes.eInteger);
            m_strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText);

            nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTCOLUMNS);

            if (xDoc.nodeHasChild(nodeObjAux2)) {
                nodeObjAux = xDoc.getNodeChild(nodeObjAux2);
                while (nodeObjAux !== null) {
                    let key = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    if (!m_columns.add(null, key).load(xDoc, nodeObjAux)) {
                        return false;
                    }
                    nodeObjAux = xDoc.getNextNode(nodeObjAux);
                }
            }

            nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTPARAMETERS);

            if (xDoc.nodeHasChild(nodeObjAux2)) {
                nodeObjAux = xDoc.getNodeChild(nodeObjAux2);
                while (nodeObjAux !== null) {
                    let key = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    if (!m_parameters.add(null, key).load(xDoc, nodeObjAux)) {
                        return false;
                    }
                    nodeObjAux = xDoc.getNextNode(nodeObjAux);
                }
            }

            return true;
        };

        self.save = function(xDoc, nodeFather) {
            let xProperty = null;
            let nodeObj = null;
            let nodeObjAux = null;
            xProperty = new CSXml.cXmlProperty();

            xProperty.setName(C_RPTCONNECT);

            if (nodeFather !== null) {
                nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);
            }
            else {
                nodeObj = xDoc.addNode(xProperty);
            }

            xProperty.setName("DataSource");
            xProperty.setValue(eTypes.eText, m_dataSource);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("DataSourceType");
            xProperty.setValue(eTypes.eInteger, m_dataSourceType);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("StrConnect");
            xProperty.setValue(eTypes.eText, m_strConnect);
            xDoc.addPropertyToNode(nodeObj, xProperty);

            nodeObjAux = nodeObj;

            xProperty.setName(C_RPTCOLUMNS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let col = null;
            for(var _i = 0; _i < m_columns.count(); _i++) {
                col = m_columns.item(_i);
                if (!col.save(xDoc, nodeObj)) {
                    return false;
                }
            }

            nodeObj = nodeObjAux;

            xProperty.setName(C_RPTPARAMETERS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let param = null;
            for(var _i = 0; _i < m_parameters.count(); _i++) {
                param = m_parameters.item(_i);
                if (!param.save(xDoc, nodeObj)) {
                    return false;
                }
            }

            return true;
        };

        const getXFromStrConnect = function(strConnect, x) {
            let i = 0;
            let p = 0;

            if (x.Substring(x.Length - 1) !== "=") {
                x = x + "=";
            }
            i = strConnect.IndexOf(x, 0);
            if (i > 0) {
                p = strConnect.IndexOf(";", i);
                if (p === 0) {
                    p = strConnect.Length + 1;
                }
                i = i + x.Length;
                return strConnect.Substring(i, p - i);
            }
            else {
                return "";
            }
        };

        return self;

    }

}(globalObject));
