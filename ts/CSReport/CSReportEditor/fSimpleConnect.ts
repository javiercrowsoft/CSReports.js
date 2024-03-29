namespace CSReportEditor {

    import Form = CSForms.Form;

    export class FSimpleConnect extends Form {

        private ok: boolean = false;

        public constructor() {
            super();
            // InitializeComponent();
        }

		public setServer(value: string) {
            // tx_server.setText(value);
		}

		public setDataBase(value: string) {
            // tx_database.setText(value);
		}

		public setUser(value: string) {
            // tx_user.setText(value);
		}

		public setPassword(value: string) {
            // tx_password.setText(value);
		}

		public getUser(): string {
            return "";
            // return tx_user.Text;
		}

		public setConnectTypeToNT() {
            // op_trustedConnection.setChecked(true);
		}

		public setConnectTypeToSQL() {
            // op_sqlConnection.setChecked(true);
		}

		public getOk() {
            return this.ok;
		}

		public getStrConnect() {
            let strConnect: string;
            /*
			if(op_trustedConnection.Checked) {
                strConnect = "Provider=SQLOLEDB.1;";
                strConnect += "Integrated Security=SSPI;";
                strConnect += "Persist Security Info=False;";
                strConnect += "Initial Catalog=" + tx_database.Text + ";";
                strConnect += "Data Source=" + tx_server.Text + ";";
            }
            else {
                strConnect = "Provider=SQLOLEDB.1;";
                strConnect += "Persist Security Info=True;";
                strConnect += "Data Source=" + tx_server.Text + ";";
                strConnect += "User ID=" + tx_user.Text + ";";
                strConnect += "Password=" + tx_password.Text + ";";
                strConnect += "Initial Catalog=" + tx_database.Text + ";";
            }
            */
            return strConnect;
		}

        private cmd_apply_Click(sender: object, e: object) {
            /*
            if(op_sqlConnection.Checked && tx_user.Text === "") {
                cWindow.msgWarning("You must indicate a user");
            }
            else {
                this.ok = true;
                this.Close();
            }
            */
        }

        private cmd_cancel_Click(sender: object, e: object) {
            this.ok = false;
            // this.Close();
        }

        private op_sqlConnection_CheckedChanged(sender: object, e: object) {
            this.setEnabledUserAndPassword();
        }

        private op_trustedConnection_CheckedChanged(sender: object, e: object) {
            this.setEnabledUserAndPassword();
        }

        private setEnabledUserAndPassword() {
            /*
            tx_user.setEnabled(op_sqlConnection.Checked);
            tx_password.setEnabled(op_sqlConnection.Checked);
            */
        }

        private fSimpleConnect_Load(sender: object, e: object) {
            //cWindow.centerForm(this);
        }
    }
}
