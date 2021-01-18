

namespace CSReportPaint
{
    export class fPreview {


    {
        public constructor() {
            InitializeComponent();
        }

        public getRpwReport() {
            return rpwReport;
        }

        private fPreview_Load(sender: object, e: EventArgs) {
            this.Height = 990;
            this.Width = 950;
            cWindow.centerForm(this);
        }


    }    }
}
