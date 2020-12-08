(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {};

    globalObject.CSConnect.createFParameters = function() {

        const self = {};
        let m_ok = false;
        let m_texts = null;

        let m_parameters = null;

        const fParameters = function() {
            InitializeComponent();
        };

        self.getOk = function() {
            return m_ok;
        };

        const cmd_apply_Click = function(sender, e) {
            m_ok = true;
            this.Hide();
        };

        const cmd_cancel_Click = function(sender, e) {
            m_ok = false;
            this.Hide();
        };

        const fParameters_Load = function(sender, e) {
            cWindow.centerForm(this);
            loadParameters();
        };

        self.setParameters = function(value) {
            m_parameters = value;
        };

        self.getSqlParameters = function() {
            let parameters = "";

            for(var i = 0; i < m_parameters.count(); i++) {
                let input = m_texts[i];

                m_parameters.item(i).setValue(input.Text);

                let value = "";
                switch(input.Tag.ToString())
                {
                    case "T":
                        value = cDataBase.sqlString(input.Text);
                        break;
                    case "N":
                        value = cDataBase.sqlNumber(input.Text);
                        break;
                    case "F":
                        value = cDataBase.sqlDate(input.Text);
                        break;
                }                
                parameters += value + ",";
            }

            if (parameters.Substring(parameters.Length - 1, 1) === ",") {
                parameters = parameters.Substring(0, parameters.Length - 1);
            }

            return parameters;
        };

        const loadParameters = function() {
            let top = 20;

            m_texts = new TextBox[m_parameters.count()];

            for(var j = 0; j < m_parameters.count(); j++)  {
                let parameter = m_parameters.getByPosition(j+1);

                let label = new System.Windows.Forms.Label();
                label.AutoSize = true;
                label.Location = new System.Drawing.Point(30, top);
                label.Text = parameter.getName();

                let input = new System.Windows.Forms.TextBox();
                input.Location = new System.Drawing.Point(150, top);
                input.Size = new System.Drawing.Size(150, 20);
                input.Text = parameter.getValue();
                input.Tag = parameter.getKey();

                switch(parameter.getColumnType())
                {
                    case csDataType.CSTDLONGVARCHAR:
                    case csDataType.CSTDCHAR:
                        input.Tag = "T";
                        break;
                    case csDataType.CSTDBIGINT:
                    case csDataType.CSTDBINARY:
                    case csDataType.CSTDINTEGER:
                    case csDataType.CSTDSMALLINT:
                    case csDataType.CSTDTINYINT:
                    case csDataType.CSTDUNSIGNEDTINYINT:
                        input.Tag = "N";
                        break;
                    case csDataType.CSTDBOOLEAN:
                        input.Tag = "N";
                        break;
                    case csDataType.CSTDSINGLE:
                    case csDataType.CSTDDECIMAL:
                    case csDataType.CSTDDOUBLE:
                        input.Tag = "N";
                        break;
                    case csDataType.CSTDDBTIME:
                        input.Tag = "F";
                        break;
                }

                m_texts[j] = input;

                pnlParameters.Controls.Add(label);
                pnlParameters.Controls.Add(input);

                top += 30;
            }
        }; 

        return self;

    }
}(globalObject));
