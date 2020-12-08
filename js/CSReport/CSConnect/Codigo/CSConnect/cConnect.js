(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {}; //@@@: namespace CSConnect
 //@@@: {
    globalObject.CSConnect.createCConnect = function() {

        const self = {}; //@@@: public class cConnect
        let m_parameters = new cParameters(); //@@@: private cParameters m_parameters = new cParameters();
        let m_columnsInfo = new cColumnsInfo(); //@@@: private cColumnsInfo m_columnsInfo = new cColumnsInfo();

        let m_strConnect = ""; //@@@: private string m_strConnect = "";
        let m_dataSource = ""; //@@@: private string m_dataSource = "";
        let m_dataSourceType = null; //@@@: private csDataSourceType m_dataSourceType;

		self.getParameters = function() { //@@@: public cParameters getParameters()
            return m_parameters; //@@@: return m_parameters;
		}; //@@@: }

        self.getColumnsInfo = function() { //@@@: public cColumnsInfo getColumnsInfo()
            return m_columnsInfo; //@@@: return m_columnsInfo;
        }; //@@@: }

        self.fillParameters = function(dataSource) { //@@@: public bool fillParameters(string dataSource)
            let db = new cDataBase(csDatabaseEngine.SQL_SERVER); //@@@: cDataBase db = new cDataBase(csDatabaseEngine.SQL_SERVER);
            if (db.initDb(m_strConnect)) { //@@@: if (db.initDb(m_strConnect))
                let restrictions = new string[4]; //@@@: string[] restrictions = new string[4];
                restrictions[2] = dataSource; //@@@: restrictions[2] = dataSource;
                let dt = db.openSchema("ProcedureParameters", restrictions); //@@@: DataTable dt = db.openSchema("ProcedureParameters", restrictions);

                if (m_parameters === null) m_parameters = new cParameters(); { //@@@: if (m_parameters == null) m_parameters = new cParameters();

                let parameters = new cParameters(); //@@@: cParameters parameters = new cParameters();

                for(var i_ = 0; i_ < dt.Rows.length; i_++) { //@@@: foreach (DataRow row in dt.Rows)
                    if (row["parameter_mode"].ToString() !== "OUT")  { //@@@: if (row["parameter_mode"].ToString() != "OUT")
                        let p = null; //@@@: cParameter p = null;
                        let found = false; //@@@: bool found = false;
                        for (var i = 0; i < m_parameters.count(); i++) { //@@@: for (var i = 0; i < m_parameters.count(); i++)
                            p = m_parameters.item(i); //@@@: p = m_parameters.item(i);
                            if (p.getName() === row["parameter_name"].ToString()) { //@@@: if (p.getName() == row["parameter_name"].ToString())
                                found = true; //@@@: found = true;
                                break; //@@@: break;
                            } //@@@: }
                        } //@@@: }
                        if (!found) p = null; { //@@@: if (!found) p = null;
                        p = parameters.add(p, ""); //@@@: p = parameters.add(p, "");
                        p.setName(row["parameter_name"].ToString()); //@@@: p.setName(row["parameter_name"].ToString());
                        p.setPosition(row["ordinal_position"]); //@@@: p.setPosition((int)row["ordinal_position"]);
                        p.setColumnType(cDatabaseGlobals.getDataTypeFromString(row["data_type"].ToString())); //@@@: p.setColumnType(cDatabaseGlobals.getDataTypeFromString(row["data_type"].ToString()));
                    } //@@@: }
                } //@@@: }
                //
                // openSchema can be sorted by any column (usually by name)
                // we need this collection to be sorted by position
                //
                m_parameters = new cParameters(); //@@@: m_parameters = new cParameters();

                for (var j = 1; j < parameters.count() + 1; j++) { //@@@: for (var j = 1; j < parameters.count() + 1; j++)
                    let p = null; //@@@: cParameter p = null;
                    let found = false; //@@@: bool found = false;
                    for (var i = 0; i < parameters.count(); i++) { //@@@: for (var i = 0; i < parameters.count(); i++)
                        p = parameters.item(i); //@@@: p = parameters.item(i);
                        if (p.getPosition() === j) { //@@@: if (p.getPosition() == j)
                            found = true; //@@@: found = true;
                            break; //@@@: break;
                        } //@@@: }
                    } //@@@: }
                    if (!found) { //@@@: if (!found)
                        throw new Exception("Parameter not found for position: " + j); //@@@: throw new Exception("Parameter not found for position: " + j);
                    } //@@@: }
                    else { //@@@: else
                        m_parameters.add(p, p.getKey()); //@@@: m_parameters.add(p, p.getKey());
                    } //@@@: }
                } //@@@: }

                return true; //@@@: return true;
            } //@@@: }

            return false; //@@@: return false;
        }; //@@@: }

		self.getDataSourceColumnsInfo = function(str, csDataSourceType) { //@@@: public bool getDataSourceColumnsInfo(string str, csDataSourceType csDataSourceType)
UNKNOWN >>             string sqlstmt; //@@@: string sqlstmt;

            if(m_dataSourceType === csDataSourceType.CDDTPROCEDURE) { //@@@: if(m_dataSourceType == csDataSourceType.CDDTPROCEDURE)
                if(! fillParameters(m_dataSource)) { //@@@: if(! fillParameters(m_dataSource))
                    return false; //@@@: return false;
                } //@@@: }

                let f = new fParameters(); //@@@: fParameters f = new fParameters();
                f.setParameters(m_parameters); //@@@: f.setParameters(m_parameters);
                f.ShowDialog(); //@@@: f.ShowDialog();
                if (f.getOk()) { //@@@: if (f.getOk())
                    sqlstmt = "[" + m_dataSource + "] " + f.getSqlParameters(); //@@@: sqlstmt = "[" + m_dataSource + "] " + f.getSqlParameters();
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
            else { //@@@: else
                sqlstmt = "select * from [" + m_dataSource + "]"; //@@@: sqlstmt = "select * from [" + m_dataSource + "]";
            } //@@@: }

            return fillColumns(sqlstmt); //@@@: return fillColumns(sqlstmt);
		}; //@@@: }

        const fillColumns = function(sqlstmt) { //@@@: private bool fillColumns(string sqlstmt)
            let db = new cDataBase(csDatabaseEngine.SQL_SERVER); //@@@: var db = new cDataBase(csDatabaseEngine.SQL_SERVER);
            if (db.initDb(m_strConnect)) { //@@@: if (db.initDb(m_strConnect))
UNKNOWN >>                 DbDataReader rs; //@@@: DbDataReader rs;
                if (db.openRs(sqlstmt, rs, "fillColumns", "cConnect", "Update columns's definition", CSKernelClient.eErrorLevel.eErrorInformation)) { //@@@: if (db.openRs(sqlstmt, out rs, "fillColumns", "cConnect", "Update columns's definition", CSKernelClient.eErrorLevel.eErrorInformation))
                    for(var i = 0; i < rs.FieldCount; i++) { //@@@: for (int i = 0; i < rs.FieldCount; i++)
                        let column = new cColumnInfo(); //@@@: var column = new cColumnInfo();
                        column.setName(rs.GetName(i)); //@@@: column.setName(rs.GetName(i));
                        column.setPosition(i); //@@@: column.setPosition(i);
                        column.setColumnType(System.Type.GetTypeCode((rs.GetFieldType(i)))); //@@@: column.setColumnType((csDataType)System.Type.GetTypeCode((rs.GetFieldType(i))));
                        m_columnsInfo.add(column, ""); //@@@: m_columnsInfo.add(column, "");
                    } //@@@: }
                } //@@@: }
                else { //@@@: else
                    return false; //@@@: return false;
                } //@@@: }
            } //@@@: }
            return true; //@@@: return true;
        }; //@@@: }

		self.setStrConnect = function(strConnect) { //@@@: public void setStrConnect(string strConnect)
			m_strConnect = strConnect; //@@@: m_strConnect = strConnect;
		}; //@@@: }

		self.setDataSource = function(dataSource) { //@@@: public void setDataSource(string dataSource)
			m_dataSource = dataSource; //@@@: m_dataSource = dataSource;
		}; //@@@: }

		self.setDataSourceType = function(dataSourceType) { //@@@: public void setDataSourceType(csDataSourceType dataSourceType)
            m_dataSourceType = dataSourceType; //@@@: m_dataSourceType = dataSourceType;
		}; //@@@: }

		self.showOpenConnection = function() { //@@@: public bool showOpenConnection()
			throw new NotImplementedException (); //@@@: throw new NotImplementedException ();
		}; //@@@: }

		self.getDataSource = function() { //@@@: public string getDataSource()
            return m_dataSource; //@@@: return m_dataSource;
		}; //@@@: }

		self. = function() { //@@@: public csDataSourceType getDataSourceType ()
            return m_dataSourceType; //@@@: return m_dataSourceType;
		}; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
