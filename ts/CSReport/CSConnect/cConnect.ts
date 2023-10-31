///<reference path="../CSReportGlobals/ReportGlobals.ts"/>

namespace CSConnect {

    import NotImplementedException = CSOAPI.NotImplementedException;
    import Database = CSDatabase.Database;
    import DatabaseEngine = CSDatabase.DatabaseEngine;
    import csDataSourceType = CSReportGlobals.csDataSourceType;
    import DataTable = CSDatabase.DataTable;
    import DatabaseGlobals = CSDatabase.DatabaseGlobals;
    import Exception = CSOAPI.Exception;
    import RefWrapper = CSKernelClient.RefWrapper;

    export class cConnect {

        private parameters: cParameters = new cParameters();
        private columnsInfo: cColumnsInfo = new cColumnsInfo();

        private strConnect: string = "";
        private dataSource: string = "";
        private dataSourceType: csDataSourceType = null;

		public getParameters() {
            return this.parameters;
		}

        public getColumnsInfo() {
            return this.columnsInfo;
        }

        public fillParameters(dataSource: string) {
            let db: Database = new Database(DatabaseEngine.SQL_SERVER);
            if(db.initDb(this.strConnect)) {
                let restrictions: string[] = [];
                restrictions[2] = dataSource;
                let dt: DataTable = db.openSchema("ProcedureParameters", restrictions);

                if(this.parameters === null) this.parameters = new cParameters();

                let parameters: cParameters = new cParameters();

                for(let i = 0; i < dt.rows.length; i++) {
                    let row = dt.rows[i];
                    if(row["parameter_mode"].toString() !== "OUT") {
                        let p: cParameter = null;
                        let found: boolean = false;
                        for(let i = 0; i < this.parameters.count(); i++) {
                            p = this.parameters.item(i);
                            if(p.getName() === row["parameter_name"].toString()) {
                                found = true;
                                break;
                            }
                        }
                        if(!found) p = null;
                        p = parameters.add(p, "");
                        p.setName(row["parameter_name"].toString());
                        p.setPosition(row["ordinal_position"]);
                        p.setColumnType(DatabaseGlobals.getDataTypeFromString(row["data_type"].toString()));
                    }
                }
                //
                // openSchema can be sorted by any column (usually by name)
                // we need this collection to be sorted by position
                //
                this.parameters = new cParameters();

                for(let j = 1; j < parameters.count() + 1; j++) {
                    let p: cParameter = null;
                    let found: boolean = false;
                    for(let i = 0; i < parameters.count(); i++) {
                        p = parameters.item(i);
                        if(p.getPosition() === j) {
                            found = true;
                            break;
                        }
                    }
                    if(!found) {
                        throw new Exception("Parameter not found for position: " + j);
                    }
                    else {
                        this.parameters.add(p, p.getKey());
                    }
                }

                return true;
            }

            return false;
        }

		public getDataSourceColumnsInfo() {
            let sqlstmt: string;

            if(this.dataSourceType === csDataSourceType.CS_DT_PROCEDURE) {
                if(! this.fillParameters(this.dataSource)) {
                    return false;
                }

                let f: fParameters = new fParameters();
                f.setParameters(this.parameters);
                f.showDialog();
                if(f.getOk()) {
                    sqlstmt = "[" + this.dataSource + "] " + f.getSqlParameters();
                }
                else {
                    return false;
                }
            }
            else {
                sqlstmt = "select * from [" + this.dataSource + "]";
            }

            return this.fillColumns(sqlstmt);
		}

        private fillColumns(sqlstmt: string) {
            let db = new Database(DatabaseEngine.SQL_SERVER);
            if(db.initDb(this.strConnect)) {
                let rsRef = new RefWrapper<DataTable>();
                if(db.openRs(sqlstmt, rsRef)) {
                    let rs = rsRef.get();
                    for(let i = 0; i < rs.getFieldCount(); i++) {
                        let column = new cColumnInfo();
                        column.setName(rs.getColumnName(i));
                        column.setPosition(i);
                        column.setColumnType(rs.getFieldType(i));
                        this.columnsInfo.add(column, "");
                    }
                }
                else {
                    return false;
                }
            }
            return true;
        }

		public setStrConnect(strConnect: string) {
			this.strConnect = strConnect;
		}

		public setDataSource(dataSource: string) {
			this.dataSource = dataSource;
		}

		public setDataSourceType(dataSourceType: csDataSourceType) {
            this.dataSourceType = dataSourceType;
		}

		public showOpenConnection(): boolean {
			throw new NotImplementedException();
		}

		public getDataSource() {
            return this.dataSource;
		}

		public getDataSourceType() {
            return this.dataSourceType;
		}
    }
}
