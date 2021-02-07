

namespace CSConnect
{
    export class fParameters {


    {
        private ok: boolean = false;
        private texts: TextBox[] = null;

        private parameters: cParameters = null;

        public constructor() {
            InitializeComponent();
        }

        public getOk() {
            return this.ok;
        }

        private cmd_apply_Click(sender: object, e: EventArgs) {
            this.ok = true;
            this.Hide();
        }

        private cmd_cancel_Click(sender: object, e: EventArgs) {
            this.ok = false;
            this.Hide();
        }

        private fParameters_Load(sender: object, e: EventArgs) {
            cWindow.centerForm(this);
            loadParameters();
        }

        public setParameters(value: cParameters) {
            this.parameters = value;
        }

        public getSqlParameters() {
            let parameters: var = "";

            for(var i = 0; i < this.parameters.count(); i++) {
                let input: var = this.texts[i];

                this.parameters.item(i).setValue(input.Text);

                let value: var = "";
                switch(input.Tag.toString())
                {
                    case "T":
                        value = Database.sqlString(input.Text);
                        break;
                    case "N":
                        value = Database.sqlNumber(input.Text);
                        break;
                    case "F":
                        value = Database.sqlDate(input.Text);
                        break;
                }                
                parameters += value + ",";
            }

            if (parameters.substring(parameters.length - 1, 1) === ",") {
                parameters = parameters.substring(0, parameters.length - 1);
            }

            return parameters;
        }

        private loadParameters() {
            let top: number = 20;

            this.texts = new TextBox[this.parameters.count()];

            for(var j = 0; j < this.parameters.count(); j++)  {
                let parameter: cParameter = this.parameters.getByPosition(j+1);

                let label: System.Windows.Forms.Label = new System.Windows.Forms.Label();
                label.AutoSize = true;
                label.Location = new System.Drawing.Point(30, top);
                label.Text = parameter.getName();

                let input: System.Windows.Forms.TextBox = new System.Windows.Forms.TextBox();
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

                this.texts[j] = input;

                pnlParameters.Controls.Add(label);
                pnlParameters.Controls.Add(input);

                top += 30;
            }
        } 



    } 
}
