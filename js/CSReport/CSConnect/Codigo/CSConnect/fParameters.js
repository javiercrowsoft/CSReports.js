(function(globalObject) {

    globalObject.CSConnect = globalObject.CSConnect || {}; //@@@: namespace CSConnect
 //@@@: {
    globalObject.CSConnect.createFParameters = function() {

        const self = {}; //@@@: public partial class fParameters : Form
        let m_ok = false; //@@@: private bool m_ok = false;
        let m_texts = null; //@@@: private TextBox[] m_texts = null;

        let m_parameters = null; //@@@: private cParameters m_parameters;

        const fParameters = function() { //@@@: public fParameters()
            InitializeComponent(); //@@@: InitializeComponent();
        }; //@@@: }

        self.getOk = function() { //@@@: public bool getOk()
            return m_ok; //@@@: return m_ok;
        }; //@@@: }

        const cmd_apply_Click = function(sender, e) { //@@@: private void cmd_apply_Click(object sender, EventArgs e)
            m_ok = true; //@@@: m_ok = true;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const cmd_cancel_Click = function(sender, e) { //@@@: private void cmd_cancel_Click(object sender, EventArgs e)
            m_ok = false; //@@@: m_ok = false;
            this.Hide(); //@@@: this.Hide();
        }; //@@@: }

        const fParameters_Load = function(sender, e) { //@@@: private void fParameters_Load(object sender, EventArgs e)
            cWindow.centerForm(this); //@@@: cWindow.centerForm(this);
            loadParameters(); //@@@: loadParameters();
        }; //@@@: }

        self.setParameters = function(value) { //@@@: internal void setParameters(cParameters value)
            m_parameters = value; //@@@: m_parameters = value;
        }; //@@@: }

        self.getSqlParameters = function() { //@@@: public string getSqlParameters()
            let parameters = ""; //@@@: var parameters = "";

            for(var i = 0; i < m_parameters.count(); i++) { //@@@: for (int i = 0; i < m_parameters.count(); i++)
                let input = m_texts[i]; //@@@: var input = m_texts[i];

                m_parameters.item(i).setValue(input.Text); //@@@: m_parameters.item(i).setValue(input.Text);

                let value = ""; //@@@: var value = "";
                switch(input.Tag.ToString()) //@@@: switch(input.Tag.ToString())
                { //@@@: {
                    case "T": //@@@: case "T":
                        value = cDataBase.sqlString(input.Text); //@@@: value = cDataBase.sqlString(input.Text);
                        break; //@@@: break;
                    case "N": //@@@: case "N":
                        value = cDataBase.sqlNumber(input.Text); //@@@: value = cDataBase.sqlNumber(input.Text);
                        break; //@@@: break;
                    case "F": //@@@: case "F":
                        value = cDataBase.sqlDate(input.Text); //@@@: value = cDataBase.sqlDate(input.Text);
                        break; //@@@: break;
                }                 //@@@: }
                parameters += value + ","; //@@@: parameters += value + ",";
            } //@@@: }

            if (parameters.Substring(parameters.Length - 1, 1) === ",") { //@@@: if (parameters.Substring(parameters.Length - 1, 1) == ",")
                parameters = parameters.Substring(0, parameters.Length - 1); //@@@: parameters = parameters.Substring(0, parameters.Length - 1);
            } //@@@: }

            return parameters; //@@@: return parameters;
        }; //@@@: }

        const loadParameters = function() { //@@@: private void loadParameters()
            let top = 20; //@@@: int top = 20;

            m_texts = new TextBox[m_parameters.count()]; //@@@: m_texts = new TextBox[m_parameters.count()];

            for(var j = 0; j < m_parameters.count(); j++)  { //@@@: for (int j = 0; j < m_parameters.count(); j++)
                let parameter = m_parameters.getByPosition(j+1); //@@@: cParameter parameter = m_parameters.getByPosition(j+1);

                let label = new System.Windows.Forms.Label(); //@@@: System.Windows.Forms.Label label = new System.Windows.Forms.Label();
                label.AutoSize = true; //@@@: label.AutoSize = true;
                label.Location = new System.Drawing.Point(30, top); //@@@: label.Location = new System.Drawing.Point(30, top);
                label.Text = parameter.getName(); //@@@: label.Text = parameter.getName();

                let input = new System.Windows.Forms.TextBox(); //@@@: System.Windows.Forms.TextBox input = new System.Windows.Forms.TextBox();
                input.Location = new System.Drawing.Point(150, top); //@@@: input.Location = new System.Drawing.Point(150, top);
                input.Size = new System.Drawing.Size(150, 20); //@@@: input.Size = new System.Drawing.Size(150, 20);
                input.Text = parameter.getValue(); //@@@: input.Text = parameter.getValue();
                input.Tag = parameter.getKey(); //@@@: input.Tag = parameter.getKey();

                switch(parameter.getColumnType()) //@@@: switch(parameter.getColumnType())
                { //@@@: {
                    case csDataType.CSTDLONGVARCHAR: //@@@: case csDataType.CSTDLONGVARCHAR:
                    case csDataType.CSTDCHAR: //@@@: case csDataType.CSTDCHAR:
                        input.Tag = "T"; //@@@: input.Tag = "T";
                        break; //@@@: break;
                    case csDataType.CSTDBIGINT: //@@@: case csDataType.CSTDBIGINT:
                    case csDataType.CSTDBINARY: //@@@: case csDataType.CSTDBINARY:
                    case csDataType.CSTDINTEGER: //@@@: case csDataType.CSTDINTEGER:
                    case csDataType.CSTDSMALLINT: //@@@: case csDataType.CSTDSMALLINT:
                    case csDataType.CSTDTINYINT: //@@@: case csDataType.CSTDTINYINT:
                    case csDataType.CSTDUNSIGNEDTINYINT: //@@@: case csDataType.CSTDUNSIGNEDTINYINT:
                        input.Tag = "N"; //@@@: input.Tag = "N";
                        break; //@@@: break;
                    case csDataType.CSTDBOOLEAN: //@@@: case csDataType.CSTDBOOLEAN:
                        input.Tag = "N"; //@@@: input.Tag = "N";
                        break; //@@@: break;
                    case csDataType.CSTDSINGLE: //@@@: case csDataType.CSTDSINGLE:
                    case csDataType.CSTDDECIMAL: //@@@: case csDataType.CSTDDECIMAL:
                    case csDataType.CSTDDOUBLE: //@@@: case csDataType.CSTDDOUBLE:
                        input.Tag = "N"; //@@@: input.Tag = "N";
                        break; //@@@: break;
                    case csDataType.CSTDDBTIME: //@@@: case csDataType.CSTDDBTIME:
                        input.Tag = "F"; //@@@: input.Tag = "F";
                        break; //@@@: break;
                } //@@@: }

                m_texts[j] = input; //@@@: m_texts[j] = input;

                pnlParameters.Controls.Add(label); //@@@: pnlParameters.Controls.Add(label);
                pnlParameters.Controls.Add(input); //@@@: pnlParameters.Controls.Add(input);

                top += 30; //@@@: top += 30;
            } //@@@: }
        };  //@@@: }

        return self;

    } //@@@: }
}(globalObject)); //@@@: }
