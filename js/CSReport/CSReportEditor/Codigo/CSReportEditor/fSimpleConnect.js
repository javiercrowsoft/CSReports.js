(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {}; //@@@: namespace CSReportEditor
 //@@@: {
    globalObject.CSReportEditor.createFSimpleConnect = function() {

        const self = {}; //@@@: public partial class fSimpleConnect : Form
        let m_ok = false; //@@@: private bool m_ok = false;

        const fSimpleConnect = function() { //@@@: public fSimpleConnect()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

		self.setServer = function(value) { //@@@: public void setServer(string value)
            tx_server.Text = value; //@@@: tx_server.Text = value;
		}; //@@@: }

		self.setDataBase = function(value) { //@@@: public void setDataBase(string value)
            tx_database.Text = value; //@@@: tx_database.Text = value;
		}; //@@@: }

		self.setUser = function(value) { //@@@: public void setUser(string value)
            tx_user.Text = value; //@@@: tx_user.Text = value;
		}; //@@@: }

		self.setPassword = function(value) { //@@@: public void setPassword(string value)
            tx_password.Text = value; //@@@: tx_password.Text = value;
		}; //@@@: }

		self. = function() { //@@@: public string getUser ()
            return tx_user.Text; //@@@: return tx_user.Text;
		}; //@@@: }

		self.setConnectTypeToNT = function() { //@@@: public void setConnectTypeToNT()
            op_trustedConnection.Checked = true; //@@@: op_trustedConnection.Checked = true;
		}; //@@@: }

		self.setConnectTypeToSQL = function() { //@@@: public void setConnectTypeToSQL()
            op_sqlConnection.Checked = true; //@@@: op_sqlConnection.Checked = true;
		}; //@@@: }

		self. = function() { //@@@: public bool getOk ()
            return m_ok; //@@@: return m_ok;
		}; //@@@: }

		self. = function() { //@@@: public string getStrConnect ()
UNKNOWN >>             string strConnect; //@@@: string strConnect;
			if(op_trustedConnection.Checked) { //@@@: if(op_trustedConnection.Checked)
                strConnect = "Provider=SQLOLEDB.1;"; //@@@: strConnect = "Provider=SQLOLEDB.1;";
                strConnect += "Integrated Security=SSPI;"; //@@@: strConnect += "Integrated Security=SSPI;";
                strConnect += "Persist Security Info=False;"; //@@@: strConnect += "Persist Security Info=False;";
                strConnect += "Initial Catalog=" + tx_database.Text + ";"; //@@@: strConnect += "Initial Catalog=" + tx_database.Text + ";";
                strConnect += "Data Source=" + tx_server.Text + ";"; //@@@: strConnect += "Data Source=" + tx_server.Text + ";";
            } //@@@: }
            else { //@@@: else
                strConnect = "Provider=SQLOLEDB.1;"; //@@@: strConnect = "Provider=SQLOLEDB.1;";
                strConnect += "Persist Security Info=True;"; //@@@: strConnect += "Persist Security Info=True;";
                strConnect += "Data Source=" + tx_server.Text + ";"; //@@@: strConnect += "Data Source=" + tx_server.Text + ";";
                strConnect += "User ID=" + tx_user.Text + ";"; //@@@: strConnect += "User ID=" + tx_user.Text + ";";
                strConnect += "Password=" + tx_password.Text + ";"; //@@@: strConnect += "Password=" + tx_password.Text + ";";
                strConnect += "Initial Catalog=" + tx_database.Text + ";"; //@@@: strConnect += "Initial Catalog=" + tx_database.Text + ";";
            } //@@@: }
            return strConnect; //@@@: return strConnect;
		}; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            if (op_sqlConnection.Checked && tx_user.Text === "") { //@@@: if (op_sqlConnection.Checked && tx_user.Text == "")
                cWindow.msgWarning("You must indicate a user"); //@@@: cWindow.msgWarning("You must indicate a user");
            } //@@@: }
            else { //@@@: else
                m_ok = true; //@@@: m_ok = true;
                this.Close(); //@@@: this.Close();
            } //@@@: }
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Close(); //@@@: this.Close();
        }; //@@@: }

        const op_sqlConnection_CheckedChanged = function(sender, e) { //@@@: private void op_sqlConnection_CheckedChanged(object sender, EventArgs e)
            setEnabledUserAndPassword(); //@@@: setEnabledUserAndPassword();
        }; //@@@: }

        const op_trustedConnection_CheckedChanged = function(sender, e) { //@@@: private void op_trustedConnection_CheckedChanged(object sender, EventArgs e)
            setEnabledUserAndPassword(); //@@@: setEnabledUserAndPassword();
        }; //@@@: }

        const setEnabledUserAndPassword = function() { //@@@: private void setEnabledUserAndPassword()
            tx_user.Enabled = op_sqlConnection.Checked; //@@@: tx_user.Enabled = op_sqlConnection.Checked;
            tx_password.Enabled = op_sqlConnection.Checked; //@@@: tx_password.Enabled = op_sqlConnection.Checked;
        }; //@@@: }

        const fSimpleConnect_Load = function(sender, e) { //@@@: private void fSimpleConnect_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
        }; //@@@: }
        return self;

    } //@@@: }
}(globalObject)); //@@@: }
