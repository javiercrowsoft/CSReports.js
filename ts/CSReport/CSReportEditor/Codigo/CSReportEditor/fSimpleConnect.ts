

namespace CSReportEditor
{
    export class fSimpleConnect {


    {
        private ok: boolean = false;

        public constructor() {
            InitializeComponent();
        }

		public setServer(value: string) {
            tx_server.Text = value;
		}

		public setDataBase(value: string) {
            tx_database.Text = value;
		}

		public setUser(value: string) {
            tx_user.Text = value;
		}

		public setPassword(value: string) {
            tx_password.Text = value;
		}

		public getUser() {
            return tx_user.Text;
		}

		public setConnectTypeToNT() {
            op_trustedConnection.Checked = true;
		}

		public setConnectTypeToSQL() {
            op_sqlConnection.Checked = true;
		}

		public getOk() {
            return this.ok;
		}

		public getStrConnect() {
UNKNOWN >>             string strConnect;
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
            return strConnect;
		}

        private cmd_apply_Click(sender: object, e: EventArgs) {
            if (op_sqlConnection.Checked && tx_user.Text === "") {
                cWindow.msgWarning("You must indicate a user");
            }
            else {
                this.ok = true;
                this.Close();
            }
        }

        private cmd_cancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Close();
        }

        private op_sqlConnection_CheckedChanged(sender: object, e: EventArgs) {
            setEnabledUserAndPassword();
        }

        private op_trustedConnection_CheckedChanged(sender: object, e: EventArgs) {
            setEnabledUserAndPassword();
        }

        private setEnabledUserAndPassword() {
            tx_user.Enabled = op_sqlConnection.Checked;
            tx_password.Enabled = op_sqlConnection.Checked;
        }

        private fSimpleConnect_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
        }


    }    }
}
