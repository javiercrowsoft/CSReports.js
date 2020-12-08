(function(globalObject) {

    globalObject.CSReportEditor = globalObject.CSReportEditor || {};

    globalObject.CSReportEditor.createFSimpleConnect = function() {

        const self = {};
        let m_ok: boolean= false;

        const fSimpleConnect = function() {
            InitializeComponent();
        };

		self.setServer = function(value) {
            tx_server.Text = value;
		};

		self.setDataBase = function(value) {
            tx_database.Text = value;
		};

		self.setUser = function(value) {
            tx_user.Text = value;
		};

		self.setPassword = function(value) {
            tx_password.Text = value;
		};

		self. = function() {
            return tx_user.Text;
		};

		self.setConnectTypeToNT = function() {
            op_trustedConnection.Checked = true;
		};

		self.setConnectTypeToSQL = function() {
            op_sqlConnection.Checked = true;
		};

		self. = function() {
            return m_ok;
		};

		self. = function() {
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
		};

        const cmd_apply_Click = function(sender, e) {
            if (op_sqlConnection.Checked && tx_user.Text === "") {
                cWindow.msgWarning("You must indicate a user");
            }
            else {
                m_ok = true;
                this.Close();
            }
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Close();
        };

        const op_sqlConnection_CheckedChanged = function(sender, e) {
            setEnabledUserAndPassword();
        };

        const op_trustedConnection_CheckedChanged = function(sender, e) {
            setEnabledUserAndPassword();
        };

        const setEnabledUserAndPassword = function() {
            tx_user.Enabled = op_sqlConnection.Checked;
            tx_password.Enabled = op_sqlConnection.Checked;
        };

        const fSimpleConnect_Load = function(sender, e) {
            cWindow.centerForm(this);
        };
        return self;

    }
}(globalObject));
