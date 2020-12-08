(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {};

    globalObject.CSConnect.createCConnect = function() {

        const self = {};
        let m_parameters = new cParameters();
        let m_columnsInfo = new cColumnsInfo();

        let m_strConnect = "";
        let m_dataSource = "";
        let m_dataSourceType = null;

		self.getParameters = function() {
            return m_parameters;
		};

        self.getColumnsInfo = function() {
            return m_columnsInfo;
        };

        self.fillParameters = function(dataSource) {
            let db = new cDataBase(csDatabaseEngine.SQL_SERVER);
            if (db.initDb(m_strConnect)) {
                let restrictions = new string[4];
                restrictions[2] = dataSource;
                let dt = db.openSchema("ProcedureParameters", restrictions);

                if (m_parameters === null) m_parameters = new cParameters(); {

                let parameters = new cParameters();

                for(var i_ = 0; i_ < dt.Rows.length; i_++) {
                    if (row["parameter_mode"].ToString() !== "OUT")  {
                        let p = null;
                        let found = false;
                        for (var i = 0; i < m_parameters.count(); i++) {
                            p = m_parameters.item(i);
                            if (p.getName() === row["parameter_name"].ToString()) {
                                found = true;
                                break;
                            }
                        }
                        if (!found) p = null; {
                        p = parameters.add(p, "");
                        p.setName(row["parameter_name"].ToString());
                        p.setPosition(row["ordinal_position"]);
                        p.setColumnType(cDatabaseGlobals.getDataTypeFromString(row["data_type"].ToString()));
                    }
                }
                //
                // openSchema can be sorted by any column (usually by name)
                // we need this collection to be sorted by position
                //
                m_parameters = new cParameters();

                for (var j = 1; j < parameters.count() + 1; j++) {
                    let p = null;
                    let found = false;
                    for (var i = 0; i < parameters.count(); i++) {
                        p = parameters.item(i);
                        if (p.getPosition() === j) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        throw new Exception("Parameter not found for position: " + j);
                    }
                    else {
                        m_parameters.add(p, p.getKey());
                    }
                }

                return true;
            }

            return false;
        };

		self.getDataSourceColumnsInfo = function(str, csDataSourceType) {
UNKNOWN >>             string sqlstmt;

            if(m_dataSourceType === csDataSourceType.CDDTPROCEDURE) {
                if(! fillParameters(m_dataSource)) {
                    return false;
                }

                let f = new fParameters();
                f.setParameters(m_parameters);
                f.ShowDialog();
                if (f.getOk()) {
                    sqlstmt = "[" + m_dataSource + "] " + f.getSqlParameters();
                }
                else {
                    return false;
                }
            }
            else {
                sqlstmt = "select * from [" + m_dataSource + "]";
            }

            return fillColumns(sqlstmt);
		};

        const fillColumns = function(sqlstmt) {
            let db = new cDataBase(csDatabaseEngine.SQL_SERVER);
            if (db.initDb(m_strConnect)) {
UNKNOWN >>                 DbDataReader rs;
                if (db.openRs(sqlstmt, rs, "fillColumns", "cConnect", "Update columns's definition", CSKernelClient.eErrorLevel.eErrorInformation)) {
                    for(var i = 0; i < rs.FieldCount; i++) {
                        let column = new cColumnInfo();
                        column.setName(rs.GetName(i));
                        column.setPosition(i);
                        column.setColumnType(System.Type.GetTypeCode((rs.GetFieldType(i))));
                        m_columnsInfo.add(column, "");
                    }
                }
                else {
                    return false;
                }
            }
            return true;
        };

		self.setStrConnect = function(strConnect) {
			m_strConnect = strConnect;
		};

		self.setDataSource = function(dataSource) {
			m_dataSource = dataSource;
		};

		self.setDataSourceType = function(dataSourceType) {
            m_dataSourceType = dataSourceType;
		};

		self.showOpenConnection = function() {
			throw new NotImplementedException ();
		};

		self.getDataSource = function() {
            return m_dataSource;
		};

		self. = function() {
            return m_dataSourceType;
		};
        return self;

    }
}(globalObject));
