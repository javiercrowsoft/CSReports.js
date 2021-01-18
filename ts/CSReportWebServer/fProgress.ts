

namespace CSReportWebServer
{
    export class fProgress {


    {
        public constructor() {
            InitializeComponent();
        }

UNKNOWN >>         public Label lbTask
        {
UNKNOWN >>             get
            {
                return lb_task;
            }
        }

UNKNOWN >>         public Label lbCurrPage
        {
UNKNOWN >>             get
            {
                return lb_curr_page;
            }
        }

UNKNOWN >>         public Label lbRecordCount
        {
UNKNOWN >>             get
            {
                return lb_record_count;
            }
        }

UNKNOWN >>         public Label lbCurrRecord
        {
UNKNOWN >>             get
            {
                return lb_curr_record;
            }
        }

UNKNOWN >>         public ProgressBar prgBar
        {
UNKNOWN >>             get
            {
                return prg_bar;
            }
        }

        private fProgress_Load(sender: object, e: EventArgs) {
            cWindow.locateFormAtTop(this);
        }


    }    }
}
