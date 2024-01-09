///<reference path="../CSReportGlobals/ReportGlobals.ts"/>

namespace CSConnect {

    import P = CSKernelClient.Callable;
    import NotImplementedException = CSOAPI.NotImplementedException;
    import Database = CSDatabase.Database;
    import DataSource = CSDatabase.DataSource;
    import DatabaseEngine = CSDatabase.DatabaseEngine;
    import csDataSourceType = CSReportGlobals.csDataSourceType;
    import DataTable = CSDatabase.DataTable;
    import DatabaseGlobals = CSDatabase.DatabaseGlobals;
    import Exception = CSOAPI.Exception;
    import RefWrapper = CSKernelClient.RefWrapper;
    import ServerConnection = CSDatabase.ServerConnection;

    export class cConnect {

        private parameters: cParameters = new cParameters();
        private columnsInfo: cColumnsInfo = new cColumnsInfo();

        private strConnect: string = "";
        private dataSource: string = "";
        private dataSourceType: csDataSourceType = null;

        private static f: fParameters = null;

		public getParameters() {
            return this.parameters;
		}

        public getColumnsInfo() {
            return this.columnsInfo;
        }

		public getDataSourceColumnsInfo(serverConnection: ServerConnection) {

            return serverConnection.getDataSourceInfo(this.dataSource).then(P.call(this, (dataSource) => {
                if(dataSource !== undefined) {
                    if(cConnect.f === null) cConnect.f = new fParameters();
                    debugger;
                    cConnect.f.initDialog(this.parameters);
                    cConnect.f.showModal().then(P.call(this, (result)=> {
                        if(result.success) {
                            return serverConnection.excute(this.dataSource, result.params).then(P.call(this, (dataSource) => {
                                this.updateParamsAndColumns(serverConnection, result.params, dataSource);
                                return true;
                            }));
                        };
                    }));
                }
            }));
		}

        private updateParamsAndColumns(serverConnection: ServerConnection, params, dataSource: DataSource) {
            const columns = dataSource.data[0].data.columns;
            for(let i = 0; i < columns.length; i++) {
                let column = new cColumnInfo();
                column.setName(columns[i].name);
                column.setPosition(i);
                column.setColumnType(DatabaseGlobals.getDataTypeFromString(columns[i].columnType));
                this.columnsInfo.add(column, "");
            }
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

        //#region SQL Server

        /* SQL Server code
        *
        *
        *
        public getDataSourceColumnsInfoSQLServer() {
            let sqlstmt: string;

            if(this.dataSourceType === csDataSourceType.CS_DT_PROCEDURE) {
                if(! this.fillParametersSQLServer(this.dataSource)) {
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

        public fillParametersSQLServer(dataSource: string) {
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

        */

        //#endregion SQL Server
    }
}
