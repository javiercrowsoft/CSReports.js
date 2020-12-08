(function(globalObject) {

    globalObject.CSReportDll = globalObject.CSReportDll || {}; //@@@: namespace CSReportDll
 //@@@: {

    globalObject.CSReportDll.createCReportConnect = function() {

        const self = {}; //@@@: public class cReportConnect

        const C_MODULE = "cReportConnect"; //@@@: private const String C_MODULE = "cReportConnect";

        const C_RPTCONNECT = "RptConnect"; //@@@: private const String C_RPTCONNECT = "RptConnect";
        const C_RPTCOLUMNS = "Columns"; //@@@: private const String C_RPTCOLUMNS = "Columns";
        const C_RPTPARAMETERS = "Parameters"; //@@@: private const String C_RPTPARAMETERS = "Parameters";

        let m_strConnect = ""; //@@@: private String m_strConnect = "";
        let m_dataSource = ""; //@@@: private String m_dataSource = "";
        let m_dataSourceType = null; //@@@: private csDataSourceType m_dataSourceType;

        let m_parameters = new cParameters(); //@@@: private cParameters m_parameters = new cParameters();
        let m_columns = new cColumnsInfo(); //@@@: private cColumnsInfo m_columns = new cColumnsInfo();

        let m_connectionTimeout = 0; //@@@: private int m_connectionTimeout = 0;
        let m_commandTimeout = 0; //@@@: private int m_commandTimeout = 0;

        self.getConnectionTimeout = function() { //@@@: public int getConnectionTimeout()
            return m_connectionTimeout; //@@@: return m_connectionTimeout;
        }; //@@@: }

        self.setConnectionTimeout = function(rhs) { //@@@: public void setConnectionTimeout(int rhs)
            m_connectionTimeout = rhs; //@@@: m_connectionTimeout = rhs;
        }; //@@@: }

        self.getCommandTimeout = function() { //@@@: public int getCommandTimeout()
            return m_commandTimeout; //@@@: return m_commandTimeout;
        }; //@@@: }

        self.setCommandTimeout = function(rhs) { //@@@: public void setCommandTimeout(int rhs)
            m_commandTimeout = rhs; //@@@: m_commandTimeout = rhs;
        }; //@@@: }

        self.getStrConnect = function() { //@@@: public String getStrConnect()
            return m_strConnect; //@@@: return m_strConnect;
        }; //@@@: }

        self.setStrConnect = function(rhs) { //@@@: public void setStrConnect(String rhs)
            m_strConnect = rhs; //@@@: m_strConnect = rhs;
        }; //@@@: }

        self.getDataBase = function() { //@@@: public String getDataBase()
            return getXFromStrConnect(m_strConnect, "Initial Catalog="); //@@@: return getXFromStrConnect(m_strConnect, "Initial Catalog=");
        }; //@@@: }

        self.getServer = function() { //@@@: public String getServer()
            return getXFromStrConnect(m_strConnect, "Data Source="); //@@@: return getXFromStrConnect(m_strConnect, "Data Source=");
        }; //@@@: }

        self.getUser = function() { //@@@: public String getUser()
            return getXFromStrConnect(m_strConnect, "User ID="); //@@@: return getXFromStrConnect(m_strConnect, "User ID=");
        }; //@@@: }

        self.getPassword = function() { //@@@: public String getPassword()
            return getXFromStrConnect(m_strConnect, "Password="); //@@@: return getXFromStrConnect(m_strConnect, "Password=");
        }; //@@@: }

        self.getDataSource = function() { //@@@: public String getDataSource()
            return m_dataSource; //@@@: return m_dataSource;
        }; //@@@: }

        self.setDataSource = function(rhs) { //@@@: public void setDataSource(String rhs)
            m_dataSource = rhs; //@@@: m_dataSource = rhs;
        }; //@@@: }

        self.getDataSourceType = function() { //@@@: public csDataSourceType getDataSourceType()
            return m_dataSourceType; //@@@: return m_dataSourceType;
        }; //@@@: }

        self.setDataSourceType = function(rhs) { //@@@: public void setDataSourceType(csDataSourceType rhs)
            m_dataSourceType = rhs; //@@@: m_dataSourceType = rhs;
        }; //@@@: }

        self.getParameters = function() { //@@@: public cParameters getParameters()
            return m_parameters; //@@@: return m_parameters;
        }; //@@@: }

        self.setParameters = function(rhs) { //@@@: public void setParameters(cParameters rhs)
            m_parameters = rhs; //@@@: m_parameters = rhs;
        }; //@@@: }

        self.getColumns = function() { //@@@: public cColumnsInfo getColumns()
            return m_columns; //@@@: return m_columns;
        }; //@@@: }

        self.setColumns = function(rhs) { //@@@: public void setColumns(cColumnsInfo rhs)
            m_columns = rhs; //@@@: m_columns = rhs;
        }; //@@@: }

        self.getSqlParameters = function() { //@@@: public String getSqlParameters()
            let s = ""; //@@@: String s = "";
            let param = null; //@@@: cParameter param = null;
            for(var _i = 0; _i < m_parameters.count(); _i++) { //@@@: for (int _i = 0; _i < m_parameters.count(); _i++)
                param = m_parameters.item(_i); //@@@: param = m_parameters.item(_i);
                switch (param.getColumnType()) //@@@: switch (param.getColumnType())
                { //@@@: {
                    case csDataType.CSTDWCHAR: //@@@: case csDataType.CSTDWCHAR:
                        /* //@@@: /*
                            case  csDataType.CSTDVARWCHAR:
                            case  csDataType.CSTDVARCHAR:
                            case  csDataType.CSTDLONGVARWCHAR:
                            case  csDataType.CSTDLONGVARCHAR:
                            case  csDataType.CSTDCHAR:
                         */
                        s +=  cDataBase.sqlString(param.getValue()) + ","; //@@@: s +=  cDataBase.sqlString(param.getValue()) + ",";
                        break; //@@@: break;
                    case csDataType.CSTDTINYINT: //@@@: case csDataType.CSTDTINYINT:
                    case csDataType.CSTDUNSIGNEDTINYINT: //@@@: case csDataType.CSTDUNSIGNEDTINYINT:
                    case csDataType.CSTDSMALLINT: //@@@: case csDataType.CSTDSMALLINT:
                    case csDataType.CSTDSINGLE: //@@@: case csDataType.CSTDSINGLE:
                    case csDataType.CSTDNUMERIC: //@@@: case csDataType.CSTDNUMERIC:
                    case csDataType.CSTDINTEGER: //@@@: case csDataType.CSTDINTEGER:
                    case csDataType.CSTDDOUBLE: //@@@: case csDataType.CSTDDOUBLE:
                    /* //@@@: /*
                        case  csDataType.CSTDDECIMAL:
                        case  csDataType.CSTDCURRENCY:
                    */
                    case csDataType.CSTDBOOLEAN: //@@@: case csDataType.CSTDBOOLEAN:
                    case csDataType.CSTDBIGINT: //@@@: case csDataType.CSTDBIGINT:
                        s +=  cDataBase.sqlNumber(param.getValue()) + ","; //@@@: s +=  cDataBase.sqlNumber(param.getValue()) + ",";
                        break; //@@@: break;
                    case csDataType.CSTDDBTIMESTAMP: //@@@: case csDataType.CSTDDBTIMESTAMP:
                        /* //@@@: /*
                        case  csDataType.CSTDDBTIME:
                        case  csDataType.CSTDDBDATE:
                        case  csDataType.CSTDDATE:
                        */
                        s +=  cDataBase.sqlDate(param.getValue()) + ","; //@@@: s +=  cDataBase.sqlDate(param.getValue()) + ",";
                        break; //@@@: break;
                    default: //@@@: default:
                        cWindow.msgWarning("This data type is not codified " //@@@: cWindow.msgWarning("This data type is not codified "
                                            + param.getColumnType() //@@@: + param.getColumnType()
                                            + ". Parameter: " + param.getName() //@@@: + ". Parameter: " + param.getName()
                                            + ". Function: sqlParameters."); //@@@: + ". Function: sqlParameters.");
                        break; //@@@: break;
                } //@@@: }
            } //@@@: }

            if (s.Length > 0 &&  s.Substring(s.Length - 1) === ",") { //@@@: if (s.Length > 0 &&  s.Substring(s.Length - 1) == ",")
                s = s.Substring(0, s.Length - 1); //@@@: s = s.Substring(0, s.Length - 1);
            } //@@@: }

            return s; //@@@: return s;
        }; //@@@: }

        self.load = function(xDoc, nodeObj) { //@@@: internal bool load(CSXml.cXml xDoc, XmlNode nodeObj)
            let nodeObjAux = null; //@@@: XmlNode nodeObjAux = null;
            let nodeObjAux2 = null; //@@@: XmlNode nodeObjAux2 = null;

            m_dataSource = xDoc.getNodeProperty(nodeObj, "DataSource").getValueString(eTypes.eText); //@@@: m_dataSource = xDoc.getNodeProperty(nodeObj, "DataSource").getValueString(eTypes.eText);
            m_dataSourceType = xDoc.getNodeProperty(nodeObj, "DataSourceType").getValueInt(eTypes.eInteger); //@@@: m_dataSourceType = (csDataSourceType)xDoc.getNodeProperty(nodeObj, "DataSourceType").getValueInt(eTypes.eInteger);
            m_strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText); //@@@: m_strConnect = xDoc.getNodeProperty(nodeObj, "StrConnect").getValueString(eTypes.eText);

            nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTCOLUMNS); //@@@: nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTCOLUMNS);

            if (xDoc.nodeHasChild(nodeObjAux2)) { //@@@: if (xDoc.nodeHasChild(nodeObjAux2))
                nodeObjAux = xDoc.getNodeChild(nodeObjAux2); //@@@: nodeObjAux = xDoc.getNodeChild(nodeObjAux2);
                while (nodeObjAux !== null) { //@@@: while (nodeObjAux != null)
                    let key = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText); //@@@: String key = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    if (!m_columns.add(null, key).load(xDoc, nodeObjAux)) { //@@@: if (!m_columns.add(null, key).load(xDoc, nodeObjAux))
                        return false; //@@@: return false;
                    } //@@@: }
                    nodeObjAux = xDoc.getNextNode(nodeObjAux); //@@@: nodeObjAux = xDoc.getNextNode(nodeObjAux);
                } //@@@: }
            } //@@@: }

            nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTPARAMETERS); //@@@: nodeObjAux2 = xDoc.getNodeFromNode(nodeObj, C_RPTPARAMETERS);

            if (xDoc.nodeHasChild(nodeObjAux2)) { //@@@: if (xDoc.nodeHasChild(nodeObjAux2))
                nodeObjAux = xDoc.getNodeChild(nodeObjAux2); //@@@: nodeObjAux = xDoc.getNodeChild(nodeObjAux2);
                while (nodeObjAux !== null) { //@@@: while (nodeObjAux != null)
                    let key = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText); //@@@: String key = xDoc.getNodeProperty(nodeObjAux, "Key").getValueString(eTypes.eText);
                    if (!m_parameters.add(null, key).load(xDoc, nodeObjAux)) { //@@@: if (!m_parameters.add(null, key).load(xDoc, nodeObjAux))
                        return false; //@@@: return false;
                    } //@@@: }
                    nodeObjAux = xDoc.getNextNode(nodeObjAux); //@@@: nodeObjAux = xDoc.getNextNode(nodeObjAux);
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        self.save = function(xDoc, nodeFather) { //@@@: internal bool save(CSXml.cXml xDoc, XmlNode nodeFather)
            let xProperty = null; //@@@: CSXml.cXmlProperty xProperty = null;
            let nodeObj = null; //@@@: XmlNode nodeObj = null;
            let nodeObjAux = null; //@@@: XmlNode nodeObjAux = null;
            xProperty = new CSXml.cXmlProperty(); //@@@: xProperty = new CSXml.cXmlProperty();

            xProperty.setName(C_RPTCONNECT); //@@@: xProperty.setName(C_RPTCONNECT);

            if (nodeFather !== null) { //@@@: if (nodeFather != null)
                nodeObj = xDoc.addNodeToNode(nodeFather, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeFather, xProperty);
            } //@@@: }
            else { //@@@: else
                nodeObj = xDoc.addNode(xProperty); //@@@: nodeObj = xDoc.addNode(xProperty);
            } //@@@: }

            xProperty.setName("DataSource"); //@@@: xProperty.setName("DataSource");
            xProperty.setValue(eTypes.eText, m_dataSource); //@@@: xProperty.setValue(eTypes.eText, m_dataSource);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("DataSourceType"); //@@@: xProperty.setName("DataSourceType");
            xProperty.setValue(eTypes.eInteger, m_dataSourceType); //@@@: xProperty.setValue(eTypes.eInteger, m_dataSourceType);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            xProperty.setName("StrConnect"); //@@@: xProperty.setName("StrConnect");
            xProperty.setValue(eTypes.eText, m_strConnect); //@@@: xProperty.setValue(eTypes.eText, m_strConnect);
            xDoc.addPropertyToNode(nodeObj, xProperty); //@@@: xDoc.addPropertyToNode(nodeObj, xProperty);

            nodeObjAux = nodeObj; //@@@: nodeObjAux = nodeObj;

            xProperty.setName(C_RPTCOLUMNS); //@@@: xProperty.setName(C_RPTCOLUMNS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let col = null; //@@@: cColumnInfo col = null;
            for(var _i = 0; _i < m_columns.count(); _i++) { //@@@: for (int _i = 0; _i < m_columns.count(); _i++)
                col = m_columns.item(_i); //@@@: col = m_columns.item(_i);
                if (!col.save(xDoc, nodeObj)) { //@@@: if (!col.save(xDoc, nodeObj))
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }

            nodeObj = nodeObjAux; //@@@: nodeObj = nodeObjAux;

            xProperty.setName(C_RPTPARAMETERS); //@@@: xProperty.setName(C_RPTPARAMETERS);
            nodeObj = xDoc.addNodeToNode(nodeObj, xProperty); //@@@: nodeObj = xDoc.addNodeToNode(nodeObj, xProperty);

            let param = null; //@@@: cParameter param = null;
            for(var _i = 0; _i < m_parameters.count(); _i++) { //@@@: for (int _i = 0; _i < m_parameters.count(); _i++)
                param = m_parameters.item(_i); //@@@: param = m_parameters.item(_i);
                if (!param.save(xDoc, nodeObj)) { //@@@: if (!param.save(xDoc, nodeObj))
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }

            return true; //@@@: return true;
        }; //@@@: }

        const getXFromStrConnect = function(strConnect, x) { //@@@: private String getXFromStrConnect(String strConnect, String x)
            let i = 0; //@@@: int i = 0;
            let p = 0; //@@@: int p = 0;

            if (x.Substring(x.Length - 1) !== "=") { //@@@: if (x.Substring(x.Length - 1) != "=")
                x = x + "="; //@@@: x = x + "=";
            } //@@@: }
            i = strConnect.IndexOf(x, 0); //@@@: i = strConnect.IndexOf(x, 0);
            if (i > 0) { //@@@: if (i > 0)
                p = strConnect.IndexOf(";", i); //@@@: p = strConnect.IndexOf(";", i);
                if (p === 0) { //@@@: if (p == 0)
                    p = strConnect.Length + 1; //@@@: p = strConnect.Length + 1;
                } //@@@: }
                i = i + x.Length; //@@@: i = i + x.Length;
                return strConnect.Substring(i, p - i); //@@@: return strConnect.Substring(i, p - i);
            } //@@@: }
            else { //@@@: else
                return ""; //@@@: return "";
            } //@@@: }
        }; //@@@: }

        return self;

    } //@@@: }

}(globalObject)); //@@@: }
